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

## Stage 2 research target list — VERIFIED URLs

### Authority URLs (WebFetch-verified live 2026-05-27)

- **`https://www.gov.uk/set-up-limited-company`** — gov.uk "Set up a limited company: step by step" landing page. Verbatim quote (verified 2026-05-27): "You'll need to register an official address and choose a SIC code - this identifies what your company does." Covers memorandum, articles, statement of capital, statement of guarantee. Does NOT explicitly mention ECCTA / identity verification at the introductory layer; ECCTA detail lives at the campaign-tracker URL below. Takeaway: cite for the formation-document checklist (memorandum + articles + statements of capital / guarantee).
- **`https://www.gov.uk/limited-company-formation`** — gov.uk introductory page; covers what a private limited company is + the 9-step process flow. Verbatim: "A limited company is one way to set up a business. It is legally separate from the people who own it." Takeaway: cite for the conceptual scaffold ("what is a UK Ltd Co") and the existence of a structured 9-step gov.uk pathway readers can follow.
- **`https://www.gov.uk/government/publications/incorporation-and-names`** — Companies House guidance on incorporation + naming rules. Updated **1 February 2026**. Includes "Incorporation and names" (HTML) + Annex A (sensitive words) + Annexes B + C. Verbatim: "To incorporate your company by post, you must file an application to register a company (form IN01) and the correct fee." Also: "The name of a private company limited by shares or guarantee must end with 'limited' or 'Ltd'." Takeaway: cite for IN01 mechanics + sensitive-words rules + statutory name suffixes.
- **`https://changestoukcompanylaw.campaign.gov.uk/`** — Companies House ECCTA tracker. Verified live. Verbatim: "Anyone setting up, running, owning or controlling a company in the UK must verify their identity." Also: "All third-party providers will need to register their business as an Authorised Corporate Service Provider (ACSP) before they can submit information on behalf of clients." Fee changes effective 1 February 2026 referenced. Takeaway: cite as the primary tracker per §11.A F-12; RUN session WebFetches at write time to verify any commencement-date claims (campaign page is updated as rollout progresses).
- **`https://www.gov.uk/government/publications/incorporation-and-names/incorporation-and-names`** — the deep guidance text on incorporation procedure, name approval gates, application methods (online / software / postal). Verified live 2026-05-27. Takeaway: cite for the procedural depth.

### Competitor URLs (session-side WebSearch at write time)

`<!-- competitor section: session-side WebSearch at write time required. Stage 2 verified zero live competitor URLs out of 5 attempted (provestor 404, lesstax4landlords 404, gosimpletax 403, simplybusiness 404, companywizard 404). Wave 8 F-1 + Wave 9 Bucket C 5/5 dead rate pattern recurs; RUN session must source via Google Search / Bing Search at write time and re-verify with httpx + BeautifulSoup before citing. Recommended search queries: "set up limited company UK landlord buy to let SPV 2026", "Companies House ECCTA identity verification SPV". -->`

### HMRC + Companies House manual anchors

- HMRC Corporation Tax Manual (CTM) — section indices on company formation + first-accounting-period mechanics.
- Companies House blog `https://companieshouse.blog.gov.uk/` — operational-rollout posts on ID verification + ACSP phased commencement (RUN session WebFetches for current operational status at write time).
- Companies House `https://www.gov.uk/government/organisations/companies-house` — landing page for the operating organisation (RUN session uses as routing root for sub-guidance lookups).

### Case-law

Generally none for this mechanics topic. RUN session does NOT need to research case-law for the formation-mechanics layer.

### Legislation anchors (statute citations RUN session must verify at write time)

- **CA 2006 Part 2 ss.7-16** — formation procedure (method of forming + memorandum + application + statements of capital, guarantee, proposed officers, compliance + registration + certificate + effect of registration).
- **ECCTA 2023 Part 1 ss.2-7** — identity verification at incorporation. RUN session WebFetches `https://www.legislation.gov.uk/ukpga/2023/56/contents` at write time per §16.35 (if env-blocks JS-anti-bot, use alternate gateway or trust §11.A HP lock).
- **ECCTA 2023 amendments to CA 2006 ss.28-30** (registered office + registered email address requirements) + **ss.59-63** (confirmation statement + lawful purposes statement).
- **TCGA 1992 s.162** (incorporation relief — cross-reference for SPV-formation-from-existing-portfolio scenarios; deep mechanics live at existing `section-162-incorporation-relief-property-landlords` page; this page references but does NOT duplicate).
- **CTA 2010 ss.18A-N** (FA 2021 small-profits + marginal-relief + CIHC framework — relevant for SIC-code declaration + associated-companies divisor decisions made AT formation per §21.A).

