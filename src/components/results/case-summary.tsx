import { FileText, MapPin, User, Target } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import type { DashboardData } from "@/lib/types";

export function CaseSummary({ data }: { data: DashboardData }) {
  const { input, summary, signals } = data;
  return (
    <GlassCard>
      <div className="flex items-center gap-2 text-sm text-muted">
        <FileText className="h-4 w-4 text-primary" />
        Case Summary
      </div>
      <p className="mt-3 text-lg leading-relaxed">{summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {signals.category && (
          <Badge variant="primary">{signals.category}</Badge>
        )}
        <Badge>
          <User className="h-3.5 w-3.5" />
          {input.role}
        </Badge>
        <Badge>
          <MapPin className="h-3.5 w-3.5" />
          {input.state}
        </Badge>
        <Badge>
          <Target className="h-3.5 w-3.5" />
          {input.desiredOutcome}
        </Badge>
      </div>
    </GlassCard>
  );
}
