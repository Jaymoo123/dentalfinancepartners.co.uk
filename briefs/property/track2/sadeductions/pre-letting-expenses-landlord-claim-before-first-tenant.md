# Track 2 brief: pre-letting-expenses-landlord-claim-before-first-tenant

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file; WRONG-ADVICE + STALE-FACTS + THIN-DEPTH gap stack)
**Source markdown path:** `Property/web/content/blog/pre-letting-expenses-landlord-claim-before-first-tenant.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/pre-letting-expenses-landlord-claim-before-first-tenant
**Stage 1 priority:** H (high — material wrong-advice on a settled statutory point; the live page invents a fictitious "two-year" HMRC threshold and omits the real hard 7-year statutory window entirely)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (statute spine + PIM2505 + competitor liveness verified by WebFetch at brief-drafting time)
**Cannibalisation status:** REWRITE (clean — no equity-strong canonical owns this intent; the deductions pillar already forward-links INTO this slug, designating it the canonical owner of the pre-letting sub-topic; no valid collapse target exists)

> **Gold-reference depth target.** This brief matches the depth of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. The load-bearing job of the rewrite is to replace invented advice with the real ITTOIA 2005 s.57 / s.272 + PIM2505 machinery (7-year window + deemed-day-one treatment) and to lift the page from ~1,180 words to ~2,900 words with a qualifying / non-qualifying table, worked examples, and verbatim-query FAQs.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `pre-letting-expenses-landlord-claim-before-first-tenant`. The slug is intent-clean and the site architecture already designates it the canonical owner (the deductions pillar `landlord-tax-deductions-uk-2026-complete-list` forward-links to it at line 320). No redirect proposed; redirecting would orphan a deliberate internal link and lose the only page owning the pre-commencement TIMING intent.
- **Category:** `Landlord Tax Essentials` (kept; canonical path `/blog/landlord-tax-essentials/...`).
- **Gap-mode tag:** `WRONG-ADVICE` (primary, top fix priority) + `STALE-FACTS` (secondary) + `THIN-DEPTH` (tertiary) + `STRUCTURE` (quaternary) + `INVISIBLE` (context — too new for organic signal; treat like the airbnb trial case, fix correctness now, expect signal later).
- **"Why this rewrite" angle:** This is not a CTR-fail or a cannibalisation case. It is a **correctness** case. The live page tells landlords there is "no strict time limit" and invents a fictitious "two-year" HMRC-doubt threshold, when the real rule is a **hard 7-year statutory window** with a **deemed-first-day** treatment. It cites zero authority (0 statute links, 0 HMRC manual links). The whole mechanism of the relief (ITTOIA 2005 s.57 imported into property businesses by s.272, operated in HMRC PIM2505) is absent. The rewrite's first and load-bearing job is to delete the invented advice and install the real statutory machinery, then lift depth around it (qualifying / non-qualifying table, worked examples, verbatim-query FAQs) so the page is best-in-class for the pre-commencement-timing intent that gov.uk PIM2505 states tersely and no specialist competitor covers with a table.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

**Filesystem source read 2026-05-30:**

- **Word count:** ~1,180 (body).
- **H2 outline (1-line summary each):**
  1. *What Are Pre-Letting Expenses?* — defines "wholly and exclusively" + one inline £8,000 renovation example.
  2. *Allowable Pre-Letting Expenses* (3 H3s: Improvements/Repairs, Professional Fees, Marketing; plus an Insurance/Utilities list) — good coverage of expense categories.
  3. *Expenses That Cannot Be Claimed* (2 H3s: Purchase/Finance Costs, Major Capital Improvements) — sound capital-vs-revenue framing.
  4. *How to Claim and Record Pre-Letting Expenses* (3 H3s: Record Keeping, Timing, Self-Assessment) — **Timing H3 carries the WRONG advice ("no strict time limit", "two-year" threshold)**.
  5. *Special Considerations for Different Property Types* (3 H3s: HMO, Commercial, FHL).
  6. *Tax Planning Strategies* (3 H3s: Timing Renovations, Splitting Costs, Company vs Individual) — **Timing Renovations H3 carries the STALE April 2027 rate assertion**.
  7. *Common Mistakes to Avoid* (4 H3s).
  8. *Professional Advice and Compliance* — CTA-shaped close.
- **Meta title:** "Pre-Letting Expenses: What Landlords Can Claim" (45 chars; generic, no differentiator, no 7-year hook).
- **Meta description:** "Which pre-letting expenses can UK landlords claim before their first tenant moves in? Complete guide to deductible costs before letting property." (143 chars; reasonable, but promises nothing about the 7-year rule or the timing mechanism that is the real differentiator).
- **FAQ count (frontmatter `faqs:` array):** 4. **FAQ #2 contains the wrong advice** ("There's no strict time limit ... If the pre-letting period exceeds two years, HMRC may question ...").
- **Outbound authority links:** 0 (no gov.uk / legislation.gov.uk / HMRC PIM). Internal links: 3 (deductions pillar, BTL ltd-co pillar, what-does-a-property-accountant-do; plus an MTD page link).
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:`).
- **Last meaningful edit (`date`):** 2026-04-10.
- **Pricing leak:** NONE. Only illustrative figures (£8,000 renovation) which are fine. No fees, no £-fee comparisons, no client names. (Confirms diagnosis item 4.)

