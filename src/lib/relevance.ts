import { CASES } from "@/data/cases";
import type {
  CaseCategory,
  CaseOutcome,
  DerivedSignals,
  LegalCase,
  RelevanceBreakdown,
  ScoredCase,
  UserCaseInput,
} from "@/lib/types";

const clamp = (n: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, n));
const round = (n: number) => Math.round(n);

// ---- Detectors over user text ----

const SECTION_PATTERNS: { pattern: RegExp; section: string }[] = [
  { pattern: /\b498\s?-?a\b/i, section: "498A IPC" },
  { pattern: /\b304\s?-?b\b/i, section: "304B IPC" },
  { pattern: /\b406\b/i, section: "406 IPC" },
  { pattern: /\b323\b/i, section: "323 IPC" },
  { pattern: /\b482\b/i, section: "482 CrPC" },
  { pattern: /dowry prohibition/i, section: "Dowry Prohibition Act" },
  {
    pattern: /domestic violence|dv act|pwdva/i,
    section: "Protection of Women from Domestic Violence Act",
  },
];

function detectSections(text: string): string[] {
  return SECTION_PATTERNS.filter((s) => s.pattern.test(text)).map(
    (s) => s.section,
  );
}

/** Map any evidence label (case or user) to a normalized concept. */
export function evidenceConcept(label: string): string | null {
  const s = label.toLowerCase();
  if (s.includes("whatsapp") || s.includes("message") || s.includes("chat"))
    return "messages";
  if (s.includes("sms")) return "sms";
  if (s.includes("email")) return "email";
  if (s.includes("call")) return "call";
  if (s.includes("bank") || s.includes("transfer") || s.includes("transaction"))
    return "bank";
  if (s.includes("bill") || s.includes("jewel") || s.includes("gift"))
    return "bills";
  if (s.includes("photo") || s.includes("picture")) return "photos";
  if (s.includes("witness")) return "witness";
  if (
    s.includes("medical") ||
    s.includes("hospital") ||
    s.includes("injury") ||
    s.includes("doctor")
  )
    return "medical";
  if (s.includes("police") || s.includes("fir") || s.includes("complaint"))
    return "police";
  if (s.includes("notice")) return "notice";
  if (s.includes("timeline") || s.includes("dates")) return "timeline";
  return null;
}

function detectEvidenceConcepts(text: string, available: string[]): Set<string> {
  const concepts = new Set<string>();
  for (const e of available) {
    const c = evidenceConcept(e);
    if (c) concepts.add(c);
  }
  // also infer from free text
  const TEXT_EVIDENCE = [
    "whatsapp",
    "message",
    "chat",
    "sms",
    "email",
    "call",
    "bank",
    "transfer",
    "bill",
    "jewel",
    "gift",
    "photo",
    "witness",
    "medical",
    "hospital",
    "injury",
    "police",
    "fir",
    "notice",
  ];
  for (const word of TEXT_EVIDENCE) {
    if (text.includes(word)) {
      const c = evidenceConcept(word);
      if (c) concepts.add(c);
    }
  }
  return concepts;
}

function inferCategory(text: string): CaseCategory | null {
  if (/false|falsely accused|vague|omnibus|wrongly/.test(text))
    return "False Allegation Defense";
  if (/stridhan|jewel|jewell|gold|ornament|return/.test(text))
    return "Stridhan Return";
  if (/settle|mediation|compromise|mutual/.test(text)) return "Settlement";
  if (/death|died|suicide|dead/.test(text)) return "Dowry Death";
  if (/beat|hit|assault|physical|slap/.test(text))
    return "Physical Harassment";
  if (/domestic violence|dv act/.test(text)) return "Domestic Violence";
  // Dowry demand (money/cash/lakh) is the primary signal when present,
  // even if threats/harassment co-occur.
  if (/dowry|demand|money|cash|lakh|rupees/.test(text)) return "Dowry Demand";
  if (/mental|emotional|taunt|threat|abuse|harass|violence/.test(text))
    return "Mental Cruelty";
  return null;
}

/** Extract structured signals from raw user input. */
export function deriveSignals(input: UserCaseInput): DerivedSignals {
  const text = input.description.toLowerCase();
  const evidenceConcepts = detectEvidenceConcepts(
    text,
    input.evidenceAvailable,
  );
  return {
    keywords: text.split(/\W+/).filter((w) => w.length > 2),
    sections: detectSections(text),
    category: inferCategory(text),
    evidence: [...evidenceConcepts],
    outcome: null,
    state: input.state,
  };
}

// ---- Per-factor scoring ----

