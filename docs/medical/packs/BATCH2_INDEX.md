# Medical corpus, batch 2 research packs: net-new ground

**Built:** 2026-08-26 · **Spec:** `docs/_engines/REWRITE_PROGRAM.md` §9.5 (eight sections, fixed order) · **Frozen inputs:** `docs/medical/cluster_dossier_2026-08-26.md`, `docs/medical/competitor_universe_2026-08-26.md`, `docs/medical/language_spec_2026-08-26.md`, `docs/medical/house_positions.md`, `expansion_research/nichemap_2026-08-25/`
**Status:** preparation only. No page content written. Nothing under `Medical/web/` edited. Nothing committed, deployed or indexed. No row written to `monitored_pages`. No monitor, alert, cron or scheduled job created. **No new DataForSEO calls: $0.00 additional spend.**

Repo state at build time: `git rev-parse HEAD` = `77cc1bedc8e8c2a5dea8297bb7e71f28e33440cf`.

Batch 1 fixed and deepened twelve pages that already existed. **Batch 2 is seven pages the site does not have at all.** Every one is a new URL. Every equity register is therefore empty, and each pack says so rather than omitting the section.

---

## 1. The batch

Seven pages. All net-new. Ordered by **peer-winnable volume**, per owner decision 21 of 2026-08-26: peer-winnable orders the work and never excludes any of it, because we take on Bing what we cannot take on Google.

