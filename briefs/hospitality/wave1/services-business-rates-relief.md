---
slug: services-business-rates-relief
tier: money
route: /services/business-rates-relief
intent: HIRE / operator-problem. Operators facing the April 2026 business-rates cliff want their rates bill reviewed and every relief claimed. High topicality wedge.
---
# Service page: business rates and RHL relief review

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site" / "the firm". CTA and brand copy flow from site config at write time. No em-dashes anywhere. Default jurisdiction England; Scotland and Wales flagged, never silently mixed.

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, Google Ads UK + Labs 2026-07-11)

- Primary: business rates relief / RHL relief review service intent (LAUNCH_CORE positions this on the 2026 rates-cliff topicality; red-team wedge)
- Secondary: retail hospitality and leisure relief, small business rate relief hospitality, business rates hospitality 2026 long-tail
- Angle driver (topicality, not volume): the RHL relief change from 1 April 2026 (new claims ended, revised multipliers apply)

## Search-intent class + play

HIRE / operator-problem lead page riding a live topicality wedge. From 1 April 2026 the Retail, Hospitality and Leisure relief position changed materially (new claims ended; RHL properties move to revised rate multipliers), so operators are actively worried about their 2026-27 bill. Capture edges: an operator wanting the new bill checked and modelled, a small cafe or takeaway that qualifies for Small Business Rate Relief and never claimed, an operator wanting a rateable-value or transitional review. The play is currency and accuracy: rivals will still be quoting last year's relief percentage, and getting the 2026 position right is itself the credibility signal. This is the red-team wedge from LAUNCH_CORE.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **roslyns.co.uk** (DEDICATED). "The leading provider of business services to the hospitality sector"; broad service brand. Beat by: a dedicated, current 2026 rates page with the relief-ended-multipliers-apply position stated correctly, not a stale relief percentage.
- **Bishop Fleming / Hawsons / Alexander & Co** (SECTION). Sector firms that touch business rates. Beat on the 2026-specific topicality and the SBRR-underclaimed angle for small operators.
- **General SEO-led firms** (SECTION). Likely to have generic "business rates relief" pages quoting outdated RHL percentages. Beat purely on being right about April 2026.

## Required structure

H2 skeleton:
1. Your 2026 business rates bill has changed (answer-first: RHL relief ended for new claims, multipliers now apply; then the service)
2. What changed from 1 April 2026 and what it means for your bill (revised multipliers; no relief percentage asserted, check the current-year position)
3. Small Business Rate Relief: the one many small operators miss (100% up to £12,000, taper to £15,000)
4. What the site's rates review covers (bill check, multiplier application, SBRR eligibility, rateable-value review, appeals signposting)
5. England, Scotland and Wales are different (flag; do not mix regimes)
6. Get your rates bill reviewed (CTA; rates checker tool is a queued fast-follow)
7. Next step CTA

FAQ candidates (questions only):
- Do I still get Retail, Hospitality and Leisure relief in 2026 to 2027?
- What replaced RHL relief from April 2026?
- What is Small Business Rate Relief and do I qualify?
- Does SBRR apply if I use more than one property?
- What rateable value gets 100% relief?
- Will my rates bill go up in 2026 to 2027?
- Are business rates different in Scotland and Wales?
- Can I appeal my rateable value?

Table/chart opportunities: SBRR taper box (100% at RV up to £12,000; example 50% at £13,500, 33% at £14,000; zero at £15,000) mapped to HP 20. A "what changed in 2026" box (RHL new claims ended; revised multipliers apply) mapped to HP 19, stated qualitatively on the relief percentage. If multiplier figures are used, use ONLY the HP 19 checker-verified England multipliers and label them England-only. No fee figures.

Calculator embed: none at launch (business rates checker is a queued fast-follow per CALCULATORS.md). Rely on the SBRR box and the review CTA.

Internal links (launch core): pillar/blog SBRR-for-cafes, services-hospitality-vat and services-hospitality-payroll (adjacent operator services), /for/cafes-and-coffee-shops and /for/takeaways (sub-trades most likely to miss SBRR), homepage.

## House positions touched (docs/hospitality/house_positions.md; every figure maps to a position + gov.uk URL)

- HP 19: Retail, Hospitality and Leisure relief has ended for new claims from 1 April 2026; from that date businesses use revised rate multipliers. GOV.UK: "You cannot make a new claim for retail, hospitality and leisure relief. From 1 April 2026, you will need to use rate multipliers to calculate your business rates bill." Do NOT assert a current RHL relief percentage. https://www.gov.uk/business-rates-relief/retail-discount . England 2026-27 multipliers (checker-verified, England-only): RHL properties 38.2p (RV below £51,000) or 43p (£51,000 to £499,999), set 5p below the national 43.2p and 48p; £500,000+ pay 50.8p. https://www.gov.uk/calculate-your-business-rates and https://www.gov.uk/guidance/business-rates-multipliers-qualifying-retail-hospitality-or-leisure . Transitional protection for existing relief was NOT separately confirmed; do not assert it.
- HP 20: Small Business Rate Relief: 100% at rateable value up to £12,000; tapers to zero at £15,000 (example 50% at £13,500, 33% at £14,000); only if it is the only property the business uses. Many takeaways and small cafes qualify and do not claim. https://www.gov.uk/apply-for-business-rate-relief/small-business-rate-relief

VERIFY-AT-WRITE flag requested in the task, resolved against house_positions.md: the current RHL relief percentage/cap is NOT a simple locked figure. The locked position (HP 19) is that RHL relief ENDED for new claims from 1 April 2026 and revised multipliers apply. Therefore describe the RHL position qualitatively (relief ended, multipliers now apply) and use ONLY the HP 19 checker-verified England multipliers if figures are needed. Do not assert a relief percentage or cash cap. This is a year-sensitive position; re-verify live at write time.

Consistency rules: RHL relief has ended for new claims from April 2026 (HP 19); do not assert a relief percentage without checking the current-year position. Default jurisdiction England; Scotland and Wales rates regimes are flagged, never mixed (house_positions default-jurisdiction rule).

## Hallucination danger zones

- Do NOT assert a current RHL relief percentage or cash cap (HP 19 consistency rule). The correct 2026-27 position is that new claims have ended and revised multipliers apply. This is the single biggest error risk on this page and rivals will get it wrong.
- Do not assert transitional protection for existing RHL relief (HP 19: not separately confirmed).
- Use only the HP 19 England multipliers, and label them England-only. Do not apply them to Scotland or Wales.
- Use only the HP 20 SBRR figures (£12,000 / £15,000 taper, the £13,500 and £14,000 examples). Do not invent intermediate percentages beyond the two example points.
- Do not silently mix England, Scotland and Wales rates regimes (house_positions default-jurisdiction rule); flag Scotland and Wales explicitly and do not state their figures (not locked positions).
- No fee or pricing figures anywhere.
- HP GAP: Scotland (non-domestic rates, Small Business Bonus Scheme) and Wales rates figures are NOT locked; describe qualitatively and point to the relevant devolved authority, do not assert figures.

## Stage 2 TODO

- Re-verify HP 19 (RHL/multipliers) and HP 20 (SBRR) live at write time; year-sensitive, and the 2026-27 rates position is the whole point of the page.
- Live-URL verify roslyns.co.uk rates page and one SECTION rival business-rates page; confirm whether they still quote a stale RHL percentage (competitive proof).
- HP GAP request: Scotland and Wales rates-relief figures if the page is to serve those nations; otherwise keep England default and flag.
- Confirm whether the business rates checker fast-follow can be referenced as "coming soon" per site convention.
