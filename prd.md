ULIS — Ultimate Legal Intelligence System
Demo / Prototype PRD for Claude Code
1. Product Overview
ULIS — Ultimate Legal Intelligence System is an AI-powered legal intelligence prototype focused on dowry-related legal disputes in India.

The product helps users describe their legal situation, compare it with similar past judgments, understand relevant legal sections, discover important evidence clues, and generate a simple legal preparation report.

ULIS is not a lawyer replacement. It is a legal research and preparation assistant.

2. One-Line Pitch
ULIS is like Cursor for legal intelligence — it helps users find useful clues from past legal cases and prepare stronger legal strategies faster.

3. Core Demo Focus
For the hackathon/demo, ULIS should focus on one strong domain:

Dowry Harassment & Dowry-Related Cases
This includes:

Dowry demand

Mental harassment

Physical cruelty

Section 498A IPC

Dowry Prohibition Act

Domestic violence linked to dowry

Stridhan/jewelry return

False allegation defense

Family members wrongly included

Settlement and mediation patterns

The demo should show:

User problem
→ AI understands issue
→ Similar past cases found
→ Relevance explained
→ Winning/losing clues extracted
→ Evidence checklist generated
→ Comparative analytics shown
→ PII masked
→ Legal strategy report created
4. Problem Statement
People involved in dowry-related legal disputes often do not know:

Whether their situation is legally serious

Which legal sections may apply

What similar past cases say

What evidence courts considered important

What arguments worked or failed

What risks exist in their case

What documents they should collect

How to prepare before meeting a lawyer

Legal judgments are long, technical, and difficult for normal users to understand.

Lawyers and legal teams also spend time manually searching through past cases.

5. Target Users
5.1 D2C Users
Individuals directly facing dowry-related disputes.

Examples:

A woman facing repeated dowry demands

A woman whose jewelry/stridhan is not returned

A man accused in a dowry case

Parents or relatives named in a case

A couple exploring settlement or mediation

5.2 B2B Users
Professional legal users.

Examples:

Lawyers

Law firms

Legal aid organizations

NGOs

Corporate legal teams

Legal researchers

Academic institutions

6. Product Goals
Primary Goal
Help users understand their legal situation by comparing it with similar past judgments.

Secondary Goals
Reduce confusion for non-lawyers

Help lawyers prepare faster

Improve evidence readiness

Show similar case patterns

Provide legal research in simple language

Protect user privacy through PII masking

Demonstrate graph-based legal intelligence

7. Non-Goals
ULIS should not:

Claim to guarantee case victory

Replace a qualified lawyer

Generate fake legal citations

Encourage misuse of law

Help users fabricate evidence

Provide final legal advice

Store sensitive personal data without user consent

8. Main User Journey
Example User: Priya
Priya enters:

My husband and in-laws are demanding ₹5 lakh from my parents. They threaten me regularly and send WhatsApp messages asking for money.

ULIS should:

Detect issue: Dowry demand + mental harassment

Identify legal areas: 498A IPC, Dowry Prohibition Act, Domestic Violence Act

Find similar cases

Explain relevance

Extract evidence clues

Show risk points

Compare similar case outcomes

Mask personal details

Generate a preparation report

9. Core Features
Feature 1: Case Description Input
Purpose
Allow user to explain their situation in simple English or Hinglish.

Inputs
Case description

State / jurisdiction

User role:

Complainant

Accused

Family member

Lawyer

Researcher

Desired outcome:

Understand case

Prepare evidence

Find similar cases

Prepare for lawyer consultation

Explore settlement

Optional evidence upload

UI Requirements
Large textarea

Example prompt chips

Case category selector

Voice input button

Privacy notice below input

Example Prompt Chips
“My in-laws are demanding money repeatedly.”

“My jewelry has not been returned.”

“I have been falsely accused in a dowry case.”

“My parents have also been named in the complaint.”

“I want to know what evidence is needed.”

Feature 2: Voice Input
Purpose
Many users may not be comfortable typing legal issues. Voice input makes ULIS easier for normal users.

MVP Version
Use browser speech recognition or mock voice input.

Voice Features
Speak My Case

User speaks their issue

System converts speech to text

User can edit before analysis

Voice Summary

ULIS reads the final report aloud

Useful for accessibility and non-technical users

Voice Prompt Suggestions

“Tell us what happened”

“Who is involved?”

“What evidence do you have?”

“What outcome do you want?”

Demo Acceptance Criteria
A microphone button is visible

Clicking it shows “Listening…”

