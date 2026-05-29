# Track 2 brief: tax-sell-rental-property-uk

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file; top-of-funnel entry page; INVISIBLE + THIN_DEPTH + STALE_FACTS + STRUCTURE)
**Source markdown path:** `Property/web/content/blog/tax-sell-rental-property-uk.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/tax-sell-rental-property-uk
**Stage 1 priority:** H (high — strongest ranker in its query class: 59 impr / pos 29.9 for the broad "tax on selling rental property" doorway intent, ahead of the CGT pillar at 27 impr / pos 62.2; high-volume generic top-of-funnel query worth defending)
**Stage 1 date:** 2026-05-29
**Stage 2 enrichment date:** 2026-05-29
**Cannibalisation status:** REWRITE (kept distinct as the plain-English top-of-funnel entry/orientation page; funnels INTO four deeper CGT siblings + the pillar; must NOT become a fifth rates/calculation page)

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `tax-sell-rental-property-uk`. GSC assigns this URL the broad, generic "tax on selling rental property" doorway intent and it is the **strongest ranker in that query class** (59 impr / pos 29.9) ahead of the CGT pillar (27 impr / pos 62.2). Collapsing the page would forfeit accrued (if weak) authority on a high-volume generic query. No redirect proposed.
- **Category:** `capital-gains-tax` (kept — the frontmatter category is `Capital Gains Tax`; canonical sits under `/blog/capital-gains-tax/`).
- **Gap-mode tag:** `INVISIBLE` (primary — pos ~30 means almost no impression-to-rank conversion) + `THIN_DEPTH` (secondary — 1,100 words against a 3,200 target; only one worked example; reliefs and structures touched but not developed) + `STALE_FACTS` (tertiary but load-bearing — "2025/26" year-stamp drift at body lines 30, 36; April 2027 framed as future/conditional at line 112 when it is now enacted law) + `STRUCTURE` (no orientation table, no authority links, only 4 FAQs).
- **"Why this rewrite" angle:** This is the **orientation / entry page** for the entire CGT-on-disposal cluster. A landlord asking the literal question "what tax do I pay when I sell my rental property?" does not yet know the difference between (a) income tax during ownership, (b) CGT on disposal, and (c) the 60-day reporting mechanics. The four deeper siblings each own a narrow slice (rates-and-allowances, rates-explainer, step-by-step calculation, payment deadlines) and the pillar owns comprehensive policy. None of them is positioned as the plain-English "where do I even start" doorway. The rewrite's job is to be the clearest, most complete orientation answer to the entry question, then route the reader DOWN into the siblings. The page is currently invisible (pos ~30) because it is thin (1,100 words), carries stale year-stamps, and has no internal authority signal (0 outbound citations). Lift to ~3,200 words with a one-screen orientation table (income tax vs CGT vs 60-day), 1-2 illustrative worked examples (NOT a fifth full calculation walkthrough — push deep calc to sibling 3), a corrected April-2027-as-enacted-law paragraph that explicitly states it does NOT change CGT-on-disposal, and dense forward-linking into the four siblings plus the pillar.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

**Filesystem source read (`tax-sell-rental-property-uk.md`):**
- **Word count:** ~1,100 (body)
- **H2 / H3 outline (1-line summary each):**
  1. H2 *Capital Gains Tax (CGT) on Property Sales* — headline 18%/24% rates + AEA (carries the 2025/26 year-stamp drift at lines 30, 36)
     - H3 *How CGT is Calculated* — sale price minus cost minus reliefs formula; allowable-costs list; one worked example (£350k sale, £70k gain, £16,080 at 24%)
     - H3 *Principal Private Residence Relief (PPR)* — main-home periods + final 9 months; forward-links the PRR-for-landlords sibling
     - H3 *Lettings Relief (Now Abolished)* — correctly states FA 2020 shared-occupation restriction + cites TCGA 1992 s.223B (this framing is CURRENT and CORRECT — preserve)
     - H3 *Using Capital Losses* — same-year offset + indefinite carry-forward; property-loss-before-other-gains ordering
  2. H2 *Reporting and Payment Deadlines* — 60-day reporting + payment; applies even where no tax due (correct framing)
  3. H2 *Special Ownership Structures*
     - H3 *Company-Owned Properties* — corporation tax 19% small profits / 25% main / marginal relief between (statutory rates, NOT a fee comparison — permitted)
     - H3 *Non-Resident Landlords* — same rates, different reporting, DTA / foreign-tax-credit mention (thin; no NRCGT s.1A citation, no rebasing dates)
  4. H2 *Planning Strategies to Minimise CGT* — AEA timing, spouse transfers, incorporation timing (each is one thin paragraph)
  5. H2 *Record Keeping Requirements* — documentation list; 4-year HMRC enquiry window
  6. H2 *When Professional Advice is Essential* — bullet list of trigger scenarios + property-accountant forward-link
  7. H2 *Future Tax Changes* — **STALE/ACCURACY ERROR:** "From April 2027, property income WILL be subject to separate tax rates (22% basic, 42% higher, 47% additional)" framed as future/conditional. The point that this does NOT affect CGT-on-disposal is correct and must be kept.
- **Current meta title:** "Tax When Selling Rental Property UK 2026: CGT Rates & Rules" (57 chars — OK length; doorway intent is fine, but does not signal the orientation/where-to-start angle that differentiates from the rates siblings)
- **Current meta description:** "Complete guide to tax implications when selling BTL property in the UK. CGT rates, reliefs, calculations and practical examples for landlords in 2026." (147 chars)
- **Current FAQs (frontmatter count):** 4 (income-tax-vs-CGT, £50k-profit worked figure, PPR-if-lived-there, 60-day deadline). Target 12-14.
- **Current outbound authority links:** 0 to gov.uk / legislation.gov.uk / HMRC manuals. Internal links: 3 (PRR-for-landlords sibling, BTL ltd-co pillar, property-accountant-services page, CGT pillar — 4 distinct hrefs in body).
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:` array; `schema:` field empty, which is correct — never hand-author FAQ schema in body).
- **Last meaningful edit date:** 2026-04-10 (frontmatter `date`).

