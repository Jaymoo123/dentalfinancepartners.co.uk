# Wave 5 F-9 Calendar-Quarter Deadline Verification

**Date:** 2026-05-23
**Page:** `Property/web/content/blog/mtd-quarterly-reporting-landlords-step-by-step-guide.md`
**Flag origin:** NETNEW_PROGRAM §3 inter-wave queue item 3
**Outcome:** **STALE — patched.**

---

## 1. Gov.uk source verification

### Primary source: gov.uk MTD ITSA guidance
**URL:** https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax/send-quarterly-updates

Verbatim extract (via WebFetch):

> "If your accounting period aligns with the tax year (6 April to 5 April), you should use standard update periods."
>
> Standard tax-year deadlines:
> - 6 April to 5 July → 7 August
> - 6 April to 5 October → 7 November
> - 6 April to 5 January → 7 February
> - 6 April to 5 April → 7 May (following tax year)
>
> "If your accounting period covers 1 April to 31 March, you should consider using calendar update periods."
>
> Calendar update period deadlines:
> - 1 April to 30 June → 7 August
> - 1 April to 30 September → 7 November
> - 1 April to 31 December → 7 February
> - 1 April to 31 March → 7 May (following tax year)
>
> "You cannot change the update periods you're using for a tax year after you have sent a quarterly update."

### Secondary source: Statutory Instrument
**URL:** https://www.legislation.gov.uk/uksi/2026/336/made — *The Income Tax (Digital Obligations) Regulations 2026*

Regulation 11(1) (verbatim):

> "A relevant person may make an election under this paragraph ('a calendar quarters election') in relation to a digital obligation tax year, by giving notice to HMRC before the person has given a quarterly update to HMRC in relation to that tax year."

Regulation 13 fixes the calendar-quarter submission deadlines at:
- Q1 (ends 30 June) — 7 August
- Q2 (ends 30 September) — 7 November
- Q3 (ends 31 December) — 7 February
- Q4 (ends 31 March) — 7 May (following tax year)

### Key finding
The default tax-year quarter deadlines and the calendar-quarter election deadlines are **identical**: 7 August / 7 November / 7 February / 7 May. The election changes the *period basis* (calendar-aligned month ends instead of 5th-of-month tax-year ends), not the deadline cadence.

---

## 2. Stale-content occurrences in the page

The page (`Property/web/content/blog/mtd-quarterly-reporting-landlords-step-by-step-guide.md`) contained one block citing the wrong deadlines for the calendar-quarter alternative:

- **Lines 51-59** (pre-patch), section heading `<h3>Alternative Quarterly Periods</h3>`:
  - Q1 (Jan-Mar): Submit by 30 April  ← **STALE**
  - Q2 (Apr-Jun): Submit by 31 July  ← **STALE**
  - Q3 (Jul-Sep): Submit by 31 October  ← **STALE**
  - Q4 (Oct-Dec): Submit by 31 January  ← **STALE**

These dates do not match either the statutory tax-year deadlines or the calendar-quarter election deadlines under SI 2026/336. They appear to be a "one month after quarter-end" pattern that has no basis in the MTD ITSA regulations.

The page's other deadline citations (lines 17, 36, 49, 100) already correctly use 7 August / 7 November / 7 February / 7 May for standard tax-year quarters — those did NOT need patching.

---

## 3. Patch applied

Single Edit call replaced lines 51-59 with a corrected block that:
1. Renames the heading to `Alternative Quarterly Periods (Calendar-Quarter Election)` for clarity.
2. Explains the calendar-quarters election rule per regulation 11 of SI 2026/336 (election must precede the first quarterly update; cannot be changed mid-year).
3. Lists the correct period-end → deadline mapping (1 Apr-30 Jun → 7 Aug; etc.).
4. Cross-links to both the gov.uk guidance and the SI 2026/336 legislation.
5. Removes the false implication that calendar-quarter election has a *different* deadline schedule from the tax-year default.

Patch count: **1 Edit call, 1 occurrence patched.**

---

## 4. Outcome

**Outcome:** Stale "30 April / 31 July / 31 October / 31 January" calendar-quarter deadlines patched to the correct 7 August / 7 November / 7 February / 7 May per gov.uk and SI 2026/336, with election rule context and source links added.
