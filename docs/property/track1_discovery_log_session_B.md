# Session B — discovery log

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

## [2026-05-22T10:00Z] [CALCULATOR_IDEA] DLA section-455 cost calculator

Mechanically suited to a small two-input widget: (a) overdrawn DLA balance at year-end, (b) repayment date. Returns: s.455 charge at 33.75%, repayment deadline (year-end + 9 months + 1 day), L2P refund date (repayment AP end + 9 months + 1 day), and an implicit working-capital cost of the lag at a user-set interest rate. Would convert well on B1 (and on the existing `director-loan-property-company` page). Small build, high SERP-snippet potential.

## [2026-05-22T10:00Z] [CALCULATOR_IDEA] DLA beneficial-loan BIK calculator

Two-input widget: (a) average DLA debit balance across the tax year, (b) interest rate actually charged (default 0). Returns: chargeable benefit (balance × (official rate − actual rate)), personal income tax at 20/40/45%, company Class 1A NIC. Could share infrastructure with the s.455 calculator above.

## [2026-05-22T10:00Z] [AUTHORITY_GAP] CTM61500 (HMRC Company Taxation Manual: loans to participators)

I cited CTM61500 conceptually but didn't link it on B1 (linked the EIM official-rate manual instead). Across the wider property-company content, HMRC CTM61500-CTM61730 (the full loans-to-participators sub-chapter) is uncited anywhere on our site by my read. Should be part of the authority-link library for any future ltd-co page.

## [2026-05-22T10:00Z] [COMPONENT_IDEA] Side-by-side extraction-routes comparison table

The competitor (UK Property Accountants) does not have this. We've been describing extraction routes (DLA repayment vs dividend vs salary vs employer pension contribution) in body text. A four-column comparison table component (route / cash-tax-cost / national-insurance / annual cap / typical use case) reused across B1, B7 (`extracting-money-from-property-limited-company`), and the existing dividend / salary pages would unlock at-a-glance comparison. Single component, used everywhere.

## [2026-05-22T10:00Z] [EXISTING_PAGE_STALE] Existing `director-loan-property-company` references "official rate (currently 2.25%)" without sourcing or date

The existing shallow DLA page hardcodes 2.25% as the official rate. The rate is set in the Taxes (Interest Rate) Regulations 1989 and has been revised multiple times in recent years. Either the figure needs a "as of <date>" qualifier or it needs replacing with a generic pointer to gov.uk EIM26100. Track 2 sweep candidate.

## [2026-05-22T10:30Z] [EXISTING_PAGE_STALE] `corporation-tax-rates-property-companies-2026-27` omits CIHC point

The existing page treats £50k/£250k marginal-relief thresholds as applicable to property companies generally, but most standalone residential BTL SPVs are close investment-holding companies (CIHCs) under s.34 CTA 2010 and cannot access the small profits rate. The page is therefore over-claiming a benefit that does not apply to the majority of its readers. Track 2 sweep candidate: add a paragraph explaining the CIHC carve-out and how it interacts with associated-company arithmetic in a multi-SPV portfolio.

## [2026-05-22T10:30Z] [CALCULATOR_IDEA] Group-relief surrender optimiser

Multi-input widget: per-SPV input rows (rental profit/loss, year-end date), output: optimal surrender allocation across profitable claimants, total group-wide cash tax saved vs no-relief baseline, time-value of the relief if losses would otherwise carry forward. Pairs well with B2 and the existing corporation tax pages. Bigger build than the s.455 calculator from B1's log, but high SERP value (no UK property accountant has built this).

## [2026-05-22T10:30Z] [AUTHORITY_GAP] CTM80100 onwards (HMRC Group Relief manual) uncited on our site

I cited CTM80100 conceptually in B2 but the manual itself is uncited across our existing content. Sections CTM80100-CTM81700 cover the full group-relief regime including consortium variants, surrenders of various amount types, and HMRC's view on contrived arrangements. Should be in the authority-link library for any group-structure pages going forward.

## [2026-05-22T10:50Z] [AUTHORITY_GAP] HMRC SSE manual at CG53000-CG53800 uncited on our site

Schedule 7AC TCGA 1992 is a high-value relief for any property group with a development arm. HMRC's full SSE manual at CG53000-CG53800 (covering each condition, anti-avoidance under paragraph 5, and the boundary cases between trading and investment) is not currently cited anywhere across our property content. Should be in the authority-link library for any property-group, development, or M&A page.

## [2026-05-22T10:50Z] [ADJACENT_TOPIC] Share-sale vs asset-sale decision for property exits

Not in `topic_gaps_final.md` to my knowledge. The decision framework between exiting a property development via share sale (SSE-capable) vs asset sale (no SSE, but buyer typically pays more) is its own deep page — covering buyer-side risk pricing, the historical-liability transfer in a share deal, base-cost reset on asset deals, and how to model the two routes side-by-side. Natural next-wave Track 1 candidate.

## [2026-05-22T10:50Z] [COMPONENT_IDEA] Trading-vs-investment classifier widget

Property landlords routinely don't know which side of the trading-vs-investment line their company sits on, and the answer drives SSE, BPR (IHT), capital allowances eligibility, and several other regimes. A short interactive classifier (10 questions: % income from sales vs rent, holding period of inventory, planning status, refurbishment depth, etc.) returning a probability score plus the relevant regimes that follow would be a strong lead-magnet. Reusable across multiple pages.
