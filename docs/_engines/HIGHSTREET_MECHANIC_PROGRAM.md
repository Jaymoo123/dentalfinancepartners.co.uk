# High-Street Mechanic Program — build handoff

**Type:** Cross-site content program. This is the single doc for it. Do not create a
second handoff, resume or pickup doc; update this file in place.

**Research complete 2026-09-10.** Nothing built, nothing deployed. Owner has approved
running the build with Opus sub-agents when it starts.

**Companion engines:** `NETNEW_PROGRAM.md` is the HOW for every wave below. This doc is
the WHAT. Where they disagree about mechanics, `NETNEW_PROGRAM.md` wins.

---

## 1. What this program is, and the finding that shaped it

The question was whether to publish a page for every ordinary UK business type, the way
a rival does. The answer, measured, is no, and the reason changes the whole shape of the
build.

**Trade-named demand does not exist. Mechanic demand does.**

- "&lt;trade&gt; accountant" was priced against Google Ads for all 176 trades on the
  high-street list. **157 have no measurable volume** (below Google's reporting floor of
  roughly ten searches a month).
- Only eight clear 50 a month: dentists, restaurants, pharmacies, hotels, agencies,
  pubs, builders, theatres. **The estate already owns all eight.** There is no
  unclaimed trade with real hire demand.
- The tax mechanics those trades sit on carry **1,848 distinct priced questions and
  76,540 searches a month across 30 mechanics.**

So a page built on a trade name is built on nothing. A page built on the mechanic,
naming the trades it governs, is built on demand that repeats every month.

**The competitive position, from 352 live SERPs.** The incumbent (livingstonesaccountants.co.uk,
2,107 trade pages generated from an insurance trade schedule) ranks in 57 of the 176
niches, median position 4, first place in 15. But **56 of their 58 rankings are hire
terms and 2 are tax questions.** On the tax questions page one is gov.uk 151 times, a
paywalled reference library 38, a trade forum 29, Facebook 15, Reddit 9. No accountancy
firm is answering these questions in public. That gap is the whole opportunity.

---

## 2. Status and what exists on disk

Everything is in `expansion_research/highstreet_2026-09-10/`. Raw JSON is gitignored by
`expansion_research/**/*.json`; the readable outputs are committed.

| File | What it is |
|---|---|
| `niches.tsv` | the 176 trades, with seed and mechanic phrasing |
| `vocab.tsv` | per-niche trade vocabulary including product words (the relevance gate) |
| `hosts.tsv` | mechanic to host site, with the rationale for each |
| `verdicts.csv` | per-trade verdict from the trade-name pass |
| `mechanics_report.txt` | the 2,017-trade universe classified by mechanic |
| `rival_trades.txt` | the incumbent's full trade list, normalised |
| `picks/<site>.jsonl` | **the build input.** One row per page, with its full covers list |
| `page_splits.json` | the page list with what each page merges (raw, gitignored) |
| `mechanic_demand.json` | measured questions and volume per mechanic (raw, gitignored) |
| `l1b`..`l11_*.py` | the eleven legs, each re-runnable |

Spend to date: **$5.61** across ~450 DataForSEO calls. Balance was $38.35 at the start.

---

## 3. How to re-derive any number in this doc

Every figure is reproducible. Legs are independent; raw responses are cached on disk and
a re-run costs nothing unless the cache is cleared.

```bash
cd expansion_research/highstreet_2026-09-10
python l1b_autocomplete.py      # FREE  discovery, Google Autocomplete, 176 trades
python l2_volumes.py --dry      # FREE  shows what would be priced and the cost
python l2_volumes.py            # PAID  Google Ads volume, ~$0.09 per 1000 keywords
python l4_serp.py               # PAID  352 SERPs, $0.002 each
python l5_sitemaps.py --crawl   # FREE  rival sitemaps
python l5_sitemaps.py --match   # FREE  rival page inventory per niche
python l6_containment.py        # FREE  our own 2,560 posts vs the 176 trades
python l7_verdict.py            # FREE  the trade-name verdict table
python l8_mechanics.py          # FREE  classify the 2,017-trade universe
python l9_mechanic_demand.py    # PAID  measured demand per mechanic, ~$0.10 each
python l10_page_plan.py         # FREE  questions to page subjects
python l11_page_split.py        # PAID  79 SERPs, decides the page splits
```

