"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Landmark, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/analyze", label: "Research" },
  { href: "/results", label: "Intel Board" },
  { href: "/graph", label: "Law Map" },
  { href: "/ingestion", label: "Law Library" },
  { href: "/report", label: "Brief" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50">
      <nav className="glass mx-auto mt-4 flex max-w-6xl items-center justify-between gap-4 rounded-lg px-5 py-3">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Landmark className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold">
            ULIS
            <span className="ml-1 hidden text-xs font-normal text-muted sm:inline">
              Structured Legal Intelligence
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition-colors",
                isActive(link.href)
                  ? "bg-surface-2 text-foreground"
                  : "text-muted hover:bg-surface hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/analyze" className="hidden sm:block">
            <Button size="sm">Open Research Console</Button>
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="mx-auto mt-2 max-w-6xl px-2 md:hidden">
          <div className="glass glow-border flex flex-col gap-1 rounded-lg p-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive(link.href)
                    ? "bg-surface-2 text-foreground"
                    : "text-muted hover:bg-surface hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/analyze" onClick={() => setOpen(false)} className="mt-1">
              <Button size="sm" className="w-full">
                Open Research Console
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
