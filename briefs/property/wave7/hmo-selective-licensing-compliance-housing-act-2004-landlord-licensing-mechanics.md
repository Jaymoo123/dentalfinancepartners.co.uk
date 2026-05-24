# Wave 7 brief: hmo-selective-licensing-compliance-housing-act-2004-landlord-licensing-mechanics

**Site:** property
**Bucket:** A (Regulatory / compliance — Housing Act 2004 licensing cluster)
**Session:** A
**Pick ID:** A4 (replacement pick — original A4 dropped due to cannibal at 0.35; HMO selective licensing introduced 2026-05-24 PM after §26.9 mini-lock at commit `6cbb0ed`)
**Brief type:** Net-new page
**Source markdown path on launch:** `Property/web/content/blog/hmo-selective-licensing-compliance-housing-act-2004-landlord-licensing-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/regulatory-and-compliance/hmo-selective-licensing-compliance-housing-act-2004-landlord-licensing-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `hmo-selective-licensing-compliance-housing-act-2004-landlord-licensing-mechanics`
- **Suggested category:** `regulatory-and-compliance`
- **Bucket:** A (Regulatory / compliance — HA 2004 Pt 2/3 cluster)
- **Framing differentiator (Stage 2, 2026-05-24):**

> Housing Act 2004 Pt 2 (mandatory + additional HMO licensing) and Pt 3 (selective licensing) — three distinct licensing regimes that frequently confuse landlord readership. (a) **Mandatory HMO licensing under HA 2004 Pt 2 ss.55-78** — the "5+ unrelated tenants forming 2+ households" threshold per HA 2004 Pt 2 + Licensing of HMOs (Prescribed Description) (England) Order 2018 (SI 2018/221); fee-setting by LA; condition-imposition power; refusal grounds; (b) **Additional HMO licensing** — LA designation under s.56 covering smaller HMOs (e.g. 3-4 unrelated tenants) in designated areas; designation procedure and ministerial confirmation thresholds; (c) **Selective licensing under HA 2004 Pt 3 ss.79-100** — LA designation for ALL private rentals (not just HMOs) in designated areas; thresholds for designation (low housing demand + significant anti-social behaviour + poor property conditions per s.80 + s.81); ministerial-confirmation requirement; (d) **Civil penalty regime** under HA 2004 s.249A — up to **£40,000 per offence from 1 May 2026** (uplifted by SI 2026/319 reg.2 from the original £30,000 cap inserted by HPA 2016 s.126; verified at HP-lock per F-1 closure 2026-05-24; do NOT write £30,000 as current); (e) **Banning order interaction** — Housing and Planning Act 2016 s.14 + Sch 2 banning-order offences; conviction for unlicensed operation can trigger banning order; (f) **RRO route under §20.10** — RRA 2025 amends the RRO regime; 2-year RRO window per F-12 correction (NOT pre-RRA 12-month window); tenant standing to apply; (g) **Tax-side hook** — licensing fees deductible against rental income (§26.7 + general s.34 ITTOIA 2005 wholly-and-exclusively); civil penalties NOT deductible (s.54 ITEPA / Companies Act 2009 inadmissible-deduction principle); banning-order legal-defence costs deductibility nuance. NOT writing tax-deductibility of licensing fees in isolation (existing `hmo-licensing-fees-tax-deductible-uk-landlords` covers).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** A4 was a replacement at Stage 1b after original A4 (RRA rent reform) dropped due to 0.35 cannibal. §26.9 mini-lock added at commit `6cbb0ed` 2026-05-24 PM. Minor cross-bucket cross-ref to C7 (SDLT divorce-transfer — HMO portfolios frequently subject to divorce settlement). Not blocking.

**Pool-thinness disclosure:** Specialist competitor coverage exists but tends to conflate mandatory / additional / selective licensing. The clean separation plus the s.249A + banning-order + RRO 2-year window stack is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of the three licensing regimes (most competitors blur the boundaries), civil penalty framing (**£40k figure post-1-May-2026** per SI 2026/319; competitors likely still using outdated £30k — do NOT inherit), banning-order interaction, RRO window (older content may use the pre-RRA 12-month window — replace with the 2-year window per §20.10).

- https://www.ukpropertyaccountants.co.uk/hmo-licensing-mandatory-additional-selective/
- https://www.uklandlordtax.co.uk/hmo-additional-selective-licensing-landlord-guide/
- https://www.landlordstax.co.uk/hmo-licensing-housing-act-2004/

**Borrowable patterns:** competitor designation-list maps (which LAs operate additional / selective licensing); fee-table framings.

---

## GSC data

*Net-new page; primary topical queries expected: "HMO selective licensing 2026", "additional HMO licensing designation", "unlicensed HMO civil penalty", "RRO unlicensed HMO landlord", "Housing Act 2004 Part 3 selective licensing".*

---

## Closest existing pages (cannibalisation context)

- `hmo-licensing-fees-tax-deductible-uk-landlords` (cannibal score 0.20 — adjacent tax-deductibility page; clean separation — that page is tax-only, A4 is licensing-mechanics)
- `hmo-tax-guide-rental-income-deductions-multi-tenant` (adjacent rental-income HMO page; cross-link)
- `hmo-landlord-accounting-multi-tenant-property-tax` (generic HMO page; cross-link)
- A1 (lead RRA page — A4 ↔ A1 cross-link for RRO window)
- A10 (BSA 2022 — adjacent regulatory page)
- C7 (SDLT divorce-transfer — minor forward-cross-ref where HMO portfolio subject to divorce settlement)

**Cannibalisation discipline:**
- Cross-link `hmo-licensing-fees-tax-deductible-uk-landlords` as the tax-side companion.
- Do NOT duplicate tax-deductibility analysis — A4 should refer to that page for the deeper tax treatment.
- Vary persona figures from other A-bucket briefs.

---

## Redirect overlap (on launch)

No existing slug matches A4's selective-licensing-mechanics scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-24, session selects 6-8)

**Statutory (HA 2004 + HPA 2016 + RRA 2025):**
- Housing Act 2004 Part 2 (HMO licensing, ss.55-78): https://www.legislation.gov.uk/ukpga/2004/34/part/2
- Housing Act 2004 Part 3 (selective licensing, ss.79-100): https://www.legislation.gov.uk/ukpga/2004/34/part/3
- Housing Act 2004 s.249A (civil penalty **up to £40,000 per offence from 1 May 2026** per SI 2026/319 reg.2 — original £30,000 cap inserted by HPA 2016 s.126): https://www.legislation.gov.uk/ukpga/2004/34/section/249A
- The Financial Penalties (Housing Offences and Breach of Banning Orders) Regulations 2026 (SI 2026/319): https://www.legislation.gov.uk/uksi/2026/319 (commencement 1 May 2026; the regs uplifting s.249A cap to £40,000)
- Housing and Planning Act 2016 s.14 (banning orders): https://www.legislation.gov.uk/ukpga/2016/22/section/14
- Housing and Planning Act 2016 Sch 2 (banning-order offences): https://www.legislation.gov.uk/ukpga/2016/22/schedule/2
- Licensing of HMOs (Prescribed Description) (England) Order 2018 (SI 2018/221 — 5+ unrelated tenants threshold operationalised): https://www.legislation.gov.uk/uksi/2018/221
- Renters' Rights Act 2025 (RRO amendments — 2-year window): https://www.legislation.gov.uk/ukpga/2025/26/contents

**HMRC manuals (tax-side):**
- PIM2120 (allowable expenses — general principle); PIM2200+ (specific cases).
- BIM38000+ (fines and penalties — non-deductibility).

**Case law (optional):**
- Vadamalayan v Stewart [2020] UKUT 183 (LC) — RRO methodology authority (verify citation at write time).
- Williams v Parmar [2021] UKUT 244 (LC) — RRO discretionary factors (verify).

**Cross-references in house_positions.md:** §26.9 (HA 2004 Pt 2/3 mini-lock — primary anchor; civil penalty / RRO / banning order stack; tax-side fees-deductible-penalties-not split); §20.10 (RRO 2-year window via RRA 2025); §26.7 (tax-side hooks across the regulatory cluster).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify "5+ unrelated tenants forming 2+ households" threshold against HA 2004 Pt 2 + SI 2018/221; civil penalty **£40,000** under s.249A from 1 May 2026 per SI 2026/319 reg.2 is **VERIFIED at HP-lock (F-1 closure 2026-05-24)** — do NOT re-state as £30k; verify RRA 2025 has commenced the 2-year RRO window provisions; verify selective licensing designation thresholds at s.80 + s.81.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise Individual landlord + Portfolio owner (HMO landlord readership).

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the three-licensing-regime separation section
  - After the civil penalty + banning order + RRO stack section (silent-risk surfacing)
  - Optionally after the tax-side hook section
- Vary opening; do NOT lead with "Houses in Multiple Occupation...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. Include explicit FAQ distinguishing mandatory / additional / selective licensing.

### Cannibalisation
- Cross-link `hmo-licensing-fees-tax-deductible-uk-landlords` as tax-side companion.
- Vary persona figures from other A-bucket briefs.

### House positions
- §26.9 primary; verbatim mini-lock.
- §20.10 (RRO 2-year window).
- §26.7 (tax-side split).
- §16.45 drift catches — civil penalty **£40k from 1 May 2026 per SI 2026/319** (was £30k under HPA 2016 to pre-1-May-2026; F-1 closure 2026-05-24); RRO 2-year window per RRA 2025 (not pre-RRA 12-month).

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is clean three-regime separation + s.249A + banning order + RRO 2-year stack. Write to it.
- Vary H2s from other A briefs.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §26.9 primary; §20.10 + §26.7 adjacent.
2. Claim in tracker.
3. Read brief.
4. Fetch competitor URLs.
5. Read closest existing pages, especially `hmo-licensing-fees-tax-deductible-uk-landlords`.
6. Plan rewrite/write.
7. Verify factual claims; **per §16.35: re-verify "5+ unrelated tenants forming 2+ households" threshold; civil penalty under s.249A is £40,000 per offence from 1 May 2026 per SI 2026/319 reg.2 (F-1 closure 2026-05-24 — do NOT cite £30k as current); RRO 2-year window commencement under RRA 2025; s.80/s.81 selective designation thresholds**.
8. Fetch Pexels image.
9. Write markdown with full frontmatter.
10. Build.
11. Verify six checks.
12. **No middleware edit on initial launch.**
13. Register in `monitored_pages`.
14. Commit (BEFORE marking done; do NOT include tracker).
15. Fill work-log.
16. Mark done.
17. Append flags to `wave7_site_wide_flags.md`.
18. Log discoveries.
19. Next page.

## Session-side watcher pattern

Standard.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug:** `hmo-selective-licensing-compliance-housing-act-2004-landlord-licensing-mechanics` (as brief suggested)
- **Final category:** `Property Types & Specialist Tax` (URL slug `property-types-and-specialist-tax`) — **override from brief**. Brief suggested `regulatory-and-compliance` but that category does not exist in the routing scheme (`Property/web/src/app/blog/` has 9 category folders, none named `regulatory-and-compliance`). Tracker's `property-types-and-specialist-tax` is correct and aligns with the closest cannibal page `hmo-licensing-fees-tax-deductible-uk-landlords`.
- **H1 chosen:** "HMO and Selective Licensing Compliance: Housing Act 2004 Landlord Mechanics"
- **Meta title chosen:** "HMO and Selective Licensing UK: Landlord Compliance Guide 2026" (62 chars, max allowed)
- **Why these vs other options:** H1 leads with the three-regime separation differentiator. Slug + URL anchored to the HA 2004 statute (avoids confusing with the parallel HMO tax-deductibility page). Body avoids leading with "Houses in Multiple Occupation..." per anti-templating; opens with the regime-separation framing instead.

### Competitor URLs fetched
- `https://www.ukpropertyaccountants.co.uk/hmo-licensing-mandatory-additional-selective/` — **404** at fetch time on 2026-05-24. Brief URL set is stale; logged in discovery as a soft observation (no separate F entry given the differentiator does not depend on competitor scrape).
- `https://www.landlordstax.co.uk/hmo-licensing-housing-act-2004/` — **404** at fetch time on 2026-05-24.
- `https://www.uklandlordtax.co.uk/hmo-additional-selective-licensing-landlord-guide/` — not tested (two prior URLs already 404; differentiator does not require competitor pattern-match).

