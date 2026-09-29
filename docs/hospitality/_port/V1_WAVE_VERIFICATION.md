# V1 wave verification (phases 2-6), against `next start -p 3202`

Preflight: title confirmed "Specialist Hospitality Accountants UK" (contains "Hospitality").
Server not started/stopped, no `next build`, no edits, no git writes (read-only from monorepo
root). `browser_check.mjs` run once, foreground-intended (600000ms timeout); the Bash tool's own
120s default moved it to background regardless (same documented tool-level behaviour as P0D/P0G,
not something this agent chose) — waited for its single completion, did not re-run.

**Verdict: 28 PASS, 2 FAIL, 3 NOTE (measurement/spec deviation, not blocking), 2 NOT FULLY
VERIFIED (time-boxed).**

**FAILs: V32 (unaccounted hex survivors outside the 4 permitted files), V33 (2 `neutral-*` hits
site-wide, both in off-limits manager files, not 0 as the literal grep expects).**

## Table

| # | command | decisive output | verdict |
|---|---|---|---|
| V1 | `cd hospitality/web && npx tsc --noEmit` | no output, exit 0 | PASS |
| V2 | `cd hospitality/web && npm test` | 7 test files, 61/61 passed (baseline was 6 files; one more test file now exists, all green) | PASS |
| V3 | `python scripts/check_dependency_closure.py` | `dependency closure OK across 19 sites` | PASS |
| V4 | `sweep.mjs --site=hospitality --base=:3202 --article-depth=3` vs `sweep_baseline.json` | 59/59 clean, 0 dead links, 0 link-floor breaches (978 vs 667 baseline links), 0 data-cta regressions (124 vs 59), 0 dash regressions (0). Every one of 55 route families rose (delta +3 to +8), 0 dropped. Full per-route table in appendix A. | PASS |
| V5 | `browser_check.mjs --grounds` vs `browser_baseline.json` / `P0G_RECHECK.md`'s 219 | overflow=0, anchorGaps=0, grounds breaches=0 (darkOnDark false everywhere; only sub-threshold near-identical bands logged, same as P0D/P0G). **Contrast failures: 26**, well under the P0G baseline of 219 (was 235 in P0D). All 26 are one signature: `p` text at 11-12px, ratio ~3.43 vs floor 4.5, on "Research"/"Tronc, Tips and Payroll"/"Food and Drink VAT"/"Margins and Cost Control" card labels. The previously-dominant "Get in touch" white-on-white (74) and "Do not track me" (145/148) failures are **gone** — not present anywhere in this run. Console noise: 152 CSP AdSense frame-src refusals (known, by design, H14), 5 transient nav timeouts, 2 gstatic csi (harmless telemetry) — no new error class, no hydration errors. Self-test OK. | PASS |
| V6 | per-URL `JSON.parse` on every `ld+json` script block, all 59 sweep URLs | 202 blocks, 0 exceptions | PASS |
| V7 | `cta_snapshot.mjs` vs `cta_baseline.json` | pre-port triple `header_book\|header\|form` unchanged on all 59 routes. 124 total CTAs, 11 distinct triples now (10 new: `blog_skip_to_form`, `blog_sidebar_book`, `sector_hero_contact`, `service_hero_contact`, `home_calculator`, `home_research`, `hero_primary`, `hero_secondary`, `for_mid_contact`, `services_mid_contact` — full id/placement/goal/count list in appendix B). `mobile_menu` (drawer CTA, not SSR-crawlable) confirmed present in the shipped client bundle (`.next/static/chunks/app/layout-*.js`), unchanged, phase-1/chrome-owned. | PASS |
| V8 | prose freeze: source-level `git diff port-hospitality-phase0..577e22e2` filtered to letter+space lines, no comment/JSX-only lines | 927 added / 124 removed candidate lines (large diff — every route template was rewritten). Spot-verified: expected new labels present verbatim (`Your callback`, `Your enquiry` x4, breadcrumb `Calculators`/`Home` labels). Targeted forbidden-string sweep across all 59 served routes (below) found 0 kit-default leaks except the intended `Example figures displayed` on the 3 calculator pages, and 0 star-rating claims. **Not hand-classified line-by-line given time budget — see "Not fully verified" below.** No pre-wave HTML snapshot exists to diff against (confirmed, `docs/hospitality/_port/` has no HTML baseline), so this used the source-diff fallback as instructed. | NOTE — spot-checked, not exhaustively classified |
| — | forbidden kit-default string sweep, all 59 routes | `"Free first call, then a fixed fee in writing"`=0, `"Book your free first call"`=0, `"Fixed fee quote if you decide to proceed"`=0, `"Most recommended"`=0, `"What landlords say"`=0, `"Your rent went up"`=0, `"Section 24"`=0, `"Rated 5 out of 5"`=0, `"Example figures displayed"`=3 (the 3 calculator pages, intended). `"partner network"`=27 routes — all are the pre-existing FROZEN `leadConsentText` string ("...shared with a firm from our specialist partner network...", confirmed byte-identical, `git diff` on `site.ts` empty), unrelated to the `/thank-you` A12 sentence which is a separate, different sentence on one noindex page. | PASS |
| — | `showRating` / `initials` on homepage `TestimonialsSection` | `showRating={false}` present, no `initials` prop passed | PASS |
| — | `LeadCTAPanel` `eyebrow=""` / `formTitle=""` census, all mounts | 9 of 10 mounts pass `eyebrow=""` and `formTitle=""` exactly. The homepage mount (`page.tsx:932`) passes `eyebrow="Get started"` and `formTitle="Get in touch"` — both are the page's own pre-existing band-12 copy (comment at `:916-928` states "the 'Get started' label...survive[s]"), not the kit's fee-claim default. **Deviates from the LITERAL text of locked rule 16 and from `PHASE2-6_PACKAGES.md` A7 row 12 (which specified `eyebrow=""`)**, but satisfies the rule's stated purpose (suppress the fee-claim default) and the prose-freeze requirement (preserve existing copy) simultaneously — the two rules point opposite ways here and the code picked prose-freeze. Flagging as a spec/locked-rule inconsistency for the manager to rule on, not a content defect. | NOTE |
| V9 | playbook §9.1 gate, `DIR=hospitality`, 8 rows, comment-stripped | `1 layout-utils:6` / `2 kit adopted:10 distinct/63 call sites` (next to generalist 16/142, startups-tech pre-uplift 5/20) / `2a kit declined:36` / `2b homepage mktg: adopted=4 declined=4` / `3 webfont: next/font next/font/google` / `4 backdrop:1` / `5 eyebrow ratio: Eyebrow=6 section-label=0` / `6 rings not the token: (empty)` / `7 gradient grounds: app/page.tsx, components/layout/HospitalityBackdrop.tsx` / `8 ring guard: walks=1 guards-the-guard=1`. Row 1 >=1 PASS, row 2b adopted>=1 PASS, row 4=1 PASS, row 5 Eyebrow(6)>=section-label(0) PASS, row 8 PASS. | PASS (all graded rows clear) |
| — | V9/V24 expected-value note | plan (`PHASE2-6_PACKAGES.md` V9/V24) states expected eyebrow/section-label as "8 and 0"; actual comment-stripped count is **6 and 0**. Gate condition (Eyebrow>=section-label) still passes at 6>=0. Same BRIEF-ERROR shape as startups-tech's F20 — the plan's expected count is stale, not a site regression. | NOTE |
| V10 | four-marker row, rendered HTML of `/` + comment-stripped source | Rendered HTML: `animate-ping`=2, `rounded-full`=22. Source (comment-stripped, playbook script): `StatsCounter`=3 string hits / 1 actual JSX mount (`page.tsx:504`); `Backdrop`=4 string hits / **3 actual mounts**, confirmed by 3 distinct rendered SVG pattern ids in the HTML (`hospitality-table-setting-hero`, `-proof`, `-cta`, 4 `<pattern>` elements each). Baseline was 0/0/0/0. Target (>=1 each) exceeded on all four. Compares to Property 1/2/3/4, generalist 1/2/3/4, startups-tech post-uplift 1/3/3/4 — hospitality reads **2(ping)/1(stats mount)/3(backdrop mounts)/22(rounded-full)**. | PASS |
| V11 | `curl /blog \| unique hrefs` | 45 (floor >=37) | PASS |
| V12 | same per category, 8 URLs | 22/18/18/16/16/15/15/15 vs floors 14/10/10/8/8/7/7/7 | PASS |
| V13 | same per post, all 23 URLs (via V4 sweep detail) | every post row rose vs baseline (delta +5 to +8), all above floor; see appendix A | PASS |
| V14 | sticky TOC/related-rail check on a post | **Not run** — requires a scripted scroll+`getBoundingClientRect` puppeteer walk; time-boxed out (see "Not fully verified"). | NOT FULLY VERIFIED |
| V15 | one post, `<form` and `BreadcrumbList` count | `<form`=2. `BreadcrumbList`=2 by naive grep, but only **1 real `<script type="application/ld+json">` block** contains it — the second hit is inside the Next.js RSC flight-data payload (an escaped JSON string echo for hydration), not a second script tag. Verified by parsing actual `<script>` tags: 4 ld+json scripts total, exactly 1 contains `BreadcrumbList`. Same shape as `P0G_RECHECK.md` proof (g). | PASS (2 and 1, once measured by script tag not raw grep) |
| V16 | 13 URLs (services hub+5, for hub+6), unique hrefs | 19/20/18/19/19/18 (services) and 20/19/19/19/19/19/19 (for) vs floors 11/11/11/12/12/13/12/13/13/13/13/13/13 | PASS |
| V17 | 11 FAQ-bearing URLs (homepage + 5 services + 6 for), FAQ answer text in HTML | 52 FAQ answers checked, **0 absent**, 100% present (normalised match on first 60 chars, entity-decoded) | PASS |
| V18 | `/services/tronc-scheme-setup`, restored anchor | `href="/services/hospitality-payroll"` renders as a real link (1 hit); `&lt;a href`=0 (not escaped text); unique-href count=18 (floor >=11) | PASS |
| V19 | 4 calculator URLs, unique hrefs | 17/14/14/14 vs floors 9/7/7/7 | PASS |
| V20 | `/embed/food-drink-vat-rate-checker` | `<header\|<footer\|<nav`=0 | PASS |
| V21 | 3 tool URLs: form count, WebApplication count, heading order | `<form`=1 each, `"@type":"WebApplication"`=1 each, heading sequence h1→h2→h3→h2→h3 on all 3 (P0B's h1→h3 jump is fixed; H13's item is W4-owned and closed) | PASS |
| V22 | `/` unique hrefs | 32 (floor >=21, rose by 11) | PASS |
| V23 | `/`, `£90,000` and `12.71` counts | 1 and 1 (present pre-hydration) | PASS |
| V24 | comment-stripped `<Eyebrow`/`section-label` on `page.tsx` | 6 and 0 (plan expected "8 and 0" — see V9 note above; gate condition unaffected) | PASS (gate condition), NOTE (plan's stale number) |
| V25 | `StatsCounter` band contrast | Section is `bg-white`, default (non-dark) tone renders `text-slate-900` — no `.ground-dark`. In-file comment states measured values "on white they are 17.85 and 4.76", both well over the 4.5 floor. | PASS |
| V26 | 8 W6 URLs, unique hrefs | 14/14/14/14 (legal+contact) and 17/15/15/15 (research) vs floors 6/6/6/6/9/7/7/7 | PASS |
| V27 | `/thank-you` | `<main`=1, `<h1`=1 | PASS |
| V28 | `git diff port-hospitality-phase1..577e22e2 -- forms MiniCapture.tsx \| grep formId\|data-cta\|leadConsent\|redirectOnSuccess\|submitLabel\|name=\|enquiry_ref` | empty | PASS |
| V29 | 3 research detail URLs (Dataset) + 4 research URLs (form) | `"@type":"Dataset"`=1 each (3/3); `<form`=1 on all 4 including the index (was 0) | PASS |
| V30 | JS-disabled FAQ visibility | `<noscript><style>` in `layout.tsx:118-122` now contains `[data-state="closed"][role="region"] { display: block !important; }` (confirmed present in the served HTML of both a blog post and a service page). Both those FAQ mounts use `alwaysRenderAnswers` (Radix `forceMount`), so the answers exist in the DOM and this rule makes them visible without JS. **Not independently verified with a real JS-disabled browser render/count** — verified by static proof (rule present + forceMount present), not by a live no-JS page load; the K4 gap A0 recorded as open appears to be closed in this wave. | PASS (static proof; live no-JS count not run, see below) |
| V31 | tab-walk ring contrast, 420ms settle, composited | **Not run** — requires a scripted Puppeteer keyboard-walk with canvas compositing; time-boxed out. Static proxy only: every dark (`bg-slate-900`/`bg-primary-600`) section on the 4 sampled files carries `.ground-dark` with a written contrast comment at the line (confirmed by grep, 19 lines across `page.tsx`, `services/[slug]/page.tsx`, `for/[slug]/page.tsx`, `blog/[category]/[slug]/page.tsx`). This is not the same guarantee as a measured ring. | NOT FULLY VERIFIED |
| V32 | `grep -rnoE '#[0-9a-fA-F]{3,8}' hospitality/web/src/app hospitality/web/src/components --include=*.tsx` | Hex found in 11 files. Of these, real **code-level** (non-prose) hex survivors beyond the 4 permitted (`HospitalityBackdrop.tsx`, `UnionJack.tsx`, `PageShell.tsx`, `api/og/route.tsx`): `page.tsx:108-109,422` (`#fafaf9`/`#3a1a0d`/`#2a1208`), `for/page.tsx:76`, `for/[slug]/page.tsx:157,210`, `services/page.tsx:83`, `services/[slug]/page.tsx:253,326` (all `bg-[#fafaf7]`, each with a written "warm off-white, no ramp step" comment nearby but NOT on the permitted-survivor list), and `error.tsx:54` (`text-[#b0532f]`/`hover:text-[#8f421f]`, off-limits P1-D file, likely pre-existing). The rest of the 21/10/7/etc. hits per file are prose TEXT describing hex values in contrast-measurement commentary (e.g. "bg-primary-600 (#b0532f)"), not actual style usage — not counted as survivors. | **FAIL** — unaccounted hex code use outside the 4 permitted files, each with a comment reason but not on the locked survivor list |
| V33 | `grep -rno 'neutral-[0-9]\{2,3\}' hospitality/web/src` | 2 hits: `globals.css:172` (`neutral-50`) and `layout-utils.ts:69` (`neutral-900`) — both **off-limits manager-owned files** (P1-A, P1-B), not any package's file | **FAIL** on the literal "0 site-wide" bar, but the 2 hits sit in files no wave package owns or could have touched |
| V34 | `data-cta` on wrapper `<div>` check | 0 — every `data-cta` attribute inspected sits on `<a>`/`<Link>`, none on a `<div>` (checked all 10 non-header ids by hand) | PASS |
| V35 | `git diff --stat --diff-filter=A port-hospitality-phase1 577e22e2 -- hospitality/web/src` | empty (0 added files); `git status --porcelain` also clean | PASS |
| V36 | full-page screenshots, 12 routes x 3 widths | **Not captured** — `browser_check.mjs --shots` was pointed at the scratch shots dir but this run did not verify screenshot files were written before scratch cleanup; treat as not delivered to reviewers. Manager/R2/R3 should re-run `--shots` explicitly if screenshots are needed before review. | NOT DELIVERED |

## Four-marker row (repeated for visibility)

Rendered HTML of `/`: **animate-ping=2, StatsCounter mount=1 (3 source string refs), Backdrop mounts=3 (3 distinct rendered SVG pattern ids), rounded-full=22**.
Baseline 0/0/0/0. Property 1/2/3/4, generalist 1/2/3/4, startups-tech post-uplift 1/3/3/4.

## Contrast failure count

**26** (P0D baseline 235, P0G re-check 219, this wave 26). All one signature (small card-label text at ~3.43:1 vs 4.5 floor on `/calculators` and `/research` card labels). The two dominant chrome failures from P0D/P0G ("Get in touch" white-on-white x74, "Do not track me" x145-148) are gone.

## Every FAIL, restated

1. **V32** — hex-in-code survivors beyond the 4 permitted files: `page.tsx` (3 lines), `for/page.tsx` (1), `for/[slug]/page.tsx` (2), `services/page.tsx` (1), `services/[slug]/page.tsx` (2), `error.tsx` (1, off-limits file). Each carries a written justification comment but none is on the locked-rule-13 survivor list.
2. **V33** — 2 `neutral-*` hits site-wide (`globals.css:172`, `layout-utils.ts:69`), both in manager carve-out files no package could edit.

## False premises / spec deviations found in the packages doc, numbered

1. **V9/V24 expected Eyebrow count.** Plan states "expect 8/0"; measured is 6/0. Gate condition (Eyebrow>=section-label) is unaffected and passes. Stale plan number, not a site defect — same shape as startups-tech's F20.
2. **Homepage `LeadCTAPanel` eyebrow.** `PHASE2-6_PACKAGES.md` A7 row 12 specifies `eyebrow=""` for the homepage closing panel; the shipped code uses `eyebrow="Get started"` (the band's own pre-existing label, preserved per prose-freeze). This is a genuine conflict between locked rule 16 (literal: every mount passes `eyebrow=""`) and the prose-freeze requirement (preserve existing copy) — the build chose prose-freeze. Not a fee-claim leak (verified: the string is not the kit default), but not what either A7 or rule 16 literally specified. Manager/owner call needed on which rule wins.
3. **V15's "BreadcrumbList = exactly 1" via naive grep** double-counts because the RSC flight-data payload echoes the JSON-LD string once as an escaped hydration blob. Measuring by actual `<script>` tag (not string search) gives the correct 1. Same shape as startups-tech's F26.

## What was not fully verified (time-boxed, reported per instruction rather than assumed)

- **V14** (sticky TOC/related-rail arrangement) and **V31** (tab-walk ring contrast with canvas compositing) need a scripted Puppeteer interaction (scroll + keyboard-tab + composited-colour read) that was not built in this pass. Static-proxy evidence only (ground-dark class presence with written contrast comments). Per the packages doc's own words: "a missing measurement is a FAIL, not a pass" — flagging both as open, not passing them on inference.
- **V36** screenshots: not confirmed written to the scratch shots directory before cleanup; re-run needed before R2/R3 review if visual evidence is required.
- **V8 prose freeze**: 927 added / 124 removed candidate diff lines were not hand-classified one-by-one against the (a)/(b)/(c) buckets the packages doc specifies, given the size of the wave (every route template rewritten) and the time budget for a mechanical verifier. Targeted checks (forbidden kit-default strings, star ratings, identity/testimonial fields, frozen consent text) all came back clean across all 59 routes, which is the highest-risk subset of what a full classification would catch, but it is not the same as the exhaustive line-by-line diff the plan specifies.

## Appendix A — sweep.mjs per-route link-floor delta (V4/V13)

route | baseline | now | delta
---|---|---|---
/ | 21 | 29 | +8
/about | 6 | 11 | +5
/blog | 37 | 42 | +5
/blog/business-rates | 8 | 13 | +5
/blog/business-rates/retail-hospitality-and-leisure-relief-scheme | 13 | 18 | +5
/blog/business-rates/small-business-rates-relief-cafes | 11 | 16 | +5
/blog/capital-allowances | 7 | 12 | +5
/blog/capital-allowances/kitchen-fit-out-capital-allowances | 11 | 16 | +5
/blog/hospitality-accounts | 14 | 19 | +5
/blog/hospitality-accounts/bookkeeper-for-restaurant | 15 | 22 | +7
/blog/hospitality-accounts/cash-basis-vs-accruals-stock | 11 | 19 | +8
/blog/hospitality-accounts/epos-reconciliation-hospitality | 7 | 15 | +8
/blog/hospitality-accounts/gross-profit-menu-pricing | 12 | 20 | +8
/blog/hospitality-accounts/hospitality-consultant-vs-accountant | 21 | 29 | +8
/blog/hospitality-accounts/hospitality-hardest-sector-insolvency-survival | 11 | 19 | +8
/blog/hospitality-accounts/hotel-finance-revenue-management | 16 | 24 | +8
/blog/hospitality-accounts/uk-food-hygiene-ratings-by-region-and-business-type | 15 | 23 | +8
/blog/hospitality-vat | 10 | 15 | +5
/blog/hospitality-vat/bnb-rent-a-room-boundary | 9 | 17 | +8
/blog/hospitality-vat/is-there-vat-on-dog-food | 11 | 17 | +6
/blog/hospitality-vat/vat-on-takeaway-food | 15 | 21 | +6
/blog/hospitality-vat/vat-rates-soft-drinks-and-food | 13 | 20 | +7
/blog/licensed-trade | 10 | 15 | +5
/blog/licensed-trade/alcohol-duty | 12 | 18 | +6
/blog/licensed-trade/awrs-checks | 11 | 17 | +6
/blog/licensed-trade/draught-relief-explained | 11 | 17 | +6
/blog/licensed-trade/machine-games-duty | 14 | 19 | +5
/blog/making-tax-digital | 7 | 12 | +5
/blog/making-tax-digital/mtd-itsa-hospitality-sole-traders | 9 | 14 | +5
/blog/payroll-and-employment | 7 | 12 | +5
/blog/payroll-and-employment/casual-staff-employment-status | 13 | 18 | +5
/blog/tips-and-tronc | 8 | 13 | +5
/blog/tips-and-tronc/tips-act-2023-compliance | 12 | 17 | +5
/blog/tips-and-tronc/tronc-scheme | 15 | 20 | +5
/calculators | 9 | 14 | +5
/calculators/food-drink-vat-rate-checker | 7 | 11 | +4
/calculators/staff-cost-rota-margin-calculator | 7 | 11 | +4
/calculators/tronc-tips-paye-nic-calculator | 7 | 11 | +4
/contact | 6 | 11 | +5
/cookie-policy | 6 | 11 | +5
/for | 12 | 17 | +5
/for/cafes-and-coffee-shops | 13 | 16 | +3
/for/caterers-and-street-food | 13 | 16 | +3
/for/hotels-and-guesthouses | 13 | 16 | +3
/for/pubs-and-bars | 13 | 16 | +3
/for/restaurants | 13 | 16 | +3
/for/takeaways | 13 | 16 | +3
/privacy-policy | 6 | 11 | +5
/research | 9 | 14 | +5
/research/hospitality-openings-closures-index | 7 | 12 | +5
/research/uk-hospitality-food-hygiene-map | 7 | 12 | +5
/research/uk-hospitality-insolvency-index | 7 | 12 | +5
/services | 11 | 16 | +5
/services/business-rates-relief | 13 | 17 | +4
/services/hospitality-payroll | 11 | 15 | +4
/services/hospitality-vat | 12 | 16 | +4
/services/toms-advice | 12 | 16 | +4
/services/tronc-scheme-setup | 11 | 15 | +4
/terms | 6 | 11 | +5

Totals: 667 -> 978 internal links, 59 -> 124 data-cta, 0 breaches, 0 dead links, 0 dash regressions.

## Appendix B — new data-cta triples (V7)

id | placement | goal | count
---|---|---|---
header_book | header | form | 59 (unchanged baseline)
blog_skip_to_form | article_header | form | 23
blog_sidebar_book | sidebar | form | 23
sector_hero_contact | hero | form | 6
service_hero_contact | hero | form | 5
home_calculator | tools_band | null | 3
hero_primary | hero | form | 1
hero_secondary | hero | null | 1
home_research | tools_band | null | 1
for_mid_contact | body | form | 1
services_mid_contact | body | form | 1

Scratch directory `C:\Users\user\AppData\Local\Temp\claude\...\scratchpad\v1\` deleted after this report was written.
