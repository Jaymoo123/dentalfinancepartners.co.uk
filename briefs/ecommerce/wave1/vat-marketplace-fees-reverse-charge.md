---
slug: vat-on-marketplace-fees
tier: vat-depth
route: /vat/vat-on-marketplace-fees
intent: SELLER-PROBLEM. Sellers working out whether they self-account for VAT on Amazon/eBay/Etsy fees, and sub-threshold sellers discovering that reverse-charge fee value can push them over £90,000. HIRE prospects for ecommerce-vat-compliance when the registration trigger bites.
---
# VAT on marketplace and platform fees: the reverse charge for sellers

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK loc 2826, joined 2026-07-12)

- Primary: no clean head; "amazon seller vat" 10/mo — demand is long-tail. UNIQUE depth page, citation- and capture-led.
- Long-tail intent to cover: "vat on amazon fees", "do i pay vat on ebay fees", "reverse charge amazon seller fees", "amazon uk billing vat 2024", "etsy fees vat uk", "reverse charge on advertising".
- Competitive/adjacency note: the generalist site's `reverse-charge-vat-construction` page is the CONSTRUCTION domestic reverse charge (CIS supply chain) — a completely different mechanism with NO overlap with this page. State this framing internally at build so the two are never confused; do not cross-link them.

## Search-intent class + play

SELLER-PROBLEM. Two hooks: (1) the mechanic — overseas-billed platform, ad and software fees are reverse-charge services the seller self-accounts for; (2) the surprise — that reverse-charge value counts toward the £90,000 registration threshold, the classic trigger that registers an otherwise sub-threshold seller. Play: explain the reverse charge in plain English, then the 2024 Amazon UK-billing switch as the concrete worked case, then the sub-threshold registration warning that drives the capture.

## Competitors to beat (COMPETITORS.md; live-URL check Stage 2)

- **SaaS content arms (A2X / Link My Books)**: cover fee reconciliation in software terms; do not own the reverse-charge tax position or the threshold-trigger consequence. Beat on the tax analysis.
- **Dedicated ecommerce firms**: a handful mention "reverse charge on Amazon fees" in a blog line; none joins it to the £90,000 threshold trigger with the 2024 Amazon billing change as a worked example. Beat on the joined analysis.
- **gov.uk Notice 741A**: authoritative on place-of-supply and reverse charge but generic and dense; not seller-framed. Beat on applied seller worked example.

## Required structure

H2 skeleton:
1. The short answer: yes, you self-account for VAT on overseas-billed platform fees (BLUF, cited, HP 6)
2. What the reverse charge is, in plain English (place of supply is the UK; you self-account) (HP 6)
3. Which fees this hits: marketplace commission, advertising/PPC, software subscriptions billed from abroad (HP 6)
4. The 2024 Amazon UK-billing switch: what changed and what it means for your fee VAT (FLAGGED — see danger zones; Amazon-doc-sourced, not gov.uk)
5. The sub-threshold trap: reverse-charge value counts toward the £90,000 threshold (HP 6, HP 1)
6. What it looks like on your VAT return (output and input VAT, net effect if fully recoverable)
7. This is NOT the construction reverse charge (disambiguation box)
8. When to get help (capture)
9. FAQ

FAQ candidates:
- Do I pay VAT on my Amazon seller fees?
- Are eBay and Etsy fees subject to the reverse charge?
- Is VAT charged on Amazon advertising?
- Did Amazon start charging VAT on UK sellers' fees in 2024?
- Can I reclaim the VAT I self-account for on platform fees?
- Do platform fees count toward the £90,000 VAT threshold?
- I am under the threshold — can overseas fees still force me to register? (Yes — HP 6)
- Is this the same as the construction reverse charge? (No — different mechanism entirely)

Table/chart opportunities:
- Fee-type table: marketplace commission / advertising / software subscription, columns for "typical billing location", "reverse charge applies?", "counts toward £90k threshold?" (per HP 6; do NOT invent per-platform billing-location facts beyond the Amazon 2024 change — mark others as "check your invoice").
- Reverse-charge on the return worked example: output VAT box vs input VAT box, net nil where fully recoverable.

