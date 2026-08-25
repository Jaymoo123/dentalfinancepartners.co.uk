# PACK tenancy-deposits-landlord-tax-position (page 4, agents1 cluster)

Net-new page pack, assembled 2026-08-21 from `briefs/property/agents/DOSSIER.md` (FROZEN 2026-08-21),
`briefs/property/agents/_language_spec.md`, `briefs/property/agents/ledger.csv` and
`docs/property/house_positions.md` as patched 2026-08-21. Follows `docs/_engines/REWRITE_PROGRAM.md`
§9.5, 8 sections in reading order. Format copied from
`briefs/property/rural-estates/packs/PACK_how-to-avoid-inheritance-tax-on-a-farm.md`.

**The pack is the whole world.** Everything the writer needs is here or in the four files named
above, plus the HMRC Property Income Manual verifications this pack requires at write time (§6).

## 1. Target and permission level

- **Page:** NET-NEW, slug **`tenancy-deposits-landlord-tax-position`** (fixed, do not vary)
- **URL:** `/blog/landlord-tax-essentials/tenancy-deposits-landlord-tax-position`
- **Category:** `landlord-tax-essentials` (confirmed live category; the frontmatter `category` string
  is `Landlord Tax Essentials`, matching the sibling pages in that folder)
- **Middleware map entry required.** Add to `SLUG_TO_CATEGORY_MAP` in
  `Property/web/src/middleware.ts`, in the same style as the surrounding entries:
  ```ts
  "tenancy-deposits-landlord-tax-position": "landlord-tax-essentials",
  ```
- **Grade:** NET-NEW
- **Fixed constraint on scope (not a style note, a compliance line).** This page covers the
  **landlord's tax position on deposits**, in the letting-agent register. It does **not** cover the
  agency's own client-money obligations, client-account handling, CMP scheme membership rules or
  scheme comparison. `_language_spec.md` §3 states this for the Explainer 5 row in terms: "Landlord
  tax treatment only; no client-money regulatory advice, no scheme comparison." Client money
  protection is named **definitionally, once**, with **one sentence** saying the agency's own CMP and
  client-account compliance is outside the page's scope. Do not stretch that sentence into a section.
  The owner ruling in DOSSIER.md §1 forbids client-money compliance advice outright.
- **Fixed constraint on facts.** **No house_positions lock exists for the tax treatment of tenancy
  deposits.** Every tax position on this page must be verified against the HMRC **Property Income
  Manual** at write time, the manual paragraph recorded in the coverage note, and **anything that
  cannot be verified must be declined and left off the page**. See §6. This is the single most
  important constraint in the pack.
- **Fixed constraints:** the slug above; the category above; **zero em-dashes**; UK English; **no
  pricing**; **no service claim**; **no named worked-example persona**; no shared CTA template with
  the rest of this batch and never the phrase "We can produce a written {noun} for/on your {noun}".

## 2. Equity register

**ZERO.** Net-new page, no prior Google or Bing equity. Nothing to protect.

No page on the site currently covers the tax treatment of tenancy deposits. Checked 2026-08-21:
`deposit-buy-to-let-2026-mortgage-requirements` is a **mortgage** deposit page, not a tenancy
deposit page, and is not a cannibalisation risk. The nearest adjacent content is listed in §5.

## 3. The market's keyword set

Source: `briefs/property/agents/ledger.csv` (2026-08-21). Volumes are Google Ads `search_volume`
(DataForSEO, UK, pulled 2026-08-21).

| keyword | vol/mo | best peer pos | peer domain | in our copy |
|---|---:|---:|---|---|
| tenancy deposit tax treatment | 0 | n/a | n/a | yes, primary |
| is a tenancy deposit taxable income | 0 | n/a | n/a | yes, FAQ verbatim |
| deposit deductions tax landlord | 0 | n/a | n/a | yes |
| client money protection letting agents | 10 | n/a | n/a | yes, definitional only |

