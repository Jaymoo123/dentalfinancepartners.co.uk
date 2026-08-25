# Coverage note: /blog/capital-gains-tax/principal-private-residence-relief-landlords

Work done 2026-08-20. Grade EXTEND-BING, additive only. Pack:
`briefs/property/cgt/packs/PACK_blog_capital-gains-tax_principal-private-residence-relief-landlords.md`.
Revised 2026-08-20 after QA (`qa/EDITORIAL_batch1.md` page 2, `qa/FACTUAL_reliefs-family.md` page 1).

## What changed

- 5 new H2 sections inserted between the intro and `<h2>The section 222 framework</h2>` (plain-language layer above the specialist depth, per pack §6 and dossier §6).
- 7 new FAQ entries appended after the 14 existing ones.
- `dateModified: "2026-08-20"` and `reviewedAt: "2026-08-20"` added to frontmatter (both fields were absent; 585 and 558 of the blog corpus carry them respectively).
- Words added: 1,145 body + 920 FAQ = 2,065. Page body 3,608 -> 4,753 words.

Protected elements verified byte-identical by script and by `sdlt_equity_gate.py`: metaTitle, title, h1, summary, all 14 existing FAQ entries, all existing prose, existing H2 set and order (new H2s sit above the first existing one, so no existing heading moved relative to another).

## New H2 sections

1. "Do you pay capital gains tax on your main residence?"
2. "Is there capital gains tax on a primary residence in the UK?"
3. "What is the main residence exemption, and how much of your gain does it cover?"
4. "Are PRR, PPR and private residence relief different reliefs?"
5. "How do you work out the capital gains tax on a home you have lived in?"

## New FAQ entries

1. Do you pay capital gains tax when you sell your home?
2. Is there capital gains tax on a primary residence in the UK?
3. What is the main residence exemption for capital gains tax?
4. Is PPR the same as PRR?
5. Do you have to tell HMRC when you sell your main home?
6. How much capital gains tax will you pay on a home you lived in and then rented out?
7. Does the relief stop as soon as you move out of your main residence?

## QA fixes applied (2026-08-20, second pass)

