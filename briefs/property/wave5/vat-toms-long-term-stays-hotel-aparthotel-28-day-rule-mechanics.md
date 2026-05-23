# Wave 5 brief: vat-toms-long-term-stays-hotel-aparthotel-28-day-rule-mechanics

**Site:** property
**Bucket:** A (VAT topical-gap deepening)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/vat-toms-long-term-stays-hotel-aparthotel-28-day-rule-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/vat-toms-long-term-stays-hotel-aparthotel-28-day-rule-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `vat-toms-long-term-stays-hotel-aparthotel-28-day-rule-mechanics`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** A (VAT topical-gap deepening)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The **28-day rule** for hotel and aparthotel long-stay accommodation is a specific VAT mechanic that reduces the VAT burden on stays of 28+ days. From day 29 onwards, only **20% of the consideration is treated as standard-rated accommodation** with the remainder treated as exempt facilities provision, under VATA 1994 s.50A combined with Sch 4A para 9 (reduced-value rule for long-stay hotel accommodation). This page covers the **mechanic at depth**: how to identify a 28+ day stay, the day-count rules, the apportionment between accommodation and facilities post-day-29, the interaction with TOMS for tour-operator structures, the agent-vs-principal distinction (post-Sonder UT 2025), and the documentation discipline. **Distinct from existing `toms-vat-serviced-accommodation`** by being the 28-day-rule-specific deepening of the long-stay cohort; the existing page covers the TOMS framework broadly. **Distinct from A1 (OTT)** because the 28-day rule applies to standard-rated accommodation supplies (hotels are not OTT-able; dwellings are exempt; hotel accommodation is its own standard-rated supply under Sch 9 Group 1 Note 9).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Deepens existing TOMS page rather than replacing. High-intent aparthotel + long-stay operator cohort.

---

## Competitor URLs (Stage 2 §16.31 verified 2026-05-23)

- https://www.ukpropertyaccountants.co.uk/vat-analysis-for-agent-and-principal-roles-in-serviced-accommodation/ — VERIFIED ALIVE 2026-05-23. Comprehensive on the agent-vs-principal distinction post-Sonder, TOMS applicability, residential vs tourist classification. Primary outline reference.
- https://uklandlordtax.co.uk/leased-apartments-sub-let-on-airbnb-vat-toms-or-not/ — VERIFIED ALIVE 2026-05-23. Specifically covers the post-Sonder UT 2025 ruling and TOMS-or-not analysis for sub-let arrangements. Use for the case-law update section.
- https://www.geraldedelman.com/insights/vat-on-long-term-hotel-stays/ — STAGE 1 SEED. WebFetch returned permission-denied during Stage 2 verification 2026-05-23; treat as **TENTATIVE** and session must re-verify with httpx at write time. If dead, search property-tax-advice.co.uk or saffery.com for replacement on 28-day rule mechanics.
- https://www.property-tax-advice.co.uk/knowledge-centre/the-toms-vat-scheme-another-attack-by-hmrc-foiled — STAGE 1 SEED. WebFetch returned permission-denied during Stage 2 verification 2026-05-23; treat as **TENTATIVE**. Session re-verifies.

**Stage 2 verification note:** two URLs confirmed alive (primary). Two tentative pending session re-verify. Even if both tentative URLs are dead, the two confirmed-alive URLs provide adequate outline coverage.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: how each competitor explains the 28-day rule, the post-Sonder UT 2025 position, agent-vs-principal mechanics. Borrow outline-shape, NOT clause language. Cross-check every claim against VATA 1994 s.50A + Sch 4A para 9 + VAT Notice 709/3.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator (28 day rule VAT, long stay hotel VAT, aparthotel VAT, TOMS long stay).*

---

## Closest existing pages (cannibalisation context)

Stage 1 + Stage 2 reasoned identification (not Jaccard):

1. `toms-vat-serviced-accommodation` (category: `property-types-and-specialist-tax`) — **closest existing.** Covers TOMS framework. A8 is the 28-day-rule-specific long-stay deepening. Cross-link bi-directionally; the existing page should back-link to A8 for long-stay depth (raise INTERNAL_LINK flag).

2. `landlord-vat-registration-when-required` (category: `landlord-tax-essentials`) — touches holiday-let / accommodation VAT at registration depth. Cross-link briefly.

