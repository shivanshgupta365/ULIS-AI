// ---- Domain types for ULIS ----

export type CaseCategory =
  | "Dowry Demand"
  | "Mental Cruelty"
  | "Physical Harassment"
  | "Dowry Death"
  | "False Allegation Defense"
  | "Stridhan Return"
  | "Domestic Violence"
  | "Settlement";

export type CaseOutcome =
  | "Relief Granted"
  | "Complaint Dismissed"
  | "Settlement"
  | "Bail Granted"
  | "Conviction"
  | "Acquittal";

export type UserRole =
  | "Complainant"
  | "Accused"
  | "Family Member"
  | "Lawyer"
  | "Researcher";

export type DesiredOutcome =
  | "Understand case"
  | "Prepare evidence"
  | "Find similar cases"
  | "Prepare for lawyer consultation"
  | "Explore settlement";

/** A single indexed past judgment. */
export type LegalCase = {
  id: string;
  title: string;
  court: string;
  year: string;
  sections: string[];
  category: CaseCategory;
  outcome: CaseOutcome;
  summary: string;
  winning_clues: string[];
  risk_factors: string[];
  evidence: string[];
  /** Free-form tags used by the matching engine. */
  keywords: string[];
};

/** Structured input collected from the user on the Analyze page. */
export type UserCaseInput = {
  description: string;
  state: string;
  role: UserRole;
  desiredOutcome: DesiredOutcome;
  /** Evidence the user says they already have. */
  evidenceAvailable: string[];
};

/** Per-factor relevance, each 0–100. */
export type RelevanceBreakdown = {
  fact_match: number;
  section_match: number;
  evidence_match: number;
  category_match: number;
  outcome_match: number;
  jurisdiction_match: number;
};

export type RelevanceResult = {
  case_id: string;
  similarity_score: number; // 0–100
  relevance_breakdown: RelevanceBreakdown;
  why_relevant: string[];
};

/** A case paired with its computed relevance to the user input. */
export type ScoredCase = {
  case: LegalCase;
  relevance: RelevanceResult;
};

/** Signals derived from raw user input, used by the relevance engine. */
export type DerivedSignals = {
  keywords: string[];
  sections: string[];
  category: CaseCategory | null;
  evidence: string[];
  outcome: CaseOutcome | null;
  state: string;
};

// ---- Dashboard (Results) types ----

export type SectionInfo = {
  section: string;
  description: string;
};

export type Clue = {
  clue: string;
  supportingCase: string;
  evidenceNeeded: string[];
  section: string;
  riskIfIgnored: string;
  confidence: "High" | "Medium" | "Low";
};

export type EvidenceItem = {
  item: string;
  available: boolean;
  priority: "High priority" | "Important";
};

export type RiskItem = {
  risk: string;
  source: string;
  severity: "High" | "Medium";
};

export type ChartDatum = {
  label: string;
  value: number;
};

export type FactorRow = {
  factor: string;
  count: number;
  impact: "High" | "Medium";
};

export type Analytics = {
  totalCases: number;
  outcomes: ChartDatum[];
  evidenceImpact: ChartDatum[];
  sections: ChartDatum[];
  categories: ChartDatum[];
  winningFactors: FactorRow[];
  riskFactors: FactorRow[];
  highlights: string[];
};

export type WhiteSpaceItem = {
  gap: string;
  why: string;
  collect: string;
  relatedCase: string;
  priority: "High" | "Medium";
};

export type DashboardData = {
  input: UserCaseInput;
  signals: DerivedSignals;
  summary: string;
  sections: SectionInfo[];
  scored: ScoredCase[];
  topMatch: ScoredCase;
  clues: Clue[];
  evidence: EvidenceItem[];
  risks: RiskItem[];
  analytics: Analytics;
  whiteSpace: WhiteSpaceItem[];
};

// ---- PII masking types ----

export type PiiType =
  | "PERSON"
  | "PHONE"
  | "EMAIL"
  | "ADDRESS"
  | "AADHAAR"
  | "PAN"
  | "ACCOUNT";

export type PiiMatch = {
  type: PiiType;
  original: string;
  /** Replacement token, e.g. [PERSON_1]. */
  token: string;
};

export type MaskResult = {
  original: string;
  masked: string;
  matches: PiiMatch[];
};
