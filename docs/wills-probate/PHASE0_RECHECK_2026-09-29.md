# wills-probate phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation; `--no-control` after the
control passed on pharmacies earlier this session, scrollWidth 390). Nothing deployed.

## Verdict
SAFE AFTER FIXES LISTED (mechanical only) — 1 new HIGH finding not in the PHASE0 report
(sitemap `lastModified` build-time `new Date()`), the "duplicated hero copy" flagged for re-test
is confirmed a false alarm (Next.js RSC flight payload, not visible duplication).

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 19 at 1280, 19 at 390 | harness summary.md |
| lead form on every money page | 14/19 with `leadForms>=1` (home, about, services, contact, for, all 6 `/for/*`, all 7 calculators); `/calculators` hub and `/blog` post read `noform` on harness's stricter email/phone-in-DOM check (same multi-step-form nuance as pharmacies/startups-tech) | summary.md |
| one form under each calculator result, no gate | 7/7 calculator routes, 2 forms each, harness gate column PASS (only "chat" widget flagged, not a real gate) | summary.md |
| `ResultGateModal` still in code but not live | confirmed dead code | `grep -rln "PremiumCalculator\b" web/src` finds no importer outside its own 3 files (`PremiumCalculator.tsx`, `PremiumUpgrade.tsx`, `ResultGateModal.tsx`); nothing in `app/` renders it. PHASE0 report's claim ("left as-is, no live defect") independently confirmed, not just repeated. |
| header CTA visible 1280 / hidden 390 | 19/19, 19/19 | summary.md, all rows "2 PASS / 0 PASS" |
| scrollWidth 390 on every page | 19/19 PASS | summary.md |
| raw markup as text | 0 pages | summary.md all PASS |
| focus ring on first form control | 15/15 forms with a control PASS (script-focused) | summary.md |
| submit / primary CTA contrast >= 4.5 | 20.39:1 (site-wide CTA), 5.22:1 (calculator result pill) on all 7 calculator routes | summary.md; matches PHASE0 report's addendum fix (2.68 → 5.17, harness measures 5.22, consistent) |
| canonical self-referencing | 19/19 PASS | summary.md; matches the report's claimed hub-canonical bug fix |
| sitemap lastModified real or omitted | **FAIL** | `wills-probate/web/src/app/sitemap.ts:11` `const now = new Date().toISOString()`, reused as `lastModified: now` on every static/pillar/hub route (lines 14-22+). Same anti-pattern as startups-tech. Not mentioned anywhere in `docs/wills-probate/PHASE0_2026-09-28.md` — new finding, not a phase-0 regression (pre-existing), but a real unmet section-5 requirement. |
| Organization node with parentOrganization | 19/19 harness "PASS AccountingService" | summary.md, matches report's claim of single `AccountingService` type + `parentOrganization` |
| Service / FAQPage / BreadcrumbList on segment + service pages | FAQPage present (6/6 `/for/*`=`0/1/0`, 7/7 calculators=`0/1/1`); Service and Breadcrumb largely 0 except calculators showing Breadcrumb=1 | summary.md; Service node absent estate-wide on this site's rows — not claimed as fixed in the PHASE0 report either, consistent |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | llms.txt 200, 25 UTM-tagged links, stub=false confirmed (`head -5` shows real firm-voice content, not "pre-launch STUB") | harness header line + direct read |
| og:image resolves 200 locally | 200 | `curl -s -o /dev/null -w "%{http_code}" :3433/icon.svg` = 200, matches report's fix (was pointing at missing `/brand/icon-alt.png`, now `/icon.svg`) |
| lead-nurture delayHours | 0,0,4,20,24,48,72,96 | wording_grep.txt, matches expected |
| defect-string count base vs HEAD | 37 vs 34, 2 files DIFFER (both explained) | see Findings 1 and 2 below |
| phase-0 replacement strings at HEAD | 2 (`niche.config.json:12`, `llms.txt:18`, both "We reply within 24 hours...") | `niche.config.json` config-only per AGENT_BRIEF known item 2; `llms.txt` is the named exception in `ESTATE_PARITY_WORDING_REVERT_2026-09-28.md` ("replacement of the two pre-launch STUB files... not prospect wording") |
| duplicate hero copy re-test | **NOT a visible duplication** | `curl :3433/ \| grep -o "Free calculators, real numbers" \| wc -l` = 2, but context dump shows one hit in the rendered `<h2>` and the second inside `self.__next_f.push(...)` — the Next.js App Router RSC/flight hydration payload (a script tag, invisible to users). Same pattern for the £325k stat. Matches the PHASE0 report's own addendum title "hero flight-payload false positive" — the builder had already identified and named this. |
| tsc / vitest (if run) | not rerun this pass (PHASE0 report claims clean/90 passed, one flaky pre-existing timeout) | not independently reproduced |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. HIGH — `wills-probate/web/src/app/sitemap.ts:11` uses build-time `new Date()` for every
   route's `lastModified`, identical defect to startups-tech. Never mentioned in the PHASE0
   report. Pre-existing, not introduced today, but unmet against section 5.
