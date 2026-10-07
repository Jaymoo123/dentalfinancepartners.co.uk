# pharmacies port, phase 0 package list

Written 2026-10-07 at launch (playbook T39). Owner decisions 2026-10-07, in the session plan
(`.claude/plans/sorted-pondering-lollipop.md`): every site gets all four capture surfaces
(SpecialistWidget, DeepScrollModal, ReturningBar, StickyCTA) with Property's suppression rules;
the uplift is part of the port; budget 36 to 40 agents; no deploy, owner walks a local server.

Pre-port build: `pharmacies/web/.next` rebuilt 2026-10-07 from the working tree at `110643de7`
and served on `next start -p 3111`. Production SHA for the baseline: `981a604e` (Vercel API,
`targets.production.meta.githubCommitSha`, deployed 2026-09-23). Local HEAD is 7 commits ahead
on `pharmacies/web` (the 09-28 estate parity phase 0 + its same-day wording revert, the 09-29
calculator headline fix, the 10-02 firm-voice and em-dash commits), so production is OLDER than
this build.

Site facts derived before launch: 26 `page.tsx` (21 public incl. dynamic, 5 admin); 22 markdown
posts; 3 calculators on a local `CalculatorClient`; 2 research pages; brand `#0f3a4a`; Plus
Jakarta Sans loaded via `next/font` but overridden by an unlayered `body { font-family }` in
`globals.css` (T-H1 live); no `@theme` ramp, `:root` hex tokens only; zero
`web-shared/design/*` imports; local `SiteHeader`, `SiteFooter`, `StickyCTA` (both chrome files
and the sticky bar were added 2026-09-28 as parity stop-gaps, no kit); hand-rolled Organization
JSON-LD inline in `layout.tsx` with no `parentOrganization`; `public/brand/logo.png` referenced
by `niche.config.json` does not exist; consent text is a local string in `src/config/site.ts`;
no ring guard test; 5 test files.

Prior work this phase must read, not redo: `docs/pharmacies/PHASE0_2026-09-28.md` and
`PHASE0_RECHECK_2026-09-29.md` (estate parity phase 0, a different programme), and the owner
ruling of 2026-09-28 that reverted every rewritten sentence: **the wording we had stays**. Phase
0 fixes here are minimal, factual corrections only, never rewrites.

| pkg | scope | model | output | status |
|---|---|---|---|---|
| P0-A | claims and ground-truth audit, whole site, by rule | Opus | `P0A_CLAIMS_LEDGER.md` | DONE - 9 serious rows found across 6 rule classes; every core tax rate verified correct everywhere |
| P0-B | rendered-HTML sweep, sitemap plus served routes | Sonnet | `P0B_RENDERED_SWEEP.md` | DONE - 4 serious findings (JSON-LD @id clash, priceRange, embed chrome leak, breadcrumb schema with no UI) on 62 pages |
| P0-C | CSS, token and contrast audit | Sonnet | `P0C_CSS_TOKEN_AUDIT.md` | DONE - 2 serious findings (neutral/slate ramp split, hardcoded brand hex in layout-utils); brand contrast verified PASS throughout |
| P0-D | instrument baseline (`sweep`, `browser_check`, `cta_snapshot`) | Sonnet | `P0D_BASELINE.md` + 3 JSON | DONE - 2 serious, 4 minor live defects, both serious confined to the two research pages; baseline otherwise clean |
| P0-E | structural and disposition inventory, section 8 parameters | Sonnet | `P0E_STRUCTURAL_INVENTORY.md` | DONE - nested `<main>` on 10 of 14 probed routes, no skip link, zero web-shared/design imports; corrected storage prefix to `pfp` |
| P0-F | serious-tier fix wave | 3 Sonnet, disjoint files | commit, tag `port-pharmacies-phase0` | DONE - 7 of 9 serious rows fixed (2 left as is by the 29 Sep owner ruling); tag `port-pharmacies-phase0` |
| P0-G | deterministic re-check on the rebuilt site | Sonnet | `P0G_RECHECK.md` | DONE - 0 blockers; contrast/anchor/NaN defects to zero; 11/11 curl proofs pass; baseline otherwise byte-identical |

