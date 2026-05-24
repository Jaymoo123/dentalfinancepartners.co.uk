# Wave 8 brief: condition-d-development-main-purpose-convert-and-flip-trap-landlord-developers

**Site:** property
**Bucket:** B (Transactions in UK land — Condition D depth)
**Session:** B
**Pick ID:** B3
**Brief type:** Net-new page
**Source markdown path on launch:** `Property/web/content/blog/condition-d-development-main-purpose-convert-and-flip-trap-landlord-developers.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-development-tax/condition-d-development-main-purpose-convert-and-flip-trap-landlord-developers

---

## Manager pre-decisions

- **Suggested slug:** `condition-d-development-main-purpose-convert-and-flip-trap-landlord-developers`
- **Suggested category:** `property-development-tax`
- **Bucket:** B (Transactions in UK land — Condition D depth)
- **Framing differentiator (Stage 2, 2026-05-25):**

> Deep-dive on Condition D of the transactions-in-UK-land four-conditions test (s.356OB(7) for companies; s.517B(7) for individuals — verified verbatim against legislation.gov.uk on 2026-05-25). Condition D tests intent AT DEVELOPMENT — "(in a case where the land has been developed) the main purpose, or one of the main purposes, of developing the land was to realise a profit or gain from disposing of the land when developed." The catch is that Condition D engages on DEVELOPMENT intent regardless of acquisition intent — defeating the BTL-landlord assumption that "I bought to let, so my later development-and-sale is investment". Page walks: (a) verbatim statutory text; (b) the structural difference between Condition A (intent at acquisition — point-in-time test) and Condition D (intent at development — later-point test that engages even where Condition A failed because original acquisition was investment-only); (c) the "convert and flip" landlord personas — permitted-development-rights converter (office-to-residential under PDR — Class O / Class MA + later sale); HMO refurbishment-and-resell (acquire-tenanted HMO, refurbish to higher spec, sell vacant); listed-building specialist (acquire-to-let, restore, sell post-restoration); barn-conversion / outbuilding-conversion specialist; (d) "developing the land" definition — guidance from HMRC BIM60000+ on what counts as development for these purposes (planning permission application + execution of works; not minor repairs / standard maintenance); (e) the disjunctive "main purpose, OR ONE OF THE MAIN purposes" wording mirrors Condition A — investment intent alongside profit intent at development does NOT defeat Condition D; (f) timing — the test is applied at the point of development, NOT at completion; intent can be established by contemporaneous documentation (planning correspondence, lender-purpose statements, marketing instructions to agents, board minutes for SPV-developers); (g) CGT-vs-trading worked comparison using post-30-October-2024 rates (24% on £300k gain after AEA = £71,280) vs trading (40% income tax + 6% Class 4 NIC = £120,000 + £15,000 = £135,000) — c.£64k swing; (h) the **historical RPDT residue** — FA 2022 Part 2 ss.31-53 introduced the 4% Corporation Tax surcharge for residential developer profits over the £25m group allowance; **HP §28.7 self-flags RPDT repeal status as requiring re-verification (the assertion that FA 2024 s.81 repealed RPDT could not be verified against legislation.gov.uk on 2026-05-25 — FA 2024 contents list shows no RPDT section)**; sessions must verify current RPDT status at write time and hedge if uncertain. NOT writing Condition A (B2); NOT writing Condition C trading-stock (B4); NOT writing badges of trade methodology (B7).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** B3 is the Condition D deep-dive — operationally the most common landlord-trap in the cluster because the buy-to-let-then-develop fact pattern is widespread (PDR conversions, HMO refurbishments, listed-building restorations). Cross-references B1 PILLAR for framework. Do NOT re-walk the entire four-conditions framework. **RPDT repeal flag is the #1 thing to verify at write time per HP §28.7 + §28.10.**

**Pool-thinness disclosure:** Competitor coverage tends to lump Condition D into general "development tax" discussion or to wrongly assert that BTL-acquisition insulates from later trading classification. Clean separation of intent-at-development (Condition D) from intent-at-acquisition (Condition A) plus PDR / HMO / listed-building persona framings is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract: competitor treatment of the BTL-then-develop fact pattern (most competitors mis-state this); RPDT current-status coverage (flag any competitor still treating RPDT as ongoing without repeal-status check); PDR-specific coverage (most competitor coverage is generic developer-side, not PDR-conversion-specific).

- https://www.saffery.com/insights/articles/transactions-in-uk-land-condition-d/
- https://www.bdo.co.uk/en-gb/insights/tax/corporate-tax/development-property-tax-treatment
- https://www.rsmuk.com/insights/tax-insights/property-development-trading
- https://www.crowe.com/uk/insights/permitted-development-tax
- https://www.evelyn.com/insights-and-events/insights/development-profit-tax/

**Borrowable patterns:** competitor PDR conversion examples (verify before borrowing — many use pre-30-October-2024 CGT rates); HMRC BIM60000+ paragraph references.

---

## GSC data

*Net-new page; primary topical queries expected: "Condition D transactions in UK land", "section 356OB development intent", "BTL conversion tax trading", "PDR conversion tax landlord", "HMO refurbishment trading tax", "convert and flip tax UK", "develop and sell property tax".*

---

## Closest existing pages (cannibalisation context)

- `property-development-tax-trading-vs-investment-income` (cannibal score 0.36 — adjacent — existing page is the practical intro; B3 is the Condition D statutory deep-dive)
- `housing-development-finance` (0.18 — finance angle, not tax classification)
- `vat-developer-pre-registration-input-tax-recovery-property-development-projects` (0.14 — VAT-side; cross-link)
- `residential-property-developer-tax-uk` (0.20 — RPDT historical/current; cross-link with current-status caveat)
- B1 PILLAR (forward-link as framework anchor)

**Cannibalisation discipline:**
- Cross-link B1 PILLAR; B3 is the Condition D deep-dive child.
- Cross-link `residential-property-developer-tax-uk` for RPDT historical context with the current-status flag.
- Cross-link `property-development-tax-trading-vs-investment-income` as the practical intro.
- Vary persona figures from B2.

---

## Redirect overlap (on launch)

No existing slug matches B3's Condition D deep-dive scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-25, session selects 6-8)

**Statutory:**
- CTA 2010 s.356OB(7) (Condition D — companies): https://www.legislation.gov.uk/ukpga/2010/4/section/356OB
- ITA 2007 s.517B(7) (Condition D — individuals): https://www.legislation.gov.uk/ukpga/2007/3/section/517B
- FA 2016 s.77 + s.79 (inserting): https://www.legislation.gov.uk/ukpga/2016/24/section/77 ; https://www.legislation.gov.uk/ukpga/2016/24/section/79
- FA 2022 Part 2 (RPDT — historical): https://www.legislation.gov.uk/ukpga/2022/3/part/2

**HMRC manual:**
- HMRC BIM60000+ (property income / trading): https://www.gov.uk/hmrc-internal-manuals/business-income-manual
- HMRC PIM (Property Income Manual): https://www.gov.uk/hmrc-internal-manuals/property-income-manual

**Cross-references in house_positions.md:** §28.2 (four-conditions test verbatim — primary); §28.7 (RPDT historical / current status — verify-at-write-time flag); §28.11 (do-not-write list — "BTL acquisition insulates from later trading" forbidden; "long-hold = automatic investment" forbidden); §5 (CGT 18% / 24% post-30-October-2024 — for worked comparison); §16.45 — disjunctive wording + post-30-October-2024 rate discipline.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify the verbatim Condition D wording at CTA 2010 s.356OB(7) AND ITA 2007 s.517B(7). **Critical: verify the current status of RPDT against legislation.gov.uk before reliance per §28.7 + §28.10** — the assertion that FA 2024 s.81 repealed RPDT could not be verified on 2026-05-25; FA 2024 contents do not include RPDT sections. If RPDT remains operative, work the £25m group allowance threshold and the 4% surcharge into the worked example; if confirmed repealed, note the historical context. Use post-30-October-2024 CGT rates (18% / 24%) in any CGT-vs-trading worked comparison per §5.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation, statutory section references.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise PDR converter + HMO refurbisher + Listed-building specialist + Buy-to-let-then-develop landlord.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the "Condition D engages regardless of acquisition intent" section (high-intent: BTL-landlord-considering-development)
  - After the PDR / HMO / listed-building persona block (operational hook)
  - After the CGT-vs-trading worked comparison (cost surface)
- Vary opening; do NOT lead with "Condition D of the transactions in UK land rules...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. Include explicit FAQ on whether buy-to-let acquisition history protects later development sales (it does not — Condition D engages on development intent regardless).

### Cannibalisation
- Cross-link B1 PILLAR for framework.
- Cross-link `residential-property-developer-tax-uk` for RPDT context.
- Cross-link `property-development-tax-trading-vs-investment-income` as practical intro.

### House positions
- §28.2 primary; verbatim Condition D wording.
- §28.7 RPDT — verify-current-status flag.
- §28.11 do-not-write — BTL-acquisition-insulates framing forbidden.
- §16.45 — post-30-October-2024 CGT rates non-negotiable.

### Quality bar
- Word count: 2,800-3,400.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is intent-at-development vs intent-at-acquisition separation + PDR / HMO / listed-building persona framings + RPDT current-status flag. Write to it.
- Vary H2s from B1 PILLAR + B2 + `property-development-tax-trading-vs-investment-income`.

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9 for the verbatim 19-step workflow. Key per-page anchors for B3: §16.35 verification covers Condition D verbatim wording + RPDT current-status check (flag at write time if status uncertain); per §28.7 RPDT repeal status is flagged as requiring re-verification; register page in `monitored_pages` post-launch; commit BEFORE marking done.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Why these vs other options:**

### Competitor URLs fetched
-

### Existing-page review
-

### Citations added
-

### Internal links added
-

### Inline CTA placements
-

### Build attempts
-

### Verification
- em-dash count:
- Tailwind utility classes:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### Flags raised to wave8_site_wide_flags.md
-

### 2-3 sentence summary
