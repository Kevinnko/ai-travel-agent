import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import Button from "@/components/Button";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("@/assets/images/logo-AI-Travel-Agent.png")}
      />
      <Link href="/planner" asChild>
        <Button text="Let's begin" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2FFFF",
    paddingHorizontal: 35,
  },
  logo: {
    width: "100%",
    height: 380,
  },
});
