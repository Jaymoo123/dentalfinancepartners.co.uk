---
slug: gasds-calculator
tier: calculator
route: /calculators/gasds-calculator
intent: DIY (tool). Treasurers of small charities and churches wanting their GASDS top-up number now; the cash-collection audience the Gift Aid cluster otherwise misses.
---
# GASDS calculator: landing copy brief

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK 2826, fetched 2026-07-11)

- Primary: "gift aid small donations scheme" 390/0 (shared head with gasds-rules; this page owns the TOOL intent per the locked split)
- Secondary: "gasds calculator", "gasds limit" (Google Autocomplete-derived; NO measured volume, do not attach a figure).

## Search-intent class + play

DIY tool intent. Searcher wants their top-up claim number, not the scheme rules. Cannibalisation split (locked at seed): this page owns "how much can I claim" (tool); gasds-rules owns how the scheme works (rules explainer). Play: tool above the fold, landing copy explains the maths incl. the 10x matching rule interaction, cites gov.uk, and captures the "unclaimed years / claims done wrong" edge into services-gift-aid (2-year deadline is the urgency lever).

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- No dedicated GASDS calculator surfaced in the verified rival set; the SERP is guidance pages (gov.uk, church/diocesan resources). Beat by being the only interactive tool: inputs for cash/contactless small donations AND same-year Gift Aid donations so the matching rule is computed, not footnoted.

## Required structure (landing copy AROUND the existing tool)

H2 skeleton:
1. Calculator embed block (tool leads the page): /embed/gasds-calculator
2. What this calculator works out (top-up on small cash/contactless donations, BLUF)
3. The inputs explained (eligible small donations of £30 or less collected in the tax year; Gift Aid donations claimed the same year, for the matching rule)
4. Worked example (placeholder: £4,000 eligible small donations → £1,000 top-up; matching rule: £100 of Gift Aid donations caps GASDS at £1,000 of donations)
5. How the maths works (25% top-up on up to £8,000 of donations, max £2,000 per year; 10x matching rule; methodology + gov.uk citations)
6. What the calculator does not cover (community-buildings and connected-charity allowances: describe and link out, never compute, per HP 17; declaration validity; retail Gift Aid)
7. When to get help (capture edge: unclaimed years inside the 2-year deadline, HMRC queries → services-gift-aid)
8. FAQ

- FAQ candidates: What counts as a small donation? Is the limit £30 per donation? Do contactless payments qualify? Do we need Gift Aid declarations for GASDS? What is the maximum GASDS claim per year? What is the matching rule? How long do we have to claim? Do we need a Gift Aid track record first? Do community buildings get their own allowance? Can a CASC use GASDS?
- Table/chart opportunities: eligible-donations → top-up table at three example amounts, with a matching-rule-capped row.
- Calculator embed: /embed/gasds-calculator
- Internal links (wave1): gasds-rules, pillar-gift-aid-complete-guide, services-gift-aid, calc-gift-aid-calculator

## House positions touched

- HP 17: "GASDS — £30 per donation, £8,000 per year, 10x matching rule, 2-year claim deadline. Top-up (at the Gift Aid-equivalent 25%, max £2,000 top-up per year) on small cash/contactless donations of £30 or less, on up to £8,000 of donations per tax year, no declarations needed. Matching rule: GASDS donations claimed cannot exceed 10 times the donations on which Gift Aid is claimed in the same year (£100 Gift Aid donations → £1,000 GASDS). Claims within 2 years of the end of the tax year. No Gift Aid track record needed for donations collected after 6 April 2017." — https://www.gov.uk/claim-gift-aid/small-donations-scheme and https://www.gov.uk/guidance/claiming-a-top-up-payment-on-small-charitable-donations
- HP 14 (context, section 5): the 25% top-up mirrors the Gift Aid-equivalent rate; do not restate the Gift Aid mechanics here beyond the matching-rule interaction. — https://www.gov.uk/claim-gift-aid
- Note: the GASDS engine is charities/web/src/lib/calculators/tools/gasds-calculator.ts (registered in registry.ts); landing copy figures must never diverge from the engine.

## Hallucination danger zones

- Community-buildings and connected-charity rules (6+ events of 10+ people, per-building £8,000 allowances): DESCRIBE AND LINK ONLY, never compute (HP 17 locked instruction).
- The £2,000 cap is the top-up maximum, not the donation maximum (£8,000 is the donation ceiling). Do not conflate them.
- No declarations are needed for GASDS; do not import declaration requirements from Gift Aid copy.
- Do not state a Gift Aid track-record requirement (abolished for donations collected after 6 April 2017).
- No CIC framing: a CIC cannot claim Gift Aid or GASDS (HP 22).
- No em-dashes in user-facing copy.

## Stage 2 TODO

- Live SERP check for "gasds calculator" / tool-intent occupants.
- Confirm engine input set (incl. matching-rule input) matches the inputs-explained section.
- Confirm answer-box copy blocks are 40-60 words.
