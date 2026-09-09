# S0 lane 3: UK accounting-adjacent paid tools (agent report, 2026-09-09)

Data gathered 2026-09-09 via web search. Pricing verified against vendor/comparison pages where possible; items not confirmed on a primary source marked **[unverified]**.

## Regulatory ground rules (checked first, they shape everything)

- **MTD recognition = paperwork + engineering, not a licence.** HMRC Developer Hub: build against sandbox APIs, pass developer testing (including fraud-prevention headers), submit a Production Approvals Checklist, get production credentials, then you appear on the recognised-software list. No fee, no qualification, no audit of you as a business. Weeks of API work, not a moat; hundreds of tiny vendors (VitalTax, 123 Sheets, Easy MTD) have done it. **Blocker level: low.** Fraud-header spec and quarterly-obligation endpoints are the fiddly bits.
- **Formation agents / registered office = ACSP.** Since 18 Mar 2025: register as Authorised Corporate Service Provider (£55) AND AML supervision (HMRC TCSP if no professional body). From spring 2026 ACSP required to file on behalf of others at all. **Blocker level: medium** (ongoing AML duties, ID-verification liability). Avoid unless deliberately chosen.
- **BTL mortgage comparison:** BTL lending mostly FCA-unregulated, but *advising/arranging* mortgages is regulated. Pure calculator with static rate tables fine; live product sourcing + lender passing drifts toward broker territory. **Calculator yes; comparison-and-refer needs care** (lead-passing to a regulated broker = the safe model).
- **Advice line:** calculators, generators, record-keeping = fine. "You should" on tax structure = advice. Everything below buildable advice-free.
- **Payslip/P60 "replacement" services:** legal grey-to-black (fraud-adjacent, used for mortgage applications). **Do not enter.**

## Main table

