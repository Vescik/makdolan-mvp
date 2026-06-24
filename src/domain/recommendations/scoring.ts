import {
  FulfillmentMode,
  MealSize,
  PreferenceTag,
  RecommendationCandidate,
  ScoredRecommendation,
  SearchInput
} from "./types";

const DAY_MS = 24 * 60 * 60 * 1000;
const REFERENCE_DATE = new Date("2026-06-24T00:00:00.000Z");

export function scoreRecommendations(
  candidates: RecommendationCandidate[],
  input: SearchInput
): ScoredRecommendation[] {
  return candidates
    .filter((candidate) => isEligible(candidate, input))
    .map((candidate) => scoreCandidate(candidate, input))
    .sort((left, right) => right.score - left.score);
}

export function scoreCandidate(
  candidate: RecommendationCandidate,
  input: SearchInput
): ScoredRecommendation {
  const breakdown = {
    budgetFit: budgetFit(candidate.price.amount, input.budgetAmount),
    preferenceMatch: preferenceMatch(candidate.tags, input.preferenceTags),
    distanceScore: distanceScore(candidate.restaurant.distanceKm, input.distanceLimitKm),
    ratingScore: ratingScore(candidate.restaurant.rating),
    portionScore: portionScore(candidate.portionSize, input.mealSize),
    freshnessScore: freshnessScore(candidate.price.lastVerifiedAt, candidate.price.confidence)
  };

  const score =
    breakdown.budgetFit * 35 +
    breakdown.preferenceMatch * 25 +
    breakdown.distanceScore * 15 +
    breakdown.ratingScore * 10 +
    breakdown.portionScore * 10 +
    breakdown.freshnessScore * 5;

  return {
    ...candidate,
    score: roundScore(score),
    breakdown,
    reasons: buildReasons(candidate, input, breakdown)
  };
}

function isEligible(candidate: RecommendationCandidate, input: SearchInput): boolean {
  if (!candidate.active || !candidate.restaurant.openNow) {
    return false;
  }

  if (candidate.price.currency !== input.currency) {
    return false;
  }

  if (candidate.price.amount > input.budgetAmount) {
    return false;
  }

  if (candidate.restaurant.distanceKm > input.distanceLimitKm) {
    return false;
  }

  if (input.fulfillmentMode && !candidate.fulfillmentModes.includes(input.fulfillmentMode)) {
    return false;
  }

  return candidate.price.confidence >= 20;
}

function budgetFit(price: number, budget: number): number {
  if (budget <= 0 || price > budget) {
    return 0;
  }

  const remainingRatio = (budget - price) / budget;
  return clamp(0.75 + remainingRatio * 0.25);
}

function preferenceMatch(candidateTags: PreferenceTag[], preferences: PreferenceTag[]): number {
  if (preferences.length === 0) {
    return 0.75;
  }

  const matched = preferences.filter((preference) => candidateTags.includes(preference)).length;
  return clamp(matched / preferences.length);
}

function distanceScore(distanceKm: number, limitKm: number): number {
  if (limitKm <= 0 || distanceKm > limitKm) {
    return 0;
  }

  return clamp(1 - distanceKm / limitKm);
}

function ratingScore(rating: number): number {
  return clamp(rating / 5);
}

function portionScore(candidatePortion: MealSize, requestedPortion?: MealSize): number {
  if (!requestedPortion) {
    return 0.75;
  }

  if (candidatePortion === requestedPortion) {
    return 1;
  }

  const fillingRequested = requestedPortion === "filling_meal";
  const fillingCandidate = candidatePortion === "regular_meal" || candidatePortion === "filling_meal";
  return fillingRequested && fillingCandidate ? 0.7 : 0.35;
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

function buildReasons(
  candidate: RecommendationCandidate,
  input: SearchInput,
  breakdown: ScoredRecommendation["breakdown"]
): string[] {
  const reasons: string[] = [];

  reasons.push(`${formatPrice(candidate.price.amount, candidate.price.currency)} fits your budget`);

  if (breakdown.preferenceMatch >= 1 && input.preferenceTags.length > 0) {
    reasons.push(`Matches ${input.preferenceTags.join(", ")}`);
  }

  if (candidate.restaurant.distanceKm <= 1) {
    reasons.push("Nearby");
  }

  if (breakdown.freshnessScore >= 0.75) {
    reasons.push("Recently verified");
  } else {
    reasons.push("Price may vary");
  }

  return reasons;
}

function formatPrice(amount: number, currency: SearchInput["currency"]): string {
  return `${amount.toFixed(2)} ${currency}`;
}

function roundScore(score: number): number {
  return Math.round(score * 10) / 10;
}

function clamp(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export const defaultSearchInput: SearchInput = {
  budgetAmount: 20,
  currency: "PLN",
  locationLabel: "Warsaw Centrum",
  distanceLimitKm: 3,
  preferenceTags: []
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
  return ["burger", "chicken", "pizza", "kebab", "sandwich", "vegetarian", "healthy"].includes(value);
}

export function isFulfillmentMode(value: string | undefined): value is FulfillmentMode {
  return value === "pickup" || value === "delivery" || value === "dine_in";
}

export function isMealSize(value: string | undefined): value is MealSize {
  return value === "snack" || value === "small_meal" || value === "regular_meal" || value === "filling_meal";
}
