# Wave 6 brief: gifting-property-to-minor-children-bare-trust-mechanics-tax-traps

**Site:** property
**Bucket:** B (Trusts + §24.7 adult/minor-child + settlements + GROB)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/gifting-property-to-minor-children-bare-trust-mechanics-tax-traps.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/gifting-property-to-minor-children-bare-trust-mechanics-tax-traps

---

## Manager pre-decisions

- **Suggested slug:** `gifting-property-to-minor-children-bare-trust-mechanics-tax-traps`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** B (Trusts + §24.7 adult/minor-child + settlements + GROB)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> **Minor-child-cohort** applied counterpart to B8 (adult-child decision-tree). The statutory frame is radically different because minor children cannot hold legal estate in land under Settled Land Act 1925 s.1(7) and TOLATA 1996 s.2-4 (the historic rule is preserved post-1996), and because **ITTOIA 2005 s.629 "Income paid to relevant children of settlor"** attributes property income above £100/yr per settlement back to the settlor parent. **Critical conceptual point: s.629 (parental settlement minor-child) is a SEPARATE statutory mechanism from s.624 (settlor-with-interest)** — many practitioner sources conflate them. Some arrangements engage one, the other, both, or neither. For parent-to-minor-child property gifts, **s.629 attribution bites on rental income regardless of whether the parent retains any interest**; the issue is the parent-as-settlor + minor-child-as-recipient pattern, not the parent retaining an interest. **Capital growth is NOT attributed under s.629** — this is the operative loophole used by parents who want to crystallise CGT base cost in the child's hands now (using parent's higher AEA + child's AEA from gift onwards) accepting that the rental income attributes back. **Bare trust required** because minor cannot hold land directly; legal title vests in parent (or appointed trustees) as bare trustees per TCGA 1992 s.60 + ITA 2007 s.466 (see B6 for the structural detail). **Anti-avoidance: parental settlements are caught at all levels** — bare trust does NOT escape s.629 (bare-trust mechanism affects only CGT and IHT, not income-tax attribution). **Two worked scenarios in property context**: (a) **grandparent-to-grandchild bare trust** — grandparent settles £200k flat as bare trust for 8-year-old grandchild; grandparent is the "settlor" for s.629 purposes (not the parent); s.629 attributes the rental income to grandparent if grandparent is the parent, but here grandparent is NOT the parent, so s.629 does NOT bite; rental income is the grandchild's, taxed at child rates with full personal allowance; CGT base cost is gift-MV (TCGA s.17); capital growth accrues in grandchild's hands free of s.629; PET for IHT runs from gift; this is the cleanest minor-child route; (b) **parent-to-minor-child bare trust** — parent settles a 10% share in BTL as bare trust for 12-year-old child; s.629 catches rental income above £100/yr (bites at parent's marginal rate, no child personal allowance available for the attributed portion); capital growth still accrues in child's hands tax-free until 18 (cliff prospectively — s.629 ceases to apply from child's 18th birthday, no retrospective re-attribution); IHT mechanics: gift is PET (bare trust is not "settled property" for IHT per s.43); 7-year clock runs from gift date. **Companion to B6** (bare-trust structural decision) — B9 applies B6's structural choice to minors specifically. **Companion to B2** (the s.629 statutory walkthrough) — B9 is the **property-investor applied page** for the parent-to-minor scenario.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Adjacent to B8 on the cohort axis. Distinct statutory frame (s.629 + SLA 1925 / TOLATA 1996) — separate page. No within-bucket sequencing constraint.

**HOUSE_POSITION_CONFLICT signal context:** §22.10 (Minor-child attribution — ITTOIA 2005 s.629 + s.631) is the primary anchor. House-locked at HEAD 2026-05-23 with verbatim s.629(1) wording, £100 de-minimis under s.629(3), and the grandparent-route exception explanation. The 18th-birthday-cliff treatment is in §22.10; the "bare trust DOES NOT escape s.629" drift catch is in §22.15.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, s.629 treatment depth, treatment of grandparent-route, treatment of capital-growth-not-attributed point.

- https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4300 — verified live 2026-05-23 (200). HMRC TSEM4300 settlement for unmarried minor child. Canonical citation.
- https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4200 — verified live 2026-05-23 (200). HMRC TSEM4200 settlor-retains-an-interest (broader settlements legislation).
- https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4205 — verified live 2026-05-23 (200). HMRC TSEM4205 minor children attribution.
- https://www.accaglobal.com/content/dam/ACCA_Global/Technical/fact/tf-shares-owned-by-children-0222.pdf — verified live 2026-05-23 (200). ACCA technical factsheet on shares-owned-by-children; useful for the s.629 / s.660 mechanic and the parent-vs-grandparent settlor distinction.
- https://techzone.aberdeenadviser.com/public/iht-est-plan/Prac-guide-gifting-child-grand — verified live 2026-05-23 (200). Abrdn adviser practical guide on gifting to children and grandchildren; useful for the IHT side and bare-trust-for-minor mechanics.
- https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm42803 — verified live 2026-05-23 (200). HMRC IHTM42803 bare trusts for minors.

