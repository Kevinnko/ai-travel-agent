import { openai } from "@/config/openai";
import { initialMessages } from "@/config/messages";
import { handleToolCalls } from "@/helpers/handleToolCalls";
import { tools } from "@/helpers/tools";
import { ChatCompletionMessageParam, ChatCompletionTool } from "@/types";

export async function POST(request: Request) {
  const messages: ChatCompletionMessageParam[] = [...initialMessages];

  try {
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
        if (message.content) {
          return Response.json({ answer: JSON.parse(message.content) });
        } else {
          console.error("🚀 ~ POST ~ Message content is null or undefined");
          throw new Error("Message content is null or undefined");
        }
      }
      if (finishReason === "tool_calls" && toolCalls) {
        await handleToolCalls(toolCalls, messages);
      }
    }
    console.error("🚀 ~ POST ~ Something went wrong");
    return Response.json({ answer: "Something went wrong" });
  } catch (error) {
    console.error("An error occurred in the catch block:", error);
    return Response.json({ answer: "Something went wrong" });
  }
}