2. LOW (explained, not a defect) — defect-string grep shows `web/public/llms.txt` 2→0 and
   `contact/page.tsx` 2→1 between base and HEAD. Both are legitimate: llms.txt is the named
   exception (stub replacement); `contact/page.tsx:56`'s hand-rolled duplicate consent paragraph
   was deleted in favour of the shared `leadConsentText`, confirmed by diffing base vs HEAD text
   directly — the remaining defect line (36) is untouched partner-network prose the wording
   reversal correctly restored.
3. LOW (observation, pre-existing) — `SiteFooter.tsx:78` "Specialist probate and inheritance tax
   guidance. Editorial content only. Book a call for advice specific to your situation." matches
   the section-1 DEFECT pattern ("editorial content only") and is identical at base and HEAD —
   never touched by phase 0 or the reversal. Not a regression from today's work, but flagged since
   it sits in the DEFECT pattern list and nobody has addressed it either way.
4. INFO — `ResultGateModal` dead-code confirmed (see Numbers table); PHASE0 report's "left as-is,
   no live defect" claim independently verified true.

## Wording
Opus reader, 2026-09-29. Deterministic walk of `git diff 8e1043d0 HEAD -- wills-probate/web/src wills-probate/niche.config.json wills-probate/web/public/llms.txt`, every hunk adding or removing a 4+ word string literal, then a ten-route rendered read on `next start -p 3533`. Verdict: **2 SURVIVING AGENT EDITS, both deletions of consent and fee prose the reversal did not restore. 0 mechanical regressions.** The known exceptions are present and correct.

### Surviving agent edits (ranked)

1. **HIGH. `/contact` consent paragraph shortened; the 3+3 cap and the fee disclosure deleted.** `web/src/app/contact/page.tsx:57`. HEAD renders "By submitting the form you agree to us using your details to respond to your enquiry. {siteConfig.leadConsentText} See our privacy policy for full details." Base text at `8e1043d0:wills-probate/web/src/app/contact/page.tsx:56` was: "By submitting the form you agree to us using your details to respond to your enquiry. To answer it, your details may be shared with regulated firms from our specialist partner network, who may contact you directly about it. More than one firm may take up your enquiry: up to three firms in the profession you are asking about (for example a specialist probate firm), and up to three in related professions such as brokers, solicitors and advisers. We may be paid a fee by a firm your enquiry is passed to. We do not use your details for any other purpose, and you can object at any time. See our privacy policy for full details." The substituted `leadConsentText` (`web/src/config/site.ts:17`, unchanged base..HEAD) carries neither the 3+3 recipient cap nor the fee. This is the "up to six" sweep from brief section 1, not reverted, and it is the one file where the defect-string grep shows a per-file mismatch, 2 at base against 1 at HEAD. Memory `pool_model_compliance_alignment` records the 3+3 caps as the compliance control, so this reads as a disclosure removal rather than a style edit. Sister site divorce-finances still renders the full paragraph on its `/contact`, which is how this was caught.

