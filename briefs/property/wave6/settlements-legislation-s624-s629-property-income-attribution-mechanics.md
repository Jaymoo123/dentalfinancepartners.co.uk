# Wave 6 brief: settlements-legislation-s624-s629-property-income-attribution-mechanics

**Site:** property
**Bucket:** B (Trusts + §24.7 adult/minor-child + settlements + GROB)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/settlements-legislation-s624-s629-property-income-attribution-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/settlements-legislation-s624-s629-property-income-attribution-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `settlements-legislation-s624-s629-property-income-attribution-mechanics`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** B (Trusts + §24.7 adult/minor-child + settlements + GROB)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The **statutory mechanic page** for ITTOIA 2005 Part 5 Chapter 5 (Settlements: amounts treated as income of settlor). Walks the section architecture in order: s.620 "Meaning of 'settlement' and 'settlor'" (the deliberately broad definition catches any disposition, trust, covenant, agreement, arrangement, or transfer of assets, no formal trust required); s.624 "Income where settlor retains an interest" (the attribution rule; verbatim s.624(1) verified against legislation.gov.uk on 2026-05-23 quoting "during the life of the settlor" and "property in which the settlor has an interest"); s.625 "Settlor's retained interest" (defines retained interest by reference to property payable to or applicable for the settlor or spouse); s.626 "Exception for outright gifts between spouses or civil partners" (the *Arctic Systems* / *Jones v Garnett* [2007] UKHL 35 carve-out, with **Condition A** = gift carries right to whole income and **Condition B** = property not wholly or substantially a right to income); s.627 (separation / commercial / pension carve-outs); s.628 "Exception for gifts to charities" (NOT a 5% rule — there is no 5% threshold in s.628); **s.629 "Income paid to relevant children of settlor"** (the separate-mechanism minor-child attribution rule with £100 de-minimis per s.629(3)); s.631 "Retained and accumulated income" (anti-bunch-payments-at-18 rule). **Critical conceptual point that competitor content often blurs:** s.624 (settlor-with-interest) and s.629 (minor-child of settlor) are TWO SEPARATE statutory mechanisms; a single arrangement can engage one, the other, both, or neither. Three worked attribution scenarios in property context: (1) bare trust for minor child of settlor (s.629 catches income above £100, s.624 also engaged where spouse is in any benefit class); (2) declaration of trust to adult child living rent-free in settled property (probably a "settlement" within s.620 width and s.624 attribution if settlor retains any benefit hook); (3) grandparent-to-grandchild bare trust bypassing parent (s.624 / s.629 do NOT attribute to the parent — grandparent is the settlor, attribution is to the grandparent). This is the **deep statutory anchor** all other Bucket B pages cite. Differentiator from Wave 4 A2 (`alphabet-shares-property-spv-dividend-splitting-spouse-children`): A2 is the SPV/share-class application; B2 is the personal/property-income statutory walkthrough.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Statutory mechanic page for the Bucket B cluster. Cited by A2 (already deployed), A10 (Bucket A on A-branch), B1, B4, B7, B8, B9. No within-bucket sequencing constraint for B2 itself; B2 needs to ship early in the B-branch so B4/B7/B8/B9 can cite it.

**HOUSE_POSITION_CONFLICT signal context:** §22.9 (Settlements legislation ITTOIA 2005 ss.620-628) and §22.10 (Minor-child attribution s.629 + s.631) are the primary anchors. Both reflect the s.620 broad definition, s.624 verbatim wording, the s.626 Arctic Systems carve-out, the s.628-is-charities-not-5% drift catch from Stage 1b, the s.629 £100 de-minimis, and the grandparent-route exception.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, statutory citation density, treatment of the s.624-vs-s.629 distinction, Arctic Systems treatment. **Flag any competitor that conflates s.624 (settlor-with-interest) and s.629 (minor-child) into a single rule.**

- https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4200 — verified live 2026-05-23 (200). HMRC's TSEM4200 settlor-retains-an-interest chapter; canonical statement of how HMRC interprets s.624. Use for citation, not pattern-mirroring.
- https://www.contractorcalculator.co.uk/contractor_guide_settlements_legislation_s624.aspx — verified live 2026-05-23 (200). Contractor-context settlements primer (Arctic Systems-era classic). Useful for the s.626 outright-gift mechanic narrative even though contractor / property contexts differ.
- https://hlwa.co.uk/what-is-the-settlement-legislation/ — verified live 2026-05-23 (200). Mid-tier accountancy blog explainer; useful for plain-English framing of the s.620 width and s.624 attribution hook.
- https://www.accaglobal.com/gb/en/technical-activities/technical-resources-search/2013/january/tc-garnett-v-jones.html — verified live 2026-05-23 (200). ACCA technical note on the *Garnett v Jones (Arctic Systems)* case. Useful for the s.626 Conditions A + B framing and the case-law citation.
- https://www.taxationweb.co.uk/tax-articles/inheritance-tax-iht-trusts-estates-capital-taxes/capital-gains-tax-settlor-interested-trusts.html — verified live 2026-05-23 (200). Mark McLaughlin piece on settlor-interested trusts CGT angle; useful for cross-mechanism (s.624 + s.169B) framing although primary anchor for the CGT side is B4 not B2.
- https://www.markmclaughlin.co.uk/settlor-interested-trusts/ — verified live 2026-05-23 (200). Mark McLaughlin's settlor-interested-trusts piece; useful for the income-tax-side narrative complementing B4's CGT-side framing.

**Borrowable patterns:** HMRC TSEM4200 outline; ACCA Arctic Systems framing for s.626 Conditions A + B. Our differentiator: explicit s.624 / s.629 separation (most competitor content conflates), explicit grandparent-route exception worked example, explicit treatment of the s.628-charities-no-5%-rule drift catch.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "settlements legislation s624", "Arctic Systems property", "settlor interested trust income", "ITTOIA s629 minor child".*

