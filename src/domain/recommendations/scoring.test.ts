import { describe, expect, it } from "vitest";

import {
  isApprovedSprint1Tag,
  menuItems,
  mockMenuItems,
  mockRecommendations
} from "./mockRecommendations";
import {
  getRecommendationResponse,
  scoreCandidate,
  scoreRecommendations,
  toRecommendationCard,
  toRecommendationDetails
} from "./scoring";
import { RecommendationCandidate, SearchInput } from "./types";

const baseInput: SearchInput = {
  budgetAmount: 25,
  currency: "PLN",
  locationLabel: "Rzeszow",
  distanceLimitKm: 3,
  selectedTags: [],
  excludedTags: [],
  fulfillmentMode: "pickup"
};

describe("scoreRecommendations", () => {
  it("provides Sprint 1B mock menu coverage", () => {
    const brandNames = new Set(mockMenuItems.map((item) => item.restaurantBrandName));

    expect(mockMenuItems.length).toBeGreaterThanOrEqual(12);
    expect(brandNames).toEqual(
      new Set(["McDonald's", "KFC", "Burger King", "Rzeszow Kebab", "Rzeszow Pizza", "Bar Domowy"])
    );
    expect(mockMenuItems.some((item) => item.estimatedPrice <= 15)).toBe(true);
    expect(mockMenuItems.some((item) => item.estimatedPrice > 15 && item.estimatedPrice <= 25)).toBe(true);
    expect(mockMenuItems.some((item) => item.estimatedPrice > 25 && item.estimatedPrice <= 40)).toBe(true);
  });

  it("keeps mock menu items inside the Sprint 1 data contract", () => {
    for (const item of mockMenuItems) {
      expect(item.id).toBeTruthy();
      expect(item.restaurantBrandName).toBeTruthy();
      expect(item.itemName).toBeTruthy();
      expect(item.estimatedPrice).toBeGreaterThan(0);
      expect(item.currency).toBe("PLN");
      expect(item.visibleTags.length).toBeGreaterThan(0);
      expect(item.visibleTags.length).toBeLessThanOrEqual(3);
      expect(item.source).toBeTruthy();
      expect(item).toHaveProperty("sourceUrl");
      expect(item.lastVerifiedAt).toBeTruthy();
      expect(item.confidence).toBeGreaterThanOrEqual(0);
      expect(item.confidence).toBeLessThanOrEqual(100);
      expect(item.internalTags.length).toBeGreaterThan(0);
      expect(item.visibleTags.every(isApprovedSprint1Tag)).toBe(true);
      expect(item.internalTags.every(isApprovedSprint1Tag)).toBe(true);
    }
  });

  it("keeps fulfillment limited to dine-in and pickup style", () => {
    expect(menuItems.every((item) => item.fulfillmentModes.every((mode) => mode === "pickup" || mode === "dineIn"))).toBe(
      true
    );
  });

  it("returns only active, open, in-budget candidates", () => {
    const results = scoreRecommendations(mockRecommendations, {
      ...baseInput,
      budgetAmount: 15
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.estimatedTotalPrice <= 15)).toBe(true);
    expect(results.every((result) => result.menuItem.active && result.outlet.isOpenNow)).toBe(true);
  });

  it("scores an item higher when it fits within budget than when it is above budget", () => {
    const candidate = findCandidateByMenuItemId("item_pizza_medium");
    const withinBudget = scoreCandidate(candidate, {
      ...baseInput,
      budgetAmount: 40,
      selectedTags: ["pizza", "filling"],
      portionSizePreference: "filling"
    });
    const overBudget = scoreCandidate(candidate, {
      ...baseInput,
      budgetAmount: 25,
      selectedTags: ["pizza", "filling"],
      portionSizePreference: "filling"
    });

    expect(withinBudget.scoreBreakdown.budgetFit).toBeGreaterThan(overBudget.scoreBreakdown.budgetFit);
    expect(withinBudget.score).toBeGreaterThan(overBudget.score);
  });

  it("prioritizes matching approved Sprint 1 tags", () => {
    const results = scoreRecommendations(mockRecommendations, {
      ...baseInput,
      selectedTags: ["kebab", "filling"],
      portionSizePreference: "filling"
    });

    expect(results[0]?.menuItem.id).toBe("item_kebab_small");
    expect(results[0]?.displayTags).toEqual(["kebab", "filling", "quick"]);
  });

  it("improves score when selected tags match the item", () => {
    const candidate = findCandidateByMenuItemId("item_kebab_small");
    const matchingTags = scoreCandidate(candidate, {
      ...baseInput,
      selectedTags: ["kebab", "filling"]
    });
    const mismatchedTags = scoreCandidate(candidate, {
      ...baseInput,
      selectedTags: ["pizza", "vegetarian"]
    });

    expect(matchingTags.scoreBreakdown.preferenceMatch).toBeGreaterThan(mismatchedTags.scoreBreakdown.preferenceMatch);
    expect(matchingTags.score).toBeGreaterThan(mismatchedTags.score);
  });

  it("removes excluded tags", () => {
    const results = scoreRecommendations(mockRecommendations, {
      ...baseInput,
      selectedTags: ["quick"],
      excludedTags: ["burger", "kebab"]
    });

    expect(results.some((result) => result.displayTags.includes("burger"))).toBe(false);
    expect(results.some((result) => result.displayTags.includes("kebab"))).toBe(false);
  });

  it("filters closed outlets", () => {
    const results = scoreRecommendations(mockRecommendations, {
      ...baseInput,
      budgetAmount: 20,
      selectedTags: ["burger"]
    });

    expect(results.map((result) => result.outlet.id)).not.toContain("outlet_bk_rzeszow");
  });

  it("hides low-confidence candidates", () => {
    const lowConfidenceCandidate: RecommendationCandidate = {
      ...mockRecommendations[0]!,
      id: "untrusted-price",
      menuItem: {
        ...mockRecommendations[0]!.menuItem,
        basePrice: {
          ...mockRecommendations[0]!.menuItem.basePrice,
          confidence: 10
        }
      }
    };

    const results = scoreRecommendations([lowConfidenceCandidate], baseInput);

    expect(results).toEqual([]);
  });

  it("lowers internal score for stale or low-confidence prices", () => {
    const baseCandidate = findCandidateByMenuItemId("item_mcd_cheeseburger");
    const freshHighConfidence = scoreCandidate(baseCandidate, baseInput);
    const staleLowConfidenceCandidate: RecommendationCandidate = {
      ...baseCandidate,
      id: "stale-low-confidence",
      menuItem: {
        ...baseCandidate.menuItem,
        basePrice: {
          ...baseCandidate.menuItem.basePrice,
          lastVerifiedAt: "2026-01-01",
          confidence: 25
        }
      }
    };
    const staleLowConfidence = scoreCandidate(staleLowConfidenceCandidate, baseInput);

    expect(freshHighConfidence.scoreBreakdown.freshnessScore).toBeGreaterThan(
      staleLowConfidence.scoreBreakdown.freshnessScore
    );
    expect(freshHighConfidence.score).toBeGreaterThan(staleLowConfidence.score);
  });

  it("sorts recommendations by score descending", () => {
    const results = scoreRecommendations(mockRecommendations, {
      ...baseInput,
      budgetAmount: 40,
      selectedTags: ["quick"]
    });

    for (let index = 1; index < results.length; index += 1) {
      expect(results[index - 1]!.score).toBeGreaterThanOrEqual(results[index]!.score);
    }
  });

  it("returns a safe fallback state when no recommendations match", () => {
    const response = getRecommendationResponse(mockRecommendations, {
      ...baseInput,
      budgetAmount: 1,
      selectedTags: ["pizza"]
    });

    expect(response.results).toEqual([]);
    expect(response.fallback).toEqual({
      title: "No matching food ideas yet",
      message: "No known options under 1 PLN for pizza in the current Rzeszow test data.",
      suggestions: ["Increase your budget", "Remove one or more preferences", "Try a broader tag such as quick or small"]
    });
  });

  it("keeps internal fields out of the result card view", () => {
    const [result] = scoreRecommendations(mockRecommendations, {
      ...baseInput,
      selectedTags: ["chicken"]
    });

    expect(result).toBeDefined();
    const card = toRecommendationCard(result!);

    expect(card).toEqual({
      restaurantName: expect.any(String),
      itemName: expect.any(String),
      estimatedPrice: expect.stringContaining("PLN"),
      displayTags: expect.any(Array),
      reasonChips: expect.any(Array)
    });
    expect(card.reasonChips.length).toBeLessThanOrEqual(3);
    expect(Object.keys(card)).not.toContain("distanceKm");
    expect(Object.keys(card)).not.toContain("distance");
    expect(Object.keys(card)).not.toContain("score");
    expect(Object.keys(card)).not.toContain("confidence");
    expect(Object.keys(card)).not.toContain("source");
    expect(Object.keys(card)).not.toContain("sourceUrl");
    expect(Object.keys(card)).not.toContain("lastVerifiedAt");
    expect(Object.keys(card)).not.toContain("scoreBreakdown");
  });

  it("keeps internal fields out of the details view", () => {
    const [result] = scoreRecommendations(mockRecommendations, {
      ...baseInput,
      selectedTags: ["kebab"]
    });

    expect(result).toBeDefined();
    const details = toRecommendationDetails(result!);

    expect(details).toEqual({
      restaurantName: expect.any(String),
      itemName: expect.any(String),
      estimatedPrice: expect.stringContaining("PLN"),
      displayTags: expect.any(Array),
      reasonChips: expect.any(Array),
      priceNote: "Cena jest szacunkowa i może różnić się zależnie od lokalu."
    });
    expect(details.reasonChips).toContain("W budżecie");
    expect(details.reasonChips.join(" ")).not.toMatch(/score|confidence|source|sourceUrl|lastVerifiedAt|distance/i);
    expect(Object.keys(details)).not.toContain("distanceKm");
    expect(Object.keys(details)).not.toContain("distance");
    expect(Object.keys(details)).not.toContain("score");
    expect(Object.keys(details)).not.toContain("confidence");
    expect(Object.keys(details)).not.toContain("source");
    expect(Object.keys(details)).not.toContain("sourceUrl");
    expect(Object.keys(details)).not.toContain("lastVerifiedAt");
    expect(Object.keys(details)).not.toContain("scoreBreakdown");
  });
});

function findCandidateByMenuItemId(menuItemId: string): RecommendationCandidate {
  const candidate = mockRecommendations.find((item) => item.menuItem.id === menuItemId);

  if (!candidate) {
    throw new Error(`Missing mock recommendation candidate for ${menuItemId}`);
  }

  return candidate;
}
