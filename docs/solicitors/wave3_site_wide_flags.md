# Wave 3 site-wide flags (solicitors)

**Created:** 2026-07-09. **Status:** Pre-launch (no flags yet).

Sessions raise flags here for site-wide issues (stale figures, brief drift, back-link needs, HP extensions). Flags never block; sessions continue after flagging.

**Discipline reminder:** flag edits go to THIS file in main via absolute path `C:/Users/user/Documents/Accounting/docs/solicitors/wave3_site_wide_flags.md`. NEVER on a worktree branch.

Flag types per NETNEW_PROGRAM §13.2: EXISTING_PAGE_STALE, BRIEF_DRIFT, INTERNAL_LINK, CROSS_BUCKET, REDIRECT, HOUSE_POSITION_EXTENSION, AUTHORITY_GAP.

---

(Sessions append flags below this line. Manager closes via in-place edit + commit at wave-close.)

---

## F-A9-1 — HOUSE_POSITION_EXTENSION

**Pick:** A9 accountant-for-barristers-chambers-uk
**Raised:** 2026-07-09 Stage 1
**Type:** HOUSE_POSITION_EXTENSION
**Priority:** HIGH (two items; both must be locked before Stage 2 writes the cash-basis and chambers-VAT sections)

**Issue 1 — Cash basis for barristers from 2024/25.**
ITTOIA 2005 s.160 (barristers' early-years cash basis) was repealed by Finance Act 2013 Schedule 4 para 51 (from 2013-14; transitional protection for those already on it for periods ending in/before 2012-13). From 6 April 2024, Finance Act 2024 made the general cash basis the default for unincorporated businesses. The HMRC excluded-categories list (BIM72010: LLPs, corporate-partner partnerships, Lloyd's underwriters, herd basis, profit-averaging, BPRA, mineral extraction, R&D allowances) does NOT mention barristers. Stage 1 WebFetch could not reach the enacted ITTOIA 2005 s.25 / s.25C as substituted by Finance Act 2024 at legislation.gov.uk (s.25A was shown as omitted from 6 Apr 2024 consistent with the restructured cash-basis framework). Conductor must WebFetch the current ITTOIA 2005 s.25 (as in force from 6 Apr 2024) at legislation.gov.uk and confirm no barrister-specific exclusion. If confirmed, lock: "barristers may use the general cash basis by default from 2024/25 under ITTOIA 2005 s.25 as amended by Finance Act 2024; most with significant WIP should elect to accruals under s.25C."

