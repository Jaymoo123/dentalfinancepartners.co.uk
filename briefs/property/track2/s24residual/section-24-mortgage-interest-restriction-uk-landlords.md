# Track 2 brief: section-24-mortgage-interest-restriction-uk-landlords

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief (Section 24 residual cluster, the head-term WHAT-IS pillar)
**Source markdown path:** `Property/web/content/blog/section-24-mortgage-interest-restriction-uk-landlords.md`
**Live URL (frontmatter canonical):** https://www.propertytaxpartners.co.uk/blog/section-24-and-tax-relief/section-24-mortgage-interest-restriction-uk-landlords
**URL note (verify at execution):** GSC reports impressions for this page at the ROOT path `/blog/section-24-mortgage-interest-restriction-uk-landlords` while the frontmatter `canonical` is the NESTED `/blog/section-24-and-tax-relief/...` path. Equity may be split across two URLs (the §16.T6 flat-vs-nested duplicate pattern, same as `london-property-accountant`). Step 4 of the workflow checks `Property/web/src/middleware.ts` for a flat→nested 301 and confirms the canonical resolves before any body work. Do NOT change the slug or canonical without resolving this first.
**Stage 1 priority:** **H** — live Bing page-1 head-term equity (pos 3-5 on the pure "what is section 24" definitional intent) on a page that is now STALE-BY-OMISSION of enacted 2027/28 law.
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30
**Cannibalisation status:** **REWRITE** (REWRITE-and-lift; collapse is forbidden twice over — by the standing REWRITE-ONLY rule and by live Bing page-1 head-term equity. See cannibalisation block.)

> This is a gold-reference brief at the depth of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` and the city-template `briefs/property/track2/trial/birmingham-property-accountant.md`. The dominant fix here is NOT CTR meta tuning (as on cgt-rates) but INVISIBLE + STALE_FACTS + THIN_DEPTH: the page must become the definitive plain-English WHAT-IS / HOW-IT-WORKS pillar, add the enacted 2027/28 law it currently omits, and rebuild two muddled worked examples cleanly against house §4.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `section-24-mortgage-interest-restriction-uk-landlords`. It carries the exact head-term ("section 24" + "mortgage interest restriction" + "uk landlords") that the page already owns on Bing at pos 3-5. Changing it would surrender live equity. Resolve only the flat-vs-nested URL split (see URL note); do not re-slug.
- **Category:** `Section 24 & Tax Relief` (kept).
- **Gap-mode tag:** `STALE_FACTS` (primary, by-omission of enacted 2027/28 law) + `THIN_DEPTH` (1,455 body words vs ~3,000 target; muddled worked examples) + `INVISIBLE` (no statute spine, no authority links, GSC-dead cluster) + `STRUCTURE` (no reference table, FAQs not query-shaped) + `CTR_FAIL` (secondary; meta title is template-generic and does not lead with the head-term word order).
- **"Why this rewrite" angle:** This is the cluster's **definitional pillar**. The two rewritten siblings own the deeper downstream jobs: `claim-mortgage-interest-rental-property-uk-section-24` (Bing pos 3.7, 13 clicks, 44 queries) owns the CLAIMING-MECHANICS / SA105-box / "how do I claim on my return" intent, and `finance-costs-section-24-complete-guide` (Bing pos 3.5) owns the WHAT-COUNTS-AS-A-FINANCE-COST intent. This page leads on a DISTINCT intent neither sibling serves: the plain-English "what IS this rule and how does it hit me." The rewrite makes that explicit (definition, before/after mechanics, who is affected, the three-part credit cap per §4, threshold knock-ons: 60% PA taper / HICBC / student loan) and forward-links OUT to the two siblings + the calculator + the incorporation pillar for the jobs they own. It must NOT duplicate the SA105-box walkthrough (finance-costs page) or the line-by-line return entry (claim page). The load-bearing correctness fix is adding the enacted FA 2026 2027/28 law the page currently omits, stated as enacted (not draft), with the §7 "no new wedge" consequence stated correctly.

---

## Current page snapshot (Stage 2 — filesystem read + frontmatter)

- **Source markdown path:** `Property/web/content/blog/section-24-mortgage-interest-restriction-uk-landlords.md`
- **Body word count:** ~1,455 (full file ~2,019 words incl. frontmatter + FAQs).
- **H2 outline (10 H2s, read from source):**
  1. What is Section 24 Mortgage Interest Restriction? (line 37)
  2. Section 24 Rules for 2025/26 Tax Year (line 42)
  3. How Section 24 Works in Practice (line 52)
  4. Calculating Your Section 24 Impact (line 61) — **muddled worked example (see diagnosis)**
  5. Who is Affected and the Real Impact on Tax Brackets (line 69) — **mixes £25k / £35k rental figures inconsistently**
  6. Additional Consequences and Threshold Effects (line 83)
  7. Strategies to Manage the Impact of Section 24 (line 92)
  8. Long-term Property Strategy and Professional Advice (line 110)
  9. Looking Ahead (line 115) — **thin; says nothing about 2027/28; the STALE-BY-OMISSION locus**
  10. Related Reading (line 119)
- **Current meta title:** "Section 24 Mortgage Interest Restriction | UK Guide" (51 chars; template-generic, does not lead with the head-term word order Bing ranks us on).
- **Current meta description:** "Section 24 restricts mortgage interest relief to 20% for UK landlords. Use our calculator to see your 2025/26 tax impact and explore solutions." (141 chars; locked to 2025/26, omits 2027/28).
- **Current FAQs (frontmatter count):** 5 (target 12-14). Existing 5 are reasonable but not verbatim-query-shaped, and FAQ "How much extra tax will Section 24 cost me?" answer uses a clean £10k → £2,000 example that survives — reuse.
- **Current outbound authority links:** 0 to gov.uk / legislation.gov.uk / HMRC manuals. **Page cites NO statute at all** (INVISIBLE driver). Internal links: present in Related Reading (count at execution).
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:` via `buildBlogPostingJsonLd`). `reviewedBy` / `reviewerCredentials` frontmatter fields NOT yet set on this page (siblings carry them — add them).
- **Last meaningful edit date:** `date: "2026-03-29"` (frontmatter) — locked to 2025/26; pre-dates the FA 2026 Royal Assent of 18 March 2026 in substance.

