# Editorial QA, CGT cluster batch 3 (2026-08-20)

Reviewer track: editorial only (helpful-content bar + DOSSIER.md §6 language spec). Factual
accuracy against house positions is the other track and is not adjudicated here.

Method: `git diff` isolated the new copy on targets 1 and 2 (old copy read in full for seam
assessment); target 3 read whole; target 4 assessed on copy strings only. Mechanical sweeps run:
em-dash/en-dash scan of all added lines, placeholder scan, 8-gram cross-page overlap between all
four targets, internal-link resolution.

| Target | Verdict | Blockers | Advisories |
|---|---|---|---|
| 1. `capital-gains-tax-property-sale-uk-2026-rates-allowances.md` | **must_fix** | 2 | 4 |
| 2. `cgt-calculation-selling-buy-to-let-property-step-by-step.md` | **must_fix** | 3 | 4 |
| 3. `do-limited-companies-pay-capital-gains-tax-property.md` | **must_fix** | 5 | 3 |
| 4. `capital-gains-tax-calculator.ts` | **must_fix** | 3 | 4 |
| Cross-page | **must_fix** | 1 | 1 |

## Clean on the mechanical checks

- **Zero em-dashes** in every added line across all four targets. The only U+2212 characters are
  the minus signs in the marginal-relief formula and the worked table on target 3, which are
  correct maths, not punctuation.
- **No pipeline artefacts of the leaked-instruction kind**: no TODO/TBD, no bracketed
  placeholders, no residual brief language, no "as an AI" register.
- **No pricing, no client names.** CTA count is within restraint on targets 1-3 (target 4 is
  flagged below).
