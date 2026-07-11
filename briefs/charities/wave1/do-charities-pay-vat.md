---
slug: do-charities-pay-vat
tier: blog
route: /blog/do-charities-pay-vat
intent: DIY. Definitional trustee question per the LAUNCH_CORE intent lens; BLUF answer-box play that builds authority, with capture on the VAT-advice service edge.
---
# Do Charities Pay VAT? The Real Rules, Reliefs and Traps

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK 2826, fetched 2026-07-11)

- **Primary:** "do charity pay vat" 1,000/0 (dossier term; page targets the natural phrasing "do charities pay vat")
- Secondary: "charity vat" 480/2 (pillar/money-page head; reference only)
- Secondary: "can charity claim back vat" 480/0 (owned by the sibling blog can-charities-claim-back-vat; mention and link, do not target)

## Search-intent class + play

DIY, definitional. The searcher wants a yes/no; the correct answer is "yes, mostly, with specific reliefs". Play: cited 40-60 word BLUF answer box that wins the featured snippet, then the relief-by-relief breakdown that no rival states cleanly, then capture: business/non-business apportionment and partial exemption are the recurring pain points where trustees give up and call an accountant (per HP 20), so the CTA sits after the apportionment section pointing at services-charity-vat.

**Cannibalisation split:** this blog answers the output-side question (does a charity charge/pay VAT). The sibling can-charities-claim-back-vat owns the input-side (recovery). The pillar pillar-charity-vat-guide owns the comprehensive treatment. Keep each section here short and link out.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **gov.uk** (VAT for charities pages): owns the SERP; terse and fragmentary. Beat on a single-page consolidated answer with worked examples.
- **Charity Tax Group** (excluded info platform, ranks heavily): deep but written for tax specialists. Beat on trustee-readable plain English.
- **vatadvice.org / constablevat.com** (excluded adjacent VAT consultancies): set the technical depth bar; not accountancy rivals but SERP occupants.

## Required structure

H2 skeleton:
1. Do charities pay VAT? The short answer (BLUF answer box, cited)
2. When a charity must register for VAT (£90,000 threshold)
3. VAT reliefs charities actually get (zero-rated advertising, 5% fuel and power, eligibility declarations)
4. Fundraising events: the exemption and the 15-event limit
5. Business vs non-business activities: why this split decides everything
6. Partial exemption in plain English (and why it hurts)
7. What charities get wrong about VAT (myth-busting: "charities don't pay VAT")
8. When to get help (capture)

FAQ candidates:
- Do charities pay VAT on purchases?
- Do charities charge VAT on what they sell?
- Do charities have to register for VAT?
- What is the VAT registration threshold for charities?
- Do charities pay VAT on advertising?
- Do charities pay VAT on gas and electricity?
- Are charity fundraising events VAT exempt?
- Do charities pay VAT on rent?
- Is a charity's grant income subject to VAT?
- Do CICs get charity VAT reliefs?

Table/chart opportunities:
- Relief quick-reference table (purchase type, VAT treatment, condition, source)
- Business vs non-business examples table

Calculator embed: none in the launch fleet (no VAT calculator).

Internal links (launch core): pillar-charity-vat-guide (comprehensive treatment), services-charity-vat (VAT advice service, capture), can-charities-claim-back-vat (input-side sibling), for-cics (CICs get no charity VAT position, via HP 22 boundary).

## House positions touched

- **HP 20:** "Charities follow normal VAT registration rules (registration compulsory above the £90,000 taxable turnover threshold). Reliefs exist on specific purchases: zero-rated advertising supplied to a charity, 5% reduced rate on fuel and power for non-business/residential use, and others on eligibility declaration. One-off qualifying fundraising events are exempt, limited to 15 events of the same kind per financial year (Notice 701/1). Business/non-business apportionment and partial exemption are the recurring pain points; never imply a charity 'doesn't pay VAT'." Citations: https://www.gov.uk/vat-charities and https://www.gov.uk/guidance/how-vat-affects-charities-notice-7011 (both verified 2026-07-11 incl. the 15-event limit and £90,000 threshold).
- **HP 11** (context, income-tax side disambiguation): "Charities do not pay tax on most types of income as long as the money is used for charitable purposes." Citation: https://www.gov.uk/charities-and-tax (verified 2026-07-11). Use only to distinguish income-tax relief from VAT; do not blur the two.

## Hallucination danger zones

- Never imply a charity "doesn't pay VAT" (explicit HP 20 consistency rule); the whole page exists to correct that myth.
- The £90,000 threshold, 5% rate, zero-rating scope and 15-event limit are locked in HP 20; do not extend to reliefs the HP doc does not list (e.g. building work, disability aids) without a Stage 2 verified source, and even then flag for HP extension rather than asserting freely.
- Do not compute partial-exemption examples with invented de minimis figures; describe the mechanism and link to Notice 701/1.
- E&W/Scotland: VAT is UK-wide, but do not mix in charity-regulation thresholds (those are jurisdiction-specific, HP 26).

## Stage 2 TODO

- WebFetch gov.uk/vat-charities + Notice 701/1; confirm live and current figures unchanged.
- Fetch Charity Tax Group and one VAT-consultancy page to set the depth bar; extract their H2 sets.
- Decide with the conductor whether additional reliefs (construction, medical equipment) get an HP extension or stay out of scope for launch.
