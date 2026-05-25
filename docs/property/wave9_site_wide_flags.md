# Wave 9 site-wide flags

**Created:** 2026-05-25. **Status:** Pre-launch (no flags yet).

Sessions raise flags here when they surface site-wide issues during their work — existing-page stale figures, brief drift catches, cross-bucket forward-link needs, house-position extensions, etc. Flags do NOT block; sessions continue work after flagging.

**Discipline reminder (§16.15, §16.37):** session-time flag edits go to THIS file in main via absolute path `C:/Users/user/Documents/Accounting/docs/property/wave9_site_wide_flags.md`. NEVER commit flag edits on a worktree branch.

Flag types per NETNEW_PROGRAM §13.2:
- EXISTING_PAGE_STALE — existing page with stale figures/framing (logs to discovery too)
- BRIEF_DRIFT — Stage 1a / Stage 2 brief contains a statutory or factual error caught at write time per §16.35 / §16.36
- INTERNAL_LINK — existing page should back-link to new Wave 9 page
- CROSS_BUCKET — forward-link from your bucket to another's pages (hyperlinks needing back-patch at wave merge per §16.32)
- REDIRECT — legacy slug should repoint to your new page
- HOUSE_POSITION_EXTENSION — house position needs new sub-section or clarification (manager closes)
- AUTHORITY_GAP — HMRC manual / legislation page never cited on our site, manager should consider adding

Flags never block. Sessions continue work after flagging.

---

(Sessions append flags below this line. Manager closes via in-place edit + commit at wave-close step 4.)

---

## F-1 — HOUSE_POSITION_EXTENSION — HP §1.G needed for SDLT MDR abolition (A1)

**Raised:** 2026-05-25, Stage 1a seed, Session A (Bucket A, pick A1).
**Status:** CLOSED 2026-05-25 by manager via HP mini-lock commits (see HP file edit history).

**Issue:** HP §1 main text covers MDR abolition in a single line ("Multiple Dwellings Relief (MDR) abolished for transactions with an effective date on or after 1 June 2024 (Finance (No.2) Act 2024). Anti-forestalling rules prevent late claims via sub-sale or option arrangements."). There is no dedicated sub-section covering:
- Exact F(No.2)A 2024 section reference for the abolition.
- Anti-forestalling commencement provisions (contract-date cut-off + substantial-performance carve-out architecture).
- Transitional cohort identification mechanics (effective date per FA 2003 s.119 vs contract date vs Budget Day cut-off).
- The surviving alternatives architecture (s.116(7) auto-non-residential, Sch 15 SLP partnership, s.45 sub-sale) framed as a decision matrix.

**Recommended:** new HP sub-section §1.G "MDR abolition + transitional + anti-forestalling — F(No.2)A 2024 (Wave 9 extension)" parallel to §1.A-§1.F Wave 7 extensions. A1 brief uses HP §1 main text + §1.A + §1.B + brief's statutory anchors as working set pending HP §1.G lock.

**Statutory verification still required at HP-lock:** F(No.2)A 2024 section reference for MDR abolition; F(No.2)A 2024 anti-forestalling commencement provisions; FA 2003 s.119 effective-date definition consolidated text; HMRC SDLTM29900+ current state (post-abolition update).

---

## F-2 — HOUSE_POSITION_EXTENSION — HP §1.H needed for SDLT 5% surcharge refund + 3-year replacement-window architecture (A2)

**Raised:** 2026-05-25, Stage 1a seed, Session A (Bucket A, pick A2).
**Status:** CLOSED 2026-05-25 by manager via HP mini-lock commits (see HP file edit history).

**Issue:** HP §1 main text covers the 5% rate change effective 31 October 2024 (Autumn Budget 2024 / F(No.2)A 2024) but has NO sub-section on:
- FA 2003 Sch 4ZA refund mechanics (paras 8, 9).
- 3-year replacement-window architecture (Sch 4ZA para 3(7) Condition C).
- Spousal / civil-partner aggregation on the DISPOSAL side (Sch 4ZA paras 9, 10, 11). HP §1.D Wave 7 lock covers Sch 3 para 3 dissolution-related exemption — adjacent but architecturally separate doctrine (sessions must not conflate).
- Refund claim window interaction with FA 2003 s.80 amendment time-limit (12 months from disposal of old main residence OR 12 months from filing date of original return, whichever is later).
- Sale-delay scenario architecture (chain-break, probate, divorce, repossession routes).