---

## GSC angle (last 90 days) (Stage 2)

**Diagnosis-supplied signal (from the BRIEF-stage diagnosis):**
- **Primary query class:** "tax on selling rental property (UK)" / "what tax do I pay when I sell my rental property".
- **This URL is the strongest ranker in the class:** 59 impressions / avg position 29.9 — versus the CGT pillar at 27 impressions / position 62.2 for the same broad intent.
- **Position 29.9 = bottom of page 3.** This is an INVISIBLE page, not a CTR-fail page: the limiter is rank, not click-through. The page barely surfaces, so the load-bearing fix is depth + authority + structure to climb from pos ~30 into page-1 contention, NOT a meta rewrite (contrast the gold-reference `cgt-rates` brief, which was a pure CTR-fail at pos 5.4 and where meta was the lever).
- **Why depth is the lever:** at pos ~30 the page is being out-ranked by both our own deeper siblings/pillar AND external competitors. Closing the depth + authority gap (1,100 → 3,200 words, 0 → 5-7 citations, 4 → 12-14 FAQs, add orientation table) is what moves an invisible doorway page up the SERP.
- **Execution-time confirmation step:** at execution, re-pull `gsc_query_data` for this slug (90-day window) to capture the full query spread + confirm position has not already shifted. If position has climbed into 11-20 on a meta change elsewhere, re-weight toward CTR; if still ~30, depth remains primary.

**GA4 engagement signal:** pull `ga4_page_data` at execution. Expected: very low sessions (invisible page); do not over-weight engagement on a page that almost nobody reaches.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: INVISIBLE.** Position ~30 on its strongest query class. The page is structurally present in the index but functionally invisible to searchers. Unlike the gold-reference `cgt-rates` page (pos 5.4, a pure CTR-fail where the content was already good and meta was the lever), this page's problem is that it is **too thin and too uncited to rank**. The fix is not cosmetic — it is a genuine depth-and-authority lift that earns the page a higher position.

**Secondary: THIN_DEPTH.** 1,100 words against a 3,200 target. Every section is a single thin paragraph: the planning section names AEA timing, spouse transfers, and incorporation timing in one sentence each without developing any; the non-resident section omits NRCGT mechanics, rebasing dates, and the s.1A citation entirely; the structures section is a sketch. Competitors in this class run 1,200-2,500 words. We can be decisively best-in-class at 3,200 with worked examples and verified citations that the consumer-finance competitors lack.

**Tertiary but LOAD-BEARING: STALE_FACTS.** Two distinct staleness errors:
1. **Year-stamp drift (body lines 30, 36):** "For the 2025/26 tax year" and "the annual CGT exemption for 2025/26 is £3,000". Site convention and house position §5 are **2026/27**. The figures (£3,000 AEA, 18%/24%) are correct; the year label is one cycle stale. Re-stamp to 2026/27.
2. **April 2027 framed as future/conditional (line 112):** "From April 2027, property income WILL be subject to separate tax rates (22% basic, 42% higher, 47% additional)". Per house position §7, these rates are now **ENACTED LAW** (Finance Act 2026, Royal Assent 18 March 2026, ss.6-7, effective 6 April 2027, England + Northern Ireland only). Framing them as a future proposal is now an **accuracy error**, not merely a hedge. The page also omits the England + NI scope entirely (Scotland and Wales set their own property income rates per FA 2026 s.8 / Sch 2). The page's correct point — that the 2027 income-tax change does NOT alter CGT-on-disposal rates — must be **kept**.

**STRUCTURE.** No orientation table at top (the single most valuable add for a doorway page: a one-screen "income tax vs CGT vs 60-day" comparison that orients the confused entrant). Only 4 FAQs. Zero outbound authority citations, which weakens the page against both gov.uk and our own cited siblings.

**Load-bearing fix sequence (ordered by ROI):**

