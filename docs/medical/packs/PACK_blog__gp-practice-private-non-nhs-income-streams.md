# §9.5 RESEARCH PACK: /blog/gp-practice-private-non-nhs-income-streams

**Built** 2026-08-26. **Site** medicalaccounts.co.uk (`medical`). **Spec** `docs/_engines/REWRITE_PROGRAM.md` §9.2 to §9.5, §9.9, §9.10.
**Frozen scope input** `docs/medical/cluster_dossier_2026-08-26.md` (dossier freeze, §12). **Ground truth** `docs/medical/house_positions.md`, governing sections **§6 (VAT for medical professionals)** and **§6.A (dispensing-practice drug VAT, HP-lock gate, Wave 2 C1)**.
**Peer classification** `docs/medical/competitor_universe_2026-08-26.md`. **Lanes** `sites/medical.discovery.json`.

This is preparation, not page content. Nothing under `Medical/web/` was edited. No commit, no deploy, no `monitored_pages` write, no monitor or alert created.

---

## 1. Target and permission level

| | |
|---|---|
| Page URL | `/blog/gp-practice-private-non-nhs-income-streams` |
| Cluster / topic | `vat on private healthcare` (dossier §3, topics-with-a-page table: 4 domains, 1,460 volume, 760 peer-winnable, 18 kws, 15 of 18 phrasings missing, equity "none") |
| Lane | `nhs_practice_income` by slug tokens, but the governing content lane is **`vat_medical` (lane 10 of 15)**, described in `competitor_universe_2026-08-26.md` §3 as "**the clearest ownable hole in the taxonomy**": real Bing demand, near-zero coverage on our side, no visible competitor page |
| Grade | **REFRAME** (dossier §3) |
| Source file | `Medical/web/content/blog/gp-practice-private-non-nhs-income-streams.md` |
| **How it renders** | **Markdown file with YAML frontmatter.** The writer edits **one `.md` file**. Body is **raw HTML inside the markdown body**, not markdown syntax (see `blog_page_rendering_html_in_frontmatter`): `<p>`, `<h2>`, `<h3>`, `<ul>`, `<li>`, `<strong>` are written literally. `metaTitle`, `h1`, `keyTakeaways`, `summary` and the **14-entry `faqs:` array** are **frontmatter keys**, not body content, and the FAQ block is authored in that array, not as HTML in the body. |
| Current sha | `b3d78c97e768645cca480dd350281ffa68c1faf9` (`git rev-parse HEAD`, 2026-08-26) |
| Revert path | `git checkout b3d78c97e768645cca480dd350281ffa68c1faf9 -- Medical/web/content/blog/gp-practice-private-non-nhs-income-streams.md` |

### Constraint first

**REFRAME = full rewrite permitted** against the topic keyword set in section 3: `metaTitle`, `h1`, H2s, body and `faqs` may all change. The equity register in section 2 still binds, but **this page has zero measured equity on both engines**, so the equity gate has nothing to protect and the permission here is genuinely wide. That is the *only* page of the three in this batch where that is true.

**What may NOT change:** `slug`, `canonical`, `category`, the file path. Never propose a collapse, a redirect or a URL change (§5 working agreement).

**Ground-truth constraint that overrides the wide permission.** This page is governed by `house_positions.md` **§6** and **§6.A**. §6.A is an **HP-lock gate** item (locked at the Wave 2 C1 gate). Its central instruction is a negative one: *do NOT call dispensed NHS prescription drugs "exempt"*, because that loses the input-VAT recovery. The current page links to the dispensing guide but does not state the position, which is safe today and becomes unsafe the moment the writer expands the dispensing sentence. See section 7, criterion D.

### Frozen-list position

Batch 1 excludes the **16 pages with an armed `monitored_pages` window to 2026-09-10** and treats the **3 `status='flagged'` rows** as HOLD (dossier §6). **This page is on neither list**, so it is workable now.

**But its nearest sibling is frozen.** `/blog/gp-vat-registration` is on the 16-page frozen list. This page currently hands the registration and partial-exemption mechanics to that page in three separate places. Those handoffs stay; nothing may be pushed onto `gp-vat-registration` before 2026-09-10, and nothing may be pulled off it either. See section 7, criterion F.

---

## 2. Equity register (copied VERBATIM from the data sheet)

Google, GSC API `searchanalytics.query` dimensions ['page','query'], window 2026-05-28 to 2026-08-26 (90d), property from `sites` config, script `equity_pull.py`.

Google query-level rows for this URL: **0** (impressions 0, clicks 0).
No query-level Google rows. GSC anonymises low-volume queries, so page-level Google impressions can be non-zero while the query breakdown is empty. Check the page-level figure in `gsc_page_rows.json` before concluding zero Google demand.

Bing, `GetPageQueryStats(siteUrl=https://www.medicalaccounts.co.uk, page=/blog/gp-practice-private-non-nhs-income-streams)`, pulled 2026-08-26 via `BingWebmasterClient.get_page_query_stats`. Rows aggregated across the returned date series.

Bing named queries for this URL: **0** | impressions 0 | clicks 0.

**Every query in the table above is a DO-NOT-LOSE query. Any one that stops matching after the change is a named BLOCK.**

### Reading of the equity register (pack author's note, not data sheet content)

The table is empty on both engines. **The DO-NOT-LOSE set is the empty set and §9.9 floor 5 passes vacuously.** That is a real finding, not a data failure: the page was published **2026-06-03**, is under three months old, and has never earned an impression on either engine.

There is a second, sharper reading available and the writer should have it. The site-level Bing data in `competitor_universe_2026-08-26.md` §3, lane 10, shows the demand this page should be catching and is not:

- `has doctors table3 vat exemption been updated since may 2007`, **2 clicks, the joint-top Bing click query on the whole site**
- `gp vat exemption letter`, **2 clicks**
- `vat exempt gp`
- `general practice application of vat number`

Those queries are landing somewhere on this site and not on this page. **The single most valuable sentence this rewrite can add is a direct answer to the first one**, because it is a top-clicking query for the whole domain, it is unambiguously about the HMRC liability table for doctors, and it names the exact date this page already cites (1 May 2007). See section 5, W1.

---

## 3. The market's keyword set (copied VERBATIM from the data sheet)

Source: `dataforseo_competitor_data`, site_key='medical', date_pulled='2026-08-26' (32,872 rows, 27 domains, no volume floor). Selection regex for this topic:

```
vat.*(private )?(healthcare|health care|medical|doctor|gp|surgery|cosmetic|medico)|(healthcare|medical|doctors).*vat|medical services vat|vat exemption.*(medical|health)
```

Keywords in topic: **38** | combined volume **6,590** | peer-winnable volume **710** (best position <=10 held by a domain that is not gov.uk / bma.org.uk / *.nhs.uk / MSE / Which) | domains contributing: 9
| **Absent verbatim from this page: 38 of 38. Absent from the whole 105-page corpus: 36.**

Ordered by volume. `On page` = phrase appears verbatim (case and punctuation normalised) in this page's source file. Peer-winnable ORDERS the work, it never excludes any row (owner decision 21, 2026-08-26).

