# §9.5 RESEARCH PACK: /blog/pcn-funding-network-contract-des-explained

**Wave A** (GP practice income and NHS funding) · **Grade EXTEND, additive only, K2 applies**
Built 2026-08-26. Spec `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.5. Batch index `docs/medical/packs/BATCH3_INDEX.md`.
Language spec `docs/medical/language_spec_2026-08-26.md` (A to L, V1 to V9). Ground truth `docs/medical/house_positions.md`.
Peer classification `docs/medical/competitor_universe_2026-08-26.md` §2a. Market map `docs/medical/cluster_dossier_2026-08-26.md` (CORRECTED §4).

**No paid API call was made by this pack: $0.00.** GSC and Bing Webmaster are free. The competitor keyword set comes
from the persisted harvest (`dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'`), which is
already paid for. No file under `Medical/web/` was edited. No commit, no deploy, no IndexNow, no `monitored_pages`
write, no monitor, alert, cron or scheduled job created.

---

## 0. Read this first: the scratchpad pulls named in the brief did not exist, and were re-created

The writer brief names `gsc_page_rows.json`, `gsc_query_rows.json`, `bing_page_stats.json`, `bing_query_stats.json`
and `bing_page_query_waveAB.json` in `medical_stage0/`. **The directory contained one file, `B3_WRITER_BRIEF.md`.**
This is the same failure `BATCH3_INDEX.md` §0.1 records for its own inputs, one batch later and still unfixed:
Stage 0 scratch is deleted between sessions and every downstream brief keeps pointing at it.

**Every figure in this pack is therefore from a fresh free pull made by this task**, not from a stored snapshot.
Commands, verbatim:

```
BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")
  -> 303 rows, 77 distinct page URLs
BingWebmasterClient().get_page_query_stats(
     "https://medicalaccounts.co.uk",
     "https://www.medicalaccounts.co.uk/blog/pcn-funding-network-contract-des-explained")
  -> 47 rows
GSCQueryFetcher("medical") -> sc-domain:medicalaccounts.co.uk
  searchanalytics().query(dimensions=["page"])         2026-05-25..2026-08-23 -> 21 rows
  searchanalytics().query(dimensions=["page","query"]) 2026-05-25..2026-08-23 -> 259 rows
```

**One live trap recovered, worth carrying to the other wave-A and wave-B packs.** `GetPageQueryStats` returns
**0 rows** when `page` is passed as a path (`/blog/pcn-funding-network-contract-des-explained`) or as the apex host,
and **47 rows** when it is passed as the full `https://www.` URL. It does not error; it returns an empty list, which
a careless writer reads as "no Bing query data" and reports as a finding. The QOF exemplar pack (§2) documents the
call with a path argument. **Pass the full canonical URL, always.** Recorded as correction C4.

**Data-through 2026-08-23 (Google) and 2026-08-21 (Bing, last weekly snapshot).** Both figures below reproduce the
brief's expected numbers exactly, so the re-pull is a confirmation and not a substitution.

---

## 1. Target and permission level

### The constraint, first

**GRADE = EXTEND. ADDITIVE ONLY. K2 APPLIES.**

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/pcn-funding-network-contract-des-explained` |
| Wave | **A**, GP practice income and NHS funding. Starts now, no gate. Runs concurrently with B and C. |
| Cluster / topic | PCN funding and the Network Contract DES. Ownership row **O20**. |
| Lane | `nhs_practice_income` (`competitor_universe_2026-08-26.md` §3 lane 8); the batch index files wave A as GP practice income and NHS funding |
| Source file | `Medical/web/content/blog/pcn-funding-network-contract-des-explained.md` |
| **Rendering** | **Markdown post whose body is raw HTML.** Frontmatter carries `metaTitle`, `h1`, `keyTakeaways`, `summary` and the `faqs` list. Write new blocks as raw HTML to match. |
| Current sha (revert anchor) | `d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3` (`git rev-parse HEAD`, 2026-08-26) |
| Revert path | `git checkout d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3 -- Medical/web/content/blog/pcn-funding-network-contract-des-explained.md` |

Note that `BATCH3_INDEX.md` §0 records "Repo HEAD at build time `7be12b11`". HEAD has moved since: batch 2 shipped
as `d2e75655`. **Use `d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3`, verified by `git rev-parse HEAD` at pack time**, not
the index's figure. Recorded as correction C1.

### What may NOT change (must come back byte-identical)

1. `metaTitle`: `PCN Funding & the Network Contract DES Explained`
2. `h1`: `PCN Funding Explained: The Network Contract DES and How the Money Flows`
3. `title`: the post has **no `title:` key**. Its frontmatter runs `title:` at line 2 as
   `PCN Funding and the Network Contract DES Explained`. That string is frozen too.
4. `metaDescription`, `slug`, `canonical`, `category`, `date`, `generator`, `author`, `image`, the whole
   `imageCredit` block, and `altText`.
5. **The existing H2 sequence, in this relative order, each string unchanged:**
   1. `What a Primary Care Network Is, and Why Funding Flows Differently`
   2. `The Network Contract DES: a Directed Enhanced Service the Practices Opt Into`
   3. `The Funding Streams Inside the Network Contract DES`
   4. `How the Money Actually Reaches the Practices: the Nominated Payee`
   5. `How PCN Income Is Recognised in the Accounts`
   6. `VAT and Pension in One Breath`
   7. `How We Help GP Practices and PCNs`
6. **The six existing H3 strings**, in order, all nested under H2 #3: `Core PCN Funding`;
   `Staff Reimbursements: the Additional Roles Reimbursement Scheme (ARRS)`; `Enhanced Access`;
   `Capacity and Access Payments`; `The Investment and Impact Fund (IIF)`; `Care Home and Other Premia`.
7. **All 14 existing FAQ question and answer strings.**
8. **All 5 existing `keyTakeaways` strings.**
9. Every existing paragraph, every existing list item, and the existing inline CTA block (the bordered `div` before
   the `VAT and Pension in One Breath` H2). **Nothing existing is reworded, reordered, shortened or "tidied".**

### What MAY change

1. **New H2 blocks appended into the body.** Place them **immediately before** the existing
   `How We Help GP Practices and PCNs` H2, so the seven existing H2s keep their relative order and a byte-identical
   check reads them as an unbroken subsequence.
2. **New H3 blocks appended after `Care Home and Other Premia`**, inside the existing funding-streams H2, only if the
   new material is genuinely a further funding stream. Nothing existing moves.
3. **New FAQ entries appended to the end of the `faqs:` list.** The existing 14 stay in place unchanged.
4. **New key takeaways appended** to `keyTakeaways` (optional; existing 5 stay).
5. New internal links **inside the NEW blocks only**. No new internal link inside any existing paragraph.

### Frozen-list position, confirmed against BATCH3_INDEX §1

**This page is NOT on the frozen list.** The live `monitored_pages` exclusion is the 19 rows in `BATCH3_INDEX.md` §1
with `monitor_until > now()`, run with **no status predicate** (rows 1, 4 and 18 are `flagged`, and a flagged row is
more sensitive than an active one, not less). `pcn-funding-network-contract-des-explained` appears nowhere in that
list. It was not in batch 1 and not in batch 2. It is **UNTREATED and workable now**.

The pack does not re-derive the freeze itself, because §1 of the index derived it live the same day and this task's
mandate is preparation, not a second live query. If more than a day passes before the writer starts, re-run
`select slug, status, monitor_until from monitored_pages where site_key='medical' and monitor_until > now()`
with no status filter.

**Never propose a collapse, a redirect or a URL change. Rewrite in place only. No em-dashes.**

---

## 2. THE OWNERSHIP MAP, reproduced verbatim, and it is the most important part of this pack

**The standing rule, restated because it is the reason this section exists:**

> **Every shared fact has exactly ONE owning page. Every other page gets one sentence and a link, never the
> explanation. A writer who needs three sentences is taking someone else's fact and must stop.**

**V7 is binding: where a brief and the ownership map disagree, THE MAP WINS.** The writer follows the map, states
neither fact, and reports the conflict. A conductor writes several briefs quickly and can reach for the same
compelling fact in more than one of them; the map is the single place where duplication is visible. This pack
contains one live V7 conflict, in §7.4.

### 2.1 THIS PAGE'S OWN ROW. Reproduced verbatim from BATCH3_INDEX §6.2.

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O20** | The **Network Contract DES and the PCN funding envelope**: what a PCN is, what the DES pays for, core PCN funding, the extended-access and capacity strands, who holds the money and how it flows to member practices. | `/blog/pcn-funding-network-contract-des-explained` | The ARRS and clinical-director pages get **one sentence** placing their subject inside the DES, then link. The GMS page gets one sentence saying PCN money sits outside the core contract, then link. |

**This page is the OWNER of O20.** Everything in O20 is yours to explain in full, and no other wave-A page may take
any of it. If a sibling pack claims the nominated payee, the funding envelope, or what a PCN is, that is a V3 breach
against this page and it is reported, not conceded.

### 2.2 THE ROWS THAT FENCE THIS PAGE IN. Reproduced verbatim from BATCH3_INDEX §6.2.

| # | Shared fact | **Owner** | Everyone else does this |
|---|---|---|---|
| **O19** | The **core GMS contract and the Global Sum**: what the Global Sum is, the £130.07 per weighted patient for 2026/27 with its year tag, the **Carr-Hill formula** and its weighting variables, the London Adjustment, the out-of-hours and minor-surgery deductions, GMS vs PMS vs APMS. **Plus NO-PAGE corrected order 12 (`what is a GMS contract`, `apms contract`, 1,140 peer-winnable).** | `/blog/how-gms-funding-works-global-sum-carr-hill-explained` | Every other wave-A page: one sentence naming core funding, then link. **No Carr-Hill explanation, no Global Sum figure, no contract-type comparison anywhere else.** Batch 1 put the tier table on three pages that did not own it; this is the same shape and it is pre-empted here. |
| **O21** | **ARRS**: which roles are reimbursable, the reimbursement mechanics and caps, **who employs ARRS staff**, the payroll, pension and employer-NIC consequences, and the VAT trap when staff are shared between practices. | `/blog/arrs-reimbursement-employing-pcn-staff-tax` | The PCN funding page gets **two sentences** naming ARRS as a DES strand and hands off. It must not explain the employment model. |
| **O22** | **PCN clinical director payments**: how the CD payment is calculated, whether it is employment or self-employment income, how it is taxed, and how it interacts with a partner's profit share. | `/blog/pcn-clinical-director-payments-tax` | The PCN funding page gets one sentence, then link. **No tax treatment stated anywhere else.** |
| **O23** | **Locally commissioned and enhanced services**: DES vs LES vs national enhanced services, how they are contracted, invoiced and recognised in the accounts. | `/blog/enhanced-services-gp-practice-income-tax` | The GMS page gets one sentence naming enhanced services as a funding stream, then link. |
| **O24** | **Dispensing practice income**: the dispensing fee and drug-reimbursement structure, and the **zero-rating of dispensed drugs under VATA 1994 Sch 8 Group 12** as distinct from the Sch 9 Group 7 medical-care exemption. | `/blog/dispensing-practice-income-accounts-tax` | Wave A: no other page mentions dispensing income at all. **O17 still binds**: this page states the zero-rating in **one or two sentences** as the contrast, and does not explain the exemption, which belongs to the frozen `gp-vat-registration`. |
| **O25** | **QOF**: points, the achievement and aspiration cash-flow split, how QOF income is recognised and taxed. | `/blog/qof-income-gp-practice-accounting-explained` (batch 1, in its read window) | **Wave A: one sentence and a link, on every page.** Not reopened in this batch. **No page states a QOF point value (O10, hard fail F5).** |
| **O26** | **How practice income is recognised and reconciled against the PCSE statement.** | `/blog/gp-practice-income-pcse-statement-reconciliation` (batch 1) | Wave A: every page that mentions a payment landing gets **one sentence** and a link. Five pages describing income recognition five times is the batch-1 failure. |

### 2.3 THE INHERITED ROWS THAT BIND THIS PAGE. Reproduced verbatim from BATCH3_INDEX §6.1 and §6.2.

| # | Shared fact | Owner | Batch-3 consequence |
|---|---|---|---|
| O4 | Scheme Pays: two-limb election, mandatory vs voluntary, deadlines | `/calculators/nhs-pension-scheme-pays` | **`/blog/nhs-pension-scheme-pays-doctors-deadlines` is being prepared separately and is not this batch's at any date.** No batch-3 page states a Scheme Pays deadline. This is the exact fact that broke batch 1. |
| O9 | **GMC annual retention fee: deductible, amount UNVERIFIED** | `house_positions.md` §8 and §10 | **No page in any wave states a GMC fee figure. Hard fail F5.** Binds wave F directly (gmc revalidation). |
| O10 | Global Sum per weighted patient (**£130.07, 2026/27, verified**) and the QOF point value (**UNVERIFIED**) | `house_positions.md` §3.A and §3.B | Wave A: the GMS page may state £130.07 with its year tag. **No page in any wave states a QOF point value. Hard fail F5.** |
| O13 | GP practice reimbursement for parental-leave cover under the SFE | `/blog/maternity-pay-and-maternity-allowance-for-doctors` | **Wave A**: the GMS and enhanced-services pages get one sentence and a link. This is a real collision, see O19. |
| O17 | VAT: healthcare exemption versus standard rating | `/blog/gp-vat-registration` (FROZEN) and `/blog/gp-practice-private-non-nhs-income-streams` (batch 1) | **Wave A**: the dispensing page gets one sentence on zero-rating and a link. **Wave F**: `private-practice-tax-nhs-and-private-income` gets one sentence. Neither explains the exemption. |
| O18 | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` (batch 1) | All waves: one sentence, then link. |
| **O35** | **The employment-status fork for doctors** (partner SA800/SA104, salaried PAYE, locum SA103 or PSC, consultant PAYE plus private work), house positions §1 | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | Every wave: one sentence, then link. **No batch-3 page rebuilds the four-role table.** |

