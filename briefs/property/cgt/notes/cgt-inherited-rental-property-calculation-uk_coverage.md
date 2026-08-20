# Coverage note: /blog/capital-gains-tax/cgt-inherited-rental-property-calculation-uk

Written 2026-08-20. Grade EXTEND-GOOGLE, additive only. Pack: `briefs/property/cgt/packs/PACK_blog_capital-gains-tax_cgt-inherited-rental-property-calculation-uk.md`.

## What changed

- 5 new question-form H2 sections inserted between the intro and the first existing H2 (`The death-uplift: TCGA 1992 s.62 in plain terms`). Plain-language layer above the depth, per DOSSIER §6.
- 5 new FAQ entries appended to the end of the existing `faqs` list.
- `dateModified` 2026-05-24 to 2026-08-20.
- Nothing else touched. `git diff --numstat` = 80 added / 1 removed, and the single removed line is the old `dateModified`. metaTitle, H1, all 16 existing H2s (order intact), all existing body prose and all 13 existing FAQ entries are byte-identical.

New sections, in page order:

1. `Do you pay capital gains tax on inherited property?`
2. `Is there capital gains tax on death, and does a deceased estate pay it?`
3. `What capital gains tax do you pay on a house inherited from your parents?`
4. `How much capital gains tax will you pay when selling an inherited property?`
5. `What if the property sells for more than the probate value?`

New FAQs: `Is capital gains tax payable on an inherited property?` / `How much capital gains tax will I pay when selling an inherited property?` / `Do I pay capital gains tax on a house inherited from my parents?` / `Does a deceased estate pay capital gains tax?` / `What happens if an inherited property sells for more than the probate value?`

Words added: **1,263** in the new body sections, plus ~430 in the 5 new FAQ answers. Page moves from 3,872 to roughly 5,100 words. No existing depth traded away (all §6 whitespace sections KEPT untouched).

## Language spec compliance (DOSSIER §6)

| Measure | Target | New sections |
|---|---|---|
| Question-form H2s | raise | 5 of 5 |
| you/your per 1,000 words | 25+ | **47.5** |
| Statute refs in new sections | near zero | 0 |
| Answer-first opening sentence | required | 5 of 5, each with the number |
| Em-dashes | none | 0 (verified) |
| Current year | 2026/27 | 2026/27 rates and £3,000 AEA only |

## Keyword placements (section 3, all rows are vol >= 50)

Single-domain cluster (ukpropertyaccountants only, captcha stub), so the >= 2 domains half of the test does not apply; volume >= 50 test applied alone per instruction.

**Placed verbatim (5, post-QA):**

| keyword | vol | where |
|---|---|---|
| capital gains tax on inherited property | 1000 | H2 1 heading |
| do you pay capital gains tax on inherited property | 390 | H2 1 heading, verbatim |
| cgt on inherited property | 210 | H2 4 reporting sentence |
| cgt for deceased estates | 90 | H2 2 body ("CGT for deceased estates also runs on a shorter clock") |
| is capital gains tax payable on an inherited property | 50 | new FAQ heading, verbatim |

**Withdrawn at editorial QA (5), semantic coverage retained.** These were placed in the first draft and removed by EDITORIAL_batch2 blockers 2.1, 2.2, 2.3 and advisory 2.6 as keyword-carrying prose. The heading or FAQ named still carries the intent; the literal string is gone by editorial decision, not by oversight.

| keyword | vol | removed from | replaced by |
|---|---|---|---|
| capital gains on inherited property | 1000 | deleted restatement paragraph (2.3) | H2 1 body, which already stated the same fact twice |
| cgt and death | 260 | "CGT and death interact in one direction only" (2.7) | "Death resets the value; it does not create a charge" in H2 2 |
| inherited house capital gains tax | 110 | noun-pile sentence in H2 3 (2.1) | "The question people ask most is whether their parents' years of ownership count" |
| inherited house capital gains | 110 | same sentence (2.1) | as above |
| deceased estate cgt | 90 | "Deceased estate CGT therefore has a narrow footprint" (2.2) | preceding sentence, which carries "CGT for deceased estates" |

**Placed semantically, verbatim string declined at draft (18).** Every one of these is a word-order permutation, a first-person restatement, or a keyword-tool concatenation of a phrase already placed above. Forcing the literal string would have produced ungrammatical copy, which DOSSIER §6 rules out ("do not copy: fluff, stuffing"). Each is carried by the heading or FAQ named:

| keyword | vol | carried by | why the literal string was declined |
|---|---|---|---|
| cgt on property inherited | 1000 | H2 1 + H2 4 | ungrammatical concatenation; no natural English sentence contains it |
| inherited property and capital gains tax | 1000 | H2 1 | tool-joined pair, both terms adjacent in H2 1 opening |
| inherited property capital gains | 1000 | H2 1 body | permutation of the placed "capital gains on inherited property" |
| inherited property cgt | 1000 | H2 1, H2 4 | permutation of the placed "cgt on inherited property" |
| inheriting a house from your parents uk capital gains tax | 260 | H2 3 + FAQ 3 | 9-word tool string; H2 3 carries every component in searcher order |
| do i pay capital gains on inherited property | 140 | H2 1 + FAQ 1 | first-person mirror of the placed second-person H2; house voice is second person |
| do i pay capital gains tax on an inherited property | 140 | H2 1 + FAQ 1 | same, first-person mirror |
| cgt on inherited property uk | 110 | H2 1, H2 4 | "in the UK" is the natural form; bare "uk" suffix is tool syntax |
| capital gains tax on inheritance property uk | 110 | H2 1 | "inheritance property" is not English; covered by "inherited property" |
| capital gains on inherited property uk | 110 | H2 1 body | as above, bare "uk" suffix |
| inherit house capital gains tax | 110 | H2 3 | verb-stem permutation of the placed "inherited house capital gains tax" |
| capital gains tax on inherited property uk | 110 | H2 1 | bare "uk" suffix on a placed phrase |
| deceased estate capital gains tax | 90 | H2 2 heading + FAQ 4 | H2 2 asks "does a deceased estate pay it"; the placed "deceased estate CGT" is the same phrase in house abbreviation |
| deceased estate and cgt | 90 | H2 2 | tool-joined pair; both terms adjacent in H2 2 |
| is capital gains tax paid on inherited property | 50 | FAQ 1 | passive permutation of the placed "is capital gains tax payable on an inherited property" |
| is capital gains tax payable on inherited property | 50 | FAQ 1 | same phrase minus the article; article-dropped form reads wrong |
| selling an inherited property capital gains tax | 50 | H2 4 heading + FAQ 2 | noun-phrase concatenation; H2 4 carries all terms in order |
| selling inherited property capital gains tax | 50 | H2 4 heading + FAQ 2 | as above |

Result: 28 of 28 section-3 keywords decided. 5 verbatim, 5 withdrawn at QA, 18 declined at draft, all 23 non-verbatim ones semantically carried by a named heading or FAQ.

## Equity preservation (pack §2)

GSC returned zero named queries (all under the anonymisation floor), so the Bing register is the only per-query view. All 10 Bing queries still match: the s.62 / TCGA 1992 s.62 / section 62 family is untouched in the existing H2 and body (the additive layer sits above it and removed nothing); "did you have to pay cgt on an inherited rental property upon sale" and "i inherited a flat which i now rent out will i pay tax on it when i sell it" now match both the original worked examples and the new H2 4. "can rental income inherited be off set against previous years tax liabiliity" still matches the existing administration-income FAQ. Page totals protected because nothing was deleted or reworded.

## Competitor themes (pack §4)

The only cluster URL is `ukpropertyaccountants.co.uk/cgt-on-inherited-property/`, which serves an HTTP 202 captcha stub. No teardown exists, so there are zero heading themes to adjudicate. Recorded here so the "zero undecided heading themes" gate closes on the record rather than by omission. Declined themes are therefore nil by absence of data, not by judgment.

## QA pass 2026-08-20 (EDITORIAL_batch2 page 2, FACTUAL_reliefs-family page 2)

Factual verdict was **all_clear** (0 blockers, 3 advisories). Editorial verdict was **must_fix** (4 blockers, 5 advisories). All four editorial blockers applied, plus five advisories, plus the two factual advisories that apply to this page.

**Editorial blockers (all applied):**

- **2.1 noun-pile keyword sentence.** "The inherited house capital gains tax question people ask most..." rewritten to "The question people ask most is whether their parents' years of ownership count. They do not."
- **2.2 two keyword variants back to back.** Second sentence ("Deceased estate CGT therefore has a narrow footprint...") deleted; first kept.
- **2.3 restatement paragraph.** The "Capital gains on inherited property are measured from the date-of-death value" paragraph deleted; the H2 1 lead-in trimmed to "So this is a question about a future sale, not about the estate in front of you today."
- **2.4 reporting answered twice.** The new four-sentence reporting paragraph cut to one sentence that points down the page to the existing "60-day CGT on UK property reporting rule, correctly stated" section. The third link to the deadlines guide is gone (page now links there twice, both pre-existing plus one).

**Editorial advisories applied:** 2.5 (pointers added to the AEA-sequencing table and capital-loss section), 2.6 (tacked-on keyword sentence deleted, phrase folded into the working reporting sentence), 2.7 ("CGT and death interact" rewritten to "Death resets the value; it does not create a charge"), 2.8 (parents section converted from bullets to prose so the block is no longer four identical shapes), 2.9 (the added executor-guide link at line 95 dropped; page down from four links to three, all pre-existing plus none added).

