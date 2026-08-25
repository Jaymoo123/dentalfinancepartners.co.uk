# Editorial QA, CGT cluster batch 2

Reviewed 2026-08-20 against `briefs/property/cgt/DOSSIER.md` §6 (language spec).
Reviewer track: editorial only. Factual accuracy vs house positions is the other track;
arithmetic was spot-checked and one error is recorded because it sits inside the changed copy.

Method: `git diff` isolated the new copy on the two EXTEND pages; the net-new page was read
in full. Mechanical scans run over all three: em-dash/en-dash, stock AI phrases, pipeline
strings, heading forms, second-person density, statute density, repeated link targets.
Old copy on the EXTEND pages was read in full so seams could be judged against what is
already on the page.

## Verdicts

| # | Page | Verdict | Blockers | Advisories |
|---|---|---|---|---|
| 1 | `cgt-payment-deadlines-property-sales-2026.md` (EXTEND) | **must_fix** | 8 | 4 |
| 2 | `cgt-inherited-rental-property-calculation-uk.md` (EXTEND) | **must_fix** | 4 | 5 |
| 3 | `capital-gains-tax-on-shares-uk.md` (NET-NEW) | **must_fix** | 3 | 5 |
| — | Cross-page | **must_fix** | 2 | 2 |

The shares page is the strongest of the three and is close to clear. The deadlines page is
the problem: it is the most heavily keyword-loaded copy in the cluster so far, and its new
sections were inserted into the middle of an existing page that already answered four of
them.

## What passes, stated so the fixes do not undo it

- **Em-dashes: zero across all three pages.** En-dashes: zero. Clean.
- **Stock AI phrases: zero.** No "it's worth noting", no "Let's", no "delve", "navigate",
  "landscape", "crucial", "robust", "testament", "in today's", "it is important to".
- **Pipeline artefacts: zero in rendered copy.** No leaked instructions, no placeholders, no
  TODO/TBC/`{{`, no visible keyword lists formatted *as* lists. (Keyword lists appear inside
  prose instead, which is the main blocker family below.)
- **Spec §6 targets hit on every measured axis.** Question-form headings in new copy: 6/7
  (deadlines), 5/5 (inherited), 10/12 (shares), against a 31.5% winner benchmark.
  Second-person density in new copy: 53, 44 and 40 per 1,000 words against a 25+ target.
  Statute refs in new copy: 0.0, 0.0 and ~1.0 per 1,000 against our 10.2 baseline. On the two
  EXTEND pages the depth is genuinely below the plain-language block, which is the shape the
  spec asks for and which batch 1 got wrong on the pillar.
- **Colons in headings: 0/7, 0/5, 1/12.** No heading-colon habit.
- **No pricing. No client names. UK English throughout** (checked: "practise/practice",
  "-ise" forms, "£" formatting, no "capital gains taxes" Americanism outside one deliberate
  comparison heading).
- **All 15 internal links resolve** to existing slugs; the shares page's calculator claim is
  real (`src/lib/calculators/tools/capital-gains-tax-calculator.ts` has an `assetType` field
  with a shares option, and the note text already distinguishes 60-day from Self Assessment).
- The shares page carries real voice in places: "You will not need to read it, but you will
  need to apply it", "That is the rule doing its job", "A large bonus in March can change the
  rate on a gain you made in June", "the ISA exemption is a genuine structural advantage on
  the shares side that no amount of property planning replicates". Edit toward that register,
  not away from it.

---

## Page 1: cgt-payment-deadlines-property-sales-2026.md (EXTEND)

**Verdict: must_fix.** ~1,050 words of new body copy plus six new FAQs. The new H2s are
interleaved into the existing page at lines 63-70, 92-98, 149-201 and 243-249. The page now
carries 20 H2s.

### BLOCKER 1.1 — The insertion order breaks the page's argument

**Location:** lines 111-201. Reading order is now: "What the 60-day return contains" (111,
old) → "Filing without digital access" (130, old) → "Payment is due at the same time" (143,
old) → "How do you report capital gains tax to HMRC?" (149, new) → "How do you pay capital
gains tax to HMRC?" (165, new) → "What is the HMRC capital gains tax account…" (175, new) →
"Which capital gains tax form do you need?" (183, new).