**Set `DATAFORSEO_ABORT_AT` above the default $5.00/day for any paid leg.** The config
permits an interactive override; sub-agents must never set it themselves.

---

## 4. The rules this program runs under

These are not style preferences. Each one is the conclusion of a measurement.

1. **A page is a mechanic, never a trade.** 157 of 176 trades have no demand under their
   own name. A trade page would be a page nobody asks for.
2. **A page owns every phrasing Google treats as the same question.** Page splits were
   decided by fetching a live SERP for each candidate and merging any two sharing four
   or more of the top ten. 79 candidates became 56 pages. The threshold was calibrated
   on two hand-checked pairs: "vat on second hand cars" against "vat on used cars"
   shared 6 of 10; "vat on takeaway food" against "vat on hot food" shared 7 of 10 with
   an identical top result.
3. **The covers list is binding.** Every pick in `picks/<site>.jsonl` carries a `covers`
   array. Those phrasings must appear naturally in the page, in headings, body and FAQ.
   A writer who thinks a covered phrasing deserves its own page is wrong, and splitting
   it would put two of our pages into one result set. That is cannibalisation and the
   house rule forbids it.
4. **Trades appear in the boundary table and the worked examples, never as a list.**
   See §8.
5. **Coverage over selection still holds, but it applies to mechanics now.** A low
   measured volume sizes the page; it does not veto it.

---

## 5. The build: three waves, 56 pages, 54,640 searches a month

| Wave | Site | Pages | Vol/mo | Why this order |
|---|---|---|---|---|
| 1 | hospitality | 6 | 11,760 | The pilot. Contains the single biggest page in the program and an existing audience to read it against. |
| 2 | generalist | 28 | 22,200 | The largest block. Needs a new VAT pillar built around it. |
| 3 | cross-site sweep | 22 | 20,680 | Nine sites, one to five pages each. |

**Wave 3 is a sweep, not a backlog.** It was originally proposed as "ride along with each
site's next wave". That was wrong: none of those nine sites has a wave scheduled and
several have no state doc to schedule one in, so riding along means never. Those 22 pages
carry 38 percent of the program's demand, concentrated in contractors-ir35 (5,200/mo),
startups-tech (4,590) and construction-cis (4,250). Two pages on startups-tech carry more
demand than nine pages elsewhere.

### 5.1 Wave 1, hospitality (6 pages)

| Page | Vol/mo | Covers |
|---|---|---|
| `vat-on-food` **pillar** | 6,640 | 9 phrasings: food, takeaway, restaurants, hot, cold, supermarket, pub food, food and drink |
| `alcohol-duty` **pillar** | 4,160 | 4 |
| `machine-games-duty` **pillar** | 390 | 1 |
| `tronc-scheme` **pillar** | 240 | 1 |
| `is-there-vat-on-dog-food` | 220 | 2 |
| `excise-duty-alcohol` | 110 | 1 |

### 5.2 Wave 2, generalist (28 pages)

The generalist becomes a **VAT pillar** plus three standalone pillars: the motor trade,
cash basis, and employing someone at home. Full list in `picks/generalist.jsonl`. The
five biggest:

| Page | Vol/mo |
|---|---|
| `insurance-premium-tax` | 5,390 |
| `vat-exemption` | 3,390 |
| `nanny-tax` | 3,070 |
| `cash-basis` | 2,680 |
| `vat-on-second-hand-cars` | 1,550 |

**Four picks need a PREP decision before briefing**, flagged here so they are not written
blind: `tax-on-life-insurance-premium` (likely non-UK residue from the pricing pass),
`nanny-tax-payroll-services` (a competitor service term, not a guide topic),
`retail-hospitality-and-leisure-relief-scheme` (business rates relief, arguably belongs
on hospitality), `northern-ireland-retail-movement-scheme` (real UK topic under the
Windsor Framework, but confirm it is our audience).

### 5.3 Wave 3, cross-site sweep (22 pages)

contractors-ir35 5 · construction-cis 4 · ecommerce 3 · startups-tech 2 · Solicitors 2 ·
Property 2 · charities 2 · digital-agency 1 · Medical 1.

