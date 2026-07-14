---
slug: growth-shares-explained
tier: guide
route: /blog/share-schemes-and-emi/growth-shares-explained
category: Share Schemes and EMI
intent: LEARN → HIRE. Founders and finance leads who cannot use EMI (company too large, excluded activity, or awards to non-employees / advisers) and are choosing between growth shares and unapproved options; advisory-lead intent because the structure and valuation need setting up correctly.
---
# Blog: growth shares and unapproved options explained (BRAND_TBD)

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site" / "we" / "your company" / "founders". CTA and brand copy flow from site config at write time. Body is authored downstream as RAW HTML (`<p>`, `<h2>`, `<table>`), NOT markdown syntax. No em-dashes anywhere (use commas, parentheses, full stops, middle dot ·).

## Target queries (evidence: TOPICS.md / LAUNCH_CORE.md, DataForSEO UK, fetched 2026-07-11)

- Primary: "growth shares" / "growth shares explained" (share-scheme cluster; head "emi share scheme" 1,900 KD 0, growth-shares is the buildable KD-low slice)
- Secondary: "growth shares vs emi" / "hurdle shares" / "growth shares tax"
- Secondary: "unapproved share options uk" / "unapproved options tax" (per-term volume-check at Stage 2)
- Secondary: "how do growth shares work" (founder_diy bucket)

## Search-intent class + play

