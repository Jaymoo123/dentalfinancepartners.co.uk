# PACK N7: net-new — Accounting support for neurodivergent business owners

Derived 2026-08-25 from FROZEN dossier `../specialist_professions_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **friction-and-fix-led**). Ground truth: house **§22.7** (tone and
content fence, allowed and never lists), with §2.B (deadlines) and §9 (MTD timetable). **C1 row 84 =
CONDITIONAL: business-tax content only; no diagnostic or medical framing; no disability-benefit claim
content or onward referral, which would be regulated claims management in the specified-benefits
sector; vulnerability makes the tone rules bite harder than the law does.** The C1 fence is the gate
and is recorded here in full. C2 §8 carries no separate row beyond the 24-CONDITIONAL line.

## 1. Target and permission level

- NET-NEW coverage page, single page, minimum shape (dossier §3: zero assigned keywords, coverage over
  selection, volume is not a gate). Proposed slug:
  `accounting-support-for-neurodivergent-business-owners` (writer may refine; resolver conventions).
- Grade: NET-NEW, everything writable. Revert path: delete pre-deploy; post-deploy enters
  `monitored_pages`.
- **No cluster, no hub.** One page.
- **This is the pack with the strictest tone spec in the wave.** If the writer is uncertain whether a
  sentence sits inside the allowed list, it comes out.

## 2. Equity register

None (net-new).

## 3. Market keyword slice (ledger)

**Zero assigned keywords.** The harvested specialist (macleodaccounting.co.uk, 62 ranked rows) ranks
for **zero family keywords with volume**.

**Instrument caveat, stated:** dossier §1 records a young brand field (Macleod, Balloon, Heywood
Macdonald, AuDHD Accountant, Watmore) whose demand is real enough to sustain five boutique brands but
invisible in keyword data. balloonaccounting.co.uk was one of the four harvests refused by the
DataForSEO daily abort gate (delta D1). Free expansions never run (delta D2).

## 4. Competitor teardown (fetched 2026-08-25)

`macleodaccounting.co.uk` — ~650-700 words on the homepage, headings are pure brand voice ("Get Money
Sorted.", "What does 'Money Sorted' mean to you?", "Success is subjective.", "How do you define
yours?", "Get started.", "Get going.", "Get sorted."). Opens "Macleod Accounting - Accountancy Services
for Ambitious Business Owners. Get Money Sorted." An "ADHD Accountant" service appears as a category
with **no content behind it on the fetched page**. No medical or diagnostic language on the homepage,
which is the one thing it gets right. One em-dash. Ranks for zero family keywords.

**Read of the field:** these brands compete on positioning and referral, not on published substance.
That is a warning as much as an opening: an empathy-positioned page with no content would be exactly
the same thing with our name on it.

## 5. Whitespace

- **Substance.** Nobody in this field has published the actual systems content. The page wins by being
  useful, not by being understanding.
- **Deadlines as the spine**, because missed deadlines and penalties are the concrete, expensive
  version of the problem: 5 October registration, 31 January filing and payment, 31 July payment on
  account, VAT quarters, the late-filing and late-payment penalty machinery stated in figures.
- **MTD for Income Tax as a systems change, not a threat**: quarterly updates are more deadlines, and
  the page says plainly what that means for someone who finds deadlines the hard part.
- **Reasonable adjustments signposted to gov.uk**, which the field does not do.
- A recomputable worked example of what a late return actually costs, at current penalty figures.

## 6. Fences (binding — allowed and never lists, verbatim in substance)

**Allowed:** business systems, record-keeping routines, deadlines, MTD readiness, working with an
accountant so fewer things depend on the owner remembering, and signposting to gov.uk reasonable
adjustment and Access to Work pages.

**Never:**
- **No diagnostic or medical framing.** No "signs you have ADHD", no symptom lists, no "if you struggle
  with executive function", no self-assessment quizzes of any kind, no treatment content.
- **No benefit-eligibility content and no help with, or referral for, disability-benefit claims.** Not
  a sentence, not a link to a claims service. Signposting to gov.uk's own reasonable-adjustment and
  Access to Work pages is permitted; anything that reads as helping with a claim is not.
- **No "neurodivergent discount", no vulnerability-targeted urgency, no fear framing** about penalties
  or HMRC.
- No speaking on behalf of neurodivergent people, no first-person claims of lived experience, no
  statistics about neurodivergence.
- **Accessibility of the page itself is part of the position:** short sentences, one idea per
  paragraph, clear structure, no long unbroken blocks, no jargon without a plain-word gloss.
- No em-dashes. **No house-position section numbers in reader copy** (report only; trades leaked 71).
- Rate-date discipline per language spec §2 on every figure, including penalty amounts.

## 7. Acceptance criteria (deterministic)

1. Questions answerable: what happens if I miss the filing deadline; what does it cost; how do I stop
   deadlines being the thing I have to remember; what records do I actually have to keep; what does MTD
   change; can I ask HMRC for adjustments.
2. Friction-and-fix pairs in the opening 40%: at least three, each one concrete problem and one
   concrete system, no diagnosis language in any of them.
3. Figures, recomputable and date-tagged: 5 October registration; 31 January filing and payment;
   31 July payment on account; the late-filing penalty ladder and the late-payment penalty machinery;
   MTD £50,000 April 2026, £30,000 April 2027, £20,000 April 2028; VAT registration £90,000.
4. One worked example: a business owner (unused persona name and unused city per language spec §4)
   filing three months late, the penalty and interest computed and re-derivable.
5. Minimum 10 FAQ pairs.
6. **Fence grep, deterministic:** zero occurrences of diagnosis, diagnosed, symptoms, executive
   function, medication, treatment, PIP, disability benefit, Access to Work claim help, "do you
   struggle with". Adversarial QA fails the page on any hit and reads the whole page against the
   allowed and never lists sentence by sentence.
7. Readability check: no paragraph over four sentences, no sentence over 25 words.
8. Links: core self-assessment page, core MTD page, gov.uk reasonable adjustments, gov.uk Access to
   Work (informational signpost only). Resolver-clean, 0 invented slugs. §4 floors + coverage floor
   pass.

## 8. Expectation

**Zero assigned volume; coverage, not a bet.** Five boutique brands sustain themselves in this space on
referral, so search is not how the audience currently arrives. Realistic outcome: long-tail impressions
on deadline and systems phrasings, and a page that is genuinely useful to anyone who lands on it.
Maturity caveat: net-new with no demand baseline, judge at 90d Google on whether any impression
appears. Failure trigger, written before the build: zero impressions of any kind at 180d = no further
page in this row. **Second failure mode, separate and more important:** any fence breach found in QA is
a hard stop on the page, not a fix-and-ship, because the C1 risk here is regulatory and reputational
rather than ranking.
