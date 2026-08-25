# PACK rra-2026-whats-in-force-letting-agents (page 1, agents1 cluster)

Net-new page pack, assembled 2026-08-21 from `briefs/property/agents/DOSSIER.md` (FROZEN 2026-08-21)
and its named source files. Follows `docs/_engines/REWRITE_PROGRAM.md` §9.5, eight sections in
reading order, same format as `briefs/property/rural-estates/packs/`.

**This pack is the writer's whole world.** Nothing outside it is in scope. Anything you discover that
looks like it should be in the page but is not in this pack goes back as a delta to
`briefs/property/agents/notes/delta.md`, never into the page.

---

## 1. Target and permission level

- **Page:** NET-NEW, slug **`rra-2026-whats-in-force-letting-agents`** (fixed, do not vary)
- **URL:** `/blog/landlord-tax-essentials/rra-2026-whats-in-force-letting-agents`
- **Category:** `landlord-tax-essentials` (frontmatter `category: "Landlord Tax Essentials"`, resolved
  to the URL prefix by `slugifyCategory()` in `src/lib/blog.ts`; confirmed live category)
- **Middleware map entry required.** Add to `SLUG_TO_CATEGORY_MAP` in `Property/web/src/middleware.ts`:
  ```ts
  "rra-2026-whats-in-force-letting-agents": "landlord-tax-essentials",
  ```
- **Grade:** NET-NEW. A-grade head family. Full freedom of structure, subject to the constraints below.
- **Fixed constraints:** the slug above; the category above; zero em-dashes; UK English; no pricing;
  no service offer of any kind.

**Why this page is graded A and what that does not mean.** It targets the highest-volume family in
the cluster, and gov.uk holds the head. DOSSIER.md §10: "Page 1 will NOT displace gov.uk on the
head." The winnable ground is the explainer-shaped remainder and the document-shaped tail, in a
register nobody in the top ten occupies. Write for that, not for position one.

**The slug says 2026 and the Act does not.** The Act is the **Renters' Rights Act 2025 (2025 c. 26)**.
The slug carries "2026" because that is how the reform is searched and because commencement falls in
2026. This mirrors the grandfathered `renters-rights-act-2026-tax-implications-landlords` slug
(house_positions §26.1). **Body copy must use "Renters' Rights Act 2025" throughout.** See §6.2 for
the one approved corrective form that lets the page place the 2026-phrased query without asserting a
wrong citation.

---

## 2. Equity register

**ZERO.** Net-new page, no prior Google or Bing equity, nothing to protect.

Measured context (DOSSIER.md §2, pulled 2026-08-21). Across all twelve existing RRA pages over 90
days, GSC returned exactly **one** query row: `first-tier tribunal rent increase policy`, 9
impressions, position 10.1, on the Section 13 page. Bing per-page (`GetPageQueryStats`, never
site-wide `GetQueryStats`): Section 13 page 46 impressions across 40 query rows with 2 clicks;
redress page 28 impressions across 9 rows; `a-complete-guide-to-periodic-tenancy` 15 impressions;
tax-implications page 1 impression; the other eight pages zero. This is a genuine entry-point gap,
not an under-converting ranking.

---

## 3. The market's keyword set

Source: `briefs/property/agents/ledger.csv` (cluster ledger, 39 rows). Volumes are Google Ads UK
`search_volume` via DataForSEO, pulled 2026-08-21. Peer positions are DuckDuckGo top-10 from the same
day and are **not Google positions** (DOSSIER.md §11.1). Nothing below contradicts the ledger's
bucket assignments.

