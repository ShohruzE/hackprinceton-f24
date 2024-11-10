import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { NextResponse } from "next/server";

const prompt = `Summarize the following transcription from a conversation between a nurse and a patient, focusing on capturing the patient’s main symptoms, concerns, treatments, or medications mentioned, and any specific requests or questions. Additionally, listen for any mentions of vital signs—specifically blood pressure, heart rate, temperature, and oxygen saturation. If these are audibly stated, extract and assign them to their respective fields in this schema:
{
bloodpressure: z.object({
  systolic: z.string(),
  diastolic: z.string(),
}),
heart_rate: number,
temperature: number,
oxygen_saturation: number,
conversation_summary: "string"
}
Ensure that the summary highlights essential details in a clear, concise format for the nurse's review and accurate documentation. Omit unnecessary details while preserving core information about the patient's health status. If any vital signs are not mentioned, leave those fields blank or null..`;

const updatedSummary = z.object({
  bloodpressure: z.object({
    systolic: z.string(),
    diastolic: z.string(),
  }),
  heart_rate: z.number(),
  temperature: z.number(),
  oxygen_saturation: z.number(),
  conversation_summary: z.string(),
});

export async function POST(req: Request) {
  const openai = new OpenAI({ apiKey: String(process.env.OPENAI_KEY) });
  if (!req.body) {
    throw new Error("Request body is null");
  }
  const { text } = await req.json();

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
    response_format: zodResponseFormat(updatedSummary, "conversation_summary"),
  });
  console.log(completion);

  return NextResponse.json(completion.choices[0].message.parsed);
}
