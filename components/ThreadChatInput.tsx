"use client";

import { MessagesContext } from "@/context/messages";
//import { AssistantStream } from "openai/lib/AssistantStream";


import { cn } from "@/lib/utils";
import { Message } from "@/lib/validators/message";
import { CornerDownLeft, Loader2, Paperclip, Mic } from "lucide-react";

import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import {
    FC,
    HTMLAttributes,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import TextareaAutosize from "react-textarea-autosize";

import { fetchAudioUrl } from "@/lib/assistant/audioUtils";
import { audioRecorder, getTextFromAudio } from "@/lib/assistant/speechToText";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ThreadChatInput: FC<ChatInputProps & { assistanttype: string }> = ({
                                                                             className,
                                                                             assistanttype,
                                                                             ...props
                                                                         }) => {
    //const { data: session } = useSession();
    //const email = session?.user?.email as string;
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [input, setInput] = useState<string>("");
    const [isPending, setIsPending] = useState<boolean>(false);
    const [threadId, setThreadId] = useState<string | null>(null);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState<Boolean>(false);
    const idRef = useRef<string | null>(null);

    // let id = "";

    const {
        messages,
        getMessage,
        addMessage,
        isMessageUpdating,
        setIsMessageUpdating,
        updateAudioURL,
        updateMessage,
    } = useContext(MessagesContext);

    useEffect(() => {
        async function getAudio() {
            if (idRef.current) {
                const message = getMessage(idRef.current!);
                console.log("MESSAGE FROM CTX -> AUDIO:", message);
                const url = await fetchAudioUrl(message?.text!);
                console.log("Fetched Audio:", url);

                console.log("AUDIO URL:", url);
                console.log("Messsage id:", idRef.current);
                updateAudioURL(idRef.current!, url!);
            }
        }
        getAudio();
    }, [isMessageUpdating]);


    async function handleRecordAudio() {
        setIsRecording(!isRecording);
        if (!isRecording) {
            audioRecorder.start();
        }
        if (isRecording) {
            audioRecorder.stop().then((res : any) => {
                const textRes = getTextFromAudio(res.audioFile as File);
                textRes.then((res: any) => {
                    //todo change back
                    localLLMHandleSubmit(res.text)
                    //handleSubmit(res.text);
                });
            });
        }
    }



    //TODO mine
    async function localLLMHandleSubmit(input: string){
        setIsPending(true);
        const userMessage: Message = {
            id: nanoid(),
            isUserMessage: true,
            text: input,
        };
        addMessage(userMessage);

        // Store the runID and threadID to have a continuous chat since after a function
        // call it will try to make a new run because of 2 different streams

        const response = await fetch("/api/queryModel", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: input }),
        });
        

        /*
        const response = await fetch("http://localhost:8000/queryModel", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                payload: { text: input },
            }),
        });
          */
        if (!response.ok) {
            console.error("Error:", response.status, response.statusText);
            return;
        }

        const data = await response.json();
        console.log(data)
        if (data.success) {
            console.log(data.content);
        } else {
            console.error("API Error:", data.error);
        }



        //const reader = LMStudioChatbot(input);
        handleTextCreated()
        handleTextEnd()

        function handleTextEnd() {
            setIsMessageUpdating(false);
            setIsPending(false);
            setInput("");
        }


        function handleTextCreated() {
            setIsMessageUpdating(true);
            idRef.current = nanoid();
            const newMessage: Message = {
                id: idRef.current,
                text: data.content,
                isUserMessage: false,
                audio: null,
            };
            addMessage(newMessage);
        }

    }




    return (
        <div {...props} className={cn("flex border-zinc-300 px-4 pb-2", className)}>
            <div className="flex items-center justify-center">
                <Paperclip
                    className="-ml-3 mt-1"
                    size={25}
                    color="rgb(629, 149, 208)"
                    strokeWidth={2.5}
                    absoluteStrokeWidth
                />
                <span className="relative flex h-8 w-8 mx-1">
          <span
              className={`${
                  isRecording ? "animate-ping bg-sky-400 opacity-75 " : ""
              } absolute inline-flex h-full w-full rounded-full`}
          ></span>
          <span
              className={`${
                  isRecording ? "bg-sky-500 opacity-80" : ""
              } relative inline-flex items-center justify-center rounded-full h-8 w-8`}
          >
            <Mic
                className="absolute mt-1 hover:cursor-pointer z-10"
                onClick={handleRecordAudio}
                size={25}
                color="rgb(629, 149, 208)"
                strokeWidth={2.5}
                absoluteStrokeWidth
            />
          </span>
        </span>
            </div>
            <audio src={audioURL!} autoPlay></audio>
            <div className="relative flex w-full overflow-hidden rounded-xl ">
                <TextareaAutosize
                    ref={textareaRef}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();

                            const message: Message = {
                                id: nanoid(),
                                isUserMessage: true,
                                text: input,
                            };
                            //TODO change back handleSubmit is for open ai
                            localLLMHandleSubmit(input);
                            //handleSubmit(input);
                        }
                    }}
                    rows={2}
                    maxRows={4}
                    value={input}
                    autoFocus
                    disabled={isPending}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isRecording ? "Recording.." : "Write a message..."}
                    className="rounded-xl disabled:opacity-50 resize-none w-full focus:border-black bg-zinc-100 py-2 px-2 text-black font-medium text-sm"
                />

                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                    <kbd className="inline-flex items-center rounded border-2 px-1 font-sans text-xs text-gray-400">
                        {isPending ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                            <CornerDownLeft
                                className="w-3 h-3"
                                size={28}
                                color="#2d2a2a"
                                strokeWidth={4}
                                absoluteStrokeWidth
                            />
                        )}
                    </kbd>
                </div>
            </div>
        </div>
    );
};

export default ThreadChatInput;