export async function getGeoCoordinates(
  city: string
): Promise<{ lat: number; lon: number }> {
  const apiKey = process.env.WEATHER_API_KEY;
  const apiUrl = process.env.WEATHER_API_URL;
  const url = `${apiUrl}/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    console.error("🚀 ~ getGeoCoordinates ~ Failed to fetch geo coordinates");
    throw new Error("Failed to fetch geo coordinates");
  }

  const data = await response.json();
  if (data.length === 0) {
    console.error("🚀 ~ getGeoCoordinates ~ City not found");
    throw new Error("City not found");
  }

  const { lat, lon } = data[0];
  return { lat, lon };
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      "3h": number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export async function getWeather({
  latitude: lat,
  longitude: lon,
}: {
  latitude: number;
  longitude: number;
}): Promise<WeatherData> {
  const apiKey = process.env.WEATHER_API_KEY;
  const apiUrl = process.env.WEATHER_API_URL;
  const url = `${apiUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${apiKey}`;

  try {
    const weatherForecast = await fetch(url);
    if (!weatherForecast.ok) {
      const contentType = weatherForecast.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorDetails = await weatherForecast.json();
        console.error("Error fetching weather data:", errorDetails);
        throw new Error(
          `Failed to fetch weather data: ${weatherForecast.statusText}`
        );
      } else {
        const errorText = await weatherForecast.text();
        console.error(
          "Error fetching weather data (non-JSON response):",
          errorText
        );
        throw new Error(
          `Failed to fetch weather data: ${weatherForecast.statusText}`
        );
      }
    }
    const weatherData = await weatherForecast.json();
    return weatherData;
  } catch (error) {
    console.error("🚀 ~ getWeather ~ error:", error);
    throw new Error("An error occurred while fetching weather data.");
  }
}

export const tools = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "Get the weather for a given location.",
      parameters: {
        type: "object",
        properties: {
          latitude: {
            type: "number",
            description:
              "The latitude of the city from where to get the weather.",
          },
          longitude: {
            type: "number",
            description:
              "The longitude of the city from where to get the weather.",
          },
        },
        required: ["from_location"],
        additionalProperties: false,
      },
    },
    strict: true,
  },
  {
    type: "function",
    function: {
      name: "get_geo_coordinates",
      description: "Get the geo coordinates for a given location.",
      parameters: {
        type: "object",
        properties: {
          from_location: {
            type: "string",
            description:
              "The name of the city from where to get the geo coordinates.",
          },
        },
        required: ["from_location"],
        additionalProperties: false,
      },
    },
    strict: true,
  },
];
