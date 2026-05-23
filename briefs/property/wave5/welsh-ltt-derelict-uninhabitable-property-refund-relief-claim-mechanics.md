# Wave 5 brief: welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics

**Site:** property
**Bucket:** B (Devolved property tax: Welsh LTT + Scottish LBTT + ADS)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** B (Devolved property tax — Welsh LTT lane)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The page owns the Welsh LTT refund route for a buyer who pays LTT at residential rates and discovers (or evidences) that the property was uninhabitable at completion. The page covers the practical claim mechanic specific to Welsh LTT: how Welsh Revenue Authority assesses "habitable dwelling" for LTT purposes, the evidence pack expected (structural surveys, photographs, missing kitchen / bathroom, lender refusal letters), the path from residential-rate LTT to non-residential reclassification under LTTA 2017, the time-limit for amending the LTT return (under LTTA 2017 s.34 + Tax Collection and Management (Wales) Act 2016), and the practical Welsh tribunal pathway if WRA refuses the refund. Distinct from the English SDLT "P N Bewley" case-law line (Bewley is England-only; the Welsh test runs against LTTA 2017 + WRA practice). Distinct from B1 / B2 (rates pages) by being a specific post-completion refund mechanic on a single transaction type. Worked example uses a Welsh derelict cottage purchase with the evidence build-out and refund quantum walk.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** B5 is a niche but high-saving topic for the rural-Wales / renovation-buyer cohort. Direct lift from `topic_gaps_final.md` candidate `ltt-refunds-for-derelict-or-uninhabitable-properties`.

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (`follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"}`), parse with BeautifulSoup (lxml). Extract H2/H3 outline, FAQ density, evidence-pack guidance, treatment of habitable-dwelling boundary tests.

- https://www.ukpropertyaccountants.co.uk/ltt-refunds-for-derelict-or-uninhabitable-properties — Stage 1 seed; primary competitor for this topic. Verify live at write time.
- https://www.gov.wales/land-transaction-tax — Welsh Revenue Authority overview; useful for the return-amendment mechanism.
- https://www.gov.wales/calculation-land-transaction-tax-payable-technical-guidance — technical guidance on chargeable consideration; covers residential vs non-residential classification.
- https://taxaccountant.co.uk/derelict-property-stamp-duty-refund — verify live at write time; may be England-focused but the framing is relevant for the contrast.
- https://www.bbc.co.uk/news/uk-wales-search-results (search "derelict property tax wales") — verify live at write time; useful for any recent WRA case coverage.

**§16.31 URL liveness check:** Run httpx fetch above. If a URL returns non-200, replace via reasoning: search "ltt refund derelict" or fall back to gov.wales technical guidance on chargeable consideration.

**Borrowable patterns:** UK Property Accountants is the canonical competitor on this topic. Our differentiator: the Welsh statute-specific test + the WRA practical evidence bar + the Welsh tribunal pathway. Avoid copying the Bewley / SDLT framing wholesale; Welsh practice may diverge.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary queries: "ltt refund derelict wales", "uninhabitable property ltt", "welsh stamp duty refund renovation", "wra refund claim", "ltt non-residential reclassification".*

---

## Closest existing pages (cannibalisation context)

- `sdlt-mixed-use-property-classification` (England s.116 + Bewley line case-law). **Differentiation guidance:** the SDLT page covers the England test under FA 2003 + the Bewley Upper Tribunal authority. B5 covers the Welsh equivalent under LTTA 2017 + WRA practice. Cross-link as the parallel; do NOT copy the Bewley framing wholesale (Welsh practice may differ even where the underlying chargeable-consideration logic is similar).
- B1 (sibling — Welsh main rates). **Differentiation guidance:** B1 covers residential rates; B5 is the refund route when residential rates were paid in error. Cross-link.
- B3 (sibling — Welsh MDR). **Differentiation guidance:** distinct reliefs; both sit under LTTA 2017 but B3 is for genuine multi-dwelling acquisitions, B5 is for uninhabitable-property reclassification. Cross-link as sibling reliefs.
- `sdlt-refund-scams-how-to-avoid` (England SDLT refund-scam consumer-protection page). **Differentiation guidance:** B5 is a legitimate refund route, not a scam. Cross-link with explicit "this is the legitimate Welsh refund process, not the 'we'll get your SDLT back' scam pattern; see the SDLT page for the scam-pattern warning".

**Cannibalisation discipline:**
- B5 has no within-bucket parallel (no B6-B10 mirror page).
- The SDLT Bewley page is the closest cross-jurisdictional parallel; differentiate by Welsh statute + WRA practice + Welsh tribunal pathway.

---

## Redirect overlap (on launch)

Scan of `Property/web/src/middleware.ts` 2026-05-23 shows zero existing redirects for `welsh-ltt-derelict-*`, `wales-uninhabitable-*`, or `ltt-refund-*` tokens. No repointing required at launch.

---

## Authority links worth considering (session selects 5-8)

