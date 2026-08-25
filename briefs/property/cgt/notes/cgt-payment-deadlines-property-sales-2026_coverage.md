# Coverage note: /blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026

EXTEND-GOOGLE, additive only. Written 2026-08-20 against
`packs/PACK_blog_capital-gains-tax_cgt-payment-deadlines-property-sales-2026.md`.
Clusters owned: `report capital gains` + `hmrc capital gains tax` (consolidation, DOSSIER §4c.3).

**Revised 2026-08-20 after QA rounds 2 and 3**: `qa/EDITORIAL_batch2.md` (8 blockers, 4 advisories
on this page), `qa/FACTUAL_rates-family.md` (1 blocker, 2 advisories) and
`qa/VERIFY_restructures.md` (FAIL on checks 1, 2, 4). This note describes the post-QA state. Both
fix rounds are recorded in their own sections at the end.

## Protected elements (verified programmatically after the edit)

| Element | Result |
|---|---|
| metaTitle | byte-identical |
| h1 | byte-identical |
| Existing H2 set and order | preserved as an exact subsequence of the new H2 list |
| Existing 13 FAQ entries | byte-identical (YAML-parsed comparison, entries 1-13) |
| Existing body prose | **zero blocks lost**: every pre-existing `<p>` and `<li>` still present verbatim |
| Existing H3 `Filing without digital access` | untouched |
| Existing penalty table | **CHANGED under approved back-patch** (see below) |

### Approved protected-element back-patch: the penalty table

Authorised by the coordinator in the QA fix round, on FACTUAL BLOCKER 1 / ADVISORY 9. The
pre-existing table mixed two day-counting conventions: a `Days past the deadline` header sitting
over a late-payment column whose first row counted interest from day 61 (which is day 1 past the
deadline, not day 61 past it) and whose 5% surcharges were placed at days 91, 181 and 365.

Before (4 rows, late-payment column):

| Days past the deadline | Late payment |
|---|---|
| Day 1 to 90 | Interest accruing daily from day 61 |
| Day 91 to 180 | 5% surcharge at day 91 |
| Day 181 to 365 | Further 5% surcharge at day 181 |
| Day 365 plus | Further 5% surcharge at day 365 |

After (5 rows, header re-based, late-filing column unchanged in substance):

| Time past the 60-day deadline | Late filing | Late payment |
|---|---|---|
| Day 1 | £100 fixed penalty | Interest accrues daily from this point |
| Day 30 | - | 5% of the unpaid tax |
| Day 91 | Plus daily £10 penalties, capped at £900 | - |
| 6 months | Plus £300 (or 5% of tax if higher) | Further 5% of the unpaid tax |
| 12 months | Plus another £300 (or 5% of tax if higher) | Further 5% of the unpaid tax |

The deliberate/concealed row is unchanged. This is now the house §5 ladder exactly: £100 fixed on
lateness, £10/day from day 91 capped at £900, £300-or-5% at 6 and 12 months on the filing side;
5% of unpaid tax at 30 days, 6 months and 12 months on the payment side, with interest running
from the deadline. Five table cells changed and one header cell; no prose in that section touched.

Frontmatter changes: 5 FAQ entries appended (13 -> 18), `dateModified: "2026-08-20"` and
`reviewedAt: "2026-08-20"` added (neither field existed on this page; both are estate convention).
Nothing else.

## Words added

| Where | Words |
|---|---|
| Body (new sections, post-QA) | 1,276 |
| Frontmatter (5 new FAQs) | 585 |
| **Total** | **1,861** |

Body now 3,526 words (was 2,250). The lead competitor for this cluster is 3,763 words; DOSSIER §6
sets no word target. The two QA rounds removed 513 body words of duplication and keyword-carrying
prose from the first draft (1,789 -> 1,276) and one whole FAQ.

