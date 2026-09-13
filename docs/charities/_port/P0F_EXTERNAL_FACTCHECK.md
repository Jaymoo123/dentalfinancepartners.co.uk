# P0F — External fact-check against primary UK sources

Date: 2026-09-13. Report only. No site file or `house_positions.md` was edited.
Scope: four blocking factual questions for the `charities` site content-integrity fix.
Sources used: legislation.gov.uk, gov.uk (Charity Commission / HMRC), OSCR.

---

## Q1. England & Wales — independent examination band and audit triggers

**ANSWER.** The site's sentence is wrong in two ways. The independent examination
band starts at gross income **over £25,000**, not at £25,000 and not "between
£25,000 and £1m" as a single rule, and the audit trigger is **not** a single £1m
income gate. Statutory audit is required if **either**:

- (a) gross income in the year exceeds **£1 million**, **or**
- (b) gross income exceeds the **accounts threshold (£250,000**, the sum specified
  in s133) **and** gross assets before deduction of liabilities exceed
  **£3.26 million**.

So a charity with £400,000 income and £4m of assets sits inside the site's claimed
"independently examined" band but must in fact be audited. That is the defect.

- **Section numbers:** Charities Act 2011 **s144** (audit of accounts of larger
  charities — the two audit triggers), **s145** (independent examination where
  s144 does not apply, and the qualified-examiner rule above £250,000), **s133**
  (the accounts threshold), **s154** (bodies whose members may examine).
- **Primary source:** https://www.legislation.gov.uk/ukpga/2011/25/section/144
- **Exact quote (s144(1), current in force):**
  > "(a) the charity's gross income in that year exceeds £1 million, or (b) the
  > charity's gross income in that year exceeds the accounts threshold and at the
  > end of the year the aggregate value of its assets (before deduction of
  > liabilities) exceeds £3.26 million."
- **Accounts threshold quote (same page):**
  > "'The accounts threshold' means the sum for the time being specified in
  > section 133 (account and statement an option for lower-income charities)."
  That sum is £250,000.
