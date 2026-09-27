# Track A factual QA: alphabet-shares-contractor-company

Post: `docs/contractors-ir35/_wave1/posts/alphabet-shares-contractor-company.md`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4a (QA) and S4b
Tie-breakers: `docs/contractors-ir35/house_positions.md` §5 to §8, §17; ITTOIA 2005 ss.624, 625, 626, 629; Jones v Garnett [2007] UKHL 35
Reviewed: 2026-09-27

## House-positions gap

`house_positions.md` has **no settlements-legislation section**. Sections 5 to 8 and 17 cover
personal tax, NIC, corporation tax, extraction and the grey-area stances, but nothing on ITTOIA
2005 Part 5 Chapter 5, the s.626 spouse exemption, Jones v Garnett, dividend waivers or the s.629
minor-child rule. Everything in the settlements half of this post was checked against the statute
and the case directly. Recommend a new locked section covering the settlements conditions, the
spouse exemption tests, the £100 minor-child limit and the house line on dividend waivers, since
the whole of Wave 1's alphabet-share, spouse-salary and family-shareholding material turns on it.

## Assertions

### Frontmatter

| # | Assertion | Verdict | Note |
|---|---|---|---|
| F1 | `category: Limited Company Tax` | CORRECT | On the S4b contractors list verbatim |
| F2 | `canonical` = `.../blog/limited-company-tax/alphabet-shares-contractor-company` | CORRECT | Nested form required for contractors; slugified category = `limited-company-tax` |
| F3 | `metaTitle` 55 chars | CORRECT | Under 60 |
| F4 | `metaDescription` 153 chars | CORRECT | Under 155 |
| F5 | `summary` 55 words | CORRECT | 40 to 60 band |
| F6 | `author: Contractor Tax Accountants Editorial Team` | CORRECT | Matches existing contractors posts |
| F7 | `date` = `dateModified` = 2026-09-27, new post | CORRECT | |
| F8 | 6 faqs, 5 keyTakeaways, `generator: claude-opus`, `h1`, `slug` present | CORRECT | Within 4 to 6 and 3 to 5 |
| F9 | YAML parses, 15 keys | CORRECT | Re-validated after edits |
| F10 | Takeaway: s.624 taxes the income back where there is bounty and a retained interest | CORRECT | ITTOIA 2005 s.624(1), s.625 |
| F11 | Takeaway: s.626 saves a genuine outright gift of an ordinary share, the Jones v Garnett point, but not a share wholly or substantially a right to income | CORRECT | s.626(2)(b); the Lords held a settlement existed and the exemption (then ICTA 1988 s.660A(6)) applied |
| F12 | Takeaway: s.629, unmarried minor child, £100 a year | CORRECT | s.629(1), limit in s.629(3),(4) |
| F13 | Takeaway: 2026/27 £500 allowance, 10.75% and 35.75% | CORRECT | House positions §5 |
| F14 | FAQ: dividend waivers, repeated use where reserves would not cover an equal dividend per share, supports bounty | CORRECT | HMRC TSEM4225 pattern, framed as a risk pattern with no figure |
| F15 | FAQ: upper rate starts at £50,270; a spouse already above it saves nothing | CORRECT | §5 frozen bands |

### Body