2. **MEDIUM. Homepage fee-disclosure paragraph deleted outright.** `web/src/app/page.tsx:303-309`. Base rendered, under the homepage lead form: "By sending your details you agree to us sharing them with a relevant specialist firm so they can contact you. We may receive a fee if you go on to use their services. Full details in our privacy policy." HEAD deletes it, with a comment arguing `LeadForm` already renders `leadConsentText`. It does (`LeadForm.tsx:476`), but the shared text says nothing about a fee, so the fee disclosure is gone from the homepage. `/about` still carries one ("we may receive a fee from that firm"), which is why this is MEDIUM rather than HIGH.

### Classification of every other changed file

| file | change | class |
|---|---|---|
| `niche.config.json:2-14` | new `entity` block | MECHANICAL (schema feed) + CONFIG-NOT-RENDERED: only reader is `web/src/lib/schema.ts:30` `niche.entity?.firm`; grep of `web/src` for `cta.next` / `entity.next` = 0 lines, so `entity.next` "We reply within 24 hours and one of our accountants comes back to you directly." never reaches a page |
| `niche.config.json:34-35` | `logo_path` / `publisher_logo_url` to `/icon.svg` | MECHANICAL (the og:image 404 fix) |
| `web/public/llms.txt` | replaced entirely | KNOWN EXCEPTION, see below |
| `web/src/lib/schema.ts` | hand-rolled Organization to shared `buildOrganization` | MECHANICAL: every base field survives (name, legalName, alternateName, url, sameAs, description, address, areaServed as `serviceAreas`, knowsAbout, priceRange) plus `parentOrganization`; the `@type` array collapsed to `AccountingService` per the brief |
| `wills`, `probate`, `inheritance-tax`, `lasting-power-of-attorney` `page.tsx` | title suffix "Probate Compass" to "Estate Planning Specialists"; `alternates.canonical` added | KNOWN EXCEPTION (titles) plus MECHANICAL (canonical) |
| `about/page.tsx:104-122`, `for/page.tsx:119-137`, `services/page.tsx:76-94` | new closing `LeadForm` band on three routes that rendered no form | NEW-COMPONENT, allowed. The copy is not agent prose: "Some estates are simple. Many are not: blended families, business assets, property abroad, pensions after April 2027..." is verbatim from the site's own base homepage (`git grep -l` at `8e1043d0` finds it only in `app/page.tsx`) |
| `for/[slug]`, `page.tsx`, `thank-you`, and 12 component files | `bg-orange-500` to `bg-orange-700`, `focusRing`, `alternates.canonical` | MECHANICAL (contrast tokens, focus rings, canonicals) |
| `web/src/app/globals.css` | table overflow container | MECHANICAL |
| `web/src/config/lead-nurture.ts` | `delayHours` 24/48/96/168/264 to 20/24/48/72/96 and the comments | MECHANICAL (brief section 3); the HEAD array `0,0,4,20,24,48,72,96` is correct and survived the reversal |
| `layout.tsx`, `next.config.ts`, `public/ads.txt`, `pipeline/submit_indexnow.py` | AdSense and IndexNow wiring | MECHANICAL |

Defect-string counts base against HEAD: 37 vs 34, the entire gap in the two findings above. Every other prose file matches exactly. Form mounts 11 to 15. `ResultGate` at HEAD = 0.

### Rendered read
`/`, `/about`, `/services`, `/probate`, `/inheritance-tax`, `/for/executors`, `/for/business-owners`, `/contact`, `/calculators/probate-cost-calculator`, `/blog/probate-process/are-probate-fees-tax-deductible`.

