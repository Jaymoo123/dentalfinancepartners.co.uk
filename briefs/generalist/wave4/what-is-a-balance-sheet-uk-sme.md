# Brief: What is a balance sheet? UK SME guide

**Pick:** A6  
**Slug:** `what-is-a-balance-sheet-uk-sme`  
**Branch:** generalist wave 4  
**Category:** Bookkeeping and Compliance  
**Date drafted:** 2026-07-09  
**Status:** RUN-ready

---

## Binding scope (from wave4_collision_verify.md — do not drift)

READING published accounts for non-accountant directors: assets, liabilities, equity, net assets, reserves, the DLA line, what lenders and credit agencies look at. NOT trial-balance preparation. NOT Companies House filing mechanics (how-to-file-company-accounts-uk covers that). NOT abbreviated-accounts structure (trial-balance-abbreviated-accounts covers that). The reader is a director who receives a set of accounts and needs to know what the balance sheet is telling them.

---

## Meta

**Title (≤62 chars):** `What is a balance sheet? A plain guide for UK directors`  
Character count: 55. PASS.

**Meta description (≤158 chars):** `A balance sheet shows what your company owns, owes, and is worth at a single date. This guide explains every line, including the directors loan account, in plain English.`  
Character count: 170. TRIM: `A balance sheet shows what your company owns, owes and is worth at a snapshot date. Plain guide for UK directors, including the DLA line and lender red flags.`  
Character count: 161. TRIM further: `A balance sheet shows what your company owns, owes and is worth at one date. Plain guide for UK directors: assets, equity, the DLA line and lender red flags.`  
Character count: 160. One more pass: `Plain English guide to reading a balance sheet for UK directors. Covers assets, liabilities, equity, the directors loan account and what lenders look for.`  
Character count: 157. PASS.

---

## Target audience and search intent

Non-accountant directors and owner-managers of UK small limited companies who receive a set of statutory accounts and want to understand what the balance sheet is showing. Secondary: sole traders who produce management accounts and want to interpret the balance sheet section. Intent is informational with a downstream conversion intent (they need an accountant to explain and prepare their accounts).

Keyword anchors (from competitor SERP context): "what is a balance sheet UK", "how to read a balance sheet", "balance sheet explained", "balance sheet small business UK", "directors loan account balance sheet", "net assets balance sheet".

---

## Competitor URLs (live-check discipline)

Both URLs below were included in picks.yaml. Writer must WebFetch each before writing, confirm HTTP 200 and on-topic content, and note if either is dead or redirected. If a URL 404s or redirects off-topic, remove it from any "compare to competitors" notes in the brief.

- https://www.businessaccountingbasics.co.uk/balance-sheet/
- https://informi.co.uk/finance/what-is-a-balance-sheet-and-how-do-you-read-one

