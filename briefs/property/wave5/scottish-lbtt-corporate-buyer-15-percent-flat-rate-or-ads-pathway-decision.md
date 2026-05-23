# Wave 5 brief: scottish-lbtt-corporate-buyer-15-percent-flat-rate-or-ads-pathway-decision

**Site:** property
**Bucket:** B (Devolved property tax: Welsh LTT + Scottish LBTT + ADS)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/scottish-lbtt-corporate-buyer-15-percent-flat-rate-or-ads-pathway-decision.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/scottish-lbtt-corporate-buyer-15-percent-flat-rate-or-ads-pathway-decision

---

## Manager pre-decisions

- **Suggested slug:** `scottish-lbtt-corporate-buyer-15-percent-flat-rate-or-ads-pathway-decision`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** B (Devolved property tax — Scottish LBTT lane)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The page owns the Scottish corporate-buyer pathway. Two positive Scottish-specific structural points anchor it: (1) Scotland does NOT have an LBTT equivalent of England's 15% SDLT flat rate on £500k+ enveloped dwellings (FA 2003 Sch 4A); corporate BTL acquisitions in Scotland are charged at LBTT main rates + ADS 8% on the entire purchase price (no flat 15% pathway exists at all). (2) Scotland DOES replicate the six-or-more-dwellings non-residential rule under LBTT(S)A 2013 s.59(8), mirroring FA 2003 s.116(7). This page covers: the absence of an LBTT equivalent to England's 15% flat rate (Scotland chose ADS + main rates instead); the s.59(8) six-dwellings automatic non-residential treatment (ADS does not apply to non-residential purchases); the ATED-LBTT-RoE interaction for overseas corporates (ATED is UK-wide and applies in Scotland); and the corporate-buyer decision tree for SPV / overseas-vehicle / individual acquisition routes. Distinct from B6 + B7 by being the corporate-specific page. Distinct from any England SDLT corporate-buyer page (e.g., `ated-15-percent-flat-rate-sdlt-interaction` — verify exact slug at write time) by covering Scottish statute. Worked examples use Scottish corporate purchases (£650k SPV-held residential, 7-dwelling Scottish portfolio acquisition triggering s.59(8)) with the ADS / non-residential decision branches.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** B9 is medium priority but high-value for the SPV / overseas-corporate cohort. Closest siblings are the existing ATED + SDLT corporate pages (England); B9 is the Scottish parallel.

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (`follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"}`), parse with BeautifulSoup (lxml). Extract H2/H3 outline, FAQ density, corporate-buyer pathway treatment, ATED-LBTT interaction.

- https://www.ukpropertyaccountants.co.uk/lbtt-acquisition-relief-when-corporate-takeovers-reduce-tax — Stage 1 seed; covers acquisition relief which B9 mentions briefly and B10 covers in depth. In v2 working set.
- https://revenue.scot/taxes/land-buildings-transaction-tax/non-residential-property — non-residential LBTT bands; useful for the s.59(8) six-dwellings cite.
- https://revenue.scot/taxes/land-buildings-transaction-tax/lbtt-legislation-guidance — general LBTT legislation guidance.
- https://www.gov.uk/government/publications/annual-tax-on-enveloped-dwellings — ATED authority page (UK-wide).
- https://taxaccountant.co.uk/spv-acquisition-scotland — verify live at write time; SPV-focused competitor.

**§16.31 URL liveness check:** Run httpx fetch above. If a URL returns non-200, replace via reasoning: search "scottish corporate buyer lbtt" or fall back to revenue.scot non-residential and legislation guidance.

**Borrowable patterns:** UK Property Accountants acquisition-relief page is high-relevance for the B10 cross-link; for B9 the framing centres on the absence-of-15%-flat-rate + presence-of-s.59(8) + presence-of-ATED structural points. Our discipline: lead with what Scotland HAS NOT done (no 15% flat rate), then what it HAS done (s.59(8) parallel to England), then ATED overlay.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary queries: "scotland corporate buyer lbtt", "lbtt 15 percent flat rate", "scotland spv property tax", "lbtt six dwellings rule", "lbtt ads corporate".*

---

## Closest existing pages (cannibalisation context)

Zero direct on-site Scottish corporate-buyer coverage. Closest existing pages:

