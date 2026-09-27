# Wave 1 editorial sweep, seven charities audience pages

Date: 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a.
Model report: `docs/property/_wave1/qa/_wave_sweep.md`.
Scope: the seven `docs/charities/_wave1/*.json` files only. No commit, no database, no code.
Live rows read for comparison: `charities/web/src/data/charity-types.ts` (2 rows) and
`charity-services.ts` (5 rows). No figure, rate, date or rule was changed on any page.

## What changed, per page

| Page | Change |
|---|---|
| charity-payroll-and-pensions | Intro closer off the "Below is what X, and Y" construction shared with small-charities. Now "What a first hire triggers, and what it costs, follows." |
| charity-registration | Intro opener off the "You <verb>" construction (four of seven pages opened that way). Now "Money came in for a cause first, and the paperwork has caught up since." FAQ 2 reworded off "can hold property and sign contracts in its own name" (shared with cios). |
| cics | Intro opener off "You run ..." (shared with small-charities). Now "Company rules, not charity rules, govern a CIC's money, and the first question is what it owes." |
| cios | FAQ 2 scrutiny sentence restructured off "External scrutiny starts once gross income ..." (that construction ran on four of seven). FAQ 5 reworded off the shared "hold property and sign contracts in its own name". Annual-return banding sentence reworded. |
| grant-making-trusts-and-foundations | Intro opener off "You hold an endowment, you invest it, and you give the income away", merged with the following sentence. FAQ 7 scrutiny sentence reworded. Annual-return banding sentence reworded (second pass, after the first rewrite collided with cios). |
| small-charities | `challenges0` scrutiny sentence reworded off "External scrutiny starts once gross income passes" and off the "and for accounting years ending ..." run shared with grant-making. |
| trustees-and-treasurers | Intro: "Every charity files an annual return within 10 months of its year end" reworded (shared with small-charities). `challenges2` annual-return banding reworded twice to clear registration and grant-making. `howWeHelp3`: "an independent examiner from the partner network" reduced to "an independent examiner" (tracked opener phrase, and the only partner-network mention in a body). |

### Consent sentence

