---
slug: high-income-child-benefit-charge-business-owners-uk
category: Director Pay and Dividends
intent: informational-with-conversion (tax-planning guide for director-shareholders and higher-earning business owners who receive child benefit; high intent to engage an accountant once they see the charge is avoidable)
pick_id: A10
wave: 4
status: brief-ready
---

# Working title

**High income child benefit charge: the business owner and director guide (dividends, adjusted net income, and the pension lever)**

---

## Framing differentiator

Most HICBC articles explain the basic taper and tell an employee to "make a pension contribution." This page does something the competitors do not: it explains the charge through the **director-shareholder lens**, where the income that triggers the charge is a mix of salary and dividends, both flowing through decisions the director controls. The adjusted net income that drives the charge includes **dividends from the company**, so a director sitting on £55,000 of combined salary and dividends is much closer to the £60,000 threshold than they realise. The planning levers -- employer pension contributions (no NIC, corporation-tax-deductible), salary timing, dividend declaration timing, Gift Aid, and spouse income equalisation -- are all within the director's control in a way an employee's income is not. That is the insight that earns the lead.

**Boundary (BINDING per collision_verify A10):** director-shareholder lens throughout. Key sub-topics: adjusted net income including dividends; threshold planning via dividend timing; pension contributions and Gift Aid as ANI reducers; spouse income equalisation; who must file Self Assessment for HICBC. Not a general child benefit entitlement guide. Not a salary-dividend optimisation page (cross-link to that page; do not restate its full content).

---

## Verified statutory anchors (verified at primary source 2026-07-09)

### HICBC thresholds and taper (CRITICAL -- verified gov.uk 2026-07-09)

Source: https://www.gov.uk/child-benefit-tax-charge (HTTP 200, 2026-07-09)

- **Lower threshold (from 2024/25 onwards): £60,000 of adjusted net income.** Below this, no charge.
- **Upper threshold (from 2024/25 onwards): £80,000 of adjusted net income.** At or above this, the charge equals 100% of child benefit received (full clawback).
- **Taper rate (from 2024/25 onwards): 1% of child benefit received for every £200 of adjusted net income above £60,000.** Equivalently, the charge = (ANI - £60,000) / 200 x 1% of annual child benefit. Between £60,000 and £80,000 the excess income band is £20,000; at 1% per £200 that gives 100 steps of 1% = 100% = full clawback at £80,000. This is confirmed.
- **Pre-2024/25 thresholds (for historical reference only):** lower £50,000, upper £60,000; taper was 1% per £100.
- **2026/27 status:** gov.uk page states thresholds apply "for tax years starting from 2024 to 2025" with no announced change for 2026/27. No Budget or Spring Statement measure has been identified that alters these thresholds. Writer must re-verify at write time. If thresholds change, raise HP_LOCK flag immediately.

> HP LOCK NEEDED (F-101): Child benefit weekly rates for 2026/27 are NOT confirmed at primary source. The gov.uk "what you'll get" page currently shows £27.05/week (eldest/only child) and £17.90/week (additional children) but does not state the tax year. The 2026/27 benefit-and-pension-rates PDF exists (confirmed published) but was not machine-readable in this session. Writer must fetch https://www.gov.uk/child-benefit/what-youll-get at write time, confirm these are the 2026/27 rates (or obtain the correct 2026/27 figures), and use ONLY the confirmed figures in worked examples. Do not use £27.05/£17.90 without confirming they apply to 2026/27. Flag in the brief if any rate is used that covers only 2025/26.

### Adjusted net income definition (verified gov.uk 2026-07-09)

Source: https://www.gov.uk/child-benefit-tax-charge (HTTP 200, 2026-07-09)

Gov.uk states: "Your adjusted net income is your total taxable income, which includes savings interest and dividends. It's calculated before any Personal Allowances and less certain tax reliefs, such as pension contributions and Gift Aid."

**Practical implication for directors:** dividends drawn from a limited company count in full as part of adjusted net income. A director taking a £12,570 salary and £47,430 in dividends has ANI of approximately £60,000 (before any reliefs), which is right at the threshold. Even a modest dividend increase tips them into the taper. This is the core director insight.

**Statutory anchor:** ICTA / ITA 2007 -- adjusted net income is defined in ITA 2007 s.23 (net income) as modified for reliefs. The charge itself is in ITEPA 2003 Part 10, Chapter 8 (ss.681B-681H, inserted by Finance Act 2012 and amended by Finance (No.2) Act 2015, with threshold reform by Finance Act 2024). Writer to confirm statutory section references at write time via legislation.gov.uk.

