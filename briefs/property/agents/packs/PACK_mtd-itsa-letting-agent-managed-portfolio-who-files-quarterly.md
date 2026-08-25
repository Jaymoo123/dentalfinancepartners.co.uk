# PACK mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly (page 3, agents1 cluster)

Full-overhaul extend pack, assembled 2026-08-21 from `briefs/property/agents/DOSSIER.md` (FROZEN
2026-08-21), `briefs/property/agents/_language_spec.md`, `briefs/property/agents/ledger.csv` and
`docs/property/house_positions.md` as patched 2026-08-21. Follows `docs/_engines/REWRITE_PROGRAM.md`
§9.5, 8 sections in reading order. Format copied from
`briefs/property/rural-estates/packs/PACK_how-to-avoid-inheritance-tax-on-a-farm.md`.

**The pack is the whole world.** Do not go looking for other briefs, other packs, or the rest of the
cluster. Everything the writer needs is here or in the four files named above.

## 1. Target and permission level

- **Page:** `Property/web/content/blog/mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly.md`
- **Slug:** `mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly` (fixed, do not vary)
- **URL:** `/blog/making-tax-digital-mtd/mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly`
- **Category:** `Making Tax Digital (MTD)` (unchanged; the frontmatter `category` string stays exactly
  as it is today)
- **Grade:** REFRAME
- **No middleware change.** The slug already exists and already resolves. Do not touch
  `Property/web/src/middleware.ts` for this page.
- **What REFRAME means here, in prose:** this is a **full overhaul**, not a light de-stale. A
  "rewrite" in this programme is never a de-stale pass. The page is rebuilt from the H1 down into the
  letting-agent register. Title, H1, meta, headings, FAQ set and body all change. The REFRAME grade
  token exists so the equity gate does not apply its byte-identical metaTitle / H1 / H2-subsequence
  check to a page that is deliberately being rebuilt.
- **Register flip, stated plainly because it is the biggest single change:** the page today addresses
  the **landlord** as "you". After this overhaul, **"you" is the letting or estate agent** and the
  landlord is "your landlord client" or "the landlord you act for". This is `_language_spec.md` §3
  and hard rule 3. The page must still be forwardable to a landlord (that is the cluster's stated
  return path, DOSSIER.md §10), which is what the scenario device in §6 below is for: the landlord's
  question appears verbatim, in quotation marks, and the answer is written in the agent's voice.
- **Fixed constraints:** the slug above; the category above; **zero em-dashes**; UK English; **no
  pricing**; **no service claim of any kind**; **no named worked-example persona** (the current page
  has one, "Singh", and it must go, see §5); no shared CTA template with the rest of this batch and
  never the phrase "We can produce a written {noun} for/on your {noun}".

## 2. Equity register

**ZERO. Trivially satisfied.**

Measured 2026-08-21 across a 90-day window (GSC API pull, data through 2026-08-19;
`_gsc_family_queries.json`) and Bing `GetPageQueryStats` per URL (`_bing_page_queries.json`):

| Engine | Rows for this URL | Impressions | Clicks |
|---|---:|---:|---:|
| Google Search Console (90d) | **0** | 0 | 0 |
| Bing Webmaster (per-page) | **0** | 0 | 0 |

There is no ranking, no impression and no click to protect on this page. The monitored-pages window
closed **2026-08-21**, so the one-change-per-window rule (DOSSIER.md §3) does not block the edit.

**Consequence for the outline, stated because it inverts the normal method.** In a standard rewrite
the page's own GSC + Bing query set drives the new outline and the dominant query owns the H1. Here
**the measured query set is empty on both engines**. There is nothing to derive an outline from. The
outline is therefore driven by (a) the keywords assigned to this page in DOSSIER.md §7 row 3 and §9,
and (b) the register prescription in `_language_spec.md` §3, "Explainer 4" row. That substitution is
deliberate and is recorded here so nobody later reads the pack as having skipped the query step.

**Protected pre-existing copy:** anything on the current page that is still factually correct is
handled **additively** where it is kept (see §5 KEEP list). Every correction is recorded in the
coverage note.

## 3. The market's keyword set

