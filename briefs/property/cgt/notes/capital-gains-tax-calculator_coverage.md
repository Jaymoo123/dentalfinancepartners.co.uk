# Coverage note: /calculators/capital-gains-tax-calculator (REFRAME, manager-direct)

Edited 2026-08-20 by the manager (registry copy REFRAME + compute-neutral shares mode).
Compute untouched: `computeCgt` in `src/lib/cgt.ts` unchanged, goldens unaffected.

## What changed
- New field `assetType` (select: residential / shares), FIRST field. Compute identical for
  both (18%/24% for all asset classes since 30 October 2024, house_positions section 5);
  only the result note switches (60-day property return vs Self Assessment).
- name, oneLiner, metaTitle (58 chars), metaDescription (135 chars), intro, explainer and
  FAQs rewritten against the pack's 5-cluster keyword set (REFRAME grade, no protected
  elements; prior copy had no Bing equity and 51 Google impressions at pos 9.7).

## Placed (verbatim or natural variant, in explainer/FAQ/intro)
capital gains tax calculator; uk capital gains tax calculator / capital gains tax
calculator uk / cgt calculator uk / capital gains calculator uk; cgt calculator; capital
gains calculator; capital gain tax calculator; capital gain tax estimator; calculation of
capital gains tax; how do you calculate capital gains tax (+ how-to-calculate family);
how much capital gains tax / how much is capital gains tax in the uk / capital gains tax
how much / how much capital gain; what is cgt; capital gains tax allowance / cgt allowance
/ capital gain tax allowance / uk capital gains tax allowance / capital gains tax allowance
2025/26; threshold for capital gains tax; what is the capital gain tax percentage (rate
percentage, in threshold FAQ); real estate tax capital gains (real-estate phrasing in the
calculate FAQ); capital gains tax on property / capital gains tax on shares (both modes);
hmrc cgt calculator / hmrc capital gains tax calculator (honest FAQ: we are not HMRC's
tool); shares calculator family (shares mode + shares FAQ).

## Declined, with reasons
- Word-order scrambles and concatenations of placed heads (e.g. "calculator capital gains
  tax uk", "uk cgt calculator capital gains"): the natural form is placed; forcing the
  scramble reads as machine copy.
- "capital gains tax calculator on property sold" style long concatenations: covered
  semantically by the placed property-calculator phrasings.
- Property-prose keywords in the head clusters (rates tables, reliefs depth): owned by the
  blog pages per the dossier assignment (complete guide, rates page); the tool links out
  rather than restating.
- News/budget phrasings: excluded-news in the ledger.

## Experiment framing (dossier section 4b)
This is a tool-visibility experiment, not a promised win: copy is an unproven lever on tool
SERPs (SDLT 4b). Expectation: impressions appear on calculator-family phrases within 28d on
Bing. Failure trigger: no Bing equity to protect; revert only if Google impressions fall
below half of the 51-impression baseline at 28d (noise floor, effectively revert-on-request).
The parallel SDLT calculator read (~2026-09-01) remains the arbiter for whether further tool
copy work is funded.
