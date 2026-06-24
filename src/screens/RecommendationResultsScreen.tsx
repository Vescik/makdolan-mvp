import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { mockRecommendations } from "../domain/recommendations/mockRecommendations";
import {
  defaultSearchInput,
  getRecommendationResponse,
  parsePreferenceTags,
  toRecommendationCard
} from "../domain/recommendations/scoring";
import { AppShell } from "../ui/AppShell";
import { BodyText, Subtitle, Title } from "../ui/ScreenText";

export function RecommendationResultsScreen() {
  const params = useLocalSearchParams<{ budget?: string; location?: string; preferences?: string }>();
  const budget = Number.parseFloat(params.budget ?? `${defaultSearchInput.budgetAmount}`);
  const safeBudget = Number.isFinite(budget) && budget > 0 ? budget : defaultSearchInput.budgetAmount;

  const response = getRecommendationResponse(mockRecommendations, {
    ...defaultSearchInput,
    budgetAmount: safeBudget,
    locationLabel: params.location ?? defaultSearchInput.locationLabel,
    selectedTags: parsePreferenceTags(params.preferences)
  });
  const { fallback, results } = response;

  return (
    <AppShell>
      <Title>Food ideas for your budget</Title>
      <Subtitle>
        Rzeszow mock results for {safeBudget.toFixed(2)} PLN. Estimated prices may vary by location.
      </Subtitle>

      {results.length === 0 ? (
        <View style={styles.emptyState}>
          <Title>{fallback?.title ?? "No matching food ideas yet"}</Title>
          <BodyText>{fallback?.message ?? "Try increasing the budget or removing filters."}</BodyText>
          {fallback?.suggestions.map((suggestion) => (
            <BodyText key={suggestion}>- {suggestion}</BodyText>
          ))}
        </View>
      ) : (
        <View style={styles.list}>
          {results.map((result) => {
            const card = toRecommendationCard(result);
            return (
              <Link
                accessibilityLabel={`Open details for ${card.itemName}`}
                href={{ pathname: "/recommendations/[id]", params: { id: result.id } }}
                key={result.id}
                style={styles.card}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.restaurant}>{card.restaurantName}</Text>
                  <Text style={styles.itemName}>{card.itemName}</Text>
                  <Text style={styles.price}>Estimated price: {card.estimatedPrice}</Text>
                  <View style={styles.tags}>
                    {card.displayTags.map((tag) => (
                      <Text key={tag} style={styles.tag}>
                        {tag}
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
    padding: 16
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
