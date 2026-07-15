---
slug: services-selling-into-the-eu
tier: money
route: /services/selling-into-the-eu
intent: HIRE service page, service-led not traffic-led. IOSS/OSS setup + intermediary coordination for UK/NI sellers post-Brexit. Verdict UNIQUE (no estate overlap; generalist import pages are generic-importer, no IOSS/OSS/intermediary).
---
# Service page: selling into the EU (IOSS/OSS setup and intermediary coordination)

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site". CTA and brand copy flow from site config at write time. No em-dashes anywhere.

## Target queries (evidence: LAUNCH_CORE.md measured re-score, DFS UK loc 2826, fetched 2026-07-12)

- Primary: "eu ioss registration" CPC £49.79 (highest-value term in the /vat/ cross-border set). Low-volume, high-value.
- Cluster: IOSS/OSS family 26 terms summing 470/mo; head "ioss registration" 170 / KD 4 / CPC £14.45.
- LAUNCH_CORE ruling: "keep as service-led not traffic-led." This page converts a small, high-intent, high-value cohort (UK/NI sellers who need EU registration done properly), it is not a volume play. Say so in the copy strategy: depth and correctness over surface area.
- Deliberately NOT chased: generic import/customs/PVA head demand (generalist `vat-accountant-importing-goods-outside-uk` covers generic-importer PVA + customs; link out, see danger zones).

## Search-intent class + play

SELLER-PROBLEM class (LAUNCH_CORE class 2), cross-border cluster. The cross-border VAT agencies own prose on IOSS/OSS but, per LAUNCH_CORE, no UK accountancy firm owns it end-to-end as a service page, and per DEDUP_AUDIT no estate site touches it (the generalist import pages are generic-importer, no IOSS/OSS/intermediary). This is a UNIQUE service wedge.

The play is service-led: a UK (GB) or Northern Ireland seller shipping goods B2C into the EU after Brexit needs to know which scheme applies to them (and GB vs NI is the standing rival error), needs an EU-based intermediary appointed for IOSS, and needs the whole thing set up and coordinated. This page is the "get it done" service; /vat/ioss-vs-oss carries the comparison depth and this page routes to it.

Critical GB/NI discipline (HP 9, 10, 11): GB sellers do NOT distance-sell into the EU under OSS; OSS Union scheme applies to Northern Ireland distance sales. IOSS handles low-value consignments via one registration and a GB business must appoint an EU intermediary. Never mix GB and NI treatment.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **Cross-border VAT consultancies / IOSS intermediary providers**: own the prose and often sell the intermediary service. Beat by being the UK accountant who coordinates the whole picture (scheme choice, intermediary appointment, ongoing returns) end-to-end, in UK-accountancy framing, which they do not offer as an integrated service.
- **Generic import/PVA content (including our own generalist import pages)**: generic-importer scope, no IOSS/OSS. Beat by being the only seller-scoped, GB-vs-NI-correct IOSS/OSS service.

## Required structure

H2 skeleton:
1. Selling to EU customers after Brexit changed the VAT rules (why UK sellers hit a wall)
2. GB or Northern Ireland: which rules apply to you (the distinction rivals get wrong; per HP 9, 10, 11)
3. IOSS for low-value B2C consignments (single registration; GB businesses need an EU intermediary; per HP 9; link to /vat/ioss-vs-oss)
4. OSS Union scheme for Northern Ireland distance sales (NI only; GB does not distance-sell under OSS; per HP 10)
5. You need an EORI number (GB EORI for GB movements, XI EORI for NI; per HP 11)
6. How the setup and intermediary coordination service works + CTA

FAQ candidates (questions only):
- Do I need IOSS to sell into the EU?
- I am a GB seller, does OSS apply to me?
- Why do I need an EU intermediary for IOSS?
- I am a Northern Ireland seller, what is different for me?
- Do I need an EORI number, and which one?
- Does IOSS replace registering in each EU country?
- What is the value limit for IOSS?  (answer WITHOUT stating EUR 150 until cleared; see danger zones)
- What is the OSS threshold for NI distance sales?  (answer WITHOUT stating GBP 8,818 / EUR 10,000 until cleared; see danger zones)

