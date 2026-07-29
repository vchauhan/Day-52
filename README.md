# GCC Fit Assessor

A free, self-serve assessment tool that helps SME founders in the US, UK, Australia, and Canada evaluate whether setting up an India-based Global Capability Center (GCC) is a fit for their business.

**Live app:** https://vchauhan.github.io/Day-52/
**Founder dashboard:** https://vchauhan.github.io/Day-52/dashboard.html (unlisted, passcode-protected)

Built as a 10-day capstone for the AB Talks 60-Day Claude AI Challenge.

## How it works

1. Visitor completes a short 5-question assessment
2. Gets an instant fit score (0–100), category, and top reasons
3. Enters name + email to unlock a recommended next step
4. Lead is saved automatically; the founder can view all leads in a private dashboard

## Tech stack

- **Frontend:** Vanilla HTML/CSS/JavaScript — no framework, no build step
- **Backend:** Google Apps Script (Web App), acting as a lightweight serverless API
- **Database:** Google Sheets
- **Hosting:** GitHub Pages (free, auto-deploys from `main`)

See `ARCHITECTURE.md`, `SCHEMA.md`, and `API.md` for full technical design.

## Project structure