- **LTTA 2017 s.10** (effective date for chargeable consideration): https://www.legislation.gov.uk/anaw/2017/1/section/10
- **LTTA 2017 ss.34-35** (amendment of LTT return + time limits): https://www.legislation.gov.uk/anaw/2017/1/section/34
- **Tax Collection and Management (Wales) Act 2016** (assessment and appeal framework that WRA operates under): https://www.legislation.gov.uk/anaw/2016/6/contents
- **gov.wales LTT calculation technical guidance:** https://www.gov.wales/calculation-land-transaction-tax-payable-technical-guidance
- **gov.wales LTT refund and amendment guidance:** https://www.gov.wales/file-tax-return-land-transaction-tax-online (verify exact refund-page URL at write time).
- **Welsh Tax Tribunal (First-tier and Upper Tribunal) decisions:** https://www.gov.uk/tax-tribunal-decisions (search for LTT decisions; verify any Welsh-specific case authorities at write time).
- **PN Bewley v HMRC [2019] UKUT 0042** (the England Upper Tribunal authority on derelict-property mixed-use classification — for cross-jurisdictional contrast): https://www.bailii.org/uk/cases/UKUT/TCC/2019/42.html — one cross-reference only.
- **HMRC SDLT Manual SDLTM00385** (HMRC's view on "dwelling" for SDLT — for cross-jurisdictional contrast): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm00385

---

## Universal rules (do not skip)

### §16.35 per-write verification (highest priority for this brief)

**Verify every numeric tax figure (rates, bands, surcharge percentages, thresholds, replacement-window months) against current gov.wales / revenue.scot / legislation.gov.uk at write time per §16.35. Devolved tax tables change annually with each Welsh / Scottish Budget cycle. Do NOT carry figures from the brief without re-verification.** For B5 the critical figures are the residential vs non-residential band tables (verify both at gov.wales at write time) and the time-limit for amending an LTT return (under LTTA 2017 s.34 — verify the standard 12-month amendment window and any extended-period exceptions at write time).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. The page is procedural; structure as a path from purchase to refund.
- Anonymised Welsh renovation-buyer personas. No real client names. No real surveyor / valuer names.

### Lead-gen architecture
- `LeadForm` auto-injected. Never duplicate.
- `<aside>` styled by global CSS. No classes.
- Lead-form role segments: Property developer / Individual landlord (renovation cohort).

### CTA placement guidance (per this page)
- 1-3 inline `<aside>` CTAs. Suggested: after the "What counts as uninhabitable for LTT?" section; after the worked refund quantum; after the WRA evidence-pack section.
- Avoid: opening with an aside; placing inside the worked example; >3 asides total.

### Schema
- FAQs in frontmatter `faqs:` array. Don't add in body.
- Target 10-14 FAQs.
- Section structure may suit HowTo schema for the claim process; flag in work-log.

### Cannibalisation
- Read SDLT mixed-use page + SDLT refund-scams page + B1 before writing.
- Do not duplicate the Bewley case framing wholesale; cite for contrast only.

### House positions
- **Read `docs/property/house_positions.md` §23 in full.** §23.1 (Welsh main rates) + §23.3 (Welsh non-residential band table) + §23.10 (citations) + §23.11 (do-not-write).
- Do NOT cite the England Bewley test as authoritative for Welsh LTT; cite it only for cross-jurisdictional contrast.

### Anti-templating
- B5 has no within-bucket parallel. The principal templating risk is against the SDLT mixed-use / Bewley page. Do NOT structure B5 as "the Welsh equivalent of Bewley". The framing differentiator MUST be the LTTA 2017 + WRA practice + Welsh tribunal pathway as a standalone Welsh story. Vary opening; vary FAQ phrasing.

### Quality bar
- Word count: 2,800-3,500 (procedural-mechanic + evidence-pack + worked example density).
- FAQs: 10-14.
- New external authority links: 5-7 from list above. The LTTA 2017 ss.34-35 + Tax Collection and Management (Wales) Act 2016 + gov.wales technical guidance are the citation density floor.
- Build clean.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md` §23 in full.** §23.1 + §23.3 + §23.11 mandatory.
2. **Claim the page** in `wave5_page_tracker.md`.
3. **Read the brief** (this file). Pay attention to: framing differentiator, anti-templating against Bewley/SDLT page, authority links.
4. **Fetch each competitor URL** with httpx; verify §16.31 liveness.
5. **Read closest existing pages** on our site + B1 + B3 siblings.
6. **Plan the write** before touching markdown. H2/H3 outline (vary from SDLT mixed-use page), meta title, meta description, 10-14 FAQs covering "what counts as uninhabitable for LTT" + evidence pack + claim mechanic + time limits + WRA challenge + tribunal pathway + comparison to England, inline aside CTA placements.
7. **Verify factual claims** per §16.35: re-verify residential vs non-residential band tables; amendment time limits.
8. **Fetch hero image from Pexels** via `fetch_image_for_post`. Query: "derelict house renovation" / "old cottage wales".
9. **Write the markdown file** at `Property/web/content/blog/welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics.md`. Full frontmatter required.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks must pass).**
12. **Redirect overlap:** zero current; skip.
13. **Register in `monitored_pages`.**
14. **Commit on branch.** Commit BEFORE marking done.
15. **Fill in work-log.**
16. **Mark done** in tracker.
17. **Append flags.**
18. **Log discoveries** — particularly any Welsh Tribunal LTT decisions found during research (potential authority gap that could feed future waves).
19. **Next page.**

## Session-side watcher pattern

Standard. Persistent false; timeout 1 hour; do NOT block.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Why these vs other options:**

### Competitor URLs fetched

### Existing-page review

### Citations added (external authority)

### Internal links added

### Inline CTA placements

### Build attempts

### Verification
- FAQ schema count in built HTML matches frontmatter:
- Em-dashes in markdown:
- Tailwind classes in markdown:
- Meta title length:
- Meta description length:
- Internal links resolve:
- monitored_pages row inserted:
- Body word count:

### Flags raised to wave5_site_wide_flags.md

### 2-3 sentence summary
