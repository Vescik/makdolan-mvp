import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#f7faf8" },
          headerTintColor: "#17352b",
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: "#f7faf8" }
        }}
      >
        <Stack.Screen name="index" options={{ title: "Makdolan" }} />
        <Stack.Screen name="preferences" options={{ title: "Preferencje" }} />
        <Stack.Screen name="results" options={{ title: "Propozycje" }} />
        <Stack.Screen name="recommendations/[id]" options={{ title: "Szczegóły" }} />
        <Stack.Screen name="profile/preferences" options={{ title: "Lokalne preferencje" }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
