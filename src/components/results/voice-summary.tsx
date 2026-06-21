"use client";

import { useEffect, useState } from "react";
import { Volume2, Square } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

type VoiceSummaryProps = {
  text: string;
};

/** Reads the summary aloud using the browser Speech Synthesis API. */
export function VoiceSummary({ text }: VoiceSummaryProps) {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSupported(false);
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function toggle() {
    if (!("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-IN";
    utter.rate = 1;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
  }

  return (
    <GlassCard className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Volume2 className="h-5 w-5" />
        </span>
        <div>
          <p className="font-semibold">Voice Summary</p>
          <p className="text-sm text-muted">
            {supported
              ? "Listen to a spoken summary of your analysis."
              : "Voice not supported in this browser."}
          </p>
        </div>
      </div>
      <Button
        variant={speaking ? "accent" : "secondary"}
        onClick={toggle}
        disabled={!supported}
      >
        {speaking ? (
          <>
            <Square className="h-4 w-4" /> Stop
          </>
        ) : (
          <>
            <Volume2 className="h-4 w-4" /> Read aloud
          </>
        )}
      </Button>
    </GlassCard>
  );
}
