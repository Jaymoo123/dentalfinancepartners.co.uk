# Wave 7 brief: sdlt-bewley-uninhabitable-property-test-non-residential-rates-landlords

**Site:** property
**Bucket:** C (Specialist transactional + trust depth)
**Session:** TBD (manager-assigned at Stage 3 dispatch)
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/sdlt-bewley-uninhabitable-property-test-non-residential-rates-landlords.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-tax-changes/sdlt-bewley-uninhabitable-property-test-non-residential-rates-landlords

---

## Manager pre-decisions

- **Suggested slug:** `sdlt-bewley-uninhabitable-property-test-non-residential-rates-landlords`
- **Suggested category:** `property-tax-changes`
- **Bucket:** C (Specialist transactional + trust depth)
- **HP-lock anchor:** §1.C (Bewley test — verbatim with post-Hyman/Mudan/MHB/Brown narrowing) + §1.E citations + §1.F (do-not-write list)
- **Framing differentiator (~50 words, Stage 1a-locked):**

> FA 2003 s.116(1)(a) "suitable for use as a single dwelling" test. P N Bewley Ltd v HMRC [2019] UKFTT 65 (TC07097) — derelict bungalow with asbestos and structural dangers held non-residential (lower SDLT rates apply). **CRITICAL: post-Bewley narrowing line per §1.C / HP-lock catch #12** — Hyman v HMRC [2019] UKFTT 469 / [2021] UKUT 68 / [2022] EWCA Civ 185 (unmodernised but habitable family home held residential); Mudan v HMRC [2023] UKFTT 317 (boarded-up, mould, no kitchen — STILL residential); MHB Ltd v HMRC; Brown v HMRC [2024] UKFTT (verify exact citation at write time). Unmodernised "fixer-upper" remains residential. Operational test: "would a surveyor on the effective date certify the property as dangerous to occupy and requiring complete reconstruction of major elements?" HMRC enquiry-stance reality: most buyer Bewley claims fail. NOT writing the SDLT 6-dwellings rule (separate FA 2003 s.116(7) territory).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C8 ships **independently within Bucket C** (no strict sequencing). Drift-prone territory — practitioner content frequently over-applies Bewley as a general "fixer-upper = non-residential" rule. **Post-Hyman/Mudan/MHB/Brown narrowing is the operationally critical framing** — lead with Bewley as a narrow exception (genuine derelict / structurally dangerous), not as the rule.

**HOUSE_POSITION_CONFLICT signal context:** §1.C is the primary verbatim lock. §1.F do-not-write list forbids: "Bewley applies to any unmodernised property" (FALSE — Hyman/Mudan/MHB/Brown progressively narrowed). §1.E citations include all four post-Bewley cases. HMRC enquiry-stance reality (most buyer Bewley claims fail at enquiry) must be surfaced per §1.C.

---

## Competitor URLs (Stage 2 fetch + extract)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of Bewley facts, treatment of post-Bewley narrowing line, treatment of HMRC enquiry-stance, treatment of operational surveyor test.

- https://www.ukpropertyaccountants.co.uk/bewley-sdlt-uninhabitable/
- https://www.uklandlordtax.co.uk/bewley-test-sdlt-derelict-property/
- https://www.shipleys.com/insights/bewley-and-sdlt-derelict-property/
- https://www.landlordstax.co.uk/sdlt-bewley-non-residential-rates/

**Borrowable patterns:** TBD at Stage 2 write time. Our differentiator: explicit post-Bewley narrowing-line treatment with all four cases (most competitor pieces stop at Bewley + Hyman); explicit operational surveyor test framing; explicit HMRC enquiry-stance reality (most buyer claims fail at enquiry); explicit "complete reconstruction of major elements" threshold.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "Bewley SDLT uninhabitable property", "FA 2003 s 116 single dwelling test", "SDLT non-residential rates derelict property", "Mudan v HMRC SDLT".*

---

## Closest existing pages