Each site keeps its own `house_positions` and its own cannibalisation audit. The sweep
shares the conductor and the three judgment gates, not the site-level PREP.

---

## 6. PREP requirements

### 6.1 Cannibalisation

`NETNEW_PROGRAM.md` §4 warns that token-Jaccard breaks on novel topical clusters. **Ours
are exactly that case**: pages are named by mechanic, existing pages are named by trade
and topic, so they share few tokens and the static check will return false neighbours.
Use the reasoning route, seeded with `containment.json` from leg 6, which already lists
every existing estate page matching each trade.

Known overlap to resolve before briefing: 37 of the 176 trades already have a page
somewhere on the estate. Those are deepen-or-link decisions, not new pages.

### 6.2 House positions — the real gate

This is where the time goes and where the risk lives. Generalist's `house_positions.md`
is 414 lines and mentions VAT 51 times, which is nowhere near enough to underwrite 28
pages of VAT mechanics. **Get one anchor wrong and it is wrong on 28 pages at once.**

Anchors to lock at Stage 1b, per mechanic. **Every one is a candidate to verify against
primary law, not a locked position.** Nothing in this table has been checked yet.

| Mechanic | Anchors to verify and lock |
|---|---|
| Food VAT boundary | VATA 1994 Sch 8 Group 1 and its excepted items; Notice 709/1 on catering and takeaway; the premises and hot-food tests |
| Alcohol and excise | the 2023 strength-based duty structure; Small Producer Relief and what replaced Small Brewers Relief; draught relief |
| Machine games duty | MGD rates and the Type 1 / Type 2 split |
| Troncs | the tronc conditions for NIC treatment; the Employment (Allocation of Tips) Act 2023 |
| VAT exemption, general | Sch 9 groups; the partial exemption de minimis limits and the standard method |
| Zero rating | Sch 8 groups; printed matter; children's clothing by size |
| Cash basis | the current entry and exit thresholds after the 2024 changes; interaction with capital allowances and loss relief |
| Motor trade | the input tax block on cars; the margin scheme for second-hand vehicles; leased-car 50 percent restriction |
| Household employer | PAYE registration for a domestic employer; the Employment Allowance position for household employers |
| Insurance premium tax | the standard and higher IPT rates and which supplies attract each |
| CIS | deduction rates; gross payment status conditions; the domestic reverse charge scope |
| Retail schemes | the point of sale, apportionment and direct calculation schemes and their turnover limits |
| R&D | the merged scheme and ERIS, and the rates that replaced SME and RDEC |
| Agricultural property relief | the combined BR/APR allowance cap from April 2026 and the 50 percent rate above it |
| Creative reliefs | Theatre Tax Relief rates post-2025 |

Cross-check against the estate's existing ground-truth memories before drafting: the
FA 2026 rates, the BR/APR £2.5m cap, employer NIC at 15 percent, dividend rates 2026/27.

### 6.3 The brief schema extension

The brief format already has a **Target queries** section. It must now carry the pick's
`covers` array verbatim, under a heading that says these are required phrasings, not
suggestions. This is the mechanism that makes one page rank for nine queries, and it is
what stops a writer deciding mid-draft that hot food deserves its own page.

Slugs in `picks/*.jsonl` are derived from the head query and are **provisional**. Set the
final slug editorially at Stage 1.

---

## 7. Calculators — a separate track

Calculators are components, not blog pages, and do not run through the net-new engine.
Copy Property's calculator pattern. Demand is measured, from the same corpus:

| Tool | Vol/mo | Verdict |
|---|---|---|
| Nanny tax, gross to net | 4,070 | **Build first.** Seven times the next, a genuinely awkward calculation, and the audience is families who have accidentally become PAYE employers. |
| Alcohol duty | 560 | Build. The 2023 strength bands are fiddly. |
| VAT partial exemption | 550 | Build. The de minimis test is the most misapplied calculation in small-business VAT. |
| Insurance premium tax | 490 | Build. Trivial arithmetic, non-obvious rates. |
| R&D tax credits | 290 | Build, on startups-tech. Most calculators still show pre-merger rates. |
| Employment status checker | 360 | **Do not build.** HMRC's CEST owns the query and gives an answer HMRC stands behind. A rival version invites being wrong about someone's status. |

