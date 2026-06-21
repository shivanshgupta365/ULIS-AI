import type { DesiredOutcome, UserRole } from "@/lib/types";

export const PROMPT_CHIPS = [
  "Find authorities on breach of contract and damages.",
  "Summarize recent litigation updates for this matter.",
  "Scan a clause for indemnity and termination risk.",
  "Compare these facts against similar case outcomes.",
  "Identify statutes, regulations, and evidence gaps.",
];

export const ROLES: UserRole[] = [
  "Complainant",
  "Accused",
  "Family Member",
  "Lawyer",
  "Researcher",
];

export const DESIRED_OUTCOMES: DesiredOutcome[] = [
  "Understand case",
  "Prepare evidence",
  "Find similar cases",
  "Prepare for lawyer consultation",
  "Explore settlement",
];

export const STATES = [
  "Delhi",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Uttar Pradesh",
  "Punjab",
  "Haryana",
  "Rajasthan",
  "Gujarat",
  "West Bengal",
  "Madhya Pradesh",
  "Bihar",
  "Telangana",
  "Kerala",
  "Other / Not sure",
];

export const EVIDENCE_OPTIONS = [
  "Contract clauses",
  "Court filings",
  "Statutory extracts",
  "Regulatory notices",
  "Board minutes",
  "WhatsApp messages",
  "SMS",
  "Emails",
  "Call recordings",
  "Bank transfers",
  "Gift/jewelry bills",
  "Marriage photos",
  "Witness statements",
  "Medical records",
  "Police complaint copy",
  "Legal notice",
  "Timeline of incidents",
];

/** Loading step shown while masking PII (Analyze → Privacy). */
export const MASK_STEPS = ["Masking personal information"];

/** Loading steps shown after privacy confirmation (Privacy → Results). */
export const ANALYSIS_STEPS = [
  "Parsing legal intent",
  "Retrieving authorities",
  "Ranking relevance",
  "Extracting legal signals",
  "Finding risk gaps",
  "Building intelligence brief",
];

/** Voice mock fallback used when the browser has no Speech Recognition. */
export const VOICE_MOCK_TEXT =
  "We need to assess a contract termination dispute, compare similar judgments, identify evidence gaps, and summarize the strongest authorities for counsel review.";
