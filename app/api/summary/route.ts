import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const prompt = `Summarize the following transcription from a conversation between a nurse and a patient. Focus on capturing the main topics discussed, such as the patient's current symptoms, concerns, recent treatments, or medications mentioned. Include any specific patient requests or questions. Organize the summary so it highlights key points in a way that will be helpful for the nurse's review and accurate documentation. Keep it concise and straightforward, avoiding unnecessary details while preserving essential information for patient care.`;

  const openai = new OpenAI({ apiKey: String(process.env.OPENAI_KEY) });
  if (!req.body) {
    throw new Error("Request body is null");
  }
  const { text } = await req.json();

  const updatedSummary = z.object({ summary: z.string() });

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: text,
      },
    ],
    response_format: zodResponseFormat(textSummary, "summary"),
  });
  console.log(completion);

  return NextResponse.json(completion);
  // const summary = completion.choices[0].message.parsed;
}
