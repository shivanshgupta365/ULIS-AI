import { cn } from "@/lib/utils";

type ProgressBarProps = {
  /** 0–100 */
  value: number;
  label?: string;
  showValue?: boolean;
  className?: string;
  barClassName?: string;
};

/** Score/relevance progress bar with optional label + value. */
export function ProgressBar({
  value,
  label,
  showValue = true,
  className,
  barClassName,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          {label && <span className="text-muted">{label}</span>}
          {showValue && (
            <span className="font-semibold text-foreground">{clamped}%</span>
          )}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-black/[0.06]">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-primary via-accent to-signal transition-all duration-700",
            barClassName,
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
