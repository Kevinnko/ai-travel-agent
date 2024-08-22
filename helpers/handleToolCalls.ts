import { getGeoCoordinates, getWeather } from "@/helpers/tools";
import { ChatCompletionMessageParam } from "../types";

export const availableFunctions = {
  get_weather: getWeather,
  get_geo_coordinates: getGeoCoordinates,
};

type AvailableFunctionNames = keyof typeof availableFunctions;

export async function handleToolCalls(
  toolCalls: any[],
  messages: ChatCompletionMessageParam[]
) {
  for (const toolCall of toolCalls) {
    const functionName = toolCall.function.name as AvailableFunctionNames;
    const functionToCall = availableFunctions[functionName];
    let functionArgs;
    if (toolCall.function.arguments) {
      functionArgs = JSON.parse(toolCall.function.arguments);
    }

    if (functionArgs) {
      try {
        const functionResponse = await functionToCall(functionArgs);
        if (functionResponse) {
          messages.push({
            tool_call_id: toolCall.id,
            role: "tool",
            content: JSON.stringify(functionResponse),
          });
        }
      } catch (error) {
        console.error("🚀 ~ handleToolCalls ~ function calling error:", error);
        throw new Error("Function calling error");
      }
    } else {
      console.error("🚀 ~ handleToolCalls ~ No function arguments");
      throw new Error("No function arguments");
    }
  }
}
