---
slug: services-koinly-recap-reconciliation
tier: money
route: /services/koinly-recap-reconciliation
intent: RECONCILIATION. The holder who already has a Koinly / Recap / CoinTracking report and does not trust it, or has been told by an accountant to get it reviewed, wants a UK accountant to reconcile it. Thin-but-exclusive intent: only accountants can serve it. The hook is UK s104 pooling versus the software's FIFO / specific-identification defaults, the one thing no software page can copy.
---
# Service page: Koinly, Recap and CoinTracking report review and reconciliation

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site" / "the firm". CTA and brand copy flow from site config at write time. No em-dashes anywhere.

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK location 2826, 2026-07-11)

- Primary: "koinly accountant" 10/mo (thin but exclusive; accountant-only intent, SERP is thin firm-listings per LAUNCH_CORE)
- Secondary: "recap accountant", "cointracking accountant uk", "koinly report review", "is koinly accurate for uk tax" (autocomplete / reconciliation intent)
- Deliberately NOT chased: "koinly" 6,600/mo, KD 11 and "crypto tax calculator" 1,000/mo, KD 22 (software-owned DIY head; LAUNCH_CORE confirms these are ceded, not contested)

## Search-intent class + play

RECONCILIATION lead page. The volume is deliberately thin, but the intent is exclusive: someone searching "koinly accountant" already owns the software and now wants a human to make it defensible. The technical hook (and the differentiator no software marketing page can copy) is the pooling method. UK individuals must use section 104 pooling at average cost, per token. The dominant crypto tax software defaults, and the US-shaped mental model, lean on FIFO, LIFO or specific identification, which are WRONG for UK individuals (HP 4). A report set to the wrong method, or run without the same-day and 30-day matching rules applied correctly, produces a plausible-looking but incorrect UK figure. This page sells the review that catches exactly that: confirm the settings are UK-correct, reconcile the numbers, and flag the same-day/30-day matching the tool cannot reliably do stateless. That admission (the software cannot guarantee this on its own) is the credibility wedge.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **Koinly / Recap / CoinTracking own "find an accountant" directories** and marketing pages. Beat by: being the accountant the directory points to, and by openly stating the UK pooling-versus-defaults gap their own marketing cannot foreground (it would undercut the "instant accurate report" claim).
- **General crypto accountancy firms listing "software reconciliation"** as one line (SECTION). Beat on the s104-versus-FIFO/spec-ID depth spelled out, not buried; the specific same-day/30-day override; and worked clarity on why a UK report needs review.
- **DIY forum/blog "is Koinly accurate for UK?" content** (DIY-INFORMATIONAL). Beat by converting the doubt those threads create into a managed review, with the correct method named and cited.

## Required structure

H2 skeleton:
1. You have a report but you are not sure it is UK-correct (answer-first; then the review service)
2. The one setting most reports get wrong: UK s104 pooling versus FIFO / specific-identification (the differentiator; HP 4)
3. Why software defaults matter: a plausible number set to the wrong method is still the wrong number
4. Same-day and 30-day matching: the rules a stateless report struggles to apply correctly (HP 5)
5. What the site's report review covers (confirm UK method settings, reconcile totals, check swaps and transfers, verify income-side receipts, produce a defensible position)
6. When your report is fine, and when it is not (honest triage; small clean portfolios versus active/multi-exchange/DeFi histories)
7. From report to filing or disclosure (route to SA / disclosure as needed)
8. Next step CTA (send us your export)

FAQ candidates (questions only):
- Is Koinly accurate for UK tax?
- What pooling method should my crypto tax report use in the UK?
- Why does FIFO or specific identification give the wrong UK answer? (answer: UK requires s104 pooling; HP 4)
- What are the same-day and 30-day rules and can software handle them? (HP 5)
- Do I still need an accountant if I have a Koinly report?
- My accountant asked me to get my report reconciled, what does that mean?
- Can you work from a Recap or CoinTracking export too?
- My report shows a huge gain from swaps I never cashed out, is that right? (answer: swaps are disposals; HP 6)
- What if my transfers between my own wallets look like disposals?
- Can you fix a report that was filed on the wrong method in a previous year? (route to disclosure)

