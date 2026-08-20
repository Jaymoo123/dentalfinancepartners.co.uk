# Coverage note: capital-gains-tax-second-home-sale

Written 2026-08-20. Brief: `briefs/property/cgt/netnew/BRIEF_capital-gains-tax-second-home-sale.md`.
File: `Property/web/content/blog/capital-gains-tax-second-home-sale.md`. Not committed, not deployed.

**Revision 2, 2026-08-20**, after editorial QA (`qa/EDITORIAL_batch1.md` page 3, verdict
must_fix) and factual QA (`qa/FACTUAL_netnew-calculator.md` section 2, verdict all_clear with
2 advisories). Section "QA response" at the foot records what changed and why the verbatim
keyword count fell from 31 to 22.

## Six-check floor

| Check | Target | Actual |
|---|---|---|
| Body words (raw HTML, frontmatter excluded) | 2,800-3,500 | 3,394 |
| FAQs | 10-14 | 14 |
| metaTitle | <= 62 chars | 58 |
| metaDescription | <= 158 chars | 152 |
| Em-dashes / en-dashes | 0 | 0 / 0 |
| Internal links resolve | all | 9/9 verified |

## Gate outputs (revision 2)

- `python scripts/voice_scan.py --slug capital-gains-tax-second-home-sale --site property`
  -> **robot_score 5.9, band CLEAN**. S2 meta-commentary 0, S3 0, S4 em-dashes 0, S5 0,
  S7 0. S1 abstract-noun 2 hits, both the word "owner" inside the worked example, which is
  the transaction party rather than a "the landlord" abstraction. S6 length is 48% over the
  scanner's 2,200-word ideal, which the brief's own 2,800-3,500 window requires.
- `python scripts/sdlt_equity_gate.py --cluster cgt --baseline HEAD` -> see the QA response
  section for the run output.

## Language spec (DOSSIER §6)

| Measure | Cluster target | Actual |
|---|---|---|
| you/your per 1,000 words | 25+ | 41.0 |
| Question-form headings | raise above 31.5% | 10 of 12 H2s (83%) |
| Statute refs per 1,000 words | near zero above the fold | 1.2, all in the penultimate section |
| Tax years named | one current year | 2026/27 only |
| Enumeration openers ("N things:") | at most one per page | 1 ("Three conditions matter in practice") |

Statute placement: TCGA 1992 ss.222-226 and s.58 appear once each, in "The statutory
backdrop, briefly", the second-to-last H2. No statute above the worked example.

## Internal links used (all verified to resolve)

- `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` (intro, general guide)
- `/blog/capital-gains-tax/capital-gains-tax-property-sale-uk-2026-rates-allowances` (28% correction)
- `/blog/capital-gains-tax/cgt-main-residence-election-two-properties` (election mechanics, not restated)
- `/blog/capital-gains-tax/principal-private-residence-relief-landlords` (PRR depth)
- `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026` (60-day depth)
- `/blog/capital-gains-tax/letting-relief-landlords-2026-changes` (letting relief guard)
- `/blog/capital-gains-tax/cgt-property-sold-loss-claim-capital-losses` (losses)
- `/calculators/capital-gains-tax-calculator` (prominent, in the worked example)
- `/blog/property-types-and-specialist-tax/how-owning-property-abroad-leads-higher-stamp-duty-rates` (one SDLT line only)

Calculator route verified against `src/lib/calculators/registry.ts` (generic tool
`capital-gains-tax-calculator`, rendered by `/calculators/[slug]`). Blog targets verified by
canonical in each source file.

## Keywords placed

45 keywords in the `capital-gains-tax-second-home-sale` section, all vol >= 50, so all in
scope. 22 placed verbatim (8,560 of 14,580 cluster volume). 23 declined.

### Placed verbatim (22)

