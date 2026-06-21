"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Eye, EyeOff, ArrowRight, Lock } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnalyzeLoader } from "@/components/analyze/analyze-loader";
import { summarizeMatches } from "@/lib/pii";
import { loadMask } from "@/lib/session";
import { ANALYSIS_STEPS } from "@/lib/constants";
import type { MaskResult } from "@/lib/types";

export default function PrivacyPage() {
  const router = useRouter();
  const [mask, setMask] = useState<MaskResult | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Hydrate from session-only storage after mount (no SSR access to it).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMask(loadMask());
    setHydrated(true);
  }, []);

  if (hydrated && !mask) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <h1 className="text-2xl font-bold">No case to preview yet</h1>
        <p className="mt-2 text-muted">
          Describe your situation first, then we&apos;ll mask it here.
        </p>
        <Link href="/analyze" className="mt-6 inline-block">
          <Button>Go to Analyze</Button>
        </Link>
      </section>
    );
  }

  const badges = mask ? summarizeMatches(mask.matches) : [];

  return (
    <section className="mx-auto max-w-3xl px-5 py-12">
      <Badge variant="accent">
        <ShieldCheck className="h-3.5 w-3.5" />
        Step 2 - Privacy check
      </Badge>
      <h1 className="mt-4 text-3xl font-bold glow-text sm:text-4xl">
        Privacy Masking Preview
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Before retrieval and summarization, ULIS masks personal information.
        Only the masked version is used downstream.
      </p>

      <GlassCard className="mt-8 space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            PII Protected
          </Badge>
          {badges.length > 0 ? (
            badges.map((b) => (
              <Badge key={b} variant="primary">
                {b}
              </Badge>
            ))
          ) : (
            <Badge>No personal identifiers detected</Badge>
          )}
        </div>

        {/* Masked text (visible) */}
        <div>
          <span className="mb-2 block text-sm text-muted">
            Masked version (used for analysis)
          </span>
          <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm leading-relaxed">
            {mask?.masked}
          </div>
        </div>

        {/* Original (hidden by default) */}
        <div>
          <button
            type="button"
            onClick={() => setShowOriginal((s) => !s)}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            {showOriginal ? (
              <>
                <EyeOff className="h-4 w-4" /> Hide original
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" /> Show original
              </>
            )}
          </button>
          {showOriginal && (
            <div className="mt-2 rounded-lg border border-card-border bg-white/80 p-4 text-sm leading-relaxed text-muted">
              {mask?.original}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-muted">
          <Lock className="h-4 w-4 text-accent" />
          Masking happens on-device for this demo. Your original text never
          leaves the session.
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Link href="/analyze">
            <Button variant="ghost">Edit my description</Button>
          </Link>
          <Button onClick={() => setLoading(true)}>
            Continue to intelligence board
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </GlassCard>

      {loading && (
        <AnalyzeLoader
          steps={ANALYSIS_STEPS}
          onComplete={() => router.push("/results")}
        />
      )}
    </section>
  );
}
