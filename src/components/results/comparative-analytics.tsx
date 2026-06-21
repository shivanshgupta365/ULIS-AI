import { BarChart3, PieChart, TrendingUp, ShieldAlert } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { BarChart } from "@/components/charts/bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import type { Analytics, FactorRow } from "@/lib/types";

function FactorTable({
  title,
  rows,
  icon,
}: {
  title: string;
  rows: FactorRow[];
  icon: React.ReactNode;
}) {
  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium">
        {icon}
        {title}
      </div>
      <ul className="space-y-2.5">
        {rows.map((r) => (
          <li
            key={r.factor}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="text-muted">{r.factor}</span>
            <span className="flex shrink-0 items-center gap-2">
              <Badge variant={r.impact === "High" ? "success" : "warning"}>
                {r.impact}
              </Badge>
              <span className="w-12 text-right font-semibold">
                {r.count} case{r.count === 1 ? "" : "s"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

export function ComparativeAnalytics({ analytics }: { analytics: Analytics }) {
  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">
        Comparative Analytics
      </h2>
      <p className="mb-4 text-sm text-muted">
        Patterns across {analytics.totalCases} similar past cases.
      </p>

      {/* Highlights */}
      <GlassCard className="mb-4">
        <p className="mb-3 text-sm font-medium">
          Across {analytics.totalCases} similar cases
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {analytics.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-muted">
              <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {h}
            </li>
          ))}
        </ul>
      </GlassCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium">
            <PieChart className="h-4 w-4 text-primary" />
            Outcome Pattern
          </div>
          <DonutChart data={analytics.outcomes} />
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium">
            <BarChart3 className="h-4 w-4 text-primary" />
            Evidence Impact
          </div>
          <BarChart data={analytics.evidenceImpact} />
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium">
            <BarChart3 className="h-4 w-4 text-primary" />
            Common Legal Sections
          </div>
          <BarChart data={analytics.sections} />
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium">
            <BarChart3 className="h-4 w-4 text-primary" />
            Case Type Comparison
          </div>
          <BarChart data={analytics.categories} />
        </GlassCard>

        <FactorTable
          title="Most Common Winning Factors"
          rows={analytics.winningFactors}
          icon={<TrendingUp className="h-4 w-4 text-emerald-600" />}
        />
        <FactorTable
          title="Most Common Risk Factors"
          rows={analytics.riskFactors}
          icon={<ShieldAlert className="h-4 w-4 text-rose-600" />}
        />
      </div>
    </div>
  );
}