| Keyword | Vol | Where |
|---|---|---|
| capital gains on second home | 880 | body, "capital gains on second home sales" |
| cgt on second homes | 880 | devolution section body |
| capital gains tax second home | 880 | H3 sub-heading (via "second home sale") |
| cgt on second property | 880 | "what counts" section, "no reduced rate of CGT on second property" |
| capital gains on second property | 880 | FAQ 13 question ("capital gains on second property disposals") |
| capital gains tax on second house | 880 | FAQ 3 question |
| capital gains tax on second home | 480 | metaTitle ("Capital Gains Tax on Second Homes") |
| capital gains tax on secondary home | 480 | FAQ 3 answer |
| how to avoid capital gains tax on a second property | 260 | FAQ 4 question |
| how to avoid capital gains tax on second property | 260 | myths H2 section lead |
| capital gains when selling a second home | 210 | H2 |
| selling a second home capital gains tax | 210 | H3 |
| selling a second home capital gains | 210 | H3 |
| capital gains tax on selling a second home | 210 | intro paragraph 2 |
| capital gains tax on the sale of a second home | 140 | FAQ 3 answer |
| capital gains on second home sale | 140 | "how do you work out" section body |
| how much capital gains tax on a second property | 140 | H2 |
| how much is capital gains tax on a second property | 140 | FAQ 1 question |
| uk capital gains tax on second homes | 110 | devolution H2 |
| cgt on second homes uk | 110 | devolution section body ("CGT on second homes UK-wide") |
| capital gains tax when selling a second property | 90 | "how do you work out" section body |
| capital gains tax second home sale | 90 | H3 |

### Declined (23, 6,020 vol)

Nine of these were placed in revision 1 and removed on QA instruction; the reference is given
against each. The remaining fourteen are word-order inversions or SEO abbreviations of a
phrase already placed verbatim, where forcing the exact string produces ungrammatical prose.

| Keyword | Vol | Reason |
|---|---|---|
| second homes and capital gains tax | 880 | Removed per QA BLOCKER 3.3: the placement was the heading keyword re-inserted as the section's opening clause, the most recognisable generated-copy move on the page |
| cgt second homes | 880 | No grammatical English sentence carries it; "CGT on second homes" is placed |
| capital gains tax second property | 880 | Removed per QA ADVISORY 3.5: the carrier sentence repeated the sentence before it with a keyword attached |
| capital gains 2nd home | 480 | "2nd" is a search abbreviation, not prose; QA ADVISORY 3.5 cut the synonym list that carried it |
| how to avoid capital gains tax on second homes uk | 390 | Removed per QA BLOCKER 3.2: only parsed with "-wide" appended, which was the graft the reviewer named |
| how to avoid cgt on second property | 260 | Removed per QA BLOCKER 3.1: three "how to avoid" variants sat in three consecutive sentences. Two placements kept, spread across body and FAQ; the third was the one that made the pattern visible |
| selling 2nd home capital gains | 210 | Abbreviation plus inverted noun order |
| selling second home capital gains | 210 | Inversion; "capital gains when selling a second home" is an H2 |
| capital gains selling second home | 210 | Inversion of the same H2 |
| sell second home capital gains tax | 210 | Inversion; the H3 carries "selling a second home: capital gains tax" |
| selling a second home and capital gains tax | 210 | Conjunction inversion |
| second home sale capital gains | 140 | Inversion; "capital gains on second home sale" is placed |
| how much is capital gains tax on second property | 140 | The "is ... on second property" form is ungrammatical; both "a second property" variants are placed |
| how much capital gains tax on second property | 140 | Removed per QA BLOCKER 3.3: it was the H2 echoed back as an ungrammatical noun phrase |
| capital gains tax on sale of second home | 140 | Articleless variant; "on the sale of a second home" is placed in FAQ 3 |
| capital gains tax on second homes uk | 110 | Removed per QA BLOCKER 3.2: the FAQ question needed a fourth "UK-wide" to carry it |
| selling second property capital gains tax | 90 | Inversion; "capital gains tax when selling a second property" is placed |
| capital gains tax on second home sale | 90 | Removed per QA ADVISORY 3.6: natural English is "on a second home sale", which the heading and FAQ 5 now use |
| capital gains tax on second home sales | 90 | Removed per QA ADVISORY 3.6: the plural existed only to match the query |
| capital gains tax for second home sale | 90 | "for" inversion; "on a second home sale" is placed |
| how to reduce capital gains tax on property uk | 70 | Removed per QA BLOCKER 3.2: only parsed as "on property UK-wide" |
| second property capital gains tax uk | 50 | Full inversion, no natural sentence |
| sale of second property capital gains tax | 50 | Full inversion, no natural sentence |

