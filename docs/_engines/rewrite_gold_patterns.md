# Rewrite Gold Patterns

Distilled from the Track-2 Property winners (position-lift data in
`docs/property/rewrite_results_2026-06-09.md`) and the blind-A* generalist pages.
Use this as the quality bar every rewrite must clear before it ships.

**No em-dashes in this document or in any rewritten page.**

---

## 1. H1 and opening keyed to the dominant query intent

**What it is.** The H1 restates the user's exact search phrase, not a
copywriter's title variant. The first two sentences answer the question
directly, including the headline figure or yes/no where applicable. No
warm-up paragraph, no "in today's landscape" preamble.

**Why it earns rank and trust.** Google's ranking for navigational and
informational queries rewards exact phrase match in H1 plus a near-instant
answer. Users who land on a result that makes them re-read the title to
check they are in the right place leave. Pages that answer in the first
sentence stay.

**Real example.** `mortgage-interest-deductible-landlords-uk-2026` (pos
14.3 to 6.6): H1 is the literal search string "Is Mortgage Interest
Deductible for UK Landlords in 2026?" and the opening div gives the
yes/no split (individual: no, company: yes) before any prose begins. The
reader never has to scroll to know they have the right page.

**`track2_rewrite_writer.wf.js` enforces this?** Partially. The prompt
requires the H1 to be "query-aligned to the primary intent" and requires
the highest-impression query to lead the metaTitle and H1, but it does not
require an explicit early-answer sentence or a summary-box for yes/no
queries.

---

## 2. Worked examples with full arithmetic shown, in the page body

**What it is.** Every key calculation is illustrated with a complete
numeric example: real-sounding scenario (property in a named UK city, a
plausible purchase price and annual income), every arithmetic step written
out, intermediate totals shown, and the result stated in plain English.
The example is in the body prose, not tucked in an FAQ answer.

**Why it earns rank and trust.** Users searching "how much CGT do I pay
when I sell a rental property" want to see a number arrive on the page,
not a formula. A complete example means the page is genuinely useful
rather than evasive, which both holds dwell time and earns natural links.
Featured-snippet extraction also favours a contained, self-standing
calculation block.

**Real examples.**

- `uk-residential-property-capital-gains-tax-rates-2025-2026-18-24`
  (A* blind audit): Manchestter flat, £180,000 purchase, £310,000 sale,
  six itemised cost lines, total costs summed to £208,700, gain derived,
  AEA deducted, band-stacking calculated step by step to a final figure of
  £23,275.80. The page shows the band-split arithmetic (£5,270 at 18%,
  £93,030 at 24%).

- `writing-down-allowance-cars` (pos 17.5 to 9.2, impr 59 to 151): four-row
  WDA table for a £20,000 car, every year's opening balance, allowance and
  closing balance, followed by a paragraph explaining why the 100% FYA
  beats this over time.

- `sa105-property-income-form-2026-complete-guide` (pos 12.1 to 6.8):
  box-mapped table for a higher-rate landlord with six itemised amounts, SA105
  box numbers beside each, and the Section 24 reducer computed explicitly.

**`track2_rewrite_writer.wf.js` enforces this?** Partially. DEPTH=FULL requires
"worked examples (every figure grounded in house_positions)" but does not
require the example to be body prose rather than an FAQ answer, and does not
specify that intermediate steps must be shown (just the answer would satisfy
the letter of the instruction).

---

## 3. Comparison and decision tables as primary content, not decoration

**What it is.** Where the topic involves two or more routes, rates or
structures, a structured HTML table is the primary way the side-by-side
data is presented. The table has a meaningful header row, clear row labels,
and is anchored by a sentence before and after that explains what to read
from it. Tables appear in the body, not only in the FAQ section.

**Why it earns rank and trust.** Google reliably lifts a clean
comparison table into featured snippets for "vs" and "which is better"
queries. The table format also forces the writer to decide what the real
dimensions of comparison are, which prevents vague prose that gestures at
a comparison without making one.

**Real examples.**

- `mortgage-interest-deductible-landlords-uk-2026`: six-row table with
  "Individual landlord" and "Limited company" columns covering deductibility,
  relief mechanism, rate, cap, penalty and governing rule. The surrounding text
  tells the reader to take the top-left versus top-right cells as the core
  takeaway.

- `writing-down-allowance-rates`: seven-row master rates table (allowance,
  rate, effective-from date, statute), followed by a separate worked
  reducing-balance table. Two tables in the same page, each doing distinct
  work.

