import { formatPreferenceTag } from "./tagLabels";
import { PreferenceTag, RecommendationCandidate, SearchInput } from "./types";

export const RESULT_CARD_REASON_CHIP_LIMIT = 3;
export const DETAIL_REASON_CHIP_LIMIT = 4;

const UTILITY_TAG_PRIORITY: PreferenceTag[] = ["quick", "filling", "small", "vegetarian"];

export function buildReasonChips(
  candidate: RecommendationCandidate,
  input: SearchInput,
  limit = DETAIL_REASON_CHIP_LIMIT
): string[] {
  const chips: string[] = [];
  const itemTags = candidate.menuItem.tags;

  if (candidate.menuItem.basePrice.amount <= input.budgetAmount) {
    chips.push("W budżecie");
  }

  for (const tag of input.selectedTags) {
    if (itemTags.includes(tag)) {
      chips.push(`Pasuje do: ${formatPreferenceTag(tag)}`);
    }
  }

  for (const tag of UTILITY_TAG_PRIORITY) {
    if (itemTags.includes(tag) && !input.selectedTags.includes(tag)) {
      chips.push(formatUtilityTag(tag));
    }
  }

  if (isLowerPriceOption(candidate.menuItem.basePrice.amount, input.budgetAmount)) {
    chips.push("Tania opcja");
  }

  return unique(chips).slice(0, limit);
}

function formatUtilityTag(tag: PreferenceTag): string {
  switch (tag) {
    case "vegetarian":
      return "Wegetariańskie";
    case "quick":
      return "Szybka opcja";
    case "filling":
      return "Sycące";
    case "small":
      return "Mały posiłek";
    default:
      return formatPreferenceTag(tag);
  }
}

function isLowerPriceOption(price: number, budget: number): boolean {
  return budget >= 20 && price <= budget * 0.6;
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}