| Vol | Best pos | Held by | Peer-winnable | On page | Anywhere in corpus | Keyword |
|---|---|---|---|---|---|---|
| 2400 | 13 | practiceindex.co.uk | no | **no** | no | observatory medical practice |
| 320 | 14 | practiceindex.co.uk | no | **no** | no | observatory medical practice oxford |
| 210 | 36 | hawsons.co.uk | no | **no** | no | advantages of private health care |
| 210 | 30 | hawsons.co.uk | no | **no** | no | benefit of private health care |
| 210 | 39 | hawsons.co.uk | no | **no** | no | benefits of private healthcare |
| 210 | 31 | hawsons.co.uk | no | **no** | no | benefits of private medical insurance |
| 210 | 44 | hawsons.co.uk | no | **no** | no | private healthcare advantages |
| 210 | 43 | hawsons.co.uk | no | **no** | no | private healthcare benefits |
| 210 | 15 | pricebailey.co.uk | no | **no** | no | private healthcare vat |
| 210 | 28 | hawsons.co.uk | no | **no** | no | private medical insurance benefits |
| 210 | 18 | pricebailey.co.uk | no | **no** | no | vat on private healthcare |
| 170 | 65 | hawsons.co.uk | no | **no** | no | advantages of private healthcare |
| 170 | 39 | hawsons.co.uk | no | **no** | no | private health care benefits |
| 90 | 20 | medicsmoney.co.uk | no | **no** | no | private gp salary uk |
| 90 | 48 | hawsons.co.uk | no | **no** | no | private medical insurance for employees |
| 70 | 30 | hawsons.co.uk | no | **no** | no | benefits of private medical insurance uk |
| 70 | 9 | pricebailey.co.uk | yes | **no** | no | healthcare vat |
| 70 | 86 | taxqube.co.uk | no | **no** | no | is private health care tax deductible |
| 70 | 74 | taxqube.co.uk | no | **no** | no | is private healthcare tax deductible |
| 70 | 79 | taxqube.co.uk | no | **no** | no | is private medical insurance tax deductible uk |
| 70 | 18 | pricebailey.co.uk | no | **no** | no | is there vat on private healthcare |
| 70 | 9 | pricebailey.co.uk | yes | **no** | no | medical exemption vat |
| 70 | 10 | pricebailey.co.uk | yes | **no** | yes | medical vat exemption |
| 70 | 25 | medicsmoney.co.uk | no | **no** | no | private gp salary |
| 70 | 54 | hawsons.co.uk | no | **no** | no | private health care for businesses |
| 70 | 98 | medicsmoney.co.uk | no | **no** | no | private healthcare business |
| 70 | 10 | pricebailey.co.uk | yes | **no** | no | vat exemption medical |
| 70 | 9 | pricebailey.co.uk | yes | **no** | no | vat healthcare |
| 70 | 9 | pricebailey.co.uk | yes | **no** | no | vat in healthcare |
| 70 | 9 | pricebailey.co.uk | yes | **no** | yes | vat medical exemption |
| 70 | 7 | pricebailey.co.uk | yes | **no** | no | vat on healthcare |
| 50 | 7 | pricebailey.co.uk | yes | **no** | no | medical services vat |
| 50 | 45 | hawsons.co.uk | no | **no** | no | private health care for employees |
| 50 | 40 | hawsons.co.uk | no | **no** | no | private healthcare for employees |
| 50 | 6 | pricebailey.co.uk | yes | **no** | no | vat medical services |
| 50 | 6 | pricebailey.co.uk | yes | **no** | no | vat on medical services |
| 50 | 16 | pricebailey.co.uk | no | **no** | no | vat on private healthcare uk |
| 40 | 81 | taxqube.co.uk | no | **no** | no | private medical insurance tax |

### 3a. What is actually addressable here, and what the 6,590 headline hides

**The combined volume of 6,590 overstates the addressable prize by about five times.** The 38 rows are four unrelated families that the regex fused. Every row is accounted for once and the four sub-totals reconcile to 38 rows / 6,590 volume.

| # | Sub-family | Domain holding it | Rows | Volume | Verdict for THIS page |
|---|---|---|---|---|---|
| 1 | **VAT on medical / healthcare services** | pricebailey.co.uk (all 15) | 15 | **1,250** | **YES. This is the page.** All 10 peer-winnable rows are here |
| 2 | Private medical insurance as an employee benefit | hawsons.co.uk | 14 | 2,140 | **NO. Off-topic and off-niche** |
| 3 | Brand / navigational: an Oxford GP surgery | practiceindex.co.uk | 2 | 2,720 | **NO. Brand noise** |
| 4 | Is private healthcare tax deductible / private GP salary | taxqube.co.uk (4), medicsmoney.co.uk (3) | 7 | 480 | **NO. Two of these are lane-negative** |
| | **Total** | | **38** | **6,590** | balances to the data sheet header |

**Family 1 is the work.** 15 rows, 1,250 volume, **710 of it peer-winnable**, all held by pricebailey.co.uk at positions 6 to 18. pricebailey is classified in `competitor_universe_2026-08-26.md` §2a as peer rank 5, "national top-30 firm with a healthcare sector hub. **Borderline peer: winnable on long-tail specialism, not on brand**". That is exactly the shape of this fight: we do not beat Price Bailey on `vat on healthcare`, we beat them on `vat on private GP medicals and reports`. The 10 peer-winnable rows are the ordering, per owner decision 21.

**Family 2 must be declined explicitly, not silently.** The 14 hawsons rows (`benefits of private medical insurance`, `private healthcare advantages`, `private medical insurance for employees`, and so on, 2,140 volume) are about **buying PMI as an employee benefit**. They are a broker/benefits topic, not a VAT topic and not a GP-practice-income topic. Hawsons ranks them at positions 28 to 65, which is what a mid-tier generalist's sector hub does with a benefits article. Writing to them would turn a GP practice-management page into a health-insurance page. Declined with reason.

**Family 3 is pure noise.** `observatory medical practice` (2,400) and `observatory medical practice oxford` (320) are **navigational searches for a named GP surgery in Oxford**. The URL holding them is a **PDF job-information pack on practiceindex's job board** (see teardown 4.9). 2,720 of the topic's 6,590 volume, 41% of the headline, is somebody looking for a surgery's website. The dossier's own §8 screens exactly this class as `brand | navigational`; these two rows slipped the screen because the regex matched "medical" adjacent to nothing VAT-related. Declined with reason and flagged as a correction.

**Family 4 splits.** `is private health care tax deductible` / `is private healthcare tax deductible` / `is private medical insurance tax deductible uk` / `private medical insurance tax` (4 rows, 250) are a **benefit-in-kind** question, adjacent but not this page: the answer lives with employer-provided PMI and P11D, which is neither VAT nor GP practice income. `private gp salary uk` / `private gp salary` (2 rows, 160) are **vetoed by `lane_negative_tokens`**: the pay-comparison group bans `gp-salary` outright (`competitor_universe_2026-08-26.md` §3a) precisely to keep salary-benchmark intent out of this site. `private healthcare business` (70) is generic. All 7 declined.

**Net addressable: 15 rows, 1,250 volume, 710 peer-winnable.** Every acceptance criterion in section 7 is scoped to those 15 rows plus the two site-level Bing queries named in section 2.

**Note the two `Anywhere in corpus = yes` rows.** `medical vat exemption` and `vat medical exemption` already appear somewhere in the 105-page corpus but **not on this page**. Before writing them here, the writer must find where they already sit (almost certainly `/blog/gp-vat-registration`, which is FROZEN) and confirm this page's use is a different intent. That is a live cannibalisation check, not a formality: dossier §7 exists because this site already has three-namespace collisions.

---

## 4. Competitor teardown

**No cap applied.** The data sheet lists 10 competitor URLs and the brief's cap is 12, so **all 10 were attempted**. **8 fetched, 2 returned HTTP 403 and are recorded as flagged gaps.**

