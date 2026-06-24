import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { mockRecommendations } from "../domain/recommendations/mockRecommendations";
import { defaultSearchInput, scoreCandidate } from "../domain/recommendations/scoring";
import { AppShell } from "../ui/AppShell";
import { BodyText, Label, Subtitle, Title } from "../ui/ScreenText";

export function RecommendationDetailsScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const candidate = mockRecommendations.find((item) => item.id === params.id);

  if (!candidate) {
    return (
      <AppShell>
        <Title>Recommendation not found</Title>
        <BodyText>This mock item is not available in the local seed data.</BodyText>
      </AppShell>
    );
  }

  const scored = scoreCandidate(candidate, defaultSearchInput);

  return (
    <AppShell>
      <Title>{candidate.itemName}</Title>
      <Subtitle>{candidate.restaurant.outletName}</Subtitle>

      <View style={styles.panel}>
        <Label>Estimated price</Label>
        <Text style={styles.value}>
          {candidate.price.amount.toFixed(2)} {candidate.price.currency}
        </Text>
        <BodyText>
          Source: {candidate.price.source}. Last verified: {candidate.price.lastVerifiedAt}. Confidence:{" "}
          {candidate.price.confidence}/100.
        </BodyText>
      </View>

      <View style={styles.panel}>
        <Label>Why this appears</Label>
        {scored.reasons.map((reason) => (
          <BodyText key={reason}>- {reason}</BodyText>
        ))}
      </View>

      <View style={styles.panel}>
        <Label>Restaurant</Label>
        <BodyText>{candidate.restaurant.address}</BodyText>
        <BodyText>
          {candidate.restaurant.distanceKm.toFixed(1)} km away · Rating {candidate.restaurant.rating.toFixed(1)}
        </BodyText>
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
    gap: 6,
    padding: 16
  },
  value: {
    color: "#17352b",
    fontSize: 24,
    fontWeight: "800"
  }
});

