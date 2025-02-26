import { streamingTextToSpeech } from "@/lib/assistant/textToSpeech";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { text } = await request.json();

  const nodeStream = await streamingTextToSpeech(text);

  // Convert the Node.js readable stream to a web-compatible ReadableStream
  // const webStream = new ReadableStream<Uint8Array>({
  //   start(controller) {
  //     nodeStream.on("data", (chunk: Uint8Array) => {
  //       controller.enqueue(chunk);
  //     });
  //     nodeStream.on("end", () => controller.close());
  //     nodeStream.on("error", (err: Error) => controller.error(err));
  //   },
  // });

  return new NextResponse(nodeStream as unknown as ReadableStream, {
    headers: { "Content-Type": "audio/mp3" },
  });
  // return new NextResponse(webStream as unknown as ReadableStream, {
  //   headers: { "Content-Type": "audio/mpeg" },
  // });
}