Table/chart opportunities: GB-vs-NI treatment box (which scheme, which EORI, per HP 9/10/11), the single most useful visual given rivals blur it. IOSS-vs-OSS "what each is for" box (mechanism only, NO threshold figures until flags cleared).

Calculator embed: none is a good fit; this is a setup/coordination service, not a computation. Do not force one.

Internal links (launch core): /vat/ioss-vs-oss (the comparison depth page), /vat/135-import-rule (the UK-side low-value rule, contrast with EU IOSS), for-dropshippers, for-amazon-sellers (pan-EU), services-ecommerce-vat-compliance. Link OUT to hollowaydavies.co.uk / generalist import pages for generic importer PVA and customs mechanics (adjacency).

## House positions touched

- HP 9 (IOSS): "IOSS handles low-value consignments into the EU through a single registration; UK businesses generally need an EU-based intermediary." A business established outside the EU (including GB) must appoint an intermediary. https://www.gov.uk/guidance/check-if-you-can-register-for-the-vat-import-one-stop-shop-scheme
  - OPEN FLAG (HP 9 / open flag 1): the EUR 150 EU IOSS consignment ceiling is EU law and is NOT on the gov.uk IOSS page (which states the UK/NI GBP 135 figure). DO-NOT-STATE the EUR 150 figure until an EU official source is cited at build. Describe the ceiling qualitatively ("a low-value consignment limit set in EU law") only.
- HP 10 (OSS): "The OSS Union scheme applies to Northern Ireland to EU distance sales above the [threshold]; GB sellers do not distance-sell under OSS." https://www.gov.uk/guidance/register-to-report-and-pay-vat-on-distance-sales-of-goods-from-northern-ireland-to-the-eu
  - OPEN FLAG (HP 10 / open flag 2): the GBP 8,818 / EUR 10,000 threshold is NOT carried on the cited gov.uk OSS page. DO-NOT-STATE it until a second citation is added at build. Describe as "a distance-selling threshold" only.
- HP 11 (EORI): "An EORI number is required to import or export goods; GB EORI for GB movements, XI EORI for Northern Ireland movements." https://www.gov.uk/eori

Consistency rules: never mix GB and NI VAT treatment for cross-border goods (HP 9, 10, 11). GB sellers do not distance-sell under OSS (HP 10). GB businesses must appoint an EU intermediary for IOSS (HP 9).

## Hallucination danger zones

- EUR 150 IOSS ceiling: DO-NOT-STATE. Open flag 1 (HP 9). The gov.uk IOSS page carries the UK/NI GBP 135 figure, a DIFFERENT rule; do not import GBP 135 as the IOSS ceiling either. Qualitative description only until an EU-official citation is cleared at build.
- GBP 8,818 / EUR 10,000 OSS threshold: DO-NOT-STATE. Open flag 2 (HP 10). Qualitative description only until a second citation is added at build.
- GB vs NI: the standing rival error. Do NOT tell a GB seller they use OSS distance selling (HP 10). Keep the two lanes strictly separate.
- EU per-member-state establishment / fiscal-representative / EPR packaging requirements (open flag 5): EU-side sources, out of gov.uk scope. Do not assert DE/FR-specific rules from memory; cite EU official sources at build or omit.
- Do NOT re-explain generic UK import PVA / customs; adjacency, link out to the generalist import pages.
- No fee figures (ours or intermediaries').

## Stage 2 TODO

- HP FLAG (open flag 1): obtain an EU-official citation for the EUR 150 IOSS consignment ceiling before the page states any figure; until then the FAQ answers the value-limit question qualitatively.
- HP FLAG (open flag 2): add a second citation for the GBP 8,818 / EUR 10,000 OSS threshold before stating it; until then answer qualitatively.
- Open flag 5: decide whether to cover DE/FR establishment / fiscal rep / EPR at all; if yes, source EU-official citations at build.
- Live-URL verify 1-2 cross-border VAT consultancy IOSS/OSS pages as the depth bar; confirm no UK accountancy rival owns this end-to-end (validates the UNIQUE verdict).
- Confirm the generalist import-page out-link target for generic PVA/customs.