---

## GSC angle (last 90 days) (Stage 2)

**INVISIBLE baseline (treat like the airbnb trial case).** Per the diagnosis, this page carries the `INVISIBLE` gap mode: it is too new / too low-traffic to have a meaningful GSC universe. The execution session should pull `gsc_query_data` for the slug at write time, but the rewrite rationale does **not** depend on click data — it is correctness-led.

- **Primary query target:** "pre-letting expenses landlord (what can you claim before first tenant)".
- **Secondary query targets (verbatim-intent, to seed FAQs):**
  - "can you claim expenses before first tenant"
  - "pre-letting expenses 7 year rule"
  - "when does a rental business start for tax"
  - "pre-commencement expenses landlord HMRC"
  - "are renovation costs before letting tax deductible"
  - "can I claim mortgage interest before first tenant"
  - "pre-letting expenses if property never let"
  - "claim expenses if I lived in the property before letting"
- **Execution note:** because the baseline is INVISIBLE, set the `monitored_pages` window to **180 days** (per the F-11 INVISIBLE-baseline recommendation), not the standard 90, so a slow organic ramp is captured.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: WRONG-ADVICE (top fix priority, consumer-protection exposure).** The live page makes two materially wrong claims that would cause a reader to file incorrectly:

1. **Invented "no time limit" + fictitious "two-year" threshold.** Body Timing H3 (line ~120) says "if the pre-letting period extends beyond two years, different rules may apply"; FAQ #2 (frontmatter) says "There's no strict time limit ... If the pre-letting period exceeds two years, HMRC may question ...". **Both are wrong.** The real rule is a **hard 7-year statutory window**: qualifying pre-commencement expenditure must be incurred **not more than 7 years before** the date the property business starts (ITTOIA 2005 s.57, applied to property businesses by s.272, operated in HMRC PIM2505). There is no "two-year" threshold anywhere in the statute or manual. The page also omits the **deemed-first-day** mechanism entirely: qualifying pre-commencement expenditure is **treated as incurred on the day the property business starts**, so it is deducted in the first period of the business, not "claimed in the year you first receive rental income" by some vague custom.

2. **Zero authority.** The page cites no statute and no HMRC manual, so a reader cannot verify any of it. The whole point of the rewrite is to anchor every load-bearing claim to s.57 / s.272 / PIM2505.

**Secondary: STALE-FACTS.** Two date-sensitive assertions need correction:

- **April 2027 rates (line ~155):** the page states "from April 2027, property income will be taxed at separate rates (22% basic, 42% higher, 47% additional rate)" as a bare future assertion. Per house position **§7 [LOCKED]**, this is now **enacted law** (FA 2026, Royal Assent 18 March 2026, ss.6-7; effective 6 April 2027; **England + NI only** — Scotland/Wales set their own rates per FA 2026 s.8 / Sch 2). The rewrite must state it as enacted (not "from April 2027 ... may affect your planning" hedge-shaped framing) **and** add the England+NI scope caveat the live page omits. Re-confirm Royal Assent at write time per F-37 discipline.
- **FHL abolition (line ~150):** the page says FHL was abolished "from April 2025". Per **§6 [LOCKED]**, the precise commencement is **6 April 2025 (income tax) / 1 April 2025 (corporation tax)**, FA 2025 Sch 5. Phrasing is broadly OK but tighten to the exact IT date and note former-FHL furniture may sit in capital allowances pools (the page already gestures at this — keep, anchor to §6).

**Tertiary: THIN-DEPTH.** 1,180 words vs a ~2,900 target. The page lists expense categories well but never gives the reader the decision tools: no qualifying / non-qualifying **table**, no **"when does the business start?"** section (the load-bearing concept), no **worked examples** beyond one inline figure, no treatment of the **never-let** edge case grounded in genuine-intention case law, and no clean **capital-vs-revenue** decision rule with a forward-link to the repairs page.

**Quaternary: STRUCTURE.** 4 FAQs (target 10-14), FAQs not written to verbatim search queries, no authority links, no inline conversion CTAs at the natural moments (after the worked example, after the never-let edge case).