Rows O1, O2, O3, O5, O6, O7a, O7b, O8, O11, O12, O14, O16, O27 to O34 do not constrain this page (they bind waves B
to H, or clusters this page does not touch) and are not reproduced. If a writer finds itself needing one of them,
that is the signal it has left O20.

### 2.4 What this map means in practice, for this writer, in six lines

1. **You own the envelope.** What a PCN is, what the Network Contract DES is, core PCN funding, enhanced access,
   capacity and access, the IIF, the premia, the nominated payee, the network agreement, and how money reaches a
   member practice. Explain all of it, in full, better than anyone.
2. **ARRS: two sentences, then link.** Name it as a DES strand and say it is a reimbursement of actual employment
   cost up to a per-role maximum. Do not explain who employs the staff, the payroll, the pension, the employer NIC
   or the shared-staff VAT. Those are O21's and the ARRS page's entire reason to exist.
3. **Clinical director: one sentence, then link.** You may say the leadership and management funding is inside core
   PCN funding, because that is a fact about the envelope. You may not say how the CD payment is calculated, whether
   it is employment or self-employment income, how it is taxed, or how it interacts with a profit share.
4. **Core GMS: one sentence, then link.** PCN money sits outside the core contract. No Global Sum figure, no
   Carr-Hill explanation, no GMS/PMS/APMS comparison.
5. **Enhanced services: one sentence, then link.** DES against LES is O23's.
6. **QOF, PCSE and VAT: one sentence each, then link.** No QOF point value, ever.

---

## 3. Equity register

**Endpoint discipline, and it is a live trap.** `GetPageStats` page-level impressions and `GetPageQueryStats`
named-query impressions are **both true and are NEVER comparable to each other**. On this page they read **85** and
**65**. On the sibling GMS page they read 129 and 51. Every figure below names its endpoint.

### 3.1 Google: ZERO, and what that does and does not mean

**GSC `searchanalytics.query`, `dimensions=["page"]`, `sc-domain:medicalaccounts.co.uk`, 2026-05-25 to 2026-08-23.
21 rows returned for the whole site. This URL is not one of them.**

**Google clicks: 0. Google impressions: 0. Not a low number. Absent from the result set entirely.** The
`["page","query"]` pull over the same window returns 259 rows and **0** of them carry this URL.

**What that does NOT mean.** It does not mean the page ranks nowhere, and no draft, no QA note and no later read may
describe it that way. **On this domain Google returns page-dimension rows for 21 of 138 sitemap URLs.** A page with
no Google history has never been given the chance to fail. The absence is a fact about **crawl and index demand on
medicalaccounts.co.uk**, not a fact about this page's quality, its topic or its competitiveness. `BATCH3_INDEX.md`
§7 defect D5 records the same shape across 44 untreated URLs and explicitly files it as a question, not a finding.

**What it DOES mean, operationally.** Google contributes **nothing** to this page's equity set. There is no Google
position to protect, no Google query to preserve and no Google baseline to fall below. **Every acceptance criterion
and every failure trigger in this pack is a Bing criterion.** Section 8 sets no Google expectation for 28 days and
sets a deliberately weak one for 90.

### 3.2 Bing, page level: `GetPageStats`

`BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")`, 303 rows across 14 weekly snapshots,
77 distinct page URLs. Rows for this URL, summed over the window **2026-05-29 to 2026-08-21**:

| Metric | Value |
|---|---|
| **Clicks** | **7** |
| **Impressions** | **85** |
| Page-level CTR | 8.2% |
| Weekly snapshots carrying this URL | **9** |
| Avg impression position range across those 9 | **2.0 to 7.0** |

Per-snapshot, because the shape matters more than the total:

| Week ending | Impressions | Clicks | Avg impression position |
|---|---|---|---|
| 2026-06-12 | 6 | 2 | 7.0 |
| 2026-06-19 | 4 | 1 | 4.0 |
| 2026-07-03 | 2 | 0 | 2.0 |
| 2026-07-10 | 7 | 0 | 5.0 |
| 2026-07-17 | 14 | 0 | 5.0 |
| 2026-07-24 | 19 | 2 | 5.0 |
| 2026-07-31 | 5 | 1 | 5.0 |
| 2026-08-14 | 11 | 1 | 4.0 |
| 2026-08-21 | 17 | 0 | 5.0 |

**This is the second-best Bing earner in the untreated corpus**, behind `/medical-guides/ir35-for-locums` (10 clicks)
and level on clicks with `/blog/how-gms-funding-works-global-sum-carr-hill-explained` (7 clicks / 129 impressions).
Impressions are **rising** across the window (6, 4, 2, 7, 14, 19, 5, 11, 17) while position holds flat around 5.
That is growing exposure at a stable rank, which is the profile of a page Bing is showing more often, not one it is
promoting.

**One correction to the brief's framing.** The brief says "13 weekly snapshots 2026-05-29 to 2026-08-21". Thirteen is
the number of snapshot dates in the window across the whole site; **this URL appears in 9 of them**. Bing
`GetPageStats` is a top-N endpoint (the Bing top-N trap memo), so the four missing weeks are not proven zeros, they
are weeks this URL fell out of the returned N. **Do not read the gaps at 2026-06-26, 2026-08-07 and the two
boundary weeks as zero impressions.** Recorded as correction C2.

### 3.3 Bing, named-query level: `GetPageQueryStats`

`get_page_query_stats("https://medicalaccounts.co.uk", "https://www.medicalaccounts.co.uk/blog/pcn-funding-network-contract-des-explained")`
pulled 2026-08-26. **47 named-query rows | 65 impressions | 7 clicks | named-query CTR 10.8%.**

Never compare the 65 here to the 85 in §3.2.

**Every query in this table is a DO-NOT-LOSE query. Any one that stops matching after the change is a named BLOCK.**

| Query | Impr | Clicks | Best avg impression pos |
|---|---|---|---|
| are pcn's issued with a network contract | 3 | **1** | 2.0 |
| who pays for pcn des | 2 | **1** | **1.0** |
| why within the pcn funding is the core payment partly multiplied by 0.733? | 1 | **1** | 2.0 |
| what is pcn cd element of core pcn funding 24/25 | 1 | **1** | 7.0 |
| how does funding working in pcn and pratices | 1 | **1** | 3.0 |
| is pcn core the same as pcn surplus | 1 | **1** | **1.0** |
| operational costs recharged from pcn - ncd | 1 | **1** | 3.0 |
| can a pcn but printers for practcies from pcn funds | **5** | 0 | **1.0** |
| pms er core funding | 4 | 0 | 6.0 |
| what is pcn cd element of core pcn funding 23/24 | 3 | 0 | 7.0 |
| pcn network des word doc | 2 | 0 | 9.0 |
| where can i find how much funding a pcn  receives | 2 | 0 | 6.0 |
| pcn in contract payment | 2 | 0 | 6.0 |
| pcn managemet support funding | 2 | 0 | 6.0 |
| epcn core partner details | 2 | 0 | 10.0 |
| are pcns allowed to use any of their funding to buy printers and toners for practic es | 2 | 0 | 2.0 |
| why is my fully funded pcn | 1 | 0 | 6.0 |
| pcn des core funding | 1 | 0 | 6.0 |
| menopause funding is a reimburemant in pcn | 1 | 0 | **1.0** |
| nominated payee service | 1 | 0 | 2.0 |
| what is payment network contract | 1 | 0 | 3.0 |
| is enhanced access taxable and how much of it is taxed for a partnered gp | 1 | 0 | 9.0 |
| pcn des | 1 | 0 | 10.0 |
| does a pcn get more funding if it has educator status | 1 | 0 | 4.0 |
| what is pcn des | 1 | 0 | 5.0 |
| if funding what is pcn funding | 1 | 0 | 2.0 |
| pcn core funding | 1 | 0 | 6.0 |
| pcn dispersal of funds income | 1 | 0 | **1.0** |
| what is a pcn to a contract | 1 | 0 | 7.0 |
| pcn individual organisation amounts will be aggregated into the network payment. [truncated CQRS screen paste] | 1 | 0 | 2.0 |
| pcn clinical director funding | 1 | 0 | 6.0 |
| where does this money come from that the pcn can use | 1 | 0 | **1.0** |
| if a practice leaves the pcn who pays the costs | 1 | 0 | 3.0 |
| what elements of pcn finances are done via cqrs | 1 | 0 | 9.0 |
| pcn network participation funding | 1 | 0 | 5.0 |
| pcn funding model | 1 | 0 | 8.0 |
| des funding | 1 | 0 | 4.0 |
| pcn funding | 1 | 0 | 6.0 |
| restry feature  after disconnection github copilot | 1 | 0 | **1.0** |
| network contract des payments to pcns | 1 | 0 | 7.0 |
| is psn core the same as pcn surplus | 1 | 0 | **1.0** |
| what can you claim as a practice as part of hosting and payroll of extended access from pcn | 1 | 0 | 7.0 |
| pcn des what is the digital role paid | 1 | 0 | 4.0 |
| des participation in pcn what is the payment for | 1 | 0 | 5.0 |
| billing medical practice pcn network | 1 | 0 | **1.0** |
| is it kegal to use arrs funding to subside pcn running costs | 1 | 0 | 5.0 |
| what network is des on | 1 | 0 | 7.0 |

One row, `restry feature after disconnection github copilot`, is Bing noise and is not a PCN query. It is left in the
table because the brief's rule is that nothing is dropped, and it is excluded from every count that treats these as
topic evidence (so the topical named-query set is **46**).

### 3.4 What the query set actually says, and it is the most useful thing in this pack

**These are practice managers, at work, with a specific operational problem, misspelling their way to us at
position 1 to 7.** Not researchers. Not students. Not partners browsing. The evidence:

1. **Procurement and permitted spend.** `can a pcn but printers for practcies from pcn funds` (**5 impressions,
   position 1.0**, the single highest-impression named query on the page) and
   `are pcns allowed to use any of their funding to buy printers and toners for practic es` (2 impressions,
   position 2.0). Two phrasings of one question, from someone holding an invoice. **Our page says nothing about what
   PCN money may be spent on.**
2. **Year-end surplus.** `is pcn core the same as pcn surplus` (**1 click, position 1.0**), `is psn core the same as
   pcn surplus` (position 1.0), `pcn dispersal of funds income` (position 1.0). Three phrasings, one click, all at
   position 1. **Our page has no occurrence of the word "surplus" at all.**
3. **Leaving and cost recovery.** `if a practice leaves the pcn who pays the costs` (position 3.0),
   `operational costs recharged from pcn - ncd` (**1 click**, position 3.0), `pcn managemet support funding`
   (2 impressions, position 6.0). **Our page never covers exit, recharge or management-support money.**
4. **The arithmetic of core funding.** `why within the pcn funding is the core payment partly multiplied by 0.733?`
   (**1 click**, position 2.0). Our page states the £0.733 adjusted-population element and never explains why the
   core payment splits, which is exactly what this reader asked. It converted anyway.
5. **Who pays.** `who pays for pcn des` (**1 click, position 1.0**), `where does this money come from that the pcn
   can use` (position 1.0), `des funding` (position 4.0). **Our page never names the payer.** It describes the
   payee at length and the payer not at all.
6. **The systems layer.** `what elements of pcn finances are done via cqrs` (position 9.0), the truncated CQRS screen
   paste (position 2.0), `pcn network des word doc` (position 9.0). **CQRS appears nowhere on our page.** Note that
   the two positions here (9.0 and 2.0) are the page's weakest and one of its strongest, which is what an unmatched
   term looks like.
7. **Contract identity.** `are pcn's issued with a network contract` (**1 click**, position 2.0),
   `what is a pcn to a contract` (position 7.0), `what is payment network contract` (position 3.0),
   `network contract des payments to pcns` (position 7.0). Four phrasings of "is the PCN itself a contracting
   party". Our page answers it well, in the legal-entity paragraph, and never frames it as the answer to that
   question.