Sequence the nanny calculator **with** the household-employer pages, not before them. The
tool needs the pages around it to be found at all.

---

## 8. Page anatomy

How one page carries nine questions without listing trades. Worked on `vat-on-food`.

| Section | Content |
|---|---|
| H1 | The dominant phrasing verbatim, not a cleverer version of it |
| First 60 words | The answer, before any preamble. Someone who reads only this leaves correct, and it is the passage a language model lifts |
| The rule | The actual rule with its statutory source, cited so it is checkable |
| **Boundary table** | **Where the trades live.** Two columns, and each trade sits on its side: a baker's cooling loaf against a baker's hot pasty, a butcher's raw joint against a butcher's hot chicken, supermarket cold sandwich against café eat-in, pub food against pub takeaway. Answers hot, cold, takeaway, restaurant, supermarket and pub in one glance |
| Worked examples | Two or three with real figures, each named to a trade. A £4.20 hot pasty and its VAT, the same pasty cold |
| What people get wrong | The errors HMRC actually challenges. The section no competitor writes |
| FAQ block | The remaining covered phrasings, answered in the words people typed. 10 to 14 FAQs per the six-check floor |
| Calculator | Only where the answer is computable. On this page, no |
| Links out | Sibling pages in the pillar, and the estate's existing trade pages |

Body length per `NETNEW_PROGRAM.md` §5.2: pillar 3,500-4,500 body words, non-pillar
2,800-3,500. Six-check floor applies unchanged.

---

## 9. Traps this research hit, so the next leg does not repeat them

Every one of these was caught by auditing output rather than trusting it. Four of them
would have silently corrupted the conclusions.

1. **Wrong endpoint.** `keyword_ideas` returns category-level ideas, not keywords
   containing the seed. A butcher pull came back with 8 of 700 keywords mentioning
   butchers. **$2.50 wasted.** Use `keyword_suggestions` for contains-phrase, or
   Autocomplete for discovery.
2. **Trade surnames.** "kerry butcher accountancy services" and "carpenter box
   accountants worthing" priced as niche demand. Butcher, Baker, Mason, Taylor, Fisher,
   Barber, Farmer and Chandler are surnames as well as trades. The tell is a non-connector
   word adjacent to the trade noun.
3. **Tax homonyms.** "post office tax car" is people taxing a vehicle at the post office.
   "tax converter uk" came from a translator seed. Both carried large volume and would
   have dominated their niches.
4. **Product vocabulary.** Requiring a term to repeat the trade noun threw away
   "is there vat on newspapers" and "is there vat on laundry services", because the
   product is not called the same thing as the trade. `vocab.tsv` exists for this.
5. **Adjacent mechanics wearing the same words.** Duty-free shopping inside "alcohol
   duty"; the disabled-persons relief inside "vat exemption". Per-mechanic exclusions in
   `l9_mechanic_demand.py`.
6. **Google Ads fails the whole task, not the row.** One non-ASCII keyword, or one
   keyword over ten words, silently zeroes a 1,000-keyword batch and returns cost 0.
   Screen before sending (`ads_priceable()`).
7. **The same-day duplicate guard returns nothing, silently.** `CostTracker` refuses a
   call already made today. In leg 11 that produced six empty SERPs, and an empty result
   set can never merge, so each became its own page and the count was inflated to 61.
   Retry at a different depth and never cluster on an empty result.
8. **`api_cost_log.site_key` is a foreign key to `public.sites`.** Pass `site_key=None`
   for research that is not a site, or every paid call 409s.

---

## 10. Deliberately not in scope

- **A page per trade.** No demand. See §1.
- **Matching the rival's 2,107 pages.** 884 of those trades have no tax mechanic of their
  own; pages for them would be the thin content the quality rule exists to prevent.
- **Splitting phrasings into separate pages.** Google returns the same results for them.
- **An employment status checker.** §7.
- **The 30 mechanics as a fixed taxonomy.** Two of the labels measured something broader
  than their name: "health-exemption" was seeded "vat exemption" and captured partial
  exemption, charity and new-build alongside medical; "cash-business" was seeded
  "cash basis" and measured cash basis accounting. The pages that came out are correct
  and are hosted correctly; only the mechanic labels are loose.