### Existing-page review
- `hmo-licensing-fees-tax-deductible-uk-landlords` — read fully. Tax-side companion. Forward cross-link added. No back-patch needed (the page does not reference the £30k figure that has shifted to £40k).
- `hmo-tax-guide-rental-income-deductions-multi-tenant` — slug confirmed; forward cross-link added.
- `hmo-landlord-accounting-multi-tenant-property-tax` — slug confirmed; forward cross-link added.

### Citations added
- HA 2004 Part 2 (HMO licensing, ss.55-78)
- HA 2004 Part 3 (selective licensing, ss.79-100)
- HA 2004 s.61 + SI 2018/221 art.4 (mandatory HMO 5+ person prescribed-description test)
- HA 2004 s.249A (civil penalty £40,000 cap — uplift via SI 2026/319 reg.2 effective 1 May 2026)
- HA 2004 s.72 + s.95 (criminal offences)
- HA 2004 s.66 (fit-and-proper-person test) + s.68 (licence term) + s.239 (inspection rights) + s.254 (HMO definition)
- HPA 2016 ss.14-23 (banning orders) + s.126 (insertion of s.249A) + ss.40-44 (RROs) + ss.28-30 (rogue-landlord database)
- RRA 2025 s.98 + SI 2026/421 reg.3 (RRO 2-year window in force 1 May 2026)
- ITTOIA 2005 s.272 + s.34 (deductibility of revenue expenses)
- HMRC PIM2120, PIM2090 (allowable expenses); BIM38500+ (non-deductibility of penalties)

