import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 24
  },
  content: {
    alignSelf: "center",
    gap: 16,
    maxWidth: 720,
    width: "100%"
  }
});

