"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  Database,
  FileText,
  Library,
  Loader2,
  Lock,
  Network,
  RefreshCw,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LawViewSwitch } from "@/components/law/law-view-switch";
import { CASES } from "@/data/cases";

const LIBRARY_STEPS = [
  {
    icon: Search,
    label: "Find examples",
    detail: "Collect judgments and legal documents that describe real legal situations.",
    plain: "The library begins with actual legal material, not random text.",
  },
  {
    icon: ShieldCheck,
    label: "Protect privacy",
    detail: "Mask names, contact details, addresses, and other personal identifiers.",
    plain: "People can learn from patterns without exposing private facts.",
  },
  {
    icon: BookOpen,
    label: "Read the legal points",
    detail: "Identify the issue, section, evidence, court, result, and risk signals.",
    plain: "Each document becomes easier to understand and compare.",
  },
  {
    icon: Network,
    label: "Connect patterns",
    detail: "Link facts, law sections, evidence, outcomes, and preparation gaps.",
    plain: "ULIS shows relationships instead of isolated documents.",
  },
  {
    icon: Sparkles,
    label: "Explain simply",
    detail: "Use the structured library to answer questions in plain language.",
    plain: "A person can prepare better before speaking with a professional.",
  },
];

export default function IngestionPage() {
  const [step, setStep] = useState(0);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (step >= LIBRARY_STEPS.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), 650);
    return () => clearTimeout(t);
  }, [step, runId]);

  const done = step >= LIBRARY_STEPS.length;

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of CASES) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
    return [...counts.entries()].map(([label, count]) => ({ label, count }));
  }, []);

  const sourceMetrics = useMemo(() => {
    const sections = new Set(CASES.flatMap((item) => item.sections));
    const evidence = new Set(CASES.flatMap((item) => item.evidence));
    return [
      { icon: Scale, label: "Saved cases", value: `${CASES.length}` },
      { icon: FileText, label: "Law sections", value: `${sections.size}` },
      { icon: Database, label: "Proof signals", value: `${evidence.size}` },
      { icon: Lock, label: "Privacy layer", value: "On" },
    ];
  }, []);

  function rerun() {
    setStep(0);
    setRunId((r) => r + 1);
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <LawViewSwitch active="library" />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px] lg:items-end">
        <div>
          <Badge variant="accent">
            <Library className="h-3.5 w-3.5" />
            Law library
          </Badge>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold glow-text sm:text-4xl">
            A calm library for learning the law.
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            The library shows what ULIS already knows from the demo corpus and
            explains how each example becomes useful for everyday legal
            awareness.
          </p>
        </div>

        <div className="rounded-lg border border-card-border bg-white/78 p-4 shadow-[0_1px_2px_rgba(16,19,24,0.04)]">
          <p className="text-xs font-semibold uppercase text-muted">
            Plain-language promise
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            No developer pipeline language. This page shows what is stored, how
            it is protected, and what a person can learn from it.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {sourceMetrics.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-lg border border-card-border bg-white/76 p-4 shadow-[0_1px_2px_rgba(16,19,24,0.04)]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-xl font-semibold">{value}</span>
            </div>
            <p className="mt-3 text-sm text-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[330px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="rounded-lg border border-card-border bg-white/78 p-4 shadow-[0_1px_2px_rgba(16,19,24,0.04)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold">Library status</h2>
                <p className="mt-1 text-sm text-muted">
                  Replay the flow to see how legal material becomes readable.
                </p>
              </div>
              {done ? (
                <Badge variant="success">
                  <Check className="h-3.5 w-3.5" />
                  Ready
                </Badge>
              ) : (
                <Badge variant="primary">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  {step + 1}/{LIBRARY_STEPS.length}
                </Badge>
              )}
            </div>
            <Button variant="secondary" className="mt-4 w-full" onClick={rerun}>
              <RefreshCw className="h-4 w-4" />
              Replay flow
            </Button>
          </div>

          <div className="rounded-lg border border-card-border bg-white/78 p-4 shadow-[0_1px_2px_rgba(16,19,24,0.04)]">
            <h2 className="font-semibold">Topics inside</h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              These tags come from the hardcoded cases in the project folder.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((item) => (
                <span
                  key={item.label}
                  className="rounded-full border border-card-border bg-surface px-3 py-1.5 text-xs font-medium text-muted"
                >
                  {item.label} - {item.count}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-5">
          <div className="rounded-lg border border-card-border bg-white/78 p-5 shadow-[0_1px_2px_rgba(16,19,24,0.04)]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  How a legal document becomes useful
                </h2>
                <p className="mt-1 text-sm text-muted">
                  A simple reading path for non-technical users.
                </p>
              </div>
              <Badge variant={done ? "success" : "primary"}>
                {done ? "Flow complete" : "Flow running"}
              </Badge>
            </div>

            <div className="mt-5 grid gap-3">
              {LIBRARY_STEPS.map((stage, i) => {
                const Icon = stage.icon;
                const isDone = i < step;
                const isActive = i === step;
                return (
                  <div
                    key={stage.label}
                    className={
                      "rounded-lg border p-4 transition-colors " +
                      (isDone
                        ? "border-accent/35 bg-accent/6"
                        : isActive
                          ? "border-primary/35 bg-primary/6"
                          : "border-card-border bg-surface/55")
                    }
                  >
                    <div className="flex gap-3">
                      <span
                        className={
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg " +
                          (isDone
                            ? "bg-accent/15 text-accent"
                            : isActive
                              ? "bg-primary/10 text-primary"
                              : "bg-white/80 text-muted")
                        }
                      >
                        {isDone ? (
                          <Check className="h-5 w-5" />
                        ) : isActive ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{stage.label}</p>
                        <p className="mt-1 text-sm leading-6 text-muted">
                          {stage.detail}
                        </p>
                        <p className="mt-2 text-xs leading-5 text-muted">
                          {stage.plain}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-card-border bg-white/78 p-5 shadow-[0_1px_2px_rgba(16,19,24,0.04)]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Stored legal examples</h2>
                <p className="mt-1 text-sm text-muted">
                  Each example is written as a plain takeaway instead of a raw
                  database record.
                </p>
              </div>
              <Badge variant="primary">{CASES.length} hardcoded cases</Badge>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {CASES.map((item) => (
                <article
                  key={item.id}
                  className="rounded-lg border border-card-border bg-white/84 p-4 transition-colors hover:border-primary/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge variant="accent">{item.category}</Badge>
                      <h3 className="mt-3 text-base font-semibold leading-5">
                        {item.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-muted">
                      {item.year}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-muted">
                    {item.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
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

                  <div className="mt-4 border-l-2 border-accent/35 pl-3">
                    <p className="text-xs font-semibold text-foreground">
                      Easy takeaway
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {item.winning_clues[0]}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