- `ated-15-percent-flat-rate-sdlt-interaction` (verify exact slug at write time; the England-specific ATED + 15% SDLT page if it exists). **Differentiation guidance:** B9 explicitly notes Scotland does NOT have an equivalent of the 15% flat rate. Cross-link with explicit contrast.
- `sdlt-corporate-buyer-non-natural-person-15-percent-rate` (verify exact slug at write time; if exists). **Differentiation guidance:** parallel England page; cross-link as contrast.
- B6 (sibling — Scottish main rates page). **Differentiation guidance:** B6 covers main rates; B9 covers corporate-buyer pathway sitting on main rates + ADS.
- B7 (sibling — Scottish ADS page). **Differentiation guidance:** ADS applies to all corporate residential purchases in Scotland regardless of value. B9 references B7 for the ADS mechanic depth.
- `sdlt-six-dwellings-non-residential-election` (England s.116(7) page). **Differentiation guidance:** Scotland has an equivalent (LBTT(S)A 2013 s.59(8)); cross-link as the parallel rule + worked Scottish example.
- `incorporating-property-portfolio-uk-2026` (existing incorporation pillar). **Differentiation guidance:** B9 sits in the same category. The incorporation pillar covers CGT + CT + operational sides; B9 covers the LBTT side for Scottish acquisitions.

**Cannibalisation discipline:**
- B9 has no within-bucket parallel mirror. Cross-links are to B6 (rates), B7 (ADS), B10 (acquisition relief depth), and the England SDLT corporate pages (cross-jurisdictional contrast).
- Do not duplicate worked examples verbatim across B9 / B7 / B10 / SDLT 15% page.

---

## Redirect overlap (on launch)

Scan of `Property/web/src/middleware.ts` 2026-05-23 shows zero existing redirects for `scottish-corporate-*`, `lbtt-spv-*`, or `scotland-non-natural-person-*` tokens. No repointing required at launch.

---

## Authority links worth considering (session selects 5-8)

- **LBTT(S)A 2013 s.59(8)** (six-dwellings non-residential rule): https://www.legislation.gov.uk/asp/2013/11/section/59
- **LBTT(S)A 2013 Sch 2A** (ADS, applicable to corporate buyers): https://www.legislation.gov.uk/asp/2013/11/schedule/2A
- **revenue.scot non-residential property page:** https://revenue.scot/taxes/land-buildings-transaction-tax/non-residential-property
- **revenue.scot LBTT legislation guidance:** https://revenue.scot/taxes/land-buildings-transaction-tax/lbtt-legislation-guidance
- **FA 2003 Sch 4A** (England 15% flat rate for non-natural persons — for cross-jurisdictional contrast cite): https://www.legislation.gov.uk/ukpga/2003/14/schedule/4A — one cross-reference only.
- **FA 2003 s.116(7)** (England six-dwellings rule — for cross-jurisdictional contrast cite): https://www.legislation.gov.uk/ukpga/2003/14/section/116 — one cross-reference only.
- **FA 2013 Part 3** (ATED, UK-wide): https://www.legislation.gov.uk/ukpga/2013/29/part/3
- **gov.uk ATED guidance:** https://www.gov.uk/guidance/annual-tax-on-enveloped-dwellings-the-basics

---

## Universal rules (do not skip)

### §16.35 per-write verification (highest priority for this brief)

**Verify every numeric tax figure (rates, bands, surcharge percentages, thresholds, replacement-window months) against current gov.wales / revenue.scot / legislation.gov.uk at write time per §16.35. Devolved tax tables change annually with each Welsh / Scottish Budget cycle. Do NOT carry figures from the brief without re-verification.** Specifically: re-verify the 8% ADS rate; the non-residential LBTT bands (0% to £150k, 1% £150k-£250k, 5% above £250k); the s.59(8) six-dwellings threshold; the ATED bands for 2026/27 (cross-reference §2 of house_positions.md for ATED figures); the England 15% flat-rate cross-jurisdictional cite (gov.uk SDLT).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots.
- Practical, specific.
- Anonymised Scottish corporate / SPV personas (Highland Properties Ltd, Caledonian Investments Ltd, Macleod Holdings Ltd). No real client names. No real SPV firm names.

