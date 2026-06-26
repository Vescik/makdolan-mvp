import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { AppShell } from "../ui/AppShell";
import { Button } from "../ui/Button";
import { BodyText, Label, Subtitle, Title } from "../ui/ScreenText";
import { validateBudgetInput } from "./budgetValidation";

export function HomeBudgetScreen() {
  const [budget, setBudget] = useState("25");
  const [budgetError, setBudgetError] = useState<string | null>(null);

  function updateBudget(value: string) {
    setBudget(value);
    setBudgetError(null);
  }

  function continueToPreferences() {
    const validation = validateBudgetInput(budget);

    if (!validation.isValid) {
      setBudgetError(validation.message);
      return;
    }

    router.push({
      pathname: "/preferences",
      params: {
        budget: validation.normalizedInput,
        location: "Rzeszow"
      }
    });
  }

  return (
    <AppShell>
      <View style={styles.hero}>
        <Title>Co zjeść w tym budżecie?</Title>
        <Subtitle>Podaj kwotę, a Makdolan pokaże proste propozycje z rynku testowego w Rzeszowie.</Subtitle>
      </View>

      <View style={styles.form}>
        <View>
          <Label>Budżet</Label>
          <TextInput
            accessibilityLabel="Kwota budżetu"
            inputMode="decimal"
            onChangeText={updateBudget}
            placeholder="25"
            style={[styles.input, budgetError && styles.invalidInput]}
            value={budget}
          />
          {budgetError ? (
            <BodyText accessibilityLiveRegion="polite" style={styles.errorText}>
              {budgetError}
            </BodyText>
          ) : null}
        </View>

        <View style={styles.marketPanel}>
          <Label>Rynek testowy</Label>
          <BodyText>Rzeszów</BodyText>
          <BodyText>Na razie pokazujemy tylko lokalne dane testowe z Rzeszowa.</BodyText>
        </View>
      </View>

      <Button
        accessibilityLabel="Dalej do wyboru preferencji"
        label="Dalej: wybierz preferencje"
        onPress={continueToPreferences}
      />

      <BodyText>Ceny są szacunkowe i mogą różnić się zależnie od lokalu.</BodyText>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 8
  },
  form: {
    gap: 14
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: "#c8d7d0",
    borderRadius: 8,
    borderWidth: 1,
    color: "#17352b",
    fontSize: 18,
    minHeight: 48,
    paddingHorizontal: 14
  },
  invalidInput: {
    borderColor: "#b42318"
  },
  errorText: {
    color: "#b42318",
    marginTop: 6
  },
  marketPanel: {
    backgroundColor: "#ffffff",
    borderColor: "#d7e2dc",
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
    padding: 14
  }
});