**STALE markers found in source (per diagnosis):**
- Line ~104: pension annual allowance cited as "2024/25 £60,000" — figure still current (£60,000) but the **year label is stale**; reframe to current-year framing.
- Line ~116 (Looking Ahead): MTD reference says "April 2026" with **no threshold** — add the §3 £50,000 qualifying-income threshold (dropping to £30k April 2027, £20k April 2028).
- Lines ~62-67 ("Calculating Your Section 24 Impact"): headline "additional tax burden is £1,443, a 100% increase" **does not reconcile** with the two-system calc shown — rebuild.
- Lines ~75-81 ("Higher Rate" example): mixes "£60k + £35k rental income" with "£25,000 rental profit" — **internally inconsistent**; rebuild against §4 three-part cap.
- CGT 18%/24% (line ~97) and CT 19%/25% (line ~99): **CORRECT** per §5 — preserve.
- No em-dashes detected in current body — keep it that way.
- No pricing figures, no client names — clean (Decision E satisfied); keep clean.

---

## GSC / Bing angle (last 90 days) — from diagnosis equity map

**GSC is DEAD for the entire Section 24 cluster.** The live channel is **Bing**. This page sits at Bing **pos 3-5** on the pure pillar/definition head-term, which the two rewritten siblings do NOT lead on. That is the equity worth protecting and lifting.

### Primary query
- **"what is section 24 (mortgage interest restriction for landlords)"** — the definitional head-term this page owns.

### Target queries (from diagnosis target_queries[])

| query | source | impr | pos |
|---|---:|---:|---:|
| what is section 24 | bing | 1 | 3 |
| what is section 24 for landlords | bing | 1 | 4 |
| ehat is clause 24 landlords | bing | 1 | 5 |
| residential landlord tax relief on mortgage costs 2025 | bing | 1 | 7 |
| residential landlord tax relief on mortgage costs 2025 tax return | bing | 1 | 6 |
| section 24 mortgage interest relief strategy | gsc | 1 | 60 |
| section 24 | adjacent | 9 | 6 |
| what is section 24 tax | adjacent | 2 | 3 |
| finance costs restriction for landlords | adjacent | 2 | 2 |
| section 24 credit | adjacent | 1 | 5 |
| mortgage interest relief | adjacent | 5 | 5 |
| let property tax changes uk and mortgage interest relief | adjacent | 2 | 7 |

**Pattern read:** the head-term cluster ("what is section 24", "what is section 24 for landlords", "what is clause 24 landlords", "what is section 24 tax", bare "section 24") is the page's home intent and is **recoverable** with a sharper meta title leading with the head-term word order + a definitional opener that answers in the first 40 words (snippet-bait). The "residential landlord tax relief on mortgage costs 2025 / ...tax return" pair leans toward the claim/return job the sibling owns — serve the head of it here (what the relief IS) and forward-link the return mechanics to the claim sibling. "section 24 mortgage interest relief strategy" (GSC pos 60, near-dormant) is served by the Strategies H2 + forward-link to the incorporation pillar. "finance costs restriction for landlords" leans toward the finance-costs sibling — serve a one-line definition + forward-link.

**Realistic post-rewrite target:** lift the Bing head-term cluster from pos 3-5 toward pos 1-2 and convert the dormant GSC cluster as Google re-crawls the de-staled, statute-anchored, 3,000-word page. This is NOT an INTENT-MISMATCH page (unlike cgt-rates): "what is section 24" is a definitional intent we can own outright, so the CTR ceiling is not capped by gov.uk.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: STALE_FACTS (by omission of enacted law).** This is the inverse of the usual §16.22 Bill-vs-enacted hazard. The page is locked to 2025/26 and the thin "Looking Ahead" H2 says nothing about 2027/28. Per house **§4 + §7 [LOCKED, FA 2026 Royal Assent 18 March 2026]**, from **6 April 2027** the Section 24 finance-cost **reducer rises from 20% to the new property basic rate of 22%** (FA 2026 Sch 1 amending ITTOIA 2005 ss.274AA/274C + ITA 2007 s.399B), and property income is taxed at **22/42/47** in England, Wales and NI (only Scotland carved out). The rewrite MUST add this as **ENACTED law** (not "proposed"/"draft"), and state the §7 "no new wedge for basic-rate" consequence correctly. **DO-NOT-WRITE (locked):** "reducer stays at 20% in 2027/28", "a new basic-rate wedge opens", "FA 2026 is draft / awaiting Royal Assent", "2027 rates apply to England and NI only", "Scotland and Wales set their own property rates for 2027/28". Also fix the stale year labels (pension AA year label; MTD threshold) noted in the snapshot.