The nine QA-driven declines cost 2,070 vol. That is the correct trade: the reviewer's point
was that once a reader notices the grafting device they see it everywhere, which costs more
than the phrase match is worth.

## Facts and arithmetic

All figures trace to `docs/property/house_positions.md` §5 (AEA £3,000, residential 18%/24%,
60-day report-and-pay where tax is due, PRR final 9 months, letting relief shared-occupation
only since April 2020, spouse transfers no-gain-no-loss under s.58), §21.4 for the 2026/27
personal allowance (£12,570) and higher-rate threshold (£50,270, so a £37,700 basic rate
band), and §1 for the additional dwellings surcharge dates.

Worked example (revision 2 figures; revision 1 collided with the pillar page on purchase
price and skeleton, QA BLOCKER X.4). Checked to the penny:

- Net proceeds 455,000 - 8,700 = 446,300
- Gain 446,300 - 212,000 - 3,300 - 31,000 = 200,000
- Taxable 200,000 - 3,000 = 197,000
- Band: 42,000 - 12,570 = 29,430 income; 37,700 - 29,430 = 8,270 unused
- 8,270 x 18% = 1,488.60; 188,730 x 24% = 45,295.20; total 46,783.80
- Effective rate 46,783.80 / 200,000 = 23.392%, quoted as 23.4%
- No-band variant (£55,000 salary): 197,000 x 24% = 47,280

PRR variant: 49/200 months = 24.5%; 200,000 x 24.5% = 49,000; 151,000 - 3,000 = 148,000;
8,270 x 18% + 139,730 x 24% = 1,488.60 + 33,535.20 = 35,023.80; saving 11,760.00, which
cross-checks exactly against the relieved gain (49,000 x 24% = 11,760, all of it in the 24%
slice).

Joint variant: 100,000 each. Higher earner 97,000 taxable: 1,488.60 + 21,295.20 = 22,783.80.
Lower earner (£20,000 income, 30,270 unused band) 97,000 taxable: 5,448.60 + 16,015.20 =
21,463.80. Combined 44,247.60; saving 2,536.20, which reconciles exactly to the second AEA
(3,000 x 24% = 720) plus the extra basic band (30,270 x 6pp = 1,816.20).

Smaller checks: 31,000 x 24% = 7,440; 12,500 band extension x 6pp = 750; 30,000 loss x 24%
= 7,200; six months plus nine months over 15 years = 8.33%, written as "about 8%".

Prose now rounds ("a shade under £46,800", "nearly twelve thousand pounds", "about £2,500")
and the tables keep the pence, per QA ADVISORY 3.7.

## Purchase dated to fix the SDLT-history advisory

FACTUAL ADVISORY 1 noted that revision 1's acquisition costs were only arithmetically
possible on a pre-2016 purchase, which sat oddly against a flat "5% surcharge" claim two
sections earlier. Both ends are now fixed:

- The example states the purchase date, January 2010, which is also what makes the 200-month
  ownership in the PRR variant land in September 2026. £3,300 of SDLT, legal and survey on a
  £212,000 January 2010 purchase is consistent (1% SDLT = £2,120, plus £1,180 legal and
  survey), and no additional dwellings surcharge existed then.