**Load-bearing fix sequence (ordered by ROI):**

1. **Delete the wrong advice.** Remove "no strict time limit" + the "two-year" threshold from both the body and FAQ #2. Replace with the **hard 7-year window + deemed-first-day** mechanism, anchored to s.57 / s.272 / PIM2505.
2. **Add a "When does your property business start?" section** — the pivot concept. Pre-commencement expenditure is only meaningful relative to the commencement date; PIM2505 + PIM2510 turn on it. This is the section gov.uk states tersely and competitors under-explain.
3. **Add a qualifying / non-qualifying table** (snippet-bait + decision tool) — none of the named competitors has one.
4. **Add 2-3 worked examples** (the £8,000 renovation timeline; a mortgage-interest-during-void example; a never-let genuine-intention example).
5. **Correct the April 2027 framing to enacted law (§7) with England+NI scope; tighten FHL to 6 April 2025 (§6).**
6. **FAQ count 4 → 10-14**, each targeting a verbatim secondary query; FAQ #1-#3 carry the 7-year rule, the commencement-date test, and the never-let case.
7. **Add 4-6 authority links** (PIM2505 load-bearing; s.57 + s.272 legislation.gov.uk with the exclusion-banner caveat handled correctly; PIM2510 commencement; PIM2030/PIM2505 capital-vs-revenue).
8. **Meta title rewrite** leading with the differentiator (the 7-year rule), e.g. "Pre-Letting Expenses: The 7-Year Rule for Landlords".

---

## Competitor URLs (Stage 2 — verified live 2026-05-30 via WebFetch)

| URL | Status | Word count | FAQs | 7-year rule | Statute / manual cite | Table | Coverage signals |
|---|---|---|---|---|---|---|---|
| https://www.truemanbrown.co.uk/pre-letting-property-expenses-tax-relief/ | 200 OK (verified 2026-05-30) | ~1,800-2,000 | 6 | **Yes** ("within seven years prior to the start of the letting business") | PIM2505 (link only) | **No** (narrative) | "When does your business start?" H2 ✓, revenue-vs-capital ✓, 2025/26 framing ✓; no statute section cite, no table |
| https://rjp.co.uk/can-you-claim-pre-letting-costs-and-repairs-to-a-property/ | Verify at execution | specialist accountancy, exact intent | — | — | — | — | repairs + pre-letting combined angle; differentiate: we own the TIMING/7-year machinery, forward-link the repairs depth |
| https://pro-taxman.co.uk/claiming-a-deduction-for-pre-letting-expenses/ | Verify at execution | specialist | — | Yes (per diagnosis) | — | — | 7-year + deemed-day-one mechanism named (per diagnosis); match clarity, beat depth with table + worked examples |
| https://www.bedrocktax.co.uk/claiming-a-deduction-for-pre-letting-expenses/ | Verify at execution | specialist, exact intent | — | — | — | — | exact intent sibling; differentiate on table + examples + verbatim FAQs |
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2505 | **200 OK (verified 2026-05-30)** | authoritative | n/a | **Yes** ("within a period of seven years before the date the property business is started") | self (s.57 ITTOIA05 / s.61 CTA09) | No | **Source of truth — cite + link, do not try to outrank.** Confirms s.57, 7-year limit, deemed-first-day, wholly-and-exclusively + not-capital condition |

**Competitor depth ceiling for this intent:** ~1,800-2,000 words, ~6 FAQs, 0 statute-section citations, 0 qualifying/non-qualifying tables, narrative-only. Our ~2,900-word target with 10-14 verbatim-query FAQs + a decision table + 2-3 worked examples + s.57/s.272/PIM2505 anchors puts us decisively best-in-class for this intent, not catch-up.

**What to borrow:** Trueman Brown's "When does your business start?" section structure (it is the right pivot) and its plain-English 7-year framing.

**What to differentiate against:** none of the four specialist competitors cites the **statute section** (s.57) or the **import gateway** (s.272), none has a **qualifying/non-qualifying table**, and none gives **worked examples** with timelines. The deemed-first-day mechanism is named by only two. Those are our differentiators.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (most recent Track 2 snapshot at brief-drafting time; re-read at execution per the Wave-N heartbeat).

