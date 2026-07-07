# Property lead capture: multi-step qualified mini-forms

*Created 2026-07-07. Owner decision locked same date. Single source of truth for scope, redirect allowlist, watch runbook, baseline snapshot, and rollback recipe for the multi-step mini-form change on propertytaxpartners.co.uk.*

---

## 1. Why this was built

On 2026-07-07 two leads arrived via mini-form surfaces with role "Other" and thin free-text messages, providing no actionable context for DJH qualification. Investigation found that six mini-surfaces had no role question at all and accepted any message above a 10-character floor, silently hardcoding `role:"Other"` on every submission. The DJH handover and notify emails printed the raw role value without a readable definition, so recipients could not tell what "Other" meant. Mini-form surfaces also never routed the submitter to the `/thank-you` page, so the "check your email and phone" prompt was never seen.

---

## 2. What shipped

### MiniCapture (6 callers)

MiniCapture is now a two-step progressive form housed inside a single `<form>` element (both panels stay mounted; hidden panel uses `display:none` so FormData reads across steps and Back costs nothing):

- **Step 1 "About you"**: role select drawn from `niche.lead_form.role_options`; conditional `role_detail` free-text field shown when role value is `"Other"` (required); message textarea with a 40-character / 8-word floor and a guided placeholder.
- **Step 2 "Contact details"**: name, email, phone, consent notice co-located with the submit button (DJH Annex B.1 wording; do not soften), and a Back button.
- **Transition**: slide-in-from-right on forward, slide-in-from-left on Back (`tw-animate-css` utilities already in the global bundle; `motion-reduce:animate-none` honoured). No exit animation; `overflow-hidden` wrapper prevents layout shift in modals.
- **Focus/a11y**: step-header focus on panel change (`tabIndex={-1}`, `preventScroll`; avoids iOS keyboard auto-pop in fixed modals); `aria-live="polite"` step announcement; `aria-invalid` + `aria-describedby` error pattern (brings MiniCapture to LeadForm parity); focus jumps to first invalid field on a failed Continue press.
- **Role select**: native `<select>` (not radio chips; five long labels wrap badly at 320-360 px).
- **"Other" relabelled**: the option label displayed to users is **"Something else"**; the stored value remains `"Other"` for database and analytics stability.
- **`role_detail`** stored in `extras.role_detail`. If "Something else" is selected and the field is empty, submission is blocked at step 1.
- **Message prefix removed from payload**: the `[Surface name]` prefix previously prepended to the message body is moved to `extras.form_id` so the message column is clean for AI classification and the DJH email reads naturally.
- **`postSubmit` prop**: new optional prop on MiniCapture; default is `"inline"` so callers that do not pass it are unchanged. Callers in the redirect allowlist below pass `postSubmit="redirect"`.

### SpecialistWidget

The composer step 1 now shows the question plus a role select (with conditional `role_detail`); step 2 is email plus send plus Back. Name and phone are not added (the detail-capture sequence collects those later by design). The hardcoded `role:"Other"` on line 342 is replaced with the user's selection. `extras.capture_channel:"assistant"` and `trigger` keys are preserved (the nurture copy reads `capture_channel`). Inline success copy is upgraded to the "check your email and phone now" prompt.

### "Something else" free text in the handover and notify emails

Both the DJH handover email (`handoff.ts`) and the instant notify email (`notify/route.ts`) now render:

- Role label with its definition in parentheses, e.g. "Portfolio owner (4-10 properties)".
- A **"In their words"** row showing `role_detail` when present, e.g. "Something else — estate executor with mixed residential use".
- A **"Came via"** row showing `extras.form_id`, e.g. "exit_intent".
- Fallback to the raw role value for legacy rows, "resource" leads, and any server-default "Other" that pre-dates this change.

### Redirect allowlist

Post-submit behaviour is explicit per surface. It is not a blanket redirect.

| Surface | Post-submit behaviour |
|---|---|
| `exit_intent` | Redirect to `/thank-you?bt=<token>&rt=<return-path>` |
| `inline_mini` | Redirect to `/thank-you?bt=<token>&rt=<return-path>` |
| `calc_result` | Redirect to `/thank-you?bt=<token>&rt=<return-path>` |
| `mobile_tool` | Redirect to `/thank-you?bt=<token>&rt=<return-path>` |
| `resource_block` (GateOrForm) | Redirect to `/thank-you?bt=<token>&rt=<return-path>` |
| `calc_result_gate` (ResultGateModal) | Inline only; `onSuccess` defers reveal by 1,800 ms so the upgraded success copy is visible before the result appears. Esc or skip during that delay is safe (`revealFromGate` is idempotent). |
| `specialist_widget` | Inline only (chat thread context). |
| `ResourceGate` | Untouched (see Out of scope). |

