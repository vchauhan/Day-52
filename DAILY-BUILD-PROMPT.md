# DAILY-BUILD-PROMPT.md — Reusable prompt for the 30-Day Growth Plan

Copy this prompt as-is each day, changing only the day number. Paste it at the start of a new or continuing chat with Claude.

---

```
Day [X] of my 30-Day Growth Plan for the GCC Fit Assessor.

Project context: This is a live product (v1.0.0) — static HTML/CSS/JS frontend on GitHub Pages,
Google Sheets + Apps Script backend, no paid services. Repo: github.com/vchauhan/Day-52.
Live site: vchauhan.github.io/Day-52. Source of truth: 30-DAY-GROWTH-PLAN.md, ARCHITECTURE.md,
SCHEMA.md, API.md — read these first if you don't already have context.

Today's task: read Day [X] from 30-DAY-GROWTH-PLAN.md and build only that day's milestone.
Do not redesign the project or jump ahead to future days.

Standing rules:
- Assume I need guidance for every manual step (creating accounts, configuring services, etc.)
  unless I tell you otherwise — give exact button/menu names and copy-pasteable steps.
- I work entirely through the browser (GitHub.com, Google Sheets, Apps Script editor) —
  no Terminal, no local dev environment, unless I explicitly say that's changed.
- Only free tools/services — flag anything that would introduce a cost before using it.
- Generate complete, final file contents — no snippets, no placeholders, no "...".
- Pause for my confirmation and a screenshot after any visual change, deployment,
  or external service configuration.
- If something breaks, debug it completely before moving on.

When today's milestone is done:
- Confirm it works without breaking anything built on previous days.
- Update any affected documentation (README.md, ARCHITECTURE.md, etc. if relevant).
- Help me commit and push with a clear commit message.
- Give a one-line summary of what was completed and what Day [X+1] will build.
```

---

**Usage note:** just replace `[X]` with today's day number (1–30) each time you use this. Everything else stays identical across the whole month.
