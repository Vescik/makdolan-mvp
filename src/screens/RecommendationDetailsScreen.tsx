import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { mockRecommendations } from "../domain/recommendations/mockRecommendations";
import { formatPreferenceTag } from "../domain/recommendations/tagLabels";
import { AppShell } from "../ui/AppShell";
import { BodyText, Label, Title } from "../ui/ScreenText";

export function RecommendationDetailsScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const candidate = mockRecommendations.find((item) => item.id === params.id);

  if (!candidate) {
    return (
      <AppShell>
        <Title>Nie znaleziono propozycji</Title>
        <BodyText>Ta pozycja nie jest dostępna w lokalnych danych testowych dla Rzeszowa.</BodyText>
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
      <BodyText>Prosta propozycja z rynku testowego w Rzeszowie.</BodyText>

      <View style={styles.panel}>
        <Label>Restauracja</Label>
        <Text style={styles.value}>{card.restaurantName}</Text>
      </View>

      <View style={styles.panel}>
        <Label>Szacowana cena pozycji</Label>
        <Text style={styles.value}>{card.estimatedPrice}</Text>
        <BodyText>Cena jest szacunkowa i może różnić się zależnie od lokalu.</BodyText>
      </View>

      <View style={styles.panel}>
        <Label>Preferencje</Label>
        <View style={styles.tags}>
          {card.displayTags.map((tag) => (
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
