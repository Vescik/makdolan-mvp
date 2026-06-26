import { describe, expect, it } from "vitest";

import { mockRecommendations } from "./mockRecommendations";
import { buildReasonChips, RESULT_CARD_REASON_CHIP_LIMIT } from "./reasonChips";
import { SearchInput } from "./types";

const baseInput: SearchInput = {
  budgetAmount: 25,
  currency: "PLN",
  locationLabel: "Rzeszow",
  distanceLimitKm: 3,
  selectedTags: [],
  excludedTags: [],
  fulfillmentMode: "pickup"
};

describe("buildReasonChips", () => {
  it("returns safe Polish UX labels without internal metadata", () => {
    const candidate = findCandidateByMenuItemId("item_mcd_mcchicken");
    const chips = buildReasonChips(candidate, {
      ...baseInput,
      selectedTags: ["chicken"]
    });

    expect(chips).toContain("W budżecie");
    expect(chips).toContain("Pasuje do: Kurczak");
    expect(chips).toContain("Szybka opcja");
    expect(chips.join(" ")).not.toMatch(/score|confidence|source|sourceUrl|lastVerifiedAt|distance/i);
  });

  it("limits card reason chips to three labels", () => {
    const candidate = findCandidateByMenuItemId("item_kebab_small");
    const chips = buildReasonChips(
      candidate,
      {
        ...baseInput,
        selectedTags: ["kebab", "filling"]
      },
      RESULT_CARD_REASON_CHIP_LIMIT
    );

    expect(chips).toEqual(["W budżecie", "Pasuje do: Kebab", "Pasuje do: Sycące"]);
    expect(chips).toHaveLength(3);
  });

  it("adds cheap option only when the remaining budget makes it meaningful", () => {
    const candidate = findCandidateByMenuItemId("item_mcd_cheeseburger");

    expect(
      buildReasonChips(candidate, {
        ...baseInput,
        budgetAmount: 25
      })
    ).toContain("Tania opcja");

    expect(
      buildReasonChips(candidate, {
        ...baseInput,
        budgetAmount: 10
      })
    ).not.toContain("Tania opcja");
  });
});

function findCandidateByMenuItemId(menuItemId: string) {
  const candidate = mockRecommendations.find((item) => item.menuItem.id === menuItemId);

  if (!candidate) {
    throw new Error(`Missing mock recommendation candidate for ${menuItemId}`);
  }

  return candidate;
}
