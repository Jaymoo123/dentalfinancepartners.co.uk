---
slug: care-home-vat-exemption-edge-cases
tier: blog
category: VAT and Welfare Exemption
route: /blog/vat-and-welfare-exemption/care-home-vat-exemption-edge-cases
intent: OPERATOR-PROBLEM + DIY-INFORMATIONAL. Care owners/finance directors asking whether care fees are VAT exempt, whether they can recover VAT, and whether a VAT-grouping "reclaim" scheme is safe post-RCB 2/2025. Assist-and-capture, feeds the /services/care-vat-review money page.
---
# Blog: care home VAT exemption edge cases (welfare exemption + RCB 2/2025 explainer)

> Seed brief (Stage 1). Brand is the working brand; all copy references "the site" / "we" / "your service". CTA and brand copy flow from site config at write time. No em-dashes anywhere. Body ships as raw HTML downstream (`<p>`, `<h2>`, `<table>`), never markdown syntax. Default jurisdiction: England.

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK 2826, fetched 2026-07-11)

- Primary: "care home vat exemption" 20/mo (VAT welfare family head, low volume high stakes)
- Secondary: "do you pay vat on care home fees" 30/mo KD 43
- Secondary: "care home vat" 30/mo KD 0
- Long tail (null volume, real intent): "are care home fees vat exempt", "can care homes claim vat back", "vat on care home construction", "care home vat registration", "vat grouping care home"
- The wedge is advisory-value-led (RCB 2/2025), not volume-led; this post exists to own the AI-answer / GEO surface and to funnel the highest-stakes advisory leads.

## Search-intent class + play

OPERATOR-PROBLEM assist page with a DIY-informational front door. The visitor believes VAT exemption is a perk and is often shopping a pre-2025 "VAT recovery" scheme. The post must (1) correct the perk misconception fast (exemption is a permanent input-VAT cost), (2) explain RCB 2/2025 so the reader understands why the old grouping schemes are now dangerous, (3) walk the genuine edge cases where VAT status is not obvious, then (4) route the reader to `/services/care-vat-review` for a health-check. Capture edge: any provider currently inside, or being pitched, a VAT-grouping structure.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **costcare.co.uk** ("Cost Care Tax", since 1995, "Over £900m in successful claims", Kingscrest-style historic-VAT reclaim offer). This is the reclaim-marketing incumbent. Beat by: being the honest post-RCB-2/2025 counterweight. We do not sell a scheme; we explain why HMRC is now removing parties from these groups. Authority through accuracy, not a reclaim promise.
- **healthcareaccountant.uk / careaxisaccountancy.co.uk** (dedicated, thin VAT content). Beat on depth: worked partial-exemption example, de minimis maths, RCB 2/2025 timeline.
- **CQC consultants + capital-allowances houses** own adjacent SERPs but have no credible VAT-exemption explainer. Own the finance-accuracy slice they cannot write.

## Required structure

BLUF rule: every money/guide H2 opens with a citable 40-60 word answer before any elaboration.