| Finding | Fix |
|---|---|
| EDITORIAL BLOCKER 2.1 (two examples both landing on 81 qualifying months) | New example refacted to 12 years owned / 8 lived in / 4 let: 105 of 144 months, just under 73% relieved. No shared number with the existing Mark and Sarah example (81/192, 42.2%). Re-derived exactly: 105/144 x £150,000 = £109,375; £40,625 left; less £3,000 AEA = £37,625; at 24% = £9,030. Joint variant: £54,687.50 exempt each, £17,312.50 taxable each, £4,155 each, £8,310 total, so the second AEA saves exactly £720. The H2 3 illustration and FAQs 3 and 6 were moved onto the same 12/8 scenario so the page states one scenario, not three. |
| EDITORIAL BLOCKER 2.2 (visible keyword list in a sentence) | Sentence deleted in full. See the keyword table below for where the five variants now sit. |
| EDITORIAL BLOCKER 2.3 (redundant keyword sentence; noun-stacks) | "The capital gains tax primary residence position is identical whether..." deleted. "The capital gains tax main residence rules come down to one question" -> "It comes down to one question". "Working out capital gains on main residence sales takes five steps" -> "Five steps, and the first four fit on the back of an envelope". |
| EDITORIAL BLOCKER 2.4 (new reporting paragraph duplicates the existing reporting section) | Paragraph deleted. The 60-day link is kept as a one-clause pointer on the end of the joint-ownership sentence: "the reporting section further down sets out when a return is needed and when it is not." |
| EDITORIAL ADVISORY 2.5 (colon-plus-keyword-list heading) | H2 4 renamed to "Are PRR, PPR and private residence relief different reliefs?" |
| EDITORIAL ADVISORY 2.6 (second person at 59.9/1,000) | Now 46.4/1,000 across the new sections (winner benchmark 39.7, spec floor 25). Deliberately not pushed lower: a first pass landed at 28.0, which read colder than the second-home page QA praised at 42.0, so second person was restored in the direct-answer sentences and the step list. |
| EDITORIAL ADVISORY 2.7 / BLOCKER X.1 (numeric lead-ins) | Cut from three to one. "Four situations create a bill:" -> "That happens when:"; "Two things people expect that are not true." -> continuous prose; "Five steps" retained as the single enumeration. |
| EDITORIAL BLOCKER X.2 (twin of the second-home page's "Two things people raise that are not relevant") | Rewritten as continuous prose: "People often expect a minimum residence period... Nor does buying a second property retrospectively tax the first one." |
| EDITORIAL BLOCKER X.5 ("check the date on anything you read", twice in the batch) | Clause dropped from this page; the second-home page keeps the line. |
| EDITORIAL ADVISORY X.6 (joint-ownership closer twice in the batch) | "which is why a couple usually pays less than a sole owner on the same gain" -> "which is worth real money on a large gain". |
| FACTUAL ADVISORY 1 (ownership measured completion-to-completion) | Step 2 corrected to exchange-to-exchange, with the completion point kept where it belongs: "The 60-day filing clock is the one that runs from completion instead." (TCGA 1992 s.28; CG14260, CG64920.) |
| FACTUAL ADVISORY 2 (half-hectare framing) | Bullet now reads "half a hectare (about 1.24 acres, including the ground the house stands on)". (HS283, CG64800.) |
| FACTUAL ADVISORY 3 ("no minimum period" without the counterweight) | Now reads "There is no such rule, although HMRC weighs the quality and permanence of the occupation rather than the calendar, so a token stay does not create a main residence." Matches the formulation on the buy-to-let step-by-step page. (Goodwin v Curtis; CG64435.) |

EDITORIAL ADVISORY X.7 (a `.tmp` file from a concurrent writer inside `Property/web/content/blog/`) is not this page's to fix and nothing was left behind by this work; flagged to the coordinator as a `.gitignore` or scratch-path question for the pipeline.

## Section-3 keywords: placed verbatim

Script-verified, case-insensitive, tags stripped:

| keyword | vol/mo | where |
|---|---|---|
| capital gains tax main residence | 880 | H2 3 opening sentence, as the leading substring of "the capital gains tax main residence exemption" |
| capital gains tax main residence exemption | 70 | H2 3 opening sentence |
| cgt main residence exemption | 70 | H2 3 closing illustration ("the CGT main residence exemption covers just under 73% of your gain") |
| capital gains tax private residence relief | 260 | H2 4 opening ("Capital gains tax private residence relief is what HMRC's own helpsheet calls it") |
| cgt private residence relief | 260 | H2 4 lettings-relief contrast ("It does not replace CGT private residence relief; it comes after it") |

## Section-3 keywords: placed as close variant

The intent is carried by an H2 or FAQ; the exact string is not forced because it is a noun stack that fails the editorial gate. Four of these were verbatim in the first draft and were removed on QA (BLOCKERS 2.2 and 2.3), which is a deliberate trade of exact-match coverage for register.

| keyword | vol/mo | carrier |
|---|---|---|
| capital gains tax primary residence | 880 | H2 2 heading "Is there capital gains tax on a primary residence in the UK?" (was verbatim; the noun-stack sentence carrying it was deleted per BLOCKER 2.3) |
| capital gains on main residence | 880 | H2 5 heading and body (was verbatim in "capital gains on main residence sales"; deleted per BLOCKER 2.3) |
| cgt on primary residence | 880 | H2 2 heading + the page's mixed use of "CGT" and "capital gains tax" throughout (was verbatim in the deleted keyword list, BLOCKER 2.2) |
| cgt on main residence | 110 | H2 1 heading in the full-form wording (was verbatim in the deleted keyword list, BLOCKER 2.2) |
| capital gain on primary residence | 880 | singular inflection of the H2 2 heading |
| capital gain on main residence | 880 | singular inflection of the H2 1 heading |
| capital gains tax and primary residence | 880 | H2 2 heading + body; the "and" form is a DataForSEO stem artefact, not a phrase a person types |
| capital gains on primary residence uk | 140 | H2 2 heading ends "...on a primary residence in the UK?" |
| cgt on primary residence uk | 140 | as above |
| capital gains primary residence uk | 140 | as above |
| capital gains tax on primary residence uk | 140 | as above |
| do you pay capital gains tax on primary residence | 110 | H2 1 heading is the same question in the main-residence wording; FAQ 2 is the primary-residence wording |
| cgt on ppr | 90 | H2 4 is the naming section; the page uses PPR and PRR throughout and already ranks 4-8 on bare "ppr"/"prr" in the Bing register (was verbatim in the deleted keyword list, BLOCKER 2.2) |
| cgt ppr | 90 | as above |
| ppr cgt | 90 | as above, reversed token order |
| capital gain tax main residence exemption | 70 | typo/stem variant of the placed "capital gains tax main residence exemption" |
| capital gains main residence exemption | 70 | article-free stem of the placed form, same sentence |
| capital gain main residence exemption | 70 | as above |
| main residence exemption cgt | 70 | reversed token order of the placed "CGT main residence exemption" |
| cgt exemption for main residence | 70 | H2 3 heading + "CGT main residence exemption" placed verbatim |

## Section-3 keywords: declined

| keyword | vol/mo | reason |
|---|---|---|
| capital gains tax homes | 480 | Ungrammatical as written; forced verbatim placement would read as stuffing. Intent carried by "capital gains tax on homes only starts to bite when..." in H2 1. |
| ppdcgt | 170 | Off-subject. PPDCGT is HMRC's name for the property-disposal (60-day) CGT return; that subject is owned by `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026` (dossier §4c.3). Placing it here would stack two pages on one intent. |
| home sale capital gains calculator | 90 | Tool intent. Owned by `/calculators/capital-gains-tax-calculator` (dossier §4c.1). The SDLT calculator test (dossier §4b) is the evidence that prose does not serve a tool SERP. |
| second home capital gains tax calculator | 90 | Tool intent plus second-home subject, which is a queued new page (`capital-gains-tax-second-home-sale`, dossier §4c.6). |

Totals after QA: 5 placed verbatim, 20 placed as close variant, 4 declined, of 29 section-3 keywords.

## Competitor themes (pack §4): decided, none left open

| Theme | Source | Decision |
|---|---|---|
| "What is Private Residence Relief" plain-language definition | optimiseaccountants | PLACED, H2 4 (naming) + H2 3 (what it covers). |
| "Move back into a home to extend the relief" | optimiseaccountants | DECLINED as a new section. The mechanism is the bookend requirement in our existing deemed-occupation H2, which is deeper than theirs. A "move back in to extend relief" section reads as a planning invitation that fails the quality-of-occupation test (Goodwin v Curtis). |
| "A note on CGT when selling a house" | optimiseaccountants | PLACED as H2 5. |
| Booking-CTA blocks / "Consultation options" / "Appointment booking" | optimiseaccountants | DECLINED. Dossier §6 lists booking-CTA padding as a do-not-copy; we already carry two `<aside>` CTAs. |
| Mr Ives tribunal case study | uklandlordtax | DECLINED. Single-case narrative; our eligibility section already carries the governing authority and HMRC's evidence factors. |
| "Is there a risk of CGT on your own home?" | uklandlordtax | PLACED, H2 1 (the situations that create a bill). |
| PRR calculator on page | uklandlordtax | DECLINED for this page. Tool intent routes to `/calculators/capital-gains-tax-calculator`; the calculator REFRAME is gated on the SDLT read (~2026-09-01). H2 5 gives the five-step manual method instead. |
| Related-posts block | uklandlordtax | Already covered by our Sources and further reading list. |
| ukpropertyaccountants pages | pack §4 | No teardown available (HTTP 202 captcha stub). Keyword data only. |

## Figures verified against `docs/property/house_positions.md` §5

- AEA £3,000 per individual: matches.
- Residential CGT 18% basic / 24% higher for 2026/27: matches.
- Final 9 months of ownership always qualify where the property was at some point a main residence: matches.
- 60-day return required for UK residents only where CGT is due; no filing where the gain is fully covered by PRR; non-residents file on every UK land disposal: matches.
- Lettings relief shared-occupation only since 6 April 2020; the £40,000 figure described as no longer claimable by most sellers: matches.
- Half-hectare permitted area, about 1.24 acres, including the site of the house: matches HS283 and the existing s.222(2) section on this page.
- Acquisition and disposal dated by exchange of contracts, not completion (TCGA 1992 s.28): corrected on QA; consistent with the existing "gap between acquisition and disposal" wording lower down.

Arithmetic in the new worked example, checked to the penny with `decimal`: 105/144 = 72.9167%; x £150,000 = £109,375; £150,000 - £109,375 = £40,625; - £3,000 = £37,625; x 24% = £9,030. Joint: £75,000 half, £54,687.50 exempt, £20,312.50 left, £17,312.50 taxable, £4,155 each, £8,310 total, saving £720 against the sole-owner £9,030. The same figures appear in FAQ 6 and the H2 3 illustration, and none of them collides with the existing Mark and Sarah example (81/192, 42.2%, £239,300 gain).

## Gate outputs (post-fix)

- `python scripts/sdlt_equity_gate.py --cluster cgt --baseline HEAD` -> `EQUITY GATE: all packs pass (equity coverage, protected elements, ledger balance)`
- `python scripts/voice_scan.py --slug principal-private-residence-relief-landlords --site property` -> `robot_score 10.3, band: CLEAN`. S1 abstract-noun voice 1 ("landlord", 0.13/1k), S2-S5 and S7 all zero, S4 em-dashes 0. S6 flags 4,589 body words against an ideal of 2,200 (over 108%), which is the page's pre-existing specialist depth, not new copy, and pack §6 forbids trading it away.
- Em-dashes across the whole file: 0. Statute references inside the new sections: 0.

## Equity risk note

GSC returns zero named queries for this page (all under the anonymisation floor), so the Bing register in pack §2 is the only per-query view. Nothing in the register was removed: "ppr", "prr", "principal private residence relief", "ppr relief hmrc", the 9-month-rule queries and the s.225B query all still match unchanged copy, and the equity gate confirms it. Failure trigger per pack §8 stands: at 28d, Bing position worse than baseline+2 or Bing clicks below 2 means revert the single commit.