**Recommended:** new HP sub-section §1.H "Additional dwellings surcharge — Sch 4ZA refund + 3-year replacement architecture (Wave 9 extension)". Adjacent to §1.D but separately anchored — Sch 3 para 3 (divorce exemption) is a different mechanism from Sch 4ZA para 3(7) (replacement-of-main-residence refund).

**Statutory verification still required at HP-lock:** FA 2003 Sch 4ZA paras 3(7), 8, 9, 10, 11 current consolidated text (verify the 3-year window — historically 18 months, extended at some point); F(No.2)A 2024 section reference for the 3%-to-5% rate change; HMRC SDLTM09730+ + SDLTM09812+ current state.

---

## F-3 — HOUSE_POSITION_EXTENSION — HP §1.I needed for SDLT mixed-use rate line + Hyman/Suterwalla/Hortons Hall case-law trilogy (A3)

**Raised:** 2026-05-25, Stage 1a seed, Session A (Bucket A, pick A3).
**Status:** CLOSED 2026-05-25 by manager via HP mini-lock commits (see HP file edit history).

**Issue:** HP §1.C (Wave 7 lock) covers Bewley uninhabitable-property test under FA 2003 s.116(1)(a) "suitable for use" limb — separate doctrine. HP has NO sub-section on the s.116(1)(b) "grounds and gardens" limb decided by the Hyman / Suterwalla / Hortons Hall trilogy:
- Hyman v HMRC [2019] UKFTT 469 + [2021] UKUT 68 + [2022] EWCA Civ 185 — paddock / meadow / barn = residential because they form part of the dwelling's grounds. Court of Appeal binding authority.
- Suterwalla v HMRC [2024] UKFTT — TAXPAYER WIN; separate grazing licence to neighbouring farmer displaced grounds-classification.
- Hortons Hall — TAXPAYER LOSS; claimed mixed-use failed on grounds-classification.
- FA 2003 Sch 4ZA para 18 mixed-use additional-dwellings surcharge exemption (exact paragraph reference to be verified at HP-lock).
- HMRC enquiry-pattern realism — most buyer mixed-use claims post-Hyman are challenged successfully.

**Risk if not added:** sessions writing on the mixed-use line are at risk of conflating s.116(1)(a) Bewley (substantially dangerous / contaminated → non-residential) with s.116(1)(b) grounds-and-gardens (the trilogy territory). The two doctrines have different operational tests and different defensive-evidence requirements. F-3 anchors the trilogy separately.

**Recommended:** new HP sub-section §1.I "Mixed-use SDLT rate line — s.116(1)(b) grounds-and-gardens case-law trilogy (Wave 9 extension)". Adjacent to §1.C (Bewley) with an explicit non-conflation note. A3 brief uses HP §1 + §1.C (with disciplined separation) + brief's statutory anchors as working set pending HP §1.I lock.

**Statutory + case-law verification still required at HP-lock:** Hyman FTT / UT / CA citations + ratios; Suterwalla FTT citation + ratio; Hortons Hall FTT citation + ratio; FA 2003 s.116(1)(b) consolidated text; FA 2003 Sch 4ZA para 18 surcharge-exemption paragraph number; HMRC SDLTM00400+ + SDLTM30200+ current state. Also surface the post-Hyman line of supporting cases (Withers, The How Development) for citation balance.

---

## F-10 — HOUSE_POSITION_EXTENSION — HP §11.A needed for ECCTA / RoE statutory-section depth (B1 + B2 + B3 all affected)

**Raised:** 2026-05-25, Stage 1a seed, Session B (Bucket B, all 3 picks B1 + B2 + B3).
**Status:** CLOSED 2026-05-25 by manager via HP §11.A mini-lock (commit 9285495). Stage 1b corrections: sub-agent flag mis-attributed ECCTA "Chapter 1/2/4" structure (actually 23 sections in crossheadings) + claimed Sch 12 amends ECTEA (actually Sch 12 is criminal-liability-of-bodies) — both fixed in lock.

