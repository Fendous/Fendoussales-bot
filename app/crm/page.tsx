"use client";
import ChatBot from "@/components/ChatBot";
import React from "react";
import SideChatBot from "@/components/SideChatBot";
import ThreadChatInput from "@/components/ThreadChatInput";
import { MessagesProvider } from "@/context/messages";
import ThreadsChatMessages from "@/components/ThreadsChat";
const CRMBOT = () => {
  const content =
    "Welcome to our specialized CRM chatbot, your ultimate assistant in managing customer relationships effortlessly.\
    Designed to streamline your CRM processes, our chatbot combines cutting-edge artificial intelligence \
    with intuitive interface to revolutionize how you engage with your customers.";
  const bullets = [
    "Personalized Customer Interaction",
    "Automated Lead Generation",
    "Scalable and Customizable",
    "Seamless CRM Integration",
  ];

  return (
    <div className="flex h-screen gap-6 px-12">
      <ChatBot heading="CRM CHATBOT" content={content} bullets={bullets} />
      <SideChatBot>
        <MessagesProvider>
          <ThreadsChatMessages className="px-2 py-3 flex-1" />
          <ThreadChatInput className="px-4" assistanttype={"crm"} />
        </MessagesProvider>
      </SideChatBot>
    </div>
  );
};

export default CRMBOT;
