import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { defaultSearchInput } from "../domain/recommendations/scoring";
import { formatPreferenceTag } from "../domain/recommendations/tagLabels";
import { PreferenceTag } from "../domain/recommendations/types";
import { AppShell } from "../ui/AppShell";
import { Button } from "../ui/Button";
import { BodyText, Subtitle, Title } from "../ui/ScreenText";

const PREFERENCE_OPTIONS: PreferenceTag[] = [
  "chicken",
  "burger",
  "pizza",
  "kebab",
  "vegetarian",
  "small",
  "filling",
  "quick"
];

export function PreferencesScreen() {
  const params = useLocalSearchParams<{ budget?: string }>();
  const [selectedTags, setSelectedTags] = useState<PreferenceTag[]>([]);
  const budget = params.budget ?? `${defaultSearchInput.budgetAmount}`;

  const selectedCsv = useMemo(() => selectedTags.join(","), [selectedTags]);

  function toggleTag(tag: PreferenceTag) {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    );
  }

  return (
    <AppShell>
      <Title>Na co masz ochotę?</Title>
      <Subtitle>Wybierz kilka prostych preferencji albo pomiń ten krok, żeby zobaczyć wszystkie propozycje w budżecie.</Subtitle>
      <BodyText>Rynek testowy: Rzeszów.</BodyText>

      <View style={styles.grid}>
        {PREFERENCE_OPTIONS.map((tag) => {
          const selected = selectedTags.includes(tag);
          const label = formatPreferenceTag(tag);
          return (
            <Pressable
              accessibilityLabel={`Preferencja: ${label}`}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selected }}
              key={tag}
              onPress={() => toggleTag(tag)}
              style={[styles.chip, selected && styles.selectedChip]}
            >
              <Text style={[styles.chipText, selected && styles.selectedChipText]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Button
        label="Pokaż propozycje"
        onPress={() =>
          router.push({
            pathname: "/results",
            params: {
              budget,
              location: "Rzeszow",
              preferences: selectedCsv
            }
          })
        }
      />
    </AppShell>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  chip: {
    backgroundColor: "#ffffff",
    borderColor: "#c8d7d0",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  selectedChip: {
    backgroundColor: "#1f6f4a",
    borderColor: "#1f6f4a"
  },
  chipText: {
    color: "#17352b",
    fontSize: 15,
    fontWeight: "700"
  },
  selectedChipText: {
    color: "#ffffff"
  }
});
