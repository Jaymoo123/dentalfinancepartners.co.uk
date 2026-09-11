---
slug: vat-retail-export-scheme
tier: blog
category: "VAT and Making Tax Digital"
route: /blog/vat-and-making-tax-digital/vat-retail-export-scheme
intent: DIY-INFORMATIONAL correction page. A retailer or an overseas visitor asking about tax-free shopping in the UK. The honest answer is that it no longer exists in Great Britain, and the page's job is to say that first rather than describe a dead scheme.
---
# Blog: VAT Retail Export Scheme, withdrawn in Great Britain and still running in Northern Ireland

> Wave-5 high-street mechanic asset. NON-PILLAR, 2,800-3,500 body words. Faceless. Raw-HTML body, no em-dashes, first prose block a plain sentence of 30+ characters.

## Target queries (REQUIRED PHRASINGS, NOT SUGGESTIONS)

This is binding. The phrasing must appear naturally in the page, in a heading, in body prose or in an FAQ question, in the words people typed. **It may not be split out into another page.**

- vat retail export scheme

Head query: "vat retail export scheme". Volume 90/mo. Mechanic: `stock-and-wip`. Not a pillar.

## Asset type + play

A correction page, and the structure has to reflect that. **The scheme was withdrawn in Great Britain with effect from 1 January 2021, along with the airside tax-free shopping concession (ESC 9.1). It survives only in Northern Ireland.** That must be the first thing on the page, in the H1 area and in the BLUF. It may not be buried under a description of how the scheme used to work, because a reader who skims a history section and stops reading leaves with a wrong belief and a retailer who acts on it gets a VAT assessment.

Order of operations: the withdrawal, then what a GB retailer must do instead (charge VAT normally; the separate export rules for goods the retailer itself ships overseas are a different regime), then the Northern Ireland position for the readers it still applies to.

## Dedup evidence

- **Own site, `retail-vat-schemes-uk.md`**: despite the name similarity this is a different subject entirely. That page is point of sale, apportionment and direct calculation, how a shop computes its output VAT. This page is a withdrawn visitor refund scheme. **State the distinction in one sentence on this page** (the names confuse people) and link across. That page is being extended this wave and will link back.
- **Own site, `vat-accountant-importing-goods-uk.md`**: the cross-border goods page. Adjacent, link once.
- **Own site, `accountant-for-retail-shops-uk.md`**: the trade page. Link once.
- No collision with anything else in the corpus.

## Required structure (H2 skeleton)

Open with a 40-60 word BLUF in plain prose, and lead with the withdrawal: the VAT Retail Export Scheme was withdrawn in Great Britain on 1 January 2021. A shop in England, Scotland or Wales cannot refund VAT to an overseas visitor under it, and the airside tax-free shopping concession went at the same time. The scheme continues in Northern Ireland.

1. The 40-60 word answer (BLUF), withdrawal first
2. What was withdrawn, and when: 1 January 2021, at the end of the transition period, together with ESC 9.1
3. What a Great Britain retailer does now: charge VAT in the normal way on a sale to a visitor. No refund route at the till
4. **Boundary table: where VAT can still be relieved against where it cannot** (rows below)
5. Northern Ireland: the scheme still operates, VAT-registered retailers may zero-rate goods sold to qualifying overseas visitors for personal export
6. The Northern Ireland operational point: VAT RES forms for NI sales made on or after 1 January 2021 are not stamped by Border Force in Great Britain and must be presented on leaving Northern Ireland or the EU
7. What this is not: it is not a retail scheme in the Notice 727 sense. Link `retail-vat-schemes-uk.md`
8. Worked examples (two, below)
9. What people get wrong
10. FAQ block, 10 to 14 FAQs
11. Links out

**Boundary table (MANDATORY). Two columns: "VAT still charged in full" against "VAT relief still available".** Minimum four trade-anchored row pairs:

| VAT charged in full, no visitor refund | VAT relief still available |
|---|---|
| A Bond Street jeweller selling a watch to a visitor from Singapore, carried home in their luggage | The same jeweller shipping that watch direct to the customer overseas, as an export on the ordinary export rules |
| An Edinburgh department store selling a coat to a tourist | A Belfast department store selling the same coat to a qualifying overseas visitor under the NI scheme |
| An airside shop at a GB airport, after ESC 9.1 was withdrawn | A duty-free sale governed by its own excise regime, which is not this scheme (see the fence below) |
| A Manchester electronics retailer selling a camera to a visiting student | A children's clothing retailer selling zero-rated garments, where no VAT arose in the first place |

Under the table, one sentence: the deciding question is **not who the customer is, it is whether the retailer or the customer takes the goods out of the country**, and in Great Britain a customer carrying goods home in their luggage no longer triggers any relief.

**Worked examples (two, named to a trade):**
- A gift shop sells a £600 VAT-inclusive item to a visitor from outside the UK. £100 of that is VAT and none of it is refundable. Show the arithmetic and then show what the same shop would have done before 2021, briefly, labelled as history.
- A Northern Ireland retailer sells the same £600 item to a qualifying overseas visitor and zero-rates it under the surviving NI scheme, subject to the scheme's conditions and the form being presented on leaving Northern Ireland or the EU. Same goods, same customer, different jurisdiction, different answer.

