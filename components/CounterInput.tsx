import { Text, Pressable, View } from "react-native";
import { StyleSheet } from "react-native";

const CounterInput = ({
  value,
  onIncrement,
  onDecrement,
}: {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) => (
  <View style={[styles.input, styles.counter]}>
    <Pressable style={styles.counterButton} onPress={onDecrement}>
      <Text style={styles.buttonText}>-</Text>
    </Pressable>
    <Text style={styles.counterText}>{value}</Text>
    <Pressable style={styles.counterButton} onPress={onIncrement}>
      <Text style={styles.buttonText}>+</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  counterButton: {
    backgroundColor: "#000",
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    height: 60,
    width: "100%",
    margin: 12,
    borderWidth: 4,
    borderColor: "#000",
    borderRadius: 40,
    padding: 10,
    textAlign: "center",
    fontSize: 22,
  },
});

export default CounterInput;
