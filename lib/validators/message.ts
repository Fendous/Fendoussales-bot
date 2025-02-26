import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  audio: z.string().optional().nullable(),
  isUserMessage: z.boolean(),
});

// array validator
export const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
