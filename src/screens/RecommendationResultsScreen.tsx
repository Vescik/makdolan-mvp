import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { mockRecommendations } from "../domain/recommendations/mockRecommendations";
import { defaultSearchInput, parsePreferenceTags, scoreRecommendations } from "../domain/recommendations/scoring";
import { AppShell } from "../ui/AppShell";
import { BodyText, Subtitle, Title } from "../ui/ScreenText";

export function RecommendationResultsScreen() {
  const params = useLocalSearchParams<{ budget?: string; location?: string; preferences?: string }>();
  const budget = Number.parseFloat(params.budget ?? `${defaultSearchInput.budgetAmount}`);
  const safeBudget = Number.isFinite(budget) && budget > 0 ? budget : defaultSearchInput.budgetAmount;

  const results = scoreRecommendations(mockRecommendations, {
    ...defaultSearchInput,
    budgetAmount: safeBudget,
    locationLabel: params.location ?? defaultSearchInput.locationLabel,
    preferenceTags: parsePreferenceTags(params.preferences)
  });

  return (
    <AppShell>
      <Title>Recommended nearby</Title>
      <Subtitle>
        Mock results for {safeBudget.toFixed(2)} PLN near {params.location ?? defaultSearchInput.locationLabel}.
      </Subtitle>

      {results.length === 0 ? (
        <View style={styles.emptyState}>
          <BodyText>No mock recommendation fits this budget yet. Try increasing the budget or removing filters.</BodyText>
        </View>
      ) : (
        <View style={styles.list}>
          {results.map((result) => (
            <Link
              accessibilityLabel={`Open details for ${result.itemName}`}
              href={{ pathname: "/recommendations/[id]", params: { id: result.id } }}
              key={result.id}
              style={styles.card}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.itemName}>{result.itemName}</Text>
                  <Text style={styles.score}>{result.score}</Text>
                </View>
                <Text style={styles.restaurant}>{result.restaurant.outletName}</Text>
                <Text style={styles.meta}>
                  {result.price.amount.toFixed(2)} {result.price.currency} · {result.restaurant.distanceKm.toFixed(1)} km
                </Text>
                <Text style={styles.reason}>{result.reasons.join(" · ")}</Text>
              </View>
            </Link>
          ))}
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
    gap: 6,
    padding: 16
  },
  cardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  itemName: {
    color: "#17352b",
    flex: 1,
    fontSize: 18,
    fontWeight: "800"
  },
  score: {
    color: "#1f6f4a",
    fontSize: 16,
    fontWeight: "800"
  },
  restaurant: {
    color: "#40564d",
    fontSize: 15,
    fontWeight: "700"
  },
  meta: {
    color: "#51645c",
    fontSize: 14
  },
  reason: {
    color: "#1f6f4a",
    fontSize: 14,
    fontWeight: "700"
  }
});