Peer classification per `competitor_universe_2026-08-26.md`: **pricebailey.co.uk = peer, rank 5** (borderline, "winnable on long-tail specialism, not on brand"). **hawsons.co.uk = peer, rank 14**. **nicholsmedical.co.uk = peer, rank 10**. **kudosaccounting.co.uk = peer, rank 3**. **taxqube.co.uk = peer, rank 18**. **r-m-t.co.uk = peer, rank 9**. **medicsmoney.co.uk = peer, rank 1**. **practiceindex.co.uk = peer, rank 6** (publisher/directory). **sandisoneasson.co.uk = peer, rank 7** (AISMA member, "ranks on authority, not volume"). No unwinnable-authority domain appears in this topic's competitor set at all, which is itself the finding: **the BMA does not hold this ground.**

### 4.1 pricebailey.co.uk/blog/vat-and-doctors/, 15 in-topic kws, PEER, **FETCH FAILED, HTTP 403**

**FLAGGED GAP.** Two attempts on 2026-08-26, both `HTTP 403 Forbidden` (with and without the trailing slash; the response body was not retrieved). Not dropped, and not substituted with a guess (§9.10: "Domains that block crawling are recorded as keyword-data-only, with the limitation stated. Never substitute a guess.").

**Why this is the most consequential failure in the batch.** This single URL holds **all 15 rows of family 1 and all 10 peer-winnable rows**, at positions 6 to 18. It is the page we are trying to beat, and we could not read it. What we know from the keyword data alone: it is titled around "VAT and doctors", it ranks for the exempt/standard-rated vocabulary in both word orders (`vat medical exemption` and `medical vat exemption`, `vat on healthcare` and `healthcare vat`), and its best positions (6 and 7) are on `vat medical services`, `vat on medical services` and `medical services vat`, the **services** framing, not the **exemption** framing.

**Consequence for the writer, stated as an instruction:** the coverage checklist in 4.10 is built from the eight pages that did fetch, so it is **known to be incomplete on the one page that matters most**. Treat 4.10 as a floor. **Recommended, and cheap: a human opens `https://www.pricebailey.co.uk/blog/vat-and-doctors/` in a browser before the writer starts and appends its heading list to this pack as a delta.** A 403 to an automated fetch is not a 403 to a person.

### 4.2 hawsons.co.uk/benefits-of-private-medical-insurance/, 14 kws, PEER, **FETCH FAILED, HTTP 403**

**FLAGGED GAP.** One attempt, `HTTP 403 Forbidden`. Recorded, not dropped.

**Materiality: low.** This is the URL behind all 14 rows of declined family 2 (private medical insurance as an employee benefit, 2,140 volume). Since the ruling in 3a declines that family in full, not reading the page changes nothing about what we write. It is recorded because §9.7 requires that every competitor page carrying a cluster keyword is either torn down or listed with its status code, and because the 403 pattern across pricebailey and hawsons is worth noting operationally: **two of the ten, both on WAF-protected corporate sites, blocked automated fetch on the same day.**

### 4.3 nicholsmedical.co.uk/news/vat-for-medical-professionals/, 11 kws, PEER

- **Title** "VAT for Medical Professionals: All you need to know - Nichols Medical Accountants" · **H1** "VAT for Medical Professionals: All you need to know"
- **Words** approx **450**. **Tables** no. **Calculator** no. **FAQ** no.
- **Headings** H4 Exempt medical work · H4 The thresholds and requirements for VAT registration · H4 Ways to maximise VAT reclamation · H4 Partial exemption techniques · H2 Need advice on this topic? · H2 Why not book a meeting to discuss?
- **Mentions** £90,000 threshold **yes** ("As of 2024, the VAT registration threshold in the UK is £90,000"). Partial exemption **yes**. VAT Notice 700/1 **no**. Sch 9 Group 7 **no**. Medico-legal reports **no**. Dispensing / zero-rated drugs **no**.
- **Judgement.** **450 words**, and it holds 11 of our 38 rows. The four content headings are **H4s with no H2 above them**, which is broken document structure that has not stopped it ranking. It covers the four obvious beats at one paragraph each and stops. What it gets wrong by omission is everything that matters: **no medico-legal carve-out, no cosmetic carve-out, no statutory hook, no purpose test**. A GP reading it would conclude all medical work is exempt, which is precisely the error `house_positions.md` §6 forbids us from making ("Do NOT say 'all medical income is exempt' without the cosmetic / medico-legal carve-out"). **The clearest evidence in this teardown that the vocabulary, not the depth, is the lever.**

### 4.4 kudosaccounting.co.uk/navigating-vat-for-medical-professionals-key-insights-and-practical-tips/, 4 kws, PEER

- **Title** "Navigating VAT for Medical Professionals: Key Insights and Practical Tips - Kudos Accounting" · **H1** same
- **Words** approx 850. **Tables** no. **Calculator** no. **FAQ** no formal block (one Q&A-shaped H2 with three H3s).
- **Headings** H3 Understanding VAT Exemptions for Medical Services · H3 VAT Registration Thresholds and Requirements · H3 Maximising VAT Reclamation · H3 Partial Exemption Techniques · H2 VAT for Doctors: Common Questions and Answers (H3 Can Practices Reclaim VAT? / What Does VAT Registration Entail? / Handling Partial Exemption) · H2 Benefits and Drawbacks of VAT Registration (H3 Benefits / H3 Drawbacks) · H2 VAT and Primary Care Networks (PCNs) · H2 Conclusion
- **Mentions** £90,000 **yes**. Partial exemption **yes, extensively**. Medico-legal **yes** (as taxable supplies). Dispensing / private prescriptions **yes**. VAT Notice 700/1 **no**. Sch 9 Group 7 **no**.
- **Judgement.** Structurally the same four beats as 4.3, in the same order, at twice the length, and then it adds two things nobody else has: **"Benefits and Drawbacks of VAT Registration"** and **"VAT and Primary Care Networks (PCNs)"**. The PCN heading is the interesting one. PCN and ARRS money moving between practices is a genuine, current, unanswered VAT question for GP practices and it maps to our own lane 8 (`nhs_practice_income`, which explicitly holds PCN and ARRS). **Kudos is described in the universe as "the nearest structural twin to our own `gp-accountant-<city>` set", and here it is again finding the same gap we should have found.**

### 4.5 taxqube.co.uk/tax-relief-for-nhs-medical-professionals/, 4 kws, PEER

- **Title** "Tax Relief for NHS Medical Professionals | Chartered Accountants London" · **H1** "Tax Relief for NHS Medical Professionals"
- **Words** approx 1,200. **Tables** no. **Calculator** no. **FAQ** no.
- **Headings** H2 Tax Relief for NHS Medical Professionals · H3 What can I claim an NHS tax rebate for? · H3 What can a Nurse claim a tax rebate for? · H3 How to claim your Nurses Tax Rebate · H2 Looking for a Specialist? · H3 Our Expert Team Can Help
- **Judgement.** **Not a VAT page at all.** It is an expenses/rebate page that has caught four rows of this topic on incidental "medical" + "tax" proximity. Recorded for completeness and to make the point that four of this topic's 38 rows are held by a page with no VAT content whatsoever, which is a second piece of evidence for the 3a ruling that the headline volume is inflated. (This URL is also in the competitor set for `/blog/nhs-pension-tax-charges-how-to-minimize`, where it is torn down as 4.3 of that pack.)

### 4.6 r-m-t.co.uk/blog/vat_changes_on_temporary_medical_staff/, 2 kws, PEER

