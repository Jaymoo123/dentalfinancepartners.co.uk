# Editorial QA, CGT cluster batch 1

Reviewed 2026-08-20 against `briefs/property/cgt/DOSSIER.md` §6 (language spec).
Reviewer track: editorial only. Factual accuracy vs house positions is the other track;
arithmetic was spot-checked and is noted where it bears on readability, not adjudicated.

Method: `git diff` isolated the new copy on the two EXTEND pages; the net-new page was read
in full. Mechanical scans run over all three: em-dash/en-dash, stock AI phrases, pipeline
strings, heading forms, second-person density, statute density.

## Verdicts

| # | Page | Verdict | Blockers | Advisories |
|---|---|---|---|---|
| 1 | `capital-gains-tax-property-complete-guide-uk.md` (EXTEND) | **must_fix** | 7 | 4 |
| 2 | `principal-private-residence-relief-landlords.md` (EXTEND) | **must_fix** | 4 | 3 |
| 3 | `capital-gains-tax-second-home-sale.md` (NET-NEW) | **must_fix** | 4 | 5 |
| — | Cross-page | **must_fix** | 5 | 2 |

Nothing here is a factual embarrassment. Everything here is a *reads-as-machine-copy*
embarrassment, which is the bar this review applies.

## What passes, stated so the fixes do not undo it

- **Em-dashes: zero across all three pages.** En-dashes: zero. Clean.
- **Stock AI phrases: zero.** No "it's worth noting", no "in today's landscape", no "Let's",
  no "delve", "navigate", "robust", "leverage", "tapestry", "when it comes to", "ultimately",
  "in conclusion".
- **Pipeline artefacts: zero in rendered copy.** No leaked instructions, no `(HP…)`, no
  placeholders, no visible keyword lists formatted *as* lists. (Keyword lists appear inside
  prose instead: see the blockers.)
- **Spec §6 targets hit.** Question-form headings: 7/7 new H2s (guide), 5/5 (PRR), 11/13
  (second-home) against a 31.5% winner benchmark. Statute density in new sections: 0.0, 1.8,
  1.2 per 1,000 words against our 10.2 baseline. Second-person: 57.8, 59.9, 42.0 per 1,000
  against a 25+ target.
- **No pricing. No client names.** Aside/CTA count is 2, 2, 1 — restrained.
- The second-home page carries genuine voice in places no generator produces: "A fortnight
  with a mattress in an empty flat is not a residence", "It converts one tax bill into three",
  "which is a quiet and common way to give money away", "Anyone promising more than that is
  selling you something". This is the register the other two pages should be edited toward.

---

## Page 1: capital-gains-tax-property-complete-guide-uk.md (EXTEND)

**Verdict: must_fix.** The new block is ~1,850 words appended at lines 225-333, between
"Common mistakes" and "Authoritative sources". It re-answers most of the page it was added to.

### BLOCKER 1.1 — The new block is bolted on below the depth, inverting the spec

**Location:** new block starts line 225, immediately after the "Common mistakes" list (214-223),
which reads as a page-closing section.

**Problem:** DOSSIER §6 sets the target as "near zero [statute] in new plain-language sections;
**keep depth below**". This page does the exact opposite: a reader gets ~2,900 words of
specialist depth (s.58 TCGA, indexation allowance, CT600, non-resident rebasing dates), then a
hard register drop into "You pay capital gains tax when you sell a house that was not your only
or main home". The pillar's own daughter page (`principal-private-residence-relief-landlords`)
got this right and placed its new plain-language block *above* the s.222 framework.

**Fix:** Move the seven new H2s to sit directly after the opening paragraph (line 65) and
before "The 2026/27 CGT framework at a glance". The existing specialist sections then read as
the depth beneath, which is the shape the spec describes and the shape the PRR page already has.

### BLOCKER 1.2 — Five new sections answer questions the old page already answered

The page now answers the same question twice, in two registers, in two places.

