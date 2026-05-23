# Wave 5 brief: scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide

**Site:** property
**Bucket:** B (Devolved property tax: Welsh LTT + Scottish LBTT + ADS)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide

---

## Manager pre-decisions

- **Suggested slug:** `scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** B (Devolved property tax — Scottish LBTT lane)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The page owns the Scottish LBTT main residential rate table for buyers not owning another dwelling. The single positive Scottish-specific structural point that anchors it: LBTT operates under LBTT(S)A 2013, administered by Revenue Scotland with a five-band residential rate structure (0% / 2% / 5% / 10% / 12%) confirmed unchanged for 2026/27 in the Scottish Budget 2026/27. Three positive Scottish mechanics distinguish LBTT from both SDLT and Welsh LTT: the £145,000 nil-rate band (lower than Wales's £225k but higher than England's £125k), the £175,000 first-time-buyer nil-rate band with **no upper value cap** (a different relief architecture from England's £500k withdrawal threshold — depth in B8), and the absence of any non-resident-buyer surcharge. The page covers the basic-rate mechanics, return mechanics (30-day return clock under LBTT(S)A 2013 s.29), the s.10 effective-date test, and the cross-jurisdictional comparison anchored on the £145k nil band. Distinct from B1 (Welsh main rates) by being Scottish-statute (LBTT(S)A 2013 vs LTTA 2017). Distinct from SDLT pages by being Scottish-administered. Worked examples use Scottish purchase prices, Scottish personas (Macleod, McGregor, Stewart, Sinclair), and Scottish geography.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** B6 is the canonical entry-point Scottish-rates page. Pairs with B7 (ADS), B8 (FTB relief), B9 (corporate buyer), B10 (acquisition/bare-trust relief) to anchor the Scottish sub-bucket cluster. Parallel role to B1 in the Welsh sub-bucket.

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (`follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"}`), parse with BeautifulSoup (lxml). Extract H2/H3 outline, FAQ density, band-table presentation, worked examples, cross-jurisdictional comparison patterns.

- https://www.ukpropertyaccountants.co.uk/lbtt-review-in-scotland — Stage 1 seed; in v2 competitor working set. Property-tax-specialist domain. Likely covers main + ADS in one page; our cluster separates them (B6 main, B7 ADS).
- https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property — authority source for rates; verify rate table at write time per §16.35.
- https://www.gov.scot/publications/scottish-budget-2026-2027/pages/4/ — Scottish Budget 2026/27 confirmation that LBTT rates are frozen.
- https://taxaccountant.co.uk/lbtt-rates-and-bands — verify live at write time; sibling competitor.
- https://www.thurmonline.co.uk/lbtt-residential-property-rates — verify live at write time; Scotland-focused mid-market accountant.

**§16.31 URL liveness check:** Run httpx fetch above. If a URL returns non-200 or a homepage redirect, replace via reasoning: search the firm domain + "lbtt rates" or fall back to revenue.scot authority pages.

**Borrowable patterns:** UK Property Accountants LBTT review page is the highest-relevance competitor; verify whether it covers 2026/27 rates or older. Our discipline: lead with the five-band table, walk a worked example, then the cross-jurisdictional comparison anchored on the £145k nil band.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary queries: "lbtt rates 2026", "scottish stamp duty bands", "lbtt residential property", "buying property scotland tax", "scotland house tax rates".*

---

## Closest existing pages (cannibalisation context)

Zero direct on-site Scottish LBTT coverage. Closest existing pages:

