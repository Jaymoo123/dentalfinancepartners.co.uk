# ecommerce phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation). Control skipped this run
(passed once already this session on Solicitors: gov.uk @390 scrollWidth 390). Nothing deployed.

## Verdict
NOT SAFE: `lead-nurture.ts` `delayHours` is unchanged from base (25-day nurture run, not the
required 4-day), confirming the known HIGH issue; footer "Book a consultation" reaches a page
(`/book`) that renders 0 forms without a token.

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 23 at 1280, 23 at 390 (1 route flaked once on a `TimeoutError`, rerun alone and passed) | harness summary.md |
| lead form on every money page | form mounts present on 22/22 template files (`wording_grep`), but the harness's `leadForms` counter reads 0 site-wide | see Findings #2: 2-step wizard, not a real absence |
| one form under each calculator result, no gate | no `ResultGate`/`ResultGateModal` in source at all (wording_grep gate section returns empty) | clean |
| header CTA visible 1280 / hidden 390 | 23/23, 23/23 | harness |
| scrollWidth 390 on every page | 23/23 | harness |
| raw markup as text | 0 pages | harness |
| focus ring on first form control | reads `noform` throughout (harness form-step blind spot, see #2) | harness |
| submit / primary CTA contrast >= 4.5 | not measurable this run (no form detected by harness) | harness |
| canonical self-referencing | 23/23 PASS | harness |
| sitemap lastModified real or omitted | PASS | `sitemap.ts:12-13` comment + `sitemap.ts:67` `post.updatedDate \|\| post.date` |
| Organization node with parentOrganization | 0/23 FAIL | harness `Org parent` column `FAIL ProfessionalService\|AccountingService`; `grep parentOrganization ecommerce/web/src/lib/schema.ts` = 0 hits |
| Service / FAQPage / BreadcrumbList on segment + service pages | present, `/for/*`, `/services/*`, `/vat/*` all 1/1/2 | harness |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | 200 utm=33/35, 200, 200 pub=true, 200 | report.json |
| lead-nurture delayHours | **HEAD identical to base: 0,0,4,24,48,96,168,264** | wording_grep.txt; matches the known issue exactly |
| defect-string count base vs HEAD | 28 vs 28, matched per file | wording_grep.txt |
| phase-0 replacement strings at HEAD | 1: `niche.config.json:12` `cta.next` | config-only, not rendered |
| raw-HTML-anchor body copy renders as links | confirmed on `/services/ecommerce-vat-compliance` (screenshot, rendered prose, no markup leak); harness `raw markup` column PASS on every `/services/*` and `/for/*` route | screenshot + harness |
| tsc / vitest (if run) | not rerun this pass | relying on PHASE0 report (claims 50/50 passing) |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. **HIGH (known, confirmed)** `ecommerce/web/src/config/lead-nurture.ts` `delayHours` first
   eight values are `0,0,4,24,48,96,168,264` at HEAD, byte-identical to base `8e1043d0`. No commit
   touched this file's array (`wording_grep` shows `base:` and `HEAD:` lines identical). Nurture
   runs ~25 days instead of the required ~4. `docs/ecommerce/PHASE0_2026-09-28.md:208-210` says
   "Form-mount and `delayHours` greps still show today's state" — that line does NOT actually
   quote or verify the array, and this recheck shows the claim is wrong: the array was never
   changed. Deploying on this build ships the same defect that was supposed to be the fix.
2. **MEDIUM (harness blind spot, not a site defect)** Harness reports `leadForms=0` and `noform`
   on every single page. Cause: `LeadForm.tsx` is a 2-step wizard — name/step-0 renders first,
   email (`type=email`, line 317) and phone (`type=tel`, line 340) fields only mount at `step===1`
   after "Continue" is clicked (`LeadForm.tsx:285-368`). The harness's selector
   (`input[type=email],input[name*=email i],input[type=tel],input[name*=phone i]`) never sees
   step-1 fields on first paint. Confirmed by manual `curl`: home page HTML has exactly 1 `<form>`
   tag. Not a defect, but the harness numbers for this site (`forms`, focus ring, CTA contrast) are
   not trustworthy and were not usable evidence for this recheck.
3. **MEDIUM** Footer "Book a consultation" -> `/book` (`PageShell.tsx:122-126`); `/book` renders
   0 `<form>` tags without a `?t=` token (confirmed `curl`), falling back to a `NoticeCard` with a
   link to `/contact` (`app/book/page.tsx:61-77`). This is one click short of brief section 4's
   "must reach a page that renders a form" — the target itself has no form, only a link to one.
   Same shape as the "thirteen others" the brief names as failing (Property included); ecommerce
   was not checked in the wills-probate/divorce-finances kind of exemption list.
4. **CONFIRMED** No `parentOrganization` anywhere: `ecommerce/web/src/lib/schema.ts` has no
   `parentOrganization` field or reference (0 grep hits). Same class of gap as generalist.
5. **CONFIRMED (not a defect)** `public/brand/logo.png` does not exist (known missing per brief).
6. **CONFIRMED (not a defect)** `+44 20 0000 0000` (`niche.config.json:44`) does not render
   anywhere on the rendered home or contact page HTML (checked via `curl`); it is not wired to any
   template. Owner input placeholder, not leaking to the public site.

## Wording (Opus reader section)

Deterministic walk of `git diff 8e1043d0 HEAD -- ecommerce/web/src ecommerce/niche.config.json ecommerce/web/public/llms.txt`.
Defect-string counts match base: TOTAL base=28 HEAD=28. WORDING CLEAN: no surviving agent sentence.
One MECHANICAL REGRESSION (see below).

| file | classification |
|---|---|
| `niche.config.json` (`entity` block incl. `entity.next`) | CONFIG-NOT-RENDERED. `next` is inside `entity`, not `cta`. `grep -rn EntityBlock ecommerce/web/src` = 0 hits, and `EntityBlock` (`packages/web-shared/design/marketing/EntityBlock.tsx:72`) is the only renderer of `next`. Ruling keeps `entity`. |
| `app/about/page.tsx`, `app/for/page.tsx`, `app/services/page.tsx`, `app/vat/page.tsx`, `app/calculators/[slug]/page.tsx` | NEW-COMPONENT MOUNT, allowed, and the copy is NOT authored: a `LeadCTAPanel` + `LeadForm` added to five routes that rendered zero forms, with `eyebrow=""`, `formTitle=""` and `proofPoints={[]}` so no shared default publishes copy. `title`/`description` are this site's own base strings, verified byte for byte: `git show 8e1043d0:ecommerce/web/src/app/services/[slug]/page.tsx` lines 271-272 give "Speak to an ecommerce tax specialist." / "Tell us about your situation and we will reply within 24 hours."; `git show 8e1043d0:ecommerce/web/src/app/vat/[slug]/page.tsx` lines 253-254 give the VAT variant used on `/vat`. On `/calculators/[slug]` `formTitle` is the tool's own `ctaLabel`, which the route already published. |
| `app/for/[slug]/page.tsx`, `app/services/[slug]/page.tsx`, `lib/schema.ts` | MECHANICAL. `buildSegmentPageSchema` (Service + FAQPage + BreadcrumbList) added; no prose. |
| `app/layout.tsx` | MECHANICAL, AdSense wiring only. |
| `app/sitemap.ts` | MECHANICAL, build-time `new Date()` removed, real content dates kept on blog routes. |
| `web/public/llms.txt` | MECHANICAL. Every changed line is the identical link with `?utm_source=chatgpt&utm_medium=llms` appended; the removed lines are the untagged twins. No description or prose line rewritten. |
| `config/lead-nurture.ts` | **MECHANICAL REGRESSION, HIGH.** `delayHours` at HEAD is still `0,0,4,24,48,96,168,264`, byte-identical to base; the ruling keeps the nurture arrays as a mechanical change, and the brief's expected array is `0,0,4,20,24,48,72,96`. Nurture therefore runs about 25 days instead of 11. No commit ever touched this file on this site. `docs/ecommerce/PHASE0_2026-09-28.md` line 209 claims otherwise. (Known item 1 in the agent brief, verified here.) |

Form mounts base=22 HEAD=22 (the five new panel mounts are inside files that already imported the
form elsewhere or are counted once per file); no `ResultGate` usage anywhere at HEAD.

### Rendered read (local build, port 3524)
Read home, /about, /services, /services/ecommerce-vat-compliance, /for/amazon-sellers, /for/dropshippers, /services/settlement-payout-reconciliation, /vat/135-import-rule, /vat/ioss-vs-oss, /contact, /calculators/vat-threshold-tracker,
/blog/business-structure-and-tax/online-seller-formation-trends.
The site reads in its own pre-phase-0 voice everywhere. Restorations confirmed live:

- /about body: "We support accounts, VAT compliance, settlement reconciliation and tax returns for ecommerce businesses. This page is being prepared and will set out our approach in more detail." This is the `8e1043d0` text, so the /about revert the ruling named has landed.
- /contact: "Tell us about your online selling. We reply within 24 hours."
- blog CTA: "Leave your details and a one-line summary. A specialist will come back to you, with no obligation."

Zero occurrences on any rendered page of "Free first call, then a fixed fee in writing", "We reply
within 24 hours and one of our accountants", "One of our accountants will call you within 24 hours"
or "An accountant will call you then".

One sentence DOES read machine-written, and it is base text, not phase 0's: every `/for/*` page
interpolates the hub title into the panel line, so `/for/dropshippers` renders "Tell us about your
dropshippers situation and we will reply within 24 hours." The template is
`app/for/[slug]/page.tsx`, unchanged since `8e1043d0` (`git show 8e1043d0:...` line 273 carries the
same `${hub.title.toLowerCase()}` interpolation). This is the slug-in-English shape the phase 0
brief section 4 called out; it survives because the wording pass was reversed. Flagged for the
owner-led wording pass, not as a revert failure.

One further base-state observation for the owner, not a
finding against the revert: /about is now back to a two-paragraph page that says of itself "This
page is being prepared", which is thin for a money page carrying a lead form.

## What the PHASE0 report claimed that this recheck could not confirm
- tsc/vitest (claimed 7 files, 50/50 tests passing) not rerun this pass.
- Finding #1 directly contradicts the PHASE0 report's implication that `delayHours` reflects
  "today's state" — it does not; base and HEAD are identical.

## Method notes
- Port 3424. Harness run with `--no-control`; one page (`/about`) hit a Puppeteer navigation
  `TimeoutError` in the full 23-page batch, rerun alone with `--pages /about` and passed cleanly
  (200, all columns normal) — treated as a transient flake, not a site defect.
- Server killed on port 3424 after all checks; confirmed free (see final message).

## Estate summariser note (2026-09-29)
Final status: NOT SAFE TO DEPLOY.
Blocking item: lead-nurture delayHours was never changed from base (H3), no parentOrganization (M3) and the footer Book a consultation link reaches a page with no form (M7).

## Fix round (2026-09-29)

1. **H3** `ecommerce/web/src/config/lead-nurture.ts` lines 306-443 (contactability
   track, `t0_email` through `breakup_day11`). Before: `delayHours` 0, 0, 4, 24,
   48, 96, 168, 264. After: 0, 0, 4, 20, 24, 48, 72, 96 (gap-per-step, matching
   Property's `Property/web/src/config/lead-nurture.ts`). Comment at line
   296-297 corrected to match. Second track (`config/lead-nurture.ts` lines
   525-601, `detail_capture`) untouched: 0, 24, 48, 168. No test asserted the old
   values; `vitest run` still 50/50.
2. **M3** `ecommerce/web/src/app/layout.tsx` lines 61-105 (`organizationJsonLd`,
   the node `app/layout.tsx` actually renders on every page - confirmed
   `buildOrganizationJsonLd` in `lib/schema.ts` is dead per its own comment at
   `schema.ts:115-124`). Added a `parentOrganization` field after `sameAs`
   (lines 95-104), shaped exactly like `packages/web-shared/schema/organization.ts`
   `buildOrganization()`'s `parentOrganization` branch (`@type: "Organization"`,
   `name: "Ashfield Trading Ltd"`, `identifier: {"@type":"PropertyValue",
   propertyID:"GB Companies House Number", value:"16358723"}`). All prior
   fields (name, legalName, url, description, logo, address, areaServed,
   knowsAbout, sameAs) are unchanged; diff is a pure addition (`git diff --stat`
   = 12 insertions, 0 deletions on this file). JSON diff summary: before had no
   `parentOrganization` key; after adds exactly that one key with the object
   above, nothing else changed.
3. **M7** `ecommerce/web/src/app/contact/page.tsx` line 61: added `id="form"`
   to the `<section>` wrapping `LeadForm` (only markup change, no copy touched).
   `ecommerce/web/src/components/layout/PageShell.tsx` line 122: footer
   "Book a consultation" href changed from `/book` to `/contact#form`. `/book`
   page itself untouched.

tsc: `npx tsc --noEmit -p ecommerce/web` - clean, no errors.
vitest: `npx vitest run` (ecommerce/web) - 7 files, 50/50 tests passed.