| Question | Old location | New location |
|---|---|---|
| What are the rates and how is the 18/24 split decided? | 67-86 (table) + 140-146 "The annual exempt amount and rate bands" | 239-259 "How much is capital gains tax on property in 2026/27?" |
| What is the £3,000 allowance and how does it interact with losses? | 142 (para 1 of "The annual exempt amount and rate bands") | 261-273 "What is the capital gains allowance on property?" |
| When is the 60-day return due, and who is exempt from it? | 148-154 "The 60-day reporting and payment regime" | 275-288 "When do you pay capital gains tax on property?" |
| What is the gain, and what comes off it? | 88-98 "The five-step calculation" + 105-130 "Allowable costs in the base cost" | 290-303 "How is capital gains tax on rental property calculated?" + 320-333 "What counts as the gain when you sell a property?" |
| Do commercial gains differ? | 76 (table row: "Non-residential / commercial CGT (aligned from 30 October 2024) 18% / 24%") | 305-318 "Do you pay capital gains tax on commercial property and land?" |

**Fix:** Two options, both cheap. Either (a) move the new block up per 1.1 and **delete** the
old duplicate sections, letting the plain-language version be the only answer with the
specialist detail folded into it; or (b) keep both but make the old sections explicitly the
mechanics layer, retitled ("How the rate split is computed", "The 60-day filing mechanics")
and cross-referenced from the new answer. Option (a) is a shorter diff and a better page.
Doing neither leaves a pillar that says everything twice.

### BLOCKER 1.3 — Five new FAQ entries duplicate five existing FAQ entries

**Location:** frontmatter. New entries at lines 46-57 against existing entries at 18-45. The
page now carries 19 FAQs with five near-pairs.

- New 48-49 "How much is capital gains tax on property?" vs existing 18-19 "What are the current
  CGT rates on UK residential property?"
- New 50-51 "What is the capital gains tax allowance on property in 2026/27?" vs existing 19
  (same £3,000 / £1,500 figures, same sentence shape)
- New 52-53 "When do you pay capital gains tax on property?" vs existing 24-25 "What is the
  60-day reporting requirement?"
- New 54-55 "Do you pay capital gains tax on commercial property?" vs existing 19 (commercial
  alignment, 30 October 2024)
- New 56-57 "Can you still claim CGT Letting Relief?" vs existing 28-29 "What is Private
  Residence Relief?" (which already states the shared-occupation restriction)

**Problem:** If these render as an accordion or as FAQPage schema, a user or a crawler sees the
same question asked twice with different wording. It reads as a page assembled by two people who
did not speak.

**Fix:** Merge each pair. Keep the new, plainer wording as the question; keep whichever answer
is better and delete the other. Target 14 FAQs, not 19.

### BLOCKER 1.4 — Visible keyword list inside a sentence

**Quoted, line 237:**

> "Sellers ask this in a dozen ways, from capital gains tax on a home sale to CGT on a house
> sale to capital gains tax when selling a property, and the answer turns on how you used the
> property rather than on how the sale is described."

**Problem:** This is the target keyword list read aloud. No specialist writes it. The clause
"Sellers ask this in a dozen ways" exists only to license the list that follows.

**Fix:** Delete the sentence. The paragraph loses nothing; the two sentences before it already
make the point ("the answer turns on how you used the property").

### BLOCKER 1.5 — Keyword-carrying sentences that say nothing

**Quoted, line 318:**

> "If you describe the asset as commercial real estate rather than commercial property, nothing
> changes: capital gains tax on commercial real estate is the same tax at the same rates."

**Quoted, line 322:**

> "Property and capital gains tax questions almost always start with the wrong number, and this
> is the one to correct first: capital gains tax on property sales is charged on the increase in
> value…"

**Quoted, line 326:**

> "Two further points before you settle the property sale capital gains figure:"

**Quoted, line 333:**

> "Get those two numbers right and the sale of property CGT calculation is arithmetic."

**Quoted, line 243:**

> "Here is what the capital gains tax percentage on property looks like on a real disposal."

