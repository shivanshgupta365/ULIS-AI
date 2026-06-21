import { Check, X, AlertTriangle, ShieldAlert } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import type { EvidenceItem, RiskItem } from "@/lib/types";

export function EvidenceChecklist({ items }: { items: EvidenceItem[] }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">
        Evidence Checklist
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((e) => (
          <GlassCard
            key={e.item}
            className="flex items-center justify-between gap-3 p-4"
          >
            <div className="flex items-center gap-3">
              <span
                className={
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full " +
                  (e.available
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "bg-rose-500/10 text-rose-600")
                }
              >
                {e.available ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </span>
              <span className="text-sm">{e.item}</span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Badge variant={e.available ? "success" : "danger"}>
                {e.available ? "Available" : "Missing"}
              </Badge>
              {e.priority === "High priority" && (
                <Badge variant="warning">High priority</Badge>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

export function RiskChecklist({ items }: { items: RiskItem[] }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Risk Checklist</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((r, i) => (
          <GlassCard key={`${r.risk}-${i}`} className="p-4">
            <div className="flex items-start gap-3">
              <span
                className={
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full " +
                  (r.severity === "High"
                    ? "bg-rose-500/10 text-rose-600"
                    : "bg-signal/10 text-signal")
                }
              >
                {r.severity === "High" ? (
                  <ShieldAlert className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
              </span>
              <div>
                <p className="text-sm">{r.risk}</p>
                <p className="mt-1 text-xs text-muted">
                  <Badge
                    variant={r.severity === "High" ? "danger" : "warning"}
                  >
                    {r.severity} risk
                  </Badge>
                  <span className="ml-2">from {r.source}</span>
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
