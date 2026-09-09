# Micro-SaaS discovery sprint (2026-09-09)

Owner-approved 2026-09-09. Goal: find paid tools/micro-SaaS with PROVEN willingness to pay
(people already paying an incumbent), that we can build slightly better and acquire customers
via search (our machinery). Self-serve revenue, no lead buyers, no middleman.

Model reference: "clone-and-improve" indie playbook (find what people pay for, fix what its
own customers complain about, out-distribute via SEO). Property = the success template where
applicable: free tool as magnet + programmatic long-tail + established-domain crawl trust.

## Target profile (hard filters)

- Customers arrive via SEARCH (problem queries, "X alternative", "X pricing", "X vs Y")
- Self-serve signup + checkout (Stripe), no sales calls, no onboarding
- Single-player utility: no network effects, no marketplace cold-start
- v1 buildable in DAYS by one dev
- Near-zero support: no sensitive/regulated data, no fragile integrations
- Visible incumbent pricing = free willingness-to-pay evidence

## Guardrails (standing)

- No FCA-regulated verticals, no s.21 financial promotions, no CMC/claims-management
- No SRA/audit-signature dependencies; owner is not a qualified accountant, nothing advisory
- Templates/information/software OK, advice not
- No wholesale IP lift; "better" = own build informed by public complaints
- DataForSEO budget cap this sprint: $10 (balance ~$41 at 09-01)
- Report-only until owner picks; no domains bought, nothing deployed

## Stages

- **S0 Universe** (this session): 3-agent web fan-out -> raw candidate list (~50+).
  Sources: public-revenue indie SaaS (open startups, Indie Hackers, known portfolio
  founders), acquisition marketplaces (Acquire/Flippa/Microns = priced proof), UK/
  accounting-adjacent paid tools (estate-synergy bonus lane).
- **S1 Demand**: DataForSEO per surviving category: problem-query volume, brand volume,
  "alternative/pricing/vs" volume, KD. Kills anything without SEO-acquirable demand.
- **S2 Complaint mining**: G2/Capterra/Trustpilot/Reddit on survivors -> pain list ->
  the "little bit better" spec per candidate, in customers' own words.
- **S3 Ops/build filter**: build-days estimate, support load, data sensitivity, payment
  model, churn shape. Kill list with reasons.
- **S4 Distribution plan** per survivor: programmatic/content cluster shape, whether an
  estate domain can host or feed it (days-to-index vs months on fresh domain), corpus size.
- **S5 Scoreboard**: ~5 finalists ranked by TIME-TO-FIRST-POUND, each with: what it is,
  incumbent pricing, demand numbers, complaint-derived spec, build days, hosting call,
  honest weeks-to-first-pound. Owner picks 1-2; first build same week.

## Data home

`expansion_research/saas_discovery/` (mirrors spv_formation layout). Reuse
`expansion_research/spv_formation/run.py` DataForSEO pattern (budget-capped _post).

## Status

- S0 COMPLETE 2026-09-09: 3 agent reports in `expansion_research/saas_discovery/`
  (S0_INDIE_REVENUE.md, S0_MARKETPLACE_CATEGORIES.md, S0_UK_ADJACENT.md).
- S1 COMPLETE 2026-09-09: `s1_demand.py` -> S1_DEMAND.md, spend $0.27.
  Headlines (UK/mo Google Ads volumes): dvsa_slots 42,040 (head term 33,100);
  mtd_bridging 19,160 at £11-35 CPCs; sa_estimator 5,320; deal_analyser 4,410;
  dividend_voucher 1,310 exact-intent. Global lane weak at query level except
  bank_statement (1,600 UK + 1,600 US head, CPC $12-69). Testimonial/cron/og-api
  volumes tiny -> those markets are not SEO-front-door at scale; deprioritised.
- S2 COMPLETE 2026-09-09: S2_UK_COMPLAINTS.md + S2_DVSA_BANKSTMT.md.
  KILLED: DVSA slot checker (third-party booking an offence Apr/May 2026, 17 apps
  removed from stores, 1,100+ licences suspended, notify-only also banned, no API,
  100% designed churn — category in state-managed wind-down). DEMOTED: bank
  statement converter (incumbent re-verifies at ~$16k/mo not $318k/yr; 15+ me-too
  AI sites 2024-26; viable only as UK-first bookkeeper wedge).
- S3/S4 folded into S5 (agents returned build + distribution facts inline).

## S5 SCOREBOARD (2026-09-09)

Cross-cutting finding: every incumbent category shares the same three sins —
silent auto-renewal/billing traps, email-only support that goes dark, pricing
mismatched to task frequency. "Boringly honest billing + reachable support" is a
differentiator by itself.

| # | Play | Demand (UK/mo) | Price anchor | Build | Weeks to first £ | Verdict |
|---|---|---|---|---|---|---|
| 1 | MTD ITSA landlord filer ("never relearn it" spec) | 19,160 @ £11-35 CPC | £12-36/yr bridging; landlord-first can hold £49-79/yr | WEEKS (HMRC sandbox + fraud headers + recognition; engineering not licence) | 6-10 | **FLAGSHIP.** Mandation live, HMRC auto-signup from Sept 2026, £30k wave Apr 2027; converges with the July/Sept MTD-hub pick; estate already ranks for the funnel |
| 2 | Dividend voucher + minutes PDF pack (catch-up mode = killer feature) | 1,310 exact-intent | Pay-per-use £5-15/pack or ~£19/yr; NO monthly | ~2 days (doc-gen + Stripe link, host on estate) | 1-2 | **PILOT.** Small money, but proves the self-serve checkout muscle estate-wide in week 1; zero regulation |
| 3 | BTL post-tax deal analyser (3-way: personal s24 / company / joint) | 4,410 + existing calc traffic | Flat £5-9/mo, unlimited, no credits | ~1-2 weeks (extends existing 27-tool fleet + employerNic/extraction libs) | 3-6 | **SECOND.** Free front door already live on Property; paid tier = saved deals/portfolio/scenarios |
| 4 | Landlord SA estimator | 5,320 | — | — | — | FUNNEL, not product: free tool feeding #1 |
| 5 | Bank statement converter (UK bookkeeper wedge) | 1,970 UK | packs that never expire + flat sub | ~1-2 weeks | 8+ | PARKED: real but SERP knife-fight, no estate synergy |
| — | DVSA slot checker | 42,040 | — | — | — | KILLED (offence, enforcement, designed churn) |
| — | Testimonial/cron/screenshot/OG tools | <500 combined | — | — | — | KILLED (not search-acquired; distribution fails) |

Recommended sequence: #2 now (first pound inside ~2 weeks, rails proven), #1
started in parallel (HMRC recognition lead time; catch Jan SA panic + Apr 2027
wave), #3 after as paid tier on the existing fleet. #4 built free as part of #1's
funnel. Positioning on all three: flat honest pricing, no credits, no
per-submission fees, renewal warnings, reachable support at deadline windows.

Owner decision pending: approve build order (#2 pilot then #1 flagship).
