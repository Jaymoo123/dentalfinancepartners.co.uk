# Wave 4 site-wide flags (generalist / Holloway Davies)

**Created:** 2026-07-09. **Status:** Pre-launch (no flags yet).

Flag types per NETNEW_PROGRAM §13.2: EXISTING_PAGE_STALE, BRIEF_DRIFT, INTERNAL_LINK, CROSS_BUCKET, REDIRECT, HOUSE_POSITION_EXTENSION, AUTHORITY_GAP. Flags never block.

---

## F-60 — DISCOVERY — A6 balance sheet brief — 2026-07-09

**Type:** DISCOVERY (future wave pool)  
**Source:** A6 brief session  
**Finding:** "creditor days / debtor days" as derived management-accounts ratios (from balance sheet + P&L) has no standalone treatment in the generalist corpus. A "how to read management accounts" or "key financial ratios for SME directors" page would fill a genuine gap and cluster with A6 + A1.  
**Action:** Add to topic pool for a future wave. No action required this wave.

**Discipline:** flag edits go to THIS file in main via ABSOLUTE path `C:/Users/user/Documents/Accounting/docs/generalist/wave4_site_wide_flags.md`. NEVER on a worktree branch.

---

(Sessions append flags below this line. Manager closes via in-place edit + commit at wave-close.)

---

## F-101 — HP LOCK NEEDED — A10 HICBC — child benefit weekly rates 2026/27 unconfirmed — 2026-07-09

**Type:** HOUSE_POSITION_EXTENSION (HP lock needed before write)
**Source:** A10 brief session (high-income-child-benefit-charge-business-owners-uk)
**Severity:** HIGH
**Finding:** gov.uk "what you'll get" page currently shows £27.05/week (eldest/only child) and £17.90/week (additional children) but does not state which tax year these apply to. The 2026/27 benefit-and-pension-rates publication is confirmed published (gov.uk landing page accessed, Feb 2026 update confirmed figures). However the HTML sub-page and PDF could not be machine-read during this session to extract child benefit specifically. Both worked examples in the brief depend on confirmed 2026/27 CB rates.
**Action required:** Writer fetches https://www.gov.uk/child-benefit/what-youll-get and/or the HTML sub-page of the 2026/27 benefit rates publication, confirms the 2026/27 child benefit weekly rates at primary source, inserts confirmed figures into worked examples, and cites the confirmation URL inline. If the rates differ from the above, the illustrative figures in the brief must be updated before committing the page.
**Status:** CLOSED 2026-07-09 gate: conductor verified GBP27.05 / GBP17.90 weekly at gov.uk/child-benefit-rates (page carries no year tag - writer presents as current rates, date-tagged).

---

## F-102 — HP LOCK NEEDED — A10 HICBC — salary-sacrifice pension and ANI reduction — 2026-07-09

**Type:** HOUSE_POSITION_EXTENSION
**Source:** A10 brief session
**Severity:** MEDIUM
**Finding:** The brief correctly distinguishes employer pension contributions (do not reduce personal ANI for HICBC) from personal pension contributions (do reduce ANI). A third variant, a salary-sacrifice arrangement that formally reduces the director's employment income before it reaches them, would also reduce ANI. The house positions doc does not currently address this nuance for the HICBC context.
**Action required:** If the writer plans to mention salary sacrifice as an HICBC lever, raise for HP confirmation before publishing. The existing HP §10 covers the pension annual allowance and employer vs personal contributions but does not address the salary-sacrifice ANI-reduction point in the context of HICBC. Manager: add a brief note to HP §4 or §10 confirming whether salary sacrifice reduces ANI for HICBC purposes (it does, because it reduces employment income before assessment, but this should be confirmed at primary source).
**Status:** CLOSED 2026-07-09 gate: salary-sacrifice lever OUT of scope for this page; no HP change.

---

## F-91 — HP LOCK NEEDED — A9 VAT return brief — 2026-07-09

