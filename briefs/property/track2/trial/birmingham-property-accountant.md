# Track 2 brief: birmingham-property-accountant

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file, CTR-FAIL gap dominant)
**Source markdown path:** `Property/web/content/blog/birmingham-property-accountant.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/property-accountant-services/birmingham-property-accountant
**Stage 1 priority:** H (high — city pages have proven ROI from 2026-05-21 rewrites)
**Stage 1 date:** 2026-05-23
**Stage 2 enrichment date:** 2026-05-23
**Cannibalisation status:** REWRITE + FLAG-MANAGER (pricing leak conflicts with house norm; needs decision)

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `birmingham-property-accountant`. The query class "birmingham property accountant" + "buy-to-let accountant birmingham" is high-intent, geo-anchored, and the slug aligns. No redirect proposed.
- **Category:** `property-accountant-services` (kept).
- **Gap-mode tag:** `CTR-FAIL` (primary) + `STRUCTURE` (secondary, lacks city-template parity with the 2026-05-21 rewritten floor).
- **"Why this rewrite" angle:** The 2026-05-21 city rewrites (Peterborough, Leeds, Wolverhampton, Leicester, Bournemouth, Nottingham, Swansea, London) locked a city-template floor of ~3,000 body words + 12-14 FAQs + 2 inline CTAs + named neighbourhoods + selective licensing detail + Article 4 zones + student-let economics + post-Dec 2023 council tax + MTD threshold + post-Autumn-2024 CGT 18%/24% + full SDLT additional-dwellings table. This page sits at ~1,800 words / 7 FAQs / 0 inline CTAs and has a pricing leak (£300-£600 / £1,500-£3,000 explicit, line 25/27 frontmatter FAQ) that violates the agency lead-gen handoff model (memory: anonymised social proof only, no pricing). Page also leaks generic "we" voice in places. This is a CTR-fail because the meta title ("Birmingham Buy-to-Let Accountant | Property Tax Services") is template-generic and doesn't lead with the highest-intent differentiator the city template established for peers (e.g., Wolverhampton leads with HMO licensing zones; Peterborough leads with Section 24 + incorporation).

---

## Current page snapshot (Stage 2)

- **Source markdown path:** `Property/web/content/blog/birmingham-property-accountant.md`
- **Current word count:** ~1,800 (body)
- **Current H2 outline:**
  1. Why Birmingham Property Investors Need Specialist Tax Support
  2. Core Services and Responsibilities (with H3 Annual Tax Returns + H3 Tax Efficiency)
  3. Specialist Areas for Birmingham Property Portfolios (with H3 Student/HMO, H3 Commercial/Mixed, H3 CGT)
  4. Property Investment Structures and Incorporation
  5. Making Tax Digital (MTD) Preparation
  6. Birmingham Property Market Considerations
  7. Choosing Your Birmingham Property Accountant
  8. Common Tax Planning Opportunities
  9. Getting Started (+ Related Reading)
- **Current meta title:** "Birmingham Buy-to-Let Accountant | Property Tax Services" (55 chars; OK length, template-generic, no differentiator)
- **Current meta description:** "Specialist Birmingham property accountant for buy-to-let landlords. Section 24, incorporation, MTD, and CGT planning for the West Midlands." (142 chars; reasonable but lacks named neighbourhood / specific number / differentiator hook)
- **Current FAQs (frontmatter count):** 7 (target 12-14)
- **Current outbound authority links:** 0 to gov.uk / legislation.gov.uk / HMRC manuals. Internal links: 5 (Section 24 pillar, CGT pillar, CGT payment deadlines, BTL ltd-co pillar, /services).
- **Schema present:** Y (FAQPage auto-emitted from frontmatter).
- **Last meaningful edit date:** 2026-04-01.
- **Named local data points present:** Edgbaston, Kings Heath, Jewellery Quarter, Selly Oak, Harborne, Digbeth, Eastside (light). Missing: selective licensing zones specifics (e.g., Sparkbrook / Sparkhill / Tyseley / Balsall Heath are the named Birmingham selective licensing wards from the city council 2020 scheme), Article 4 areas, BCC HMO licensing additional regime, named universities, named professional-tenant employers.

---

## GSC angle (last 90 days) (Stage 2 — pending Supabase pull)

**Expected GSC signals (reasoning, not verified at trial):**
- Highest-impression query likely "birmingham property accountant" or "property tax accountant birmingham".
- Position likely 5-12 (page-1 mid to top-page-2). City pages historically rank decently on city + accountant queries due to low specialist competition.
- CTR likely <1% — generic meta + template-bland title.
- Long-tail intent: "buy to let accountant birmingham", "btl tax birmingham", "property tax advisor birmingham", "section 24 birmingham landlord", "hmo accountant birmingham".

**At Phase 2 execution time:** if position is actually top 5 with low CTR, the CTR-FAIL diagnosis is confirmed and meta rewrite is the load-bearing fix. If position is 10+, gap-mode shifts to DEPTH primary and CTR-FAIL secondary.

---

## Gap-mode diagnosis (Stage 1 → Stage 2 refined)

**Primary: CTR-FAIL.** Meta title is template-generic ("Birmingham Buy-to-Let Accountant | Property Tax Services"). The 2026-05-21 city rewrites established that meta titles lead with a specific high-intent differentiator + the city. Examples from the rewritten template floor:
- Peterborough: "BTL Accountants Peterborough | Section 24 & Incorporation Help"
- Wolverhampton: "Property Accountant Wolverhampton | HMO + S24 Specialists"
- Swansea: "Property Accountant Swansea | Welsh LTT + Rent Smart Wales"

Birmingham equivalents leading with the strongest local differentiator (HMO + selective licensing + student-let-economics or Article 4 + Section 24) would lift CTR materially. Position likely doesn't need to move — CTR can climb 2-5x on title rewrite alone.

**Secondary: STRUCTURE.** Page sits below the city template floor:
- Word count: ~1,800 vs 3,000 floor (peer city rewrites)
- FAQs: 7 vs 12-14 floor
- Inline CTAs: 0 vs 2 floor
- Authority links: 0 vs 4-7 floor
- Named local depth: light vs deep (peer city rewrites name 4-8 specific neighbourhoods/wards with selective licensing dates)
- Council tax / business rates post-Dec 2023: not mentioned (peer city rewrites all carry this)

**Tertiary: HOUSE_POSITION_CONFLICT (PRICING LEAK).** Current FAQ #5 explicit pricing (£300-£600 / £1,500-£3,000). Memory note `agency_lead_gen_model.md`: "All five niche sites are lead-gen handoffs to partner firms ... anonymised social proof only, no pricing, no client names." Confirm against `house_positions.md §13` (do-not-write list) at execution. If §13 confirms no-pricing rule, rewrite MUST remove the pricing FAQ and replace with a "How do property accountants typically charge?" framed-as-explainer FAQ that points to discovery-call CTA without quoting numbers.

**Load-bearing fix order:**
1. **Meta title rewrite** (highest ROI, smallest change). Lead with strongest local differentiator: candidate options at execution include "Birmingham HMO + S24 Tax Specialists", "Property Accountant Birmingham | HMO + Article 4 + S24", "Birmingham BTL Tax Specialists | Edgbaston to Selly Oak".
2. **Meta description rewrite** with named neighbourhood + named tax mechanic + free-call hook.
3. **Body lift to ~3,000 words** following the city template (add named licensing zones, Article 4 areas, student-let economics for UoB + BCU + Aston, BCC selective licensing wards, post-Dec 2023 council tax, post-Autumn-2024 CGT, full SDLT additional-dwellings table).
4. **FAQ count to 12-14** with one removal (pricing FAQ) + 6-7 net additions.
5. **2 inline `<aside>` CTAs** at conversion moments (after worked example, after CGT/incorporation section).
6. **4-7 authority links** (HMRC PIM, ITTOIA 2005, FA 2003 Sch 4ZA, Housing Act 2004 Pt 2-3 for HMO licensing).
7. **Pricing leak removed** per house-position discipline.

---

## Competitor URLs (Stage 2 — pending live verification)

**For execution session — verify 200 status, replace if dead:**

1. **uklandlordtax.co.uk — Birmingham (or West Midlands) accountant page** if exists. Borrow: city-applied tax mechanic depth.
2. **ukpropertyaccountants.co.uk — service-area pages** for city-template comparator.
3. **Local Birmingham accountancy firm specialist page** (e.g., dnsassociates.co.uk or fawltytax.co.uk if catalogued in v2 universe sitemaps). Borrow: local market knowledge framing without copying.
4. **(Optional 4th)** A peer rewrite from 2026-05-21 (Leeds / Wolverhampton) as internal reference for template parity — read but do not cite externally.

**Source for URLs:** `briefs/property/_sitemap_cache_v2/` cached domain sitemaps + competitor_serps Supabase rows.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** 2026-05-23.

| Source | Slug / candidate | Overlap dimension | Resolution |
|---|---|---|---|
| Residual (own page) | birmingham-property-accountant | self | REWRITE in place |
| Excluded (Wave 1 / rewritten 2026-05-21) | london-property-accountant (rewritten) | London-specific city page | No cannibal (different city). Internal link possible. |
| Excluded (2026-05-21 rewrites) | leeds-property-accountant-specialist-tax-services, peterborough-property-accountant-specialist-tax-services, etc. | Peer city template floor | No cannibal — sibling template-parity references. |
| Residual (intra) | best-property-accountant-london, property-specialist-accountant-london | London-specific variants | No cannibal with Birmingham. Note for cluster-level resolution (London has 3+ variants — separate issue). |
| Residual (intra) | property-accountant-near-me, buy-to-let-accountants-near-me-guide, what-services-buy-to-let-accountant | Generic "near-me" + service-description pages | No cannibal (this is geo-Birmingham; siblings are generic). Internal link from this Birmingham page to "how-to-choose-a-property-accountant" + "what-does-a-property-accountant-do" (rewritten). |
| Residual (intra) | manchester-property-accountant, bristol-property-accountant, coventry-property-accountant, glasgow-property-accountant | Other Midland/UK city pages | No cannibal (each is geo-distinct). Cluster-level template-parity audit at Phase 2. |

**Conclusion:** No REDIRECT-PROPOSED. Rewrite proceeds as city-template-parity lift. FLAG-MANAGER on pricing leak (see house-position conflict block).

---

## Closest existing pages (Stage 2)

Internal link partners (to and from this page):

- **Same-category siblings (property-accountant-services):**
  - `how-to-choose-a-property-accountant` (residual)
  - `property-accountant-near-me` (residual)
  - `what-does-a-property-accountant-do` (rewritten 2026-05-21)
  - `how-much-does-a-property-accountant-cost` (rewritten 2026-05-21) — replaces the pricing FAQ; THIS page links there for cost discussion rather than quoting numbers itself.
  - `property-accountant-vs-general-accountant` (residual)
- **Cross-category (city-context):**
  - `section-24-mortgage-interest-restriction-uk-landlords` (residual; pillar)
  - `claim-mortgage-interest-rental-property-uk-section-24` (rewritten — Section 24 applied)
  - `buy-to-let-limited-company-complete-guide-uk` (rewritten — incorporation pillar)
  - `capital-gains-tax-property-complete-guide-uk` (rewritten — CGT pillar)
  - `hmo-licensing-fees-tax-deductible-uk-landlords` (rewritten — HMO licensing tax angle)
  - `hmo-vs-standard-buy-to-let-tax-comparison` (rewritten — HMO vs BTL)
  - `mtd-itsa-qualifying-income-test-gross-vs-net` (Wave 3 B1 — MTD threshold)
  - `landlord-tax-changes-2026-complete-guide` (residual)
- **Location dedicated page (TSX route):**
  - `/locations/birmingham` (TSX page already linked in current "Related Reading")

---

## House-position references (Stage 1)

- **§3 MTD ITSA** [LOCKED + §19.x extensions]: cite MTD threshold schedule £50k (Apr 2026) / £30k (Apr 2027) / £20k (Apr 2028). Current page is already correct here (lines 31 + 70-71). Preserve.
- **§4 Section 24** [LOCKED]: 20% basic-rate credit. Page references correctly.
- **§5 CGT 2026/27** [LOCKED]: 18%/24% post-Autumn-2024; £3k AEA. Page references correctly.
- **§13 Do-not-write list** [LOCKED]: VERIFY at execution against pricing-quote rule. Pricing FAQ removal contingent on §13.
- **§14 Things to flag** [LOCKED — verify content at execution]: framing of "specialist" claims should avoid hard-sell.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict — PRICING LEAK.** Current FAQ #5 ("How much does a property tax accountant in Birmingham typically charge?") quotes "£300-£600" and "£1,500-£3,000" explicitly. Per memory `agency_lead_gen_model.md` and likely `house_positions.md §13`:

> All five niche sites are lead-gen handoffs to partner firms — anonymised social proof only, no pricing, no client names.

**Action:** flag to `track2_site_wide_flags.md` as **F-1 | 2026-05-23 | HIGH | birmingham-property-accountant | HOUSE_POSITION_CONFLICT | pricing leak in FAQ #5**.

Execution session removes the pricing FAQ and replaces with framed-as-explainer FAQ that points to `how-much-does-a-property-accountant-cost` (rewritten 2026-05-21) for the public-page treatment of cost discussion + free-discovery-call CTA at end of FAQ.

**Audit follow-up:** the same pricing pattern may exist on other residual city pages (`manchester-property-accountant`, `bristol-property-accountant`, etc.). Phase 2 cluster audit — bring this to manager attention at trial close.

---

## Authority links worth considering (Stage 2)

Verify all at execution time:

1. HMRC PIM (Property Income Manual): https://www.gov.uk/hmrc-internal-manuals/property-income-manual
2. ITTOIA 2005 s.272 (UK property business): https://www.legislation.gov.uk/ukpga/2005/5/section/272
3. Housing Act 2004 Part 2-3 (HMO licensing — Birmingham-applied): https://www.legislation.gov.uk/ukpga/2004/34/contents
4. FA 2003 Sch 4ZA (SDLT 5% additional dwellings post-Oct 2024): https://www.legislation.gov.uk/ukpga/2003/14/schedule/4ZA
5. TCGA 1992 s.4 (CGT rates on residential property): https://www.legislation.gov.uk/ukpga/1992/12/section/4
6. Birmingham City Council selective licensing scheme (designated wards 2020 + 2025 renewal — verify at write time)
7. The Articles 4 Direction in Birmingham (HMO change-of-use, verify named areas at write time)
8. The Levelling-up and Regeneration Act 2023 — HMO planning regime (if Article 4 needs framing).

(Session selects 5-7 to cite.)

---

## Universal rules (do not skip)

(Same as Wave 5 brief. **CRITICAL ADDITIONS for this brief:** NO PRICING NUMBERS in body or FAQs. NO real client names. Anonymised case study OK (e.g., "Helena, Edgbaston HMO landlord with 3 student-let properties..."). LeadForm auto-injected; no duplicate.)

---

## 19-step workflow (legacy-rewrite adaptation)

(Same as `airbnb-tax-uk-short-term-rental-income-taxed.md` workflow with adaptations:)

- Step 6: also read the 8 peer rewritten city pages (Peterborough, Leeds, Wolverhampton, Leicester, Bournemouth, Nottingham, Swansea, London) for template parity reference.
- Step 7: target 3,000-3,400 body words; 12-14 FAQs; 2 inline CTAs; 4-7 authority links.
- Step 9: meta title rewrite is the load-bearing fix — lead with strongest local differentiator (HMO / Article 4 / S24 / student-let).
- Step 9b: PRICING FAQ REMOVED; cost-FAQ replaced with cost-discussion-framing pointer to `how-much-does-a-property-accountant-cost`.
- Step 11: six-checks include pricing-check (`grep -E '£[0-9]' Property/web/content/blog/birmingham-property-accountant.md` should return 0 matches in body for fee-discussion lines).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time. Same structure as `airbnb-tax-uk-short-term-rental-income-taxed.md` work-log.)

### House-position alignment
- §3 MTD: __
- §4 Section 24: __
- §5 CGT: __
- §13 do-not-write (pricing rule): __ confirmed removed
- §14 things to flag: __

### Comparison: before vs after (rewrite metrics)
- Word count: 1,800 → __
- H2 count: 9 → __
- FAQ count: 7 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Meta title rewrite: "Birmingham Buy-to-Let Accountant | Property Tax Services" → __
- Meta description rewrite: __
- Pricing FAQ removed: __ (Y/N)
- Named neighbourhoods / wards added: __ (count + names)

### Flags raised
- F-1 carried over from brief (pricing leak — confirmed removed)
- Any new flags surfaced at execution: __

### 2-3 sentence summary
- (populated at execution time)
