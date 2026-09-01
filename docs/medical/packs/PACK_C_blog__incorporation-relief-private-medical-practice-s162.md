# §9.5 RESEARCH PACK: /blog/incorporation-relief-private-medical-practice-s162

**Batch 3, wave C (incorporation and company structures), INCORPORATION DIFFERENTIATION SET, surface 2 of 4.
GRADE = REFRAME.**

Built 2026-09-01. Spec `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.6. Language spec
`docs/medical/language_spec_2026-08-26.md` (A to L, V1 to V9). Ground truth `docs/medical/house_positions.md`.
Batch index `docs/medical/packs/BATCH3_INDEX.md`. Peer set `docs/medical/competitor_universe_2026-08-26.md` §2a
plus the 17 domains reclassified by the D13 resolution (39 peers of 44 harvested). Site diagnosis
`docs/medical/STATE.md` "Stage 0 diagnosis 2026-09-01".

**What this task did and did not do.** No file under `Medical/web/` was edited. Nothing committed, deployed or
indexed. No row written to `monitored_pages`. No monitor, alert, cron, email or scheduled job created. **No paid
API call: $0.00.** DataForSEO read from the persisted harvest by SQL only. GSC and Bing calls are free. Thirteen
competitor pages fetched live.

**Sibling packs, written in the same task and meant to be read together:**
`PACK_C_blog__medical-practice-incorporation-step-by-step.md` (**read its §5.0 and §9.2 first: they define this
set's boundaries and the O33 sub-clause this page depends on**),
`PACK_C_calculators__private-practice-incorporation.md`, `PACK_C_resources__incorporation-private.md`.

---

## 1. Target and permission level

| | |
|---|---|
| Page URL | `https://www.medicalaccounts.co.uk/blog/incorporation-relief-private-medical-practice-s162` |
| Source file | `Medical/web/content/blog/incorporation-relief-private-medical-practice-s162.md` |
| **Rendering** | Markdown post whose **body is raw HTML**. Frontmatter carries `metaTitle`, `metaDescription`, `h1`, `title`, `keyTakeaways` (5), `summary`, `faqs` (**14**). **No `howtoSteps`, and none may be added** (B4, §5.0 of the step-by-step pack). Write new blocks as raw HTML. |
| Category | `Incorporation & Company Structures` |
| Word count, whole file | **4,485** (working tree clean, counted 2026-09-01). **The longest of the four surfaces.** |
| Em-dashes in file | **0**. Must still be 0 (I1, hard fail). |
| **GRADE** | **REFRAME.** Full rewrite permitted. |
| Repo HEAD at pack time | `038016726e21bdc3837dbb8a0a5789e3d0c09a5e` (`git rev-parse HEAD`, run 2026-09-01) |
| Last commit touching this file | `7e596f02a5339982597949c5b7db9f41af3df4ea` (2026-08-26), verified byte-identical to the working tree |
| **Revert path** | `git revert <the wave-C commit>`. Single-file: `git checkout 7e596f02a5339982597949c5b7db9f41af3df4ea -- Medical/web/content/blog/incorporation-relief-private-medical-practice-s162.md`. **Derive the wave sha live at revert time; never copy one from a document.** |
| **`monitored_pages`** | **No row exists for this slug, at any status, at any date.** Registration is owner-gated and post-deploy. |

### 1.1 Why REFRAME, with the evidence

§9.2, Bing graded first:

```
REFRAME = Google impressions < 300 AND Bing clicks = 0 AND Bing impressions < 300
```

This URL returns **zero rows on both engines** (§2): no GSC page row, no GSC page+query row, no Bing
`GetPageStats` snapshot, no Bing `GetPageQueryStats` row. It is nowhere near the §2.4 ruling boundary (1 or 2
Bing clicks at position 10 or better). **REFRAME, unambiguously. The equity-preservation floor is empty by
construction and a full rewrite forfeits nothing.**

**Recorded as a question, not a finding** (BATCH3_INDEX §2.3, defect D5). Google has indexed 18 of 139 URLs on
this domain and 51 have never been fetched. **No sentence in the drafted page or in any QA report may describe
this URL as "ranking nowhere".**

**A REFRAME is a full overhaul, not a de-stale** (§4 of the working agreement). This page is 4,485 words of
largely correct technical writing with two stale framings and one structural problem, so the temptation is to
patch. **The permission is full and it should be used**, because the structural problem (§5.2) cannot be patched.

### 1.2 Armed monitored windows, run live for this pack

BATCH3_INDEX §4.7 SQL, run 2026-09-01 via `python scripts/_q.py` against project `dhlxwmvmkrfnmcgjbntk`, **with
no status predicate** (a `status='active'` filter silently excuses the three `flagged` rows, and that mistake has
already been made once on this site):

```sql
select slug, status, monitor_until from monitored_pages
where site_key='medical' and monitor_until > now() order by slug;
-- 19 rows
```

`__home` (**flagged**, 2026-10-06); `becoming-gp-partner-financial-implications`;
`buying-into-gp-partnership-capital-parity-explained`; `gp-accounting-guide` (**flagged**);
`gp-limited-company-tax-benefits-drawbacks`; `gp-partner-vs-salaried-gp-tax-comparison`;
`gp-partnership-mutual-assessment-period-what-to-check`; `gp-partnership-tax-complete-guide`;
`gp-payroll-services`; `gp-pension-contributions-tax-relief`; `gp-tax-deductions-complete-list-2026`;
`gp-vat-registration`; `locum-doctor-self-assessment-filing-guide`; `locum-doctor-tax-complete-guide`;
`medical-professional-expenses-what-is-claimable`; `nhs-pension-annual-allowance-complete-guide`;
`nhs-pension-for-locums-form-a-form-b`; `nhs-pension-scheme-pays-doctors-deadlines` (**flagged**);
`nhs-pension-tapered-annual-allowance-calculator`. Eighteen blog rows expire **2026-09-10**.

**`incorporation-relief-private-medical-practice-s162` is NOT among them. Unfrozen, workable now.**

**One frozen row binds this page:** `gp-limited-company-tax-benefits-drawbacks` (Google **4 clicks / 96
impressions / position 5.7**, frozen to 2026-09-10) owns "is a limited company worth it". This page currently
links to it three times, which is correct behaviour, and must not compete with it (§7.3 gate D10).

### 1.3 D3, and what it makes this page

> **D3 RULED 2026-09-01:** `/blog/private-practice-incorporation-complete-guide` returns **301** to
> `/blog/medical-practice-incorporation-step-by-step`. **Wave C differentiates FOUR surfaces**, of which this is
> one. The orphaned `.md` stays on disk untouched.

**Do not touch `private-practice-incorporation-complete-guide.md` and do not link to its URL**, which 301s.
**Never propose a collapse, a redirect or a URL change** (K4). This page currently links to
`/blog/medical-practice-incorporation-step-by-step` twice, which is the correct single-hop target.

---

## 2. Equity register

**Every figure pulled fresh by this task on 2026-09-01.** Nothing from a stored Supabase snapshot.
`gsc_query_data` was not read and no SUM of it appears anywhere.

### 2.1 Google, GSC API

```
GSCQueryFetcher("medical")  ->  sc-domain:medicalaccounts.co.uk
  searchanalytics().query(dimensions=["page"],         2026-06-03..2026-09-01) -> 23 rows
  searchanalytics().query(dimensions=["page","query"], 2026-06-03..2026-09-01) -> 288 rows
run 2026-09-01
```

| Dimension | Rows for this URL |
|---|---|
| `page` | **0** |
| `page` + `query` | **0** |

**ENDPOINT NAMED (D2): Google figures are GSC `searchanalytics.query`, `page` dimension, never compared to a
Bing figure.** The pull is sound: 23 page rows and 288 page+query rows came back site-wide, including six
siblings in this family (§2.4).

### 2.2 Bing, `GetPageStats` (page level)

```
BingWebmasterClient().get_page_stats("https://medicalaccounts.co.uk")
run 2026-09-01  ->  329 rows collapsing to 80 distinct URLs
```

**0 snapshots, 0 impressions, 0 clicks for this URL.**

### 2.3 Bing, `GetPageQueryStats` (named-query level)

```
BingWebmasterClient().get_page_query_stats(
    "https://medicalaccounts.co.uk",
    "https://www.medicalaccounts.co.uk/blog/incorporation-relief-private-medical-practice-s162")
run 2026-09-01  ->  0 rows
```

**The `page` argument was the full `https://www.` URL, not a path.** BATCH3_INDEX §0.2 records that this
endpoint returns an **empty list rather than an error** for a path argument, producing a false negative that a
writer honestly reports as "no Bing data". The idiom here is correct, so the zero is a real zero.

### 2.4 What the register says: the constraint is the neighbours, not the history

| Sibling URL | Google (page dim, 90d to 2026-09-01) | Bing `GetPageStats` | Status |
|---|---|---|---|
| `/blog/gp-limited-company-tax-benefits-drawbacks` | **4 clicks / 96 impr / pos 5.7** | 2 impr | **FROZEN to 09-10** |
| `/blog/family-investment-company-doctors-consultants` | 0 / 18 / pos 4.8 | 0 | wave C |
| `/blog/salary-vs-dividend-medical-limited-company-2026` | 0 / 15 / pos 5.9 | 0 | wave C, **O34 owner** |
| `/blog/consultant-directors-loan-account-s455-medical-company` | 0 / 13 / pos 9.7 | 0 | wave C, s.455 owner |
| `/blog/surplus-cash-medical-limited-company-options` | 0 / 10 / pos 4.9 | 0 | wave C |
| **this page and the other three wave-C incorporation surfaces** | **0** | **0** | REFRAME |

**Note the two rows that matter most to THIS page.** The s.455 sibling holds position 9.7 and this page carries
a full H3 on the director's loan account (§6.3 point 4). The `salary-vs-dividend` sibling holds position 5.9 and
this page's worked illustration reaches toward extraction. **The differentiation risk here is not the market, it
is our own six-page company cluster.**

**BATCH3_INDEX §9 limitation 2: `GetPageStats` is top-N, so the zeros are floors.**

---

## 3. The market's keyword set

### 3.1 The selection SQL

`dataforseo_competitor_data`, `site_key='medical'`. **No DataForSEO call was made.** Run 2026-09-01 via
`python scripts/_q.py`. Peer array = the **39-domain** set (universe §2a's 22 plus the D13 reclassification's
17). **Word boundaries use `\y`, never `\b`** (defect D9). The full SQL is reproduced in
`PACK_C_blog__medical-practice-incorporation-step-by-step.md` §3.1; the family-wide counts are **1,153 keywords / 676,630 volume / 394 peer-winnable rows at
166,490 volume** and are shared across all four wave-C packs.

### 3.2 THE ROWS THAT ARE THIS PAGE'S, and this is the one wave-C surface with a real head term

Filtered from the family to incorporation-relief intent. `On page` = phrase appears verbatim in the live source,
case and punctuation normalised. Peer-winnable **orders** the work and never excludes any row (decision 21).

