# Language spec — specialist_professions cluster (one spec, all 9 packs inherit it)

Written 2026-08-25 per REWRITE_PROGRAM.md §9.11, from the ranking pages actually fetched for the
pack teardowns. No paid calls; all observations below come from live fetches on 2026-08-25.

**Sample fetched (rank-weighted, not brand-weighted):**

| Page | Why in sample | Words | Fetch |
|---|---|---|---|
| marineaccounts.com `/seafarers-earnings-deduction` | holds p3-p8 across the whole 17-keyword SED set | ~3,200 | OK |
| marineaccounts.com `/seafarers-tax-days-calculator` | p3 on `seafarers tax calculator uk` | ~400-500 copy + tool | OK |
| theaccountancy.co.uk `/tax/how-do-footballers-pay-tax-330098.html` | ranking page on the P-FOOT question set | ~1,100 | OK |
| smithbutler.co.uk `/sectors/accountants-for-architects/` | the harvested architect sector page | ~1,200 | OK |
| creative.accountants `/creative-industries/architects/` | page-1 architect specialist on the free SERP sweep | ~2,100 | OK |
| macleodaccounting.co.uk (home) | the harvested neurodivergent specialist | ~650-700 | OK (thin) |
| kyzensports.co.uk `/blog/do-footballers-pay-tax` | dossier §2 names it p16-28 | n/a | **403 Forbidden, not fetched. No observation below rests on it.** |
| seafarerstaxreturns.com | SED SERP presence | n/a | **returned header only, no body. Not analysed.** |

No fetchable specialist page exists for pilots, virtual assistants or the energy-company slice, which
matches the dossier's "no field" verdicts. N5, N6 and N8 therefore have no measured model, stated.

## 1. Measured answer patterns (what the winners do)

- **The SED winner wins on machinery, not on length.** marineaccounts is ~3,200 words but only five
  headings; the volume sits in a **27-item knowledge base**. Its ranking body is the rules walked in
  order (365 days, midnight test, 183-day cap, half-day rule) with the numbers stated plainly. Copy
  the rules-in-order structure and the question breadth; the 27 items are the real lever.
- **Numbers in the sentence, not in a box.** "spend at least 183 days outside the UK in a qualifying
  period", "365 days or more". Every fetched winner that ranks states its core number inline. The
  architect pages, which rank for nothing measurable, state **no figures at all** (smithbutler: zero;
  creative.accountants: "10+ years of experience" and a slogan).
