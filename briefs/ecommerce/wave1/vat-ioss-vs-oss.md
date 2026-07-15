---
slug: ioss-vs-oss
tier: vat-depth
route: /vat/ioss-vs-oss
intent: SELLER-PROBLEM / low-volume high-value. UK and NI sellers selling into the EU working out which scheme (if any) applies to them. Service-led not traffic-led (LAUNCH_CORE: "eu ioss registration" CPC £49.79). HIRE prospects for selling-into-the-eu.
---
# IOSS vs OSS for UK and NI sellers

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK loc 2826, joined 2026-07-12)

- Primary: "ioss registration" 170/mo, KD 4, CPC £14.45. IOSS/OSS family is small (26 terms summing 470/mo) but high-value ("eu ioss registration" CPC £49.79). Low-volume/high-value — keep service-led, not traffic-led (LAUNCH_CORE).
- Long-tail intent to cover: "ioss vs oss", "do i need ioss uk", "oss scheme northern ireland", "ioss intermediary uk", "selling to eu after brexit vat".
- Competitive note: no estate site covers IOSS/OSS (DEDUP_AUDIT: UNIQUE). The cross-border VAT agencies own prose but no UK accountancy firm owns it end to end as a service page (LAUNCH_CORE money-page note).

## Search-intent class + play

SELLER-PROBLEM (assist + high-value capture). The page separates two schemes rival content routinely conflates: IOSS (low-value imports INTO the EU, single registration, GB businesses need an EU intermediary) and OSS (NI-to-EU distance sales; GB sellers do NOT distance-sell under OSS). Play: the GB-vs-NI split done correctly (the standing error in rival content), then which scheme applies to whom, then the intermediary requirement, then capture toward the selling-into-the-eu service.

## Competitors to beat (COMPETITORS.md; live-URL check Stage 2)

- **Cross-border VAT agencies** (IOSS intermediaries, pan-EU compliance firms): own the prose and the depth; excluded from the accountancy rival set but set the bar. Beat on plain-English GB-vs-NI clarity and end-to-end service framing.
- **Dedicated ecommerce firms**: most have a thin "selling to the EU" paragraph that mixes GB and NI treatment. Beat on getting the split right.
- **gov.uk IOSS and OSS guidance**: authoritative but fragmentary and (critically) does NOT carry the €150 IOSS ceiling or the £8,818/€10,000 OSS threshold — see danger zones. Beat on a single consolidated, correctly-cited page.

## Required structure

H2 skeleton:
1. The short answer: IOSS is for low-value imports into the EU; OSS is for NI-to-EU distance sales; GB sellers do not distance-sell under OSS (BLUF, cited, HP 9 + HP 10)
2. IOSS in plain English: single registration for low-value B2C consignments into the EU (HP 9)
3. Why GB businesses need an EU-based intermediary for IOSS (HP 9)
4. OSS and Northern Ireland: NI's dual status and the Union scheme (HP 10)
5. The GB-vs-NI split done correctly (the error to avoid) (HP 10 consistency rule)
6. EORI: GB EORI for GB movements, XI EORI for NI movements (HP 11)
7. Which scheme (if any) applies to you: a decision guide
8. When to get help (capture — high-value, intermediary coordination)
9. FAQ

FAQ candidates:
- What is the difference between IOSS and OSS?
- Do I need IOSS as a UK seller?
- Do I need an intermediary for IOSS? (Yes for GB/non-EU businesses, HP 9)
- Can a Great Britain seller use OSS? (No — GB sellers do not distance-sell under OSS, HP 10)
- Does OSS apply to Northern Ireland sellers? (Yes, NI-to-EU distance sales, HP 10)
- Do I need a GB or XI EORI number? (HP 11)
- Is IOSS mandatory? (No — it is a simplification; describe the alternative generally, do not invent the consequence figures)

Table/chart opportunities:
- IOSS vs OSS comparison table: columns "what it covers", "who registers", "GB seller", "NI seller", "intermediary needed?" — per HP 9/10/11 ONLY. Leave the consignment-ceiling and distance-selling-threshold cells with a "see note (figure pending EU-side citation)" placeholder — DO NOT populate €150 or £8,818/€10,000 (FLAGGED).
- EORI table: GB movements → GB EORI; NI movements → XI EORI (HP 11).

Calculator embed: none. Cross-link /calculators/seller-take-home for EU-margin impact only.