- The surcharge is now stated with its history: 5% since 31 October 2024, 3% from April 2016,
  nil before that. This clears the §1 do-not-write ("the additional dwellings surcharge is
  3%") because the current rate is stated as 5% and 3% is explicitly historical.
- FACTUAL ADVISORY 2: SDLT is now expanded at first use, "the Stamp Duty Land Tax (SDLT) you
  paid including any surcharge".

## Traps observed

- "CGT rate is 28%" never asserted. The only appearance of 28% is the explicit correction
  that the figure is out of date.
- Letting relief stated as shared-occupation only since April 2020, not overstated.
- Election mechanics pointed to `cgt-main-residence-election-two-properties`, not restated.
- SDLT held to one paragraph plus the abroad link; no SDLT surcharge coverage.
- 60-day return correctly limited to "where tax is due" for UK residents, with the
  non-resident every-disposal rule stated separately.
- Hold-over relief on a transfer into trust described as deferral, not elimination.
- Exchange vs completion kept straight in all three places it appears: the gain falls into
  the tax year of exchange (TCGA 1992 s.28), the 60-day clock runs from completion, and a
  spousal transfer must complete before exchange.
- No pricing, no fees, no client names anywhere on the page.

## QA response, revision 2

| QA item | Status |
|---|---|
| BLOCKER 3.1, three "how to avoid" in three sentences | Fixed. Opener rewritten to one placement; the FAQ keeps a second, far from it |
| BLOCKER 3.2, "UK-wide" as a grafting device x4 | Fixed. One use left, in the devolution section where it is the subject |
| BLOCKER 3.3, heading echoed as an ungrammatical sentence | Fixed. Worked-example opener rewritten; the same pattern at the "what counts" and PRR openers also rewritten |
| BLOCKER 3.4, the lever sentence used twice | Fixed. The aside now sells the computation; the closing section owns the exchange point |
| ADVISORY 3.5, synonym list and the trailing keyword sentence | Fixed. "2nd home" cut, the repeat sentence deleted |
| ADVISORY 3.6, plural-for-keyword heading | Fixed. Singularised to "a second home sale" |
| ADVISORY 3.7, pence-level precision in prose | Fixed. Tables keep pence, prose rounds |
| ADVISORY 3.8, house style | Fixed. "Self Assessment" capitalised (4), worn-out / 15-year-old / seven-year / ten-year / two-year hyphenated, aside moved to the impersonal house voice used by the two EXTEND pages |
| ADVISORY 3.9, penalty framing vs the pillar | Not changed here. This page states §5 verbatim (£100 fixed, £10/day from day 91, 5% at 6 and 12 months) and the factual track confirmed it. The pillar's "starts at £100 from day 61" is the side that needs adjudication |
| X.1, enumeration openers | Fixed. Six reduced to one |
| X.2, "Two things people..." twin of the PRR page | Fixed. Rewritten as continuous prose |
| X.3, mortgage misunderstanding twice | No change here. QA directed keeping this page's version and cutting the pillar's |
| X.4, shared worked example and skeleton | Fixed on this side. Purchase £180,000 to £212,000, sale £395,000 to £455,000, gain £179,000 to £200,000, and every derived figure re-derived |
| X.5, "check the date on anything you read" twice | Fixed on this side. Cut from the letting-relief FAQ; the body's "whatever an older article told you" remains as the single instance here |
| FACTUAL ADVISORY 1, surcharge history | Fixed, see above |
| FACTUAL ADVISORY 2, SDLT undefined at first use | Fixed, see above |

Editorially unchanged and deliberately so: the voice QA praised ("A fortnight with a mattress
in an empty flat is not a residence", "It converts one tax bill into three", "which is a quiet
and common way to give money away", "Anyone promising more than that is selling you
something") is all still there.

## Omitted as unverifiable

None. Two supporting statements are stated qualitatively rather than with a number because
house positions does not carry a locked figure for them:

1. HMRC data matching on property disposals is described as routine, without a claimed match
   rate or campaign name.
2. The "quality of occupation" indicators (post, electoral roll, GP registration, utility
   bills) are described as what HMRC looks for, without citing a manual reference, because
   the point is evidential practice rather than a statutory test.
