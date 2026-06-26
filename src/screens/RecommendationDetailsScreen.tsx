import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { mockRecommendations } from "../domain/recommendations/mockRecommendations";
import {
  defaultSearchInput,
  parsePreferenceTags,
  scoreCandidate,
  toRecommendationDetails
} from "../domain/recommendations/scoring";
import { formatPreferenceTag } from "../domain/recommendations/tagLabels";
import { AppShell } from "../ui/AppShell";
import { BodyText, Label, Title } from "../ui/ScreenText";
import { validateBudgetInput } from "./budgetValidation";

export function RecommendationDetailsScreen() {
  const params = useLocalSearchParams<{ id?: string; budget?: string; preferences?: string }>();
  const candidate = mockRecommendations.find((item) => item.id === params.id);

  if (!candidate) {
    return (
      <AppShell>
        <Title>Nie znaleziono propozycji</Title>
        <BodyText>Ta pozycja nie jest dostępna w lokalnych danych testowych dla Rzeszowa.</BodyText>
      </AppShell>
    );
  }

  const budgetValidation = validateBudgetInput(params.budget ?? "");
  const budgetAmount = budgetValidation.isValid
    ? budgetValidation.amount
    : Math.max(defaultSearchInput.budgetAmount, candidate.menuItem.basePrice.amount);
  const result = scoreCandidate(candidate, {
    ...defaultSearchInput,
    budgetAmount,
    locationLabel: "Rzeszow",
    selectedTags: parsePreferenceTags(params.preferences)
  });
  const details = toRecommendationDetails(result);

  return (
    <AppShell>
      <Title>{details.itemName}</Title>
      <BodyText>Prosta propozycja z rynku testowego w Rzeszowie.</BodyText>

      <View style={styles.panel}>
        <Label>Restauracja</Label>
        <Text style={styles.value}>{details.restaurantName}</Text>
      </View>

      <View style={styles.panel}>
        <Label>Szacowana cena pozycji</Label>
        <Text style={styles.value}>{details.estimatedPrice}</Text>
        <BodyText>{details.priceNote}</BodyText>
      </View>

      <View style={styles.panel}>
        <Label>Dlaczego może pasować?</Label>
        <BodyText>Proste powody pomagające szybko zdecydować.</BodyText>
        <View style={styles.reasonChips}>
          {details.reasonChips.map((chip) => (
            <Text key={chip} style={styles.reasonChip}>
              {chip}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.panel}>
        <Label>Preferencje</Label>
        <View style={styles.tags}>
          {details.displayTags.map((tag) => (
            <Text key={tag} style={styles.tag}>
              {formatPreferenceTag(tag)}
            </Text>
          ))}
        </View>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: "#ffffff",
    borderColor: "#d7e2dc",
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 16
  },
  value: {
    color: "#17352b",
    fontSize: 22,
    fontWeight: "800"
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  reasonChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  reasonChip: {
    backgroundColor: "#d9f0e2",
    borderRadius: 8,
    color: "#17352b",
    fontSize: 13,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  tag: {
    backgroundColor: "#e6eee9",
    borderRadius: 8,
    color: "#17352b",
    fontSize: 13,
    fontWeight: "700",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 6
  }
});