## Worked-example data (RUN session uses these as canvas)

### Example 1 — Single-SPV BTL formation (founder + spouse)

- **Founder** Anil Patel and **spouse** Meera Patel form a new BTL SPV "Patel Property Holdings Ltd" to acquire a single BTL flat in Manchester.
- IN01 filed online via the Companies House WebFiling service. Total formation fee: **£50** (1 February 2026 uplift per campaign-page note above) for the standard online incorporation — RUN session verifies current fee at write time per §16.27 rate-by-reference.
- Share class: 100 ordinary £1 shares, 50 to Anil, 50 to Meera. Single class chosen (no alphabet shares at formation) to preserve simplicity; can be sub-divided into A/B classes later via special resolution if dividend-allocation flexibility becomes needed (cross-reference §21.2).
- SIC code: **68209** (Other letting and operating of own or leased real estate) — RUN session verifies current SIC code list at write time.
- Registered office: a commercial accountant-managed service address in central Manchester (NOT a residential address; appropriate-address rule per ECCTA + §11.A).
- Registered email: founder's secure incorporated-business email (NOT a personal Gmail — gov.uk guidance on lawful purposes; ECCTA s.28-30 amendments).
- PSC declarations: Anil + Meera both declared (each owns 50% ordinary shares). Both must subsequently verify identity under ECCTA Part 1 timetable (RUN session verifies current commencement state at the campaign page).
- Day-1 checklist after incorporation: (a) open business bank account (presents certificate of incorporation + memorandum / articles to bank); (b) register for Corporation Tax with HMRC within **3 months** of starting to trade or holding non-trade-income assets; (c) choose accounting reference date (typically the last day of the month of incorporation); (d) draw up director's loan agreement for any founder-injected capital used to fund the first-property deposit; (e) consider whether to formally adopt company-specific bespoke articles or default Model Articles.

### Example 2 — Multi-SPV incorporation with associated-companies impact

- **Existing operator** Mr Mawell already owns "Mawell Holdings Ltd" (parent) and two trading SPVs ("Mawell Estates 1 Ltd", "Mawell Estates 2 Ltd"). He incorporates a third SPV "Mawell Estates 3 Ltd" today.
- **Associated-companies impact** (§21.A / CTA 2010 s.18E): for the new SPV's accounting period beginning today, the marginal-relief lower limit (£50,000) and upper limit (£250,000) are divided by **1 + 3 associated companies** = 4. So Mawell Estates 3 Ltd's effective lower limit is **£12,500** and upper limit is **£62,500**.
- **Practical consequence:** Mr Mawell should NOT incorporate a new SPV thoughtlessly. Each additional associated company shrinks the SPR / marginal-relief band for ALL SPVs in the group. RUN session must surface this at IN01-decision stage (cross-link forward to A4 + A5 + the existing `corporation-tax-marginal-relief-property-companies` page).

### Example 3 — Incorporation under TCGA 1992 s.162 from existing portfolio

- **Mrs Kapoor** holds 6 BTL properties personally with combined market value £1.8m. She incorporates "Kapoor Property Holdings Ltd" today and immediately transfers all 6 properties to the new company in exchange for shares (s.162 incorporation relief — gain rolled into share base cost; SDLT separately payable on transfer per `sdlt-incorporation-stamp-duty-twice` existing page).
- **Companies House sequence:** incorporation first (IN01 filed; certificate of incorporation received within 24 hours via online formation). THEN property transfer executed (TR1 forms with Land Registry; mortgage refinance triggers SDLT). DLA credit balance created on the day-of-transfer for the value differential (cross-reference §21.1 + A6 DLA pick).
- **Critical sequencing point:** the company MUST exist at Companies House BEFORE the property transfer is executed (you cannot transfer property TO a non-existent entity). This is the operational-mechanics layer that the decision-layer pages skip — RUN session emphasises this point as a common operational failure mode.