- **Title** "VAT changes on temporary medical staff | RMT Accountants and Business Advisors Newcastle" · **H1** "VAT changes on temporary medical staff"
- **Words** approx 650. **Tables** no. **Calculator** no. **FAQ** no.
- **Headings** H2 VAT on Temporary Medical Staff: What Revenue and Customs Brief 9 (2025) Means for Healthcare Providers · H2 Revenue and Customs Brief 9 (2025) · H2 VAT exemption for medical care · H2 Opportunity to reclaim overcharged VAT · H2 Next steps
- **Judgement.** **The single most current page in the set, and it carries a development that is not in `house_positions.md`.** It reports **HMRC Revenue and Customs Brief 9 (2025), dated 15 December 2025**, on the VAT treatment of supplies of temporary medical staff: exempt where a regulated professional supplies medical care, standard-rated where an agency merely supplies staff without clinical responsibility, with a route to reclaim previously overcharged VAT. `house_positions.md` §6 cites RCB **2 (2020)** at §6.A but does not mention RCB **9 (2025)** anywhere.

  **This is a post-freeze discovery and goes on the delta list, not into the page (§9.8).** It is directly relevant to a GP practice that hires locum GPs through an agency, and it is exactly the kind of fact that, written from a competitor's summary rather than from HMRC, re-seeds an error into every citing page (§4, the root cause the deterministic-floor discipline exists for). **Do not write RCB 9 (2025) into this page from this teardown.** Raise it as a delta and let the orchestrator decide at the HP-lock review gate (`house_positions.md` preamble: "append a flag to the wave's `site_wide_flags`, do not unilaterally re-frame").

### 4.7 sandisoneasson.co.uk/news/post/you-can-t-afford-to-simply-ignore-vat, 1 kw, PEER

- **Title / H1** "You can't afford to simply ignore VAT"
- **Words** approx 1,800. **Tables** no. **Calculator** no. **FAQ** no.
- **Headings** H2 VAT registration · H2 Supplies · H2 Medico-legal work · H2 Cosmetic work · H2 Other supplies · H2 Accounting for VAT
- **Judgement.** **The best-structured VAT page in the set, and it is stale.** Six clean H2s that walk the actual decision: registration, what a supply is, then the two carve-outs by name (medico-legal, cosmetic), then the residual, then the mechanics. It states the three-part test correctly (registered status, service within scope, health-focused purpose) and it makes a point nobody else makes: **record-keeping on the patient's medical condition is what defends an exemption claim in the aesthetic sector**. That is a genuinely good, genuinely specialist point.

  **Its defect is a hard staleness error: it uses the £85,000 registration threshold.** The threshold has been **£90,000 since 1 April 2024** (`house_positions.md` §6, verified 2026-08-26 at gov.uk and the VAT Notice 700/1 supplement). Sandison Easson is an AISMA-member specialist that the universe describes as ranking "on authority, not volume" with **only 12 URLs in its sitemap**, and its flagship VAT page carries a two-year-old threshold. **That is the competitive opening in one sentence:** the best-structured medical VAT page in the niche is factually out of date, and `house_positions.md` §6 explicitly forbids us from making the same error ("Do NOT use the old £85,000 threshold for current advice").

### 4.8 medicsmoney.co.uk/gp-partner-salary-in-the-uk-what-to-expect/, 2 kws, PEER (rank 1 peer)

- **Title / H1** "GP Partner Salary in the UK: What to Expect"
- **Words** approx 1,800. **Tables** no. **Calculator** no. **FAQ** no (two email-capture forms).
- **Headings** H2 The Nuances of GP Partner Salary · H2 Factors Influencing GP Partner Salary · H2 What to Expect (General Ranges of Salary) · H2 Key Considerations Regarding Salary · H2 Seeking Professional Advice · H2 Medics Money: Your Financial Partner · H2 About the author · H2 Explore our top 10 blog posts here · H2 Working with · H3 What medical school didn't teach us about money · H3 Join the Medics' Money team...
- **VAT content:** none. It mentions "practices with significant private work outside of the NHS contract" as a factor that raises partner income, and that is the entire overlap.
- **Judgement.** Off-topic for this page and **lane-negative by rule**: `gp-salary` and `doctor-salary` are banned tokens (`competitor_universe_2026-08-26.md` §3a, pay-comparison group). Recorded for balance. Its one useful signal is negative: the strongest peer in the niche has **no** medical-VAT page at all.

### 4.9 medicsmoney.co.uk/ep-197-limited-companies-2024-masterclass/, 1 kw, PEER