1. **Add an orientation table at the top** (income tax during ownership vs CGT on disposal vs 60-day reporting). This is the differentiator that no sibling and few competitors carry, and it is exactly what a top-of-funnel entrant needs. It also gives Google a structured block to surface.
2. **Re-stamp 2025/26 → 2026/27** at lines 30 and 36 (house position §5 lock).
3. **Rewrite the "Future Tax Changes" section** to state April 2027 as enacted law (FA 2026, RA 18 March 2026, ss.6-7), add the England + NI scope (Scotland/Wales per s.8 / Sch 2), and KEEP the correct point that it does not change CGT-on-disposal rates.
4. **Body lift to ~3,200 words** by developing (not adding net-new topic pages): the orientation framing, the reliefs subsections (PPR depth, Lettings Relief shared-occupation, capital losses), the structures section (corporation-tax-on-gains for companies + NRCGT for non-residents with rebasing dates), and the planning section (each strategy gets a developed paragraph + a forward-link to the relevant sibling). Keep at most 1-2 illustrative worked examples; push the deep 5-example walkthrough to sibling (3).
5. **FAQ count 4 → 12-14**, each targeting a plain-English entry question ("Is the tax income tax or CGT?", "Do I pay tax if I make a loss?", "What if I lived in it first?", "What if it's in a company?", "What if I now live abroad?", "When is the money due?", "Does the April 2027 change affect this?").
6. **Authority links: 5-7 verified citations** (TCGA 1992 s.1H/s.1I for rates; s.222-226 PPR; s.223B Lettings Relief; s.58 spouse transfer; s.1A + Schs 1A/1B/4AA NRCGT; FA 2026 ss.6-7 for the 2027 point; gov.uk/capital-gains-tax for cross-reference).
7. **Meta title / description refresh** toward the orientation angle (see metaTitle plan below), so the doorway query lands on a page that visibly answers "where do I start", not a fifth rates page.

---

## Competitor URLs (Stage 2 — verify live at execution per §16.31)

Fetch + status-check + date-stamp each at execution (httpx with a real User-Agent; reject non-200; if WebFetch is permission-denied, carry forward the prior-batch verification note and flag).

| URL | What to borrow | What to differentiate against |
|---|---|---|
| https://hoa.org.uk/advice/guides-for-homeowners/i-am-selling/capital-gains-tax-selling-home/ | Plain-English orientation tone; clear "do you even owe CGT" framing for a non-expert reader | Consumer-homeowner angle (PPR-heavy, light on landlord/BTL specifics); no 60-day-mechanics depth; no company/non-resident structures; no statute citations |
| https://www.propertypassport.uk/guides/capital-gains-tax-property-2026-rates-allowances | Current 2026 rates + AEA framing; clean rates presentation | This is a rates-and-allowances page (overlaps our SIBLING 2, not this doorway page); we differentiate by being the orientation entry that links OUT to rates depth rather than re-explaining rates |
| https://pocketwise.co.uk/tax/capital-gains/capital-gains-tax-property-uk/ | Worked-example clarity; FAQ structure | Generic CGT (not landlord-specific); no 60-day landlord nuance; no enacted-April-2027 framing; no NRCGT depth |
| https://www.propertypassport.uk/guides/cgt-on-second-home-uk | Second-home vs BTL distinction framing (useful for a confused entrant who isn't sure which bucket they're in) | Second-home framing only; doesn't orient across income-tax-vs-CGT-vs-60-day the way our doorway page must |

**Competitor depth ceiling for this query class:** ~1,200-2,500 words, 0-2 worked examples, 0 statute citations, consumer-finance tone. Our 3,200-word target with an orientation table, 1-2 worked examples, 12-14 FAQs, and 5-7 verified statute citations puts us decisively best-in-class — and uniquely positioned as the landlord-specific orientation doorway rather than another rates explainer.

**What to borrow:** HOA's plain-English "do you even owe it" orientation; PropertyPassport's clean current-2026 rates presentation (as a brief block we then link out from); Pocketwise's FAQ shape.
**What to differentiate against:** every competitor here is either a rates page or a generic-consumer page. None is a landlord-specific orientation doorway that threads income-tax-during-ownership / CGT-on-disposal / 60-day-mechanics and routes the reader into deeper resources. That orientation role is our moat.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (most recent refresh; re-read the §4 / §7 in-flight sections at execution for any newer collision).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | tax-sell-rental-property-uk | REWRITE | self — rewrite in place as the plain-English orientation doorway |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk | Comprehensive policy PILLAR | No collision — pillar owns deep policy. This doorway forward-links the pillar and the pillar back-links here. Reciprocal. |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-sale-uk-2026-rates-allowances | Owns "rates & allowances" | No collision — doorway gives a one-line rates block then forward-links here for rates depth. MUST NOT re-explain rates in full. |
| Excluded (rewritten 2026-05-21) | cgt-rates-property-2026-27-current-rates-explained | Owns rates-explainer | No collision — same forward-link-out discipline. Doorway is orientation, not a rates explainer. |
| Excluded (rewritten 2026-05-21) | cgt-calculation-selling-buy-to-let-property-step-by-step | Owns the 5-example calculation walkthrough | No collision — doorway keeps at most 1-2 illustrative examples and pushes the deep walkthrough here via forward-link. This is the load-bearing distinctness rule: do NOT become a fifth calculation page. |
| Excluded (rewritten 2026-05-21) | cgt-selling-buy-to-let-property-calculation-guide | BTL calculation guide | No collision — note F-35 flags this sibling carries residual 2025/26 year-stamp drift; do not propagate that drift into the doorway. Forward-link for BTL calc depth. |
| GSC artefact (no file) | capital-gains-tax-selling-rental-property-uk | 1-impression URL artefact | Does NOT exist as a file. No collision (confirmed in diagnosis). |
| Residual (intra) | principal-private-residence-relief-landlords | PRR depth | No collision — doorway gives PPR orientation + final-9-months, forward-links here for relief depth. |

