import {
  FulfillmentMode,
  PortionSize,
  PreferenceTag,
  RecommendationCandidate,
  RecommendationCardView,
  RecommendationFallback,
  RecommendationResponse,
  RecommendationResult,
  SearchInput
} from "./types";

const DAY_MS = 24 * 60 * 60 * 1000;
const REFERENCE_DATE = new Date("2026-06-24T00:00:00.000Z");

export function scoreRecommendations(
  candidates: RecommendationCandidate[],
  input: SearchInput
): RecommendationResult[] {
  return candidates
    .filter((candidate) => isEligible(candidate, input))
    .map((candidate) => scoreCandidate(candidate, input))
    .sort((left, right) => sortRecommendationResults(left, right));
}

export const rankRecommendations = scoreRecommendations;

export function getRecommendationResponse(
  candidates: RecommendationCandidate[],
  input: SearchInput
): RecommendationResponse {
  const results = scoreRecommendations(candidates, input);

  return {
    results,
    fallback: results.length === 0 ? buildFallback(input) : null
  };
}

export function scoreCandidate(candidate: RecommendationCandidate, input: SearchInput): RecommendationResult {
  const price = candidate.menuItem.basePrice;
  const scoreBreakdown = {
    budgetFit: budgetFit(price.amount, input.budgetAmount),
    preferenceMatch: preferenceMatch(candidate.menuItem.tags, input.selectedTags),
    distanceScore: distanceScore(),
    restaurantRating: restaurantRating(candidate.outlet.rating),
    portionScore: portionScore(candidate.menuItem.portionSize, input.portionSizePreference),
    freshnessScore: freshnessScore(price.lastVerifiedAt, price.confidence)
  };

  const score =
    scoreBreakdown.budgetFit * 35 +
    scoreBreakdown.preferenceMatch * 25 +
    scoreBreakdown.distanceScore * 15 +
    scoreBreakdown.restaurantRating * 10 +
    scoreBreakdown.portionScore * 10 +
    scoreBreakdown.freshnessScore * 5;

  const displayTags = buildDisplayTags(candidate.menuItem.tags, input.selectedTags);

  return {
    ...candidate,
    estimatedTotalPrice: price.amount,
    score: roundScore(score),
    scoreBreakdown,
    reasons: buildReasons(candidate, input, displayTags),
    displayTags,
    confidence: price.confidence
  };
}

export const buildRecommendationResult = scoreCandidate;

export function toRecommendationCard(result: RecommendationResult): RecommendationCardView {
  return {
    restaurantName: result.brand.name,
    itemName: result.menuItem.name,
    estimatedPrice: `${result.estimatedTotalPrice.toFixed(2)} ${result.menuItem.basePrice.currency}`,
    displayTags: result.displayTags
  };
}

function isEligible(candidate: RecommendationCandidate, input: SearchInput): boolean {
  const price = candidate.menuItem.basePrice;
  const excludedTags = input.excludedTags ?? [];

  if (!candidate.menuItem.active || !candidate.outlet.isOpenNow) {
    return false;
  }

  if (price.currency !== input.currency) {
    return false;
  }

  if (price.amount > input.budgetAmount) {
    return false;
  }

  if (candidate.outlet.distanceKm > input.distanceLimitKm) {
    return false;
  }

  if (
    input.fulfillmentMode &&
    !candidate.menuItem.fulfillmentModes.includes(input.fulfillmentMode)
  ) {
    return false;
  }

  if (excludedTags.some((tag) => candidate.menuItem.tags.includes(tag))) {
    return false;
  }

  return price.confidence >= 20;
}

function budgetFit(price: number, budget: number): number {
  if (budget <= 0 || price > budget) {
    return 0;
  }

  const remainingRatio = (budget - price) / budget;
  return clamp(0.75 + remainingRatio * 0.25);
}

function preferenceMatch(candidateTags: PreferenceTag[], selectedTags: PreferenceTag[]): number {
  if (selectedTags.length === 0) {
    return 0.75;
  }

  const matched = selectedTags.filter((tag) => candidateTags.includes(tag)).length;
  return clamp(matched / selectedTags.length);
}

function distanceScore(): number {
  return 0.75;
}

