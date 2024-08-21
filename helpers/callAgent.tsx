async function callAgent({
  fromLocation,
  toLocation,
  fromDate,
  toDate,
  budget,
  numberOfPassengers,
}: {
  fromLocation: string;
  toLocation: string;
  fromDate: Date;
  toDate: Date;
  budget: string;
  numberOfPassengers: number;
}) {
  try {
    const response = await fetch("/api/planner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromLocation,
        toLocation,
        fromDate,
        toDate,
        budget,
        numberOfPassengers,
      }),
    });
    const data = await response.json();

    return {
      weather: data.answer.weather,
      flights: data.answer.flights,
      hotels: data.answer.hotels,
    };
  } catch (error) {
    console.error("🚀 ~ POST ~ error:", error);
    return {
      weather: null,
      flights: null,
      hotels: null,
    };
  }
}

export default callAgent;
