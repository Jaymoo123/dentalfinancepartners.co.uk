# Property Wave 2 — Session A discovery log (append-only)

Observations that don't require immediate action but feed future waves and the Track 2 sweep over legacy pages. Append-only.

## Categories

- `ADJACENT_TOPIC` — competitor covers something we don't, not in topic_gaps_final.md
- `CALCULATOR_IDEA` — interactive widget worth building (IHT estate calculator, residence-test day-counter, etc)
- `COMPONENT_IDEA` — UI pattern from competitors worth borrowing
- `EXISTING_PAGE_STALE` — existing Property page with stale figures / framings (feeds Track 2 sweep)
- `EXISTING_PAGE_LINK_OPPORTUNITY` — existing page that should link to your new page
- `AUTHORITY_GAP` — HMRC manual / legislation never cited on our site
- `CROSS_NICHE_LINK` — Property topic that bridges to dentists / medical / solicitors / contractors-ir35
- `SERP_FEATURE` — featured snippet / rich answer / knowledge panel competitors win
- `INTERNAL_RESEARCH` — question you couldn't answer with public sources

## Format

```
### [D-N] [YYYY-MM-DD] [CATEGORY] Title
- **Page being worked on:** <slug>
- **Observation:** <text>
- **Why it matters:** <text>
- **Suggested next action:** <text or "no action — observation only">
```

---

### [D-1] [2026-05-22] [AUTHORITY_GAP] gov.uk pension-IHT publication URL stale or moved
- **Page being worked on:** A1 iht-property-investors-decision-framework-2026-onwards
- **Observation:** The URL https://www.gov.uk/government/publications/changes-to-the-tax-treatment-of-pensions-on-death cited in the A1 brief authority list returned HTTP 404 on fetch. House positions §15.5 carries the verified mechanics (2026-05-22 stamp), so not blocking, but the canonical gov.uk URL is now unknown.
- **Why it matters:** Other Session A pages (A8 RNRB, A9 pension-IHT) and future expat / planning pages will want the canonical reform-publication URL. Cited URL in citations.added of A1 has been quietly demoted to "Autumn Budget 2024 narrative reference" rather than a clickable gov.uk link.
- **Suggested next action:** Manager (or A9 session-step when claimed) to do a fresh search at gov.uk for the current pension-IHT publication URL and refresh the authority list in the wave2 IHT briefs. A9 brief specifically should be re-checked since it's the dedicated pension-IHT page.

### [D-2] [2026-05-22] [SERP_FEATURE] Competitor sites are stale on the 2024-25 reform package
- **Page being worked on:** A1
- **Observation:** ukpropertyaccountants.co.uk's IHT-reform-commentary page was published September 2023 and updated only February 2024; it does not cover the Autumn Budget 2024 BPR/APR cap or the April 2027 pension inclusion. Two of the three ukpropertyaccountants competitor URLs in the A1 brief proved either truncated (top-10 tips list cut off mid-content) or pre-Budget-2024 in date. The fiscal-drag page was the only useful one.
- **Why it matters:** SERP for "IHT landlord 2026/2027" queries is likely soft: specialist competitors haven't refreshed for the reform package, which means a well-written post-Budget-2024 decision page can rank quickly. Wider implication: across Wave 2 IHT pages, competitor pages will be light on the actual 2024-25 mechanics; our pages should lean into the recency advantage explicitly (date stamps, "as announced Autumn Budget 2024, in force from..." phrasing).
- **Suggested next action:** No action — observation that should sharpen meta-title/description choices on subsequent A-bucket pages (lead with reform anchors and dates).

### [D-3] [2026-05-22] [EXISTING_PAGE_STALE] Existing BPR-rental-property page is shallow and pre-cap
- **Page being worked on:** A1 (referenced existing `business-property-relief-rental-property-iht.md`)
- **Observation:** The existing BPR-rental-property page on `main` has 4 FAQs (vs Wave 2 norm of 10-14), no statute citations, no Pawson reference, and no mention of the April 2026 £1m BPR/APR cap. It was apparently a Track 1 wave 1 candidate that landed pre-house-positions §15. Adequate as a slim helper but well below current quality bar.
- **Why it matters:** Feeds the Track 2 sweep over legacy pages. This is a strong candidate for rewrite to current standards once the net-new programme catches up. Bidirectional cross-link with A1 would be valuable in the meantime (raised as F-4 in flags).
- **Suggested next action:** Add to Track 2 priority list for legacy rewrites; the page already ranks for some BTL-BPR queries (per pre-existing GSC signal in the wider pillar).