- `tax-sell-rental-property-uk` (pos 32.1 to 11.9): three-column table
  separating income tax during ownership, CGT on disposal and the 60-day return
  (what it is, when it applies, headline rates, deadline) before any body
  prose. The reader understands the full tax picture before reading a word of
  explanation.

- `variable-director-salary-ni-management` (A*): uses no formal table but
  substitutes a contained arithmetic block and a bulleted practical steps list.
  Where a table was genuinely not the right structure (a single scenario, not
  a side-by-side choice), the writer did not force one. This matters: tables
  should appear where they genuinely structure side-by-side data, not as
  a checklist item.

**`track2_rewrite_writer.wf.js` enforces this?** Yes. The TABLES instruction
in step 4 is explicit: a comparison table is required where options are
compared and strongly encouraged for rates/bands/thresholds/deadlines. The
VERIFY stage checks for a missing table and flags it. This is one of the
most complete enforcements in the prompt.

---

## 4. Date-banded rate statements: rate + exact date band, every time

**What it is.** Every tax rate or threshold that has changed or will change
is stated with its operative date band. Not "the rate is 14%" but "the main
pool writing down allowance is 14% from 1 April 2026 (corporation tax) and
6 April 2026 (income tax), reduced from 18%". Not "the CGT rate is 24%" but
"24% on the part that falls into the higher rate band; this rate has applied
since 30 October 2024". Where a future change is enacted, it is stated as
enacted law with the Finance Act and Royal Assent date, not as a proposal.

**Why it earns rank and trust.** A rate without its date band is
immediately out of date the moment the rate changes. A rate with its date
band remains correct (and useful to the reader) across multiple tax years.
Google's QRater guidelines penalise pages that make readers wonder whether
the information is current. Searchers for "WDA rate 2026" are specifically
checking which year applies; the date band is the answer to their question.

**Real examples.**

- `writing-down-allowance-cars`: "main pool rate is 14% (cut from 18% from
  April 2026)" in summary, then "1 April 2026 for Corporation Tax and 6 April
  2026 for Income Tax, legislated in Finance Act 2026 amending CAA 2001 s.56"
  in the body section.

- `mortgage-interest-deductible-landlords-uk-2026`: table row showing "Tax year
  2026/27: 20% reducer" and "2027/28 onwards: 22% reducer (Finance Act 2026
  Schedule 1)" side by side, with a note that Finance Act 2026 received Royal
  Assent 18 March 2026.

- `sa105-property-income-form-2026-complete-guide`: "Finance Act 2026 (Royal
  Assent 18 March 2026), section 7, sets separate property income rates of 22%
  basic, 42% higher and 47% additional for England, Wales and Northern Ireland
  from the 2027/28 tax year" and then explicitly states "These are enacted, not
  proposed."

**`track2_rewrite_writer.wf.js` enforces this?** Partially. VERIFY checks
`facts_current` (every rate matches house_positions and primary source) and the
HARD RULES require figures to match house_positions. But the prompt does not
explicitly require the date band to be written into the rate statement itself,
only that the rate be correct. A page could pass VERIFY with a bare "the rate
is 14%" if it happens to match house_positions.

---

## 5. Statute citations as load-bearing hooks: act, section, linked

**What it is.** Statutory authority is cited at the point where the claim
is made, not collected in a footnotes section. The citation includes the
act name, section number and (where the section has been amended by a recent
Finance Act) the amending provision. Where the legislation is on
legislation.gov.uk, the citation is a live hyperlink. The citation is
the justification for the claim, not a cosmetic reference.

