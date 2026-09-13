# Phase-0 Fix Wave — Wave-Close Verification

Build under test: `http://localhost:3118` (production build, identity confirmed via title + post-fix homepage string).
Corpus: 66 sitemap URLs (`docs/charities/_port/sweep_baseline.json`) + 6 non-sitemap public routes (`/book`, `/complete`, `/thank-you`, `/embed/gift-aid-calculator`, `/embed/gasds-small-donations-calculator`, `/embed/independent-examination-vs-audit-checker`) = 72 pages, all fetched to local files and grepped literally.

**Counting method note:** Next.js server HTML embeds the same text twice — once in the rendered DOM, once serialized into the RSC flight payload (`\"$\",...` / `<` escaped form). Raw `grep -c` over the full HTML doubles many counts. Where this mattered, I additionally checked for the literal unescaped tag form (e.g. `<h2>...` / `<p>...text...`) to get the real per-page count, and note both numbers.

| # | Check | Command (base = http://localhost:3118) | Decisive output | Result |
|---|---|---|---|---|
| A1 | `/services` `/for` `/guides` self canonical | `curl -s $B$p \| grep -o '<link rel="canonical"[^>]*>'` | `/services`→`.../services`, `/for`→`.../for`, `/guides`→`.../guides` | PASS |
| A2 | Exactly 1 page canonicalizes to homepage | `grep -lE 'canonical" href="https://www\.trusteetax\.co\.uk/?"' pages/*.html` | Only `__.html` (homepage itself) matches | PASS |
| A3 | `/embed/*` canonicalize to parent `/calculators/*` | `grep -o '<link rel="canonical"[^>]*>' pages/__embed__*.html` | All 3 embeds point to their `/calculators/...` parent | PASS |
| A4 | `/book` `/complete` `/thank-you`: noindex + 0 canonicals | `grep -o 'meta name="robots"...'; grep -c 'link rel="canonical"'` | All 3 = `noindex, nofollow`, canonical count 0 for all 3 | PASS |
| A5 | 0 hreflang anywhere | `grep -l hreflang pages/*.html` | No files matched | PASS |
| A6 | Homepage calculator hrefs = 3 real slugs, no `calc-` prefix; slug returns 200 | `grep -o 'href="/calculators/[^"]*"' pages/__.html`; `curl -o /dev/null -w '%{http_code}' /calculators/gift-aid-calculator` | 3 exact slugs (`gift-aid-calculator`, `gasds-small-donations-calculator`, `independent-examination-vs-audit-checker`); 200 | PASS |
| A7 | Whole-site 404 sweep of every internal href across 72 pages | Extracted all unique `href="/..."` (71 unique, incl. static assets) from all 72 pages, `curl -o /dev/null -w '%{http_code}'` on each | All 71 return 200. Also spot-checked `/about` and 4 `/research/*/data` pages (in nav but not surfaced by the href regex on the pages fetched) — all 200 | PASS |
| A8 | Hub child counts + sitemap count | `grep -oE 'href="/HUB/[^"]*"' pages/__HUB.html \| sort -u \| wc -l`; `curl sitemap.xml \| grep -c '<loc>'` | blog: 24 posts + 8 categories; guides 8; calculators 3; services 5; research 4; for 2; sitemap.xml locs = 66 | PASS |
| B9 | "independently examined rather than audited" ≤1 per page, paragraph carries £250k/£3.26m | `grep -l ...; grep -o '.\{80\}...\{200\}'` | Appears on 2 pages (`/services`, `/services/independent-examination`), exactly 1 real occurrence each (raw grep=2 was RSC dup), same paragraph carries "£250,000 and gross assets exceed £3.26 million" both times | PASS |
| B10 | `/services/independent-examination` contains the £250k/£3.26m sentence | `grep -c "gross income exceeds £250,000 and gross assets exceed £3.26 million"` | 1 | PASS |
| B11 | `/services/gift-aid` matching-rule wording | `grep -c` for 4 phrases | "on the same donations"=0, "except in the first year"=0, "at least £1 of other donations received in the same tax year"=1, "no first-year exemption from the matching rule"=1 | PASS |
| B12 | Site-wide "10.2m"=0; trading-subsidiary post has £15m wording | `grep -l "10.2m" pages/*.html`; `grep -o` on the post | 0 files match "10.2m"; post contains "turnover of £15m or less" | PASS |
| B13 | Independent-examination-vs-audit checker Scottish wording | `grep -c` for 3 strings | "£1,000,000"=1, "BEGINNING on or after 1 January 2026"=1, "ENDING on or after 30 September 2026"=1 | PASS |
| B14 | Scottish universal-scrutiny statements survive | `grep -l` for the two exact brief strings, then broadened search | Exact string "every Scottish charity needs external scrutiny" = 0 matches (actual text: "every Scottish charity needs **some form of** external scrutiny" — 1 page: `/calculators/independent-examination-vs-audit-checker`). Exact string "All Scottish charities are subject to external scrutiny" = 1 match (`/guides/charity-sorp-2026`), verbatim. | PASS on substance (both claims survive verbatim or near-verbatim); brief's first quoted string is inexact — see FALSE section |
| C15 | FAQPage JSON-LD `mainEntity[].name` present in stripped body, 0 pages failing | Node script: parse every `application/ld+json` block per page, strip tags from `<body>`, check each FAQ question name is a substring | 0 pages failing (was 15/116) | PASS |
| C16 | Site-wide `priceRange` = 0 nodes | `grep -l priceRange pages/*.html` | No files matched | PASS |
| C17 | Homepage and `/about` emit exactly 1 Organization/ProfessionalService node | Node script: parse ld+json, count nodes whose `@type` includes Organization or ProfessionalService | `__.html`=1, `__about.html`=1 | PASS |
| C18 | `/blog/gift-aid/gasds-rules` renders a real "Frequently asked questions" section in server HTML | `grep -c`; confirm literal `<h2>` heading and `<dl>` FAQ block | 1 real `<h2>...Frequently asked questions</h2>` + `<dl class="mt-6 space-y-6">` block | PASS |
| C19 | `/blog/trustee-compliance/annual-report-vs-annual-return` does NOT gain a duplicate FAQ section | `grep -c "Frequently asked questions"`; check for the auto-generated `<dl class="mt-6 space-y-6">` marker | Raw grep = 2 (1 real `<h2>` in original article body + 1 RSC-flight duplicate of the same string, confirmed by inspecting both matches); no `<dl class="mt-6 space-y-6">` block present (0) — no auto-added FAQ block | PASS |
| D20 | Site-wide expect-zero claim phrases | `grep -l` for 16 phrases across all 72 pages | 15/16 phrases = 0 matches. "from £" matched once on `/research/uk-charity-cause-income`, but context is "Median income ranges from £15,000..." — a statistics sentence, not a fee claim | PASS (the one raw hit is not the claim the row is guarding against — see FALSE section) |
| D21 | Present: "connect you with an independent examiner" (2 on homepage), "Book your free..." CTA, "we will arrange a short introductory call" on ≥20 URLs | `grep -o` for real (unescaped) occurrences only, `grep -l` counts | Homepage has only **1 real rendered occurrence** of "connect you with an independent examiner" (raw grep=2 was 1 real + 1 RSC-flight dup, confirmed by inspecting both matches — one is plain HTML, the other is inside a `\"...\"` flight string). "Book your free, no-obligation call today" present on 1 page. "we will arrange a short introductory call" present on 32 pages (≥20 ✓) | **FAIL on the "2 on homepage" sub-claim** — real count is 1, not 2. Other two sub-claims PASS |
| D22 | "Specialist charity accountants" still on all 72 URLs, measured as per-page presence (not raw grep totals, per the brief's own counting note) | Loop: `grep -qi` per page | 72/72 pages contain it | PASS |
| E23 | `/privacy-policy` 0 matches for 10 leak phrases | `grep -ioc` for each | All 10 = 0 | PASS |
| E24 | `/privacy-policy`: exactly 4 "partner firm we work with"; contains "After that we anonymise it"; NOT "after which it is deleted"; contains "country, region, city and time zone" | `grep -o '<[a-z][^>]*>[^<]*partner firm we work with'` (real-DOM only, to defeat RSC dup); `grep -c` for the others | Real occurrences of "partner firm we work with" = 4 (raw grep was 8, confirmed 4 distinct sentences each doubled by RSC); "After that we anonymise it"=1 (present); "after which it is deleted"=0 (absent, correct); "country, region, city and time zone"=1 (present) | PASS |
| E25 | `/privacy-policy` retains "We will not pass your enquiry on at all" | `grep -c` | 1 | PASS |
| E26 | `/cookie-policy`: "only a country derived from it"=0; "country, region, city and time zone"=1 | `grep -c` | 0 and 1 | PASS |
| E27 | `/terms`: 0 matches for `firm\|partner network` | `grep -Eic` | 0 | PASS |
| E28 | KNOWN-UNFIXED: `/thank-you` and `/complete` still contain "partner network", report exact count | `grep -o "partner network"` (raw) then de-duplicated against RSC | `/complete`: 1 real occurrence ("a specialist firm from our partner network will be in touch"), raw grep=2 (RSC dup). `/thank-you`: **0 matches, no mention of "partner" at all** — the page currently reads "we work closely with Aswatax, a firm of Chartered Tax Advisers" with no partner-network language | **FAIL as written for `/thank-you`** — it is not "known-unfixed", it is already clean. `/complete` matches the brief (non-zero, count=1) |
| F29 | 0 em-dashes across all 72 rendered pages | Loop: `grep -q $'\xe2\x80\x94'` per file | No file matched | PASS |
| F30 | Article bodies still render full content under `prose` class (styling not fixed, content not lost) | `grep -c 'class="[^"]*\bprose\b'`; `wc -c` on 3 posts | `prose` class present (count 1) on all 3 sampled posts; file sizes 59–76 KB, clearly full article bodies present | PASS |

## Summary

- **Total rows: 30**
- **Pass: 27**
- **Fail: 2** (both partial — one sub-claim within a multi-part row, one whole row)
- **Not a wave defect, brief inaccuracies noted separately below (do not require a fix agent): 3** (B14's exact-string mismatch, D20's "from £" false-positive substring, and one PASS row's dup-count context)

### Failures for the fix agent

1. **D21 — homepage "connect you with an independent examiner" appears once, not twice.**
   `curl -s http://localhost:3118/ | grep -o 'connect you with an independent examiner'` returns 2 raw matches, but one is the real DOM occurrence and the other is its RSC-flight-payload duplicate (verified by extracting 40 chars of context around each match — one sits inside plain `<p>...</p>`, the other inside an escaped `\"...\"` flight string). There is only **one real place on the homepage** carrying this phrase. If the fix wave's intent was two distinct homepage placements of this line, a second real instance needs to be added; if one placement was always the intent, the brief's "(2 on homepage)" note should be corrected instead — flag to the manager which is true before acting.

2. **E28 — `/thank-you` does not contain "partner network" (brief says it should, as a known-unfixed item).**
   `grep -oi partner http://localhost:3118/thank-you` (fetched HTML) returns zero matches of any kind. The current `/thank-you` body reads: "Thanks, your enquiry is on its way. For specialist tax advisory work, including complex structuring and tax planning, we work closely with Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs that level of advice, it may be their team who contacts you." There is no "partner network" language present. This is not a defect to fix — it means the brief's premise about `/thank-you` is wrong; only `/complete` still has the open item (1 real occurrence: "a specialist firm from our partner network will be in touch to arrange your independent examination" or similar). No action needed on `/thank-you`.

## Brief items found FALSE (not the build's fault, the brief's wording)

- **B14**: the brief's first exact quote, "every Scottish charity needs external scrutiny," does not appear verbatim anywhere. The real sentence on `/calculators/independent-examination-vs-audit-checker` is "every Scottish charity needs **some form of** external scrutiny regardless of income..." — same substance, extra words. The second quote, "All Scottish charities are subject to external scrutiny," is verbatim and present once on `/guides/charity-sorp-2026`. Both claims survive; only the first literal string in the brief was inexact.
- **D20**: the "from £" expect-zero check has one incidental hit on `/research/uk-charity-cause-income` — "Median income ranges from £15,000 (Environment / conservation / heritage) to..." — a statistical range sentence, not a "from £X" fee-anchoring claim. Treated as PASS since it isn't the claim being guarded against; flagging in case the manager wants the phrase list tightened to avoid false alarms on future sweeps.
- **E28**: as detailed above, the brief's premise that `/thank-you` is a known-unfixed carrier of "partner network" is false on this build — it is already clean.

## Could not run / out of scope

- Nothing in the 30-row brief was un-runnable. All checks were executed against the live build with `curl`/`grep`/small Node parsing scripts; no `next build`, `git`, or file edits were performed, and no subagents were launched.