**What people get wrong:**
- Believing tax-free shopping still exists in Great Britain. It does not, and the belief is widespread because travel guidance and shop signage lag.
- Confusing the VAT Retail Export Scheme with the Notice 727 retail schemes. Different things, similar names.
- Assuming the Northern Ireland scheme can be operated from a Great Britain shop.
- Assuming airside purchases at a GB airport carry a VAT relief. ESC 9.1 went with the scheme.
- Confusing VAT relief with duty free. See the fence.

## Figures mapped to HP

Traces to `docs/generalist/STAGE_1B_HP_LOCK_DRAFTS_A.md` unless noted.

- **VAT RES withdrawn in Great Britain (England, Scotland, Wales) with effect from 1 January 2021, together with the airside tax-free shopping concession ESC 9.1; cite Revenue and Customs Brief 21 (2020)** - Anchor 6, LOCKED.
- **The scheme continues in Northern Ireland; VAT-registered retailers may zero-rate goods sold to qualifying overseas visitors for personal export, under Notice 704 and the Retail Export Scheme (Northern Ireland) guidance** - Anchor 6, LOCKED.
- **The Notice 727 retail schemes and their turnover limits**, only for the one-sentence "this is a different thing" distinction - Anchor 6 and HP 21.4. Do not re-teach them; link `retail-vat-schemes-uk.md`.
- **Zero-rating preserves input tax recovery; exemption does not** - Anchors 1 and 4c, if the page needs the contrast.
- **20% standard rate, £90,000 threshold** - HP 7.

**HP GAPS (do NOT invent, omit or link gov.uk):**
1. **The Northern Ireland operational detail (form stamping by Border Force) is UNCONFIRMED at paragraph level**, coming from a search snippet of Notice 704 rather than a direct fetch. State it once, plainly, and **link the gov.uk Retail Export Scheme (Northern Ireland) guidance. Do not cite a paragraph number and do not add further operational steps.**
2. **The NI scheme's eligibility conditions are NOT locked** (who counts as a qualifying overseas visitor, minimum spend, time limits, refund mechanics, handling fees). **Publish none of them.** Describe the scheme's existence and direct the reader to gov.uk.
3. **Excise fence, permanent, HP 21.9.7 and the shared rules.** Duty free is an excise matter and generalist pages do not author alcohol duty, duty stamps, Small Producer Relief or draught relief. **One neutral sentence that duty free is a separate excise regime, plus a gov.uk link, is the ceiling. No rate, no threshold, no allowance figure.**
4. **The ordinary export rules** (Schedule 8 Group 13, direct and indirect exports, evidence of export, time limits) are **not locked in batch A**. If the page mentions retailer-shipped exports, say only that goods the retailer exports itself follow the ordinary export rules, and link gov.uk. **Do not state an evidence requirement or a time limit.**
5. **No locked position on the Windsor Framework internal market movements or GB-to-NI VAT accounting.** See the contradiction note below before linking anything on that subject.

**Contradiction to resolve before this page is written.** The wave-5 cannibalisation check tells this page to link to `northern-ireland-retail-movement-scheme`. Batch A **Anchor 7 recommends DROPPING that page**, because NIRMS is a Defra sanitary and phytosanitary labelling scheme, not a tax matter. **Do not link to it unless the orchestrator confirms it is being built.** Default: link `vat-accountant-importing-goods-uk.md` instead.

## Internal links (all VERIFIED to exist in `generalist/web/content/blog/`)

**Out to live pages:** `retail-vat-schemes-uk.md` (the name-confusion distinction, bidirectional; that page is extended this wave), `vat-accountant-importing-goods-uk.md`, `accountant-for-retail-shops-uk.md`, `vat-threshold-2025-26.md`.
**Out to wave-5 siblings:** `zero-rated-vat.md` (the NI zero-rating mechanic).
**RESOLVED by the orchestrator 2026-09-11: DO NOT link to `northern-ireland-retail-movement-scheme`.** That pick was DROPPED at the Stage 1b gate on the owner's decision, because NIRMS is a Defra SPS and "Not for EU" labelling scheme, not a VAT matter. The page will not exist. Link instead to `vat-accountant-importing-goods-uk.md` (verified present in the corpus). Do not reinstate the NIRMS link under any circumstances.

## FAQ candidates (10 to 14, phrased as typed)

What is the VAT Retail Export Scheme? · Can tourists claim VAT back in the UK? · When was tax-free shopping withdrawn in the UK? · Can I still get a VAT refund at a UK airport? · Does the VAT Retail Export Scheme still apply in Northern Ireland? · Is the VAT Retail Export Scheme the same as a retail scheme? · Do I charge VAT to an overseas customer in my shop? · What if I ship the goods overseas myself? · Who qualifies as an overseas visitor in Northern Ireland? (point to gov.uk, HP GAP 2) · Where do I get a VAT RES form stamped for a Northern Ireland sale? · Is duty free the same as VAT free? (one neutral sentence, excise fence) · Did Brexit end tax-free shopping? · Can a Great Britain shop operate the Northern Ireland scheme? · What happened to ESC 9.1?

## Hallucination danger zones

- Never describe the scheme as operating in Great Britain, in any tense that could be read as current.
- Never bury the withdrawal below a history section.
- Never publish NI eligibility conditions, minimum spends or refund mechanics.
- Never state an excise duty free allowance or rate (permanent fence).
- Never state export evidence requirements or time limits.
- Never confuse this with the Notice 727 retail schemes.
- No fee figures.
