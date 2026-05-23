# Wave 6 brief: commercial-property-fixtures-claim-s198-election-purchase-mechanics

**Site:** property
**Bucket:** C (Capital allowances + SBA + FYA — CAA 2001 cluster)
**Session:** C
**Brief type:** Net-new page (no fixtures-election-dedicated page on-site)
**Source markdown path on launch:** `Property/web/content/blog/commercial-property-fixtures-claim-s198-election-purchase-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/commercial-property-fixtures-claim-s198-election-purchase-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `commercial-property-fixtures-claim-s198-election-purchase-mechanics`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** C (Capital allowances + SBA + FYA)
- **Framing differentiator (Stage 2, 2026-05-23):**

> Fixtures-regime depth page — the **acquisition-side mirror** to C2's disposal-side mechanic. Highest-stakes capital-allowances mechanic for any commercial-property buyer: get the s.198 election right at completion or lose the fixtures claim forever. Post-FA 2012 Sch 10 reforms (effective April 2014), CAA 2001 introduces the **pooling requirement at s.187A** (seller must have allocated qualifying fixtures expenditure to a P&M pool BEFORE the sale completes; if seller never pooled, buyer's claim is barred forever, regardless of buyer-side correctness) and the **fixed-value requirement** (buyer + seller must jointly elect under s.198 to fix the disposal value, OR apply for tribunal apportionment under s.563-style determination within **two years of completion**; default failure = buyer's claim denied). The s.198(3) ceiling: elected amount must not exceed the lower of (a) capital expenditure originally treated as incurred by the seller on the fixture, and (b) the actual sale price. The election is typically pinned at £1 (statement of the agreed elected amount + signature + date + parties + property + fixtures schedule) — buyer can then claim full apportioned value via separate capital-allowances valuation report. The page walks the **5-step buyer due-diligence checklist** at acquisition: (1) request fixtures-pooling confirmation from seller's CA history; (2) commission CA valuation report on the fixtures; (3) draft s.198 election joint document; (4) sign within 2 years of completion (strict — no late application route except via tribunal apportionment which is rare and expensive); (5) file with HMRC at next CT return (election is a return-time document, not a separate notification). Two worked acquisitions: (a) clean acquisition of £1.2m commercial unit with £180k of valued fixtures, s.198 election at £1, separate CA valuation report claims £180k against AIA + special-rate pool; (b) failed-DD acquisition of £950k industrial unit where the seller's accountant never pooled the fixtures because the seller never claimed CAs — buyer's £75k potential claim is lost forever, no remedy.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** No cross-bucket dependencies. C6 is the acquisition-side mirror to C2's disposal-side mechanic; both reference s.196 (seller-side Table) and s.198 (joint election) but from opposite perspectives.

**Pool-thinness disclosure:** Standard competitor depth on fixtures. Lean on §25.2 verbatim s.198 walk + the case law anchor (Tower MCashback).

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of the pooling requirement (most competitors mention but few quote s.187A verbatim), 2-year election deadline framing, due-diligence checklist patterns, worked-example completion-table density.

- https://taxscape.deloitte.com/article/capital-allowances-fixtures.aspx — verified live 2026-05-23 (200). Big-4 reference; useful for pooling + fixed-value gate framing.
- https://www.icaew.com/technical/tax/capital-allowances/fixtures — verified live 2026-05-23 (200). Professional body technical reference; good for citation density on ss.187A-200.
- https://www.lovellconsulting.com/news/hmo/ — verified live 2026-05-23 (200). Specialist CA boutique; useful for the practical due-diligence checklist pattern (page is HMO-flavoured but the s.198 election mechanic is generic).
- https://www.uklandlordtax.co.uk/capital-allowances/ — verified live 2026-05-23 (200). Reader-friendly framing.

**Borrowable patterns:** ICAEW citation density is gold. Deloitte's pooling-requirement walkthrough is clean. Lovell's 5-step DD checklist is the closest competitor pattern to C6's differentiator.

---

## GSC data

*Net-new page; primary topical queries expected: "s198 election commercial property", "capital allowances fixtures pooling requirement", "fixtures election deadline 2 years", "buying commercial property capital allowances", "FA 2012 fixtures reforms".*

---

## Closest existing pages (cannibalisation context)

- `capital-allowances-commercial-property-what-can-claim` (category: `landlord-tax-essentials`) — entry-level commercial CA page; C6 deepens with fixtures-election-specific mechanic. Cross-link.
- `integral-features-capital-allowances` — special-rate-pool 6% page; C6 cross-links because integral features are a subset of fixtures (s.33A integral-features list applies; both s.33A and the s.198 election apply at acquisition).
- C1 pillar (forward-link).
- C2 sibling (disposal-side mirror; same branch, forward-link).

**Cannibalisation discipline:**
- C6 owns the acquisition-side fixtures mechanic; C2 owns the disposal side. Mirror-link.
- Do not duplicate the integral features list from `integral-features-capital-allowances`; cite s.33A and link out.

---

## Redirect overlap (on launch)

Stage 1 scan: no slug-token overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory (CAA 2001):**
- s.187A (pooling requirement; introduced by FA 2012 Sch 10): https://www.legislation.gov.uk/ukpga/2001/2/section/187A
- s.196 (fixtures Table; 12-item seller-side disposal value Table): https://www.legislation.gov.uk/ukpga/2001/2/section/196
- s.198 (election to apportion sale price on sale of qualifying interest; s.198(3) ceiling): https://www.legislation.gov.uk/ukpga/2001/2/section/198
- s.33A (integral features list; sub-component of fixtures): https://www.legislation.gov.uk/ukpga/2001/2/section/33A

**Finance Acts:**
- Finance Act 2012 Sch 10 (introduction of pooling + fixed-value requirements for post-April-2014 transactions).

**HMRC manuals:**
- CA26450 (fixed-value requirement): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca26450
- CA22020 (integral features): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca22020
- CA28500 (s.198 election): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca28500

**Case law:**
- *Tower MCashback LLP1 v HMRC* [2011] UKSC 19 — pooling and fixtures-election context (the seminal case on capital allowances claim entitlement).

**Cross-references in house_positions.md:** §25.2 (P&M primary anchor — verbatim s.198(1)-(3) walk + s.21/s.22/s.23 List A/B/C framework), §25.6 (disposal mechanics — companion to acquisition side), §25.10 (do-not-write list: "Buyer can claim allowances on fixtures without a s.198 election" false post-April-2014).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify the 2-year election deadline (s.198 mechanics + tribunal-apportionment exception), the s.198(3) ceiling formula, and the s.187A pooling requirement at write time.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no classes.
- Lead-form role segments emphasise Property developer + Portfolio owner (commercial-property-acquisition readership).

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the pooling-requirement explanation (high-intent: buyer about to complete on commercial property realising the seller may not have pooled)
  - After the 5-step DD checklist (reader ready to commission CA valuation report)
  - Optionally after the failed-DD worked example
- Vary opening; do NOT lead with "When buying commercial property...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- C6 owns acquisition-side; C2 owns disposal-side. Mirror-link.
- Vary worked figures from C2 and C7 (HMO uses different fixtures examples).

### House positions
- §25.2 is primary; verbatim s.198(1)-(3) walk.
- §25.10 do-not-write list — confirm post-April-2014 election requirement framing.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is fixtures-acquisition depth + 5-step DD checklist + failed-DD-loses-forever framing. Write to it.
- Vary H2s from C1, C2, C3.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §25.2 primary; §25.6 + §25.10 adjacent.
2. Claim in tracker.
3. Read brief.
4. Fetch competitor URLs.
5. Read closest existing pages.
6. Plan rewrite/write.
7. Verify factual claims; **per §16.35: re-verify s.198(3) ceiling formula + 2-year election deadline + s.187A pooling requirement**.
8. Fetch Pexels image.
9. Write markdown with full frontmatter.
10. Build.
11. Verify six checks.
12. No middleware edit on launch.
13. Register in `monitored_pages`.
14. Commit (BEFORE marking done; do NOT include tracker).
15. Fill work-log.
16. Mark done.
17. Append flags.
18. Log discoveries.
19. Next page.

## Session-side watcher pattern

Standard.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Why these vs other options:**

### Competitor URLs fetched
- 

### Existing-page review
- 

### Citations added
- 

### Internal links added
- 

### Inline CTA placements
- 

### Build attempts
- 

### Verification
- em-dash count:
- Tailwind utility classes:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### Flags raised to wave6_site_wide_flags.md
- 

### 2-3 sentence summary