**Differentiation mandate.** Both competitors produce generic explainers with limited practical UK-director framing. This page must go further on: (a) a full worked illustrative balance sheet with line-by-line reading notes, (b) the DLA line as a first-class topic (the overdrawn director's loan, the s.455 charge, what lenders see), (c) the three red-flag patterns, and (d) the Companies Act 2006 / FRS 102 Section 1A naming and presentation conventions that a director actually encounters in their accounts. Competitors skip all of this.

---

## Statutory and regulatory anchors

All positions below are from house_positions.md (§4.A for DLA/s.455; §3 for net assets/CT context). Cite by section number when writing, per HP writing rules.

### Companies Act 2006 framework (verify what you cite)

The Companies Act 2006 mandates that the accounts of every UK company include a balance sheet (Companies Act 2006, s.394, s.396). For a **small company** (meeting two of: turnover not more than £10.2 million, balance sheet total not more than £5.1 million, not more than 50 employees, per Companies Act 2006, s.382 as amended), accounts may be prepared under **FRS 102 Section 1A** (the reduced-disclosure version of FRS 102, issued by the Financial Reporting Council) rather than full FRS 102.

Under FRS 102 Section 1A, the balance sheet uses the **CA 2006 Sch 1 formats**. The most common small-company presentation is **Format 1** (vertical format), which runs:

- Fixed assets (tangible, intangible, investments)
- Current assets (stock, debtors, cash and bank)
- Creditors: amounts falling due within one year
- Net current assets (or liabilities)
- Total assets less current liabilities
- Creditors: amounts falling due after more than one year
- Net assets (or net liabilities)
- Capital and reserves (called-up share capital, profit and loss account reserve, other reserves)

This Format 1 vertical presentation is what most UK small-company directors see in their annual accounts. The page should reflect this, not the US-style horizontal "assets = liabilities + equity" layout that generic explainers use.

**Primary source to verify at writing stage:** Companies Act 2006 s.382 (small company definition, size thresholds), s.394, s.396 (duty to prepare accounts); FRS 102 Section 1A (Financial Reporting Council, available at frc.org.uk); Companies Act 2006 Schedule 1 (balance sheet formats, Format 1 vertical). Writer should cite these specifically rather than paraphrasing a competitor.

**Note on size thresholds:** The Companies Act 2006 small-company thresholds have been subject to upward revision. The figures above (£10.2m / £5.1m / 50 employees) are the post-2016 figures. Confirm they remain current at frc.org.uk or legislation.gov.uk at writing stage. Do NOT state specific figures without verifying (same discipline as statutory rates).

**Companies House public filing note:** A small company may file **abbreviated (abridged) accounts** at Companies House, which can omit the profit and loss account. The balance sheet is always filed and is publicly searchable. A director should understand that trade creditors, banks and potential partners routinely pull this data. This is a key motivation hook for the page.

### Director's loan account (DLA) — house_positions.md §4.A (LOCKED)

The DLA is the account that records all money flows between the director and the company that are not salary or dividends. It can be **in credit** (the company owes the director money, for example expenses paid personally and not yet reimbursed, or a loan the director made to the company) or **overdrawn** (the director owes the company money, for example drawings that exceed declared salary and dividends).

An overdrawn DLA appears on the balance sheet as a **debtor under current assets** (the company is owed money by the director). Lenders and credit agencies look at this line.

If the DLA is overdrawn at the company's year end, the company faces a **CTA 2010 s.455 charge**: a tax charge equal to the dividend upper rate (33.75% for loans made before 6 April 2026; 35.75% for loans made on or after 6 April 2026) on the balance outstanding 9 months and 1 day after the period end. The charge is **temporary** (repaid via s.458 when the loan is cleared), but the deferred relief means the company must fund the tax first.

A DLA balance over £10,000 at any point in the year is a **benefit in kind** (ITEPA 2003 ss.173-191) unless the director pays interest at the official rate. This is reportable on P11D with Class 1A NIC at 15%.

Per HP §4.A writing rules: state the s.455 rate with its date band; state that s.458 relief is deferred, not immediate; flag the £10,000 BIK threshold. Do NOT describe s.455 as a permanent tax.

### Net assets and insolvency awareness

Net assets = total assets minus total liabilities. When this figure is **negative** (net liabilities), the company's liabilities exceed its assets. For a trading company this is a serious warning: it does not automatically mean insolvency, but directors have legal duties under the Companies Act 2006 and the Insolvency Act 1986 to monitor the company's position and not to trade to the detriment of creditors when insolvency is reasonably foreseeable. The page should flag this clearly without being alarmist; it should prompt the reader to take professional advice promptly.

---

## Page structure

### H1
`What is a balance sheet? A plain guide for UK directors`

### Opening hook (2 short paragraphs, no H2)
The balance sheet is a snapshot. It records everything your company owns, everything it owes and what is left over for shareholders, at a single point in time (usually your year end). Unlike the profit and loss account, which covers a period, the balance sheet is a freeze-frame.

For most directors the balance sheet arrives as one page in a set of statutory accounts. This guide explains every section, walks through a worked illustrative example for a typical UK small company, and flags the three patterns that lenders and creditors look for when they pull your Companies House filing.

---

### H2: Why the balance sheet matters for a director

Cover these points concisely (no sub-headings within this section):

1. It is a legal document. Under the Companies Act 2006 every UK company must prepare one and the director signs it off. The director's signature on the balance sheet confirms it gives a true and fair view.
2. It is public. Small companies file a balance sheet at Companies House. Suppliers, banks and potential buyers can and do download it.
3. It tells you the financial health of the business at a glance: can the company pay its debts as they fall due? Are reserves being built or eroded?

---

### H2: The three sections of a small-company balance sheet

Introduce Format 1 (vertical format, Companies Act 2006 Schedule 1, used by most UK small companies under FRS 102 Section 1A). Explain the three conceptual blocks, using the names a director will actually see:

**Block 1: Assets** (what the company owns or is owed)
- Fixed assets: things the business keeps long-term (equipment, vehicles, fixtures, intangible assets like software, investments). Note: tangible fixed assets appear at cost less depreciation (net book value).
- Current assets: stock/work in progress, trade debtors (money owed by customers), other debtors (including the directors loan account when it is in credit, i.e. the company owes the director), prepayments, cash at bank and in hand.

**Block 2: Liabilities** (what the company owes)
- Creditors due within one year: trade creditors, bank overdraft, PAYE/NIC and VAT owed to HMRC, corporation tax accrual, other accruals, the directors loan account when it is overdrawn (money the director owes the company), director/shareholder loans the company has received.
- Creditors due after one year: longer-term finance (bank loans, hire purchase).

**Block 3: Capital and reserves** (the residual interest of shareholders)
- Called-up share capital: the nominal value of shares issued.
- Profit and loss account reserve (also called retained earnings): the accumulated net profits since the company started, after dividends paid out. This is the main working reserve most directors care about.
- Other reserves: less common; may include a share premium account (if shares were issued above nominal value) or a revaluation reserve.

**Net assets = Total assets minus Total liabilities.** In Format 1 this equals the Capital and reserves total. If the balance sheet balances (and it must), these two figures are identical.

---

### H2: A worked illustrative example

Introduce clearly: this is an invented example for a UK small limited company (fictional company "Maple Precision Ltd") at its year end 31 March 2026. All figures are illustrative.

Present as a formatted table with two columns: Line item and Amount (£). Include a third column "Reading note" for the line-by-line explanations inline with the table.

```
MAPLE PRECISION LTD
Balance sheet at 31 March 2026

                                                    £        Reading note
FIXED ASSETS
Tangible fixed assets                          18,400        Equipment and a company van, carried at cost less
                                                             depreciation. Net book value, not replacement cost.

CURRENT ASSETS
Stock and work in progress                      4,200        Goods bought but not yet sold or billed.
Trade debtors                                  22,600        Invoices sent to customers, not yet paid.
Directors loan account (in credit)              1,500        The company owes the director £1,500 for expenses
                                                             paid personally and not yet reimbursed.
Cash at bank and in hand                        8,350
                                               36,650

CREDITORS: due within one year
Trade creditors                               (9,100)       Money owed to suppliers.
PAYE/NIC accrual                              (1,200)       Tax and NIC due to HMRC this month.
VAT liability                                 (3,400)       VAT collected from customers, to be paid to HMRC.
Corporation tax accrual                       (4,800)       Estimated CT liability for the year (not yet due).
Other accruals                                (1,050)       Accrued accountancy fee for this year's accounts.
                                             (19,550)

NET CURRENT ASSETS                             17,100        Current assets minus current liabilities.
                                                             Also called "working capital". Positive here: good.

TOTAL ASSETS LESS CURRENT LIABILITIES         35,500

CREDITORS: due after one year
Bank term loan                                (8,000)       The outstanding balance on a 3-year bank loan.

NET ASSETS                                    27,500        What remains for shareholders after all debts. A
                                                             positive figure means the company is solvent on
                                                             a balance-sheet basis.

CAPITAL AND RESERVES
Called-up share capital                           100        100 shares at £1 nominal value each.
Profit and loss account reserve               27,400        Accumulated retained earnings since incorporation.

TOTAL CAPITAL AND RESERVES                    27,500        Must equal net assets. It does.
```

After the table, add a short reading summary paragraph: "For Maple Precision Ltd the story is straightforward. The business has more current assets than current liabilities (working capital of £17,100), net assets of £27,500 and a healthy retained earnings reserve. The directors loan account is in credit (the company owes the director), which means no s.455 charge arises. The corporation tax accrual of £4,800 is sitting in creditors: it will become due 9 months and 1 day after the year end."

---

### H2: Three red-flag patterns every director should recognise

Frame this as "what lenders and trade creditors look for when they pull your Companies House filing."

#### Red flag 1: Negative net assets (net liabilities)

If the net assets figure is negative, the company owes more in total than it owns. Present a brief variant of the worked example where the corporation tax accrual and trade creditors are much higher, pushing net assets to, say, (£4,200).

Explain: a company can trade with negative net assets if it has strong cash flow and a creditor who is patient (for example the director who has lent the company money). But it signals a risk. Banks will often decline further lending. Directors must monitor the position actively: if the company cannot reasonably pay its debts as they fall due, the directors' duty to act in creditors' interests engages under the Companies Act 2006 and the Insolvency Act 1986. Professional advice should be taken promptly. (Do not give specific insolvency thresholds beyond this; this page is a balance-sheet reading guide, not an insolvency guide.)

#### Red flag 2: Overdrawn directors loan account

An overdrawn DLA appears as a debtor in current assets (not labelled as such on the face of the accounts; it may be disclosed in the notes as a related-party transaction). Lenders know to look for it.

Explain what it means (the director has taken more out than was declared as salary or dividends) and the consequences: the CTA 2010 s.455 charge at the dividend upper rate (33.75% before 6 April 2026, 35.75% from 6 April 2026), the £10,000 benefit-in-kind threshold, and the need to repay or formally declare a dividend before the 9-months-and-1-day deadline to avoid the charge. Cross-reference the directors-loan-account-explained page for the full mechanics. Keep this section at "awareness" depth; the DLA page carries the detail.

Also flag: the 30-day rule (s.464ZA) blocks the repay-and-redraw approach for balances of £15,000 or more; the arrangements rule (ss.464C/464D) catches longer patterns. State these exist without over-explaining them.

#### Red flag 3: Creditor spike with declining working capital

If creditors due within one year have risen sharply while trade debtors and cash have stayed flat or fallen, the company is being funded by its creditors (it is paying suppliers late). Working capital (net current assets) will be contracting or negative. Brief illustrative example: last year working capital was £12,000; this year the trade creditors line has doubled but cash is the same, so working capital is now £2,000 and falling.

Lenders and credit-reference agencies (Experian Business, Creditsafe, Red Flag Alert) use balance-sheet ratios including the current ratio (current assets divided by current liabilities; below 1 signals a shortfall) and the acid test / quick ratio (current assets minus stock, divided by current liabilities; a tighter test). A deteriorating trend over two or three years of filed accounts is the real signal they look for, not one year in isolation.

Suggest actions: chase debtor book, negotiate extended supplier terms, talk to the bank, or bring in an accountant to review cash flow projections. Cross-reference the management accounting / cash flow page (A1, `cash-flow-management-small-business-uk`) when it is live. (Writer: if that page is not yet published, omit the cross-link.)

---

### H2: What lenders and credit agencies look at

Consolidate for the reader what external parties actually extract from the balance sheet:

- **Net assets trend** over 2-3 years of filed accounts (growing = healthy reinvestment; shrinking = erosion; negative = concern).
- **Working capital and current ratio** (current assets / current liabilities; lenders look for above 1, ideally above 1.5 for product businesses).
- **Gearing** (total debt / net assets or total assets): a high-gearing company has most of its financing from debt rather than equity. Banks typically want gearing below 50-60% for unsecured lending.
- **Retained earnings** (the P&L reserve): persistent losses eroding this reserve signal structural problems.
- **The directors loan account** (if material, disclosed in the notes even in abbreviated accounts; an overdrawn DLA is a governance flag for lenders).
- **Creditor days and debtor days** (derived from the balance sheet and turnover figure in the P&L): high creditor days means the company is slow to pay suppliers; high debtor days means customers are slow to pay.

Note: credit-reference agencies and lenders weight the trend over multiple years of filed accounts, not a single snapshot. Directors should file on time and monitor what their public record shows.

---

### H2: The balance sheet vs the profit and loss account

A short orientation section for readers who confuse the two:

- The **profit and loss account** (P&L): covers a period (the year). It shows revenue, costs, and profit or loss for the year. It tells you how the business performed.
- The **balance sheet**: a snapshot at one date. It shows the accumulated position. The profit (or loss) for the year flows from the P&L into the balance sheet: it increases (or decreases) the retained earnings reserve.

They link at one point: the net profit after tax for the year moves from the P&L to the "profit and loss account reserve" line on the balance sheet. If the company made £12,000 profit and paid no dividends, the reserve grows by £12,000. If it paid £12,000 in dividends, the reserve is unchanged (the profit replaced what was paid out).

---

### H2: How to read your own balance sheet in four steps

Practical action guide:

1. **Find the net assets figure.** Is it positive? By how much? Compare to last year. Is it growing or shrinking?
2. **Check working capital.** Subtract creditors due within one year from current assets. Is the result positive? If it is tight or negative, flag it.
3. **Look at the notes for the directors loan account.** Is it in credit (the company owes you) or overdrawn (you owe the company)? If overdrawn, check the year-end balance and talk to your accountant about the s.455 deadline.
4. **Compare to the prior year.** One year in isolation says little. Two or three years shows the direction of travel.

---

### H2: When you need an accountant

Trigger list, kept concise:

- Net assets are negative or falling sharply year on year.
- The directors loan account is overdrawn at the year end.
- You are applying for a bank loan or invoice finance facility and the lender wants to review your accounts.
- You are buying or selling the company (a buyer's accountant will forensically read the balance sheet).
- You do not understand a line item on your own balance sheet (your accountant produced it; they should be able to explain every line to you in plain English in under ten minutes).

Soft CTA: link to the lead form or a relevant service page. (Writer: use the standard footer LeadForm injection; do not duplicate a CTA in the body.)

---

## FAQ section (8 to 12 questions, full draft)

Per the six-check floor: FAQs must be in the frontmatter `faqs:` array; the body FAQ section should mirror them with `<h3>` markup and `<p>` answers (no markdown). All answers must pass the no-em-dash rule. Count target: 10.

---

**FAQ 1**
Q: What is a balance sheet in simple terms?
A: A balance sheet is a financial snapshot of your company at one specific date, usually your year end. It lists everything the company owns (assets), everything it owes (liabilities) and what is left over for shareholders (capital and reserves, also called net assets or equity). The three sections must always balance: assets minus liabilities equals capital and reserves.

**FAQ 2**
Q: What does the net assets figure on a balance sheet mean?
A: Net assets is the total value of everything your company owns minus everything it owes. If net assets are positive, the company has more assets than liabilities on a balance-sheet basis. If the figure is negative (shown in brackets), the company owes more than it owns. A positive and growing net assets figure generally signals a financially stable business; a negative figure should prompt an immediate conversation with your accountant.

**FAQ 3**
Q: Where does the directors loan account appear on the balance sheet?
A: The directors loan account (DLA) can appear in two places depending on whether it is in credit or overdrawn. If the company owes the director money (for example you paid expenses personally), the DLA appears as a debtor under current assets. If the director owes the company money (you have taken more out than was declared as salary or dividends), the DLA appears as a creditor under amounts due within one year. An overdrawn DLA at the year end triggers a tax charge under CTA 2010 s.455, so it is one of the first things your accountant and any lender will check.

**FAQ 4**
Q: What is the profit and loss account reserve on a balance sheet?
A: The profit and loss account reserve (sometimes called retained earnings) is the total of all the company's profits since it was incorporated, minus any losses and minus any dividends paid out. It is not cash. It is the accumulated equity the shareholders have built up inside the company. A high reserve means the company has retained past profits and reinvested them in the business. A low or negative reserve (called an accumulated deficit) means the company has made losses or paid out more in dividends than it earned.

**FAQ 5**
Q: What is working capital and why does it matter?
A: Working capital is the difference between your current assets (stock, debtors, cash) and your creditors due within one year (suppliers, HMRC liabilities, short-term loans). Positive working capital means you have more coming in short-term than going out. Negative working capital means you owe more in the next 12 months than your near-term assets can cover, which can lead to a cash-flow crisis even if the business is profitable on paper. Lenders and trade creditors look at this figure closely when assessing whether to extend credit.

**FAQ 6**
Q: What happens if my company has negative net assets?
A: Negative net assets (net liabilities) means the company's total debts exceed its total assets. The company is not automatically insolvent: it can still trade if it can pay its debts as they fall due and has ongoing support (for example a director loan). However, directors must take the position seriously. Under the Companies Act 2006 and the Insolvency Act 1986, directors must not allow the company to trade to the detriment of creditors when insolvency is reasonably foreseeable. If your balance sheet shows net liabilities, take advice from an accountant or insolvency practitioner promptly.

**FAQ 7**
Q: What is the difference between a balance sheet and a profit and loss account?
A: The profit and loss account shows what the company earned and spent over a period (usually a year) and whether it made a profit or a loss. The balance sheet is a snapshot at one date showing what the company owns, owes and has accumulated since it started. They connect at one point: the profit for the year flows from the P&L into the retained earnings reserve on the balance sheet. You need both to understand the full financial picture. The P&L tells you about performance; the balance sheet tells you about financial position.

**FAQ 8**
Q: Can I see other companies' balance sheets?
A: Yes. Every UK limited company must file its balance sheet at Companies House, where it is publicly searchable for free. Small companies may file an abridged version that omits the profit and loss account, but the balance sheet must always be filed. Credit-reference agencies (such as Experian Business, Creditsafe and Red Flag Alert) aggregate and score this data. Your suppliers, bank and potential customers may be checking your balance sheet before they agree terms with you.

**FAQ 9**
Q: What is the current ratio and why do lenders use it?
A: The current ratio is current assets divided by current liabilities. It measures whether the company can cover its short-term debts with its short-term assets. A ratio above 1.0 means current assets exceed current liabilities (the company can cover its near-term debts). Lenders typically prefer a ratio above 1.5 for product or stock-holding businesses. A ratio below 1.0 is a warning sign, though not a death sentence for a service business with fast-paying customers and predictable cash flow. Lenders look at the trend over two or three years as much as the current year.

**FAQ 10**
Q: What is called-up share capital on a balance sheet?
A: Called-up share capital is the nominal (face) value of shares the company has issued and called upon shareholders to pay. For most small owner-managed companies this is a very small number, for example 100 shares at £1 nominal value each, giving £100. The nominal value has little economic significance; it is a legal requirement under the Companies Act 2006. The real equity built up in the business shows in the retained earnings reserve, not in the share capital line.

---

## Cross-link map (binding from collision_verify)

These cross-links must appear naturally in the body. All slugs verified as existing pages.

| Target page | Slug | Where to link |
|---|---|---|
| How to file company accounts | `how-to-file-company-accounts-uk` | H2 "Why the balance sheet matters" (it is public / Companies House) |
| Trial balance and abbreviated accounts | `trial-balance-abbreviated-accounts` | Opening or scope note (trial balance is a working doc, not the published balance sheet) |
| Director sign-off accounts | `director-sign-off-accounts-non-accountant` | H2 "Why the balance sheet matters" (director signs it off) |
| Directors loan account explained | `directors-loan-account-explained` | Red flag 2 section (overdrawn DLA; full mechanics on that page) |
| Cash flow management (A1, when live) | `cash-flow-management-small-business-uk` | Red flag 3 / creditor spike section |

---

## House-position obligations

- DLA / s.455 charge: state 33.75% before 6 April 2026, 35.75% from 6 April 2026 (HP §4.A). Do not call it a permanent tax.
- No em-dashes anywhere in body copy.
- No utility CSS classes; semantic HTML only.
- LeadForm injected at footer by template; do not duplicate a CTA form in the body.
- Body word count target: 2,800 to 3,500 (non-pillar).
- FAQ count in body must match frontmatter `faqs:` array length (10 FAQs drafted above).
- Meta title ≤62 chars: PASS (55).
- Meta description ≤158 chars: PASS (157).

---

## Verification checklist for writer

Before committing, verify the following at primary source:

1. **CA 2006 s.382 size thresholds** (£10.2m / £5.1m / 50 employees for small company): confirm at legislation.gov.uk or frc.org.uk that these remain current. The thresholds were uplifted in 2016; a further uplift may be in force by 2026.
2. **FRS 102 Section 1A and Format 1 balance sheet presentation**: confirm at frc.org.uk that Format 1 vertical is the standard presentation for small companies. Quote the source in the page notes (not necessarily on-page, but in the session flag log if any discrepancy is found).
3. **CTA 2010 s.455 rate**: 33.75% for 2025/26, 35.75% from 6 April 2026. Already verified in HP §4.A. Cross-check the date band when writing.
4. **Competitor URLs**: WebFetch both URLs in picks.yaml. Confirm HTTP 200 and on-topic before referencing them.

No em-dash in any content verified as part of the six-check floor pass.

---

## Flags

No HP conflicts identified. No new statutory positions introduced beyond the locked HP.

**F-60 (discovery):** "creditor days / debtor days" as derived metrics from balance sheet + P&L is a gap in the generalist corpus. A standalone guide on interpreting management accounts ratios (debtor days, creditor days, gross margin) could be a future wave pick. Logged as discovery only.
