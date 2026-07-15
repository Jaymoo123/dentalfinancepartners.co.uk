---
slug: val231-emi-valuation-form-walkthrough
tier: guide
route: /blog/share-schemes-and-emi/val231-emi-valuation-form-walkthrough
category: Share Schemes and EMI
intent: DO → HIRE. Founders trying to agree the EMI option valuation with HMRC who search the VAL231 form specifically. Procedural deepening of the existing emi-option-valuation post, focused on the SAV agreement process.
---
# Blog GUIDE (procedural): Agreeing your EMI valuation with HMRC, the VAL231 process explained

> Seed brief (wave-2, Stage 1). Brand is BRAND_TBD; copy references "the site" / "we" / "your company". No em-dashes. Company-side compliance; no investment advice, no pricing. PROCEDURAL. This DEEPENS the existing `emi-option-valuation` post on one thing: the mechanics of getting the valuation agreed with HMRC SAV. It must NOT duplicate that post's AMV/UMV explainer, link to it.

## CRITICAL constraint (HP14, read first)

The standalone VAL231 form URL 404s. Do NOT publish a VAL231 link. The post targets the VAL231 SEARCH DEMAND (people look for "VAL231") but the ANSWER is the current process: valuation is agreed with HMRC Shares and Assets Valuation (SAV), and the historic standalone VAL231 form link is dead, so this post explains how the agreement actually works today and cites the EMI + ERS manual pages. Re-verify at build whether a working VAL231 URL exists before ever adding one. This "the form people search for is dead, here is what to do instead" honesty IS the wedge that beats the platforms still linking the dead form.

## Target queries (evidence: topic_pool_final.json + LAUNCH_CORE; DataForSEO UK, fetched 2026-07-11)

- Primary: "val231" / "val 231 form" / "emi val231" (VAL231-specific demand; low volume, high intent, DEDUP UNIQUE)
- Secondary: "emi valuation" 90 / KD 0 · "emi market value" · "agree emi valuation with hmrc" · "hmrc shares and assets valuation emi" · "emi valuation hmrc form"

## Search-intent class + play

DO (procedural), high advisory-conversion. The searcher is mid-setup and hit the valuation step. They search VAL231 because that is the form name they were told. Play: meet the query, tell them the standalone form link is dead, and give the real SAV-agreement process so they can act (or hand it to us). This is the single most "I cannot self-serve this well" step in EMI setup, so conversion intent is high.

## Positioning + wedge

Deepens `emi-option-valuation` on the PROCESS only. That post owns AMV vs UMV and the compliance framing; this post owns the how-do-I-actually-get-it-agreed procedure and the dead-form honesty. Split cleanly: link to the sibling for AMV/UMV, do not re-teach it.

## Required structure

Each guide H2 opens with a citable 40-60 word BLUF where a rule is stated.

H2 skeleton:
1. BLUF: how the EMI valuation is agreed (an EMI option valuation should be agreed with HMRC Shares and Assets Valuation before or at grant; the historic standalone VAL231 form URL now 404s, so the current route is to agree the valuation with SAV directly; the agreement fixes the market value HMRC will accept; 40-60 words; HP14).
2. What VAL231 was and why the link is dead (honest section: VAL231 was the valuation-agreement form; the standalone URL now 404s; do NOT link it; the process moved to SAV agreement; HP14). This is the differentiator versus platforms still linking the dead form.
3. AMV vs UMV (2-3 sentences ONLY, then link OUT to the emi-option-valuation post for the full explainer; HP14).
4. The SAV agreement process, step by step (howToSteps below; what SAV agrees and that the agreement gives certainty for the grant; HP14).
5. What the agreed valuation fixes and for how long (the agreement sets the AMV used for the tax-advantaged exercise price; do NOT state a fixed validity period, no HP gives it; describe qualitatively, FLAG; HP14).
6. Valuation then notification (once agreed, grant and then notify by 6 July; hand off to the ERS annual-return walkthrough; HP13, HP14).
7. Getting the valuation agreed (route to EMI setup service).

howToSteps (procedural core):
1. Prepare the company valuation basis and the proposed option terms (HP14).
2. Approach HMRC Shares and Assets Valuation to agree the AMV/UMV before or at grant (HP14).
3. Obtain HMRC's agreement to the valuation (this is what the old VAL231 form used to request; do NOT link the dead form) (HP14).
4. Grant the options at the agreed exercise price.
5. Register the scheme and notify the grant by 6 July after the tax-year end (HP13) → link the ERS walkthrough.

Tables required:
- A VALUATION-TO-GRANT timeline table: step → what happens → source (agree with SAV, HP14 → grant → register + notify by 6 July, HP13).

## FAQ candidates (questions only)

- What is the VAL231 form? (answer: it was the EMI valuation-agreement form; the standalone URL now 404s; do NOT link it; agree the valuation with HMRC SAV, HP14)
- Do I have to agree my EMI valuation with HMRC? (HP14)
- How do I agree an EMI valuation with HMRC Shares and Assets Valuation? (howToSteps)
- How long is an agreed EMI valuation valid? (no HP gives a fixed period; qualitative, flagged)
- What is the difference between AMV and UMV? (short answer + link to emi-option-valuation, HP14)

## House positions touched

- HP14: EMI valuation agreed with HMRC SAV; VAL231 standalone URL 404s, do NOT link; cite EMI + ERS manual pages. https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis and https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return
- HP13: grant notification / ERS return by 6 July (the step after valuation). https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return

## Internal links

- Sibling (AMV/UMV depth, link do-not-duplicate): /blog/share-schemes-and-emi/emi-option-valuation
- Sibling: /blog/share-schemes-and-emi/emi-annual-return-ers-walkthrough
- Pillar: /blog/share-schemes-and-emi/what-is-an-emi-scheme
- Service: /services/emi-scheme-setup
- Hub: /for/funded-startups

## Hallucination danger zones

- CRITICAL (HP14): do NOT publish a VAL231 link. Re-verify at build; if still 404, keep citing EMI + ERS manuals only.
- Do NOT state a fixed valuation validity period (e.g. "90 days") from memory; no HP gives it; qualitative + flag.
- Do NOT re-teach AMV/UMV in full; that is the sibling post's job; summarise + link.
- Do NOT invent SAV form field names or screen-by-screen steps you cannot verify; keep steps at task level.
- No pricing.

## Stage 2 TODO

- BUILD-VERIFY: re-check for a live VAL231 URL; keep citing EMI + ERS manuals only if still 404 (HP14).
- Confirm whether an EMI valuation validity period can be sourced; do not invent otherwise.
- Confirm emi-option-valuation + ERS-walkthrough + pillar slugs live before hard-linking.
