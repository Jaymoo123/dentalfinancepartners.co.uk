# §9.5 RESEARCH PACK: /blog/accountants-for-vets-veterinary-practice-tax

Batch 2, item 6. Assembled 2026-08-26 against the binding batch contract `docs/medical/packs/BATCH2_INDEX.md`, the frozen inputs `docs/medical/cluster_dossier_2026-08-26.md`, `docs/medical/competitor_universe_2026-08-26.md`, `docs/medical/language_spec_2026-08-26.md`, `docs/medical/house_positions.md`, and the niche map `expansion_research/nichemap_2026-08-25/`. Live competitor fetches recorded in section 4.

**Preparation only.** No page content written. Nothing under `Medical/web/` read except read-only greps, and nothing there edited. Nothing committed, deployed or indexed. No `monitored_pages` row. No monitor, alert, cron or scheduled job created. **No new DataForSEO or paid SERP calls: $0.00 additional spend.** The one live API call made was Bing Webmaster `GetQueryStats`, which is free and is recorded in section 2.

Repo state: `git rev-parse HEAD` = `77cc1bedc8e8c2a5dea8297bb7e71f28e33440cf`.

---

## 1. Target and permission level

**CONSTRAINT FIRST.**

| Field | Value |
|---|---|
| URL | `/blog/accountants-for-vets-veterinary-practice-tax` |
| Status | **NET-NEW.** The file does not exist. `ls Medical/web/content/blog/accountants-for-vets-veterinary-practice-tax.md` returns `No such file or directory` |
| Cluster / topic | vets · niche-map ABSORB row 21 · discovery lane `allied_health` |
| Grade | **NEW PAGE.** No grade, no equity, no frozen structure |
| Source file to be created | `Medical/web/content/blog/accountants-for-vets-veterinary-practice-tax.md` |
| Renderer | Markdown file with YAML frontmatter. **The body is raw HTML inside the markdown file**, not markdown prose: `<p>`, `<h2>`, `<h3>`, `<ul>` written directly. `metaTitle`, `h1`, `keyTakeaways`, `summary` and the whole `faqs` array live in frontmatter and are separate editable surfaces from the body |
| Required frontmatter keys | `slug`, `canonical`, `date`, `category`, `image`, `imageCredit` (**exactly one key, never duplicated**), `altText`, `schema` |
| Revert path | Delete the single new file. `git rm Medical/web/content/blog/accountants-for-vets-veterinary-practice-tax.md`. Nothing else is touched, so there is nothing else to unwind |
| Frozen-list position | Not frozen. The true frozen set is the 19 rows returned by `select slug from monitored_pages where site_key='medical' and monitor_until > now()` (`BATCH2_INDEX.md` §3, correction 3). This slug is on none of them because it does not exist |

**Permission level: full authorial freedom on the page itself, hard scope limits on what it may contain.** There is no equity to protect and no structure to preserve, so `metaTitle`, `h1`, every heading, the body, `keyTakeaways`, `summary` and the `faqs` array are all the writer's. What is constrained is **subject matter**, by the ownership map in section 1b, and **framing**, by the five conditions in section 1c.

### 1a. SIZING: the niche map is wrong and this is a required finding

`C2_PLACEMENT.md` row 21 sizes this at **"cluster 3-5"** pages and **120/mo**. The harvest does not support that.

| What the niche map says | What the harvest says | Source |
|---|---|---|
| cluster of 3 to 5 pages | **1 page** | section 3 |
| 120/mo | **1,260 total volume**, 740 peer-winnable | section 3, re-derived |
| implied breadth | **11 deduplicated keywords**, of which **5 are one commercial term written five ways** at 110 volume each, plus a sixth `-ing` form | section 3 |

Building three to five pages on eleven keywords is a page per keyword. `docs/_engines/REWRITE_PROGRAM.md` §9.3 forbids that shape outright. It is also self-competition manufactured on purpose, which is the exact defect batch 1 was punished for.

**Recommendation: ONE page. Widening is deferred until there is measured demand**, and "measured demand" means Bing named queries on this URL that the single page is failing to satisfy, not a repeat of the sizing estimate. Restated in section 8.

The sizing overstatement is not the only thing that shrinks. Once binding rule **V1** (two word orders per idea per page, hard cap) is applied to the five-way commercial term, **the page can legitimately require only 2 assigned phrases covering 4 of the 11 keyword rows, 440 volume**. The other 7 rows are declined with reason in section 7.1. That is the real size of this cluster and it is smaller than either the niche map or the raw harvest number suggests.

### 1b. THE OWNERSHIP MAP ROWS THAT BIND THIS PAGE

Copied from `BATCH2_INDEX.md` §4. Binding rule **V3**: every shared fact has exactly ONE owning page; everyone else gets **one sentence and a link, never the explanation**. If the writer finds they need three sentences on any of these, they are taking someone else's fact and must stop.

| # | Shared fact | Owner | What THIS page does |
|---|---|---|---|
| **O16** | Practice-ownership economics shared between human and veterinary practice: goodwill, associate versus principal, incorporation, partnership accounts | The existing GP and private-practice corpus (130 pages) | **One sentence and a link** for the shared shape. Then write only what is **genuinely veterinary-specific**. Link targets verified to exist: `/blog/selling-private-medical-practice-cgt-badr`, `/blog/incorporation-relief-private-medical-practice-s162`, `/blog/gp-partnership-tax-complete-guide` |
| **O17** | VAT: healthcare exemption versus standard rating | `/blog/gp-vat-registration` (**FROZEN** to 2026-09-10) and `/blog/gp-practice-private-non-nhs-income-streams` (batch 1) | **ONE SENTENCE** saying veterinary fees are standard-rated with no medical exemption, then a link. **It must not explain the exemption.** Both link targets verified present in `Medical/web/content/blog/` |
| **O18** | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` (batch 1; route verified at `Medical/web/src/app/nhs-pension/page.tsx`) | **One sentence**: vets are not in the scheme at all. Then link |
| **O15** | Audience descriptions for vets inside `/blog/healthcare-accountants-uk` | Item 2 **routes only** | Item 2 gives this page **2 to 4 sentences** of orientation and hands off. Binding rule **V4**. If item 2 delivers the vet case, this page has nothing left to rank for. **This pack's counterpart obligation: this page must not restate item 2's "what a healthcare accountant does" pitch (O14)** |

**Ground-truth position: this page needs NO extension to `house_positions.md`, and that is a constraint rather than a convenience.** It gets no extension because it **must not assert veterinary-specific tax figures that the file does not carry**. `house_positions.md` is a human-medicine ground-truth file. It contains no veterinary VAT rate, no veterinary goodwill valuation multiple, no RCVS fee, no corporate-consolidation market-share statistic. Anything veterinary-specific that would be a stated figure must be verified at primary source first and named in section 7.5, or it does not go on the page. See F7: absence of a figure is stated, never smoothed over.

### 1c. THE FIVE FRAMING CONDITIONS. These are hard acceptance criteria, not guidance.

Verbatim in substance from `BATCH2_INDEX.md` §2b, which is the ruling this pack implements. Each is made countable in section 7.6.

1. **The page is about a business, not about a profession.** Sold on practice-ownership economics, which is the genuine overlap with the existing corpus. **Never on veterinary clinical understanding.** We do not have it and must not imply it.
2. **The page must name what is different, in its own voice, early.** No NHS contract, no NHS Pension Scheme, standard-rated VAT with no medical exemption. Those three are the sharpest contrast anywhere on this site and they are the honest reason this is a separate page rather than a paragraph.
3. **The genuinely veterinary-specific substance is corporate consolidation.** Practice sale, goodwill and earn-out is the commercial heart of the page. Section 5 confirms this is the real differentiator against the competitor set.
4. **No persona hub, no top navigation.** One blog-namespace page, reachable from `/blog/healthcare-accountants-uk`. The brand risk in the niche-map flag is a **prominence** risk and prominence is what we are declining to give it. Reopenable with data; the reverse is not.
5. **Runner-up host stays on the record.** If a later read shows the page pulling non-healthcare traffic or muddying the medical brand's query set, the reversible move is to port it to `generalist` (`C2_PLACEMENT.md` §5 row 1). One page is cheap to move. That is the whole reason for building it as one page. Measured in section 8.

### 1d. Regulatory position

`C1_REGULATORY.md` row 21: **CLEAR**, reason "RCVS bites the client". The Method section's decisive distinction applies without qualification:

> "We are not carrying on the client's regulated activity. We are selling accountancy services to people who carry it on. A vet's RCVS registration ... bites on the *client* and is irrelevant to us."

The four estate-wide standing constraints apply and none of them binds this page's likely content: (1) no avoidance-scheme promotion; (2) no contingent-fee or assignment-based tax-refund service; (3) no R&D claim-farm positioning; (4) **no introduction of an individual, sole trader or small partnership to a lender or broker, company and LLP borrowers only** (RAO art 36A). Constraint 4 is the one with live bite here: a page about buying, selling or financing a veterinary practice must not become a finance-introduction page for a sole-trader vet. Countable at 7.6.

---

## 2. Equity register

**THE PAGE DOES NOT EXIST. THERE IS NO EQUITY. THERE IS NOTHING TO PROTECT.**

This section is stated rather than omitted, per `BATCH2_INDEX.md` §1 ("Every equity register is therefore empty, and each pack says so rather than omitting the section").

**Google.** Zero. Not "zero measured", zero by construction: there is no URL to have accumulated impressions or clicks. No `searchanalytics.query` pull was made for this URL because a pull against a non-existent page is not evidence of anything.

**Bing, site-level, pulled fresh by this task on 2026-08-26.** Re-run independently rather than inherited from the batch index:

```python
from optimisation_engine.clients.bing_query_client import BingWebmasterClient
q = BingWebmasterClient().get_query_stats('https://www.medicalaccounts.co.uk')
# total site-level queries: 648
# regex r'veterinar|\bvets?\b' (case-insensitive) over the Query field
# veterinary-family matches: 0
```

| Measure | Value |
|---|---|
| Bing site-level queries returned | **648** |
| Of those matching `veterinar\|\bvets?\b` | **0** |
| Bing impressions on the veterinary family | **0** |
| Bing clicks on the veterinary family | **0** |
| Google equity | **0**, the page does not exist |

**Do-not-lose queries: none. There is no BLOCK condition available on this page**, because a page with no equity cannot lose any. The failure modes for this page are quality and brand, not regression. That is why section 8 carries a brand-risk read instead of a revert trigger.

---

## 3. The market's keyword set

Source: `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'`, 32,872 persisted rows, 27 domains, no volume floor. Already paid for in the dossier task ($4.92048). **This pack spent $0.00.**

