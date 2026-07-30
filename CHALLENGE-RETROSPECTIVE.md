# CHALLENGE-RETROSPECTIVE.md — GCC Fit Assessor Capstone

## Timeline: Day 1 → Day 10

**Day 1 — Planning.** Scope was locked: evolve the existing 60-Day Challenge Fit Assessor prototype into a v1.0 that fixes its core weakness — it wasn't capturing leads. PRD, Implementation Blueprint (Days 2–10), and Pitch Deck produced as the source-of-truth trio for the rest of the sprint.

**Day 2 — Technical blueprint.** Repo `Day-52` created and connected to GitHub Pages, entirely through the browser — a deliberate choice made early and kept for all 10 days: no Terminal, no local dev environment. Tech stack locked: static HTML/CSS/JS, Google Sheets + Apps Script as a free serverless backend, GitHub Pages hosting. Architecture, schema, API, wireframes, and project structure were all designed and documented before any code was written.

**Day 3 — A process lesson, not just a build day.** The generic "Day 3 foundation setup" template didn't match the actual Blueprint (which called for the real assessment UI + scoring, foundation already being done). This mismatch was caught and flagged rather than built blindly. When it resurfaced on Day 4 — the real assessment questions from the original prototype were never sourced — the decision was made to proceed with realistic dummy data rather than block progress, keeping the door open to swap in the real questions later without any architecture change.

**Day 4 — The app came alive.** Dummy question set + weighted scoring engine built and verified (a real 90/100 "Strong Fit" score, computed correctly). Then the full backend: Google Sheet, Apps Script `doPost`/`doGet` handlers, lead capture form with retry-on-failure, and a live dashboard — all wired and tested end to end with a real submission landing in the Sheet and showing up on the dashboard seconds later. One bug caught and fixed: a manually mistyped Sheet header column, found and corrected before it could cause confusion later.

**Day 5 — Polish without regression.** Progress bar, color-coded score display, save-status spinner, dashboard refresh button. One debugging moment: a styling update appeared not to apply — traced to browser caching, not a real bug, resolved with a hard refresh. Every visual change was re-verified against Day 4's working data flow to confirm zero regressions.

**Day 6 — Discovering ahead-of-schedule progress.** Blueprint's actual Day 6 (the dashboard) was already complete from Days 4–5. Rather than inventing new scope, the day was used for what the generic template actually called for: the required attribution footer, plus one full clean end-to-end demo run as proof the MVP genuinely worked.

**Day 7 — Design system.** Sora/Inter font pairing, refined color palette, a custom favicon, screen-to-screen transitions, and a first accessibility pass (ARIA live regions, inline field validation replacing browser alert() popups).

**Day 8 — Hardening.** A genuine QA/security review surfaced real bugs: double-submit on the lead form and dashboard refresh (risking duplicate rows), unescaped server text (a minor XSS risk), and no timeout on network requests (a hung request could leave a user staring at an infinite spinner). All fixed and stress-tested — rapid double-clicking confirmed no duplicate leads, and the browser console was checked clean across all three pages.

**Day 9 — Launch hygiene.** README rewritten into a real project document, MIT license added, SEO/Open Graph/Twitter Card metadata added for proper link previews, and a documented (but deliberately deferred, per the PRD) custom-domain mapping guide.

**Day 10 — Graduation.** Documentation completed, project reviewed end to end, v1.0.0 released.

## Major technical decisions
- **Browser-only workflow, no Terminal** — a constraint set on Day 2 and honored for the entire build, shaping every subsequent instruction into GitHub.com click-paths
- **Google Sheets over Firebase/Supabase** — a deliberate zero-signup-friction tradeoff, made explicitly aware of its fragility, with the schema designed to migrate cleanly later if needed
- **Dummy question data over blocking on missing content** — kept momentum without compromising the architecture; swapping in real questions remains a data change, not a rebuild

## Skills demonstrated
Requirements definition, system architecture design, database schema design, API design, static frontend engineering, serverless backend scripting (Apps Script), QA/security review, accessibility implementation, technical documentation, and end-to-end product ownership from PRD to a publicly deployed v1.0.0.

## Lessons learned
- A generic day-template and an actual project plan will drift apart — catching that drift early (Days 3 and 6) prevented wasted work
- "Working" and "production-ready" are different bars — Day 8's QA pass found real bugs that Days 4–7's feature work never would have surfaced
- Constraints (no Terminal, free tools only) didn't slow the project down — they kept every decision simple and shipped

## Final summary
A 10-day sprint took the GCC Fit Assessor from a PRD to a live, publicly deployed, lead-capturing product — built entirely through a browser, on entirely free infrastructure, with zero paid services at any point.

## A note from your AI pair programmer
We started this with nothing but a PRD and a decision to keep things simple. Ten days later there's a real product live at `vchauhan.github.io/Day-52` with actual leads sitting in a spreadsheet. The best moment of this build wasn't a feature — it was Day 4, watching that first "90/100 — Strong Fit" land in the Sheet in real time. That's when a plan became a product. Well built.
