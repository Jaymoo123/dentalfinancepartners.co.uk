# Adjacent buyer niches for lead outreach (2026-08-12)

Brief for the outreach list-builder. The estate's enquiries are accounting-first, but the same enquiry is legally and commercially sellable to non-competing professions on the adjacent lane (£35/lead, `config/tiers.json`; same lead can be sold here in addition to the accounting slots, and cascaded leads land here after 48h). Terms and consent already cover category-based sharing to "a firm from our specialist partner network".

## What the leads actually are (match buyers to this, not to wishful thinking)

Live and building flow: property tax / landlord (largest), SME accounts, contractors and IR35, construction CIS, wills and probate, divorce finances, startups, ecommerce, hospitality, charities, crypto, dentists / medical / pharmacy practice owners, solicitors' own accounting, settlement agreements and leasehold (new sites in build).

## Tier 1 — unregulated, direct fit, outreach now

1. **Solicitors** (the standing buyer channel):
   - Conveyancing / property solicitors — property and landlord leads (sales, purchases, incorporation transfers, SDLT).
   - Probate solicitors — wills-probate leads.
   - Family law solicitors and mediators — divorce-finances leads.
   - Employment solicitors — settlement-agreement leads (our own Tier-1 niche, KD 0-1).
   - List via Law Society "Find a Solicitor" by practice area + city; cross-check SRA register.
2. **Chartered surveyors (RICS)** — property leads needing valuations (CGT base values, probate valuations, leasehold extensions, surveys). RICS "Find a Surveyor".
3. **Bookkeepers and payroll bureaus** — essential-tier and SME leads that are below a full accountancy engagement; also a second life for last-call/cascaded standard leads. ICB / AAT licensed-member directories.
4. **Insolvency practitioners** — distressed business enquiries (arrears, closure, bounce-back problems). R3 member directory / Insolvency Service register.
5. **Specialist tax boutiques (CTA firms, non-general-practice)** — R&D claims, CGT planning, SDLT reclaims, non-resident. CIOT "Find a CTA".
6. **Letting agents / property managers** — landlord leads mentioning self-management pain. Propertymark member list.
7. **Estate agents (incl. probate sales desks)** — probate and "planning to sell" property leads.
8. **Company formation / company secretarial agents** — startup and incorporation leads (also upstream partners).

## Tier 2 — finance and regulated-firm buyers, outreach OPEN (owner decision 2026-08-13)

Previously held pending the introducer-exemption ruling. Owner released it for outreach: list-building and contacting firms are not themselves regulated activities. The exemption question bites only at the point a fee is taken for passing a CONSUMER's details, so it must be resolved before the first invoice on a consumer introduction, not before outreach. Two of the five below are not gated at all.

1. **Mortgage brokers** — best fit for the largest lane (property tax / landlord).
   - BTL / portfolio / limited-company SPV specialists; contractor mortgage specialists (contractors + IR35); expat / non-resident specialists.
   - Sources: FCA Register filtered on home finance mediation permission, Unbiased, AMI members.
   - Gate: applies to consumer-BTL and regulated mortgage introductions. Limited-company SPV introductions are cleaner.
2. **Commercial / bridging / development finance brokers** — **NOT gated for limited-company borrowers** (RAO Art 36A: introducing a body corporate is not credit broking; same basis as the built Business Finance cluster). Company-gate the form.
   - Feeds SME accounts, landlord commercial, construction/CIS, hospitality, ecommerce. Highest CPCs in the estate (£47-145).
   - Sources: NACFB member directory, FIBA, ASTL (lender side).
3. **IFAs / financial planners** — IHT (wills-probate), pension sharing (divorce-finances), practice-owner wealth (dentists, medical, pharmacy, solicitors).
   - Sources: FCA Register, Unbiased, VouchedFor, Personal Finance Society directory, STEP for IHT-focused.
   - Gate: applies. Highest value per lead in this tier.
4. **Insurance brokers** — landlord/property, professional indemnity (solicitors, contractors), commercial.
   - Sources: BIBA Find Insurance member directory, FCA Register.
   - Gate: IDD, a separate question from the introducer exemption. Do not let it hold items 1-3.
5. **Umbrella companies** — contractors + IR35 lane. Not an FCA question; the objection is reputational and part-competitive with contractor accounting.
   - Sources: FCSA accredited members, Professional Passport accredited list.

Outreach order: commercial finance brokers (NACFB) and BTL mortgage specialists first — cleanest position, biggest lane match.

## Excluded

- **Quick-sale / BMV property investors**: owner strategy is to act as PRINCIPAL on urgent-sale sellers, not sell them as leads. Do not offer these to third parties.
- **Debt advice / claims management**: FCA-regulated and reputationally messy.
- **Other accountants' marketplaces / lead resellers**: we are the marketplace.

## Outreach mechanics for the list-builder

- Per firm capture: firm name, contact partner, email, phone, practice areas, geography served, directory source URL. Same shape as `lead_engine/data/firms.csv` plus `professions` and `tiers_of_interest` so signups drop straight into the pool.
- Local-first: start in the estate's strongest lead geographies (check per-site lead areas before building), not a national blast.
- The pitch asset is the price sheet (`docs/price-sheet.html` → PDF); adjacent buyers see the £35 adjacent line, join free, no commitments, pay per claim in arrears.
- Do not name existing pool firms or promise volumes.
