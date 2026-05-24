# Wave 8 brief: vat-storage-facility-lettings-schedule-9-group-1-supply-categorisation-landlords

**Site:** property
**Bucket:** C (VAT operational depth — Sch 9 Gr 1 para (ka) self-storage carve-out)
**Session:** C
**Pick ID:** C8
**Brief type:** Net-new page (Stage 1a correction baked in — self-storage is STANDARD-RATED via para (ka), NOT exempt)
**Source markdown path on launch:** `Property/web/content/blog/vat-storage-facility-lettings-schedule-9-group-1-supply-categorisation-landlords.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/vat-and-property/vat-storage-facility-lettings-schedule-9-group-1-supply-categorisation-landlords

---

## Manager pre-decisions

- **Suggested slug:** `vat-storage-facility-lettings-schedule-9-group-1-supply-categorisation-landlords`
- **Suggested category:** `vat-and-property`
- **Bucket:** C (VAT operational depth — Sch 9 Gr 1 carve-out depth)
- **Framing differentiator (Stage 2, 2026-05-25):**

> Self-storage facility lettings — the FA 2012 standard-rated carve-out from the Sch 9 Group 1 exempt-default. Page walks: (a) **The default exempt-land position** under VATA 1994 Sch 9 Group 1 Item 1 — the grant of any interest in or right over land, or licence to occupy land, is EXEMPT. Subject to 14+ carve-outs at paragraphs (a)-(n) that revert specified supplies to standard-rated; (b) **The self-storage carve-out at paragraph (ka)** — verbatim text: "the grant of facilities for the self storage of goods" — verified 2026-05-25 against legislation.gov.uk. Inserted by **FA 2012 Schedule 26 paragraphs 5(2) and 7(1)** with effect from **1 October 2012**. Operative consequence: self-storage facility lettings are STANDARD-RATED (20%) by default, NOT exempt land supplies. Competitor pages still framing self-storage as "exempt land" are pre-FA-2012 stale; (c) **What counts as "self storage of goods"** per HMRC VAT Notice 742/1 — supply of a defined storage space (whole or part of building, locker, container, cage, room) for the customer to use to store their own goods. Includes traditional self-storage operators (Big Yellow, Safestore, Shurgard model); container-storage operators; warehousing where customer has defined-space rights (not bulk-warehousing without space allocation, which can be exempt land or standard-rated services depending on facts); (d) **The three exceptions** that keep self-storage exempt — (i) **connected-party + CGS adjustment ongoing** — where the supply is between connected persons under VATA 1994 Sch 9 Gr 1 Item 1 Note (12B) (verify exact Note cite at write time) and a Capital Goods Scheme adjustment period is still running on the building, the standard-rated carve-out is itself disapplied; (ii) **charity use solely outside business** — where the recipient is a charity using the storage solely for non-business purposes; (iii) **ancillary storage within larger building** — where the storage element is ancillary to a wider supply (e.g. a tenanted office with incidental storage cupboards in the rent); (e) **The operational implication for landlords** — landlord with a multi-let industrial building part-let as self-storage and part-let as conventional industrial unit: the self-storage portion is STANDARD-RATED by statute (no opt-to-tax needed); the conventional industrial portion is exempt by default (opt-to-tax available); apportionment required for service-charge VAT and partial-exemption recovery; (f) **The transitional planning that died at 1 October 2012** — pre-FA-2012, self-storage was treated as exempt land. Many operators structured for partial-exemption-driven recoverable input tax via opt-to-tax of the operator building. Post-FA-2012 the standard-rated carve-out makes self-storage receipts taxable by default, simplifying input-tax recovery flow but exposing customers (typically domestic consumers) to non-recoverable 20% VAT; (g) **The cross-border angle** — self-storage to overseas-recipient customers (uncommon for domestic operators but live for business-storage operators) follows place-of-supply rules per VATA 1994 Sch 4A — services relating to immoveable property supplied where the property is located, so still UK self-storage = UK 20%; (h) **The mixed-supply trap** — where a "self-storage" offering bundles services (climate control, security monitoring, insurance), the supply may be a composite single supply of standard-rated self-storage OR multiple separate supplies depending on facts (per Card Protection Plan principles). HMRC typically accepts composite single-supply treatment of standard self-storage packages.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C8 is a Stage 1a correction brief — self-storage IS standard-rated by default from 1 October 2012, NOT exempt. The §16.45 drift catches: (1) "self-storage is exempt from VAT as a land supply" is FALSE — standard-rated since 1 October 2012 via Sch 9 Gr 1 para (ka) inserted by FA 2012 Sch 26 paras 5(2) + 7(1); (2) the three exceptions (connected-party + CGS; charity non-business; ancillary) are NOT widely used escape routes — the default is standard-rated; (3) FA 2012 inserting-section cite manual coverage varies — verify against legislation.gov.uk + FA 2012 Sch 26 at write time.

**Pool-thinness disclosure:** Competitor coverage is split — newer specialist VAT publications frame para (ka) correctly; older general-tax pages still describe self-storage as "exempt land supply" (pre-2012 stale). The clean carve-out walk-through plus three-exception coverage plus mixed-use landlord operational implication is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of: VAT categorisation of self-storage (FLAG any competitor still framing as exempt land — pre-2012 stale); FA 2012 Sch 26 inserting cite (most omit); three exceptions coverage; mixed-use apportionment treatment (commonly omitted).

- https://www.saffery.com/insights/articles/vat-self-storage-property/
- https://www.bdo.co.uk/en-gb/insights/tax/vat/self-storage-vat
- https://www.rsmuk.com/insights/tax-insights/self-storage-vat-treatment
- https://www.crowe.com/uk/insights/storage-facility-vat
- https://www.evelyn.com/insights-and-events/insights/self-storage-vat/

**Borrowable patterns:** competitor 1-October-2012 changeover timeline summaries; HMRC Notice 742/1 worked-example tables.

---

## GSC data

*Net-new page; primary topical queries expected: "VAT self storage", "self storage exempt or standard", "Sch 9 Gr 1 para ka", "self storage VAT 2012", "self storage landlord VAT", "container storage VAT", "self storage standard rated".*

---

## Closest existing pages (cannibalisation context)

- `vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages` (supply-categorisation adjacent)
- `vat-calculation-calculator` (operational calculator companion)
- C1 pillar `option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock` (for mixed-use building opting interaction)
- C5 special-method `vat-partial-exemption-special-method-approval-landlords-standard-method-override-mechanics` (mixed-portfolio partial exemption)
- `property-investment-company-structure-planning` (structure planning)

**Cannibalisation discipline:**
- C8 is the dedicated self-storage carve-out page. No existing dedicated page; clean addition.

---

## Redirect overlap (on launch)

No existing slug matches C8's self-storage carve-out scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-25, session selects 6-8)

**Statutory:**
- VATA 1994 Sch 9 Group 1 (exempt land + carve-outs — paragraph (ka) verified 2026-05-25): https://www.legislation.gov.uk/ukpga/1994/23/schedule/9
- FA 2012 Sch 26 paragraphs 5(2) + 7(1) (inserting para (ka)): https://www.legislation.gov.uk/ukpga/2012/14/schedule/26
- VATA 1994 Sch 4A (place of supply — services relating to immoveable property): https://www.legislation.gov.uk/ukpga/1994/23/schedule/4A
- VATA 1994 s.5 + Sch 4 (meaning of supply): https://www.legislation.gov.uk/ukpga/1994/23/section/5

**HMRC guidance:**
- HMRC VAT Notice 742/1 (Self storage — primary operational guidance): https://www.gov.uk/government/publications/vat-notice-742-1-self-storage
- HMRC VAT Notice 742 (Land and property — general land treatment): https://www.gov.uk/government/publications/vat-notice-742-land-and-property
- HMRC VATLP manual (Land and Property): https://www.gov.uk/hmrc-internal-manuals/vat-land-and-property
- HMRC Card Protection Plan composite-vs-multiple-supply guidance: https://www.gov.uk/hmrc-internal-manuals/vat-supply-and-consideration

**Cross-references in house_positions.md:** §29 (Wave 8 VAT cluster — primary anchor); §29.2 (Sch 9 Gr 1 exempt land default + 14 carve-outs including para (ka) self-storage verbatim from lock); §29.11 do-not-write list ("Self-storage is exempt land supply" forbidden); §16.45 drift discipline (standard-rated since 1 October 2012).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify Sch 9 Gr 1 Item 1 para (ka) verbatim "the grant of facilities for the self storage of goods" against legislation.gov.uk; verify FA 2012 Sch 26 paras 5(2) + 7(1) inserting cite is current; verify three exceptions (connected-party + CGS Note 12B; charity non-business; ancillary) at write time against current Sch 9 Group 1 Notes; verify HMRC Notice 742/1 (self storage) is current.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation, statutory Schedule + Group + paragraph references.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise Self-storage operator + Mixed-industrial landlord.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the para (ka) carve-out explanation (highest intent: landlord misclassifying)
  - After the three-exception section (intent: connected-party operator checking exception applicability)
  - Optionally after the mixed-use apportionment section
- Vary opening; do NOT lead with "Self-storage VAT treatment changed in October 2012...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. Include explicit FAQ on "is self-storage exempt or standard-rated" (standard-rated since 1 October 2012), "what was the position before October 2012" (exempt land supply — pre-FA-2012 framing), and "do the three exceptions to standard-rated apply often" (rarely — most commercial self-storage is standard-rated).

### Cannibalisation
- Cross-link C1 pillar for mixed-use building opt-to-tax interaction.
- Cross-link C5 for mixed-portfolio partial-exemption recovery.

### House positions
- §29 primary; §29.2 verbatim.
- §29.11 do-not-write list — "Self-storage is exempt land supply" forbidden.
- §16.45 — standard-rated since 1 October 2012 via FA 2012 Sch 26 paras 5(2) + 7(1).

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is the carve-out walk-through + three-exception detail + mixed-use landlord operational implication. Write to it.
- Vary H2s — no existing self-storage page to compare against.

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9 (verbatim 19 steps). Key per-page anchors for this brief: §29 + §29.2 mandatory; §16.45 drift discipline on standard-rated-since-2012 framing. Per §16.35: re-verify Sch 9 Gr 1 para (ka) verbatim, FA 2012 Sch 26 inserting cite, three-exception conditions, HMRC Notice 742/1 currency at write time.

## Session-side watcher pattern

Standard.

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
