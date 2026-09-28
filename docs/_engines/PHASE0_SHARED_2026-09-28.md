# Phase 0 shared packages (2026-09-28)

Scope: `packages/web-shared`, `packages/site-styles`. No site directory, `agents/`, or `scripts/`
touched. No `next build`, `npm install`, or git write commands run.

## 1. Focus ring

Audited every `outline-none`/`outline: none` in `packages/`. Found two form controls with no
visible focus replacement (naked `focus:outline-none`, no ring, no outline utility) and fixed both
by adding the existing `focusRing` token (`packages/web-shared/design/layout-utils.ts:51`,
`focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
focus-visible:outline-[var(--kit-focus-ring,var(--color-primary-600))]`):

- `packages/web-shared/tools/components/Field.tsx:14` — added `focusRing` import.
- `packages/web-shared/tools/components/Field.tsx:87` — numeric input, added `${focusRing}`.
- `packages/web-shared/tools/components/Field.tsx:135` — select input, added `${focusRing}`.
- `packages/web-shared/console/components/VisitorsTable.tsx:146` — console search input; added an
  inline `focus-visible:outline` (emerald, matching the console's own non-brand-token colour
  scheme) rather than the brand `focusRing`, since the admin console has no `--color-primary`.

Everything else with `outline-none` already carries a visible replacement: `focusRing` itself
(`BlogListWithSearch.tsx`), a `focus:ring-2` box-shadow ring (`MiniCapture.tsx`,
`ResultGateModal.tsx`), or is a programmatic `tabIndex={-1}` scroll target, not a form control
(`MiniCapture.tsx:483,555`). No `outline-style: none` exists anywhere in `packages/` CSS
(`prose-standard.css`, `globals-standard.css`) — the transparent-box-shadow defect the readers
measured on Property/Medical/generalist is in those sites' own `globals.css`, not the shared
layer; out of scope here, flagged below.

## 2. StatsCounter literal guard

`packages/web-shared/design/marketing/StatsCounter.tsx:59-72` — added a `Number.isFinite(target)`
guard in `StatValue` so a non-finite target renders `prefix + suffix` literally instead of "0".
Investigated the actual defect commit `3f6ee5ce`, which added the `value` field; the generalist and
Medical mappers were never updated to use it. Root cause: `generalist/web/src/app/services/page.tsx:53`
(`if (!match) return { target: 0, suffix: value, label };`) and `generalist/web/src/app/page.tsx:113`
(`Number(match?.[1] ?? 0)`) both pass an explicit numeric `0`, not `NaN`/`undefined` — the component
cannot distinguish "real zero" from "mapper gave up" once the value is coerced to `0`, so a
component-only fix cannot close this specific site case. **Needs the generalist site agent**: change
both mappers to return `{ value, label }` (using the literal string) instead of `{ target: 0,
suffix: value, label }` when the regex doesn't match. Same check needed on any Medical mapper doing
the same coercion.

## 3. LeadCTAPanel defaults

`packages/web-shared/design/marketing/LeadCTAPanel.tsx:18` — `eyebrow` already defaults to "Free
first call, then a fixed fee in writing" (Property's wording). `formTitle` defaults to "Book your
free first call" (line 27) — not "free consultation" wording, no change needed. Confirmed, no edit.

## 4. Schema + analytics exports

`packages/web-shared/schema/index.ts` exports `buildOrganization`/`referencedOrganization`
(`organization.ts`), and re-exports `service.ts`, `faq-page.ts`, `breadcrumb.ts`,
`local-business.ts`, `blog-posting.ts`, `article.ts`, etc. `buildOrganization`
(`organization.ts:12`) supports `@type` via `opts.organizationType` (any site can pass
`"AccountingService"`), `sameAs`, `parentOrganization` with `companyNumber` (Ashfield Trading Ltd
16358723 fits `identifier.propertyID: "GB Companies House Number"`), and `knowsAbout`. All present;
no shared-lib gap. Confirmed, no edit.

`packages/web-shared/analytics/react/AdSense.tsx:3-6` takes `clientId`;
`packages/web-shared/analytics/react/ConsentedScripts.tsx:17-21` takes `adsenseClientId` and passes
it through to `AdSense`. Matches `Solicitors/web/src/app/layout.tsx:106-108`
(`<ConsentedScripts gaMeasurementId=... adsenseClientId="ca-pub-3756285576371279" />`). Confirmed,
no edit.

## 5. Tests / tsc

`npx vitest run` from `packages/web-shared`: **19 test files, 416 tests, all passed.**
No `tsconfig.json` exists under `packages/` (checked via `find`), so `npx tsc --noEmit` was not
run — nothing to point it at. `packages/site-styles` has no tests and no tsconfig (CSS only).

## Needs the site agents (could not touch)

- generalist: fix the two `StatsCounter` mappers (`app/page.tsx:113`, `app/services/page.tsx:53`)
  to pass `value` instead of `target: 0` for non-numeric figures.
- Medical: same check on whichever mapper feeds `AudienceStageLayout`'s `stats` prop, if any site
  data still produces `target: 0` for a non-numeric figure.
- Property, Medical, generalist and others: the readers' `outline-style: none` + transparent
  box-shadow defect lives in each site's own `globals.css`/component CSS, not in `packages/`; each
  site agent should grep their own tree for `outline-style: none` or `outline: none` with no
  paired visible `:focus-visible` rule.

## Summary

1. Focus ring: fixed 2 real gaps (`Field.tsx` x2, `VisitorsTable.tsx`), confirmed everything else
   in `packages/` already had a visible replacement.
2. StatsCounter: added a `Number.isFinite` guard against literal "0"; the generalist/Medical case
   named in the brief needs a site-level mapper fix I'm not authorised to make.
3. LeadCTAPanel: defaults already match Property's wording, verified, no change needed.
4. Schema + AdSense/ConsentedScripts exports: all present and shaped as the brief expects, verified.
5. `npx vitest run`: 416/416 passed. No tsconfig under `packages/` to run tsc against.
6. Nothing outside `packages/` touched; no build, install, or git write commands run.
7. Two follow-ups flagged above for the generalist/Medical site agents.
8. Scratch dir `C:\Users\user\.claude\jobs\933e5962\tmp\p0-shared\` was not needed; nothing left to
   delete.

## 2026-09-28 follow-up: MiniCapture focus ring

Two Opus readers flagged `packages/web-shared/leads/MiniCapture.tsx` inputs/buttons at a 25%-alpha
focus ring (effectively invisible). Confirmed: lines 37 and 39 (`inputClass`, `backBtnClass`) used
`focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/25`. Replaced both with the
shared solid-outline `focusRing` token from `packages/web-shared/components/ui/layout-utils.ts`
(same token `btnPrimary` already came from, now also imported) — a `focus-visible` 2px solid
outline at 2px offset, no alpha. `CalcResultCta.tsx` and `MobileToolSlot.tsx` render through
MiniCapture and needed no separate change. `tools/components/Calculator.tsx` renders its numeric
inputs through `Field.tsx`, already fixed earlier today — no change needed there either.

`npx vitest run` inside `packages/web-shared`: 416/416 passed. No files touched outside
`packages/`; no build, install, or git write commands run.
