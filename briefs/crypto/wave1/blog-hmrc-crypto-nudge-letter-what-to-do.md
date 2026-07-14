---
slug: hmrc-crypto-nudge-letter-what-to-do
tier: blog
route: /blog/hmrc-disclosure/hmrc-crypto-nudge-letter-what-to-do
category: HMRC Disclosure & Compliance
intent: DISTRESS (highest-value capture per LAUNCH_CORE intent class 2). Someone has received an HMRC "nudge" letter about cryptoassets and is frightened. Nudge-letter anatomy + a walkthrough of the HMRC cryptoasset disclosure route. Capture into /services/hmrc-disclosure and the disclosure/penalty estimator.
---
# HMRC Crypto Nudge Letter: What It Means and What To Do Next

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK measured 2026-07-11, raw/dfs_head_volumes.json)

- **Primary:** "hmrc nudge letter" / "hmrc nudge letters" 210/mo, CPC £12.22 (measured). Highest-CPC lane on the site.
- Disclosure family behind it (measured, same pull): "voluntary disclosure hmrc" 590/mo KD 0 CPC £9.10; "hmrc worldwide disclosure facility" 390/mo KD 12 CPC £14.73; "hmrc mandatory crypto disclosure" 260/mo KD 10; "hmrc crypto disclosure" 20/mo.
- Do NOT target the money-page head owned by /services/hmrc-disclosure; this blog is the top-of-funnel distress-capture explainer that links up to it.

## Search-intent class + play

DISTRESS (assist + high-value capture). The searcher has a physical letter in hand and wants two things: is this real, and what do I do so I do not make it worse. Play: a calm, cited BLUF answer box (do not ignore it, you have a route, the route is a disclosure), then the anatomy of the letter (what triggered it, what it does and does not mean), then the Cryptoasset Disclosure walkthrough, then the behaviour-based penalty/years framing, then capture. This is a moat topic because the legal flank (tax solicitors, barristers) ranks here, which proves value, and no dedicated brand owns the crypto-specific nudge-letter answer end to end.

**Cannibalisation split (locked at seed):** this blog owns the "I got a letter, what now" explainer intent. The /services/hmrc-disclosure money page owns the hire intent (represent me in a disclosure). Explain the process here and link up; do not replicate the service pitch.

## Competitors to beat (COMPETITORS.md; domains only at seed, live-URL check is Stage 2)

- **gov.uk** (Tell HMRC about unpaid tax on cryptoassets): the authoritative source, procedural and dry, not written for a frightened recipient. Beat with a plain-English "what the letter means" frame plus the process.
- **Tax solicitors / barrister chambers** ranking the nudge-letter query: legal-heavy, expensive-feeling, no crypto-specific worked framing. Beat on crypto specificity and calm tone.
- **Generalist accountancy firms** with thin "received a nudge letter?" posts: beat on depth and the CARF-driven urgency context (why these letters are increasing).

## Required structure (bodies are RAW HTML: loader does NO markdown conversion; write <h2>/<p>/<ul>/<table>, not markdown syntax)

H2 skeleton:
1. HMRC crypto nudge letter: the short answer (BLUF box, cited; do not ignore, do not panic, disclose)
2. What a nudge letter is (a prompt to check, not an assessment or an accusation) and what usually triggers one
3. Why crypto nudge letters are rising now (short CARF context; link to the CARF explainer)
4. Your options: correct via Self Assessment vs use the cryptoasset disclosure service
5. The Cryptoasset Disclosure walkthrough (register, calculate, disclose, pay)
6. How many years and how much: behaviour decides (reasonable care vs careless vs deliberate)
7. What NOT to do (ignore it, guess the figures, or "cash out quietly" first)
8. When to get help (capture: disclosure service + estimator)

FAQ candidates (no answers at seed):
- Is an HMRC nudge letter a fine?
- Does a nudge letter mean I am under investigation?
- What happens if I ignore an HMRC crypto nudge letter?
- How does HMRC know about my crypto?
- How many years can HMRC go back on crypto?
- Can I just amend my tax return instead of disclosing?
- Will I get a penalty if I disclose voluntarily?

Table/chart opportunities:
- Behaviour vs assessment window vs penalty posture (reasonable care / careless / deliberate) sourced to HP 25.
- "Correct via SA vs cryptoasset disclosure service" decision comparison.

Calculator/tool embed: HMRC disclosure/penalty estimator (primary placement after the walkthrough section). Frame as a scenario tool that ends at "your situation has X complexity, speak to us"; it never produces a filing-ready figure.

Internal links (launch core): /services/hmrc-disclosure (capture), /calculators/disclosure-penalty-estimator (tool), the CARF countdown blog (sibling, urgency context), /for/investors (segment hub).

## House positions touched (docs/crypto/house_positions.md, ONLY figures source)

- **HP 25 (disclosure service + behaviour years):** HMRC runs a dedicated cryptoasset disclosure service for unpaid tax on crypto; the number of years assessed depends on behaviour (reasonable care, careless, or deliberate); nudge-letter recipients should respond, not ignore the letter. Citation: https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets
- **HP 24 (CARF, context only, keep short and exact):** platforms collect user/transaction data from 1 January 2026; first report to HMRC due between 1 January 2027 and 31 May 2027, covering the 2026 calendar year. Use ONLY as the "why letters are rising" context and link to the CARF blog; do not exaggerate the dates. Citations: https://www.gov.uk/guidance/collecting-cryptoasset-user-and-transaction-data and https://www.gov.uk/guidance/reporting-cryptoasset-user-and-transaction-data
- **HP 26 (SA registration deadline, context):** Self Assessment registration deadline is 5 October following the tax year the first reportable gains/income arose; SA108 now has crypto entries. Citation: https://www.gov.uk/register-for-self-assessment

## Hallucination danger zones (enforce)

- A nudge letter is a prompt to check, NOT an assessment, penalty, or confirmed investigation. Do not describe it as a fine or a formal enquiry.
- Do NOT state specific penalty percentages or a fixed number of assessment years as if universal; the years/penalty depend on behaviour (HP 25). Describe the behaviour bands, do not invent figures.
- CARF dates are exact and must NOT be exaggerated: collection from 1 January 2026, first report between 1 January 2027 and 31 May 2027 (HP 24). Do not imply HMRC "already has" full data or a different date.
- The disclosure/penalty estimator is a scenario tool only; never claim it produces a filing-ready or HMRC-accepted figure.
- No credential claims and no named individuals; authority comes from the cited gov.uk sources, not a claimed expert.
- No em-dashes in user-facing copy.
- Body is raw HTML (loader does no markdown conversion): write <h2>, <p>, <ul>, <table> tags directly.

## Stage 2 TODO

- WebFetch the cryptoasset disclosure gov.uk page; confirm the service is live, the register/calculate/disclose/pay steps are current, and the behaviour-based years language is unchanged.
- Re-verify the CARF dates at both cited gov.uk pages before restating them in the context section.
- Fetch one tax-solicitor nudge-letter page and the gov.uk disclosure page to set the depth bar; extract their process steps and any penalty framing.

## FLAGGED open items

- No locked penalty-percentage figures exist in house_positions for behaviour bands; brief instructs describing bands qualitatively only. Flag if a penalty-rate table is wanted (would need an HP extension citing the relevant HMRC penalty guidance, not currently in the 30 positions).
- house_positions has no dedicated "nudge letter anatomy / triggers" position; anatomy content leans on HP 25 plus HP 24 context. Flag if a dedicated nudge-letter HP is wanted.
