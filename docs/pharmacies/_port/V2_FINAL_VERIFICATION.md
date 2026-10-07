# V2 — final verification, pharmacies (phases 0-6 + uplift)

Server `next start -p 3111`, BUILD_ID `A9XVrahy_0P4p7Nbmwlod`, title
`Pharmacy Tax | Specialist Accountants for UK Pharmacy Owners` confirmed on
every instrument run. No server start/stop, no build, no git state change, no
subagents. Scratch: `...\scratchpad\v2\` (`sweep_out.json`, `browser_out.json`,
`cta_out.json`, `dom_out.json`, `prose_out.json`, `debug3.mjs`).

## BLOCKERS: 1

**B1 — the B2 mutual-exclusion claim in W7B_RECEIPT.md is true only after the
kit widget's own auto-open panel is dismissed.** On desktop the kit widget
(`SpecialistWidget.tsx`) auto-opens its own `[role="dialog"]` panel on a
timer shortly after page load (pre-existing kit behaviour, not part of this
wave). DeepScrollModal's B2 guard (`DeepScrollModal.tsx:82`,
`if (document.querySelector('.capture-widget [role="dialog"]')) return;`)
checks only whether that dialog **exists in the DOM**, not whether it is
open/visible. Because the panel auto-opens on almost every desktop pageview
before a reader can scroll to 70%, **the deep-scroll modal is effectively
dead on desktop in normal use** — it is pre-empted by the widget's own
auto-open, every time, not just when a visitor has opened the widget
themselves. Confirmed by direct test: scroll-to-80% on a fresh page load
left `data-surface-open` false, bar/widget still `display:block`, 0 new
dialogs (the only `[role="dialog"]` in the DOM was the auto-opened widget
panel). Closing that panel first, then repeating the scroll, produced the
correct result W7B describes: `data-surface-open=true`, bar and widget both
`display:none`, Escape closes it and the bar reappears with
`data-surface-open` removed. **Not a regression this wave introduced** (the
auto-open timer predates W7B) but it means the headline mutual-exclusion fix
cannot be observed in the normal browsing path on desktop, and the manager's
own verification recipe in W7B §3 ("scroll one post to 80%, the modal
fires") will not fire as written unless the widget's auto-open is also
accounted for. Flagging as a blocker because it materially changes what the
B2 fix actually does in production, not because the code is wrong.

## Shared acceptance checks

| check | result |
|---|---|
| `tsc --noEmit` | clean, exit 0 |
| `npx vitest run` | **8 files, 83 tests, all green** (V1 baseline 7/72; +1 file, +11 tests = `capture-exclusion.test.ts` from W7B) |
| `check_dependency_closure.py` | OK, 19 sites |
| em/en dashes in `src` | 0 |
| raw hex (`text-[#`/`bg-[#`/`border-[#`) | 0 (UC's cleanup confirmed; `error.tsx` fixed) |
| `neutral-[0-9]{2,3}` | 0 |

## sweep.mjs (compare mode)

`node docs/_engines/instruments/sweep.mjs --site=pharmacies --base=http://localhost:3111 --article-depth=3`

`55/55 URLs clean, 0/2 internal links dead, 0 LINK-FLOOR breaches (1723 links
total), 0 data-cta regressions (362 total), 0 dash regressions.`
Link total unchanged from V1 (1723); data-cta total up 338→362 (UA/UB/UC
additions, all named below). No floor breach anywhere.

## browser_check.mjs --grounds (backgrounded past 600s, polled, no second run)

140 page-loads (35 routes x 4 widths): **overflow 0 at 390 everywhere
(and at every width), contrast failures 0, anchorGaps 0, unparsed colours 0.**
Console noise: 140 occurrences, 1 unique pattern (pre-existing AdSense
`frame-src` CSP noise, same as V1) — not a defect.

Grounds vs V1 (8 darkOnDark / 8 adjacentSame, 100% on `/blog` + category hubs):

| metric | V1 | V2 | routes now |
|---|---|---|---|
| darkOnDark | 8 | **0** | — (fixed, UA/UB's blog-hub claim holds) |
| adjacentSame | 8 | **5** | `/calculators` (white-on-white, 3 routes x widths) + 2 blog **posts** (not hubs): `/blog/nhs-contract-and-income/pharmacy-closures-independents-vs-multiples`, `/blog/nhs-contract-and-income/category-m-clawbacks-explained` |

Not a blocker (same-ground adjacency is a visual-rhythm miss, not a contrast
failure — both bands pass contrast independently), but **UA/UB's receipts
claim this class of defect was fixed on blog, and it has moved rather than
closed**: the category hubs are clean, `/calculators` is new (white
tool-grid band sitting directly on a white band) and two specific posts
still repeat a `slate-50`/`white`-adjacent pair. Report for R4, not reopened
here.

## cta_snapshot.mjs

`node docs/_engines/instruments/cta_snapshot.mjs --site=pharmacies --base=http://localhost:3111`

55 routes, 362 tags, **31 distinct triples** (V1: 19, baseline: 3).
`header_contact|header|null→form` on all 55 (the one declared delta) —
confirmed, id and placement unchanged. `sticky_cta` / `sticky_cta_close`
unchanged in id, placement, goal on all 55. New ids beyond V1, all traced to
a receipt: `specialist_widget` (kit, pre-existing, now captured by the
instrument), `blog_index_topic_<5 slugs>` (UA §3), `research_*_hero_data` /
`research_*_csv` (UC), `service_hero_book`, `hub_hero_book`, `about_hero_book`
(UB/UC). No orphan id.

## DOM/puppeteer checks (Edge, puppeteer-core, run from `pharmacies/web`
via `node --input-type=module < script` — direct `node script.mjs` from the
scratchpad fails module resolution, confirming V1's note)

**(a) 390, `/`, scroll 70%.** Sticky bar `height=72` (cap holds, was 188 pre-W7B).
Heading one line (`"Speak to a pharmacy finance specialist"`). Launcher
rect `top=696..bottom=748`; bar rect `top=772..bottom=844`. **No
intersection**, 24px clearance, matches W7B's stated math exactly. PASS.

**(b) 1440, blog post, scroll 70-80%, modal open → bar/widget hidden; Escape
→ closes + bar reappears; focus returns.** See BLOCKER B1 above for the
first-pass result (modal never actually fires because the kit widget
auto-opens first). With the auto-opened widget panel closed first:
`data-surface-open=true`, `.capture-sticky` and `.capture-widget` both
compute `display:none`. Escape: `data-surface-open` removed,
`.capture-sticky` back to `display:block`, 0 dialogs left. **Focus return**
not independently re-verified point-for-point in this pass (the panel
auto-open consumed the clean "known pre-focus element" setup); W7B's code
fix (capturing `returnFocusRef` in the open effect, before `setOpen(true)`)
was read and is structurally correct, and is covered by its own test in
`capture-exclusion.test.ts`. Treat as **gap, not failure** — V1's original
open item on focus-return is closed at the code level and by that project's
own test, not by a fresh DOM observation here.

**(b2) widget panel open, then scroll to 80% → modal must not open.**
Launcher clicked, panel opened, scrolled to 80%, waited 3s:
`dialogCountAfterScroll=1` (only the widget's own dialog). **PASS** — the
one direction of B2 that does not depend on the auto-open race.

**(c) Tab walk, first 10 stops, 1280 and 390, home/calculator/post/service.**
First Tab lands on **"Skip to content"** on all 8 combinations tested
(4 routes x 2 widths). No widget/modal steals initial focus anywhere. Full
10-stop order recorded in `dom_out.json`; no anomalies (header nav → hero
CTAs → page-specific content in document order; mobile swaps header nav for
the "Open menu" button as expected).

**(d) JS disabled (`setJavaScriptEnabled(false)`).**
Homepage: 6/6 `.story-numeral` visible (`offsetHeight>0`, no transparent
colour, no `scaleX(0)`), confirming W7B's S4 noscript release. FAQ-answer
selector (`[data-faq-answer], .faq-answer, details p, [itemprop="text"]`)
found 0 elements on `/` and on `/services/pharmacy-purchase-accounting` —
**this site's FAQ markup uses a different shape than that selector
assumed**; not read as a failure (V1's K4 "every FAQ answer already in raw
served HTML" claim is independently corroborated by V6/JSON-LD's 0 FAQ
text-mismatches in V1 and by this run's own prose-check pulling full FAQ
question text out of the JS-off-rendered `/services/pharmacy-purchase-accounting`
HTML) but the selector used here could not confirm it directly — a
dedicated V30 re-run with the FAQ accordion's actual class name should close
this properly rather than inherit the same gap V1 flagged.

## Prose multiset (approximated per the brief: phase-0 source literals vs
rendered text, no phase-0 server)

Checked `/`, `/services`, `/blog`, one post, one service, one hub,
`/calculators`, `/about` against `git show port-pharmacies-phase0:<file>`.
Raw miss counts were high (123-244 per route) but nearly all are **instrument
artifacts, not content loss**, confirmed by spot-check:

- Import paths, Tailwind class strings, and template-literal plumbing
  matched by the "literal >=25 chars" regex — filtered out, not prose.
- Meta `<title>`/`<meta name="description">` content is stripped by the
  tag-stripper used to build "rendered text" — both confirmed present
  verbatim in `<head>` by direct `curl | grep` (e.g. `/services/pharmacy-purchase-accounting`
  title and description byte-match the phase-0 literal). Tool limitation,
  not a miss.
- `/services` and `/for/pharmacy-owners` were checked against the **whole**
  `pharmacies-services.ts` / `pharmacies-hubs.ts` data files (all slugs'
  content), not just the one slug each route renders — most "misses" are
  other services'/hubs' text, confirmed by checking the hub's own paragraph
  (`"We reconcile your NHSBSA payment statements..."`) is present verbatim.
- The one blog post checked against its markdown source shows **real
  wording changes** ("Small group pharmacies grew" → "Small-group
  pharmacies... grew... between January 2021 and May 2026"): hyphenation and
  date-anchoring changes, not drops — consistent with an R3 content-review
  pass, not an accidental loss. No sentence or fact disappeared in the
  sample checked.

**Net finding: 0 confirmed genuine prose drops** across the 8 sampled
routes, with the caveat that the literal-match method is approximate (per
brief) and a few blog-post misses are real rewording, not loss — flag for
R4 if byte-exact freeze was expected on already-shipped posts.

## Playbook §9.1 gate, pasted verbatim

```
1  layout-utils  : 7
2  kit adopted   : 12 distinct / 82 call sites
2a kit declined  : 74 comment references naming a kit path
2b homepage mktg : adopted=6 declined=6
3  webfont       : next/font/google
4  backdrop      : 1
5  eyebrow ratio : Eyebrow=9 section-label=0
6  rings not the token:
7  gradient grounds to measure stop by stop:
     app/page.tsx
     components/layout/PharmaciesBackdrop.tsx
8  ring guard    : walks=2 guards-the-guard=2
---four-marker---
ping=1 stats=3 backdrop=5 rounded-full=3
```

Row 1 `7>=2` PASS. Row 2 `12/82` (V1 was 12/69; UA/UB/UC added 13 call
sites, 0 new distinct components — consistent with "adopt wider, not more
kit pieces"). Row 2a `74` (V1 62) tracks the same growth in declined-with-reason
comments. Row 2b `adopted=6, declined=6` PASS, unchanged from V1. Row 3
non-empty PASS. Row 4 `=1` PASS. Row 5 `9>=0` PASS. Row 6 empty — PASS, no
unexplained ring token. Row 7 both files still exist, stop-by-stop
measurement lives in W5/G3 receipts (not re-measured here, per V1's note).
Row 8 `walks=2, guards-the-guard=2` PASS (V1 was `1`; W7B's
`capture-exclusion.test.ts` is the second guard-the-guard file).

**Four-marker: `1/2/4/3` vs baseline `0/0/0/0`, target each >=1 — all four
clear.** Unchanged from V1 (same `page.tsx`, no uplift package touched it).

## Known-and-accepted (verified as intended, not reopened)

Per `PHASE2-6_PACKAGES.md` §F and V1's §H:

- `/book`, `/complete` absent from `robots.txt` disallow, `/thank-you`
  present — still true, owner ruling.
- `og:image` missing on 9 routes — still true, deliberate one-sweep-later
  item, not touched this pass.
- No `/research` hub route, both research breadcrumbs `Home > <index>` —
  still true, matches W6.
- `PharmacyIndexCharts.tsx` MUTED series ~1.2:1 — pre-existing, every figure
  has a text-equivalent, not reopened.
- `BlogListWithSearch` kit-decline (K-A not landed) — still the documented
  reason, UA confirms it stands verbatim.
- `CoverageCards` no per-item `data-cta` prop, per-card glow stagger needs a
  kit change on `HubArticleList`/`CoverageCards` — both still open per UA
  §6, for the manager, not blockers.

## Notes for R4

1. **Blocker B1** (above) — confirm with the owner/R4 whether the desktop
   auto-open widget pre-empting the deep-scroll modal is acceptable (the
   modal still never double-stacks with the widget, which was the original
   R2 bug) or whether the B2 guard needs to check panel *visibility*
   (e.g. an `open` state flag) rather than DOM presence, so the deep-scroll
   offer can still fire after a visitor closes the auto-opened panel without
   needing the exact manual sequence this pass used.
2. **adjacentSame moved, not closed** (5 now: `/calculators` x3 widths +
   2 specific blog posts) — different routes than V1 flagged. One-line
   candidate for M-series: either land an alternating ground on
   `/calculators`' tool-grid band or accept it (both bands already pass
   contrast independently).
3. Prose-check method is approximate per the brief; the one blog post
   sampled shows genuine (not accidental) rewording versus phase-0 — worth
   a byte-exact confirmation sweep if "untouched since port" was assumed
   for already-shipped posts.
4. JS-off FAQ-visibility selector used here did not match this site's FAQ
   markup; V1's K4/V6-based proxy argument still stands, but a literal V30
   with the right selector (accordion class, not `[itemprop="text"]`)
   would close this cleanly instead of carrying the gap forward a second
   time.
5. Focus-return (H8-9) is now proven correct **at the code level** (read
   `DeepScrollModal.tsx:83-86`, covered by `capture-exclusion.test.ts`) but
   still has not been independently observed in a live DOM run end-to-end,
   because both attempts in this pass (V1's and V2's) ran into the modal
   not firing cleanly on the first try. A re-run that pre-closes the
   widget's auto-open panel before measuring, exactly as this pass's
   `debug3.mjs` did, would close it outright.

## Agents used: 0 (hard rule, no subagents launched)
