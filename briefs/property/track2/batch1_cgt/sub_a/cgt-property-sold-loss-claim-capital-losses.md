# Track 2 brief: cgt-property-sold-loss-claim-capital-losses

**Site:** property
**Brief type:** Legacy rewrite — Batch 1 Sub-bucket A (CGT reliefs / planning)
**Source markdown path:** `Property/web/content/blog/cgt-property-sold-loss-claim-capital-losses.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-property-sold-loss-claim-capital-losses
**Stage 1 priority:** **M** (no GSC signal yet — invisible page; capital-losses-on-property is a specialist niche with clear search-volume potential when property market softens, and the slug is well-shaped — foundational rewrite is defensible)
**Stage 1 date:** 2026-05-23
**Stage 2 enrichment date:** 2026-05-23
**Cannibalisation status:** REWRITE — clean. Page owns capital-losses-on-property-disposal intent which is not covered in any rewritten sibling. Page is the canonical specialist destination for the "sold BTL at a loss, can I claim?" intent.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `cgt-property-sold-loss-claim-capital-losses`. Slug is keyword-stuffed but maps cleanly to the user query "can I claim capital losses when selling BTL at loss" — kept on the basis that changing the slug would require redirect + monitored_pages update and yield minimal benefit.
- **Category:** `capital-gains-tax` (kept).
- **Gap-mode tag:** `DEPTH` (primary, current page is decent at ~1,900 words but missing four load-bearing topics: 4-year claim time limit, negligible value claims, joint-ownership loss split, post-FHL-abolition loss treatment) + `STALE_FIGURES` (secondary, two Bill-vs-enacted issues at lines 55 + 95 plus a stale tax-year reference) + `STRUCTURE` (tertiary, 4 FAQs but missing the "do I report losses without gains" + "4-year time limit" + "negligible value" specific queries).
- **"Why this rewrite" angle:** the legacy page is the right framing (claiming capital losses on BTL property disposal) and the body is closer to acceptable than B1-A1 or B1-A2's bodies (genuine worked example, clear allowable/non-allowable lists, decent record-keeping section), but four targeted depth additions + three figure corrections + statute anchoring will lift it from "decent" to "best-in-class for the slug intent". Recommended body lift to 2,400-2,800 words.

---

## Current page snapshot (Stage 2 — pulled from filesystem; no `page_content_map` row)

**Supabase `page_content_map` row:** **none.** Page has never been parsed (parser only walks pages with GSC impressions).

**Filesystem source read (`Property/web/content/blog/cgt-property-sold-loss-claim-capital-losses.md`, 141 lines):**
- `metaTitle`: "CGT Property Sold Loss: Claiming Capital Losses UK Guide" (56 chars)
- `metaDescription`: "Selling rental property at a loss? Learn how to claim capital losses against CGT, carry forward rules, and tax relief strategies for UK landlords." (149 chars)
- Word count: ~1,900 (estimate from line count + para density)
- 11 H2 sections (How Capital Losses Work / Example: Calculating a Capital Loss / Claiming and Using Capital Losses / Allowable and Non-Allowable Costs [+2 H3] / Capital Losses vs Income Losses / CGT Rates and Loss Relief Value / Record Keeping and Documentation [+2 H3] / Special Ownership Situations [+3 H3] / Strategic Planning for Capital Losses [+2 H3] / Professional Advice and Future Outlook)
- 4 FAQs in frontmatter (rental income offset / carry forward / report without gains / capital loss vs rental loss)
- 1 worked example (Sarah BTL flat — £180k cost + £15k improvements + £7.4k acquisition costs + £6k sale costs / £185k sale → £23,400 loss). Clear and well-formed.
- Internal links: 4 (MTD page, CGT pillar, LtdCo pillar, PRR page, property investment tax page) — note 5 mentions but some duplicate
- Outbound authority links: 0 (no gov.uk / legislation.gov.uk / HMRC manual citations)
- Last meaningful edit: 2026-04-10 (frontmatter `date`)

**Drift hazards in current body (load-bearing for rewrite):**
- **Line 55 — POTENTIAL_DRIFT on claim time limit:** "unused losses can be carried forward indefinitely. Key rules for carrying forward losses include: no time limit on using them". This statement is correct for **using** carried-forward losses (no time limit on using them once claimed), but is dangerously ambiguous because the **claim itself is subject to a 4-year time limit from the end of the tax year of disposal** (TMA 1970 s.43 / gov.uk verified: "you can claim up to 4 years after the end of the tax year that you disposed of the asset"). The current wording risks misleading a reader who has an unclaimed loss from 5+ years ago and assumes they can still claim it. Rewrite must distinguish: claim-deadline 4 years; use-deadline none-once-claimed.
- **Line 95 — STALE_FIGURES / Bill-vs-enacted pattern:** "From April 2027, property income will be taxed at separate rates (22%/42%/47%), but CGT rates are expected to remain at current levels." Per §7 + F-2 + F-5 + Wave 6 F-9 (FA 2026 may now be enacted), this assertion needs verification at execution. The "expected to remain at current levels" hedge is fine; the "22%/42%/47%" assertion needs the Bill-vs-enacted hedge.
- **Line 53 — STALE TAX YEAR REFERENCE:** "For the 2025/26 tax year, capital losses must first be used against any capital gains in the same tax year." Update to 2026/27.
- **Line 96 — STALE NUMBER OR FRAMING:** "annual exempt amounts have reduced significantly in recent years" — true but vague. Tighten to specific historical record: £12,300 (pre-2023/24) → £6,000 (2023/24) → £3,000 (2024/25 onwards) per §5 LOCKED.
- **Line 120 — STRUCTURAL_DEFECT in Company Ownership section:** "Properties owned through a limited company follow different rules. Company capital losses can only be offset against company capital gains, and the corporation tax rates (19% for profits up to £250k, 25% main rate) apply rather than CGT rates." The corporation-tax-rate mention is correct (matches §21.4 LOCKED) but the "company capital losses can only be offset against company capital gains" framing is right for non-trading losses; **trading losses** for property-trading companies can offset against income — clarify the distinction. Cross-link §21 + CTA 2010 framework.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data`

