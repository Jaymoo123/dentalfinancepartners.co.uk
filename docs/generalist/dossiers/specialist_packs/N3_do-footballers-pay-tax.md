# PACK N3: net-new — Do footballers pay tax? How footballer tax works

Derived 2026-08-25 from FROZEN dossier `../specialist_professions_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **number-first answer-led**). Ground truth: house **§22.4**
(sports professionals, image rights, agents' fees, GFC6), with §3 and §9. **C1 row 63 = CONDITIONAL:
image-rights and high-net-worth content must not become scheme promotion, and no investment or pension
advice.** C2 §8 carries no separate row for 63 beyond the "24 CONDITIONAL rows" line, so the C1 fence
is the gate and it is recorded here in full.

## 1. Target and permission level

- NET-NEW Q&A explainer. Proposed slug: `do-footballers-pay-tax-uk` (writer may refine; resolver
  conventions).
- Grade: NET-NEW, everything writable. Revert path: delete pre-deploy; post-deploy enters
  `monitored_pages`.
- Shape: pure question intent. This is a visibility page. Dossier §6 (from C2) records that a faceless
  form cannot convert this buyer, so **no lead expectation is attached** and the page carries an
  informational CTA only.

## 2. Equity register

None (net-new). N4 owns the audience and service framing; this page owns the question set.

## 3. Market keyword slice (ledger, P-FOOT question set, 370/mo, peer-winnable 370)

| Keyword | Vol/mo | Best peer |
|---|---|---|
| how much tax do footballers pay | 140 | kyzensports p16-28 (dossier §2) |
| how much tax does a footballer pay | 140 | kyzensports p16-28 |
| how much do footballers get taxed | 90 | kyzensports p16-28 |

Every assigned keyword is the same question in three phrasings. One page, three phrasings answered in
the H1 and the first two H2s.

## 4. Competitor teardown (fetched 2026-08-25)

- `theaccountancy.co.uk/tax/how-do-footballers-pay-tax-330098.html` — ~1,100 words, 11 headings
  ("What is PAYE?", "Are footballers employed or self-employed?", "What about other income, like
  sponsorship?", "Image rights companies", "Staying compliant", "How much tax do footballers pay?").
  Opens "We all know top-flight footballers do alright. But how does tax work for professional
  footballers?" Figures: corporation tax 19% to 25%, additional-rate threshold £125,140, 45% above it.
  **Zero FAQs, no worked example.** Carries a mid-article "Influencer accountancy services" cross-sell.
  Describes image-rights companies as taxed at the corporate rate "instead of" 45% income tax.
- `kyzensports.co.uk/blog/do-footballers-pay-tax` — named in dossier §2 at p16-28. **Fetch returned
  HTTP 403; not analysed.** No observation in this pack rests on it.
- Dossier §1: the harvested sports specialist's whole measurable footprint is 6 keywords, and SRLV's
  ranked set contains zero sports-family keywords. **The field converts on reputation, not search**,
  which is why a 370/mo question set sits with its best answer at p16-28.

## 5. Whitespace

- **GFC6, which nothing in the fetched sample mentions.** HMRC's Guidelines for Compliance GFC6 (2024)
  on football agents' fees and dual representation: no default 50/50 club/player split, the split must
  reflect commercial reality with contemporaneous evidence, and the player-services element paid by the
  club is the player's taxable benefit, reportable on P11D with Class 1A. This is the substantive core
  of footballer tax and it is uncovered.
- **A recomputable worked example.** Nothing in the sample has one and the query is literally "how
  much".
- **The employment answer stated cleanly:** contracted players are club employees taxed through PAYE;
  boot deals, appearance fees and endorsements are separate income.
- **Image rights described as an area HMRC actively challenges on commercial substance**, which is the
  opposite of how the ranking page frames it.
- **FAQ depth**: the ranking page has zero.

## 6. Fences (binding — this is the cluster's highest regulatory-risk page)

- **No scheme promotion, no structure recipes.** Nothing that reads as a way to pay less. The sector's
  DOTAS, POTAS and enablers history is exactly why the tone is compliance-first.
- **Image rights: describe, never recommend.** Never write the "taxed at the corporate rate instead of
  45%" comparison the fetched competitor uses. Never write "keep more of your image rights". The
  permitted framing is that payments to an image-rights company are an area HMRC actively challenges on
  commercial substance.
- **No investment advice, no pension advice, no wealth-management content.** Not a sentence.
- **GFC6 facts stated exactly as locked**, including the P11D and Class 1A point and the rejection of a
  default 50/50 split.
- No naming of individual players, clubs, agents or live investigations; no press-report figures on
  who owes what.
- No em-dashes. **No house-position section numbers in reader copy** (report only; trades leaked 71).
- Rate-date discipline per language spec §2: the additional-rate threshold £125,140 and the band
  figures carry the August 2026 check tag; dividend rates 10.75% / 35.75% / 39.35% date-tagged from
  6 April 2026; corporation tax 19% / 25% with marginal relief.

## 7. Acceptance criteria (deterministic)

1. All three assigned phrasings answerable, with the money answer in the first sentence in figures.
   Question H2s for: are footballers employed or self-employed; how is a signing-on fee taxed; how are
   endorsements and boot deals taxed; who pays the agent and what does that mean for the player; what
   are image rights and why does HMRC look at them.
2. Figures, recomputable and date-tagged: 45% additional rate and the £125,140 threshold; the basic and
   higher rates; employee NIC; employer NIC 15% above the £5,000 secondary threshold from 6 April 2025;
   corporation tax 19% to 25%; dividend rates from 6 April 2026.
3. One worked example: a named player (unused persona name and unused city per language spec §4) on a
   stated salary, PAYE and NIC computed, plus a separate endorsement payment, all re-derivable.
4. Minimum 10 FAQ pairs (the ranking page has zero).
5. Zero scheme, structuring, avoidance, "instead of", investment or pension language. Adversarial QA
   checks the image-rights section and the agent-fee section sentence by sentence against the locked
   GFC6 facts.
6. Links: N4 only. Resolver-clean, 0 invented slugs. §4 floors + coverage floor pass.
7. Informational CTA only, no lead-capture claim of expertise in player representation.

## 8. Expectation

370/mo with the best-ranking specialist answer at p16-28 and the general-firm answer thin on the
substantive core. Realistic: Google top-10 on at least one of the three phrasings within a quarter of
indexing, Bing earlier. **Visibility only, no lead expectation** (C2, recorded in dossier §6 and owner
question 4). Maturity caveat: net-new, judge at 28d Bing / 90d Google. Failure trigger, written before
the build: zero impressions on all three phrasings at 90d post-index. Standing risk: if GFC6 is
superseded, the agent-fee section needs a dated back-patch, not a rewrite.
