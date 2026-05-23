# Wave 5 brief: joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords

**Site:** property
**Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords

---

## Manager pre-decisions

- **Suggested slug:** `joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Foundational page on the legal ownership-structure choice and its tax consequences. Joint tenancy under English / Welsh land law (Scotland and NI equivalent) is undivided ownership: each joint tenant owns 100% jointly with the other(s) plus right of survivorship overrides will. Tenants in common (TIC) hold separate divisible shares (50/50 default on grant, but variable to any ratio) plus each share passes by will. Tax consequences are downstream: TIC can hold unequal beneficial shares (the prerequisite for the Form 17 lever in C1), joint tenants cannot (the §24.2 joint-tenancy bar); the death-of-co-owner mechanic is fundamentally different (survivorship vs will-driven); IHT planning depends on it (C8 picks this up in IHT depth). Distinct from C1 (Form 17 mechanic, the spouse-only tax election) by being the underlying property-law choice that determines whether Form 17 is even available. Distinct from C3 (declaration of trust document) by being the legal ownership-structure decision rather than the document evidencing it. Distinct from C7 (PRR CGT relief on joint owners) by being the structural-tax page not the relief page.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Foundational page underpins multiple downstream Bucket C pages. No sequencing constraints (does not depend on C1; C8 + C9 + C10 reference it but do not block on it).

**HOUSE_POSITION_CONFLICT signal context:** §24.2 (joint-tenancy bar) is freshly locked 2026-05-23. C2 cites §24.2 directly. No conflict signal at brief generation; flag if a competitor source contradicts the joint-tenancy bar (most competitor content is shallow on this point).

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of survivorship-vs-will mechanic, treatment of unequal-share availability, tax-consequence depth.

- https://www.alexander-ene.co.uk/joint-tenants-or-tenants-in-common.htm — verified live 2026-05-23 (200). Strongest competitor piece on the joint-tenancy vs TIC choice; useful for H2 structure inspiration.
- https://www.uklandlordtax.co.uk/jointly-owned-property/ — verified live 2026-05-23 (200). Useful for FAQ phrasing on tax-side of the structure choice.
- https://www.alexander-ene.co.uk/co-ownership-rental-property.htm — verified live 2026-05-23 (200). Sibling within alexander-ene set; useful for cross-checking the survivorship framing.
- https://www.ukpropertyaccountants.co.uk/top-tax-saving-tips-for-jointly-owned-properties/ — verified live 2026-05-23 (200). Generic but useful for the unequal-share-availability framing.

**Borrowable patterns:** alexander-ene's structure-choice walkthrough is the cleanest in this competitor set. uklandlordtax for FAQ phrasing. Our differentiator: thread the §24.2 joint-tenancy bar explicitly + thread the §24.5 cross-mechanism interactions (S24 income split, IHT survivorship, CGT base cost, SDLT joint-buyer aggregation) which most competitor content treats as separate topics.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "joint tenants vs tenants in common", "joint tenancy tax", "tenants in common rental income".*

---

## Closest existing pages

- C1 `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` (Wave 5 sibling, category: `landlord-tax-essentials`) — Form 17 mechanic. C2 forward-links to C1 from the "When TIC unlocks tax planning" section.
- C3 `declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17` (Wave 5 sibling) — the document evidencing unequal beneficial shares. Cross-link as the "how do you actually create unequal TIC shares" follow-up.
- `cgt-property-transfer-spouse` (category: `capital-gains-tax`) — TCGA 1992 s.58 inter-spouse no-gain-no-loss; relevant when severing JT to TIC between cohabiting spouses. Cross-link.
- `section-24-joint-property-ownership-tax-split` (back-patched 2026-05-23) — applied-tax-side cousin.

**Cannibalisation discipline:**
- C2 is the structural-property-law page. C1 is the tax-election mechanic. Different lanes. No cannibalisation risk.
- C2 should NOT walk the Form 17 mechanic in depth (that's C1's lane). C2's role: explain why TIC is the structural prerequisite.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no old-slug redirect overlap for this slug-token cluster. No middleware edit required on launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory:**
- Law of Property Act 1925 s.36 (joint tenancy + severance): https://www.legislation.gov.uk/ukpga/1925/20/section/36
- Law of Property Act 1925 s.53(1)(b) (declaration of trust written formality): https://www.legislation.gov.uk/ukpga/1925/20/section/53
- Trusts of Land and Appointment of Trustees Act 1996 (TLATA 1996) — beneficial interests in jointly held property.
- ITA 2007 s.836 (default 50/50 spousal income, applies to joint-legal-title cases only): https://www.legislation.gov.uk/ukpga/2007/3/section/836
- ITTOIA 2005 s.282 (property income 50/50 default): https://www.legislation.gov.uk/ukpga/2005/5/section/282
- IHTA 1984 s.5 (joint property in deceased's estate); s.18 (spouse exemption): https://www.legislation.gov.uk/ukpga/1984/51/section/18

**HMRC manuals:**
- PIM1030 (jointly-let property income): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1030
- TSEM9820 et seq. (joint ownership general): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9810
- IHTM15011 (joint property): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm15011
- IHTM15040 (survivorship): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm15040

**Cross-references in house_positions.md:** §24.1 (default rule + application limits), §24.2 (joint-tenancy bar, severance under LPA 1925 s.36(2)), §24.5 (cross-mechanism interactions), §22.5 (IHT spouse exemption), §1 (SDLT).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify every numeric tax figure (thresholds, allowances, rates, deadline-days) against current gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. No vague hedges.
- Anonymised personas only. No real client names.

### Lead-gen architecture
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate in body content.**
- The `.prose-blog aside` CSS in `Property/web/src/app/globals.css` styles every `<aside>` in markdown. **You add no classes**, just `<aside><p>headline</p><p>body</p></aside>`.
- Lead-form role segments: Individual landlord (1-3 properties) / Portfolio owner (4-10) / Large portfolio (10+) / Property developer.

### CTA placement guidance (per this page)
- Add 1-3 inline `<aside>` CTAs at high-intent moments. Conversion moments:
  - After the comparison table (JT vs TIC)
  - After explaining the survivorship-overrides-will trap
  - At the end of the "When to sever" decision section
- Avoid: opening the page with an aside; placing an aside inside a worked example; >3 asides total.
- Don't pattern-match the opening sentence across pages.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.
- Article + FAQPage + BreadcrumbList + Organization all auto-emitted.

### Cannibalisation
- Read closest-existing pages before writing. C2 is the structural-property-law page; do not walk Form 17 mechanic depth (C1's lane).
- Do not duplicate worked numerical examples verbatim across C-bucket pages.

### House positions
- **§24 (Form 17 + joint ownership + spouse-mechanics) is your primary locked position** for Bucket C, locked 2026-05-23. Threading for C2:
  - §24.1 — default 50/50 application limits, including the "property NOT held in joint legal title" carve-out and "three-party joint ownership" carve-out.
  - §24.2 — joint-tenancy bar, severance to TIC via LPA 1925 s.36(2) notice.
  - §24.5 — cross-mechanism interactions (IHT survivorship cuts off TNRB usage on first death where held as joint tenants).

### Quality bar
- Word count: 2,500-3,500 body.
- FAQs: 10-14.
- New external authority links: 5-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter array.
- Zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

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
14. Commit on your branch. Per-page commit (do NOT merge to main). **CRITICAL: commit BEFORE marking done in tracker.** Do NOT include `docs/property/wave5_page_tracker.md` in your branch commit.
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
