import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";

type PagePlaceholderProps = {
  title: string;
  description: string;
  phase: string;
};

/** Temporary scaffold for routes built in later phases. */
export function PagePlaceholder({
  title,
  description,
  phase,
}: PagePlaceholderProps) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <Badge variant="accent">{phase}</Badge>
      <h1 className="mt-4 text-3xl font-bold glow-text sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-muted">{description}</p>

      <GlassCard className="mt-10 flex min-h-60 items-center justify-center text-center">
        <p className="text-muted">
          🚧 This screen will be built in a later phase.
        </p>
      </GlassCard>
    </section>
  );
}