---

## 11. Open decisions

**All three decisions below were CLOSED on 2026-09-11. Waves 1 and 2 are BUILT and
committed to `main`. Nothing is deployed.** See §13 for what actually shipped.

1. ~~**Wave 1 gating.**~~ **CLOSED: full parallel.** Owner ruled waves 1 and 2 run
   together. The evidence supports it after the fact: hospitality took **9 clicks and
   2,005 impressions across 35 URLs in 90 days**, so a 90-day pilot read would have been
   reading noise and could not have gated anything.
2. ~~**The four flagged generalist picks.**~~ **CLOSED at the Stage 1b gate.**
   `tax-on-life-insurance-premium` dropped (suspected non-UK residue).
   `nanny-tax-payroll-services` dropped (competitor service term, not a guide topic).
   `retail-hospitality-and-leisure-relief-scheme` moved to hospitality and rewritten as a
   "the scheme ended" page. `northern-ireland-retail-movement-scheme` dropped: NIRMS is a
   Defra SPS and "Not for EU" labelling scheme, **not a VAT matter at all**.
3. ~~**Wave 3 site state docs.**~~ **CLOSED: this was already false when written.** All
   nine sweep sites DO have a `STATE.md`: contractors-ir35, construction-cis, ecommerce,
   startups-tech, `docs/solicitors/`, `docs/property/`, charities, `docs/agency/`,
   `docs/medical/`. Note `docs/digital-agency/` exists as a separate directory with no
   STATE.md; the live one is `docs/agency/STATE.md`.

### New open decision, for the owner

4. **Deploy ordering, generalist.** Production is `18b4f25f`, pre-port. `main` now carries
   the completed six-phase design port AND 22 wave-2 assets. Deploying once ships a full
   redesign and 22 content changes together and **nothing afterwards is attributable**.
   Recommended: walk the redesign, deploy the redesign alone, let it settle, then deploy
   content. Deploy is owner-triggered either way and nothing here changes that.

---

## 12. Execution notes

- **Opus sub-agents are approved** by the owner for the build, one per page, in lanes,
  per the standing content rule. The conductor keeps sequencing and the three judgment
  gates: HP-lock review, drift triage, deploy.
- **Start the wave in a fresh session.** The research session that produced this doc
  carries a large context that the build does not need, and `NETNEW_PROGRAM.md` expects a
  fresh session per bucket.
- **Deploy is owner-triggered**, always, and nothing here changes that.
- **Register every new page in `monitored_pages`** at WRAP, and submit to IndexNow only
  on the owner's word in that turn.

---

## 13. What was built, 2026-09-11

Waves 1 and 2 ran in one session, full parallel, on the owner's ruling. **28 assets on
`main`. Nothing deployed.**

| | Planned | Built | Extensions of live pages | Dropped |
|---|---|---|---|---|
| Wave 1, hospitality | 6 | 4 new | 2 | 1 |
| Wave 2, generalist | 28 | 18 new | 4 | 5 |
| **Total** | 34 | **22 new** | **6** | **6** |

### Why 34 became 28, and why that is an improvement

The cannibalisation audit (reasoning route, seeded from `containment.json`, NOT token
Jaccard) found that **six picks duplicated pages the estate already owned**. Every one of
those live pages was well under pillar depth (1,300 to 3,200 body words) with near-zero
impressions, so extending them beat publishing a competing URL. The biggest example is
`vat-on-food` at 6,640/mo: published as specified it would have become a **fourth**
food-VAT page on a 19-post site, competing with `vat-on-takeaway-food.md`, which already
held the five hot-food tests. It instead took that page from 2,210 to 4,320 body words and
the head term with it.

Five further picks were CONFLICTS between two of our own new pages and were adjudicated to
a single owner, with the loser's `covers` phrasing folded into the winner.

### Stage 1b, the gate that justified itself

Every §6.2 anchor was verified against primary law. Four findings changed page content
rather than just citations:

1. **Cash basis turnover thresholds were ABOLISHED, not raised.** ITTOIA 2005 s.25A and
   ss.31A-31D omitted from 6 April 2024 by FA 2024 Sch 10 paras 4, 6, 47. The common
   "raised to £300,000" line is wrong. This would have been wrong on five pages at once.
   **HMRC's own BIM70010 is stale** and still says "election" and "£150,000". Never cite it.