Spoken/demo text appears in textarea

Final report has “Read aloud” button

Feature 3: Similar Case Finder
Purpose
Find similar past dowry-related cases from local indexed data.

MVP Dataset
Use 7–8 representative markdown cases stored locally.

/data
  /cases
    case_001.md
    case_002.md
    case_003.md
    case_004.md
    case_005.md
    case_006.md
    case_007.md
    case_008.md
  metadata.json
Matching Logic for Prototype
Use simple scoring:

Keyword match

Case category match

Legal section match

Evidence type match

Outcome pattern match

Vector similarity if available

Output
Each similar case card should show:

Case title

Court

Year

Legal sections

Similarity score

Relevance reason

Outcome

Key evidence

View details button

Feature 4: Relevance Engine
Purpose
Users should not only see similar cases. They should understand why those cases are relevant.

Relevance Factors
ULIS should calculate and display relevance based on:

Factor	Meaning
Fact similarity	How similar the user’s situation is
Legal section match	Same law/section involved
Evidence match	Similar evidence used
Outcome similarity	Similar result pattern
Court/jurisdiction match	Same or related court
Issue match	Same legal issue category
Timeline match	Similar sequence of events
UI Output
Show a Relevance Breakdown Card.

Example:

Relevance Score: 87%

Why this case is relevant:
- Similar repeated dowry demand pattern
- WhatsApp messages were used as evidence
- Mental harassment was considered by the court
- Section 498A IPC was discussed
Visual Design
Use progress bars or score chips:

Fact Match: 90%

Evidence Match: 80%

Law Match: 95%

Outcome Match: 70%

Feature 5: Winning Clue Extraction
Purpose
Extract useful legal clues from similar cases.

Output Cards
Each clue should include:

Winning clue

Supporting case

Evidence needed

Relevant section

Risk if ignored

Confidence level

Example
Winning Clue:
Repeated written demands for money strengthened the complainant’s case.

Evidence Needed:
WhatsApp messages, call logs, witness statements, bank transfer requests.

Risk:
If no written or witness-backed proof exists, the claim may become harder to prove.
Feature 6: Evidence Checklist
Purpose
Help users understand what evidence they may need.

Evidence Categories
WhatsApp messages

SMS

Emails

Call recordings

Bank transfers

Gift/jewelry bills

Marriage photos

Witness statements

Medical records

Police complaint copy

Legal notice

Timeline of incidents

UI
Use checklist cards with status:

Available

Missing

Important

High priority

Feature 7: Comparative Analytics
Purpose
Show patterns across similar past cases.

This is one of the strongest demo sections.

Analytics to Show
Outcome Pattern

Relief granted

Complaint dismissed

Settlement

Bail granted

Conviction

Acquittal

Evidence Impact

Cases with WhatsApp evidence

Cases with witness support

Cases with bank records

Cases with weak evidence

Common Legal Sections

498A IPC

Dowry Prohibition Act

Domestic Violence Act

304B IPC

406 IPC for stridhan

Argument Success Pattern

Specific allegations worked better

General allegations were weaker

Documentary evidence improved case strength

Delay in complaint affected credibility in some cases

Case Type Comparison

Dowry demand

Stridhan return

Mental cruelty

False allegation defense

Settlement cases

UI Components
Bar charts

Donut charts

Comparative score cards

“Most common winning factors” table

“Most common risk factors” table

Example Output
Across 8 similar cases:

- 5 cases involved WhatsApp or written evidence
- 4 cases discussed Section 498A IPC
- 3 cases had stridhan-related claims
- 2 cases weakened due to vague allegations
- 3 cases ended in settlement or mediation
Feature 8: White Space Insights
Meaning
White Space means gaps or missing areas in the user’s case preparation.

ULIS should identify what is missing compared to stronger past cases.

Examples
If similar successful cases had written evidence, but the user has not uploaded any messages:

White Space Found:
You have not added written proof of dowry demand.

Why it matters:
In similar cases, WhatsApp messages and written demands helped establish the claim.
White Space Categories
Missing evidence

Missing timeline

Missing witness support

Missing transaction proof

Missing medical/legal records

Missing jurisdiction clarity

Missing specific allegation details

Missing document upload

UI
Create a section called:

“Preparation Gaps / White Space”
Each card should show:

Gap found

Why it matters

What to collect

Related similar case

Priority level

Feature 9: PII / Personal Information Masking
Purpose
Legal data is sensitive. The prototype must show privacy thinking.

PII to Mask
Names

Phone numbers

