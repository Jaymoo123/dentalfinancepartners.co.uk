# SPV formation programme, scope and targeting plan (2026-09-01)

Status: DISCOVERY COMPLETE, NO CONTENT STARTED (owner instruction). Build is gated on the
decisions in §8. Research artefacts: `expansion_research/spv_formation/` (demand_corpus.csv
9,762 keywords, competitor_urls.csv 9,304 URLs, questions_corpus.csv 1,700 questions,
DEMAND_MAP.md, COMPETITOR_FOOTPRINT.md, QUESTIONS.md, OUR_DEMAND.md). Market sizing and
economics: MONETISATION_MAP_2026-09-01.md Lane B.

## 1. Objective

Own the organic funnel for UK landlord SPV / buy-to-let limited company formation and
running, and monetise it with our own formation product (setup fee + recurring registered
office / filings / support) plus the cross-sell stack (ltd-co BTL mortgage introduction,
bank referral, accountant lead). Positioning: the specialist authority option between £13
commodity agents and GetGround's ~£1,270 year one. Target window: the incorporation wave
into the Apr 2027 property income tax rise; s162 relief claims mandatory from 6 Apr 2026.

## 2. The market in four numbers

~70k new BTL companies/yr (66,587 in 2025, Jan 2026 +11% YoY); 443k stock; ~71k/mo of
on-topic UK search demand once generic noise is stripped; 0 specialist brands owning the
SERP (GetGround absent from top 6 on all 12 checked head terms; rankers are brokers,
lenders, accountant blogs and commodity agents of beatable authority).

## 3. Who we are targeting (segments, from the data)

1. **First-time incorporating landlord** (form-now bucket): decided or nearly decided,
   searching setup mechanics, SIC codes, costs. The direct customer.
2. **Portfolio transferrer** (transfer-in): owns personally, moving stock in; SDLT/CGT/s162
   questions and calculator intent (stamp duty calculator limited company 1,000/mo). Higher
   value, advice-shaped, feeds the mortgage introduction (day-one remortgage).
3. **Mortgage-first searcher** (mortgages, 41.7k/mo SPV-specific): shopping ltd-co BTL
   rates; enters through mortgage content, needs an SPV to complete. Feeds formation AND
   the introducer fee.
4. **Running-the-company landlord** (SIC/admin, tax-in-company, extraction, selling/closing
   questions): already has the company; buys the recurring services, switches agents,
   becomes an accountant lead.
5. **Non-resident/expat landlord**: small search corpus (280/mo + 27 questions) but
   GetGround charges a 70-90% premium here, so worth one hub, not a cluster.

## 4. What we are targeting (clusters, volumes, sources)

| Cluster | Search signal | Long-tail Qs | Competitor coverage | Verdict |
|---|---|---|---|---|
| Ltd-co BTL mortgages | 41,660/mo | 131 | 1,750 URLs / 14 domains | EXTEND Track B (15 pages built, undeployed), do not duplicate |
| Formation mechanics + costs | 21,210/mo raw; targeted terms ~380/mo | 49 | 188 URLs / 14 domains | BUILD, anchored on cost + how-to + product pages |
| SIC + Companies House admin | modest vol | **421** | inside specialists only | BUILD as Q&A block, biggest long-tail prize |
| Transfer-in (SDLT/CGT/s162) | 7,530/mo, calculator-shaped | 91 | 106 URLs / 15 domains | BUILD, calculator-led |
| Run-the-company + extraction | 540/mo | 171 | 220 URLs / 15 domains | BUILD Q&A + guides, feeds recurring product |
| Selling + closing the company | thin vol | 75 | thin | BUILD Q&A, nobody owns it |
| Ownership structures (spouse/kids/holdco/trust/JV) | thin vol | 41 | thin | BUILD Q&A |
| Non-resident | 280/mo | 27 | 85 URLs / 12 domains | one hub page + sections |
| Incorporate-or-not | 50/mo search | in misc | **20 URLs / 10 domains, thinnest cluster** | BUILD as conversion asset + AIO/GEO answer surface, not for search clicks |

Coverage-over-selection applies: zero-volume Q&A pages are wanted. The 694 misc questions
get triaged into the clusters above during architecture.

Two whitespace findings to exploit:
- **No competitor anywhere has an SPV-specific calculator suite** (only BTL mortgage
  calculators). We have the calculator engine and existing incorporation/SDLT/section-24
  calculators to adapt. Calculator set: incorporate-vs-personal comparison, SDLT on
  transfer/purchase via company, transfer total-cost (SDLT+CGT+fees), extraction
  (salary/dividend from a property company), SPV running-cost.
- **Incorporate-or-not is unowned** despite being the funnel entrance; near-zero search
  volume but it is the conversion and AI-answer surface.

## 5. Where it lives + where we already stand