| Vol | Best pos | Peer best | Holder | Peer-winnable | On page | Keyword |
|---|---|---|---|---|---|---|
| **880** | **5** | 5 | pricebailey.co.uk | **yes** | **yes** | `incorporation relief` |
| 880 | 76 | 76 | apexaccountants.tax | no | **no** | `roll over relief` |
| 880 | 79 | 79 | apexaccountants.tax | no | **no** | `rollover relief` |
| **210** | **8** | 8 | lanop.co.uk | **yes** | **yes** | `section 162 incorporation relief` |
| **140** | **7** | 7 | lanop.co.uk | **yes** | **yes** | `s162 incorporation relief` |
| 260 | 70 | 70 | apexaccountants.tax | no | **no** | `cgt roll over relief` |
| 260 | 70 | 70 | apexaccountants.tax | no | **no** | `cgt rollover relief` |
| 260 | 71 | 71 | apexaccountants.tax | no | **no** | `roll over relief cgt` |
| 110 | 3 | 3 | pricebailey.co.uk | **yes** | **no** | `property incorporation relief` **DECLINED, see 3.4** |
| 90 | 6 | 6 | pricebailey.co.uk | **yes** | **no** | `what is incorporation relief` |
| 50 | 10 | 10 | lanop.co.uk | **yes** | **no** | `incorporation relief stamp duty` |
| 1,300 | 31 | 31 | pricebailey.co.uk | no | **yes** | `going concern` |
| 880 | 28 | 28 | pricebailey.co.uk | no | **no** | `going concern definition` |
| 880 | 22 | 22 | pricebailey.co.uk | no | **no** | `going concern meaning` |
| 480 | 4 | 4 | pricebailey.co.uk | **yes** | **no** | `transfer of a going concern` |
| 480 | 3 | 3 | pricebailey.co.uk | **yes** | **no** | `transfer of going concern` |
| 390 | 37 | 37 | pricebailey.co.uk | no | **no** | `what is a going concern` |
| 210 | 3 | 3 | pricebailey.co.uk | **yes** | **no** | `transfer of a going concern vat` **DECLINED, see 3.4** |
| 140 | 4 | 4 | pricebailey.co.uk | **yes** | **no** | `sell business as going concern` |
| 70 | 72 | 72 | taxqube.co.uk | no | **no** | `hold over relief trusts` |

**Counts for this surface. Keywords: 20. Combined volume: 8,570. Peer-winnable (peer at position <= 20): 9
keywords, 3,240 volume.** Contributing domains: 4 (pricebailey, lanop, apexaccountants, taxqube).

**This is the only wave-C surface with a head term a peer holds inside the top 10, and we already carry the
head term's exact phrase.** `incorporation relief` at 880 volume, held by pricebailey at **position 5**, on a
**1,057-word page about property owners** (§4.1).

### 3.3 The one medical row in 1,153, restated because it governs this surface too

Of the whole 1,153-keyword incorporation family, exactly **one** keyword carries any medical, NHS, doctor, GP,
consultant, practice or clinic vocabulary: `private health insurance through limited company`, 40 volume,
medicsmoney.co.uk at position 39, on a podcast page (step-by-step pack §4.7).

**There is no `incorporation relief for doctors`, no `medical practice incorporation relief`, no `consultant
goodwill valuation` in the harvest at any volume.** The medical modifier does not exist in the Google-derived
commercial crawl for this topic. **That is not evidence there is no demand; it is evidence the peer set has
never built the page**, which is exactly what §5 says.

### 3.4 Three readings the table does not make obvious

1. **`property incorporation relief` (110 vol, pricebailey at position 3) is DECLINED and the reason is the
   whole shape of this SERP.** Every high-volume incorporation-relief page in the peer set is about
   **residential landlords incorporating a property portfolio**, because that is where the volume is. Chasing it
   means writing property-landlord content on a medical site: the SDLT partnership rules, the section 24
   finance-cost restriction, the three-year partnership myth. **That is the V3 trap in its purest form, and it
   is refused on the record.** The consequence is stated positively at §5.1: the property framing is precisely
   why the incumbent is beatable on a medical query.
2. **The `going concern` family (5,140 combined volume, pricebailey holding positions 3 to 37) is a VAT
   family, not a CGT family.** Its top URL is `.../blog/togc-transfer-of-a-going-concern/`, fetched at §4.3,
   and it is about the VAT TOGC rules under the VAT (Special Provisions) Order 1995, not about TCGA 1992 s.162.
   **The phrase collides; the subject does not.** Our page uses "going concern" in the s.162 condition sense and
   should keep doing so, and it must **not** reach for the VAT TOGC volume, which is O17's and O21-VAT's
   territory and whose owner is frozen. **`transfer of a going concern vat` DECLINED for that reason.**
   Recorded because anyone re-deriving this cluster with a `going concern` regex will pick the VAT family up
   again.
3. **The `roll over relief` family (2,540 volume across five keywords) is held at positions 70 to 79 by one
   page** (`apexaccountants.tax/basics-of-cgt-rollover-relief/`). Nobody holds it. It is the generic CGT
   roll-over concept rather than s.162 specifically, and s.162 **is** a roll-over, so **one sentence naming the
   mechanism as a roll-over captures the vocabulary without chasing the family.** COVER at 4.7 theme 4, in one
   sentence.

---

## 4. Competitor teardown

**Thirteen URLs fetched live 2026-09-01 across this set. Every URL accounted for with its status code. Zero
silent drops.**

> **FETCH METHOD, and it is a live class defect.** Both `pricebailey.co.uk` URLs returned **HTTP 403** to
> `httpx` carrying a full nine-header browser set and **HTTP 200** to `curl.exe` carrying a UA and two Accept
> headers. **The discriminator is the TLS client fingerprint, not the header set**, which means D14's
> prescription ("send a full header set") is necessary and not sufficient. **Had this pack stopped at D14, it
> would have logged "no competitor page" for the incumbent holding this page's head term at position 5.** Full
> writeup and the recommended one-line fix in the step-by-step pack, §10.1.