Email addresses

Addresses

Aadhaar/PAN-like numbers

Bank account numbers

Exact workplace names

Family member names

Case party names in user input

MVP Behavior
Before showing analysis, ULIS should show a masked version of the user input.

Example original:

My husband Rahul Sharma and his mother Sunita Sharma are demanding ₹5 lakh. They live at 45 MG Road, Delhi. My number is 9876543210.
Masked:

My husband [PERSON_1] and his mother [PERSON_2] are demanding ₹5 lakh. They live at [ADDRESS_1]. My number is [PHONE_1].
UI Requirements
Show a privacy panel:

Original text hidden by default

Masked text visible

Toggle: “Show original”

Badge: “PII Protected”

Demo Acceptance Criteria
User enters text with name/phone/email

System masks it before analysis

Results use masked identities only

Feature 10: Data Privacy Layer
Purpose
Build trust with both D2C and B2B users.

Privacy Principles
Do not expose personal details in results

Do not store uploaded files permanently in demo

Mask PII before AI processing

Use local mock data for prototype

Show clear legal and privacy disclaimer

Allow user to delete session

Do not train on user data

UI Requirements
Add privacy badges:

“PII Masked”

“Local Demo Mode”

“Not Legal Advice”

“No Data Stored Permanently”

Footer Disclaimer
ULIS provides legal research support and informational insights only. It does not replace professional legal advice. Please consult a qualified lawyer before taking legal action.
Privacy Disclaimer
For this prototype, uploaded documents and entered case details are used only for demo analysis. Personal information is masked before processing.
10. Most Common Use Cases
Use Case 1: Woman Facing Dowry Demand
User says:

My in-laws are repeatedly demanding money from my parents.

ULIS helps with:

Similar dowry demand cases

Evidence checklist

Relevant sections

Case outcome patterns

Preparation gaps

Use Case 2: Mental Harassment Linked to Dowry
User says:

I am being threatened and emotionally abused because my parents refused to pay.

ULIS helps with:

Mental cruelty case comparison

Evidence required

Risk checklist

Similar judgments

Use Case 3: Stridhan / Jewelry Not Returned
User says:

My jewelry and gifts are with my husband’s family and they are not returning them.

ULIS helps with:

Stridhan return cases

Proof checklist

406 IPC relevance

Bills/photos/witness guidance

Use Case 4: False Dowry Allegation Defense
User says:

I have been falsely accused in a dowry harassment complaint.

ULIS helps with:

Similar defense cases

Evidence needed

Contradiction tracking

Family member risk analysis

General vs specific allegation comparison

Use Case 5: Family Members Included in Case
User says:

My parents and sister have also been named, but they were not involved.

ULIS helps with:

Cases where relatives were included

Specific allegation requirement

Risk and defense clues

Similar court reasoning

Use Case 6: Lawyer Preparing Case
User says:

I am preparing a dowry-related matter and need relevant precedents.

ULIS helps with:

Similar judgments

Legal sections

Arguments

Outcome pattern analytics

Exportable report

Use Case 7: Mediation / Settlement Preparation
User says:

We want to settle the dispute legally.

ULIS helps with:

Similar settlement patterns

Common terms

Risks

Preparation checklist

11. Creative UI/UX Direction
Visual Theme
The UI should feel:

Premium

Trustworthy

Modern

Legal-tech focused

AI-native

Calm but powerful

Design Style
Use the attached reference image style:

Deep blue gradient background

White typography

Glassmorphism cards

Soft glowing borders

Rounded components

Large hero text

Smooth animations

Clean whitespace

Professional legal icons

Mobile-first layout

UI Tone
Avoid fear-based language.

Use calm guidance:

“Understand your case”

“Find similar judgments”

“Prepare better”

“Protect privacy”

“Review with a lawyer”

Main UI Screens
Landing Page

Analyze My Case

Privacy Masking Preview

Results Dashboard

Similar Cases

Comparative Analytics

White Space / Preparation Gaps

Case Graph

Voice Summary

Strategy Report

Data Ingestion Demo

12. Website / Webapp Pages
Page 1: Landing Page
Hero
Headline:

Find Legal Clues From Similar Dowry Cases

Subheadline:

ULIS compares your situation with past judgments, explains relevance, highlights evidence gaps, and helps you prepare better with AI.

CTA:

Analyze My Case

View Demo

Hero Cards
Show animated cards:

Similar cases found

Evidence clues extracted

PII masked

Strategy report ready

Page 2: Analyze My Case
Components
Textarea

