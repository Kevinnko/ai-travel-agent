import { Text, TextInput } from "react-native";
import { StyleSheet } from "react-native";

const LocationInput = ({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
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
  label: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default LocationInput;
