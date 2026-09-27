# Editorial and claims QA (Track B) - charities `/for/cics`

File: `docs/charities/_wave1/cics.json`. Reviewed 2026-09-27.
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` S4a ("QA", "Writers").
Track A: PASS (`cics.factual.md`). No figure, rate, date or rule was changed here.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | PASS. Intro is 147 words. The answer lands by word 50: a CIC is not a charity, pays corporation tax, no Gift Aid, no charitable rate relief |
| 2 | 800 to 1,200 words across intro, challenges, howWeHelp, faqs, titles and questions included | PASS. 1,199 |
| 3 | AI tells and sameness | PASS after edit 2. See notes |
| 4 | Thin or padded sections, FAQ answers restating the question, 40 to 120 words | PASS. FAQ answers 64, 64, 76, 80, 70, 69. None opens by restating its question |
| 5 | Banned claims (case-insensitive) | PASS. See notes on two allowed hits |
| 6 | Em-dashes, British English, current rules | PASS. No em-dash or en-dash. No US spellings. 2026/27 figures lead |
| 7 | `metaTitle` <= 60, `metaDescription` <= 160 | PASS. 51 and 160 |
| 8 | Internal links, max five, relative, exist on disk, `<a href>` anchors | PASS. Exactly five, all relative anchors, all five target files exist |
| 9 | Pipeline leakage | PASS. No house-position numbers, wave labels, flags or agent wording in rendered fields. `sources` is not rendered by the template |

### Banned-claim scan, the two hits and why they stand

- **"regulated"** - "A CIC is regulated by the Office of the Regulator of Community Interest
  Companies". This describes the reader's own entity, not the firm. No firm regulatory claim
  anywhere on the page. Stands.
- **"fee"** - "A filing fee applies", twice, about the Companies House CIC34 fee. Not our
  pricing, and deliberately no figure (Track A open flag 2). Stands.
- Not present at all: chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants",
  "our team", award, personal names, any price or fee of ours, any turnaround promise, and
  "advice" or "advise" in any form. The page uses "a specialist reviews", matching the siblings.

### Internal links

| Link | File on disk |
|---|---|
| `/blog/cics-and-social-enterprises/cic34-form-guide` | `charities/web/content/blog/cic34-form-guide.md` |
| `/blog/cics-and-social-enterprises/orcic-cic-regulator-explained` | exists |
| `/blog/cics-and-social-enterprises/cic-funding-and-grants` | exists |
| `/blog/cics-and-social-enterprises/cic-vs-charity` | exists |
| `/guides/cic-complete-guide` | `charities/web/content/guides/cic-complete-guide.md` |

At the cap of five. Do not add a sixth without removing one.

### Sameness

Checked against the other six `docs/charities/_wave1/*.json` and the live rows in
`charities/web/src/data/charity-types.ts`.

- No stock opener. No "You get A, B and C" intro closer on this page or any sibling.
- No listicle rhythm: challenge bodies run 55 to 80 words with varied sentence shapes, and the
  four `howWeHelp` items are not parallel-clause clones.
- Intro openers across the seven wave-1 pages: five second-person, two third-person. Two begin
  "You run" (this page and `small-charities`), but the second clause diverges immediately and
  the subject matter does not overlap. Left alone; it reads as house voice, not a tell.
- Intro closers were the one real sameness risk. Six siblings close on substance; this page
  closed on a CTA ("Tell us where your year end sits and a specialist picks it up"), the only
  pitch closer in the set. Fixed, edit 2.
- Overlap with the live `social-enterprises` row is acceptable: that row is structure-agnostic
  and covers the CIC only as one option among four, while this page is the CIC compliance and
  payout page. No sentence is shared.

### Observed, not defects

- `howWeHelp` item 3 ("Payout options set out against the cap") is 30 words against 40 to 50
  for its three siblings. Terse but complete and not padded. Expanding it would push the page
  past 1,200. Left as written.
- `metaDescription` is exactly at the 160 limit. Any future wording change must be re-measured.

### Suspected errors passed up, not changed

None. No figure, rate, date or rule on the page looked wrong on an editorial read, and Track A
cleared all twenty assertions.

## Edit log

| # | Location | Before | After | Why |
|---|---|---|---|---|
| 1 | `intro` | "recognised correctly though none of it carries" | "recognised correctly, though none of it carries" | Missing comma before a trailing concessive clause. Punctuation only |
| 2 | `intro`, final sentence | "Tell us where your year end sits and a specialist picks it up." | "Accounts and the CIC34 fall due together, so the year end sets the timetable." | Removed the only CTA-shaped intro closer in the wave, replaced with substance already established on the page and in Track A. No new figure or rule |

Two edits. Both editorial. JSON re-parsed clean after both.

## Result

- Final word count: **1,199** (intro, challenges, howWeHelp, faqs, titles and questions included)
- `metaTitle`: **51** characters. `metaDescription`: **160** characters
- Internal links: **5** of a maximum 5, all resolving on disk
- JSON parses

VERDICT: PASS
