"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

type AnalyzeLoaderProps = {
  steps: string[];
  onComplete: () => void;
  stepMs?: number;
};

/** Full-screen overlay that animates through processing steps, then fires onComplete. */
export function AnalyzeLoader({
  steps,
  onComplete,
  stepMs = 850,
}: AnalyzeLoaderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= steps.length) {
      const done = setTimeout(onComplete, 400);
      return () => clearTimeout(done);
    }
    const t = setTimeout(() => setCurrent((c) => c + 1), stepMs);
    return () => clearTimeout(t);
  }, [current, steps.length, stepMs, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-white/70 backdrop-blur-sm"
      >
        <div className="glass glow-border w-[min(90vw,28rem)] rounded-lg p-8">
          <div className="mb-6 flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="font-semibold">Running intelligence scan...</span>
          </div>
          <ul className="space-y-3">
            {steps.map((step, i) => {
              const isDone = i < current;
              const isActive = i === current;
              return (
                <li
                  key={step}
                  className={
                    "flex items-center gap-3 text-sm transition-opacity " +
                    (isDone || isActive ? "opacity-100" : "opacity-40")
                  }
                >
                  <span
                    className={
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border " +
                      (isDone
                        ? "border-accent bg-accent/20 text-accent"
                        : isActive
                          ? "border-primary text-primary"
                          : "border-card-border text-muted")
                    }
                  >
                    {isDone ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : isActive ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <span className="text-xs">{i + 1}</span>
                    )}
                  </span>
                  <span>{step}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
