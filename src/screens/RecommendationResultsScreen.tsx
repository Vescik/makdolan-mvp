import { Link, router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { mockRecommendations } from "../domain/recommendations/mockRecommendations";
import {
  defaultSearchInput,
  getRecommendationResponse,
  parsePreferenceTags,
  toRecommendationCard
} from "../domain/recommendations/scoring";
import { formatPreferenceTag } from "../domain/recommendations/tagLabels";
import { AppShell } from "../ui/AppShell";
import { Button } from "../ui/Button";
import { BodyText, Subtitle, Title } from "../ui/ScreenText";
import { validateBudgetInput } from "./budgetValidation";

export function RecommendationResultsScreen() {
  const params = useLocalSearchParams<{ budget?: string; location?: string; preferences?: string }>();
  const budgetValidation = validateBudgetInput(params.budget ?? "");
  const selectedTags = parsePreferenceTags(params.preferences);

  if (!budgetValidation.isValid) {
    return (
      <AppShell>
        <Title>Potrzebujemy budżetu</Title>
        <Subtitle>{budgetValidation.message}</Subtitle>
        <Button label="Wpisz budżet" onPress={() => router.replace("/")} />
      </AppShell>
    );
  }

  const safeBudget = budgetValidation.amount;

  const response = getRecommendationResponse(mockRecommendations, {
    ...defaultSearchInput,
    budgetAmount: safeBudget,
    locationLabel: "Rzeszow",
    selectedTags
  });
  const { results } = response;

  return (
    <AppShell>
      <Title>Propozycje w Twoim budżecie</Title>
      <Subtitle>Rynek testowy: Rzeszów. Budżet: {safeBudget.toFixed(2)} PLN. Ceny są szacunkowe.</Subtitle>

      {results.length === 0 ? (
        <View style={styles.emptyState}>
          <Title>Brak pasujących propozycji</Title>
          <BodyText>
            Nie znaleźliśmy opcji do {safeBudget.toFixed(0)} PLN w obecnych danych testowych dla Rzeszowa.
          </BodyText>
          <BodyText>- Zwiększ budżet</BodyText>
          <BodyText>- Usuń część preferencji</BodyText>
          <BodyText>- Spróbuj prostszego wyboru, np. szybka opcja lub mały posiłek</BodyText>
          <View style={styles.actions}>
            <Button label="Zmień budżet" onPress={() => router.replace("/")} variant="secondary" />
            <Button
              label="Zmień preferencje"
              onPress={() =>
                router.replace({
                  pathname: "/preferences",
                  params: {
                    budget: budgetValidation.normalizedInput
                  }
                })
              }
            />
          </View>
        </View>
      ) : (
        <View style={styles.list}>
          {results.map((result) => {
            const card = toRecommendationCard(result);
            return (
              <Link
                accessibilityLabel={`Otwórz szczegóły: ${card.itemName}`}
                href={{
                  pathname: "/recommendations/[id]",
                  params: {
                    id: result.id,
                    budget: budgetValidation.normalizedInput,
                    preferences: params.preferences ?? ""
                  }
                }}
                key={result.id}
                style={styles.card}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.restaurant}>{card.restaurantName}</Text>
                  <Text style={styles.itemName}>{card.itemName}</Text>
                  <Text style={styles.price}>Szacowana cena: {card.estimatedPrice}</Text>
                  <View style={styles.reasonChips}>
                    {card.reasonChips.map((chip) => (
                      <Text key={chip} style={styles.reasonChip}>
                        {chip}
                      </Text>
                    ))}
                  </View>
                  <View style={styles.tags}>
                    {card.displayTags.map((tag) => (
                      <Text key={tag} style={styles.tag}>
                        {formatPreferenceTag(tag)}
                      </Text>
                    ))}
                  </View>
                </View>
              </Link>
            );
          })}
        </View>
      )}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    backgroundColor: "#ffffff",
    borderColor: "#c8d7d0",
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 16
  },
  actions: {
    gap: 10,
    marginTop: 8
  },
  list: {
    gap: 12
  },
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#d7e2dc",
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
    textDecorationLine: "none"
  },
  cardContent: {
    gap: 8,
    padding: 16
  },
  restaurant: {
    color: "#40564d",
    fontSize: 14,
    fontWeight: "700"
  },
  itemName: {
    color: "#17352b",
    fontSize: 18,
    fontWeight: "800"
  },
  price: {
    color: "#233a31",
    fontSize: 15,
    fontWeight: "700"
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
