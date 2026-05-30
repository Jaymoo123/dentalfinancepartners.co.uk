# Track 2 brief: when-to-sell-rental-property-key-indicators-landlords

**Site:** property
**Brief type:** Legacy rewrite (existing markdown; STALE_FACTS + THIN_DEPTH + INVISIBLE + STRUCTURE + INTENT_DRIFT)
**Source markdown path:** `Property/web/content/blog/when-to-sell-rental-property-key-indicators-landlords.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/portfolio-management/when-to-sell-rental-property-key-indicators-landlords
**Stage 1 priority:** M (zero current GSC/Bing signal, but the WebSearch SERP shows the "should I sell now / signs it is time to sell / tired landlord" diagnostic intent is the single highest-demand competitor cluster in this space — high upside on an invisible-baseline page)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30
**Cannibalisation status:** REWRITE in place (re-positioned to the decision-diagnostic angle; NOT a collapse — see cannibalisation block for the mandatory collapse-direction check)

> Depth match-target: `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` (gold reference). This brief carries three load-bearing wrong-advice corrections at execution (EPC C, Section 21 SI citation, April 2027 "sell-before" steer) plus one pricing-leak strip. Read the risk_notes block in the diagnosis before drafting body copy.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `when-to-sell-rental-property-key-indicators-landlords`. The slug carries the decision-diagnostic intent ("when to sell", "key indicators") that the WebSearch SERP confirms is the highest-demand intent in the sell/exit cluster (PIN "should landlords sell now or wait", South Yorkshire Property Buyers "tired landlord guide", LandlordZone "hold or sell", NRLA "selling under the Renters' Rights Act"). No redirect proposed.
- **Category:** `Portfolio Management` (kept). This category placement is what keeps the page distinct from the CGT-cluster tax-on-sale sibling and the Landlord-Tax-Essentials RRA sibling.
- **Gap-mode tag:** `STALE_FACTS` (primary — three wrong-advice errors) + `THIN_DEPTH` (1,257 words vs ~3,400 target) + `INVISIBLE` (0 GSC + 0 Bing impressions) + `STRUCTURE` (4 FAQs, 0 inline CTAs, 0 authority links, no decision-framework scaffolding) + `INTENT_DRIFT` (the page drifts from "is it time to sell?" diagnostic into generic exit-mechanics + a pricing-leak CTA that belongs on the sibling mechanics pages).
- **"Why this rewrite" angle:** This is a consumer-facing **decision-trigger diagnostic** — "here are the signals it is time to sell, and here is how to read each one against your own numbers". It is NOT an exit-mechanics how-to (that is the exit-strategy-planning-guide sibling), NOT the RRA-tax-stack page (that is the RRA sibling), and NOT the tax-payable-on-sale page (that is the CGT-cluster sibling). The rewrite sharpens the page onto the diagnostic angle, fixes three wrong-advice errors that currently make the page actively misleading, strips the pricing-adjacent CTA, and adds mandatory forward-links to the three siblings so each click goes to the page that actually answers the next question. Body lift to ~3,400 words with a self-scoring "sell-vs-hold scorecard", per-indicator "how to read this signal" sub-structure, two anonymised worked decision scenarios, and 11-13 FAQs.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

- **Word count:** ~1,257 (body).
- **H2 outline (1-line each):**
  1. Deteriorating Net Rental Yield (yield warning-sign list + Manchester example)
  2. Significant Capital Appreciation and Capital Gains Tax (sell-on-growth list + CGT 18%/24% link)
  3. Mounting Maintenance and Repair Costs (**contains EPC C "problematic from 2030" wrong-advice error** at the bullet list)
  4. Tax Changes: Section 24 and Upcoming Property Income Tax Rates (**contains the April 2027 "significantly higher / sell before 2027" overstated steer**)
  5. Changing Local Market Dynamics (employer/transport/oversupply signals)
  6. Personal Financial Circumstances (retirement, liquidity, IHT, divorce triggers)
  7. Regulatory and Legislative Changes (**contains the Section 21 "SI 2026/421" + "enhanced energy efficiency requirements" framing**)
  8. Tax-Efficient Exit and Alternative Strategies (PRR, AEA, loss-offset, seasonality, rent-to-rent, family transfers — this is INTENT_DRIFT into exit-mechanics that belongs on the siblings)
  9. Professional Support for Exit Planning (**generic CTA bloat + pricing-leak adjacency link** to `how-much-does-a-property-accountant-cost`)
  - Final Considerations (annual-review close)
- **Meta title:** "When to Sell a Rental Property: 8 Key UK Landlord Indicators" (58 chars; on-intent, keep close but re-test against the diagnostic angle).
- **Meta description:** "Discover the 8 key indicators that signal when to sell a rental property. From tax changes to market conditions - comprehensive guide for UK landlords." (149 chars; **contains a hyphen-as-dash "conditions - comprehensive"; strip to a comma or full stop per the no-em-dash / no-spaced-dash rule**).
- **FAQ count (frontmatter `faqs:`):** 4 (target 11-13). **FAQ #2 ("Should I sell before April 2027 tax changes?") and FAQ #4 ("Is Section 21 abolition a good reason to sell?") both carry wrong-advice errors — see house-position conflict block.**
- **Outbound authority links:** 0 (no legislation.gov.uk / gov.uk / HMRC).
- **Internal links (6):** CGT pillar (×2), Section 24 guide, BTL ltd-co guide, MTD-April-2026 deadline, PRR-landlords, what-does-a-property-accountant-do, **how-much-does-a-property-accountant-cost (pricing-leak adjacency — REMOVE)**.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:`).
- **Last meaningful edit (`date`):** 2026-04-10.