2. **Employment Allowance is NOT available to a nanny employer** (NICA 2014 s.2(3), narrow
   s.2(3A) carve-out only). Nanny-payroll marketing routinely says the opposite, so this is
   a differentiator, not just a correction.
3. **The PAYE registration trigger is £96 a week** (the secondary threshold), not the LEL.
   The 2026/27 LEL of £6,708 is a different number for a different purpose.
4. **Partial exemption has TWO different 50% tests.** De minimis: exempt input tax not over
   £625/month average AND not over 50% of TOTAL INPUT TAX. The simplified tests use the
   value of EXEMPT SUPPLIES against all supplies. Conflating them is the misapplication.

**Three proposed corrections were checked and REJECTED**, which matters as much as the
accepted ones: two gov.uk URLs reported dead both return 200, and HP 21.4's point-of-sale
wording was already correct. Applying them would have broken working citations and
introduced an error into a house position.

### House positions corrected (commit `babea2de`, and in the wave-1 commit)

- `rates_ledger.json`: three alcohol rates were stamped `applies_from: 2023-08-01`. Those
  are the **1 February 2026** rates. Duty uprates on 1 February, so they expire inside
  2026/27 on 1 Feb 2027.
- **HP 19 carried NO multiplier figures at all** while pages asserted five of them from a
  worker-rules summary, two of which appeared in no source. All five verified at the gov.uk
  effects publication Table 2.A and locked: RHL 38.2p / 43p, non-RHL 43.2p / 48p,
  high-value 50.8p, RHL exactly 5p below its national equivalent.
- HP 16: a 20-litre container alone does NOT qualify for draught relief; it must also
  connect to a qualifying dispense system (F(No.2)A 2023 Pt 2 Ch 2).
- HP 7: statutory anchor added (SI 2001/1004 Sch 3 Pt X para 5). The manual is practice.
- HP 8: main Tips Act duties from 1 Oct 2024, but s.9 from 31 Jul 2023.
- Generalist LEL back-patch **cancelled**: £6,500 (2025/26) and £6,708 (2026/27) are both
  right for their own year; the dentists figure was early, not stale.
- Generalist 21.1: VAT Notices 718 and 718/1 are **withdrawn**; re-pointed.

### Method deviations, deliberate

- **No per-lane worktrees** (NETNEW §2.3). Each writer touched exactly one file and no
  agent was permitted to run git, so the worktree machinery bought nothing and its known
  drifts (commits landing on lane branches) were pure downside.
- **Stage 1 and Stage 2 collapsed into one brief pass.** The expensive half, statutory
  verification with live-URL checks, was already done and locked at Stage 1b.
- **`sites/generalist.json` left unchanged.** An earlier plan proposed A/B/C lanes; the
  config carries a standing owner ruling of 2026-07-08 against them, and batch size 1 with
  parallel sub-agents already IS the parallelism.

### Verified against built output, not just source

Both sites build clean (hospitality exit 0, 77 pages; generalist exit 0, **836 pages, up
from 818**, exactly the 18 new). All 28 assets render. FAQ JSON-LD count equals the
frontmatter `faqs` count on every hospitality page. The corpus-wide
`first-sentence.test.ts` guard passes, which is the check that would have failed all 475
generalist posts on a single bad opening. Frontmatter lint clean on every new file.

Defects caught and fixed rather than shipped: two metaDescriptions over the 155-character
site limit, and **15 new pages carrying an `image:` key pointing at an asset that does not
exist** (invisible to the build, but the og:image 404s; omitting the key falls back to the
generated OG image).

A brief error was caught by a writer rather than shipped: the alcohol-duty brief priced a
12% ABV wine at the 3.5-8.5% band rate. 12% ABV sits in the 8.5-22% band.

### Still open

- Wave 3, the 22-page cross-site sweep, is NOT built. Note that `construction-cis` (4
  picks) and `dentists` both had design ports in flight on 2026-09-11, so the sweep must
  check port state per site before it starts.
- The calculator track (§7) is NOT built. The nanny calculator sequences WITH the
  household-employer pages, which now exist.
- Deploy ordering, §11 decision 4.