**Single-keyword risk, disclosed honestly per DOSSIER.md §10.** Every term assigned to this page is
**unmeasured**. Three carry no recorded Google Ads volume at all; the fourth carries 10 a month and
is assigned for definitional scope only, not as a ranking target. DOSSIER.md §7 grades this page **C
(whitespace, zero measured)** and DOSSIER.md §4 records the topic row as "nil measured (10 for CMP)".

State the consequence plainly rather than dressing it up: **this page has no measured demand to win.**
It is built because the question is real (an agent fields it at every check-out) and because nobody
in the tracked competitor set touches deposit tax treatment at all (`_language_spec.md` §2 P8: no
winner touches tax treatment of anything, and none touches client-money or deposit accounting). The
expected return is forwardability and long-tail capture, not head-term traffic. If that is not worth
building, the place to say so was the dossier, and the dossier said build it.

Two limitations from DOSSIER.md §11 apply and are not hidden: no DataForSEO Labs harvest was run for
this cluster (balance gate), so the universe is seed-listed rather than exhaustive and a delta list
is expected at the 90-day read; and Google Ads "no volume" means below the reporting floor, not
literally zero searches.

## 4. Competitor teardown extracts

**No competitor teardown exists for deposit tax treatment, and none may be invented.** The six SERPs
behind `_language_spec.md` were pulled for RRA and MEES queries. DOSSIER.md §4, "Deposit /
client-money tax edges" row, records the competitor column as **n/a** and our coverage as **NONE**.
There is no measured competitor set for this topic. Do not assert competitor positions, headings or
figures anywhere on this page or in the coverage note.

What transfers is the **register model** measured on the RRA SERPs in `_language_spec.md` §2:

- **P2, the labelled one-line answer.** W8 (heybrb.ai, the closest register match in the tracked set)
  opens with an H2 that is literally "The one-line answer". This page opens the same way: **a deposit
  is not the landlord's income when it is taken, and becomes income only when the landlord is
  entitled to keep part of it.**
- **P3, the agent is "you" and the landlord is the third party who asks.** W8's sentence, the only
  one in 19,321 competitor words occupying our register: *"This is a positive duty, the obligation
  sits with you (or your landlord client) regardless of who drafted the tenancy."* And its scenario
  device: a landlord's question in quotation marks, then "answer:", in the agent's voice.
- **P5, the number goes in the sentence about what the reader does.** W3: *"You are now only able to
  put a rent increase in place once a year, and can only do so by serving your tenants with an
  official Section 13 notice."* The reader is the subject and the figure is the object of a verb the
  reader performs. Winner median is one pound figure per page; our tracked median is 18.5. Keep the
  figure count low and put the survivors in the reader's verb.
- **P6, "it depends" is resolved by naming the fork and giving the safe default in one move.** This
  page is full of forks (retained or repaid, revenue or capital, when the entitlement crystallises),
  so P6 is the default sentence shape here.

**Do not copy, named (`_language_spec.md` §4):** W8's unsourced quantification, W8's countdown
framing, W9's closing disclaimer ("If you are unsure how the upcoming changes will affect you, seek
professional advice"), which transfers the reader's question straight back to the reader, and W7's
in-body vendor block. None of those appears on this page.

## 5. Ours, side by side

n/a, net-new page. Nearest existing pages, for differentiation and for linking:

| Slug | What it owns | This page's boundary |
|---|---|---|
| `deposit-buy-to-let-2026-mortgage-requirements` | **Mortgage** deposits | Different meaning of the word. Do not link; do not mention, to avoid confusing the two. |
| `pet-rights-tenancy-landlord-refusal-reasonable-grounds` | The Tenant Fees Act 2019 permitted-payment list and the deposit cap, including the pet-deposit prohibition | Owns the **regulatory** deposit cap. This page defers to it in one sentence and links; it does not re-derive the cap rules. |
| `what-repairs-can-landlords-deduct-from-rental-income` | Repairs deductibility | Owns the general repairs-versus-improvement question. This page covers only the **interaction** with a deposit deduction, and links. |
| `capital-vs-revenue-expenditure-landlord-uk` | The capital / revenue split | Same: link, do not rebuild. |
| `vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages` | Commercial dilapidations and VAT | A useful contrast in one clause (commercial dilapidations are a different animal from a residential deposit deduction), then link. Do not import its analysis. |
| `a-complete-guide-to-periodic-tenancy` | The periodic-tenancy regime | HARD FROZEN (armed to 2026-11-16). Link only. Never edit. |
| `renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords` | Landlord redress enrolment | FROZEN (armed to 2026-08-22). Not this page's topic. Do not link from here; page 5 in this cluster handles the relationship. |

**Blanket rule, DOSSIER.md §3:** no edit to ANY existing page. Everything above is linked, never
modified.

## 6. Whitespace / content mandate, and the verification regime

### 6a. The verification regime, before anything else

**There is no house_positions lock for deposit tax treatment.** DOSSIER.md §6, final bullet, is
explicit: "Deposit tax edges (explainer 4): verify against PIM1051/PIM2510 + TDP rules at write time;
no house_positions lock exists yet, so the pack must carry its own verified positions and QA must
check them adversarially."

The rule for the writer, in three parts:

1. **Verify every tax position on this page against the HMRC Property Income Manual at write time.**
   Start at PIM1051 (receipts of a property business) and PIM2510, both named in the dossier as
   candidates; follow the manual to whichever paragraph actually governs the point. Do not assume the
   dossier's two candidates are the right paragraphs; they are starting points, not findings.
2. **Record the manual paragraph in the coverage note**, one line per position. Citation-style
   references live in the coverage note, not in prose: the prose budget is at most **1 citation-style
   reference per 1,000 words** (`_language_spec.md` §3, Explainer 5 row: 0 to 1) and never in a
   heading.
3. **Decline anything you cannot verify.** If the manual does not support a position, or the writer
   cannot find the governing paragraph, the position **comes off the page**. It does not get softened
   into a hedge, and it does not get written "on principle". Record every decline in the coverage
   note with the reason. A shorter page with five verified positions beats a longer page with eight,
   three of which QA has to strip.

**Flagged for the writer in advance: QA factual will re-derive every position on this page
independently.** Nothing here gets the benefit of the doubt, because nothing here is locked. Expect
the adversarial pass to check each manual paragraph itself.

### 6b. Content mandate

Every point below is required unless the verification regime in 6a removes it.

1. **The labelled one-line answer, first.** Two sentences maximum before it. The answer, subject to
   verification: **a tenancy deposit is not the landlord's income when it is taken, because it is
   held against a contingent obligation to repay it; it becomes the landlord's income at the point
   the landlord becomes entitled to keep some or all of it, normally at the end of the tenancy.**
   Then the W8 move: that is the short version, here is why the detail matters.

2. **Why the deposit is not income when received.** The reasoning, in plain terms: the money is
   received subject to a contingent liability to repay it. The landlord is not entitled to it and
   may never be. It is not a receipt of the property business at that point. Say what follows for the
   agency: **a deposit sitting in the scheme or the client account does not go on the landlord's
   income line, in any quarter, and should not appear as income on the statement the agency sends.**
   Verify the technical basis before writing the reasoning sentence.

3. **Deductions retained at the end of the tenancy are taxable income of the landlord, at that
   point.** This is the core of the page. Cover:
   - The timing: the entitlement crystallises when the deduction is agreed, awarded or otherwise
     settled, not when the deposit was originally taken and not necessarily when the cash moves.
     Verify the timing rule; if the manual supports a different trigger, use the manual's.
   - The character: a retention for **unpaid rent** is rent, plainly. A retention for **damage or
     cleaning** is a receipt of the property business too, but the writer must verify whether the
     manual treats it identically or separately, and must not blur the two if it does not.
   - The consequence an agent needs: **the landlord who "wins" at adjudication has just received
     taxable income**, and a landlord who assumed the retention was compensation and therefore
     tax-free is wrong. That sentence is the page's most useful line.
   - Where the deposit is returned in full, nothing happens for tax. Say so; it is the majority case
     and agents will be asked.