---

## GSC angle (last 90 days) — INVISIBLE baseline

**Diagnosis-supplied signal (no Supabase pull required at brief stage; confirm at execution):**
- **0 GSC impressions** and **0 Bing impressions** in the window. The page is effectively unindexed-for-intent / invisible.
- The nearest sibling (`property-investment-exit-strategy-planning-guide`, rewritten 2026-05-21) shows only 8 GSC impressions (pos 35-79, 0 clicks); the RRA sibling is also low-equity. **There is no ranking equity in EITHER direction**, which is the decisive input for the collapse-direction check below.

**Implication for the rewrite:** this is an INVISIBLE-baseline page, so success is measured by **whether it starts accruing impressions on the diagnostic query class** (per F-11 INVISIBLE-baseline monitoring guidance, set the `monitored_pages` window to 180 days from merge, not 90). The lever is not CTR (there are no impressions to convert) but **relevance + depth + distinctiveness**: the page must become the best on-site answer to "should I sell my rental property now (UK)" so it can earn impressions Google currently gives to PIN / LandlordZone / NRLA.

**GA4 engagement signal:** treat as effectively zero sessions; do not over-fit the rewrite to non-existent on-page behaviour data.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: STALE_FACTS (three wrong-advice errors, all must be fixed at execution).**

1. **EPC C "problematic from 2030".** Section 3 bullet states "Energy efficiency ratings below EPC Band C (problematic from 2030)". This contradicts LOCKED **§26.3** [LOCKED 2026-05-24]: "EPC C 2030/2028 is now law" is an explicit do-not-write. The current live MEES floor is **EPC E** under **SI 2015/962** (Energy Efficiency (Private Rented Property) (England and Wales) Regulations 2015), with the **£3,500 inc-VAT** landlord cost cap (reg.25(2)). EPC C by 2030 is **government policy aspiration only** — no Statutory Instrument laid as of 2026-05-24 — and must be framed as proposed/consultation-stage, with the live obligation stated as EPC E. Reframe the bullet and add the hedge: "the live minimum is EPC E (SI 2015/962); an EPC C standard has been proposed but is not yet legislated, so plan for it as a likely future cost rather than a current obligation".

2. **Section 21 "abolished ... per SI 2026/421" framing.** Section 7 bullet and FAQ #4 assert "Section 21 abolished under the Renters' Rights Act 2025 (commencement 1 May 2026 per SI 2026/421)". Per **§20.1 / §20.2** [LOCKED]: the Act is **Renters' Rights Act 2025 (2025 c.26), Royal Assent 27 October 2025**, and the **s.21 abolition mechanism is RRA 2025 s.2** (omits Ch.2 of Pt.1 HA 1988), NOT s.4. The house position's §20 commencement table (verified against legislation.gov.uk + SI 2026/421, locked 2026-05-30 in this corpus per the latest §20 verification) DOES list "Section 21 abolition (AST regime ended) | s.2 | In force | 1 May 2026 | SI 2026/421 reg.2". **However, the diagnosis flags this exact SI-for-S21 citation as an F-37 Bill-vs-enacted/SI-verification risk** because the house positions originally house-confirmed SI 2026/421 only for the pet-rights s.11. **Execution MUST re-verify the s.2 commencement row against the live legislation.gov.uk Changes-to-Legislation panel for RRA 2025 at write time** before asserting "1 May 2026 per SI 2026/421 reg.2"; if it cannot be re-verified, hedge to "in force from 2026 by commencement order (verify the exact SI before relying on the date)". Either way, cite the abolition mechanism as **RRA 2025 s.2**, never s.4.