**Issue 2 — VAT on chambers cost-sharing contributions.**
The HMRC VBARRISTERS manual returned HTTP 404 on all URL variants tried (vbarristers1000, vbarristers2000, vbarristers3000). The widely accepted practice position is that chambers cost-sharing (pooled contributions for rent, clerks' fees, administration) is NOT a VAT supply by chambers to its members, and therefore no VAT is chargeable on contributions. This must be verified at Stage 1b against the current VBARRISTERS manual or VAT Notice 700A. Try the HMRC manual index at gov.uk/hmrc-internal-manuals/vat-barristers to find valid sub-page URLs. If the no-supply position is confirmed, lock a new HP §6.L entry. If the manual remains inaccessible, mark the chambers VAT section in the brief as NEW HP LOCK NEEDED with a reader caveat.

**Action at Stage 1b:** Two isolated HP lock commits required before Stage 2.

**Status:** CLOSED 2026-07-09 Stage 1b: cash basis default verified at ITTOIA s.24A (FA 2024 Sch 10) by conductor + locked as HP SS12; chambers VAT locked as hedged write-time-fetch position in SS12.

---

## F-A4-1 — HOUSE_POSITION_EXTENSION

**Pick:** A4 forensic-accounting-litigation-law-firms-uk  
**Raised:** 2026-07-09 Stage 1  
**Type:** HOUSE_POSITION_EXTENSION  
**Priority:** HIGH (blocks VAT section accuracy at Stage 2)

**Issue:** No locked HP position exists for the VAT/disbursement treatment of forensic-accountant / expert-witness fees paid by the instructing firm. The analogous analysis is HP §6.B (counsel's fees: default = supply to the firm, recover input VAT, charge output VAT on the total; disbursement route only where the client directly instructs counsel). The same agency test applies to expert fees, but the SJE structure creates a distinct scenario: under CPR r35.8(5) parties are jointly and severally liable for the SJE's fees, which may satisfy the "client responsible for paying" condition (condition 3 of the eight) more readily than a party-appointed expert.

**Action required at Stage 1b:** Conductor to lock a house position covering:
- (a) Party-appointed expert (firm contracts, firm instructs): likely a supply to the firm (input VAT recoverable, output VAT on recharge if treated as cost component); disbursement if all eight conditions met including that the client is responsible for and authorised the specific expert payment.
- (b) SJE (r35.7 / r35.8, parties jointly and severally liable): stronger case for disbursement treatment; still verify conditions 1, 7, and 8.
- Align with §6.B framing; commit as an isolated HP §6.K entry before Stage 2 authors.

**Status:** CLOSED 2026-07-09 Stage 1b: locked as HP SS6.K (party-appointed vs SJE split).

---

## F-A3-1 — HOUSE_POSITION_EXTENSION

**Pick:** A3 law-firm-financial-distress-restructuring-uk  
**Raised:** 2026-07-09 Stage 1  
**Type:** HOUSE_POSITION_EXTENSION  
**Priority:** HIGH (SRA intervention mechanics must be accurate before page is written)

**Issue:** SRA intervention procedural mechanics. The statutory powers in Solicitors Act 1974 Sch 1 Pt II (paras 5-10) are VERIFIED at legislation.gov.uk: vesting of client money (paras 5-7), debt recovery (para 6A), document seizure (para 9), communications redirect (para 10). However the SRA's own procedural guidance pages (sra.org.uk/solicitors/firm-based-authorisation/interventions/ and sra.org.uk/solicitors/standards-regulations/regulatory-and-disciplinary-procedure-rules/) returned HTTP 404 during Stage 1 WebFetch. The procedural layer (agent appointment, client notification timelines, who bears intervention costs, notice before action) is not currently in house_positions.md.

**Action required at Stage 1b:** Conductor to (a) find an accessible SRA URL covering intervention mechanics (try sra.org.uk search for "intervention" or SRA published guidance PDFs), WebFetch and confirm the procedural mechanics; (b) lock a new HP §11 entry covering SRA intervention: grounds (Sch 1 Pt I), powers (Sch 1 Pt II), procedural layer (agent, client notification, cost recovery). Do NOT write intervention timelines or agent-appointment language into the page without primary source.

**Status:** CLOSED 2026-07-09 Stage 1b: locked as HP SS11; SRA procedural guidance = mandatory write-time fetch (statute Sch 1 is the citable anchor).

---

## F-A3-2 — HOUSE_POSITION_EXTENSION

**Pick:** A3 law-firm-financial-distress-restructuring-uk  
**Raised:** 2026-07-09 Stage 1  
**Type:** HOUSE_POSITION_EXTENSION  
**Priority:** MEDIUM (needed before Stage 2 for IPO article-level precision)

**Issue:** Insolvent Partnerships Order 1994 (SI 1994/2421) article-level detail. Contents-level structure is confirmed (Arts 4-11: PVA, administration, concurrent-petition winding-up routes). Article-level text (exact procedure, modifications to IA 1986) was not fetched. The brief states Arts 4-5 (PVA), Art 6 (administration), Arts 7-11 (winding-up routes) — these need full-text confirmation before the written page cites them.

**Action required at Stage 1b:** Conductor to WebFetch full text of SI 1994/2421 Arts 4-11 at legislation.gov.uk and lock an HP entry for partnership insolvency procedures (or add to HP §1 extension). Confirm: (a) PVA route and modifications; (b) partnership administration availability and conditions; (c) the concurrent-petition mechanism.

**Status:** CLOSED 2026-07-09 Stage 1b: SS11 locks IPO 1994 at contents level; article text = mandatory write-time fetch before citing specific articles.

---

## F-A3-3 — HOUSE_POSITION_EXTENSION

**Pick:** A3 law-firm-financial-distress-restructuring-uk  
**Raised:** 2026-07-09 Stage 1  
**Type:** HOUSE_POSITION_EXTENSION  
**Priority:** HIGH (s.214A is personal-liability material for LLP members; exact wording matters)

**Issue:** IA 1986 s.214A adjustment of withdrawals (LLP members), as inserted by SI 2001/1090 Sch 3. Confirmed at schedule summary level: two-year lookback before winding-up commencement, objective knowledge test (reasonably diligent person), court contribution order up to aggregate withdrawals. The exact statutory wording — in particular whether the two-year period is measured from the date of winding-up resolution/court order, the precise definition of "withdrawal" (does it include partner drawings, bonuses, capital repayments?), and any defences available — was not confirmed at full statutory text.

**Action required at Stage 1b:** Conductor to WebFetch the full inserted text of s.214A within SI 2001/1090 Sch 3 (or equivalent legislation.gov.uk URL showing the inserted provision). Lock the exact: (a) two-year trigger date definition; (b) definition of "withdrawal"; (c) knowledge test wording; (d) any defences; (e) court power scope. Update HP before Stage 2.

**Status:** CLOSED 2026-07-09 Stage 1b: s.214A verified VERBATIM by conductor at legislation.gov.uk (SI 2001/1090 Sch 3); locked in HP SS11.

---

## F-A6-01 — HOUSE_POSITION_CONFLICT

**Pick:** A6 `outsourced-legal-cashiering-guide-uk-law-firms`
**Raised:** 2026-07-09 Stage 1
**Type:** HOUSE_POSITION_CONFLICT
**Priority:** HIGH (wrong paragraph number would mis-cite the Code in every page that uses this hook)

**Issue:** Task dispatch named "SRA Code of Conduct for Firms **para 2.5**" as the third-party-accountability provision. WebFetch of sra.org.uk (url: `/solicitors/standards-regulations/code-conduct-firms/`) returned:

- **Para 2.3** = "You remain accountable for compliance with the SRA's regulatory arrangements where your work is carried out through others, including your managers and those you employ or contract with." (The outsourcing-accountability provision — USED IN BRIEF.)
- **Para 2.5** = "You identify, monitor and manage all material risks to your business, including those which may arise from your connected practices." (Risk-management provision — NOT the outsourcing hook.)

The brief uses **para 2.3**. Conductor must confirm at Stage 1b, verify the exact paragraph text at sra.org.uk, and lock a new HP entry.

**NEW HP LOCK NEEDED:** SRA Code of Conduct for Firms para 2.3 — third-party / outsourcing accountability. Add to house_positions.md under §5 (or §1) as a new subsection. No HP entry currently exists for this provision.

**Status:** CLOSED 2026-07-09 Stage 1b: Code para 2.3 accountability locked in HP SS11 hooks (para 2.5 confirmed NOT the hook).

---

## F-A6-02 — HOUSE_POSITION_EXTENSION

**Pick:** A6 `outsourced-legal-cashiering-guide-uk-law-firms`
**Raised:** 2026-07-09 Stage 1
**Type:** HOUSE_POSITION_EXTENSION
**Priority:** MEDIUM (needed before Stage 2 copy is written)

**Issue:** VAT treatment of outsourced cashiering service fees. First-principles position (standard-rated 20% supply under VATA 1994) stated in brief §6.2 and marked "HP NOTE — VERIFY NEEDED". No specific HMRC manual page or HMRC guidance dedicated to cashiering-service VAT was retrieved in this session (multiple HMRC BIM/VAT manual WebFetch attempts returned 404 or index-only pages).

**Action at Stage 2:** WebFetch HMRC VAT Notice 700 or VATSC covering professional/management-service supply classification to confirm standard-rated treatment. If any exemption applies (unlikely), raise a further flag before writing.

**Status:** CLOSED 2026-07-09 Stage 1b: cashiering fees standard-rated on first principles; brief carries VERIFY-at-Stage-2 note; no HP lock needed beyond SS11/SS5.

---

## F-A8-01 — AUTHORITY_GAP

**Pick:** A8 `business-valuation-for-family-lawyers-uk`
**Raised:** 2026-07-09 Stage 1
**Type:** AUTHORITY_GAP
**Priority:** MEDIUM (valuation-fragility point supportable by judicial commentary without the specific case; citation adds authority)

**Issue:** Versteegh v Versteegh [2018] EWCA Civ 1050 could not be verified at BAILII (HTTP 403 on two attempts). The case is cited in practitioner materials as authority for judicial caution about treating an SJE business valuation as a precise figure in financial remedy proceedings. Stage 2 must re-source via Lexis, Westlaw or Family Law Week before citing. If unverifiable, the valuation-uncertainty argument should be stated without a specific citation or a verified alternative found.

**Status:** CLOSED 2026-07-09 Stage 1b: HP SS9.A mandates re-source before citing Versteegh; White v White is the verified substitute.

---

## F-A8-02 — AUTHORITY_GAP

**Pick:** A8 `business-valuation-for-family-lawyers-uk`
**Raised:** 2026-07-09 Stage 1
**Type:** AUTHORITY_GAP
**Priority:** LOW (White v White [2000] UKHL 54 is a clean verified substitute anchor for the sharing principle)

**Issue:** "Wells v Wells" as a sharing-principle authority is citation-ambiguous (multiple cases of that name). The sharing principle in financial remedies is more cleanly anchored to White v White [2000] UKHL 54 (House of Lords). Stage 2 should not cite Wells v Wells for the sharing principle without verifying which case is intended and what it actually decided on this point.

**Status:** CLOSED 2026-07-09 Stage 1b: White v White [2000] UKHL 54 locked as the sharing-principle cite in HP SS9.A.

---

## F-A8-03 — HOUSE_POSITION_EXTENSION

**Pick:** A8 `business-valuation-for-family-lawyers-uk`
**Raised:** 2026-07-09 Stage 1
**Type:** HOUSE_POSITION_EXTENSION
**Priority:** HIGH (new HP lock required before Stage 2 writes the CGT/tax section)

**Issue:** NEW HP LOCK NEEDED. TCGA 1992 s.58 as amended by Finance (No. 2) Act 2023 (effective 6 April 2023). The post-separation no-gain no-loss window was extended to the earlier of: (i) the last day of the third tax year after the tax year of separation, or (ii) the date of the divorce order. Verified at legislation.gov.uk 2026-07-09 (the amendment substituted s.58(1) with new ss.(1A)-(1D)). The current house_positions.md covers CGT only in the law-firm sale context (section 9); there is no matrimonial-proceedings CGT position. The A8 page requires this locked before Stage 2 writes the tax section.

**Action required at Stage 1b:** Conductor to add a new HP sub-section (suggested 9.A "CGT on matrimonial asset transfers" or new section 11) covering: (a) TCGA 1992 s.58 as amended by Finance (No. 2) Act 2023, effective 6 April 2023; (b) three-year post-separation window and divorce-order cut-off; (c) no-gain no-loss mechanism and base-cost carry-over for the transferee; (d) latent CGT risk for the transferee on a later disposal; (e) cross-reference to section 9 (standard CGT rates 18%/24% from 30 Oct 2024; BADR 18% from 6 Apr 2026). Commit as isolated HP commit before Stage 2 runs.

**Status:** CLOSED 2026-07-09 Stage 1b: locked as HP SS9.A (s.58(1A)-(1D) FA 2023 window).

---

## F-265 — HOUSE_POSITION_EXTENSION

**Pick:** A9 `accountant-for-barristers-chambers-uk`
**Raised:** 2026-07-09 Stage 2
**Type:** HOUSE_POSITION_EXTENSION
**Priority:** HIGH (un-hedge §12 of house_positions.md; correct the seed-brief no-supply framing)

**Issue:** The seed brief hedged the chambers-VAT position as potentially "no-supply" and directed Stage 2 to verify. Stage 2 WebFetch of HMRC VAT Notice 700/44 (gov.uk/guidance/vat-for-barristers-and-advocates-notice-70044) and VIT13850 (gov.uk/hmrc-internal-manuals/vat-input-tax/vit13850) resolves this definitively: chambers contributions ARE VAT supplies within the chambers arrangement. HMRC prescribes three accounting methods (Methods 1, 2, 3) for recovering input tax on shared chambers costs. There is no "no-supply" treatment.

**Conductor action:** Un-hedge house_positions §12 and add (or lock) the following position: "Chambers cost-sharing contributions are VAT supplies; HMRC VAT Notice 700/44 prescribes three input-tax accounting methods (Methods 1, 2, 3); the choice of method is chambers' own; all members' records must be available on HMRC visit to any one of them; Flat Rate Scheme barristers cannot claim input tax in the normal way. Primary source: VAT Notice 700/44 (gov.uk/guidance/vat-for-barristers-and-advocates-notice-70044) and VIT13850."

**Status:** CLOSED 2026-07-09 Stage 2b: conductor re-verified Notice 700/44 three methods at gov.uk; HP SS12 un-hedged.

---

## F-A5-1 — AUTHORITY_GAP

**Pick:** A5 `what-does-a-legal-cashier-do-sra-requirements`
**Raised:** 2026-07-09 Stage 2
**Type:** AUTHORITY_GAP
**Priority:** LOW (does not block the page; FAQ answer carries a write-time-fetch instruction)

**Issue:** The seed brief (§10) named "Diploma in Legal Practice Management" and "Certificate in Legal Cashiering" as ILFM qualifications. WebFetch of ilfm.org.uk at Stage 2 confirmed the site resolves and the ILFM Diploma is described as "the gold standard" credential, along with Legal Finance Compliance and Accounts Rules courses. The specific course names in the brief were not confirmed: the /qualifications/ path returned 404; only the homepage was accessible.

**Action at Stage 2 write time:** Fetch ilfm.org.uk/site/qualifications/ and confirm current qualification names before writing the §10 and FAQ Q9 ILFM paragraphs. If the page remains inaccessible, use "ILFM Diploma" as the confirmed credential and describe training generically.

**Status:** CLOSED 2026-07-09 Stage 2b: ILFM course names stay write-time-fetch for the writer (brief carries the instruction); no HP change needed.

---

## F-A4-2 — AUTHORITY_GAP

**Pick:** A4 `forensic-accounting-litigation-law-firms-uk`
**Raised:** 2026-07-09 Stage 2
**Type:** AUTHORITY_GAP
**Priority:** LOW (does not block the page; privilege point is stated without the case name)

**Issue:** Three Rivers District Council v Bank of England (No.6) [2004] UKHL 48 — the seed brief cited this as authority for litigation privilege protecting draft expert reports. BAILII (bailii.org/uk/cases/UKHL/2004/48.html) returned HTTP 403 Forbidden at Stage 2. The case cannot be cited in the published page without primary-source verification.

**Resolution applied:** The litigation-privilege principle is retained in the brief body (privilege protects draft reports prepared for the dominant purpose of litigation) but the case is not cited by name. Writers must not add [2004] UKHL 48 to the published page without first verifying it at Lexis, Westlaw, or another accessible source.

**Status:** CLOSED 2026-07-09 Stage 2b: Three Rivers dropped from brief (unverifiable at BAILII); page ships without it.


## F-335 — CROSS_BUCKET

**Pick:** A5 `what-does-a-legal-cashier-do-sra-requirements`
**Raised:** 2026-07-09 Stage 2 (write)
**Type:** CROSS_BUCKET
**Priority:** LOW (forward-link exists in the published page; existence of target page must be confirmed at WRAP)

**Issue:** The page (§ outsourced cashiering) contains a forward internal link to `outsourced-legal-cashiering-guide-uk-law-firms` (A6), which is a Wave 3 page not yet written. The link is correct per the collision-verify mandate and the brief; it will be a dead link until A6 is published.

**Action at WRAP:** Confirm A6 `outsourced-legal-cashiering-guide-uk-law-firms` has been committed and the slug is live before deploying Wave 3. If A6 is deferred, the forward-link sentence in A5 §11 should be held as a plain-text reference (no `<a>` tag) until A6 ships.

**Status:** CLOSED 2026-07-09 WRAP: A6 merged; forward link live.

---

## F-345 -- CROSS_BUCKET

**Pick:** A6 outsourced-legal-cashiering-guide-uk-law-firms
**Raised:** 2026-07-09 RUN write
**Type:** CROSS_BUCKET
**Priority:** LOW (wave-internal link in place; target page A5 must exist at deploy)

**Issue:** A6 contains a wave-internal link to A5 (what-does-a-legal-cashier-do-sra-requirements). The link is live in the published page body (companion guide introduction). At WRAP, confirm A5 is committed and the route /blog/sra-compliance-trust-accounting/what-does-a-legal-cashier-do-sra-requirements resolves before deploying A6.

**Status:** CLOSED 2026-07-09 WRAP: A5 merged; link live.

---

## F-346 -- INTERNAL_LINK

**Pick:** A6 outsourced-legal-cashiering-guide-uk-law-firms
**Raised:** 2026-07-09 RUN write
**Type:** INTERNAL_LINK
**Priority:** LOW (back-link opportunity; add at WRAP if target page is live)

**Issue:** The A6 page links outward to cofa-responsibilities-uk-law-firms and sra-client-account-reconciliation-frequency. Confirm these pages exist in the Solicitors corpus at WRAP; if not, remove or flag for future back-patch.

**Status:** CLOSED 2026-07-09 WRAP: both targets confirmed existing; route-aware audit clean.

## F-325 -- CROSS_BUCKET

**Pick:** A4 forensic-accounting-litigation-law-firms-uk
**Raised:** 2026-07-09 RUN phase
**Type:** CROSS_BUCKET
**Priority:** MEDIUM (blocks deploy of internal link, not content)

**Issue:** The body links to usiness-valuation-for-family-lawyers-uk (A8, wave-internal forward-link). A8 had not been written at time of A4 commit. The link is present in the page at the correct relative path /blog/practice-accounting/business-valuation-for-family-lawyers-uk.

**Action at WRAP:** Verify A8 exists and is deployed before deploying A4. If A8 is delayed, temporarily remove or nofollow the forward-link and restore at A8 deploy.

---

## F-355 — CROSS_BUCKET

**Pick:** A8 `business-valuation-for-family-lawyers-uk`
**Raised:** 2026-07-09 Wave 3 RUN
**Type:** CROSS_BUCKET
**Priority:** LOW (back-link only; A4 already live)

**Issue:** A8 links to `forensic-accounting-litigation-law-firms-uk` (A4) as a wave-internal pair link. A4 was committed in this wave (commit b4e52c70 per tracker). WRAP must verify that A4's live content includes a reciprocal link back to A8. If the A4 page predates this flag and does not reference A8, add a back-link sentence in the "related guides" or cross-link section of A4 at WRAP.

**Status:** CLOSED 2026-07-09 WRAP: reciprocal A4<->A8 links confirmed in both pages.


## F-315 — AUTHORITY_GAP

**Pick:** A3 `law-firm-financial-distress-restructuring-uk`
**Raised:** 2026-07-09 Stage 2 (write)
**Type:** AUTHORITY_GAP
**Priority:** LOW (does not block page; intervention mechanics section is clearly hedged as statutory-only)

**Issue:** All SRA consumer-facing intervention guidance URLs returned HTTP 404 at write time (2026-07-09):
- sra.org.uk/consumers/firms/firm-closed/ — 404
- sra.org.uk/consumers/get-help/firm-closed/ — 404
(plus four additional URLs tested at brief Stage 1b and Stage 2)

The published page describes SRA intervention mechanics from Solicitors Act 1974 Schedule 1 Part II (paras 5 to 7, 6A, 9, 10) only, with a clear source statement. Procedural detail (agent appointment, client notification timelines, costs-recovery mechanism) is not stated beyond the statutory text.

**Action at WRAP:** Conductor to attempt sra.org.uk/solicitors/firm-based-authorisation/interventions/ and sra.org.uk search for current intervention guidance. If accessible, compare the procedural layer against the page's hedged text and raise a back-patch if any statutory statement is contradicted.

**Status:** CLOSED 2026-07-09 WRAP: intervention section is statute-only with explicit sourcing note; acceptable to ship.


## F-365 — RESIDUAL_VERIFY (A9 accountant-for-barristers-chambers-uk)

**Page:** accountant-for-barristers-chambers-uk
**Issue:** BMIF VAT status not confirmed at primary source. The BMIF premium is confirmed as income-tax deductible (ITTOIA 2005 s.34, wholly and exclusively). Whether the BMIF mutual premium carries VAT or is exempt as an insurance/financial supply was not verified at primary source during Stage 2. The page does not state the VAT status of the BMIF premium (only the income tax deductibility). No correction required unless a future VAT-specific barrister page needs to address this.
**Action at WRAP:** Conductor may wish to verify BMIF VAT status at primary source (BMIF website or HMRC manual) if a dedicated VAT-of-BMIF question arises on any future page. Not a blocker for this page.
**Status:** CLOSED 2026-07-09 WRAP: BMIF VAT not asserted on page (QA-verified); residual stays a note in the brief only.


## F-305 — INTERNAL_LINK

**Pick:** A2 `finance-training-fee-earners-law-firm-uk`
**Raised:** 2026-07-09 RUN write
**Type:** INTERNAL_LINK
**Priority:** LOW (all target pages confirmed in corpus; verify category-slug routing at deploy)

**Issue:** Page links to eight sibling pages. Category slugs verified from canonical URLs at write time: how-to-set-fee-earner-targets (practice-accounting), billing-discipline-end-of-quarter (practice-accounting), uk-law-firm-management-accounts-monthly (practice-accounting), law-firm-lock-up-reduction (practice-finance-cash-flow), cofa-responsibilities-uk-law-firms (compliance-and-risk-colp-cofa), cofa-monthly-checklist-uk-law-firms (compliance-and-risk-colp-cofa), partner-profit-allocation-uk-law-firms (partnership-llp-accounting), law-firm-benchmarking-uk (practice-finance-cash-flow). All confirmed present in Solicitors/web/content/blog/ at commit time.

**Action at WRAP:** Confirm all 8 target slugs resolve in the deployed site before going live.

**Status:** CLOSED 2026-07-09 WRAP: all 8 internal targets verified by route-aware link audit (0 HARD 404).

## F-ESTATE-1 | EXISTING_PAGE_STALE (estate-wide) | canonical-field vs route mismatch

**Raised by:** conductor at Wave 3 QA adjudication, 2026-07-09.
**Issue:** Several LEGACY solicitors pages carry frontmatter `canonical` URLs whose category segment does not match the actual route produced by slugifyCategory (e.g. cofa-responsibilities-uk-law-firms canonical says `compliance-and-risk-colp-cofa`, route is `compliance-risk-colp-cofa`; how-to-value-a-uk-law-firm-2026 canonical says `practice-sale-and-succession`, route is `practice-succession-sale`). Wrong canonicals point search engines at non-existent URLs. NOT introduced by this wave; wave links follow the true routes.
**Action:** mechanical estate sweep (canonical = slugifyCategory(category)) as a separate maintenance batch; check dentists/other sites for the same pattern.
**Status:** OPEN (backlog; not blocking Wave 3 deploy)
