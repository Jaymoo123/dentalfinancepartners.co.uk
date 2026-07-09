# Brief: How to Set Up a Business Partnership in the UK

**Pick:** A5  
**Slug:** `how-to-set-up-a-business-partnership-uk`  
**Wave:** Generalist Wave 4  
**Category:** Sole Trader and Self Employment  
**Status:** RUN-ready  
**Date:** 2026-07-09  

---

## Collision boundary (BINDING)

Scope is ordinary-partnership FORMATION only: nominated partner, HMRC registration + SA800, partnership agreement contents, joint liability warning, VAT/bank/records setup. Do NOT cover:

- Structure comparison (limited-company-vs-llp-consultant owns that)
- LLP (mentioned only as an upgrade path, one sentence)
- MTD deferral mechanics (mtd-itsa-april-2026-deadline-mixed-member-partnerships owns that)
- Partner exit / buy-in CGT (HP §6, out of scope for this formation guide)

---

## Competitor URLs — LIVENESS RESULT

Both picks.yaml competitor URLs returned HTTP 404 on 2026-07-09:

- https://informi.co.uk/business-administration/setting-up-a-partnership — **DEAD (404)**
- https://countingup.com/resources/what-business-partnership/ — **DEAD (404)**

**No live competitor URLs for A5.** Brief is built from primary sources (gov.uk, legislation.gov.uk) and house positions. Flag F-50 raised in wave4_site_wide_flags.md.

---

## Primary sources verified 2026-07-09

| Source | What it confirms |
|---|---|
| https://www.legislation.gov.uk/ukpga/1890/39/section/1 | Partnership Act 1890 s.1(1): "Partnership is the relation which subsists between persons carrying on a business in common with a view of profit." |
| https://www.legislation.gov.uk/ukpga/2005/5/section/850 | ITTOIA 2005 s.850: partner's share determined "in accordance with the firm's profit-sharing arrangements during that period" |
| https://www.gov.uk/set-up-business-partnership | Nominated partner "responsible for managing the partnership's tax returns and keeping business records"; must register with HMRC |
| https://www.gov.uk/set-up-business-partnership/register-your-partnership | Nominated partner role confirmed; registration with HMRC required |
| https://www.gov.uk/register-for-self-assessment/self-employed | "You must tell HMRC by 5 October [after the end of the tax year of start] if you need to complete a tax return" — penalty if late |
| HP §1 | Partnership tax transparency; joint and several liability |
| HP §2 | Class 4 NIC 6%/2%; Class 2 removed from 6 Apr 2024; income tax rates and bands |
| HP §6 | ITTOIA s.850 profit allocation; SA800; partnership CGT/SDLT change-of-partner mechanics |
| HP §7 | VAT registration £90,000 threshold |

---

## House-position anchors (from house_positions.md)

- **HP §1:** Partnership is tax-transparent; each partner pays income tax on their profit share; unlimited joint and several liability; contrast with LLP (limited liability, Companies House registered) and limited company.
- **HP §2:** Income tax 2026/27 — personal allowance £12,570; basic 20% to £50,270; higher 40% to £125,140; additional 45% above. Class 4 NIC: 6% on profits £12,570 to £50,270, then 2% above. Class 2 NIC removed from 6 April 2024 (profits at or above Small Profits Threshold treated as paid).
- **HP §6:** ITTOIA 2005 s.850 governs profit-share allocation. The firm files an SA800 (partnership return); each partner files individual SA return with SA104 pages. Nominated partner is legally responsible for the SA800 filing. On partner changes: income-tax allocation, CGT on goodwill (SP D12), SDLT only if firm holds land (FA 2003 Sch 15).
- **HP §7:** VAT registration when taxable turnover exceeds £90,000 in any rolling 12 months.

No new HP lock needed. All positions within existing locks.

---

## Page architecture

### H1
How to Set Up a Business Partnership in the UK

### Meta drafts