**Issue:** §11 of `house_positions.md` (Companies House reforms / ECCTA / Register of Overseas Entities) is a high-level locked timeline of ~7 bullet lines. It locks the headline framings (ID verification voluntary 8 April 2025 → mandatory autumn 2025 / 2026; ACSP registration concept; RoE in force 1 August 2022; annual update within 14 days of anniversary; £2,500 + £500/day penalty). That depth was sufficient when no wave wrote into the territory. Wave 9 Bucket B writes 3 pages directly into the territory; Stage 2 + session writing would benefit from a §11.A Wave 9 mini-lock that anchors verbatim statutory section ranges + the operative ECCTA Part 1 Chapter 1 / Chapter 2 / Chapter 4 architecture + ECTEA 2022 Part 1 + ECCTA Sch 12 amendments.

**Specifics the mini-lock should anchor (per §16.36 brief-citation cross-check pattern — Stage 2 needs verified anchors to write against):**
- ECCTA 2023 Part 1 Chapter 1 verbatim section range for ID verification (inserted CA 2006 Part 11A / new sections).
- ECCTA 2023 Part 1 Chapter 2 verbatim section range amending CA 2006 s.853A / s.86 / inserting registered-email + lawful-purpose provisions (B3 seed cites "s.88A" for registered email as illustrative pending verification).
- ECCTA 2023 Part 1 Chapter 4 verbatim section range tightening the PSC framework.
- ECTEA 2022 c. 10 s.7 / s.8 / s.9 / s.34 / s.36 verbatim (RoE registration + annual update + verification + offences).
- ECCTA 2023 Sch 12 paragraph range amending ECTEA 2022 (in force 1 March 2024).
- Authorised Corporate Service Provider (ACSP) inserted-CA-2006-section range + the AML supervision touchpoint.
- LRA 2002 Sch 4A operational language (HMLR disposition-block for non-compliant overseas entities) + Scottish + NI equivalents.
- Operative commencement chain (Commencement No. 1 / No. 2 / No. 3 Regulations 2024 — SI numbers + effect-from dates) + the gov.uk Companies House campaign page as canonical write-time-verification anchor (§16.27 rate-by-reference + phased-commencement-by-reference discipline).
- Do-not-write list for ECCTA territory:
  - "ID verification is voluntary" (false if mandatory by write date — verify operative state)
  - "Registered email is published on the public register" (false — CH-to-company correspondence only)
  - "Appropriate address rule allows PO boxes" (false post-4-March-2024)
  - "RoE applies only to new acquisitions" (already in §11; carry forward)
  - "s.267 deemed domicile applies to overseas entities" (wrong regime — that's IHTA 1984 / FA 2025 territory, not RoE)
  - "Annual update is due on calendar-year anniversary" (false — update period is anchored to registration date)
  - "Each SPV needs separate ID verification" (false — one natural-person verification covers all directorships)

**Recommended:** lock §11.A between Stage 1 (now) and Stage 2 dispatch. Pattern is the same as Wave 7 mini-locks (§1.G SDLT group relief, §22.21 SIPP/SSAS taxable property) and Wave 8 mini-locks (§21.A CT three-figure framework, §22.X IHT LTR depth). Without it, the Stage 2 Bucket B sub-agent has to discover the section-range anchors itself, which is exactly the pattern §16.38 / §16.40 caught as drift-prone for ECCTA-adjacent territory (recent statute, phased commencement, multiple amending instruments).

**If manager defers:** Stage 2 sub-agent prompt for Bucket B must explicitly include "WebFetch every ECCTA / ECTEA / inserted-CA-2006 section against legislation.gov.uk verbatim before authoring framing differentiator; flag any section that does not match the seed's candidate citation" — i.e. carry the §16.36 gate forward to Stage 2 without the upstream HP-lock support. Seed briefs B1 / B2 / B3 already flag candidate citations as illustrative-pending-verification rather than locked (e.g. B3 "s.88A registered email — Stage 2 verifies actual section number"), so deferring is workable but adds Stage 2 drift-catch risk relative to the locked-upstream pattern.

**Phased-commencement special-case discipline (§16.27 / §16.35 extension):** ECCTA Part 1 Chapter 1 ID verification rolled out via Commencement Regulations during 2025-2026; the operative state can shift between Stage 2 brief-finalisation and session write time. Every Bucket B brief seed marks write-time commencement-state WebFetch as mandatory; the HP-lock (if performed) should encode this as a do-not-cache-state discipline rather than locking a specific commencement-state line that may drift between waves.

---

