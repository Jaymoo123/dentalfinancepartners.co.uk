---
slug: cgt-overseas-property-uk-residents-foreign-disposals
category: capital-gains-tax
intent: applied guide — UK tax resident selling overseas (non-UK) property; FX base cost, SA108, treaty credit relief
---

# Working title: CGT on Overseas Property for UK Residents: FX Base Cost, SA108 and Treaty Relief

## Statutory anchor

**Primary:** TCGA 1992 s.1(1) — UK residents are subject to CGT on worldwide gains including gains on overseas property.

**Supporting:**
- TCGA 1992 s.38 / s.41 — allowable expenditure rules apply equally to overseas property (acquisition cost, enhancement expenditure, incidental costs of disposal).
- TCGA 1992 s.252 / s.253 — foreign currency amounts converted to sterling at the rate prevailing at the time of each transaction (acquisition cost converted at the acquisition date rate; disposal proceeds converted at the disposal date rate — creating an FX component in the apparent gain).
- TIOPA 2010 s.18 / s.112 — double taxation relief; credit for foreign tax paid on the same gain (credit method, NOT exemption, for CGT on property gains under most UK DTAs — see Art 13 OECD model and §16.3 house position).
- TCGA 1992 s.222-s.226 (PRR) — available on overseas property if it was the taxpayer's only or main residence at the relevant time; the 9-month final period and the nomination rules apply equally (no physical presence requirement in UK law for PPR; the property simply needs to have been the main residence).
- Self Assessment: SA108 (Capital Gains Summary) + foreign supplementary pages — both required for an overseas property disposal.

**House position reference:** §10 (DTA general framing, foreign tax credit must be claimed). §16 (DTA article map; Art 13 capital gains; §16.3 specifically). §5 (CGT rates 18%/24%; 60-day reporting for UK land only — does NOT apply to overseas property). NEW LOCK NEEDED: FX base-cost conversion mechanics (acquisition cost at acquisition-date rate vs. disposal proceeds at disposal-date rate — separate FX components), and confirmation that the 60-day return does NOT apply to overseas disposals (only UK land triggers the 60-day rule).

## Framing differentiator

**Most important scope guard:** `non-resident-cgt-selling-uk-property-overseas-guide` (Jaccard 0.23 — highest overlap in cannib check) covers the REVERSE flow: a person who is NOT UK tax resident selling UK property. This page is the opposite: a person who IS UK tax resident selling property located OUTSIDE the UK (e.g. a Spanish villa, a French apartment, a Dubai flat). There must be ZERO scope bleed. Stage 2 must WebFetch the existing reverse-flow page and verify the opening framing makes the directional difference explicit.

Additional competitor to check: `foreign-tax-credit-uk-property-overseas-landlords` (Jaccard 0.17) — that page covers INCOME (rental income and the credit for foreign withholding tax). This page covers CAPITAL GAINS on disposal, which is a separate SA108 / treaty-relief path. Income-side credit is background only; do not re-cover it.

**Angle this page takes:** Operational walkthrough for a UK resident who has sold (or is about to sell) a foreign property. The unusual mechanics are: (a) FX conversion of base cost vs. proceeds creates a currency gain/loss embedded within the overall computation; (b) foreign CGT or equivalent tax paid can be credited against the UK CGT liability (not deducted from the gain) subject to treaty provisions; (c) reporting is on SA108 plus foreign pages (NOT the 60-day property return); (d) PPR is available if the property was the main residence. No competitor page currently combines all four mechanics in one guide.

## Key questions this page must answer

1. Am I subject to UK CGT on a property I own in another country if I am UK tax resident?
2. How do I convert the foreign currency purchase price and sale price to sterling, and why does the exchange rate matter?
3. Can the gain be reduced by the foreign CGT or equivalent tax I have already paid abroad?
4. Is private residence relief available on my overseas holiday home or foreign main residence?
5. Which Self Assessment pages do I need to complete (SA108 and which supplementary pages)?
6. Does the 60-day CGT return apply to overseas property, or only to UK land?
7. What records do I need to support the computation (purchase contract, currency rates, foreign tax receipts, proof of residence)?
8. How does a double taxation agreement affect the outcome, and do I still owe UK tax if the other country has already taxed the full gain?
9. Are there any special rules for properties held before I became UK resident (e.g. rebasing on becoming resident)?
10. What is the deadline for reporting the overseas gain on Self Assessment?

## Manager pre-decisions placeholder

- [ ] Confirm scope on "rebasing on becoming UK resident" — the temporary non-residence rules (TCGA s.10A) run the OTHER way (tax when you leave and come back). Becoming resident is different; Stage 1 flags this as needing verification. If complex, restrict to "property already owned as a UK resident" and note edge case briefly.
- [ ] Confirm: PPR coverage — is it worth a full section, or a brief note cross-linking the PPR page? Stage 1 assumes a concise dedicated section (the overseas-PPR rule is a genuine surprise to many readers).

## Stage 2 research target list

**Competitor candidates (for brief verification — Stage 2 to WebFetch and confirm live):**
1. `non-resident-cgt-selling-uk-property-overseas-guide` (Property Tax Partners site) — WebFetch to confirm it is the reverse flow and capture its opening framing, so this page's intro can explicitly contrast.
2. `foreign-tax-credit-uk-property-overseas-landlords` (Property Tax Partners site) — WebFetch to confirm it covers income-side credit only, not CGT disposal.
3. HMRC helpsheet HS283 "Private Residence Relief" — PPR for overseas property.
4. HMRC helpsheet HS261 "Foreign Tax Credit Relief" — credit method mechanics.

**HMRC manual refs:**
- CG78300+: overseas property — general CGT treatment
- CG78380: currency — sterling conversion of foreign-currency amounts
- INTM161000+: double taxation relief, credit method (confirms credit, not exemption, is the default for CGT)

**Legislation.gov.uk refs to verify:**
- TCGA 1992 s.252 (foreign currency conversions) — Stage 2 to WebFetch and quote verbatim title.
- TIOPA 2010 s.18 (credit relief for foreign tax) — Stage 2 to WebFetch and quote verbatim title.

## Universal rules + workflow stubs (Stage 2 fills)

- No em-dashes anywhere in the body.
- Rates: 18% basic / 24% higher (§5). Personal reps 24%.
- 60-day return: does NOT apply to overseas disposals — overseas property disposals go on SA (January 31 following the tax year). Explicitly state this in the body (common misconception).
- Do NOT write "60-day return applies to overseas property." Do NOT write "UK tax does not apply because another country taxed the gain" (credit, not exemption). Do NOT write "DTA eliminates UK CGT on overseas property" (§10 do-not-write).
- Blog body = raw HTML; no markdown in body field.
- LeadForm at footer only.
- Internal links: link to the non-resident-cgt page with explicit directional label; link to DTA page if exists; link to foreign tax credit (income) page with scope note.

## Work log

- 2026-07-08 S1 seed written (Stage 1 sub-agent, Session A).
