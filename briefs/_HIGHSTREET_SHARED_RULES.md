# High-street mechanic program: rules shared by every writer on both sites

Read this, then your site's `_WORKER_RULES.md`, then your brief. Where they disagree,
the brief wins on scope and this file wins on method.

Program doc: `docs/_engines/HIGHSTREET_MECHANIC_PROGRAM.md`. Engine: `docs/_engines/NETNEW_PROGRAM.md`.

## THE COVERS ARRAY: the rule that makes this program work (READ TWICE)

Your brief has a section headed **Target queries (REQUIRED PHRASINGS, NOT SUGGESTIONS)**.
It lists the exact phrasings this page must own. They are not keyword suggestions and they
are not optional.

**Why.** This whole program rests on one measured finding: Google returns substantially the
same results for these phrasings, so they are one question wearing different words. Page
splits were decided by fetching a live SERP for every candidate and merging any two that
shared four or more of the top ten results. "vat on second hand cars" against "vat on used
cars" shared 6 of 10. "vat on takeaway food" against "vat on hot food" shared 7 of 10 with
an identical top result. One page that answers all of them ranks for all of them.

**What this means for you.**
1. Every phrasing in that list must appear naturally somewhere in the page, in a heading,
   in body prose, or in an FAQ question. Naturally: in a sentence a person would write.
   Not stuffed, not listed, not a keyword block.
2. **You may not split one out into its own page.** If you find yourself thinking "hot food
   really deserves its own page", you are wrong, and acting on it would put two of our URLs
   into one result set. That is cannibalisation and the house rule forbids it. If you
   genuinely believe a phrasing does not belong, RAISE A FLAG in the Q&A file and keep
   writing. Do not decide it yourself.
3. The FAQ block is where the leftover phrasings live. Answer them in the words people
   actually typed, not in tidied-up versions of those words.

## PAGE ANATOMY: how one page carries nine questions

Follow this order. It is not a suggestion; it is what makes the covers rule work.

| Section | What goes in it |
|---|---|
| H1 | The dominant phrasing **verbatim**. Not a cleverer version of it. |
| First 60 words | The answer, before any preamble. Someone who reads only this leaves correct. This is also the passage a language model lifts when it answers on our behalf. |
| The rule | The actual rule with its statutory source, cited so a reader can check it. |
| **Boundary table** | **This is where the trades live.** Two columns, each trade sitting on its side of the line: a baker's cooling loaf against a baker's hot pasty, a butcher's raw joint against a butcher's hot chicken, a supermarket cold sandwich against a cafe eat-in, pub food against pub takeaway. Done properly, this one table answers hot, cold, takeaway, restaurant, supermarket and pub at a glance. |
| Worked examples | Two or three, with real figures, each named to a trade. A GBP 4.20 hot pasty and its VAT, then the same pasty cold. |
| What people get wrong | The errors HMRC actually challenges. No competitor writes this section. It is the most valuable part of the page. |
| FAQ block | The remaining covered phrasings, answered in the words people typed. 10 to 14 FAQs. |
| Calculator | Only where the answer is genuinely computable. Most pages: none. Your brief says. |
| Links out | Sibling pages in the pillar, and the estate's existing trade pages your brief names. |

**Trades appear in the boundary table and in the worked examples. Never as a list.**
A list of trades is the thin content this whole program was designed to avoid. We measured
it: 157 of 176 trade names have no search demand at all. Nobody is looking for the list.

## BUILD-KILLERS: get these wrong and the whole wave fails to build

These are not style notes. Each one breaks the build or the test suite for every page in
the wave, not just yours.

1. **Quote every frontmatter value that contains a colon followed by a space.**
   `title: VAT on Food: Hot vs Cold` parses as a nested mapping and kills the Next.js build
   with `incomplete explicit mapping pair`. Write `title: "VAT on Food: Hot vs Cold"`.
   This applies to `title, metaTitle, metaDescription, summary, h1, altText, author` and to
   every FAQ `question` and `answer`. When you are done, the conductor runs
   `python scripts/frontmatter_lint.py --check --site <site>`; it exits 1 on any invalid file.
2. **Generalist only: your first prose block must be a plain sentence of 30+ characters.**
   `generalist/web/src/tests/first-sentence.test.ts` runs a guard over the ENTIRE corpus.
   A page that opens on a table, a list, a heading, or a very short line fails the whole
   suite for all 457+ posts. The page anatomy above already asks you to open with the
   answer in prose, so follow it and you are safe. **The boundary table never opens the page.**
3. **No em-dashes anywhere in the body.** Use commas, parentheses, full stops or a middle
   dot. There is a test for this.
