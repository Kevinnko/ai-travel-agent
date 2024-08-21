import { Stack } from "expo-router";
import { GlobalStateProvider } from "@/context/GlobalStateContext";

export default function RootLayout() {
  return (
    <GlobalStateProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="planner" options={{ headerShown: false }} />
        <Stack.Screen name="trip" options={{ headerShown: false }} />
      </Stack>
    </GlobalStateProvider>
  );
}
