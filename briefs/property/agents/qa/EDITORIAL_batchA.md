# Editorial QA: agents1 batch A

Reviewed 2026-08-21. Read-only pass. Nothing was edited.

**Assigned surfaces (verdict):**

| Surface | Verdict |
|---|---|
| `Property/web/src/app/for-letting-agents/page.tsx` | **must_fix** (1 BLOCKER, 5 ADVISORY) |
| `Property/web/content/blog/mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly.md` | **must_fix** (5 BLOCKER, 4 ADVISORY) |
| `Property/web/content/blog/tenancy-deposits-landlord-tax-position.md` | **must_fix** (2 BLOCKER, 5 ADVISORY) |

**Cross-batch surfaces read for adjudication (findings recorded, not a full QA):**
`rra-2026-whats-in-force-letting-agents.md`, `mees-epc-rules-what-your-landlords-think.md`,
`prs-database-landlord-ombudsman-registration-requirements.md`. One BLOCKER-class leak found on the
PRS database page.

## What passes, counted

Stated first because most of the standing checklist is clean and the report should not imply otherwise.

- **Em-dashes: 0.** Counted directly on all six files, U+2014, U+2013 and the `&mdash;`/`&#8212;` entity
  forms. Zero on every surface. (Spec §5 standing rule, met.)
- **UK English: clean.** No `-ize`, `organiz-`, `analyz-`, `behavior`, `color`. The one `organized` hit is
  inside a Pexels source URL.
- **No pricing on page.** No PropertyTaxPartners fee, rate or quote anywhere in the batch.
- **No named personas.** The RRA page's worked example is "a two-bed flat in your managed portfolio",
  correctly unnamed against W5's "Priya".
- **No AI-tell vocabulary.** Zero hits for delve, navigate, crucial, robust, leverage, landscape,
  "it's worth noting", "when it comes to", "in conclusion", "not just X, it's Y".
- **The banned template is absent.** No instance of "We can produce a written {noun} for/on your {noun}"
  or any close variant on any of the six.
- **Measured targets are met on all three assigned surfaces**, and comfortably:

| Surface | Words | Mean sent. | Flesch | "you"/1k | Cite | Notice/1k | Q-H2 | FAQ | Tables |
|---|---|---|---|---|---|---|---|---|---|
| Hub (target: 900-1,600 / - / 48+ / 15+ / 0 / 10-15 / exempt / none / -) | 1,000 | 17.1 | 68.1 | 38.0 | 0 | 12.0 | n/a | none | 0 |
| MTD (target: 1,400-2,000 / <=18 / 45+ / 15+ / 0 / 5-10) | 1,929 | 14.9 | 61.9 | 26.4 | 0 | **0.0** | 8/12 | 6 | 1 |
| Deposits (target: 1,200-1,800 / <=18 / 45+ / 12+ / 0-1 / 5-10) | 1,355 | 16.6 | 66.5 | 18.5 | 0 | 5.2 | 5/7 | 6 | 0 |

Body only, tables and frontmatter excluded, same extraction shape as the spec. Flesch uses the standard
formula with a regex syllable heuristic, so it is comparable within this table rather than absolute. The
one measured miss is MTD's notice-name rate, treated below.

The batch has fixed the two failures the spec was written to fix: citation grammar is gone (0, 0, 0
against our old median of 11.6) and reading ease has moved roughly 35 Flesch points. The findings below
are about a different problem, which is that the three writers converged.

---

## Surface 1: `/for-letting-agents` (hub)

**Verdict: must_fix.** Every measured target is hit and the register is right throughout ("you" is the
agent on all nine sections). One reader-facing pipeline word and a set of shared-shape issues.

### BLOCKER 1.1 — pipeline vocabulary in the hero, second sentence of the page

> "This page is a resource surface for letting and estate agents."

