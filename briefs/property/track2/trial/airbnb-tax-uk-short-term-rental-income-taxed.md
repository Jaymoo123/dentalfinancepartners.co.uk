# Track 2 brief: airbnb-tax-uk-short-term-rental-income-taxed

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file, DEPTH gap dominant)
**Source markdown path:** `Property/web/content/blog/airbnb-tax-uk-short-term-rental-income-taxed.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/airbnb-tax-uk-short-term-rental-income-taxed
**Stage 1 priority:** H (high)
**Stage 1 date:** 2026-05-23
**Stage 2 enrichment date:** 2026-05-23
**Cannibalisation status:** REWRITE (no overlap requiring redirect; significant differentiation from siblings achievable)

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `airbnb-tax-uk-short-term-rental-income-taxed`. The query class "airbnb tax UK" is high-intent and the slug aligns. No redirect proposed.
- **Category:** `property-types-and-specialist-tax` (kept).
- **Gap-mode tag:** `DEPTH` (primary) + `VOICE-FRESHNESS` (secondary, post-FHL-abolition framing needs updating + speculative-rate language needs hedging).
- **"Why this rewrite" angle:** Current page is ~1,100 words on a query class where competitors (taxaccountant.co.uk, ukpropertyaccountants.co.uk, gosimpletax) ship 3,000-4,000 word treatments with worked examples, Scottish licensing depth, 90-day London rule, and TOMS-VAT-on-serviced-accom mechanics. We have NONE of these. Property page treats Airbnb as "BTL with extra steps" when actually the SA-vs-property-rental boundary (Pawson trading-line test), 90-day rule (London), short-term let licensing (Scotland nationwide, Wales selective, England local), and the TOMS VAT interaction are the load-bearing differentiators that drive the query intent. This is a textbook DEPTH gap: same primary query, half the words, half the sections, missing all the niche-mechanic differentiators.

---

## Current page snapshot (Stage 2)

- **Source markdown path:** `Property/web/content/blog/airbnb-tax-uk-short-term-rental-income-taxed.md`
- **Current word count:** ~1,150 (body, excluding frontmatter)
- **Current H2 outline:**
  1. How Airbnb Income is Taxed in the UK (with H3 Property Income vs Trading Income)
  2. Key Tax Rules and Reliefs (with H3 End of FHL Relief + H3 Section 24)
  3. Allowable Expenses and Deductions (with H3 Furniture and Equipment)
  4. Capital Gains Tax on Sale
  5. Record Keeping and Compliance (with H3 MTD)
  6. Ownership Structures and Multiple Properties (with H3 Company vs Personal + H3 Multiple Properties)
  7. Regional, Licensing and VAT Considerations
  8. Future Planning and Conclusion
- **Current meta title:** "Airbnb Tax UK: Short-Term Rental Income Tax Guide 2026" (55 chars; OK length, generic)
- **Current meta description:** "Complete guide to Airbnb tax UK rules. Learn how short-term rental income is taxed, deductions allowed, and compliance requirements for 2026." (138 chars; entirely generic, no specific differentiator hooks)
- **Current FAQs (frontmatter count):** 4 (target 12-14 per universal rules)
- **Current outbound authority links:** 0 to gov.uk / legislation.gov.uk / HMRC manuals. Has 4 internal links (section-24 guide, CGT pillar, MTD page, BTL ltd-co pillar, property-accountant-services page).
- **Schema present:** Y (FAQPage auto-emitted from frontmatter via `buildBlogPostingJsonLd`).
- **Last meaningful edit date:** 2026-04-10 (frontmatter `date`).

---

## GSC angle (last 90 days) (Stage 2 — pending Supabase pull)

**Status:** GSC data not pulled at trial brief time (manager-hand-draft skips Supabase data pull). At Phase 2 sub-agent dispatch, query `gsc_query_data` Supabase for:
- `SELECT query, SUM(impressions), SUM(clicks), AVG(position), SUM(clicks)::float/NULLIF(SUM(impressions),0) AS ctr FROM gsc_query_data WHERE site_key='property' AND page_url ILIKE '%airbnb-tax%' AND date > now() - interval '90 days' GROUP BY query ORDER BY 2 DESC LIMIT 20;`

**Expected GSC signals (reasoning, not verified at trial):**
- Highest-impression query likely "airbnb tax uk" or "tax on airbnb income uk".
- Position likely 8-15 (mid-page-1 to top-page-2 — would be top 3 if depth were there).
- CTR likely <2% — meta description is generic.
- Strong long-tail demand on "do I pay tax on airbnb income uk", "airbnb income tax calculator", "section 24 airbnb".

**At Phase 2 execution time:** verify and populate this section with real numbers. If position is actually top 3 with low CTR, gap-mode shifts to CTR-FAIL primary and DEPTH secondary.

---

## Gap-mode diagnosis (Stage 1 → Stage 2 refined)

**Primary: DEPTH gap.** Competitor depth is 3,000-4,000 words across 10-14 H2s; we're at 1,150 words across 8 H2s. The gap isn't presentation — it's missing content. Specifically:

1. **Serviced accommodation classification (Pawson trading-line test)** — when does an Airbnb operation cross from property income (S105 BPR fails, S24 applies, no SBADR) to trading income (Class 2/4 NIC payable, full trade reliefs available)? The page mentions the distinction in one sentence; competitors walk Pawson 2013 UKUT 050, IHTM25277, 7-indicator fact-pattern checklist (see Wave 2 A5 `serviced-accommodation-bpr-eligibility-pawson-test`).
2. **90-day London rule** — Greater London Authority Act 1999 / Deregulation Act 2015 s.44 limits short-term lets to 90 nights/year without planning permission. Material for any London-host but missing entirely from our page.
3. **Short-term let licensing (Scotland nationwide + Welsh selective + English borough-specific)** — Scotland's mandatory licensing scheme (Civic Government (Scotland) Act 1982 amendment) is live since 1 Oct 2023. Page mentions in 1 sentence; competitors give the full register-or-be-banned mechanic with deductible-cost framing.
4. **TOMS VAT on serviced accommodation** — Tour Operators Margin Scheme applies when Airbnb operator buys-in cleaning/concierge services for re-supply. Sonder UT [2025] case-law shifted the boundary. Existing on-site W1 page `toms-vat-serviced-accommodation` ships 3,038 words on this; our Airbnb page has zero cross-link.
5. **Council tax vs business rates post-Dec 2023** — short-term lets ≥140 days/year actually let now classified for business rates (Small Business Rate Relief applies). Material for SA hosts but missing.
6. **Worked numerical example** — competitors show £30k Airbnb income / £18k expenses / £8k mortgage interest worked through. We have none.
7. **April 2027 22/42/47 rate impact** — page asserts as fact; per §16.22 lesson (Bill-vs-enacted drift caught four times), should be hedged as "announced, pending Finance Act 2026" or rate-locked status confirmed at Phase 2 against `house_positions.md §7`.

**Secondary: VOICE-FRESHNESS.** Page asserts FHL abolition (correct, locked 2025), 22%/42%/47% rates (announced, needs hedging at Stage 2). Replacement Domestic Items Relief framing correct. Section 24 framing correct. Tone is generic-AI; rewrite calibrates to specialist voice (named statute references throughout, named case-law where applicable).

**Load-bearing fix:** depth lift to ~3,200 body words across 11-13 H2s with worked example, Pawson trading-line walkthrough, 90-day London rule, Scottish licensing detail, TOMS VAT cross-link, council tax / business rates post-Dec 2023.

---

## Competitor URLs (Stage 2 — pending live verification)

**For Phase 2 sub-agent / execution session — verify these URLs return 200 before citing:**

1. **taxaccountant.co.uk — short-term lets / Airbnb tax page** — sibling-mining via cached sitemap; expected to ship Pawson + 90-day London + Scottish licensing depth. Borrow: 7-indicator fact pattern. Differentiate: our voice + worked example.
2. **gosimpletax.com — Airbnb tax UK guide** — competitor depth on consumer-friendly framing. Borrow: FAQ structure. Differentiate: our specialist depth on statute references.
3. **ukpropertyaccountants.co.uk — serviced accommodation taxation** — high competitor density in v2 universe. Borrow: SA-vs-property-rental decision framework. Differentiate: post-Sonder UT 2025 + post-FHL-abolition framing.
4. **(Optional 4th)** A Scottish-specialist firm page on short-term let licensing for tax interaction.

**Liveness check:** must be performed at Phase 2 brief enrichment per §16.31 (URLs may be Cloudflare-protected; httpx with proper User-Agent typically resolves).

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** 2026-05-23 (frozen at Stage 0; Wave 5 candidate section refreshes per batch).

| Source | Slug / candidate | Overlap dimension | Resolution |
|---|---|---|---|
| Residual (own page) | airbnb-tax-uk-short-term-rental-income-taxed | self | REWRITE in place |
| Residual | serviced-accommodation-tax-fhl-abolition-april-2025 | FHL abolition mechanics | Differentiate: this page is Airbnb-applied; sibling is FHL-mechanic-applied. Internal link both ways. |
| Residual | serviced-accommodation-vs-buy-to-let-tax-comparison-2026 | SA-vs-BTL decision framework | Differentiate: this page focuses on tax mechanics; sibling is decision-tree comparison. Internal link to sibling. |
| Residual | how-much-tax-holiday-let-property-uk | Holiday let tax calculation | Differentiate: holiday-let is a sibling-niche of short-term; this page Airbnb-platform-applied. Internal link. |
| Residual | holiday-let-tax-calculator-fhl-changes | Calculator-style FHL changes | Differentiate: calculator-shaped; this page is mechanics-shaped. Internal link to calculator. |
| Wave 1 (rewritten/shipped) | toms-vat-serviced-accommodation | TOMS VAT mechanic | Reference; this page cites TOMS in 1-2 sentences + forward-link to Wave 1 page for depth. |
| Wave 2 (shipped) | serviced-accommodation-bpr-eligibility-pawson-test | Pawson trading test for IHT-BPR | Reference; this page cites Pawson for SA-vs-property-rental boundary; sibling is IHT-applied. Forward-link. |
| Wave 4 (shipped) | bpr-pure-btl-pawson-test-why-buy-to-let-fails-investment-line | BPR Pawson on pure BTL | Reference only; this page focuses on Airbnb tax, not BPR. Optional forward-link if context fits. |
| Wave 5 candidate | vat-toms-long-term-stays-hotel-aparthotel-28-day-rule-mechanics | TOMS 28-day rule | NO collision (Wave 5 candidate covers 28-day-rule mechanic; this Airbnb page covers short-stay default). Forward-link possible once W5 A8 ships. |

**Conclusion:** No REDIRECT-PROPOSED needed. Rewrite proceeds as **applied / platform-specific** page; sibling pages cover the mechanics (FHL, TOMS, Pawson, SA-vs-BTL) and this page integrates them with Airbnb-applied framing. Five internal links added at execution time.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page):

- **Same-category siblings (property-types-and-specialist-tax):**
  - `serviced-accommodation-tax-fhl-abolition-april-2025` — FHL-abolition mechanics
  - `serviced-accommodation-vs-buy-to-let-tax-comparison-2026` — SA-vs-BTL framework
  - `holiday-let-tax-calculator-fhl-changes` — calculator
  - `how-much-tax-holiday-let-property-uk` — holiday-let-applied
- **Cross-category:**
  - `claim-mortgage-interest-rental-property-uk-section-24` (rewritten) — Section 24 depth
  - `toms-vat-serviced-accommodation` (Wave 1 C2) — VAT depth
  - `capital-gains-tax-property-complete-guide-uk` (rewritten) — CGT pillar
  - `mtd-itsa-qualifying-income-test-gross-vs-net` (Wave 3 B1) — MTD threshold mechanic
  - `serviced-accommodation-bpr-eligibility-pawson-test` (Wave 2 A5) — Pawson statute test

---

## House-position references (Stage 1)

- **§3 MTD ITSA — landlord applicability** [LOCKED, with §19.x Wave 3-4 extensions LOCKED 2026-05-22]: rewrite must cite the £50k/£30k/£20k schedule (per §19.7 corrected day-triggers + penalty figures 15/30/31 + 3%/3%/10%, not legacy 31/46/91 + 2%/2%/4%).
- **§4 Section 24 — finance cost restriction** [LOCKED]: 20% basic-rate credit framing must be exact; no claim that Airbnb has a different S24 mechanic (it doesn't).
- **§5 CGT on UK residential property (2026/27)** [LOCKED]: 18%/24% rates; £3k AEA; no FHL-BADR fallback.
- **§6 FHL — abolition transition** [LOCKED, 5 April 2025 abolition]: page must reflect abolition + transitional points (existing FHL losses pool, BADR claim window, anti-forestalling).
- **§7 April 2027 property income tax surcharge** [LOCKED — but verify status at execution per §16.22/§16.27 Bill-vs-enacted drift discipline]: 22%/42%/47% rates. If still in Bill form, hedge as "announced, pending Finance Act 2026".

---

## House-position conflict flag (Stage 2)

**Potential conflict surfaced:** Current page asserts 22%/42%/47% as fact (line 38: "From April 2027, a major change takes effect: separate property income tax rates will apply at 22% basic rate, 42% higher rate, and 47% additional rate"). Per §16.22/§16.27 Bill-vs-enacted-Act drift lesson (caught four times across Waves 1-4), any locked house position carrying a "verify before relying" hedge requires session-time gov.uk WebFetch. Execution session MUST verify §7 lock status against legislation.gov.uk at write time and hedge or assert accordingly. Flag to `track2_site_wide_flags.md`: F-1 `STALE_FIGURES` if §7 has shifted between brief drafting (2026-05-23) and execution.

**Other conflicts:** None surfaced.

---

## Authority links worth considering (Stage 2)

Verify all at execution time (per §16.31):

1. ITTOIA 2005 Pt 3 (Property income mechanics): https://www.legislation.gov.uk/ukpga/2005/5/part/3
2. FA 1988 Sch 23 / FA 2024 Sch (FHL abolition statute): verify exact citation at execution.
3. HMRC PIM4101+ (Property Income Manual — UK property businesses): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim4101
4. HMRC BIM85700+ (Furnished Holiday Lettings transitional): https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim85700
5. Deregulation Act 2015 s.44 (90-day London rule): https://www.legislation.gov.uk/ukpga/2015/20/section/44
6. Civic Government (Scotland) Act 1982 + The Civic Government (Scotland) Act 1982 (Licensing of Short-Term Lets) Order 2022: verify at execution.
7. *Pawson (deceased) v HMRC* [2013] UKUT 050 (TCC) — trading-line test: https://www.bailii.org/uk/cases/UKUT/TCC/2013/050.html
8. HMRC VAT Notice 709/5 (Tour Operators Margin Scheme — TOMS): https://www.gov.uk/government/publications/vat-notice-7095-tour-operators-margin-scheme
9. *Sonder Europe Ltd v HMRC* [2025] UKUT (TCC) — verify exact citation and date at execution.
10. The Non-Domestic Rating (Property in Common Occupation) Regulations 2023 + Council Tax (Information and Council Tax) (England) Regulations 2023 — short-term let 140-day threshold; verify at execution.

(Session selects 5-7 to cite; rest discarded.)

---

## Universal rules (do not skip)

(Same as Wave 5 brief. Voice: no em-dashes, exact figures + named statute, anonymised social proof only, no pricing. Lead-gen: `LeadForm` auto-injected at footer, no duplicate. CSS: semantic HTML only in markdown, `.prose-blog aside` for inline CTAs. FAQs: 10-14 in frontmatter, FAQPage auto-emitted. Cannibalisation: applied/local version since this is platform-applied + multiple mechanic siblings exist.)

---

## 19-step workflow (legacy-rewrite adaptation)

1. Read `docs/property/house_positions.md` §3, §4, §5, §6, §7, §19.x in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting).
3. Read this brief end-to-end.
4. Fetch each competitor URL (httpx with proper User-Agent); verify 200 status; if dead, replace with sibling from competitor_universe_v2 actionable set.
5. Read the current `airbnb-tax-uk-short-term-rental-income-taxed.md` source file in full.
6. Read each closest-existing on-site sibling page listed in §"Closest existing pages" above.
7. Plan the rewrite outline: 11-13 H2s, target 3,000-3,400 body words, 12-14 FAQs.
8. Verify §7 (April 2027 property income tax surcharge) status against legislation.gov.uk at write time; hedge if still Bill-form.
9. **Rewrite markdown at existing path** (NOT new file). Preserve frontmatter slug + canonical + date (update `dateModified` to today). Update metaTitle to lead with the highest-impression GSC query word order (verified at Stage 2 GSC pull) + a high-intent differentiator. metaDescription specific (named licensing + named statute + Section 24 + free-call hook), ≤158 chars.
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Run six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title ≤ 62 chars; meta description ≤ 158 chars; all internal links resolve.
12. Confirm no redirect needed (none — slug kept).
13. Register this page in `monitored_pages` Supabase table for 90-day regression tracking (rewrite_date = today, expected_window_end = today + 90 days).
14. Commit on `main` (no worktree for Track 2 execution): `git commit -m "Track 2A: rewrite airbnb-tax-uk-short-term-rental-income-taxed (DEPTH lift)"`. Per §16.14 / §16.15: tracker edits to main repo file via absolute paths only, NEVER as branch commits.
15. Update `track2_page_tracker.md`: mark ✅ executed.
16. Update `track2_site_wide_flags.md` with any discoveries.
17. Update `TRACK2_PROGRAM.md` §3 heartbeat: "Wave N execution: <slug> shipped + monitored_pages id <N>".
18. Log discoveries (Pawson test internal-link opportunities, council tax / business rates page gaps, etc.) for inter-batch awareness.
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

### Decisions log
- (populated at execution time)

### Competitor URLs fetched + verified
- (populated at execution time)

### Existing-page review notes
- (populated at execution time)

### Citations added (statutes / HMRC / case-law)
- (populated at execution time)

### Internal links added (out / in)
- (populated at execution time)

### Inline `<aside>` CTAs added
- (populated at execution time)

### Build attempts + outcomes
- (populated at execution time)

### Six-check verification
- FAQ schema count = frontmatter length: __
- Em-dash count: __
- Tailwind class count: __
- Meta title length: __ chars
- Meta description length: __ chars
- All internal links resolve: __

### House-position alignment
- §3 MTD: __ aligned / conflict
- §4 Section 24: __
- §5 CGT: __
- §6 FHL abolition: __
- §7 April 2027 surcharge: __ verified locked at write time / hedged

### Flags raised
- (populated at execution time)

### 2-3 sentence summary
- (populated at execution time)
