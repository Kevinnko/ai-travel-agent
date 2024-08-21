import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({
  onPress,
  text,
  disabled,
}: {
  onPress?: () => void;
  text: string;
  disabled?: boolean;
}) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          opacity: pressed ? 0.7 : 1,
          backgroundColor: disabled ? "#CCC" : "#4BDCB0",
        },
      ]}
      onPress={(onPress as any) ?? undefined}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4BDCB0",
    padding: 10,
    borderColor: "#000",
    borderWidth: 4,
    borderRadius: 40,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
