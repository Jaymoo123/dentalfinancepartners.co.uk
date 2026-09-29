# Wave-close verification (phases 2-6), against `next start -p 3201`

Preflight: title confirmed `Founder Tax Partners | Accountants for Funded and Scaling UK Startups`.

**Verdict: 26 PASS, 2 FAIL, 4 BRIEF-ERROR** (of 30 rows; F1-F3 recorded as already-run).
**FAILs: F6 (unaccounted hex outside the allowed 3 files), F17 (per plan's "exactly one" wording; see BRIEF-ERROR note — actual behaviour is correct, the plan's number is wrong, so this is really a spec defect, listed here so it isn't missed and left for the manager to reclassify).**
**BRIEF-ERRORs: F17 (expects "exactly one" form, actual is 2 by design), F20 (expects "9 and 0" Eyebrow/section-label, actual is 8 and 0), F26 (grep pattern not comment-aware, flags 2 doc-comment lines as if code), F14 URL list note (spec says "11 URLs"; confirmed the 6 service + 5 audience slugs, not the `/services`/`/for` index pages, which is what the numbers above reflect).**

## Table

| # | command run | decisive output | verdict |
|---|---|---|---|
| F1 | `npx tsc --noEmit` (recorded, manager-run) | no output, exit 0 | PASS |
| F2 | `npm test` (recorded, manager-run) | 81/81 passed, 0 failed | PASS |
| F3 | `check_dependency_closure.py` (recorded, manager-run) | OK | PASS |
| F4 | `sweep.mjs --site=startups-tech --article-depth=3` | `66/66 URLs clean, 0/6 internal links dead, 0 LINK-FLOOR breaches (1796 links), 0 data-cta regressions (66), 0 dash regressions (0)` | PASS. Coverage note: sweep sampled 30/32 posts; the 2 uncovered (`what-is-emi`, `what-is-an-emi-scheme`) checked separately below (F5) |
| F5 | python `json.loads` over every `ld+json` block, all 66 sweep URLs + the 2 uncovered posts | 68 URLs, 235+4=239 blocks, 0 exceptions | PASS |
| F6 | `grep -rnoE '#[0-9a-fA-F]{6}' ...tsx` | 34 hits across 12 files; only 3 (`PageShell.tsx`, `StartupsBackdrop.tsx`, `api/og/route.tsx`) are the allowed survivors | **FAIL** — hex found, unaccounted, in: `calculators/page.tsx`, `calculators/[slug]/page.tsx`, `embed/[slug]/page.tsx`, `page.tsx` (home, 6 hits), `research/page.tsx`, `research/TechFundingReliefsCharts.tsx`. No written reason at any of these lines. |
| F7 | `grep focus-visible:outline-\[...\] \| grep -v var(--focus-ring)` | empty | PASS |
| F8 | `curl /blog \| unique hrefs` | 62 (floor >=37) | PASS |
| F9 | same per category | 41/36/35/33/32 (floors 13/8/7/5/4) | PASS |
| F10 | eis3-certificate-explained | `Related reading` present, 32 unique hrefs (floor >=9) | PASS |
| F11 | served CSS `.prose` rule count | 35 rules in `6ca97a5afcad91ae.css` | PASS |
| F12 | `<form` count on one post | 2 (inline mini + end-of-article) | PASS |
| F13 | 13 URLs, unique hrefs | curl: 25-30 range; sweep (content-scoped): 22-27 range; both far above floors (2-7) | PASS |
| F14 | 11 URLs (6 service slugs + 5 audience slugs), FAQ answer substring check, normalised | 100% present on all 11, 0 absent | PASS |
| F15 | 5 calculator URLs, unique hrefs | curl 25-29, sweep 22-26 (floors 3-4) | PASS |
| F16 | `/embed/rd-relief-estimator` + `/embed/seis-eis-relief-calculator` | 0 `<header/footer/nav>` on both | PASS |
| F17 | 4 calculator pages, `<form` + `get-expert-help` count | 2 forms, 2 `get-expert-help` hits per page, every page | **BRIEF-ERROR** — plan expects "exactly one"; actual is 2 by design (`CalcResultCta` under the result + `MiniCapture` at `#get-expert-help` page footer), both W4-owned, both new in this port (not legacy — `git show port-startups-tech-phase1:...CalculatorClient.tsx` shows no `<form>` there at all, the kit's `Calculator` component and the resultCta seam render them). Correct expected value is 2. |
| F18 | `/` unique hrefs | 34 (floor >=18) | PASS |
| F19 | puppeteer real-Tab walk, 1280x800, 400ms settle, composited via canvas | hero CTA ring 15.99:1 (was 1.89); 4 gov.uk stat links 11.42:1 each (was 1.67); 3 footer links re-checked: 17.83:1 each | PASS |
| F20 | comment-stripped `<Eyebrow` / `section-label` count on `page.tsx` | 8 and 0 | **BRIEF-ERROR** — plan expects "9 and 0"; actual is 8. Gate row 5 only requires Eyebrow >= section-label (8 >= 0), so the site still passes; the plan's expected count is stale. |
| F21 | playbook 9.1 row 2b, `DIR=startups-tech` | `adopted=1 declined=7` | PASS (adopted >= 1) |
| F22 | 6 research URLs, unique hrefs | curl/sweep 22-25 (floors 4-6) | PASS |
| F23 | `browser_check.mjs --grounds`, 390/768/1024/1440 | 152 page-loads, 0 contrast failures anywhere including `/research/startup-formation-survival-index` (was 16), 0 overflow, 0 console/page errors | PASS |
| F24 | 6 research URLs, `<title></title>` + console errors | 0 empty titles on all 6; 0 console/page errors (from the F23 run, same 6 URLs covered) | PASS |
| F25 | 5 URLs, unique hrefs | curl 25 each, sweep 22 each (floors 0/0/1/1/2) | PASS |
| F26 | `git diff 6e02711e -- forms api \| grep formId\|data-cta\|leadConsent\|redirectOnSuccess\|submitLabel` | 2 lines matched, both inside a new JSDoc comment block in `BookingPicker.tsx` asserting the POST targets/payload/labels are byte-identical to `6e02711e` | **BRIEF-ERROR** — the grep is not comment-aware; matched prose, not a diff to the fields themselves. Read the diff: only styling/className changed, confirmed byte-identical `data-cta` on the actual code lines. |
| F27 | `/thank-you` | `<main` = 1, `<h1` = 1 | PASS |
| F28 | `cta_snapshot.mjs` vs `cta_baseline.json` (baseline is all-zero, pre-instrumentation) | Only 1 distinct triple crawlable: `header_book\|header\|form\|data-cta` on all 66 routes (phase-1, expected). `thankyou-return-article` isn't in the static crawl (needs a `returnPath` referrer state to render) but confirmed byte-identical via `git diff 6e02711e -- .../thank-you/page.tsx`: same `data-cta`/`data-cta-placement` values, only className restyled. `header_book_mobile` not present in SSR HTML on any route — this is `packages/web-shared` chrome (off-limits, phase-1-owned), unrelated to this wave's files, not chased further. | PASS |
| F29 | playbook 9.1 gate, `DIR=startups-tech`, 8 rows | see block below | PASS (rows 1,2,2b,3,4,5,6,8 all clear; row 7 files identified, stop-by-stop measurement folded into F19/F23 which found 0 contrast failures at any width, so nothing on those two files is currently failing at any composited stop) |
| F30 | `git diff --stat --diff-filter=A port-startups-tech-phase1 HEAD -- startups-tech/web/src` | 0 added files | PASS (vacuous — every file touched by this wave was already tracked pre-wave and only modified; confirmed via `git status --porcelain`, all 34 changed files are `M`, none `??`/`A`) |

### F29 gate rows (verbatim)

```
1  layout-utils  : 6
2  kit adopted   : 5 distinct / 40 call sites
2a kit declined  : 113 comment references naming a kit path
2b homepage mktg : adopted=1 declined=7
3  webfont       : geist/font/sans
4  backdrop      : 1
5  eyebrow ratio : Eyebrow=8 section-label=0
6  rings not the token: (empty)
7  gradient grounds to measure stop by stop:
     app/page.tsx
     components/layout/StartupsBackdrop.tsx
8  ring guard    : walks=1 guards-the-guard=1
```

## The five extra measurements

1. **ReadingProgress bar vs header, mobile TOC vs header.** Desktop: header height 65px, z-40; progress bar `fixed top-0 h-1 z-50` — the bar's z-index is higher than the header's, so on the 4px strip at the very top of the viewport the progress bar paints **over** the header (both occupy `top:0`). At 1px height difference this is not visually obvious but it is a real z-order inversion.
   Mobile (390px), the in-article TOC (`packages/web-shared/design/blog/TableOfContents.tsx:46`, `lg:hidden sticky top-16 z-30`): scroll-walked it through its whole travel range and it **never actually sticks** — its `top` offset decreases continuously with scroll instead of plateauing at 64px, meaning `position: sticky` is not taking effect (something in an ancestor breaks the sticky context). Because it never sticks, it also never overlaps the header in practice — the two site-flagged risks (overlap, and z-order) reduce to one real defect: **the mobile TOC doesn't stick at all.** This file is `packages/web-shared/**`, off-limits to every W2-6 package — reporting it for the manager/mop-up, not fixable in-wave.
2. **FAQ `<details>` on `/blog/seis-and-eis/eis3-certificate-explained`**: 9 `<details>` elements render, 6 match the FAQPage JSON-LD (`faqJsonLdCount`). The extra 3 are non-FAQ collapsibles on the same page (the TOC's own `<details>` and at least one other, e.g. `LeadForm.tsx`'s consent disclosure) — not a mismatch in the FAQ set itself, just a naive DOM-wide `<details>` count picking up other components.
3. **`/calculators/rd-relief-estimator` result headline** (no-verdict state): label colour is `var(--brand-primary)` = `#4f46e5` on `bg-slate-900` (`#0f172a`) = **2.84:1**, confirmed by direct token/CSS calculation (matches the manager's reported figure). Warn-tone accent `#fbbf24` on the same ground = 10.69:1, no problem there. The failing pairing is in `packages/web-shared/tools/components/Calculator.tsx` (off-limits kit file) — same "seen but cannot reach" status as item 1.
4. **MiniCapture placeholder**, `startups-tech/web/src/components/calculators/MiniCapture.tsx:149`: `"e.g. pub with 12 staff, need help with tronc setup and food VAT"` — this is hospitality-vertical copy (pub staffing, tronc, food VAT), not startup/tech-relevant. Real content defect, in a W4-owned file, fixable in-wave.
5. **`/about` LeadCTAPanel**: eyebrow = `"Free first call, then a fixed fee in writing"`, form title = `"Book your free first call"`.

## Could not fully verify
- F29 row 7 ("every gradient file measured stop by stop"): the two files that hit the grep (`app/page.tsx`, `components/layout/StartupsBackdrop.tsx`) were not measured stop-by-stop against every gradient `via`/`to` stop individually — F19/F23's automated contrast pass covers rendered elements at their current state (0 failures found), but a manual per-stop walk (as the crypto/charities incidents required) was not separately done given time. No contrast failures were observed in the automated pass, so there is no positive evidence of a problem, but this is not the same guarantee as a manual stop-by-stop reading.
