# PACK E1: rd-tax-credits-manufacturing-incremental-improvements — REFRAME (plus near-duplicate sibling differentiation)

Derived 2026-08-25 from FROZEN dossier `../retail_product_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **pass-or-fail-test-led**). Fourth surface of the manufacturing
hub. **This pack governs two files** because the never-collapse rule requires the near-duplicate
pair to be differentiated in one place.

## 1. Targets and permission level

- **Seed A (the reframe target):** `generalist/web/content/blog/rd-tax-credits-manufacturing-incremental-improvements.md`.
  Grade **REFRAME** (dossier §5): Bing 0/0, Google 0 clicks / 6 impressions / pos 6.7. Position 6.7
  on six impressions is immature, not equity. Everything writable.
- **Seed B (the sibling):** `generalist/web/content/blog/r-and-d-tax-credit-specialist-manufacturing-incremental-improvements.md`.
  Grade **REFRAME**, but with no target set of its own. Bing 0/0, Google 0/0.
- **NEAR-DUPLICATE FLAG (dossier §5), binding:** the two titles are near identical ("Incremental
  Improvements" versus "Incremental Production Improvements"). **Keep both. Zero redirects. Zero
  collapse.** Differentiate hard, here, per the standing never-collapse rule:
  - **A takes the eligibility question**: does this particular incremental improvement qualify.
    Pass-or-fail test, conservative, reader applies it to their own project.
  - **B takes the specialist and process angle**: what a claim actually involves once you have
    decided it qualifies, who does it, what evidence is kept, what the merged scheme changed. B is
    rewritten to that scope and must share no H2 phrasing with A.
- Frozen-ground check on both slugs before edit; verify against the live `monitored_pages` table.
- Revert path: `git revert` per file.
- C1 gate: row 73, no C1 restriction. CLEAR. The binding constraint here is house-side, not C1.
- Ground truth: **§21.6** (the page-level R&D restatement rule) and the merged-scheme facts already
  locked in the house verification log.

## 2. Equity register

Effectively none. Seed A's 6 impressions at pos 6.7 are below any protection threshold and Seed B
has zero of both. **Do-not-lose:** the GSC query `r&d tax credits for manufacturers` must remain
matchable on A post-rewrite.

## 3. Market keyword slice (ledger, thin by design)

| Keyword | Vol/mo | Source | Seed |
|---|---|---|---|
| r&d tax credits for manufacturers | GSC, 15 impressions family | ours | A |

One ledger row. Dossier §2 grades the topic "thin": boutique claim firms own the generic R&D head
terms and the standing constraint means we do not compete for them. **This is a coverage and
positioning surface, not a demand play, and volume is not a gate.**

## 4. Competitor teardown (fetched 2026-08-25, free)

No dedicated manufacturing-R&D page was fetched for this pack, because the field for the generic
terms is boutique claim firms whose register we are barred from imitating and whose pages are
therefore not a model at any rank. What the cluster's fetched sample shows about R&D:

- **skynet `/manufacturing-accountant/`** (p11) sells R&D as a bullet ("maximise tax savings using
  capital allowances, R&D claims and manufacturing-specific reliefs") with **no scheme named, no
  rate, no date and no eligibility test.**
- **skynet `/common-manufacturing-accounting-issues/`** (p7-11) does not mention R&D at all.

So the specialist manufacturing field treats R&D as a selling bullet and never explains eligibility.
A conservative, genuinely useful eligibility test is unoccupied ground precisely because the
aggressive players have no incentive to publish one.

## 5. Whitespace

- **A conservative eligibility test that says no.** The advance must be in science or technology,
  and routine improvement, standard-compliance work and commercial novelty are not R&D. A page
  whose honest answer is often "probably not, and here is how to tell" is differentiated from every
  claim-firm page by construction, and is the only version of this page the house constraint allows.
- **The merged scheme stated plainly and dated**: merged RDEC at 20%, enhanced R&D intensive support
  at the 30% intensity threshold, for periods beginning on or after 1 April 2024. The specialist
  field states none of it.
- **The manufacturing-specific line that matters**: what separates a qualifying process advance from
  ordinary production tuning, worked on a concrete example.

## 6. Fences (binding, and this is the most constrained page in the wave)

- **§21.6 verbatim in substance, and the standing no-claim-farm constraint.** Permitted: merged
  RDEC 20%, the 30% intensity threshold for enhanced R&D intensive support, periods beginning on or
  after 1 April 2024. **Barred: "most manufacturers qualify", any sector-percentage teaser ("70% of
  manufacturers are missing out"), any average-claim-value figure, any eligibility-check CTA, any
  contingent-fee or claim-processing offer, any referral to a claim firm.**
- **No claim service is offered or implied.** The estate does not process R&D claims. The page
  describes the position and hands to ordinary advice.
- **Routine work is stated as not qualifying**, explicitly, in the reader's own words. If the page
  never says no to anything, it has failed the fence.
- **Sibling differentiation is a QA gate, not a preference.** A and B must share no H2 phrasing, no
  worked example and no metaTitle formula, and each must link to the other with a sentence saying
  what the other answers. Adversarial QA checks both files together.
- No house-position citations in reader copy (report only): cite the DSIT/BEIS guidelines, CIRD and
  the gov.uk R&D pages instead. No em-dashes. Rates date-tagged.

## 7. Acceptance criteria (deterministic)

1. Queries answerable on A: r&d tax credits for manufacturers (the do-not-lose query); does an
   incremental production improvement qualify for R&D; what counts as an advance in science or
   technology for a manufacturer. On B: what an R&D claim involves; what evidence HMRC expects; what
   the merged scheme changed.
2. Figures, date-tagged: merged RDEC **20%**; enhanced R&D intensive support at the **30%** intensity
   threshold; **periods beginning on or after 1 April 2024**; corporation tax 25% / 19% where a
   worked figure needs a tax rate.
3. One worked example on A showing an improvement that **fails** the test and one that passes, with
   the reasoning stated. The failing example is mandatory.
4. Structure: A follows the pass-or-fail-test lead for the opening 40%. B follows a distinct
   process shape and shares no H2 phrasing with A.
5. Links: A to B and to N3; B to A and to N3. Resolver-clean, zero invented slugs. §4 floors plus
   equity floor plus coverage floor pass on both files.
6. Adversarial QA confirms every sentence against the §21.6 permitted list and the barred list, on
   both files, and confirms zero redirects were created.

## 8. Expectation

Thin by design and judged as coverage. Realistic on A: hold and slightly broaden the existing 15
impressions, add impressions on eligibility-question phrasings; a head-term R&D ranking is neither
expected nor sought. B is a differentiation and de-duplication surface first. Maturity caveat: both
are effectively new pages, judge at 28d Bing / 90d Google. Failure trigger: the do-not-lose query
`r&d tax credits for manufacturers` unmatchable post-rewrite, or any barred phrase surviving QA.
**Standing risk:** R&D scheme parameters move often; the scheme paragraph is built as one
replaceable block for a dated back-patch.

## 9. Cannibalisation notes

| Page | Overlap | Resolution |
|---|---|---|
| Seed A versus Seed B | near-identical titles, same topic | The whole point of this pack. Split by question (eligibility) versus process (claim mechanics). Never collapse, zero redirects, QA'd together. Recorded from dossier §5. |
| `accountant-for-amazon-fba-sellers-uk.md` H2 "R&D Tax Credits for FBA Sellers" | R&D | Different trade; ecommerce wall. No link, no shared phrasing. **Both pages must satisfy the same §21.6 fence, so flag the FBA page's R&D section for a separate compliance read outside this wave.** |
| `accountant-for-shopify-stores.md` H2 "R&D Tax Credits for Shopify Stores" | R&D | Same as above: ecommerce wall, untouched, flagged for the separate §21.6 read. |
| N3 (this wave) | manufacturing R&D paragraph | N3 carries one paragraph and links here. |
