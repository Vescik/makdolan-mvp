import { StyleSheet, View } from "react-native";

import { AppShell } from "../ui/AppShell";
import { BodyText, Label, Subtitle, Title } from "../ui/ScreenText";

export function ProfilePreferencesScreen() {
  return (
    <AppShell>
      <Title>Local preferences</Title>
      <Subtitle>Placeholder for local defaults. Sprint 1 does not use accounts or cloud sync.</Subtitle>

      <View style={styles.panel}>
        <Label>Planned defaults</Label>
        <BodyText>- Usual budget</BodyText>
        <BodyText>- Favorite simple tags</BodyText>
        <BodyText>- Small or filling meal preference</BodyText>
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
