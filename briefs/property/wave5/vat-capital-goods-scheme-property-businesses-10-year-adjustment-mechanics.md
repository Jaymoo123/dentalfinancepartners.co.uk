# Wave 5 brief: vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics

**Site:** property
**Bucket:** A (VAT topical-gap deepening)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** A (VAT topical-gap deepening)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Capital Goods Scheme (CGS) is the **10-year input-tax adjustment regime** for property assets ≥ £250,000 VAT-exclusive (VAT Regulations 1995 reg 112-116). Zero on-site coverage. This page is the canonical CGS depth page: the £250k threshold mechanic, the 10-interval clock starting from the date of first taxable use, the per-interval adjustment formula (initial recovery × (current-interval taxable use % − base-interval taxable use %) ÷ 10), the final-interval clawback on disposal, and the interaction with subsequent OTT changes or revocations. **Distinct from A1 (OTT, the upstream election)** by being the ongoing-adjustment regime that bites OTT-on commercial property. **Distinct from A3 (partial exemption)** by operating on a single specified asset over a fixed 10-interval window, not a portfolio-wide residual-input-tax allocation per period. **Distinct from A7 (pre-registration recovery)** by being the long-tail adjustment, not the entry-point recovery. **CGS is upstream-cited by A1 (mentioned as a downstream consequence of OTT election) and downstream-cited by A4 (mixed-use apportionment must consider CGS implications on the commercial element).**

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** CGS is the operational mechanic that turns an OTT election into a 10-year cash-flow commitment. High-intent commercial-portfolio cohort.

---

## Competitor URLs (Stage 2 §16.31 verified 2026-05-23)

- https://www.taxaccountant.co.uk/vat-the-capital-goods-scheme-for-property-businesses/ — VERIFIED ALIVE 2026-05-23. Comprehensive coverage of CGS for property: asset thresholds, adjustment periods, refurbishment treatment, interaction with OTT. Primary outline reference for the 10-interval mechanic spine.
- https://www.ukpropertyaccountants.co.uk/vat-and-property-dispelling-myths-and-avoiding-common-mistakes/ — VERIFIED ALIVE 2026-05-23. Use for the CGS-myths section (e.g., the common misconception that CGS adjustments stop when use stabilises; in fact each interval is independently tested).
- https://www.taxaccountant.co.uk/vat-on-property-purchases-when-the-seller-opted-to-tax/ — VERIFIED ALIVE 2026-05-23. Use for the CGS-on-acquisition section (buyer of opted property inherits the seller's CGS interval position if it was a TOGC).

**Stage 2 verification note:** all three URLs verified alive 2026-05-23. No replacements needed.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: how each competitor explains the 10-interval clock, the per-interval adjustment formula, refurbishment as a new CGS asset, and the final-interval mechanic. Borrow outline-shape, NOT clause language. Cross-check every adjustment formula against VAT Regulations 1995 reg 115 + HMRC VAT Notice 706/2.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator (capital goods scheme property, CGS adjustment, 10-year VAT adjustment).*

---

## Closest existing pages (cannibalisation context)

Stage 1 + Stage 2 reasoned identification (not Jaccard) against the 6 existing on-site VAT pages + adjacent commercial-property pages:

1. **A1 (forthcoming sibling: `vat-option-to-tax-commercial-property-mechanics-election-revocation`)** — **upstream sibling.** A1 is the OTT election mechanic; CGS is what happens to recoverable input tax over the following 10 intervals once OTT-on. A2 explicitly defers OTT mechanics to A1 and forward-links once both pages ship.

2. `landlord-vat-registration-when-required` (category: `landlord-tax-essentials`) — touches CGS only at the periphery (one mention in the registration-mechanics section). Differentiation: A2 is the CGS-mechanic depth page. Forward-link to existing for registration context only.

3. `togc-vat-property-letting-business` (category: `property-types-and-specialist-tax`) — adjacent. TOGC transfers a CGS asset to the buyer with the historical CGS interval position retained (VAT Regulations 1995 reg 115(11)). A2 has a TOGC-on-CGS section; the existing TOGC page covers the full TOGC mechanic. Cross-link bi-directionally.

4. `domestic-reverse-charge-construction-vat-landlords` (category: `property-types-and-specialist-tax`) — distant. Reverse-charge on construction services. Marginal CGS relevance (reverse-charged construction is still relevant input VAT for CGS purposes). No cross-link.