### PAYE collection option (verified gov.uk 2026-07-09)

Source: https://www.gov.uk/child-benefit-tax-charge (HTTP 200, 2026-07-09)

Gov.uk confirms two ways to pay the HICBC: (1) Self Assessment; (2) PAYE (where the individual has a PAYE code and is not already filing Self Assessment for another reason). For a director who files Self Assessment anyway (as almost all directors must), the charge is settled on the Self Assessment return. The PAYE-collection route is relevant for an employed partner who would not otherwise file Self Assessment. Writer to confirm whether PAYE collection for HICBC is fully operational for 2026/27 at write time (gov.uk page does not caveat it as pending).

### Dividend tax rates 2026/27 (HP §4, verified legislation.gov.uk 2026-06-12)

Per house_positions.md §4 (locked and Opus-verified 2026-06-12):
- Ordinary rate: **10.75%** (from 6 April 2026, FA 2026 s.4)
- Upper rate: **35.75%** (from 6 April 2026, FA 2026 s.4)
- Additional rate: **39.35%** (unchanged)
- Dividend allowance: **£500**

These are binding. Use with tax-year tag: "from 6 April 2026 (2026/27)".

### Pension annual allowance (HP §10, verified 2026-06-12)

- Annual allowance: **£60,000** (2025/26, continuing into 2026/27 unless changed)
- Employer pension contributions: corporation-tax-deductible on a paid basis (FA 2004 s.196), no NIC, not limited by the individual's relevant earnings (only by the annual allowance)
- A company pension contribution **reduces the company's taxable profit** but does NOT reduce the director's adjusted net income for HICBC purposes, because ANI is calculated at the individual level. However, a **personal pension contribution** (or a salary-sacrifice arrangement that reduces employment income) DOES reduce ANI. This distinction is critical. Writer must state it clearly.
- An **employer contribution** is tax-efficient but does not mechanically reduce the director's own ANI. A **personal contribution by the director** does reduce ANI (it is a relief subtracted from net income to reach ANI under ITA 2007 s.23). For HICBC, the lever is the personal contribution, not the employer contribution -- though both are available for different reasons.

> HP LOCK NEEDED (F-102): Confirm whether a director's salary-sacrifice pension arrangement (which reduces employment income and therefore ANI) is the most common HICBC lever in practice, vs a personal contribution claiming relief at source. Both reduce ANI; the mechanics differ. Writer to flag if this distinction needs a house position entry.

---

## Competitor URLs

<!-- VERIFIED 2026-07-09 -->
<!-- https://www.crunch.co.uk/knowledge/high-income-child-benefit-charge — HTTP 404 (DEAD, delete) -->
<!-- https://www.perrysaccountants.co.uk/news/high-income-child-benefit — HTTP 200 (LIVE, confirmed on-topic: thresholds, taper, adjusted net income including dividends, SA requirement) -->

**Live competitor (1 confirmed):**

1. **https://www.perrysaccountants.co.uk/news/high-income-child-benefit** (HTTP 200, 2026-07-09) -- Perrys Chartered Accountants; covers 2024/25 threshold change to £60,000/£80,000, tapering at 1% per £200, adjusted net income including dividends, self-assessment requirement, and pension/Gift Aid as reducers. No worked examples. No director-specific extraction modelling. No spouse-equalisation strategy. No salary-dividend optimisation for the director context. **Differentiation opportunity:** add quantified worked examples, model the dividend-inclusion effect specifically for directors, and walk the spouse-equalisation strategy step by step.

Writer: at write time, run a fresh search for additional live competitors covering HICBC from the director/business-owner angle (e.g. from accountingweb.co.uk, moneybox.co.uk, gorillaaccounting.co.uk, taxinsider.co.uk). Fetch each (confirm HTTP 200 + on-topic + unique angle), then add up to 2 more with a 1-line takeaway. If fewer than 2 additional survive, retain this stub.

---

## Authority links (verified live 2026-07-09)

