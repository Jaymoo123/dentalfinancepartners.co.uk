# Wave 5 brief: welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics

**Site:** property
**Bucket:** B (Devolved property tax: Welsh LTT + Scottish LBTT + ADS)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** B (Devolved property tax — Welsh LTT lane)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The page owns the Welsh higher-rates mechanic for buyers acquiring an additional dwelling. The single positive Welsh-specific structural point that anchors it: Welsh higher rates are a **standalone band structure** (5% / 8.5% / 10% / 12.5% / 15% / 17% from 11 December 2024 across 6 bands), NOT a flat surcharge added on top of main rates. This is a different statutory architecture from SDLT's additional dwellings surcharge (5% flat applied on top of standard bands) and from Scottish ADS (8% flat applied to the entire purchase price). The page covers the LTT (Tax Bands and Tax Rates) (Wales) (Amendment) Regulations 2024 1pp uplift across all higher-rate bands, the £40,000 minor-interest threshold (LTTA 2017 Sch 5 paras 8-11 replacement-of-main-residence rule), the 36-month replacement window (harmonised with SDLT and ADS), and Welsh-specific corporate buyer treatment (no equivalent to FA 2003 Sch 4A 15% flat rate). Distinct from B1 (main rates) by being the higher-rates band table specifically. Worked examples use Welsh purchase prices and Welsh personas; do not re-use B1's examples.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** B2 is the second pillar of the Welsh sub-bucket (after B1 main rates). The standalone-band-structure framing is the key anti-templating lever against the SDLT 5% surcharge page and against B7 (Scottish ADS, 8% flat on entire price).

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (`follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"}`), parse with BeautifulSoup (lxml). Extract H2/H3 outline, FAQ density, higher-rate band-table presentation, replacement-of-main-residence treatment, spousal-aggregation handling. Our differentiator is the standalone band-structure architecture; competitor outlines tend to default to "the Welsh equivalent of England's 5% surcharge" which is conceptually wrong.

- https://www.ukpropertyaccountants.co.uk/higher-rates-of-land-transaction-tax-a-complete-guide — Stage 1 seed; in v2 competitor working set. Likely covers higher rates + spouse aggregation in one page.
- https://www.ukpropertyaccountants.co.uk/ltt-higher-rates-for-spouses-minor-children-and-trust-interests — Stage 1 seed; specifically targets spousal-aggregation + minor-children + trust interests. High relevance for the §16.32 cross-bucket coordination with C9.
- https://www.gov.wales/higher-rates-land-transaction-tax-overview — authority source; verify rate table at write time per §16.35.
- https://www.gov.wales/higher-rates-purchases-residential-property-technical-guidance — Welsh Revenue Authority technical guidance, useful for the £40k minor-interest threshold + replacement-of-main-residence mechanics.
- https://www.gov.wales/welsh-government-draft-budget-changes-land-transaction-tax-and-landfill-disposals-tax — 10 December 2024 announcement of the 1pp uplift; useful for the rate-change framing.

**§16.31 URL liveness check:** Run the httpx fetch above before relying on each URL. If a URL returns non-200 or a homepage redirect, replace via reasoning: search for "ukpropertyaccountants higher rates LTT" or fall back to gov.wales technical guidance pages enumerated in §23.10 of house_positions.md.

**Borrowable patterns:** UK Property Accountants spouse-aggregation page is the highest-relevance competitor for the C9 cross-bucket parallel. Read carefully for the framing of the s.836-equivalent spousal-aggregation rule under LTTA 2017. Our discipline: cover the LTTA 2017 mechanic on its own statutory terms; defer to C9 for the SDLT-applied parallel.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "ltt higher rates wales", "welsh stamp duty second home", "buy to let ltt wales", "ltt 4 percent surcharge" (incorrect legacy — page will correct), "wales second home tax rate".*

---

## Closest existing pages (cannibalisation context)

Zero direct on-site Welsh higher-rates coverage. Closest existing pages are SDLT pages (England-focused). Each requires explicit Welsh-vs-England differentiation:

- `sdlt-buy-to-let-rates-surcharge-guide-2025` (England 5% additional dwellings surcharge pillar). **Differentiation guidance:** B2 explicitly contrasts the standalone-band-structure architecture (Wales) against the flat-surcharge architecture (England). Cross-link as the parallel-not-mirror England page. The reciprocal back-link is a flag for the SDLT pillar to add a Welsh-sibling link.
- `sdlt-5-percent-surcharge-refund-claim-process` — actual on-site slug is `sdlt-five-percent-surcharge-refund-claim-process` (verify at write time) — covers England's 5% surcharge refund mechanic on sale of previous main residence within 36 months. **Differentiation guidance:** B2 covers the Welsh equivalent refund mechanism (LTTA 2017 Sch 5 paras 8-11) and notes the 36-month window is now harmonised across all three UK jurisdictions; cross-link as parallel.
- `sdlt-non-resident-2-percent-surcharge` (England-only NR surcharge). **Differentiation guidance:** Wales has NOT introduced an NR surcharge (§23.1 / §23.11 do-not-write). B2 explicitly notes this, with an aside-CTA opportunity for non-UK-resident landlords considering Welsh purchases.
- B1 (sibling within bucket B; Welsh main rates page). **Differentiation guidance:** B1 owns the main-rate band table; B2 owns the higher-rate band table. Cross-link as sibling-pair; both pages reference each other.

