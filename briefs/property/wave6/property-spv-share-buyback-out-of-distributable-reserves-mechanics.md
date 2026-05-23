# Wave 6 brief: property-spv-share-buyback-out-of-distributable-reserves-mechanics

**Site:** property
**Bucket:** A (LtdCo extraction-sequence pillar)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/property-spv-share-buyback-out-of-distributable-reserves-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/property-spv-share-buyback-out-of-distributable-reserves-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `property-spv-share-buyback-out-of-distributable-reserves-mechanics`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** A (LtdCo extraction-sequence pillar)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Share buyback (purchase of own shares, "POS") is a distinct extraction route with no current on-site coverage. **Two routes:** (i) the default income / distribution treatment under ITTOIA 2005 Part 4 Chapter 3 (where the excess of the buyback price over the original subscription price is treated as a distribution and taxed at dividend rates per ITTOIA 2005 s.385 "Person liable" and the wider Chapter 3 framework), and (ii) the capital treatment route under **CTA 2010 s.1033 "Purchase by unquoted trading company of own shares"** which requires the trade-benefit gate at s.1033(2)(a) ("the redemption, repayment or purchase is made wholly or mainly for the purpose of benefiting a trade carried on by the company or any of its 75% subsidiaries"). **STAGE 2 §16.36 NOTE:** the s.1033 trade-benefit gate FAILS for pure-investment property companies by statutory wording — the section title itself is "Purchase by unquoted **trading** company of own shares". Pawson-principle investment-line property SPVs are not trading companies for this purpose; the capital-treatment route is unavailable. This is the page's central depth point. The mechanics walk covers: (a) the CA 2006 Part 18 Chapter 4 procedural mechanics for POS out of distributable reserves (ss.690-708), (b) the failed capital-treatment route for property SPVs, (c) the practical income / distribution treatment outcome, (d) the comparison versus dividend extraction (largely tax-neutral) and versus MVL (forward-link A4). Worked scenarios: clean dividend-treatment POS to extract a retiring co-shareholder; failed capital-treatment claim by a property SPV at HMRC enquiry.

If your reasoning suggests the slug / category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Net-new route. Differentiator is the s.1033(2) trade-benefit failure mode for property SPVs, which competitors typically miss or hand-wave.

---

## Competitor URLs (Stage 2 §16.31 verified 2026-05-23)

- https://www.ukpropertyaccountants.co.uk/share-buyback-implications-for-uk-companies/ — Stage 1 SEED. Returned 404 at Stage 2 verification 2026-05-23; treat as **DEAD**. Session targeted SERP search for replacement at write time.
- https://www.icaew.com/technical/tax/tax-faculty/taxguides — Stage 1 generic; session should target ICAEW's tax-guide series for POS specifically at write time.
- **Replacement candidates for session SERP search at write time:** "purchase of own shares CTA 2010 s.1033 trade benefit test property company"; "POS out of distributable reserves CA 2006 procedure"; "share buyback capital treatment unquoted trading company HMRC clearance".

**Stage 2 verification note:** the property-specific POS competitor pool is thin (most POS content focuses on owner-managed trading businesses, not property SPVs). Adequate authority coverage exists via HMRC CTM17500 (POS contents) and the underlying statute; session should rely more on legislation + HMRC manual citations than on competitor blog outlines.

**Fetch + read + extract instruction (session):** Fetch surviving URLs via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). At write time, run targeted SERP searches for replacement URLs and document choices in the work-log. Cross-check every claim against CTA 2010 ss.1000 (distribution definition) + ss.1033-1043 (POS capital-treatment regime), ITTOIA 2005 Pt 4 Ch 3 (distributions chargeable on individuals), and CA 2006 Pt 18 Ch 4 (POS procedural mechanics).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "share buyback property company", "purchase of own shares property SPV", "CTA 2010 s.1033 trade benefit test", "share buyback capital treatment landlord company".*

---

## Closest existing pages (cannibalisation context)

Stage 1 + Stage 2 reasoned identification (not Jaccard):

1. `extracting-money-from-property-limited-company` (Wave 1 B7) — list-level mention only. A3 deepens the POS-specific mechanic.
2. `substantial-shareholding-exemption-property-companies` (Wave 1 B3) — adjacent exit mechanic (SSE on share disposal). Forward-link A3 ↔ B3 where SSE-exit comparison helps.
3. `corporation-tax-marginal-relief-property-companies` (Wave 1 B4) — interaction with distributable-reserves calculation (CT charged at marginal rates affects retained profit available for POS).
4. Wave 6 A1 (sibling pillar) — A3 sits within A1's six-route framework. Mandatory back-link.
5. Wave 6 A4 (MVL sibling) — A4 is the company-exit alternative to POS; A3 forward-links A4 for the "what if no capital-treatment route works" scenario.

**Cannibalisation discipline:**
- A3 stays at the POS mechanic level. It does NOT re-walk SSE (defer to Wave 1 B3) or MVL (defer to Wave 6 A4).

---

## Redirect overlap (on launch)

Stage 2 scan of `Property/web/src/middleware.ts` for tokens `share-buyback`, `purchase-of-own-shares`, `pos-property-company`, `buyback`: no overlapping legacy slugs. Stage 2 + session may re-scan to confirm.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 5-8 to actually cite. **STAGE 2 §16.36 NOTE:** brief-seed cited "ITTOIA 2005 s.385" as the dividend-treatment authority for POS. Verified at https://www.legislation.gov.uk/ukpga/2005/5/section/385 on 2026-05-23: s.385 title is "Person liable" — the liability-routing section within Chapter 3 (Charge to tax on dividends and other distributions). Use s.385 as the liability anchor; the substantive POS-distribution treatment lives via the CTA 2010 s.1000 distribution definition feeding into ITTOIA 2005 Chapter 3 generally, NOT via s.385 alone.