### 4.1 pricebailey.co.uk, Incorporation Relief is changing: **THE PAGE TO BEAT**
`https://www.pricebailey.co.uk/blog/incorporation-relief/` · **HTTP 200** (via `curl`; 403 via `httpx`)
**Class: PEER** (universe §2a #5). **Holds `incorporation relief` (880) at position 5, `what is incorporation
relief` (90) at 6, and `property incorporation relief` (110) at 3.**

| | |
|---|---|
| Title | `Incorporation Relief is changing: What property owners need to know` |
| **H1** | **NONE. The page has no `<h1>` element at all.** |
| Author / date | Jon Chambers, tagged "3 mins", categories Budget / Business Planning / Property / Tax |
| Word count | **1,057** |
| H2 (article body) | `What does this mean for property businesses?`; `Will property owners rush to incorporate before April 2026?`; `Should property owners consider other options?`; `How we can help` |
| H3 | `Why have HMRC done this?` (the rest are sidebar and author chrome) |
| Tables | **0** · Calculator: **none** · FAQ block: **none** |
| **£ figures on the page** | **ZERO.** |
| **Percentages on the page** | **ZERO.** |
| `Finance Act 2026` / `FA 2026` mentions | **0** |
| `162A` mentions | **0** |
| `claim` mentions | 9 |
| `pension` mentions | 1 · `NHS`: **0** · `doctor`: **0** |

**Covers, verbatim from the page:** "The 2025 Budget confirmed an important change for property owners looking
to incorporate. Incorporation Relief is an automatic relief, which defers capital gains arising on transferring
a business to a limited company in exchange for shares. The gain effectively reduces the tax cost of the shares,
meaning a gain will only arise if the shares are sold in the future. From 6 April 2026, Incorporation Relief
will no longer apply automatically. Instead, anyone transferring a qualifying property business into a company
will need to make a formal claim in their Self-Assessment return for the tax year in which the transfer takes
place."

**What it gets wrong or omits, and this is the opening.**

1. **It sources the change to "the 2025 Budget" and never names the statute.** Zero mentions of Finance Act
   2026, zero of section 39, zero of TCGA 1992. A Budget announcement is not law; **FA 2026 received Royal
   Assent on 18 March 2026** (`house_positions.md` verification log) and **s.39** is the operative provision.
2. **Its statement of the claim deadline is loose and arguably wrong.** It says the claim is made "in their
   Self-Assessment return for the tax year in which the transfer takes place". The claim window per
   `house_positions.md` §4 runs to **one year after the 31 January following the tax year of the transfer**,
   which is a different and longer thing than the return for the year of transfer. **A reader who follows the
   incumbent's wording could believe the window closes far earlier than it does.** Verify at source before
   correcting it in public (§7.5); the correction is only worth making if we can point at the provision.
3. **It never mentions that s.162A is removed.** That is half the change: the relief was automatic with an
   opt-out election, and it is now opt-in by claim with the election gone. A reader who knew the old regime
   would leave this page still looking for the election.
4. **It is written entirely for property owners.** Every H2 says so. There is no going-concern condition, no
   all-assets condition, no share-consideration apportionment, no goodwill valuation, no worked figure of any
   kind, and no non-property business anywhere on the page.
5. **No H1, no table, no FAQ, no figures, 1,057 words, and it is the number-five result on the head term.**

**Consequence for us.** **This is the most winnable competitor page in wave C.** We beat it by naming the
statute, getting the deadline right, covering the half of the change it omits, and by being the only page in the
set that answers the question for a business whose transferable asset is **private medical goodwill** rather
than a residential portfolio.

### 4.2 lanop.co.uk, Section 162 Incorporation Relief Explained: **THE DEEP COMPETITOR**
`https://lanop.co.uk/section-162-incorporation-relief-uk/` · **HTTP 200**
**Class: PEER** (universe §2a #12). **Holds `section 162 incorporation relief` (210) at position 8,
`s162 incorporation relief` (140) at 7, `incorporation relief stamp duty` (50) at 10.**

| | |
|---|---|
| Title | `Section 162 Incorporation Relief: 2026 Guide for UK Owners` |
| H1 | `Section 162 Incorporation Relief Explained: Conditions, HMRC Rules & CGT Changes (UK)` |
| Author / date | **Aurangzaib Chawla, Tax Partner, 7 February 2026** (named, credentialled, with a photo block) |
| Word count | **4,103** |
| Tables | **0** · Calculator: none · **FAQ: yes** |
| H2 | `Introduction`; `What Is Incorporation Relief?`; `Understanding the Real Relief: Incorporation Relief vs. Other Schemes`; `The Conditions for CGT Incorporation Relief (The Real Checklist)`; `Case Study: The Portfolio Transition (2026)`; `Why Single-Property Owners Usually Miss It`; `The Other Myth: "Partnership for 3 Years and You Avoid SDLT"`; `In non-property businesses, the most valuable asset being transferred is often Goodwill.`; `Capital Gains Tax Changes from April 6, 2026`; `SDLT and Other Tax Impacts`; `Electing Out of s162 Relief (s162A)`; `Practical Step-by-Step Incorporation Relief Checklist`; `Strategies & Common Mistakes`; `2025 to 2026 Update: HMRC Is Tightening the Claims Process`; `How Lanop Can Help`; `Conclusion`; `FAQ` |
| H3 | includes `The Purpose: Continuity Over Crystallisation`; `How Incorporation Relief Defers CGT`; `Incorporation Relief vs. Entrepreneurs' Relief (BADR)`; `1. Eligibility for Sole Traders & Partnerships`; `2. The "Going Concern" Rule`; `3. The "All Assets" Rule and Exclusions`; `4. Non-Share Consideration Risks (ESC D32)`; `The "Ramsay" Test`; `Defining Goodwill`; `Share Base Cost After Relief`; `The New Claim Requirement`; `When to Elect Out?` |
| £ figures | £0, £2, £2.5, £4.5, £100, £400, £500, £5,000, £15,000 |
| Percentages | 0%, 10%, 14%, 18%, 24% |
| `Finance Act 2026` / `FA 2026` | **0** |
| `pension` | **0** · `NHS`: **0** · `doctor`: **0** |

**Covers.** Everything structural: the three conditions properly separated, ESC D32 on non-share consideration,
the Ramsay principle, share base cost after relief, goodwill defined, the new claim requirement, a 2026 case
study, an FAQ, and a step-by-step checklist. It is the most complete s.162 page anywhere in the peer set and it
is **four times the length of the incumbent that outranks it**.

**What it gets wrong or omits.**

1. **It carries an H2 and an H3 on `Electing Out of s162 Relief (s162A)` and `When to Elect Out?` as live
   guidance.** For transfers on or after 6 April 2026, **s.162A is omitted by FA 2026 s.39** and there is no
   election to make: you decline the relief by not claiming it. **A four-month-old page, published February
   2026, is telling readers to use a provision that was removed weeks later.** That is the single largest
   staleness finding in wave C and it sits on the page holding position 7 on our exact term.
2. **It never names Finance Act 2026 or section 39.** Zero mentions, same defect as 4.1, on a page that
   discusses the change at length under the heading `2025 to 2026 Update: HMRC Is Tightening the Claims
   Process`.
3. **Property-first throughout.** The case study is `The Portfolio Transition`, and the non-property treatment
   is confined to one H2 whose entire string is the sentence "In non-property businesses, the most valuable
   asset being transferred is often Goodwill." Goodwill, which is the medical case, gets a heading and not a
   section.
4. **Zero pension content and zero NHS content**, on the fact that decides the question for a doctor.
5. **Named-expert framing** (an author photo, a credential, a `Tax Partner` byline). **I2 forbids us from
   answering in kind, and we do not need to: the counter is precision, not a person.**

**Consequence for us.** Two things. First, **the depth benchmark for this page is roughly 4,000 words and a
structured condition-by-condition treatment**, and our live page is already at 4,485, so the gap is not length.
Second, **both top competitors are wrong or silent about the statute and one of them is actively stale on the
election**, so the differentiator is **statutory precision plus the medical asset**, not more words.

### 4.3 pricebailey.co.uk, Understanding Transfer of a Going Concern (TOGC)
`https://www.pricebailey.co.uk/blog/togc-transfer-of-a-going-concern/` · **HTTP 200** (via `curl`; 403 via `httpx`)
**Class: PEER, ADJACENT-TOPIC page.** Holds the `going concern` and `transfer of a going concern` families
(5,140 combined volume) at positions 3 to 37. **2,111 words, 0 tables, no H1, one percentage (10%), zero £.**

**Fetched to settle whether the `going concern` volume belongs in this page's keyword set. It does not.** The
page is about the **VAT** TOGC rules (Article 5, VAT (Special Provisions) Order 1995: output VAT, opted to tax,
evidence of registration), not about the TCGA 1992 s.162 going-concern condition. **The phrase collides, the
subject does not. Excluded from the target set with reason** (3.4 point 2). Anyone re-deriving this cluster with
a bare `going concern` regex will pick it up again, which is why it is named here rather than silently dropped.

**And the boundary matters twice over: VAT is O17's and O21-VAT's, and O21-VAT's owner is FROZEN to
2026-09-10.**

### 4.4 apexaccountants.tax, Basics of CGT Rollover Relief
`https://apexaccountants.tax/basics-of-cgt-rollover-relief/` · **not fetched, and recorded rather than dropped.**
Holds the five-keyword `roll over relief` family (2,540 volume) at positions **70 to 79**. **It was not fetched
because nothing at position 70 to 79 is a rank target and the family is DECLINED at 3.4 point 3**, reduced to a
single vocabulary sentence. Named here so a QA agent reads the absence as a decision rather than an omission.

### 4.5 sandisoneasson.co.uk, A Guide to Directors' Loan Accounts
`https://www.sandisoneasson.co.uk/news/post/a-guide-to-directors-loan-accounts` · **HTTP 200**
**Class: PEER** (universe §2a #7, a specialist medical accountant). 1,596 words. Holds `directors loan` (2,900,
position 26), `directors loan account` (1,000, position 18), `directors loan interest rate` (480, **position
9**) and eleven more.

**Fetched because this page carries an H3 `Interaction with the director's loan account`, and the fetch settles
that the DLA family has a real incumbent and a real owner on our side.** **The family is ELSEWHERE**
(`/blog/consultant-directors-loan-account-s455-medical-company`, wave C, Google position 9.7). **This page keeps
the loan-account point only as the s.162 consideration-mix trade-off, which is genuinely its own fact, and
states no s.455 rate and no timing.** §7.3 gate D8.

### 4.6 The other eight fetches in this set

| URL | Status | Relevance to this page |
|---|---|---|
| `https://www.livingstonesaccountants.co.uk/blog/how-to-switch-from-sole-trader-to-limited-company-tax-implications-explained/` | 200, 3,007w | **Zero incorporation-relief content**: `162` zero times, `Finance Act 2026` zero times, `claim` twice. The best process page in the set transfers a business without mentioning the CGT on the goodwill. **Evidence for §5.2.** |
| `https://gorillaaccounting.com/blog/limited-company-formation-should-you-incorporate/` | 200, 2,312w | No relief content. |
| `https://gorillaaccounting.com/blog/when-should-sole-traders-set-up-a-limited-company/` | 200, 2,623w | No relief content. Carries a **17% corporation tax rate** that has never applied. |
| `https://www.aims.co.uk/sole-trader-vs-limited-company-whats-the-right-option-for-running-a-solo-business/` | 200, 578w | No relief content, no figures at all. |
| `https://www.e-accounts.co.uk/2025/01/17/sole-trader-vs-limited-company-tax-comparison/` | 200, 1,654w | No relief content. Carries **33.75%** dividend upper rate (2025/26) and a **£150,000** additional-rate threshold superseded in April 2023. |
| `https://medicsmoney.co.uk/ep-197-limited-companies-2024-masterclass/` | 200, 3,284w | **The only medical competitor in 1,153 keywords.** A 2024 podcast page. **Zero £ figures. No topical H2. Zero mentions of goodwill or s.162.** |
| `https://www.medicsmoney.co.uk/` | 200, 5,722w | Homepage, fetched to confirm the brand runs no written incorporation-relief guide. It does not. |
| `https://gorillaaccounting.com/salary-dividend-tax-calculator/` and `/self-employed-calculator/` | 200 | Calculator surfaces; torn down in the calculator sibling pack. |

### 4.7 Union of competitor heading themes minus ours = THE COVERAGE CHECKLIST

§9.9 floor 8 requires **zero undecided themes. 16 themes, 16 decisions, 0 undecided.**

| # | Theme (source) | Decision | Note |
|---|---|---|---|
| 1 | **What incorporation relief is, and that it is a deferral rather than an exemption** (4.1, 4.2) | **COVER, and it is this page's core** | Already on the page and well done. KEEP. |
| 2 | **The roll-over mechanic: the gain is deducted from the base cost of the new shares** (4.1, 4.2 `Share Base Cost After Relief`) | **COVER, with arithmetic** | On the page in prose. **Neither competitor shows the base-cost arithmetic; §5.3.** |
| 3 | **The statutory identity: TCGA 1992 s.162, amended by FA 2026 s.39** (**absent from BOTH top competitors**) | **COVER, and it is the differentiator** | 4.1 sources the change to "the 2025 Budget"; 4.2 never names the Act. §5.1. |
| 4 | **That s.162 is a roll-over, in the market's vocabulary** (4.4's declined family, 2,540 vol) | **COVER, one sentence** | Captures the vocabulary without chasing a family held at position 70. |
| 5 | **The three conditions, separated: going concern, all assets (cash may be excluded), consideration wholly or partly in shares** (4.2 `The Real Checklist`) | **COVER, one H3 each** | On the page, correctly. The depth benchmark is 4.2's. |
| 6 | **The wholly-or-partly-for-shares apportionment, with a worked figure** (4.2 case study) | **COVER, and it is this page's ONE worked example** (G1) | On the page as a hedged illustration with **no figures at all** (§6.3 point 5). **B1: this apportionment appears on no other wave-C surface.** |
| 7 | **Non-share consideration risk and ESC D32** (4.2 H3 4) | **COVER, one sentence, only if verified at source** | §7.5. **A competitor heading is not a source for a concession.** If it cannot be verified, it is DROPPED, not guessed. |
| 8 | **The FA 2026 claim requirement** (4.1, 4.2 `The New Claim Requirement`) | **COVER IN FULL. This page owns it under the proposed O33b** (§9.2). | Both competitors cover it and both get it partly wrong. |
| 9 | **The claim DEADLINE arithmetic** (4.1 states it loosely and arguably wrongly) | **COVER, and correct the market** | `house_positions.md` §4: one year after the 31 January following the tax year of the transfer. For a 2026/27 transfer, **31 January 2029**. **B1: this appears on no other wave-C surface.** |
| 10 | **The removal of s.162A** (4.1 omits it; **4.2 actively recommends using it**) | **COVER, and it is the single largest staleness correction available in wave C** | §4.2 point 1. |
| 11 | **Goodwill valuation and HMRC challenge** (4.2 `Defining Goodwill`) | **COVER, and make it MEDICAL** | 4.2 defines goodwill generically. §5.3: private medical goodwill is a different asset with different durability, and no page in the set says so. |
| 12 | **s.162 against BADR as a continuing-versus-exiting fork** (4.2 H3 `Incorporation Relief vs. Entrepreneurs' Relief`) | **COVER the fork, DECLINE the BADR detail** | One sentence and a link to wave F's `/blog/selling-private-medical-practice-cgt-badr`. **No rate, no £1m limit, no conditions.** §10.2 of the step-by-step pack proposes the row. |
| 13 | **The NHS-specific overlay: NHS goodwill cannot be sold, so there is no NHS goodwill to incorporate** (absent from all thirteen competitors) | **COVER, and it is unique to us** | `house_positions.md` §4, SI 2019/251. On the page and correct. KEEP. |
| 14 | **The NHS pension accrual given up** (absent from twelve of thirteen; 4.7 gestures at it) | **COVER, one sentence, then LINK to the O33a owner** | §2.C requires the pairing. **This page must make the pairing without becoming the pairing's owner: O33a is the step-by-step page.** §9.2. |
| 15 | **Property portfolio incorporation, SDLT partnership rules, the three-year myth, section 24** (4.1 and 4.2 in full) | **DECLINE, all of it** | 3.4 point 1. Writing it means putting landlord content on a medical site. The V3 trap, refused on the record, 110 volume forgone deliberately. |
| 16 | **A named author with a credential and a photograph** (4.2) | **DECLINE, permanently** | **I2.** No named individual, no credential, no byline, no "reviewed by". Our counter to a Tax Partner byline is the statute reference the Tax Partner omitted. |

---

## 5. Whitespace and the differentiation statement

### 5.0 THE POINT OF THIS SET

Reproduced in all four packs. **Four surfaces, one topic, and until now no boundary. The differentiation is by
the READER'S QUESTION.**

| Surface | The one question it owns | It hands off |
|---|---|---|
| `/blog/medical-practice-incorporation-step-by-step` | **"How do I actually do it?"** The ordered sequence from decided to first filing, and the NHS pension-accrual pairing beside every saving. | The relief computation, the saving arithmetic, VAT, dividend rates, s.455, "is it worth it". |
| **`/blog/incorporation-relief-private-medical-practice-s162`** (this pack) | **"What happens to the tax on my goodwill when I transfer it?"** TCGA 1992 s.162: the roll-over mechanic, the three conditions, the share apportionment, private medical goodwill valuation, the FA 2026 s.39 claim regime in full, and s.162 against BADR as a fork. | The process sequence, the company's running tax, the extraction question, the saving calculation. |
| `/calculators/private-practice-incorporation` | **"How much, for my numbers?"** One computed comparison from the reader's four inputs, plus an honest statement of what it does and does not include. | Every explanation. |
| `/resources/incorporation-private` | **"What does the downloadable model do, and where does it stop?"** The manual for the file. | The decision, the process, the relief, and any live calculation. |

**The deterministic boundary rules, checkable without judgment:**

- **B1.** **Only this surface** may contain the strings `162A`, `first anniversary of the 31 January`, or a
  worked apportionment of a gain between share and non-share consideration.
- **B2.** Only the calculator surface may present a £ figure that is an OUTPUT of `calcIncorporation`.
- **B3.** The resource surface's £ figures may only quantify a simplification or omission in the model.
- **B4.** Only the step-by-step surface may carry an ordered `<ol>` of incorporation steps or `howtoSteps`
  frontmatter. **This page must NOT gain `howtoSteps` and must NOT carry a numbered process list.**
- **B5.** No wave-C surface states a dividend rate, a corporation tax rate table, a VAT threshold, an s.455 rate
  or a BADR rate except where an O-row awards it.

### 5.1 The head term is held by a page that does not name the law it is reporting

**`incorporation relief`, 880 volume, position 5, held by a 1,057-word post with no H1, no table, no figure, no
percentage, that sources a statutory change to "the 2025 Budget" and never mentions Finance Act 2026, section
39, or TCGA 1992.** The number-seven result is 4,103 words and also never names the Act, **and it recommends
using an election the Act repealed**.

**So the whitespace on the highest-value term in wave C is: say what the law is, correctly, with its date.**
That costs one sentence and it is something no competitor in the set has done. `house_positions.md` §4 and the
verification log already carry it: **FA 2026 (c. 11), Royal Assent 18 March 2026, s.39 amends TCGA 1992 s.162**,
verified at primary source at the HP-lock gate on 2026-06-03.

### 5.2 Nobody joins the relief to the process, and both of ours currently try to do both

The best process page in the set (4.6, livingstones, 3,007 words) transfers a business into a company and
**never mentions the CGT on the goodwill**: zero mentions of `162`, zero of `Finance Act 2026`. The best relief
page in the set (4.2, lanop) carries a `Practical Step-by-Step Incorporation Relief Checklist`. **The market
either does the process without the tax or the tax with a bolted-on process.**

**Our two blog surfaces currently make the same mistake in mirror image.** This page carries an H3
`Interaction with the director's loan account`, an H2 `Practical steps to get section 162 right` with a
six-bullet ordered checklist, and links out to the step-by-step guide twice. The step-by-step page names s.162
in its step 3. **The two pages currently answer each other's question.**

**The split (B1 and B4).** This page owns the **tax on the transfer** and carries no process sequence. The
`Practical steps to get section 162 right` H2 becomes a **conditions-and-evidence** block (what must be true,
what must be documented, what must be filed), not a numbered how-to. The step-by-step page carries the sequence
and gives the relief **one sentence with the 6 April 2026 date**, then links here.

**This depends on the O33 sub-clause at §9.2, which needs a conductor ruling. The default and the one-line
fallback are both stated there so no writer is blocked.**

### 5.3 What no competitor covers at all

1. **The base-cost arithmetic, shown.** Both top competitors describe the roll-over in words. **Neither shows a
   number.** 4.1 has zero £ figures on the entire page; 4.2 has nine, none of them a base-cost computation. Our
   page currently describes the mechanic and then says "a six-figure sum" (§6.3 point 5). **G1 mandates exactly
   one worked example on this page and the subject is arithmetic, so this is where it goes.**
2. **Private medical goodwill as a distinct asset.** 4.2 defines goodwill generically and warns against
   "a number borrowed from a different sector"; our page says the same thing and then names the sector
   (dental). **Nobody explains what makes medical private goodwill durable or fragile**: whether the income
   follows the individual clinician or the clinic, referral-source concentration, the insurer-recognition
   position, and how those bear on a valuation HMRC will test. That is the specialist layer and it is entirely
   unowned.
3. **That the largest asset a doctor owns cannot be transferred at all.** Every competitor assumes the whole
   business moves. For a GP, NHS goodwill has been unsaleable since **1 April 2004** (SI 2019/251, which also
   blocks selling shares whose value includes it). **The s.162 question for a doctor starts by carving out the
   part that cannot go**, and that framing appears nowhere in the peer set.
4. **The pension accrual on the other side of the CGT saving.** Zero pension mentions on 4.1's article body and
   zero on 4.2. `house_positions.md` §2.C makes the pairing mandatory. **This page states it and links; it does
   not own it** (§9.2).

### 5.4 KEEP, explicitly

Per §9.3 and K1 the specialist layer is never traded away. **K1 is a hard fail: the drafted page's count of
statutory references, form names, technical terms and figures must be greater than or equal to the live page's.**

- **The whole FA 2026 s.39 treatment**: no longer automatic, must be claimed, the deadline, the removal of
  s.162A, the before-and-after fork on the transfer date. **This is the best-evidenced block on any of the four
  surfaces and it is the one thing both competitors get wrong. KEEP and deepen.**
- **The claim deadline stated twice**, once in a key takeaway and once with the worked date (`31 January 2029`
  for a 2026/27 transfer). KEEP.
- **"A deferral, not an exemption"**, and the consequence that a lower share base cost means a larger gain
  later. KEEP.
- **The three conditions as separate H3s.** KEEP.
- **The wholly-or-partly-for-shares apportionment and the director's-loan-account trade-off as a
  CONSIDERATION-MIX point.** KEEP the trade-off; **drop the s.455 rate and timing**, which are another page's
  (§7.3 gate D8).
- **The connected-persons market-value point**: "you and the company are connected persons, so the assets are
  treated as transferred at market value rather than at whatever paperwork value you choose". **Neither
  competitor says this and it is why the gain exists at all.** KEEP.
- **The NHS goodwill carve-out**, since 1 April 2004, SI 2019/251, including that it blocks share sales whose
  value includes NHS goodwill, and that s.162 is therefore private-goodwill territory only. KEEP.
- **The s.28 disposal-timing point** (unconditional contract dated when made, s.28(1); conditional dated when
  the condition is met, s.28(2)) **as the lever for which regime applies to a straddling incorporation.**
  Correct against §4 and absent from every competitor. KEEP.
- **"An ordinary personal service company cannot hold one" in the approved unpinned form.** §2.C's correction of
  2026-08-26 forbids the flat "a limited company cannot hold a GMS or PMS contract". **The live page is already
  correct in both places. KEEP the wording and do not tighten it back.**
- **The refusal to price the illustration**: "The numbers below are purely illustrative and rounded to show the
  mechanic, not a quote for any real practice." KEEP the disclaimer; **§6.3 point 5 requires that it now come
  with actual figures.**
- **Zero em-dashes.** KEEP at zero.

---

## 6. Our current page, read honestly

Source read in full 2026-09-01.

| | |
|---|---|
| Word count, whole file | **4,485** |
| `metaTitle` | `Section 162 Incorporation Relief: Private Practice` (49 chars) |
| `metaDescription` | `Section 162 incorporation relief defers CGT when you move a private medical practice into a company, the 2026 claim change, and the NHS pension trade-off.` (152 chars) |
| `h1` | `Incorporation Relief (Section 162) for a Private Medical Practice: Deferring CGT` |
| `title` | `Section 162 Incorporation Relief for a Private Medical Practice (2026 Rules)` |
| Date / generator | 2026-06-03, `opus-4.8/netnew-wave` |
| H2 count | **9** · H3 count: **12** · FAQs: **14** · keyTakeaways: **5** · `howtoSteps`: **none** |
| Tables | **None.** L4 unmet. |
| Worked example | **One, with no figures in it.** §6.3 point 5. |
| Em-dashes | **0** |

### 6.1 Existing heading list, verbatim and in order

- H2 `When this applies (private practice only)`
- H2 `How section 162 incorporation relief works`
  - H3 `A deferral, not an exemption`
  - H3 `The wholly or partly for shares apportionment`
  - H3 `Interaction with the director's loan account`
- H2 `The conditions you have to meet`
  - H3 `A business transferred as a going concern`
  - H3 `All the assets of the business (cash may be excluded)`
  - H3 `Consideration wholly or partly in shares`
  - H3 `Goodwill valuation matters`
- H2 `The Finance Act 2026 change (this is the new bit)`
  - H3 `It is no longer automatic, you must claim it`
  - H3 `The claim deadline`
  - H3 `The old section 162A election is gone`
  - H3 `Before versus after 6 April 2026`
- H2 `The medical pension trade-off (do not skip this)`
- H2 `Section 162 versus the alternatives`
  - H3 `Section 162 (this page)`
  - H3 `Selling outright with Business Asset Disposal Relief`
  - H3 `Other reliefs and partial approaches`
- H2 `Disposal timing and the wider 2026 context`
- H2 `Practical steps to get section 162 right`
- H2 `A worked illustration of the apportionment`
- H2 `Common mistakes doctors make with section 162`
- H2 `How we help doctors incorporate private work`

### 6.2 Blunt read

**This is the best page of the four and it is better than both of its competitors on the thing that matters, and
it has one worked example containing no numbers.** The FA 2026 block is more accurate than the position-5
incumbent and more current than the position-7 challenger, which is a genuinely strong position on a term worth
1,230 combined volume. The gap is not knowledge. It is **arithmetic, structure and boundary**.

**What is good, specifically.** Four H3s on the FA 2026 change, correctly split into the claim, the deadline,
the repeal of s.162A and the transfer-date fork. The connected-persons market-value framing. The s.28 timing
lever. The NHS goodwill carve-out. Fourteen FAQs, every one on-topic. The approved s.86 wording in both places.

### 6.3 HOUSE-POSITION CONTRADICTIONS AND OWNERSHIP BREACHES ON THE LIVE PAGE

**Listed, not fixed. All are fixable by the writer because the grade is REFRAME.**

1. **FUTURE-FRAMING OF A LIVE RATE, and `house_positions.md` §4 forbids it in terms.** H3 `Selling outright with
   Business Asset Disposal Relief`, verbatim: "The BADR rate is 14% for disposals between 6 April 2025 and
   5 April 2026, **rising to 18% from 6 April 2026**, which itself makes disposal timing a live lever."
   §4's rule: **"18% from 6 Apr 2026, which is the rate in force today, so write it in the present tense and
   treat 14% as last year's rate."** The page is written from the wrong side of 6 April 2026, and the "live
   lever" clause compounds it by presenting a closed timing window as open.
2. **STALE YEAR TAG ON THE ONE FIGURE IN THE WORKED ILLUSTRATION.** "That chargeable slice can use the annual
   exempt amount of **£3,000 (2025/26)**". The live year is **2026/27**. **`house_positions.md` carries no CGT
   annual exempt amount at all**, so this figure has no ground-truth entry and cannot be re-tagged from the
   file. **It must be verified at gov.uk for 2026/27 before it is restated, and if it cannot be verified it is
   DROPPED, not carried forward with a new tag** (§7.5). Recorded as a house-positions gap at §10.1.
3. **§4's "say the saving, not just the relief rate" is unmet.** `house_positions.md` §4 was amended on
   2026-08-26 precisely because a page needed it: the main CGT rate on non-residential assets is **24%** for a
   higher-rate taxpayer from 6 April 2026, so **BADR at 18% is worth up to 6 percentage points**, not the much
   larger saving the old 10% rate delivered. The page states the BADR rate and never states what it saves
   against, which is the framing §4 exists to prevent. **Note the resolution is NOT to add the detail here:
   BADR is another page's (§7.4). The correct fix is that the fork sentence stops claiming BADR is a
   "rate-reduction tool" without qualification.**
4. **s.455 OVER-BUDGET.** H3 `Interaction with the director's loan account` is a legitimate s.162
   consideration-mix point and it is correctly framed as one. **But the DLA family has a real owner**
   (`/blog/consultant-directors-loan-account-s455-medical-company`, Google position 9.7) and a real incumbent
   (4.5). The H3 states no rate today, which is compliant; **the gate exists so a rewrite does not add one.**
5. **G1 IS UNMET IN THE MOST AVOIDABLE WAY: the page has a worked example with no numbers.** H2 `A worked
   illustration of the apportionment` says "private goodwill valued at, for illustration, **a six-figure sum**,
   and a gain on that goodwill of **the same order**", then "**three quarters** of the consideration as shares
   and **one quarter** as a credit to a director's loan account". **It carries the hedge without the example,
   which is the weakest available position**, and it is the same defect the wave-A GMS pack found on its own
   anchor page. **The market's own top pages have the same hole** (4.1 zero £ figures, 4.2 no base-cost
   computation), so this is the whitespace and it is being left on the table.
