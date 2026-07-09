# Brief: Personal Tax for LLP Members (UK)

**Pick:** A12  
**Slug:** `personal-tax-for-llp-members-uk`  
**Category:** Sole Trader and Self Employment  
**Target word count:** 2,800-3,500 body words (non-pillar)  
**Brief created:** 2026-07-09  
**Status:** RUN-READY

---

## 1. Scope and collision boundary (BINDING)

**Write:** ongoing compliance for an LLP member AFTER the entity decision has been made. Core topics: LLP tax transparency and its practical meaning, how profit is allocated, why drawings are NOT the taxable figure, self-assessment obligations (SA100 + SA800 interaction), Class 4 NIC mechanics at 2026/27 rates, payments on account (POA) arithmetic, salaried-member rules at awareness level (when the three conditions re-characterise a fixed-share member as an employee).

**Do NOT write:** the choose-LLP-vs-Ltd decision (owned by `limited-company-vs-llp-consultant`); forming a partnership from scratch (A5 `how-to-set-up-a-business-partnership-uk`); deep MTD deferral for mixed-member partnerships (owned by `mtd-itsa-april-2026-deadline-mixed-member-partnerships`); multi-trade Class 4 aggregation deep-dive (owned by `class-4-ni-multiple-trades`).

---

## 2. Statutory anchors (all verified at primary source, 2026-07-09)

| Provision | What it does | Verified URL |
|-----------|-------------|--------------|
| ITTOIA 2005 s.863(1) | LLP carries on trade "as if" a partnership; all activities attributed to members; LLP does not pay income tax | https://www.legislation.gov.uk/ukpga/2005/5/section/863 |
| ITTOIA 2005 s.850 | Partner's profit share determined by profit-sharing arrangement for the period | https://www.legislation.gov.uk/ukpga/2005/5/section/850 |
| ITTOIA 2005 s.863A | Salaried-member trigger: when Conditions A+B+C all met, M treated as employee under contract of service | https://www.legislation.gov.uk/ukpga/2005/5/section/863A |
| ITTOIA 2005 s.863B | Condition A: at least 80% of expected payments are "disguised salary" (fixed, or varying without reference to overall LLP profits) | https://www.legislation.gov.uk/ukpga/2005/5/section/863B |
| ITTOIA 2005 s.863C | Condition B: M does not have significant influence over the affairs of the LLP | https://www.legislation.gov.uk/ukpga/2005/5/section/863C |
| ITTOIA 2005 s.863D | Condition C: M's capital contribution is less than 25% of their expected disguised salary for the year | https://www.legislation.gov.uk/ukpga/2005/5/section/863D |
| SSCBA 1992 s.15 | Class 4 NIC charge on trading profits | HP §2 |
| TMA 1970 s.59A | Payments on account: two instalments, each 50% of prior-year liability | HP §2.B |
| Finance Act 2022 Sch 1 | Tax-year basis from 2024/25; basis-period reform | HP §2.A |

**2026/27 rates (verified gov.uk):**
- Class 4 NIC: 6% on profits £12,570 to £50,270; 2% above £50,270
- Income tax: personal allowance £12,570; basic 20% to £50,270; higher 40% to £125,140; additional 45% above
- Class 2 NIC: abolished from 6 April 2024 (no weekly charge)

---

## 3. HP lock items for this page

The existing house_positions.md covers LLP transparency at §1 and §6. Two items need flagging:

**Existing HP position used (§6):** "LLP salaried-member rules (ITTOIA 2005 s.863A onward) can re-characterise a 'fixed-share' member as an employee for tax if the three conditions (disguised salary, no significant influence, no significant capital contribution) are all met." This is sufficient coverage at awareness level.

**FLAG: HP EXTENSION NEEDED (salaried-member Condition B, BlueCrest July 2026):** The Supreme Court judgment HMRC v BlueCrest Capital Management (UK) LLP [2026] UKSC 18 (handed down 1 July 2026) is the first authoritative ruling on Condition B. It held that "significant influence" requires a legally enforceable governance right traceable to the LLP agreement or statute; informal managerial influence, however substantial, does not count. This is directly relevant to any salaried-member section on this page. The brief writer must treat the three-conditions at awareness level and flag that professional advice is needed; the specific BlueCrest holding is a current development that warrants a HP extension entry. See flag F-120 below.