**Borrowable patterns:** HMRC TSEM4300 + ACCA factsheet wording precision. Our differentiator: explicit grandparent-vs-parent settlor framing with both worked scenarios side-by-side (most competitor content covers one or the other but rarely both with the s.629 attribution path drawn through to show why the grandparent route avoids attribution); explicit capital-growth-vs-income distinction (most competitor content doesn't surface that s.629 attributes income only, not gains); explicit reference to the 18th-birthday prospective-only cliff.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "gift property to minor child", "bare trust for minor property", "settlements legislation s629", "grandparent gift property grandchild".*

---

## Closest existing pages

- B8 `gifting-property-to-adult-children-decision-tree-cgt-iht-occupancy-mechanics` (Wave 6 sibling) — adult-child counterpart. B9 forward-links from "For adult children see B8" and B8 forward-links to B9.
- B2 `settlements-legislation-s624-s629-property-income-attribution-mechanics` (Wave 6 sibling) — statutory walkthrough. B9 forward-links from "Full statutory mechanic at B2".
- B6 `bare-trust-vs-nominee-company-vs-formal-trust-decision-property-investors` (Wave 6 sibling) — bare-trust structural. B9 forward-links from "Bare-trust structure for minors (see B6 for the structural choice)".
- `cgt-gifting-property-family-members-uk` (legacy) — base CGT mechanic. Cross-link.
- `section-24-child-benefit-high-income-charge-landlords` (existing) — adjacent topical; cross-link from B9's "child benefit interaction" sub-point if relevant.
- `iht-7-year-clock-property-gifting-mid-life-landlord-strategy` (Wave 4 C4) — parent-side 7-year clock; cross-link for IHT mechanic.

**Cannibalisation discipline:**
- B9 is the **minor-child applied page** for property gifts. B8 is the adult-child counterpart; B2 is the statutory walkthrough; B6 is the bare-trust structural choice. B9 must reference but not re-walk any of these three in depth.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no old-slug redirect overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory (all verified 2026-05-23 against legislation.gov.uk):**
- ITTOIA 2005 s.629 "Income paid to relevant children of settlor": https://www.legislation.gov.uk/ukpga/2005/5/section/629
- ITTOIA 2005 s.631 "Retained and accumulated income": https://www.legislation.gov.uk/ukpga/2005/5/section/631
- ITTOIA 2005 s.624 (settlor-with-interest — separate but adjacent): https://www.legislation.gov.uk/ukpga/2005/5/section/624
- TCGA 1992 s.60 "Nominees and bare trustees": https://www.legislation.gov.uk/ukpga/1992/12/section/60
- TCGA 1992 s.17 (MV deemed disposal): https://www.legislation.gov.uk/ukpga/1992/12/section/17
- ITA 2007 s.466 "Meaning of 'settled property' etc": https://www.legislation.gov.uk/ukpga/2007/3/section/466
- IHTA 1984 s.3A "Potentially exempt transfers": https://www.legislation.gov.uk/ukpga/1984/51/section/3A
- IHTA 1984 s.43 (settlement definition for IHT): https://www.legislation.gov.uk/ukpga/1984/51/section/43
- Trusts of Land and Appointment of Trustees Act 1996 (TOLATA 1996) ss.2-4: https://www.legislation.gov.uk/ukpga/1996/47
- Settled Land Act 1925 s.1(7) (minor cannot hold legal estate in land): https://www.legislation.gov.uk/ukpga/1925/18/section/1

**HMRC manuals (all verified 2026-05-23):**
- TSEM4200 (settlor retains an interest): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4200
- TSEM4205 (minor children attribution): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4205
- TSEM4300 (settlement for unmarried minor child): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4300
- IHTM42803 (bare trusts for minors): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm42803
- TSEM1565 (bare trusts): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem1565

**Cross-references in house_positions.md:** §22.10 (Minor-child attribution — ITTOIA 2005 s.629 + s.631, primary anchor); §22.9 (Settlements legislation broader cross-ref); §22.12 (bare trusts treated as outside settlement for IHT, cross-ref for IHT-side mechanics); §24.7 (existing adult-child + minor-child co-ownership settlements traps).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify £100 de-minimis under s.629(3), 18th-birthday cliff, CGT residential rates 18%/24%, AEA £3,000, NRB £325,000, 7-year PET clock against current gov.uk at write time per §16.35.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate in body.
- `<aside>` styled by global CSS. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs. Conversion moments:
  - After the grandparent-vs-parent worked scenarios comparison (peak decision-point moment)
  - After the "capital-growth-not-attributed" loophole explanation (high-value: many readers won't have known this)
  - After the 18th-birthday-cliff treatment (transition-planning intent moment)
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- B9 is the **minor-child applied page**. Read B2 + B6 + B8 + Wave 4 C4 before writing. Forward-link rather than duplicate.

### House positions
- **§22.10 is your primary working detail.** §22.9 + §22.12 are cross-refs.
- **CRITICAL drift to avoid:** (a) do NOT cite IHTA 1984 s.48(3)-(3F) (omitted by FA 2025 s.45). (b) do NOT assert bare trust escapes s.629 for income tax (it does NOT — the bare-trust mechanism affects CGT and IHT only). (c) do NOT conflate s.624 (settlor-with-interest) and s.629 (minor-child of settlor) — separate statutory mechanisms. (d) do NOT assert s.629 attributes income to the parent in a grandparent-to-grandchild scenario (the grandparent is the settlor; attribution is to the grandparent). (e) do NOT assert "bare trust for minor child escapes settlements legislation for income tax" (this is in the §22.15 do-not-write list).

### Quality bar
- Word count: 2,800-3,500 body.
- FAQs: 12-14.
- New external authority links: 6-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.
- Open with the radical-statutory-frame-difference framing (gifting to minors is not "gifting to adult children with extra paperwork" — different statute, different attribution mechanic, different traps), not with "Can I gift property to my minor child".

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