**metaTitle** (57 chars): How to Set Up a Business Partnership in the UK  
**metaDescription** (153 chars): Step-by-step guide to forming a UK business partnership: nominated partner, HMRC registration, SA800, partnership agreement, joint liability and VAT.

### Summary (for frontmatter `summary` field)
Setting up a business partnership in the UK is straightforward but carries one risk most new partners overlook: unlimited joint and several liability. This guide covers every formation step, from choosing a nominated partner and registering with HMRC, to drafting a partnership agreement, filing your first SA800 and getting your records, VAT and bank account in order.

---

## Content specification

### Intro (80-120 words)

Open with the definition from statute: Partnership Act 1890 s.1 — "the relation which subsists between persons carrying on a business in common with a view of profit." Two or more people, no registration at Companies House required, no fee. The partnership is tax-transparent: it does not pay income tax itself; each partner is taxed individually on their profit share (ITTOIA 2005 s.850). The formation steps take a few days; the biggest risk is not the admin but the liability exposure. Cover both clearly.

### Section 1: What a general partnership is (and what it is not)

**Statutory definition:** Partnership Act 1890 s.1(1). Confirmed at legislation.gov.uk 2026-07-09.

**Key characteristics to state:**
- Two or more people (no upper limit by statute for most partnerships)
- Carrying on a business in common with a view of profit
- No registration at Companies House (unlike a limited company or LLP)
- No fee to set up
- **Tax-transparent:** the firm files a tax return (SA800) but pays no income tax; each partner is taxed individually on their share of profits
- **Unlimited joint and several liability:** each partner is personally liable for all the debts of the partnership, including debts run up by the other partners in the ordinary course of business (PA 1890 s.9). This is the most important risk to flag upfront.

**What it is not:**
- An LLP (limited liability partnership): LLP members have limited liability and the LLP is a separate legal person registered at Companies House under the Limited Liability Partnerships Act 2000. One sentence only; cross-link to limited-company-vs-llp-consultant for the comparison.
- A limited company: a separate legal person, limited liability, corporation tax.

### Section 2: Formation checklist (step-by-step)

Present as a numbered checklist. Writers use `<ol>` / `<li>` in HTML body.

**Step 1 — Choose a business name**

Rules (Partnership Act 1890 does not restrict names beyond the Business Names Act requirements now in Companies Act 2006 Part 41):
- Cannot use "limited", "Ltd", "LLP" or "plc" in the name
- Cannot imply a connection with a government body or use a sensitive word without approval
- If trading under a name other than the partners' own surnames, display the partners' names and a business address on stationery and at the place of business (Companies Act 2006 s.1201+)

**Step 2 — Draft a partnership agreement**

Not legally required, but strongly recommended. Without one, the Partnership Act 1890 default rules apply, which include equal profit sharing regardless of capital or effort (PA 1890 s.24) and unanimous consent required for a new partner.

Key clauses to cover (see Section 3 for full detail):
- Profit-sharing ratio
- Capital contributions
- Decision-making and voting
- What happens if a partner leaves or dies
- Dispute resolution

**Step 3 — Nominate a nominated partner**

One partner must be designated as the "nominated partner" before registering with HMRC. The nominated partner is legally responsible for:
- Registering the partnership with HMRC
- Filing the partnership tax return (SA800) each year
- Keeping the partnership's business records
- Notifying HMRC of changes (new partner, partner leaving, partnership ceasing)

Any partner can be the nominated partner. The role carries legal responsibility, so most partnerships choose the most administratively organised partner, or the one with the highest economic stake.

**Step 4 — Register with HMRC**

**Who registers:** the nominated partner registers the partnership for Self Assessment on behalf of the firm. Each partner also registers individually for Self Assessment (if not already registered) to file their personal return including the partnership income.

**Deadline:** by **5 October after the end of the first tax year in which the partnership trades**. For a partnership that starts trading in the 2026/27 tax year (i.e. from 6 April 2026 to 5 April 2027), the registration deadline is **5 October 2027**. Missing this deadline risks a late-filing penalty. (Source: gov.uk Self Assessment registration guidance, verified 2026-07-09.)