**Existing HP position used (§2.A):** Tax-year basis from 2024/25; basis-period reform spread to 2027/28. Apply verbatim.

**Existing HP position used (§2.B):** POA: 31 Jan / 31 Jul, each 50% of prior-year income-tax-plus-Class-4, trigger £1,000 / 80%-at-source. Apply verbatim.

---

## 4. Competitor research (live URL check, 2026-07-09)

No competitor URLs were pre-selected in picks.yaml for A12. One WebSearch pass was run.

| Candidate | Liveness | Assessment |
|-----------|----------|------------|
| https://www.qualitycompanyformations.co.uk/blog/self-assessment-requirements-for-limited-liability-partnerships/ | LIVE (fetched) | Covers SA800/SA100 basics; thin on drawings-vs-profit, POA mechanics, salaried-member depth. Good benchmark to exceed. |
| https://www.whitefieldtax.co.uk/llp-salaried-members-tax-rules/ | NOT fetched (do not invent content) | Known to exist from search; do NOT cite content not fetched |
| https://mooreks.co.uk/insights/salaried-member-rules-for-llps-major-clarification-with-bluecrest-supreme-court-decision-july-2026-update/ | LIVE (fetched) | BlueCrest SC ruling; professional firm analysis; use for awareness note only |

**Differentiation:** competitors are thin on (a) drawings-vs-taxable-profit-share worked example with arithmetic, (b) POA double-bill mechanics for a first-year LLP member, (c) basis-period reform interaction for non-March year ends, (d) BlueCrest July 2026 development on Condition B. This page owns all four.

---

## 5. Page architecture

### Meta

**metaTitle (≤62 chars):** `Personal Tax for LLP Members: Profits, NIC and Self Assessment`  
Character count: 62. CHECK before commit.

**metaDescription (≤158 chars):** `LLP members pay income tax and Class 4 NIC on their profit share, not on what they draw. Here is how the self assessment system works for members.`  
Character count: 147. CHECK before commit.

**h1:** `Personal Tax for LLP Members: What You Actually Owe and When`

**summary (frontmatter):** LLP members are taxed on their allocated profit share for the tax year, not on the cash they draw from the partnership. This guide explains how profit allocation works, how to calculate your income tax and Class 4 NIC bill for 2026/27, how to handle payments on account, and when the salaried-member rules might change your treatment entirely.

**category:** `Sole Trader and Self Employment`

**keyTakeaways (4-6 bullets for frontmatter):**
- An LLP is transparent for tax: the LLP pays no income tax, and each member is taxed individually on their profit share under ITTOIA 2005 s.863.
- Your taxable amount is your allocated profit share for the tax year, not the cash you draw. A member with a £70,000 profit share but £50,000 drawings is taxed on £70,000.
- Class 4 NIC for 2026/27 is 6% on profits between £12,570 and £50,270, then 2% above. Class 2 NIC was abolished from 6 April 2024.
- Payments on account are two instalments due 31 January and 31 July, each 50% of the prior year's combined income tax and Class 4 bill, triggered where that bill exceeded £1,000.
- A fixed-share member can be re-characterised as an employee under the salaried-member rules (ITTOIA 2005 s.863A-863D) if all three conditions on disguised salary, influence, and capital are met simultaneously.
- The tax-year basis applies from 2024/25: all members are taxed on the profit allocated to the tax year to 5 April, regardless of the LLP's accounting date.

---

## 6. Body outline

### Introduction (~200 words)

Open with the core confusion: many new LLP members assume tax tracks their drawings. It does not. Frame the page as the ongoing compliance guide for someone already inside an LLP. One short paragraph: who this is for (professional partnerships, consultant LLPs, property LLPs, any member taxed as a partner). State the page covers tax mechanics, not the choice between LLP and limited company (link `limited-company-vs-llp-consultant`).

---

### Section 1: Why the LLP pays no tax (and you do) (~250 words)

**Heading:** How LLP tax transparency works

Explain ITTOIA 2005 s.863(1): the LLP's activities are treated as carried on by its members in partnership. The LLP is a "look-through" entity. It files a Partnership Tax Return (SA800) showing each member's share, but it does not pay income tax or Class 4 NIC itself.

Compare briefly: a limited company pays corporation tax, then the owner takes salary/dividends. An LLP has no corporation tax layer; instead each member pays income tax and NIC directly on their profit share.

