export type BudgetValidationResult =
  | {
      isValid: true;
      amount: number;
      normalizedInput: string;
    }
  | {
      isValid: false;
      message: string;
    };

export function validateBudgetInput(input: string): BudgetValidationResult {
  const trimmedInput = input.trim();

  if (trimmedInput.length === 0) {
    return {
      isValid: false,
      message: "Wpisz budżet, żeby zobaczyć propozycje."
    };
  }

  const normalizedInput = trimmedInput.replace(",", ".");
  const amount = Number(normalizedInput);

  if (!Number.isFinite(amount)) {
    return {
      isValid: false,
      message: "Podaj budżet jako liczbę, np. 25."
    };
  }

  if (amount <= 0) {
    return {
      isValid: false,
      message: "Budżet musi być większy niż 0 PLN."
    };
  }

  return {
    isValid: true,
    amount,
    normalizedInput
  };
}
