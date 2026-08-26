# §9.5 RESEARCH PACK: /blog/nurse-tax-relief-professional-subscriptions

Assembled 2026-08-26 from `docs/medical/packs/BATCH2_INDEX.md` (binding batch contract), `expansion_research/nichemap_2026-08-25/C1_REGULATORY.md` row 23 and its Method section, `expansion_research/nichemap_2026-08-25/C2_PLACEMENT.md` row 23, `docs/medical/cluster_dossier_2026-08-26.md`, `docs/medical/competitor_universe_2026-08-26.md`, `docs/medical/language_spec_2026-08-26.md`, `docs/medical/house_positions.md`, the persisted 32,872-row DataForSEO harvest and six live competitor fetches recorded in section 4.

Preparation only. The pack does not write the page. Nothing under `Medical/web/` was edited. Nothing committed, deployed or indexed. No `monitored_pages` row written. No monitor, alert, cron or scheduled job created. **No new DataForSEO or SERP calls: $0.00 additional spend.** Repo sha at build time: `git rev-parse HEAD` = `77cc1bedc8e8c2a5dea8297bb7e71f28e33440cf`.

**Read section 5 before section 3.** This page has the tightest ownership fence in the batch and section 5 answers the page-versus-section question that the fence forces.

---

## 1. Target and permission level

**CONSTRAINT FIRST. The C1 condition is the most important thing in this pack and it is stated before anything else.**

| Field | Value |
|---|---|
| URL | `/blog/nurse-tax-relief-professional-subscriptions` |
| Status | **NET-NEW.** The page does not exist. `ls Medical/web/content/blog/ \| wc -l` = 79, and no file matches `nurse`. |
| Cluster / topic | nurses, niche-map ABSORB row 23 |
| Grade | NET-NEW (no rewrite grade applies; no EXTEND structural freeze, no K2) |
| Source file to be created | `Medical/web/content/blog/nurse-tax-relief-professional-subscriptions.md` |
| Renderer | Markdown file with YAML frontmatter. **The body is raw HTML inside the markdown file**, not markdown prose: `<p>`, `<h2>`, `<h3>`, `<ul>` written directly. `metaTitle`, `h1`, `keyTakeaways`, `summary` and the `faqs` array live in frontmatter and are separate editable surfaces from the body. Required frontmatter keys: `slug`, `canonical`, `date`, `category`, `image`, `imageCredit` (exactly once, never duplicated), `altText`, `schema`. |
| Current sha | `77cc1bedc8e8c2a5dea8297bb7e71f28e33440cf` |
| Revert path | `git rm Medical/web/content/blog/nurse-tax-relief-professional-subscriptions.md`. One new file, one deletion. No equity to lose (section 2). |
| Frozen-list position | Not frozen. `monitored_pages` carries 19 live windows for `site_key='medical'` (18 to 2026-09-10, `__home` to 2026-10-06); this slug is on none of them because it does not exist. |
| Host decision | `C2_PLACEMENT.md` §4 row 23: **exact containment tie, `generalist` 0.35 = `medical` 0.35, "brand decides"**. Medical won on brand. Recorded here because a tie is a reversible decision: if this page pulls non-medical traffic, porting one file to `generalist` is the cheap move. |
| Sizing | `C2_PLACEMENT.md` row 23 sizes the niche at **"section + 1-2 pages", 40/mo**. It is the smallest sizing of any ABSORB row assigned to this site. Section 5 tests whether even one page is supported. |

### 1.1 THE C1 CONDITION (row 23, verbatim)

> **23 | Nurses / healthcare professionals | CONDITIONAL | Audience is overwhelmingly PAYE, so the only natural monetisation is refund-shaped, which is the one route that is off. Safe form: informational content plus an accountancy lead restricted to self-employed/agency/bank nurses, and no benefits-claim content or onward benefits referral | HMRC repayment-agent regime + deed-of-assignment ban (Income Tax (Repayment Agents) Regs 2023); RAO art 89G specified-benefits sector**

Plus **standing constraint 2**, which `C1_REGULATORY.md` applies estate-wide and not only to this row:

> **2. No contingent-fee or assignment-based tax-refund service, on any niche (HMRC repayment-agent registration + the deed-of-assignment ban). Cited per-row only where the audience is PAYE and the refund IS the commercial route.**

And the **decisive distinction** from the same file's Method section, which is what keeps this row CONDITIONAL rather than BLOCKED:

> **We are not carrying on the client's regulated activity. We are selling accountancy services to people who carry it on. [...] A regime only produces a non-CLEAR verdict if it bites on us (the publisher/introducer) or on the partner accountant who has to deliver the thing the page sells.**

The NMC bites the nurse, not us, and it is irrelevant. What bites **us** is the repayment-agent regime, because a refund service is the natural commercial shape of this audience and we would be the one running it. That is the whole reason this row is not CLEAR.

### 1.2 The four hard-fail acceptance criteria this produces

These are restated as countable checks in section 7.7. They are listed here because they govern the page's existence, not merely its copy.

**C1-1. No rebate or refund SERVICE is offered, ever.** No contingent fee, no percentage of a refund, no "no win no fee", no deed of assignment, no "we claim it back for you", no rebate-claim form, no rebate calculator that ends in a claim submission. The page **explains the relief and how the reader claims it themselves**, and points at HMRC. Any wording in which we (or an unnamed partner) obtain the refund on the reader's behalf for a share of it is a hard fail.

**C1-2. The lead route is an ACCOUNTANCY enquiry, restricted to self-employed, agency and bank nurses.** A PAYE-only nurse is told how to claim directly, in plain terms, and is **not funnelled into a form**. The page must therefore carry an explicit employment-status fork before any CTA, and the CTA must name who it is for. A single undifferentiated "get in touch" that a PAYE-only nurse would reasonably answer is a hard fail.

**C1-3. No benefits-claim content and no onward benefits referral of any kind.** No Universal Credit, no PIP, no disability or carer benefits, no NHS Low Income Scheme, no benefits calculator, no link to a benefits adviser or checker. RAO art 89G reaches the specified-benefits sector and `C1_REGULATORY.md` §Notes records that art 89G reaches only three of the 89 rows, this being one of them, "in each case only through an adjacent claim-shaped proposition". Fence the proposition and the niche is clean. Any benefits content on this page unfences it.

**C1-4. The page carries a plain warning about repayment agents.** See section 1.3 for how this reconciles with O8, which owns the full treatment.

### 1.3 How C1-4 reconciles with ownership row O8

O8 assigns "how to claim employment expenses: form P87, the self-assessment route, the four-year time limit, **and the repayment-agent warning**" to **batch 2 item 1**, `/blog/nhs-uniform-tax-relief-laundry-allowance`, written in parallel. Everyone else gets one sentence and a link. C1-4 requires the warning here.

**These do not conflict, and the reconciliation is stated as a rule the QA checker can count:**

- **Permitted here, and required:** one warning sentence, maximum two, naming the risk in plain terms (an agent takes a share of a refund the nurse can claim free, and some agents have used assignments that divert the money), immediately followed by a link to `/blog/nhs-uniform-tax-relief-laundry-allowance`.
- **Forbidden here:** a second full treatment. No section or `<h2>` about repayment agents, no explanation of the Income Tax (Repayment Agents) Regulations 2023, no explanation of what a deed of assignment is or how the ban works, no comparison of agent fee percentages, no list of what to check before signing.

**The countable form of the rule: this page may contain at most 2 sentences about repayment agents, and must contain at least 1, and must link to the O8 owner within the same paragraph.** A one-line warning plus a link to the full treatment is not duplication. A second full explanation is, and it is the exact V3 failure that batch 1 was punished for.

### 1.4 THE OWNERSHIP MAP, as it binds this page

Repeated from `BATCH2_INDEX.md` §4. Every row here is a fact this page touches and does not own. Rule V3: **one sentence and a link, never the explanation. Three sentences means you are taking someone else's fact and must stop.**

| # | Shared fact | Owner | What this page does |
|---|---|---|---|
| **O7** | Flat-rate expense for uniform and laundry, **and professional-subscription relief under ITEPA 2003 s.343 / List 3** | **Batch 2 item 1**, `/blog/nhs-uniform-tax-relief-laundry-allowance` | **ONE SENTENCE and a link.** No flat-rate amounts. No List 3 explanation. No s.343 mechanics. No "what counts as a uniform". **This is the single biggest fence on the page: the noun in this page's own URL, "professional subscriptions", names a fact this page does not own.** See section 5. |
| **O8** | How to claim: P87, self-assessment, the four-year limit, the repayment-agent warning | **Batch 2 item 1** | One sentence and a link, **except** the repayment-agent warning, governed by 1.3 above. No P87 walkthrough, no four-year worked backdating example, no "how long does it take". |
| **O11** | SMP versus Maternity Allowance: eligibility, the small-earnings route, which one a self-employed or locum GP gets | **Batch 2 item 4**, `/blog/maternity-pay-and-maternity-allowance-for-doctors` | One sentence and a link. Note that three nurse-family keywords (`maternity nurse pay`, `maternity pay nhs nurse`, `nhs nurse maternity pay`, 70 each) are claimed by item 4's regex, not this page's. See section 3.4. |
| **O18** | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` (batch 1, live) | **One sentence: nurses are in the same scheme as doctors, then a link.** The entire 13-keyword, 1,290-volume NHS-pension-for-nurses half of this cluster is O18's, not this page's. See section 3.3. |
| **O1** | NHS tiered member contribution rates and bands (uplifted 1 April 2026) | `/calculators/nhs-superannuation-tiered-contribution` | One sentence naming the tier idea, then link. **No table.** |
| **O2** | Annual allowance mechanics: taper, threshold income, adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` | One sentence, then link. Almost certainly not needed at all on this page. |
| **O3** | Adjusted net income, the £100,000 to £125,140 personal-allowance withdrawal, the 60% band, free childcare, HICBC | **Batch 2 item 5** | One sentence, then link. A nurse audience will rarely reach it; the likely correct outcome is absence. |
| **O9** | GMC annual retention fee: **deductible, amount UNVERIFIED** | `house_positions.md` §8 and §10 | May say a regulator fee is deductible. **No figure.** Hard fail F5. See section 7.5 for why the NMC fee is the same shape. |
| **O10** | Global Sum per weighted patient (verified £130.07), QOF point value (**UNVERIFIED**) | `house_positions.md` | **No QOF point value on any page in this batch.** Hard fail F5. Off-topic here; expected outcome is absence. |