State the SA800 + SA100 link: the LLP submits the SA800; each member receives their Partnership Statement (SA104S or SA104F) and uses those figures on their personal SA100. The member is responsible for their own tax return and payment.

---

### Section 2: Profit allocation vs drawings (the classic confusion) (~350 words)

**Heading:** Your taxable amount is your profit share, not what you draw

This is the number-one mistake. Walk through:

1. The LLP earns profit. The LLP agreement sets out how profit is allocated among members (by ratio, fixed salary element, etc.) per ITTOIA 2005 s.850.
2. That allocated share is the member's taxable income for the tax year, whether or not the cash has been drawn.
3. Drawing cash is simply a transfer of partnership funds the member already owns their share of. It does not create or reduce a tax liability.

**Box / callout (writer to format):** "If the LLP agreement allocates £70,000 of profit to you for 2026/27, you will be taxed on £70,000 even if you only drew £50,000. The undrawn £20,000 sits in your capital account, not outside the tax charge."

Flag the common timing mismatch: if the LLP's accounting period does not end on 31 March or 5 April, the profit allocated to a tax year must be apportioned from two sets of accounts (the tax-year-basis requirement from 2024/25, per §2.A). Recommend a 31 March year end to avoid annual apportionment.

---

### Section 3: Calculating the tax bill (2026/27 rates, worked example) (~450 words)

**Heading:** Calculating income tax and Class 4 NIC on an LLP profit share

Introduce the figures: income tax bands + Class 4 rates. State "Class 2 NIC was abolished from 6 April 2024; no weekly charge applies."

#### Worked example (mandatory): Member with £70,000 profit share, £50,000 drawings

**Given:** 2026/27 tax year. LLP profit share allocated = £70,000. Cash drawn = £50,000. No other income. One member, England/Wales.

**Step 1: Taxable income**
£70,000 profit share (not £50,000 drawings)

**Step 2: Income tax**
- Personal allowance: £12,570 (no tapering; income below £100,000)
- Taxable income: £70,000 - £12,570 = £57,430
- Basic-rate band (20%): £50,270 - £12,570 = £37,700 taxable at 20% = £7,540
- Higher-rate band (40%): £57,430 - £37,700 = £19,730 taxable at 40% = £7,892
- Total income tax: £7,540 + £7,892 = **£15,432**

**Step 3: Class 4 NIC (2026/27)**
- 6% on £12,570 to £50,270 = 6% x £37,700 = **£2,262**
- 2% on £50,270 to £70,000 = 2% x £19,730 = **£395**
- Total Class 4: **£2,657**

**Step 4: Total tax + NIC**
£15,432 + £2,657 = **£18,089**

**Step 5: Payments on account (assuming this is year 2+)**
Prior-year combined income tax + Class 4 = £18,089 (same profit, same year for illustration)
- First POA (31 January 2027): 50% x £18,089 = **£9,045**
- Second POA (31 July 2027): **£9,045**
- Balancing payment (31 January 2028): £0 (if profit unchanged)

Note: the drawings of £50,000 are irrelevant to every step above.

**Box:** "This member owes £18,089 in tax and NIC on a £70,000 profit share. They only drew £50,000 in cash. The remaining £20,000 has been taxed but sits undrawn in the capital account. This is why cash-flow planning matters for LLP members."

---

### Section 4: Self-assessment: registration, returns and deadlines (~300 words)

**Heading:** Self Assessment for LLP members: registration and deadlines

Cover:
- Each member must be registered for Self Assessment. If new to self-employment (or to this partnership), register by **5 October** after the first tax year.
- The LLP files the SA800 (Partnership Tax Return). Members receive a Partnership Statement. Members then file their personal SA100 using form SA104S (short) or SA104F (full/foreign income).
- Filing deadlines: paper return **31 October**; online return **31 January** after the tax year end.
- Payment deadline: balancing payment **31 January**. POAs due **31 January** and **31 July**.
- Late-filing penalty: **£100 automatic**, then escalating daily and further penalties per FA 2009 Sch 55.
- Cross-link to `self-assessment-payments-on-account-over-100000` for the POA reduction mechanics and high-bill scenarios.

---

### Section 5: Payments on account — the first-year trap (~300 words)

**Heading:** Payments on account and the first-year double bill