**Cross-page items applied:** X.1 numbered-preamble construction thinned to one in this copy ("Two numbers decide your bill:" kept; "three points shape what the estate pays:" replaced by a straight lead-in). X.2 aphoristic imperative closer removed ("Get the loss on the right tax return, because a loss sitting with the wrong person is a loss nobody can use"). X.3 "biggest lever you have as an executor" reworded to drop the metaphor shared with the shares page. X.4 the parents FAQ rewritten so it no longer mirrors the body sentence.

**Factual advisories (verified at source before applying, not taken on the reviewer's word):**

- **Advisory 1, deceased's losses.** Verified TCGA 1992 s.62(2) at legislation.gov.uk: losses of the year of death are deducted from gains of "the 3 years of assessment preceding" the year of death, later years first. "They end at death" replaced with the carry-back, in the body bullet and in the deceased-estate FAQ.
- **Advisory 2, sale below probate value.** Verified IHTA 1984 s.191 and TCGA 1992 s.274 at legislation.gov.uk. **The reviewer's "four years" is wrong on the sale window:** s.191(1)(a) requires the sale by the appropriate person "within the period of three years immediately following the date of the death"; the four-year figure in s.191(1A) is the deadline for making the claim, not the sale window. Copy therefore says three years. s.274 confirms the ascertained IHT value becomes the CGT market value at death, which is what removes the CGT loss. Applied to the body paragraph and the matching FAQ, with no statute cited in the plain-language copy.
- **Advisory 3, "probate value" used flatly.** Not applied: outside the scope the coordinator set for this pass, and the section opening already hedges ("the open-market value of the property on the date the person died, which is normally the figure used for probate"). Left on the record for the next edit to this page.
- **Garden/grounds half-hectare advisory:** does not apply here. This page does not mention hectares or the permitted area (checked: zero occurrences); that advisory belongs to the PRR page.

**Gate outputs after the fixes:**

- `python scripts/sdlt_equity_gate.py --cluster cgt --baseline HEAD` = `EQUITY GATE: all packs pass (equity coverage, protected elements, ledger balance)`.
- `python scripts/voice_scan.py --site property --slug cgt-inherited-rental-property-calculation-uk --gate --gate-band minor` = **robot_score 26.5, band MINOR, exit 0** (was 41.5 / ROBOTIC before the last two fixes). S4 em-dashes 0, S5 signposting 0, S7 americanisms 0. Two flags remain and both sit in protected pre-existing copy: S2 "This page walks the calculation in detail" (intro) and S3 "Our companion pages walk those angles in detail" (closing section). S6 length (4,482 body words against a 2,200 ideal) is structural on an EXTEND page and cannot be fixed without deleting protected copy.
- Diff is still additive: 73 added, 2 removed, and the two removed lines are the old `dateModified` and `reviewedAt`.
- Post-QA new body copy: 1,186 words, 43.0 "you/your" per 1,000, zero em-dashes, one numbered-list preamble.

## Facts declined (could not be verified against house positions)

- **IHT loss-on-sale relief.** Declined at draft for want of a house-positions entry; **now applied** after source verification at the QA pass (see above), with the sale window stated as three years, not the reviewer's four. `house_positions.md` §5, §9 and §39 still do not carry IHTA 1984 s.191 or TCGA 1992 s.274. Recommend a §39 addition, because the CGT cluster will keep meeting this and the next writer should not have to re-verify it.
- **Capital-loss claim time limit (four years from the end of the tax year).** General CGT law, not in §5 or §39. Written as "report it so you can carry forward anything unused" with no number attached.
- **PR rate provenance.** §39 warns not to assert 24 per cent for PRs "from Oct 2024" without checking FA 2025 commencement. New sections state the PR rate as current 2026/27 fact only ("the estate's rate on residential property is 24 per cent throughout"), never with a start date. §5 supports the current-year statement.

## Sibling page discipline

`/blog/capital-gains-tax/cgt-on-inherited-property-uk-probate-base-cost` owns probate base-cost mechanics. The new sections link to it twice (H2 1 close, H2 5 body) and deliberately do not restate its s.62 framework, its valuation walkthrough or its worked examples. Other new internal links: executor step-by-step guide (H2 2), private residence relief guide (H2 3), 60-day payment deadlines guide (H2 4).

## Arithmetic check (new worked figures, H2 4)

Probate value £280,000; sale £310,000; costs £6,000. £310,000 − £6,000 = £304,000. £304,000 − £280,000 = £24,000. £24,000 − £3,000 AEA = £21,000. £21,000 x 24% = £5,040. £21,000 x 18% = £3,780. Both verified. Rates and AEA per house positions §5.