4. **The interaction with repairs deductibility.** The point that makes the whole thing tolerable
   for the landlord, and the point most likely to be got wrong on the phone. Structure:
   - The retention is income. The **repair the retention pays for is deductible if it is revenue in
     character**, on the ordinary rules. Where the two match, the net tax effect is nil or close to
     it, which is why nobody notices the income side until a check-out goes to adjudication.
   - Where they do **not** match, the fork matters: a retention kept without the work being done is
     income with no matching deduction. A retention spent on something **capital** (an improvement
     beyond restoring the previous condition) is income now, with the spend going to base cost rather
     than to the year's expenses.
   - Timing mismatch: the retention may fall in one period and the repair in another.
   - Do not rebuild the repairs-versus-improvement test. Name it in a sentence, link
     `what-repairs-can-landlords-deduct-from-rental-income` and `capital-vs-revenue-expenditure-landlord-uk`,
     and move on. Verify the interaction against the manual before stating it.

5. **Advance rent is income when it is due, and the Renters' Rights Act changed what agents see.**
   Two halves, and both are needed because agents conflate them with deposits constantly.
   - **Tax half:** rent paid in advance is rent. It is income of the landlord, and the writer must
     verify at write time whether the receipt is taxed on receipt or on entitlement under the basis
     the landlord uses, including how the cash basis (the default for property businesses within the
     receipts limit) and the accruals basis differ here. Verify before writing; decline if
     unverifiable.
   - **Regulatory half, and this one IS locked** (house_positions §20.8, and §20.12 for commencement).
     From **1 May 2026**, for **private (non-social-housing) assured tenancies**, advance rent is
     restricted on two separate layers. **Before the tenancy**, the Renters' Rights Act amends the
     Tenant Fees Act 2019 so that a pre-tenancy rent payment is a prohibited payment, subject to
     narrow carve-outs. **During the tenancy**, the Act inserts a provision into the Housing Act 1988
     making a term that requires rent in advance of the rent period of no effect, with carve-outs for
     an initial rent payable in an initial 28 day period and for rent due in a permitted pre-tenancy
     period. The combined effect: **a landlord cannot ask for six or twelve months upfront as a
     deposit substitute.** The social-housing carve-out matters and must be stated: the 1 May 2026
     wave applies to private assured tenancies only, with social housing expected in a later phase
     (an expectation, not a commenced date).
   - The agent-register payload: the six-months-upfront conversation an agency used to have with a
     landlord about a thin-affordability tenant is gone, and the landlord who asks for it is asking
     for something prohibited. That is a real change in what agents see, and it is why this belongs
     on a deposit page even though advance rent is not a deposit.
   - **Notice-names only.** Write "the Renters' Rights Act 2025", "the Tenant Fees Act 2019", "the
     Housing Act 1988". Never `s.8`, `s.9`, `SI 2026/421` or `reg.2` in prose (hard rule 1). Never a
     statute reference in a heading (hard rule 8).

6. **Client money protection, one definitional sentence, then the scope line.** Define it: CMP is the
   scheme membership that protects landlord and tenant money an agency holds, and it is an
   **agency-side** obligation. Then the scope sentence: **the agency's own client-account and CMP
   compliance is outside this page; this page is about the landlord's tax position.** That is the
   whole treatment. No scheme comparison, no membership mechanics, no compliance advice. The
   `client money protection letting agents` term (10/mo) is served by the definition and nothing
   more.

