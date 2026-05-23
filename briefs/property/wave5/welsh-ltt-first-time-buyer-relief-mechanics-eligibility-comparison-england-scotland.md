# Wave 5 brief: welsh-ltt-first-time-buyer-relief-mechanics-eligibility-comparison-england-scotland

**Site:** property
**Bucket:** B (Devolved property tax: Welsh LTT + Scottish LBTT + ADS)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/welsh-ltt-first-time-buyer-relief-mechanics-eligibility-comparison-england-scotland.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/welsh-ltt-first-time-buyer-relief-mechanics-eligibility-comparison-england-scotland

---

## Manager pre-decisions

- **Suggested slug:** `welsh-ltt-first-time-buyer-relief-mechanics-eligibility-comparison-england-scotland`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** B (Devolved property tax — Welsh LTT lane)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The page owns the Welsh FTB position. Welsh LTT has NO separate first-time-buyer relief regime, and that is a deliberate Welsh policy choice from LTT's 2018 introduction, not a gap waiting to be filled. The page anchors on the positive Welsh-specific mechanic that replaces FTB relief: the £225,000 nil-rate band (already the highest nil band in the UK) covers the typical first-purchase price-point for Welsh first-time buyers without needing a separate relief. The page then walks the cross-jurisdictional consequences for landlord clients with first-time-buyer family members across the border: an English FTB family member helping a Welsh first-time-buyer-daughter sees the family's combined planning shift; a Scottish FTB family member sees a different relief regime entirely (B8). Distinct from B1 (main rates) by being the FTB-specific counter-position page (FTB-absence rather than FTB-relief). Worked examples use Welsh price-points around the £225k nil band threshold and cross-border family-planning scenarios.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** B4 closes a search-intent gap (the counter-intuitive "no Welsh FTB relief" position) and serves as the cross-link between B-bucket and the wider SDLT / LBTT FTB cluster. Pairs with B8 (Scottish LBTT FTB relief) for the cross-jurisdictional comparison.

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (`follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"}`), parse with BeautifulSoup (lxml). Extract H2/H3 outline, FAQ density, treatment of the no-FTB-relief position, cross-jurisdictional comparison patterns. Our differentiator is the positive-framing of the £225k nil band as the policy substitute; competitor outlines often frame it as a Welsh disadvantage.

- https://www.ukpropertyaccountants.co.uk/essential-guide-for-first-time-homebuyers-in-scotland — Stage 1 seed; Scottish parallel; useful for the contrast and the comparative angle (B8 will be the Scottish-FTB depth page). Verify live at write time.
- https://www.gov.wales/land-transaction-tax-rates-and-bands — authority confirmation that no separate FTB regime exists; cite at the structural level.
- https://www.alexander-ene.co.uk/land-transaction-tax-wales.htm — verify live at write time; Wales-focused mid-market accountant likely covers the FTB question.
- https://www.gov.uk/stamp-duty-land-tax/residential-property-rates — England FTB relief contrast cite (verify rates against gov.uk at write time per §16.35).
- https://revenue.scot/taxes/land-buildings-transaction-tax/lbtt-legislation-guidance/lbtt3001-exemptions-reliefs/lbtt3010-tax-reliefs/lbtt3048-first-time-buyer-relief — Scottish FTB relief authority page; the comparative anchor.

**§16.31 URL liveness check:** Run httpx fetch above. If a URL returns non-200 or a homepage redirect, replace via reasoning: search the firm's domain + "first time buyer wales" or fall back to gov.wales nil-band confirmations.

**Borrowable patterns:** UK Property Accountants Scottish FTB page provides the structural mirror; our discipline is the Welsh-no-FTB position and the cross-jurisdictional family planning angle.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary queries: "first time buyer wales tax", "welsh ltt ftb", "wales no first time buyer relief", "ltt vs sdlt ftb", "cross-border first time buyer tax".*

---

## Closest existing pages (cannibalisation context)

Zero direct on-site Welsh FTB coverage (because Wales has no FTB relief, very few competitors cover it). Closest existing pages:

- B1 (sibling — Welsh main rates pillar). **Differentiation guidance:** B1 covers the main rates including the £225k nil band that serves the FTB function. B4 covers the FTB-specific positioning explicitly. Cross-link as sibling pair.
- `sdlt-buy-to-let-rates-surcharge-guide-2025` (existing SDLT rates pillar, includes FTB relief mention for England). **Differentiation guidance:** the England SDLT page may mention FTB relief in passing; B4 cross-links to the SDLT rates page for the England FTB depth (or to a Wave 4 or earlier-wave SDLT FTB page if one exists; session to scan at write time).
- B8 (cross-bucket sibling — Scottish LBTT FTB relief). **Differentiation guidance:** B4 is Welsh FTB-absence framing; B8 is Scottish FTB-relief framing. Both pages link to each other for the cross-jurisdictional comparison. §16.32 sequencing not strictly required (no forward-link from one to the other that requires the other to exist first), but cross-link as siblings at session-time or via manager hyperlink at merge.

**Cannibalisation discipline:**
- B4 ↔ B8 (cross-bucket parallel — Welsh FTB-absence vs Scottish FTB-relief): templating risk. **Mitigation:** B4's framing differentiator is the policy-choice + £225k nil band substitute (a positive Welsh mechanic); B8's framing differentiator is the Scottish £175k threshold + no value cap (a positive Scottish mechanic). Different statutes (LTTA 2017 / no FTB provisions vs LBTTA 2013 Sch 4A). Vary H2 outline (B4 leads with the policy-choice explanation; B8 leads with the £175k threshold + £600 maximum saving).
- B4 ↔ B1 (within-bucket sibling): clear boundary — B1 main rates table, B4 FTB-specific positioning.

---

## Redirect overlap (on launch)

Scan of `Property/web/src/middleware.ts` 2026-05-23 shows zero existing redirects for `welsh-ftb-*`, `wales-first-time-buyer-*`, or `ltt-ftb-*` tokens. No repointing required at launch.

---

## Authority links worth considering (session selects 5-8)

- **LTTA 2017 (absence of FTB provisions):** https://www.legislation.gov.uk/anaw/2017/1/contents — primary anchor; the absence is verifiable by the absence of a FTB schedule.
- **gov.wales LTT rates and bands:** https://www.gov.wales/land-transaction-tax-rates-and-bands — confirms no separate FTB relief; the £225k nil band is the standard.
- **Welsh Government policy statement on LTT design** (2017-18): search gov.wales for the pre-implementation policy framework; useful for the deliberate-policy-choice framing.
- **FA 2003 Sch 6ZA** (England FTB relief — for cross-jurisdictional contrast cite): https://www.legislation.gov.uk/ukpga/2003/14/schedule/6ZA — one cross-reference only.
- **LBTT(S)A 2013 Sch 4A** (Scottish FTB relief — for cross-jurisdictional contrast cite): https://www.legislation.gov.uk/asp/2013/11/schedule/4A — one cross-reference only.
- **Revenue Scotland FTB relief guidance:** https://revenue.scot/taxes/land-buildings-transaction-tax/lbtt-legislation-guidance/lbtt3001-exemptions-reliefs/lbtt3010-tax-reliefs/lbtt3048-first-time-buyer-relief — cross-jurisdictional contrast.
- **gov.uk SDLT FTB relief guidance:** https://www.gov.uk/stamp-duty-land-tax/residential-property-rates — cross-jurisdictional contrast.

---

## Universal rules (do not skip)

### §16.35 per-write verification (highest priority for this brief)

**Verify every numeric tax figure (rates, bands, surcharge percentages, thresholds, replacement-window months) against current gov.wales / revenue.scot / legislation.gov.uk at write time per §16.35. Devolved tax tables change annually with each Welsh / Scottish Budget cycle. Do NOT carry figures from the brief without re-verification.** Specifically: re-verify the £225,000 Welsh nil-rate band; the £300k / £500k SDLT FTB relief thresholds (gov.uk); the £175k Scottish FTB threshold + £600 maximum saving (revenue.scot). For B4 the cross-jurisdictional comparison density is the citation bar; all three jurisdiction figures must be re-verified at write time.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. The "no Welsh FTB relief" position is counter-intuitive; explain why (policy choice + nil band substitute), not just "there isn't one".
- Anonymised Welsh personas (Davies, Jones, Evans-Thomas, Williams).

