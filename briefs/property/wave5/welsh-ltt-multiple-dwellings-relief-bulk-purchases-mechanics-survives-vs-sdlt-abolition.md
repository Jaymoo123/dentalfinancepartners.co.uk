# Wave 5 brief: welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition

**Site:** property
**Bucket:** B (Devolved property tax: Welsh LTT + Scottish LBTT + ADS)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition

---

## Manager pre-decisions

- **Suggested slug:** `welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** B (Devolved property tax — Welsh LTT lane)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The page owns the Welsh-MDR-survival story for portfolio buyers. Welsh LTT retained MDR (LTTA 2017 Sch 13) when SDLT abolished it for England + NI on 1 June 2024 (Finance (No.2) Act 2024). The Welsh approach has been MODIFICATION not ABOLITION: from 7 February 2025 the Land Transaction Tax (Modification of Multiple Dwellings Relief) (Wales) Regulations 2025 carved out main-residence-with-subsidiary-dwelling (annexe) purchases by individuals buying at main residential rates; from 13 February 2026 the Land Transaction Tax (Modification of Relief for Acquisitions Involving Multiple Dwellings) (Wales) Regulations 2026 raised the minimum-rate floor from 1% to 3%. The page anchors three positive Welsh-specific mechanics: MDR remains available for genuine portfolio investors and corporate buyers, the subsidiary-dwelling carve-out narrows but does not abolish the relief for individuals, and the 3%-minimum-rate floor reduces the headline benefit while preserving the relief framework. Distinct from any SDLT page by covering a live relief that England landlords lost. Distinct from B1 / B2 (rates pages) by being a specific relief mechanic. Worked examples use Welsh portfolio acquisitions (2-4 dwellings, single transaction) with the mean-consideration formula and the 3%-floor calculation explicit.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** B3 is high-priority because the SDLT MDR abolition (1 June 2024) removed a major portfolio-buyer relief in England + NI. Welsh portfolio buyers retain MDR, with the carve-out and minimum-rate floor modifications. The contrast against `sdlt-multiple-dwellings-relief-abolition-impact-bulk-buyers-2024-2025` (Wave 1) is the principal cross-link target.

---

## Verify-at-write hedge (mandatory per §23.10 drafter)

**§23.10 drafter hedge for B3:** Re-verify the SI commencement cite for the 3% minimum-rate floor at write time. The Welsh Government impact assessment for the Land Transaction Tax (Modification of Relief for Acquisitions Involving Multiple Dwellings) (Wales) Regulations 2026 is published at `https://www.gov.wales/the-land-transaction-tax-modification-of-relief-for-acquisitions-involving-multiple-dwellings-wales-regulations-2026-integrated-impact-assessment-html`, but the precise SI number was not on legislation.gov.uk as of 2026-05-23. At write time, search legislation.gov.uk Welsh SI 2026 for the LTT MDR modification regulations; verify the 13 February 2026 commencement date and the 1% to 3% floor change against the made-affirmative / made-negative procedure citation. If the SI is still not on legislation.gov.uk at write time, cite the gov.wales written statement (https://www.gov.wales/written-statement-amendment-land-transaction-tax-multiple-dwellings-relief, 20 January 2026) and the impact assessment as primary sources, with a footnote that the SI number is to follow once published.

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (`follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"}`), parse with BeautifulSoup (lxml). Extract H2/H3 outline, FAQ density, mean-consideration formula walkthrough, modified-floor calculation. Our differentiator is the survival-with-modification story; competitor outlines often miss the 2025 + 2026 modifications.

- https://www.ukpropertyaccountants.co.uk/ltt-multiple-dwellings-relief — Stage 1 seed; verify live at write time; in v2 competitor working set.
- https://www.gov.wales/multiple-dwellings-relief-land-transaction-tax-overview — authority source; verify rate floor at write time per §16.35.
- https://www.gov.wales/multiple-dwellings-relief-purchases-residential-property-technical-guidance — Welsh Revenue Authority technical guidance.
- https://www.gov.wales/written-statement-amendment-land-transaction-tax-multiple-dwellings-relief — 20 January 2026 written statement (3% floor announcement); high-value primary source.
- https://taxaccountant.co.uk/multiple-dwellings-relief-wales — verify live at write time; sibling competitor on the Welsh MDR topic.