- [CTA 2010 s.1033 "Purchase by unquoted trading company of own shares"](https://www.legislation.gov.uk/ukpga/2010/4/section/1033) — capital-treatment gateway; s.1033(2)(a) trade-benefit test
- [CTA 2010 ss.1034-1043 (POS conditions framework)](https://www.legislation.gov.uk/ukpga/2010/4/part/23) — Part 23 wider POS regime
- [CTA 2010 s.1000 "Meaning of 'distribution'"](https://www.legislation.gov.uk/ukpga/2010/4/section/1000) — distribution gateway
- [ITTOIA 2005 Part 4 Chapter 3 (Dividends etc. from UK resident companies)](https://www.legislation.gov.uk/ukpga/2005/5/part/4/chapter/3) — individual income-tax framework for dividend-treated POS
- [ITTOIA 2005 s.385 "Person liable"](https://www.legislation.gov.uk/ukpga/2005/5/section/385) — liability anchor
- [CA 2006 s.690 "Power of limited company to purchase own shares"](https://www.legislation.gov.uk/ukpga/2006/46/section/690) — primary CA 2006 authority
- [CA 2006 ss.690-708 (POS procedural mechanics)](https://www.legislation.gov.uk/ukpga/2006/46/part/18) — Part 18 chapters 4-5
- [HMRC CTM17500 (Distributions: purchase of own shares: contents)](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm17500) — chapter index; sub-pages CTM17505-17650 contain the substantive guidance
- [HMRC CTM17505 (Application of distributions legislation to POS)](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm17505) — verify at write time
- [Companies House guidance: filing requirements for POS (form SH03 stamp duty + SH04 / SH06)](https://www.gov.uk/government/publications/buy-back-of-own-shares) — procedural anchor

---

## Universal rules (do not skip)

### §16.35 per-write numeric verification
Verify every figure against current gov.uk at write time:
- 0.5% stamp duty on POS (form SH03), verified at write time.
- Dividend rates 10.75% / 35.75% / 39.35% post-6-April-2026 (per house position §21.4 F-20 correction).
- £500 dividend allowance.
- CGT rates 18% / 24% (TCGA 1992 s.4 as amended) where capital-treatment route is achieved.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Front-load the trade-benefit-test-failure-for-property-SPVs angle.
- Anonymised personas only.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- `<aside><p>headline</p><p>body</p></aside>` styled by global CSS.

### CTA placement guidance (per this page)
- Add 1-2 inline `<aside>` CTAs: after the s.1033 trade-benefit failure framing, after the worked scenarios.
- Vary opening sentence. A3 should open from "buyback looks like an extraction route, but the capital-treatment gateway requires a trading company, and most property SPVs fail that gate at first principles".

### Schema
- FAQs live in frontmatter `faqs:` array. Target 10-12 FAQs.

### Cannibalisation
- Read Wave 1 B7 + Wave 1 B3 + Wave 6 A4 (sibling) before writing.

### CSS in markdown
- Semantic HTML only. No Tailwind utility classes.

### House positions
- §21.5 (CIHC mechanics — pure-investment SPVs caught by s.18N, sibling concept to the s.1033 trading-company gate).
- §22.1 (Pawson investment line — same investment-vs-trading distinction).

### Anti-templating
- A3's natural H2 spine: (1) what POS is and why it's a candidate extraction route, (2) the dividend-treatment default outcome (ITTOIA 2005 Ch 3, taxed at dividend rates), (3) the capital-treatment route (s.1033) and why property SPVs fail the trade-benefit gate, (4) Pawson-principle alignment — the investment-vs-trading line is the same here as for BPR, (5) CA 2006 Pt 18 procedural mechanics (distributable reserves, off-market POS authority, shareholder approval, contract document, SH03 stamping), (6) worked scenario A — dividend-treatment POS for retiring co-shareholder, (7) worked scenario B — failed capital-treatment claim at HMRC enquiry, (8) comparison versus dividend extraction and versus MVL (forward-link A4).
- Vary FAQ phrasing.

### Quality bar
- Word count: 2,800-3,200 body.
- FAQs: 10-12.
- New external authority links: 6-8.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start. §21.5 + §22.1 primary.
2. **Claim the page** in `docs/property/wave6_page_tracker.md`.
3. **Read the brief** (this file). §16.35 mandatory.
4. **Fetch each competitor URL.** 1 dead; remainder via session SERP at write time.
5. **Read the closest existing pages.** Particular care: Wave 1 B3 (SSE alternative) + Wave 6 A4 (sibling MVL).
6. **Plan the rewrite/write.** Trade-benefit-test-failure-as-spine.
7. **Verify factual claims.** §16.35 per-write.
8. **Fetch a hero image from Pexels** via fetch_image_for_post.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks).**
12. **Redirect overlap:** none.
13. **Register in `monitored_pages`.**
14. **Commit on your branch.** Commit BEFORE marking done.
15. **Fill in work-log.**
16. **Mark done.**
17. **Flag** (raise INTERNAL_LINK for Wave 1 B3 to back-link to A3 as the buyback-route comparison; raise INTERNAL_LINK for Wave 6 A4 to back-link as the company-exit alternative).
18. **Discovery log.**
19. **Next page** (A4 follows).

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
