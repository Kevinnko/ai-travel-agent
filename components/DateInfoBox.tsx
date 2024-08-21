import { StyleSheet, Text, View } from "react-native";

const DateInfoBox = ({ date, first }: { date: Date; first?: boolean }) => (
  <View style={[styles.dateInfoBox, { marginRight: first ? 10 : 0 }]}>
    <Text style={styles.dateInfoBoxText}>{date.toLocaleDateString()}</Text>
  </View>
);

const styles = StyleSheet.create({
  dateInfoBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BBF7F7",
    borderRadius: 20,
    padding: 14,
    marginBottom: 34,
  },
  dateInfoBoxText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default DateInfoBox;