**Type:** HOUSE_POSITION_EXTENSION (HIGH — live URL verification required before publish)
**Source:** A9 brief session (how-to-complete-and-submit-vat-return-uk.md)
**Finding:** gov.uk VAT Notice 700/12 ("How to fill in and submit your VAT Return") returned 404 from multiple URL attempts on 2026-07-09. Box definitions used in the brief are from training knowledge of the established post-Brexit 9-box layout. The NI-protocol-only status of Boxes 2, 8 and 9 for GB businesses is well-established but not live-verified.
**Required action:** Writer must fetch the live VAT Notice 700/12 URL before authoring the page, verify all nine box definitions verbatim, and update the brief + HP-lock extension if any definition differs. Try: `https://www.gov.uk/guidance/vat-how-to-fill-in-and-submit-your-vat-return` or search gov.uk for "VAT700/12".
**Status:** CARRIED TO RUN 2026-07-09: writer must live-verify VAT Notice 700/12 box definitions before authoring (mandate in RUN prompt).

---

## F-92 — HP LOCK NEEDED — A9 VAT return brief — 2026-07-09

**Type:** HOUSE_POSITION_EXTENSION (HIGH — live URL verification required before publish)
**Source:** A9 brief session (how-to-complete-and-submit-vat-return-uk.md)
**Finding:** gov.uk VAT Notice 700/45 ("How to correct VAT errors and make adjustments or claims") returned 404 from multiple URL attempts on 2026-07-09. Error correction thresholds stated in the brief (net under £10,000 + under 1% of Box 6 = adjust on next return; £10,000 to £50,000 or over 1% = VAT652 advisable; over £50,000 = VAT652 mandatory) are from training knowledge. They may have been updated.
**Required action:** Writer must fetch the live VAT Notice 700/45, verify the three threshold bands and the VAT652 reference, and update the brief before authoring. Try: `https://www.gov.uk/guidance/vat-how-to-correct-vat-errors` or search gov.uk for "correct VAT errors 700/45".
**Status:** CARRIED TO RUN 2026-07-09: writer must live-verify VAT Notice 700/45 error thresholds before authoring (mandate in RUN prompt).

---

## F-20 — EXISTING_PAGE_STALE

**Raised:** 2026-07-09 (A2 brief session)
**Source:** wave4_collision_verify.md side-findings
**Page:** `employee-mileage-45p-tax-free-rules` (generalist corpus)
**Issue:** Slug and presumably content references the 45p AMAP rate. This is stale: the approved mileage rate for cars/vans rose to 55p per 10,000 business miles from 6 April 2026 (FA 2026 / HP §12). The old 45p applies only up to 5 April 2026.
**Action needed:** Rewrite sweep pass on this page to update the rate to 55p/25p (from 6 Apr 2026) and add date tagging. Defer to rewrite program or next AMAP estate sweep — does not block Wave 4.
**Status:** OPEN

---

## F-110 -- HOUSE_POSITION_EXTENSION (HIGH)

**Raised:** 2026-07-09 (A11 brief session)
**Source:** A11 brief (late-payment-rules-small-business-uk.md), statutory interest rate verification
**Item:** Bank of England base rate at two reference dates used in the late-payment worked example:
- 31 December 2025 (reference date for interest starting Jan-Jun 2026)
- 30 June 2026 (reference date for interest starting Jul-Dec 2026)
**Issue:** BoE website returned HTTP 403 at brief-write time (2026-07-09). The formula (8% + BoE base rate at the semi-annual reference date, per SI 2002/1675 Article 4) is confirmed at primary source. The actual numerical rates at those two dates are unconfirmed.
**Action needed:** Writer fetches both figures from https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate (or the BoE database) before authoring the worked example, substitutes verified figures, and confirms via a brief note. Conductor adds a HP lock entry for the late-payment statutory rate once confirmed.
**Blocks publish:** Yes -- do not publish the worked example with placeholder figures.
**Status:** CLOSED 2026-07-09 gate: base 3.75% verified via two HMRC statutory definitions; statutory rate 11.75% H1 2026 locked into the brief (example GBP286.51).

---

## F-50 — AUTHORITY_GAP — A5 competitor URLs both dead — 2026-07-09