**Conclusion:** REWRITE in place. No REDIRECT-PROPOSED. No FLAG-MANAGER. **Distinctness rule (carry into execution verbatim):** this page answers the entry question "what tax do I pay when I sell?" by orienting income-tax-during-ownership vs CGT-on-disposal vs 60-day mechanics, and funnels via internal links INTO the four deeper siblings. It must NOT become a fifth rates/calculation page — keep at most 1-2 illustrative worked examples, push deep calculation to sibling (3), push rates depth to siblings (2)/(4), and forward-link the pillar (1) both ways.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this doorway page — dense forward-linking is the structural job of this page):

- **CGT pillar:** `capital-gains-tax-property-complete-guide-uk` (`/blog/capital-gains-tax/...`) — reciprocal link; "for the complete policy picture, see the pillar".
- **Rates & allowances sibling:** `capital-gains-tax-property-sale-uk-2026-rates-allowances` — forward-link from the rates orientation block ("full rates and allowances detail here").
- **Rates-explainer sibling:** `cgt-rates-property-2026-27-current-rates-explained` — forward-link from the rates orientation block.
- **Step-by-step calculation sibling:** `cgt-calculation-selling-buy-to-let-property-step-by-step` — forward-link from the worked-example section ("for a full step-by-step calculation walkthrough, see...").
- **BTL calculation guide sibling:** `cgt-selling-buy-to-let-property-calculation-guide` — forward-link for BTL-specific calc depth.
- **60-day deadlines:** `cgt-payment-deadlines-property-sales-2026` — forward-link from the "Reporting and Payment Deadlines" section.
- **PPR depth:** `principal-private-residence-relief-landlords` — already linked at body line 62; preserve and strengthen.
- **Incorporation:** `buy-to-let-limited-company-complete-guide-uk` — already linked at body line 78; preserve (company-owned-property section).
- **Property accountant services:** `what-does-a-property-accountant-do` — already linked at body line 109; preserve.
- **April 2027 income tax:** `2027-property-income-tax-rates-landlords-uk` (rewritten pillar) — forward-link from the corrected "Future Tax Changes" section so the reader who wants the income-tax detail goes there, keeping this page focused on CGT-on-disposal.

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED 2026-05-23, Wave-extended]: primary spine. 18% basic / 24% higher, effective 30 October 2024; £3,000 AEA; final 9 months PPR; Lettings Relief restricted to shared-occupation since 6 April 2020; s.58 no-gain-no-loss spouse transfer; s.162 incorporation relief threshold. The doorway must match these exactly. **Re-stamp the page from 2025/26 to 2026/27.**
- **§7 April 2027 property income tax surcharge** [LOCKED 2026-05-23]: ENACTED LAW — Finance Act 2026, Royal Assent 18 March 2026, ss.6-7, effective 6 April 2027, applies to property income in **England and Northern Ireland** (Scotland and Wales set own rates per FA 2026 s.8 / Sch 2). 22% basic / 42% higher / 47% additional. State as enacted, NOT as a proposal. **Keep the page's correct point that this does not change CGT-on-disposal rates.** Verify Royal Assent date against legislation.gov.uk at write time (F-37 Bill-vs-enacted discipline).
- **§17.4 NRCGT** [LOCKED 2026-05-22]: TCGA 1992 s.1A + Schs 1A/1B/4AA (rewritten by FA 2019; do NOT cite the repealed ss.14B-14H). Non-residents file the 60-day return for **every** UK land disposal regardless of tax due; rebasing to 5 April 2015 (residential) / 5 April 2019 (non-residential). Develop the currently-thin non-resident section against this.
- **§21.6 Ltd Co + FIC citations** [LOCKED 2026-05-23, Wave 4]: company-on-disposal corporation-tax framing — CTA 2009 s.54 (corporation tax on chargeable gains); CTA 2010 s.18N is the correct CIHC cite (never s.34). The 19%/25%/marginal-relief figures at body line 77 are statutory corporation-tax rates, not a fee comparison — permitted. If the section is expanded, verify the corporation-tax-on-gains framing against the §21.6 spine.
- **§24.4 s.58 spouse transfer** [LOCKED 2026-05-23, Wave 5]: TCGA 1992 s.58 no-gain-no-loss for spouses/civil partners living together; receiving spouse inherits original base cost; post-separation 3-year extension (Finance (No. 2) Act 2023 s.41). Use for the "Spouse Transfers" planning subsection (currently one thin sentence at line 86).
- **§13 Do-not-write list** [LOCKED]: NO pricing / fees; NO real client names (anonymised personas only); no em-dashes anywhere; define abbreviations at first use; no invented £ figures purporting to be from HMRC.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict — STALE_FACTS (two instances), both load-bearing.**

1. **Year-stamp drift (lines 30, 36).** Source asserts "For the 2025/26 tax year" and "annual CGT exemption for 2025/26 is £3,000". House position §5 lock and site convention are **2026/27**. The figures are correct; the year label is stale. **Fix: re-stamp to 2026/27.** (Severity LOW — figure-correct, label-stale.)

