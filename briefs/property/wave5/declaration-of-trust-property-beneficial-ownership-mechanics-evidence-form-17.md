# Wave 5 brief: declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17

**Site:** property
**Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17

---

## Manager pre-decisions

- **Suggested slug:** `declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The declaration of trust is the documentary evidence of beneficial ownership unequal to legal ownership. The 90/10 / 70/30 / 60/40 declared shares that Form 17 references (C1) must be evidenced by a contemporaneous declaration of trust, OR by a Land Registry record of unequal tenants-in-common with restriction. This page is the declaration-of-trust mechanic page: drafting requirements (Law of Property Act 1925 s.53(1)(b) writing requirement; should be signed by both, witnessing strengthens evidential value); content (property address, legal owners, beneficial shares, date of effect); execution discipline (contemporaneous with the beneficial-interest change); the **SDLT / LTT / LBTT assumed-debt trap** (where the receiving spouse assumes a share of the mortgage, the assumed debt is chargeable consideration under FA 2003 Sch 4 para 8 + devolved equivalents); and what HMRC checks under TSEM9842 + TSEM9851. Distinct from C1 (the Form 17 tax election, downstream from the deed) by being the underlying property-law document. Distinct from C2 (joint vs TIC structural choice) by being the document that creates the unequal beneficial shares within a TIC structure. This is the page sessions on C1, C4, C5, C6, and C10 link to for the "how do you actually execute the unequal-share document" question.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Closes the "what is a declaration of trust" gap from topic_gaps_final.md. Underpins C1 + C2 + downstream applied pages. No within-bucket sequencing constraints.

**HOUSE_POSITION_CONFLICT signal context:** §24.3 is freshly locked 2026-05-23. C3 cites §24.3 directly. The SDLT assumed-debt trap (§24.3 critical-for-sessions note) is the most common Form 17 implementation error in competitor content; flag if competitor sources fail to call it out.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, drafting checklist depth, treatment of the assumed-debt SDLT trap.

- https://www.uklandlordtax.co.uk/declaration-of-trust/ — verified live 2026-05-23 (200). Direct topical match; strongest competitor piece. Use for outline inspiration but don't pattern-match.
- https://www.uklandlordtax.co.uk/what-is-a-declaration-of-trust/ — verified live 2026-05-23 (200). Sibling within uklandlordtax set; useful for FAQ phrasing.
- https://www.alexander-ene.co.uk/declaration-trust-rental-property.htm — verified live 2026-05-23 (200). Boutique London accountant; useful for drafting-discipline framing.
- https://www.alexander-ene.co.uk/declaration-of-trust-rental-property.htm — verified live 2026-05-23 (200). Alternative slug for the same domain; useful for cross-checking content patterns.

**Borrowable patterns:** uklandlordtax has the strongest declaration-of-trust outline; alexander-ene supports the drafting-discipline angle. Our differentiator: thread the SDLT assumed-debt trap explicitly with a worked example (most competitor content treats SDLT-on-deed-creation as "no consideration so no SDLT" and misses the assumed-debt mechanic).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "declaration of trust property", "deed of trust HMRC", "evidence beneficial ownership rental".*

---

## Closest existing pages

- C1 `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` (Wave 5 sibling) — Form 17 tax election. C3 forward-links to C1 from the "From deed to Form 17" section.
- C2 `joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords` (Wave 5 sibling) — structural choice. C3 forward-links as the structural-prerequisite page.
- `section-24-joint-property-ownership-tax-split` (back-patched 2026-05-23) — applied-tax cousin. Cross-link.

**Cannibalisation discipline:**
- C3 is the document-mechanic page. C1 is the tax-election mechanic. C2 is the structural-property-law page. Different lanes.
- C3 should NOT walk Form 17 tax-saving math (C4's lane). C3's role: explain the document and how to execute it.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no old-slug redirect overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory:**
- Law of Property Act 1925 s.53(1)(b) (declaration of trust written formality): https://www.legislation.gov.uk/ukpga/1925/20/section/53
- Law of Property Act 1925 s.36 (joint tenancy + severance): https://www.legislation.gov.uk/ukpga/1925/20/section/36
- Trustee Act 2000 (trustee duties under a declaration of trust).
- TLATA 1996 (Trusts of Land and Appointment of Trustees Act 1996).
- ITA 2007 s.837 (Form 17 reference to beneficial interests).
- FA 2003 Sch 4 para 8 (SDLT chargeable consideration including assumed debt): https://www.legislation.gov.uk/ukpga/2003/14/schedule/4
- LTTA 2017 + LBTT(S)A 2013 equivalents for devolved jurisdictions.

**HMRC manuals:**
- TSEM9842 (declaration of trust evidence): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9842
- TSEM9851 (Form 17 evidence requirement): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9851
- SDLTM07750 (SDLT assumed-debt as consideration): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm07750
- PIM1030 (jointly-let property income split): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1030

**Cross-references in house_positions.md:** §24.3 (declaration of trust mechanics + SDLT assumed-debt trap), §24.2 (Form 17 evidence requirement), §24.4 (TCGA 1992 s.58 on the deed), §1 (SDLT England + NI), §23 (devolved equivalents).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify every numeric tax figure (thresholds, allowances, rates, deadline-days) against current gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate in body.
- `<aside>` styled by global CSS. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- 1-3 inline `<aside>` CTAs. Conversion moments:
  - After the drafting-checklist section
  - After explaining the SDLT assumed-debt trap (high-intent moment)
  - At end of the "execution-discipline" section
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.
- HowTo schema candidate (drafting + executing the deed is a step-by-step process); flag in work-log.

### Cannibalisation
- C3 is the document-mechanic page. Read C1 + C2 before writing; avoid walking the Form 17 election mechanic (C1's lane) or the structural JT-vs-TIC choice (C2's lane).

### House positions
- **§24.3 is your primary working detail.** §24.2 (joint-tenancy bar) and §24.4 (s.58 no-gain-no-loss on the deed) are adjacent. §24.5 cross-mechanism (SDLT assumed-debt trap is the headline interaction).

### Quality bar
- Word count: 2,500-3,500 body.
- FAQs: 10-14.
- New external authority links: 5-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `docs/property/house_positions.md` once at session start; §24 is your primary working detail for Bucket C.
2. Claim the page in `docs/property/wave5_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
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
16. Mark done in `docs/property/wave5_page_tracker.md` with a 1-line Notes summary.
17. Append any site-wide flags to `docs/property/wave5_site_wide_flags.md`.
18. Log discoveries to `docs/property/wave5_discovery_log_session_C.md`.
19. Next page.

## Session-side watcher pattern

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Keep working on another step / another page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Why these vs other options:**

### Competitor URLs fetched

### Existing-page review (from "Closest existing pages")

### Citations added (external authority)

### Internal links added (to our existing pages)

### Inline CTA placements

### Build attempts

### Verification

### Flags raised to wave5_site_wide_flags.md

### 2-3 sentence summary
