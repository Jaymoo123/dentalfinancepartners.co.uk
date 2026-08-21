# Editorial QA: Property rental cluster batch

Reviewer: editorial QA (harsh pass). Date: 2026-08-21.
Spec: `briefs/property/rental/_language_spec.md`. No files edited.

| Slug | Verdict | Blockers | Advisories |
|---|---|---|---|
| `rental-income-tax-uk-complete-guide-landlords` (E1, additions only) | **must_fix** | 4 | 5 |
| `landlord-tax-deductions-uk-2026-complete-list` (E2, additions only) | **must_fix** | 3 | 4 |
| `national-insurance-on-rental-income` (N1, full page) | **must_fix** | 2 | 6 |

## Meta lengths (counted, characters)

| Slug | metaTitle | limit 60 | metaDescription | limit 155 |
|---|---|---|---|---|
| rental-income-tax-uk-complete-guide-landlords | 57 | pass | 148 | pass |
| landlord-tax-deductions-uk-2026-complete-list | 58 | pass | 150 | pass |
| national-insurance-on-rental-income | 54 | pass | 154 | pass |

All six pass. No fix needed.

## Mechanical sweep (all three files)

- **Em-dashes: 0.** En-dashes, figure dashes: 0. The only non-ASCII characters are `£`, plus `×` and `−` (U+2212, minus sign) twice each in E2's pre-existing worked example at lines 405-408. Not a house-rule breach; noted only because `−` is not a hyphen and will not match a hyphen-based lint.
- **UK English: clean.** Zero US spellings, zero US tax vocabulary, zero `$`.
- **Register of the additions, measured the same way the spec measures** (tables stripped, prose only):

| | E1 additions | E2 additions | Winner median | Rule |
|---|---|---|---|---|
| Words | 1,150 | 1,523 | n/a | no floor (killed) |
| Mean sentence | 18.7 | 17.4 | 22.8 | rule 8, pass |
| Statute refs /1k | **0.0** | **0.0** | 2.4 | rule 1, pass |
| Second person /1k | 34.8 | 40.1 | 33.9 | rule 10, pass |
| Question H2s | 2 of 3 | 6 of 6 | 29% | rule 9, pass |
| Colons /1k | **9.6** | 3.9 | n/a | see E1-A3 |

Statute density is the one gap the spec said was consistent across all three of our pages. Both writers took it to zero on the new copy. That is the batch's clearest win and neither writer should be asked to reopen it.

---

# 1. `rental-income-tax-uk-complete-guide-landlords.md` (E1)

**VERDICT: must_fix**

Scope reviewed: `git diff HEAD` only. Three new H2 sections (lines 65-77, 103-125, 192-205), two new FAQs (lines 44-47), `metaDescription`, `summary`, two source lines, one protected-copy record-keeping edit at line 234.

### BLOCKERS

**E1-B1. New FAQ 13 is a 90-character verbatim lift of the new body bullet it sits under.**

Quote, FAQ (line 45):
> "The first £1,000 of gross property income is covered by the property allowance, and if the rent is your only income the £12,570 personal allowance covers the next slice at 0%."

Quote, body bullet (line 73):
> "The first £1,000 of gross property income is covered by the property allowance, and if you have little or no other income the £12,570 personal allowance covers the next slice at 0%."

Why: 32 words identical apart from a six-word swap in the middle; the longest exact common run is 90 characters. The brief's own check was that the two new FAQs must not duplicate body copy verbatim. This one fails outright. The FAQ block renders below the body, so the reader meets the same sentence twice inside one scroll, and the duplicate-content protection layer will see two near-identical passages on one URL.

Drop-in fix, replace the FAQ's second sentence with the number the body does not carry:
> "Yes. You pay Income Tax on rental profit at 0%, 20%, 40% or 45% for 2026/27, depending on where that profit sits once it is added to your other income. If rent is your only income you can receive £13,570 before any tax is due, because the £1,000 property allowance sits on top of the £12,570 personal allowance. On £18,000 of rent with £6,000 of allowable costs, a basic-rate landlord pays £2,400 and a higher-rate landlord pays £4,800 on the same £12,000 of profit."

**E1-B2. New FAQ 14 lifts the body's payoff clause word for word.**

Quote, FAQ (line 47): "Claim every allowable expense first, since that is **what turns £18,000 of rent into £12,000 of taxable profit**."
Quote, body (line 197): "It is **what turns £18,000 of rent into £12,000 of taxable profit**, and at 40% that £6,000 of costs is worth £2,400 to you."

Why: same defect as B1, one clause instead of a sentence. The body version is the stronger of the two because it carries the £2,400 payoff; the FAQ should not reuse the setup and drop the payoff.

