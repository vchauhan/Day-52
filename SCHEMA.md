# SCHEMA.md — GCC Fit Assessor v1.0

## 1. Storage model
Google Sheets isn't relational, so v1.0 uses **one flat table** (one sheet tab named `Leads`). This fully satisfies FR-5 and FR-6 — no relationships are needed since the product has exactly one entity (a completed assessment = a lead).

## 2. Sheet: `Leads`

| Column | Field | Type | Constraint | Notes |
|---|---|---|---|---|
| A | `timestamp` | ISO datetime string | Required, auto-set by Apps Script on insert | Not sent by client — server sets it, so it can't be spoofed/skipped |
| B | `name` | string | Required, 1–100 chars | Trimmed |
| C | `email` | string | Required, must match basic email pattern | Validated both client-side and in Apps Script |
| D | `score` | number (0–100) | Required | Computed client-side, re-validated as a number server-side |
| E | `category` | string | Required, one of the existing Fit Assessor categories | e.g. "Strong Fit" / "Moderate Fit" / "Not Yet" — exact values carried over unchanged from existing scoring logic |
| F | `top_reasons` | JSON string (array of 3 strings) | Required | Stored as a JSON string in one cell; parsed by dashboard on read |
| G | `next_step` | string | Required | The one recommended next step shown in the full report |
| H | `answers` | JSON string (object: questionId → answer) | Required | Full raw answers, so Vivek can see exactly how each lead answered |
| I | `lead_id` | string (UUID, generated client-side) | Required, unique | Lets the dashboard key rows reliably even though Sheets has no native primary key |

## 3. Validation rules (enforced in Apps Script, not just the browser)
- `name`: non-empty after trim, max 100 chars.
- `email`: matches `^[^\s@]+@[^\s@]+\.[^\s@]+$`.
- `score`: numeric, 0–100.
- `category`, `next_step`: non-empty strings.
- `top_reasons`, `answers`: must parse as valid JSON before writing.
- Any row failing validation is rejected with a 400-style JSON error — it is **not** written, so partial/corrupt leads never appear in the dashboard (protects FR-5's "no lead data lost" requirement from the opposite failure mode: bad data being saved).

## 4. Validated against every PRD user story
| User story (Section 6, PRD) | Schema support |
|---|---|
| Visitor completes assessment | `answers` captures full response set |
| Visitor sees preview (score + reasons) | `score`, `category`, `top_reasons` all computed and available before save |
| Visitor submits name+email, full report unlocks | `name`, `email` required fields; `next_step` completes the report |
| Record saved as a lead | Every field above written as one row on submit |
| Founder sees lead in dashboard with score + answers | `score` and `answers` both stored per row, directly renderable |

## 5. Known fragility (you chose Sheets knowingly — noting for the record)
- No concurrent-write locking beyond what Apps Script/Sheets provides natively (fine at capstone lead volumes).
- No schema enforcement at the storage layer itself — all validation lives in the Apps Script layer, so **the Apps Script is the only path that should ever write to this sheet** (don't manually edit rows in a way that breaks the 9-column structure).
- If this project ever needs to scale past a few hundred leads/complex queries, migrating to Firebase/Supabase later is straightforward since the row shape above maps directly to a `leads` collection/table.
