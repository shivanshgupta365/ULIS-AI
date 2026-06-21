import {
  deriveSignals,
  evidenceConcept,
  findSimilarCases,
} from "@/lib/relevance";
import type {
  Analytics,
  ChartDatum,
  Clue,
  DashboardData,
  EvidenceItem,
  FactorRow,
  RiskItem,
  ScoredCase,
  SectionInfo,
  UserCaseInput,
  WhiteSpaceItem,
} from "@/lib/types";

/** Plain-language descriptions of common sections. */
export const SECTION_INFO: Record<string, string> = {
  "498A IPC":
    "Cruelty by a husband or his relatives towards a married woman.",
  "304B IPC":
    "Dowry death - unnatural death within 7 years of marriage linked to dowry harassment.",
  "406 IPC":
    "Criminal breach of trust - commonly used for non-return of stridhan/jewelry.",
  "323 IPC": "Punishment for voluntarily causing hurt.",
  "482 CrPC":
    "High Court's power to quash false or frivolous complaints.",
  "Dowry Prohibition Act":
    "Prohibits the giving or taking of dowry.",
  "Protection of Women from Domestic Violence Act":
    "Civil protection, residence and maintenance orders against domestic abuse.",
};

function describeSection(section: string): string {
  return SECTION_INFO[section] ?? "Relevant statutory provision.";
}

function confidenceFromScore(score: number): Clue["confidence"] {
  if (score >= 70) return "High";
  if (score >= 50) return "Medium";
  return "Low";
}

function buildSections(top: ScoredCase[]): SectionInfo[] {
  const seen = new Set<string>();
  const out: SectionInfo[] = [];
  for (const s of top) {
    for (const section of s.case.sections) {
      if (!seen.has(section)) {
        seen.add(section);
        out.push({ section, description: describeSection(section) });
      }
    }
  }
  return out;
}

function buildClues(top: ScoredCase[]): Clue[] {
  const clues: Clue[] = [];
  for (const { case: c, relevance } of top) {
    for (const clue of c.winning_clues.slice(0, 2)) {
      clues.push({
        clue,
        supportingCase: c.title,
        evidenceNeeded: c.evidence.slice(0, 3),
        section: c.sections[0] ?? "-",
        riskIfIgnored:
          c.risk_factors[0] ?? "Weak corroboration can undermine the claim.",
        confidence: confidenceFromScore(relevance.similarity_score),
      });
    }
  }
  return clues.slice(0, 6);
}

function buildEvidenceChecklist(
  input: UserCaseInput,
  top: ScoredCase[],
): EvidenceItem[] {
  const userConcepts = new Set(deriveSignals(input).evidence);

  // Group evidence by concept so synonyms (e.g. "Bank transfers" vs
  // "Bank transfer requests") collapse into one checklist item.
  const groups = new Map<string, { item: string; count: number }>();
  for (const { case: c } of top) {
    const seenInCase = new Set<string>();
    for (const label of c.evidence) {
      const key = evidenceConcept(label) ?? label.toLowerCase();
      if (seenInCase.has(key)) continue;
      seenInCase.add(key);
      const existing = groups.get(key);
      if (existing) existing.count += 1;
      else groups.set(key, { item: label, count: 1 });
    }
  }

  return [...groups.entries()]
    .map(([key, { item, count }]) => {
      const concept = evidenceConcept(item);
      const available = concept
        ? userConcepts.has(concept)
        : userConcepts.has(key);
      return {
        item,
        available,
        priority:
          count >= 2 ? ("High priority" as const) : ("Important" as const),
      };
    })
    .sort((a, b) => {
      // Missing high-priority items first.
      const score = (e: EvidenceItem) =>
        (e.available ? 0 : 2) + (e.priority === "High priority" ? 1 : 0);
      return score(b) - score(a);
    });
}

function buildRisks(top: ScoredCase[]): RiskItem[] {
  const seen = new Set<string>();
  const risks: RiskItem[] = [];
  top.forEach(({ case: c }, caseIndex) => {
    for (const risk of c.risk_factors) {
      if (seen.has(risk)) continue;
      seen.add(risk);
      risks.push({
        risk,
        source: c.title,
        severity: caseIndex < 2 ? "High" : "Medium",
      });
    }
  });
  return risks.slice(0, 6);
}