3. **April 2027 "significantly higher / sell before 2027" overstated steer.** Section 4 body and FAQ #2 frame the 22%/42%/47% property income tax rates as "significantly higher than current income tax rates" and selling before 2027 as broadly beneficial. Per LOCKED **§7** + **§4**: FA 2026 (Royal Assent 18 March 2026), ss.6-7 + Sch 1, set the 2027/28 property income rates at 22%/42%/47% AND give the Section 24 finance-cost reducer at the **new 22% basic rate** (amending ITTOIA 2005 ss.274AA/274C, ITA 2007 s.399B). The correct framing:
   - A **basic-rate** landlord gets **NO new wedge** — the reducer (22%) tracks the basic property rate (22%).
   - A **higher/additional-rate** landlord sees the reducer rise 20% to 22% (a 2pp improvement), and the finance-cost wedge stays **20pp (42-22) / 25pp (47-22)** — the **same** as the 2026/27 wedge of 20pp (40-20) / 25pp (45-20). **The wedge does NOT widen.**
   - England, Wales and Northern Ireland only; **Scotland is carved out** (do NOT write "England and NI only" — Wales is in for 2027/28; the Welsh/Scottish self-setting power is a future s.8/Sch 2 power not in force for 2027/28).
   - So "sell before 2027 to escape higher rates" is **overstated** and, for basic-rate landlords, **wrong**. Reframe to: the 2027 change raises the headline property income rate but, because the reducer rises in lockstep, it does **not** open a new basic-rate wedge and does **not** widen the higher-rate wedge; the genuine sell-vs-hold tax question is the **cumulative effect of Section 24 over time**, not a 2027 cliff-edge. Re-verify FA 2026 Royal Assent (memory: RA 18 March 2026) at write time and state the rates as **enacted law**, not a proposal.

**Secondary: THIN_DEPTH.** 1,257 words against a ~3,400 target. Competitor diagnostic pages (PIN, LandlordZone, NRLA) run 1,500-2,800 words with structured sell-vs-hold reasoning. The rewrite is best-in-class at 3,400 with a scorecard + per-signal "how to read this" + two anonymised worked decision scenarios + 11-13 FAQs.

**Tertiary: STRUCTURE + INTENT_DRIFT + INVISIBLE.** No decision-framework scaffolding (the page lists 8 indicators flatly with no way for a reader to weigh them); Section 8 drifts into exit-mechanics that the siblings own; Section 9 is generic CTA bloat with a pricing-adjacency link; 0 inline CTAs; 0 authority links; invisible baseline.

**Load-bearing fix sequence (ordered by ROI):**
1. **Fix the three wrong-advice errors** (EPC C, S21 SI citation, April 2027 steer). This is the page's first job — it is currently misleading on three live-tax/regulatory points.
2. **Re-position to decision-diagnostic.** Add a short "How to use this guide" intro that frames the page as a self-diagnostic, add a **sell-vs-hold scorecard** (weighted signals, reader scores their own position), and give each of the 8 indicators a consistent "What the signal is / How to read it against your numbers / When it actually points to selling" micro-structure.
3. **Strip INTENT_DRIFT + pricing leak.** Cut the exit-mechanics depth from Section 8 down to a signpost paragraph that forward-links the exit-strategy sibling + the tax-on-sale sibling; remove the `how-much-does-a-property-accountant-cost` link and the "cost of advice is outweighed by savings" line; replace the generic Section 9 CTA with anonymised social proof + a discovery-call CTA.
4. **Add mandatory forward-links to the three siblings** (exit-mechanics, RRA-tax-stack, tax-on-sale) at the exact points where the reader's next question is "how do I structure the exit / what does RRA mean for my sell decision / what tax will I pay".
5. **Depth lift to ~3,400 words** with two anonymised worked decision scenarios (one basic-rate hold-case, one higher-rate-portfolio sell-case) that demonstrate the April 2027 reducer-tracks-rate point in numbers.
6. **FAQ count 4 to 11-13**, with the two error-carrying FAQs rewritten and new FAQs targeting the diagnostic query class ("should I sell my rental property in 2026", "signs it is time to sell a buy-to-let", "is now a good time to sell rental property uk", "should I sell or incorporate").
7. **Authority links: 4-6 verified citations** (legislation.gov.uk for the statutes below + gov.uk CGT rates + gov.uk MEES landlord guidance).
8. **Strip the spaced-hyphen in the meta description** and re-test the meta title against the diagnostic angle.

---

## Competitor URLs (Stage 2 — verify 200 + date-stamp at execution per §16.31)

| URL | Intent | What to borrow | What to differentiate against |
|---|---|---|---|
| https://propertyinvestorsnetwork.co.uk/should-landlords-sell-now-or-wait/ | "sell now or wait" decision | The explicit sell-vs-hold framing + the "it depends on your numbers" honesty | They have no UK-specific statute precision (no §7 reducer-tracks-rate point, no MEES E-vs-C correction); we win on tax accuracy + the scorecard |
| https://southyorkshirepropertybuyers.com/blog/tired-landlord-guide-exit-buy-to-let-2026/ | "tired landlord" emotional/exit | The emotional/lifestyle triggers (burnout, hands-off retirement) as a legitimate indicator | They are a we-buy-houses lead funnel (cash-buyer bias toward "sell to us"); we are neutral diagnostic + tax-led, no transaction bias |
| https://www.landlordzone.co.uk/news/should-you-hold-or-sell-making-the-right-choice-for-your-property-portfolio | "hold or sell" portfolio-level | Portfolio-level vs single-property framing; the "which property to sell first" angle | News-piece depth only; no worked numbers, no forward-link cluster; we add the scorecard + two worked scenarios |
| https://www.nrla.org.uk/news/selling-under-the-renters-rights-act | RRA-specific sell trigger | Authoritative RRA-2025 sell-ground framing (Ground 1A landlord-sale ground, 12-month re-let restriction) | Single-issue (RRA only); we cover the full multi-indicator diagnostic AND forward-link the dedicated RRA-tax sibling for the deep tax stack |