**Problem:** Each carries a keyword variant in a noun phrase no human uses ("the property sale
capital gains figure", "the sale of property CGT calculation", "the capital gains tax percentage
on property"). Line 318 is the worst: it asserts a synonym is a synonym.

**Fix:** Delete 318 entirely. Rewrite the rest in plain terms: "Here is how that works on a real
disposal", "Two more points before you settle the figure", "Get those two numbers right and the
rest is arithmetic".

### BLOCKER 1.6 — Three consecutive sentences each carrying a different keyword variant

**Quoted, line 241:**

> "Those are the residential property capital gains tax rates for 2026/27, and the same two
> rates apply to non-residential and commercial gains. The CGT rates on property do not vary
> with how long you owned it. Your capital gain on residential property is not taxed at a single
> fixed percentage: how much of it falls at 18% depends on how much of your basic-rate band your
> other income has already used."

**Problem:** "residential property capital gains tax rates" / "CGT rates on property" / "capital
gain on residential property" in three sentences. Sentence two ("do not vary with how long you
owned it") is a true but unprompted denial that exists to hold a variant.

**Fix:** Keep sentence three, which does real work. Fold the taper point into the section on
common misconceptions if it is worth keeping at all.

### BLOCKER 1.7 — Self-contradiction inside one new section

**Quoted, line 277:**

> "Capital gains on UK property go through that account whether you are resident here or not."

**Contradicted 5 and 9 lines later, in the same section's own bullets (282, 285):**

> "**No tax due** because relief, losses or your allowance cover the gain: you do not need a
> 60-day return if you are UK resident."
> "**The property sits in a company:** there is no 60-day return, and the gain goes through the
> corporation tax return instead."

**Fix:** Delete line 277's final sentence. It is a keyword-carrying flourish that the bullets
immediately falsify.

### ADVISORY 1.8 — Every new section is the same shape

Six of the seven new H2s run: answer-first paragraph → numbered lead-in ending in a colon →
bulleted list → closing paragraph carrying onward links. "Three positions cover most sellers:" /
"Three features of capital gains allowances on property catch sellers out:" / "When to pay
capital gains tax in the other common situations:" / "What comes off the gain when you are
selling rental property:" / "What still differs when you sell commercial property or land:" /
"Two further points…". **Fix:** vary two or three of them. One section as a table only, one as
continuous prose, one as a short worked figure.

### ADVISORY 1.9 — Empty summarising closers

> line 259: "In short, CGT on property carries two rates and one allowance."
> line 292: "That is the one thing to hold on to about capital gains tax and rental property:
> there is no occupation history to shelter the gain."

Both restate the sentence directly above them. **Fix:** delete.

### ADVISORY 1.10 — Rule-of-three saturation

"Three positions", "Three features", "the same three things as any other disposal" (307), "Two
further points". Four numeric lead-ins in 1,850 words. See cross-page finding X.1.

### ADVISORY 1.11 — Casing split within one page

Old copy: "Capital Gains Tax (CGT)" (line 65). New copy: "capital gains tax" lowercase
throughout. `dateModified` moved to 2026-08-20 but `reviewedAt` stayed `2026-05-21`, so the
"Reviewed against legislation.gov.uk and HMRC guidance" credential now covers copy written three
months after the stated review. **Fix:** pick one casing; move `reviewedAt` or drop the claim.

---

## Page 2: principal-private-residence-relief-landlords.md (EXTEND)

**Verdict: must_fix.** ~2,270 new words at lines 46-118, placed **above** the s.222 framework.
The placement is right and should be the model for page 1. The content duplicates the page's
own worked example and carries one visible keyword list.

### BLOCKER 2.1 — Two worked examples on one page, both landing on 81 qualifying months

**New, lines 104-115:** "own a home for 10 years, live in it for 6 and let it for the last 4…
72 months lived in, plus the final 9 = 81… 81/120 × £150,000 = £101,250" → **67.5% relieved**.

**Existing, lines 201-250 ("Worked time-apportionment example"):** Mark and Sarah, "Actual
occupation as main residence: 72 months… Qualifying period: 72 + 9 = 81 months. PRR exempt
amount: 81/192 × £239,300" → **42.2% relieved**.

**Problem:** Same 72 months, same +9, same 81, different denominator, different percentage,
1,000 words apart. A reader who scrolls sees "81 months" twice and two different answers and
cannot tell whether the second corrects the first. This is the same-worked-example-different-
numbers pattern, and here it is on a single page.

**Fix:** Change the new example's occupation period so the two do not collide (e.g. 8 years
lived in, 4 let, 12 owned → 105/144), or drop the new arithmetic entirely and make the new
section point down to the Mark and Sarah example, which is more complete anyway.

### BLOCKER 2.2 — Visible keyword list inside a sentence

**Quoted, line 88:**

> "So a search for CGT private residence relief, CGT on PPR, CGT on main residence, CGT on
> primary residence or the CGT main residence exemption lands you on the same set of rules."

**Problem:** Five keyword variants strung on "a search for". This is the pipeline's target list
rendered as prose, and the framing ("a search for…") tells the reader the page is written for
the search engine.