Founder-DIY → advisory conversion (LEARN → HIRE). The founder wants to reward people who fall outside EMI (the company is too large or in an excluded activity, or the award is to a non-employee such as an adviser or NED) and is weighing growth shares against unapproved options. Play: an honest structural guide anchored on general ERS rules (HP17), the hurdle mechanic, and the s.431 election (HP16) that stops the shares being taxed later as employment income, then the CGT-on-disposal outcome (HP19) and BADR interaction (HP18). Route to the share-schemes service. UNIQUE to the estate (DEDUP_AUDIT #25).

## Competitors to beat (LAUNCH_CORE rival architecture; live-URL check is Stage 2)

- **Vestd / SeedLegals platform pages**: hold the growth-shares head with product-led content; light on the tax mechanics. Beat by: the hurdle-plus-s.431-plus-CGT chain explained end to end.
- **finerva.com**: ranks on share-scheme company-side terms; the architecture to beat. Beat on the worked hurdle example they gloss.
- **HMRC ERSM manual**: authoritative but unstructured. Beat by turning ERSM references into one founder-usable structure guide.

## Required structure / H2 skeleton

Each money/guide H2 opens with a citable 40-60 word BLUF answer.

1. BLUF: what growth shares are. State in 40-60 words that growth shares are a separate class of shares that only deliver value above a set hurdle (the current value of the company at grant), so employees or advisers share future growth rather than existing value, and that they fall under general employment-related-securities rules for tax (HP17).
2. The hurdle mechanic: how a hurdle (or growth) value is set at the current company value so the shares are worth little at grant and only pay out on growth above it. Keep the valuation principle qualitative; do not assert a formula.
3. How growth shares are taxed: general ERS rules, income tax (and NIC where relevant) on any value acquired above the amount paid at acquisition (HP17)
4. The s.431 election: why growth-share and unapproved-award recipients make a section 431 joint election within 14 days of acquisition, to be taxed on unrestricted market value up front and take the future gain as CGT rather than income (HP16; link the s.431 guide for the worked mechanics)
5. Unapproved options as the alternative: unapproved options also fall under general ERS rules (HP17); a one-section contrast (option to acquire later vs shares acquired now)
6. When growth shares are used instead of EMI: company outside EMI limits or tests (gross assets over £30m, 250 or more FTE, excluded activity), or awards to people who cannot hold EMI such as non-employees; pointer to EMI qualifying-company and EMI-vs-CSOP guides (HP12 context only, no re-explain)
7. The exit: CGT on eventual disposal of the shares at 18% within the basic-rate band / 24% above (HP19), and the BADR interaction (18% from 6 April 2026 on the £1m lifetime limit, HP18); note the 5% personal-company and 2-year tests apply to ordinary growth shares (unlike EMI shares), keep this qualitative and FLAG if tempted to assert the precise BADR conditions for growth shares
8. What to do next: valuation and documentation, ERS reporting by 6 July (HP13), route to the share-schemes service

Worked examples / tables required:
- A worked hurdle example: company valued at an illustrative figure at grant, growth shares carry a hurdle at that value, on a later exit at a higher illustrative figure the growth shares share only the uplift above the hurdle. Label all figures illustrative; show the arithmetic of the uplift split.
- A small comparison strip: growth shares vs unapproved options vs EMI (who can hold, what is taxed and when, tax-advantaged or not) · EMI column cites HP12 · growth/unapproved cite HP17 · do not add EMI-vs-growth figures an HP does not give.

## FAQ candidates (questions only)

- What are growth shares?
- How is the hurdle on growth shares set?
- Are growth shares tax-advantaged like EMI?
- Do I need a section 431 election for growth shares?
- When would a company use growth shares instead of EMI?
- How are growth shares taxed on sale?
- Can growth shares be given to non-employees or advisers?

## House positions touched

- HP 17: growth shares and unapproved options taxed under general ERS rules (income tax, NIC where relevant, on value acquired above amount paid). https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450
- HP 16: section 431 election, 14-day joint election on restricted securities, taxed on unrestricted market value up front. https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450
- HP 19: CGT on shares 18% basic band / 24% above (the exit outcome). https://www.gov.uk/capital-gains-tax/rates
- HP 18: BADR 18% from 6 Apr 2026, £1m lifetime limit (the exit interaction; EMI-specific concession does NOT extend to ordinary growth shares). https://www.gov.uk/business-asset-disposal-relief
- HP 12: EMI limits/tests, pointer only, for the "when instead of EMI" section. https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis
- HP 13: ERS reporting 6 July, nil returns included. https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return

## Internal links (slug map)

- Service: `/services/share-schemes` (primary CTA target)
- Sibling guide (same category): `/blog/share-schemes-and-emi/section-431-elections`, `/blog/share-schemes-and-emi/emi-qualifying-company-rules`, `/blog/share-schemes-and-emi/emi-vs-csop`, `/blog/share-schemes-and-emi/option-pool-basics-uk-founders`
- Calculator: `/calculators/emi-vs-unapproved-calculator`
- Hub: `/for/funded-startups`, `/for/pre-seed-founders`

## Hallucination danger zones

- Do NOT present growth shares as tax-advantaged in the EMI/CSOP sense. They fall under general ERS rules (HP17); the advantage is the low value at grant plus the s.431 election, not a statutory tax-advantaged scheme.
- The EMI-specific BADR concession (2-year rule without the 5% personal-company test, HP18) does NOT apply to ordinary growth shares. State the growth-share BADR position qualitatively (the standard BADR conditions apply) and FLAG rather than assert precise growth-share qualifying rules.
- Do NOT assert a growth-share valuation formula or hurdle-setting mechanic as a rule; keep valuation qualitative and route to advice / SAV.
- s.431 is a 14-day election (HP16); do not state a different deadline. Depth belongs in the s.431 guide, keep it pointer-level here.
- No pricing, no named experts, no fabricated client examples or claim counts. All worked figures labelled illustrative.
- IR35/off-payroll: not in scope (HP27); do not introduce it.

## Stage 2 TODO

- Confirm the precise BADR qualifying conditions for ordinary (non-EMI) growth shares at build; keep qualitative if unverified.
- Re-verify HP16/HP17 ERSM source phrasing and the s.431 14-day window.
- Volume-check "growth shares" and "unapproved options" long-tail terms and confirm KD.
- Live-URL verify Vestd / SeedLegals / finerva competitor pages.