6. **L4 unmet: no tables.** The page carries at least two natural tables in prose: the three conditions, and the
   before-and-after-6-April-2026 fork. L4 requires at least one table on any page carrying a comparison.
7. **The FAQ block is at 14 against a band of 4 to 8.** BATCH3_INDEX's "batch-level properties" note records
   that the FAQ and word-count bands are unreachable under EXTEND and were missed on six of nine pages.
   **This page is REFRAME, so the band IS reachable here and the excess is a real finding rather than an
   arithmetic artefact.** Several of the fourteen are near-duplicates: `What is section 162 incorporation
   relief?` and `How does section 162 defer capital gains tax?`; `Is the gain wiped out or just deferred?` and
   the `deferral not exemption` H3; `What changed for incorporation relief on 6 April 2026?` and `Do I now have
   to claim incorporation relief, and by when?`. **Consolidation is permitted and expected.**
8. **Word count 4,485 against a band of 2,000 to 3,200.** Same note as point 7: reachable under REFRAME.
   **The reduction should come from the FAQ consolidation and from the material handed back to O33a and to the
   BADR owner, not from cutting the technical layer, which K1 protects.**
9. **A1 / A5 check.** The opening runs 121 words to the first H2 and the direct answer ("Section 162
   incorporation relief is the mechanism that defers that gain") lands at roughly word 100. **A5's band is 40 to
   90. Over band**, and the first sentence spends 40 words listing reasons to incorporate, which is O33a's and
   the frozen decision page's subject. **Two problems in one paragraph.**
10. **C3 / C4 check.** `you` and `your` appear 96 times in roughly 3,600 body words, **26.7 per 1,000** against a
    band of 12 to 25. **Marginally above band.** `we`, `our`, `us` appear 14 times, **3.9 per 1,000** against a
    cap of 3. **Above cap**, concentrated in the closing H2 and the link-out sentences.
11. **V5 CHECK: ONE LIVE INSTANCE, and it is the burned tic.** H3 `A deferral, not an exemption` is the
    `it is not X, it is Y` shape in its heading form, and the body repeats it: "Section 162 defers the gain,
    **it does not wipe it out**". **The wave-wide cap is once per page, so the page is AT cap before a word is
    written.** The idea is correct and central, so the instruction is: **keep it once, in the heading, and
    remove the body restatement.**
12. **V9 CHECK: ONE LIVE INSTANCE of the fourth tic.** "This is the point most worth labouring." That is the
    self-announcing sufficiency claim that round 3 of the 2026-08-26 batch named as the tic already forming to
    replace the one round 2 killed. **Delete it.**
13. **V9 numeral-count opener: one instance.** "**Three core conditions**: the business must be transferred as a
    going concern..." in FAQ 5, and "**A handful of** avoidable errors come up repeatedly" in the mistakes H2.
    The first is inside cap (once per page); the second is the same reflex in a softened form. **Prefer zero.**
14. **V2 check: clean.** No search-string narration, no "also searched as", no keyword-variant table.
15. **PROCESS NARRATION check: one borderline instance.** H3 `Section 162 (this page)` inside the
    `versus the alternatives` H2 narrates the site's own structure to the reader. Conductor ruling 3 of
    2026-08-26 extends V2 to any narration of our own process. **`(this page)` is deleted; the fork is written
    as a fork, not as a map of our site.**

---

## 7. Deterministic acceptance criteria

A QA agent applies these without judgment.

### 7.1 THE NAMED MISSING-PHRASE LIST

**11 phrases.** Every one verified absent from the live source file on 2026-09-01 by verbatim search, case and
punctuation normalised.

**V1 IS BINDING.** Two word orders per idea per page, hard cap, counted as **non-overlapping longest matches,
never raw substrings**. Idea groups stated so the cap is verifiable. **Any V1 finding must quote the spans it
counted.**

| # | Phrase (must appear verbatim) | Idea group | Order # | Evidence |
|---|---|---|---|---|
| 1 | `Finance Act 2026` named with **section 39** in the same sentence | The statutory identity | 1 of 2 | **Absent from BOTH top competitors** (4.1 zero mentions, 4.2 zero mentions). `house_positions.md` §4 and the verification log: FA 2026 (c. 11), Royal Assent 18 March 2026. **The single cheapest differentiator on the highest-value term in wave C.** The live page names "Finance Act 2026 section 39" in the body and the FAQs; **the missing element is the Act's identity and date, not its name.** |
| 2 | `Royal Assent` date of FA 2026, or `18 March 2026` | The statutory identity | 2 of 2 | Same. 4.1 sources the change to "the 2025 Budget", which is an announcement and not law. |
| 3 | `TCGA 1992` written out beside `section 162` at least once outside the key takeaways | Statutory precision | 1 of 1 | Present in `keyTakeaways` as "Taxation of Chargeable Gains Act 1992"; **absent from the body in the `TCGA 1992` short form the market and HMRC use.** |
| 4 | `roll-over` or `rollover` used of s.162 | The mechanism's vocabulary | 1 of 1 | Harvest: the `roll over relief` family is 2,540 volume held at positions 70 to 79. **The live page says "roll-over" once in the body and "rolled over" twice; the check is that the rewrite does not lose it.** |
| 5 | `CG65700` (the HMRC manual anchor for s.162) | The authority anchor | 1 of 1 | `house_positions.md` §4 HMRC manual anchors. **Zero occurrences.** Neither competitor cites a manual reference. |
| 6 | `market value` attached to the connected-persons point | Why the gain exists | 1 of 2 | On the page and strong (§5.4). Listed so a rewrite cannot drop it. |
| 7 | `connected persons` | Why the gain exists | 2 of 2 | Same. |
| 8 | `base cost` shown as an arithmetic reduction with real figures | The base-cost computation | 1 of 1 | §5.3 point 1 and §6.3 point 5. **Neither competitor shows a number. This is G1's worked example.** |
| 9 | A named characteristic of **private medical goodwill** that bears on valuation (referral concentration, insurer recognition, or whether income follows the clinician) | Medical goodwill | 1 of 2 | §5.3 point 2. The live page says medical goodwill valuation "is specialist work" and never says what makes it specialist. |
| 10 | `private goodwill` distinguished from `NHS goodwill` in one sentence | Medical goodwill | 2 of 2 | Present in substance across three blocks; the check is that the rewrite keeps the distinction in one place a reader can find. |
| 11 | `2026/27` attached to whichever CGT figure survives §7.5's verification | Currency | 1 of 1 | §6.3 point 2. The live page tags its only figure as 2025/26. |

**Countable test: 11 of 11 present. Any other absent phrase is a named BLOCK.**

**Explicitly NOT on this list, with the reason on the record:**
- **`property incorporation relief`, `SDLT`, `section 24`, the three-year partnership myth** (110 volume plus
  the SDLT family). **DECLINED** at 3.4 point 1 and 4.7 theme 15. Landlord content on a medical site is the V3
  trap.
- **`transfer of a going concern` and the whole `going concern` VAT family** (5,140 volume, pricebailey at
  position 3). **EXCLUDED** as a phrase collision with a different subject (3.4 point 2, 4.3). **The subject is
  O17's and O21-VAT's and O21-VAT's owner is frozen to 2026-09-10.**
- **`roll over relief` as a target family** (2,540 volume at positions 70 to 79). **Reduced to phrase 4, one
  vocabulary sentence.** Chasing the family means writing generic CGT roll-over content.
- **`ESC D32`.** **Conditional**: it is a genuine gap (4.7 theme 7) and a concession is exactly the kind of
  claim that must be read at source. **If it verifies (§7.5) it is added as a twelfth phrase and the test
  becomes 12 of 12. If it does not, it is DROPPED, not guessed**, and the test stays at 11.
- **Any BADR rate, the £1m lifetime limit, or the 24% main CGT rate.** Wave F's page. §7.4.
- **Any dividend rate, corporation tax rate, VAT threshold or s.455 rate.** O34, O17, O21-VAT, and §10.2 of the
  step-by-step pack.
- **Any incorporation STEP sequence phrasing.** O33a and B4.

### 7.2 Equity preservation (§9.9 floor 5)

**The equity set is EMPTY: 0 named Bing queries, 0 Google query rows** (§2). Nothing can be lost by
construction.

**Countable test: 0 of 0, recorded as "empty, verified by fresh pull 2026-09-01", never as "not run".**

### 7.3 CROSS-SURFACE DUPLICATION GATE

Run over the four wave-C surfaces **together**, after all four are drafted, by the conductor.

| # | Gate | Pass condition |
|---|---|---|
| D1 | `162A` occurrences on the other three surfaces | **0** (this page is the only permitted home) |
| D2 | `first anniversary of the 31 January` on the other three surfaces | **0** |
| D3 | Worked apportionment of a gain between share and non-share consideration, on the other three surfaces | **0** |
| D4 | Ordered `<ol>` of incorporation steps, or `howtoSteps` frontmatter, **on this page** | **0** (B4) |
| D5 | Dividend percentage figures (`10.75`, `35.75`, `39.35`, `8.75`, `33.75`) on this page | **0** |
| D6 | Corporation tax percentage figures (`19%`, `25%`, `26.5%`, `3/200`) on this page | **0** |
| D7 | `£90,000`, `£88,000`, `30 days`, `partial exemption`, `Schedule 9 Group 7` on this page | **0** |
| D8 | s.455 percentage figures, the 9-months-and-1-day timing, or `section 458` on this page | **0** |
| D9 | BADR percentage figures, `£1 million lifetime limit`, or the 24% main CGT rate on this page | **0** |
| D10 | Any H2 or H3 on this page whose string contains `worth it`, `benefits`, `drawbacks`, `pros`, `cons`, or `should I incorporate` | **0** (the decision belongs to a FROZEN page holding position 5.7) |
| D11 | Any £ figure on this page that is an output of a sole-trader-against-company comparison | **0** (B2) |
| D12 | Occurrences of the same >= 8-word span on this page and any other wave-C surface | **0** |
| D13 | `(this page)` or any other narration of our own site structure | **0** (§6.3 point 15) |

### 7.4 Arithmetic, and the figures that are BANNED

**G1 requires EXACTLY ONE worked example on this page, and its subject is the apportionment** (4.7 theme 6,
§6.3 point 5). **Every figure in it must be re-derived from stated inputs by `arithmetic_recomputed[]`.**

**It must satisfy G3's five components in order** (a one-line named persona with a role and a rounded figure,
the inputs, the arithmetic step by step, the result, one sentence on what changes the answer), **G4** (role plus
an initial only, explicitly illustrative, never a real practice), **G6** (the heading must NOT be the words
"Worked example" and the block must not open with a "Worked example:" prefix; **hard fail, and the corpus
already contains that string in 13 files**) and **G7** (80 to 200 words). **G7 collides with C2's 75-word
paragraph maximum, so the example necessarily splits across paragraphs; QA must not read the split as a missing
component** (BATCH3_INDEX pack-defect 5).