Drop-in fix, open the FAQ on the figure instead:
> "Claim every allowable expense first: £6,000 of running costs is worth £1,200 off a basic-rate bill and £2,400 off a higher-rate one."

**E1-B3. The new "avoid tax" section re-explains the two reliefs the two H3s immediately above it just explained.**

Sequence as it now stands: H3 "The £1,000 property allowance" (line 184), H3 "Rent-a-Room Relief up to £7,500" (line 188), then H2 "How to avoid paying tax on rental income legally" (line 192) whose bullets 2 and 3 are the £1,000 property allowance and Rent-a-Room Relief again.

Quote, line 186 (protected): "Claiming the £1,000 only helps where your genuine costs are below it, for instance a parking space or a low-cost room."
Quote, line 198 (new): "On a parking space or a low-cost room let, deducting the flat £1,000 beats deducting actual expenses."

Why: this is the worst seam in the batch. The reader gets the same relief, the same threshold and the same "parking space or low-cost room" example twice in four paragraphs. It reads as a page that lost its place. It also throws away the one genuinely new fact in the new bullet.

Drop-in fix, two options, either works:
(a) Move the new H2 to sit **before** the "Property allowance and Rent-a-Room Relief" H2, so it is the summary and the H3s are the detail; or
(b) keep the placement and cut bullets 2 and 3 down to pointers that carry only what is new:
> "<li><strong>Use the £1,000 property allowance where your real costs are lower</strong>, as set out above. The catch not mentioned there: you cannot take it in a year you claim the finance-cost credit, so it fits an unmortgaged let rather than a geared buy-to-let.</li>
> <li><strong>Take Rent-a-Room Relief on a lodger</strong>, worth up to £7,500 a year. Our <a href="/blog/section-24-and-tax-relief/rent-a-room-relief-uk-landlords-lodgers-guide">Rent-a-Room Relief guide</a> covers the tests.</li>"

**E1-B4. The source lines do not follow the format the spec specifies, and they leak internal vocabulary to the reader.**

Quote (lines 97 and 257):
> "*Rates: house-verified against HMRC rates and thresholds, 2026/27.*"
> "*Rates: house-verified against HMRC guidance, applying from 6 April 2027.*"

Why: rule 6 requires "Source: X, data to <month year>". Neither line names a source in the winners' sense, neither carries a data-through date, and "house-verified" means nothing to a landlord. It reads as a note the editorial team left in by accident. E2 got this right on the same batch, same day, which makes the inconsistency visible to anyone reading both pages.

Drop-in fix, match E2 exactly:
> line 97: `<p>Source: HMRC Income Tax rates and allowances, gov.uk. Data to August 2026.</p>`
> line 257: `<p>Source: HMRC guidance on the 2027 property income tax rates, gov.uk. Data to August 2026.</p>`

### ADVISORIES

**E1-A1. The conductor's "landlord tax tips" splice is a broken appositive and is the clearest stuffing artefact on the page.**

Quote (line 194):
> "What you can do, **and the most practical of the landlord tax tips below**, is legitimately cut the taxable figure with three allowances and one ownership decision."

Why: the appositive equates "what you can do" with a single tip, then the verb governs a list of six. Grammatically it claims the entire section is one tip. Nothing else in the sentence needs the phrase, and the word "tips" appears nowhere else on the page, so the reader has no referent for "the landlord tax tips below". This is the sentence the brief asked me to hunt for.

Drop-in fix, keep the phrase but give it a real job as the list's stem:
> "What you can do is legitimately cut the taxable figure. The landlord tax tips below come down to three allowances and one ownership decision: the £12,570 personal allowance, up to £7,500 of Rent-a-Room Relief, the £1,000 property allowance, and putting the income in the hands of whoever pays the lower rate."

**E1-A2. The "declaring rental income" splice is a truncated idiom and an overclaim in the same eight words.**

Quote (line 205):
> "**Declaring rental income late is always cheaper than being found**: if you are behind, our guide to the Let Property Campaign explains the disclosure route."

Why: three problems. "Being found" is the idiom "being found out" with the particle missing, so it does not parse. "Always" is unsupportable and the sentence immediately before it has already given the real, quantified version ("penalty down to 0%, against roughly 15% or more"). And the sentence adds nothing except the phrase "declaring rental income", which makes it a pure keyword holder.

Drop-in fix:
> "Disclosing late is cheaper than being found out: if you are behind on declaring rental income, our guide to the <a href="...">Let Property Campaign</a> explains the disclosure route."

**E1-A3. Two further sentences exist mainly to hold a phrase, and the colon-pivot tic that carries them runs at 9.6 per 1,000 words against E2's 3.9.**