Calculator embed: /calculators/vat-threshold-tracker (the threshold-trigger point — reverse-charge value must be included). Cross-link /calculators/seller-take-home for margin.

Internal links (launch core only):
- /for/amazon-sellers, /for/marketplace-sellers, /for/dropshippers (ad-spend VAT angle) — segment hubs
- /vat/deemed-supplier-establishment (companion; who accounts for VAT on the sale itself)
- /services/ecommerce-vat-compliance (primary capture — registration + reverse-charge handling)
- /calculators/vat-threshold-tracker
- /research/online-seller-index
- /blog/flat-rate-scheme-wrong-for-sellers (FRS forfeits input VAT — relevant to whether the reverse-charge input VAT is recoverable)
- /blog/vat-threshold-gross-vs-payout (threshold basis explainer)
Link OUT to generalist for generic £90k registration and MTD mechanics: hollowaydavies.co.uk. Do NOT cross-link the generalist construction reverse-charge page (different domain of tax).

## House positions touched

- **HP 6:** "Marketplace and software fees billed from abroad are reverse-charge services; the seller self-accounts for UK VAT and that reverse-charge value counts toward the £90,000 registration threshold. Where a UK business buys marketplace, advertising or software services from a supplier established abroad, the place of supply is the UK and the customer self-accounts for the VAT under the reverse charge (Notice 741A). Crucially, the value of reverse-charge services counts toward the £90,000 VAT registration threshold, which is the classic surprise registration trigger for an otherwise sub-threshold seller buying large volumes of overseas platform and ad services." — https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a (verified 2026-07-15)
- **HP 1** (threshold context): £90,000 rolling 12-month gross taxable turnover; the reverse-charge value is added to this test. — https://www.gov.uk/vat-registration (verified 2026-07-15). Do not re-explain the generic threshold mechanics — link OUT to generalist; the seller-specific point is that reverse-charge fee value is included.
- **HP 7** (context for recoverability, section 6/FAQ): "The Flat Rate Scheme is usually the wrong choice for goods sellers... FRS forfeits input VAT recovery on stock." — https://www.gov.uk/vat-flat-rate-scheme/how-much-you-pay (verified 2026-07-15). Use only to note that under FRS the reverse-charge input VAT is not separately recoverable; link to /blog/flat-rate-scheme-wrong-for-sellers, do not fully re-explain FRS.

## Hallucination danger zones

- **The 2024 Amazon UK-billing switch is FLAGGED (open flag 4 in house_positions.md).** The authority is Amazon seller documentation, NOT gov.uk. State the change carefully and generally (Amazon moved UK sellers' fee billing from its Luxembourg entity to a UK-billing entity, so UK VAT is now charged on those fees); cite Amazon's own seller documentation at build, NOT a gov.uk page. Do NOT invent the exact effective date, entity names, or fee-line detail beyond what Amazon's documentation states. If the writer cannot source a specific Amazon-doc citation, describe the direction of the change and flag for the conductor rather than asserting specifics.
- Do NOT state that eBay/Etsy/other platforms bill from a specific location — billing location varies and drives the reverse-charge answer. Tell the reader to check their own fee invoice for the supplier's establishment; do not assert per-platform facts not in a citation.
- Keep the reverse charge distinct from the construction domestic reverse charge (CIS). Section 7 exists specifically to prevent this confusion. Never merge the two.
- The reverse-charge value counting toward £90,000 is HP 6 — state it exactly; do NOT say fees are "VAT-free under the threshold".
- No em-dashes.

## Stage 2 TODO

- Source a specific Amazon seller-documentation citation for the 2024 UK-billing switch (open flag 4). If none is citable at the required standard, the section states the change in general terms with an "advice-needed" CTA and the specific date/entity claims are dropped. HP GAP: no gov.uk authority exists for the Amazon billing change — this section rests entirely on Amazon documentation and must be flagged as such.
- WebFetch Notice 741A; confirm the reverse charge and threshold-inclusion positions are live and unchanged.
- Live-URL check the 2-3 dedicated-firm "VAT on Amazon fees" pages to set the depth bar and confirm none has already joined the threshold-trigger point.
