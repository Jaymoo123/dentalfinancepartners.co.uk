# MegaWave 1 site-wide flags

**Created:** 2026-05-25. **Status:** Pre-launch (no flags yet).

Flag types per NETNEW_PROGRAM §13.2: EXISTING_PAGE_STALE / BRIEF_DRIFT / INTERNAL_LINK / CROSS_BUCKET / REDIRECT / HOUSE_POSITION_EXTENSION / AUTHORITY_GAP.

Per-bucket F-number ranges (Bug #2 fix):
- Bucket A: F-1..F-49
- Bucket B: F-50..F-99
- Bucket C: F-100..F-149

Flags never block. Sessions continue work after flagging.

---

(Sessions append flags below this line. Manager closes via in-place edit + commit at wave-close step.)

---

## [F-1] BRIEF_DRIFT — A1 mis-states Scottish LBTT MDR position

**Raised by:** MW1 Bucket A batch M1-A-B4 (Stage 1 sub-agent), 2026-05-26.
**Type:** BRIEF_DRIFT (with HOUSE_POSITION_EXTENSION component).
**Affected brief:** `briefs/property/megawave1/abolishment-of-multiple-dwelling-relief.md` (A1 seed).

**Drift:** A1's "Framing differentiator" Q5 + "Key questions" Q5 contain the statement:

> "Scotland never had an MDR equivalent — LBTT has its own Additional Dwelling Supplement regime."

This is **incorrect**. Scotland has had LBTT Multiple Dwellings Relief since the LBTT(S)A 2013 came into force on 1 April 2015. The relief sits at Schedule 5 of LBTT(S)A 2013 (verified verbatim at https://www.legislation.gov.uk/asp/2013/11/schedule/5 on 2026-05-26 — title "Multiple dwellings relief", paragraphs 1-7 in the consolidated text covering overview, the rule, in-scope transaction tests, excluded transactions, and consideration attribution). The Scottish Additional Dwelling Supplement (Schedule 2A LBTT(S)A 2013) is a **separate** supplemental tax on additional dwellings — it is NOT a substitute for or equivalent of MDR; the two operate in parallel.

LBTT MDR was NOT abolished alongside the SDLT abolition by FA(No.2) 2024 s.7. The Scottish Parliament has not legislated an MDR repeal at the time of this seed-write. LBTT MDR therefore remains operative for current Scottish acquisitions.

**Back-patch required at Stage 1b or Stage 2:** A1's Q5 wording should be corrected to read approximately: "Does this affect Welsh or Scottish purchases? No — SDLT only. Welsh LTT MDR survives under LTTA 2017 Sch 13. Scottish LBTT MDR survives under LBTT(S)A 2013 Sch 5 — the Scottish Parliament has not legislated an MDR repeal at the time of writing. Cross-link to the Welsh-survives page and to A19 (`land-and-buildings-transaction-tax-multiple-dwellings-relief`) for the Scottish-survives mechanics." The Framing differentiator paragraph should be aligned accordingly.

**Companion HP-extension need:** the SDLT-architecture house position (§1 main text) does not currently anchor the devolved-tax position. A new HP sub-section or a new §X devoted to "Devolved property taxes — LTT (Wales) Sch 13 LTTA 2017 + LBTT (Scotland) Sch 5 LBTT(S)A 2013" is required to give A19, A20, the existing Welsh-survives page, and any future LBTT-cluster pages a shared anchor. Stage 1b conductor to decide whether a single devolved-taxes block spans both jurisdictions or whether each jurisdiction gets its own sub-section. Flagging as HOUSE_POSITION_EXTENSION component of this flag.

**No-block discipline:** A19 was committed with the correct LBTT MDR statutory position (Sch 5 LBTT(S)A 2013) and an explicit drift watchpoint at the bottom of its Stage 2 research target list. A1's Stage 2 expansion / back-patch must close the drift before the page is published.

---
