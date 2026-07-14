---
slug: share-vs-asset-purchase-pharmacy
tier: blog
route: /blog/buying-and-selling/share-vs-asset-purchase-pharmacy
category: buying-and-selling
intent: EVENT-PROBLEM (assist + capture). The first structuring decision on a pharmacy purchase. A buyer (or their adviser) wants a clean comparison of share vs asset purchase for a pharmacy specifically: stamp duty/SDLT difference, inheriting history on a share deal, and the goodwill CT-relief restriction on a company purchase. A worked comparison. Funnels to /for/buying-a-pharmacy and the purchase accounting service.
---
# Share Purchase vs Asset Purchase for a Pharmacy

## Target queries (evidence: LAUNCH_CORE.md, TOPICS.md, DataForSEO UK measured 2026-07-11)

- **Primary intent cluster:** "share purchase vs asset purchase pharmacy", "buying a pharmacy share deal", "asset purchase pharmacy" (autocomplete-real, within the buying cluster whose head "buying a pharmacy" is 140/mo KD 59).
- Adjacent: general "share vs asset purchase" intent that this pharmacy-specific post captures with pharmacy specificity (NHS contract, GPhC, goodwill dominance).

## Search-intent class + play

EVENT-PROBLEM, structuring deep-dive. The searcher has hit the first fork in a deal and wants a specialist comparison, not a generic company-law explainer. Play: BLUF box naming the trade-off in one line (share = 0.5% stamp duty on shares but you inherit the whole company history and its risks; asset = SDLT up to 5% on any property but a cleaner slate), then a side-by-side worked comparison, then the two pharmacy-specific twists (NHS contract continuity on a share deal, goodwill CT-relief restriction on a company purchase), then capture. The pharmacy-specific worked comparison is the win.

**Cannibalisation split (locked at seed):** this blog owns the share-vs-asset structuring comparison. The buying-a-pharmacy-checklist blog (sibling) owns the end-to-end process and links here. The goodwill blog (sibling) owns valuation method. /for/buying-a-pharmacy owns hire intent. Keep the general due-diligence and finance content in the sibling posts.

## Competitors to beat (COMPETITORS.md; domains only at seed, live-URL check is Stage 2)

- **Generalist "share vs asset purchase" posts:** competent on the general tax mechanics but with no pharmacy specificity (NHS contract continuity, goodwill dominance, GPhC re-registration on an asset deal). Beat on pharmacy specificity.
- **Pharmacy brokers:** rarely go into structuring tax at all. Beat on the accounting/tax depth.
- **gov.uk (SDLT non-res, stamp duty on shares, goodwill relief):** authoritative but fragmented. Beat by assembling the comparison and applying it to a pharmacy.

## Required structure (bodies are RAW HTML: loader does NO markdown conversion; write <h2>/<p>/<ul>/<table>, not markdown syntax)

H2 skeleton:
1. The short answer: the trade-off in one line (BLUF box, cited HP 12)
2. What a share purchase is (you buy the company, and its history comes with it) (HP 12)
3. What an asset purchase is (you buy the trade and assets, cleaner slate) (HP 12)
4. The tax on entry: 0.5% stamp duty on shares vs SDLT up to 5% on property (HP 12)
5. The pharmacy twist 1: NHS contract and GPhC continuity differs by structure (HP 10, HP 11)
6. The pharmacy twist 2: goodwill and the CT-relief restriction on a company purchase (HP 13)
7. Worked comparison: the same illustrative deal done both ways (table, the centrepiece)
8. Which is usually right and why it is case-by-case (capture)

FAQ candidates (no answers at seed):
- Is buying a pharmacy usually a share deal or an asset deal?
- What stamp duty do I pay on a pharmacy share purchase?
- Do I pay SDLT when buying pharmacy premises?
- What do I inherit in a share purchase?
- Can I claim tax relief on goodwill when I buy a pharmacy company?
- Does the NHS contract transfer on a share deal?

