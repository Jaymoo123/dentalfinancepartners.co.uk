# Wave 5 brief: scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers

**Site:** property
**Bucket:** B (Devolved property tax: Welsh LTT + Scottish LBTT + ADS)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers

---

## Manager pre-decisions

- **Suggested slug:** `scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** B (Devolved property tax — Scottish LBTT lane)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The page owns the Scottish ADS mechanic. The single positive Scottish-specific structural point that anchors it: ADS is **8% on the entire purchase price** (the highest dwelling-surcharge rate in the UK as of 2026/27), not a marginal-band surcharge layered on the underlying LBTT bands. The page covers the LBTT(S)A 2013 Sch 2A statutory framework, the 5 December 2024 rate increase from 6% to 8% (Scottish Budget 2025/26), the £40,000 de-minimis (a property below £40k attracts no ADS — but if above £40k, ADS bites on the entire price not just the slice), the 36-month replacement-of-main-residence window (extended from 18 months by the Coronavirus (Scotland) (No.2) Act 2020 and made permanent), joint-buyer aggregation under Sch 2A para 4, and the practical 8% impact on Scottish BTL acquisition economics. Distinct from B2 (Welsh higher rates, standalone band structure) by being a flat-on-total-price surcharge. Distinct from the SDLT 5% additional dwellings surcharge by rate, mechanic (flat-on-total vs flat-on-top-of-bands), and statute. Worked examples use Scottish second-home and BTL prices in the £180k-£500k range to walk the 8% impact in full.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** B7 is high-priority because of the recent 8% rate increase (5 December 2024). Pairs with B2 (Welsh higher rates) and the SDLT 5% surcharge page for the three-jurisdiction comparison. B7 ships BEFORE C9 per §16.32 sequencing.

---

## Verify-at-write hedge (mandatory per §23.10 drafter)

**§23.10 drafter hedge for B7:** Verify ADS rate-step history (3% from 1 April 2016 to 24 January 2019, then 4%, then 6% from 16 December 2022, then 8% from 5 December 2024) SSI cites at write time if rate-history is included in the body. The current 8% rate is confirmed against revenue.scot as of 2026-05-23 (per §23.5). If the rate-history table is included, verify each step's underlying SSI on legislation.gov.uk: the LBTT (Amendment) (Scotland) Act 2016 introduced ADS at 3%; subsequent step changes were by SSI. The 36-month window via the Coronavirus (Scotland) (No.2) Act 2020 is statute-grade and should be cited directly. Worth keeping the rate-history table short (one or two paragraphs) rather than a full year-by-year SSI cite cascade; the historical figures are useful context but the page's centre-of-gravity is the current 8% mechanic.

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (`follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"}`), parse with BeautifulSoup (lxml). Extract H2/H3 outline, FAQ density, ADS-rate-step treatment, replacement-window mechanics, joint-buyer aggregation framing.

- https://www.ukpropertyaccountants.co.uk/limits-on-ads-repayment-ftt-clarifies-disposal-in-replacement-of-main-residence — Stage 1 seed; tribunal-case-led competitor coverage. In v2 working set.
- https://revenue.scot/taxes/land-buildings-transaction-tax/additional-dwelling-supplement-ads — authority source for ADS rates + mechanics; verify rate + threshold at write time per §16.35.
- https://revenue.scot/news-publications/news/scottish-budget-2025-2026-changes-land-buildings — the 5 December 2024 rate increase announcement source.
- https://revenue.scot/taxes/land-buildings-transaction-tax/how-submit-amend-or-pay-lbtt/how-claim-repayment-additional-dwelling-supplement — repayment claim mechanics.
- https://taxaccountant.co.uk/additional-dwelling-supplement-scotland — verify live at write time; sibling competitor.

**§16.31 URL liveness check:** Run httpx fetch above. If a URL returns non-200 or a homepage redirect, replace via reasoning: search "ads scotland 8%" or fall back to revenue.scot authority pages enumerated in §23.10 of house_positions.md.

**Borrowable patterns:** UK Property Accountants tribunal-led framing is high-value for the replacement-of-main-residence + repayment-claim sections; the revenue.scot pages are the primary authority. Our discipline: lead with the 8%-on-entire-price mechanic (the most counter-intuitive point for buyers used to SDLT marginal-band thinking), then the £40k de-minimis, then the replacement window.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary queries: "ads scotland 8 percent", "scottish additional dwelling supplement", "lbtt second home scotland", "ads repayment 36 months", "scottish buy to let surcharge".*

---

## Closest existing pages (cannibalisation context)

Zero direct on-site Scottish ADS coverage. Closest existing pages:

