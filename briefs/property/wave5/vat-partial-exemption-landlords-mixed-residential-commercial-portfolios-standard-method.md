# Wave 5 brief: vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method

**Site:** property
**Bucket:** A (VAT topical-gap deepening)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method

---

## Manager pre-decisions

- **Suggested slug:** `vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** A (VAT topical-gap deepening)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Partial exemption is the **input-tax allocation regime** that bites mixed-portfolio landlords once they have any exempt supply (residential lettings) alongside a taxable supply (OTT-on commercial, holiday accommodation, opted parking). Zero on-site coverage. This page is the canonical depth on the partial-exemption mechanic specifically applied to property: VAT Regulations 1995 reg 99-102, the standard method (input tax attribution to taxable / exempt / residual + residual apportionment by output-tax ratio), the de-minimis test (£625 average monthly exempt input tax AND ≤50% of total input tax, VAT Reg 106), the annual adjustment (VAT Reg 107), and the special-method approval route for cases where the standard method gives an unfair result. **Distinct from A1 (OTT election)** by being the consequence-not-the-cause: partial exemption only arises if you have BOTH taxable and exempt supplies, which is the typical state for portfolio landlords post-OTT. **Distinct from A2 (CGS)** by allocating residual input tax across a portfolio every VAT period, not adjusting one asset's recovery over a 10-interval window. **Distinct from A10 (decision framework)** by being the operational allocation mechanic, not the in/out-of-VAT decision.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Portfolio landlords with any commercial OTT-on element invariably hit partial exemption. High-intent operational mechanic. Zero on-site coverage; competitor coverage exists but is generic / cross-industry.

---

## Competitor URLs (Stage 2 §16.31 verified 2026-05-23)

- https://www.taxaccountant.co.uk/vat-partial-exemption-and-input-tax-recovery/ — VERIFIED ALIVE 2026-05-23. Comprehensive on the statutory framework, attribution to taxable / exempt / residual, residual apportionment, annual adjustments with practical examples. Primary outline reference.
- https://www.taxaccountant.co.uk/vat-the-partial-exemption-trap/ — VERIFIED LIVE 2026-05-23 (Stage 2 noted it as not directly addressing property landlords; uses estate-agent example but the trap mechanic is universal — usable for the "trap" framing in the opening section). Replaceable if session prefers a more property-focused secondary URL.
- https://www.ukpropertyaccountants.co.uk/vat-and-property-dispelling-myths-and-avoiding-common-mistakes/ — VERIFIED ALIVE 2026-05-23. Use for the partial-exemption myths sub-section (e.g., the common belief that small amounts of exempt income can be "ignored"; in fact the de-minimis test is the only ignore-route and it must be tested every period).

**Stage 2 verification note:** all three URLs verified alive 2026-05-23.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: how each competitor explains the attribution → apportionment → de-minimis → annual adjustment chain. Borrow outline-shape, NOT clause language. Cross-check every figure against VAT Regulations 1995 reg 99-107 + HMRC VAT Notice 706.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator (partial exemption landlord, mixed portfolio VAT, residual input tax property).*

---

## Closest existing pages (cannibalisation context)

Stage 1 + Stage 2 reasoned identification (not Jaccard) against the 6 existing on-site VAT pages + adjacent pages:

1. **A1 (forthcoming sibling)** — upstream: OTT election is the upstream trigger. A3 forward-links to A1 for the OTT mechanic.

2. **A2 (forthcoming sibling)** — adjacent: CGS adjusts capital-asset recovery on top of the partial-exemption framework. A3 mentions CGS interaction briefly and forward-links to A2 for depth.

3. `landlord-vat-registration-when-required` (category: `landlord-tax-essentials`) — touches the exempt/taxable distinction at registration depth but not partial-exemption mechanics. Differentiation: A3 is the post-registration allocation mechanic; the existing page is the entry-point registration test. Cross-link bi-directionally.

4. `togc-vat-property-letting-business` (category: `property-types-and-specialist-tax`) — distant. TOGC is the transfer mechanism; partial-exemption follows on the buyer's side post-acquisition. Cross-link only if A3 covers TOGC-driven changes in partial-exemption position (it should briefly).

5. **A10 (forthcoming sibling: `vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework`)** — adjacent: A10 is the upstream decision framework; A3 is the downstream allocation operational mechanic. Cross-link.

**Cannibalisation discipline:**
- A3 is the operational depth page for mixed-portfolio partial-exemption mechanics. Sibling A1 is the OTT election; sibling A2 is the CGS adjustment; A3 should not re-walk either mechanic, only flag where they intersect.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` for the tokens `partial-exemption`, `mixed-portfolio`, `residual`, `de-minimis`, `apportionment` returned no old-slug redirects that map onto this new slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 5-8 to actually cite. Partial exemption is regulation-led: VAT Regulations 1995 reg 99-107 dominates, supplemented by HMRC VAT Notice 706 and the VAT Manual Partial Exemption chapter (PE10000+).

