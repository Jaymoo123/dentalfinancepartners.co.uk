---
slug: services-hmrc-disclosure
tier: money
route: /services/hmrc-disclosure
intent: DISTRESS. THE flagship lane. The person who has had a nudge letter, or knows the CARF clock is running and has undeclared crypto, wants a disclosure handled now. Highest-CPC lane on the site. This page captures the "respond, do not ignore" moment and converts it to a managed disclosure engagement.
---
# Service page: HMRC crypto disclosure and nudge-letter response

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site" / "the firm". CTA and brand copy flow from site config at write time. No em-dashes anywhere.

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK location 2826, 2026-07-11)

- Primary: "voluntary disclosure hmrc" 590/mo, KD 0, CPC £9.10 (the money term; broad intent, this page is the crypto-specific answer)
- Primary: "hmrc worldwide disclosure facility" 390/mo, KD 12, CPC £14.73 (offshore-exchange framing; adjacent, route to the correct crypto facility)
- Primary: "hmrc nudge letter(s)" 210/mo, CPC £12.22 (the distress trigger; "respond, do not ignore")
- Primary: "hmrc cryptocurrency information sharing" 480/mo, KD 13 (the CARF-driven "HMRC can see my exchange" fear; the urgency engine)
- Secondary: "hmrc mandatory crypto disclosure" 260/mo, KD 10; "hmrc crypto disclosure" 20/mo
- Highest-CPC lane on the whole site; flagship status confirmed by data (LAUNCH_CORE).

## Search-intent class + play

DISTRESS lead page, the highest-lead-value lane on the site. Two entry moments converge here: (a) a nudge letter has landed and the recipient is searching in fear, and (b) the CARF clock is now visible ("hmrc cryptocurrency information sharing" 480/mo) and a holder with undeclared gains realises the "HMRC cannot see my exchange" era is over. The winning frame is calm authority: the letter is not an accusation, it is a prompt, and the correct response is a managed disclosure through HMRC's dedicated cryptoasset route, not silence and not panic. The wedge against the legal flank (barristers, tax solicitors ranking here per LAUNCH_CORE) is faceless accessibility plus the disclosure/penalty estimator that lets a worried holder see the behaviour-band-to-years logic before they call. Never scare-copy: CARF dates are stated precisely and never exaggerated (they are already alarming enough when true).

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **Legal flank (tax barristers / tax-investigation solicitors)** ranking on disclosure and nudge-letter terms. Beat by: accessible, faceless, price-anchor-free clarity plus the interactive disclosure/penalty estimator, for the holder who does not yet need (or want to pay for) a barrister and wants the accountancy route first.
- **Menzies CDF page and large-firm disclosure pages** (SECTION). Heavyweight brand, brochure depth. Beat on the crypto-specific behaviour-band mechanics, the CARF countdown currency, and the estimator tool, not generic disclosure prose.
- **General accountancy "voluntary disclosure" pages** colonising the 590/mo head. Beat on crypto specificity: the cryptoasset disclosure service is a distinct HMRC route, and the s104-pooling reconciliation work behind a correct disclosure figure is our differentiator.

## Required structure

H2 skeleton:
1. If you have had a nudge letter, respond, do not ignore it (answer-first; the letter is a prompt, not a charge; then the service)
2. Why HMRC is writing now: CARF and the end of the "they cannot see my exchange" era (the precise dates, no exaggeration)
3. HMRC's dedicated cryptoasset disclosure service (what it is, that it exists specifically for unpaid crypto tax)
4. How many years HMRC can assess: behaviour bands (reasonable care, careless, deliberate) and what each means for the assessment window and penalties
5. How the site runs a disclosure for you (reconstruct the position, s104 pooling done correctly, quantify tax and interest, prepare and submit the disclosure, manage HMRC correspondence)
6. Estimate your exposure (embed the disclosure/penalty estimator; range not promise)
7. Worldwide Disclosure Facility vs the cryptoasset route: which applies (offshore-exchange framing routed correctly)
8. Next step CTA (act before the letter escalates / before CARF data lands)

FAQ candidates (questions only):
- I have had a nudge letter about cryptoassets, what should I do?
- Can HMRC actually see my exchange account?
- What is CARF and when does HMRC start getting the data?
- How many years back can HMRC go?
- What is the difference between reasonable care, careless and deliberate?
- Will I get a penalty if I come forward voluntarily?
- What is the difference between the Worldwide Disclosure Facility and the crypto disclosure service?
- I never cashed out to pounds, do I still have undeclared tax? (answer: crypto-to-crypto swaps are disposals; HP 6)
- What happens if I ignore the letter?
- I do not know my full transaction history, can you still help?

