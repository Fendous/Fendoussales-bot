"use client";

import { FloatingMessagesContext } from "@/context/floatingBotMessages";
import { AssistantStream } from "openai/lib/AssistantStream";

import { Message } from "@/lib/validators/message";
import { Paperclip, Mic } from "lucide-react";

import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";

interface FloatingBotInputProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
}

function FloatingBotInput({ fileInputRef }: FloatingBotInputProps) {
  const { data: session } = useSession();
  const email = session?.user?.email as string;
  const [input, setInput] = useState<string>("");

  const handleFileIconClick = () => {
    fileInputRef.current?.click();
  };

  const {
    addMessage,
    removeMessage,
    setIsMessageUpdating,
    isMessageUpdating,
    updateMessage,
  } = useContext(FloatingMessagesContext);

  async function handleSubmit(input: string) {
    setIsMessageUpdating(true);
    const userMessage: Message = {
      id: nanoid(),
      isUserMessage: true,
      text: input,
    };

    addMessage(userMessage);
    setInput("");

    try {
      const response = await fetch("/api/threadchat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          userMessage: input,
        }),
      });

      if (!response.body) {
        console.error("No response body");
        removeMessage(userMessage.id);
        setIsMessageUpdating(false);
        return;
      }

      const stream = AssistantStream.fromReadableStream(response.body as any);

      let id = "";
      const handleTextCreated = () => {
        id = nanoid();
        const newMessage: Message = {
          id,
          isUserMessage: false,
          text: "",
        };
        addMessage(newMessage);
        console.log("New message ID:", id);
      };

      const handleTextDelta = (delta: any) => {
        if (delta.value != null) {
          updateMessage(id, (prev) => prev + delta.value);
        }
      };

      const handleTextEnd = () => {
        id = "";
        setIsMessageUpdating(false);
      };

      stream.on("event", (event) => {
        if (event.event === "thread.run.requires_action") {
          console.log("Requires Action:", event);
        }
      });

      stream.on("textCreated", handleTextCreated);
      stream.on("textDelta", handleTextDelta);
      stream.on("end", handleTextEnd);
      stream.on("error", (error) => {
        console.log("Stream Error:", error);
        id = "";
        setIsMessageUpdating(false);
      });

      const result = await stream.finalRun();
      if (result.status === "completed") {
        stream.abort();
      }
    } catch (error) {
      console.error("Error during fetch or stream processing:", error);
      setIsMessageUpdating(false);
    }
  }

  return (
    <div className="relative w-full mb-1">
      <input
        type="text"
        placeholder="Type a message..."
        className="w-full border border-gray-300 rounded-xl p-2 pl-12"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(input);
          }
        }}
        value={input}
      />
      <Paperclip
        size={20}
        onClick={handleFileIconClick}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-900"
      />
      <Mic
        size={20}
        onClick={handleFileIconClick}
        className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-900"
      />
    </div>
  );
}

export default FloatingBotInput;
