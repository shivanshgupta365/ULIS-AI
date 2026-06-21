"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VOICE_MOCK_TEXT } from "@/lib/constants";

// Minimal typing for the Web Speech API (not in standard DOM lib).
type SpeechResultEvent = {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: SpeechResultEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};
type SpeechCtor = new () => SpeechRecognitionLike;

function getSpeechCtor(): SpeechCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechCtor;
    webkitSpeechRecognition?: SpeechCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

type VoiceButtonProps = {
  /** Called with recognized (or mock) text. */
  onResult: (text: string) => void;
};

export function VoiceButton({ onResult }: VoiceButtonProps) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const mockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      if (mockTimer.current) clearTimeout(mockTimer.current);
    };
  }, []);

  function startMock() {
    setListening(true);
    mockTimer.current = setTimeout(() => {
      onResult(VOICE_MOCK_TEXT);
      setListening(false);
    }, 1600);
  }

  function toggle() {
    if (listening) {
      recognitionRef.current?.stop();
      if (mockTimer.current) clearTimeout(mockTimer.current);
      setListening(false);
      return;
    }

    const Ctor = getSpeechCtor();
    if (!Ctor) {
      // Browser has no speech recognition - use mock listening mode.
      startMock();
      return;
    }

    try {
      const recognition = new Ctor();
      recognition.lang = "en-IN";
      recognition.interimResults = false;
      recognition.continuous = false;
      recognition.onresult = (e) => {
        const transcript = Array.from({ length: e.results.length })
          .map((_, i) => e.results[i][0].transcript)
          .join(" ");
        if (transcript.trim()) onResult(transcript.trim());
      };
      recognition.onerror = () => setListening(false);
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
      recognition.start();
      setListening(true);
    } catch {
      startMock();
    }
  }

  return (
    <Button
      type="button"
      variant={listening ? "accent" : "secondary"}
      size="sm"
      onClick={toggle}
      aria-pressed={listening}
    >
      {listening ? (
        <>
          <Square className="h-4 w-4 animate-pulse" />
          Listening...
        </>
      ) : (
        <>
          <Mic className="h-4 w-4" />
          Speak Your Issue
        </>
      )}
    </Button>
  );
}
