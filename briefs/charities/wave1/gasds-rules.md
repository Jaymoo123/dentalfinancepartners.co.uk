---
slug: gasds-rules
tier: blog
route: /blog/gasds-rules
intent: DIY. Treasurers checking what they can claim on cash buckets/contactless without declarations; LAUNCH_CORE tags GASDS/small donations DIY.
---
# GASDS Rules: The Gift Aid Small Donations Scheme Explained (Limits, Matching Rule, Deadlines)

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK 2826, fetched 2026-07-11)

- **Primary:** "gift aid small donations scheme" 390/0 (LAUNCH_CORE cluster map, GASDS cluster; named in the 12 priority blogs as "GASDS rules").
- **Secondary:** "gasds limit" (Google Autocomplete-derived per LAUNCH_CORE; NO measured volume, do not attach a figure). Other long-tail ("gasds community buildings", "gasds contactless") autocomplete-derived, no measured volume.

## Search-intent class + play

DIY rules explainer. Cannibalisation split (locked at seed): this blog owns the RULES intent (how the scheme works, edge cases, matching rule, community buildings); calc-gasds-calculator owns the TOOL intent ("how much can I claim"). This page explains, links the calculator for computation, and does not replicate the tool. Capture edge: claims done wrong / unclaimed years (2-year deadline) into services-gift-aid.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **gov.uk** (two guidance pages own the SERP): beat on worked examples, edge cases and plain-English matching-rule explanation; do not fight the definitional head.
- **Parish Resources / Stewardship** (excluded info platforms, strong in small-donations SERPs): church-flavoured; beat on general-charity framing.
- **charityaccountants.co.uk** (primary rival #1): thin blog; a full-rules page outranks it.

## Required structure

- H2 skeleton:
  1. The short answer: what GASDS lets you claim (BLUF box)
  2. Which donations qualify (£30 cash/contactless, no declarations)
  3. The annual limit and what the top-up is worth
  4. The matching rule: why you need some Gift Aid claims too (worked example)
  5. Community buildings and connected charities (describe and link, never compute)
  6. How to claim and the 2-year deadline
  7. GASDS vs Gift Aid: when each applies (comparison table)
  8. Common failure modes (missed years, no matching Gift Aid, over-£30 donations)
- FAQ candidates (no answers at seed stage):
  1. What is the GASDS limit per donation?
  2. How much can a charity claim under GASDS each year?
  3. Do we need Gift Aid declarations for GASDS?
  4. What is the GASDS matching rule?
  5. Do contactless donations qualify for GASDS?
  6. What is the deadline for GASDS claims?
  7. Does our charity need a Gift Aid track record to use GASDS?
  8. How do the community buildings rules work?
  9. Can a CASC claim GASDS?
  10. Can we claim GASDS on donations over £30?
- Table/chart opportunities: GASDS vs Gift Aid comparison table (declaration needed, per-donation limit, annual cap, evidence required); matching-rule worked-example table (£100 Gift Aid → £1,000 GASDS ceiling).
- Calculator embed: /embed/gasds-calculator (primary placement after the limits section).
- Internal links within launch core: calc-gasds-calculator, pillar-gift-aid-complete-guide, services-gift-aid. Stage 2 candidate: gift-aid-declaration-wording (the with-declaration route).

## House positions touched

- **HP 17 (GASDS), copied exactly:** "Top-up (at the Gift Aid-equivalent 25%, max £2,000 top-up per year) on small cash/contactless donations of £30 or less, on up to £8,000 of donations per tax year, no declarations needed. Matching rule: GASDS donations claimed cannot exceed 10 times the donations on which Gift Aid is claimed in the same year (£100 Gift Aid donations → £1,000 GASDS). Claims within 2 years of the end of the tax year. No Gift Aid track record needed for donations collected after 6 April 2017. Community-buildings rules (6+ events of 10+ people) can give connected charities/buildings their own £8,000 allowances — always flag, never improvise: point to the HMRC guidance." Citations: https://www.gov.uk/claim-gift-aid/small-donations-scheme and https://www.gov.uk/guidance/claiming-a-top-up-payment-on-small-charitable-donations (both verified 2026-07-11).
- **HP 14 (Gift Aid mechanics, for the comparison table), copied exactly:** "A charity or CASC claims 25p for every £1 donated." Citation: https://www.gov.uk/claim-gift-aid (verified 2026-07-11).
- Consistency rule that binds this page: "GASDS community buildings and connected-charity rules: describe and link, never compute (position 17)."

## Hallucination danger zones

- Community buildings / connected charities: the hard rule is describe-and-link, NEVER compute or give an example allocation; the sub-rules are not locked and improvised examples are the top risk.
- The matching rule direction is commonly inverted in rival content (it is GASDS ≤ 10 × Gift Aid, not the reverse); copy the £100 → £1,000 worked example from HP 17 verbatim.
- The £2,000 figure is the maximum TOP-UP, the £8,000 figure is the DONATIONS base; do not swap them.
- One em-dash exists inside the HP 17 locked text as stored; when quoting into user-facing copy, restructure to avoid em-dashes while keeping every figure identical.
- No em-dashes in user-facing copy.

## Stage 2 TODO

- WebFetch both gov.uk GASDS guidance pages; confirm URLs live and the 10x worked example still present.
- Check whether CASC GASDS eligibility needs an HP extension (HP 17 covers charities/CASCs via HP 14 phrasing; confirm before the CASC FAQ is answered).
- WebFetch one info-platform GASDS page; record coverage.