- **Only one fetched page carries anything like a worked example**, and it is a single illustrative
  sentence ("If you begin working on a yacht on 1st January... you must be outside the UK at Midnight
  on the following 31st December"). **Nothing in the sample carries a recomputable calculation.** A
  full worked example per page is the biggest structural gap in this cluster, exactly as in trades.
- **Question-form headings win on explainer surfaces** (marineaccounts "What is...", "How to Qualify
  for..."; theaccountancy "Are footballers employed or self-employed?", "How much tax do footballers
  pay?"). Noun-phrase headings dominate the service pages that rank for nothing.
- **Answer-first on the money question.** theaccountancy answers "how much tax" with the bracket and
  the £125,140 threshold rather than with context. That is the shape for N3.
- **Service pages in this cluster open with a metaphor and never recover.** smithbutler: "Building a
  solid financial basis... will allow you to form a stable foundation". creative.accountants: "You
  are the creators of our future spaces, we are the accountants for architects." Both rank for
  nothing measurable. The lesson is not stylistic, it is that the sector page with no facts has no
  surface to rank on.
- **FAQ depth tracks rank in this sample**: 27 items (p3-8) > 8 items (page-1 brand, no measurable
  keywords) > 0 items (smithbutler, theaccountancy). Minimum 10 question pairs on every pack here,
  15+ on N1.

## 2. House voice constraints (binding)

- Plain cost-conscious British English, consumer register, reader in the sentence (dossier §7 and
  `VOICE_STANDARD.md`). Audiences split two ways: individual employees and crew (N1, N2, N3, N5) and
  small companies or practices (R1, N4, N6, N7, N8). Never address a practice as if it were a person.
- **No em-dashes** in any copy. Half the fetched sample uses them; we do not.
- **No published house-position citations in reader copy.** Writers cite `house_positions.md` sections
  by number **in their report only**, never on the page. The trades wave leaked **71** inline citations
  and QA had to strip every one. Same for pipeline artefacts ("verify at build", "(HP22)", "§22.4").
- **No "this guide" / "in this article" openers, no metaphor openers** (the two architect specimens
  above), no "unique financial challenges", no "keep more of what you earn", no slogan H1s.
- **No "older articles" openers** and no opener that leads with what other sites get wrong: both were
  used by the creative and trades waves.
- **No AI tells:** no rule-of-three stacks, no "it's important to note", no "not only... but also",
  no closing summary section that restates the page.
- **Worked example with recomputable 2026/27 figures on every page** where the fetched SERP lacks one,
  which is every page in this cluster. All figures date-tagged.
- **Rate-date discipline, hard:** Class 4 at 6% and the £12,570 / £50,270 bands are locked in house
  positions for **2025/26 only**. Any 2026/27 copy using them carries the dated tag "still current
  when checked August 2026", never a bare assertion that they are the 2026/27 figures. Flight-crew
  flat rates carry "from 2013/14, unchanged at verification August 2026".
- Hedges are house-locked wordings, not vibes: the SED employee-only line, the offshore-installation
  exclusion, the tonnage-tax boundary sentence, the repayment-agent fence, the GFC6 "no default 50/50"
  line, the architecture "routine design is not R&D" line, the renewables landlord/homeowner boundary,
  and the neurodivergent allowed/never lists. Use them verbatim in substance.

## 3. Do-not-copy list (measured on the same sample)

- **marineaccounts SED page:** opens "you could reclaim all the UK income tax paid on your seafaring
  employment" and drives a **"Start FREE SED Qualifying Test"** CTA plus a **"Refer a friend and
  receive £50!"** incentive. That is refund-shaped acquisition. Row 87 is CLEAR only while our
  proposition is not rebate-shaped, so the reclaim framing, the qualifying-test funnel and the referral
  bounty are all off. Copy the machinery, never the funnel. Also: em-dashes throughout ("in simple
  terms—you must"), and it presents the 183-day cap and the half-day rule in a way that reads as if
  183 days out is itself the qualifying test. State the 365-day eligible period as the test and the
  183-day figure as the single-visit cap; do not repeat that conflation.
- **theaccountancy footballer page:** describes image-rights companies as taxed at the corporate rate
  "instead of" the 45% income tax rate. We never write the comparison that way. Zero FAQs, zero worked
  example, and a mid-article "Influencer accountancy services" cross-sell block: none of that travels.
- **smithbutler architects:** metaphor opener, zero figures, a promoted "R&D tax credits and tax
  relief" service block. The R&D block is the specific thing we do not imitate.
- **creative.accountants architects:** slogan headings ("Go Do Your Thing", "Strong Foundations"),
  R&D framed as "identify them and make the relevant claims to reduce tax and even get cash in the
  door" tied to "innovative design [and] sustainability". Architecture R&D copy on our page states the
  merged-scheme facts and that routine design, standard-compliance and aesthetic work is not R&D. No
  claim-encouragement framing anywhere. Its one useful figure ("one bad job can wipe out the profits of
  3 good ones") is an unsourced slogan, not a stat: do not borrow it.
- **macleodaccounting:** the whole site is brand voice with no content ("Get Money Sorted", "Success
  is subjective"). It ranks for zero family keywords. It is a warning, not a model: N7 wins on
  substance, not on empathy positioning.
- **Any page we did not fetch** (kyzensports 403, seafarerstaxreturns empty) is not quoted, imitated or
  characterised in any pack. Where a pack names them, it names them as unfetched.

## 4. Differentiation note — lead structures (assigned, so 9 parallel pages do not converge)

One lead structure per pack. The opening 40% of each page must follow it, and no two siblings may
share an H2 phrasing.

**Cumulative bans, binding here.** Persona names already used estate-wide and **BANNED**: Maya, Amara,
Jess, Daniel, Sophie, Priya, Roshan, Tomasz, Wes, Ruth. Example cities **BANNED**: Manchester,
Nottingham, Sheffield, Leeds, Bristol, Birmingham, Liverpool, Glasgow, Dundee, Coventry, Carlisle,
Wakefield, Croydon, Dover, Inverness. **Suggested and unused: names** Eryn, Bilal, Otis,
Freya, Marcus, Lorna, Ivo, Dewi, Saoirse (Nadia and Callum are taken by the personal_care wave);
**cities** Southampton, Plymouth, Falmouth, Aberdeen, York, Hull, Ipswich, Chester, Truro
(Norwich, Exeter and Swansea are taken by the personal_care wave). One name and one city each, no repeats across the nine packs.

**Opener and device bans specific to this wave** (so it does not converge with creative or trades):
no "older articles" opener; no metaphor or building/foundation opener; no "what nobody tells you"
opener; no opening statistic with no cited source; no opening with a competitor's failure; no
hub-led opener (trades N1 owns it); no process-walkthrough opener (trades N2 owns it); no plain
comparison-table opener (trades N7 owns it).

| Pack | Grade | Lead structure |
|---|---|---|
| R1 architects | REFRAME | **Practice-structure fork-led:** sole practitioner vs LLP vs limited practice decided in the first 40%, software section sits as a later H2, never the lead |
| N1 SED pillar | NET-NEW | **Machinery-walkthrough-led:** the six qualifying tests in HS205 order, one H2 each, each opening with a ruling sentence and its number |
| N2 seafarers and yacht crew service | NET-NEW | **Scenario-triage-led:** three named crew situations up front (employed superyacht crew, foreign-flag merchant crew, self-employed marine contractor), each routed to its answer |
| N3 do footballers pay tax | NET-NEW | **Number-first answer-led:** the tax outcome in figures in sentence one, PAYE mechanics second, everything else as question H2s |
| N4 sports professionals coverage | NET-NEW | **Career-stage-led:** first contract, peak earnings, endorsements, and end of playing career as the spine |
| N5 pilots and flight crew | NET-NEW | **Employment-status-fork-led:** the page splits at the top into PAYE crew and self-employed pilot and stays split to the end |
| N6 virtual assistants | NET-NEW | **First-year-milestone-led:** dated registration and filing milestones from first client onward |
| N7 neurodivergent business owners | NET-NEW | **Friction-and-fix-led:** short paired blocks, the thing that goes wrong then the system that removes it, no diagnosis language anywhere |
| N8 renewable energy companies | NET-NEW | **Project-lifecycle-led:** development, construction and operation phases, with the tax question that bites in each |

Editorial QA checks each page against THIS spec and its assigned lead structure, not reviewer taste.