**Pick:** A5 `how-to-set-up-a-business-partnership-uk`
**Finding:** Both competitor URLs from picks.yaml returned HTTP 404 on 2026-07-09:
- https://informi.co.uk/business-administration/setting-up-a-partnership (404)
- https://countingup.com/resources/what-business-partnership/ (404)

**Action taken:** Brief built entirely from primary sources (gov.uk, legislation.gov.uk) and house positions §1/§2/§6/§7. No live competitor benchmark available for this pick.
**Content impact:** None. Primary sources are sufficient. No replacement competitor URL found.
**Close condition:** No action needed unless manager wants a live competitor benchmark added pre-write.
**Status:** CLOSED 2026-07-09 gate: noted; brief built from primary sources.

---

## F-70 -- AUTHORITY_GAP

**Raised:** 2026-07-09 (A7 brief session)
**Source:** live URL check, picks.yaml A7 competitor list
**Finding:** Both competitor URLs listed for A7 return HTTP 404: `https://www.crunch.co.uk/knowledge/what-is-a-unique-taxpayer-reference-utr` and `https://countingup.com/resources/how-to-find-and-use-your-company-utr-number/`. No live specialist competitor page found covering this topic. Brief built from gov.uk primary sources only.
**Action:** No structural competitor to differentiate against. Opportunity: first well-structured live page on this topic earns the position. No action blocks the brief.
**Status:** CLOSED 2026-07-09 gate: noted; brief built from gov.uk.

---

## F-120 — HOUSE_POSITION_EXTENSION | A12 | 2026-07-09

**Type:** HOUSE_POSITION_EXTENSION (HIGH)
**Source:** A12 brief session (personal-tax-for-llp-members-uk)
**HP section:** §6 (Partnerships, salaried-member rules)
**Finding:** Supreme Court judgment HMRC v BlueCrest Capital Management (UK) LLP [2026] UKSC 18 (1 July 2026) is the first authoritative ruling on Condition B of the salaried-member rules (ITTOIA 2005 s.863C). The Court held "significant influence" requires (a) a right traceable to an identifiable contractual, statutory or other legal source in the LLP agreement and (b) practical and commercial substance in the conduct of the LLP's affairs. Informal managerial authority, however substantial, does not qualify. HP §6 lock predates this judgment (locked 2026-06-12).
**Action:** Add sub-note to HP §6 under "LLP salaried-member rules" recording BlueCrest [2026] UKSC 18, the legal-source requirement, and the governance-over-activities principle. Manager applies at Stage 2b gate or pre-wave-close. A12 page writer treats salaried-member section at awareness level only.
**Status:** CLOSED 2026-07-09 gate: locked as HP SS6.A (BlueCrest [2026] UKSC 18 Condition B note).

---

## F-121 — EXISTING_PAGE_STALE | A12 adjacent | 2026-07-09

**Type:** EXISTING_PAGE_STALE (LOW)
**Source:** A12 brief session; cross-link page read during collision verify
**Page:** `limited-company-vs-llp-consultant`
**Finding:** keyTakeaways states "Business Asset Disposal Relief gives company shareholders a 14% CGT rate ... rising to 18% from April 2026." The 18% rate is now live (HP §5, from 6 April 2026); the page should say "now at 18% from 6 April 2026" and tag the 14% figure as 2025/26-only.
**Action:** Light factual update in next rewrite cycle. Non-blocking for Wave 4.
**Status:** OPEN


---

## F-220 — EXISTING_PAGE_STALE | A2 adjacent | 2026-07-09

**Type:** EXISTING_PAGE_STALE (LOW)
**Source:** A2 brief (double-entry-bookkeeping-explained-uk); collision verify side-findings
**Page:** employee-mileage-45p-tax-free-rules
**Finding:** Slug and content reference AMAP at 45p. HP §12 confirms the first-10,000-miles rate rose from 45p to 55p from 6 April 2026 (2026/27). This page is presumed stale against the current AMAP rate.
**Action:** Queue for AMAP sweep (estate-wide stale-figure sweep noted in MEMORY). Non-blocking for Wave 4. Update at next rewrite cycle or dedicate a sweep pass.
**Status:** OPEN (dup of F-20; AMAP sweep backlog).

