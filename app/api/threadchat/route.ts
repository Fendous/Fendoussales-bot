import {
  OpenAIAssistantStream,
  handleFunctionCall,
} from "@/lib/assistant/assistant-stream";

export async function POST(request: Request) {
  const { payload, isFunctionCall } = await request.json();

  try {
    if (isFunctionCall) {
      const stream = await handleFunctionCall(payload);
      return new Response(stream);
    }
    const stream = await OpenAIAssistantStream(payload);

    return new Response(stream);
  } catch (error: any) {
    console.error("Error in POST handler:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
