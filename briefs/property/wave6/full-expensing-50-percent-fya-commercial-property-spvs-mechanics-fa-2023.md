# Wave 6 brief: full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023

**Site:** property
**Bucket:** C (Capital allowances + SBA + FYA — CAA 2001 cluster)
**Session:** C
**Brief type:** Net-new page (supersedes shallow legacy `full-expensing-capital-allowances`)
**Source markdown path on launch:** `Property/web/content/blog/full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023

---

## Manager pre-decisions

- **Suggested slug:** `full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** C (Capital allowances + SBA + FYA)
- **Framing differentiator (Stage 2, 2026-05-23):**

> Full expensing depth page focused on the **property-investor carve-outs**. CAA 2001 s.45S (inserted by Finance (No. 2) Act 2023, effective 1 April 2023) gives 100% main-rate FYA on new + unused plant or machinery; the 50% special-rate FYA companion sits at the adjacent FYA provisions for integral features and long-life assets. Made permanent at Autumn Statement 2023; permanence confirmed Autumn Budget 2024 and reflected in the section as enacted (no sunset clause). **Four critical constraints for property landlords**: (1) **company-only** — s.45S(b) requires "a company within the charge to corporation tax"; sole traders, partnerships, and LLPs are excluded (use AIA instead per C4); (2) **unused and not second-hand** — s.45S(c) bars second-hand plant (so buying a fitted-out unit and claiming full expensing on the existing kit fails; the s.198 election route per C6 is the alternative for buyer-side fixtures); (3) **leased-plant carve-out** under s.46(4)-(4G) — full expensing is barred where the main purpose of acquisition is leasing the plant out (a problem for buy-to-let landlords leasing fixtures to a commercial tenant via a lease that includes the fixtures); **PENDING note: the Autumn Budget 2024 announced extension of full expensing to plant for leasing is subject to commencement appointment order; not in force as of 2026-05-23 per §25.8 — sessions writing on leased-plant FYAs must cite the announcement only and flag the commencement-pending status**; (4) **excluded by s.46 general exclusions** — including expenditure at cessation, cars (separate FYA at s.45D), and the prior-use restrictions at ss.13, 13A, 14. **Disposal clawback under s.61** — disposed FYA-claimed assets trigger disposal-value computation with market value generally applying (event 1 / event 8). Two worked scenarios: (a) developer-trading-co buying £180k of new plant for a refurb pre-sale (qualifies cleanly, 100% s.45S deduction in year of incurring), (b) investor-LtdCo buying a commercial unit with £85k of new integral features (special-rate-pool, qualifies for the 50% FYA companion, leaving £42.5k rolling into the 6% special-rate pool; full expensing s.45S does NOT apply because integral features are special-rate not main-rate).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C5 has an **A↔C seam at A7** (HoldCo intra-group transfer of full-expensed assets). Per cross-bucket coordination notes: **A7 ships FIRST on A-branch; C5 ships AFTER on C-branch, citing A7 for the intra-group transfer mechanic** triggering s.45BB-style carve-outs and CAA 2001 Sch A1 connected-co restrictions. When C5's "intra-group transfer of full-expensed assets" section is drafted, link forward to A7's HoldCo page. If A7 has not yet landed on main at C5 write time, log forward-link as TODO and have manager back-patch at wave merge per §16.32.

**Drift-catch carryover:** The brief-instruction errata in NETNEW_PROGRAM §3 specifically flag that s.45EA is EV charging, s.45O is Freeport/special tax sites, s.45K is designated assisted areas, and s.45S is full expensing for companies. C5 must use s.45S for full expensing; do NOT conflate with the adjacent s.45 sections. The 50% special-rate FYA companion is the FA(No.2)2023 provision that paired with s.45S for special-rate-pool plant — cite the section by its statutory text rather than guessing the section number; confirm at write time on legislation.gov.uk.

**Pool-thinness disclosure:** Competitor coverage of full expensing is volume-heavy but property-investor-light. Most generic FE pages target trading companies (manufacturing). The property-investor angle (leased-plant carve-out + integral-features-not-main-rate + company-only) is C5's defensible differentiator.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of leased-plant carve-out (most omit), company-only constraint framing, integral-features-50%-FYA companion, post-Autumn-Budget-2024 leased-plant extension framing.

- https://www.icaew.com/technical/tax/capital-allowances/full-expensing — verified live 2026-05-23 (200). Professional body technical reference; good for the company-only constraint + leased-plant carve-out framing.
- https://taxscape.deloitte.com/article/full-expensing.aspx — verified live 2026-05-23 (200). Big-4 perspective.
- https://www.lovellconsulting.com/news/full-expensing/ — verified live 2026-05-23 (200). Specialist CA boutique; useful for property-specific framing.
- https://www.lovellconsulting.com/services/full-expensing/ — verified live 2026-05-23 (200). Same firm, services page; useful for the disposal-clawback mechanic and the s.45S vs 50% special-rate-FYA companion distinction.
- https://www.gateley.com/insights/articles/legal-insight/full-expensing-property-investors — verified live 2026-05-23 (200). Law firm property-investor angle.
- https://www.farnellclarke.co.uk/blog/full-expensing-explained/ — verified live 2026-05-23 (200). Mid-market accountant; reader-friendly framing.

