import type { MaskResult, PiiMatch, PiiType } from "@/lib/types";

const REL_WORDS = [
  "husband",
  "wife",
  "son",
  "daughter",
  "brother",
  "sister",
  "mother-in-law",
  "father-in-law",
  "brother-in-law",
  "sister-in-law",
  "mother",
  "father",
  "in-laws",
  "in-law",
  "spouse",
  "uncle",
  "aunt",
  "cousin",
];

// Build a case-insensitive-first-letter alternation WITHOUT the /i flag,
// so the captured name must stay capitalized.
const REL_ALT = REL_WORDS.map((w) =>
  w.replace(/^([a-z])/, (c) => `[${c.toUpperCase()}${c}]`),
).join("|");

type Detector = {
  type: PiiType;
  regex: RegExp;
  /** Returns the exact PII substring to mask from a match (default: whole match). */
  pick?: (m: RegExpMatchArray) => string;
};

// Order matters: longer/structured numbers are masked before generic ones.
const DETECTORS: Detector[] = [
  {
    type: "EMAIL",
    regex: /\b[\w.+-]+@[\w-]+\.[\w.-]+\b/g,
  },
  {
    type: "AADHAAR",
    regex: /(?<!\d)\d{4}\s?\d{4}\s?\d{4}(?!\d)/g,
  },
  {
    type: "PAN",
    regex: /\b[A-Z]{5}\d{4}[A-Z]\b/g,
  },
  {
    type: "PHONE",
    regex: /(?<!\d)(?:\+?91[\s-]?)?[6-9]\d{9}(?!\d)/g,
  },
  {
    type: "ACCOUNT",
    regex: /(?<!\d)\d{9,18}(?!\d)/g,
  },
  {
    type: "PERSON",
    regex: new RegExp(
      `\\b(${REL_ALT})\\s+([A-Z][a-zA-Z]+(?:\\s+[A-Z][a-zA-Z]+){0,2})`,
      "g",
    ),
    pick: (m) => m[2],
  },
  {
    type: "ADDRESS",
    regex:
      /\b\d{1,4}[,\s]+(?:[A-Z][a-zA-Z]*\.?\s+){0,4}(?:Road|Street|St\.?|Nagar|Marg|Colony|Lane|Sector|Block|Avenue|Chowk|Gali|Apartments?|Society|Vihar|Puri|Bagh|Enclave)\b(?:,?\s+[A-Z][a-zA-Z]+)?/g,
  },
];

/**
 * Mask PII in free text. Repeated values reuse the same token, e.g. two
 * mentions of the same name both become [PERSON_1].
 */
export function maskPii(input: string): MaskResult {
  let masked = input;
  const matches: PiiMatch[] = [];
  const counters: Partial<Record<PiiType, number>> = {};
  const tokenMap = new Map<string, string>();

  function tokenFor(type: PiiType, original: string): string {
    const key = `${type}|${original.toLowerCase()}`;
    const existing = tokenMap.get(key);
    if (existing) return existing;
    counters[type] = (counters[type] ?? 0) + 1;
    const token = `[${type}_${counters[type]}]`;
    tokenMap.set(key, token);
    matches.push({ type, original, token });
    return token;
  }

  for (const detector of DETECTORS) {
    masked = masked.replace(detector.regex, (...args) => {
      // args = [fullMatch, ...groups, offset, string]
      const groups = args.slice(0, -2) as string[];
      const full = groups[0];
      const pii = detector.pick
        ? detector.pick(groups as unknown as RegExpMatchArray)
        : full;
      if (!pii) return full;
      const token = tokenFor(detector.type, pii);
      return full.replace(pii, token);
    });
  }

  return { original: input, masked, matches };
}

const TYPE_LABEL: Record<PiiType, string> = {
  PERSON: "name",
  PHONE: "phone number",
  EMAIL: "email",
  ADDRESS: "address",
  AADHAAR: "Aadhaar number",
  PAN: "PAN",
  ACCOUNT: "account number",
};

/** Summarize matches as badge strings, e.g. "2 names masked". */
export function summarizeMatches(matches: PiiMatch[]): string[] {
  const counts: Partial<Record<PiiType, number>> = {};
  for (const m of matches) counts[m.type] = (counts[m.type] ?? 0) + 1;
  return Object.entries(counts).map(([type, n]) => {
    const label = TYPE_LABEL[type as PiiType];
    const plural = n > 1 ? (label.endsWith("s") ? label : `${label}s`) : label;
    return `${n} ${plural} masked`;
  });
}
