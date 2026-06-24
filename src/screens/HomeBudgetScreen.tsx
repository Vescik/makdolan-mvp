import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { AppShell } from "../ui/AppShell";
import { Button } from "../ui/Button";
import { BodyText, Label, Subtitle, Title } from "../ui/ScreenText";

export function HomeBudgetScreen() {
  const [budget, setBudget] = useState("20");
  const [location, setLocation] = useState("Warsaw Centrum");

  return (
    <AppShell>
      <View style={styles.hero}>
        <Title>Find food that fits your budget</Title>
        <Subtitle>
          Enter how much you want to spend and where you are. This MVP uses mock recommendations only.
        </Subtitle>
      </View>

      <View style={styles.form}>
        <View>
          <Label>Budget</Label>
          <TextInput
            accessibilityLabel="Budget amount"
            inputMode="decimal"
            onChangeText={setBudget}
            placeholder="20"
            style={styles.input}
            value={budget}
          />
        </View>

        <View>
          <Label>Location</Label>
          <TextInput
            accessibilityLabel="Location"
            onChangeText={setLocation}
            placeholder="Warsaw Centrum"
            style={styles.input}
            value={location}
          />
        </View>
      </View>

      <Button
        label="Choose preferences"
        onPress={() =>
          router.push({
            pathname: "/preferences",
            params: {
              budget,
              location
            }
          })
        }
      />

      <Button
        label="Profile preferences"
        onPress={() => router.push("/profile/preferences")}
        variant="secondary"
      />

      <BodyText>
        Ordering, payments, production scraping, and live restaurant APIs are intentionally out of scope.
      </BodyText>
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
  }
});

