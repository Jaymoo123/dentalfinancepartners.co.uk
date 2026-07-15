---
slug: business-donations-to-charity-tax
tier: blog
route: /blog/gift-aid/business-donations-to-charity-tax
intent: DIY-MIXED, business audience. Company owners/directors donating to charity want the tax treatment from THEIR side. Distinct from the individual donor-side angle. Included after page-level dedup vs generalist (clean).
---
# Business donations to charity: the tax treatment for the company

## DEDUP VERDICT (documented per manager instruction — INCLUDE, clean)

- **Query family**: "company donations to charity tax" / "business donation to charity tax relief" 110/mo + "can a limited company donate to charity" 110/mo (~220/mo combined).
- **Collision risk checked**: the DONOR-SIDE deductibility could collide with generalist. Verified:
  - Generalist `hollowaydavies.co.uk/blog/.../accountant-for-charities-uk` covers charity-SIDE reliefs (Gift Aid the charity claims, payroll giving, rate relief) and the INDIVIDUAL higher-rate donor reclaim (HP 19 territory). It does NOT cover a COMPANY donating to charity and deducting the gift from its own taxable profits.
  - Grep of `generalist/web/content/blog/*.md` for `company.*donat` / `business.*donat` / `donations.*deduct` returned only tangential mentions; no page owns the business-donor deduction angle.
  - Charities own 29: `charity-trading-subsidiary-gift-aid` covers a SUBSIDIARY donating UP to its parent (corporate Gift Aid, HP 13) — a related but distinct mechanic (connected-company profit-shedding, not a third-party business supporter). No page-level collision.
- **Verdict**: CLEAN. The business-donor angle (third-party company supporting a charity, deducting the donation from its own Corporation Tax) is unoccupied estate-wide and is safe per the business-audience rule (trustees' corporate supporters + owner-managed companies are the audience). INCLUDE.
- **Caveat**: this is the one wave-2 brief with a MATERIAL HP gap (see below). If the manager prefers to hold it until a house position is locked for company-donation relief, drop only this brief; the other 8 stand alone.

## Asset type + why

Blog. Category: **Gift Aid** (the reliefs cluster; company Gift Aid / corporate donations sit here). Business audience.

## Search-intent class + play

DIY-MIXED. Two searcher types: a company owner wanting to donate tax-efficiently, and a charity/fundraiser explaining the benefit to corporate supporters. Play: the clear explainer of how a company donating to a UK charity gets tax relief (the donation is deducted from the company's total profits before Corporation Tax, unlike individual Gift Aid), the rules and exclusions, and what documentation both sides need. Dual capture: corporate-donor advice edge and, for charities, a page to point supporters at.

## Required structure (H2 skeleton)

1. How company donations to charity are taxed (BLUF 40-60w): when a limited company donates money to a UK charity, the donation is deducted from the company's total profits before Corporation Tax, reducing its tax bill. This is different from individual Gift Aid: the company does not gross up and the charity does not reclaim tax on a company gift. FLAG: state the mechanism qualitatively until the relief detail is HP-verified.
2. Company donations vs individual Gift Aid (the key distinction: the company deducts; the individual's charity reclaims + higher-rate donors reclaim the difference) — table.
3. What counts and what does not (money donations; the treatment of donated equipment, stock, land, or sponsorship differs; benefits received in return can restrict relief) — describe categories, flag specifics.
4. What both sides need to document (the company's records; the charity's acknowledgement).
5. Sponsorship vs donation (sponsorship is usually a taxable supply with VAT implications, not a donation) — important disambiguation, link the VAT pillar.
6. Directors donating personally vs through the company (signpost to individual Gift Aid).
7. Frequently asked questions.

- **Internal links (live)**: `/guides/gift-aid-complete-guide`, `/services/gift-aid`, `/blog/gift-aid/charity-trading-subsidiary-gift-aid`, `/guides/charity-vat-guide` (for the sponsorship/VAT point), `/calculators/gift-aid-calculator`.

## FAQ candidates

Can a limited company claim tax relief on donations to charity? Is company Gift Aid the same as individual Gift Aid? Does the charity reclaim tax on a company donation? Can a company donate equipment or stock to charity? Is sponsorship a donation? Can a director donate through their company? Do we need a receipt from the charity?

## House positions touched (figures map)

- **HP 13** (corporate Gift Aid mechanics — the subsidiary-to-parent case; the company donates WITHOUT deducting tax, and there is no Corporation Tax on the payment — the nearest locked position to company donations): https://www.gov.uk/guidance/charities-and-trading — anchors the "company does not gross up" point in §1-2.
- **HP 14** (individual Gift Aid 25p/£1 — the contrast in §2): https://www.gov.uk/claim-gift-aid
- **HP 19** (individual donor-side higher-rate reclaim — contrast + the §6 signpost): https://www.gov.uk/donating-to-charity/gift-aid
- **HP 20** (VAT: sponsorship as a taxable supply; fundraising-event nuance — the §5 disambiguation): https://www.gov.uk/guidance/how-vat-affects-charities-notice-7011

## HP GAPS (MATERIAL — FLAG prominently, do not invent)

- **The core mechanic — a third-party company deducting a charitable donation from its total profits before Corporation Tax — is NOT locked as a numbered house position.** HP 13 covers the connected-subsidiary case only. The writer must:
  - State the relief qualitatively ("deducted from the company's profits for Corporation Tax") WITHOUT inventing figures, caps, or the exact CTA 2010 mechanism, and
  - Name the verification URL for the manager/writer to confirm before publish: https://www.gov.uk/tax-limited-company-gives-to-charity (the gov.uk "tax when your limited company gives to charity" page is the canonical source; it must be fetched and a house position locked before any specific rule about qualifying donations, benefit restrictions, or the "donations cannot create/increase a loss" rule is asserted).
- **Donated goods/equipment/land treatment + benefit-in-return limits for company donors**: not in HP. Describe as "different rules apply, seek advice / see gov.uk"; do NOT assert specifics until the gov.uk company-donations page is locked into HP.
- Do NOT state that the company grosses up or that the charity reclaims tax on a company gift (it does not — HP 13 framing) but verify the full mechanism before detailing.

## Hallucination danger zones

- Do not describe company donations as "Gift Aid" in the individual sense (companies do not use the individual Gift Aid gross-up; the charity does not reclaim on a company gift).
- Do not state any cap, percentage, or CTA 2010 section from memory — all such specifics are gated on locking the gov.uk company-donations page into HP.
- Sponsorship is generally a taxable supply (HP 20), not a donation — do not conflate.
- Business audience, faceless, no pricing, no em-dashes.

## Meta

- metaTitle (≤60): "Business Donations to Charity: Company Tax Relief"
- metaDescription (≤155): "How a limited company gets tax relief on charity donations, why it differs from individual Gift Aid, and how donations, gifts of goods and sponsorship are treated."
