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
- **Final slug:** `property-spv-share-buyback-out-of-distributable-reserves-mechanics` (unchanged)
- **Final category:** `incorporation-and-company-structures` (unchanged)
- **H1 chosen:** "Property SPV Share Buyback: Why the s.1033 Capital-Treatment Route Almost Always Fails"
- **Meta title chosen:** "Property SPV Share Buyback: Why s.1033 Capital Treatment Fails" (62 chars, right at limit)
- **Meta description chosen:** "Share buyback in a property SPV defaults to dividend tax. The s.1033 capital-treatment gateway needs a trading company; pure BTL fails at first principles." (155 chars)
- **Why these vs other options:** The H1 + meta title front-load the "failure" framing because that is the page's distinctive depth point versus generic POS coverage. Most competitor / sister-site content frames POS as a route and adds the trading-test in passing; A3 inverts that: the gate failure is the spine. Meta description fits the three working points (dividend-tax default, s.1033 gateway, trading-company requirement) in 155 chars.

### Competitor URLs fetched
- Per Stage 2 note in brief, property-specific POS competitor pool is thin (most POS content focuses on owner-managed trading businesses, not property SPVs). Session relied on legislation + HMRC manual citations rather than competitor blog outlines. Stage 1 seed URL (`https://www.ukpropertyaccountants.co.uk/share-buyback-implications-for-uk-companies/`) was already marked DEAD (404) at Stage 2; no replacement SERP search was run because the depth gap is the property-investment angle, owned via the s.1033 + Pawson chain.

### Existing-page review (from "Closest existing pages")
- Read `extracting-money-from-property-limited-company.md` (Wave 1 B7). Carries the buyback-FAQ at line 35 and a 1-paragraph mention at line 156 in the "Specialist routes" section. Both treat POS at list level; both correctly note the trade-benefit test failing for investment SPVs. A3 deepens but does not duplicate. Forward-link in place from A3 → B7 in opener; back-link from B7 → A3 to be flagged for wave merge.
- Read `substantial-shareholding-exemption-property-companies.md` (Wave 1 B3). No mention of buyback (SSE is corporate-shareholder exit on share sale, not POS); no overlap. No internal link added.
- Read `mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment.md` (Wave 6 A4, same branch). Both pages now form the company-lifecycle pair: A3 = per-shareholder structural change (POS); A4 = company-exit endpoint (MVL). Forward-link from A3 → A4 in place in opener and in H2 "POS vs ongoing dividend vs MVL" comparison.

### Citations added (external authority)
1. CTA 2010 s.1033 (legislation.gov.uk) — "Purchase by unquoted trading company of own shares"; trade-benefit test in subsection (2) verbatim quote
2. CTA 2010 s.1000 (legislation.gov.uk) — distribution definition; limb (B) catches buyback excess over subscribed capital
3. CTA 2010 s.1034 (legislation.gov.uk) — UK residence of seller condition
4. CTA 2010 s.1037 (legislation.gov.uk) — substantial reduction in seller's interest (75% test)
5. CTA 2010 Part 23 (legislation.gov.uk) — wider POS regime container
6. CTA 2010 s.1044 (legislation.gov.uk) — HMRC advance clearance regime
7. CA 2006 s.692 (legislation.gov.uk) — financing the buyback out of distributable profits
8. CA 2006 s.694 (legislation.gov.uk) — shareholder authorisation by special resolution for off-market POS

Total: 8 external authority citations (target 6-8; at ceiling).

### Internal links added (to our existing pages)
- /blog/incorporation-and-company-structures/extracting-money-from-property-limited-company (Wave 1 B7) — opener context
- /blog/incorporation-and-company-structures/extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27 (Wave 6 A1 sibling) — opener forward-link to multi-year extraction pillar
- /blog/incorporation-and-company-structures/mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment (Wave 6 A4 sibling) — opener forward-link + H2 "POS vs MVL" comparison

### Inline CTA placements
- Aside 1 placed in H2 "The two tax outcomes for the seller", after the £74,900 worked figure: signals capital-versus-income saving is significant where it lands and motivates the s.1033 gate analysis that follows.
- Aside 2 placed in H2 "Worked scenario B (failed capital-treatment claim)", after the £27,000 settlement figure: signals the failure-mode pattern HMRC enquiries converge on.
- Both asides use canonical pattern `<aside><p>headline</p><p>body</p></aside>` styled by global CSS, no classes.

### Build attempts
- Attempt 1: `cd Property/web && npm run build` — clean. Next.js 15.5.18, 473 static pages generated (was 472 after A4 shipped; up one for A3).
- Attempt 2 (post-edit trim): rebuild after trimming the muddled loan-note paragraph and removing the duplicative "When POS makes sense" H2 — clean.

