import React from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

type Props = {
  children: React.ReactNode;
};

const SideChatBot = ({ children }: Props) => {
  return (
    <div className="relative isolate overflow-hidden h-screen py-24 sm:py-[160px] w-[700px]">
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div />
      </div>
      <div>
        <div />
      </div>
      {/* ACTUAL CHATBOT */}
      <div className="mx-auto max-w-7xl px-6 lg:px-2 relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover rounded"
          src="/backgroundVideo.mp4"
        />
        <div className="mx-2 max-w-2xl lg:mx-0 relative z-10">
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            <ChatHeader />
          </h2>
          <div className="mt-2 text-xl leading-8 text-gray-300">
            <div className="flex flex-col h-[450px] w-2xl">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideChatBot;