Solicitors deploy ambiguity, resolved by the same lookup: production `153e5017`, deployed
2026-09-24. Solicitors IS live post-port; its STATE.md "not deployed" line is stale.

## Corrections to this brief (2026-10-07, in place of the stale assumptions above)

1. **The webfont DOES apply on this site.** `layout.tsx` applies `plusJakarta.className`
   directly on `<body>`, not `<html>`, so the T-H1 risk (next/font variable on `<html>`, token
   read on `<body>`) does not reproduce here. Built CSS confirms `.__className_a11773{font-
   family:Plus Jakarta Sans,...}` resolves and outranks the unlayered `body{font-family:ui-
   sans-serif,...}` rule by ordinary specificity. Phase 1 should still run the one rendered-DOM
   `getComputedStyle(document.body).fontFamily` check before calling it closed.
2. **Storage prefix is `pfp`, not `phfp`.** Confirmed in `layout.tsx`'s `AnalyticsProvider`.
   Carry `pfp` forward; renaming it at cutover would split the site's local-storage history.
3. **The calculators already run on the kit `Calculator`.** `CalculatorClient.tsx` imports
   `@accounting-network/web-shared/tools/components/Calculator` directly, same as hospitality's
   pattern. This is a design-kit import, not a purely local calculator; phase 4 scope is styling
   parity, not first adoption.
4. **This site emits `data-cta` and `data-cta-placement` only.** There is no `data-cta-goal`
   attribute anywhere on the site (0 hits). The kit default `"form"` goal is safe to take as-is
   in phase 1, but it is a deliberate choice to make, not a silent inheritance, since there is
   nothing pre-existing to preserve.

## Phase 0 close (2026-10-07, manager)

Tag `port-pharmacies-phase0` (commit: see tag port-pharmacies-phase0). Nothing deployed, local
server only (`next start -p 3111`).

**What the recheck showed.** 0 blockers. All four P0D serious findings verify fixed: the
duplicate Organization JSON-LD `@id` clash is gone (one node per page, richer field set), no
`priceRange` anywhere, the 8 SVG NaN render errors are gone, and the 29 contrast failures on the
two research pages are gone. The 8 anchor-gap (`scroll-margin-top`) failures are also gone.
11/11 curl proofs passed. Everything not targeted by the fix wave reproduced the P0D baseline
byte-for-byte: 55/55 URLs clean, 813 internal links, 165 `data-cta` tags in the same 3 triples,
0 dead links, 0 em-dashes, 0 pipeline artefacts, 0 link-floor breaches across all 23 URL
families. `tsc --noEmit` clean; `vitest` 24/24 passing (was 21, +3 for the calculator fixes).

**Residuals.** Phase 1: skip-to-content link, breadcrumb UI (21 pages carry `BreadcrumbList`
schema with no visible trail), the `neutral-*`/`slate-*` grey-ramp split (30 files vs 7), porting
`layout-utils.ts` onto the kit and dropping the hardcoded `#0f3a4a`, the `btnOnDark =
btnSecondary` alias, the webfont rendered-DOM check, 159 hardcoded hex values in `.tsx`, the
dark-navy CTA band meeting an equally dark footer on 17 routes plus 3 adjacent-same-ground
routes (found only because this phase's full 35-route grounds sweep went wider than P0D's
sample), the `SiteFooter.resourcesHref` owner call, the missing `public/brand/logo.png` asset,
carrying `storagePrefix=pfp` forward correctly, the one-line `page.tsx:69` follow-up once that
file is back in scope, and the client-only mobile-drawer CTA that no instrument can see. Owner:
the "fixed-fee basis" promise only this site makes, the "Most popular" badge, the "Pharmacy
clients only" and "never discuss one client's position" claims, "the ranges we see most often"
wording, the unsourced "1.25x" lender-cover claim, corporation tax computed before loan interest,
and the "pound-sterling 1 million" style currency rendering in `llms.txt`.

**Agents used: 9** (5 audit, 3 fix, 1 recheck).
