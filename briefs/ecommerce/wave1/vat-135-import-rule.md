---
slug: 135-import-rule
tier: vat-depth
route: /vat/135-import-rule
intent: SELLER-PROBLEM. Dropshippers and direct-import sellers working out whether they owe supply VAT at point of sale (not import VAT at the border) on low-value consignments. HIRE prospects for ecommerce-vat-compliance and selling-into-the-eu.
---
# The £135 import rule for UK sellers and dropshippers

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK loc 2826, joined 2026-07-12)

- Primary: UNIQUE depth page. Note LAUNCH_CORE: 0 "dropship*" rows returned across all 5 measured pulls — this page is kept on pool/autocomplete evidence (the VAT-£135 pain family), not measured volume. Citation- and capture-led, service-wedge for the dropshipping hub.
- Long-tail intent to cover: "£135 vat rule", "135 pound import vat", "vat on goods under 135", "dropshipping vat uk", "supplier direct import vat uk", "do i charge vat dropshipping from china".
- Competitive note: no estate site covers the £135 rule (DEDUP_AUDIT: UNIQUE, none). Rival coverage is shallow relative to complexity — the depth-cluster thesis.

## Search-intent class + play

SELLER-PROBLEM. The rule catches dropshippers shipping low-value goods direct from overseas: for consignments of £135 or less sold direct to UK consumers, supply VAT is due at the point of sale, not import VAT at the border, and the seller must register for UK VAT. Play: state the rule cleanly, then the two forks that decide the answer (consignment value above/below £135; sold direct vs through a marketplace), then the dropshipping worked scenario, then capture.

## Competitors to beat (COMPETITORS.md; live-URL check Stage 2)

- **Dropshipping "gurus" / course content**: dominate the informational SERP with vague or wrong VAT claims. Beat on correctness and a cited HMRC-anchored answer.
- **SaaS content arms**: cover import VAT mechanics generically; do not own the £135-direct-sale vs marketplace fork for dropshippers. Beat on the applied fork.
- **gov.uk overseas-goods-direct-to-customers guidance**: authoritative but generic; not dropshipping-framed. Beat on the seller/dropshipper worked example and the interaction with the deemed-supplier rule.

## Required structure

H2 skeleton:
1. The short answer: on £135-or-less consignments sold direct to UK consumers, supply VAT is due at point of sale, not import VAT at the border (BLUF, cited, HP 3)
2. What counts as a "consignment" and how the £135 value is measured (HP 3 — value of goods; describe the concept, do not invent inclusion/exclusion rules not in the source)
3. Direct sale vs marketplace sale: who accounts for the VAT (HP 3 + HP 2 — if through a marketplace the marketplace accounts for it)
4. Above £135: normal import VAT at the border applies, and postponed VAT accounting may help (HP 3, HP 4 — cross-link /vat/postponed-vat-margin-scheme)
5. What this means for dropshippers shipping direct from overseas (worked scenario) (HP 3)
6. Registration: direct low-value sellers must register for UK VAT (HP 3; no overseas-seller threshold, HP 2)
7. When to get help (capture)
8. FAQ

FAQ candidates:
- What is the £135 import rule?
- Do I charge VAT on goods under £135 sold to UK customers?
- Is the £135 the price the customer pays or the value of the goods?
- Does the £135 rule apply if I sell through Amazon or eBay? (No — the marketplace accounts for it, HP 2)
- I dropship from China direct to UK customers — do I need to register for UK VAT? (Yes if direct low-value, HP 3)
- What happens above £135?
- Is the £135 rule the same as the EU's low-value threshold? (No — different figure and regime; the EU IOSS side is FLAGGED, see /vat/ioss-vs-oss)

Table/chart opportunities:
- Decision matrix: (consignment £135 or less / over £135) x (sold direct / through a marketplace) → who accounts for VAT and at what point (point of sale vs border).
- Dropshipping flow: supplier abroad → UK consumer, showing where the VAT arises under each fork.

Calculator embed: none for the £135 rule. Cross-link /calculators/vat-threshold-tracker for the wider registration picture.

Internal links (launch core only):
- /for/dropshippers (primary segment hub this page serves), /for/marketplace-sellers
- /vat/deemed-supplier-establishment (the marketplace fork in section 3)
- /vat/postponed-vat-margin-scheme (the above-£135 import-VAT route in section 4)
- /vat/ioss-vs-oss (the EU-side low-value regime — distinct figure, FLAGGED)
- /services/ecommerce-vat-compliance (primary capture), /services/selling-into-the-eu
- /calculators/vat-threshold-tracker
- /research/online-seller-index
- /blog/platform-reporting-rules
Link OUT to generalist for generic import PVA/customs mechanics and generic £90k registration: hollowaydavies.co.uk vat-accountant-importing-goods-outside-uk (generic-importer scope) and the registration head.

## House positions touched

- **HP 3:** "Imports of £135 or less sold directly to UK consumers: supply VAT is due at the point of sale, not import VAT at the border. For consignments of goods with a value of £135 or less that are outside the UK and sold directly to UK customers (not through an online marketplace), the seller must register for UK VAT and charge and account for supply VAT at the point of sale, rather than import VAT arising at the border. This is the rule that catches dropshippers shipping low-value goods direct from overseas. Where the same sale goes through an online marketplace, the marketplace accounts for the VAT instead (see position 2)." — https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk (verified 2026-07-15)
- **HP 2** (marketplace fork, section 3): marketplace is deemed supplier for these sales when sold through one. — https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces (verified 2026-07-15)
- **HP 4** (above £135, section 4): "Postponed import VAT accounting lets VAT-registered importers declare and recover import VAT on the same return." — https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return (verified 2026-07-15). Cover briefly; full mechanics on /vat/postponed-vat-margin-scheme.
- **HP 1** (registration context): £90,000 threshold for UK-established sellers, but note overseas direct low-value sellers register regardless (HP 3). — https://www.gov.uk/vat-registration

## Hallucination danger zones

- The £135 rule is DIRECT-TO-CONSUMER ONLY (HP 3 consistency rule). If the sale goes through a marketplace, the marketplace accounts for the VAT (HP 2). Never state the seller accounts for VAT on £135-or-less consignments sold via a marketplace.
- £135 is the value of the CONSIGNMENT (goods value). Describe how the threshold is measured only as far as the cited gov.uk guidance goes; do NOT invent rules on whether shipping/insurance are included or how multi-item consignments aggregate unless the source states them — flag as an HP gap if the writer needs them.
- Do NOT conflate the UK £135 figure with the EU €150 IOSS ceiling. They are different figures and different regimes. The €150 figure is FLAGGED — do NOT state it here (it belongs on /vat/ioss-vs-oss and even there is DO-NOT-STATE until an EU-side citation is cleared).
- Point of sale vs border: for £135-or-less direct sales it is supply VAT at point of sale, NOT import VAT at the border. Do not describe border import VAT for these consignments.
- No em-dashes.

## Stage 2 TODO

- WebFetch the gov.uk overseas-goods-direct-to-customers guidance; confirm the £135 figure, the point-of-sale supply VAT position, and the direct-only scope are live and unchanged.
- HP GAP: HP 3 fixes the £135 figure and the point-of-sale rule but does NOT state how consignment value is measured (shipping/insurance inclusion, multi-item aggregation). If the page needs this detail, source it from the gov.uk guidance at build or flag for an HP extension; do not invent.
- Live-URL check top dropshipping-VAT results to set the correctness bar (the SERP is full of wrong claims — the differentiator is being right and cited).