## FAQ expansion (RUN session polishes prose; 10-12 FAQs target)

1. **Q: What documents do I need to file with Companies House to form a UK property company?**
   A: You file form IN01 (application to register a company) together with the company's memorandum of association, articles of association, a statement of capital and initial shareholdings (for share companies), and a statement of proposed officers. Most formations are completed online via the Companies House WebFiling service. The statutory anchors are CA 2006 ss.9-13 covering the application + memorandum + initial-state-of-company requirements.

2. **Q: Do I need to verify my identity at incorporation under the new ECCTA rules?**
   A: Yes. The Economic Crime and Corporate Transparency Act 2023 requires anyone setting up, running, owning or controlling a UK company to verify their identity. You can do this directly with Companies House (free, online via the GOV.UK One Login route) or through an Authorised Corporate Service Provider (ACSP — typically your accountant or formation agent). The phased rollout has reached mandatory identity verification for new incorporations; you should verify your current commencement state at the Companies House campaign tracker before assuming a specific date applies to your filing.

3. **Q: What SIC code should I use for a BTL property company?**
   A: The most common SIC code for a buy-to-let property company is 68209 (Other letting and operating of own or leased real estate). Property-development companies typically use 41100 (Development of building projects). The SIC code is a self-declaration; HMRC will treat your company's activity by substance regardless of the SIC code chosen, but the SIC code does drive Companies House classification and some downstream regulatory routings. You can update your SIC code annually via the confirmation statement if your activity changes.

4. **Q: Should I incorporate with a single share class or alphabet shares from day one?**
   A: For a single-founder or founder-plus-spouse property SPV, a single class of ordinary shares is usually appropriate at formation. Alphabet shares (A / B / C dividend classes) become useful when you want differential dividend declarations to different family-member shareholders, or when you anticipate bringing in adult children or other investors with different economic rights. You can sub-divide a single class into alphabet classes later via a special resolution amending the articles, so there is no urgency to over-engineer the share capital at IN01 stage. The settlements legislation (ITTOIA 2005 s.624) and the *Jones v Garnett* spouse exception apply to whichever structure you choose; this is covered in our guide for shareholders.

5. **Q: What address can I use as the registered office of a property company?**
   A: Under the ECCTA-era "appropriate address" rule (CA 2006 s.28 as amended by ECCTA 2023), the registered office must be a physical address at which documents delivered there can be expected to come to the attention of a person acting on behalf of the company, and where delivery can be acknowledged. A PO Box does NOT qualify. You can use your home address (visible publicly), a commercial registered-office service from your accountant or a formation agent, or your business premises. You must also provide a registered email address to which Companies House can send official notifications; a personal Gmail account is not appropriate. The "lawful purposes statement" is attested on each future confirmation statement.

6. **Q: Who must I declare as a person with significant control (PSC) at incorporation?**
   A: Any individual who directly or indirectly holds more than 25% of the shares, holds more than 25% of voting rights, has the right to appoint or remove a majority of directors, or otherwise exercises significant influence or control over the company. For a typical husband-and-wife BTL SPV with a 50:50 share split, both spouses are PSCs. The PSC information goes on the IN01 form and is published on the public register; PSCs must also verify their identity under ECCTA Part 1.

7. **Q: What is the typical Day-1-after-incorporation checklist for a property SPV?**
   A: Open a business bank account using the certificate of incorporation and articles. Register for Corporation Tax with HMRC within 3 months of starting to trade or holding income-producing assets (the HMRC 3-month window is automatic notice but the 3-month registration deadline runs from "becoming active"). Choose an accounting reference date (usually the last day of the month of incorporation, which can be aligned with your personal tax year-end if helpful for cash-flow planning). Draw up a director's loan agreement covering any founder-injected capital. If you intend to immediately transfer an existing portfolio in under TCGA 1992 s.162, your conveyancer needs the new company's certificate of incorporation and bank details before they can execute TR1s with the Land Registry.