- **Title** "Limited Companies for doctors 2024 - Medics Money" · **H1** same
- **Words** approx 1,200. **Tables** no. **Calculator** no. **FAQ** no. **Format: podcast episode page.**
- **Headings** H2 Limited Companies: An Overview · H2 The Pros and Cons of a Limited Company (H3 Key Features / Salary / Dividends / Pension Contributions / Director's Loan Accounts / **VAT Considerations**) · H2 Final Thoughts and Top Tips · H2 About the author · H2 Explore our top 10 blog posts here (x2) · H2 Working with
- **Judgement.** A 2024 podcast episode page with **one H3 on VAT**, aimed at doctors doing cosmetic procedures. Dated in its title and holding one row of this topic. Recorded, not useful. Its content belongs to our `incorporation_extraction` lane (lane 7), not here.

### 4.10 practiceindex.co.uk .../INFORMATION-PACK-OBSERVATORY-MEDICAL-PRACTICE-January-2017_1.pdf, 2 kws, PEER (publisher/directory)

- **Status** HTTP 200, fetched. **A 14-page PDF, 1.5 MB, compressed streams that did not render reliably to text.** Identified from the URL as a **January 2017 job-information pack for Observatory Medical Practice**, hosted on practiceindex's WordPress job-board upload path.
- **Tables / calculator / FAQ** not applicable.
- **VAT or GP private income tax content:** **none.**
- **Judgement.** This is the URL behind the 2,720-volume family 3 in section 3a. **A nine-year-old recruitment PDF is ranking at positions 13 and 14 for a named GP surgery's brand searches, and the harvest counted 2,720 volume of that into a VAT topic.** Recorded in full because the balance rule requires it and because it is the concrete evidence for correction C1.

### 4.11 Coverage checklist: union of competitor heading themes, minus ours

Union of the 8 pages that fetched, deduplicated to themes, with the decision required by §9.9 floor 8. **The count of undecided themes must be zero at QA.**

**This checklist is a known floor, not a ceiling: the highest-value competitor page (4.1, pricebailey) returned 403 and its headings are not in this union.**

| # | Heading theme | On our page now | Decision |
|---|---|---|---|
| 1 | Exempt medical work / what the exemption covers | **yes** (H3 "The Principle (the Purpose Test)") | **KEEP AND RE-VOICE.** Must carry the market's word order, criterion B |
| 2 | The purpose test stated as a test | **yes, well** | **KEEP.** Section 5, KEEP-1 |
| 3 | VAT registration threshold and requirements | **yes** (H3 "The £90,000 Threshold (Taxable Turnover Only)") | **KEEP.** Ours is correct at £90,000 where a competitor is on £85,000 |
| 4 | Deregistration threshold | **yes** (£88,000, in body and FAQ) | **KEEP** |
| 5 | Partial exemption and de minimis | **yes** (H3 "Partial Exemption") | **KEEP.** Ours is the only one in the set that states the de minimis numbers |
| 6 | Maximising VAT reclamation | partial | **COVER at one paragraph.** Ours currently frames recovery as small; that is correct and should stay, but the phrase "reclaim" should exist |
| 7 | Medico-legal and expert-witness work | **yes, in depth** | **KEEP.** Section 5, KEEP-2 |
| 8 | Cosmetic / aesthetic work | **yes** | **KEEP AND STRENGTHEN.** See W3 |
| 9 | Record-keeping to defend an exemption claim | **no** | **COVER.** New. The single best idea taken from any competitor here (4.7) |
| 10 | Benefits and drawbacks of VAT registration | partial | **COVER.** One H3. Ours makes the point in prose; the market wants it as a heading |
| 11 | **VAT and PCNs / ARRS** | **no** | **DECLINED WITH REASON, this pass.** Lane 8 ground (`nhs_practice_income`), and the VAT answer for PCN money is not in `house_positions.md`. Raise as a delta rather than invent it |
| 12 | **VAT on temporary / agency medical staff (RCB 9 (2025))** | **no** | **DECLINED WITH REASON, this pass.** Post-freeze discovery, not in `house_positions.md`. Delta to the HP-lock gate. See 4.6 |
| 13 | Accounting for VAT / returns and record-keeping mechanics | no | **DECLINE.** Prescribed to `/blog/gp-vat-registration`, FROZEN to 2026-09-10 |
| 14 | Registration mechanics: 30-day rule, how to register | no | **DECLINE.** Same frozen owner |
| 15 | Dispensing and private-prescription drugs | partial (one clause plus a link) | **KEEP AS A POINTER ONLY, and get it right.** §6.A HP-lock gate, criterion D |
| 16 | Private medical insurance as an employee benefit | no | **DECLINED WITH REASON.** Family 2, 3a. Off-niche |
| 17 | Is private healthcare tax deductible (BIK) | no | **DECLINED WITH REASON.** Family 4, 3a. Benefit-in-kind topic, different page |
| 18 | GP / partner salary ranges | no | **DECLINED WITH REASON.** `lane_negative_tokens` pay-comparison group |
| 19 | Limited-company VAT considerations for doctors | no | **DECLINE.** Lane 7 (`incorporation_extraction`) |
| 20 | Author / credentials block | no | **DECLINE.** Site does not use per-post author blocks |

Undecided themes: **0**.

---

## 5. Whitespace

What no competitor in this set covers well, stated so a writer can quote it back.

**W1. Nobody answers "is the doctors' liability table still current?"** The joint-top Bing click query on this entire site is `has doctors table3 vat exemption been updated since may 2007` (2 clicks, `competitor_universe_2026-08-26.md` §3 lane 10). Not one of the eight fetched competitor pages mentions a date, a table, or 2007. Our page already names **1 May 2007** and already refers to "HMRC's liability table for doctors", it is one sentence away from being the only page on the internet that directly answers a query it is already adjacent to. **Write that sentence.** It also carries `gp vat exemption letter` (the second 2-click query) if the same block explains what a practice actually sends a payer who queries a VAT-free invoice.

**W2. Nobody works stream by stream.** Every competitor writes "medical services are exempt, except reports and cosmetic work". Our page works **seven named income streams** (medicals and forms, insurance and medico-legal reports, travel clinics, minor surgery, occupational health, signing and certification fees, other private clinical work) and gives each one its VAT line. That is a structurally different and better page, and no competitor has it. **This is the asset. It is the reason a REFRAME here must not become a rewrite-from-scratch.**

**W3. Nobody handles the same-procedure-two-answers case.** Our page already makes the cleanest point in the whole topic: **the same minor surgery is exempt when therapeutic and standard-rated when purely cosmetic**, and the same patient's unwell-consultation is exempt while their HGV medical next week is standard-rated. Competitors list categories; ours teaches a test. Sandison Easson's record-keeping point (4.7) is the missing other half: if the answer turns on purpose, the defence is a documented clinical reason in the notes.

**W4. Nobody prices what registration actually gets you.** Our page says it plainly: for a typical GP practice, registration driven by reports and medicals is **more about compliance than about reclaiming input VAT**, because the bulk of the practice's costs relate to exempt clinical work. Every competitor sells registration as an opportunity ("Maximising VAT Reclamation", "Ways to maximise VAT reclamation"). Ours is the honest answer and it is more useful. Keep it and keep the tone.

**W5. The dispensing fork is unowned.** No competitor page in this set states that **dispensed NHS prescription drugs are ZERO-RATED under VATA 1994 Sch 8 Group 12 Item 1, not exempt**, which is why dispensing practices register voluntarily and can recover input VAT (`house_positions.md` §6.A). Kudos (4.4) gets closest and still frames dispensing around private prescriptions only. **This page should not take that ground** (it belongs to `/blog/dispensing-practice-income-accounts-tax`) but it should point at it in one clause that is correct, because a wrong clause here re-seeds the error §6.A exists to prevent.

### Depth on our page worth keeping, marked KEEP

- **KEEP-1** The purpose test stated as a test, with the statutory hook (VATA 1994 Sch 9 Group 7, Item 1) and the closing question "who is this for, and what is it meant to achieve?". No competitor states the statute at all.
- **KEEP-2** The medico-legal analysis, including the narrow exception where a report is genuinely part of the patient's own care. Longest and best treatment in the set.
- **KEEP-3** The seven-stream structure itself (W2).
- **KEEP-4** The de minimis numbers stated in full: average £625 a month, £7,500 a year, and no more than 50% of total input VAT. Only page in the set that gives them.
- **KEEP-5** The under-recording section. Private income does not come through PCSE so nothing external chases it; a report written but never billed, a fee taken at the desk and not banked. Specific, practical, and it links VAT-threshold monitoring to bookkeeping discipline.
- **KEEP-6** The partnership-agreement point: who earns and who keeps private income, and that the wrong outcome is an arrangement never written down.
- **KEEP-7** The scope-boundary paragraph separating **the practice as an entity** from **an individual doctor's own private practice**, with the link to `/blog/private-practice-tax-nhs-and-private-income`. This is live cannibalisation defence and must survive verbatim in substance.
- **KEEP-8** The 14-entry `faqs:` array. It is the best FAQ block in the topic by a distance, and no competitor page in the set has a formal FAQ at all. Entries may be re-worded to carry market vocabulary; **the count must not fall below 14** (criterion G).

**None of the above is traded away to make room for the VAT vocabulary.** §9.3: the specialist tail is the differentiator; the plain-language layer goes *above* the depth.

---

## 6. Our current page, read honestly

**File** `Medical/web/content/blog/gp-practice-private-non-nhs-income-streams.md` · **date** 2026-06-03 · **generator** `opus-4.8/netnew-wave` · **category** "GP Practice Management".

- **metaTitle** "GP Practice Private and Non-NHS Income: Tax and VAT" (51 chars)
- **h1** "A GP Practice's Private and Non-NHS Income: The Streams, the Tax and the VAT"
- **title** "Private and Non-NHS Income in a GP Practice: Streams, Tax and VAT"
- **Body word count** approx 2,700 words of body prose; **4,350 words** for the whole file including frontmatter (`wc -w`). The frontmatter is unusually heavy: 5 `keyTakeaways`, a 5-line `summary`, and **14 `faqs`**.
- **Structure** 6 body H2s, 10 body H3s, 14 FAQs.
- **H2 sequence** What Counts as Private and Non-NHS Income (and What This Page Is Not) · The Main Private and Non-NHS Income Streams (H3 Private Medicals and Forms / Insurance and Medico-Legal Reports / Travel Clinics and Travel Vaccinations / Minor Surgery and Minor Procedures Done Privately / Occupational Health Services / Signing Fees, Certification and Administrative Work / Other Private Clinical Work) · How Private and Non-NHS Income Is Taxed · VAT: the Exempt-Versus-Standard-Rated Line and What It Means (H3 The Principle (the Purpose Test) / A Practical Exempt-Versus-Standard-Rated List / The £90,000 Threshold (Taxable Turnover Only) / Partial Exemption) · Common Mistakes and Planning Points · How We Help GP Practices With Private Income · Related Reading
- **Internal links** 15 body links, all flat `/blog/<slug>` plus `/for-gps` and `/contact`.

### Is it thin? No. It is the strongest page of the three in this batch.

This is a good page that **nobody can find**. Zero impressions on both engines in 90 days. It is more accurate than every competitor page torn down above, it is better structured than all but one, it has the only real FAQ block in the topic, and it contains **0 of the 38 phrasings** in section 3 (and only 2 of them appear anywhere in the 105-page corpus). It says "VAT" constantly and never says "**vat on healthcare**", "**medical vat exemption**", "**vat medical services**" or "**medical services vat**".

**This is the Property SDLT finding reproduced exactly** (dossier §5, and §9.5's "why section 3 matters more than it looks"): the page says the concept everywhere and the market's words nowhere. **The treatment is vocabulary, not surgery.** A REFRAME grade here is a licence the page mostly does not need. Use it for `metaTitle`, `h1` and the H2/H3 labels; leave the analysis alone.

### What is stale, wrong or unverified, checked against `house_positions.md` §6 and §6.A

| # | Location | Status | Position |
|---|---|---|---|
| 1 | `keyTakeaways`[1], body H3 "The Principle" | **UNVERIFIED, must be re-verified at source.** "the **d'Ambrumenil purpose test, in force since 1 May 2007**". `house_positions.md` §6 states the principal-purpose test and cites VATHLT2010, but **names neither d'Ambrumenil nor 1 May 2007 anywhere**. The claim is very likely correct (*d'Ambrumenil* C-307/01, and HMRC's 2007 change to the doctors' table) but it is **not covered by a house position** and is asserted twice on the page | §6. Re-verify the case name and the 1 May 2007 date at HMRC VATHLT2010 / VAT Notice 701/57 before republishing. If it cannot be verified at source, state the test without the case name and the date |
| 2 | Body H3 "A Practical Exempt-Versus-Standard-Rated List", Exempt bullet | **UNVERIFIED.** "**cremation certificates**" listed as exempt. Not in `house_positions.md`. §6's standard-rated watch-list includes "certification/administrative services with no care element", which points the other way | Re-verify against HMRC's liability table for doctors. A cremation certificate being exempt is a specific and unusual carve-out and must be sourced or removed |
| 3 | Same bullet list, Standard-rated bullet | **UNVERIFIED.** "**coroner's post-mortem work**", "**paternity and DNA blood tests**", "**passport countersignature**" | Same. These are plausible and consistent with the purpose test but none is in `house_positions.md`. Source each against the HMRC table or generalise |
| 4 | Body H3 "The £90,000 Threshold", FAQ 11, `keyTakeaways`[4] | **CORRECT.** £90,000 registration, £88,000 deregistration | §6, both verified 2026-08-26 and unchanged for 2026/27. **Do not "fix" these.** Competitor 4.7 is on £85,000; we are right and they are wrong |
| 5 | Body H3 "Partial Exemption", FAQ 12 | **CORRECT.** de minimis: average £625 per month, £7,500 per year, no more than 50% of total input VAT | §6. No change |
| 6 | Body H3 "The Principle" | **CORRECT.** VATA 1994 Schedule 9 Group 7, Item 1, plus "within the doctor's registered field" | §6. No change. The only competitor-beating statutory hook on the page; make sure it survives |
| 7 | Whole page | **OMISSION.** The **30-day registration rule** is never stated. §6: "Registration is required **within 30 days of the end of the month** in which the threshold was crossed" | §6. Judgement: the mechanics belong to `/blog/gp-vat-registration` (FROZEN), so this is **not** a defect to fix here. Recorded so QA does not raise it as one |
| 8 | Body H3 "Travel Clinics", FAQ 8, "Related Reading" | **CORRECT AS FAR AS IT GOES, and it is the §6.A tripwire.** The page says anti-malarials on a private prescription "follow the private-prescription rule and can be standard-rated" and links to the dispensing guide. That is right (§6.A: private-prescription drugs are standard-rated) | §6.A **HP-lock gate**. The danger is expansion: if the writer enlarges this clause it **must not** describe dispensed NHS prescription drugs as exempt. They are **ZERO-RATED under Sch 8 Group 12 Item 1**, which is what preserves input-VAT recovery |
| 9 | `metaTitle` and `h1` | **VOCABULARY DEFECT, the main one.** Neither contains any phrase from section 3. `metaTitle` "GP Practice Private and Non-NHS Income: Tax and VAT" carries `vat` but no market phrase | Not a house-position issue. Criterion B |
| 10 | `schema: ""` | Empty, as on every post in this corpus. **Do not invent a value.** Check what the renderer already emits for `faqs` before touching it | |
| 11 | Body H2 "How Private and Non-NHS Income Is Taxed" | **CORRECT.** SA800 / SA104, taxed on profit share not drawings, not NHS-pensionable, Type 1 certificate captures NHS-derived profit only | §1 and §2.C. No change |

### Arithmetic on the page

**There is none.** No worked example, no computation, no percentages beyond the quoted de minimis limits and thresholds. `arithmetic_recomputed[]` at QA will be the three threshold figures re-read at source (criterion C), not derived sums. If the writer adds a worked threshold example (a practice with £X of reports and £Y of medicals crossing £90,000) it must state its inputs inline and be re-derivable.

### What is worth keeping

Everything in section 5, KEEP-1 to KEEP-8. Also keep the closing disclaimer and the "Related Reading" block; all five links resolve and all point at siblings in the same or an adjacent lane.

---

## 7. Deterministic acceptance criteria

Countable and checkable at QA. Every criterion below either passes or names what failed.

### A. Equity preservation (§9.9 floor 5), passes vacuously, but not unconditionally

The DO-NOT-LOSE set is **empty**: 0 Google query rows, 0 Bing query rows. **Count: 0 of 0.** Floor 5 passes.

**One condition attaches.** Before QA signs it off, re-run the page-level check the data sheet itself demands: **confirm the page-level Google figure in `gsc_page_rows.json`** (GSC anonymises low-volume queries, so page-level impressions can be non-zero while the query breakdown is empty). If page-level impressions are non-zero, the equity register is understated and floor 5 must be re-derived before the rewrite, not after.

### B. Named phrasings that must appear verbatim (§9.9 floor 6)

Drawn from the `On page = no` rows of section 3, prioritised **peer-winnable first, then volume**, and filtered by the section 3a ruling to family 1 only. **Count: 15 phrases must appear verbatim.**

Tier 1, peer-winnable (all 10, mandatory; **at least 4 of them in `metaTitle`, `h1`, an H2 or an H3**):
1. `vat on medical services` · 2. `vat medical services` · 3. `medical services vat` · 4. `vat on healthcare` · 5. `healthcare vat` · 6. `vat healthcare` · 7. `vat in healthcare` · 8. `medical vat exemption` · 9. `vat medical exemption` · 10. `medical exemption vat`

Tier 2, non-peer-winnable but in family 1 (all 5, mandatory, body or FAQ acceptable):
11. `vat on private healthcare` · 12. `private healthcare vat` · 13. `is there vat on private healthcare` · 14. `vat on private healthcare uk` · 15. `vat exemption medical`

**Two of these are corpus collisions.** `medical vat exemption` and `vat medical exemption` show `Anywhere in corpus = yes`. Before placing them, locate the existing occurrence (check `/blog/gp-vat-registration` first) and confirm the intents differ: **this page = which streams are exempt; that page = how to register and account.** If the intents do not clearly differ, record it as a cannibalisation flag rather than writing the phrase twice.

**Declined, with reason, and named so the count reconciles: 23 rows.** 14 hawsons private-medical-insurance rows (family 2, off-niche), 2 practiceindex brand rows (family 3, navigational), 4 taxqube tax-deductibility rows and 3 medicsmoney rows of which 2 are lane-negative (family 4). **15 required + 23 declined = 38. Balances.**

### C. Figures to re-verify at source, BLOCKING

Every citation WebFetched from the primary source and content-verified, not URL-liveness-checked (§4 floor 3). **This is the criterion the brief singles out for this page: VAT Notice 700/1 and the medical-exemption position must be re-verified at source.**

| What | URL | Why it is on the list |
|---|---|---|
| **VAT Notice 700/1 supplement: registration threshold £90,000 and deregistration limit £88,000** | https://www.gov.uk/government/publications/vat-notice-7001-should-i-be-registered-for-vat/vat-notice-7001-supplement--2 | **Named by the brief.** Both figures appear on our page in three places. A competitor in this very teardown (4.7) is publishing £85,000, so this is a live error class |
| Registration trigger and the 30-day rule | https://www.gov.uk/register-for-vat/when-to-register | §6. Verify even though the mechanics stay on the frozen sibling |
| **The medical-exemption position: VATA 1994 Sch 9 Group 7, Items 1 to 3** | https://www.legislation.gov.uk/ukpga/1994/23/schedule/9 | **Named by the brief.** The page's only statutory hook. Content-verify the Item numbering, not just that the URL resolves |
| **The medical-exemption position: the principal-purpose test** | https://www.gov.uk/hmrc-internal-manuals/vat-health/vathlt2010 | **Named by the brief.** The two-part test (within the registered field; primary purpose is protection, maintenance or restoration of health) and the standard-rating of third-party-decision reports |
| The doctors' liability table, and the d'Ambrumenil / 1 May 2007 claim | HMRC VATHLT2000+ and https://www.gov.uk/guidance/health-professionals-pharmaceutical-products-and-vat-notice-70157 | Defect 1 in section 6. **If the case name and the date cannot be confirmed at source, remove them and state the test without them.** They are asserted twice on the page and are not covered by a house position |
| The specific liability calls: cremation certificates, coroner's post-mortem work, paternity/DNA tests, passport countersignature | Same HMRC table | Defects 2 and 3. Each is either sourced or generalised. **No unsourced item-level liability call ships** |
| Partial exemption de minimis: £625/month, £7,500/year, 50% | VAT Regulations 1995 (SI 1995/2518) regs 99 to 110, and HMRC PE21500+ | §6. Our only competitor-beating numeric detail |
| **Dispensing: zero-rating under VATA 1994 Sch 8 Group 12 Item 1** | https://www.gov.uk/guidance/health-professionals-pharmaceutical-products-and-vat-notice-70157 | §6.A HP-lock gate. Verify **only if** the dispensing clause is expanded beyond a pointer. See criterion D |

**UNVERIFIED-figure rule (house rule 4).** `house_positions.md` marks the **GMC annual retention fee**, the **Global Sum per weighted patient** and the **QOF point value** as UNVERIFIED. This page's neighbourhood touches the last two: any sentence contrasting private income against core NHS funding could reach for a Global Sum figure. **No figure may be stated for any of the three.** Where the page needs to reference core NHS funding it says the Global Sum is weighted and uplifted annually and frames the amount as **"confirm the current figure in the Statement of Financial Entitlements Directions 2026"**, naming the block: the opening scope H2 ("What Counts as Private and Non-NHS Income") is the only place this can arise. §3 of `house_positions.md`: **any page needing a hard Global Sum figure is blocked until a human reads the SFE 2026 PDF.**

### D. §6.A HP-lock gate, BLOCKING, negative criterion

The dispensing clause exists in three places (body H3 "Travel Clinics", FAQ 8, "Related Reading"). It is currently correct **because it stays narrow**: private-prescription drugs can be standard-rated, and the detail is handed to `/blog/dispensing-practice-income-accounts-tax`.

**Checkable rule:** the strings `dispensed NHS prescription drugs are exempt`, `dispensing is exempt` and any construction describing NHS-dispensed drugs as **exempt** must be **absent**. If the writer expands the clause at all, it must state that dispensed NHS prescription drugs are **zero-rated under VATA 1994 Sch 8 Group 12 Item 1, not exempt**, which is what preserves input-VAT recovery, that **personally administered** drugs are exempt under Sch 9 Group 7, and that **private-prescription** drugs are standard-rated. Do not lock Drug Tariff prices or dispensing fees; they uplift.

**Recommended and lazier: leave the clause as a pointer and expand nothing.** The gate then passes by construction.

### E. Reference to the frozen sibling, BLOCKING

`/blog/gp-vat-registration` is **FROZEN to 2026-09-10**. Registration mechanics (how to register, the 30-day rule, returns, accounting for VAT) and the full partial-exemption method **stay there**. Checkable: this page retains **at least 2 internal links** to `/blog/gp-vat-registration`, and adds **no new H2 or H3** whose subject is registration mechanics or VAT return preparation.

### F. Cannibalisation checks, BLOCKING

Three live pairs, all named in the dossier or visible in the corpus:

1. `/blog/gp-vat-registration` (FROZEN), already holds `medical vat exemption` / `vat medical exemption` somewhere in the corpus. Criterion B.
2. `/blog/private-practice-tax-nhs-and-private-income`, the **individual** doctor's NHS-plus-private position. KEEP-7 is the boundary paragraph that defends it; it must survive in substance.
3. `/blog/dispensing-practice-income-accounts-tax`, the dispensing fork. Criterion D.

Checkable: each of the three is linked at least once, and the scope-boundary paragraph (KEEP-7) is present and still names the other page explicitly.

### G. Structural floors

- The **`faqs:` array must not fall below 14 entries.** It is the topic's only real FAQ block and the largest single differentiator against the eight competitor pages.
- The **seven named income streams must all survive** as H3s (medicals and forms; insurance and medico-legal reports; travel clinics; minor surgery; occupational health; signing/certification; other private clinical work). Labels may be re-worded to carry market vocabulary; **the stream count must not fall below 7**.
- `metaTitle` at or under 60 characters and containing `VAT`.
- This is a REFRAME, so `metaTitle`, `h1` and the H2 order are **not** frozen. `slug`, `canonical`, `category` and the file path are.

### H. The four existing floors (§4) plus §9.9 floors 5 to 8

1. **Query-coverage floor**, `python scripts/track2_query_coverage.py --slug gp-practice-private-non-nhs-income-streams --json`. **This page is invisible (0 impressions both engines), and invisible pages never gate** on floor 1 by design. Run it for the record; it will not block.
2. **Arithmetic recompute**, criterion C. No derived arithmetic on the page today; the three thresholds are re-read at source. `all_clear` derived from the dimensions, never trusted from the agent.
3. **Statute verification at source**, criterion C, `statute_checks[]`, every VATA and HMRC-manual citation content-verified. **VAT Notice 700/1 and the medical-exemption position are mandatory members of this list.**
4. **Link resolution**, `slug_resolver.py` + `track2_link_audit.py` + `predeploy_gate.py`. **0 broken internal links repo-wide.** Medical uses **FLAT** `/blog/<slug>` routing (`medical_parked` memory: `slug_resolver` HARD-REFUSES flat sites), so use `scripts/medical_flat_link_audit.py`, not the category resolver. This page carries 15 body links, the most of the three in the batch.
5. **Equity preservation**, criterion A, 0 of 0, with the `gsc_page_rows.json` condition attached.
6. **Cluster coverage**, criterion B, 15 of 15 placed, 23 declined with reason, balancing to 38.
7. **Reconciliation balance**, 15 + 23 = 38. Balances.
8. **Competitor re-read**, the section 4.11 table, 20 themes, **0 undecided**, with the stated limitation that the pricebailey headings are missing (4.1).

Plus the two human passes: adversarial factual QA against `house_positions.md` §6 and §6.A, and the editorial pass, which here also checks that the VAT vocabulary reads as prose rather than as inserted keywords, and that the page still opens as a practice-income page rather than as a VAT explainer.

---

## 8. Stated expectation

Written before the work, as a number a later read can fail (§9.6).

**Baseline, 90d to 2026-08-26:** Google 0 impressions, 0 clicks, 0 query rows. Bing 0 impressions, 0 clicks, 0 query rows. Page published 2026-06-03. **This is a from-zero page: any signal is new signal, and there is nothing to protect.**

**Engine and window.** Bing is the **14 to 28 day** read; Google the **28 to 90 day** read. One change per page per window.

| Horizon | Engine | Expectation |
|---|---|---|
| 14 days | Bing | The URL appears in `GetPageQueryStats` at all, with **>= 1 named query** and **>= 3 impressions**, where there were none |
| 28 days | Bing | **>= 5 named queries** and **>= 15 impressions**, and **at least 2 of the 15 named phrases** in criterion B appear in the Bing query set. A rise driven entirely by unrelated long tail is drift, not success |
| 28 days | Bing, targeted | At least one of the two site-level lane-10 queries (`has doctors table3 vat exemption been updated since may 2007`, `gp vat exemption letter`) is attributed to **this URL**. It is currently landing elsewhere on the site (section 2) |
| 90 days | Google | **>= 1 query-level GSC row** for this URL where there were 0, and average position **<= 30** on at least one family-1 phrasing. pricebailey holds positions 6 to 18 on this vocabulary, so a first-90-days target inside the top 30 is the honest one |

**`target_keywords` on `blog_optimizations`** must be populated with the **15 phrases in criterion B**, not with the concept vocabulary the page already uses. Per §9.6 rule 2 the verdict is read against **phrase coverage**, not total traffic: impressions rising while the 15 stay missing is **drift and must be recorded as a fail**.

**Failure trigger, as a number.** The standard formulation ("if Bing clicks fall below N, revert") **cannot fire on a page whose baseline is zero**, so it is replaced with a positive trigger and a correctness trigger, both numeric:

- **If, 28 days after deploy, Bing named queries for this URL are still 0 and Bing impressions are still 0, the change has failed on its own terms.** Do not revert (there is nothing to revert to that performed better); record `impact_verdict = fail`, `confidence_level` low, and re-diagnose. The likely cause is indexation, not copy, and the next lever is internal links from `/blog/gp-vat-registration` and `/blog/gp-practice-management` once the frozen window closes on 2026-09-10.
- **Revert trigger, correctness:** if any figure in criterion C fails re-verification at source after deploy, revert to `b3d78c97e768645cca480dd350281ffa68c1faf9` immediately rather than patching in place. A wrong VAT threshold or a wrong exemption call on a page a GP practice acts on is a different class of error from a ranking miss.

---

## Corrections to the dossier

Per hard rule 7. Stated, not silently harmonised.

**C1. 41% of this topic's headline volume is a navigational brand search for an Oxford GP surgery, held by a 2017 recruitment PDF.** `observatory medical practice` (2,400) and `observatory medical practice oxford` (320) total **2,720 of the topic's 6,590 volume**. The URL holding them is `practiceindex.co.uk/gp/jobs/wp-content/uploads/wpjobboard/job/1170/attachement/INFORMATION-PACK-OBSERVATORY-MEDICAL-PRACTICE-January-2017_1.pdf`, a 14-page job-information pack from January 2017 with no VAT content (teardown 4.10). The dossier's §8 screens exactly this class as `brand | navigational` and screened 16 brand keywords at keyword level. These two escaped because the regex matched "medical" without any VAT term nearby. **Recommend both rows are moved to the `excluded / brand` bucket in the next reconciliation.** The ledger in §10 would move 2 rows from `assigned` to `excluded` and still balance.

**C2. The dossier's topic row and this page's data sheet do not describe the same set.** Dossier §3: `vat on private healthcare | 4 domains | 1,460 volume | 760 peer-winnable | 18 kws | 15 of 18 missing`. Data sheet: **38 kws, 6,590 volume, 710 peer-winnable, 9 domains, 38 of 38 missing.** The pack's regex is materially broader: it pulls in the hawsons private-medical-insurance family (14 rows, 2,140), the practiceindex brand rows (2 rows, 2,720) and the taxqube/medicsmoney deductibility and salary rows (7 rows, 480), none of which are VAT-on-healthcare topics. Strip those 23 and the remainder is **15 rows / 1,250 volume / 710 peer-winnable / 1 domain**, which is much closer in shape to the dossier's 18/1,460/760 than the headline suggests. **The dossier's number is the better one.** The pack works to the 38-row data sheet because that is the frozen input the brief supplies, and section 3a exists to stop the broader regex being read as a licence to write about private medical insurance.

**C3. Peer-winnable volume disagrees between the two sources.** Dossier 760, data sheet 710. Both are Google-derived (`dossier` §11 point 6) and neither is wrong on its own terms; the delta is a consequence of C2's different selections. Recorded, not resolved.

**C4. A live HMRC development is missing from `house_positions.md` §6: Revenue and Customs Brief 9 (2025), 15 December 2025, on VAT and supplies of temporary medical staff.** Found on `r-m-t.co.uk` (teardown 4.6). §6 cites RCB **2 (2020)** at §6.A and no other Brief. RCB 9 (2025) is directly relevant to GP practices engaging locums through agencies and to the exempt-versus-standard-rated line this page draws. **This is a post-freeze discovery: it goes on the named delta list (§9.8) and to the HP-lock review gate, and it must NOT be written into any page from a competitor's summary.** Flag appended per the `house_positions.md` preamble instruction ("append a flag to the wave's `site_wide_flags`, do not unilaterally re-frame"). Nothing was written to `site_wide_flags.md` by this task; raising it is the orchestrator's call.

**C5. The dossier records the topic's equity as "none", which is correct for the URL and misleading for the lane.** `competitor_universe_2026-08-26.md` §3 lane 10 (`vat_medical`) shows **two 2-click Bing queries** on this vocabulary, one of them the joint-top click query on the whole site. That demand is landing on some other page of ours. The dossier's per-page equity column cannot show it because it is keyed to the URL. **Recommend the next dossier pass adds a lane-level demand column, or at minimum a note where a lane has clicks that its assigned page does not.** This is the single most actionable fact in this pack and it is invisible in the dossier as written.

---

*Pack built 2026-08-26. No `Medical/web/` file was modified. No commit, no deploy, no `monitored_pages` write, no monitor, alert, cron or notification created.*
