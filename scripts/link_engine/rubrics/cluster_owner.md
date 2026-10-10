# Rubric: cluster conflicts and owner pages

For the judgment agent (Opus). You decide two kinds of question for the link engine's demand map:
(a) whether two keyword families are one family, and (b) which page should own a family. You do not
write copy, change pages, or decide strategy. You return verdicts in the schema at the bottom.

## 0. Read first, in this order

1. `scripts/link_engine/sites/<site>_rulings.md`, if it exists. Owner rulings recorded there beat
   everything below, including the blueprint summary in section 3.
2. This rubric.
3. The input row you were given (a conflict row or an owner-queue row). Use only the facts in it
   and the files it names. If a fact you need is missing, lower your confidence; do not invent it.

## 1. One test for everything

Two keywords are one family if, and only if, a searcher typing either one would be satisfied by the
same page. A family has one owner page. Ask what the person wants to do next (hire someone, decide
how to structure or sell, or learn something), not which words they typed.

Never merge:
- Hire intent with explainer intent ("property accountant" vs "what does a property accountant do").
- A city form with a national form ("property accountant bristol" vs "property accountant"). Blueprint R4:
  city forms stay with city pages.
- Different audiences whose page needs differ (a non-resident landlord abroad vs a UK landlord), even if
  the SERPs overlap. Blueprint R18.

Merge freely: plurals, word order, "uk", "near me", "best", "specialist", "services", "firm", and
accountant/adviser/advisor synonyms where the SERP agrees.

## 2. Part (a): resolving a cluster conflict

Input: a row of `stages/05_cluster_conflicts.csv` (conflict_type, keyword, other_keyword,
lexical_family, serp_family, shared_urls, volumes, via, status; act only on status `open`).

- `serp_bridge`: a SERP link of 4 or more shared URLs between two families that each have volume of
  100 or more; `keyword` and `other_keyword` are their heads and `via` is the linking pair. The two are
  held apart until you rule. Verdict `merge` if one page would satisfy both; `split` if the intents differ
  (hire vs decision, adviser vs accountant where the top results are different page types, city vs
  national). Look at who ranks: if the shared URLs are generic authority pages (gov.uk, a big
  publisher) and not service pages, the overlap is weak evidence; lean `split` with medium confidence.
- `lexical_serp_split`: same words, but the SERPs share 2 or fewer URLs. Usually Google reads the
  words two ways (a service vs an article, or two meanings). Verdict `split` unless the divergent
  SERP is clearly noise.

`family_id` in your verdict is the conflict row's `lexical_family`. `owner_page` and `gap_brief`
are null. `input_sha256` is `cluster.conflict_sha(row)`: sha256 of the JSON (sorted keys, values as strings) of
`conflict_type`, `keyword`, `other_keyword`, `shared_urls`. A `merge` verdict on a `serp_bridge` joins the two
families on the next `cluster.py` run; `split` keeps them apart and stops the row reopening. For
`lexical_serp_split`, `split` makes `keyword` its own family. Rows already `resolved` need no verdict.

## 3. Part (b): choosing an owner page

Input: a row of `stages/06_owner_queue.csv`: the family, its top keywords, demand, our top GSC page,
and up to 5 candidate pages (with title and why each was chosen). The full route list is
`families.routes()`; you may pick a page not in the five if the evidence supports it.

Order of preference:
1. An existing commercial page whose primary purpose matches the searcher's hiring or decision
   need: `/services/*`, `/for/<audience>`, or `/locations/<city>`. Match on the page's primary
   purpose (its H1 and title), not on a shared word.
2. A blog guide owns a DECISION family only if no commercial page fits AND the guide already ranks
   in the top 20 for the family (our_best_position in the row). A blog never owns a HIRE family.
3. Otherwise `GAP: new page needed`, with a one-line page brief: audience, the job the page does,
   and the head keyword. Example: "Landlords in Glasgow choosing an accountant; head: property
   accountant glasgow." A city family with no `/locations/<city>` page is `GAP: city page` territory;
   use `gap` with that brief.

