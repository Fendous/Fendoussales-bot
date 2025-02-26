import 'openai/shims/node'
import { NextRequest, NextResponse } from "next/server";

import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(request: NextRequest): Promise<NextResponse> {
  const audioFile = (await request.formData()).get("audioFile");

  const transcription = await openai.audio.transcriptions.create({
    file: audioFile as File,
    model: "whisper-1",
    response_format: "text",
  });

  console.log("Transcription:", transcription);

  return NextResponse.json({ text: transcription });
}