| Source | Slug | Overlap dimension | Resolution |
|---|---|---|---|
| Residual (own) | pre-letting-expenses-landlord-claim-before-first-tenant | self | REWRITE in place |
| Existing (deductions pillar, refreshed 2026-05-30) | landlord-tax-deductions-uk-2026-complete-list | ongoing allowable-expenses LIST | **No collision.** Its GSC universe is generic "landlord expenses list / allowable expenses"; ZERO pre-letting queries. Critically it **already forward-links INTO this slug** (line 320: "Pre-Letting Expenses: What You Can Claim Before Your First Tenant"). The architecture designates THIS slug the canonical owner of the pre-letting sub-topic. Reciprocate the link; do NOT collapse. |
| Existing (repairs page) | what-repairs-can-landlords-deduct-from-rental-income | H2 "Initial Property Condition and Pre-Letting Expenses" | **No collision on the timing intent.** That page touches pre-letting only in the repairs-vs-improvements / derelict-property = capital context (the *Law Shipping / Odeon* line). It does NOT own the pre-commencement TIMING / 7-year intent. **Forward-link** to it from our capital-vs-revenue section; differentiate by owning s.57/s.272 + the 7-year window. |
| Existing (incorporation pillar) | buy-to-let-limited-company-complete-guide-uk | Company-side treatment | No collision. Our "company vs individual" section forward-links here; flag that the company-side authority is CTA 2009 s.61 (not s.57) per PIM2505. |
| Existing (capital allowances pillar) | capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework | Furniture / plant pre-letting | No collision (capital allowances is a different relief track). Cross-link from the FHL-furniture + "major capital improvements" notes. |

**Collapse-direction equity check (per §16.T2 deterministic-floor discipline):** both candidate canonicals (deductions pillar, repairs page) have **ZERO pre-letting GSC/Bing equity**, and this page itself has zero too. The deterministic collapse guard would therefore have **no valid stronger target** to point at, so no `DUPLICATE_REDIRECTS` entry is justifiable. Collapsing would also break the deductions pillar's intentional forward-link and orphan the pre-commencement-timing intent. **Conclusion: REWRITE in place. No REDIRECT-PROPOSED. No FLAG-MANAGER.**

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page):

- **Deductions pillar:** `landlord-tax-deductions-uk-2026-complete-list` (category `section-24-and-tax-relief`) — **reciprocate the inbound link** (it already links to us at line 320); forward-link from our "Self-Assessment reporting / ongoing allowable expenses" close. Path: `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list`.
- **Repairs page:** `what-repairs-can-landlords-deduct-from-rental-income` (category `landlord-tax-essentials`) — forward-link from our **capital-vs-revenue** section for the derelict-property / *Law Shipping* line. Path: `/blog/landlord-tax-essentials/what-repairs-can-landlords-deduct-from-rental-income`.
- **Incorporation pillar:** `buy-to-let-limited-company-complete-guide-uk` (category `incorporation-and-company-structures`) — forward-link from "company vs individual ownership" (the live page already links here; keep, and add the CTA 2009 s.61 company-side note).
- **Capital allowances pillar:** `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` — forward-link from the FHL-furniture + "major capital improvements may qualify for capital allowances" notes.
- **MTD page:** `making-tax-digital-landlords-april-2026-deadline` (category `making-tax-digital-mtd`) — keep the existing link in the close (MTD threshold context).
- **Section 24 applied page (optional):** `claim-mortgage-interest-rental-property-uk-section-24` — forward-link from the "mortgage interest during the void / pre-letting period" worked example (finance-cost restriction context).

---

## House-position references (Stage 1)

- **§34 Landlord-allowable-expenses architecture** [LOCKED 2026-05-27]: the operative spine. **§34.1** confirms **ITTOIA 2005 s.272 is the import gateway** that applies trading-income deduction rules (Part 2) to a property business, with HMRC PIM anchors. s.272(2) table explicitly lists "section 57 — pre-trading expenses" as one of the imported Part 2 provisions. The pre-letting relief is this gateway plus s.57; cite §34 and thread s.272 → s.57 → PIM2505.
- **§6 FHL abolition transition** [LOCKED]: FHL abolished **6 April 2025 (IT) / 1 April 2025 (CT)** (FA 2025 Sch 5). Former-FHL furniture/equipment pre-letting may sit in capital allowances pools, not immediate expense. Correct the live page's loose "from April 2025" to the exact IT date and anchor the furniture note here. **Do not write** "FHL still applies".
- **§7 April 2027 property income tax framing** [LOCKED]: separate property income rates (**22% basic / 42% higher / 47% additional**) are **enacted law** (FA 2026, Royal Assent 18 March 2026, ss.6-7; effective 6 April 2027; **England + NI only**, Scotland/Wales separate per s.8/Sch 2). State as enacted, **not** as a "from April 2027 ... may affect" proposal-shaped hedge. **Re-verify Royal Assent at write time per F-37.**
- **§3 MTD ITSA** [LOCKED]: threshold £50,000 (6 Apr 2026) / £30,000 (6 Apr 2027) / £20,000 (6 Apr 2028). The live page's MTD paragraph is already correct — preserve, do not re-derive.
- **§13 Do-not-write list (general)** [LOCKED]: NO em-dashes; NO pricing / no fee figures; NO real client names (anonymised personas only); define abbreviations at first use (e.g. "ITTOIA 2005 (the Income Tax (Trading and Other Income) Act 2005)"); no invented £ figures purporting to be HMRC data.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict #1 — WRONG-ADVICE (the rewrite's first job).** The live page contradicts the settled HMRC position in PIM2505 and the §34.1 statutory architecture. It asserts "no strict time limit" and invents a "two-year" threshold; the real rule is the **hard 7-year window + deemed-first-day** treatment under ITTOIA 2005 s.57 (imported by s.272), per PIM2505. This is not a house-position *gap* — it is a direct factual error on a page. Execution session must delete the invented advice and install the verified machinery.