Internal links (launch core only):
- /for/marketplace-sellers, /for/shopify-sellers, /for/dropshippers (segment hubs)
- /vat/135-import-rule (the UK-side low-value rule — distinct figure and regime)
- /vat/deemed-supplier-establishment (establishment context)
- /services/selling-into-the-eu (PRIMARY capture — IOSS/OSS setup + intermediary coordination)
- /services/ecommerce-vat-compliance
- /research/online-seller-index
- /blog/platform-reporting-rules
Link OUT to generalist for generic VAT registration/MTD mechanics: hollowaydavies.co.uk.

## House positions touched

- **HP 9:** "IOSS handles low-value consignments into the EU through a single registration; UK businesses generally need an EU-based intermediary. The Import One Stop Shop (IOSS) lets a business account for the import VAT on low-value B2C consignments into the EU through one registration rather than registering in each member state. A business established outside the EU (including in Great Britain) must appoint an intermediary to register and act on its behalf." **FLAGGED: the EU IOSS consignment ceiling is €150, which is EU law and not stated on gov.uk. Any page stating the €150 EU ceiling must cite an EU official source at build time, not the gov.uk IOSS page.** — https://www.gov.uk/guidance/check-if-you-can-register-for-the-vat-import-one-stop-shop-scheme (verified 2026-07-15)
- **HP 10:** "The OSS Union scheme applies to Northern Ireland to EU distance sales above the £8,818 (€10,000) threshold; GB sellers do not distance-sell under OSS. Northern Ireland's dual status means NI-to-EU distance sales of goods can be reported through the OSS Union scheme once they exceed the distance-selling threshold. Great Britain sellers do not distance-sell into the EU under OSS at all; mixing up GB and NI treatment is a standing error in rival content." **FLAGGED: the cited gov.uk OSS registration page confirms the NI-to-EU OSS mechanism but does NOT carry the £8,818/€10,000 threshold figure. Any page asserting the £8,818/€10,000 threshold must add a second citation for it at build time.** — https://www.gov.uk/guidance/register-to-report-and-pay-vat-on-distance-sales-of-goods-from-northern-ireland-to-the-eu (verified 2026-07-15)
- **HP 11:** "An EORI number is required to import or export goods; GB EORI for GB movements, XI EORI for Northern Ireland movements." — https://www.gov.uk/eori (verified 2026-07-15)

## Hallucination danger zones

- **DO NOT STATE €150** (the IOSS consignment ceiling). FLAGGED (open flag 1). The €150 figure is EU law and is NOT on the cited gov.uk IOSS page. Until an EU official-source citation is cleared, the page describes IOSS as applying to "low-value" consignments and explicitly does not state the numeric ceiling. Flag prominently in the draft where the figure would go. This is DO-NOT-STATE.
- **DO NOT STATE £8,818 or €10,000** (the OSS distance-selling threshold). FLAGGED (open flag 2). The cited gov.uk OSS page does not carry the figure. Until a second citation is added, describe OSS as applying "above the distance-selling threshold" without stating the number. Flag prominently. This is DO-NOT-STATE.
- NEVER mix GB and NI VAT treatment for cross-border goods (HP 9/10/11 consistency rule). GB sellers do not distance-sell under OSS; OSS is an NI mechanism. This is the exact error the page exists to correct — do not commit it.
- Do NOT conflate the EU IOSS low-value regime with the UK £135 rule (that is /vat/135-import-rule). Different figures, different direction of trade.
- Do NOT assert what happens if a GB seller does not use IOSS (per-member-state registration, import VAT collected from the customer) beyond what a citation supports — describe the alternative in general terms and flag if specifics are needed.
- No em-dashes.

## Stage 2 TODO

- **Clear or hold the two DO-NOT-STATE flags before any figure is written.** (1) €150 IOSS ceiling needs an EU official-source citation. (2) £8,818/€10,000 OSS threshold needs a second citation. If neither is cleared at build, the page ships figure-free with the placeholders described above and the conductor is notified. HP GAP raised: both figures are FLAGGED in house_positions.md open flags 1 and 2; this page cannot state them until cleared.
- WebFetch the gov.uk IOSS and OSS guidance pages; confirm the mechanism (single registration, intermediary requirement, NI-to-EU scope) is live and unchanged.
- Source EU-side citations (EU Commission VAT-ecommerce pages) for the €150 and the €10,000 figures if the conductor decides to clear the flags.
- Live-URL check a cross-border VAT agency IOSS/OSS page to set the depth bar without importing their (often GB/NI-muddled) framing.