**G5: the rounded inputs are illustrative, the rates are not.** So: an illustrative goodwill valuation, an
illustrative consideration split, and **real** rates for anything the body has already stated with its year.

**PERMITTED and verified figures on this page:**

| Figure | Year tag | Source |
|---|---|---|
| **TCGA 1992 s.162**; **FA 2026 s.39** amends it; **s.162A omitted** | | `house_positions.md` §4, verified at primary source at the HP-lock gate 2026-06-03 |
| Relief **claimed**, not automatic, for transfers **on or after 6 April 2026**; automatic before | | same |
| Claim deadline: **one year after the 31 January following the tax year of transfer**; for a 2026/27 transfer, **31 January 2029** | | same. **B1: this page only.** |
| **TCGA 1992 s.28(1)** unconditional contract dated when made; **s.28(2)** conditional dated when the condition is met | | §4 |
| **1 April 2004** NHS goodwill prohibition; **SI 2019/251** (revoking SI 2004/906) | | §4 |
| **NHS Act 2006 s.86(1)(c)** and the s.86(3) shareholder conditions, **GMS only** | | §2.C correction, 2026-08-26 |
| Company income and dividends are **not NHS-pensionable**; only the NHS post is pensionable for a consultant | | §2.C. **One sentence, then link to O33a.** |
| **CG65700+** (HMRC manual anchor for s.162); **CG14250+** (time of disposal) | | §4 |
| An illustrative goodwill value and consideration split, with the arithmetic shown | illustrative, labelled | G4, G5 |

