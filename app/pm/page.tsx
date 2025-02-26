"use client";

import ChatBot from "@/components/ChatBot";
import React from "react";
import SideChatBot from "@/components/SideChatBot";
import ThreadChatInput from "@/components/ThreadChatInput";
import { MessagesProvider } from "@/context/messages";
import ThreadsChatMessages from "@/components/ThreadsChat";

const PMBOT = () => {
  const content =
    "Welcome to our project-leading software bot, your ultimate companion in orchestrating project management with precision \
     and efficiency. Engineered to empower your team, our bot combines advanced automation with intelligent task management to \
     revolutionize how you lead projects to success.";
  const bullets = [
    " Automated Task Assignment",
    "Real-Time Progress Tracking",
    "Smart Resource Management",
    "Automated Reporting",
    "Integration with Project Management Tools",
    "Intelligent Risk Management",
  ];
  return (
    <div className="flex h-screen gap-m6 px-12">
      <ChatBot
        heading="PROJECT MANAGEMENT CHATBOT"
        content={content}
        bullets={bullets}
      />
      <SideChatBot>
        <MessagesProvider>
          <ThreadsChatMessages className="px-2 py-3 flex-1" />
          <ThreadChatInput className="px-4" assistanttype={"pm"} />
        </MessagesProvider>
      </SideChatBot>
    </div>
  );
};

export default PMBOT;