"Surface" is our internal word for a page. To a letting agent it is meaningless, and it is the second
sentence they read. (The same jargon recurs on the PRS database page: "your listing workflow becomes the
compliance surface for somebody else's registration duty".)

**Drop-in fix:** `This page is for letting and estate agents.`

### ADVISORY 1.2 — the embed section is the closest thing in the batch to a "how we can help" block

> "Every calculator here can sit on your own website. It is one line of HTML, it costs nothing, and we
> keep the rates current so that you never have to think about it again."

Spec §5.14 bans a service block inside the body of an explainer, and the hub row of the §3 table says
the hub is "a routing page not a guide". This is not a priced offer and it is not an explainer, so it is
not a rule breach, but it is the one place in six surfaces where we ask the reader to do something for
us. It also carries the batch's only forward promise ("you never have to think about it again").

**Drop-in fix:** cut the promise clause. `Every calculator here can sit on your own website. It is one
line of HTML and it costs nothing.`

### ADVISORY 1.3 — the same no-gate reassurance twice

> Hero: "Nothing here is gated and nothing asks your landlord for their details."
> Calculators section: "These are free to use, they need no sign-up, and none of them asks a landlord
> for contact details."

Same claim, 150 words apart. Padding.

**Drop-in fix:** cut the second one to `Send one instead of doing the sum on the back of a viewing sheet.`
and let the hero carry the point.

### ADVISORY 1.4 — imprecise on the MEES cap, and out of step with the MEES page it links to

> "Above a landlord cost cap of £3,500 including VAT, a landlord can register an exemption instead of
> spending more."

"Above" is the wrong preposition for the mechanic: the exemption becomes available once spending reaches
the cap, not above it. The MEES explainer states it correctly ("Spend up to it, or register an exemption
once you reach it"), so the hub is the weaker of the two on our own differentiating fact.

**Drop-in fix:** `Once a landlord has spent £3,500 including VAT on getting there, they can register an
exemption instead of spending more.`

### ADVISORY 1.5 — closing section is meta-commentary about the page

> "The quickest way to use this page is to pick the three questions you were asked most last month and
> keep those links to hand."

Two paragraphs of instructions on how to use a page the reader is already using. It is the weakest 70
words on the surface and the only place the hub talks about itself.

**Drop-in fix:** cut the "Forwarding these to your landlords" section entirely, or keep its first
paragraph only.

### ADVISORY 1.6 — link label duplicates its own H2

H2 "Deposits and the landlord's tax position" sits directly above the link label "Deposits: the
landlord's tax position", pointing at a page titled "Tenancy Deposit Tax Treatment: The Landlord's
Position". Three near-identical strings in one 8-line block.

**Drop-in fix:** relabel the link `What to tell a landlord at check-out`.

---

## Surface 2: MTD ITSA letting-agent page

**Verdict: must_fix.** The strongest page in the batch on structure and the weakest on leakage. Five
blockers, four of which are one-line fixes.

### BLOCKER 2.1 — internal apparatus rendered on the live page

`reviewerCredentials` is rendered as visible page copy by `BlogPostRenderer.tsx:333` (inside the
"Reviewed by" aside). The current value ends:

> "Thresholds, quarterly deadlines, digital-link rules and penalty figures on this page were re-verified
> against **our locked house positions** on 21 August 2026."

The `§19.x` section codes flagged previously are gone, so that half is fixed. "Our locked house
positions" is not: it is internal pipeline vocabulary shown to a letting agent, and it is a
build-date stamp in reader-facing copy (spec §5.11).

**Drop-in fix:** `UK-based tax advisers specialising in property income, Making Tax Digital for Income
Tax, and the working interface between letting agents, landlords and accountants.` Stop there. The
"Last reviewed 21 August 2026" line the component already renders from `reviewedAt` carries the date.

(`editorialNote` is not read by `src/lib/blog.ts` and is not rendered anywhere, so its `house_positions
§19.1 … briefs/property/agents/_language_spec.md §3` content is safe where it is.)

### BLOCKER 2.2 — the standfirst is an 88-word table of contents, and it is the first prose on the page

`summary` renders directly under the H1 at `text-lg` (`BlogPostRenderer.tsx:215`), above the body. Its
third sentence:

> "This page is written for the agent fielding that question: who does what, which landlords are in
> scope and from when, why gross rent rather than the money reaching the bank decides the threshold
> test, how a monthly statement maps into the quarterly update categories, what a PDF-only statement
> quietly breaks, what the penalties look like, and exactly where the line sits between what you can
> safely tell a landlord and what belongs with their accountant."

88 words, seven clauses, one per H2. Spec §5.4: "never open on 'this guide walks through', never open on
scope-setting. Two sentences maximum before the answer." The body obeys that rule; the standfirst
rendered above it breaks it, so the page as published opens on scope-setting. It is also the batch's
clearest keyword-list-as-prose.

**Drop-in fix:** delete the third sentence. `A landlord on a fully managed let assumes the agency that
collects the rent also files the quarterly updates. It does not, and the landlord does.` That is the
labelled answer, at the top, in 27 words.

### BLOCKER 2.3 — verbatim competitor phrase, shared with two sibling pages

> "That is the short version. The detail matters because the next three questions come straight back at
> you, and a landlord who gets them wrong pays for it."

W8 (spec §2, P2): "That's the short version. The detail matters because the firms doing this checklist
properly…". Nine consecutive words lifted. The spec quotes that sentence as *evidence of a structural
move*, not as copy to reuse, and §5.4 licenses only the "The one-line answer" heading. The same nine
words appear on the deposits page and the PRS database page. Three surfaces, one competitor's sentence.

**Drop-in fix (this page):** `That is what you can say in one breath. The next three questions are the
ones that cost a landlord money.`

### BLOCKER 2.4 — keyword phrases welded into copular sentences

Three in one page, each an exact-match query string used as a sentence subject or complement:

> "**MTD for landlords in 2026** is only the first of three tiers, and each tier has a start date and a
> test year."

> "The **Making Tax Digital rental income** figure is the gross collected, never the net paid over."

> "These are the **MTD quarterly updates landlords** find hardest, and if you are one of the three
> agencies, a clean export is the most useful thing you can hand over."

The third does not parse cleanly ("the MTD quarterly updates landlords find hardest" has no antecedent
in the paragraph) and carries an unsupported superlative. All three read as insertions rather than
sentences.

**Drop-in fixes:**
- `The 2026 start is only the first of three tiers, and each tier has a start date and a test year.`
- `The figure that counts is the gross rent collected, never the net paid over.`
- `Three agencies means three formats, and if you are one of the three, a clean export is the most useful
  thing you can hand over.`

### BLOCKER 2.5 — the "what has not changed" block opens on the brief's own instruction

> "Most of what a landlord will ask you is about something that did not move. Name those things by name."

Spec §5.5 tells the writer: "Name the things that stayed the same, by name." That instruction has been
transcribed into reader-facing copy, and the "Most of … did not move" frame appears on all five blog
surfaces. Treated in full in the sameness adjudication below.

**Drop-in fix:** `Most of what a landlord will ask you at this point is about something that did not
move. Here they are.`

### ADVISORY 2.6 — "you" is the agent in the body and the landlord in the FAQ, on the same rendered page

Body: "Your agency never touches the submission." FAQ: "Can my letting agent file the quarterly updates
on my behalf?" answered "…**you** file one cycle covering all **your** UK property income".

Spec §5.3 is unambiguous ("'you' is the agent"), and §5.15 wants FAQ questions as near-verbatim SERP
queries, which are typed by landlords. Both are defensible; the collision is that nothing on the page
signposts the switch, and both blocks render together.

**Drop-in fix:** one line above the FAQ block, or in the `summary`: `The questions below are the ones
your landlords ask, answered as you would answer them.` Cheaper than rewriting six answers.

### ADVISORY 2.7 — 23 pound figures in the body

Winner median is one per page; spec §5.10 says "Cut the figure count and put the survivors in the
reader's verb." The worked statement (£1,650 / £165 / £20 / £90 / £135 / £60 / £1,180) is load-bearing
and should stay. The threshold paragraph restates £50,000/£30,000/£20,000 and then re-derives
£30,000 + £25,000 = £55,000 and £100,000 → £50,000 within six sentences.

**Drop-in fix:** cut the £100,000 joint-owner arithmetic from the body; it is already worked in FAQ 6.

### ADVISORY 2.8 — notice-name rate is 0.0 against a 5-10 target

Measured against the spec's own definition (Section 13/21/8 written out, Act names), this page scores
zero. In practice it uses the MTD family's equivalent reader-vocabulary names throughout: Form 17, 64-8,
Agent Services Account, Self Assessment, end-of-period statement, final declaration. Recorded as a
metric that does not transfer to a tax page rather than a defect. No fix proposed.

### ADVISORY 2.9 — no link back to the hub

The hub links here; this page does not link back. RRA and MEES both close on a hub link. Two of five
explainers reciprocate.

---

## Surface 3: tenancy deposits page

**Verdict: must_fix.** Cleanest measured surface in the batch (one pound figure, 5.2 notice-names, no
frontmatter leakage at all, 5 of 7 question headings). Its two blockers are both shared-shape.

### BLOCKER 3.1 — the same verbatim competitor sentence as 2.3

> "That is the short version. The detail matters because a landlord who wins at check-out has just
> received taxable rental income, and almost nobody tells them so."

**Drop-in fix:** `That is the whole rule. The part landlords never hear is the second half: a landlord
who wins at check-out has just received taxable rental income.`

### BLOCKER 3.2 — the "what has not changed" template, third instance

> H2: "What Has Not Changed?"
> "Most of what a landlord asks you at check-out is about something that did not move. These are the
> ones you will be asked about, and each is worth naming:"

Near-verbatim against the MTD page's version of the same block. See the adjudication.

**Drop-in fix:** H2 → `The parts that did not change`; lead → `Four of these come up at every check-out,
and none of them moved:`

### ADVISORY 3.3 — Title Case headings, alone in a sentence-case batch

All seven H2s are Title Case ("Why Is a Deposit Not Income When You Take It?"); the other five surfaces
are sentence case throughout. Both conventions exist across the wider Property blog (259 of 770 files
carry Title Case H2s), so this is not a house-rule breach. Within a six-surface batch shipped together
and cross-linked, it reads as three writers rather than one publisher.

**Drop-in fix:** convert to sentence case to match the batch.

### ADVISORY 3.4 — the literal "Answer:" marker, three times

> "Answer: it is. You record eight hundred pounds…"
> "Answer: no, and it has been no since…"
> "Answer: no, not while it is still the tenant's money."

This is W8's scenario device copied down to its punctuation. Spec §5.9 asks for "a landlord question in
quotation marks, then the answer, in the agent's voice" — it does not ask for the word "Answer:". The
other four surfaces run the same device without the marker and read better for it.

**Drop-in fix:** delete the three "Answer:" prefixes. `"I kept eight hundred quid off the deposit for
the carpet, that's not income is it?" It is.`

### ADVISORY 3.5 — brushes the Explainer 5 client-money boundary, with a keyword phrase as the subject

> "**Client money protection for letting agents** is the scheme membership that protects the landlord and
> tenant money your agency holds, and it is an agency-side obligation. Your own client account and
> membership compliance sits outside this page, which is about the landlord's tax position."

Spec §3 Explainer 5: "Landlord tax treatment only; no client-money regulatory advice, no scheme
comparison." The paragraph disclaims client money by first defining it, and the definition is an
exact-match keyword phrase used as a sentence subject.

**Drop-in fix:** `Your agency's own client account obligations are a separate regime. This page is about
the landlord's tax position.`

### ADVISORY 3.6 — standfirst carries the batch TOC clause

> "This page covers the timing, the interaction with repairs, what happens when the deposit goes back in
> full, and where advance rent now sits after 1 May 2026."

Milder than MTD's but the same shape. See adjudication item 5.

**Drop-in fix:** delete the sentence. The two before it already give the answer.

### ADVISORY 3.7 — no reviewer block, no `dateModified`, no link back to the hub

Two of the five blog surfaces (MTD, PRS) carry `reviewedBy` / `reviewerCredentials` / `reviewedAt` and
render the "Reviewed by" aside; this page, RRA and MEES do not. Whatever the intent, it should be all
five or none, and the two that have it are the two carrying the leakage.

---

## Cross-batch findings on the three adjudication surfaces

Recorded because they are the same class of defect and cheap to fix in the same pass. Not a full QA of
those three pages.

### BLOCKER X.1 — `prs-database-…`: internal section codes still rendered on the live page

`reviewerCredentials`, which `BlogPostRenderer.tsx:333` renders as visible copy:

> "Commencement position aligned with **house positions §20.12** (Renters' Rights Act 2025 commencement
> timeline), **§26.5** (landlord redress scheme and the pre-existing 2014 agent regime) and **§26.6**
> (private rented sector database); every commencement claim and every figure on this page was
> re-verified against legislation.gov.uk and the government implementation roadmap at the review date."

This is the leak that was reported as fixed. It is not fixed on this page. Three section codes and the
phrase "house positions" are published to readers.

**Drop-in fix:** `UK-based property tax advisers writing for letting and estate agents. Every
commencement claim and every figure on this page was verified against legislation.gov.uk and the
government's published implementation roadmap.`

### BLOCKER X.2 — verbatim lifts from W5 (tenancypilot), across two pages

Three separate sentences from the p1 competitor, reproduced at near-verbatim length:

| Ours | W5, as quoted in the spec |
|---|---|
| PRS: "Do not let anyone persuade a landlord that a not-yet-live obligation is already mandatory" | "do not let a salesperson persuade you that a not-yet-live obligation is already mandatory" |
| RRA: "Treat the bottom four rows as indicative: the government has committed to them, but the dates are confirmed only by later regulations" | "Treat phased items as indicative: the Government has committed to them, but the exact go-live dates are confirmed only by later regulations." |
| PRS: "Say 'when the database opens, you will need to register', never 'you must register now'." | "the safest stance is conditional: 'when the database opens, you will need to register,' not 'you must register now.'" |

The third is partly licensed: spec §5.6 prescribes that exact conditional wording. The surrounding frame
("the safe stance is conditional", also in the PRS FAQ) is not. The first two are straight lifts of
distinctive phrasing with no spec instruction behind them.

**Drop-in fixes:** `Nobody can make a landlord register early, and nobody can charge them to.` /
`Treat the bottom four rows as expectations. The government has said it intends them; only regulations
make them dates.`

### BLOCKER X.3 — the Royal Assent / commencement explanation is duplicated across two pages

RRA: "Royal Assent puts the text on the statute book. Commencement makes a section operative. Until a
section is commenced it is dormant, it imposes no duties and it grants no rights."
PRS: "Royal Assent put the words of the Renters' Rights Act 2025 in the statute book. Commencement makes
a given section operative. Until a section is commenced it is dormant, and it imposes no duty on anyone."

Followed on both by the same payoff: RRA "That is why you can say the database is in the Act and also say
it is not in force, and be right both times" / PRS "So you can correctly say the database is in the
Renters' Rights Act 2025, and also say it is not in force. Both are true at once."

Two pages, one explanation, near-identical wording, both also derived from W5. The spec assigns W5's
shape to Explainer 1 (the RRA page), not to Explainer 6.

**Drop-in fix:** cut both paragraphs from the PRS page and route: `Royal Assent and commencement are two
different things, and the difference is what settles this. It is explained in full on our [what is in
force in 2026 page].`

### ADVISORY X.4 — citation-style references in the RRA table's Source column

`RRA 2025 s.145(2)`, `SI 2025/1354 + s.145`, `SI 2026/421 reg 2`, `SI 2026/324`, `SI 2026/638`,
`s.75 prospective`.

Spec §5.1: "Where a commencement instrument genuinely has to be identified, it goes in one reference
line at the foot of the page, never in prose." Table cells are excluded from the spec's *measurement*,
not from the rule; a Source column is reader-facing and is not the foot line. The page already carries a
correct foot reference line listing the same instruments, so the column is a duplicate.

**Drop-in fix:** drop the Source column, or replace its cells with `Commencement regulations` /
`Roadmap expectation` / `No commencement order`.

### ADVISORY X.5 — the "somebody invented it" line, three times

Hub: "No registration fee exists in law, so a figure quoted at you by a landlord has come from somewhere
that made it up."
RRA: "no fee regulations have been made, so no fee figure exists in law. If you see one circulating,
somebody invented it."
PRS: "there is no fee in law, and every figure circulating in commentary was invented by whoever
published it."

The fact should be on all three. The distinctive coinage should be on one.

**Drop-in fix:** keep "invented" on the PRS page, which owns the topic. Hub: `No fee has been set in
law, so any figure a landlord quotes at you came from commentary, not from the rules.` RRA: `No fee
regulations have been made, so no fee figure exists in law.`

---

## The sameness adjudication

Six surfaces, three writers, shipped together and cross-linked. Six repeats were tested against the
spec. Two are the spec working. Four are convergence.

### The spec working — leave alone

**1. A labelled short answer at the top of every explainer.** Spec §5.4 mandates it outright. All five
blog surfaces carry one. Correct.

**2. The two-state in-force / not-in-force split, and an explicit "what has not changed" block.** Spec
§5.5 and §5.6 mandate both, and §5.6 names the headings. That three surfaces (hub, RRA, PRS) carry an H2
called "What is not in force yet" is the instruction being followed, not a writer's habit.

### Convergence — vary it

**3. "The one-line answer" as a verbatim H2 on 5 of 5.** Spec §5.4 offers two ways to satisfy the rule:
"W8's 'The one-line answer' heading, **or** a first sentence that gives the date and the duty." All five
writers took the same one. It is also a competitor's exact heading string, repeated five times across our
own cluster, on pages that link to each other.

*Minimal variation, keeping the labelled-answer rule satisfied on every page:*
- RRA (Explainer 1, the highest-signal page): keep `The one-line answer`.
- MEES: `The two sentences to say` — the page's own body already frames it that way ("you can answer it
  in those two sentences").
- MTD: `Who files, in one line`.
- Deposits: `The short version` — or drop the heading and let the first two sentences carry it, which is
  the spec's stated alternative.
- PRS: `What your landlord has to do today` — answered "Nothing, yet" in the first three words.

**4. The W8 closer sentence, verbatim on 3 of 5.** "That is the short version. The detail matters
because…" on MTD, deposits and PRS. Nine words of a competitor's copy, three times in one batch. Nothing
in the spec asks for this sentence; §2/P2 quotes it as evidence. Fixes at 2.3 and 3.1; PRS variant:
`That is the whole of today's answer. Two of those points are counter-intuitive, which is why you keep
taking the same call.` (The RRA and MEES pages already vary it correctly, and are the model:
"That is the Renters' Rights Act summary in three lines…" / "That is the whole of it…". Note that the RRA
variant carries its own problem, a keyword phrase as the sentence complement.)

**5. The "what has not changed" lead-in, one template on 5 of 5.**

> MTD: "Most of what a landlord will ask you is about something that did not move. Name those things by name."
> Deposits: "Most of what a landlord asks you at check-out is about something that did not move. These are the ones you will be asked about, and each is worth naming:"
> RRA: "Most of the questions you field are about things that did not move. Name them plainly and your call gets shorter."
> MEES: "Most of what you get asked is about something that did not move. Four things did not, and naming them is usually the whole answer:"
> PRS: "Most of the questions you field are about things that stayed exactly as they were. Name them when you are asked:"

Same two-part frame five times: "Most of [what you are asked] did not move" + an instruction to name
them. "Did not move" is verbatim on four. The block is mandated; this opener is not, and it is the
spec's writer-facing instruction ("Name the things that stayed the same, by name") transcribed into
reader copy on every page.

*Minimal variation — vary the opener, keep the block, and drop the "name them" instruction from the
prose entirely (the list below it does the naming):*
- MTD: `Here is what a landlord will ask about that has not moved at all.`
- Deposits: `Four of these come up at every check-out, and none of them moved.`
- RRA: keep the current one; it is the best written and the page is the cluster's anchor.
- MEES: `Four things did not change, and saying so is usually the whole call.`
- PRS: `Nothing on this list moved. It is worth having them to hand, because they are most of what you
  get asked.`

**6. The "This page [verb]s A, B, C and D" standfirst, on 5 of 5.** Every `summary` field, which renders
above the body as the first prose on the page, closes on a table-of-contents clause:

> MTD: "This page is written for the agent fielding that question: who does what, which landlords are in scope and from when, why gross rent … and exactly where the line sits …" (88 words, seven clauses)
> Deposits: "This page covers the timing, the interaction with repairs, what happens when the deposit goes back in full, and where advance rent now sits after 1 May 2026."
> RRA: "This page is the two-state version a letting agent can work from: what is in force, what is not, which tenancies the 1 May wave leaves out, what the information sheet duty actually requires, and the list of things that did not change at all."
> MEES: "This page gives you the myth table, the enacted figures at a glance, and the words to use when a landlord arrives quoting a headline."
> PRS: "This page separates the two regimes, sets out what has actually commenced and what has not, explains why the marketing restriction lands on your listing workflow rather than on your landlord, and gives you the sentences to say when the call comes in."

This is the "this guide walks through" opener that §5.4 bans, moved into the field that renders above the
banned position. It is also the batch's most reliable keyword-list-as-prose. Five of five.

*Minimal fix: delete the TOC sentence from all five summaries.* Every one of them already states the
answer in the sentences before it, which is exactly what §5.4 asks the top of the page to do. MEES's is
the shortest and could stay if one has to.

### Also convergent, lower priority

**7. Numeric-preface sentence openers, at least 30 across six surfaces.** "Three parties, three clean
jobs." / "Two edge cases you will meet." / "Two carve-outs sit alongside it." / "One later date matters
too." / "One set of regulations, one band, one cap." / "Three things are live…" / "Four things are worth
tidying in it now…" / "Three changes cover most of what lands on your desk." / "Two points are worth
having ready…" / "Three ways it does not net off…" / "Four things did not…" / "One route only, and you
run it." / "Three things, in this order."

Individually good writing. As the default paragraph opener on six surfaces at once it is the batch's
audible tic, and the "[number] [noun]:" cadence is a known AI tell. No fix per sentence; the instruction
is to cut roughly a third of them at random and let those paragraphs open on the subject.

**8. Closing H2s, four of five begin "What to".** "What to change about your statement run" / "What to
Put on the Check-Out Report" / "What to do next" / "What to do when the next landlord calls". PRS is the
exception with "The file you already keep", which is the best of the five. Vary two.

**9. The "nothing new to do, it costs you nothing" close, on 3 of 5 plus the hub.** MTD: "You already
produce a monthly statement and an annual export. Neither needs replacing." / Deposits: "You already
produce two documents at the end of a tenancy… It costs you nothing." / PRS: "Every managed property in
your book already has a compliance file… Nothing here asks you to start something new." / Hub: "it costs
nothing". Reassurance is right for this audience; four instances of the same reassurance in one batch is
a shape.

**10. Twin opener, MEES and PRS.** "Your landlords have read that every rental must reach EPC C by
2030." / "Your landlords have read about a landlord database and a landlord ombudsman." Same five words,
adjacent pages, both linked from the hub. Vary one: PRS → `A landlord database and a landlord ombudsman
are in the headlines again, and your landlords want to know what they have to do.`

### One structural consequence worth flagging separately

Three surfaces (hub §"What is not in force yet", RRA §"What is not in force yet?", PRS §"What is not in
force yet?") carry near-identical H2s over near-identical content on the database and the redress scheme.
The two-state split is spec-mandated, so the H2s are defensible, but the overlap is close enough that it
should be put through the cannibalisation detector before deploy rather than after.

---

## Fix list in priority order

1. `prs-database-…` `reviewerCredentials`: strip `§20.12`, `§26.5`, `§26.6` and "house positions". Rendered live. (X.1)
2. MTD `reviewerCredentials`: strip "our locked house positions" and the build-date stamp. Rendered live. (2.1)
3. Delete the TOC sentence from all five `summary` fields. (adjudication 6, 2.2, 3.6)
4. Replace "That is the short version. The detail matters because" on MTD, deposits and PRS. (2.3, 3.1)
5. Vary "The one-line answer" on 3 of 5, and the "what has not changed" lead-in on 4 of 5. (adjudication 3, 5)
6. Hub: "resource surface" → "This page is for letting and estate agents." (1.1)
7. MTD: three keyword-welded sentences. (2.4)
8. RRA and PRS: the two W5 lifts, and the duplicated Royal Assent / commencement block. (X.2, X.3)
9. Everything else marked ADVISORY.

Items 1, 2 and 6 are single-string edits and are the only three that put internal vocabulary in front of
a reader. Items 3 to 5 are the sameness fingerprint and cost about fifteen sentences across the batch.
