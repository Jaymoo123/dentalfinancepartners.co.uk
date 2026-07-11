---
slug: gift-aid-calculator
tier: calculator
route: /calculators/gift-aid-calculator
intent: DIY. Treasurers and donors wanting the claim/relief number now; a KD-free win (720/0) that builds the trust the whole Gift Aid cluster converts on.
---
# Gift Aid calculator: landing copy brief

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK 2826, fetched 2026-07-11)

- Primary: "gift aid calculator" 720/0 (LAUNCH_CORE: KD-free win)
- Secondary: no other measured-volume terms assigned; long-tail variants ("gift aid calculator uk", donor-relief phrasings) are autocomplete-derived with no measured volume.

## Search-intent class + play

DIY tool intent. Searcher wants a number, not a guide. Play: tool first (above the fold), then landing copy that explains the maths, cites gov.uk, and captures the "Gift Aid gone wrong" compliance edge into services-gift-aid.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- Platform calculators in the CAF/stewardship lane (excluded domains, but they occupy the tool SERP today). Beat with a two-sided calculator (charity claim AND donor relief), visible methodology, and gov.uk citations the platform widgets lack.

## Required structure (landing copy AROUND the existing tool)

H2 skeleton:
1. Calculator embed block (tool leads the page): /embed/gift-aid-calculator
2. What this calculator works out (charity claim + donor-side relief, BLUF)
3. The inputs explained (donation amount; donor tax rate; Scottish-taxpayer toggle for donor side)
4. Worked example (placeholder: £100 gift → £125 gross → £25 claim; 40% donor recovers £25, 45% donor recovers £31.25)
5. How the maths works (methodology + gov.uk citations)
6. What the calculator does not cover (declarations validity, benefit limits, GASDS: link out)
7. When to get help (capture edge: claims gone wrong, HMRC repayment demands → services-gift-aid)
8. FAQ

- FAQ candidates: How much Gift Aid does a charity get on £100? How is the Gift Aid gross calculated? Do higher-rate taxpayers get money back? Does the calculator work for Scottish taxpayers? Does the donation need a declaration? What if the donor has not paid enough tax? Can companies use Gift Aid on donations? Does this cover small cash donations (GASDS)?
- Table/chart opportunities: donation → gross → claim → donor-relief table at three example amounts.
- Calculator embed: /embed/gift-aid-calculator
- Internal links (wave1): pillar-gift-aid-complete-guide, services-gift-aid, calc-gasds-calculator

## House positions touched

- HP 14: "A charity or CASC claims 25p for every £1 donated. Mechanically: the gross donation is the gift divided by (1 − 20% basic rate), and the claim is basic-rate tax on that gross (£100 gift → £125 gross → £25 claim). Requires a valid declaration, and the donor must have paid at least as much UK income tax or capital gains tax that year as all charities will reclaim on their donations." — https://www.gov.uk/claim-gift-aid
- HP 19: "Donors paying above basic rate reclaim the difference between their rate and basic rate on the gross donation, via Self Assessment or a tax-code adjustment. Worked example: £100 gift → charity claims to £125; a 40% taxpayer personally recovers £25 (net cost £75); a 45% taxpayer recovers £31.25 (net cost £68.75). Scottish income tax rates differ for the donor-side calculation only; the charity's 25p per £1 claim is UK-wide." — https://www.gov.uk/donating-to-charity/gift-aid
- HP 15 (context, section 6): declaration required content + 6-year retention; claiming without a declaration means repaying the tax. — https://www.gov.uk/guidance/gift-aid-declarations-claiming-tax-back-on-donations
- Note: HP 14 is hard-coded in charities/web/src/lib/calculators/charity-rules.ts; landing copy figures must never diverge from the engine.

## Hallucination danger zones

- Scottish rates apply donor-side ONLY; the 25p per £1 charity claim is UK-wide. Do not build a Scottish charity-claim variant.
- Do not state Scottish rate band percentages; not locked in the HP doc.
- No CIC framing: a CIC cannot claim Gift Aid (HP 22).
- Copy must not promise the tool validates declarations or benefit limits.

## Stage 2 TODO

- Identify the actual SERP occupants for "gift aid calculator" (live check) and their tool features.
- Confirm engine input set matches the inputs-explained section.
- Confirm answer-box copy blocks are 40-60 words.
