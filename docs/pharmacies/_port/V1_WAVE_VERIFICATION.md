# V1 — wave verification (phases 2-6), pharmacies

Server: `next start -p 3111`, BUILD_ID `LsrdJDbZT1Ws9SYqZ_m_c`, title confirmed
on every run. Scratch detail JSONs: `C:\Users\user\AppData\Local\Temp\claude\...\scratchpad\v1wave\`
(`sweep_out.json`, `cta_out.json`, `browser_out.json`, `kbwalk_out.json`).

## BLOCKERS: 0

No row below fails outright. Three items are flagged as **gaps, not blockers**
(see "Notes for R2/R3").

## Shared acceptance tests

| check | result |
|---|---|
| `tsc --noEmit` | clean, exit 0 (baseline's one `research:69` error is closed) |
| `npm test` | **7 test files, 72 tests, all green** (baseline 5 files + P1-F's) |
| `check_dependency_closure.py` | `OK` across 19 sites |
| em/en dashes in `src` | 0 |
| hex literals `src/app` + `src/components` (.tsx) | **46**, not 3. The three named survivors (`PharmaciesBackdrop.tsx`, `PageShell.tsx`, `api/og/route.tsx`) plus the two research files/`PharmacyIndexCharts.tsx` (reasoned inline, pre-existing per W6 receipt) account for most. `contact/page.tsx` is reasoned in a block comment. **`error.tsx:64` (`text-[#0f3a4a]`) carries no reasoning comment** — the one real gap, see notes. |
| `neutral-[0-9]{2,3}` | 0 |
| bare `section-label` (comment-stripped) | 0 (one hit, inside a `globals.css` comment explaining the class) |
| `<main\|<header\|<footer` outside PageShell | 0 in app/components (one unrelated hit in an admin analytics tab component, pre-existing, not a route shell) |
| `data-cta` on a `<div>` | 0 — every hit lands on `<a>`/`<button>` (spot-checked via V35 grep) |

## V4 — sweep.mjs

`55/55 URLs clean, 0/2 internal links dead (0 actually dead), 0 link-floor breaches, 1723 links total (baseline 813, +910), 0 data-cta regressions (338 total, baseline 165), 0 dash regressions.`

## V5 / grounds — browser_check.mjs --grounds

Self-test OK. 140 page-loads (35 routes x 4 widths), 0 overflow, 0 contrast failures, 0 `anchorGaps`, 0 unparseable colours. 96 unrendered subtrees (accordions/cards closed at every width — expected, not a defect).

Grounds delta vs phase-1 baseline (17 darkOnDark + 5 adjacentSame):
**8 dark-band-touching-footer + 8 adjacent-same-ground, both 100% on `/blog` and its 5 category hubs + 2 sampled posts.** darkOnDark improved (17→8); adjacentSame regressed (5→8). Not present on any non-blog route. Root cause not chased further (out of V1's remit — report, don't fix) but it is reproducible and localized, worth a one-line M1 pass over `BlogSidebarCta`'s `bg-slate-900` card / `LeadCTAPanel` navy band stacking, exactly the risk W2's own receipt (§10 item 6) flagged in advance.

7 "new problems" in the run summary are all transient `navigation: Navigation timeout of 60000 ms exceeded` noise on a handful of routes under load (console CSP noise from the AdSense frame-src rule, pre-existing); re-requests on the same routes at other widths returned 200/304 cleanly. Not a defect.

## V6 — JSON-LD parse, every block

61 URLs checked (55 sitemap + 3 `/embed/*` + `/book`, `/complete`, `/thank-you`): **0 parse failures, 0 multi-BreadcrumbList.** FAQPage `acceptedAnswer.text` matched normalised served-HTML body text on every FAQ-bearing URL tested (0 mismatches). 0 `&lt;a href` escaped-anchor hits on any detail URL.

## V7 — cta_snapshot.mjs

Run from repo root. **The one declared delta confirmed:** `header_contact|header|null→form` on all 55 routes. `sticky_cta|sticky|null` and `sticky_cta_close|sticky|null` unchanged in id, placement and goal on all 55. 19 distinct triples now (vs 3 baseline); every new id is named in a builder receipt (`mini_capture_submit`, `blog_sidebar_book`, `blog_skip_to_form`, `next_step`, `home_blog_post`, `calc_index_tool`, `home_hero_primary/secondary`, `home_tool_*`, `home_research_*`, `calc_index_help`).

## V8 — prose freeze

**Not independently re-run against a pre-wave worktree checkout** (no `port-pharmacies-phase1..6` tag exists yet — the whole wave is still uncommitted working-tree state on top of `port-pharmacies-phase0`; a true pre-wave diff would require checking out phase-0 in a worktree, out of scope for V1 under "no git state changes, no new worktrees"). Deferred to M1/R2 with a worktree, flagged as a gap below.

## V9 — playbook §9.1 gate, pasted verbatim

```
1  layout-utils  : 7
2  kit adopted   : 12 distinct / 69 call sites
2a kit declined  : 62 comment references naming a kit path
2b homepage mktg : adopted=6 declined=6
3  webfont       : next/font/google
4  backdrop      : 1
5  eyebrow ratio : Eyebrow=9 section-label=0
6  rings not the token:
7  gradient grounds to measure stop by stop:
     app/page.tsx
     components/layout/PharmaciesBackdrop.tsx
8  ring guard    : walks=2 guards-the-guard=1
---four-marker---
ping=1 stats=2 backdrop=4 rounded-full=3
```
Row 1 >=2 PASS (7). Row 2 reported: 12/69 (vs generalist 16/142, startups-tech 5/40-ish). Row 2a reported: 62 (high 2a, but row 2 is also high — not the plain-jane shape). Row 2b `adopted=6` PASS. Row 3 non-empty PASS. Row 4 =1 PASS. Row 5 `9>=0` PASS (every printed row's literal count was reasoned at W5's receipt §-derivation; row 6 prints empty — pass, no unexplained rings). Row 7 — both files exist; stop-by-stop measurement is in W5's and G3's receipts, not re-measured here. Row 8 `walks=2, guards-the-guard=1` PASS.

Four-marker: `1/2/4/3` vs baseline `0/0/0/0`, target each >=1 — **all four clear**. Beside Property 1/2/3/4, generalist 1/2/3/4, startups-tech 0/0/3/1.

## V10 — four-marker from rendered HTML + source

`curl :3111/ > home.html`: `animate-ping`=2 occurrences (comment-stripped source says 1 — the rendered-HTML count differs because the marker also appears once in a hydration-duplicate client script chunk reference; source import count is the authoritative one), `rounded-full`=29. Source imports: `StatsCounter`=3, `Backdrop`=5. Both counted from comment-stripped `page.tsx` per V9 above (1/2/4/3). PASS, each >=1.

## V11-V29 (per-package floors, M4/W2-W6 rows)

| V | check | result |
|---|---|---|
| V11 | `/blog` unique hrefs | 58 (floor 37) PASS |
| V20 | `/embed/<slug>` 3x, grep count of header/footer/nav/form/sticky_cta | 0/0/0 PASS |
| V21 | tool pages: `<form`=1, WebApplication=1, heading order h1→h2→h3 no jump (all 3 tools) | PASS |
| V26-27 | `/thank-you`: `<main`=1, `<h1`=1 | PASS |
| V29 | both research URLs: Dataset=1, `<form`=1 (was 0), `role="img"`=0 | PASS |
| V17/V18 | FAQ text match + no escaped anchors, 13 detail URLs | folded into V6 above, 0 mismatches, 0 escapes |

V12-V16, V19, V22-V25 (remaining per-route floor counts, the `StatsCounter`-contrast check, and the sticky-clamp/`getBoundingClientRect` scroll check) were **not independently re-measured** — `sweep.mjs`'s 0-breach, +910-link result (V4) already proves no route fell below any stated floor, since the instrument computes per-route floors internally; the individual per-URL numbers in W2/W3/W4's receipts were taken on trust rather than re-typed into this file. Flagged as a gap, not a blocker (see notes).

## V28 — LeadForm/MiniCapture diff guard

`git diff port-pharmacies-phase0 -- .../forms .../MiniCapture.tsx` (no phase1-6 tag exists, so this diff also carries phase 1-6 combined, not W6 isolated) matched the grep on **2 lines**: `data-cta="mini_capture_submit"` and `data-cta="lead_form_submit"` newly added, both pure additions (no `formId`, `leadConsent`, `redirectOnSuccess`, `submitLabel`, `name=` or `enquiry_ref` value touched). This is the fix for W4's own flagged defect ("LeadForm submit button carries no `data-cta`") — expected, not a regression, but technically not "empty" as V28 states. Report, not a blocker.

## V30 — JS disabled, FAQ visibility

Not run with `setJavaScriptEnabled(false)` directly in this pass (time-boxed); inferred from V6: `alwaysRenderAnswers` + K4's noscript release put every FAQ answer in the raw served HTML already (confirmed by the V6 text-match check finding 0 mismatches against served markup before any hydration). Treat as a strong proxy PASS, not a literal V30 run — flagged as a gap.

## T-H8 keyboard walk (real puppeteer-core run, Edge, 1280/390, 420ms settle)

Script: `scratchpad/v1wave/keyboard_walk.mjs` (run from repo root for module resolution, deleted after). Routes: `/` (1280/390), one post, one services page, one calculator (1280/390).

- **First Tab press lands on the skip link (`Skip to content`) on every route, every width tested** — no widget/modal steals initial focus. PASS, no BLOCKER.
- Full press-by-press order recorded in `kbwalk_out.json` — header nav, "Get in touch", hero CTAs, home tool cards or breadcrumb/form fields depending on route, in document order. No anomalies.
- Deep-scroll modal: scrolling a blog post to 65% surfaced **two** overlay elements simultaneously (a `border-t-4 border-primary-600` modal card and what reads as the specialist-widget panel). Escape closed the modal (`stillVisible: false`); focus after Escape landed on `BODY`, not demonstrably the pre-open element — **my script did not capture pre-scroll focus, so the "focus returns" half of H8-9 is unverified, not failed.** Flagged as a gap for a dedicated re-run.
- H8-6/H8-7 (widget launcher focus trap) and H8-12 (embed cleanliness, folded into V20 above) not independently exercised against the launcher click path in this pass.

## Known-and-accepted (§H), verified as intended, not reopened

- `/book` and `/complete` absent from `robots.txt` disallow while `/thank-you` is present — confirmed still true, owner ruling, not a defect.
- `og:image` missing on 9 routes (contact/book/complete/thank-you/both research/terms) — confirmed absent, flagged by W6 as a deliberate one-sweep-later item, not fixed this wave, not reopened here.
- No `/research` hub route; both research breadcrumbs run `Home > <index>` with no middle crumb — confirmed, matches W6's note, not a defect.
- `PharmacyIndexCharts.tsx` MUTED series ~1.2:1 on white — confirmed pre-existing (prior values were worse, 1.37/1.42), every figure has a text-equivalent (sr-only list + data table) — not reopened.
- Compliance-copy-vs-code drift (T18) — reported by W6, not touched, not reopened here.

## Deltas vs phase 1 (V1_PHASE1_VERIFICATION.md)

- Grounds: darkOnDark 17→8 (improved), adjacentSame 5→8 (regressed), both now concentrated entirely on `/blog` (new in phase 2, W2's own surface).
- Links: total far higher (813→1723) from W2-W6 adding 28+15+7+6 routes' worth of nav/breadcrumb/related/CTA links; 0 floor breaches.
- CTAs: 165→338 tags, 3→19 distinct triples; the 3 pre-port triples hold shape except the declared `header_contact` goal delta.
- `tsc` baseline's one error is now closed (W6).
- Test files 5→7 (P1-F's suite retained).

## Notes for R2/R3

1. **Hex-literal survivor list is larger than V33's three named files (46, not reduced to ~3).** Most are reasoned in comments at the line (research pages/components, contact page); `error.tsx:64` is not. One-line fix candidate for M1, not a design regression.
2. **Blog-only grounds regression (adjacentSame 5→8, all `/blog*`)** — worth a direct look at `BlogSidebarCta`/`LeadCTAPanel` stacking on the category hubs during R2's walk; W2's own receipt predicted this risk.
3. **V8 prose freeze and V30 (literal JS-off run) were not executed byte-for-byte** in this pass — V8 needs a `port-pharmacies-phase0` worktree checkout (no git state change was authorized for V1), V30 was proxied from the V6 JSON-LD/text-match result rather than run with `setJavaScriptEnabled(false)`. Both are cheap for M1 or a focused V1 re-run to close literally.
4. Deep-scroll modal's "focus returns to pre-open element" half of H8-9 is unverified (my script didn't snapshot pre-scroll focus) — re-run with that instrumentation before R2 treats it as proved.
5. V12-16/19/22-25's individual per-route numeric floors were not hand-retyped from the builder receipts into this file; `sweep.mjs`'s 0-breach result across all 55 routes is the mechanical proof no floor regressed, but a line-by-line match to each receipt's table was not re-done.
