# Editorial QA: agents1 batch B (three surfaces, three writers)

Reviewed 2026-08-21. Read-only pass. Judged against `briefs/property/agents/_language_spec.md`
(§5 hard rules, §3 register prescription and the per-page-type measured targets) plus the standing
editorial track. Cross-batch fingerprints checked against the other three surfaces in the same batch
(`for-letting-agents/page.tsx`, `mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly.md`,
`tenancy-deposits-landlord-tax-position.md`).

## Verdicts

| Surface | Verdict | Blockers | Advisories |
|---|---|---|---|
| `rra-2026-whats-in-force-letting-agents.md` (Explainer 1) | **must_fix** | 4 | 4 |
| `mees-epc-rules-what-your-landlords-think.md` (Explainer 3) | **must_fix** | 1 | 4 |
| `prs-database-landlord-ombudsman-registration-requirements.md` (Explainer 6, REFRAME) | **must_fix** | 4 | 4 |
| Batch-wide sameness | **must_fix** | 3 | 4 |

Nothing in the batch fails on the standing hard rules that are usually the first casualties:
**zero em-dashes and zero en-dashes on all six surfaces** (counted directly, including the hub tsx),
UK English clean (`practice` on the deposits page is "generally accepted accounting practice", correct;
`organized` on the database page is inside a Pexels source URL, not copy), no PropertyTaxPartners
pricing anywhere, no named personas, and **no instance of the banned CTA template**
"We can produce a written {noun} for/on your {noun}".

## Measured, body only, tables and frontmatter excluded

| Surface | Words | Mean sent. | Flesch | you/1k | Cite/1k (prose) | H2 | Q-H2 | Tables | FAQ |
|---|---|---|---|---|---|---|---|---|---|
| RRA in-force (target 1,600-2,200 / ≥45 / ≥15 / 0) | 2,052 | 15.2 | 63.9 | 25.3 | 0 | 13 | 9 | 1 | 6 |
| MEES (target 1,400-2,000 / ≥45 / ≥15 / 0-1) | 1,455 | 15.8 | 68.0 | 26.1 | 0 | 9 | 5 | 1 | 5 |
| PRS database (target 1,400-2,000 / ≥45 / ≥15 / 0) | 2,088 | 15.0 | 59.4 | 28.7 | 0 | 11 | 7 | 1 | 6 |
| MTD who-files (target 1,400-2,000 / ≥45 / ≥15 / 0) | 1,929 | 15.4 | 61.4 | 26.4 | 0 | 12 | 8 | 1 | 6 |
| Deposits (target 1,200-1,800 / ≥45 / ≥12 / 0-1) | 1,355 | 16.8 | 66.3 | 18.5 | 0 | 7 | 5 | 0 | 6 |
| Hub (target 900-1,600 / ≥48 / ≥15 / 0, no FAQ) | ~1,165 | 18.4 | 66.4 | 36.9 | 0 | 10 | 0 | 0 | none |

Every surface clears the readability, second-person and citation-grammar targets that the spec
was written to fix. Reading ease runs 59.4 to 68.0 against a winner median of 49.0 and our old
median of 28.1. Citation grammar is zero in prose on all six; every `s.`/`SI` string that survives
sits either in a permitted foot reference line or in the one place flagged below.

Two measured "misses" are metric artefacts, not findings, and are recorded so nobody re-raises them:
MEES notice/1k reads 1.4 and MTD reads 0.0 on the spec's RRA-calibrated notice regex, because their
reader-vocabulary nouns are "the 2015 energy efficiency regulations", "MEES", "PRS Exemptions
Register", "Form 17", "64-8" and "Agent Services Account". Counted on the right vocabulary both sit
inside their target bands. **PRS is 88 words over its 1,400-2,000 band** (2,088); the fixes below
remove more than that.

---

## Surface 1: `rra-2026-whats-in-force-letting-agents.md` — must_fix

### BLOCKER 1. Citation grammar restored inside the body, in a table column that duplicates the foot line

The milestone table carries a `Source` column: `RRA 2025 s.145(2)`, `SI 2025/1354 + s.145`,
`SI 2026/421 reg 2`, `SI 2026/324`, `SI 2026/638`, `s.75 prospective`.