Source: `briefs/property/agents/ledger.csv` (2026-08-21). Volumes are Google Ads `search_volume`
(DataForSEO, UK, pulled 2026-08-21). Bing `GetKeywordStats` medians are a different method and are
never compared against these figures anywhere.

| keyword | vol/mo | best peer pos | peer domain | in our copy |
|---|---:|---:|---|---|
| making tax digital rental income | 50 | n/a | n/a | yes, secondary |
| letting agent mtd | 0 | n/a | n/a | yes |
| mtd quarterly updates landlords | 0 | n/a | n/a | yes |
| mtd for landlords 2026 | 0 | n/a | n/a | yes |
| making tax digital landlords | 590 | n/a | n/a | **no, DECLINED** |

**`making tax digital rental income` (50/mo) is the only measured term this page carries.** It is a
secondary target, not the H1's job. Place it naturally in the body and in at least one FAQ question.

**The three zero-volume terms are the agent tail.** They carry no recorded Google Ads volume and no
recorded Bing history (DOSSIER.md §1: all agent-phrased seeds return zero history on Bing and no
volume on Google Ads). They are assigned to this page because the demand in this family is in what
agents must **explain**, not in what agents **search** (DOSSIER.md §4, final row). Treat them as
phrasings to be present in the copy, not as ranking promises.

**DECLINED, with a coverage note required: `making tax digital landlords` (590/mo).** ALREADY-COVERED
by the MTD cluster pillar pages (ledger bucket `already-covered`, DOSSIER.md §9). This page must not
chase the head. It must **link the MTD pillar**: `/blog/making-tax-digital-mtd/mtd-itsa-overview-six-changes-residential-landlords`
(the MTD ITSA overview for residential landlords), which is already linked in the current page's
related-guides block and stays linked. Record the decline, with that reason and that link, in the
coverage note.

**Single-keyword risk, disclosed:** with one measured term at 50/mo and three unmeasured terms, this
page's measurable ranking surface is thin by construction. That is why its DOSSIER grade is B
(rescue of an invisible page, zero equity to preserve) and why success at 90 days is defined
generously in §8 rather than as a position on a head term.

## 4. Competitor teardown extracts

**No competitor teardown exists for MTD in this cluster, and none may be invented.** The six SERPs
behind `_language_spec.md` were pulled for RRA and MEES queries, not MTD queries. `_language_spec.md`
§2 P8 records the relevant fact directly: across 19,321 words of winner prose in this cluster, **no
winner touches MTD at all**, and none touches tax treatment of anything. There is no measured MTD
competitor set. Do not assert competitor positions, headings or figures for MTD anywhere.

What IS available, and what the writer copies, is the **register model** measured on the RRA SERPs.
Three patterns from `_language_spec.md` §2 transfer directly and are mandatory here:

- **P2, the labelled one-line answer.** W8 (heybrb.ai, p7, the closest register match to our intended
  audience in the whole tracked set) opens with an H2 that is literally "The one-line answer",
  followed by the answer in one sentence, followed by "That's the short version. The detail matters
  because...". None of our four tracked pages has a labelled short answer; all four open on
  scope-setting. This page opens with the labelled answer: **the landlord files, never the agent.**
- **P3, the agent is "you" and the landlord is the third party who asks.** The single sentence in
  19,321 competitor words that occupies our intended register is W8's: *"This is a positive duty, the
  obligation sits with you (or your landlord client) regardless of who drafted the tenancy."* And
  W8's scenario device: *"A landlord asking 'can I still evict my tenant?', answer: yes, but only via
  Section 8 grounds..."*. That question-then-answer shape is the shape this whole cluster is written
  in.
- **P6, "what doesn't change".** W8: *"What doesn't change on 1 May: existing AST that already have
  valid Section 21 notices served, deposit protection rules, Right to Rent obligations, the Tenancy
  Deposit Scheme adjudication process. Your underlying compliance landscape is the same shape, the
  eviction route changed."* An explicit negative list is the highest-value device for an agent
  fielding questions, because most of the questions an agent gets are about things that did not
  change. It is a required section here (§6 point 6).

