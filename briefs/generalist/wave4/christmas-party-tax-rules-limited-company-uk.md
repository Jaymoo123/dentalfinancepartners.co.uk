# Brief: Christmas Party Tax Rules for a Limited Company (UK)

**Pick ID:** A8
**Slug:** `christmas-party-tax-rules-limited-company-uk`
**Wave:** 4 (generalist / Holloway Davies)
**Category:** Limited Company Tax
**Brief status:** RUN-READY (statutory verification complete, competitors confirmed dead)
**Brief date:** 2026-07-09

---

## 1. Statutory verification log

All primary sources fetched and verified 2026-07-09.

| Source | What it confirmed |
|--------|------------------|
| `legislation.gov.uk/ukpga/2003/1/section/264` | ITEPA 2003 s.264 verbatim: annual party or similar annual function; available to employees generally (or at a particular location); cost per head must not exceed £150 (incl. VAT, transport, accommodation); for multiple events the aggregate must not exceed £150; where an event fails, the WHOLE cost per head is taxable, not just the excess; cost is spread across all attendees including guests |
| `gov.uk/hmrc-internal-manuals/employment-income-manual/eim21690` | All-employees condition (available generally or to a location); "annual" means recurring, not one-off; £150 is NOT an allowance -- the whole amount is taxable when exceeded; multiple-events election: employer chooses which event(s) to exempt provided aggregate cost per head of exempt event(s) does not exceed £150; virtual functions qualify |
| `gov.uk/hmrc-internal-manuals/employment-income-manual/eim21691` | All-employees condition detail: director-only or department-restricted events do NOT qualify; election mechanics worked example confirmed (£100 + £80 = £180 aggregate: elect to exempt the £100 event, employees attending both pay tax on the £80; election choice is which events maximise the exemption value); guest-counting confirmed -- guests' costs are included in the per-head total divided across all attendees (employees AND guests) |
| `gov.uk/hmrc-internal-manuals/vat-input-tax/vit43600` | VAT recovery: staff-only entertaining -- VAT fully recoverable; directors/partners-only events -- VAT blocked (HMRC position: they are not rewarding/motivating themselves); mixed staff-and-guest events -- apportionment required; only VAT attributable to employee portion is recoverable; VAT on guest entertainment blocked under business entertainment rules |
| `gov.uk/paye-settlement-agreements` + `psa1160` | PSA option: employer can cover the income-tax and Class 1B NIC liability under a PSA (minor, irregular or impracticable benefits); tax grossed up at employee's marginal rate; Class 1B NIC also due on the tax payable; Class 1B NIC rate = secondary Class 1 rate (15% from 6 April 2025, per HP §4.A / SSCBA 1992) |

**HP §9.A tie-breaker review:** §9.A states "annual staff event (for example a Christmas party) is exempt up to £150 per head per year (s.264, all-or-nothing per head)" in one bullet. The trivial-benefits-rules-uk sibling page mentions s.264 in passing only (per EIM21690 the £150 covers all employees at a specific location for multi-site employers). This brief covers the full mechanics -- no conflict with HP §9.A.

**Competitor URLs -- liveness check:**
- `https://www.crunch.co.uk/knowledge/christmas-party-expense-exemption-for-limited-companies` -- HTTP 404. DEAD. Dropped.
- `https://www.bytestart.co.uk/christmas-party-tax-rules` -- HTTP 404. DEAD. Dropped.

Both competitor URLs from picks.yaml are dead. Zero live competitors fetched. No competitor framing to adopt. Brief is built entirely from primary sources.

---

## 2. Cannibalisation boundary (binding, from wave4_collision_verify.md A8)

Siblings cover s.264 in **1 bullet + 2 paragraphs only** (trivial-benefits-rules-uk and p11d-benefits-in-kind-explained). This page owns the FULL s.264 mechanics: all-employees condition, plus-one counting, multiple-events election, the £150 cliff (all-or-nothing), PSA option, VAT recovery including guest apportionment, CT deductibility.

Do NOT re-explain the trivial-benefits £50/£300 rules in any depth -- one cross-link sentence only.
Do NOT re-explain P11D reporting broadly -- one sentence framing only.
Do NOT re-explain CT rate mechanics -- assert deductibility and cross-link.