Explain the POA trigger: required where the prior year's combined income-tax-plus-Class-4 liability exceeded **£1,000** and less than **80%** was collected at source (per TMA 1970 s.59A, HP §2.B).

**First year:** no POAs due at 31 January (no prior-year liability). The balancing payment for year 1 is paid at the usual 31 January. But **simultaneously**, the first POA for year 2 is also due on that same 31 January — so the member faces a bill of 1.5x the year-1 tax liability. This is the well-known "double bill."

**Reducing POAs:** if profit is expected to fall in the current year, file form **SA303** or use HMRC online to reduce the POAs. Under-reducing and facing a shortfall incurs interest at HMRC's current rate.

**Example:** From the worked example above, if year 1 is the first year in the LLP:
- 31 January: year-1 balance £18,089 + first POA £9,045 = £27,134 due in one payment.
- 31 July: second POA £9,045.
- Cross-link to `self-assessment-payments-on-account-over-100000`.

---

### Section 6: Basis-period reform and non-March year ends (~200 words)

**Heading:** Accounting dates and the tax-year basis

From 2024/25 the tax-year basis applies to all unincorporated businesses, including LLP members (HP §2.A). Members are taxed on the profit allocated to the tax year ending 5 April.

If the LLP uses a 31 March or 5 April accounting date, the year's accounts map cleanly onto the tax year. If the LLP uses another date (for example 31 December), the member's profit for the 2026/27 tax year must be apportioned from two sets of accounts (1 April 2026 to 31 December 2026 plus 1 January 2027 to 5 April 2027), often using provisional figures.

The practical fix: LLPs with non-March year ends should consider switching to 31 March to avoid annual apportionment complexity. Any transition profit from 2023/24 spreads over five tax years to 2027/28.

Cross-link to `mtd-itsa-april-2026-deadline-mixed-member-partnerships` for the MTD ITSA dimension.

---

### Section 7: Salaried-member rules — awareness section (~350 words)

**Heading:** Could you be taxed as an employee? The salaried-member rules

Start with the policy: ITTOIA 2005 s.863A (inserted by Finance Act 2014) was introduced to prevent LLPs using "member" status to avoid PAYE and NIC for people who are, in substance, employees. If all three conditions below are met simultaneously, the member is treated as an employee for income tax and NIC purposes; their share of profit is treated as employment income, not trading profit.

**Condition A (s.863B) — Disguised salary:** at least 80% of the expected payments to the member for their services in the tax year are "disguised salary" — meaning they are fixed, or vary without reference to the LLP's overall profits or losses. A member on a fixed monthly draw regardless of how the LLP performs is likely to fail this condition.

**Condition B (s.863C) — No significant influence:** the member does not have significant influence over the affairs of the LLP. Influence means legally enforceable governance rights under the LLP agreement — not informal management authority. The Supreme Court confirmed in HMRC v BlueCrest Capital Management (UK) LLP [2026] UKSC 18 that this requires a right traceable to the LLP agreement or statute. A senior fee-earner with no formal governance rights may fail even if they manage large portfolios.

**Condition C (s.863D) — Insufficient capital:** the member's capital contribution to the LLP is less than 25% of their expected disguised salary for the year. A member with a modest capital account relative to their fixed draw is at risk.

**All three must be met simultaneously.** If any one condition is not met, the salaried-member rules do not apply and the member is taxed as a partner.

**Practical flags for members:**
- Review the LLP agreement for voting and governance rights (Condition B).
- Check that pay is linked to overall LLP profitability, not just personal performance (Condition A).
- Consider whether a capital contribution above 25% of annual pay removes Condition C.

**Writer note:** keep this section at awareness level. Direct readers to professional advice for a specific LLP agreement review. Do not draft model LLP agreement clauses.

---

### Section 8: MTD ITSA (brief, link out) (~100 words)

**Heading:** Making Tax Digital and LLP members

From April 2026, LLP members with total gross income (trading plus property) above **£50,000** are within Making Tax Digital for Income Tax. They must keep digital records and submit quarterly updates to HMRC alongside the annual SA100.

The £30,000 threshold follows in April 2027, £20,000 in April 2028.

This adds quarterly obligations on top of the existing POA + annual return cycle.

Cross-link: `mtd-itsa-april-2026-deadline-mixed-member-partnerships` covers the partnership-specific MTD rules in detail.

---