**CONFIRMED conflict #2 — STALE April 2027 framing vs §7 [LOCKED].** Line ~155 frames the 22/42/47 rates as a bare future "from April 2027" assertion with no enacted-status anchor and no England+NI scope. Per §7 these are enacted (FA 2026 RA 18 March 2026) and England+NI only. This is the recurring Bill-vs-enacted pattern (the F-2/F-5/F-22 lineage) inverted: here the risk is leaving it as a *proposal-shaped hedge* when it is now enacted law. Execution session asserts-with-citation after re-confirming Royal Assent.

**Flag to `track2_site_wide_flags.md`:**
- **F-[next] | 2026-05-30 | HIGH | pre-letting-expenses-landlord-claim-before-first-tenant | WRONG-ADVICE | Live page invents a "two-year" HMRC threshold and states "no strict time limit"; omits the hard 7-year statutory window + deemed-first-day mechanism (ITTOIA 2005 s.57 via s.272, PIM2505). Delete invented advice; install verified machinery. Note: standalone legislation.gov.uk s.57 page shows "S.57 excluded (22.7.2020) by FA 2020 Sch 16 para 4(6)" — this is a context-specific exclusion (loan-charge / disguised-remuneration Sch 16), NOT a general repeal; s.272(2) table still imports s.57 for property businesses and PIM2505 is the settled operative authority. Cite the manual; cite s.57/s.272 with the banner caveat handled correctly.**
- **F-[next+1] | 2026-05-30 | MEDIUM | same slug | STALE-FACTS | April 2027 22/42/47 rates framed as a bare future assertion; per §7 now enacted (FA 2026 RA 18 Mar 2026, England+NI only). Assert-with-citation; add England+NI scope; re-verify RA at write time per F-37.**

---

## Authority links worth considering (Stage 2 — load-bearing ones verified, others verify at execution)

| URL | Verification status | Use case |
|---|---|---|
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2505 | **200 OK + content verified 2026-05-30** — confirms ITTOIA05 s.57 (CTA09 s.61 for companies), "within a period of seven years before the date the property business is started", "treated as incurred on the day on which the customer first carries on their property business", wholly-and-exclusively + not-capital condition | **LOAD-BEARING authority.** Cite + link for the 7-year rule, the deemed-first-day mechanism, and the qualifying condition. This is the settled source of truth. |
| https://www.legislation.gov.uk/ukpga/2005/5/section/57 | **200 OK 2026-05-30** — relates to pre-trading expenses; **banner reads "S. 57 excluded (22.7.2020) by Finance Act 2020 (c. 14), Sch. 16 para. 4(6)".** This exclusion is the loan-charge / disguised-remuneration Sch 16 context, NOT a general repeal. s.272(2) still imports s.57 for property businesses (verified below). | Cite s.57 as the pre-trading-expenses provision **but handle the banner correctly** — do not transcribe "s.57 is repealed". Anchor the operative authority to PIM2505 + s.272. |
| https://www.legislation.gov.uk/ukpga/2005/5/section/272 | **200 OK + content verified 2026-05-30** — s.272(2) table, under "In Chapter 5 (rules allowing deductions)—", explicitly lists "**section 57 — pre-trading expenses**" as a Part 2 provision applied to a property business; section in force (latest revised, amended to 1 April 2026) | Cite as the **import gateway** (§34.1). This is the link that defeats the s.57 banner misread: s.272 imports s.57 into property businesses by name. |
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2510 | Verify at execution | "When does a property business start?" / commencement-date depth for the new pivot section |
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2030 | Verify at execution | Capital-vs-revenue (repairs vs improvements) cross-anchor; forward-link to the repairs page |
| https://www.legislation.gov.uk/ukpga/2009/4/section/61 | Verify at execution | Company-side equivalent (CTA 2009 s.61) for the "company vs individual" section |
| https://www.legislation.gov.uk/ukpga/2005/5/section/34 | Verify at execution | "Wholly and exclusively" (imported by s.272), for the qualifying-condition framing |