**How:** register online via the HMRC Self Assessment service (the nominated partner uses form SA401 to register the partnership; each individual partner registers using SA1 or SA401 as appropriate). HMRC then issues a partnership Unique Taxpayer Reference (UTR) for the SA800, and each partner receives their own personal UTR for their individual SA return.

**Step 5 — Open a business bank account**

A general partnership is not legally required to have a separate business bank account (only limited companies have that obligation). In practice, keeping business and personal finances separate is essential for:
- Accurate profit calculation and tax returns
- HMRC compliance (clear business-income records)
- Partnership record-keeping under TMA 1970

Most high-street banks offer business current accounts for partnerships. The account will typically be in the partnership name and require all partners' identification.

**Step 6 — Set up bookkeeping records**

A partnership must keep records adequate to complete the SA800 accurately. HMRC expects records to be kept for **at least 5 years after the 31 January filing deadline** for the relevant tax year (TMA 1970 s.12B). Records to keep:
- All income received (invoices, bank statements)
- All business expenditure (receipts, invoices)
- VAT records if registered
- The profit-sharing arrangement in writing (to support allocation on the SA800)

**Step 7 — Consider VAT registration**

Register for VAT if the partnership's taxable turnover in any rolling 12-month period exceeds **£90,000** (VATA 1994, HP §7). This is the partnership's combined turnover, not each partner's individual share. Voluntary registration is possible below the threshold.

**Step 8 — Notify HMRC of the profit-sharing arrangement**

The SA800 requires the nominated partner to state each partner's profit share for the year. Keep a written record of the profit-sharing ratio (and any changes in the year) to support the return. Profit is allocated per the arrangement for the period (ITTOIA 2005 s.850): if the ratio changes mid-year, apportion accordingly.

### Section 3: The partnership agreement — what to include

A partnership agreement overrides the PA 1890 default rules. Without one, the Act implies:
- Profits and losses split equally (s.24(1))
- Each partner has an equal say in management (s.24(5))
- No partner may be expelled (s.25)
- No new partner admitted without unanimous consent (s.24(7))
- The partnership dissolves on the death or bankruptcy of any partner (s.33)

These defaults are usually wrong for a real business. Every partnership should have a written agreement.

**Key clauses:**

| Clause | Why it matters |
|---|---|
| Profit-sharing ratio | Overrides the equal-split default; must match the ratio reported on the SA800 |
| Capital contributions | Records what each partner put in; governs return of capital on dissolution |
| Drawings policy | Sets how much each partner can take out before profit is formally allocated |
| Decision-making | Simple majority, supermajority or unanimous for defined decisions |
| New partners | Consent threshold for admitting a new equity partner |
| Partner exit | Notice period, valuation of the outgoing partner's share, goodwill treatment |
| Death or incapacity | Whether the partnership continues or dissolves |
| Dispute resolution | Mediation or arbitration before litigation |
| Non-compete | Geographic/temporal scope post-exit |
| Accounts and records | Who prepares accounts, when, and who has access |

A solicitor should draft or review the agreement. The cost is modest relative to the disputes it prevents.

### Section 4: Tax and NIC — how partners are taxed

**The transparency principle:** the partnership pays no income tax. The SA800 shows total profit and allocates it to partners. Each partner then pays:

- **Income tax** on their profit share at their marginal rate (HP §2): personal allowance £12,570, basic 20%, higher 40%, additional 45% (England, Wales, Northern Ireland; Scotland has its own bands)
- **Class 4 NIC** (HP §2): 6% on profits £12,570 to £50,270, then 2% above £50,270 for 2026/27. Each partner calculates Class 4 on their individual profit share.
- **Class 2 NIC:** removed from 6 April 2024. Partners with profits at or above the Small Profits Threshold are treated as having paid Class 2 and retain state-pension entitlement. No weekly Class 2 charge.

**Self Assessment obligations:**

