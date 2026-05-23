# Wave 5 brief: scottish-lbtt-first-time-buyer-relief-eligibility-mechanics

**Site:** property
**Bucket:** B (Devolved property tax: Welsh LTT + Scottish LBTT + ADS)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/scottish-lbtt-first-time-buyer-relief-eligibility-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/scottish-lbtt-first-time-buyer-relief-eligibility-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `scottish-lbtt-first-time-buyer-relief-eligibility-mechanics`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** B (Devolved property tax — Scottish LBTT lane)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The page owns the Scottish LBTT first-time-buyer relief. The single positive Scottish-specific structural point that anchors it: Scottish FTB relief raises the nil-rate band from £145,000 to **£175,000 with no upper property-value ceiling** — a fundamentally different relief architecture from England's SDLT FTB relief (which is fully withdrawn above £500,000). The page covers the relief under LBTT(S)A 2013 Sch 4A (inserted by the Land and Buildings Transaction Tax (First-Time Buyer Relief) (Scotland) Order 2018), the £600 maximum saving, the never-previously-owned-a-dwelling-anywhere-in-the-world eligibility test, joint-buyer rules (all buyers must be first-time-buyers; one non-FTB joint buyer loses the relief), the interaction with ADS (FTB relief does NOT exempt from ADS if any joint buyer is not a first-time buyer who is buying an additional dwelling), and the relief-loss-on-overseas-prior-ownership trap (a buyer who has owned property abroad cannot claim Scottish FTB relief). Distinct from B6 (rates page) by being the FTB-specific relief. Distinct from B4 (Welsh FTB-absence framing) by being the active Scottish relief with positive mechanic. Worked examples use Scottish FTB price-points around the £175k threshold and edge cases (joint FTB couples, overseas-prior-ownership).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** B8 closes the Scottish FTB depth gap. Pairs with B4 (Welsh FTB-absence) for the cross-jurisdictional comparison; the no-value-cap structural point is the highest-impact framing differentiator.

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (`follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"}`), parse with BeautifulSoup (lxml). Extract H2/H3 outline, FAQ density, treatment of joint-buyer rules, overseas-prior-ownership treatment, ADS interaction.

- https://www.ukpropertyaccountants.co.uk/essential-guide-for-first-time-homebuyers-in-scotland — Stage 1 seed; primary competitor on this topic. In v2 working set.
- https://revenue.scot/taxes/land-buildings-transaction-tax/lbtt-legislation-guidance/lbtt3001-exemptions-reliefs/lbtt3010-tax-reliefs/lbtt3048-first-time-buyer-relief — Revenue Scotland authoritative guidance; verify rate + threshold at write time per §16.35.
- https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property — general LBTT residential page; relief mention in context.
- https://taxaccountant.co.uk/first-time-buyer-relief-scotland — verify live at write time; sibling competitor.
- https://www.thurmonline.co.uk/scottish-first-time-buyer-relief — verify live at write time; Scotland-focused mid-market accountant.

**§16.31 URL liveness check:** Run httpx fetch above. If a URL returns non-200, replace via reasoning: search "scottish first time buyer relief" or fall back to revenue.scot authority pages.

**Borrowable patterns:** UK Property Accountants Scottish FTB page is canonical; verify it covers the no-value-cap structural point (key differentiation from SDLT). Our discipline: lead with the £175k + no-value-cap framing, then eligibility, then joint-buyer rules, then ADS interaction.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary queries: "first time buyer lbtt scotland", "scottish ftb relief", "lbtt first time buyer £175k", "scotland ftb no value cap", "scottish stamp duty first home".*

---

## Closest existing pages (cannibalisation context)

Zero direct on-site Scottish FTB coverage. Closest existing pages:

- B6 (sibling — Scottish main rates page). **Differentiation guidance:** B6 covers main rates including the £145k nil. B8 covers the FTB-specific £175k nil + £600 saving. Cross-link as sibling pair.
- B4 (cross-bucket sibling — Welsh FTB-absence page). **Differentiation guidance:** B4 is Welsh policy choice + £225k nil substitute (no separate FTB regime). B8 is Scottish FTB relief mechanic (active relief, separate Sch 4A statutory provision). Cross-link both ways for the cross-jurisdictional comparison.
- `sdlt-buy-to-let-rates-surcharge-guide-2025` (England rates pillar; may include FTB mention). **Differentiation guidance:** the SDLT page covers England FTB relief (£300k nil up to £500k, fully withdrawn above £500k). B8 contrasts: Scottish FTB nil-band uplift with no upper cap is a different relief architecture.
- B7 (sibling — Scottish ADS). **Differentiation guidance:** ADS does not interact with FTB relief — if any joint buyer is an additional-dwellings purchaser, ADS applies and FTB relief on the main LBTT is lost for that buyer. B8 covers this interaction in a dedicated section.

**Cannibalisation discipline:**
- B8 ↔ B4 (cross-bucket parallel — Scottish FTB-relief vs Welsh FTB-absence): templating risk. **Mitigation:** B8 frames the £175k + no-value-cap positive Scottish mechanic; B4 frames the £225k nil-band substitute as the positive Welsh policy choice. Different statutes, different mechanics, different worked examples. Vary H2 outline (B4 leads with policy-choice explanation; B8 leads with £175k + £600 saving + no-value-cap).
- B8 ↔ B6 / B7 (within-bucket): clear boundary by topic (B6 main rates, B7 ADS, B8 FTB relief).

---

## Redirect overlap (on launch)

Scan of `Property/web/src/middleware.ts` 2026-05-23 shows zero existing redirects for `scottish-ftb-*`, `lbtt-first-time-buyer-*`, or `scotland-first-time-buyer-*` tokens. No repointing required at launch.

