"use client";

import { useState } from "react";
import {
  Building2,
  Calendar,
  ChevronDown,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { OutcomeBadge } from "@/components/results/outcome-badge";
import { RelevanceBreakdownView } from "@/components/results/relevance-breakdown";
import { cn } from "@/lib/utils";
import type { ScoredCase } from "@/lib/types";

function SimilarCaseCard({ item }: { item: ScoredCase }) {
  const [open, setOpen] = useState(false);
  const { case: c, relevance } = item;

  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{c.title}</h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" />
              {c.court}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {c.year}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-accent">
            {relevance.similarity_score}%
          </div>
          <div className="text-[10px] uppercase text-muted">
            match
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {c.sections.map((s) => (
          <Badge key={s} variant="primary">
            {s}
          </Badge>
        ))}
        <OutcomeBadge outcome={c.outcome} />
      </div>

      <p className="mt-3 text-sm text-muted">{relevance.why_relevant[0]}</p>

      <div className="mt-3 text-xs text-muted">
        <span className="font-medium text-foreground">Key evidence: </span>
        {c.evidence.slice(0, 3).join(", ")}
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary transition-colors hover:text-foreground"
      >
        {open ? "Hide details" : "View details"}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="mt-4 space-y-4 border-t border-card-border pt-4">
          <p className="text-sm leading-relaxed text-muted">{c.summary}</p>

          <div>
            <p className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
              <Lightbulb className="h-4 w-4 text-accent" />
              Winning clues
            </p>
            <ul className="space-y-1">
              {c.winning_clues.map((w) => (
                <li key={w} className="text-sm text-muted">
                  • {w}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
              <AlertTriangle className="h-4 w-4 text-signal" />
              Risk factors
            </p>
            <ul className="space-y-1">
              {c.risk_factors.map((r) => (
                <li key={r} className="text-sm text-muted">
                  • {r}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Relevance breakdown</p>
            <RelevanceBreakdownView
              breakdown={relevance.relevance_breakdown}
            />
          </div>
        </div>
      )}
    </GlassCard>
  );
}

export function SimilarCases({ items }: { items: ScoredCase[] }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">
        Similar Cases
        <span className="ml-2 text-sm font-normal text-muted">
          {items.length} found
        </span>
      </h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <SimilarCaseCard key={item.case.id} item={item} />
        ))}
      </div>
    </div>
  );
}