function restaurantRating(rating: number | undefined): number {
  return rating === undefined ? 0.6 : clamp(rating / 5);
}

function portionScore(candidatePortion: PortionSize, requestedPortion?: PortionSize): number {
  if (!requestedPortion) {
    return 0.75;
  }

  if (candidatePortion === requestedPortion) {
    return 1;
  }

  return requestedPortion === "filling" && candidatePortion === "small" ? 0.35 : 0.7;
}

function freshnessScore(lastVerifiedAt: string, confidence: number): number {
  const ageDays = Math.max(
    0,
    Math.floor((REFERENCE_DATE.getTime() - new Date(lastVerifiedAt).getTime()) / DAY_MS)
  );

  const confidenceScore = clamp(confidence / 100);
  const ageScore = ageDays <= 14 ? 1 : ageDays <= 30 ? 0.7 : ageDays <= 60 ? 0.4 : 0.15;
  return clamp(confidenceScore * 0.65 + ageScore * 0.35);
}

function buildDisplayTags(candidateTags: PreferenceTag[], selectedTags: PreferenceTag[]): PreferenceTag[] {
  const selectedMatches = selectedTags.filter((tag) => candidateTags.includes(tag));
  const remaining = candidateTags.filter((tag) => !selectedMatches.includes(tag));
  return [...selectedMatches, ...remaining].slice(0, 3);
}

function buildReasons(
  candidate: RecommendationCandidate,
  input: SearchInput,
  displayTags: PreferenceTag[]
): string[] {
  const reasons = [`Fits your ${input.budgetAmount.toFixed(0)} ${input.currency} budget`];

  const matchedTags = input.selectedTags.filter((tag) => candidate.menuItem.tags.includes(tag));
  if (matchedTags.length > 0) {
    reasons.push(`Matches ${matchedTags.join(", ")}`);
  }

  if (displayTags.includes("small")) {
    reasons.push("Good for a small meal");
  }

  if (displayTags.includes("filling")) {
    reasons.push("Good for a filling meal");
  }

  if (displayTags.includes("quick")) {
    reasons.push("Something quick");
  }

  reasons.push("Estimated price may vary by location");
  return reasons.slice(0, 4);
}

function sortRecommendationResults(left: RecommendationResult, right: RecommendationResult): number {
  if (right.score !== left.score) {
    return right.score - left.score;
  }

  if (right.confidence !== left.confidence) {
    return right.confidence - left.confidence;
  }

  if (left.estimatedTotalPrice !== right.estimatedTotalPrice) {
    return left.estimatedTotalPrice - right.estimatedTotalPrice;
  }

  return left.id.localeCompare(right.id);
}

function buildFallback(input: SearchInput): RecommendationFallback {
  const selectedTags = input.selectedTags.length > 0 ? ` for ${input.selectedTags.join(", ")}` : "";

  return {
    title: "No matching food ideas yet",
    message: `No known options under ${input.budgetAmount.toFixed(0)} ${input.currency}${selectedTags} in the current Rzeszow test data.`,
    suggestions: ["Increase your budget", "Remove one or more preferences", "Try a broader tag such as quick or small"]
  };
}

function roundScore(score: number): number {
  return Math.round(score * 10) / 10;
}

function clamp(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export const defaultSearchInput: SearchInput = {
  budgetAmount: 25,
  currency: "PLN",
  locationLabel: "Rzeszow",
  distanceLimitKm: 3,
  selectedTags: [],
  excludedTags: [],
  fulfillmentMode: "pickup"
};

export function parsePreferenceTags(value: string | string[] | undefined): PreferenceTag[] {
  const raw = Array.isArray(value) ? value.join(",") : value;
  if (!raw) {
    return [];
  }

  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag): tag is PreferenceTag => isPreferenceTag(tag));
}

export function isPreferenceTag(value: string): value is PreferenceTag {
  return ["chicken", "burger", "pizza", "kebab", "vegetarian", "small", "filling", "quick"].includes(value);
}

export function isFulfillmentMode(value: string | undefined): value is FulfillmentMode {
  return value === "pickup" || value === "dineIn";
}

export function isPortionSize(value: string | undefined): value is PortionSize {
  return value === "small" || value === "filling";
}