7. **The required "what has not changed" block** (`_language_spec.md` hard rule 5). Candidates, each
   to be confirmed before it is written: deposit protection and the scheme deadlines are unchanged by
   any of this; the deposit cap under the Tenant Fees Act 2019 is unchanged; the adjudication process
   is unchanged; a returned deposit is still a tax non-event; and the landlord, not the agency, is
   still the person whose tax return this all lands on. Name each thing by name. Link the pet-rights
   page for the cap rather than restating it.

8. **The scenario device, at least three times** (hard rule 9). A landlord's question in quotation
   marks, then the answer in the agent's voice. The real ones: *"I kept eight hundred quid off the
   deposit for the carpet, that's not income is it?"*, *"Can I just take six months up front from
   this one?"*, *"The deposit's been sitting in the scheme for three years, do I declare it?"*.

9. **The close names a job the reader was already doing** (`_language_spec.md` §2 P7). For an agency
   that job is the check-out report and the deposit-return statement, both of which already exist.
   The close is what to put on them so the landlord's accountant can see the retention for what it
   is. No service, no form, no offer, no disclaimer that hands the question back to the reader
   (W9 is on the do-not-copy list for exactly that). This close must differ from the other two packs
   in the batch: no shared CTA template across the batch.

10. **What is NOT on this page**, so the writer does not drift into it: agency client-account
    mechanics; scheme comparison; the regulatory deposit-cap derivation; how to run an adjudication;
    commercial dilapidations analysis; anything about the agency's own accounts. DOSSIER.md §1 rules
    out any claim to do agency accounts.

### 6c. Positions that are locked and may be written without PIM verification

Only these, and only in the form given. Everything else on the page needs 6a verification.

- The advance-rent restriction and its two layers, from **1 May 2026**, for private assured
  tenancies, with the social-housing carve-out and the initial-28-day and permitted-pre-tenancy
  carve-outs (house_positions §20.8 + §20.12).
- "Landlords can demand 6 months rent upfront" is a **do-not-write** (house_positions §20.13).
- "The Renters' Rights Act 2026" is a **do-not-write**; the Act is the Renters' Rights Act 2025
  (house_positions §26.8). "2026" is commencement context only.
- The Tenant Fees Act 2019 permitted-payment list exists and the deposit cap sits inside it; the
  detail belongs to the pet-rights page (linked), not to this one.

## 7. Acceptance criteria

1. **Writer model: Opus.** Batch size 1.

2. **The pack is the whole world**, plus the HMRC Property Income Manual verifications §6a requires.

3. **Register targets, quoted from `_language_spec.md` §3, "Explainer 5: deposit and client-money tax
   edges" row, measured on body prose only:**

   | Metric | Target |
   |---|---|
   | Register | Agent-as-you |
   | Second person "you" per 1,000 words | **12 or above** |
   | Citation-style references per 1,000 words | **0 to 1** |
   | Notice-name references per 1,000 words | **5 to 10** |
   | Flesch reading ease | **45 or above** |
   | Mean sentence length | **18 words or below** (hard rule 2) |
   | Words | **1,200 to 1,800** |
   | Question headings | **half or more of H2s** (hard rule 7) |
   | Tables | **1 maximum** (hard rule 13), and only if it earns its place |
   | FAQ | **5 or 6 questions**, each a near-verbatim query (hard rule 15) |

   "You" is the **agent**. The landlord is "your landlord client", "the landlord you act for" or "the
   landlord". The tenant is "the tenant".