| keyword | vol/mo | best peer pos | peer domain | in our copy |
|---|---|---|---|---|
| renters rights act 2026 | 12100 | 1 | wikipedia.org | yes, corrective form only, see §6.2 |
| renters rights act information sheet | 5400 | 1 | gov.uk | yes |
| renters rights act summary | 260 | n/a | n/a | yes |
| renters rights act timeline | 170 | 1 | tenancypilot.co.uk | yes |
| when does the renters rights act come into force | 110 | n/a | n/a | yes, as a question heading |
| renters rights act changes for landlords | 10 | 1 | gov.uk | yes |
| renters rights act commencement dates | 0 | 1 | tenancypilot.co.uk | yes |
| renters rights act 2026 landlords | 0 | n/a | n/a | yes |
| assured shorthold tenancy abolished | 10 | n/a | n/a | yes |
| fixed term tenancy renters rights act | 0 | n/a | n/a | yes |
| periodic tenancy | 2400 | n/a | n/a | no, declined, see coverage note |
| notice period periodic tenancy | 110 | n/a | n/a | no, declined |
| renters rights act periodic tenancy | 50 | 1 | clickinventories.com | no, declined |
| tenant notice to quit periodic tenancy | 20 | n/a | n/a | no, declined |
| property redress scheme | 27100 | 4 | mydeposits.co.uk | no, declined |
| private rented sector database | 1000 | n/a | n/a | no, declined |
| landlord ombudsman | 480 | n/a | n/a | no, declined |
| mees regulations | 720 | 1 | wrigleys.co.uk | no, declined |
| making tax digital landlords | 590 | n/a | n/a | no, declined |

**Every declined row above must be named in the coverage note, by keyword and by the page that holds
it** (§7 criterion 13). Declined rows are declined because a frozen page already owns them
(DOSSIER.md §3 and §9), not because they are unimportant.

**Bing evidence, reported separately and never compared to the Google Ads column** (DOSSIER.md
§11.3). `renters rights act 2026` has a Bing `GetKeywordStats` weekly-impression median of **774.5**.
The document-shaped information-sheet tail runs at roughly 1,400 + 1,111 + 985 + 603 on the same
method. All agent-phrased seeds: zero recorded history. Do not put either method's numbers on the
page; they inform the brief, not the reader.

**Limitation, disclosed:** no DataForSEO Labs harvest was run for this cluster (balance $3.98 after
the volumes pull; harvest deferred per the top-up gate). The universe is seed-listed, not exhaustive
(DOSSIER.md §11.2). Do not invent tail keywords to fill it; a delta list is expected at the 90-day
read.

---

## 4. Competitor teardown extracts

Source: `_language_spec.md` §1 measured table and §2 answer patterns, measured 2026-08-21 from live
HTML across 19,321 words of competitor prose.

### 4.1 W5 tenancypilot, the page to beat, and the structure to take wholesale

`tenancypilot.co.uk/guides/...commencement-dates-the-full-timeline-for/` holds **p1 on "commencement
dates"**, the single highest-signal topic in this cluster. Measured: **2,046 words**, mean sentence
19.3, **Flesch 47.1**, **10 of 15 headings question-shaped**, "you" 17.6 per 1,000, **citations 0.0**,
notice-names 13.6, jargon 2.9, **1 table**, FAQ of 6, **0 pound figures, 0 percentage figures, 0
em-dashes**.

`_language_spec.md` P4 records its structural move and says of it: **"Take W5's structure wholesale
for explainer 1."** Four quotes, which the writer should read as the specification for §6:

- Its two H2s: *"Already in force: the 1 May 2026 reforms"* then *"Coming next: phased provisions (not
  yet in force)"*.
- The conditional rule, stated on the page: *"Because each of these depends on secondary legislation,
  the safest stance is conditional: 'when the database opens, you will need to register,' not 'you
  must register now.'"*
- The commencement-versus-enactment distinction, which no other page in the set explains at all:
  *"Royal Assent makes the text part of the statute book; commencement makes a given section
  operative. Until a section is commenced, it is dormant, it imposes no duties and grants no rights.
  This is exactly why you can correctly say the database provisions are 'in the Act' while also saying
  they are 'not in force yet.' Both statements are true at once."*
- Its caveat on its own table: *"The table below summarises the key milestones. Treat phased items as
  indicative: the Government has committed to them, but the exact go-live dates are confirmed only by
  later regulations."*