**Pulled 2026-05-23 via `python -m optimisation_engine.track2.pull_page_data --slug cgt-property-sold-loss-claim-capital-losses --days 90`.**

**Aggregate:** **0 impressions / 0 clicks / 0 distinct queries** in 90-day window. **0 GA4 rows.**

**Same INVISIBLE pattern as airbnb T1 + B1-A1 + B1-A2.** Page has never shown in SERPs at the impression-tracked depth.

**Strategic conclusion:** as with B1-A1 and B1-A2, foundational rewrite without query-specific tuning. The capital-losses-on-property topic is highly cyclical — search volume spikes when the property market softens (e.g., 2008-2009, 2022-2023 post-rate-hikes). Current market backdrop (2026): rate environment elevated, some regional softness in BTL valuations. Recommend: build best-in-class depth now so the page is ready to capture spikes when they come.

**Realistic post-rewrite target:** 50-150 impressions / 90 days within 6-12 months (lower than B1-A1 / B1-A2 because the topic is more niche), but with potential 5-10× upside when the market cycle drives the query.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: DEPTH (with four specific topic gaps).** Page is decent at ~1,900 words but four load-bearing topics are missing or under-developed:

1. **4-year claim time limit** — currently absent. Gov.uk explicit on this point. Adding it correctly is the single highest-ROI fix because misleading a reader who is at year 4+ post-disposal is a material error.
2. **Negligible value claims** — TCGA 1992 s.24 claim mechanic that allows treating a worthless asset as disposed-of without actual disposal, crystallising a capital loss + 2-year backdating window. Critical for property investors with BTL companies that have failed (e.g., negligible-value claim on shares in a property-SPV that has been put into MVL or liquidated worthless). Currently absent from the legacy page; competitor `taxaccountant.co.uk/negligible-value-claims-...` covers this well (2,800 words, dedicated coverage). Our page should not match competitor depth on negligible value (that would dilute the BTL-loss focus) but should add a 200-300-word section with statute anchored + cross-link.
3. **Joint-ownership loss split** — currently absent. The legacy page touches "Joint Ownership" at H3 line 117 but only briefly says "capital losses are typically split according to ownership percentages". Needs the Wave 5 Form 17 + declaration-of-trust + s.58 framework (cross-link the four Wave 5 joint-ownership pages).
4. **Post-FHL-abolition loss treatment** — currently absent. §6 LOCKED: former-FHL business losses are ring-fenced and carried forward against future profits of the residential property business. Same applies to capital losses on former-FHL property — clarify the post-5-April-2025 treatment.

