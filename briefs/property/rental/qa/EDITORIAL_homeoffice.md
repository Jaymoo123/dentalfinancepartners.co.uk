# Editorial QA: `claim-home-office-deduction-landlords` (full rewrite)

Reviewer: editorial QA (harsh pass). Date: 2026-08-21. No files edited.
Spec: `briefs/property/rental/_language_spec.md`.
Cross-page comparison set: `national-insurance-on-rental-income.md` (N1, full page) and the
`git diff HEAD` additions on `rental-income-tax-uk-complete-guide-landlords.md` (E1) and
`landlord-tax-deductions-uk-2026-complete-list.md` (E2).

## VERDICT: must_fix

**Blockers: 7. Advisories: 9.**

The correction-of-record is the reason to ship this page and it is also the reason it fails.
The statutory argument is clean, the arithmetic holds and the page is genuinely more useful than
what it replaced. But the correction is currently delivered as commentary on other people's
content and on our own publishing history, not as law. Four of the seven blockers are one
paragraph (line 51) and its two echoes.

---

## Mechanical sweep

| Check | Result |
|---|---|
| `metaTitle` | **53 chars**, limit 60. Pass. |
| `metaDescription` | **153 chars**, limit 155. Pass (2 characters of headroom; do not lengthen it). |
| Em-dashes | **0.** En-dash, figure dash, horizontal bar: 0. Pass. |
| UK English | Clean. Zero US spellings, zero `$`, `licence` correct as a noun at lines 171 and 173, `characterisation` throughout. Pass. |
| PTP pricing | None on page. "worth ten minutes of someone's time" carries no figure. Pass. |
| Prose words (tables + sources line stripped) | 2,933 |
| Mean sentence | **21.4** (spec rule 8 limit 22). Pass. |
| Statute refs in body prose | 8 (`s.94H`, `s.272`, `ss.94D-94G`, `s.34`, `s.224(1)`, `PIM2100` x3) = **2.7 per 1,000**. Spec rule 1 limit 4. Pass, but see A9. |
| FAQ count | 12. Pass. |
| FAQ answers >= 25 words | 12 of 12. Pass. |
| FAQ answers containing a figure | **11 of 12.** Fail, see B6. |
| Tables with tax-year heading + source line | 2 of 2. Pass. |
| Persona collision | **Fail, see B1.** |

---

## Answer-first: 4 of 9 H2s clear, 2 marginal, 3 fail

| # | H2 | First sentence | Verdict |
|---|---|---|---|
| 1 | Landlords cannot use the £10, £18 and £26 flat rates | "The flat rates are real, and they are not yours." | Pass |
| 2 | What you can claim: a fair share of your actual household costs | "PIM2100 gives you two levels, and the difference between them decides everything else on this page." | **Fail** (B4) |
| 3 | Worked example: £5,040 of household costs becomes a £205.71 deduction | "Helen lets four flats and runs them herself from the smallest bedroom..." | Pass (heading carries the answer; worked-example convention per spec P2) |
| 4 | The bigger claim needs an exclusive room, and that room costs £3,908 on sale | "Read HMRC's second level again and you will see the condition attached to it." | **Fail** (B5) |
| 5 | How to document mixed use so the relief survives | "Exclusive use is a question of fact, not a label you choose." | Marginal (A1) |
| 6 | What if you also work from home as an employee? | "Both can be true at once, and the two claims run on separate tracks." | Pass |
| 7 | Company landlords: £312 a year tax free, or charge the company rent | "If your properties sit in a limited company, everything above changes, because now there is an employer and you are its employee." | Marginal (A2) |
| 8 | Records and Making Tax Digital: build the apportionment as you go | "Keep four things for each tax year: the bills that make up the pot, the room count or floor areas..." | Pass |
| 9 | Is your home office claim built on a rate you are not entitled to use? | "That is worth ten minutes of someone's time, and it is the question most landlord tax reviews never ask." | **Fail** (B3, B7) |

---

# BLOCKERS

## B1. `Helen` collides with four existing worked-example personas in the same corpus

Quote (line 91):
> "Helen lets four flats and runs them herself from the smallest bedroom, which is also the guest room and where the household desktop lives."

`grep -rn "\bHelen\b" Property/web/content/blog/*.md` returns 37 hits across 5 files. Four of them
are other pages' named worked-example personas, all in the same Property corpus:

