# Language spec — retail_product cluster (one spec, all 17 packs inherit it)

Written 2026-08-25 per `REWRITE_PROGRAM.md` §9.11, from the ranking pages actually fetched for the
pack teardowns on this date. No paid calls, no DataForSEO: every observation below comes from a free
WebFetch or WebSearch run today. Where a page would not fetch, it is named as unfetched rather than
described.

**Sample (rank-weighted winners, defined by top-10 density in the dossier ledger, never by brand):**

| Page | Position evidence (ledger) | Words | Fetched |
|---|---|---|---|
| skynetaccounting.co.uk `/common-manufacturing-accounting-issues/` | **p7-11** on `reduce manufacturing costs`, `manufacturing cost`, `costing for manufacturing` (the best density in the whole cluster) | ~1,400 | yes |
| skynetaccounting.co.uk `/manufacturing-accountant/` | p11-29 on `manufacturing accountant(s)`, `manufacturing account(s)` | ~2,100 | yes |
| livingstonesaccountants.co.uk `/blog/...franchise...` (`UK Franchise Accounting: Royalty Structures, Tax Issues, and Common Compliance Errors`) | **p9-13** on `franchise accounting`, `accounting for a franchise` | ~2,100 | yes |
| lanop.co.uk `/retail-business/` | p9-10 on `retail business accounting`, `accounting in retail business`; p23-58 across the rest of the retail head set | ~2,100 | yes |
| livingstonesaccountants.co.uk `/shop-accountants/` | retail sub-trade service page, cluster field | ~2,100 | yes |
| franchise.accountant (homepage) | DEDICATED franchisee specialist, field-verified | ~1,200 | yes |
| themotortradeaccountants.co.uk | DEDICATED motor-trade specialist (403 in the dossier sweep, **fetched successfully today**) | short service page | yes |
| maynardjohns.com `/motor-trade-accountants/` | named motor-trade specialist team | ~480 | yes |
| mytaxdoc.co.uk `/accountants-for-jewellers/` | best of a non-specialist jeweller field | ~550 | yes |

Nine pages fetched, zero refusals. The dossier's D1 harvest gap (no ranked-keyword pull for the
motor-trade, franchise and jeweller specialists) is **not** closed by this: positions for those three
domains remain unmeasured, so their pages are read as field evidence, not as rank-weighted winners.
Said plainly here so no pack over-claims.

---

## 1. Measured answer patterns (what the winners actually do)

- **The best-ranked page in the cluster is the shortest substantive one.** Skynet's 1,400-word
  numbered listicle sits p7-11 on the costing head set. Its own 2,100-word service page, on the
  richer head term, sits p11-29. Length is not the lever in this family; a numbered, problem-named
  structure is. Our N4, N9 and N13 take that shape deliberately.
- **Context-first openers are the norm, and they are beatable.** Skynet's winner opens
  "Accounting in a factory is very different from normal business accounting. Factories have to
  manage raw materials, labour, machinery, overheads, and taxes, all while making sure every
  product is profitable." That is two sentences before any answer. Every one of our pages leads
  with the ruling sentence instead: the reader's situation, the obligation, then the number.
- **Numbers are almost entirely absent.** Across nine fetched pages the complete inventory of
  substantive figures is: **4% to 12%** (livingstones, franchise royalty range), **£50,000**
  (skynet, a machinery depreciation illustration), **10%** (skynet, a margin variance), **£20,000**
  (themotortradeaccountants, a client tax recovery), **£15 million** (their client turnover
  ceiling). No VAT threshold. No capital allowance rate. No income tax band. No margin-scheme
  fraction. That is the whole cluster's numeric content.
- **Zero worked examples on all nine pages.** Not one recomputable calculation anywhere. Skynet's
  £50,000 machinery line and 10% variance are the closest thing, and neither is computed through.
  A recomputable 2026/27 worked example on every one of our pages is the single largest structural
  gap available in this family, and it is larger here than in any cluster researched to date.
