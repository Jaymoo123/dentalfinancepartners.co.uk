# Editorial QA: `letting-relief-landlords-2026-changes.md` (2026-08-20)

Reviewer track: editorial only (helpful-content bar + `DOSSIER.md` §6 language spec). Factual
accuracy against house positions is the other track and is not adjudicated here, except where a
statement about the protected copy is wrong on the face of the protected copy (BLOCKER 1).

Scope: newly added copy only, isolated with `git diff HEAD` — 8 added H2 sections (lines 67-164)
and 6 added FAQs (frontmatter lines 47-58). Protected statute-first sections (lines 61-65 and
166-402) read in full for seam assessment, not reviewed for their own quality.

Added copy measures **~2,046 words**. The page was trimmed to clear the voice gate at 34.8 with a
0.2 margin, so every fix below is **word-count negative**. Total if all are applied: **about −123
words**, none of it load-bearing.

## Verdict: **must_fix**

| Severity | Count |
|---|---|
| BLOCKER | 3 |
| ADVISORY | 7 |

---

## Clean on the mechanical checks

- **Zero em-dashes.** No U+2014 anywhere in the file; no U+2013 either. The two U+2212 characters
  (lines 137 and 222) are minus signs in arithmetic and are correct.
- **No pipeline artefacts.** No TODO/TBD, no bracketed placeholders, no residual brief language,
  no smart quotes, no double spaces in the added HTML.
- **No pricing, no client names.** No CTA added; the two `<aside>` blocks are pre-existing.
- **All 6 internal links in the new copy resolve** to existing slugs in `content/blog/`.
- **Batch pattern (a) — "[number] [plural noun]:" list openers — is NOT present here.** The only
  numeric list opener in the new copy is "Your relief is the lowest of three figures:" (line 94),
  which is the statutory shape of the relief itself, used once. The `<ul>` at line 79 and the
  worked-example lists all open on ordinary sentences or bold step labels. No action.
