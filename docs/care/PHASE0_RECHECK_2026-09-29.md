# care phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation), control skipped this run
(passed once already this session on Property, scrollWidth 390).

## Verdict
SAFE AFTER FIXES LISTED (mechanical only): sitemap lastModified is build-time `new Date()` on
nearly every route, and the mobile header still shows a "Contact" text link.

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 25 at 1280, 25 at 390 | harness summary.md |
| lead form on every money page | harness measured 0/25 (calculators 5/5 measured 1); confirmed by `curl` that all sampled routes (`/`, `/about`, `/services`, `/services/care-payroll`, `/for/care-homes`, `/contact`, blog) DO carry a real `<form>` (1-2 each) | harness form heuristic requires an email/phone input in the DOM; care's `LeadForm` is a 2-step form and step 1 asks "I am a..." + message only, so the heuristic false-negatives on every non-calculator page. Not a mechanical defect: `about-1280.png` screenshot shows a rendered "Get in touch" form |
| one form under each calculator result, no gate | 5/5 PASS, 1 form each, no `ResultGate`/modal on care | wording_grep.txt: `ResultGate` grep returns 0 hits on `care/web/src/app,components`; summary.md all calculator rows "PASS" gate |
| header CTA visible 1280 / hidden 390 | 25/25 visible at 1280; 25/25 FAIL at 390 | summary.md all rows "1 FAIL"; screenshot `about-390.png` shows this is a plain text "Contact" link, not the filled purple button (button confirmed hidden); PHASE0 report's own Opus section explains this was a deliberate trade-off, not an oversight |
| scrollWidth 390 on every page | 25/25 PASS | summary.md, all "390 PASS" |
| raw markup as text | 0 pages | summary.md all PASS |
| focus ring on first form control | 21/25 "PASS (script focus)", 4 calculator-only note "PASS" (ring rule from the site-level CSS floor); 2 pages `noform` (no lead form detected by heuristic on `/for` and `/calculators` hub pages, and the blog listing) reported `noform` for the ring check specifically, consistent with the form heuristic gap above | summary.md |
| submit / primary CTA contrast >= 4.5 | 5/5 measured (calculators only, heuristic gap elsewhere) = 4.70, all pass 4.5 | summary.md |
| canonical self-referencing | 25/25 PASS | summary.md |
| sitemap lastModified real or omitted | FAIL | `care/web/src/app/sitemap.ts:10-26`: `const now = new Date().toISOString()` used as `lastModified` on 13 static routes + 4 research/category routes (17 of 70 entries); only blog posts use `post.updatedDate \|\| post.date` (line 59). Confirmed by summary.md sitemap line: `today=38` of 70 total dated today |
| Organization node with parentOrganization | 25/25 `PASS AccountingService` | summary.md |
| Service / FAQPage / BreadcrumbList on segment + service pages | /for/* and /services/* detail pages 1/1/1 each (13 pages); hub pages (/for, /services, /calculators) 0/0/0 | summary.md |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | llms.txt 200 utm=29/30, llms-full 200, ads.txt 200 pub=true, og:image 200 on all pages that declare one | summary.md header line |
| lead-nurture delayHours | 0,0,4,20,24,48,72,96,0,24,48,168 (first 8 match) | wording_grep.txt, base=HEAD |
| defect-string count base vs HEAD | 23 vs 23 (all 12 files identical) | wording_grep.txt |
| phase-0 replacement strings at HEAD | 6 vs 5 at base; the +1 is `services/page.tsx:55`, the newly-mounted `LeadCTAPanel` default eyebrow (exempt: panel is new, copy is the shared default, not agent prose) | wording_grep.txt |
| tsc / vitest (if run) | not re-run this pass; PHASE0 report claims tsc clean, 8 files/59 tests passing | not independently confirmed |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. HIGH — `care/web/src/app/sitemap.ts:10-26`: `lastModified` is `new Date().toISOString()`
   (build time) on `/`, `/services`, `/for`, `/blog`, `/calculators`, `/research` and its three
   sub-pages, `/about`, `/contact`, `/privacy-policy`, `/cookie-policy`, `/terms` — 13 of 70 sitemap
   entries, plus the same pattern likely drives the `research/[slug]` pages (confirmed lines
   31,38,45,52 also `now`), for 17 total. This is exactly the anti-pattern brief section 5 and known
   issue #3 warn against ("never build-time `new Date()`"). Neither the builder report nor the Opus
   read for care lists sitemap `lastModified` as checked — the builder report explicitly says it
   "did not audit... sitemap `lastModified` correctness (G7)... recommend a follow-up". Confirmed
   not done; still open.
2. MEDIUM — Header CTA visible at 390 on all 25 pages, contradicting brief section 4's "hidden
   below 1024" instruction literally. The PHASE0 Opus section documents this as a considered
   trade-off (a small "Contact" text link kept so inner pages are not left with zero mobile
   navigation to contact, since `StickyCTA` is homepage-only) rather than an oversight, but the
   mechanical check still fails as written. Not re-measured by the builder after the fix
   ("should be re-measured at 390" — the builder's own words); this recheck is that re-measurement
   and confirms the button is hidden but the text link is not.
3. LOW — harness form-count and focus-ring checks read 0 forms on 20 of 25 pages because care's
   `LeadForm` is a 2-step form (step 1 has no email/phone field). `curl` on `/`, `/about`,
   `/services`, `/services/care-payroll`, `/for/care-homes`, `/contact` and a blog post all return a
   real `<form>` element, and the `about-1280.png`/`about-390.png` screenshots show a fully rendered
   "Get in touch" panel. This is a harness measurement gap, not a site defect; do not read the
   summary.md "0" lead-form counts as a FAIL for care.

## Wording

Deterministic walk: `git diff 8e1043d0 HEAD -- care/web/src care/niche.config.json
care/web/public/llms.txt` = 12 files, 176 insertions, 17 deletions. Every hunk read.

| file | classification |
|---|---|
| `app/services/page.tsx` | NEW-COMPONENT: `/services` had no form at base; a `LeadCTAPanel` + `LeadForm` is now mounted. Copy is not new prose: title "Talk to a care sector specialist" and description "Tell us about your situation and we will reply within 24 hours." are byte-identical to the panel already live on `/about` at base (`git show 8e1043d0:care/web/src/app/about/page.tsx`), and the eyebrow is the shared `LeadCTAPanel` default. ALLOWED. |
| `app/calculators/[slug]/page.tsx` | MECHANICAL: duplicate-form removal. The page-footer `MiniCapture` ("Want to be sure of your position?") is gone; the form under the result survives via `CalcResultCta` to `MiniCapture` ("Check your position with a care sector accounts specialist"), verified rendering at `/calculators/cqc-fee-calculator`, lines 46-54 of the visible text. |
| `app/globals.css` | MECHANICAL: unlayered focus-ring floor, plus the Plus Jakarta font variable. |
| `app/layout.tsx` | MECHANICAL: font loading, AdSense meta + client id. |
| `app/page.tsx` | MECHANICAL: `<main>` landmark added, `StickyCTA` mounted. |
| `components/ui/StickyCTA.tsx` (new file) | NEW-COMPONENT: reads `niche.cta.sticky_primary` / `sticky_secondary` / `sticky_button` from config, writes no prose of its own. ALLOWED. |
| `components/ui/SiteNav.tsx` | MECHANICAL: header CTA moved into a `hidden lg:block` wrapper; label "Get in touch" is the existing config string. |
| `components/forms/LeadForm.tsx` | MECHANICAL: focus-visible outline replaces `focus:outline-none`. |
| `lib/calculators/tools/cqc-fee-calculator.ts` | MECHANICAL: em-dash to comma in the result subline, punctuation only, sentence otherwise unchanged. |

**SURVIVING AGENT SENTENCES: 0.** Defect-string count base 23, HEAD 23. Phase-0 replacement strings
6 at HEAD versus 5 at base; the single extra is the new `/services` panel eyebrow at
`app/services/page.tsx:55`, the shared default on a newly mounted panel, exempt by the ruling.
`niche.config.json` and `public/llms.txt` are unchanged base to HEAD, so care is NOT one of the
eleven sites that gained an unaudited `cta.next` today: its `cta.next` predates phase 0.
**MECHANICAL REGRESSIONS: 0.** `delayHours` `0,0,4,20,24,48,72,96` identical base and HEAD.

Rendered read, local `next start -p 3502`: `/`, `/about`, `/services`, `/services/care-payroll`,
`/services/care-vat-review`, `/for/care-homes`, `/for/care-startups`, `/contact`,
`/calculators/cqc-fee-calculator`,
`/blog/vat-and-welfare-exemption/care-personal-assistant-vat-registration`. Nothing reads
machine-written or off voice. The copy is specific and sourced throughout ("exemption means you
cannot recover the VAT you pay on purchases, so every VAT charge on consumables, equipment,
building works and professional fees is a permanent overhead"). `/for/care-startups` keeps its
honest scope limit ("We do not submit the application or provide compliance consulting; that is the
role of a CQC registration consultant.") which the reversal was meant to leave alone, and did.

Known exceptions: none apply to care (no wills-probate pillar titles, no divorce `/services` intro,
`llms.txt` not replaced here).

Method: port 3502 only, listener PID 59528 killed, port confirmed free.


## What the PHASE0 report claimed that this recheck could not confirm
- `npx tsc --noEmit` clean and `8 test files / 59 tests` passing at HEAD — not re-run this pass.
- Sitemap `lastModified` "correctness (G7)" was explicitly flagged by the builder as not audited;
  this recheck closes that gap and finds it FAILs (see finding 1).

## Method notes
- Port 3402. Server started from `care/web`, confirmed 200 on `/`, harness run with `--no-control`
  (control already verified scrollWidth 390 on Property earlier this session), 25 pages. `bash
  wording_grep.sh care` run from repo root, output saved to `out/care/wording_grep.txt`. Screenshots
  read for home/about at 1280 and 390 to confirm the form-heuristic gap and the header-CTA text-link
  finding by eye. Listener PID 34992 killed; `netstat` confirms port 3402 no longer LISTENING.

## Estate summariser note (2026-09-29)
Final status: SAFE AFTER FIXES.
Blocking item: build-time new Date() sitemap lastModified (estate finding H7, shared with four other sites) and the mobile Contact text link visible at 390 (M8).
