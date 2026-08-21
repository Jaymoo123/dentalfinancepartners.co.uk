# PACK mees-epc-rules-what-your-landlords-think (page 2, agents1 cluster)

Net-new page pack, assembled 2026-08-21 from `briefs/property/agents/DOSSIER.md` (FROZEN 2026-08-21)
and its named source files. Follows `docs/_engines/REWRITE_PROGRAM.md` §9.5, eight sections in
reading order, same format as `briefs/property/rural-estates/packs/`.

**This pack is the writer's whole world.** Nothing outside it is in scope. Anything you discover that
looks like it should be in the page but is not in this pack goes back as a delta to
`briefs/property/agents/notes/delta.md`, never into the page.

---

## 1. Target and permission level

- **Page:** NET-NEW, slug **`mees-epc-rules-what-your-landlords-think`** (fixed, do not vary)
- **URL:** `/blog/landlord-tax-essentials/mees-epc-rules-what-your-landlords-think`
- **Category:** `landlord-tax-essentials` (frontmatter `category: "Landlord Tax Essentials"`, resolved
  to the URL prefix by `slugifyCategory()` in `src/lib/blog.ts`; confirmed live category)
- **Middleware map entry required.** Add to `SLUG_TO_CATEGORY_MAP` in `Property/web/src/middleware.ts`:
  ```ts
  "mees-epc-rules-what-your-landlords-think": "landlord-tax-essentials",
  ```
- **Grade:** NET-NEW. Graded **C** in DOSSIER.md §7: relationship value, zero measured keywords
  assigned. That grade is a statement about measurable return, not about the quality bar. A* or don't
  ship.
- **Fixed constraints:** the slug above; the category above; zero em-dashes; UK English; no pricing;
  no service offer of any kind.

**The one-line reason this page exists.** `_language_spec.md` §3: "W11 holds p5 while stating 'the
minimum standard for privately rented homes in England and Wales will rise from EPC E to the
equivalent of EPC C by 1 October 2030' as confirmed law, with a £10,000 cap and a £30,000 maximum
fine, **and two more pages in that top ten do the same**." Three pages in the MEES top ten state an
unenacted standard as settled law. Our house position is that the enacted floor is EPC E with a
£3,500 cost cap. **This page's entire value is being correct where the market is wrong, in the voice
of the person a landlord asks.** Hard rule 12 names MEES as the test case for the enacted-versus-
announced split and calls being right here "free differentiation".

---

## 2. Equity register

**ZERO.** Net-new page, no prior Google or Bing equity, nothing to protect.

**But there is equity nearby that this page can damage, and protecting it is a hard constraint.**
`mees-regulations-landlords` is a Wave 11 net-new page registered 2026-08-21 and **armed to
2026-11-19** (DOSSIER.md §3, HARD FROZEN). It owns `mees regulations` at 720/mo. This page must not
compete with it, must not restate its content, and must not be written in a way that makes a search
engine choose between them. See §5.1 and §6.3.

---

## 3. The market's keyword set

Source: `briefs/property/agents/ledger.csv` (cluster ledger, 39 rows). Volumes are Google Ads UK
`search_volume` via DataForSEO, pulled 2026-08-21. Peer positions are DuckDuckGo top-10 from the same
day and are **not Google positions** (DOSSIER.md §11.1). Nothing below contradicts the ledger's
bucket assignments.

| keyword | vol/mo | best peer pos | peer domain | in our copy |
|---|---|---|---|---|
| epc c 2030 landlords | 0 | n/a | n/a | yes, myth table |
| landlord epc exemptions | 0 | n/a | n/a | yes |
| mees cost cap | 0 | n/a | n/a | yes |
| mees regulations | 720 | 1 | wrigleys.co.uk | no, declined, see coverage note |
| epc requirements for landlords | 720 | 2 | lawhive.co.uk | no, declined |
| minimum energy efficiency standard | 30 | n/a | n/a | no, declined |
| epc rules rental property | 0 | n/a | n/a | no, declined |

**This page is assigned NO measured keywords.** DOSSIER.md §7 row 2: "none (all MEES heads bucketed
to frozen pages); myth-table forwardable". §9 ledger: "Page 2 declines all heads, coverage note
required."

**The three declined heads and who holds them, which the coverage note must name explicitly:**

- **`mees regulations` (720/mo)** and **`minimum energy efficiency standard` (30/mo)** belong to
  **`mees-regulations-landlords`**, HARD FROZEN, armed to 2026-11-19.