Spec §5 rule 1: "Where a commencement instrument genuinely has to be identified, it goes in **one
reference line at the foot of the page, never in prose**." The page already has that line, and it
already lists every one of those instruments. The column is the banned grammar, duplicated, in the
single most-scanned element on the page. Zero winners across 19,321 words carry it; the one that
does (W10 wrigleys, academic footnote apparatus) is on the do-not-copy list for it.

**Fix:** drop the `Source` column. Four columns become three (`What` / `Status` / `Date`). The foot
line already discharges the identification duty. Zero other edits needed.

### BLOCKER 2. W8's worked example is lifted near-verbatim, not just its device

> "Can I still evict my tenant?" Yes, but only through a Section 8 ground, and a ground needs a
> reason: rent arrears, a breach of the tenancy, or one of the reformed grounds such as selling or
> moving in.

Spec §2 P3 quotes W8 as: "A landlord asking 'can I still evict my tenant?', answer: yes, but only
via Section 8 grounds, which require a specific reason (rent arrears, breach of tenancy, the new
mandatory grounds)." The spec instructs us to take **the device**. This takes the question, the
answer, the concessive, and the three-item reason list in the same order. It is a competitor's
sentence with the punctuation changed.

**Fix, drop-in:**

> "Can I still evict my tenant?" Yes, on a Section 8 ground. The ground has to be a real one and you
> have to be able to evidence it: arrears, a breach, or the landlord selling or moving back in.

### BLOCKER 3. W5's table-intro sentence is lifted near-verbatim

> The table below is the Renters' Rights Act timeline as it stands. Treat the bottom four rows as
> indicative: the government has committed to them, but the dates are confirmed only by later
> regulations, and nothing binds your landlords until those are made.

Spec §2 P4 quotes W5: "The table below summarises the key milestones. Treat phased items as
indicative: the Government has committed to them, but the exact go-live dates are confirmed only by
later regulations." Fourteen consecutive words are the competitor's. The same lift appears on the
database page (see batch-wide BLOCKER A).

**Fix, drop-in:**

> Here is where each wave sits today. The last four rows have no appointed date, so read them as the
> government's stated intention and nothing more. Until the regulations are made, none of them
> reaches a landlord on your books.

### BLOCKER 4. Keyword phrases inserted as prose nouns

Two sentences carry a search phrase in place of a noun the writer would otherwise have chosen:

> That is the Renters' Rights Act summary in three lines.

> The table below is the Renters' Rights Act timeline as it stands.

"Renters' Rights Act summary" and "Renters' Rights Act timeline" are query strings, not things a
person says. The second also sits inside BLOCKER 3.

**Fix:** "That is the whole of it, in three lines." and the BLOCKER 3 replacement above.

### ADVISORY 5. Foot line carries a page-written-on date

> Commencement position verified against legislation.gov.uk on 21 August 2026.

Spec §5 rule 11: "Dated statements name the date they are **true from**, not the date the page was
written." A verification stamp ages the page every day it is not re-run, and `dateModified` already
carries the same information in a field Google reads properly.

**Fix:** end the foot line at the instrument list, or replace with "Commencement position as at the
last review date shown above."

### ADVISORY 6. Register wobble inside the scenario block

> "Do I need to register on the landlord database?" Not yet. ... nobody can quote you a fee, because
> no fee has been set.

Three sentences earlier "you" is the agent. Inside this answer "you" becomes the landlord, mid-block,
with no marker. Spec §5 rule 3 puts "you" on the agent throughout.

**Fix:** "…and nobody can quote a landlord a fee, because no fee has been set."

### ADVISORY 7. Vague back-reference that will read as stale

> That is hazard enforcement, not the Decent Homes Standard, whatever you read at the time.

"at the time" points at nothing the reader can locate. It also twins with the database page (see
batch-wide ADVISORY D).

**Fix:** "That is hazard enforcement. It is not the Decent Homes Standard, whichever headline said
otherwise."

### ADVISORY 8. Cross-page duplication with the database page

