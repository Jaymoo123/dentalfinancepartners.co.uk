# Wide opportunity scan — findings (2026-07-30)

Outside-the-box pass across 7 candidate clusters (95 keywords). Data: DataForSEO UK Google Ads volume + CPC, Labs keyword difficulty (KD), SERP + AI-Overview scan, all-estate GSC sweep (15 sites). Files: `wide_scan.csv`, `s8_estate_sweep.py`, `s9_serp.py`.

## Cluster league (volume + best term)
| cluster | sum vol/mo | headline term (vol / KD / CPC) |
|---|---|---|
| landlord commercial finance | 43,670 | bridging loan (18,100 / KD23 / £19) |
| business finance | 40,980 | business loans (27,100 / KD33 / £66) |
| exit / M&A / EOT | 11,610 | employee ownership trust (2,400 / KD26) |
| trade finance | 8,500 | van finance (6,600 / KD9) |
| specialist tax | 5,500 | capital allowances (2,900 / KD11) |
| law firm finance | 1,170 | litigation funding (880 / KD15) |
| multi-sector practice finance | 600 | buy a care home (320) |

## CPC = lead-value signal (highest-value terms)
invoice factoring £145 (KD2) · unsecured business loan £94 (KD0) · invoice finance £91 (KD13) · VAT loan £82 (KD0) · business loans £66 (KD33) · asset finance £47 (KD4). **Business finance has the highest lead value of anything found, at near-zero KD.**

## CRITICAL winnability check — every head term is AI-Overview-dominated
SERP scan: **ALL 14 top terms show an AI Overview** eating top-of-page clicks, and organic top-5 is held by banks / gov.uk / big aggregators / Big-4:
- Finance: NatWest, Barclays, Lloyds, Paragon, Shawbrook, Together, MoneySuperMarket, Funding Circle, Experian.
- Tax: **gov.uk leads capital allowances / R&D / land remediation / EOT**, then PwC, BDO, ForrestBrown, Saffery.

**→ The low KD is misleading for HEAD terms.** DataForSEO KD under-weights AIO + brand authority. Head terms are NOT winnable by a new/small site and are AIO-eaten anyway. Opportunity = long-tail + commercial-intent modifiers + calculators + regional (same lesson as the BTL cluster), NOT head terms.

## All-estate GSC sweep — cannibalisation + natural hosts
**Fully NET-NEW to the estate (no site ranks — greenfield, zero cannibalisation):**
commercial mortgage · invoice finance/factoring · business loan/unsecured · merchant cash advance · EOT/employee ownership · management buyout · van/plant finance.

**Already an estate strength (FOUND MONEY — re-route, don't rebuild):**
- **capital allowances** — propertytaxpartners **pos 1** (380 impr, 97 queries) + hollowaydavies, carehometax, tradetaxspecialists, agency.
- **R&D tax** — propertytaxpartners **pos 1** (835 impr, 45q), hollowaydavies **pos 1** (439 impr, 89q), foundertaxpartners (168 impr, 56q).
→ The estate ALREADY ranks #1 for the two highest-value specialist-tax services. Almost certainly monetised as general-accountant leads, not routed to specialist capital-allowances/R&D firms who pay far more. **Zero-build opportunity: re-route existing traffic to specialist-tax buyers.**

**Existing inter-site cannibalisation to NOT worsen:**
- spv/ltd-co BTL — property (pos 5) + hollowaydavies (pos 6) + agency already compete.
- R&D — property + generalist + founder already compete internally.

**Natural hosts:** capital allowances / R&D / bridging / development / commercial mortgage / BTL → property or generalist (existing authority). CIS rebate → tradetaxspecialists (pos 17, 85 impr). Dental finance → dentalfinancepartners (pos 7). Business finance / invoice / EOT / MBO → greenfield (new hub or generalist).

## Interim strategic read (pre reg/value confirmation)
1. **Specialist tax (capital allowances, R&D, land remediation) is the best fit** — the estate already ranks #1, it's fully unregulated (tax service, no s21/IAR), highest value per lead, and the immediate win is re-routing existing traffic to specialist buyers. (Fee-protection/tax-investigation INSURANCE slice = IDD-regulated, exclude.)
2. **Business finance (invoice/factoring/asset/unsecured, company borrowers) = highest lead value + greenfield + likely unregulated** (business lending not a s21 controlled activity) — but head terms AIO-eaten, so long-tail/sector/calculator plays only. (Awaiting reg confirmation.)
3. **Landlord commercial finance (bridging/development/commercial mortgage)** — biggest volume, property-audience, but s21 qualifying-credit trap = needs IAR like BTL (awaiting confirmation). Long-tail + calculators.
4. **EOT / exit** — fast-growing, greenfield, unregulated advisory, but Big-4/gov.uk own head terms; long-tail EOT wedge.
5. **Multi-sector practice finance** — uniformly thin (~600/mo); template-reuse bolt-on only, not a traffic play.
6. Dental / SPV-BTL (original mapped clusters) remain valid but are NOT the biggest prize.