### Section 9: Class 4 across multiple trades (~80 words)

**Heading:** Class 4 NIC if you have other self-employed income

An LLP member who also has other self-employed income (a separate sole-trader business, for example) is liable to Class 4 NIC on both profit streams. The aggregate Class 4 is capped: the 6% band applies to total profits up to £50,270. If you have two trading sources, total Class 4 is not simply doubled.

Cross-link: `class-4-ni-multiple-trades` covers the aggregation rules in detail.

---

### Section 10: Summary / call to action (~150 words)

Recap: LLP transparency, profit-share (not drawings) as taxable income, income tax + Class 4 at 2026/27 rates, SA800/SA100 interplay, POA first-year double-bill, basis-period reform, salaried-member awareness.

Close with an accountancy hook: managing the tax calendar for an LLP member is materially different from being a sole trader or a PAYE employee. An accountant can model your profit-share allocation, prepare the SA100, handle POA reduction claims and check whether the salaried-member rules apply to your LLP agreement.

LeadForm auto-injected at footer (do not duplicate in body).

---

## 7. FAQ drafts (10 full drafts)

**writer instruction:** these are the 10 FAQs. Write them verbatim into the `faqs:` frontmatter array. Each answer must be 40-100 words. No em-dashes. Schema will be auto-generated from the frontmatter array.

---

**FAQ 1**
Q: Am I taxed on the money I draw from the LLP or on my profit share?

A: You are taxed on your allocated profit share, not on the cash you draw. The LLP agreement determines how profit is divided among members each year under ITTOIA 2005 s.850. If your share is £70,000 but you only draw £50,000, your taxable income is still £70,000. The undrawn £20,000 sits in your capital account but has already been taxed.

---

**FAQ 2**
Q: Does an LLP pay tax itself?

A: No. An LLP that carries on a trade is transparent for income tax purposes under ITTOIA 2005 s.863. The LLP pays no income tax. It files a Partnership Tax Return (SA800) showing each member's share, and each member pays income tax and Class 4 NIC individually through their own Self Assessment return.

---

**FAQ 3**
Q: What is Class 4 NIC and how much will I pay as an LLP member?

A: Class 4 NIC is charged on trading profits above the lower profits limit. For 2026/27 the rate is 6% on profits between £12,570 and £50,270, then 2% on profits above £50,270. On a £70,000 profit share, Class 4 NIC is approximately £2,657. Class 2 NIC was abolished from 6 April 2024, so you no longer pay a weekly flat charge.

---

**FAQ 4**
Q: What are payments on account and do I need to make them?

A: Payments on account are two advance payments toward the following year's tax bill, due on 31 January and 31 July. Each payment is 50% of the previous year's combined income tax and Class 4 NIC bill. You must make them if that previous bill exceeded £1,000 and less than 80% was collected at source. Most LLP members with meaningful profit shares will need to make them.

---

**FAQ 5**
Q: What is the "double bill" in the first year of being an LLP member?

A: In the first year you have no prior-year liability, so no payments on account are due during the year. But on the following 31 January you pay the full balancing payment for year one AND the first payment on account for year two simultaneously. For a member with a £70,000 profit share this could mean roughly £27,000 due in a single payment. Building a tax reserve from day one avoids a cash flow shock.

---

**FAQ 6**
Q: Do I need to file my own tax return if the LLP files a Partnership Tax Return?

A: Yes. The LLP's SA800 Partnership Tax Return is separate from your personal return. The SA800 shows each member's profit share, and you receive a Partnership Statement. You include those figures on your personal SA100 Self Assessment return, adding any other income you have. Both returns have the same deadlines: paper by 31 October, online by 31 January after the tax year ends.

---

**FAQ 7**
Q: What are the salaried-member rules and could they affect me?

A: The salaried-member rules (ITTOIA 2005 s.863A, introduced in Finance Act 2014) treat a member as an employee for tax if three conditions are all met: at least 80% of their pay is fixed regardless of LLP profits (Condition A), they have no significant legally enforceable governance rights over the LLP (Condition B), and their capital contribution is less than 25% of their annual fixed pay (Condition C). If all three apply, you are taxed under PAYE rather than Self Assessment. A qualified adviser should review your LLP agreement.

---

**FAQ 8**
Q: How does basis-period reform affect LLP members?

