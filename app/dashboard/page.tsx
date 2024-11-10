"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { string } from "zod";

export default function DashboardHomePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [transcription, setTranscription] = useState("");
  const [summary, setSummary] = useState<{
    conversation_summary: string;
    heart_rate: number;
    temperature: number;
    oxygen_saturation: number;
    bloodpressure: { systolic: string; diastolic: string }[];
  } | null>(null);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/transcribe", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      setTranscription(data.text);
    } else {
      console.error("Failed to transcribe audio");
    }
  };

  const createSummary = async () => {
    console.log("Creating summary for transcription:", transcription);
    const response = await fetch("/api/summary", {
      method: "POST",
      body: JSON.stringify({
        text: transcription,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setSummary(data);
    console.log(data);
  };
  useEffect(() => {
    if (summary) {
      console.log("Summary:", summary.conversation_summary);
    }
  }, [summary]);

  return (
    <div className="flex flex-col min-h-screen justify-start">
      <h1>Dashboard Home Page</h1>
      <div></div>
    </div>
  );
}