**Do not copy, named (`_language_spec.md` §4):** W8's product frame (roughly a fifth of that page is
AI-tool instruction), W8's unsourced quantification ("turn 30 hours of compliance work into 8",
"cut the routine drafting work by 60-70%") and W8's countdown framing ("as of today, that's 14
days"). We have none of those numbers and must not invent equivalents. Nothing on this page may be
datable to a week (hard rule 11).

## 5. Ours, side by side: full inventory of the current page

Current file: 190 lines, ~2,300 body words, 12 FAQ entries, 1 table, 3 service asides, 1 named
worked-example persona. Inventory below is complete. Every item is marked KEEP, CORRECT or CUT.

### 5a. Current headings, in order

| # | Current H2 | Disposition |
|---|---|---|
| 1 | Who does what: you, your agent, your accountant | **KEEP the content, REFRAME the register.** Becomes the who-does-what table (§6 point 2). Today it addresses the landlord; after the overhaul it addresses the agent. |
| 2 | What a typical letting-agent monthly statement looks like | **KEEP substantively**, cut the unsourced commission-percentage ranges (see 5c). |
| 3 | Mapping a real letting-agent statement into MTD categories | **KEEP the mapping, CUT the persona.** See 5c. |
| 4 | The gross-versus-net trap and the threshold test | **KEEP, this is the page's strongest asset.** Correct the figures per 5c and re-cut into the agent register. |
| 5 | Multi-property portfolios with one agent | **KEEP, compress.** Merge into one "however many properties, however many agents, one filing" section with H2 6. |
| 6 | Multi-agent portfolios, different agents per property | **KEEP, compress into H2 5.** The two sections say the same thing twice. |
| 7 | Joint owners with a letting-agent-managed property | **KEEP, compress to a short block**, retain the link out to the joint-owner page (that page owns the mechanics, this page defers). |
| 8 | Annual reconciliations, void periods, and agent year-end statements | **KEEP the void-period and year-end-reconciliation points**, compress. |
| 9 | Where your accountant fits via the Agent Services Account | **KEEP**, reframed as "what you hand to the landlord's accountant". |
| 10 | Setting it up before April 2026 | **CORRECT AND REFRAME.** 6 April 2026 has passed. A five-step list framed as "use the lead time before April 2026" is stale on its face. See 5c. |
| 11 | Related guides | **KEEP** all five internal links; they are all live and all correct. Add the MTD pillar decline link if not already among them (it is: the overview page is link 1). |

Question-heading share today: **0 of 11**. Target is half or more (`_language_spec.md` hard rule 7).

### 5b. KEEP: factually still correct, carry forward additively

These positions are correct against house_positions as patched 2026-08-21 and must survive the
overhaul. Where they are kept, keep them; do not "improve" them into something less accurate.

1. **The landlord is the MTD filer, not the letting agent** (§19.13, first bullet; and §19.17
   do-not-write "Letting agent files quarterly updates for the landlord" is false). This is the
   page's spine and it is already right.
2. **The agent statement is a source document, not a return; it still needs categorising** (§19.13).
3. **Gross rent collected is the income line, not net paid to the landlord's bank** (§19.13).
4. **The gross-versus-net trap distorts the threshold test** (§19.13 "Trap" bullet + §19.2 gross
   test). The current wording, "profit-neutral but threshold-distorting error", is exactly right and
   should survive in substance.
5. **£50,000 qualifying-income threshold from 6 April 2026** (§19.1). Correct.
6. **Quarterly cycle and deadlines**: 6 April to 5 July filed by 7 August; 6 July to 5 October by 7
   November; 6 October to 5 January by 7 February; 6 January to 5 April by 7 May; end-of-period
   statement and final declaration by 31 January following year-end (§19.6). Correct.
7. **One MTD ITSA cycle covers all UK property income however many properties or agents feed it**
   (§19.2 aggregation; no per-property or per-agent filing). Correct.
8. **Joint owners each record their share of every line; 50/50 default absent a Form 17 election**
   (§19.4). Correct.
9. **The agent is not a tax agent unless it holds an Agent Services Account and is authorised for
   MTD ITSA specifically; the older 64-8 does not carry over** (§19.10). Correct.
10. **ASA authorisation flow**: accountant raises the request, the landlord approves it through the
    gov.uk authorisation portal via Government Gateway (§19.10). Correct.