- **Register per §6 is genuinely hit.** All 8 new H2s take question form (spec asks us to raise
  from 14.5% toward the winners' 31.5%; this batch is 100%). Second person is dense and natural.
  Statute is **absent** from all 8 new body sections — zero legislation citations above line 166,
  which is exactly the "near zero in new plain-language sections; keep depth below" target.
  Answer-first holds: every new H2 is answered in its first sentence.
- **UK English throughout the new copy.** "annexe" (line 88) is the correct UK noun; note the
  protected copy at line 203 uses "annex". Pre-existing, frozen, no action.

The findings below are about keyword carriers, one false cross-reference, and triplicated
reporting content. They are not about voice — the voice work is good.

---

## BLOCKER 1 — the new copy tells the reader why the two worked examples differ, and the reason it gives is wrong

Location: line 105 (new), referring to the protected worked example at lines 216-235.

New (line 105):
> "Exclusive use drives the answer. A bedroom your lodger alone used is exclusively theirs, so a
> slice of the gain falls out for lettings relief to catch. **Share the whole house with no room
> set aside and there is usually no let-portion gain at all, which is why the two worked examples
> on this page reach different answers.**"

Protected (line 218):
> "From 2022 she **let one bedroom** plus access to the bathroom and kitchen to a series of
> lodgers…"

Protected (line 232):
> "So 100% of the ownership period is main-residence: PRR = £122,000"

Priya *did* set a room aside. The sentence at line 105 tells the reader the two examples diverge
because one had no room set aside, and the reader who scrolls 110 lines finds that the other
example's opening fact contradicts it.

The deeper seam is real and cannot be fixed from this side: Dana's new example restricts PRR by
floor area (30%), Priya's protected example restricts PRR by time only and reaches 100% PRR on the
same fact pattern (live-in landlord, lodger bedroom, shared common areas). Two methods, one page.
The protected copy is byte-identical by rule, so the only available fix is to stop the new copy
asserting a bridge that does not hold.

**Fix (−13 words):** delete the trailing clause. Line 105 ends:
> "…Share the whole house with no room set aside and there is usually no let-portion gain at all."

The point stands on its own; the cross-reference is what breaks. Flag the underlying
two-methodologies clash to the factual track — if it rules that Priya's 100% PRR is wrong, that is
a protected-copy change and a separate decision.

---

## BLOCKER 2 — batch pattern (b): three keyword lists rendered as prose, two of them explicitly framed as search behaviour

This is the sibling QA's pattern, and it is here in its purest form. Quoted in full:

**(a) Line 71, new body:**
> "**If you have been searching for letting relief, CGT letting relief, lettings relief for CGT or
> capital gains tax letting relief, they are all the same thing.** The spelling varies; the rules
> do not."

Four near-identical phrasings in one sentence, opened by telling the reader what they typed into a
search box. Nothing in the sentence is information about lettings relief.

**Fix (−15 words):** keep two variants, drop the search framing:
> "Letting relief, lettings relief and CGT letting relief are the same thing. The spelling varies;
> the rules do not."

**(b) Line 148, new body:**
> "You will see it written several ways. PRR, PPR, principal private residence relief and main
> residence relief all mean the same thing, **and searches for CGT private residence relief and PPR
> CGT land on the same rules.** HMRC's manuals use "private residence relief"; PPR survives from
> older practice."

"PPR CGT" is not a phrase a person says. The first clause already does the job; the second exists
only to carry two more strings.

**Fix (−15 words):** delete the flagged clause and close the sentence after "the same thing."

**(c) FAQ line 54 and FAQ line 56** repeat the same device inside the answers:
> "Residential lettings relief, letting relief, lettings relief and CGT letting relief all describe
> the same relief in section 223B TCGA 1992… the singular 'letting relief' is **the common spelling
> in search** and in older guidance."

> "Principal private residence relief, private residence relief, PPR and PRR all mean the capital
> gains tax relief on your own home… 'PPR' survives from older practice and is **still the more
> common search term**."

Two FAQs whose answers are four-item synonym lists plus a statement about search volume. Telling
the reader what is popular in search is the tell.

**Fix (−12 words):** in both, cut "in search" / "still the more common search term" down to the
usage fact alone ("'PPR' survives from older practice."). Keep the synonym lists — the FAQ question
is legitimately "are these the same thing?" — but stop narrating the SERP. See ADVISORY 5 for the
duplication between FAQ line 56 and body line 148.

---

## BLOCKER 3 — the 60-day reporting rule is now stated three times on one page, twice in the new copy

Location: new body line 164, new FAQ line 58, protected line 354.

New body (line 164):
> "If tax is payable you have 60 days from completion to report the sale and pay. If your reliefs
> bring the gain to nil you do not need the 60-day return as a UK resident, though the disposal
> still goes on your Self Assessment return. Non-residents file on every UK land disposal whether
> or not tax is due."

New FAQ (line 58, last sentence):
> "Where reliefs reduce the gain to nil, UK residents do not need the 60-day return but the
> disposal still belongs on the Self Assessment pages."

Protected (line 354):
> "Where Lettings Relief reduces the chargeable gain to nil after PRR and AEA, no 60-day CGT on UK
> property return is required for UK residents. The disposal still appears on the SA108 capital
> gains pages…"

Same three facts (tax due → 60 days; nil gain → no 60-day return but still on SA; non-residents
always file), same order, three times, two registers. The added copy created two of the three
instances. Protected line 354-356 already carries it in full.

**Fix (−25 words):** delete the final sentence of new FAQ line 58 entirely. The FAQ is about the
Self Assessment computation and reads better ending on "…the Self Assessment entry then reconciles
to it." Keep the new body paragraph at line 164 — that is the plain-language surface the extend
work is for.

---

## ADVISORY 1 — "the same question, answered twice" across the seam, in three places

None of these is fatal on its own; the register split is the point of the extend. Listing them so
the density is visible:

| New surface | Protected surface answering the same question |
|---|---|
| H2 "Who no longer qualifies after April 2020?" (line 86) | "What changed in April 2020" table (line 178) + non-qualifying list (line 207) + FAQ line 21 |
| H2 "How do private residence relief and lettings relief fit together?" (line 144) | FAQ "Can I claim Lettings Relief and Private Residence Relief on the same disposal?" (line 29) |
| FAQ "Has lettings relief been abolished?" (line 47) | FAQ "Can I still claim the £40,000 Lettings Relief in 2026/27?" (line 19) |

The new "Who no longer qualifies" section handles the seam correctly — it points down ("The
transitional-rules section below sets out where HMRC states this"). The other two do not signpost.
No word-count-neutral fix that preserves the plain-language layer; recommend accept, but do not add
a fourth surface for the April 2020 change in any later pass.

## ADVISORY 2 — the £40,000-per-owner / £80,000-jointly fact is now on the page four times

New line 73 ("so you and your partner could claim up to £80,000 between you") joins protected FAQ
line 28, protected FAQ line 36 and protected body line 286. The new instance is the plain-language
one and earns its place; the observation is that this page has no remaining headroom for restating
it. No fix.

## ADVISORY 3 — keyword stuffing inside one body sentence

Line 154:
> "…so anyone quoting **a 36-month rule for capital gains tax in the UK** is working from rules more
> than a decade out of date."

The H2 directly above already carries the full phrase ("Is there still a 36-month rule for capital
gains tax in the UK?"). Repeating it verbatim 20 words later is stuffing, not emphasis.

**Fix (−7 words):** "…so anyone quoting a 36-month rule is working from rules more than a decade out
of date."

## ADVISORY 4 — an FAQ answer whose closing sentence restates its own question

FAQ line 52:
> "**Those are the realistic CGT reliefs on property if lettings relief is closed to you.** The
> section on other reliefs and alternatives below sets out each one with the numbers…"

The question is "What capital gains tax reliefs on property can you claim if lettings relief is
closed to you?" The flagged sentence adds nothing and reads as a keyword restatement of the
question stem.

**Fix (−15 words):** delete it. The answer flows straight from the list to the signpost.

## ADVISORY 5 — new FAQ line 56 duplicates new body line 148 almost verbatim

Both were added in this pass, so this is internal to the new copy, not a seam issue:

Body line 148: "HMRC's manuals use "private residence relief"; PPR survives from older practice."
FAQ line 56: "HMRC's manuals use 'private residence relief'; 'PPR' survives from older practice…"

**Fix (−20 words):** with BLOCKER 2(b) and 2(c) applied, collapse FAQ line 56's second sentence into
the first ("Yes. Principal private residence relief, private residence relief, PPR and PRR all mean
the same capital gains tax relief on your own home under sections 222 to 226 TCGA 1992.") and drop
the HMRC-usage sentence, which the body now owns.

## ADVISORY 6 — antithesis ("X, not Y" / "X rather than Y") at machine density

Nine instances in ~2,046 added words, several within three sentences of each other:

> "a ceiling rather than a starting point" · "per owner rather than per property" (both line 73)
> "The spelling varies; the rules do not." (line 71)
> "the date you sell, not the date you started letting" (line 90)
> "Shared kitchens, bathrooms and hallways are not let space." (line 99)
> "is 9 months, not 36" (line 154)
> "an income tax relief on the rent you receive rather than a CGT relief on the eventual sale" (FAQ line 54)

Individually each is fine and several are load-bearing corrections. Line 73 is the one to fix,
because it fires the construction twice in a single sentence.

**Fix (−4 words):** "The £40,000 is a ceiling, not a starting point, and it goes per owner, so you
and your partner could claim up to £80,000 between you."

Two related tics worth one pass: "for lettings relief to work on" (line 98) and "for lettings relief
to catch" (line 105) reuse a distinctive metaphor seven sentences apart; and line 156 closes on
"which makes the old figure an expensive thing to believe", a flourish that adds nothing after the
15%-of-your-gain figure has already landed (**−11 words if cut**).

## ADVISORY 7 — two small consistency items, both word-count neutral

- Line 148 introduces the page's **only** straight double quotes in body prose. Every other quoted
  term on the page uses single quotes (protected line 203 "'shared'", protected FAQ line 26).
  **Fix (0 words):** use single quotes.
- The `<ul>` at lines 79-84 does not parallel its lead-in. The lead-in is "You qualify if you lived
  in the property…", then bullets 1-2 are "You…" statements while bullets 3-4 switch to "The
  property was…" and "There is a gain left over…". **Fix (0 words):** recast bullets 3-4 into second
  person ("Your property was your only or main home for at least part of your ownership." / "You
  have a gain left over from the letting once private residence relief has been applied.").

---

## Handed to the factual track, not adjudicated here

1. The two-methodologies clash behind BLOCKER 1 (floor-area-restricted PRR in the new example vs
   100% time-only PRR in the protected example, on materially the same fact pattern).
2. New body line 162 and new FAQ line 50 both put brought-forward capital losses ahead of the
   £3,000 annual exempt amount in the deduction order. Brought-forward losses are restricted so the
   AEA is not wasted. Both statements are new copy, so both are fixable without touching protected
   text.
3. Pre-existing, out of scope, noted only because it was seen: protected FAQ line 46 links
   `/blog/capital-gains-tax/non-resident-cgt-uk-property-rates-reporting` while protected Sources
   line 398 links `/blog/non-resident-landlord-tax/non-resident-cgt-uk-property-rates-reporting`.
   One of the two category paths is wrong.

## Word-count ledger if all fixes are applied

| Fix | Delta |
|---|---|
| BLOCKER 1 (delete false cross-reference) | −13 |
| BLOCKER 2(a) (line 71 search framing) | −15 |
| BLOCKER 2(b) (line 148 "PPR CGT" clause) | −15 |
| BLOCKER 2(c) (FAQ search-volume claims) | −12 |
| BLOCKER 3 (delete triplicated 60-day sentence) | −25 |
| ADVISORY 3 (36-month stuffing) | −7 |
| ADVISORY 4 (FAQ self-restatement) | −15 |
| ADVISORY 5 (FAQ/body duplicate) | −20 |
| ADVISORY 6 (line 73 double antithesis + line 156 flourish) | −15 |
| ADVISORY 7 (quotes, bullet parallelism) | 0 |
| **Total** | **−137** |

Every fix is a deletion or a shortening. The voice gate's 0.2 margin is not at risk from any of
them, and the removals target exactly the copy that depresses a helpful-content read: search-behaviour
narration, restated questions and triplicated facts.
