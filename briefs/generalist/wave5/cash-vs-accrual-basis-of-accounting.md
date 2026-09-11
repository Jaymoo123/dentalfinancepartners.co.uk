---
slug: cash-vs-accrual-basis-of-accounting
tier: extension
category: "Sole Trader and Self Employment"
route: /blog/sole-trader-and-self-employment/cash-basis-vs-accruals-sole-trader
intent: EXTENSION, not a new page. Broaden the live comparison post to own the generic (non-sole-trader) head term "cash vs accrual basis of accounting" without publishing a second comparison page.
---
# Brief: EXTENSION of `cash-basis-vs-accruals-sole-trader.md`

> **This is not a new page.** Do not create `generalist/web/content/blog/cash-vs-accrual-basis-of-accounting.md`. Edit the live file `generalist/web/content/blog/cash-basis-vs-accruals-sole-trader.md`. The slug, route and canonical of that file do not change. No em-dashes. Raw-HTML body. Faceless.

## Target queries (REQUIRED PHRASINGS, NOT SUGGESTIONS)

This phrasing is binding. It must appear naturally in a new H2 or FAQ question on the extended page, in the words people typed. **You may not split it into another page**; publishing it separately would put two near-identically-slugged comparison pages of ours into one result set, which is exactly the cannibalisation the house rule forbids. Flag in the Q&A file if you disagree and keep writing.

```
cash vs accrual basis of accounting
```

## Why an extension and not a page

Cannibalisation verdict: **DEEPEN**. The live page already carries the same intent, the same comparison, a near-identical slug, the "cash basis is now the default" position, who must use accruals, a worked both-bases example, the transition adjustments and the election-out mechanism. A second page would compete with it and lose.

The pick's phrasing is **generic rather than sole-trader-scoped**, and that is the whole delta: someone searching "cash vs accrual basis of accounting" may be running a limited company, and the live page does not properly answer them. It bars companies in a list item and moves on.

## What to ADD

Four additions, in this order. Target roughly **700 to 1,000 new words**.

1. **A new H2 using the generic phrasing**, placed after the existing "What Each Basis Means" section. Something of the form "Cash vs accrual basis of accounting: the same choice, in general terms". Explain the two bases as a general accounting concept before narrowing to the UK tax rules, because the generic searcher has not yet reached the sole-trader question.
2. **The limited company answer, given properly.** A company has no choice: its profits are computed under generally accepted accounting practice (CTA 2009 s.46(1)), so accruals is mandatory. State why, explicitly, because readers conflate this with the VAT Cash Accounting Scheme, which a company **can** use. This is the most valuable paragraph in the extension.
3. **A short disambiguation block** separating the income tax cash basis from the VAT Cash Accounting Scheme, with the VAT scheme's £1.35m entry and £1.6m exit figures named once and a link to the new `vat-cash-basis-threshold` page. Two or three sentences plus the link, no more; the VAT page owns the detail.
4. **The live statutory section numbers.** The page currently states the correct positions without pinning them. Add the hooks: ITTOIA 2005 s.24A (default), s.25B (excluded trades), s.25C (election out), s.33A (capital expenditure), CAA 2001 s.1A (cars only), and note that s.25A and ss.31A-31D were omitted by FA 2024 Sch 10. A single sourced sentence or a short list, not a legal essay.

Also add **two or three FAQs** to the existing `faqs:` block covering the generic phrasing and the company question, and **update the `faqs:` count to match the rendered count**.

## What NOT to touch

- **Do not change the slug, canonical, route, title or H1.** The page keeps its sole-trader identity in the URL; the generic term is earned through an H2 and FAQ, not a rename.
- **Do not re-verify or restate the abolition of the thresholds.** The live page already says it correctly, in the summary, the FAQs and the body: the £150,000 entry and £300,000 exit thresholds were abolished from 6 April 2024. Leave that wording alone. Do not "correct" it to a raised threshold. It is right.
- **Do not touch the existing worked example** or the treatment-differences table.
- **Do not extend the loss-relief section.** `cash-basis-sole-trader-loss.md` owns it and the live page already links correctly.
- **Do not restate the MTD thresholds.** They are already on the page; leave them exactly as written.
- **Do not add a capital allowances section.** `sole-trader-capital-allowances.md` owns it, and its own extension is briefed separately.

## BOUNDARY TABLE (mandatory, in the new section)

The page already has a treatment-differences table on the cash-versus-accruals line, so the **new** table must be the one the extension exists for. Columns: **"Free to use the cash basis"** against **"Must use traditional accounting (accruals)"**. Four trade-anchored row pairs minimum:

| Free to use the cash basis | Must use traditional accounting (accruals) |
|---|---|
| A sole trader mechanic, any turnover, since there is no limit | The same mechanic's business after incorporating: a company computes profits under GAAP (CTA 2009 s.46(1)) |
| A partnership of two individuals running a salon | The same partnership once a company joins as a partner |
| A self-employed window cleaner with £500,000 of turnover | A limited liability partnership, whatever its size |
| A florist trading as a sole trader | A florist company that has claimed research and development allowance, and any excluded trade under ITTOIA 2005 s.25B |

## Figures mapped to HP

| Figure | Source |
|---|---|
| Cash basis is the **default** from 2024/25; election out under s.25C | Stage 1B B §1.2, HP §21.8.5, https://www.legislation.gov.uk/ukpga/2005/5/section/24A |
| Thresholds **abolished** by FA 2024 Sch 10 paras 4, 6, 47 | Stage 1B B §1.1 |
| Cash basis **closed to limited companies**; CTA 2009 s.46(1) mandates GAAP | Stage 1B B §1.6, HP §21.8.5 |
| "Traditional accounting (accruals basis)" is HMRC's wording; GAAP is the statutory term, ITTOIA 2005 s.25(1) | Stage 1B B §3, HP §21.8.1 |
| VAT Cash Accounting Scheme **£1.35m in, £1.6m out**, open to companies | HP **§7**, Stage 1B B §2 |
| No AIA on the cash basis; cars are the exception | Stage 1B B §1.5, CAA 2001 s.1A, ITTOIA 2005 s.33A. One sentence only, then link. |

**Never cite BIM70010.**

## HP GAPS (do NOT invent, omit or link gov.uk)

1. **The s.25C election time limit** is unverified. The live page's existing wording about electing on the return is correct; do not add a deadline.
2. **The complete s.25B excluded-trades list** was not enumerated in Stage 1B B. The live page already has a list; **do not extend it from memory**. If you add anything, link https://www.gov.uk/simpler-income-tax-cash-basis/who-can-use-cash-basis .
3. **FRS 105 and micro-entity accounts** are a real adjacent question for the company reader and are not locked in HP. Do not author it. One sentence at most that a company's accounts follow an accounting standard, with no standard named as a rule.
4. No fee figures, no named experts.

## Internal links

**Add out:** `vat-cash-basis-threshold` (new this wave, the VAT scheme), `cash-basis` (new this wave, the hub).
**Already present and correct, do not disturb:** the existing links to `cash-basis-sole-trader-loss` and the related-articles block.

## Target total after extension

Live body is **approximately 3,000 words**. Target after extension: **3,700 to 4,000 body words**. FAQ count rises to 12 to 14 and the frontmatter `faqs:` count must match the rendered count exactly.