The live consent wording (`PARTNER_NETWORK_SENTENCE`, "your details may be shared with a firm
from our specialist partner network ...") does not appear in any of the seven row bodies,
before or after the sweep. The template renders it. PASS with no edit required. The only
partner-network reference in a body was the descriptive phrase in
`trustees-and-treasurers.howWeHelp3`, which is a tracked opener, not the consent sentence; it
was removed anyway.

### Repeated openers

Counted across all `challenges` and `howWeHelp` bodies on the seven pages.

| Opener | Before | After |
|---|---:|---:|
| "A specialist reviews" | 1 (cics `howWeHelp1`) | 1 |
| "Your accountant prepares" | 2 (cics `howWeHelp0`, trustees `howWeHelp1`) | 2 |
| "an independent examiner from the partner network" | 1 (trustees `howWeHelp3`) | 0 |

No page has two consecutive items with the same opener, and no opener runs on more than half
the set (the bar is four pages). No edit was needed on this criterion.

### Link syntax and targets

Every internal link in every body string is `<a href="/path">text</a>`. Zero bare paths, zero
anchors with any other attribute order, zero external links in bodies. 24 distinct hrefs, 34
anchors in total, all resolved on disk:

- 13 blog hrefs against `charities/web/content/blog/<slug>.md` with the frontmatter category
  slugified by `charities/web/src/lib/blog.ts:slugifyCategory` (lowercase, brackets and commas
  stripped, `&` to `and`, spaces to hyphens),
- 5 guide hrefs against `charities/web/content/guides/<slug>.md` (of the 8 that exist),
- 2 calculator hrefs against the `slug` field in `charities/web/src/lib/calculators/tools/`
  (`gift-aid-calculator`, `independent-examination-vs-audit-checker`),
- 3 service hrefs against `charity-services.ts` (`charity-accounts`, `charity-bookkeeping`,
  `independent-examination`),
- 1 `for` href, `/for/cics`, against `charity-types.ts`; it points at the row this wave
  replaces, so it stays valid after integration.

No broken target.

## Placement

| Row | Belongs under | Reason | Integrator note |
|---|---|---|---|
| cics | `/for/` | audience: the person running a CIC's money | replaces the live `cics` row in `charity-types.ts` |
| cios | `/for/` | audience: CIO trustees | append to `charity-types.ts` |
| small-charities | `/for/` | audience: a charity below the examination threshold | append to `charity-types.ts` |
| trustees-and-treasurers | `/for/` | audience: the person who keeps the books | append to `charity-types.ts` |
| grant-making-trusts-and-foundations | `/for/` | audience: endowed grant-makers | append to `charity-types.ts` |
| charity-registration | `/services/` | a service: getting a charity registered and HMRC-recognised | append to `charity-services.ts` |
| charity-payroll-and-pensions | `/services/` | a service: payroll and automatic enrolment | append to `charity-services.ts` |

That is five rows into `charity-types.ts` (four appended, `cics` replacing) and two appended to
`charity-services.ts`, which matches the brief's six-appended-plus-`cics` count.

**Shape difference: none.** `CharityService` and `CharityType` declare an identical field set
(`slug, title, headline, metaTitle, metaDescription, intro, stats[], challenges[], howWeHelp[],
faqs[]`), and both routes (`src/app/for/[slug]/page.tsx`, `src/app/services/[slug]/page.tsx`)
read them the same way through `generateStaticParams` and `getCharityService` /
`getCharityType`. The integrator maps nothing: the two service rows are appended verbatim to
`charityServices` and the type annotation changes only in name. The only thing to watch is that
the two service rows get `/services/<slug>` canonicals and sitemap entries from the services
route, not the `for` route, which falls out of the file they land in.

## Sameness scan

Method: all 8-word sequences across `intro`, `challenges`, `howWeHelp` and `faqs` (titles and
questions included), tags stripped, lower-cased, punctuation and currency symbols dropped,
compared for all 21 page pairs and against both live data files.

Excluded as shared-by-design (statutory wording, thresholds and proper names): the
examination and audit threshold recital (£25,000 / £40,000, £1m / £1.5m, £250,000 / £500,000,
gross assets £3.26m / £5m), "for accounting years ending on or after 30 September 2026",
"periods beginning on or after 1 January 2026", the receipts-and-payments £250,000 boundary and
"statement of assets and liabilities", "the professional bodies listed in / named in the
Charities Act", "annual return within 10 months", the £5,000 secondary threshold for 2026/27,
"Office of the Regulator of Community Interest Companies" and "community interest report".

Before the sweep, six pairs exceeded two shared sequences (plus three more created and then
cleared during the sweep itself):

| Pair | Shared | Cause | Fix |
|---|---:|---|---|
| charity-registration / cios | 3 | "can hold property and sign contracts in its own name" in both FAQ answers | reworded on both |
| cios / grant-making | 4 | "external scrutiny starts once gross income exceeds" plus the annual-return banding | both reworded on cios and grant-making |
| cios / trustees | 3 | annual-return banding, identical construction | reworded on cios and trustees |
| grant-making / trustees | 4 | annual-return banding, "above £25,000 the trustees' annual report and accounts are attached" | grant-making reworded |
| grant-making / small-charities | 3 | "above £25,000 of gross income, and for accounting years ending ..." | small-charities reworded |
| charity-registration / trustees | 4 | "reports income and spending only, between £10,000 and £25,000" | trustees reworded twice |

After the sweep: **no pair shares more than two 8-word sequences.** Highest remaining pair is 2
(charity-registration / cios, charity-registration / small-charities, small-charities /
trustees), all statutory-adjacent residue inside the allowance.

Against the live rows: six of the seven share zero sequences with either live file. `cics`
shares eight with the live `charity-types.ts` `cics` row only (corporation tax "in the same way
as any other limited company", the CIC34 "describe activities carried out for community
benefit", the ORCIC name). That row is the one this page replaces, so the overlap disappears on
integration; zero against `social-enterprises` and zero against every `charity-services.ts` row.

## Invariants after the sweep

Words count `intro` + `challenges` + `howWeHelp` + `faqs`, including section titles and FAQ
questions, with HTML tags removed.

| Page | Words | metaTitle | metaDescription | Em-dash | Banned claims | Anchors | JSON |
|---|---:|---:|---:|---|---|---:|---|
| charity-payroll-and-pensions | 1198 | 38 | 152 | none | none | 3 | parses |
| charity-registration | 1200 | 45 | 152 | none | none | 5 | parses |
| cics | 1198 | 51 | 160 | none | "regulated" (statutory) | 5 | parses |
| cios | 1192 | 49 | 138 | none | none | 5 | parses |
| grant-making-trusts-and-foundations | 1194 | 46 | 149 | none | "award" (grant awards) | 4 | parses |
| small-charities | 1199 | 45 | 138 | none | none | 5 | parses |
| trustees-and-treasurers | 1174 | 46 | 142 | none | none | 5 | parses |

Bands: words 800 to 1,200, `metaTitle` ≤ 60, `metaDescription` ≤ 160. All inside. Five of the
seven sit within 10 words of the ceiling, which is why three of the sameness rewrites were
written shorter than the text they replaced; any future extension to these pages has to take
words out first.

Two banned-list hits are allowed under the spec's own carve-outs and were checked in context:

- `cics`: "A CIC is regulated by the Office of the Regulator of Community Interest Companies"
  is the statutory regulator statement, which the rule exempts. The second occurrence is in the
  `sources` array, which the template does not render.
- `grant-making`: every "award" is a grant award ("Awarding a grant and paying it are different
  events", "Award letters decide this"), never an accolade.

Checked and clean on all seven: chartered, ICAEW, ACCA, CIOT, "our accountants", "we are
accountants", "our team", "advice", "advise", "advis-", personal names, prices. Every £ figure
on these pages is a statutory threshold or a statutory allowance, not a price.

VERDICT: READY