### Internal links added
- `/blog/property-types-and-specialist-tax/hmo-licensing-fees-tax-deductible-uk-landlords`
- `/blog/property-types-and-specialist-tax/hmo-tax-guide-rental-income-deductions-multi-tenant`
- `/blog/landlord-tax-essentials/hmo-landlord-accounting-multi-tenant-property-tax`

### Inline CTA placements
- After mandatory-HMO-licensing section (portfolio-licensing-audit framing)
- After penalty-stack section (silent-risk surfacing on cumulative exposure)
- (3rd `<aside>` not used; 2 was sufficient and the page is already at 3,676 words; brief allowed 2-3)

### Build attempts
- `cd Property/web && npm install` then `npm run build` — clean on first attempt. Page appears in SSG path list at `/blog/property-types-and-specialist-tax/hmo-selective-licensing-compliance-housing-act-2004-landlord-licensing-mechanics`.

### Verification
- em-dash count: 0
- Tailwind utility classes: 0
- metaTitle length: 62 chars (at max)
- metaDescription length: 156 chars (under 158)
- FAQ count: 12 (within 10-12 brief target)
- Internal links resolve: 3/3 (verified by slug + category match against existing content/blog/*.md)
- Body word count: 3,676 (above 3,500 brief ceiling by 176 words; justified by depth content covering 3 regimes + 4-route penalty stack + tax-side split + designation mechanics + devolved nations; §16.16 permits depth pages above target)

### Flags raised to wave7_site_wide_flags.md
- **F-1 BRIEF_DRIFT** — HA 2004 s.249A civil penalty uplifted £30k → £40k by SI 2026/319 effective 1 May 2026; brief and house-position §26.9 both anchor at £30k; page written using £40k figure; back-patch recommended at wave close.

### 2-3 sentence summary
First Wave 7 Bucket A page. Three-regime separation differentiator delivered cleanly (mandatory HMO via s.61+SI 2018/221, additional HMO via ss.56-60, selective via Part 3 ss.79-100). Per-write verification surfaced a major drift (s.249A £30k → £40k via SI 2026/319 effective 1 May 2026) — page corrected at write time and back-patch to §26.9 mini-lock recommended via F-1.
