# Calculator fleet — Startups & tech/SaaS (R3, Tier-1 #4)

Date: 2026-07-11. Demand evidence = DataForSEO keyword_suggestions, UK (2826), fetched 2026-07-11
(`raw/dfs_keyword_suggestions.json`, 446 rows). Config-driven fleet pattern per the Property
calculator engine (1 config file + 1 import per tool). All statutory figures anchor to
HOUSE_POSITIONS_OUTLINE.md (citations fetched live 2026-07-11, 32/32 passing).

## Launch tier (build with the site)

| # | Calculator | Demand evidence (vol/mo, KD, CPC) | Rules involved | Inputs → outputs |
|---|---|---|---|---|
| 1 | **R&D relief estimator (merged scheme + ERIS)** | "r and d tax credits calculator" 170 KD 0 CPC £23.68; "r&d tax credits calculator" 40 KD 0 CPC £35.65; head cluster "r&d tax credits" 3×2,400 CPC £34-51 | Merged 20% credit (taxable, so net 15-16.25% depending on CT rate); ERIS 86%+14.5% for loss-making intensive SMEs; 30% intensity test; PAYE cap flag | qualifying spend, profit/loss position, total expenditure, staff costs → estimated credit under merged vs ERIS, which route applies, notification deadline warning |
| 2 | **SEIS/EIS investor relief calculator** | "eis tax relief" cluster 2,400+1,900+320s (huge, low KD 1-8); "seed eis tax relief" 1,300 KD 1; "eis tax relief calculator" 50 KD 0; "how much is eis tax relief" 20 KD 0 | SEIS 50%/£200k; EIS 30%/£1m (£2m KIC); CGT reinvestment/deferral; loss relief net-cost maths | investment £, scheme, tax band → income tax relief, CGT exemption, worst-case net loss after loss relief. NOTE: heavy investor-DIY demand — the calculator captures it and converts the company-side founder ("raising under SEIS? get advance assurance") |
| 3 | **EMI vs unapproved options comparison** | "emi share options tax calculator" 50 KD 0 CPC £7.74; "emi share options calculator" 10 KD 9; "emi share options" 390 KD 7 | EMI: no tax at grant/exercise (at AMV), CGT+BADR 2-yr at sale; unapproved: income tax+NIC at exercise; s.431 elections | option value, exercise price, exit value, salary band → total tax take EMI vs unapproved vs growth shares; per-employee and company NIC cost |
| 4 | **Founder dividend vs salary 2026/27** | estate-proven pattern (Property/generalist precedent); dividend queries dominate generalist GSC | CT 19/25% + marginal relief interaction, dividend 10.75/35.75/39.35% + £500 allowance, employer NIC 15%/£5k, EA solo-director exclusion, NIC record via ≥LEL salary | target extraction £, company profit → optimal salary/dividend split, total tax both routes |

## Queue tier

| # | Calculator | Demand evidence | Notes |
|---|---|---|---|
| 5 | **Runway / burn-rate with tax timeline** | no measured search volume (0 hits in 446-row pull) — build as a linkable founder tool, not an SEO page | monthly burn, cash, hires → runway; overlays UK-specific cash events: VAT quarters, PAYE monthly, CT 9 months+1 day, R&D credit receipt lag. Differentiator: no UK rival tool found in verification set |
| 6 | **VAT registration threshold timing tool** | threshold queries live mostly on generalist site; SaaS angle = place-of-supply (overseas B2B sales don't count) | rolling-12-month tracker + forward 30-day test + SaaS revenue-mix nuance; keep the generic "£90k VAT threshold" page on generalist, this tool is SaaS-scoped |
| 7 | **SEIS/EIS company eligibility checker** | "seis advance assurance" 480 KD 2 CPC £27.13 cluster | decision-tree (age, gross assets, employees, trade, prior funding) → SEIS/EIS/neither + advance-assurance CTA. Highest lead intent in the niche |
| 8 | **EMI qualifying-company checker** | "emi scheme" autocomplete family; EMI head 390/mo | decision-tree on £30m assets / 250 FTE / excluded activities / working time → qualify? else CSOP £60k fallback |
| 9 | **Share-dilution / option-pool modeller** | zero measured volume; VC-audience linkable asset | queue behind the flagship data asset; only if outreach play needs it |

## Rival precedent

Commodity players (Crunch-type) publish generic take-home calculators; R&D mills run "how much
could you claim" lead forms rather than transparent calculators. None of the verified specialist
tier (COMPETITORS.md) surfaces an interactive merged-scheme/ERIS estimator or an EMI-vs-unapproved
comparison — both are buildable differentiators with demand evidence above. The SEIS/EIS
calculator space is occupied by investor platforms (Vestd, SeedLegals content arms), not
accountants — an accountant-voiced version with loss-relief maths is the wedge.
