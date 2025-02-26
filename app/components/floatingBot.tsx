"use client";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState, useContext } from "react";
import { usePathname } from "next/navigation";
import { FloatingMessagesContext } from "@/context/floatingBotMessages";
import FloatingBotInput from "./floatingBotInput";

const FloatingBot = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { messages } = useContext(FloatingMessagesContext);
  const inverseMessages = [...messages].reverse();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Uploaded file:", file);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`transition-opacity duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        {!isOpen && (
          <button
            onClick={toggleChat}
            className="h-14 w-14 rounded-full bg-green-900 flex items-center justify-center"
          >
            <Image
              className="h-14 w-14 rounded-full"
              src={"/bot.png"}
              height={48}
              width={48}
              alt="Bot Icon"
            />
          </button>
        )}
      </div>
      <div
        className={`transition-all duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {isOpen && (
          <div className="flex flex-col justify-betwee w-[400px] h-[500px] bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="flex justify-between items-center border-b px-1 h-[40px]">
              <h2 className="text-lg font-bold">FendousAI Assistant</h2>
              <button onClick={toggleChat} className="text-gray-600 pr-1">
                ✖
              </button>
            </div>
            <div className="flex flex-col justify-between h-[460px] bg-blue-100">
              <div className="flex flex-col overflow-y-auto max-h-[89%] rounded-md no-scrollbar2">
                {messages.map((message) => (
                  <span
                    key={message.id} // Assuming each message has a unique id
                    className={`rounded-md my-1 p-2 break-words ${
                      message.isUserMessage
                        ? "bg-green-400 self-end text-end"
                        : "bg-red-400 self-start"
                    }`}
                  >
                    {message.text}
                  </span>
                ))}
              </div>

              <FloatingBotInput fileInputRef={fileInputRef} />
              <input
                ref={fileInputRef}
                type="file"
                className="absolute inset-0 hidden cursor-pointer"
                onChange={handleFileUpload}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingBot;
