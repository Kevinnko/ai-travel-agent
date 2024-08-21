import { StyleSheet, Text, View } from "react-native";

const TripInfoBox = ({
  description,
  button,
}: {
  description: string;
  button?: React.ReactNode;
}) => (
  <View style={styles.tripInfoBox}>
    <Text style={styles.tripInfoBoxText}>{description}</Text>
    {button && button}
  </View>
);

export default TripInfoBox;

const styles = StyleSheet.create({
  tripInfoBox: {
    width: "100%",
    backgroundColor: "#BBF7F7",
    borderRadius: 20,
    padding: 14,
    marginBottom: 34,
  },
  tripInfoBoxText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
