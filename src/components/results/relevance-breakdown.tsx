import { ProgressBar } from "@/components/ui/progress-bar";
import type { RelevanceBreakdown } from "@/lib/types";

const LABELS: { key: keyof RelevanceBreakdown; label: string }[] = [
  { key: "fact_match", label: "Fact Match" },
  { key: "section_match", label: "Law Match" },
  { key: "evidence_match", label: "Evidence Match" },
  { key: "category_match", label: "Issue Match" },
  { key: "outcome_match", label: "Outcome Match" },
  { key: "jurisdiction_match", label: "Court Match" },
];

export function RelevanceBreakdownView({
  breakdown,
}: {
  breakdown: RelevanceBreakdown;
}) {
  return (
    <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {LABELS.map(({ key, label }) => (
        <ProgressBar key={key} label={label} value={breakdown[key]} />
      ))}
    </div>
  );
}
