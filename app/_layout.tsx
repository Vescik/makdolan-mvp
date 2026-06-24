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
        <Stack.Screen name="preferences" options={{ title: "Preferences" }} />
        <Stack.Screen name="results" options={{ title: "Recommendations" }} />
        <Stack.Screen name="recommendations/[id]" options={{ title: "Details" }} />
        <Stack.Screen name="profile/preferences" options={{ title: "Profile Preferences" }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}