| Page | Helen is |
|---|---|
| `foreign-tax-credit-uk-property-overseas-landlords.md:127` | "Helen, 47, UK-domiciled and UK-resident throughout, lives in Reading. UK marketing director on £95,000 salary" |
| `moving-to-australia-uk-rental-property-tax-pathway.md:170` | "Helen, 38, UK national, marketing director on an international assignment" |
| `transferring-fhl-portfolio-to-limited-company.md:126` | "Helen owns three former-FHL cottages in Devon" |
| `sdlt-incorporation-stamp-duty-twice.md:133` | "Mark and Helen own two London buy-to-lets jointly" |

Why: five different Helens with five different portfolios, ages and professions inside one
domain. Two of them are already "marketing director" at different ages, which is a pre-existing
defect this page compounds rather than causes. A reader arriving from an internal link meets a
contradictory Helen; the humanise/dedupe layers see the same first name anchoring five unrelated
computations. Worked-example personas are the one element on these pages that has to be unique,
because they carry the numbers.

Drop-in fix: rename to a first name unused as a persona anywhere in `Property/web/content/blog/`.
Grep-clear candidates that fit the register: `Ffion`, `Bernadette`, `Sunita`. Replace all 9
occurrences in this file (frontmatter `summary` line 15, body lines 91, 93, 110, 112, 114, 118,
124, 163). No other change needed.

## B2. The page attacks other advisers and confesses our own error, in the paragraph that should establish authority

Quote (line 51), the whole second paragraph:
> "This is the single most misreported deduction in landlord tax. A large slice of landlord advice, including plenty of it written by accountants, tells you to tick the simplified expenses box and claim a monthly flat rate. That advice is borrowed from a different regime, and the version of this page we published in May 2026 repeated it. It is corrected below, along with the far more expensive mistake that sits underneath it: the way a bigger home office claim can quietly cost you thousands in Private Residence Relief when you sell your own home."

Four separate breaches in 96 words:

1. **"the single most misreported deduction in landlord tax"** is an unverifiable superlative about
   a body of content we have not measured. It is the "the internet gets this wrong" family with
   the meta-noun removed.
2. **"A large slice of landlord advice, including plenty of it written by accountants"** is
   competitor-dunking, and specifically dunking on the profession we are selling into. A reader
   who has an accountant is being told their accountant is probably wrong, in paragraph two, by a
   firm that wants their business.
3. **"the version of this page we published in May 2026 repeated it"** advertises on the live page
   that we published incorrect tax advice for three months. That belongs in `editorialNote`,
   where it already is, in full, and it is correct there. It has no reader value: the reader did
   not see the old version, and there is no equity to preserve (the note records 1 Google
   impression over 90 days).
4. **"It is corrected below"** is meta-commentary on the page's own structure.

Why: the correction is strongest stated as law with no antagonist. The statute does the work in
H2 1 without any of this, and H2 1 is the best writing on the page. This paragraph makes the
reader adjudicate between us and their adviser instead of reading `s.94H`.

Drop-in fix, replacing the whole paragraph:
> "The distinction matters more than a small deduction usually would, because the mistake runs in both directions. Claiming a flat rate you are not entitled to is an error that has to be unwound across every year you claimed it. Claiming the larger actual-cost figure on the wrong footing is the more expensive one: a home office described as used exclusively for the business restricts Private Residence Relief on your own home, and on a £270,000 gain that costs £3,908.57."

## B3. The CTA opens by telling the reader every other tax review is inadequate

Quote (line 185):
> "That is worth ten minutes of someone's time, and it is the question most landlord tax reviews never ask."

Why: same family as B2, in the last section, where it is most likely to be read. "most landlord
tax reviews never ask" is an assertion about competitors' service quality that we cannot
substantiate and do not need. Compare the sibling page's closer, which sells on the same
mechanism without naming an opponent: N1 line 195, "Those are the two questions worth paying
someone to answer." (That closer has its own problem, B7.)

Drop-in fix:
> "Ten minutes answers it, and the answer is worth having before a sale rather than after one."

## B4. H2 2's first sentence answers nothing and points at the page instead

Quote (line 69):
> "PIM2100 gives you two levels, and the difference between them decides everything else on this page."

