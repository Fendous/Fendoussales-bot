import "openai/shims/node";
import OpenAI from "openai";
import {
  googleDriveUpload,
  sendEmail,
  newgoogleCalendarEvent,
} from "../integrations/google";
import { connect } from "@/db/mongoose";
import User from "@/models/User.model";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

const openai = new OpenAI();
const userThreads: any = {}; // email=>thread_id

const defaultAssistantKey = process.env.OPENAI_API_KEY;
const CRM_ASSISTANT_KEY = process.env.CRM_ASSISTANT_KEY;
const PM_ASSISTANT_KEY = process.env.PM_ASSISTANT_KEY;

interface AssistantInputMessage {
  email: string;
  userMessage: string;
  assistanttype: string;
  threadId2: string;
}
export async function OpenAIAssistantStream({
  email,
  userMessage,
  assistanttype,
  threadId2, //From client
}: AssistantInputMessage) {
  const assistantId = "asst_RjAgly1FYk5fCrkUCkdXnQvd";
  let stream;
  // assistanttype === "crm" ? CRM_ASSISTANT_KEY : (PM_ASSISTANT_KEY as string);
  // "asst_RjAgly1FYk5fCrkUCkdXnQvd";

  if (!userMessage) {
    return new ReadableStream({
      start(controller) {
        controller.enqueue(
          JSON.stringify({
            message: null,
            error: "Message content must be non-empty.",
          })
        );
        controller.close();
      },
    });
  }

  if (!threadId2) {
    try {
      const thread = await openai.beta.threads.create();
      console.log("New thread created with ID: ", thread.id, "\n");
      userThreads[email] = thread.id;
    } catch (error) {
      console.error("Error creating thread:", error);
      return;
    }
  } else {
    userThreads[email] = threadId2;
  }

  await openai.beta.threads.messages.create(
    userThreads[email], // thread_id
    {
      role: "user",
      content: userMessage,
    }
  );

  stream = openai.beta.threads.runs.stream(userThreads[email], {
    assistant_id: assistantId as string,
    stream: true,
  });

  return stream.toReadableStream();
}

export async function handleFunctionCall(data: any, form?: FormData) {
  await connect();
  const session = await getServerSession(authOptions);
  const user_email = session?.user?.email;
  const user = await User.findOne({ email: user_email });
  const toolOutputs = await Promise.all(
    data.required_action.submit_tool_outputs.tool_calls.map(
      async (toolCall: any) => {
        if (toolCall.function.name === "google_drive_upload") {
          try {
            const args = JSON.parse(toolCall.function.arguments);
            const file = form?.get("file") as File;
            if (!file) {
              throw new Error("File is missing");
            }

            const options = {
              name: file.name,
              mimeType: file.type,
              body: file.stream(),
            };
            const res = await googleDriveUpload(user._id, options);

            return {
              tool_call_id: toolCall.id,
              output: "File uploaded successfully.",
            };
          } catch (error: any) {
            console.error("Error uploading file to Google Drive:", error);
            return {
              tool_call_id: toolCall.id,
              output: `File upload failed: ${error.message}`,
            };
          }
        } else if (toolCall.function.name === "send_email") {
          try {
            const args = JSON.parse(toolCall.function.arguments);

            const subject = args.subject;
            const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString(
              "base64"
            )}?=`;

            const messageParts = [
              "From: Enock Zaake <zaakeenock@gmail.com>",
              "To: " + args.recipients,
              "Content-Type: text/html; charset=utf-8",
              "MIME-Version: 1.0",
              `Subject: ${utf8Subject}`,
              "",
              args.body,
            ];
            const message = messageParts.join("\n");

            // The body needs to be base64url encoded.
            const encodedMessage = Buffer.from(message)
              .toString("base64")
              .replace(/\+/g, "-")
              .replace(/\//g, "_")
              .replace(/=+$/, "");

            // Google email , not to be confused with the custom sendEmail function
            await sendEmail(user._id, encodedMessage);

            return {
              tool_call_id: toolCall.id,
              output: "Email sent successfully.",
            };
          } catch (error: any) {
            console.error("Error sending email:", error);
            return {
              tool_call_id: toolCall.id,
              output: `Email send failed: ${error.message}`,
            };
          }
        } else if (toolCall.function.name === "add_google_calendar_event") {
          try {
            const args = JSON.parse(toolCall.function.arguments);
            console.log("CALENDAR ARGS:", args);
            const event = {
              summary: args.summary,
              start: {
                dateTime: args.start_time.replace("2023", "2024"), // Start date and time in RFC3339 format
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              },
              end: {
                dateTime: args.end_time.replace("2023", "2024"), // End date and time in RFC3339 format
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              },
            };

            await newgoogleCalendarEvent(user._id, event);
            return {
              tool_call_id: toolCall.id,
              output: "Event added on calendar.",
            };
          } catch (error: any) {
            console.error("Error adding event on calendar:", error);
            return {
              tool_call_id: toolCall.id,
              output: `Error adding event on calendar: ${error.message}`,
            };
          }
        } else {
          return {
            tool_call_id: toolCall.id,
            output: "Unknown function name.",
          };
        }
      }
    )
  );

  const filteredToolOutputs = toolOutputs.filter(Boolean); // Ensure no undefined values are included

  try {
    const stream = openai.beta.threads.runs.submitToolOutputsStream(
      data.thread_id,
      data.id,
      { tool_outputs: filteredToolOutputs as any }
    );

    return stream.toReadableStream();
  } catch (error: any) {
    console.error("Error submitting tool outputs:", error.message);
  }
}
