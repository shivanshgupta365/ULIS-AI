"use client";

import { motion } from "framer-motion";
import type { ChartDatum } from "@/lib/types";

const PALETTE = [
  "#f59e0b",
  "#f97316",
  "#fbbf24",
  "#10b981",
  "#8b5cf6",
  "#0ea5e9",
];

type DonutChartProps = {
  data: ChartDatum[];
  size?: number;
};

/** SVG donut chart with a legend. */
export function DonutChart({ data, size = 160 }: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const segments = data.map((d, i) => {
    const fraction = d.value / total;
    const dash = fraction * circumference;
    // Cumulative fraction of all prior segments (functional, no mutation).
    const prior =
      data.slice(0, i).reduce((sum, x) => sum + x.value, 0) / total;
    return {
      color: PALETTE[i % PALETTE.length],
      dashArray: `${dash} ${circumference - dash}`,
      dashOffset: -prior * circumference,
      ...d,
    };
  });

  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {segments.map((s, i) => (
            <motion.circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={s.dashArray}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: s.dashOffset }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: "easeOut" }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold leading-none">{total}</span>
          <span className="text-[10px] uppercase text-muted">
            cases
          </span>
        </div>
      </div>

      <ul className="space-y-2 text-sm">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            <span
              className="h-3 w-3 shrink-0 rounded-sm"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-muted">{s.label}</span>
            <span className="font-semibold">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