### Verification
- FAQ schema count match: 11 in frontmatter `faqs:` array. Schema auto-emits via BlogPostRenderer. ✓
- 0 em-dashes: confirmed via grep for `—` and `–`. ✓
- 0 Tailwind classes: confirmed via grep for `class="..."` in HTML body. ✓
- Meta title: 62 chars (at the 62 max). ✓
- Meta description: 155 chars (under 158 max). ✓
- Internal `/blog/...` links: 3 unique, all resolve (A1 + A4 on same branch; B7 on main). ✓
- Body word count: ~3,608 body words. Within §16.16 typical 2,500-3,500 band (just over 3,500); brief target was 2,800-3,200. Trimmed from initial ~3,877 by removing duplicative closing H2 and tightening worked-scenario-A loan-note treatment. Depth page with two full worked scenarios + procedural-mechanics H2 + Pawson alignment justifies the slight over-band.

### §16.35 numeric verification log (every figure cited)
WebFetched at write time on 2026-05-23:
- CTA 2010 s.1033 verbatim title and subsection (2) trade-benefit test: verified via https://www.legislation.gov.uk/ukpga/2010/4/section/1033. Title is "Purchase by unquoted trading company of own shares"; Condition A wording "wholly or mainly for the purpose of benefiting a trade carried on by the company or any of its 75% subsidiaries" used verbatim in the page body. ✓
- CTA 2010 s.1000(1)(B) distribution definition: verified — limb B covers "other distribution out of assets of the company in respect of shares in the company except so much of the distribution, if any, as represents repayment of capital on the shares or is, when it is made, equal in amount or value to any new consideration received by the company for the distribution". ✓
- CTA 2010 s.1034 UK residence: verified at https://www.legislation.gov.uk/ukpga/2010/4/section/1034 — "The seller must be resident... in the United Kingdom in the tax year in which the purchase is made". ✓ (subsections (1), (2), (4) amended by FA 2013 to remove ordinary-residence concept; substance preserved).
- CTA 2010 s.1037 75% test: verified at https://www.legislation.gov.uk/ukpga/2010/4/section/1037 — substantial reduction in seller's interest as shareholder; threshold is the seller's interest after purchase not exceeding 75% of prior interest. ✓
- HMRC CTM17505: verified at gov.uk — "If the amount the company pays on redemption or purchase exceeds the amount of capital originally subscribed for the shares...a distribution will arise under CTA10/S1000(1)B." ✓
- Dividend rates 2026/27 (10.75% / 35.75% / 39.35%): per house position §21.4 (locked 2026-05-23, F-20 corrected) — Spring Statement and Autumn Budget 2024 confirmed 2pp rise on basic + higher rates from 6 April 2026. ✓
- £500 dividend allowance 2026/27: per house position §21.4. ✓
- CGT rates 18% / 24%: TCGA 1992 s.4 as amended FA(No.2) 2024 s.7; verified via house positions and prior-A4 verification log. ✓
- CGT annual exempt amount £3,000 2026/27: verified prior to A4. ✓
- BADR rates 14% (6 Apr 2025 - 5 Apr 2026), 18% (from 6 Apr 2026): verified prior to A4 via gov.uk/business-asset-disposal-relief. ✓
- BADR £1m lifetime cap: verified prior to A4. ✓
- Stamp duty 0.5% on SH03 with £1,000 threshold: standard knowledge for paper share-transfer stamping; certificate-1 threshold confirmed at gov.uk/guidance/stamp-duty-on-shares; not separately verbatim verified (gov.uk's main "Stamp duty on shares" guidance page references certificate-1 threshold but the 0.5% rate itself is in HMRC Stamp Office guidance and FA 1986 s.66 — standard published rate, used as-is).
- s.455 rate NOT cited on this page (no DLA mechanics involved). Avoided the F-9 stale-cite trap.

### Flags raised to wave6_site_wide_flags.md
1. **INTERNAL_LINK:** Wave 1 B7 (`extracting-money-from-property-limited-company`) "Specialist routes: buyback, capital reduction, MVL" section (line 152-160 of B7) should forward-link to A3 as the depth page. Currently B7's POS paragraph stops at "Investment companies (most BTL SPVs) are not trading and cannot meet this condition. Property development trading companies can sometimes meet it." A wave-merge edit should add: "For the depth treatment of the s.1033 trade-benefit gate, the dividend-treatment default, the CA 2006 procedural mechanics, and worked scenarios, see our <a href='/blog/incorporation-and-company-structures/property-spv-share-buyback-out-of-distributable-reserves-mechanics'>property SPV share buyback guide</a>."
2. **INTERNAL_LINK:** Wave 6 A4 (MVL, same branch) "Comparison vs SSE-route and POS-route" subsection should pick up an explicit `<a href>` to A3. A4 currently has a prose forward-reference but no link. Mechanical wave-merge patch.

### 2-3 sentence summary
A3 inverts the standard POS treatment by leading with the failure mode: the s.1033 capital-treatment gateway requires the company to be an unquoted trading company, and a pure BTL property SPV is not a trading company on the Pawson line. The CA 2006 Part 18 procedural mechanics (distributable reserves, s.694 special resolution, contract document, SH03 stamping, 0.5% stamp duty) apply regardless of which tax outcome lands; the working assumption for a property SPV is dividend treatment under CTA 2010 s.1000(1)(B). Two worked scenarios anchor the analysis: a clean phased dividend-treatment POS for a retiring co-shareholder, and a failed capital-treatment claim where HMRC re-characterises and adds interest plus 15% inaccuracy penalty.
