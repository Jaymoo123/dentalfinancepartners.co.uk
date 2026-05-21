# Medical site — house positions

Locked by the manager (orchestrator session) on 2026-05-21 before sessions A/B/C launch. These are the positions every rewrite must use. Avoids the inter-session disagreement we hit on Property's 22/42/47% question.

These are deliberate, defensible positions. If you (Session A/B/C) hit a factual issue with one of them while rewriting, **append a flag** to `docs/medical_site_wide_flags.md` with the contradicting source. Do not unilaterally re-frame; the orchestrator will reconcile.

---

## 1. Locum doctor IR35 / off-payroll working (post-April-2024)

**House position:** The off-payroll working rules (IR35) apply to locum doctor engagements where the locum supplies their services through an intermediary (typically a personal service company) to a public-sector or medium/large private-sector hirer. From 6 April 2017 for public-sector hirers (which covers NHS Trusts) and from 6 April 2021 for medium/large private-sector hirers, the hirer is responsible for determining IR35 status and the fee-payer is responsible for deducting PAYE/NICs where status is "inside IR35".

**The April 2024 change**: the off-payroll working rules were amended so that HMRC can offset taxes the worker and intermediary have already paid against the deemed employer's PAYE liability — preventing double taxation that previously made compliance settlements punitive. This does NOT change who decides status, who pays, or which engagements are caught.

**For locum doctors:**
- A locum working PSC → NHS Trust: NHS Trust determines status. Where inside IR35, the agency or NHS Trust deducts tax before paying the PSC. The locum's PSC receives net of PAYE/NICs.
- A locum working PSC → small private practice (a "small company" under Companies Act 2006 thresholds): the OLD rules apply — the locum's PSC is responsible for determining status.
- A locum working PSC → agency → NHS Trust: the chain is treated as off-payroll; the agency is usually the fee-payer.
- A locum working as a sole trader (no PSC): IR35 does not apply (no intermediary). HMRC may still challenge employment status, but the route is "employed-vs-self-employed", not IR35.

**Umbrella companies and the 2026 reforms:** The Finance Act 2024 announced umbrella company regulation reforms, with HMRC taking joint and several liability for unpaid PAYE from non-compliant umbrellas (consultation closed 2024; legislation expected in Finance Act 2025/2026). Frame as "the regulatory direction is towards holding umbrellas and the labour-supply chain accountable" without specifying enacted dates that aren't in primary legislation yet.

**Do not write:** "IR35 was abolished", "IR35 doesn't apply to NHS work", "the off-payroll rules were repealed". These are wrong.

---

## 2. NHS pension — annual allowance, scheme pays, tapered allowance

**House position 2026/27 figures:**
- Standard annual allowance: **£60,000** (unchanged from 2023/24).
- Tapered annual allowance: applies where adjusted income exceeds **£260,000** AND threshold income exceeds **£200,000**. AA tapers by £1 for every £2 of adjusted income above £260,000, with a floor at **£10,000** (so AA floor remains £10,000 — restored from the £4,000 floor that applied 2020/21–2022/23).
- Money Purchase Annual Allowance (MPAA): **£10,000** (raised from £4,000 in April 2023).
- Lifetime allowance (LTA): **abolished from 6 April 2024**. Replaced by:
  - Lump Sum Allowance (LSA): **£268,275** lifetime cap on tax-free lump sum
  - Lump Sum and Death Benefit Allowance (LSDBA): **£1,073,100**

**Scheme Pays for NHS Pension:**
- Mandatory Scheme Pays: available when the AA charge exceeds £2,000 AND the pension input amount in the NHS scheme alone exceeds the standard AA. Election deadline: 31 July of the year following the year the AA charge crystallised (eg. an AA charge for 2025/26 must elect Scheme Pays by 31 July 2027).
- Voluntary Scheme Pays: NHS scheme allows voluntary Scheme Pays for charges that don't meet the mandatory test. Election deadline differs by scheme section.

**McCloud (Public Service Pensions Remedy):** Pensionable service from 1 April 2015 to 31 March 2022 is treated as having been in the pre-2015 (1995 or 2008 section) scheme by default, with the member able to elect at retirement to have that service treated as 2015 scheme service if it produces a better outcome. Pension savings statements for the remedy period (PSS2 statements) have been issued. AA charges already paid in respect of remedy-period service can be rolled into the at-retirement reconciliation. Frame as: "members had/have until 31 January 2027 to submit any Digital Remedy Service related claim to HMRC for compensation of overpaid tax."

**Do not write:** "Lifetime allowance is £1,073,100", "annual allowance is £40,000", "tapered AA floor is £4,000". These are out of date.

---

## 3. Making Tax Digital for ITSA — applicability to medical professionals

