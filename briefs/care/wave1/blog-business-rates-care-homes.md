---
slug: blog-business-rates-care-homes
tier: blog
route: /blog/business-structure-and-acquisition/blog-business-rates-care-homes
category: Business Structure and Acquisition
intent: OPERATOR-PROBLEM + DIY-INFORMATIONAL. A care-home or domiciliary operator wants to understand their business-rates liability: how care settings are rated, whether Small Business Rate Relief helps, and how the England default differs from the devolved nations. Supports the buy/build cluster and the care-homes/domiciliary hubs.
---
# Business rates for care homes and care settings: what operators actually pay (BRAND_TBD)

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site" / "we" / "your service". CTA and brand copy flow from site config at write time. No em-dashes anywhere. BUSINESS/operator frame (owner / director / registered manager). Default jurisdiction England; devolved differences flagged explicitly, never silently mixed.

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK 2826, fetched 2026-07-11)

- No isolated measured volume on "business rates care home" in the pull; demand rests on the buy/build/finance cluster (TOPICS names business rates) and operator-cost intent. This is a supporting cost-base post under the care-homes hub and the buy-side money page.
- Long-tail to serve: "business rates care home", "do care homes pay business rates", "small business rate relief care home", "care home rateable value", "business rates domiciliary care office" (volume-check Stage 2).
- The topic is genuinely unowned by the dedicated tier (measurably thin Google visibility, TOPICS); brokers and CA houses do not cover it.

## Search-intent class + play

OPERATOR-PROBLEM authority piece on a recurring fixed cost operators routinely misjudge. The play: state clearly that care homes DO pay business rates and are usually above the SBRR threshold, that small domiciliary offices may qualify, and that the business-rates system is entirely separate from CQC registration fees. Then be the page that correctly flags the England-vs-devolved split (business rates are devolved; Scotland, Wales and NI run different relief schemes and multipliers). Own the operator-cost slice; do not drift into valuation appeals as legal advice.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **General dedicated tier (carehome-accountants.co.uk, healthcareaccountant.uk, heightenaccountants.co.uk)**: none owns a business-rates-for-care page in evidence; measurably thin Google visibility. Clear gap to own with a genuinely complete, correctly-jurisdictioned explainer.
- **Rating agents / surveyors** own rateable-value-appeal SERPs. Beat on the accountant's angle: business rates as a modelled fixed cost in the fee/margin picture, and how relief interacts with the operator's structure, not on running the appeal.
- **VOA/gov.uk** own the definitional queries. Beat by adding the care-specific consequences and worked figures the official pages lack.

## Required structure

Open with a BLUF answer box (40 to 60 words, citable): care homes pay business rates and most are assessed at rateable values well above £15,000, so Small Business Rate Relief usually does not apply; a small domiciliary agency office may sit below the threshold and qualify. Business rates are separate from CQC registration fees, and reliefs differ across the four UK nations (HP 20).

H2 skeleton (each money H2 opens with its own 40 to 60 word citable answer):
1. Do care settings pay business rates: yes; residential care homes are rated non-domestic property and most sit well above £15,000 rateable value, so they usually do not get SBRR (HP 20). Business rates are separate from CQC fees (HP 20).
2. How the bill is built: rateable value × the multiplier. DANGER ZONE: house_positions carries NO multiplier figure. Do NOT state a pence-in-the-pound multiplier; describe the mechanism qualitatively and flag the current England multiplier for Stage-2 sourcing from gov.uk/VOA.
3. Small Business Rate Relief, and why most homes miss it: 100% relief below £12,000 rateable value, tapering to zero at £15,000 (HP 20). A domiciliary agency with a small office may qualify; a residential home almost never will (HP 20).
4. Domiciliary and supported living: office-based vs property-based liability. A domiciliary agency is often just an office (possible SBRR); supported living raises property-use questions. FLAG any relief specific to supported-living tenancies not covered by an HP.
5. The devolved picture, flagged explicitly: England is the default (HP 20 SBRR figures are England). Scotland, Wales and Northern Ireland operate different non-domestic rates regimes, reliefs and multipliers. DANGER ZONE: house_positions has NO Scottish/Welsh/NI rates figures. State that they differ and direct readers to the relevant national scheme; never quote a devolved figure.
6. Where business rates sit in the cost base: a fixed overhead to model alongside wages, employer NIC (HP 11) and VAT-exempt input-VAT cost (HP 1). Cross-link the true-cost calculator (/calculators/true-cost-care-hour-calculator).
7. Worked example: a residential home with a rateable value comfortably above £15,000 (no SBRR) shown as an annual fixed cost line, next to a small domiciliary office below £12,000 getting 100% SBRR. Use the HP 20 relief thresholds; leave the multiplier as a labelled placeholder pending Stage-2 sourcing.
8. What we do / next step: route to /for/care-homes and /for/domiciliary-care.

Table opportunity: an SBRR eligibility strip (below £12,000 = 100% relief / £12,000 to £15,000 = taper / above £15,000 = none), England-only, each band citing HP 20; a second row noting "Scotland / Wales / NI: different schemes, see national guidance" with no figures.

FAQ candidates (questions only):
- Do care homes pay business rates?
- Can a care home claim Small Business Rate Relief?
- Does a domiciliary care office qualify for business rates relief?
- Are business rates the same as CQC registration fees?
- How are business rates different in Scotland, Wales and Northern Ireland?

## House positions touched

- HP 20: care homes pay business rates; SBRR 100% below £12,000 rateable value, taper to zero at £15,000; most homes above £15,000; domiciliary offices may be below; business rates separate from CQC fees; England default. https://www.gov.uk/apply-for-business-rate-relief/small-business-rate-relief
- HP 11: employer NIC 15% above £5,000 (cost-base context). https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026
- HP 1: VAT-exempt status makes input VAT a permanent cost (cost-base context). https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012

## Hallucination danger zones

- Do NOT state any business-rates multiplier (pence in the pound); no HP covers it. Describe the mechanism and flag the multiplier for Stage-2 gov.uk sourcing.
- Do NOT quote any Scottish, Welsh or NI non-domestic rates figure, relief threshold or multiplier; house_positions has none. State only that the devolved regimes differ and point to national guidance.
- SBRR thresholds are England-only and fixed to HP 20 (£12,000 / £15,000); do not apply them to the other nations.
- No CQC registration fee figure (separate system, and no HP).
- Medical-adjacency wall: this is a property-cost question, not a clinical one.

## Stage-2 TODO

- Source the current England business-rates multiplier(s) from gov.uk/VOA before publishing the worked example figure.
- Confirm devolved-nation links (Scottish Assessors/Scottish Government, Welsh Government, NI LPS) for the flagged section.
- Confirm /for/care-homes and /for/domiciliary-care routes and the true-cost calculator slug.
- Check whether any care-specific rates exemption/relief (e.g. property-use edge cases for supported living) needs its own HP before assertion.