**Competitor depth ceiling for this query class:** ~1,500-2,800 words, 0-light statute precision, 0-2 worked examples, news/blog register. Our ~3,400-word target with a scorecard, per-signal micro-structure, 2 worked scenarios, 11-13 FAQs, and 4-6 verified statute citations is decisively best-in-class, not catch-up. **Note the South Yorkshire source is a cash-buyer lead funnel** — borrow the emotional-trigger taxonomy only; do not inherit its transaction bias (we are a neutral lead-gen handoff to a partner accountant, not a property buyer).

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (re-read at brief close; refresh if a later Track 2 batch has shipped).

**Collapse-direction check (mandatory per §16.T-collapse-equity-guard):** this page has **0 GSC + 0 Bing impressions**; the nearest sibling (exit-strategy-planning-guide) has only **8 GSC impressions (pos 35-79, 0 clicks)** and the RRA sibling is also low-equity. **There is no meaningful ranking equity in EITHER direction**, and no collapse-target candidate outranks this page by a margin that would justify a 301. More decisively, the intent is genuinely distinct (decision-diagnostic vs exit-mechanics vs RRA-tax-stack vs tax-payable). **Conclusion: REWRITE in place, NOT collapse.**

| Source | Slug | Intent | Resolution |
|---|---|---|---|
| Residual (own) | when-to-sell-rental-property-key-indicators-landlords | Consumer "is it time to sell?" multi-indicator DECISION-TRIGGER diagnostic | self — rewrite in place, re-positioned to diagnostic |
| Live corpus (rewritten 2026-05-21) | property-investment-exit-strategy-planning-guide | HOW to structure the exit (phased disposal, share sale, spouse-split via TCGA 1992 s.58, IHT uplift on death) | No collision — distinct intent (mechanics, not the decision). **Mandatory forward-link** from "once you have decided to sell". |
| Live corpus (2026-05-22) | landlords-considering-selling-portfolio-rra-2025-tax-implications | The RRA-2025-specific sell-vs-hold TAX decision (Ground 1A landlord-sale ground, HA 1988 s.16E 12-month re-let restriction inserted by RRA 2025 s.15, CGT exit stack) | No collision — RRA-specific tax stack. **Mandatory forward-link** from the regulatory-change indicator (Section 7). |
| Live corpus (CGT cluster) | tax-sell-rental-property-uk | Tax payable WHEN you sell (CGT computation, 60-day reporting) | No collision — tax-payable, not the decision. **Mandatory forward-link** from the capital-gains indicator (Section 2) + the tax-changes indicator (Section 4). |
| Live corpus (rewritten) | capital-gains-tax-property-complete-guide-uk | CGT pillar | No collision — pillar reference. Existing link retained. |
| Live corpus (rewritten) | how-much-does-a-property-accountant-cost | Pricing-adjacent page | **REMOVE the link** per pricing-leak / Decision E (lead-gen handoff model). |

**Conclusion:** REWRITE in place. No REDIRECT-PROPOSED. No FLAG-MANAGER (the pricing-leak is a known house-rule strip, handled in-brief, not escalated). The cluster stays non-overlapping by forward-linking each of the three siblings at the exact point the reader's next question changes from "should I?" to "how / what tax / what about RRA".

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page):