A: From the 2024/25 tax year, LLP members are taxed on the profit allocated to the tax year ending 5 April, regardless of the LLP's accounting date. If the LLP uses a 31 March or 5 April year end, the accounts map cleanly to the tax year. If the LLP uses a different year end, such as 31 December, the member's profit must be apportioned from two sets of accounts each year, often using provisional figures. Switching to a 31 March year end avoids this complexity.

---

**FAQ 9**
Q: What happens if I am also a sole trader as well as an LLP member?

A: Your LLP profit share and your sole-trader profit are each trading income for income tax purposes and are added together on your SA100. Class 4 NIC is also charged on the combined total, but the 6% band (up to £50,270) applies once across all trading sources, not separately for each. If both streams push your total profits above £50,270, Class 4 applies at 2% on the excess. See our guide on Class 4 NIC for multiple trades.

---

**FAQ 10**
Q: Can I reduce my payments on account if my profit share drops?

A: Yes. If you expect your LLP profit share to be lower than the previous year, you can apply to reduce your payments on account by filing form SA303 or using your HMRC online account before each due date. If you reduce them too far and your actual bill is higher, HMRC will charge interest on the shortfall. Keep a provisional estimate of your profit allocation from the LLP before each payment date and update the reduction claim if it changes.

---

**FAQ 11**
Q: Is a partner's salary or guaranteed minimum payment part of their profit share?

A: In many LLP agreements, a "partner's salary" or "guaranteed minimum payment" is simply an allocation of profit, not a separate salary from employment. It is still part of the member's profit share for tax purposes and is taxed accordingly under ITTOIA 2005 s.850. This is different from the salaried-member rules, which only apply if all three statutory conditions are met. Unless the salaried-member rules apply, all payments from the LLP to the member are treated as profit distributions, not employment income.

---

**FAQ 12**
Q: When do I need to register for Self Assessment as a new LLP member?

A: You must register for Self Assessment by 5 October after the end of the first tax year in which you were a member. So if you joined the LLP during the 2026/27 tax year (ending 5 April 2027), you must register by 5 October 2027. You register online via HMRC's website as a partner in a partnership. Late registration can result in a penalty, and you will still owe tax from the date you joined, so register promptly and ask the LLP's nominated partner to add you to the SA800.

---

## 8. Cross-link map

| Target slug | Anchor text suggestion | Relationship |
|------------|----------------------|-------------|
| `limited-company-vs-llp-consultant` | the choice between a limited company and an LLP | Upstream: decision page; link from intro |
| `self-assessment-payments-on-account-over-100000` | payments on account when your bill exceeds £100,000 | POA mechanics, high-bill reduction |
| `mtd-itsa-april-2026-deadline-mixed-member-partnerships` | MTD ITSA rules for mixed-member partnerships | MTD section, basis reform |
| `class-4-ni-multiple-trades` | Class 4 NIC across multiple trades | Multi-trade Class 4 section and FAQ 9 |

All four slugs confirmed live on disk (2026-07-09).

---

## 9. Schema

Use `schema: ""` in frontmatter; FAQ schema will be injected by the site build from the `faqs:` array. Do not add JSON-LD manually. Verify at build time: FAQ schema count in built HTML must equal the number of FAQs in frontmatter.

---

## 10. Image guidance

**altText:** `A UK accountant explaining LLP profit allocation and self assessment obligations to two members of a professional partnership`

Use a professional accountancy / meeting image from Pexels. No AI-generated images.

---

## 11. Quality gates (six-check floor)

- [ ] Zero em-dashes in body (use commas, parentheses, full stops, middle dots)
- [ ] Zero utility CSS classes in body (semantic HTML only)
- [ ] FAQ schema count in built HTML equals 12 (the number of faqs: entries)
- [ ] metaTitle ≤62 chars: `Personal Tax for LLP Members: Profits, NIC and Self Assessment` = 62 chars. PASS
- [ ] metaDescription ≤158 chars: 147 chars. PASS
- [ ] All four internal cross-links resolve to existing pages (confirmed above)
- [ ] Body word count 2,800-3,500

---

## 12. HP extension flag and site-wide flags

**F-120 — HOUSE_POSITION_EXTENSION (salaried-member Condition B, BlueCrest SC July 2026)**

