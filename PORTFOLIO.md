# PORTFOLIO.md — GCC Fit Assessor

## Project description (portfolio/LinkedIn "Featured" section)
**GCC Fit Assessor** — A self-serve lead-generation tool that helps SME founders evaluate whether an India-based Global Capability Center is a fit for their business. Built as a 10-day solo sprint: PRD → system design → implementation → QA/security hardening → public launch, using a zero-cost stack (static frontend on GitHub Pages, Google Sheets + Apps Script as a serverless backend). Live at vchauhan.github.io/Day-52.

## Resume bullet points
- Designed and shipped a full-stack lead-generation web application in a 10-day solo sprint, from PRD through production deployment, using a zero-infrastructure-cost architecture (static frontend, serverless backend)
- Built a serverless REST-style API using Google Apps Script, including request validation, error handling, and passcode-based endpoint protection
- Conducted a self-directed QA and security review that identified and fixed double-submission bugs, XSS risk from unescaped server output, and missing network timeout handling
- Designed a normalized data schema and validated it against every user story in the product requirements before implementation began
- Implemented accessibility improvements (ARIA live regions, keyboard navigation, inline form validation) and a responsive, dark-mode UI design system

## Interview talking points
- **"Tell me about a project you built end to end."** Walk through the PRD → Architecture → Schema/API design → implementation → QA → launch sequence — emphasize that documentation was written *before* code, and used as the actual source of truth throughout (can point to specific decisions, like catching a mismatch between a generic plan and the real one on Day 3/6 and correcting course).
- **"Tell me about a bug you found and fixed."** The Day 8 double-submit bug: rapid double-clicking the lead-capture button could create two rows for one submission. Explain the fix (disabling the button synchronously before the async call starts) and how you verified it (stress-testing with rapid clicks, checking the Sheet for duplicates).
- **"How do you make technical tradeoffs?"** Choosing Google Sheets over Firebase/Supabase — explain the reasoning (zero signup friction, "good enough" for capstone-scale data) while being explicit about the tradeoff (documented fragility, planned migration path in FUTURE-SCOPE.md).
- **"How do you handle unclear requirements?"** When Day 3's real assessment questions weren't available, you made an explicit decision (documented, not silent) to proceed with realistic dummy data rather than block progress — a real judgment call under ambiguity.

## Demo script (2–3 minutes)
1. **[15s]** "This is the GCC Fit Assessor — it helps founders self-assess whether outsourcing to an India-based team makes sense for their business."
2. **[45s]** Open the live site, click Start Assessment, answer the 5 questions on screen — narrate: "Takes about 3 minutes, no login needed."
3. **[30s]** Show the score reveal: "Instant fit score, top reasons, and — this is the key part — " enter name/email, "—captures the lead before revealing the full recommendation."
4. **[30s]** Switch to the dashboard: "This is the founder-only view — passcode protected, shows every lead with their full answers, click to expand."
5. **[20s]** "The entire backend is a Google Sheet and a script — zero hosting cost, deployed on GitHub Pages."
6. **[10s]** Close: "Built in a 10-day sprint, from requirements doc to production."

## Suggested screenshots for the portfolio
- Landing page (clean, shows branding/design system)
- Mid-assessment question (shows progress bar + UI polish)
- Final report screen (score + reasons + next step — the "payoff" screenshot)
- Dashboard with leads table (shows the founder-facing value)
- ARCHITECTURE.md's Mermaid diagram, rendered (shows technical depth)

## Recommended GitHub repository metadata
- **Description:** "A free, self-serve GCC (Global Capability Center) fit assessment tool with lead capture — static frontend, Google Sheets/Apps Script backend, zero hosting cost."
- **Website:** `https://vchauhan.github.io/Day-52/`
- **Topics (GitHub "About" → gear icon → Topics):** `javascript` `html-css-javascript` `google-apps-script` `google-sheets` `github-pages` `lead-generation` `serverless` `no-framework` `vanilla-js` `saas`