2. **April 2027 framed as future/conditional (line 112) — now an ACCURACY ERROR.** Source: "From April 2027, property income WILL be subject to separate tax rates (22% basic, 42% higher, 47% additional)". Per §7, FA 2026 received Royal Assent **18 March 2026** (ss.6-7, effective 6 April 2027); these are **enacted law**, not a proposal. The page also omits the **England + Northern Ireland only** scope (Scotland/Wales per FA 2026 s.8 / Sch 2). This is the **same §16.22 / F-37 Bill-vs-enacted pattern** the program has caught repeatedly. The corroborating recent evidence (Wave 6 F-9: s.455 35.75% substitution proving FA 2026 enactment) supports the enacted framing. **Fix: rewrite to state as enacted law with the FA 2026 / RA-18-Mar-2026 citation; add the England + NI scope; KEEP the correct point that it does not alter CGT-on-disposal rates.** (Severity HIGH — reader-misleading on a date-sensitive point.)

**Flag to `track2_site_wide_flags.md` at execution:**
`F-NN | 2026-05-29 | HIGH | tax-sell-rental-property-uk | STALE_FACTS | (a) 2025/26 year-stamp drift (lines 30, 36) -> re-stamp 2026/27. (b) April 2027 22/42/47 framed as future/conditional (line 112) -> ENACTED LAW (FA 2026 RA 18 Mar 2026 ss.6-7, England + NI only per s.8/Sch 2); does not change CGT-on-disposal. Nth instance of Bill-vs-enacted pattern. Verify RA date at write time.`

**No pricing leak found** (no fees / £-per-service quoted; the 19%/25%/marginal-relief figures at line 77 are statutory corporation-tax rates, not a Decision-E fee comparison — permitted). **No real client names. No em-dashes in current body (clean — preserve).** Lettings Relief framing at line 65 (FA 2020 shared-occupation restriction, TCGA 1992 s.223B) is CURRENT and CORRECT — preserve. 60-day reporting and PPR final 9 months are correct — preserve.

---

## Authority links worth considering (Stage 2 — verify all at execution per §16.31 + F-8)

Per F-8: statute content can be removed by amendment even when the URL is live (TCGA 1992 s.4 was substituted by FA 2019). Verify the operative wording at the cited section, including Royal Assent date of any Finance Act, at write time.

| URL | Verification status / note | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/1H | Verify operative — post-FA-2019 CGT rates for individuals live at s.1H (and s.1I for the residential-property uplift) since the FA 2019 rewrite; do NOT cite s.4 (substituted) | CGT rates statute (18%/24%) |
| https://www.legislation.gov.uk/ukpga/1992/12/section/223 | Verify operative — PPR amount of relief (s.222 the relief, s.223 the amount, final-9-months) | PPR final 9 months |
| https://www.legislation.gov.uk/ukpga/1992/12/section/223B | Verify operative — Lettings Relief shared-occupation restriction inserted by FA 2020 | Lettings Relief (shared occupation since 6 April 2020) |
| https://www.legislation.gov.uk/ukpga/1992/12/section/58 | Verify operative — no-gain-no-loss spouse/civil-partner transfer | Spouse transfers planning subsection |
| https://www.legislation.gov.uk/ukpga/1992/12/section/1A | Verify operative — NRCGT charging provision (+ Schs 1A/1B/4AA) post-FA-2019 rewrite; do NOT cite ss.14B-14H | Non-resident landlord section |
| https://www.legislation.gov.uk/ukpga/2026/.../section/6 (and /7) | **VERIFY Royal Assent 18 March 2026 + the exact c.NN + section numbers against legislation.gov.uk at write time** (F-37 discipline). FA 2026 ss.6-7 = April 2027 property income rates | "Future Tax Changes" enacted-law paragraph |
| https://www.gov.uk/capital-gains-tax | 200 OK expected — verify content | Cross-reference link-out for users wanting gov.uk authority |
| https://www.gov.uk/tax-sell-property/work-out-tax | Verify at execution | gov.uk "tax when you sell property" entry (doorway cross-reference) |

(Execution session selects 5-7 to actually cite in body. Prioritise s.1H, s.223, s.223B, s.58, s.1A, FA 2026 s.7, and the gov.uk cross-reference.)

---

## Section-by-section content plan to ~3,200 words

Target body length **~3,200 words** (from ~1,100). 11-13 H2/H3 blocks; orientation table at top; 1-2 illustrative worked examples ONLY; 12-14 FAQs; 5-7 authority citations; 2 inline `<aside>` CTAs at conversion moments.

1. **Intro (≈180 words).** Re-frame as the plain-English entry point. State plainly: selling a rental property is a **Capital Gains Tax** event (not income tax) on the gain, separate from the income tax you paid on rent during ownership, and there is a tight **60-day reporting** clock. Set up the orientation table.

2. **Orientation table — "The three things to understand" (≈150 words + table).** A one-screen comparison block (income tax during ownership / CGT on disposal / 60-day reporting): what each is, when it applies, the rate, the deadline. This is the differentiator no sibling carries. (THIN_DEPTH + STRUCTURE fix.)

3. **H2 Capital Gains Tax on Property Sales (≈350 words).** Re-stamped to **2026/27**: 18% basic / 24% higher (effective 30 October 2024); £3,000 AEA; band-stacking (gain pushes through bands). One-line rates block, then forward-link siblings (2) and (4) for rates depth — do NOT re-explain in full. (STALE_FACTS re-stamp; §5.)

