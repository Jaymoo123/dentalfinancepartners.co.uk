# §9.5 RESEARCH PACK: /blog/nhs-pension-planning

Built 2026-08-26 from the frozen dossier `docs/medical/cluster_dossier_2026-08-26.md`, the data sheet
generated for this page, and live competitor fetches made the same day. Spec: `docs/_engines/REWRITE_PROGRAM.md`
§9.2 to §9.5, §9.9, §9.10. Ground truth: `docs/medical/house_positions.md`. Peer classification:
`docs/medical/competitor_universe_2026-08-26.md`.

No new DataForSEO calls were made. No file under `Medical/web/` was edited. No commit, no deploy, no
`monitored_pages` write, no monitor or alert created.

---

> # READ THIS BEFORE ANYTHING ELSE
>
> ## THIS PAGE IS NOT A MARKDOWN FILE.
>
> **The writer edits a React server component:**
>
> ```
> Medical/web/src/app/blog/nhs-pension-planning/page.tsx
> ```
>
> There is **no** `content/blog/nhs-pension-planning.md`. There is **no** frontmatter, **no** `metaTitle` key,
> **no** `h1` key, **no** `faqs:` YAML list, **no** `keyTakeaways` list and **no** `summary` field. Anyone who
> globs `Medical/web/content/blog/*.md` will not find this page and will conclude it does not exist. The dossier
> flags exactly this trap at §2: eight `/blog/` pillar hubs are rendered from TSX and "one of them,
> `/blog/nhs-pension-planning`, took a topic in the assignment".
>
> **What that changes in practice, item by item:**
>
> | Markdown pages have | This page has instead |
> |---|---|
> | `metaTitle:` in frontmatter | `metadata.title` in an exported `const metadata: Metadata` object (line 9), **duplicated three more times** in `openGraph.title`, `openGraph.images[0].url` (URL-encoded into the OG image query string) and `twitter.title`, plus once more inside `jsonLd` as `CollectionPage.name`. **Change one, change all five.** |
> | `metaDescription:` | `metadata.description`, duplicated verbatim in `openGraph.description` and `twitter.description`, and referenced by `jsonLd` as `description: metadata.description`. **Three literal copies.** |
> | `h1:` | A literal `<h1 className="...">` inside `<header>`. The ampersand is written `&amp;` in JSX. |
> | `## H2` markdown | `<h2 className="text-2xl font-bold text-[var(--ink)] mb-4">` inside a `<section>`. Each body section is `<section><h2/><p/><p/></section>` inside the `space-y-8` wrapper. |
> | Body paragraphs | `<p className="text-base leading-relaxed text-[var(--ink-soft)]">`. The first `<p>` of a two-paragraph section also carries `mb-4`. |
> | `faqs:` YAML list rendered automatically with FAQPage schema | **Nothing.** There is no FAQ block and no FAQPage schema on this page. Adding one means writing new JSX **and** adding an `FAQPage` node to the existing `jsonLd["@graph"]` array by hand. |
> | Schema emitted by the blog renderer | A hand-written `jsonLd` object (lines 35 to 53) with a `BreadcrumbList` and a `CollectionPage`, injected via `dangerouslySetInnerHTML`. |
>
> **Three things that must keep working after the rewrite:**
>
> 1. `getAllPosts()` and `calculateReadTime` are imported from `@/lib/blog` and the page filters
>    `allPosts.filter((p) => p.category === "NHS Pension Planning")` to render a Related Articles list. **Do not
>    change that category string.** It is the join key to the markdown corpus and changing it silently empties
>    the list.
> 2. `<LeadForm redirectOnSuccess={false} submitLabel="Request Pension Consultation" />` is the page's
>    conversion surface. Keep the component, keep the props. Changing `submitLabel` is allowed; removing the form
>    is not.
> 3. `<Breadcrumb suppressJsonLd ... />` renders the visual breadcrumb while the hand-written `jsonLd` supplies
>    the `BreadcrumbList`. `suppressJsonLd` exists to stop a duplicate. **Do not remove it and do not add a
>    second BreadcrumbList.**
>
> **Verification is a build, not a lint.** After editing, `cd Medical/web && npm run build` must exit 0. A
> markdown page cannot break the build; this one can. Common ways it will: an unescaped `&`, `<` or `>` in JSX
> text, a curly quote inside a `{}` expression, a missing closing tag, or a stray apostrophe in a `className`.
> Write `&amp;`, `&lt;`, `&gt;` and `&apos;` where needed, exactly as the existing file does.

---

## 1. Target and permission level

### The constraint, first