**Borrowable patterns:** ICAEW citation density. Lovell's property-investor framing is the closest competitor to C5's differentiator. Gateley's worked-example structure is clean.

---

## GSC data

*Net-new page; primary topical queries expected: "full expensing property", "full expensing landlords", "full expensing leased plant", "full expensing buy to let SPV", "s45S CAA 2001", "full expensing vs AIA". The legacy `full-expensing-capital-allowances` page has limited GSC; C5 is a structural replacement.*

---

## Closest existing pages (cannibalisation context)

- `full-expensing-capital-allowances` (category: `property-types-and-specialist-tax`) — predecessor; C5 supersedes with property-specific carve-outs + post-permanence framing. Recommend post-launch redirect to C5.
- `integral-features-capital-allowances` — special-rate-pool 6% page; C5 cross-links to it for the 50%-FYA companion mechanic on integral features.
- C1 pillar (forward-link to cluster spine).
- C4 (AIA sibling — different vehicle; same branch, forward-link).
- C2 (disposal-side balancing charge — applies to FYA-claimed plant on disposal; same branch, forward-link).

**Cannibalisation discipline:**
- C5 is the new canonical full-expensing page. Recommend post-launch redirect from the legacy page to C5; flag in `wave6_site_wide_flags.md` for manager merge decision.
- Do not duplicate C4's AIA worked figures; mirror-link, not duplicate-detail.
- Do not duplicate C2's general disposal mechanic; C5 covers FYA-specific disposal-value computation only.

---

## Redirect overlap (on launch)

Stage 1 scan: no middleware redirect overlap requiring action on initial C5 launch. Flag for manager merge decision: should `full-expensing-capital-allowances` legacy page be redirected to C5? Add to `wave6_site_wide_flags.md`.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory (CAA 2001):**
- s.39 (FYA gateway; lists the specific FYA provisions including s.45S): https://www.legislation.gov.uk/ukpga/2001/2/section/39
- s.45S (full expensing for companies, 100% main-rate from 1 April 2023, permanent): https://www.legislation.gov.uk/ukpga/2001/2/section/45S
- s.46 (general FYA exclusions including leased-plant carve-out at s.46(4)-(4G)): https://www.legislation.gov.uk/ukpga/2001/2/section/46
- s.61 (disposal events and values; FYA clawback): https://www.legislation.gov.uk/ukpga/2001/2/section/61

**Finance Acts:**
- Finance (No. 2) Act 2023 (insertion of s.45S, permanent £1m AIA at s.8, full expensing 100% main-rate + 50% special-rate FYA framework).

**HMRC manuals:**
- CA23230 (full expensing): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca23230
- CA23115 (leased assets carve-out): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca23115
- BLM11005 (business leasing manual cross-reference): https://www.gov.uk/hmrc-internal-manuals/business-leasing-manual/blm11005

**gov.uk public:**
- FYAs: https://www.gov.uk/capital-allowances/first-year-allowances

**Cross-references in house_positions.md:** §25.5 (FYA primary anchor — full s.45S walk + s.46 leased-plant carve-out + Autumn Budget 2024 PENDING extension note), §25.2 (P&M framework + integral features s.33A for the 50% special-rate FYA companion), §25.6 (disposal-value clawback under s.61), §25.10 (do-not-write list: "Full expensing is available to individual landlords" false, "Full expensing applies to second-hand plant" false, "Full expensing is temporary, set to expire" false, "Full expensing already covers leased plant" false / PENDING).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify s.45S permanence (no sunset clause in section as enacted), confirm the 1 April 2023 effective date, and verify the PENDING leased-plant extension status (commencement appointment order not in force as of 2026-05-23). The leased-plant extension is the single most-likely-to-move item; re-verify at write time.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected. Never duplicate.
- `<aside>` styled by global CSS.
- Lead-form role segments emphasise Property developer + Large portfolio (C5's primary readership).

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the "company-only" constraint correction (sole-trader landlords learn they cannot use full expensing; strong intent for incorporation review)
  - After the leased-plant carve-out section (buy-to-let landlord with commercial tenant learns their carve-out risk)
  - Optionally after the disposal-clawback section
- Vary opening; do NOT lead with "Full expensing was introduced...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- Read legacy `full-expensing-capital-allowances` before writing. C5 supersedes.
- Vary worked figures from C4 (AIA) and C10 (super-deduction).

### House positions
- §25.5 is primary; verbatim s.45S walk + leased-plant carve-out + PENDING extension framing.
- §25.10 do-not-write list — memorise.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is property-investor carve-out depth + company-only constraint + leased-plant PENDING. Write to it.
- Vary H2s from C4 and C10.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §25.5 primary; §25.2 + §25.6 + §25.10 adjacent.
2. Claim in tracker.
3. Read brief.
4. Fetch competitor URLs.
5. Read closest existing pages.
6. Plan rewrite/write.
7. Verify factual claims; **per §16.35: re-verify s.45S no-sunset clause + PENDING leased-plant extension status at write time**.
8. Fetch Pexels image.
9. Write markdown with full frontmatter.
10. Build.
11. Verify six checks.
12. **No middleware edit on initial launch.** Flag legacy-FE-redirect question.
13. Register in `monitored_pages`.
14. Commit (BEFORE marking done; do NOT include tracker).
15. Fill work-log.
16. Mark done in tracker.
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
