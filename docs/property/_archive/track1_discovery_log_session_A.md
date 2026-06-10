# Session A — discovery log

**Append-only.** While researching and writing your assigned pages, log here anything you notice that the orchestrator should consider for future waves or broader site work. Keep entries terse — one paragraph max each.

**Format:** `## [TIMESTAMP UTC] [CATEGORY] Title` + body.

**Categories:**
- `ADJACENT_TOPIC` — a topic-gap candidate adjacent to your assignment that's NOT in `docs/property/topic_gaps_final.md` (subsequent waves should consider it)
- `CALCULATOR_IDEA` — this page or topic would clearly benefit from an interactive calculator / widget
- `COMPONENT_IDEA` — a UI pattern a competitor uses that we lack (comparison table style, decision matrix, downloadable PDF template, video walkthrough)
- `EXISTING_PAGE_STALE` — while researching, you noticed an EXISTING page (not in your assignment) that has out-of-date figures / framings / claims (feed into Track 2 sweep)
- `EXISTING_PAGE_LINK_OPPORTUNITY` — an existing page should link to your new page (cross-link not currently in our network)
- `CROSS_NICHE_LINK` — a topic that bridges niches (e.g. GP partner landlords → cross-link Property ↔ Medical when both pages exist)
- `AUTHORITY_GAP` — an HMRC manual / legislation page / case-law judgment our site doesn't cite anywhere but should
- `SERP_FEATURE` — a SERP feature (featured snippet, knowledge panel, video carousel) competitors are winning on this topic that we could target
- `INTERNAL_RESEARCH` — a question you couldn't answer with public sources; would benefit from in-house data or expert input

**Why log this:** observations made during your work are the most valuable input we have for prioritising future waves. The next-wave brief builder should read this file before generating new briefs.

**How orchestrator uses it:** weekly. Discovery log entries feed into:
- Next-wave Track 1 brief generation (ADJACENT_TOPIC entries)
- Track 2 prioritisation (EXISTING_PAGE_STALE entries get pushed up the queue)
- Component build backlog (CALCULATOR_IDEA + COMPONENT_IDEA entries)
- Cross-niche linking table (CROSS_NICHE_LINK entries)
- Authority-link library updates (AUTHORITY_GAP entries)

---

## [Sessions: append below this line]

## [2026-05-22T01:15Z] [CALCULATOR_IDEA] SDLT surcharge refund eligibility checker

A 4-question interactive widget would convert well on the A1 page: (1) effective date of new purchase, (2) disposal date of old home (or "not yet sold"), (3) was the old home your main residence at any point in the 3 years before completion, (4) joint or sole ownership. The widget would output a) within / outside the 3-year window, b) latest claim filing deadline, c) likely evidence requirements, d) a soft CTA. Existing /calculators infrastructure should support this without new architecture.

## [2026-05-22T01:15Z] [AUTHORITY_GAP] SDLTM09807 not previously cited on our site

HMRC SDLT Manual SDLTM09807 is the canonical published source for the exceptional-circumstances test under paragraph 3(7A) Schedule 4ZA. Competitor coverage cites it; our site did not until A1. Worth adding to the authority-link library so future SDLT pages (A6 probate transfers, A7 non-resident surcharge interaction, A8 refund scams) reach for it.

## [2026-05-22T01:15Z] [EXISTING_PAGE_LINK_OPPORTUNITY] Pillar should link forward to A1

`sdlt-buy-to-let-rates-surcharge-guide-2025` (the rates pillar) has a single FAQ on the refund route that condenses the mechanics into 2 sentences. That FAQ should gain an in-line link to A1 for readers who want the full claim process. Suggest adding `<a href="/blog/landlord-tax-essentials/sdlt-5-percent-surcharge-refund-claim-process">see our step-by-step claim guide</a>` inside that FAQ's answer.

## [2026-05-22T01:15Z] [ADJACENT_TOPIC] SDLT "main residence" determination case law

Competitor 1 spent significant body real estate on what "only or main residence" actually means (multi-factor test, no statutory definition, case-law principles). Topic_gaps_final.md does not appear to have a standalone "what counts as a main residence for SDLT" page. Strong candidate for a future wave: the test is referenced across A1, A6, A7, and any future "second home" content, so a hub page would carry sibling load.

