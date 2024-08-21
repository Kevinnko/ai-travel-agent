import { getGeoCoordinates, getWeather, tools } from "./tools";
import OpenAI from "openai";

// TODO: refactor this file and fix TypeScript errors

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const availableFunctions = {
  get_weather: getWeather,
  get_geo_coordinates: getGeoCoordinates,
};

type ChatCompletionMessageParam = {
  role: "system" | "user" | "assistant" | "tool";
  content?: string;
  name?: string;
  tool_calls?: Array<{
    id: string;
    function: {
      name: string;
      arguments: string;
    };
    type: "function";
  }>;
};

type ChatCompletionTool = {
  function: {
    name: string;
    description: string;
    parameters: {
      type: string;
      properties: Record<string, { type: string; description: string }>;
      required: string[];
      additionalProperties: boolean;
    };
  };
  type: "function";
  strict: boolean;
};

const messages: ChatCompletionMessageParam[] = [
  {
    role: "system",
    content: `
You are a helpful AI travel agent.

Use the provided tools to get the weather information for the trip, at the destination location, i.e. the toLocation field. Do not call the tools for the fromLocation, as it is not relevant. Based on the location, you need to call a tool to get the geo coordinates. If the dates are further than 5 days away, make up an answer, or pick a random answer from the weather data. Provide the weather in Celsius, in a short sentence giving highs and lows.

Invent the flights and hotels data for the trip, that will seem realistic based on the itinerary and the budget, as well as the number of passengers. From that data, sum up in one short sentence the recommended flights and hotels for the trip, without mentioning the dates. Use a famous name for both the airlines and hotels.

Format the output as a JSON object with the following fields: flights, hotels, and weather. Return only the JSON object, without any other text.
`,
  },
];

export async function POST(request: Request) {
  const body = await request.json();

  const {
    fromLocation,
    toLocation,
    fromDate,
    toDate,
    budget,
    numberOfPassengers,
  } = body;

  messages.push({
    role: "user",
    content: `
    Hello, here are the details of the trip:
    From: ${fromLocation}
    To: ${toLocation}
    From date: ${fromDate}
    To date: ${toDate}
    Budget: ${budget}
    Number of passengers: ${numberOfPassengers}`,
  });

  const MAX_ITERATIONS = 3;

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      tools: tools as ChatCompletionTool[],
      response_format: { type: "json_object" },
    });

    const { finish_reason: finishReason, message } = response.choices[0];
    const { tool_calls: toolCalls } = message;

    if (!message || typeof message !== "object") {
      console.error(
        "🚀 ~ POST ~ Unexpected response format ; message:",
        message
      );
      throw new Error("Unexpected response format");
    }

    messages.push(message);

    if (finishReason === "stop") {
      return Response.json({ answer: JSON.parse(message.content) });
    }
    if (finishReason === "tool_calls" && toolCalls) {
      for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name;
        const functionToCall = availableFunctions[functionName];
        let functionArgs;
        if (toolCall.function.arguments) {
          functionArgs = JSON.parse(toolCall.function.arguments);
        }

        let functionResponse;
        if (functionArgs) {
          try {
            functionResponse = await functionToCall(functionArgs);

            if (functionResponse) {
              messages.push({
                tool_call_id: toolCall.id,
                role: "tool",
                content: JSON.stringify(functionResponse),
              });
            }
          } catch (error) {
            console.error("🚀 ~ POST ~ function calling error:", error);
          }
        } else {
          throw new Error("No function arguments");
        }
      }
    }
  }
  console.error("🚀 ~ POST ~ Something went wrong");
  return Response.json({ answer: "Something went wrong" });
}