**Selection regex, printed so the counts are re-derivable:**

```
ranked_keyword ~ '(veterinar|\mvet\M|\mvets\M)'
```

The `\m` and `\M` word-boundary limbs matter: without them the regex collides with "vetting", "private", "veteran" and "servet"-shaped tokens. It is the same limb used in `BATCH2_INDEX.md`'s provenance query for `B2-vets`.

**Headline figures, re-derived by this pack:**

```sql
-- run 2026-08-26 via `python scripts/_q.py <file.sql>`
with peers as (select unnest(array['medicsmoney.co.uk','sial-accountants.co.uk','kudosaccounting.co.uk',
 'bw-medical.co.uk','pricebailey.co.uk','practiceindex.co.uk','sandisoneasson.co.uk','ramsaybrown.com',
 'r-m-t.co.uk','nicholsmedical.co.uk','gorillaaccounting.com','lanop.co.uk','accountants4nhsdoctors.co.uk',
 'hawsons.co.uk','bhp.co.uk','freestyleaccounting.com','simpkinsedwards.co.uk','taxqube.co.uk',
 'coveneynicholls.co.uk','fkca.co.uk','medifintech.co.uk','rbp.co.uk']) d),
c as (select * from dataforseo_competitor_data where site_key='medical' and date_pulled='2026-08-26'
      and ranked_keyword ~ '(veterinar|\mvet\M|\mvets\M)'),
k as (select ranked_keyword, max(search_volume) v,
   min(position) filter (where competitor_domain in (select d from peers)) bpp from c group by 1)
select count(*) uniq_kws, sum(v) total_vol,
 sum(v) filter (where bpp<=20) peer_winnable_vol,
 count(*) filter (where bpp<=10) peer_top10_kws from k;
```

| Measure | Value | Matches the batch index? |
|---|---|---|
| Deduplicated keywords | **11** | yes |
| Total volume | **1,260** | yes |
| Peer-winnable volume (a §2a peer at position <= 20) | **740** | yes |
| Keywords held by a peer inside the Google top 10 | **6** | yes |

All four re-derive exactly. No correction to `BATCH2_INDEX.md` row 6 is needed.

**The full keyword set.** `Best peer pos` = best position held by a domain in the `competitor_universe_2026-08-26.md` §2a peer set. `Best any pos` = best position held by any of the 27 harvested domains. Peer-winnable **orders** the work and never excludes a row (owner decision 21, 2026-08-26).

| Vol | Best peer pos | Best any pos | Peer-winnable | Verbatim in our copy? | Keyword |
|---|---|---|---|---|---|
| 260 | 47 | 47 | no | **no** | locum veterinary |
| 170 | 35 | 35 | no | **no** | veterinary locum insurance |
| 140 | 7 | 7 | **yes** | **no** | global veterinary careers |
| 110 | **2** | 2 | **yes** | **no** | vet accountant |
| 110 | **4** | 4 | **yes** | **no** | vet accountants |
| 110 | **6** | 6 | **yes** | **no** | veterinary accountant |
| 110 | **2** | 2 | **yes** | **no** | veterinary accountants |
| 110 | **4** | 4 | **yes** | **no** | veterinary accounting |
| 50 | 17 | 17 | **yes** | **no** | online vet consultation and prescription uk |
| 50 | 30 | 30 | no | **no** | what is a locum vet |
| 40 | 29 | 29 | no | **no** | the sim veterinary consultancy reviews |

**"Best peer pos" equals "best any pos" on all eleven rows.** Every position in this cluster is held by a §2a peer. No institutional layer (bma.org.uk, nhsbsa, gov.uk, themdu) holds a single veterinary keyword, which is the structural opposite of every other cluster in batch 2. There is no unwinnable authority tier here at all.

**The "verbatim in our copy?" column is "no" on all eleven rows, and this is trivially so rather than interestingly so.** Command, read-only, run 2026-08-26:

```
grep -rli -E "veterinar|\bvets?\b|\bvet\b|RCVS" Medical/web/content/
# 0 files, on every one of the four patterns
```

Each of the eleven keyword strings was also checked verbatim against `Medical/web/content/` and returned 0 files. The corpus contains no veterinary vocabulary of any kind, so a per-row absence table would be eleven identical rows carrying no information. One line is the honest presentation.

**Structural read of the set, which is what actually drives sections 7 and 8.** Eleven rows is not eleven ideas. It is four:

| Idea | Rows | Volume | Peer-winnable |
|---|---|---|---|
| **A. The commercial term**, written five ways | vet accountant, vet accountants, veterinary accountant, veterinary accountants, veterinary accounting | 550 | 550, all inside the top 6 |
| **B. Locum** | locum veterinary, veterinary locum insurance, what is a locum vet | 480 | **0** |
| **C. Navigational brand queries** | global veterinary careers (a Simpkins Edwards client's company name), the sim veterinary consultancy reviews | 180 | 140 |
| **D. Consumer clinical** | online vet consultation and prescription uk | 50 | 50 |

Only idea A is an accountancy commercial term this page can honestly target. Idea B has zero peer-winnable volume and its best position anywhere is 30. Ideas C and D are somebody else's brand name and a pet owner looking for a vet appointment. **440 of the 1,260 is the addressable number once V1 is applied**, and section 7.1 shows the arithmetic.

---

## 4. Competitor teardown

Nine URLs hold keywords in this cluster. Six are torn down below, one is recorded as deferred per the brief, and two further URLs that surfaced in the harvest are recorded at 4.9 so that no page is silently dropped (§9.7 balance rule).

Domain classification per `competitor_universe_2026-08-26.md` §2a. **Every one of the nine URLs belongs to a §2a peer.** There is no unwinnable-authority tier in this cluster.

URL-and-keyword provenance:

```sql
select competitor_domain, url, count(distinct ranked_keyword) kws, min(position) best_pos
from dataforseo_competitor_data where site_key='medical' and date_pulled='2026-08-26'
and ranked_keyword ~ '(veterinar|\mvet\M|\mvets\M)' group by 1,2 order by kws desc;
```

### 4.1 https://www.hawsons.co.uk/sectors/healthcare-medical-accountants/vets/
5 in-cluster keywords · best position **2** · **peer** (hawsons.co.uk, §2a rank 14)

- **FETCH FAILED: HTTP 403 Forbidden.** Recorded as a flagged gap. **Not dropped.**
- This is a **known** 403, not a new discovery. `house_positions.md` records hawsons and nhsbsa as 403 to automated fetching, and `BATCH2_INDEX.md` §9 limitation 3 names hawsons specifically as holding addressable rows on items 5 and 6.
- **What is lost.** Headings, word count, whether it carries a table, a worked example or an FAQ block, and whether it treats corporate consolidation, practice sale, goodwill or RCVS Practice Standards. Because it is the joint-best-positioned page in the cluster, this is the single largest unknown in the teardown. **It cannot be marked covered or declined at QA floor 8 without a human read.** Named in section 7.6 as a stated limitation, never as a decision.
- **What is NOT lost, and it is the load-bearing evidence in this pack.** The URL path is public data and needs no fetch: `/sectors/healthcare-medical-accountants/vets/`. Hawsons ranks **second** for `veterinary accountants` (110) and **second** for `vet accountant` (110) from a page whose parent directory is literally `healthcare-medical-accountants`. See 4.8.

### 4.2 https://gorillaaccounting.com/accountants-for-locum-vets/
5 in-cluster keywords · best position **2** · **peer** (gorillaaccounting.com, §2a rank 11) · fetched 200

- Title: "Vet Accountants | Accounting for Locum Vets". H1: "Specialist accountants for Locum Vets and Veterinary Nurses". ~2,100 words.
- H2: A Tailored Accounting Service for Locums in the Veterinary Sector · Some of the Services Included in our Locum Vet Accounting package are: · More Take Home Pay For Locum Vets & Veterinary Nurses · The Benefits of Technology · At Gorilla, we specialise in: · Ready to talk? · The UK's Most Trusted Accountancy Firm · Let's get started
- H3: Request a Callback · Unlimited Support · We proudly support StreetVet · Locum Vets and Veterinary Nurses · Technology-Driven Accountancy Solution · Dedicated Accountant Support · Other Products and Affiliate Products
- Tables: **no**. Worked example: **no**. FAQ block: **no**. Pricing: **yes and prominent**, £125+VAT/month limited company, £62+VAT/month sole trader, £119+VAT/month, £160 inc VAT company formation, 50% off first three months.
- Opening: "Gorilla Accounting are the national leaders in providing veterinary accounting services to Locums working in the veterinary industry. As part of our fixed-fee all-inclusive package priced at just £125..."
- Mentions: VAT (as a service line), IR35 reviews, limited-liability protection. **No RCVS. No practice sale, goodwill or earn-out. No corporate consolidation.**
- **Judgement.** Twenty-one hundred words and roughly none of it is about veterinary tax. It is a contractor-brand pricing page with the word "vet" substituted in, aimed at the individual locum rather than the practice owner, and it ranks second on the head term on brand plus exact-match H1 vocabulary. Its opening violates A1, A3 and D3 simultaneously (opens on itself, 40 words in and the only substance is a price). Its pricing move is unavailable to us: `I5` bans pricing outright, and the niche-site model is anonymised social proof only, no pricing, no client names. **We do not copy the pricing and we do not copy the sponsorship block ("We proudly support StreetVet").** The gap this page leaves is the entire practice-owner audience.

### 4.3 https://lanop.co.uk/accountants-for-vets/
5 in-cluster keywords · best position **5** · **peer** (lanop.co.uk, §2a rank 12) · fetched 200

- Title: "Accountants for Vets & Veterinary Practices UK | Lanop". H1: "Accountants for Vets. Specialist Veterinary Tax & Accounting". **~800 to 900 words.**
- H2: How Lanop Helps Vets · What Accounting Services We Offer. **Two H2s on the whole page.**
- H3: Tax Planning & Compliance · Bookkeeping & VAT Management · Payroll & Pensions · Specialist Tax Advice for Vets
- Tables: **no**. Worked example: **no**. FAQ block: **no**. Pricing: no.
- Opening: "Running a veterinary practice means balancing patient care with financial management. At Lanop, we understand that vets face unique challenges, from VAT complexities on medicines to managing staff payroll."
- Mentions: **VAT yes**, and specifically on animal medicines, pet food and mixed supplies. Pensions only as auto-enrolment inside payroll. **No RCVS. No practice sale, goodwill or earn-out. No corporate consolidation.**
- **Judgement. This is the thinnest page in the cluster and it ranks fifth on a 110-volume head term.** Eight hundred words, two H2s, four service-line H3s, no table, no example, no FAQ. It is a services list. The one genuinely veterinary thing on it is the VAT-on-mixed-supplies line, which is the practice-side VAT detail **O17 forbids this page from taking**. That is a clean outcome rather than a loss: the competitors own the veterinary VAT mechanics, we cede them in one sentence and a link, and we take the ground they leave.

### 4.4 https://r-m-t.co.uk/rmt-medical/veterinary-practices/
5 in-cluster keywords · best position **4** · **peer** (r-m-t.co.uk, §2a rank 9) · fetched 200

- Title: "Accounting for Veterinary Practices | RMT Accountants". H1: "Accounting for Veterinary Practices". ~1,200 words.
- H2: Expert Vet Accountants · Working with Us · Choose RMT Accountants · Get in touch to find out more · Key Contacts · In this section · Latest news · Connect with RMT. H3: **none.**
- **Five of the eight H2s are site chrome** ("Key Contacts", "In this section", "Latest news", "Connect with RMT", "Get in touch to find out more"). The substantive heading count is **three**.
- Tables: **no**. Worked example: **no**. FAQ block: **no**. Pricing: no.
- Opening: "At RMT Accountants, we understand that veterinary practices operate under tight deadlines and often have little to no time to handle the amount of paperwork..."
- Mentions: **VAT yes**, "mixed supplies of medicines and animal feeds ... retail sales and farm animal services". **"Practice valuations" appears as a service-line noun and nothing more.** No RCVS. No earn-out, no corporate consolidation, no NHS.
- **Judgement.** Three real headings behind a chrome-heavy template, holding position 4 on the head term. The nearest any competitor comes to the practice-sale conversation is the two words "practice valuations" in a bulleted service list, with no content behind them. Its opening is the same self-referential "we understand that..." shape as 4.3, which is A3 and D3 both. Its URL path is `/rmt-medical/veterinary-practices/`: see 4.8.

### 4.5 https://www.pricebailey.co.uk/industries/healthcare/veterinary-practices/
5 in-cluster keywords · best position **9** · **peer** (pricebailey.co.uk, §2a rank 5)

- **FETCH FAILED: HTTP 403 Forbidden.** Recorded as a flagged gap. **Not dropped.** Consistent with pricebailey's 403 on the McCloud teardown (`PACK_blog__mccloud-remedy-nhs-pension-doctors-explained.md` §4.4), so this is a site-wide bot block rather than a page-specific one.
- **What is lost.** Headings, length, whether it carries a table or worked example, and whether it treats corporate consolidation. Price Bailey is a top-20 UK firm with a genuine healthcare division, so it is the most likely of the six to carry the practice-sale and consolidation material, and the inability to read it is the second-largest unknown in the pack. **Cannot be marked covered or declined at QA floor 8 without a human read.**
- **What is NOT lost.** The URL path `/industries/healthcare/veterinary-practices/`. See 4.8.

### 4.6 https://gorillaaccounting.com/blog/a-guide-to-becoming-a-locum-vet/
3 in-cluster keywords · best position **30** · **peer** · fetched 200

- Title and H1: "A Guide to Becoming a Locum Vet". **~2,800 words.** H3: none.
- H2: Why Should You Become a Locum Vet? · Is Locuming for You? · What Type of Business Structure is Better for Locum Vets? · Register Your Company · How Can Locum Vets Find Their First Client? · How Can Locum Vets Market Their Business? · Dealing with IR35 · Tax and National Insurance as a Locum Vet · Choosing Accountants for Locum Vets
- Tables: **no**. Worked example: **none with figures**. FAQ block: **no**. Pricing: incorporation service at £50+VAT only.
- Mentions: **IR35 at length** (control, mutuality of obligations, right of substitution), locum insurance as an obligation, PAYE, corporation tax and NI in a dedicated section. **No VAT. No RCVS.**
- **Judgement. This is the only genuinely editorial page in the cluster and it is the worst-positioned, at 30.** Twenty-eight hundred words, nine question-form H2s, real IR35 substance, and it ranks thirtieth, because it holds the locum-family keywords (`locum veterinary` 260 at 47, `what is a locum vet` 50 at 30, `veterinary locum insurance` 170 at 35) which nobody ranks well for. Two readings, both true: depth alone does not win this cluster, and the locum slice of it is not winnable by anyone, including us. It reinforces the section 7.1 decision to decline the whole locum family. It is also the page that owns "what is a locum vet" as a career-guidance question, which is off-proposition for us regardless of position.

### 4.7 https://www.simpkinsedwards.co.uk/case-studies/global-veterinary-careers
1 in-cluster keyword · position **7** · **peer** (simpkinsedwards.co.uk, §2a rank 17)

**DEFERRED, not torn down**, per the brief. Recorded rather than dropped.

The single keyword is `global veterinary careers` (140 volume, position 7). **Global Veterinary Careers is the name of a client company**, and the URL is `/case-studies/`. This is a navigational brand query for somebody else's business that happens to contain the token "veterinary". It is peer-winnable on the arithmetic and unwinnable in substance: we cannot and must not target another company's name, and `I4` bans named clients on our own pages in any case. Not fetched, because there is nothing this page could teach a page about veterinary practice tax. **Declined in section 7.1 with this reason.**

### 4.8 THE URL-PATH FINDING. This is what settles the brand-fit flag.

The niche map flags row 21 because "Medical Accounts" is a human-medicine brand and veterinary is a different profession. `C2_PLACEMENT.md` §5 calls it "the weakest host call in the table". The teardown answers it with market behaviour rather than judgement.

| Competitor page | Best pos | Where the URL says it sits |
|---|---|---|
| `hawsons.co.uk/sectors/**healthcare-medical-accountants**/vets/` | **2** | inside the firm's healthcare / medical-accountants section |
| `r-m-t.co.uk/**rmt-medical**/veterinary-practices/` | **4** | inside the RMT **Medical** division |
| `pricebailey.co.uk/industries/**healthcare**/veterinary-practices/` | **9** | inside the healthcare industry hub |
| `lanop.co.uk/accountants-for-vets/` | 5 | standalone |
| `gorillaaccounting.com/accountants-for-locum-vets/` | 2 | standalone, contractor-brand framing |
| `gorillaaccounting.com/blog/a-guide-to-becoming-a-locum-vet/` | 30 | standalone blog |

**Confirmed, and it holds.** Three of the six pages holding this cluster live inside a human-healthcare division at the URL level, and they occupy positions **2, 4 and 9**. The strongest single fact needs no interpretation: **hawsons ranks second for `veterinary accountants` from a page whose parent directory is literally `healthcare-medical-accountants`.** Google is not penalising a human-medicine healthcare accounting brand for publishing a veterinary page. It is ranking one second.

**One correction to `BATCH2_INDEX.md` §2b, stated rather than silently adopted.** The index's prose says "**Four** of the six sit inside the firm's own healthcare or medical division", and the task brief phrases it as "three of the four best-positioned pages". The index's own table below that sentence lists **three** such pages, and it is three. On strict position ordering the four best-positioned pages are hawsons (2), gorilla-locum (2), r-m-t (4) and lanop (5), of which **two** are healthcare-division hosted; pricebailey at 9 is the fifth. The accurate statement, which is still decisive, is: **three of the six pages in this cluster are hosted inside a human-healthcare division, and they hold positions 2, 4 and 9, including the joint-best position in the cluster.** The conclusion the index draws is correct. The count in its prose is one too many and should be fixed to match its own table.

### 4.9 Two further in-harvest URLs, recorded so none is silently dropped

- `https://www.hawsons.co.uk/large-majority-of-vet-consultation-can-be-carried-out-remotely/` (1 keyword, `online vet consultation and prescription uk`, 50 volume, position 17). A news post about veterinary telemedicine on a firm's blog. Off-proposition for us: the searcher is a pet owner looking for a consultation, not a practice owner looking for an accountant. Not fetched. Declined in 7.1.
- `https://practiceindex.co.uk/gp/graham-sibbald` (1 keyword, `the sim veterinary consultancy reviews`, 40 volume, position 29). A GP-directory listing page catching a stray navigational query for an unrelated consultancy's reviews. Pure harvest noise. Not fetched. Declined in 7.1.

### 4.10 Coverage checklist: union of their heading themes, minus what we would have

Union of every heading theme observable across the four readable pages (4.2, 4.3, 4.4, 4.6). Hawsons (4.1) and Price Bailey (4.5) contribute **no themes** because both returned 403, and that absence is itself carried into the checklist as an unknown rather than as a zero.

| # | Theme | Held by | Ours? |
|---|---|---|---|
| 1 | Generic "we help vets / how we help" service framing | 4.2, 4.3, 4.4 | **DECLINE.** A3 and D3 ban the self-referential opener; a blog page is not a service page |
| 2 | Service-line list (tax compliance, bookkeeping, payroll) | 4.2, 4.3, 4.4 | **DECLINE.** Belongs to `/blog/healthcare-accountants-uk` (O14). This page must not restate it |
| 3 | **VAT on veterinary supplies: medicines, pet food, animal feed, mixed supplies, farm animal services** | 4.3, 4.4 | **BELONGS TO ANOTHER PAGE.** O17 caps us at one sentence (standard-rated, no medical exemption) plus a link. The mechanics are the competitors' and stay theirs |
| 4 | Payroll and auto-enrolment pensions for practice staff | 4.3 | **DECLINE.** Payroll is deferred estate-wide to 2026-09-11 as a section on the frozen `/blog/gp-payroll-services` (`BATCH2_INDEX.md` §2) |
| 5 | Locum vets as an audience, business structure, sole trader versus limited | 4.2, 4.6 | **PARTIAL.** May be named as an audience in one or two sentences. The IR35 and structure detail belongs to the estate's contractor corpus, not here |
| 6 | IR35 for locum vets | 4.6 | **BELONGS TO ANOTHER SITE.** `contractors-ir35` is the estate host for IR35 (`C2_PLACEMENT.md` rows 30 to 32). Decline with reason |
| 7 | Tax and NI for a locum vet | 4.6 | **PARTIAL**, one sentence at most, same reason as 5 |
| 8 | Finding clients / marketing your locum business | 4.6 | **DECLINE.** Not accountancy, and off-proposition |
| 9 | Company formation and registration | 4.2, 4.6 | **DECLINE.** Generic, and 4.2 uses it as a pricing hook |
| 10 | Technology and cloud bookkeeping | 4.2 | **DECLINE.** Vendor content |
| 11 | "Practice valuations" as a service noun | 4.4, as two words with nothing behind them | **OURS, and this is the opening.** See section 5 |
| 12 | Pricing and fixed-fee packages | 4.2 | **DECLINE. `I5` hard fail.** Naming this as a decline matters because it is the most prominent thing on the joint-best-positioned readable page |
| 13 | Charity or sponsorship affiliation | 4.2 (StreetVet) | **DECLINE** |
| 14 | Insurance for locum vets | 4.6, and the 170-volume keyword | **DECLINE. `I3`**: no insurance recommendation |
| **15** | **Corporate-group consolidation of veterinary practices** | **nobody** | **OURS.** Zero of the four readable pages mention it |
| **16** | **Practice sale, goodwill, earn-out** | **nobody** beyond theme 11's two words | **OURS.** The commercial heart of the page, per framing condition 3 |
| **17** | **No NHS contract, no NHS Pension Scheme** | **nobody** | **OURS**, and one sentence each per O18. It only means anything on this site |
| **18** | **RCVS Practice Standards and practice-ownership rules** | **nobody**, RCVS is not mentioned on any of the four | **CONDITIONAL, see section 5.** Unclaimed but low-value, and it carries a live risk of implying veterinary regulatory expertise we do not have |
| 19 | *(unknown)* Hawsons' themes | 4.1 | **FETCH FAILED, HTTP 403. Themes unknown.** A stated limitation, not a decision |
| 20 | *(unknown)* Price Bailey's themes | 4.5 | **FETCH FAILED, HTTP 403. Themes unknown.** A stated limitation, not a decision |

**Twenty rows: 18 decided, 2 unknown-by-403.** Every decided row must end QA marked covered, declined-with-reason, or belongs-to-another-page (§9.9 floor 8), undecided count **0**. The two 403 rows are recorded as fetch-failed and are never counted as decided.

### 4.11 How thin the six pages actually are, as a finding

Across the **four readable** pages:

| Feature | Count |
|---|---|
| Tables | **0 of 4** |
| Worked examples with figures | **0 of 4** |
| FAQ blocks | **0 of 4** |
| Pages mentioning RCVS | **0 of 4** |
| Pages mentioning corporate consolidation | **0 of 4** |
| Pages mentioning earn-out or goodwill | **0 of 4** |
| Pages mentioning practice sale beyond a two-word service noun | **0 of 4** |
| Substantive word count of the thinnest | **~800** (4.3, ranking 5th) |
| Substantive heading count of the shallowest | **2 H2s** (4.3); **3 non-chrome H2s** (4.4) |

Three of the four readable pages are service pages of 800 to 2,100 words with no table, no example and no FAQ, and the two shallowest of them rank **4th and 5th** on the head term. The fourth readable page is a genuine 2,800-word guide, and it ranks **30th**, because it is aimed at the wrong slice.

**That is the whole opportunity, and it should be stated plainly rather than hedged: five thin service pages and one misaimed guide are holding a 1,260-volume cluster with 740 peer-winnable volume and no institutional competition anywhere in it.** The two unread pages (4.1, 4.5) are the only reason this finding is not stronger, and they are also the two most likely to be substantive, so the writer should treat the thinness read as a floor rather than a ceiling.

---

## 5. Whitespace

Tested against the reads, not assumed. Each candidate is marked with what the six competitors actually do.

### 5a. Candidate (a): corporate consolidation, practice sale, goodwill and earn-out. **GENUINELY UNCLAIMED. This is the page.**

**Competitor coverage: zero of four readable pages.** The high-water mark in the entire readable set is the two-word service noun "practice valuations" in RMT's bulleted list (4.4), with no content behind it. Nobody explains what a corporate group actually buys, how the consideration is usually structured, what an earn-out does to the seller's tax position and cash timing, or what a vet who has just been approached should establish before responding.

This is also the candidate with the strongest **legitimate** overlap with our existing corpus, which matters because framing condition 1 requires the page to be sold on practice-ownership economics. The site already carries `/blog/selling-private-medical-practice-cgt-badr` and `/blog/incorporation-relief-private-medical-practice-s162` (both verified present). The transaction shape is the same; the buyer is not. **O16 governs how that is used: one sentence and a link for the shared shape, and only the genuinely veterinary-specific part written out.**

**The constraint that makes this hard and must not be waived.** The consolidation claim is a market fact, and section 1b bans veterinary-specific figures the house-positions file does not carry. So the page may describe the **structure** (corporate buyers, goodwill, earn-out, deferred consideration, tax on the seller) from the general UK tax law it already owns, and it may say the market has consolidated, but it may **not** state a market-share percentage, a number of practices acquired, a goodwill multiple or a named acquirer unless that figure is verified at primary source and named in 7.5. F6 and I6 make an unsourced figure a hard fail. See 7.5.

### 5b. Candidate (b): the three contrasts. **SPLIT. Two unclaimed, one already held by the competitors.**

| Contrast | Competitor coverage | Verdict |
|---|---|---|
| **No NHS contract** | 0 of 4 mention NHS at all | **UNCLAIMED and ours.** It is only a meaningful sentence on a site whose other 130 pages assume an NHS contract |
| **No NHS Pension Scheme** | 0 of 4. 4.3 mentions pensions only as staff auto-enrolment | **UNCLAIMED and ours**, and O18 caps it at one sentence plus a link to `/nhs-pension` |
| **Standard-rated VAT, no medical exemption** | **CLAIMED. 4.3 and 4.4 both cover veterinary VAT**, and in more practice-level detail than we are permitted to go: medicines, pet food, animal feed, mixed supplies, farm animal services | **CEDED.** O17 caps us at one sentence plus a link regardless, so the ownership map and the market agree. The **contrast framing** ("no medical exemption") is still ours, because only this site has 130 pages of exempt-supply context for it to contrast against |

Framing condition 2 requires all three to be named early and in the page's own voice. That is compatible with O17: naming a contrast in one sentence is not explaining an exemption.

### 5c. Candidate (c): RCVS Practice Standards and practice-ownership rules. **UNCLAIMED, and recommended as a light touch rather than a section.**

**Competitor coverage: zero of four readable pages mention RCVS at all**, which is a genuine surprise given every one of them is selling to RCVS-registered practices.

Two reasons not to treat an empty field as an opportunity:

1. `C1_REGULATORY.md` row 21 is CLEAR precisely because **RCVS bites the client, not us**. RCVS Practice Standards is a clinical and premises accreditation scheme. Writing a section on it is writing about the reader's professional regulation, which is the exact thing framing condition 1 forbids: "never on veterinary clinical understanding. We do not have veterinary clinical understanding and must not imply it."
2. The **practice-ownership** half is different and is legitimately ours, because it is a business-structure fact rather than a clinical one, and it connects directly to 5a: who may own a veterinary practice bears on who may buy one.

**Recommendation.** Name RCVS once, as the client-side regulator, in the context of what a buyer or seller has to keep in place through a transaction. Do not build a Practice Standards section. Any RCVS rule stated must be verified at source per 7.5, because `house_positions.md` carries no RCVS position of any kind.

### 5d. The whitespace nobody has, that this site is uniquely placed to take

Not on the brief's candidate list, and it falls out of 4.11. **Zero of the four readable pages carries a table, a worked example with figures, or an FAQ block.** This exactly reproduces the finding in `language_spec_2026-08-26.md` §G, where zero of nine human-medicine competitor pages carried a worked example. The pattern is now confirmed across two disjoint competitor sets on the same domain family, which makes it a property of the niche rather than of one sample.

`G1` therefore applies: this page's topic involves a calculation (disposal proceeds, goodwill, an earn-out spread over years), so it carries **exactly one** worked example, `G3`-shaped, `G6`-labelled (never the words "Worked example"), and every rate in it traced to `house_positions.md`, which for a UK business disposal means the estate's verified positions rather than any veterinary-specific number. See 7.4.

---

## 6. Our current position

**We have nothing. This is not "thin coverage", it is zero.**

Verified read-only against `Medical/web/content/` on 2026-08-26 at sha `77cc1bed`:

| Measure | Value | Command |
|---|---|---|
| Veterinary pages on the site | **0** | `ls Medical/web/content/blog/accountants-for-vets-veterinary-practice-tax.md` returns `No such file or directory` |
| Files containing `veterinar` | **0** | `grep -rli -E "veterinar" Medical/web/content/` |
| Files containing `\bvet\b` or `\bvets\b` | **0** | `grep -rli -E "\bvets?\b" Medical/web/content/` |
| Files containing `RCVS` | **0** | `grep -rli -E "RCVS" Medical/web/content/` |
| Of the 11 cluster keywords, present verbatim anywhere in the corpus | **0 of 11** | per-keyword `grep -rli` |
| Blog posts on the site | **79** | `ls Medical/web/content/blog/*.md \| wc -l` |
| Content markdown files in total | **82** | `find Medical/web/content -name '*.md' \| wc -l` |
| Bing site-level queries matching the veterinary family | **0 of 648** | section 2 |

**Every one of the 79 blog posts is human medicine.** The zero on all four grep patterns is the proof: not one file in the corpus contains the word "vet", "vets", "veterinary" or "RCVS" in any context. There is no partial coverage to extend, no adjacent post to link from, and no vocabulary to build on.

### What the page inherits from the existing corpus

The 130-page private-practice corpus (105 in scope per the dossier, 82 of them content markdown) gives this page **the practice-ownership shape** and nothing else. Specifically, the transactional and structural reasoning already written for human private practice transfers directly, because it is UK tax law about owning a business rather than anything about medicine:

- disposal of a practice and the capital gains treatment, `/blog/selling-private-medical-practice-cgt-badr`
- incorporating an unincorporated practice, `/blog/incorporation-relief-private-medical-practice-s162`
- partnership accounts and the partner versus employee split, `/blog/gp-partnership-tax-complete-guide`
- the general associate-versus-principal economics that runs through the corpus

All of that is **O16 territory: one sentence and a link, not a restatement.** The inheritance is a reason the page can be written credibly, not licence to copy the GP pages.

### What it must NOT inherit, and this is the V5 failure mode

`BATCH2_INDEX.md` §2b condition 2 names it exactly: "a vets page that reads like the GP pages with the nouns swapped is the failure mode". Rule **V5** is what catches it, and V5 is the conductor's job across the batch, not the writer's, because batch-level sameness is invisible from inside one page.

**Banned outright on this page, because none of it exists in veterinary practice:**

| Must not appear | Why |
|---|---|
| Anything **NHS**: contract, GMS, PMS, APMS, Global Sum, Carr-Hill, PCSE, Statement of Financial Entitlements | Veterinary practices have no NHS contract. The only permitted mention is the single contrast sentence saying so |
| Anything **NHS Pension Scheme**: tiers, Type 1 / Type 2, Forms A and B, Scheme Pays, annual allowance in its NHS-scheme sense, McCloud, annualisation, superannuation | Vets are not in the scheme at all. One sentence, then link to `/nhs-pension` (O18) |
| Anything **GMC**: registration, retention fee, revalidation | Wrong regulator entirely. Vets register with RCVS |
| **Performers List** | An NHS England construct. Meaningless here |
| **CQC** | Wrong regulator |
| **QOF**, QOF points, **Global Sum** per weighted patient | Wrong regulator and wrong contract. Additionally both carry UNVERIFIED bans (O9, O10, F5) |
| The **healthcare VAT exemption** explained | O17. One contrast sentence, then link |

The last four rows in that table are the crossover with the batch-wide UNVERIFIED bans. Neither the GMC retention fee amount nor the QOF point value belongs on a veterinary page under any circumstances, which makes the expected outcome trivially compliant, but the ban is still countable at 7.6 because it is counted across the whole batch.

---

## 7. Deterministic acceptance criteria

### 7.1 Exact phrases that must appear, **2 required**, and the reconciliation that makes it 2

Binding rule **V1** is the governing constraint on this cluster: **two word orders per idea per page. Hard cap. Six is a defect.** Idea A in section 3 is one commercial term written five ways at 110 volume each. The page may carry two of them.

**Tier A, required, 2 of 2:**

| # | Phrase | Vol | Best peer pos | Also satisfied by substring |
|---|---|---|---|---|
| 1 | **veterinary accountants** | 110 | **2** (hawsons) | `veterinary accountant` (110, pos 6) |
| 2 | **vet accountants** | 110 | **4** (gorillaaccounting) | `vet accountant` (110, pos 2) |

Placement in `metaTitle`, `h1`, an `<h2>`, an `<h3>`, an `faqs[].question`, an `faqs[].answer`, `keyTakeaways`, `summary` or body prose. Per `B3`, the two orders must sit in **distinct surfaces**: one in the H1 or an H2, the other in an FAQ question or a body sentence. Placing both inside one heading is a V1 evasion and fails.

**The substring effect is real and is stated so the ledger is honest.** Under normalised verbatim matching, "veterinary accountants" contains "veterinary accountant", and "vet accountants" contains "vet accountant". Two placements therefore satisfy **four** of the eleven rows, 440 volume, all four held by a peer inside the Google top 6. That is the maximum honest coverage available to this page and it is why section 1a recommends one page rather than five.

**Declined with reason, 7 rows, named so the ledger balances:**

| Row | Vol | Reason |
|---|---|---|
| `veterinary accounting` | 110 | **V1 cap.** The fifth order of idea A. Placing it is a third order of one idea, which the rule calls a defect rather than thoroughness. **Unplaced and reported**, per V2's instruction that an unplaceable phrasing is reported rather than forced |
| `locum veterinary` | 260 | **V6.** An adjectival fragment that will not sit as natural English in a sentence about accountancy. Zero peer-winnable, best position anywhere 47 |
| `veterinary locum insurance` | 170 | **`I3`.** Insurance recommendation is a banned regulated-activity shape. Also zero peer-winnable, best position 35 |
| `what is a locum vet` | 50 | **Off-proposition.** A career-guidance question, owned by 4.6 at position 30. Not an accountancy query |
| `global veterinary careers` | 140 | **Another company's name.** A navigational brand query for a Simpkins Edwards client (4.7). Targeting it is impossible and `I4` bans named clients regardless |
| `online vet consultation and prescription uk` | 50 | **Off-proposition.** The searcher is a pet owner seeking a consultation (4.9) |
| `the sim veterinary consultancy reviews` | 40 | **Harvest noise.** A stray navigational review query caught by a GP directory page (4.9) |

**Ledger for floor 7:** 0 already-covered + **2 assigned-and-required** (satisfying 4 rows by substring) + **7 declined-with-reason** = 4 + 7 = **11 rows**. Balances against section 3.

**Encouraged but not required:** natural-English constructions in the neighbourhood of the assigned phrases, for instance "accountants for vets" and "veterinary practice accounts", which are not in the harvest as ranked keywords and are therefore not assignable, but read naturally and match the slug. They are never a substitute for the two required placements and they do not count toward the V1 cap because they are not harvested word orders of idea A.

### 7.2 Equity preservation, **0 queries**

**Not applicable. The page does not exist.** Zero Google query rows by construction, zero Bing veterinary-family queries out of 648 site-level queries (section 2). There is no do-not-lose query and no BLOCK condition available on this page. Count required: **0 of 0.**

### 7.3 Protected elements

**None structurally.** New page, no frozen structure, no byte-identical requirement.

Build-required and therefore immutable once created: `slug` = `accountants-for-vets-veterinary-practice-tax`, `canonical`, the file path, `date`, `category`, `image`, `imageCredit` (**exactly one key**, never duplicated; a recent estate-wide fix removed duplicate `imageCredit` keys and one must not be reintroduced), `altText`, `schema`.

**Nothing else under `Medical/web/` may be edited by this page's writer.** Other agents are working concurrently in `Medical/web/content/`. Creating one file is the entire write scope. No navigation change, no hub, no persona page (framing condition 4).

### 7.4 Arithmetic that must recompute

The page carries **exactly one** worked example per `G1` (its topic involves a disposal calculation) and per section 5d (zero of four competitors has one). Every figure in it must recompute from inputs stated inline, and every rate must trace to `house_positions.md`.

| Statement | Source | Must equal |
|---|---|---|
| Business Asset Disposal Relief rate, if stated | `house_positions.md`; estate ground truth `badr_18pc_2026_ground_truth` | **18%** from 6 Apr 2026 (was 14% in 2025/26, 10% before). **Any page stating 10% or 14% as current is a BLOCK** |
| Dividend rates, if the page touches extraction from an incorporated practice | `house_positions.md`; `dividend_rates_2026_ground_truth` | **10.75% / 35.75% / 39.35%** from 6 Apr 2026 |
| Employer NIC, if staff costs are quantified | `employer_nic_15pc_2025_ground_truth` | **15%**, secondary threshold **£5,000**; LEL 2026/27 £6,708 |
| Personal allowance and the taper, if the example crosses £100,000 | `house_positions.md` §5 and §9 | £12,570, tapered above £100,000, higher rate to £125,140, additional 45% above. **O3 caps this at one sentence and a link** to batch-2 item 5 |
| VAT rate, if stated at all | standard rate | **20%**, and one sentence only per O17 |
| Business Property Relief, if the page touches succession | `br_apr_1m_cap_2026_ground_truth` | **£2.5m combined 100% cap** from 6 Apr 2026, 50% above; **never** cite the gov.uk IHT rates table for the RNRB end date, that row is known wrong |
| Any veterinary market statistic (consolidation share, practice counts, goodwill multiples) | **NOT IN `house_positions.md`** | **No figure may be stated** unless verified at primary source per 7.5 and named there. Default outcome: the page describes the structure without quantifying the market |

The worked example must be `G3`-complete (persona, inputs, arithmetic shown, result, one sentence on what changes the answer), `G4`-anonymised (role plus an initial only, explicitly illustrative), `G7`-sized (80 to 200 words), and `G6`-labelled (the heading states the question, never the words "Worked example", and the example never opens with that prefix). `G6` and `J4` are hard fails.

### 7.5 Statutes and sources to re-verify at source before publication

`house_positions.md` needs **no extension for this page**, and the corollary is that anything veterinary-specific and quantitative has to be pinned here first or left unstated.

| What | Where | Why |
|---|---|---|
| **RCVS practice-ownership and Practice Standards position**, if RCVS is named at all | rcvs.org.uk, the RCVS Code of Professional Conduct and Practice Standards Scheme pages | **`house_positions.md` carries no RCVS position of any kind.** Section 5c recommends a single client-side mention. Whatever is said must be read at source on the day. If it cannot be pinned, RCVS is named as the regulator and nothing further is asserted |
| **Any statement quantifying corporate consolidation of the UK veterinary market** | CMA veterinary services market investigation publications; Companies House filings if a specific group is discussed | **This is the highest fabrication risk on the page.** "The market has consolidated" is a describable structure; "X% of practices are corporate-owned" is a statistic and F6 and I6 make it a hard fail without a named source. If no source is pinned, the page describes the structure and states no share |
| Business Asset Disposal Relief 18% from 6 Apr 2026 | gov.uk CGT rates and allowances; `badr_18pc_2026_ground_truth` | 7.4 row 1. The rate moved twice in two years and a stale figure is the likeliest arithmetic failure on this page |
| Goodwill on incorporation and the intangibles restriction | CTA 2009 Part 8; HMRC CIRD44060 | If the page touches incorporating a practice, the related-party goodwill restriction is the trap, and it is not veterinary-specific |
| Earn-out consideration: Marren v Ingles and s.138A TCGA 1992 | TCGA 1992 s.138A; Marren v Ingles [1980] | Framing condition 3 makes earn-outs the commercial heart of the page. The earn-out right being a separate chargeable asset is the substantive point and it must be stated correctly or linked rather than asserted |
| Standard rating of veterinary services | VAT Act 1994 Sch 9 Group 7 (the health exemption, and what it does not cover) | **One sentence only** per O17. Verify that the contrast is stated accurately without explaining the exemption |
| Vets are outside the NHS Pension Scheme | NHS Pension Scheme Regulations, eligible employment | **One sentence** per O18. The point is trivially true and must still not be phrased as though vets were once eligible |

**UNVERIFIED figures, batch-wide ban, hard fail F5.** `house_positions.md` marks the **GMC annual retention fee amount**, the **Global Sum per weighted patient** and the **QOF point value** as UNVERIFIED. **This page must state no figure for any of them.** All three are human-medicine constructs that have no business on a veterinary page at all, so the expected outcome is total absence rather than careful handling. If a draft introduces one, that is simultaneously an F5 failure and a section 6 "must not inherit" failure, and it is a BLOCK on both counts.

### 7.6 The floors, and the framing conditions made countable

| Floor | Requirement on this page |
|---|---|
| 1. Arithmetic | Every figure in 7.4 correct. BADR **18%**. Any veterinary market statistic either sourced per 7.5 or absent |
| 2. Statute | Every source in 7.5 re-verified on the day of the draft |
| 3. Links | Zero broken internal links repo-wide. The O16, O17 and O18 link targets resolve. All four verified present at pack time: `/blog/gp-vat-registration`, `/blog/gp-practice-private-non-nhs-income-streams`, `/nhs-pension` (route at `Medical/web/src/app/nhs-pension/page.tsx`), plus the O16 targets `/blog/selling-private-medical-practice-cgt-badr`, `/blog/incorporation-relief-private-medical-practice-s162`, `/blog/gp-partnership-tax-complete-guide` |
| 4. Coverage | The **2** phrases in 7.1 placed verbatim, in **2 distinct surfaces**. Checker names any not placed |
| 5. Equity preservation | **0 of 0.** Not applicable, page is net-new |
| 6. Cluster coverage | Same matcher, the 7.1 input. **2 placed, 0 unplaced** |
| 7. Reconciliation balance | 0 already-covered + 2 assigned (satisfying 4 rows) + 7 declined-with-reason = **11**. Must balance |
| 8. Competitor re-read | All **18 decided** heading themes at 4.10 marked covered, declined-with-reason, or belongs-to-another-page. Undecided count **0**. The two 403 URLs (4.1, 4.5) are recorded as **fetch-failed, themes unknown**: a stated limitation, never counted as decided |

**Language-spec rules made countable on this page.** Full runsheet at `language_spec_2026-08-26.md` Part 5; these are the ones that bite hardest here.

| Rule | Count required on this page |
|---|---|
| **V1** | Idea A carries **exactly 2** word orders. A third is a defect. `veterinary accounting` must be **absent** and reported as unplaced |
| **V2** | **0** instances of narrating the keyword research. No "also searched as", no variant list, no telling the reader two searches mean the same thing |
| **V3** | O16, O17, O18 each get **at most one sentence plus a link**. Three sentences on any of them means the writer is taking another page's fact and must stop. Countable: sentence count in the paragraph containing each link |
| **V4** | This page does not restate O14 (what a healthcare accountant does). `/blog/healthcare-accountants-uk` routes here in 2 to 4 sentences and does not deliver the vet case |
| **V5** | **The batch-level sameness check is where this page is most exposed.** Any one rhetorical construction max **twice**; `"it is not X, it is Y"` max **once per page across the whole batch**. Additionally, and specific to this page: a paragraph that would read identically with "GP practice" substituted for "veterinary practice" is a V5 finding. That is the noun-swap failure mode, stated as a test |
| **V6** | Vocabulary never overrides topic. The 7 declined rows at 7.1 stay declined |
| **F5** | **0** figures for the GMC retention fee, Global Sum per weighted patient, or QOF point value. Expected outcome: all three words absent from the page entirely |
| **F6 / I6** | **0** unsourced statistics. Specifically **0** unsourced veterinary market-share or consolidation percentages |
| **I1** | **0** em-dashes in any user-facing field including frontmatter, metaTitle, metaDescription, alt text, headings, tables and FAQ answers |
| **I2** | **0** named experts, bylines or credentials |
| **I4** | **0** named clients. Note 4.7: the cluster's third-best peer-winnable keyword *is* a competitor's client's company name |
| **I5** | **0** prices. The joint-best-positioned readable competitor (4.2) leads on price; we decline it |
| **G1 / G6 / J4** | **Exactly 1** worked example. The words "Worked example" appear **0** times as a heading or line-initial prefix |
| **L4** | **At least 1** table, with a caption stating its effective date per F1 |
| **B4** | 50% to 75% of H2s question-form. **B6**: 6 to 14 H2s |
| **L1** | 900 to 1,600 words. This is a coverage page, not a hub. `L3`: word count is not a lever, do not pad |

**The five framing conditions, as pass/fail tests:**

| Condition | Test |
|---|---|
| 1. Business not profession | **0** claims of veterinary clinical understanding. **0** paragraphs whose subject is animal treatment, species, or clinical practice. The page's subject is a business that a vet owns |
| 2. Names the differences early | All three of "no NHS contract", "no NHS Pension Scheme", "standard-rated VAT with no medical exemption" appear **before the second H2**, in the page's own voice. Each in **one sentence** (O17, O18) |
| 3. Consolidation is the substance | Practice sale, goodwill and earn-out occupy the **largest** body section, and the single worked example demonstrates a disposal or earn-out calculation |
| 4. No prominence | **0** new navigation entries, **0** persona hubs, **0** files created outside `Medical/web/content/blog/accountants-for-vets-veterinary-practice-tax.md`. Inbound path is `/blog/healthcare-accountants-uk` only |
| 5. Portability preserved | The page carries **0** dependencies that would break if the file were moved to `generalist`: no medical-site-only component, no shared include, no reliance on a medical persona page. Nothing but internal links, which are a find-and-replace on a port. Measured at 90 days per section 8 |

### 7.7 Named factual requirements

1. The three contrasts must be stated as **facts about the profession**, not as sales points, and each in one sentence. Expanding the VAT contrast into an explanation of the healthcare exemption is an **O17 BLOCK**.
2. **No statement may imply we advise on veterinary regulation or clinical practice.** `I3` plus framing condition 1.
3. **No introduction of an individual, sole trader or small partnership to a lender or broker** (C1 standing constraint 4, RAO art 36A). A page discussing buying or financing a practice must not become a finance-introduction route for a sole-trader vet. Company and LLP borrowers only, and the safest outcome on a blog page is that no finance introduction is offered at all.
4. **No contingent-fee or refund-shaped proposition** (C1 standing constraint 2). Not a natural risk on this topic, but it is a standing constraint.
5. BADR at **18%** if stated. A stale 10% or 14% is a BLOCK.
6. The consolidation claim is **structural unless sourced.** If no CMA or Companies House figure is pinned per 7.5, the page says the market has consolidated and describes what a corporate buyer does, and states **no** share, count or multiple.
7. If the earn-out point is made, the separate-chargeable-asset treatment (s.138A TCGA 1992 / *Marren v Ingles*) must be stated correctly or linked rather than asserted.

---

## 8. Stated expectation

Written before the work, so the later read has something to fail.

### 8a. Sizing, restated as the commitment being made

**One page.** The niche map said "cluster 3-5" and 120/mo; the harvest gives 11 deduplicated keywords, 1,260 total volume, 740 peer-winnable, and one commercial term written five ways. After V1, **2 required phrases covering 4 keyword rows and 440 volume**. Three to five pages on that is a page per keyword and `REWRITE_PROGRAM.md` §9.3 forbids it.

**Widening is deferred until there is measured demand**, and the trigger is named rather than left to judgement: widening is reconsidered only if, at 90 days, Bing named queries on this URL include **five or more distinct veterinary phrasings that the single page does not satisfy**. Repeating the 120/mo sizing estimate is not evidence and does not reopen it.

### 8b. The measurement reality

Google indexes roughly **21 of 130 URLs** on this site, driven by low domain authority rather than any technical defect. Bing indexes it fully and sends **3.4x** the Google clicks. Baseline on this cluster is zero on both engines (section 2: 648 Bing site-level queries, 0 veterinary matches; Google equity nil because the page does not exist).

### 8c. Bing, 14 days after deploy

**Test: does the page exist in the index and does it match anything.**

Target: **at least 1 Bing impression** on a phrase named in section 7.1, that is on `veterinary accountants` or `vet accountants` or a normalised substring of either.

This is deliberately the batch's floor rather than a stretch. `BATCH2_INDEX.md` §8 sets the batch target at 5 of 7 pages registering an impression at 14 days and states that two net-new pages failing to surface in fourteen days on a low-authority domain is normal. **This is the smallest cluster in the batch at 1,260 volume, so it is one of the two most likely to be among that pair.** A miss at 14 days is recorded, not acted on.

### 8d. Bing, 28 days

**Test: phrase coverage, not total traffic.**

| Target | Value |
|---|---|
| Bing impressions on this URL | **at least 5** |
| Distinct Bing named queries on this URL | **at least 2** |
| Of those, containing "vet" or "veterinar" | **at least 2**, that is all of them |
| Bing clicks | **no target is set** |

**No click target, and that is the honest position rather than a hedge.** The whole cluster is 1,260 volume across 11 keywords, of which 440 is addressable. A UK-wide 110-volume head term yields roughly 3 to 4 searches a day. A brand-new page on a low-authority domain landing anywhere in the first two Bing pages produces impressions in the single digits and, at that volume, most likely zero clicks in 28 days. **Setting a click target here would be inventing a number.** The 28-day verdict is impressions and phrase match; the first click is a 90-day question at the earliest.

Per §9.6 point 2: **total traffic rising while the two named phrases stay absent from the query set is a FAIL, not a pass**, and is recorded as drift.

### 8e. Google, 28 to 90 days

**No expectation is set, deliberately.** On a corpus where Google indexes 16% of URLs, a new page not being indexed at 28 days carries no information. Record the outcome either way; do not treat a miss as a failure.

One observation is worth recording if it happens: this is the only batch-2 cluster with **no institutional layer at all**. Every position in it is held by a §2a peer, and five of the six pages holding it are thin service pages. If this site's domain authority is ever going to let a page reach a Google top 10, a cluster with no gov.uk, no NHS and no BMA in it is where.

### 8f. Failure trigger, written as a number, before the work

There is no equity to lose, so there is **no revert trigger on an existing page**. Per `BATCH2_INDEX.md` §8, the failure condition for a net-new page is a quality one:

> If the batch-level editorial QA raises a **V1, V3 or V5 finding** on this page, it is **held rather than deployed**. Revert path is deletion of a single new file: `git rm Medical/web/content/blog/accountants-for-vets-veterinary-practice-tax.md`.

V5 is the likeliest of the three to fire here, because the noun-swap failure mode is specific to this page and the test for it is at 7.6.

### 8g. BRAND-RISK READ AT 90 DAYS. Required by framing condition 5.

This is the condition on which the whole ABSORB ruling rests, so it is a scheduled read with a named verdict, not a vague intention.

**The question at 90 days: is the page pulling non-healthcare traffic, or muddying the medical brand's query set?**

**How it is measured**, with the command:

```python
from optimisation_engine.clients.bing_query_client import BingWebmasterClient
c = BingWebmasterClient()
site = c.get_query_stats('https://www.medicalaccounts.co.uk')          # site-level query set
page = c.get_page_query_stats('https://www.medicalaccounts.co.uk',
        '/blog/accountants-for-vets-veterinary-practice-tax')          # this URL only
```

| Signal | ACCEPT | ACTION |
|---|---|---|
| Share of this URL's named queries that are accountancy-intent | **>= 60%** | below 60%, that is the page pulling pet-owner and clinical-career traffic |
| Veterinary-family queries as a share of the **site-level** 648-query set | **< 5%** | at or above 5%, the veterinary family is displacing human-medicine vocabulary in the site's query profile |
| Non-accountancy veterinary queries at site level (clinical, pet-owner, career) | **0** | any is a signal the page is attracting the wrong audience to the whole domain |
| Any measurable decline in named queries on the human-medicine clusters attributable to this page | **none** | any, and per standard terms this must be segmented by intervention date before it is concluded, never read off an all-time aggregate |

**The reversible move, named in advance so nobody has to invent one under pressure.** If the ACTION column fires, **port the single page to `generalist`**, which `C2_PLACEMENT.md` §5 row 1 names as the runner-up host for niche-map row 21. The move is: create the file under the generalist content directory, delete it from `Medical/web/content/blog/`, redirect or drop per the estate's standing rule that pages are never collapsed, and rewrite the internal links. **7.6 condition 5 exists to keep that a find-and-replace rather than a rebuild**, by requiring the page to carry no medical-site-only dependency.

**One page is a cheap thing to move, and that is the reason for building it as one page.** Five pages would not be cheap to move, which is a second and independent argument for the sizing recommendation in 8a.

### 8h. Tracker fields, if and when the owner triggers registration

Reuse, do not build. One `monitored_pages` row with the section 2 baseline (Bing 0 named queries, Google 0). `blog_optimizations.target_keywords` populated from **the 2 phrases in 7.1**, not from the 11-row harvest set and not from whatever the page later ranks for.

**No monitor, alert, cron or scheduled job is created by this pack.** Reading the tracker is a pull. Registration is a separate owner-triggered step and has not been done. The 90-day brand read at 8g is a **read the owner or a later agent performs**, not a job this pack schedules.

---

## Corrections and deltas

1. **`BATCH2_INDEX.md` §2b overstates its own count by one.** Its prose says "**Four** of the six sit inside the firm's own healthcare or medical division"; the table immediately below it lists **three** (hawsons, r-m-t, pricebailey), and three is correct. The accurate finding, which is still decisive, is at 4.8: **three of six sit inside a human-healthcare division and hold positions 2, 4 and 9, including the joint-best position in the cluster.** The task brief's phrasing ("three of the four best-positioned") is also loose: on strict position ordering the four best-positioned pages are hawsons (2), gorilla-locum (2), r-m-t (4) and lanop (5), of which two are healthcare-division hosted, with pricebailey fifth at 9. **The ruling stands on either count. The prose should be corrected to match the table.**

2. **The `allied_health` discovery lane conflates two unrelated things.** `sites/medical.discovery.json`'s `allied_health` lane is cited by the dossier (§4 rows 9 and 10, and the language spec §2c note) as covering both pharmacist and veterinary terms. Those are different professions with different regulators, different VAT treatment and different estate hosts: pharmacies has a live 36-page site and rows 18 and 19 of `C2_PLACEMENT.md` assign pharmacist terms there, not to medical. Recorded as a lane-definition delta, not folded in.

3. **The cluster dossier §4 row 10 undercounts the cluster and the difference is explained.** The dossier gives "veterinary accountants, 4 domains, 550 volume, 550 peer-winnable". This pack's regex gives **11 keywords, 1,260 volume, 740 peer-winnable, 6 peer top-10, across 6 domains**. The dossier's row is the tight commercial-term slice (idea A in section 3: five word orders at 110 each = 550, all peer-winnable). This pack's wider regex additionally catches the locum family (480, zero peer-winnable), two navigational brand queries (180) and one consumer clinical query (50). **Both are correct measures of different things.** The dossier's 550 is the better measure of what the page can target; this pack's 1,260 is the better measure of the SERP. Stated, not harmonised, consistent with `BATCH2_INDEX.md` §9 limitation 1.

4. **Two harvest URLs surfaced that the batch index's six-page list does not name**, both peer-held and both noise: `hawsons.co.uk/large-majority-of-vet-consultation-can-be-carried-out-remotely/` (position 17 on a pet-owner telemedicine query) and `practiceindex.co.uk/gp/graham-sibbald` (position 29 on a stray consultancy-review query). Recorded at 4.9 so no in-harvest URL is silently dropped. Neither changes any count in section 3.

5. **The niche map's 120/mo for row 21 cannot be reconciled with any slice of the harvest.** The commercial term alone is 550; the whole cluster is 1,260; the addressable-after-V1 figure is 440. None of them is 120. The estimate appears to predate the harvest and should not be carried into any later sizing decision for this row. Recorded as a delta against `C2_PLACEMENT.md`, not corrected in place.

6. **Two of the six competitor pages could not be read, and both are among the three healthcare-division-hosted ones.** Hawsons (position 2, known 403, recorded in `house_positions.md` and `BATCH2_INDEX.md` §9) and Price Bailey (position 9, 403, consistent with its 403 on the McCloud teardown). The thinness finding at 4.11 therefore rests on four pages, and it is a **floor**: the two unread pages are the two most likely to carry substantive practice-sale material. A human read of either would sharpen section 5a materially and is the cheapest available extension to this pack. **Not authorised by this task and not attempted beyond the automated fetch.**