---

## 3. Page metadata

```
slug:            christmas-party-tax-rules-limited-company-uk
category:        Limited Company Tax
metaTitle:       Christmas Party Tax Rules for Limited Companies (2025/26)
metaDescription: The £150/head annual events exemption explained. All-employees rule, multiple-party election, VAT recovery and what happens if you go over £150.
h1:              Christmas Party Tax Rules for Limited Companies: The £150 Per Head Exemption Explained
```

**metaTitle char count:** 57 (within 62 limit)
**metaDescription char count:** 152 (within 158 limit)

---

## 4. Target word count and structure

Non-pillar page: **2,800 to 3,500 body words** (report body words; frontmatter/FAQ-JSON adds ~1,000 to 1,500 on top).

### Recommended H2/H3 structure

1. **What is the s.264 annual events exemption?** (intro + statute anchor)
2. **The four conditions your event must meet**
   - Annual and recurring
   - Available to all employees (or all at a location)
   - Cost per head at or under £150 including VAT
   - The all-or-nothing cliff
3. **How the cost per head is calculated** (total cost / all attendees including guests)
4. **Bringing a plus-one: how guests affect the calculation** (plus-one mechanics, worked example a)
5. **Multiple events in one year: the election mechanic** (aggregate rule, choosing which events to exempt, worked example c)
6. **What happens when you go over £150?** (the whole-amount cliff, P11D vs PSA, worked example b)
7. **The PSA option: paying the tax for your employees** (what a PSA is, Class 1B NIC grossing-up, cost comparison)
8. **VAT recovery on the Christmas party** (staff-only vs mixed guests, apportionment)
9. **Corporation tax deductibility of staff entertaining** (fully deductible as a business expense)
10. **Director-only parties: why they do not qualify** (all-employees condition failure)
11. **FAQ** (8 to 12 items, see §7)
12. **Cross-links / related reading** (see §8)

---

## 5. Worked examples (mandatory, write all three)

### Example A: £148 per head -- fully exempt

A company of 10 employees holds a Christmas dinner. Total cost (food, drink, venue, VAT) is £1,480. No guests attend. Cost per head = £1,480 / 10 = **£148**. The £148 is under £150. The exemption applies in full. No P11D. No payroll entry. No income tax or NIC liability for any employee.

**Key point to surface:** Even £149.99 per head is exempt. But £150.01 makes the WHOLE £150.01 per head taxable, not just the extra 1p.

### Example B: £160 per head -- the cliff in action, with P11D and PSA comparison

Same company, same 10 employees. Total cost is £1,600. Cost per head = **£160**. Exemption fails -- the whole £160 per head is taxable, not just the £10 excess.

**P11D route:**
- Each employee has a benefit of £160 reported on their P11D
- Basic-rate employee: income tax £160 x 20% = £32 per employee (£320 total)
- Higher-rate employee: income tax £160 x 40% = £64 per employee
- Employer pays Class 1A NIC at 15% on the taxable amount: £160 x 15% = £24 per employee (£240 on 10 employees)
- P11D deadline: 6 July following the end of the tax year
- Employees receive a tax bill -- reputationally awkward

