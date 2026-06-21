import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-card-border bg-surface text-muted",
        primary: "border-primary/20 bg-primary/10 text-primary",
        accent: "border-accent/25 bg-accent/10 text-accent",
        success: "border-success/20 bg-success/10 text-success",
        warning: "border-signal/25 bg-signal/10 text-signal",
        danger: "border-danger/20 bg-danger/10 text-danger",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
