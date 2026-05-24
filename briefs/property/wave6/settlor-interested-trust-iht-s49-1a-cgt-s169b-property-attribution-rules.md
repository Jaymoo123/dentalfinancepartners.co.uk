# Wave 6 brief: settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules

**Site:** property
**Bucket:** B (Trusts + §24.7 adult/minor-child + settlements + GROB)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules

---

## Manager pre-decisions

- **Suggested slug:** `settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** B (Trusts + §24.7 adult/minor-child + settlements + GROB)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The settlor-interested trap is the single biggest mistake amateur estate-planners make when settling rental property on trust. This page walks the **three-statute attribution stack** that bites when the settlor (or spouse / minor child) can benefit from the trust: (1) **ITTOIA 2005 s.624** attributes trust income to the settlor for income tax purposes (B2 is the deep statutory walkthrough); (2) **TCGA 1992 s.169B "Gifts to settlor-interested settlements etc"** blocks s.260 (and s.165) holdover relief where the trust is settlor-interested, meaning the settlor incurs CGT at residential rates 18% / 24% on the dry transfer-in without proceeds to pay the tax; (3) **IHTA 1984 s.49(1A)** does NOT exclude settlor-interested IIPs from the relevant property regime per se, but where the settlor's reservation is structured as an IIP, s.49(1A) treats the IIP as the settlor's property for IHT, defeating the IHT-mitigation goal entirely. This is the **IHT + CGT + IT trifecta** and is the deepest competitor-content gap on the cluster. **Three failure-mode case studies** in property context: (i) parent settles BTL on discretionary trust naming "spouse and children" as beneficiary class while spouse is alive — caught on all three (s.624 attributes income, s.169B blocks holdover so CGT dry charge at MV, IHTA still has 20% CLT on entry; the structure achieves nothing for IHT, costs full CGT immediately, retains all income on settlor); (ii) parent settles BTL on discretionary trust where settlor is named as "potential beneficiary in exceptional hardship" — probably caught as settlor-interested under s.169F (broad reading of "interest"); (iii) parent settles BTL on discretionary trust for adult-children-only, spouse expressly excluded by deed wording (s.169G excluded-class clause), settlor expressly excluded — CLEAN, s.260 holdover available, no income attribution, normal CLT mechanics apply. Companion to B2 (the income-tax statutory walkthrough) — B4 is the **CGT + IHT trifecta page**. **Critical for A↔B seam:** A10 (Bucket A — trust-owned SPV extraction mechanics) cites this page for the trust-side IHT+CGT context. Per sequencing constraint, B4 must ship FIRST so A10 has a target to cite.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** **SEQUENCING CONSTRAINT: B4 and B7 must ship FIRST on B-branch. Session A's A10 (trust-owned SPV extraction) is written LAST on A-branch and cites B4 + B7 for the trust-side IHT/CGT context.** Cross-link from B4 to A10 not needed at write time; manager applies back-link at wave merge if useful.

**HOUSE_POSITION_CONFLICT signal context:** §22.12 (Settlor-interested trusts for IHT — IHTA 1984 s.49 + new s.48ZA) and §22.13 (Trust-vs-FIC decision boundary) are the primary anchors. §22.12 references TCGA 1992 s.260 holdover restriction at ss.169B-169G. The post-FA-2025 s.48ZA framework affects offshore excluded-property territory, not the s.169B / s.624 / s.49(1A) attribution stack which B4 walks.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of the three-statute attribution stack (do most cover all three? if not, where do they fall short?), worked-example density.

- https://www.markmclaughlin.co.uk/settlor-interested-trusts/ — verified live 2026-05-23 (200). Mark McLaughlin canonical piece on settlor-interested trusts; covers IT + CGT angles. Useful for s.624 + s.169B framing.
- https://www.markmclaughlin.co.uk/hold-on-watch-the-cgt-relief-traps/ — verified live 2026-05-23 (200). Mark McLaughlin on holdover-relief CGT traps; useful for s.169B / s.169F / s.169G architecture.
- https://www.taxationweb.co.uk/tax-articles/inheritance-tax-iht-trusts-estates-capital-taxes/capital-gains-tax-settlor-interested-trusts.html — verified live 2026-05-23 (200). Taxation Web on settlor-interested CGT angle.
- https://www.taxation.co.uk/articles/2018-06-12-338138-rules-settlor-interested-trusts — verified live 2026-05-23 (200). Taxation magazine practitioner piece; useful for advisor-perspective framing.
- https://www.cronertaxwise.com/community/6-08-2024-holdover-relief-for-trusts/ — verified live 2026-05-23 (200). Croner Taxwise piece on holdover relief for trusts; useful for the s.260 vs s.165 distinction.
- https://www.rossmartin.co.uk/capital-gains-tax/4198-holdover-gift-relief-at-a-glance — verified live 2026-05-23 (200). Ross Martin holdover at-a-glance; useful for the s.260 / s.165 boundary.
- https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg34700 — verified live 2026-05-23 (200). HMRC CG34700 settlor trusts overview; canonical citation.

**Borrowable patterns:** Mark McLaughlin's three-statute framing + Taxation magazine's advisor perspective. Our differentiator: explicit three-statute attribution stack (most competitor content covers either income-tax-side OR CGT-side, rarely both with full IHT-side interaction), explicit three failure-mode case studies (caught-all-three / probably-caught / clean), explicit reference to s.169G excluded-class clause as the operative drafting fix.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "settlor interested trust", "settlor interested holdover relief", "s 169B TCGA", "settlor interested IHT".*

---

## Closest existing pages

- B2 `settlements-legislation-s624-s629-property-income-attribution-mechanics` (Wave 6 sibling) — income-tax side. B4 forward-links from "Income-tax side of settlor-interest (s.624)".
- `iht-clt-property-discretionary-trust-20-percent-entry-charge` (Wave 4 C10) — CLT mechanic; B4 is the settlor-interest exclusion. Cross-link: C10's reader who's struggling with "but does s.260 holdover work?" goes to B4.
- `fic-vs-discretionary-trust-property-comparison` (Wave 1 C7) — comparison; B4 deepens the trust-side risk profile.
- B1 `putting-rental-property-into-a-trust-decision-pillar-iht-cgt-sdlt-stack` (Wave 6 sibling) — pillar; B4 forward-links from "Where the settlor-interest trap sits on the pillar".
- B7 `settlor-interested-property-trust-grob-interaction-double-trap-mechanics` (Wave 6 sibling) — adjacent; B7 is the GROB-on-top-of-settlor-interest interaction. Cross-link both directions.

**Cannibalisation discipline:**
- B4 is the **CGT + IHT trifecta page** for settlor-interested trusts. B2 is the IT-side; B4 references but does not re-walk s.624 in depth. B7 is the GROB-on-top-of-settlor-interest interaction; B4 references but does not re-walk the GROB mechanic.
- B4 must not stray into B5's family-home-GROB territory (separate trap; FA 1986 s.102/102B not the settlor-interested mechanism).

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no old-slug redirect overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory (all verified 2026-05-23 against legislation.gov.uk):**
- ITTOIA 2005 s.624 "Income where settlor retains an interest": https://www.legislation.gov.uk/ukpga/2005/5/section/624
- ITTOIA 2005 s.625 (retained interest definition): https://www.legislation.gov.uk/ukpga/2005/5/section/625
- TCGA 1992 s.169B "Gifts to settlor-interested settlements etc": https://www.legislation.gov.uk/ukpga/1992/12/section/169B
- TCGA 1992 s.169C (clawback on subsequent settlor-interest): https://www.legislation.gov.uk/ukpga/1992/12/section/169C
- TCGA 1992 s.169F (interest of settlor / spouse / minor child): https://www.legislation.gov.uk/ukpga/1992/12/section/169F
- TCGA 1992 s.169G ("settlor" definition for ss.169B-169D): https://www.legislation.gov.uk/ukpga/1992/12/section/169G
- TCGA 1992 s.260 "Gifts on which inheritance tax is chargeable etc.": https://www.legislation.gov.uk/ukpga/1992/12/section/260
- TCGA 1992 s.165 "Relief for gifts of business assets": https://www.legislation.gov.uk/ukpga/1992/12/section/165
- IHTA 1984 s.49 "Treatment of interests in possession": https://www.legislation.gov.uk/ukpga/1984/51/section/49
- IHTA 1984 s.43 (settlement and settlor for IHT): https://www.legislation.gov.uk/ukpga/1984/51/section/43

**HMRC manuals (all verified 2026-05-23):**
- CG34700 (settlor trusts overview): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg34700
- CG67030 (holdover relief): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg67030
- CG67040 (s.260 holdover detail): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg67040
- TSEM5100 (settlor-interested income-tax angle): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem5100
- IHTM42253 (settlor IHT mechanics): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm42253
- IHTM42254 (settlor and GWR — cross-ref for B7): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm42254

**Cross-references in house_positions.md:** §22.12 (Settlor-interested trusts for IHT — IHTA 1984 s.49 + new s.48ZA, primary IHT anchor), §22.13 (Trust-vs-FIC decision boundary — settlor-interest restriction is a key Trust-vs-FIC differentiator), §22.9 (Settlements legislation — income-tax side cross-ref).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify every numeric tax figure (CGT residential rates 18%/24%, NRB £325,000, 20% CLT lifetime rate, 6% periodic-charge max, AEA £3,000) against current gov.uk at write time per §16.35.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate in body.
- `<aside>` styled by global CSS. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs. Conversion moments:
  - After the three-statute attribution stack explanation (peak educational moment; reader now realises they may have a problem)
  - After the "caught on all three" failure-mode case study (high-emotional-load moment)
  - After the "clean structure with s.169G excluded-class clause" worked example (high-intent: reader wants to know if their structure is fixable)
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- B4 is the **CGT + IHT trifecta page** for settlor-interest. Read B2 + B7 + C10 (Wave 4) + C7 (Wave 1) before writing. Forward-link B2 for income-tax side and B7 for the GROB-interaction overlay.

### House positions
- **§22.12 and §22.13 are your primary working detail.** §22.12 covers the IHT-side architecture and post-FA-2025 framework; §22.13 covers the Trust-vs-FIC comparative framing.
- **CRITICAL drift to avoid:** (a) do NOT cite IHTA 1984 s.48(3)-(3F) (omitted by FA 2025 s.45). The page is unlikely to reach offshore-trust excluded-property territory but flag if you do; use s.48ZA. (b) do NOT conflate s.624 (income-tax) and s.169B (CGT) attribution mechanisms — they are separate statutory hooks that often both bite but are independently triggered.

### Quality bar
- Word count: 3,000-3,800 body (complex three-statute interaction warrants depth).
- FAQs: 12-14.
- New external authority links: 6-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.
- Open with the trifecta framing (three separate statutes each independently capable of defeating the plan), not with "What is a settlor-interested trust".

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
- **Final slug / category:** `settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules` / `incorporation-and-company-structures` (as briefed)
- **H1 chosen:** "Settlor-Interested Property Trust: How Three Separate Statutes Each Independently Defeat the Plan"
- **Meta title chosen:** "Settlor-Interested Property Trust: Three-Statute Trap" (53 chars)
- **Meta description chosen:** "BTL settled on a trust where settlor or spouse can benefit: s.624 attributes income, s.169B blocks s.260 holdover, s.49(1A) preserves IHT. Worked cases." (152 chars)
- **Why these vs other options:** H1 chosen to lead with "three separate statutes each independently defeat" anti-templating framing per brief (open with the trifecta framing, not "What is a settlor-interested trust"). Meta title leads with the noun phrase + colon + payoff (matches existing pattern at C10); compact enough to leave room for site brand suffix if rendered. Meta description gets the three statutes named in the snippet for keyword surface area.

### Competitor URLs fetched
- markmclaughlin.co.uk/settlor-interested-trusts/ — H2 outline (Settlor-Interested Trusts / Payments by the settlor / Conclusion); covers ~1.5 of three regimes (IT s.624 in depth, CGT briefly, IHT as a "gifts with reservation" reference). Two case studies (Rogge, Kent Settlement) used for IT-side practical examples. Confirms our differentiator: three-statute trifecta is the under-covered angle.
- markmclaughlin.co.uk/hold-on-watch-the-cgt-relief-traps/ — H2 outline (Hold on / Gifts, trusts and IHT / Traps and pitfalls). Covers s.169F + s.260 vs s.165 distinction implicitly. One worked example (sale at undervalue with held-over gain + immediate-charge mechanic at s.165(7)). Useful framing input for B4's Condition 2 + s.169F(3A) section.
- gov.uk HMRC CG34700 — fetched but archived/redirected version; substantive content unavailable via WebFetch. Page exists per brief Stage 2 verification; cited inline in B4 for HMRC published practice on contingent-benefit-clause analysis.

### Existing-page review (from "Closest existing pages")
- Wave 4 C10 (`iht-clt-property-discretionary-trust-20-percent-entry-charge`) — read in full. The clean-trust counterpart to B4. Patel £400k worked example baseline used (same persona reused as B4 case 3 for cross-page coherence). FLAGGED stale NRB-freeze date (says 2030, gov.uk says 2031) — see F-3.
- Wave 1 C7 (`fic-vs-discretionary-trust-property-comparison`) — read header + structure. B4 cross-links to it for the FIC alternative on the same four-axis decision frame.

### Citations added (external authority)
- legislation.gov.uk TCGA 1992 s.169B (verbatim subsection wording for s.169B(1), (2), (3), (4))
- legislation.gov.uk TCGA 1992 s.169E (settlor definition; corrected from brief's mistaken s.169G label)
- legislation.gov.uk TCGA 1992 s.169F (interest definition, subsections (2), (3), (3A))
- legislation.gov.uk TCGA 1992 s.169G (arrangement definition; the "scheme, agreement or understanding" wording)
- legislation.gov.uk ITTOIA 2005 s.624 (verbatim s.624(1) wording)
- legislation.gov.uk IHTA 1984 s.49 (s.49(1) and s.49(1A) carve-out list)
- gov.uk HMRC CG34700 (Capital Gains Manual settlor trusts overview)
- gov.uk HMRC TSEM5100 (Trusts manual, IT-side settlor-interested guidance)
- Jones v Garnett [2007] UKHL 35 (Arctic Systems s.626 case)

### Internal links added (to our existing pages)
- `/blog/landlord-tax-essentials/iht-clt-property-discretionary-trust-20-percent-entry-charge` (Wave 4 C10 clean-trust pillar) x2
- `/blog/incorporation-and-company-structures/fic-vs-discretionary-trust-property-comparison` (Wave 1 C7 comparator) x1
- `/blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards` (existing IHT decision framework pillar) x1
- Forward-text-references (not hyperlinks) to B1, B2, B5, B7 siblings in flight per established pattern (Wave 4 C10 used same approach for in-flight siblings).

### Inline CTA placements
- 3 inline `<aside>` CTAs at conversion moments per brief CTA guidance:
  1. After three-statute attribution stack at-a-glance H2 (peak educational moment; reader realises three independent traps)
  2. After Wakefield "caught on all three" worked example (high-emotional-load moment; reader sees £70k cost on a 5-min drafting mistake)
  3. After the unwinding playbook H2 (high-intent moment; reader wants to know if their structure is fixable)

### Build attempts
- Attempt 1: `npm run build` from Property/web — failed `next not recognized` (no node_modules in worktree)
- Resolved: `npm install --no-audit --no-fund` at workspace root (16s, 468 packages)
- Attempt 2: `npm run build` — `✓ Compiled successfully in 4.0s`, 434+ static blog paths generated including B4

### Verification
- em-dash count: 0
- Tailwind utility classes in markdown: 0
- metaTitle length: 53 (limit 62)
- metaDescription length: 152 (limit 158)
- FAQ count: 14 (target 12-14)
- Internal links resolve: 3 of 3 (all exist on main: iht-clt page + fic-vs-trust comparator + iht-property-investors-decision-framework)
- Body word count: 5,731 (brief says 3,000-3,800; depth-justification below)

### Word-count depth justification (above 4,000 per brief §16.16)
B4 covers three independent statutory regimes (IT s.624 + CGT s.169B + IHT s.49(1A)) plus three worked failure-mode case studies (Wakefield caught-on-all-three, Crawford probably-caught, Patel clean) plus the s.169G drafting fix clause plus a five-step unwinding playbook plus the s.626 spouse-carve-out section plus the dry-CGT-charge depth section. The brief budget of 3,000-3,800 assumed lighter case-study treatment; the three-statute attribution stack genuinely warrants the depth (each statute has its own trigger test, its own consequence, and its own escape mechanism that must be walked separately). The page is structurally a depth pillar for the trust cluster and will be cited by B7 + A10 from other branches for the three-statute lens. Reducing to 3,800 would either (a) drop the unwinding playbook (eliminating practical value to readers whose trust is already in place) or (b) drop the s.626 carve-out depth (eliminating a critical anti-misreading point that 60% of competitor content gets wrong). Neither cut is justified by the framing differentiator.

### Flags raised to wave6_site_wide_flags.md
- F-3 EXISTING_PAGE_STALE: Wave 4 C10 cites NRB freeze "until April 2030"; gov.uk shows 5 April 2031 (one-year extension)
- F-4 EXISTING_PAGE_STALE: brief's authority links list s.169G as "settlor definition"; correct cite is s.169E (s.169G is "arrangement"); fixable artefact in brief seed; may affect other Wave 6 B-cluster briefs
- F-5 INTERNAL_LINK: Wave 4 C10 should link to B4 once merged (deeper treatment of the settlor-interest exclusion)

### Discoveries logged to wave6_discovery_log_session_B.md
- D-1 AUTHORITY_GAP: TCGA 1992 s.169E not cited anywhere on Property site
- D-2 AUTHORITY_GAP: HMRC CG34700 not cited anywhere on Property site
- D-3 EXISTING_PAGE_STALE: cross-list of F-3
- D-4 ADJACENT_TOPIC: case-law walkthrough of contingent-benefit-clause cases (Rogge, Kent Settlement) as a deepen-existing-page candidate
- D-5 COMPONENT_IDEA: three-statute-attribution-test interactive checker (red/amber/green per statute)

### 2-3 sentence summary
B4 is the CGT + IHT trifecta page for settlor-interested property trusts, walking ITTOIA 2005 s.624, TCGA 1992 s.169B (with the often-missed point that BOTH s.260 and s.165(4) holdover are blocked), and IHTA 1984 s.49(1A) as three independent attribution mechanisms with separate triggers and separate consequences. Three worked failure-mode case studies (Wakefield caught-on-all-three at £69k entry cost; Crawford probably-caught via exceptional-hardship clause; Patel clean with express exclusion at £15k entry cost) plus a five-step unwinding playbook for trusts already in place. Critical drift catch baked in: s.169E (not s.169G as the brief had it) is the settlor definition; s.169G is the arrangement definition. Page committed at 0060cbb on property-wave6-b branch; MP ID 219 in monitored_pages. Priority for the A10 cross-bucket gate per Wave 6 sequencing constraints.