**§16.31 URL liveness check:** Run the httpx fetch above. If any URL returns non-200 or a homepage redirect, replace via reasoning: search the firm's domain + "multiple dwellings relief" or fall back to gov.wales technical guidance.

**Borrowable patterns:** UK Property Accountants LTT MDR page (if live) likely covers the 2025 carve-out; verify whether it covers the 2026 minimum-rate floor (recent change). Our discipline: cover the mean-consideration formula in full with a worked example, then walk the 2025 carve-out and the 2026 floor as the two modifications.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary queries: "multiple dwellings relief wales", "ltt mdr 2026", "welsh mdr abolished", "ltt bulk purchase relief", "portfolio acquisition tax wales".*

---

## Closest existing pages (cannibalisation context)

- `sdlt-multiple-dwellings-relief` (verify exact slug at write time; the Wave 1 SDLT MDR abolition page). **Differentiation guidance:** the SDLT MDR page covers England + NI abolition on 1 June 2024. B3 covers the Welsh MDR survival + modification story. Cross-link as the contrast page; raise reciprocal back-link as a flag.
- `sdlt-six-dwellings-non-residential-election` (England s.116(7) automatic non-residential treatment). **Differentiation guidance:** Wales has no LTT equivalent (§23.3). B3 mentions this absence as part of the framing (Welsh portfolio buyers must use MDR, not the six-dwellings rule). Cross-link as the contrast page.
- B1 (sibling — Welsh main rates pillar). **Differentiation guidance:** B1 covers main rates only. B3 references B1 for the underlying rate table used in the MDR mean-consideration calculation.
- B2 (sibling — Welsh higher rates page). **Differentiation guidance:** MDR is a relief from the rate that would otherwise apply; for a corporate portfolio buyer, that's the higher-rates table (B2). For an individual at main residential rates buying multiple dwellings (post-7-Feb-2025 carve-out applies), MDR is no longer available. Cross-link both ways.
- `incorporating-property-portfolio-uk-2026` (existing incorporation pillar). **Differentiation guidance:** B3 sits in the same category. For Welsh portfolio incorporation, MDR (subject to modifications) reduces the LTT cost of the transfer; B3 covers the LTT side, the incorporation pillar covers CGT + corporation tax + operational sides.

**Cannibalisation discipline:**
- B3 has no cross-bucket cannibal flag (no parallel within B). The SDLT MDR contrast is the main cross-link relationship.
- Do not duplicate worked examples verbatim across B3 / the SDLT MDR abolition page. B3 uses Welsh portfolio scenarios; the SDLT page uses England.

---

## Redirect overlap (on launch)

Scan of `Property/web/src/middleware.ts` 2026-05-23 shows zero existing redirects for `welsh-ltt-mdr-*` or `wales-multiple-dwellings-*` tokens. No repointing required at launch.

---

## Authority links worth considering (session selects 5-8)

- **LTTA 2017 Sch 13** (Multiple Dwellings Relief): https://www.legislation.gov.uk/anaw/2017/1/schedule/13 — primary statutory anchor.
- **Land Transaction Tax (Modification of Multiple Dwellings Relief) (Wales) Regulations 2025** (subsidiary-dwelling carve-out from 7 February 2025): search legislation.gov.uk Welsh SI 2025 at write time; cite the SI number.
- **Land Transaction Tax (Modification of Relief for Acquisitions Involving Multiple Dwellings) (Wales) Regulations 2026** (3% minimum-rate floor from 13 February 2026): search legislation.gov.uk Welsh SI 2026 at write time per the verify-at-write hedge above.
- **gov.wales MDR overview:** https://www.gov.wales/multiple-dwellings-relief-land-transaction-tax-overview
- **gov.wales MDR technical guidance:** https://www.gov.wales/multiple-dwellings-relief-purchases-residential-property-technical-guidance
- **gov.wales 20 January 2026 written statement** (3% floor announcement): https://www.gov.wales/written-statement-amendment-land-transaction-tax-multiple-dwellings-relief
- **gov.wales 2026 SI integrated impact assessment:** https://www.gov.wales/the-land-transaction-tax-modification-of-relief-for-acquisitions-involving-multiple-dwellings-wales-regulations-2026-integrated-impact-assessment-html
- **Finance (No.2) Act 2024** (SDLT MDR abolition for the contrast cite): https://www.legislation.gov.uk/ukpga/2024/12 — one cross-reference only.