**Additional non-batch fence.** `/blog/medical-professional-expenses-what-is-claimable` is **FROZEN to 2026-09-10** and is the long-run owner of the **general deduction list**. This page must not become a second one. No enumerated "everything a nurse can claim" list. See section 6.

---

## 2. Equity register

**The page does not exist. There is nothing to protect. This section is present and says so, rather than being omitted.**

**Google.** Zero equity, by construction. There is no URL, so there is no `gsc_page_performance` row, no query-level row and no page-level row. No GSC pull is meaningful for a URL that has never been served. The site-wide context, from `BATCH2_INDEX.md` §8, is that **Google indexes roughly 21 of 130 URLs** on this domain, driven by low domain authority rather than any technical defect.

**Bing, re-pulled today rather than taken from the batch index.**

```
python -c "from optimisation_engine.clients.bing_query_client import BingWebmasterClient; ..."
BingWebmasterClient().get_query_stats('https://www.medicalaccounts.co.uk')
# run 2026-08-26 13:44 UTC
# TOTAL 648
# regex (nurse|nursing|midwif|midwiv) applied to the Query field
# MATCHED 0
```

**648 site-level Bing queries. Zero of them match the nurse family.** Not one impression on any nurse, nursing, midwife or midwifery phrasing anywhere on the domain.

**Consequence for section 8.** There is no baseline to beat and no query to preserve, so the 14-day and 28-day reads are pure existence tests. There is also no revert trigger of the batch-1 kind: the failure condition for a net-new page is quality, not lost equity, and the revert is the deletion of one file.

**DO-NOT-LOSE query count: 0.** Equity-preservation floor 5 is vacuous on this page and is recorded as such, not skipped.

---

## 3. The market's keyword set

Source: `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'`, 32,872 persisted rows, 27 domains, no volume floor. Already paid for in the dossier task ($4.92048). **This pack spent $0.00.**

**Selection regex for this cluster, printed so the counts are re-derivable:**

```
ranked_keyword ~ '(nurse|nursing|midwif|midwiv)'
```

### 3.1 Headline figures, re-derived

```sql
-- run 2026-08-26 via `python scripts/_q.py <file.sql>`
with peers as (select unnest(array['medicsmoney.co.uk','sial-accountants.co.uk','kudosaccounting.co.uk',
 'bw-medical.co.uk','pricebailey.co.uk','practiceindex.co.uk','sandisoneasson.co.uk','ramsaybrown.com',
 'r-m-t.co.uk','nicholsmedical.co.uk','gorillaaccounting.com','lanop.co.uk','accountants4nhsdoctors.co.uk',
 'hawsons.co.uk','bhp.co.uk','freestyleaccounting.com','simpkinsedwards.co.uk','taxqube.co.uk',
 'coveneynicholls.co.uk','fkca.co.uk','medifintech.co.uk','rbp.co.uk']) d),
c as (select * from dataforseo_competitor_data where site_key='medical' and date_pulled='2026-08-26'
      and ranked_keyword ~ '(nurse|nursing|midwif|midwiv)'),
k as (select ranked_keyword, max(search_volume) v,
   min(position) filter (where competitor_domain in (select d from peers)) best_peer_pos
 from c group by 1)
select count(*) uniq_kws, sum(v) uniq_vol,
 sum(v) filter (where best_peer_pos<=20) peer_winnable_vol,
 count(*) filter (where best_peer_pos<=10) peer_top10_kws
from k;
-- => uniq_kws 72 | uniq_vol 9570 | peer_winnable_vol 420 | peer_top10_kws 0
```

| Measure | This pack | `BATCH2_INDEX.md` §1 row 7 | Reconciled? |
|---|---|---|---|
| Unique keywords | **72** | 69 | **Yes, exactly.** |
| Total volume | **9,570** | 9,360 | **Yes, exactly.** |
| Peer-winnable volume | **420** | 420 | Identical |
| Keywords held by a peer in the Google top 10 | **0** | 0 | Identical |

**The 3-keyword / 210-volume difference is fully explained, not waved at.** The batch index used a single `CASE` chain in which the `B2-maternity` limb is evaluated **before** the `B2-nurses` limb, so three nurse keywords are claimed by item 4 first. Re-derived:

```sql
-- same CASE chain as BATCH2_INDEX.md §1, restricted to nurse-family keywords not landing in B2-nurses
-- => 3 rows: maternity nurse pay (70) | maternity pay nhs nurse (70) | nhs nurse maternity pay (70)
```

72 - 3 = 69. 9,570 - 210 = 9,360. **The ledger reconciles exactly, and the three keywords are O11's, not this page's** (section 3.4).

