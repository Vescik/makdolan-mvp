import { describe, expect, it } from "vitest";

import { validateBudgetInput } from "./budgetValidation";

describe("validateBudgetInput", () => {
  it("rejects empty budget input with Polish copy", () => {
    expect(validateBudgetInput("")).toEqual({
      isValid: false,
      message: "Wpisz budżet, żeby zobaczyć propozycje."
    });
  });

  it("rejects non-numeric budget input", () => {
    expect(validateBudgetInput("abc")).toEqual({
      isValid: false,
      message: "Podaj budżet jako liczbę, np. 25."
    });
  });

  it("rejects zero and negative budgets", () => {
    expect(validateBudgetInput("0")).toEqual({
      isValid: false,
      message: "Budżet musi być większy niż 0 PLN."
    });

    expect(validateBudgetInput("-5")).toEqual({
      isValid: false,
      message: "Budżet musi być większy niż 0 PLN."
    });
  });

  it("accepts positive budgets and normalizes comma decimals", () => {
    expect(validateBudgetInput("25,50")).toEqual({
      isValid: true,
      amount: 25.5,
      normalizedInput: "25.50"
    });
  });
});
