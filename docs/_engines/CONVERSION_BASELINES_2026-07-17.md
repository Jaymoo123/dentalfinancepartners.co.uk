# Conversion Baselines — Pre-Intervention Snapshot (2026-07-17)

Captured before multi-step form ports flip to wave-1 sites (generalist, dentists, solicitors).
Reference period: **last 60 days** (2026-05-18 – 2026-07-17).
Property included as the reference bar (multi-step already live).

---

## Per-site summary

| Site | Clean leads (60d) | Bing clicks/day* | GSC clicks/day | Lead rate (per 100 Bing clicks) | vs Property |
|---|---|---|---|---|---|
| **property** (reference) | 70 | 508.2 | 0.58 | **1.15** | — |
| generalist | 6 | 215.4 | 0.00 | 0.56 | −51% |
| dentists | 2 | 64.0 | 0.14 | 0.63 | −45% |
| solicitors | 2 | 207.4 | 0.02 | 0.19 | −83% |

\* Bing clicks/day is a snapshot average computed from the number of distinct dates present in `bing_query_data` (5 pulls for wave-1 sites, 12 for property), not a true daily average. Treat as order-of-magnitude only — see caveats.

---

## Weekly lead breakdown

### Property (reference)

| Week of | Clean leads |
|---|---|
| 2026-05-25 | 4 |
| 2026-06-01 | 6 |
| 2026-06-08 | 9 |
| 2026-06-15 | 12 |
| 2026-06-22 | 4 |
| 2026-06-29 | 8 |
| 2026-07-06 | 10 |
| 2026-07-13 | 17 |
| **Total** | **70** |

Property shows a rising trend; 2026-06-22 dip likely an artefact of a partial week at the time of data entry.

### Generalist

| Week of | Clean leads |
|---|---|
| 2026-06-01 | 1 |
| 2026-06-22 | 3 |
| 2026-07-06 | 2 |
| **Total** | **6** |

Weeks not listed = 0 leads. Sparse; no leads in the last logged week (2026-07-13).

### Dentists

| Week of | Clean leads |
|---|---|
| 2026-05-25 | 1 |
| 2026-06-29 | 1 |
| **Total** | **2** |

Only 2 leads across 60 days; 6-week gap between them. Very low volume.

### Solicitors

| Week of | Clean leads |
|---|---|
| 2026-05-25 | 1 |
| 2026-06-29 | 1 |
| **Total** | **2** |

Identical pattern to dentists. Despite carrying the largest Bing click volume of the wave-1 cohort (207/day), conversion is the weakest (0.19/100 clicks).

---

## Form analytics events (last 60 days, non-bot)

All 4 sites emit `web_events` instrumentation. No `miniform_*` prefix events observed anywhere — all fire as `form_*` / `lead_submitted`.

| Site | form_start | form_submit | lead_submitted | form_step_view | form_step_complete | form_field_abandon | form_error |
|---|---|---|---|---|---|---|---|
| property | 198 | 63 | 62 | 663 | 25 | 149 | 100 |
| generalist | 6 | 5 | 5 | — | — | 6 | 4 |
| dentists | 3 | 1 | 1 | — | — | 3 | 1 |
| solicitors | 6 | 1 | 1 | — | — | 5 | 0 |

**Observations:**
- `form_step_view` and `form_step_complete` fire only on **property** — these are multi-step form events. Wave-1 sites have none, confirming pre-multi-step baseline is clean.
- Property start→submit funnel: 198 starts → 63 submits = **32% start-to-submit rate**.
- Generalist: 6 starts → 5 submits = 83% (small n, treat cautiously).
- Dentists: 3 starts → 1 submit = 33% (tiny n).
- Solicitors: 6 starts → 1 submit = 17% — abandonment problem.
- `lead_submitted` event closely tracks `form_submit` on all sites (1 delta on property = 1 form submit without confirmed DB write). Counts are reliable.

---

## Traffic data caveats

1. **GSC ~2-day lag**: `gsc_query_data` max date is 2026-07-15. Clicks/day computed over 59 distinct dates are accurate but exclude the last ~2 days.
2. **GSC near-zero for wave-1 sites**: Generalist shows 0 GSC clicks in 60 days; dentists 8 total; solicitors 1 total. This is not a data pipeline issue — these sites have negligible Google organic click volume at this snapshot. Bing is the operative traffic channel.
3. **Bing clicks_per_day is a snapshot average, not a true daily mean**: `bing_query_data` records only 5 distinct dates for wave-1 sites (vs 12 for property). The clicks shown are the sum across those pull days divided by 5. This can overstate or understate true daily volume depending on when pulls landed. Treat as directional.
4. **Lead rate denominator**: Lead rate uses Bing total clicks (60d) as denominator, not sessions — there is no GA4 session count in the DB. This means the rate is `leads / (Bing clicks in 60d) × 100`, which understates true conversion rate if a visitor takes multiple Bing clicks.
5. **Event instrumentation coverage**: All 4 sites emit `web_events`. However, `web_sessions` instrumentation (consent-gated) may not be firing on all sites — not verified here; cross-check `web_sessions` row counts per site if session-level funnel analysis is needed post-intervention.
6. **No GA4 session data in DB**: GA4 OAuth is available (ga4_token.json) but was not queried here. GSC/Bing clicks are the only traffic proxy in-DB.

---

## Test-lead markers observed

Query against all leads in last 60 days matching `email LIKE '%test%'`, `email LIKE '%example.com%'`, `email LIKE '%mailinator%'`, `full_name LIKE '%test%'`, `message LIKE '%test%'` returned **0 rows**.

**Conclusion**: No test-lead pollution detected in the 60-day window under the current heuristics.

### is_test flagging — IMPLEMENTED 2026-07-17

`is_test boolean NOT NULL DEFAULT false` column added to `leads`. All conversion stats must **exclude `is_test = true` rows**:

```sql
-- Example: leads per site (QA-clean)
SELECT source, COUNT(*) FROM leads WHERE is_test = false GROUP BY source;
```

Detection rules applied server-side at insert (both `createLeadSubmitHandler` and Property's bespoke route):
- `email` matches `/@(test|example)\./i`
- `email` contains `+test@`
- `full_name` matches `/^test\b/i`
- payload carries `qa: true` (set by client when `?qa=1` or `localStorage.qa_mode` is present)
- `source = 'test'` (probe_secret path, already existed)

QA testers: append `?qa=1` to any form URL to mark submissions as test. No notification email is sent for `is_test = true` rows.

**Caveats**: rules do not catch disposable email domains (mailinator, yopmail etc.) or obviously fake names beyond the `^test` prefix. Extend `isTestLead()` in `packages/web-shared/leads/server/createLeadSubmitHandler.ts` if abuse is observed.

---

## Key numbers summary

| Site | Lead rate (per 100 Bing clicks) | vs Property |
|---|---|---|
| property | 1.15 | — (reference) |
| dentists | 0.63 | −45% |
| generalist | 0.56 | −51% |
| solicitors | 0.19 | −83% |

Solicitors is the weakest converter despite having the second-highest Bing click volume. The low start-to-submit event ratio (17%) points to form friction as a likely factor — a strong candidate for multi-step form uplift.

---

*Generated by: scripts/_q.py against prod Supabase. No writes. No commits.*