Table/chart opportunities:
- The centrepiece worked comparison table: row per dimension (entry tax, history/liabilities inherited, NHS contract continuity, GPhC re-registration, goodwill CT relief, warranties/indemnities), column per structure (share / asset), with an illustrative deal quantified for the entry-tax row only (labelled illustrative).
- A short "at a glance" summary box.

Calculator/tool embed: none required as the centrepiece; optionally link the purchase affordability calculator once (structure affects what is financed), with the standard scenario/estimate note. Do not imply the tool models the tax on entry.

Internal links (launch core): /for/buying-a-pharmacy (hub, capture), /services/pharmacy-purchase-accounting (service, capture), the buying-a-pharmacy-uk-checklist blog (sibling), the pharmacy-goodwill blog (sibling), the first-time-pharmacy-buyer-finance blog (sibling).

## House positions touched (docs/pharmacies/house_positions.md, ONLY figures source)

- **HP 12 (share vs asset, the first structuring decision):** asset deals attract SDLT on any property at non-residential/mixed-use rates up to 5%; share deals attract 0.5% stamp duty on shares but inherit the company's history. The load-bearing figures of this post. Citations: https://www.gov.uk/stamp-duty-land-tax/nonresidential-and-mixed-use-rates and https://www.gov.uk/tax-buy-shares
- **HP 13 (goodwill dominates; CT relief restricted on company purchase):** on a company purchase CT relief on goodwill is restricted and only available in limited cases at fixed rates; relevant to the asset-vs-share after-tax picture. Citation: https://www.gov.uk/guidance/corporation-tax-relief-on-goodwill-and-relevant-assets
- **HP 10 (regulated market entry; contract is the asset):** NHS contract continuity differs by structure; the 2013 Regulations govern entry. Citation: https://www.legislation.gov.uk/uksi/2013/349/contents
- **HP 11 (GPhC registration + superintendent):** an asset/change-of-owner path has its own registration steps; ownership/registration mechanics only. Citation: https://www.pharmacyregulation.org/pharmacies

## Hallucination danger zones (enforce)

- Two different taxes: 0.5% stamp duty on SHARES vs SDLT (up to 5%) on PROPERTY in an asset deal (HP 12). Do not merge them, do not apply residential SDLT rates, do not apply SDLT to a share deal. A pharmacy is non-residential/mixed-use for the SDLT rate split.
- Goodwill CT relief on a company purchase is RESTRICTED and only in limited cases at fixed rates (HP 13). Do NOT present it as full/automatic amortisation relief, and do not present it as available at all on a straightforward share purchase in the buyer's hands.
- "Inheriting history" on a share deal means the company's tax history, liabilities and contingent risks come with it (hence warranties/indemnities and deeper due diligence); frame accurately, do not overclaim that a share deal is always riskier or always cheaper.
- NHS contract continuity and GPhC steps differ by structure (HP 10, HP 11); describe at mechanics level, never clinical (positioning wall).
- The worked-comparison numbers are ILLUSTRATIVE, labelled as such, internally arithmetic-consistent; only the entry-tax row should carry figures unless a house position supports more.
- No credential claims, no named individuals. No em-dashes.
- Body is raw HTML (loader does no markdown conversion): write tags directly.

## Stage 2 TODO

- Re-verify the SDLT non-residential rate ceiling (up to 5%) and the 0.5% stamp-duty-on-shares figure at the two gov.uk pages before restating (HP 12).
- Re-read the goodwill relief guidance to phrase the restriction correctly (limited cases, fixed rates) (HP 13).
- Sanity-check the illustrative worked-comparison arithmetic on the entry-tax row.

## FLAGGED open items

- No figure gaps: all quantified figures map to HP 12/13. Any illustrative deal value is example-only. Flag if a build-time source is captured that would license quantifying more than the entry-tax row.