### [D-4] [2026-05-22] [AUTHORITY_GAP] Pawson UKUT short-name URL on gov.uk is dead; canonical is the full-name path
- **Page being worked on:** A5 serviced-accommodation-bpr-eligibility-pawson-test
- **Observation:** The Pawson UKUT URL most commonly quoted (and reproduced in the A5 brief) is `/tax-and-chancery-tribunal-decisions/pawson-v-hmrc-2013-ukut-050-tcc`, which returns 404 on gov.uk. The canonical record is at `/tax-and-chancery-tribunal-decisions/the-commissioners-for-hm-revenue-and-customs-v-the-personal-representatives-of-nicolette-vivian-pawson-deceased-2013-ukut-050-tcc`. Brander v HMRC [2010] UKUT 300 (TCC) is likely to follow the same long-name pattern. BAILII has the full judgment text but currently presents an Anubis bot-protection challenge to direct httpx fetches.
- **Why it matters:** Multiple Wave 2 A-bucket pages (and Track 2 BPR rewrites) will want a canonical Pawson URL. Quoting a 404 URL on a tax-IHT page is the worst kind of authority signal. Workflow improvement: brief regen scripts should validate authority URLs at generation time (HTTP HEAD or GET), not assume tribunal URL shape.
- **Suggested next action:** When A6-A10 sessions cite Pawson, use the full-name URL pattern. Add a small URL-validation step to brief regen scripts.

### [D-5] [2026-05-22] [AUTHORITY_GAP] Graham/Carnwethers FTT 2018 reference not surfacing on gov.uk search
- **Page being worked on:** A5 serviced-accommodation-bpr-eligibility-pawson-test
- **Observation:** The A5 brief suggested `Personal Representatives of Grace Joyce Graham deceased v HMRC [2018] UKFTT 306 (TC)` (Carnwethers Guesthouse) as the post-Pawson positive-BPR counterweight. Multiple gov.uk search API queries did not return a matching tribunal decision. The case may exist on BAILII (currently bot-blocked) or may have been mislabeled in source material. Vigne [2018] UKUT 0357 (TCC) was substituted as a stronger Upper-Tribunal-level authority on the same trading-versus-investment boundary.
- **Why it matters:** If Graham/Carnwethers does exist, it's a useful additional fact-pattern reference for serviced-accommodation BPR. Worth a manual BAILII lookup outside session time.
- **Suggested next action:** Manager (or any session with manual research time) to verify whether Graham/Carnwethers FTT 2018 exists and at what citation. If confirmed, add to authority links list in any future Pawson-adjacent brief.

### [D-6] [2026-05-22] [CALCULATOR_IDEA] Pawson fact-pattern self-check / serviced-accommodation BPR scorecard
- **Page being worked on:** A5 serviced-accommodation-bpr-eligibility-pawson-test
- **Observation:** The fact-pattern checklist in A5 has 7 trading-side indicators and 7 inverse investment-side indicators. A scorecard that asks the operator to confirm each indicator and outputs a "likely qualifies / borderline / likely fails" verdict would be a strong interactive feature on this page and the BPR-pillar. The Pawson question is structurally well-suited to a checklist UI (binary indicators with a qualitative aggregation, not a calculator).
- **Why it matters:** Calculator/widget pages historically convert better than long-form articles at the same intent depth, and this topic has high commercial value (estates of £2m+).
- **Suggested next action:** Add to calculator backlog; could ship as a `/calculators/serviced-accommodation-bpr-eligibility` page with shadcn checkbox UI and an outcome panel. Suggested implementation effort: ~half-day.

### [D-7] [2026-05-22] [AUTHORITY_GAP] legislation.gov.uk Schedule A1 endpoint returns 437 service error
- **Page being worked on:** A6 iht-non-resident-uk-property-april-2025-residence-test
- **Observation:** Direct fetch of `https://www.legislation.gov.uk/ukpga/1984/51/schedule/A1` returned an HTTP 437 service error with a message from the National Archives asking users to email Legislation@nationalarchives.gov.uk. The IHTA 1984 contents page at `https://www.legislation.gov.uk/ukpga/1984/51/contents` responds normally. Workaround: cite via the contents URL with a note that Schedule A1 was inserted by Finance (No. 2) Act 2017.
- **Why it matters:** Multiple Wave 2 pages and Track 2 sweep candidates will want to deep-link directly to specific IHTA 1984 sections and schedules. A 437 from the schedule-level endpoint is intermittent (probably) but persistent enough to be a workflow risk.
- **Suggested next action:** Re-try the endpoint in a subsequent session; if persistent, write a small fallback in `optimisation_engine/competitor/_fetch.py` that catches 437 and routes to the contents page with a logged note. Also report to National Archives via the address they suggested if the issue persists.