## [2026-05-22T02:05Z] [ADJACENT_TOPIC] SDLT linked transactions deep dive (s.108 FA 2003)

The single-transaction vs linked-transactions distinction is central to A2 (six-dwellings) and A5 (group relief) and A3 (sub-sale), but topic_gaps_final.md doesn't appear to have a dedicated "linked transactions for SDLT" page. The rule under s.108 FA 2003 has surprising reach for portfolio investors making sequential purchases from a single seller, and a hub page would carry sibling load across the SDLT bucket. Candidate for a later wave.

## [2026-05-22T02:05Z] [EXISTING_PAGE_LINK_OPPORTUNITY] Existing SDLT pillar + cost-of-transfer page need forward-link to A2

Both `sdlt-buy-to-let-rates-surcharge-guide-2025` (FAQ #4 + body H2) and `sdlt-transfer-property-company-cost` (H3 "Six-Dwellings Election") cover the six-dwellings rule in 2-3 sentences each. Both should gain an in-line link to A2 ("see our deep dive on the six-dwellings election" or similar) so readers who want the mechanics get there. Especially relevant if the orchestrator also fixes the Sch 6B / s.116(7) citation across these pages.

## [2026-05-22T02:05Z] [SERP_FEATURE] "How much does a £Xm bulk acquisition save?" featured-snippet target

Competitor 1 leaves the worked saving figure implicit. A2's worked-example bands table (£3m → £284k saved) is precisely the format Google picks up for featured snippets on "SDLT savings six dwellings" type queries. Worth monitoring after launch; the comparison-table component pattern is reusable across all SDLT relief pages (A3, A5, A7).

## [2026-05-22T11:30Z] [EXISTING_PAGE_STALE] Two SDLT pages on main still cite Sch 6B para 7 — Track 2 priority

Per M-2, two existing pages (`sdlt-buy-to-let-rates-surcharge-guide-2025.md` FAQ #4 + body H2, and `sdlt-transfer-property-company-cost.md` H3 "Six-Dwellings Election") inherited the wrong "Sch 6B para 7 election" framing for the six-dwellings rule. House positions doc has been corrected on main; A2 revised. The two existing pages still need the synchronised correction. Manager committed to handling these on main as part of Track 2 sweep — flagging here as a discovery so the Track 2 plan picks them up automatically.

## [2026-05-22T11:30Z] [ADJACENT_TOPIC] "Section 75A FA 2003 SDLT general anti-avoidance rule" deserves its own page

The s.75A GAAR is referenced across A3 (sub-sale relief), and is the backstop HMRC uses on virtually every aggressive SDLT scheme. Topic gaps doesn't list a standalone s.75A explainer. A page setting out the four-step test (notional transaction, tax saving, lack of commercial purpose, counteraction) plus key case law (Project Blue, Hannover Leasing) would carry sibling load across the whole SDLT bucket and would let A3, A5, A8 and any future scheme-related pages link out cleanly.

## [2026-05-22T11:30Z] [CALCULATOR_IDEA] SDLT route decision tree calculator

Across A1 (refund), A2 (six-dwellings), A3 (sub-sale), A5 (group relief), buyers need to identify which SDLT route fits their facts. A short decision-tree widget (how many dwellings? single contract? buyer connected to seller? existing portfolio or new acquisition?) routing to the right page would convert better than asking readers to self-diagnose. Reusable across all SDLT bucket pages.

## [2026-05-22T02:05Z] [AUTHORITY_GAP] HMRC SDLTM07550 / SDLTM33760 family on the six-dwellings rule

The HMRC SDLT Manual has dedicated pages on the six-dwellings non-residential rule (around SDLTM07550 and the SDLTM33700 range for related linked-transaction guidance). Our site does not cite these. Worth adding to the SDLT bucket's authority library, and the orchestrator should consider whether to direct-link them from A2 in a revision once the citation question (s.116(7) vs Sch 6B para 7) is settled.

## [2026-05-22T01:15Z] [COMPONENT_IDEA] Evidence-requirements table component

The Step 5 evidence table in A1 (HMRC's likely evidence requirements, mapped to documents that satisfy them) is a pattern that will recur on A6 (probate transfers, evidence of beneficiary status), A7 (residence days evidence), and many CGT pages (PRR evidence, deemed-occupation evidence). Worth turning into a reusable MDX component if the network drifts toward repeated evidence tables.