Host decision is the owner's (§8): Property (Property Tax Partners) vs a new formation
brand/domain. Data points: estate has near-zero link equity to forfeit (2026-08-08 pull),
so new-domain cost is brand-building time only; Property already holds the surrounding tax
authority (~450 clicks/90d on incorporation/company pages, 791-page corpus, 20.9 leads per
100 pages) and the undeployed Track B SPV mortgage cluster; but Property is an accounting
brand and a formation PRODUCT changes its shape. A split is possible: content authority on
Property, product pages on the formation domain, cross-linked.

Hard prerequisite either way: de-cannibalisation pass against Property's live corpus before
any page list is final (Property already owns 6+ BTL-mortgage pages and much transfer-in
tax content; the 2026-07-30 expansion learned this the right way).

## 6. Product shape (hypothesis for owner sign-off)

Setup £400-£600 (SPV-correct SIC and articles, lender-and-solicitor-facing pack, ID
verification, bank referral) + recurring £300-£600/yr (registered office, service address,
mail scanning, confirmation statement, deadline management, support). Exact tiers priced at
sign-off against GetGround (£696 + £576/yr), Provestor (£15.83-£89/mo) and the £140
commodity floor. Cross-sell per customer: BTL mortgage introduction £500-950, bank £50,
accountant lead £85+, plus the annuity.

## 7. Ops and regulatory path (sequenced, not started)

1. HMRC TCSP AML supervision: £300 application + £400/premises/yr + £500 fit-and-proper.
   Longest lead item, start first on GO.
2. Companies House ACSP registration (£55, rising to £63 from Feb 2026): required to file
   for clients and verify identities; third-party filing becomes ACSP-only ~Nov 2026.
3. Wholesale registered-office / mail-scanning partner selection.
4. Build: order flow, CH API filing, IDV provider, GoCardless/Stripe recurring billing.
Entry cost ~£1,300-1,600 year one. None of this blocks content; content blocks on §8.

## 8. Owner decisions (the gates)

1. Host: **TAKEN 2026-09-01, Property** ("keep it on property site as we have the equity").
2. Product tiers and prices (§6 hypothesis). OPEN.
3. AML/ACSP registration: **PARKED by owner 2026-09-01** ("ignore AML stuff"). Revisit
   before the product goes live; content does not need it.
4. GO on content build. Architecture + de-cannibalisation GO'd 2026-09-01 and running;
   content writing still gated.

## 8b. Head term (settled 2026-09-01)

The generic giant "set up a limited company" (14,800/mo, £55 CPC) is WRONG-intent (generic
company registration, Companies House searchers, KD-cheap but not our buyer). The true
on-topic head family is **"spv company" (720/mo) + "set up spv company" + "spv company set
up cost" + "spv for property" (210/mo)**, held today by lenders/brokers (YBS, Practical
Law, commercialtrust) with no specialist owner. The pillar targets that family; the bigger
adjacent head "limited company buy to let mortgage" (2,400/mo) belongs to the Track B
mortgage cluster, not the pillar.

## 9. Build sequence (Phase A DONE 2026-09-01)

**Phase A architecture: COMPLETE. The page map is `expansion_research/spv_formation/
PAGE_MAP.md` + `page_map.csv` (51 units: 17 NEW incl the root pillar `/spv-company` and 1
new calculator, 12 EXTEND incl 2 calculator upgrades, 15 COVERED, 7 RESERVED Track B).**
Reality check from the triage: after dedupe and UK-relevance filtering the 1,700 questions
collapse to 664 property-relevant units, so the honest build is ~30 pages + 3 calculator
actions, not 150-250; this is a coverage and conversion play, not a traffic play. Track B's
15-page SPV/BTL finance cluster is BUILT AND ON DISK under category Property Finance
(RESERVED). Two pages rank 1.5-3.9 on transfer intent and are PROTECTED. Biggest single
uncovered head term found: "closing a limited company" 2,400/mo. Ten cannibalisation seams
are documented in PAGE_MAP.md §9, including the U36 trap (13 "sell my house to my own
company" questions are transfer intent, FAQ block only, never a page). Query-formulation
rule is in PAGE_MAP.md §4 and page_map.csv `query_variants`, inherited by every brief.

Head-term volume reconciliation: PAGE_MAP.md caveat 1 says "spv company 720/mo is not in
our corpus"; that is true of the Labs-derived demand_corpus.csv, but the figure IS verified,
pulled live from Google Ads search_volume (location UK) on 2026-09-01 in the SERP check.
Both statements stand; the 720/mo is real.

Phase B: calculators + pillar + P1 EXTEND rewrites. Phase C: P2/P3 waves (net-new engine,
batch size 1, Opus writers, standard QA gates). Phase D: deploy alongside Track B mortgage
cluster once its CTA wording is signed off. Ongoing: GSC query mining post-launch to catch
the autocomplete-blind costs+fees bucket. Content writing remains gated on owner GO.

## 10. Our current demand baseline (GSC/Bing)

See `expansion_research/spv_formation/OUR_DEMAND.md` (fresh 90-day GSC + Bing pull,
2026-09-01) for the query-level baseline this programme starts from.