**Secondary: THIN_DEPTH + STRUCTURE (accuracy / internal-consistency).** 1,455 body words vs a ~3,000 target. The two worked examples are muddled (the £1,443/"100% increase" headline does not reconcile; the higher-rate example mixes £25k and £35k rental figures). Both must be rebuilt cleanly against the §4 three-part credit cap (lower of: 20% of finance costs / 20% of residential rental profit before finance costs / 20% of taxable income above the personal allowance), and shown at BOTH 2026/27 (20% reducer) and 2027/28 (22% reducer) so the "no new wedge" point is demonstrated, not just asserted.

**Tertiary: INVISIBLE.** The page cites NO statute and has 0 authority links, leaving it weak for both ranking authority and reader trust on a head-term where Google increasingly rewards E-E-A-T. Add the statute spine (s.272A as the literal origin of the name "Section 24"; the reducer mechanism at ITA 2007 ss.274A-274C; the FA 2026 amendments) + 4-7 verified authority links + `reviewedBy` schema.

**Quaternary: CTR_FAIL (recoverable).** Meta title is template-generic and does not lead with the head-term word order Bing ranks us on. A head-term-led title + a definitional snippet opener is the small-change lift.

**Load-bearing fix sequence (ordered by ROI):**
1. **Add the enacted 2027/28 law (§4 + §7)** as the correctness floor — rebuild "Looking Ahead" into a substantive "Section 24 in 2027/28: the 22% reducer" H2; state as enacted, with the "no new wedge" consequence correct.
2. **Rebuild the two worked examples** cleanly against the §4 three-part cap, at both 2026/27 (20%) and 2027/28 (22%).
3. **Add the statute spine + reference table** (the "before vs after Section 24" comparison table + a 2026/27-vs-2027/28 reducer table) for scannability and snippet capture.
4. **Body lift to ~3,000 words** with the threshold-knock-on section (60% PA taper, HICBC, student loan), who-is-affected, and the strategies overview that forward-links OUT (does not duplicate the siblings).
5. **FAQ 5 → 12-14**, each targeting a GSC/Bing query verbatim where possible; preserve the clean £10k → £2,000 existing FAQ.
6. **Meta title rewrite** leading with the head-term word order ("what is Section 24" / "Section 24 mortgage interest restriction").
7. **Add `reviewedBy` + `reviewerCredentials`** frontmatter to match the sibling E-E-A-T pattern.

---

## Competitor URLs (Stage 2 — verify 200 + date-stamp at execution per §16.31)

| URL | Use case | What to borrow | What to differentiate |
|---|---|---|---|
| https://www.simplybusiness.co.uk/knowledge/landlord-tax/what-is-section-24/ | Closest head-term competitor ("what is section 24") | Plain-English definitional opener structure | They will not have the enacted 2027/28 22% reducer; we lead with it. No three-part cap depth; no worked examples at both rates. |
| https://www.landlordstudio.com/uk-blog/section-24-tax-change-for-buy-to-let-investors | "section 24 tax change" framing | Before/after mechanics framing | Software-vendor angle, US-leaning; we are the UK specialist-application layer with statute spine. |
| https://rita4rent.co.uk/blog/section-24-capital-gains-tax-implications-facing-landlords/ | CGT-implication adjacency | Cross-topic linking idea | We forward-link CGT to our own §5-aligned pages rather than duplicate. |
| https://www.nrla.org.uk/news/six-years-of-hurt-where-has-section-24-left-the-landlord-market | Authority / market-context citation | Sector-impact framing (anonymised, no fee claims) | Editorial/news; we are the evergreen definitional pillar. |

**Competitor depth ceiling for this query class (estimate, confirm at fetch):** ~1,200-2,000 words, 0-2 worked examples, typically 0 statute citations, none carrying the enacted 2027/28 22% reducer. Our ~3,000-word target with 12-14 FAQs, a reference table, two dual-rate worked examples, and a verified statute spine puts us decisively best-in-class, not catch-up. **Each competitor URL must be WebFetched + 200-status-confirmed + date-stamped at execution; reject and replace any non-200.**

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (latest refresh; re-read at execution). DENSE Section 24 cluster (20+ pages under `/blog/section-24-and-tax-relief/`), but the head-term DEFINITIONAL intent this page owns on Bing is NOT primarily owned by any rewritten sibling.

