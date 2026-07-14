---
slug: vat-for-saas-place-of-supply
tier: guide
route: /blog/saas-and-tech-finance/vat-for-saas-place-of-supply
category: SaaS and Tech Finance
intent: LEARN → HIRE. Scaling SaaS founders and finance leads whose revenue is crossing (or looks like it is crossing) the VAT threshold but who sell to overseas customers, and need to know what actually counts toward the £90k threshold; advisory-lead intent because getting place-of-supply wrong means registering too early or too late.
---
# Blog: VAT for SaaS, the £90k threshold and place-of-supply (BRAND_TBD)

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site" / "we" / "your company" / "founders". CTA and brand copy flow from site config at write time. Body is authored downstream as RAW HTML (`<p>`, `<h2>`, `<table>`), NOT markdown syntax. No em-dashes anywhere (use commas, parentheses, full stops, middle dot ·).

## Target queries (evidence: TOPICS.md / LAUNCH_CORE.md, DataForSEO UK, fetched 2026-07-11)

- Primary: "vat for saas" / "saas vat uk" / "vat on software as a service"
- Secondary: "place of supply digital services" / "vat on digital services b2b" / "reverse charge saas"
- Secondary: "does overseas revenue count towards vat threshold" (the wedge query; per-term volume-check at Stage 2)
- Secondary: "when does a saas company register for vat"

## Search-intent class + play

Founder-DIY → advisory conversion (LEARN → HIRE). A scaling SaaS company sees ARR approaching £90k but most customers are overseas, and the founder needs to know what counts toward the threshold and how to treat B2B vs B2C digital sales. Play: own the SaaS place-of-supply wedge, not the generic £90k page. WEDGE (DEDUP_AUDIT #29, DIFFERENTIATE): generalist (Holloway Davies) holds the generic VAT-threshold and when-to-register pages (`vat-threshold-2025-26`, `when-to-register-for-vat-uk`, `/glossary/vat-threshold`) and the `vat-scheme-comparator` calculator. The generic £90k threshold explainer STAYS on generalist. Our distinct-intent scope is SaaS place-of-supply: what B2B reverse charge and place-of-supply rules do to the threshold and to invoicing for overseas digital-service revenue. Frame implicitly by audience, never name the sibling site.

## Competitors to beat (LAUNCH_CORE rival architecture; live-URL check is Stage 2)

- **saasaccountants.co.uk** (thin brochure holding the SaaS head): beat with genuine place-of-supply depth.
- **generalist generic VAT pages**: beat by NOT re-explaining the generic threshold; the wedge is the SaaS overseas-revenue treatment they do not scope.
- **HMRC Notice 741A / register-for-VAT pages**: authoritative but dense. Beat by turning place-of-supply into a founder-usable SaaS decision.

## Required structure / H2 skeleton

Each money/guide H2 opens with a citable 40-60 word BLUF answer.

1. BLUF: what counts toward the SaaS VAT threshold. State in 40-60 words that UK VAT registration is mandatory once rolling 12-month UK taxable turnover reaches £90,000 (or a 30-day forward expectation crosses it), but for SaaS the place-of-supply and B2B reverse-charge rules mean some overseas revenue may not count toward that threshold, so a SaaS company's registration point is not simply total sales (HP26).
2. The £90k threshold, stated once: mandatory registration at £90,000 rolling 12-month UK taxable turnover, or a 30-day forward expectation (HP26). Keep this brief and link the generic when-to-register content out; this page is the SaaS wedge, not the generic explainer.
3. Place-of-supply for digital services: the principle that VAT follows where the customer belongs for electronically supplied services, so where the supply is treated as made determines whether UK VAT applies and whether it counts toward the UK threshold. Keep specifics qualitative and instruct verification against Notice 741A at build (HP26).
4. B2B vs B2C digital sales: the reverse charge on B2B supplies to overseas business customers (the customer accounts for VAT), versus B2C digital-service rules; explain qualitatively how each affects the threshold and the invoice. Verify specific mechanics against Notice 741A at build.
5. What this means for a scaling SaaS company: a company with mostly overseas B2B revenue may reach a high ARR before its UK taxable turnover hits £90k; conversely UK and B2C sales bring the threshold closer. Frame the timing decision.
6. Getting the invoicing right: evidence of customer location and status, and why the classification drives both the threshold count and the invoice treatment (qualitative; verify at build).
7. What to do next: route the ARR-approaching-threshold SaaS company to the core-compliance / SaaS service and note that specific supplies must be checked against Notice 741A.

Table required:
- A qualitative SaaS supply table: supply type (UK B2B · UK B2C · overseas B2B · overseas B2C digital) · who accounts for VAT / how it is treated (qualitative) · does it count toward the £90k UK threshold (qualitative, "verify vs Notice 741A") · the relevant HP. The ONLY hard figure is £90,000 (HP26); every treatment cell is qualitative and flagged for Notice-741A verification.

## FAQ candidates (questions only)

- When does a SaaS company have to register for VAT in the UK?
- Does overseas revenue count toward the £90,000 VAT threshold?
- What is place of supply for SaaS and digital services?
- Do I charge VAT to overseas business customers for software?
- What is the reverse charge for B2B digital services?
- Does selling to consumers abroad change my VAT position?

## House positions touched

- HP 26: VAT registration mandatory at £90,000 rolling 12-month UK taxable turnover (or 30-day forward expectation); for SaaS the B2B reverse charge and place-of-supply rules mean overseas revenue may not count toward the threshold; verify specific supplies against Notice 741A at build. https://www.gov.uk/register-for-vat

## Internal links (slug map)

- Service: `/services/core-compliance` (primary CTA target)
- Hub: `/for/saas-companies` (primary), `/for/funded-startups`
- Calculator: `/calculators/founder-dividend-vs-salary-calculator` (only if contextually relevant; otherwise omit) · note there is no SaaS VAT calculator in the launch core, do not invent one
- Sibling guide: none in this category yet at launch; plain anchors only where a sibling is not built

## Hallucination danger zones

- The ONLY HP-backed figure is £90,000 (HP26). Do NOT state any other VAT rate, threshold, distance-selling figure or MOSS/OSS registration number as fact. Every place-of-supply and reverse-charge mechanic is qualitative and must be verified against VAT Notice 741A at build; write "verify vs Notice 741A at build" wherever a specific treatment is asserted.
- Do NOT re-explain the generic £90k threshold in depth; that content stays on generalist (DEDUP_AUDIT #29). State the threshold once and pivot to the SaaS place-of-supply wedge.
- Do NOT assert post-Brexit EU VAT registration obligations (OSS/IOSS or member-state rules) as fact; if mentioned, keep qualitative and flag for build verification. This page's scope is UK-side place-of-supply and the UK threshold.
- Do NOT invent a SaaS VAT calculator link; none exists in the launch core.
- No pricing, no named experts, no fabricated client examples or revenue figures. Any ARR figures labelled illustrative.
- IR35/off-payroll: not in scope (HP27); do not introduce it.

## Stage 2 TODO

- Verify all place-of-supply, reverse-charge and B2B/B2C digital-service mechanics against HMRC VAT Notice 741A at build (HP26 explicitly requires this). Primary open flag.
- Confirm the current £90,000 threshold figure is unchanged at build (HP26).
- Confirm the wedge holds vs the generalist generic VAT pages; if a generalist page already ranks for the SaaS place-of-supply long-tail, apply the data-gated-consolidation watch.
- Volume-check the place-of-supply and overseas-revenue long-tail terms and confirm KD.