- **Exit-mechanics sibling:** `property-investment-exit-strategy-planning-guide` (`/blog/portfolio-management/property-investment-exit-strategy-planning-guide`) — forward-link from Section 8 "once you have decided to sell". MANDATORY.
- **RRA-tax-stack sibling:** `landlords-considering-selling-portfolio-rra-2025-tax-implications` (`/blog/landlord-tax-essentials/landlords-considering-selling-portfolio-rra-2025-tax-implications`) — forward-link from Section 7 regulatory indicator. MANDATORY.
- **Tax-payable-on-sale sibling:** `tax-sell-rental-property-uk` (`/blog/capital-gains-tax/tax-sell-rental-property-uk`) — forward-link from Section 2 (capital appreciation/CGT) + Section 4 (tax changes). MANDATORY.
- **CGT pillar:** `capital-gains-tax-property-complete-guide-uk` — keep existing link (pillar context).
- **PRR:** `principal-private-residence-relief-landlords` — keep (PRR signpost in the tax-efficient-exit signpost paragraph).
- **Section 24 guide:** existing Section 24 link — keep, but verify the live slug/category at execution (current body links `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide`; confirm it resolves, else repoint to `claim-mortgage-interest-rental-property-uk-section-24`).
- **Incorporation pillar:** `buy-to-let-limited-company-complete-guide-uk` — keep (the "sell vs incorporate" alternative).
- **MTD:** existing `making-tax-digital-landlords-april-2026-deadline` link — keep, verify resolves at execution.
- **REMOVE:** `how-much-does-a-property-accountant-cost` (pricing-leak adjacency).

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property 2026/27** [LOCKED]: 18% basic / 24% higher; AEA £3,000; PRR s.222-226; spouse no-gain-no-loss s.58; 60-day reporting where tax due. The capital-gains indicator (Section 2) and tax-efficient-exit signpost must match exactly.
- **§7 April 2027 property income tax** [LOCKED, RA 18 March 2026 — VERIFY Royal Assent + commencement at write time per §16.27/§16.30 Bill-vs-enacted discipline]: 22%/42%/47% England+Wales+NI (Scotland carved out); reducer at 22%; **no new wedge for basic-rate, wedge does NOT widen for higher-rate**. The tax-changes indicator (Section 4) + FAQ #2 must be corrected to this framing.
- **§4 Section 24** [LOCKED]: 20% basic-rate credit (2026/27), rises to 22% from 2027/28; the £100k personal-allowance-taper "60% trap" interaction. Section 4 indicator must use this.
- **§26.3 MEES regime** [LOCKED 2026-05-24]: live floor **EPC E** under SI 2015/962, £3,500 inc-VAT cap; **EPC C 2030 is NOT law** (do-not-write). Section 3 indicator + the "enhanced energy efficiency requirements" line in Section 7 must be corrected.
- **§20.1 / §20.2** [LOCKED]: RRA 2025 (2025 c.26), RA 27 Oct 2025; s.21 abolition mechanism = **RRA 2025 s.2** (not s.4); commencement phased by SI — **verify the s.2 commencement SI/date at write time**. Section 7 indicator + FAQ #4 must be corrected.
- **§20.2 / RRA s.15 / HA 1988 s.16E** [LOCKED]: landlord-sale possession ground carries a **12-month re-let restriction** (HA 1988 s.16E inserted by RRA 2025 s.15; £40,000 civil penalty for breach via s.16K). Relevant where the page touches "selling vacant vs with tenant in situ" — keep brief and forward-link the RRA sibling for the deep treatment.
- **§1 SDLT** [LOCKED]: additional-dwellings surcharge **5%** from 31 Oct 2024 (Section 7 indicator references "5%" — confirm correct, it is).
- **§9 IHT** [LOCKED]: NRB £325,000 / RNRB £175,000 frozen to 2031; pensions into IHT scope from 6 April 2027; standard BTL does NOT qualify for BPR (Pawson). Relevant to the personal-circumstances indicator (Section 6, "IHT planning") — keep light, do not overstate BPR.
- **§13 Do-not-write list** [LOCKED]: NO pricing; NO real client names; anonymised social proof only.

---

## House-position conflict flag (Stage 2)

**THREE confirmed conflicts (the page is currently wrong-advice on all three) plus one pricing-leak:**

- **F-conflict 1 — STALE_FACTS (EPC C).** Section 3 "below EPC Band C (problematic from 2030)" contradicts §26.3. Flag to `track2_site_wide_flags.md`: *STALE_FACTS | when-to-sell-rental-property-key-indicators-landlords | EPC C asserted as a 2030 obligation; live floor is EPC E under SI 2015/962, EPC C is unlegislated policy (§26.3 do-not-write). Correct at execution.*
- **F-conflict 2 — STALE_FACTS / F-37 SI-verification (Section 21).** Section 7 + FAQ #4 "Section 21 abolished ... commencement 1 May 2026 per SI 2026/421". Mechanism must be **RRA 2025 s.2** (not s.4); the specific S21-commencement SI must be **re-verified against legislation.gov.uk at write time** (house positions originally house-confirmed SI 2026/421 for s.11 pet-rights, not specifically for the s.2 S21 row — though the §20 commencement table now lists it). Flag: *STALE_FACTS/F-37 | s.21 abolition cite + SI date — re-verify s.2 commencement row at write time; cite RRA 2025 s.2 mechanism.*
- **F-conflict 3 — STALE_FACTS / WRONG-ADVICE (April 2027 steer).** Section 4 + FAQ #2 "significantly higher ... sell before 2027 beneficial" contradicts §7 (reducer rises to 22%; no new basic-rate wedge; higher-rate wedge unchanged). Flag: *WRONG-ADVICE | April 2027 "sell before" steer overstated; reducer tracks 22% rate, wedge does not widen (§7). Correct at execution; re-verify FA 2026 RA.*
- **F-conflict 4 — PRICING-LEAK (Decision E).** Section 9 links `how-much-does-a-property-accountant-cost` + asserts "cost of professional advice is typically far outweighed by the tax savings". Strip both per the lead-gen handoff model; replace with anonymised social proof. No fee figures present in body (good); no real client names (good).