1. **https://www.gov.uk/child-benefit-tax-charge** (HTTP 200) -- primary gov.uk HICBC overview; confirmed thresholds £60,000/£80,000 from 2024/25, taper 1% per £200, adjusted net income definition including dividends, two payment methods. Use as the primary statutory reference anchor.
2. **https://www.gov.uk/child-benefit/what-youll-get** (HTTP 200) -- child benefit weekly rates page. Writer: confirm at write time whether £27.05/£17.90 is tagged to 2026/27 or only 2025/26. Use confirmed rate only.
3. **https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027** (HTTP 200 -- publication landing page confirmed) -- confirms 2026/27 benefit rates are published and confirmed (as of Feb 2026 update removing "proposed"). Writer: navigate to the HTML sub-page and extract confirmed 2026/27 child benefit rates if not confirmed from link 2 above.
4. **https://www.legislation.gov.uk/ukpga/2007/3/section/23** -- ITA 2007 s.23 (adjusted net income definition). Writer: verify at write time that this is the correct section for ANI and quote the section title.

---

## Worked examples

### A. Director on £55,000 salary and dividends with 2 children (2026/27)

**Setup:**
- Director-shareholder of a small limited company
- Salary: £12,570 (at personal allowance, no EA available -- single-director company)
- Dividends declared in 2026/27: £42,430
- Total adjusted net income: £12,570 + £42,430 = £55,000
- Children: 2 (eldest plus one additional)

**Child benefit annual value (use confirmed 2026/27 rates at write time; holding figures from gov.uk current page):**

> Writer: insert confirmed 2026/27 rates here per F-101 above. For illustration only (not for publication until confirmed): if the rates shown on gov.uk (£27.05/week eldest + £17.90/week additional) are the 2026/27 rates, then annual CB = (£27.05 x 52) + (£17.90 x 52) = £1,406.60 + £930.80 = £2,337.40/year. If the rates are 2025/26 only, use the confirmed 2026/27 rates instead.

**HICBC calculation:**
- ANI = £55,000
- Threshold = £60,000
- ANI is BELOW the threshold: charge = £0
- No HICBC liability

**Key insight:** this director is below the threshold. BUT a director who takes slightly more in dividends -- say, £47,430 instead of £42,430 -- would have ANI of £60,000, crossing the lower threshold. An additional £1,000 of dividends above that costs 1% of annual child benefit per £200, i.e. 5% of annual child benefit per £1,000 of excess income.

**Director on £55,000 who increases dividends to £50,000 (ANI = £62,570):**
- Excess above £60,000: £2,570
- Taper: £2,570 / £200 = 12.85 steps of 1%
- Charge: 12.85% of annual child benefit
- Using illustrative annual CB of £2,337.40: charge = 12.85% x £2,337.40 = approx £300 (writer to insert confirmed figures)

### B. £5,000 personal pension contribution reducing ANI below the threshold (2026/27)

**Setup:**
- Director with ANI of £65,000 (salary £12,570 + dividends £52,430)
- Children: 2
- Child benefit received: full year

**Without pension contribution:**
- ANI = £65,000
- Excess above £60,000: £5,000
- Taper: £5,000 / £200 = 25 steps of 1%
- Charge: 25% of annual child benefit
- Using illustrative annual CB of £2,337.40: charge = approx £584 (writer to insert confirmed figures)

**With £5,000 personal pension contribution (gross, contributed personally -- not via the company):**
- ANI = £65,000 - £5,000 = £60,000
- Excess above threshold: £0
- Charge: £0

**Tax relief cascade on the £5,000 personal contribution (for a higher-rate taxpayer):**
- Basic-rate relief claimed at source: £1,000 (net cost £4,000 out of pocket to contribute £5,000 gross)
- Higher-rate relief via Self Assessment: further 20% x £5,000 = £1,000 (reduces tax bill on the SA return)
- Total tax relief: £2,000 on a £5,000 gross contribution
- PLUS: HICBC eliminated (saving approx £584 in the above illustration)
- Effective cost of pension contribution to recover £584 in HICBC: the £4,000 net payment attracts £2,000 in income-tax relief AND eliminates the HICBC = total value of the £4,000 payment is approximately £2,584 (writer to refine with confirmed CB rates)

**Important distinction for directors (BINDING):** an **employer (company) pension contribution** is tax-efficient (CT deductible, no NIC) but does NOT reduce the director's adjusted net income for HICBC. The HICBC reducer is a **personal pension contribution** that reduces the individual's net income under ITA 2007 s.23. Writer must state this clearly and not conflate the two levers.

### C. Spouse income equalisation

**Setup:**
- Director has ANI of £72,000 (inside taper, charge = 60% of child benefit)
- Spouse/civil partner has ANI of £25,000