- The **nominated partner** files the **SA800** (Partnership Tax Return) by 31 January following the tax year (online; 31 October for paper).
- **Each partner** files an individual SA tax return including **SA104 supplementary pages** (Partnership income) showing their profit share.
- Partners register for Self Assessment by **5 October** after the first tax year of trading.
- **Payments on account:** where a partner's income-tax-plus-Class-4 liability exceeds £1,000 and less than 80% is collected at source, payments on account are required: 50% of the prior year's liability on 31 January, 50% on 31 July (TMA 1970 s.59A, HP §2.B). The first-year "double bill" (balancing payment for year 1 plus first POA) on 31 January is a common cash-flow shock for new partners.

**Making Tax Digital for Income Tax:** MTD ITSA will apply to partners with gross income from the partnership above the relevant threshold. The rollout is: £50,000 from 6 April 2026, £30,000 from 6 April 2027, £20,000 from 6 April 2028. Mixed-member partnerships have specific rules — see the separate guide on MTD for mixed-member partnerships.

### Section 5: The joint and several liability risk

Flag this prominently. It is the most significant structural difference from a limited company or LLP.

Under Partnership Act 1890 s.9, partners are jointly liable for the debts and obligations of the firm. "Joint and several" means:
- A creditor can sue any one partner for the full amount of the firm's debt
- That partner then has a right of contribution from the others, but must pursue it separately
- If one partner runs up a business debt in the ordinary course of the partnership's trade, all partners are on the hook for it

**Practical implications:**
- Personal assets (home, savings) are at risk if the partnership cannot pay its debts
- Each partner is exposed to their co-partners' actions
- Consider professional indemnity insurance and employer's liability insurance (if staff are employed)
- Consider whether an LLP (limited liability, Companies House registered) or limited company is more appropriate given the liability profile

One short paragraph only on LLP as the upgrade path; cross-link to limited-company-vs-llp-consultant.

### Section 6: Worked example — two-partner startup, 60/40 split

**Scenario:** Alex and Beth start a management consultancy partnership on 6 April 2026. Profit-sharing: Alex 60%, Beth 40%. Tax year 2026/27. Partnership profit for the year: £90,000.

**Step 1 — Registration timeline**

| Event | Date |
|---|---|
| Partnership starts trading | 6 April 2026 |
| Nominated partner (Alex) registers partnership with HMRC (SA401) | By 5 October 2027 (statutory deadline) |
| Alex and Beth each register individually for Self Assessment | By 5 October 2027 |
| First SA800 (partnership return) due | 31 January 2028 (online) |
| First individual SA returns (Alex + Beth) with SA104 pages | 31 January 2028 |
| First balancing payment (tax + Class 4 owed for 2026/27) | 31 January 2028 |
| First payment on account (50% of 2026/27 liability, toward 2027/28) | 31 January 2028 |
| Second payment on account | 31 July 2028 |

In practice, both partners should register and put HMRC notification on their calendar for September 2027 at the latest, not October.

**Step 2 — Profit allocation**

Partnership profit: £90,000  
Alex (60%): £54,000  
Beth (40%): £36,000

Each partner's share is reported on the SA800. Alex files SA104 showing £54,000 partnership income; Beth files SA104 showing £36,000.

**Step 3 — Alex's income tax and Class 4 NIC (2026/27)**

Alex has no other income.

*Income tax:*
- Personal allowance: £12,570 — tax nil
- Basic-rate band: £12,571 to £50,270 (£37,700 at 20%) = £7,540
- Higher-rate band: £50,271 to £54,000 (£3,730 at 40%) = £1,492
- Total income tax: **£9,032**

*Class 4 NIC:*
- 6% on £12,571 to £50,270 (£37,700 x 6%) = £2,262
- 2% on £50,271 to £54,000 (£3,730 x 2%) = £75
- Total Class 4 NIC: **£2,337**

Alex's total liability for 2026/27: **£11,369**

*Payments on account for 2027/28 (assuming similar profit expected):*
- 31 January 2028: £9,032 (balancing payment) + £5,684.50 (first POA = 50% x £11,369) = **£14,716.50**
- 31 July 2028: £5,684.50 (second POA)

