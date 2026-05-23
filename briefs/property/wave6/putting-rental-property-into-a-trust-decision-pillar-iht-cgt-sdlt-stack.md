# Wave 6 brief: putting-rental-property-into-a-trust-decision-pillar-iht-cgt-sdlt-stack

**Site:** property
**Bucket:** B (Trusts + §24.7 adult/minor-child + settlements + GROB)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/putting-rental-property-into-a-trust-decision-pillar-iht-cgt-sdlt-stack.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/putting-rental-property-into-a-trust-decision-pillar-iht-cgt-sdlt-stack

---

## Manager pre-decisions

- **Suggested slug:** `putting-rental-property-into-a-trust-decision-pillar-iht-cgt-sdlt-stack`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** B (Trusts + §24.7 adult/minor-child + settlements + GROB)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Pillar entry-point for the Bucket B cluster. The decision facing a property-owner reader is rarely "trust yes/no" but **which trust type** for which estate-planning goal: IPDI (life-tenant via will), discretionary (lifetime CLT into relevant property regime), bare (PET, full transparency for IT and CGT, no 10-year charges), or FIC-alternative (corporate vehicle, no 10-year charges, no s.260 holdover). Frames the **three-tax stack** as the decision spine: (1) IHT entry (CLT at 20% above NRB for discretionary; PET for bare; nil for IPDI on death; nil for FIC because share-gift is PET not CLT); (2) CGT entry (TCGA 1992 s.260 holdover available for CLT into non-settlor-interested discretionary; not available for bare trust because no CLT; not available for FIC because no CLT); (3) SDLT entry (FA 2003 Sch 4 chargeable consideration includes any mortgage debt assumed by the trustees, even where no cash changes hands). Differentiator from Wave 4 C10 (`iht-clt-property-discretionary-trust-20-percent-entry-charge`, the discretionary-only deep-dive) and Wave 1 C7 (`fic-vs-discretionary-trust-property-comparison`, the binary FIC-vs-trust): B1 is the multi-trust-type pillar that maps the four-vehicle decision and forward-links to each deep page. Cluster pillar — every other Bucket B page forward-links from a "where does this fit on the trust-decision pillar" section to B1.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Cluster pillar for Bucket B. Sits structurally analogous to Wave 2 A1 (`iht-property-investors-decision-framework-2026-onwards`) for IHT-decision-framework; B1 is the trust-mechanism-decision pillar. No within-bucket sequencing constraint for B1 itself; everything else in Bucket B forward-links to B1.

**HOUSE_POSITION_CONFLICT signal context:** §22.13 (Trust-vs-FIC decision boundary) is the primary anchor. §22.9, §22.10, §22.11, §22.12 are sub-pillar anchors that B1 references but does not re-walk in depth. §22.12 reflects the post-FA-2025 s.48ZA long-term-resident framework replacing the omitted s.48(3)-(3F): if the page touches offshore-trust IHT excluded property at all, must use s.48ZA.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, decision-framework depth, treatment of the three-tax-stack (IHT + CGT + SDLT), worked-example patterns. **Some competitor articles conflate trust-vs-FIC into a binary choice; our pillar maps four vehicles, not two.**

- https://www.taxinsider.co.uk/tax-articles/so-you-want-to-put-your-rental-property-into-trust — verified live 2026-05-23 (200). Strongest Tax Insider piece on the trust decision; useful for outline reference. Treats the income-tax outcome under the discretionary-trust 45% RAT rate (correct) and the s.260-holdover available-only-with-IHT-charge mechanic.
- https://www.taxinsider.co.uk/tax-articles/using-trusts-the-types-of-trusts — verified live 2026-05-23 (200). Tax Insider's trust-type taxonomy; useful for the bare / IIP / discretionary / accumulation framing.
- https://uklandlordtax.co.uk/inheritance-tax-on-property-2/ — verified live 2026-05-23 (200). UK Landlord Tax pillar on landlord IHT; touches trusts briefly. Useful for landlord-cohort framing.
- https://www.rossmartin.co.uk/trusts/4223-uk-trusts-at-a-glance — verified live 2026-05-23 (200). Ross Martin's trusts-at-a-glance overview; useful for the trust-type taxonomy and 2025-onwards positioning.
- https://www.clarkewillmott.com/news/inheritance-tax-planning-and-rental-properties/ — verified live 2026-05-23 (200). Clarke Willmott solicitor view of IHT planning for landlords; useful for the holdover + 20% CLT entry framing.
- https://myprobatesolicitors.co.uk/understanding-holdover-relief-a-key-tax-strategy-when-putting-property-into-trust/ — verified live 2026-05-23 (200). Holdover-relief explainer in the trust-into-property context; useful for s.260 mechanic narrative.

**Borrowable patterns:** Tax Insider's typology + Ross Martin's at-a-glance structure. Our differentiator: explicit four-vehicle decision tree (IPDI / discretionary / bare / FIC) with the three-tax stack on each axis, and explicit flag that s.260 holdover is **conditional on non-settlor-interest** under TCGA 1992 ss.169B-169G — most competitor content omits the s.169B restriction and overstates s.260 availability.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "putting rental property in trust", "rental property trust UK tax", "buy to let trust IHT", "transfer property to trust".*

---

## Closest existing pages

