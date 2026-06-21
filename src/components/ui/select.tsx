import { cn } from "@/lib/utils";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: readonly string[];
};

/** Styled native select (options use OS rendering, forced to dark text). */
export function Select({
  label,
  options,
  className,
  ...props
}: SelectProps) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-sm text-muted">{label}</span>
      )}
      <select
        className={cn(
          "h-11 w-full rounded-lg border border-card-border bg-white/78 px-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50 [&>option]:text-black",
          className,
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
