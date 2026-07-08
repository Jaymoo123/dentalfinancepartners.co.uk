---
slug: family-investment-company-mechanics-share-classes-property
category: incorporation-and-company-structures
intent: Property owners who have decided to form (or already operate) a family investment company and want to understand the operational mechanics: how share classes are engineered, how income is routed to different family members, how the founder retains control, and what the CT compliance picture looks like. This is "how does it actually work inside?" not "should I do it?" and not "what does it do for IHT?".
---
# Family Investment Company: Share Class Mechanics, Income Routing and CT Compliance for Property Owners

## Statutory anchor

- **Primary:** Companies Act 2006 s.18 (articles of association -- default and bespoke); CA 2006 ss.560-577 (share classes, allotment, rights variation -- equity structure mechanics); CTA 2010 s.18N + ss.18N-Q (close investment-holding company definition and exclusions -- determines whether 19% small-profits rate is available or locked at 25% main rate); CTA 2010 s.455 (close-company loan charge on overdrawn director's loan accounts); ITTOIA 2005 s.624 + s.626 (settlements legislation attribution + spouse exception).
- **Supporting:** CTA 2009 Pt 4 (property income for companies -- deductibility of expenses, interest in full unlike s.24 for individuals); CA 2006 ss.288-300 (written resolutions + board resolutions -- the governance mechanic for dividend declarations); CA 2006 s.392 (year-end accounting reference); CA 2006 ss.113-128 (statutory registers -- register of members, PSC); ITA 2007 s.8 as substituted by FA 2026 s.4 (dividend rates 2026/27: basic 10.75%, higher 35.75%, additional 39.35% -- VERIFY at write time); FA 2026 ss.6-7 (property income surcharge 2027/28 -- affects personal-side modelling for shareholder-recipients of dividends who also have personal letting income).
- **House position reference:** §21.5 (FIC mechanics generic -- articles, board governance, close-company income tax profile, IHT exclusion of investment FICs from BPR, CIHC status); §21.2 (alphabet shares + settlements legislation s.624 + Jones v Garnett Arctic Systems carve-out; child share attribution; growth vs preference share design); §21.A (CT three-figure framework -- small profits 19%/£50k, marginal relief £50k-£250k, main rate 25%/£250k+; CIHC exclusion locks to 25%); §21.1 (DLA mechanics, HMRC official rate on credit balance, s.455 charge rate 35.75% from 6 April 2026 for loans made on or after that date); §21.4 (dividend extraction sequence from property SPV -- reuse framework for FIC context).

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
7. How does the director retain control despite gifting economic growth -- what provisions in the articles preserve founder control (casting vote, reserved matters requiring founder-class consent, class-consent requirements for variation of rights)?
8. What is the annual CT compliance cycle for a property FIC -- CT600 due 12 months after year end, payment due 9 months and 1 day after year end, iXBRL accounts, Companies House filings?
9. When does the close-company s.455 charge arise (35.75% from 6 April 2026 on overdrawn DLA, repaid 9 months after year-end) and how is it relieved on repayment?
10. What cross-links should the reader follow for the "should I form a FIC?" decision (links to worth-it page), for the IHT value-freeze strategy (links to fic-estate-planning page), and for whole-portfolio strategic context (links to A1 pillar)?

## Manager pre-decisions placeholder

- **Category routing:** `incorporation-and-company-structures` -- correct cluster for company mechanics; confirms against live route dirs.
- **CIHC status test:** verify CTA 2010 ss.18N-18Q at legislation.gov.uk at write time; focus on the "qualifying-purpose" carve-out (letting to unconnected tenants) that most BTL property FICs rely on to access small-profits banding.
- **Dividend rates 2026/27:** Stage 2 MUST verify FA 2026 s.4 rates at legislation.gov.uk before writing. Per memory lock: 10.75% / 35.75% / 39.35%. Confirm with verbatim cite.
- **s.455 rate 2026/27:** 35.75% for loans made on or after 6 April 2026 (per §21.1 F-9 lock). Verify at write time.
- **Articles mechanics:** cite CA 2006 s.18 (bespoke articles), s.629 (variation of class rights), s.288 (written resolutions). Stage 2 verifies these section numbers at legislation.gov.uk.
- **IHT MUST NOT be covered on this page** (that is fic-estate-planning's territory). The only permitted IHT reference is a one-line cross-link signpost: "For the IHT value-freeze strategy using this share structure, see [fic-estate-planning page]."
- **"Worth it?" framing MUST NOT be on this page.** No entry-cost analysis, no "should you form a FIC", no FIC-vs-personal-ownership comparison. One-line signpost to worth-it page is permitted.
- **Cross-link INTO A1 pillar:** this page must include a signposted link to `portfolio-landlord-tax-planning-strategy-guide` for whole-portfolio strategy context (conductor ruling).
- **Scope of worked example:** a brief CT computation (rental income, deductible expenses, CT at 19%/25% depending on CIHC status, retained vs distributed) illustrates the income-routing flow. Not a full profit-extraction decision tool (that is A6).

## Stage 2 research target list

- Competitor pages to fetch and verify live (Stage 2 confirms HTTP 200 + on-topic):
  1. `https://www.taxinsider.co.uk/property-tax/family-investment-company-mechanics` -- check for share-class and income-routing depth.
  2. `https://www.propertytaxinsider.co.uk/family-investment-company` -- niche specialist; check CT compliance coverage.
  3. `https://www.1to1tax.co.uk/fic-property` or similar specialist FIC adviser -- check for CIHC treatment and articles mechanics.
- HMRC manual anchors for Stage 2 verification:
  - CTM60700+ (close companies -- definition, CIHC, s.455 charge mechanics and repayment).
  - CTM01400+ (CT computation for investment companies -- rental income, deductible expenses, CT rate determination).
  - HMRC guidance: "Set up and run a limited company: directors' responsibilities" -- gov.uk, for board-resolution mechanics reference.
- Legislation.gov.uk checks: CTA 2010 s.18N (CIHC definition + qualifying-purpose exclusion); CA 2006 s.629 (variation of class rights); ITTOIA 2005 s.624-626 (settlements legislation + spouse exception).

## Universal rules + workflow stubs

- No em-dashes anywhere in the body.
- No named experts or quoted individuals.
- Lead form auto-injected at footer; no duplicate in body.
- Semantic HTML only in body; no utility CSS classes.
- All statutory citations verified against legislation.gov.uk at write time (§16.35 discipline).
- Stage 2 fills: competitor URL live-check, existing FIC sibling page content check (a-complete-guide + fic-articles + fic-growth-shares), HMRC manual cross-check, CIHC worked example, settlements s.624 note.
- IHT and "worth it?" scope guards must be respected at RUN time; writer checks against fic-estate-planning and worth-it pages before submitting.

## Work log

(Stage 2 + RUN populate.)
