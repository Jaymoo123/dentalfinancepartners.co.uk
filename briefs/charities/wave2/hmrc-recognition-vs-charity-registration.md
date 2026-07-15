---
slug: hmrc-recognition-vs-charity-registration
tier: blog
route: /blog/trustee-compliance/hmrc-recognition-vs-charity-registration
intent: DIY / BLUF. Founders and trustees confused about why they registered but still can't claim Gift Aid. Answer-box the two-step distinction, capture on Gift Aid setup.
---
# HMRC recognition vs Charity Commission registration: the two separate steps

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK, fetched 2026-07-11)

- Primary: recognition-vs-registration family ~640/mo combined ("hmrc charity recognition", "register charity with hmrc", "gift aid registration charity", "charity commission vs hmrc").
- Long tail (FAQ fodder, no measured vol): "do I need to register with HMRC as well as the Charity Commission", "how to get recognised as a charity for tax".

## Asset type + why

Blog. A sharp, single-question disambiguation post, not a pillar. Category: **Trustee Compliance**.

## Search-intent class + play

DIY / BLUF. The searcher has registered (or is about to) and does not understand why tax reliefs have not appeared. Play: the clearest explanation on the web that Commission registration and HMRC recognition are two separate applications, what each one gives you, and the order to do them. Capture edge into `/services/gift-aid` (we handle the HMRC recognition + Gift Aid registration for you).

## Dedup — page-level

- **vs wave-1 `/guides/set-up-a-charity-cio` and wave-2 register hub**: those mention HMRC recognition as one step among many; this post is the dedicated deep answer on the distinction (what recognition is, what the CHV1 application involves, what "recognised by HMRC" unlocks). No copy overlap; it is the link target both use for "why registering isn't enough".
- **vs wave-1 `/services/gift-aid`**: that is the hire-us money page; this is the informational upstream. Link down, not duplicate.
- **vs generalist**: `accountant-for-charities-uk` lists reliefs but never distinguishes the two regulators. No collision.

## Required structure (H2 skeleton)

1. The short answer (BLUF 40-60w): Commission registration makes you a registered charity on the public register; HMRC recognition makes you eligible for charity tax reliefs including Gift Aid. They are separate applications to separate bodies; you can be registered but not yet recognised.
2. What Charity Commission registration gives you (register entry, charity number, public accountability) — BLUF.
3. What HMRC recognition gives you (Gift Aid, GASDS, tax exemptions on charitable income, other reliefs) — BLUF.
4. Why one does not follow automatically from the other (the point founders miss).
5. How to apply for HMRC recognition (procedural — the online charities-and-tax service; what you need: registration details, bank details, governing document, officials' details). Mark procedural (`<ol>` steps) but keep figure-free.
6. Special cases: excepted and exempt charities, and CASCs (mention they exist, link out, do not enumerate rules).
7. What "recognised by HMRC" does NOT mean (it is not a second regulator; the Commission still regulates you).
8. Frequently asked questions.

- **Table**: two-column comparison — Charity Commission registration vs HMRC recognition (what it is · what it unlocks · who to · when). Strong answer-box asset.
- **Internal links (live)**: `/guides/register-a-charity-step-by-step` (wave-2 sibling), `/guides/gift-aid-complete-guide`, `/services/gift-aid`, `/blog/gift-aid/gasds-rules`, `/guides/set-up-a-charity-cio`.

## FAQ candidates

Do I need to register with HMRC as well as the Charity Commission? Can a charity claim Gift Aid without HMRC recognition? What is the difference between being a registered charity and being recognised by HMRC? Do small charities under £5,000 need HMRC recognition? What do I need to apply for HMRC recognition? Is HMRC recognition the same as being on the charity register? Can a charitable company get recognition without Commission registration?

## House positions touched (figures map)

- **HP 10** (recognition is separate from registration; "To benefit you must be recognised by HM Revenue and Customs"; registration alone does not deliver Gift Aid): https://www.gov.uk/charities-and-tax — core of §1-4.
- **HP 11** (no tax on most charitable income once recognised; return only when non-exempt income or HMRC notice): https://www.gov.uk/charities-and-tax — §3.
- **HP 1** (registration £5,000 gate; sub-£5,000 charities are not on the register but can still seek HMRC recognition — this is the key nuance for §6): https://www.gov.uk/guidance/how-to-register-your-charity-cc21b
- **HP 14** (Gift Aid 25p/£1 — reference only, the thing recognition unlocks): https://www.gov.uk/claim-gift-aid
- **HP 9** (excepted/exempt charities are not on the register — context for §6): https://www.gov.uk/find-charity-information

## HP GAPS (FLAG, do not invent)

- **CHV1 form name / current HMRC application mechanics**: not in the HP doc. Describe the online "charities and tax" application generically; do NOT assert the form number or field list from memory. Verify at https://www.gov.uk/charities-and-tax before naming CHV1.
- **Whether a sub-£5,000 unregistered charity can still get HMRC recognition**: HP 1 + HP 10 imply yes (recognition is not gated on Commission registration), but state it carefully and cite https://www.gov.uk/charities-and-tax; if the live page is silent, describe qualitatively.

## Hallucination danger zones

- Do not call HMRC "a second regulator" — it administers tax reliefs, the Commission regulates.
- Do not state application processing times or a form fee.
- CASCs are recognised by HMRC but are NOT registered charities — mention only as a signpost, do not conflate.

## Meta

- metaTitle (≤60): "HMRC Recognition vs Charity Registration Explained"
- metaDescription (≤155): "Charity Commission registration and HMRC recognition are two separate steps. Here is what each unlocks, why Gift Aid needs recognition, and how to apply."
