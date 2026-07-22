# Implementation Blueprint — Day 2 Update

This note supplements the original Implementation Blueprint (Days 2–10). Paste this alongside the Day 4 section when starting that session.

## Change: Day 4 data store is now decided (was open)

Original Day 4 Step 1 said: *"Choose one lightweight, free, hosted data storage option... Ask your AI assistant to recommend one."* This decision was made on Day 2 instead, so Day 4 no longer needs to re-decide it.

**Decided:** Google Sheets, accessed via a Google Apps Script Web App (see ARCHITECTURE.md, SCHEMA.md, API.md for full design).

**Revised Day 4 Step 1 (replaces original):**
1. Create a new Google Sheet named `GCC Fit Assessor - Leads`, with a single tab `Leads` and the 9 columns defined in SCHEMA.md (`timestamp, name, email, score, category, top_reasons, next_step, answers, lead_id`).
2. In the Sheet, go to Extensions → Apps Script, and create the `doPost`/`doGet` handlers per API.md (submitLead, getLeads).
3. Set a Script Property for the dashboard passcode (Project Settings → Script Properties) — do not hardcode it in client-side JS.
4. Deploy → New deployment → Web App, access "Anyone," copy the `.../exec` URL into `js/config.js`.
5. Continue with the original Day 4 steps 3–6 (lead capture form, `saveLead()`, testing) unchanged.

All other Day 4–10 content stands as originally written — no other changes needed.