---

## Authority links worth considering (session selects 5-8)

- **LBTT(S)A 2013 Sch 4A** (FTB relief statutory framework): https://www.legislation.gov.uk/asp/2013/11/schedule/4A — primary statutory anchor.
- **Land and Buildings Transaction Tax (First-Time Buyer Relief) (Scotland) Order 2018** (the SSI inserting Sch 4A): https://www.legislation.gov.uk/ssi/2018/220/contents/made
- **revenue.scot FTB relief guidance:** https://revenue.scot/taxes/land-buildings-transaction-tax/lbtt-legislation-guidance/lbtt3001-exemptions-reliefs/lbtt3010-tax-reliefs/lbtt3048-first-time-buyer-relief
- **revenue.scot LBTT residential overview:** https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property
- **revenue.scot calculator:** https://revenue.scot/taxes/land-buildings-transaction-tax/lbtt-calculator
- **FA 2003 Sch 6ZA** (England FTB relief — for cross-jurisdictional contrast cite): https://www.legislation.gov.uk/ukpga/2003/14/schedule/6ZA — one cross-reference only.
- **LTTA 2017 (Welsh absence of FTB provisions, for cross-jurisdictional contrast):** https://www.legislation.gov.uk/anaw/2017/1/contents — one cross-reference only.

---

## Universal rules (do not skip)

### §16.35 per-write verification (highest priority for this brief)

**Verify every numeric tax figure (rates, bands, surcharge percentages, thresholds, replacement-window months) against current gov.wales / revenue.scot / legislation.gov.uk at write time per §16.35. Devolved tax tables change annually with each Welsh / Scottish Budget cycle. Do NOT carry figures from the brief without re-verification.** Specifically: re-verify the £175,000 FTB nil-rate band; the £600 maximum saving; the eligibility test (never previously owned a dwelling anywhere in the world); the joint-buyer rule (all buyers must be FTB) against revenue.scot/taxes/land-buildings-transaction-tax/lbtt-legislation-guidance/lbtt3001-exemptions-reliefs/lbtt3010-tax-reliefs/lbtt3048-first-time-buyer-relief.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots.
- Practical, specific.
- Anonymised Scottish FTB personas (Macleod-Scott, Lennon, Stewart). No real client names.

### Lead-gen architecture
- `LeadForm` auto-injected. Never duplicate.
- `<aside>` styled by global CSS. No classes.
- Lead-form role segments: Individual landlord (FTB family-helping cohort applies).

### CTA placement guidance (per this page)
- 1-3 inline `<aside>` CTAs. Suggested: after the £175k + no-value-cap structural point is anchored; after the joint-buyer-rules section; after the ADS-interaction section.
- Avoid: opening with an aside; placing inside a worked example; >3 asides total.

### Schema
- FAQs in frontmatter `faqs:` array. Don't add in body.
- Target 10-14 FAQs.

### Cannibalisation
- Read B4 + B6 + B7 (when on B branch) before writing.
- Do NOT duplicate B4's policy-choice framing or B6's rate-table presentation.

### House positions
- **Read `docs/property/house_positions.md` §23 in full.** §23.4 (Scottish FTB relief mechanic) + §23.5 (ADS interaction) + §23.8 (cross-jurisdictional table) + §23.11 (do-not-write list).
- Do NOT cite the SDLT £300k/£500k FTB framing as the Scottish equivalent (different architecture).

### Anti-templating (specific to B8)

**B8↔B4 cross-bucket templating risk:** B4 is Welsh FTB-absence; B8 is Scottish FTB-relief. Do NOT structure B8 as "the Scottish equivalent of the Welsh policy choice" or as a mirror to B4. The framing differentiator MUST be the positive Scottish mechanic (£175k threshold + no-value-cap + £600 max saving + LBTT(S)A 2013 Sch 4A) with Scottish worked examples. NOT "the Scottish version of the English FTB relief".

- B4 H2 architecture: policy-choice explanation → £225k nil substitute → cross-jurisdictional comparison → family-planning angles.
- B8 H2 architecture should differ: £175k threshold + £600 max saving → eligibility test + worldwide-ownership rule → joint-buyer rules → ADS interaction → cross-jurisdictional comparison.

Vary FAQ phrasing.

### Quality bar
- Word count: 2,500-3,000 (focused single-relief page).
- FAQs: 10-12 (lower end of range; topic is narrower).
- New external authority links: 5-7 from list above.
- Build clean.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md` §23 in full.** §23.4 + §23.5 + §23.8 + §23.11 mandatory.
2. **Claim the page** in `wave5_page_tracker.md`.
3. **Read the brief** (this file). Pay attention to: framing differentiator, B4↔B8 cross-bucket anti-templating, authority links.
4. **Fetch each competitor URL** with httpx; verify §16.31 liveness.
5. **Read closest existing pages** on our site + B4 + B6 + B7 siblings on the B branch.
6. **Plan the write** before touching markdown. H2/H3 outline (MUST vary from B4), meta title, meta description, 10-12 FAQs covering £175k threshold + £600 saving + eligibility + joint-buyer rules + ADS interaction + overseas-prior-ownership + cross-jurisdictional comparison, inline aside CTA placements.
7. **Verify factual claims** per §16.35: re-verify £175k threshold, £600 max saving, eligibility test, joint-buyer rule.
8. **Fetch hero image from Pexels** via `fetch_image_for_post`. Query: "first time buyers scotland" / "young couple keys".
9. **Write the markdown file** at `Property/web/content/blog/scottish-lbtt-first-time-buyer-relief-eligibility-mechanics.md`. Full frontmatter required.
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

### Flags raised to wave5_site_wide_flags.md

### 2-3 sentence summary
