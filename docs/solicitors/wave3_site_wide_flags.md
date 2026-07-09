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
