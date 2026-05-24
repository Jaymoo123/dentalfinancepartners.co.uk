# Wave 8 brief: condition-a-acquisition-main-purpose-test-trader-by-stealth-landlord-trap

**Site:** property
**Bucket:** B (Transactions in UK land — Condition A depth)
**Session:** B
**Pick ID:** B2
**Brief type:** Net-new page
**Source markdown path on launch:** `Property/web/content/blog/condition-a-acquisition-main-purpose-test-trader-by-stealth-landlord-trap.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-development-tax/condition-a-acquisition-main-purpose-test-trader-by-stealth-landlord-trap

---

## Manager pre-decisions

- **Suggested slug:** `condition-a-acquisition-main-purpose-test-trader-by-stealth-landlord-trap`
- **Suggested category:** `property-development-tax`
- **Bucket:** B (Transactions in UK land — Condition A depth)
- **Framing differentiator (Stage 2, 2026-05-25):**

> Deep-dive on Condition A of the transactions-in-UK-land four-conditions test (s.356OB(4) for companies; s.517B(4) for individuals — verified verbatim against legislation.gov.uk on 2026-05-25). Condition A tests intent AT ACQUISITION: "the main purpose, or one of the main purposes, of acquiring the land was to realise a profit or gain from disposing of the land." The page works the operational trap for the "trader-by-stealth" landlord — someone who acquires-with-mixed-intent (rent + planned-flip; rent + planned-conversion-and-sale; rent + speculative-resale-on-market-rise) and whose mixed intent is enough to engage Condition A because the statutory wording is **disjunctive**. Page walks: (a) the verbatim statutory text and the "main purpose, OR ONE OF THE MAIN purposes" disjunctive framing — investment intent alongside profit intent does NOT defeat the test where profit intent is genuine and substantial (per §28.2); (b) the six-month associated-persons window per s.356OB(8) / s.517B(8) — "any time in the period beginning when the activities of the project begin and ending 6 months after the disposal" (drift-catch: HP §28.2 cited the window at s.356OB(2) but the operative time-definition lives at subsection (8); both subsections work together — verified 2026-05-25); (c) evidence-of-intent framework — HMRC enquiry practice on contemporaneous documentation (board minutes, lender purpose statements, broker emails, exit-strategy slides); (d) the badges-of-trade overlay (deep-dive at B7) used as supporting evidence under the main-purpose evaluation — the leading cases *Marson v Morton* [1986] 1 WLR 1343 (nine badges) + *Page v Lowther* [1983] STC 799 (single flip with intent at acquisition = trading) + *Iswera v IRC* [1965] 1 WLR 663 (Privy Council, single transaction can be trading); (e) the "trader-by-stealth" personas — buy-to-let landlord acquiring a single property below market with planned-light-refurbishment-and-resale; portfolio landlord acquiring a sub-portfolio for selective re-sale; HMO buyer acquiring with planned-conversion-and-flip; (f) worked example contrasting CGT route at 24% on £200k gain (£47,280 after £3k AEA) vs trading route at 40% income tax + 6% Class 4 NIC over £50,270 (£80,000 + £8,983 = £88,983) — c.£42k swing per £200k gain. NOT writing Condition D (B3); NOT writing Condition C trading-stock (B4); NOT writing the standalone badges-of-trade methodology (B7) — only the badges as Condition A evidence overlay.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** B2 cross-references B1 PILLAR for the four-conditions framework and B7 for the deep-dive on badges of trade methodology. B2 is the Condition A deep-dive only. Do NOT re-walk the entire four-conditions framework — cite back to B1 and zoom in on intent-at-acquisition mechanics.

**Pool-thinness disclosure:** Competitor coverage tends to conflate Condition A with the badges-of-trade test, or with Condition D (development intent). Clean separation of intent-at-acquisition (Condition A) from intent-at-development (Condition D) plus the "trader-by-stealth" persona framing plus the disjunctive-wording emphasis is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract: competitor treatment of the disjunctive "or one of the main purposes" wording (most competitors gloss this); the distinction between Condition A and the badges of trade; treatment of evidence-of-intent in HMRC enquiries.

- https://www.saffery.com/insights/articles/transactions-in-uk-land-condition-a/
- https://www.bdo.co.uk/en-gb/insights/tax/corporate-tax/transactions-uk-land-main-purpose
- https://www.rsmuk.com/insights/tax-insights/property-trading-condition-a
- https://www.crowe.com/uk/insights/property-flipping-tax-treatment
- https://www.evelyn.com/insights-and-events/insights/property-trader-vs-investor/

**Borrowable patterns:** competitor evidence-of-intent checklists (verify before borrowing); HMRC enquiry-pattern descriptions (most competitor coverage is generic — build PTP-specific worked persona examples).

---

## GSC data

*Net-new page; primary topical queries expected: "Condition A transactions in UK land", "section 356OB main purpose", "property acquisition trading intent", "BTL landlord trading tax", "intent at acquisition property tax", "main purpose or one of main purposes", "trader by stealth landlord".*

---

## Closest existing pages (cannibalisation context)

- `property-development-tax-trading-vs-investment-income` (cannibal score 0.34 — adjacent — existing page is the practical intro; B2 is the Condition A statutory deep-dive — cross-link, do not duplicate)
- `how-to-set-up-property-investment-company-uk-guide` (0.16 — adjacent — covers structure design, not Condition A intent test)
- `landlord-incorporation-step-by-step-guide-uk` (0.14 — adjacent — incorporation route; cross-link to B4 for Condition C / s.162 interaction)
- B1 PILLAR (forward-link as the framework anchor)

**Cannibalisation discipline:**
- Cross-link B1 PILLAR for the four-conditions framework; B2 is the deep-dive child.
- Cross-link B7 for badges-of-trade deep-dive; B2 only uses badges as Condition A evidence overlay.
- Vary persona figures from `property-development-tax-trading-vs-investment-income`.

---

## Redirect overlap (on launch)

No existing slug matches B2's Condition A deep-dive scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-25, session selects 6-8)

**Statutory:**
- CTA 2010 s.356OB (Condition A — companies): https://www.legislation.gov.uk/ukpga/2010/4/section/356OB
- ITA 2007 s.517B (Condition A — individuals): https://www.legislation.gov.uk/ukpga/2007/3/section/517B
- FA 2016 s.77 (inserting Part 8ZB): https://www.legislation.gov.uk/ukpga/2016/24/section/77
- FA 2016 s.79 (inserting Part 9A): https://www.legislation.gov.uk/ukpga/2016/24/section/79

**Caselaw:**
- *Marson v Morton* [1986] 1 WLR 1343 (nine badges of trade)
- *Page v Lowther* [1983] STC 799 (single property flip held to be trading — intent at acquisition decisive)
- *Iswera v IRC* [1965] 1 WLR 663 (Privy Council — single transaction can be trading)

**HMRC manuals:**
- HMRC BIM60000+ (property income / trading distinction): https://www.gov.uk/hmrc-internal-manuals/business-income-manual
- HMRC BIM20000+ (badges of trade)

**Cross-references in house_positions.md:** §28.2 (four-conditions test verbatim — primary anchor); §28.5 (badges of trade — overlay); §28.11 (do-not-write list — sole-purpose framing forbidden; "BTL never trading" forbidden); §5 (CGT 18% / 24% rates from 30 October 2024 — for CGT-vs-trading worked example); §16.45 — disjunctive wording verbatim discipline.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify the verbatim Condition A wording in CTA 2010 s.356OB(4) AND ITA 2007 s.517B(4) — disjunctive "main purpose, or one of the main purposes" wording is the structural anchor. Verify the six-month associated-persons window time-definition is at s.356OB(8) / s.517B(8) (the chargeable-person rule sits at s.356OB(2) / s.517B(2); the time-period definition is at subsection (8)). Use post-30-October-2024 CGT rates (18% / 24%) in any CGT-vs-trading worked comparison.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation, statutory section references.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise BTL landlord considering refurbishment-and-sale + Portfolio owner with mixed-intent acquisitions.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the "main purpose, or one of the main purposes" disjunctive-wording section (high-intent: mixed-intent acquirer checking exposure)
  - After the worked CGT-vs-trading comparison (cost-of-misclassification surface)
  - Optionally after the evidence-of-intent framework section
- Vary opening; do NOT lead with "Condition A of the transactions in UK land rules...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. Include explicit FAQ on whether mixed intent (rent + flip) defeats Condition A (it does not — disjunctive wording).

### Cannibalisation
- Cross-link B1 PILLAR for the four-conditions framework.
- Cross-link B7 for badges of trade deep-dive.
- Cross-link `property-development-tax-trading-vs-investment-income` as the practical intro.

### House positions
- §28.2 primary; verbatim Condition A wording.
- §28.5 (badges of trade overlay).
- §28.11 do-not-write — sole-purpose framing forbidden; "long-hold = automatic investment" forbidden.
- §16.45 — disjunctive-wording verbatim is non-negotiable.

### Quality bar
- Word count: 2,800-3,400.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is the disjunctive-wording emphasis + trader-by-stealth persona framing + Condition A vs Condition D vs badges-of-trade clean separation. Write to it.
- Vary H2s from B1 PILLAR and from `property-development-tax-trading-vs-investment-income`.

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9 for the verbatim 19-step workflow. Key per-page anchors for B2: §16.35 verification covers Condition A verbatim + s.356OB(8) / s.517B(8) time-definition (vs s.356OB(2) chargeable-person rule); per §28.11 do-not-write disjunctive wording is the structural anchor; register page in `monitored_pages` post-launch; commit BEFORE marking done.

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
