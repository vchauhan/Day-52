# FUTURE-SCOPE.md — GCC Fit Assessor

How this specific project could evolve beyond v1.0.0, grounded in what v1.0 actually is: a static HTML/CSS/JS assessment tool backed by Google Sheets + Apps Script, deployed on GitHub Pages.

## 3 months out
- **Real question set**: swap the dummy 5-question set for the actual ported logic from the original 60-Day Challenge Fit Assessor
- **Custom domain**: point Vivek's existing domain at the GitHub Pages deployment (guide already documented in README.md)
- **Basic email notification**: extend the Apps Script `doPost` handler to send Vivek an email (via `MailApp.sendEmail`, still free, built into Apps Script) whenever a new lead is captured — no new infrastructure needed
- **Lead export**: add a "Download CSV" button to the dashboard using the data already being fetched — no backend change required

## 6 months out
- **Migrate off Google Sheets** if lead volume or concurrent-access issues appear (SCHEMA.md already documents the row shape maps cleanly to Firebase/Supabase)
- **A/B test the assessment questions/scoring weights** to see which combination produces the best "Strong Fit" → real conversation conversion rate
- **Add a booking integration** (e.g. Calendly free tier) directly on the "Strong Fit" report screen, replacing the passive "recommended next step" text with an actual scheduling widget
- **Multi-page detailed report** (explicitly out of scope for v1.0 per the PRD) — a fuller PDF-style breakdown for high-intent leads

## 12 months out
- **Real authentication** for the dashboard (replacing the passcode) if multiple team members need access
- **CRM-lite features**: tags, follow-up status, notes per lead (explicitly out of scope for v1.0, but the flat lead schema is designed to extend into this without a rewrite)
- **Localization**: variants of the assessment for different regions if GCC-as-a-Service expands beyond the current US/UK/Australia/Canada target
- **Analytics dashboard**: conversion funnel (visits → completions → strong fits → booked calls) once there's enough real traffic to make this meaningful

## Deliberately not on this list
Anything requiring a paid service before there's revenue or real user volume to justify it — consistent with the capstone's founding principle of staying lightweight and free until proven necessary.