- B6 (sibling — Scottish LBTT main rates page). **Differentiation guidance:** B6 covers the underlying LBTT rates; B7 covers the ADS surcharge that sits on top. Cross-link as sibling pair; B7 references B6 for the LBTT bands the ADS-rated purchaser still pays.
- `sdlt-buy-to-let-rates-surcharge-guide-2025` (England 5% surcharge pillar). **Differentiation guidance:** B7 explicitly contrasts the 8% Scottish ADS against the 5% England surcharge. The cross-link emphasises the structural divergence: Scotland 8% on entire price vs England 5% on top of standard bands.
- `sdlt-five-percent-surcharge-refund-claim-process` (verify actual slug at write time; the SDLT refund-claim page). **Differentiation guidance:** B7 covers the Scottish ADS repayment-on-sale-of-previous-main-residence mechanic (36-month window). Cross-link as the parallel mechanism in the other jurisdiction.
- B2 (cross-bucket sibling — Welsh higher rates page on the B branch). **Differentiation guidance:** different architectures — Wales is standalone band structure; Scotland is flat 8% on entire price. Cross-link as the third corner of the three-jurisdiction comparison.

**Cannibalisation discipline:**
- B7 ↔ B2 (cross-bucket parallel — Scottish ADS vs Welsh higher rates): templating risk per §16.32. **Mitigation:** B7's framing differentiator is the 8%-on-entire-price mechanic + 5 December 2024 rate increase + 36-month replacement window. NOT "the Scottish version of Welsh higher rates" or "Scotland's parallel to England's 5% surcharge". Vary H2 outline from B2 (B2 leads with standalone-band-structure + 1pp uplift Dec 2024; B7 leads with 8%-flat + Dec 2024 rate increase).
- B7 ↔ SDLT surcharge pages: cross-jurisdictional differentiation by Scottish statute (LBTT(S)A 2013 Sch 2A) + Scottish personas + Scottish-Budget timing.
- Do not duplicate worked examples verbatim across B2 / B7 / SDLT surcharge page.

---

## Redirect overlap (on launch)

Scan of `Property/web/src/middleware.ts` 2026-05-23 shows zero existing redirects for `scottish-ads-*`, `additional-dwelling-supplement-*`, or `lbtt-ads-*` tokens. No repointing required at launch.

---

## Authority links worth considering (session selects 5-8)

- **LBTT(S)A 2013 Sch 2A** (ADS statutory framework): https://www.legislation.gov.uk/asp/2013/11/schedule/2A — primary statutory anchor.
- **LBTT (Amendment) (Scotland) Act 2016** (ADS introduction at 3%): https://www.legislation.gov.uk/asp/2016/11/contents
- **Coronavirus (Scotland) (No.2) Act 2020** (extended ADS repayment window from 18 to 36 months): https://www.legislation.gov.uk/asp/2020/10/contents
- **revenue.scot ADS overview:** https://revenue.scot/taxes/land-buildings-transaction-tax/additional-dwelling-supplement-ads
- **revenue.scot ADS repayment claim:** https://revenue.scot/taxes/land-buildings-transaction-tax/how-submit-amend-or-pay-lbtt/how-claim-repayment-additional-dwelling-supplement
- **revenue.scot 2024 Budget rate-change announcement (5 December 2024, 6% → 8%):** https://revenue.scot/news-publications/news/scottish-budget-2025-2026-changes-land-buildings
- **gov.scot Scottish Budget 2025/26:** https://www.gov.scot/publications/scottish-budget-2025-2026
- **FA 2003 Sch 4ZA** (England 5% surcharge — for cross-jurisdictional contrast cite + spousal-aggregation parallel for C9): https://www.legislation.gov.uk/ukpga/2003/14/schedule/4ZA — one or two cross-references only.

---

## Universal rules (do not skip)

### §16.35 per-write verification (highest priority for this brief)

**Verify every numeric tax figure (rates, bands, surcharge percentages, thresholds, replacement-window months) against current gov.wales / revenue.scot / legislation.gov.uk at write time per §16.35. Devolved tax tables change annually with each Welsh / Scottish Budget cycle. Do NOT carry figures from the brief without re-verification.** Specifically: re-verify the 8% ADS rate against revenue.scot before committing. Re-verify the £40,000 de-minimis threshold; the 36-month replacement window; the 5-year repayment claim time limit (12 months for return amendment + extended to 5 years for repayment claim of overpaid tax). Re-verify the rate-history dates (3% / 4% / 6% / 8%) per the verify-at-write hedge above if a rate-history section is included.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots.
- Practical, specific.
- Anonymised Scottish personas (Macleod, McGregor, Stewart, Sinclair, Cameron-Ross). No real client names.

### Lead-gen architecture
- `LeadForm` auto-injected. Never duplicate.
- `<aside>` styled by global CSS. No classes.
- Lead-form role segments: Individual landlord / Portfolio owner / Large portfolio / Property developer.

### CTA placement guidance (per this page)
- 1-3 inline `<aside>` CTAs. Suggested: after the 8%-on-entire-price mechanic is anchored with a worked example; after the cross-jurisdictional comparison; after the repayment-mechanic section.
- Avoid: opening with an aside; placing inside a worked example; >3 asides total.