Voice input button

Case role selector

Jurisdiction selector

Desired outcome selector

Upload evidence button

Analyze button

Prompt chips

Loading Steps
After clicking analyze:

Masking personal information

Understanding legal issue

Finding similar judgments

Ranking relevance

Extracting legal clues

Finding preparation gaps

Building report

Page 3: Privacy Masking Preview
Components
Original input hidden

Masked input displayed

Detected PII badges

Continue to analysis button

Example badges:

2 names masked

1 phone number masked

1 address masked

Page 4: Results Dashboard
Sections
Case Summary

Relevant Legal Sections

Similar Cases

Relevance Breakdown

Winning Clues

Evidence Checklist

Risk Checklist

Comparative Analytics

White Space / Preparation Gaps

Next Steps

Download Report

Page 5: Case Graph
Graph Nodes
User issue

Similar cases

Evidence

Legal sections

Arguments

Outcomes

Courts

Graph Edges
Similar to

Uses section

Supports claim

Weakens claim

Led to outcome

Requires evidence

Page 6: Data Ingestion Demo
Purpose
Show that ULIS has a legal intelligence backend.

Pipeline
Indian Kanoon Search
→ Case Scraper
→ Markdown Storage
→ Metadata Extraction
→ PII Cleaning
→ Embedding Generation
→ Relevance Index
→ Graph Context
→ ULIS Results
UI Cards
Source fetched

Text extracted

Metadata generated

Embeddings created

Case graph built

Ready for search

13. Prototype Data
Create 8 local demo cases.

Case Dataset
Continuous dowry demand

Mental cruelty due to dowry

Physical harassment linked to dowry

Dowry death allegation

False dowry allegation defense

Stridhan/jewelry return

Domestic violence + dowry combination

Settlement and mediation case

Each case should include:

{
  "id": "case_001",
  "title": "Continuous Dowry Demand Case",
  "court": "Delhi High Court",
  "year": "2023",
  "sections": ["498A IPC", "Dowry Prohibition Act"],
  "category": "Dowry Demand",
  "outcome": "Relief Granted",
  "summary": "The court considered repeated monetary demands and written messages as relevant evidence.",
  "winning_clues": [
    "Written messages supported the claim",
    "Witness statements strengthened the timeline"
  ],
  "risk_factors": [
    "Lack of transaction proof",
    "Delayed complaint"
  ],
  "evidence": [
    "WhatsApp messages",
    "Witness statements",
    "Bank transfer requests"
  ]
}
14. Technical Architecture
Demo Architecture
Next.js Frontend
      ↓
Local JSON Dataset
      ↓
Mock Relevance Engine
      ↓
PII Masking Utility
      ↓
AI/Mock Case Analysis Layer
      ↓
Results Dashboard
      ↓
Graph + Report UI
Recommended Stack
Frontend
Next.js

TypeScript

Tailwind CSS

shadcn/ui

Framer Motion

Lucide React Icons

React Flow

Voice
Web Speech API for speech-to-text

Web Speech Synthesis API for text-to-speech

Fallback mock voice mode if browser support fails

Data
Local JSON metadata

Markdown case files

Optional local embeddings JSON

Search / Relevance
MVP:

Keyword scoring

Category matching

Section matching

Evidence overlap scoring

Optional:

Embedding similarity using API

Privacy
Regex-based PII masking

Entity masking utility

Session-only data

No persistent storage for user input in prototype

15. Relevance Scoring Logic
For prototype, calculate relevance score out of 100.

Example:

Total Score =
30% fact keyword similarity
20% legal section match
20% evidence match
15% case category match
10% outcome pattern match
5% jurisdiction/court match
Example Output
{
  "case_id": "case_001",
  "similarity_score": 87,
  "relevance_breakdown": {
    "fact_match": 90,
    "section_match": 95,
    "evidence_match": 80,
    "category_match": 85,
    "outcome_match": 70
  },
  "why_relevant": [
    "Both involve repeated monetary demands",
    "Both include threatening messages",
    "Section 498A IPC appears in similar cases"
  ]
}
16. PII Masking Logic
Regex Rules
Mask:

Indian phone numbers

Email addresses

Names after relationship words

Addresses

Aadhaar-like numbers

PAN-like numbers

Example Function Behavior
Input:

My husband Rahul Sharma and his mother Sunita live at 45 MG Road. His phone is 9876543210.
Output:

My husband [PERSON_1] and his mother [PERSON_2] live at [ADDRESS_1]. His phone is [PHONE_1].
17. Acceptance Criteria
Core Demo Must Work
Landing page looks premium