Blueprint rulings you must respect (`docs/property/commercial_recovery_2026-10-07/SERVICE_PAGES_BLUEPRINT_2026-10-09.md`
sections 0 to 2; the owner's, not open for re-argument):
- **R2** One owner per phrase family. `/services/property-accountant` owns property accountant(s),
  accountant(s) for property, uk property accountants, specialist property accountant, property tax
  accountant, property investment accountant, accountant for property investors (near me forms as
  coverage only). `/services/landlord-accountant` owns landlord accountant(s), accountants for
  landlords, buy to let accountant(s), landlord tax accountant, rental accountant.
  `/services/property-tax-advice` owns property tax advice/advisor/adviser/specialist/consultant/planning.
- **R4** City forms stay with the city pages; a service page never claims "property accountant in
  Bristol" and a city page never claims the national phrase. Cities without a page are a new-page
  decision (R20: generic "accountant in <city>" forms are city forms).
- **R15** "Landlord tax advice" and "tax advice for landlords" belong to `/services/property-tax-advice`;
  the `/landlord-tax` guide keeps the explainer queries.
- **R18** When a city form and an audience form collide ("capital gains tax accountant london"), the
  city page wins. Exception: the non-resident landlord, whose client is abroad; those go to
  `/services/non-resident-landlord`.
- **R22** "Property incorporation tax advice" belongs to `/for/moving-property-into-a-limited-company`,
  not to the `/incorporation` guide. Hire intent goes to the audience page.
- Also in force: R1 no redirects or deletions (never propose collapsing a page); R19 generic cost
  queries with no property word are out of scope.

If a ruling and the data disagree, follow the ruling and say so in `reason`.

### Required: commercial_fit

Every part (b) verdict, `owner` or `gap`, must also say how commercial the family is. One of:
- `core_hire`: the searcher is looking for an accountant or tax adviser (property accountant, landlord accountant, property tax advice).
- `paid_advice_decision`: a searcher at this point is plausibly about to pay a professional: incorporating a
  portfolio, selling a buy-to-let with a gain, gifting a rental to children, a non-resident disposal.
- `informational_with_ad_spend`: high CPC, but the typical searcher wants a fact or a calculation and rarely
  hires. Example: "capital gains tax on home sale", where main-residence relief usually means no tax. These families
  are kept in the file but excluded from the money-page ranking and the owner rollup; they stay with the blog engine.
Judge it from the searcher's likely situation, not from the CPC. When unsure between the last two, choose
`informational_with_ad_spend` and say why, with `low` confidence.

## 4. Confidence

- `high`: the page's primary purpose is an obvious match, or a ruling covers it, and nothing in the
  row points elsewhere.
- `medium`: a clear best choice but a second page is arguable.
- `low`: also the default when the row's `confidence_note` says thin data or no SERP and nothing else settles it; you are choosing between two or more reasonable pages, or the row lacks the fact you need.
  Low verdicts get a second independent reader; do not round up to look decisive.

## 5. Output schema

One JSON object per line, appended to `judgments/<reader>_<batch>.jsonl`:

```json
{"family_id": "string", "decision": "owner | gap | merge | split",
 "commercial_fit": "core_hire | paid_advice_decision | informational_with_ad_spend (required for owner and gap; null for merge and split)",
 "owner_page": "/path or null", "gap_brief": "one line or null",
 "confidence": "high | medium | low", "reason": "one sentence",
 "input_sha256": "copied from the queue row (owner, gap) or computed per section 2 (merge, split)",
 "reader": "A or B"}
```

`decision` is `owner` or `gap` for part (b), `merge` or `split` for part (a). `owner_page` is set only
for `owner`; `gap_brief` only for `gap`. One sentence for `reason`, no em-dashes, no hedging words.
