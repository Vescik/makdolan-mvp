import { StyleSheet, View } from "react-native";

import { AppShell } from "../ui/AppShell";
import { BodyText, Label, Subtitle, Title } from "../ui/ScreenText";

export function ProfilePreferencesScreen() {
  return (
    <AppShell>
      <Title>Profile preferences</Title>
      <Subtitle>Placeholder for saved defaults after the MVP validates repeat usage.</Subtitle>

      <View style={styles.panel}>
        <Label>Planned defaults</Label>
        <BodyText>- Usual budget</BodyText>
        <BodyText>- Favorite food tags</BodyText>
        <BodyText>- Pickup, delivery, or dine-in preference</BodyText>
        <BodyText>- Dietary preferences</BodyText>
      </View>

      <View style={styles.panel}>
        <Label>Not in this skeleton</Label>
        <BodyText>Authentication, payments, ordering, production APIs, and scraping are intentionally excluded.</BodyText>
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
  }
});

