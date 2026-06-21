"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  Scale,
  Lightbulb,
  AlertTriangle,
  Telescope,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VoiceSummary } from "@/components/results/voice-summary";
import {
  buildDashboard,
  buildReportMarkdown,
  buildSpokenSummary,
} from "@/lib/analysis";
import { loadInput } from "@/lib/session";
import type { UserCaseInput } from "@/lib/types";

export default function ReportPage() {
  const [input, setInput] = useState<UserCaseInput | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInput(loadInput());
    setHydrated(true);
  }, []);

  const data = useMemo(() => (input ? buildDashboard(input) : null), [input]);

  function download() {
    if (!data) return;
    const md = buildReportMarkdown(data);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ulis-strategy-report.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (hydrated && !data) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <h1 className="text-2xl font-bold">No report yet</h1>
        <p className="mt-2 text-muted">
          Run an intelligence scan to generate a legal brief.
        </p>
        <Link href="/analyze" className="mt-6 inline-block">
          <Button>Open Research Console</Button>
        </Link>
      </section>
    );
  }

  if (!data) return <section className="min-h-[60vh]" />;

  return (
    <section className="mx-auto max-w-3xl space-y-6 px-5 py-12">
      <div className="no-print">
        <Badge variant="accent">
          <FileText className="h-3.5 w-3.5" />
          Intelligence Brief
        </Badge>
        <h1 className="mt-4 text-3xl font-bold glow-text sm:text-4xl">
          Intelligence Brief
        </h1>
        <p className="mt-3 text-muted">
          A structured legal research summary you can save and review with
          counsel.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={download}>
            <Download className="h-4 w-4" />
            Download (.md)
          </Button>
          <Button variant="secondary" onClick={() => window.print()}>
            <Printer className="h-4 w-4" />
            Print / Save as PDF
          </Button>
        </div>
      </div>

      <div className="no-print">
        <VoiceSummary text={buildSpokenSummary(data)} />
      </div>

      {/* Report document */}
      <GlassCard className="report space-y-8">
        <header className="border-b border-card-border pb-5">
          <h2 className="text-2xl font-bold">ULIS - Intelligence Brief</h2>
          <p className="mt-2 text-sm text-muted">
            {data.signals.category ?? "Legal research"} - {data.input.state} -{" "}
            {data.input.role}
          </p>
        </header>

        <section>
          <h3 className="mb-2 text-lg font-semibold">Case Summary</h3>
          <p className="leading-relaxed text-muted">{data.summary}</p>
        </section>

        <section>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Scale className="h-5 w-5 text-primary" />
            Relevant Legal Sections
          </h3>
          <ul className="space-y-2">
            {data.sections.map((s) => (
              <li key={s.section} className="text-sm">
                <span className="font-medium">{s.section}</span>
                <span className="text-muted"> - {s.description}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold">Top Match</h3>
          <p className="font-medium">
            {data.topMatch.case.title}{" "}
            <span className="text-accent">
              - {data.topMatch.relevance.similarity_score}% match
            </span>
          </p>
          <p className="text-sm text-muted">
            {data.topMatch.case.court}, {data.topMatch.case.year} - Outcome:{" "}
            {data.topMatch.case.outcome}
          </p>
        </section>

        <section>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Lightbulb className="h-5 w-5 text-accent" />
            Winning Clues
          </h3>
          <ul className="space-y-2">
            {data.clues.map((c, i) => (
              <li key={`${c.clue}-${i}`} className="text-sm">
                <CheckCircle2 className="mr-1.5 inline h-4 w-4 text-accent" />
                {c.clue}{" "}
                <span className="text-muted">({c.confidence} confidence)</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold">Evidence Checklist</h3>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {data.evidence.map((e) => (
              <li key={e.item} className="text-sm">
                <span className={e.available ? "text-emerald-600" : "text-rose-600"}>
                  {e.available ? "☑" : "☐"}
                </span>{" "}
                {e.item}
                {e.priority === "High priority" && (
                  <span className="text-muted"> - high priority</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle className="h-5 w-5 text-signal" />
            Risk Checklist
          </h3>
          <ul className="space-y-1.5">
            {data.risks.map((r, i) => (
              <li key={`${r.risk}-${i}`} className="text-sm text-muted">
                <span className="font-medium text-foreground">{r.severity}:</span>{" "}
                {r.risk}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Telescope className="h-5 w-5 text-accent" />
            Preparation Gaps
          </h3>
          <ul className="space-y-2">
            {data.whiteSpace.map((w, i) => (
              <li key={`${w.gap}-${i}`} className="text-sm">
                <span className="font-medium">{w.gap}</span>
                <span className="text-muted"> {w.collect}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold">Next Steps</h3>
          <ol className="list-inside list-decimal space-y-1 text-sm text-muted">
            <li>Collect the missing high-priority evidence listed above.</li>
            <li>Write a clear, dated timeline of incidents.</li>
            <li>Review these precedents and gaps with a qualified lawyer.</li>
          </ol>
        </section>

        <footer className="border-t border-card-border pt-5 text-xs text-muted">
          ULIS provides legal research support and informational insights only.
          It does not replace professional legal advice. PII masked - session-only
          data.
        </footer>
      </GlassCard>
    </section>
  );
}