---

## Closest existing pages

- `alphabet-shares-property-spv-dividend-splitting-spouse-children` (Wave 4 A2) — SPV-application of the same statutory framework. B2 forward-links to A2 from the "Where this rule bites in corporate structures" reference.
- `section-24-child-benefit-high-income-charge-landlords` (existing) — adjacent topical; references settlements legislation in passing. Cross-link from B2's child-attribution section.
- `unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share` (Wave 5 C6) — adjacent rental-income-split mechanic for non-marital cohabitants; cross-link from B2's settlements-vs-actual-beneficial-share boundary discussion.
- `fic-vs-discretionary-trust-property-comparison` (Wave 1 C7) — references the s.624 attribution in the trust-side analysis; cross-link.
- B1 `putting-rental-property-into-a-trust-decision-pillar-iht-cgt-sdlt-stack` (Wave 6 sibling) — pillar; B2 forward-links from the "What this rule means at the trust-decision stage" section.

**Cannibalisation discipline:**
- B2 is the **statutory mechanic page** for the income-tax side. B4 is the CGT + IHT trifecta (settlor-interested for TCGA s.169B + IHTA s.49(1A)). Different statutory hooks, different mechanic. B2 must not stray into B4's CGT/IHT territory beyond cross-linking.
- B2 must not stray into B5/B7 GROB territory (which is IHT-side under FA 1986 s.102, completely different statutory hook).

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no old-slug redirect overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory (all verified 2026-05-23 against legislation.gov.uk):**
- ITTOIA 2005 s.620 "Meaning of 'settlement' and 'settlor'": https://www.legislation.gov.uk/ukpga/2005/5/section/620
- ITTOIA 2005 s.624 "Income where settlor retains an interest": https://www.legislation.gov.uk/ukpga/2005/5/section/624
- ITTOIA 2005 s.625 (settlor's retained interest definition): https://www.legislation.gov.uk/ukpga/2005/5/section/625
- ITTOIA 2005 s.626 "Exception for outright gifts between spouses or civil partners": https://www.legislation.gov.uk/ukpga/2005/5/section/626
- ITTOIA 2005 s.627 (separation / commercial / pension exception): https://www.legislation.gov.uk/ukpga/2005/5/section/627
- ITTOIA 2005 s.628 (charities exception — NOT a 5% rule): https://www.legislation.gov.uk/ukpga/2005/5/section/628
- ITTOIA 2005 s.629 "Income paid to relevant children of settlor": https://www.legislation.gov.uk/ukpga/2005/5/section/629
- ITTOIA 2005 s.631 "Retained and accumulated income": https://www.legislation.gov.uk/ukpga/2005/5/section/631
- ITA 2007 s.466 "Meaning of 'settled property' etc": https://www.legislation.gov.uk/ukpga/2007/3/section/466

**Case law (verified):**
- *Jones v Garnett (Arctic Systems Ltd)* [2007] UKHL 35: https://publications.parliament.uk/pa/ld200607/ldjudgmt/jd070725/jones.pdf
- HMRC settlement of the post-Arctic-Systems position: HMRC Brief 03/2008.

**HMRC manuals (all verified 2026-05-23):**
- TSEM4000 (settlements chapter index): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4000
- TSEM4200 (settlor retains an interest): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4200
- TSEM4205 (minor children attribution): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4205
- TSEM4210 (spousal attribution): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4210
- TSEM4300 (settlement for unmarried minor child): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4300

**Cross-references in house_positions.md:** §22.9 (Settlements legislation ITTOIA 2005 ss.620-628), §22.10 (Minor-child attribution s.629 + s.631), §22.13 (Trust-vs-FIC decision boundary, cross-link for "where in the structural decision does s.624 bite").

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify every numeric tax figure (£100 de-minimis under s.629(3), date 22 March 2006 FA 2006 cutoff, date 6 April 2025 FA 2025 cutoff) against current gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate in body.
- `<aside>` styled by global CSS. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs. Conversion moments:
  - After the s.626 Arctic Systems Conditions A + B section (high-intent: alphabet-shares context)
  - After the s.629 grandparent-route worked example (high-value: many readers do not know about this route)
  - After the "Three failure-mode scenarios" worked-example section
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.
- HowTo schema NOT a fit (statutory mechanic, not a how-to process).

### Cannibalisation
- B2 is the **statutory mechanic page** for the income-tax side. Read A2 + B1 + the legacy `section-24-child-benefit` page before writing; avoid walking the SPV alphabet-share mechanic (A2's lane) or the trust-vs-FIC decision (B1's lane).

### House positions
- **§22.9 and §22.10 are your primary working detail.** §22.9 contains the verbatim s.620 / s.624 / s.625 / s.626 / s.627 / s.628 walkthrough. §22.10 contains the s.629 / s.631 walkthrough + the grandparent-route mechanism. Both are house-locked at HEAD 2026-05-23.
- **CRITICAL drift catches to honour:** (a) s.628 is the charities exception, NOT a 5% rule; (b) s.624 (settlor-with-interest) and s.629 (minor-child) are SEPARATE statutory mechanisms (do not conflate); (c) bare trust DOES NOT escape s.629 (bare-trust mechanism affects CGT/IHT, not income-tax attribution).

### Quality bar
- Word count: 2,800-3,500 body.
- FAQs: 12-14.
- New external authority links: 6-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.
- Open with the s.620 width point (any "disposition, trust, covenant, agreement, arrangement or transfer of assets" can be a settlement), not with "What is the settlements legislation".

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
