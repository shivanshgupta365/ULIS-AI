# ULIS AI

ULIS AI is a Structured Legal Intelligence Engine for legal awareness, research preparation, and privacy-aware case analysis. It helps users describe a legal situation, compare it with a structured case corpus, understand relevant law sections, identify evidence gaps, and generate a simple preparation brief with MultiLingual Voice and Text Support .

This repository is a demo/prototype. It is designed for people who need the law explained clearly, including non-technical users, families, legal aid groups, researchers, and legal teams.

> Disclaimer: ULIS AI provides structured legal research support and legal-awareness summaries only. It is not legal advice and does not replace a qualified lawyer, court, legal aid clinic, or independent legal judgment.

## What ULIS AI Does

- **Research intake:** users can describe a situation in plain language, use voice input, choose a role and jurisdiction, and start from saved legal examples.
- **Privacy masking:** personally identifiable information is masked before downstream analysis in the demo flow.
- **Similarity ranking:** a relevance engine compares user facts, legal sections, evidence signals, issue category, outcome goals, and jurisdiction against stored cases.
- **Intel Board:** the results view shows summaries, relevant law sections, top matches, similar cases, winning clues, evidence checklists, risks, analytics, and preparation gaps.
- **Law Map:** an interactive graph connects the user's issue to similar cases, law sections, evidence, and outcomes.
- **Law Library:** a simple corpus view explains the stored legal examples and how documents become useful legal-awareness patterns.
- **Brief:** a generated legal preparation brief can be reviewed and printed.
- **Voice:** multi lingual voice setup for people living in india across different states with their own regional languages . 

The current bundled corpus focuses on representative Indian dowry-related matters, including Section 498A IPC, the Dowry Prohibition Act, domestic violence, stridhan return, false allegation defense, settlement, and evidence readiness.

## Product Flow

1. Open the Research screen and describe the situation in simple words.
2. Select user role, jurisdiction, desired outcome, and available evidence.
3. ULIS masks personal identifiers and builds structured signals.
4. The Intel Board ranks similar cases and explains why they matter.
5. The Law Map shows how facts, sections, proof, and outcomes connect.
6. The Brief turns the analysis into a preparation-oriented report.

## Architecture

ULIS AI is built with Next.js App Router and a fully local demo intelligence layer.

```text
src/
  app/
    page.tsx          Product landing page
    analyze/          Research intake and saved examples
    privacy/          PII review and masking step
    results/          Intel Board with ranked analysis
    graph/            Interactive Law Map
    ingestion/        Law Library and corpus pipeline view
    report/           Preparation brief
  components/
    analyze/          Voice input and analysis loading flow
    charts/           Lightweight analytics charts
    law/              Law Map / Law Library shared navigation
    layout/           Navbar, footer, page shell
    results/          Intel Board sections
    ui/               Reusable button, badge, card, select, progress primitives
  data/
    cases.ts          Structured hardcoded legal cases used by the app
  lib/
    analysis.ts       Dashboard, checklist, analytics, and brief generation
    graph.ts          React Flow graph node and edge generation
    pii.ts            Demo PII masking logic
    relevance.ts      Signal extraction and similarity scoring
    session.ts        Browser session persistence helpers
    types.ts          Domain types
```

Additional corpus material lives under `data/` as markdown and JSON records used to document the demo cases.

## Key Data Flow

```text
User input
  -> PII masking
  -> signal extraction
  -> case relevance scoring
  -> dashboard model
  -> graph model
  -> legal-awareness brief
  -> multi-lingual voice setup 
```

The app is intentionally session-scoped. The demo stores user input in browser session storage and does not persist sensitive facts to a backend service.

## Relevance Model

The local relevance engine scores cases across six explainable factors:

- fact and keyword match
- legal section match
- evidence concept overlap
- issue category match
- desired outcome pattern
- jurisdiction alignment

The goal is not to predict outcomes. The goal is to show why a stored legal example may be useful for awareness, preparation, and lawyer consultation.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- React Flow via `@xyflow/react`
- Framer Motion
- Lucide React icons

## Local Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # Start local development server
npm run build    # Build production output
npm run start    # Start production server after build
npm run lint     # Run ESLint
```

## Verification

The public release was prepared with:

```bash
npm run lint
npm run build
```

Recommended route smoke checks:

```bash
curl -I http://localhost:3000/
curl -I http://localhost:3000/analyze
curl -I http://localhost:3000/results
curl -I http://localhost:3000/graph
curl -I http://localhost:3000/ingestion
curl -I http://localhost:3000/report
```

## Deployment Notes

ULIS AI is a static-friendly prototype and can be deployed to any platform that supports Next.js. Before using it with real users, replace the local demo corpus and browser-session handling with an audited backend, consent flows, access controls, retention policies, and jurisdiction-specific legal review.

## License

Apache License 2.0. See [LICENSE](LICENSE).

## Safety Notes

- Do not use this prototype as a substitute for professional legal advice.
- Do not upload sensitive or real personal data without a proper privacy and security review.
- Do not use the app to fabricate evidence, mislead courts, or harass any person.
- Verify every legal section, authority, and procedural step with a qualified professional.