3. **A1 (forthcoming sibling)** — distant. OTT does not apply to hotels (not within Sch 10's commercial-property scope). Cross-link only to flag the boundary.

4. No on-site coverage of the 28-day rule specifically. Topical gap confirmed.

**Cannibalisation discipline:**
- A8 is specifically the 28-day-rule applied page. Existing TOMS page covers framework; A8 deepens the long-stay variant.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` for the tokens `toms`, `28-day`, `long-stay`, `aparthotel`, `hotel-stay`, `reduced-value` returned no old-slug redirects that map onto this new slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 5-8 to actually cite. The 28-day rule is statute-led + Notice-led + case-law-led (Sonder).

- [VATA 1994 (Value Added Tax Act 1994), full contents](https://www.legislation.gov.uk/ukpga/1994/23/contents)
- [VATA 1994 s.50A (TOMS — reduced value rule)](https://www.legislation.gov.uk/ukpga/1994/23/section/50A)
- [VATA 1994 Sch 4A para 9 (reduced-value rule for long-stay accommodation)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/4A)
- [VATA 1994 Sch 9 Group 1 Note 9 (holiday accommodation standard-rated despite land exemption)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/9)
- [HMRC VAT Notice 709/3 (Hotels and holiday accommodation)](https://www.gov.uk/government/publications/vat-notice-7093-hotels-and-holiday-accommodation)
- [HMRC VAT Notice 709/5 (Tour Operators Margin Scheme)](https://www.gov.uk/government/publications/vat-notice-7095-tour-operators-margin-scheme)
- [HMRC VAT Manual VATTOS chapter on TOMS](https://www.gov.uk/hmrc-internal-manuals/vat-tour-operators-margin-scheme)
- [Sonder Europe Ltd v HMRC [2025] UKUT — Upper Tribunal on TOMS applicability to leased apartments sub-let](https://www.gov.uk/tax-and-chancery-tribunal-decisions)

---

## Universal rules (do not skip)

### §16.35 per-write numeric verification
Verify every numeric tax figure (28-day trigger, 20% standard-rated accommodation portion from day 29, registration threshold £90k, any TOMS rate) against current gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification. Particular care: the 20%-of-consideration-standard-rated framing under Sch 4A para 9 — verify the current published Notice 709/3 figure at write time.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific.
- Anonymised personas only.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- `<aside><p>headline</p><p>body</p></aside>` styled by global CSS.

### CTA placement guidance (per this page)
- Add 1-3 inline `<aside>` CTAs: after the 28-day-trigger explanation, after a worked 45-day-stay example, after the post-Sonder agent-vs-principal section.
- Vary opening sentence. A8 should open from the perspective of "the same guest, the same room: VAT treatment changes materially at day 29".

### Schema
- FAQs live in frontmatter `faqs:` array. Target 10-12 FAQs.

### Cannibalisation
- Read existing TOMS page before writing.

### CSS in markdown
- Semantic HTML only. No Tailwind utility classes.

### House positions
- Bucket A has no dedicated house position section.

### Anti-templating
- A8's natural H2 spine: (1) the long-stay moment + why 28 days matters, (2) Sch 4A para 9 reduced-value mechanic, (3) day-counting rules, (4) accommodation-vs-facilities apportionment from day 29, (5) interaction with TOMS for tour-operator structures, (6) agent-vs-principal (post-Sonder), (7) worked 45-day aparthotel example, (8) documentation discipline, (9) interaction with registration threshold.
- Vary FAQ phrasing.

### Quality bar
- Word count: 2,500-3,200 body (specialist deepening).
- FAQs: 10-12.
- New external authority links: 5-8.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start.
2. **Claim the page** in `docs/property/wave5_page_tracker.md`.
3. **Read the brief** (this file). §16.35 mandatory.
4. **Fetch each competitor URL.** Two tentative; replace if dead.
5. **Read the existing TOMS page.**
6. **Plan the rewrite/write.**
7. **Verify factual claims.** §16.35 per-write.
8. **Fetch a hero image from Pexels** via fetch_image_for_post.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks).**
12. **Redirect overlap:** none listed.
13. **Register in `monitored_pages`.**
14. **Commit on your branch.** Commit BEFORE marking done.
15. **Fill in work-log.**
16. **Mark done.**
17. **Flag** (raise INTERNAL_LINK for existing TOMS page to back-link to A8).
18. **Discovery log.**
19. **Next page.**

## Session-side watcher pattern

When you append a STATUS open question, spawn a Monitor task watching for STATUS answered. Keep working on another step / another page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Meta description chosen:**
- **Why these vs other options:**

### Competitor URLs fetched
- 

### Existing-page review (from "Closest existing pages")
- 

### Citations added (external authority)
- 

### Internal links added (to our existing pages)
- 

### Inline CTA placements
- 

### Build attempts
- 

### Verification
- FAQ schema count in built HTML matches frontmatter:
- Em-dashes in markdown:
- Tailwind classes in markdown:
- Meta title length:
- Meta description length:
- Internal links resolve:
- monitored_pages row inserted: id
- Body word count:

### §16.35 numeric verification log (every figure cited)
- 

### Flags raised to wave5_site_wide_flags.md
- 

### 2-3 sentence summary
- 