---

## F-230 -- HOUSE_POSITION_EXTENSION | A3 | 2026-07-09

**Type:** HOUSE_POSITION_EXTENSION (MEDIUM)
**Source:** A3 brief (corporation-tax-paying-early-or-in-instalments-uk); verified at primary source (gov.uk/CTM) during brief prep.
**HP section:** §3 (Corporation Tax rates) -- extension needed to §3.A
**Finding:** HP §3 mentions "large companies pay by quarterly instalments" but does not lock the specific QIP figures. All figures below were primary-source verified (gov.uk HMRC interest rates, SI 1998/3175, CTM92520/92560) during brief prep on 2026-07-09. §3.A has now been ADDED to house_positions.md (Wave 4 gate 2026-07-09) with all figures locked. This flag records the post-write confirmation that §3.A is live.
**Figures locked in §3.A:**
- QIP credit interest: 3.50% (from 29 Dec 2025; base rate minus 0.25%, SI 1998/3176)
- QIP debit interest: 6.25% (from 29 Dec 2025; base rate plus 2.5%, SI 1998/3176)
- General repayment interest: 2.75% (from 9 Jan 2026)
- General late-payment interest: 7.75% (from 9 Jan 2026)
- Large-company threshold: augmented profits > £1.5m (divided by associated companies)
- Very large company threshold: > £20m (divided by associated companies)
- Large-company instalment schedule: 6m13d/9m13d/12m13d after AP start; 3m14d after AP end
- Very large company schedule: 14th of months 3, 6, 9, 12 of AP
- Growth relief: not large in preceding 12 months and profits <= £10m
- De minimis: CT liability <= £5,000
**Action:** No further action needed. §3.A already locked in house_positions.md. All citing pages should reference §3.A.
**Status:** CLOSED 2026-07-09 (§3.A locked during Wave 4 gate; A3 page written and committed).

---

## F-231 -- AUTHORITY_GAP | A3 | 2026-07-09

**Type:** AUTHORITY_GAP
**Source:** A3 write-time competitor URL check
**Finding:** Both competitor URLs from picks.yaml for A3 returned errors at write time on 2026-07-09:
- https://www.crunch.co.uk/knowledge/what-are-the-benefits-of-paying-corporation-tax-early (HTTP 404)
- https://informi.co.uk/finance/corporation-tax-deadlines-filing-and-paying (HTTP 500)
Both URLs dropped per brief instruction. Page built entirely from primary sources (SI 1998/3175, SI 1998/3176, gov.uk HMRC interest rates, CTM) and house positions §3/§3.A.
**Action:** No content impact. No replacement competitor URL required. Page stands on primary sources.
**Status:** CLOSED 2026-07-09.

## F-210 -- AUTHORITY_GAP -- A1 cash-flow -- competitor URLs dead -- 2026-07-09

**Type:** AUTHORITY_GAP
**Source:** A1 brief (cash-flow-management-small-business-uk); session write-time check
**Finding:** Both competitor URLs from picks.yaml returned HTTP 404 at brief-write time (crunch.co.uk/knowledge/improve-your-cash-flow and informi.co.uk forecasting guide). No live on-topic guide-not-funnel competitor confirmed. Page was written from primary sources, house positions, and brief worked examples without a live competitor benchmark.
**Content impact:** None. Worked examples and structure from brief are sufficient. Page differentiates on number-first rigour (13-week forecast skeleton + debtor-days arithmetic + CCC).
**Status:** CLOSED 2026-07-09 WRAP.


---

## F-240 — AUTHORITY_GAP — A4 competitor URL dead — 2026-07-09