| # | Assertion | Verdict | Note |
|---|---|---|---|
| B1 | Holds where a spouse or civil partner holds a real ordinary share with capital, voting and income rights, given outright | CORRECT | s.626(2), (3), (4) |
| B2 | Jones v Garnett decided by the House of Lords in 2007, Arctic Systems | CORRECT | [2007] UKHL 35, 25 July 2007 |
| B3 | Spouse exception "now in ITTOIA 2005 s.626" | CORRECT | Correctly hedged: the case itself ran on ICTA 1988 s.660A(6) |
| B4 | Upper dividend rate 35.75% in 2026/27, up from 33.75% before 6 April 2026 | CORRECT | §5, FA 2026 s.4 |
| B5 | Ordinary dividend rate 10.75% | CORRECT | §5 |
| B6 | £500 dividend allowance each | CORRECT | §5 |
| B7 | 35.75% band runs £50,270 to £125,140 | CORRECT | §5 |
| B8 | s.626 exception available only between spouses and civil partners | CORRECT | s.626(1) |
| B9 | Outright gift, no conditions, no route back, no benefit to the giver | CORRECT | s.626(3) |
| B10 | The two s.626 requirements, labelled "Condition A" and "Condition B" | WRONG (labels) | Substance right, but s.626 carries no lettered conditions; statutory-sounding labels removed, see E1 to E3 |
| B11 | s.624: income under a settlement taxed as the settlor's alone where it arises in the settlor's life from property in which the settlor has an interest | CORRECT | s.624(1)(a),(b) |
| B12 | s.625 defines the settlor's interest | CORRECT | s.625(1) |
| B13 | Settlement is wider than a trust and reaches an arrangement with an element of bounty | CORRECT | s.620(1), as read in Jones v Garnett |
| B14 | An income-only share class fails the second requirement | CORRECT | s.626(2)(b) |
| B15 | s.629, unmarried minor child, £100 a year, never works under 18 | CORRECT | Scoped in the text to "your" minor child, so the settlor-parent limit holds |
| B16 | A waiver used repeatedly where reserves would not cover the same dividend per share on all classes points at bounty | CORRECT | Risk framing, no figure |
| B17 | A disproportionate dividend to a passive holder invites challenge outside the spouse exception | CORRECT | Judgement framing, no claim of certainty |
| B18 | Saving on £20,000 moved to a spouse with no other income given as "the 25 percentage point gap on most of it" | WRONG | Understates it: the first £12,570 falls in the personal allowance and the next £500 in the dividend allowance, so most pounds save the full 35.75%, not 25 points. Also one figure where the spec wants a range. Fixed, see E4 |
| B19 | Moving £20,000 to a spouse already earning £60,000 saves nothing | CORRECT | Both at 35.75%, and £80,000 stays under £125,140 |
| B20 | Corporation tax unaffected: 19% below £50,000 of profit, main rate with marginal relief above | CORRECT | §7 |
| B21 | Employment Allowance cannot be claimed by a company whose only employee is a single director | CORRECT | §6; the post hedges with "can open up", not a guarantee |
| B22 | No universal optimal salary asserted | CORRECT | §8 stance respected; the post gives no salary figure at all |
| B23 | Body is raw HTML, no markdown, no shortcodes, no CTA markup | CORRECT | Only `<p>`, `<h2>`, `<ul>`, `<table>`, `<strong>`, `<em>` |
| B24 | 4 internal links, all verified on disk | CORRECT | `/blog/limited-company-tax/corporation-tax-contractor-limited-company` and `/blog/limited-company-tax/director-salary-dividend-split-guide` (both `category: Limited Company Tax`), `/blog/pension-and-dividends/dividend-tax-rates-contractors-2026` (`category: Pension and Dividends`), and `/calculators/contractor-salary-dividend-calculator` = `contractors-ir35/web/src/lib/calculators/tools/contractor-salary-dividend-calculator.ts`. 4 is within the cap of 5 |
| B25 | No em-dashes, British English, no pricing, no named people, "a specialist reviews" | CORRECT | |
| B26 | Body length | CORRECT | 1,170 words after edits, inside 800 to 1,200 |

No UNSOURCED figures were left standing and no STALE rates were found: every rate, allowance and
threshold in the post is the 2026/27 set locked in house positions §5 to §7.

## Edit log

| # | Where | Change | Reason |
|---|---|---|---|
| E1 | Conditions table, "Full rights, not income only" row | "Condition B in s.626 fails if..." to "The s.626 exception is lost where..." | s.626 has no lettered conditions; the label read as a statutory citation |
| E2 | "How does the settlements legislation actually bite?", second paragraph | "it carries two conditions. Condition A is... Condition B is..." to "it carries two requirements. The first is... The second is..." | Same reason, substance unchanged |
| E3 | "Where do alphabet shares fail?", first bullet | "This is the Condition B problem" to "This is the second requirement failing" | Same reason |
| E4 | "How much does the split save at 2026/27 rates?" | "saves the 25 percentage point gap on most of it, because the whole amount still sits below £50,270 in the spouse's hands" to "saves somewhere between 25 percentage points and the full 35.75% on each pound, depending on how much of it lands in the spouse's unused personal allowance, dividend allowance and basic-rate band. The whole amount still sits below £50,270 in the spouse's hands." | The old line was arithmetically wrong (it ignored the personal and dividend allowances) and gave a single figure where the saving must be a range |

4 edits. YAML re-validated after the edits: parses, 15 keys, body 1,170 words.

VERDICT: PASS
