"use client";

import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, ReactNode, useContext, useState } from "react";
import { Copy, Volume2 } from "lucide-react";
import { toast } from "sonner";

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ThreadsChatMessages: FC<ChatMessagesProps> = ({
  className,
  ...props
}) => {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  function addToClipBoard(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard");
  }
  async function playAudio(url: string) {
    if (!audioContext) {
      const context = new AudioContext();
      setAudioContext(context);
    }

    const context = audioContext || new AudioContext();
    setAudioContext(context);

    try {
      // Fetch the audio file from the object URL
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();

      // Decode the audio data
      const audioBuffer = await context.decodeAudioData(arrayBuffer);

      // Create an AudioBufferSourceNode
      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);

      // Start playing the audio
      source.start();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  }

  return (
    <div
      {...props}
      className={cn(
        "flex flex-col-reverse gap-3 overflow-y-auto  scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch bg-red-90 no-scrollbar",
        className
      )}
    >
      <div className="flex-1 flex-grow" />
      {inverseMessages.map((message) => {
        return (
          <div className="chat-message" key={`${message.id}-${message.id}`}>
            <div
              className={cn("flex items-end", {
                "justify-end": message.isUserMessage,
              })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-sm max-w-xs -mx-1 overflow-x-hidden",
                  {
                    "order-1 items-end": message.isUserMessage,
                    "order-2 items-start": !message.isUserMessage,
                  }
                )}
              >
                <div className="flex flex-col items-cente gap-2">
                  <p
                    className={cn("px-2 py-2 rounded", {
                      "bg-blue-600 text-white": message.isUserMessage,
                      "bg-gray-200 text-gray-900": !message.isUserMessage,
                    })}
                  >
                    {/* <MarkdownLite text={message.text} /> */}
                    {message.text}
                  </p>
                  {!message.isUserMessage && (
                    <p className="flex gap-2">
                      <Volume2
                        onClick={() => playAudio(message.audio!)}
                        size={18}
                        className="hover:cursor-pointer"
                      />
                      <Copy
                        onClick={() => addToClipBoard(message.text)}
                        size={18}
                        className="hover:cursor-pointer"
                      />
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ThreadsChatMessages;