**Execution session must fix all four before the build.**

---

## Authority links worth considering (Stage 2 — verify all at execution; reject non-200; date-stamp)

| URL | Use case |
|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/222 | TCGA 1992 s.222 (PRR) — tax-efficient-exit signpost |
| https://www.legislation.gov.uk/ukpga/1992/12/section/58 | TCGA 1992 s.58 (spouse no-gain-no-loss) — family-transfer signpost |
| https://www.gov.uk/capital-gains-tax/rates | gov.uk CGT rates (18%/24%, £3,000 AEA) — capital-gains indicator cross-reference |
| https://www.legislation.gov.uk/ukpga/2025/26 | Renters' Rights Act 2025 (2025 c.26) contents + Changes-to-Legislation panel — **the source to re-verify the s.2 commencement SI/date** |
| https://www.legislation.gov.uk/uksi/2015/962 | SI 2015/962 (MEES; EPC E floor, £3,500 cap) — energy-efficiency indicator |
| https://www.gov.uk/guidance/domestic-private-rented-property-minimum-energy-efficiency-standard-landlord-guidance | gov.uk MEES landlord guidance (EPC C is proposed, not law) — energy-efficiency indicator |
| https://www.gov.uk/government/publications/changes-to-tax-rates-for-property-savings-and-dividend-income | HMRC measure paper "Changes to Tax rates for Property, Savings and Dividend Income" (22/42/47, England+Wales+NI) — tax-changes indicator |
| https://www.legislation.gov.uk/ukpga/1988/50/section/16E | HA 1988 s.16E (12-month re-let restriction, inserted by RRA 2025 s.15) — regulatory indicator, if the in-situ-vs-vacant point is included |

**(Execution session selects 4-6 to actually cite in body. Verify the operative wording is current — TCGA 1992 s.4 is the canonical "URL live but section substituted" trap; do not cite s.4 for rates.)**

---

## metaTitle / metaDescription / H1 plan

- **metaTitle (test 2-3 at execution, ≤ 62 chars):**
  - "When to Sell a Rental Property: 8 Signals for UK Landlords" (57)
  - "Should I Sell My Rental Property? 8 UK Landlord Signals" (54)
  - Keep close to the current on-intent title; lean the diagnostic angle ("signals" over "indicators" tests well against "signs it is time to sell"). No spaced hyphen; no em-dash.
- **metaDescription (≤ 158 chars, no spaced hyphen):**
  - "A neutral self-diagnostic for UK landlords weighing whether to sell a rental property. Read the 8 sell-vs-hold signals against your own numbers, with up-to-date 2026/27 tax." (re-time to ≤158 at execution; current description has a spaced-hyphen "conditions - comprehensive" to strip).
- **H1:** "When to Sell a Rental Property: 8 Key Indicators Every UK Landlord Should Know" (keep, or align to the chosen metaTitle angle; H1 stays diagnostic, not mechanics).

---

## Section-by-section content plan (~3,400 words)