- **`epc requirements for landlords` (720/mo)** and **`epc rules rental property`** belong to
  **`mees-regulations-landlords`** and **`energy-performance-certificates-epc`**.

The three zero-volume myth-shaped terms this page does carry are **shared** with the
`epc-c-2030-minimum-energy-efficiency-landlord-spending-cap` sibling, **which is linked and never
edited** (DOSSIER.md §9, and §3's blanket no-edit rule).

**Do not chase a head to compensate for the empty column.** The measured return on this page is
approximately zero by design; its return is relationship value and forwardability, which DOSSIER.md
§10 records as explicitly unmeasurable in advance. Writing it to rank would break the frozen sibling
without gaining anything.

---

## 4. Competitor teardown extracts

Source: `_language_spec.md` §1 measured table and §4 do-not-copy list, measured 2026-08-21 from live
HTML.

### 4.1 W10 wrigleys, p1 on the MEES query, and the worst model in the set

`wrigleys.co.uk/news/property/epcs-and-mees-what-you-need-to-know/`. Measured: **3,617 words**, mean
sentence **24.2** (longest in the set), **Flesch 38.0**, **"you" 0.3 per 1,000, the lowest measured
anywhere in the pass**, **2 headings in 3,617 words**, 20 pound figures, 14 percentage figures,
3 em-dashes, 1 table.

`_language_spec.md` §4, measured findings, quoted:

- **"It is stale to the point of being wrong."** Its own body says *"To see the latest guidance for
  2023, please see our article: Government abandons new EPC targets"*, and its footnotes discuss the
  Climate Change Act 2008 amendment *"likely to be amended in June 2019"*.
- **"Zero current cap figure. The £3,500 residential cost cap is not on the page at all."** It is
  written for commercial leases: *"let commercial properties with an EPC rating of F or G"*.
- Academic footnote apparatus: *"[2] The Energy Performance of Buildings (England and Wales)
  Regulations 2012 (2012/3118)."* That is exactly the citation grammar hard rule 1 removes.

The verdict to carry into this page: **"Its p1 is a domain-authority and age artefact. The MEES SERP
is the weakest of the six: p1 is stale, p5, p9 and p10 assert an unenacted 2030 standard as law.
Treat the whole MEES top ten as an opportunity, not a model."**

### 4.2 W11 lettingaproperty, p5, good shape and unsafe facts

`lettingaproperty.com/landlord/blog/epc-certificates/`. Measured: 2,348 words, mean sentence 16.9,
Flesch 36.2, **13 of 22 headings question-shaped**, "you" 11.1 per 1,000, citations 0.0, notice-names
6.8, **26 em-dashes (most in the set)**, **26 pound figures**.

**Take:** its question-heading discipline, and its *"Key EPC Requirements for Landlords at a Glance"*
list, which `_language_spec.md` §3 names as the model for this page's enacted-figures block. Also
take its habit of putting the number in the reader's verb, per P5: *"Minimum rating required: Band E.
Properties rated F or G cannot legally be let without a formally registered exemption."*

**Do not take:** its central claim, *"The Band C requirement is back and now confirmed"*, which is
false; its £5,000 penalty figure and its £30,000 maximum-fine figure, neither of which is locked in
our house positions; its 26 upgrade-cost estimates, which `_language_spec.md` §4 records as
"upgrade-cost estimates we have no basis for"; and its 26 em-dashes.

### 4.3 The register model, borrowed from the RRA half of the cluster

No MEES competitor occupies the agent register, so the model comes from W8 heybrb
(`_language_spec.md` P2, P3, P6): the labelled one-line answer as its own H2; the scenario device (a
landlord question in quotation marks, then the answer in the agent's voice); the explicit negative
list; and *"your landlord client"*, the one phrase in 19,321 competitor words that addresses an agent
about the landlord they act for.

---

## 5. Ours, side by side

Nearest existing pages, all FROZEN, all under `/blog/landlord-tax-essentials/`:

| Slug | Status |
|---|---|
| `mees-regulations-landlords` | Wave 11 net-new, registered 2026-08-21, **armed to 2026-11-19**, HARD FROZEN. Owns `mees regulations` (720/mo). |
| `epc-c-2030-minimum-energy-efficiency-landlord-spending-cap` | Wave 7, armed through the build window. Frozen. |
| `energy-performance-certificates-epc` | Holds the EPC-requirements family with the MEES page. Frozen. |
| `epc-certificate-cost-uk` | Wave 11, armed to 2026-11-19. Frozen. |

For scale, our four measured RRA pages sit at a median of 2,628 words, Flesch 28.1, "you" 0.0 per
1,000 and 11.6 citations per 1,000 (`_language_spec.md` §1). Every one of the eleven winners is
easier to read than every one of them. This page must not read like them.

### 5.1 Belongs-to-sibling: heading themes this page must not duplicate

Read from the live content files on 2026-08-21. **These pages are linked and never edited**
(DOSSIER.md §3 blanket rule). Their H2 themes are off limits as this page's subject matter:

**`mees-regulations-landlords`** owns: the rule as it binds you today; what "sub-standard" means and
when MEES bites; the two lawful routes with an F or G property; **the £3,500 cap arithmetic**; **the
exemption classes, their evidence and their durations**; **the PRS Exemptions Register in practice**;
**enforcement and penalties, the regulation 40 ladder**; what is enacted and what is only consulted
on; **how MEES spend, grants and penalties are taxed**; getting the compliance sequence right.

**`epc-c-2030-minimum-energy-efficiency-landlord-spending-cap`** owns: the enacted current state, EPC
E plus the £3,500 cap; the exemption framework; the policy aspiration and why EPC C 2030 is not yet
law; compliance posture; planning position for the trajectory; **tax-side treatment of
energy-efficiency spend**; what happens if you just wait; common misconceptions; a worked example over
a portfolio of eight properties.

**That is a heavy overlap and the writer must respect it.** This page does **not** re-run the cap
arithmetic, the exemption classes, the register mechanics, the penalty ladder, the grants detail or
the portfolio worked example. It states the enacted figures once, in a glance list, and links.

**What is genuinely this page's own ground, and nobody else's:**

1. **The myth table.** A side-by-side of what a landlord walks in believing against what the law
   actually says. Neither sibling has one; both are written at the landlord, not at the agent holding
   the conversation.
2. **The 21 January 2026 government response, quoted with the primary-legislation line.** Both
   siblings were written on 2026-05-24 and 2026-08-15 respectively and neither carries the detail
   house_positions added on 2026-08-21: the dual metric, the "up to £10,000" figure, the ten-year
   exemption validity, the 1 October 2029 grandparenting date, and the government's own statement
   that it must first seek new powers by Act of Parliament.
3. **The answer script** for the landlord who arrives asking "do I need to spend £10,000".
4. **The agent register.** Nothing in the MEES top ten occupies it. `_language_spec.md` §3: "Agent
   register plus the enacted-versus-announced split is a position no domain in the MEES top ten
   currently holds, and it is exactly the thing an agent needs when a landlord arrives quoting a
   headline."

---

## 6. Whitespace and content mandate

Shape, from `_language_spec.md` §3, explainer 3 row: **enacted-now block first, policy-commitment
block second, explicitly labelled**; W11's "at a glance" list of the enacted figures; **FAQ of 5**.

### 6.1 Required structure, in order

1. **A labelled one-line answer** (hard rule 4). Two sentences maximum before it. The answer, in
   substance: today the property has to reach EPC E and the landlord's spending is capped at £3,500;
   EPC C by 2030 is government policy and there is no law behind it yet.
2. **The myth table** (this is the page's one permitted table, hard rule 13). Three columns: what your
   landlord read, what the law says today, what you tell them. Rows per §6.2.
3. **H2: what is enacted today**, with the at-a-glance list of the enacted figures.
4. **H2: what the government has announced and not yet legislated**, explicitly labelled as policy.
5. **The scenario device** (hard rule 9), at least three landlord questions in quotation marks
   answered in the agent's voice, including "do I need to spend £10,000" verbatim.
6. **The "what has not changed" block** (hard rule 5), explicit and by name. Mandatory.
7. **One short tax section**, the capital-versus-revenue hook (§6.2(e)). Short. The depth belongs to
   the siblings.
8. **FAQ of 5**, each a near-verbatim query (hard rule 15).
9. **Close on the reader's next action.** No service offer, no CTA template.

### 6.2 Content mandate, with the exact locked figures

Every figure below is from `docs/property/house_positions.md` §26.3, §26.7 and §26.8 as patched
2026-08-21. Anything not locked there is declined, not guessed.

**(a) The enacted position, stated once and stated flatly.** The 2015 private rented property energy
efficiency regulations prohibit letting a **sub-standard** domestic property, meaning **EPC F or G**,
without a registered exemption. The **EPC E floor has applied to new tenancies since 1 April 2018 and
to all continuing lets since 1 April 2020**. The **landlord cost cap is £3,500 including VAT**, above
which an exemption can be registered. The cap sits in **regulation 24 as amended in 2019**, and the
exemption registration is regulation 25. (Correction of record, so the writer does not reintroduce it:
this was previously mis-cited as regulation 25(2) and was fixed at Wave 11 on 2026-08-15. Neither
regulation number belongs in prose; see §7 criterion 3.)

Also true and worth one clause, because it kills the "nothing has moved since 2019" line: **the 2015
regulations were amended on 1 May 2026** by the Renters' Rights Act consequential instrument, which
deleted the Section 21 reference from regulation 9. **It did not touch regulation 24 or the band E
standard.** A title search on 2026-08-21 confirmed **no other 2025 or 2026 amendment and no instrument
imposing an EPC band C minimum.**

**(b) The myth table, row by row.** Each row is a real thing landlords arrive believing, and the
"what the law says today" column is the locked position:

| What your landlord read | What the law says today |
|---|---|
| "All rentals must be EPC C by 2030" | Not enacted. There is no instrument. The floor is EPC E. |
| "The cap has gone up to £10,000" | Not enacted. The cap is **£3,500 including VAT**. £10,000 is a consulted-on figure. |
| "EPC C is required for new tenancies from 2028" | Not enacted, and not what the current policy even says; the current response works to 1 October 2030 with grandparenting before 1 October 2029. |
| "The government confirmed it, I read it on gov.uk" | A gov.uk news page dated **30 April 2026** does say "By 2030, all privately rented homes must achieve EPC rating C or better". It is policy. The government's own formal response says the powers do not exist yet. |
| "So I can ignore EPC entirely" | No. EPC E binds now, and letting an F or G without a registered exemption is unlawful today. |

**Do not add rows that assert a figure not locked in house_positions.** In particular, **no penalty
figures on this page**: the enforcement ladder is the frozen MEES sibling's content and no penalty
number is locked in the sections that govern this page. W11's £5,000 and £30,000 figures are not ours
to repeat.

**(c) The 21 January 2026 government response, which is this page's strongest single paragraph.**
The government response to "Improving the energy performance of privately rented homes", updated
**21 January 2026**, sets out the policy: compliance **by 1 October 2030**; new **dual metrics**
(fabric first, then heating system or smart readiness); an investment cap of **"up to £10,000"**;
**ten-year validity** for the revised cost-cap, property-value and negative-impacts exemptions; and
**grandparenting for a property that achieves EPC C before 1 October 2029**.

**And then the line that makes the whole page worth publishing:** the response itself states the
government **"will seek new powers by Act of Parliament"** and only then lay the secondary
legislation, **"with the aim of it coming into force in 2027"**. House_positions §26.3 spells out why
this matters: "primary legislation does not yet exist, so it is not law and the government says so."
That is stronger than "not yet enacted". Write it in the agent's voice: the government has said what
it wants, and has also said it cannot make it a rule until Parliament gives it the power.

Every item in this paragraph is labelled policy in the same sentence it appears in (hard rule 6 and
hard rule 12). No indicative-mood "must" attaches to any of it.

**(d) The answer script: "do I need to spend £10,000?"** This is the question the page is named for
and it deserves its own passage in the agent's voice. The honest answer has three parts and no
hedging: no, not today, because the enacted cap is £3,500 and the enacted floor is E; the £10,000
figure is what the government has said it wants when it gets the power to legislate, aimed at 1
October 2030; and a landlord planning capital spend on a G-rated flat this year is making a
commercial decision about a standard that is coming, not complying with one that exists. Say all three.
Then point at the frozen siblings for the planning arithmetic and the exemption routes, which are
their content, not this page's.

**(e) The tax hook, one short section only** (house_positions §26.7, corrected 2026-08-21 at Wave 11
QA against the wording of the HMRC property income manual). The rule: **replacing part of the building
with the nearest modern equivalent is a revenue repair**, and the manual's own worked example is
**single glazing replaced with double glazing**. A like-for-like boiler replacement is likewise a
repair. **Capital treatment is reserved for genuine additions or upgrades beyond the modern
equivalent**: insulation installed where there was none, first-time central heating, extending the
system, or a specification uplift a repair would not deliver. Capital spend adds to the base cost for
capital gains tax rather than being deductible against rent. Government grant receipts under the main
energy schemes **reduce the capital gains base cost**.

**This is the one point on the page an agent can give a landlord that saves them money**, and it is
counter-intuitive enough that people get it backwards: house_positions records that our own text had
double glazing the wrong way round until the 2026-08-21 correction. State it plainly, in two or three
sentences, and link the siblings for the rest. `_language_spec.md` P8 notes that **no winner in the
set touches tax treatment at all**, so this is uncontested ground, but the depth is the frozen MEES
page's, not this page's.

**(f) The "what has not changed" block.** Name them: the EPC E floor itself, unchanged since it
reached all continuing lets in April 2020; the requirement to have a valid EPC before marketing; the
exemptions register as the only lawful route for an F or G; and the fact that none of the announced
policy changes any obligation a landlord has this year. `_language_spec.md` P6 records this device as
the highest-value one for our audience, because most landlord questions an agent fields are about
things that did not change.

**(g) Out of scope, declined explicitly.** The non-domestic and commercial MEES chain (the seven-year
payback test, the absence of a £3,500 cap on the commercial side, the rateable-value-linked penalties)
belongs to the commercial pages, is not in the dossier's frozen scope for this cluster, and is not
mentioned here. Grants eligibility depth, the exemptions register walkthrough, and the penalty ladder
all belong to the frozen siblings.

### 6.3 Do-not-write, quoted (house_positions §26.8)

- "EPC C 2030 / 2028 is now law" (aspirational policy only; no instrument laid; the current floor
  remains EPC E)
- "The landlord cap is now £10,000" (the cap remains £3,500 including VAT; £10,000 is a consulted-on
  figure not yet legislated)
- Any assertion that the 30 April 2026 gov.uk news page's "must achieve EPC rating C or better" is an
  enacted duty
- Any penalty figure for MEES breach (not locked in the sections governing this page)
- Any upgrade-cost estimate for reaching a band (W11 carries 26 of them and we have no basis for any)
- "The Renters' Rights Act 2026" (the Act is the Renters' Rights Act 2025, if it is mentioned at all)
- Anything that restates the frozen siblings' owned content per §5.1

---

## 7. Acceptance criteria

**Writer: Opus. Batch size 1. This pack is the writer's whole world.** Additive scope goes back as a
delta to `briefs/property/agents/notes/delta.md`, never into the page.

1. **Register, per `_language_spec.md` §3, "Explainer 3: MEES law today vs what landlords think" row,
   quoted verbatim:** register **Agent-as-you**; **"you" at 15 or above per 1,000 words**;
   **citation-style references 0 to 1**; **notice-names 5 to 10 per 1,000**; **Flesch 45 or above**;
   **1,400 to 2,000 words**. Plus hard rule 2: **mean sentence at or below 18 words**. For contrast,
   W10 holds p1 at Flesch 38.0, mean sentence 24.2 and "you" 0.3.
2. **"You" is the agent** (hard rule 3). The landlord is "your landlord", "the landlord you act for",
   "your landlord client". The tenant is "the tenant".
3. **Citation-style statute references: 0 preferred, 1 absolute maximum, and never in a heading**
   (hard rules 1 and 8; the batch ceiling is one per 1,000 words and this page's spec row is 0 to 1).
   The regulation numbers in §6.2(a) are given for the writer's accuracy, not for the page: write "the
   2015 energy efficiency regulations" and "the cost cap", not `reg 24`, `reg 25`, `SI 2015/962` or
   `SI 2026/325`. If one instrument must be identified, it goes in **one reference line at the foot of
   the page**.
4. **Question headings at half or more of H2s, phrased as the landlord's question** (hard rule 7).
   W11 runs 13 of 22.
5. **Opens with a labelled short answer**, two sentences maximum before it (hard rule 4).
6. **The myth table is present and is the only table on the page** (hard rule 13), with every "what
   the law says today" cell traceable to §6.2.
7. **Enacted-versus-announced is stated explicitly and labelled in the same block** (hard rule 12).
   The 21 January 2026 response is quoted **with** the primary-legislation line; quoting the policy
   without that line is a QA failure, because the line is the page's entire differentiation.
8. **The "what has not changed" block is present** (hard rule 5) and is a genuine block, not a line.
9. **Figures go in the sentence about what the reader does** (hard rule 10). Keep pound figures on this
   page to the two that matter: **£3,500** enacted, **£10,000** announced. W10 carries 20 pound figures
   and W11 carries 26; both are on the do-not-copy list.
10. **Nothing datable to a week** (hard rule 11).
11. **Every figure matches house_positions §26.3, §26.7 and §26.8 as patched 2026-08-21.**
    Specifically: EPC E floor; sub-standard means F or G; 1 April 2018 new tenancies and 1 April 2020
    all continuing lets; **£3,500 including VAT**; EPC C 2030 not enacted, no instrument laid; £10,000
    consulted-on only; the 21 January 2026 response with 1 October 2030, dual metrics, ten-year
    exemption validity, grandparenting before 1 October 2029, new powers by Act of Parliament, and the
    2027 aim; the 30 April 2026 gov.uk news line as policy only; the 1 May 2026 amendment that deleted
    the Section 21 reference and touched nothing else; and the property income manual position that
    single glazing replaced with double glazing is a repair. **Anything not locked there is declined,
    not guessed.**
12. **No named worked-example persona.** None anywhere in this cluster. Agent-facing second person
    does the work.
13. **Coverage note written**, at exactly this path and filename (equity-gate parser convention: the
    last path segment of the Page line in §1, plus `_coverage.md`):
    **`briefs/property/agents/notes/mees-epc-rules-what-your-landlords-think.md_coverage.md`**.
    Because this page is assigned no measured keywords, the coverage note is the deliverable that
    proves the decline was deliberate. It must name, by keyword and by holding page:
    `mees regulations` (720) to `mees-regulations-landlords`; `epc requirements for landlords` (720)
    to `mees-regulations-landlords` and `energy-performance-certificates-epc`;
    `minimum energy efficiency standard` (30) to `mees-regulations-landlords`;
    `epc rules rental property` (0) to `mees-regulations-landlords`. It must also record that
    `epc c 2030 landlords`, `landlord epc exemptions` and `mees cost cap` are zero-volume and are
    **shared with**, not taken from, the `epc-c-2030-...` sibling, which is linked and not edited.
    Figures and buckets must match `briefs/property/agents/ledger.csv`.
14. **Middleware map entry present** before or with the content commit (§1).
15. **No shared CTA template with any other page in this batch**, and the banned template
    `We can produce a written {noun} for/on your {noun}` must not appear. Close on the reader's next
    action. **No service offer, no pricing, no "how we can help" block inside the body** (hard rule 14).
16. **Links present:** `mees-regulations-landlords`, `energy-performance-certificates-epc`,
    `epc-c-2030-minimum-energy-efficiency-landlord-spending-cap`, and the `/for-letting-agents` hub.
    **No edit to any of them** (DOSSIER.md §3).
17. **Cannibalisation check before ship.** Read `mees-regulations-landlords` end to end and confirm
    this page duplicates none of its H2 subject matter (§5.1). If a section of the draft could sit
    under one of that page's headings without looking out of place, cut it and link instead.
18. **Zero em-dashes, UK English, no pricing.**

---

## 8. Expectation and failure trigger

Per DOSSIER.md §10, stated before the work.

- **Read at 90 days.** No new monitor, cron, alert or notification of any kind. Monitoring is standard
  `monitored_pages` registration at deploy inside the existing weekly detector, nothing else.
- **This page is graded C and is expected to earn close to nothing in search.** It carries no measured
  keywords and it is deliberately not written to take any. DOSSIER.md §10 records agent relationship
  value as explicitly unmeasurable in advance, in the owner's own framing. Do not judge it on
  impressions alone.
- **Success at 90 days** = any impressions at all on the three zero-volume myth-shaped terms
  (`epc c 2030 landlords`, `landlord epc exemptions`, `mees cost cap`), **and** no measurable loss on
  the frozen siblings. The real return read is forwardability and embed and referral attribution
  through the hub.
- **Page-level failure trigger, and it is a different shape from the other pages in this cluster:**
  **if `mees-regulations-landlords` loses Bing rows or GSC impressions over the window, this page
  cannibalised a hard-frozen asset and it is a failure regardless of its own numbers.** That is the
  primary test. The secondary test is the ordinary one: zero impressions of its own at 90 days means
  the myth-table thesis did not earn a surface.
- **Cluster-level failure trigger:** zero Bing rows **and** zero GSC impressions across the whole
  agents1 cluster at the 90-day read means the register thesis is wrong. Do not build Track 2-style
  audience surfaces on this evidence base.
- **Limitations carried forward:** SERP positions are DuckDuckGo, not Google (§11.1); the MEES top ten
  in particular is the weakest of the six SERPs measured and its positions should be re-derived against
  Google before any of them drives a decision beyond language (`_language_spec.md` §6); the keyword
  universe is seed-listed, not exhaustive (§11.2).
