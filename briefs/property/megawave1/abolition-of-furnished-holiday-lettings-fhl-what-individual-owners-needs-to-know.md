# MegaWave 1 brief: abolition-of-furnished-holiday-lettings-fhl-what-individual-owners-needs-to-know

**Site:** property
**Bucket:** B (FHL — abolition and transitional rules)
**Session:** B
**Batch:** M1-B-B2
**Pick ID:** B13
**Brief type:** Net-new page (individual-owner action checklist)
**Stage:** 2 (full brief — Stage 1 seed extended 2026-05-26; FA 2025 Sch 5 Parts 1-5 verified verbatim against legislation.gov.uk; commencement at Part 5 paras 12 + 13(4) verified)
**Source markdown path on launch:** `Property/web/content/blog/abolition-of-furnished-holiday-lettings-fhl-what-individual-owners-needs-to-know.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/abolition-of-furnished-holiday-lettings-fhl-what-individual-owners-needs-to-know

---

## Manager pre-decisions

- **Suggested slug:** `abolition-of-furnished-holiday-lettings-fhl-what-individual-owners-needs-to-know` (retain verbatim — slug uses "needs to know" rather than "need to know" to mirror the long-tail SERP query; grammatically-correct phrasing appears in the body).
- **Suggested category:** `property-types-and-specialist-tax` (anchors the FHL cluster). Alternative routing `section-24-and-tax-relief` was considered but the cluster co-location argument prevails.
- **Bucket:** B (FHL — abolition and transitional rules).
- **Cannibalisation classification:** partial overlap with existing FHL-cluster pages. **Mandatory differentiation discipline below.**

### Cannibalisation differentiator (CRITICAL — read before writing)

Existing site FHL-cluster pages:
- `furnished-holiday-let-tax-rules-exemptions` — broad post-abolition rules overview, Section 24 + Tax Relief category, FAQ-heavy.
- `how-much-tax-holiday-let-property-uk` — how-much-tax landing.
- `holiday-let-tax-calculator-fhl-changes` — calculator framing.
- `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics` — capital allowances deep operational page.

THIS new page (B13) sits **between the broad-rules overview and the operational deep pages**: it is written for an individual (not a company) former-FHL owner who needs a numbered checklist of what to do in the 2025/26 SA100 cycle, plus a forward-looking checklist for 2026/27. The page leads with the four-question diagnostic (do you still own; how is title held; is there a mortgage; is there a brought-forward pool / brought-forward losses), runs through the eight items an individual former-FHL owner needs to fix or consider, and routes to the operational deep pages for execution.

**Hard rule:** B13 must explicitly cross-link the rules-overview page (`furnished-holiday-let-tax-rules-exemptions`) as "the rules overview companion" and the capital allowances page as "the operational depth on capital allowances" in the opening section. B13 does NOT re-walk the rules overview or the capital allowances mechanics; B13's territory is the action checklist for the current tax year.

### Framing differentiator (Stage 2, 2026-05-26)

This page is the **individual-owner action checklist** for the post-abolition FHL landscape. Audience: an individual personally-owning former-FHL owner who knows the regime ended in April 2025 and wants a tight, decision-tree guide to what they specifically need to fix on their 2025/26 SA100, what elections to consider, what to stop doing, and which existing arrangements still need attention this year.

The distinguishing angle is **the action-checklist format**, decomposed across eight items:

1. **Section 24 ingress.** The single most important change on the 2025/26 SA100: stop deducting mortgage interest as an expense. The Section 24 tax-credit mechanic (ITA 2007 s.272A as adapted for former FHLs) replaces the full deduction from 6 April 2025. Practical SA100 box reorientation.
2. **Joint-ownership reset (Form 17).** Spouses or civil partners holding a former FHL jointly default to the 50/50 income split for non-FHL property from 6 April 2025. Where the actual beneficial split is different (declaration of trust in place), a Form 17 election is required. Sequencing: declaration of trust drafting → Form 17 filing → 60-day deadline from declaration date.
3. **Loss treatment.** Brought-forward FHL losses survive but are now property-business losses, ring-fenced to the UK or overseas property business as appropriate. The historic sideways relief against general income is lost; the page must explicitly close down the "I can still set FHL losses against my employment income" misconception.
4. **Capital allowances pool grandfathered.** Pre-2025 FHL plant spend in the existing capital allowances pool continues writing down (18% main pool / 6% special-rate pool) under FA 2025 Sch 5 Part 3 + Part 5 transitional provision. Sessions cross-link the operational depth page for execution.
5. **Pension contributions.** Former FHL profit no longer counts as "relevant UK earnings" under FA 2004 s.189 from 2025/26. The £3,600 floor on relief-eligible pension contributions remains (regardless of earnings); anything above requires other relevant earnings. Material for FHL-rich pre-retirement landlords.
6. **CGT on future disposal.** Standard residential CGT (18%/24%) from 6 April 2025 disposal date; no BADR. Anti-forestalling for between-announcement (6 March 2024) and abolition (5 April 2025) disposals already crystallised.
7. **Incorporation modelling.** Section 24 does not bite companies; LtdCo structuring may now be relatively more attractive than pre-abolition. But s.162 CGT incorporation relief, SDLT on incorporation, and ATED must be modelled. Cross-link to `transferring-fhl-portfolio-to-limited-company`.
8. **SDLT additional dwellings surcharge.** 5% additional-dwellings surcharge from 31 October 2024 catches FHL acquisitions; FHL purchasers no longer have any SDLT carve-out post-abolition. Cross-link to existing SDLT-side coverage.

**Stage 1b HP-lock note:** No new HP lock required for B13; the FHL abolition framework is locked at §6 (and the broader §25 capital allowances cluster). Stage 1b conductor may consider a small §6 extension to flag the FA 2025 Sch 5 Part 5 commencement paragraph numbers (paras 12 + 13(4)) but this is cosmetic.

**Pool-thinness disclosure:** competitor coverage of FHL abolition is dense for the 2024-2025 cycle. RSM / BDO / Saffery / Crowe / Smith & Williamson all published FHL-abolition individual-landlord briefings in Q4 2024 and Q1 2025; ICAEW Tax Faculty published member guidance; PropertyMark / PIMS published landlord-side coverage. The defensible point for B13 is **the eight-item action checklist format + the four-question diagnostic + the SA100-cycle-specific timing + the explicit "what to stop doing" list**.

---

## Competitor URLs (Stage 2 populated 2026-05-26; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard `httpx + BeautifulSoup`. Extract treatment of: (a) FA 2025 Sch 5 commencement at Part 5 paras 12 + 13(4); (b) the Section 24 ingress mechanic and the SA100 box reorientation; (c) the Form 17 + 50/50-default joint-ownership reset; (d) the loss-ring-fence change; (e) the capital allowances grandfathering; (f) the pension "relevant UK earnings" change.

- https://www.rsmuk.com/insights/tax-insights/fhl-abolition-landlord-impact
- https://www.bdo.co.uk/en-gb/insights/tax/property/furnished-holiday-let-abolition
- https://www.saffery.com/insights/articles/fhl-abolition-individual-landlords/
- https://www.icaew.com/insights/tax-news/furnished-holiday-lets-abolition
- https://www.gov.uk/government/publications/abolition-of-the-furnished-holiday-lettings-tax-regime
- https://propertymark.co.uk/resource/furnished-holiday-lets-abolition.html

**Borrowable patterns (subject to verification):** competitor commencement-date tables; SA100 box reorientation walkthroughs; loss-treatment decision trees (verify against ITA 2007 s.272A and FA 2025 Sch 5 transitional paragraphs before borrowing).

**Reliability notes:**
- gov.uk policy publication: authoritative for HMRC's published view; verify the consultation document is the published-final version, not the consultation-draft.
- RSM / BDO / Saffery / ICAEW Tax Faculty: reliable for statutory framing; cross-check commencement dates and Part numbering against FA 2025 Sch 5 directly.

---

## GSC data

*Net-new page; primary topical queries expected: "FHL abolition individual owner", "what to do FHL abolition", "FHL 2025/26 SA100", "former FHL Section 24", "FHL Form 17 election", "FHL capital allowances grandfathered", "FHL pension contributions abolition", "FHL CGT after abolition", "incorporate former FHL".*

---

## Closest existing pages (cannibalisation context)

- **`furnished-holiday-let-tax-rules-exemptions` (mandatory upward link)** — the rules overview companion. Cross-link in opening + closing as "the rules overview companion".
- `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics` — capital allowances depth. Cross-link in the capital allowances checklist item.
- `transferring-fhl-portfolio-to-limited-company` — incorporation depth.
- `how-much-tax-holiday-let-property-uk` — how-much-tax landing.
- `holiday-let-tax-calculator-fhl-changes` — calculator framing.
- `sdlt-furnished-holiday-let-2025-abolition` — SDLT angle.
- Future MW1 / MW2 picks (per seed): impact-of-fhl-tax-abolition-on-pension-contributions; vat-on-furnished-holiday-lettings; broader retrospective / policy framing.

**Cannibalisation discipline:**
- **Hard cross-link** to rules-overview page in opening + closing.
- Cross-link capital allowances depth page in the capital allowances checklist item.
- Cross-link incorporation page in item 7.
- Cross-link SDLT-FHL page in item 8.
- Vary worked-example persona from the rules-overview page (which used a standard FHL-landlord persona); B13 should use a higher-rate-taxpayer joint-owning spouse persona.

---

## Redirect overlap (on launch)

No existing slug matches B13's scope. **Session to scan `Property/web/middleware.ts` for any `fhl-abolition-individual` / `former-fhl-action-checklist` / `fhl-what-to-do` token redirects pre-launch; if found, repoint to B13.**

---

## Authority links worth considering (Stage 2 populated 2026-05-26; session selects 6-8)

**Statutory (legislation.gov.uk):**
- FA 2025 Schedule 5 (Furnished holiday lettings — full text, verified 2026-05-26): https://www.legislation.gov.uk/ukpga/2025/8/schedule/5
- FA 2025 Sch 5 Part 1 (Amendments relating to income tax): https://www.legislation.gov.uk/ukpga/2025/8/schedule/5/part/1
- FA 2025 Sch 5 Part 2 (Amendments relating to corporation tax): https://www.legislation.gov.uk/ukpga/2025/8/schedule/5/part/2
- FA 2025 Sch 5 Part 3 (Amendments relating to capital allowances): https://www.legislation.gov.uk/ukpga/2025/8/schedule/5/part/3
- FA 2025 Sch 5 Part 4 (Amendments relating to chargeable gains): https://www.legislation.gov.uk/ukpga/2025/8/schedule/5/part/4
- FA 2025 Sch 5 Part 5 paras 12 + 13(4) (Commencement — 2025-26 tax year for income tax; 6 April 2025 for CGT): https://www.legislation.gov.uk/ukpga/2025/8/schedule/5/part/5
- ITA 2007 s.272A (Section 24 finance cost restriction — now bites former FHL): https://www.legislation.gov.uk/ukpga/2007/3/section/272A
- ITTOIA 2005 s.311A (replacement of domestic items relief — post-abolition relief route for new furniture spend): https://www.legislation.gov.uk/ukpga/2005/5/section/311A
- FA 2004 s.189 ("relevant UK earnings" — FHL profit no longer counts): https://www.legislation.gov.uk/ukpga/2004/12/section/189
- TCGA 1992 (rates from 6 April 2025 — 18%/24%): https://www.legislation.gov.uk/ukpga/1992/12/contents

**HMRC manuals + gov.uk:**
- HMRC PIM4100+ (former FHL guidance, transitional and historic): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim4100
- HMRC PIM1020 (current property-income treatment): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1020
- HMRC CA21000+ (P&M mainline for grandfathered pool): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca21000
- HMRC EIM72012+ (pension relevant-UK-earnings interaction): https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim72012
- gov.uk Form 17: https://www.gov.uk/government/publications/income-tax-declaration-of-beneficial-interests-in-joint-property-and-income-17
- gov.uk FHL abolition policy publication: https://www.gov.uk/government/publications/abolition-of-the-furnished-holiday-lettings-tax-regime

**Cross-references in house_positions.md:**
- **§6 primary anchor** (FHL abolition transition — locked mechanics including the 6 April 2025 commencement, Section 24 ingress, BADR cut-off, joint-ownership 50/50 default + Form 17 requirement).
- §1 main (5% additional dwellings surcharge for SDLT on FHL acquisitions from 31 October 2024).
- §25 (capital allowances cluster — for the grandfathered pool mechanics).
- §4 (Section 24 mainline).
- §15 (IHT — BPR for FHL post-abolition categorically not eligible).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):**
- Verify FA 2025 Sch 5 Parts 1-5 verbatim against legislation.gov.uk before citing (Part 1 income tax, Part 2 corp tax, Part 3 capital allowances, Part 4 chargeable gains, Part 5 commencement).
- Verify FA 2025 Sch 5 Part 5 paras 12 + 13(4) commencement architecture (2025-26 tax year for income tax under para 12; 6 April 2025 for CGT under para 13(4)).
- Verify ITA 2007 s.272A Section 24 mechanic.
- Verify FA 2004 s.189 "relevant UK earnings" definition.
- Verify ITTOIA 2005 s.311A replacement-of-domestic-items relief.
- Verify CGT residential rates 18%/24% for 2026/27 against gov.uk (rate-by-reference per §16.27).
- Verify SDLT 5% additional-dwellings rate against gov.uk (rate-by-reference; ties back to §1.I lock).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, middle dots only.
- Imperative checklist tone; practical, specific, decision-tree-led.
- Anonymised personas only.
- **Tone discipline:** the page is a "what to do" checklist for an individual former-FHL owner. Avoid policy commentary or political framing on the abolition itself; lead with the practical actions.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate in body.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise individual former-FHL owner + spouse joint-owner + buyer modelling incorporation + landlord considering disposal.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the Section 24 ingress checklist item (high-intent: filing 2025/26 SA100).
  - After the joint-ownership + Form 17 checklist item (high-intent: spouse-joint owner).
  - After the incorporation checklist item (high-intent: landlord modelling LtdCo transfer).
- Vary opening; lead with the four-question diagnostic, NOT with regime-history or "The FHL regime was abolished in April 2025...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12 (per the seed's recommendation of 8-10 expanded slightly to maintain consistency with the rest of the brief set).

### Cannibalisation
- Cross-link `furnished-holiday-let-tax-rules-exemptions` (rules-overview companion) in opening + closing.
- Cross-link `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics` (capital allowances depth).
- Cross-link `transferring-fhl-portfolio-to-limited-company` (incorporation depth).
- Cross-link `sdlt-furnished-holiday-let-2025-abolition` (SDLT angle).

### House positions
- §6 primary anchor (FHL abolition mechanics).
- §1 + §4 + §15 + §25 secondary.

### Quality bar
- Word count: 2,400-2,800 (checklist tier — shorter than statute-led pages).
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is the **four-question diagnostic + eight-item action checklist + the SA100-cycle-specific timing + the "what to stop doing" framing**. Write to it.
- Lead with the four-question diagnostic, NOT with a regime-history paragraph.
- Use imperative tone ("Stop deducting mortgage interest", "File a Form 17 within 60 days") rather than descriptive prose.

---

## Draft FAQ entries (Stage 2 populated 2026-05-26; session may rewrite or expand)

Target 10-12 FAQs.

1. **The FHL regime ended on 6 April 2025. As an individual owner, what is the single most important thing I need to change on my 2025/26 SA100?**
   Stop deducting mortgage interest as an expense. The Section 24 tax-credit mechanic (ITA 2007 s.272A) replaces the full deduction from 6 April 2025. On the 2025/26 SA100 UK Property pages, the finance costs box is filled with the interest paid but tax relief is given as a 20% tax credit against tax due, not as an expense reducing the property profit. The change can move a basic-rate FHL landlord into the higher-rate band on paper even if cash flow is unchanged.

2. **I held my FHL jointly with my spouse and split the income unequally to manage tax bands. Can I still do that?**
   Not by default from 6 April 2025. Without a Form 17 election the 50/50 default applies (s.836 ICTA 1988 / ITA 2007 s.836-7 architecture for joint property income). For couples wanting a beneficial-ownership-aligned split, Form 17 must be filed within 60 days of the declaration of trust evidencing the unequal beneficial split. Sequence: declaration of trust drafting (specialist solicitor) → Form 17 filing → 60-day deadline from declaration date.

3. **I have brought-forward FHL losses. Are they lost?**
   No, but the loss treatment changes. Brought-forward FHL losses survive but become property-business losses, ring-fenced to the UK or overseas property business as appropriate (per FA 2025 Sch 5 Part 5 transitional provision). The historic sideways relief against general income is LOST. A losses-against-employment-income offset is no longer available.

4. **I have a capital allowances pool from pre-2025 FHL plant spend. What happens to it?**
   Grandfathered under FA 2025 Sch 5 Part 3 + Part 5 transitional provision. The existing pool continues writing down at 18% main pool / 6% special-rate pool in the post-abolition property business. The carve-out from the s.35 CAA 2001 dwelling-house restriction is preserved for the grandfathered pool. Cross-link the operational depth page for the precise mechanics.

5. **I was using FHL profit to pay relief-eligible personal pension contributions. Does that still work?**
   No from 2025/26. Former FHL profit no longer counts as "relevant UK earnings" under FA 2004 s.189. Practical impact: the £3,600 floor on relief-eligible pension contributions still applies (regardless of earnings); anything above £3,600 requires other relevant earnings (employment / self-employed trade / other-trading). Material for FHL-rich pre-retirement landlords who were stacking pension contributions on FHL profit.

6. **I am planning to sell my former FHL in 2026/27. What CGT rate applies?**
   Standard residential CGT: 18% on gains within the basic rate band; 24% on gains in the higher rate band (rates effective from 6 April 2025; verify against gov.uk at write time). BADR is NOT available; the historic BADR availability for FHL ended on 5 April 2025. Anti-forestalling rules covered the 6 March 2024 (announcement) to 5 April 2025 window and are not relevant for post-April-2025 disposals.

7. **I am thinking about putting my former FHL into a limited company. Is that more attractive post-abolition?**
   Potentially. Section 24 does not bite companies (corporation tax computes profit on a deduction basis, not the tax-credit basis), so incorporating a former FHL with significant mortgage interest can be attractive. But you need to model: (a) s.162 TCGA 1992 CGT incorporation relief eligibility; (b) SDLT on the transfer (the 5% additional-dwellings surcharge bites; full rates may apply if the transfer is treated as a market-value transaction); (c) ATED for residential property held by a non-natural person above £500k. Specialist modelling essential before incorporating.

8. **Do I need to register for VAT now that the FHL regime is gone?**
   Unchanged. Holiday-accommodation supplies have always been standard-rated (VATA 1994 Sch 9 Group 1 Item 1(a) carve-out from residential exemption); the £90k turnover threshold continues to apply. The FHL income-tax abolition does NOT change the VAT position. Operators with turnover above £90k must register and account for output VAT at 20%.

9. **Does the FHL abolition affect my SDLT position when I buy another holiday let?**
   Yes operationally. The 5% additional-dwellings surcharge (FA 2025 s.51, effective 31 October 2024) catches FHL acquisitions; FHL purchasers no longer have any SDLT carve-out post-abolition. A £350,000 FHL purchase by an existing landlord attracts the 5% surcharge (£17,500) on top of standard SDLT, materially changing the post-tax economics.

10. **What is the timing of the upcoming property-income surcharge and how does it interact with my former FHL?**
    The 2% surcharge on UK property income is scheduled to take effect from 6 April 2027 (announced Autumn Budget 2024; in draft FA 2026; pending Royal Assent at the time of writing). The surcharge produces effective property income rates of 22% basic / 42% higher / 47% additional from 2027/28. Former-FHL income (now standard residential property income) will fall within the surcharge. Plan against the scheduled-but-not-yet-enacted dates per §7 framing.

11. **My former FHL is in a remote location and was a working business. Can I argue I am a trader rather than a landlord post-abolition?**
    Possible but high bar. The FHL regime was the statutory shortcut to "trade-like" tax treatment for furnished holiday lets; post-abolition, the standard property-business-versus-trading line applies. Cases like Gittos v Barclay (1982) and HMRC's "badges of trade" framework apply. Genuinely-trading short-stay accommodation businesses (serviced accommodation, hotel-like service provision with daily cleaning, breakfast, reception) may qualify as trades; pure self-catered holiday lets typically do not. Specialist advice essential.

12. **Where can I find the operational depth on the post-abolition rules?**
    For the broad post-abolition rules: see our rules overview page `furnished-holiday-let-tax-rules-exemptions`. For capital allowances grandfathering depth: see `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics`. For incorporation modelling: see `transferring-fhl-portfolio-to-limited-company`. For the SDLT angle: see `sdlt-furnished-holiday-let-2025-abolition`. This checklist page is the consolidated action-list; the depth pages support execution.

---

## Worked examples (Stage 2 drafted 2026-05-26; session may adapt persona + figures)

One illustrative worked example only (consistent with the seed's recommendation of a single individual-owner 2025/26 tax-comparison example). Use anonymised persona.

### Worked example: higher-rate-taxpayer joint-owning spouse, before-and-after FHL abolition

A landlord ("Buyer AA") and her husband own a Cornish cottage jointly (50/50 by declaration of trust) that they operated as a furnished holiday let until 5 April 2025. Buyer AA is a higher-rate (40%) taxpayer; her husband is a basic-rate (20%) taxpayer. Gross rental income: £30,000; mortgage interest: £8,000; other allowable expenses: £6,000; net profit before interest: £24,000; net profit after interest: £16,000.

**Pre-abolition (2024/25 — FHL last year):**
- Joint owners on FHL profits could split income on actual beneficial split — say 25% Buyer AA / 75% husband to optimise tax bands (FHL rules permitted unequal split, no Form 17 required).
- Net profit £16,000 (after interest deduction as expense, since Section 24 did not apply to FHL).
- Buyer AA 25% share = £4,000; tax at 40% = £1,600.
- Husband 75% share = £12,000; tax at 20% = £2,400.
- Total household tax on FHL: **£4,000**.
- Capital allowances (additional): £1,500 of writing-down allowances on existing pool — reduces taxable profit further.

**Post-abolition (2025/26):**
- Joint owners must split 50/50 by default; unequal split now requires Form 17 election within 60 days of any beneficial-split change. Assume Buyer AA / husband retain 50/50 actual beneficial split (no Form 17 needed; default applies).
- Section 24 ingress: mortgage interest is NOT deductible as an expense; it gives a 20% tax credit against tax due.
- Net property profit (without interest deduction) = £30,000 - £6,000 = £24,000.
- 50/50 split: Buyer AA share = £12,000; husband share = £12,000.
- Buyer AA tax: £12,000 at 40% = £4,800. Less 20% tax credit on her 50% of £8,000 interest (£4,000) = £800. Net tax = £4,000.
- Husband tax: £12,000 at 20% = £2,400. Less 20% tax credit on his £4,000 interest = £800. Net tax = £1,600.
- Total household tax on former FHL: **£5,600**.
- Capital allowances pool (grandfathered): £1,500 of writing-down allowances continues — small offset, but does NOT reverse the Section 24 hit.

**Tax increase from abolition: £1,600 per year on this property.** Driven by (a) Section 24 ingress on Buyer AA's higher-rate slice; (b) loss of unequal-split optimisation. Solutions to consider: (i) genuine declaration of trust shifting beneficial ownership materially toward the basic-rate spouse (Form 17 election); (ii) incorporation into a limited company (Section 24 does not bite companies); (iii) disposal and reinvestment of capital in non-residential property; (iv) acceptance of the new economics.

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9. Key per-page anchors: §6 primary (FHL abolition); §1 + §4 + §25 secondary; §16.35 per-write verification on FA 2025 Sch 5 Parts 1-5 + commencement paras 12, 13(4) + ITA 2007 s.272A + FA 2004 s.189 + ITTOIA 2005 s.311A.

## Session-side watcher pattern

Standard per NETNEW_PROGRAM §8.4. After raising any Q at `C:/Users/user/Documents/Accounting/docs/property/megawave1_questions_session_B.md` (absolute path), arm a single Monitor task watching for STATUS flip to answered.

---

## Per-page work-log (session fills during work)

### Decisions
- Final slug:
- Final category:
- H1 chosen:
- Meta title (≤62 chars):
- Meta description (≤158 chars):
- Why these vs other options:

### Competitor URLs fetched + key takeaway per URL
-

### Existing-page review (overlap, differentiation decision)
-

### Citations added
-

### Internal links added
-

### Inline CTA placements
-

### Build attempts (pass/fail)
-

### Verification (six checks)
- em-dash count:
- Tailwind utility classes:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### monitored_pages registration
-

### Flags raised to megawave1_site_wide_flags.md
-

### 2-3 sentence summary
-
