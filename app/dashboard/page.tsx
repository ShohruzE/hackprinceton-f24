"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardHomePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const record = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();

      const audioChunks: Blob[] = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        setAudioBlob(audioBlob);
      };
    } else {
      mediaRecorderRef.current?.stop();
    }

    setIsRecording(!isRecording);
  };

  const downloadAudio = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.mp3");

      const response = await fetch("/api/download-audio", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("File uploaded successfully:", data.path);
        // Optionally, you can provide a link to download the file from the server
      } else {
        console.error("Failed to upload file");
      }
    }
  };

  const transcribeAudio = async () => {
    if (audioBlob) {
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: JSON.stringify({
          filePath: "tmp/audio.mp3",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Failed to transcribe audio");
      }
    }
  };

  const createSummary = async () => {
    const response = await fetch("/api/summary", {
      method: "POST",
      body: JSON.stringify({
        text: `nurse: good morning how are you feeling today

                patient: good morning ive been feeling a little lightheaded and out of breath

                nurse: i see lets check a few things can you tell me if youve had any pain or discomfort

                patient: just a bit of chest tightness nothing severe but it’s noticeable especially when i move around a lot

                nurse: understood and just for documentation i’m going to note your vitals i see here that your blood pressure is 120 over 80

                patient: yes that was from this morning when they checked me in

                nurse: alright and your heart rate is currently at 85 bpm do you remember what it was earlier

                patient: no but i remember them mentioning it was around 80 bpm

                nurse: ok and your temperature is normal at 98.6 degrees

                patient: thats good to know

                nurse: lastly your oxygen saturation is reading at 94 percent so i'll make a note of that as well

                patient: thanks i appreciate you checking everything out

                nurse: no problem i'll also let the doctor know about the lightheadedness and chest tightness is there anything else you'd like to bring up today

                patient: no i think that covers it just hoping i can get my energy back soon

                nurse: we’ll work on it thank you for sharing and i’ll get this information updated in your chart`,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <h1>Dashboard Home Page</h1>
      <div>
        <Button onClick={record}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>
        {audioBlob && (
          <audio controls src={URL.createObjectURL(audioBlob)}></audio>
        )}
        {audioBlob && <Button onClick={downloadAudio}>Download Audio</Button>}
        <Button onClick={transcribeAudio}>Transcribe</Button>
        <Button onClick={createSummary}>Create Summary</Button>
      </div>
    </div>
  );
}
