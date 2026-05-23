# Wave 6 brief: extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27

**Site:** property
**Bucket:** A (LtdCo extraction-sequence pillar)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27

---

## Manager pre-decisions

- **Suggested slug:** `extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** A (LtdCo extraction-sequence pillar)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> A1 is the **decision-tree pillar** for Bucket A. Not "salary vs dividends" (Wave 4 A5 already owns the single-year marginal-rate snapshot for 2026/27), not "which extraction routes exist" (Wave 1 B7 already lists them). A1 is the **multi-year sequencer** that walks six routes (DLA credit, dividend, salary, employer pension, share buyback, MVL) across an N-year window, optimised against the FA 2021 reinstated small-profits-rate plus marginal-relief band, the post-6-April-2026 dividend rates (10.75 / 35.75 / 39.35 per house position §21.4), the post-6-April-2025 employer NI shift (15% above the £5k secondary threshold), and the founder's age / retirement runway. **Decision-tree spine:** in year N, given profit X, DLA credit balance Y, founder age Z and post-retirement runway, draw in this order. The page is the umbrella that forward-links every depth page in Bucket A (A2 DLA bed-and-breakfast trap, A3 share buyback mechanics, A4 MVL exit, A5 employer pension extraction depth, A6 12-month compressed-timeline scenarios, A7 multi-company HoldCo conduit, A8 mid-incorporation extraction, A9 pre-sale strip, A10 trust-owned-SPV extraction).

If your reasoning suggests the slug / category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Pillar entry point. Must not duplicate Wave 1 B7 (mechanics list) or Wave 4 A5 (single-year marginal-rate snapshot). Distinguishing axis is the multi-year sequencing of extraction routes against DLA credit exhaustion, dividend-rate-band cliff and founder age.

---

## Competitor URLs (Stage 2 §16.31 verified 2026-05-23)

- https://www.ukpropertyaccountants.co.uk/extracting-cash-from-property-limited-company/ — VERIFIED ALIVE 2026-05-23 (HTTP 200). Comprehensive on the six extraction routes (DLA, dividend, salary, pension, buyback, MVL) with mechanics per route; useful for outline-shape cross-reference. Borrow the route-grid shape only; A1's distinguishing axis is the multi-year sequencer.
- https://www.ukpropertyaccountants.co.uk/extracting-cash-from-a-property-limited-company-as-tax-efficient-as-possible/ — STAGE 1 SEED. Returned 404 at Stage 2 verification; treat as **DEAD**, do not cite. ukpropertyaccountants extracting-cash link above provides adequate coverage.
- https://www.taxinsider.co.uk/extracting-cash-from-a-property-investment-company-the-best-and-worst-routes — STAGE 1 SEED. Permission-denied during Stage 2 WebFetch verification; treat as **TENTATIVE** and session must re-verify with httpx at write time. If dead, ukpropertyaccountants coverage adequate.

**Stage 2 verification note:** one URL confirmed alive (primary). One dead (replaced via primary alternative). One tentative pending session re-verification. Adequate coverage even if tentative URL fails.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: route-grid layouts, the integration of DLA credit balance into the sequencing decision, and any multi-year worked-example structure. Borrow outline-shape, NOT clause language. Cross-check every claim against CTA 2010 ss.18A-18N (small profits + marginal relief, post-FA-2021), CTA 2009 s.54 (W&E test), ITTOIA 2005 Pt 4 (dividend rates), ITEPA 2003 Pt 2 (employment income), and CTA 2010 s.455 (overdrawn DLA).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator (extracting cash from property SPV, multi-year extraction sequence, profit-extraction strategy property limited company).*

---

## Closest existing pages (cannibalisation context)

Stage 1 + Stage 2 reasoned identification (not Jaccard):

1. `extracting-money-from-property-limited-company` (Wave 1 B7) — **sibling pillar.** Lists the routes at mechanics level. A1 differentiates by being the **multi-year sequencer** rather than the route-by-route mechanics list. A1 forward-links B7 for any reader who lands on A1 but only wants the per-route mechanic. Raise INTERNAL_LINK flag for B7 to back-link to A1 as the umbrella.

2. `salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis` (Wave 4 A5) — single-year point-in-time. A1 layers across years; A5 is the 2026/27 single-year band-cliff analysis. A1 forward-links A5 for the deep marginal-rate detail; A5 should back-link to A1 for the multi-year framing (INTERNAL_LINK flag).

3. `property-company-profit-extraction-salary-vs-dividends` — legacy, partial overlap. Pre-Wave-4. Recommend post-launch redirect chain points to A1 once A1 is canonical pillar.

4. `corporation-tax-marginal-relief-property-companies` (Wave 1 B4) — A1 cites as input for the marginal-relief band (CTA 2010 ss.18A-18N post-FA-2021).

5. `2027-tax-rates-incorporation-decision-uk-landlords` — pre-decision (incorporate or not). A1 is post-decision (you're a LtdCo, now extract). Forward / back link.

**Cannibalisation discipline:**
- A1 stays strictly at multi-year sequencing level. It does NOT re-walk single-route mechanics (defer to A2, A3, A4, A5, A7, etc.). It IS the umbrella decision-tree.

---

## Redirect overlap (on launch)

Stage 2 scan of `Property/web/src/middleware.ts` for tokens `extracting-cash`, `extracting-money`, `profit-extraction`, `cash-out-property-company`, `extraction-sequence` returned: existing `property-company-profit-extraction-salary-vs-dividends` slug in middleware (line 110) routes to `incorporation-and-company-structures` category page. Recommend post-launch repointing of this legacy slug to A1 as the new canonical extraction pillar.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 5-8 to actually cite. **STAGE 2 DRIFT CATCH (§16.36):** brief-seed cited "CTA 2010 ss.18N/22-44 marginal relief". CTA 2010 s.18 was OMITTED by FA 2014 and only reinstated as ss.18A-18N by FA 2021 with effect from 1 April 2023. The current marginal-relief / small-profits-rate framework is CTA 2010 **ss.18A-18N** (s.18A = standard small profits rate; s.18E = associated companies; s.18N = close investment-holding companies). Use s.18A-18N range, not ss.18-44.

- [CTA 2010 s.18A "Profits charged at the standard small profits rate"](https://www.legislation.gov.uk/ukpga/2010/4/section/18A) — small profits rate gateway
- [CTA 2010 s.18E "Associated companies"](https://www.legislation.gov.uk/ukpga/2010/4/section/18E) — associated companies test for SPR / marginal relief
- [CTA 2010 s.18N "Close investment-holding companies"](https://www.legislation.gov.uk/ukpga/2010/4/section/18N) — CIHC exclusion (per house position §21.5, pure-investment FICs may be caught; most BTL SPVs escape via the qualifying-purpose carve-out)
- [CTA 2010 s.455 "Charge to tax in case of loan to participator"](https://www.legislation.gov.uk/ukpga/2010/4/section/455) — overdrawn DLA charge gateway
- [CTA 2010 s.456 "Exceptions to the charge under section 455"](https://www.legislation.gov.uk/ukpga/2010/4/section/456) — exceptions
- [ITTOIA 2005 Part 4 (Savings and investment income — dividends Chapter 3)](https://www.legislation.gov.uk/ukpga/2005/5/part/4) — dividend income tax framework
- [FA 2004 s.188 "Relief for contributions"](https://www.legislation.gov.uk/ukpga/2004/12/section/188) — pension contribution relief gateway
- [FA 2004 s.196 "Relief for employers in respect of contributions paid"](https://www.legislation.gov.uk/ukpga/2004/12/section/196) — employer pension contribution relief
- [CTA 2009 s.54 "Expenses not wholly and exclusively for trade and unconnected losses"](https://www.legislation.gov.uk/ukpga/2009/4/section/54) — W&E test gateway for company-side deductions
- [HMRC CTM03500 (Marginal relief 2023 onwards)](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03500)
- [HMRC SAIM5000 (Distributions)](https://www.gov.uk/hmrc-internal-manuals/savings-and-investment-manual/saim5000)
- [HMRC NIM02320 (Directors NI)](https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim02320)
- [gov.uk: Tax on dividends 2026/27](https://www.gov.uk/tax-on-dividends)

---

## Universal rules (do not skip)

### §16.35 per-write numeric verification
Verify every numeric tax figure against current gov.uk at write time per §16.35. Critical figures:
- CT main rate 25%, small profits rate 19%, marginal-relief band £50k-£250k (per house position §21.4).
- Post-6-April-2026 dividend rates 10.75% / 35.75% / 39.35% (per house position §21.4 F-20 correction; do NOT carry stale 8.75 / 33.75).
- Post-6-April-2025 employer NI 15% above £5k secondary threshold (per house position §21.4 F-19 correction; do NOT carry stale 13.8% / £9,100).
- £500 dividend allowance.
- £60,000 pension annual allowance (verify; tapered above £260k threshold).
- s.455 rate 33.75%.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Plain-language opening since this is the umbrella pillar entry point.
- Anonymised personas only.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- `<aside><p>headline</p><p>body</p></aside>` styled by global CSS.

### CTA placement guidance (per this page)
- Add 2-3 inline `<aside>` CTAs: after the 6-route inventory, after the multi-year worked example, after the founder-age decision tree.
- Vary opening sentence. A1 should open from "the question is rarely which extraction route, but in what order, and how the order shifts as DLA credit exhausts and the founder ages toward retirement".

### Schema
- FAQs live in frontmatter `faqs:` array. Target 12-14 FAQs (pillar; high entry-level + repeat-search demand).

### Cannibalisation
- Read Wave 1 B7 + Wave 4 A5 carefully before writing. Differentiation: A1 = multi-year sequencer; B7 = route-list mechanics; A5 = single-year marginal-rate snapshot.

### CSS in markdown
- Semantic HTML only. No Tailwind utility classes.

### House positions
- §21 entire (LtdCo + FIC, Wave 4 extension) is the primary statutory anchor.
- §21.1 (DLA credit + s.455 mechanics + HMRC official rate of interest).
- §21.4 (CT rates / NI / dividend rates 2026/27 — verify per-write).
- §21.5 (FIC mechanics, particularly CIHC carve-out at s.18N).
- §22.13 (trust-vs-FIC boundary, light cross-link if reader is comparing structures).

### Anti-templating
- A1's natural H2 spine: (1) the umbrella opening — why sequencing matters, (2) the six extraction routes (one-paragraph each, with depth-page forward-links), (3) the marginal-rate spine 2026/27 — small-profits / marginal-relief / main rate vs dividend bands, (4) the founder-age dimension — pre-retirement vs near-retirement vs post-retirement extraction profiles, (5) multi-year worked example (5-year window, profit profile, DLA balance), (6) the DLA-exhaustion cliff (when tax-free runway ends), (7) the dividend-band cliff (when higher-rate kicks in), (8) the trust-owned-SPV / HoldCo overlay (forward-link A7, A10), (9) common sequencing failure modes, (10) decision-tree quick-reference.
- Vary FAQ phrasing.

### Quality bar
- Word count: 3,200-3,800 body (pillar; upper band).
- FAQs: 12-14.
- New external authority links: 6-8.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start. §21 entire, §22.13 light.
2. **Claim the page** in `docs/property/wave6_page_tracker.md`.
3. **Read the brief** (this file). §16.35 mandatory.
4. **Fetch each competitor URL.** Primary confirmed alive; one dead-replaced; one tentative.
5. **Read the closest existing pages.** Particular care: Wave 1 B7 + Wave 4 A5.
6. **Plan the rewrite/write.** Multi-year sequencer spine.
7. **Verify factual claims.** §16.35 per-write (especially §21.4 figures).
8. **Fetch a hero image from Pexels** via fetch_image_for_post.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks).**
12. **Redirect overlap:** recommend repointing `property-company-profit-extraction-salary-vs-dividends` legacy redirect to A1 post-launch (flag for manager review at wave merge).
13. **Register in `monitored_pages`.**
14. **Commit on your branch.** Commit BEFORE marking done.
15. **Fill in work-log.**
16. **Mark done.**
17. **Flag** (raise INTERNAL_LINK for Wave 1 B7 + Wave 4 A5 to back-link to A1 as umbrella).
18. **Discovery log.**
19. **Next page** (A1 is first in Bucket A; siblings A2-A10 follow).

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

### Existing-page review (from "Closest existing pages")

### Citations added (external authority)

### Internal links added (to our existing pages)

### Inline CTA placements

### Build attempts

### Verification

### §16.35 numeric verification log (every figure cited)

### Flags raised to wave6_site_wide_flags.md

### 2-3 sentence summary