**Problem:** the page explains what the return contains, then how to file on paper, then when
to pay, and only *then* introduces "how do you report". A reader who has got as far as line
149 has already been told all of it. The new block was written as if it were opening the page
and then dropped into the middle of it.

**Fix:** move the whole 149-201 run up to sit immediately after the new opener at 63-70, so
the page reads plain-language first (what it is, how you report, how you pay, which form) and
then drops into the existing mechanics at "Who is in scope" / "What the 60-day return
contains". Nothing needs rewriting to do this; it is a cut and paste of four H2s.

### BLOCKER 1.2 — The payment answer is given twice, 22 lines apart, in two registers

**Location:** old §"Payment is due at the same time" (143-147) and new §"How do you pay
capital gains tax to HMRC?" (165-173).

**Quoted, old (line 145):** "The service offers payment by bank transfer, debit card or
corporate credit card."
**Quoted, new (line 167):** "The service takes a bank transfer, a debit card or a corporate
credit card."

And immediately adjacent:
**Quoted, old (line 147):** "Interest on late payment runs from day 61 at HMRC's published
rate."
**Quoted, new (line 173):** "Pay late and interest runs from day 61 at HMRC's published late
payment rate…"

**Problem:** the same three payment methods and the same day-61 interest rule, restated in a
different voice within one screen of each other. This is the clearest "two registers, same
answer" seam in the batch.

**Fix:** delete the old §"Payment is due at the same time" entirely and fold its one unique
fact (no built-in Time to Pay inside the 60-day workflow, HMRC will consider it after the
liability crystallises) into the new section at 173, which already gestures at Time to Pay.

### BLOCKER 1.3 — Self Assessment interaction answered twice, back to back

**Location:** old §"How the 60-day return and Self Assessment interact" (222-241, including an
aside) and new §"Do you report capital gains on your Self Assessment tax return as well?"
(243-249). The new section starts on the line after the old section's closing aside.

**Quoted, old (line 224):** "The 60-day return is not a final return. The same disposal must
be reported again on the SA108 capital gains pages of the Self Assessment return if the seller
is within Self Assessment."
**Quoted, new (line 245):** "Yes. If you are within Self Assessment, the same gain goes on
your tax return even though you already filed and paid within 60 days."

**Problem:** two consecutive H2s answering one question. The new one adds the loss-claim
point and the "you may still be pulled back into SA" point; everything else is a restatement.

**Fix:** merge. Keep the new question-form H2 as the heading, keep the old timeline bullets
and the balancing-payment paragraph as the body, and keep only the two genuinely new
paragraphs (loss claim, and "do not assume it").

### BLOCKER 1.4 — The Government Gateway / account-number fact appears four times

**Location:** line 129 (old), line 155 (new bullet), line 177 (new H2), plus FAQ at
frontmatter line 13.

**Quoted, old (129):** "First-time users need a Government Gateway account and a separate CGT
on UK property account number (HMRC generates this when the service is first accessed)."
**Quoted, new (155):** "You need a Government Gateway user ID and a Capital Gains Tax on UK
property account, which HMRC creates for you the first time you use the service."
**Quoted, new (177):** "If you have never used the service, the account is created the first
time you sign in, and HMRC issues you a Capital Gains Tax on UK property account number…"

**Problem:** one fact, four statements. An entire new H2 (175-181) exists to say what line 129
already said.

**Fix:** delete the old sentence at 129, keep the new H2 at 175 (it earns its place on the
"lost account number" and "not the same as your SA account" points), and cut the bullet at
155 down to "Sign in with your Government Gateway ID" with the detail left to that H2.

### BLOCKER 1.5 — Keyword-carrying sentences, login family

**Location:** line 177.

**Quoted:** "Your HMRC capital gains tax login is your Government Gateway user ID and
password, used on the Capital Gains Tax on UK property account sign in page, and there is no
separate capital gains tax account login to set up alongside it."

**Problem:** three query strings ("HMRC capital gains tax login", "account sign in page",
"capital gains tax account login") in one sentence, with the third carried by inventing a
thing that does not exist so it can be negated. No specialist writes this.

**Fix:** "You sign in with your Government Gateway user ID and password. There is no separate
CGT login to set up."

### BLOCKER 1.6 — Keyword-carrying sentences, form and return family

