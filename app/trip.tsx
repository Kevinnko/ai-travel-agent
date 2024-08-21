import Button from "@/components/Button";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Link } from "expo-router";
import SectionHeader from "@/components/SectionHeader";
import TripInfoBox from "@/components/TripInfoBox";
import DestinationInfoBox from "@/components/DestinationInfoBox";
import DateInfoBox from "@/components/DateInfoBox";

export default function TripScreen() {
  const {
    resetGlobalState,
    state: {
      weather,
      flights,
      hotels,
      fromLocation,
      toLocation,
      fromDate,
      toDate,
    },
  } = useGlobalState();

  if (
    !weather ||
    !flights ||
    !hotels ||
    !fromLocation ||
    !toLocation ||
    !fromDate ||
    !toDate
  ) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Something went wrong, try again.</Text>
        <Link href="/planner" asChild>
          <Button text="Plan another trip" />
        </Link>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F2FFFF",
      }}
    >
      <ScrollView
        automaticallyAdjustsScrollIndicatorInsets
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Your trip</Text>
        <View style={styles.dateContainer}>
          <DateInfoBox first date={fromDate} />
          <DateInfoBox date={toDate} />
        </View>
        <DestinationInfoBox from={fromLocation} to={toLocation} />
        <SectionHeader title="Weather" />
        <TripInfoBox description={weather} />
        <SectionHeader title="Flights" />
        <TripInfoBox description={flights} button={<Button text="Book" />} />
        <SectionHeader title="Hotels" />
        <TripInfoBox description={hotels} button={<Button text="Book" />} />
        <Link href="/planner" asChild>
          <Button onPress={resetGlobalState} text="Plan another trip" />
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 30,
  },
  dateContainer: {
    flexDirection: "row",
  },
});
