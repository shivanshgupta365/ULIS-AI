import { Scale } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import type { SectionInfo } from "@/lib/types";

export function LegalSections({ sections }: { sections: SectionInfo[] }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">
        Relevant Legal Sections
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((s) => (
          <GlassCard key={s.section} hover className="p-5">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Scale className="h-4 w-4" />
              </span>
              <span className="font-semibold">{s.section}</span>
            </div>
            <p className="mt-2 text-sm text-muted">{s.description}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