1. **Intro + "How to use this guide" (≈250 w).** Frame as a neutral self-diagnostic. State the page answers "is it time to sell?" and that the three follow-on questions (how to structure the exit / what tax you will pay / what RRA 2025 means for the decision) are answered by the three forward-linked siblings. No transaction bias.
2. **The sell-vs-hold scorecard (≈300 w).** A short reader-scored framework: the 8 signals grouped into Financial (yield, capital growth, costs), Structural/Tax (Section 24 + 2027 rates), External (market, regulation), and Personal. Reader tallies which signals are firing. "Three or more firing across two groups usually warrants a formal review" framing (judgement, not a hard rule).
3. **Signal 1 — Deteriorating net rental yield (≈350 w).** What the signal is / how to read it (gross vs net, three-year trend, local comparison) / when it actually points to selling. Keep the anonymised Manchester-style example but de-identify and make it illustrative.
4. **Signal 2 — Capital appreciation and the CGT trade-off (≈350 w).** Sell-on-growth logic; CGT 18%/24% + £3,000 AEA (§5); **forward-link `tax-sell-rental-property-uk`** for the actual computation and 60-day reporting. The decision point: lock in a gain vs continued yield.
5. **Signal 3 — Mounting maintenance + energy-efficiency cost (≈350 w).** **CORRECTED:** live floor is EPC E (SI 2015/962, £3,500 cap); EPC C is proposed, not law (§26.3) — frame as a likely future cost to price into a hold decision, not a current obligation. Capital-vs-revenue note (improvement adds to CGT base cost per §26.7). Anonymised roof-replacement-style illustration.
6. **Signal 4 — Section 24 and the April 2027 property income tax change (≈450 w, load-bearing correction).** **CORRECTED:** Section 24 20% credit (rising to 22% in 2027/28); the £100k taper 60% trap. April 2027 rates 22/42/47 (England+Wales+NI, Scotland out) are **enacted (FA 2026, RA 18 Mar 2026 — re-verify)**, but the reducer rises to 22% in lockstep so **no new basic-rate wedge** and the **higher-rate wedge does not widen**. The genuine tax sell-signal is the cumulative Section 24 drag for leveraged higher-rate landlords, not a 2027 cliff-edge. Forward-link `tax-sell-rental-property-uk` + the incorporation pillar for the "sell vs incorporate" branch.
7. **Signal 5 — Changing local market dynamics (≈300 w).** Employer relocation, transport, oversupply, demographic shift. How to read leading vs lagging indicators.
8. **Signal 6 — Personal financial circumstances (≈300 w).** Retirement/simplification, liquidity need, debt reduction, IHT planning (NRB/RNRB frozen to 2031; pensions into IHT from Apr 2027 per §9 — keep light, do not overstate BPR which standard BTL does not get), divorce/separation (s.58 no-gain-no-loss).
9. **Signal 7 — Regulatory and legislative change (≈400 w).** **CORRECTED:** RRA 2025 (2025 c.26, RA 27 Oct 2025); s.21 abolition = **RRA 2025 s.2** (verify commencement SI/date at write time); the landlord-sale possession ground carries a 12-month re-let restriction (HA 1988 s.16E via RRA 2025 s.15). SDLT 5% surcharge (§1). EPC E live / EPC C proposed (cross-ref Signal 3). **Forward-link `landlords-considering-selling-portfolio-rra-2025-tax-implications`** for the deep RRA-tax stack and the in-situ-vs-vacant sale decision.
10. **Signal 8 — When the personal/emotional case is its own signal (≈250 w).** The "tired landlord" / hands-off-retirement trigger as legitimate (borrowed framing from the competitor cluster, de-biased). Burnout, management fatigue, opportunity cost of time.
11. **Two anonymised worked decision scenarios (≈400 w).** (a) Basic-rate landlord, single low-yield flat — the April 2027 change does NOT open a new wedge, so the decision rests on yield/costs, not a tax cliff (demonstrates the §7 correction in numbers). (b) Higher-rate leveraged 4-property portfolio — cumulative Section 24 drag + a peaked-value property = a phased-disposal case; **forward-link the exit-strategy sibling** for the mechanics.
12. **Once you have decided to sell (signpost, ≈150 w).** Short paragraph that hands off cleanly: exit mechanics → exit-strategy sibling; tax payable → tax-on-sale sibling; RRA sell-stack → RRA sibling. PRR (s.222) + AEA timing as one-line signposts only (the siblings own the depth). NO pricing.
13. **Closing + anonymised social proof + CTA (≈150 w).** Annual-review discipline close. Replace the pricing-leak CTA with anonymised social proof (e.g., "a higher-rate landlord with a four-property portfolio used a phased two-year disposal to keep each year's gain efficient" — no names, no fees) and a discovery-call CTA. LeadForm is auto-injected by `BlogPostRenderer.tsx`; do not duplicate.

