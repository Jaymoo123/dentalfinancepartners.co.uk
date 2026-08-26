# §9.5 RESEARCH PACK: /nhs-pension

**Built** 2026-08-26. **Site** medicalaccounts.co.uk (`medical`). **Spec** `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.5, §9.9, §9.10.
**Frozen scope input** `docs/medical/cluster_dossier_2026-08-26.md` (dossier freeze, §12). **Ground truth** `docs/medical/house_positions.md`, governing sections **§2, §2.A, §2.B, §2.C, §2.D, §2.E**.
**Peer classification** `docs/medical/competitor_universe_2026-08-26.md`. **Lanes** `sites/medical.discovery.json`.

This is preparation, not page content. Nothing under `Medical/web/` was edited. No commit, no deploy, no `monitored_pages` write, no monitor or alert created.

---

## 1. Target and permission level

| | |
|---|---|
| Page URL | `/nhs-pension` (a **top-level service page**, not a blog post) |
| Cluster / topic | `avcs / additional pension` (dossier §3, topics-with-a-page table: 2 domains, 5,390 volume, **0 peer-winnable**, 26 kws, **26 of 26 phrasings missing**, equity "none") |
| Lane | `nhs_pension_tax` (lane 2 of 15), described in `competitor_universe_2026-08-26.md` §3 as "**the highest-authority contested lane in the niche**" |
| Grade | **REFRAME** (dossier §3) |
| Source file | `Medical/web/src/app/nhs-pension/page.tsx` |
| **How it renders** | **A TSX ROUTE COMPONENT. There is no markdown file and no frontmatter for this page.** See section 1a. This is the single most important line in this pack and the writer must read it before anything else. |
| Current sha | `b3d78c97e768645cca480dd350281ffa68c1faf9` (`git rev-parse HEAD`, 2026-08-26) |
| Revert path | `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/src/app/nhs-pension/page.tsx` |

### 1a. The writer edits a React component, not a document

`/nhs-pension` is a **Next.js App Router page component** at `Medical/web/src/app/nhs-pension/page.tsx`, 257 lines, ~1,326 words in the file including JSX. There is **no `content/` file, no YAML frontmatter, no `metaTitle` key, no `h1` key, no `faqs:` array, no `keyTakeaways`, no `summary`**. Every one of those things exists on this site's blog posts and **none of them exists here**. A writer who opens this expecting a `.md` file will write into the wrong shape.

**Copy lives in exactly six places in that file, and nowhere else:**

| # | What | Where in the file | Shape |
|---|---|---|---|
| 1 | Meta title, meta description, canonical, OpenGraph and Twitter titles and descriptions | `export const metadata: Metadata = {...}`, lines 11 to 28 | A TS object. `title` is the meta title; there is no separate `metaTitle` key |
| 2 | **H1** and hero sub-paragraph | Lines 126 to 131, inside the hero `<section>` | Literal strings inside `<h1>` and `<p>` JSX |
| 3 | Five section **H2s** | Lines 147, 163, 182, 198, 222 | Literal strings inside `<h2>` JSX |
| 4 | Three content arrays, rendered as H3-plus-body cards | `whenYouNeedHelp` (4 items, lines 30 to 47), `commonMistakes` (4 items, lines 49 to 66), `processSteps` (3 items with `n`/`title`/`body`, lines 68 to 84) | `const` arrays of `{title, body}` objects above the component. **Adding or removing an entry changes the rendered page; no other file needs touching** |
| 5 | The "What you get" list, 5 items | Lines 224 to 244 | **Hardcoded `<li>` JSX, not an array.** Inconsistent with 4 and worth normalising into an array while the file is open |
| 6 | JSON-LD service schema: `name`, `description`, `serviceType`, and a 5-entry `offerItems` array | `buildServicePageSchema({...})`, lines 92 to 108 | A call into `@/lib/schema`. `provider` resolves to the canonical Organization `@id` automatically |

**Two structural facts the writer must plan around:**

- **There is no FAQ block and no way to add one declaratively.** `Medical/web/src/lib/schema.ts` exports `buildWebApplication`, `buildWebSite`, `buildPostHowToJsonLd`, `buildAudiencePageSchema`, `buildServicePageSchema`, `buildHomepageServiceSchema`, `buildBreadcrumbJsonLd`, `buildOgImageUrl` and `buildBlogPostingJsonLd`. **There is no `buildFaqJsonLd`.** Adding an FAQ to this page means (a) a new `<section>` with question headings, optionally using the existing `Medical/web/src/components/ui/accordion.tsx`, and (b) a hand-written `FAQPage` JSON-LD object passed to the existing `<JsonLd data={...} />` component. That is a real code change, not a content change. **Recommended: add the FAQ as plain question-shaped H3s in a new array (cheapest, matches the existing three arrays), and only add FAQPage JSON-LD if the writer is comfortable hand-writing it.** Do not invent a schema builder.
- **The page embeds a calculator**: `<CalculatorClient slug="nhs-pension-annual-allowance" />` at line 190, under an anchor `id="calculator"` that the hero's second CTA links to. **That is the same calculator slug as `/calculators/nhs-pension-annual-allowance`.** See section 6, the cannibalisation reading.

### Constraint first

**REFRAME = full rewrite permitted.** The meta title, H1, the five H2s, the three content arrays, the "What you get" list and the JSON-LD `description` and `offerItems` may all change. The equity register in section 2 still binds, but **this page has zero measured equity on both engines**, so the equity gate has nothing to protect.

**What may NOT change:** the route (`src/app/nhs-pension/page.tsx` stays exactly where it is), the canonical (`${siteConfig.url}/nhs-pension`), the `CalculatorClient` slug, and the `Breadcrumb` items. Never propose a collapse, a redirect or a URL change (§5 working agreement). Do not touch the Tailwind class strings or the CSS-variable tokens (`--navy`, `--copper`); this is a content pass, and the design system is not in scope.

### Frozen-list position

Batch 1 excludes the **16 pages with an armed `monitored_pages` window to 2026-09-10** and treats the **3 `status='flagged'` rows** (`__home`, `gp-accounting-guide`, `nhs-pension-scheme-pays-doctors-deadlines`) as HOLD (dossier §6). **`/nhs-pension` is on neither list**, so it is workable now.

**Three of its nearest siblings are not.** `/blog/nhs-pension-annual-allowance-complete-guide`, `/blog/nhs-pension-tapered-annual-allowance-calculator` and `/blog/nhs-pension-for-locums-form-a-form-b` are all **FROZEN to 2026-09-10**, and `/blog/nhs-pension-scheme-pays-doctors-deadlines` is **flagged / HOLD**. This page currently duplicates the annual-allowance content of the first two. See section 6.

---

## 2. Equity register (copied VERBATIM from the data sheet)

Google, GSC API `searchanalytics.query` dimensions ['page','query'], window 2026-05-28 to 2026-08-26 (90d), property from `sites` config, script `equity_pull.py`.

Google query-level rows for this URL: **0** (impressions 0, clicks 0).
No query-level Google rows. GSC anonymises low-volume queries, so page-level Google impressions can be non-zero while the query breakdown is empty. Check the page-level figure in `gsc_page_rows.json` before concluding zero Google demand.

Bing, `GetPageQueryStats(siteUrl=https://www.medicalaccounts.co.uk, page=/nhs-pension)`, pulled 2026-08-26 via `BingWebmasterClient.get_page_query_stats`. Rows aggregated across the returned date series.

Bing named queries for this URL: **0** | impressions 0 | clicks 0.

**Every query in the table above is a DO-NOT-LOSE query. Any one that stops matching after the change is a named BLOCK.**

### 2a. ADJACENCY: `/nhs-pension` is NOT `/resources/nhs-pension`

**These are two different live URLs. Do not confuse them, and do not treat one's data as the other's.**

| | `/nhs-pension` (THIS PAGE) | `/resources/nhs-pension` (a different page) |
|---|---|---|
| Rendered by | `Medical/web/src/app/nhs-pension/page.tsx`, a bespoke route component | `Medical/web/src/app/resources/[topic]/page.tsx`, a dynamic route with `dynamicParams = false` |
| Content source | The TSX file itself | `Medical/web/content/resources/nhs-pension.md`, resolved through `getGuideByTopic()` |
| Registered in | nothing; it is its own route | `Medical/web/src/lib/resources/registry.ts`, key `"nhs-pension"`, `toolId: "nhs-pension-premium"`, one of 3 enabled topics |
| Page type | Service page with an embedded calculator and a CTA funnel | Open research guide, "Free research resource", no email gate, no NOINDEX |
| **Google, 90d to 2026-08-26 (GSC page dimension)** | **0 clicks / 0 impressions** | **0 clicks / 49 impressions / average position 13.5** |
| In this batch? | **Yes.** REFRAME | **No.** Not assigned in this batch, not touched by this pack |

**What the adjacency means for the writer.** The `/resources/` sibling is the one Google is currently showing, at position 13.5 with 49 impressions, while this page has none. Two conclusions follow and both are actionable:

1. **This page is not competing with the market yet; it is behind its own sibling.** Any expectation set in section 8 must be read against that.
2. **Whatever the rewrite does, it must not turn `/nhs-pension` into the research guide.** The `/resources/` page owns the explanatory long-form treatment. `/nhs-pension` owns the **service and the tool**. Per dossier §7's standing differentiation rule ("the calculator owns the tool intent, the guide owns the explanation, the blog post owns the worked case"), this page's intent is **commercial service plus calculator**, and the new administrative vocabulary in section 3 must be layered on without turning it into an explainer.

**Never propose collapsing them.** §5 of the working agreement: rewrite in place, never a redirect or a URL change, and three-namespace collisions on this site get differentiated, not merged (dossier §7).

### 2b. Reading of the equity register (pack author's note, not data sheet content)

Zero on both engines for a **top-level service page carrying a working calculator**. The DO-NOT-LOSE set is empty and §9.9 floor 5 passes vacuously, subject to the `gsc_page_rows.json` page-level check in criterion A.

Context from `competitor_universe_2026-08-26.md` §7 point 2, which flagged this exact neighbourhood and left it undiagnosed: DuckDuckGo surfaced `/calculators/nhs-pension-annual-allowance` at rank 3 and `/medical-guides/nhs-pension-annual-allowance` at rank 9 on `nhs pension annual allowance accountant`: "Two live URL namespaces beyond `/blog/<slug>`, and two pages covering the same topic. Worth a look in stage 2, flagged not diagnosed." **With `/nhs-pension` and `/resources/nhs-pension` added, this is four namespaces on one topic.** Section 6 diagnoses it.

---

## 3. The market's keyword set (copied VERBATIM from the data sheet)

Source: `dataforseo_competitor_data`, site_key='medical', date_pulled='2026-08-26' (32,872 rows, 27 domains, no volume floor). Selection regex for this topic:

```
\bavc\b|\bavcs\b|additional voluntary contribution|additional pension|money purchase avc|nhs pension.*(contact|address|phone|telephone|email|helpline|complaint|overpay)|deferred (nhs )?pension|adult dependant|ill health retirement|tier 2 ill
```

Keywords in topic: **54** | combined volume **31,970** | peer-winnable volume **0** (best position <=10 held by a domain that is not gov.uk / bma.org.uk / *.nhs.uk / MSE / Which) | domains contributing: 3
| **Absent verbatim from this page: 54 of 54. Absent from the whole 105-page corpus: 54.**

Ordered by volume. `On page` = phrase appears verbatim (case and punctuation normalised) in this page's source file. Peer-winnable ORDERS the work, it never excludes any row (owner decision 21, 2026-08-26).

| Vol | Best pos | Held by | Peer-winnable | On page | Anywhere in corpus | Keyword |
|---|---|---|---|---|---|---|
| 4400 | 26 | bma.org.uk | no | **no** | no | nhs pension contact number |
| 4400 | 19 | bma.org.uk | no | **no** | no | nhs pension phone number |
| 4400 | 25 | bma.org.uk | no | **no** | no | nhs pension telephone number |
| 4400 | 31 | bma.org.uk | no | **no** | no | nhs pensions contact address |
| 4400 | 25 | bma.org.uk | no | **no** | no | nhs pensions contact number |
| 390 | 28 | bma.org.uk | no | **no** | no | nhs pension contact email |
| 390 | 20 | bma.org.uk | no | **no** | no | nhs pension email address |
| 320 | 13 | bma.org.uk | no | **no** | no | additional pension contributions |
| 320 | 4 | bma.org.uk | no | **no** | no | additional pension nhs |
| 320 | 11 | bma.org.uk | no | **no** | no | avc nhs pension |
| 320 | 9 | bma.org.uk | no | **no** | no | avcs nhs pension |
| 320 | 66 | bma.org.uk | no | **no** | no | ill health retirement local government pension scheme |
| 320 | 6 | bma.org.uk | no | **no** | no | nhs additional pension |
| 320 | 11 | bma.org.uk | no | **no** | no | nhs avc pension |
| 320 | 7 | bma.org.uk | no | **no** | no | nhs pension additional pension |
| 320 | 15 | bma.org.uk | no | **no** | no | nhs pension avc |
| 320 | 5 | bma.org.uk | no | **no** | no | nhs pensions additional pension |
| 320 | 11 | bma.org.uk | no | **no** | no | nhs pensions avc |
| 260 | 51 | nicholsmedical.co.uk | no | **no** | no | avc nhs |
| 260 | 7 | bma.org.uk | no | **no** | no | nhs additional pension calculator |
| 260 | 65 | nicholsmedical.co.uk | no | **no** | no | nhs avc |
| 260 | 50 | nicholsmedical.co.uk | no | **no** | no | nhs avcs |
| 260 | 4 | bma.org.uk | no | **no** | no | nhs pension additional pension calculator |
| 260 | 18 | bma.org.uk | no | **no** | no | nhs pension address change |
| 260 | 16 | bma.org.uk | no | **no** | no | nhs pension change of address |
| 260 | 15 | bma.org.uk | no | **no** | no | nhs pension scheme change of address |
| 260 | 16 | bma.org.uk | no | **no** | no | nhs pensions change of address |
| 210 | 6 | bma.org.uk | no | **no** | no | additional pension contributions nhs |
| 210 | 8 | bma.org.uk | no | **no** | no | ill health retirement nhs pensions |
| 210 | 58 | bma.org.uk | no | **no** | no | ill health retirement teachers pension |
| 210 | 52 | bma.org.uk | no | **no** | no | ill health retirement teachers pensions |
| 210 | 10 | bma.org.uk | no | **no** | no | nhs pension ill health retirement |
| 210 | 9 | bma.org.uk | no | **no** | no | nhs pensions ill health retirement |
| 170 | 11 | bma.org.uk | no | **no** | no | nhs ill health retirement pension |
| 140 | 6 | bma.org.uk | no | **no** | no | deferred nhs pension |
| 140 | 7 | bma.org.uk | no | **no** | no | nhs deferred pension |
| 140 | 15 | bma.org.uk | no | **no** | no | nhs pension complaints |
| 140 | 18 | bma.org.uk | no | **no** | no | nhs pensions complaints |
| 140 | 20 | bma.org.uk | no | **no** | no | nhs pensions email |
| 140 | 19 | bma.org.uk | no | **no** | no | nhs pensions helpline 0345 telephone number |
| 110 | 9 | bma.org.uk | no | **no** | no | additional pension |
| 110 | 6 | bma.org.uk | no | **no** | no | adult dependant pension |
| 110 | 18 | bma.org.uk | no | **no** | no | nhs pensions helpline 0345 |
| 90 | 8 | bma.org.uk | no | **no** | no | additional voluntary contributions nhs pension |
| 90 | 6 | bma.org.uk | no | **no** | no | nhs pension additional voluntary contributions |
| 90 | 30 | bma.org.uk | no | **no** | no | nhs pension contact details |
| 90 | 30 | bma.org.uk | no | **no** | no | nhs pensions contact details |
| 70 | 32 | bma.org.uk | no | **no** | no | civil service deferred pension |
| 50 | 25 | bma.org.uk | no | **no** | no | nhs pension employer helpline |
| 50 | 17 | bma.org.uk | no | **no** | no | nhs pension overpayment |
| 50 | 31 | bma.org.uk | no | **no** | no | nhs pension overpayments |
| 50 | 28 | bma.org.uk | no | **no** | no | nhs pensions helpline number |
| 50 | 30 | bma.org.uk | no | **no** | no | nhs pensions overpayment |
| 50 | 9 | bma.org.uk | no | **no** | no | what is adult dependant pension |

### 3a. What this 31,970 actually is, and the ruling on each part

**Peer-winnable volume is 0.** Not low. **Zero.** Fifty of the 54 rows are held by bma.org.uk, classified in `competitor_universe_2026-08-26.md` §2b as **unwinnable-authority**: "Trade union / professional body... Ties medicsmoney for breadth and **cannot be outranked on brand**." The other three are nicholsmedical.co.uk (peer rank 10) at positions 50, 51 and 65, which is to say nowhere.

Under owner decision 21 that does **not** exclude the topic. It sequences it. But it does mean the honest framing for this page is: **we are writing to be findable and useful on this vocabulary, not to take a top-three slot from the BMA.** Section 8's expectations are set accordingly.

The 54 rows are five families. Every row is accounted for once and the five sub-totals reconcile to 54 rows / 31,970 volume.

| # | Sub-family | Rows | Volume | Verdict for THIS page |
|---|---|---|---|---|
| 1 | **NHS Pensions contact, address change, helpline, email, complaints, overpayments** | 23 | **24,920** | **ONE BLOCK, POINTER ONLY.** See ruling 1. This is 78% of the headline volume and it is navigational |
| 2 | **AVCs / Additional Pension / Added Pension** | 19 | 5,000 | **YES. This is the page's assigned topic and its real work** |
| 3 | **Ill-health retirement, NHS** | 4 | 800 | **YES.** Dossier NO-PAGE row 22 assigns it here explicitly |
| 4 | **Deferred NHS pension and adult dependant pension** | 4 | 440 | **YES.** Dossier NO-PAGE row 29 assigns it here explicitly |
| 5 | Ill-health / deferred pensions in **other public schemes** (LGPS, Teachers, Civil Service) | 4 | 810 | **NO. Off-niche. Declined with reason** |
| | **Total** | **54** | **31,970** | balances to the data sheet header |

**Ruling 1, the contact vocabulary. This is the hard call in this pack, and the answer is a narrow one.**

Family 1 is 24,920 of the topic's 31,970 volume, and five single rows at 4,400 each account for 22,000 of it. It is people trying to phone NHS Pensions. Three things are true at once:

- **The dossier assigns it here.** NO-PAGE row 13 (`nhs pensions contact address / details`, 6,720 volume, 0 peer-winnable) and row 16 (`pension nhs contact / email`, 3,160, 0 peer-winnable) are both prescribed as "**Section on /nhs-pension**". Row 30 (`nhs pensions complaints / overpayments`, 410) likewise.
- **The committed lane config vetoes exactly this vocabulary.** `sites/medical.discovery.json` `lane_negative_tokens`, admin/directory group, bans `helpline`, `phone-number`, `contact-hmrc`, `government-gateway` and `personal-tax-account`, with the stated reason "HMRC navigation and listing noise" (`competitor_universe_2026-08-26.md` §3a). The taxonomy and the dossier disagree. That is correction C1.
- **We cannot verify the number.** `house_positions.md`'s verification log records that **NHSBSA's own pages (nhsbsa.nhs.uk/member-hub) return HTTP 403 to automated fetches**. A published helpline number we cannot re-verify is a staleness liability on a page a doctor will act on, and the brand risk of a wrong number on an accountant's website is worse than the traffic is worth.

**The ruling: one short block, no reproduced contact details, pointer out.** A single section headed with the market's words that (a) says plainly who to contact for what (NHSBSA for member records, **PCSE for GP pension records in England**, the employer for officer records), (b) links to the NHSBSA member hub rather than transcribing a number, and (c) does the one thing the BMA does not do, which is tell a doctor **what to do when the contact route fails** (see W1). The five 4,400-volume phrasings may appear in that block's prose. **No telephone number, no `0345` string, no postal address may be published.** That is a checkable negative criterion (criterion E).

This is the lazy answer and it is also the right one: it carries the vocabulary, it costs one section, it creates no maintenance burden, and it cannot go stale.

**Ruling 2, AVCs and Additional Pension.** Family 2 is the assigned topic and the page's real work. Note the vocabulary trap in it: **`avc` and `additional pension` are two different products** and the market uses them interchangeably. `house_positions.md` §2.C states both: **Money Purchase AVCs (a separate DC pot)** and **Added Pension (extra DB accrual in-scheme)**, both attracting income-tax relief subject to the annual allowance. bma.org.uk's own additional-pension page (teardown 4.1) **never mentions Money Purchase AVCs at all** while ranking for `avc nhs pension`, `nhs avc pension` and `nhs pensions avc`. **Disambiguating the two, in one table, using both vocabularies, is the single best piece of work available on this page.** See W2.

**Ruling 3, ill health.** Family 3 is dossier NO-PAGE row 22 (`nhs pension ill-health retirement (tier 2)`, 1,000 volume), prescribed as "New section on /nhs-pension". Take it, at **advisory depth only**. `house_positions.md` has **no ill-health section**: §2.E covers partial and early retirement and stops. So the page may name Tier 1 and Tier 2, say what the tax and annual-allowance consequence is, and point to NHSBSA for the medical criteria and the application forms. **Do not write the clinical qualifying criteria or the form numbers from a competitor page** (see criterion D).

**Ruling 4, deferred and adult dependant.** Family 4 is dossier NO-PAGE row 29 (`nhs deferred pension / adult dependant`, 440), prescribed here. Take it, in one short block each. Note this is where the `/blog/nhs-pension-tax-charges-how-to-minimize` equity query `nhs pension death benefit election` also lives; that page owns it (see correction C4) and this page must not duplicate the treatment.

**Ruling 5, other schemes. Declined.** `ill health retirement local government pension scheme` (320), `ill health retirement teachers pension` (210), `ill health retirement teachers pensions` (210), `civil service deferred pension` (70). 810 volume, all bma.org.uk at positions 32 to 66. **The site boundary is drawn by profession** (`competitor_universe_2026-08-26.md` §4): "medical owns the clinician, the practice and the NHS pension". Teachers, local government and civil service pensions are not ours in any sense. Writing them would be scope creep into three schemes we have no house positions for. Declined with reason, named so the count reconciles.

---

## 4. Competitor teardown

**No cap applied.** The data sheet lists 12 competitor URLs and the brief's cap is 12, so **all 12 were fetched. 12 of 12 succeeded, 0 fetch failures.**

Peer classification per `competitor_universe_2026-08-26.md`: **bma.org.uk = unwinnable-authority** (§2b, 15 of 18 head terms, owns `/pay-and-contracts/pensions/pensions-tax/nhs-pension-annual-allowance`, "cannot be outranked on brand"). **medicsmoney.co.uk = peer, rank 1** (§2a). **nicholsmedical.co.uk = peer, rank 10** (§2a, specialist medical accountancy firm).

**Ten of the twelve URLs are bma.org.uk.** That is the shape of this topic in one number and it is why peer-winnable volume is 0.

### 4.1 bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/additional-pension-purchase: 18 kws: UNWINNABLE-AUTHORITY

- **Title / H1** "Additional pension purchase"
- **Words** approx 2,800. **Tables** no. **Calculator** **referenced, not embedded** ("There is an additional pension calculator on the NHS pensions website"). **FAQ** no formal block; **27 question-shaped H2s**.
- **Headings** H2 McCloud and Additional Pension purchases · Eligibility · How do I apply? · I have added years and am likely to have maximum service · I have mental health officer status · Paying for additional pension · How much does it cost? · What payment options are there? · How are contributions collected? · Can I take a break from paying? · Can my employer purchase additional pension on my behalf? · Pension growth · Can additional pension increase my dependents' benefits? · Will it increase my lump sum? · Does additional pension increase in line with inflation? · Tax · Does the contribution attract tax relief? · Will my pension growth count for the purposes of the annual allowance? · Leaving the pension scheme · Voluntary early retirement · Retirement within 12 months of your contract starting · Ill health retirement · Death and retirement · Including dependents' benefits · Personal cover only · Death after retirement · Redundancy · Partial retirement
- **Judgement.** **The definitive page on the topic and the one to study.** 2,800 words, 27 headings, and every heading is a question a member actually asks. It covers the full lifecycle: buy it, pay for it, what happens if you stop, what happens if you leave, die, retire early, retire ill, get made redundant. Two headings are directly ours: "**Does the contribution attract tax relief?**" and "**Will my pension growth count for the purposes of the annual allowance?**". Those are accountant questions on a union page, answered at union depth.

  **Its one large omission is our opening.** It is titled "Additional pension purchase" and it **never mentions Money Purchase AVCs**, yet it holds `avc nhs pension`, `nhs avc pension`, `nhs pensions avc`, `avcs nhs pension` and `nhs pension avc` (1,600 volume across five rows). It ranks on the AVC vocabulary while answering a different product's question. **A doctor searching "NHS AVC" and landing there gets an answer about Added Pension and does not learn that a separate DC AVC exists.** That is W2.

  Also note it **points at a calculator on the NHS Pensions website rather than having one**, while holding `nhs additional pension calculator` (260, pos 7) and `nhs pension additional pension calculator` (260, pos 4). **We have a calculator on this very page.** That is W3.

### 4.2 nicholsmedical.co.uk/news/increasing-an-nhs-pension/: 12 kws: PEER

- **Title** "Increasing an NHS Pension: Unlocking your benefits - Nichols Medical Accountants" · **H1** same
- **Words** approx **800**. **Tables** no. **Calculator** no. **FAQ** no.
- **Headings** H2 Increasing an NHS Pension: Unlocking your benefits · H3 Additional Pension: Boosting Your Annual Benefits · H3 Bigger Lump Sum Purchase: Maximising Your Retirement Payout · H3 Half-Cost Added Years: Reaping the Benefits of Past Membership · H3 **Money Purchase Additional Voluntary Contributions (MPAVC): Building a Separate Retirement Fund** · H3 Tax Implications: Navigating the Financial Landscape · H3 Conclusion · H2 Need advice on this topic? · H2 Why not book a meeting to discuss? · H3 Article written by · H2 Share this news item · H2 Continue reading · H2 Stay up to date with our latest news
- **Judgement.** **The only competitor page in the set that does the disambiguation, and it is 800 words long.** It names four distinct routes to a bigger NHS pension side by side: Additional Pension, Bigger Lump Sum purchase, Half-Cost Added Years, and **MPAVC**. That structure is correct and it is why a firm ranked 10th in the universe holds `avc nhs`, `nhs avc` and `nhs avcs` at positions 50 to 65 (badly, but it holds them where the BMA's 2,800-word page does not use the word).

  What it gets wrong: "Tax Implications" is one paragraph and does not engage the annual allowance properly, which is the entire reason a high-earning doctor should hesitate before buying Additional Pension. It has no calculator, no table, no FAQ, and four of its thirteen headings are site furniture. **This is the template to beat, and beating it requires depth we already have on the annual allowance.**

### 4.3 bma.org.uk/pay-and-contracts/pensions: 7 kws: UNWINNABLE-AUTHORITY

- **Title / H1** "Pensions"
- **Words** approx 2,100. **Tables** no. **Calculator** no (external modelling tools linked). **FAQ** no.
- **Headings** H2 Retirement · H2 Pensions tax · H2 Glossary of pensions terms · H2 Additional pensions advice (H3 Doctor categories / Going on leave / In the event of death / Leaving the pension scheme / 2015 NHS pension scheme / Non-NHS pension schemes / External modelling tools) · H2 We campaign for you · H2 The BMA pensions department · H2 Latest pensions news
- **Judgement.** A **hub**, and the architecture is the lesson. Seven subtopic groups, organised by **member life event** (going on leave, in the event of death, leaving the scheme) rather than by tax concept. It holds seven of our rows purely as a hub. Note "Glossary of pensions terms" as a named H2: the BMA treats vocabulary as a first-class asset on this topic. Our page has no glossary and no hub function.

### 4.4 bma.org.uk/pay-and-contracts/pensions/retirement/ill-health-retirement-and-your-pension: 6 kws: UNWINNABLE-AUTHORITY

- **Title / H1** "Ill health retirement and your pension"
- **Words** approx **6,500**, the longest page in the set. **Tables** no. **Calculator** no. **FAQ** yes, 15+ Q&A pairs.
- **Headings** H2 The McCloud remedy · H2 Qualifying conditions for ill health retirement (H3 How do I qualify for ill health retirement?) · H2 How to apply to retire on ill health grounds (H3 If you are an active member / If you are a deferred member / If you are terminally ill / If you are under the normal pension age / If you are over the normal pension age / If you are a resident doctor) · H2 Criteria glossary · H2 Applying for ill health retirement · H2 Outcomes of your application and appeal · H2 Payment of your pension · H2 Working after ill health retirement · H2 Rejoining the pension scheme · H2 Glossary · H2 Contact BMA pensions
- **Content** Explains **Tier 1** ("permanently incapable of carrying out the duties of your own job", no enhancement) and **Tier 2** ("permanently incapable of engaging in regular employment of like duration", enhanced by 50% of prospective service, stricter criteria, restrictions on post-retirement work). Names **form AW33E** (active members) and **AW240P** (deferred members), and notes that deferred applicants are assessed against Tier 2 criteria but receive Tier 1 benefits if successful.
- **Judgement.** **6,500 words and a criteria glossary. This is not winnable and it should not be attempted.** It is also a clinical-eligibility page, and we are accountants. **The specific instruction to the writer: do not reproduce the Tier 1/Tier 2 criteria wording, the AW33E/AW240P form numbers, or the 50% enhancement figure from this teardown.** None of them is in `house_positions.md`. Our ill-health block (ruling 3) says what the **tax and annual-allowance** consequence of ill-health retirement is, names Tier 1 and Tier 2 as the two tiers so the vocabulary matches, and points to NHSBSA. Two paragraphs, not 6,500 words.

### 4.5 bma.org.uk/pay-and-contracts/pensions/bma-pensions-department/the-bma-pensions-department: 5 kws: UNWINNABLE-AUTHORITY

- **Title** "BMA pensions department" · **H1** "The BMA pensions department"
- **Words** approx 900. **Tables** no. **Calculator** no. **FAQ** no.
- **Headings** H2 Contact BMA pensions · H2 What we do · H2 Your eligibility for services · H2 Case handling (H3 Your rights / H3 Our rights)
- **Contact details published:** **BMA's own only** (a webform and an obfuscated email). **No NHS Pensions phone number, email or postal address anywhere on the page.**
- **Judgement.** **This is the most useful single finding in the whole teardown, and it validates ruling 1.** The page that ranks for `nhs pension contact number`, `nhs pensions contact details` and `nhs pension employer helpline` **does not publish an NHS Pensions contact number**. It ranks for the contact vocabulary by being a "contact us about your pension" page for a membership body. Its whole structure is: here is who we are, here is what we will do for you, here is who is eligible, here is how we handle your case.

  **So the 22,000-volume contact family is not won by publishing a phone number.** It is won by being the page a doctor lands on when the official route has failed them. That is exactly what ruling 1 prescribes and exactly what W1 describes.

### 4.6 bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/death-after-leaving-the-nhs-pension-scheme: 4 kws: UNWINNABLE-AUTHORITY

- **Title / H1** "Death after leaving the NHS pension scheme"
- **Words** approx 2,400. **Tables** no. **Calculator** no. **FAQ** no formal block; all H3s are questions.
- **Headings** H2 Lump sum (H3 How much lump sum is payable if I have a deferred pension? / How is the lump sum taxed?) · H2 **Ongoing adult dependant pension following death in deferment** (H3 What if I die within 12 months of leaving the NHS with less than 2 years' service? / ...with more than 2 years' service? / What if I die after 12 months of leaving the NHS with more than 2 years' service? / What if I am separated from my legal spouse and have a new partner?) · H2 Children dependant pension following death in deferment (H3 five further scenario questions)
- **Judgement.** The page behind `adult dependant pension`, `what is adult dependant pension`, `deferred nhs pension` and `nhs deferred pension` (family 4). It is a **scenario matrix**: every H3 is "what if X". The "separated from my legal spouse and have a new partner" question is the one nobody else asks and the one that actually matters. **Ours takes the deferred and adult-dependant vocabulary in two short blocks and points here for the scenario matrix**; there is no case for reproducing a nine-branch decision tree on a service page. The one thing we add that this page does not: **the tax treatment of the lump sum against the LSDBA**, which is squarely `house_positions.md` §2.B ground.

### 4.7 bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/transferring-money-out-of-the-nhs-pension-scheme: 4 kws: UNWINNABLE-AUTHORITY

- **Title / H1** "Transferring money out of the NHS pension scheme"
- **Words** approx 1,800. **Tables** no. **Calculator** no. **FAQ** no.
- **Headings** H2 Transferring benefits out of the NHS pension scheme · Moving to a different UK nation · Transferring your NHS pension abroad · Time limits (H3 If you have missed the time limit) · How to apply for a transfer out · Public Sector Transfer Club · Transferring out to a Non-Club scheme · **Annual Allowance** · **NHS Pension Scheme Additional Voluntary Contribution (AVC) plan** · Refund of contributions
- **Judgement.** Holds four of our rows including AVC vocabulary, from a single H2 near the bottom stating that **AVC plans can transfer independently of the main scheme benefits**. That is a genuinely useful, genuinely obscure fact and it belongs in an AVC-versus-Added-Pension comparison: the DC pot is portable, the DB accrual is not. It also states "HMRC Annual Allowance limit currently sits at £60,000", which matches `house_positions.md` §2.B. **Transfers out are not this page's topic** (three UK schemes, the Public Sector Transfer Club, overseas transfers, all regulated-advice territory) and are declined, but the **AVC portability point is taken**.

### 4.8 bma.org.uk/pay-and-contracts/pensions/retirement/significant-concerns-over-nhs-pension-scheme-maladministration: 3 kws: UNWINNABLE-AUTHORITY

- **Title** "Significant concerns over NHS pension scheme maladministration - Retirement - BMA" · **H1** "Significant concerns over NHS pension scheme maladministration"
- **Words** approx 950. **Tables** no. **Calculator** no. **FAQ** no.
- **Headings** H2 NHS pension scheme members are being let down... · H2 NHS Business Services Authority - England & Wales (H3 McCloud delays / Total Reward Statement (TRS) / Payment of pension to those retiring) · H2 Scottish Public Pension Agency update - Scotland · H2 HSC Pension Service update - Northern Ireland
- **Judgement.** A campaigning page, and it holds `nhs pension complaints` / `nhs pensions complaints`. It documents **McCloud statement delays, Total Reward Statements unavailable to hundreds of thousands, first pension awards delayed beyond the 30-day target**, and escalation to DHSC and the Pensions Regulator. **This is news-cycle content and we must not chase it**: dossier §8 screened 73 news-cycle keywords for exactly this reason, and a campaigning page dated to a 2024 deadline goes stale immediately.

  **But it corroborates the most valuable fact in `house_positions.md` §2.D**: "**NHSBSA statements are routinely late and revised**", which is why the Scheme Pays extended limb (a revised pension savings statement issued on or after 2 May giving the earlier of 3 months from that statement or 6 years from the end of the tax year) is "the limb NHS members most often need". **That is the bridge from the complaints vocabulary to something we can actually help with, and it is W1.**

### 4.9 bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/guidance-for-gps-in-england-on-getting-your-pension-record-up-to-date: 2 kws: UNWINNABLE-AUTHORITY

- **Title / H1** "Guidance for GPs in England on getting your pension record up to date"
- **Words** approx 2,100. **Tables** no. **Calculator** no. **FAQ** no.
- **Headings** H2 Background · H2 A step by step guide to ensure you have accurate pension records (H3 1. Request information about your pension from NHS Pensions / 2. Check your PCSE Pensions Online Portal and submit the required forms / 3. Raise a complaint with PCSE / 4. Escalate the complaint to NHS England / 5. Seek compensation as a result of maladministration by PCSE / 6. Ask for the Pensions Ombudsman's help / 7. Report PCSE to the Pensions Regulator / 8. BMA Pensions Department)
- **Content** Names **Type 1 and Type 2 forms**, **PCSE's Pensions Online system**, a **40 calendar day** PCSE complaint-resolution deadline and a **90 day** case-closure threshold.
- **Judgement.** **The most directly competitive page in the whole set, and the only one that maps onto our own strongest lane.** It is an **eight-step escalation ladder** for a GP whose pension record is wrong: request, check, complain, escalate, compensation, Ombudsman, Regulator, union. That is the "what to do when the official route fails" content that ruling 1 identifies as the way into the 24,920-volume contact family, and the BMA already has it.

  Note where it collides with us. `sites/medical.discovery.json` lane 1 is **`pension_admin_pcse`** and is placed first in list order precisely so PCSE and form vocabulary beats the generic `nhs-pension` token. `/blog/gp-practice-income-pcse-statement-reconciliation` is our **highest-Bing-equity page on the entire site (17 clicks / 261 impressions)** and grades EXTEND. **The PCSE escalation ladder is that page's ground, not this one's**, and this page's contact block must link to it rather than reproduce it. That is criterion F.

  Note also the **40 calendar day** and **90 day** figures: they are BMA-stated, not in `house_positions.md`, and must not be reproduced without source verification.

### 4.10 medicsmoney.co.uk/nhs-pension-scheme-guide-by-medics-money/: 1 kw: PEER (rank 1 peer)

- **Title** "NHS Pension Scheme - Guide by Medics Money" · **H1** "NHS Pension Scheme Guide"
- **Words** approx 3,200. **Tables** **yes, 4** (contribution rates England and Scotland, normal retirement ages by section, tier structures). **Calculator** no. **FAQ** **yes, 13+ questions**.
- **Headings** H2 How the NHS Pension works · H2 What is a pension and why is the NHS Pension different? (H3 The NHS Pension is different to most other pensions – in a good way) · H2 How does the NHS Pension actually work? · H2 How much does it cost to join the NHS Pension? · H2 When can I retire? · H2 **How can I retire early? Can I buy additional pension? What's an ERRBO?** · H2 What is the McCloud judgment and what do doctors need to do about it? · H2 NHS Pension FAQs (H3, 10+ subsections)
- **Coverage** AVCs / additional pension: mentioned in one heading, thin. Ill-health: linked out. Deferred pension: **not covered**. NHS Pensions contact: portal links only, no numbers.
- **Judgement.** **The strongest peer's flagship pension page, and it holds exactly ONE of our 54 rows.** That is the finding. Medics Money owns the "how does the NHS pension work" ground with 3,200 words, 4 tables and a 13-question FAQ, and it has essentially nothing on AVCs, nothing on deferred pensions, nothing on the administrative vocabulary. **The administrative and additional-pension ground is unoccupied by any peer.** Its four tables and its FAQ block are the format lesson: on this topic the market rewards tables and question-shaped headings, and our page currently has neither.

  Its "How can I retire early? Can I buy additional pension? What's an ERRBO?" H2 is a three-question mash, which is bad structure and a reminder that even the best peer is beatable on organisation.

### 4.11 bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/civil-service-pension-scheme-alpha-scheme: 1 kw: UNWINNABLE-AUTHORITY

- **Title / H1** "Civil service pension scheme – Alpha scheme"
- **Words** approx 550. **Tables** **yes, 2** (member contribution rates, employer contribution rates). **Calculator** no. **FAQ** no.
- **Headings** H2 About the Alpha scheme · H2 Member contribution rates (H3 1 April 2024 - 31 March 2025) · H2 Employer contribution rates (H3 1 April 2024 - 31 March 2027)
- **Judgement.** **Not the NHS scheme.** Holds `civil service deferred pension` (70). Declined under ruling 5. Recorded, not dropped. Worth one observation: the page is a 550-word two-table page and it ranks, which is the same "tables plus the right words" pattern as 4.10.

### 4.12 bma.org.uk/pay-and-contracts/pensions/additional-pensions-advice/local-government-pension-scheme: 1 kw: UNWINNABLE-AUTHORITY

- **Title / H1** "Local government pension scheme"
- **Words** approx 3,200. **Tables** no. **Calculator** no. **FAQ** yes, approx 18 Q&A pairs.
- **Headings** H2 Eligibility · H2 Calculating your pension (6 H3 questions) · H2 Your employer (2 H3s) · H2 Retiring (4 H3s) · H2 Transferring pension · H2 **Ill health retirement** (H3 How is my pension calculated if I need to retire from ill health? / What if there is a chance I will be able to work again after 3 years? / What if I am likely to be able to work again?) · H2 Death benefits (6 H3s) · H2 **Increasing your pension** (H3 How does additional pension work? / What increases will apply to my pension?)
- **Judgement.** **Not the NHS scheme.** Holds `ill health retirement local government pension scheme` (320) and is declined under ruling 5. It is included in full because its **architecture is the best model in the entire teardown for what our page should become**: eligibility, calculating, your employer, retiring, transferring, ill health, death benefits, increasing your pension. Eight life-stage H2s, each expanded by question-shaped H3s, ~18 FAQ pairs. **That is the shape of a complete scheme service page.** We are not writing an LGPS page; we are noting that the BMA's own answer to "how do you structure a public-sector pension page" is on display here and it is not what our `/nhs-pension` currently does.

### 4.13 Coverage checklist: union of competitor heading themes, minus ours

Union of the 12 teardowns, deduplicated to themes, with the decision required by §9.9 floor 8. **The count of undecided themes must be zero at QA.**

| # | Heading theme | On our page now | Decision |
|---|---|---|---|
| 1 | Annual allowance, taper, threshold vs adjusted income | **yes** (`whenYouNeedHelp`[0], `commonMistakes`[2], JSON-LD description) | **KEEP.** Section 5, KEEP-1 |
| 2 | Carry forward | **yes** (`commonMistakes`[1], "What you get"[2]) | **KEEP.** Section 5, KEEP-2 |
| 3 | Scheme Pays | **yes, named only** (`whenYouNeedHelp`[3], "What you get"[3], JSON-LD `offerItems`) | **KEEP AND DEEPEN.** No deadline stated anywhere. Section 6, defect 4 |
| 4 | An embedded annual-allowance calculator | **yes** (`CalculatorClient slug="nhs-pension-annual-allowance"`) | **KEEP. This is the page's single biggest structural asset.** Section 5, W3 |
| 5 | **Additional Pension purchase: eligibility, cost, payment options, breaks** | no | **COVER.** The assigned topic. Family 2 |
| 6 | **Money Purchase AVCs as a distinct product** | no | **COVER, and this is the differentiator.** W2 |
| 7 | Added years / half-cost added years | no | **COVER at one line** inside the comparison, for vocabulary completeness |
| 8 | Bigger lump sum purchase | no | **COVER at one line** inside the comparison |
| 9 | Does additional pension attract tax relief? | no | **COVER.** Accountant question, §2.C ground |
| 10 | **Does additional pension count towards the annual allowance?** | no | **COVER, in depth. This is the page's best answer**, because it joins the assigned topic to the depth we already have |
| 11 | ERRBO | no | **COVER at one line.** §2.E names it |
| 12 | **NHS Pensions contact, address change, email, helpline** | no | **COVER as ONE pointer block, no details published.** Ruling 1, criterion E |
| 13 | **Complaints, overpayments, maladministration** | no | **COVER as part of block 12**, framed as "what to do when the record is wrong" |
| 14 | The PCSE escalation ladder for GPs | no | **DECLINED WITH REASON.** Lane 1 (`pension_admin_pcse`) ground, owned by `/blog/gp-practice-income-pcse-statement-reconciliation` (our top Bing page, EXTEND). Link, do not reproduce. Criterion F |
| 15 | **Ill-health retirement, Tier 1 and Tier 2** | no | **COVER at advisory depth only.** Ruling 3. Vocabulary and tax consequence, not clinical criteria or form numbers |
| 16 | **Deferred NHS pension** | no | **COVER, one short block.** Ruling 4 |
| 17 | **Adult dependant pension** | no | **COVER, one short block.** Ruling 4 |
| 18 | Children's dependant pension scenario matrix | no | **DECLINE.** Nine-branch decision tree, not a service page's job. Link to 4.6 |
| 19 | Death benefits and the LSDBA | no | **COVER at one line** inside block 17. §2.B ground |
| 20 | Transferring out, Public Sector Transfer Club, overseas | no | **DECLINE.** Regulated-advice territory, and not this page's topic |
| 21 | AVC plans transfer independently of main scheme benefits | no | **COVER at one line** inside the AVC comparison. Taken from 4.7 |
| 22 | Refund of contributions | no | **DECLINE.** Owned by `/blog/nhs-pension-tax-charges-how-to-minimize` in this same batch. Criterion F |
| 23 | McCloud remedy | no | **COVER at one line with a link.** Every BMA pension page opens with it; ours should acknowledge it and point to `/blog/mccloud-remedy-nhs-pension-doctors-explained` |
| 24 | The three scheme sections (1995 / 2008 / 2015 CARE) | no | **COVER at one line.** §2. Currently absent, which is a real gap on a page called "NHS Pension" |
| 25 | Tiered member contribution rates | no | **DECLINE.** Owned by `/calculators/nhs-superannuation-tiered-contribution`. Bands were uplifted 1 April 2026 and can move retrospectively in-year (§2.C), so this is a maintenance liability on a service page |
| 26 | Partial / flexible retirement | no | **COVER at one line with a link** to `/blog/nhs-pension-partial-retirement-doctors-guide`. §2.E |
| 27 | Glossary of pension terms | no | **DECLINE this pass.** Good idea (4.3, 4.4 both have one), but it is a separate build |
| 28 | An FAQ block | **no** | **COVER.** 4.10 has 13+, 4.12 has 18, and we have zero. See 1a for how |
| 29 | Tables | **no** | **COVER, at least one.** The AVC-vs-Added-Pension comparison is naturally a table, and 4.10 / 4.11 both show tables ranking |
| 30 | Ill-health / deferred provisions in LGPS, Teachers, Civil Service | no | **DECLINED WITH REASON.** Ruling 5, off-niche by profession boundary |
| 31 | Our service process, what you get, common mistakes | **yes** | **KEEP.** Section 5, KEEP-3 |

Undecided themes: **0**.

---

## 5. Whitespace

What no competitor covers well, stated so a writer can quote it back.

**W1. Nobody joins "I cannot get hold of NHS Pensions" to "and here is the tax deadline you are about to miss because of it."** The BMA has the complaints page (4.8), the escalation ladder (4.9) and the contact page that publishes no contact details (4.5). What none of them does is close the loop with the consequence. `house_positions.md` §2.D: the Scheme Pays election deadline is **extended** where a revised pension savings statement is issued **on or after 2 May**, to the earlier of **3 months from that statement or 6 years from the end of the tax year**, and the house position states in terms that late and revised NHSBSA statements are "**the normal case, not the exception**". The BMA's own maladministration page (4.8) independently documents that statements are not arriving.

**So: a doctor searching `nhs pension contact number` at 22,000 volume a month is frequently a doctor who cannot get a statement, and the thing they actually need to know is that the missing statement moves their tax deadline.** That sentence exists on no page in this teardown. It is the only defensible reason for an accountancy firm to write to the contact vocabulary at all, and it converts, which a phone number does not.

**W2. Nobody disambiguates Money Purchase AVCs from Added Pension in the market's own words.** The BMA's 2,800-word additional-pension page (4.1) ranks for five AVC phrasings and **never says "AVC"**. Nichols (4.2) names MPAVC in 800 words and does not engage the tax. `house_positions.md` §2.C carries both in one sentence: "**Money Purchase AVCs (a separate DC pot) and Added Pension (extra DB accrual in-scheme) attract income-tax relief subject to the annual allowance.**"

A short table with rows for **what you are buying** (DC pot vs DB accrual), **who bears the investment risk**, **does it count against the annual allowance** (both do, as pension input), **is it portable on leaving** (the DC pot transfers independently, per 4.7; the DB accrual does not), **what happens on ill-health or early retirement**, and **is there a calculator** is: the assigned topic answered, six market phrasings placed, and a fact no competitor states. **This is the highest-value 400 words available on this page.**

**W3. We have a working calculator and the BMA does not.** `competitor_universe_2026-08-26.md` and `REWRITE_PROGRAM.md` §9.12 both mark **page shape (a tool with a working form) as a LIVE LEVER**, corroborated twice. bma.org.uk holds `nhs additional pension calculator` (260, **position 7**) and `nhs pension additional pension calculator` (260, **position 4**) while **pointing at a calculator on someone else's website** (4.1). Our page has `<CalculatorClient slug="nhs-pension-annual-allowance" />` embedded under an anchor with a hero CTA pointing at it.

**Two of the four peer-winnable-shaped opportunities on this whole topic are calculator queries held by a page that does not have a calculator.** The instruction is narrow and cheap: the calculator section's H2 and its introductory copy must carry the **additional pension** vocabulary alongside the annual-allowance vocabulary, so that the tool is findable on both. That is one heading and two sentences.

**W4. Nobody prices Additional Pension against the annual allowance for a high earner.** The BMA asks the right question ("Will my pension growth count for the purposes of the annual allowance?") and answers it at union depth. For a consultant or GP partner already inside the taper (threshold income above £200,000 and adjusted income above £260,000, §2.B), **buying Additional Pension increases the pension input amount, which increases adjusted income, which tightens the taper further, which can make an AA charge worse.** That is a real, specific, counter-intuitive trap and it is the exact intersection of the assigned topic and the depth this site already has. No competitor page in the set makes it.

**W5. Nobody covers deferred-member ill health.** 4.4 mentions in passing that deferred applicants are assessed against Tier 2 criteria but receive Tier 1 benefits if successful. A doctor who has left NHS practice, has a deferred pension and becomes ill is in a genuinely obscure corner, and it is the intersection of families 3 and 4 which we are taking both of. One paragraph, framed as "this is where you need advice", is defensible and differentiated.

### Depth on our page worth keeping, marked KEEP

- **KEEP-1** The annual-allowance and taper framing across `whenYouNeedHelp`[0] and `commonMistakes`[2]: the £200,000 / £260,000 / £60,000-to-£10,000 structure and the threshold-versus-adjusted-income distinction. It is correct against §2.B and it is the foundation W4 builds on.
- **KEEP-2** The carry-forward points in `commonMistakes`[1] and "What you get"[2].
- **KEEP-3** The three-part service architecture: `whenYouNeedHelp` (4 qualifying scenarios), `commonMistakes` (4 errors), `processSteps` (3 numbered steps), "What you get" (5 deliverables). This is a **service page** and that structure is why. No competitor in the set has a comparable qualify-diagnose-deliver spine, because none of them is selling a service. **Do not dissolve it into an explainer.**
- **KEEP-4** `whenYouNeedHelp`[3] "You've received an annual allowance charge" as a qualifying scenario. It is the highest-intent entry point on the page.
- **KEEP-5** The embedded calculator, its `id="calculator"` anchor and the hero CTA that targets it. W3.
- **KEEP-6** `buildServicePageSchema` with `provider` resolving to the canonical Organization `@id`, and the `suppressJsonLd` Breadcrumb (which avoids a duplicate BreadcrumbList). Both are correct; do not disturb them.

**None of the above is traded away to make room for the administrative vocabulary.** §9.3: the specialist tail is the differentiator; the plain-language layer goes *above* the depth.

---

## 6. Our current page, read honestly

**File** `Medical/web/src/app/nhs-pension/page.tsx` · 257 lines · **1,326 words** including all JSX, imports and Tailwind class strings (`wc -w`). **Actual reader-facing prose is approximately 620 words.**

- **Meta title** "NHS Pension Annual Allowance Planning | Tapered Allowance Calculator" (68 chars, **over the 60-char guideline**)
- **Meta description** "NHS pension annual allowance planning for GPs and consultants. Calculate your tapered allowance, avoid unexpected tax charges, and optimize pension contributions. Expert medical accountants."
- **H1** "NHS Pension Annual Allowance Planning"
- **H2 sequence** (5) When you need specialist NHS pension advice · Common NHS pension mistakes · Calculate your annual allowance · Our NHS pension planning process · What you get
- **H3s** 11, all generated from the three arrays (4 + 4 + 3)
- **FAQ** none. **Tables** none. **Calculator** yes.
- **Internal links** **two**: `/contact` and `#calculator`. Plus `CTASection` at the foot.

### Verdict: it is thin, it is off-topic for its assigned cluster, and it is the weakest of the three pages in this batch.

**620 words of prose on a top-level service page for the highest-authority contested lane in the niche.** For comparison, the twelve competitor pages torn down above average roughly 2,200 words, and the two that matter most run 2,800 and 3,200.

**It is not an NHS Pension page. It is an annual-allowance page wearing the `/nhs-pension` URL.** Every one of its five H2s, all four `whenYouNeedHelp` entries, three of four `commonMistakes`, the calculator, and all five `offerItems` are annual allowance and taper. There is nothing on the 1995 / 2008 / 2015 sections, nothing on tiered contributions, nothing on AVCs or Additional Pension (its assigned topic), nothing on ill health, nothing on deferred benefits, nothing on dependants, nothing on McCloud, nothing on partial retirement, nothing on Scheme Pays deadlines. It contains **0 of the 54 phrasings** in section 3.

**Two internal links on a top-level hub URL** is the other structural failure. A page at `/nhs-pension` should be the entry point to the nine NHS-pension pages this site owns; it links to none of them.

### The cannibalisation reading, stated plainly

This is the fourth namespace on one topic and the collision is not theoretical, it is literal:

| URL | Renders | Note |
|---|---|---|
| `/nhs-pension` | **`CalculatorClient slug="nhs-pension-annual-allowance"`** | THIS PAGE |
| `/calculators/nhs-pension-annual-allowance` | the same calculator slug | dossier §3, REFRAME, B 0c/13i |
| `/medical-guides/nhs-pension-annual-allowance` | the guide treatment | dossier §3, REFRAME, B 1c/3i; dossier §7 calls this "tie, same slug two namespaces" |
| `/blog/nhs-pension-annual-allowance-complete-guide` | the long-form post | **FROZEN to 2026-09-10** |
| `/resources/nhs-pension` | `content/resources/nhs-pension.md` | **0 clicks / 49 impressions / pos 13.5** on Google, 90d. Section 2a |

**Two live URLs render the same calculator.** Per §5 of the working agreement none of these is ever collapsed; they are **differentiated**. The differentiation this rewrite must establish, and which the dossier §7 rule already dictates: **`/nhs-pension` is the service page for the whole scheme, with a tool on it. It is not the annual-allowance page.** Narrowing its annual-allowance framing and broadening it to the scheme is therefore not just a keyword exercise; it is the fix for a four-way collision.

### What is stale, wrong or unverified, checked against `house_positions.md`

| # | Location | Problem | House position |
|---|---|---|---|
| 1 | Meta description, `processSteps`[1] title "Contribution optimization" and body, `processSteps`[2] body, "What you get"[4] "managing your pension contributions", `whenYouNeedHelp`[3] "contribution planning" | **SUBSTANTIVE FRAMING ERROR, and it is the worst defect on the page.** The page repeatedly frames the service as optimising **pension contributions**. The NHS scheme is **defined benefit**: the annual allowance measures the **pension input amount**, the capitalised growth in benefits, **not** the contributions taken from pay. A doctor cannot "optimise contributions" to manage an AA charge; tiered contributions are set by pensionable pay | §2.B: "**Emphasise that pension growth (input amount), not contributions, is measured.**" §2: use 1/54th and CPI+1.5% exactly. Our own blog page `/blog/nhs-pension-tax-charges-how-to-minimize` gets this right in its first body paragraph. **Rewrite every "contribution" framing to "pension growth / pension input amount"**, keeping "contributions" only where it is literally correct (tiered member contributions, AVC contributions) |
| 2 | `whenYouNeedHelp`[0], JSON-LD `description`, `commonMistakes`[1] ("previous 3 years") | **NO TAX-YEAR TAG on any figure.** £200k, £260k, £60k, £10k, "40% or 45%" all appear untagged | §2.B: "use £60,000 / £200,000 threshold income / £260,000 adjusted income / £10,000 floor / £10,000 MPAA exactly, **each tagged 2026/27**". The numbers are right; the tags are absent. Add **2026/27** |
| 3 | `whenYouNeedHelp`[0] "£200k+ income", "£60k to as low as £10k" | **Abbreviated figures.** "£200k" and "£60k" rather than £200,000 and £60,000, in a heading a doctor will act on | §2.B requires the exact figures. Write them in full at least once each |
| 4 | `whenYouNeedHelp`[3], "What you get"[3], JSON-LD `offerItems`[3] | **Scheme Pays is named four times and explained nowhere.** No mandatory-versus-voluntary distinction, no £2,000 threshold, no 31 July deadline, and **no mention of the extended limb** | §2.D: distinguish mandatory (charge > £2,000 AND scheme input > £60,000) from voluntary; state the 31 July deadline with a worked example (**2026/27 charge to 31 July 2028**); "**always** mention the extended 3-month limb for a revised statement issued on or after 2 May". This is a named house-position omission on a service page selling "Scheme Pays election review" |
| 5 | `whenYouNeedHelp`[2] "opting out of the pension scheme has complex implications" | Correct in direction but bare. No mention of what is forfeited (CARE accrual at 1/54th, death-in-service cover, ill-health protection), and no mention of **partial retirement** as the better-understood alternative | §2.E. One clause plus a link to `/blog/nhs-pension-partial-retirement-doctors-guide` |
| 6 | Meta description, `processSteps`[1] title, `processSteps`[1] body, `commonMistakes` bodies, "What you get" items | **US spellings throughout**: "optimize", "optimization", "modeling", "utilize". The rest of the estate is UK English | House style. `Medical/web/content/blog/nhs-pension-tax-charges-how-to-minimize.md` uses "Minimise" in its `h1` while its `title` uses "Minimize", so this inconsistency is not unique to this file, but it should be fixed here |
| 7 | Meta title, 68 characters | Over the 60-character guideline and likely truncating in SERPs | Not a house position. Fix while the file is open |
| 8 | `processSteps`[2] "We provide **quarterly reviews**" | **A service promise stated as fact.** This is a commercial commitment, not a tax position | Not a house-position issue. Flagged for the owner: do not restate or escalate a delivery cadence the firm has not confirmed. If in doubt, soften to "ongoing review through the year" |
| 9 | `commonMistakes`[3] "Private practice income affects both your threshold income and your ability to make pension contributions" | The second half is muddled. Private income does not affect an ability to make NHS contributions; it is **not NHS-pensionable at all** | §2.C: "a limited company cannot hold a GMS/PMS contract, and income routed through a company is not NHS-pensionable"; for a consultant "only the NHS employment is pensionable". Rewrite to the pensionability point, which is both correct and a stronger selling point |
| 10 | Hero `<Image>` `src` | An external `images.unsplash.com` URL with `?w=2000&q=85` | Not a content defect. Noted only so the writer does not accidentally break it; leave it alone |
| 11 | Whole file | **No FAQ, no table, no glossary, and only two internal links.** Competitors in this topic average ~2,200 words with FAQs and tables | Structural. Criterion G |

### Arithmetic on the page

**There is none.** No worked example anywhere: the taper is described but never computed. `arithmetic_recomputed[]` at QA is therefore the figure set re-read at source (criterion D), not derived sums.

**If the writer adds the taper arithmetic** (recommended; it is the obvious missing proof on a page with a taper calculator), the inputs must be stated inline and the assertion must be re-derivable: standard AA £60,000, adjusted-income limit £260,000, reduction of £1 for every £2 above, floor £10,000, therefore the floor is reached at adjusted income of 260,000 + 2 × (60,000 − 10,000) = **£360,000**. That figure is already used correctly on `/blog/nhs-pension-tax-charges-how-to-minimize` and must match.

### What is worth keeping

Everything in section 5, KEEP-1 to KEEP-6.

---

## 7. Deterministic acceptance criteria

Countable and checkable at QA. Every criterion below either passes or names what failed.

### A. Equity preservation (§9.9 floor 5): passes vacuously, with one condition

The DO-NOT-LOSE set is **empty**: 0 Google query rows, 0 Bing query rows. **Count: 0 of 0.** Floor 5 passes.

**Condition.** Before QA signs off, confirm the page-level Google figure in `gsc_page_rows.json` for `/nhs-pension`, as the data sheet itself instructs. **Confirm it separately from `/resources/nhs-pension`, which is a different URL and does have page-level Google data (0 clicks / 49 impressions / position 13.5, 90d to 2026-08-26).** Reading one for the other would fabricate equity that does not exist on this URL.

### B. Named phrasings that must appear verbatim (§9.9 floor 6)

Drawn from the `On page = no` rows of section 3, prioritised by the 3a ruling (assigned families first, then volume) since **peer-winnable volume is 0 and cannot order anything**. **Count: 22 phrases must appear verbatim.**

Tier 1, AVC / Additional Pension, the assigned topic (10, mandatory; **at least 3 in the meta title, H1, an H2 or an H3**):
1. `nhs additional pension` · 2. `additional pension nhs` · 3. `nhs pension additional pension` · 4. `nhs pensions additional pension` · 5. `avc nhs pension` · 6. `avcs nhs pension` · 7. `nhs avc pension` · 8. `nhs pension avc` · 9. `nhs pensions avc` · 10. `additional pension contributions`

Tier 2, the calculator pair (2, mandatory, **both in or immediately around the calculator section**, per W3):
11. `nhs additional pension calculator` · 12. `nhs pension additional pension calculator`

Tier 3, ill health, deferred and dependant, both assigned NO-PAGE rows (6, mandatory):
13. `nhs pension ill health retirement` · 14. `nhs pensions ill health retirement` · 15. `ill health retirement nhs pensions` · 16. `deferred nhs pension` · 17. `nhs deferred pension` · 18. `adult dependant pension`

Tier 4, the contact block, prose only, no details published (4, mandatory, **all four inside the single pointer block**, per ruling 1):
19. `nhs pension contact details` · 20. `nhs pensions contact details` · 21. `nhs pension complaints` · 22. `nhs pension overpayment`

**Deliberately declined, named so the count reconciles: 32 rows.**
- 19 further contact-family rows including all five 4,400-volume phrasings (`nhs pension contact number`, `nhs pension phone number`, `nhs pension telephone number`, `nhs pensions contact address`, `nhs pensions contact number`), all `change of address` rows, all `helpline` and `0345` rows, and the remaining email and overpayment variants. **These may appear naturally in the pointer block's prose and are not forbidden, but they are not required, because the page cannot answer them without publishing details it cannot verify.** They are declined, not forbidden. Compare criterion E, which forbids the *details*, not the *words*.
- 9 further AVC / additional-pension variants (`avc nhs`, `nhs avc`, `nhs avcs`, `additional pension`, `additional pension contributions nhs`, `additional voluntary contributions nhs pension`, `nhs pension additional voluntary contributions`, and 2 further orderings): carried if the writing allows, not gated.
- `nhs ill health retirement pension` (170), `what is adult dependant pension` (50): carried if the writing allows.
- **4 off-niche rows FORBIDDEN under ruling 5**: `ill health retirement local government pension scheme`, `ill health retirement teachers pension`, `ill health retirement teachers pensions`, `civil service deferred pension`. See criterion E.

**22 required + 32 declined = 54. Balances.**

### C. Arithmetic: BLOCKING if added

No arithmetic exists on the page today. If the writer adds the taper computation (recommended), the assertion is: floor reached at adjusted income = 260,000 + 2 × (60,000 − 10,000) = **£360,000**, from inputs standard AA £60,000, adjusted-income limit £260,000, £1-for-£2 reduction, floor £10,000. **It must match the figure already published on `/blog/nhs-pension-tax-charges-how-to-minimize`.**

Any AVC or Additional Pension cost illustration must state its inputs inline. **Do not publish an Additional Pension purchase price**: the cost depends on NHSBSA and GAD factors that are re-set and are not in `house_positions.md`. Frame it as "confirm the current cost using the NHS Pensions additional pension calculator".

### D. Statute and figures to re-verify at source: BLOCKING

Every citation WebFetched from the primary source and content-verified, not URL-liveness-checked (§4 floor 3):

| What | URL |
|---|---|
| Annual allowance £60,000, MPAA £10,000, tapered minimum £10,000, threshold income £200,000, adjusted income £260,000, LSA £268,275, LSDBA £1,073,100: confirm the **"2026 to 2027"** row | https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates |
| Taper trigger conditions and three-year carry-forward | https://www.gov.uk/tax-on-your-private-pension/annual-allowance |
| Scheme Pays: charge exceeds £2,000 AND input exceeds the s.228(1) annual allowance | https://www.legislation.gov.uk/ukpga/2004/12/section/237B |
| Scheme Pays deadline, the 31 July limb AND the extended limb for a revised statement issued on or after 2 May | https://www.legislation.gov.uk/ukpga/2004/12/section/237BA and https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm056430 |
| Scheme sections: 1995 (1/80th, NPA 60), 2008 (1/60th, NPA 65), 2015 CARE (1/54th, CPI+1.5%, NPA = SPA), all active members in 2015 from 1 April 2022 | https://www.nhsemployers.org/articles/comparing-different-sections-nhs-pension-scheme |
| Partial retirement from 1 October 2023, 20% to 100%, 10% reduction for 12 months; early-retirement permanent actuarial reduction (**principle only, never a fixed percentage**, §2.E); ERRBO | NHSBSA partial and early-retirement guidance |
| McCloud remedy period 1 Apr 2015 to 31 Mar 2022, rollback 1 Oct 2023, deferred choice at retirement | https://www.nhsemployers.org/articles/mccloud-remedy |
| LTA abolition from 6 April 2024; LSA / LSDBA as the replacement framework | https://www.gov.uk/government/publications/abolition-of-the-lifetime-allowance-from-6-april-2024 |
| AVC and Added Pension tax relief, and that company income / dividends are **not** NHS-pensionable | `house_positions.md` §2.C, whose own anchors are NHSBSA practitioner/officer guidance and FA 2004 Part 4 |

**Sources that will not fetch, and the rule for them.** `house_positions.md` records that **NHSBSA pages (nhsbsa.nhs.uk/member-hub) return HTTP 403 to automated fetches**, so NHS Employers is the fetchable authority for scheme facts. Where neither renders, the fact is carried from the relevant `house_positions.md` section, the limitation is recorded in `statute_checks[]`, and **nothing is guessed** (§9.10: "Never substitute a guess").

**Facts read off competitor pages in section 4 that must NOT be published without independent source verification:** the Tier 1 / Tier 2 ill-health criteria wording and the **50% of prospective service** enhancement (4.4); the **AW33E** and **AW240P** form numbers (4.4); the PCSE **40 calendar day** and **90 day** complaint thresholds (4.9); the **30-day** first-pension-award target (4.8). None is in `house_positions.md`. The page may name Tier 1 and Tier 2 as the two tiers, because that vocabulary is required by criterion B, and must then point to NHSBSA rather than characterise the criteria.

**UNVERIFIED-figure rule (house rule 4).** `house_positions.md` marks the **GMC annual retention fee**, the **Global Sum per weighted patient** and the **QOF point value** as UNVERIFIED. **No figure may be stated for any of the three.** None is naturally in scope for this page; the only realistic route in is a "what a GP partner's pensionable pay is based on" sentence in the AVC or ill-health block, which touches net NHS profit and could reach for a Global Sum figure. If that sentence is written, it says pensionable pay derives from net NHS-derived profit certified on the Type 1 Annual Certificate and frames any funding amount as **"confirm the current figure in the Statement of Financial Entitlements Directions 2026"**, naming the block.

### E. Forbidden content: BLOCKING, negative criteria

**E1. No NHS Pensions contact details may be published.** The following must be **absent** from the file: any telephone number, the string `0345`, any NHS Pensions postal address, any NHS Pensions email address. Ruling 1. The contact block links to the NHSBSA member hub instead. Rationale recorded so a later reader does not "fix" the omission: NHSBSA returns HTTP 403 to automated fetches, so a published number cannot be re-verified by the pipeline and becomes a silent staleness liability on a page a doctor acts on.

**E2. No other public-sector scheme.** The strings `local government pension scheme`, `teachers pension`, `teachers pensions` and `civil service` must be **absent**. Ruling 5, and the profession boundary in `competitor_universe_2026-08-26.md` §4.

**E3. No fixed early-retirement reduction percentage.** §2.E: "lock the PRINCIPLE (permanent actuarial reduction) and point to the NHSBSA factor table; do NOT lock a fixed % reduction", because GAD revises the factors.

**E4. No Additional Pension purchase price and no tiered contribution table.** Both are re-set periodically (the tier bands were uplifted 1 April 2026 and can be corrected retrospectively within a year, §2.C). Neither belongs on a service page.

### F. Sibling-page respect: BLOCKING

Five boundaries, each checkable as "at most one short block, and at least one internal link to the owner":

| Ground | Owner | Status |
|---|---|---|
| The PCSE escalation ladder and pension-record correction for GPs | `/blog/gp-practice-income-pcse-statement-reconciliation` | **Our top Bing page: 17 clicks / 261 impressions. EXTEND.** Lane 1 `pension_admin_pcse` |
| Refund of contributions, opting out, and `nhs pension redundancy` | `/blog/nhs-pension-tax-charges-how-to-minimize` | In this same batch, REFRAME. Dossier §7 gives it `nhs pension redundancy` at 56.0 against this page's 48.0 |
| The annual-allowance long-form explanation and the tapered calculator | `/blog/nhs-pension-annual-allowance-complete-guide` and `/blog/nhs-pension-tapered-annual-allowance-calculator` | **Both FROZEN to 2026-09-10.** Link; add nothing to them |
| Scheme Pays deadlines in depth | `/blog/nhs-pension-scheme-pays-doctors-deadlines` | **`status='flagged'`, HOLD.** Link only; a flagged monitor is a question, not a clearance (dossier §6) |
| The open research treatment of the NHS pension | `/resources/nhs-pension` | Different URL, not in this batch. Section 2a. **Link to it; do not duplicate it** |

**Additional link floor.** The page currently has **2 internal links**. A top-level hub for this lane must have more. Checkable: **at least 6 internal links** in the finished file, including at least one to each of the five owners above.

### G. Structural floors

- **At least one table.** The AVC-versus-Added-Pension comparison (W2). Competitor evidence: 4.10 has 4 tables, 4.11 has 2, and both rank.
- **An FAQ block of at least 6 question-shaped entries.** Competitor evidence: 4.10 has 13+, 4.12 has 18, we have 0. Implementation per section 1a: a new `const` array rendered as question H3s is the cheapest correct shape. **FAQPage JSON-LD is optional and must be hand-written if added; there is no builder in `lib/schema.ts` and one must not be invented for this.**
- **Meta title at or under 60 characters** and containing `NHS pension`.
- **Reader-facing prose at or above 1,200 words**, from a baseline of approximately 620. Not a lever in itself (§9.12 marks word count as "not a lever") but here it is a proxy for the seven themes in 4.13 that are currently absent entirely.
- **The `whenYouNeedHelp` / `commonMistakes` / `processSteps` / "What you get" service spine survives** (KEEP-3), with entry counts at or above 4 / 4 / 3 / 5.
- The JSON-LD `offerItems` array is updated so it is not five annual-allowance lines: at least **2 of the 5** must reference additional pension / AVCs or scheme-wide planning.
- **`npm run build` must exit 0.** This is a TSX file; a content edit here can break the build in a way a markdown edit cannot. Run it before QA, not after.

### H. The four existing floors (§4) plus §9.9 floors 5 to 8

1. **Query-coverage floor**: `scripts/track2_query_coverage.py` takes `--slug` and is built around the blog corpus. **This page is not a blog slug**, so the standard invocation does not address it. It is also invisible (0 impressions both engines) and invisible pages never gate by design. **Record the floor as not-applicable-by-shape with the reason, rather than reporting a pass it did not run.**
2. **Arithmetic recompute**: criterion C. `all_clear` derived from the dimensions, never trusted from the agent.
3. **Statute verification at source**: criterion D, `statute_checks[]`, every gov.uk, legislation.gov.uk and NHS Employers citation content-verified, and every competitor-sourced fact in the do-not-publish list either independently sourced or omitted.
4. **Link resolution**: `slug_resolver.py` + `track2_link_audit.py` + `predeploy_gate.py`, **0 broken internal links repo-wide**. Medical uses **FLAT** `/blog/<slug>` routing (`medical_parked` memory: `slug_resolver` HARD-REFUSES flat sites), so use `scripts/medical_flat_link_audit.py`. **Note that this file's links are JSX `<Link href="...">`, not markdown anchors**, so confirm the auditor sees them before trusting a clean result on this page.
5. **Equity preservation**: criterion A, 0 of 0, with the `gsc_page_rows.json` condition and the `/resources/nhs-pension` separation.
6. **Cluster coverage**: criterion B, 22 of 22 placed, 32 declined with reason, balancing to 54; plus criterion E, 0 forbidden strings present.
7. **Reconciliation balance**: 22 + 32 = 54. Balances.
8. **Competitor re-read**: the section 4.13 table, 31 themes, **0 undecided**.

Plus the two human passes: adversarial factual QA against `house_positions.md` §2 to §2.E, with defect 1 (contributions versus pension input) as the named priority, and the editorial pass, which here also checks that the page still reads as a **service page with a tool**, not as a research guide, and that the administrative vocabulary reads as prose rather than as inserted keywords.

---

## 8. Stated expectation

Written before the work, as a number a later read can fail (§9.6).

**Baseline, 90d to 2026-08-26:** Google 0 impressions, 0 clicks, 0 query rows for `/nhs-pension`. Bing 0 impressions, 0 clicks, 0 query rows. **From zero on both engines, on a topic with peer-winnable volume of exactly 0.**

**Honest framing before the numbers.** bma.org.uk holds 50 of the 54 rows and is classified unwinnable-authority. **The target is not the BMA's slot.** The target is (a) to exist at all on this vocabulary, (b) to convert the fraction of that demand that is a doctor with a tax problem rather than a doctor with a phone-number problem, and (c) to stop being outperformed by our own `/resources/nhs-pension` sibling. Set the expectations at that.

**Engine and window.** Bing is the **14 to 28 day** read; Google the **28 to 90 day** read. One change per page per window.

| Horizon | Engine | Expectation |
|---|---|---|
| 14 days | Bing | The URL appears in `GetPageQueryStats` at all, with **>= 1 named query** and **>= 3 impressions**, where there were none |
| 28 days | Bing | **>= 6 named queries** and **>= 20 impressions**, and **at least 3 of the 22 named phrases** in criterion B present in the Bing query set, **of which at least 1 is from Tier 1 (the AVC / additional-pension family)**. A rise driven only by Tier 4 contact-family impressions is not success on the assigned topic and must be recorded as partial |
| 90 days | Google | **>= 1 query-level GSC row** for this URL where there were 0, and page-level Google impressions **>= 50**, which is the level `/resources/nhs-pension` already reaches (49 impressions, position 13.5). **Failing to beat our own sibling at 90 days means the differentiation in section 2a did not land** |
| 90 days | Google, structural | The page holds **at least one** of `nhs additional pension calculator` or `nhs pension additional pension calculator` at any position, on the strength of the embedded calculator (W3). bma.org.uk holds them at positions 7 and 4 without having one |

**`target_keywords` on `blog_optimizations`** must be populated with the **22 phrases in criterion B**, not with the annual-allowance vocabulary the page is already built around. Per §9.6 rule 2, the verdict is read against **phrase coverage**, not total traffic.

**Failure triggers, as numbers.** The standard revert formulation cannot fire on a zero baseline, so it is replaced by three explicit triggers:

- **Assigned-topic failure.** If, 28 days after deploy, **zero** of the 12 Tier 1 and Tier 2 phrases (the AVC / additional-pension / calculator families) appear in the Bing query set for this URL, record `impact_verdict = fail` on the assigned topic regardless of what total impressions did. That is the topic the dossier assigned and the one the rewrite is being measured on.
- **Drift.** If total impressions rise but the only phrases appearing are Tier 4 contact-family rows, record `impact_verdict = drift`. The contact block is a pointer, not the product, and traffic that arrives looking for a phone number and finds an accountant is not a win.
- **Revert trigger, correctness.** If any figure in criterion D fails re-verification at source after deploy, or if any item in criterion E (forbidden content) is found live, revert to `b3d78c97e768645cca480dd350281ffa68c1faf9` immediately rather than patching in place. A published NHS Pensions phone number that turns out to be wrong is a different class of error from a ranking miss.

**One measurement note.** This page and `/resources/nhs-pension` must be read as **separate rows** in every subsequent analysis. They share a slug fragment and they are not the same URL. Any later read that sums them will report a success this page did not have.

---

## Corrections to the dossier

Per hard rule 7. Stated, not silently harmonised.

**C1. The dossier and the committed lane config give opposite instructions on the NHS Pensions contact vocabulary.** Dossier §4 NO-PAGE rows 13, 16 and 30 prescribe `nhs pensions contact address / details` (6,720), `pension nhs contact / email` (3,160) and `nhs pensions complaints / overpayments` (410) as sections on `/nhs-pension`. `sites/medical.discovery.json` `lane_negative_tokens`, admin/directory group, **vetoes `helpline`, `phone-number`, `contact-hmrc`, `government-gateway` and `personal-tax-account`** with the stated reason "HMRC navigation and listing noise" (`competitor_universe_2026-08-26.md` §3a). Both documents are dated 2026-08-26. **The pack resolves this in favour of a narrow reading of both** (ruling 1: carry the vocabulary in one pointer block, publish no details, exploit the escalation angle the BMA's own contact page proves is what actually ranks, teardown 4.5). **It should be resolved properly at the next dossier or lane review**, because as it stands a keyword either is or is not in scope depending on which committed file you read.

**C2. Row 22's peer-winnable ordering is doing no work here, and the dossier should say so.** Owner decision 21 orders work by peer-winnable volume. **This topic's peer-winnable volume is 0 across all 54 rows.** Every ordering statement in this pack therefore falls back to assigned-family-then-volume, which is a judgement call the decision does not cover. The dossier's own §11 point 6 already flags that "peer-winnable is a Google-derived number" on a site where Bing out-clicks Google 3.4x. **Recommend the dossier add an explicit fallback ordering rule for zero-peer-winnable topics**, otherwise every such topic gets ordered by whoever writes its pack.

**C3. The dossier's page scope of 105 pages does not include `/resources/[topic]`.** Dossier §2 enumerates the corpus: "79 markdown blog posts, 8 `/blog/` pillar hubs rendered from TSX, 10 calculators, 6 medical-guides, and the `/nhs-pension`, `/research`, `/services` and four `/for-*` persona hubs". **`/resources/nhs-pension`, `/resources/locum` and `/resources/incorporation-private` are live, indexable, non-gated URLs** rendered from `Medical/web/content/resources/*.md` via `src/app/resources/[topic]/page.tsx` (`dynamicParams = false`, three topics enabled in `src/lib/resources/registry.ts`). **`/resources/nhs-pension` earns 49 Google impressions at position 13.5 over 90 days, which is more Google visibility than most pages in the counted 105.** The corpus is **108 pages, not 105**, and the §5 headline ("1,141 of 1,242 phrasings absent from our corpus") was computed against a body text that excluded three live pages. The direction of the error is small and conservative (three more pages can only reduce the absence count), but the count is wrong and the `/resources/` namespace is a genuine blind spot exactly like the 8 TSX pillars the dossier itself flags as "easy to miss with a `content/blog/*.md` glob".

**C4. `nhs pension redundancy` is assigned to the other page in this batch, and this pack respects that.** Dossier §4 NO-PAGE row 31 prescribes it as a section on `/blog/nhs-pension-tax-charges-how-to-minimize`; dossier §7 scores that page 56.0 against this page's 48.0. No contradiction, but bma.org.uk's `/pensions/retirement/redundancy-and-your-pension` was outside this page's 12-URL competitor list and outside the other page's 10-URL cap, so **the redundancy topic has no teardown anywhere in this batch.** Recorded as a named gap rather than left silent.

**C5. Two live URLs render the same calculator, and the dossier's cannibalisation table does not show it.** `/nhs-pension` embeds `<CalculatorClient slug="nhs-pension-annual-allowance" />`, which is the same tool `/calculators/nhs-pension-annual-allowance` is built on. Dossier §7 catches the *title and slug* collisions across `/calculators/`, `/medical-guides/` and `/blog/` but works from scoring, so a shared **component** is invisible to it. **Recommend the next pass adds a component-level check for shared tool slugs**, since a duplicated tool is a stronger cannibalisation signal than a similar title.

---

*Pack built 2026-08-26. No `Medical/web/` file was modified. No commit, no deploy, no `monitored_pages` write, no monitor, alert, cron or notification created.*
