# 30-DAY-GROWTH-PLAN.md — GCC Fit Assessor

A realistic one-milestone-per-day roadmap taking v1.0.0 further, staying within the same free-tools-only, browser-first workflow established in the capstone. Each day builds on the last — skip a day and resume where you left off.

## Week 1 — Real content & reliability
- **Day 1:** Source the original 60-Day Challenge Fit Assessor's real questions/scoring rules; write them into a new `questions-real.js` alongside the dummy one
- **Day 2:** Swap `questions.js` to the real data; re-verify full flow end-to-end
- **Day 3:** Add `MailApp.sendEmail` to the Apps Script `doPost` handler — email yourself on every new lead
- **Day 4:** Test the email notification end-to-end with 3 real submissions
- **Day 5:** Add a "Download CSV" button to the dashboard using the already-fetched lead data
- **Day 6:** Add basic rate-limiting to the Apps Script (reject if the same email submits more than once in 5 minutes) to guard against accidental double-testing skewing your lead list
- **Day 7:** Week 1 review — confirm real questions, email alerts, and CSV export all work together

## Week 2 — Conversion & trust
- **Day 8:** Add a "How this works" 3-step visual on the landing page (no data, just clarity)
- **Day 9:** Add a privacy note near the lead capture form ("we'll only use this to follow up")
- **Day 10:** Point your existing custom domain at the deployment (steps already in README.md)
- **Day 11:** Verify HTTPS works correctly on the custom domain
- **Day 12:** Add Open Graph image (a real screenshot, not just text meta tags) for better link previews
- **Day 13:** Test link previews on LinkedIn/Twitter/WhatsApp
- **Day 14:** Week 2 review — confirm domain, trust signals, and share previews all work

## Week 3 — Scheduling & follow-up
- **Day 15:** Create a free Calendly account, set up a 30-min "GCC Scoping Call" event type
- **Day 16:** Replace the static "Book a call" text on Strong Fit reports with the real Calendly link
- **Day 17:** Test the booking flow end-to-end from a fresh assessment
- **Day 18:** Add a "status" column to the Sheet (New / Contacted / Booked) you can manually update
- **Day 19:** Add simple color-coding in the dashboard for status (visual only, no new backend logic)
- **Day 20:** Manually process and follow up with any real leads collected so far
- **Day 21:** Week 3 review — confirm the full lead-to-call pipeline works

## Week 4 — Insight & scale-readiness
- **Day 22:** Add a lightweight "source" field (where did the visitor come from — LinkedIn, direct, etc.) captured via a URL parameter
- **Day 23:** Test source tracking with a few different shared links
- **Day 24:** Build a simple funnel count on the dashboard (visits vs. completions — using a basic Apps Script counter)
- **Day 25:** Review the Sheet's row count and assess whether Google Sheets is still comfortable, or migration planning should start (see FUTURE-SCOPE.md)
- **Day 26:** Write a short "lessons from the first 30 days" note for yourself
- **Day 27:** Polish any UI rough edges found from real usage
- **Day 28:** Full regression test of every feature (assessment, save, dashboard, email, CSV, booking)
- **Day 29:** Update README.md and version notes with everything shipped this month
- **Day 30:** Tag a `v1.1.0` release on GitHub, and share a "30 days later" update publicly

## Notes
- Every step above uses only tools already in the stack (Apps Script, Google Sheets, GitHub Pages) plus one new free tool (Calendly free tier) — no paid services required across the full 30 days
- If a day's task depends on real user traffic you don't have yet, use test submissions to keep moving and don't block the roadmap