Second person in my sections: 59.7 "you/your" per 1,000 words (spec floor 25). Every new H2 is
question form except the lead, which is the winners' direct second-person deadline shape
(DOSSIER §6). No statute in any new opening. Zero em-dashes and en-dashes in the file. Zero
`[number] [plural noun]` list preambles remain in my copy (the one survivor, "Three things land on
our desk repeatedly", is pre-existing protected prose).

## Page order after the QA restructure

The plain-language layer now sits above the mechanics, per EDITORIAL BLOCKER 1.1. Protected
sections keep their relative order exactly.

```
intro (protected)
NEW  You have 60 days to report and pay CGT after completion
NEW  How do you report capital gains tax to HMRC?
NEW  How do you pay capital gains tax to HMRC?   (+ H3 When do you pay CGT on property?)
NEW  What is the HMRC capital gains tax account and how do you sign in?
NEW  Which capital gains tax form do you need?
     Who is in scope of the 60-day return              (protected)
NEW  Do you report a land sale or a commercial property sale within 60 days?
     The 60-day clock                                  (protected)
     What the 60-day return contains                   (protected, incl. H3)
     Payment is due at the same time                   (protected)
     Penalties for late filing and late payment        (protected, table back-patched)
     How the 60-day return and Self Assessment interact (protected)
NEW  Do you report capital gains on your Self Assessment tax return as well?
     Worked timeline ... to end of page                (protected)
```

Internal links added (3), all `/blog/<category-slug>/<slug>` and all verified to exist with the
matching category: `non-resident-landlord-tax/non-resident-cgt-uk-property-rates-reporting`,
`capital-gains-tax/cgt-commercial-property-different-residential`,
`capital-gains-tax/cgt-property-sold-loss-claim-capital-losses`.

## FAQs added (5)

1. How do I report capital gains tax to HMRC?
2. How do I pay capital gains tax to HMRC?
3. How do I sign in to my capital gains tax account?
4. Which form do I use to report capital gains tax?
5. Can I use HMRC's real time capital gains tax service to report a property sale?

A sixth ("Do I have to report a capital gain on the sale of land within 60 days?") was added in the
first draft and deleted in QA round 3 as a duplicate of protected FAQ 6.

## Cluster coverage: 60 section-3 keywords, 33 placed verbatim, 27 declined

Measured by exact substring match against the tag-stripped, lower-cased full file
(frontmatter + body). The first draft placed 43; QA round 2 removed 12 and three were
re-placed naturally on the FAQ surface (netting 34), then QA round 3 removed one more, netting 33.

### Placed (33)

| Keyword | Vol | Where |
|---|---|---|
| hmrc capital gains tax | 2400 | account H2 + FAQ 4 |
| report capital gains | 1600 | Self Assessment H2 |
| capital gains tax reporting | 1600 | report H2, opening sentence |
| capital gain report | 1600 | Self Assessment section ("the capital gain reported on the SA108 pages") |
| cgt report | 1600 | pre-existing |
| how to pay capital gains tax | 1600 | pay H2, opening sentence |
| pay capital gains tax | 1600 | pay H2, FAQ 2 |
| report and pay capital gains tax | 880 | lead H2 |
| pay cgt online | 880 | pay H2 body |
| paying capital gains tax online | 880 | FAQ 2 opening |
| pay cgt | 720 | pay H2, FAQ 2 |
| capital gains tax pay | 720 | lead section ("capital gains tax payment deadline") |
| capital gains tax return | 480 | form H2 intro |
| capital gains tax account | 480 | account H2 + body, FAQ 3 |
| cgt on property sale | 390 | pay H3 answer ("CGT on property sales") |
| cgt return | 390 | pre-existing + form section |
| form for capital gains tax | 390 | form section ("paper form for capital gains tax on UK property") |
| real time capital gains tax service | 320 | report H2, FAQ 1, FAQ 5 |
| cgt self assessment | 320 | Self Assessment section opening |
| self assessment capital gains | 320 | report H2 opening |
| report cgt | 260 | FAQ 5 |
| reporting capital gains tax on uk property | 260 | report H2 bullet lead-in |
| when do you pay capital gains tax on property | 210 | H3, verbatim heading |
| capital gains tax on uk property account sign in | 210 | FAQ 3 |
| 60-day cgt return | 170 | pre-existing |
| pay cgt to hmrc | 170 | pay H3 answer |
| capital gains tax on sale of land | 170 | land H2 |
| ppdcgt | 170 | pre-existing, form table, FAQ 4 |
| pay capital gains tax on property | 170 | pay H2 opening |
| how do i pay capital gains tax to hmrc | 170 | FAQ 2, verbatim question |
| 60-day cgt reporting | 140 | pre-existing |
| paper cgt return | 140 | FAQ 4 |
| hmrc capital gains tax form | 140 | FAQ 4 |

### Declined group A (17), mangled or reversed variants

Fourteen of these are grammatical mangles of a phrase that IS placed. Forcing them in requires
ungrammatical copy, which fails DOSSIER §6 and reads as stuffing.

| Keyword | Vol | Reason |
|---|---|---|
| sale of property cgt | 1000 | reversed word order, no grammatical carrier. `cgt on property sales` placed. |
| capital gain on tax return | 480 | singular mangle; `the capital gain reported ... on the SA108 pages` placed. |
| capital gains tax tax return | 480 | duplicated word. |
| capital gain tax return | 480 | singular mangle; `capital gains tax return` placed. |
| capital gain tax login | 480 | singular mangle of a login-family phrase now declined outright (group B). |
| capital gain tax account | 480 | singular mangle; `capital gains tax account` placed. |
| capital gain tax form | 390 | singular mangle; `hmrc capital gains tax form` placed. |
| selling a property capital gains | 390 | no carrier without a comma, which breaks the string. |
| capital gains property sale | 390 | mangle; `cgt on property sales` placed. |
| capital gain self assessment | 320 | singular mangle; `cgt self assessment` and `self assessment capital gains` placed. |
| capital gains tax land | 260 | only carriers are accidental (`capital gains tax landlord...`) or ungrammatical. |
| capital gains tax land sale | 170 | as above. |
| capital gain on sale of land | 170 | singular mangle; plural placed in FAQ 6. |
| capital gains tax form hmrc | 140 | reversed; `hmrc capital gains tax form` placed. |
| capital gains tax on uk property account: sign in | 210 | the colon is HMRC's page-title punctuation; the un-colonned string is placed. |
| 60 day cgt return | 170 | unhyphenated rendering variant; the page uses `60-day` throughout including in the metaTitle. |
| when is cgt due | 170 | fits only as a bare heading; a second near-duplicate H3 next to `When do you pay capital gains tax on property?` adds no reader value. |

### Declined group B (10), removed by QA rounds 2 and 3

These nine were placed in the first draft and were removed by the editorial fix round. In each
case the sentence carrying the phrase was one QA quoted as keyword-carrying or duplicative. The
QA finding wins over verbatim coverage; recorded here rather than quietly re-inserted.

| Keyword | Vol | Removed by | Reason it was not re-placed |
|---|---|---|---|
| report and pay capital gains tax on uk property | 1000 | BLOCKER 1.7 | its only carrier was the appositive restating the service's own name inside the same sentence. `report and pay capital gains tax` is placed in the lead H2 and covers the same intent. |
| hmrc capital gains tax login | 590 | BLOCKER 1.5 | the login family has no carrier distinct from "Government Gateway user ID and password", which is what the service actually uses. |
| cgt tax return | 480 | BLOCKER 1.6 | QA's approved replacement deliberately says "CGT return"; restoring "CGT tax return" re-opens the blocker. |
| tax return for capital gains | 480 | BLOCKER 1.6 | the clause carrying it existed only to carry it, on QA's reading. |
| capital gains tax self assessment | 320 | BLOCKER 1.3 | needs a noun-pile ("capital gains tax Self Assessment reporting"), the exact shape QA blockered on the sibling inherited page (2.1). |
| capital gains self assessment | 320 | BLOCKER 1.3 | as above. `cgt self assessment` retained as the one natural placement. |
| how to declare capital gains tax | 210 | BLOCKER 1.7 | quoted by QA as "bolts a search query on as a sentence subject". |
| capital gains tax account login | 210 | BLOCKER 1.5 | QA noted it was carried "by inventing a thing that does not exist so it can be negated". |
| cgt on sale of land | 170 | BLOCKER 1.8 | third of three "sale of land" strings in one paragraph. One natural placement retained, in the body. |
| capital gains on sale of land | 170 | VERIFY check 4 | its only remaining home was the land FAQ, deleted in round 3 as a duplicate of protected FAQ 6. The body keeps `capital gains tax on sale of land`. |

Two others that round 2 removed survive on the FAQ surface, each in a FAQ whose question is about
that exact thing: `report cgt` and `paper cgt return`. A third, `capital gains on sale of land`,
was re-placed in round 2 and lost again in round 3 with the FAQ that carried it (see group B).

## QA round 2: what changed

### FACTUAL BLOCKER 1 (late-payment ladder)

The wrong sentence ("5% surcharges stacking on top at three, six and twelve months") was
**deleted rather than corrected**, because the paragraph it sat in also duplicated the protected
`Payment is due at the same time` section on both payment methods and day-61 interest
(EDITORIAL BLOCKER 1.2). Correcting it in place would have left the duplication. The correct
ladder now lives once, in the back-patched penalty table above. Net effect: the page states the
30-day / 6-month / 12-month payment surcharges once and correctly, and states them nowhere else.

### EDITORIAL blockers

| # | Finding | Action |
|---|---|---|
| 1.1 | insertion order breaks the argument | four reporting/paying H2s moved above `Who is in scope`; protected order untouched |
| 1.2 | payment methods + day-61 interest twice | deleted both duplicating sentences from my copy (payment-methods sentence, and the whole "pay late" paragraph). Protected section keeps the facts, including its Time to Pay point |
| 1.3 | Self Assessment answered twice | deleted my restatement paragraph; kept only the two genuinely new points (SA108 finalises the estimate + loss claim, and "not in SA at all") |
| 1.4 | Government Gateway fact four times | protected line 113 left alone; my bullet cut to "Sign in. You need a Government Gateway user ID"; my account-creation sentence deleted; the account H2 kept for its unique points |
| 1.5 | login keyword sentence | replaced with QA's wording: "You sign in with your Government Gateway user ID and password. There is no separate CGT login to set up." |
| 1.6 | form/return keyword sentences | replaced with QA's suggested wording verbatim |
| 1.7 | report/declare/pay keyword sentences | all three rewritten; QA's suggested wording used for the report opener, the invented "paying-in date" clause deleted |
| 1.8 | "sale of land" three times | third sentence deleted, second rewritten to QA's wording |

### EDITORIAL advisories

| # | Finding | Action |
|---|---|---|
| 1.9 | paper-route point split | deleted my duplicate ("posting time is yours to absorb...") |
| 1.10 | agent authorisation twice | deleted my restatement of the agent services account mechanics; kept the unique "ask to see the calculation" advice |
| 1.11 / X.1 | numbered-preamble tic | both instances removed ("Three things decide...", "Two edge cases...") |
| 1.12 | opener pre-empts the scope table | tightened to QA's one-sentence version |
| X.2 | aphoristic closers | both mine removed ("Filing on time and paying late costs you far less...", "Do not assume it.") |
| X.4 | FAQ answers mirroring body | FAQ 6 rewritten to answer in different words; FAQ 2 reopened on a different sentence |

### FACTUAL advisories

| # | Finding | Action |
|---|---|---|
| 5 | "everything else goes on SA108" contradicts the real-time FAQ | both the body and FAQ 1 now say "on the SA108 ... if you file a tax return, or through HMRC's real time capital gains tax service if you do not" |
| 6 | "two edge cases" asserts completeness it does not have | took QA's option A and dropped the "two edge cases" framing. Did **not** add the Sch 1B under-construction and off-plan limbs: house positions §5 does not carry them, so adding them would mean sourcing a new claim from the QA report alone. Per the coordinator's instruction, the claim is left out rather than guessed |
| 7 (pre-existing) | "payment on account" used two ways across the family | my copy now says "Self Assessment payments on account do not apply to capital gains tax" in both the body and FAQ 2 |

### Not this page

The coordinator's advisory item 5 named temporary non-residence framing and the NRCGT
straight-line apportionment claim. Neither appears on this page, in old copy or new (grepped:
zero hits for "temporary non-residence", "rebasing", "straight-line"). Both are FACTUAL
ADVISORY 2 and 3 against `capital-gains-tax-property-sale-uk-2026-rates-allowances.md`. No
action taken here; flagged back so they are not lost.

Also unactioned and belonging elsewhere: FACTUAL BLOCKER 2 (page 2's "completion date is the
disposal date" FAQ, which contradicts TCGA 1992 s.28 and contradicts this page), and FACTUAL
ADVISORY 8 (page 2's penalty FAQ merges the daily and 6-month penalties, the same confusion the
back-patch just fixed here).

## QA round 3: verification read (`qa/VERIFY_restructures.md`)

Verdict on this page was FAIL on checks 1 (duplicate answers), 2 (seam) and 4 (frontmatter). The
coordinator's instruction was deletions only, no new copy, so both stranded sections were fixed by
deleting my duplicating sentences rather than by moving the sections. Four deletions:

| # | Line | What was deleted | Duplicated |
|---|---|---|---|
| 1 | 247 | whole closing paragraph of my Self Assessment section ("If you are not within Self Assessment at all ... has to appear there as well") | protected line 236, 11 lines above, which states the same non-SA answer with a case-by-case caveat mine dropped |
| 2 | 149 | one sentence, "You file within 60 days even where you have no tax to pay and even where you sold at a loss." | protected line 143, 6 lines above. The unique indirect-disposal clause and the onward link were kept |
| 3 | frontmatter | FAQ 19 in full ("Do I have to report a capital gain on the sale of land within 60 days?") | protected FAQ 6, same two-part answer. Its unique garden-and-grounds boundary already sits in the body |
| 4 | frontmatter | one clause in FAQ 16, "If you have not used the service before, the account is created the first time you sign in and" | protected FAQ 5's account-creation mechanic. FAQ 16 kept because it carries two keywords FAQ 5 does not (`capital gains tax account`, `capital gains tax on uk property account sign in`) |

Deletion 4 stopped short of removing the whole sentence so that "Keep that number" keeps its
referent. No words were added anywhere in this round.

Not actioned, and flagged back rather than fixed here: the verification read's out-of-scope note on
line 60 of this page, "Missing the 60-day window triggers automatic penalties from day 61, even if
the eventual tax bill turns out to be zero." That is protected intro copy, it is in tension with the
page's own rule that a UK resident with no tax due has no filing obligation, and correcting it is
outside both the pack's additive permission and this round's deletions-only instruction.

## Facts and where each was verified

Every figure traces to `docs/property/house_positions.md` §5 or to already-verified copy on this
page: 60 days from completion for UK residents only where CGT is due; non-residents file for
every UK land disposal regardless; AEA £3,000 for 2026/27; 18%/24% residential and non-residential;
£100 from day 61, £10/day from day 91 capped £900, £300-or-5% at 6 and 12 months; payment methods,
agent services account, CGT on UK property account number, PPDCGT, SA108, the 12-month amendment
window and the 31 January balancing payment all from existing verified page copy.

Deliberately NOT stated, because unverifiable against house positions:

- The format or prefix of the HMRC payment reference.
- The mechanics or current operational status of HMRC's real time capital gains tax service. The
  FAQ answers only the boundary question a property searcher asks, which holds either way.
- The Self Assessment CGT proceeds reporting threshold figure.
- The Sch 1B under-construction and off-plan limbs (see FACTUAL advisory 6 above).

## Gates

| Gate | Result |
|---|---|
| `python scripts/sdlt_equity_gate.py --cluster cgt --baseline HEAD` | `EQUITY GATE: all packs pass (equity coverage, protected elements, ledger balance)` |
| `python scripts/voice_scan.py --slug cgt-payment-deadlines-property-sales-2026 --site property` | robot_score 13.2, band **MINOR**. Both flags are pre-existing protected copy: S1 "the taxpayer" in the penalties paragraph, S2 "This guide sets out" in the intro. S4 em-dashes 0, S5 signposting 0, S7 americanisms 0 |
| Em-dashes / en-dashes | zero |
| Protected prose blocks lost | zero |
| Protected H2 relative order | preserved |

## Measurement (pack §8, unchanged)

Expectation: impressions on the section-3 phrases within 28d on Bing, 28-90d on Google. Success is
read on phrase coverage, not total traffic.
Failure trigger: at 28d, Bing position worse than baseline+2 (baseline pos 7) OR Bing clicks < 1
-> revert the single commit touching this page.

Not deployed. Not committed. No `monitored_pages` or `blog_optimizations` row written; those go in
at deploy, which is owner-triggered.

## Manager back-patch (2026-08-20, post-round-3)

- Protected intro sentence corrected: unqualified "penalties from day 61 even if the eventual
  tax bill turns out to be zero" now scoped "where a return is due", with the zero-tax case
  attributed to non-residents only (house_positions section 5: UK residents file only where
  CGT is due; non-residents file for every UK land disposal).
