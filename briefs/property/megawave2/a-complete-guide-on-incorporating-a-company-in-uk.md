---
slug: a-complete-guide-on-incorporating-a-company-in-uk
category: incorporation-and-company-structures
intent: A landlord searching this query wants the end-to-end Companies House registration process for a UK property company (CA 2006 formation mechanics) framed for a BTL-SPV / property-portfolio context. They want the post-ECCTA-2023 ID-verification + ACSP route, the registered-email + lawful-purposes-statement obligations, and what a property landlord should specifically pre-decide before submitting the IN01 (share classes, registered office, SIC code, articles, PSC declarations). This page sits at the operational-mechanics layer of the incorporation-and-company-structures pillar, not at the should-I-incorporate decision layer.
---

# How to Incorporate a UK Property Company: Companies House Registration Process for Landlords (Post-ECCTA 2023)

## Statutory anchor

- **Primary:** Companies Act 2006 Part 2 (Company formation, ss.7-16) — formation procedure: method of forming a company; memorandum of association; application for registration; registration documents; statement of capital and initial shareholdings; statement of guarantee; statement of proposed officers; statement of compliance; registration; issue of certificate of incorporation; effect of registration. **Stage 2 must verify precise section numbers + headings at write time per §16.35 (WebFetch against legislation.gov.uk currently returning JS-anti-bot 202 in env — Stage 2 to re-verify via browser or alternative legislation.gov.uk gateway).**
- **Supporting:** Economic Crime and Corporate Transparency Act 2023 (ECCTA 2023) Part 1 ss.2-7 (identity verification at incorporation; disqualification checks at formation) — verified at house_positions §11.A on 2026-05-25 against `https://www.legislation.gov.uk/ukpga/2023/56/contents`. CA 2006 ss.28-30 amendments via ECCTA (registered office + registered email address requirements). ECCTA Part 1 ss.59-63 (confirmation statement + lawful purposes statement) — commencement 4 March 2024 per §11.A.
- **Supporting (property-specific):** TCGA 1992 s.162 (incorporation relief — relevant for landlords transferring existing portfolios into a newly formed company; covered at depth in existing pages `section-162-incorporation-relief-property-landlords` and `incorporate-rental-property-without-cgt`; this page references but does NOT duplicate). CTA 2010 ss.18A-N (FA 2021 architecture — relevant for SIC-code + activity declaration impact on small profits rate eligibility; §21.A locked framework).
- **House position reference:** §11 (Companies House reforms / ECCTA / RoE — locked timeline + ACSP framework); §11.A (ECCTA 2023 + ECTEA 2022 statutory-section depth — Wave 9 lock); §21.1 (Directors' loan accounts — credit balance from s.162 incorporation transfer, relevant for the initial-share-capital + director-loan structure decisions made at formation); §21.4 (salary vs dividends 2026/27 framework — relevant for choosing share classes at incorporation); §21.A (FA 2021 CT three-figure framework + associated-companies divisor — critical for landlords forming a second / third / Nth SPV who must understand the SPR-band sharing implication BEFORE incorporation).

## Framing differentiator (anti-templating, anti-cannibalisation)

This page is the **Companies House registration mechanics** guide for property landlords, NOT a should-I-incorporate decision guide and NOT a tax-impact-of-incorporation guide. Closest existing pages on our site cover the decision layer (`should-i-incorporate-buy-to-let-portfolio-2026`, `incorporation-timing-when-to-incorporate-property-portfolio`, `2027-tax-rates-incorporation-decision-property-landlords`, `landlord-incorporation-step-by-step-guide-uk`) and the tax-mechanics layer (`section-162-incorporation-relief-property-landlords`, `incorporate-rental-property-without-cgt`, `sdlt-incorporation-stamp-duty-twice`, `incorporation-holdover-relief-property`). None of them walk the reader through the CA 2006 ss.7-16 formation-document checklist + ECCTA-era ID-verification gates + post-incorporation-Day-1 obligations specifically for a property SPV.

The angle this page takes: a landlord has DECIDED to incorporate (decision-layer pages covered that) and has DECIDED on the tax route (s.162 / phased transfer / new SPV — tax-mechanics pages covered those). Now what do they actually file with Companies House, in what order, and what property-SPV-specific configuration choices do they make at IN01 stage? This is the Companies House operational layer that the existing 30+ incorporation pages skip past.

## Key questions this page must answer

1. What documents must I submit to Companies House to form a UK property company (CA 2006 ss.9-13 application + memorandum + articles + statements of capital, officers, compliance)?
2. Do I need to verify my identity at incorporation under ECCTA 2023, and what counts as accepted ID (direct CH route vs ACSP route per §11.A)?
3. What SIC code should a BTL property company use, and does the SIC-code choice affect CIHC classification or SPR eligibility (cross-reference §21.5 CIHC qualifying-purpose carve-out at s.18N(2)(b) + §21.A associated-companies divisor)?
4. Should I incorporate with a single share class or alphabet shares (A/B/C dividend-control structure per §21.2), and can I change this later? What share capital level is appropriate for a property SPV at formation?
5. What do I declare as registered office and registered email under the post-4-March-2024 "appropriate address" rule (§11.A: PO boxes do NOT qualify)?
6. Who must I name as PSC at incorporation, and what triggers PSC ID-verification under ECCTA?
7. What is the lawful-purposes statement I attest to on each future confirmation statement, and what counts as a breach?
8. What is the typical Day-1-after-incorporation checklist for a property SPV: open bank account, register for Corporation Tax with HMRC (3-month window), choose accounting reference date, decide year-end alignment with personal tax year, set up a director's loan agreement if seeding the company with capital?
9. If I'm incorporating an existing rental portfolio under s.162 (cross-reference `section-162-incorporation-relief-property-landlords`), in what order must the Companies House formation happen relative to the property transfer + mortgage refinance + SDLT timing?
10. What are the common Companies House formation errors that cost landlords time / fees (rejected IN01s for SIC-code conflicts, articles inconsistencies, share-capital arithmetic errors, registered-office non-conformance)?

## Manager pre-decisions placeholder

- **Category routing:** `incorporation-and-company-structures` (matches live route at `Property/web/src/app/blog/incorporation-and-company-structures/`).
- **Worked-example numbers:** none. This is a process / mechanics page, not a rate-by-reference page. Stage 2 to confirm zero rate-by-reference numbers slip in (any £ figures used in examples must be illustrative-only and noted as such).
- **Cross-link targets (within MW2 + to existing pages):**
  - Within MW2 Bucket A: `a-guide-for-shareholders-in-the-uk` (A2 — what shareholders do post-incorporation), `corporate-tax-planning-strategies-for-uk-clients` (A4 — strategy layer after formation), `corporation-tax-marginal-relief-uk-guide` (A5 — what marginal relief means for the newly-incorporated SPV), `directors-loan-accountsdla-uk-guide` (A6 — DLA setup at formation), `register-for-uk-corporation-tax` (A17 — the 3-month-after-incorporation HMRC registration), `limited-companies` (A12 — generic landlord LtdCo pillar).
  - Within MW2 Bucket B: `a-complete-guide-to-identity-verification-in-uk` (B2 — ID verification deep-dive), `companies-house-id-verification-begins-today` (B7), `confirmation-statements` (B12 — the post-incorporation annual filing).
  - To existing pages: `landlord-incorporation-step-by-step-guide-uk` (decision-layer sibling), `incorporating-property-portfolio-uk-2026` (portfolio-transfer pathway), `section-162-incorporation-relief-property-landlords` (tax-mechanics sibling), `eccta-2023-id-verification-mandatory-companies-house-2025-2026-landlord-ltdcos` (ID-verification operational sibling), `companies-house-confirmation-statement-changes-2024-onwards-psc-disclosure` (post-incorporation filing sibling).

## Stage 2 research target list

- **Competitor pages to fetch (live URLs only — Stage 2 verifies before listing):**
  - Companies House campaign page on incorporation post-ECCTA: `https://changestoukcompanylaw.campaign.gov.uk/` (corrected primary tracker per §11.A F-12; do NOT use the deprecated `https://www.gov.uk/government/news/changes-to-uk-company-law` which returns HTTP 404).
  - gov.uk "Set up a limited company: step by step" — Stage 2 to verify live URL via search.
  - Competitor accountancy-firm incorporation guides — Stage 2 to source from `competitor_serps` Supabase table filtering for incorporation-process intent.
  - 1-2 property-landlord-specific incorporation walkthroughs (Stage 2 must verify URLs live; Bug #3 + #5 from Wave 8/9 — dead competitor URLs to be omitted, not retained).
- **HMRC + Companies House manual anchors:**
  - Companies House guidance GP1 (incorporation) + GP2 (life of a company) per §11.A.
  - Companies House blog `https://companieshouse.blog.gov.uk/` for current operational status of phased rollout (ID-verification deadlines, ACSP availability) — §11.A secondary tracker.
  - HMRC CTM (Corporation Tax Manual) on company formation + first-period mechanics.
- **Case-law to ground:** generally none for this mechanics topic. If Stage 2 finds incorporation-related tribunal cases on the SIC-code-affecting-tax angle, document.
- **Authority links to cite:**
  - legislation.gov.uk CA 2006 Part 2 ss.7-16 contents page.
  - legislation.gov.uk ECCTA 2023 Part 1 contents page (https://www.legislation.gov.uk/ukpga/2023/56/contents).
  - Companies House `https://www.gov.uk/government/organisations/companies-house` and the dedicated changes-to-UK-company-law campaign page.
  - HMRC CT registration guidance + the 3-month window rule.

## Universal rules + workflow stubs (Stage 2 fills)

[Stage 2 populates from NETNEW_PROGRAM §4 brief anatomy + §7 19-step workflow.]

## Work log (Stage 2 + RUN session populate)

[Stage 2 + RUN session record their work here.]

---

## Stage 1 seed work log

- **Stage 1 author:** MW2 Stage 1 Sub-Agent A (batch M2-A-B1) on 2026-05-26.
- **Cluster anchor:** Incorporation mechanics. Differentiation framing: operational Companies House registration layer (CA 2006 ss.7-16 + ECCTA ID-verification gates + ACSP route + post-incorporation Day-1 checklist), distinct from existing decision-layer + tax-mechanics-layer pages.
- **HP-lock alignment:** §11 + §11.A (ECCTA + ID verification + ACSP) primary anchors; §21.1 (DLA at formation), §21.2 (share-class decisions at IN01), §21.4 + §21.A (CT framework affecting SIC code + associated-companies divisor decision at multi-SPV formation) secondary anchors. No NEW HP LOCK NEEDED — fully covered by existing locks.
- **§16.35 per-write verification note:** WebFetch against `legislation.gov.uk` returning HTTP 202 with JS-anti-bot stub in current env. Statutory citations in this seed are anchored to locked HP positions (verified 2026-05-25 per §11.A) for ECCTA + CTA 2010; CA 2006 Part 2 ss.7-16 citations are conventional but Stage 2 to verify precise section numbers + headings against legislation.gov.uk at write time per §16.35.
- **Cannibalisation reasoning:** 30+ existing pages on incorporation; this page differentiated by operational-Companies-House-mechanics framing (the "what do I actually file" layer), not decision or tax mechanics. Cross-linking strategy outlined in Manager pre-decisions section. No CANNIBAL flag — pages co-exist as a coherent pillar architecture.