**Why it earns rank and trust.** An accountancy page that links directly
to legislation.gov.uk or gov.uk as the source of a specific claim signals
E-E-A-T expertise that a page sourced from HMRC summary guides or the
writer's prior knowledge cannot match. It also makes adversarial fact-checks
(by VERIFY, by competitors, by Google's quality reviewers) faster to
confirm, which tends to result in fewer edits and more stable rankings.

**Real examples.**

- `writing-down-allowance-rates`: "Capital Allowances Act 2001 section 56(1)
  reads '14% of the amount by which AQE exceeds TDR', annotated as substituted
  by Finance Act 2026 section 28(1)" with a live link to legislation.gov.uk,
  followed by "Finance Act 2026 received Royal Assent on 18 March 2026, so
  this is current law, not a proposal."

- `mortgage-interest-deductible-landlords-uk-2026`: ITTOIA 2005 s.272A cited
  as the no-deduction rule, ITTOIA 2005 s.274A and s.274AA cited as the reducer
  rule, Finance (No. 2) Act 2015 s.24 cited as the restricting provision,
  all with live legislation.gov.uk links. The FAQ answers cite the same
  sections.

- `sa105-property-income-form-2026-complete-guide`: "CAA 2001 section 35
  expressly bars..." with a link to the legislation, and "ITTOIA 2005 section
  311A" with a link, giving readers and HMRC the primary source for two
  commonly misunderstood rules.

**`track2_rewrite_writer.wf.js` enforces this?** Yes, and this is one of the
strongest enforcements. HARD RULES require WebFetch of legislation.gov.uk for
every statute cited, confirming operative wording supports the claim and (for
Finance Acts) Royal Assent. VERIFY checks `statutes_ok`. However, the prompt
does not explicitly require the citation to appear inline as a hyperlink to
legislation.gov.uk in the body prose; it only requires verification. A page
could pass with the citation only in an FAQ or sources list.

---

## 6. FAQ blocks targeting real query phrasings, verbatim where possible

**What it is.** The FAQ section uses the exact phrasing of proven GSC and
PAA queries as question text, not paraphrased or generalised variants. Each
answer is a standalone paragraph that resolves the question completely,
including the relevant rate, statute or deadline. FAQ answers do not
cross-reference other FAQ answers or tell the reader to "see above."

**Why it earns rank and trust.** FAQs with verbatim PAA phrasings directly
seed HowTo and FAQPage rich results, which can occupy a disproportionate
amount of SERP space for long-tail variants. An FAQ with twelve question-answer
pairs targeting distinct long-tail variants of the same topic can cover the
full query cluster a single article cannot serve through its headings alone.

**Real examples.**

- `writing-down-allowance-cars`: twelve FAQs, each targeting a distinct proven
  query ("What is the writing down allowance rate on cars for 2026/27?",
  "Can a sole trader landlord on the cash basis claim writing down allowance
  on a car?", "What happens to the allowance when I sell or stop using the
  business car?"). The answer to each includes the statute and the precise
  rate.

- `can-i-claim-mileage-limited-company-director` (A*): four FAQs in
  frontmatter, each a verbatim variant of the search query ("Can I claim
  mileage for driving from home to my office?", "What mileage rate can I claim
  as a director in 2026/27?"), with self-contained answers that do not
  require reading the body.

**`track2_rewrite_writer.wf.js` enforces this?** Partially. The prompt requires
8-14 FAQs "that reuse the long-tail target_queries[] (and competitor PAA from
the data pull) VERBATIM where natural." The Coverage stage checks query
coverage. But the prompt does not explicitly require that FAQ answers be
fully self-contained (not cross-referencing each other).

---

## 7. Stacked provenance: First published / Last reviewed / Reviewer credentials

**What it is.** Every rewritten page carries the original `date` field
(publication date, preserved), a `dateModified` field (date of the rewrite),
a `reviewedBy` field (a real reviewer name from house_positions, not invented),
a `reviewerCredentials` field (e.g. "Chartered Tax Adviser (CTA), Landlord Tax
Specialist"), and a `reviewedAt` field (today's date). The generator field
records which model produced the rewrite.

**Why it earns rank and trust.** Google's E-E-A-T framework explicitly
rewards demonstrable expertise, authoritativeness and trustworthiness. A page
that shows when it was written, when it was last reviewed, and by whom with
what credentials signals that a human expert has vouched for the content.
Pages without reviewer credentials are treated by quality raters as having
unknown E-E-A-T.

**Real example.** `sa105-property-income-form-2026-complete-guide` frontmatter:
`date: "2026-04-10"`, `dateModified: "2026-06-02"`, `reviewedBy: "ICAEW
Qualified Senior Reviewer"`, `reviewerCredentials: "Chartered Accountant
(ACA, ICAEW), Property Tax Specialist"`, `reviewedAt: "2026-06-02"`.

**`track2_rewrite_writer.wf.js` enforces this?** Yes. The E-E-A-T instruction
in step 4 and the VERIFY `eeat_ok` check both require all five fields to be
present. The HARD RULES specify that the original `date` field must be
preserved. This is fully enforced.

---

## 8. Internal-link canonicalisation to real sibling pages

**What it is.** Every internal link uses the full nested path
`/blog/<category>/<slug>` matching the target page's actual frontmatter
category (since `dynamicParams=false` means a wrong category 404s). Links
point to pages that genuinely exist in the content directory. Orphaned or
invented slugs are not linked.

**Why it earns rank and trust.** A 404 on an internal link signals a poorly
maintained site. More importantly, a page that links to genuine, related,
live sibling pages passes PageRank within the cluster and signals to crawlers
that the site has comprehensive topic coverage. Unresolved internal links
also break user journeys to the lead form.

**Real examples.** Every winner links to real siblings. `writing-down-allowance-cars`
links to `/blog/property-types-and-specialist-tax/capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework`
and `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list`.
`mortgage-interest-deductible-landlords-uk-2026` links to eight verified sibling slugs,
each with the correct category prefix.

**`track2_rewrite_writer.wf.js` enforces this?** Yes, this is the most
mechanically enforced pattern. Stage 2 (Normalise) runs `slug_resolver.py
--fix` which rewrites every internal link to the correct category prefix and
prints UNRESOLVED for any link to a non-existent page. VERIFY flags unresolved
links as `html_valid: false`. This is the strongest automated enforcement in
the pipeline.

---

## 9. What the losers do that winners do not

These are anti-patterns present in pre-rewrite pages and in low-performing
competitor content. Each is a blocking defect, not a style preference.

**Keyword-stuffed bold repeats.** Repeating the primary query phrase in bold
in every section ("As a UK landlord, your landlord expenses are important
because understanding landlord expenses..."). Winner pages use the phrase
naturally, once where it belongs, and then refer to the concept by shorter
names. Bold is used for genuinely important terms, not for SEO.

**Source-driven digressions.** Opening a section with background about a
legislative change the user did not ask about ("In 2017, George Osborne
announced the phased introduction of Section 24...") before answering the
user's question. Winners state the current rule immediately and provide
context as supporting prose, not as a preamble.

**Restate-only conclusions.** Ending with a paragraph that literally
re-reads what the page just said ("In summary, writing down allowance on
cars is 14% and there are three pools..."). Winners end with a genuine
next-step call or a related question the user is likely to have after reading,
with an internal link to the appropriate sibling page.

**Generic listicle scaffolding.** A page that is structurally a numbered
list of tips ("5 Things UK Landlords Should Know About Mortgage Interest"),
with each item a one-sentence heading and a two-sentence explanation.
Winners are built around the specific questions the GSC data shows users
are asking, not around a number chosen for listicle convention.

**Pricing mentions.** Any reference to fees, hourly rates, cost ranges,
or percentage-of-rent figures. These are present in many competitor pages
and in some pre-rewrite pages. They disqualify a page from shipping on this
estate.

**"It is important to note" and throat-clearing prose.** Filler phrases
that delay the point and make the page feel AI-generated. Every sentence
must earn its place by either advancing the argument, adding a data point,
or explaining a mechanism. Phrases like "in conclusion", "to summarise"
and "it is worth noting" are signals the paragraph they introduce could be
deleted.

---

## Writer Prompt Gap List

These are concrete patterns that the winners demonstrate but that
`track2_rewrite_writer.wf.js` does not currently enforce. Each is a
one-line addition to the DEPTH=FULL section or the HARD RULES that would
close the gap.

1. **Early-answer sentence for yes/no queries:** "If the H1 poses a yes/no
   question, the first sentence or a summary-box must give the answer
   (yes/no, with the key distinguishing condition) before any prose context."

2. **Intermediate-step arithmetic in body prose:** "Worked examples must show
   every arithmetic step in the body (not only in FAQ answers), including
   intermediate totals, band-stacking splits, and the final figure in plain
   English. A formula without a numeric walkthrough does not satisfy this
   requirement."

3. **Date band on every rate statement:** "Every rate or threshold must be
   written with its operative date band (e.g. '14% from 1 April 2026,
   reduced from 18%'), not stated as a bare number. Where a change is enacted
   law, state the Finance Act, section and Royal Assent date."

4. **Inline statute hyperlinks in body prose:** "Each statute citation must
   appear as a live hyperlink to legislation.gov.uk or gov.uk in the body at
   the point the claim is made, not only in a sources list or FAQ."

5. **Self-contained FAQ answers:** "Each FAQ answer must fully resolve the
   question without cross-referencing other answers or telling the reader to
   see another section. Include the relevant rate, statute or deadline
   directly in the answer."

6. **Conclusion replaced by a next-step link:** "The final section must not
   restate the page's contents. It must either pose the most likely follow-on
   question the user has after reading (and link to the sibling that answers
   it) or name a concrete next step. Restate-only summaries are prohibited."

7. **Anti-pattern prohibition in HARD RULES:** "Do not use keyword-stuffed
   bold repeats (bolding the primary query phrase in multiple sections),
   source-driven digressions (leading with historical legislative background
   before the current rule), or generic listicle framing ('N things to know
   about X'). These are the structural signatures of pre-rewrite underperforming
   pages."