**BANNED FIGURES on this page. None may be asserted:**

| Banned | Why | What the page does instead |
|---|---|---|
| **Any BADR rate (10%, 14%, 18%), the £1m lifetime limit, the 2-year conditions, the 5% share tests** | Wave F's `/blog/selling-private-medical-practice-cgt-badr`. **No O-row exists; one is proposed at §10.2 of the step-by-step pack and the allowance is set at one sentence, which is safe under either outcome.** | One sentence framing the fork as **continuing versus exiting**, then link. **No rate.** |
| **The 24% main CGT rate for higher-rate taxpayers** | Same owner. §6.3 point 3 explains why the page must not fix its §4 gap by adding the figure. | Not stated. |
| **The CGT annual exempt amount** | **UNVERIFIED for 2026/27: `house_positions.md` has no entry for it and the live page's £3,000 carries a 2025/26 tag.** §7.5. | **Verify at gov.uk or DROP.** If dropped, the worked example is built without it, which costs nothing because the apportionment is the point. |
| **Any dividend rate**, 2026/27 or historic | **O34.** `/blog/salary-vs-dividend-medical-limited-company-2026`. | One sentence and a link, only if the extraction question is raised at all. |
| **Any corporation tax rate, threshold or marginal-relief fraction** | O34's neighbour, `/blog/gp-corporation-tax`. | One sentence and a link. |
| **Any s.455 rate, the 9-months-and-1-day timing, or the s.458 deferral** | `/blog/consultant-directors-loan-account-s455-medical-company`. §10.2 of the step-by-step pack. | The consideration-mix trade-off, with **no rate and no timing**, then link. |
| **£90,000, £88,000, the 30-day rule, partial exemption, Sch 9 Group 7, the VAT TOGC rules** | **O21-VAT and O17. Owner `/blog/gp-vat-registration` is FROZEN to 2026-09-10.** And the phrase collision at 3.4 point 2 makes this the likeliest accidental breach on this page. | Nothing. The going-concern condition is stated in its **CGT** sense only. |
| **Any incorporation step sequence, or `howtoSteps`** | **O33a and B4.** | One sentence and a link to the step-by-step guide. |
| **Any annual allowance figure, taper threshold, or MPAA** | **O2.** `/calculators/nhs-pension-annual-allowance`. The live page mentions "managing the annual allowance taper" twice with no figure, which is compliant; the gate exists so a rewrite does not add one. | One sentence naming the taper motive, then link. |
| **Any Scheme Pays deadline** | **O4. `/blog/nhs-pension-scheme-pays-doctors-deadlines` is not this batch's at any date. The exact fact that broke batch 1.** | Nothing. |
| **Any GMC annual retention fee** | **O9. UNVERIFIED. Hard fail F5.** | Nothing. |
| **Any fabricated statistic**: "most doctors", "HMRC frequently challenges", a challenge rate, a typical goodwill multiple | **F6, I6.** The page currently says HMRC "can and does challenge unsupported goodwill figures", which is a qualitative claim and is fine; **a frequency or a multiple would not be.** | Qualitative only, or a named source. |
| **Any dental goodwill multiple or the dental "sell the goodwill and claim relief" playbook** | §4: it does not translate to GPs. **The live page correctly warns against borrowing a dental multiple; the ban is on importing one.** | The warning, kept. |
| **"a limited company cannot hold a GMS or PMS contract" flat** | §2.C correction. The live page is already correct in both places. | The approved unpinned form. |

**Countable test: count of banned-figure assertions = 0.**

### 7.5 Statute, regulation and source re-verification

| Claim | Source to re-verify |
|---|---|
| TCGA 1992 s.162 as amended; **FA 2026 s.39**; the claim requirement; **the omission of s.162A** | https://www.legislation.gov.uk/ukpga/1992/12/section/162 and https://www.legislation.gov.uk/ukpga/2026/11/contents/enacted ; `house_positions.md` §4 |
| **FA 2026 identity: c. 11, Royal Assent 18 March 2026** | `house_positions.md` verification log; https://www.legislation.gov.uk/ukpga/2026/11/contents/enacted |
| **The claim deadline: one year after the 31 January following the tax year of transfer** | **Read at s.162 as amended, at source, before restating.** The live page states it twice and the position-5 incumbent states it differently (4.1 point 2). **If the two readings cannot be reconciled at source, state the deadline in the statute's own words and do not paraphrase it.** |
| TCGA 1992 **s.28(1)** and **s.28(2)** disposal timing | https://www.legislation.gov.uk/ukpga/1992/12 ; `house_positions.md` §4 |
| **HMRC manual anchors CG65700+ and CG14250+: that they exist and cover what we say they cover** | https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual |
| **ESC D32 (non-share consideration and liabilities taken over)** | **Must be verified at HMRC before stating. A competitor heading (4.2) is not a source. If it cannot be verified, it is DROPPED, not guessed**, and §7.1 stays at 11 phrases. |
| **The CGT annual exempt amount for 2026/27** | **Must be verified at https://www.gov.uk/capital-gains-tax/allowances before stating.** `house_positions.md` has NO entry for it (§10.1). **The live page's £3,000 is tagged 2025/26 and may not simply be re-tagged.** |
| NHS goodwill prohibition, **SI 2019/251** revoking **SI 2004/906**, including the share-value limb | https://www.legislation.gov.uk/uksi/2019/251/made ; `house_positions.md` §4 |
| GMS may be held by a company limited by shares meeting **s.86(3)**; **s.86 is GMS only; PMS is s.92 with detail in s.94 regulations** | https://www.legislation.gov.uk/ukpga/2006/41/section/86 and /section/92 ; §2.C. **Do not assert a PMS shareholder test.** |
| Company income and dividends not NHS-pensionable | `house_positions.md` §2.C |
| **That private medical goodwill has valuation characteristics we can name** (referral concentration, insurer recognition, whether income follows the clinician) | **Must be sourced before stating.** §5.3 point 2 is a whitespace claim, not a verified fact. **A plausible-sounding valuation factor asserted without a source is exactly the F6 defect.** If no source is found, write the principle (the valuation must rest on the durability of the specific income stream) without inventing the factor list. |

**Countable test: every external factual claim maps to a row above with a fetch date. Count of unverified
claims = 0. Any row that fails verification is DROPPED, not softened.**

### 7.6 Floors