**Cannibalisation discipline:**
- B1 ↔ B2 (close within-bucket siblings): clear content boundary — B1 main rates only, B2 higher rates only. Do not duplicate the rate-table presentation. B1 leads with the £225k nil band positive; B2 leads with the standalone-band-structure positive.
- B2 ↔ B7 (cross-bucket parallel: Welsh higher rates vs Scottish ADS): templating risk. **Mitigation:** B2's framing differentiator is the standalone-band-structure (a positive Welsh mechanic with its own statute LTTA 2017 Sch 5); do NOT structure B2 as "the Welsh version of ADS". Vary H2 outline from what B7 will use (B7 will lead with the 8%-flat-on-entire-price mechanic).
- Do not duplicate worked examples verbatim across B2 / B7 / SDLT 5% surcharge page. B2 uses Welsh purchase prices in the £180k-£750k range and Welsh personas (e.g., Davies-Powell, Williams-Hughes).

---

## Redirect overlap (on launch)

Scan of `Property/web/src/middleware.ts` 2026-05-23 shows zero existing redirects for `welsh-ltt-higher-*`, `ltt-second-home-*`, or `wales-additional-dwellings-*` tokens. No repointing required at launch.

---

## Authority links worth considering (session selects 5-8)

- **LTTA 2017 Sch 5** (higher rates schedule): https://www.legislation.gov.uk/anaw/2017/1/schedule/5 — primary statutory anchor for higher rates + replacement-of-main-residence rule (paras 8-11) + spousal aggregation (mirror of SDLT Sch 4ZA para 9, see §23.2).
- **LTTA 2017 s.24:** https://www.legislation.gov.uk/anaw/2017/1/section/24 — rate-setting authority for the Welsh Ministers.
- **LTT (Tax Bands and Tax Rates) (Wales) (Amendment) Regulations 2024** (the 1pp uplift across all higher rates from 11 December 2024): search legislation.gov.uk Welsh SI 2024 for the exact SI number; verify at write time.
- **Welsh higher rates overview (gov.wales):** https://www.gov.wales/higher-rates-land-transaction-tax-overview
- **Welsh Revenue Authority technical guidance on higher rates:** https://www.gov.wales/higher-rates-purchases-residential-property-technical-guidance
- **Welsh draft Budget 2024-25 announcement (10 December 2024):** https://www.gov.wales/welsh-government-draft-budget-changes-land-transaction-tax-and-landfill-disposals-tax
- **Welsh Revenue Authority repayment guidance:** https://www.gov.wales/repay-higher-rates-land-transaction-tax
- **FA 2003 Sch 4ZA** (for the cross-jurisdictional contrast cite, England spousal-aggregation parallel that C9 will deepen): https://www.legislation.gov.uk/ukpga/2003/14/schedule/4ZA — one or two cross-references only.

---

## Universal rules (do not skip)

### §16.35 per-write verification (highest priority for this brief)

**Verify every numeric tax figure (rates, bands, surcharge percentages, thresholds, replacement-window months) against current gov.wales / revenue.scot / legislation.gov.uk at write time per §16.35. Devolved tax tables change annually with each Welsh / Scottish Budget cycle. Do NOT carry figures from the brief without re-verification.** Specifically: re-verify the higher-rate bands (£180k / £250k / £400k / £750k / £1.5m thresholds; 5% / 8.5% / 10% / 12.5% / 15% / 17% rates from 11 December 2024) against gov.wales/higher-rates-land-transaction-tax-overview before committing. Also verify: £40,000 minor-interest threshold; 36-month replacement window; LTT return due 30 days.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. No vague hedges.
- Anonymised Welsh personas only (Davies-Powell, Williams-Hughes, Jones, Evans-Thomas). No real client names. No specific firm / letting-agency names.

### Lead-gen architecture
- `LeadForm` auto-injected at the bottom by `BlogPostRenderer.tsx`. Never duplicate in body.
- `<aside><p>headline</p><p>body</p></aside>` styled by `.prose-blog aside` global CSS. No classes.
- Lead-form role segments: Individual landlord / Portfolio owner / Large portfolio / Property developer.

### CTA placement guidance (per this page)
- 1-3 inline `<aside>` CTAs. Suggested conversion points: after the standalone-band-structure explanation is anchored with a worked example; after the spousal-aggregation FAQ; after the replacement-of-main-residence decision section.
- Avoid: opening with an aside; placing inside a worked example; >3 asides total.