**Step 4 — Beth's income tax and Class 4 NIC (2026/27)**

Beth has no other income.

*Income tax:*
- Personal allowance: £12,570 — tax nil
- Basic-rate band: £12,571 to £36,000 (£23,430 at 20%) = **£4,686**
- Total income tax: **£4,686**

*Class 4 NIC:*
- 6% on £12,571 to £36,000 (£23,430 x 6%) = **£1,406**
- Total Class 4 NIC: **£1,406**

Beth's total liability for 2026/27: **£6,092**

**Tax-year basis note:** from 2024/25 the tax-year basis applies; a 31 March or 5 April accounting year end avoids annual apportionment (HP §2.A). Alex and Beth adopt a 5 April year end.

### Section 7: Brief VAT and records checklist

- **VAT:** register when combined partnership taxable turnover exceeds £90,000 in any rolling 12 months (HP §7). The VAT registration is in the partnership's name. If registered, MTD for VAT applies (digital records and MTD-compatible software for all returns since April 2022).
- **Bank account:** open in the partnership name; both partners typically required as signatories.
- **Records:** keep income, expenditure, VAT records and evidence of the profit-sharing arrangement for at least 5 years after the 31 January filing deadline for the relevant year (TMA 1970 s.12B).
- **Insurance:** professional indemnity insurance (professional services partnerships), employer's liability insurance if employing staff (compulsory under the Employers' Liability (Compulsory Insurance) Act 1969), public liability insurance.

---

## FAQ drafts (10 questions, full copy)

Writers paste these into the `faqs:` frontmatter array. No em-dashes. Answers 60-120 words each.

---

**Q1: Do I need to register a business partnership with Companies House?**

No. A general business partnership does not need to register at Companies House. There is no fee and no registration form to file there. The only formal registration is with HMRC for Self Assessment, which the nominated partner handles. This is one of the main differences from a limited company or LLP: both of those must register at Companies House. If you later decide to convert to an LLP, you would then need to register at Companies House under the Limited Liability Partnerships Act 2000.

---

**Q2: What is a nominated partner and why does it matter?**

The nominated partner is the person legally responsible for registering the partnership with HMRC, filing the annual SA800 partnership tax return, and keeping the partnership's business records. Every partnership must have one. If the nominated partner fails to file the SA800 on time, they (not the partnership as an abstract entity) face the late-filing penalty. Choose the nominated partner carefully: the role is administrative but carries real legal responsibility. Any partner can hold it, and you can change it by notifying HMRC, but continuity is easier than frequent switches.

---

**Q3: When do I need to register a new partnership with HMRC?**

Register by **5 October after the end of the first tax year in which the partnership trades**. So if your partnership starts on any date in the 2026/27 tax year (6 April 2026 to 5 April 2027), the deadline to notify HMRC is 5 October 2027. Missing this deadline risks a penalty. In practice, register as soon as the partnership starts trading rather than waiting for the deadline. The nominated partner registers the partnership using form SA401; each partner registers individually for Self Assessment using SA1 (if not already registered).

---

**Q4: What is an SA800 and who needs to file it?**

The SA800 is the Partnership Tax Return. It shows the partnership's total income and profit for the year and allocates each partner's share. The nominated partner files it by 31 January following the tax year (for an online return) or 31 October (for paper). Separately, each partner files their own Self Assessment tax return, including SA104 supplementary pages showing their individual profit share from the partnership. Two sets of returns are therefore required each year: one SA800 for the firm, and one individual return per partner.

---

**Q5: How do partners pay tax on their profit share?**

Each partner pays income tax and Class 4 National Insurance on their own share of the partnership's profit, reported through their personal Self Assessment return. The partnership itself pays no income tax. Income tax runs at 20% (basic rate), 40% (higher rate) and 45% (additional rate), after the personal allowance of £12,570. Class 4 NIC for 2026/27 is 6% on profits from £12,570 to £50,270 and 2% above that. Class 2 NIC was removed from 6 April 2024: partners with profits above the Small Profits Threshold are treated as having paid it and keep their state-pension entitlement.