**(Execution session selects 4-6 to actually cite in body. PIM2505 + s.57 + s.272 are mandatory.)**

---

## Section-by-section content plan (~2,900 words)

Target ~2,900 body words, 11-13 H2/H3 blocks, 10-14 FAQs, qualifying/non-qualifying table, 2-3 worked examples, 1-2 inline `<aside>` CTAs.

1. **Intro (~120 words)** — reframe from "what can you claim" to "what can you claim, **and within what window**". Surface the 7-year rule and the deemed-first-day idea in the first two paragraphs (the differentiator). Keep "wholly and exclusively" framing.
2. **H2 What counts as a pre-letting (pre-commencement) expense? (~200 words)** — define pre-commencement expenditure; the two tests (wholly-and-exclusively for the property business + would have been allowable if incurred after commencement + not capital). Anchor §34.1.
3. **H2 When does your property business actually start? (~280 words, NEW — the pivot)** — the load-bearing concept the live page lacks. Business starts when the first property is first let (or first available to let / first marketing for income, per PIM2505/PIM2510). Worked timeline. Why it matters: the 7-year clock and the deemed-first-day both hinge on this date. Forward-anchor PIM2510.
4. **H2 The 7-year rule and the deemed-first-day mechanism (~300 words, NEW — corrects the wrong advice)** — qualifying pre-commencement expenditure incurred **not more than 7 years before** commencement is **treated as incurred on the first day** of the business and deducted in that first period. Cite s.57 (via s.272) + PIM2505. Explicitly state there is **no "two-year" threshold** (correcting the common myth the old page repeated). Handle the s.57 banner caveat in a footnote-style sentence (excluded for Sch 16 loan-charge purposes only; still imported for property businesses by s.272).
5. **H2 Qualifying vs non-qualifying pre-letting costs (~260 words + TABLE)** — a two-column **table** (Qualifying / Non-qualifying) covering: decorating, replacement carpets/flooring, repairs to heating/plumbing/electrics, EPC, gas/electrical safety certs, letting-agent setup, advertising, "to let" signs, landlord insurance, void-period council tax, mortgage interest during the void (finance-cost, restricted) — vs purchase price, SDLT, purchase legal/survey fees, mortgage arrangement/broker fees, extensions/conversions, first-time central heating, single-to-HMO conversion. Keep the existing strong category lists but compress into the table + short prose.
6. **H2 Capital vs revenue: the line that decides relief (~220 words)** — the decision rule; derelict-property / "bought in a state that needed work" = capital (*Law Shipping* line) vs restoring a lettable property = revenue. **Forward-link the repairs page.** Note capital costs add to CGT base cost or may qualify for capital allowances (forward-link CA pillar).
7. **H2 Worked examples (~320 words, 2-3 examples)** —
   - **Example 1:** buy in January, £8,000 renovation + £400 EPC/safety certs, first let in April → all revenue pre-commencement, deemed incurred on first letting day, deducted in year 1 (keep the existing £8,000 figure, add the mechanism).
   - **Example 2:** mortgage interest paid during a 3-month void before first tenant → claimable as a finance cost (subject to the section 24 20% basic-rate restriction for individuals), forward-link the S24 page.
   - **Example 3 (edge case):** costs incurred 5 years before commencement on a property genuinely held out for let → still inside the 7-year window, qualifies; contrast with 8 years before = outside the window.