**Type:** AUTHORITY_GAP
**Pick:** A4 `do-i-need-a-separate-business-bank-account-uk`
**Finding:** crunch.co.uk competitor URL (https://www.crunch.co.uk/knowledge/do-you-need-a-separate-bank-account-for-your-business) returned HTTP 404 on 2026-07-09. businessaccountingbasics.co.uk URL was live (200 OK) and on-topic; used for structural reference only (no verbatim use).
**Action taken:** Page written from brief, house positions, and primary sources. Single live competitor referenced structurally only. No replacement URL fabricated.
**Status:** CLOSED (no action needed).

---

## F-250 — WRITE COMPLETE — A5 how-to-set-up-a-business-partnership-uk — 2026-07-09

**Type:** WRITE COMPLETE (no new flags)
**Source:** A5 RUN-phase write
**Notes:** Page written from primary sources only (F-50 already closed: both competitor URLs dead). All cross-links verified live (limited-company-vs-llp-consultant, mtd-itsa-april-2026-deadline-mixed-member-partnerships, how-to-switch-from-sole-trader-to-limited-company, how-to-register-as-self-employed-uk). No new HP extensions or stale-page findings raised. Committed SHA 88111484.
**Status:** CLOSED

---

## F-260 — DEAD_COMPETITOR_URL — A6 balance sheet — 2026-07-09

**Type:** DEAD_COMPETITOR_URL  
**Source:** A6 page-write session  
**Finding:** https://informi.co.uk/finance/what-is-a-balance-sheet-and-how-do-you-read-one returned HTTP 404 at write time. URL was in picks.yaml competitor list. Dropped from all on-page references per brief instruction. businessaccountingbasics.co.uk/balance-sheet/ confirmed live (200).  
**Action:** No on-page action needed. Update picks.yaml or the brief archive to mark this URL as dead.

---

## F-261 — BRIEF_STALE_FIGURE — A6 balance sheet — CA 2006 s.382 thresholds — 2026-07-09

**Type:** BRIEF_DRIFT (stale statutory figure in brief)  
**Source:** A6 page-write session; primary source verification at legislation.gov.uk  
**Finding:** The A6 brief cited CA 2006 s.382 small-company thresholds as £10.2m turnover / £5.1m balance sheet total / 50 employees (the pre-2025 figures). The current thresholds, effective 6 April 2025 via SI 2024/1303 (The Companies (Accounts and Reports) (Amendment and Transitional Provision) Regulations 2024), are £15m turnover / £7.5m balance sheet total / 50 employees. The page as written uses the verified current figures. The brief archive and any future brief referencing these thresholds should be updated.  
**Action:** Brief archive note only; no page re-work needed. Check whether any other live pages cite the stale £10.2m/£5.1m figures and add to the stale-figures sweep backlog.


---

## F-270 -- WRITE_COMPLETE | A7 | 2026-07-09

**Type:** WRITE_COMPLETE (informational)
**Source:** A7 write (unique-taxpayer-reference-utr-uk); SHA 4b9caf29
**Notes:** Page written from gov.uk primary sources only (both competitor URLs confirmed 404). All three UTR types covered (personal / corporation tax / partnership). Decision table rendered as HTML <table>. 12 FAQs in frontmatter. Collision clearance boundary respected: registration issuance flow linked out to how-to-register-as-self-employed-uk not covered inline. Internal links verified: how-to-register-as-self-employed-uk, how-to-register-a-limited-company-uk-with-a-protected-business-name, accountant-for-construction-subcontractors-cis, self-assessment-accountant-2025-26, btl-mortgage-accountants-uk, accountant-for-landlords-uk-property-investors.
**Status:** CLOSED


## F-320 -- HOUSE_POSITION_EXTENSION (salaried-member Condition B, BlueCrest SC July 2026)

**Raised:** 2026-07-09 (A12 write session)
**Type:** HOUSE_POSITION_EXTENSION
**Source:** personal-tax-for-llp-members-uk.md
**Finding:** The Supreme Court judgment HMRC v BlueCrest Capital Management (UK) LLP [2026] UKSC 18 (1 July 2026) is the first authoritative ruling on Condition B of the salaried-member rules (ITTOIA 2005 s.863C). The Court held that 'significant influence' requires a right that is (a) traceable to an identifiable contractual, statutory or other legal source in the LLP agreement, and (b) has practical and commercial substance in the conduct of the LLP's affairs, not informal managerial authority however substantial. The House Positions doc (hp §6) records the salaried-member rules at awareness level but does not yet include the BlueCrest holding or the legal-source requirement.
**Action needed:** Manager adds a sub-note to HP §6 under 'LLP salaried-member rules' recording BlueCrest [2026] UKSC 18, the legal-source requirement for Condition B, and the governance-over-activities principle. Apply at Stage 2b gate or pre-wave-close.
**Status:** CLOSED (HP SS6.A already locked at gate; BlueCrest citation conductor-verified at national archives).

---

## F-321 -- EXISTING_PAGE_STALE (limited-company-vs-llp-consultant BADR rate)

**Raised:** 2026-07-09 (A12 write session)
**Type:** EXISTING_PAGE_STALE
**Source:** personal-tax-for-llp-members-uk.md
**Page:** limited-company-vs-llp-consultant
**Finding:** The page states in keyTakeaways: 'Business Asset Disposal Relief gives company shareholders a 14% CGT rate on the first £1 million of gains in 2025/26, rising to 18% from April 2026.' The rising to 18% is now current (from 6 April 2026, HP §5). The 14% figure should be date-tagged as 2025/26-only; the current live rate for disposals from 6 April 2026 is 18%.
**Action needed:** Light factual update to date-tag the 14% as 2025/26-only and confirm 18% as the current rate. Defer to next rewrite cycle; does not block Wave 4.
**Status:** OPEN (dup of F-121; backlog).

---

## F-300 — EXISTING_PAGE_STALE | A10 adjacent | 2026-07-09

**Type:** EXISTING_PAGE_STALE (LOW)
**Source:** A10 write session; cross-link page read
**Page:** `tax-efficient-salary-dividend-split-director-2025-26`
**Finding:** The slug date-tags 2025/26. The dividend rates changed from 6 April 2026 (FA 2026 s.4: ordinary 10.75%, upper 35.75%). The page likely still states 8.75%/33.75% for the ordinary and upper rates. Requires a 2026/27 rate refresh.
**Action:** Light factual update in next rewrite cycle. Non-blocking for Wave 4.
**Status:** OPEN (backlog: salary-dividend split page 2026/27 refresh).

---

## F-301 — INTERNAL_LINK | A10 | 2026-07-09

**Type:** INTERNAL_LINK
**Source:** A10 write session
**Finding:** A10 cross-links to `dividend-to-spouse-non-director` and `tax-efficient-salary-dividend-split-director-2025-26`. Both verified live in the worktree at write time (2026-07-09). The `taxable-income-calculator` and `self-assessment-accountant-2025-26` pages also verified present. All four cross-links are active.
**Action:** None required. Flag for awareness if either salary-dividend page is retired or redirected.
**Status:** CLOSED — all links verified 2026-07-09

---

## F-280 -- INTERNAL_LINK -- trivial-benefits-rules-uk + p11d-benefits-in-kind-explained back-patches -- 2026-07-09

**Type:** INTERNAL_LINK
**Source:** A8 ship (christmas-party-tax-rules-limited-company-uk)
**Action needed:** Add a forward link from `trivial-benefits-rules-uk` to `christmas-party-tax-rules-limited-company-uk` in the section discussing annual staff events (one sentence). Add a forward link from `p11d-benefits-in-kind-explained` to the same (one sentence, in the context of benefit-in-kind reporting for over-budget events). Both are low-priority back-patch cycle items.
**Priority:** low
**Status:** OPEN (back-patch: reciprocal links on trivial-benefits + p11d pages).

---

## F-310 -- WRITE_COMPLETE | A11 | 2026-07-09

**Type:** WRITE_COMPLETE (informational)
**Source:** A11 write (late-payment-rules-small-business-uk); SHA 08f97d53
**Notes:** Page written from primary sources (LPCD(I)A 1998 ss.4/5A/6, SI 2002/1675 Art 4, VATA 1994 s.36, ITTOIA 2005 s.35, CTA 2009 s.55). Statutory rate 11.75% (base 3.75% at 31 Dec 2025 reference date) date-tagged with reset note. Worked example £10,000 invoice, 89 days, £286.51 interest + £100 compensation. 11 FAQs in frontmatter. Escalation timeline and summary table as raw HTML. No body FAQ section per rules. Boundary respected: HMRC tax-debt interest not mentioned.
**Status:** CLOSED

---

## F-311 -- HOUSE_POSITION_EXTENSION | A11 late-payment statutory rate | 2026-07-09

**Type:** HOUSE_POSITION_EXTENSION (MEDIUM)
**Source:** A11 write; SI 2002/1675 Art 4 formula confirmed at primary source
**Finding:** The House Positions doc does not currently include a locked position on the Late Payment of Commercial Debts statutory interest rate (8% + BoE base rate at the semi-annual reference date). The base rate at 31 December 2025 (3.75%) was derived via two HMRC statutory-interest definitions (late-payment interest 7.75% = base + 4 from 9 Jan 2026; QIP debit 6.25% = base + 2.5 from 29 Dec 2025) rather than confirmed directly at the BoE bank-rate page (which returned 403 at brief-write time). For H2 2026 (reference date: 30 June 2026), the applicable base rate is not yet confirmed.
**Action needed:** Manager (a) adds a HP lock entry for the LPCD statutory rate mechanic (SI 2002/1675 Art 4: 8% + reference-date base rate) in a new §14 or as a sub-note in §7; (b) confirms or updates the 3.75% figure once the BoE bank-rate page is accessible; (c) fetches the 30 June 2026 base rate on or after that date to confirm the H2 2026 statutory rate for any future late-payment page updates.
**Status:** CLOSED 2026-07-09 WRAP: statutory-rate mechanic locked in the A11 brief + page; base 3.75% independently verified by QA (BoE Dec 2025 minutes); H2 2026 rate = re-check after 30 June reference date.

---

## F-290 — F-91 RESOLUTION — A9 VAT return box definitions — 2026-07-09

**Type:** HOUSE_POSITION_EXTENSION (RESOLVED)
**Source:** A9 RUN-phase writer verification
**Finding:** The live gov.uk URL https://www.gov.uk/guidance/how-to-fill-in-and-submit-your-vat-return-vat-notice-70012 returned HTTP 200 and all nine box definitions were verified at write time (2026-07-09). Box labels and content match the brief's training-knowledge definitions. NI Protocol status of boxes 2, 8 and 9 confirmed: these apply only to businesses moving goods between Northern Ireland and EU member states; GB-only businesses enter 0 in all three boxes.
**Status:** CLOSED 2026-07-09. Box definitions on the published page are verified at source. No HP amendment required (positions already consistent with verified content).

---

## F-291 — F-92 STILL OPEN — A9 VAT error correction thresholds — 2026-07-09

**Type:** HOUSE_POSITION_EXTENSION (OPEN — conservative treatment applied)
**Source:** A9 RUN-phase writer verification
**Finding:** All attempted gov.uk URLs for VAT Notice 700/45 (error correction thresholds) continued to return HTTP 404 at write time (2026-07-09). URLs tried: https://www.gov.uk/guidance/vat-how-to-correct-vat-errors, https://www.gov.uk/guidance/correct-errors-on-your-vat-returns, https://www.gov.uk/guidance/vat-notice-70045-how-to-correct-vat-errors-and-make-adjustments-or-claims. None live.
**Action taken:** Per brief instruction, the published page does NOT assert the £10,000 / 1% of Box 6 / £50,000 figures as verified facts. Instead the error correction section describes the general structure (small errors = next-return adjustment; large errors = separate VAT652 disclosure; deliberate errors = always separate) and directs readers to check current thresholds on gov.uk. The keyTakeaways entry also uses conservative language.
**Required action before HP lock:** Manager or next writer must verify the live error correction thresholds from a reachable gov.uk URL (try https://www.gov.uk/vat-corrections or search gov.uk "correct VAT errors 700/45"). If verified figures are £10,000 / 1% of Box 6 / £50,000, update the page to state them explicitly and add to HP §7 extension. If figures differ, update the brief and page accordingly.
**Status:** CLOSED 2026-07-09 WRAP: page ships with conservative error-threshold language (QA-verified no unverified figures asserted); HP lock deferred until Notice 700/45 is fetchable.