---

**Q6: Do partners have to pay NIC if their profit share is small?**

Class 4 NIC only applies where profits exceed the lower profits limit (£12,570 for 2026/27), so a partner with a small profit share pays little or no Class 4. Class 2 NIC was abolished from 6 April 2024 for profits at or above the Small Profits Threshold (£6,845 for 2025/26), so there is no fixed weekly charge to pay. Partners with profits below the Small Profits Threshold can still pay voluntary Class 2 contributions to protect their state-pension record. It is worth checking this if one partner's share is deliberately kept low.

---

**Q7: Is a written partnership agreement legally required?**

No. You can operate a partnership without a written agreement. If you do not have one, the Partnership Act 1890 applies by default, and some of those defaults are unhelpful: profits split equally regardless of input, any partner can dissolve the partnership by giving notice, and the partnership dissolves automatically on the death of a partner. A written agreement overrides these defaults and sets out your own rules on profit splits, decision-making, what happens if a partner leaves, and dispute resolution. The cost of drafting one is modest relative to the disputes it prevents. Every partnership of any significance should have one.

---

**Q8: What happens if a partner leaves the partnership?**

When a partner leaves, three things happen at once. First, the income-tax profit allocation changes from the date of departure. Second, if the leaving partner receives payment for their share of the goodwill or assets, that is a capital disposal for CGT purposes (under HMRC Statement of Practice D12, a change in a partner's fractional share of the firm's chargeable assets is treated as a part-disposal). Whether Business Asset Disposal Relief applies depends on the leaving partner's individual circumstances. Third, if the partnership holds land, Stamp Duty Land Tax may arise on the change in interest (Finance Act 2003 Schedule 15). These are three separate calculations. Take advice on a partner exit; it is rarely simple.

---

**Q9: Can a partnership register for VAT?**

Yes. A partnership registers for VAT in the partnership's name when its combined taxable turnover exceeds £90,000 in any rolling 12 months, or when it expects to exceed that in the next 30 days. The VAT registration is separate from the partners' personal tax registrations. Once registered, Making Tax Digital for VAT applies: the partnership must keep digital VAT records and submit returns using MTD-compatible software. Voluntary registration is possible below the threshold, which may be worthwhile if the partnership incurs significant VAT on its costs and has mainly VAT-registered business customers.

---

**Q10: What is the difference between a general partnership and an LLP?**

A general partnership is not a separate legal person and offers no liability protection: each partner is personally liable for all the firm's debts, including debts run up by the other partners. An LLP (limited liability partnership) is a separate legal entity registered at Companies House; members' liability is limited to their capital contribution in most circumstances. Both are transparent for tax purposes (partners or members pay income tax on their profit share, not corporation tax). The trade-off is administration: an LLP must file accounts at Companies House and comply with the LLP regulations. For a detailed comparison of LLP vs limited company, see our guide on choosing a business structure.

---

## Cross-link map

**Internal links to include in body (BINDING per collision_verify A5):**

| Anchor text suggestion | Target slug | Where in body |
|---|---|---|
| Limited company vs LLP guide | limited-company-vs-llp-consultant | Section 1 (what it is not), Section 5 (liability upgrade path) |
| MTD for mixed-member partnerships | mtd-itsa-april-2026-deadline-mixed-member-partnerships | Section 4 (MTD ITSA note) |
| How to switch from sole trader to limited company | how-to-switch-from-sole-trader-to-limited-company | Section 5 or FAQ Q10 (when discussing incorporation as alternative) |
| How to register as self-employed | how-to-register-as-self-employed-uk | Section 2 Step 4 (individual SA registration) |

**Do not cross-link to:** any page outside this list (collision boundary); do not re-link to how-to-register-as-self-employed-uk-while-keeping-full-time-job (different audience, different scenario).

---

## Schema

