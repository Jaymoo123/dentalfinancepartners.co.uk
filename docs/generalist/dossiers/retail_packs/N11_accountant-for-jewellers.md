# PACK N11: net-new — accountant for jewellers (MLR high value dealer, margin scheme, stock)

Derived 2026-08-25 from FROZEN dossier `../retail_product_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **registration-trigger-led**). Single page for niche-map row 71,
matching C2's shape (jewellers = 1 page). **This is an explicit coverage play: demand is below the
measurement threshold, recorded not chased, and it is written to the same A* bar as the 250/mo
retail pillar.**

## 1. Target and permission level

- NET-NEW page. Proposed slug: `accountant-for-jewellers-uk` (writer may refine).
- Grade NET-NEW, single page. Revert path: delete pre-deploy; post-deploy enters `monitored_pages`.
- C1 gate: row 71 jewellers carries no C1 restriction of its own. CLEAR. **The binding constraint is
  §21.3 MLR accuracy, which is a factual-precision gate, not a permission gate.**
- Ground truth: **§21.3** (high value dealer registration: cash payments of **10,000 euros or more**,
  single payment or linked instalments for one transaction, for **goods**, register with HMRC
  **before the first such payment**, AML policies, annual fee; services-only receipts and
  card/cheque payments do not trigger it; the clean alternative most dealers choose is a hard
  cash-acceptance cap below the trigger), **§21.1** (margin schemes: finished second-hand jewellery
  qualifies, **precious metals, investment gold and loose precious stones are excluded**, global
  accounting for items bought at £500 or less), **§7** (VAT), **§21.4** (retail schemes where the
  jeweller has a shop), **§3**, **§2**, **§9**.
- **Open-question gate at write (§21 open question 1, hard for this page):** the **global accounting
  £500 item ceiling and the current Notice 718 wording were not fetched line by line.** §21 says
  verify before a jewellers page states it. Global accounting is genuinely relevant here (unlike for
  vehicles), so this verification is a write-blocker for that paragraph specifically. If it is not
  verified, the paragraph is omitted rather than hedged.

## 2. Equity register

None (net-new). Jewellers is an all-net-new niche with zero seeds (dossier §1).

## 3. Market keyword slice (ledger, below threshold, recorded not chased)

| Keyword | Vol/mo | Best peer |
|---|---|---|
| accountant for jewellers | null volume (autocomplete 10) | mytaxdoc, fusionaccountants, taj |
| jeweller accountant | null volume (autocomplete 4) | as above |
| start a jewellery business | null volume | non-accountancy noise |

Dossier §2: **"below threshold, coverage play, not a demand play"**, peer-winnable ~0. The dossier
also records the instruction that was followed: recorded, no spend hunting.

**Coverage over selection is the governing lock here.** Volume is not a gate. This page ships at
full quality because the family needs a jeweller surface, not because the numbers justify one, and
no argument to shrink it on volume grounds is admissible. `start a jewellery business` is startup
DIY intent and is answered only insofar as it touches registration and structure (see fences).

## 4. Competitor teardown (fetched 2026-08-25, free)

**There is no specialist field** (dossier §1). Jeweller SERPs return generalists with a jewellery
page plus non-accountancy noise. Best of that field, fetched:

- **mytaxdoc.co.uk `/accountants-for-jewellers/`** — **~550 words.** H1 "Tech-Savvy Accounting Firm
  Serving the UK Jewellery Industry". Opener: "As a modern, tech-driven accounting firm, MyTaxDoc
  uses the latest software and digital tools to provide efficient and accurate financial services to
  the UK jewellery sector." H2s: "Your Jewellery Business, Our Expert Accounting"; "The Practical
  Accountancy Advice We Offer"; "Tailored Tax Solutions"; "Payroll & Employment Support"; "Company
  Formation & Structuring"; "Ready to Transform Your Accounting Experience?". **Zero figures. Zero
  FAQs. Zero worked examples. The VAT margin scheme is not mentioned. High value dealer registration
  and money laundering are not mentioned.**
- The wider field (Experlu, QAccounting, Pearl Lemon, zmartly) markets against the same two topics
  in listing copy. A free search returns their marketing claims about "the VAT Margin Scheme to High
  Value Dealer registration" and about the precious-metals exclusion, but the fetched page in the
  field carries neither. Positions for those domains are unmeasured, so they are field evidence,
  not rank-weighted winners.

**A 550-word page with no numbers is the best this niche has.**

## 5. Whitespace

- **The two registration triggers, stated first.** A jeweller can be caught by **high value dealer
  registration** (cash of 10,000 euros or more, register **before** accepting) and by **VAT
  registration** (£90,000). Both are date-and-figure specific, both are missed, and no page in the
  field states either.
- **Register before, not after.** The HVD obligation bites before the first qualifying payment, and
  the **linked-instalments trap** (a single transaction split into instalments still counts) is the
  detail that catches honest businesses. §21's writing rule requires both points every time.
- **The clean alternative**, stated plainly: most dealers simply cap cash acceptance below the
  trigger. That is a real, lawful, useful answer and it is unpublished.
- **The margin scheme applied to jewellery, with the exclusion that matters:** finished second-hand
  jewellery qualifies; **precious metals, investment gold and loose precious stones do not.** §21's
  writing rule requires the exclusion on every jewellery page, every time. A jeweller who applies the
  scheme to scrap gold or unmounted stones has a serious problem and nobody is telling them.
- **High-value stock**, customer deposits on commissioned pieces, and insurance valuation versus
  accounting cost.
- A recomputable 2026/27 worked example: a second-hand piece under the margin scheme against the
  same piece outside it, with the exclusion tested.

## 6. Fences (binding)

- **§21.3 precision is mandatory.** The trigger is **10,000 euros or more** (or equivalent), for
  **goods**, single payment **or linked instalments for one transaction**, and registration is
  **before** the first such payment. Never round it to "£10,000". Never state it as an annual
  aggregate. Never imply registration can follow the transaction.
- **The precious-metals, investment-gold and loose-stones exclusion appears every time the margin
  scheme is mentioned on this page.** §21 writing rule, non-negotiable.
- **Global accounting £500: verify (§21 open question 1) or omit the paragraph.** No hedged version.
- **No anti-money-laundering advisory service is offered or implied.** The page describes a
  registration obligation and points to HMRC. The estate is not an AML supervisor and offers no
  AML programme, no risk assessments, no compliance audits.
- **No hallmarking or Assay Office content beyond one factual sentence.** It is not tax and it is not
  in house positions.
- **No consumer content.** No jewellery valuations, no "what is my ring worth", no investment-gold
  buying content. The reader is a jewellery business owner.
- **No startup DIY content.** `start a jewellery business` is answered only through the registration
  and structure lens, not as a how-to-start guide (EX-STARTUP-DIY intent bar).
- **Assignment split:** the used-car application of the same scheme is N9's, and **N11 must not
  repeat N9's worked calculation**. Retail scheme arithmetic is N1's if the jeweller has a shop.
- No house-position citations in reader copy (report only): cite the gov.uk high value dealer
  registration page, VAT Notice 718 and the gov.uk VAT margin schemes page by name instead. No
  em-dashes. Rates date-tagged; 2025/26 bands and Class 4 carry the "still current when checked
  August 2026" hedge.

## 7. Acceptance criteria (deterministic)

1. Queries answerable as H1, H2 or FAQ: accountant for jewellers; jeweller accountant; do I need to
   register as a high value dealer; can I use the VAT margin scheme on second-hand jewellery; is
   gold covered by the margin scheme; how much cash can a jeweller accept.
2. Figures, date-tagged and recomputable: **10,000 euros** HVD trigger with the linked-instalments
   and register-before points; margin scheme **one-sixth (16.67%) of the margin**; the precious
   metals, investment gold and loose precious stones exclusion; VAT £90,000 / £88,000 and 20%;
   retail scheme gates £1m and £130m where a shop is involved; corporation tax 25% / 19% with the
   £50,000 and £250,000 limits.
3. One worked example (a second-hand piece under and outside the margin scheme), every line
   re-derivable, and **it must not be N9's example in different words**.
4. Question-form FAQ block (the field has none anywhere).
5. Structure follows the registration-trigger lead: both triggers in the opening sentences. No H2
   phrasing shared with N1, N9 or N10, and none of mytaxdoc's six H2 phrasings reproduced.
6. Links: N9, N1, R1. Resolver-clean, zero invented slugs. §4 floors plus coverage floor pass.
7. Global-accounting verification recorded, or the paragraph confirmed omitted.

## 8. Expectation

**Coverage surface. Demand is below the measurement threshold and this page will not be judged on
volume.** Realistic: a small number of impressions on jeweller-accountant and margin-scheme-jewellery
phrasings within a quarter, in a field whose best page is 550 words with no numbers; a genuine
first-mover position on the HVD question, which nobody in the field addresses at all. Bing earlier.
Maturity caveat: net-new, judge at 28d Bing / 90d Google, on impression breadth rather than position.
Failure trigger: zero impressions across all named phrasings at 90d post-index. **Standing risk:**
the euro-denominated HVD trigger and Notice 718 terms are both back-patch candidates; each sits in
its own replaceable block.

## 9. Cannibalisation notes

| Existing page | Overlap | Resolution |
|---|---|---|
| N9 (this wave) | the same margin scheme | Split by goods: N9 vehicles (stock book, per-vehicle numbers, no global accounting), N11 second-hand jewellery and antiques (precious-metals and loose-stones exclusion, global accounting if verified). Distinct worked examples enforced at QA on both files. Never collapse. |
| N1, R1 (this wave) | retail, retail VAT schemes | A jeweller with a shop is served by N1 for scheme arithmetic and R1 for the pillar. N11 links, does not restate. |
| `accountant-for-retail-shops-uk.md` (R1) | retail sub-trade | Pillar versus sub-trade split, same as N2. |
| existing VAT calculator family | VAT arithmetic | No link, no shared phrasing; N11's arithmetic is margin-scheme specific. |