**What we do not take from W5:** its named worked-example persona ("Priya", the only named worked
example in the entire winner set) and its datable sentence *"they impose no duties on you on 18 June
2026"*, which is on the do-not-copy list under `_language_spec.md` §4 and hard rule 11.

### 4.2 W8 heybrb, the register model

`heybrb.ai/blog/renters-rights-act-14-day-ai-checklist-letting-agents`, p7 on commencement, is
**the closest register match to our intended audience**. Measured: 2,300 words, mean sentence 15.9,
Flesch 49.0, 8 of 17 question headings, "you" 14.8 per 1,000, **notice-names 18.3 per 1,000, the
highest of anything measured, ours or theirs**, citations 0.0, **10 imperative-opening sentences
against 0 to 3 everywhere else**, FAQ of 6.

Four devices to take, all quoted in `_language_spec.md` P2, P3 and P6:

1. **The labelled one-line answer.** Its first H2 is literally *"The one-line answer"*. None of our
   four existing pages has one; all four open with two paragraphs of scope-setting.
2. **The agent as "you", the landlord as the third party.** *"This is a positive duty, the obligation
   sits with you (or your landlord client) regardless of who drafted the tenancy."* This is the one
   sentence in 19,321 competitor words that occupies our intended register.
3. **The scenario device.** *"A landlord asking 'can I still evict my tenant?', answer: yes, but only
   via Section 8 grounds, which require a specific reason (rent arrears, breach of tenancy, the new
   mandatory grounds)."* A landlord question in quotation marks, then the answer in the agent's voice.
   W8 runs five consecutively and is the only page in the set that does it.
4. **The explicit negative list.** *"What doesn't change on 1 May: existing AST that already have
   valid Section 21 notices served, deposit protection rules, Right to Rent obligations, the Tenancy
   Deposit Scheme adjudication process. Your underlying compliance landscape is the same shape, the
   eviction route changed."*

