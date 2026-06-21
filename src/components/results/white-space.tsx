import { Telescope, HelpCircle, ClipboardList, Link2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import type { WhiteSpaceItem } from "@/lib/types";

export function WhiteSpace({ items }: { items: WhiteSpaceItem[] }) {
  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">
        Preparation Gaps / White Space
      </h2>
      <p className="mb-4 text-sm text-muted">
        What your case may be missing compared with stronger past cases.
      </p>

      {items.length === 0 ? (
        <GlassCard className="text-sm text-muted">
          No major preparation gaps detected based on what you provided.
        </GlassCard>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {items.map((item, i) => (
            <GlassCard key={`${item.gap}-${i}`} hover className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <Telescope className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="font-medium leading-snug">{item.gap}</p>
                </div>
                <Badge variant={item.priority === "High" ? "danger" : "warning"}>
                  {item.priority}
                </Badge>
              </div>

              <div className="mt-4 space-y-2 text-sm text-muted">
                <p className="flex items-start gap-2">
                  <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <span className="text-foreground">Why it matters: </span>
                    {item.why}
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <span className="text-foreground">What to collect: </span>
                    {item.collect}
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Link2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <span className="text-foreground">Related case: </span>
                    {item.relatedCase}
                  </span>
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