**Without equalisation (illustrative charge):**
- Excess: £72,000 - £60,000 = £12,000
- Steps: £12,000 / £200 = 60 steps
- Charge: 60% of annual child benefit
- Using illustrative annual CB of £2,337.40 for 2 children: charge = approx £1,402

**Strategy:** if the spouse holds shares in the company and dividends are redirected to the spouse, the director's ANI falls and the spouse's rises. If the director's ANI falls below £60,000, the charge is nil. If the spouse's ANI remains below £60,000, no charge on the spouse either.

**Key conditions for dividend redistribution via spouse shares (HP §4 / dividend-to-spouse-non-director page):**
- The spouse must genuinely hold the shares (not a nominee or sham arrangement)
- The shares must carry dividend rights; the right to the dividend must be the spouse's
- HMRC can challenge arrangements under the settlements legislation (ITTOIA 2005 s.619) where income is redirected to a spouse from an arrangement that lacks genuine independence -- the Arctic Systems case (Jones v Garnett [2007] UKHL 35) established that an ordinary shares arrangement is NOT within s.619, but arrangements that look artificial may be. Writer: cross-link to dividend-to-spouse-non-director page, which covers this in detail; do not repeat its full analysis here.

---

## Key questions for the FAQ (8-12 full drafts)

### Q1. What income counts towards the High Income Child Benefit Charge for a business owner?

Your adjusted net income (ANI) counts, not just your salary. ANI includes employment income, dividends, savings interest, rental income and any other taxable income, reduced by certain reliefs including pension contributions and Gift Aid donations. For a director of a limited company, this means dividends you draw from your company are included alongside your salary. A director taking a £12,570 salary and £47,430 in dividends has ANI of £60,000 -- exactly at the lower threshold -- before any reliefs. The charge therefore affects directors at much lower headline salary levels than they might expect.

### Q2. What are the current HICBC thresholds and how is the charge calculated?

From the 2024/25 tax year onwards, the charge applies where adjusted net income exceeds £60,000. Above £80,000, the charge equals 100% of child benefit received (the full benefit is effectively clawed back). Between those figures, the charge tapers at 1% of your annual child benefit for every £200 of income above £60,000 -- so someone with ANI of £70,000 (£10,000 above the threshold) owes 50% of their child benefit as a charge (50 steps of 1%). This is a significant improvement on the pre-2024/25 regime (£50,000/£60,000 thresholds, 1% per £100), which affected far more families and at steeper effective rates.

### Q3. Do dividends from my company count as income for the HICBC?

Yes. Dividends are part of your total taxable income and are included in adjusted net income for HICBC purposes. The £500 dividend allowance does not remove dividends from your income for ANI purposes (it only reduces the tax paid on them). If you took £30,000 in salary and £35,000 in dividends, your ANI is £65,000 (before reliefs), putting you £5,000 into the taper. Many directors discover the HICBC only when their accountant models the full ANI picture including dividends.

### Q4. Can a pension contribution reduce or eliminate the HICBC?

Yes -- but the contribution must be a personal pension contribution, not an employer (company) contribution. A personal contribution you make into a pension reduces your adjusted net income pound for pound, and can bring it below the £60,000 threshold, eliminating the charge entirely. An employer contribution paid directly by your company reduces the company's taxable profit and is free of NIC, but it does not reduce your personal ANI for HICBC purposes. If your ANI is £65,000, a personal pension contribution of £5,000 gross reduces ANI to £60,000 and eliminates the charge. You also receive income-tax relief on the contribution (basic rate at source, plus higher-rate relief via Self Assessment), making the pension-plus-HICBC-elimination combination one of the most tax-efficient moves available to a director in this income band.

### Q5. What is the difference between an employer pension contribution and a personal pension contribution for HICBC?

An employer pension contribution is paid by your company directly into your pension. It is deductible against corporation tax and has no NIC (employer or employee). It builds your pension efficiently and reduces the company's taxable profit. However, it does not appear in your personal income and cannot reduce your adjusted net income for HICBC purposes.

A personal pension contribution is paid by you individually (typically as a gross contribution or net-of-basic-rate contribution to a personal or SIPP arrangement). It is a relief that reduces your net income under ITA 2007 s.23, which feeds into your ANI calculation. It is therefore the lever that reduces HICBC. The two contributions serve different purposes; many directors use both (employer contributions for the bulk of pension building; personal contributions specifically to manage the ANI position).

### Q6. Does Gift Aid also reduce adjusted net income for HICBC?