function expectedOutcomes(input: UserCaseInput): CaseOutcome[] {
  const out = new Set<CaseOutcome>();
  if (input.role === "Accused" || input.role === "Family Member") {
    out.add("Complaint Dismissed");
    out.add("Acquittal");
    out.add("Bail Granted");
  }
  if (input.role === "Complainant") {
    out.add("Relief Granted");
    out.add("Conviction");
  }
  if (input.desiredOutcome === "Explore settlement") out.add("Settlement");
  return [...out];
}

function scoreCase(
  legalCase: LegalCase,
  input: UserCaseInput,
  signals: DerivedSignals,
): { breakdown: RelevanceBreakdown; why: string[] } {
  const text = input.description.toLowerCase();
  const why: string[] = [];

  // Fact / keyword similarity
  const matchedKw = legalCase.keywords.filter((k) => text.includes(k));
  const fact_match = clamp(
    round((matchedKw.length / legalCase.keywords.length) * 180),
  );
  if (matchedKw.length >= 2) {
    why.push(
      `Similar facts: ${matchedKw.slice(0, 3).join(", ")}`,
    );
  }

  // Legal section match
  const matchedSections = legalCase.sections.filter((s) =>
    signals.sections.includes(s),
  );
  let section_match: number;
  if (signals.sections.length > 0) {
    section_match = clamp(
      round((matchedSections.length / legalCase.sections.length) * 100),
    );
    if (matchedSections.length > 0)
      why.push(`Shared legal section(s): ${matchedSections.join(", ")}`);
  } else {
    // No explicit sections mentioned - proxy from category alignment.
    section_match = signals.category === legalCase.category ? 70 : 40;
  }

  // Evidence match (concept overlap)
  const caseConcepts = legalCase.evidence
    .map(evidenceConcept)
    .filter((c): c is string => c !== null);
  const userConcepts = new Set(signals.evidence);
  const sharedConcepts = caseConcepts.filter((c) => userConcepts.has(c));
  const evidence_match =
    caseConcepts.length === 0
      ? 50
      : clamp(round((sharedConcepts.length / caseConcepts.length) * 100));
  if (sharedConcepts.length > 0)
    why.push(`Similar evidence available in this case`);

  // Category match
  let category_match: number;
  if (signals.category === null) category_match = 50;
  else if (signals.category === legalCase.category) {
    category_match = 100;
    why.push(`Same issue type: ${legalCase.category}`);
  } else category_match = 40;

  // Outcome pattern match
  const expected = expectedOutcomes(input);
  const outcome_match =
    expected.length === 0 ? 60 : expected.includes(legalCase.outcome) ? 100 : 40;

  // Jurisdiction match
  const state = signals.state.trim().toLowerCase();
  const jurisdiction_match = !state
    ? 50
    : legalCase.court.toLowerCase().includes(state)
      ? 100
      : 40;

  return {
    breakdown: {
      fact_match,
      section_match,
      evidence_match,
      category_match,
      outcome_match,
      jurisdiction_match,
    },
    why,
  };
}

const WEIGHTS = {
  fact_match: 0.3,
  section_match: 0.2,
  evidence_match: 0.2,
  category_match: 0.15,
  outcome_match: 0.1,
  jurisdiction_match: 0.05,
} as const;

function weightedScore(b: RelevanceBreakdown): number {
  return round(
    b.fact_match * WEIGHTS.fact_match +
      b.section_match * WEIGHTS.section_match +
      b.evidence_match * WEIGHTS.evidence_match +
      b.category_match * WEIGHTS.category_match +
      b.outcome_match * WEIGHTS.outcome_match +
      b.jurisdiction_match * WEIGHTS.jurisdiction_match,
  );
}

/** Rank all cases by relevance to the user input (highest first). */
export function findSimilarCases(input: UserCaseInput): ScoredCase[] {
  const signals = deriveSignals(input);
  return CASES.map((legalCase) => {
    const { breakdown, why } = scoreCase(legalCase, input, signals);
    return {
      case: legalCase,
      relevance: {
        case_id: legalCase.id,
        similarity_score: weightedScore(breakdown),
        relevance_breakdown: breakdown,
        why_relevant: why.length
          ? why
          : ["Related dowry-dispute precedent in the same domain"],
      },
    } satisfies ScoredCase;
  }).sort((a, b) => b.relevance.similarity_score - a.relevance.similarity_score);
}

/** A realistic default input used for demos and tests. */
export const SAMPLE_INPUT: UserCaseInput = {
  description:
    "My husband and in-laws are demanding 5 lakh from my parents. They threaten me regularly and send WhatsApp messages asking for money. I have witnesses.",
  state: "Delhi",
  role: "Complainant",
  desiredOutcome: "Understand case",
  evidenceAvailable: ["WhatsApp messages", "Witness statements"],
};