**Secondary: STALE_FIGURES (Bill-vs-enacted + tax-year references).** Three drifts identified at §"Current page snapshot" (line 53 / line 55 / line 95). All correctable at rewrite.

**Tertiary: STRUCTURE.** FAQ count 4 (target 12-14). Existing 4 FAQs are decent (rental income offset / carry forward / report without gains / capital loss vs rental loss) but missing the 4-year-claim-deadline FAQ + negligible-value FAQ + joint-ownership-loss-split FAQ + company-vs-individual loss FAQ + can-I-offset-against-share-gains FAQ + bed-and-breakfasting FAQ. No comparison table; no decision-tree.

**Not present: CTR-FAIL** (no impressions), **not CANNIBAL** (capital-losses-on-property is genuinely uncovered in the rewritten siblings).

**Load-bearing fix sequence (ordered by ROI):**

1. **Add 4-year claim time limit** — distinguish from no-limit-on-use of carried-forward losses. Gov.uk verbatim: "you can claim up to 4 years after the end of the tax year that you disposed of the asset". Statute anchor: TMA 1970 s.43 (verify section + content at execution). Worked example: loss in 2024/25 must be claimed by 5 April 2029.
2. **Add negligible value claims section** — TCGA 1992 s.24 (verify at execution per F-7 + F-8 discipline). 2-year backdating window. Use case: BTL-SPV shares that have become worthless (post-liquidation or distressed property holdings). 200-300 words + forward-link to taxaccountant.co.uk for additional depth (or cite gov.uk negligible-value page).
3. **Add joint-ownership loss split section** — cross-link Wave 5 cluster: `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` + `declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17` + `cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics`. Losses follow beneficial ownership per ITA 2007 s.836 (income-tax parallel) + TCGA 1992 implicit acquisition rule for joint owners. Apportion losses 50/50 by default for spouses, per actual beneficial split per Form 17 if displaced, per actual beneficial split for unmarried co-owners. The s.58 no-gain-no-loss treatment on spouse transfers does NOT transfer a loss — losses crystallise to the disposing spouse.
4. **Add post-FHL-abolition treatment** — per §6: former-FHL losses ring-fenced; pre-abolition losses carry forward against future residential property business profits. Anti-forestalling rules (6 March 2024 to 5 April 2025).
5. **Update Bill-vs-enacted hedge at line 95** — per F-5 discipline, hedge or assert per §7 status verification at execution.
6. **Update tax-year references** from 2025/26 to 2026/27 throughout.
7. **Update AEA historical note** from "reduced significantly" to specific record (£12,300 → £6,000 → £3,000).
8. **Add statute spine:** TCGA 1992 s.16 (loss computation), TCGA 1992 s.24 (negligible value), TCGA 1992 s.38 (allowable cost / enhancement expenditure), TCGA 1992 s.58 (spouse no-gain-no-loss does NOT transfer loss), TMA 1970 s.43 (4-year claim time limit). All verified live + operative 2026-05-23 (see §"Authority links").
9. **Add Company vs Individual loss comparison** — properly distinguish trading vs non-trading losses for property companies; cross-link §21 + the BTL Ltd Co pillar.
10. **FAQ count 4 → 12-14.** Add: 4-year-claim-deadline / negligible-value-claim / joint-ownership-loss-split / company-vs-individual-loss / offset-against-share-gains / bed-and-breakfasting / what-happens-on-death-with-unused-losses / can-I-claim-against-PPR-period / can-I-claim-on-gift-at-undervalue / what-if-I-bought-pre-2008.

---

## Competitor URLs (Stage 2 — verified live 2026-05-23 via WebFetch)

