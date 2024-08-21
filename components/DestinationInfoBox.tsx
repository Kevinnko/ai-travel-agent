import { StyleSheet, Text, View } from "react-native";

const DestinationInfoBox = ({ from, to }: { from: string; to: string }) => (
  <View style={styles.infoBox}>
    <Text style={styles.destinationInfoBoxText}>{from}</Text>
    <Text style={styles.destinationInfoBoxText}>→</Text>
    <Text style={styles.destinationInfoBoxText}>{to}</Text>
  </View>
);

export default DestinationInfoBox;

const styles = StyleSheet.create({
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#BBF7F7",
    borderRadius: 20,
    padding: 14,
    marginBottom: 34,
  },
  destinationInfoBoxText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
