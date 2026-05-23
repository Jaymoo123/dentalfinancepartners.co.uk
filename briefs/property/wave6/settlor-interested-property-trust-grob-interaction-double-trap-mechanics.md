# Wave 6 brief: settlor-interested-property-trust-grob-interaction-double-trap-mechanics

**Site:** property
**Bucket:** B (Trusts + §24.7 adult/minor-child + settlements + GROB)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/settlor-interested-property-trust-grob-interaction-double-trap-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/settlor-interested-property-trust-grob-interaction-double-trap-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `settlor-interested-property-trust-grob-interaction-double-trap-mechanics`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** B (Trusts + §24.7 adult/minor-child + settlements + GROB)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Specific high-frequency advisor error: a parent settles rental property (or a former family home) into trust naming themselves as a discretionary beneficiary (settlor-interested = caught under B4's three-statute stack) AND continues to live in or receive rent from the trust property (GROB under FA 1986 s.102 = also caught). **Either trap alone defeats the IHT plan; both together create a "double-trap" with conflicting timing and aggregation rules.** Walks the interaction in operational sequence: (1) GROB persists during settlor-life under s.102; the property is treated as remaining in the settlor's death estate at death market value under s.102(3); (2) settlor-interest under IHTA 1984 s.49(1A) (where the structure is an IIP for the settlor or settlor's spouse) treats the IIP property as the settlor's own for IHT; (3) for discretionary settlor-interested trusts, s.49(1A) doesn't apply directly but the trust property is still in the relevant property regime (s.64 10-year charge, s.65 exit charges). **The result is potentially double-IHT exposure** — the *Inheritance Tax (Double Charges Relief) Regulations 1987* (SI 1987/1130) provide partial relief but the relief is complex and asymmetric. **Cross-mechanism interaction with TCGA 1992 s.169B** (B4): the settlor-interest also blocks s.260 holdover, so the entry-side CGT bite happens too. **Practical operational playbook** in 3 parts: (i) how to diagnose an existing settlor-interested-plus-GROB structure (estate-planning client review checklist); (ii) the unwinding mechanism (releasing the settlor's reservation triggers a deemed PET under s.102(4) starting a fresh 7-year clock; expressly excluding settlor + spouse from beneficial class via deed of variation may end settlor-interest but does NOT end GROB unless reservation also released); (iii) the structural-redesign route (FIC instead of trust as the IHT vehicle — no GROB risk because gift is of shares not property occupation; see B1 + Wave 1 C7). Most-misunderstood combination on the cluster. **Companion to B4 (settlor-interest mechanic) and B5 (GROB family-home depth)** — B7 is the **interaction** of the two, with the unwinding playbook. **A↔B seam:** A10 (Bucket A — trust-owned SPV extraction) cites B7 for the trust-side IHT effects on top of extraction mechanics.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** **SEQUENCING CONSTRAINT: B4 and B7 must ship FIRST on B-branch. Session A's A10 (trust-owned SPV extraction) is written LAST on A-branch and cites B4 + B7 for the trust-side IHT/CGT context.** Cross-link from B7 to A10 not needed at write time; manager applies back-link at wave merge if useful.

**HOUSE_POSITION_CONFLICT signal context:** §22.11 (GROB family-home depth — FA 1986 s.102 + s.102A + s.102B) and §22.12 (Settlor-interested trusts for IHT — IHTA 1984 s.49 + new s.48ZA) are the primary anchors. Both anchors are house-locked at HEAD 2026-05-23. The post-FA-2025 s.48ZA framework affects offshore excluded-property territory; not directly relevant to the GROB+settlor-interest double-trap which is UK-resident-settlor specific.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of the double-charge problem, double-charge-relief reg coverage, unwinding playbook depth.

- https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm42254 — verified live 2026-05-23 (200). HMRC IHTM42254 settlor and GWR; the canonical HMRC view of the settlor-interest + GROB intersection. Use for citation.
- https://www.saffery.com/insights/articles/non-doms-and-gift-with-reservation-of-benefit/ — verified live 2026-05-23 (200). Saffery solicitor piece on non-doms + GROB; useful for understanding HMRC's "broad reservation" reading even though primary focus is non-dom angle.
- https://www.thegazette.co.uk/all-notices/content/104428 — verified live 2026-05-23 (200). The Gazette article on second-property discretionary trust gifts; useful for the practitioner-perspective unwinding framing.
- https://www.markmclaughlin.co.uk/settlor-interested-trusts/ — verified live 2026-05-23 (200). Mark McLaughlin on settlor-interested trusts; useful for the income-tax + CGT side of the double-trap.
- https://www.ukpropertyaccountants.co.uk/gift-with-reservation-of-benefit/ — verified live 2026-05-23 (200). UK Property Accountants GROB explainer; useful for the GROB-side framing.
- https://www.riskassured.co.uk/app/uploads/2025/03/Gifts-with-reservation-18.03.2025.pdf — verified live 2026-05-23 (200). Risk Assured GROB technical paper (March 2025); useful for current treatment including post-FA-2025 framing.

**Borrowable patterns:** HMRC IHTM42254 narrative + Saffery / Mark McLaughlin practitioner framing. Our differentiator: explicit double-trap interaction (most competitor content covers settlor-interest OR GROB but rarely both in interaction), explicit Double Charges Relief Reg coverage, explicit 3-part unwinding playbook with deemed-PET timing under s.102(4).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "settlor interested trust GROB", "gift with reservation discretionary trust", "double charge inheritance tax trust", "unwind GROB trust property".*

---

## Closest existing pages

- B4 `settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules` (Wave 6 sibling) — settlor-interest mechanic. B7 forward-links from "Settlor-interest mechanic recap (see B4 for full depth)".
- B5 `grob-s102-family-home-shared-occupation-s102b-uk-mechanics` (Wave 6 sibling) — GROB family-home mechanic. B7 forward-links from "GROB mechanic recap (see B5 for s.102B detail)".
- `iht-gifts-with-reservation-of-benefit-property` (Wave 2 A2) — base GROB walkthrough. Cross-link.
- `iht-gift-with-reservation-letting-children-paying-rent-mechanics` (Wave 4 C3) — let-property GROB angle; B7 references for the "what about let-property where the settlor receives no occupation but trust pays rent to settlor" variant.
- `iht-clt-property-discretionary-trust-20-percent-entry-charge` (Wave 4 C10) — CLT mechanic; B7 is the GROB-overlay on top of CLT.
- B1 `putting-rental-property-into-a-trust-decision-pillar-iht-cgt-sdlt-stack` (Wave 6 sibling) — pillar; B7 forward-links from "Where the double-trap sits on the pillar".

**Cannibalisation discipline:**
- B7 is the **interaction page**. B4 is settlor-interest in isolation; B5 is GROB family-home in isolation. B7 must not re-walk either in depth — recap then move to interaction.
- B7 must not re-walk Wave 4 C3 (let-property GROB) — cross-link for the let-property variant.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no old-slug redirect overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory (all verified 2026-05-23 against legislation.gov.uk):**
- FA 1986 s.102 "Gifts with reservation": https://www.legislation.gov.uk/ukpga/1986/41/section/102
- FA 1986 s.102A "Gifts with reservation: interest in land": https://www.legislation.gov.uk/ukpga/1986/41/section/102A
- FA 1986 Sch 20 (GROB supplementary): https://www.legislation.gov.uk/ukpga/1986/41/schedule/20
- IHTA 1984 s.49 "Treatment of interests in possession": https://www.legislation.gov.uk/ukpga/1984/51/section/49
- IHTA 1984 s.43 (settlement and settlor definitions): https://www.legislation.gov.uk/ukpga/1984/51/section/43
- IHTA 1984 ss.58-69 (relevant property regime + 10-year charge): https://www.legislation.gov.uk/ukpga/1984/51/section/58
- IHTA 1984 Sch 1 (rates of charge): https://www.legislation.gov.uk/ukpga/1984/51/schedule/1
- *Inheritance Tax (Double Charges Relief) Regulations 1987* (SI 1987/1130): https://www.legislation.gov.uk/uksi/1987/1130
- FA 2004 Sch 15 (POAT backstop): https://www.legislation.gov.uk/ukpga/2004/12/schedule/15

**Case law:**
- *Ingram v IRC* [1999] UKHL 47 (GROB and reservation of benefit): https://publications.parliament.uk/pa/ld199899/ldjudgmt/jd991209/ingram-1.htm

**HMRC manuals (all verified 2026-05-23):**
- IHTM14336 (settlor-interest + GROB): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm14336
- IHTM42253 (settlor IHT mechanics): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm42253
- IHTM42254 (settlor and GWR): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm42254
- IHTM14313 (GROB general): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm14313

**Cross-references in house_positions.md:** §22.11 (GROB family-home depth) and §22.12 (Settlor-interested trusts for IHT — primary anchors); §22.13 (Trust-vs-FIC decision boundary — the FIC route as a way to avoid the double-trap entirely).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify every numeric tax figure (40% death rate; 20% CLT lifetime rate; 6% periodic max; 7-year PET clock; NRB £325,000) and every statutory date (28 March 1986 GROB commencement; 9 March 1999 s.102A/s.102B commencement) against current gov.uk at write time per §16.35.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate in body.
- `<aside>` styled by global CSS. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs. Conversion moments:
  - After the "Why double-trap matters: potential double-IHT exposure" section (peak educational moment)
  - After the 3-part unwinding playbook (high-intent: reader has an existing problem to fix)
  - After the FIC-as-alternative-route section (decision-pivot moment)
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.
- HowTo schema candidate for the unwinding playbook section; flag in work-log.

### Cannibalisation
- B7 is the **interaction page**. Read B4 + B5 + Wave 2 A2 + Wave 4 C3 before writing. Forward-link / cross-link; do not duplicate depth.

### House positions
- **§22.11 and §22.12 are your primary working detail.** §22.11 covers GROB family-home; §22.12 covers settlor-interested IHT.
- **CRITICAL drift to avoid:** (a) do NOT cite IHTA 1984 s.48(3)-(3F) (omitted by FA 2025 s.45). (b) do NOT assert that exercising a deed of variation to exclude the settlor from beneficial class also ends GROB — it ends settlor-interest but GROB persists until the reservation (occupation, rent receipt, benefit) is actually released; both must be addressed separately.

### Quality bar
- Word count: 3,000-3,800 body (complex interaction + unwinding playbook).
- FAQs: 12-14.
- New external authority links: 6-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.
- Open with the high-frequency advisor-error framing (parent settles property, names self in discretionary class, continues to occupy), not with "What is GROB" or "What is settlor-interest".

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `docs/property/house_positions.md` once at session start; §22.9-§22.15 is your primary working detail for Bucket B.
2. Claim the page in `docs/property/wave6_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. Read the brief (this file).
4. Fetch each competitor URL using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml.
5. Read the closest existing pages on our site.
6. Plan the write before touching markdown.
7. Verify factual claims against HMRC manuals / legislation.gov.uk / gov.uk. **Per §16.35: verify every numeric tax figure at write time.**
8. Fetch a hero image from Pexels via fetch_image_for_post.
9. Write the markdown file at `Property/web/content/blog/<slug>.md` with full frontmatter.
10. Build: `cd Property/web && npm run build`. Must pass clean.
11. Verify (all six checks must pass): FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. Apply redirect repointing in `middleware.ts` if brief lists overlap. (None for this brief.)
13. Register the new page in `monitored_pages` via the Supabase _db helper.
14. Commit on your branch. Per-page commit. **CRITICAL: commit BEFORE marking done in tracker.** Do NOT include the tracker in your branch commit.
15. Fill in the per-page work-log at the bottom of this brief.
16. Mark done in `docs/property/wave6_page_tracker.md` with a 1-line Notes summary.
17. Append any site-wide flags to `docs/property/wave6_site_wide_flags.md`.
18. Log discoveries to `docs/property/wave6_discovery_log_session_B.md`.
19. Next page.

## Session-side watcher pattern

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Keep working on another step / another page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug / category:**
- **H1 chosen:**
- **Meta title chosen:** (max 62 chars)
- **Meta description chosen:** (max 158 chars)
- **Why these vs other options:**

### Competitor URLs fetched

### Existing-page review (from "Closest existing pages")

### Citations added (external authority)

### Internal links added (to our existing pages)

### Inline CTA placements

### Build attempts

### Verification
- em-dash count:
- Tailwind utility classes in markdown:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### Flags raised to wave6_site_wide_flags.md

### 2-3 sentence summary
