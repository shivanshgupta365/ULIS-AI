"use client";

import { motion } from "framer-motion";
import type { ChartDatum } from "@/lib/types";

type BarChartProps = {
  data: ChartDatum[];
  suffix?: string;
};

/** Horizontal bar chart with values, animated into view, normalized to the max. */
export function BarChart({ data, suffix = "" }: BarChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div key={d.label} className="group">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-muted transition-colors group-hover:text-foreground">
              {d.label}
            </span>
            <span className="font-semibold">
              {d.value}
              {suffix}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-signal"
              initial={{ width: 0 }}
              whileInView={{ width: `${(d.value / max) * 100}%` }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