- **The core operator mechanics are simply not covered.**
  - **Retail VAT schemes:** livingstones `shop-accountants` and lanop `retail-business` between
    them name *none* of point of sale, apportionment or direct calculation. Lanop's nearest H2 is
    "Sales Tax Compliance", which is American.
  - **Margin scheme:** themotortradeaccountants does not mention it at all. Maynard Johns mentions
    it only as a hyperlink to gov.uk, with no explanation and no example.
  - **High value dealer / MLR:** mytaxdoc's jewellers page does not mention it. No fetched page in
    the cluster does.
  - **Franchise fees:** livingstones is the only page that touches capital vs revenue, and it
    hedges into vagueness: "Large upfront payments **may need to be capitalised and amortised over
    several years** rather than deducted immediately, depending on what the fee covers and the
    length of the franchise agreement." No BIM reference, no capital-is-capital statement, no
    sole-trader vs company asymmetry. franchise.accountant, the dedicated specialist, does not
    mention the initial fee anywhere.
- **Service pages use noun-phrase H2s; the ranking explainer uses named-problem H2s.** Skynet's
  winner runs "Cost Allocation", "Inventory Valuation and Control", "Getting the Product Cost
  Right" — each names a specific operator failure. Lanop's non-ranking service page runs "Better
  Inventory Management", "Informed Decision Making", "Enhanced Retail Profitability" — benefit
  nouns, no failure named. Name the failure, not the benefit.
- **Second person is inconsistent and that is a gap.** Skynet's service page opens strongly in
  first person plural ("Most accountants explain the numbers. We investigate why...") and its FAQ
  block (8 pairs) is the only question-form heading set in the sample. Our pages run second person
  throughout, with question H2s on every FAQ block and on the Q&A-shaped packs.
