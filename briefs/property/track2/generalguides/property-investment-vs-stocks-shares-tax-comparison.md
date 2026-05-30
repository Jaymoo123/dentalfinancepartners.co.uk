# Track 2 brief: property-investment-vs-stocks-shares-tax-comparison

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief (STALE-FACTS load-bearing pivot)
**Source markdown path:** `Property/web/content/blog/property-investment-vs-stocks-shares-tax-comparison.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/property-investment-vs-stocks-shares-tax-comparison
**Stage 1 priority:** H (net-new uncannibalised query class + a load-bearing wrong-advice correction; the current page actively misleads on the comparison spine)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (source markdown read; statutes re-verified on legislation.gov.uk + gov.uk at write time)
**Cannibalisation status:** REWRITE (clean, distinct intent — no on-site page owns the cross-asset tax-comparison decision)

> This brief is drafted to gold-reference depth, matching `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` (the depth match-target) and the `birmingham-property-accountant.md` rewrite-reference template. Every statute below was re-verified on legislation.gov.uk at write time (results recorded inline). Do not restate the durable context (TRACK2_PROGRAM §4/§7/§13/§14/§15, house_positions §1-§28, competitor_rewrite_playbook 19-step workflow); cite by section number only.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `property-investment-vs-stocks-shares-tax-comparison`. The slug carries the cross-asset decision intent precisely and there is no stronger sibling to collapse into (see Cannibalisation). No redirect proposed.
- **Category:** `Landlord Tax Essentials` (kept). Canonical path stays `/blog/landlord-tax-essentials/property-investment-vs-stocks-shares-tax-comparison`. Do NOT change the slug or canonical (the page already has 1,536 words of indexable history; a slug change would discard it and trigger a needless redirect).
- **Gap-mode tags:** `STALE_FACTS` (primary, load-bearing) + `THIN_DEPTH` (secondary, 1,536 → ~3,200) + `INVISIBLE` (tertiary, no GSC signal yet) + `STRUCTURE` (no comparison table, no authority citations to legislation, 4 FAQs vs 12-14 floor).
- **"Why this rewrite" angle:** The page's entire comparison spine rests on a CGT rate-differential that **no longer exists**. Since 30 October 2024 (Autumn Budget 2024) all individual chargeable gains, property AND shares, are charged at the unified 18%/24% (TCGA 1992 s.1H, verified live 2026-05-30). The source repeats the pre-Budget "shares 10%/20% vs property 18%/24%" framing at four load-bearing points (FAQ #1, FAQ #3, body H2 "Capital Gains Tax", Key Takeaways bullet 3) and builds a worked example on it. That worked example and its conclusion ("selling shares is generally more tax-efficient than selling a rental property") are now **wrong on the CGT axis**. The rewrite must re-anchor the comparison off the dead rate-differential and onto the four differentiators that actually survive: (1) the ISA/SIPP/pension wrapper (no property equivalent), (2) income-treatment (rental property income vs dividends, with the separate property income rates from 6 April 2027), (3) Section 24 finance-cost restriction (no shares analogue), (4) the third option, incorporation. Several live competitors (the MoneyWeek / NRLA cluster) still repeat the stale 10%/20% shares figure, so getting this right is a genuine differentiator, not catch-up.

---

## Current page snapshot (Stage 2 — filesystem read 2026-05-30)

**Filesystem source read (`property-investment-vs-stocks-shares-tax-comparison.md`):**
- **Word count (body):** ~1,536
- **H2 sections (10):** How Is Income from Property Taxed? · How Is Income from Stocks and Shares Taxed? · Capital Gains Tax: Property vs Shares · Allowances and Reliefs: A Side-by-Side Comparison · The Impact of Section 24 on Property Investors · Corporation Tax: Property in a Limited Company · Borrowing and Risk: Tax Implications · Making Tax Digital (MTD) for Landlords · Practical Example: Comparing Tax Bills · Which Investment Is More Tax-Efficient? · Key Takeaways
- **metaTitle:** "Property vs Stocks Tax: Which Investment Wins in 2026?" (53 chars — OK length, generic "wins" framing)
- **metaDescription:** "Compare the tax treatment of buy-to-let property and stocks & shares in the UK for 2026/27. Income tax, CGT, allowances, and key differences explained." (149 chars — uses ampersand "&"; acceptable but bland)
- **h1:** "Property Investment vs Stocks and Shares: A Tax Comparison for UK Investors"
- **FAQ count (frontmatter `faqs:`):** 4 (target 12-14)
- **Outbound authority links:** 4 references but LOW QUALITY — `ref-1` = att.org.uk (not primary), `ref-2` = `http://aka.hmrc.gov.uk/cgt/intro/report-gain.htm` (**legacy HTTP `aka` redirect, dead link — must be replaced**), `ref-3` = gov.uk/tax-sell-shares, `ref-4` = fca.org.uk. ZERO links to legislation.gov.uk and zero to the unified-rate gov.uk page.
- **Internal links:** 6 (landlord-deductions list, PPR relief, Section 24 guide, BTL ltd-co guide, property-investment-tax pillar, /contact)
- **Worked examples:** 2 (both partially stale — the dividend example uses correct 35.75% but the comparison conclusion leans on the dead CGT differential)
- **Schema present:** Y (FAQPage auto-emitted from frontmatter; do NOT hand-add)
- **Last meaningful edit:** 2026-05-19 (frontmatter `date` + `dateModified`); `sourcesVerifiedAt: 2026-05-19`

