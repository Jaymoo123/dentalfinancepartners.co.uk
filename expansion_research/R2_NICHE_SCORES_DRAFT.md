# R2 Niche Scores — DRAFT for owner sign-off (G2 niche-list gate)

Date: 2026-07-11. Inputs: R2A (SERP composition, 89 niches), R2B (lead value, cited), R2C (own-estate overlap, calibrated), R2D (UK volumes + CPC, $0.18 spend), R1 (SIC magnitudes). Merged table: `r2_synthesis.csv` / `.json`. 13 candidates already hard-excluded as expansions of existing sites (R2C).

Method note: volumes are Google Ads head-term clusters (rank-order reliable, absolute values conservative — long-tail demand multiplies these severalfold, as the estate's own GSC data shows). SERP verdicts overstate competition in globally-flavoured niches (documented R2A audit bias). Lead value 1-5 from cited fee bands.

## Recommended new sites — Tier 1 (propose building, in order)

| Rank | Site (niche group) | Rolled-in candidates | Evidence summary |
|---|---|---|---|
| 1 | **Charities & non-profits** | charities #74, CICs #75, churches #76 (content only) | Highest demand of all clear candidates (vol 2,570+90), lead value 4 HIGH (audit/independent-examination fees), only CONTESTED field (2.67 specialists), CLEAR overlap. Data-asset potential: Charity Commission/CH registration trends. Calculators: Gift Aid, charity VAT, trading-subsidiary threshold. |
| 2 | **Hospitality** | restaurants #53, pubs #55, takeaways #54, hotels #56, caterers #58, hospitality family #57 | Combined vol ~2,290, lead 4 HIGH, weakest fields in the top demand band (pubs 1.33 specialists WEAK, hotels WEAK, takeaways WEAK). CAUTION on generalist only (positioning: trade-specific ops content — tronc, TOMS, VAT on food). |
| 3 | **Startups & tech/SaaS** | startups #33, tech/SaaS #34 | Combined vol 2,860, CPC £30-40 (highest commercial intent), CONTESTED (startups 2.0; SaaS STRONG verdict carries the US-bias caveat — pilot.com etc. are not UK competitors). R&D relief, SEIS/EIS, share schemes = deep content + calculator space. CAUTION generalist. |
| 4 | **Ecommerce sellers** | ecommerce #35, Amazon FBA #36 | Vol 2,000, lead 4 HIGH, CPC £35-44 (top of estate). Genuinely STRONG specialist field (6.67) — hardest Tier-1 fight, justified by lead value and demand; needs the full A* treatment to compete. |
| 5 | **Crypto traders & investors** | crypto #39, day/forex traders #40 | Vol 1,490, lead 4 HIGH (engagements £750-2k), STRONG 4.33 but young field (few entrenched domains). CAUTION property (CGT-content adjacency — positioning: trading/DeFi/staking, not property CGT). |
| 6 | **Recruitment agencies** | recruitment #49 | Vol 1,150, lead 4, CONTESTED 2.0, CLEAR. Sits beside agency site but R2C metrics show no query overlap (agency = accountants FOR agencies' finances? No — agency site is accountants for digital/creative agencies; recruitment agencies are a distinct trade with distinct ops: temp payroll, umbrella chains, IR35 exposure on the OTHER side of the table). |
| 7 | **Creative & media industries** | film/TV #43, actors #42, musicians #41, artists #44, content creators #37, OnlyFans #38, authors #45, photographers #46 | Combined vol ~2,900 across sub-niches; film/TV alone 1,710 with one 1,600/mo head term. Specialist fields are STRONG per sub-niche but DIFFERENT specialists per sub-niche — a breadth site with strong sub-hubs can flank them. Lead value mixed (2-4). CAUTION agency (actors) — positioning distinct. |
| 8 | **Care sector** | care homes #24, domiciliary care #25 | Lead value 5 HIGH (fees £3,000-7,000/yr, top of R2B), vol modest (190) but CQC-regulated business audience with heavy compliance needs. CAUTION medical (positioning: care BUSINESSES, not clinicians). Domiciliary care field is only CONTESTED. |

## Tier 2 (build after Tier 1, or on owner preference)

| Rank | Site | Why not Tier 1 |
|---|---|---|
| 9 | **Manufacturing & engineering** (#73, #51) | WEAK_FIELD 0.67 (best sleeper), lead 4, but low measured head-term demand (390 combined). Capital allowances/R&D content depth is a moat. |
| 10 | **Farmers & rural businesses** (#68, landed estates #7) | Lead value 5 but the most entrenched specialist field measured (7.33-9.0; Old Mill, Armstrong Watson tier). APR/BPR 2026 changes = topical wedge. High effort to win. |
| 11 | **Expats & non-residents** (#80) | Lead value 5 HIGH, but STRONG 7.67 global field; CAUTION property (NRL/NRCGT content adjacency). |
| 12 | **Retail & independent shops** (#69) | WEAK_FIELD 0.33 sleeper, CPC £25, but low head demand (250) and thin differentiation vs generalist. |
| 13 | **FCA-regulated firms / financial advisers** (#52) | WEAK_FIELD 0.33, lead 4, CASS/FCA compliance moat, but tiny measured demand (170) and LOW evidence confidence. |

## Not recommended as sites (with reasons)

- **Management consultants** (#32): good numbers (680/4/CONTESTED) but CAUTION vs contractors-ir35 is real — consultants ARE PSC contractors in search behaviour. Recommend treating as a contractors-ir35 content/segment expansion instead.
- **Schools & academies** (#77): lead value 5 but acquisition is tender-based, not lead-form; wrong channel for this model.
- **Pharmacies** (#19), **opticians** (#20), **vets** (#21), **locum pharmacists** (#18): STRONG specialist fields, modest demand; natural future expansions of the medical/healthcare cluster rather than standalone sites now.
- **Taxi drivers** (#64), **couriers** (#65): real demand but lead value 2 and £150-180 real-world fees; poor lead economics.
- **HNW** (#81): lead value 5 but HNW clients don't arrive via lead forms; fold planning content into generalist.
- **Franchisees, hauliers, energy, maritime, sports pros, hairdressers, gyms, tutors, VAs, trades sub-niches, all zero-volume rows**: demand or lead value below the line; remain in the pool, revisit with GSC piggyback data after Tier 1 ships.
- **Estate/letting agents, property developers, property management** (#4, #5, #6): property-adjacent; better served as Property site expansions (already flagged CAUTION/EXCLUDE by R2C).

## Pilot recommendation

**Charities & non-profits.** Highest clear-overlap demand, HIGH-confidence lead value, moderate competition, sharply distinct audience/voice (tests the factory's differentiation machinery), obvious calculator fleet (Gift Aid, charity VAT, trading subsidiary, independent-examination threshold) and a natural Companies-House/Charity-Commission data asset. If the factory can ship this, it can ship the rest.

## Open items

- Volumes are head-cluster only; R3 per-niche deep research produces the true topic-pool sizes (content volume derivations) per signed-off niche.
- DataForSEO balance: $49.79 remaining; R3 estimated $3-8/niche.
- Red-team pass: see R2_REDTEAM.md (pending).
