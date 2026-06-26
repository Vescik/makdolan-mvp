import { StyleSheet, View } from "react-native";

import { AppShell } from "../ui/AppShell";
import { BodyText, Label, Subtitle, Title } from "../ui/ScreenText";

export function ProfilePreferencesScreen() {
  return (
    <AppShell>
      <Title>Lokalne preferencje</Title>
      <Subtitle>Ta sekcja jest ukryta z głównego przepływu, dopóki nie daje realnej wartości użytkownikowi.</Subtitle>

      <View style={styles.panel}>
        <Label>Możliwe ustawienia później</Label>
        <BodyText>- Domyślny budżet</BodyText>
        <BodyText>- Ulubione proste preferencje</BodyText>
        <BodyText>- Mały lub sycący posiłek</BodyText>
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
