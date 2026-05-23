# Wave 6 brief: balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics

**Site:** property
**Bucket:** C (Capital allowances + SBA + FYA — CAA 2001 cluster)
**Session:** C
**Brief type:** Net-new page (no existing markdown file at this slug)
**Source markdown path on launch:** `Property/web/content/blog/balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** C (Capital allowances + SBA + FYA)
- **Framing differentiator (Stage 2, 2026-05-23):**

> Disposal-event depth page for property plant-and-machinery pools. Walks the CAA 2001 ss.55 and 61 mechanic from first principles: each pool of qualifying expenditure has an "available qualifying expenditure" (AQE) running balance and a "total disposal receipts" (TDR) running balance. AQE > TDR yields a writing-down allowance (or in the final chargeable period under s.65, a balancing allowance). TDR > AQE yields a balancing charge (taxable receipt clawing back previously-claimed allowances). The page's three worked scenarios: (1) clean s.198 election at TWDV on a £450k commercial unit sale (balanced, no charge); (2) no s.198 election and buyer-side over-apportionment defaults to apportioned market value under s.196 Table item 1, generating a £62k balancing charge for the seller; (3) MVL distribution-in-specie of a commercial property to shareholders, triggering CAA 2001 s.61 disposal event (event 8, "other events" at market value), creating an unrelieved balancing charge in the company's final period of trade. The §25.6 disposal-mechanics anchor + the §25.4 SBA "no balancing event but s.37B TCGA add-back" contrast are the page's structural backbone. Critically distinct from C6 (which is the acquisition-side mirror, s.198 election from the buyer's perspective).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C2 has an **A↔C seam at A4** (MVL distribution-in-specie). Sequencing constraint per cross-bucket coordination notes: **A4 ships FIRST on A-branch; C2 ships AFTER on C-branch, citing A4's MVL distribution mechanic as a CAA 2001 s.61 event (specifically the catch-all event 8 "other events" branch where MV applies at the time of the event)**. When C2's "MVL distribution as a balancing event" section is drafted, link forward to A4's page slug. If A4 has not yet landed on main at C2 write time, log the forward-link as a TODO in the work-log and have manager back-patch at wave merge per §16.32.

**Pool-thinness disclosure:** Competitor coverage of the disposal-side mechanic is thin (most accountancy firm pages focus on the acquisition-side fixtures election). Synthesis quality matters more than competitor mirror; lean on §25.6 of house_positions.md.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL, fetch with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})`, parse with `BeautifulSoup(html, "lxml")`. Extract H2/H3 outline, treatment of the s.196 Table (most competitors don't cite it), treatment of the no-election default, worked example density. Differentiator value is on the disposal-event completeness + the MVL crossover + the SBA contrast.

- https://taxscape.deloitte.com/article/capital-allowances-fixtures.aspx — verified live 2026-05-23 (200). Big-4 perspective; useful for s.198 + s.196 Table framing and the disposal-value mechanic.
- https://www.icaew.com/technical/tax/capital-allowances/fixtures — verified live 2026-05-23 (200). Professional body technical reference; good for citation density on ss.196-198 and the post-FA-2012 pooling-and-fixed-value gate.
- https://www.lovellconsulting.com/news/hmo/ — verified live 2026-05-23 (200). Specialist CA boutique; useful for the disposal-side worked-example pattern. Page is HMO-flavoured but the disposal mechanic is generic.
- https://www.uklandlordtax.co.uk/capital-allowances/ — verified live 2026-05-23 (200). Useful for reader-friendly FAQ phrasing on "what happens when I sell my commercial property?".

**Borrowable patterns:** ICAEW's citation density is the gold standard; mirror. Deloitte's worked-example structure is clean. Lovell's pool-by-pool walkthrough supports the AQE/TDR framing.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries expected: "balancing charge capital allowances", "balancing allowance disposal", "selling commercial property capital allowances", "MVL capital allowances clawback", "s198 election balancing charge". GSC monitoring begins at launch via monitored_pages registration in step 13.*

---

## Closest existing pages (cannibalisation context)

- `capital-allowances-commercial-property-what-can-claim` (category: `landlord-tax-essentials`) — commercial-property entry-level page; C2 is the disposal-side depth complement. Cross-link.
- `cgt-commercial-property-different-residential` (category: `capital-gains-tax`) — CGT-side of commercial disposal. C2 is the CA-side parallel. Cross-link explicitly; reader confusion between CGT (TCGA 1992) and CA balancing charge (CAA 2001) is common and must be defused early in the page body.
- `full-expensing-capital-allowances` — current-regime predecessor; C5 is the deeper sibling for FA-2023 full-expensing clawback. C2 cross-links to C5 (same branch).
- C1 pillar (forward-link to the cluster spine).
- C6 sibling (acquisition-side fixtures mirror; same branch, forward-link).
- C10 sibling (super-deduction-specific 1.3x clawback variant; same branch, forward-link).

**Cannibalisation discipline:**
- The closest-existing pages cover acquisition-side and entry-level; C2 owns the disposal-side mechanic. C2's role is to be the page they all forward-link to for disposal questions.
- Do not duplicate the s.198 election walkthrough from C6; C6 covers the buyer-side election mechanic, C2 covers the seller-side disposal-value computation.
- Do not duplicate the super-deduction 1.3x variant; that is C10's territory. C2 frames the 1.0x baseline.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no slug-token overlap with `balancing-allowance-balancing-charge-on-disposal...`. No middleware edit required on launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory (CAA 2001):**
- s.55 (entitlement and balancing events; AQE vs TDR mechanic): https://www.legislation.gov.uk/ukpga/2001/2/section/55
- s.61 (disposal events and disposal values; eight event categories): https://www.legislation.gov.uk/ukpga/2001/2/section/61
- s.196 (fixtures Table; 12-item seller-side disposal value Table): https://www.legislation.gov.uk/ukpga/2001/2/section/196
- s.198 (fixtures election on sale; buyer-and-seller joint election to fix disposal value): https://www.legislation.gov.uk/ukpga/2001/2/section/198

**HMRC manuals:**
- CA28000 (disposal value): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca28000
- CA28500 (s.198 election): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca28500
- CA29000 (balancing adjustments): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca29000

**Case law (optional):**
- *Tower MCashback LLP1 v HMRC* [2011] UKSC 19 — pooling and fixtures-election context.

**Cross-references in house_positions.md:** §25.2 (P&M pools, integral features s.33A, fixtures s.198), §25.6 (disposal mechanics ss.55, 61, 196 — primary anchor), §25.4 (SBA disposal contrast: no balancing event, s.37B TCGA add-back instead), §25.10 (do-not-write list — memorise SBA balancing event misconception).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify every numeric tax figure against current gov.uk and legislation.gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. No vague hedges.
- Anonymised personas only. No real client names. No specific tribunal disputes.

### Lead-gen architecture (global CSS; you write placement, not styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- `.prose-blog aside` in `globals.css` styles every `<aside>` in markdown. **You add no classes**, just `<aside><p>headline</p><p>body</p></aside>`.
- Lead-form role segments: Individual landlord (1-3 properties) / Portfolio owner (4-10) / Large portfolio (10+) / Property developer.

### CTA placement guidance (per this page)
- Add 2-3 inline `<aside>` CTAs at high-intent moments:
  - After the first worked disposal scenario (reader has seen the figures and wants the s.198 election done properly)
  - After the MVL distribution scenario (reader is mid-exit and needs urgent professional review)
  - Optionally after the SBA contrast section (defuses CGT vs CA confusion; reader trusts the page)
- Avoid: opening with an aside; placing an aside inside a worked example; >3 asides total.
- Vary opening sentence; do NOT lead with "When you sell a commercial property...".

### Schema
- FAQs live in frontmatter `faqs:` array. Auto-emitted as FAQPage JSON-LD. **Don't add FAQ schema in body.**
- Target 10-12 FAQs.

### Cannibalisation
- Read the closest-existing pages listed before writing.
- Vary worked-example figures from C5, C6, C10 (the closely related siblings).

### House positions
- **Read `docs/property/house_positions.md` once.** For C2, §25.6 is the primary anchor with §25.2 + §25.4 + §25.10 as adjacent.
- §25.6 contains the verbatim s.55(1)-(3) AQE/TDR mechanic + the eight-event s.61 disposal-event taxonomy + the s.196 fixtures Table reference. Use the §25.6 framing verbatim where it covers a point.
- §25.4 contains the SBA "no balancing event + s.37B TCGA add-back" contrast — must surface to defuse the common SBA misconception.
- §25.10 contains the do-not-write list including "SBA generates a balancing allowance on disposal" (false) — do not repeat this competitor error.

If a competitor source contradicts a house position, the house position wins. Flag in `wave6_site_wide_flags.md`.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 5-7.
- Build clean: `cd Property/web && npm run build`.
- All six verifications must pass.

### Anti-templating
- C2's framing differentiator is the disposal-side mechanic depth + the MVL crossover + the SBA contrast. Write to it.
- Vary H2 structure from C1 and C6.
- Vary opening sentence; do NOT pattern-match prior siblings.
- Vary FAQ phrasing; do NOT reuse "What is a balancing charge?" template across siblings.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. **Read `docs/property/house_positions.md`** once at the start. §25.6 is the primary anchor for C2; §25.2 + §25.4 + §25.10 adjacent.
2. **Claim the page** in `docs/property/wave6_page_tracker.md`, todo → in_progress + UTC timestamp.
3. **Read the brief** (this file).
4. **Fetch each competitor URL** using httpx + BeautifulSoup as per instructions above.
5. **Read the closest existing pages** on our site.
6. **Plan the rewrite/write** before touching markdown.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk. House positions doc is the tie-breaker. **Per §16.35: verify every numeric tax figure at write time.**
8. **Fetch hero image from Pexels** via fetch_image_for_post.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md` with full frontmatter.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (all six checks):** FAQ schema count match, 0 em-dashes, 0 Tailwind, meta title ≤62, meta description ≤158, internal links resolve.
12. **No middleware edit required for this page.**
13. **Register in `monitored_pages`** via Supabase _db helper.
14. **Commit on your branch** (BEFORE marking done in tracker; do NOT include tracker file in branch commit).
15. **Fill in work-log** below.
16. **Mark done** in `wave6_page_tracker.md` with 1-line Notes.
17. **Append flags** to `wave6_site_wide_flags.md`.
18. **Log discoveries** to `wave6_discovery_log_session_C.md`.
19. **Next page**.

## Session-side watcher pattern

Spawn Monitor task on Q&A file watching for STATUS answered flip; keep working another step/page while you wait.

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

### Flags raised to wave6_site_wide_flags.md
- 

### 2-3 sentence summary