Yes. Gift Aid donations also reduce adjusted net income. The mechanism is similar to pension contributions: the gross equivalent of your Gift Aid donation (the payment grossed up at basic rate) is deducted in arriving at ANI. A director with ANI of £61,000 who makes a £1,000 gross Gift Aid donation (net payment £800) reduces ANI to £60,000 and eliminates the charge. This is a legitimate planning tool, though most directors will have larger headroom to fill via pension contributions than Gift Aid.

### Q7. If my spouse earns more than me, who pays the HICBC?

The charge is paid by whichever partner in the household has the higher adjusted net income, even if that partner is not the one who claimed child benefit or receives the payments. If your ANI is £65,000 and your spouse's is £50,000, the charge is yours to pay on your Self Assessment return (your ANI is higher). The child benefit can be in either name; the charge follows the higher earner.

### Q8. Can splitting income with my spouse reduce or eliminate the HICBC?

Potentially, yes, but the arrangement must be genuine. If your spouse or civil partner holds shares in your company in their own right (not as a nominee for you), dividends paid on those shares are the spouse's income and reduce the amount you draw, lowering your ANI. If you can bring your ANI below £60,000 in this way, the charge is eliminated -- and if your spouse's ANI also stays below £60,000, neither of you pays the charge. The arrangement must involve genuine shareholding with real economic substance. HMRC scrutinises artificial income-splitting under the settlements legislation. Our page on dividends to a spouse covers the legal framework in detail.

### Q9. Do I have to file a Self Assessment return because of the HICBC?

As a director, you are already required to file Self Assessment for your dividends and business income. The HICBC is simply an additional charge you calculate and report on the same return. If you are an employed higher earner (not a director) who does not currently file Self Assessment, and your ANI exceeds £60,000, you need to register for Self Assessment to report and pay the charge -- even if all your income is PAYE. Alternatively, HMRC now offers a PAYE-adjustment route to pay the charge through your tax code, which avoids the need to file a return if your circumstances are straightforward. Directors should use the Self Assessment route in almost all cases.

### Q10. What if my income fluctuates year to year -- can I reclaim child benefit one year if my income drops?

Yes. The HICBC is calculated year by year based on your ANI for that tax year. If your ANI falls below £60,000 in a given year, there is no charge for that year. You can also stop or restart child benefit claims: many families stopped claiming when the old £50,000 threshold was crossed; since the threshold rose to £60,000 in April 2024, it is worth checking whether you now qualify to restart the claim (child benefit can be backdated three months from the date of a new claim). Directors whose dividend income varies year to year should model the ANI position before the year end to decide whether to declare more or fewer dividends.

### Q11. What is the most effective HICBC planning strategy for a director?

The most reliable approach combines three elements. First, model your full ANI before the tax year end: salary plus dividends plus any other taxable income, less existing pension contributions and Gift Aid. Second, if ANI is inside the taper band, consider whether a personal pension contribution or additional Gift Aid can reduce ANI to £60,000 or below (eliminating the charge). Third, review the shareholding and dividend-declaration structure: if a spouse or civil partner already holds shares, ensure dividends are declared and paid correctly to reduce your own ANI within genuine legal arrangements. An accountant can model the exact saving from each lever, which often reveals that eliminating the charge via pension contributions creates a better after-tax position than simply accepting the charge.

### Q12. Is there any benefit to stopping child benefit claims rather than paying the HICBC?

Stopping claims means you do not receive the payment and do not pay the charge. The net position is nil -- but you also lose the NI credit that comes with a child benefit claim. Each week you (or your partner) receive child benefit, you may receive a National Insurance credit toward your state pension, even if the payment is clawed back in full via the HICBC. This credit has real long-term value. Most advisers recommend continuing to claim and paying the charge, or eliminating the charge via pension contributions, rather than stopping claims entirely -- especially during years where ANI is near the threshold. If ANI is comfortably above £80,000 and pension planning cannot reduce it, the NI credit still justifies keeping the claim live if the claimant is not already building a full pension record.

---

## Article structure (H2-level skeleton)

