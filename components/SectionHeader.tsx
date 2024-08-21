import { StyleSheet, Text } from "react-native";

const SectionHeader = ({ title }: { title: string }) => (
  <Text style={styles.sectionHeaderTitle}>{title}</Text>
);

const styles = StyleSheet.create({
  sectionHeaderTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default SectionHeader;
