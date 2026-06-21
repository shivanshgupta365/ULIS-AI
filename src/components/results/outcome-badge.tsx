import { Badge, type BadgeProps } from "@/components/ui/badge";
import type { CaseOutcome } from "@/lib/types";

const OUTCOME_VARIANT: Record<CaseOutcome, BadgeProps["variant"]> = {
  "Relief Granted": "success",
  Conviction: "success",
  Settlement: "primary",
  "Bail Granted": "default",
  "Complaint Dismissed": "warning",
  Acquittal: "warning",
};

export function OutcomeBadge({ outcome }: { outcome: CaseOutcome }) {
  return <Badge variant={OUTCOME_VARIANT[outcome]}>{outcome}</Badge>;
}