### Schema
- FAQs in frontmatter `faqs:` array. Don't add in body.
- Target 10-14 FAQs.

### Cannibalisation
- Read B2 + B6 (when on B branch) + SDLT surcharge pages before writing.
- Do NOT duplicate B2's standalone-band-structure worked example or the SDLT 5% surcharge worked example.

### House positions
- **Read `docs/property/house_positions.md` §23 in full.** §23.5 (ADS mechanic) + §22 (IHT spousal exemption for cross-jurisdictional gift-tax contexts where the spousal-aggregation question arises) + §23.8 (cross-jurisdictional table) + §23.11 (do-not-write list).
- §23.11 do-not-write list: do NOT cite ADS as 6%, 4%, or 3% (legacy rates); do NOT cite 18-month replacement window (legacy); do NOT state ADS applies on the slice above £40k (false: applies to entire price where £40k crossed); do NOT state Scotland has a non-resident surcharge.

### Anti-templating (specific to B7)

**B7↔B2 cross-bucket templating risk (per §16.32):** B2 is Welsh higher rates standalone-band structure; B7 is Scottish ADS flat-8%-on-entire-price. Do NOT structure B7 as "the Scottish version of Welsh higher rates" or as a mirror to B2. The framing differentiator MUST be the 8%-flat-on-entire-price mechanic with its own statute (LBTT(S)A 2013 Sch 2A) and its own worked examples (Scottish properties, Scottish personas, 8% calc shown in full not as a comparison to B2's worked example).

- B2 worked example: £280k Welsh second home — higher-rate band-structure walkthrough → bands × rates → total LTT.
- B7 worked example: £280k Scottish second home — 8% × £280,000 = £22,400 ADS alone + standard LBTT on bands above £145k → total LBTT incl ADS.

H2 architecture should differ entirely between B2 and B7.

### Cross-bucket coordination (§16.32 sequencing)

**§16.32 SEQUENCING SIGNAL: B7 ships BEFORE C9 (`second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules`).** C9 is the SDLT-applied spousal-aggregation page. C9 forward-links to this page (B7) for the Scottish-ADS spousal-aggregation parallel under LBTT(S)A 2013 Sch 2A para 4. Ensure §16.32 sequencing is respected at session-time: if Session B is on track to ship B7 before Session C reaches C9, no action; if Session C reaches C9 before B7 is on the B branch, include a forward-link placeholder for manager hyperlink at merge.

**Practical implication for B7:** include a section "Joint-buyer aggregation under Sch 2A para 4" that covers the Scottish mechanic in full (with its own worked example), and note the SDLT-applied parallel via a forward-link to C9 once it ships. The Scottish mechanic mirrors FA 2003 Sch 4ZA para 2(3) (SDLT spousal aggregation) but is set out in LBTT(S)A 2013 Sch 2A; cite the Scottish statute, not the English one, as primary.

### Quality bar
- Word count: 2,800-3,500 (mechanic + worked example + repayment + spousal-aggregation density).
- FAQs: 10-14.
- New external authority links: 5-8 from list above. The LBTT(S)A 2013 Sch 2A + Coronavirus (Scotland) (No.2) Act 2020 + revenue.scot rate-change announcement are the citation density floor.
- Build clean.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md` §23 in full.** §23.5 + §23.8 + §23.11 mandatory; §22 cross-reference for spousal exemption context.
2. **Claim the page** in `wave5_page_tracker.md`.
3. **Read the brief** (this file). Pay attention to: framing differentiator, §16.32 cross-bucket sequencing for C9, verify-at-write hedge for ADS rate-step history, authority links.
4. **Fetch each competitor URL** with httpx; verify §16.31 liveness.
5. **Read closest existing pages** on our site + B2 + B6 siblings on the B branch.
6. **Plan the write** before touching markdown. H2/H3 outline (vary from B2; do NOT mirror B2's structure), meta title, meta description, 10-14 FAQs covering 8% rate + entire-price mechanic + £40k de-minimis + 36-month replacement + spousal aggregation + corporate buyers (interaction with B9) + repayment claim, inline aside CTA placements.
7. **Verify factual claims** per §16.35 + verify-at-write hedge: re-verify 8% rate; £40k de-minimis; 36-month window; rate-step history if included.
8. **Fetch hero image from Pexels** via `fetch_image_for_post`. Query: "scotland country house" / "edinburgh property".
9. **Write the markdown file** at `Property/web/content/blog/scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers.md`. Full frontmatter required.
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

### Verify-at-write hedge resolution
- Rate-history section included? (Y/N)
- If Y, SSI cites for each step (3% / 4% / 6%) verified at write time? (list)

### Flags raised to wave5_site_wide_flags.md

### 2-3 sentence summary