---

## Universal rules (do not skip)

### §16.35 per-write verification (highest priority for this brief)

**Verify every numeric tax figure (rates, bands, surcharge percentages, thresholds, replacement-window months) against current gov.wales / revenue.scot / legislation.gov.uk at write time per §16.35. Devolved tax tables change annually with each Welsh / Scottish Budget cycle. Do NOT carry figures from the brief without re-verification.** Specifically: re-verify the 3% minimum-rate floor (effective 13 February 2026) against gov.wales/multiple-dwellings-relief-land-transaction-tax-overview before committing. Also verify: the 7 February 2025 carve-out commencement date; the £40,000 minor-interest threshold; the LTT return due 30 days. **The MDR mean-consideration formula has not changed in 2025 or 2026; only the minimum-rate floor and the subsidiary-dwelling carve-out scope have changed.**

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. Exact figures, named legislation.
- Anonymised Welsh portfolio personas. No real client names.

### Lead-gen architecture
- `LeadForm` auto-injected at bottom. Never duplicate.
- `<aside>` styled by global CSS. No classes.
- Lead-form role segments: Portfolio owner (4-10) / Large portfolio (10+) / Property developer particularly relevant.

### CTA placement guidance (per this page)
- 1-3 inline `<aside>` CTAs. Suggested: after the mean-consideration formula worked example; after the SDLT-abolition contrast section; after the 3%-floor walked example.
- Avoid: opening with an aside; placing inside a worked example; >3 asides total.

### Schema
- FAQs in frontmatter `faqs:` array. Don't add in body.
- Target 10-14 FAQs.
- Body may benefit from HowTo schema for the MDR-claim step-by-step section. Flag in work-log if you think so.

### Cannibalisation
- Read SDLT MDR abolition page + B1 + B2 before writing.
- Do not duplicate worked examples verbatim.

### House positions
- **Read `docs/property/house_positions.md` §23 in full.** B3 sits on §23.3 (Welsh MDR mechanic). Cross-reference §1 (SDLT MDR abolition); §23.6 (Scottish MDR retained, no carve-outs); §23.8 (cross-jurisdictional table); §23.11 (do-not-write).
- Do NOT write "MDR was abolished UK-wide on 1 June 2024" (false; only SDLT MDR abolished, Welsh MDR retained with modifications, Scottish MDR retained without modifications).

### Anti-templating
- B3 has no close within-bucket parallel (no B-side mirror page). The cross-link contrast is against the SDLT MDR abolition page. Do NOT structure B3 as "the Welsh version of SDLT MDR" or "Wales kept what England lost". The framing differentiator is the modification story (carve-out + floor) on the Welsh statute LTTA 2017 Sch 13. Vary opening sentence (no "Many landlords ask whether..."). Vary FAQ phrasing.