5. `vat-on-new-builds-residential-property` (category: `property-types-and-specialist-tax`) — distant. CGS does not apply to dwelling-letting assets (since residential is exempt by default and no OTT applies to dwellings). Cross-link only briefly in the dwellings-carve-out section.

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` for the tokens `capital-goods`, `cgs`, `10-year`, `adjustment`, `interval` returned no old-slug redirects that map onto this new slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 5-8 to actually cite. CGS is regulation-led: VAT Regulations 1995 dominates, supplemented by HMRC VAT Notice 706/2 and the VAT Manual Partial Exemption chapter (PE63000+ covers CGS within partial-exemption context).

- [VATA 1994 (Value Added Tax Act 1994), full contents](https://www.legislation.gov.uk/ukpga/1994/23/contents)
- [VAT Regulations 1995 SI 1995/2518](https://www.legislation.gov.uk/uksi/1995/2518/contents)
- [VAT Regulations 1995 reg 112 (CGS application)](https://www.legislation.gov.uk/uksi/1995/2518/regulation/112)
- [VAT Regulations 1995 reg 113 (CGS adjustment period)](https://www.legislation.gov.uk/uksi/1995/2518/regulation/113)
- [VAT Regulations 1995 reg 114 (CGS interval definition)](https://www.legislation.gov.uk/uksi/1995/2518/regulation/114)
- [VAT Regulations 1995 reg 115 (CGS adjustment formula + final interval)](https://www.legislation.gov.uk/uksi/1995/2518/regulation/115)
- [VAT Regulations 1995 reg 116 (CGS records and notifications)](https://www.legislation.gov.uk/uksi/1995/2518/regulation/116)
- [HMRC VAT Notice 706/2 (Capital Goods Scheme)](https://www.gov.uk/government/publications/vat-notice-7062-capital-goods-scheme)
- [HMRC VAT Manual PE63000+ (Partial Exemption Manual — Capital Goods Scheme chapter)](https://www.gov.uk/hmrc-internal-manuals/partial-exemption-guidance)
- [HMRC VAT Manual VATSC chapter on CGS](https://www.gov.uk/hmrc-internal-manuals/vat-supply-and-consideration)

---

## Universal rules (do not skip)

### §16.35 per-write numeric verification
Verify every numeric tax figure (CGS threshold £250,000 VAT-exclusive, 10-interval period, refurbishment-as-new-CGS-asset threshold also £250k, any rate or scheme allowance cited) against current gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named regulations and notices. No vague hedges.
- Anonymised personas only. No real client names. No specific firm / agency / tenant names.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- The `.prose-blog aside` CSS in `Property/web/src/app/globals.css` styles every `<aside>` in markdown with emerald-accent on emerald-50. **You add no classes**, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- Add 1-3 inline `<aside>` CTAs at high-intent moments: after the £250k threshold mechanic section, after the worked 10-interval example, after the final-interval disposal section.
- Avoid: opening with an aside, placing inside a worked example, >3 asides total.
- Vary opening sentence (do NOT mirror A1's opening; A2 should open from the perspective of "VAT recovered today is not VAT kept forever").

### Schema
- FAQs live in frontmatter `faqs:` array. Template auto-emits FAQPage JSON-LD via `buildBlogPostingJsonLd`. **Don't add FAQ schema in body.**
- Target 10-12 FAQs (operational mechanic page; mid-range).

### Cannibalisation
- Read each closest-existing page above before writing. Decide whether yours is the applied/scenario version (link out to the existing pillar) or vice versa.
- Do not duplicate worked numerical examples verbatim across pages.

### CSS in markdown
- Semantic HTML only. No Tailwind utility classes anywhere in body.

### House positions
- **Read `docs/property/house_positions.md` once at the start.** Bucket A (VAT) has no dedicated house position section; the brief is the spine.
- If a competitor source contradicts a house position, the house position wins. Flag in `docs/property/wave5_site_wide_flags.md`.

### Anti-templating
- A2 is the operational mechanic page in a 10-page VAT bucket. H2 outline must be distinct from A1 (OTT election spine) and A3 (partial-exemption allocation spine). A2's natural H2 spine: (1) what CGS is and why it exists, (2) the £250k threshold + qualifying-asset definition, (3) the 10-interval clock, (4) the per-interval adjustment formula, (5) refurbishment as a new CGS asset, (6) disposal during the adjustment period, (7) TOGC interaction, (8) record-keeping, (9) common mistakes.
- Vary FAQ phrasing. Do NOT echo A1's FAQ formulae.

### Quality bar
- Word count: 2,800-3,500 body (operational mechanic; mid-band).
- FAQs: 10-12.
- New external authority links: 5-8.
- Build clean. Six checks pass.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session.
2. **Claim the page** in `docs/property/wave5_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. **Read the brief** (this file). Pay attention to: §16.35 per-write numeric verification, framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml. Decide what is worth extracting.
5. **Read the closest existing pages** on our site. Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it, do not pattern-match A1), meta title (lead with the primary query word order, max 62 chars), meta description (max 158 chars), 10-12 FAQs, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. **§16.35 per-write discipline:** every numeric figure gets a WebFetch verification at write time.
8. **Fetch a hero image from Pexels.** Use fetch_image_for_post. If Pexels returns None, leave image empty.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Full frontmatter required.
10. **Build:** `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title ≤62 chars, meta description ≤158 chars, internal links resolve.
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page.
13. **Register the new page for GSC monitoring:** insert a row into `monitored_pages` via the Supabase _db helper.
14. **Commit on your branch.** Per-page commit (do NOT merge to main). Commit BEFORE marking done in tracker. Do NOT include the tracker in your branch commit.
15. **Fill in the per-page work-log** at the bottom of this brief.
16. **Mark done** in `docs/property/wave5_page_tracker.md` with a 1-line Notes summary.
17. **Append any site-wide flags** to `docs/property/wave5_site_wide_flags.md` (append-only).
18. **Log discoveries** to `docs/property/wave5_discovery_log_session_<X>.md` (append-only).
19. **Next page**, claim ONE more page.

## Session-side watcher pattern

When you append a STATUS open question, spawn a Monitor task watching for STATUS answered. Keep working on another step / another page while you wait. Persistent false; timeout 1 hour.

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
- 

### Existing-page review (from "Closest existing pages")
- 

### Citations added (external authority)
- 

### Internal links added (to our existing pages)
- 

### Inline CTA placements
- 

### Build attempts
- 

### Verification
- FAQ schema count in built HTML matches frontmatter:
- Em-dashes in markdown:
- Tailwind classes in markdown:
- Meta title length:
- Meta description length:
- Internal links resolve:
- monitored_pages row inserted: id
- Body word count:

### §16.35 numeric verification log (every figure cited)
- 

### Flags raised to wave5_site_wide_flags.md
- 

### 2-3 sentence summary
- 
