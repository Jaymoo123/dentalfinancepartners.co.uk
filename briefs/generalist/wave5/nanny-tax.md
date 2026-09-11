---
slug: nanny-tax
tier: blog
category: "Payroll and PAYE"
route: /blog/payroll-and-paye/nanny-tax
intent: DIY-INFORMATIONAL, high-volume head term (3,070/mo). A family who has accidentally become a PAYE employer. Pillar for "Employing someone at home". Routes to the payroll service; a gross-to-net calculator follows on the component track.
---
# Brief: Nanny tax, what a family owes when they employ someone at home

> Wave-5 high-street mechanic asset. PILLAR. Body references "the family" / "the employer". CTA and brand from config. No em-dashes. Faceless. Raw-HTML body. First prose block must be a plain sentence of 30+ characters (generalist first-sentence test).

## Target queries (REQUIRED PHRASINGS, NOT SUGGESTIONS)

These phrasings are binding. Every one must appear naturally in a heading, in body prose, or in an FAQ question, in the words people typed. **You may not split any of them into another page**; if you believe one does not belong, raise a flag in the Q&A file and keep writing.

```
nanny tax
```

Volume 3,070/mo. Single-phrasing pick, so the page carries the head term verbatim in the H1 and must earn its depth from the mechanic, not from phrasing variety.

## Asset type + play

Answer-first pillar on household employment. The wedge is a fact the whole nanny-payroll industry gets wrong in its own marketing: **a family employing a nanny cannot claim the Employment Allowance**. Competitor pages tell families they can offset £10,500 against employer NIC. They cannot, and at 15% above £5,000 that error is real money the family will not have budgeted for. Lead the "what people get wrong" section on it and cite the statute.

Second wedge: the registration trigger. Almost every summary says "register once the nanny earns the Lower Earnings Limit". gov.uk says **£96 a week**, the secondary threshold. Both numbers exist in 2026/27 and they are different numbers for different purposes.

## Dedup evidence

- Cannibalisation verdict: **NET-NEW**. Nothing in the 457-post corpus covers household employment.
- `accountant-for-childminders-uk.md` is the childminder's own self-employment, the opposite side of the relationship. No collision; link it once as "if you are the carer, not the employer".
- `how-to-register-for-paye-uk-employers.md` owns the mechanics of registering as an employer. This page states the household trigger and links out rather than re-running the registration walkthrough.
- `payroll-for-one-employee-uk-director-guide.md` owns single-employee payroll operation for a company director. This page is the domestic employer, who is not a business at all. Documented wedge = the employer is a household, so the Employment Allowance is barred and there is no trade to deduct the cost against.

## Required structure (H2 skeleton)

1. **First 60 words, the answer.** A family employing a nanny in their own home is an employer: PAYE registration before the first payday if the nanny is paid £96 a week or more, income tax and employee NIC deducted, employer NIC at 15% above £5,000 a year paid on top, and pension auto-enrolment if the nanny qualifies. The Employment Allowance is not available to offset it.
2. "Nanny tax" is not a tax. What the phrase actually means.
3. You are the employer, and you cannot choose otherwise. A nanny cannot be made self-employed by agreement.
4. When you must register for PAYE: the £96 a week trigger and the four other triggers.
5. What comes out of the nanny's pay, and what the family pays on top.
6. **Boundary table** (see below).
7. The Employment Allowance trap, and the one narrow exception.
8. Gross or net: why agreeing a net wage shifts every tax change onto the family.
9. Pension auto-enrolment for a household employer.
10. Worked examples (two, below).
11. What people get wrong.
12. FAQ (10 to 14).
13. Links out.

**No calculator on this page.** A gross-to-net nanny calculator is on the separate component track (program doc section 7). You may write one forward-looking sentence that a calculator will follow and be linked from here. Do not specify it, do not embed one, do not describe its inputs.

## BOUNDARY TABLE (mandatory, exact columns)

Columns: **"Employment Allowance available"** against **"Excluded liability, the family pays employer NIC in full"**. Four trade-anchored row pairs minimum:

| Employment Allowance available | Excluded liability, family pays in full |
|---|---|
| A cafe owner employing a kitchen assistant (a business, ordinary secondary Class 1) | A family employing a nanny for two healthy children |
| A salon employing a junior stylist | A household employing a cleaner or housekeeper |
| A garage employing a second mechanic | A household employing a gardener or a chauffeur (NIM06520 extends the exclusion to both) |
| A family employing a live-in carer whose duties are wholly caring for a disabled or elderly relative (s.2(3A) carve-out) | A nanny who cares for a relative needing care **and** also childminds a healthy sibling, so not all duties fall in the carve-out |

The last pair is the whole point: the carve-out requires **all** the personal, family or household duties to be for the person needing care.

## Worked examples (two, real figures)

1. A nanny on £600 a week gross. Show employer secondary Class 1 at 15% on the excess over the £96 weekly secondary threshold, annualised against the £5,000 threshold, and state plainly that no Employment Allowance reduces it.
2. A part-time nanny on £90 a week with no other job, no pension and no benefits: below the £96 trigger, so no PAYE registration is required, but payroll records must still be kept. Then the same nanny at £110 a week, which crosses the trigger.

Keep both arithmetically checkable from the figures in the HP map below. Do not invent a tax-code deduction.

## Figures mapped to HP

| Figure | Source |
|---|---|
| PAYE registration trigger £96 a week, plus the other triggers (another job, a pension, expenses or benefits, JSA/ESA/Incapacity Benefit) | Stage 1B B §5.1. gov.uk https://www.gov.uk/paye-for-employers . Cannot register more than 2 months before the first payment: https://www.gov.uk/register-employer |
| Employer secondary Class 1 **15%**, secondary threshold **£5,000/yr, £417/mo, £96/wk** | HP §4 and §9 (confirmed unchanged into 2026/27), Stage 1B B §5.2 |
| Employee Class 1 **8%** to UEL then 2%; primary threshold **£12,570/yr, £242/wk** | Stage 1B B §5.2, gov.uk rates and thresholds for employers 2026 to 2027 |
| Lower Earnings Limit **£6,708/yr, £129/wk** for 2026/27 | Stage 1B B §5.2. **Use this, not the £6,500 in HP §4 and §9**, which is the 2025/26 figure. Do not call the LEL the registration trigger. |
| Employment Allowance £10,500 exists but is an **excluded liability** for a household employer | NICA 2014 s.2(3), carve-out s.2(3A): https://www.legislation.gov.uk/ukpga/2014/7/section/2 ; NIM06520: https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim06520 |
| A nanny cannot be asked to become self-employed | gov.uk https://www.gov.uk/au-pairs-employment-law ; status factors HP §13 |
| Auto-enrolment: trigger £10,000, qualifying earnings band, 8% total / 3% employer minimum | HP §9. **Date-tag as 2025/26 figures**, per HP §9's own writing rule. |
| RTI late-filing penalty £100 for 1 to 9 employees | HP §9 |

## HP GAPS (do NOT invent, omit or link gov.uk)

1. **2026/27 auto-enrolment earnings trigger and qualifying earnings band.** HP §9 carries 2025/26 figures only and Stage 1B B did not verify 2026/27 auto-enrolment thresholds. Either date-tag them as 2025/26 explicitly or describe auto-enrolment qualitatively and link The Pensions Regulator. Do not state a 2026/27 auto-enrolment figure.
2. **Statutory maternity, sick and holiday pay rates for 2026/27.** Not locked anywhere. Say the family carries the exposure and link gov.uk; give no rate.
3. **No nanny-specific ESM manual paragraph exists** (Stage 1B B §5.4). Do not cite an ESM number for nannies.
4. **Ofsted-registered nanny / Tax-Free Childcare interaction.** Not verified, not in HP. One sentence that a family may be able to pay an Ofsted-registered nanny through Tax-Free Childcare, with a gov.uk link, and no figures or eligibility conditions.
5. No fee figures, no named experts, no client counts (faceless authority rule).

## Internal links (verified to exist in `generalist/web/content/blog/`)

**Out:** `/blog/payroll-and-paye/how-to-register-for-paye-uk-employers` (the registration mechanics), `/blog/payroll-and-paye/payroll-for-one-employee-uk-director-guide` (running a one-person payroll), `/blog/sole-trader-and-self-employment/accountant-for-childminders-uk` (the other side of the relationship).
**In:** add a link from `how-to-register-for-paye-uk-employers.md` back to this page at WRAP.

## Body length

PILLAR: **3,500 to 4,500 body words.** FAQ 10 to 14, frontmatter `faqs:` count must equal the rendered count.
