import { StyleSheet, Text, TextProps } from "react-native";

export function Title({ style, ...props }: TextProps) {
  return <Text {...props} style={[styles.title, style]} />;
}

export function Subtitle({ style, ...props }: TextProps) {
  return <Text {...props} style={[styles.subtitle, style]} />;
}

export function BodyText({ style, ...props }: TextProps) {
  return <Text {...props} style={[styles.body, style]} />;
}

export function Label({ style, ...props }: TextProps) {
  return <Text {...props} style={[styles.label, style]} />;
}

const styles = StyleSheet.create({
  title: {
    color: "#17352b",
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 38
  },
  subtitle: {
    color: "#51645c",
    fontSize: 16,
    lineHeight: 23
  },
  body: {
    color: "#233a31",
    fontSize: 15,
    lineHeight: 22
  },
  label: {
    color: "#17352b",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6
  }
});