Table/chart opportunities: behaviour-band table (reasonable care / careless / deliberate → typical assessment window, penalty exposure framing, disclosure route), mapped to HP 25; frame penalties qualitatively as ranges, do not assert exact penalty percentages (see danger zones). CARF timeline box (collection from 1 Jan 2026; covers 1 Jan to 31 Dec 2026; first report to HMRC between 1 Jan 2027 and 31 May 2027; annual thereafter), mapped exactly to HP 24. No fee figures.

Calculator embed: /embed/hmrc-crypto-disclosure-estimator (mid-page, in the exposure section; THE accountant-seeking tool, highest lead value per use per CALCULATORS.md; behaviour band → years assessable + penalty range + interest flag, output is a range and a "disclosure route" explainer, never a promise).

Internal links (launch core): homepage (crypto tax accountants head), /for/investors and /for/day-traders (where the undeclared-gains audience self-identifies), blog nudge-letter-anatomy-and-CDF-walkthrough, blog CARF-countdown-explainer, calc-hmrc-crypto-disclosure-estimator (landing), services-koinly-recap-reconciliation (the reconciliation work behind a correct disclosure figure), /research/crypto-tax-gap-index (the CARF-countdown data asset).

## House positions touched (docs/crypto/house_positions.md; every figure maps to a position + gov.uk URL)

- HP 24: From 1 January 2026 UK cryptoasset platforms must collect user and transaction data under CARF; collection covers 1 January to 31 December 2026; the first report to HMRC is due between 1 January 2027 and 31 May 2027, annual thereafter. State the dates precisely and never exaggerate them; this is TRUE, not scare copy. https://www.gov.uk/guidance/collecting-cryptoasset-user-and-transaction-data and https://www.gov.uk/guidance/reporting-cryptoasset-user-and-transaction-data
- HP 25: HMRC runs a dedicated cryptoasset disclosure service for unpaid tax on crypto; the number of years assessed depends on behaviour (reasonable care, careless, or deliberate); nudge-letter recipients should respond, not ignore the letter. https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets
- HP 6 (support): crypto-to-crypto swaps are taxable disposals at sterling market value; "I never cashed out to pounds" is not a defence (used to explain why a holder who never withdrew fiat can still have undeclared tax). https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets
- HP 4 (support): s104 pooling per token at average cost (context for why reconstructing a correct disclosure figure is skilled work, not a spreadsheet sum). https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200

Consistency rules: the CARF dates (HP 24) must be stated exactly, never rounded up or dramatised. The disclosure service (HP 25) is a real, named HMRC route; do not conflate it with the general Worldwide Disclosure Facility (offshore) except to explain which applies.

## Hallucination danger zones

- CARF dates (HP 24): collect FROM 1 January 2026, first report 1 January to 31 May 2027 covering calendar-year 2026. Do NOT say HMRC "already has" the data in 2026, do NOT bring the first-report date forward, do NOT imply exchanges report continuously. State it precisely; the true timeline is urgent enough.
- Do NOT assert specific penalty percentages as fixed. Penalties depend on behaviour, disclosure quality and whether prompted or unprompted. Frame as ranges and "depends on behaviour band"; the estimator outputs a range, not a figure. HP GAP: exact penalty-percentage bands per behaviour category are NOT a locked position, flag before any table states numbers.
- HP GAP: the exact number of assessment years per behaviour band (commonly cited as up to 4 / 6 / 20 years) is NOT locked in house positions. Describe qualitatively ("more years the more serious the behaviour") and FLAG for Stage 2 before stating specific year counts.
- Do NOT give investment advice or price views (regulated-advice boundary). This is tax-compliance guidance only.
- Do NOT promise HMRC will accept the disclosure, waive penalties, or cap the years; frame everything as the managed route that puts the holder in the best position.
- The estimator is a scenario/triage tool ending at "speak to us", never a filing-ready penalty figure (CALCULATORS.md).
- No credential claims, no named expert, no barrister/qualification framing (faceless authority; owner is not an accountant).
- No fee or pricing figures anywhere. No em-dashes.

## Stage 2 TODO

- Live-URL verify: a tax-barrister disclosure/nudge-letter page, a tax-investigation solicitor page, Menzies CDF page, one large-firm "voluntary disclosure" page.
- Confirm the disclosure/penalty estimator embed slug against the built config.
- HP GAP request: exact assessment-year windows per behaviour band (reasonable care / careless / deliberate) and the penalty-percentage ranges per band, with gov.uk source, before any FAQ or table states specific numbers.
- Confirm current wording of the gov.uk cryptoasset disclosure page (HP 25) at build time in case HMRC has renamed or restructured the service.
