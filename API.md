# API.md — GCC Fit Assessor v1.0

The "API" is a single Google Apps Script Web App URL (`.../exec`), differentiated by HTTP method and an `action` query parameter. No implementation code below — design only, per today's scope.

---

## Endpoint 1: Submit Lead

**Purpose:** Save a completed assessment as a lead.

- **Method:** `POST`
- **URL:** `{WEB_APP_URL}?action=submitLead`
- **Authentication:** None (public — any visitor can submit their own assessment)

**Request body (JSON):**
```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "score": 78,
  "category": "Strong Fit",
  "topReasons": ["reason 1", "reason 2", "reason 3"],
  "nextStep": "Book a scoping call",
  "answers": { "q1": "...", "q2": "..." },
  "leadId": "uuid-generated-client-side"
}
```

**Response — success (200):**
```json
{ "status": "ok", "leadId": "uuid-generated-client-side" }
```

**Response — validation error (still 200, since Apps Script always returns 200; check `status` field):**
```json
{ "status": "error", "message": "Invalid email format" }
```

**Validation (server-side, in Apps Script):**
- `name` non-empty, ≤100 chars
- `email` matches basic email regex
- `score` numeric 0–100
- `category`, `nextStep` non-empty strings
- `topReasons` is an array of exactly 3 strings
- `answers` is a non-empty object
- `leadId` non-empty string

**Error cases:**
| Case | Response |
|---|---|
| Missing required field | `{"status":"error","message":"Missing field: <name>"}` |
| Invalid email | `{"status":"error","message":"Invalid email format"}` |
| Malformed JSON body | `{"status":"error","message":"Invalid request body"}` |
| Sheet write fails (rare, e.g. quota) | `{"status":"error","message":"Could not save lead, please retry"}` — frontend shows a retry button per the "no lead data lost" NFR |

---

## Endpoint 2: Get Leads (Dashboard)

**Purpose:** Return all captured leads for the founder's dashboard.

- **Method:** `GET`
- **URL:** `{WEB_APP_URL}?action=getLeads&passcode=<passcode>`
- **Authentication:** Passcode string compared against a value stored in Apps Script's Script Properties (not hardcoded in client code, not in the Sheet itself). This is the one safeguard beyond "unlisted URL" — see ARCHITECTURE.md note.

**Response — success (200):**
```json
{
  "status": "ok",
  "leads": [
    {
      "leadId": "...",
      "timestamp": "2026-07-23T10:15:00Z",
      "name": "Jane Doe",
      "email": "jane@company.com",
      "score": 78,
      "category": "Strong Fit",
      "topReasons": ["...", "...", "..."],
      "nextStep": "...",
      "answers": { "q1": "..." }
    }
  ]
}
```

**Response — wrong/missing passcode (200, with error status):**
```json
{ "status": "error", "message": "Unauthorized" }
```

**Error cases:**
| Case | Response |
|---|---|
| Missing/incorrect passcode | `{"status":"error","message":"Unauthorized"}` |
| Sheet read fails | `{"status":"error","message":"Could not load leads"}` |
| No leads yet | `{"status":"ok","leads":[]}` — not an error |

---

## Notes for Day 3+ implementation
- Both endpoints live in one Apps Script project attached to the Leads Sheet; `doGet(e)` and `doPost(e)` branch on `e.parameter.action`.
- CORS: Apps Script Web Apps handle cross-origin requests automatically when deployed with "Anyone" access — no extra CORS config needed.
- The passcode itself will be set as an Apps Script **Script Property** (not committed to GitHub) when we implement this on the relevant build day — flagging now so it isn't forgotten.
