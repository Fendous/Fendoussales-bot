import { createContext, useState } from "react";
import { nanoid } from "nanoid";
import { Message } from "@/lib/validators/message";

const defaultValue: Message[] = [
  {
    id: nanoid(),
    text: "Hello, how can I help you?",
    audio: null,
    isUserMessage: false,
  },
];

export const MessagesContext = createContext<{
  messages: Message[];
  isMessageUpdating: boolean;
  getMessage: (id: string) => Message | null;
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  updateAudioURL: (id: string, audioURL: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  setIsMessageUpdating: (isUpdating: boolean) => void;
}>({
  messages: [],
  isMessageUpdating: false,
  getMessage: () => null,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  updateAudioURL: () => {},
  setIsMessageUpdating: () => {},
});

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState(defaultValue);
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);

  const getMessage = (id: string): Message => {
    const message = messages; //.filter((message: Message) => message.id === id);
    return message[message.length - 1];
  };

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const updateAudioURL = (id: string, audioURL: string) => {
    console.log("updateAudioURL called for:", { id: id, audioURL: audioURL });
    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        if (message.id === id) {
          console.log("AUDIO URL UPDATED MESSAGE:", {
            ...message,
            audio: audioURL,
          });
          return { ...message, audio: audioURL };
        }
        return message;
      })
    );
  };

  const updateMessage = (
    id: string,
    updateFn: (prevText: string) => string
  ) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return { ...message, text: updateFn(message.text) };
        }
        return message;
      })
    );
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isMessageUpdating,
        getMessage,
        addMessage,
        removeMessage,
        updateAudioURL,
        updateMessage,
        setIsMessageUpdating,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