1. **What is the High Income Child Benefit Charge?** (Brief intro, current thresholds, the reform from 2024/25)
2. **How adjusted net income works for directors** (salary + dividends = ANI; the dividend-inclusion insight; the £500 allowance does not help)
3. **How the charge is calculated: the taper in practice** (worked example A, confirmed rate at write time; charge per £1,000 of excess income)
4. **Pension contributions: the most powerful planning lever** (employer vs personal distinction; worked example B; the effective relief cascade)
5. **Gift Aid as an ANI reducer** (brief, accurate, cross-referenced)
6. **Spouse income equalisation: using dividend splitting legitimately** (worked example C; cross-link to dividend-to-spouse page; settlements risk flagged)
7. **Self Assessment, PAYE and registration requirements** (directors already file SA; employees may need to register; PAYE option for simpler cases)
8. **Year-by-year planning and fluctuating income** (model before year end; stopping vs continuing claims; NI credit)
9. **FAQs** (12 questions above)

---

## Cross-link map (all verified live 2026-07-09)

| Target page | Slug | Reason for link |
|---|---|---|
| Taxable income calculator | /blog/taxable-income-calculator | Anchor at "model your ANI" point; interactive cross-reference |
| Self Assessment accountant | /blog/self-assessment-accountant-2025-26 | HICBC triggers SA registration; natural lead-gen bridge |
| Tax-efficient salary dividend split (director) | /blog/tax-efficient-salary-dividend-split-director-2025-26 | Salary/dividend optimisation detail; do not restate here |
| Dividends to spouse (non-director) | /blog/dividend-to-spouse-non-director | Spouse income-splitting legal framework; cross-ref from §6 |

Note: two versions of the salary-dividend split page exist (tax-efficient-salary-dividend-split-2025-26 and tax-efficient-salary-dividend-split-director-2025-26). Link to the director version as the primary target.

---

## Meta drafts

**Meta title (target ≤62 chars):**
`High Income Child Benefit Charge: Director Guide 2026/27`
Character count: 57 -- PASS

**Meta description (target ≤158 chars):**
`Dividends count in your adjusted net income for the HICBC. See how directors can use pension contributions and dividend planning to reduce or eliminate the charge.`
Character count: 163 -- FAIL (5 over)

**Revised meta description:**
`Dividends count toward HICBC adjusted net income. Directors can use pension contributions and dividend planning to cut or eliminate the charge.`
Character count: 142 -- PASS

---

## Six-check pre-flight notes (for writer)

- [ ] Zero em-dashes in body (no "--" or "—" in published copy; use commas, parentheses, full stops, middle dots)
- [ ] Zero utility CSS classes in HTML body (semantic tags only)
- [ ] FAQ count: 12 FAQs drafted above; frontmatter `faqs:` array must match the committed count (aim 10-12)
- [ ] Meta title ≤62 chars: PASS (57)
- [ ] Meta description ≤158 chars: PASS (142, revised version)
- [ ] Every internal link resolves: all 4 cross-links verified live 2026-07-09
- [ ] Body word count target: 2,800-3,500 (non-pillar); this topic is tax-planning heavy and may run to 3,200-3,500 comfortably
- [ ] Child benefit 2026/27 rates: **must confirm before committing** (F-101)
- [ ] HICBC thresholds: confirmed £60,000/£80,000 from 2024/25; verify no 2026/27 change at write time
- [ ] Personal vs employer pension distinction: state clearly in both the body and FAQ Q4/Q5

---

## Flags raised

### F-101 (HP LOCK NEEDED) -- Child benefit weekly rates 2026/27 unconfirmed

**File:** wave4_site_wide_flags.md
**Severity:** HIGH
**Detail:** gov.uk "what you'll get" page shows £27.05/week (eldest/only) and £17.90/week (additional children) but does not state which tax year these apply to. The 2026/27 rates publication exists and is confirmed (gov.uk benefit-and-pension-rates-2026-to-2027 landing page, confirmed published and confirmed). However the HTML sub-page and PDF could not be machine-read in this session to extract the specific child benefit figures. These rates are used in both worked examples. Writer must confirm the 2026/27 rates at primary source before writing. If the rates differ from the above, the worked examples must use the correct figures. If the rates are the same, cite the confirmation URL.

### F-102 (HP LOCK NEEDED) -- Personal vs salary-sacrifice pension distinction for HICBC

**File:** wave4_site_wide_flags.md
**Severity:** MEDIUM
**Detail:** The brief draws the distinction between employer pension contributions (no ANI reduction) and personal contributions (ANI reduction). A third variant -- salary sacrifice that reduces the director's employment income -- would also reduce ANI. The HP does not currently address this nuance. If a director can use salary sacrifice, this is a further lever. Writer: if planning to mention salary sacrifice, raise this flag and await HP confirmation before publishing salary-sacrifice advice.
