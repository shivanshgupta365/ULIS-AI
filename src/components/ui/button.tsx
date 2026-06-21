import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[0_12px_28px_-18px_rgba(25,89,255,0.65)] hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_18px_40px_-22px_rgba(25,89,255,0.72)]",
        secondary:
          "border border-card-border bg-white/85 text-foreground shadow-[0_1px_2px_rgba(16,19,24,0.05)] hover:-translate-y-0.5 hover:bg-surface",
        ghost: "text-muted hover:bg-surface hover:text-foreground",
        accent:
          "bg-accent text-white font-semibold shadow-[0_12px_28px_-18px_rgba(0,143,135,0.65)] hover:-translate-y-0.5 hover:bg-accent/90",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