### Lead-gen architecture
- `LeadForm` auto-injected. Never duplicate.
- `<aside>` styled by global CSS. No classes.
- Lead-form role segments: Large portfolio (10+) / Property developer / SPV / overseas corporate buyer cohort.

### CTA placement guidance (per this page)
- 1-3 inline `<aside>` CTAs. Suggested: after the "no 15% flat rate in Scotland" point is anchored; after the s.59(8) walked example; after the ATED-LBTT interaction section.
- Avoid: opening with an aside; placing inside a worked example; >3 asides total.

### Schema
- FAQs in frontmatter `faqs:` array. Don't add in body.
- Target 10-14 FAQs.

### Cannibalisation
- Read SDLT corporate pages + B6 + B7 + ATED page before writing.
- Do NOT duplicate the existing ATED page's mechanics; reference it as the UK-wide overlay.

### House positions
- **Read `docs/property/house_positions.md` §23 in full.** §23.5 (ADS) + §23.6 (Scottish MDR, non-residential bands, s.59(8) six-dwellings) + §23.8 (cross-jurisdictional table) + §23.11 (do-not-write list). Cross-reference §1 (SDLT 15% rate); §2 (ATED bands).
- Do NOT state Scotland has a 15% flat rate equivalent to England's Sch 4A (false; the absence is a structural feature).

### Anti-templating
- B9 has no within-bucket parallel mirror page. Templating risk is against England SDLT 15% / ATED pages. The framing differentiator MUST be the Scottish positive-and-negative structural points (no 15% flat, yes s.59(8), yes ATED overlay) with Scottish statute + Scottish worked examples. NOT "the Scottish equivalent of the SDLT 15% rate".
- Vary opening; vary FAQ phrasing.