Quote (line 74): "**The rental income tax rate is your rate.**"
Why: circular as a bullet lead. It tells the reader that the rate is the rate. The sentence after it does the actual work.
Fix: "**Your rental profit is taxed at your top rate.**"

Quote (line 77): "**That is landlord tax on rental income in one line:** profit multiplied by your marginal rate, less the mortgage interest credit if you have a loan on the property."
Why: "landlord tax on rental income" is not a phrase anyone says; the sentence works without it.
Fix: "In one line: profit multiplied by your marginal rate, less the mortgage interest credit if you have a loan on the property."

Quote (line 67): "Tax on rental income in the UK is charged on profit, so the number that drives the bill is the rent you received minus your allowable expenses."
Why: acceptable on its own, but it is the third keyword-bearing sentence in a five-sentence paragraph. If A1 and the two above are fixed, leave this one.

**E1-A4. The new opener closes on the "this guide will cover" scaffolding the spec counted as a defect.**

Quote (line 77): "Everything below fills in each step, in the order you will actually need it."

Why: section 2 P9 records that winners carry no "this guide will cover" scaffolding, and that W3's version is the weakest paragraph on its page. The line also arrives one paragraph after the protected intro has already said "This guide sets out exactly what you pay, what you can deduct, and the two dates that matter most", so the page now scaffolds twice before its second H2.

Fix: cut the sentence. The preceding clause ends the paragraph cleanly.

**E1-A5. The `summary` field was truncated mid-thought and left with a trailing space.**

Quote (line 17): `summary: "UK rental income is taxed on net profit at your marginal Income Tax rate (20%, 40% or 45% for 2026/27), with mortgage interest no longer deductible but instead relieved as a 20% basic-rate credit under Section 24. "`

Why: the trailing space before the closing quote is sloppy in a field that may render. More substantively, the cut removed the only mention of MTD and of the April 2027 rates from the summary, both of which are still major sections of the page. If the trim was to kill scaffolding, it also killed two facts. Note the inconsistency across the batch: E1's summary was trimmed for scaffolding while N1 shipped a 180-word summary that ends "Below: the three tiers HMRC uses..." (see N1-A1).

Fix: restore the substance without the scaffolding, and drop the trailing space:
> `summary: "UK rental income is taxed on net profit at your marginal Income Tax rate (20%, 40% or 45% for 2026/27), with mortgage interest relieved as a 20% basic-rate credit under Section 24 rather than deducted. Making Tax Digital is live at £50,000 from 6 April 2026, and separate property income rates of 22% / 42% / 47% start on 6 April 2027."`

### Seam quality where new meets protected: assessed