### Lead-gen architecture
- `LeadForm` auto-injected. Never duplicate.
- `<aside>` styled by global CSS. No classes.
- Lead-form role segments: Individual landlord particularly relevant (FTB-family-helping-daughter persona).

### CTA placement guidance (per this page)
- 1-3 inline `<aside>` CTAs. Suggested: after the "Why Wales has no FTB relief" policy section; after the cross-jurisdictional comparison table; after a worked family-planning example.
- Avoid: opening with an aside; placing inside a worked example; >3 asides total.

### Schema
- FAQs in frontmatter `faqs:` array. Don't add in body.
- Target 10-14 FAQs.

### Cannibalisation
- Read B1 + B8 (when on B branch) before writing.
- Do NOT duplicate the rate-table presentation from B1.
- Do NOT duplicate B8's £175k mechanic.

### House positions
- **Read `docs/property/house_positions.md` §23 in full.** §23.1 (Welsh nil band as FTB substitute) + §23.4 (Scottish FTB relief mechanic) + §23.8 (cross-jurisdictional table) + §23.11 (do-not-write list).
- Do NOT write "Wales has first-time-buyer relief" (false). The £225,000 nil band is NOT FTB relief; it's the universal main residential nil band. The distinction matters because if a Welsh buyer owns another dwelling, the higher-rates table applies and the nil band is replaced by the £180k higher-rate-band-0.

### Anti-templating (specific to B4)
- **B4↔B8 cross-bucket templating risk:** B4 is Welsh FTB-absence; B8 is Scottish FTB-relief. Do NOT structure B4 as "the Welsh equivalent of the Scottish FTB relief". The framing differentiator MUST be the deliberate Welsh policy choice + the £225k nil band substitute. Vary H2 outline from B8 (B8 will lead with the £175k threshold + £600 saving + no-value-cap structural points).
- Vary opening (no "Many first-time buyers ask..."). Vary FAQ phrasing.

### Quality bar
- Word count: 2,500-3,000 (focused single-topic page; the FTB-absence story is shorter than the FTB-relief mechanic). Lower end of band acceptable; do not pad.
- FAQs: 10-12 (lower end of range; topic is narrower).
- New external authority links: 5-7 from list above.
- Build clean.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md` §23 in full.** §23.1 + §23.4 + §23.8 + §23.11 mandatory.
2. **Claim the page** in `wave5_page_tracker.md`.
3. **Read the brief** (this file). Pay attention to: framing differentiator, B4↔B8 cross-bucket anti-templating, authority links.
4. **Fetch each competitor URL** with httpx; verify §16.31 liveness.
5. **Read closest existing pages** on our site + B1 + B8 (when B8 is on the B branch).
6. **Plan the write** before touching markdown. H2/H3 outline (vary from B8), meta title, meta description, 10-12 FAQs covering "is there FTB relief in Wales?" + nil band + cross-jurisdictional comparison + family-planning angles + cross-border implications, inline aside CTA placements.
7. **Verify factual claims** per §16.35: re-verify £225k Welsh nil; £300k/£500k SDLT FTB; £175k Scottish FTB + £600 saving. All three jurisdictions at write time.
8. **Fetch hero image from Pexels** via `fetch_image_for_post`. Query: "young couple house keys" / "first home wales".
9. **Write the markdown file** at `Property/web/content/blog/welsh-ltt-first-time-buyer-relief-mechanics-eligibility-comparison-england-scotland.md`. Full frontmatter required.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks must pass).**
12. **Redirect overlap:** zero current; skip.
13. **Register in `monitored_pages`** via Supabase `_db` helper.
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

### Flags raised to wave5_site_wide_flags.md

### 2-3 sentence summary