- **All 17 internal links in the new copy resolve** to existing slugs in `content/blog/`.
- **Cross-page lexical overlap is negligible**: the only shared 8-grams between targets are the
  unavoidable rate boilerplate ("inside your unused basic-rate band and 24% on everything above
  it", "report and pay the tax within 60 days of completion"). No copy-paste between pages.
- **Register per §6 is genuinely hit**: new H2s take question form, second person is dense and
  natural, statute is near-absent above the fold, current year stated once with the historic table
  clearly labelled by tax year below it. The register work is good. The findings below are about
  duplication, keyword carriers and one repeated structural tic, not about voice.

---

## Target 1: `capital-gains-tax-property-sale-uk-2026-rates-allowances.md` (EXTEND)

Verdict: **must_fix**

### BLOCKER 1.1 — the page now answers "what is the rate" twice, in two registers

Location: new H2 at line 136 against protected H2 at lines 60-75.

New (line 136-137):
> "**What is the CGT rate on residential property in 2026/27?**
> You pay 18% on the part of the gain that sits inside your unused basic rate band and 24% on
> everything above it."

Existing, seventy lines above (line 60-66):
> "**CGT Rates and Annual Exempt Amount for 2026**
> For the 2026/27 tax year, the capital gains tax rates on residential property disposals are:
> **18%** for basic rate taxpayers / **24%** for higher and additional rate taxpayers"

Same question, same answer, opposite register, on one page. The reader who scrolls hits the rate
table, the AEA history and a band-split example, then hits all three again in the new block. The
annual-exempt-amount history (£12,300 → £6,000 → £3,000) is now told **three** times: lines 68-75,
line 145, and the historic table at 154-158.

Suggested fix (respects additive-only): retitle the new H2 to the angle the old section does not
cover and delete the restated rate line. Something like "Do you pay 18% or 24% on your gain?",
opening on the stacking mechanic ("Your income fills the basic rate band first…"), the trustee and
personal-representative position, and the link to the rates page. That keeps everything the new
block adds and removes everything it repeats.

### BLOCKER 1.2 — three of the six new FAQs are the new H2s again, one of them word-for-word

Location: frontmatter lines 43-52 against body lines 136-174. FAQs render visibly on the page
(`BlogPostRenderer.tsx:306-320`), so this is reader-facing duplication, not schema-only.

- FAQ "Do non-residents pay capital gains tax on UK property?" (line 43) is the H2 at line 168,
  character-for-character in the heading and substantively identical in the answer.
- FAQ "Have capital gains tax rates gone up, and when did they last change?" (line 47) is the H2
  at line 141.
- FAQ "What were the capital gains tax rates in 2024/25?" (line 49) is the H2 at line 147.
- FAQ "Is the CGT rate different for commercial property or land?" (line 51) is the H2 at line 164.

Suggested fix: keep at most one of these as an FAQ and make the others carry the edge case the body
does not (e.g. non-resident **companies**, the treaty-credit point, what happens where the disposal
straddles 30 October 2024 on exchange versus completion). An FAQ that restates its own H2 is the
clearest single tell that a page was assembled rather than written.

### ADVISORY 1.3 — keyword-only shorthand

> "If you are comparing capital gains tax rates for 25/26 against the current year, nothing has
> moved." (line 161)

"25/26" appears nowhere else on the page or in house style, which is "2025/26". The truncation
exists to carry a query variant. Fix: "The 2025/26 and 2026/27 positions are the same, so an older
calculation on 2025/26 rates still holds."

### ADVISORY 1.4 — the new copy contradicts protected copy it now sits beside

Line 68 (protected): "The annual exempt amount for capital gains tax **continues its significant
reduction**". Line 161 (new): "nothing has moved". Both are on the same page; the first has been
untrue since April 2024. Additive-only prevents fixing it in this window. Log it for the next
edit window on this page rather than leaving it unrecorded.

### ADVISORY 1.5 — off-vertical mention

> "Sell commercial property, land **or shares** and your rates went up." (line 144)

Shares are a deferred owner decision for this cluster (§4c.9). One clause is not a play, but it is
the kind of drift the deferral was meant to prevent. Fix: drop "or shares", the sentence loses
nothing.

### ADVISORY 1.6 — subject overlap with a dedicated page

The new rate section covers the ground of `cgt-rates-property-2026-27-current-rates-explained`,
which it links. The link is the right mitigation; noting it so the cannibalisation check at deploy
knows the overlap was seen and accepted.

---

## Target 2: `cgt-calculation-selling-buy-to-let-property-step-by-step.md` (EXTEND)

Verdict: **must_fix**

### BLOCKER 2.1 — the worst seam in the batch: two reporting sections back to back

Location: new H2 at line 345, protected H2 at line 361. Sixteen lines apart, nothing between them
but the other new section.

New (345-351):
> "**Do you have to tell HMRC when you sell a buy-to-let?**
> Yes, if there is CGT to pay. You declare the sale on HMRC's Capital Gains Tax on UK property
> service and pay the tax within 60 days of completion, then report the same disposal again on
> your Self Assessment return… If you are non-resident, you file within 60 days for every UK land
> disposal, whether or not any tax is due."

Protected (361-368):
> "**Reporting and payment: tying the calculation back to compliance**
> Within 60 days of completion: file the CGT on UK property return and pay any CGT due. UK
> residents only file where CGT is due… Non-UK residents file for any UK land disposal regardless
> of tax due."

Identical content, one in second person and one as a compliance bullet list, adjacent. A reader
sees the same three facts twice in forty seconds.

Suggested fix: narrow the new section to what the old one does not carry — the two "trip people up"
cases (joint owners file separately; a loss still needs claiming even with no return) — and retitle
accordingly, e.g. "Who files, and what if you sold at a loss?". Move it above "The five-step
calculation" or leave it where it is; the duplication is the problem, not the position.

### BLOCKER 2.2 — the same paragraph written twice with the numbers swapped

FAQ (frontmatter, "Does moving back into a rental property avoid capital gains tax?"):
> "Two years back in a property you owned for twenty gives you roughly two twentieths more relief,
> plus the final nine months of deemed occupation. HMRC also looks at quality of occupation rather
> than a fixed minimum period, so a short move back arranged purely for the relief is a weak
> position."

Body (line 396):
> "…a year back in a property you have owned for fifteen adds roughly a fifteenth of relief, plus
> the final nine months of deemed occupation. HMRC also weighs the quality of occupation rather
> than a fixed minimum period, so a short move back arranged for the relief alone is a position
> that struggles under enquiry."

Same two sentences, same clause order, different numerals and three swapped synonyms. This is the
most legible generation artefact on the page: a template filled twice. A human writing both would
have cross-referenced, not re-derived.

Suggested fix: keep the body paragraph, cut the FAQ to two sentences that do not restate it
("No. Private Residence Relief is time-apportioned across your whole ownership, so moving back adds
relief in proportion to the months, it does not reset the gain. See the section on reducing the
bill below."), or drop the FAQ entirely.

### BLOCKER 2.3 — SEO plumbing visible to the reader

> "Searches for how to avoid capital gains tax on property nearly always end at the same short
> list: use both spouses' allowances…" (line 386)

The page stops addressing the reader and starts describing the query stream it is targeting. Two
of the four targets do this (see cross-page finding X.2), which is what makes it a pattern rather
than a slip.

Suggested fix, same keyword, natural: "You cannot avoid it on a taxable gain, but you can usually
reduce it, and the honest list of ways to avoid capital gains tax on a property sale is short: use
both spouses' allowances, move ownership before you sell rather than after…"

### ADVISORY 2.4 — keyword as sentence subject

> "The capital gains tax on selling rental property is worked out one disposal at a time, so a
> portfolio landlord runs the same five steps for each sale…" (line 71)

Nobody writes "the capital gains tax on selling rental property is worked out". Fix: "CGT is worked
out one disposal at a time, so a portfolio landlord runs the same five steps for each sale before
the year's gains and losses are added together."

### ADVISORY 2.5 — two keywords welded together

> "Since 6 April 2020 **letting relief on capital gains tax** has been restricted to
> shared-occupation lettings…" (FAQ, "Can you claim letting relief on capital gains tax when you
> sell?")

The relief is "letting relief"; "on capital gains tax" is bolted on. Fix: "Since 6 April 2020
letting relief has been restricted to shared-occupation lettings, so it no longer reduces the
capital gain for a landlord who moved out and let the whole property."

### ADVISORY 2.6 — new copy undercuts the page's own signpost

The protected intro says: "For the broader CGT framework (current rates, the annual exempt amount,
the regime as a whole) see the CGT on UK property complete guide… **This page focuses on the
computation itself.**" The first new H2 immediately below delivers current rates and the annual
exempt amount. Fix: open the new section on the computation angle ("Yes, and the number turns on
three inputs…") and let the rate sentence sit second, so the signpost still reads true.

### ADVISORY 2.7 — joint-ownership answered twice in the FAQ block

New FAQ "How do joint owners report a buy-to-let sale to HMRC?" sits alongside existing FAQ "How is
CGT calculated where the property is held in joint names?", and the same point appears again in the
new body at line 351. Three passes on one mechanic. Keep the new FAQ (reporting) only if the body
paragraph drops it.

---

## Target 3: `do-limited-companies-pay-capital-gains-tax-property.md` (NET-NEW)

Verdict: **must_fix**

The page's spine is strong: it answers in the first word, the worked SPV computation is genuinely
useful, the associated-companies and close-investment-holding traps are the kind of detail a
specialist volunteers and a content mill omits, and the asset-sale versus share-sale fork is
correctly framed as a negotiating question. Everything below is keyword carriage sitting on top of
that spine, and it is concentrated in five sentences.

### BLOCKER 3.1 — a visible keyword list in prose

> "Search corporation tax capital gains, corporate tax on capital gains, company capital gains tax
> or capital gains tax for limited companies and you land on that one mechanism under different
> names." (line 59)

This is a keyword list with a verb in front of it. It is the single clearest pipeline artefact in
the batch and it sits in the second section of a net-new page.

Suggested fix: delete the sentence. The preceding sentence already makes the point ("the answer to
'do companies pay capital gains tax' is no, while the answer to 'does my company pay tax on the
gain' is obviously yes"), and the same variants are carried naturally by the H1, the summary and
three H2s.

### BLOCKER 3.2 — ungrammatical keyword string presented as a term of art

> "There is no **capital gains tax limited company** regime, no capital gains tax for companies and
> no corporate capital gains tax rate of its own." (line 57)

Three near-identical noun phrases in one sentence, the first of which is not English.

Suggested fix: "There is no separate capital gains tax regime for companies and no corporate CGT
rate. When your company disposes of a chargeable asset, the gain is computed under capital gains
principles and then dropped into the corporation tax computation…"

### BLOCKER 3.3 — one keyword in three variants inside a single section

> "…precision matters, because **capital gains tax on the sale of a business** describes two
> completely different transactions. The rule for **capital gains tax on selling a business** is
> that the tax follows the seller." (line 166)
> "So the **business sale capital gains tax** question has two answers…" (line 172)

The first two are the same phrase twice in consecutive sentences; the third is a raw query string
used as a compound noun.

Suggested fix: "…precision matters, because 'selling the business' describes two completely
different transactions, and the capital gains tax follows the seller." Then at line 172: "So the
answer depends on which transaction you are doing, and that is a choice made at the negotiating
table…"

### BLOCKER 3.4 — SEO plumbing visible to the reader (second instance in the batch)

> "People search for how to avoid limited company capital gains tax on property and find schemes."
> (line 196)

Suggested fix: "There is no exotic answer to avoiding capital gains tax on a limited company's
property, and anyone offering you one should be treated with suspicion. The levers that actually
work on a corporate disposal, commercial property included, are these:"

### BLOCKER 3.5 — US register on a UK site, plus a keyword-only sentence beside it

> "…commercial **real estate** held in a company has no separate gains rate, no separate allowance
> and no separate return. **Commercial property capital gains tax is an owner question, not a
> property-type question.**" (line 152)

"Real estate" is not the register of this brand or this market; the second sentence is a
keyword-carrying restatement of the sentence before it.

Suggested fix: "…commercial property held in a company has no separate gains rate, no separate
allowance and no separate return. What decides the tax on a commercial property gain is who owns
it, not what it is."

Also in the same paragraph: "If you are researching capital gains tax on commercial property as an
individual, the rate matches a rental house." — "if you are researching" has two precedents in the
corpus so it is not new, but stacked with the two sentences above it makes the paragraph read as
query-driven. Prefer "If you own the commercial property personally, the rate matches a rental
house."

### ADVISORY 3.6 — smaller keyword carriers in the land section

> "**The CGT land position** follows the same rule as buildings…" (line 158) — fix: "Land follows
> the same rule as buildings, with one important fork."
> "…and **capital gains tax on selling land with planning consent attached** is no different."
> (line 162) — fix: "…and land sold with planning consent is no different."

### ADVISORY 3.7 — fourteen FAQs, most of them the body again

Every body H2 has a matching FAQ (rate, AEA, indexation, 60-day, commercial, share sale, land,
losses, non-resident, reduction levers, associated companies). Since FAQs render visibly, a reader
who reaches the bottom reads the page a second time in compressed form. Fix: cut to the six or
seven that carry something the body does not (the asset-versus-share price-discount point, the
trading-stock fork, ATED-CGT abolition, the SPV divided-limits arithmetic), and let the rest go.

### ADVISORY 3.8 — CTA and closer

The `<aside>` matches house convention ("Use the form at the foot of the page", used on 67 other
posts), carries no pricing and names no clients: correct. "The short version" closer is
substantive, not an empty wrap-up, and is unique in the corpus, so it is fine, but check with the
owner whether a named closing section is wanted as a house pattern before it spreads to the other
new pages.

---

## Target 4: `capital-gains-tax-calculator.ts` (copy strings)

Verdict: **must_fix**

### BLOCKER 4.1 — "How do you calculate capital gains tax?" reads as machine-written

> "Capital gains tax is calculated in four steps. **To calculate it:** work out the gain (proceeds
> minus cost and allowable expenses), deduct the £3,000 annual exempt amount… **The same steps
> apply whether you call it property or real estate**, and whether the asset is a flat or a share
> portfolio."

Two faults in one answer. "Capital gains tax is calculated in four steps. To calculate it:" says
the same thing twice so the second phrasing of the keyword can appear. The closing sentence exists
solely to place "real estate" on a UK page: no British reader wonders whether the calculation
changes depending on which of the two words they use, and the sentence draws attention to itself
by being unanswerable.

Suggested fix, same keywords, natural:
> "In four steps. Work out the gain (proceeds minus what you paid and your allowable costs),
> deduct the £3,000 annual exempt amount, split what is left between your unused basic-rate band
> and the rest, then apply 18% and 24%. The effective rate you end up with usually sits between
> the two, which is why the calculator shows it. The same four steps apply to a flat, a commercial
> unit or a share portfolio."

### BLOCKER 4.2 — ungrammatical keyword string in the explainer

> "**Two things this capital gain tax estimator deliberately does not model.**" (explainer,
> paragraph 4)

"Capital gain tax estimator" is missing its plural and is a query string used as a noun. Fix: "Two
things this calculator deliberately does not model." The variant is already carried by the meta
title, the tool name and the intro.

### BLOCKER 4.3 — two adjacent FAQs give the same answer

"How much capital gains tax will I pay?" and "How do you calculate capital gains tax?" run
consecutively and both answer with the same arithmetic: gain, minus £3,000, split across bands,
18% and 24%. The first adds the £120,000 / ~£28,000 example, the second adds nothing the first did
not say.

Suggested fix: merge into one, or turn the second into the question the first leaves open, e.g.
"What counts as an allowable cost?" — which is the actual next question a user of this tool has and
is currently only answered in field help text.

### ADVISORY 4.4 — "What is the threshold for capital gains tax?" carries two keywords awkwardly

> "It has been £3,000 since 2024/25, so **the 2025/26 capital gains tax allowance was the same
> figure**. Above the threshold, **the rate percentage that applies** (18% or 24%) depends on how
> much of your basic-rate band is left after your income."

Both clauses are stilted. Fix: "It has been £3,000 since 2024/25, so the same threshold applied in
2025/26. Above it, whether you pay 18% or 24% depends on how much of your basic-rate band is left
once your income is counted."

### ADVISORY 4.5 — nominalised keywords in the explainer

- "**The calculation of capital gains tax** starts with the gain, not the sale price." → "You are
  taxed on the gain, not the sale price."
- "Everyone then has **a capital gains tax allowance, the annual exempt amount, of £3,000** for
  2026/27." → "Everyone then gets an annual exempt amount, £3,000 for 2026/27, before any tax is
  due."
- "…which is exactly what **this CGT calculator** estimates." → the reader is looking at it; cut
  the clause.

### ADVISORY 4.6 — three sales nudges on one tool

`ctaLabel` ("Selling up? We'll handle the CGT →"), explainer paragraph 4 ("Both are exactly the
situations where advice pays for itself, and we can work out your precise position including any
reliefs"), and the HMRC FAQ ("which is where we come in"). One is the house norm on calculators.
Keep the `ctaLabel`, trim the explainer to "…and we can work out your precise position", and end
the HMRC FAQ at "before you commit to anything."

### ADVISORY 4.7 — scope, flagged not adjudicated

Two dossier-gated items appear to have been executed here: the calculator REFRAME is gated on the
SDLT calculator read (~2026-09-01, §4b) and a shares mode on the CGT calculator is one of the
options under the deferred shares decision (§4c.9). The copy is written as if both are approved
(meta title "Property & Shares", a shares option in the asset selector, a shares FAQ). Editorially
the shares copy is sound; the question is whether the gate was lifted. Worth confirming before
deploy.

---

## Cross-page findings

### BLOCKER X.1 — one sentence shape, sixteen times, across all four targets

The "[number] [plural noun] [verb]" section opener is the batch's signature tic:

| Target | Instances |
|---|---|
| 1 | "Two things work differently." / "Two alternatives exist if they suit you better:" / "One thing to check before you reuse an older calculation." |
| 2 | "Three things set the bill when you are selling a rental property." / "Two versions of it arrive most weeks:" / "Two situations trip people up." |
| 3 | "Three consequences follow immediately" / "Three figures matter" / "Two traps sit underneath that table" / "Two practical readings." / "Two deadlines run on different tracks" / "Two layers." / "One layer." / "One exception:" / "One correction if you have been reading older material:" |
| 4 | "Two things this capital gain tax estimator deliberately does not model." |

Any one of these reads well. Sixteen of them, with target 3 carrying nine in a single page, is a
rhythm no human sustains, and the four pages will be crawled and read as a set. It is also the
mechanism behind the every-section-same-shape problem: nearly every new section on target 3 opens
with a short answer, then a counted list preamble, then the list.

Suggested fix: keep roughly a third, distributed across the four pages, and rewrite the rest to
open on the content. "Two traps sit underneath that table" → "The table hides two traps, both
common in property structures." "Two practical readings." → "So check the computation two ways."
"Two deadlines run on different tracks" → "The payment date and the filing date are not the same
day, and the earlier one is the one people miss."

### ADVISORY X.2 — the "how to avoid" section is the same section twice

Target 2 §"Can you avoid capital gains tax on a rental property?" and target 3 §"How do you
legitimately reduce a limited company's tax on a property gain?" share a skeleton: search-behaviour
opener → bolded-lead-in bullet list of levers → a closing "what does not work" paragraph or colon
list. The wording differs (the 8-gram sweep found no shared text), but the shape is identical and
both open with the visible-SEO sentence flagged at 2.3 and 3.4.

Suggested fix: fixing 2.3 and 3.4 removes the shared opener. Then vary one of the two bodies, e.g.
run target 3's levers as prose under the existing "traps" voice rather than as a second bulleted
lever list.

---

## What would clear each target

- **Target 1**: retitle/trim the new rate H2 (1.1), cut or repoint three duplicated FAQs (1.2),
  fix "25/26" (1.3). Log 1.4 for the next window.
- **Target 2**: narrow the new HMRC-reporting section (2.1), cut the duplicated moving-back FAQ
  (2.2), rewrite the "Searches for…" opener (2.3).
- **Target 3**: five sentence-level rewrites (3.1-3.5), all quoted above with replacements. The
  structural work is FAQ pruning (3.7), which is optional for release but recommended.
- **Target 4**: rewrite two FAQ answers and merge a third (4.1, 4.3), one word fix in the explainer
  (4.2). Confirm the gate position (4.7).
- **Batch**: thin the counted-preamble openers (X.1) before all four ship together.