**Confirmed STALE assertions on the live page (line refs for the execution session):**
- Line 17 (FAQ #1): "capital gains on property are taxed at higher rates (18%/24%) compared to shares (10%/20%)" — WRONG.
- Line 21 (FAQ #3, titled "What are the CGT rates ... in 2025/26"): "For shares and other assets (excluding property), the rates are 10% for basic rate and 20% for higher rate" — WRONG + wrong tax-year label.
- Line 48-49 (body H2 CGT): "For shares and other assets (excluding property), the CGT rates are lower: 10% ... 20% ... selling shares is generally more tax-efficient than selling a rental property" — WRONG conclusion.
- Line 85 (Key Takeaways): "CGT on property is 18%/24%, while CGT on shares is 10%/20%." — WRONG.
- Line 40 + 83: April 2027 22/42/47 already stated; framing is borderline (treats it as a coming change — must be re-stated as ENACTED law per §7, see conflict flag).

---

## GSC angle (last 90 days) — INVISIBLE baseline

Per the diagnosis input: **no GSC query anywhere on the site captures the property-vs-stocks/shares decision intent.** This page is `INVISIBLE` (no impressions / no clicks recorded), consistent with its 2026-05-19 publication date (too new for organic signal, the same pattern as the Medical-scaffold and airbnb-trial INVISIBLE cases). The nearest siblings are themselves near/fully invisible:

| Sibling | Intent | GSC signal |
|---|---|---|
| property-investment-tax-uk-complete-guide-2026 | Broad landlord-tax pillar | ZERO impressions |
| tax-efficient-property-investment-structure-guide | Personal vs Ltd-Co structuring | 5 queries / 19 impr / 0 clk / pos 55 |
| rental-yield-vs-roi-property-investors-uk | Returns metrics (not tax) | 84 impr / pos 73 |
| property-investment-exit-strategy-planning-guide | Exit planning | 8 impr / pos 58 |

**Implication for the rewrite (per §16.T4 + INVISIBLE handling):** the load-bearing lever is NOT a meta/CTR rewrite (there is no impression base to convert). The levers are (a) **correctness** — fix the wrong CGT advice before it earns any traffic on a falsehood; (b) **depth + uniqueness** — own a net-new query class no competitor serves correctly; (c) **structured comparison table + 12-14 FAQs targeting the decision-intent long tail** ("is property or shares better for tax uk", "buy to let vs stocks and shares tax", "are shares more tax efficient than property uk 2026"). **monitored_pages window: 180 days from rewrite** (INVISIBLE-baseline pages need the longer window per the F-11 recommendation; do NOT judge at +90d).

GA4: no meaningful session data (page is ~11 days old at brief date). Defer GA4 read to execution.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: STALE_FACTS (load-bearing, same class as F-29 commercial-vs-residential).** The page's comparison spine is built on a CGT rate-differential that the Autumn Budget 2024 abolished. TCGA 1992 s.1H (verified live 2026-05-30, headed "The main rates of CGT") charges ALL individual chargeable gains at 18%/24%; s.1I decides which of the two applies by reference to the taxpayer's unused basic-rate band. There is **no longer a property-vs-shares CGT rate gap.** The source's central claim ("selling shares is generally more tax-efficient than selling a rental property") collapses on the CGT axis, and its Practical Example loses its CGT leg. This is the rewrite's first and most important job: strip every 10%/20% shares-CGT assertion and re-frame.

**The re-anchored comparison spine (what actually differs in 2026/27):**
1. **Wrapper.** This is now the single biggest structural tax difference. Shares can sit inside an ISA (£20,000/yr) or a pension/SIPP, sheltering both income and gains entirely. **There is no equivalent wrapper for direct residential BTL.** (REITs/property funds inside an ISA give indirect, wrapped property exposure — worth a dedicated H2 because it is the honest "you CAN get wrapped property exposure" nuance the competitors miss.)
2. **Income treatment.** Rental profit is taxed as property income; dividends are taxed at the dividend rates with the £500 allowance. For 2026/27 both rental and dividend income interact with the same income tax bands, but from **6 April 2027 property income moves to separate 22%/42%/47% rates** (enacted, see §7), while dividends stay on their own scale. This divergence (not a CGT gap) is the live story.
3. **Section 24.** The finance-cost restriction has no shares analogue and is the real reason geared individual landlords face a structurally higher effective tax cost than a share investor who does not borrow. This is where "property is less tax-efficient" is actually TRUE — but for the Section 24 / income reason, not the (now-dead) CGT reason.
4. **Incorporation as the third option.** A correct cross-asset piece must present the Ltd-Co route (CT framework + extraction friction) as the structural answer many landlords reach for, without overstating it.

**Secondary: THIN_DEPTH.** 1,536 words against a ~3,200 target. The page asserts conclusions without modelling them; it has no side-by-side comparison table (the single highest-value snippet-bait element for a "vs" query) and no scenario-based worked examples beyond one stale pair.

**Tertiary: INVISIBLE + STRUCTURE.** No GSC base; no comparison table; 4 FAQs; zero legislation.gov.uk citations; a dead `aka.hmrc.gov.uk` reference. The structural fixes (table-at-top, 12-14 FAQs verbatim-matching decision queries, verified legislation citations) are what let a net-new page earn the query class.

**Load-bearing fix sequence (ordered by ROI):**
1. **Correct the CGT axis everywhere** (FAQ #1, FAQ #3, body H2, Key Takeaways, worked example). Replace "shares 10%/20%" with the unified 18%/24% and pivot the "which is more tax-efficient" reasoning onto wrapper + income + Section 24.
2. **Re-state April 2027 as enacted law** (FA 2026 ss.6-7, Royal Assent 18 March 2026), not a coming proposal, applying England, Wales and NI (Scotland carved out); reducer rises to 22% with no new basic-rate wedge (§7).
3. **Add a comparison table at the top** (Property vs Shares-direct vs Shares-in-ISA/SIPP across income, CGT, wrapper, borrowing-relief, reporting). Snippet-bait for the "vs" intent.
4. **Body lift to ~3,200 words** with the four-pillar re-anchored spine + 3-4 scenario worked examples (basic-rate, higher-rate-geared, ISA-sheltered, incorporated).
5. **FAQ count 4 → 12-14**, each targeting a decision-intent query verbatim; FAQ #3 retitled to 2026/27 and corrected.
6. **Authority links: 4-6 verified legislation.gov.uk / gov.uk citations** replacing the dead `aka` link.
7. **Forward-link OUT** to the structuring guide, the 2027 income-rates page, the Section 24 pillar, the CGT pillar, and the BTL Ltd-Co guide rather than duplicating their depth (per the diagnosis distinctness rule).

---

## Competitor URLs (Stage 2 — verify liveness at execution per §16.31)

The diagnosis supplied four targets. Re-fetch each at execution (200-check + date-stamp); replace any non-200. **None is a depth ceiling we are chasing — all four omit the wrapper-vs-income-vs-Section-24 re-frame and several carry the stale 10%/20% shares figure, which is our differentiator.**

| URL | Borrow | Differentiate against |
|---|---|---|
| https://freetrade.io/learn/property-vs-stocks | Clean consumer "vs" structure + ISA-wrapper emphasis (their natural angle) | Platform is equities-led; thin on property income tax, no Section 24, no incorporation, no April 2027 |
| https://www.tembomoney.com/learn/buy-to-let-vs-stocks | Plain-English framing of the borrowing/leverage trade-off | Light on statute; no 2027 rates; likely stale CGT framing |
| https://www.pmw.co.uk/property-investment-vs-stocks-and-shares/ | Wealth-manager tone; pension/SIPP angle | Adviser-generic; verify whether it still cites pre-2024 CGT rates |
| https://moneyweek.com/investments/investment-strategy/605267/which-is-best-buy-to-let-or-shares | Market-commentary credibility | **Flagged in diagnosis as likely still repeating stale 10%/20% shares CGT — our correctness is the moat. Do NOT mirror their CGT framing.** |

**Competitor depth benchmark:** consumer "vs" pieces run ~900-1,800 words, 0-2 FAQs, 0 statute citations, no comparison table threading all three options (property / direct shares / wrapped shares), and several are stale on CGT. Our ~3,200-word target with a 3-way comparison table, 12-14 FAQs, 3-4 worked examples, 4-6 verified statute citations, and a correct post-Budget-2024 CGT axis is decisively best-in-class.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (consult the current frozen snapshot at execution).

| Source | Slug | Intent | Resolution |
|---|---|---|---|
| Residual (own) | property-investment-vs-stocks-shares-tax-comparison | Cross-asset TAX comparison decision | REWRITE in place — self |
| Sibling | property-investment-tax-uk-complete-guide-2026 | Broad landlord-tax pillar (ZERO impr) | No collision — pillar; this page forward-links to it for landlord-tax depth |
| Sibling | tax-efficient-property-investment-structure-guide | Personal vs Ltd-Co structuring (5q/19impr/pos55) | No collision — DIFFERENT intent (structure within property). Forward-link to it from the incorporation H2 |
| Sibling | rental-yield-vs-roi-property-investors-uk | Returns metrics, not tax (84 impr/pos73) | No collision — returns not tax. Optional cross-link only if a returns-context sentence warrants it |
| Sibling | property-investment-exit-strategy-planning-guide | Exit planning (8 impr/pos58) | No collision — exit timing, different intent |
| CGT pillar | capital-gains-tax-property-complete-guide-uk | Comprehensive CGT | No collision — forward-link for the CGT-on-property axis; do not re-walk its depth |
| 2027 rates | 2027-property-income-tax-rates-landlords-uk | Property income rates from Apr 2027 | No collision — forward-link for the income-rate detail; this page summarises, does not duplicate |

**Conclusion:** REWRITE in place. **No REDIRECT-PROPOSED — a collapse would be reversed-equity** (illegal per the §16.T2 deterministic collapse guard): this is the only page positioned on the cross-asset tax-comparison decision, and the candidate "stronger" targets are all near/fully invisible. There is no stronger canonical to collapse into. Distinctness on rewrite is maintained by keeping this page strictly on the cross-asset TAX comparison and forward-linking OUT to the deeper single-topic pages rather than reproducing them. If anything, the weaker invisible siblings should later forward-link INTO this page.

---

## Closest existing pages (Stage 2 — verified present in corpus 2026-05-30, exact canonical paths)

Internal-link partners (forward-links OUT, per the distinctness rule):

- **Structuring guide:** `tax-efficient-property-investment-structure-guide` → `/blog/incorporation-and-company-structures/tax-efficient-property-investment-structure-guide` (link from the incorporation H2)
- **2027 income rates:** `2027-property-income-tax-rates-landlords-uk` → `/blog/landlord-tax-essentials/2027-property-income-tax-rates-landlords-uk` (link from the income-treatment H2)
- **Section 24 pillar:** `section-24-mortgage-interest-restriction-uk-landlords` → `/blog/section-24-and-tax-relief/section-24-mortgage-interest-restriction-uk-landlords` (link from the Section 24 H2)
- **Section 24 applied:** `claim-mortgage-interest-rental-property-uk-section-24` → `/blog/section-24-and-tax-relief/claim-mortgage-interest-rental-property-uk-section-24` (secondary Section 24 link)
- **CGT pillar:** `capital-gains-tax-property-complete-guide-uk` → `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` (link from the CGT H2)
- **CGT rates explainer:** `cgt-rates-property-2026-27-current-rates-explained` → `/blog/capital-gains-tax/cgt-rates-property-2026-27-current-rates-explained` (link from the CGT H2 for the unified-rate detail — this is the page that owns the rates-explainer intent)
- **CGT calculation:** `cgt-selling-buy-to-let-property-calculation-guide` → `/blog/capital-gains-tax/cgt-selling-buy-to-let-property-calculation-guide` (optional, from a worked example)
- **BTL Ltd-Co guide:** `buy-to-let-limited-company-complete-guide-uk` → `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` (link from the incorporation H2)
- **Landlord-tax pillar:** `property-investment-tax-uk-complete-guide-2026` → `/blog/landlord-tax-essentials/property-investment-tax-uk-complete-guide-2026` (broad-context link)
- **PPR relief:** `principal-private-residence-relief-landlords` → `/blog/capital-gains-tax/principal-private-residence-relief-landlords` (retain existing link in the reliefs section)

Preserve the existing `landlord-tax-deductions-uk-2026-complete-list` and MTD links if still resolving at execution.

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED]: unified 18%/24% from 30 October 2024 for residential AND non-residential gains; £3,000 AEA; trustees 24% throughout. **This is the primary spine** — the rewrite must use it to overwrite the stale 10%/20% shares framing. (Verified live: TCGA 1992 s.1H = "The main rates of CGT", 18% or 24% for all individual gains; s.1I selects the rate.)
- **§7 April 2027 property income tax** [LOCKED, corrected 2026-05-30]: 22%/42%/47% are ENACTED (FA 2026 ss.6-7, Royal Assent 18 March 2026, effective 6 April 2027), apply to England, Wales and NI (Scotland carved out); the Section 24 reducer rises to 22% (no new basic-rate wedge). State as enacted law, NOT a proposal; do NOT write "England + NI only".
- **§4 Section 24 finance-cost restriction** [LOCKED]: 20% basic-rate tax credit 2026/27, rising to 22% reducer from 2027/28 (FA 2026 Sch 1 amends ITTOIA 2005 ss.274AA/274C + ITA 2007 s.399B). Applies to individuals/partnerships/trusts, never companies.
- **§21.4 Salary vs dividends / CT 2026/27** [LOCKED]: dividend rates **10.75% / 35.75% / 39.35%** with £500 allowance (the source already has these correct — preserve). CT 19% SPR ≤£50k / 25% main ≥£250k / 26.5% effective marginal in the £50k-£250k band.
- **§21.A Corporation-tax three-figure framework** [LOCKED, F-31 anti-drift]: 19% / 25% / 26.5%-effective; do NOT write "19% on profits under £250k" or "25% over £50k". Use for the incorporation H2.
- **§3 / §19 MTD ITSA** [LOCKED]: £50k (Apr 2026) / £30k (Apr 2027) / £20k (Apr 2028); companies outside MTD; dividends/savings interest are NOT qualifying income (so a pure share investor is not in MTD ITSA on that income). Source is already correct here — preserve.
- **§13 Do-not-write list** [LOCKED]: NO pricing/fees; NO real client names; anonymised social proof only. (The diagnosis confirms the current page is pricing-clean; keep it that way, and do not introduce Decision-E-style "£800-£1,500 general-market" fee comparisons.)

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict #1 — STALE_FACTS (CGT rate-differential, load-bearing).** Lines 17, 21, 48-49, 85 assert shares CGT at 10%/20%. Per §5 [LOCKED] and TCGA 1992 s.1H (verified live 2026-05-30), all individual gains are 18%/24% since 30 October 2024 — there is no property-vs-shares CGT differential. The worked example and the "shares more tax-efficient" conclusion that depend on it are wrong. **This is the rewrite's first job.** Flag as **F-NN | 2026-05-30 | HIGH | property-investment-vs-stocks-shares-tax-comparison | STALE_FACTS | shares CGT asserted at 10%/20% at four load-bearing points; unified 18%/24% per TCGA 1992 s.1H since 30 Oct 2024; comparison spine collapses; re-anchor on wrapper + income + Section 24. Same class as F-29.**

**CONFIRMED conflict #2 — §7 framing.** Lines 40 + 83 treat the April 2027 22/42/47 rates as a coming change ("a major change takes effect", "then at separate property income rates"). Per §7 [LOCKED, corrected 2026-05-30] these are ENACTED (FA 2026 ss.6-7, RA 18 March 2026). Re-state as enacted law, apply England + Wales + NI (Scotland excluded), reducer rises to 22% with NO new basic-rate wedge. Verify FA 2026 ss.6-7 status on legislation.gov.uk at write time (the F-37 Bill-vs-enacted discipline). **Verified live 2026-05-30: Finance Act 2026 (2026 c. 11) exists; s.6 = "New rates of income tax on property income", s.7 = "Property rates of income tax for tax year 2027-28".**

**Citation hygiene — F-1 / dead-link.** `ref-2` = `http://aka.hmrc.gov.uk/cgt/intro/report-gain.htm` is a legacy HTTP `aka` redirect (likely dead). Replace with `https://www.gov.uk/capital-gains-tax/rates` (verified live 2026-05-30). Pricing-leak: clean (no fee figures on page) — keep clean.

---

## Statute spine (every section verified on legislation.gov.uk / gov.uk at write time — re-verify at execution)

| Citation | Act | Heading / role | Verified 2026-05-30 |
|---|---|---|---|
| **TCGA 1992 s.1H** | Taxation of Chargeable Gains Act 1992 | "The main rates of CGT" — 18% or 24% for ALL individual chargeable gains | ✅ live, unified rate confirmed |
| **TCGA 1992 s.1I** | TCGA 1992 | Determines which of 18%/24% applies (by reference to unused basic-rate band) | ✅ referenced by s.1H |
| **TCGA 1992 s.222** | TCGA 1992 | Private Residence Relief (no shares analogue) | cite for PPR (verify) |
| **TCGA 1992 s.58** | TCGA 1992 | No-gain/no-loss spousal transfers (planning lever both assets share via spouse, property-side relevant) | optional (verify) |
| **Finance Act 2026 ss.6-7** | Finance Act 2026 (2026 c. 11) | s.6 "New rates of income tax on property income"; s.7 "Property rates of income tax for tax year 2027-28" — the 22/42/47 from 6 Apr 2027 | ✅ live, RA 18 March 2026 per §7 |
| **FA 2026 Sch 1** | Finance Act 2026 | Section 24 reducer rises to 22% (amends ITTOIA 2005 ss.274AA/274C + ITA 2007 s.399B) | cite via §4/§7 (verify) |
| **Finance (No. 2) Act 2015 s.24** | Finance (No. 2) Act 2015 (c. 33) | "Relief for finance costs related to residential property businesses" — the mortgage-interest restriction | ✅ live, heading confirmed |
| **ITTOIA 2005 s.272 / s.383** | Income Tax (Trading and Other Income) Act 2005 | UK property business income; dividend income charge (dividend ordinary/upper/additional rates) | verify exact dividend-rate section at write time |
| **CTA 2010 ss.3 / 18A / 18B / 18D / 18N** | Corporation Tax Act 2010 | CT main rate, small profits rate, marginal relief, CIHC exclusion (incorporation H2) | cite via §21.A (verify) |
| **ISA Regulations 1998 (SI 1998/1870)** | Individual Savings Account Regulations 1998 | ISA tax-free wrapper (income + gains) — the wrapper differentiator | cite gov.uk/individual-savings-accounts as consumer-facing anchor; SI for statute |

**Execution session selects 4-6 to actually render as legislation.gov.uk / gov.uk hyperlinks.** Minimum mandatory: TCGA 1992 s.1H (the correctness anchor), FA 2026 ss.6-7 (the 2027 rates), Finance (No. 2) Act 2015 s.24, and gov.uk/capital-gains-tax/rates (replacing the dead `aka` link).

---

## Authority links worth considering (Stage 2 — verify at execution)

| URL | Verification status 2026-05-30 | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/1H | ✅ 200, "The main rates of CGT", unified 18/24 | The correctness anchor for the CGT axis |
| https://www.gov.uk/capital-gains-tax/rates | ✅ 200, confirms 18/24 from 6 Apr 2026 + £3,000 AEA 2026/27 | Replace dead `ref-2`; consumer CGT-rates cross-reference |
| https://www.legislation.gov.uk/ukpga/2026/11/contents | ✅ 200, FA 2026 c.11, ss.6-7 = property income rates | April 2027 rates statute |
| https://www.legislation.gov.uk/ukpga/2015/33/section/24 | ✅ 200, "Relief for finance costs related to residential property businesses" | Section 24 statute |
| https://www.gov.uk/individual-savings-accounts | verify at execution | ISA £20,000 allowance + tax-free wrapper |
| https://www.gov.uk/tax-on-dividends | verify at execution | Dividend rates + £500 allowance |
| https://www.gov.uk/tax-sell-shares/work-out-your-gain | keep existing `ref-3` if still 200 | Shares-CGT mechanics (now at the SAME 18/24) |

---

## Universal rules — inherited from parent program (do not restate)

Per TRACK2_PROGRAM §4 section 13: voice rules (NO em-dashes anywhere; anonymised social proof only; NO pricing/fees; exact figures + named statute), lead-gen architecture (LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated; 1-3 inline `<aside>` CTAs at conversion moments), CSS-in-markdown (semantic HTML only, no Tailwind classes in body), FAQs and schema (frontmatter `faqs:` array 12-14; `buildBlogPostingJsonLd` auto-emits FAQPage — never hand-add FAQ schema), anti-templating discipline, the six-check quality bar, and the §16 lessons (esp. §16.31 URL liveness, §16.22/§16.27/§16.30/§16.35/§16.37 Bill-vs-enacted, §16.18 reasoning-first). **Critical for THIS brief: NO em-dashes; NO pricing; the CGT-axis correction is mandatory; the §7 enacted-law framing is mandatory.**

---

## 19-step workflow — inherited from parent program with Track 2 deltas

Inherits the full 19-step legacy-rewrite workflow (TRACK2_PROGRAM §4 section 14 + competitor_rewrite_playbook). Track 2 deltas for this page:

1. Read house_positions §4, §5, §7, §21.4, §21.A, §3/§19 at session start.
2. Claim the row in `track2_page_tracker.md` (🟡 stage2_drafting → execution mark).
3. Read this brief end-to-end.
4. **Re-verify TCGA 1992 s.1H (unified CGT) AND FA 2026 ss.6-7 (April 2027 rates, RA date) on legislation.gov.uk** — the two load-bearing pre-rewrite verifications.
5. Re-fetch the 4 competitor URLs for liveness (replace non-200).
6. Read the current source markdown in full.
7. Read the 5 primary forward-link targets for accurate anchor framing (structuring guide, 2027 rates, Section 24 pillar, CGT pillar, BTL Ltd-Co guide).
8. Plan outline: 11-13 H2s, comparison-table-at-top, ~3,200 body words, 12-14 FAQs.
9. **Rewrite markdown at existing path** (NOT a new file). Preserve slug + canonical + category; update `dateModified` + `sourcesVerifiedAt` to today. Rewrite metaTitle/metaDescription/h1 per the plan below. Correct the CGT axis at all four points. Re-state April 2027 as enacted. Replace the dead `aka` ref-2.
10. `cd Property/web && npm run build` — must pass.
11. Six checks: FAQ schema count = frontmatter length; em-dash count = 0; Tailwind class count = 0; metaTitle ≤ 62 chars; metaDescription ≤ 158 chars; all internal links resolve; **plus a STALE check: `grep -E "10%|20%" ` near "shares" returns 0 stale-CGT matches.**
12. Confirm no redirect needed (none — slug kept; reversed-equity collapse forbidden per §16.T2).
13. Insert/Update `monitored_pages` Supabase row — **180-day window from rewrite date** (INVISIBLE baseline, F-11).
14. Commit on `main`: `Track 2A: rewrite property-investment-vs-stocks-shares-tax-comparison (STALE_FACTS CGT-axis pivot + depth lift)`.
15-19. Tracker ✅ executed; flags log (the two HIGH conflicts above); §3 heartbeat; discovery log; next page.

---

## metaTitle / metaDescription / h1 plan

- **metaTitle (≤ 62 chars):** lead with the decision + the year, drop the generic "wins". Candidates (pick at execution):
  - "Property vs Shares: Which Is Better for Tax? (UK 2026/27)" (57)
  - "Buy-to-Let vs Stocks & Shares Tax: UK 2026/27 Compared" (54)
- **metaDescription (≤ 158 chars):** name the real differentiators + correctness hook, e.g. "Property vs stocks and shares for UK tax in 2026/27: ISA and pension wrappers, rental vs dividend income, Section 24, the April 2027 rates, and incorporation." (157)
- **h1:** keep close to current but sharpen the decision framing: "Property Investment vs Stocks and Shares: The UK Tax Comparison for 2026/27" (CGT-axis correction lives in the body, not the h1).

---

## Per-page work-log (for execution session)

### House-position alignment
- §5 CGT unified 18/24 (stale 10/20 removed at 4 points): __
- §7 April 2027 22/42/47 stated as ENACTED (FA 2026 ss.6-7, RA 18 Mar 2026; England+Wales+NI): __
- §4 Section 24 (20% reducer 2026/27 → 22% from 2027/28): __
- §21.4 dividend rates 10.75/35.75/39.35 + £500 (preserved): __
- §21.A CT 19/25/26.5-effective (no F-31 drift): __
- §3/§19 MTD £50k/£30k/£20k (preserved): __
- §13 no-pricing / no-client-names / anonymised proof: __

### Comparison: before vs after
- Word count: 1,536 → __ (target ~3,200)
- H2 count: 11 → __
- FAQ count: 4 → __ (target 12-14)
- Comparison table at top: 0 → __ (1 expected)
- Authority links (legislation.gov.uk/gov.uk): low/dead → __ (4-6 verified)
- Dead `aka.hmrc.gov.uk` ref replaced: __ (Y/N)
- Worked examples: 2 (stale) → __ (3-4, correct)

### STALE-fact correction verification
- All four "shares 10%/20%" assertions removed: __ (FAQ#1 / FAQ#3 / body CGT H2 / Key Takeaways)
- "shares more tax-efficient" conclusion re-anchored on wrapper/income/Section 24: __
- TCGA 1992 s.1H re-verified live at write: __
- FA 2026 ss.6-7 + RA date re-verified live at write: __

### Flags raised
- F-NN STALE_FACTS (CGT axis) — confirmed corrected: __
- F-NN §7 enacted-law framing — confirmed: __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
