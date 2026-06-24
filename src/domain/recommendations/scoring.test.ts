import { describe, expect, it } from "vitest";

import { mockRecommendations } from "./mockRecommendations";
import { scoreRecommendations } from "./scoring";
import { RecommendationCandidate, SearchInput } from "./types";

const baseInput: SearchInput = {
  budgetAmount: 20,
  currency: "PLN",
  locationLabel: "Warsaw Centrum",
  distanceLimitKm: 3,
  preferenceTags: []
};

describe("scoreRecommendations", () => {
  it("returns only active, open, in-budget candidates", () => {
    const results = scoreRecommendations(mockRecommendations, {
      ...baseInput,
      budgetAmount: 12
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.price.amount <= 12)).toBe(true);
    expect(results.every((result) => result.active && result.restaurant.openNow)).toBe(true);
  });

  it("prioritizes matching preferences", () => {
    const results = scoreRecommendations(mockRecommendations, {
      ...baseInput,
      preferenceTags: ["kebab"],
      mealSize: "filling_meal"
    });

    expect(results[0]?.id).toBe("local-kebab-small");
    expect(results[0]?.reasons).toContain("Matches kebab");
  });

  it("filters unavailable fulfillment modes", () => {
    const results = scoreRecommendations(mockRecommendations, {
      ...baseInput,
      fulfillmentMode: "delivery"
    });

    expect(results.map((result) => result.id)).toEqual(["kfc-chicken-strips-warsaw"]);
  });

  it("hides low-confidence candidates", () => {
    const lowConfidenceCandidate: RecommendationCandidate = {
      ...mockRecommendations[0]!,
      id: "untrusted-price",
      price: {
        ...mockRecommendations[0]!.price,
        confidence: 10
      }
    };

    const results = scoreRecommendations([lowConfidenceCandidate], baseInput);

    expect(results).toEqual([]);
  });
});
