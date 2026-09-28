# pharmacies phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation, gov.uk control scrollWidth
390). Nothing deployed.

## Verdict
SAFE AFTER FIXES LISTED (mechanical only) — 1 real defect (raw copy false-triggers a gate regex),
rest is harness nuance, not a code fault.

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 23 at 1280, 23 at 390 | harness summary.md |
| lead form (`<form>`) on every money page | 23/23 has a `<form>` element; harness `leadForms` (email/phone input present) reads 0 on 20/23 | LeadForm.tsx is a 2-step form; email/phone fields (lines 347,370) only mount after `goToStep2`, so step-1 SSR/hydrated DOM has no email/phone input. Not a phase-0 defect: same component shape pre- and post-phase-0. |
| one form under each calculator result, no gate | 3/3 calculator routes: 1 form each | summary.md; "gate FAIL text" on `/calculators/locum-take-home-comparator` is a false positive — body copy "does not unlock the take-home figure shown" matches the gate regex `unlock (the\|your\|full)`, confirmed by `curl` (4 hits, all this one sentence). No real dialog, no PDF offer. |
| header CTA visible 1280 / hidden 390 | 23/23, 23/23 | summary.md, all rows "2 PASS / 0 PASS" |
| scrollWidth 390 on every page | 23/23 PASS | summary.md, all rows sw390=390 |
| raw markup as text | 0 pages | summary.md, all PASS; confirmed `dangerouslySetInnerHTML` at `pharmacies/web/src/app/for/[slug]/page.tsx:70,83,89,104` and `services/[slug]/page.tsx:68,81,87,102` |
| focus ring on first form control | 20/20 forms with a focusable control PASS (script-focused, not real Tab) | summary.md "(script focus)" note on every row |
| submit / primary CTA contrast >= 4.5 | 12.18:1 on all 3 calculator routes | summary.md |
| canonical self-referencing | 23/23 PASS | summary.md |
| sitemap lastModified real or omitted | PASS | `pharmacies/web/src/app/sitemap.ts:52` `lastModified: post.updatedDate \|\| post.date` (blog only); static/service/for/tool routes omit the field entirely (grep found no other `lastModified` or `new Date()` in the file) |
| Organization node with parentOrganization | 0/23 PASS by harness label, but see note | harness flags "FAIL ProfessionalService\|AccountingService" on every page — this is the harness's expected-type check (`ProfessionalService`/`AccountingService`), not a parentOrganization miss; `pharmacies/web/src/lib/schema.ts` wraps shared `buildOrganization` per PHASE0 report, not independently re-verified against the shared lib's default type here — flagged as unconfirmed, not a fail |
| Service / FAQPage / BreadcrumbList on segment + service pages | 13/13 (5 `/for/*` + 8 `/services/*`) show 1/1/1 | summary.md |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | llms.txt 200 utm=32/34 stub=false; llms-full 200; ads.txt 200 pub=true; og:image 200 on all pages with one | harness header line |
| lead-nurture delayHours | 0,0,4,20,24,48,72,96 | `pharmacies/web/src/config/lead-nurture.ts:334-471`, matches expected |
| defect-string count base vs HEAD | 21 vs 21 (my grep, all files matched per-file) | `wording_grep.txt`; PHASE0 report claims 20 vs 20 — off by one from mine, same DEFECT pattern, likely a file this run counts that the builder's manual count didn't; both show base=HEAD, so the "reverted cleanly" claim holds either way |
| phase-0 replacement strings at HEAD | 1 (`niche.config.json:12` `cta.next`) | matches AGENT_BRIEF known item 2: config-only, need to check render |
| tsc / vitest (if run) | not rerun this pass (PHASE0 report claims clean/35 passed) | not independently reproduced |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. LOW — `niche.config.json:12` `cta.next` ("We reply within 24 hours and one of our accountants
   comes back to you directly.") is present at HEAD, matching AGENT_BRIEF known item 2. Grepped
   for `cta.next` and `cta\.next` usage under `pharmacies/web/src` app/components: **no renderer
   found** (`grep -rn "cta.next\|cta\[.next.\]" pharmacies/web/src` returns nothing outside the
   config file). Config-only, not rendered. Not a wording defect.
2. LOW — harness "gate FAIL text" on `/calculators/locum-take-home-comparator` is a false
   positive from body copy, not an actual gate. See Numbers row above. No code change needed;
   flag as a harness tuning item, not a site defect.
3. INFO — harness `leadForms` count reads 0 on every non-calculator route because `LeadForm.tsx`
   is a 2-step form and email/phone inputs are step-2 only. The PHASE0 report's claim of "1 form"
   present on `/`, `/about`, `/services`, etc. (its measured table, section "Opus read") is
   confirmed at the `<form>` tag level (1 form/page, verified by curl on `/`, `/services`), just
   not at the harness's stricter "has email/phone input" bar. Not a regression; same multi-step
   shape existed before phase 0 per the file's structure. Recommend the harness treat multi-step
   forms as a pass if a `type=submit`/step-2 email field exists anywhere in the DOM tree, but that
   is tooling, not a site fix.
4. UNCONFIRMED — the PHASE0 report's schema section claims `buildOrganizationJsonLd` wraps the
   shared `buildOrganization` with `parentOrganization`. The harness's Org check fails all 23 pages
   on TYPE (`ProfessionalService`/`AccountingService`), not on the parentOrganization field
   specifically, so I could not confirm or deny the parentOrganization claim from the harness table
   alone; would need a raw JSON-LD dump to settle, not done this pass (time-boxed, low risk — the
   PHASE0 report's own verification section did not measure JSON-LD directly either).

## Wording
Opus reader, 2026-09-29. Deterministic walk of `git diff 8e1043d0 HEAD -- pharmacies/web/src pharmacies/niche.config.json pharmacies/web/public/llms.txt`, every hunk adding or removing a 4+ word string literal, then a ten-route rendered read on `next start -p 3531`. Verdict: **WORDING CLEAN. 0 surviving agent sentences, 0 mechanical regressions.**

| file | change | class | evidence |
|---|---|---|---|
| `niche.config.json:2-14` | new `entity` block (`firm`, `serves`, `where`, `howItWorks[4]`, `next`) | MECHANICAL (machine copy feeding schema) + CONFIG-NOT-RENDERED for all but `firm` | only reader is `web/src/lib/schema.ts:24` `niche.entity?.firm ?? siteConfig.description`; grep of `web/src` for `entity.next` / `cta.next` returns 0 lines, so "We reply within 24 hours and one of our accountants comes back to you directly." never reaches a page. Confirms finding 1 above: the key sits under `entity`, not `cta` |
| `web/public/llms.txt` | every URL gains `?utm_source=chatgpt&utm_medium=llms`; one new "Attribution and traffic tagging" section | MECHANICAL (the ruling keeps llms.txt UTM tagging) | no prose line changed; the diff is query strings plus the tagging paragraph |
| `web/src/lib/schema.ts` | hand-rolled Organization replaced by shared `buildOrganization`; new `buildServiceJsonLd` | MECHANICAL (schema builder) | every base field survives (name, legalName, alternateName, url, logo, description, address, areaServed, priceRange, knowsAbout, sameAs) plus `parentOrganization`, which is passed explicitly at `schema.ts` in the `buildOrganization` call. That is source-level confirmation of the claim finding 4 above could not settle from the harness table |
| `web/src/app/about/page.tsx:34-53` | new `LeadForm` band (route had none at base) | NEW-COMPONENT, allowed | the copy is the site's OWN base copy, not agent prose: `git show 8e1043d0:pharmacies/web/src/app/services/[slug]/page.tsx:97-98` is verbatim "Speak to a pharmacy finance specialist." / "Tell us about your situation and we will reply within 24 hours." |
| `web/src/app/services/page.tsx:40-58` | same new band | NEW-COMPONENT, allowed | same base-copy proof |
| `web/src/app/calculators/[slug]/page.tsx` | `MiniCapture` footer duplicate removed (heading "Want to be sure of your position?" and its blurb go with it); `title: { absolute: ... }` | MECHANICAL (duplicate-form removal) | one form remains, `CalcResultCta` under the result, no gate; `ResultGate` grep at HEAD = 0 |
| `web/src/app/globals.css:29-39` | `.prose table` overflow container | MECHANICAL | comment only, no prose |
| `web/src/data/pharmacies-services.ts:133` | headline "The mix is the whole point." to "The mix is the whole point" | punctuation only, LOW | the only prose-file string literal touched base..HEAD; a full stop, not a sentence |

Defect-string counts match exactly base vs HEAD, 21 vs 21 across 12 files. `delayHours` = `0,0,4,20,24,48,72,96` at HEAD (base `0,0,4,24,48,96,168,264`), so the nurture fix was NOT undone by the reversal. Form-mount files 6 to 8. No mechanical regression found.

### Rendered read (local `next start -p 3531`, ten routes)
`/`, `/about`, `/services`, `/services/pharmacy-vat-retail-schemes`, `/services/pharmacy-sale-cgt-badr`, `/for/pharmacy-owners`, `/for/locum-pharmacists`, `/contact`, `/calculators/pharmacy-purchase-affordability`, `/blog/nhs-contract-and-income/how-fp34-payment-cycle-works`.

Zero hits for any phase 0 phrase on any route: "Free first call, then a fixed fee in writing", "We reply within 24 hours and one of our accountants", "One of our accountants will call you within 24 hours" and "An accountant will call you then" all return 0 in the rendered text. Every call to action reads the site's own pre-phase-0 strings: sticky "Speak to a pharmacy finance specialist / Free, no-obligation reply within 24 hours" (`8e1043d0:pharmacies/niche.config.json:98`), `/contact` "Tell us about your pharmacy situation. We reply within 24 hours.", calculator "No obligation, and we reply within one working day."

Pre-existing wording the reversal correctly restored, recorded so nobody reads it as a new defect:
- The segment closer pastes the slug into English: "Tell us about your pharmacy owners situation and we will reply within 24 hours." (`web/src/app/for/[slug]/page.tsx:118`, identical to base line 101). Phase 0 brief section 4 asked for this to be fixed; the reversal put the template back, so it stands. Same shape on all five `/for/*`.
- Blog inline form: "Leave your details and a one-line summary. A specialist will come back to you, with no obligation." and the consent line "your details may be shared with a firm from our specialist partner network" render on every calculator and blog route. Both are base text; the consent sentence is explicitly exempt per brief section 1. Flagged as the visible cost of the reversal, not a defect against the ruling.

No known exception applies to pharmacies (the three flagged exceptions are wills-probate and divorce-finances only).

## What the PHASE0 report claimed that this recheck could not confirm
- `parentOrganization` present in the Organization JSON-LD (report claims it was added) — harness
  does not surface this field directly, see finding 4.
- `npx tsc --noEmit` / `npx vitest run` results (report claims clean/35 passed after reversal) —
  not rerun this pass; out of scope for a render-only recheck and the brief did not ask for it.
- house_positions.md ground-truth staleness — report flags it as open/not re-checked; this recheck
  did not touch it either (out of scope: this is a numbers/render recheck, not a tax-facts audit).

## Method notes
- Port 3431, server started from `pharmacies/web`, killed PID 32296 after run, port confirmed
  free.
- Harness runtime: harness ran once in background (finished before spot checks), then rerun in
  foreground per coordinator instruction, both consistent; total elapsed roughly 90 s render time
  for 23 pages.
- Pages sampled: 23 (home, about, services hub, contact, for hub, calculators hub, 8 services
  detail, 5 for detail, 3 calculators, 1 blog post).
- Screenshots not visually inspected beyond the table data (time-boxed); no unstyled-block or
  overlapping-text issue was flagged by the numeric checks (sw390 PASS on all 23, raw markup PASS
  on all 23), so visual spot-check was treated as lower priority this pass.
- gov.uk control ran once this session: scrollWidth 390, trusted for the whole run.

## Estate summariser note (2026-09-29)
Final status: SAFE TO DEPLOY AS IS.
Blocking item: none.