Table/chart opportunities: a method-comparison table (s104 pooling [UK correct] versus FIFO / LIFO / specific-identification [software defaults, wrong for UK individuals]) showing how each treats allowable cost, mapped to HP 4; keep it conceptual, not a numeric worked example that implies a filing-ready output. A "matching order" strip (same-day, then next-30-days, then s104 pool) mapped to HP 5, flagged as out of scope of any stateless tool. No fee figures.

Calculator embed: /embed/crypto-cgt-estimator (mid-page, as the "see the s104 logic on a simple case" illustration; the site's #1 tool per CALCULATORS.md, which itself models simplified s104 and openly flags same-day/30-day as out of scope, reinforcing this page's thesis). Note: this page's job is the human review; the tool is the simplified illustration, not the deliverable.

Internal links (launch core): homepage, /for/investors and /for/day-traders (high-transaction audiences most exposed to method errors), /for/defi-and-staking (DeFi reconciliation complexity), services-crypto-self-assessment (report-to-filing), services-hmrc-disclosure (wrong-method prior years), blog same-day-30-day-rules-worked-example, calc-crypto-cgt-estimator (landing).

## House positions touched (docs/crypto/house_positions.md; every figure maps to a position + gov.uk URL)

- HP 4: section 104 pooling applies per token, at average cost; each cryptoasset has one pool holding the aggregate cost and the allowable cost on a disposal is the pool average; FIFO, LIFO and specific identification (US software defaults) are WRONG for UK individuals. This is the page's core hook. https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200
- HP 5: the same-day rule and the 30-day (bed-and-breakfast) rule override the pool; disposals match same-day acquisitions first, then acquisitions in the following 30 days, then the s104 pool; this ordering is the biggest DIY-calculation error and is out of scope of any stateless web calculator (state openly). https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22250
- HP 6 (support): crypto-to-crypto swaps are taxable disposals at sterling market value (why a "swaps I never cashed out" report can show a large real gain). https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets
- HP 3 (support): £3,000 annual exempt amount (context only; do not restate as a reconciliation figure). https://www.gov.uk/capital-gains-tax/allowances

Consistency rules: always name s104 pooling as the UK-correct method and FIFO/LIFO/spec-ID as the wrong defaults for UK individuals (HP 4); never soften this to "different methods give different answers" without stating which is correct for the UK. The same-day/30-day ordering (HP 5) is always flagged as beyond stateless tooling.

## Hallucination danger zones

- Do NOT imply any browser tool (ours or theirs) can produce a filing-ready UK figure for an active trader; the same-day/30-day matching (HP 5) is out of scope of stateless calculators, and the honest admission is the conversion mechanism (CALCULATORS.md, HP 5).
- Do NOT claim a specific software product is "wrong" or "inaccurate" as a blanket statement; the correct framing is that the wrong METHOD SETTING (FIFO/spec-ID) or unapplied same-day/30-day rules produce the wrong UK answer, and reputable software can be set to UK rules. Attack the setting and the defaults, not the vendor.
- Do NOT present the method-comparison table as a numeric worked tax result; keep it conceptual (how allowable cost is derived) to avoid implying a filing-ready output.
- Wallet-to-wallet transfers between the user's own wallets are not disposals; a report that treats them as disposals is a known error to catch, but do NOT overstate (external transfers and swaps ARE disposals). Describe transfer-versus-disposal carefully.
- Do NOT give investment advice or comment on which software to buy (regulated-advice boundary; a comparison TOOL is rejected in CALCULATORS.md, and this is a firm service page).
- No credential claims, no named expert (faceless authority). No fee or pricing figures. No em-dashes.

## Stage 2 TODO

- Live-URL verify: Koinly/Recap/CoinTracking "find an accountant" directory pages, one general firm's "software reconciliation" page, a "is Koinly accurate UK" forum/blog thread for the doubt framing.
- Confirm the crypto CGT estimator embed slug against the built config.
- Confirm the current CRYPTO22200 and CRYPTO22250 wording at build time (HP 4, HP 5) in case HMRC restructures the pooling manual pages.
- No HP gaps blocking this page; the two core positions (HP 4, HP 5) are locked and are the page's spine.
