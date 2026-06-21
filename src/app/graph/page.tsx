"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  ArrowRight,
  BookOpenCheck,
  GitGraph,
  Landmark,
  ListChecks,
  Route,
  Scale,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { LawViewSwitch } from "@/components/law/law-view-switch";
import { buildDashboard } from "@/lib/analysis";
import { buildGraph } from "@/lib/graph";
import { SAMPLE_INPUT } from "@/lib/relevance";
import { loadInput } from "@/lib/session";
import type { DashboardData, UserCaseInput } from "@/lib/types";

const LEGEND = [
  {
    color: "#1959ff",
    label: "Your issue",
    help: "The question or facts you asked ULIS to read.",
  },
  {
    color: "#008f87",
    label: "Similar cases",
    help: "Stored examples that look close to your situation.",
  },
  {
    color: "#7c3aed",
    label: "Law sections",
    help: "Acts and sections connected to those cases.",
  },
  {
    color: "#057a55",
    label: "Results",
    help: "How the stored matters ended.",
  },
  {
    color: "#b5741f",
    label: "Proof",
    help: "Documents or facts that usually matter.",
  },
];

function buildPlainSteps(data: DashboardData) {
  return [
    {
      icon: Search,
      title: "Start with the issue",
      text: "Read the blue node first. It represents the situation ULIS is trying to explain.",
    },
    {
      icon: BookOpenCheck,
      title: "Compare nearby cases",
      text: `${data.scored.slice(0, 3).length} close examples are placed next so facts can be compared without reading every document.`,
    },
    {
      icon: Landmark,
      title: "Follow the law links",
      text: "Purple nodes show which sections or Acts appear in those examples.",
    },
    {
      icon: ListChecks,
      title: "Check proof and result",
      text: "Evidence and outcome nodes show what usually makes a story stronger or weaker.",
    },
  ];
}

export default function GraphPage() {
  const [input, setInput] = useState<UserCaseInput | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInput(loadInput());
    setHydrated(true);
  }, []);

  const activeInput = hydrated ? (input ?? SAMPLE_INPUT) : null;
  const data = useMemo(
    () => (activeInput ? buildDashboard(activeInput) : null),
    [activeInput],
  );
  const graph = useMemo(() => (data ? buildGraph(data) : null), [data]);

  if (hydrated && !graph) {
    return (
      <section className="mx-auto max-w-5xl px-5 py-12">
        <LawViewSwitch active="map" />
        <div className="mt-10 rounded-lg border border-card-border bg-white/78 p-8 text-center">
          <Badge variant="accent">
            <GitGraph className="h-3.5 w-3.5" />
            Law map
          </Badge>
          <h1 className="mt-4 text-2xl font-bold">No law map yet</h1>
          <p className="mx-auto mt-2 max-w-xl text-muted">
            Start with an example or enter your own issue to see how cases,
            law, proof, and results connect.
          </p>
          <Link href="/analyze" className="mt-6 inline-block">
            <Button>Start research</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <LawViewSwitch active="map" />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px] lg:items-end">
        <div>
          <Badge variant="accent">
            <GitGraph className="h-3.5 w-3.5" />
            Visual legal awareness
          </Badge>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold glow-text sm:text-4xl">
            See the law as a simple path.
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            The map turns legal research into connected points: your issue,
            similar examples, law sections, useful proof, and likely results.
          </p>
        </div>

        {data && (
          <div className="rounded-lg border border-card-border bg-white/78 p-4 shadow-[0_1px_2px_rgba(16,19,24,0.04)]">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Scale className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-muted">
                  Closest example
                </p>
                <h2 className="mt-1 text-base font-semibold">
                  {data.topMatch.case.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {data.topMatch.relevance.similarity_score}% match. Use the
                  connected law and proof nodes to understand why.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {!input && (
        <Badge variant="primary" className="mt-5">
          Showing demo examples from the project corpus
        </Badge>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {LEGEND.map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-2 rounded-full border border-card-border bg-white/76 px-3 py-1.5 text-xs font-medium text-muted"
            title={item.help}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <GlassCard className="overflow-hidden p-0">
          <div className="border-b border-card-border bg-white/78 px-5 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Case connection map</h2>
                <p className="text-sm text-muted">
                  Drag the canvas or zoom to inspect any legal connection.
                </p>
              </div>
              <Link href="/report">
                <Button variant="secondary" size="sm">
                  Open brief
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="h-[66vh] min-h-[520px] bg-white/55">
            {graph && (
              <ReactFlow
                nodes={graph.nodes}
                edges={graph.edges}
                fitView
                nodesConnectable={false}
                edgesFocusable={false}
              >
                <Background color="rgba(17,18,26,0.07)" gap={22} />
                <Controls showInteractive={false} />
              </ReactFlow>
            )}
          </div>
        </GlassCard>

        <aside className="space-y-4">
          <div className="rounded-lg border border-card-border bg-white/78 p-4 shadow-[0_1px_2px_rgba(16,19,24,0.04)]">
            <div className="flex items-center gap-2">
              <Route className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Read it in this order</h2>
            </div>
            <div className="mt-4 space-y-3">
              {data &&
                buildPlainSteps(data).map(({ icon: Icon, title, text }, i) => (
                  <div key={title} className="flex gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Icon className="h-4 w-4 text-accent" />
                        {title}
                      </div>
                      <p className="mt-1 text-xs leading-5 text-muted">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {data && (
            <div className="rounded-lg border border-card-border bg-white/78 p-4 shadow-[0_1px_2px_rgba(16,19,24,0.04)]">
              <h2 className="font-semibold">Law signals found</h2>
              <p className="mt-1 text-sm leading-6 text-muted">
                These are the first sections ULIS connected to the map.
              </p>
              <div className="mt-4 space-y-2">
                {data.sections.slice(0, 4).map((item) => (
                  <div
                    key={item.section}
                    className="rounded-lg border border-card-border bg-surface/70 p-3"
                  >
                    <p className="text-sm font-semibold">{item.section}</p>
                    <p className="mt-1 text-xs leading-5 text-muted">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
