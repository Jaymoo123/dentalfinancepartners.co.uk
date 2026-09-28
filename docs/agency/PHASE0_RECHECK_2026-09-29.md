# digital-agency phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation). Control skipped this run
(passed once already this session on Solicitors: gov.uk @390 scrollWidth 390). Nothing deployed.

## Verdict
SAFE TO DEPLOY mechanically. One pre-existing (not phase0-introduced) sitemap gap noted, not a
regression.

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 17 at 1280, 17 at 390 | harness summary.md |
| lead form on every money page | 16/17 have 1-2; `/calculators` hub (listing page, no result) has 0, consistent with it being an index not a money page | harness |
| one form under each calculator result, no gate | 8/8 calculator routes PASS, 1-2 forms each, no popup | `PremiumCalculator.tsx:507` `gated = false` permanently, `gateOpen` state never set true |
| header CTA visible 1280 / hidden 390 | 17/17, 17/17 | harness |
| scrollWidth 390 on every page | 17/17 | harness |
| raw markup as text | 0 pages | harness |
| focus ring on first form control | 16/17 (`/calculators` hub reports `noform`, no control to test, not a defect) | harness |
| submit / primary CTA contrast >= 4.5 | 16/16 tested, flat 7.65 | harness |
| canonical self-referencing | 17/17 PASS | harness |
| sitemap lastModified real or omitted | FAIL (pre-existing, not phase0) | `sitemap.ts:83` `STATIC_LAST_MOD = new Date("2026-07-08")`, reused as the `lastModified` for static/agency/hub pages (`sitemap.ts:89,101,113,147,158,169,180`); blog and guide entries do use real dates (`sitemap.ts:125,136`). This is the "one frozen constant for every entry" pattern the brief section 5 forbids, on the static-page subset. `git diff 8e1043d0 HEAD -- digital-agency/web/src/app/sitemap.ts` is empty, so unchanged by phase0 |
| Organization node with parentOrganization | 17/17 PASS | harness `Org parent` column `PASS AccountingService`; `lib/schema/organization.ts:55` sets `parentOrganization` |
| Service / FAQPage / BreadcrumbList on segment + service pages | present on `/for-*` (0/1/1) and calculator pages | harness |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | 200 utm=84/84, 200, 200 pub=true, 200 | report.json |
| lead-nurture delayHours | first eight: 0,0,4,20,24,48,72,96 | matches expected exactly |
| defect-string count base vs HEAD | 32 vs 32, matched per file | wording_grep.txt |
| phase-0 replacement strings at HEAD | 1: `niche.config.json:12` `cta.next` | config-only, not rendered (see Findings #2) |
| tsc / vitest (if run) | not rerun this pass | relying on PHASE0 report |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. **LOW (pre-existing, unchanged by phase0)** Sitemap `lastModified` for 7 static/hub entry
   blocks uses one frozen constant `STATIC_LAST_MOD` (`sitemap.ts:83`, dated 2026-07-08) rather
   than a real per-page date or omission. `docs/agency/PHASE0_2026-09-28.md` does not mention the
   sitemap at all, so this was out of scope for the builder pass and is not a regression, but it
   is a genuine gap against brief section 5 ("never one frozen constant for every entry").
2. **LOW** `niche.config.json:12` `cta.next` new key (estate-wide, brief item 2): grepped
   `digital-agency/web/src` for `cta.next` reads — none found. Config only, not rendered.
3. **CONFIRMED** ResultGateModal import remains in `PremiumCalculator.tsx` but is dead: `gated =
   false` permanently (line 507), `gateOpen` only flips true from `onSeeResult`'s else-branch,
   which is unreachable once `gated` is false. Harness `gate` column PASS on all calculator routes.
4. **CONFIRMED** delayHours: HEAD array `0,0,4,20,24,48,72,96`, Property's shape.
5. **CONFIRMED** footer "Book a consultation" -> `/contact#form`
   (`niche.config.json:106-110`), and `/contact` renders 1 form per harness.
6. **CONFIRMED** `parentOrganization` present (Ashfield Trading Ltd, 16358723) —
   `lib/schema/organization.ts:17,55` — matches Property's pattern, unlike generalist (see that
   site's recheck).

## Wording (Opus reader section)
## Wording

Deterministic walk of `git diff 8e1043d0 HEAD -- digital-agency/` (22 files, +190/-182).
Defect-string counts match base: TOTAL base=32 HEAD=32. WORDING CLEAN: no surviving agent sentence
on any surface that existed at base.

| file | classification |
|---|---|
| `niche.config.json` (`entity` block incl. `entity.next`) | CONFIG-NOT-RENDERED. `next` sits inside `entity`, not `cta`. `grep -rn EntityBlock digital-agency/web/src` = 0 hits; `EntityBlock` (`packages/web-shared/design/marketing/EntityBlock.tsx:72`) is the only component that renders `next`. Only `entity.firm` is read, by `lib/schema/organization.ts` as the schema description. Ruling keeps `entity`. |
| `web/public/llms.txt` (168 lines) | MECHANICAL. Every changed line is the same URL with `?utm_source=chatgpt&utm_medium=llms` appended; `git diff ... \| grep -v "utm_source=chatgpt"` leaves only the untagged twins being removed. No prose line changed, no firm-voice rewrite. |
| `lib/schema/organization.ts` | MECHANICAL. Hand-rolled Organization/WebSite replaced by the shared builder with `organizationType: "AccountingService"` and `parentOrganization` Ashfield Trading Ltd 16358723. `description` now reads `niche.entity?.firm`, which is machine copy the ruling keeps. |
| 12 `components/calculators/*.tsx` + `app/admin/analytics/login/page.tsx` | MECHANICAL. `focus:outline-none` to `focus-visible:outline outline-2 outline-offset-2` on every input. No string literal touched (that is why only 3 files reach the 4+ word candidate list). |
| `components/tools/premium/PremiumCalculator.tsx` | MECHANICAL, gate removal (`const gated = false`), which the ruling keeps. |
| `app/contact/page.tsx` | MECHANICAL, one line: `<section id="form">` added so the footer link can reach the form. |
| `config/lead-nurture.ts` | MECHANICAL, delayHours now 0,0,4,20,24,48,72,96. |
| `web/next.config.ts`, `web/public/ads.txt`, `app/layout.tsx` | MECHANICAL, AdSense wiring and security header. |

No mechanical regression: form mounts base=30 HEAD=30, no `ResultGate` usage left anywhere at HEAD
(the grep returns nothing), delayHours at today's values, focus rings intact.

### Rendered read (local build, port 3523)
Read home, /about, /services, /for-new-founders, /agencies/seo-agencies, /contact,
/calculators/salary-dividend-optimiser, /fundamentals/ir35-for-agencies-pillar,
/blog/tax-and-compliance/annual-investment-allowance-agency-equipment-2025-26.
The site is in its own pre-phase-0 voice throughout. Restorations confirmed live:

- /contact: "Fill in the form and you will hear back within 24 hours, usually same day. A specialist firm from our partner network may contact you directly."
- blog CTA: "Leave your details and a one-line summary. An agency finance specialist will reply within 24 hours, with no obligation."
- calculator panel: "Want personalised advice on these figures?" / "Our team works exclusively with agency founders. We can review your situation and confirm how these calculations apply to you."
- pillar page: "Speak to a specialist accountant about your specific situation"

Zero occurrences on any rendered page of "Free first call, then a fixed fee in writing", "We reply
within 24 hours and one of our accountants", "One of our accountants will call you within 24 hours"
or "An accountant will call you then".

Nothing read machine-written or out of voice. Two base-state oddities, present at `8e1043d0` and not
phase 0's doing, noted only so they are not mistaken for new: the nav description "Free salary,
dividend and tax calculators using 2025/26 rates" and the "Free calculator · 2025/26 rates" eyebrow
sit on a page whose title and figures say 2026/27.


## What the PHASE0 report claimed that this recheck could not confirm
- tsc/vitest not rerun in this pass; relying on the PHASE0 report's own verification section.
- Detailed line-by-line wording restoration for the ~211-line PHASE0 report's "Fixed" section was
  not individually re-diffed against base text beyond the defect-string and phase-0-replacement
  counts (both clean, matched to base).

## Method notes
- Port 3423. Harness run with `--no-control` (control already passed on Solicitors earlier in this
  session); completed cleanly in one pass, 17 pages.
- Report path per brief: this site's docs live under `docs/agency/`, not `docs/digital-agency/`.
- Server killed on port 3423 after all checks; confirmed free (see final message).

## Estate summariser note (2026-09-29)
Final status: SAFE TO DEPLOY AS IS.
Blocking item: none; the frozen sitemap constant (sitemap.ts:83) is pre-existing and rides along with the shared sitemap fix.
