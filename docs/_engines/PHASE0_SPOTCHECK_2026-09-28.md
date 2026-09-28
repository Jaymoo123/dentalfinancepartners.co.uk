# Phase 0 rendered spot-check, 2026-09-28

Fresh `.next` builds, `next start` per site, puppeteer-core against local Chromium (1280 desktop, 390x844 real mobile emulation, isMobile+hasTouch+dsf3). Control: gov.uk at 390 emulation, scrollWidth = **390** (no overflow) — used as the "correctly responsive" baseline throughout.

## 1. care (port 3301)

Header CTA = `[data-cta="header_contact"]` (wrapper gates on `lg:` i.e. 1024px, per the code comment recording a prior fix). Sticky CTA = `[data-cta="sticky_cta"]`, homepage-only, mounts after scrolling past 30% of page height.

| Page | CTA visible @1280 (rect) | CTA visible @390 | scrollWidth@390 |
|---|---|---|---|
| / | PASS (139x48 @1044,16) | PASS hidden (0x0 rect) | 390 PASS |
| /about | PASS (139x48) | PASS hidden | 390 PASS |
| /services | PASS (139x48) | PASS hidden | 390 PASS |
| /for/care-homes | PASS (139x48) | PASS hidden | 390 PASS |
| /blog/.../business-rates-care-homes | PASS (139x48) | PASS hidden | 390 PASS |

Sticky CTA in DOM at 390 on homepage: confirmed **PASS** — `[data-cta="sticky_cta"]` mounts after a real scroll event past the 30% threshold (`window.scrollTo` + dispatched `scroll` event; a bare `scrollTo` without the event did not trigger it in headless Chromium — test artifact, not a bug).

Screenshots: header CTA shows solid button top-right at 1280 on all 5 pages; at 390 it is absent from the header row, mobile-only text "Contact" link shown instead — matches source.

## 2. wills-probate (3302) and divorce-finances (3303)

Both sites now emit `web-shared` Tailwind classes via `@source "../../../../packages/web-shared"`.

| Page (wp) | 1280 | 390 | scrollWidth@390 | canonical | og:image 200 | forms |
|---|---|---|---|---|---|---|
| / | 200, no visual breakage | 200, no overflow | 390 PASS | correct self-URL PASS | PASS (icon.svg, 200) | 1 |
| /about | 200 | 200 | 390 PASS | PASS | PASS | 1 |
| /services | 200, CTA contrast 17.04:1 | 200 | 390 PASS | PASS | PASS | 1 |
| /for/business-owners | 200 | 200 | 390 PASS | PASS | PASS | 1 |
| /contact | 200 | 200 | 390 PASS | PASS | PASS | 1 |
| /calculators/iht-threshold-calculator | 200, CTA(orange "Get figure shared") contrast 2.68:1 | 200 | 390 PASS | PASS | PASS | 2 |

| Page (df) | 1280 | 390 | scrollWidth@390 | canonical | og:image 200 | forms |
|---|---|---|---|---|---|---|
| / | 200, CTA contrast 17.04:1 | 200 | 390 PASS | PASS | PASS | 1 |
| /about | 200 | 200 | 390 PASS | PASS | PASS | 1 |
| /services | 200, CTA contrast 17.04:1 | 200 | 390 PASS | PASS | PASS | 1 |
| /for/business-owners | 200 | 200 | 390 PASS | PASS | PASS | 1 |
| /contact | 200 | 200 | 390 PASS | PASS | PASS | 1 |
| /calculators/divorce-cost-calculator | 200, CTA(orange) contrast 2.68:1 | 200 | 390 PASS | PASS | PASS | 2 |

No unstyled blocks, no overlapping, no invisible/transparent-on-transparent text found on any of the 12 rendered pages — the `@source` addition is not visibly breaking layout at either width. og:image URLs (wp `/icon.svg`, df `/api/og`) both resolve 200 on the local build (prod-domain URLs unreachable from this sandbox — checked the equivalent local route instead).

**FAIL — the 2.68:1 orange-on-white primary CTA on both calculator pages is below WCAG AA (4.5:1 text, 3:1 large-text/UI).** `rgb(249, 115, 22)` on `rgb(248, 250, 252)`. Same orange token as care/generalist; flag for the owner, not fixed here (read-only check).

**FAIL — duplicate homepage content, both sites.** Server-rendered HTML for `/` on both wp and df repeats hero-adjacent copy twice (e.g. "£325k" nil-rate stat, "Free calculators, real numbers" card — each appears twice in the raw HTML; `<footer>` and `<main>` each appear once, so it is not a full-page double-render). Confirmed via `curl | grep -c` on the raw response, not a screenshot artifact. Did not appear on `/about` (single `<footer>`, expected text count). Root cause not investigated (out of scope, read-only); flag before deploy — screenshots: `wp-_-390.png`, `df-_-390.png`, `wp-_calculators_iht-threshold-calculator-390.png` all show the page content twice top-to-bottom.

## 3. generalist (3304) — bonus

| Page | Primary button colors | Contrast |
|---|---|---|
| / | white text on `rgb(194,65,12)` | **5.18:1 — PASS**, matches the reader's stated token change |
| /calculators/employer-ni-calculator | light text on dark panel (selector caught a secondary control, not the submit button — informational only) | 12.00:1 |

## Summary

1. Care: header CTA correctly hides at 390 (prior fix holds), sticky CTA correctly mounts on scroll, no horizontal overflow on any of 5 pages. All PASS.
2. wills-probate + divorce-finances: the `web-shared` Tailwind `@source` change causes no visible breakage across 12 page/width combinations — canonicals, og:images, form counts all correct.
3. **Two real findings, not caused by the `@source` change:** (a) both calculator pages' primary CTA is 2.68:1 contrast, below AA; (b) both sites' homepage HTML repeats hero-card copy twice server-side — needs an owner-directed follow-up to find the cause.
4. generalist homepage CTA confirmed at 5.18:1 as claimed.
5. Control (gov.uk, 390 real mobile emulation) scrollWidth = 390, matching every site tested — no false-positive overflow risk in the test method.
6. All four `next start` servers killed by PID after the check; scratch directory removed.
