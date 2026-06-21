import { ShieldCheck, Lock, FileWarning, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PRIVACY_BADGES = [
  { icon: ShieldCheck, label: "PII Aware" },
  { icon: Database, label: "Structured Corpus" },
  { icon: FileWarning, label: "Not Legal Advice" },
  { icon: Lock, label: "Session Scoped" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-card-border">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-wrap gap-2">
          {PRIVACY_BADGES.map(({ icon: Icon, label }) => (
            <Badge key={label} variant="primary">
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Badge>
          ))}
        </div>

        <div className="mt-6 space-y-3 text-sm text-muted">
          <p>
            <span className="font-semibold text-foreground">Disclaimer:</span>{" "}
            ULIS provides legal research support and structured intelligence only.
            It does not replace professional legal advice, judicial review, or
            independent legal judgment.
          </p>
          <p>
            <span className="font-semibold text-foreground">Privacy:</span>{" "}
            This prototype treats uploaded documents and entered facts as
            session-scoped demo inputs. Personal identifiers are masked before
            downstream analysis.
          </p>
        </div>

        <p className="mt-6 text-xs text-muted/70">
          © {2026} ULIS - Structured Legal Intelligence Engine. Prototype.
        </p>
      </div>
    </footer>
  );
}
