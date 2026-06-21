import { Trophy, Building2, Calendar, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "@/components/results/score-ring";
import { OutcomeBadge } from "@/components/results/outcome-badge";
import { RelevanceBreakdownView } from "@/components/results/relevance-breakdown";
import type { ScoredCase } from "@/lib/types";

export function TopMatch({ match }: { match: ScoredCase }) {
  const { case: c, relevance } = match;
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Top Match</h2>
      <GlassCard className="border-primary/25 bg-white/90">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex items-center gap-4">
            <ScoreRing value={relevance.similarity_score} />
            <Badge variant="accent">
              <Trophy className="h-3.5 w-3.5" />
              Best match
            </Badge>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-4 w-4" />
                {c.court}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {c.year}
              </span>
              <OutcomeBadge outcome={c.outcome} />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {c.sections.map((s) => (
                <Badge key={s} variant="primary">
                  {s}
                </Badge>
              ))}
            </div>

            <ul className="mt-4 space-y-1.5">
              {relevance.why_relevant.map((reason) => (
                <li
                  key={reason}
                  className="flex items-start gap-2 text-sm text-muted"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-card-border pt-5">
          <p className="mb-3 text-sm font-medium">Relevance Breakdown</p>
          <RelevanceBreakdownView breakdown={relevance.relevance_breakdown} />
        </div>
      </GlassCard>
    </div>
  );
}