- `iht-clt-property-discretionary-trust-20-percent-entry-charge` (Wave 4 C10) — discretionary-only deep-dive on the 20% CLT mechanic. B1 forward-links to C10 from the "Discretionary trust deep-dive" decision-tree branch.
- `fic-vs-discretionary-trust-property-comparison` (Wave 1 C7) — binary trust-vs-FIC comparison. B1 absorbs the comparison into the four-vehicle decision and forward-links to C7 for the deep FIC-vs-discretionary comparison.
- `iht-property-investors-decision-framework-2026-onwards` (Wave 2 A1) — sibling pillar on the IHT decision framework. Cross-link (B1 covers the trust-mechanism-decision; A1 covers the broader IHT decision).
- `inheritance-tax-rental-property-uk-guide` (legacy) — predecessor IHT pillar; B1 is the trust-mechanism extension. Cross-link from B1's introduction.
- `iht-residence-nil-rate-band-2m-taper-property-portfolios` (Wave 2 A8) — RNRB pillar; B1 references in the IPDI branch (RNRB available through IPDI for spouse-life-then-children).
- `iht-spouse-exemption-second-death-property-portfolio-window-mechanics` (Wave 4 C2) — spouse-exemption pillar; B1 references in the IPDI branch.

**Cannibalisation discipline:**
- B1 is the trust-decision pillar; do NOT re-walk Wave 4 C10's 20% CLT mechanic in depth (forward-link). Do NOT re-walk Wave 1 C7's FIC-vs-discretionary comparison in depth (forward-link). Do NOT re-walk Wave 2 A1's broader IHT decision framework (cross-link).
- B1's role: map four vehicles, set the three-tax stack as the decision spine, send the reader to the right deep page.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no old-slug redirect overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory (all verified 2026-05-23 against legislation.gov.uk):**
- IHTA 1984 ss.43-58 (settled property + IIP architecture): https://www.legislation.gov.uk/ukpga/1984/51
- IHTA 1984 s.49 "Treatment of interests in possession" (with s.49(1A) post-22-March-2006 narrowing): https://www.legislation.gov.uk/ukpga/1984/51/section/49
- IHTA 1984 s.64 (10-year periodic charge on relevant property): https://www.legislation.gov.uk/ukpga/1984/51/section/64
- IHTA 1984 s.48ZA "Excluded property: property situated outside the UK etc" (NEW, inserted by FA 2025 s.45 with effect from 6 April 2025): https://www.legislation.gov.uk/ukpga/1984/51/section/48ZA
- TCGA 1992 s.260 "Gifts on which inheritance tax is chargeable etc.": https://www.legislation.gov.uk/ukpga/1992/12/section/260
- TCGA 1992 s.169B "Gifts to settlor-interested settlements etc": https://www.legislation.gov.uk/ukpga/1992/12/section/169B
- TCGA 1992 s.60 "Nominees and bare trustees" (bare-trust transparency): https://www.legislation.gov.uk/ukpga/1992/12/section/60
- FA 2003 Sch 4 para 8 (SDLT chargeable consideration including assumed debt): https://www.legislation.gov.uk/ukpga/2003/14/schedule/4

**HMRC manuals (all verified 2026-05-23 except as noted):**
- IHTM42000 (trusts chapter index): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm42000
- IHTM16060 (IIPs general): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm16060
- IHTM16121 (IIPs definition and operative test): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm16121
- IHTM04032 (IPDI mechanics): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm04032
- CG67030 (holdover relief general): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg67030
- CG34700 (settlor trusts overview): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg34700
- TSEM1565 (bare trusts): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem1565

**Cross-references in house_positions.md:** §22.13 (Trust-vs-FIC decision boundary, primary anchor); §22.9 (settlements legislation ITTOIA 2005 ss.620-628); §22.11 (GROB family-home depth); §22.12 (IHT settlor-interested trusts + new s.48ZA); §22.4 (CLT into discretionary, existing Wave 4 position); §22.6 (FIC as IHT value-freeze tool, existing); §15.2 (GROB family home overview).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify every numeric tax figure (thresholds, rates, deadline-days) against current gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification. Particularly: NRB £325,000; RNRB £175,000; £2m RNRB taper threshold; 20% CLT entry rate; 6% periodic-charge max; CGT residential rates 18%/24%; SDLT bands.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate in body.
- `<aside>` styled by global CSS. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs. Conversion moments:
  - After the four-vehicle comparison table (high-intent decision-point moment)
  - After the SDLT-assumed-debt section (overlooked trap; high-value adviser moment)
  - After the offshore / non-resident s.48ZA section if covered (specialist territory)
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.
- HowTo schema NOT a fit here (this is a decision page, not a step-by-step process).

### Cannibalisation
- B1 is the **pillar**. Read C10 (Wave 4) + C7 (Wave 1) + A1 (Wave 2) before writing; forward-link to each from the relevant decision-tree branch. Do not duplicate their depth.

### House positions
- **§22.13 is your primary working detail.** §22.9, §22.10, §22.11, §22.12 are sub-pillar anchors. Use §22.12 for any IHT-side framing; do not cite the omitted s.48(3)-(3F).

### Quality bar
- Word count: 3,000-4,000 body (pillar, longer than mechanic pages).
- FAQs: 12-14.
- New external authority links: 6-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.
- Open with a decision-framing concrete (a four-vehicle choice readers face), not with "What is a trust" definition.

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