Why: two failures in one sentence. The heading promises "a fair share of your actual household
costs" and the paragraph opens on a manual reference and a structural promise, so spec rule 5
fails outright. And "decides everything else on this page" is the `this page` family the brief
bans, in the position where the answer should be. Two of the four `this page` hits in the file
are here and in the FAQ block (B6).

Drop-in fix:
> "A fair and reasonable share of your electricity, gas, water, broadband, insurance and council tax, worked out on a fraction you can defend. HMRC allows it at two levels, and which level you take decides the rest of your position."

## B5. H2 4's first sentence is a navigation instruction, not the answer its own heading promises

Quote (line 118):
> "Read HMRC's second level again and you will see the condition attached to it."

Why: the heading already states the answer with the figure in it ("that room costs £3,908 on
sale"), which is exactly right per spec P3, and then the paragraph tells the reader to scroll up
and re-read a previous section. It withholds for a sentence and a half before delivering the £720.
This is the highest-value section on the page and it opens on housekeeping.

Drop-in fix:
> "The larger claim needs a room set aside for the business and nothing else, and that condition is what costs you money later. Set the room aside properly, stop using it for anything else, and you drop the time fraction: Helen's claim becomes one seventh of £5,040, which is <strong>£720</strong> a year instead of £205.71."

(Then delete the now-duplicated second sentence of the existing paragraph.)

## B6. Three FAQs are compressions of their body sections rather than independent answers, and one carries no figure at all

Spot-checked three against their body sections, per brief.

**(a) FAQ 7 vs H2 4.** Nearest to a straight lift.

FAQ (line 31):
> "Dropping the time restriction lifts the worked example from £205.71 to £720 a year, which is £514.29 more of deduction and £205.71 a year of tax saved at 40%. Ten years of that is £2,057. The capital gains cost on the same facts is £3,908.57, so you are £1,851 down before counting the extra record keeping."

Body (lines 118-120, 140):
> "Helen's claim becomes one seventh of £5,040, which is <strong>£720</strong> a year instead of £205.71." / "That is £514.29 a year more of deduction, worth £205.71 a year of tax at 40%. Over ten years it saves £2,057." / "You are £1,851 down, before you count the extra record keeping."

Same six figures in the same order, with "before counting the extra record keeping" reproduced
almost word for word. It also depends on the body ("lifts the worked example") so it does not
stand alone in a rich result.

**(b) FAQ 12 vs H2 7.** Same defect.

FAQ (line 41):
> "Charge the company £1,800 a year and it saves £450 of corporation tax at 25%, while you declare £1,800 of property income less about £720 of allowable home costs, so £1,080 taxed at 40% costs you £432. The net gain is £18 a year"

Body (line 171):
> "Charge £1,800 a year and the company saves £450 of corporation tax at 25%... the £1,800 is property income, against which you deduct your allowable home costs of, say, £720, leaving £1,080 taxed at 40%, which is £432. Net benefit at those rates: <strong>£18 a year</strong>."

**(c) FAQ 9, "What if I do the lettings admin at the kitchen table?"** This one is genuinely
independent, because there is no body section on it, and it is the only FAQ on the page with
**no figure anywhere in it**. Spec rule 11 requires one in every answer.

Quote (line 35):
> "You still claim, and the claim is safer. Apportion on the same fair and reasonable basis, using the time the kitchen is used for lettings work against its total use, and the figure will be smaller than a spare room claim."

Also flag, same block: FAQ 1 (line 19) says "In the worked example **on this page**" and FAQ 10
(line 37) says "the hours-banded flat rate **you may have read about**". The first breaks FAQ
independence; the second is the meta-commentary family again.

Drop-in fixes:

FAQ 7, replace the first clause so it stands alone and stops mirroring the body's order:
> "Usually negative. The exclusive-use version of the claim is worth about £720 a year against £205.71 for a shared room, so at 40% it saves £205.71 a year, or £2,057 over ten years. Ten years of exclusive use on a one-room-in-seven office costs £3,908.57 of Capital Gains Tax on a £270,000 gain when you sell, so the exclusive room is £1,851 down over the same period."

FAQ 12, lead on the conclusion and change the arithmetic's entry point:
> "Rarely, on ordinary numbers. A £1,800 annual licence fee saves the company £450 at 25% corporation tax and costs you £432 in personal tax, because you declare the £1,800 as property income against roughly £720 of allowable home costs. That is £18 a year of net benefit, and the licence almost always describes a defined space used only by the company, which is the exclusive-use characterisation that restricts Private Residence Relief on your own home."

FAQ 9, add the figure:
> "You still claim, and the claim is safer. Apportion on the same fair and reasonable basis, using the hours the kitchen is used for lettings work against its total use. One room in seven at 6 hours out of 60 is 1.43%, so £5,040 of bills gives £72, against £205.71 for a spare room on the same bills."

FAQ 1, replace "In the worked example on this page" with "On £5,040 of annual household bills".
FAQ 10, replace "the hours-banded flat rate you may have read about does not apply to you" with
"the hours-banded flat rate sits in the trading rules and does not reach a property business".

## B7. The CTA section is a structural twin of the sibling page's CTA

The two closers run the same four beats in the same order.

`claim-home-office-deduction-landlords` (lines 183-185):
> "**Is your home office claim built on a rate you are not entitled to use?**
> That is worth ten minutes of someone's time... Ours **checks** what you have actually been claiming, rebuilds the apportionment... and **tests** how you have described the room against your Private Residence Relief position before you sell. The two failure modes both have a price on them: a flat-rate claim that has to be unwound across several years of returns, **and** an exclusive-use characterisation that costs £3,908.57 on a £270,000 gain."

`national-insurance-on-rental-income` (lines 193-195):
> "**Is your record short, or is your business closer to a trade than you think?**
> Those are the two questions worth paying someone to answer. Our landlord tax review **checks** your National Insurance record and State Pension forecast against your actual letting history, and **tests** whether your activity sits in Tier 1, Tier 2 or over the line into a trade... Guessing at this is expensive in both directions: paying £956.80 for a year you already had, **or** discovering after a sale that HMRC treats your refurbishment activity as trading."

Beat for beat: `Is your <noun> <adjective>?` heading, then a "that is worth [time / paying
someone]" sentence, then "checks X ... and tests Y", then a colon introducing exactly two priced
failure modes, the second of which is a discovery-at-sale. Both pages are in the same cluster and
will be crawled and read together.