4. **H3 How CGT is Calculated (≈300 words + ONE worked example).** Sale price minus base cost minus allowable costs minus reliefs = gain; allowable-costs list (purchase costs, capital improvements not repairs, selling costs). Keep ONE illustrative worked example (the existing £350k / £70k / £16,080 example, re-checked). Forward-link sibling (3) for the full 5-example walkthrough. (Distinctness rule: at most 1-2 examples here.)

5. **H3 Principal Private Residence Relief (≈300 words).** Main-home periods + final 9 months deemed occupation; the let-period-minus-reliefs fraction; the existing 3-years-lived / 7-years-let illustration. Forward-link the PRR-for-landlords sibling. Cite TCGA 1992 s.222-223. (§5.)

6. **H3 Lettings Relief — restricted since April 2020 (≈180 words).** Preserve the CORRECT current framing: FA 2020 restricted relief to shared-occupation with the tenant; in a classic let-after-move-out scenario it is no longer available. Cite TCGA 1992 s.223B. (Preserve; §5.)

7. **H3 Using Capital Losses (≈180 words).** Same-year offset + indefinite carry-forward; ordering rule. Forward-link sibling (5)'s capital-losses section. (Develop existing thin paragraph.)

8. **H2 Reporting and Payment Deadlines (≈280 words).** 60-day reporting + payment from completion; applies even where no tax due for non-residents and where tax is due for residents (§5 nuance: UK residents only file where CGT is due; non-residents file for every disposal). Penalties framing. Forward-link sibling (6). Inline CTA #1 here ("unsure whether you need to file? book a free call"). (§5 + §17.4.)

9. **H2 Special Ownership Structures.**
   - **H3 Company-Owned Properties (≈260 words).** Companies pay corporation tax on chargeable gains (NOT CGT): 19% small profits up to £50k / 25% main above £250k / marginal relief between (statutory rates — permitted). Note the extraction-to-personal second layer. Cite CTA 2009 s.54 framing; forward-link the BTL ltd-co pillar. (§21.6.)
   - **H3 Non-Resident Landlords / NRCGT (≈300 words).** DEVELOP from the current sketch: NRCGT under TCGA 1992 s.1A + Schs 1A/1B/4AA (FA 2019 rewrite); 60-day return for **every** UK land disposal regardless of tax due; rebasing to 5 April 2015 (residential) / 5 April 2019 (non-residential); DTA / temporary-non-residence note (s.10A 5-year rule, light). Cite s.1A. (§17.4.)

10. **H2 Planning Strategies to Reduce CGT (≈400 words).** Develop each from one sentence into a real paragraph:
    - **Annual exemption + timing** — splitting disposals across tax years to use multiple £3,000 AEAs; forward-link the AEA sibling.
    - **Spouse / civil-partner transfers** — s.58 no-gain-no-loss; pooling both AEAs; shifting gain to the lower-rate spouse; receiving spouse inherits base cost; post-separation 3-year window note. Cite s.58. (§24.4.)
    - **Incorporation timing** — s.162 incorporation relief threshold (business test, Ramsay); transfer itself can trigger CGT/SDLT; "advice essential" framing. Forward-link the incorporation pillar. (§5 s.162.)
    - Inline CTA #2 after this section.

11. **H2 Record Keeping (≈160 words).** Documentation list; 4-year HMRC enquiry window. (Preserve + tighten.)

12. **H2 Future Tax Changes — April 2027 (≈220 words).** REWRITE to enacted law: from 6 April 2027, property **income** (England + Northern Ireland) is taxed at 22% basic / 42% higher / 47% additional under Finance Act 2026 (Royal Assent 18 March 2026, ss.6-7); Scotland and Wales set their own property income rates (s.8 / Sch 2). **Keep the correct point: this is an income-tax change and does NOT alter CGT-on-disposal rates, which remain 18%/24%.** Forward-link the 2027 income-tax pillar. (§7 + STALE_FACTS fix.)

13. **H2 When Professional Advice is Essential (≈150 words).** Trigger-scenario list (preserve); property-accountant forward-link; close into LeadForm (auto-injected — do not duplicate).

**FAQ block (frontmatter, 12-14):** keep the 4 existing, add ~8-10 plain-English entry questions — "Is it income tax or CGT when I sell?", "Do I pay tax if I sold at a loss?", "What if it was my home first?", "What if the property is in a limited company?", "What if I now live abroad?", "Do I still file if no tax is due?", "Does the April 2027 change affect what I pay when I sell?", "How long do I keep the records?", "Can my spouse and I both use the £3,000 exemption?", "What costs can I deduct from the gain?".

---

## Statute spine (every section number with its Act — verify each at write time)