8. **Q: If I'm incorporating an existing rental portfolio under s.162, in what order must Companies House formation happen relative to the property transfer?**
   A: Companies House formation must complete BEFORE the property transfer. You cannot transfer property to a non-existent entity. The operational sequence is: (1) file IN01, receive certificate of incorporation (typically within 24 hours for online formations); (2) open business bank account in the new company's name; (3) refinance / arrange new mortgages where the lender requires the new company as borrower; (4) execute TR1 transfer forms with the Land Registry simultaneously with mortgage drawdown; (5) record DLA credit balance for the value differential between the s.162-relieved gain rollover and the consideration shares + any cash element. SDLT is payable on the transfer (chargeable consideration includes the market value of assets transferred to a connected party — `sdlt-incorporation-stamp-duty-twice` covers the mechanic).

9. **Q: What are the common Companies House formation errors that cost landlords time and fees?**
   A: The most frequent rejections at IN01 stage are: (a) name conflicts with sensitive-words rules or with an existing same-name company; (b) inconsistencies between the statement of capital and the articles (e.g., declaring 1,000 issued shares but articles only authorising 100); (c) missing or invalid PSC declarations where a 25%+ shareholder is not named; (d) registered-office addresses that fail the appropriate-address rule (PO Boxes, residential addresses occupied by someone else, virtual offices that are not authorised to act for the company); (e) incomplete director identification under ECCTA Part 1. Each rejection wastes the £50 filing fee and several days while a corrected IN01 is re-filed.

10. **Q: How does the choice of SIC code or share structure at incorporation affect my Corporation Tax position?**
    A: The SIC code itself does not bind your tax treatment — HMRC taxes by substance, not by SIC declaration. However, the company's status as a close investment-holding company (CIHC) under CTA 2010 s.18N can deny access to the small profits rate and marginal relief, leaving the company on the 25% main rate regardless of profit level. A property-investment SPV that lets entirely to unconnected tenants on commercial terms is OUT of CIHC (qualifying-purpose carve-out at s.18N(2)(b) + s.18N(3)) — a property-investment SPV that lets to family members at below-market rates risks CIHC classification. The lower / upper marginal-relief limits (£50,000 / £250,000) are divided by 1 + N where N is the number of associated companies (s.18E), so each additional SPV you incorporate shrinks the marginal-relief band for ALL associated SPVs. This is the most-misunderstood multi-SPV planning interaction.

11. **Q: Can I incorporate a UK property company if I'm a non-resident director?**
    A: Yes. UK company law (CA 2006 s.155) requires at least one director who is a natural person, but there is no UK residence requirement for directors. Non-resident directors must still verify their identity under ECCTA Part 1. The company itself can be UK-resident for Corporation Tax purposes regardless of director residence (incorporation in the UK confers UK CT residence by default under CTA 2010 s.14). Non-resident director arrangements should be checked against the Statutory Residence Test for individual tax purposes and any relevant double tax treaty.

12. **Q: How does this page differ from the existing `landlord-incorporation-step-by-step-guide-uk` page?**
    A: That existing page is a decision-layer guide answering "should I incorporate my BTL portfolio". This page assumes the decision is made (and the tax route is chosen — covered on `section-162-incorporation-relief-property-landlords` and siblings) and walks through what you actually file with Companies House, in what order, with what property-SPV-specific configuration choices at IN01 stage. The two pages are complementary: read the decision-layer guide first to decide whether to incorporate; read this page when you are ready to execute the formation itself.

## Universal rules + workflow stubs (RUN session follows)

### Voice + style (verbatim per §4.8)

- **No em-dashes** in body copy (use commas, parentheses, full stops, or middle dots).
- **Specific over generic.** Named legislation; named cases; specific section numbers; anonymised personas with invented surnames (Patel, Mawell, Singh, etc).
- **No real names.** No specific client identifiers, NHS Trusts, agencies, tenant disputes, or firm names.
- **Lead-gen architecture:** `<LeadForm>` is auto-injected at the page footer; do NOT duplicate a contact form in the body.
- **CSS in markdown:** semantic HTML only (`<aside>`, `<p>`, `<h2>`, etc.); NO Tailwind classes in markdown body.
- **FAQs:** 10-14 entries in frontmatter `faqs:` array; auto-emitted as FAQPage JSON-LD.
- **Anti-templating:** vary H2 phrasing, opening paragraphs, FAQ phrasing across the bucket; this page leads with the operational-mechanics framing distinct from decision-layer and tax-mechanics-layer siblings.
- **Quality bar (six checks):** 0 em-dashes; 0 Tailwind classes; FAQ schema count == frontmatter faqs[] length; meta title ≤62 chars; meta description ≤158 chars; every internal `/blog/...` link resolves to an existing markdown file.

