---
slug: for-businesses
tier: money
route: /for/businesses
intent: HIRE. BUSINESS audience: companies (and their finance leads/directors) that hold crypto on the balance sheet, accept crypto for goods or services, or pay staff in tokens, needing CT/VAT/PAYE treatment right; operator/company frame throughout.
---
# Segment hub: crypto tax accountants for businesses (the site)

> Seed brief (Stage 1). Working brand agnostic; all copy references "the site" / "the firm". CTA and brand copy flow from site config at write time. No em-dashes anywhere. Faceless authority only (no named experts, no credential claims; owner is not an accountant, authority via cited HMRC sources).

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK 2026-07-11, location 2826)

- FLAGGED, no measured head volume. This hub stands on the estate BUSINESS-audience rule and rival segmentation evidence, NOT on measured volume. Flagged honestly, not falsified.
- Adjacent intent behind: company treasury, paying staff in crypto, accepting crypto payments (long-tail, distress/advisory-shaped)

## Search-intent class + play

HIRE lead page for the BUSINESS audience (estate rule: /for/* coverage must include the business side; lead forms get segment-specific optional fields). A company is a different taxpayer to an individual: crypto gains sit in Corporation Tax, not CGT, and there is no £3,000 annual exempt amount for a company (that is an individual's allowance). The page must cover four company jobs: holding crypto (CT on gains, balance-sheet treatment), accepting crypto for goods or services (VAT bites on the goods/services at sterling value, not on the token exchange itself, HP 29), paying staff in tokens (PAYE and NIC where tokens are readily convertible assets, employer NIC 15% above £5,000, HP 8), and the same CARF and disclosure urgency as individuals (HP 24, HP 25). Company/operator frame throughout, never investment advice.

## Competitors to beat (COMPETITORS.md per LAUNCH_CORE; domains only at seed stage, live-URL check is Stage 2)

- **Menzies / mid-tier practice crypto-for-business pages** (SECTION heavyweights; Menzies CDF page noted in LAUNCH_CORE). Beat by owning the SME company band with the VAT and token-salary specifics plus the tools, not thought-leadership prose.
- **Dedicated crypto-accountant business/company pages** (segmentation market-proven). Beat by the paying-staff-in-crypto PAYE/NIC depth and the balance-sheet framing.

## Required structure

H2 skeleton:
1. Hero: crypto tax accountants for businesses (company value prop + CTA)
2. A company is taxed differently (crypto gains in Corporation Tax, not CGT; no individual £3,000 AEA applies to a company; state the CT position, route rate specifics to a fact-check at write, HP GAP on the CT rate)
3. Holding crypto on the balance sheet (recognition and measurement flagged as an accounting-standards question routed to "speak to us", HP GAP; CT on realised gains)
4. Accepting crypto for goods or services (VAT bites on the goods/services at their sterling value at the time of the transaction, NOT on the token exchange itself, HP 29)
5. Paying staff in tokens (earnings where readily convertible assets; PAYE and NIC apply; employer Class 1 NIC 15% above the £5,000 secondary threshold, HP 8; never 13.8%/£9,100)
6. CARF and disclosure for companies (platforms collect from 1 January 2026, first report 1 January to 31 May 2027, HP 24; dedicated HMRC disclosure service, HP 25)
7. Free tools (disclosure and penalty estimator; note the individual calculators are scenario tools, company figures need a conversation)
8. How the site works with companies (process; fees from config)
9. Anonymised social proof + next step CTA

FAQ candidates (questions only):
- How is crypto taxed in a limited company? (Corporation Tax on gains, not CGT; no £3,000 AEA)
- Do we charge VAT if we accept crypto for our products? (HP 29, VAT on the goods/services at sterling value, not the token exchange)
- Can we pay staff or contractors in crypto? (HP 8, PAYE/NIC where readily convertible)
- What is the employer NIC cost of paying in tokens? (HP 8, 15% above £5,000)
- Does CARF apply to our company's exchange accounts? (HP 24)
- We hold crypto on our balance sheet, how is it accounted for? (HP GAP, accounting-standards question, speak to us)

Table/chart opportunities: a VAT strip (token exchange not a VATable supply of the tokens vs VAT on goods/services paid for in crypto at sterling value, HP 29, linking gov.uk); an employer-NIC line (15% above £5,000, HP 8, linking gov.uk). Every figure links its gov.uk page. Do NOT assert a CT rate figure unless verified at write (HP GAP).

Calculator embeds: HMRC disclosure/penalty estimator (scenario tool, ends at "speak to us"). No company-CT calculator at launch; company figures explicitly routed to a conversation.

Internal links (launch core): homepage, /for/investors (director's personal holdings), /for/miners and /for/defi-and-staking (if the company mines/stakes), /services/hmrc-disclosure (company disclosure), the disclosure/penalty calculator, paying-staff-in-crypto blog, company crypto treasury accounting blog.

Lead form: business/company intake. Segment-specific optional fields (LAUNCH_CORE business-audience rule): exchanges used, approximate transaction count, reconciliation software used, nudge-letter received (y/n). Plus company context: company holds crypto / accepts crypto / pays in crypto (multi-select), number of employees paid in tokens (if any).

## House positions touched (docs/crypto/house_positions.md; gov.uk URLs below)

- HP 8: employment income paid in crypto is taxable earnings; where readily convertible assets, PAYE and NIC apply; employer Class 1 NIC 15% above the £5,000 secondary threshold (from 6 April 2025), NOT 13.8%/£9,100. https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto42000
- HP 29: exchanging exchange tokens is not itself a VATable supply of the tokens; VAT bites on goods and services paid for in crypto at their sterling value at the time of the transaction. https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto45000
- HP 24: CARF collection from 1 January 2026; first report 1 January to 31 May 2027 (applies to company accounts too). https://www.gov.uk/guidance/collecting-cryptoasset-user-and-transaction-data and https://www.gov.uk/guidance/reporting-cryptoasset-user-and-transaction-data
- HP 25: dedicated HMRC cryptoasset disclosure service; respond to nudge letters. https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets

Consistency rules: UK default. Company = Corporation Tax, not CGT; the £3,000 AEA is an individual allowance and does not apply to companies (do not import it). Employer NIC 15%/£5,000, never 13.8%/£9,100. VAT on goods/services at sterling value, not on the token exchange. CARF dates exact. No investment or price views.

## HP GAP FLAG

- The Corporation Tax rate and the accounting-standards treatment of crypto on a company balance sheet (recognition, measurement, intangible vs current-asset classification) are NOT house positions in docs/crypto/house_positions.md. Do NOT assert a CT rate or a balance-sheet accounting rule from memory. Present the CT-not-CGT principle and route the rate and accounting treatment to "speak to us" / verify at write. Flag to the orchestrator that a CT-rate and a crypto-accounting-standards house position may be needed if this page is to assert figures.

## Hallucination danger zones

- A company pays Corporation Tax on gains, NOT CGT, and does NOT get the £3,000 individual AEA (HP 3 is an individual allowance). Do not import CGT rates or the AEA onto the company page.
- Do not assert a Corporation Tax rate figure or a balance-sheet accounting rule; neither is in house_positions (HP GAP). Route to a conversation.
- Employer NIC is 15% above £5,000, NEVER 13.8%/£9,100 (HP 8).
- VAT bites on the goods/services paid for in crypto at sterling value, NOT on the token exchange itself (HP 29). Do not say crypto payments are "VAT-free".
- Paying staff in tokens triggers PAYE/NIC only where they are readily convertible assets (HP 8); state that condition.
- CARF dates exact (HP 24); do not exaggerate.
- No credential claims, no named expert. No em-dashes. No investment or price views.

## Stage 2 TODO

- Live-URL verify Menzies and dedicated crypto-for-business rival pages.
- Orchestrator decision: add a CT-rate and a crypto-accounting-standards house position, or keep this page principle-only with figures routed to a conversation (HP GAP).
- Re-verify HP 8 (employer NIC threshold), HP 29 and HP 24 at source at write time.
- Confirm disclosure/penalty calculator slug against CALCULATORS.md.