### [D-8] [2026-05-22] [SERP_FEATURE] Stale competitor pages on the April 2025 non-dom reform represent a major SERP opportunity
- **Page being worked on:** A6 iht-non-resident-uk-property-april-2025-residence-test
- **Observation:** uklandlordtax.co.uk's IHT-for-non-residents page (one of the two competitor URLs in the brief) is from July 2023 and still uses pre-reform 15-of-20 deemed-domicile language and the 3-year departure shadow. UK Property Accountants has updated for the reform but their treatment is shallow (no worked examples; no transitional protection detail; no Budget 2025 anti-avoidance). The SERP for "non-resident UK property inheritance tax" is broadly mis-served by the field.
- **Why it matters:** Recency advantage is large. A page that correctly states the two-route LTR test, the tail taper schedule, the 30 October 2024 transitional cut-off, the Sch A1 continuity, and the Budget 2025 anti-avoidance is materially more accurate than the typical competitor. Worth promoting A6 actively to non-resident landlord queries when GSC starts surfacing impressions.
- **Suggested next action:** No immediate action; mark A6 as a recency-priority page in any Track 2 monitoring / surfacing pass.

### [D-9] [2026-05-22] [INTERNAL_RESEARCH] LTR test interaction with Statutory Residence Test split-year rules
- **Page being worked on:** A6 iht-non-resident-uk-property-april-2025-residence-test
- **Observation:** HMRC guidance on the LTR test does not explicitly address how split-year treatment under SRT (Cases 1-8, FA 2013 Sch 45 Part 3) interacts with the 10-of-20 count. The natural reading is that a split-year is treated as a year of UK residence for SRT purposes; that should count as one year toward the LTR test. But the published HMRC guidance does not state this explicitly.
- **Why it matters:** Session C is writing the SRT and split-year pages (C2 done, C3 in progress). Cross-session consistency matters: if Session C lands a split-year page that says split-year is non-UK-resident for the year, that contradicts the LTR-count assumption in A6.
- **Suggested next action:** Cross-check with Session C's C2/C3 content at merge time. If a substantive interaction exists that A6 understates, raise as a content-correction flag and adjust A6's "10 of 20" worked language to be precise about split-year treatment.

### [D-10] [2026-05-22] [EXISTING_PAGE_STALE] Existing CGT-on-inherited-rental page misses PR-side mechanics entirely
- **Page being worked on:** A7 inheriting-uk-rental-property-executors-step-by-step
- **Observation:** The existing `cgt-inherited-rental-property-calculation-uk.md` page (April 2026, ~1,800 words, 4 FAQs) addresses CGT only from the beneficiary's eventual sale perspective. It does not cover the personal-representative CGT position during administration: the 24% PR rate under s.1H TCGA 1992, the 3-tax-year AEA window under s.3(7), the practical PR-sale-vs-assent CGT swing for a basic-rate beneficiary, or the s.62 death-uplift base-cost mechanics in their own right. A7 plugs that gap on the process side. A future Track 2 lift of the CGT-calc page should add an "if you are the personal representative" section.
- **Why it matters:** SERP for "CGT on inherited rental property" attracts both beneficiary readers (the existing page serves them) and executor readers (currently unserved by our existing page, now served by A7). A Track 2 enrichment of the CGT-calc page to add the PR section + reciprocal A7 cross-link would close the loop.
- **Suggested next action:** Add to Track 2 priority list. F-20 flags the cross-link side; the page-enrichment side is the additional Track 2 work item.

### [D-11] [2026-05-22] [SERP_FEATURE] Probate-process competitor pages do not connect to landlord-specific mechanics
- **Page being worked on:** A7 inheriting-uk-rental-property-executors-step-by-step
- **Observation:** The UKPA "how-long-does-probate-take" and "inheriting-a-house" pages (the two competitor URLs in the brief) are generic probate-process pages that do not address the rental-specific layer: NRL handover when a beneficiary is non-resident, the deposit re-registration 30-day clock on a change of landlord, section 3 LTA 1985 change-of-landlord notice, the PR-CGT-rate-vs-beneficiary-CGT-rate swing, the s.227 IHT instalment option for liquidity-constrained landlord estates, or the Schedule A1 IHTA 1984 look-through for offshore-held UK residential property. The SERP for "executor inherited rental property" is broadly mis-served — generic probate content shows up; rental-specific operational content is rare.
- **Why it matters:** Same recency / depth advantage pattern as D-8 (April 2025 non-resident IHT regime). A7's seven-step structure with rental-specific operational mechanics on each step gives it a clear differentiation from generic probate content, even from UKPA who write specifically for property.
- **Suggested next action:** No immediate action; mark A7 as a topical-depth-priority page in Track 2 monitoring.

