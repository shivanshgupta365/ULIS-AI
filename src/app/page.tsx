"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  ClipboardCheck,
  Database,
  FileSearch,
  FileText,
  Gavel,
  GraduationCap,
  Landmark,
  Network,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

const SOURCE_LAYERS = [
  { icon: Gavel, label: "Case law", detail: "Precedents and outcome patterns" },
  { icon: Landmark, label: "Statutes", detail: "Sections, amendments, citations" },
  { icon: FileText, label: "Contracts", detail: "Clauses, obligations, risks" },
  { icon: Bell, label: "Litigation updates", detail: "Matter movement and alerts" },
];

const INTELLIGENCE_STREAM = [
  { label: "Query intent", value: "contract breach + injunction", tone: "primary" },
  { label: "Authority rank", value: "7 high-signal precedents", tone: "accent" },
  { label: "Risk extraction", value: "3 evidence gaps detected", tone: "warning" },
  { label: "Brief status", value: "counsel-ready summary", tone: "success" },
];

const USERS = [
  {
    icon: Building2,
    title: "Law firms",
    copy: "Move from broad search to ranked authorities, facts, issues, and argument paths.",
  },
  {
    icon: ClipboardCheck,
    title: "Corporate legal",
    copy: "Scan contracts, monitor disputes, and convert legal noise into review queues.",
  },
  {
    icon: Scale,
    title: "Courts and institutions",
    copy: "Structure records, compare matters, and surface procedural or precedent signals.",
  },
  {
    icon: GraduationCap,
    title: "Researchers",
    copy: "Study doctrine, regulation, litigation trends, and citation relationships faster.",
  },
];

const CAPABILITIES = [
  { icon: Search, label: "Sophisticated legal query handling" },
  { icon: FileSearch, label: "Contract and document risk scanning" },
  { icon: BarChart3, label: "Analytical summaries and outcome patterns" },
  { icon: Network, label: "Authority graph across facts, sections, and outcomes" },
  { icon: ShieldCheck, label: "Privacy-aware intake and PII masking" },
  { icon: Database, label: "Structured database-ready legal corpus" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-5">
      <section className="grid min-h-[calc(100vh-6rem)] items-center gap-8 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <Badge variant="primary">
            <Sparkles className="h-3.5 w-3.5" />
            Structured Legal Intelligence Engine
          </Badge>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-6xl">
            Search, analyze, and summarize legal knowledge with{" "}
            <span className="text-gradient">structured AI intelligence</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            ULIS helps legal teams search case law, statutes, regulations,
            contracts, and litigation updates, then turns dense documents into
            ranked authorities, analytical summaries, and action-ready alerts.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/analyze">
              <Button size="lg">
                Open Research Console
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/results">
              <Button size="lg" variant="secondary">
                View Intelligence Board
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="relative"
        >
          <GlassCard className="overflow-hidden p-0">
            <div className="border-b border-card-border bg-foreground px-4 py-3 text-white">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <Landmark className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">ULIS Research Console</p>
                    <p className="text-xs text-white/60">Live intelligence workspace</p>
                  </div>
                </div>
                <Badge variant="success">Ready</Badge>
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1fr_0.9fr]">
              <div className="border-b border-card-border p-5 lg:border-r lg:border-b-0">
                <div className="rounded-lg border border-card-border bg-surface p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                    <Search className="h-4 w-4 text-primary" />
                    Legal query
                  </div>
                  <p className="text-sm leading-6 text-muted">
                    Compare recent commercial injunction precedents, identify
                    statutory hooks, and summarize contract termination risk.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["case law", "statutes", "contracts", "alerts"].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-card-border bg-white px-2.5 py-1 text-xs text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {SOURCE_LAYERS.map(({ icon: Icon, label, detail }) => (
                    <div
                      key={label}
                      className="rounded-lg border border-card-border bg-white/80 p-4"
                    >
                      <Icon className="h-5 w-5 text-accent" />
                      <p className="mt-3 text-sm font-semibold">{label}</p>
                      <p className="mt-1 text-xs leading-5 text-muted">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/60 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold">Intelligence stream</p>
                  <span className="font-mono text-xs text-muted">ULIS-026</span>
                </div>
                <div className="space-y-3">
                  {INTELLIGENCE_STREAM.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg border border-card-border bg-white p-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs text-muted">{item.label}</p>
                        <Badge
                          variant={
                            item.tone as "primary" | "accent" | "warning" | "success"
                          }
                        >
                          {item.tone}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-lg border border-card-border bg-foreground p-4 text-white">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <BookOpen className="h-4 w-4 text-accent" />
                    Analytical summary
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/72">
                    The strongest authorities turn on notice quality, course of
                    performance, and documentary proof of default. Contract
                    clauses require counsel review before escalation.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      <section className="border-y border-card-border py-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map(({ icon: Icon, label }) => (
            <Reveal key={label}>
              <div className="flex min-h-20 items-center gap-3 rounded-lg border border-card-border bg-white/80 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-sm font-medium">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-2xl">
          <Badge variant="accent">
            <Users className="h-3.5 w-3.5" />
            Built for the legal ecosystem
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            One intelligence layer across research, contracts, courts, and academia.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {USERS.map(({ icon: Icon, title, copy }, i) => (
            <Reveal key={title} delay={(i % 4) * 0.06}>
              <GlassCard hover className="h-full">
                <Icon className="h-6 w-6 text-signal" />
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
