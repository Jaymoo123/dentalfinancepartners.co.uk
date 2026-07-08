---
slug: family-investment-company-mechanics-share-classes-property
category: incorporation-and-company-structures
intent: Property owners who have decided to form (or already operate) a family investment company and want to understand the operational mechanics: how share classes are engineered, how income is routed to different family members, how the founder retains control, and what the CT compliance picture looks like. This is "how does it actually work inside?" not "should I do it?" and not "what does it do for IHT?".
---
# Family Investment Company: Share Class Mechanics, Income Routing and CT Compliance for Property Owners

## Statutory anchor

- **Primary:** Companies Act 2006 s.18 (articles of association -- default and bespoke); CA 2006 ss.629-630 (share classes definition and variation of class rights -- see HP drift note below); CTA 2010 s.18N + ss.18N-Q (close investment-holding company definition and exclusions -- determines whether 19% small-profits rate is available or locked at 25% main rate); CTA 2010 s.455 (close-company loan charge on overdrawn director's loan accounts); ITTOIA 2005 s.624 + s.626 (settlements legislation attribution + spouse exception).
- **Supporting:** CTA 2009 Pt 4 (property income for companies -- deductibility of expenses, interest in full unlike s.24 for individuals); CA 2006 ss.288-300 (written resolutions + board resolutions -- the governance mechanic for dividend declarations); CA 2006 s.392 (year-end accounting reference); CA 2006 ss.113-128 (statutory registers -- register of members, PSC); ITA 2007 s.8 as substituted by FA 2026 s.4 (dividend rates 2026/27: basic 10.75%, higher 35.75%, additional 39.35% -- VERIFY at write time); FA 2026 ss.6-7 (property income surcharge 2027/28 -- affects personal-side modelling for shareholder-recipients of dividends who also have personal letting income).
- **House position reference:** §21.5 (FIC mechanics generic -- articles, board governance, close-company income tax profile, IHT exclusion of investment FICs from BPR, CIHC status); §21.2 (alphabet shares + settlements legislation s.624 + Jones v Garnett Arctic Systems carve-out; child share attribution; growth vs preference share design); §21.A (CT three-figure framework -- small profits 19%/£50k, marginal relief £50k-£250k, main rate 25%/£250k+; CIHC exclusion locks to 25%); §21.1 (DLA mechanics, HMRC official rate on credit balance, s.455 charge rate 35.75% from 6 April 2026 for loans made on or after that date); §21.4 (dividend extraction sequence from property SPV -- reuse framework for FIC context).

## HP drift note (Stage 2 catch -- flag F-42)

Stage 1 brief cited CA 2006 s.629 as "variation of class rights." **This is wrong.** CA 2006 s.629 (verified via WebFetch 2026-07-08) is headed "Classes of shares" (definitional -- "shares are of one class if the rights attached to them are in all respects uniform"). The section for variation of class rights is **CA 2006 s.630** ("Variation of class rights: companies having a share capital" -- confirmed HTTP 200, requires 75% written consent or special resolution at a separate class meeting). Writer must cite s.630, not s.629, for variation of class rights. This drift is flagged to wave10_site_wide_flags.md as F-42 (BRIEF_DRIFT).

## Framing differentiator (anti-cannibalisation -- read these three before writing)

- **`family-investment-company-property-worth-it`:** The "is it worth it?" decision page. Covers: entry cost (SDLT + CGT on incorporation), income-hungry landlord mismatch, double-layer taxation, who the FIC suits and who it does not. Does NOT cover: how share classes are actually drafted, how income routing works in practice, CT filing mechanics, or CIHC status determination. This page starts where "worth it?" stops.
- **`fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics`:** The IHT value-freeze strategic framing. Covers: preference share value-freeze concept, growth-share PET clock, 7-year IHT outcome, comparison against direct PET and CLT routes, GROB risk. Does NOT cover: the mechanics of how share classes are engineered in the articles, how dividends are declared and routed, or CT compliance. This page stays out of all IHT territory.
- **`a-complete-guide-to-family-investment-companies-fics`:** Check depth before writing. If it already covers share-class drafting mechanics in detail, narrow this page to the CT compliance + income routing dimension and flag BRIEF_DRIFT.
- **`fic-growth-shares-and-freezer-shares-design`:** Check depth before writing. If it covers preference/growth share architecture in detail, confirm this page takes the income-routing-in-practice angle, not the structural-design angle.
- **`fic-articles-of-association-property-control-mechanics`:** Check depth before writing. If articles mechanics are covered in full elsewhere, this page focuses on CT compliance and income routing.
- **Angle this page takes that the above do NOT:** Operational mechanics -- how the share structure actually functions on an ongoing basis: (a) the rules in the articles that govern which class gets what dividend, (b) the board-resolution process for declaring a differential dividend by class, (c) how income from the property portfolio flows through the CT computation to the distribution layers, (d) how the CIHC determination affects the CT rate, (e) how director control is structurally preserved, and (f) what the annual CT compliance cycle looks like for a property FIC.

## Key questions this page must answer

1. What share classes does a typical property FIC use -- preference shares (fixed coupon, frozen value), ordinary/growth shares (entitled to residual capital and income), alphabet shares (A, B, C differential dividends) -- and how are the rights specified in the articles?
2. How does a board of directors declare a dividend on one class but not another -- what is the mechanics of a differential dividend resolution (written resolution vs board meeting, Companies Act ss.288-300 compliance)?
3. What is the CIHC test (CTA 2010 s.18N) and how does a property FIC let to unconnected tenants typically fall outside it, versus a FIC whose only tenant is a connected person? Why does CIHC status lock the company to the 25% main CT rate with no small-profits rate?
4. How does the CT computation work for a property FIC -- rental income in, deductible expenses (mortgage interest in full, unlike individuals), CT at the appropriate rate, retained profit available for distribution?
5. How does the settlements legislation (ITTOIA 2005 s.624) interact with alphabet-share dividends to a spouse -- and why does the Jones v Garnett (Arctic Systems) [2007] UKHL 35 carve-out under s.626 protect a genuine outright gift of shares to a spouse from attribution?
6. How does income routing to adult children (growth-share dividends) differ from routing to minor children (bare-trust shares attributed to settlor under s.624 until age 18)?
7. How does the director retain control despite gifting economic growth -- what provisions in the articles preserve founder control (casting vote, reserved matters requiring founder-class consent, class-consent requirements for variation of rights under s.630)?
8. What is the annual CT compliance cycle for a property FIC -- CT600 due 12 months after year end, payment due 9 months and 1 day after year end, iXBRL accounts, Companies House filings?
9. When does the close-company s.455 charge arise (35.75% from 6 April 2026 on overdrawn DLA, repaid 9 months after year-end) and how is it relieved on repayment?
10. What cross-links should the reader follow for the "should I form a FIC?" decision (links to worth-it page), for the IHT value-freeze strategy (links to fic-estate-planning page), and for whole-portfolio strategic context (links to A1 pillar)?

## Manager pre-decisions placeholder

- **Category routing:** `incorporation-and-company-structures` -- correct cluster for company mechanics; confirms against live route dirs.
- **CIHC status test:** CTA 2010 s.18N verified via WebFetch 2026-07-08: "wholly or mainly for one or more of the permitted purposes" including "investments in commercially-let land." Writer verifies verbatim wording of qualifying-purpose exclusion at legislation.gov.uk/ukpga/2010/4/section/18N at write time.
- **Dividend rates 2026/27:** CONFIRMED: 10.75% / 35.75% / 39.35% per Stage 1b lock. Additional rate NOT attributed to FA 2026.
- **s.455 rate 2026/27:** 35.75% for loans made on or after 6 April 2026 (per §21.1 F-9 lock). Verified via legislation.gov.uk WebFetch: "such percentage... as corresponds to the dividend upper rate specified in section 8(2) of ITA 2007." Writer quotes verbatim.
- **Articles mechanics:** cite CA 2006 s.18 (bespoke articles -- verified HTTP 200 WebFetch 2026-07-08: "every company must possess articles of association"), s.630 (variation of class rights -- NOT s.629; corrected via HP drift catch F-42), s.288 (written resolutions).
- **IHT MUST NOT be covered on this page** (that is fic-estate-planning's territory). The only permitted IHT reference is a one-line cross-link signpost: "For the IHT value-freeze strategy using this share structure, see [fic-estate-planning page]."
- **"Worth it?" framing MUST NOT be on this page.** No entry-cost analysis, no "should you form a FIC", no FIC-vs-personal-ownership comparison. One-line signpost to worth-it page is permitted.
- **Cross-link INTO A1 pillar:** this page must include a signposted link to `portfolio-landlord-tax-planning-strategy-guide` for whole-portfolio strategy context (conductor ruling).
- **Scope of worked example:** a brief CT computation (rental income, deductible expenses, CT at 19%/25% depending on CIHC status, retained vs distributed) illustrates the income-routing flow. Not a full profit-extraction decision tool (that is A6).

## Stage 2 competitor URLs (verified 2026-07-08)

All three Stage 1 seed URLs were dead (404/ECONNREFUSED). Replacement URLs found via WebSearch and verified live:

1. **https://www.bdo.co.uk/en-gb/insights/tax/private-client/family-investment-companies-how-they-work** -- HTTP 200. "Family investment companies -- how they work." BDO advisory firm. Covers structure, funding mechanisms, share classes, asset holdings, taxation, withdrawal methods. Notes FICs "would normally be classed as a 'close investment company' so the corporation tax rate is usually 25%." Does not go into CT compliance mechanics (CT600 deadlines, iXBRL, Companies House cycle) or CIHC qualifying-purpose carve-out for unconnected-tenant lettings. Takeaway: good structural overview but thin on CIHC nuance and annual compliance cycle -- our page goes substantially deeper on both.

2. **https://www.saffery.com/insights/articles/family-investment-company/** -- HTTP 200. "Family Investment Company (FIC) | Wealth Structuring Guide." Saffery (large advisory firm). Covers structure, establishment, tax advantages, IHT benefits, operational considerations; recommends FICs for estates of £5m+. IHT-heavy framing; minimal coverage of share-class mechanics in the articles or the board-resolution process for differential dividends. Takeaway: estate-planning angle rather than operational mechanics; our page owns the "how does it work day-to-day" space.

3. **https://www.kirkrice.co.uk/blog/family-investment-companies-key-considerations/** -- HTTP status unclear (WebFetch returned no content). Deleted.

**Deleted (dead):** taxinsider.co.uk/property-tax/family-investment-company-mechanics (404), propertytaxinsider.co.uk/family-investment-company (ECONNREFUSED), kirkrice.co.uk/blog/family-investment-companies-key-considerations/ (no content). 3 deleted / 2 verified live.

Note: only 2 live competitors confirmed. Writer should supplement with a session-side WebSearch for "FIC share classes income routing CT compliance property UK 2026" at write time.

## Authority links (verified)

- **Legislation -- CTA 2010 s.18N (CIHC definition + qualifying-purpose exclusion):** https://www.legislation.gov.uk/ukpga/2010/4/section/18N -- confirmed HTTP 200 2026-07-08. Key text: "close company is not a close investment-holding company... if it exists wholly or mainly for one or more of the permitted purposes" including "investments in commercially-let land." Writer quotes verbatim.
- **Legislation -- CA 2006 s.18 (articles of association):** https://www.legislation.gov.uk/ukpga/2006/46/section/18 -- confirmed HTTP 200 2026-07-08. Key text: "every company must possess articles of association."
- **Legislation -- CA 2006 s.630 (variation of class rights):** https://www.legislation.gov.uk/ukpga/2006/46/section/630 -- confirmed HTTP 200 2026-07-08. Key text: variation requires "written consent of the holders of at least three-quarters in nominal value of the issued shares of that class" or "a special resolution passed at a separate general meeting of the holders of that class." Writer quotes verbatim.
- **Legislation -- ITTOIA 2005 s.624 (settlements legislation):** https://www.legislation.gov.uk/ukpga/2005/5/section/624 -- confirmed HTTP 200 2026-07-08. "Income arising under a settlement is treated as the settlor's income if it arises during the settlor's lifetime from property in which the settlor retains an interest."
- **Legislation -- CTA 2010 s.455 (DLA charge):** confirmed HTTP 200 2026-07-08: "such percentage... as corresponds to the dividend upper rate specified in section 8(2) of ITA 2007."
- **HMRC CTM60700 (close companies + CIHC):** https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm60700 -- confirmed HTTP 200. Covers CIHC "wholly or mainly" test, lettings to connected persons, qualifying company status.
- **HMRC CTM60700+ on lettings to connected persons:** writer should navigate to CTM60730 (or similar sub-page) covering the connected-person test for lettings; this is the key distinction between unconnected-tenant FIC (not CIHC) and connected-tenant FIC (CIHC). Verify sub-page URL at write time.
- **Case law:** *Jones v Garnett (Arctic Systems)* [2007] UKHL 35 -- no direct URL; cite as UKHL 35 with neutral citation.

## Worked-example data for writer

### CIHC determination worked example

**Scenario A: FIC lets 10 BTL properties to unconnected private tenants at market rent**

- CTA 2010 s.18N test: does the FIC exist "wholly or mainly" for one of the permitted purposes?
- Permitted purpose: "making investments in land" where land is "commercially let" to persons who are not connected with the company under CTA 2010 s.1122.
- Outcome: NOT a CIHC. The company can access the CT small-profits rate (19% on profits up to £50,000) and marginal relief (effective ~26.5% on profits £50k-£250k).
- CT computation:
  - Rental income: £80,000
  - Less: mortgage interest (fully deductible for CT, unlike individuals): £30,000
  - Less: repairs, agent fees, insurance: £8,000
  - Taxable profit: £42,000
  - CT at 19% (small profits rate, profits below £50k): £7,980
  - After-CT retained profit: £34,020
  - Available for distribution to shareholders by class resolution

**Scenario B: FIC's only tenant is the founder's adult child (connected person)**

- CTA 2010 s.18N test: letting to a connected person does not satisfy the "commercially-let land" qualifying purpose.
- Outcome: IS a CIHC. CT at 25% main rate regardless of profit level. No small-profits rate, no marginal relief.
- Same income/expense facts: CT at 25% on £42,000 = £10,500 (vs £7,980 in Scenario A -- £2,520 per year additional cost).
- Writer note: present both scenarios side by side in a table to illustrate the connectedness impact.

### Differential dividend resolution mechanics

Step-by-step flow (board resolution for a property FIC):

1. Director(s) pass a board resolution (or written resolution per CA 2006 s.288) to declare an interim dividend on [Class X] shares only, in the amount of [£Y] per share.
2. The resolution must be dated and minuted. The minute records: (a) that distributable profits exist (checked against current draft accounts); (b) which share class is receiving the dividend; (c) the amount per share; (d) the payment date.
3. The company's bank account transfers the dividend to the shareholder(s) holding that class.
4. The dividend is recorded in the company's statutory register of members and the director's loan account (if the dividend is credited to a DLA rather than paid in cash).
5. No shareholder in any other class receives a distribution on that date.

Writer: explain that this process is what makes the alphabet-share structure operationally flexible -- the board can choose which class to pay, when, and how much, each time. This is the mechanism by which income is "routed" to family members at different tax rates.

### Annual CT compliance cycle

| Obligation | Deadline | Notes |
|---|---|---|
| Estimated CT payment | 9 months and 1 day after year end | Quarterly instalments for large companies (profits over £1.5m); most property FICs pay in one amount |
| CT600 return | 12 months after year end | iXBRL-tagged accounts required; must be filed electronically |
| Statutory accounts | 9 months after year end (private companies) | Filed at Companies House |
| Confirmation statement | Anniversary of incorporation (or last statement) | CA 2006 s.853; PSC register update if share structure changed |
| ATED return (if any property over £500k) | 30 April each year | Even where letting relief claimed |
| SARs / PSC register | Ongoing | Register of members + PSC (persons with significant control) must reflect actual share ownership; update on any change |

### Share-class design summary table

| Share class | Typical rights | Held by | Income routing |
|---|---|---|---|
| Preference shares (Class A) | Fixed coupon (e.g. 5% of par value) per year; priority on liquidation up to par + coupon arrears; no right to surplus capital | Founder | Predictable fixed return; frozen value for IHT |
| Ordinary / growth shares (Class B) | Entitled to residual capital and income after preference coupon; capital growth accrues here | Next generation (adult children) | Capital growth + variable dividend from residual profits |
| Alphabet shares (Class C / D etc.) | Differential dividend rights; C-shares and D-shares can receive different dividend amounts at the board's discretion; same capital rights (or subordinated) | Spouse / other family members | Tax-efficient income splitting to family members in lower tax bands |

Writer: present this table early (H2 or H3 on share-class design) as it anchors the rest of the page.

### CT computation with income routing to shares

Building on Scenario A (NOT a CIHC; CT at 19%):

- After-CT retained profit: £34,020
- Board resolution: declares £5,000 dividend on Class A (preference; founder)
- Board resolution: declares £15,000 dividend on Class B (growth; adult children, 2 shareholders = £7,500 each)
- Board resolution: declares £10,000 dividend on Class C (spouse)
- Remaining retained profit: £34,020 - £5,000 - £15,000 - £10,000 = £4,020 (held in company)

Personal tax on receipt:
- Founder: £5,000 dividend; if founder is higher-rate, first £500 @ 0%, £4,500 @ 35.75% = £1,609
- Spouse: £10,000 dividend; if spouse is basic-rate, first £500 @ 0%, £9,500 @ 10.75% = £1,021
- Each adult child: £7,500 dividend; if basic-rate, first £500 @ 0%, £7,000 @ 10.75% = £753

Total family tax on £30,000 distributed: £1,609 + £1,021 + (2 x £753) = £4,136 vs if the full £30,000 were paid to the founder alone at 35.75%: first £500 @ 0%; £29,500 @ 35.75% = £10,546. Saving by income routing: ~£6,410 on this distribution alone.

Writer: use this as a simplified worked example. Add caveats: assumes spouse and children have no other income consuming the basic-rate band; real scenario requires knowledge of all income sources.

## FAQ expansion (8-12 entries with draft answers)

**Q1: What share classes does a property FIC typically use?**
The most common design uses three types. Preference shares (held by the founder) carry a fixed annual coupon -- for example, 5% of their nominal value -- and priority on winding up. This freezes the value of the founder's holding for IHT purposes. Ordinary or growth shares (held by adult children or other next-generation family members) receive the remaining income and capital after the preference coupon is satisfied; the value of these shares can grow without adding to the founder's estate. Alphabet shares (Class A, B, C, D and so on, held by the founder, spouse, adult children, or other family members) carry differential dividend rights, allowing the board to pay different amounts to different classes at the same time. The exact design is specified in the company's articles of association under CA 2006 s.18.

**Q2: How does the board declare a dividend on one class of shares but not another?**
The board passes a resolution (typically a written resolution under CA 2006 s.288 for small private companies, or a board minute for companies with more than one director) specifying: (a) that the company has sufficient distributable reserves; (b) the class of shares to which the dividend is being paid; (c) the amount per share; and (d) the payment date. No shareholder holding a different class receives anything on that date. This resolution is the operational mechanism that makes income routing to family members in lower tax bands possible.

**Q3: What is the CIHC test and why does it matter for my FIC?**
A close investment-holding company (CIHC) under CTA 2010 s.18N is a close company that does not exist "wholly or mainly" for one of the permitted purposes. The key permitted purpose for property FICs is holding land that is "commercially let" to persons who are not connected with the company. If your FIC lets properties to unconnected tenants at market rent, it is NOT a CIHC, and it can access the 19% small-profits rate (on profits up to £50,000) and marginal relief (effective ~26.5% on profits between £50,000 and £250,000). If your FIC's only tenants are connected persons (family members, associated companies), the CIHC carve-out does not apply and all profits are taxed at 25%, regardless of size.

**Q4: Can my FIC fully deduct mortgage interest, unlike me personally?**
Yes. Section 24 of the Finance (No.2) Act 2015 restricts the deduction of mortgage interest for individual landlords. It does not apply at the corporate level. A FIC (or any property company) paying CT can deduct mortgage interest as a business expense against rental income under CTA 2009 Pt 4, in the same way as any other business cost. This is one of the primary income-tax advantages of holding property in a company for higher-rate taxpaying landlords.

**Q5: Is it safe to pay dividends to my spouse from my FIC?**
If your spouse holds shares in the FIC as an outright gift with no conditions attached, dividends on those shares are your spouse's income. The settlements legislation (ITTOIA 2005 s.624) could in principle attribute the income back to you if you retain an interest in the arrangement. However, the *Jones v Garnett (Arctic Systems)* [2007] UKHL 35 carve-out under s.626 protects an outright gift of ordinary shares to a spouse where: (a) the gift is genuine and unconditional; (b) the spouse has the right to both income and capital; and (c) you do not retain any benefit or control over the shares. An alphabet share with differential dividend rights (where the board controls the timing and amount of dividends to each class) sits in slightly greyer territory -- the existence of board discretion is not in itself a retained interest by the settlor, but the arrangement should be reviewed by an adviser.

**Q6: What about shares for my children?**
Minor children: shares gifted to a child under 18 are caught by ITTOIA 2005 s.624 because the parent (settlor) retains a benefit (parental obligation of maintenance). Income on those shares is attributed to you as the settlor until the child turns 18. Holding shares on bare trust for a minor child does not escape this. Adult children (18 or over): shares gifted to an adult child are not automatically within s.624 because there is no parental-obligation benefit retained by you. However, the gift must be genuine (not subject to any side arrangement) and the adult child must actually receive the income.

**Q7: How does the founder retain control of the FIC after gifting growth shares?**
Through the articles of association (CA 2006 s.18). Standard control provisions include: (a) a casting vote for the chairman (typically the founder) at board meetings; (b) reserved matters that require the consent of the founder or the founder-share class for specified decisions (e.g. winding up, new share allotment, change of company objects); (c) class-consent requirements for variation of rights under CA 2006 s.630 -- any change to share-class rights requires the written consent of holders of at least 75% of that class, or a special resolution of that class. These provisions mean the founder can gift economic value (growth shares) to the next generation while retaining the levers of governance.

**Q8: What is the annual CT compliance cycle for a property FIC?**
Corporation Tax: payment due 9 months and 1 day after the accounting year end; CT600 return due 12 months after year end (iXBRL-tagged accounts required). Companies House: statutory accounts due 9 months after year end; confirmation statement due annually. If any property in the FIC is worth more than £500,000, an ATED return must be filed by 30 April each year even if the letting-relief exemption eliminates the charge. The PSC (persons with significant control) register must be kept current whenever the share structure changes.

**Q9: When does the s.455 charge apply to a FIC director?**
If a director withdraws money from the FIC as an informal loan (overdrawn director's loan account), and that loan is not repaid within 9 months of the company's year end, the company must pay a tax charge at the dividend upper rate for the tax year in which the loan was made -- 35.75% from 6 April 2026 (ITA 2007 s.8(2) as substituted by FA 2026 s.4; CTA 2010 s.455). This charge is refunded by HMRC when the loan is later repaid. It is a cash-flow cost, not a permanent tax, but it must be reported on the CT600 and paid along with the company's CT.

**Q10: Should I read this page before or after deciding whether to form a FIC?**
This page is for people who have already decided to form a FIC (or already have one running) and want to understand the operational mechanics. If you are still weighing up whether a FIC is right for you -- considering the entry costs (SDLT and CGT on property transfer), the income-hungry landlord mismatch, or the double-layer of CT then personal dividend tax -- read [family-investment-company-property-worth-it] first. For the IHT value-freeze mechanics that a FIC can deliver, see [fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics].

**Q11: How does the FIC interact with the 2027/28 property income surcharge?**
From 6 April 2027, personal property income is taxed at 22/42/47% under FA 2026 ss.6-7. FIC shareholders who also have personal letting income will find their income-tax bands consumed faster, making dividend income from the FIC more expensive at the personal level. Within the FIC itself nothing changes -- CT rates are unaffected by the personal-level property income surcharge. The income-routing advantage of alphabet shares (paying dividends to lower-rate family members) becomes relatively more valuable after 2027/28, as the higher-rate threshold at 42% means any income pushed to a lower-rate family member saves 31.25% dividend tax (42% personal rate less 10.75% basic rate) rather than the current 25% saving.

**Q12: Can a property FIC hold commercial property as well as residential?**
Yes. The FIC structure is agnostic as to property type. Commercial property in a FIC is eligible for Structures and Buildings Allowance (3% per year) and, where applicable, capital allowances on fixtures. Commercial property also avoids the ATED regime (which applies only to residential dwellings worth over £500,000). The CT computation is the same whether the property is residential or commercial; the CIHC test and the letting-to-unconnected-persons requirement are the same.

## Keyword seed set

Primary queries (from triage.json + gap discovery):
- "family investment company administration" (triage.json)
- "can a family investment company buy property" (triage.json)
- "multiple share classes in a property spv" (triage.json)
- "can pics/fics claim aia" (triage.json -- tax reliefs in FIC; this page should note AIA available on commercial fixtures but not residential)

Supporting queries (related intent):
- "family investment company share classes UK 2026"
- "FIC income routing property"
- "family investment company CIHC corporation tax"
- "FIC alphabet shares dividends spouse UK"
- "FIC articles of association control mechanics"
- "family investment company CT600 compliance"
- "close investment holding company property lettings"
- "FIC dividend declaration board resolution"

## Format spec

- **Schema:** FAQPage (auto-emitted from frontmatter faqs:). Article schema.
- **Tables required:** (1) Share-class design summary (class / rights / typical holder / income routing); (2) CIHC determination comparison (connected vs unconnected tenant, CT rate impact); (3) Annual CT compliance cycle (deadline table from worked-example data above); (4) Worked CT computation with income routing to each share class.
- **Calculator embeds:** No directly relevant calculator in the fleet for FIC mechanics. Reference /calculators/incorporation-cost-calculator with a note that it models standard SPV incorporation; FIC-specific modelling requires specialist advice.
- **Lead form segment:** `family-investment-company` or `portfolio-landlord` -- high-wealth planning audience.
- **Internal links OUT:**
  - `portfolio-landlord-tax-planning-strategy-guide` (this wave, A1 PILLAR -- link in intro and at the "whole-portfolio strategy" cross-link signpost; conductor ruling)
  - `family-investment-company-property-worth-it` (is-it-worth-it decision page -- one-line signpost only; scope guard)
  - `fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics` (IHT value-freeze -- one-line signpost only; scope guard)
  - `profit-extraction-buy-to-let-limited-company-salary-dividends` (this wave, A6 -- for readers who want the full salary/dividend decision tool for a simpler SPV)
  - `buy-to-let-limited-company-complete-guide-uk` (for readers who want the broader SPV introduction)
- **Internal links IN:** A1 pillar links to this page (conductor ruling).
- **Scope guards (enforce at write time):**
  - NO IHT mechanics beyond one-line signpost.
  - NO "should I form a FIC?" analysis beyond one-line signpost.
  - NO full profit-extraction worked maths by band (that is A6); only the illustrative CT-then-distribution flow.
- **Target depth:** 1,800-2,200 words body. Mechanistic and precise -- this is an operational explainer, not a strategic overview. Tables and step-by-step processes preferred over long prose.

## Anti-templating cross-check

This page owns the "how does it work operationally" angle. Checks:
- A1 pillar (portfolio strategy) has only a one-paragraph FIC-vs-SPV distinction; does not cover share-class drafting, CIHC determination, or CT compliance. No overlap.
- A6 (profit extraction) is for standard BTL SPVs and covers salary/dividend/pension decision maths; does not cover the alphabet-share FIC income-routing mechanism. No overlap.
- FIC estate-planning page owns IHT value-freeze; not touched here.
- No em-dashes in body. No named experts. Lead form at footer.

## Work log

Stage 2 extension 2026-07-08: all 3 Stage 1 seed competitor URLs dead (404/ECONNREFUSED). Replaced with 2 verified-live competitor URLs (BDO, Saffery). Kirkrice produced no content. 3 deleted / 2 verified live.

HP DRIFT CAUGHT (F-42): Stage 1 brief cited CA 2006 s.629 as "variation of class rights." WebFetch confirmed s.629 is "Classes of shares" (definitional); s.630 is "Variation of class rights: companies having a share capital." Corrected throughout this brief. Flag raised in wave10_site_wide_flags.md as F-42 BRIEF_DRIFT.

Statute verifications 2026-07-08: CTA 2010 s.18N (CIHC qualifying-purpose exclusion) -- confirmed HTTP 200; key wording confirmed. CA 2006 s.18 (articles) -- confirmed HTTP 200. CA 2006 s.630 (variation of class rights, correct section) -- confirmed HTTP 200. ITTOIA 2005 s.624 (settlements legislation) -- confirmed HTTP 200. CTA 2010 s.455 (DLA charge, rate-by-reference mechanism) -- confirmed HTTP 200 with verbatim wording. HMRC CTM60700 -- confirmed HTTP 200.

Dividend rates: 10.75%/35.75%/39.35% per Stage 1b lock; additional rate correctly attributed to FA 2022, not FA 2026.