| Citation | Act | Used in section | House position |
|---|---|---|---|
| TCGA 1992 s.1H (+ s.1I) | Taxation of Chargeable Gains Act 1992 (rates rewritten by FA 2019) | §3 rates | §5 |
| TCGA 1992 s.222 | Taxation of Chargeable Gains Act 1992 | §5 PPR (the relief) | §5 |
| TCGA 1992 s.223 | Taxation of Chargeable Gains Act 1992 | §5 PPR (amount + final 9 months) | §5 |
| TCGA 1992 s.223B | Taxation of Chargeable Gains Act 1992 (inserted by FA 2020) | §6 Lettings Relief (shared-occupation restriction) | §5 |
| TCGA 1992 s.58 | Taxation of Chargeable Gains Act 1992 | §10 spouse transfers planning | §24.4 |
| TCGA 1992 s.162 | Taxation of Chargeable Gains Act 1992 | §10 incorporation relief | §5 |
| TCGA 1992 s.1A (+ Schs 1A/1B/4AA) | Taxation of Chargeable Gains Act 1992 (NRCGT rewritten by FA 2019; NOT ss.14B-14H) | §9 non-resident landlords | §17.4 |
| TCGA 1992 s.10A | Taxation of Chargeable Gains Act 1992 | §9 temporary-non-residence note (light) | §17.3 |
| CTA 2009 s.54 | Corporation Tax Act 2009 | §9 company-owned properties (CT on chargeable gains) | §21.6 |
| CTA 2010 s.18N | Corporation Tax Act 2010 (CIHC carve-out; never s.34) | §9 company framing (if expanded) | §21.6 |
| Finance Act 2026 ss.6-7 | Finance Act 2026 (Royal Assent 18 March 2026) | §12 April 2027 property income rates | §7 |
| Finance Act 2026 s.8 / Sch 2 | Finance Act 2026 | §12 Scotland/Wales own-rates scope | §7 |
| Finance (No. 2) Act 2023 s.41 | Finance (No. 2) Act 2023 c.30 (in force 6 April 2023) | §10 post-separation s.58 extension | §24.4 |

**Verification discipline (F-8 + F-37):** confirm operative wording at each legislation.gov.uk section at write time (TCGA 1992 s.4 is the canonical "live URL, removed wording" trap — substituted by FA 2019; cite s.1H instead). For Finance Act 2026, confirm the chapter number (c.NN), Royal Assent date (18 March 2026), and that ss.6-7 carry the property income rates before asserting as enacted.

---

## Competitor depth benchmark

| Dimension | Competitor ceiling (this class) | This rewrite target |
|---|---|---|
| Word count | ~1,200-2,500 | ~3,200 |
| Orientation table (income tax vs CGT vs 60-day) | None observed | 1 (the differentiator) |
| Worked examples | 0-2 | 1-2 (illustrative only; deep calc pushed to sibling) |
| FAQs | 0-6 | 12-14 |
| Statute citations | 0 | 5-7 verified |
| Enacted-April-2027 framing | absent / proposal-stage | enacted law (FA 2026, RA 18 Mar 2026), England + NI scope |
| Landlord-specific orientation (vs generic consumer CGT) | partial | full — this is the moat |

Decisively best-in-class, not catch-up. The orientation-doorway positioning is unique in the class.

---

## Internal-link targets within the live corpus

Forward-links OUT (the structural job of a doorway page) + reciprocal back-links:
- `capital-gains-tax-property-complete-guide-uk` (pillar — reciprocal)
- `capital-gains-tax-property-sale-uk-2026-rates-allowances` (rates & allowances — rates block link-out)
- `cgt-rates-property-2026-27-current-rates-explained` (rates explainer — rates block link-out)
- `cgt-calculation-selling-buy-to-let-property-step-by-step` (5-example walkthrough — from worked-example section)
- `cgt-selling-buy-to-let-property-calculation-guide` (BTL calc depth)
- `cgt-payment-deadlines-property-sales-2026` (60-day — from reporting section)
- `principal-private-residence-relief-landlords` (PRR depth — preserve existing link)
- `buy-to-let-limited-company-complete-guide-uk` (incorporation pillar — preserve existing link)
- `2027-property-income-tax-rates-landlords-uk` (April 2027 income tax — from "Future Tax Changes")
- `what-does-a-property-accountant-do` (services — preserve existing link)

All hrefs must resolve at build (six-check: all internal links resolve).

---

## metaTitle / metaDescription / h1 plan

**Current metaTitle:** "Tax When Selling Rental Property UK 2026: CGT Rates & Rules" (57 chars).
**Plan:** keep the doorway query word order ("tax when selling rental property uk") but shift the differentiator from "rates & rules" (which reads like a rates page, of which we have four) toward the orientation/where-to-start angle. Test 2-3 candidates at execution against ≤62 chars:
- "Tax When You Sell a Rental Property UK: The 2026/27 Guide" (56 chars)
- "Selling a Rental Property UK 2026/27: What Tax Do I Pay?" (55 chars)
- "Tax on Selling Rental Property UK: CGT, Reliefs & 60 Days" (56 chars)
Prefer a candidate that signals orientation (the question framing) over a fifth rates label. No em-dashes.

**Current metaDescription:** "Complete guide to tax implications when selling BTL property in the UK. CGT rates, reliefs, calculations and practical examples for landlords in 2026." (147 chars).
**Plan (≤158 chars, named mechanic + orientation + free-call hook, no pricing, no em-dash):**
- "Selling a UK rental property? Understand CGT at 18% or 24%, the £3,000 exemption, PPR relief and the 60-day deadline, with worked examples for landlords." (152 chars)
- Alternative: "What tax do you pay when you sell a rental property in the UK? CGT rates, reliefs, the 60-day return and 2026/27 planning, explained for landlords." (147 chars)