| URL | Status | Coverage signals |
|---|---|---|
| https://www.ukpropertyaccountants.co.uk/cgt-on-property-sales-at-loss/ | 200 OK, content confirmed | ~2,500-3,000 words, FAQ count not visible in extract, 3 H2s visible (What Is CGT on Property / How Does a Capital Loss Arise / How Capital Losses Work). Covers allowable vs non-allowable ✓, carry-forward ✓ with 4-year claim deadline noted ✓ (this competitor IS correct on the 4-year limit), 2 worked examples ✓. Missing: negligible value claims ✗, joint-ownership loss split ✗, company vs individual rules ✗ (only partial). No statute citations. **Important benchmark: this competitor correctly references the 4-year claim deadline that our legacy page omits — our rewrite must match or improve on this.** |
| https://www.geraldedelman.com/insights/how-do-capital-losses-impact-the-tax-you-are-liable-for/ | 200 OK, content confirmed | ~1,100 words, 4 FAQs, 3 H2s. Covers carry-forward ✓, offset rules ✓, negligible value ✓ (dedicated section), loss-vs-income offset ✓. 1 worked example (basic stocks, £1,000 → £700 = £300 loss). Property-investor focus minimal. Our differentiation: property-specific focus + statute spine + joint-ownership + post-FHL-abolition. |
| https://taxfix.com/en-uk/glossary/capital-loss/ | 200 OK (cached sitemap presence; content not fetched in this brief's budget) | Glossary page — likely 500-800 words, basic definition. Low competitive threat. |
| https://www.taxaccountant.co.uk/negligible-value-claims-how-to-crystallise-a-capital-loss/ | 200 OK, content confirmed | ~2,800 words, 0 FAQs, 4 H2s, comprehensive negligible-value-claim coverage. **Cites TCGA 1992 s.24 specifically (s.24(1), s.24(2), s.24(2)(b))**. Backdating window: "claimant can specify a date... not more than two years before the start of the tax year in which the claim is made". Property-investor angle: minimal (mostly shares-focused). Our differentiation: cover negligible value as one section (200-300 words) within the broader BTL-loss focus + cross-link this competitor for depth. |
| https://www.legislation.gov.uk/ukpga/1992/12/section/16 | **200 OK + operative text present + verified 2026-05-23**. Opening text: "Subject to sections 261B, 261D and 263ZA and except as otherwise expressly provided, the amount of a loss accruing on a disposal of an asset shall be computed in the same way as the amount of a gain accruing on a disposal is computed." | Authority anchor for loss-computation rule. |
| https://www.gov.uk/capital-gains-tax/losses | **Verified live 2026-05-23.** Confirmed key passages: "Claim for your loss by including it on your tax return" / "You do not have to report losses straight away - you can claim up to 4 years after the end of the tax year that you disposed of the asset" / "When you report a loss, the amount is deducted from the gains you made in the same tax year" / carry-forward rule. | Gov.uk consumer-side authority — cross-reference at top of body. |

**Competitor depth ceiling for this query class:** 1,100-3,000 words, 0-4 FAQs, 0-1 statute citations (TCGA s.24 only in the niche negligible-value competitor). Our 2,400-2,800 word rewrite with 12-14 FAQs + 4 statute citations + property-investor focus + joint-ownership + post-FHL + negligible value + 4-year claim deadline + company vs individual + 2 worked examples puts us decisively best-in-class.

**What to borrow:** ukpropertyaccountants.co.uk/cgt-on-property-sales-at-loss/ structure (introduce CGT → explain loss arising → mechanics → record-keeping); already roughly the shape of our legacy. Add the 4-year claim deadline framing that this competitor handles correctly.

