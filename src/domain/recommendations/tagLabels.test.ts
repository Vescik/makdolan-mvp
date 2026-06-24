import { describe, expect, it } from "vitest";

import { formatPreferenceTag, PREFERENCE_TAG_LABELS } from "./tagLabels";
import { PreferenceTag } from "./types";

const approvedTags: PreferenceTag[] = [
  "chicken",
  "burger",
  "pizza",
  "kebab",
  "vegetarian",
  "small",
  "filling",
  "quick"
];

describe("preference tag labels", () => {
  it("keeps the approved internal tag vocabulary unchanged", () => {
    expect(Object.keys(PREFERENCE_TAG_LABELS).sort()).toEqual([...approvedTags].sort());
  });

  it("maps internal tags to friendly Polish labels", () => {
    expect(formatPreferenceTag("chicken")).toBe("Kurczak");
    expect(formatPreferenceTag("vegetarian")).toBe("Wegetariańskie");
    expect(formatPreferenceTag("small")).toBe("Mały posiłek");
    expect(formatPreferenceTag("quick")).toBe("Szybka opcja");
  });
});