### 19-step workflow (verbatim per §7)

1. Read `house_positions.md` once at session start (esp §11, §11.A, §11.B, §21.A, §21.5).
2. Claim this page in the wave tracker (`⬜ todo` → `🟡 in_progress` + UTC timestamp).
3. Read this brief (framing differentiator + closest existing + redirect overlap + authority links).
4. Fetch + read each competitor URL via session-side WebSearch at write time (Stage 2 left this section deliberately empty per §16.31; RUN session sources fresh).
5. Read closest-existing pages on our site (`landlord-incorporation-step-by-step-guide-uk`, `incorporating-property-portfolio-uk-2026`, `section-162-incorporation-relief-property-landlords`, `eccta-2023-id-verification-mandatory-companies-house-2025-2026-landlord-ltdcos`).
6. Plan H2 / H3 outline + meta + FAQs + CTA placements (vary per page — anti-templating discipline).
7. Verify factual claims against authorities (gov.uk + legislation.gov.uk + HMRC manuals) per §16.35.
8. Fetch hero image from Pexels via `fetch_image_for_post(query)`.
9. Write the markdown file at `Property/web/content/blog/a-complete-guide-on-incorporating-a-company-in-uk.md` (full frontmatter list per Wave 1 template).
10. Build clean: `cd Property/web && npm run build`.
11. Six verifications (em-dash count, Tailwind count, FAQ schema match, meta length, internal-link resolution).
12. Apply redirect repointing in `middleware.ts` if brief lists overlap (no specific overlap flagged for this slug).
13. Register the new page in `monitored_pages` Supabase table.
14. **Commit on session's branch** (per-page commit; do NOT merge to main until wave-close).
15. Fill in per-page work-log at bottom of this brief.
16. Mark `✅ done` in tracker with 1-line Notes.
17. Append any site-wide issues to wave's flags file.
18. Append discoveries to session's discovery log.
19. Claim next page.

## Work log (Stage 2 + RUN session populate)

[Stage 2 + RUN session record their work here.]

---

## Stage 1 seed work log

- **Stage 1 author:** MW2 Stage 1 Sub-Agent A (batch M2-A-B1) on 2026-05-26.
- **Cluster anchor:** Incorporation mechanics. Differentiation framing: operational Companies House registration layer (CA 2006 ss.7-16 + ECCTA ID-verification gates + ACSP route + post-incorporation Day-1 checklist), distinct from existing decision-layer + tax-mechanics-layer pages.
- **HP-lock alignment:** §11 + §11.A (ECCTA + ID verification + ACSP) primary anchors; §21.1 (DLA at formation), §21.2 (share-class decisions at IN01), §21.4 + §21.A (CT framework affecting SIC code + associated-companies divisor decision at multi-SPV formation) secondary anchors. No NEW HP LOCK NEEDED — fully covered by existing locks.
- **§16.35 per-write verification note:** WebFetch against `legislation.gov.uk` returning HTTP 202 with JS-anti-bot stub in current env. Statutory citations in this seed are anchored to locked HP positions (verified 2026-05-25 per §11.A) for ECCTA + CTA 2010; CA 2006 Part 2 ss.7-16 citations are conventional but Stage 2 to verify precise section numbers + headings against legislation.gov.uk at write time per §16.35.
- **Cannibalisation reasoning:** 30+ existing pages on incorporation; this page differentiated by operational-Companies-House-mechanics framing (the "what do I actually file" layer), not decision or tax mechanics. Cross-linking strategy outlined in Manager pre-decisions section. No CANNIBAL flag — pages co-exist as a coherent pillar architecture.
