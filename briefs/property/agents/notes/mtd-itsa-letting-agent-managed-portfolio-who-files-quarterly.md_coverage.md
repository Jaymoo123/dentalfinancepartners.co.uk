# Coverage note: mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly

Page 3, agents1 cluster. Grade REFRAME (full overhaul, register flip to agent-as-you).
Written 2026-08-21 against `PACK_mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly.md`,
`_language_spec.md`, `DOSSIER.md` and `docs/property/house_positions.md` as patched 2026-08-21.
Slug, category ("Making Tax Digital (MTD)"), canonical URL and frontmatter field set unchanged.
No middleware change.

## Equity measurement

Zero on both engines, measured 2026-08-21 (GSC API 90d window, data through 2026-08-19,
`_gsc_family_queries.json`; Bing `GetPageQueryStats` per URL, `_bing_page_queries.json`):

| Engine | Rows | Impressions | Clicks |
|---|---:|---:|---:|
| Google Search Console (90d) | 0 | 0 | 0 |
| Bing Webmaster (per-page) | 0 | 0 | 0 |

Nothing to preserve, so no query set drove the outline. The outline came from the DOSSIER §7 row 3
keyword assignment and the `_language_spec.md` §3 "Explainer 4" register row, as the pack directs.
Monitored-pages window closed 2026-08-21, so the one-change-per-window rule did not block the edit.
Re-baselines in place at deploy with a supersession note; no new monitor, alert or notification.

## Keywords placed

| keyword | vol/mo | placement |
|---|---:|---|
| making tax digital rental income | 50 | FAQ 2 question, verbatim; body carries the non-welded phrasing "that is what Making Tax Digital treats as rental income" |
| letting agent mtd | 0 | body, opening sentence of the related-guides section ("Letting agent MTD questions run into four neighbouring areas"); also the title and metaTitle |
| mtd quarterly updates landlords | 0 | **removed from the body** at the fix round, see the QA fix-round section below |
| mtd for landlords 2026 | 0 | FAQ 1 question, verbatim, in typed-query form ("MTD for landlords 2026: can my letting agent file the quarterly updates on my behalf?") |

The three zero-volume terms carry no recorded Google Ads volume and no recorded Bing history
(DOSSIER §1: every agent-phrased seed returns zero on both). They are present as phrasings, not as
ranking promises. Single-keyword risk is disclosed in the pack §8 and is unchanged by this write.

## Keyword DECLINED

**`making tax digital landlords`, 590/mo (DataForSEO, UK, pulled 2026-08-21).** ALREADY-COVERED by
the MTD cluster pillar pages (ledger bucket `already-covered`, DOSSIER §9). This page does not chase
the head term. It links the pillar by name in the related-guides section:
`/blog/making-tax-digital-mtd/mtd-itsa-overview-six-changes-residential-landlords`
("MTD ITSA overview for residential landlords"). Link verified present on disk.

## Corrections applied (pack §5c), with governing house position

1. **Named worked-example persona "Singh" deleted.** Replaced with an unnamed fully managed three-bed
   for "a landlord you act for". Illustrative figures kept unchanged (£1,650 gross, £165 commission,
   £20 admin, £90 gutter clean, £135 boiler service, £60 gas safety, £1,180 net). Cluster rule,
   DOSSIER-level.
2. **Three service asides deleted in full** (old lines 124, 150, 186: property-tax team data-flow
   setup, consolidated bookkeeping offer, fixed-scope readiness review). Not replaced with anything
   softer. `_language_spec.md` hard rule 14 + DOSSIER §1 owner ruling (pure resource surface).