**Location:** line 201.

**Quoted:** "The HMRC capital gains tax form for everything else is the SA108. Your capital
gains tax return in that case is not a standalone document at all, because the tax return for
capital gains outside the 60-day regime is your ordinary Self Assessment return with the SA108
pages attached."

**Problem:** "HMRC capital gains tax form", "capital gains tax return", "tax return for
capital gains" in two sentences, all naming the same object. The third clause exists only to
carry the phrase.

**Fix:** "For everything else the form is the SA108, and it is not a standalone document: it
is a set of pages attached to your ordinary Self Assessment return. People call the 60-day
filing a CGT return, and it is one, but it is not your tax return, and filing it does not
remove the Self Assessment step."

### BLOCKER 1.7 — Keyword-carrying sentences, report/declare/pay family

**Location:** lines 151, 153, 167.

**Quoted (151):** "You report CGT on a UK residential property with tax to pay through the
Capital Gains Tax on UK property service, the service where you report and pay capital gains
tax on UK property within 60 days of completion."
**Quoted (151):** "How to declare capital gains tax comes down to that same fork: the asset
decides the route, not the size of the gain."
**Quoted (167):** "Paying capital gains tax online this way is the whole payment step, and
there is no separate paying-in date to remember, because the payment deadline is the filing
deadline."

**Problem:** in 151 the appositive restates the service's own name in order to carry the
phrase. "How to declare capital gains tax comes down to…" bolts a search query on as a
sentence subject. In 167, "there is no separate paying-in date to remember" is a
non-fact invented so "paying capital gains tax online" can be the subject of a sentence.
Three sentences that exist for the keyword, not the reader.

**Fix:** 151 → "You report a UK residential property sale with tax to pay through HMRC's
Capital Gains Tax on UK property service, within 60 days of completion. Everything else,
including the later true-up of that same gain, goes on the Self Assessment capital gains
pages. The asset decides the route, not the size of the gain." 167 → delete the final clause;
"the payment deadline is the filing deadline" is the whole point and stands alone.

### BLOCKER 1.8 — Keyword-carrying sentences, sale-of-land family

**Location:** line 94.

**Quoted:** "…so capital gains tax on sale of land or commercial premises goes on your Self
Assessment return instead… Capital gains on sale of land you have held as an investment are
taxed at the same 18% and 24% rates as a residential gain in 2026/27, but the reporting route
and the payment date are different. There is no 60-day return for CGT on sale of land by a UK
resident, and no 60-day payment either."

**Problem:** "sale of land" three times in one paragraph, and the closing sentence restates
the paragraph's opening sentence with nothing added. Also note the same answer is given again
in the FAQ ("Do I have to report a capital gain on the sale of land within 60 days?") in
almost the same words.

**Fix:** cut the third sentence entirely. Change the second to "Land held as an investment is
taxed at the same 18% and 24% rates as a residential gain in 2026/27; only the reporting route
and the payment date change."

### ADVISORY 1.9 — The paper-route answer is split across two places

**Location:** old §"Filing without digital access" (130-141) and new table row plus line 199.

**Quoted, old (141):** "There is no separate paper-route deadline and no extension for posting
time."
**Quoted, new (199):** "…posting time is yours to absorb: the 60-day deadline does not move
because your paper CGT return is in the post."

Same point, two voices, 58 lines apart. The new phrasing is better; delete the old sentence.

### ADVISORY 1.10 — Agent authorisation stated twice

**Quoted, old (129):** "Agents file via the agent services account, with client authorisation
handled through the digital handshake process."
**Quoted, new (163):** "If you would rather an accountant did the reporting, they file through
an agent services account and you approve the authorisation digitally."

Keep the new one (second person, and the "ask to see the calculation" line is good). Cut the
old clause.

### ADVISORY 1.11 — Numbered-preamble tic, twice in one page

**Quoted (67):** "Three things decide whether the 60-day rule reaches you at all."
**Quoted (98):** "Two edge cases catch people out."

See cross-page BLOCKER X.1: this construction appears eight times across the three pages.
Vary at least one of these two.

### ADVISORY 1.12 — New opener pre-empts the scope table it sits above

