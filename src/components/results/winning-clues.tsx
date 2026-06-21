import { Lightbulb, FileSearch, Scale, AlertTriangle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import type { Clue } from "@/lib/types";

const CONFIDENCE_VARIANT: Record<Clue["confidence"], BadgeProps["variant"]> = {
  High: "success",
  Medium: "warning",
  Low: "default",
};

export function WinningClues({ clues }: { clues: Clue[] }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Winning Clues</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {clues.map((clue, i) => (
          <GlassCard key={`${clue.clue}-${i}`} hover className="p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <Lightbulb className="h-5 w-5" />
              </span>
              <Badge variant={CONFIDENCE_VARIANT[clue.confidence]}>
                {clue.confidence} confidence
              </Badge>
            </div>

            <p className="mt-3 font-medium leading-relaxed">{clue.clue}</p>

            <div className="mt-4 space-y-2 text-sm text-muted">
              <p className="flex items-start gap-2">
                <FileSearch className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <span className="text-foreground">Evidence needed: </span>
                  {clue.evidenceNeeded.join(", ")}
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Scale className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <span className="text-foreground">Relevant section: </span>
                  {clue.section}
                </span>
              </p>
              <p className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                <span>
                  <span className="text-foreground">Risk if ignored: </span>
                  {clue.riskIfIgnored}
                </span>
              </p>
            </div>

            <p className="mt-4 border-t border-card-border pt-3 text-xs text-muted">
              Supporting case: {clue.supportingCase}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
