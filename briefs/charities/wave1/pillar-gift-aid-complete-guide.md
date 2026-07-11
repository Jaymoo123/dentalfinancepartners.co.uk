---
slug: gift-aid-complete-guide
tier: pillar
route: /guides/gift-aid-complete-guide
intent: DIY-heavy. Trustees and treasurers running Gift Aid themselves; the site wins by being the resource they trust, with capture on the compliance-pain edges (Gift Aid gone wrong).
---
# Gift Aid for charities: the complete operating guide

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK 2826, fetched 2026-07-11)

- Head term "gift aid" 8,100/30 is deliberately NOT chased (LAUNCH_CORE: DIY/definitional, answer-box play only). This pillar targets the operational layer beneath it.
- Primary: "claiming gift aid" 1,900/14
- Secondary: "gift aid rules" 1,600/26; "hmrc gift aid claims" 1,300/9; "gift aid declaration" 720/9 (declaration wording detail owned by blog-gift-aid-declaration-wording)

## Search-intent class + play

DIY, BLUF/answer-box play. Every section opens with a citable 40-60 word answer. Authority-building pillar for the whole Gift Aid family; lead capture at the compliance-pain edges (declarations gone wrong, benefit-limit breaches, HMRC repayment demands) routing to services-gift-aid.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **gov.uk** — owns the head informational SERP (info tier, not a rival firm). Beat on the applied operating layer: worked examples, tables, edge cases gov.uk states dryly.
- **charityaccountants.co.uk** — meta lists Gift Aid among services; thin blog. Beat on depth.
- **kgaccountantsblog.com** — the ranking-machine specialist blog; proves informational clusters are winnable. Beat on structure, currency and calculator integration.

## Required structure

H2 skeleton:
1. What Gift Aid is worth (BLUF: 25p per £1, worked example)
2. Who can claim and the HMRC recognition step
3. Valid declarations: what they must contain and how long to keep them
4. Making a claim to HMRC (process overview)
5. The donor tax-paid condition and what happens when it fails
6. Donor benefit limits (the value tests, with table)
7. Higher and additional rate donors: the other side of the claim
8. GASDS: small cash donations without declarations (overview, links out)
9. Retail Gift Aid for charity shops (overview)
10. When Gift Aid goes wrong (capture edge)
11. FAQ

- FAQ candidates: How much does a charity get from Gift Aid? Do we need a declaration for every donation? How long must declarations be kept? What if the donor has not paid enough tax? Can we claim on donations from a company? What are the donor benefit limits? Can a CIC claim Gift Aid? How far back can a charity claim Gift Aid? What is GASDS and do we need declarations for it? Do charity shop sales qualify? How do higher-rate donors claim their relief? What records does HMRC expect at an inspection?
- Table/chart opportunities: donor-benefit limit bands table (25% up to £100; £25 + 5% above £100; £2,500 cap); 25p per £1 worked example table (£100 → £125 → £25); declaration required-content checklist.
- Calculator embeds: /embed/gift-aid-calculator (section 1), /embed/gasds-calculator (section 8)
- Internal links (wave1): services-gift-aid, calc-gift-aid-calculator, calc-gasds-calculator, blog-gift-aid-declaration-wording, blog-gasds-rules, blog-charity-trading-subsidiary-gift-aid

## House positions touched

- HP 14: "A charity or CASC claims 25p for every £1 donated. Mechanically: the gross donation is the gift divided by (1 − 20% basic rate), and the claim is basic-rate tax on that gross (£100 gift → £125 gross → £25 claim). Requires a valid declaration, and the donor must have paid at least as much UK income tax or capital gains tax that year as all charities will reclaim on their donations." — https://www.gov.uk/claim-gift-aid
- HP 15: "A declaration must include the charity's name, the donor's full name and home address, what donations it covers, a statement that the donor wants Gift Aid to apply, and the explanation that the donor must pay at least as much income/capital gains tax as will be claimed. Keep declaration records 6 years from the end of the accounting period; enduring declarations permanently. Claiming without a declaration means repaying the tax." — https://www.gov.uk/guidance/gift-aid-declarations-claiming-tax-back-on-donations
- HP 16: "Benefits to a donor (or connected person) must pass the relevant value test: max 25% of the donation for donations up to £100; for donations over £100, £25 plus 5% of the amount above £100. Aggregate benefits from one charity in a tax year are capped at £2,500. Value = what the recipient would pay, not the charity's cost. Breach and the donation loses Gift Aid." — https://www.gov.uk/guidance/gift-aid-what-donations-charities-and-cascs-can-claim-on
- HP 17: "Top-up (at the Gift Aid-equivalent 25%, max £2,000 top-up per year) on small cash/contactless donations of £30 or less, on up to £8,000 of donations per tax year, no declarations needed. Matching rule: GASDS donations claimed cannot exceed 10 times the donations on which Gift Aid is claimed in the same year (£100 Gift Aid donations → £1,000 GASDS). Claims within 2 years of the end of the tax year." — https://www.gov.uk/claim-gift-aid/small-donations-scheme
- HP 18: "Charity shops can operate the retail Gift Aid scheme: the shop sells donated goods as the donor's agent and the sale proceeds become a Gift Aid donation, under the standard and simplified operating methods in HMRC detailed guidance chapter 3 (3.42)." — https://www.gov.uk/government/publications/charities-detailed-guidance-notes/chapter-3-gift-aid
- HP 19: "Donors paying above basic rate reclaim the difference between their rate and basic rate on the gross donation, via Self Assessment or a tax-code adjustment. Worked example: £100 gift → charity claims to £125; a 40% taxpayer personally recovers £25 (net cost £75); a 45% taxpayer recovers £31.25 (net cost £68.75). Scottish income tax rates differ for the donor-side calculation only; the charity's 25p per £1 claim is UK-wide." — https://www.gov.uk/donating-to-charity/gift-aid
- HP 10 (context): charity tax reliefs require recognition by HMRC; Commission registration alone does not deliver Gift Aid. — https://www.gov.uk/charities-and-tax
- Consistency rules: GASDS community buildings and connected-charity rules are described and linked, never computed. Never imply a CIC can claim Gift Aid (HP 22 vs 14).

## Hallucination danger zones

- Do not invent a Gift Aid claim time limit for charities; the HP doc locks the GASDS 2-year deadline only. If the page needs the charity-side Gift Aid claim deadline, flag as HP gap, do not state a figure.
- GASDS community buildings (6+ events of 10+ people): describe and point to HMRC guidance, never compute.
- Scottish rates: donor-side only; the charity claim is UK-wide.
- No em-dashes; each BLUF block 40-60 words for answer-box eligibility.

## Stage 2 TODO

- Live-URL check charityaccountants.co.uk and kgaccountantsblog.com Gift Aid pages; harvest FAQ patterns.
- Resolve the HP gap on the charity-side Gift Aid claim deadline (raise HOUSE_POSITION_EXTENSION flag).
- Confirm scope split with blog-gift-aid-declaration-wording (this pillar summarises declarations; the blog owns wording templates).