### Quality bar
- Word count: 2,800-3,500 (modification-mechanic + worked example density). Justify >3,500 in work-log if needed (cite the modification depth).
- FAQs: 10-14.
- New external authority links: 5-8 from list above. The two SI cites + impact assessment + written statement + LTTA 2017 Sch 13 are the citation density floor.
- Build clean.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md` §23 in full.** §23.3 + §23.11 mandatory.
2. **Claim the page** in `wave5_page_tracker.md`.
3. **Read the brief** (this file). Pay attention to: framing differentiator, §16.35 + the verify-at-write hedge for the SI commencement cite, closest existing pages, authority links.
4. **Fetch each competitor URL** with httpx; verify §16.31 liveness.
5. **Read closest existing pages** on our site + B1 + B2 siblings on the B branch.
6. **Plan the write** before touching markdown. H2/H3 outline (vary from SDLT MDR abolition page), meta title, meta description, 10-14 FAQs covering mean-consideration formula + 2025 carve-out + 2026 floor + cross-jurisdictional contrast + reliefs interaction (group, partnership, charity), inline aside CTA placements.
7. **Verify factual claims** per §16.35 + verify-at-write hedge: re-verify 3% floor commencement, 2025 carve-out commencement, mean-consideration formula at write time.
8. **Fetch hero image from Pexels** via `fetch_image_for_post`. Query: "welsh terraced houses" / "wales rental properties".
9. **Write the markdown file** at `Property/web/content/blog/welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition.md`. Full frontmatter required.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks must pass).**
12. **Redirect overlap:** zero current; skip unless re-scan finds one.
13. **Register in `monitored_pages`** via Supabase `_db` helper.
14. **Commit on branch.** Commit BEFORE marking done.
15. **Fill in work-log.**
16. **Mark done** in tracker.
17. **Append flags.**
18. **Log discoveries** — particularly note if 2026 SI is published on legislation.gov.uk by write time; logged as discovery for future verification baseline.
19. **Next page.**

## Session-side watcher pattern

Standard. Persistent false; timeout 1 hour; do NOT block.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug:** `welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition` (no override)
- **Final category:** `incorporation-and-company-structures` (no override; matches portfolio-acquisition placement)
- **H1 chosen:** "Welsh LTT Multiple Dwellings Relief: Mechanics, the 2025 Carve-Out and the 2026 Minimum-Rate Floor"
- **Meta title chosen:** "Welsh LTT MDR: Mechanics, 2025 Carve-Out and 2026 3% Floor" (58 chars)
- **Why these vs other options:** Lead with the live-relief-with-modifications framing (positive Welsh-specific). Avoid "Welsh equivalent of SDLT MDR" or "MDR survives in Wales" mirror-framing.

### Competitor URLs fetched
- gov.wales/multiple-dwellings-relief-land-transaction-tax-overview: DEAD (HTTP 404 at write time per §16.31). Listed as authority in brief; replaced by deeper reading of impact assessment + written statement.
- gov.wales/multiple-dwellings-relief-purchases-residential-property-technical-guidance: DEAD (HTTP 404). Same handling.
- gov.wales/written-statement-amendment-land-transaction-tax-multiple-dwellings-relief: LIVE. Confirmed 1% to 3% floor change announcement 20 January 2026 + statutory basis (2026 Regulations).
- gov.wales 2026 SI integrated impact assessment: LIVE. Confirmed change mechanic, statutory basis (LTTA 2017 Sch 13 + s.30(6)(b)), anti-forestalling rules; commencement date NOT specified in the impact assessment.
- ukpropertyaccountants.co.uk/ltt-multiple-dwellings-relief: DEAD (HTTP 404). Brief seed URL no longer live; §16.31 catch.
- taxaccountant.co.uk/multiple-dwellings-relief-wales: DEAD (HTTP 404). Same handling.
- Searched legislation.gov.uk Welsh SI 2025: no LTT MDR modification SI in the listing visible from the index page. Wave 5 §23.10 drafter hedge accurate: SI commencement cites not yet on legislation.gov.uk at write time.

### Existing-page review
- The brief-listed SDLT MDR abolition page slug (`sdlt-multiple-dwellings-relief-abolition-impact-bulk-buyers-2024-2025`) does NOT exist on site. Closest available cross-link is `sdlt-buy-to-let-rates-surcharge-guide-2025` (covers the 1 June 2024 MDR abolition in context).
- Used `sdlt-six-dwellings-non-residential-election` for the cross-link contrast (Wales has no LTT equivalent).
- Used `incorporating-property-portfolio-uk-2026` for portfolio-incorporation strategic context.
- Used `multi-property-landlord-tax-planning-strategies-5-plus-properties` for portfolio strategic context.
- B1 + B2 siblings on the B branch: referenced as rate-table sources.

### Citations added (external authority)
- LTTA 2017 Sch 13 paragraphs 5 to 9 (MDR mechanic).
- LTTA 2017 s.30(6)(b) (rate-setting authority for the relief modifications).
- LTTA 2017 Schs 7 (partnership relief), 16 (group relief), 19 (charities relief), Sch 2 Part 4 (sub-sale relief).
- Land Transaction Tax (Modification of Multiple Dwellings Relief) (Wales) Regulations 2025 (7 February 2025 carve-out).
- Land Transaction Tax (Modification of Relief for Acquisitions Involving Multiple Dwellings) (Wales) Regulations 2026 (1% to 3% floor uplift).
- Welsh Written Statement 20 January 2026 (announcement).
- Welsh Government 2026 SI integrated impact assessment (worked example + anti-forestalling).
- Finance (No.2) Act 2024 (SDLT MDR abolition contrast).
- FA 2003 s.116(7) (six-dwellings contrast); s.48A (cross-border apportionment).

### Internal links added
- `/blog/landlord-tax-essentials/sdlt-buy-to-let-rates-surcharge-guide-2025` (intro; SDLT-abolition contrast context).
- `/blog/landlord-tax-essentials/sdlt-six-dwellings-non-residential-election` (intro; alternative-route contrast).
- `/blog/incorporation-and-company-structures/incorporating-property-portfolio-uk-2026` (closing block).
- `/blog/portfolio-management/multi-property-landlord-tax-planning-strategies-5-plus-properties` (closing block).

### Inline CTA placements
- Aside 1: after the 2025 subsidiary-dwelling carve-out section.
- Aside 2: after the SDLT-abolition contrast section (cross-border portfolio angle).
- 2 asides total (within 1-3 cap).

### Build attempts
- First build: PASS but meta description 160 (exceeded 158) + body words 2,451 (under 2,800 floor).
- After trim meta description by 7 chars + add 491 words via "Common mistakes" section: meta description 153; body words 2,942; build PASS (444 pages).

### Verification
- FAQ schema count in built HTML matches frontmatter: 14 = 14 ✅
- Em-dashes in markdown: 0 ✅
- Tailwind classes in markdown: 0 ✅
- Meta title length: 58 chars ≤62 ✅
- Meta description length: 153 chars ≤158 ✅
- Internal links resolve: all 4 unique targets exist ✅
- monitored_pages row inserted: id 195 (90-day window) ✅
- Body word count: 2,942 (within 2,800-3,500 target) ✅

### Verify-at-write hedge resolution
- 2026 SI number found on legislation.gov.uk at write time? **NO.** The §23.10 drafter hedge was correct: the Land Transaction Tax (Modification of Relief for Acquisitions Involving Multiple Dwellings) (Wales) Regulations 2026 are not yet on legislation.gov.uk at 2026-05-23. Welsh Government written statement (20 January 2026) confirms the policy change but is "subject to Senedd approval" with no fixed commencement date.
- Citation source actually used in body for the 3% floor cite: Welsh Written Statement 20 January 2026 + 2026 SI integrated impact assessment. The body phrases the commencement as "early 2026" and instructs readers to "verify the exact commencement date against legislation.gov.uk at the time of any transaction." The brief's "13 February 2026" date is NOT asserted on-page as a confirmed fact.

### Flags raised to wave5_site_wide_flags.md
- F-23 FACTUAL: Welsh LTT MDR 2026 SI commencement date not yet confirmed on legislation.gov.uk; B3 cites the Welsh Written Statement (20 January 2026) and the impact assessment as primary, with an instruction to verify the exact commencement date at transaction time. Manager may wish to re-verify post-launch and refine the cite once the SI is published.

### 2-3 sentence summary
B3 anchors the Welsh MDR survival-and-modification story: the relief stays alive under LTTA 2017 Sch 13 while SDLT MDR was abolished by Finance (No.2) Act 2024. The page walks the mean-per-dwelling formula in detail, the 7 February 2025 subsidiary-dwelling carve-out (Welsh 2025 Regulations), the 2026 1% to 3% minimum-rate floor uplift (Welsh 2026 Regulations, commencement TBC per §23.10 drafter hedge and §16.35 verification), three worked Welsh portfolio examples (Davies Holdings Newport / Williams-Hughes Carmarthen / Evans-Thomas Brecon main-with-annexe), and the structural contrast against SDLT MDR abolition + Wales's absence of the six-dwellings non-residential rule. Two competitor URLs and two gov.wales overview URLs dead at write time per §16.31; written statement + impact assessment carried the verification weight.
