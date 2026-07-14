---
slug: option-pool-basics-uk-founders
tier: guide
route: /blog/share-schemes-and-emi/option-pool-basics-uk-founders
category: Share Schemes and EMI
intent: LEARN → HIRE. Founders setting up their first employee option pool (often at or before a seed round) who want the compliance and tax basics before they hire; advisory-lead intent that hooks straight into EMI scheme setup.
---
# Blog: option-pool basics for UK founders (BRAND_TBD)

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site" / "we" / "your company" / "founders". CTA and brand copy flow from site config at write time. Body is authored downstream as RAW HTML (`<p>`, `<h2>`, `<table>`), NOT markdown syntax. No em-dashes anywhere (use commas, parentheses, full stops, middle dot ·). SCOPE: tax and compliance only. This page gives NO investment advice, no view on how big a pool "should" be as an investment/dilution strategy, and no financial promotion.

## Target queries (evidence: TOPICS.md / LAUNCH_CORE.md, DataForSEO UK, fetched 2026-07-11)

- Primary: "option pool" / "employee option pool uk" (share-scheme cluster; feeds the EMI head "emi share scheme" 1,900 KD 0)
- Secondary: "option pool size startup" / "how big should an option pool be" / "esop uk"
- Secondary: "setting up an option pool uk" / "option pool dilution" (per-term volume-check at Stage 2)
- Secondary: "emi option pool" (the tax-anchored slice we own)

## Search-intent class + play

Founder-DIY → advisory conversion (LEARN → HIRE). The founder is setting up their first pool, usually around a seed round, and searches mix commodity investment/dilution content with genuine compliance questions. Play: own the tax-and-compliance slice (how the pool is granted as EMI options, the reporting, the valuation) that the VC/dilution blogs skip, keep strictly clear of investment/dilution advice, and hook the reader into EMI scheme setup. UNIQUE to the estate (DEDUP_AUDIT #27).

## Competitors to beat (LAUNCH_CORE rival architecture; live-URL check is Stage 2)

- **Vestd / SeedLegals / VC-blog dilution content**: own the "how big should the pool be" head with strategy content, light on the tax/compliance. Beat by: owning the compliance slice they skip (EMI mechanics, valuation, reporting) and staying explicitly in scope.
- **finerva.com**: ranks on share-scheme company-side terms; the architecture to beat. Beat on the EMI-pool-to-setup hook.
- **HMRC EMI guidance**: authoritative but not framed as "your first pool". Beat on the founder-onboarding framing.

## Required structure / H2 skeleton

Each money/guide H2 opens with a citable 40-60 word BLUF answer.

1. BLUF: what an option pool is, in compliance terms. State in 40-60 words that an option pool is a reserved block of shares set aside to grant as employee options (most tax-efficiently as EMI where the company qualifies), that EMI allows up to £250,000 of unexercised value per employee and £3m across the company, and that the pool must be reported to HMRC (HP12, HP13).
2. Sizing the pool: framing only, NOT investment advice. Describe how founders reserve a percentage of equity for the pool and note that the right size is a commercial and dilution decision to take with the company's investors and advisers, not a tax rule. State clearly that this page does not advise on pool size.
3. Granting from the pool as EMI options: the EMI route as the default tax-efficient way to grant, and the company/employee tests that must hold (gross assets ≤£30m, <250 FTE, £3m company limit, £250k per employee, working-time requirement, no excluded activities; HP12)
4. Dilution framing, compliance-only: explain qualitatively that granting options dilutes existing holders on exercise, and that this is a cap-table and investor matter · keep it descriptive, route the strategy to advisers, do not model dilution numbers as advice
5. Valuation and documentation: options should be valued in agreement with HMRC Shares and Assets Valuation before or at grant (HP14; do NOT publish a VAL231 link, re-verify at build); link the EMI valuation guide
6. Reporting the pool: register the scheme and file the annual ERS return (nil returns included) and grant notifications by 6 July after the tax-year end (HP13)
7. When EMI does not fit the pool: CSOP fallback (£60,000 per employee, HP15) or growth shares / unapproved options under general ERS rules (HP17); short pointers to those guides
8. What to do next: hook to EMI scheme setup service and the EMI qualifying-company guide

Worked example / table required:
- A simple compliance checklist table for setting up a pool: step (reserve pool · confirm EMI qualification · agree valuation with SAV · grant options · notify grants · file ERS return) · what it involves · the relevant HP · the deadline where one applies (grant notification and ERS return 6 July, HP13). Only cite HP-backed figures.
- Optional illustrative pool strip: a company reserves an illustrative percentage of equity as the pool, grants a portion as EMI options within the £250k-per-employee / £3m-company limits (HP12). Label the percentage illustrative; do NOT recommend a percentage.

## FAQ candidates (questions only)

- What is a startup option pool?
- How is an option pool granted tax-efficiently in the UK?
- Do option pool grants have to be reported to HMRC?
- How are EMI options in the pool valued?
- What is the EMI limit per employee for pool grants?
- What happens to the pool if the company outgrows EMI?
- Does granting options from the pool have tax consequences for the company?

## House positions touched

- HP 12: EMI limits and tests (£250k per employee, £3m per company, gross assets ≤£30m, <250 FTE, working-time, no excluded activities), the default tax-efficient way to grant from a pool. https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis · gross-assets test https://www.gov.uk/hmrc-internal-manuals/employee-tax-advantaged-share-scheme-user-manual/etassum52030
- HP 13: register the scheme, file the ERS return (nil returns included) and grant notifications by 6 July after tax-year end. https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return
- HP 14: EMI grants valued in agreement with HMRC SAV; do NOT publish a VAL231 link (re-verify at build). https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis
- HP 15: CSOP £60,000-per-employee fallback (pointer). https://www.gov.uk/tax-employee-share-schemes/company-share-option-plan
- HP 17: growth shares / unapproved options under general ERS rules (pointer). https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450

## Internal links (slug map)

- Service: `/services/emi-scheme-setup` (primary CTA target); secondary `/services/share-schemes`
- Sibling guide (same category): `/blog/share-schemes-and-emi/emi-qualifying-company-rules`, `/blog/share-schemes-and-emi/emi-option-valuation`, `/blog/share-schemes-and-emi/emi-vs-csop`, `/blog/share-schemes-and-emi/growth-shares-explained`, `/blog/share-schemes-and-emi/section-431-elections`
- Calculator: `/calculators/emi-vs-unapproved-calculator`
- Hub: `/for/pre-seed-founders`, `/for/funded-startups`

## Hallucination danger zones

- Do NOT recommend a pool size or a percentage of equity. That is an investment/dilution decision outside this site's scope; state so explicitly and route to advisers. Any percentage in the worked strip is labelled illustrative and non-advisory.
- Do NOT model dilution with numbers as if advising; keep dilution qualitative and descriptive.
- Do NOT publish a VAL231 link (HP14); cite the EMI and ERS manual pages and re-verify at build.
- Do NOT state EMI limits/tests other than HP12 (£250k, £3m, £30m, <250 FTE).
- No pricing, no named experts, no fabricated client examples or claim counts.
- IR35/off-payroll: not in scope (HP27); do not introduce it.

## Stage 2 TODO

- Confirm no VAL231 link is published and the EMI valuation source is live (HP14).
- Volume-check "option pool" and "esop uk" long-tail terms and confirm KD; confirm the compliance slice does not stray into the commodity dilution head.
- Live-URL verify Vestd / SeedLegals / finerva competitor pages.
