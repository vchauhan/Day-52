# PROJECT-STRUCTURE.md — GCC Fit Assessor v1.0

## Folder structure

```
Day-52/
├── index.html              # Simple redirect/landing → assessment.html
├── assessment.html         # Question flow + preview + lead capture + full report (all one page, JS-driven states)
├── dashboard.html           # Founder-only leads view (unlisted)
├── styles.css               # Single shared stylesheet for all pages
├── /js
│   ├── questions.js         # Question data + scoring function (ported from existing Fit Assessor, unchanged)
│   ├── app.js                # Assessment page logic: render questions, handle submit, call API, manage screen states
│   └── dashboard.js         # Dashboard page logic: passcode gate, fetch leads, render table
├── /apps-script
│   └── Code.gs.md            # Reference copy of the Apps Script source (the deployed script itself lives in script.google.com, not GitHub — this file is a synced backup so the logic is version-controlled)
├── README.md                 # Project overview, live URL, how to run/extend
├── ARCHITECTURE.md
├── SCHEMA.md
├── API.md
├── UI-WIREFRAMES.md
└── PROJECT-STRUCTURE.md
```

## Why this structure

- **Flat HTML files at root** — GitHub Pages serves from repo root by default; keeping `index.html`, `assessment.html`, `dashboard.html` at the top level means no path configuration needed.
- **`/js` folder** — separates *content* (`questions.js` — the data Vivek might want to tweak) from *behavior* (`app.js`, `dashboard.js` — the logic that shouldn't need to change once built). This directly reflects Day 3's plan to keep questions data-driven rather than hardcoded in HTML.
- **`/apps-script`** — Apps Script itself deploys from script.google.com, not from GitHub (Google doesn't support Git-based deploy for Apps Script without extra tooling like `clasp`, which is out of scope for a 90-min/day capstone). Keeping a markdown copy of the script in the repo means the logic is still readable/version-tracked here, even though the live deploy happens elsewhere.
- **One `styles.css`** — three pages, small project, no need for per-page stylesheets or a CSS framework.
- **Docs at root** — all five planning docs live alongside the code so anyone (including a future AI session, per the Blueprint's "paste this day's section" instruction) has full context in one place.

## Where future code will live
- Day 3 (assessment UI + scoring): `js/questions.js`, `js/app.js`, `assessment.html`, `styles.css`
- Day 4 (data store wiring): `/apps-script/Code.gs.md` (+ live script in script.google.com), passcode setup
- Day 5 (dynamic report + lead capture): additions to `js/app.js`
- Day 6 (dashboard): `dashboard.html`, `js/dashboard.js`
- Days 7–10 (polish, testing, deploy hardening): edits across existing files — no new top-level structure expected