function buildSummary(
  input: UserCaseInput,
  signals: ReturnType<typeof deriveSignals>,
  scored: ScoredCase[],
): string {
  const category = signals.category ?? "dowry-related";
  const strong = scored.filter(
    (s) => s.relevance.similarity_score >= 50,
  ).length;
  const sectionPart =
    signals.sections.length > 0
      ? ` It likely involves ${signals.sections.join(", ")}.`
      : "";
  return `This appears to be a ${category} matter.${sectionPart} As a ${input.role.toLowerCase()}, your goal is to ${input.desiredOutcome.toLowerCase()}. We compared your situation with ${scored.length} past judgments and found ${strong} strong match${strong === 1 ? "" : "es"}.`;
}

// ---- Comparative analytics ----

function countBy<T>(items: T[], key: (t: T) => string): ChartDatum[] {
  const map = new Map<string, number>();
  for (const it of items) {
    const k = key(it);
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

const EVIDENCE_IMPACT_CONCEPTS: { concept: string; label: string }[] = [
  { concept: "messages", label: "WhatsApp / messages" },
  { concept: "witness", label: "Witness support" },
  { concept: "bank", label: "Bank records" },
  { concept: "medical", label: "Medical records" },
  { concept: "photos", label: "Photos / bills" },
  { concept: "police", label: "Police / FIR" },
];

function caseHasConcept(evidence: string[], concept: string): boolean {
  return evidence.some((e) => evidenceConcept(e) === concept);
}

const WINNING_THEMES: { factor: string; pattern: RegExp }[] = [
  { factor: "Documentary / written evidence", pattern: /written|message|document|bill|photo|record/i },
  { factor: "Witness support", pattern: /witness/i },
  { factor: "Medical proof", pattern: /medical|injury|post-mortem/i },
  { factor: "Specific, dated incidents", pattern: /specific|date|timeline|consistent/i },
  { factor: "Prompt FIR / complaint", pattern: /prompt|fir|immediate/i },
  { factor: "Clear settlement terms", pattern: /settlement|terms|receipt|written settlement/i },
];

const RISK_THEMES: { factor: string; pattern: RegExp }[] = [
  { factor: "Lack of documentary / transaction proof", pattern: /proof|transaction|documentary|written|bills/i },
  { factor: "Delay in complaint", pattern: /delay/i },
  { factor: "Vague / general allegations", pattern: /vague|general|omnibus|non-specific/i },
  { factor: "Verbal-only, no corroboration", pattern: /verbal|corroborat|independent witness/i },
  { factor: "Weak causation / chain gaps", pattern: /causation|chain|gaps|rebut/i },
];

function themeFactors(
  cases: ScoredCase[],
  themes: { factor: string; pattern: RegExp }[],
  field: "winning_clues" | "risk_factors",
): FactorRow[] {
  return themes
    .map(({ factor, pattern }) => {
      const count = cases.filter(({ case: c }) =>
        c[field].some((t) => pattern.test(t)),
      ).length;
      return {
        factor,
        count,
        impact: (count >= 3 ? "High" : "Medium") as FactorRow["impact"],
      };
    })
    .filter((f) => f.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function buildAnalytics(scored: ScoredCase[]): Analytics {
  const cases = scored.map((s) => s.case);
  const total = cases.length;

  const evidenceImpact = EVIDENCE_IMPACT_CONCEPTS.map(({ concept, label }) => ({
    label,
    value: cases.filter((c) => caseHasConcept(c.evidence, concept)).length,
  })).filter((d) => d.value > 0);

  const whatsapp = cases.filter((c) =>
    caseHasConcept(c.evidence, "messages"),
  ).length;
  const has498A = cases.filter((c) => c.sections.includes("498A IPC")).length;
  const stridhan = cases.filter((c) => c.category === "Stridhan Return").length;
  const vague = cases.filter((c) =>
    c.risk_factors.some((r) => /vague|general|omnibus/i.test(r)),
  ).length;
  const settled = cases.filter(
    (c) => c.outcome === "Settlement" || c.category === "Settlement",
  ).length;

  const c = (n: number) => `${n} case${n === 1 ? "" : "s"}`;
  const highlights = [
    `${whatsapp} of ${total} cases involved WhatsApp or written evidence`,
    `${c(has498A)} discussed Section 498A IPC`,
    `${c(stridhan)} had stridhan-related claims`,
    `${c(vague)} weakened due to vague allegations`,
    `${c(settled)} ended in settlement or mediation`,
  ];

  return {
    totalCases: total,
    outcomes: countBy(cases, (c) => c.outcome),
    evidenceImpact,
    sections: countBy(cases.flatMap((c) => c.sections), (s) => s).slice(0, 6),
    categories: countBy(cases, (c) => c.category),
    winningFactors: themeFactors(scored, WINNING_THEMES, "winning_clues"),
    riskFactors: themeFactors(scored, RISK_THEMES, "risk_factors"),
    highlights,
  };
}

// ---- White space / preparation gaps ----

const EVIDENCE_GUIDANCE: Record<string, { why: string; collect: string }> = {
  messages: {
    why: "In similar cases, WhatsApp messages and written demands helped establish the claim.",
    collect: "Export and save chat threads showing demands or threats, with dates.",
  },
  witness: {
    why: "Witness statements strengthened the timeline in stronger past cases.",
    collect: "Note names of neighbours/relatives who can confirm key incidents.",
  },
  bank: {
    why: "Bank records corroborated alleged payments in comparable matters.",
    collect: "Gather statements or transfer requests showing money movement.",
  },
  medical: {
    why: "Medical records directly corroborated injuries or stress-related harm.",
    collect: "Obtain MLC reports, prescriptions, or hospital records.",
  },
  photos: {
    why: "Bills and photographs proved ownership and value of stridhan.",
    collect: "Collect purchase bills, wedding photos, and an itemized list.",
  },
  police: {
    why: "A prompt police complaint reduced doubts about fabrication.",
    collect: "Keep a copy of any FIR or written complaint filed.",
  },
  timeline: {
    why: "A clear sequence of dated events made allegations more persuasive.",
    collect: "Write a dated timeline of every relevant incident.",
  },
};

function buildWhiteSpace(
  input: UserCaseInput,
  evidence: EvidenceItem[],
  scored: ScoredCase[],
): WhiteSpaceItem[] {
  const items: WhiteSpaceItem[] = [];

  for (const e of evidence.filter((x) => !x.available)) {
    const concept = evidenceConcept(e.item);
    const guidance = concept ? EVIDENCE_GUIDANCE[concept] : undefined;
    if (!guidance) continue;
    const related = scored.find(
      ({ case: c }) => concept && caseHasConcept(c.evidence, concept),
    );
    items.push({
      gap: `You have not added ${e.item.toLowerCase()}.`,
      why: guidance.why,
      collect: guidance.collect,
      relatedCase: related?.case.title ?? "Similar past case",
      priority: e.priority === "High priority" ? "High" : "Medium",
    });
  }

  if (input.state === "Other / Not sure") {
    items.push({
      gap: "Jurisdiction is unclear.",
      why: "Filing in the correct court/jurisdiction affects how the case proceeds.",
      collect: "Confirm where the marriage, residence, or incidents took place.",
      relatedCase: scored[0]?.case.title ?? "Similar past case",
      priority: "Medium",
    });
  }

  if (input.description.trim().length < 140) {
    items.push({
      gap: "Specific allegation details may be missing.",
      why: "Specific, dated allegations were far stronger than general claims in past cases.",
      collect: "Add concrete incidents: what was said/done, when, and by whom.",
      relatedCase: "False Dowry Allegation Defense",
      priority: "Medium",
    });
  }

  return items.slice(0, 5);
}

/** Build a downloadable Markdown strategy report. */
export function buildReportMarkdown(data: DashboardData): string {
  const { input, topMatch, analytics } = data;
  const lines: string[] = [];

  lines.push("# ULIS - Intelligence Brief");
  lines.push("");
  lines.push(
    "> This report provides legal research support and informational insights only. It does not replace professional legal advice. Please consult a qualified lawyer before taking legal action.",
  );
  lines.push("");
  lines.push("## Case Summary");
  lines.push(data.summary);
  lines.push("");
  lines.push(`- **Role:** ${input.role}`);
  lines.push(`- **Jurisdiction:** ${input.state}`);
  lines.push(`- **Goal:** ${input.desiredOutcome}`);
  lines.push("");

  lines.push("## Relevant Legal Sections");
  for (const s of data.sections) lines.push(`- **${s.section}** - ${s.description}`);
  lines.push("");

  lines.push("## Top Match");
  lines.push(
    `**${topMatch.case.title}** (${topMatch.case.court}, ${topMatch.case.year}) - ${topMatch.relevance.similarity_score}% match - Outcome: ${topMatch.case.outcome}`,
  );
  for (const r of topMatch.relevance.why_relevant) lines.push(`- ${r}`);
  lines.push("");

  lines.push("## Similar Cases");
  for (const s of data.scored) {
    lines.push(
      `- ${s.case.title} - ${s.relevance.similarity_score}% - ${s.case.outcome}`,
    );
  }
  lines.push("");

  lines.push("## Winning Clues");
  for (const c of data.clues) {
    lines.push(`- **${c.clue}** (${c.confidence} confidence)`);
    lines.push(`  - Evidence needed: ${c.evidenceNeeded.join(", ")}`);
    lines.push(`  - Risk if ignored: ${c.riskIfIgnored}`);
  }
  lines.push("");

  lines.push("## Evidence Checklist");
  for (const e of data.evidence) {
    lines.push(
      `- [${e.available ? "x" : " "}] ${e.item} (${e.priority})`,
    );
  }
  lines.push("");

  lines.push("## Risk Checklist");
  for (const r of data.risks) lines.push(`- **${r.severity}:** ${r.risk}`);
  lines.push("");

  lines.push("## Preparation Gaps / White Space");
  for (const w of data.whiteSpace) {
    lines.push(`- **${w.gap}** (${w.priority})`);
    lines.push(`  - Why: ${w.why}`);
    lines.push(`  - Collect: ${w.collect}`);
  }
  lines.push("");

  lines.push("## Pattern Highlights");
  for (const h of analytics.highlights) lines.push(`- ${h}`);
  lines.push("");

  lines.push("## Next Steps");
  lines.push("1. Collect the missing high-priority evidence listed above.");
  lines.push("2. Write a clear, dated timeline of incidents.");
  lines.push("3. Review these precedents and gaps with a qualified lawyer.");
  lines.push("");
  lines.push("---");
  lines.push("_Generated by ULIS - Structured Legal Intelligence Engine (prototype). PII masked; session-only data._");

  return lines.join("\n");
}

/** Build a plain-text summary suitable for read-aloud / report. */
export function buildSpokenSummary(data: DashboardData): string {
  const parts: string[] = [data.summary];
  const top = data.topMatch;
  parts.push(
    `Your closest match is ${top.case.title} from ${top.case.court}, with a relevance of ${top.relevance.similarity_score} percent, where the outcome was ${top.case.outcome}.`,
  );
  if (data.clues[0]) {
    parts.push(`A key winning clue: ${data.clues[0].clue}.`);
  }
  const missing = data.evidence.filter((e) => !e.available);
  if (missing.length > 0) {
    parts.push(
      `You may still need: ${missing.map((m) => m.item).slice(0, 3).join(", ")}.`,
    );
  }
  parts.push(
    "Remember, this is research support only. Please review with a qualified lawyer before taking action.",
  );
  return parts.join(" ");
}

/** Turn raw user input into everything the Results dashboard needs. */
export function buildDashboard(input: UserCaseInput): DashboardData {
  const signals = deriveSignals(input);
  const scored = findSimilarCases(input);
  const top = scored.slice(0, 4);
  const evidence = buildEvidenceChecklist(input, top);

  return {
    input,
    signals,
    summary: buildSummary(input, signals, scored),
    sections: buildSections(top),
    scored,
    topMatch: scored[0],
    clues: buildClues(scored.slice(0, 3)),
    evidence,
    risks: buildRisks(top),
    analytics: buildAnalytics(scored),
    whiteSpace: buildWhiteSpace(input, evidence, scored),
  };
}