| Floor | Test | Pass condition |
|---|---|---|
| 1. Query coverage | `scripts/track2_query_coverage.py --slug incorporation-relief-private-medical-practice-s162` | Gate bar met; **0 covered queries lost** (the covered set is empty) |
| 2. Arithmetic recompute | `arithmetic_recomputed[]` | Every figure in the worked apportionment re-derived from stated inputs |
| 3. Statute verified at source | `statute_checks[]` | Every row in §7.5 fetched and content-verified |
| 4. Link resolution | `track2_link_audit.py` + `predeploy_gate.py` | 0 HARD 404s; every internal link resolves. **`slug_resolver` HARD-REFUSES flat sites and Medical is flat: verify targets against `content/blog/*.md` directly.** **No link to `/blog/private-practice-incorporation-complete-guide`, which 301s.** |
| 5. Equity preservation | §7.2 | **0 of 0**, empty-verified |
| 6. Cluster coverage | §7.1 | **11 of 11** (or 12 of 12 if ESC D32 verifies) |
| 7. Reconciliation balance | Dossier §10 | **No NO-PAGE topic is absorbed.** The ledger does not move. |
| 8. Competitor re-read | §4.7 | **16 themes, 16 decisions, 0 undecided** |
| 9. Cross-surface duplication | §7.3 | **13 of 13 gates pass** |
| 10. Voice bands | §6.3 point 10 | `you`/`your` **12 to 25** per 1,000 body words; `we`/`our`/`us` **at or below 3** per 1,000 |
| 11. Structure | L4, G1, FAQ band, word band | **At least 1 table**; **exactly 1** worked example; **FAQs 4 to 8** (from 14); **words 2,000 to 3,200** (from 4,485) |
| 12. Style tics | V5, V9 | `it is not X, it is Y`: **at most 1** (the `deferral, not an exemption` heading). Numeral-count openers: **prefer 0, at most 1**. Self-announcing sufficiency claims ("worth labouring"): **0**. |
| 13. Em-dashes | I1 | **0**, frontmatter included |

### 7.7 Extra hard constraints

1. **No em-dashes (U+2014) anywhere, including frontmatter.** Live count 0, must stay 0. I1, hard fail.
2. **No collapse, no redirect, no URL change.** K4. **Do not touch
   `private-practice-incorporation-complete-guide.md`** and do not link to its URL.
3. **Do not edit any of the 19 frozen slugs of §1.2.** Contextual links to their live URLs are fine.
4. **No named individual, no credential, no byline, no "reviewed by".** I2. **This is the constraint that
   separates us from 4.2, and the counter is the statute it omits, not a person.**
5. **Never state or imply that a doctor's ordinary personal service company can hold an NHS contract**, and
   never state the flat "no limited company can". §2.C.
6. **Never write that NHS goodwill can be sold, in any structure**, including through a share sale. §4.
7. **Never describe s.162 as an exemption, a saving, or permanent.** It is a deferral. §5.4.
8. **Never state that 2025/26 is the current tax year**, and never write the BADR 18% or the dividend rates as
   an upcoming change. §4, §5.
9. **Never describe the 2015 NHS scheme as final salary.** §2. It is CARE.
10. **No new interruptive UI**, no modal, banner or popup. I7. Two already exist site-wide (`DeepScrollModal`,
    `ReturningBar` in `src/app/layout.tsx`); they pre-date this programme, no wave touches them (defect D6).
11. **One change per page per window** (§9.3). This REFRAME is the only change to this URL until the 28-day
    Bing read.
12. **No `howtoSteps` frontmatter and no numbered process list.** B4.

---

## 8. Stated expectation

**Written before the work so the later read has something to fail.**

### 8.1 Baseline, from the pulls of 2026-09-01

| Engine | Endpoint | Window | Figure for this URL |
|---|---|---|---|
| Google | GSC `searchanalytics.query`, dimension `page` | 2026-06-03 to 2026-09-01 | **0 clicks, 0 impressions, no row** |
| Google | GSC, dimensions `page` + `query` | same | **0 rows** |
| Bing | `GetPageStats`, **page level** | 2026-05-17 to 2026-08-30 | **0 snapshots, 0 impressions, 0 clicks** |
| Bing | `GetPageQueryStats`, **named-query level** | as returned | **0 rows** |

**Site context.** Google 108 clicks / 10,168 impressions / 90d at impression-weighted position 33.88, **18 of
139 URLs indexed, 51 never fetched**. Bing 360 clicks / 9,818 impressions (`GetRankAndTrafficStats`).
**Bing out-clicks Google 3.3x.**

### 8.2 The read at 14 to 28 days, Bing (primary)

**Bing is where a rewritten page on this domain earns.**

1. **First named-query impression.** At least **3 of the 11** phrases in §7.1 return at least one Bing
   impression for this URL in the 28-day window. **Today: 0 of 11.**
2. **First page-level appearance.** This URL appears in **at least 1** weekly `GetPageStats` snapshot inside 28
   days. **Top-N caveat: appearing is the signal; absence is not proof of zero.**
3. **This is the one wave-C surface where a specific term is worth naming.** `incorporation relief` and
   `section 162 incorporation relief` are the only wave-C terms held by a peer inside the top 10 on Google
   (§3.2), and the incumbent is a 1,057-word property post. **If any wave-C surface registers a named Bing
   impression on a relief term inside 28 days, it should be this one.** That is the wave's most informative
   single observation.
4. **Clicks.** **No click target at 28 days.** A first click on a page with no history is not a measurable
   expectation and setting one manufactures a failure.
5. **Per §9.6 point 2, site traffic rising while these 11 phrases stay at zero is DRIFT and is a FAIL.**

### 8.3 The read at 28 to 90 days, Google, and the honest statement

**Google is crawl-starved on this domain and this page must not be promised a position lift** (§5.3 of the
programme spec). STATE's 2026-09-01 sweep: **18 of 139 URLs indexed in some form, 117 not, 51 unknown to Google
entirely**, and the nine URLs deployed on 2026-08-26 have earned **zero** Google impressions in six days with
IndexNow never submitted.

6. **Indexation, not ranking.** By day 90 this URL moves out of `URL is unknown to Google` or
   `Discovered - currently not indexed` into `Indexed`, measured by
   `python -m optimisation_engine.snapshot.index_coverage medical --fresh --skip-bing`.
   **LOW confidence and not in this page's gift.** The same sweep run twice twenty minutes apart moved six URLs
   across the discovered/unknown boundary, so read the not-indexed side as +/- 6.
7. **No impression target and no position target is set, deliberately.** A page Google has not taken carries no
   information about the page.
8. **Context, not a target.** Google's indexed slice on this domain is the partnership, incorporation and locum
   clusters (STATE: 8 of the 12 indexed blog posts are in them), and the incorporation siblings that do earn sit
   at positions 4.8 to 9.7 on single-digit impressions. **That is the band to read a future number against. It
   must not be quoted back as a promise.**

### 8.4 Failure triggers (§9.6, written as numbers, before the change)

> **TRIGGER 1, the frozen neighbour.** If `/blog/gp-limited-company-tax-benefits-drawbacks` (4 clicks / 96
> impressions / position 5.7) falls below **position 9.0** on the GSC `page` dimension, or below **2 clicks** in
> a rolling 28-day window, between deploy and deploy+90 days, treat wave C as the prime suspect. This page links
> to it three times and must not compete with it (gate D10).

> **TRIGGER 2, self-competition inside the set.** If, at the 28-day read, two or more of the four wave-C
> surfaces return Bing impressions for the **same** named query, the differentiation has failed and the
> conductor re-reads §5.0 before any further change to any of the four.

> **TRIGGER 3, the s.455 neighbour.** If `/blog/consultant-directors-loan-account-s455-medical-company`
> (Google position 9.7 on 13 impressions) loses its page row entirely at the 28-day read, check gate D8 on this
> page first: the consideration-mix H3 is the most likely source of overlap in the set.

> **TRIGGER 4, quality.** If editorial QA raises a **V1, V3 or V5 finding on three or more** of the four
> surfaces, wave C has reproduced the batch-1 defect and its pages are **held rather than deployed**.
> **This page starts at the V5 cap** (§6.3 point 11), so it is the likeliest source of a V5 finding and the
> writer is told so.

**Revert path, restated.** `git revert <the wave-C commit>`, sha derived live at revert time. Single-file:
`git checkout 7e596f02a5339982597949c5b7db9f41af3df4ea -- Medical/web/content/blog/incorporation-relief-private-medical-practice-s162.md`.
**No `monitored_pages` row exists for this page and none is created by this wave; registration is owner-gated,
post-deploy.**

**Tracker discipline (§9.6).** `blog_optimizations.target_keywords` is populated with the **11 phrases of
§7.1**, never with queries the page already ranks for, because there are none.

---

## 9. The ownership map, reproduced

**THE STANDING RULE. Every shared fact has exactly ONE owning page. Every other page gets one sentence and a
link, never the explanation. A writer who needs three sentences is taking someone else's fact and must stop.**

**V7 IS BINDING: where a brief and the map disagree, THE MAP WINS.**

### 9.1 The row that governs this page, verbatim

| # | Shared fact | **Owner** | Everyone else |
|---|---|---|---|
| **O33** | **Incorporation of a medical practice**: s.162 relief (claimed, not automatic, from 6 April 2026 per FA 2026 s.39), the step sequence, and the **pension-accrual loss that must be paired with every tax saving** (house positions §2.C) | `/blog/medical-practice-incorporation-step-by-step`, wave C (**named 2026-09-01 by the D3 ruling**) | Five surfaces currently carry it; after D3, four remain live. |

### 9.2 THE SUB-CLAUSE THIS PAGE DEPENDS ON, proposed and not applied

**The tension.** O33 as written gives the step-by-step page both the step sequence AND "s.162 relief (claimed,
not automatic, from 6 April 2026 per FA 2026 s.39)". **This page is a dedicated 4,485-word surface whose entire
subject is that relief**, whose `metaTitle` is `Section 162 Incorporation Relief: Private Practice`, whose
`metaDescription` sells "the 2026 claim change", and whose four strongest H3s are the claim, the deadline, the
s.162A repeal and the transfer-date fork. Read at its strictest, O33 would strip this page of its own subject
and leave four surfaces where two answer "how do I do it".

**PROPOSED CLARIFICATION, for the conductor to rule before drafting begins:**

- **O33a, `/blog/medical-practice-incorporation-step-by-step`:** the decision-to-first-filing **sequence**, the
  medical-only steps, and the **pension-accrual pairing prose**. It states in **one sentence, with the 6 April
  2026 date**, that the relief must now be claimed, and links here.
- **O33b, THIS PAGE:** **TCGA 1992 s.162 itself**: the roll-over mechanic, the three conditions, the
  wholly-or-partly-for-shares apportionment, private medical goodwill valuation, and the **FA 2026 s.39 claim
  regime in full** (the deadline arithmetic, the removal of s.162A, the before-and-after fork).

**This is a clarification of scope inside one row, not a move of the row.** Both pages stay in wave C, O33's
owner column is unchanged, and nothing is quietly annexed (§9.4).

**FALLBACK, so no writer is blocked.** If the conductor rules O33 stands strictly as written, **one line changes
in each pack**: this page's claim-regime allowance drops to one sentence and a link, and §7.1 loses phrases 1
and 2 (the test becomes 9 of 9). **Nothing else moves.** Until a ruling, the writer follows the DEFAULT above,
because **it is the only split under which no two of the four surfaces answer the same query**, and the
conductor is told (§10.3).

**Note what the default costs if it is wrong: two sentences of statutory identity on the wrong page. Note what
the strict reading costs if it is wrong: the site's only s.162 surface loses the four blocks that are the best
technical writing in wave C and the only place we beat both competitors.** The asymmetry is the argument.

### 9.3 THE ROWS THAT CONSTRAIN THIS PAGE