- **Intro (line 63) into new H2 (line 65): acceptable.** The protected intro is thesis-first and the new section answers the query directly underneath it, which is the right order.
- **New H2 (65-77) into protected "How is rental income taxed in the UK?" (line 79): soft overlap, not a blocker.** New bullet: "You are taxed on profit, not on rent." Protected opener: "You pay Income Tax on your net rental profit, which is rent received minus allowable expenses." Same fact, twelve lines apart, different enough in wording to read as a summary followed by its expansion. Leave it.
- **Protected worked example (line 101) into new Priya/Marcus section (line 103): overlap worth one cut.** The protected paragraph ends "The lesson is that rental profit is taxed at the margin: it is the last slice of income, taxed at your top rate", and the new section then proves the same lesson with two named people. The new section is much better copy (rule 7's named example, which the spec says the head page lacked). If anything goes, it should be the protected paragraph's closing sentence, not the new section.
- **New "avoid tax" H2 into protected reliefs H3s: broken.** See E1-B3.
- **Protected record-keeping edit (line 234): correct and an improvement.** "five years and ten months after the relevant 31 January filing deadline" was garbled; "at least five years after the 31 January following the tax year" matches E2's existing wording at line 427. Good consistency catch.

### Out of remit, flagged for the conductor

- Lines 39, 244: "Royal Assent 18 March 2026" appears twice in protected copy. Rule 3 forbids it outright. Additions did not introduce it and did not remove it.
- Line 259: the parenthetical amendment chain "(FA 2026 Sch 1, amending ITTOIA 2005 ss.274AA and 274C and ITA 2007 s.399B)" is the exact string the spec names as the thing not to write, still on the page. Rule 2.
- Line 99, 259: two devolved-nation carve-outs remain in protected copy. Rule 4.
- Line 273: the CTA is still "You can read more on our services page or get in touch through the form below", named in rule 12 as what not to do. The additions did not touch it.

---

# 2. `landlord-tax-deductions-uk-2026-complete-list.md` (E2)

**VERDICT: must_fix**

Scope reviewed: `git diff HEAD` only. One new opening H2 (lines 52-58), five new H2 sections (lines 283-390), two source lines, `metaDescription`, removal of `metaDescription_prev`.

### BLOCKERS

**E2-B1. The new mortgage-interest section flatly contradicts a protected H3 heading on the same page.**

Quote, new (line 291): "Arrangement fees, product-switch fees, remortgage fees, broker fees and early redemption charges are finance costs too, so **they run through the same reducer rather than reducing your profit**."
Quote, protected H3 (line 195): "**Deductible Finance Costs That Survive Section 24**"
Quote, protected list under it (lines 196-202): "Section 24 restricts the interest itself, but several related finance costs are **still relievable in the normal way**: Mortgage arrangement and product fees, Broker and mortgage-adviser fees ... Early redemption penalties."

Why: the new copy is right and the protected heading is wrong, but both are now on the same page roughly 90 lines apart, giving the reader two opposite answers about the same five fee types. (The protected section is already self-contradictory: line 204 concedes "These are still finance costs, so for individuals they fall within the Section 24 reducer", which contradicts its own H3.) A landlord who reads the heading and skips the caveat will claim these against profit. This is the highest-consequence defect in the batch.

Drop-in fix, retitle the protected H3 and its stem so the page says one thing (this touches protected copy, so it needs the conductor's sign-off):
> H3: `<h3>Other Finance Costs That Also Run Through the Reducer</h3>`
> stem: "Section 24 restricts more than the interest. These related costs are finance costs too, so for individuals they are relieved through the 20% reducer rather than deducted from profit:"

**E2-B2. The new repairs table contradicts a protected FAQ answer on the same page.**

Quote, new table row (lines 317-319): "Single glazing replaced with double glazing | **Repair, deduct in full** | Modern equivalent of what was there"
Quote, protected FAQ 2 (line 21): "Improvements make the property better than it was (a new extension, an upgraded kitchen, **replacing single-glazing with double-glazing**) and are capital, so they are not deductible as a revenue expense."

Why: identical fact pattern, opposite answers, on one URL. The new table is correct and agrees with the protected body at line 158 ("using modern equivalent materials (for example, double-glazing replacing single-glazing where it is now the standard) is usually still a repair"), so the FAQ was already wrong before this batch. The additions did not create the error but they put the two statements on the same page in a form a reader will notice, and FAQ answers are the part most likely to be lifted into an AI overview.

Drop-in fix, replace the FAQ's parenthetical (protected copy, needs sign-off):
> "Improvements make the property better than it was (a new extension, an upgraded kitchen, a first-time loft conversion) and are capital, so they are not deductible as a revenue expense. Replacing single glazing with double glazing is normally a repair, not an improvement, because double glazing is the modern equivalent of what was there."

**E2-B3. The new copy reintroduces the exact closing-hedge formula the spec killed, and the original hedge is still on the page.**

Quote, new (line 360): "Split these on the invoice detail, and get the split **checked before you file rather than after**."
Quote, protected (line 429): "Tax rules for landlords are detailed and change often, so if you are unsure about any specific expense, it is worth **checking the position before you file rather than after**."

Why: spec section 2 P9 names this by page and by shape: "pipeline hedging of the 'rules change often, check before you file' kind that closes our deductions page". Rule 13 forbids it. The batch had one job here and instead added a second instance of the same sentence-ending, twelve words from identical. The page now closes on the hedge and hedges again mid-section.

Drop-in fix, new copy (line 360): "Split these on the invoice detail. A contractor's single-line invoice is what turns a defensible split into a disallowed claim."
Drop-in fix, protected copy (line 429, needs sign-off): delete the sentence. The paragraph reads correctly ending at "...only increases."

### ADVISORIES

**E2-A1. "Allowable expenses for rental income" is used twice in two consecutive sentences of the new opener, and the second use is the only reason the sentence has a subject.**

Quote (lines 54 and 56):
> "**The allowable expenses for rental income** fall into nine categories in 2026/27..."
> "Two rules sit on top of **the allowable expenses for rental income**, and they are where most claims go wrong."

Why: the second instance reads as placed rather than written. "Two rules sit on top of that list" says the same thing in three words.

Fix (line 56): "Two rules sit on top of that list, and they are where most claims go wrong."

**E2-A2. The new opener lists finance costs as one of nine allowable categories, then says two sentences later that they are not deductible.**

Quote (line 54): "...property running costs, repairs, professional fees, advertising, **finance costs**, travel at 55p a mile, office and admin, replacement furniture, and bad debts. Take the total off your rent, and what is left is the profit you pay tax on."
Quote (line 56): "**Mortgage interest is not one of the deductions** if you own the property personally."

Why: "take the total off your rent" is wrong the moment finance costs are inside the total. The nine-category list is inherited from the protected at-a-glance list, which handles this by annotating the row ("a 20% tax reducer for individuals under Section 24, a full deduction for companies"). The new opener drops the annotation and keeps the item.

Fix (line 54): "...advertising, finance costs (which work differently, see below), travel at 55p a mile..."

**E2-A3. The new opener's third paragraph is a five-fact grab-bag ending on a non-sequitur, and it restates the wholly-and-exclusively test that the protected paragraph directly above it has just stated.**

Quote, protected (line 50): "The core test for almost every expense is whether it was incurred *wholly and exclusively* for the property business."
Quote, new (line 54): "Every cost that is **wholly and exclusively** for the letting, and nothing else."
Quote, new (line 58): "**Wholly and exclusively is the test HMRC applies to every line you claim.** A cost with a private element... A trip that combined a property inspection with a family visit... A cost with no business purpose, such as your own time... An overnight stay and reasonable subsistence... **Compensation or contractual damages you pay a tenant pass the same test**, provided the payment arose from running the letting."

Why: the phrase lands three times in nine lines. The final sentence on tenant compensation has no connection to the subsistence sentence before it or to anything else in the opener; it belongs in the grey-areas section at line 245.

Fix: cut line 58's opening sentence (the point is made twice already), and move the compensation sentence into the "Insurance Claims and Other Grey Areas" list at line 249 as its own bullet.

**E2-A4. One arithmetic phrasing error in the new property-allowance section.**

Quote (line 386): "the allowance leaves £3,000 of taxable profit instead of £3,400, which **saves £400 of profit** and £80 of tax at the basic rate."

Why: you do not save profit, you reduce it. The figures are right; the noun is wrong.

Fix: "...which cuts taxable profit by £400 and the tax bill by £80 at the basic rate."

### Cross-page sameness vs E1's additions: assessed

The brief asked me to hunt twin sentence shapes between the two writers' new copy. **Finding: the two pages are not twins, and the sameness that exists is inside each page rather than between them.**

- **Openers diverge cleanly.** E1's three new sections all open by restating the H2 as a full question and then answering it: "Do landlords pay tax on rent? Yes." / "How much tax do you pay on rental income? On £18,000 of rent..." / "How do you avoid paying tax on rental income? You cannot avoid tax on genuine profit." E2's six new sections all open on a verbless or subjectless fragment that answers without restating: "Every cost that is wholly and exclusively for the letting, and nothing else." / "No, not since 6 April 2020." / "A repair puts the property back the way it was..." / "The tax year you pay it, in almost every case." / "Only when you pay it to run the letting." / "Claim the £1,000 property income allowance only when..." Two distinct houses styles, both compliant with rule 5. No cross-page fix needed.
- **Within E1, the echo-question opener three times in a row is the repetitive one** and is the shape a reader will notice on a single scroll. Advisory only, because it is the winner pattern (W3, W4) and the spec explicitly endorses it. If one is varied, vary the middle one: "£2,400. That is the bill on £18,000 of rent with £6,000 of costs, if you pay basic rate."
- **Within E2, four of six openers are fragments** ("Every cost that...", "The tax year you pay it...", "Only when you pay it...", "No, not since..."). Same advisory, same reasoning.
- **Twin closers: one real overlap.** Both writers end new sections by handing off to an internal link in the same construction. E1 (line 205): "our guide to the <a>Let Property Campaign</a> explains the disclosure route." E2 (line 390): "Our guide to the <a>£1,000 property income allowance</a> runs the full comparison, including joint owners..." E2 (line 372): "See our guide to <a>pre-letting expenses...</a>." Low harm, and both pages need the internal links. Vary one of E1's if the conductor wants it gone.
- **One duplicated distinctive point across the two pages.** E1's new bullet (line 198): "you cannot take the property allowance in a year you claim the finance-cost credit described above, so it fits an unmortgaged let rather than a geared buy-to-let." E2's new section (line 388): "You cannot use the property income allowance in a year you claim the Section 24 finance-cost reducer. The two are mutually exclusive, so a mortgaged let is almost always better off claiming actual expenses." Same fact, same "so a mortgaged/unmortgaged let" conclusion, on two interlinked pages in the same cluster. Not verbatim, so advisory, but E2 owns this topic and E1 should defer to it rather than restate the trap.

### Out of remit, flagged for the conductor

- Line 433: the "Related Reading" list labels `/blog/landlord-tax-essentials/how-much-tax-rental-income-uk-complete-guide` as "Rental Income Tax UK: Complete Guide for Landlords". That is E1's title, but E1's canonical is `/blog/section-24-and-tax-relief/rental-income-tax-uk-complete-guide-landlords`. The link text points a reader at the cluster head and delivers the invisible page. Pre-existing, but this batch is the moment to fix it.
- The page still carries 14 noun-label H2s from before this batch (rule 9). The additions added six question H2s, taking the page from 0 of 20 to 6 of 26. Real progress, not a fix.
- Lines 405-408 use U+2212 (minus) and U+00D7 (times). Fine to render, but they are not the hyphen and `x` that the rest of the estate uses.

---

# 3. `national-insurance-on-rental-income.md` (N1)

**VERDICT: must_fix**

Scope reviewed: full page, 197 lines, 14 FAQs.

This is the strongest-written page of the three and the closest to the spec of anything in the cluster. It answers in four words, puts £20,000 and £0 at word 48, carries two named worked examples with computation tables and plain-money payoffs, puts a source line under all four tables with a data-through date, cites exactly one Act inside a sentence that tells the reader what to do about it, and closes on a question-heading CTA that names a service and gives the reason it beats guessing. Every one of those is a rule the spec says our pages were failing. The blockers below are two, and both are cheap.

**Fact-check note, unprompted but load-bearing:** I verified the six HMRC example names and the quoted "gainful employment" wording against gov.uk NIM74250 directly. Samantha, Claire, Hasan, Bob, Amy and Nadiya are all genuinely HMRC's, in the tiers the page assigns them, and the paraphrase "the activity needed to maintain a property investment is not enough to make you gainfully employed" tracks HMRC's actual sentence. Attribution is sound.

### BLOCKERS

**N1-B1. Persona collision with E1, on two pages that link directly to each other. See the adjudication section below.**

Quote, N1 (line 117): "**Worked example: Marcus, guest house, 2026/27**" and (line 129) "Marcus pays £1,345.80 that you would not pay on the same £35,000 of rental profit".
Quote, N1 (line 155): "**Worked example: Priya, buying one missing year in 2026/27**".
Quote, E1 (line 107): "**Priya** is 34 and earns £32,000 in her job. **Marcus** is 52 and earns £60,000 in his."

Why: E1's new opening paragraph links to N1 and N1's line 190 links back to E1. A reader crossing that link meets Marcus as a higher-rate landlord with a £60,000 salary and no mortgage on one page, and as a guest-house trader with £78,000 of turnover on the other. Same for Priya. Adjudication and the rename recommendation are in the final section.

Drop-in fix: rename N1's two personas. Zero hits across the 800+ file blog corpus for both suggestions.
> line 117: `<h4>Worked example: Rafiq, guest house, 2026/27</h4>`; line 129: "Rafiq pays £1,345.80..."
> line 155: `<h3>Worked example: Orla, buying one missing year in 2026/27</h3>`; line 166: "Orla is a Tier 1 landlord, so Class 3 is her only route. She pays £956.80..."

**N1-B2. Rule 4 devolved-nation carve-out, in body copy, on a page that is not about Scotland or Wales, and it does not change the reader's number.**

Quote (line 184):
> "**One line on devolution, because it comes up:** National Insurance is set UK-wide. The classes, rates and thresholds are identical in England, Scotland, Wales and Northern Ireland. Income tax on rental profit is not, because Scotland and Wales set their own rates."

Why: two breaches in one paragraph. Rule 4 is absolute for body copy and the spec's own escape clause does not apply here, because the carve-out explicitly says the number is the same everywhere, so it changes nothing for any reader. Separately, "One line on devolution, because it comes up" is the author narrating their own outline to the reader, which is the meta-commentary tell the brief asked me to hunt.

Drop-in fix: delete the paragraph from the body. The FAQ at line 42 already captures the query for anyone searching it, which is the right place for a "no difference" answer (see N1-A5).

### ADVISORIES

**N1-A1. The `summary` field is 180 words and ends in outline scaffolding.**

Quote (line 17, closing clause): "**Below:** the three tiers HMRC uses to decide whether you are even entitled to pay, the three situations where National Insurance genuinely does bite, and what a voluntary year costs at £18.40 or £3.65 a week against £241.30 a week of full new State Pension."

Why: spec P9 counts "this guide will cover" scaffolding as a defect and notes W3's version is the weakest paragraph on its page. "Below:" is that move in one word. It is also inconsistent with the batch: E1's summary was cut for exactly this (see E1-A5).

Fix: end the summary at "...you can reach pension age short of qualifying years." and drop the "Below:" clause. Nothing in it is a fact the body does not carry.

**N1-A2. Four more meta-commentary tells, the author talking about the page instead of to the reader.**

Quote (line 65): "**The wording HMRC uses is worth reading once, because it decides the whole question:** the nature of property letting requires some activity..."
Fix: "HMRC's own wording decides the question: the nature of property letting requires some activity..."

Quote (line 188): "There is no National Insurance box on them, **which is the clearest confirmation of the answer at the top of this page**."
Fix: "There is no National Insurance box on them." The absence is the confirmation; saying so is the tell.

Quote (line 69): "...and **it is worth seeing in figures before you decide the exemption is a technicality**."
Fix: "The figures are worth seeing before you write the exemption off as a technicality."

Quote (line 196): "**External sources used on this page:** HMRC National Insurance Manual..."
Why: no winner carries a "sources used on this page" block; they carry per-table "Source: X" lines, which this page already does correctly four times. Low harm and arguably good E-E-A-T, so this one is a judgement call for the conductor rather than a fix I would insist on.

**N1-A3. A truncated idiom in the second paragraph, the same class of error as E1-A2.**

Quote (line 53): "The exemption has a price, though, and **most landlords only find it at 60**: rental profit builds no State Pension record at all."

Why: "find it at 60" is "find out about it at 60" with the particle missing, so it reads as though landlords locate something. And "at 60" is arbitrary: State Pension age is 66 rising to 67, and the moment a landlord actually discovers the gap is whenever they first pull a forecast.

Fix: "The exemption has a price, though, and most landlords do not find out about it until they check a State Pension forecast: rental profit builds no record at all."

**N1-A4. Four FAQ answers restate body sentences near-verbatim, one of them an identical 147-character run.**

Quote, FAQ 9 (line 37): "**Employ a part-time property manager on £19,000 and the employer National Insurance is 15% of £14,000, which is £2,100 a year on top of the wage.**"
Quote, body (line 133): identical, word for word, 147 characters.

Also: FAQ 1 shares a 158-character run with the body opener (lines 21 vs 51); FAQ 11 shares 101 characters with line 180; FAQ 14 shares 93 characters with line 188.

Why: the brief's test is that each FAQ answers independently rather than restating the body. Four of fourteen currently restate. The other ten pass cleanly and several are genuinely additive (the Airbnb one, the "should I make it a trade" one, the directors one), so this is a targeted rewrite of four answers, not a block problem.

Drop-in fix, FAQ 9 opening (the others follow the same principle: change the worked figure, not just the wording):
> "Yes, at 15% on everything above the secondary threshold of £5,000 a year for 2026/27. On a £30,000 full-time property manager that is 15% of £25,000, or £3,750 a year on top of the salary, and you must register for PAYE once anyone is paid £96 or more a week..."

**N1-A5. One FAQ answer carries no figure, breaching rule 11, and the fix is one character.**

Quote, FAQ 14 (line 47): "...Making Tax Digital for Income Tax phases in by combined gross income from self-employment and property, so you can still have four quarterly filing obligations a year **with no National Insurance liability at all**."

Why: rule 11 requires every FAQ answer to carry a figure. This is the only one of the fourteen without one, and the body's version of the same sentence (line 190) has the figure the FAQ dropped: "with **£0** of National Insurance liability".

Fix: "...so you can still owe four quarterly updates and a final declaration each year with £0 of National Insurance to pay." (This also breaks the 93-character lift flagged in N1-A4.)

**N1-A6. One payoff sentence asserts an age the reader cannot derive, and it may be wrong.**

Quote (line 166): "Priya is a Tier 1 landlord, so Class 3 is her only route. **She pays £956.80 and gets it back before her 69th birthday**, then keeps the £358 a year for life."

Why: the page never gives Priya's age or her State Pension age. The break-even is 2.67 years of pension, so "before her 69th birthday" only holds if her State Pension age is 66. State Pension age is rising to 67 between 2026 and 2028, which puts break-even at roughly 69 years and 8 months for anyone reaching it on the new timetable. The arithmetic everywhere else on this page is exact, which makes this the one soft figure on it.

Fix, keep the payoff and lose the unsupported age: "She pays £956.80 and has it back inside three years of drawing her pension, then keeps the £358 a year for life."

**N1-A7. Two H2s neither ask a question nor carry a number (rule 9), out of twelve.**

Quote (line 55): "Why rental profit is not earnings for Class 1" — fix: "Why rental profit is not earnings: no Class 1 at 8% or 15%".
Quote (line 143): "The real cost: rental income builds no State Pension record" — fix: "The real cost: £6.89 a week of pension for every missing year".

The other ten pass. This is polish, not a fix that changes what the page says.

### Checks passed, recorded so nobody re-runs them

- **Em-dashes: 0.** UK English: clean. No `$`, no US tax vocabulary.
- **No PropertyTaxPartners pricing on page.** The CTA at line 194 names the service ("Our landlord tax review"), states what it checks, and gives the reason it beats guessing ("paying £956.80 for a year you already had"). Rule 12: pass, and it is the best CTA of the three pages by a distance.
- **No closing hedge.** Rule 13: pass. The page ends on the CTA and a sources line, not on "rules change often".
- **No "Royal Assent", no enactment dates.** Rule 3: pass, on a page that had every excuse to breach it.
- **Statute density: 3 references** (Social Security Contributions and Benefits Act 1992, s.11(6), NIM74250) across roughly 2,600 prose words, so about 1.2 per 1,000 against a ceiling of 4 and a winner median of 2.4. Rule 1: pass. Rule 2 (one Act, inside a sentence about what to do): pass, quote at line 95, "that entitlement sits at section 11(6) of the Social Security Contributions and Benefits Act 1992. If you think you are Bob, ask HMRC to confirm it in writing before you rely on cheap qualifying years in your retirement plan."
- **First sentence answers the query in one word; first figure at word 48.** Rule 5: pass.
- **All four tables carry the tax year in the heading and a "Source: X, data to August 2026" line underneath.** Rule 6: pass, 4 of 4, against 0 of 11 across the cluster before this batch.
- **Two named worked examples with a computation table and a plain-money payoff each.** Rule 7: pass.
- **Arithmetic spot-checked and correct throughout:** £22,430 at 8% = £1,794.40; at 6% = £1,345.80; at 20% = £4,486 and at 22% = £4,934.60, difference £448.60; employer NI 15% of £30,000 = £4,500; £18.40 x 52 = £956.80; £3.65 x 52 = £189.80; £241.30 / 35 = £6.89 a week and £358 a year; 15 of 35 years x £241.30 = £103; 15% of £1,708 = £256. Every figure ties.
- **Two figures I could not verify and am handing to the fact reviewer, not asserting as wrong:** the Class 2 small profits threshold of £7,105 for 2026/27, and the full new State Pension of £241.30 a week for 2026/27. Both are plausible uprates and both are load-bearing for the page's central arithmetic.

---

# Persona adjudication

**Question put:** is E1 and N1 sharing Marcus and Priya acceptable, given the wave rule of one persona per page across the corpus, and do they also collide with existing pages?

**Ruling: not acceptable as shipped. N1 renames both, E1 keeps both. The wave rule as written is void and should not be cited as the reason.**

Three findings behind that.

**1. The wave rule is already dead in this corpus and cannot be enforced now.** Counted across the Property blog: **Priya appears in 37 files, Marcus in 12.** Not two, not five. These are house-default names and have been for many waves. Enforcing "one persona per page across the corpus" today would flag roughly 49 published pages, which nobody is going to do. Anyone applying the rule as written to this batch is applying a standard the corpus abandoned long ago, and the two writers were following an existing convention rather than breaking a live one.

**2. The real harm is narrower than the rule and it is present here.** E1's new opening paragraph links straight to N1, and N1's line 190 links straight back to E1. These two pages are one click apart in both directions, and they give the same two names contradictory identities:

| | E1 | N1 |
|---|---|---|
| Priya | 34, salary £32,000, basic-rate landlord with one unmortgaged flat | Tier 1 landlord buying one missing qualifying year for £956.80 |
| Marcus | 52, salary £60,000, higher-rate landlord with the same flat | guest-house owner, £78,000 turnover, £35,000 trade profit, pays Class 4 |

The harm the persona rule exists to prevent is a reader meeting the same character twice with different facts. On a random pair of pages 37 files apart that is theoretical. Between two directly interlinked pages in the same cluster, published the same day, it is the actual reading experience. That is the ground for the fix, not the rule.

**3. The batch also puts these names on two further uncommitted pages.** Same working tree, same push: `landlord-electrical-safety-certificate.md` uses Marcus (and Bev), `landlord-licensing-explained.md` uses Priya. So this push alone adds **Marcus to three pages and Priya to two**. That is a density worth breaking even on the loose standard, and it is the argument for taking the free fix rather than waving it through.

**Why N1 renames and not E1.** N1 is unpublished net-new, so the change is two headings, two body sentences and nothing else. E1's pair sits inside a two-column comparison table on the cluster head page, where the names are column headers and appear in the surrounding prose four more times, and E1 is the page with the higher live traffic to protect. Cheapest correct fix, on the page where it costs least.

**Suggested replacements, both verified at zero occurrences across the blog corpus:** Marcus becomes **Rafiq**, Priya becomes **Orla**. Twelve other clean names are available if either is unwanted (Rowan, Imogen, Kwame, Anya, Tomasz, Esme, Sian, Nikhil, Beatriz, Hamza all return zero hits).

**Nadiya is not a persona collision and must not be renamed.** N1's Samantha, Claire, Hasan, Bob, Amy and Nadiya are HMRC's own example names, verified against gov.uk NIM74250 in the tiers the page assigns them. They are quotations, not personas. The near-homograph with Nadia in `lease-extension-cost-uk.md` is cosmetic, and accuracy of citation beats persona hygiene. Leave all six.