8. **Tax, and it is O20's edge.** `is enhanced access taxable and how much of it is taxed for a partnered gp`
   (position 9.0) and `what can you claim as a practice as part of hosting and payroll of extended access from pcn`
   (position 7.0). Both are enhanced-access money questions, both are among the page's worst positions, and both are
   answerable at the envelope altitude without taking O21 or O22.
9. **The bare heads.** `pcn des` (position 10.0), `what is pcn des` (5.0), `pcn core funding` (6.0), `pcn funding`
   (6.0), `pcn funding model` (8.0), `pcn des core funding` (6.0). **Six bare-head queries, all at position 4 to 10,
   none converting.** The page's own subject, and it ranks worst on it. That is what a page that never writes the
   words "PCN DES" looks like.

**The pattern to build section 7.1 from:** at position 1 to 3 the page converts (7 of its 7 clicks come from
queries at position 1.0 to 7.0, six of them at 3.0 or better). At position 5 to 10 it does not. The queries where it
sits at 5 to 10 are, almost without exception, the ones whose vocabulary is not on the page.

---

## 4. The market's keyword set

### 4.1 The selection regex, printed so the counts are re-derivable

```sql
-- Supabase Management API, project dhlxwmvmkrfnmcgjbntk, run 2026-08-26 via scripts/_q.py
with peers(d) as (values ('medicsmoney.co.uk'),('sial-accountants.co.uk'),('kudosaccounting.co.uk'),
 ('bw-medical.co.uk'),('pricebailey.co.uk'),('practiceindex.co.uk'),('sandisoneasson.co.uk'),
 ('ramsaybrown.com'),('r-m-t.co.uk'),('nicholsmedical.co.uk'),('gorillaaccounting.com'),('lanop.co.uk'),
 ('accountants4nhsdoctors.co.uk'),('hawsons.co.uk'),('bhp.co.uk'),('freestyleaccounting.com'),
 ('simpkinsedwards.co.uk'),('taxqube.co.uk'),('coveneynicholls.co.uk'),('fkca.co.uk'),
 ('medifintech.co.uk'),('rbp.co.uk')),
t as (select ranked_keyword kw, max(search_volume) vol,
  min(position) filter (where competitor_domain in (select d from peers)) peer_best,
  min(position) any_best, string_agg(distinct competitor_domain,',') doms
 from dataforseo_competitor_data
 where site_key='medical' and date_pulled='2026-08-26'
   and ranked_keyword ~* 'pcn|primary care network|network contract|directed enhanced|\mdes\M'
 group by 1)
select kw, vol, peer_best, any_best, (peer_best<=20) pw, doms from t order by vol desc, kw;
```

Peer set = the 22 domains in `competitor_universe_2026-08-26.md` §2a. **Peer-winnable = a peer holds position
<= 20.** Harvest: `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'`, 32,872 rows,
27 domains, no volume floor.

**A regex correction that changed the answer, recorded so it is not repeated.** The first run of this pack used
`\mpcn\M` (word-bounded). It returned 21 rows and **missed `pcns payment` at 9,900 volume**, which is 88% of the
topic and its single most important keyword, because `\M` does not match the plural. **On this harvest, always use
unbounded `pcn`.** Recorded as correction C3, and it is a class defect: any pack in this programme that
word-bounded a keyword stem may have lost its head term the same way.

### 4.2 The result: 16 keywords, 11,290 combined volume, 580 peer-winnable

| Vol | Peer best | Any best | Peer-winnable | On page | Keyword |
|---|---|---|---|---|---|
| **9,900** | 73 | **8** (bma.org.uk) | no | **no** | `pcns payment` |
| 260 | **13** | 13 | **yes** | **no** | `pcn des` |
| 260 | 28 | 28 | no | **no** | `pcn des 26/27` |
| 140 | 13 | 13 | yes | no | `pcn manager jobs` *(recruitment intent, DECLINED)* |
| 110 | **19** | 19 | **yes** | **no** | `des gp` |
| 110 | 23 | 23 | no | **no** | `des nhs` |
| 110 | 29 | 29 | no | **no** | `nhs des` |
| 70 | 17 | 17 | yes | no | `pcn manager` *(recruitment intent, DECLINED)* |
| 70 | 58 | 58 | no | **no** | `what is a pcn nhs` |
| 50 | 94 | 94 | no | **no** | `des contract 25/26` |
| 50 | 76 | 76 | no | **no** | `des: contract 25/26` |
| 50 | 21 | 21 | no | no | `maidenhead pcn` *(local recruitment, DECLINED)* |
| 50 | 84 | 84 | no | **no** | `network contract des 25/26` |
| 50 | 38 | 38 | no | **no** | `pcn des 2026/27` |
| 50 | 67 | 67 | no | **no** | `pcn network` |
| 40 | 42 | 42 | no | **no** | `pcn des 2025/26` |

**Counts.**

| | |
|---|---|
| Keywords in topic | **16** |
| Combined volume | **11,290** |
| Peer-winnable volume (peer <= 20) | **580** |
| Peer-winnable volume, **on-topic only** (excluding the three recruitment rows) | **370** (`pcn des` 260 + `des gp` 110) |
| On-topic keywords | **13**, combined volume **11,000** |
| **Absent verbatim from this page** | **13 of 13 on-topic. All of them.** |
| Domains contributing | 6 (bma.org.uk, practiceindex.co.uk, bhp.co.uk, aisma.org.uk, sandisoneasson.co.uk, honeybarrettmedical.co.uk) |

Peer-winnable **orders** the work and never excludes any row (owner decision 21, 2026-08-26).

### 4.3 The three readings that matter

**Reading 1. The head of this topic is 9,900 volume, held by the BMA at position 8, and the best any peer manages is
73.** `pcns payment` is 88% of the topic's volume in one keyword. bma.org.uk is **non-peer, unwinnable authority**
(`competitor_universe_2026-08-26.md` §2b: "Trade union / professional body ... cannot be outranked on brand").
practiceindex.co.uk, a peer, is at **73**. So on Google, the head is closed by brand and open by peer. On a domain
where Google indexes 21 of 138 URLs and this page has zero Google history, **that is not the channel this page is
being written for.** It is recorded because decision 21 says peer-winnable orders and never excludes, and because
the 9,900 is what makes the topic worth owning at all.

**Reading 2. Nothing in this topic is held well by anyone.** Best position across all 16 rows, from any domain:
bma.org.uk at 8, then a wall. **Thirteen of the sixteen have a best-held position of 13 or worse. Six have a best
position of 42 or worse.** For comparison, the QOF topic in the batch-1 exemplar pack has a peer at position 2. This
is a topic where the SERP is genuinely unsettled, and the reason is visible in section 5: nobody has written the
page. The two most winnable rows, `pcn des` (260, held at 13) and `des gp` (110, held at 19), are held by a
**922-word news post** on bhp.co.uk.

**Reading 3. The year-string family is a V1 trap and must not be treated the way the QOF pack treated its own.**
Six of the 13 on-topic rows are the same idea in six word orders: `pcn des 26/27`, `pcn des 2026/27`,
`pcn des 2025/26`, `network contract des 25/26`, `des contract 25/26`, `des: contract 25/26`. **V1 caps this page at
TWO of them.** Placing four would be a defect, not thoroughness. Section 7.1 places exactly two and names the four
it declines. See correction C5.

### 4.4 What our page says instead

| Market phrasing | Our page's word | Our count |
|---|---|---|
| `pcn des`, `what is pcn des`, `pcn des core funding` | "Network Contract DES", always spelled out | **0 occurrences of `PCN DES`** |
| `des gp`, `des nhs`, `nhs des` | "Directed Enhanced Service (DES)" | 0 of any of the three orders |
| `pcns payment` | "payment", "funding", "the money" | 0 |
| `pcn core funding` | "Core PCN Funding" (H3) and "core PCN funding" in prose | **word order reversed**, the market's order absent |
| `pcn des 2026/27` and family | "for 2025/26 this was around £1.76" | **no `2026/27` anywhere on the page**; `2025/26` appears |
| `what is a pcn nhs` | "A primary care network (PCN) is..." | the answer is there; the phrasing is not |
| `pcn network` | "the network" | 0 |

**The page is a good answer to a question written in a vocabulary nobody types.** Same shape as the QOF page, one
degree worse: QOF at least carries the word "QOF" 60-odd times. This page never writes its own topic's two-word
name.

---

## 5. Competitor teardown

All fetches made 2026-08-26 with `curl -A "Mozilla/5.0"`, plus `-H "Accept-Language: en-GB" -H "Referer:
https://www.google.com/" --compressed` on the retries. **Every URL is accounted for, including the two that failed.**

### 5.1 bma.org.uk, Primary care network funding
`https://www.bma.org.uk/advice-and-support/gp-practices/primary-care-networks/primary-care-network-funding`
**HTTP 200.** **Class: UNWINNABLE AUTHORITY / NON-PEER** (universe §2b, bma.org.uk: 15 of 18 head terms, best 1).
**Holds `pcns payment` (9,900 volume) at position 8. The single most important competitor URL in the topic.**

| | |
|---|---|
| Title / H1 | `Primary care network funding` (identical) |
| Word count | ~1,400 |
| H2 / H3 | `Declaration of completion for "simpler online requests" in the 2024/25 PCN DES`; `PCN financial entitlements`; `ARRS (additional roles reimbursement scheme)`; H3 `Annual reimbursement rates 2025/26`; `IIF Indicators 2025/26`; `IIF Capacity and Access Payments`; H3 `Capacity and Access Support Payments (£172.2m)`; H3 `Capacity and Access Improvement Payment (£73.8m)` |
| Tables | **Yes**, ARRS reimbursement rates and IIF indicators |
| FAQ block | No |

**Covers:** the entitlement rates. Verbatim on the page: *"In addition to the payments made to the PCN's nominated
payee under the terms of the network contract DES, participating practices will be entitled to the network
participation payment (£1.76 per patient)."* Also *"Each PCN is allocated an additional roles reimbursement sum for
the year. This is based on the PCN's weighted population share of the total ARRS funding."* Also, on capacity and
access: *"Since October 2022, PCNs have been able to receive a monthly CASP. This is paid to PCNs, proportionally to
their adjusted population, in 12 equal payments over the financial year. On average, it's expected that a PCN should
receive around £137k over the course of the year, or around £11.4k a month."*

**Corroboration, which is why the £1.76 matters:** the BMA states £1.76 per registered patient for the network
participation payment, and **our page already states the same figure for 2025/26**. Two independent statements of
the same number. It is still a **2025/26** figure on both, and the live contract year is 2026/27 (`house_positions.md`
§3). See §7.4.

**What it gets wrong or omits, and it is a long list.**
- **Its lead H2 is a 2024/25 collective-action notice about e-consultations.** The first substantive thing on the
  page holding the topic's head term is two contract years out of date and is about a dispute, not about funding.
- **It never says what a PCN is.** No definition, no 30,000 to 50,000 footprint, no legal-entity discussion.
- **It never says who pays.** The direct answer to our own `who pays for pcn des` (position 1.0) is absent.
- **Acronym-first throughout, with no glosses:** CAIP, CASP, DES, ARRS, IIF, ICB, LMC, GPC England, all used before
  or without definition. This is exactly the failure `language_spec_2026-08-26.md` Part 3 names as
  "the single biggest reader-facing weakness in the niche".
- **Zero accounting and zero tax.** No accrual, no recognition, no profit share, no VAT, no partner consequence.
- **Nothing on the nominated payee beyond the one clause quoted above**, and nothing on the network agreement, the
  distribution basis, or what a member practice actually receives.
- 2025/26 rates throughout, with 2024/25 material above them.

**Consequence for us.** We cannot outrank this on brand and should not try to take it on entitlement tables, which
it maintains and we do not. **We beat it on every question it does not answer**, and the query evidence in §3.3 says
those are the questions people are asking. Our page already answers six of them and does not carry the words.