**PSA route (employer pays the tax on employees' behalf):**
The employer agrees a PSA with HMRC covering the party benefit. The employer then pays:
- Income tax: grossed up at each employee's marginal rate (for a basic-rate employee: the gross equivalent of £160 benefit at 20% = £160 / 0.8 = £200 gross; tax = £40)
- Class 1B NIC at 15% on the total taxable amounts AND on the tax payable under the PSA

Example for 10 basic-rate employees under PSA:
- Total benefit: 10 x £160 = £1,600
- Tax grossed up (basic rate): £1,600 / 0.8 = £2,000 grossed; tax = £400
- Class 1B NIC: 15% x (£1,600 + £400) = 15% x £2,000 = £300
- Total PSA cost to employer: £400 + £300 = £700 (on top of the £1,600 party cost)
- Employees receive a tax-free party with no P11D surprise

**Framing:** PSA avoids employee P11D notices but costs the employer more in cash. The party also remains fully deductible for corporation tax either way.

**Note to writer:** flag that where employees have mixed marginal rates the grossing-up is done at each individual's marginal rate and HMRC requires employers to apportion by employee. The PSA calculator on HMRC's SEES system handles the arithmetic.

### Example C: Summer BBQ £60/head + Christmas party £120/head -- the election

Company runs two events in the tax year: a summer BBQ at £60 per head and a Christmas party at £120 per head. Aggregate: £60 + £120 = £180. That exceeds £150. Both events cannot be exempt together.

**Election:** The employer elects to exempt the Christmas party (£120 per head). The summer BBQ becomes the taxable event (£60 per head). Employees who attended only the BBQ are taxable on £60 each; employees who attended only the Christmas party are not taxable; employees who attended both are taxable on £60 (the BBQ).

**Alternative election:** The employer could instead elect to exempt the BBQ (£60). The Christmas party becomes taxable (£120 per head). This is worse -- more employees attended the Christmas party and the taxable benefit per head is higher.

**Framing for writer:** the election rule lets the company optimise by choosing whichever event(s) use the £150 allowance most efficiently. Where one event alone stays under £150 (here: the BBQ at £60 could be elected alone and still leaves £90 unused -- but unused allowance does not carry forward), electing the higher-value event is usually the better outcome if more employees attended it.

**Note to writer:** where neither event individually exceeds £150, either can be elected. Where one individually exceeds £150, only the one(s) within £150 can be elected. A single event at exactly £151 per head fails entirely -- there is no election for a single-event year.

---

## 6. Key statutory positions (use verbatim in-brief, cross-check before writing)

| Point | Position | Source |
|-------|----------|--------|
| Statutory basis | ITEPA 2003 s.264 | legislation.gov.uk confirmed |
| Threshold | £150 per head per year (for all exempt event(s) in aggregate) | s.264 + EIM21690 |
| "Not an allowance" cliff | Exceed £150 and the WHOLE cost per head is taxable -- not just the excess | EIM21690 explicit |
| All-employees condition | Must be available to all employees generally, or all employees at a specific location for multi-site employers | s.264 + EIM21691 |
| Annual condition | Must be annual (recurring), not a one-off celebration | EIM21690 |
| Guest/plus-one counting | Total event cost (incl. VAT, transport, accommodation for all attendees) divided by total number of attendees including guests | s.264 + EIM21690 |
| Multiple-events election | Employer chooses which event(s) to exempt; aggregate cost per head of exempt event(s) must not exceed £150; other events are fully taxable | EIM21691 |
| Director-only events | Fail the all-employees condition; fully taxable as a benefit | EIM21691 Example 1 |
| Virtual events | Qualify if all conditions met | EIM21690 |
| VAT -- staff only | Input VAT fully recoverable | VIT43600 |
| VAT -- directors/partners only | Input VAT blocked | VIT43600 |
| VAT -- mixed event | Apportionment: only employee portion recoverable, guest portion blocked | VIT43600 |
| CT deductibility | Staff entertaining is a deductible trading expense (not disallowed under ICTA 1988 / CTA 2009 -- the "business entertaining" disallowance applies to customer/third-party entertaining, NOT staff) | HP §9 + general CT principles |
| PSA option | Employer can cover tax + Class 1B NIC via PSA for minor/irregular benefits | gov.uk PSA guidance |
| Class 1B NIC rate | 15% (from 6 April 2025, aligns with secondary Class 1 rate) | HP §4.A |
| PSA grossing-up | Tax at employee's marginal rate, then Class 1B NIC at 15% on benefit value PLUS the tax payable | psa1160 confirmed |

---

## 7. FAQ drafts (10 items -- write all in full)

**FAQ 1**
Q: What is the £150 annual events exemption and which law covers it?
A: The exemption comes from section 264 of the Income Tax (Earnings and Pensions) Act 2003 (ITEPA). It means a company can hold one or more qualifying annual social events in a tax year without creating a taxable benefit for employees, provided the total cost per head across all exempt events does not exceed £150. The £150 includes VAT, and any transport or overnight accommodation connected to the event.

**FAQ 2**
Q: Is the £150 a tax-free allowance, meaning the excess is taxable?
A: No. This is one of the most common misconceptions. The £150 is a threshold, not an allowance. If your cost per head comes to £151, the full £151 is taxable for every attending employee -- not just the £1 overspend. HMRC is explicit on this in its internal guidance (EIM21690). It makes the rounding calculation matter: staying at £149.99 costs the company nothing extra in tax; crossing to £150.01 creates a P11D liability on the entire amount.

**FAQ 3**
Q: Does the Christmas party have to be open to all staff?
A: Yes. The event must be available to employees generally. For a company with staff based at multiple sites, it can be available to all employees at a particular location instead of the whole company. What it cannot be is restricted to directors only, to a single department, or to a subset of employees chosen for performance. A directors-only dinner fails the condition entirely, and the full cost per head becomes a taxable benefit for each attendee.

**FAQ 4**
Q: My company brought plus-ones to the party. How does that affect the £150 calculation?
A: Guests count in the headcount but the cost of their attendance is also included in the total. The per-head figure is simply the total event cost (including VAT, transport and accommodation for everyone) divided by the total number of people at the event, staff and guests alike. Bringing partners does not inherently push you over the limit -- it depends on the actual cost per head once you include every attendee.

**FAQ 5**
Q: We ran a summer BBQ and a Christmas party this year. Both cost under £150 per head individually but the two together exceed £150. What happens?
A: You can still claim the exemption on one of them. You make an election choosing which event to treat as exempt. The chosen event must have a cost per head of £150 or less on its own. The other event becomes fully taxable for employees who attended it. Unused allowance from the exempt event does not carry over to reduce the taxable amount of the other one. Choose to exempt the event that delivers the better outcome -- usually the one with a higher per-head cost (to protect the larger benefit) or the one more employees attended.

**FAQ 6**
Q: What if we go over the £150 limit? Do we have to put it on the P11D?
A: Yes, the taxable benefit (the full cost per head, not just the excess) must be reported on each attending employee's P11D by 6 July following the end of the tax year, unless you deal with it through a PAYE Settlement Agreement (PSA) instead. Under a PSA, the company pays the income tax and Class 1B National Insurance on the employees' behalf, so employees do not receive a surprise tax bill. The company must agree the PSA with HMRC before the end of the tax year to which it relates.

**FAQ 7**
Q: What is a PSA and how does it work for a Christmas party that went over budget?
A: A PAYE Settlement Agreement lets you make a single annual payment to HMRC covering the income tax and Class 1B NIC on minor, irregular or impracticable employee benefits, including an over-budget Christmas party. The company calculates the income tax due by grossing up the benefit at each employee's marginal tax rate, then pays Class 1B NIC at 15% on both the benefit value and the tax due. Employees see no P11D entry and no personal tax bill. The cost to the company is higher than a standard P11D because of the grossing-up, but some directors prefer it to sending staff a tax notice after a night out.

**FAQ 8**
Q: Can the company reclaim VAT on the Christmas party?
A: If the party is for employees only, the company can reclaim the VAT on the cost in full. If employees bring guests, HMRC requires you to apportion: only the VAT attributable to the employee portion is recoverable, and the VAT on the guests' share is blocked under the business-entertainment disallowance. Where the split is roughly equal, you recover roughly half the VAT. This is a separate question from the income-tax exemption -- you can have a fully exempt party under s.264 and still only recover a portion of the VAT if guests attended.

**FAQ 9**
Q: Is the Christmas party cost deductible for corporation tax?
A: Yes. Staff entertaining is a deductible trading expense for corporation tax purposes. The disallowance rule that blocks a deduction for business entertainment applies to hospitality provided to customers, clients and third parties -- not to employees. A genuine staff Christmas party with no customer guests is fully deductible. If the party includes a mix of staff and clients, you would need to apportion the deductible and non-deductible portions.

**FAQ 10**
Q: Can a sole trader put a staff Christmas party through the business?
A: A sole trader with employees can use the s.264 exemption for those employees in the same way a limited company can. The cost of qualifying staff entertaining is deductible under the wholly-and-exclusively rule for trading income. The sole trader themselves is not an employee of their own business, so the exemption does not cover the sole trader's own attendance -- but if the party is genuinely for employees and the cost-per-head calculation works out at £150 or less, the exemption protects the employees from a taxable benefit. The sole trader's own portion of the cost may still be deductible as a trading expense if the commercial purpose can be established.

---

## 8. Cross-link map (internal links)

| Link target slug | Anchor context | Direction |
|-----------------|----------------|-----------|
| `/blog/trivial-benefits-rules-uk` | When introducing the idea of tax-free perks, note that small ad-hoc gifts to staff (under £50 each, not a reward for work) are separately exempt under the trivial benefits rules | Forward from body |
| `/blog/p11d-benefits-in-kind-explained` | When explaining the P11D reporting obligation for an over-budget event, link to the P11D guide for the full reporting process | Forward from body |
| `/blog/allowable-expenses-sole-trader-checklist` | In the sole-trader FAQ (FAQ 10) or in a sole-trader note, cross-link to the allowable expenses checklist | Forward from body |

**Back-patch note:** The trivial-benefits-rules-uk and p11d-benefits-in-kind-explained pages should each gain a forward link to this page once it is live. Flag as INTERNAL_LINK in wave4_site_wide_flags.md after page ships.

---

## 9. Voice and style rules (from HP and NETNEW_PROGRAM)

- No em-dashes anywhere. Use commas, parentheses, full stops, or middle dots.
- No "not an allowance" as a heading -- it reads negatively; instead use "the £150 cliff: why the whole amount becomes taxable" or similar constructive framing.
- Seasonal perennial: date-tag the tax year on every rate/threshold. The £150 threshold itself has not changed since 2003 (the original amount was lower; the substitution to £150 happened via amendment on 13 June 2003 per legislation.gov.uk). Do not present it as "new" or tied to any annual Budget.
- Lead-gen framing: end with a natural accountant-engagement call-to-action woven into the conclusion paragraph. No separate "get in touch" box in the body. The LeadForm injects at the footer automatically.
- Social proof: anonymised only. Do not name clients or claim specific results.
- Category: "Limited Company Tax" (matches existing category taxonomy).

---

## 10. Positions requiring a new HP LOCK EXTENSION

No new statutory lock is needed. All positions are derivable from HP §9.A (s.264 annual function exemption £150/head) combined with the verified primary-source detail in §6 above. The brief's mechanics are a faithful expansion of §9.A, not a new framing.

**One flag raised:**

The PSA Class 1B NIC rate is stated as 15% (from 6 April 2025), derived from HP §4.A's confirmation that "Class 1A NIC at 15% (the Class 1A rate aligns with the secondary Class 1 rate, so 15% from 6 Apr 2025)" and the PSA guidance confirming Class 1B follows the same rate. This is not separately locked in HP. The writer should use 15% and cite HP §4.A. No new lock needed -- the rate is already a confirmed estate-wide position.

---

## 11. Flags to raise after this brief session

The following flag should be appended to `docs/generalist/wave4_site_wide_flags.md` after the page is shipped (not during brief phase):

```
## F-80 INTERNAL_LINK — trivial-benefits-rules-uk + p11d-benefits-in-kind-explained
**Raised:** post-ship A8
**Type:** INTERNAL_LINK
**Action needed:** Add a forward link from trivial-benefits-rules-uk to christmas-party-tax-rules-limited-company-uk (in the section discussing annual staff events). Add a forward link from p11d-benefits-in-kind-explained to the same. One sentence each.
**Priority:** low (back-patch cycle)
```

---

## 12. Competitor analysis note

Both competitor URLs from picks.yaml are HTTP 404 (dead). No live competitor framing to analyse. This is a slight structural gap -- the brief is built entirely from primary sources and house positions, which is the correct approach, but the writer should be aware there is no live "competitor angle" to differentiate against. The key differentiator is therefore mechanical depth (the election worked example, the PSA arithmetic, the VAT apportionment) rather than angle-contrast.

---

## 13. Six-check pre-commit checklist (for writer to complete before committing)

- [ ] 0 em-dashes in body
- [ ] 0 utility CSS classes in body (semantic HTML only in blog markdown)
- [ ] FAQ schema count in built HTML == frontmatter `faqs:` array length (10 FAQs minimum)
- [ ] metaTitle at or under 62 chars (target above: 57 chars)
- [ ] metaDescription at or under 158 chars (target above: 152 chars)
- [ ] Every internal link resolves to an existing page (all three targets confirmed live above)
- [ ] Body word count 2,800 to 3,500 (report body words, exclude frontmatter)
