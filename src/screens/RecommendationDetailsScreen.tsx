import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { mockRecommendations } from "../domain/recommendations/mockRecommendations";
import { AppShell } from "../ui/AppShell";
import { BodyText, Label, Title } from "../ui/ScreenText";

export function RecommendationDetailsScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const candidate = mockRecommendations.find((item) => item.id === params.id);

  if (!candidate) {
    return (
      <AppShell>
        <Title>Recommendation not found</Title>
        <BodyText>This mock item is not available in the local Rzeszow seed data.</BodyText>
      </AppShell>
    );
  }

  const card = {
    restaurantName: candidate.brand.name,
    itemName: candidate.menuItem.name,
    estimatedPrice: `${candidate.menuItem.basePrice.amount.toFixed(2)} ${candidate.menuItem.basePrice.currency}`,
    displayTags: candidate.menuItem.tags.slice(0, 3)
  };

  return (
    <AppShell>
      <Title>{card.itemName}</Title>

      <View style={styles.panel}>
        <Label>Restaurant</Label>
        <Text style={styles.value}>{card.restaurantName}</Text>
      </View>

      <View style={styles.panel}>
        <Label>Estimated item price</Label>
        <Text style={styles.value}>{card.estimatedPrice}</Text>
        <BodyText>Estimated price may vary by location.</BodyText>
      </View>

      <View style={styles.panel}>
        <Label>Tags</Label>
        <View style={styles.tags}>
          {card.displayTags.map((tag) => (
            <Text key={tag} style={styles.tag}>
              {tag}
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
