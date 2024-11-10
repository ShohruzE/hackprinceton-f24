"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SaveSummaryForm from "@/components/SaveSummaryForm";

type Summary = {
  conversation_summary: string;
  heart_rate: number;
  temperature: number;
  oxygen_saturation: number;
  bloodpressure: { systolic: number; diastolic: number };
};

export default function RecordingForm() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [transcription, setTranscription] = useState("");
  const [summary, setSummary] = useState<Summary | null>({
    conversation_summary: "",
    heart_rate: 0,
    temperature: 0,
    oxygen_saturation: 0,
    bloodpressure: { systolic: 0, diastolic: 0 },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState<Summary | null>(
    null
  );

  const { toast } = useToast();

  const record = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();

      toast({
        title: "Recording...",
        description: "Speak into the microphone to record audio",
      });

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();

    console.log(event.currentTarget);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/transcribe", {
      method: "POST",
      body: formData,
    });

    toast({
      title: "Transcribing...",
      description: "Speak into the microphone to record audio",
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

    toast({
      title: "Summarizing Conversation...",
      description: "Generating summary from transcription",
    });

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
    return data;
  };
  useEffect(() => {
    if (summary) {
      console.log("Summary:", summary.conversation_summary);
    }
  }, [summary]);

  const handleCreateSummary = async () => {
    const newSummary = await createSummary();
    setGeneratedSummary(newSummary);
    setIsDialogOpen(true);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 flex flex-col">
      <Button onClick={record}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
      <input type="file" name="audio" accept="audio/*" className="hidden" />
      <Button type="submit">Transcribe</Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={handleCreateSummary}>Create Summary</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1000px] w-[500px]">
          <DialogHeader>
            <DialogTitle>Save Summary</DialogTitle>
            <DialogDescription>
              Save your summary. Modify the summary if necessary.
            </DialogDescription>
          </DialogHeader>
          <div>
            {generatedSummary && (
              <SaveSummaryForm
                values={generatedSummary}
                setIsDialogOpen={setIsDialogOpen}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
}
