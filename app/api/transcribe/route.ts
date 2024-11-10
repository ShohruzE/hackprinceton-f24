import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("audio") as File;

    console.log("File:", file);

    if (!file) {
      console.error("No audio file provided");
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

    const filePath = path.join(process.cwd(), "tmp", "testconvo.m4a");
    console.log("File path:", filePath);

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
      response_format: "text",
    });

    console.log("Transcription:", transcription);
    return NextResponse.json({ text: transcription });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { error: "Error processing the request" },
      { status: 500 }
    );
  }
}
