# Track A factual QA: contractor-accountant-fees-cost

Reviewed 2026-09-27. Extension of the live post `contractors-ir35/web/content/blog/contractor-accountant-fees-cost.md`.
Authority: `docs/contractors-ir35/house_positions.md` (HP) plus the primary sources HP cites. Spec: LEADS_250 §13 S4a QA / S4b.

## Assertions

| # | Assertion in the file | Source | Verdict |
|---|---|---|---|
| 1 | No monthly fee figure, range or worked fee example anywhere in the file | grep for the pound sign (literal and escaped), "per month", "a month", "pcm", "price/pricing": only MTD and VAT statutory thresholds returned | CORRECT (price figures fully removed; the live post's £60 to £150 range, the "£95 per month" example, the summary, takeaway 1 and FAQ 1 are all gone) |
| 2 | MTD for IT: qualifying income above £50,000 from 6 April 2026 | HP §16 | CORRECT |
| 3 | MTD for IT: £30,000 from 6 April 2027 | HP §16 | CORRECT |
| 4 | MTD for IT: £20,000 from 6 April 2028 | HP §16 | CORRECT |
| 5 | MTD for IT applies to sole traders and landlords | HP §16 | CORRECT |
| 6 | A contractor taking salary and dividends from a PSC is generally outside MTD for IT; it does not apply to company profits or to a director's dividends | HP §16 ("PSC contractor is generally OUTSIDE"; "do NOT say MTD applies to company profits or to a director's dividend income") | CORRECT, with the required "generally" hedge |
| 7 | MTD for IT "started on 6 April 2026" | HP §16 | CORRECT |
| 8 | VAT registration compulsory once turnover passes the £90,000 threshold | HP §9 | CORRECT |
| 9 | Dividend ordinary rate 10.75% and upper rate 35.75%, rose on 6 April 2026 | HP §5, FA 2026 s.4 | CORRECT (tax-year tagged as HP §5 requires) |
| 10 | Under Finance Act 2026 s.4 | HP §5 and the verification log (FA 2026 c.11, s.4) | CORRECT |
| 11 | Chapter 10 ITEPA 2003: a medium or large client issues the Status Determination Statement and the fee-payer operates PAYE | HP §1, §3 | CORRECT |
| 12 | Chapter 8: a small or overseas client leaves the assessment with your company | HP §1, §1.A | CORRECT |
| 13 | FAQ: "Under Chapter 10 the client issues the determination and you have a disagreement route if it looks wrong" | HP §3 (client-led disagreement process) | CORRECT (the 45-day limb is not stated; an omission, not an error) |
| 14 | MSC rules sit in Chapter 9 of ITEPA 2003 | HP §13 | CORRECT |
| 15 | MSC rules do not depend on a status test | HP §13 | CORRECT |
| 16 | Where they bite, unpaid PAYE can transfer as a personal debt to the worker and to the directors | HP §13 (s.688A, MSC Regulations 2007) | CORRECT |
| 17 | Providing accountancy services in a professional capacity is expressly carved out by s.61B(3) | HP §13 | CORRECT |
| 18 | An independent firm whose client makes their own decisions and could leave freely sits on the safe side; the risk sits with standardised products that influence or control how you are paid | HP §13 advice-versus-product boundary, §17.G | CORRECT |
| 19 | "the well-known test cases are listed for First-tier Tribunal hearings during 2026 and remain undecided" | HP §13 (hearings June 2026 and November 2026; HP carries an [UNVERIFIED - reviewer check] on whether a judgment has landed) | STALE, fixed (see edit 1). One of the two listed hearings fell in June 2026, before the review date, so the forward-looking "are listed" no longer reads correctly |
| 20 | No provider or firm is named anywhere | full-text scan: Churchill Knight, Boox and every other firm name absent | CORRECT (HP §13 and §17.G both require this) |
| 21 | Treat this as risk management rather than a verdict on any provider | HP §17.G | CORRECT |
| 22 | Accountancy fees wholly and exclusively for the trade are deductible against corporation tax, so the after-tax cost is lower than the headline | general CT wholly-and-exclusively principle; the live post's "19% to 25%" numeric claim was dropped | CORRECT (no unsourced number left) |
| 23 | Personal work such as a self assessment covering income unconnected with the company is not a company expense | wholly-and-exclusively principle | CORRECT |
| 24 | PSC obligations listed: statutory accounts, CT600, confirmation statement and Companies House filings, RTI payroll, dividend vouchers and board minutes, VAT returns, director's self assessment | routine company-law and HMRC filing obligations | CORRECT |
| 25 | "the Flat Rate Scheme decision modelled rather than assumed" | HP §9 house stance (model standard VAT accounting against the applicable FRS percentage before recommending the FRS) | CORRECT |
| 26 | Sole trader or mixed income row: digital records, quarterly updates and the final declaration | HP §16 | CORRECT |
| 27 | "2026/27" used as the current tax year throughout | HP preamble | CORRECT |
| 28 | Claims present in the live post and NOT reintroduced: the £60 to £150 range, "£95 per month", the 19% to 25% CT saving, the £10,500 Employment Allowance / £5,000 secondary threshold / £6,708 LEL passage, PGMOL, the "cheapest is a false economy" framing | n/a | noted, all absent |

No UNSOURCED figure survives in the file. Every number that remains (£50,000 / £30,000 / £20,000, £90,000, 10.75% / 35.75%, 6 April 2026, Chapters 8, 9 and 10, s.61B(3), FA 2026 s.4) is a locked HP figure with a statutory hook.

## Frontmatter and structure (S4b)

| Check | Result |
|---|---|
| YAML parses | PASS (20 keys, re-validated after the edit) |
| `slug` unchanged from the live post | PASS (`contractor-accountant-fees-cost`) |
| `date` unchanged | PASS (`2026-06-12`) |
| `category` unchanged and verbatim from the site's list | PASS (`Contractor Accounting Basics`) |
| `canonical` nested, site url plus category slug plus slug | PASS (`https://www.contractortaxaccountants.co.uk/blog/contractor-accounting-basics/contractor-accountant-fees-cost`; host matches `contractors-ir35/web/src`) |
| `dateModified` bumped on an extended post | PASS (`2026-09-27`; the live file carries none) |
| `generator` | PASS (`claude-opus`) |
| `metaTitle` 60 or fewer | PASS (49) |
| `metaDescription` 155 or fewer | PASS (153) |
| `summary` 40 to 60 words, answers the question | PASS (55) |
| `faqs` 4 to 6 | PASS (6) |
| `keyTakeaways` 3 to 5 one-sentence strings | PASS (5) |
| `h1`, `author`, `title` present | PASS |
| Body is raw HTML, never markdown | PASS (`<p>`, `<h2>`, `<table>`, `<ul>`) |
| Body word count 800 to 1,200 | PASS (1,070 after the edit, tags stripped) |
| Internal links at most five, each an anchor | PASS (5) |
| Links resolve on disk with the category from each target's own frontmatter | PASS: `how-to-choose-contractor-accountant`, `how-to-switch-contractor-accountant` and `msc-legislation-contractors` (all Contractor Accounting Basics); `director-salary-dividend-split-guide` (Limited Company Tax); `do-i-need-an-accountant-for-mtd` (MTD and Compliance) |
| No em-dashes | PASS (0) |
| No pricing, no named people, no named firms, no firm claims | PASS |
| No shortcodes, no CTA markup | PASS |

## Edit log

1. **STALE, fixed.** Body, MSC paragraph. Was: "the well-known test cases are listed for First-tier Tribunal hearings during 2026 and remain undecided". Now: "the well-known test cases were before the First-tier Tribunal during 2026 and remain undecided as at September 2026". Reason: HP §13 puts the hearings in June 2026 and November 2026, and the June listing is already in the past at the review date, so the forward-looking "are listed" is stale. The undecided status and the no-verdict framing (HP §13, §17.G) are preserved.

No other edits. No WRONG assertion found, and no UNSOURCED figure to remove.

Open item carried, not a defect in this post: HP §13 still carries its own `[UNVERIFIED - reviewer check]` on whether an FTT judgment has landed. This review could not check that against a live source. If a judgment has landed, HP §13 and every citing page, this one included, need the status line updated.

VERDICT: PASS
