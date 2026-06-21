import Link from "next/link";
import { cn } from "@/lib/utils";

type LawView = "map" | "library";

const VIEWS: { id: LawView; label: string; href: string }[] = [
  { id: "map", label: "Law Map", href: "/graph" },
  { id: "library", label: "Law Library", href: "/ingestion" },
];

export function LawViewSwitch({ active }: { active: LawView }) {
  return (
    <nav
      aria-label="Law views"
      className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-white/70 p-1 shadow-[0_1px_2px_rgba(16,19,24,0.04)]"
    >
      {VIEWS.map((view) => {
        const selected = view.id === active;
        return (
          <Link
            key={view.id}
            href={view.href}
            aria-current={selected ? "page" : undefined}
            className={cn(
              "rounded-lg px-5 py-3 text-lg font-medium transition-colors sm:px-6 sm:text-xl",
              selected
                ? "bg-surface-2 text-foreground shadow-[0_1px_2px_rgba(16,19,24,0.04)]"
                : "text-muted hover:bg-surface hover:text-foreground",
            )}
          >
            {view.label}
          </Link>
        );
      })}
    </nav>
  );
}