### [D-12] [2026-05-22] [CALCULATOR_IDEA] PR-sell-vs-assent CGT swing calculator
- **Page being worked on:** A7 inheriting-uk-rental-property-executors-step-by-step
- **Observation:** The step 5 decision (PR sale vs assent then beneficiary sale) is a structured choice with a small number of inputs: gain expected at sale, beneficiary marginal income tax band, beneficiary's existing CGT AEA usage in the tax year of disposal, number of years into administration (drives PR AEA availability), and whether the property would acquire PRR after the assent. A widget on the page that asks those five inputs and outputs the CGT cost under each route would be a strong interactive conversion lever. Output is deterministic (no judgement call) and the inputs are all things an executor knows.
- **Why it matters:** This is the single highest-value decision an executor makes on the rental property, and our page is the only one in the field that even names it. A calculator deepens the moat.
- **Suggested next action:** Add to calculator backlog at `/calculators/pr-sell-vs-assent-cgt`. Suggested implementation effort: half-day.

### [D-13] [2026-05-22] [CALCULATOR_IDEA] RNRB taper estate-input calculator with April 2027 pension toggle
- **Page being worked on:** A8 iht-residence-nil-rate-band-2m-taper-property-portfolios
- **Observation:** A8's three estate-tier worked examples (Marshall £1.6m / Okoye £2.15m / Bennett £2.8m) generalise to a simple deterministic calculation: inputs are property equity (residence + BTL portfolio + other), other liquid assets (cash + ISAs + non-pension investments), pension fund balance, transferable-RNRB availability (binary: spouse pre-deceased and RNRB unused?), and death-year scenario (pre-April-2027 vs post). Outputs: gross E for the taper test, taper withdrawal at s.8D(5), default and transferable RNRB after taper, full IHT calculation. A landlord can punch in £700k / £900k / £140k / £280k / yes / 2027+ and immediately see whether the wall has bitten and by how much. Output is deterministic and inputs are all things the landlord knows.
- **Why it matters:** Same logic as D-12 — the IHT taper outcome is the single most consequential RNRB question for an estate, and the binary "am I above or below the wall" is exactly the kind of pre-qualifier that converts a casual reader into a planning enquiry. The pension toggle separately shows the April 2027 step-change.
- **Suggested next action:** Add to calculator backlog at `/calculators/rnrb-2m-taper`. Could share UI primitives with D-12 (similar shape). Suggested implementation effort: half-day.

### [D-14] [2026-05-22] [EXISTING_PAGE_STALE] Existing IHT pillar's RNRB paragraph misses downsizing addition entirely
- **Page being worked on:** A8 iht-residence-nil-rate-band-2m-taper-property-portfolios
- **Observation:** The existing IHT pillar (`inheritance-tax-rental-property-uk-guide`) addresses RNRB in three lines (allowance amount, BTL non-qualification, £2m taper). It does not mention the downsizing addition (ss.8FA-8FE), the 8 July 2015 cutoff date, the s.8H QRI definition, the s.8K direct-lineal-descendant list, the transferable-RNRB s.8L mechanics, or the will-architecture trust-type tests (s.49A IPDI / s.71A bereaved minor / s.71D 18-25). These are not gaps in the pillar (which is a summary), but they are reasons why A8 is the genuine deep page.
- **Why it matters:** Track 2 enrichment opportunity. The IHT pillar should retain its summary role but add a "for the downsizing addition and full taper mechanics, see A8" pointer (F-22 covers the cross-link).
- **Suggested next action:** Add to Track 2 priority list as an "enrich existing pillar with a 1-paragraph downsizing reference + A8 back-link" item.