4. **Citation grammar.** Notice-names in prose ("the Renters' Rights Act 2025", "the Tenant Fees Act
   2019", "the Housing Act 1988"). No `s.8`, no `SI 2026/421`, no `reg.2`, no `Sch` in prose. **No
   statute reference in any heading.** At most one citation-style reference per 1,000 words, and if
   an instrument genuinely has to be identified it goes in a single reference line at the foot. PIM
   paragraph numbers go in the **coverage note**, not the body.

5. **Named keywords placed.** `tenancy deposit tax treatment` in the metaTitle or H1 and in the body;
   `is a tenancy deposit taxable income` as a near-verbatim FAQ question; `deposit deductions tax
   landlord` present as a natural phrasing; `client money protection letting agents` served by the
   single definitional sentence only.

6. **Verification discipline satisfied.** Every tax position carries a Property Income Manual
   paragraph in the coverage note, or it is not on the page. Every decline is recorded with its
   reason. The page contains no tax position the writer could not verify.

7. **All ten §6b content points present**, including the "what has not changed" block as a genuine
   section and the client-money treatment held to exactly one definitional sentence plus one scope
   sentence.

8. **Every figure matches house_positions as patched 2026-08-21, or is declined.** The only locked
   figures likely to appear are dates (1 May 2026, the initial 28 day period) rather than sums.
   Keep the pound-figure count low; winner median is one per page. No invented deposit sums, no
   invented adjudication statistics, no invented percentages.

9. **No named worked-example persona.** No pricing. No service claim. No "how we can help" block. No
   closing disclaimer that hands the question back to the reader. No shared CTA template with the
   other two packs in this batch, and never "We can produce a written {noun} for/on your {noun}".

10. **Zero em-dashes. UK English.** Nothing on the page datable to a week (hard rule 11).

11. **Middleware map entry present** before or with the content commit, exactly:
    `"tenancy-deposits-landlord-tax-position": "landlord-tax-essentials",`

12. **Coverage note written to `briefs/property/agents/notes/tenancy-deposits-landlord-tax-position.md_coverage.md`.**
    It must record: the zero-equity statement; the four assigned keywords with their volumes and the
    honest statement that three are unmeasured and the fourth is definitional-only; every verified tax
    position with its Property Income Manual paragraph; every declined position with the reason it
    could not be verified; and the differentiation boundaries against the six adjacent pages in §5.
    Note also that **no keyword at or above 50/mo is assigned to this page**, so there is no
    high-volume decline to record for this slug.

13. **Links out, all six from §5 where relevant**, none of them edited. `a-complete-guide-to-periodic-tenancy`
    and the redress sibling are frozen: link at most, never touch.

14. **QA factual re-derives every position independently** against the Property Income Manual. This
    page has no house_positions lock behind it and QA is told so in advance.

## 8. Expectation + failure trigger

- **Registration:** at deploy, standard `monitored_pages` registration as a new page, inside the
  existing weekly detector. **No new monitor, cron, alert, digest or notification of any kind**
  (DOSSIER.md §10, owner ruling §1).

- **Deploy is owner-triggered.** Build local-first. Do not deploy, do not submit IndexNow, do not
  register monitored_pages unless the owner asks in that turn.

- **90-day read** (DOSSIER.md §10).

- **Success at 90 days:** any GSC impressions on deposit-tax-shaped queries, or any Bing rows at all.
  With zero measured volume across the assigned set, there is no position to target and none is
  promised. The realistic win is long-tail capture on question-shaped queries an agent or landlord
  types at check-out time, plus forwardability, which DOSSIER.md §10 records as explicitly
  unmeasurable in advance.

- **Page-level failure trigger:** zero Bing rows AND zero GSC impressions on this URL at the 90-day
  read means the whitespace was whitespace because nobody searches it. Report that as a page-level
  failure and do not build a second page in this topic on the same evidence.

- **Single-keyword risk, disclosed, per DOSSIER.md §10:** this page carries the thinnest measured
  keyword set in the cluster. Three of its four assigned terms have no recorded volume and the fourth
  is definitional. That risk is stated here, before the work, not explained away after it.

- **Cluster-level trigger, for context:** zero Bing rows AND zero GSC impressions across the whole
  agents1 cluster at the 90-day read falsifies the register thesis, and no Track-2-style audience
  surface gets built on this evidence base.