| Source | Slug | Owned intent (Bing latest-date, the live channel) | Resolution |
|---|---|---|---|
| Residual (own) | section-24-mortgage-interest-restriction-uk-landlords | **WHAT-IS / HOW-IT-WORKS definitional pillar** (pos 3-5 on "what is section 24", "what is section 24 for landlords", "what is clause 24 landlords") | **REWRITE in place** — own the definitional intent; forward-link OUT to the jobs below. |
| Rewritten | claim-mortgage-interest-rental-property-uk-section-24 | CLAIMING-MECHANICS / SA105 / "how do I claim mortgage interest relief on my return" (69 impr / 13 clk / pos 3.7 / 44 queries — cluster's strongest page) | No collision — DISTINCT intent. Forward-link from our Strategies / "how the relief is given" paragraph. **Do NOT duplicate the SA105-box walkthrough.** |
| Rewritten | finance-costs-section-24-complete-guide | WHAT-COUNTS-AS-A-FINANCE-COST / "residential finance costs" / SA105 box (52 impr / 3 clk / pos 3.5) | No collision — DISTINCT intent. One-line "what counts" + forward-link. **Do NOT duplicate the line-by-line finance-cost taxonomy.** |
| Residual (intra) | section-24-tax-relief-complete-guide | GSC pos 88, near-dormant — the WEAKER page | No action now. If anything, this dormant page is the candidate that could later REDIRECT INTO this one — never the reverse. |
| Rewritten pillar | 2027-property-income-tax-rates-landlords-uk | 2027/28 rates pillar | No collision — forward-link from our new "Section 24 in 2027/28" H2. |
| Residual / trial brief | 2027-property-tax-rates-section-24-relief-uk-landlords | 2027 rates + S24 applied | No collision (that page is the 2027-specific applied page; this is the evergreen definition). Reciprocal link. |

**Conclusion:** **REWRITE in place.** No REDIRECT-PROPOSED, no FLAG-MANAGER. Collapse is forbidden twice over: (1) the standing REWRITE-ONLY rule (memory: `feedback_rewrite_only_no_collapse.md`), and (2) live Bing page-1 head-term equity (§16.T2 collapse guard would flip any reversed collapse to REWRITE anyway — never 301 a pos-3-5 page into a sibling). Differentiation discipline: this page OWNS the definition and forwards OUT; the siblings own claim-mechanics and finance-cost-definition and forward back.

---

## Closest existing pages (Stage 2 — internal-link targets within the live corpus)

Forward-links FROM this page (each is the canonical owner of a job this page should NOT duplicate):

- **Claim mechanics:** `claim-mortgage-interest-rental-property-uk-section-24` (rewritten) — link from "how the 20% credit is given" / Strategies, for "how to claim on your return".
- **Finance-cost definition:** `finance-costs-section-24-complete-guide` (rewritten) — link from the "what counts as a finance cost" one-liner.
- **Calculator:** `section-24-calculator` (or the cluster calculator page; confirm exact slug at execution) — link from the worked-example section for "run your own numbers".
- **Incorporation (main mitigation):** `buy-to-let-limited-company-complete-guide-uk` (rewritten pillar) — link from Strategies, as the principal mitigation route (companies deduct interest in full pre-CT per §4).
- **2027/28 rates pillar:** `2027-property-income-tax-rates-landlords-uk` (rewritten) — link from the new "Section 24 in 2027/28" H2.
- **2027 S24-applied:** `2027-property-tax-rates-section-24-relief-uk-landlords` (residual; trial brief #3) — reciprocal.
- **CGT pillar:** `capital-gains-tax-property-complete-guide-uk` (rewritten) — link from the incorporation-cost caveat (CGT on transfer).
- **MTD threshold:** `mtd-itsa-qualifying-income-test-gross-vs-net` (Wave 3 B1) or the MTD pillar — link from the corrected MTD-threshold mention.

Back-links TO this page: it is the definitional pillar, so the claim sibling, the finance-costs sibling, the calculator, and the city pages should point their "what is Section 24" references here. Add reciprocal forward-links where the rewrite touches them only via the corpus link survey (do not edit siblings in this brief's scope unless a reciprocal link is trivially safe).

---

## House-position references (Stage 1)

- **§4 Section 24 — finance cost restriction** [LOCKED] — the primary spine. The 20% basic-rate credit; the three-part cap (lower of 20% finance costs / 20% residential rental profit before finance costs / 20% taxable income above the personal allowance); indefinite carry-forward of the un-credited portion; applies to individuals, partnerships, trusts (NOT companies); FHL caught since 6 April 2025; and the **2027/28 22% reducer (FA 2026 Sch 1, ITTOIA 2005 ss.274AA/274C + ITA 2007 s.399B)**. Match exactly.
- **§7 April 2027 property income tax surcharge** [LOCKED, FA 2026 Royal Assent **18 March 2026**, ss.6-7] — property income taxed at **22/42/47** for 2027/28 in **England, Wales and NI** (only Scotland carved out); reducer at 22%; **"no new wedge"** for basic-rate, and higher/additional-rate wedge does NOT widen (20pp / 25pp, unchanged). State as enacted. The Welsh/Scottish self-setting power (FA 2026 s.8 / Sch 2) is a future enabling power NOT in force for 2027/28.
- **§3 MTD for ITSA** [LOCKED] — threshold £50,000 from 6 April 2026, £30,000 from 6 April 2027, £20,000 from 6 April 2028; companies outside MTD ITSA. Use to fix the threshold-less "April 2026" MTD mention.
- **§5 CGT on UK residential property 2026/27** [LOCKED] — 18%/24% + £3,000 AEA; CT 19%/25%; used only for the incorporation-cost caveat (CGT/SDLT on transfer). Page's existing CGT 18/24 + CT 19/25 are correct — preserve.
- **§13 Do-not-write list** [LOCKED] — NO pricing, NO real client names, anonymised social proof only; the §4/§7 do-not-write sentences above.

---

## House-position conflict flag (Stage 2)

**Confirmed conflict — STALE-BY-OMISSION (the inverse §16.22 / §16.30 pattern).** The published page is locked to 2025/26 and is now **MISSING enacted law**: it omits the FA 2026 2027/28 22% reducer and 22/42/47 property income rates entirely (the "Looking Ahead" H2 is silent). This is the inverse of the usual hazard (asserting Bill-form as enacted) — here the risk is the page reads as out-of-date because it predates the 18 March 2026 Royal Assent.

Execution session MUST:
- **Re-verify §7 / §4 against legislation.gov.uk at write time** (the F-37 verify-at-write discipline): confirm Finance Act 2026 Royal Assent date (18 March 2026), ss.6-7, Sch 1, and the ITTOIA 2005 ss.274AA/274C + ITA 2007 s.399B amendments. Confirm s.272A is live + in force (inserted by Finance (No.2) Act 2015 s.24 — the literal origin of the name "Section 24") and the reducer mechanism at ITA 2007 ss.274A-274C.
- **Add the 2027/28 law as ENACTED**, not proposed/draft, with the "no new wedge" consequence stated correctly per §7.
- Fix the stale year labels (pension AA; MTD threshold).

Flag to `track2_site_wide_flags.md` as: **STALE_FACTS (by omission) | 2026-05-30 | HIGH | section-24-mortgage-interest-restriction-uk-landlords | Page omits enacted FA 2026 2027/28 22% reducer + 22/42/47 rates; "Looking Ahead" silent on 2027/28; pension-AA + MTD year labels stale. Add as enacted law per §4 + §7; verify Royal Assent 18 March 2026 at write time.**

---

## Statute spine (every section number + Act — VERIFY each at legislation.gov.uk at write time)

| Citation | Act | Use in body | Verification note |
|---|---|---|---|
| **ITTOIA 2005 s.272A** | Income Tax (Trading and Other Income) Act 2005 (inserted by **Finance (No.2) Act 2015 s.24**) | "Restricting deductions for finance costs related to residential property" — the **literal origin of the name "Section 24"**; the definition section. | Confirmed live + in force at legislation.gov.uk per diagnosis; re-confirm. The "Section 24" name comes from F(No.2)A 2015 **s.24**, which inserted ITTOIA 2005 s.272A. State both clearly. |
| **ITTOIA 2005 s.272B** | ITTOIA 2005 | Phasing rules (2017/18-2019/20 transition) — historical context only. | Verify still present. |
| **ITA 2007 s.274A** | Income Tax Act 2007 | The **tax-reduction (reducer) mechanism** — how the 20% basic-rate credit is given. | Verify. |
| **ITA 2007 s.274AA** | Income Tax Act 2007 | The reducer / cap interaction (the three-part cap mechanics live here / s.274C). | Verify; §4 cites ss.274AA/274C for the 2027/28 amendment. |
| **ITA 2007 s.274B / s.274C** | Income Tax Act 2007 | Carry-forward of the un-credited portion + cap definitions. | Verify; the indefinite carry-forward is the s.274 mechanism. |
| **ITA 2007 s.399B** | Income Tax Act 2007 | Reducer for property income within the 2027/28 rate framework (amended by FA 2026 Sch 1). | Verify per §7. |
| **Finance Act 2026 ss.6-7 + Sch 1** | Finance Act 2026 (Royal Assent **18 March 2026**) | The 2027/28 22/42/47 property income rates + the 22% reducer (amending ITTOIA 2005 ss.274AA/274C + ITA 2007 s.399B). | **Verify Royal Assent date AND the section/schedule numbers at write time** (F-37 Bill-vs-enacted discipline). State as enacted. |
| **CTA 2009 / CTA 2010 (company contrast)** | Corporation Tax Acts | Cite only to anchor "companies deduct interest in full pre-CT" — the incorporation contrast under §4. | Light cite; do not over-cite. |

**(Execution session selects which to render as inline legislation.gov.uk hyperlinks — target 4-7 in body.)**

---

## Authority links worth considering (Stage 2 — verify all at execution)

| URL | Use case | Verification note |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2005/5/section/272A | ITTOIA 2005 s.272A (the definition / origin of "Section 24") | Verify live + operative wording present (the F-8 "URL live but wording substituted" hazard). |
| https://www.legislation.gov.uk/ukpga/2007/3/section/274A | ITA 2007 s.274A (reducer mechanism) | Verify. |
| https://www.legislation.gov.uk/ukpga/2015/33/section/24 | Finance (No.2) Act 2015 s.24 (the section that inserted s.272A — the namesake) | Verify; this is the citation that explains WHY it's called "Section 24". |
| https://www.gov.uk/guidance/changes-to-tax-relief-for-residential-landlords-how-its-worked-out-including-case-studies | HMRC guidance: "Changes to tax relief for residential landlords" (with case studies) | Verify 200 + content; the canonical HMRC explainer to cross-reference. |
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2054 (and PIM2056 onwards) | HMRC PIM — finance-cost restriction mechanics | Verify exact PIM section at write time (do NOT guess manual numbers — the PIM4101 hallucination precedent). |
| Finance Act 2026 c.[X] (legislation.gov.uk) — ss.6-7 + Sch 1 | The enacted 2027/28 rates + 22% reducer | **Verify chapter number + Royal Assent 18 March 2026 + section/schedule numbers at write time.** |
| https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax | MTD ITSA threshold cross-reference | Verify; for the corrected MTD-threshold mention. |

---

## Content plan — section-by-section to ~3,000 words

Target: ~3,000 body words, 12-13 H2s, 12-14 FAQs, 1-3 inline `<aside>` CTAs (auto-styled by `.prose-blog aside`; LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated), 2 reference tables, 2 dual-rate worked examples, 4-7 authority links. Plain HTML in frontmatter body (`<p>`, `<h2>`, `<table>`), NO markdown syntax, NO Tailwind classes, NO em-dashes, NO pricing, anonymised proof only.

1. **Definitional opener (no H2, first 40 words)** — answer "what is Section 24" in the first two sentences for snippet capture: Section 24 (formally ITTOIA 2005 s.272A, inserted by Finance (No.2) Act 2015 s.24) stops individual residential landlords deducting mortgage and other finance costs from rental profit; instead they get a basic-rate tax credit. This is the Bing-head-term capture sentence.

2. **H2: What is Section 24 and why is it called that?** (~250 words) — the name comes from s.24 of Finance (No.2) Act 2015, which inserted ITTOIA 2005 s.272A; phased in 2017/18-2019/20, fully in force since 2020/21. Who it applies to (individuals, partnerships, trusts) and who it does NOT (companies). One-line "what counts as a finance cost" + forward-link to `finance-costs-section-24-complete-guide`.

3. **H2: How Section 24 works: the before-and-after** (~300 words) — the mechanical shift from full deduction to a 20% basic-rate credit. **TABLE 1 (reference/"before vs after"):**
   - Columns: `Item` | `Before Section 24 (pre-2017)` | `Under Section 24 (2026/27)`
   - Rows: Treatment of mortgage interest (deducted from profit / not deducted) · Relief mechanism (full deduction at marginal rate / 20% basic-rate tax credit) · Effect on taxable income (lower / higher, interest added back) · Basic-rate landlord net effect (neutral-ish / largely neutral) · Higher-rate landlord net effect (40% relief / 20% relief, a 20pp wedge) · Companies (always full deduction pre-CT / unchanged, full deduction).
   - Forward-link to the claim sibling for "how the credit is given on your return" (do NOT duplicate the SA105 box).

4. **H2: The three-part cap on the credit** (~280 words) — per §4: the credit is the **lower of** (a) 20% of finance costs, (b) 20% of residential rental profit before finance costs, (c) 20% of taxable income above the personal allowance. Indefinite carry-forward of the un-credited portion (ITA 2007 s.274B/C). Plain-English worked micro-example of the cap biting. Forward-link to calculator.

5. **H2: Worked example 1 — a higher-rate landlord (2026/27)** (~300 words) — **Worked example, rebuilt cleanly** against §4. Pick ONE internally-consistent profile (e.g. £55,000 employment + £18,000 rental profit before interest, £9,000 mortgage interest). Show: rental profit taxed in full, tax at 40% on the rental slice, then the 20% credit (= lower of £9,000×20% / profit×20% / taxable-income-above-PA×20%), net additional tax, and the effective wedge. **This replaces the muddled £1,443/"100% increase" example.** Show the arithmetic step by step so an independent QA recompute reconciles.

6. **H2: Worked example 2 — the same landlord in 2027/28 (the 22% reducer)** (~250 words) — **Second worked example**, same profile, run under the **enacted FA 2026** 2027/28 framework: property income at 42% (higher rate), reducer at **22%** (not 20%). Demonstrate §7 "no new wedge": the higher-rate wedge is 42−22 = 20pp, the SAME as the 2026/27 40−20 = 20pp; it does NOT widen. **TABLE 2 (rates/thresholds reference):**
   - Columns: `Tax year` | `Property income rates (England/Wales/NI)` | `S24 reducer rate` | `Basic-rate wedge` | `Higher-rate wedge` | `Additional-rate wedge`
   - Rows: `2026/27` → 20/40/45 · 20% · 0pp · 20pp · 25pp; `2027/28 onwards` → 22/42/47 · 22% · 0pp · 20pp · 25pp.
   - State as enacted (FA 2026, Royal Assent 18 March 2026). Scotland carved out. Forward-link to the 2027 rates pillar.

7. **H2: Who is affected** (~250 words) — rebuild the muddled "Who is Affected" H2 with ONE consistent figure set. Basic-rate landlords largely unaffected by the credit itself BUT can be tipped into higher rate because rental profit is grossed up; higher/additional-rate landlords carry the wedge; companies unaffected. No mixing of £25k/£35k figures.

8. **H2: The hidden threshold knock-ons** (~280 words) — the part competitors miss and the distinctiveness lever: because rental profit is added to total income BEFORE the credit, Section 24 can trigger:
   - **The 60% effective marginal rate** (personal allowance taper £100,000-£125,140, §4 cross-ref).
   - **High Income Child Benefit Charge (HICBC)** thresholds.
   - **Student loan repayment** thresholds.
   - **MTD for ITSA** scope (gross income test): cite §3 threshold £50,000 (April 2026) / £30,000 (April 2027) / £20,000 (April 2028) — **this fixes the threshold-less "April 2026" stale mention.**
   - Pension annual allowance interaction — **fix the "2024/25 £60,000" year label** to current-year framing (£60,000 still current).

9. **H2: Section 24 in 2027/28: the 22% reducer** (~250 words) — **rebuild the thin "Looking Ahead" H2 into substantive enacted-law coverage.** FA 2026 (Royal Assent 18 March 2026), ss.6-7 + Sch 1: 22/42/47 property income rates and the 22% reducer from 6 April 2027 in England, Wales and NI (Scotland carved out). Why basic-rate landlords see no new wedge; why higher/additional-rate wedge is unchanged. Forward-link to 2027 pillar. (Overlaps Worked Example 2 deliberately for the readers who skim to this H2.)

10. **H2: Strategies to manage the impact** (~280 words) — overview ONLY, forwarding OUT (do not duplicate sibling depth): incorporation (companies deduct interest in full pre-CT — the principal mitigation; forward-link to BTL ltd-co pillar) with the CGT/SDLT-on-transfer caveat (§5); spousal income shifting / Form 17; offsetting other allowable costs; the carry-forward of un-credited finance costs. One inline `<aside>` CTA after this section (discovery-call framing, NO pricing).

11. **H2: Common mistakes and misconceptions** (~200 words) — debunk the §4 do-not-write list framed as reader misconceptions: "mortgage interest is fully deductible" (only for companies), "Section 24 is being repealed" (in force), "it doesn't apply to higher-rate taxpayers" (it does — that's the point), "the reducer stays at 20% in 2027/28" (rises to 22%).

12. **H2: When to get specialist advice** (~150 words) — anonymised framing, discovery-call CTA, NO pricing, NO client names.

13. **H2: Related reading** — the forward-link block (claim sibling, finance-costs sibling, calculator, incorporation pillar, 2027 pillar, CGT pillar, MTD).

**FAQs (12-14, frontmatter `faqs:` array; FAQPage auto-emitted — never hand-add FAQ schema in body).** Map verbatim to query targets where possible:
- "What is Section 24 for landlords?" (head-term)
- "What is clause 24 for landlords?" (the "clause 24" misspelling-adjacent variant)
- "What is the Section 24 tax credit?" ("section 24 credit")
- "Does Section 24 still apply in 2025/26 and 2027/28?"
- "How much extra tax will Section 24 cost me?" (**preserve the existing clean £10k → £2,000 answer**)
- "Does Section 24 apply to limited companies?" (no)
- "Does Section 24 apply to furnished holiday lets?" (yes since 6 April 2025)
- "Will the Section 24 reducer rise to 22% in 2027/28?" (yes, FA 2026, enacted)
- "Does Section 24 affect my personal allowance / child benefit / student loan?" (threshold knock-ons)
- "What is the three-part cap and what is carry-forward?"
- "How is Section 24 different from the finance-cost restriction?" (forward to finance-costs sibling)
- "How do I claim the Section 24 credit on my tax return?" (forward to claim sibling)
- "Is incorporation the answer to Section 24?" (forward to BTL ltd-co pillar, no pricing)
- "Does Section 24 apply in Scotland?" (income tax rates differ; restriction mechanism applies; 2027/28 Scotland carve-out)

---

## Query-coverage plan

| Query | source | impr | pos | served-in |
|---|---:|---:|---:|---|
| what is section 24 | bing | 1 | 3 | H1 + definitional opener |
| what is section 24 for landlords | bing | 1 | 4 | metaTitle + FAQ1 |
| ehat is clause 24 landlords | bing | 1 | 5 | FAQ2 ("What is clause 24 for landlords?") |
| residential landlord tax relief on mortgage costs 2025 | bing | 1 | 7 | H2#2 (How Section 24 works: the before-and-after) |
| residential landlord tax relief on mortgage costs 2025 tax return | bing | 1 | 6 | FAQ12 ("How do I claim the Section 24 credit on my tax return?") + forward-link |
| section 24 mortgage interest relief strategy | gsc | 1 | 60 | H2#10 (Strategies to manage the impact) |
| section 24 | adjacent | 9 | 6 | metaTitle + H1 |
| what is section 24 tax | adjacent | 2 | 3 | FAQ3 ("What is the Section 24 tax credit?") |
| finance costs restriction for landlords | adjacent | 2 | 2 | FAQ11 ("How is Section 24 different from the finance-cost restriction?") |
| section 24 credit | adjacent | 1 | 5 | H2#4 (The three-part cap on the credit) |
| mortgage interest relief | adjacent | 5 | 5 | metaDescription + body§ (definitional opener) |
| let property tax changes uk and mortgage interest relief | adjacent | 2 | 7 | H2#9 (Section 24 in 2027/28: the 22% reducer) |

Each target query is assigned exactly once.

---

## Meta plan

- **metaTitle (<=62):** `What Is Section 24? Mortgage Interest Restriction Guide` (54 chars) — leads with the Bing head-term word order ("what is section 24"). Test a planning-led alternate at execution: `Section 24 Mortgage Interest Restriction: 2026 & 2027 Guide` (57 chars).
- **metaDescription (<=158):** `What Section 24 means for UK landlords: how the 20% mortgage interest credit works, who it hits, the three-part cap, and the 22% reducer from April 2027.` (151 chars) — head-term + threshold + enacted-2027 hook; NO pricing.
- **h1:** `Section 24 Mortgage Interest Restriction: A Plain-English Guide for UK Landlords`
- **summary (frontmatter `summary:`):** `This is the definitional Section 24 pillar for UK landlords: what the rule is (ITTOIA 2005 s.272A, from Finance (No.2) Act 2015 s.24), how the 20% basic-rate credit replaced full mortgage interest relief, the three-part cap, who is affected, the threshold knock-ons (60% taper, HICBC, student loan, MTD), and the enacted 22% reducer from April 2027 under Finance Act 2026. For how to claim on your return see our claim guide; for what counts as a finance cost see our finance-costs guide.`

---

## Schema plan

- **reviewedBy:** `ICAEW Qualified Senior Reviewer` (the real, corpus-standard reviewer used across executed Property blog posts; verified present on `claim-mortgage-interest-rental-property-uk-section-24` cluster siblings and 100+ other pages).
- **reviewerCredentials:** `Chartered Accountant (ACA, ICAEW), Property Tax Specialist` (corpus-standard credential string; emitted as `jobTitle` on the `reviewedBy` Person per `Property/web/src/lib/schema.ts`).
- **author byline (locked):** `Property Tax Partners Editorial Team` (do not change).
- **howTo:** `false` — this is a definitional/explainer pillar, not a step-by-step procedure page; no HowTo JSON-LD.
- **dateModified:** `2026-05-30`.
- **JSON-LD blocks emitted:** **Article (BlogPosting)** + **FAQPage** (auto-emitted from the frontmatter `faqs:` array by `buildBlogPostingJsonLd`; the `reviewedBy` Person is added to the BlogPosting). **No HowTo block.**

---

## Universal rules (do not skip)

(Inherited from parent program per TRACK2_PROGRAM §4 sections 13 + 14 — `NETNEW_PROGRAM.md §4` voice block + `competitor_rewrite_playbook.md §5`. Critical for THIS brief: NO em-dashes anywhere. NO pricing / fees (Decision E: even soft "general-market £X-£Y" fee comparisons are a pricing-leak — flag/strip). NO real client names; anonymised social proof only. Plain HTML body, no Tailwind classes. LeadForm auto-injected by `BlogPostRenderer.tsx` — never duplicated; 1-3 inline `<aside>` CTAs at conversion moments. FAQs in frontmatter `faqs:` array (target 12-14); FAQPage auto-emitted — never hand-add FAQ schema. **Every statute citation verified against legislation.gov.uk at write time, including the FA 2026 Royal Assent date of 18 March 2026 — the F-37 Bill-vs-enacted/by-omission discipline.**)

---

## 19-step workflow (legacy-rewrite adaptation)

1. Read `docs/property/house_positions.md` §4, §7, §3, §5, §13 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / execution status as applicable).
3. Read this brief end-to-end.
4. **Resolve the flat-vs-nested URL split FIRST** — check `Property/web/src/middleware.ts` for a `/blog/<slug>` → `/blog/section-24-and-tax-relief/<slug>` 301; confirm the frontmatter `canonical` resolves and equity is not split. Then **verify §4 + §7 against legislation.gov.uk** (FA 2026 Royal Assent 18 March 2026; ss.6-7 + Sch 1; ITTOIA 2005 s.272A + ss.274AA/274C; ITA 2007 ss.274A-274C + s.399B; Finance (No.2) Act 2015 s.24). This is the load-bearing pre-rewrite verification.
5. Re-fetch the 4 competitor URLs to confirm 200 liveness + date-stamp at execution (reject/replace non-200).
6. Read the current source file in full.
7. Read the two rewritten siblings (`claim-mortgage-interest-rental-property-uk-section-24`, `finance-costs-section-24-complete-guide`) for differentiation discipline — confirm we do NOT duplicate the SA105-box walkthrough or the finance-cost taxonomy.
8. Plan the outline: 12-13 H2s, ~3,000 body words, 12-14 FAQs, 2 reference tables, 2 dual-rate worked examples.
9. **Rewrite markdown at the existing path** (NOT a new file). Preserve slug + canonical (subject to step-4 resolution); update `dateModified` to 2026-05-30; add `reviewedBy` + `reviewerCredentials` frontmatter; update metaTitle/metaDescription/h1/summary per the Meta plan.
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Run six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title <=62; meta description <=158; all internal links resolve. **Plus pricing-check:** `£[0-9]` matches only inside tax-figure context (e.g. £100,000 taper, £50,000 MTD), never a fee quote.
12. Confirm no redirect needed (slug kept; this is the definitional pillar). If step 4 found a flat-vs-nested split, add the 301 to consolidate equity onto the canonical.
13. Update `monitored_pages` Supabase row (insert if not tracked; 90-day window from rewrite date; flag the Bing head-term cluster as the watch metric since GSC is dead for the cluster).
14. Commit on `main` (or feature branch per dispatch mode): `Track 2A: rewrite section-24-mortgage-interest-restriction-uk-landlords (STALE-by-omission + thin-depth pillar lift; add enacted FA 2026 2027/28 22% reducer)`.
15. Update `track2_page_tracker.md`: mark ✅ executed.
16. Update `track2_site_wide_flags.md` with the STALE-by-omission flag + the URL-split finding.
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries for inter-batch awareness (the URL-split pattern may recur across the dense Section 24 cluster).
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §4 Section 24 (20% credit + three-part cap + carry-forward): __
- §7 April 2027 — lock status at write: __ enacted via FA 2026 (assert with citation, Royal Assent 18 March 2026) / __ unexpectedly not yet enacted (hedge — should NOT happen)
- §3 MTD threshold (£50k/£30k/£20k): __
- §5 CGT/CT incorporation caveat (18/24; 19/25): __
- §13 do-not-write (no pricing, no client names): __

### URL-split resolution (step 4)
- middleware 301 flat→nested present? __ / added? __
- canonical resolves to: __

### Comparison: before vs after
- Body word count: 1,455 → __
- H2 count: 10 → __ (target 12-13)
- FAQ count: 5 → __ (target 12-14)
- Statute citations: 0 → __ (target 4-7)
- Authority links: 0 → __
- Reference tables: 0 → __ (target 2)
- Worked examples: 2 (muddled) → __ (target 2, rebuilt + reconciling, dual-rate)
- Inline CTAs: __ → __ (1-3)
- reviewedBy / reviewerCredentials added: __

### Flags raised
- STALE-by-omission (carried from brief): enacted 2027/28 law added: __
- URL-split finding: __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
