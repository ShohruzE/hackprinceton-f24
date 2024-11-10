import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: String(process.env.OPENAI_KEY),
});

export async function POST(request: NextRequest) {
  if (!request.body) {
    return NextResponse.json(
      { error: "Request body is null" },
      { status: 400 }
    );
  }

  const { filePath } = await request.json();
  console.log(filePath);

  // Check if the file exists and is accessible
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File does not exist" }, { status: 400 });
  }

  const convertedFilePath = path.join(
    process.cwd(),
    "tmp",
    "converted_audio.wav"
  );

  try {
    console.log("converting file");
    // Convert the audio file to WAV format using ffmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(filePath)
        .toFormat("wav")
        .on("end", resolve)
        .on("error", reject)
        .save(convertedFilePath);
    });

    console.log("file done converting");

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(convertedFilePath),
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
    if (fs.existsSync(convertedFilePath)) {
      fs.unlinkSync(convertedFilePath);
    }
  }
}