**Fix:** Delete. The paragraph's first three sentences ("Capital gains tax private residence
relief is what HMRC's own helpsheet calls it. Accountants, older guidance and most search
results call it principal private residence relief, shortened to PPR or PRR. You will also see
main residence relief and the main residence exemption.") already do the naming work well.

### BLOCKER 2.3 — Redundant keyword-carrying sentence, immediately after the point is made

**Quoted, line 76:**

> "There is no separate capital gains tax on a primary residence in the UK, no special primary
> residence rate and nothing you have to claim. 'Primary residence' is the everyday phrase for
> what the tax rules call your only or main residence, and the relief covering it is the same
> private residence relief. If the property was your main home throughout, the gain is fully
> exempt: nothing to report, nothing to pay. **The capital gains tax primary residence position
> is identical whether you call the place your primary residence, your main residence or simply
> your home.**"

**Problem:** The bolded fourth sentence repeats the second sentence with the keyword restated
three more times in one clause. "The capital gains tax primary residence position" is not
English. **Fix:** delete the sentence.

Related, same section: "The capital gains tax main residence rules come down to one question"
(line 70) and "Working out capital gains on main residence sales takes five steps" (line 94) are
the same noun-stack habit. Rewrite to "It comes down to one question" and "Working it out takes
five steps".

### BLOCKER 2.4 — New reporting paragraph duplicates the page's existing reporting section

**New, line 118:**

> "Then there is the reporting. If the exemption covers the whole gain you have nothing to pay
> and, as a UK resident, no 60-day return to file. If tax is left over, as in the example above,
> you report and pay it within 60 days of completion…"

**Existing, lines 342-346 ("Reporting after the disposal and records to retain"):**

> "If PRR covers the whole gain, no CGT is due and (as a UK resident) you do not need to file a
> 60-day CGT on UK property return… If PRR only covers part of the gain and there is still CGT
> to pay, you must file the 60-day return within 60 days of completion as a UK resident."

Same two sentences, same order, same conditions. The new FAQ "Do you have to tell HMRC when you
sell your main home?" makes it three times on one page. **Fix:** delete the new body paragraph
and keep the link; the existing section is the better version and already carries the
non-resident point and the records list.

### ADVISORY 2.5 — Colon-plus-keyword-list heading

> "Private residence relief, PRR and PPR: are these different reliefs?"

The only colon heading in the new block, and the pre-colon half is a keyword list. **Fix:**
"Are PRR, PPR and private residence relief different reliefs?"

### ADVISORY 2.6 — Second-person laid on thicker than any measured winner

59.9 "you/your" per 1,000 words against a winner benchmark of 39.7 (spec §6). The second-home
page sits at 42.0 and reads better for it. At ~6% of all words, "you" stops being register and
starts being a tic. **Fix:** on a pass through, convert every third or fourth "you" to the
impersonal where nothing is lost.

### ADVISORY 2.7 — Numeric lead-in repetition

"Four situations create a bill:" (line 64), "Two things people expect that are not true." (82),
"takes five steps" (94). See cross-page finding X.1.

---

## Page 3: capital-gains-tax-second-home-sale.md (NET-NEW)

**Verdict: must_fix.** The best-written of the three and the closest to the spec's register.
Its problems are concentrated: a handful of keyword grafts, and one sentence used twice.

### BLOCKER 3.1 — "how to avoid" repeated three times in three consecutive sentences

**Quoted, line 189:**

> "Below are the eight answers people offer when asked **how to avoid capital gains tax on second
> property**. All of them fail, and some of them fail expensively. There is no version of **how
> to avoid CGT on second property** that survives contact with the legislation, and every article
> promising **how to avoid capital gains tax on second homes UK-wide** is recycling one or more
> of them."

**Problem:** Three variants of the same query in 60 words, with "UK-wide" bolted onto the third
purely to make the keyword grammatical. The section that follows is genuinely good; this opener
undoes it.

**Fix:** "Mostly no, and better to hear it now than after paying for a scheme. Eight routes get
suggested. All of them fail, and some fail expensively." Then straight into the myths.

### BLOCKER 3.2 — "UK-wide" used four times as a keyword-grafting device

**Quoted, line 174:** "The honest answer to **how to reduce capital gains tax on property
UK-wide** is that six things move the number…"
**Quoted, line 189:** "…**how to avoid capital gains tax on second homes UK-wide**…"
**Quoted, line 217:** "…so **CGT on second homes UK-wide** is a single regime."
**Quoted, FAQ line 43:** "It is UK-wide."