- `2027-property-income-tax-rates-landlords-uk` (0.23 cannibal — **false-positive**, token overlap only).
- `commercial-property-tax-landlords-rates-reliefs-allowances` (0.23 cannibal — false-positive; commercial-property focus distinct).
- `non-resident-cgt-uk-property-rates-reporting` (0.23 cannibal — false-positive; non-resident CGT focus distinct).
- `non-residential-vs-residential-sdlt-rates-mixed-use-property` (adjacent SDLT-classification mechanic; cross-link for "mixed-use is a separate route to non-residential rates").
- `sdlt-multiple-dwellings-relief-mdr-abolished-mechanics` (cross-link if MDR mention reached).

**Cannibalisation discipline:**
- C8 is the Bewley-specific test. Cross-link the mixed-use SDLT page for "another route to non-residential rates"; do not re-walk mixed-use territory.
- C8 must not stray into FA 2003 s.116(7) 6-dwellings rule territory (separate single-transaction option for portfolios of 6+ dwellings).

---

## Redirect overlap (on launch)

Stage 1 scan: no old-slug redirect overlap. No middleware edit required at launch.

---

## Authority links worth considering (Stage 2 populated, session selects 5-8)

**Statutory:**
- FA 2003 s.116(1)(a) "suitable for use as a single dwelling": https://www.legislation.gov.uk/ukpga/2003/14/section/116

**Case law (all verify exact citation at write time):**
- P N Bewley Ltd v HMRC [2019] UKFTT 65 (TC07097): https://www.bailii.org/uk/cases/UKFTT/TC/2019/65.html
- Hyman v HMRC [2019] UKFTT 469 / [2021] UKUT 68 / [2022] EWCA Civ 185: bailii cross-reference
- Mudan v HMRC [2023] UKFTT 317: https://www.bailii.org/uk/cases/UKFTT/TC/2023/317.html (verify)
- MHB Ltd v HMRC: verify exact citation at write time
- Brown v HMRC [2024] UKFTT: verify exact citation form at write time (case may have a Tax Chamber or UT appeal in flight)

**HMRC manuals:**
- SDLTM00385 (residential property definition + Bewley citation): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm00385
- SDLTM00400 (suitable-for-use test + case-law summary): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm00400

**Cross-references in house_positions.md:** §1.C (primary verbatim lock); §1.E (citations); §1.F (do-not-write list — "Bewley applies to any unmodernised property" forbidden).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify all four case citations at write time. Brown v HMRC [2024] UKFTT citation form (case may have moved to UT or CoA — confirm). Verify SDLTM00385 + SDLTM00400 current wording. Verify FA 2003 s.116(1)(a) unchanged.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate in body.
- `<aside>` styled by global CSS. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs. Conversion moments:
  - After the Bewley facts walkthrough (high-intent: "is my property like Bewley?")
  - After the post-Bewley narrowing line section (high-intent: "or is it like Mudan, residential after all?")
  - After the HMRC enquiry-stance reality (high-intent: defensive-pack pre-claim review)
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- C8 is the Bewley-specific test. Read non-residential-vs-residential SDLT page before writing. Forward-link, don't duplicate.

### House positions
- **§1.C is your primary working detail (verbatim-locked).** §1.F forbids: "Bewley applies to any unmodernised property" (FALSE — Hyman/Mudan/MHB/Brown narrowed).
- **CRITICAL drift to avoid:** Lead with the narrowing line. Bewley is a NARROW exception (asbestos / structural dangers / complete reconstruction). Unmodernised but habitable = residential per Hyman line. Boarded-up + mould + no kitchen = STILL residential per Mudan. HMRC enquiry-stance reality: most buyer Bewley claims fail.

### Quality bar
- Word count: 2,800-3,500 body.
- FAQs: 12-14.
- New external authority links: 6-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.
- Open with the operational reality (most buyer Bewley claims fail at enquiry; here is when it does apply and when it does not), not with "What is the Bewley case".

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `docs/property/house_positions.md` once at session start; §1 + §1.A-§1.F + §1.G is your primary working detail for Bucket C Wave 7 SDLT cluster.
2. Claim the page in `docs/property/wave7_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. Read the brief (this file).
4. Fetch each competitor URL using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml.
5. Read the closest existing pages on our site.
6. Plan the write before touching markdown.
7. Verify factual claims against HMRC manuals / legislation.gov.uk / gov.uk / bailii.org. **Per §16.35: verify all four case citations + SDLTM00385/00400 current wording + FA 2003 s.116(1)(a) at write time.**
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
