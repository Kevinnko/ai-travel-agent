import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import Button from "@/components/Button";
import LocationInput from "@/components/LocationInput";
import DateInput from "@/components/DateInput";
import BudgetInput from "@/components/BudgetInput";
import CounterInput from "@/components/CounterInput";
import { useGlobalState } from "@/context/GlobalStateContext";
import { router } from "expo-router";
import callAgent from "@/helpers/callAgent";
import useForm from "@/hooks/useForm";

export default function PlannerScreen() {
  const [loading, setLoading] = useState(false);
  const { setGlobalState } = useGlobalState();
  const {
    formState,
    handleInputChange,
    incrementPassengers,
    decrementPassengers,
  } = useForm();

  const onPress = async () => {
    setLoading(true);
    try {
      const { weather, flights, hotels } = await callAgent(formState);
      setGlobalState({
        ...formState,
        weather,
        flights,
        hotels,
      });
      router.navigate("/trip");
    } catch (error) {
      console.error("Error planning trip:", error);
      Alert.alert(
        "Error",
        "There was an issue planning your trip. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const disabled = Object.values(formState).some((value) => !value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Number of travelers</Text>
      <CounterInput
        value={formState.numberOfPassengers}
        onIncrement={incrementPassengers}
        onDecrement={decrementPassengers}
      />
      <LocationInput
        label="Flying from"
        value={formState.fromLocation}
        onChangeText={(value) => handleInputChange("fromLocation", value)}
      />
      <LocationInput
        label="Flying to"
        value={formState.toLocation}
        onChangeText={(value) => handleInputChange("toLocation", value)}
      />
      <DateInput
        date={formState.fromDate}
        label="From date"
        setDate={(date) => handleInputChange("fromDate", date)}
      />
      <DateInput
        date={formState.toDate}
        label="To date"
        setDate={(date) => handleInputChange("toDate", date)}
      />
      <BudgetInput
        value={formState.budget}
        onChangeText={(value) => handleInputChange("budget", value)}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button disabled={disabled} text="Plan my trip!" onPress={onPress} />
      )}
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
  label: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