| # | Shared fact | Owner | **What THIS page does** |
|---|---|---|---|
| **O33a** (proposed, §9.2) | The incorporation step sequence and the pension-accrual pairing prose | `/blog/medical-practice-incorporation-step-by-step` | **One sentence and a link for the sequence. One sentence and a link for the pension pairing.** The live H2 `Practical steps to get section 162 right` becomes a conditions-and-evidence block, not a how-to. B4. |
| **O2** | Annual allowance mechanics: taper, threshold and adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` | **One sentence, then link. No figure.** The live page names "managing the annual allowance taper" twice with no figure, which is compliant. |
| **O4** | Scheme Pays | `/calculators/nhs-pension-scheme-pays` | **No batch-3 page states a Scheme Pays deadline. The exact fact that broke batch 1.** Not needed here. |
| **O9** | GMC annual retention fee, **amount UNVERIFIED** | `house_positions.md` §8 and §10 | **No page states a GMC fee figure. Hard fail F5.** Not relevant here; listed for completeness. |
| **O17** | VAT: healthcare exemption versus standard rating | `/blog/gp-vat-registration` (**FROZEN**) and `/blog/gp-practice-private-non-nhs-income-streams` | **Nothing.** And note 3.4 point 2: the `going concern` phrase collision makes an accidental VAT excursion the likeliest breach on this page. |
| **O21-VAT** | The VAT registration threshold (£90,000, 30-day rule), the £88,000 deregistration limit | `/blog/gp-vat-registration` (**FROZEN to 2026-09-10**) | **Nothing.** Cited as `O21-VAT`, never `O21` (BATCH3_INDEX §6.1a namespace collision). |
| **O18** | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` | One sentence, then link, if needed. |
| **O30** | The partnership capital account itself | frozen partnership set, wave E | **One sentence and a link only, and the link target must be checked live because five partnership pages are frozen.** Relevant where a GP partner carves private work out. |
| **O34** | Salary versus dividend extraction (2026/27: ordinary 10.75%, upper 35.75%, additional 39.35%, allowance £500) | `/blog/salary-vs-dividend-medical-limited-company-2026`, wave C | **One sentence, then link. NO DIVIDEND RATE.** |
| **O35** | The employment-status fork for doctors | `/blog/gp-partner-vs-salaried-gp-tax-comparison` (**FROZEN to 09-10**) | **One sentence, then link. No batch-3 page rebuilds the four-role table.** |
| **C3-01** (proposed, step-by-step pack §10.2) | s.455 rate, the 9-months-and-1-day timing, s.458 deferred relief | `/blog/consultant-directors-loan-account-s455-medical-company` | **The consideration-mix trade-off only, with no rate and no timing, then link.** §6.3 point 4. |
| **C3-02** (proposed, step-by-step pack §10.2) | BADR rate band, £1m lifetime limit, the conditions, and the 24% rate it saves against | `/blog/selling-private-medical-practice-cgt-badr` (wave F, gated to 2026-09-11) | **One sentence framing the continuing-versus-exiting fork, then link. No rate.** §6.3 points 1 and 3. |

### 9.4 If you think a row is drawn in the wrong place

**Do NOT quietly move it.** Say so in §10 and report it. Batch 2's O7 split was ratified because two writers
converged on the same boundary independently and said so. The opposite signal, one writer quietly annexing
another's fact, is what V3 exists to catch.

**This pack proposes one clarification (§9.2) and relies on two rows proposed in the sibling pack (§10.2 there).
It applies none of them and states a fallback for each.**

### 9.5 Batch-level style watch (V5, V9), and it is the CONDUCTOR's job

Batch 1 produced `it is not X, it is Y`. Batch 2 produced the numeral-count paragraph opener (22 instances
across seven pages against a cap of two). Round 3 of the 2026-08-26 batch found a fourth tic forming:
self-announcing sufficiency claims. **V9 is explicit that banning a tic produces the next one.**

1. **Any single sentence-opening or clause shape appearing more than twice on one page, or clustering across the
   four surfaces, is named in wave C's fix pass, whatever it is.**
2. **Named and burned, do not reach for any:** `it is not X, it is Y` (cap **once per page**, wave-wide); the
   numeral-count paragraph opener (cap once per page, prefer zero); the self-announcing sufficiency claim
   (prefer zero).
   **THIS PAGE IS THE WAVE'S PROBLEM CHILD ON ALL THREE: it starts at the V5 cap (`A deferral, not an
   exemption` plus a body restatement), carries one self-announcing sufficiency claim ("the point most worth
   labouring") and one numeral-count opener ("Three core conditions").** §6.3 points 11 to 13. **The V5 idea is
   correct and central, so the ruling is: keep it once, in the heading, and remove the body restatement.**
3. **The house corrective-opening reflex is on its fourth showing.** Wave C's conductor states the variation in
   the fix pass.
4. **V1 hard cap: two word orders per idea per page, non-overlapping longest matches, never raw substrings.**
5. **V2 is a live standard, not a batch-2 rule.**
6. **Process narration is banned** (conductor ruling 3, 2026-08-26). **This page has a live instance: the H3
   `Section 162 (this page)`.** §6.3 point 15. Write "the detail sits on X" and link it; never narrate our own
   structure.

---

## 10. Corrections, findings and escalations

**None was acted on. Nothing outside this file was written.**

### 10.1 HOUSE-POSITIONS GAP: there is no CGT annual exempt amount in the ground truth, and a live page states one

`house_positions.md` covers CGT rates (§4: BADR 10 / 14 / 18 with date bands, and the 24% main rate for
higher-rate taxpayers from 6 April 2026, added 2026-08-26 "because a page needed it and it was not recorded
here"). **It carries no annual exempt amount, for any year.**

This page's only figure is "the annual exempt amount of **£3,000 (2025/26)**", in the worked illustration.
**The tag is stale and the figure cannot be re-tagged from the ground truth, because the ground truth does not
have it.** So the writer faces exactly the situation §4's own August addition describes.

**Proposed as a new `house_positions.md` §4 line: the CGT annual exempt amount for 2026/27, verified at
https://www.gov.uk/capital-gains-tax/allowances, with its date band and the note that it is per person per tax
year.** **Not added: `house_positions.md` is shared with concurrent agents and is manager-direct.** Until it
exists, §7.4 bans the figure and §7.5 requires source verification, and the worked example is built without it.

### 10.2 The position-5 incumbent may be wrong about the claim deadline, and we should not correct it until we have read the provision

pricebailey.co.uk (4.1) says the claim is made "in their Self-Assessment return **for the tax year in which the
transfer takes place**". `house_positions.md` §4 says the claim runs to "**one year after the 31 January
following the tax year of the transfer**". Those are different windows and the second is roughly a year longer.

**This is a real opportunity and a real trap.** If our reading is right, the number-five result on the head term
is telling people their window closes a year early, and saying so precisely is the strongest possible
differentiator. **If our reading is a paraphrase of the provision rather than the provision, we would be
publishing a correction we cannot support.**

**Instruction, and it is §7.5's row: read s.162 as amended at legislation.gov.uk and state the deadline in the
statute's own words. Do not paraphrase it, and do not characterise the competitor's version as wrong in public.**
Recorded because it is the kind of finding that gets written up before it is verified.

### 10.3 The O33 clarification needs a conductor ruling before drafting

§9.2. **This is the one item that could block a writer on this surface**, and the pack removes the block by
naming a default (O33a / O33b) and a one-line fallback. **The conductor should still rule explicitly**, because
the two readings put roughly 900 words in different places and a QA agent reading O33 literally would raise the
default as a breach on this page specifically.

### 10.4 The competitor holding position 7 on our exact term is actively stale, and it is worth recording as market intelligence

lanop.co.uk (4.2), published **7 February 2026**, carries an H2 `Electing Out of s162 Relief (s162A)` and an H3
`When to Elect Out?` as live guidance. **FA 2026 s.39 omits s.162A for transfers on or after 6 April 2026**, so
for any transfer from that date there is no election. The page is 4,103 words, has a named Tax Partner byline
and an FAQ, and holds positions 7, 8 and 10 on the three s.162 terms.

**Two uses for this.** First, it is the clearest evidence in wave C that depth alone does not make a page
current, which is the argument for our own re-verification discipline. Second, it means **the s.162 SERP is
winnable on accuracy rather than on length**, which is the cheapest kind of win available and the reason §5.1
frames the differentiator as one sentence of statutory identity.

**Recorded as market intelligence. No action is taken against the competitor and nothing about them appears on
our page** (I2, and naming a rival's error on our own page is not the house voice).

### 10.5 Method note for later packs: the `going concern` phrase collision will recur

A `going concern` regex over this harvest returns 5,140 volume that looks like s.162 condition territory and is
actually **VAT TOGC** territory (4.3), owned by O17 and O21-VAT with a **frozen** owner. It ranks well
(positions 3 to 4 on the transfer phrasings) which makes it look winnable, and it is one regex away from putting
VAT content on a CGT page.

**Recorded so the exclusion is a decision rather than an omission**, in the same spirit as the wave-A pack's
`pms instruments` false positive. **Anyone re-deriving this cluster will pick it up again.**

---

## 11. Limitations

1. **This page has no measurement history on either engine**, so §7.1's phrase list is derived from competitor
   evidence and house-positions vocabulary rather than from our own query data. Weaker evidence than the wave-A
   packs had, stated rather than hidden. Every row names its source.
2. **The harvest gives this surface a real head term and no medical modifier.** 20 keywords, 8,570 volume, and
   **zero** medical vocabulary anywhere in the 1,153-keyword family except one 40-volume podcast row. The
   §7.1 list is correspondingly built on statutory precision rather than on keyword targets.
3. **Peer-winnable is Google-derived.** On a domain where Bing out-clicks Google 3.3x and Google has indexed 13%
   of the corpus, read every peer-winnable figure as a **floor**.
4. **`GetPageStats` is a top-N endpoint.** The zeros in §2 are floors, not proven absences.
5. **Thirteen competitor URLs were fetched across this set; two required a client change to recover**
   (step-by-step pack §10.1). **`apexaccountants.tax/basics-of-cgt-rollover-relief/` was deliberately NOT
   fetched** (4.4), and the reason is on the record. **No fetch was silently dropped and no non-200 was left
   unrecorded.**
6. **No live-production check was run against medicalaccounts.co.uk by this task.** Rendering mode, category
   resolution and internal link targets come from the repo, traced to the call site. The one live-state fact
   relied on is the D3 ruling's own live fetch.
7. **Three claims in §4 and §5 are competitor-sourced or unverified and must be read at source before any of
   them is written** (§7.5): **ESC D32**; the **CGT annual exempt amount for 2026/27**; and the **named
   valuation characteristics of private medical goodwill**, which is a whitespace claim rather than a verified
   fact. **A competitor heading is not a source, and neither is a plausible-sounding valuation factor.**
8. **The scratchpad is contended.** A concurrent agent overwrote this task's first pull script mid-run
   (BATCH3_INDEX defect D10, recurring). Every figure here is from a re-run under a uniquely named file, and the
   sibling agent's independent pull reproduced two of §2.4's figures exactly.