User can enter case description

Voice input button is visible and works/mock works

PII masking preview appears

Similar cases are displayed

Relevance score is shown

Relevance breakdown is shown

Winning clues are generated

Evidence checklist appears

Comparative analytics section appears

White space/preparation gaps appear

Case graph appears

Strategy report page appears

Data ingestion demo page appears

18. 24-Hour Build Plan
Hour 0–2: Project Setup
Create Next.js project

Add Tailwind

Add shadcn/ui

Add Framer Motion

Add React Flow

Add Lucide icons

Hour 2–5: UI Shell
Navbar

Landing page

Hero

Feature cards

Use-case cards

Footer

Hour 5–8: Analyze Flow
Case input page

Voice button

Prompt chips

Role selector

Analyze loading animation

Hour 8–11: Dataset + Matching
Create 8 local case JSON objects

Build relevance scoring utility

Build similar case result cards

Hour 11–14: Privacy Layer
Add PII masking utility

Add privacy preview screen

Add detected PII badges

Hour 14–17: Results Dashboard
Case summary

Similar cases

Relevance breakdown

Winning clues

Evidence checklist

Risk checklist

Hour 17–20: Advanced Demo Sections
Comparative analytics

White space gap cards

Case graph with React Flow

Voice summary

Hour 20–22: Data Ingestion Demo
Build scraper pipeline UI

Add mock indexed documents table

Add progress cards

Hour 22–24: Polish
Improve creative UI/UX

Add animations

Add legal disclaimer

Test demo flow

Prepare final walkthrough

19. Demo Script
Opening
“ULIS is an AI-powered legal intelligence system focused on helping people and legal teams understand dowry-related legal disputes.”

Problem
“Today, users do not know which past cases are similar, what evidence matters, or how strong their situation is. Judgments are long and difficult to understand.”

Demo
“I will enter a sample case where a woman is facing repeated dowry demands and threats.”

Show Flow
Enter case using text or voice

ULIS masks personal information

ULIS finds similar cases

ULIS explains relevance

ULIS extracts winning clues

ULIS shows comparative analytics

ULIS identifies white space gaps

ULIS generates a report

Closing
“ULIS does not replace lawyers. It helps users become informed, organized, and prepared before taking legal action.”

20. Claude Code Build Prompt
Build a polished Next.js prototype for ULIS — Ultimate Legal Intelligence System.

ULIS is an AI-powered legal intelligence platform focused on dowry-related legal disputes in India. It helps users describe their situation, masks personal information, compares the issue with similar past judgments, explains relevance, extracts winning clues, shows evidence checklists, comparative analytics, preparation gaps/white space, and generates a legal strategy report.

Use:

Next.js

TypeScript

Tailwind CSS

shadcn/ui style components

Framer Motion

Lucide React Icons

React Flow

Design style:

Deep blue gradient background

Premium legal-tech look

White typography

Glassmorphism cards

Soft glowing borders

Rounded cards

Large hero text

Smooth hover effects

Strong whitespace

Modern futuristic UI

Pages to build:

Landing Page

Analyze My Case

Privacy Masking Preview

Results Dashboard

Case Graph

Data Ingestion Demo

Strategy Report

Core features:

Text case input

Voice input button using Web Speech API or mock listening mode

Prompt chips

User role selector

PII masking utility

Similar case finder using local JSON data

Relevance score and relevance breakdown

Winning clue cards

Evidence checklist

Risk checklist

Comparative analytics section

White space/preparation gap cards

React Flow graph

Voice read-aloud report using browser speech synthesis

Data ingestion pipeline UI

Legal and privacy disclaimer

Create local mock data for 8 dowry-related case types:

Continuous dowry demand

Mental cruelty due to dowry

Physical harassment linked to dowry

Dowry death allegation

False dowry allegation defense

Stridhan/jewelry return

Domestic violence plus dowry

Settlement and mediation case

The final demo flow should be:

User enters issue
→ PII gets masked
→ Similar cases are found
→ Relevance is explained
→ Winning clues are extracted
→ Comparative analytics are shown
→ White space gaps are identified
→ Graph context is displayed
→ Strategy report is generated

Important disclaimers:

ULIS provides legal research support and informational insights only. It does not replace professional legal advice. Users should consult a qualified lawyer before taking legal action.

For prototype privacy, entered case details should be processed in session only and personal information should be masked before analysis.

Make the product look hackathon-demo ready, premium, creative, and impressive.