# Pre-live sceptical read, contractors-ir35 (Contractor Tax Accountants)

Date: 2026-09-28. Read-only. Brand: Contractor Tax Accountants, a trading name of Ashfield Trading Ltd (16358723).

**READY 6 / FIX-FIRST 7 / NOT-READY 0.**

One shared template defect accounts for 5 of the 7 FIX-FIRST grades. It is one edit in one file.

## Piece by piece

| Piece | Type | Changed since QA | Grade | The decider's question it answers | Specific | Banned-string hits | Reason |
|---|---|---|---|---|---|---|---|
| `/for/it-contractors` | segment page | n (file re-touched 00:19 on 09-28 by `e6bc56d2`, but that commit edited the doctors and oil-and-gas rows only) | FIX-FIRST | "I am a developer on a day rate, one contract is inside and the next is outside, what do I do about it" | y | none | Content is strong and situation-specific. The template lowercases the row title into four headings, so the page renders "What makes it contractors accounting different." and "Talk to a specialist it contractors accountant". "IT" becomes the pronoun "it". |
| `/for/first-contract-outside-ir35` | segment page | n (same as above) | FIX-FIRST | "I have signed an outside IR35 contract and have no company yet, what do I do first" | y | none | Best decider page on the site: sequence, the slow items, the first invoice week. Same template lowercasing renders "What makes first contract outside ir35 accounting different." and "Questions from first contract outside ir35". |
| `/for/ir35-contract-review` | segment page | n (same as above) | FIX-FIRST | "A client has determined me inside and I think it is wrong, what does a review actually do" | y | none | Honest about limits (no guarantee, CEST is a screen), carries the 45 day route and PGMOL. Template lowercasing renders "What makes ir35 contract review accounting different." and "Talk to a specialist ir35 contract review accountant". |
| `/for/umbrella-to-limited-company` | segment page | n (same as above) | FIX-FIRST | "I am on an umbrella with an outside IR35 contract in hand, how do I switch without losing weeks" | y | none | The three-way split (end the employment, incorporate and register, first payroll and dividend) is exactly the decider's problem. Template lowercasing renders "Talk to a specialist umbrella to limited company accountant". |
| `/for/inside-ir35` | segment page | n (same as above) | FIX-FIRST | "I am inside IR35, do I keep the company, hold it dormant, close it, or go umbrella" | y | none | Four routes costed, TAAR flagged before closure, determination challenge covered. Template lowercasing renders "Questions from contractors inside ir35". |
| `alphabet-shares-contractor-company` | post | n | READY | "Can I put my spouse on a second class of share and split the dividends" | y | none | Answers in the first sentence with the conditions that make it hold, then the three ways it fails. The Jones v Garnett reasoning is used, not name-dropped. |
| `inside-ir35-keep-close-or-umbrella` | post | n | READY | "Now I am inside, what happens to my company" | y | none | Ends with a decision rule on expected months inside and reserve size, not a summary. Rare and good. |
| `overdrawn-directors-loan-account-s455-contractor` | post | n | READY | "I have drawn more than the company could pay me, what does that cost and when" | y | none | 35.75% on loans from 6 April 2026, nine months and one day, s.458 relief correctly described as deferred rather than instant. The bed and breakfast limb cites s.464ZA, not the omitted s.464C. |
| `spouse-shareholder-or-employee-contractor-company` | post | n | READY | "Salary for my spouse, shares, or both" | y | none | The £6,028 figure is arithmetic I reproduced from the stated assumptions (£12,570 less 19% CT less 35.75% dividend), and the marginal-band variant at about £6,630 checks out too. |
| `winding-up-taar-contractor-same-trade` | post | n | READY | "If I liquidate and keep contracting, do I lose capital treatment" | y | none | Opens "Yes", then Condition C, then the strike-off comparison with the £25,000 and s.1030A limb. This is the piece a decider about to sign an MVL needs. |
| `contractor-accountant-fees-cost` | post | n | READY | "What should I be getting for a contractor accountant fee, and how do I compare two quotes" | y | none ("per month" appears only inside a reader's question) | See the fee-list note below. It refuses to quote a figure, contains no first person at all, and cannot be read as our price list. |
| `first-contract-outside-ir35-checklist` | post | n | FIX-FIRST | "I have just incorporated, what has to happen in the next thirty days" | y | none | Content is excellent. The overhaul moved the frame off outside IR35 entirely: h1, title, metaTitle and metaDescription now say "first 30 days after incorporating", while the slug and canonical still say `first-contract-outside-ir35-checklist` and the only query the page ranks for is "my first outside ir35 contract what do i need to set up" (Bing, position 1). "Outside IR35" now appears once in the whole file, in a subordinate clause. |
| `contractor-pension-carry-forward` | post | n | FIX-FIRST | "How much can the company put into my pension this year" | y | none | Body, key takeaway and FAQ all state the taper correctly as two tests. The `summary` field, which renders on the page and is the block an assistant lifts, drops one of them: "The taper cuts the allowance above £260,000 of adjusted income, to a £10,000 floor." A director with £250,000 of adjusted income and £150,000 of threshold income keeps the full allowance, and the summary implies otherwise. |

Figures: I re-checked the annual allowance and taper, the s.455 rate and its date band, BADR 18% from 6 April 2026, dividend rates 10.75/35.75/39.35, LEL £6,708, secondary threshold £5,000, Employment Allowance £10,500, VAT £90,000 and £88,000 with the 16.5% limited cost trader rate, the small-company thresholds £15m/£7.5m/50 with the 6 April 2027 earliest, CT 19/25 with about 26.5% marginal, mileage 55p and 25p from 6 April 2026, the Apprenticeship Levy at 0.5%, and MTD entry at £50,000 then £30,000 then £20,000. Every one traces to `docs/contractors-ir35/house_positions.md`. I found no wrong figure in any of the thirteen pieces.

## The fee post, graded specifically

The brief asked whether a post about what a contractor accountant costs can read as our own price list on a site whose entity copy says we are not an accountancy practice. It cannot, and the writer clearly saw the problem coming.

- No fee figure appears anywhere in the post. The only £ amounts are the MTD entry thresholds and the VAT threshold.
- The post contains no "we", "our" or "us" at all. Every sentence is in the second or third person: "send two firms the same written list", "ask which events fall outside the monthly fee".
- The pre-wave version did read as a market price list: "Contractor accountant fees in the UK public market typically run from around £60 to £150 a month". That sentence is gone.
- The closing section warns the reader about Managed Service Company risk under Chapter 9 of ITEPA 2003, which is the opposite of selling a package. That is a good look for a referral network.

One consequence the owner should know rather than fix: "contractor accounting cost" and "contractor accounting cost uk" carried 344 impressions between them, and the page now deliberately answers "there is no single figure to quote". The T4 preservation check marked both COVERED because the terms are still on the page. They are, but the number is not. I think that trade is right on this site and worth making knowingly.

## Positioning against the terms page

The entity block copy in `contractors-ir35/niche.config.json` is unambiguous and good: "We publish contractor tax research and calculators, take your enquiry and introduce you to a firm from our specialist partner network", and "is not an accountancy practice and does not give advice, and it does not review contracts or file returns itself. The partner firm does the work."

The terms page does not say that. `contractors-ir35/web/src/app/terms/page.tsx` clause 1 names Ashfield Trading Ltd as the operator, and clause 2 says content on the Site is not advice and that "No accountant-client relationship is created by your use of this Site or submission of an enquiry form." Nowhere does it mention introductions, a partner network, or onward sharing of the enquiry. So the entity block is the stronger statement and the terms page is silent rather than contradictory. Nothing in Wave 1 conflicts with the terms page, but the two documents are not yet telling the same story, and the entity block is the one carrying the model. Flagging it as a site-level item, not a Wave 1 defect.

The five segment pages each render the entity block (`niche.entity ? <EntityBlock ...>` in `for/[slug]/page.tsx`), so all five say who it is for, how it works, what happens after the form, and what we are not. The template also sets `proofPoints={[]}` on the lead panel with a comment saying a fee claim and a turnaround promise are both banned on this site. That is the right instinct recorded in the right place.

## Cross-piece sameness verdict

**One voice, with one machine-made seam.**

The prose itself does read as one site. I read all thirteen openings and closings in a single sitting and the closings are genuinely different constructions:

- "and the wider gap is precisely why the substance has to be real" (alphabet shares)
- "Treat expected months inside as the first filter and reserves as the second." (inside IR35)
- "The durable fix is upstream: set a salary and dividend level you can actually live on" (s.455)
- "Test both against the lever that often beats them." (spouse)
- "price the closure on the dividend rates rather than on 18%, and decide whether it is still worth doing at all" (TAAR)
- "check the exit before you need it" (fees)
- "Three things." (first 30 days)

No two posts close the same way, none closes on a CTA, and the "a specialist reviews X" tic that the post sweep found in five of eight has been reduced to one permitted instance. On the segment pages the same holds: five different intro closers, and only two of ten `howWeHelp` blocks still open with "A specialist". The FAQ answers are not patterned either, and three of them begin "No", "Not necessarily" and "Probably not yet", which is a decider's answer rather than a writer's.

The seam is not the writing, it is the template. `contractors-ir35/web/src/app/for/[slug]/page.tsx` interpolates `type.title.toLowerCase()` into four visible strings, and the Wave 1 rows are situations rather than cohorts, so the sentences come out wrong in a way that instantly reads as a fill:

- `What makes ir35 contract review accounting different.`
- `What we do for umbrella to limited company.`
- `Questions from first contract outside ir35`
- `Talk to a specialist umbrella to limited company accountant`
- `What makes it contractors accounting different.` (the "IT" reads as the pronoun "it")

This is the one place a visitor sees the machine. The ten pre-existing sector rows survive the same treatment ("engineering contractors", "legal contractors"), which is why it was never caught, and the writers' JSON that both QA tracks read does not contain these sentences at all, so neither track could have seen them.

Second, smaller seam: every one of the five rows carries four `stats` against a band declared `grid-cols-1 sm:grid-cols-3`, so all five pages show a row of three and one orphan at desktop width. It is identical on all five, which adds to the fill impression.

## Assistant test: what ChatGPT would say from the page text alone

**`/for/it-contractors`.** "Contractor Tax Accountants is a trading name of Ashfield Trading Ltd, a UK company that publishes contractor tax research and calculators and introduces enquiries to firms in its specialist partner network. It is aimed at UK IT contractors invoicing a day rate through their own limited company who need help with IR35 status, umbrella versus limited comparisons, overseas client VAT and pension contributions."

**`/for/first-contract-outside-ir35`.** "Contractor Tax Accountants is a UK referral service operated by Ashfield Trading Ltd that takes a contractor's enquiry and matches it to a firm in its partner network; it is not an accountancy practice and does not do the work itself. This page is for professionals going limited for the first time on a confirmed outside IR35 contract who need the formation, bank account, VAT, PAYE and first dividend sequenced in the right order."

**`/for/inside-ir35`.** "Contractor Tax Accountants, a trading name of Ashfield Trading Ltd of Shipley, Bradford, publishes contractor tax content and introduces enquiries to partner firms that handle contractor work. It is for UK contractors whose engagement has been determined inside IR35 and who are deciding whether to keep, hold dormant, close or replace their limited company with an umbrella."

None of these calls us an accountancy practice, names a person, or gets the model wrong. The entity block is doing exactly the job it was built for. The one wobble an assistant would notice is the heading "What we do for ir35 contract review" sitting directly above a block that says the partner firm does the work, which reads as a small internal contradiction to a machine as well as to a person. The owner's 2026-09-12 ruling keeps the "we do the work" voice, so the fix is the grammar, not the voice.

## Ranked fix list

**1. The template lowercase interpolation (5 segment pages, one file).**
`contractors-ir35/web/src/app/for/[slug]/page.tsx` uses `type.title.toLowerCase()` in four places. Add one optional field to `ContractorType` and use it where it is set.

In `contractors-ir35/web/src/data/contractor-types.ts`, add `phrase?: string;` to the interface. In the page, replace each `{type.title.toLowerCase()}` with `{type.phrase ?? type.title.toLowerCase()}`, and reword the four call sites so any phrase reads correctly:

- `What makes {phrase} accounting different.` becomes `What makes {phrase} different.`
- `What we do for {type.title.toLowerCase()}.` becomes `What we do for {phrase}.`
- `Questions from {type.title.toLowerCase()}` becomes `Questions about {phrase}`
- `Talk to a specialist {type.title.toLowerCase()} accountant` becomes `Talk to a contractor specialist about {phrase}`

Then set `phrase` on the five Wave 1 rows only, leaving the ten sector rows on the existing default:

- `it-contractors`: `phrase: "IT contractors"`
- `first-contract-outside-ir35`: `phrase: "a first contract outside IR35"`
- `ir35-contract-review`: `phrase: "an IR35 contract review"`
- `umbrella-to-limited-company`: `phrase: "a move from umbrella to a limited company"`
- `inside-ir35`: `phrase: "contractors inside IR35"`

The reworded lead panel title also removes "specialist ... accountant" from a page that says we are not an accountancy practice, which is a second small win.

**2. `contractor-pension-carry-forward`, the summary understates the taper test.**
Change: `"The taper cuts the allowance above £260,000 of adjusted income, to a £10,000 floor."`
To: `"The taper cuts the allowance only where threshold income also exceeds £200,000, falling to a £10,000 floor."`
Reason: the body, the key takeaway and the FAQ all state both tests. The summary is the block an assistant lifts and the only place the page is wrong.

**3. `first-contract-outside-ir35-checklist`, the overhaul dropped the situation the URL names.**
Change `h1` and `title` from `"Your First 30 Days After Incorporating: the Contractor Setup Sequence"` to `"Your First Outside IR35 Contract: the First 30 Days After Incorporating"`, and `metaTitle` from `"First 30 Days After Incorporating: Contractor Setup"` to `"First Outside IR35 Contract: Your First 30 Days"`.
Change the `metaDescription` opener from `"Setting up a limited company for contracting?"` to `"First contract outside IR35 and a new company?"`.
Reason: the slug and canonical are `first-contract-outside-ir35-checklist`, the segment page links to it as "first outside IR35 contract setup checklist", and the single query it ranks for is "my first outside ir35 contract what do i need to set up" at position 1 on Bing. The new framing keeps the far better body and restores the decider the URL promises. Titles are the owner's ranking call, so this is a recommendation rather than a claims defect.

**4. Segment page stats, cosmetic (5 pages).**
Every Wave 1 row has four stats against a `sm:grid-cols-3` band, so all five pages show an orphan. Either drop one stat per row or make the band `sm:grid-cols-2 lg:grid-cols-4`. Lowest priority; it matters only because the identical orphan on all five is part of what makes the set look templated.

**5. Site-level, not Wave 1: the terms page does not describe the introduction model.**
`contractors-ir35/web/src/app/terms/page.tsx` clause 2 covers "no advice on the Site" and "no accountant-client relationship", but says nothing about enquiries being passed to a partner firm, while the entity block now says exactly that on five new pages. Worth adding one clause so the legal page and the entity block tell the same story. Ask before editing terms.

Nothing in the thirteen pieces is NOT-READY. Fix 1 and 2 before the deploy; fix 1 is a single-file edit that clears five pages.