Lines under "What is not in force yet?" and the "Your own redress obligation" bullet re-run the
database page's entire organising idea: the 1 October 2014 agent redress duty, the plural-schemes
drafting point, the £7,000/£40,000 pair, the "expectation rather than a date" formula, and the
"Do I need to register on the landlord database?" scenario. Both pages then compete for the same
query. See batch-wide BLOCKER C for the split.

---

## Surface 2: `mees-epc-rules-what-your-landlords-think.md` — must_fix

### BLOCKER 1. "You" becomes the landlord in the at-a-glance list

> **Cost cap: £3,500 including VAT, per property.** Spend up to it, or register an exemption once
> you reach it.

Spec §5 rule 3 is unambiguous: "you" is the agent, the landlord is "your landlord". The agent does
not spend the cap and does not register the exemption. Every other bullet in the same list is
correctly impersonal, which makes this one a slip rather than a decision.

**Fix, drop-in:**

> **Cost cap: £3,500 including VAT, per property.** Your landlord spends up to it, then registers an
> exemption rather than spending more.

### ADVISORY 2. The one-line answer is stated three times in five sentences

> Today the property has to reach EPC E, and your landlord's spending on getting there is capped at
> £3,500 including VAT. EPC C by 2030 is government policy, and there is no law behind it yet.

> That is the whole of it. Everything below is what you say when a landlord pushes back, and why the
> pushback keeps happening.

> You will field this more often than any other energy question this year, and you can answer it in
> those two sentences. The trouble only starts when the two get merged into one.

Spec §5 rule 4 allows two sentences maximum before the answer; it does not license three passes
after it. The third paragraph adds nothing the second has not said and carries an unsourced
comparative claim ("more often than any other energy question this year") of the kind the spec bans
in the W8 do-not-copy note.

**Fix:** delete the third paragraph entirely. The section then reads answer, then transition, then
the myth table.

### ADVISORY 3. A hedge that hands the question back, on the tax section

> You are not there to give tax advice, and this is not that.

Spec §4 marks W9's closing disclaimer as the weakest move in the winner set precisely because "a
hedge that transfers the reader's question straight back to the reader". Opening a section by
disowning it does the same thing one paragraph earlier.

**Fix, drop-in:** "One piece of tax gets asked at the desk often enough to be worth having right,
because plenty of people have it backwards."

### ADVISORY 4. FAQ 5 sits outside the page's own subject

"Is double glazing a repair or an improvement for landlord tax?" is a real query, but it is the
deposits/repairs family rather than the MEES family, and it is the only FAQ on the page that is not
an energy-standard question. It also duplicates the body's final section wholesale.