11. **Copy-pasting figures off a PDF into a spreadsheet is not a digital link** (§19.14, and §19.17
    do-not-write "Copy-paste between spreadsheet cells is a digital link" is false). Correct, and it
    is currently buried in an FAQ. Promote it into the body (§6 point 5).
12. **Non-resident landlord withholding runs alongside MTD, not instead of it; the tax withheld is a
    credit at final declaration** (§19.11). Correct. Keep as one short scenario, keep the link out to
    the NRL page which owns the mechanics.
13. **SA105 expense categories used for the mapping**: property repairs and maintenance; legal,
    management and other professional fees; other allowable property expenses (§19.14 spreadsheet
    column discipline). Correct in substance. **Verify the box numbers against the current SA105 at
    write time** before restating them; if verification is not possible, name the categories in words
    and drop the box numbers. Never guess a box number.
14. **Do not amend a closed quarterly update for a post-quarter agent reconciliation; it goes through
    the end-of-period statement and final declaration.** Correct in substance. **Cut the invented
    materiality rule** ("more than 5% of the year's commission, say") which has no source, see 5c.
15. **All five outbound internal links** in the related-guides block. All live, all correct targets.

### 5c. CORRECT: wrong, stale, or unsourced as at 2026-08-21

Every item here is a required correction and every one goes in the coverage note.