**What we do not take from W8** (`_language_spec.md` §4): its product frame (roughly a fifth of the
page is AI-tool instruction); its unsourced quantification (*"turn 30 hours of compliance work into
8"*, *"cut the routine drafting work by 60-70%"*), which we have no basis for and must not invent
equivalents of; and its countdown framing (*"As of today, that's 14 days"*), which dates the page to
a fortnight.

### 4.3 The rest of the set, briefly

- **W1 gov.uk overview**, 868 words, Flesch 61.2, "you" 86.4 per 1,000 at the landlord, 0 citations,
  0 tables, no FAQ. First sentence: *"You must follow the correct processes when renting out your
  property."* gov.uk takes seven of sixty tracked slots across the six queries. **That head is not
  contested** (`_language_spec.md` §3).
- **W2 gov.uk information sheet publication page**, 549 words, holds **p1 and p2** on the
  information-sheet query while being a landing page pointing at a 282 KB PDF. DOSSIER.md §11.5: we
  can win the explainer-shaped remainder, not the official-document click. It also proves hard rule
  16: the shortest page in the winner set holds two top-two slots.
- **W3 NRLA hub**, widest spread of any non-government domain, and its numbers are not reliable
  ("£7,000 and £40,00,0" in a headline penalty figure, "Prevening discrimination" in an H2). Take its
  one-topic-per-H2 discipline. Take none of its numbers. Do not adopt first person at its rate (8.8
  per 1,000).
- **W4 Shelter**, tenant-facing, **Flesch 77.2, the easiest page measured**. Its first sentence is
  *"Private tenants have new rights from 1 May 2026."* Nine words, no citation. Our periodic-switch
  page spends 41 words and two citations on the same fact.
- **W6 goodlord and W7 nolettinggo**, the third-person trap, p8 and p9. Do not copy their headings
  ("A structural shift, not an incremental change", "What This Means for Letting Agents"), W6's
  closing rhetorical question, or W7's in-body vendor insert.

---

## 5. Ours, side by side

The four measured RRA pages (`_language_spec.md` §1) and what they say about what to do differently:

| Our page | Words | Mean sent. | Flesch | "you"/1k | Cite/1k | Notice/1k | Visibility |
|---|---:|---:|---:|---:|---:|---:|---|
| `renters-rights-act-rent-increase-section-13-tribunal-route` | 2,317 | 22.5 | 32.5 | 0.9 | **1.3** | **20.3** | 46 Bing impressions, 40 rows, 2 clicks; our only GSC row |
| `renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords` | 2,899 | 20.1 | 26.8 | 0.0 | **15.2** | 1.7 | 28 Bing impressions, 9 rows, 0 clicks |
| `renters-rights-act-2026-tax-implications-landlords` | 2,468 | 16.8 | 26.2 | 0.0 | **11.3** | 8.5 | 1 Bing impression |
| `renters-rights-act-periodic-tenancy-switch-landlord-obligations` | 2,788 | 19.1 | 29.4 | 0.0 | **11.8** | 6.1 | invisible on both engines |
| **Our median** | **2,628** | **19.6** | **28.1** | **0.0** | **11.6** | **7.3** | |

**The strongest single correlation in the language pass:** the one page of ours that writes
notice-names instead of citations is the only page of ours visible on either engine, and its 40 Bing
queries are almost all literal notice-name searches ("section 13 rent increase government", "can
tenant challenge section 13", "renters rights act refer rent increase to ftt"). The three
citation-heavy pages have one impression between them. **We are ranking for the grammar we write in.**

Compare openings. Theirs (W4): *"Private tenants have new rights from 1 May 2026."* Ours
(periodic switch): *"Every fixed-term assured shorthold tenancy current on 30 April 2026 converted to
a periodic assured tenancy on 1 May 2026 by force of RRA 2025 s.1 and the saving provisions in
SI 2026/421 reg.2."* Same fact. Nine words against 41 and two citations.

### 5.1 Belongs-to-sibling: heading themes this page must not duplicate

These pages are FROZEN (DOSSIER.md §3, blanket no-edit rule). This page **links** them and does not
re-run their content. Their H2 themes, read from the live files 2026-08-21:

**`renters-rights-act-2026-tax-implications-landlords`** (frozen through the build window). Owns:
the five tax-side channels; rental-income cash flow and the 12-month restriction; legal-fee
deductibility and the dominant-purpose test; capital-versus-revenue treatment of compliance spend;
incorporation pressure under Section 24 plus the 2027 rates plus the building-safety cross-effect;
CGT timing on Ground 1A disposals; the 2027 separate property income tax rates; a seven-step action
list. **Page 1 carries no tax content at all beyond one pointer link to this page.**

**`a-complete-guide-to-periodic-tenancy`** (HARD FROZEN, armed to 2026-11-16, owns `periodic tenancy`
at 2,400/mo) and **`renters-rights-act-periodic-tenancy-switch-landlord-obligations`**. Own: the
conversion mechanics, what a periodic tenancy is, the landlord obligations that follow the switch.
**Page 1's periodic section is sequencing only** (§6.2 item 6): what happened in what order and what
an agent does next, then both links. It does not re-explain the conversion. A standalone
periodic-switch explainer was explicitly dropped from the proposal as cannibalisation with zero
incremental measured demand (DOSSIER.md §7).

**`renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords`** (Bing-visible on the
27,100/mo head, positions 4 to 10). Owns the redress depth. **`prs-database-landlord-ombudsman-registration-requirements`**
is the page-5 EXTEND target and owns the database depth. **Page 1 gives each two or three sentences
in the not-yet-in-force block and links out.**

**`renters-rights-act-rent-increase-section-13-tribunal-route`**. Owns the Section 13 challenge route
and the tribunal mechanics. **Page 1 names Form 4A and the once-a-year rule, then links.**

---

## 6. Whitespace and content mandate

Shape, from `_language_spec.md` §3, explainer 1 row: **W5 shape**, two-state H2 split, one
indicative-milestones table, conditional grammar for the not-yet, one worked example following a
single property, FAQ of 5 to 6.

**The one reconciliation the writer must get right.** The spec's row says "one worked example
following a single property"; W5's version is a named persona ("Priya"). This cluster bans named
worked-example personas outright, in every page. So: **one worked example that follows a single
property and names nobody.** "A two-bed flat in your managed portfolio, let on a fixed term that ran
to August 2026" is the shape. Agent-facing second person does the rest of the work, and this sidesteps
the persona-collision class across the batch entirely.

### 6.1 Required structure, in order

1. **A labelled one-line answer**, W8's device, before anything else. Two sentences maximum before
   the answer lands (hard rule 4). Never open on the statutory anchor, never on "this guide walks
   through", never on scope-setting.
2. **H2: what is already in force.** The 1 May 2026 wave, in the present tense.
3. **H2: what is not in force yet**, entirely in conditional grammar.
4. **One table**, and only one (hard rule 13): the indicative-milestones timeline. Labelled indicative
   in the same breath, W5-style. Statute instrument numbers, if any survive, live in table cells, not
   in prose above them.
5. **The scenario device**, at least three landlord questions in quotation marks answered in the
   agent's voice (hard rule 9).
6. **The "what has not changed" block**, explicit, by name (hard rule 5). Mandatory, not optional.
7. **FAQ of 5 or 6**, each a near-verbatim query from §3 (hard rule 15).
8. **Close on the reader's next action.** No service offer, no "how we can help", no CTA template.

### 6.2 Content mandate, with the exact locked figures

Every figure below is from `docs/property/house_positions.md` §20 as patched 2026-08-21. Anything not
locked there is declined, not guessed.

**(a) The two-state split, which is the page's spine.**

*In force from 1 May 2026, and only for private assured tenancies.* SI 2026/421 was made 16 April
2026 and appointed 1 May 2026. **Its reg 2 confines the whole 1 May tenancy-reform wave to assured
tenancies that are not social-housing assured tenancies.** Social housing follows in Phase 2, a
roadmap expectation for 2027, and is labelled as an expectation. House_positions §20.12 says to quote
this carve-out in any "does this apply to me" content, and it is the single most useful thing on this
page for an agent with a mixed book. What is in force on that date: periodic tenancies as the
default; Section 21 abolition and the end of the assured shorthold regime; the reformed Section 8
grounds; the statutory Section 13 rent-increase procedure; the tribunal route for rent challenge; the
advance-rent prohibitions on both layers; pet rights; the bidding-wars prohibition; the discrimination
protections; financial penalties and offences; and Rent Repayment Orders extended to two years' rent.

*In force earlier, and worth one line because it explains why the Act looked dormant for a year.*
Part 5 and the general provisions took effect at Royal Assent on 27 October 2025. A further tranche
(the Chapter 2 provisions of Part 1, plus the investigatory powers) took effect on 27 December 2025 by
the Act itself, and the first commencement instrument brought preparatory provisions into force on the
same date.

*In force 22 June 2026.* Commencement No. 3 lets local housing authorities impose civil penalties of
**up to £7,000 for category 1 hazards**, and lets penalty proceeds fund enforcement involving superior
landlords. **This is hazard-enforcement plumbing, not the Decent Homes Standard.** Say so, because the
commentary conflates them.

**(b) The Section 145 regulation-making nuance, in plain words.** This is the page's genuine
differentiator and the thing W5 gestures at without having. The whole Act came into force **"for the
purposes of making regulations" at Royal Assent on 27 October 2025**. So the powers to write the
redress rules and the database rules are live, while the duties they will create are not. In agent
language: the government can write the rules now, and until it does, nobody has to do anything.
**Never write "none of Part 2 is in force"** (house_positions §20.12). Write: in force for
regulation-making only, no regulations made.

**(c) The information-sheet duty.** This is a **statutory duty**, not a leaflet. The instrument
behind it took effect on 1 May 2026 and covers the written statement of terms and the information
sheet. **Existing tenancies had a 31 May 2026 deadline** for the landlord to give the tenant the
information sheet; new tenancies get the written statement of terms plus the sheet. The 5,400/mo
query is duty-shaped, and this page's job is to explain the duty and **link gov.uk's sheet**.
**Never republish or mirror the PDF** (DOSSIER.md §8). One sentence saying who had to give what, to
whom, by when, and where the current version lives.

**(d) Form 4A and Section 13.** **Form 4A is the prescribed rent-increase notice** for a Section 13
increase after 1 May 2026 (Form 5A is the assured agricultural occupancies equivalent). Rent
increases go through the Section 13 procedure only, **once per twelve-month period, on two months'
written notice**, and contractual rent-review clauses are unenforceable for rent increases. The
tribunal cannot set a rent above the landlord's proposed amount. Pre-1-May notices are protected by
the transitional provisions. Then link the Section 13 tribunal page for the challenge route.
**Never point at a static snapshot of the Section 8 possession form**: that form is the version
published by the Secretary of State having effect at the time, a live document. Link gov.uk's current
version or say nothing.

**(e) The periodic-tenancy switch, as a section, sequencing only.** What happened, in order: every
fixed-term assured shorthold tenancy that was current on 30 April 2026 became periodic on 1 May 2026;
rent periods are monthly, with a maximum of one month, so six-monthly and annual rent periods are
gone; tenants can end the tenancy on **two months' written notice at any point**; the next rent
increase runs through Section 13 and resets the twelve-month clock. Fixed terms of more than 21 years
sit outside the assured regime; the 7-to-21-year carve-out is a **closed transitional cohort, not an
ongoing route**, so a new ten-year term does not escape the regime. Then both periodic links. Do not
re-explain the conversion (§5.1).

**(f) The database and redress, as expectations with no instrument behind them.** The database
provisions are in the Act and the database duty is marked **Prospective**; there is **no commencement
order**, and the fee power is live while **no fee regulations have been made, so no fee figure exists
in law**. The published roadmap expects a **regional rollout from late 2026**; label that an
expectation. On redress: one provision took effect on 1 May 2026, the rest is regulation-making only,
**no landlord redress scheme instrument exists at all**, and the roadmap expects mandatory membership
**in 2028**, again an expectation. The regime the Act creates is a **plural approved-scheme regime**;
never "the single statutory ombudsman". The £25,000 compensation figure is policy commentary, not the
Act. Penalties where the regime does bite: up to **£7,000** for a breach and up to **£40,000** for an
offence. Two or three sentences each, then link out (§5.1).

**(g) Decent Homes.** Preliminary provisions are in force in two tranches, 27 December 2025 and
22 June 2026. The **substantive standard for the private rented sector awaits a further commencement
order**, and the government proposes **2035 or 2037**. One sentence, labelled as a proposal.

**(h) The mandatory "what has not changed" block** (hard rule 5, and the highest-value device for
this audience, because most landlord questions an agent fields are about things that did not change).
Name them by name. From the locked material, the honest list includes: deposit protection and the
deposit-scheme adjudication route; Right to Rent checks; gas, electrical and smoke and carbon monoxide
safety obligations; HMO and selective licensing, which is a separate regime under separate law; the
letting agent's **own** redress obligation, which has existed since **1 October 2014** under a
separate 2014 instrument and has nothing to do with the new landlord regime; and the fact that the
tenant's two-month notice right is set by an amendment to the Protection from Eviction Act 1977, not
by the periodic mechanic. **The agent-versus-landlord redress distinction is the one most likely to be
got wrong in the wild and it belongs in this block.**

**(i) Placing `renters rights act 2026` without asserting a wrong citation.** The keyword carries
12,100/mo and the Act is not called that. The approved corrective form, and the only one: name the
Act correctly and name the search once, in the same sentence, as what people call it. For example,
"the Renters' Rights Act 2025, which almost everyone searches for as the Renters' Rights Act 2026
because that is when it started to bite". The metaTitle and H1 may use "2026" only in a commencement
sense ("what is in force in 2026"), never as the Act's name. **Never write "the Act is the Renters'
Rights Act 2026"** (§20.13).

### 6.3 Do-not-write, quoted (house_positions §20.13 and §26.8)

- "The Renters' Rights Bill is in passage" (Royal Assent was 27 October 2025)
- "The Act is the Renters' Rights Act 2026"
- "Section 21 is still available"
- "Tenants must give 2 months notice always" (they can give two months at any point in a periodic
  tenancy; landlord notice periods vary by ground)
- "Fixed-term ASTs continue"
- "Landlords can demand 6 months rent upfront"
- "Landlords must register on the PRS Database from 1 May 2026"
- "Database registration costs £X" (no fee regulations exist; any circulating figure is invented)
- "There is a single statutory ombudsman for landlords"
- "Compensation under the new landlord ombudsman is capped at £25,000"
- "The Decent Homes Standard for PRS is in force"
- "Letting agents joined the redress scheme regime under RRA 2025" (agents have been required to
  belong to an approved redress scheme since 1 October 2014, under a separate instrument)
- "Download Form 3A here" pointing at a static snapshot
- Citing the 2015 assured shorthold tenancy prescribed-requirements regulations as a live Section 21
  precondition (revoked with effect from 1 May 2026)
- Also barred: naming the Decent Homes Standard as what Commencement No. 3 delivered; describing the
  1 May 2026 wave as applying to social housing; treating the "regional rollout from late 2026" or
  "membership in 2028" dates as commitments rather than expectations.

---

## 7. Acceptance criteria

**Writer: Opus. Batch size 1. This pack is the writer's whole world.** Additive scope goes back as a
delta to `briefs/property/agents/notes/delta.md`, never into the page.

1. **Register, per `_language_spec.md` §3, "Explainer 1: RRA commencements in force vs not" row,
   quoted verbatim:** register **Agent-as-you**; **"you" at 15 or above per 1,000 words**;
   **citation-style references 0**; **notice-names 12 to 18 per 1,000**; **Flesch 45 or above**;
   **1,600 to 2,200 words**. Plus hard rule 2: **mean sentence at or below 18 words**. For scale, our
   median today is Flesch 28.1, "you" 0.0 and mean sentence 19.6, so none of these is a rounding
   adjustment.
2. **"You" is the agent** (hard rule 3). The landlord is "your landlord", "the landlord you act for",
   "your landlord client". The tenant is "the tenant".
3. **Zero citation-style statute references in prose** (hard rule 1). Write "Section 21", "Section
   13", "Section 8", "Form 4A", "the Renters' Rights Act 2025", "the Housing Act 1988". Never `s.13`,
   `ss.64-74`, `SI 2026/421`, `reg.3`, `Sch 8`, `HA 1988 s.16E`. The batch ceiling is at most one
   citation-style reference per 1,000 words and this page's spec row is **0**; where a commencement
   instrument genuinely has to be identified it goes in **one reference line at the foot of the page**
   or in a table cell, never in prose. **Never in a heading** (hard rule 8).
4. **Question headings at half or more of H2s, phrased as the landlord's question** (hard rule 7).
   W5 runs 10 of 15 and holds p1.
5. **Opens with a labelled short answer**, two sentences maximum before it (hard rule 4).
6. **Carries the explicit "what has not changed" block** per §6.2(h), naming things by name. QA fails
   the page if this is compressed to a throwaway line rather than a genuine block.
7. **Two-state presentation with conditional grammar for the not-yet** (hard rule 6). "Already in
   force" and "Not yet in force" as headings. For anything uncommenced: "when the database opens, you
   will need to register", never "you must register now". Any indicative year is labelled indicative
   in the same sentence.
8. **One table maximum** (hard rule 13), the indicative-milestones timeline, labelled indicative.
9. **Figures go in the sentence about what the reader does** (hard rule 10), never in a parenthesis
   and never subordinate to an abstract subject. Winner median is one pound figure per page; ours is
   18.5. Keep the pound figures on this page in single digits.
10. **Nothing datable to a week** (hard rule 11). No countdowns, no "as of today". Dated statements
    name the date they are true from.
11. **Every figure matches house_positions as patched 2026-08-21.** Specifically: Royal Assent
    27 October 2025; the Act is the Renters' Rights Act 2025 (2025 c. 26); 1 May 2026 for private
    non-social-housing assured tenancies; 27 December 2025 and 22 June 2026 tranches; £7,000 category
    1 hazard penalty; 31 May 2026 information-sheet deadline for existing tenancies; Form 4A; two
    months' notice and once per twelve months on Section 13; two months' tenant notice; twelve-month
    re-letting restriction; £40,000 offence and £7,000 breach penalties; two years' rent for Rent
    Repayment Orders; twenty-one-year fixed-term boundary; no database fee figure; late 2026 and 2028
    as expectations; 2035 or 2037 as a Decent Homes proposal. **Anything not locked there is declined,
    not guessed.**
12. **No named worked-example persona.** One unnamed single-property example only (§6).
13. **Coverage note written**, at exactly this path and filename (equity-gate parser convention: the
    last path segment of the Page line in §1, plus `_coverage.md`):
    **`briefs/property/agents/notes/rra-2026-whats-in-force-letting-agents.md_coverage.md`**.
    It must list every §3 keyword placed with where it landed, and every §3 declined keyword by name
    with the page that holds it: `periodic tenancy` (2400) and `renters rights act periodic tenancy`
    (50), `notice period periodic tenancy` (110) and `tenant notice to quit periodic tenancy` (20) to
    the existing periodic pair; `property redress scheme` (27100) to the frozen redress page;
    `private rented sector database` (1000) and `landlord ombudsman` (480) to page 5;
    `mees regulations` (720) to `mees-regulations-landlords`; `making tax digital landlords` (590) to
    the MTD cluster pillar pages. Figures and buckets must match `briefs/property/agents/ledger.csv`.
14. **Middleware map entry present** before or with the content commit (§1).
15. **No shared CTA template with any other page in this batch**, and the banned template
    `We can produce a written {noun} for/on your {noun}` must not appear. Close on the reader's next
    action. **No service offer, no pricing, no "how we can help" block inside the body** (hard rule
    14); this cluster is written in the register of what your landlords will ask you this year, not
    accountancy for letting agents.
16. **Links present:** the two periodic pages, the redress page, page 5, the Section 13 tribunal page,
    the tax-implications page (one pointer only), the `/for-letting-agents` hub, and gov.uk's live
    information sheet and Section 8 form pages. **No edit to any of the frozen pages** (DOSSIER.md §3).
17. **Zero em-dashes, UK English, no pricing.**

---

## 8. Expectation and failure trigger

Per DOSSIER.md §10, stated before the work.

- **Read at 90 days.** No new monitor, cron, alert or notification of any kind. Monitoring is standard
  `monitored_pages` registration at deploy inside the existing weekly detector, nothing else.
- **This page will not displace gov.uk on the head.** gov.uk holds seven of sixty tracked slots across
  the six queries and that head is not contested (`_language_spec.md` §3).
- **Success at 90 days** = any stable Bing long-tail presence, on the pattern the Section 13 page
  already demonstrates (40 query rows without ever holding the head), **plus** GSC impressions on
  information-sheet-shaped queries. The sharper internal test: whether an agent-register page with
  zero citations and notice-names at 12 to 18 per 1,000 earns rows where our citation-heavy pages
  earned one impression between them. That is the cluster's cleanest experiment and this page is where
  it runs.
- **Page-level failure trigger:** zero Bing rows **and** zero GSC impressions on the
  information-sheet and commencement families at the 90-day read means this page failed, and it is the
  A-grade page, so its failure is the cluster's failure.
- **Cluster-level failure trigger:** zero Bing rows **and** zero GSC impressions across the whole
  agents1 cluster at the 90-day read means the register thesis is wrong. Do not build Track 2-style
  audience surfaces on this evidence base.
- **Limitations carried forward:** SERP positions are DuckDuckGo, not Google (§11.1); the keyword
  universe is seed-listed, not exhaustive (§11.2); GSC rows are privacy-thresholded, so "one row"
  means below threshold elsewhere, not literally zero searches (§11.4).
