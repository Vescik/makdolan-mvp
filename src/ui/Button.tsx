import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  accessibilityLabel?: string;
};

export function Button({ label, onPress, variant = "primary", accessibilityLabel }: ButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === "secondary" ? styles.secondary : styles.primary,
        pressed && styles.pressed
      ]}
    >
      <Text style={[styles.label, variant === "secondary" && styles.secondaryLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 8,
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  primary: {
    backgroundColor: "#1f6f4a"
  },
  secondary: {
    backgroundColor: "#e6eee9",
    borderColor: "#bfd1c7",
    borderWidth: 1
  },
  label: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700"
  },
  secondaryLabel: {
    color: "#17352b"
  },
  pressed: {
    opacity: 0.78
  }
});

