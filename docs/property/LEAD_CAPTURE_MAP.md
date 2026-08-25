# Property lead capture map

**Audience:** the owner and anyone maintaining lead capture. **Purpose:** one page that answers "how many forms do we actually have, why, how does attribution work, and is this too complex?" Companion to `LEAD_CAPTURE_MULTISTEP.md` (the rollout runbook for the 2026-07 multi-step change).

## The one-sentence architecture

Many placements, few parts: every lead on the site is captured by one of **three components**, every submission flows through **one server chokepoint** (`/api/leads/submit`), into **one table** (`leads`), with **one attribution scheme** (`form_id`). What looks like "lots of different forms" is one shared form rendered in different places.

> **CORRECTED 2026-08-23 (design migration, Phase 8 item 10).** Three claims in the two
> tables below had gone stale and are fixed in place. Each was verified against the code, not
> assumed:
>
> 1. **`ResourceGate` is GONE, not a live exception.** `src/components/resources/` contains
>    only `CalculatorPageResources.tsx` and `GateOrForm.tsx`; there is no `ResourceGate.tsx`
>    and no `resources` component by that name anywhere. `ResourceGate`, `ResourceGateLazy`,
>    `ExcelPreview` and `/api/resources/deliver` were deleted in `5c156c51` because the gate
>    wrote **direct to PostgREST, bypassing `/api/leads/submit`**, and shipped client-side
>    Supabase keys. It stays deleted (design-migration carve-out 2). The restyled twin in the
>    designer's snapshot must not be ported back.
> 2. **`MiniCapture`'s path and placement count were both wrong.**
>    `src/components/forms/MiniCapture.tsx` is now a **42-line Property wrapper**; the real
>    component was extracted to `@accounting-network/web-shared/leads/MiniCapture`
>    (the "we deleted 739 lines" change). It has **two** consumers, not six:
>    `blog/InlineMiniLeadForm.tsx` (`inline_mini`) and `resources/GateOrForm.tsx`
>    (`resource_block`). Two further surfaces, `calculators/premium/MobileToolSlot.tsx`
>    (`mobile_tool`) and `calculators/ResultGateModal.tsx` (`calc_result_gate`), import the
>    SHARED component directly and carry their own `MiniCaptureConfig` and submit function,
>    so "there is no per-placement form code" is no longer true of those two.
> 3. **`exit_intent` is not live.** `ExitIntentModal` was removed on **2026-07-09** and
>    `src/app/layout.tsx:122` still carries the comment recording it ("inert since 06-29,
>    assistant supersedes it"). The `SpecialistWidget` handles exit intent itself with a
>    single tailored ping (`SpecialistWidget.tsx:196`). The `exit_intent` /
>    `exit_intent_form` ids survive in `role-labels.ts`, `value-score.ts` and
>    `config/deploy-watch.ts` on purpose, because historical leads carry them; a live
>    `form_id` and a historical one are different things and this table lists live ones.
>
> Also refreshed while here: **`calc_result` was removed on 2026-08-22** in the commit that
> deleted `CalcResultCta` (DECISION C2), with `deploy-watch.ts:149,176-177` restating the
> baseline in the same change. It contributed 3 starts and zero leads.

## The three components (the fourth row is a deletion, kept so nobody re-adds it)

| Component | File | What it is |
|---|---|---|
| `LeadForm` | `src/components/forms/LeadForm.tsx` | The full qualified enquiry (role, 3-part guided message, contact details). The contact page and blog side panels. |
| `MiniCapture` | `src/components/forms/MiniCapture.tsx` (42-line Property wrapper) over `@accounting-network/web-shared/leads/MiniCapture` (the component) | THE shared mini-form. Two-step since 2026-07 (role + situation, then contact details). The wrapper has **two** consumers (`inline_mini`, `resource_block`); `mobile_tool` and `calc_result_gate` bind the shared component directly with their own config. |
| `SpecialistWidget` | `src/components/support/SpecialistWidget.tsx` | The floating assistant. Email-only capture by design; the nurture detail-capture sequence collects name/phone afterwards. |
| ~~`ResourceGate` (exception)~~ | ~~`src/components/resources/ResourceGate.tsx`~~ | **DELETED in `5c156c51`** and staying deleted. It wrote direct to PostgREST, bypassing `/api/leads/submit`, and shipped client-side Supabase keys. There is no download gate on the site. |

## Placement inventory (what renders where)

| `form_id` | Component | Where the visitor meets it | Post-submit |
|---|---|---|---|
| `lead_form` | LeadForm | /contact + blog side panel | redirect to /thank-you |
| `inline_mini` | MiniCapture (Property wrapper) | mid-article, posts without a premium tool | redirect |
| `calc_result_gate` | shared MiniCapture, bound in `ResultGateModal.tsx` | before a calculator result is revealed | stays in place (must reveal the result) |
| `mobile_tool` | shared MiniCapture, bound in `MobileToolSlot.tsx` | mobile fallback where premium tools do not fit | redirect |
| `resource_block` | MiniCapture (Property wrapper) | in-article resource block | redirect |
| `specialist_widget` | SpecialistWidget | floating, site-wide | in-thread confirmation |
| ~~`exit_intent`~~ | ~~MiniCapture~~ | **RETIRED 2026-07-09.** `ExitIntentModal` deleted; `SpecialistWidget` handles exit intent itself. The id survives in `role-labels.ts` / `value-score.ts` / `deploy-watch.ts` for historical leads only. | n/a |
| ~~`calc_result`~~ | ~~MiniCapture~~ | **RETIRED 2026-08-22** with `CalcResultCta` (DECISION C2). 3 starts, zero leads. `deploy-watch`'s baseline was restated in the same commit. | n/a |
| ~~(resource gate)~~ | ~~ResourceGate~~ | **DELETED in `5c156c51`.** No gated downloads exist. | n/a |

## Attribution: one chain end to end

There is exactly one attribution scheme and it is the same on both sides of the pipe:

1. The visitor's journey is tracked as `web_events` rows keyed by `visitor_id` / `session_id`, with form events carrying `props.form_id` (the ids above) and `props.flow` (`single` | `multi`).
2. The lead row stores the same ids: `visitor_id`, `session_id`, `source_url`, and since 2026-07 `extras.form_id` (message prefixes like "[Mobile tool: ...]" are retired).
3. The lead is stitched to its session by the `stitch_lead_to_session` trigger, so "where did this lead come from" = entry page, referrer, UTM, device from `web_sessions` + the capturing surface from `extras.form_id`.
4. The handover and notify emails render it as "Came via" (labels in `src/lib/leads/role-labels.ts`); the funnel views (`vw_form_step_funnel`, `vw_form_lead_counts`) group by the same `form_id`.

Adding a placement therefore has a fixed, small contract: render `MiniCapture` with a new `formId`, add the label to `SURFACE_LABELS` in `role-labels.ts`. Nothing else changes.

## What is deliberately NOT duplicated

- Validation floors and step logic: one module, `src/lib/leads/capture-steps.ts`.
- Role options and labels: one source, `Property/niche.config.json` `lead_form.role_options`.
- Consent wording: one source, `src/config/site.ts` (contractual Annex B.1; never fork it).
- Submission, dedupe, verification, nurture enrolment: one route, `/api/leads/submit`.
- Analytics vocabulary: one allowlist, `packages/web-shared/analytics/types.ts`.

## Known cross-surface interactions (all handled)

- **Widget friction ping vs form errors:** the widget pings when a `form_error` fires. Client-side validation now emits `form_error` too, so the widget could interrupt someone mid-correction. Guarded 2026-07-07: the widget never pings while the visitor's focus is inside any form.
- **Exit-intent modal vs widget exit ping:** the modal stands down when the proactive assistant is active, so only one exit surface ever fires.
- **Result gate vs redirect:** `calc_result_gate` never redirects (it owes the visitor the calculator result).

## Is it too complex? Honest assessment

The **code** is about as consolidated as it can get: 6 of the 9 surfaces are one component with props, and the 2026-07 change removed the real divergence (different floors, missing role, prefix-encoded attribution). The remaining complexity is **placements**, and the right measure of a placement is whether it produces leads.

28-day baseline (2026-06-09 to 2026-07-07, human sessions):

| Placement | Starts | Leads | Verdict |
|---|---|---|---|
| lead_form | 39 | 21 | earns its keep |
| specialist_widget | 11 | 4 | earns its keep |
| exit_intent | 6 | 5 | earns its keep |
| calc_result_gate | 7 | 2 | earns its keep |
| inline_mini | 2 | 2 | keep, watch |
| mobile_tool | 3 | 2 | keep, watch |
| **calc_result** | 3 | **0** | retirement candidate |
| **resource_block** | 2 | **0** (2 errors) | retirement candidate |

**Simplification path (data-gated, not speculative):** at the day-28 deploy-watch review, any placement still at zero leads on the new flow gets retired (delete the wrapper component and its render site; MiniCapture itself is untouched). That would take the estate to 6-7 living surfaces without losing a single lead. The standing rule from here: no new placement without a `form_id`, a `SURFACE_LABELS` entry, and a funnel row that justifies it a month later.