**Fix:** either swap it for a MEES-family query ("Do I need an EPC if the tenant has been there
since 2015?" or "How do I register a MEES exemption?"), or keep it and cut the body section it
duplicates.

### ADVISORY 5. Reader-instruction padding, twinned with the database page

> Read that slowly, because it is stronger than "not yet enacted".

> Notice how often the useful answer is a negative one.

Both are meta-commentary about the page rather than content. The first twins with the database
page's "Read that second list again." (batch-wide ADVISORY E).

**Fix:** delete the first clause of each ("Read that slowly, because it" → "It"; delete the
"Notice how often" sentence, the list above it already makes the point).

---

## Surface 3: `prs-database-landlord-ombudsman-registration-requirements.md` — must_fix (REFRAME)

This is the batch's only reframe (116 insertions, 160 deletions against `HEAD`). The old adviser
register is genuinely gone: every `ss.66 and s.74`-style H2 has been replaced, prose citations are at
zero, and the second person runs at 28.7 per 1,000, the highest in the batch. The failures are seam
failures, which is the expected failure mode.

### BLOCKER 1. Pipeline artefact leaks into reader-facing copy AND into JSON-LD

`reviewerCredentials`:

> Commencement position aligned with house positions §20.12 (Renters' Rights Act 2025 commencement
> timeline), §26.5 (landlord redress scheme and the pre-existing 2014 agent regime) and §26.6
> (private rented sector database); every commencement claim and every figure on this page was
> re-verified against legislation.gov.uk and the government implementation roadmap at the review date.

This is not an internal field. `BlogPostRenderer.tsx:329-333` renders `reviewerCredentials` as
visible body copy in the "Reviewed by" aside, and `schema.ts:78-83` ships the same string as
`reviewedBy.jobTitle` in the page's JSON-LD. "House positions §20.12" is our internal document
numbering, published to readers and to Google as a reviewer's job title.

**Fix, drop-in (keeps the E-E-A-T signal, drops the internal reference):**

> UK-based property tax advisers writing for letting and estate agents fielding landlord questions.
> Every commencement claim and every figure on this page was re-verified against legislation.gov.uk
> and the government implementation roadmap at the review date.

Same leak, milder, on the MTD page (batch-wide BLOCKER B). `editorialNote` on both pages is *not*
rendered anywhere in `src/` and is safe to leave.

### BLOCKER 2. The reframe seam: the same answer, twice, in two registers, in consecutive paragraphs

> Read that second list again. If you manage the property, you already hold every line of it.

> "Do I need to register on the landlord database?" Not yet, and there is nowhere to do it. When it
> opens, we already hold most of what it will ask for.

This is the classic REFRAME failure the spec's scenario device invites: the point is made once in
the new second-person register, then immediately again inside a bolted-on scenario block. The second
pass also weakens the first ("every line of it" → "most of what it will ask for"), so a reader who
reads both gets a hedge for free.

It carries a second defect. "**we** already hold" makes "we" the agent's agency, while three
paragraphs away "**our** guide to landlord enrolment" makes "we" Property Tax Partners. Two
different first persons on one page.

**Fix:** delete the scenario paragraph. The preceding two sentences already answer it, in the right
register, better. If the scenario device is wanted here, move it to the top of the section and cut
the "Read that second list again" pair instead.

### BLOCKER 3. Two "In force" rows sit inside the "What is not in force yet?" section

The H2 is "What is not in force yet?". Its bullet list names three things that are not in force.
The table directly beneath it then carries four rows, two of which read `In force / 1 May 2026, done`
and `In force / 22 June 2026, done`.

That breaks spec §5 rule 6 ("Commencement is presented as **two states**") in the one place on the
page where the two-state split is being demonstrated, and it re-states facts already given in full
under the previous H2 ("What is actually in force today?"). The Category 1 hazard penalty is now
stated three times on one rendered page: FAQ 6, the in-force bullet list, and the table.

**Fix:** cut the two `In force / done` rows. The table then does one job (the not-yet milestones and
their indicative timing) and the section title is true. Removes ~40 words toward the word-band
overshoot.

### BLOCKER 4. Two FAQ answers repeat verbatim into the body of the same rendered page

FAQ 2 and the "What will registration cost?" section both carry:

> every figure circulating in commentary was invented by whoever published it

FAQ 4 and the "The duty your landlord does not have yet" H3 both carry, word for word:

> the Act permits one or more approved schemes rather than a single body, so "the landlord
> ombudsman" is the phrase landlords use rather than a description of what the Act creates

The `faqs:` block renders on the live page. A reader scrolling one page meets each sentence twice.

**Fix, drop-ins (vary the body copy, keep the FAQ as the SERP-facing version):**
- Body: "Every figure in circulation was somebody's guess, published with confidence."
- Body: "The Act allows for more than one approved scheme. 'The landlord ombudsman' is what landlords
  call it, not what the Act sets up."

### ADVISORY 5. Adviser-register residue in the last two substantive sections

> Once the duties commence, and only then, a local housing authority will be able to impose a
> financial penalty of up to £7,000 where it treats the failure as a breach, or up to £40,000 where
> it deals with it as an offence.

> Scheme membership and database registration will be regulatory costs of running a rental business,
> so they will be deductible against rental income in the same way as licensing fees.

Two consecutive sections in which "you" does not appear at all and the subject is an authority or a
cost rather than the reader. Spec §2 P5: the figure goes in the sentence about what the reader does.
These are the least-reframed blocks on the page and read as the surviving adviser voice.

**Fix, drop-in for the first:** "Once the duties commence, a landlord you act for who stays out is
exposed to a penalty of up to £7,000 for a breach, or up to £40,000 if the council treats it as an
offence. Neither reaches anyone on your books today."

### ADVISORY 6. Invented quantification

> you will explain it forty times before the database opens

Spec §4 lists W8's "turn 30 hours of compliance work into 8" as a do-not-copy precisely because it is
stated without basis. "Forty times" is the same move at smaller scale.

**Fix:** "you will explain it more times than you want to before the database opens."

### ADVISORY 7. Two FAQ questions are not typed queries

> "PRS database registration: what will it involve?"

> "Has anything else in the Renters' Rights Act come into force recently?"

Spec §5 rule 15: each FAQ is a **near-verbatim SERP query**. Nobody types a colon-prefixed noun
phrase, and "recently" guarantees the second goes stale without anybody editing it.

**Fix:** "What information will landlords have to put on the PRS database?" and "What parts of the
Renters' Rights Act are in force now?"

### ADVISORY 8. Word band

2,088 body words against a 1,400-2,000 target. BLOCKER 3 and BLOCKER 2 together remove roughly 110
and bring it inside the band; no separate cut is needed if those land.

---

## Batch-wide sameness adjudication

Three of these devices are **spec-mandated structure** and must not be varied away. The rest is
**converged phrasing**, which is where the batch reads as one writer.

### Mandated by the spec, keep the structure, vary the label

| Device | Spec authority | Where it appears | Adjudication |
|---|---|---|---|
| A labelled short answer at the top | §5 rule 4 (offers the W8 heading **or** a first sentence that gives the date and the duty) | H2 "The one-line answer" on all five explainers | Structure mandated, **label is not**. Five identical H2s is the single most visible fingerprint. |
| A "what has not changed" block | §5 rule 5 | All five | Mandated. Keep the block on every page. |
| Landlord question in quotation marks, then the answer | §5 rule 9 | All five | Mandated. Keep. |

### BLOCKER A. Three surfaces lift the same W8 transition, word for word

- PRS: "That is the short version. The detail matters because two of those points are counter-intuitive…"
- MTD: "That is the short version. The detail matters because the next three questions come straight back at you…"
- Deposits: "That is the short version. The detail matters because a landlord who wins at check-out has just received taxable rental income…"

Spec §2 P2 quotes W8: "That's the short version. The detail matters because the firms doing this
checklist properly…". Three writers independently copied the same competitor sentence, which is what
happens when a spec quotes prose rather than describing a move. The two surfaces that did not copy it
prove the variation exists and is better:

- RRA: "That is the Renters' Rights Act summary in three lines. The rest of this page is what you need when a landlord argues with it."
- MEES: "That is the whole of it. Everything below is what you say when a landlord pushes back…"

**Minimal drop-ins, one per surface, no other edits:**
- PRS: "That is the answer to give on the phone. The rest of this page is for the two follow-ups that always come next, because both are counter-intuitive."
- MTD: "That answers the call. What follows is the three questions that come straight back at you, and the one that costs a landlord money."
- Deposits: "That is the answer at check-out. It matters more than it sounds, because a landlord who wins a deduction has just taken taxable rental income and nobody has told them."

The same lift also produced **the W5 dormancy sentence on two surfaces** (RRA: "Until a section is
commenced it is dormant, it imposes no duties and it grants no rights"; PRS: "Until a section is
commenced it is dormant, and it imposes no duty on anyone") against spec §2 P4's quote of W5 ("Until
a section is commenced, it is dormant, it imposes no duties and grants no rights"), and **W5's
anti-scam line on the database page** ("Do not let anyone persuade a landlord that a not-yet-live
obligation is already mandatory" against W5's "do not let a salesperson persuade you that a
not-yet-live obligation is already mandatory"). Vary one of each pair; RRA and PRS should not both
carry the dormancy explanation at all (see BLOCKER C).

### BLOCKER B. `reviewerCredentials` leaks internal vocabulary on two surfaces

MTD:

> Thresholds, quarterly deadlines, digital-link rules and penalty figures on this page were
> re-verified against **our locked house positions** on 21 August 2026.

Same rendered field, same JSON-LD field, same problem as PRS BLOCKER 1 in milder form: "our locked
house positions" is pipeline vocabulary shown to readers. It also datestamps the credential line.

**Fix, drop-in:** "…were re-verified against HMRC guidance and the current regulations at the review
date." The `reviewedAt` field already carries the date, and the renderer already prints it as
"Last reviewed 21 August 2026" directly underneath.

### BLOCKER C. The RRA page and the database page answer the same question, at length, twice

Shared 7-grams between the two run to 21 distinct strings, including "do i need to register on the
landlord", "to an approved redress scheme since 1 october 2014", "until a section is commenced it is",
"and also say it is not in force", "the government has committed to them but", "most of the questions
you field are about", and "an expectation rather than a date in law".

Concretely, the RRA page carries: the dormancy explanation, the plural-schemes drafting point, the
2014 agent redress duty with its punchline, the £7,000/£40,000 pair, the "no fee exists in law"
point, the late-2026 and 2028 indicative years, and the "Do I need to register on the landlord
database?" scenario. Every one of those is the database page's core content, and the two pages link
to each other while competing for the same query set.

**Minimal split, no rewrites:**
- RRA keeps the **two-state fact** ("the database and the redress scheme are not open, nobody has to
  register, no fee exists") and the link. Cut from RRA: the dormancy paragraph's second half, the
  plural-schemes drafting point, the £7,000/£40,000 pair, and the "Do I need to register" scenario
  (replace with a different landlord question, e.g. "Do I have to re-issue every tenancy agreement?").
- RRA keeps the 2014 agent redress bullet in "What has not changed" **only** — that is the one place
  it earns its keep on an in-force page, and it is where an agent scanning will find it.
- The database page keeps all of it. It is that page's subject.

### ADVISORY D. Repeated sentence shapes across five surfaces

The "what has not changed" lead-in is the same sentence on every page, and it is a paraphrase of the
spec's own instruction text ("Name the things that stayed the same, by name"):

- RRA: "Most of the questions you field are about things that did not move. Name them plainly and your call gets shorter."
- MEES: "Most of what you get asked is about something that did not move. Four things did not, and naming them is usually the whole answer:"
- PRS: "Most of the questions you field are about things that stayed exactly as they were. Name them when you are asked:"
- MTD: "Most of what a landlord will ask you is about something that did not move. **Name those things by name.**"
- Deposits: "Most of what a landlord asks you at check-out is about something that did not move. These are the ones you will be asked about, and each is worth naming:"

Five for five on the shape `Most of [what you get asked] is about [something that did not move]` +
`Name them`. MTD's second sentence is the spec's instruction verbatim.

**Minimal drop-ins, keep the block, change the lead-in:**
- RRA: "Half your inbox is about things the Act left alone. Here they are, so you can say so and move on."
- MEES: "Four things did not move at all. Naming them is usually the whole answer."
- PRS: "Nothing below changed. It is worth being able to say so without checking."
- MTD: "None of this moved, and a landlord who believes otherwise has read something wrong."
- Deposits: (keep as written; it is the least templated of the five)

Related twins, one drop-in each:
- "whatever you read at the time" (RRA) / "whatever a landlord has read" (PRS) — vary one.
- "Read that slowly, because…" (MEES) / "Read that second list again." (PRS) — delete one.
- Informal money inside a quoted landlord question: "eight hundred quid" (Deposits) / "forty-two
  grand" (MTD) — keep one, make the other plain.

### ADVISORY E. Identical H2 labels across surfaces

| H2 | Appears on |
|---|---|
| "The one-line answer" | RRA, MEES, PRS, MTD, and Deposits as "The One-Line Answer" |
| "What is not in force yet?" | RRA, PRS, and the hub as "What is not in force yet" |
| "What has not changed" / "What has not changed?" | all five |

The hub sharing an H2 with two explainers it links to is the worst of the three, because a reader
lands on the hub and the explainer and reads the same label twice.

**Minimal drop-ins:** keep "The one-line answer" on RRA and PRS (the two commencement pages, where
the labelled-answer device is doing the most work); MEES → "The two sentences to keep apart";
MTD → "Who files, in one line"; Deposits → "The answer at check-out". Hub `not-yet` section →
"The two things that are still not running".

### ADVISORY F. The hub's H1 phrase is recycled as page furniture three more times

Hub H1 "what your landlords will ask you this year" reappears as the PRS page **title** ("…What Your
Landlords Will Ask You"), as an RRA H2 ("What your landlords will ask you, and what to say"), and as
an MEES H2 ("What else will your landlords ask you?"). Both RRA and MEES then close on a near-identical
sentence routing back to the hub ("More of what your landlords will ask you this year sits on our
letting agent resource hub" / "More of the questions your landlords will put to you this year are
answered on our resources for letting agents"). The phrase is the spec's own framing sentence.

**Fix:** the hub keeps it, since it is the hub's positioning. Retitle PRS to
"The Landlord Database and Landlord Redress: What Is Actually Live" and vary one of the two closing
routes.

### ADVISORY G. Foot reference line, and two things about the batch that are not sameness

Three of five carry a foot line and two of those open the same way: "Reference: …" (MEES, MTD),
"References: …" (PRS), "Where these dates come from: …" (RRA), none on Deposits. Low-grade, but the
PRS line is unusually long and ends on HMRC manual references (`PIM2080`, `BIM38500 to BIM38515`)
that no reader in this cluster will follow. Trim to the instruments; the manual references belong in
the source notes, not on the page.

Two batch inconsistencies that run the *other* way and are worth aligning:
- **Deposits is the only surface using Title Case H2s.** Every other surface is sentence case.
- **Deposits is the only surface with no opening hook** before the first H2; the other four open on a
  one- or two-sentence line about the landlord's question. Given rule 4 allows two sentences before
  the answer, adding one costs nothing and matches the batch.

### Hub-only notes (not sameness)

- **ADVISORY:** the `epc` section routes to four explainers; the §3 hub row prescribes "short H2 per
  topic, **each linking one explainer**". Four links makes it a reading list rather than a route.
  Keep the MEES page and the 2030 page, drop the other two to the explainer.
- **ADVISORY, owner call not an editorial fix:** "Putting the calculators on your own site" plus the
  hero CTA "Put them on your own site" and "the small 'Powered by Property Tax Partners' line stays
  where it is" is structurally the move §4 puts W7 on the do-not-copy list for (a promotional block
  inside the body, above the routing). It carries no pricing and is a genuine reader utility, so it
  does not breach rule 14 on its face, but it is the only commercial ask on any of the six surfaces
  and it sits on the hub. Flagging for a decision, not proposing a cut.

---

## What is clean and should not be re-litigated

- Em-dashes and en-dashes: **zero** on all six surfaces, counted directly.
- Prose citation grammar: **zero** on all six. Every surviving `s.`/`SI`/`reg.` string sits in a
  permitted foot reference line, except the RRA table `Source` column (surface 1, BLOCKER 1).
- No statute reference in any heading on any surface (§5 rule 8).
- No service offer, no pricing and no "how we can help" block in any explainer body (§5 rule 14).
- One table maximum per page (§5 rule 13): RRA 1, MEES 1, PRS 1, MTD 1, Deposits 0, hub 0.
- FAQ counts (§5 rule 15): 6, 5, 6, 6, 6, and none on the hub, as prescribed.
- Question headings at half or more of H2s on every explainer (§5 rule 7): 9/13, 5/9, 7/11, 8/12, 5/7.
  The hub correctly uses noun-phrase section labels and is exempt.
- Conditional grammar for the not-yet state (§5 rule 6) is applied consistently on RRA, PRS and the
  hub, including the "when the database opens, your landlords will need…" construction.
- The enacted-versus-announced split (§5 rule 12) is stated explicitly and correctly on MEES: EPC E
  with the £3,500 cap as law, EPC C by 2030 and the £10,000 cap as policy, with the "the government
  says it needs new powers first" line the SERP does not have. That is the differentiation the spec
  asked for and it landed.
- `editorialNote` is not rendered anywhere in `src/` and is safe to leave as an internal field. Only
  `reviewerCredentials` leaks (surface 3 BLOCKER 1, batch BLOCKER B).
