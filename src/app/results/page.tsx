"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CaseSummary } from "@/components/results/case-summary";
import { LegalSections } from "@/components/results/legal-sections";
import { TopMatch } from "@/components/results/top-match";
import { SimilarCases } from "@/components/results/similar-cases";
import { WinningClues } from "@/components/results/winning-clues";
import {
  EvidenceChecklist,
  RiskChecklist,
} from "@/components/results/checklists";
import { ComparativeAnalytics } from "@/components/results/comparative-analytics";
import { WhiteSpace } from "@/components/results/white-space";
import { VoiceSummary } from "@/components/results/voice-summary";
import { Reveal } from "@/components/ui/reveal";
import { buildDashboard, buildSpokenSummary } from "@/lib/analysis";
import { loadInput } from "@/lib/session";
import type { UserCaseInput } from "@/lib/types";

export default function ResultsPage() {
  const [input, setInput] = useState<UserCaseInput | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInput(loadInput());
    setHydrated(true);
  }, []);

  const data = useMemo(() => (input ? buildDashboard(input) : null), [input]);

  if (hydrated && !data) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <h1 className="text-2xl font-bold">No analysis yet</h1>
        <p className="mt-2 text-muted">
          Submit a research question to see ranked authorities, signals, and gaps.
        </p>
        <Link href="/analyze" className="mt-6 inline-block">
          <Button>Open Research Console</Button>
        </Link>
      </section>
    );
  }

  if (!data) {
    // Pre-hydration: render nothing to avoid a flash of the empty state.
    return <section className="min-h-[60vh]" />;
  }

  return (
    <section className="mx-auto max-w-6xl space-y-12 px-5 py-12">
      <div>
        <Badge variant="accent">
          <LayoutDashboard className="h-3.5 w-3.5" />
          Step 3 - Intelligence board
        </Badge>
        <h1 className="mt-4 text-3xl font-bold glow-text sm:text-4xl">
          Intelligence Board
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Ranked authorities, legal sections, evidence signals, and risk gaps
          generated from the masked version of your input.
        </p>
      </div>

      <Reveal>
        <CaseSummary data={data} />
      </Reveal>
      <Reveal>
        <VoiceSummary text={buildSpokenSummary(data)} />
      </Reveal>
      <Reveal>
        <LegalSections sections={data.sections} />
      </Reveal>
      <Reveal>
        <TopMatch match={data.topMatch} />
      </Reveal>
      <Reveal>
        <SimilarCases items={data.scored.slice(1)} />
      </Reveal>
      <Reveal>
        <WinningClues clues={data.clues} />
      </Reveal>
      <Reveal>
        <EvidenceChecklist items={data.evidence} />
      </Reveal>
      <Reveal>
        <RiskChecklist items={data.risks} />
      </Reveal>
      <Reveal>
        <ComparativeAnalytics analytics={data.analytics} />
      </Reveal>
      <Reveal>
        <WhiteSpace items={data.whiteSpace} />
      </Reveal>

      {/* Bridge to later phases */}
      <div className="flex flex-wrap gap-3 border-t border-card-border pt-8">
        <Link href="/graph">
          <Button variant="secondary">
            View Authority Graph
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href="/report">
          <Button variant="secondary">
            Intelligence Brief
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
