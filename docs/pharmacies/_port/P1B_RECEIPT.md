# P1-B receipt — layout-utils

File touched: `pharmacies/web/src/components/ui/layout-utils.ts` only.

## What happened

Re-exported `siteContainer`, `siteContainerLg`, `contentNarrow`, `sectionY`,
`sectionYLoose` from `@accounting-network/web-shared/design/layout-utils`
(the rhythm tighten on `sectionY`/`sectionYLoose` adopted deliberately, per
brief). Kept `focusRing`, `btnPrimary`, `btnSecondary`, `btnOnDark` local,
every character the kit's except the ring (`var(--focus-ring)` in place of
the kit's hardcoded `outline-primary-600`/`outline-primary-400` literals).
Deleted `linkArrow` (zero consumers, no kit equivalent). All four `#0f3a4a`
literals and the 4 `neutral-*` classes (in old `btnSecondary`) are gone.

## Importers of the module (measured, not assumed)

19 files import `ui/layout-utils` today, not 21 as the brief's table states
— false premise, noted rather than silently corrected:

```
src/app/about/page.tsx, src/app/book/page.tsx, src/app/complete/page.tsx,
src/app/cookie-policy/page.tsx, src/app/error.tsx, src/app/for/[slug]/page.tsx,
src/app/for/page.tsx, src/app/not-found.tsx, src/app/page.tsx,
src/app/privacy-policy/page.tsx,
src/app/research/pharmacy-density-and-workload-index/page.tsx,
src/app/research/pharmacy-openings-closures-index/page.tsx,
src/app/services/[slug]/page.tsx, src/app/services/page.tsx,
src/app/terms/page.tsx, src/components/forms/BookingPicker.tsx,
src/components/forms/DetailsForm.tsx, src/components/layout/SiteFooter.tsx,
src/components/layout/SiteHeader.tsx
```

Per-symbol occurrence counts outside the module itself (word-bounded grep),
all matching the brief's table exactly: `siteContainerLg` 68, `btnPrimary` 24,
`focusRing` 23, `sectionY` 8, `contentNarrow` 6, `sectionYLoose` 2,
`siteContainer`/`btnSecondary`/`btnOnDark`/`linkArrow` 0. The API held: every
symbol with a consumer kept its name and `string` type, so none of the 19
importers needed a change.

## Recipes wrapped (API unchanged, ring swapped)

- `focusRing` — DECLINED from the kit (`layout-utils.ts:50`): kit reads
  `--kit-focus-ring`, this file's recipes point at `--focus-ring` so one grep
  (`outline-\[var\(--focus-ring\)\]`, 4 hits) finds every ring.
- `btnPrimary` — DECLINED (ring only) from `layout-utils.ts:69`/`66-67`.
  Ground comes from P1-A's `--btn-ground*` trio (brand-950, PASS). Kit ring
  hardcodes `outline-primary-600`, which measures 1.42 against the brand-950
  button ground on this site — invisible. Everything else is the kit's.
- `btnSecondary` — DECLINED (ring only) from `layout-utils.ts:72-73`. Zero
  consumers today; kept local (not deleted) per the brief's disposition table
  ("local, ring wrapped"), unlike hospitality which deleted its equivalent at
  zero consumers. Same ring swap as `btnPrimary`.
- `btnOnDark` — DECLINED (ring only) from `layout-utils.ts:76-77`. Zero
  consumers; real pre-port defect fixed (was `= btnSecondary`, a slate-900
  outline for a dark ground). Kit's own ring (`outline-primary-400`) is not
  measured here — unmounted in phase 1, the mounting phase owns that number.
- `linkArrow` — DELETED. Zero consumers confirmed (`grep -rn linkArrow src`
  before the edit returned nothing outside this file), no kit equivalent to
  decline against.

## Acceptance results

```
grep -c 'web-shared/design/layout-utils' layout-utils.ts   -> 7   (gate >= 2, PASS)
grep -coE '#[0-9a-fA-F]{3,8}' layout-utils.ts               -> 0   (PASS)
grep -c 'outline-\[var(--focus-ring)\]' layout-utils.ts     -> 4   (PASS)
grep -c 'neutral-' layout-utils.ts                          -> 0   (PASS)
grep -rn 'linkArrow' src                                    -> 2 hits, BOTH inside
   layout-utils.ts's own prose comments explaining the deletion (same shape
   as hospitality's equivalent file, which also self-matches once). Zero
   hits outside the module — no live consumer. Treat as PASS on the real
   criterion (no consumer), not a literal zero-grep-hits PASS.
npx tsc --noEmit                                             -> no output (PASS)
```

## Handoffs / dependencies noted

- Depends on P1-A's `--focus-ring`, `--btn-ground`/`-hover`/`-active`, and
  the `primary-*` ramp existing in `globals.css`. Not verified independently
  here beyond `tsc` passing (no type dependency on CSS); the rendered/visual
  check is P1-A's and the manager's build, not this package's.
- `btnOnDark`'s ring value (`primary-400` vs the brand hue) is unmeasured by
  design — flagged for whichever package first mounts it on a dark ground.
- No build, no server, no git state touched. No subagents launched.

## False premises found

- Brief's "21 files import this module" — actual count is 19. Symbol usage
  numbers in the brief's table are correct (occurrence counts); only the
  importer-file count was off. Noted, not silently fixed.
