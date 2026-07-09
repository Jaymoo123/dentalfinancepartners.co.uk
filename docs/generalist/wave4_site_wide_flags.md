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