4. **Body is RAW HTML below the frontmatter**, not markdown. Use `<p>`, `<h2>`, `<h3>`,
   `<ul><li>`, `<ol><li>`, `<table>`, `<strong>`, `<a href>`. Markdown syntax renders as
   literal text. There is no `body:` frontmatter key.
5. **FAQ count must match.** The number of `faqs:` entries in frontmatter must equal the
   number of FAQs the page presents. Target 10 to 14.
6. **Do NOT "fix" the FAQ accordion.** FAQ answers are deliberately not in the
   pre-hydration HTML; they live in the FAQPage JSON-LD, which is what crawlers read. This
   was changed once and reverted byte-for-byte. It is a closed decision.

## FACTS: where they come from, and the ones that are commonly wrong

Your figures come from your site's `house_positions.md` and, for hospitality,
`rates_ledger.json`. Both were re-verified against primary law on 2026-09-11 and corrected
in commit `babea2de`. The per-anchor detail, with the exact statutory references and the
URLs that were actually fetched, is in:
- `docs/hospitality/STAGE_1B_HP_LOCK_DRAFTS.md`
- `docs/generalist/STAGE_1B_HP_LOCK_DRAFTS_A.md` (exemptions, zero rating, IPT, retail schemes)
- `docs/generalist/STAGE_1B_HP_LOCK_DRAFTS_B.md` (cash basis, motor, household employer)

If your brief flags an HP GAP, do NOT invent a figure. Omit it, describe it qualitatively,
or link the reader to the live gov.uk page.

**Errors that ordinary sources will lead you into. Every one is verified wrong.**

| The common claim | The verified position |
|---|---|
| "The cash basis turnover threshold was raised to £300,000" | **The thresholds were ABOLISHED.** ITTOIA 2005 s.25A and ss.31A-31D are omitted from 6 April 2024 by FA 2024 Sch 10. There is no entry or exit figure at all. |
| Citing BIM70010 for the cash basis | **Stale.** Fetched 2026-09-11 it still says "election" and "£150,000". Never cite it. |
| "A nanny employer can claim the Employment Allowance" | **They cannot.** NICA 2014 s.2(3) excludes liabilities for "personal, family or household affairs". Narrow carve-out only where the nanny solely cares for a person needing care. |
| "Register for PAYE once the employee hits the LEL" | **The trigger is £96 a week**, the secondary threshold. gov.uk: "they're paid £96 or more a week". |
| "Draught relief applies to containers of 20 litres or more" | **Necessary but not sufficient.** It must also be designed to connect to a qualifying dispense system. |
| "Alcohol duty rates run from the start of the tax year" | **They uprate on 1 February.** The current rates took effect 1 Feb 2026 and expire 1 Feb 2027, inside the tax year. |
| "The Tips Act came into force on 1 October 2024" | **The main duties did** (SI 2024/829 reg 3); s.9 commenced 31 July 2023. Say "the main duties". |
| "RHL business rates relief gives you 40% off" | **It ended for new claims on 1 April 2026**, replaced by permanently lower multipliers. There is no 2026/27 cash cap. |
| Citing VAT Notice 718 or 718/1 | **Both withdrawn.** Use the live second-hand vehicle margin scheme guidance. |
| Treating the income tax cash basis and the VAT Cash Accounting Scheme as one thing | **Different regimes.** VAT scheme: £1.35m entry, £1.6m exit. Income tax cash basis: no thresholds at all. |
| "Partial exemption de minimis is a 50% test" | **There are TWO different 50% tests.** De minimis: exempt input tax not over £625/month average AND not over 50% of TOTAL INPUT TAX. The simplified tests use a different 50%: value of EXEMPT SUPPLIES against all supplies. Conflating them is the misapplication the page exists to correct. |

## Scope fences that are locked and not yours to move

- **Generalist pages do not author alcohol duty, duty stamps, Small Producer Relief or
  draught relief.** That is excise ground and belongs to hospitality (generalist HP 21.9.7).
  Ceiling is one neutral sentence plus a gov.uk link, with no rate, threshold or eligibility.
- **Motor pages carry the motor-finance fence** (generalist HP 21.2): no commission or
  mis-selling claims content, no eligibility checkers, no referral to a CMC or law firm.
- **No employment status checker.** HMRC's CEST owns that query and gives an answer HMRC
  stands behind. A page may explain CEST; it may not ship a rival tool.
- **Faceless authority**: no named experts, no invented credentials, no client names or
  counts, no pricing or fee figures in body copy.
- **England is the default.** Flag Scotland, Wales and Northern Ireland explicitly wherever
  the position differs, and note that business rates are devolved.
