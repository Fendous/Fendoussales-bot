export const fetchAudioUrl = async (
  inputText: string
): Promise<string | null> => {
  try {
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText }),
    });

    if (response.ok && response.body) {
      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              if (value) {
                controller.enqueue(value);
                chunks.push(value);
              }
              push();
            });
          }
          push();
        },
      });

      // Read and decode the chunks
      const audioData = await streamToArrayBuffer(stream);

      // Convert audio buffer to Blob and create URL
      const blob = new Blob(chunks, { type: "audio/mp3" });
      return URL.createObjectURL(blob);
    } else {
      console.error("Failed to fetch audio stream");
      return null;
    }
  } catch (error) {
    console.error("Error fetching audio stream:", error);
    return null;
  }
};

// Helper function to convert ReadableStream to ArrayBuffer
const streamToArrayBuffer = async (
  stream: ReadableStream<Uint8Array>
): Promise<ArrayBuffer> => {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let done: boolean = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    if (value) {
      chunks.push(value);
    }
    done = doneReading;
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const arrayBuffer = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    arrayBuffer.set(chunk, offset);
    offset += chunk.length;
  }
  return arrayBuffer.buffer;
};