H2 skeleton:
1. Are care home fees VAT exempt? (BLUF answer: CQC-registered welfare supplies are exempt under Group 7 Sch 9 VATA 1994; exemption starts at registration approval, and it is a cost not a perk because input VAT becomes unrecoverable) [HP1]
2. Why "exempt" costs you money: the input-VAT trap (worked figure on consumables, equipment, fit-out, professional fees becoming permanent overhead) [HP1]
3. Do you have to register for VAT? Only taxable turnover counts (BLUF: the £90,000 threshold tests taxable turnover only; a purely exempt provider with millions in fee income has zero taxable turnover and no registration duty) [HP3]
4. The mixed-provider trap: when part of your income IS taxable (day-centre sales, non-exempt courses, non-CQC services) and you fall into partial exemption [HP3, HP4]
5. Partial exemption and the de minimis test, worked (BLUF + worked example: full recovery only if exempt input tax averages no more than £625/month AND is less than half of total input tax) [HP4]
6. RCB 2/2025: why the old VAT-grouping "recovery" schemes are now a live HMRC risk (BLUF: HMRC's Revenue and Customs Brief 2/2025 treats VAT-group structures that insert unregulated entities to unlock input-VAT recovery as avoidance; it refuses new registrations and removes parties from existing groups) [HP2]
7. Edge cases where the VAT position is genuinely not obvious (construction of a new home / zero-rating vs standard-rating; supported-living rent-plus-care split; CHC-funded placements where the supply is to the NHS not the resident) [HP1, HP25; flag construction zero-rating as danger zone]
8. What a care VAT review actually checks (route to /services/care-vat-review) and next-step CTA

Table opportunities:
- Exempt vs taxable income lines for a mixed care provider (which count toward the £90k threshold).
- De minimis worked example table (exempt input tax, total input tax, monthly average, pass/fail).
- RCB 2/2025 timeline strip: pre-2025 scheme marketing → RCB 2/2025 position → what HMRC now does (refuse new groups, remove parties).

FAQ candidates (questions only):
- Are care home fees VAT exempt?
- Can a care home reclaim VAT on building or refurbishment?
- Does a care home need to register for VAT?
- What is the VAT registration threshold for care providers?
- Is VAT exemption a good thing for a care business?
- What is Revenue and Customs Brief 2/2025?
- Is a care VAT-grouping scheme still legal?
- How does partial exemption work for a mixed care provider?
- Does NHS continuing healthcare change the VAT position?

Internal links (launch core): `/services/care-vat-review` (primary), `/for/care-homes`, `/for/supported-living` (rent/care split), `/for/care-startups` (construction/fit-out timing). Cross-link the companion blog `/blog/business-structure-and-acquisition/...` capital-allowances-on-fit-out post if present at write time; derive its category slug by lowercasing/hyphenating the full category name.

## House positions touched

- HP1 (welfare exemption = cost not perk; Group 7 Sch 9 VATA 1994; Notice 701/2; exemption from CQC registration approval date). https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012
- HP2 (RCB 2/2025 challenge to VAT-grouping structures; refuse new registrations, remove parties). https://www.gov.uk/government/publications/revenue-and-customs-brief-2-2025-the-use-of-vat-grouping-within-the-care-industry/use-of-vat-grouping-within-the-care-industry
- HP3 (£90,000 threshold on taxable turnover only; exempt fees excluded). https://www.gov.uk/vat-registration/when-to-register
- HP4 (partial exemption; de minimis £625/month average and less-than-half test). https://www.gov.uk/guidance/partial-exemption-vat-notice-706
- HP25 (CHC-funded placement: supply is to the NHS, alters the VAT analysis; do not conflate FNC with full CHC). https://www.gov.uk/government/publications/national-framework-for-nhs-continuing-healthcare-and-nhs-funded-nursing-care

Consistency rules: exemption is a cost, never a tax advantage (HP1). Pre-2025 grouping schemes are under active HMRC challenge, never "established planning" (HP2). Never conflate FNC (nursing top-up) with full CHC funding (HP25).

## Hallucination danger zones

- Do NOT state a zero-rating figure or precise rule for new-build care-home construction. HP1 covers exemption of welfare supplies only; construction VAT/DIY zero-rating is NOT in house_positions. Frame as "a genuinely fact-specific edge case, get it reviewed" and FLAG for a possible new HP at Stage 2, never invent a rate or condition.
- Do NOT quote a specific historic-reclaim figure (Kingscrest / £900m style). No fabricated recovery amounts.
- Do NOT present any VAT-grouping structure as a live recommended plan; RCB 2/2025 governs.
- No pricing for the VAT review service (config decides).
- No named experts, no ACA/ICAEW claims, no client names or counts.

## Stage 2 TODO

- Confirm whether a construction/zero-rating HP should be added before this post ships; if not, keep the edge case framed as "seek review" only.
- Live-URL verify costcare.co.uk reclaim messaging and healthcareaccountant.uk VAT depth.
- Re-verify RCB 2/2025 URL is live (HP open flags cleared 2026-07-12; recheck at write time).