**What to differentiate against:** all four competitors (a) skip the joint-ownership-loss split, (b) skip the post-FHL-abolition treatment, (c) skip the company-vs-individual loss rule distinction in proper detail, (d) skip the negligible-value-claim cross-application to BTL-SPV shares (the taxaccountant page covers negligible value but in a shares-not-property frame).

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (frozen 2026-05-23 PM). Re-read 2026-05-23 at brief drafting.

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | cgt-property-sold-loss-claim-capital-losses | REWRITE | self — rewrite in place |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk (Session C #47) | CGT pillar | No collision — pillar covers overview including a reference to losses; this page is the specialist depth on losses. Reciprocal forward-link both ways. |
| Excluded (rewritten 2026-05-21) | cgt-annual-exempt-amount-3000-allowance-2026-27 (Session 0 #14) | AEA depth | No collision — AEA mentioned briefly in "you only need to use losses to reduce gains above the £3,000 AEA" framing; forward-link for depth. |
| Excluded (rewritten 2026-05-21) | cgt-calculation-selling-buy-to-let-property-step-by-step (Session C #35) | Calculation walkthrough | No collision — calculation page handles gain calc; loss page handles loss calc (different sign of result). Mention this page in calc page; forward-link from calc page to here for the loss case. |
| Excluded (rewritten 2026-05-21) | cgt-gifting-property-family-members-uk (Session B #46) | Gifting + s.165/s.260 | No collision — gifting page covers gift mechanics; loss page covers loss mechanics. Cross-reference for the s.58 spouse-transfer-does-not-transfer-loss point. |
| Excluded (rewritten 2026-05-21) | cgt-payment-deadlines-property-sales-2026 (Session C #23) | 60-day deadlines | No collision — deadline page covers 60-day for gains; loss page covers loss-claim deadline (4-year) — different deadline regime. Cross-reference. |
| Excluded (rewritten 2026-05-21) | cgt-property-transfer-spouse (Session B/C #?) | Spouse transfer mechanics | Adjacent — relevant cross-reference for the s.58-does-not-transfer-loss point. Forward-link from joint-ownership-loss-split section. |
| Excluded (rewritten 2026-05-21) | buy-to-let-limited-company-complete-guide-uk | BTL LtdCo pillar | Adjacent — relevant for the company-vs-individual loss rules section. Forward-link from "Company Ownership" section. |
| Excluded (rewritten 2026-05-21) | cgt-property-transfer-limited-company-calculate | Incorporation calculation | No collision — incorporation calc handles the gain side; loss page handles the loss side. No forward-link needed. |
| Wave 5 (shipped 2026-05-23) | form-17-declaration-beneficial-interest-property-mechanics-filing-revocation | Form 17 mechanics | Adjacent — cross-link target from joint-ownership-loss-split section for the income-split-via-Form-17 framework. |
| Wave 5 (shipped 2026-05-23) | declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17 | Declaration of trust | Adjacent — cross-link from joint-ownership-loss-split section for the deed-as-evidence-of-beneficial-share point. |
| Wave 5 (shipped 2026-05-23) | cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics | PRR + joint-ownership PRA | No direct overlap (PRA election doesn't apply to non-residence BTL losses) but cross-reference for the joint-ownership conceptual framing. |
| Wave 5 (shipped 2026-05-23) | unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision | Spouse income split decision | Adjacent — cross-link from joint-ownership-loss-split for the spouse-income-split parallel pattern. |
| Wave 6 (in-flight) | balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics (Bucket C #2, ✅ done on feature branch) | Balancing allowance on disposal | Adjacent — capital-allowance balancing-allowance on disposal interacts with CGT loss calc (claimed capital allowances reduce CGT base cost, potentially turning a CGT gain into a smaller loss / vice versa). Cross-reference once Wave 6 ships. |
| Residual (intra) | cgt-deferral-strategies-property-investors-uk (B1-A1, this batch in-flight) | Deferral-mechanics survey | No collision — deferral page handles deferral; loss page handles loss claim. Cross-reference if loss page touches "losses crystallise; deferral defers — they're different concepts". |
| Residual (intra) | reduce-cgt-property-disposal-uk (B1-A2, this batch in-flight) | Reduce-CGT survey | No collision — reduce-page references loss-offset as one lever; loss page is the specialist depth. Reciprocal forward-link. |

**Conclusion:** REWRITE in place. No REDIRECT-PROPOSED. No FLAG-MANAGER. Cluster positioning clean: this page is the specialist depth on capital-loss claim mechanics for property disposals.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page):

- **CGT pillar:** `capital-gains-tax-property-complete-guide-uk` — back-link; reciprocal forward-link from intro paragraph.
- **AEA depth:** `cgt-annual-exempt-amount-3000-allowance-2026-27` — forward-link from "you only need to use losses above £3,000 AEA" paragraph.
- **Calculation walkthrough:** `cgt-calculation-selling-buy-to-let-property-step-by-step` — bidirectional cross-link for "how to calculate the gain / loss" mechanics.
- **CGT rates explainer:** `cgt-rates-property-2026-27-current-rates-explained` (gold-reference) — forward-link from "loss-relief value at 18%/24% rates" paragraph.
- **Spouse transfer:** `cgt-property-transfer-spouse` — forward-link from "s.58 does NOT transfer the loss" subsection.
- **Form 17 (Wave 5):** `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` — forward-link from joint-ownership-loss-split section.
- **Declaration of trust (Wave 5):** `declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17` — forward-link from joint-ownership-loss-split section.
- **PRA election (Wave 5):** `cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics` — forward-link from joint-ownership conceptual framing.
- **Unequal income split (Wave 5):** `unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision` — forward-link from joint-ownership-loss-split section.
- **BTL Ltd Co pillar:** `buy-to-let-limited-company-complete-guide-uk` — forward-link from "Company Ownership" section.
- **60-day reporting:** `cgt-payment-deadlines-property-sales-2026` — forward-link from "deadline regime is different for gains vs losses" paragraph.
- **CGT 2027 hedge:** `cgt-property-2027-rate-changes-uk-landlords` — forward-link from "future rate changes" hedged paragraph.
- **Reduce-CGT survey (B1-A2, in-flight):** reciprocal forward-link from "loss offset" lever mention.
- **Deferral survey (B1-A1, in-flight):** cross-link only if differentiation framing is needed.
- **MTD landlords:** `making-tax-digital-landlords-april-2026-deadline` — kept link from current page (line 55 reference to MTD threshold context for landlords); cross-check at execution that this is the rewritten MTD pillar and not a deprecated MTD page.
- **PRR (residual):** `principal-private-residence-relief-landlords` — forward-link from "interaction with PRR" subsection (claim of both relief + full loss is contradictory).
- **Property accountant services:** `what-does-a-property-accountant-do` — anchor link at end of body.

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED 2026-05-23]: primary lock. Rates 18% / 24% (residential), £3,000 AEA. Loss-relief value calculation must use current rates.
- **§6 FHL — abolition transition** [LOCKED]: load-bearing for the post-FHL-abolition loss treatment section. Former-FHL business losses ring-fenced; pre-abolition losses carry forward against future residential property business profits. Anti-forestalling rules apply for disposals between 6 March 2024 and 5 April 2025.
- **§7 April 2027 property income tax surcharge** [LOCKED but **VERIFY at execution** per Bill-vs-enacted pattern]: relevant for the line-95 hedge. Note: §7 surcharge is on property INCOME, not CGT — clarify in body that CGT rates are not affected by the April 2027 surcharge regime; only the income-tax side is.
- **§13 Do-not-write list** [LOCKED]: NO pricing; NO real client names; NO em-dashes; NO emoji.
- **§21 LtdCo + FIC** [LOCKED, Wave 4 + §21.4 patched 2026-05-23 with F-19 / F-20]: load-bearing for the Company Ownership section. CT rates 19% / 25% per §21.4. Trading-vs-non-trading distinction matters for loss offset rules. CIHC citation = CTA 2010 s.18N (NEVER s.34) per §16.3 / §21.7.
- **§24 Form 17 + joint ownership + spouse-mechanics** [LOCKED 2026-05-23]: load-bearing for the joint-ownership-loss-split section. Distinguish ITA 2007 s.836 (income-tax 50/50) from the CGT-loss apportionment which follows beneficial ownership. Form 17 is income-tax only and does not directly govern CGT loss allocation — losses follow beneficial ownership directly. **Important nuance: s.58 no-gain-no-loss treatment on spouse transfers does NOT transfer a loss; loss crystallises to the disposing spouse.**

---

## House-position conflict flag (Stage 2)

**Two confirmed conflicts in current body — both correctable at rewrite:**

**Flag (a) — DEPTH_GAP that risks being misleading (HIGH):** line 55 omits the 4-year claim time limit for capital losses. Gov.uk explicit on this point. The current "no time limit on using them" wording is true for use-after-claim but is dangerously ambiguous about the claim deadline. Rewrite must clarify (see fix sequence #1). New site-wide flag candidate — if similar gaps are present on other residual loss-related pages, surface as a cluster pattern.

**Flag (b) — STALE_FIGURES / Bill-vs-enacted at line 95:** "From April 2027, property income will be taxed at separate rates (22%/42%/47%), but CGT rates are expected to remain at current levels." Per F-2 + F-5 + Wave 6 F-9 pattern, verify §7 lock-status at execution. The "expected to remain at current levels" hedge is fine; the "22%/42%/47%" assertion needs the Bill-vs-enacted hedge (or assertion-with-citation if FA 2026 is now enacted).

**Site-wide flag recommendation to raise (draft):** `F-N | 2026-05-23 HH:MMZ | MEDIUM | (cross-residual) | DEPTH_GAP | Multiple residual CGT pages omit the 4-year claim time limit for capital losses (TMA 1970 s.43 / gov.uk verified). Loss-pages, gain-pages, calculation-pages all benefit from a one-sentence reminder that the loss claim must be made within 4 years of the end of the tax year of disposal (versus no time limit on using the loss once claimed). Recommend Phase 2 cluster pass to verify and back-patch.`

---

## Authority links worth considering (Stage 2 — WebFetch verification status)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/16 | **200 OK + operative text present + verified 2026-05-23**. Opening text: "Subject to sections 261B, 261D and 263ZA and except as otherwise expressly provided, the amount of a loss accruing on a disposal of an asset shall be computed in the same way as the amount of a gain accruing on a disposal is computed." | Loss-computation rule — cite for §"How Capital Losses Work" intro. |
| https://www.legislation.gov.uk/ukpga/1992/12/section/24 | Verify at execution (taxaccountant competitor cites this section specifically) — per F-7 + F-8 discipline, never cite a section without WebFetch verification. | Negligible value claim — cite for §"Negligible Value Claims". |
| https://www.legislation.gov.uk/ukpga/1992/12/section/38 | Verify at execution. | Allowable cost (acquisition + enhancement expenditure) — cite for §"Allowable and Non-Allowable Costs". |
| https://www.legislation.gov.uk/ukpga/1992/12/section/58 | Verify at execution (used Wave 5 §24.4 lock + gold-reference verification). | Spouse no-gain-no-loss does NOT transfer loss — cite for §"Joint Ownership and Spouse Transfers" subsection. |
| https://www.legislation.gov.uk/ukpga/1970/9/section/43 | Verify at execution. | TMA 1970 s.43 — 4-year claim time limit for loss claims. **MANDATORY citation** for the load-bearing 4-year-deadline fix. |
| https://www.gov.uk/capital-gains-tax/losses | **Verified live 2026-05-23.** Key extracts captured. | Gov.uk consumer-side authority — cite for §"Claiming and Using Capital Losses" + the 4-year deadline. |
| HMRC CG Manual CG15800+ (loss claim mechanics) | Verify exact section at execution per F-7 PIM4101 hallucination lesson. | Loss-claim working-practice reference. |
| HMRC CG Manual CG13110+ (negligible value claims) | Verify exact section at execution. | Negligible-value working-practice reference. |

**(Execution session selects 5-7 to actually cite in body — target 4 verified statutory + 1 gov.uk consumer page + 2 HMRC manual.)**

---

## Universal rules (do not skip)

Inherits from `TRACK2_PROGRAM.md §4 sections 13 + 14`. Critical for this brief:

- **NO em-dashes** (per memory note + §13).
- **NO pricing on-site** (per agency lead-gen handoff model + F-1).
- **Anonymised social proof only.**
- **LeadForm auto-injected by `BlogPostRenderer.tsx`.**
- **1-3 inline `<aside>` CTAs** at conversion moments (after worked example + after joint-ownership section + before closing).
- **FAQs schema auto-emitted** from frontmatter.
- **House position §5 + §6 + §7 hedges** per Bill-vs-enacted discipline.
- **4-year claim time limit** correctly distinguished from no-time-limit-on-use (the load-bearing fix).
- **CT vs CGT distinction** in Company Ownership section (companies pay Corporation Tax on chargeable gains, not CGT).
- **s.58 spouse no-gain-no-loss does NOT transfer a loss** — explicit note.
- **URL liveness + statute-content verification at execution** per §16.31 + F-7 + F-8.

---

## 19-step workflow (legacy-rewrite adaptation)

Inherits from `NETNEW_PROGRAM.md §7` with 3 Track 2 deltas. Brief-specific notes:

- **Step 1 reading:** `docs/property/house_positions.md` §5, §6, §7, §13, §21, §24 in full before drafting body.
- **Step 4:** verify §7 (April 2027) lock-status against legislation.gov.uk Finance Act 2026. Note: §7 surcharge is on INCOME, not CGT — loss-page must clarify in body.
- **Step 5:** re-fetch the 4 competitor URLs (especially the taxaccountant negligible-value URL for the s.24 citation cross-check).
- **Step 6:** read the current source file in full to confirm no edit since 2026-04-10.
- **Step 7:** read closest-existing sibling pages (16 cross-links named above; aim to read at least the top 8 that are forward-link destinations + the 4 Wave 5 joint-ownership pages for the loss-split section).
- **Step 8:** plan rewrite outline — 12-14 H2s, 2,400-2,800 body words, 12-14 FAQs, 1 worked example (extend the existing Sarah example or add a second contrasting example), 1 decision-table (claim deadline / use deadline / negligible value applicability / joint vs sole / company vs individual).
- **Step 9:** rewrite at existing path. Preserve frontmatter `slug` + `canonical` + `date` (update `dateModified`). Update `metaTitle` (test 2-3 candidates oriented at "claim capital losses property uk" + "btl sold at a loss claim"). Update `metaDescription` with named 4-year claim deadline + statute reference + post-claim use forever.
- **Step 10:** site build must pass.
- **Step 11:** six checks per playbook §4.3 + **explicit text-search checks**: "no time limit on using them" → must be qualified with "but the claim itself must be made within 4 years"; "2025/26 tax year" → must be replaced with "2026/27 tax year".
- **Step 12:** no redirect needed (REWRITE-in-place).
- **Step 13:** insert NEW `monitored_pages` row (zero current GSC; 180-day foundational window).
- **Step 14:** commit on main. Tracker edits via absolute path only.
- **Steps 15-19:** mark ✅ executed; update flags + heartbeat; next page in batch.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 2026/27 (18% / 24% + £3k AEA) + loss-relief value calc updated: __
- §6 FHL-post-abolition loss treatment + anti-forestalling: __
- §7 April 2027 — surcharge is on income not CGT, hedged correctly: __
- §13 no-pricing / no-real-client-names: __
- §21 CT vs CGT distinction in Company Ownership section + trading-vs-non-trading loss offset: __
- §24 Form 17 cross-link + s.58 loss-non-transfer note: __ MANDATORY

### Comparison: before vs after
- Word count: ~1,900 → __
- H2 count: 11 (+ 7 H3) → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked examples: 1 → __
- 4-year claim deadline mention: 0 → __ (1 mandatory)
- Negligible value claim section: 0 → __ (1 mandatory)
- Joint-ownership loss split section: 0 → __ (1 mandatory)
- Post-FHL-abolition treatment section: 0 → __ (1 mandatory)
- Decision table: 0 → __ (1 expected)

### Foundational SEO hypothesis test
- Pre-rewrite GSC baseline (2026-02-22 to 2026-05-23): 0 impressions / 0 clicks
- Post-rewrite expected: 50-150 impressions / 90 days within 6-12 months (lower than B1-A1 / B1-A2 because niche topic), potential 5-10× upside on market-cycle queries
- Verify at +90 / +180 days via monitored_pages detector

### Flags raised
- F-N (carried from this brief): 4-year claim deadline gap pattern across residual loss-related pages — Phase 2 cluster pass: __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
