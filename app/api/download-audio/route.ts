import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: String(process.env.OPENAI_KEY),
});

export async function POST(req: NextRequest) {
  const reader = req.body?.getReader();
  const chunks: Uint8Array[] = [];

  if (reader) {
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      if (value) {
        chunks.push(value);
      }
      done = readerDone;
    }
  }

  const buffer = Buffer.concat(chunks);
  const filePath = path.join(process.cwd(), "public", "audio.mp3");

  try {
    await fs.promises.writeFile(filePath, buffer);
  } catch (err) {
    console.error("Error saving file:", err);
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }

  console.log("File saved:", filePath);
  console.log(fs.createReadStream(filePath));

  try {
    const transcription = await openai.audio.transcriptions.create({
      file: new File([buffer], "audio.wav", { type: "audio/wav" }),
      model: "whisper-1",
    });

    console.log(transcription);

    return NextResponse.json({
      message: "Transcription successful",
      transcription,
    });
  } catch (error) {
    console.error("Error during transcription:", error);
    return NextResponse.json(
      { error: "Failed to transcribe audio" },
      { status: 500 }
    );
  } finally {
    // Clean up the converted file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