The Supreme Court judgment HMRC v BlueCrest Capital Management (UK) LLP [2026] UKSC 18 (1 July 2026) is the first authoritative ruling on Condition B of the salaried-member rules. The Court held that "significant influence" requires a right that is (a) traceable to an identifiable contractual, statutory or other legal source in the LLP agreement, and (b) has practical and commercial substance in the conduct of the LLP's affairs — not informal managerial authority however substantial. The House Positions §6 entry on salaried-member rules does not yet include this holding. HP extension recommended: add to §6 under "LLP salaried-member rules" a sub-note recording BlueCrest [2026] UKSC 18, the legal-source requirement, and the governance-over-activities principle. Action: manager applies at Stage 2b gate or pre-wave-close.

**F-121 — EXISTING_PAGE_STALE (limited-company-vs-llp-consultant BADR rate)**

The page `limited-company-vs-llp-consultant` (read 2026-07-09) states in keyTakeaways: "Business Asset Disposal Relief gives company shareholders a 14% CGT rate on the first £1 million of gains in 2025/26, rising to 18% from April 2026." The rising to 18% is now current (from 6 April 2026, HP §5). The 14% figure should be date-tagged as 2025/26-only; the current live rate is 18% for disposals from 6 April 2026. Light factual update needed in next rewrite cycle.

---

## 13. Verification summary

| Item | Source | Status |
|------|--------|--------|
| ITTOIA 2005 s.863 (LLP transparency) | legislation.gov.uk, fetched 2026-07-09 | CONFIRMED |
| ITTOIA 2005 s.863A (salaried-member trigger) | legislation.gov.uk, fetched 2026-07-09 | CONFIRMED |
| ITTOIA 2005 s.863B (Condition A: 80% disguised salary) | legislation.gov.uk, fetched 2026-07-09 | CONFIRMED |
| ITTOIA 2005 s.863C (Condition B: significant influence) | legislation.gov.uk, fetched 2026-07-09 | CONFIRMED |
| ITTOIA 2005 s.863D (Condition C: capital < 25%) | legislation.gov.uk, fetched 2026-07-09 | CONFIRMED |
| Class 4 NIC 6%/2%, LPL £12,570, UPL £50,270, 2026/27 | gov.uk, fetched 2026-07-09 | CONFIRMED |
| Income tax bands / personal allowance 2026/27 | HP §2 (verified 2026-06-12) | CONFIRMED |
| POA mechanics (TMA 1970 s.59A) | HP §2.B | CONFIRMED |
| Basis-period reform (FA 2022 Sch 1) | HP §2.A | CONFIRMED |
| s.863 inserted by Limited Liability Partnerships Act 2000 / ITTOIA 2005 | Legislation confirmed | CONFIRMED |
| BlueCrest [2026] UKSC 18: Condition B clarification | mooreks.co.uk professional analysis + Baker McKenzie + Latham (search results) | CONFIRMED — new development; writer note in §7 |
| MTD ITSA thresholds (£50k/£30k/£20k) | HP §9 (verified 2026-06-12) | CONFIRMED |

**Salaried-member HP lock status:** Existing HP §6 covers the three conditions at awareness level. BlueCrest July 2026 is a NEW development post-HP-lock date (2026-06-12). HP extension flagged as F-120. Writer must treat salaried-member section at awareness level only; do not assert specific outcomes without noting that BlueCrest changes the Condition B analysis.

---

## 14. Writer instructions

1. Follow the body outline above section by section. Do not reorder or skip sections.
2. The worked example in Section 3 is mandatory and must use the exact figures above (£70,000 profit share / £50,000 drawings, 2026/27 rates).
3. No em-dashes anywhere in body or frontmatter.
4. Use semantic HTML for any callout or table (not utility CSS classes).
5. The salaried-member section (Section 7) is awareness only. Include the BlueCrest [2026] UKSC 18 reference as a "current development" note. Do not draft LLP agreement clauses or give a specific outcome. Direct to professional advice.
6. The LeadForm is auto-injected at the footer. Do not add a duplicate lead form or service pitch in the body. A short CTA paragraph at the end of Section 10 is fine.
7. Run all six quality gate checks before marking done in the tracker.
8. File goes to: `Generalist/web/content/blog/personal-tax-for-llp-members-uk.md`
9. Frontmatter must include: title, slug, canonical, date, author, category, metaTitle, metaDescription, altText, image, imageCredit, h1, summary, keyTakeaways, faqs, schema.