### Thank-you page

The `/thank-you` page gains a **"Back to the page you were reading"** `<Link>` rendered only when the `rt` query parameter is present and passes `isSafeReturnPath` validation (must start with `/`, must not start with `//`, must contain no backslash, no whitespace, no control characters). The link carries `data-cta="thankyou-return-article"` so it is captured automatically as a `cta_click` event. The page is already `noindex` and robots-disallowed; there is no SEO exposure.

### Server-side changes

- **Dedupe path** (`/api/leads/submit`): `extras` is now included in the dedupe select and merged into `dedupeUpdate`. Previously, a 24-hour same-email resubmit dropped `role_detail` and `form_id` from extras. The server backstop `MIN_MESSAGE=10` is kept as a safety net for stale cached bundles.
- **AI classification** (`classifyLead`, `sequence-gen.ts`): `extras.role_detail` and `form_id` are passed into prompts so intent classification for mini-form leads is not silently degraded by the removal of the message prefix.
- **Retention scrub** (`retention.ts`): `extras.role_detail` is added to the anonymisation scrub. Free text can carry PII and must not outlive the retention window.

### Analytics

Three new event names are added to the shared `EVENT_NAMES` allowlist: `form_step_view`, `form_step_complete`, `form_step_back`. `form_step_complete` and `form_step_back` are added to `INTERACTION_EVENTS`. All step events carry `{form_id, step, step_id: "qualify"|"contact", flow, ms_on_step, lead_role?}`. `form_error` is now emitted on client-side validation failure too (`error_kind: "min_length"|"min_words"|"role_missing"` plus `step`). The `flow` prop stamps every event as `"single"` or `"multi"` so pre- and post-deploy analytics self-segregate with no backfill needed.

---

## 3. Feature flag and rollback

### Enabling the multi-step flow

Set the build-time environment variable in Vercel prod:

```
NEXT_PUBLIC_MINIFORMS_MULTISTEP=1
```

All multi-step behaviour is gated behind this single chokepoint. The single-step code path is kept live for one release cycle.

### Surgical rollback (approx. 5 minutes)

1. Remove `NEXT_PUBLIC_MINIFORMS_MULTISTEP` from the Vercel prod environment (or set it to `0`).
2. Trigger a redeploy from the Vercel dashboard or via CLI from the repo root using `VERCEL_ORG_ID`/`VERCEL_PROJECT_ID`.
3. All surfaces revert to single-step behaviour. No database migration is needed; the `deploy_watch` table and `vw_form_step_funnel` view are additive and harmless when the flag is unset.

### Emergency rollback (approx. 1 minute)

```
vercel rollback
```

This flips the deployment alias to the previous build without a rebuild. Use when a probe failure requires an immediate revert before root-cause diagnosis.

### Analytics continuity

The `flow:"multi"` vs `flow:"single"` stamp on every event means rollback never corrupts historical data. Queries can filter by `flow` to isolate each era cleanly.

---

## 4. Baseline snapshot (28 days: 2026-06-09 to 2026-07-07, human-only sessions)

| form_id | starts | submits | errors | leads |
|---|---|---|---|---|
| lead_form | 39 | 22 | 5 | 21 |
| specialist_widget | 11 | 4 | 0 | 4 |
| calc_result_gate | 7 | 2 | 0 | 2 |
| exit_intent | 4 | 3 | 0 | 3 |
| exit_intent_form | 2 | 2 | 0 | 2 |
| inline_mini | 2 | 2 | 0 | 2 |
| mobile_tool | 3 | 2 | 0 | 2 |
| calc_result | 3 | 0 | 0 | 0 |
| resource_block | 2 | 0 | 2 | 0 |

Mini-form surfaces combined (exit_intent, exit_intent_form, inline_mini, mobile_tool, calc_result, resource_block): **16 starts, 9 submits, 9 leads** in the 28-day window, equivalent to **3.75 leads per week** (baseline used in day-7 Poisson gate below).

**43 Property leads captured since 2026-06-01. 21 of those (49%) carried role "Other", all originating from surfaces that had no role question.**

---

## 5. Self-driving deploy watch

The site runs its own gate checks after deploy. You do not need to remember to check anything. Verdicts arrive by email to the operator inbox (the same address that receives lead handovers). Act only when an email says **ACTION NEEDED**.

**Liveness rule**: if no Day 3 email arrives by Day 4, that silence is itself the alert. Investigate the cron (check Vercel Cron logs for `/api/cron/deploy-watch`).

The watch is stored in the `deploy_watch` table (additive migration). The cron runs daily and evaluates which gates are due based on `started_at`.