**h1:** keep the question form (doorway intent). Current h1 "What Tax Do I Pay When I Sell My Rental Property in the UK?" is strong for the entry query — preserve it (matches the primary query "what tax do I pay when I sell my rental property" near-verbatim). Optionally tighten to "What Tax Do I Pay When I Sell a Rental Property in the UK?" for generality.

**summary frontmatter field:** re-stamp any year reference; the current summary ("...18% (basic rate) or 24% (higher rate) on any profit above your £3,000 annual exemption") is figure-correct and may stay.

---

## Universal rules (do not skip)

(Inherited from parent program per §4 section 13 — see `NETNEW_PROGRAM.md §4` voice block + `docs/competitor_rewrite_playbook.md §5`. Critical for this brief: NO em-dashes anywhere. NO pricing / fees (Decision E: even soft "general-market" fee comparisons are a pricing leak). NO real client names — anonymised personas only. LeadForm auto-injected by `BlogPostRenderer.tsx` — never duplicate; 1-2 inline `<aside>` CTAs only. FAQs in frontmatter `faqs:` array (target 12-14); `buildBlogPostingJsonLd` auto-emits FAQPage — never hand-author FAQ schema in body. Body is raw HTML (`<p>`, `<h2>`), not markdown syntax. §7 April 2027 must be stated as ENACTED LAW with citation, verified at write time.)

---

## 19-step workflow (legacy-rewrite adaptation — inherits NETNEW §7 with Track 2 deltas)

1. Read `docs/property/house_positions.md` §5, §7, §13, §17.3/§17.4, §21.6, §24.4 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting → on completion 🟢/✅).
3. Read this brief end-to-end.
4. **Verify FA 2026 status** against legislation.gov.uk: confirm Royal Assent 18 March 2026, chapter number, and that ss.6-7 carry the April 2027 property income rates. This is the load-bearing pre-rewrite verification (F-37 discipline).
5. Re-fetch the 4 competitor URLs to confirm liveness (httpx + real User-Agent); replace any non-200; if WebFetch is permission-denied, carry forward prior-batch verification + flag.
6. Read the current `tax-sell-rental-property-uk.md` source in full.
7. Read the 5 closest siblings + the pillar for the forward-link targets + to confirm the distinctness boundary (do not duplicate their depth).
8. Plan the rewrite outline per the section-by-section plan above: 11-13 blocks, ~3,200 words, orientation table at top, 1-2 worked examples only, 12-14 FAQs.
9. **Rewrite markdown at existing path** (NOT new file). Preserve frontmatter slug + canonical + category; update `date`/`dateModified` to today. Re-stamp 2025/26 → 2026/27. Refresh metaTitle/metaDescription per plan. Keep h1.
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title ≤ 62 chars; meta description ≤ 158 chars; all internal links resolve. PLUS: pricing check (`£[0-9]` returns only statutory-rate / worked-example figures, no fee quotes); 2025/26 string returns 0 matches in body.
12. Confirm no redirect needed (none — slug kept; this is the intentional orientation doorway).
13. Update `monitored_pages` Supabase row (insert if not yet tracked; 90-day window from rewrite date; given INVISIBLE baseline, consider the 180-day window per the F-11 INVISIBLE-baseline recommendation).
14. Commit on `main`: `git commit -m "Track 2: rewrite tax-sell-rental-property-uk (invisible doorway depth lift + 2027 enacted-law + 2026/27 re-stamp)"`. Tracker edits to main repo file via absolute paths.
15. Update `track2_page_tracker.md`: mark ✅ executed.
16. Update `track2_site_wide_flags.md` (the STALE_FACTS flag above; any new discoveries).
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries for inter-batch awareness.
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 2026/27 (18%/24% + £3k AEA, re-stamped from 2025/26): __
- §5 PPR final 9 months (s.222-223): __
- §5 Lettings Relief shared-occupation (s.223B): __
- §7 April 2027 — enacted-law framing + England/NI scope + does-not-change-CGT point + RA-date verified: __
- §17.4 NRCGT (s.1A + Schs 1A/1B/4AA; never ss.14B-14H): __
- §21.6 company CT-on-gains (CTA 2009 s.54; CIHC s.18N never s.34): __
- §24.4 spouse transfer (s.58 no-gain-no-loss + post-separation 3-yr): __
- §13 do-not-write (no pricing / no client names / no em-dash): __

### Comparison: before vs after
- Word count: 1,100 → __
- H2/H3 count: ~10 → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked examples: 1 → __ (1-2 expected; NOT a full calc walkthrough)
- Orientation table at top: 0 → __ (1 expected)

### INVISIBLE-lift hypothesis test
- Pre-rewrite GSC: 59 impr / pos 29.9 on the broad doorway query class
- Post-rewrite target: move into page-1/2 contention (pos < 20) via depth + authority; measure impressions growth, not just CTR
- Verify at +30 / +60 / +90 days via monitored_pages detector (180-day window for INVISIBLE baseline)

### Flags raised
- STALE_FACTS flag (carried from brief): 2025/26 re-stamp + April-2027-enacted recorded: __
- FA 2026 RA-date verification result: __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