### Schema
- FAQs in frontmatter `faqs:` array. Template auto-emits FAQPage JSON-LD. Don't add FAQ schema in body.
- Target 10-14 FAQs.

### Cannibalisation
- Read closest-existing SDLT pages + B1 sibling before writing. Explicit "B1 covers main rates only; this page covers higher rates" boundary in opening paragraphs.
- Do NOT duplicate worked examples verbatim across B1 / B2 / B7 / SDLT 5% surcharge page.

### House positions
- **Read `docs/property/house_positions.md` §23 in full once at the start.** B2 sits on §23.2 (Welsh higher rates). Cross-reference §1 (SDLT 5% surcharge); §22 (IHT spousal exemption for cross-jurisdictional gift-tax contexts — relevant for the spousal-aggregation framing); §23.8 (cross-jurisdictional table); §23.9 (PTP landlord angle).
- §23.11 do-not-write list applies in full: do NOT state Welsh higher rates are a 4% flat surcharge; do NOT state Wales has a non-resident surcharge; do NOT cite the pre-11-December-2024 higher rates (1pp lower across the band).

### Anti-templating (specific to B2)
- **B2↔B7 templating risk:** B2 is the Welsh higher rates page; B7 will be the Scottish ADS page. Do NOT structure B2 as "the Welsh version of ADS" or as a mirror to B7. The framing differentiator MUST be the standalone-band-structure with its own statute (LTTA 2017 Sch 5) and its own worked examples using Welsh-specific figures. NOT "the Welsh equivalent of the English SDLT 5% surcharge" or "Wales's parallel to Scottish ADS".
- Vary H2 outline from B7 (B7 will lead with 8%-on-entire-price + 36-month replacement window).
- Vary FAQ phrasing. Do NOT reuse FAQ templates from B7.

### Cross-bucket coordination (§16.32 sequencing)

**§16.32 SEQUENCING SIGNAL: B2 ships BEFORE C9 (`second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules`).** C9 is the SDLT-applied spousal-aggregation page. C9 forward-links to this page (B2) for the Welsh-LTT spousal-aggregation parallel. Ensure §16.32 sequencing is respected at session-time: if Session B is on track to ship B2 before Session C reaches C9, no action; if Session C reaches C9 before B2 is on the B branch, include a forward-link placeholder for manager hyperlink at merge.

**Practical implication for B2:** include a section "Spousal aggregation under LTTA 2017" that covers the Welsh mechanic in full (with its own worked example), and note the SDLT-applied parallel via a forward-link to C9 once it ships. The Welsh mechanic mirrors FA 2003 Sch 4ZA para 9 but is set out in LTTA 2017 Sch 5; cite the Welsh statute, not the English one, as primary.

### Quality bar
- Word count: 2,500-3,500. B2 is a depth-on-one-mechanic page, not a pillar.
- FAQs: 10-14.
- New external authority links: 5-7 from list above.
- Build clean.
- All six verifications pass.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md` §23 in full** once at the start of your session. §23.2 + §23.11 mandatory.
2. **Claim the page** in `docs/property/wave5_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, §16.32 cross-bucket sequencing for C9, authority links.
4. **Fetch each competitor URL** with httpx (`follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"}`), parse with BeautifulSoup (lxml). Verify §16.31 liveness.
5. **Read the closest existing pages** on our site + B1 sibling on the B branch. Decide differentiation per the framing.
6. **Plan the write** before touching markdown. Decide: H2/H3 outline (vary from B1, B7, SDLT 5% surcharge page), meta title, meta description, 10-14 FAQs covering higher rates + spousal aggregation + replacement-of-main-residence + corporate buyers + refund mechanism, inline aside CTA placements.
7. **Verify factual claims** per §16.35: re-verify higher-rate bands + thresholds + replacement window + £40k minor-interest threshold at write time.
8. **Fetch a hero image from Pexels** via `fetch_image_for_post`. Query: "wales second home" / "welsh coastal cottage".
9. **Write the markdown file** at `Property/web/content/blog/welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics.md`. Full frontmatter required.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks must pass):** FAQ schema count, em-dashes, Tailwind, meta title, meta description, internal links.
12. **Redirect overlap:** B2 has zero current overlap; skip unless re-scan finds one.
13. **Register in `monitored_pages`** via Supabase `_db` helper.
14. **Commit on your branch.** Per-page commit. Commit BEFORE marking done.
15. **Fill in per-page work-log** at the bottom of this brief.
16. **Mark done** in tracker with 1-line Notes.
17. **Append flags** to `wave5_site_wide_flags.md`.
18. **Log discoveries** to `wave5_discovery_log_session_B.md`.
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

### Existing-page review (from "Closest existing pages")

### Citations added (external authority)

### Internal links added (to our existing pages)

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