### [D-15] [2026-05-22] [INTERNAL_RESEARCH] Equalising spouse estates pre-death for taper preservation has CGT side-effects not yet papered
- **Page being worked on:** A8 iht-residence-nil-rate-band-2m-taper-property-portfolios
- **Observation:** A8 mentions equalisation of spousal estates as a planning option to preserve the transferable RNRB on the second death where the first-death E is near the taper threshold. The CGT mechanic (TCGA 1992 s.58 no-gain-no-loss inter-spouse transfer) is already covered on `cgt-property-transfer-spouse`. But the SDLT and stamp-duty-on-mortgaged-property interactions (where the equalisation transfer involves a mortgaged BTL and the receiving spouse assumes a share of the debt) are not fully papered. Schedule 4 Paragraph 8 FA 2003 deals with this in the consideration-on-debt-assumption context; SDLT can apply to the assumed-debt share even on a spouse-to-spouse transfer.
- **Why it matters:** Equalisation is a clean idea on the IHT side but the SDLT side is a trap. A future Track 2 page or a Wave 3 net-new page on "Spouse-equalisation for IHT: the SDLT trap" would close this gap.
- **Suggested next action:** No immediate action; logged for future content prioritisation.

### [D-16] [2026-05-22] [AUTHORITY_GAP] gov.uk pension death-benefits publication URL remains 404 across multiple sessions
- **Page being worked on:** A9 pension-iht-april-2027-landlord-estate-planning
- **Observation:** D-1 (from A1 session) flagged that `https://www.gov.uk/government/publications/changes-to-the-tax-treatment-of-pensions-on-death` returned 404. A9 session re-tested implicitly (URL listed in A9 brief authority links); URL still dead. The pension-IHT consultation OUTCOME URL (`https://www.gov.uk/government/consultations/inheritance-tax-on-pensions-liability-reporting-and-payment`) is alive and confirms the key facts (6 April 2027 commencement; PRs not scheme administrators pay; death-in-service excluded; outcome published 2025). A9 cites the consultation-outcome URL as primary anchor in place of the dead publication URL.
- **Why it matters:** Brief regen scripts should switch the listed authority URL for the pension-IHT brief family (A9, and any future pension-IHT content) to the consultation outcome URL. The dead URL has now been confirmed dead across at least two sessions; it is unlikely to come back.
- **Suggested next action:** Update brief authority lists on next regen pass to use `/inheritance-tax-on-pensions-liability-reporting-and-payment` as the canonical pension-IHT gov.uk URL. Remove the 404 URL from the standing authority list.

### [D-17] [2026-05-22] [CALCULATOR_IDEA] Pre-vs-post-April-2027 IHT delta calculator with pension-toggle
- **Page being worked on:** A9 pension-iht-april-2027-landlord-estate-planning
- **Observation:** A9's worked impact (same landlord, same wealth, two different death years producing a £380k IHT delta) is the structural high-conversion moment. A calculator that takes property equity, ISAs, cash, pension fund, transferable-RNRB availability, and married/single status, and outputs side-by-side pre-2027 vs post-2027 IHT bills with the delta highlighted, would land precisely on the planning-decision moment. Shares ~70% of input shape with the D-13 RNRB calculator; could be a unified "estate-planner" widget with the pension-toggle being one of three scenario switches (alongside April 2026 BPR cap and April 2025 LTR test).
- **Why it matters:** The delta IS the planning trigger. Calculator output is deterministic; inputs are all things the landlord knows. Cross-converts well into a structured pre-2027 review enquiry.
- **Suggested next action:** Add to calculator backlog. Suggested implementation: bundled "IHT reform scenario planner" with three toggles (pre/post April 2026 BPR, pre/post April 2025 LTR, pre/post April 2027 pension) and the unified output. Half-day to a day's work depending on UI ambition.