**House position:**
- MTD for ITSA went live on **6 April 2026** for sole-trader landlords and self-employed individuals (including sole-trader locum doctors) with **qualifying income above £50,000**.
- Threshold drops to **£30,000 from 6 April 2027** and **£20,000 from 6 April 2028**.
- **Limited companies are outside MTD for ITSA entirely.** A locum trading through a PSC is NOT in MTD for ITSA. They file annual CT600 corporation tax returns.
- **General partnerships are deferred.** Partnerships with all-individual members were originally expected to join in April 2027; the latest HMRC roadmap defers to a date to be confirmed. Treat as "MTD for partnerships expected in a later phase, no confirmed date as of May 2026."
- **GP partnerships:** A GP practice operating as a general partnership is a partnership for tax purposes. Partners receive a partnership tax return (SA800) statement of their share, then enter it on their personal SA100. Partnership-level MTD is deferred (see above); the personal SA100 still flows through MTD-for-ITSA where the partner's other qualifying income (eg private practice as a sole trader) exceeds the threshold.
- **Salaried GPs (employees of the practice via PAYE)** are not in MTD for ITSA from their employment income. Private earnings on top (locum days, expert witness, media) bring them in if those exceed the threshold.

**Do not write:** "MTD for ITSA threshold is £10,000". "MTD applies to limited companies." "MTD applies to GP partners from April 2026."

---

## 4. GP partner vs salaried GP vs locum — income tax framing

**House position:**
- **GP partner:** self-employed for tax purposes. Profits flow through partnership SA800 → personal SA105 (other partnership pages) → SA100. NIC class 4 + class 2 (where applicable, though class 2 was effectively abolished for the self-employed earning above the small profits threshold from 6 April 2024 — the "class 2 voluntary" route remains for those below the threshold or wishing to maintain state pension contributions).
- **Salaried GP:** employed by the practice via PAYE. Income tax + class 1 employee NICs deducted at source. Subject to NHS Pension scheme (1995, 2008 or 2015 section as appropriate).
- **Locum (sole trader, no PSC):** self-employed. SA103 self-employment pages. Income tax + class 4 NICs.
- **Locum (PSC):** see Section 1. Inside-IR35 engagements → caught by off-payroll, fee-payer deducts. Outside-IR35 → PSC pays corporation tax, locum extracts via salary + dividend.

**On the 2027 income tax rate question:** there is **no medical-specific separate income tax rate change** announced for April 2027 (unlike Property where a 2% surcharge on rental income was announced). For 2026/27 and 2027/28 (until/unless a Finance Act provides otherwise), use the standard UK income tax rates: 0/20/40/45% with the personal allowance taper at £100k–£125,140.

---

## 5. NHS Pension — McCloud and the "Digital Remedy Service"

**House position:** The Public Service Pensions Remedy (McCloud) has applied to NHS Pension members since the legislation completed in 2022. Members with service in the remedy period (1 April 2015 to 31 March 2022) had:
- Service rolled back to the pre-2015 (1995/2008) section by default on 1 October 2023.
- At retirement, an election option to take that service as 2015 scheme service if it gives a better outcome.
- A Digital Remedy Service launched by NHS Pensions during 2024 to allow members to access their remediable service statements and submit relevant tax claims through HMRC.

Frame all McCloud guidance as **mandatory remedy is complete; the in-retirement election and any HMRC reconciliation are the live elements**. Do not write "McCloud is upcoming" or "the remedy will apply from April 2026" — both wrong.

---

## 6. GP partnership profit sharing and goodwill

**House position:**
- GP partnership profits are allocated per the partnership deed (which may differ from equity / capital shares). Profit allocation can include "prior shares" (eg. dispensing fees, premises ownership return) before the residual is split.
- **Goodwill in NHS GMS / PMS practices:** sale of NHS goodwill has been **prohibited since 1 April 2004** under the Primary Care Trusts (NHS) regulations and the corresponding 2004 GMS contract. Existing partners can buy and sell shares in the partnership and in physical practice assets, but cannot sell NHS goodwill. Private practice goodwill remains transferable.
- **Premises**: many practices own their premises through a separate partnership or LLP outside the GP partnership itself. Notional rent / cost rent / improvement grant treatment varies; treat as a specialist area requiring practice-specific advice.

---

## 7. Things to flag (do NOT decide unilaterally)

If you find any of the following while writing, **append to `docs/medical_site_wide_flags.md`** and continue:
- Pages that recommend tax planning specific to a named NHS Trust or a specific umbrella company by name (we have not verified those organisations).
- Pages that cite specific £ figures for "average locum daily rate" or "typical GP partner profit share" that imply we have proprietary data we don't have.
- Pages that recommend a specific accounting software product by name without disclosure (we are an accounting firm, not a software reseller, and product recommendations are a separate decision).
- Pages where the slug itself contains an out-of-date figure (eg. an LTA-referenced slug).
- Cannibalisation between two pages on the same topic where neither has a clearly stronger differentiation.

---

## 8. Universal "no" list (apply on every page)

- No em-dashes anywhere (commas, parentheses, full stops, middle dots).
- No "£10,000 MTD threshold" (it's £50k from 6 Apr 2026).
- No lifetime allowance £1,073,100 (abolished from 6 Apr 2024; use LSA £268,275 / LSDBA £1,073,100 as the replacement framework).
- No "Class 2 NIC mandatory" for self-employed above the small profits threshold (effectively abolished from 6 Apr 2024).
- No "IR35 has been abolished" or "off-payroll repealed" — wrong.
- No "McCloud remedy is coming" — it's already in force.
- No real client names. Anonymised personas only.

---

This file is **read once at the start of each session** and then referenced as a tie-breaker. If a competitor page contradicts a house position, the house position wins — the competitor is wrong (or out of date) and you should not transcribe their figure into ours.