### 5.2 bhp.co.uk, The Primary Care Network Directed Enhanced Service (PCN DES) Changes
`https://bhp.co.uk/news-events/blog/the-primary-care-network-directed-enhanced-service-pcn-des-changes/`
**HTTP 200.** **Class: PEER** (universe §2a #15, regional generalist with a healthcare team).
**Holds `pcn des` (260) at 13, `des gp` (110) at 19, `des nhs` (110) at 23, `nhs des` (110) at 29. Nine keyword rows,
more than any other URL in the topic. This is the page to beat, and it is the only peer-winnable one.**

| | |
|---|---|
| Title | `The Primary Care Network Directed Enhanced Service (PCN DES) Changes - BHP, Chartered Accountants` |
| H1 | `The Primary Care Network Directed Enhanced Service (PCN DES) Changes` |
| Published | 1 May 2026. Stamped "Reading Time \| 3 mins" |
| Word count | **~922** |
| H2 / H3 | H3 only: `What Has Changed?`; `Why This Matters`; `Are Single Neighbourhoods Now Being Delivered Through the DES?`; `How does this impact GP practice finances?`; `Are PCNs Organised for This Next Phase?`; `Practical Actions to Consider Now`; then chrome (`Our insights to your inbox`) |
| Tables | No |
| FAQ block | No |
| Worked example | No |

**Covers, and this is current and material:** a 2026/27 change to the PCN DES. Verbatim: *"The Primary Care Network
Directed Enhanced Service (PCN DES) has undergone a significant and unexpected update for 2026/27. While funding
remains nationally set, Integrated Care Boards (ICBs) can now locally vary parts of the PCN DES through a formal
Local Variation Agreement."* And: *"The PCN DES has moved from being a national specification to something more
flexible and locally driven."* And: *"It aligns closely with emerging neighbourhood working models and creates what
has been described as a LES DES hybrid: national funding, local specification. This may be the most significant
evolution of the PCN DES since its introduction."*

On the money: *"One of the most important issues raised by this change is where PCN money sits."* And a quantified
claim: *"PCN and enhanced services income typically represents 30% of total revenue for a GP practice. A shift in
funding control could, over time, affect both profitability and viability if not planned for."*

**What it gets wrong or omits:** it is a 922-word news reaction, not an explainer. **No definition of a PCN, no
funding streams, no core PCN funding, no nominated payee, no network agreement, no accounting, no tax, no FAQ, no
worked example, and its only headings are H3s with no H2 above them.** It also floats incorporation and federation
as options without working either.

**The 30% figure is BHP's alone and must not be restated by us.** It appears in no primary source, it carries no
citation on their page, and `house_positions.md` contains nothing like it. Under F6 and I6 a percentage without a
named source is a hard fail. **BANNED, see §7.4.**

**Consequence for us.** The most winnable page in the topic is 922 words, has one usable idea, and is dated. **It
holds four keywords totalling 740 volume, including both of the topic's two peer-winnable rows.** The Local
Variation Agreement change is real and current and belongs in our page, sourced from NHS England rather than from
BHP (§7.5).

### 5.3 sandisoneasson.co.uk, Primary Care Networks
`https://www.sandisoneasson.co.uk/news/post/pcn`
**HTTP 200.** **Class: PEER** (universe §2a #7, specialist medical accountancy firm, AISMA member, "ranks on
authority, not volume"). Holds `what is a pcn nhs` (70) at **58**.

| | |
|---|---|
| Title / H1 | `Primary Care Networks` (identical) |
| Word count | ~1,520 |
| H2 / H3 | **None on the content.** The only H2s on the page are `Address` and `Links`, both chrome. **A 1,520-word article with zero content headings.** |
| Tables | No |
| FAQ block | No |

**Covers, and this is the only real competitor treatment of O20's accounting layer anywhere in the set:** the
fundholding models and their accounting consequences. Verbatim: *"The flat model requires one practice to be a
fundholder and no doubt a separate bank account was set up for this. The fundholding practice is holding money on
behalf of the other member practices."* And, on the surplus: *"If the fundholding practice is carrying surplus funds
as at the NHS year end i.e. 31 March, the accounting of these monies needs to be considered carefully. HMRC would
argue that each practice should show their share of any surplus funds within their respective accounts."* And on
structures: *"There is a variation of structures but the most common are the 'flat' model and the 'federated
model'."* It also flags: *"lack of access to the NHS Pension scheme for PCNs operating in this way may prove a
significant barrier to trading as a standalone business."*

**What it gets wrong or omits:** **it is stale by roughly six years.** Verbatim opening: *"Primary care networks or
PCNs have been with us for a year or so now in England and we are now at the stage where the PCNs will need to
produce an account of its finances."* PCNs began July 2019, so the page is written from 2020 and has not been
touched. It refers to CCGs. It has no funding streams at all, no core PCN funding, no enhanced access, no capacity
and access, no IIF, no premia, no figures of any kind, and no headings. It is also heavily sales-framed: three
separate "get in touch" closes inside body copy, which `language_spec` D3 forbids for us.

**Consequence for us, and it is the strongest competitive finding in the pack.** **A stale, heading-less,
figure-free 2020 article is the market's best treatment of PCN money.** It is at position 58 for a reason. The
surplus and fundholder material in it maps directly onto three of our position-1.0 Bing queries
(`is pcn core the same as pcn surplus`, `is psn core the same as pcn surplus`, `pcn dispersal of funds income`) and
onto `if a practice leaves the pcn who pays the costs`. **We have none of it and we already rank at position 1 for
the questions it answers.**

### 5.4 practiceindex.co.uk, The latest PCN DES guidance
`https://practiceindex.co.uk/gp/blog/latest-version-pcn-des/`
**HTTP 200.** **Class: PEER** (universe §2a #6). Holds `pcn des 2025/26` (40) at 42 and one other row.

| | |
|---|---|
| Title / H1 | `The latest PCN DES guidance` (identical) |
| Word count | ~963 |
| H2 / H3 | **No content headings.** All H3s are chrome (`Related Posts`, `Recent Blog Posts`, `Tag Cloud`, `Social Media`). |
| Tables | No |

**Covers:** a signposting post to a downloadable guidance document. Verbatim: *"the changes that have been made by
NHS England are summarised in their explanatory note dated 19th March 2020"* and *"The explanatory note recognises
the effect that COVID-19 is having on practices."*

**What it gets wrong or omits:** **it is a March 2020 COVID-era post, still ranking on `pcn des 2025/26` in 2026.**
It is a pointer to a PDF, not content. No funding, no accounting, no tax, no definition.

**Consequence for us.** Confirms the pattern. Three of the five ranking pages in this topic were written before
2021 and none has been maintained. **The staleness of the incumbent layer is this topic's whole opportunity**, and
it is the same finding `BATCH2_INDEX.md` §10C makes about the uniform and mileage clusters.

### 5.5 practiceindex.co.uk, PCN, Mandatory network agreement
`https://practiceindex.co.uk/gp/blog/pcn-mandatory-network-agreement/`
**HTTP 200.** **Class: PEER.** Holds `pcn network` (50) at 67.

| | |
|---|---|
| Title / H1 | `PCN - Mandatory network agreement` (identical) |
| Word count | ~1,885 |
| H2 / H3 | `Why you don't need a lawyer`; `Easy guide to completing your mandatory network agreement & Schedules`; H3 `1. Mandatory network agreement`; H3 `2. Schedule 1`; H3 `3. Schedule 2`; H3 `4. That's all for now...` |
| Tables | No |

**Covers:** how to complete the network agreement, schedule by schedule. **This is the only competitor page anywhere
in the set that treats the network agreement, which is O20's document.** Verbatim on the payee: *"a list of key
decisions you'll have made as a group, like the name of your network, a description of the geographical area you now
cover as a group, the name of the nominated payee for all the funding to go to (usually one of the surgeries, but
it's possible that this could be a federation if the group..."* And on Schedule 2: *"whether you want to add express
terms for your own group on the subjects of principals, clinical director's additional terms or expectations,
information sharing, intellectual property, joining and leaving the group..."*

**What it gets wrong or omits:** **it is a May 2019 set-up post**, written to a "15th May" deadline that passed
seven years ago, framed entirely as first-time completion. It has no money in it: no funding streams, no
distribution basis, no accounting consequence of any schedule term. It ends by offering to write more "if you've
found this blog helpful".

**Consequence for us.** It corroborates the nominated-payee mechanism our page already describes, from the
document itself, and it corroborates that **joining and leaving is a Schedule 2 express term**, which is the
contractual hook for our position-3.0 query `if a practice leaves the pcn who pays the costs`. **Nobody has paired
the network agreement with the accounting consequence.** That is whitespace 3.

### 5.6 practiceindex.co.uk, PCNs secured for 2025/26: welcome news or temporary fix?
`https://practiceindex.co.uk/gp/blog/pcns-secured-for-2025-26-welcome-news-or-temporary-fix/`
**HTTP 200.** **Class: PEER.** Holds `arrs reimbursement rates 25/26`, `des: contract 25/26`,
`network contract des 25/26`, `des contract 25/26`, all at positions 65 to 94.

| | |
|---|---|
| Title / H1 | `PCNs secured for 2025/26: welcome news or temporary fix?` (identical) |
| Word count | ~1,282 |
| H2 / H3 | No content headings; all chrome |
| Tables | No |

**Covers:** funding-continuity reassurance plus practice-manager quotes. Verbatim: *"NHS England has provided some
welcome yet unquestionably overdue reassurance to GP practices and additional roles reimbursement scheme (ARRS)
staff that the future of PCNs is secure for the 2025/26 financial year."* And: *"the confirmation that PCNs and ARRS
funding will continue until at least March 2026"*, plus the ARRS expansion to newly qualified GPs and practice
nurses.

**What it gets wrong or omits:** it is a comment piece built on named practice-manager quotes. **We cannot imitate
its method at all** (I2 and I4: no named individuals, no testimonial blocks). It carries no funding mechanics.

**Consequence for us.** It is evidence about vocabulary, not about content: **four of the topic's year-string
keywords sit on a comment piece at positions 65 to 94.** That is how weakly held the year-string family is. It
still does not license placing more than two orders of it (V1, §4.3).

### 5.7 practiceindex.co.uk, The two big problems with the 2026/27 GP contract
`https://practiceindex.co.uk/gp/blog/the-two-big-problems-with-the-2026-27-gp-contract-by-ben-gowland/`
**HTTP 200.** **Class: PEER.** Holds `pcn des 26/27` (260) at 28 and `pcn des 2026/27` (50) at 38, jointly with
aisma.org.uk and bhp.co.uk.

| | |
|---|---|
| Title / H1 | `The two big problems with the 2026/27 GP contract - By Ben Gowland` (identical) |
| Word count | ~1,058 |
| H2 / H3 | No content headings; all chrome |
| Tables | No |

**Covers:** a named-author opinion piece on the 2026/27 settlement. **No funding mechanics, no accounting, no
definition.** Bylined to an individual, which we may not do (I2).

**Consequence for us.** The highest-volume year-string row in the topic (`pcn des 26/27`, 260) is held at 28 by an
opinion column with no headings. Recorded; still capped by V1.

### 5.8 Two fetch failures, recorded with status codes and not dropped

| URL | Status | Why it was wanted |
|---|---|---|
| `https://www.pricebailey.co.uk/blog/vat-and-doctors/` | **403** with UA, Accept-Language, Referer and `--compressed` | `cluster_dossier_2026-08-26.md` (correction note) records that this page carries a **"VAT for PCNs"** H2 and a **"Looking ahead: The future of PCNs"** H2. pricebailey.co.uk is a §2a peer (#5). This is the only known peer treatment of PCN VAT. |
| `https://www.honeybarrettmedical.co.uk/who-we-help/primary-care-networks/` | **403** with the same headers | Holds a PCN URL at position 41 in the harvest. Not in the §2a peer set (it is not one of the 22), so it is a non-peer specialist firm, but its page is on-topic. |

**Both failures are material and neither is fatal to this pack.** The Price Bailey PCN VAT material sits behind
**O17**, which fences this page to one sentence on VAT anyway, so its absence cannot change what this page writes.
It **would** change the ARRS pack (O21 owns the shared-staff VAT trap) and the dispensing pack (O24), and the
dossier note already establishes that its zero-rating sentence falsified a batch-1 whitespace claim.

**Recommended, not done here:** `BATCH2_INDEX.md` §10B established that the UA fix recovered nine of nine 403s
including two pricebailey URLs. **The same headers do not recover this one**, which means the block is
path-specific or has tightened since. The next step is a PDF-or-cache route or a different fetch path, and it is a
$0 open item that belongs to the ARRS and dispensing packs more than to this one.

### 5.9 Union of competitor heading and content themes, minus ours = THE COVERAGE CHECKLIST

§9.9 floor 8 requires **zero undecided themes. 18 themes, 18 decisions.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | **The bare name `PCN DES`** (5.2 title and H1, 5.4 title, BMA 5.1 H2) | **COVER** | 260 volume at the topic's only good peer-held position (13). Our page has **zero** occurrences. The single cheapest fix in this pack. |
| 2 | **`des gp` / `des nhs` / `nhs des`** (5.2) | **COVER, TWO ORDERS ONLY** | 330 combined volume, held at 19 to 29 by a 922-word post. V1 caps at two of the three. |
| 3 | **Who pays for the DES** (nobody covers it; our own position-1.0 query) | **COVER** | NHS England commissions and directs the DES; the ICB is the commissioner that pays. Direct answer to `who pays for pcn des` (1 click, pos 1.0) and `where does this money come from that the pcn can use` (pos 1.0). Verify at source per §7.5. |
| 4 | **ICB Local Variation Agreements to the PCN DES for 2026/27** (5.2) | **COVER, from primary source** | Current, material, and squarely O20 (what the DES pays for and how it is specified). **Do not take it from BHP.** Verify at NHS England per §7.5. |
| 5 | **Network participation payment, £1.76 per registered patient** (5.1 verbatim; also on our page) | **COVER, RE-TAGGED** | Both the BMA and our page state £1.76 for **2025/26**. The live year is **2026/27**. See the §7.4 escalation: the writer may not edit the existing sentence, and the new block must carry the current-year framing. |
| 6 | **Capacity and Access Support Payment, monthly, 12 equal payments, ~£137k a year / ~£11.4k a month per PCN** (5.1 verbatim) | **COVER the MECHANISM, not the figures** | The 12-equal-monthly-payments structure is a cash-flow fact and is exactly what our accounting section needs. The £137k / £11.4k are BMA-stated 2025/26 averages, not primary source, and are **BANNED** (§7.4). |
| 7 | **CASP / CAIP as named acronyms** (5.1) | **COVER, glossed** | Our page says "a support component and an improvement component" and never names them. The reader's payment statement says CASP and CAIP. Gloss on first use per D4. |
| 8 | **CQRS as the claiming and payment-calculation system** (our own Bing queries; no competitor) | **COVER, one paragraph** | `what elements of pcn finances are done via cqrs` (pos 9.0) plus a full CQRS screen paste as a query. **Zero competitor coverage. Zero on our page.** O26 owns PCSE reconciliation, so this is one paragraph on where a PCN claim is made and declared, then a link to the PCSE page. |
| 9 | **Permitted spend: what PCN money may and may not be bought with** (no competitor; our two printer queries) | **COVER** | 7 impressions across two phrasings at positions 1.0 and 2.0, our highest-impression query. Answerable at the envelope altitude: core PCN funding is unringfenced running-cost money subject to the network agreement, other strands are purpose-tied. Verify per §7.5. |
| 10 | **Year-end surplus and how it is treated** (5.3 verbatim, HMRC argument) | **COVER** | Three position-1.0 queries. The only competitor treatment is six years stale. **The strongest single addition in this pack.** |
| 11 | **The fundholder / flat model against the federated model** (5.3) | **COVER** | Our page has "lead (host) practice", "GP federation" and "another legal entity" and no model names. The market's words are `flat model` and `federated model`. |
| 12 | **A practice joining or leaving the network, and who carries the costs** (5.5 Schedule 2; our pos-3.0 query) | **COVER** | Contractual hook exists (network agreement Schedule 2 express terms). Nobody pairs it with the money. |
| 13 | **What a PCN is: the 30,000 to 50,000 footprint and the legal-entity question** (5.2 mentions the footprint; nobody defines) | **COVERED ALREADY, phrase-fix only** | Our opening H2 does this better than anyone. `what is a pcn nhs` (70, held at 58) is a phrase we lack, not a fact. Place the phrasing in a new FAQ question; do not rewrite the existing block. |
| 14 | **ARRS reimbursement rates and role list** (5.1 table, 5.6) | **DECLINE, O21** | The PCN page gets **two sentences** and hands off. The existing page already exceeds this, see §6.4. |
| 15 | **ARRS weighted-population allocation of the PCN's ARRS sum** (5.1 verbatim) | **DECLINE, O21** | Tempting, because it is an envelope fact in shape. It is ARRS mechanics in substance. Named so the decline is recorded. |
| 16 | **Clinical director payment, calculation and tax** (5.3 at length) | **DECLINE, O22** | One sentence, then link. sandisoneasson devotes four paragraphs to it and to its VAT; we may not. |
| 17 | **PCN VAT and shared staff** (5.3; pricebailey 403) | **DECLINE, O17 and O21** | Our existing `VAT and Pension in One Breath` H2 already sits at the permitted altitude. Add nothing. |
| 18 | **Incorporation of a PCN, limited company, CIC, federation as a trading vehicle** (5.2, 5.3) | **DECLINE, O33 and wave C** | O33 assigns incorporation of a medical practice to wave C, one page only, named after the D3 ruling. A PCN vehicle is adjacent enough to be a genuine boundary question. **Raised in §10 rather than annexed.** |

---

## 6. Our current page, read honestly

Source: `Medical/web/content/blog/pcn-funding-network-contract-des-explained.md`, read in full 2026-08-26.

| | |
|---|---|
| Word count, whole file | **4,457** (`wc -w`, includes frontmatter) |
| Word count, body only | **2,932** (frontmatter stripped, HTML tags stripped) |
| `metaTitle` | `PCN Funding & the Network Contract DES Explained` (47 characters) |
| `h1` | `PCN Funding Explained: The Network Contract DES and How the Money Flows` |
| `title` | `PCN Funding and the Network Contract DES Explained` |
| Date / generator | 2026-06-03, `opus-4.8/netnew-wave` |
| Category | `GP Practice Management` |
| H2 count | **7** (listed in §1) |
| H3 count | 6, all nested under `The Funding Streams Inside the Network Contract DES` |
| FAQ entries | **14** |
| Key takeaways | **5** |
| Tables | **None** |
| Worked example | **None** |
| Inline CTA block | 1, a bordered `div` before the VAT H2 |
| Internal links | 13, all resolving (checked file-by-file, §6.5) |

### 6.1 What is good, and it is a lot

1. **The funding-stream taxonomy is complete and correct.** Core PCN funding, ARRS, enhanced access, capacity and
   access, the IIF, care home and other premia. No competitor page in the set has more than two of these six, and
   the BMA page, which holds the topic's head term, has three.
2. **The two-layer framing is the right frame and nobody else uses it.** Core contract funding to the practice
   against the network layer to the network, stated in the first H2 and carried through. It is the honest answer to
   `how does funding working in pcn and pratices` (1 click, position 3.0).
3. **The nominated payee section is genuinely expert.** Three paragraphs on what it means when a lead practice holds
   the money, on federation payees, and on why distribution is rarely an equal split. The only competitor treatment
   of any of this is a stale 2020 article and a 2019 form-filling post.
4. **The ARRS-netting discipline is the best thing on the page.** Post the reimbursement without the matching cost
   and you overstate profit and every partner's tax. It is stated twice, at two altitudes, and it is correct.
5. **It refuses to lock a figure.** "confirm the current figure in the Network Contract DES specification" recurs.
   That is house behaviour and it is why the page survives its own staleness (see 6.3).
6. **The ownership handoffs are mostly already in place.** ARRS, clinical director, enhanced services, GMS, the
   partnership tax guide and the profit-sharing guide are all linked, in prose, at the right moments.
7. **Zero em-dashes** (I1 pass, counted). **No V2 violation**: no "also searched as", no "also known as", no
   keyword-research narration anywhere.

### 6.2 What is thin, measured

| Gap | Measurement |
|---|---|
| `PCN DES` as a bare phrase | **0 occurrences.** The page's own topic name. |
| Any `2026/27` year string | **0 occurrences.** `2025/26` appears 4 times. |
| `surplus` | **0 occurrences.** Three of our position-1.0 Bing queries ask about it. |
| `CQRS` | **0.** Two queries ask about it. |
| `ICB` / `Integrated Care Board` | **0.** The commissioner that pays and, from 2026/27, may locally vary the DES. |
| `who pays` in any form | **0.** Position-1.0 query. |
| `flat model` / `federated model` | **0.** The market's names for the two payee structures the page describes without naming. |
| `local variation` / `neighbourhood` | **0.** The 2026/27 change. |
| `extended access` | **0** (the page uses "enhanced access", which is correct; the reader's query says "extended access from pcn"). |
| Tables | **0.** Six funding streams with different bases, different payment frequencies and different recognition rules is the most natural table in the wave-A cluster and it is prose. |
| Worked example | **0.** G1 is arguably engaged (the core-funding split and the £0.733 multiplier are arithmetic a reader asked about by name). |

### 6.3 What is stale against house positions

**The page is not wrong anywhere.** Every fact checked against `house_positions.md` §3 (contract structure, GMS/PMS,
Global Sum, Carr-Hill, QOF, enhanced services, PCN/Network Contract DES, ARRS, partner income as profit share),
§2.C (Type 1 Annual Certificate, a company cannot hold a GMS/PMS contract, company income is not NHS-pensionable),
§1 (taxed on profit share, not drawings) and §6 (NHS income outside the scope of VAT) is correct. **It states no
Global Sum figure and no QOF point value**, so F5 passes.

**It is stale-framed in one respect, four times.** `house_positions.md` §3 records: *"The live year is 2026/27 ...
The 2025/26 contract is now the prior year and must not be described as current."* The page's four uses of 2025/26
are all hedged as illustrative and all say "uplifted annually, confirm at source", so none is a factual error. But
the page's only year anchor is the prior year, and it never names the live one.

The four occurrences:

1. `keyTakeaways` #2: *"For 2025/26 core PCN funding was around £2.999 per patient (roughly £2.266 registered-list
   plus £0.733 adjusted-population) and the network participation payment was around £1.76 per registered patient,
   both uplifted annually."*
2. FAQ *"How much is PCN funding per patient?"*: *"For illustration only, core PCN funding was around £2.999 per
   patient for 2025/26 and the network participation payment was around £1.76 per registered patient."*
3. Body, under `The Network Contract DES`: *"for 2025/26 this was around £1.76 per registered patient, uplifted
   annually."*
4. Body, under `Core PCN Funding`: *"For 2025/26 core PCN funding was around £2.999 per patient, split between a
   registered-list element (around £2.266) and an adjusted-population element (around £0.733)."*

**EXTEND forbids rewording any of them. See the §7.4 escalation.**

### 6.4 One live ownership breach in the existing page, and the writer must NOT fix it

**O21 says: "The PCN funding page gets two sentences naming ARRS as a DES strand and hands off. It must not explain
the employment model."**

The live H3 `Staff Reimbursements: the Additional Roles Reimbursement Scheme (ARRS)` is **157 words and 6
sentences**. It states the reimbursement mechanic, the per-role maximum, the who-must-employ-before-claiming rule,
the above-cap consequence, the reimbursable role list (clinical pharmacists, first-contact physiotherapists,
paramedics, care coordinators, social prescribing link workers, plus salaried GPs and practice nurses for 2025/26),
and where the maxima are set. Only the last clause is a handoff.

**That is O21's fact, in O20's page, at three times the permitted length.** It predates the map: the page was
generated 2026-06-03 by `opus-4.8/netnew-wave` and the map was built 2026-08-26.

**Handling, and it is not the writer's call.**
- **The writer leaves it byte-identical.** EXTEND forbids rewording existing text, and the coordinator's batch-1
  ruling 3 permits factual corrections inside frozen copy, not ownership corrections. Nothing here is factually
  wrong.
- **The writer adds no further ARRS material of any kind**, and its two permitted ARRS sentences are already spent
  many times over. **The correct number of new ARRS sentences on this page is zero.**
- **This is escalated to the conductor as a named item** (§10, correction C6), because it is a wave-level decision:
  either the ARRS pack differentiates against this block and does not duplicate it, or the conductor rules a
  one-off deletion. **The ARRS pack must be told this block exists before it is written**, or wave A ships the
  batch-1 failure with ARRS in the role the Scheme Pays deadline played.

The same check on the other fences comes back clean: clinical director is **one sentence plus a link** in the body
and one FAQ about whether the funding sits inside core PCN funding (an envelope fact, permitted); core GMS is **one
sentence plus a link**; enhanced services **one sentence plus a link**; VAT is at the O17 altitude; QOF is named
twice as a contrast and never explained. **O21 is the only breach.**

### 6.5 Checked against the CURRENT rules, including V2

Per V2's enforcement note, an older page is checked against the rules as they stand today, not as they stood when it
was written. Measured on body copy only, frontmatter excluded:

| Rule | Band | This page | Verdict |
|---|---|---|---|
| I1, em-dashes | 0 | **0** | **PASS** |
| V2, keyword-research narration | none | **none** | **PASS** |
| F5, UNVERIFIED figures | 0 | **0** (no Global Sum, no QOF point value) | **PASS** |
| F6 / I6, unsourced statistics | 0 | **0** | **PASS** |
| I2, named experts | 0 | **0** | **PASS** |
| I5, pricing | 0 | **0** | **PASS** |
| V5 / J6, `it is not X, it is Y` | max 2, wave-wide cap 1 | **0** full constructions | **PASS** |
| V9, numeral-count paragraph opener | wave-wide cap 1, prefer 0 | **0** | **PASS** |
| C1, mean sentence length | 15 to 22 words | **26.7** | **FAIL** |
| C1, max sentence | 40 words | **67** | **FAIL** |
| C3, "you"/"your" per 1,000 | 12 to 25 | **5.8** | **FAIL** |
| C4, "we"/"our"/"us" per 1,000 | max 3 | **8.2** | **FAIL** |
| B4, question-form H2 rate | 50% to 75% | **0 of 7** | **FAIL** |
| L4, at least one table | >= 1 | **0** | **FAIL** |
| H1, FAQ count | 4 to 8 | **14** | not a defect, see below |

**Six band failures, and EXTEND forbids fixing five of them.** Coordinator ruling 2 is directly on point: *"On
EXTEND pages the structural bands are scored against the EXTEND reality. A frozen structure can make the
question-form heading rate and the FAQ count unreachable. That is a consequence of the grade, not a defect, and a
writer must never contort a page to reach a band the grade forbids."*

So:
- **C1, C3 and C4 are recorded and not fixed.** Every existing sentence is frozen. **The new blocks must be written
  to the bands** (15 to 22 mean, none over 40, 12 to 25 "you" per 1,000, at most 3 "we" per 1,000), which will pull
  the page-level figures toward the bands without touching a frozen word. Section 7.6 makes this countable **on the
  new blocks alone**, which is the only honest way to gate it.
- **B4 is reachable and should be reached.** The frozen seven H2s are all noun phrases. **Every new H2 must be
  question-form**, which is also what B2 wants and what the query evidence in §3.3 supplies for free.
- **L4 is reachable.** A table of the funding streams goes in a new block. It is additive, so K2 permits it.
- **H1 at 14 is not a defect.** Coordinator ruling 1: the 4-to-8 band governs a newly authored set only, and
  existing substantive FAQ entries are never deleted to hit a count. **Adding to a 14-entry list is a judgement
  call**: §7.1 caps new FAQs at 4, and the writer should prefer body prose where a phrase can live there instead.

**The C4 figure deserves one line of diagnosis, because it is the largest miss.** Eight of the page's "we"
occurrences are in the frozen `How We Help GP Practices and PCNs` H2 and its two paragraphs, and most of the rest
are the handoff formula "our guide to". The handoffs are required by the ownership map. **So the map itself pushes
this page's C4 up**, and the new blocks must handle handoffs without "our guide to" wherever possible. Worth
raising batch-wide: on a heavily-fenced page the C4 band and V3 pull against each other.

---

## 7. Deterministic acceptance criteria

### 7.1 The named missing-phrase list, and it is what the 14-day and 28-day read is measured on

**Two tiers, counted separately. Tier 1 is verbatim phrase placement and is a hard gate. Tier 2 is
question-coverage and is scored by whether the page answers the question, not by string match.**

#### Tier 1: phrases that MUST appear verbatim (case and punctuation normalised). 9 phrases.

V1-capped. The harvest offers 13 on-topic keywords across four idea families; **V1 permits two word orders per idea
per page**, so 9 are placed and 4 are declined. Counted as **non-overlapping longest matches**, never raw
substrings.

| # | Phrase | Vol | Best held | Peer-winnable | Idea family | Where it goes |
|---|---|---|---|---|---|---|
| 1 | `pcn des` | 260 | 13 (bhp.co.uk) | **YES** | DES-name (1 of 2) | A new **H2** in question form. The single highest-value placement in this pack. |
| 2 | `what is pcn des` | (Bing named query, pos 5.0) | n/a | n/a | DES-name (2 of 2) | A new **FAQ question**. |
| 3 | `des gp` | 110 | 19 (bhp.co.uk) | **YES** | DES-scope (1 of 2) | Body prose. Awkward as English; place as "the DES GP practices sign up to" or similar natural construction. If it cannot be placed as natural English, **report it unplaced** (V2) rather than forcing it. |
| 4 | `nhs des` | 110 | 29 | no | DES-scope (2 of 2) | Body prose or an FAQ answer. |
| 5 | `pcns payment` | **9,900** | 8 (bma.org.uk, non-peer) | no | payment-head | Body prose. The topic's head term at 88% of its volume. Natural placement: "how PCNs payment reaches a member practice" reads badly; prefer a construction the writer can make read as English, and **report unplaced if it cannot**. |
| 6 | `pcn core funding` | (Bing named query, pos 6.0) | n/a | n/a | core-funding (1 of 2) | Body prose, in the market's word order. The page has "core PCN funding"; this is the reverse order and it is a distinct search. |
| 7 | `pcn funding model` | (Bing named query, pos 8.0) | n/a | n/a | core-funding (2 of 2) | A new **H2** or FAQ question. |
| 8 | `pcn des 2026/27` | 50 | 38 | no | year-string (1 of 2) | The current-year block. **This is the live year and it must be the one that leads** (F2). |
| 9 | `what is a pcn nhs` | 70 | 58 | no | definition | A new **FAQ question**. The fact is already on the page; only the phrasing is missing. |

**DECLINED under V1, named so the decline is recorded and is not read as an omission:**
`pcn des 26/27` (260), `pcn des 2025/26` (40), `network contract des 25/26` (50), `des contract 25/26` (50),
`des: contract 25/26` (50), `des nhs` (110), `pcn network` (50). Seven phrases, 610 volume, all of them a third or
fourth word order of an idea already carried twice. **Placing them would be a V1 defect.**

**DECLINED as wrong intent:** `pcn manager jobs` (140), `pcn manager` (70), `maidenhead pcn` (50). Recruitment and
local-vacancy intent held by practiceindex's job board. **We are not a job board and must not chase these**, even
though two of the three are technically peer-winnable. Recorded because they inflate the peer-winnable figure in
§4.2 from 370 to 580 and a later reader will otherwise wonder where the 210 went.

**Countable test: 9 of 9 present, or fewer with each absentee reported as UNPLACED with a reason. Any silent
absence is a named BLOCK.**

#### Tier 2: questions the page MUST answer, taken from its own live Bing named queries. 10 questions.

These are not string matches. **The gate is that a reader typing the question finds the answer on the page.** Each
row names the live query, its current position, and the section that must answer it. **Ordered by our current
position, worst first**, because those are the ones where the vocabulary is missing.

| # | The reader's question (live Bing query, verbatim) | Impr | Clicks | Current pos | Must be answered by |
|---|---|---|---|---|---|
| 1 | `pcn des` | 1 | 0 | **10.0** | The new `pcn des` H2. Bare head, worst position on the page. |
| 2 | `what elements of pcn finances are done via cqrs` | 1 | 0 | **9.0** | A new CQRS paragraph. One paragraph, then link to `/blog/gp-practice-income-pcse-statement-reconciliation` (O26). |
| 3 | `is enhanced access taxable and how much of it is taxed for a partnered gp` | 1 | 0 | **9.0** | The enhanced-access money question, at envelope altitude: it is practice trading income, taxed through the profit share. One sentence, then link (O26, O35). |
| 4 | `pcn funding model` | 1 | 0 | **8.0** | A new H2 naming the model. |
| 5 | `what can you claim as a practice as part of hosting and payroll of extended access from pcn` | 1 | 0 | **7.0** | The recharge and hosting question. **Not the payroll mechanics** (O21). What a hosting practice recovers and how it appears in its accounts. |
| 6 | `if a practice leaves the pcn who pays the costs` | 1 | 0 | 3.0 | The joining-and-leaving block, hooked to the network agreement Schedule 2 express terms (5.5). |
| 7 | `can a pcn but printers for practcies from pcn funds` **+** `are pcns allowed to use any of their funding to buy printers and toners for practic es` | **7** | 0 | 1.0 / 2.0 | The permitted-spend block. **Highest-impression query on the page and it converts nothing.** |
| 8 | `is pcn core the same as pcn surplus` **+** `is psn core the same as pcn surplus` **+** `pcn dispersal of funds income` | 3 | **1** | 1.0 | The year-end surplus block. |
| 9 | `who pays for pcn des` **+** `where does this money come from that the pcn can use` | 3 | **1** | 1.0 | The who-pays block. |
| 10 | `why within the pcn funding is the core payment partly multiplied by 0.733?` | 1 | **1** | 2.0 | The core-funding split. The page states the £0.733 element; it never says why the split exists. |

**Countable test: 10 of 10 answered, each with a named section. A QA agent checks by reading the section, not by
grepping.**

#### The one-line summary of 7.1, for the writer

**Nine phrases and ten questions. The nine phrases are worth 10,600 of harvest volume; the ten questions are worth
seven Bing clicks a quarter from readers who are already finding us at position 1 to 3.** The questions matter more.

### 7.2 Equity preservation (§9.9 floor 5)

**All 46 topical Bing named queries in §3.3 must still match** in `metaTitle`, `h1`, an H2, an H3, an FAQ or body
prose after the change. Google contributes 0 rows, so **the combined equity set is 46**.

Because this is EXTEND and **nothing existing is removed**, no query can be lost by deletion. The only mechanism by
which one could be lost is dilution: a new block drawing the URL toward a different intent. That is a real risk on
`pcns payment` (9,900 volume, a broad head) and it is why §8 carries a CTR trigger as well as a volume one.

**Countable test:** 46 of 46 matchable. Run
`python scripts/track2_query_coverage.py --slug pcn-funding-network-contract-des-explained --json`.

The typo cluster (`practcies`, `practic es`, `managemet`, `acheivement`-style variants, `psn` for `pcn`, `kegal`,
`reimburemant`, `pratices`) is protected by the underlying terms staying present. The matcher normalises. Do not
place a misspelling on the page to chase one (V2, and it would be indefensible copy).

### 7.3 EXTEND byte-identity

Diff the pre and post files. The following must be byte-identical:

- `title`, `metaTitle`, `h1`, `metaDescription`, `slug`, `canonical`, `date`, `generator`, `author`, `image`, the
  whole `imageCredit` block, `category`, `altText`, `summary`, `schema`
- All **7** existing H2 strings, in their existing relative order
- All **6** existing H3 strings
- All **14** existing FAQ question and answer strings
- All **5** existing `keyTakeaways` strings
- Every existing paragraph, every existing `<ul>` and `<li>`, and the inline CTA `div`

**Countable test:** `git diff` shows **only additions. Deletion count must be 0**, with no exception, unless the
manager has explicitly cleared the year-tag escalation in §7.4, in which case the permitted deletion count is
exactly the lines named there and the diff is reviewed line by line.

### 7.4 Figures: the escalation, the bans, and the V7 conflict

#### 7.4.a THE ESCALATION. Four stale-framed year tags the writer must NOT resolve alone.

The four occurrences listed in §6.3 all tag live figures to **2025/26** while `house_positions.md` §3 records
2026/27 as the live year and says the prior year "must not be described as current". **None is factually false**;
all four are hedged and all four say "uplifted annually, confirm at source".

**EXTEND forbids rewording them. The de-stale duty says stale framing gets fixed. These conflict and the writer must
not resolve it.**

**Handling, which is the same shape as the QOF pack's:**
1. The writer leaves all four **byte-identical**.
2. The writer writes the **current-year (2026/27) framing into the NEW blocks**, including the `pcn des 2026/27`
   phrase from Tier 1.
3. The writer **escalates the four to the manager as a named item.** The manager decides whether a year-tag-only
   edit is permitted as a factual-currency exception under coordinator ruling 3.
4. If it is not permitted, they stay, and the new block carries the correct year. **Either outcome ships a correct
   page**, which is why this is a manager decision and not a blocker.

#### 7.4.b BANNED FIGURES on this page. None of these may be asserted.

| Banned | Why | What the page says instead |
|---|---|---|
| **Any QOF point value** | O10 and O25. `language_spec` F5 hard fail. **See the V7 conflict at 7.4.c: house_positions has moved and the MAP still governs.** | One sentence naming QOF as a core-contract stream, then link to `/blog/qof-income-gp-practice-accounting-explained`. |
| **Any Global Sum per weighted patient figure**, including £130.07 | **O19.** The GMS page owns it, and O19 is explicit: "No Carr-Hill explanation, no Global Sum figure, no contract-type comparison anywhere else." The figure being verified does not make it this page's. | "the core contract's per-weighted-patient Global Sum", then link. |
| **Any Carr-Hill explanation or weighting variable** | O19. | One sentence naming it, then link. |
| **Any GMC annual retention fee figure** | O9. Not otherwise relevant; listed for completeness of the ban. | Not applicable. |
| **BHP's "PCN and enhanced services income typically represents 30% of total revenue for a GP practice"** (5.2) | F6 and I6, hard fail. A percentage with no named source, appearing on one competitor page and in no primary source and in no house position. | Do not state a proportion at all. If the point is needed, say the network layer is material to practice profit and is why it must be recognised correctly. |
| **The BMA's "~£137k over the course of the year, or around £11.4k a month"** CASP average (5.1) | Competitor-sourced, 2025/26, an average not an entitlement, and not in house positions. | **The 12-equal-monthly-payments mechanism may be stated** (it is a structural fact, verify per §7.5). The pounds may not. |
| **Any new per-patient, per-population or per-role PCN figure not read at primary source** | F1, F4, F7. Every one of these is uplifted annually and every competitor page in §5 carries a prior-year version. | Name the stream, state the basis (per registered patient, per adjusted population, per role, per bed), and direct the reader to the Network Contract DES specification and the SFE Directions 2026. |
| **Any ARRS per-role maximum, role list addition, or reimbursement rate** | O21. | Nothing. The existing block already exceeds the two-sentence cap (§6.4). |
| **Any clinical director payment calculation or tax treatment** | O22. | One sentence, then link. |

**PERMITTED and corroborated:** the 2026/27 contract settlement figures in `house_positions.md` §3, which are
corroborated three ways (house positions, NHS England's own long-read, and BHP and AISMA independently): a
**£485 million** uplift taking the total contract value to **£13,863 million**, described by NHS England as
**"3.6% cash growth or 1.4% real terms growth"**. These are the numbers that make a new block read as 2026/27. Cite
NHS England. **They are contract-wide, not PCN-specific**, so use at most one sentence of them and do not build a
section on the settlement (that is closer to O19 than to O20).

**Also permitted:** the **£1.76 network participation payment** and the **£2.999 / £2.266 / £0.733** core PCN
funding split, because **they are already on the live page** and EXTEND freezes them. The writer does not restate
them in a new block with a different year tag, because that would put two different years on the same page for the
same figure (F2). It refers to them and re-frames the year in the new block's own words.

**If a worked example is written** (G1 is arguably engaged by the £0.733 query), its inputs must be **explicitly
labelled illustrative**, its arithmetic shown step by step, and it must not introduce a rate the body has not
already stated with its year (G5). Heading must not be "Worked example" (G6, J4, hard fail).

**Countable test: count of banned-figure assertions on the page = 0.**

#### 7.4.c THE V7 CONFLICT, stated rather than resolved silently

**`house_positions.md` has moved under the ownership map, and the map still wins.**

- `BATCH3_INDEX.md` §6.1 row **O10** says: *"the QOF point value (**UNVERIFIED**) ... No page in any wave states a
  QOF point value. Hard fail F5."*
- `language_spec_2026-08-26.md` **F5** says the same, and adds the Global Sum to it.
- **`house_positions.md` §3.B, as it stands on 2026-08-26, states: "The value of a QOF Achievement Point is
  £227.95"**, verified at source in the SFE Directions 2026 Section 6(8), with a practical writing rule that says
  to state it tagged 2026/27. §3.A likewise locks the Global Sum at **£130.07**, and O10 already reflects that half
  of the change.

So the map's O10 is **half stale**: it caught up on the Global Sum and not on the QOF point value.

**This page's behaviour is unaffected**, and that is the point of stating it here. **V7 is binding: the map wins.**
This page states **no QOF point value** and **no Global Sum figure**, not because either is unverified, but because
**O25 and O19 assign both to other pages**. An ownership fence does not care whether a figure is verified. **The
writer states neither and reports the conflict**, which is exactly what the batch-2 writer did that produced V7.

**The correction belongs to the conductor, not to this page** (§10, correction C7). Two documents now understate
what house positions knows, and a later writer reading only O10 will decline a figure it is entitled to use.

### 7.5 Statute, regulation and source re-verification

Every external factual claim in the new blocks maps to a row here, with a fetch date. **A competitor blog is not a
source.** Every one of the six competitor pages in §5 carries at least one prior-year figure.

| Claim | Source to re-verify |
|---|---|
| The Network Contract DES specification for 2026/27: the funding streams, their bases, the participation payment, core PCN funding and its registered-list / adjusted-population split | NHS England Network Contract DES specification and guidance for 2026/27, linked from the 2026/27 contract long-read |
| 2026/27 is the live contract year; £485m uplift; £13,863m total; 3.6% cash / 1.4% real | https://www.england.nhs.uk/long-read/changes-to-the-gp-contract-in-2026-27/ |
| **ICBs may locally vary parts of the PCN DES through a Local Variation Agreement for 2026/27** (the 5.2 claim) | NHS England 2026/27 contract long-read and the PCN DES specification. **Do not take this from bhp.co.uk.** If it cannot be verified at NHS England, it does not go on the page. |
| **Who pays for the DES**: NHS England directs it; the ICB commissions and pays | The Network Contract DES specification, and the NHS (Primary Medical Services) directions that make the DES a directed enhanced service |
| **What PCN funding may be spent on**: which strands are unringfenced running-cost money and which are purpose-tied | The Network Contract DES specification for the year, plus the network agreement's own terms. **State the framework, not a ruling on printers.** |
| **Year-end surplus**: how an undistributed balance held by the payee is treated | `house_positions.md` §1 (partner taxed on profit share) plus general partnership-accounting principle. **The HMRC-argument framing in 5.3 is a competitor's characterisation and must be verified before it is stated as HMRC's position.** |
| The **network agreement** as the governing document, its schedules, and joining-and-leaving as express terms | The NHS England mandatory network agreement template and its schedules |
| **CQRS** as the calculation-and-declaration system for PCN payments | NHS England / NHS Digital CQRS guidance. One paragraph only; O26 owns the PCSE reconciliation. |
| **CASP paid monthly in 12 equal payments proportional to adjusted population** | The Network Contract DES specification (the mechanism only; the BMA's £137k average is banned) |
| Contract structure: GMS/PMS/APMS, Global Sum, Carr-Hill, QOF, enhanced services, PCN/Network Contract DES, ARRS | `house_positions.md` §3 (for the one-sentence handoffs only) |
| Partner taxed on profit share, not drawings; SA800 and SA104 | `house_positions.md` §1 |
| NHS income outside the scope of VAT; the shared-staff exposure | `house_positions.md` §6 (one sentence only, O17) |
| A company cannot hold a GMS/PMS contract; company income is not NHS-pensionable; Type 1 Annual Certificate | `house_positions.md` §2.C |

**Countable test: every external factual claim in the new blocks maps to a row above with a fetch date. Count of
unverified claims = 0.** The Local Variation Agreement claim and the HMRC-surplus characterisation are the two that
will fail this test if the writer takes them from §5 instead of from source.

### 7.6 The floors (§4) plus §9.9 floors 5 to 8

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py --slug pcn-funding-network-contract-des-explained` | Gate bar met; **0 covered queries lost** |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | Every worked figure re-derived from labelled illustrative inputs, or the array is empty |
| 3. Statute verified at source | `statute_checks[]` | Every row in §7.5 fetched and content-verified |
| 4. Link resolution | `track2_link_audit.py` + `predeploy_gate.py` | **0 HARD 404s repo-wide**; new links resolve via `slug_resolver.py`. Note `BATCH3_INDEX.md` §7 defect D1: `/blog/employment-status` currently 404s from the sitemap. **It is not this page's and must not be linked.** |
| 5. Equity preservation | §7.2 | **46 of 46** Bing named queries still match |
| 6. Cluster coverage | §7.1 | **9 of 9** Tier-1 phrases placed or reported unplaced with a reason; **10 of 10** Tier-2 questions answered |
| 7. Reconciliation balance | Dossier §10 | This page's 13 on-topic keywords move from unassigned to **assigned to this page**. **Record the move so the ledger still balances.** No NO-PAGE dossier row is prescribed onto this page (corrected order 12 goes to the GMS page, not here), so nothing moves out of the NO-PAGE bucket. |
| 8. Competitor re-read | §5.9 | **18 themes, 18 decisions, 0 undecided** |

**Plus the band gate on NEW COPY ONLY**, which exists because §6.5 found six page-level band failures that EXTEND
forbids fixing:

| Rule | Measured on the new blocks alone | Pass condition |
|---|---|---|
| C1 | mean sentence length | 15 to 22 words, **no sentence over 40** |
| C2 | paragraph length | 1 to 4 sentences, max 75 words |
| C3 | "you" / "your" per 1,000 | 12 to 25 |
| C4 | "we" / "our" / "us" per 1,000 | **max 3**, and none in any new H2 |
| B2 / B4 | new H2s | **every new H2 is question-form** |
| C5 | new bulleted lists | max 2 new lists, max 8 items each, items are items and not clauses of an argument |
| L4 | tables | **at least 1 new table**, with a caption stating the effective year |
| L1 / L3 | new-block word count | no target. **Do not pad.** V8: report a miss, never close it with filler. |

### 7.7 Extra hard constraints for this page

1. **No em-dashes** (U+2014) anywhere in the new copy, including new FAQ questions and answers and new key
   takeaways. The live page has zero; keep it at zero.
2. **No new internal link inside any existing paragraph.**
3. **Zero new ARRS sentences** (§6.4). The two-sentence O21 allowance is already spent.
4. **No collapse, no redirect, no URL change.**
5. **Never state that the Network Contract DES is compulsory.** It is a Directed Enhanced Service and it is
   voluntary, per the live page and the DES's own nature.
6. **Never use UDAs, dental bands or any dental framing** (`house_positions.md` §3: doctors do not use UDAs).
7. **Do not link to any frozen page's slug as if it were workable**, but contextual links to their live URLs are
   fine and several already exist (`gp-partnership-tax-complete-guide`, `gp-payroll-services`,
   `gp-pension-contributions-tax-relief`, `becoming-gp-partner-financial-implications` are all frozen to 09-10;
   `gp-accounting-guide` is `flagged`). All resolve; none is touched.
8. **Do not add an interruptive element of any kind** (I7). Two already exist site-wide (`DeepScrollModal`,
   `ReturningBar`, `BATCH3_INDEX.md` §7 defect D6); they are not this programme's and no page adds a third.
9. **One change per page per window (§9.3).** This EXTEND is the only change to this URL until the 28-day Bing
   read.

---

## 8. Stated expectation, written before the work

**Baselines, both endpoints named, from the pulls of 2026-08-26.**

| | |
|---|---|
| Bing `GetPageStats`, page level, 2026-05-29 to 2026-08-21 (85 days) | **7 clicks / 85 impressions**, CTR 8.2%, avg impression position 2.0 to 7.0 |
| Bing `GetPageQueryStats`, named-query level, same pull | **7 clicks / 65 impressions / 47 rows (46 topical)**, CTR 10.8% |
| Google, GSC page dimension, 2026-05-25 to 2026-08-23 | **0 clicks / 0 impressions. Absent from the result set.** |
| Pro-rated to 28 days, page level | **2.3 clicks / 28.0 impressions** |
| Pro-rated to 28 days, named-query level | **2.3 clicks / 21.4 impressions** |

**The click shape, because it is the thesis.** Seven clicks from seven distinct queries, **six of them at average
impression position 3.0 or better**. This page converts when it is shown near the top and does not when it is shown
at 5 to 10. The six bare-head queries in §3.4 point 9 all sit at 4 to 10 and none converts. **The page is not being
shown for the phrases the market types, and where it is shown high it wins.** Everything in §7.1 follows from that.

### The read at 14 to 28 days, Bing. This is the primary test.

1. **Named-phrase impressions, the gate.** At least **5 of the 9** Tier-1 phrases in §7.1 return at least one Bing
   impression for this URL in the 28-day window, and **`pcn des` must be one of them**. Today the count is 0 of 9.
   **Per §9.6 point 2, total impressions rising while the 9 stay at zero is DRIFT and is recorded as a FAIL, not a
   pass.**
2. **Named-question coverage.** At least **4 of the 10** Tier-2 questions in §7.1 return a Bing impression from a
   query the page did not previously match, or move up from their current position. The four to watch first are the
   ones currently at 7.0 to 10.0 (`pcn des`, the CQRS query, the enhanced-access tax query, `pcn funding model`),
   because those are where an unmatched term is visibly costing position.
3. **Clicks.** Bing clicks on this URL, page level, in a rolling 28-day window at or above **4** (baseline 2.3).
4. **Impressions.** Bing page-level impressions in a rolling 28-day window at or above **45** (baseline 28.0). The
   topic's combined volume is 11,000 and the incumbent at the two peer-winnable rows is a 922-word news post, so a
   60% rise is a conservative ask.
5. **Position.** Average impression position must **not worsen past 7.0** on any 28-day window. The page currently
   sits at 4.0 to 5.0 in its recent weeks.

### The read at 28 to 90 days, Google. Deliberately weak.

6. **Any page-dimension row at all.** Today: **0**. Target: **this URL appears in the GSC page-dimension result set
   at least once** by day 90. **That is the whole target and it is set at one row on purpose.** On a corpus where
   Google returns rows for 21 of 138 URLs, and where this page has never had a single impression, a page not
   appearing at 90 days carries no information about the page. **A Google miss here is not a failure of the work
   and must not be recorded as one.**
7. **No expectation is set on `pcns payment`** (9,900 volume) despite it being the topic's head. bma.org.uk holds it
   at 8 and is unwinnable authority; the best peer is at 73. Recorded so a later reader does not treat its absence
   as underperformance.

### Failure triggers (§9.6), written as numbers, before the change

> **Trigger 1, volume.** If Bing clicks on `/blog/pcn-funding-network-contract-des-explained` (page level,
> `GetPageStats`) fall below **2** in any rolling 28-day window between deploy and deploy+56 days, revert to
> `git checkout d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3 -- Medical/web/content/blog/pcn-funding-network-contract-des-explained.md`.

> **Trigger 2, dilution.** If named-query CTR on this URL falls below **5%** (against a 10.8% baseline) across a
> full 28-day window **while impressions are flat or up**, the new blocks are drawing the wrong intent and are
> reviewed before any further change. This is the `pcns payment` risk: a 9,900-volume broad head can bring
> impressions that never convert and mask a real loss on the operational queries that do.

> **Trigger 3, equity.** If any of the **46** topical Bing named queries in §3.3 stops returning an impression for
> this URL for **two consecutive 28-day windows**, that query is a named BLOCK and is investigated before any
> further change. The seven click-earning queries are the priority subset.

> **Trigger 4, position.** If average impression position on any 28-day window exceeds **8.0**, stop and
> investigate. An additive-only change should not be able to move structural position, and if it does, the
> additive-only assumption behind the whole EXTEND grade needs re-examining across wave A.

**Wave-level context, from `BATCH3_INDEX.md` §8.** Wave A's combined Bing baseline is 17 clicks / 234 impressions
across six pages, and this page is **7 of those 17 clicks and 85 of those 234 impressions**. It is 41% of the wave's
click baseline. **The wave revert trigger is 13 combined clicks; this page alone falling from 7 to 2 would breach
it.** So trigger 1 above is deliberately tighter than the wave's, and it fires first.

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` must be populated with the **9 Tier-1 phrases
from §7.1**, not with the 46 queries the page already ranks for. **No `monitored_pages` row is written by this
pack.** Registration is a separate owner-triggered step.

---

## 9. Whitespace

What no competitor covers, quotably. Ordered by the strength of our own evidence, not by volume.

**W1. Nobody has written the PCN funding page.** Six competitor URLs, roughly 7,600 words of PCN content between
them, and **not one of them contains a definition of a PCN, a list of the funding streams, an explanation of the
nominated payee, and any accounting, in the same document.** The BMA has entitlement rates with no definition and no
accounting. BHP has one 2026/27 change with no mechanics. sandisoneasson has accounting from 2020 with no funding
streams. practiceindex has three posts, two of them pre-2021, none with money in it. **Our page already is the
missing document and it does not carry the words.** This is the same shape as the QOF finding and it is one degree
stronger, because on QOF at least one competitor showed the arithmetic.

**W2. Nobody says who pays.** `who pays for pcn des` (**1 click, position 1.0**) and `where does this money come
from that the pcn can use` (position 1.0). Zero of six competitor pages answer it. Zero words on our page answer it.
**Two position-1.0 queries and one click on a question that nothing on the page addresses**, which means we are
winning it on adjacency alone.

**W3. Nobody pairs the network agreement with the accounting consequence.** practiceindex covers the agreement
schedule by schedule with no money in it (5.5). sandisoneasson covers the money with no agreement in it (5.3).
**The join is where the reader's questions live**: `if a practice leaves the pcn who pays the costs` (position 3.0),
`operational costs recharged from pcn - ncd` (**1 click**, position 3.0), `pcn managemet support funding`
(2 impressions, position 6.0). The agreement is the document that answers all three and no page in the market makes
the connection.

**W4. Nobody covers the year-end surplus, and the one page that tries is six years old.** `is pcn core the same as
pcn surplus` (**1 click, position 1.0**), `is psn core the same as pcn surplus` (position 1.0), `pcn dispersal of
funds income` (position 1.0). **Three queries at position 1, one converting, and the word "surplus" appears zero
times on our page.** The only competitor treatment is sandisoneasson's 2020 article, which frames it as an HMRC
argument and gives no worked position. This is the **single highest-value addition in the pack** and it is entirely
inside O20 (who holds the money and how it flows to member practices).

**W5. Nobody covers permitted spend.** `can a pcn but printers for practcies from pcn funds` (**5 impressions,
position 1.0**, the highest-impression named query on the page) plus `are pcns allowed to use any of their funding
to buy printers and toners for practic es` (2 impressions, position 2.0). **Seven impressions, two phrasings, one
practice manager holding an invoice, and zero clicks.** We are shown at position 1 and 2 and the reader does not
click, which is the clearest possible signal that the snippet does not answer the question. Zero competitor
coverage.

**W6. Nobody names CQRS.** `what elements of pcn finances are done via cqrs` (position 9.0) and a full CQRS screen
paste as a query (position 2.0). **Zero of six competitor pages mention it. Zero occurrences on our page.** The
person pasting a CQRS achievement screen into Bing is exactly our reader, and O26 gives us the neighbouring page
that owns the reconciliation, so the handoff is free.

**W7. Nobody explains why the core payment splits.** `why within the pcn funding is the core payment partly
multiplied by 0.733?` (**1 click**, position 2.0). Our page states the £0.733 adjusted-population element and never
says why there are two elements. It converted anyway. No competitor states the split at all.

**W8. The whole incumbent layer is stale and it is measurable.** Of the six ranking competitor URLs: one is a 2019
form-filling post, one is a March 2020 COVID notice, one is a 2020 article that says PCNs "have been with us for a
year or so now", one is a 2025/26 comment piece, and the BMA's page leads with a 2024/25 collective-action notice.
**Only bhp.co.uk (1 May 2026) is current, and it is 922 words.** `BATCH2_INDEX.md` §10C found the same on uniform,
mileage and maternity. It is now four clusters out of four.

### KEEP, explicitly

Per §9.3 the specialist layer is never traded away. These are this page's differentiators and stay exactly as they
are. K1 makes any net reduction a hard fail.

- **The two-layer framing** (core contract to the practice, network layer to the network). **KEEP.**
- **The complete six-stream taxonomy** under `The Funding Streams Inside the Network Contract DES`. Nobody else has
  more than three. **KEEP.**
- **The legal-entity paragraph** (a PCN is typically a contractual collaboration, not automatically a company or
  partnership; what that changes for employer, bank account, liabilities and VAT). It is the best answer in the
  market to `are pcn's issued with a network contract` and `what is a pcn to a contract`. **KEEP.**
- **The three nominated-payee paragraphs**, including the lead-practice segregation problem and the point that
  distribution is rarely an equal split. **KEEP.**
- **The ARRS netting discipline**, stated twice. It is the page's clearest expert judgement. **KEEP**, and add
  nothing to it (§6.4).
- **The achievement-fund recognition judgement** (IIF and the improvement element recognised only when reasonably
  certain, with the write-back risk named). **KEEP.**
- **The refusal to lock a per-patient figure**, and the repeated "confirm the current figure at source". That is not
  timidity, it is the house position and it is why this page has not gone stale the way five of six competitors
  have. **KEEP.**
- **The pension line** (NHS-derived profit pensionable for a Type 1 partner via the Annual Certificate; a company
  cannot hold an NHS contract and company income is not NHS-pensionable). Aligned with `house_positions.md` §2.C.
  **KEEP.**

---

## 10. Corrections to the index, the dossier and the spec

Seven, each with the command or quotation that produced it. **None was acted on. No file outside this one was
written.**

**C1. `BATCH3_INDEX.md` §0 records "Repo HEAD at build time `7be12b11`". HEAD is now
`d2e756550a3cb106a91f3b5c247b5e5ffdb93dc3`.** Batch 2 was committed between the index being built and this pack
being written. Every pack in this batch that copies the index's sha will write a revert anchor that predates batch 2
and reverts more than its own page. **Each pack must run `git rev-parse HEAD` itself.** This pack did.

**C2. The brief's "13 weekly snapshots" is a site-level count, not a page-level one.** This URL appears in **9** of
the window's snapshots. Because `GetPageStats` is top-N (the Bing top-N trap memo), the four missing weeks are not
zeros, they are weeks this URL fell out of the returned N. **No pack may read a `GetPageStats` gap as a zero.** The
same caveat applies to `BATCH3_INDEX.md` §7 defect D5's 44 no-data pages, which the index already flags as a
question rather than a finding, correctly.

**C3. A class defect in keyword-selection regexes: `\mpcn\M` misses `pcns`, and `pcns payment` is 9,900 volume.**
This pack's first regex returned 21 rows and lost the topic's head term, which is 88% of its volume. The word-bounded
form was chosen for precision and cost the single most important row. **Every pack in this programme that
word-bounded a keyword stem should re-run unbounded before its counts are quoted.** It is a free SQL re-run against
data already paid for. This is the same class of defect as `BATCH2_INDEX.md` §10A (the peer-winnable column computed
against the wrong domain set) and §10B (the 403s that were user-agent blocks): **a methodological choice that looks
conservative and is actually wrong in one direction.**

**C4. `GetPageQueryStats` returns an empty list, not an error, when `page` is not the full canonical URL.** Three of
four argument forms tested return 0 rows; only `https://www.medicalaccounts.co.uk/<path>` returns the 47. The QOF
exemplar pack (§2) documents the call with a path argument. **An empty list read as "no Bing query data" is a
silent, plausible, wrong finding**, and it would have produced a pack claiming this page has no named-query
evidence at all. Worth adding to the Bing top-N trap memo alongside the endpoint-comparability rule.

**C5. The QOF exemplar pack's §7.1 requires 31 phrases including four word orders of the year-string idea, which V1
caps at two.** `PACK_blog__qof-income-gp-practice-accounting-explained.md` §7.1 lists `qof 2026/27`, `qof 26 27`,
`qof 26/27`, `qof 2025/26`, `qof 25 26`, `qof 25/26`, `qof 2025`, `qof 2025 2026`, `qof 2025/2026` as separate
required phrases and makes "31 of 31 present" a hard gate. **V1's hard cap is two word orders per idea per page.**
Either the QOF page ships a V1 defect to satisfy its own acceptance criteria, or it fails its own gate. The pack
predates the V1 enforcement note. **This pack resolves the same tension in its own topic by placing two and naming
seven declines**, and the QOF pack's 7.1 should be re-cut the same way before that page is written. **This is the
exemplar, so the error propagates.**

**C6. There is a live O21 breach in this page and the ARRS pack must be told before it is written.** The
`Staff Reimbursements` H3 is **157 words and 6 sentences** against O21's two-sentence cap, and it carries the
reimbursement mechanic, the per-role maximum, the employ-before-you-claim rule, the above-cap consequence and the
role list. It predates the map (generated 2026-06-03). **EXTEND forbids this writer from touching it.** The
conductor must rule: either the ARRS pack differentiates against this block explicitly, or a one-off deletion is
cleared. **If neither happens, wave A ships with ARRS occupying the role the Scheme Pays deadline played in batch
1**, which is the exact failure the ownership map exists to prevent. Full detail in §6.4.

**C7. `BATCH3_INDEX.md` O10 and `language_spec_2026-08-26.md` F5 are both stale against `house_positions.md` §3.B.**
Both say the QOF point value is UNVERIFIED and that no page may state it. `house_positions.md` §3.B now states
**£227.95 for 2026/27**, read at source in the SFE Directions 2026 Section 6(8), with a practical writing rule
telling pages to state it tagged 2026/27. O10 already caught up on the Global Sum (£130.07) and did not catch up on
QOF in the same edit. **This page's behaviour does not change** (O25 assigns QOF to another page, and V7 means the
map governs regardless of verification status), **but the QOF page's own writer will read F5 and decline a figure it
is now entitled to use.** Two documents to amend, one line each.

---

## 11. Limitations

1. **The scratchpad pulls named in the brief did not exist and were re-created** (§0). Every Bing figure reproduces
   the brief's expected numbers exactly and the GSC zero is confirmed, so the substitution is a confirmation rather
   than a divergence. If the originals resurface with a different window, the figures must be re-derived, not
   reconciled.
2. **Two competitor URLs returned 403 and were not recovered** (§5.8): `pricebailey.co.uk/blog/vat-and-doctors/`
   and `honeybarrettmedical.co.uk/who-we-help/primary-care-networks/`. The UA-plus-headers fix that recovered nine
   of nine in batch 2 does not recover these. **Neither can change what this page writes**, because both are VAT
   material fenced behind O17. Both matter to the ARRS and dispensing packs.
3. **Bing `GetPageStats` is top-N.** A missing week is not a proven zero (C2). The 85 impressions is therefore a
   floor, not a total.
4. **Peer-winnable is Google-derived.** DataForSEO positions are Google positions. On a page with zero Google
   history and seven Bing clicks, the peer-winnable column orders the vocabulary work and predicts nothing about
   the channel that will actually read out. Per decision 21 it orders and excludes nothing, which is the right
   handling here.
5. **The keyword harvest is a competitor-ranking harvest, not a demand harvest.** A phrase nobody in the 27 domains
   ranks for is absent from it entirely. **Nine of the ten Tier-2 questions in §7.1 appear nowhere in the 32,872
   rows** and exist only because Bing named them for this URL. **On this topic the Bing named-query set is better
   evidence than the paid harvest**, which is unusual and is worth the conductor's attention when scoping wave G.
6. **No live-production check was run.** The page is read from source. It is not verified that the deployed page
   matches the markdown, and `BATCH3_INDEX.md` §7 defect D3 shows that assumption failing elsewhere in the corpus.
   A single `curl -I` on this URL before the writer starts would close it and was not run, because this task's
   mandate is preparation.
7. **The 2026/27 Local Variation Agreement change (§5.2) is single-sourced to a competitor and is NOT usable
   until verified at NHS England** (§7.5). It is the most current and most interesting fact available on this topic
   and it is also the one most likely to be wrong or overstated in a 3-minute accountancy news post. If it does not
   verify, the new blocks lose their strongest current-year hook and that is the correct outcome.
8. **No worked example is prescribed, only permitted.** G1 says a page whose topic involves a calculation carries
   exactly one. The £0.733 query argues the topic does; the fact that every underlying figure is banned or frozen
   argues it does not. **Left to the writer, with the constraint that any example uses labelled illustrative inputs
   and introduces no new rate** (§7.4.b). Recorded as an undecided judgement rather than a silent omission.
