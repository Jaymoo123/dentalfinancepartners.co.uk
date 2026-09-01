# SPV / Property Limited Company — Long-Tail Question Corpus

Source: Google Autocomplete (UK, `hl=en-GB&gl=uk`), same endpoint/pattern as
`generalist/pipeline/autocomplete_expand.py` (Serper UK returns no PAA).
Pass 1: 14 seed stems. Pass 2 (follow-up): 22 more seed stems targeting the
three thin buckets flagged after pass 1 (extraction, selling/closing,
non-resident) plus costs+fees. Both passes use question-prefix
(can/do/does/how/what/when/should/is/who/why) + a-z suffix expansion.
Zero-volume questions kept by design (coverage over selection).

Pass 1 raw: 1,978. Pass 2 raw: 226. Combined after noise filter (foreign-
language SPV senses, SPV3 the game, rabbit/HPV virus, US REIT stock-ticker
dividend/share-price noise, Companies-House name-lookup noise) + signal
filter (must mention SPV/property/company/tax context) + dedupe: **1,700**.

## Counts per bucket

| Bucket | Count | Pass 1 | Pass 2 delta |
|---|---|---|---|
| misc | 694 | 664 | +30 |
| SIC+Companies House admin | 421 | 421 | +0 |
| tax in company | 141 | 141 | +0 |
| mortgages+lending | 131 | 128 | +3 |
| transfer-in (CGT, SDLT, s162) | 91 | 83 | +8 |
| selling+closing | 75 | 70 | +5 |
| ownership structures (spouse, kids, trusts, holding co, JV) | 41 | 40 | +1 |
| formation mechanics | 40 | 33 | +7 |
| extracting money (dividends, loans, salary) | 30 | 1 | +29 |
| non-resident | 27 | 0 | +27 |
| costs+fees | 9 | 10 | +-1 |

## misc (694)

- access links property company limited
- accountant for limited company buy to let
- amal property co ltd thailand
- are business property taxes deductible
- are company dividends classed as income
- are company dividends taxable
- are limited company buy to let regulated
- are sic codes international
- as a landlord should i be a limited company
- benefits of a limited company for property

## SIC+Companies House admin (421)

- a registered office
- can i add another sic code
- can i add sic code companies house
- can i change company sic code
- can i change my sic code
- can i change registered office address
- can i change sic code
- can i change sic code companies house
- can i change the sic code of my company
- can my registered office be my home

## tax in company (141)

- best property tax grievance company
- best property tax grievance company long island
- best property tax grievance company long island reviews
- business property inheritance tax relief
- business property tax alameda county
- business property tax bill
- business property tax deduction
- business property tax depreciation
- business property tax due
- business property tax due date

## mortgages+lending (131)

- accord limited company buy to let
- aldermore limited company buy to let rates
- barclays limited company buy to let
- barclays limited company buy to let rates
- barclays spv mortgage
- best limited company buy to let mortgage rates uk
- best spv mortgage rates
- business property tax rate
- buy to let mortgage limited company vs personal
- buying property through a limited company mortgage

## transfer-in (CGT, SDLT, s162) (91)

- buy to let stamp duty calculator limited company gov uk
- buying property limited company stamp duty
- buying property through a limited company uk stamp duty
- can i transfer my property to a limited company
- can i transfer my property to a ltd company
- can i transfer my property to limited company
- can i transfer my rental property to a limited company
- can i transfer my residential property to a limited company
- can i transfer property from limited company to individual
- can i transfer property from personal to limited company

## selling+closing (75)

- can company sell property to director
- can i sell assets to my company
- can i sell my company property to myself
- can i sell my house to my business
- can i sell my house to my corporation
- can i sell my house to my holding company
- can i sell my house to my limited company
- can i sell my house to my property company
- can i sell my personal property to my company
- can i sell my property to my company

## ownership structures (spouse, kids, trusts, holding co, JV) (41)

- buy property through limited company or personally
- buy property through limited company or personally uk
- buy to let mortgage via limited company
- buy to let purchase via limited company
- buy to let through limited company
- buy to let through limited company or personal
- buy to let under limited company
- buy to let via limited company
- buy to let.property via limited company
- buying property in limited company

## formation mechanics (40)

- business property tax form
- business property tax form 571 l
- cost to set up an spv
- cost to set up spv
- how much does it cost to set up an spv
- how much does it cost to set up spv
- how spv is formed
- how to form spv company in india
- how to open spv company
- how to set up limited company for buy to let

## extracting money (dividends, loans, salary) (30)

- best way to take money out of limited company
- can a director loan money to his company
- can a director take money out of a limited company
- can i take money out of limited company
- can i take money out of my company
- can i take money out of my limited company
- can you take money out of a limited company
- can you take money out of limited company
- director loan to buy property
- directors loan account example

## non-resident (27)

- buying uk property with offshore company
- can an offshore company buy property in uk
- can an offshore company own property in the uk
- can offshore company own property uk
- holding uk property in an offshore company
- how to register as a non resident landlord
- list of offshore companies in uk
- non resident landlord application for company
- non resident landlord company
- non resident landlord company corporation tax

## costs+fees (9)

- cost of transferring property to limited company
- cost of transferring property to limited company calculator
- cost of transferring property to ltd company
- cost to transfer property to limited company
- cost to transfer property to ltd company
- how much does it cost to transfer property to limited company
- is property management fee tax deductible
- transfer property to limited company cost
- what is a setup fee

## Coverage note (honest, updated after follow-up pass)

Targeted re-seeding worked for two of the three flagged buckets and confirmed the third is a real gap, not a filter artefact:

- **Extraction (dividends/loans/salary): 1 -> 30.** Genuinely under-seeded in pass 1, not autocomplete-blind — "spv dividend", "pay yourself from property company" and "take money out of limited company" all returned real completions once asked directly (registration, corporation tax, scheme number). Direct seeding fixed it.

- **Costs+fees: 10 -> 9 (net -1 after REIT noise cleanup).** Still thin despite four new dedicated seeds ("cost to set up spv", "spv accountant fees", "limited company landlord costs", "spv running costs"). This bucket looks genuinely autocomplete-blind: people don't appear to type "cost" queries about SPVs in a stable, repeated way Google surfaces as completions — the seeds mostly returned unrelated "how much does X cost" completions (car servicing, EV charging, S-corp) rather than property-SPV-specific ones. A volume-blind harvest via a different source (e.g. Reddit/forum scraping or a direct GSC query pull once a landing page exists) would likely do better than more autocomplete seeding here.

- **Non-resident: 0 -> 27.** Was entirely missing in pass 1 because no seed touched it, not because it's a dead topic — "non resident landlord company" and "non resident landlord scheme" returned a dense, coherent cluster (registration, scheme number, corporation tax) on the first direct seed. Genuinely real demand, was just unseeded, now fixed.

Also cleaned 20 rows of US-REIT stock-ticker noise ("simon property group dividend history", "spv global trading ltd share price") that the dividend/cost seeds pulled in — same "ambiguous short seed drags in an unrelated sense of the word" failure mode as the bare "spv" seed in pass 1.

Selling+closing (70->75) and formation mechanics (33->40) moved only slightly on dedicated re-seeds — both were already reasonably well covered in pass 1 via shared prefix/suffix overlap with other seeds, so the marginal gain from fresh seeds was small. Treat corpus as good first-and-second-pass coverage; costs+fees remains the one bucket worth a non-autocomplete source if it matters for the build.