| Tool | URL | What it does | UK pricing | Size | Distribution | Complaints visible | "Slightly better" looks like | Reg flags |
|---|---|---|---|---|---|---|---|---|
| Hammock | usehammock.com | Landlord bookkeeping, open-banking feeds, MTD | £8+VAT/mo (1-3 props), £15/mo (4-10), -20% annual | **VC** ($5.5m Series A, Fuel Ventures) | SEO, broker/lender partnerships | Trustpilot mostly positive, small review base | Cheaper flat price, no per-property banding | MTD recognition needed |
| Landlord Vision | landlordvision.co.uk | Full landlord accounting + tenancy mgmt | from ~£99/yr; legacy users report £80/mo for 20 tenancies post-repricing | Indie/SME (Softworks) | SEO, long-standing brand | Trustpilot: repricing anger, "money grabbing", new version worse than legacy | Simpler, cheaper, no forced migration; disgruntled legacy users poachable | MTD recognition |
| Lendlord | lendlord.io | Portfolio tracker, deal analyser, free tier | Free core; Premium ~£12/mo **[unverified exact]** | VC fintech (also brokers finance) | Free tier + content | Few | N/A; monetises via finance referrals (FCA side) | Finance arm regulated; don't copy that part |
| Landlord Studio | landlordstudio.com | Landlord accounting app, MTD | Free <=3 units (£5/MTD submission); Pro £12/mo; Pro Plus £24/mo; +£1/unit | VC/international | App stores, SEO | Minor | UK-first tax depth (S24 reducer, FA2026 rates) which US-origin tools fudge | HMRC-recognised Mar 2026 |
| VitalTax | vitaltax.uk | Excel add-in MTD bridging | ~£30-36/yr incl VAT | **Indie** (tiny) | HMRC recognised-software list, word of mouth | Excel-add-in clunkiness | Web-based, landlord-specific templates, better onboarding | HMRC recognition (you'd need it too) |
| 123 Sheets | 123sheets.com | Spreadsheet MTD bridging | £19.50-£36+VAT/yr | **Indie** | HMRC list, SEO | Few | Whole category ugly + thinly marketed | HMRC recognition |
| Coconut | getcoconut.com | Sole-trader/CIS bookkeeping + MTD | £99.99/yr bookkeeping; £129.99/yr or £21.99/mo MTD | VC | SEO, CIS niche pages | Few | CIS-subcontractor-specific flow (deduction statements, refund estimate) | MTD recognition |
| GoSimpleTax | gosimpletax.com | Self assessment filing | £49.99-£64.99/tax year, more with property/foreign pages | Indie/SME | SEO ("file tax return online") | Price-tier confusion | Flat price incl property pages; landlord-first SA tool | SA API recognition; calculation not advice, fine |
| TaxCalc (individual) | taxcalc.com | SA100 software | from ~£35-38 | SME (accountant-focused) | Accountant channel | Dated UX for consumers | Consumer-friendly wrapper | Same as above |
| Dividify | dividify.co.uk | Dividend vouchers + board minutes | £6/£15/£24/mo; accountants from £30/mo | **Indie** (no team page) | SEO "dividend voucher generator" | None visible (small) | Free tier + one-off pricing (directors declare 2-4x/yr; monthly sub mispriced), estate cross-link | None. Pure doc generation; no advice if no amount recommendations |
| Dividendly | dividendly.co.uk | Same + Xero/QB integration | Freemium **[unverified exact paid]** | **Indie** | SEO | None | As above | None |
| Inform Direct | informdirect.co.uk | Company secretarial: registers, confirmation statements, vouchers | Free core; PAYG £10+VAT/voucher; subs per-company **[partly opaque]** | SME (Bright Group) | Accountant channel, SEO | Few | Director-not-accountant UX at director prices | ACSP for filing on behalf of others from spring 2026 |
| FileMinder / ComplyTrack / Remindlo | fileminder.co.uk etc | CH/HMRC deadline reminders | Free tiers; Remindlo £19-49/mo (SMS) | **Indie, very small** | SEO | None | Category embryonic; deadline tracking + CH monitoring + email = weekend build on free CH API | None (read-only CH API, no filing) |
| 1st/Rapid Formations | 1stformations.co.uk | Formation + registered office | £2.99 + £100 CH fee; packages to £140; RO ~£39-50/yr | SME, dominant | SEO + 22k Trustpilot reviews | Upsell complaints | Hard market to enter now | **ACSP + AML + ID-verification. Avoid** |
| PropertyData | propertydata.co.uk | Market analytics, yield, deal analyser | £14/£22/£35/£60/mo; API from £28/mo | **Indie** (founder-run) | SEO, investor forums | Credit-system grumbles | Deal-analyser-only at £5-9/mo; PD bundles analytics most landlords never use | None |
| Property Hive | wp-property-hive.com | WordPress estate agency plugin | Free core; add-ons from £14.99 | **Indie** | WP directory | None major | Agent tooling, weak estate synergy | None |
| Signable / Legalesign | signable.co.uk | UK e-signature | Signable per-envelope; Legalesign ~$10/user/mo | SME | SEO vs DocuSign price anger | DocuSign refugees | Tenancy-agreement signing bundled with landlord tool | None (eIDAS, no approval) |
| Dext | dext.com | Receipt OCR | £24/mo sole trader | VC/PE | Accountant channel | Price for solo users | Landlord receipt scanner £3-5/mo mapped to property expense categories | None |
| OS Payroll / Payslips Plus | os-payroll.co.uk | Replacement payslips/P60s | £12-38/document | Indie | SEO | Fraud-adjacent | **Do not enter** | Facilitating false income docs |
| Commercial Trust / MFB calcs | commercialtrust.co.uk | Ltd-co BTL calculators | Free (broker lead-gen) | Brokers (FCA) | SEO | n/a | Standalone SPV stress-test calc monetised by broker referral, not by being broker | Arranging = regulated; **calculator + referral out only** |

Also checked, not viable: VAT calculators/checkers (HMRC/VIES free, no willingness to pay); free dividend template sites (race to zero at template level, but = SEO front door for a paid generator).

## Macro fact

**MTD ITSA: 864,000 sole traders and landlords mandated April 2026 (>£50k), the >£30k wave April 2027** (gov.uk). First quarterly deadline 7 Aug 2026, panic-search volume live now, spikes again for 2027 cohort. Bridging software sells £20-36/yr with near-zero marketing sophistication (VitalTax, 123 Sheets = indie Excel add-ins found only via HMRC's list). Full tools £96-260/yr. Gap between "free HMRC list, ugly" and "£15/mo accounting suite" wide open.

## Agent's top 5 for us

1. **MTD ITSA bridging/submission for landlords** — flagship already ranks for the panic queries; recognition = engineering not licensing; incumbents = indie Excel add-ins with no SEO machine; £30-60/yr x 1,000 users off existing traffic meaningful; every MTD content page becomes product funnel.
2. **Dividend voucher + board minutes generator** — Dividify proves £6-24/mo demand, zero moat, no visible owner; we rank for director/dividend content; zero regulatory surface; days to build; one-off or £15/yr undercuts mispriced monthly subs.
3. **Companies House deadline tracker + monitoring** — free CH API, embryonic indie competition, natural upsell on every company-director page; caution: emails users, notification product must be designed deliberately.
4. **BTL/SPV deal analyser (calculator-only)** — PropertyData £14-60/mo bundles more than landlords need; focused £5-9/mo deal analyser + S24/FA2026-aware after-tax yield on flagship audience; no regulation if calculation-only + refer mortgage demand out.
5. **Landlord self-assessment estimator / SA-with-property filing** — GoSimpleTax charges extra for property pages; landlord-first SA tool (or free estimator feeding #1) rides same traffic; SA API recognition same shape as MTD.

Avoid: formation agents (ACSP/AML), payslip replacement (fraud-adjacent), mortgage brokering (FCA), Property Hive lane (no synergy).

Sources: HMRC dev hub (how-to-integrate), gov.uk 864k announcement, CH ACSP blog 2024-09-13, propertydata.co.uk/pricing, dividify.co.uk, landlordstudio.com/uk/pricing, mtdcompare.co.uk (123 Sheets), whichmtdsoftware.co.uk (VitalTax), Landlord Vision Trustpilot, Hammock Series A (techfundingnews), gosimpletax.com/pricing, taxroot.co.uk formation-agent comparison, getcoconut.com/mtd-software/cis-subcontractors, moneyfactscompare.co.uk BTL calculator note, fileminder.co.uk, remindlo.co.uk.