### [D-18] [2026-05-22] [FACTUAL] Brief overstated APR owner-occupation period (says 5 years; statute is 2)
- **Page being worked on:** A10 agricultural-property-relief-mixed-estate-1m-cap
- **Observation:** The A10 brief's framing differentiator states "APR-specific tests (5-year occupation, 7-year ownership where let)". The correct rule under s.117 IHTA 1984 is **2 years owner-occupation** OR **7 years owned-with-agricultural-occupation**. Verified by direct fetch of `https://www.legislation.gov.uk/ukpga/1984/51/section/117` during the A10 session. A10 body uses the correct 2/7 framing throughout.
- **Why it matters:** Brief regen scripts should correct the framing-differentiator field on this brief and any other brief that cites APR qualifying periods to the verified 2-year owner-occupied / 7-year let-period rule. The "5-year" figure is not a recognised APR period anywhere in Part V Ch II IHTA 1984 (and not in HMRC's IHTM24050 either); this looks like a source-document or generation artefact.
- **Suggested next action:** Manager (or next brief-regen pass) to correct the A10 brief framing-differentiator field, and to audit other Wave 2 briefs that reference APR qualifying periods.

### [D-19] [2026-05-22] [CALCULATOR_IDEA] Mixed-estate APR + BPR allocation calculator with £1m cap
- **Page being worked on:** A10 agricultural-property-relief-mixed-estate-1m-cap
- **Observation:** A10's Lambert worked example generalises into a calculator: inputs are APR-qualifying value (agricultural value, not market value), BPR-qualifying value (split between 100%-rate-pre-cap and 50%-rate items like AIM shares), pre-1995-tenanted agricultural value, BTL portfolio value, other estate value, transferable NRB availability, age at death (for April 2027 pension overlay). Output is the chargeable estate before/after the £1m cap, the optimal allocation choice if any, and the resulting IHT bill. Could be unified with the D-13 (RNRB taper) and D-17 (pre/post 2027 pension delta) calculator ideas into a single "Estate Reform Scenario Planner" with a tabbed UI.
- **Why it matters:** Mixed-estate landlords are typically £2-10m of wealth and the IHT decisions are five-to-six-figure. A calculator is a strong conversion lever at exactly the audience our lead-gen model targets.
- **Suggested next action:** Add to calculator backlog. Recommend unifying D-13, D-17 and D-19 into a single multi-toggle planner at `/calculators/iht-reform-scenario-planner` rather than three separate widgets; implementation effort ~1-2 days given the shared input model.

### [D-20] [2026-05-22] [INTERNAL_RESEARCH] Open question on transferable £1m cap between spouses
- **Page being worked on:** A10 agricultural-property-relief-mixed-estate-1m-cap
- **Observation:** A10 notes that the announced reform package does not provide a transferable £1m cap between spouses on second death (analogous to transferable NRB / RNRB). The published gov.uk technical note is silent on this and the consultation outcome did not address it directly. The natural reading is that the cap is per-individual and does not transfer; equalising the use of the £1m allowance across both spousal deaths therefore matters. But sessions writing this content should confirm against the most-recent published guidance; the transferable-cap question is the kind of detail that may be clarified in the Finance Act 2026 explanatory notes.
- **Why it matters:** Mixed-estate planning between spouses depends on whether the cap transfers. If yes, equalisation logic flips (use the full £1m on the first death). If no, equalisation logic stands (use part of the £1m on each death to capture the full £2m of pre-cap value).
- **Suggested next action:** Check the Finance Act 2026 explanatory notes when published; update A4 + A10 if the transferable-cap position is confirmed either way. Currently A4 and A10 both write conservatively to "per individual, non-transferable until clarified."

---

## Session A wave-2 completion summary (2026-05-22T19:10Z)

All 10 IHT pages shipped on `property-wave2-a` branch in 11 commits (6b57730 A1, 94b26a4 A2 with A1 forward-link back-patch, e33ee32 A3, b16718d A4, 90b0f30 A5 with A4 forward-link back-patch, d66384e A6, 5cbd2ac A7, 15d72a6 A8, 5b7cb46 A9 with A8 forward-link back-patch resolving F-23, 2b6977f A10 with A6 cross-link resolving F-17 A10→A6 leg). 30,243 total body words across the wave (averaging 3,024 per page). 134 FAQs across the wave (averaging 13.4 per page; all six checks pass on every page). 19 D-entries (D-1 to D-19, plus this completion entry as D-20-equivalent). 10+ F-entries raised across the wave (F-3, F-4, F-5, F-8, F-9, F-10, F-11, F-15, F-16, F-17, F-20, F-22, F-23, F-24, F-25 + numbering-clash notes), several already resolved (F-5, F-8, F-23, F-17 A10→A6 leg), several open for orchestrator post-merge action (mostly back-links from existing pillar / BPR-rental / CGT-calc pages).

Notable structural achievements: anti-templating maintained across all 10 pages with distinct spines (framework / statute / table / event / case-law / regime / process / mechanism+tiers / before-vs-after / mixed-estate-allocation). Two house-position refinements raised (F-15 LTR test two-route framing; D-18 s.117 brief correction). Three calculator ideas surfaced (D-6 Pawson fact-pattern scorecard, D-12 PR-sell-vs-assent CGT, D-13 RNRB taper, D-17 pre/post 2027 pension delta, D-19 mixed-estate allocation — recommended unification into a single Estate Reform Scenario Planner widget).
