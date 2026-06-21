"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpenCheck,
  Scale,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { VoiceButton } from "@/components/analyze/voice-button";
import { AnalyzeLoader } from "@/components/analyze/analyze-loader";
import { CASES } from "@/data/cases";
import {
  PROMPT_CHIPS,
  ROLES,
  DESIRED_OUTCOMES,
  STATES,
  EVIDENCE_OPTIONS,
  MASK_STEPS,
} from "@/lib/constants";
import { maskPii } from "@/lib/pii";
import { saveInput, saveMask } from "@/lib/session";
import type { DesiredOutcome, LegalCase, UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";

function buildCasePrompt(item: LegalCase) {
  return `I want to understand a legal situation like "${item.title}". ${item.summary} Explain the law sections, evidence, risks, and next steps in simple words.`;
}

function stateForCourt(court: string) {
  if (court.includes("Delhi")) return "Delhi";
  if (court.includes("Bombay")) return "Maharashtra";
  if (court.includes("Karnataka")) return "Karnataka";
  if (court.includes("Madras")) return "Tamil Nadu";
  if (court.includes("Allahabad")) return "Uttar Pradesh";
  if (court.includes("Punjab")) return "Punjab";
  return "Other / Not sure";
}

function goalForCase(item: LegalCase): DesiredOutcome {
  if (item.outcome === "Settlement") return "Explore settlement";
  if (item.category === "False Allegation Defense") {
    return "Prepare for lawyer consultation";
  }
  return "Understand case";
}

export default function AnalyzePage() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [role, setRole] = useState<UserRole>("Complainant");
  const [state, setState] = useState(STATES[0]);
  const [outcome, setOutcome] = useState<DesiredOutcome>("Understand case");
  const [evidence, setEvidence] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function toggleEvidence(item: string) {
    setEvidence((prev) =>
      prev.includes(item)
        ? prev.filter((e) => e !== item)
        : [...prev, item],
    );
  }

  function appendChip(text: string) {
    setDescription((prev) => (prev ? `${prev.trim()} ${text}` : text));
  }

  function chooseSavedCase(item: LegalCase) {
    setDescription(buildCasePrompt(item));
    setState(stateForCourt(item.court));
    setOutcome(goalForCase(item));
    setEvidence((prev) => Array.from(new Set([...prev, ...item.evidence])));
  }

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []).map((f) => f.name);
    setFiles((prev) => [...prev, ...picked]);
    e.target.value = "";
  }

  function startAnalysis() {
    const input = {
      description: description.trim(),
      state,
      role,
      desiredOutcome: outcome,
      evidenceAvailable: evidence,
    };
    saveInput(input);
    saveMask(maskPii(input.description));
    setLoading(true);
  }

  const canAnalyze = description.trim().length > 10;

  return (
    <section className="mx-auto max-w-4xl px-5 py-12">
      <Badge variant="accent">
        <Sparkles className="h-3.5 w-3.5" />
        Step 1 - Tell ULIS what happened
      </Badge>
      <h1 className="mt-4 text-3xl font-bold glow-text sm:text-4xl">
        Understand Your Legal Situation
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Pick a saved example, speak your issue, or describe the facts in
        everyday language. ULIS turns it into plain legal sections, evidence to
        collect, similar cases, and next steps.
      </p>

      <GlassCard className="mt-8 space-y-6">
        {/* Description + voice */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted">
              Tell us the situation in simple words
            </span>
            <VoiceButton onResult={(t) => appendChip(t)} />
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            placeholder="e.g. My family is facing repeated dowry demands and threats. I have WhatsApp messages and a timeline. What law sections, evidence, risks, and next steps should I know?"
            className="w-full resize-y rounded-lg border border-card-border bg-white/80 p-4 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-primary/50"
          />
          <div className="mt-1 text-right text-xs text-muted/70">
            {description.trim().length} characters
          </div>
        </div>

        {/* Prompt chips */}
        <div>
          <span className="mb-2 block text-sm text-muted">
            Start from an example
          </span>
          <div className="flex flex-wrap gap-2">
            {PROMPT_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => appendChip(chip)}
                className="rounded-full border border-card-border bg-white/80 px-3 py-1.5 text-xs text-muted transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Saved legal examples */}
        <section className="rounded-lg border border-card-border bg-surface/70 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <BookOpenCheck className="h-4 w-4 text-accent" />
                Start from a saved legal example
              </div>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
                These are the original hardcoded cases from the project folder,
                rewritten as simple starting points for legal awareness.
              </p>
            </div>
            <Badge variant="primary" className="w-fit">
              {CASES.length} saved cases
            </Badge>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {CASES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => chooseSavedCase(item)}
                className="group rounded-lg border border-card-border bg-white/90 p-4 text-left shadow-[0_1px_2px_rgba(16,19,24,0.05)] transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_16px_34px_-28px_rgba(25,89,255,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                aria-label={`Use saved example: ${item.title}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Badge variant="accent" className="max-w-full">
                      <Scale className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{item.category}</span>
                    </Badge>
                    <h2 className="mt-2 text-sm font-semibold leading-5 text-foreground group-hover:text-primary">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-xs text-muted">
                      {item.court} - {item.year}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-primary" />
                </div>

                <p className="mt-3 text-xs leading-5 text-muted">
                  {item.summary}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {item.sections.slice(0, 2).map((section) => (
                    <span
                      key={`${item.id}-${section}`}
                      className="rounded-full border border-primary/15 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
                    >
                      {section}
                    </span>
                  ))}
                  {item.sections.length > 2 && (
                    <span className="rounded-full border border-card-border bg-surface px-2.5 py-1 text-[11px] font-medium text-muted">
                      +{item.sections.length - 2} more
                    </span>
                  )}
                </div>

                <div className="mt-3 rounded-md bg-surface p-3 text-xs leading-5 text-muted">
                  <span className="font-semibold text-foreground">
                    What this teaches:{" "}
                  </span>
                  {item.winning_clues[0]}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Selectors */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Select
            label="Your role"
            options={ROLES}
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
          />
          <Select
            label="Jurisdiction"
            options={STATES}
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <Select
            label="What you want"
            options={DESIRED_OUTCOMES}
            value={outcome}
            onChange={(e) => setOutcome(e.target.value as DesiredOutcome)}
          />
        </div>

        {/* Evidence chips */}
        <div>
          <span className="mb-2 block text-sm text-muted">
            Evidence you already have (optional)
          </span>
          <div className="flex flex-wrap gap-2">
            {EVIDENCE_OPTIONS.map((item) => {
              const active = evidence.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleEvidence(item)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-colors",
                    active
                      ? "border-accent/50 bg-accent/10 text-accent"
                      : "border-card-border bg-white/80 text-muted hover:text-foreground",
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* Upload stub */}
        <div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-card-border bg-white/80 px-4 py-2.5 text-sm text-muted transition-colors hover:border-primary/40 hover:text-foreground">
            <Upload className="h-4 w-4" />
            Upload source material (optional)
            <input
              type="file"
              multiple
              className="hidden"
              onChange={onFiles}
            />
          </label>
          {files.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {files.map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs text-muted"
                >
                  {name}
                  <button
                    type="button"
                    onClick={() =>
                      setFiles((prev) => prev.filter((_, idx) => idx !== i))
                    }
                    aria-label={`Remove ${name}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Privacy notice + CTA */}
        <div className="flex items-center gap-2 text-xs text-muted">
          <ShieldCheck className="h-4 w-4 text-accent" />
          Personal identifiers are masked before analysis. Nothing is stored
          permanently in this prototype.
        </div>

        <Button
          size="lg"
          className="w-full"
          disabled={!canAnalyze}
          onClick={startAnalysis}
        >
          <Sparkles className="h-4 w-4" />
          Explain My Situation
        </Button>
        {!canAnalyze && (
          <p className="-mt-3 text-center text-xs text-muted/70">
            Add a few more words about your situation to continue.
          </p>
        )}
      </GlassCard>

      {loading && (
        <AnalyzeLoader
          steps={MASK_STEPS}
          onComplete={() => router.push("/privacy")}
        />
      )}
    </section>
  );
}
