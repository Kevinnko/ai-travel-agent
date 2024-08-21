import { Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";

const BudgetInput = ({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) => (
  <>
    <Text style={styles.label}>Budget</Text>
    <View style={[styles.input, styles.budgetInput]}>
      <Text style={styles.symbol}>€</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        placeholder="5000"
        style={{ fontSize: 25 }}
      />
    </View>
  </>
);

const styles = StyleSheet.create({
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
  symbol: {
    fontWeight: "bold",
    fontSize: 25,
    marginRight: 10,
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
  },
  budgetInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

export default BudgetInput;