1. **The named worked-example persona "Singh" must be removed.** Cluster rule, DOSSIER-level: no
   named worked-example personas in agents1. Replace with an unnamed managed let ("a landlord you
   act for, one fully managed three-bed"). The figures in the mapping table can survive as an
   illustrative statement; the person cannot.
2. **The three service asides must be removed in full.** Current lines 124, 150 and 186: "Our
   property-tax team works with letting-agent landlords on the data flow setup...", "talk to us about
   consolidated bookkeeping...", "We run a fixed-scope review of your agent data flow, software fit,
   and ASA authorisation status". These are service offers inside the body. `_language_spec.md` hard
   rule 14 forbids them and W7 is on the do-not-copy list precisely for doing this. The owner ruling
   in DOSSIER.md §1 (pure resource surface, no service tier, no claim to do agency accounts) forbids
   them again. Cut all three; do not replace them with a softer version.
3. **"Setting it up before April 2026" is stale framing.** 6 April 2026 is in the past. Every
   sentence written as anticipation ("use the lead time before 6 April 2026", "the landlords who
   reach April 2026 with a letting-agent portfolio set up properly", "take the agent's January 2026
   statement and map it as though it were a real quarterly contribution", "started by autumn 2025",
   "the lead time... is six to nine months") must be rewritten in the present. The mandate is live.
   The section becomes what an agent does now for a landlord who is already in it or about to be.
4. **Unsourced quantification, three instances, all cut or reframed:**
   - "typically 8 to 14% on managed lets" (agent commission range): no source. Cut the range;
     write "whatever percentage the agency charges" or leave the illustrative statement to speak.
   - "roughly 80 to 85% of the gross rent lands in your bank account": no source. Cut.
   - "more than 5% of the year's commission, say" as a materiality threshold: invented. Cut.
   This is the `_language_spec.md` §4 do-not-copy against W8's unsourced quantification, applied to
   our own page.
5. **Only one threshold tier is stated.** The page names £50,000 from 6 April 2026 and stops. The
   locked ladder is three tiers and the later two are what an agent will be asked about by landlords
   currently below the line. Add, exactly (§19.1):
   - **£50,000** qualifying income, mandatory from **6 April 2026**, tested against the **2024/25**
     self-assessment return.
   - **£30,000**, mandatory from **6 April 2027**, tested against the **2025/26** return.
   - **£20,000**, mandatory from **6 April 2028**, tested against the **2026/27** return.
   HMRC writes to taxpayers who appear in scope; the obligation is the landlord's whether or not the
   letter arrives (§19.1). That last sentence is a genuine agent-register line and should be on the
   page.
6. **The gross test is stated for rent only.** §19.2 is wider and the omission is a real trap for a
   landlord who also trades: qualifying income is **gross self-employment turnover plus gross
   property rental income, before deductions**, and the two are **aggregated** for the threshold
   test. A landlord with £30,000 of trade and £25,000 of rent is in scope at £55,000 combined. Add
   it. Also add the excluded categories that agents get asked about: employment income (PAYE),
   pensions, dividends and savings interest are **not** qualifying income (§19.2).
7. **The joint-owner threshold rule is stated as a splitting mechanic only.** Add the threshold
   consequence from §19.4: joint owners test the threshold against **their share of gross**, not the
   property's total gross. A jointly owned portfolio grossing £100,000 tests at £50,000 each on the
   default 50/50 split. The §19.9 do-not-write is explicit: "Joint owners test against the property's
   total gross" is false.
8. **Digital links are covered only in an FAQ and only for PDFs.** §19.14 is wider and this is the
   part of the page an agent most needs, because the agent controls the export format. Promote to
   body and state the rule properly (§6 point 5).
9. **No penalty content at all.** An agent will be asked "what happens if a landlord misses one".
   Add briefly and exactly (§19.7, §19.19): late submission is **points-based**, one point per missed
   quarterly update, penalty threshold **4 points** for quarterly filers, **£200** per missed
   submission once at threshold. Points reset requires **both** a 12-month compliance period **and**
   all submissions due in the preceding 24 months made (§19.19 dual-condition test, both limbs
   surfaced). Late payment for MTD ITSA filers from 6 April 2026 runs at **3% of the unpaid tax from
   day 15, a further 3% from day 30, then 10% a year from day 31** (§19.7). The §19.9 do-not-writes
   apply: never "late submission produces an immediate £200 penalty" (it is points-based) and never
   "2%/2%/4%" (that is the legacy non-MTD schedule).
10. **Citation grammar and instrument references.** The page currently carries no statute citations,
    which is the right end state, and it must stay that way: **zero citation-style references** for
    this page type (`_language_spec.md` §3, Explainer 4 row). If the writer finds a need to identify
    the operative instrument, note that the live MTD ITSA instrument is the **Income Tax (Digital
    Obligations) Regulations 2026**, which **revoked** the 2021 Digital Requirements Regulations on 1
    April 2026 (§19.18). Any page describing the 2021 regulations as the live instrument is stale.
    If it appears at all it goes in **one reference line at the foot of the page**, never in prose
    and never in a heading.
11. **12 FAQ entries; target is 5 or 6** (`_language_spec.md` hard rule 15). Keep the best five or
    six, each phrased as a near-verbatim query as an agent or landlord would type it. Candidates from
    the existing set, in priority order: the net-of-fees statement question (the trap), "can my
    letting agent file the quarterly updates on my behalf", the PDF-portal digital-link question, the
    three-agents question, and the joint-owner question. The rest go.
12. **`metaTitle`, `metaDescription`, `title`, `h1` and `summary` are all landlord-addressed and all
    change.** The current metaDescription ("Your letting agent collects rent and sends monthly
    statements. Under MTD ITSA from April 2026 you, not the agent, file quarterly updates.") is
    written at the landlord. Rewrite all five fields in the agent register.
13. **`dateModified` and `reviewedAt`** move to the deploy date. `reviewerCredentials` and
    `editorialNote` mention "house position §19.13": that internal reference is fine in frontmatter,
    which is not rendered as prose, but check nothing of that shape leaks into the body.

### 5d. Register gap, measured

`_language_spec.md` §1 does not measure this page (its tracked set is the four RRA pages). Measure
the overhauled draft against the Explainer 4 row targets in §7 below, not against the current page.

## 6. Whitespace / content mandate

Core content, all positions from house_positions §19 as patched 2026-08-21. Every point below is
required; QA fails the page if one is missing or compressed to a throwaway line.

1. **The labelled one-line answer, first, before anything else.** Two sentences maximum before it.
   The answer is: **the landlord is the filer, always, even on a fully managed let, and the agency
   never touches the MTD submission unless it separately holds an Agent Services Account and is
   authorised for MTD ITSA.** Then the W8 move: the short version is done, here is why the detail
   matters. Never open on the statutory anchor, never on "this guide walks through", never on
   scope-setting (hard rule 4).

2. **The who-does-what table. This is the page's one permitted table** (hard rule 13). Three columns
   or three rows, one per party: **the agent** (collects rent, pays contractors, produces the monthly
   statement, controls the export format), **the landlord** (owns the obligation, keeps the digital
   records, is the legally responsible filer), **the landlord's accountant** (categorises, submits,
   prepares the end-of-period statement and final declaration, via the Agent Services Account). The
   agent never touches the MTD API. Make the boundary explicit; it is the whole reason an agent reads
   this page.

3. **The agent monthly statement mapped to MTD categories**, unnamed, one fully managed let, one
   month. Gross rent collected as the income line; agent commission and management admin into legal,
   management and other professional fees; contractor invoices into property repairs and maintenance;
   statutory inspection fees into their own category. Then the sentence that carries the payload:
   **the net figure paid to the landlord's bank appears nowhere on the quarterly update.** Keep the
   existing illustrative figures if they work; strip the persona.

4. **The gross-not-net trap, given its own section and stated as a threshold consequence** (§19.13
   trap + §19.2 gross test). The mechanics, in the reader's verb (hard rule 10): reporting net of
   agent fees as gross income **understates the income line and understates the expenses by the same
   amount**. The two errors largely cancel for profit, which is exactly why nobody catches it. They
   do not cancel for the threshold test, which looks at **gross rent the tenant paid**, before
   commission, fees and contractor costs. A landlord collecting £52,000 gross with £42,000 reaching
   the bank is **in** MTD from 6 April 2026 whatever the bank statements suggest. Say plainly that
   the number on the agency's statement, the gross collected, is the number that decides whether a
   landlord is in scope at all, and that this is why landlords ring their agent about it.

5. **Digital links for the agent-statement-to-spreadsheet flow** (§19.14). The agent controls this,
   which is why it belongs on an agent page. State the rule: a digital link is a transfer of data
   between software or spreadsheet cells **without manual transcription or copy-paste**. Acceptable:
   cell references and formulae, linked tables, an API extract, a CSV import via a script.
   **Not** acceptable: copy-paste, manual re-keying, reading a number off a screen and typing it in.
   Then the practical consequence, which is the useful bit: a **PDF statement is not itself a digital
   record**, and a landlord who retypes the PDF figures into a spreadsheet has broken the chain. An
   agency that can offer a **CSV or a structured export alongside the PDF** removes the problem for
   every landlord on its books, at no cost to the agency. Spreadsheet columns should be categorised
   to the SA105 categories (gross rent, agent fees, repairs, insurance, council tax, finance costs,
   other) so they flow through bridging software into the quarterly update. Do not name any software
   product: the HMRC recognised list changes and product names must never be hard-coded (§19.6,
   §19.14).

6. **The required "what has not changed" block** (hard rule 5), named item by item. Candidates, all
   verified: the agency still collects the rent and pays the contractors; the agency is still not the
   landlord's tax agent; an old 64-8 still does not authorise MTD ITSA filing; the landlord still
   files one cycle for the whole portfolio however many agencies are involved; deposit protection,
   Right to Rent and tenancy paperwork are untouched by MTD; non-resident landlord withholding still
   runs alongside; and the 31 January final-declaration date has not moved.

7. **What an agent can safely tell a landlord, and where the line is.** This is the register's
   payload and it is also the compliance guard, so write it carefully and write it as a genuine
   service to the reader, not as a disclaimer. Safe for an agent to say: that the landlord is the
   filer; what the statement lines are and which MTD category each corresponds to; that gross, not
   net, is the figure that matters for the threshold; that the agency can supply a CSV or structured
   export; the quarterly dates. Needs the landlord's accountant: whether **this** landlord is over
   the threshold (it depends on income the agency cannot see, including trade income and other
   properties); how a joint-ownership split should be recorded; anything involving a Form 17
   election; whether to elect calendar quarters; and any question that starts "should I". Give the
   agent the clean sentence to use when handing off, in the agent's own voice. **No service claim of
   ours anywhere in this section or elsewhere.**

8. **Thresholds as dates the reader acts on** (`_language_spec.md` §3 Explainer 4 row). The three
   tiers and the return each is tested against, per §5c point 5. The gross-and-aggregated rule per
   §5c point 6. The joint-owner share rule per §5c point 7. Figures go in the sentence about what the
   reader does, never in a parenthesis subordinate to an abstract subject (hard rule 10).

9. **The scenario device, at least three times** (hard rule 9). A landlord's question in quotation
   marks, then the answer in the agent's voice. Use the questions agents actually get: *"You collect
   my rent, so don't you do the tax thing?"*, *"My bank statements say forty-two grand, so I'm under
   fifty, right?"*, *"Can you just email me the numbers in January?"*. Answer each in one or two
   sentences.

10. **Penalties, briefly**, per §5c point 9. One short block. An agent needs the shape of the answer,
    not the schedule.

11. **The close names a job the reader was already doing** (`_language_spec.md` §2 P7). For an agency
    that job is the monthly statement run and the annual data export, which already exist. The close
    is what to change about them, in the imperative, with no service, no form and no offer. Each pack
    in this batch closes differently: this one closes on the export format, and no other page in the
    batch may reuse that close.

**Anti-templating boundaries, do not re-walk:** the joint-owner quarterly cycle belongs to
`/blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse`;
the ASA handshake belongs to
`/blog/making-tax-digital-mtd/mtd-itsa-agent-services-account-asa-authorisation-walkthrough`; the
qualifying-income test belongs to
`/blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net`; NRL withholding belongs
to `/blog/non-resident-landlord-tax/nrl-scheme-letting-agents-quarterly-returns-mechanics`; the head
term belongs to the MTD pillar. Name each in a sentence and link out. Do not rebuild any of them.

**Do-not-write, quoted from house_positions §19.9 and §19.17.** Every one of these is a QA fail:
- "Letting agent files quarterly updates for the landlord."
- "MTD applies to limited companies from April 2026."
- "MTD applies to general partnerships from April 2026."
- "£10,000 is the MTD threshold."
- "Joint owners test against the property's total gross."
- "Late submission produces an immediate £200 penalty."
- "Late payment penalties are 2%/2%/4%."
- "Copy-paste between spreadsheet cells is a digital link."
- "ASA authorisations transfer to a new agent automatically."
- "Foreign property income is excluded from MTD."

## 7. Acceptance criteria

Every criterion below is checkable. QA runs two Opus tracks against this list: adversarial factual
against house_positions, and editorial quality.

1. **Writer model: Opus.** Batch size 1. No other model writes any part of this page.

2. **The pack is the whole world.** No sourcing outside this pack, `_language_spec.md`, `DOSSIER.md`,
   `ledger.csv` and `house_positions.md`, except the write-time verifications this pack explicitly
   requires (SA105 box numbers, §5b point 13).

3. **Register targets, quoted from `_language_spec.md` §3, "Explainer 4: MTD for a managed portfolio,
   who files what" row, and measured on body prose only:**

   | Metric | Target |
   |---|---|
   | Register | Agent-as-you |
   | Second person "you" per 1,000 words | **15 or above** |
   | Citation-style references per 1,000 words | **0** |
   | Notice-name references per 1,000 words | **5 to 10** |
   | Flesch reading ease | **45 or above** |
   | Mean sentence length | **18 words or below** (hard rule 2) |
   | Words | **1,400 to 2,000** |
   | Question headings | **half or more of H2s** (hard rule 7) |
   | Tables | **1 maximum** (hard rule 13) |
   | FAQ | **5 or 6 questions**, each a near-verbatim query (hard rule 15) |

   "You" is the **agent**. The landlord is "your landlord client", "the landlord you act for" or "the
   landlord". Three of our four tracked pages use "you" zero times across 8,155 words; that is the
   failure mode being corrected.

4. **Citation grammar.** Zero `s.13`-style abbreviations, zero `SI 2026/336`-style instrument
   references, zero `reg.25`, zero `Sch` references in prose. Notice-names only. **No statute
   reference in any heading** (hard rule 8). The absolute ceiling for the batch is one citation-style
   reference per 1,000 words; this page's target is zero, and any instrument that must be identified
   goes in a single reference line at the foot.

5. **Named keywords placed.** `making tax digital rental income` appears naturally in the body and in
   at least one FAQ question. `letting agent mtd`, `mtd quarterly updates landlords` and `mtd for
   landlords 2026` are each present as a natural phrasing somewhere in copy or FAQ. The H1 and
   metaTitle are agent-register and carry the who-files-what question.

6. **`making tax digital landlords` (590/mo) is DECLINED, not chased**, and the MTD pillar is linked.
   The decline and its reason go in the coverage note.

7. **Figures.** Every figure on the page matches house_positions as patched 2026-08-21, or is
   declined. Specifically: £50,000 / 6 April 2026 / 2024-25 return; £30,000 / 6 April 2027 / 2025-26
   return; £20,000 / 6 April 2028 / 2026-27 return; quarterly deadlines 7 August, 7 November, 7
   February, 7 May; end-of-period statement and final declaration 31 January; 4 points then £200;
   3% day 15, 3% day 30, 10% a year from day 31. No unsourced commission percentages, no unsourced
   net-to-gross ratios, no invented materiality thresholds.

8. **All eleven §6 content points present**, including the "what has not changed" block and the
   "what an agent can safely say" section as genuine sections, not single lines.

9. **All fifteen §5b KEEP items survive** in substance, handled additively where kept.

10. **All thirteen §5c corrections applied**, each recorded in the coverage note.

11. **No named worked-example persona.** No pricing. No service claim. No "how we can help" block.
    No aside offering a review, a check, a call or a consultation. No shared CTA template with the
    other two packs in this batch, and never "We can produce a written {noun} for/on your {noun}".

12. **Zero em-dashes. UK English.** Nothing on the page datable to a week (hard rule 11): dated
    statements name the date they are true from, never the date the page was written.

13. **Coverage note written to `briefs/property/agents/notes/mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly.md_coverage.md`.**
    It must record: the zero-equity measurement and its date; the declined keyword
    `making tax digital landlords` (590/mo, already-covered by the MTD cluster pillar, linked); the
    three unmeasured agent-tail terms and the honest statement that they carry no recorded volume;
    every correction from §5c with the house_positions section that governs it; and the SA105
    box-number verification result (verified, or dropped to words). Citation-style paragraph
    references belong in the coverage note, not in prose.

14. **No middleware change.** The slug exists; `SLUG_TO_CATEGORY_MAP` is not touched for this page.

15. **QA factual re-derives every figure independently** against house_positions §19. The writer
    does not get the benefit of the doubt on any number.

## 8. Expectation + failure trigger

- **Re-baselining:** at deploy this page **re-baselines in `monitored_pages` IN PLACE**, with a
  supersession note. The registrar dedupes on slug, so no new row is created and the closed window
  (ended 2026-08-21) is superseded rather than duplicated. Standard monitored_pages registration
  inside the existing weekly detector only. **No new monitor, cron, alert, digest or notification of
  any kind** (DOSSIER.md §10, and the owner ruling in §1).

- **Deploy is owner-triggered.** Build local-first. Do not deploy, do not submit IndexNow, do not
  register monitored_pages unless the owner asks in that turn.

- **90-day read** (DOSSIER.md §10).

- **Success at 90 days:** any stable presence on either engine. Equity to preserve was **zero on both
  engines**, so any Bing row or any GSC impression is a strict improvement. The sharpest available
  test is a GSC impression on an MTD-plus-letting-agent phrasing, or any Bing row at all, since the
  page has never had either.

- **Page-level failure trigger:** zero Bing rows **and** zero GSC impressions on this URL at the
  90-day read means the overhaul did not rescue the page, and the register flip did not buy
  visibility on a zero-volume keyword set. That is a page-level failure and it should be reported as
  one, not softened.

- **Single-keyword risk, disclosed** (DOSSIER.md §10): one measured term at 50/mo and three terms
  with no recorded volume. This page carries more measurement risk than page 5 in the same cluster,
  which has a 1,000/mo head family. That is a known and accepted consequence of rescuing an invisible
  page in an unmeasured register, not a surprise to be explained after the fact.

- **Cluster-level trigger, for context:** zero Bing rows AND zero GSC impressions **across the whole
  agents1 cluster** at the 90-day read falsifies the register thesis, and no Track-2-style audience
  surface gets built on this evidence base.