The home office version also loses on spec rule 12: it never names the service. "Ours checks"
has no antecedent noun, where N1 correctly says "Our landlord tax review".

Drop-in fix for this page (keep N1's shape, since N1 got there first and names the service):
> "<h2>Is your home office claim built on a rate you are not entitled to use?</h2>
> <p>Ten minutes answers it, and the answer is worth having before a sale rather than after one. Our landlord home office review rebuilds the apportionment from your actual bills and room use, then puts the resulting fraction alongside your Private Residence Relief position so you can see both numbers at once. A flat-rate claim taken in error has to be unwound across every year you claimed it. An exclusive-use description left on a return costs £3,908.57 on a £270,000 gain. Both are cheap to fix while the room is still in use and expensive to meet at completion.</p>"

---

# ADVISORIES

## A1. H2 5's opener states a principle rather than answering "how"

Quote (line 146): "Exclusive use is a question of fact, not a label you choose."

Strong sentence, wrong position. The heading asks how to document, and the four-item answer
arrives two paragraphs later at "Four things worth doing". Consider promoting: "Four things,
none of which takes long: claim on a time fraction, write the method down once a year, record the
non-business use, and keep the note with the house papers. Exclusive use is a question of fact,
not a label you choose, so the point of the documentation is to prove facts you already have."

## A2. H2 7's opener is a conditional plus a back-reference, and buries the £312 in the heading

Quote (line 167): "If your properties sit in a limited company, everything above changes, because
now there is an employer and you are its employee."

"everything above changes" is a mild instance of the same self-referential habit as B4. Suggested:
"£312 a year, tax free, with no apportionment and no records. A company is an employer and you are
its employee, so the homeworking rules that are closed to an individual landlord open up."

## A3. Three H2s state an answer with no figure in it

H2 2, H2 5 and H2 8 are answer-shaped but carry no number, where spec rule 9 asks for the number
in the heading. H2 8 could take one at no cost: "Records and Making Tax Digital: four things per
year, built as you go". Low priority; the page already clears the rule's question-or-answer test
9 times out of 9.

## A4. "fair and reasonable" appears 6 times, "genuinely" 5

The HMRC phrase is load-bearing the first two times (lines 71-75, where it is quoted) and becomes
a verbal tic thereafter (lines 79, 83, 85, plus FAQs 1, 3, 9). Substitute "defensible", "on the
same basis" or the actual fraction at three of the six.

## A5. "the second reason to stop using it" has no numbered first reason

Quote (line 112): "That is the second reason to stop using it: it is wrong, and on these numbers
it is also worse."

The first reason was never labelled as one, four sections earlier. Either drop "second" or make
the sentence self-contained: "So the flat rate is not only unavailable, it is also smaller."

## A6. Circular sentence reads as rhetoric where the section is otherwise pure statute

Quote (line 59): "There is no flat rate for landlords in it, because there is no flat rate for
landlords."

The section's authority comes from `s.94H` and the `s.272` import list; this closes it on a
tautology. Suggested: "It offers actual costs and nothing else, because there is no flat rate for
a property business to offer."

## A7. FAQ 5 cites an HMRC provision the body never names, in a page that names four statutes precisely

Quote (line 27): "HMRC's provision for splitting home loan interest is aimed at a different case,
where part of your home is genuinely let out to a tenant."

"HMRC's provision" is vague where the rest of the page is exact. Either name it or drop the
sentence; the first two sentences of that answer already carry the full answer.

## A8. Batch-wide tics shared with all three sibling pages

Not unique to this page and not individually fixable here, but the batch reads as one author with
two sentence shapes:

- **"There is no X" as an authority stamp.** 4 instances on this page ("There is no statutory
  hours log", "There is no flat rate for landlords in it", "There is no prescribed formula"),
  6 on N1, 5 across the E1/E2 additions. 15 in one batch.
- **Fragment-numeral paragraph openers.** This page: "Two further checks point the same way.",
  "Two smaller points that come up with outbuildings:", "Four things worth doing, none of which
  takes long.", "PIM2100 gives you two levels", "The two failure modes". N1: "Check two traps
  first", "Two cautions.", "Check two things before you do anything else", "three situations",
  "The three tiers". Ten in two pages.
- **The verdict-then-hidden-price second paragraph.** This page line 51 and N1 line 53 both run
  "the answer is X, and it is settled / it is the most misreported" then "but there is a price"
  then a colon delivering the price. B2's replacement text breaks this pairing on the home office
  side; N1 keeps its version, which is fine as the only one.

Recommend the batch owner picks one of these to normalise across all four pages rather than
per-page edits.

## A9. Statute discipline passes but sits at the batch maximum

2.7 refs per 1,000 words against a spec cap of 4 and a winner median of 2.4, so this passes rule 1
cleanly. It is worth recording that the E1 and E2 additions took statute to **0.0** and N1 carries
one manual code, so this page is 100% of the batch's statutory load. That is defensible here,
because the page's thesis is that one section does not apply to you and the reader has to be able
to check it. Note only that spec rule 2 ("at most one Act citation per page") is breached four
times over, deliberately, and that the `editorialNote` at line 46 already records the call.

## A10. `summary` ends on "this guide will cover" scaffolding, which the spec bans

Quote (line 15, final sentence):
> "Below: the flat rates you cannot use, the apportionment you can, the documentation that keeps the relief intact, the company director route at £312 a year, and what Making Tax Digital changes about the records."

`summary` is user-facing: `Property/web/src/app/blog/landlord-tax-essentials/page.tsx:151` renders
it on the category card under `line-clamp-3`, so this sentence is almost certainly clipped there,
but it is shipped copy either way. Spec section 9 lists "this guide will cover" scaffolding among
the things zero winners carry. Delete the sentence; the summary is 190 words and loses nothing.

---

## What is working, so it does not get edited out

- H2 1 is the strongest section in the batch. "The flat rates are real, and they are not yours"
  followed by the `s.272` import list, quoted, is the correction stated as law. That is the model
  the rest of the page's correction framing should be pulled back to, not away from.
- The £2,057-saved-against-£3,908.57-cost trade is the page's actual product and it is set out
  cleanly, with the annual-exempt-amount variant priced at line 140.
- Both tables carry a tax-year heading and a "Source: ..., data to August 2026" line, per spec
  rule 6. This is the rule our pre-existing corpus fails 11 times out of 11.
- Zero em-dashes, zero US spellings, both meta fields inside limits, no pricing.