| # | New page | Cluster | Uniq kws | Total volume | **Peer-winnable** | Peer top-10 kws | Competitor pages to tear down | Pack |
|---|---|---|---|---|---|---|---|---|
| 1 | `/blog/nhs-uniform-tax-relief-laundry-allowance` | uniform tax rebate family | 118 | 55,860 | **27,550** | 18 | 2 | `PACK_blog__nhs-uniform-tax-relief-laundry-allowance.md` |
| 2 | `/blog/healthcare-accountants-uk` | healthcare accountants near me | 27 tight / 67 dossier | 4,310 tight / 10,110 dossier | **4,240** | 24 | 30 | `PACK_blog__healthcare-accountants-uk.md` |
| 3 | `/blog/opting-out-of-the-nhs-pension-scheme` | pension opt out | 24 | 18,880 | **4,280** | 0 | 3 | `PACK_blog__opting-out-of-the-nhs-pension-scheme.md` |
| 4 | `/blog/maternity-pay-and-maternity-allowance-for-doctors` | maternity allowance | 397 | 244,120 | **4,220** | 0 | 14 | `PACK_blog__maternity-pay-and-maternity-allowance-for-doctors.md` |
| 5 | `/blog/adjusted-net-income-doctors-60-percent-tax-trap` | adjusted net income / marginal traps | 32 | 10,360 | **1,900** | 3 | 5 | `PACK_blog__adjusted-net-income-doctors-60-percent-tax-trap.md` |
| 6 | `/blog/accountants-for-vets-veterinary-practice-tax` | vets (niche-map ABSORB #21) | 11 | 1,260 | **740** | 6 | 6 | `PACK_blog__accountants-for-vets-veterinary-practice-tax.md` |
| 7 | `/blog/nurse-tax-relief-professional-subscriptions` | nurses (niche-map ABSORB #23) | 69 | 9,360 | **420** | 0 | 6 | `PACK_blog__nurse-tax-relief-professional-subscriptions.md` |

**One deliberate exception to the ordering.** Item 2 is the only page in the batch that a reader can convert on. It carries the highest-confidence topic on the whole consensus map (24 of 27 harvested domains give it a page) and this site converts at roughly one lead per 46 sessions, the best rate in the estate. It sits at #2 on peer-winnable and it should ship in the same window as #1, not after a gap. Sequencing orders the work; it does not stagger the deploy.

### Provenance for every column

Peer set = the 22 domains classified peer-winnable in `docs/medical/competitor_universe_2026-08-26.md` §2a. Peer-winnable = the deduplicated volume of keywords where **a peer** (not bma.org.uk, nhsbsa, themdu, forvismazars, aisma, johnstoncarmichael, england.nhs.uk, wesleyan) holds position <= 20.

```sql
-- run 2026-08-26 via `python scripts/_q.py <file.sql>`
with peers as (select unnest(array['medicsmoney.co.uk','sial-accountants.co.uk','kudosaccounting.co.uk',
 'bw-medical.co.uk','pricebailey.co.uk','practiceindex.co.uk','sandisoneasson.co.uk','ramsaybrown.com',
 'r-m-t.co.uk','nicholsmedical.co.uk','gorillaaccounting.com','lanop.co.uk','accountants4nhsdoctors.co.uk',
 'hawsons.co.uk','bhp.co.uk','freestyleaccounting.com','simpkinsedwards.co.uk','taxqube.co.uk',
 'coveneynicholls.co.uk','fkca.co.uk','medifintech.co.uk','rbp.co.uk']) d),
c as (select *, case
  when ranked_keyword ~ '(uniform|laundr)' and ranked_keyword ~ '(tax|rebate|refund|relief|claim|allowance|hmrc)' then 'B2-uniform'
  when ranked_keyword ~ '(opt out|opt-out|opting out)' and ranked_keyword ~ '(pension|nhs|nation)' then 'B2-optout'
  when ranked_keyword ~ '(maternity|paternity|shared parental|adoption pay)' then 'B2-maternity'
  when ranked_keyword ~ '(adjusted net income|adjustable net income|adjusted income|marginal (rate|tax)|tax trap|60 tax|60 percent tax|personal allowance taper)' then 'B2-ani'
  when ranked_keyword ~ '(veterinar|\mvet\M|\mvets\M)' then 'B2-vets'
  when ranked_keyword ~ '(nurse|nursing|midwif|midwiv)' then 'B2-nurses'
  when ranked_keyword ~ '(healthcare account|medical account|medic account|accountants? for (doctors|gps|medical|healthcare|nhs|consultants|surgeons)|(doctor|gp|medical|healthcare|nhs) account|specialist medical account)' then 'B2-nearme'
  else null end cl from dataforseo_competitor_data where site_key='medical'),
k as (select cl, ranked_keyword, max(search_volume) v,
   min(position) filter (where competitor_domain in (select d from peers)) best_peer_pos
 from c where cl is not null group by 1,2)
select cl, count(*) uniq_kws, sum(v) uniq_vol,
 sum(v) filter (where best_peer_pos<=20) peer_winnable_vol,
 count(*) filter (where best_peer_pos<=10) peer_top10_kws
from k group by 1 order by uniq_vol desc;
```

Source table: `dataforseo_competitor_data`, `site_key='medical'`, `date_pulled='2026-08-26'`, 32,872 persisted rows, 27 domains, no volume floor. **Already paid for in the dossier task ($4.92048). This task spent $0.00.** Each pack prints its own selection regex in section 3, so its counts are re-derivable and its divergence from the dossier's `Kws` column is visible rather than silent.

---

## 2. Why these seven, and what was left out

### Included

1. **Uniform tax relief** is the biggest peer-winnable number on the entire NO-PAGE list once peer-winnability is re-derived against the §2a peer set, and the field is two pages deep. See §6, correction 1.
2. **Healthcare accountants** is the highest-confidence topic on the map (24 of 27 domains) and the only commercial-intent page in the batch.
3. **Opting out of the NHS pension** is 18,880 volume that a Google-winnability filter would have discarded. It is not discarded. It is also, on re-derivation, not zero peer-winnable. See §6, correction 2.
4. **Maternity** is the largest raw-volume cluster in the harvest at 244,120, almost all of it BMA-held employment-pay vocabulary. The accountancy-shaped slice (Maternity Allowance for self-employed and locum GPs, SMP versus MA, the tax and pension treatment of statutory leave) is genuinely ours and one peer holds it.
5. **Adjusted net income** is the connective tissue of the whole pension-tax family and the only batch-2 cluster held by peers rather than institutions on Google (hawsons at position 9, medicsmoney at 8).
6. **Vets** and 7. **Nurses** are the two of the four niche-map ABSORB clusters that have enough harvested data to pack honestly.

### Excluded, named so the absence is stated rather than silent

| Left out | Why |
|---|---|
| **Opticians / optometrists** (niche-map ABSORB #20) | **NOT PACKABLE.** The 32,872-row harvest contains **3** optician keywords totalling 400 volume, and all three are navigational brand terms for one Price Bailey client case study (`d r grey opticians`, `dr grey opticians`) plus one MDU clinical page (`ophthalmic negligence`). There is no optician-accounting vocabulary in the harvest because no domain in the competitor set holds any. Writing a pack on that is writing on thin air. Cost to fill in §7. |
| **Therapists / allied health** (niche-map ABSORB #22) | **NOT PACKABLE.** 10 keywords, 590 volume, every one of them MDU clinical-guidance or Practice Index practice-manager HR content (`safeguarding nursing`, `paramedics in gp surgeries`, `duty of care paramedic`). Zero allied-health-accounting vocabulary. Same reason, same fix. |
| **Payroll** (NO-PAGE row 7, 5,490 volume, 910 peer-winnable) | The dossier prescribes it as a section on `/blog/gp-payroll-services`, which is **frozen to 2026-09-10**. Building a competing new payroll page in batch 2 would recreate the exact self-competition batch 1 was punished for. **Deferred to 2026-09-11 as a section on the unfrozen page.** |
| **Mileage** (NO-PAGE row 8), **QOF 2025/26** (row 6), **tapered AA** (row 18), **final-salary calculation** (row 21) | All four prescribed onto frozen pages. Same deferral, same date. |
| **Pharmacist accountant** (NO-PAGE row 9, 1,390 volume, 700 peer-winnable) | The estate has a live `pharmacies` site with 36 pages and the niche map assigns rows 18 and 19 to it (`C2_PLACEMENT.md`). Not medical's to take. |
| **`/blog/nhs-pension-scheme-pays-doctors-deadlines`** (the batch-1 forgone prize) | **Still frozen.** See §3. |

---

## 2b. The vets cluster: ruling

The niche map assigns vets to this site as ABSORB #21 and **flags it**, because brand fit is the weak leg: "Medical Accounts" is a human-medicine brand and veterinary is a different profession. `C2_PLACEMENT.md` §5 lists it as one of only four genuinely marginal host calls in the whole 89-row table, with `generalist` as runner-up.

**Ruling: it belongs here, and the brand does not break, on one condition about framing.**

**The evidence that decided it is not judgment, it is what the peers already do.** Six competitor pages hold the cluster. **Three of the six sit inside the firm's own healthcare or medical division**, at the URL level, and two of those three are among the four best-positioned pages in the cluster:

| Competitor page | Best pos | Where it sits |
|---|---|---|
| `hawsons.co.uk/sectors/healthcare-medical-accountants/vets/` | 2 | **inside** the healthcare / medical-accountants section |
| `r-m-t.co.uk/rmt-medical/veterinary-practices/` | 4 | **inside** the RMT **Medical** division |
| `pricebailey.co.uk/industries/healthcare/veterinary-practices/` | 9 | **inside** the healthcare industry hub |
| `lanop.co.uk/accountants-for-vets/` | 5 | standalone |
| `gorillaaccounting.com/accountants-for-locum-vets/` | 2 | standalone, contractor-brand framing |
| `gorillaaccounting.com/blog/a-guide-to-becoming-a-locum-vet/` | 30 | standalone blog |

Three of the four best-positioned pages in this cluster are hosted by a **human-medicine healthcare accounting brand**, under a URL path that says so. Hawsons ranks **second** for `veterinary accountants` from a page whose parent directory is literally `healthcare-medical-accountants`. The market has already answered the brand-fit question, and it answered it the way the niche map guessed but could not evidence. C1 is CLEAR for the row: RCVS bites the client, not us.

**The condition on framing, and it is a hard acceptance criterion in pack 6:**

1. **The page is about a business, not about a profession.** It is sold on practice ownership economics, which is the genuine overlap with the existing 130-page private-practice corpus, and never on veterinary clinical understanding. We do not have veterinary clinical understanding and must not imply it.
2. **The page must name what is different, in its own voice, early.** Veterinary practices have **no NHS contract**, **no NHS Pension Scheme**, and **standard-rated VAT with no medical exemption**. Those three differences are the sharpest contrast anywhere on this site and they are the honest reason the page exists as a separate page rather than as a paragraph. A vets page that reads like the GP pages with the nouns swapped is the failure mode, and it would be caught by the batch-1 sameness rule V5 anyway.
3. **The genuinely veterinary-specific substance is corporate consolidation.** The UK veterinary market has been consolidated hard by corporate groups, which makes the practice-sale, goodwill and earn-out conversation the commercial heart of the page. That is a real differentiator against five thin competitor service pages.
4. **It does not get a persona hub and it does not join the top navigation.** It is one blog-namespace page reachable from item 2, which routes to it in two to four sentences per rule V4. The brand risk in the niche map's flag is a **prominence** risk, and prominence is what we are declining to give it. If it earns, the prominence question can be reopened with data; the reverse is not true.
5. **Runner-up host stays on the record.** If a later read shows the page pulling non-healthcare traffic or muddying the medical brand's query set, the reversible move is to port it to `generalist`, which `C2_PLACEMENT.md` §5 names as the runner-up. One page is a cheap thing to move. That is the whole reason for building it as one page.

**Sizing honesty.** The niche map sized it at "cluster 3-5" pages and 120/mo. The harvest supports **one** page: 11 deduplicated keywords, 1,260 volume, and the entire cluster is one commercial term written six ways (`vet accountant`, `vet accountants`, `veterinary accountant`, `veterinary accountants`, `veterinary accounting`, plus locum variants). Building three to five pages on eleven keywords would be a page per keyword, which §9.3 forbids. **One page, and the cluster is covered.** If it earns, widen from measured demand rather than from the sizing estimate.

---

## 3. The flagged Scheme Pays deadlines page: ruling

**It is not editable. It is frozen to 2026-09-10 exactly like the sixteen, and the frozen test that produced "16 pages" is wrong.**

What `status='flagged'` actually means, established from the code rather than assumed. There is exactly one writer of that value in the repo:

```
optimisation_engine/analysis/detectors.py:1395-1401
    # Mark flagged rows so we don't spam every week
    if out:
        ids = [o.supporting_data["monitored_page_id"] for o in out]
        _sql(f"UPDATE monitored_pages SET status='flagged', updated_at=NOW() WHERE id IN ({ids_sql})")
```

`grep -rn "monitored_pages" --include=*.py` returns 21 files; only `detectors.py` writes `status`. Nothing anywhere resets it to `active`.

So `flagged` means: **the monitored-page regression detector fired on this page during its measurement window, and the row was stamped so the weekly run would not re-mail the same finding.** It is a de-duplication marker on an open regression. It is emphatically not a release from the window, and it is not a clearance.

The row itself, pulled live:

```sql
select slug,status,rewrite_date,monitor_until,rewrite_type,updated_at, now()
from monitored_pages where site_key='medical' order by status, slug;
-- run 2026-08-26 13:27 UTC via python scripts/_q.py -
```

| slug | status | rewrite_date | monitor_until | updated_at |
|---|---|---|---|---|
| `nhs-pension-scheme-pays-doctors-deadlines` | flagged | 2026-06-12 | **2026-09-10** | 2026-07-19 18:02:04 |
| `gp-accounting-guide` | flagged | 2026-06-12 | **2026-09-10** | 2026-07-19 18:02:04 |
| `__home` | flagged | 2026-07-08 | 2026-10-06 | 2026-07-27 11:13:01 |

`monitor_until` is 2026-09-10. `now()` is 2026-08-26. The window has fifteen days left to run. A page whose regression detector has already fired is the **last** page in the corpus you would rewrite mid-window: the measurement it is inside is now a measurement of a regression, and overwriting it destroys the only evidence of what caused it.

**Ruling:**
- **The true frozen set is 18 pages, not 16.** The sixteen `status='active'` rows plus these two, all with `monitor_until = 2026-09-10`. `__home` is frozen to 2026-10-06 and is out of scope anyway (`rewrite_type='net_new'`, already rewritten in the 2026-08-26 corepage pass).
- **The correct frozen test is `monitor_until > now()`, with no status predicate at all.** The batch-1 index and the dossier §6 both used `lower(status)='active' and monitor_until > now()`, which silently excused two pages that are inside live windows. Recorded in §6 as correction 3.
- **`nhs-pension-scheme-pays-doctors-deadlines` becomes workable on 2026-09-11**, and it is the strongest single candidate for batch 3: EXTEND grade, second-highest-confidence topic on the map (5 domains, 172,620 volume), 71 of 78 phrasings missing, and real equity (Google 4 clicks / 373 impressions at position 18.5, Bing 3 clicks / 32 impressions).
- **Before it is worked, the regression must be diagnosed, not skipped.** The `optimisation_opportunities` row that carried the flags no longer exists (`select opportunity_type, count(*), max(created_at) from optimisation_opportunities where site_key='medical' group by 1` returns only `new_page` 7, `intent_realignment` 7, `cro_funnel` 1, `cro_cta` 1, no `monitored_page_regression` row survives), so *which* of the five flag conditions fired on 2026-07-19 is not recoverable from the database. It has to be re-derived from a fresh GSC and Bing pull against the 2026-06-12 baseline. That is a batch-3 prerequisite, not a batch-2 task.

**Nothing in batch 2 touches any of the eighteen, and no page in batch 2 is built on a topic that one of the eighteen owns.** The two collisions that exist are named in the ownership map below and both are handled by scope, not by hope.

---

## 4. THE OWNERSHIP MAP, binding on every writer in this batch

This exists because of the batch-1 lesson recorded as binding rule **V3** in `docs/medical/language_spec_2026-08-26.md`: twelve pages were written in parallel with no ownership map, and the same explanations landed on seven of them. The Scheme Pays two-limb deadline appeared on seven of twelve pages in near-identical wording, none of them the Scheme Pays page.

**The rule, restated:** every shared fact has exactly ONE owning page. Every other page gets **one sentence and a link**, never the explanation. If a writer finds they need three sentences, they are taking someone else's fact and must stop.

**Every row below is repeated inside the pack of every page it constrains.**

| # | Shared fact | **Owner** | Owner in this batch? | Everyone else does this |
|---|---|---|---|---|
| O1 | NHS tiered member contribution rates and bands (uplifted 1 April 2026) | `/calculators/nhs-superannuation-tiered-contribution` | No, live page, untouched | One sentence naming the tier idea, then link. **No table.** Batch 1 put this table on three pages, none of them the owner |
| O2 | Annual allowance mechanics: taper, threshold income, adjusted income, pension input amount, carry forward, MPAA | `/calculators/nhs-pension-annual-allowance` | No, batch-1 page | One sentence, then link. Batch 2 item 5 owns the **general** personal-allowance taper and must not restate the pension taper |
| O3 | **Adjusted net income** as a general concept: the £100,000 to £125,140 personal-allowance withdrawal, the 60% effective band, the interaction with free childcare and the High Income Child Benefit Charge | **Batch 2 item 5** (`adjusted-net-income-doctors-60-percent-tax-trap`) | **Yes** | Items 1, 3, 4, 7 and the whole AA family: one sentence, then link |
| O4 | Scheme Pays: the two-limb election, the mandatory / voluntary split, the deadlines | `/calculators/nhs-pension-scheme-pays` (batch 1). `/blog/nhs-pension-scheme-pays-doctors-deadlines` is FROZEN to 2026-09-10 | No | Item 3 (opt out) gets one sentence and a link. **No deadline dates, no election mechanics.** This is the exact fact that broke batch 1 |
| O5 | Why opting out costs more than the contributions: employer contribution, death-in-service lump sum, ill-health cover, the "should I opt out" reasoning | **Batch 2 item 3** | **Yes** | AA and tax-charge pages: one sentence, then link |
| O6 | **RF12 refund of contributions** and the SD502 opt-out form | Split, and stated so it cannot drift: **item 3 owns the forms in the opt-out context** (SD502 to leave, RF12 where under two years' membership). `/blog/nhs-pension-for-locums-form-a-form-b` is FROZEN and owns the pension **certification** form family (Form A, Form B, SOLO) | Partly | Item 3 must not extend into Form A / Form B / SOLO territory at all. When the locum forms page unfreezes on 2026-09-11, its section on RF12 links to item 3 rather than repeating it |
| O7 | Flat-rate expense for uniform and laundry, and professional-subscription relief under ITEPA 2003 s.343 / List 3 | **Batch 2 item 1** | **Yes** | Item 7 (nurses) gets one sentence and a link. `/blog/medical-professional-expenses-what-is-claimable` and `/blog/gp-tax-deductions-complete-list-2026` are FROZEN and are the long-run owners of the *general* deduction list; item 1 is scoped to uniform, laundry and subscriptions only and must not become a second deductions list |
| O8 | How to claim employment expenses: form P87, the self-assessment route, the four-year time limit, **and the repayment-agent warning** | **Batch 2 item 1** | **Yes** | Items 4 and 7: one sentence, then link |
| O9 | GMC annual retention fee: **deductible, amount UNVERIFIED** | `house_positions.md` §8 and §10 | Ground truth | Every page may say the fee is deductible. **No page may state a figure.** Hard fail F5 |
| O10 | Global Sum per weighted patient, and the QOF point value | `house_positions.md` (Global Sum verified at £130.07; **QOF point value UNVERIFIED**) | Ground truth | **No page in this batch may state a QOF point value.** Hard fail F5 |
| O11 | SMP versus Maternity Allowance: eligibility, the small-earnings route, which one a self-employed or locum GP gets | **Batch 2 item 4** | **Yes** | Item 7: one sentence, then link |
| O12 | Pension accrual during maternity and other statutory leave | **Batch 2 item 4** | **Yes** | Items 3 and 5: one sentence, then link |
| O13 | GP practice reimbursement for parental leave cover under the Statement of Financial Entitlements | **Batch 2 item 4** | **Yes** | `/blog/gp-practice-income-pcse-statement-reconciliation` (batch 1) gets one sentence and a link |
| O14 | "What a healthcare accountant does", the audience list, the national commercial pitch | **Batch 2 item 2** | **Yes** | The twelve `gp-accountant-<city>` pages own the **city** term. Item 2 owns the **national** term and must not add city vocabulary |
| O15 | Audience descriptions for vets, nurses, allied health inside item 2 | Item 2 **routes only**: 2 to 4 sentences each, then hands off to items 6 and 7 | **Yes** | Binding rule **V4**: a hub routes, it does not answer. Item 2 delivering the full vet or nurse case leaves items 6 and 7 nothing to rank for |
| O16 | Practice-ownership economics shared between human and veterinary practice: goodwill, associate versus principal, incorporation, partnership accounts | The existing GP and private-practice corpus | No | Item 6 gets one sentence and a link for the shared shape, and writes only what is **genuinely veterinary-specific**: corporate-group consolidation of practices, RCVS Practice Standards, no NHS contract, no NHS pension, VAT-standard-rated fees |
| O17 | VAT: healthcare exemption versus standard rating | `/blog/gp-vat-registration` (FROZEN) and `/blog/gp-practice-private-non-nhs-income-streams` (batch 1) | No | Item 6 must say in **one sentence** that veterinary fees are standard-rated with no medical exemption, which is the single sharpest contrast with the rest of the site, then link. It must not explain the exemption |
| O18 | NHS Pension Scheme membership eligibility by profession | `/nhs-pension` (batch 1) | No | Item 7 gets one sentence: nurses are in the same scheme as doctors, link. Item 6 gets one sentence: vets are not in it at all, link |

### Batch-level style watch (binding rule V5, and it is the conductor's job, not the writer's)

Every batch-1 page ran the construction **"it is not X, it is Y"** between three and seven times. Ten authors produced one tic. For batch 2:

- **Maximum twice per page** for any one rhetorical construction, and `"it is not ... it is ..."` specifically is capped at **once per page across the whole batch**.
- **Two word orders per idea per page. Hard cap** (rule V1). The uniform cluster has *fifteen* word orders of one idea at 3,600 volume each. That is not licence for fifteen; it is licence for two on this page and the rest reported as unplaced.
- **Never narrate the keyword research** (rule V2). No "also searched as", no variant lists, no telling a reader two searches mean the same thing. Batch 1 shipped this live and it was blocked.
- **Vocabulary never overrides the page's own topic** (rule V6). If a phrasing will not sit as natural English, it goes unplaced and the writer reports it.

---

## 5. Ground-truth gate: three pages cannot be written yet

`docs/medical/house_positions.md` was re-verified figure by figure on 2026-08-26. It carries **no position at all** on the following, and under the standing rule that every published number is re-derivable at primary source, these pages cannot be drafted until it does.

| Missing from house positions | Blocks | What must be read at source first |
|---|---|---|
| Flat-rate expense amounts for uniform and laundry (the EIM32712 / EIM32485 family), and the NHS occupational-group rates | Item 1 | HMRC EIM flat-rate expenses table; the healthcare occupational rows specifically |
| NMC and RCN annual subscription amounts, and their List 3 status | Items 1, 7 | HMRC List 3 (approved professional organisations); NMC and RCN published fees |
| Maternity Allowance weekly rate and the SMP rates for 2026/27; the MA small-earnings route | Item 4 | gov.uk maternity pay and leave rates for 2026/27 |
| The SFE 2026 parental-leave reimbursement provisions for GP practices | Item 4 | GMS Statement of Financial Entitlements Directions 2026 (already downloaded and text-extractable per house positions §on Global Sum, so this is cheap) |
| SD502 and RF12 form names, the two-year refund rule, and the opt-out re-join rules | Item 3 | NHSBSA member hub; NHS Pension Scheme Regulations |

This is a **prerequisite, not a blocker on the packs**. The packs are written now; the ground-truth pass runs before the writer starts. Each pack carries the rows above as named section 7.5 items ("statutes and sources to re-verify at source before publication"), with the standing instruction that where the figure cannot be pinned at source it is framed as "confirm the current figure at source" and **never asserted**, exactly as the GMC retention fee is handled.

Items 2, 5 and 6 need no house-positions extension. Item 5's anchors (personal allowance £12,570 tapered above £100,000, higher rate to £125,140, additional 45% above) are already verified at 2026-08-26 in §5 and §9 of house positions.

---

## 6. What is wrong in the dossier against live data

Four corrections. All re-derived today from the persisted harvest and the live database, all with the query shown.

1. **The uniform cluster's peer-winnable figure is understated by roughly 19x.** The dossier's NO-PAGE row 4 gives 26,880 volume with **1,420** peer-winnable. Re-derived against the §2a peer set, the deduplicated figures are **55,860 volume with 27,550 peer-winnable, 18 keywords already held by a peer inside the Google top 10**. The reason is domain classification, not arithmetic: `lanop.co.uk` and `taxqube.co.uk` are both in the peer-winnable set (§2a rows 12 and 18), and lanop holds `uniform-tax-rebate-uk-guide` at positions 4, 9, 10, 14, 15 and 17 across the 3,600-volume head terms. This changes uniform from "big volume, hard SERP" to "big volume, held by two beatable peers", and it is why it is item 1 rather than item 4.

2. **"pension opt out" is not zero peer-winnable.** The dossier's NO-PAGE row 11 records 20,260 volume, **0** peer-winnable, with the note "bma.org.uk holds it end to end". BMA does hold positions 6 to 9. But `medicsmoney.co.uk`, the strongest peer in the universe, holds `/opting-out-of-the-nhs-pension-scheme/` at position 16 on "opt out of pension nhs" (1,900), position 18 on "nhs pension opt out" (1,900) and position 15 on "how do i opt out of nhs pension" (480). Deduplicated peer-winnable is **4,280**. The topic's sequencing does not change much, and the decision-21 argument for building it stands either way, but the dossier's stated zero is wrong.

3. **The frozen set is 18 pages, not 16.** Both the dossier §6 and the batch-1 index used `lower(status)='active' and monitor_until > now()`. Two rows with live windows to 2026-09-10 carry `status='flagged'` and were excused by that predicate. The correct test drops the status predicate: `select slug from monitored_pages where site_key='medical' and monitor_until > now()` returns **19** rows (18 to 2026-09-10, plus `__home` to 2026-10-06). Full reasoning in §3.

4. **The near-me keyword count is a range, not a number, and both ends should be stated.** The dossier gives 67 keywords / 10,110 volume. A tight regex restricted to healthcare-qualified accountancy phrases gives **27 keywords / 4,310 volume** with 4,240 of it peer-winnable. The difference is generic "accountant near me" and "accountants for small business" rows that belong to no medical topic. Pack 2 carries **both** figures and names both regexes, because the wide set is the right measure of the SERP and the tight set is the right measure of what this page can honestly target.

Nothing else in the dossier failed re-derivation. The 32,872-row count, the 27 domains, the $4.92048 spend and the ledger balance (792 + 450 + 642 + 1,336 = 3,220) all reconcile.

---

## 7. The two clusters that could not be packed, and what filling them costs

**Opticians / optometrists** and **therapists / allied health** are both assigned to this site by `expansion_research/nichemap_2026-08-25/C2_PLACEMENT.md` rows 20 and 22, both at "cluster 3-5" shape, both C1 **CLEAR**. Neither can be packed from the persisted harvest, because the harvest contains no vocabulary for either. Every optician and allied-health keyword in all 32,872 rows, in full:

```sql
select competitor_domain, ranked_keyword, position, search_volume, url
from dataforseo_competitor_data where site_key='medical'
and ranked_keyword ~ '(optician|optometr|ophthalm|physio|therapist|osteopath|chiroprac|podiatr|counsell|psycholog|dietit|paramedic|radiograph|allied health)'
order by search_volume desc;
-- 13 rows. Not one of them is an accountancy keyword.
```

Opticians: `arclight ophthalmoscope` (210, MDU clinical), `d r grey opticians` and `dr grey opticians` (70 each, a Price Bailey client case study), `ophthalmic negligence` (50, MDU). Allied health: `counselling for doctors`, `prolonged psychological harm`, `confidentiality psychology definition`, `paramedic practice`, `paramedics in gp surgeries`, `paramedic pay scale`, `duty of care paramedic`, `professional indemnity insurance for paramedics`. All clinical, HR or indemnity. None accountancy.

**This is a gap in the competitor set, not a gap in the market.** No domain among the 27 harvested runs an optician or allied-health accounting page, so ranked-keyword harvesting of those 27 can never surface the vocabulary however deep it goes. Harvesting them again would be spending money to re-confirm zero.

**What it would cost to fill, priced from `optimisation_engine/config.py` `DATAFORSEO_COSTS`:**

| Step | Endpoint | Calls | Cost |
|---|---|---|---|
| Seed the vocabulary directly, ~8 seeds per cluster (`optician accountant`, `optometrist tax`, `accountants for opticians`, `accountants for therapists`, `physiotherapist accountant`, `private practice therapist tax uk`, …) | `keyword_ideas/live` at `base 0.01 + 0.0001/row`, 1,000 rows | 4 (2 per cluster) | **$0.44** |
| Identify who ranks on the resulting heads | `serp/google/organic/live/advanced` at $0.002 | 12 | **$0.024** |
| Harvest the specialist domains that surface, at 1,000 rows each | `ranked_keywords/live` | ~6 | **$0.66** |
| | | | **~$1.13 total** |

That is 23% of the $5.00 daily `DATAFORSEO_ABORT_AT` guard, on a day when nothing else spends. It is the cheapest unblock available and it converts two ABSORB assignments from unpackable to packable. **It is not authorised by this task and was not run.**

Separately, and unchanged from the dossier's own delta list: completing the four unharvested vocabulary domains (england.nhs.uk 105,199 keywords, nhsbsa.nhs.uk 39,145, nhsemployers.org 14,605, wesleyan.co.uk 10,647) plus the rest of bma.org.uk costs about **$19** and would most likely deepen the NHS-pension administrative vocabulary that is already the largest gap on the map. Neither spend is authorised here.

---

## 8. Batch-level expectation

Written before the work, so the later read has something to fail.

**The measurement reality this batch is written into.** Google indexes roughly **21 of 130 URLs** on this site, driven by low domain authority and not by any technical defect. Bing indexes it fully and sends **3.4x** the Google clicks. Fresh Bing pull today, `GetQueryStats(https://www.medicalaccounts.co.uk)` via `BingWebmasterClient`, returned **648 site-level queries**; a regex across all seven batch-2 clusters matched **6** of them, five of which are payroll or payslip long-tail and one of which is `nhs tax accountant near me` (1 impression, average position 2). **Batch 2 starts from approximately zero on every cluster it targets, on both engines.** That is the baseline, and it is what makes the 14-day and 28-day reads interpretable at all.

**Primary test, Bing, 14 days after deploy: does the page exist in the index and does it match anything.** Target: **at least 5 of the 7 pages** register at least one Bing impression on a phrase named in their own pack's section 7.1. Seven of seven is not the target; two net-new pages failing to surface in fourteen days on a low-authority domain is normal, not a defect.

**Primary test, Bing, 28 days: phrase coverage, not total traffic.** Target: **7 of 7 pages** registering impressions, and **at least 3 pages** registering their first Bing **click**. Per §9.6 point 2, **total traffic rising while the named missing phrases stay missing is a FAIL, not a pass**, and is recorded as drift.

**Secondary, leads, 90 days.** Item 2 is the only page in the batch a reader can convert on. At one lead per 46 sessions, it needs roughly 46 sessions to produce one lead. No lead target is set at 28 days, because a new page on this domain will not have 46 Google sessions by then. The 90-day question for item 2 is **any** attributed lead, not a rate.

**Google, 28 to 90 days: no expectation is set, and that is deliberate.** On a corpus where Google indexes 16% of URLs, a new page not being indexed at 28 days carries no information. The one Google observation worth recording is **item 5**, `adjusted-net-income-doctors-60-percent-tax-trap`, which is the only batch-2 cluster where peers rather than institutions hold the Google slots (hawsons at position 9 on `60 percent tax trap`, medicsmoney at 8). If any page in this batch is going to be indexed and ranked by Google inside 90 days, it is that one. Record the outcome either way; do not treat a miss as a failure.

**Batch failure trigger.** All seven pages are net-new, so there is no equity to lose and **no revert trigger applies to existing pages**. The failure condition is a quality one, not a traffic one: if the batch-level editorial QA raises a **V1, V3 or V5 finding on three or more of the seven pages**, the batch has reproduced the batch-1 defect that this index exists to prevent, and the affected pages are held rather than deployed. Revert path per page is deletion of a single new file, named in section 1 of each pack.

**No monitor is created by this document.** Reading the tracker is a pull. Registration in `monitored_pages`, with `blog_optimizations.target_keywords` populated from each pack's section 7.1 missing-phrase list rather than from what the page already ranks for, is a separate owner-triggered step and has not been done.

---

## 9. Known limitations of these packs

1. **The keyword sets in each pack's section 3 were rebuilt locally by term-family regex** over the persisted 32,872-row harvest, not by re-running the dossier's seed-node clustering (that script was scratch and is not in the repo). The regex is printed in every pack. Counts therefore differ from the dossier's per-topic `Kws` column in both directions. Stated, not silent.
2. **Peer-winnable is Google-derived.** DataForSEO positions are Google positions. Per decision 21 it orders the work and excludes nothing, which matters most on item 3, where Google is effectively closed and Bing is not.
3. **Competitor teardowns fetch live pages.** Any URL returning a non-200 is recorded inside its pack with the status code and treated as a flagged gap, never dropped. Batch 1 had seven such URLs; `hawsons.co.uk` and `nhsbsa.nhs.uk` are known 403s to automated fetching, and hawsons holds addressable rows on items 5 and 6.
4. **Three pages are gated on a house-positions extension** (§5). The packs are complete; the ground truth is not.
5. **Two ABSORB clusters are unpacked for want of data** (§7), and the fix is priced but not authorised.
6. **Three UNVERIFIED figures are banned from every page in this batch**: the GMC annual retention fee, the Global Sum per weighted patient, and the QOF point value. Each pack carries the ban as a countable acceptance criterion.

---

## 10. What the packs found after this index was written

The seven packs were built against §1 to §9 above. Seven findings came back that change the index rather than merely sitting inside a pack. They are recorded here so the index stays the single source of truth for the batch.

**A. The dossier's peer-winnable column is systematically understated, on every cluster tested.** §6 corrections 1 and 2 recorded it on uniform (1,420 stated, 27,550 actual) and opt out (0 stated, 4,280 actual). Pack 4 found the same shape on maternity: dossier §4 row 12 states **0** peer-winnable, the actual figure is **3,430**, because `bhp.co.uk` is a §2a peer. That is three of three clusters where the dossier's own NO-PAGE ordering column is wrong in the same direction. **The cause is domain classification, not arithmetic: the dossier's peer-winnable was computed against a narrower set than `competitor_universe_2026-08-26.md` §2a.** Since decision 21 makes that column the thing that ORDERS all the work, **the whole of dossier §4 should be re-derived against the §2a peer set before batch 3 is scoped.** It is a single SQL re-run against data already paid for, and it may reorder the backlog.

Pack 4 found a second instance of the same bias in dossier §5, which reports best position **31 (bma.org.uk)** for `how much is maternity allowance` when the harvest holds **20 (bhp.co.uk)**. The dossier reported the worse of two rows, making the field look harder than it is.

**B. The `hawsons.co.uk` 403 is a user-agent block, not a site block, and it is now closed.** Pack 5 established that `WebFetch` returns 403 while `curl -A "Mozilla/5.0"` returns **200** on both hawsons URLs, and recovered the full heading tree of `/60-tax-trap/`. `house_positions.md` and the batch-1 index both record hawsons as an unreachable domain. **It is reachable.** Batch 1 logged seven 403 competitor URLs as flagged gaps, including `pricebailey.co.uk/blog/vat-and-doctors/` which the batch-1 index calls "the cheapest single improvement to this batch". Several of those are probably the same block. Re-running batch 1's failed fetches with a user agent is free and is the cheapest open item in the programme. Not run here, because batch 1's packs are not this task's files.

Live 403s remain on `pricebailey.co.uk` (both healthcare URLs and the pension-during-leave page, the material loss on item 4's O12) and `simpkinsedwards.co.uk`. All are recorded inside their packs with the status code. None was dropped.

**C. The ground-truth gate in §5 is not theoretical, and the packs proved it.** Three competitor pages give **three different NHS uniform flat rates** (£125, £100 and a £6/£12/£125 split), pack 7 found a fourth variant (£60/£125/£185), and **all of them print 45p mileage against the 55p verified for 2026/27** in house positions. Pack 2 caught a live competitor doing the same. Pack 4 found `bhp.co.uk`'s maternity-allowance post, the entire peer-winnable case for item 4, carrying **2023/24 figures**. The competitor layer on these clusters is stale, and any figure lifted from it would ship an error. **No figure in items 1, 3, 4 or 7 may be taken from a competitor page. Primary source or nothing.**

**D. An ownership collision this index did not record.** `/blog/nhs-pension-tax-charges-how-to-minimize` is **live**, was rewritten in batch 1, and already carries O5 argument, O6 vocabulary (the corpus's only `RF12` mention), and O7 plus O8 material in three frontmatter FAQs including the four-year limit with TMA 1970 s.43. It is not frozen. **Ruling: the new pages own these facts going forward, and that page is not re-opened in this batch** (one change per page per window, and it is inside its post-batch-1 read). Its duplication is recorded in packs 1 and 3 as a known overlap with a criterion forbidding wording reuse, so the new pages do not become a second copy of it.

**E. RF12 ownership, resolved.** The batch-1 pack for `/blog/nhs-pension-tax-charges-how-to-minimize` deferred RF12 to the frozen `/blog/nhs-pension-for-locums-form-a-form-b`; O6 assigns it to item 3. Both cannot own it. **Ruling, and it supersedes the batch-1 instruction:** item 3 owns **RF12 as a refund on leaving the scheme**, which is the opt-out context and the only context the search demand is in. The frozen locums page keeps the **certification** form family (Form A, Form B, SOLO) and nothing else. When it unfreezes on 2026-09-11 its RF12 reference becomes one sentence and a link to item 3.

**F. A live V2 violation is in the corpus.** `/blog/nhs-pension-tax-charges-how-to-minimize` ships the phrase "also searched as" to readers, which is exactly what binding rule V2 forbids and what batch-1 QA blocked elsewhere before it shipped. Recorded, made countable in pack 3's criteria, **not fixed here** because that file belongs to another window and to another agent's concurrent work. It is a one-line fix and should be taken in the next pass over that page.

**G. Two sizing corrections and one page-shape recut.**
- **Item 6 (vets):** the niche map's "cluster 3-5 pages, 120/mo" is unreconcilable with the harvest at any slice (550, 1,260 or 440). After the V1 two-word-order cap the page carries **2 required phrases over 4 keyword rows and 440 volume**. One page, and the cluster is covered. Confirmed as §2b already ruled.
- **Item 7 (nurses):** `C2_PLACEMENT.md` sizes row 23 at "section + 1-2 pages"; the harvest supports **one**, and the addressable core is **4 keywords at 440 volume, 4.6% of the cluster**, of which V1 permits two. Pack 7's verdict is **build one page but RE-CUT it**: as literally titled, "nurse tax relief and professional subscriptions" is O7's fact with a nurse noun in front, and the ownership fence leaves it nothing. What survives is three themes **no competitor covers at all**: the employment-status fork (PAYE versus agency versus bank versus genuinely self-employed), what changes with more than one payroll, and when a nurse needs an accountant rather than a form. **Accepted.** The page answers the relief query on the way through rather than being about it, which also satisfies the C1 CONDITIONAL more cleanly than the original framing did, because the fork is what routes a PAYE-only nurse away from the form. The alternative is on the record if the owner prefers it: a subsection on item 1 plus item 2's O15 paragraph, and no seventh page.
- **Item 4 (maternity):** ruled **page, not section**, and the decisive reason is procedural rather than editorial. All three candidate host pages (`gp-payroll-services`, `locum-doctor-tax-complete-guide`, `nhs-pension-for-locums-form-a-form-b`) are frozen to 2026-09-10, so "section" means "do nothing until 2026-09-11". The addressable slice is **61 keywords / 16,810 volume / 3,430 peer-winnable, which is 6.9% of the cluster carrying 81% of its peer-winnable volume**. The honest counter-argument is recorded in full inside the pack: on O12 alone the answer would be section-not-page, because the BMA's pension-during-leave page already does it well at 3,000 words with 17 role-segmented headings. **Revisit after 2026-09-11.**

**H. Two findings that revise documents outside this batch.**
- **`language_spec_2026-08-26.md` Part 4 point 3 does not generalise.** It records that zero of nine competitor pages carried a worked example. On the adjusted-net-income cluster it fails at **3 of 6**, and both peers holding Google top-10 slots have one. A worked example is table stakes on that cluster, not a differentiator. The point should be scoped to the clusters where it was measured.
- **Item 2's SERP has a directory layer above the firm layer.** Pack 2 found 34 competitor URLs rather than 30, two of them third-party directory profiles of a single competitor (`practiceindex.co.uk/gp/bw-medical-accountants-ltd`, `medicsmoney.co.uk/accountant/bw-medical-accountants-ltd/`), both outranking most firms' own pages. That is a distribution finding, not a content one, and it is where the local_pack tension in §2e routes now that Google Business Profile is permanently off. It belongs in a later off-site pass, not in this batch.

**I. Two smaller corrections to facts stated elsewhere.** The `gp-accountant-<city>` set is **eleven** blog pages, not twelve, and one carries an inverted slug (`nottingham-gp-accountant`) that every `gp-accountant-*` glob will miss. `/locations/[slug]` renders only five cities, so six city blog pages have no hub parent. Both are recorded in pack 2 and neither is fixed here.

**Nothing in this section was acted on.** No file outside `docs/medical/packs/` was written, nothing was committed, deployed or indexed, no monitor was created, and no paid API call was made by any of the seven packs. Batch spend remains **$0.00**.

---

## 11. Pack index

| Pack file | Page |
|---|---|
| `PACK_blog__nhs-uniform-tax-relief-laundry-allowance.md` | `/blog/nhs-uniform-tax-relief-laundry-allowance` |
| `PACK_blog__healthcare-accountants-uk.md` | `/blog/healthcare-accountants-uk` |
| `PACK_blog__opting-out-of-the-nhs-pension-scheme.md` | `/blog/opting-out-of-the-nhs-pension-scheme` |
| `PACK_blog__maternity-pay-and-maternity-allowance-for-doctors.md` | `/blog/maternity-pay-and-maternity-allowance-for-doctors` |
| `PACK_blog__adjusted-net-income-doctors-60-percent-tax-trap.md` | `/blog/adjusted-net-income-doctors-60-percent-tax-trap` |
| `PACK_blog__accountants-for-vets-veterinary-practice-tax.md` | `/blog/accountants-for-vets-veterinary-practice-tax` |
| `PACK_blog__nurse-tax-relief-professional-subscriptions.md` | `/blog/nurse-tax-relief-professional-subscriptions` |


## OWNERSHIP MAP AMENDMENT, ratified 2026-08-26 by the conductor

**O7 (uniform, laundry and professional subscriptions) SPLITS INTO TWO OWNERS. This supersedes the single-owner
row and the two-sentence cap that the nurse pack placed on subscriptions.**

- **Uniform and laundry flat rates, the P87 route, the four-year backdating limit and the repayment-agent
  position** are owned by `/blog/nhs-uniform-tax-relief-laundry-allowance`.
- **Professional subscriptions and List 3** (NMC and RCN fees, the Parliamentary condition on the October 2026
  NMC rise, the BMA 85 percent and UNISON 70 percent restrictions, the "(J)" journal marker, s.343 against s.344,
  and the correction that the RCN's own "Tax Relief" column is the POST-RELIEF COST rather than a second fee)
  are owned by `/blog/nurse-tax-relief-professional-subscriptions`.

Why it is ratified rather than enforced as originally written: the two writers reached this split INDEPENDENTLY
and in compatible terms, without coordination. The uniform page wrote three sentences on subscriptions and handed
off by slug; the subscriptions page wrote a section and handed the flat rates back. Neither duplicated the other's
wording. The two-sentence cap was unachievable against a brief that required both NMC figures, the Parliamentary
condition and the RCN correction, and a page whose URL names subscriptions cannot carry two sentences of them.

The general lesson, worth carrying to later sites: when two writers independently converge on the same boundary,
that is evidence the map was drawn in the wrong place, not that both writers erred. Ratify it and move the line.
The opposite signal, one writer quietly annexing another's fact, is what V3 exists to catch, and it looks nothing
like this.