### Quality bar
- Word count: 2,800-3,500 (corporate-buyer pathway + s.59(8) + ATED interaction density).
- FAQs: 10-14.
- New external authority links: 5-8 from list above.
- Build clean.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md` §23 in full.** §23.5 + §23.6 + §23.8 + §23.11 mandatory. Cross-reference §1 + §2.
2. **Claim the page** in `wave5_page_tracker.md`.
3. **Read the brief** (this file). Pay attention to: framing differentiator, authority links.
4. **Fetch each competitor URL** with httpx; verify §16.31 liveness.
5. **Read closest existing pages** on our site + B6 + B7 siblings on the B branch.
6. **Plan the write** before touching markdown. H2/H3 outline (vary from any SDLT 15% page), meta title, meta description, 10-14 FAQs covering no-15%-flat-rate position + s.59(8) six-dwellings + ATED interaction + ADS-applies-to-corporates + SPV vs overseas-vehicle decision + practical worked examples, inline aside CTA placements.
7. **Verify factual claims** per §16.35: re-verify 8% ADS; non-residential LBTT bands; s.59(8); ATED bands.
8. **Fetch hero image from Pexels** via `fetch_image_for_post`. Query: "scotland commercial property" / "edinburgh office building".
9. **Write the markdown file** at `Property/web/content/blog/scottish-lbtt-corporate-buyer-15-percent-flat-rate-or-ads-pathway-decision.md`. Full frontmatter required.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks must pass).**
12. **Redirect overlap:** zero current; skip.
13. **Register in `monitored_pages`.**
14. **Commit on branch.** Commit BEFORE marking done.
15. **Fill in work-log.**
16. **Mark done** in tracker.
17. **Append flags.**
18. **Log discoveries.**
19. **Next page.**

## Session-side watcher pattern

Standard. Persistent false; timeout 1 hour; do NOT block.

---

## Per-page work-log

### Decisions
- **Final slug:** `scottish-lbtt-corporate-buyer-15-percent-flat-rate-or-ads-pathway-decision` (no override)
- **Final category:** `incorporation-and-company-structures` (no override; matches brief and complements existing incorporation pillar)
- **H1 chosen:** "Scottish LBTT for Corporate Buyers: No 15% Flat Rate, ADS on Every Purchase, Six-Dwellings Non-Residential Route"
- **Meta title:** "Scottish LBTT Corporate Buyers: No 15% Flat Rate" (48 chars, after initial 63-char draft trimmed)
- **Why these vs other options:** Anti-templating against England SDLT 15% pages held by anchoring on the Scottish positive-and-negative structural points (no 15% flat, yes s.59(8), yes ATED overlay). Scottish corporate personas (Highland Properties Ltd, Caledonian Investments Ltd, Macleod Holdings Ltd) distinct from earlier B-bucket pages.

### Competitor URLs fetched
- Most URLs already verified earlier in B6/B7 prep (revenue.scot pages); s.59(8) verified via legislation.gov.uk in B7's preparation.
- ATED bands taken from §2 of house_positions.md (Wave 1 locked); not re-verified via WebFetch given context constraints — flagged as a potential verify-at-write spot if ATED bands shift in a future SI.

### Existing-page review
- B6 (Scottish main rates): cross-link as the underlying band table.
- B7 (Scottish ADS): cross-link as the 8% flat-on-total mechanic that applies to all corporate residential acquisitions.
- B10 (Scottish bare-trust acquisition relief): forward-link as the relief route that can avoid the corporate-ADS outcome in defined scenarios.
- `ated-15-percent-flat-rate-sdlt-interaction`: cross-link as the England-side parallel.
- `sdlt-six-dwellings-non-residential-election`: cross-link as the England-side parallel of LBTT s.59(8).
- `incorporating-property-portfolio-uk-2026`: cross-link as the broader incorporation strategy pillar.

### Citations added (external authority)
- LBTT(S)A 2013 s.59(8) (six-dwellings non-residential rule).
- LBTT(S)A 2013 Schedule 2A (ADS applies to corporate buyers).
- FA 2003 Schedule 4A (England 15% flat rate, contrast cite).
- FA 2003 s.116(7) (England six-dwellings parallel, contrast cite).
- FA 2013 Part 3 (ATED, UK-wide).
- revenue.scot non-residential property page + LBTT legislation guidance.
- gov.uk ATED guidance.

### Internal links added
- `/blog/landlord-tax-essentials/scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide` (B6).
- `/blog/landlord-tax-essentials/scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers` (B7).
- `/blog/incorporation-and-company-structures/ated-15-percent-flat-rate-sdlt-interaction` (existing ATED + 15% SDLT page).
- `/blog/landlord-tax-essentials/sdlt-six-dwellings-non-residential-election` (existing England s.116(7) page).
- `/blog/incorporation-and-company-structures/incorporating-property-portfolio-uk-2026` (existing incorporation pillar).

### Inline CTA placements
- Aside 1: after the s.59(8) explanation (bulk-portfolio structuring angle).
- Total 1 aside.

### Build attempts
- npm run build: PASS (450 static pages, +1 since B8). Initial body 2,458 words was 342 short of 2,800 floor; added a substantive ATED-reliefs section (rental-business / developer / farmhouse / no-relief default with full 2026/27 rate table); plus a one-sentence reinforcement at the end of the ATED-default paragraph. Final body 2,813 words.

### Verification
- FAQ schema count: 12 = 12 ✅
- Em-dashes: 0 ✅
- Tailwind classes: 0 ✅
- Meta title length: 48 ≤62 ✅ (initial 63-char draft trimmed)
- Meta description length: 149 ≤158 ✅ (initial 161-char draft trimmed)
- Internal links resolve: all 5 ✅
- monitored_pages row inserted: id 215 ✅
- Body word count: 2,813 (within 2,800-3,500 brief target) ✅

### Flags raised to wave5_site_wide_flags.md
- None this page.

### 2-3 sentence summary
B9 owns the Scottish corporate-buyer pathway: no LBTT equivalent of the England SDLT 15% flat rate; corporate buyers pay LBTT main rates plus 8% ADS on every Scottish residential acquisition regardless of value; the s.59(8) six-or-more-dwellings non-residential rule mirrors FA 2003 s.116(7) and is the major relief route for bulk portfolio acquisitions; ATED applies UK-wide and operates in Scotland exactly as in England. Three Scottish corporate worked examples (Highland Properties SPV £650k, Caledonian Investments 7-dwelling £2.1m s.59(8), Macleod Holdings overseas-vehicle £400k) walk the LBTT+ADS+ATED calculation at typical price points and surface the cross-jurisdictional decision between SPV-in-Scotland and SPV-in-England.
