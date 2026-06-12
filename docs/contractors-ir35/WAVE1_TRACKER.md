# Wave 1 tracker (proving wave + writing-model bake-off), contractors-ir35

Opened 2026-06-12. 15 pages: 9 pillars + 6 clusters, sliced from the 644-topic seeded pool.
Every page cites `docs/contractors-ir35/house_positions.md` (HP-LOCKED 2026-06-12).
Writing-model arms are recorded blind (manifest held by the manager until judging closes; verdict lands in `BAKEOFF_2026-06.md`).

## Cannibalisation audit (vs 16 existing static routes + fixture post)

| Decision | Detail |
|---|---|
| Variant-cluster collapse | The seeder marked every autocomplete expansion of a pillar seed as `pillar` prio=8, producing ~40 same-intent variants of "what is IR35 / IR35 explained" (plus smaller variant tails on other seeds). The entire cluster is served by ONE flagship pillar. The variant rows stay in the pool and must be marked `used` against the flagship at wave close, not written as pages. |
| Fixture replacement | `content/blog/what-is-ir35.md` (P2 fixture, ~1,200 words) carries a STALE small-company threshold FAQ (£10.2m/£5.1m, superseded by £15m/£7.5m per HP §1.A). The flagship pillar REPLACES it in place at slug `what-is-ir35` (site never deployed, no URL equity concerns; tests keep their slug reference). |
| /ir35-status coexistence | The static `/ir35-status` route is a service/landing page (conversion intent). Blog pillars are informational guides. Distinct intent, coexist; blog pages link to `/ir35-status` as the service CTA. |
| Inside vs Outside vs flagship boundary | Flagship = what IR35 is (Ch.8 + Ch.10 overview). `inside-ir35` = consequences and money when caught. `outside-ir35` = protecting status and structuring. `off-payroll-working-rules-private-sector` = the 2021 reform mechanics (SDS chains, who determines). Brief packet states each page's boundary; writers must not restate a sibling's core ground beyond a linking paragraph. |
| Config slug alignment | `_INTERNAL_LINK_SLUGS` updated: `ir35-explained` → `what-is-ir35`; `inside-vs-outside-ir35` → `inside-ir35` + `outside-ir35` (the wave writes separate pillars). |

## The 15 picks

| # | Slug | Title (working) | Category | Tier |
|---|---|---|---|---|
| 1 | what-is-ir35 | What is IR35? The complete guide for UK contractors | IR35 Status | pillar |
| 2 | inside-ir35 | Inside IR35: what it means and how it affects your pay | IR35 Status | pillar |
| 3 | outside-ir35 | Outside IR35: how to protect your status | IR35 Status | pillar |
| 4 | limited-company-vs-umbrella-contractor | Umbrella vs limited company: which is right for you | Umbrella vs Limited Company | pillar |
| 5 | psc-limited-company-contractor-tax | Limited company contractor tax: the complete guide | Limited Company Tax | pillar |
| 6 | contractor-expenses-allowable-guide | Contractor expenses: what you can and cannot claim | Expenses and Deductions | pillar |
| 7 | contractor-pension-employer-contributions | Contractor pensions: using your PSC to build retirement savings | Pension and Dividends | pillar |
| 8 | how-to-choose-contractor-accountant | How to choose a contractor accountant in the UK | Contractor Accounting Basics | pillar |
| 9 | off-payroll-working-rules-private-sector | Off-payroll working rules: who determines status and who pays | IR35 Status | pillar |
| 10 | sds-status-determination-statement | Status Determination Statements: your rights and the 45-day process | IR35 Status | cluster |
| 11 | ir35-small-company-exemption | The IR35 small company exemption: 2026 thresholds and timing | IR35 Status | cluster |
| 12 | flat-rate-vat-limited-cost-trader | Flat rate VAT and the limited cost trader rule | MTD and Compliance | cluster |
| 13 | travel-expenses-inside-ir35 | Can you claim travel expenses inside IR35? | Expenses and Deductions | cluster |
| 14 | umbrella-company-holiday-pay | Umbrella company holiday pay: how it works and what to check | Umbrella vs Limited Company | cluster |
| 15 | contractor-pension-carry-forward | Pension carry forward for contractors: the three-year rule | Pension and Dividends | cluster |

## Status — WAVE 1 CLOSED 2026-06-12 (pending deploy)

| Stage | State |
|---|---|
| Slice + cannibalisation audit | DONE 2026-06-12 (this doc) |
| Brief packet | DONE (`briefs/contractors-ir35/wave1/BRIEF_PACKET.md`, amended post-wave: quoted-YAML rule + `<em>` allowance) |
| Drafts written (15) | DONE (3 arms; 1 writer died on API error, relaunched) |
| Mechanical validation | DONE (deterministic validator; caught 9 build-breaking YAML colon defects, fixed centrally; 15/15 clean) |
| Blind judging (5 Opus judges) + 2nd-judge re-verification | DONE — verdicts in `BAKEOFF_2026-06.md` |
| Failed drafts repaired (4 Opus repairs + manager back-patches) | DONE (umbrella-vs-ltd, off-payroll, small-co exemption, carry-forward; travel-expenses subsistence error + FRS leaks/logic fixed manager-direct) |
| Build + tests | GREEN (51/51 pages, 19/19 tests, 15/15 validator) |
| Topics marked `used` | DONE (13 written rows w/ slugs + 48 same-intent variants = 61/644; FRS-VAT + carry-forward pages cover intents with no pool rows) |
| Deploy | waits on P7 user gate (Vercel project) |

Post-wave notes: judges confirmed every page's figures against HP; the two intents written without pool rows are protected from regeneration by the slug-dedupe layer. Writing-model policy decided, see `BAKEOFF_2026-06.md`.
