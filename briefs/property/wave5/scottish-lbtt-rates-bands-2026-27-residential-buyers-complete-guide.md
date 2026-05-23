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