3. **"Setting it up before April 2026" section deleted as stale framing.** Every anticipation
   sentence removed ("use the lead time before 6 April 2026", "reach April 2026 with a portfolio set
   up properly", "the January 2026 statement as a parallel run", "started by autumn 2025", "six to
   nine months of lead time"). Replaced by the present-tense close on the statement run and the
   export format. §19.1 (the mandate is live from 6 April 2026).
4. **Three unsourced quantifications cut.** (a) "typically 8 to 14% on managed lets" commission
   range, gone, the illustrative statement speaks instead; (b) "roughly 80 to 85% of the gross rent
   lands in your bank account", gone; (c) "more than 5% of the year's commission, say" materiality
   rule, gone. `_language_spec.md` §4 do-not-copy on unsourced quantification, applied to our own
   page. No replacement figures invented.
5. **Threshold ladder completed from one tier to three, with test years.** More than £50,000 from
   6 April 2026, tested against the 2024/25 return; more than £30,000 from 6 April 2027, tested
   against the 2025/26 return; more than £20,000 from 6 April 2028, tested against the 2026/27
   return. HMRC writes to those who look in scope and the obligation stands whether or not the letter
   arrives. **§19.1.**
6. **Gross test widened from rent-only to aggregated qualifying income.** Gross self-employment
   turnover plus gross property rental income, before deductions, aggregated for the test; £30,000 of
   trade plus £25,000 of rent is £55,000 and in scope. Excluded categories added: employment income
   under PAYE, pensions, dividends, savings interest. **§19.2.**
7. **Joint-owner threshold consequence added.** Joint owners test their own share of gross, never the
   property's total; £100,000 jointly grossed tests at £50,000 each on the default 50/50 split; a
   Form 17 election shifts the shares and can pull one owner in a year earlier. **§19.4**, and the
   §19.9 do-not-write ("joint owners test against the property's total gross") is avoided explicitly.
8. **Digital links promoted from a single FAQ to a body section and widened beyond PDFs.** Definition
   (transfer between software or spreadsheet cells with no manual transcription or copy-paste),
   acceptable list (cell references and formulae, linked tables, API extract, scripted CSV import),
   unacceptable list (copy-paste, re-keying, screen-reading), the PDF-is-not-a-digital-record
   consequence, the agency-side CSV or structured export fix, and the SA105-shaped column discipline
   (gross rent, agent fees, repairs, insurance, council tax, finance costs, other). No software
   product named. **§19.14**, plus §19.6 (do not hard-code product names) and the §19.17
   do-not-write on copy-paste.
9. **Penalty regime added (the page previously carried none).** Late submission is points-based, one
   point per missed quarterly update, penalty threshold four points for quarterly filers, £200 per
   missed submission once at threshold. Points reset requires both a 12-month compliance period and
   every submission due in the preceding 24 months made (dual-condition test, both limbs surfaced).
   Late payment for MTD ITSA filers from 6 April 2026: 3% of the unpaid tax from day 15, a further 3%
   from day 30, then 10% a year from day 31. **§19.7 + §19.19.** The two §19.9 do-not-writes
   (immediate £200; 2%/2%/4%) are avoided, and the "not an instant fine" phrasing states the point
   directly.
10. **Citation grammar: zero citation-style references in prose, none in any heading.** Measured 0
    per 1,000 words. The operative instrument is identified once, in a single reference line at the
    foot of the page, as the Income Tax (Digital Obligations) Regulations 2026, which replaced the
    2021 digital requirements regulations on 1 April 2026. **§19.18.** Nothing describes the 2021
    regulations as live.
11. **FAQ cut from 12 to 6**, each phrased as a near-verbatim query: agent-filing-on-my-behalf; the
    Making Tax Digital rental income gross-versus-net question; the net-of-fees statement question;
    the PDF-only statement question; the three-agents question; the joint-owner split question. The
    other six (commission category, contractor evidence chain, year-end rebate amendment, accountant
    filing via ASA, NRL interaction, agent-in-administration) were cut; the substance of the
    commission category, the year-end reconciliation rule, the ASA route and the NRL interaction all
    survive in the body. `_language_spec.md` hard rule 15.
12. **`metaTitle`, `metaDescription`, `title`, `h1` and `summary` all rewritten in the agent
    register.** The old landlord-addressed metaDescription is gone. `_language_spec.md` §3 and hard
    rule 3.
13. **`dateModified` and `reviewedAt` moved to 2026-08-21.** `date` (first published, 2026-05-23) is
    unchanged: `BlogPostRenderer.tsx` renders `date` as "First published" and `dateModified` as
    "Last updated" whenever the two differ, which is the intended display. **Additional fix beyond
    the pack:** `reviewerCredentials` is rendered publicly (BlogPostRenderer line 333), and the old
    text carried the internal code "house position §19.13" onto a live surface. That reference was
    rewritten into reader-facing prose and the section codes moved to `editorialNote`, which is not
    rendered anywhere. Six other Property blog files still carry the same leak; logged to
    `notes/delta.md`, not swept here.

## SA105 box-number verification

**Dropped to words, not verified.** The old page carried "SA105 box 27", "box 25" and "box 29" for
the three expense categories. No locked box-number position exists in `house_positions.md` §19
(§19.14 names the categories, never the boxes), and the pack forbids guessing a box number. Per pack
§5b point 13 the categories are therefore named in words only: "legal, management and other
professional fees", "property repairs and maintenance" and "other allowable property expenses". All
three box numbers are removed from the page. If a future write verifies them against the current
SA105, they can be reinstated as a lock first.

## KEEP items carried forward

All fifteen pack §5b items survive in substance: landlord-is-the-filer spine; statement as source
document; gross collected as the income line; the profit-neutral but threshold-distorting trap
wording; £50,000 from 6 April 2026; the four quarterly deadlines plus the 31 January end-of-period
statement and final declaration; one cycle for the whole portfolio however many properties or
agencies; joint owners recording their share with 50/50 default absent Form 17; the agency is not a
tax agent without an Agent Services Account authorised for MTD ITSA and an old 64-8 does not carry
over; the authorisation is granted by the landlord through the gov.uk portal with their own
Government Gateway login; copy-paste is not a digital link (promoted to body); Non-Resident Landlord
Scheme withholding running alongside with the tax withheld as a credit at final declaration; the
three SA105 expense categories named in words; no amendment of a closed quarter for a post-quarter
reconciliation (with the invented 5% materiality rule cut); and all five outbound internal links,
each verified present on disk.

## QA fix round, 2026-08-21

Applied after `qa/FACTUAL_mees-mtd-deposits.md` (2 BLOCKER, 2 ADVISORY) and
`qa/EDITORIAL_batchA.md` §"Surface 2" + `qa/EDITORIAL_batchB.md` §"Batch-wide sameness adjudication".
`house_positions` §19.7 was patched the same day with the two positions the lock was missing; every
penalty figure below is re-derived against the patched lock, not against the QA report.

**Factual BLOCKER 1, first-year late-payment concession (§19.7 [08-21] addition (a)).** The page said
late payment "bites faster" from 6 April 2026 with no concession, which overstated exposure for its
own audience: the April 2026 cohort is precisely the cohort in its first year of the new penalties.
Added as its own paragraph: in a landlord's first year, HMRC allows 30 days from the payment due date
to pay in full or agree a payment plan before any late-payment penalty starts, and the concession is
once only.

**Factual BLOCKER 2, the £200 trigger (§19.7 [08-21] precision).** Old wording ("once a landlord is
at that threshold each further missed submission costs £200") read the fourth miss as free. Now: "The
fourth missed update takes a landlord to that threshold and triggers a £200 penalty, and every missed
submission after that costs another £200."

**Factual ADVISORY 1, open-ended percentages (§19.7 [08-21] addition (b)).** "From 6 April 2026 it
runs at 3%..." is now "For the 2026 to 2027 tax year it runs at 3%...", because the rates step to
4%/4%/10% for 2027-28. The page no longer goes stale silently on 6 April 2027.

**Factual ADVISORY 2, a safe-to-say item over the line.** "What each line on your statement is, and
which category it belongs to" contradicted the page's own split (the table says the agency never
categorises for tax). Now "…and which line is the gross rent."

**Editorial BLOCKER 2.1, `reviewerCredentials`.** "our locked house positions" plus a build-date
stamp were rendered live at `BlogPostRenderer.tsx:333`. Replaced with reader-voice text and no date;
`reviewedAt` already renders as "Last reviewed 21 August 2026" underneath. All internal section codes
live only in `editorialNote`, which nothing renders.

**Editorial BLOCKER 2.2, the 88-word standfirst.** `summary` renders above the body, so the page as
published opened on a seven-clause table of contents, which is the scope-setting opener hard rule 4
bans. The TOC sentence is deleted. Its replacement doubles as the fix for ADVISORY 2.6 (the body
addresses the agent, the FAQ questions are typed by landlords, and nothing signposted the switch):
"The questions at the end are the ones your landlords ask, answered as you would answer them."

**Editorial BLOCKER 2.3, the W8 lift.** "That is the short version. The detail matters because…" was
nine consecutive words of a competitor's copy, and it appeared on three surfaces in this batch.
Replaced with the batch-B drop-in: "That answers the call. What follows is the three questions that
come straight back at you, and the one that costs a landlord money."

**Editorial BLOCKER 2.4, three keyword-welded sentences.** All three rewritten as prose:
"MTD for landlords in 2026 is only the first of three tiers" became "The 2026 start is only the first
of three tiers"; "The Making Tax Digital rental income figure is…" became "The figure that counts is
the gross rent collected, never the net paid over, and that is what Making Tax Digital treats as
rental income"; and "These are the MTD quarterly updates landlords find hardest" was cut, since the
sentence before it already said three agencies means three formats. **Keyword consequence, recorded
rather than worked around:** `mtd for landlords 2026` moved into FAQ 1's question in typed-query
form; `making tax digital rental income` remains verbatim in FAQ 2's question with a natural
non-welded phrasing in the body; `mtd quarterly updates landlords` is now absent as a contiguous
phrase. All three carry zero recorded Google Ads volume and zero Bing history, so nothing measurable
is lost, and the editorial blocker outranks a literal-token placement.

**Editorial BLOCKER 2.5, the "what has not changed" lead-in.** "Name those things by name" was the
spec's own writer-facing instruction transcribed into reader copy, and the "Most of what … did not
move" frame appeared on all five blog surfaces. Replaced with "None of this moved, and a landlord who
believes otherwise has read something wrong."

**Editorial ADVISORY E, heading sameness.** "The one-line answer" was the verbatim H2 on 5 of 5
surfaces and is a competitor's exact heading string. Retitled to "Who files, in one line". The
labelled-answer rule is still satisfied.

**Editorial ADVISORY 2.7, pound-figure density.** The £100,000 to £50,000 joint-owner threshold
arithmetic is cut from the body. It is not lost: the pack requires that §19.4 example, so it moved
into FAQ 6, which is where the joint-owner split already lives. Body pound figures now 22.

**Editorial ADVISORY 2.9, no link back to the hub.** Added at the end of the related-guides section.
Phrased away from the RRA and MEES hub routes, which ADVISORY F flagged as near-identical to each
other: "The rest of this year's landlord questions are collected on our letting agent hub."
`/for-letting-agents` verified present at `Property/web/src/app/for-letting-agents/page.tsx`.

**Editorial ADVISORY G, foot line.** "Reference: …" opened the same way as the MEES page. Now opens
"The operative instrument is…".

**Adjudication item 7, numeric-preface openers.** Two of the page's four flattened: "Three things
follow from that split" became "That split has three consequences"; "Two edge cases you will meet"
became "You will meet two edge cases".

**Not applied, with reasons.** (a) ADVISORY D's "keep one, make the other plain" on informal money in
a quoted landlord question ("forty-two grand" here, "eight hundred quid" on the deposits page): the
pack §6.9 names this question verbatim as a mandated scenario line, so it stays here and the choice
belongs to the deposits writer. (b) Adjudication item 8, "four of five closing H2s begin 'What to'",
asks for two of the four to vary and names no page; left for the batch owner to allocate.
(c) ADVISORY 2.8, notice-name rate measured 0.0 on the spec's RRA-calibrated regex: QA itself
recorded this as a metric that does not transfer to a tax page and proposed no fix. Measured on the
MTD family's own reader-vocabulary names it is 8.5 per 1,000.

## Self-measured register (body prose only, table cells and frontmatter excluded)

| Metric | Target | Measured |
|---|---|---|
Re-measured after the QA fix round.

| Metric | Target | Measured |
|---|---|---|
| Words | 1,400 to 2,000 | **2,000** |
| Second person "you" per 1,000 | 15 or above | **15.5** (31 occurrences) |
| Citation-style references per 1,000 | 0 | **0** |
| Notice-name references per 1,000 | 5 to 10 | **8.5** (17 occurrences, MTD-family names) |
| Flesch reading ease | 45 or above | **62.5** |
| Mean sentence length | 18 words or below | **14.7** |
| Question headings | half or more of H2s | **8 of 12** |
| Tables | 1 maximum | **1** (who-does-what) |
| FAQ | 5 or 6 | **6** |
| Em-dashes | 0 | **0** |

Six internal links, all resolving: five blog targets present in `Property/web/content/blog/`, plus
`/for-letting-agents` present at `Property/web/src/app/for-letting-agents/page.tsx`.

Scenario device used four times: "You collect my rent, so don't you do the tax thing?"; "My bank
statements say forty-two grand, so I'm under fifty, right?"; "Can you just email me the numbers in
January?"; plus the handoff sentence written in the agent's own voice. No pricing, no service claim,
no named persona, no shared CTA template, no aside offering a review or a call.