- `sdlt-buy-to-let-rates-surcharge-guide-2025` (England rates + surcharge pillar). **Differentiation guidance:** B6 explicitly contrasts the Scottish band structure against the SDLT one. Cross-link as parallel-not-mirror. Reciprocal back-link flagged for the SDLT pillar.
- B1 (cross-bucket sibling — Welsh main rates). **Differentiation guidance:** different statutes (LBTT(S)A 2013 vs LTTA 2017), different rates (5-band Scottish 0/2/5/10/12% vs 5-band Welsh 0/6/7.5/10/12%), different nil bands (£145k Scottish vs £225k Welsh). Cross-link with explicit comparative section.
- `sdlt-non-resident-2-percent-surcharge` (England NR surcharge). **Differentiation guidance:** Scotland has NOT introduced an NR surcharge (§23.4 / §23.11 do-not-write). B6 explicitly notes this.
- `2027-property-income-tax-rates-landlords-uk` (income-tax pillar, UK-wide). **Differentiation guidance:** cross-link as the income-tax counterpart for Scottish landlord taxpayers (note: Scottish income tax is partly devolved under Scotland Act 2016 — flag if the income-tax pillar doesn't currently distinguish; consider this a discovery-log item).

**Cannibalisation discipline:**
- B6 ↔ B1 (cross-bucket parallel — Scottish main rates vs Welsh main rates): templating risk (HIGHEST in this bucket per Stage 1 review). **Mitigation:** B6's framing differentiator is the three positive Scottish-specific structural points (£145k nil band, £175k FTB nil with no value cap, no NR surcharge) with Scottish statute (LBTT(S)A 2013) and Scottish personas. NOT "the Scottish version of LTT" or "Scotland's stamp duty equivalent". Vary H2 outline from B1 (B1 leads with £225k nil + no NR surcharge + no separate FTB; B6 leads with £145k nil + FTB-relief-no-value-cap + no NR surcharge). The FTB framing is the structural divergence point: B1 says "no FTB relief because nil band covers it"; B6 says "FTB relief is the higher nil band with no withdrawal".
- B6 ↔ SDLT rates pillar: cross-jurisdictional differentiation by Scottish statute + Scottish personas + Scottish-Budget timing.
- Do not duplicate worked examples verbatim across B1 / B6 / SDLT pillar. Differ figures, scenarios, personas.

---

## Redirect overlap (on launch)

Scan of `Property/web/src/middleware.ts` 2026-05-23 shows zero existing redirects for `scottish-lbtt-*`, `lbtt-*`, or `scotland-stamp-duty-*` tokens. No repointing required at launch.

---

## Authority links worth considering (session selects 5-8)

- **LBTT(S)A 2013 (primary statute):** https://www.legislation.gov.uk/asp/2013/11/contents — key provisions ss.10 (effective date), 24 (residential rates), 29 (return due 30 days), 59(8) (six-dwellings non-residential rule, mirrors FA 2003 s.116(7)), Sch 2A (ADS for cross-reference to B7), Sch 4A (FTB relief for cross-reference to B8).
- **revenue.scot LBTT residential property:** https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property
- **revenue.scot LBTT calculator:** https://revenue.scot/taxes/land-buildings-transaction-tax/lbtt-calculator
- **gov.scot Scottish Budget 2026/27 (LBTT rates frozen):** https://www.gov.scot/publications/scottish-budget-2026-2027/pages/4/
- **Revenue Scotland LBTT legislation guidance:** https://revenue.scot/taxes/land-buildings-transaction-tax/lbtt-legislation-guidance
- **Revenue Scotland return guidance:** https://revenue.scot/taxes/land-buildings-transaction-tax/how-submit-amend-or-pay-lbtt
- **FA 2003 (for the cross-jurisdictional contrast cite):** https://www.legislation.gov.uk/ukpga/2003/14/contents — one or two cross-references only.
- **LTTA 2017 (for the cross-jurisdictional contrast cite, Welsh comparison):** https://www.legislation.gov.uk/anaw/2017/1/contents — one cross-reference only.

---

## Universal rules (do not skip)

### §16.35 per-write verification (highest priority for this brief)

**Verify every numeric tax figure (rates, bands, surcharge percentages, thresholds, replacement-window months) against current gov.wales / revenue.scot / legislation.gov.uk at write time per §16.35. Devolved tax tables change annually with each Welsh / Scottish Budget cycle. Do NOT carry figures from the brief without re-verification.** Specifically: re-verify the 2026/27 LBTT main residential bands (£145k / £250k / £325k / £750k thresholds; 0% / 2% / 5% / 10% / 12% rates) against revenue.scot/taxes/land-buildings-transaction-tax/residential-property before committing. Cross-check against gov.scot Scottish Budget 2026/27 page to confirm "rates frozen" status. Re-verify the 30-day return clock under LBTT(S)A 2013 s.29.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. Exact figures, named legislation.
- Anonymised Scottish personas (Macleod, McGregor, Stewart, Sinclair, Cameron-Ross). No real client names. No real firm / agency names.

### Lead-gen architecture
- `LeadForm` auto-injected. Never duplicate.
- `<aside>` styled by global CSS. No classes.
- Lead-form role segments: Individual landlord (1-3) / Portfolio owner (4-10) / Large portfolio (10+) / Property developer.

### CTA placement guidance (per this page)
- 1-3 inline `<aside>` CTAs. Suggested: after the rate-table walked example; after the cross-jurisdictional comparison table; at the end of the "Are you a cross-border buyer?" decision-tree section.
- Avoid: opening with an aside; placing inside a worked example; >3 asides total.

### Schema
- FAQs in frontmatter `faqs:` array. Don't add in body.
- Target 10-14 FAQs.

### Cannibalisation
- Read closest-existing SDLT pages + B1 sibling (Welsh) before writing. Explicit "if your purchase is in Scotland, this page; if in England/NI, SDLT page; if in Wales, B1" framing in the opening.
- Do not duplicate worked examples verbatim across B1 / B6 / SDLT pillar.

### House positions
- **Read `docs/property/house_positions.md` §23 in full.** B6 sits on §23.4 (Scottish main rates). Cross-reference §1 (SDLT); §23.1 (Welsh main rates); §23.7 (NI is SDLT not devolved); §23.8 (cross-jurisdictional table); §23.11 (do-not-write).
- Do NOT write "Scottish LBTT has a non-resident surcharge" (false); do NOT cite Welsh figures as the LBTT equivalent.

### Anti-templating (specific to B6)

**B6↔B1 cross-bucket templating risk (HIGHEST in Bucket B per Stage 1):** B1 is Welsh main rates; B6 is Scottish main rates. Same structural-type page (main residential rates for buyers not owning another dwelling) in a parallel-jurisdiction. The framing differentiator MUST be Scottish-statute + Scottish positive points (£145k nil + £175k FTB no-value-cap + no NR surcharge). NOT "the Scottish version of LTT" or "Scotland's parallel to Wales". Different anti-templating moves:

- B1 leads with the £225k nil-band + no separate FTB regime + no NR surcharge (Welsh policy substitutes nil band for FTB relief).
- B6 leads with the £145k nil band + £175k FTB-relief nil + no NR surcharge (Scottish operates a separate FTB nil-band regime).
- B1 worked examples: £350k Welsh BTL + £750k Welsh second-home with cross-reference to SDLT.
- B6 worked examples: £350k Scottish BTL + £750k Scottish second-home + cross-reference to SDLT AND Welsh LTT.
- B1 H2 architecture: rates table → £225k nil structural point → no NR surcharge → no FTB regime → cross-jurisdictional table → filing.
- B6 H2 architecture should differ: e.g., Scottish-statute history (devolution under Scotland Act 2012) → rates table → FTB-no-value-cap structural point → no NR surcharge → cross-jurisdictional table → 30-day return.

Vary FAQ phrasing; do NOT reuse FAQ templates between B1 and B6.

### Quality bar
- Word count: 2,800-3,500 (the rates pillar needs the cross-jurisdictional comparative density, slightly above B1's target).
- FAQs: 10-14.
- New external authority links: 5-8 from list above.
- Build clean.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md` §23 in full.** §23.4 + §23.7 + §23.8 + §23.11 mandatory.
2. **Claim the page** in `wave5_page_tracker.md`.
3. **Read the brief** (this file). Pay attention to: framing differentiator, B1↔B6 anti-templating (HIGHEST templating risk in Bucket B), authority links.
4. **Fetch each competitor URL** with httpx; verify §16.31 liveness.
5. **Read closest existing pages** on our site + B1 sibling on the B branch.
6. **Plan the write** before touching markdown. H2/H3 outline (MUST vary from B1's outline; see anti-templating section), meta title, meta description, 10-14 FAQs covering Scottish main rates + £145k nil + £175k FTB + no NR surcharge + 30-day return + s.10 effective date + cross-jurisdictional traps, inline aside CTA placements.
7. **Verify factual claims** per §16.35: re-verify 2026/27 LBTT bands against revenue.scot + gov.scot Scottish Budget; 30-day return clock.
8. **Fetch hero image from Pexels** via `fetch_image_for_post`. Query: "edinburgh townhouse" / "scotland tenement".
9. **Write the markdown file** at `Property/web/content/blog/scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide.md`. Full frontmatter required.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks must pass).**
12. **Redirect overlap:** zero current; skip.
13. **Register in `monitored_pages`.**
14. **Commit on branch.** Commit BEFORE marking done.
15. **Fill in work-log.**
16. **Mark done** in tracker.
17. **Append flags.**
18. **Log discoveries** — particularly any Scottish income-tax devolution implications surfaced during cross-reference work.
19. **Next page.**

## Session-side watcher pattern

Standard. Persistent false; timeout 1 hour; do NOT block.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug:** `scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide` (no override)
- **Final category:** `landlord-tax-essentials` (no override; matches B1 + B2 + B3 + B4 cluster placement)
- **H1 chosen:** "Scottish LBTT 2026/27 Residential Rates: Bands, Reliefs, and the Devolved Framework"
- **Meta title chosen:** "Scottish LBTT 2026/27 Rates and Bands: Buyer Guide" (50 chars)
- **Why these vs other options:** Scottish-devolution-history lead is the differentiator vs B1's "three things Welsh buyers should know first" lead. The H2 architecture diverges sharply (B1 = positive-points → rates → cross-jurisdictional; B6 = devolution → rates → FTB-no-cap → no-NR → effective-date → worked → comparison-cut-on-architecture → filing → siblings → mistakes). Scottish personas (Macleod Edinburgh, Stewart Aberdeen, Sinclair Glasgow) entirely distinct from B1-B5 Welsh personas. Cross-jurisdictional comparison cut on additional-dwelling-charge architecture (not on simple band thresholds as in B1).

### Competitor URLs fetched
- revenue.scot/taxes/land-buildings-transaction-tax/residential-property: live; rate table verified (0%/2%/5%/10%/12% with £145k nil, in force from 1 Apr 2021).
- gov.scot/publications/scottish-budget-2026-2027/pages/4/: live; explicit confirmation "We will continue to maintain residential rates and bands at their current level for LBTT" + "The ADS will remain at 8 per cent" + FTB relief continues at £175k.
- ukpropertyaccountants.co.uk/lbtt-review-in-scotland: live but content-truncated in fetch; not deep-quoted; no useful outline extracted.

### Existing-page review
- B1 (Welsh main rates): cross-link as parallel devolved-tax pillar; vary H2 architecture sharply per anti-templating mandate.
- `sdlt-buy-to-let-rates-surcharge-guide-2025`: cross-link as England SDLT counterpart.
- `sdlt-non-resident-2-percent-surcharge`: cross-link to clarify the England-only NR surcharge.
- `2027-property-income-tax-rates-landlords-uk`: cross-link with explicit note that Scottish income tax rates differ from rest-of-UK under Scotland Act 2016.

### Citations added (external authority)
- LBTT(S)A 2013 ss.10 (effective date), 24 (residential rates), 29 (30-day return clock), 59(8) (six-dwellings non-residential rule), Schs 2A (ADS), 4A (FTB relief), 5 (MDR).
- Tax Collection and Management (Scotland) Act 2014 (procedural framework + penalties).
- Scotland Act 1998 / Scotland Act 2012 / Scotland Act 2016 (devolution context).
- gov.scot/publications/scottish-budget-2026-2027 (2026/27 rates frozen confirmation).
- revenue.scot operational pages (rate table, calculator, return submission, legislation guidance).
- FA 2003 (cross-jurisdictional contrast cites only).
- LTTA 2017 (Welsh contrast cite).

### Internal links added
- `/blog/landlord-tax-essentials/welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers` (B1 Welsh parallel).
- `/blog/landlord-tax-essentials/sdlt-buy-to-let-rates-surcharge-guide-2025` (SDLT pillar; used 3 times).
- `/blog/non-resident-landlord-tax/sdlt-non-resident-2-percent-surcharge` (NR surcharge clarifier).
- `/blog/landlord-tax-essentials/2027-property-income-tax-rates-landlords-uk` (income tax pillar).

### Inline CTA placements
- Aside 1: after Stewart Aberdeen FTB worked example (SDLT-vs-LBTT calculator mismatch angle).
- Aside 2: after the four-nation comparison table (cross-border / split-household / returning-expatriate angle).
- Total 2 asides, within 1-3 cap.

### Build attempts
- npm run build: PASS (447 static pages, +1 since B5's 446 baseline). Initial body word count of 2,761 was 39 words under the 2,800 brief floor; added one substantive paragraph on the Scottish FTB no-value-cap policy design rationale; re-counted at 2,883 body words.

### Verification
- FAQ schema count in built HTML matches frontmatter: 14 = 14 ✅
- Em-dashes in markdown: 0 ✅
- Tailwind classes in markdown: 0 ✅
- Meta title length: 50 chars ≤62 ✅
- Meta description length: 158 chars ≤158 ✅ (exact cap)
- Internal links resolve: all 4 unique targets exist in `Property/web/content/blog/` ✅
- monitored_pages row inserted: id 212 (90-day window through 2026-08-21) ✅
- Body word count: 2,883 (within 2,800-3,500 brief target after one paragraph addition to clear lower bound) ✅

### Flags raised to wave5_site_wide_flags.md
- None this page. The Scottish income tax devolution under Scotland Act 2016 is noted on-page (in the FAQ cluster and in the Where-this-page-fits closing) but not flagged separately; the income-tax pillar's UK-wide framing is correct as written (the framework is UK-wide, the rates differ for Scottish residents — the page already handles this correctly).

### 2-3 sentence summary
B6 anchors the Scottish LBTT sub-bucket cluster with the 2026/27 rate table (0%/2%/5%/10%/12% with £145k nil, confirmed frozen by Scottish Budget 2026/27), the £175k FTB relief with no upper value cap (depth in B8), the absence of any non-resident surcharge (Scotland aligned with Wales on this), and the 30-day return clock under LBTT(S)A 2013 s.29. Three worked examples use Scottish personas (Macleod Edinburgh £400k, Stewart Aberdeen £200k FTB, Sinclair Glasgow West End £900k) and Scottish geography. Cross-jurisdictional comparison table is cut on additional-dwelling-charge architecture rather than simple band thresholds, surfacing the structural divergence between England's flat-on-stack 5% surcharge, Wales's standalone band table, and Scotland's flat-on-total 8% ADS. Anti-templating against B1 held: B1 leads with "three things Welsh buyers should know first" + universal nil band; B6 leads with Scottish devolution history (Scotland Act 1998/2012/2016) + Scottish-statute architecture + FTB-no-value-cap structural point. All figures verified at write time per §16.35 against revenue.scot + gov.scot Scottish Budget 2026/27.