8. **H2 What if you never find a tenant? (~180 words)** — genuine-intention test; actively marketed + genuinely intended to let = relief generally stands; change of use (sell, move in) = HMRC may challenge. Ground in intention, not the invented "two-year" rule. (Rewrites the old FAQ #4 into proper depth.)
9. **H2 Property-type specifics (~220 words)** — HMO (licensing/fire-safety pre-letting work; major structural = capital), commercial (void business rates, compliance certs), **former FHL** (abolished **6 April 2025**, §6; furniture may sit in capital allowances pools not immediate expense). Tighten the FHL date; anchor §6.
10. **H2 Recording and claiming pre-letting expenses (~200 words)** — keep the record-keeping list (good); correct the **timing** paragraph to the deemed-first-day treatment (NOT "claim in the year you first receive rental income" vaguely); 7-year digital-record retention (TMA 1970 s.12B). On Self-Assessment they form part of total allowable expenses (SA105). Reciprocate-link the deductions pillar here.
11. **H2 Planning and looking ahead (~200 words)** — timing renovations relative to expected marginal rate; **April 2027 enacted rates** (22/42/47, England+NI, §7) stated as law with citation; company-vs-individual (CTA 2009 s.61 company side); MTD context (keep the correct §3 paragraph). Forward-links to S24, incorporation pillar.
12. **H2 Common mistakes (~150 words)** — keep the four (mixing personal/business, claiming capital costs, poor records, excessive claims); add a fifth: **assuming there is no time limit** (there is — 7 years) and **assuming a "two-year" cliff** (there is none).
13. **Close / FAQ (CTA + 10-14 FAQs)** — anonymised social-proof persona if used (e.g. "a first-time landlord who renovated before letting"); 1-2 inline `<aside>` CTAs at conversion moments. FAQs target the verbatim secondary queries; FAQ #1 = 7-year rule, FAQ #2 = "when does my business start", FAQ #3 = never-let case, FAQ #4 = "lived in it before letting", FAQ #5 = mortgage fees vs interest, etc. **FAQ #2 of the live page (the wrong one) is rewritten to the 7-year rule.**

---

## Statute spine (every section number with its Act — to be verified at write time per F-37)

| Citation | What it governs | Verification status (2026-05-30) |
|---|---|---|
| **ITTOIA 2005 s.57** (Income Tax (Trading and Other Income) Act 2005, s.57) | Pre-trading / pre-commencement expenses: 7-year window + treated-as-incurred-on-first-day | **Verified** legislation.gov.uk 200 OK. Banner "S.57 excluded (22.7.2020) by FA 2020 Sch 16 para 4(6)" is the **loan-charge / disguised-remuneration Sch 16 context only**, NOT a general repeal. Confirmed imported for property businesses by s.272(2) (below) and by PIM2505. |
| **ITTOIA 2005 s.272** | Import gateway: applies Part 2 (trading income) deduction rules to a property business; s.272(2) table lists "section 57 — pre-trading expenses" by name | **Verified** legislation.gov.uk 200 OK; in force (latest revised to 1 April 2026); table entry confirmed verbatim. House position §34.1. |
| **HMRC PIM2505** (Property Income Manual) | The settled operative authority: ITTOIA05 s.57 / CTA09 s.61, 7-year limit, deemed-first-day, wholly-and-exclusively + not-capital condition | **Verified** gov.uk 200 OK + content quoted. LOAD-BEARING. |
| **CTA 2009 s.61** (Corporation Tax Act 2009, s.61) | Company-side equivalent of s.57 for property businesses within the charge to CT | Verify at execution; named in PIM2505. |
| **ITTOIA 2005 s.34** | "Wholly and exclusively" qualifying condition (imported by s.272) | Verify at execution. |
| **HMRC PIM2510** | "When does a property business start?" / commencement date | Verify at execution (new pivot section). |
| **HMRC PIM2030** | Capital vs revenue (repairs vs improvements) | Verify at execution (capital-vs-revenue section). |
| **TMA 1970 s.12B** | 7-year digital-record retention | Verify at execution (per §19.16). |
| **FA 2026 ss.6-7** (Finance Act 2026) | Separate property income rates 22/42/47, England+NI, effective 6 April 2027 | **§7 [LOCKED]**; RA 18 March 2026. **Re-verify RA at write time per F-37.** |
| **FA 2025 Sch 5** (Finance Act 2025) | FHL abolition, 6 April 2025 (IT) / 1 April 2025 (CT) | **§6 [LOCKED]**; verify at execution. |
| **ITA 2007 finance-cost restriction (section 24)** | 20% basic-rate restriction on mortgage interest (Example 2 cross-link) | Cross-link only; cited on the S24 page. |

---

## Competitor depth benchmark (summary)

- **Specialist competitor ceiling:** ~1,800-2,000 words, ~6 FAQs, narrative-only, 0 statute-section citations, 0 qualifying/non-qualifying tables, PIM2505 link at most. The deemed-first-day mechanism is named by only two of four.
- **gov.uk PIM2505:** authoritative but terse; states the 7-year rule and deemed-first-day in two sentences with no examples and no table. We cite + link it; we do not try to outrank it.
- **Our target:** ~2,900 words, 10-14 verbatim-query FAQs, a qualifying/non-qualifying decision table, a "when does the business start?" pivot section, 2-3 worked examples with timelines, and the full s.57 → s.272 → PIM2505 statutory spine. Best-in-class for the pre-commencement-timing intent, not catch-up.

---

## metaTitle / metaDescription / h1 plan

- **metaTitle (test 2-3, lead with the 7-year differentiator, ≤62 chars):**
  - "Pre-Letting Expenses: The 7-Year Rule for Landlords" (51 chars) — preferred
  - "Pre-Letting Expenses Before Your First Tenant (7-Year Rule)" (59 chars)
  - "Claim Pre-Letting Expenses: What Landlords Can Deduct" (53 chars)
- **metaDescription (≤158 chars, name the mechanism + the correction + a planning hook):**
  - "What can UK landlords claim before the first tenant? The 7-year pre-letting rule, the deemed-first-day treatment, qualifying vs non-qualifying costs, with examples." (162 chars — trim to ≤158 at execution, e.g. drop "with examples")
  - Fallback: "Pre-letting expenses for UK landlords: the 7-year window, deemed-first-day relief, and which costs before your first tenant qualify. Worked examples inside." (156 chars)
- **h1 (keep close to slug intent, lead with the deliverable):**
  - "Pre-Letting Expenses: What Landlords Can Claim Before the First Tenant" (current h1 is fine; optionally tighten to "...and the 7-Year Rule" to mirror the meta differentiator)

---

## Universal rules (do not skip)

(Inherited per §13/§14 of TRACK2_PROGRAM.md — pointers, not restated.) **Critical for this brief:** NO em-dashes (commas, parentheses, full stops, middle dots only). NO pricing / no fee figures / no fee comparisons. NO real client names (anonymised personas only). Define abbreviations at first use (ITTOIA 2005, CTA 2009, PIM, SDLT, EPC, HMO, FHL, MTD). LeadForm auto-injected by `BlogPostRenderer.tsx` — never duplicate; 1-2 inline `<aside>` CTAs only. FAQ schema auto-emitted from frontmatter `faqs:` — never hand-add FAQ schema in body. Body is raw HTML (`<p>`, `<h2>`, `<table>`), not markdown syntax. **Every statute citation verified against legislation.gov.uk at write time, including FA 2026 Royal Assent per F-37.**

---

## 19-step workflow (legacy-rewrite adaptation)

1. Read `docs/property/house_positions.md` §34, §6, §7, §3, §13 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting → execution status).
3. Read this brief end-to-end.
4. **Verify the statute spine** against legislation.gov.uk + PIM2505: confirm (a) s.272(2) still lists "section 57 — pre-trading expenses"; (b) PIM2505 still states the 7-year window + deemed-first-day; (c) FA 2026 Royal Assent date for §7 (per F-37). This is the load-bearing pre-rewrite verification.
5. Re-fetch the competitor URLs to confirm liveness (reject non-200; Trueman Brown + PIM2505 already verified 2026-05-30).
6. Read the current source markdown in full.
7. Read the 3 closest siblings (deductions pillar, repairs page, incorporation pillar) for link reciprocity + non-collision.
8. Plan the rewrite outline per the section-by-section plan above (~2,900 words, 11-13 blocks, 10-14 FAQs, table, 2-3 examples).
9. **Rewrite markdown at existing path** (NOT a new file). Preserve slug + canonical + category; update `dateModified` to today; rewrite metaTitle + metaDescription + (optionally) h1 per the plan. **Delete the wrong "two-year" advice from body + FAQ #2.**
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title ≤62 chars; meta description ≤158 chars; all internal + authority links resolve.
12. Confirm no redirect needed (none — REWRITE in place; this is the canonical pre-letting owner).
13. Insert/update `monitored_pages` Supabase row; **180-day window** (INVISIBLE baseline per F-11).
14. Commit on `main`: `git commit -m "Track 2A: rewrite pre-letting-expenses (wrong-advice fix: 7-year rule + deemed-first-day; April 2027 enacted; FHL date)"`.
15. Update `track2_page_tracker.md`: mark ✅ executed.
16. Update `track2_site_wide_flags.md` with the two flags above + any new discoveries.
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries for inter-batch awareness (esp. the s.57 banner-misread trap — candidate for a §16.T lesson).
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §34.1 import gateway (s.272 → s.57): __
- §6 FHL abolition (6 April 2025 IT): __
- §7 April 2027 rates — lock status at write: __ enacted (assert + cite, England+NI) / __ re-verify needed
- §3 MTD threshold (preserve correct paragraph): __
- §13 do-not-write (no pricing, no client names, no em-dashes): __

### Statute verification at write
- s.272(2) still lists "section 57 — pre-trading expenses": __
- PIM2505 7-year window + deemed-first-day still current: __
- s.57 banner handled correctly (FA 2020 Sch 16 exclusion is context-specific, not a repeal): __
- FA 2026 Royal Assent re-confirmed (F-37): __

### Comparison: before vs after
- Word count: 1,180 → __ (target ~2,900)
- H2 count: 8 → __
- FAQ count: 4 → __ (target 10-14)
- Authority links: 0 → __ (target 4-6)
- Inline CTAs: 0 → __ (target 1-2)
- Worked examples: 1 inline → __ (target 2-3)
- Qualifying/non-qualifying table: 0 → __ (1 expected)
- Wrong "two-year" advice removed from body + FAQ #2: __ (Y/N)

### Flags raised
- F-[WRONG-ADVICE] (carried from brief): resolved __
- F-[STALE April 2027] (carried from brief): resolved __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
