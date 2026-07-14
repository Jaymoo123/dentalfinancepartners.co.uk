---
slug: crypto-same-day-30-day-rules-worked-example
tier: blog
route: /blog/crypto-cgt/crypto-same-day-30-day-rules-worked-example
category: Crypto CGT & Disposals
intent: DIY-informational with reconciliation edge. The single biggest DIY-calculation error for active traders: the same-day rule, then the 30-day (bed-and-breakfast) rule, then the s104 pool. A fully worked numeric example. Capture into the report review/reconciliation service and the CGT estimator, with the honest "this ordering is out of scope of any stateless calculator" wedge.
---
# Crypto Same-Day and 30-Day Rules: A Worked Example (Bed and Breakfasting)

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK measured 2026-07-11)

- **Primary:** "bed and breakfasting rule" 260/mo, KD 0 (measured; generic term, crypto-specific variants below DFS threshold).
- Adjacent DIY intent (see swaps blog): "when do i pay tax on crypto uk" 390/mo KD 12 carries related intent.
- Do NOT target the /for/investors head; this blog is the technical worked-example explainer that funnels to the reconciliation service and the CGT estimator.

## Search-intent class + play

DIY-informational, technical, with a strong reconciliation capture. The searcher (often mid-way through a DIY calculation or reconciling software output) wants to know why their numbers do not match and how the matching rules actually work. Play: BLUF answer box stating the three-step matching order (same-day, then next-30-days, then s104 pool), then a single continuous worked numeric example that carries through all three steps, then why US software defaults (FIFO/specific-ID) get this wrong for UK individuals, then the honest wedge that no stateless web calculator can do this correctly, then capture. The worked example is the whole win; no rival states it cleanly end to end.

**Cannibalisation split (locked at seed):** this blog owns the matching-rules worked example. The Koinly/Recap/CTC report review service owns the "reconcile my actual software output" hire intent. The CGT estimator tool owns "rough scenario number". Keep the pooling theory here and link out for the hire.

## Competitors to beat (COMPETITORS.md; domains only at seed, live-URL check is Stage 2)

- **gov.uk** (CRYPTO22200 pooling, CRYPTO22250 same-day/30-day): the authoritative manual, terse, no continuous worked example. Beat with one numeric example carried through all three matching steps.
- **Crypto-tax software blogs (Koinly-class)**: explain pooling but often gloss the same-day/30-day ordering or present it US-style. Beat on the exact UK ordering and the "software defaults are wrong for you" angle.
- **Generalist UK accountancy posts**: usually state the share-matching rules generically without a crypto-specific numeric walk-through. Beat on crypto specificity.

## Required structure (bodies are RAW HTML: loader does NO markdown conversion; write <h2>/<p>/<ul>/<table>, not markdown syntax)

H2 skeleton:
1. The short answer: the three-step matching order (BLUF box, cited)
2. Step 1, the same-day rule: disposals match same-day acquisitions first
3. Step 2, the 30-day (bed-and-breakfast) rule: then acquisitions in the next 30 days
4. Step 3, the section 104 pool: everything else matches the pool at average cost
5. Worked example: one token, several buys and sells across a month, carried through all three steps (with a table)
6. Why crypto-tax software often gets this wrong (FIFO/LIFO/specific-ID are wrong for UK individuals)
7. Where this leaves your CGT figure (AEA £3,000, then 18% within remaining basic band, 24% above)
8. Getting your numbers reconciled (capture)

FAQ candidates (no answers at seed):
- What is the bed and breakfasting rule?
- Does the 30-day rule apply to crypto?
- What order do you match crypto disposals in?
- Why does my Koinly report differ from HMRC rules?
- Is FIFO allowed for UK crypto?
- What is a section 104 pool?
- How does the same-day rule work?

Table/chart opportunities:
- The worked-example ledger: date, buy/sell, quantity, price, which rule matches it, allowable cost used, gain/loss. This is the centrepiece.
- The three-step matching order as a numbered checklist.

Calculator/tool embed: crypto CGT estimator (s104 simplified) after the worked example, with an explicit note that it applies the pool only and does NOT model same-day/30-day matching (per house_positions HP 5, that ordering is out of scope of any stateless web calculator). Scenario tool, ends at "speak to us".

Internal links (launch core): Koinly/Recap/CTC report review & reconciliation service (capture), /calculators/crypto-cgt-estimator (tool), /for/investors and /for/day-traders (hubs), the swaps-are-disposals blog (sibling, feeds pool events).

## House positions touched (docs/crypto/house_positions.md, ONLY figures source)

- **HP 5 (same-day and 30-day override the pool):** disposals match same-day acquisitions first, then acquisitions in the following 30 days, then the s104 pool; this ordering is the single biggest DIY-calculation error and is out of scope of any stateless web calculator (state this openly on the tool). Citation: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22250
- **HP 4 (s104 pooling per token, average cost):** each token has one pool; allowable cost is the average cost of the pool; FIFO/LIFO/specific-ID (US software defaults) are WRONG for UK individuals. Citation: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200
- **HP 3 (annual exempt amount £3,000, frozen):** used in the "where this leaves your CGT" section. Citation: https://www.gov.uk/capital-gains-tax/allowances
- **HP 2 (CGT rates):** 18% within the remaining basic-rate band, 24% above; higher/additional-rate 24% on the whole gain. Never state a flat 18%. Basic-rate band ceiling £37,700 for 2026/27. Citation: https://www.gov.uk/capital-gains-tax/rates

## Hallucination danger zones (enforce)

- The matching ORDER is fixed and must be exact: same-day FIRST, then next-30-days, then s104 pool (HP 5). Do not reorder or merge steps.
- CGT rate presentation: NEVER state a flat "18% basic rate". Always 18% only within the remaining basic-rate band, 24% above; higher/additional-rate 24% on the whole gain (HP 2, the single most common presentation error). AEA is £3,000 (HP 3), not any older figure.
- Pooling is average-cost per token (HP 4). Do NOT use FIFO/LIFO/specific-ID as the UK method; present them only as the wrong software defaults.
- The worked-example numbers are ILLUSTRATIVE and must be internally arithmetic-consistent; label them as an example, not real prices. Double-check the pool average-cost maths so the example does not itself teach an error.
- The CGT estimator note must state it models the pool only, not same-day/30-day (HP 5). Never imply the tool produces a filing-ready figure.
- No credential claims, no named individuals. No em-dashes.
- Body is raw HTML (loader does no markdown conversion): write tags directly.

## Stage 2 TODO

- WebFetch CRYPTO22200 and CRYPTO22250; confirm the pooling method and the same-day-then-30-day ordering are unchanged.
- Re-verify AEA £3,000 and the 18%/24% band split and £37,700 basic-rate ceiling at the two rates/allowances pages before restating.
- Have Opus (or a careful pass) re-check the worked-example arithmetic end to end before publish; a wrong worked example is worse than none.

## FLAGGED open items

- No factual gaps; all figures map to HP 2/3/4/5. The one build-time risk is worked-example arithmetic correctness, gated by the Stage 2 re-check TODO.
