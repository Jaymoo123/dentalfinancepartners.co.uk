# Track 2 brief: nrl-approval-receive-rent-gross-hmrc-guide

**Site:** property
**Brief type:** Legacy rewrite, transactional how-to sibling (NRL1 gross-payment application)
**Source markdown path:** `Property/web/content/blog/nrl-approval-receive-rent-gross-hmrc-guide.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/non-resident-landlord-tax/nrl-approval-receive-rent-gross-hmrc-guide
**Stage 1 priority:** **H**, strong INDEPENDENT Bing equity on the NRL1-application intent (88 impr, 1 clk, position 4.0; page-1 across ~15 NRL1 queries) with near-zero Google presence (6 impr, position 24.5). Highest-leverage transactional page in the non-resident-landlord cluster.
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (source markdown read in full; siblings + canonical paths confirmed on disk; house positions §10 / §16.6 / §17.4 / §17.5 / §7 cross-read and §7 lock-status verified ENACTED)
**Cannibalisation status:** **REWRITE in place** (collapse-direction check done, must NOT be 301'd into the pillar; carries independent Bing form-application equity that collapse would destroy)

> This is a gold-reference-depth brief modelled on `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` (depth match-target) and the city-page REWRITE structure in `briefs/property/track2/trial/birmingham-property-accountant.md`. Diagnosis decided REWRITE; the load-bearing job is reconciling stale processing-time facts, adding the missing statutory spine and eligibility gate, and rebuilding metadata + structure around the literal "NRL1 form" / "receive rent gross" query set that this page already ranks for on Bing but is invisible for on Google.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `nrl-approval-receive-rent-gross-hmrc-guide`. The slug already carries the transactional "approval / receive rent gross" intent and Bing ranks it page-1 across the NRL1 query set; changing it would discard that equity. No redirect proposed.
- **Category:** `Non-Resident Landlord Tax` (kept; canonical path `/blog/non-resident-landlord-tax/...` preserved).
- **Gap-mode tag:** `STALE_FACTS` (primary, conflicting processing-time claims + unsourced compliance assertions) + `THIN_DEPTH` (1,492 → 2,900 words, zero statute) + `INVISIBLE` (Google position 24.5 / 6 impr despite strong Bing demand) + `STRUCTURE` (no process table, no NRL1-vs-NRL2-vs-NRL3 table, only 4 FAQs) + `CTR_FAIL` (metadata not aligned to the verbatim "NRL1 form" Bing query set).
- **"Why this rewrite" angle (distinct from the pillar's "what is the scheme" angle):** this is the TRANSACTIONAL HOW-TO sibling. The pillar (`non-resident-landlord-scheme-uk-complete-guide`) owns "who is a non-resident landlord + 20% withholding overview + NRL1/2/3 at a glance". This page must go DEEP where the pillar stays shallow: the step-by-step NRL1 gross-approval application, the statutory eligibility gate (the "usual place of abode outside the UK" test), the FA 1995 Sch 23 / SI 1995/2902 statutory basis, NRL1 vs NRL2 vs NRL3 vs NRL6 (and NRL8 over-deduction reclaim), quarter-start backdating, the online-service-vs-post + tax-agent-authorisation nuance, and what to do with tax already deducted before approval. None of that is in the pillar. The rewrite repositions from a generic "complete HMRC guide" to the definitive specialist application walkthrough.

---

## Current page snapshot (Stage 2, read source markdown + frontmatter)

**Filesystem source read (`nrl-approval-receive-rent-gross-hmrc-guide.md`, 273 lines, `date: 2026-04-10`):**
- **Body word count:** ~1,492 (diagnosis figure confirmed against source).
- **H2 outline (8 H2s, several H3s):**
  1. What Is NRL Approval and Why Apply?
  2. HMRC NRL1 Form: Eligibility Requirements (H3 Basic Eligibility / H3 Who Cannot Apply)
  3. How to Complete the HMRC NRL1 Form (H3 Information You'll Need / H3 Key Sections)
  4. Self Assessment NRL Requirements (H3 Annual Filing / H3 Record-Keeping)
  5. Application Process and Timescales (H3 Step-by-Step / H3 If Refused)
  6. Managing NRL Approval: Ongoing Compliance (H3 Annual Renewals / H3 Changes to Report / H3 If Withdrawn)
  7. Working with Letting Agents After Approval (H3 Notifying Agents / H3 Direct Letting)
  8. Tax Planning Considerations (H3 Cash Flow / H3 Tax Payment Planning) + Common Mistakes + Professional Support
- **metaTitle:** "NRL Approval Receive Rent Gross: HMRC NRL1 Form Guide 2026" (57 chars).
- **metaDescription:** "Step-by-step guide to HMRC NRL1 form application for non-resident landlords to receive UK rental income gross without 20% tax deduction." (133 chars).
- **h1:** "How to Apply for NRL Approval to Receive Rent Gross: Complete HMRC Guide".
- **FAQ count (frontmatter `faqs:`):** 4 (target 12-14).
- **Outbound authority links:** 0 (no gov.uk / legislation.gov.uk / HMRC manual citations anywhere).
- **Internal links:** 4 (property-investment pillar, MTD deadline page, Section 24 guide, what-does-a-property-accountant-do, BTL ltd-co guide), note one points to a `landlord-tax-essentials` category path and one to a `section-24-and-tax-relief` path; verify these slugs resolve at execution.
- **Schema:** FAQPage auto-emitted from frontmatter (4 entries).
- **Last meaningful edit:** 2026-04-10 (`date`).
- **Statute citations in body:** ZERO. This is the single biggest depth gap.

---

## GSC / Bing angle (last 90 days)

**Source:** diagnosis-supplied query intelligence (Bing Webmaster ingestion per memory `bing_webmaster_data.md`; Google via `gsc_query_data`). Execution session should re-pull both with `python -m optimisation_engine.clients.bing_query_client property` and `python -m optimisation_engine.ingestion.ingest_gsc_queries property --days 90` to confirm before committing metadata.

**Bing aggregate (this page):** 88 impressions / 1 click / position 4.0 across ~15 NRL1-intent queries. Page-1 on the form-application query set.

**Bing query set (verbatim, these become FAQ + H2 anchor targets):**

| query (verbatim) | Bing position |
|---|---:|
| nrl1 form | 6 |
| nrl1 form hmrc | 3 |
| nrl gross approval | 2 |
| hmrc nrl application | 2 |
| (≈11 further NRL1-application variants, all page-1) | 2–6 |

**Bing comparison vs pillar:** on the gross-approval queries this page OUTRANKS the pillar (4.0 vs pillar 4.4). The pillar has more TOTAL impressions (Bing 108 vs 88; Google 46 vs 6) but on a DIFFERENT, broader scheme-overview query set. So for THIS (form-application) intent, this page is the stronger asset, which is exactly why the collapse-direction check resolves to REWRITE-in-place, not 301-into-pillar.

**Google aggregate (this page):** ~6 impressions / position 24.5, effectively INVISIBLE on Google despite the Bing demand. The Google opportunity is net-new headroom: the page barely surfaces, so the rewrite is rebuilding from a near-zero Google base while protecting the live Bing equity.

**Pattern read:** demand is real and transactional ("nrl1 form", "nrl gross approval", "hmrc nrl application"). The page already wins these on Bing. The levers are (a) protect Bing equity by keeping the slug + sharpening the on-page answer to the literal queries, and (b) attack the Google gap with a snippet-bait structure (process table + NRL1/2/3/6 comparison table + 12+ verbatim-query FAQs) that the current prose-only page lacks.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: STALE_FACTS (highest priority, three distinct defects).**

1. **Processing-time conflict.** The body says "4-6 weeks" (lines 131, 139); the FAQ says "up to 8-10 weeks" (frontmatter FAQ #1); the sibling pillar says "30 days"; house_positions §17.5 says NRL1 decision "usually within 6 weeks"; HMRC's own guidance states there is NO fixed statutory time ("HMRC may approve after an initial check and review in more detail later") and specialist sources cite ~30 days with the approval backdated to the start of the quarter in which the application was received. **Resolution:** reconcile to a single defensible statement, cite §17.5 "HMRC usually decides within around six weeks" AND explain the gov.uk quarter-start backdating mechanic (approval, once granted, applies from the start of the quarter in which HMRC received the application, so tax over-deducted in that quarter is recoverable). Drop the unsourced "8-10 weeks" entirely.
2. **Unsourced compliance claims.** "Up-to-date for at least two years" (FAQ #2, body lines 19/52) and "reapply after 12-24 months" (line 155) are NOT in §17.5 or in gov.uk guidance, which only requires that UK tax affairs are in order and the landlord commits to keeping them so. **Resolution:** soften to the §17.5 / gov.uk standard ("UK tax affairs up to date and a commitment to remain compliant") or strip the invented numbers.
3. **Missing the actual statutory eligibility test.** The page never states the "usual place of abode outside the UK" test, which is the real NRL gate (a landlord whose usual place of abode is outside the UK is a non-resident landlord for NRL purposes, distinct from, and broader than, statutory residence). It also omits the online-service caveat: a landlord authorising a tax agent generally CANNOT use the online NRL1 service and must apply on the postal form. **Resolution:** add both.

**Secondary: THIN_DEPTH.** 1,492 words, ZERO statute citations, no NRL1/NRL2/NRL3/NRL6 differentiation, no NRL8 over-deduction reclaim. The pillar already covers the at-a-glance scheme; this page must out-depth every competitor on the application mechanics specifically. Target ~2,900 words.

**Tertiary: INVISIBLE + CTR_FAIL.** Google position 24.5 / 6 impr. Metadata is decent but not built around the verbatim Bing winners ("nrl1 form", "nrl gross approval"). Rebuild metaTitle/metaDescription/h1 to lead with the literal form name + the gross-payment outcome, and add snippet-bait structure so Google's snippet bot can grab OUR process table.

**STRUCTURE.** No process table, no comparison table, only 4 FAQs. Add a numbered application-process table, an NRL1-vs-NRL2-vs-NRL3-vs-NRL6 comparison table, and 12-14 FAQs each targeting a verbatim Bing query.

**Load-bearing fix sequence (ordered by ROI):**

1. **Reconcile the processing-time facts** to §17.5 "around six weeks" + gov.uk quarter-start backdating; delete "8-10 weeks". (Highest-consequence correctness fix, a reader plans cash flow around this number.)
2. **Add the statutory spine** (FA 1995 Sch 23; SI 1995/2902) and the "usual place of abode outside the UK" eligibility test.
3. **Add the NRL1/NRL2/NRL3/NRL6 + NRL8 comparison table** (the form family the pillar only lists at a glance, this page explains each and its actor).
4. **Soften / strip the unsourced compliance claims** ("two years", "12-24 months").
5. **Body lift to ~2,900 words** with the over-deduction reclaim (NRL8) section, quarter-start backdating mechanics, online-vs-post + agent-authorisation nuance, and "tax already deducted" recovery route.
6. **FAQ 4 → 12-14**, each targeting a verbatim Bing query ("nrl1 form", "nrl gross approval", "hmrc nrl application", "how long does nrl1 take", "what happens to tax deducted before approval", etc.).
7. **Verify + correctly frame the April 2027 rates** (see §7 note below, now ENACTED, so assert with citation + England/NI scope, do NOT bare-assert and do NOT over-hedge).
8. **Strip the 9 em-dashes** flagged in the body.
9. **Metadata rewrite** around the literal "NRL1 form" / "receive rent gross" query set.

---

## Competitor URLs (Stage 2, VERIFY LIVE at execution per §16.31)

Diagnosis-supplied targets. Execution session must WebFetch each, confirm 200, and date-stamp. WebFetch permission denials are common on these domains (cf. F-36), carry forward verification if denied and note it.

| URL | What to borrow | What to differentiate against |
|---|---|---|
| https://www.gov.uk/guidance/apply-as-an-individual-to-receive-uk-rental-income-without-uk-tax-deducted | Authoritative process steps; the quarter-start backdating mechanic; the "no fixed time" framing; the agent-authorisation / online-service caveat | gov.uk is the source-of-truth process; we are the specialist APPLICATION + planning layer. Link to it for users who want gov.uk authority (controlled link-out). |
| https://www.gov.uk/government/publications/non-resident-landlord-application-to-have-uk-rental-income-without-deduction-of-uk-tax-individuals-nrl1 | The actual NRL1 form sections (validates our "Key Sections of the form" content) | Form-walkthrough only; we add eligibility-gate reasoning, reclaim route, and planning context. |
| https://www.ukpropertyaccountants.co.uk/non-resident-landlord-approval-nrl1-form/ | Specialist framing depth; FAQ ideas | Likely no statutory spine + no NRL8 reclaim depth, out-depth on FA 1995 Sch 23 / SI 1995/2902 + over-deduction recovery. |
| https://www.taxd.co.uk/blog/what-is-the-NRL1-form | Consumer-friendly explanation of the form | Thin; differentiate on NRL1/2/3/6 differentiation table + agent-authorisation nuance. |
| https://eatonpremier.com/letting/nrl1-form/ | Letting-agent-side perspective on post-approval notification | Agent-centric; we are landlord-centric on the gross-approval application. |

**Competitor depth ceiling for this query class:** gov.uk guidance + several specialist firm blogs, generally process-walkthroughs with 0 statute citations and no NRL8 reclaim depth. Our ~2,900-word target with the FA 1995 Sch 23 / SI 1995/2902 spine, the NRL1/2/3/6 + NRL8 table, quarter-start backdating, and 12-14 verbatim-query FAQs puts us decisively best-in-class, not catch-up.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (latest refresh). Reasoning-first per §16.18 (no Jaccard).

| Source | Slug | Status / overlap | Resolution |
|---|---|---|---|
| Residual (own) | nrl-approval-receive-rent-gross-hmrc-guide | self | **REWRITE in place** |
| Cluster pillar (live) | non-resident-landlord-scheme-uk-complete-guide | SCHEME PILLAR (who is an NRL, 20% withholding overview, NRL1/2/3 at a glance) | **No collapse.** Distinct transactional intent + independent Bing equity on form-application queries. Pillar back-links HERE for "how to apply"; this page back-links to pillar for "what is the scheme". |
| Sibling (live) | nrl-withholding-tax-20-percent-basic-rate-deduction | Withholding mechanics (the 20% deduction itself) | Adjacent, separate intent. Cross-link: "if you have NOT yet been approved, 20% is withheld, see [withholding page]". |
| Sibling (live) | nrl-scheme-letting-agents-quarterly-returns-mechanics | NRL2 agent quarterly returns | Adjacent (agent-side). Cross-link from the "working with letting agents after approval" section. |
| Sibling (live) | non-resident-landlord-self-assessment-filing-requirements | NRL SA filing obligations | Adjacent (post-approval annual filing). Cross-link from the "self assessment after approval" section instead of re-explaining SA mechanics in depth. |
| Sibling (live) | changes-nrl-companies | NRL for non-resident companies | Adjacent. Brief cross-link in the "individuals vs companies" note (NRL1 is the individual form; companies use NRL2 to apply, confirm form mapping at write time). |
| Sibling (live) | uk-property-income-expats-tax-obligations-explained | Broader expat obligations | Adjacent up-funnel. Back-link. |
| Sibling (live) | non-resident-cgt-uk-property-rates-reporting / non-resident-cgt-selling-uk-property-overseas-guide | NRCGT on disposal | Separate intent (gains, not rental withholding). Forward-link only from a "when you eventually sell" note. |

**Collapse-direction check (mandatory, recorded):** this page must NOT be 301'd into the pillar. It carries strong INDEPENDENT Bing equity on the NRL1-application intent (88 impr, position 4.0; page-1 across ~15 NRL1 queries; OUTRANKS the pillar on gross-approval queries 4.0 vs 4.4). The pillar's larger total impression count is on a DIFFERENT (broader scheme) query set, so it is not the stronger page for THIS intent and collapse would destroy form-application equity. **Conclusion: REWRITE in place. No REDIRECT-PROPOSED. No FLAG-MANAGER.**

---

## Closest existing pages (Stage 2, internal-link plan, all confirmed live on disk)

All under `/blog/non-resident-landlord-tax/` unless noted. Reciprocal-link discipline: where this page links to a sibling, note the sibling should link back at its next touch (flag, do not edit siblings now).

- **Pillar (bidirectional):** `non-resident-landlord-scheme-uk-complete-guide`, back-link from the intro ("for the scheme overview, see..."); the pillar should forward-link here for "how to apply" (flag for pillar's next touch).
- **Withholding sibling:** `nrl-withholding-tax-20-percent-basic-rate-deduction`, link from "What happens before you are approved" (the 20% deduction this approval removes).
- **Agent-returns sibling:** `nrl-scheme-letting-agents-quarterly-returns-mechanics`, link from "Working with letting agents after approval" (NRL2 agent side).
- **SA filing sibling:** `non-resident-landlord-self-assessment-filing-requirements`, link from "Self assessment after approval" (do not re-explain SA in depth; defer to this page).
- **NRL companies sibling:** `changes-nrl-companies`, link from the individuals-vs-companies note.
- **Expat obligations:** `uk-property-income-expats-tax-obligations-explained`, up-funnel back-link.
- **NRCGT on sale:** `non-resident-cgt-uk-property-rates-reporting`, forward-link from a "when you eventually sell" note.
- **MTD (cross-category):** confirm the live slug for the MTD-from-April-2026 page at write time (current source links to a `making-tax-digital-mtd` path), link from "Self assessment and MTD obligations after approval".
- **Section 24 (cross-category):** confirm the live Section 24 applied page slug at write time, link from "How your taxable rental profit is calculated".

**Note:** the current source's two cross-category links (`landlord-tax-essentials/property-investment-tax-uk-complete-guide-2026` and `section-24-and-tax-relief/section-24-tax-relief-complete-guide`) must be re-verified at write time; if either 404s, repoint to the confirmed live equivalent.

---

## House-position references (Stage 1)

- **§16.6 NRL scheme is statutory, not treaty** [LOCKED]: the load-bearing statutory spine. NRL = **FA 1995 Sch 23**; **SI 1995/2902** (the Taxation of Income from Land (Non-Residents) Regulations 1995). Tenants / letting agents withhold 20% unless the landlord holds **NRL1 / NRL2 / NRL3** approval to receive rent gross. Treaty residence does NOT displace NRL. Do NOT write "NRL withholding is treaty-based".
- **§17.5 NRL scheme operational mechanics** [LOCKED]: **NRL1** = landlord application to receive rent gross, approved where UK tax affairs are up to date and the landlord expects to remain compliant, **decision usually within six weeks**. **NRL2** = letting agent's quarterly return. **NRL3** = tenant's equivalent where no agent AND annual rent exceeds £100/week (£5,200/year). **NRL6** = annual statement of tax deducted, given to landlord. Failure to operate NRL: tenant/agent becomes liable for the unwithheld tax (no time limit for unprompted discovery). This is the primary reconciliation anchor for the processing-time fix.
- **§10 / §16.6 treaty-vs-statutory framing** [LOCKED]: include a one-line note that even a treaty-resolved non-UK resident must still apply for gross-payment approval (the NRL gate is statutory).
- **§17.4 NRCGT 60-day rule** [LOCKED]: cross-reference only, for the "when you eventually sell" forward-link; do NOT re-explain in depth (sibling owns it).
- **§7 April 2027 property income tax rates** [LOCKED, verify ENACTED status at write time, see conflict flag below]: if the rewrite mentions the April 2027 rates in the self-assessment section, frame as ENACTED law (FA 2026, Royal Assent 18 March 2026, ss.6-7, effect 6 April 2027, England + NI only), NOT as a proposal and NOT bare-asserted without date-stamp.
- **§13 Do-not-write list** [LOCKED]: NO pricing/fees; NO real client names; anonymised social proof only.
- **NRL8 over-deduction reclaim:** NOT currently a numbered house position. NRL8 is the form by which a non-resident landlord reclaims tax over-deducted before approval/backdating took effect. **Flag to `track2_site_wide_flags.md`** that §17.5 could be extended to add NRL8 (and the quarter-start backdating mechanic) for completeness, Track 2 manager cannot lock house positions; recommend the lock to the relevant wave manager. Verify the NRL8 form name/route against gov.uk at write time before asserting.

---

## House-position conflict flag (Stage 2)

**Conflict 1, STALE_FACTS (processing time).** Body asserts "4-6 weeks" and FAQ asserts "up to 8-10 weeks", internally inconsistent AND inconsistent with §17.5 ("usually within six weeks") and with gov.uk ("no fixed time"). The "8-10 weeks" figure is unsourced. **Action at execution:** reconcile to §17.5 + gov.uk quarter-start backdating; delete "8-10 weeks". Flag as **STALE_FACTS** in `track2_site_wide_flags.md`.

**Conflict 2, UNSOURCED compliance claims.** "Up-to-date for at least two years" and "reapply after 12-24 months" are not in §17.5 or gov.uk. **Action:** soften to the §17.5 / gov.uk standard or strip the invented numbers.

**Conflict 3, April 2027 rates framing (§16.22 Bill-vs-enacted pattern, NOW RESOLVED AS ENACTED).** Source line 114 asserts "new separate tax rates from April 2027, 22% basic, 42% higher, 47% additional" as a bare fact. **Verified at brief-drafting (2026-05-30) against house_positions §7:** these rates are ENACTED by Finance Act 2026 (Royal Assent **18 March 2026**), ss.6-7, effect **6 April 2027**, England + Northern Ireland only (Scotland/Wales set their own under FA 2026 s.8 / Sch 2). So the figures are correct, but the framing is incomplete: it lacks the date-stamp, the statute citation, and the England/NI scope. **Action at execution:** RE-VERIFY against legislation.gov.uk at write time (the F-37 discipline, confirm FA 2026 c.11 Royal Assent date and ss.6-7 still operative), then assert as enacted law WITH the date + citation + England/NI scope. Do NOT over-hedge to "proposed" (that would now be STALE in the opposite direction) and do NOT bare-assert without the scope qualifier.

**No pricing leak found**, page is clean on the no-fees rule (confirmed: zero `£`-fee lines in body; the only `£` figures are the £30,000/£8,000/£22,000/£6,000 worked-example illustration and the §17.5 £100/week NRL3 threshold, all legitimate). Preserve that cleanliness.

**Em-dash strip:** 9 em-dashes flagged in the body must be removed (commas / parentheses / full stops / middle dots) per the no-em-dash rule. Execution six-check must confirm count = 0.

---

## Authority links worth considering (Stage 2, VERIFY LIVE at execution)

Execution session selects 5-7 to actually cite; verify each at write time (URL live AND operative wording still present, the F-8 "statute removed by amendment even when URL is live" hazard).

| URL | Use case |
|---|---|
| https://www.legislation.gov.uk/ukpga/1995/4/schedule/23 | **FA 1995 Sch 23**, the NRL scheme primary statutory basis (§16.6). Verify Sch 23 still operative / not repealed-and-replaced at write time. |
| https://www.legislation.gov.uk/uksi/1995/2902/contents | **SI 1995/2902**, Taxation of Income from Land (Non-Residents) Regulations 1995 (the regulations that run the scheme, including the gross-payment approval and quarter mechanics) (§16.6). |
| https://www.gov.uk/guidance/apply-as-an-individual-to-receive-uk-rental-income-without-uk-tax-deducted | The gov.uk NRL1 application guidance (process steps + quarter-start backdating + online-vs-post + agent-authorisation caveat + "no fixed time"). Controlled link-out for users who want gov.uk authority. |
| https://www.gov.uk/government/publications/non-resident-landlord-application-to-have-uk-rental-income-without-deduction-of-uk-tax-individuals-nrl1 | The NRL1 form publication page (validates the "Key Sections of the form" content). |
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual | HMRC Property Income Manual, NRL scheme detail. Verify the exact PIM page number at write time (do NOT guess a manual section number, the PIM4101-hallucination lesson). |
| https://www.legislation.gov.uk/ukpga/2026/11/contents | **FA 2026 c.11**, for the April 2027 rates citation in the self-assessment section. Verify Royal Assent 18 March 2026 + ss.6-7 operative at write time (F-37 discipline). |

**(Execution session selects 5-7 to cite in body; render as legislation.gov.uk / gov.uk hyperlinks.)**

---

## Section-by-section content plan to ~2,900 words

Target: 11-13 H2s, ~2,900 body words, process table + NRL1/2/3/6 comparison table, 12-14 FAQs, 2 inline `<aside>` CTAs at conversion moments (after the eligibility-gate section and after the "tax already deducted" reclaim section). Statute spine threaded where marked.

1. **Intro (~120 w)**, non-resident landlords have 20% withheld at source; gross-payment approval via the NRL1 form lets you receive the full rent and settle tax through self assessment. Set up the page as the specialist application walkthrough; back-link to the scheme pillar for the overview.
2. **What gross-payment approval is, and the statutory basis (~260 w)**, the NRL scheme is statutory (FA 1995 Sch 23; SI 1995/2902), NOT treaty-based; even a treaty-resolved non-resident must apply. Without approval, the agent/tenant withholds 20% (cross-link withholding sibling). With NRL1 approval you receive rent gross. Thread §16.6 + §16.6 do-not-write guard.
3. **Are you eligible? The "usual place of abode outside the UK" test (~280 w)**, the actual NRL gate: a landlord whose usual place of abode is outside the UK (distinct from, and broader than, statutory residence; ~6 months abroad can trigger it). Then the approval conditions per §17.5 / gov.uk: UK tax affairs up to date + commitment to remain compliant. **Strip the unsourced "two years" claim here.** Inline CTA #1 after this section.
4. **NRL1 vs NRL2 vs NRL3 vs NRL6 (and NRL8): the form family (~240 w + TABLE)**, comparison table (form | who uses it | purpose), per §17.5: NRL1 (landlord gross-payment application), NRL2 (agent quarterly return), NRL3 (tenant return where no agent + rent >£100/week), NRL6 (annual statement of tax deducted), NRL8 (reclaim of over-deducted tax). This is the differentiation the pillar only lists at a glance.
5. **How to complete the NRL1 form, step by step (~300 w)**, information needed (name, overseas address, NI number if held, UTR, property addresses, agent details). The form sections. **Online service vs paper:** you can apply online, BUT if you are authorising a tax agent you generally cannot use the online service and must apply by post, the missing caveat the diagnosis flags.
6. **What happens after you submit: timescales and quarter-start backdating (~280 w)**, reconcile the processing time: HMRC usually decides within around six weeks (§17.5), but there is no fixed statutory deadline. Critically, approval is backdated to the START of the quarter (quarters end 30 Jun / 30 Sep / 31 Dec / 31 Mar) in which HMRC received your application, so tax over-deducted in that quarter is recoverable. **Delete "8-10 weeks".**
7. **Tax already deducted before approval: how to reclaim it (NRL8 route) (~240 w)**, what to do with 20% withheld before approval/backdating took effect: offset against the self-assessment liability, and where over-deducted, reclaim (verify NRL8 form/route at write time). Inline CTA #2 after this section.
8. **After approval: notifying your letting agents (~200 w)**, provide the approval reference so the agent pays gross; cross-link the NRL2 agent-returns sibling. Direct-let arrangements (tenant pays gross; NRL3 threshold context).
9. **Self assessment and MTD obligations after approval (~240 w)**, annual SA return by 31 January; declare all rental income and allowable expenses; MTD ITSA from April 2026 (confirm slug). **Frame the April 2027 rates as ENACTED** (FA 2026 RA 18 Mar 2026, ss.6-7, effect 6 April 2027, England + NI only), date-stamped + cited, not bare. Defer SA depth to the SA-filing sibling.
10. **Record-keeping and changes you must report (~200 w)**, keep records ~5+ years; report acquisitions/disposals, address changes, agent changes, and ceasing to be non-resident. **Strip the unsourced "12-24 months reapply" claim;** frame withdrawal/reapplication against the §17.5 / gov.uk compliance standard.
11. **If your application is refused or approval is withdrawn (~200 w)**, common refusal reasons (tax debts, late filing, ongoing enquiry); on withdrawal the agent resumes 20%; reapply once compliance is restored (no invented timeframe).
12. **Common mistakes + when to get specialist help (~180 w)**, incomplete form, mismatched HMRC details, missing properties, ignoring the agent-authorisation online-service caveat. Anonymised social proof only; lead-gen CTA via auto-injected LeadForm (do not duplicate).
13. **FAQs (12-14)**, each targets a verbatim Bing/Google query. Seed set: "What is the NRL1 form?"; "How do I apply for NRL gross approval?"; "How long does NRL1 approval take?" (reconciled answer); "Is the NRL1 form online or paper?"; "Can I use the online NRL1 service if I have a tax agent?"; "What happens to tax deducted before NRL approval?"; "Can I reclaim over-deducted NRL tax?"; "Does NRL approval backdate?"; "Can I get NRL approval with tax debts?"; "Do I need a UK bank account for NRL approval?"; "What is the difference between NRL1, NRL2 and NRL3?"; "Does NRL approval expire?"; "What is the usual place of abode test?"; "Do treaty non-residents still need NRL1?".

---

## Statute / authority spine (every citation to be verified at write time)

| Section in brief | Citation | House position | Verify at write time |
|---|---|---|---|
| §2 statutory basis | **FA 1995 Sch 23** (Finance Act 1995, Schedule 23, NRL scheme primary basis) | §16.6 [LOCKED] | legislation.gov.uk Sch 23 still operative |
| §2 statutory basis | **SI 1995/2902** (Taxation of Income from Land (Non-Residents) Regulations 1995) | §16.6 [LOCKED] | legislation.gov.uk contents live |
| §3 eligibility | "usual place of abode outside the UK" test (per SI 1995/2902 + gov.uk) | §16.6 / §17.7 [LOCKED] | gov.uk NRL1 guidance wording |
| §4 form family | NRL1 / NRL2 / NRL3 / NRL6 (+ NRL8 reclaim) | §17.5 [LOCKED]; NRL8 NOT yet numbered (flag for lock) | gov.uk form names; NRL8 route |
| §6 timescale | "usually within around six weeks" + quarter-start backdating | §17.5 [LOCKED] + gov.uk | gov.uk quarter mechanic |
| §9 SA / rates | **FA 2026 c.11 ss.6-7** (April 2027 property income rates 22/42/47, England + NI) | §7 [LOCKED, ENACTED, RA 18 Mar 2026] | legislation.gov.uk FA 2026 RA date + ss.6-7 (F-37) |
| §9 SA / scope | **FA 2026 s.8 / Sch 2** (Scotland/Wales set own property income rates) | §7 [LOCKED] | legislation.gov.uk |
| cross-ref only | **TCGA 1992 s.1H / NRCGT 60-day** (when you eventually sell) | §17.4 [LOCKED] | cross-link sibling, do not re-cite in depth |

---

## Metadata plan (metaTitle / metaDescription / h1)

Test 2-3 candidates at execution against the verbatim Bing winners ("nrl1 form", "nrl gross approval", "hmrc nrl application"). Lead with the literal form name + the gross-payment outcome.

- **metaTitle (≤ 62 chars)** candidates:
  - "NRL1 Form: Apply to Receive UK Rent Gross (HMRC Guide)" (54 chars), leads with the exact "nrl1 form" Bing winner.
  - "How to Apply for NRL Gross Approval: NRL1 Form Guide" (52 chars).
  - Recommended: option 1 (literal-query lead + outcome + authority cue).
- **metaDescription (≤ 158 chars):** "How non-resident landlords use the HMRC NRL1 form to receive UK rental income gross without 20% tax deducted: eligibility, the steps, timescales and reclaiming tax already deducted." (179 chars, TRIM to ≤158 at execution; e.g., drop "and reclaiming tax already deducted").
- **h1:** "How to Apply for NRL Gross Approval Using the HMRC NRL1 Form" (leads with the action + the literal form name; replaces the generic "Complete HMRC Guide" tail).

---

## Universal rules, inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: voice rules (no em-dashes; anonymised social proof only; no pricing; exact figures + named statute), lead-gen architecture (LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated; 1-3 inline `<aside>` CTAs at conversion moments), CSS-in-markdown (semantic HTML only, no Tailwind classes in body), FAQs-and-schema (frontmatter `faqs:` array, target 12-14; `buildBlogPostingJsonLd` auto-emits FAQPage, never hand-add FAQ schema in body), anti-templating discipline, six-check verification (`competitor_rewrite_playbook.md §4.3`), statute-citation discipline (F-8, content can be removed by amendment even when URL is live), and all §16 lessons (esp. §16.18 reasoning-first, §16.31 URL-liveness, §16.22/§16.27/§16.30/§16.33/F-37 Bill-vs-enacted, §16.14/§16.15 tracker hygiene). If any parent rule changes, this brief inherits automatically.

---

## 19-step workflow, inherited from parent program with Track 2 deltas (do not restate)

Per `TRACK2_PROGRAM.md §4 section 14`: inherits the full workflow from `NETNEW_PROGRAM.md §7`. Track 2 deltas: Step 9 "Rewrite markdown at existing path" (preserve frontmatter slug + canonical + category; update `dateModified` to write date); Step 12 "Confirm no redirect needed" (none, REWRITE in place, slug kept, collapse-direction check recorded above); Step 13 "Update existing `monitored_pages` row OR insert new" (insert; baseline is INVISIBLE on Google so use the longer monitoring window per F-11). **Mandatory pre-rewrite verification step:** re-verify FA 2026 §7 lock status against legislation.gov.uk at write time (F-37); and verify the NRL8 form name/route + the gov.uk quarter-start backdating wording before asserting either.

---

## Per-page work-log (for execution session)

(Empty template, populated at execution time.)

### House-position alignment
- §16.6 statutory basis (FA 1995 Sch 23; SI 1995/2902): __
- §17.5 NRL1/2/3/6 + "around six weeks": __
- §17.5 extension recommendation for NRL8 + backdating (flag raised?): __
- §7 April 2027 rates, verified ENACTED at write (RA 18 Mar 2026, ss.6-7, England+NI): __
- §13 do-not-write (no pricing / no client names): __

### Comparison: before vs after
- Word count: 1,492 → __ (target ~2,900)
- H2 count: 8 → __ (target 11-13)
- FAQ count: 4 → __ (target 12-14)
- Authority links: 0 → __ (target 5-7)
- Statute citations: 0 → __ (target: FA 1995 Sch 23, SI 1995/2902, FA 2026 ss.6-7 min.)
- Inline CTAs: 0 → __ (target 2)
- Process table: 0 → __ (1 expected)
- NRL1/2/3/6 comparison table: 0 → __ (1 expected)
- Em-dashes: 9 → 0 (six-check)

### Stale-fact reconciliation
- Processing time "4-6 / 8-10 weeks" → reconciled to "around six weeks + quarter-start backdating": __
- Unsourced "two years" / "12-24 months" → softened/stripped: __
- "Usual place of abode outside the UK" test added: __
- Online-service-vs-agent-authorisation caveat added: __

### Flags raised
- STALE_FACTS (processing-time + unsourced compliance): __
- §17.5 extension recommendation (NRL8 + backdating) to wave manager: __
- April 2027 framing verification (F-37 chain): __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