**Problem:** Line 217's use is legitimate (the section is about devolution). Lines 174 and 189
are the keyword "…on property UK" and "…on second homes UK" with "-wide" appended to make them
parse. Once you notice the trick you see it everywhere.

**Fix:** Delete "UK-wide" from 174 and 189. "The honest answer is that six things move the
number" is a better sentence anyway.

### BLOCKER 3.3 — Heading echoed back as an ungrammatical sentence

**Heading, line 81:** "How much capital gains tax on a second property? A worked example"
**Opening sentence, line 83:** "**How much capital gains tax on second property you pay** comes
down to two numbers: the size of the gain and the size of your income."

**Problem:** The opening clause is not a grammatical noun phrase. It is the heading keyword
reinserted into the first sentence, which is the single most recognisable generated-copy move on
the page.

**Fix:** "It comes down to two numbers: the size of the gain and the size of your income."

Same pattern, lower severity, at line 57 ("**CGT on second property of that kind** is charged at
the standard residential rates") and line 128 ("**Second homes and capital gains tax** mostly
come down to this one question").

### BLOCKER 3.4 — The same sentence appears twice on the page

**Aside, line 123:** "The work is worth most when it happens before contracts are exchanged,
because most of the levers close at that point."
**Closing section, line 225:** "Almost every lever on this page closes when contracts are
exchanged."

**Problem:** Same claim, same metaphor, 100 lines apart, and the closing section is built
entirely on it. The aside pre-empts the page's own ending.

**Fix:** Rewrite the aside to sell the computation rather than the timing, and let the closing
section own the exchange point.

### ADVISORY 3.5 — Synonym list in the opening definition

**Quoted, line 57:**

> "People call it a 2nd home, a second property, a secondary home or a holiday place, and for
> tax purposes those are the same thing… What people think of as **the capital gains tax second
> property regime** is really just the ordinary residential CGT regime with no residence relief
> attached to it."

"2nd home" is a search string, not a word anyone writes in prose. The final sentence repeats the
one before it with a keyword attached. **Fix:** cut "a 2nd home," and delete the final sentence.

### ADVISORY 3.6 — Plural-for-keyword in a heading

> "When do you report and pay capital gains tax on second home sales?"

Natural English is "on a second home sale". The plural exists to match the query. **Fix:** singularise.

### ADVISORY 3.7 — Pence-level precision throughout the worked examples

"£1,488.60", "£40,255.20", "£41,743.80", "£10,525.20", "£2,536.20", "£1,816.20". The arithmetic
is correct (verified), but a specialist writing for a seller rounds: "about £41,700". Twelve
figures to the penny reads as spreadsheet output. **Fix:** keep pence in the tables, round in
the prose.

### ADVISORY 3.8 — House-style splits against the rest of the cluster

- "self assessment" lowercase, 4 uses. The other two pages use "Self Assessment" (8 uses). Pick one.
- The aside names the firm in the third person ("Property Tax Partners prepares CGT
  computations…"). Both EXTEND pages' asides use the impersonal house voice ("the form below
  routes through to a property tax specialist"). Not wrong, but inconsistent within one cluster.
- Missing hyphens: "worn out kitchen" (77), "15 year old purchase costs" (170), "seven year
  clock" (193), "ten year charges" (197). House style elsewhere hyphenates.

### ADVISORY 3.9 — Penalty framing differs from the pillar

This page (168): "a £100 fixed penalty straight away, daily penalties of £10 from day 91".
Pillar page (288): "the penalty starts at £100 from day 61". Both cannot be the reader's mental
model. Factual track owns which is right; editorially the cluster should say it the same way in
both places. Flagged for that track, not adjudicated here.

---

## Cross-page findings

### BLOCKER X.1 — One rhetorical device used twelve times across three pages

The "N things:" lead-in followed by a bulleted list is the batch's structural signature:

- Guide: "Three positions cover most sellers:" · "Three features of capital gains allowances on
  property catch sellers out:" · "the same three things as any other disposal" · "Two further
  points before you settle…"
- PRR: "Four situations create a bill:" · "Two things people expect that are not true." ·
  "takes five steps"
- Second-home: "you fall into one of four groups" · "Two things people raise that are not
  relevant." · "Three conditions matter in practice." · "six things move the number" · "the
  eight answers people offer" · "comes down to two numbers"

**Problem:** Read consecutively, the three pages have one voice with one habit. That is the
sameness the helpful-content bar exists to catch.

**Fix:** Halve the count. On each page keep at most two enumerations; convert the rest to prose
or to a table.

### BLOCKER X.2 — The same sentence, twice, with synonyms swapped

**PRR line 82:** "Two things people expect that are not true."
**Second-home line 61:** "Two things people raise that are not relevant."

Both open a two-item paragraph. Both follow a definitional section. **Fix:** rewrite one of them
into continuous prose.

### BLOCKER X.3 — The mortgage misunderstanding, twice, in the same slot

**Guide, lines 322-324:** "Your gain is what you sold for minus what it cost you, **not the money
that reaches your bank account**… The mortgage is the biggest single misunderstanding. Repaying a
£150,000 loan out of the proceeds does not reduce the capital gain…"

**Second-home, lines 65-67:** "…charged on that figure, not on the sale price and **not on the
cash you walk away with after clearing the mortgage**. The mortgage point causes more shocks than
anything else here. Repaying the loan is not a deduction. Capital gains on second home sales are
worked out on the property, **not on your bank balance**…"

Same point, same position (immediately after defining the gain), same three-beat construction
(define gain → name the mortgage as *the* misconception → deny the deduction). **Fix:** keep the
second-home version, which is sharper. On the pillar, cut to one sentence and link across.

### BLOCKER X.4 — Same worked example, different numbers

**Guide, lines 243-259:** buy £180,000 + £5,000 acquisition costs + £10,000 improvement; sell
£300,000 less £6,000; gain £99,000; less £3,000 AEA; £96,000 at 24% = £23,040; then a
lower-income variant splitting 18%/24%.

**Second-home, lines 83-119:** buy **£180,000** + £2,400 acquisition costs + £26,000 improvement;
sell £395,000 less £7,600; gain £179,000; less £3,000 AEA; £176,000 split 18%/24%; then a
higher-income variant.

Identical purchase price, identical table skeleton (net proceeds → base cost → gain → AEA →
taxable → rate), identical follow-on "if your income were different" move. **Fix:** change the
pillar's purchase price and restructure its table (it can carry the rate split inline rather than
as a second table), or drop the pillar's example and link to the second-home page for it.

### BLOCKER X.5 — "Check the date on anything you read", twice

**PRR line 90:** "Plenty of advice still online blurs the two and quotes a £40,000 lettings
relief that most sellers can no longer claim, **so check the date on anything you read** about it."
**Second-home FAQ line 39:** "Many older articles still describe the pre-2020 version, which was
far broader, **so check the date on anything you read**."

Near-verbatim, both about letting relief. The second-home body adds a third variant at line 144
("whatever an older article told you"). **Fix:** keep one. It is a good line once.

### ADVISORY X.6 — Joint-ownership closer, twice

**Guide line 237:** "…so capital gains tax on selling a home is often much lower for a couple
than for a single owner with the same gain."
**PRR line 78:** "…which is why a couple usually pays less than a sole owner on the same gain."

**Fix:** vary one.

### ADVISORY X.7 — Transient pipeline temp file observed in the content tree

During the scan, `Property/web/content/blog/letting-relief-landlords-2026-changes.md.tmp.15936.53e40e771471`
was present; it had gone on re-check a minute later, so a writer process was mid-flight on the
letting-relief page while this review ran. Nothing to clean up now. Two notes: another page in
this cluster was being written concurrently with QA, and the writer leaves temp files inside the
deployable content directory rather than in scratch. Worth a `.gitignore` entry or a scratch path
so a crashed run cannot leave one behind.

---

## Recommended order of fixes

1. **Page 1 placement (BLOCKER 1.1) and the five duplicated sections (1.2).** Everything else on
   that page is cosmetic next to a pillar that answers itself twice.
2. **Page 1 FAQ merge (1.3).** Fastest fix with the highest visible payoff.
3. **The keyword grafts:** 1.4, 1.5, 1.6, 2.2, 2.3, 3.1, 3.2, 3.3. Nearly all are deletions.
4. **Cross-page duplication:** X.3, X.4, X.5, plus PRR's on-page example collision (2.1) and the
   second-home's repeated lever sentence (3.4).
5. **Cadence:** X.1 and 1.8. A pass that varies section shape and halves the enumerations.
6. Advisories last.

Estimated: items 1-4 are the difference between must_fix and all_clear. Items 5-6 are the
difference between "passes QA" and "reads like one specialist wrote it".