### Gate schedule

**Day 3**

- If `min_length` or `min_words` `form_error` events account for more than 40% of step-1 Continue attempts: **ACTION NEEDED** (soften the floor or reword the placeholder).
- If any surface shows step-1 views but zero `form_start` events vs pre-deploy baseline: **ACTION NEEDED** (probable breakage; re-run probes).

**Day 7**

- If step-2 completion rate falls below 35% AND Back clicks cluster on the phone field: **ACTION NEEDED** (design fix for the phone step).
- If zero mini-form leads have been submitted in the first week when the baseline rate is at least 3.5 per week (one-sided Poisson test): **ACTION NEEDED, consider rollback**.

**Day 14**

- If mini-form `lead_submitted` sessions are below 50% of the pre-period two-week average (one-sided Poisson p < 0.10): **ACTION NEEDED, consider rollback** (unless errors localise to a single fixable field, in which case fix forward).
- Quality counter-metric reported alongside volume: share of leads with a real role (not "Other"), messages at or above 40 characters, and verification and contactability rates vs pre-period. Volume flat plus quality up is a success verdict even if volume is slightly down.

**Day 28**

- Final before/after grouped by `flow` prop. PASS verdict closes the watch, deletes the dormant single-step branch, and records the decision in `docs/property/EXPERIMENTS_LIFECYCLE.md` and the Property `STATE.md`.

### Arming the watch

Run `scripts/arm_deploy_watch.mjs` immediately after deploy. This inserts the watch row with `started_at = now()`. The cron will not fire gates until the row exists.

---

## 6. Deploy runbook (owner-gated, single deploy)

Complete these steps in order. Do not split across sessions.

1. **Set the feature flag in Vercel prod env**: add `NEXT_PUBLIC_MINIFORMS_MULTISTEP=1`. Do not set it on preview or development yet.

2. **Apply the two additive migrations** to the production database:
   - `vw_form_step_funnel` (view: per-form_id/flow/step session counts for view, complete, back, and error events; modelled on `vw_form_field_dropoff`).
   - `deploy_watch` table (`watch_key`, `started_at`, `gate_day`, `status`, `verdict`, `payload jsonb`, `sent_at`).
   These are additive. They do not alter existing tables or columns.

3. **Deploy from the repo root** using the `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` environment variables (the root `.vercel` link is fragile and can delete itself; always use the explicit env vars):

   ```
   VERCEL_ORG_ID=<id> VERCEL_PROJECT_ID=<id> vercel --prod
   ```

4. **Arm the deploy watch**: run `node scripts/arm_deploy_watch.mjs`. Confirm the script prints the inserted `watch_key`.

5. **Run the post-deploy live probes** (mandatory before considering the deploy complete):

   The probe pattern uses a synthetic `visitor_id` with a `synthetic_` prefix (routes `is_bot=true` automatically) and rewrites `source` to `"test"` so the full real pipeline runs without polluting the lead list.

   Per surface, verify in order:
   - A 20-character message is rejected with a `form_error` event at step 1 (min_length).
   - A valid flow emits events in this exact order with `flow:"multi"`: `form_step_view(1)` → `form_start` → `form_step_complete(1)` → `form_step_view(2)` → `form_step_complete(2)` → `form_submit` → `lead_submitted`.
   - Redirect surfaces (`exit_intent`, `inline_mini`, `calc_result`, `mobile_tool`, `resource_block`) land on `/thank-you` with a `bt` token and a working "Back to the page you were reading" link.
   - `calc_result_gate` does NOT redirect; it reveals the result after the 1,800 ms success-copy delay.
   - `specialist_widget` stays in the chat thread.
   - Honeypot `enquiry_ref` is present but silent (filling it blocks submission, filling it does not appear in the event stream).
   - Ingest truth: query `web_events` for the `synthetic_` visitor; confirm all step events were accepted by the server allowlist and tagged `is_bot=true`.
   - On a preview build with the flag unset: confirm events carry `flow:"single"` (rollback rehearsal).

---

## 7. Out of scope

- **ResourceGate**: the `role:"resource"` value is load-bearing in the lead reconcile cron (`lead.role === "resource"` filter, Annex B.2 consent path). ResourceGate is unchanged.
- **Other sites**: MiniCapture and LeadForm have per-site copies on Dentists, Solicitors, Medical, Generalist, Contractors IR35, and Construction CIS. Those copies are unchanged. The divergence is noted here for the next cross-site standardisation pass.
- **Sheets sync column**: the raw database columns are safe. An optional "Came via" column in the console lead list is a flagged follow-up, not in scope here.
- **Nurture sequence copy and timing**: unchanged.
- **Reconcile re-arm**: out of scope; tracked separately.
