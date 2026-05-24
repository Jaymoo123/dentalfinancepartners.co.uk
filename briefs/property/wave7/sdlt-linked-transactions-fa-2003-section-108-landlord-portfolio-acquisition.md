# Wave 7 brief: sdlt-linked-transactions-fa-2003-section-108-landlord-portfolio-acquisition

**Site:** property
**Bucket:** C (Specialist transactional + trust depth)
**Session:** TBD (manager-assigned at Stage 3 dispatch)
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/sdlt-linked-transactions-fa-2003-section-108-landlord-portfolio-acquisition.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-tax-changes/sdlt-linked-transactions-fa-2003-section-108-landlord-portfolio-acquisition

---

## Manager pre-decisions

- **Suggested slug:** `sdlt-linked-transactions-fa-2003-section-108-landlord-portfolio-acquisition`
- **Suggested category:** `property-tax-changes`
- **Bucket:** C (Specialist transactional + trust depth)
- **HP-lock anchor:** §1.B (linked transactions — verbatim with s.108 + s.108(1A) exclusion + s.116(7) interaction) + §1.F (do-not-write list)
- **Framing differentiator (~50 words, Stage 1a-locked):**

> FA 2003 s.108 linked-transactions definition: transactions "form part of a single scheme, arrangement or series of transactions between the same vendor and purchaser or persons connected with either of them" (CTA 2010 s.1122 connected persons). s.108(2) aggregation mechanism — consideration aggregated for rate purposes; s.108(3) joint-purchaser rules; **s.108(1A) Scottish/Welsh exclusion** (cross-border portfolios use LBTT(S)A 2013 s.57 / LTTA 2017 s.65 separately). Interaction with s.116(7) 6-dwellings rule — single transaction option for 6+ dwellings non-residential rate. **CRITICAL: definition is at s.108, NOT Sch 4 para 5** (Sch 4 para 5 is exchanges — HP-lock catch #6). Practical writing rule: connected-persons test + arrangement-or-series test BOTH required. NOT writing the 6-dwellings rule in isolation.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C5 ships **after C9** within Bucket C SDLT cluster — C9 partnership SDLT relief (Sch 15) is the common scenario invoking s.108 linkage (portfolio incorporation = linked transactions). C5 cites C9 backwards. Drift-prone territory — competitor content frequently mis-cites linked-transactions definition at Sch 4 para 5 (which is actually exchanges); correct citation is s.108.

**HOUSE_POSITION_CONFLICT signal context:** §1.B is the primary verbatim lock. §1.F do-not-write list forbids: "linked transactions definition is at Sch 4 para 5" + "Scottish/Welsh land aggregates with English for s.108". s.108(1A) explicitly excludes non-English/Northern-Irish land from aggregation — Scottish-land transactions go through LBTT separately.

---

## Competitor URLs (Stage 2 fetch + extract)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of s.108 definition, treatment of connected-persons test, treatment of s.108(1A) jurisdictional exclusion, treatment of s.116(7) 6-dwellings rule.

- https://www.ukpropertyaccountants.co.uk/sdlt-linked-transactions-s108/
- https://www.uklandlordtax.co.uk/linked-transactions-sdlt-portfolio/
- https://www.landlordstax.co.uk/sdlt-linked-transactions-explained/
- https://www.shipleys.com/insights/sdlt-linked-transactions-and-portfolios/

**Borrowable patterns:** TBD at Stage 2 write time. Our differentiator: explicit s.108 citation (most competitors cite Sch 4 para 5 incorrectly); explicit two-part purposive test (connected-persons + arrangement); explicit s.108(1A) jurisdictional carve-out; explicit s.116(7) 6-dwellings interaction (when does single-transaction option beat aggregation?).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "SDLT linked transactions s 108", "linked transactions portfolio SDLT", "FA 2003 s 108 connected persons", "SDLT linked transactions same vendor".*

---

## Closest existing pages

- `sdlt-sub-sale-relief-mechanics` (0.20 cannibal — adjacent SDLT mechanic; clean separation — sub-sale relief is FA 2003 s.45A territory, not s.108).
- `property-portfolio-review-checklist-landlords-2026` (0.13 cannibal — portfolio context; cross-link for "linked-transactions due-diligence on portfolio acquisition").
- C9 (Wave 7 partnership SDLT relief) — cite C9 backwards for the partnership-incorporation scenario invoking s.108.
- `sdlt-incorporation-stamp-duty-twice` (adjacent SDLT incorporation; cross-link).
- `non-residential-vs-residential-sdlt-rates-mixed-use-property` (adjacent rate-structure context; cross-link for s.116(7) 6-dwellings rule).

**Cannibalisation discipline:**
- C5 is the s.108 linked-transactions mechanic. Do NOT re-walk Sch 15 partnership SLP (C9 covers). Do NOT re-walk sub-sale relief (separate page).
- C5 must not stray into FA 2003 s.75A general anti-avoidance territory (SDLTM09050+) — s.75A is a different statutory hook for series-of-transactions abuse; s.108 is the rate-aggregation mechanic.

---

## Redirect overlap (on launch)

Stage 1 scan: no old-slug redirect overlap. No middleware edit required at launch.

---

## Authority links worth considering (Stage 2 populated, session selects 5-8)

**Statutory:**
- FA 2003 s.108 (linked transactions definition + aggregation): https://www.legislation.gov.uk/ukpga/2003/14/section/108
- FA 2003 s.116 (residential property definition + s.116(7) 6-dwellings rule): https://www.legislation.gov.uk/ukpga/2003/14/section/116
- CTA 2010 s.1122 (connected persons definition for tax): https://www.legislation.gov.uk/ukpga/2010/4/section/1122
- LBTT(S)A 2013 s.57 (Scottish equivalent — separate jurisdictional regime): https://www.legislation.gov.uk/asp/2013/11/section/57
- LTTA 2017 s.65 (Welsh equivalent — separate jurisdictional regime): https://www.legislation.gov.uk/anaw/2017/1/section/65

**HMRC manuals:**
- SDLTM30100+ (linked transactions HMRC manual): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm30100
- SDLTM30200+ (connected-persons SDLT context): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm30200
- SDLTM13075 (s.116(7) 6-dwellings rule): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm13075

**Cross-references in house_positions.md:** §1.B (primary verbatim lock); §1.F (do-not-write list); §1.A (Sch 15 partnership — C9 cross-link); §1 (main SDLT bands for the aggregation rate-bracket effect).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify s.108 verbatim against legislation.gov.uk. Verify s.108(1A) jurisdictional exclusion wording. Verify s.116(7) 6-dwellings rule. Verify SDLTM30100+ HMRC manual is the correct primary manual reference (not SDLTM09050+ which is s.75A territory).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate in body.
- `<aside>` styled by global CSS. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs. Conversion moments:
  - After the s.108 definition + connected-persons walkthrough (high-intent: "are my transactions linked?")
  - After the portfolio worked example (high-value: numerical demonstration of rate aggregation effect)
  - After the s.116(7) 6-dwellings interaction (high-intent: "single-transaction option may save SDLT")
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- C5 is the s.108 linked-transactions mechanic. Read C9 brief + existing sub-sale-relief + portfolio-review pages before writing. Forward-link, don't duplicate.

### House positions
- **§1.B is your primary working detail (verbatim-locked).** §1.F forbids: "linked transactions definition is at Sch 4 para 5" (FALSE — Sch 4 para 5 is exchanges); "Scottish/Welsh land aggregates with English for s.108" (FALSE — s.108(1A) excludes).
- **CRITICAL drift to avoid:** Manager_prompt typo in earlier drafts referenced Sch 4 para 5 — correct citation is s.108. Sch 4 para 5 governs exchanges (chargeable consideration on land exchange). Do NOT confuse.

### Quality bar
- Word count: 2,800-3,500 body.
- FAQs: 12-14.
- New external authority links: 6-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.
- Open with the operational decision (are your two transactions linked, and what is the consideration-aggregation effect on rate), not with "What is a linked transaction".

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `docs/property/house_positions.md` once at session start; §1 + §1.A-§1.F + §1.G is your primary working detail for Bucket C Wave 7 SDLT cluster.
2. Claim the page in `docs/property/wave7_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. Read the brief (this file).
4. Fetch each competitor URL using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml.
5. Read the closest existing pages on our site.
6. Plan the write before touching markdown.
7. Verify factual claims against HMRC manuals / legislation.gov.uk / gov.uk. **Per §16.35: verify s.108 verbatim + s.108(1A) jurisdictional exclusion + s.116(7) 6-dwellings rule at write time.**
8. Fetch a hero image from Pexels via fetch_image_for_post.
9. Write the markdown file at `Property/web/content/blog/<slug>.md` with full frontmatter.
10. Build: `cd Property/web && npm run build`. Must pass clean.
11. Verify (all six checks must pass): FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. Apply redirect repointing in `middleware.ts` if brief lists overlap. (None for this brief.)
13. Register the new page in `monitored_pages` via the Supabase _db helper.
14. Commit on your branch. Per-page commit. **CRITICAL: commit BEFORE marking done in tracker.** Do NOT include the tracker in your branch commit.
15. Fill in the per-page work-log at the bottom of this brief.
16. Mark done in `docs/property/wave7_page_tracker.md` with a 1-line Notes summary.
17. Append any site-wide flags to `docs/property/wave7_site_wide_flags.md`.
18. Log discoveries to `docs/property/wave7_discovery_log_session_<X>.md`.
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

### Flags raised to wave7_site_wide_flags.md

### 2-3 sentence summary