- **FAQ blocks are rare.** Only skynet's service page (8) and livingstones' shop page ("Got
  questions? We've got answers") carry one. Lanop: zero. livingstones franchise article: zero.
  franchise.accountant: zero. maynardjohns: zero. mytaxdoc: zero. A real FAQ block on every page
  is close to free surface here.

---

## 2. House voice constraints (binding on every pack)

- Plain, cost-conscious British English. The audience is owner-operators: shopkeepers, dealer
  principals, factory MDs, franchisees (dossier §7). Trading businesses, never consumers. The
  reader is in the sentence, not the relief.
- **No em-dashes anywhere in reader copy.** Livingstones' franchise article uses them "frequently
  for clarification and asides" and skynet's service page uses them in its bullet lists; we do not.
  Commas, parentheses, full stops, semicolons.
- **No house-position citations in reader copy.** Writers cite `house_positions.md` sections **by
  number in their delivery report only**. The trades wave leaked 71 inline citations into page
  bodies and QA had to strip every one. Nothing of the form "(§21.1)", "per house position 7",
  "HP21" may appear in a metaTitle, H1, H2, body sentence, table cell or FAQ answer. Cite the
  underlying public authority instead (gov.uk page, VAT Notice number, HMRC manual code, statute)
  where a citation genuinely helps the reader.
- **A worked example with recomputable 2026/27 figures on every page where the SERP lacks one**,
  which on current evidence is all seventeen. Recomputable means a reader with a calculator can
  reproduce every line from the numbers printed on the page.
- **Every rate date-tagged.** No bare percentage.
- **The 2025/26 lock, stated because it bites hardest in this family.** `house_positions.md` §2
  locks Class 4 NIC at **6% / 2%** and the bands at **£12,570 / £50,270** for **2025/26 only**.
  2026/27 copy therefore writes them with the dated hedge, in substance: "the 2025/26 figures,
  still current when checked in August 2026". Do not silently present a 2025/26 figure as a
  2026/27 figure and do not invent a 2026/27 band. Contrast with the figures that *are* locked
  forward: VAT £90,000 / £88,000 (§7), AMAP 55p/25p from 6 April 2026 (§12), main-rate WDA 18% to
  14% from 1 April / 6 April 2026 and the 40% FYA from 1 January 2026 (§8), margin scheme one-sixth
  and the retail-scheme £1m / £130m gates (§21). Those are stated with their effective dates and no
  hedge.
- **Coverage over selection.** Volume is not a gate anywhere in this cluster. N11 (jewellers) is a
  coverage play with demand below the measurement threshold and is written to the same A* bar as
  the 250/mo retail pillar. No pack may argue itself smaller on volume grounds.
- **No AI tells:** no rule-of-three stacks, no "it's important to note", no mirrored "not only X
  but also Y", no summarising closer that restates the page.
- **Acronyms spelled out at first use:** VAT is fine bare; EPOS, MLR, HVD, MTD, WIP, AIA, FYA, WDA,
  CBAM, MFF, POA are not.

---

## 3. Do-not-copy list (measured on the same nine pages)

- **skynet `/manufacturing-accountant/`:** em-dashes throughout; a whole page with **zero tax
  figures**; slogan H2 "Expected Gross Margin 30%. Actual Gross Margin 20%. Where did the other 10%
  go?"; four separate booking CTAs including one with a typo ("Book a Manufacturing Stragety
  Call"); "What are you currently tolerating" coaching register. The 8-pair FAQ block and the
  named-failure framing are the model; nothing else on the page is.
- **skynet `/common-manufacturing-accounting-issues/`:** context-first opener; "Final Thoughts"
  closer; a £50,000 machinery figure and a 10% variance that are never computed through. Take the
  numbered named-problem spine, replace the missing arithmetic.
- **lanop `/retail-business/`:** Americanised "Sales Tax Compliance"; benefit-noun H2s ("Enhanced
  Retail Profitability", "Informed Decision Making"); "Utilizing the best accounting technology" US
  spelling opener; zero figures; zero FAQs; "Book Your FREE Consultation" capitalised urgency; an
  "Our Identity" section. None of it is a model.
- **livingstones `/shop-accountants/`:** "we specialise in offering bespoke accountancy services
  tailored to the unique needs of businesses across the UK" is the specimen platitude opener to
  avoid; "maximise profits and minimise liabilities"; a retail page that names no retail VAT scheme.
- **livingstones franchise article:** frequent em-dashes; "Introduction" as an H2; the vague
  "may need to be capitalised and amortised over several years" formulation (our position is
  firmer and sourced); "The Critical Role of Professional Franchise Accounting Support" mid-article
  sell section. The 4% to 12% royalty range is the one usable measured fact, and it is a market
  observation, not a tax fact, so it is attributed as such if used at all.
- **franchise.accountant:** H1 "Expert Accountancy for Franchise Businesses Maximise Profits &
  Minimise Tax" (sloganeering, no punctuation); "Get Your Free Consultation Today - Let's Build
  Your Franchise Success!"; "Tax Savings & Optimisation" framing; zero figures on a specialist
  homepage. Never imitate the optimisation-promise register.
- **themotortradeaccountants:** "Pay less tax. Save time. Grow with confidence."; "How we helped a
  client reclaim £20,000" case-study-as-headline; "What are you currently tolerating in your motor
  trade business?". We publish no client-recovery figures and no anonymised-saving headlines
  (estate rule: anonymised social proof only, never a monetised claim as a heading).
- **maynardjohns:** a 480-word motor-trade page whose margin-scheme treatment is a bare gov.uk
  hyperlink. The gap is the opportunity; the brevity is not the model.
- **mytaxdoc jewellers:** 550 words, "Tech-Savvy Accounting Firm", zero figures, no MLR, no margin
  scheme. The entire substantive jeweller topic is unoccupied.
- **Estate-wide, carried from prior waves:** no "unique financial challenges", no "keep more of
  what you earn", no "this guide"/"in this article" intro, no rebate-agent or claim-encouragement
  framing anywhere (and on motor-trade pages that is a legal fence, not a style note, see §21.2).

---

## 4. Differentiation note — lead structures (assigned, so 17 parallel pages do not converge)

One lead structure per pack. The opening 40% of the page must follow it, and **no two siblings may
share an H2 phrasing**. Editorial QA checks each page against this table and this spec, not against
reviewer taste.

**Cumulative bans, binding (creative_performers, trades_transport and this wave):**

- **No "older articles" openers**, and no opener that begins by characterising the state of
  existing coverage.
- **Banned persona names** (used in earlier waves): Maya, Amara, Jess, Daniel, Sophie, Priya,
  Roshan, Tomasz, Wes, Ruth. Suggested pool for this wave, one name per page, no repeats: Colin,
  Bridget, Marta, Fergus, Ola, Ines, Rhian, Stefan, Anwen, Greg, Farah, Piotr, Magda, Huw,
  Tessa, Barry, Sinead. (Nadia, Yusuf, Callum, Dev, Lorna are TAKEN by parallel waves; do not use.)
- **Banned example cities:** Manchester, Nottingham, Sheffield, Leeds, Bristol, Birmingham,
  Liverpool, Glasgow, Dundee, Coventry, Carlisle, Wakefield, Croydon, Dover, Inverness. Pool for
  this wave: Luton, Basingstoke, Doncaster, Telford, Wrexham, Peterborough, Blackburn, Gloucester,
  Middlesbrough, Warrington, Colchester, Barnsley, Dumfries, Newport, Salisbury, Kendal, Yeovil.
  (Swansea, Norwich, Preston, Hull, Stoke-on-Trent, Aberdeen, Ipswich are TAKEN by parallel waves;
  do not use.) (Croydon, Putney, Sutton, Harrow, Milton Keynes and Bury St
  Edmunds appear as live GSC queries in the dossier; they are query evidence, not example cities,
  and must not be used as worked-example locations.)
- **Wave-specific device bans, so this wave does not converge with trades or creative:** no page
  opens with a week-in-the-life narrative except N2 (assigned); no page opens with a decision table
  except N13 and N14 (assigned, and their tables differ in axis); no page uses "a day in the
  workshop / on the shop floor" framing; no page opens on a court case or litigation date (that was
  the trades N3 device); no page opens with a rates table except N5 (assigned).

| Pack | Grade | Lead structure (opening 40% must follow) |
|---|---|---|
| R1 | REFRAME | **Symptom-audit-led:** the three numbers a shopkeeper cannot read off their own accounts (true gross margin, stock at year end, which VAT scheme they are on), each named as a symptom, then what fixes it. Hub hands off to N1/N2. |
| N1 | NET-NEW | **Scheme-selector-led:** the three retail schemes presented as a live choice in the first screen with their turnover gates, then one section per scheme working the arithmetic. |
| N2 | NET-NEW | **Trading-week-led:** one convenience store's week (till, deliveries, wastage, staff, paperwork) as the spine; the buy-or-sell-the-shop fork closes the page. |
| N3 | NET-NEW | **Unanswerable-question-led:** opens by naming the question statutory accounts cannot answer for a factory (what one unit actually costs), then the service map that answers it. |
| N4 | NET-NEW | **Cost-build-up-led:** one product's cost assembled line by line (materials, labour, absorbed overhead, work in progress, year-end stock) with the calculation as the page's literal spine. |
| N5 | NET-NEW | **Rates-timeline-led:** the dated FA 2026 changes as a chronology table first (18% to 14%, 40% first-year allowance from 1 January 2026, special rate 6%), prose reads the ordering rules off it. |
| E1 | REFRAME | **Pass-or-fail-test-led:** the qualifying-advance question posed as a test the reader applies to their own project, answered conservatively; sibling page differentiation enforced here. |
| E2 | REFRAME | **Deal-stage-led:** the sale sequence from grooming through heads of terms to completion, with the tax consequence attached to each stage. |
| N6 | NET-NEW | **Rate-boundary-led:** the zero-rate versus standard-rate food boundary stated first because it governs everything else on the page, then production, plant and payroll hang off it. |
| N7 | NET-NEW (CONDITIONAL, blocked) | **Obligation-calendar-led:** a dated compliance calendar running to 2027, each row a duty with an owner. |
| N8 | NET-NEW | **Balance-sheet-led:** a dealer's three balance-sheet positions (stock, stocking finance, cash) as the frame; the trading-account questions hang off them. |
| N9 | NET-NEW | **Worked-arithmetic-led:** the one-sixth-of-margin calculation done in full in the first screen, then the record-keeping rules that are the only thing protecting it. |
| N10 | NET-NEW | **Single-vehicle-journey-led:** one car followed from part-exchange through demonstrator use to retail sale, with the tax treatment at each hop. |
| N11 | NET-NEW | **Registration-trigger-led:** the two triggers that catch jewellers first (the 10,000-euro cash threshold and the VAT threshold) stated in the opening sentences, then stock and margin. |
| N12 | NET-NEW | **Agreement-clause-led:** the franchise agreement's money clauses as the spine (initial fee, royalty, marketing fund, term, renewal), tax attached clause by clause. |
| N13 | NET-NEW | **Capital-versus-revenue-split-led:** a two-column split of every payment a franchisee makes, in the first screen, then prose defending each side of the line. |
| N14 | NET-NEW (CONDITIONAL) | **Structure-fork-led:** sole trader versus limited company for a franchisee, with the marketing fund fee VAT treatment as the tiebreaking worked example. |

No two rows above share a device, and none repeats the trades wave's nine (additive Q&A-append,
service-choice hub, process walkthrough, question-only Q&A, rules-first operator, reference table,
example-year spine, comparison table, decision points) or the creative wave's set.