Zero hits for "we stay on the money side" or "regulated firm we work with" on any rendered page, and zero for "Free first call, then a fixed fee in writing", "One of our accountants will call you within 24 hours" or "An accountant will call you then". The pages read exactly as the base connector voice: "We are an information service, not a law firm. If your situation needs professional hands, we can connect you with vetted specialist firms" on `/`, "Matched to a vetted specialist firm" on `/services`, "A probate specialist will reply within 24 hours, with no obligation." on the blog inline form, and the "Editorial content only" footer line that finding 3 above records. Nothing reads machine-written; the prose is the site's own.

### Known exceptions, confirmed present, not counted as defects
- **Pillar titles.** `/wills`, `/probate`, `/inheritance-tax` and `/lasting-power-of-attorney` metadata titles end "| Estate Planning Specialists"; base said "| Probate Compass", a brand the site never used. Four pages, exception confirmed.
- **`web/public/llms.txt` replaced entirely.** Base was the "pre-launch STUB, do not cite" file. Judged as a machine file: sound. Every route is listed (4 pillars, 6 audiences, 3 research pages, 7 calculators, blog categories, key pages), every URL carries `utm_source=chatgpt&utm_medium=llms`, and it dates itself "Facts current as at 2026-09-28". One caveat for the owner, which is a consequence of the reversal and not a defect in the file: the machine file and the HTML now tell different stories. llms.txt says "Estate Planning Specialists is the UK's specialist accountancy firm", "One of our accountants calls you to go through it" and "We agree the scope and a fixed fee in writing before any work starts", while every rendered page says "We are an information service, not a law firm" and offers a handoff to a third-party firm. An AI answer engine quoting llms.txt will describe a service the site does not describe, and "the UK's specialist accountancy firm" is a superlative a competitor could dispute. One for the later owner-led wording pass, in whichever direction he picks.
- The divorce `/services` intro exception does not apply to this site.

## What the PHASE0 report claimed that this recheck could not confirm
- `npx tsc --noEmit` / `npx vitest run` (claims clean / 7 files, 90 tests, one pre-existing
  flaky timeout) — not rerun this pass.
- Whether `og:image` (`/icon.svg`) renders acceptably as a social-share card on Slack/X/WhatsApp —
  report itself flags this as open (SVG rendering on real platforms), out of scope for a local
  HTTP-status check; only confirmed it resolves 200 locally.

## Method notes
- Port 3433, server started from `wills-probate/web`, killed PID 59952 after run, port confirmed
  free.
- Harness run in foreground with `--no-control`; runtime roughly 70 s for 19 pages.
- Pages sampled: 19 (home, about, services hub, contact, for hub, calculators hub, 6 for detail,
  7 calculators, 1 blog post).
- No unstyled-block or overlapping-text issue flagged by numeric checks; screenshots not
  individually opened this pass, time-boxed given full numeric PASS coverage and the duplication
  question already settled by raw-HTML inspection.

## Estate summariser note (2026-09-29)
Final status: NOT SAFE TO DEPLOY.
Blocking item: the deleted /contact consent cap and fee disclosure and the deleted homepage fee paragraph (H1, H2, a compliance matter), plus the build-time sitemap dates (H7).

## Fix round (2026-09-29)

- File: `wills-probate/web/src/app/sitemap.ts`, lines 9-83 (static/for/category/calculator/glossary/resource blocks).
- Before: every static, for, tool, glossary and resource entry set `lastModified: now` (or bare `new Date()` on the calculator block); post entries already used `post.updatedDate || post.date`; no per-entry real date exists for glossary/resource so those are undated, matching Property's pattern. This fix does not touch the H1/H2 consent-cap and fee-disclosure findings noted above, which remain blocking.
- After: `lastModified` removed from static/for/tool/glossary/resource entries; `/blog` and category entries now derive `lastModified` from the newest `updatedDate || date` among their posts; post entries unchanged. URL list emitted is unchanged.
- `npx tsc --noEmit -p wills-probate/web` — clean, no output.
- `cd wills-probate/web && npx vitest run` — `Test Files 7 passed (7)`, `Tests 90 passed (90)`.