Use `FAQPage` schema (JSON-LD in frontmatter `schema` field) with all 10 FAQ question/answer pairs. Standard pattern per existing generalist pages.

---

## Image

Alt text: Two business partners reviewing a partnership agreement at a desk in a modern UK office

Photographer credit: follow Pexels attribution pattern per other pages in corpus.

---

## Frontmatter template

```yaml
title: 'How to Set Up a Business Partnership in the UK'
slug: how-to-set-up-a-business-partnership-uk
canonical: https://www.hollowaydavies.co.uk/blog/sole-trader-and-self-employment/how-to-set-up-a-business-partnership-uk
date: '2026-07-09'
author: Holloway Davies Editorial Team
category: Sole Trader and Self Employment
metaTitle: 'How to Set Up a Business Partnership in the UK'
metaDescription: 'Step-by-step guide to forming a UK business partnership: nominated partner, HMRC registration, SA800, partnership agreement, joint liability and VAT.'
h1: 'How to Set Up a Business Partnership in the UK'
summary: 'Setting up a business partnership in the UK is straightforward but carries one risk most new partners overlook: unlimited joint and several liability. This guide covers every formation step, from choosing a nominated partner and registering with HMRC, to drafting a partnership agreement, filing your first SA800 and getting your records, VAT and bank account in order.'
```

---

## Word count target

1,800 to 2,400 words body (HTML). The worked example and step-by-step checklist carry most of the word count. FAQ answers are outside the body word count (frontmatter array).

---

## Statutory citations (for writer reference — cite inline, do not over-footnote)

- Partnership Act 1890 s.1(1) — definition (legislation.gov.uk, verified 2026-07-09)
- Partnership Act 1890 s.9 — joint and several liability
- Partnership Act 1890 s.24 — default rules (equal profit split, management, admission of partners)
- Partnership Act 1890 s.33 — dissolution on death or bankruptcy
- ITTOIA 2005 s.850 — profit allocation per profit-sharing arrangements (legislation.gov.uk, verified 2026-07-09)
- TMA 1970 s.59A — payments on account
- TMA 1970 s.12B — record-keeping obligation
- VATA 1994 Sch 1 — VAT registration threshold £90,000 (HP §7)
- HP §2 — income tax rates, Class 4 NIC, Class 2 abolition
- HP §2.A — tax-year basis from 2024/25
- HP §2.B — SA deadlines, POA mechanics, 5 October registration deadline
- HP §6 — partnership profit allocation, SA800, nominated partner, partner-exit CGT/SDLT

**Do not cite:** any competitor URL (both dead); any figure from memory without HP anchor.

---

## Writer checklist before submission

- [ ] No em-dashes anywhere (commas, parentheses, full stops, middle dots only)
- [ ] Class 2 NIC: state abolished from 6 April 2024, do NOT tell readers to pay a weekly charge
- [ ] Class 4 NIC: use 6%/2% and 2026/27 figures (£12,570 / £50,270)
- [ ] Registration deadline: 5 October after end of first trading tax year
- [ ] SA800: filed by nominated partner; SA104 pages filed by each partner on individual return
- [ ] Liability: joint and several, unlimited — flag prominently, not buried
- [ ] Profit allocation: follows profit-sharing arrangement per ITTOIA s.850; state in writing and keep for records
- [ ] VAT threshold: £90,000 rolling 12 months
- [ ] MTD ITSA mention: 1-2 sentences only, cross-link to mixed-member MTD page
- [ ] LLP mention: 1 sentence as upgrade path + cross-link, nothing more (collision boundary)
- [ ] No LeadForm in body (auto-injected at footer)
- [ ] Worked example arithmetic: double-check against HP §2 figures before submission
- [ ] HTML body: use `<p>`, `<h2>`, `<h3>`, `<ol>`, `<li>`, `<table>` — no markdown syntax in body field

---

## Flags raised

See wave4_site_wide_flags.md: **F-50** — A5 both competitor URLs dead (404); brief built from primary sources only. No content impact.
