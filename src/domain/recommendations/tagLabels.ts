import { PreferenceTag } from "./types";

export const PREFERENCE_TAG_LABELS: Record<PreferenceTag, string> = {
  chicken: "Kurczak",
  burger: "Burger",
  pizza: "Pizza",
  kebab: "Kebab",
  vegetarian: "Wegetariańskie",
  small: "Mały posiłek",
  filling: "Sycące",
  quick: "Szybka opcja"
};

export function formatPreferenceTag(tag: PreferenceTag): string {
  return PREFERENCE_TAG_LABELS[tag];
}