**0 keywords held by a peer inside the Google top 10, and this is the smallest peer-winnable number in the whole batch (420 against item 1's 27,550).** Section 8 is written against that fact and does not invent a click target.

### 3.2 THE SPLIT: most of this cluster is not addressable

72 keywords, 9,570 volume, in seven labelled groups. **Every keyword is in exactly one group and the group totals reconcile to 72 and 9,570.**

| # | Group | Kws | Volume | % of volume | Status |
|---|---|---|---|---|---|
| A | Pay scales and salary | 12 | 2,640 | 27.6% | **OUT OF SCOPE**, lane-negative |
| B | Clinical, CPD and professional-standards content | 17 | 2,100 | 21.9% | **OUT OF SCOPE**, off-niche |
| C | Indemnity insurance | 12 | 2,020 | 21.1% | **OUT OF SCOPE as a product.** One qualified exception, see 3.5 |
| D | NHS pension for nurses | 13 | 1,290 | 13.5% | **NOT THIS PAGE'S.** O18, routed |
| E | Practice-nurse HR: appraisals and forums | 11 | 870 | 9.1% | **OUT OF SCOPE**, HR content |
| F | **Nurse tax relief** | **4** | **440** | **4.6%** | **ADDRESSABLE. This is the page.** |
| G | Nurse maternity pay | 3 | 210 | 2.2% | **NOT THIS PAGE'S.** O11, routed |
| | **Total** | **72** | **9,570** | 100% | |

**Read that table honestly: 4.6% of this cluster's volume is this page's target. Four keywords. 440 volume. Of the 420 peer-winnable volume in the whole cluster, 330 sits in group F and 90 sits in group D, which belongs to `/nhs-pension`. This page's own peer-winnable volume is 330.** That number, not 9,570 and not 420, is the honest basis of the page-versus-section question in section 5.

**Group A, pay scales and salary (12 kws, 2,640 vol). Config-confirmed out of scope.**
`nurse pay calculator` (1,000, bma p32), `consultant nurse pay` (390, bma p10), `nurse consultant pay` (390, bma p14), `how much do nhs nurses earn` (210), `nurses pay northern ireland` (210), `army nurse pay` (170), `nursing pay scales scotland` (70), `nurse pay northern ireland` (50), `nurses pay rise 2025-26 latest news` (50), `nurses pay rise 2025/26 latest news` (50), `nurse pay wales` (40), `nurses pay rise 2025/26` (10).

Confirmed by reading the config rather than asserted: `sites/medical.discovery.json` `lane_negative_tokens` contains **`nurse-salary`, `pay-scale`, `payscale`, `salary-scale`, `salary-guide`, `average-salary`, `take-home-pay`, `pay-review-body`**, verified 2026-08-26 by `python -c "import json; print(json.load(open('sites/medical.discovery.json'))['lane_negative_tokens'])"`. The dossier §8 screens the same shape estate-wide (`bma salary scales` 1,370, "bans pay-scale"; `general practitioner salary uk` 15,600). Every keyword in group A is held by bma.org.uk, a §2b non-peer institutional domain. **Nothing in group A is addressable and none of it is a gap.**

**Group B, clinical and professional-standards content (17 kws, 2,100 vol). All themdu.com.**
`safeguarding in nursing` (260), `safeguarding nursing` (260), `nurse practitioner problems` (170), `record keeping for nurses` / `record keeping in nursing` / `record keeping nursing` (140 each), `confidentiality and nursing` / `confidentiality in nursing` / `confidentiality nursing` / `nursing and midwifery council record keeping` / `nursing confidentiality` (110 each), `importance of communication nursing` (90), `advanced nurse practitioner vs gp` (70), `cpd hours nursing` / `what is cpd for nurses` / `what is cpd in nursing` / `what is cpd nursing` (70 each).

Every one is held by **themdu.com**, classified in `competitor_universe_2026-08-26.md` **§2b as a non-peer institutional domain** (medical defence organisation). This is clinical and regulatory guidance, not tax. `C1_REGULATORY.md` row 22 states the estate position in one line: "we publish tax content, not health content". **Out of scope, and writing any of it would be the site claiming clinical authority it does not have.**

**Group C, indemnity insurance (12 kws, 2,020 vol). Out of scope as a product, with one qualified exception at 3.5.**
`indemnity insurance nursing` / `nurses indemnity insurance` / `nursing indemnity insurance` (320 each), `nurse insurance` (170), `personal indemnity insurance for nurses` / `professional indemnity insurance for nurses` (140 each), `towergate dental nurse insurance` (140), `indemnity insurance for nurses uk` / `nurses indemnity insurance uk` / `professional indemnity insurance for nurses uk` (110 each), `indemnity cover for nurses` / `indemnity cover nurses` (70 each). All bma.org.uk or themdu.com except `towergate dental nurse insurance` (practiceindex, p60, a brand navigational term for a dental nurse product and doubly out: brand, and sibling-site territory).

Dossier §8 screens this correctly as an insurance product, on the same line as `indemnity` (30,710), `professional and indemnity insurance` (26,560), `mps / mdu / mddus indemnity` (10,900), `professional indemnity insurance rcn` (1,780) and `indemnity insurance nursing` (1,080).

**Group E, practice-nurse HR (11 kws, 870 vol). All practiceindex.co.uk.**
`appraisal for nurses` / `appraisal in nursing` / `appraisal nurse` / `appraisal nursing` / `appraisals for nurses` / `appraisals in nursing` / `nurses appraisal` / `nursing appraisal` (90 each), `practice nurse forum` / `practice nurse forums` / `practice nursing forum` (50 each). practiceindex is a §2a peer, so these rows are technically peer-held, but every position is 28 to 53 and the topic is **practice-manager HR content**, which is the same screen `BATCH2_INDEX.md` §2 applied when it ruled the allied-health cluster unpackable ("Practice Index practice-manager HR content"). Not tax. Out of scope.

### 3.3 Group D routing: the NHS-pension-for-nurses half is O18 and is NOT this page's

13 keywords, 1,290 volume, **and it carries 90 of the cluster's 420 peer-winnable volume** (`average nhs nurse pension`, 90, medicsmoney p18). It is the second-largest coherent block in the cluster and it is the one a writer will most want to take. It is not available.

`nhs nurse pension` (110, medicsmoney p21), `nhs nurses pension` (110, p25), `nhs nurses pension scheme` (110, p22), `nhs pension for nurses` (110, p27), `nhs pensions for nurses` (110, p31), `nurse pension` (110, p30), `nurses pension` (110, p26), `nurses pension plan` (110, p29), `pensions for nurses` (110, p38), `nurse pension scheme uk` (70, p22), `nurse pension uk` (70, p30), `nurses pension uk` (70, p29), `average nhs nurse pension` (90, **medicsmoney p18, peer-winnable**).

**Routed to `/nhs-pension` (batch 1, live) under O18.** This page gets **one sentence** saying nurses are members of the same NHS Pension Scheme as doctors, and a link. It gets no accrual fractions, no normal pension age, no contribution tiers (O1), no annual allowance (O2), no McCloud, no opt-out reasoning (O5, batch 2 item 3).

**A note for the conductor, not an instruction to this writer.** `/nhs-pension` is a doctors-shaped page and this 1,290-volume nurse vocabulary is absent from it. Adding two nurse-voice phrasings there is a cheaper way to capture group D than any page this pack could authorise, and it is a batch-3 delta, not batch-2 scope.

### 3.4 Group G routing: nurse maternity pay is O11's

`maternity nurse pay` (70, bma p30), `maternity pay nhs nurse` (70, bma p5), `nhs nurse maternity pay` (70, bma p7). Zero peer-winnable. All bma.org.uk, all at institutional positions. These are the three keywords the batch index's `CASE` chain assigns to item 4 (section 3.1). **One sentence and a link to `/blog/maternity-pay-and-maternity-allowance-for-doctors`, and only if the page's own topic gives it a natural home.** If it does not, the correct outcome is that it is not mentioned at all: V6 says vocabulary placement never overrides the page's own topic. Recorded as routed-not-required.

Note the honest oddity: `maternity pay nhs nurse` at position 5 and `nhs nurse maternity pay` at position 7 are the **best any-domain positions anywhere in the 72-keyword cluster**, and both are BMA's. There is no top-10 position held by anyone in this cluster that we could take.

### 3.5 The indemnity exception, stated plainly

`cluster_dossier_2026-08-26.md` §8 closes with its own qualification of the screen it just applied:

> **One screen worth revisiting.** Indemnity as an insurance product is off-niche, correctly. Indemnity as a **deductible expense** for a doctor is squarely in niche, and it survives inside the retained expenses topics. If a future pass wants the 30,710-volume "indemnity" family, the angle is tax treatment, never product comparison.

**Applied to group C, the answer is: one keyword may be taken, on the tax-treatment angle only, and it is not a target.**

- `indemnity insurance for nurses uk` (110) and the ten other product-shaped phrasings are **declined**. Their SERP intent is "which policy should I buy", which is an insurance-distribution intent. We do not answer it, we are not permitted to recommend an insurer (language spec **I3**, no regulated-activity claims; **`C1_REGULATORY.md` §6.1 lock**, FCA-adjacent consumer finance), and a page that half-answers a product query and pivots to tax is a worse page than one that never raised it.
- **The one addressable form** is the deductibility of a nurse's own indemnity or professional-body cover, which is the same fact `house_positions.md` §8 already locks for doctors: "medical indemnity (MDU, MPS or MDDUS subscriptions) is deductible". If it appears, it appears as **tax treatment inside the page's own expenses reasoning**, in the same breath as the CNSGP-style question of who is already covered, and never as a heading, never as a comparison, never with a premium figure, and never with an insurer named as a recommendation.
- **The angle is tax treatment and never product comparison. If a draft contains a comparison of indemnity providers, cover levels or premiums, that is a hard fail.** It is criterion 21 in section 7.7.
- **None of the 12 group-C keywords is a required phrase in 7.1.** The exception permits a fact, not a target.

### 3.6 GROUP F: the addressable half, in full

Four keywords. 440 volume. 330 peer-winnable. **This is the whole page.**

`On page` is vacuous (the page does not exist). `In corpus` was checked by grepping the live corpus, READ ONLY, nothing edited:

```bash
# run 2026-08-26 in C:/Users/user/Documents/Accounting
for p in "nurse tax relief" "tax relief for nurses" "nurses tax relief" "tax relief nurses"; do
  printf "%-24s %s\n" "$p" "$(grep -ril "$p" Medical/web/content/blog/*.md | wc -l)"; done
# => all four: 0
grep -ril "nurse" Medical/web/content/blog/*.md | wc -l   # => 5
```

| Vol | Best peer pos | Best any-domain pos | Peer-winnable | Held by (peer URLs) | Verbatim in our copy? | Keyword |
|---|---|---|---|---|---|---|
| 110 | **16** (medicsmoney) | 16 | **yes** | medicsmoney `/nurses/` p16 · taxqube `/healthcare-workers-tax-rebate/` p44 · bma `/pay-and-contracts/tax` p25 · lanop `/uniform-tax-rebate-uk-guide/` p42 | **no** (0 of 79 files) | tax relief for nurses |
| 110 | **16** (medicsmoney) | 16 | **yes** | medicsmoney `/nurses/` p16 · taxqube `/healthcare-workers-tax-rebate/` p46 · bma `/...claiming-for-professional-expenses` p31 | **no** (0 of 79) | nurses tax relief |
| 110 | **17** (medicsmoney) | 17 | **yes** | medicsmoney `/nurses/` p17 · taxqube `/tax-relief-for-nhs-medical-professionals/` p39 · lanop `/uniform-tax-rebate-uk-guide/` p40 | **no** (0 of 79) | tax relief nurses |
| 110 | 24 (taxqube) | 24 | no (>20) | taxqube `/tax-relief-for-nhs-medical-professionals/` p24 · medicsmoney `/nurses/` p26 · bma `/...claiming-for-professional-expenses` p35 · lanop `/uniform-tax-rebate-uk-guide/` p48 | **no** (0 of 79) | nurse tax relief |

**Four word orders of one idea.** Language spec **V1 caps a page at two word orders per idea, hard.** So two of these four are required in 7.1 and two are formally deferred under V1, and that deferral is a rule-compliance outcome, not an omission. This is the sharpest V1 case in the batch: the cluster is literally one phrase written four ways.

**Also note what the table shows about the peer field: the best position any domain holds on any of these four is 16.** Nobody in the harvest ranks a nurse tax-relief page in the Google top 10. On the Google side this is an open, weak SERP at a small volume. On the Bing side, where this domain actually earns, the baseline is zero (section 2).

---

## 4. Competitor teardown

Six URLs, chosen to cover the **addressable half** (group F) and the routed group D, not the indemnity or pay-scale noise. Every URL was fetched live on 2026-08-26.

**Fetch outcomes, recorded in full. NONE dropped.**

| # | URL | Status | Class |
|---|---|---|---|
| 4.1 | https://medicsmoney.co.uk/nurses/ | **200** | peer (§2a rank 1) |
| 4.2 | https://taxqube.co.uk/tax-relief-for-nhs-medical-professionals/ | **200** | peer (§2a rank 18) |
| 4.3 | https://taxqube.co.uk/healthcare-workers-tax-rebate/ | **200** | peer (§2a rank 18) |
| 4.4 | https://lanop.co.uk/uniform-tax-rebate-uk-guide/ | **200** | peer (§2a rank 12) |
| 4.5 | https://www.bma.org.uk/pay-and-contracts/tax/tax-claim/claiming-for-professional-expenses | **200** | **non-peer** (§2b, trade union) |
| 4.6 | https://medicsmoney.co.uk/nhs-pension-scheme-guide-by-medics-money/ | **200** | peer (§2a rank 1) |

**Non-200 count: 0.** Unusual for this estate (batch 1 had seven, and hawsons.co.uk and nhsbsa.nhs.uk are known 403s). No teardown gap on this page, and no "themes unknown" limitation to carry into floor 8.

### 4.1 medicsmoney.co.uk/nurses/ · 4 kws / 440 vol / best p16 · PEER, THE DEEPEST TEARDOWN

This is a **dedicated nurses page from the strongest peer in the universe**, and it holds **all four** of the addressable keywords. It is the single most important competitor page for this pack, and what it turns out to be is the most important finding in the pack.

- **Title:** "nurses tax rebate guide". **H1: "Welcome to Nurses Money".** Approximately 2,500 words, a large share of which is a Google-review block.
- **H2 set, in full, and there are only two:** "The Nurses Tax Guide has now been updated for the 2025/2026 tax year." · "Start your nurses tax rebate claim today".
- **H3 set: none.** Tables: no. Calculator: no. FAQ block: no (the site links to an FAQ elsewhere).
- **Commercial shape, quoted verbatim from the live page:** *"Pay less tax by claiming a tax rebate on costs such as RCN fees, tights and other expenses. Simply fill in your details and we will instantly email you a free guide to claiming a tax rebate."*
- **Content coverage:** RCN fees, uniform items ("tights"), rebate claiming. **Does NOT mention:** NMC registration, P87, the four-year time limit, self-employed / agency / bank nurse status, NHS pension, or repayment agents.

**Judgement, and it is the finding the whole pack turns on.**

**Medics Money, the strongest peer on this map, runs its nurse audience as a separate sub-brand, "Nurses Money", whose entire proposition is a tax rebate claim.** Its H1 is a brand welcome, its only substantive H2 is a call to start a rebate claim, and its lead magnet is a guide delivered against an email capture. It holds all four addressable keywords at positions 16, 16, 17 and 26 with **two headings and no structure at all**.

Three consequences:

1. **This is the exact commercial shape C1 row 23 forbids us, occupied by the best peer we have.** They monetise a PAYE audience the only way a PAYE audience naturally monetises. We cannot, and standing constraint 2 means we would not even if this row were CLEAR. The page we build is therefore **not a better version of theirs**. It is a categorically different page aimed at the same query, and that difference is the whole reader-facing differentiator (see 4.7).
2. **They are beatable on substance trivially, and not on domain.** Two headings, no tables, no FAQ, no P87, no time limit, no status fork, and a heavy review block. Any page that answers the question properly outclasses it on every editorial measure in the language spec. That it still sits at 16 is a domain-authority fact, not a content fact.
3. **They leave the entire self-employed, agency and bank nurse segment untouched.** They do not mention employment status at all. That segment is precisely the one C1 restricts our lead route to. **The audience our fence forces us into is the audience the strongest peer has not written for.** That is the single most useful thing in this teardown.

### 4.2 taxqube.co.uk/tax-relief-for-nhs-medical-professionals/ · 2 kws / 220 vol / best p24 · PEER

- **Title:** "Tax Relief for NHS Medical Professionals | Chartered Accountants London". H1 the same. ~1,100 words.
- **H2/H3:** "What can I claim an NHS tax rebate for?" · "What can a Nurse claim a tax rebate for?" · "How to claim your Nurses Tax Rebate" · "Looking for a Specialist?" · "Our Expert Team Can Help".
- Tables: no. Calculator: no. FAQ: no.
- **Mentions NMC (expanded as Nursing and Midwifery Council) and RCN explicitly.** Professional subscriptions covered at length. States a uniform/laundry flat rate of **"£100 per year"**. States the four-year window ("previous four years"). **Does not mention P87.** Does not mention repayment agents.
- **Commercial shape:** rebate-framed throughout, including *"Find out today what you can claim for and do not miss out on the money you're owed"* and *"we've helped Nurses, porters, care workers"*. No contingent fee or deed of assignment is stated on the page, and it does direct the reader toward HMRC. **Rebate-shaped positioning without a stated contingent-fee mechanic.**
- **Judgement.** The most directly comparable page to the one we would write, and the most useful warning in the teardown. **Its stated £100 flat rate conflicts with lanop's £125 for NHS nurses and midwives (4.4).** Two peers, two numbers, and this is exactly why `BATCH2_INDEX.md` §5 gates the flat-rate figures on a primary-source read. **Neither figure may be taken from a competitor page. See 7.5.** Note also that this page is the reason `nurse tax relief` sits at 24 rather than higher: it is the best any-domain position on that keyword and it is a thin 1,100-word service page.

### 4.3 taxqube.co.uk/healthcare-workers-tax-rebate/ · 2 kws / 220 vol / best p44 · PEER

- **Title:** "Healthcare workers Tax Rebate | Chartered Accountants London". H1: "Healthcare workers Tax Rebate". ~1,100 words.
- **H2/H3, all question-form:** "Can I Deduct Professional Fees?" · "Can I Claim Tax Relief for the Cost of Shoes and Tights?" · "What about tax deductions for laundry expenses?" · "Can I get a tax deduction for business miles?" · "Can I claim Tax Relief for Specialist Equipment?"
- Tables: no. Calculator: no. FAQ: no structured block (though the H2s are effectively an FAQ).
- Names "Royal College of Nursing, the British Medical Association, and Unison". States flat rates of **£6 (tights), £12 (shoes), £125 (laundry for specific roles)**. States the four-year backdating limit repeatedly. No P87. No repayment-agent warning.
- **Commercial shape: informational, with a free initial consultation.** No contingent-fee rebate service in evidence on the page.
- **Judgement.** The best heading set in the teardown for our purposes: five reader-voice questions, no self-promotion in any of them, and it is the closest any competitor comes to the language spec's **B2** and **B4**. It is also a second, different set of flat-rate figures (£6 / £12 / £125 against 4.2's £100 and 4.4's £125 / £60 / £185), which reinforces 7.5. **Its content is almost entirely O7's territory, and that is worth noticing: the page that most resembles what a nurse tax-relief page naturally becomes is a page this pack is forbidden to write.**

### 4.4 lanop.co.uk/uniform-tax-rebate-uk-guide/ · 3 kws / 330 vol / best p40 · PEER. **THE STRUCTURAL FINDING.**

- **Title / H1:** "Uniform Tax Rebate UK 2026: Eligibility, Amount, and How to Claim". **3,500 to 4,000 words**, the longest page in the teardown.
- **H2/H3 set, in full:** What Is a Uniform Tax Rebate? · Who Qualifies for a Uniform Tax Rebate? · What Counts as a Work Uniform? · Uniform Tax Rebate Amount: How Much Can You Claim? · Step-by-Step Guide to Claiming · What Happens After You Submit? · How Long Does a Uniform Tax Rebate Take? · Claiming for Previous Years · Common Reasons Claims Are Rejected · How to Fix a Rejected Claim · Uniform Tax Rebate for Specific Professions · NHS Workers · Other Common Roles · Special Cases · DIY vs Using a Claims Company · Uniform Tax Rebate for Employers · Is It Worth Claiming? · Key Takeaways · FAQs · Conclusion.
- **Tables: yes, three** (eligibility, flat rates by profession, DIY versus claims company). Calculator: no. **FAQ: yes, 10+ questions.**
- States P87 as the postal route, the four-year limit, and flat rates of £60 standard, **£125 NHS nurses and midwives**, £185 ambulance staff.
- **Nurse-specific content: roughly 8 to 10% of the page**, inside "NHS Workers".
- **Commercial shape: guidance only, and actively anti-agent.** Quoted verbatim: *"Claims companies can simplify the process, but they take a cut. This is often 25% to 40% of your rebate."* And: *"Claim directly through HMRC for free skip the claims companies."*

**Judgement, and this is the second finding that shapes the pack.**

**lanop ranks for `tax relief nurses` (p40), `tax relief for nurses` (p42) and `nurse tax relief` (p48) from a UNIFORM page on which nurses occupy under a tenth of the content.** It does not have a nurses page. It has a uniform page with an "NHS Workers" subsection, and Google is matching that subsection to nurse tax-relief queries at 330 volume.

**That is direct market evidence that the nurses cluster and the uniform cluster are one competitor page family.** It is exactly why `BATCH2_INDEX.md` O7 puts the uniform, laundry and professional-subscription explanation on item 1 and leaves this page one sentence. Two independent things follow, and both are reported rather than resolved here:

1. **It vindicates the ownership map.** If this page wrote the uniform and subscription explanation, it would be building lanop's page a second time, on the same site as item 1, which is the self-competition batch 1 was punished for.
2. **It is the strongest single argument for "section, not page"** and it is dealt with head-on in section 5. The market's own best answer to `tax relief for nurses` at this volume is a subsection of a uniform guide. That is a real argument and pretending otherwise would be dishonest.

Also worth recording: **lanop is the one competitor whose commercial posture matches ours.** It tells the reader to claim free and names the 25% to 40% cut. We arrive at the same reader-facing stance for a regulatory reason rather than an editorial one, which means the differentiator in 4.7 is against medicsmoney and taxqube, not against lanop.

### 4.5 bma.org.uk/pay-and-contracts/tax/tax-claim/claiming-for-professional-expenses · 2 kws / 220 vol / best p31 · NON-PEER, read for vocabulary and heading patterns only

`competitor_universe_2026-08-26.md` §2b: bma.org.uk is a trade union and professional body that "cannot be outranked on brand". **It is not a rank target. It is read here only for vocabulary and heading shape**, per the language spec Part 4 point 4.

- **Title:** "Claim tax on your BMA subscription". **H1: "Using our tax relief tool to help claim for professional expenses".** ~2,200 words.
- **H2/H3:** Claim tax back on your professional expenses · Eligible expenses for tax relief · Simplify the claims process with our tax relief tool · When to claim/large claims · Understanding your tax code · Completing the P87 tax claim form yourself.
- Tables: no. Calculator: not on this page (one is referenced separately). FAQ: no.
- **Vocabulary it uses that our corpus does not carry in nurse-facing form:** "P87 tax claim form", "four previous tax years", "HMRC-approved professional bodies", **"List 3"**, self-assessment (flagged as unsuitable for its tool), and a full tax-code interpretation block. Names BMA, GMC and Royal College subscriptions. **No mention of nurses, and no mention of repayment agents.**
- **Judgement.** Two transferable patterns and one whole theme nobody else has. The patterns: **"Understanding your tax code"** is a genuine reader question that turns a relief into a payslip observation, and **"Completing the P87 tax claim form yourself"** is the do-it-yourself framing our C1 condition requires, already proven as a heading by the biggest brand in the niche. **The theme nobody else covers is the tax code**: a PAYE claim usually arrives as a coding adjustment rather than a cheque, and no competitor in this teardown explains that. **Both belong to O8, item 1.** Recorded here as a routed finding for the conductor and for item 1's writer, not as material for this page.

### 4.6 medicsmoney.co.uk/nhs-pension-scheme-guide-by-medics-money/ · 13 kws / 1,290 vol / best p18 · PEER, but it holds group D and is NOT this page's target

- **Title / H1:** "NHS Pension Scheme Guide". ~2,800 to 3,000 words.
- **H2/H3:** How the NHS Pension works · What is a pension and why is the NHS Pension different? · How does the NHS Pension actually work? · How much does it cost to join the NHS Pension? · When can I retire? · How can I retire early? Can I buy additional pension? What's an ERRBO? · What is the McCloud judgment and what do doctors need to do about it? · NHS Pension FAQs · The NHS Pension is different to most other pensions, in a good way · Find a specialist medical accountant with Medics Money.
- **Tables: yes, two** contribution-rate tables (England and Scotland, 2024/2025). Calculator: no. **FAQ: yes, 11 questions.**
- **Nurse-specific content: essentially none.** The only nurse mention on the page is inside a testimonial: *"I would recommend them to all doctors and nurses and allied health professionals."*
- No rebate service on this page; it routes to its accountant directory.

**Judgement, brief by design.** This page holds all 13 group-D keywords, 1,290 volume, and the cluster's only peer-winnable pension row (`average nhs nurse pension`, p18), **on a doctors' page that mentions nurses once, in a quote.** It is ranking on domain and topical adjacency, not on nurse content. That is a real and cheap opportunity and **it belongs to `/nhs-pension` under O18, not to this page.** Two observations for the conductor: the contribution tables are **2024/2025**, a year and a half stale, and the page carries **11 FAQs**, above our H1 band. Recorded, routed, and not taken.

### 4.7 Does any competitor in this set operate a refund service?

**Yes, and naming it is what produces the reader-facing differentiator.**

| Page | Refund/rebate service? | Evidence |
|---|---|---|
| 4.1 medicsmoney `/nurses/` | **YES.** A sub-brand ("Nurses Money") whose only substantive H2 is "Start your nurses tax rebate claim today", with an email capture as the entry point | Quoted at 4.1 |
| 4.2 taxqube `/tax-relief-for-nhs-medical-professionals/` | **YES, in positioning.** "the money you're owed", "we've helped Nurses, porters, care workers", "How to claim your Nurses Tax Rebate" as an H2. No contingent fee or assignment stated on the page | Quoted at 4.2 |
| 4.3 taxqube `/healthcare-workers-tax-rebate/` | No. Informational, free initial consultation | 4.3 |
| 4.4 lanop `/uniform-tax-rebate-uk-guide/` | **No, and explicitly against.** "Claim directly through HMRC for free skip the claims companies"; names the 25% to 40% cut | Quoted at 4.4 |
| 4.5 bma | No. A member tool plus a do-it-yourself P87 route | 4.5 |
| 4.6 medicsmoney pension guide | No. Routes to its accountant directory | 4.6 |

**Two of six, including the strongest peer's dedicated nurses page, are rebate-shaped. That is the commercial shape we are declining, and the differentiator follows directly from it:**

> **The reader-facing differentiator is that this page tells a nurse how to get the money herself, names what it is worth, and does not take a cut, because it is not for sale here.** The two pages beating us on domain are trying to acquire the claim. The one page that shares our stance (lanop) reaches it as an editorial choice and buries the nurse content in a uniform guide.

This is not a marketing claim and must never be written as one. **Language spec I8 forbids comparative claims about us against a named competitor, and D3 forbids superlative self-description.** The differentiator is expressed by **what the page does** (explains, then hands the reader the route, then fences the CTA to the segment that can actually use it), never by saying that others do otherwise. **That is criterion 22 in section 7.7.**

### 4.8 Coverage checklist: union of their heading themes, minus what we would have

Twenty-four themes across six pages. Marked for what this page's scope permits. **Every theme must end QA as covered, declined-with-reason, or belongs-to-another-page. Undecided count must be 0** (§9.9 floor 8).

| # | Theme | Seen at | Disposition |
|---|---|---|---|
| 1 | What a nurse can claim tax relief for | 4.1, 4.2, 4.3 | **BELONGS TO O7 / item 1.** One sentence, one link |
| 2 | Professional fees and subscriptions (RCN, NMC, Unison) deductibility | 4.2, 4.3, 4.5 | **BELONGS TO O7 / item 1.** One sentence, one link. See section 5 |
| 3 | List 3 / HMRC-approved professional bodies | 4.5 | **BELONGS TO O7 / item 1** |
| 4 | Uniform, tights, shoes and laundry flat rates | 4.2, 4.3, 4.4 | **BELONGS TO O7 / item 1.** No figure here. Competitors disagree on it anyway (4.2 £100 vs 4.4 £125) |
| 5 | Mileage between sites | 4.3, 4.5 | **BELONGS TO** the frozen `/blog/medical-professional-expenses-what-is-claimable` and item 1. Declined |
| 6 | Specialist equipment | 4.3, 4.5 | Same. Declined |
| 7 | Training and course fees | 4.5 | Same. Declined |
| 8 | Step-by-step how to claim | 4.1, 4.2, 4.4 | **BELONGS TO O8 / item 1** |
| 9 | The P87 form, completing it yourself | 4.4, 4.5 | **BELONGS TO O8 / item 1.** One sentence, one link |
| 10 | Claiming for previous years / the four-year limit | 4.2, 4.3, 4.4 | **BELONGS TO O8 / item 1** |
| 11 | How long a claim takes / what happens after you submit | 4.4 | **BELONGS TO O8 / item 1.** Declined here |
| 12 | Common reasons claims are rejected, and how to fix one | 4.4 | **BELONGS TO O8 / item 1.** Declined here. Genuinely good content and genuinely not ours |
| 13 | **DIY versus using a claims company; agents take 25% to 40%** | 4.4 | **OURS, capped at C1-4: one or two sentences plus a link.** No section, no table, no percentage comparison |
| 14 | **Understanding your tax code (a PAYE claim arrives as a coding change)** | 4.5 | **BELONGS TO O8 / item 1.** Flagged to the conductor at 4.5 as the theme no other competitor covers |
| 15 | Self-assessment as the alternative route | 4.5 | **BELONGS TO O8 / item 1.** One sentence |
| 16 | **Which nurses are PAYE and which are self-employed, agency or bank** | **NOBODY** | **OURS, and this is the page.** See section 5 |
| 17 | **What changes when a nurse has more than one employer or works bank shifts** | **NOBODY** | **OURS** |
| 18 | **When a nurse actually needs an accountant rather than a form** | **NOBODY** | **OURS.** This is the C1-2 fork stated as reader value |
| 19 | NHS pension for nurses | 4.6 | **BELONGS TO O18 / `/nhs-pension`.** One sentence, one link |
| 20 | Nurse maternity pay | keyword rows only, group G | **BELONGS TO O11 / item 4.** Routed, not required |
| 21 | Indemnity cover for nurses | keyword rows, group C | **DECLINED as a product**, per 3.5. Permitted only as deductibility inside 17/18 |
| 22 | Employers' side of the flat rate | 4.4 | **DECLINED.** Off-audience |
| 23 | "Is it worth claiming?" | 4.4 | **BELONGS TO O7 / item 1.** Declined here |
| 24 | Key takeaways / conclusion furniture | 4.4 | N/A, site furniture, not a theme |

**Count the dispositions. Of 24 competitor heading themes, exactly THREE are this page's (16, 17, 18), one more (13) is a capped one-liner, thirteen belong to another page, six are declined and one is furniture.** That is the ownership fence expressed as a number, and it is the input to section 5.

---

## 5. Whitespace, and the honest page-versus-section verdict

`BATCH2_INDEX.md` instructs this section to answer whether enough is left for a page, and states that "no" is a legitimate and better finding than a thin page. So the verdict comes first.

### 5.1 THE VERDICT

**Recommendation: BUILD IT AS ONE PAGE, but the page must be RE-CUT. As literally titled it should not be built.**

**The page as its URL describes it, "nurse tax relief and professional subscriptions", is a page about O7's fact with a nurse noun in front of it.** Professional-subscription relief under ITEPA 2003 s.343 and List 3 is owned by item 1. Uniform and laundry are owned by item 1. How to claim is owned by item 1. The general deduction list is owned by a frozen page. Section 4.8 counts it exactly: three of twenty-four competitor themes survive the fence. **If the writer treats the URL as the brief, the page will be written out of other pages' facts, will trip V3, and will be the second uniform-and-subscriptions page on the same site as item 1. That is a worse outcome than not building it.**

**But three things survive the fence, and they are not small, and nobody in the market has them:**

1. **The employment-status fork.** Which nurses are PAYE-only, which are agency, which are bank, which are genuinely self-employed (aesthetics and cosmetic nursing, nurse-led private clinics, independent midwifery, tissue-viability and occupational-health consultancy, training and assessment work), and what changes at each. **Not one of the six competitor pages mentions employment status at all.** medicsmoney's dedicated nurses page does not have the word. It is theme 16 in 4.8 and it is held by nobody.
2. **What actually changes for a nurse with more than one payroll.** Bank shifts alongside a substantive post, two PAYE employers, an emergency or BR code on the second, agency work run through an umbrella company. Theme 17, held by nobody.
3. **When a nurse needs an accountant rather than a form.** Theme 18, held by nobody, and it is the C1-2 fence restated as the most useful sentence on the page.

**Those three are the page.** They are the honest answer to the query `tax relief for nurses` for the minority of nurses for whom the flat-rate answer is not the whole answer, and they are the only part of this topic that is genuinely ours. **The page is therefore not a nurse tax-relief page. It is a "which kind of nurse are you, and what does that change" page that answers the tax-relief query on the way through** and hands the relief mechanics to item 1 in one sentence and a link.

**Why one page and not a section, given lanop's evidence.** 4.4 is a real argument for a section: the market's best-performing answer to these four keywords is an "NHS Workers" subsection of a uniform guide. Three reasons it does not win here:

- **The C1 fence cannot live in a section.** Item 1 is a cross-profession page targeting 55,860 volume, aimed at every uniformed worker in the country, most of them PAYE. Bolting a nurse-only employment-status fork and a segment-restricted CTA onto it would either fence item 1's whole CTA (wrong, it is not a nurses page) or leave the fork sitting in a section whose page-level CTA contradicts it (a C1-2 failure). **The condition needs a page whose CTA it can govern end to end.**
- **A section on item 1 would be O7 writing the nurse audience for itself**, which is exactly the V4 hub failure in the other direction and leaves the ABSORB row with no surface of its own.
- **Reversibility.** One file is the cheapest thing in the estate to move, delete or port to `generalist` (the tied runner-up host, section 1). A section inside a 55,860-volume page is not.

**What it should be instead, if the owner rejects the re-cut.** State it plainly so the alternative is on the record: **an "NHS Workers" style subsection inside item 1, plus the two-to-four-sentence nurse audience paragraph item 2 already owes under O15, and no seventh page in the batch.** That is lanop's shape, it would cover the 440 volume, and it would forgo the C1-compliant lead route entirely, which for a 40/mo niche is a defensible trade. **It is not the recommendation, but it is a real option and it costs nothing to take.**

**One thing the sizing does not support, and it is worth saying because C2 permits it.** `C2_PLACEMENT.md` sizes row 23 at "section + 1-2 pages". **The harvest supports ONE page, not two.** The addressable core is four word orders of one phrase at 440 volume, of which V1 permits two on any page. A second page would be a page per word order, which §9.3 forbids. **One page, and the cluster is covered.** If it earns, widen from measured demand.

### 5.2 The whitespace, itemised

1. **Nobody segments the audience. Nobody.** Six pages, and the words "self-employed", "agency" and "bank" do not appear on any of them in a status sense. The strongest peer's dedicated nurses page (4.1) has two headings and neither is about who the reader is. **This is the largest single piece of open whitespace in the topic and it happens to be the exact thing our regulatory fence forces us to write.** That coincidence is the reason this page is worth building at all.
2. **Nobody says what a nurse with two payrolls should expect.** Bank and agency work alongside a substantive post is close to normal in nursing, and it produces a second tax code, an occasional overpayment, and sometimes a self-assessment obligation. Not one page in the teardown raises it.
3. **Nobody tells a PAYE nurse plainly that she does not need anyone.** lanop comes closest ("Claim directly through HMRC for free") but it is one line inside a 4,000-word guide about uniforms. **A page whose central act is to send most of its readers away with the answer is a page no rebate-funded competitor can write.** That is a structural advantage, not a rhetorical one.
4. **The flat-rate figures are contested in the market and nobody says so.** 4.2 says £100. 4.3 says £6 / £12 / £125. 4.4 says £60 / £125 / £185. **This page must not adjudicate it** (it is O7's), but it is worth recording for item 1's writer that two peers disagree and that neither is a source. See 7.5.
5. **A worked example is open, and cheaply.** Language spec Part 4 point 3: zero of nine peer pages read for the spec carry a worked example with figures, and **none of the six in this teardown carries one either** (4.4's "£125 x 4 = £500" is arithmetic in a sentence, not a worked example with a persona and inputs). **But G1 says a page carries exactly one worked example only where its topic involves a calculation, a taper or a band.** The re-cut topic is procedural and status-based, not arithmetic, and the only arithmetic available is O7's flat rate. **The correct outcome for this page is probably NO worked example, and that must be a recorded decision rather than an omission.** See criterion 18.
6. **The tax-code point (theme 14) is genuinely unoccupied outside BMA** and it is O8's. Flagged to the conductor, not taken.

### 5.3 What is NOT whitespace, stated so a writer does not chase it

The four addressable keywords are held at 16, 16, 17 and 24 by **thin** pages. That looks like whitespace and is not, in the way that matters: the positions are domain-authority positions, on a domain that Google indexes at 16%. **This page will not outrank medicsmoney on Google by being better, inside 90 days or plausibly at all.** Section 8 is written accordingly.

---

## 6. Our current position

**We have no nurse surface of any kind.** Verified, READ ONLY, nothing under `Medical/web/` edited:

```bash
# run 2026-08-26 in C:/Users/user/Documents/Accounting
ls Medical/web/content/blog/*.md | wc -l          # => 79
grep -ril "nurse" Medical/web/content/blog/*.md   # => 5 files
ls Medical/web/src/app                            # => (full listing below)
ls -d Medical/web/src/app/for-*                   # => 4 directories
```

**79 blog posts, all doctor-shaped.** The word "nurse" appears in exactly **5** of the 79, and in every one of them it is staff-cost or practice-income vocabulary, never an audience:

| File | What "nurse" is doing there |
|---|---|
| `arrs-reimbursement-employing-pcn-staff-tax.md` | ARRS reimbursement for practice-employed roles |
| `enhanced-services-gp-practice-income-tax.md` | Practice income from nurse-delivered services |
| `gp-accountant-services-complete-guide.md` | Practice staffing |
| `gp-payroll-services.md` | Practice payroll (**and this page is FROZEN to 2026-09-10**) |
| `pcn-funding-network-contract-des-explained.md` | PCN workforce |

**In every case the nurse is the GP practice's employee, an item of cost. Never the reader.** That is the corpus's honest position: it has 79 pages and none of them is written to a nurse.

**Four `/for-*` persona hubs, and there is no nurse hub.** Full `Medical/web/src/app` listing: `about`, `admin`, `api`, `blog`, `book`, `calculators`, `complete`, `contact`, `cookie-policy`, `embed`, `feed.xml`, `for-consultants`, `for-gps`, `for-junior-doctors`, `for-locum-doctors`, `free-practice-health-check`, `locations`, `medical-guides`, `nhs-pension`, `privacy-policy`, `research`, `resources`, `services`, `terms`, `thank-you`, plus route files.

**The four persona hubs are `/for-consultants`, `/for-gps`, `/for-junior-doctors`, `/for-locum-doctors`. All four are doctors.** There is no `/for-nurses`, and **this pack does not propose one.** Same reasoning as the vets ruling in `BATCH2_INDEX.md` §2b point 4: the risk in a tied-host, 40/mo, C1-CONDITIONAL row is a **prominence** risk, and prominence is what we decline to give it. One blog-namespace page, reachable from item 2's O15 routing paragraph. If it earns, the hub question can be reopened with data; the reverse is not true.

**The relevant vocabulary is absent too**, checked the same way: `nurse tax relief`, `tax relief for nurses`, `nurses tax relief`, `tax relief nurses`, `nhs pension for nurses`, `nurses pension`, `nhs nurses pension scheme`, `average nhs nurse pension`, **`NMC`**, **`RCN`**, `repayment agent` and `deed of assignment` each return **0 of 79 files**. "professional subscription" returns 8 files and "List 3" returns 18, both doctor-facing (GMC, BMA, Royal College), which is precisely O7's and the frozen expenses page's territory.

**The frozen page that constrains this one.** `/blog/medical-professional-expenses-what-is-claimable` is **FROZEN to 2026-09-10** and is the long-run owner of the general deduction list. `house_positions.md` §8 is its ground truth and already covers indemnity, the GMC fee (deductible, amount UNVERIFIED), Royal College and BMA subscriptions on List 3, CPD, equipment via AIA, mileage at 55p/25p for 2026/27, home office and accountancy fees. **This page must not become a second deduction list.** If a draft contains an enumerated "what a nurse can claim" list, it has become one. That is criterion 20.

**What we do have that helps.** The site carries a deep, doctor-specific expenses and NHS-pension corpus, `house_positions.md` locks the deductibility *shape* for a regulator fee, and `/nhs-pension` exists as the O18 target. The page is not starting from nothing; it is starting from nothing **in the nurse audience**, which is different and is the actual finding.

---

## 7. Deterministic acceptance criteria

### 7.1 Exact phrases that must appear (verbatim, case and punctuation normalised): **2 required**

The addressable set is four word orders of one idea (3.6). **Language spec V1 caps a page at two word orders per idea, hard.** So the requirement is two, and the other two are deferred by rule, not omitted.

**Required, 2 of 2. Both are peer-winnable at the best peer position in the cluster (medicsmoney p16).** Placement in `metaTitle`, `h1`, an `<h2>`, an `<h3>`, an `faqs[].question`, an `faqs[].answer`, `keyTakeaways`, `summary` or body prose, per B3: at least one in a heading and one in an FAQ question or body sentence.

1. **tax relief for nurses** (110, medicsmoney p16, peer-winnable)
2. **nurses tax relief** (110, medicsmoney p16, peer-winnable)

**Deferred under V1, 2 rows, named so the ledger balances:**
3. `tax relief nurses` (110, medicsmoney p17, peer-winnable). Third word order. **Deferred by V1, not by choice.** If it lands incidentally inside a natural sentence that already carries row 1, that is acceptable and is not a defect; deliberately engineering a fourth placement is.
4. `nurse tax relief` (110, taxqube p24, not peer-winnable). Fourth word order. **Carried by the slug**, `nurse-tax-relief-professional-subscriptions`, which places it in the URL without spending a body placement. Recorded so it is not read as an omission.

**Routed to another page, 16 rows** (never targeted here): the 13 group-D NHS-pension rows to `/nhs-pension` (O18), the 3 group-G maternity rows to item 4 (O11).

**Out of scope, 52 rows:** group A pay and salary **12** (lane-negative), group B clinical and CPD **17**, group C indemnity product **12**, group E practice HR **11**. **12 + 17 + 12 + 11 = 52.**

**Ledger for floor 7:** 2 required + 2 deferred-under-V1 + 16 routed-to-another-page + 52 out-of-scope = **72.** Matches the cluster count in 3.1 exactly. **Balances.**

**A note the writer must read.** Two required phrases is the smallest coverage requirement in the batch, and that is correct, not lazy. **V6: vocabulary placement never overrides the page's own topic.** With a fence this tight, the failure mode on this page is not under-placement, it is a writer importing item 1's facts to have something to place phrases into. **Nothing in 7.1 is a licence to write O7's or O8's content.**

### 7.2 Equity preservation: **0 queries, vacuous, recorded not skipped**

The page does not exist. Google query rows: 0 by construction. Bing: 648 site-level queries pulled 2026-08-26, **0 matching `(nurse|nursing|midwif|midwiv)`** (section 2). **There is no DO-NOT-LOSE query. Floor 5 passes trivially and is recorded as vacuous rather than omitted.**

### 7.3 Protected elements

NET-NEW. No byte-identical requirement, no frozen structure, K2 does not apply. Fixed at creation: `slug` = `nurse-tax-relief-professional-subscriptions`, `canonical`, the file path, and the frontmatter keys the build requires (`date`, `category`, `image`, `imageCredit` **as a single key, never duplicated**, `altText`, `schema`). **Nothing else under `Medical/web/` may be edited by this page's writer**, including item 1's file, which is being written concurrently.

### 7.4 Arithmetic that must recompute

**The expected outcome on this page is that there is almost no arithmetic, and that is by design, because every figure this topic wants belongs to O7.**

| Statement | Source | Must equal |
|---|---|---|
| Uniform / laundry flat-rate amounts | **O7, item 1** | **ABSENT. No figure.** Competitors disagree (4.2 £100 vs 4.3 £6/£12/£125 vs 4.4 £60/£125/£185) and none is a source |
| NMC or RCN annual fee | Not in house positions | **ABSENT.** "Confirm the current figure at source". See 7.5 |
| GMC annual retention fee | `house_positions.md` §8, §10 | **ABSENT.** Deductible status may be stated. **No figure. Hard fail F5** |
| Global Sum, QOF point value | `house_positions.md` | **ABSENT.** Off-topic. **Hard fail F5 if present** |
| Any tax rate used to size a relief | `house_positions.md` §5, §9 | If stated: basic 20%, higher 40%, additional 45%, personal allowance £12,570, higher-rate threshold to £125,140, all tagged **2026/27** per F1 |
| Mileage, if it appears at all | `house_positions.md` §8 | **55p** first 10,000 business miles, **25p** thereafter, 2026/27 (rose from 45p on 6 Apr 2026). Prefer absence: it is the frozen expenses page's fact |
| Four-year claim window | O8, item 1 | May be stated **once, in a single clause, with a link**. No worked backdating example |
| Class 2 / Class 4 NIC, if the self-employed fork states them | `house_positions.md` §8 | Class 4 **6% / 2%** (never the old 9%). **Class 2 is no longer payable from 6 Apr 2024** above the small-profits threshold |

**If the page states any figure, it must state its inputs inline so a checker can recompute without external data, and it must carry its tax year or effective date in the same sentence (F1).**

### 7.5 Statutes and sources to re-verify at source before publication

`BATCH2_INDEX.md` §5 records this page (item 7) as gated on a house-positions extension. **`docs/medical/house_positions.md` carries NO position on NMC or RCN subscription amounts or their List 3 status.** Confirmed 2026-08-26 by `grep -n -i "NMC\|RCN\|List 3" docs/medical/house_positions.md`: every List 3 mention is doctor-facing (GMC, BMA, Royal College); **"NMC" and "RCN" do not appear in the file at all.**

| What must be read at primary source | Where | Why, and what happens if it cannot be pinned |
|---|---|---|
| **HMRC List 3, the approved professional organisations list: whether the NMC and the RCN appear on it, and in what form** | HMRC "Approved professional organisations and learned societies" (List 3), current published list | **The core factual prerequisite for this page and for item 1.** House positions has no position. Until read, the page may not assert that either body's fee is deductible |
| **NMC published annual registration fee** | nmc.org.uk fees page | **Amount. If it cannot be pinned at source, it is framed as "confirm the current figure at source" and NEVER asserted** |
| **RCN published membership fee** | rcn.org.uk membership fees page | Same. Note RCN membership is a union subscription and its List 3 treatment is not assumable from NMC's |
| ITEPA 2003 s.343 (fees and subscriptions to professional bodies) | legislation.gov.uk | O7's statute. Cited only if the one-sentence handoff needs it, which it probably does not |
| Income Tax (Repayment Agents) Regulations 2023, and the deed-of-assignment ban | legislation.gov.uk / HMRC guidance | Underpins C1-1 and C1-4. **Read to get the warning right; do not explain the regime on the page** (1.3) |
| HMRC flat-rate expenses (EIM32712 / EIM32485 family) and the NHS occupational-group rows | HMRC EIM | **O7's, item 1's prerequisite. Listed here only so this page's writer knows the figures are contested and unavailable** |
| Employment status: agency worker, bank worker and umbrella arrangements | HMRC ESM / agency legislation ITEPA Pt 2 Ch 7 | Underpins the C1-2 fork, which is this page's own substance and must be right |

**THE NMC FEE HAS THE SAME SHAPE AS THE GMC FEE, AND MUST BE HANDLED THE SAME WAY.**

`house_positions.md` §8 and the Verification log lock the GMC fee as **deductible, amount UNVERIFIED**, having removed a previously stated figure as unsupported after both GMC sources returned HTTP 403. The practical writing rule there is: state that the fee is deductible, **without quoting an amount**.

**Almost certainly the same applies to the NMC fee: the deductibility question is a List 3 question and is settleable, the amount is an annually moving figure that must be read at source.** The page's default posture is therefore: **name the fee, say what determines its deductibility, do not state a number, and point the reader at the NMC's own fees page.** If List 3 cannot be read at source, the page does not assert deductibility either, and says what it can confirm. **A figure for the NMC or RCN fee sourced from a competitor page (4.2 names both bodies) is a hard fail: competitor pages are not sources.**

**UNVERIFIED figures banned outright on this page, hard rule F5:** the **GMC annual retention fee**, the **Global Sum per weighted patient**, and the **QOF point value**. The topic requires none of them, so the expected outcome is absence.

### 7.6 The floors

| Floor | Requirement on this page |
|---|---|
| 1. Arithmetic | Every row in 7.4. The expected state is near-total absence of figures; any figure present carries its year and recomputes |
| 2. Statute | Every source in 7.5 re-verified on the day of writing. **List 3, NMC and RCN are blocking**: without them the page cannot make a subscription claim at all |
| 3. Links | Zero broken internal links repo-wide. **The mandatory outbound links are: item 1 (O7 and O8), `/nhs-pension` (O18), item 4 (O11, only if mentioned), `/contact`** |
| 4. Coverage | The 2 phrases in 7.1 placed. Checker names any not placed |
| 5. Equity preservation | **Vacuous, 0 queries. Recorded, not skipped** |
| 6. Cluster coverage | Same matcher, 7.1 input. 2 placed, 0 unplaced |
| 7. Reconciliation balance | 2 + 2 + 16 + 52 = **72**. Must balance |
| 8. Competitor re-read | All **24** heading themes in 4.8 marked covered, declined-with-reason, or belongs-to-another-page. Undecided **0**. **No fetch-failed URLs on this page: 6 of 6 returned 200**, so there is no "themes unknown" limitation to carry |

### 7.7 THE COUNTABLE ACCEPTANCE CRITERIA

**24 criteria. 1 to 4 are the C1 hard fails and outrank everything else in this pack, including 7.1.**

**Block A: the C1 condition (criteria 1 to 8). Every one is a hard fail.**

1. **No rebate or refund service.** Zero occurrences of a service offer to obtain a refund on the reader's behalf. String search for: `no win no fee`, `% of your refund`, `percentage of your rebate`, `we claim`, `we'll claim`, `claim on your behalf`, `start your claim`, `rebate calculator`, `refund calculator`, `average refund`, `average rebate`, `how much could you be owed`, `money you're owed`. **Any hit is a hard fail.**
2. **No contingent fee.** Zero occurrences of a fee expressed as a share of an amount recovered.
3. **No deed of assignment**, nominee arrangement, or any wording under which a repayment is directed anywhere other than to the nurse.
4. **Lead route restricted, in the copy.** Every CTA on the page (body, closing, frontmatter) names **self-employed, agency or bank** nurses. Count of CTAs whose audience is unnamed or is "nurses" generally: **must be 0**.
5. **PAYE-only readers are routed away, explicitly.** The page contains at least one sentence telling a nurse whose only income is a single NHS PAYE post that she can claim directly and does not need us. **Count must be >= 1.**
6. **The employment-status fork appears before the first CTA.** Position check. A CTA above the fork is a hard fail.
7. **No benefits content.** Zero occurrences of: `universal credit`, `PIP`, `personal independence payment`, `carer's allowance`, `disability living`, `benefits calculator`, `low income scheme`, `benefit claim`, `tax credits`. Zero outbound links to any benefits checker, calculator or adviser. **Any hit is a hard fail (RAO art 89G).**
8. **Repayment-agent warning present and capped.** Sentences mentioning repayment agents or claims companies: **>= 1 and <= 2**, and a link to `/blog/nhs-uniform-tax-relief-laundry-allowance` in the same paragraph. Zero `<h2>` or `<h3>` about repayment agents. Zero explanation of the 2023 Regulations or of what a deed of assignment is. (Reconciliation rule, 1.3.)

**Block B: ownership fence (criteria 9 to 16). V3 hard fails.**

9. **O7, uniform and laundry: at most 1 sentence, plus a link.** Zero flat-rate figures. Zero `<h2>` on uniform or laundry.
10. **O7, professional subscriptions and List 3: at most 2 sentences, plus a link.** Two rather than one because the page's own URL names subscriptions and one sentence cannot both name the fee and state where the reader confirms it. **No List 3 mechanics, no ITEPA s.343 explanation, no list of qualifying bodies.**
11. **O8, how to claim: at most 1 sentence, plus a link.** Zero P87 walkthroughs, zero four-year worked backdating examples, zero "how long it takes".
12. **O11, maternity: at most 1 sentence, plus a link, or absent.** Absence is an acceptable pass.
13. **O18, NHS pension: exactly 1 sentence saying nurses are in the same scheme as doctors, plus a link to `/nhs-pension`.** Zero accrual fractions, zero normal pension ages, zero contribution tiers, zero McCloud.
14. **O1, O2, O3: at most 1 sentence each, plus a link, or absent.** Absence expected. **Zero contribution-rate tables.**
15. **O9, O10: zero figures** for the GMC retention fee, Global Sum per weighted patient or QOF point value. **Hard fail F5.**
16. **Total sentence count on all owned facts combined (criteria 9 to 14) must not exceed 8.** If it does, the page has become someone else's page. This is the single most useful number in the pack for a QA checker.

**Block C: this page's own substance (criteria 17 to 20).**

17. **The three unowned themes are present:** the employment-status fork (4.8 theme 16), the multiple-payroll point (theme 17), and when a nurse needs an accountant rather than a form (theme 18). **All 3 required.** A page missing all three has no reason to exist; that is the section-5 verdict expressed as a check.
18. **Worked example: a recorded decision, either way.** Per G1 the topic is procedural, so the expected outcome is **none**. If one is present it obeys G2 to G7 in full and uses no rate the body has not already stated with its year. **If absent, the QA record must say "declined, procedural topic, G1" rather than being silent.**
19. **No enumerated deduction list.** Zero bulleted or numbered lists whose items are categories of allowable expense. The frozen `/blog/medical-professional-expenses-what-is-claimable` owns that.
20. **The page is about nurses, not about relief.** At least half of the `<h2>` set must be about the reader (who she is, what she does, what her arrangement is) rather than about the relief. Count and report.

**Block D: language spec V1 to V6, made countable (criteria 21 to 24).**

21. **V1, two word orders per idea, hard cap.** Distinct word orders of the tax-relief idea placed verbatim: **exactly 2** (7.1). **A third deliberate placement is a defect, not thoroughness.** Also applies to `indemnity`: per 3.5, indemnity appears as tax treatment only, and **zero product comparisons, cover levels, premiums or named insurers as recommendations**.
22. **V2, never narrate the keyword research.** Zero variant lists, zero "also searched as", zero "also known as" applied to search phrasings, zero table column of alternative phrasings, zero sentence telling the reader two searches mean the same thing. **And, per 4.7, zero comparative statements about what other firms or claims companies charge beyond the single capped warning in criterion 8** (I8, D3).
23. **V3 and V4 are criteria 8 to 16. V5, rhetorical constructions:** any one construction at most **twice**; `"it is not X, it is Y"` at most **once**, and the conductor checks it across all seven batch-2 pages, not just this one.
24. **V6, vocabulary never overrides topic.** For each of the 2 required phrases, the QA record states the sentence it landed in and confirms it reads as natural English on this page's own topic. **Any phrase that would need a section built to hold it is reported UNPLACED rather than placed.** On this page, an unplaced report is an acceptable pass; a section built to hold a phrase is a hard fail.

**Plus the standing language-spec hard fails from Part 5, unchanged and not renumbered:** F5, F6/I6, I1 (em-dash), I2 (named expert or credential), I3 (regulated-activity claim), I4 (named client), I5 (our pricing), I7 (interruptive UI), G6/J4 ("Worked example" label), J2 (pipeline artefact), H5/J3 (empty FAQ heading), K4 (collapse or redirect).

**Note on I5 and the coordinator ruling.** `language_spec_2026-08-26.md` coordinator ruling 4 holds: the no-pricing rule covers **our** fees only. Naming that repayment agents typically take a share of a refund is a fact about the reader's position, not our pricing. It is still capped at criterion 8's two sentences, and per criterion 22 it must not become a percentage comparison.

---

## 8. Stated expectation

Written before the work, so the later read has something to fail.

**Engine and window.** Bing is the 14 to 28 day read, Google the 28 to 90 day read (§9.6). **Google indexes roughly 21 of 130 URLs on this site**, driven by low domain authority, not by any technical defect. **Bing indexes it fully and sends 3.4x the Google clicks.**

**Baseline, with its command.** `BingWebmasterClient().get_query_stats('https://www.medicalaccounts.co.uk')`, run 2026-08-26 13:44 UTC: **648 site-level queries, 0 matching `(nurse|nursing|midwif|midwiv)`**. Google: the URL does not exist, so 0 by construction. **The baseline is zero on both engines and there is nothing to preserve.**

**This is the smallest peer-winnable number in the batch (420 cluster-wide, and only 330 of it is this page's) on the tightest ownership fence (3 of 24 competitor themes). The honest 28-day expectation is impressions, not clicks, and no click target is set.**

- **Bing, 14 days after deploy:** the URL registers **at least 1 impression** on any phrase containing "nurse" or "nursing". This is an existence test: does the page exist in the index and does it match anything. `BATCH2_INDEX.md` §8 sets the batch target at 5 of 7 pages clearing this bar and explicitly allows two to miss; **on peer-winnable volume this is the likeliest of the seven to be one of the two.**
- **Bing, 28 days:** the URL registers **at least 3 named queries** with non-zero impressions, **at least 1 of which contains a phrase named in 7.1** (`tax relief for nurses` or `nurses tax relief`) or the slug phrase `nurse tax relief`. **No click target is set. On 440 volume across four word orders, a first Bing click inside 28 days would be a good outcome and its absence is not a failure.**
- **Google, 28 to 90 days: no expectation is set, deliberately.** On a corpus Google indexes at 16%, with the best any-domain position in this cluster at 16 and held by the strongest peer, a new page not being indexed at 28 days carries no information. Record the outcome either way; do not treat a miss as a failure.
- **Phrase coverage is the verdict, not total traffic** (§9.6 point 2). If Bing impressions on this URL rise while the phrases in 7.1 stay absent from the query set, that is recorded as **drift and a fail**, not a pass.

**LEAD-QUALITY NOTE, and it is the most important line in this section.**

Because the C1 condition restricts the lead route to **self-employed, agency and bank nurses**, and because criteria 4 to 6 require the page to send a PAYE-only nurse away, **this page is designed to convert a small minority of its readers and to deliberately decline the majority.** Enquiry volume is therefore the wrong measure and reading it as one would push the page back toward the rebate shape C1 forbids.

> **The right 90-day read is binary: did ANY enquiry arrive from a self-employed, agency or bank nurse? Not how many enquiries arrived.** One qualifying enquiry validates the fence and the routing. Zero qualifying enquiries alongside a healthy enquiry count would be the **worse** outcome, because it would mean the fork is not working and PAYE-only readers are filling in the form.

Recording that requires the lead source to distinguish the segment. `generalist_lead_source_identifier` records the `leads` table CHECK constraint as `dentists/property/medical/solicitors/general/agency`, which carries the **site** and not the **segment**. **Whether a segment field exists, or whether the read has to come from reading the enquiry text, is an open question for the conductor. This pack does not build anything to answer it, and creating any new tracking, monitor, alert or notification is out of scope and would need the owner's yes.**

**Failure trigger, written as a number, before the work (§9.6 point 3).**

> All seven batch-2 pages are net-new, so no equity-loss revert trigger applies. **The failure condition for this page is a quality one: if editorial QA raises a V1, V3, V5 or V6 finding, OR any of criteria 1 to 8 (the C1 block) fails, the page is HELD and not deployed.** The C1 block is not a quality gate, it is a regulatory one, and a failure there is not fixable by editing a sentence: it means the page is doing something the row 23 condition forbids. **Revert path: delete `Medical/web/content/blog/nurse-tax-relief-professional-subscriptions.md`. One file.**

**Tracker fields to populate at deploy time** (reuse, do not build): one `monitored_pages` row with the zero baseline above, and `blog_optimizations.target_keywords` set to the **2 phrases in 7.1**, not to the four-order family. **Registration is an owner-triggered step and has NOT been done by this pack.**

---

## Corrections and deltas

1. **The batch index's keyword count for this cluster is 69 / 9,360; the regex in this pack gives 72 / 9,570, and the 3-keyword difference is fully explained.** The index's `CASE` chain evaluates `B2-maternity` before `B2-nurses`, so `maternity nurse pay`, `maternity pay nhs nurse` and `nhs nurse maternity pay` (70 each) land on item 4. Both figures are right for their own membership rule. **Reconciled, not harmonised, and the reconciliation is arithmetic rather than judgement.** Peer-winnable (420) and peer top-10 (0) are identical under both rules.

2. **The cluster's 420 peer-winnable volume is not all available to this page.** 90 of it is `average nhs nurse pension` (medicsmoney p18), which is group D and belongs to `/nhs-pension` under O18. **This page's own peer-winnable volume is 330.** The batch index's row 7 figure of 420 is correct for the cluster and overstates this page's target by 27%. Recorded so the section-8 read is not scored against the wrong number.

3. **`C2_PLACEMENT.md` sizes row 23 at "section + 1-2 pages". The harvest supports ONE page.** The addressable core is four word orders of one phrase at 440 volume, and V1 permits two of them on any single page. A second page would be a page per word order. **One page, and the cluster is covered.**

4. **The niche map's row 23 note says "GT 26 mentions on care", meaning the `care` site's ground truth carries the nurse audience.** This pack did not test that and does not need to: `C2_PLACEMENT.md` §4 resolved the host as a `generalist`/`medical` tie decided on brand, with `care` not in contention. **Recorded as untested, not as agreed.**

5. **A whole vocabulary is missing from the harvest and it is the one this page most needs.** The 32,872-row harvest contains **zero** keywords for `agency nurse tax`, `bank nurse tax`, `self employed nurse tax`, `aesthetic nurse tax`, `independent midwife tax` or any employment-status phrasing, because **no domain among the 27 harvested runs such a page** (medicsmoney's dedicated nurses page does not contain the word "self-employed"). This is the same shape as `BATCH2_INDEX.md` §7's opticians and allied-health finding: **a gap in the competitor set, not a gap in the market.** Ranked-keyword harvesting of those 27 domains can never surface it. Filling it would need a `keyword_ideas/live` seed pass (~$0.11 for one cluster at 1,000 rows, priced from `optimisation_engine/config.py` `DATAFORSEO_COSTS`). **Not authorised by this task and not run.** It is the cheapest possible check on whether section 5's re-cut is targeting real demand, and it is worth pricing to the owner alongside §7's $1.13.

6. **The market disagrees with itself on the uniform flat rate and item 1's writer should know.** taxqube says £100 (4.2), taxqube's other page says £6 / £12 / £125 (4.3), lanop says £60 / £125 / £185 (4.4). **Three peers, three answers, none of them a source.** This page states no figure, so the conflict does not bite here, but it is direct evidence for `BATCH2_INDEX.md` §5's gate on item 1 and it should be read before item 1 states a number.

7. **Two competitor themes worth the conductor's eye, both routed away from this page.** The **tax-code theme** (4.5, "Understanding your tax code": a PAYE claim usually arrives as a coding change, not a cheque) is covered by no other competitor and belongs to O8. The **rejected-claims theme** (4.4, "Common Reasons Claims Are Rejected" plus "How to Fix a Rejected Claim") is held by one peer, is genuinely useful, and belongs to O8. Neither is taken here.

8. **medicsmoney's NHS pension guide (4.6) carries 2024/2025 contribution tables and 11 FAQs**, and holds 1,290 volume of nurse-pension vocabulary on a page that mentions nurses once, inside a testimonial. **That is a cheap, real opportunity for `/nhs-pension` and a batch-3 delta**, not batch-2 scope. No action proposed here.