**FAQs (11-13, target the diagnostic query class; rewrite the two error-carrying ones):**
- "What are the signs it is time to sell a rental property?" (new, scorecard summary)
- "Is now a good time to sell a rental property in the UK?" (new)
- "Should I sell my rental property before the April 2027 tax changes?" (**rewrite FAQ #2** — basic-rate: no new wedge; higher-rate: wedge unchanged; reducer rises to 22%)
- "Is the abolition of Section 21 a good reason to sell?" (**rewrite FAQ #4** — RRA 2025 s.2; verify commencement; 12-month re-let restriction context; not a sole reason)
- "What are the tax implications of selling a rental property?" (keep FAQ #1, light, forward-link tax-on-sale sibling)
- "How do I know if my rental yield is too low to continue?" (keep FAQ #3)
- "Do I have to upgrade to EPC C before I can sell or keep letting?" (new — EPC E is the live floor; EPC C is proposed, not law)
- "Should I sell or incorporate to fix Section 24?" (new — forward-link incorporation pillar)
- "Can I sell with a tenant in situ, or must the property be vacant?" (new — light touch; 12-month re-let restriction applies to landlord-sale possession ground; forward-link RRA sibling)
- "How much CGT will I pay when I sell?" (new — 18/24, £3,000 AEA, 60-day; forward-link tax-on-sale sibling)
- "How many of these signals should be firing before I sell?" (new — scorecard judgement)
- (optional) "Is it better to sell one property or the whole portfolio?" (new — portfolio-level framing; forward-link exit-strategy sibling)

---

## Statute spine (every section with its Act — verify each at write time)

- **TCGA 1992 s.1H** (CGT residential rates 18%/24%) — verify current operative section; do NOT cite s.4 (substituted by FA 2019, the canonical "URL live but wording removed" trap).
- **TCGA 1992 s.222** (Private Residence Relief).
- **TCGA 1992 s.223** (PRR final-period / deemed occupation, 9-month final period).
- **TCGA 1992 s.58** (spouse / civil partner no-gain-no-loss transfer).
- **TCGA 1992 s.38** (allowable expenditure / base cost — capital improvement note in Signal 3).
- **ITTOIA 2005 ss.274AA / 274C** (Section 24 finance-cost reducer; reducer rate basis) — amended by FA 2026 Sch 1 to 22% from 2027/28.
- **ITA 2007 s.399B** (finance-cost relief mechanism) — amended by FA 2026 Sch 1.
- **Finance Act 2026 ss.6-7 + Sch 1** (April 2027 property income rates 22/42/47 + reducer at 22%) — Royal Assent 18 March 2026; re-verify RA + commencement at write time.
- **Finance (No.2) Act 2024** (SDLT additional-dwellings surcharge 5% from 31 Oct 2024).
- **FA 2003 Sch 4ZA** (SDLT higher rates for additional dwellings).
- **Renters' Rights Act 2025 (2025 c.26) s.2** (abolition of assured shorthold tenancies / s.21 mechanism) — Royal Assent 27 Oct 2025; re-verify commencement SI/date at write time.
- **Renters' Rights Act 2025 s.15** (inserts HA 1988 s.16E / s.16J / s.16K).
- **Housing Act 1988 s.16E** (12-month re-let restriction on landlord-sale / landlord-occupation possession grounds).
- **SI 2015/962** (Energy Efficiency (Private Rented Property) (England and Wales) Regulations 2015 — MEES EPC E floor, reg.25(2) £3,500 cap).
- **IHTA 1984** (NRB / RNRB framing — §9; light reference only, no BPR for standard BTL).

---

## Universal rules — inherited from parent program (do not restate)

Pointer per §4.13: `NETNEW_PROGRAM.md §4` voice block + `competitor_rewrite_playbook.md §5` universal site rules. **Critical for this brief:** NO em-dashes and NO spaced hyphens used as dashes (the current meta description has one); NO pricing / fee figures anywhere; NO real client names; anonymised social proof only; LeadForm auto-injected (do not duplicate); 1-3 inline `<aside>` CTAs at conversion moments; FAQs in frontmatter `faqs:` array (FAQPage schema auto-emitted, never hand-add); semantic HTML in body, no Tailwind classes; every statute citation verified against legislation.gov.uk at write time including any Finance Act Royal Assent (the F-37 Bill-vs-enacted pattern).

---

## 19-step workflow — inherited (Wave 5) with Track 2 deltas

Pointer per §4.14: full 19-step workflow from `NETNEW_PROGRAM.md §7`. Track 2 deltas: Step 9 rewrite at existing path (preserve slug/canonical/category; update `dateModified`); Step 12 confirm no redirect (none — REWRITE in place); Step 13 update/insert `monitored_pages` row (INVISIBLE baseline — 180-day window from merge per F-11). **Load-bearing pre-rewrite verification steps for THIS page:** (a) re-verify FA 2026 §7 Royal Assent + commencement against legislation.gov.uk; (b) re-verify RRA 2025 s.2 commencement SI/date against the RRA 2025 Changes-to-Legislation panel; (c) confirm §26.3 EPC E/C state unchanged. Six-checks at Step 11 must additionally include: em-dash/spaced-dash count = 0; `£[0-9]` fee-line count = 0 in body; the `how-much-does-a-property-accountant-cost` link is removed; the three mandatory sibling forward-links resolve.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 18/24 + £3,000 AEA: __
- §7 April 2027 (reducer 22%, no new wedge) — FA 2026 RA verified at write: __
- §4 Section 24 (20% to 22%): __
- §26.3 MEES (EPC E live / EPC C proposed): __ corrected
- §20.1/§20.2 RRA s.2 + commencement SI verified at write: __ corrected
- §1 SDLT 5% surcharge: __
- §9 IHT (light): __
- §13 pricing strip + social proof: __ confirmed

### Comparison: before vs after
- Word count: 1,257 → __
- H2/H3 count: 9 H2 + 9 H3 → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked decision scenarios: 0 → __ (2 expected)
- Sell-vs-hold scorecard: 0 → __ (1 expected)
- Sibling forward-links: 0 → __ (3 mandatory)
- Pricing-leak link removed: __ (Y/N)
- Three wrong-advice errors corrected: __ (EPC C / S21 SI / April 2027)

### Flags raised
- F-conflict 1 (EPC C): __ corrected
- F-conflict 2 (S21 SI / F-37): __ re-verified + corrected
- F-conflict 3 (April 2027 steer): __ corrected
- F-conflict 4 (pricing leak): __ stripped
- Any new flags surfaced at execution: __

### 2-3 sentence summary
- (populated at execution time)