- **Effective date:** £1 million inserted by **The Charities Act 2011 (Accounts
  and Audit) Order 2015 (S.I. 2015/321)**; £3.26 million as enacted (the
  as-enacted text carried £500,000/£3.26m — https://www.legislation.gov.uk/ukpga/2011/25/section/144/enacted?view=plain).
  Current and correct for all accounting years ending **before 30 September 2026**.

**2025/2026 change — yes, and it is real.** The **Charities Acts 1992 and 2011
(Substitution of Sums) Order 2026 (S.I. 2026/427)** was laid 20 April 2026 and
comes into force **30 September 2026**. legislation.gov.uk shows two S.I. 2026/427
amendments to s144(1)(a) and (b) as "yet to be applied".

- **Primary source:** https://www.gov.uk/guidance/changes-to-charity-accounting-and-reporting
- **Exact quote:**
  > "These changes are expected to come into effect on 30 September 2026 and apply
  > to accounting years that end on or after 30 September 2026."
- **New figures (same page):** independent examination £25,000 → **£40,000**;
  qualified examiner £250,000 → **£500,000**; receipts and payments below
  £250,000 → below **£500,000**; audit income £1,000,000 → **£1,500,000**;
  audit assets £3,260,000 → **£5,000,000**; group accounts £1,000,000 →
  **£1,500,000**.
- **SI reference:** https://statutoryinstruments.parliament.uk/instrument/sDc3W7k1

**VERDICT: site wording FALSE.** "Charities with gross income between £25,000 and
£1m must be independently examined rather than audited" omits the gross-assets
audit trigger entirely and is therefore wrong for any charity over £250,000 income
with over £3.26m of assets. It is also about to go stale on 30 September 2026,
which is 17 days away — any fix must be written as a dated rule, not a bare figure.

**vs house_positions:** **RIGHT, and more complete than the site.** Position 3
carries the £25,000 gate and the £40,000 uplift; position 4 carries both audit
triggers *and* the 30 Sep 2026 uplift, with the correct "accounting years ENDING
on or after" framing. house_positions is not the source of the site defect — the
site is out of step with its own ground truth. Only gap: house_positions cites
gov.uk guidance and CC31 but never cites the statute, so it gives no section
numbers and does not name S.I. 2026/427 or S.I. 2015/321.

---

## Q2. Scotland / OSCR — "every Scottish charity needs external scrutiny regardless of size"

**ANSWER. The site's assertion is TRUE**, and it is the one place where Scotland
genuinely differs from England & Wales in kind rather than in figure. There is no
de-minimis income floor in the Scottish regime: every charity in the Scottish
Charity Register must have its statement of account either audited or
independently examined. The Scottish regulations achieve this by making
independent examination the residual duty for any charity *not* caught by the
audit regulation, with no lower bound.

- **Primary source:** https://www.legislation.gov.uk/ssi/2006/218/regulation/11
- **Exact quote (reg 11, The Charities Accounts (Scotland) Regulations 2006,
  SSI 2006/218):**
  > "A charity with a gross income in a financial year of less than £500,000,
  > which is required to prepare a statement of account in accordance with
  > regulation 8 or 9 and which is not required to have its statement of account
  > audited in accordance with regulation 10, must have its statement of account
  > for that year examined by an independent examiner..."

  Note what is absent: any minimum. The band is "less than £500,000" with a floor
  of zero, so a £2,000-income Scottish charity is inside it.
- **Supporting (OSCR):** https://www.oscr.org.uk/managing-a-charity/charity-accounting/a-guide-to-charity-accounts/3-the-external-scrutiny-of-charity-accounts/
  > "Accounts must be independently scrutinised."
- **Governing regulations:** Charities and Trustee Investment (Scotland) Act 2005
  (accounts duty), **The Charities Accounts (Scotland) Regulations 2006
  (SSI 2006/218)**, regs 10 (audit) and 11 (independent examination).

**Thresholds — and they changed on 1 January 2026.** The Scottish audit /
independent-examination boundary rose from £500,000 to **£1,000,000**.

- **Primary source:** https://www.legislation.gov.uk/ssi/2025/341/made
  (The Charities Accounts (Scotland) Amendment Regulations 2025, **SSI 2025/341**,
  laid 10 November 2025)
- **Exact quote (reg 3(5)(a) and 3(6)(a)):**
  > "in paragraph (1), for each occurrence of '£500,000' substitute '£1,000,000'"
  > ... "for '£500,000' substitute '£1,000,000'"
- **Commencement quote (reg 1(2)):**
  > "Subject to paragraph (3) these Regulations come into force on 1 January 2026"
- **Application:** financial years **beginning** on or after 1 January 2026. Note
  this is a *beginning* rule, where the E&W uplift is an *ending* rule. Do not mix
  the two framings on one page.
- **Current Scottish position (FYs beginning on/after 1 Jan 2026):** audit
  required where gross income is **£1,000,000 or more**, or gross assets exceed
  **£3.26 million**; independent examination for everything below, down to £0.
  OSCR states the IE band as
  > "gross income is under £1,000,000...and gross assets are £3,260,000 or less"
  (https://www.oscr.org.uk/managing-a-charity/charity-accounting/fully-accrued-accounts/3-external-scrutiny/)
- **Earlier periods:** audit at £500,000, per SSI 2006/218 reg 10 as originally
  made (which also carried a £2.8m asset trigger before later amendment —
  https://www.legislation.gov.uk/ssi/2006/218/regulation/10).

**VERDICT: site wording TRUE.** Keep it. But the site is at risk on the adjacent
figure: any page stating the Scottish audit threshold as £500,000 is now wrong for
years beginning on or after 1 January 2026.

**vs house_positions:** **RIGHT on the rule, but unnecessarily unsure, and now
stale on the figure.** Position 26 asserts universal external scrutiny and then
flags it as unverified because "guidance deep-links 404'd this pass". That flag
can be cleared: SSI 2006/218 reg 11 proves it directly, and it should have been
checked against the regulations rather than the regulator's website. house_positions
is **SILENT** on the Scottish thresholds themselves and **SILENT** on SSI 2025/341,
so open flag 3 is half-resolvable and half-outdated. Recommend position 26 gains
the £1,000,000 / £3.26m figures and the 1 Jan 2026 beginning-rule, and that open
flag 3 is closed.

---

## Q3. Company audit exemption turnover threshold

**ANSWER. £10.2m is wrong for any accounting period in 2026. The correct figures
are £15m turnover / £7.5m balance sheet total / 50 employees (meet two of three).**
The sibling Solicitors site is right.

- **Primary source:** https://www.legislation.gov.uk/ukpga/2006/46/section/382
- **Exact quote (s382(3), qualifying conditions for a small company, as currently
  in force):**
  > "Turnover: Not more than £15 million. Balance sheet total: Not more than
  > £7.5 million. Number of employees: Not more than 50."
- **Audit exemption link:** https://www.legislation.gov.uk/ukpga/2006/46/section/477
  > "A company that qualifies as a small company in relation to a financial year
  > is exempt from the requirements of this Act relating to the audit of accounts
  > for that year."
  s477(4)(a) points the size test at "section 382(1) to (6)", so the s382(3)
  figures *are* the audit exemption figures.
- **SI that made the change:** **The Companies (Accounts and Reports) (Amendment
  and Transitional Provision) Regulations 2024, S.I. 2024/1303** —
  https://www.legislation.gov.uk/uksi/2024/1303/made — regulation 9 amends
  s382(3), raising turnover from £10.2m to £15m and the balance sheet total from
  £5.1m to £7.5m.
- **Commencement rule:** in force **6 April 2025**, applying to **financial years
  beginning on or after 6 April 2025**. Regulation 3 provides a transitional
  provision: when testing size for a financial year beginning on or after
  6 April 2025, the preparer may assume the new thresholds applied in the
  preceding financial year, which disapplies the usual two-consecutive-years rule
  and lets companies take the uplift immediately.
- **Consequence for 2026 periods:** every accounting period beginning in 2026 is
  on the new figures. £10.2m is only ever correct for periods beginning before
  6 April 2025, i.e. nothing the site's readers are currently filing.

**CORRECTION TO THIS BRIEF.** The brief calls it "the ... Regulations 2025" and
says the uplift "was reported to have been laid for periods beginning on or after
6 April 2025". The commencement date is right; the instrument is not. It is the
**2024** Regulations, **S.I. 2024/1303**, made and laid in December 2024, coming
into force 6 April 2025. There is no 2025-numbered SI doing this. Cite 2024/1303.

**VERDICT: site wording FALSE.** £10.2m is a superseded figure and has been for
every period beginning since 6 April 2025.

**vs house_positions:** **SILENT.** house_positions has no company audit
exemption position at all. Position 6 touches Companies Act accruals accounts but
says nothing about size thresholds or audit exemption. This is a genuine gap and
is probably *why* the site is publishing £10.2m: there was no locked figure to
check against. Recommend a new position covering s382(3) / s477 with the £15m /
£7.5m / 50 figures and the 6 April 2025 beginning-rule, given the charities site
discusses charitable companies.

---

## Q4. GASDS matching rule

**ANSWER. The site's wording is wrong. There is no first-year exemption from the
matching rule, and "the same donations" is a misdescription of what GASDS is.**

GASDS is a top-up on **small cash and contactless donations of £30 or less** on
which Gift Aid is **not** claimed and for which **no declaration** exists. It is
not claimed on the same donations as Gift Aid. What ties the two together is the
**matching rule**: the GASDS claim is capped at ten times the Gift Aid claimed in
the same tax year.

- **Primary source:** https://www.gov.uk/claim-gift-aid/small-donations-scheme
- **Exact quote:**
  > "Your GASDS claim cannot be more than 10 times your Gift Aid claim."
- **Same-year requirement (same page):** Gift Aid must have been claimed
  > "in the same tax year as you want to claim GASDS"
  and the charity must be "without getting a penalty in the last 2 tax years".
- **Annual cap:** https://www.gov.uk/guidance/claiming-a-top-up-payment-on-small-charitable-donations
  > "the maximum donations limit is £8,000 per tax year"
  £8,000 of small donations × 25% = a **maximum £2,000 top-up** per tax year.
- **HMRC detailed guidance reference:** Chapter 8, "The Gift Aid Small Donations
  Scheme from 6 April 2017" —
  https://www.gov.uk/government/publications/charities-detailed-guidance-notes/chapter-8-the-gift-aid-small-donations-scheme-from-6-april-2017
  > "for every £10 claimed under GASDS, the charity or CASC also needs to claim at
  > least £1 of Gift Aid on other donations received in the same year"
  Note "**on other donations**" — this is the sentence that falsifies the site's
  "on the same donations".

**Is there a first-year exemption? NO.** What was relaxed from 6 April 2017 was
the *eligibility* history, not the matching rule. Chapter 8:
> "without needing to have been registered as a CASC or established as a charity
> for tax purposes for at least the 2 previous complete tax years" or to
> "have made a successful Gift Aid claim in at least 2 of the previous 4 tax years"

A brand-new charity may therefore claim GASDS in its first year, but it still must
make a Gift Aid claim in that same year and is still capped at 10× that claim. A
first-year charity with zero Gift Aid claims gets zero GASDS. This is almost
certainly the origin of the site's error: the 2017 removal of the two-year track
record has been garbled into a first-year exemption from matching.

**Community buildings.** A charity running charitable activities in a community
building with **10 or more beneficiaries at least 6 times in the tax year** may
claim up to **£8,000 per building** on donations collected in that building, or
in the same local authority area as that building, instead of the single £8,000
UK-wide allowance. The charity elects whichever basis gives more; it cannot use
both. These rules do not apply to CASCs. Connected charities share allowances.

- **Effective date:** the current scheme as described runs from **6 April 2017**
  (Small Charitable Donations and Childcare Payments Act 2017); the £8,000 /
  £2,000 limits from **6 April 2016**; the £30 per-donation limit and contactless
  eligibility from 6 April 2019.

**VERDICT: site wording FALSE on both counts.** "The same donations" is wrong
(GASDS applies to donations Gift Aid is *not* claimed on) and "except in the first
year" describes an exemption that does not exist.

**vs house_positions:** **RIGHT, and the site contradicts it.** Position 17 states
the 10× matching rule with a correct worked example, the £8,000 cap, the £2,000
top-up, the £30 per-donation limit, the 2-year claim deadline, and the correct
framing of the 2017 change as "no Gift Aid track record needed" rather than a
matching exemption. It also carries the writers' rule "describe and link, never
compute" for community buildings. house_positions is correct here; the live site
wording violates it.

---

## Cross-check summary vs `docs/charities/house_positions.md`

| # | Question | house_positions | Site | Site verdict |
|---|---|---|---|---|
| 1 | E&W IE band + audit triggers | **RIGHT** (pos 3, 4), incl. 30 Sep 2026 uplift; no statute cites | omits gross-assets trigger | **FALSE** |
| 2 | Scotland universal scrutiny | **RIGHT but flagged unverified** (pos 26); **SILENT** on Scottish thresholds and SSI 2025/341 | asserts universal scrutiny | **TRUE** |
| 3 | Company audit exemption | **SILENT** — no position exists | publishes £10.2m | **FALSE** |
| 4 | GASDS matching | **RIGHT** (pos 17) | "same donations ... except in the first year" | **FALSE** |

house_positions was **wrong on nothing checked**. Its failures here are failures of
omission (company audit thresholds, Scottish figures) and of unnecessary
self-doubt (open flag 3, which the regulations settle outright).

### Suggested house_positions follow-ups (NOT applied — report only)
1. Close open flag 3. SSI 2006/218 reg 11 proves universal scrutiny; cite the
   regulation, not the regulator's site.
2. Add Scottish thresholds to position 26: audit at £1,000,000 income or £3.26m
   assets for FYs **beginning** on/after 1 Jan 2026 (SSI 2025/341), £500,000
   before. Flag the beginning-vs-ending mismatch with E&W as a trap.
3. Add a new position for Companies Act 2006 s382(3)/s477: £15m / £7.5m / 50,
   from S.I. 2024/1303, FYs beginning on/after 6 April 2025.
4. Add statute cites (s144, s145, s133, S.I. 2015/321, S.I. 2026/427) to
   positions 3 to 6, which currently cite only guidance.

---

## Things in the brief that are FALSE

1. **"The Regulations 2025" / "an SI laid ... for periods beginning on or after
   6 April 2025" (Q3).** The instrument is **S.I. 2024/1303**, the Companies
   (Accounts and Reports) (Amendment and Transitional Provision) Regulations
   **2024**. The 6 April 2025 commencement is correct; the year in the title is
   not. No 2025-numbered SI made this change.
2. **Q1's framing of the assets test as "£250,000 income plus £3.26m assets"**
   is right in substance but the statute does not name £250,000 — it says
   "exceeds the accounts threshold", which is the s133 sum. Any page quoting this
   should reproduce the mechanism, because the s133 sum moves on 30 Sep 2026.
3. **Q4's premise that the first-year question is open.** It is not open: the
   matching rule has never had a first-year exemption. The 2017 change that the
   site's copy appears to be mangling removed a *track-record eligibility* test,
   which is a different rule.

## Things I could not verify

1. **The precise current text of SSI 2006/218 reg 10 as amended.**
   legislation.gov.uk served the as-made version (£500,000 income, £2.8m assets).
   The current asset trigger of **£3.26 million** is taken from OSCR's own
   fully-accrued-accounts guidance, not from the amended regulation text. The
   income figure is independently confirmed by SSI 2025/341 reg 3(5)(a). Confidence
   in £3.26m: high but regulator-sourced, not statute-sourced.
2. **The operative text of S.I. 2026/427.** legislation.gov.uk lists the two
   amendments to s144(1)(a) and (b) as "yet to be applied" without showing the
   substituted figures. The £1.5m / £5m figures come from the Charity Commission's
   own guidance page, which is a primary regulator source but not the instrument.
   The SI's existence, number, laying date (20 April 2026) and 30 September 2026
   commencement are confirmed via the UK Parliament SI tracker.
3. **The current s133 accounts threshold figure of £250,000 from the s133 page
   itself.** I confirmed s144 points at s133 and confirmed £250,000 via the
   Charity Commission guidance and s145's qualified-examiner threshold, but did
   not fetch s133 directly.
4. **Whether the site's Q1 sentence appears once or in several places, and where.**
   The brief did not name the files and I was instructed not to edit site files;
   I did not sweep the site source. The fix will need that sweep — and per the
   estate rule, sweep by rule, not by the sentence you were handed.