**Location:** 67 vs the table at 73-89. The three conditions in the new paragraph are the
first three rows of the table immediately below. Acceptable as an answer-first lead-in, but
tighten 67 to one sentence ("The rule reaches you only if you are UK resident, selling UK
residential property, with tax actually due after reliefs and your £3,000 allowance") and let
the table carry the detail.

---

## Page 2: cgt-inherited-rental-property-calculation-uk.md (EXTEND)

**Verdict: must_fix.** ~950 words of new body copy at lines 64-131 plus five new FAQs, placed
above the existing s.62 depth. The placement is right and is the shape batch 1's pillar got
wrong. The prose inside it is the problem.

### BLOCKER 2.1 — Noun-pile keyword sentence

**Location:** line 99.

**Quoted:** "The inherited house capital gains tax question people ask most is whether their
parents' years of ownership count."

**Problem:** "inherited house capital gains tax question" is a keyword string used as a noun.
Nobody writes this sentence except to place a phrase.

**Fix:** "The question people ask most is whether their parents' years of ownership count.
They do not."

### BLOCKER 2.2 — Two keyword variants in consecutive sentences, closing on an empty summary

**Location:** line 93.

**Quoted:** "CGT for deceased estates also runs on a shorter clock than most executors expect,
because that allowance disappears once the second tax year after the death has passed.
Deceased estate CGT therefore has a narrow footprint: it bites on what the executors actually
sell, on growth after the death, and on a timetable you control."

**Problem:** "CGT for deceased estates" and "Deceased estate CGT" back to back. The second
sentence is a rule-of-three summarising closer that adds nothing the bullets above it have not
already said, and "narrow footprint" is corporate filler.

**Fix:** keep the first sentence, delete the second.

### BLOCKER 2.3 — Restatement paragraph carrying a keyword

**Location:** line 75 (a one-sentence paragraph).

**Quoted:** "Capital gains on inherited property are measured from the date-of-death value,
never from what the deceased originally paid, so the years they owned it are simply out of the
calculation."

**Problem:** line 66 already said "Capital gains tax only comes into play if you later sell,
and then only on the growth above that probate value", and line 68 says it a third time
("capital gains tax on inherited property is really a question about a future sale"), and line
99 says it a fourth time ("everything your parents' own ownership gained falls out of
account"). Four statements of one fact inside 35 lines, each carrying a different inflection
of the keyword.

**Fix:** delete 75. Keep 99 (it is the one that answers the reader's actual worry) and trim
68 to "So this is a question about a future sale, not about the estate in front of you today."

### BLOCKER 2.4 — Reporting answered twice on the page, both linking to the same guide

**Location:** new line 113 and old §"The 60-day CGT on UK property reporting rule, correctly
stated" (301-311).

**Quoted, new (113):** "You then have 60 days from the day the sale completes to report it and
pay… Where nothing is due because your allowance, your losses or private residence relief
cover the gain, a UK resident does not have to file that return. If you live abroad you file
within 60 days on every UK property sale, tax due or not."
**Quoted, old (309):** "UK-resident beneficiary after assent: file where CGT is due… Non-UK-
resident beneficiary after assent: file for every UK land disposal regardless of whether tax
is due."

Both paragraphs then link to `cgt-payment-deadlines-property-sales-2026` (the page now links
there three times). The old section's unique value is the "£6,000 is not a reporting
threshold" correction and the PR-during-administration row.

**Fix:** cut the new paragraph at 113 to one sentence plus the existing link, and let the old
section keep the detail. Drop one of the three links to the deadlines guide.

### ADVISORY 2.5 — Three facts introduced with no pointer to their own deeper sections

**Location:** bullets at 87-91.

The estate's 24% rate, the three-year AEA window and the death of the deceased's losses each
have a dedicated section further down (§"Annual exempt amount sequencing across three tax
years" at 342 with its own table, §"Capital-loss interactions" at 334). The new block
signposts the assent decision ("the tables and worked examples further down this page price it
both ways") but not these. Add the same style of pointer so the repetition reads as layering
rather than as duplication.

### ADVISORY 2.6 — Tacked-on keyword sentence

**Location:** line 111.
**Quoted:** "CGT on inherited property is then reported and paid like any other residential
disposal."
The next paragraph explains reporting in full. Delete.

### ADVISORY 2.7 — Query string used as a sentence subject

**Location:** line 83.
**Quoted:** "CGT and death interact in one direction only: the death resets the value, it does
not create a charge."
The idea is good and the second half is well put. "CGT and death interact" is the query.
Suggest: "Death resets the value; it does not create a charge."

### ADVISORY 2.8 — Section shape is uniform across the new block

Four of the five new sections run the same shape: question H2 → one-line answer → context
paragraph → bulleted list. Break at least one (the parents section at 97-107 would work as
prose, since its three bullets are three scenarios rather than three parallel rules).

### ADVISORY 2.9 — Over-linking to the executor's guide

The page now links to `inheriting-uk-rental-property-executors-step-by-step` four times, two
of them added by this change (line 95 and the intro). Drop the new one at 95; the intro at 62
already sets it up.

---

## Page 3: capital-gains-tax-on-shares-uk.md (NET-NEW)

**Verdict: must_fix**, on three specific lines. The page is otherwise the best-written thing
in this cluster batch and the brand-fit read passes: the property firm's angle is structural,
not decorative. It carries a shares-versus-property comparison table, a shared-allowance
section built around a buy-to-let sale, a "selling shares to fund a deposit" section, "you
cannot wrap a buy-to-let in an ISA", losses interchangeable between the two, and a closing
paragraph that reframes the whole question as a disposal-sequencing question for someone who
holds both. This reads as a property tax firm explaining shares to its own clients, not as a
generic finance blog. Keep that.

### BLOCKER 3.1 — Arithmetic error in the lead worked example

**Location:** line 76.

**Quoted:** "If you had £8,000 of unused basic-rate band, the first £8,000 would be taxed at
18% and the remaining £6,800 at 24%, giving £2,872."

**Problem:** £8,000 × 18% = £1,440, £6,800 × 24% = £1,632, total **£3,072**, not £2,872. The
figure is wrong by £200, which is exactly the dealing costs, so it looks like a subtraction
applied at the wrong step. This is the page's headline example and the number a reader will
check against the calculator.

**Fix:** £3,072.

### BLOCKER 3.2 — Meaningless phrase carrying a keyword

**Location:** frontmatter line 35 (FAQ, "What if I have shares I have held for 20 years…").

**Quoted:** "…which is why a shares-held-for-20-years calculation is rarely a two-figure sum
and is worth getting reviewed before you file."

**Problem:** "a shares-held-for-20-years calculation" is a mangled keyword used as a noun, and
"rarely a two-figure sum" does not mean anything (a two-figure sum is £10 to £99; the sentence
presumably wants "rarely a one-line calculation"). This is the only line on the page that
reads as machine copy.

**Fix:** "A holding of that age has almost certainly seen at least one of those events, so the
base cost is rarely a single number off an old contract note. Get it settled before you file."

### BLOCKER 3.3 — Keyword-carrying clause in the Sharesave FAQ

**Location:** frontmatter line 37.

**Quoted:** "That makes the taxable gain larger than most people expect when they reach for a
sharesave capital gains tax calculator."

**Problem:** "when they reach for a sharesave capital gains tax calculator" is a query string
attached to an otherwise good sentence. It also implies a tool we do not have.

**Fix:** "That makes the taxable gain larger than most people expect."

### ADVISORY 3.4 — Quoted UI label does not match the calculator

**Location:** line 80.
**Quoted:** 'Choose "Shares and other assets"…'
The actual option label in `src/lib/calculators/tools/capital-gains-tax-calculator.ts` is
**"Shares & other assets"** (ampersand). Match it exactly or drop the quotation marks.

### ADVISORY 3.5 — Four promotional touches on one page

Two asides (127-130, 218-221), an inline calculator promo (80) and a calculator plug inside a
schema FAQ answer (frontmatter line 23). DOSSIER §6 lists booking-CTA padding under "do not
copy". Cut the FAQ plug (promotional content inside FAQPage schema is also the weakest place
for it) and keep the other three.

### ADVISORY 3.6 — Aside voice is third person where house style is first person

**Quoted (129):** "Property Tax Partners reviews disposal timing for investors who hold
both…"
Elsewhere in the cluster the asides use "we" ("We file both as a paired exercise…"). Change to
"We review disposal timing for investors who hold both".

### ADVISORY 3.7 — Numbered-preamble tic, four times

**Quoted (63):** "You do not pay anything in three situations."
**Quoted (88):** "Three practical consequences if you own both:"
**Quoted (123):** "Two rows deserve a second look."
**Quoted (184):** "There are three routes worth knowing…"
Plus the closer at 216 ("Get those three right…") and the H2 "The five things to get right".
See cross-page BLOCKER X.1.

### ADVISORY 3.8 — Three closers stacked

The page ends with a five-bullet recap ("The five things to get right", 206-214), then a
summarising paragraph (216), then a CTA aside (218-221). The paragraph at 216 is the best
writing on the page and the bullets largely repeat the body. Cut the bullet list, keep 216.

---

## Cross-page

### BLOCKER X.1 — One sentence construction used eight times across three pages

**Quoted:**
- deadlines 67: "Three things decide whether the 60-day rule reaches you at all."
- deadlines 98: "Two edge cases catch people out."
- inherited 68: "Two numbers decide your bill:"
- inherited 85: "…three points shape what the estate pays:"
- shares 63: "You do not pay anything in three situations."
- shares 88: "Three practical consequences if you own both:"
- shares 123: "Two rows deserve a second look."
- shares 184: "There are three routes worth knowing…"

**Problem:** [number] + [plural noun] + [verb] + [what], almost always immediately before a
list, is the single most repeated shape in the batch. Read the three pages in sequence and the
same authorial tic announces every list. Batch 1 flagged a comparable pattern; this is the
same generator habit surviving into batch 2.

**Fix:** keep at most one per page. Replace the others by leading straight into the list, or by
making the preamble carry content ("The estate's position differs from a beneficiary's in
three ways that matter" → just state the first one).

### BLOCKER X.2 — Aphoristic imperative closer at the end of sections

**Quoted:**
- inherited 131: "Get the loss on the right tax return, because a loss sitting with the wrong
  person is a loss nobody can use."
- deadlines 173: "Filing on time and paying late costs you far less than being late on both."
- shares 216: "Get those three right and the rate looks after itself."
- shares 93: "Do not leave it unused."
- deadlines 249: "Do not assume it."

**Problem:** short imperative or epigram closing a section is fine once. Five instances across
three pages, always in the final sentence, is a formula. Individually each one reads well,
which is why this is easy to miss and worth fixing now rather than after two more batches.

**Fix:** keep the two strongest (inherited 131, shares 216) and let the other three sections
end on their last substantive sentence.

### ADVISORY X.3 — "Lever" metaphor twice

**Quoted, inherited 95:** "That single choice is usually the biggest lever you have as an
executor…"
**Quoted, shares 168:** "This is the largest single lever available to a UK investor…"
Near-identical superlative-plus-lever construction on two pages deployed in the same window.
Change one.

### ADVISORY X.4 — FAQ answers lifted near-verbatim from body copy

On both EXTEND pages several new FAQ answers are the body sentences with light rewording
(inherited FAQ "Do I pay capital gains tax on a house inherited from my parents?" vs line 99;
deadlines FAQ "Do I have to report a capital gain on the sale of land within 60 days?" vs line
94). Not a rendering problem, and some overlap is expected, but the verbatim runs read as
copy-paste. Reword the FAQ to answer the question in one different sentence rather than
mirroring the section.

---

## Summary of required fixes before deploy

**cgt-payment-deadlines-property-sales-2026.md** — reorder the new block above the existing
mechanics (1.1); delete the old payment section and fold its Time to Pay point into the new
one (1.2); merge the two Self Assessment sections (1.3); cut the Government Gateway fact from
four statements to one (1.4); rewrite lines 94, 151, 167, 177, 201 to remove keyword-carrying
clauses (1.5-1.8).

**cgt-inherited-rental-property-calculation-uk.md** — rewrite line 99 (2.1); delete the second
sentence of 93 (2.2); delete line 75 and trim 68 (2.3); cut the duplicate reporting paragraph
at 113 (2.4).

**capital-gains-tax-on-shares-uk.md** — correct £2,872 to £3,072 (3.1); rewrite the two FAQ
clauses at frontmatter lines 35 and 37 (3.2, 3.3).

**Cross-page** — thin the numbered-preamble construction to one per page (X.1) and the
aphoristic closer to two across the batch (X.2).