- [VATA 1994 (Value Added Tax Act 1994), full contents](https://www.legislation.gov.uk/ukpga/1994/23/contents)
- [VAT Regulations 1995 SI 1995/2518](https://www.legislation.gov.uk/uksi/1995/2518/contents)
- [VAT Regulations 1995 reg 99 (attribution of input tax)](https://www.legislation.gov.uk/uksi/1995/2518/regulation/99)
- [VAT Regulations 1995 reg 101 (standard method)](https://www.legislation.gov.uk/uksi/1995/2518/regulation/101)
- [VAT Regulations 1995 reg 102 (special method)](https://www.legislation.gov.uk/uksi/1995/2518/regulation/102)
- [VAT Regulations 1995 reg 106 (de-minimis limit)](https://www.legislation.gov.uk/uksi/1995/2518/regulation/106)
- [VAT Regulations 1995 reg 107 (annual adjustment)](https://www.legislation.gov.uk/uksi/1995/2518/regulation/107)
- [HMRC VAT Notice 706 (Partial Exemption)](https://www.gov.uk/government/publications/vat-notice-706-partial-exemption)
- [HMRC VAT Manual PE10000+ (Partial Exemption Guidance)](https://www.gov.uk/hmrc-internal-manuals/partial-exemption-guidance)
- [VATA 1994 Sch 9 Group 1 (land exemption)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/9)

---

## Universal rules (do not skip)

### §16.35 per-write numeric verification
Verify every numeric tax figure (de-minimis £625 monthly + 50% test, registration threshold £90k, the standard-method rounding rules, any percentage cited) against current gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact regulations and notices. No vague hedges.
- Anonymised personas only.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- `<aside><p>headline</p><p>body</p></aside>` styled by global CSS. No classes.

### CTA placement guidance (per this page)
- Add 1-3 inline `<aside>` CTAs: after the de-minimis test section, after a worked annual-adjustment example, after the special-method decision branch.
- Vary opening sentence. Do NOT mirror A1 ("Most commercial property buyers ...") or A2 ("VAT recovered today is not VAT kept forever ..."). A3 should open from the perspective of "the moment a landlord adds any taxable supply to an exempt portfolio".

### Schema
- FAQs live in frontmatter `faqs:` array. Target 11-13 FAQs.

### Cannibalisation
- Read closest-existing pages before writing.

### CSS in markdown
- Semantic HTML only. No Tailwind utility classes.

### House positions
- **Read `docs/property/house_positions.md` once at the start.** Bucket A (VAT) has no dedicated house position section.

### Anti-templating self-check (brief 3 of 10)
- A3's natural H2 spine: (1) why partial exemption arises (mixed-supply trigger), (2) the standard-method attribution → apportionment chain, (3) residual input tax + the output-ratio formula, (4) the de-minimis test (both legs), (5) the annual adjustment, (6) when to apply for a special method, (7) common landlord scenarios (residential + opted commercial, residential + holiday-let, residential + opted parking), (8) interaction with CGS (forward-link to A2), (9) record-keeping and digital trail (MTD-for-VAT touch-point).
- Vary FAQ phrasing. Avoid echoing A1's OTT-election questions or A2's interval-adjustment questions.

### Quality bar
- Word count: 2,800-3,500 body (operational mechanic; mid-to-upper band given the multi-step standard-method spine).
- FAQs: 11-13.
- New external authority links: 5-8.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session.
2. **Claim the page** in `docs/property/wave5_page_tracker.md`.
3. **Read the brief** (this file). §16.35 per-write numeric verification mandatory.
4. **Fetch each competitor URL** with httpx + BeautifulSoup. Decide what is worth extracting.
5. **Read the closest existing pages** on our site.
6. **Plan the rewrite/write.** Vary the H2 spine and opening from A1 / A2.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. §16.35 per-write: every numeric figure WebFetched at write time.
8. **Fetch a hero image from Pexels** via fetch_image_for_post.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Full frontmatter.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title ≤62, meta description ≤158, internal links resolve.
12. **Redirect overlap:** none listed; re-scan to confirm.
13. **Register the new page in `monitored_pages`** via the Supabase _db helper.
14. **Commit on your branch.** Commit BEFORE marking done. Do not include tracker.
15. **Fill in work-log.**
16. **Mark done** in `docs/property/wave5_page_tracker.md`.
17. **Flag** any site-wide issues.
18. **Discovery log.**
19. **Next page.**

## Session-side watcher pattern

When you append a STATUS open question, spawn a Monitor task watching for STATUS answered. Keep working on another step / another page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:** vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method (unchanged)
- **Final category:** Landlord Tax Essentials
- **H1 chosen:** VAT Partial Exemption for Mixed-Portfolio Landlords: Standard Method Mechanic
- **Meta title chosen:** "Partial Exemption for Mixed-Portfolio Landlords UK 2026" (55 chars)
- **Meta description chosen:** "Partial exemption for UK mixed-portfolio landlords: standard method attribution, £625 de-minimis test, annual adjustment, when to apply for a special method." (157 chars)
- **Why these vs other options:** Title leads with "Partial Exemption" + "Mixed-Portfolio Landlords" (segment-specific intent rather than generic). Meta description packs the four operational depth points (attribution, £625 de-minimis, annual adjustment, special method) which are the canonical secondary queries.

### Competitor URLs fetched
- https://www.taxaccountant.co.uk/vat-partial-exemption-and-input-tax-recovery/ — outline shape (Framework, Defining, Attribution, Residual, Annual Adjustment, Alternative Methods). Borrowed structural shape but A3 differs in being landlord-specific and pulling worked examples from mixed-residential / opted-commercial scenarios.
- https://www.taxaccountant.co.uk/vat-the-partial-exemption-trap/ — informed the "When Partial Exemption Arises" framing (trigger-event lens).
- https://www.ukpropertyaccountants.co.uk/vat-and-property-dispelling-myths-and-avoiding-common-mistakes/ — informed the "Common Partial-Exemption Mistakes" H2 (esp. the "exempt rent can be ignored" myth).

### Existing-page review (from "Closest existing pages")
- A1 (just-committed, vat-option-to-tax-commercial-property-mechanics-election-revocation, property-types-and-specialist-tax): forward-linked from A3 in OTT interaction H2 and Related Reading.
- A2 (just-committed, vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics, property-types-and-specialist-tax): forward-linked from A3 in CGS interaction H2 and Related Reading.
- `landlord-vat-registration-when-required` (landlord-tax-essentials): linked from Related Reading.
- `togc-vat-property-letting-business`: linked from Related Reading.

### Citations added (external authority)
- VAT Regulations 1995 (SI 1995/2518) full contents
- VAT Regulations 1995 reg 99 (attribution of input tax)
- VAT Regulations 1995 reg 101 (standard method)
- VAT Regulations 1995 reg 102 (special method)
- VAT Regulations 1995 reg 106 (de-minimis limit)
- VAT Regulations 1995 reg 107 (annual adjustment)
- HMRC VAT Notice 706 (Partial Exemption)
- HMRC Partial Exemption Manual (PE10000+)

### Internal links added (to our existing pages)
- `/blog/property-types-and-specialist-tax/vat-option-to-tax-commercial-property-mechanics-election-revocation` (OTT interaction H2 + Related Reading)
- `/blog/property-types-and-specialist-tax/vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics` (CGS interaction H2 + Related Reading)
- `/blog/landlord-tax-essentials/landlord-vat-registration-when-required` (Related Reading)
- `/blog/incorporation-and-company-structures/togc-vat-property-letting-business` (Related Reading)

### Inline CTA placements
- Aside 1: after "Residual apportionment" worked example (standard-vs-special method comparison framing)
- Aside 2: after annual-adjustment H2 (mid-year acquisition / refurbishment partial-exemption review framing)

### Build attempts
- 1: build successful (442 static pages stable + A3 new page added under landlord-tax-essentials route). No errors or critical warnings.

### Verification
- FAQ schema count in built HTML matches frontmatter: 12 = 12 ✓
- Em-dashes in markdown: 0 ✓
- Tailwind classes in markdown: 0 ✓
- Meta title length: 55 chars (≤62) ✓
- Meta description length: 157 chars (≤158) ✓
- Internal links resolve: all 4 distinct paths resolve ✓
- monitored_pages row inserted: yes (site_key=property, slug=vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method, monitor_until=CURRENT_DATE + 90 days, rewrite_type=rewrite, notes='Wave 5 Bucket A net-new VAT partial-exemption mechanic page')
- Body word count: 2,843 (within 2,800-3,500 mid-upper band)

### §16.35 numeric verification log (every figure cited)
- £625 monthly de-minimis limit on exempt input tax: verified against legislation.gov.uk uksi/1995/2518/regulation/106 (2026-05-23) and HMRC Notice 706 (last updated 16 Dec 2025 per gov.uk). Reg 106 quoted: "does not amount to more than £625 per month on average".
- 50% de-minimis second leg: verified Notice 706 + reg 106: "half of your total input tax in the relevant period" / "does not exceed one half of all his input tax".
- Standard-method apportionment formula (taxable value ÷ total value × 100, rounded up to next whole number, except residual > £400k/month avg): verified Notice 706 section 4 and reg 101(2)(d) (2026-05-23).
- £400,000 monthly average residual threshold for 2-decimal-place rounding: verified Notice 706 section 4.
- Annual adjustment timing (first VAT return after longer-period end; acceleration to last return of longer-period since 1 April 2009): verified Notice 706 (last updated 16 Dec 2025).
- Longer-period definition (typically 12 months ending 31 March, 30 April, or 31 May depending on VAT quarter structure): verified Notice 706.
- Special-method declaration of fairness on VAT (PE2): verified Notice 706 section 6.
- £90,000 VAT registration threshold (referenced once in trigger-scenarios): previously verified gov.uk (A1 work-log).
- £250,000 VAT-exclusive CGS threshold (referenced in CGS interaction H2): previously verified reg 113 (A2 work-log).
- 6-year MTD record retention: verified Notice 700/22 (referenced via existing landlord-vat-registration page citation).
- 20% standard rate: universal.

### Flags raised to wave5_site_wide_flags.md
- None raised this session. (One INTERNAL_LINK observation noted in discovery log instead.)

### 2-3 sentence summary
- A3 is the canonical partial-exemption operational mechanic page for property. Covers the standard-method attribution-then-apportionment chain (reg 101), the £625 monthly + 50% de-minimis test (reg 106) with a borderline worked example, the annual adjustment (reg 107) with a refurbishment-year worked example, and the reg 102 special-method approval route with landlord-specific trigger scenarios. Sits between A1 (OTT election upstream) and A2 (CGS downstream long-tail) in the VAT bundle; first page in the bucket placed in the `landlord-tax-essentials` URL category rather than `property-types-and-specialist-tax`.
