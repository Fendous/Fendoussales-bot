#!/usr/bin/env -S npm run tsn -T
import "openai/shims/node";
export {};

import OpenAI from "openai";
import fs from "node:fs";

const openai = new OpenAI();

export async function streamingTextToSpeech(inputText: string) {
  const response = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: inputText,
  });

  const stream = response.body as unknown as NodeJS.ReadableStream;

  return stream;
}

async function streamToFile(stream: NodeJS.ReadableStream, path: fs.PathLike) {
  return new Promise((resolve, reject) => {
    const writeStream = fs
      .createWriteStream(path)
      .on("error", reject)
      .on("finish", resolve);

    // If you don't see a `stream.pipe` method and you're using Node you might need to add `import 'openai/shims/node'` at the top of your entrypoint file.
    stream.pipe(writeStream).on("error", (error) => {
      writeStream.close();
      reject(error);
    });
  });
}
