import { cn } from "@/lib/utils";

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Adds an extra glowing border + lift on hover. */
  hover?: boolean;
};

/** Tokenized surface used across ULIS. */
export function GlassCard({
  className,
  hover = false,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass glow-border rounded-lg p-6",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-primary/28 hover:shadow-[0_24px_60px_-26px_var(--glow)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