**GRADE = REFRAME. FULL REWRITE PERMITTED.**

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/nhs-pension-planning` |
| Cluster / topic | `how does the nhs pension work` (dossier §3, "Topics with a page of ours") |
| Lane | `nhs_pension` (data sheet); site taxonomy lane 2 `nhs_pension_tax`, described in `competitor_universe_2026-08-26.md` §3 as "the highest-authority contested lane in the niche" |
| Source file | `Medical/web/src/app/blog/nhs-pension-planning/page.tsx` |
| **Rendering** | **TSX pillar hub. A React server component, NOT markdown.** See the block above. |
| Current sha (revert anchor) | `b3d78c97e768645cca480dd350281ffa68c1faf9` (`git rev-parse HEAD`, 2026-08-26) |
| Revert path | `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/src/app/blog/nhs-pension-planning/page.tsx` |

**What MAY change (REFRAME permits all of it):**

- `metadata.title` and its four duplicates (`openGraph.title`, the OG image query string, `twitter.title`,
  `jsonLd` `CollectionPage.name`)
- `metadata.description` and its three duplicates
- The `<h1>`
- Every `<h2>` and every body paragraph
- The section order, the number of sections, and the addition of an FAQ block with matching `FAQPage` schema
- The CTA heading and copy

**What may NOT change:**

- The route, the slug, the canonical (`alternates.canonical` must keep resolving to
  `${siteConfig.url}/blog/nhs-pension-planning`). **No redirect, no URL change, no collapse (§5).**
- The `p.category === "NHS Pension Planning"` filter string
- The `LeadForm` component and its presence
- `suppressJsonLd` on `<Breadcrumb>`
- The existing `BreadcrumbList` structure (Home, Blog, NHS Pension Planning)

**The equity register in section 2 still binds.** REFRAME gives permission to rewrite; it does not give
permission to drop the four queries the page already earns impressions on. See §7.2.

### Frozen-list position

This page is **not** on the frozen list. Batch 1 excludes the **16 pages** carrying an armed `monitored_pages`
window to **2026-09-10** (dossier §6, all `rewrite_date` 2026-06-12), and treats the **3 `status='flagged'`
rows** (`__home`, `gp-accounting-guide`, `nhs-pension-scheme-pays-doctors-deadlines`) as **HOLD**, because a
flagged monitor is a question and not a clearance. Neither list contains this route.

**Cannibalisation warning specific to this page.** The dossier §7 records that our NHS-pension pages compete
with each other across three namespaces, and this page's topic (`how does nhs pension work`) is one where
`/calculators/nhs-pension-scheme-pays` and `/blog/nhs-pension-scheme-pays-doctors-deadlines` **tie at 56.2**.
This hub took the topic on assignment. Per §5 nothing is collapsed; the pages are **differentiated**. The
differentiation rule for this page, which the writer must hold throughout:

> **This hub owns the PRIMER: what the scheme is, how it works, what it costs, what it pays. It does NOT own the
> annual-allowance calculation (that is `/calculators/nhs-pension-annual-allowance` and
> `/medical-guides/nhs-pension-annual-allowance`), the Scheme Pays election (`/calculators/nhs-pension-scheme-pays`
> and `/blog/nhs-pension-scheme-pays-doctors-deadlines`, the latter FLAGGED and on HOLD), the taper worked case
> (`/blog/nhs-pension-tapered-annual-allowance-calculator`, FROZEN to 2026-09-10), the McCloud detail
> (`/blog/mccloud-remedy-nhs-pension-doctors-explained`) or partial retirement
> (`/blog/nhs-pension-partial-retirement-doctors-guide`).** It introduces each in a few sentences and links out.
> The current page's failure is the reverse: it goes deep on annual allowance, McCloud and Scheme Pays and never
> answers "how does the NHS pension work".

**No em-dashes.** The current file contains several (U+2014) in user-facing copy. The rewrite removes every one.

---

## 2. Equity register

*Copied verbatim from the data sheet, including its provenance lines.*

Google, GSC API `searchanalytics.query` dimensions ['page','query'], window 2026-05-28 to 2026-08-26 (90d), property from `sites` config, script `equity_pull.py`.

Google query-level rows for this URL: **0** (impressions 0, clicks 0).
No query-level Google rows. GSC anonymises low-volume queries, so page-level Google impressions can be non-zero while the query breakdown is empty. Check the page-level figure in `gsc_page_rows.json` before concluding zero Google demand.

Bing, `GetPageQueryStats(siteUrl=https://www.medicalaccounts.co.uk, page=/blog/nhs-pension-planning)`, pulled 2026-08-26 via `BingWebmasterClient.get_page_query_stats`. Rows aggregated across the returned date series.

Bing named queries for this URL: **4** | impressions 4 | clicks 0.

| Query | Impr | Clicks | Avg impression pos |
|---|---|---|---|
| typical state pension and nhs pension for physicians in uk | 1 | 0 | 7.0 |
| gp retirement fund over 1 million | 1 | 0 | 3.0 |
| how pension funds will be available for uk medical specialist doctor after 30 years of service | 1 | 0 | 3.0 |
| nhs pension doctors | 1 | 0 | 8.0 |

**Every query in the table above is a DO-NOT-LOSE query. Any one that stops matching after the change is a named BLOCK.**

---

## 3. The market's keyword set

*Copied verbatim from the data sheet, including its provenance lines.*

Source: `dataforseo_competitor_data`, site_key='medical', date_pulled='2026-08-26' (32,872 rows, 27 domains, no volume floor). Selection regex for this topic:

```
how (does|do) (the )?nhs pension (scheme )?work|what is the nhs pension|nhs pension explained|nhs pension scheme guide|is nhs pension (any )?good|nhs pension benefits|nhs pension for beginners|understanding.*nhs pension
```

Keywords in topic: **13** | combined volume **6,770** | peer-winnable volume **4,590** (best position <=10 held by a domain that is not gov.uk / bma.org.uk / *.nhs.uk / MSE / Which) | domains contributing: 3
| **Absent verbatim from this page: 13 of 13. Absent from the whole 105-page corpus: 12.**

Ordered by volume. `On page` = phrase appears verbatim (case and punctuation normalised) in this page's source file. Peer-winnable ORDERS the work, it never excludes any row (owner decision 21, 2026-08-26).

| Vol | Best pos | Held by | Peer-winnable | On page | Anywhere in corpus | Keyword |
|---|---|---|---|---|---|---|
| 1000 | 10 | medicsmoney.co.uk | yes | **no** | no | how does nhs pension scheme work |
| 1000 | 14 | medicsmoney.co.uk | no | **no** | no | how does nhs pension work |
| 1000 | 10 | medicsmoney.co.uk | yes | **no** | no | how does the nhs pension scheme work |
| 1000 | 16 | medicsmoney.co.uk | no | **no** | no | how does the nhs pension work |
| 590 | 7 | medicsmoney.co.uk | yes | **no** | yes | what is the nhs pension |
| 590 | 7 | medicsmoney.co.uk | yes | **no** | no | what is the nhs pension scheme |
| 480 | 10 | medicsmoney.co.uk | yes | **no** | no | nhs pension explained |
| 390 | 7 | medicsmoney.co.uk | yes | **no** | no | what is the nhs pension contribution |
| 320 | 10 | medicsmoney.co.uk | yes | **no** | no | nhs pension benefits |
| 110 | 9 | medicsmoney.co.uk | yes | **no** | no | nhs pension scheme guide |
| 110 | 7 | medicsmoney.co.uk | yes | **no** | no | nhs pension scheme guides |
| 90 | 9 | bma.org.uk | no | **no** | no | understanding nhs pensions |
| 90 | 5 | bma.org.uk | no | **no** | no | what is the nhs pension percentage |

**Reading note.** 4,590 of the 6,770 is peer-winnable and **every peer-winnable row is held by one domain,
medicsmoney.co.uk, at positions 7 to 10**, by a single page (§4.1). That is not an authority wall, it is one
strong peer page sitting at the bottom of page one. The two rows we cannot take are bma.org.uk's. **This is the
highest peer-winnable volume of the three pages in this batch by a factor of two.**

---

## 4. Competitor teardown

All 8 competitor URLs listed at the bottom of the data sheet were fetched on 2026-08-26. **Nothing was capped**
(the 12-URL cap did not bind). Every URL is accounted for; none failed to fetch.

### 4.1 medicsmoney.co.uk: NHS Pension Scheme Guide
`https://medicsmoney.co.uk/nhs-pension-scheme-guide-by-medics-money/`
**Class: PEER** (universe §2a **#1**, "the single strongest peer", 15 of 18 head terms, best position 1).
**Holds all 13 of this topic's keywords.** This one page is the entire peer-winnable prize.

| | |
|---|---|
| Title | `NHS Pension Scheme - Guide by Medics Money` |
| H1 | `NHS Pension Scheme Guide` |
| Word count | ~2,800 |
| Tables | **Yes**, two contribution-rate tables (England, Scotland) |
| Calculator | No |
| FAQ block | **Yes**, an explicit `NHS Pension FAQs` section |

**Full H2/H3 list:**
`How the NHS Pension works` · `What is a pension and why is the NHS Pension different?` · `The NHS Pension is
different to most other pensions – in a good way` · `How does the NHS Pension actually work?` · `How much does it
cost to join the NHS Pension?` · `When can I retire?` · `How can I retire early? Can I buy additional pension?
What's an ERRBO?` · `What is the McCloud judgment and what do doctors need to do about it?` · `NHS Pension FAQs` ·
`I'm a GP. How is my pensionable income calculated?` · `What additional benefits does the NHS Pension give you?` ·
`Should I opt out of the pension?` · `I'm planning to leave the UK – should I join the NHS Pension?` · `What is
pensionable salary?` · `Do I need an accountant or IFA to help with pension problems?` · `I need pension advice –
where can I get it?` · `Is the NHS Pension still a good deal?` · `Do I need an accountant or a financial adviser
for NHS Pension advice?` · `What are the annual checks all doctors need to make on their pension?`

**Covers:** the whole primer. Opens by defining the scheme as `a Defined Benefit (DB) pension which makes it
different to most other pensions available today`, which is **the answer first, in the first sentence, before any
context**. Then cost (with tier tables), retirement timing, early retirement and ERRBO, McCloud, GP pensionable
income, additional benefits, opting out, leaving the UK, and whether it is still a good deal.
**Structure, and this is the lesson:** **19 headings in 2,800 words, and every single one is a question in the
reader's own voice.** Not one is a noun phrase. Ours are all noun phrases. That heading style is why it holds
`how does nhs pension scheme work`, `what is the nhs pension`, `what is the nhs pension contribution` and
`nhs pension explained` simultaneously: the headings **are** the keywords.
**What it omits or gets weaker on:** no employer contribution rate, no worked retirement-income projection, no
early-retirement reduction figures, no annual-allowance or taper mechanics beyond a mention, no Scheme Pays
detail, no lump sum allowance framework, and nothing on the tax consequences of a charge. It is a primer that
stops where the accountant's work starts.
**How we beat it:** match the question-heading structure and the plain-language layer, then keep going into the
tax and certification layer it declines to enter. That is §9.3 exactly: the primer makes the depth findable, and
the depth is what a peer publisher without an accountancy practice cannot follow us into.

### 4.2 bma.org.uk: Pensions
`https://www.bma.org.uk/pay-and-contracts/pensions`
**Class: UNWINNABLE AUTHORITY** (universe §2b, 15 of 18 head terms, "cannot be outranked on brand"). In scope for
vocabulary under owner decision 21. Holds 5 of the 13 keywords.

| | |
|---|---|
| Title / H1 | `Pensions` (identical) |
| Word count | ~1,200 |
| H2/H3 | `Retirement`; `Pensions tax`; `Glossary of pensions terms`; `Additional pensions advice`; `Doctor categories`; `Going on leave`; `In the event of death`; `Leaving the pension scheme`; `2015 NHS pension scheme`; `Non-NHS pension schemes`; `External modelling tools`; `We campaign for you`; `The BMA pensions department`; `Get the latest news and opinion`; `Latest pensions news`; then chrome |
| Tables | No |
| Calculator | No, links external ones |
| FAQ block | No |

**Covers:** it is a **hub of links**, and the closest structural analogue to what our page is supposed to be. Its
top-level taxonomy is the one to study: retirement, pensions tax, glossary, doctor categories, going on leave, in
the event of death, leaving the scheme, the 2015 scheme, non-NHS schemes, modelling tools.
**What it omits:** no projections, no individual benefit calculations, no answers on the hub itself. Every answer
is one click away.
**Two taxonomy gaps of ours it exposes immediately:** `Going on leave` and `In the event of death` are top-level
categories at the BMA and appear nowhere in our NHS-pension structure. The dossier NO-PAGE list corroborates
both: row 15 `nhs pension death in service` (3,490 volume) and row 28 `what happens to my nhs pension when i die`
(730). Also `Glossary of pensions terms` as a first-class hub child, which we do not have anywhere.

### 4.3 practiceindex.co.uk: Explaining the NHS Pension Scheme, Part One
`https://practiceindex.co.uk/gp/blog/explaining-the-nhs-pension-scheme-part-one/`
**Class: PEER** (universe §2a #6). Holds 3 keywords.

| | |
|---|---|
| Title / H1 | `Explaining the NHS Pension Scheme – Part One` (identical) |
| Word count | ~2,100 |
| H2/H3 | `Association of Independent Specialist Medical Accountants nine-part tutorial for Practice Index – Introduction`; `Note:`; `Part 1: Overview`; `Updates post-Budget 2023`; `Is the NHS Pension Scheme a good scheme?`; `What benefits does the scheme provide?`; `The three parts: 1995, 2008 and 2015`; `So what are the differences? Some key points`; then chrome |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** part one of a **nine-part AISMA tutorial**. Defines the scheme as defined benefit, lists ancillary
benefits (death in service, ill-health retirement), and walks the three sections with their differing normal
retirement ages.
**What it gets wrong or omits:** `Updates post-Budget 2023` is a three-year-old currency marker still sitting in
the headings, which is the staleness pattern our rewrite must not reproduce. No calculation method, no
contribution rates, no McCloud (deferred to later parts).
**Note the authorship:** AISMA wrote it. AISMA is the specialist medical accountants' association and per
universe §2b is "a citation and membership target, not a rank target". Nine parts on a third-party publisher's
blog is a **fragmented** treatment: nobody searching "nhs pension explained" wants part one of nine.

### 4.4 bma.org.uk: NHS pension contribution rates
`https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/nhs-pension-contribution-rates`
**Class: UNWINNABLE AUTHORITY.** Holds 3 keywords including `what is the nhs pension percentage` at **position 5**.

| | |
|---|---|
| Title / H1 | `NHS pension contribution rates` (identical) |
| Word count | ~1,200 |
| H2/H3 | `Employer contribution rates from 1 April 2024`; `From 1 April 2025 the contributions will be:`; `In England`; `In Northern Ireland`; `In Scotland`; `Pension contributions and tax`; `Part-time doctors` |
| Tables | **Yes** |
| Calculator | No |
| FAQ block | No |

**Covers:** the tiered member contribution bands by UK nation, plus the employer rate. Fetched values:
England and Wales **from 1 April 2025**, up to £13,259 at 5.2%, £13,260 to £27,797 at 6.5%, £27,798 to £33,868 at
8.3%, £33,869 to £50,845 at 9.8%, £50,846 to £65,190 at 10.7%, £65,191 and above at 12.5%. Employer rate stated
as `England and Wales is 23.7%` from 1 April 2024. Northern Ireland bands given separately.
**IMPORTANT, and this is a live currency finding.** Those England and Wales bands are the **2025/26** bands.
`house_positions.md` §2.C, verified at NHS Employers on 2026-08-26, records that the bands were **uplifted on
1 April 2026** and gives the 2026/27 table: up to £13,259 at 5.2%, £13,260 to £28,854 at 6.5%, £28,855 to
£35,155 at 8.3%, £35,156 to £52,778 at 9.8%, £52,779 to £67,668 at 10.7%, £67,669 and above at 12.5%. **The
rates are unchanged; only the bands moved.** So the BMA page, as fetched today, is showing last year's bands at
position 5 for a 90-volume term. **Use the house-position 2026/27 table, not the BMA's.** Employer 23.7% is
corroborated by both and is safe.
**What it omits:** nothing on how the scheme works, what it pays or why the tier matters.

### 4.5 bma.org.uk: About the 2015 NHS pension scheme
`https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/about-the-2015-nhs-pension-scheme`
**Class: UNWINNABLE AUTHORITY.** Holds 2 keywords.

| | |
|---|---|
| Title / H1 | `About the 2015 NHS pension scheme` (identical) |
| Word count | ~1,200 |
| H2/H3 | `Career average revalued earnings (CARE)`; `CARE in practice`; `Increase in normal pension age`; `Hugo`; `Kellie`; `Moussa`; `Beatrice` |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** CARE versus final salary, normal pension age tracking State Pension Age, and **four named member
scenarios** (Hugo, Kellie, Moussa, Beatrice) covering different career paths through the transition and McCloud.
States `The accrual rate in the 2015 scheme is 1/54 (equivalent to 1.85%)` and `The active revaluation rate is
the Consumer Prices Index (CPI) plus 1.5%`. **Both corroborate `house_positions.md` §2 exactly.**
**The device worth taking:** named worked personas as H3s. Four people, four situations, four answers. It is the
most readable treatment of the transition anywhere in the set and it is a structure, not a fact, so it is free to
copy.
**What it omits:** contribution rates, tax, survivor benefits.

### 4.6 bma.org.uk: Transferring money out of the NHS pension scheme
`https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/transferring-money-out-of-the-nhs-pension-scheme`
**Class: UNWINNABLE AUTHORITY.** Holds 2 keywords.

| | |
|---|---|
| Title / H1 | `Transferring money out of the NHS pension scheme` (identical) |
| Word count | ~2,100 |
| H2/H3 | `Transferring benefits out of the NHS pension scheme`; `Moving to a different UK nation`; `Transferring your NHS pension abroad`; `Time limits`; `How to apply for a transfer out`; `Public Sector Transfer Club`; `If you have missed the time limit`; `Transferring out to a Non-Club scheme`; `Annual Allowance`; `NHS Pension Scheme Additional Voluntary Contribution (AVC) plan`; `Refund of contributions` |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** transfers out, moving between UK nations, transfers abroad, the Public Sector Transfer Club, time
limits, AVCs and refunds of contributions.
**What it omits:** everything about how the scheme works.
**Relevance to us:** low as ground, high as vocabulary. `Refund of contributions` maps to dossier NO-PAGE row 14
(`nhs pension refund form (RF12)`, 3,600 volume) and `AVC` maps to the dossier's `avcs / additional pension`
topic (5,390 volume, currently assigned to `/nhs-pension`). Both are signposts from this hub, not sections on it.

### 4.7 practiceindex.co.uk: Explaining the NHS Pension Scheme, Part Three
`https://practiceindex.co.uk/gp/blog/explaining-the-nhs-pension-scheme-part-three/`
**Class: PEER.** Holds 1 keyword.

| | |
|---|---|
| Title / H1 | `Explaining the NHS Pension Scheme – Part Three` (identical) |
| Word count | ~2,100 |
| H2/H3 | `Part 3: Contribution rates and employer costs`; `Employer contribution`; `Member contribution`; `Tax relief` |
| Tables | **Yes**, four (rates by region and earnings tier) |
| Calculator | No |
| FAQ block | No |

**Covers:** contribution structure. States employer contributions at roughly **20 to 22.5% depending on region**
and explains the October 2022 change to basing contributions on actual pay rather than whole-time equivalent.
**Flag:** the 20 to 22.5% employer figure **conflicts with the 23.7% in `house_positions.md` §2.C and in the BMA
page at 4.4**. The house position is verified at NHS Employers on 2026-08-26 and is the one to use. This is a
stale competitor figure, not a devolved-variant nuance, and it is recorded here so nobody harmonises toward it.
**What it omits:** accrual, retirement age, benefits, how to join.

### 4.8 practiceindex.co.uk: Explaining the NHS Pension Scheme, A guide
`https://practiceindex.co.uk/gp/blog/explaining-the-nhs-pension-scheme-a-guide/`
**Class: PEER.** Holds 1 keyword.

| | |
|---|---|
| Title / H1 | `Explaining the NHS Pension Scheme – A guide` (identical) |
| Word count | ~1,200, but only a few hundred are content |
| H2/H3 | `Explaining the NHS Pension Scheme – A guide`; `Rating`; then chrome (`Related Posts`, `Recent Blog Posts`, `Recent Blog Comments`, `Social Media`, `Tag Cloud`, `Company`, `Our services`) |
| Tables | No |
| Calculator | No |
| FAQ block | No |

**Covers:** almost nothing. It is a **download gate** for a PDF consolidating the nine-part AISMA tutorial.
**What it gets wrong:** the entire answer is behind a PDF. A page ranking on `nhs pension scheme guide` that
contains no guide is the weakest competitor surface in the set and it demonstrates how little on-page substance
is required to hold these terms today.

### 4.9 Union of competitor heading themes minus ours = THE COVERAGE CHECKLIST

§9.9 floor 8 requires **zero undecided themes**. It is zero: 24 themes, 24 decisions.

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | What a defined benefit pension is, and why the NHS one differs from a pot (4.1, 4.3) | **COVER, and lead with it** | The single highest-volume intent. Answer-first, in the opening sentence, before any context. Our page currently opens with "one of the most valuable benefits... yet also one of the most complex", which answers nothing. |
| 2 | How the scheme actually works: accrual, revaluation, what you get per year of service (4.1, 4.5) | **COVER** | House position §2: 2015 CARE **1/54th**, active revaluation **CPI + 1.5%**. The current page states CARE and CPI+1.5% but **never states 1/54th**. Stating it is mandatory. |
| 3 | The three sections and their differences (4.1, 4.3, 4.5) | **COVER** | §2: 1995 final salary 1/80th plus automatic 3x lump sum, NPA 60; 2008 final salary 1/60th, no automatic lump sum, NPA 65; 2015 CARE 1/54th, NPA = State Pension Age or 65 if later. All active members in 2015 from 1 April 2022. The current page gives 1/80th and 1/60th but no NPAs and no 1/54th. |
| 4 | **What it costs to join: member contribution tiers** (4.1, 4.4, 4.7) | **COVER, this is the biggest gap** | `what is the nhs pension contribution` (390) and `what is the nhs pension percentage` (90) are peer-held at position 5 to 7 and our page has **no contribution content at all**. Use the **2026/27** band table from §2.C, date-tagged, with the in-year-revision caveat. |
| 5 | Employer contribution rate (4.4, 4.7) | **COVER, one line** | 23.7% of pensionable pay per §2.C, re-set for four years from 1 April 2027 by the 2024 valuation. Do NOT use practiceindex's 20 to 22.5% (4.7). |
| 6 | Tax relief on member contributions (4.7) | **COVER, one line** | Contributions attract income-tax relief; the tier is on pensionable pay, not total taxable income (§2.C). |
| 7 | When can I retire, normal pension age (4.1, 4.5) | **COVER** | NPAs per theme 3; minimum pension age **55** per §2.E. |
| 8 | Early retirement, actuarial reduction, ERRBO (4.1) | **COVER, briefly, then link** | §2.E: lock the PRINCIPLE (permanent actuarial reduction, NHSBSA/GAD-set factors) and **do NOT lock a percentage**. ERRBO named. Deep treatment belongs to `/blog/nhs-pension-partial-retirement-doctors-guide`. |
| 9 | Partial retirement / flexible retirement (current page has it) | **COVER, corrected** | §2.E: from **1 October 2023**, draw **20% to 100%** in up to **two events**, continue working and re-accrue in the 2015 scheme, provided pensionable pay or commitment reduces by **at least 10% for the first 12 months**. The current page says "available since 2023" and omits every condition. |
| 10 | McCloud remedy (4.1, 4.5, current page) | **COVER, corrected, then link** | See §6 for what the current page gets wrong. Two or three sentences, then link `/blog/mccloud-remedy-nhs-pension-doctors-explained`. |
| 11 | Annual allowance and taper (current page) | **COVER, shortened, then link** | Hub altitude only. The taper condition must be stated in full (see §6). Deep treatment is the calculator and guide pages. |
| 12 | Scheme Pays (current page) | **COVER, corrected, then link** | The current statement of the mandatory test is **wrong** (see §6). Correct it, then link out. |
| 13 | LTA abolition, LSA and LSDBA (current page) | **COVER, completed** | §2.B: LTA abolished 6 April 2024, replaced by **LSA £268,275** and **LSDBA £1,073,100**. The current page gives LSA and omits LSDBA entirely. |
| 14 | **Additional benefits: death in service, ill-health retirement, survivor benefits** (4.1, 4.2, 4.3) | **COVER as a named section, then link** | `nhs pension benefits` is 320 volume, peer-winnable at position 10, and our page has nothing. BMA gives `In the event of death` a top-level hub slot. Dossier NO-PAGE rows 15, 22 and 28 corroborate. Hub-level summary; the detail is prescribed to `/nhs-pension`. |
| 15 | **Is the NHS pension a good deal / should I opt out** (4.1, 4.3) | **COVER as a named section, then link** | Dossier §4 row 2 `is the nhs pension scheme good` is **3,250 volume, 3,210 peer-winnable**, prescribed to `/calculators/nhs-pension-scheme-pays`, and row 11 `pension opt out` is 20,260 volume with zero peer-winnable. A hub that does not answer "is it worth it" is not a hub. Answer it here in one section and link the deeper page. |
| 16 | **How a GP's pensionable income is calculated, Type 1 / Type 2 / Locum A and B** (4.1) | **COVER as signposting only** | §2.C is the most important cross-link on this site. Name the three routes and the deadlines (**28 February a year in arrears**; locums **10 weeks**), then link. `/blog/nhs-pension-for-locums-form-a-form-b` is **FROZEN to 2026-09-10**, so link to its live URL and change nothing there. |
| 17 | **The incorporation trap: dividends are not pensionable** (nobody covers it) | **COVER** | §2.C: a limited company cannot hold a GMS/PMS contract and company income is not NHS-pensionable; for a consultant only the NHS post is pensionable. **No competitor in the set states this.** See §5. |
| 18 | AVCs and Added Pension (4.1, 4.6) | **COVER, one line, then link** | §2.C: MPAVCs are a separate DC pot; Added Pension is extra DB accrual in-scheme; both get tax relief subject to the annual allowance. Deeper treatment is `/nhs-pension` (dossier `avcs / additional pension`, 5,390 volume). |
| 19 | Transfers out, Public Sector Transfer Club, transferring abroad (4.6) | **DECLINE** | Not an accounting decision and not in our lane. Named so the decline is recorded. |
| 20 | Refund of contributions / RF12 (4.6) | ELSEWHERE | Dossier NO-PAGE row 14, prescribed to `/blog/nhs-pension-for-locums-form-a-form-b`, which is FROZEN. Link only. |
| 21 | Going on leave (maternity, sickness, career break) (4.2) | ELSEWHERE | Dossier NO-PAGE row 12 (`how much is maternity allowance`, 9,490) is a separate new page. Not this hub. |
| 22 | Leaving the scheme / opting out mechanics (4.2, 4.6) | ELSEWHERE | Dossier NO-PAGE row 11, 20,260 volume, prescribed as a new page. This hub links to it once it exists; today it links to nothing for it, which is a stated gap. |
| 23 | Glossary of pension terms (4.2) | **DECLINE for this pass** | A genuinely good idea and a real gap (BMA gives it a top-level slot, we have nothing). It is a separate asset, not a section, and adding it here would change the page's shape mid-measurement. Named as a **delta** for a later pass per §9.8. |
| 24 | Contribution basis: actual pay not whole-time equivalent since October 2022 (4.7) | **COVER, one line** | Verify at NHS Employers before stating; it is not in house positions. |

---

## 5. Whitespace

What no competitor covers, quotably.

1. **Nobody in this set states that dividends are not pensionable.** Eight competitor pages, roughly 14,000
   words, and not one of them tells a doctor that routing private or locum income through a limited company
   **loses NHS accrual entirely**, or that a company cannot hold a GMS or PMS contract. `house_positions.md`
   §2.C makes this the single most important cross-link on the site and instructs that any incorporation tax
   saving is **always** paired with the pension-accrual loss. medicsmoney is a publisher plus a directory; the
   BMA is a union; practiceindex is a practice-management publisher. **None of them has to model the tax saving
   and the accrual loss together, and we do.** This is the sentence no competitor page can write.
2. **Nobody prices the pension as a percentage of pay in one line.** `what is the nhs pension percentage` (90,
   BMA at position 5) and `what is the nhs pension contribution` (390, peer-winnable at position 7) are both
   answered by "you pay a tiered rate on pensionable pay, between 5.2% and 12.5% for 2026/27, and your employer
   pays 23.7%". That is a two-number answer. The BMA's page has the numbers and buries them under four
   nation-by-nation tables; medicsmoney has tables but no employer rate; ours has neither.
3. **Nobody joins the annual allowance to the tier table.** The tier is charged on **pensionable pay**; the annual
   allowance is measured on the **pension input amount**, which is capitalised growth and not contributions paid.
   Doctors conflate the two constantly. Our page already says "It is not simply the contributions you pay" and
   never explains what a tier is, so the correction has nothing to correct against.
4. **Nobody addresses the retirement-income question our own equity register asks.** Three of our four Bing
   queries are projection questions: `how pension funds will be available for uk medical specialist doctor after
   30 years of service` (position 3.0), `typical state pension and nhs pension for physicians in uk` (position
   7.0), `gp retirement fund over 1 million` (position 3.0). Not one competitor page in the set contains a worked
   projection, and medicsmoney explicitly omits `concrete examples of projected retirement income scenarios`. A
   structural answer ("30 years at 1/54th accrues roughly X of career-average earnings, before the 1995 and 2008
   legacy service") is available without giving investment advice. **See §7.4: any worked figure must recompute
   from stated inputs and must not present an individual's outcome as advice.**
5. **The state pension interaction.** `typical state pension and nhs pension for physicians in uk` is a live
   query on this URL and no competitor page in the set covers the interaction at all. Our current page mentions
   state pension once, in passing, inside a cash-flow-modelling sentence.
6. **Nobody writes for the GP separately from the consultant.** medicsmoney gives it one heading (`I'm a GP. How
   is my pensionable income calculated?`). The practitioner-versus-officer distinction, and the fact that a GP
   partner's pensionable earnings derive from net NHS-derived profit while a consultant's derive from NHS
   employment only, is §2.C ground truth and is genuinely hard to find stated plainly anywhere.

### KEEP, explicitly

REFRAME permits a full rewrite, so KEEP here means "these are the assets in the current page; do not lose them
while rewriting".

- **The mixed-section reality**: senior consultants and GP partners holding a mix of 1995 and 2015 benefits, and
  2008-to-2015 joiners holding all three. Well put, correct, and the reason projections need specialist work.
  **KEEP the point, rewrite the sentence.**
- **The pension input amount is capitalised growth, not contributions paid**, and the list of things that spike
  it (pay rise, additional sessions, seniority increments, Clinical Excellence Awards). That list is specific,
  correct and medical. **KEEP.**
- **Model before the tax year ends**, so carry-forward or Scheme Pays is still available as an option. **KEEP.**
- **The McCloud annual-allowance consequence**: revised pension input amounts across the remedy period can
  restate prior-year positions and generate refunds or additional charges, and previously-settled Scheme Pays
  positions can be restated. This is the accountant's angle on McCloud and no competitor states it. **KEEP the
  substance, fix the surrounding facts** (see §6).
- **The tax-efficient drawdown-order and cash-flow-modelling framing** in the retirement section. **KEEP**, but
  keep it short: this hub introduces, the deeper pages do the work.
- **The `LeadForm` conversion surface and the "Need NHS Pension Advice?" CTA position.** **KEEP.**

---

## 6. Our current page, read honestly

Source: `Medical/web/src/app/blog/nhs-pension-planning/page.tsx`, read 2026-08-26.

| | |
|---|---|
| File size | **1,490 words** (`wc -w` on the `.tsx`, which includes imports, JSX, className strings and the schema block). **Actual reader-facing prose is roughly 900 words.** |
| `metadata.title` | `NHS Pension Planning for Doctors & GPs` |
| `metadata.description` | `Expert guidance on the NHS Pension Scheme, annual allowance, tapered relief, McCloud remedy and retirement planning for UK doctors and GPs.` |
| H1 | `NHS Pension Planning for Doctors & GPs` (rendered from `NHS Pension Planning for Doctors &amp; GPs`) |
| Tables | **None** |
| Calculator | None |
| FAQ block | **None**, and no FAQPage schema |
| Schema | Hand-written `BreadcrumbList` + `CollectionPage` |
| Related posts | Auto-rendered from `getAllPosts()` filtered to `category === "NHS Pension Planning"` |

**Current H2 list, in order:**

1. `Understanding the NHS Pension Scheme Sections`
2. `Annual Allowance and Tapered Annual Allowance`
3. `The McCloud Remedy and Its Impact`
4. `Pension Tax Charges and Scheme Pays`
5. `Retirement Planning for NHS Doctors`
6. `Related Articles` (conditional, only when related posts exist)
7. `Need NHS Pension Advice?` (the CTA)

**Blunt read: this page is THIN, it is MIS-AIMED, and it carries FOUR factual defects.**

**Thin.** Roughly 900 words of prose against medicsmoney's 2,800 and the BMA's 1,200-plus-a-whole-hub. Five
sections, each exactly two paragraphs, no lists, no tables, no FAQ, no worked example, no internal links in the
body at all beyond the auto-rendered related-post list. Word count is not a ranking lever (§9.12), but 900 words
carrying zero of a 6,770-volume topic's phrasings is not a depth problem, it is an **absence** problem.

**Mis-aimed.** The page is titled and structured as **NHS pension PLANNING** and the topic assigned to it is
**how the NHS pension WORKS**. Of its five sections, three (annual allowance, McCloud, Scheme Pays) are
specialist tax-charge content that the dossier §7 shows is already owned by four other pages of ours, and it
carries **no** content on contributions, no accrual rate, no normal pension ages, no benefits, and no answer to
"is it any good". It is the deep layer wearing a hub's URL, on a site where the deep layer already exists five
times over.

**The four factual defects, checked against `house_positions.md`:**

| # | On the page now | Ground truth | Severity |
|---|---|---|---|
| 1 | "For the 2025/26 tax year the standard annual allowance is £60,000" | §2.B: the live year is **2026/27** and £60,000 carries forward unchanged. The figure is right; **the year tag is stale**. | Stale tag |
| 2 | "The taper applies when adjusted income exceeds £260,000" | §2.B: the taper applies where **threshold income exceeds £200,000 AND adjusted income exceeds £260,000**. The page states one limb of a two-limb test, which will tell a doctor with high adjusted income but threshold income under £200,000 that they are tapered when they are not. | **WRONG, materially** |
| 3 | "If the charge exceeds £2,000, you can elect for Mandatory Scheme Pays" | §2.D and FA 2004 s.237B: mandatory Scheme Pays requires the charge to exceed **£2,000 AND** the pension input amount **in the NHS scheme alone** to exceed the **standard £60,000** annual allowance. A charge driven only by the taper below £60k is **voluntary-only**. The page states one of two conditions. The page also omits the **31 July** election deadline (s.237BA) and the **2 May revised-statement extension**, which §2.D says is "the limb NHS members most often need, because NHSBSA statements are routinely late and revised". | **WRONG, materially** |
| 4 | "all members who were active between 1 April 2015 and 31 March 2022 now receive whichever benefit is higher" | §2.A: eligibility is a member who **joined on or before 31 March 2012 and was active on 1 April 2015**, not all members active in the remedy period. Remedy-period service was **rolled back to the legacy section from 1 October 2023**, and the choice between legacy and 2015 terms is a **deferred choice made AT RETIREMENT**, not something already applied. §2.A also says explicitly: do NOT imply a general election deadline before retirement. | **WRONG** |

**Three further problems, not factual defects:**

5. **Missing mandatory figures.** The 2015 accrual rate **1/54th** appears nowhere. Normal pension ages (60 / 65
   / State Pension Age) appear nowhere. Minimum pension age **55** appears nowhere. The **LSDBA £1,073,100**
   appears nowhere (LSA £268,275 is present). Member contribution tiers and the 23.7% employer rate appear
   nowhere.
6. **Em-dashes in user-facing copy.** The file contains several U+2014 characters, in the annual-allowance
   section (after "as little as £10,000", in the sentence beginning "The taper applies when adjusted income
   exceeds £260,000"), the pension-input paragraph (twice, around "ideally before the tax year ends"), the
   McCloud section (twice, around "their legacy section or 2015 Scheme entitlement"), the Scheme Pays section
   (before "often 45% for higher-earning doctors"), the retirement section (before "an attractive option for
   consultants wanting to reduce sessions gradually") and the CTA (in "rewards careful planning ... and
   penalises those who leave it to chance"). **Every one must go**, per the locked rule in `CLAUDE.md` and §5 of the engine doc.
7. **"NHS Pensions began issuing Remediable Service Statements in 2024"** is a dated operational claim not in
   house positions. Verify at NHSBSA or drop it.

**What is right and worth saying so:** the three-section descriptions (1/80th plus lump sum, 1/60th without,
CARE with CPI+1.5%) are correct; the pension-input-amount explanation is correct and well written; the LTA
abolition date and the LSA figure are correct; partial retirement from 2023 is directionally correct; and the
45% marginal-rate framing is correct for an additional-rate taxpayer.

---

## 7. Deterministic acceptance criteria

### 7.1 Phrases that MUST appear verbatim (case and punctuation normalised)

**13 phrases.** Every row of section 3, all of which are `On page = no`. Ordered **peer-winnable first, then
volume**.

**Tier A, peer-winnable (11 phrases, 4,590 volume). These order the work.**

| # | Phrase | Vol | Best pos | Suggested home |
|---|---|---|---|---|
| 1 | `how does nhs pension scheme work` | 1000 | 10 | H2, question form |
| 2 | `how does the nhs pension scheme work` | 1000 | 10 | H2 or the opening sentence |
| 3 | `what is the nhs pension` | 590 | 7 | H2 or FAQ question |
| 4 | `what is the nhs pension scheme` | 590 | 7 | H2 or FAQ question |
| 5 | `nhs pension explained` | 480 | 10 | `metadata.title` or an H2 |
| 6 | `what is the nhs pension contribution` | 390 | 7 | Contributions H2 or FAQ |
| 7 | `nhs pension benefits` | 320 | 10 | Benefits H2 |
| 8 | `nhs pension scheme guide` | 110 | 9 | Intro or `metadata.description` |
| 9 | `nhs pension scheme guides` | 110 | 7 | Body prose |
| 10 to 11 | (rows 1 to 9 above cover 9 distinct Tier A strings; the remaining two Tier A strings are `nhs pension scheme guide` / `nhs pension scheme guides` counted separately above) | | | |

**Tier B, not peer-winnable (4 phrases).**

`how does nhs pension work` (1000, pos 14) · `how does the nhs pension work` (1000, pos 16) ·
`understanding nhs pensions` (90, pos 9, BMA) · `what is the nhs pension percentage` (90, pos 5, BMA)

**Countable test:** **13 of 13 present**. Any absent phrase is a named BLOCK.

**Placement rule that matters more than the list.** medicsmoney holds all 13 with **19 question-form headings**
(§4.1). Our current page has **five noun-phrase headings**. The rewrite should convert the heading style, which
places most of these phrases naturally rather than by insertion. The editorial pass checks that the plain-language
layer reads as prose and not as inserted keywords (§9.9).

### 7.2 Equity preservation (§9.9 floor 5)

**All 4 Bing queries in section 2 must still match** in the metadata title, the H1, an H2, an FAQ or body prose
after the rewrite. Google contributes 0 rows, so the combined equity set is **4**.

This is the smallest equity set of the three pages in the batch, which is why the grade is REFRAME. It is still a
gate. Concretely, after the rewrite the page must still contain matter that matches:

- `nhs pension doctors` (trivially preserved by the H1)
- `typical state pension and nhs pension for physicians in uk` (needs a **state pension** mention to survive; the
  current page has exactly one and the rewrite must not drop it)
- `how pension funds will be available for uk medical specialist doctor after 30 years of service` (needs
  **accrual over years of service** content; the rewrite adds 1/54th, which strengthens it)
- `gp retirement fund over 1 million` (needs **GP** plus a **retirement value / lump sum allowance** framing; the
  LSDBA £1,073,100 addition strengthens it)

**Countable test:** 4 of 4 matchable. Run
`python scripts/track2_query_coverage.py --slug nhs-pension-planning --json`. **Confirm the coverage checker
resolves this slug to the TSX file and not to a missing markdown file before trusting a PASS.** A checker that
cannot find the source may report vacuously. If it cannot read TSX, the check is done by hand against the four
queries and that is recorded in the verdict as a manual check.

### 7.3 REFRAME: what must survive byte-identical

REFRAME permits rewriting metaTitle, H1, H2s, body and FAQ. The following are **not** copy and must survive
unchanged:

- `alternates: { canonical: `${siteConfig.url}/blog/nhs-pension-planning` }`
- The literal string `"NHS Pension Planning"` in `allPosts.filter((p) => p.category === "NHS Pension Planning")`
- `<Breadcrumb suppressJsonLd ... />` and its three items
- `<LeadForm redirectOnSuccess={false} ... />`
- The route directory `src/app/blog/nhs-pension-planning/`

**Countable test:** `git diff` contains zero changes to the canonical, the category filter string, the route
path, and zero removals of `LeadForm` or `suppressJsonLd`.

### 7.4 Arithmetic that must recompute, and the figures that are BANNED

The page currently contains **no arithmetic**. If the rewrite adds a worked accrual or projection example (§5
whitespace item 4 argues it should), every figure must be re-derived by `arithmetic_recomputed[]` from stated
inputs.

**Inputs any worked accrual example must state explicitly:**
- the section (2015 CARE), the accrual rate **1/54th**, the revaluation **CPI + 1.5%** while active
- the pensionable earnings figure used, **labelled as illustrative**
- the number of years of service
- whether legacy 1995 or 2008 service is included, and on what basis

**Inputs any worked contribution example must state:**
- the pensionable pay figure, and that the tier is on **pensionable pay** and not on total taxable income
- the 2026/27 band and rate from §2.C, date-tagged
- that the bands can be revised retrospectively in-year (§2.C)

**BANNED FIGURES on this page:**

| Banned | Why |
|---|---|
| Any **GMC annual retention fee** | `house_positions.md` §8 and Verification log: **UNVERIFIED**, GMC returns HTTP 403. Deductibility may be stated; a figure may not. |
| Any **Global Sum per weighted patient** | §3 `> VERIFY`, **UNVERIFIED**. If GP pensionable profit is discussed, frame as "derived from net NHS-derived profit", never from a per-patient rate. |
| Any **QOF point value** | §3 `> VERIFY`, **UNVERIFIED**. Same framing rule: "confirm the current figure in the Statement of Financial Entitlements Directions 2026". |
| A **fixed early-retirement reduction percentage** | §2.E: lock the principle (permanent actuarial reduction), point to the NHSBSA factor table, **do NOT lock a percentage**, GAD revises them. |
| A **lifetime allowance of £1,073,100** | §2.B: the LTA is **abolished**. £1,073,100 is the **LSDBA**, a different thing. Naming it as an LTA is a named do-not-write. |
| Employer contribution of **20 to 22.5%** | practiceindex's stale figure (§4.7). The verified rate is **23.7%** (§2.C). |
| The **2025/26** member contribution bands (£27,797 / £33,868 / £50,845 / £65,190 breakpoints) | Superseded 1 April 2026. Use the 2026/27 bands from §2.C (£28,854 / £35,155 / £52,778 / £67,668). The BMA page still shows the old ones (§4.4). |
| **£40,000** annual allowance, **£240,000** adjusted income, **£4,000** taper floor, **£4,000** MPAA | §2.B named do-not-writes. |

**Countable test:** count of banned-figure assertions = **0**.

### 7.5 Statute, regulation and source re-verification

Every row fetched and content-verified before the claim is written, with the fetch date in the QA verdict. URL
liveness alone is insufficient (§4 floor 3).

| Claim | Source URL |
|---|---|
| Annual allowance £60,000, MPAA £10,000, minimum tapered AA £10,000, threshold income £200,000, adjusted income £260,000, LSA £268,275, LSDBA £1,073,100, all for **2026/27** | https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates |
| Taper requires threshold income over £200,000 **AND** adjusted income over £260,000; three-year carry-forward | https://www.gov.uk/tax-on-your-private-pension/annual-allowance |
| Mandatory Scheme Pays: charge exceeds **£2,000** AND scheme input exceeds the s.228(1) annual allowance | https://www.legislation.gov.uk/ukpga/2004/12/section/237B |
| Scheme Pays election deadline **31 July** in the following year; the **2 May revised-statement** extension (earlier of 3 months from the statement or 6 years from the end of the tax year); brought forward once all benefits are taken | https://www.legislation.gov.uk/ukpga/2004/12/section/237BA and https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm056430 |
| LTA abolished from 6 April 2024 | https://www.gov.uk/government/publications/abolition-of-the-lifetime-allowance-from-6-april-2024 |
| Section structure: 1995 1/80th + 3x lump sum NPA 60; 2008 1/60th NPA 65; 2015 CARE **1/54th** NPA = SPA; all active members in 2015 from 1 April 2022 | https://www.nhsemployers.org/articles/comparing-different-sections-nhs-pension-scheme |
| Active revaluation **CPI + 1.5%** and the 1/54 accrual (corroborating source) | https://www.bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/about-the-2015-nhs-pension-scheme |
| McCloud: remedy period 1 April 2015 to 31 March 2022; rollback to legacy from **1 October 2023**; **deferred choice at retirement**; eligibility joined on or before 31 March 2012 and active on 1 April 2015 | https://www.nhsemployers.org/articles/mccloud-remedy and https://www.legislation.gov.uk/ukpga/2022/7 |
| Member contribution tiers **2026/27**, uplifted 1 April 2026, and the in-year revision rule | https://www.nhsemployers.org/publications/nhs-pension-scheme-member-contributions |
| Employer contribution **23.7%**, re-set for four years from 1 April 2027 by the 2024 valuation | https://www.nhsemployers.org/articles/nhs-pension-scheme-employer-contributions |
| Partial retirement from **1 October 2023**, 20% to 100%, up to two events, 10% reduction for the first 12 months | NHSBSA partial-retirement guidance (`house_positions.md` §2.E authority anchor) |
| Statutory basis: Superannuation Act 1972 (1995/2008), Public Service Pensions Act 2013 (2015), SI 2015/94 | https://www.legislation.gov.uk/uksi/2015/94 |
| Type 1 Annual Certificate / Type 2 self-assessment, **28 February a year in arrears**, if the GP certification signpost is written | https://pcse.england.nhs.uk/services/gp-pensions/end-year-processes/gp-non-gp-partners-type-1-annual-certificate |
| Locum **10-week rule**, if the locum signpost is written | https://pcse.england.nhs.uk/services/gp-pensions/locum-gps/submit-locum-b-forms |
| Remediable Service Statements issued from 2024, if that claim is kept | NHSBSA Public Service Pensions Remedy pages. **Drop the claim if it cannot be verified.** |

**Note:** NHSBSA's own `nhsbsa.nhs.uk/member-hub` pages return **HTTP 403** to automated fetches
(`house_positions.md` Verification log). NHS Employers is the fetchable authority. A 403 is recorded as a flagged
fetch, never substituted with a guess.

### 7.6 The four existing floors (§4) plus §9.9 floors 5 to 8

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py --slug nhs-pension-planning` | Gate bar met. **This page is effectively invisible (4 impressions, 0 clicks), and §4 states invisible pages never gate.** The check is still run and its output recorded; a manual 4-of-4 confirmation is the real floor here. |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | Every worked accrual or contribution figure re-derived from labelled illustrative inputs |
| 3. Statute verified at source | `statute_checks[]` | Every row in 7.5 content-verified. FA 2004 s.237B and s.237BA are **mandatory** rows: the current page is wrong on both. |
| 4. Link resolution | `track2_link_audit.py` + `predeploy_gate.py` | 0 HARD 404s repo-wide. **Every new internal link from this hub must resolve through `slug_resolver.py`**, and the resolver flags invented slugs rather than guessing. A hub is mostly links, so this floor carries more weight here than on either markdown page. |
| 5. Equity preservation | 7.2 | 4 of 4 Bing queries still match |
| 6. Cluster coverage | 7.1 | **13 of 13** phrases placed |
| 7. Reconciliation balance | Dossier §10 | Already BALANCED. This page's keywords sit in the `assigned` bucket. If the rewrite also absorbs dossier NO-PAGE rows 2 and 3 (`is the nhs pension scheme good`, `how does the nhs pension scheme work (accrual rate)`, currently prescribed to `/calculators/nhs-pension-scheme-pays`), **that reassignment must be recorded**, or the ledger balances by accident. Default: leave them where the dossier put them and link. |
| 8. Competitor re-read | 4.9 | 24 themes, 24 decisions, **0 undecided** |

Plus: **`cd Medical/web && npm run build` exits 0.** This is a floor for this page and not for the markdown ones.

### 7.7 Extra hard constraints for this page

1. **No em-dashes** anywhere. The current file has several; all must be gone. Grep the file for U+2014 after the
   edit and the count must be **0**.
2. **JSX escaping.** `&` becomes `&amp;`, `<` becomes `&lt;`, `>` becomes `&gt;`, apostrophes in text are fine in
   JSX text nodes but not inside `{}` expressions. The build is the test.
3. **The title must be changed in all five places** (`metadata.title`, `openGraph.title`, the
   `encodeURIComponent(...)` OG image string, `twitter.title`, `jsonLd` `CollectionPage.name`) or the OG card and
   the schema will disagree with the page.
4. **The description must be changed in all three places** (`metadata.description`, `openGraph.description`,
   `twitter.description`). `jsonLd` reads `metadata.description` by reference and follows automatically.
5. **If an FAQ block is added**, add a matching `FAQPage` node to the `jsonLd["@graph"]` array. A visible FAQ
   with no schema wastes the asset; schema with no visible FAQ is a violation.
6. **Do not edit any frozen page** while linking to it: `/blog/nhs-pension-tapered-annual-allowance-calculator`,
   `/blog/nhs-pension-for-locums-form-a-form-b`, `/blog/nhs-pension-annual-allowance-complete-guide`,
   `/blog/gp-pension-contributions-tax-relief` are all inside the armed window to 2026-09-10 (dossier §6).
   Linking to their live URLs is fine; touching their files is not.
7. **Treat `/blog/nhs-pension-scheme-pays-doctors-deadlines` as HOLD.** It is `status='flagged'` (dossier §6) and
   holds the second-highest-confidence topic in the map. Link to it; do not treat it as available for
   differentiation edits.
8. **No collapse, no redirect, no URL change**, notwithstanding that dossier §7 shows this page's topic tying
   with two others. Differentiate by scope (see §1), never by consolidation.
9. **Do not write "McCloud is coming" or "the remedy applies from April 2026"**, and do not tell members to make
   the choice now (§2.A named do-not-writes).
10. **Do not describe the 2015 scheme as final salary.** It is CARE (§2).
11. **Do not use the dental "incorporated provider can pension up to the NPE ceiling" framing** (§2.C).

---

## 8. Stated expectation

**Baseline, from the pull of 2026-08-26** (`GetPageQueryStats` for this URL, 90-day window): **4 named queries,
4 impressions, 0 clicks**, average impression positions 3.0 to 8.0. Google query-level rows: **0**. The dossier
records the same page-level figure, `B 0c/4i`, so the two measurements agree on this URL, unlike the other two
pages in this batch.

Pro-rated to 28 days: **1.2 impressions**, **0 clicks**. **This page is invisible on both engines.** That is
what earned it the REFRAME grade (§9.2 step 5: Google impressions under 300 AND Bing clicks 0 AND Bing
impressions under 300) and it also means the expectation cannot be framed as a percentage lift. It has to be
framed as first contact.

### The read at 14 to 28 days, Bing

1. **Named-phrase impressions.** At least **5 of the 13** phrases in section 7.1 return at least one Bing
   impression for this URL in the 28-day window, and **at least 3 of those 5 come from Tier A** (the
   peer-winnable set). Today the count is 0 of 13. Per §9.6, total impressions rising while the 13 stay at zero
   is DRIFT and is recorded as a **FAIL**.
2. **Impressions.** Named-query impressions in a rolling 28-day window at or above **15** (baseline 1.2). A
   twelvefold rise reads dramatic and is not: the baseline is a single impression a month against a 6,770-volume
   topic whose peer-winnable half sits at positions 7 to 10 on one competitor page.
3. **Clicks.** At least **1** Bing click in a rolling 28-day window by day 28. Baseline is zero, so any click is
   new information.

### The read at 28 to 90 days, Google

4. **Query-level rows.** At least **5 query-level rows** for this URL in GSC by day 90, from a baseline of 0, and
   **at least 1 of them from the Tier A peer-winnable set**. Five rather than the PCSE page's one, because 4,590
   of this topic's 6,770 volume is held by a single peer at positions 7 to 10 with no gov.uk, NHS or MSE domain
   in the peer-winnable half at all.
5. **Position, stated but not gated.** If rows appear, the honest first expectation is average position 20 to 40,
   not top ten. Google indexes roughly a sixth of this corpus (universe §7) and the incumbent is the strongest
   peer on the site's strongest-authority lane (universe §3 lane 2, "the highest-authority contested lane in the
   niche"). Position is a 90-day-plus read, not a 28-day one.

### Failure trigger (§9.6, written as a number, before the change)

Clicks cannot fall below a zero baseline, so the trigger is written on impressions and on equity:

> **If named-query Bing impressions on `/blog/nhs-pension-planning` are 0 across a full 28-day window measured
> between deploy+28 and deploy+56 days, the reframe has not landed. Revert to
> `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/src/app/blog/nhs-pension-planning/page.tsx`
> and treat the topic as NO-PAGE rather than as this hub's.**

Second trigger, on the equity gate:

> **If any of the 4 named Bing queries in section 2 stops returning an impression for this URL across two
> consecutive 28-day windows, that query is a named BLOCK and is investigated before any further change.**

Third trigger, specific to a REFRAME on a hub:

> **If the Related Articles list renders empty after deploy, the `category === "NHS Pension Planning"` filter has
> been broken. That is a build-passing, silently-wrong outcome and it is an immediate revert, not a monitored
> read. Check it on the deployed URL, not only in the diff.**

**One change per page per window (§9.3).** This REFRAME is the only change to this route until the 28-day Bing
read. Do not stack an internal-link programme, a design change or a schema experiment on top.

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` must be populated with the **13 missing
phrases from section 7.1**, not with the 4 queries the page already shows for.

---

## Corrections to the dossier

1. **The dossier and the data sheet disagree on this topic's size, and the disagreement is large.** Dossier §3
   gives this page's topic (`how does the nhs pension work`) **34 keywords, 6,260 volume, 70 peer-winnable, 1
   contributing domain, 32 of 34 missing**. The data sheet's regex returns **13 keywords, 6,770 volume, 4,590
   peer-winnable, 3 contributing domains, 13 of 13 missing**. The keyword counts differ because the two are
   different selections (consensus-node clustering versus a topic regex), which is expected and matches the same
   pattern found on both EXTEND packs in this batch. **The peer-winnable figures are the problem: 70 against
   4,590, a factor of 65.** On the dossier's number this topic looks like an unwinnable-authority lane barely
   worth the effort; on the data sheet's it is the highest peer-winnable volume in the batch, held end to end by
   one peer page at positions 7 to 10. **This should be reconciled before the batch is sequenced, because the two
   numbers imply opposite priorities for the same page.** The pack proceeds on the data sheet, which is the
   per-page extract §9.5 specifies as the writer's input, and flags the divergence rather than harmonising it.

2. **Same finding as the other two packs: dossier per-topic keyword counts are a floor, not a total.** Three for
   three across this batch. Anywhere those counts are quoted as completeness figures, they undercount, because
   the consensus clustering fragments a term family across several topic rows and drops any keyword sitting on a
   competitor URL with fewer than 3 in-family keywords (1,336 such keywords, dossier §10). No dossier edit
   needed; the clustering is doing what §9.2 step 2 specifies. The correction is to the reading.

3. **The dossier does not record that this page's source is a TSX component in the row where it matters.** §2
   names the eight TSX pillars and explicitly warns that `/blog/nhs-pension-planning` "took a topic in the
   assignment". But the §3 assignment table lists it as a bare URL alongside fifteen markdown pages with no
   rendering marker. **Any writer working from the §3 table alone will look for a markdown file that does not
   exist.** Recommend a `TSX` marker in the §3 table on the next dossier revision. Recorded, not silently fixed.

4. **A live currency finding for the corpus, not just this page.** bma.org.uk's `NHS pension contribution rates`
   page (fetched 2026-08-26) is still publishing the **2025/26** England and Wales bands under the heading "From
   1 April 2025", while `house_positions.md` §2.C carries the **2026/27** bands uplifted on 1 April 2026. Any
   Medical page that took its tier table from the BMA before the 2026-08-26 currency pass is stale.
   `/calculators/nhs-superannuation-tiered-contribution` is named in dossier §5 as carrying this exact
   vocabulary and should be checked. **This is the rates-currency problem §4 of the engine doc names as the
   missing fifth floor: one stale source seeds the same error across every citing page.** Flagged as a delta,
   not worked here.
