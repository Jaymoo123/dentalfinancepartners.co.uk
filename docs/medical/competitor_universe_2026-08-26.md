# Medical: competitor universe validation + lane taxonomy

**Date** 2026-08-26. **Site** `medical` / medicalaccounts.co.uk / Medical Accounts.
**Stage** 1 of the Property-standard competitor intelligence pass.
**Scope** validate the competitor universe against real SERP data, author the v2
lane taxonomy, fix the lane-map plumbing. No deploy, no commit, no monitor created.

**DataForSEO spend: $0.036.** 18 x `serp/google/organic/live/advanced` at $0.002.
Command:
```sql
select api_provider,endpoint,site_key,status,count(*) n,sum(estimated_cost_usd) est,sum(cost_usd) act
from api_cost_log where date_called=current_date group by 1,2,3,4
-- dataforseo | serp/google/organic/live/advanced | medical | success | 18 | 0.036000 | 0.036000
```
Daily guard `DATAFORSEO_ABORT_AT` = $5.00, untouched. 0.7% of the guard consumed.

---

## 1. Method

18 head terms SERPed through `optimisation_engine.clients.serp_provider.fetch_serp(query,
site_key="medical", num=10)` in its default `dual` mode (DataForSEO authoritative,
DuckDuckGo corroboration only). Head terms chosen from the fresh pulls, not from the
sampled `gsc_query_data` table and not from `derive_competitor_universe.py`:

- **GSC**, 90 days, data-through 2026-08-23, 217 query rows: `gp accountants` (1,309
  impressions, avg pos 51.7), `medical accountants` (377), `specialist medical
  accountants` (284), `gp practice accountants` (278), `medical accountants uk` (225),
  `accountants for locum doctors` (111), `accountants for doctors` (100), `accountants
  for gp practices` (80), `medical accountants london` (30), `locum doctor accountant`
  (20), `gp partnership goodwill valuation` (38 impressions at avg pos **10.3**, our
  best Google position in the whole set).
- **Bing**, 90 days, 624 distinct queries / 217 clicks aggregated from
  `bing_query_stats.json`.
- Plus the commercial heads named in the brief: `nhs pension accountant`, `dental and
  medical accountants`, `accountant for consultants nhs private practice`, `accountants
  for nhs doctors`, `accountant for medical professionals`, and two derived from the
  data: `nhs pension annual allowance accountant`, `gp partnership accounts specialist`.

Every one of the 18 returned `provider_used="dual"`. 166 DataForSEO top-10 organic slots
in total.

### Why the DuckDuckGo-derived list had to be thrown away

The existing 12-domain universe was built by DuckDuckGo tallying. On this niche DDG is
not a weak signal, it is a wrong one. Side by side for `gp accountants`:

| # | DataForSEO (Google) | DuckDuckGo |
|---|---|---|
| 1 | r-m-t.co.uk | medicalaccountant.**ie** |
| 2 | hawsons.co.uk | accountantsbook.co.uk (directory) |
| 3 | practiceindex.co.uk | jcssutton.co.uk |
| 4 | aisma.org.uk | accountantsfordoctors.co.uk |
| 5 | medicsmoney.co.uk | accountingin.co.uk |
| 6 | simpkinsedwards.co.uk | bw-medical.co.uk |
| 7 | sial-accountants.co.uk | gondalaccountancy.co.uk |
| 8 | ramsaybrown.com | nicholsmedical.co.uk |
| 9 | bma.org.uk | bizdb.**co.nz** (directory) |

Zero overlap. For `nhs pension accountant` DDG returned nestpensions.org.uk,
peoplespension.co.uk, adzuna.co.uk, tracjobs.co.uk, theguardian.com, express.co.uk:
pension-provider and job-board noise, not one accountancy firm. Mean corrected
divergence across all 18 queries is **0.64**, and it is 1.00 on both `gp accountants`
and `nhs pension accountant`.

Two of the previous 12 domains (`gondalaccountancy.co.uk`, `dma-accountancyservices.co.uk`)
are visible only through that DDG lens. This is the concrete evidence for the owner's
framing: the DataForSEO layer is what makes this pass worth running.

---

## 2. Ranked competitor universe

Counts are "appears in N of the 18 head-term DataForSEO top-10s". `best` is best organic
rank observed. `ddg` is how many of the 18 DDG corroboration sets it also appeared in.

### 2a. Peer-winnable (the target set, now `competitors` in the config)

| # | Domain | q | best | ddg | What kind of competitor |
|---|--------|---|------|-----|-------------------------|
| 1 | medicsmoney.co.uk | 15 | 1 | 6 | Specialist medical-finance publisher plus accountant-matching directory. The single strongest peer, and a hybrid: it ranks with content AND with a directory page (`/medical-accountant-search/`) |
| 2 | sial-accountants.co.uk | 14 | 2 | 8 | Specialist medical and dental accountancy firm. Ranks on thin service pages (`/services/medical-accountants-for-doctors/`), not on depth |
| 3 | kudosaccounting.co.uk | 7 | 2 | 1 | Generalist firm running a dense city-by-service medical landing-page programme (`/accountant-for-gp-london/`, `/locum-doctor-tax-2026/`). Nearest structural twin to our own `gp-accountant-<city>` set |
| 4 | bw-medical.co.uk | 6 | 2 | 10 | Specialist medical accountancy firm (Baird Wallace style). Highest DDG presence of any domain, which reads as brand/navigational strength rather than SERP strength |
| 5 | pricebailey.co.uk | 6 | 3 | 2 | National top-30 firm with a healthcare sector hub. Borderline peer: winnable on long-tail specialism, not on brand |
| 6 | practiceindex.co.uk | 5 | 1 | 3 | GP practice-manager publisher and directory. Content-peer on informational queries (`/gp/blog/explaining-gp-practice-accounts-part-one/`), directory on commercial |
| 7 | sandisoneasson.co.uk | 5 | 2 | 4 | Specialist medical accountancy firm, AISMA member. Only 12 URLs in sitemap: ranks on authority, not volume |
| 8 | ramsaybrown.com | 5 | 7 | 2 | Specialist medical accountancy firm, NHS pension/superannuation positioning |
| 9 | r-m-t.co.uk | 4 | 1 | 1 | Regional generalist with a dedicated RMT Medical division (`/rmt-medical/gp-practices/`) |
| 10 | nicholsmedical.co.uk | 4 | 2 | 4 | Specialist medical accountancy firm |
| 11 | gorillaaccounting.com | 3 | 3 | 1 | National contractor-accountancy brand with locum medical pages. Semi-peer: strong domain, shallow specialism |
| 12 | lanop.co.uk | 3 | 5 | 1 | Generalist London firm with a doctors service page |
| 13 | accountants4nhsdoctors.co.uk | 2 | 3 | 5 | Exact-match micro-brand aimed only at NHS doctors. Most directly winnable |
| 14 | hawsons.co.uk | 2 | 2 | 0 | Mid-tier generalist with a properly segmented healthcare hub (`/sectors/healthcare-medical-accountants/gp-accountants/`) |
| 15 | bhp.co.uk | 2 | 4 | 2 | Regional generalist, healthcare team, locum GP page |
| 16 | freestyleaccounting.com | 2 | 6 | 2 | Umbrella/limited-company national brand targeting medical locums |
| 17 | simpkinsedwards.co.uk | 2 | 5 | 1 | Regional generalist, healthcare sector page |
| 18 | taxqube.co.uk | 2 | 6 | 0 | Small generalist with a medical/healthcare industry page |
| 19 | coveneynicholls.co.uk | 2 | 8 | 1 | Specialist medical accountancy, with a dedicated NHS pension page |
| 20 | fkca.co.uk | 2 | 9 | 0 | Generalist with an "FK Medical" division |
| 21 | medifintech.co.uk | 1 | **1** | 0 | NHS-pension specialist micro-brand. One query only, but position 1 on `nhs pension accountant`, the highest-intent term in the set |
| 22 | rbp.co.uk | 1 | 10 | 4 | Specialist medical accountancy firm. Retained on specialism despite weak SERP evidence in this sample |

### 2b. Non-peer: authority, institutional and gov (excluded from `competitors`)

**54 of the 166 top-10 slots, 33%, belong to domains we cannot realistically take.**
This is the number that matters for programme prioritisation: a third of this niche's
head-term SERP real estate is structurally off the table, so raw volume per lane
overstates the addressable opportunity by roughly half as much again.

| Domain | q | best | Kind |
|--------|---|------|------|
| bma.org.uk | 15 | 1 | Trade union / professional body. Owns `/pay-and-contracts/pensions/pensions-tax/nhs-pension-annual-allowance`, `/advice-and-support/gp-practices/funding-and-contracts/trading-in-goodwill`, `/pay-and-contracts/tax/tax-relief/tax-relief-for-locum-doctors`. Ties medicsmoney for breadth and cannot be outranked on brand |
| forvismazars.com | 9 | 3 | Global top-10 accountancy network |
| themdu.com | 4 | 6 | Medical defence organisation offering member tax services |
| aisma.org.uk | 3 | 4 | The specialist medical accountants' association. Gatekeeper/directory, not a rival. A citation and membership target, not a rank target |
| nhsbsa.nhs.uk | 2 | 1 | NHS Business Services Authority (gov). Owns `/member-hub/annual-allowance` |
| nhsemployers.org | 2 | 4 | NHS Employers (gov-adjacent) |
| johnstoncarmichael.com | 2 | 2 | Large Scottish national firm |
| england.nhs.uk | 1 | 10 | Gov |
| wesleyan.co.uk | 1 | 4 | Specialist IFA for doctors. Adjacent vertical, not an accountant |
| weightmans.com, archvale.co.uk, cartercamerons.com, pulsetoday.co.uk, accountingweb.co.uk, rangewell.com | 1 each | 2-9 | Law firm, valuers, trade press, finance broker. All surfaced only on `gp partnership goodwill valuation` |
| facebook.com, youtube.com | 1 each | 4-8 | UGC |

### 2c. Sibling-site territory (excluded by the boundary rule, section 4)

Surfaced only on `dental and medical accountants`: `djh.co.uk`, `nasdal.org.uk`,
`pfmdental.co.uk`, `dains.com`, `daykinscott.co.uk`, `yorkshireaccountancy.co.uk`.
6 of 166 slots. These belong to the `dentists` site's universe, not medical's.

### 2d. What changed against the previous 12

**Kept (7):** bw-medical, medicsmoney, nicholsmedical, sandisoneasson, r-m-t,
sial-accountants, kudosaccounting. All confirmed with real DataForSEO top-10 positions.

**Kept on judgment (1):** rbp.co.uk, one slot at position 10. A genuine specialist,
under-evidenced in this sample.

**Dropped (4), with reason:**

| Dropped | Evidence |
|---|---|
| gondalaccountancy.co.uk | 0 of 18 DataForSEO top-10s. DDG-only artefact |
| dma-accountancyservices.co.uk | 0 of 18. Also carries **1,998 sitemap URLs**, almost none medical, which was polluting `lane_map`'s per-lane counts |
| larking-gowen.co.uk | 0 of 18 DataForSEO, 2 DDG. 925 sitemap URLs, same pollution problem |
| thomasbarrie.co.uk | Appears once at organic rank 12, outside top-10 |

**Added (15):** pricebailey, practiceindex, ramsaybrown, gorillaaccounting, lanop,
accountants4nhsdoctors, hawsons, bhp, freestyleaccounting, simpkinsedwards, taxqube,
coveneynicholls, fkca, medifintech, plus medicsmoney promoted to the head of the list.

**Note on the sitemap cache.** `briefs/medical/_competitor_urls.json` still holds the old
9-domain scrape including the three dropped bloat domains. It is Track A's cache, rebuilt
by the next `competitor_watch` run, and I have not hand-edited it.

### 2e. SERP shape

Across the 18: `related_searches` on 18, `people_also_ask` on 14, **`ai_overview` on 12**,
`local_pack` on 9. Two thirds of these head SERPs carry an AI Overview, which is the GEO
argument for this site in one number.

---

## 3. Lane taxonomy

15 lanes, written to `sites/medical.discovery.json` as `lanes` plus 69
`lane_negative_tokens`, in the exact v2 shape Property uses (`key`, `label`, `tokens`,
`_doc` on the first entry). `assign_lane` takes the **first** lane in list order whose
token matches as a hyphen-bounded unit, so order is load-bearing and narrow
administrative lanes come before the broad ones that would otherwise swallow them.

Validation over our own 79 slugs, run with `assign_lane` against the committed config:
**78 of 79 assigned**, 1 unassigned (`accountant-accounting-services`, a genuinely
generic page).

| # | Lane | Our pages | Justification from the data |
|---|------|-----------|------------------------------|
| 1 | `pension_admin_pcse` | 2 | Bing shows a whole administrative sub-language nobody else serves: `pcse gp remittance advice` (2 clicks), `what does gpftg mean on pcse statemenmt` (2 clicks), `locum forms a and b` (8 impressions), `locum form a`, `gp locum form 202627`, `is it mandatory to complete locum pension form a`, `whatr to do if a locum pension form a is submitted with a mistake`, `threshold income calculation for gp in superannuation scheme`. Distinct from pension tax planning: this is form-filling and reconciliation. Placed first so `form-a`/`type-2`/`pcse` beat the generic `nhs-pension` token below |
| 2 | `nhs_pension_tax` | 7 | GSC `nhs pension for doctors` (23 impressions), `doctors pensions annual allowance` (10). Bing `annual allowance charge = scheme pays or not? for nhs consultants`, `nhs pension how do i work our my annual allowance used`, `medical consultant pension tax`, `nhs pension advice high earner`. Competitor-side: medifintech ranks #1 on `nhs pension accountant`, bw-medical `/nhs-pension`, ramsaybrown `/service/nhs-superannuation-pensions/`, coveneynicholls `/nhs-pension-scheme/`, and bma.org.uk + nhsbsa.nhs.uk own the top slots. The highest-authority contested lane in the niche |
| 3 | `goodwill_practice_sale` | 4 | `gp partnership goodwill valuation`: 38 GSC impressions at avg **position 10.3**, our single best Google position, and one of only two of our URLs holding a live Google top-10. The SERP has a completely different cast (bma.org.uk `/trading-in-goodwill` at #1, weightmans.com the law firm at #2, archvale/cartercamerons the valuers). Separate lane because the competitor set is separate |
| 4 | `gp_partnership` | 12 | The largest evidence block anywhere. GSC: `what is a gp partner` (31), `salaried gp vs partner` (28), `buying into a gp` (24), `gp partner expenses` (22), `how much does it cost to buy into a gp partnership` (18 at pos 10.0), `gp partner salary after tax` (11 at pos 10.9), `accounting for gp partners` (38), `becoming a gp partner` (9). Bing: `understand gp practice capital account uk` (2 clicks), `how are drawings calculated in gp partnership`, `gp medical partnership disputes profit share`, `gp partner how to afford buying into partnership`. Also our largest slug group |
| 5 | `locum_doctor` | 6 | GSC `accountants for locum doctors` (111 impressions), `locum doctor accountant` (20). Bing `are bank locum doctors self employed` (2 clicks), `locum doctor tax calculator`, `locum doctor multiple hospital tax relief`. Competitors: gorillaaccounting `/accountants-for-locum-doctors-pharmacists/`, bhp `/locum-gps/`, freestyleaccounting `/limited-company-accountants-for-medical-locums/`, kudos `/locum-doctor-tax-2026/`. C2 row 17 confirms medical is the host |
| 6 | `private_practice_consultants` | 4 | Head query `accountant for consultants nhs private practice` returns sandisoneasson `/hospital-consultants`, hawsons `/hospital-doctor-consultant/`, themdu, mlaaccounting. Bing `is working as a locum consultant psychiatrist allowed as self employed?`, `if i work for the nhs and wish to see a patient privately as a sole trader`. Our medico-legal and private-practice slugs sit here |
| 7 | `incorporation_extraction` | 7 | Our largest self-built cluster after partnership: s455 director loans, s162 incorporation relief, salary vs dividend, surplus cash, FIC, BADR on sale. Competitor side is thinner (freestyleaccounting, gorilla), which makes it an ownable lane rather than a contested one. CGT/BADR tokens folded in here rather than given their own lane: on this niche the capital-gains queries are almost entirely incorporation-driven or sale-driven, and the sale side is already lane 3 |
| 8 | `nhs_practice_income` | 7 | Bing `what is pcn cd element of core pcn funding 24/25`, `who pays for pcn des`, `qof as a percentage of practice income`, `global sum patient registration tiers`, `nhs england gp funding per patient capitation formula carr-hill weighted`. Ours: GMS/global sum/Carr-Hill, QOF, enhanced services, dispensing, PCN, ARRS. PCN kept inside this lane rather than split out: 4 Bing queries is not enough to carry its own lane, and the split can be made later if it grows |
| 9 | `premises_finance` | 2 | Notional rent vs cost rent, surgery own-vs-rent, last-man-standing premises risk, financing the buy-in. Bing `why do gps borrow short term`, `can gps borrow short term for their fund`, `gp partner how to afford buying into partnership`. Separate from partnership because the advisory question (property and debt) and the competing content (banks, brokers such as rangewell.com) are different |
| 10 | `vat_medical` | 1 | Disproportionate Bing signal for a one-page lane: `has doctors table3 vat exemption been updated since may 2007` (2 clicks, the joint-top Bing click query on the whole site), `gp vat exemption letter` (2 clicks), `vat exempt gp`, `general practice application of vat number`. Real demand, near-zero coverage on our side, no visible competitor page. The clearest ownable hole in the taxonomy |
| 11 | `expenses_allowances` | 3 | The biggest Bing block by query count: `how much subsistence expenses can i claim as a gp partner`, `gp home office expense tax relief`, `as a gp can i claim car insurance against tax`, `cpd for gp's for tax relief`, `gp membership tax deductible`, `doctors mileage tax deduction form`, `would medical practicitioner claims protection class as an allowable expense for a doctor` (2 clicks), `gp working from home by choice can i claim some household expenses`. GSC `gp partner expenses` (22). Capital allowances and equipment folded in, both are "what can I deduct" |
| 12 | `payroll_staff` | 1 | Thinnest lane, kept deliberately. It is a distinct commercial service line (`gp-payroll-services`, ARRS staff employment) and a standard competitor service-page category, so it needs to exist for coverage comparison even though query evidence is currently weak. Flagged as thin |
| 13 | `compliance_reporting` | 4 | Self-assessment, accounts production, MTD, basis-period reform, bookkeeping and software. Bing `nhs gp tax returns` (2 clicks), `how to file an sa104 and an sa800 together`, `do gp partners make payments on account`, `gp accounts systems`, `gp partnership tax bill explained`. This is also where the dropped generalist competitors' entire sitemaps land, which is exactly the signal that they are not medical specialists |
| 14 | `allied_health` | **0** | Deliberately zero-coverage. C2_PLACEMENT rows 20, 21, 22 and 23 assign the opticians, vets, therapists-and-allied-health and nurses ABSORB clusters to `medical`. Without a lane, that assigned ground is invisible to `lane_map` and would never surface as a hole. With it, the gap is measurable from day one |
| 15 | `medical_accountancy_services` | 18 | Adjacency catch-all, same role as Property's `landlord_ops`. Absorbs the head commercial terms (`gp accountants` 1,309 impressions, `medical accountants` 377) and the city pages. Last in order so it only catches what no specialism lane claimed |

**Lanes considered and dropped.**
- *Junior and training doctor tax* (registrar, foundation, relocation, exam fees): 0 of
  79 slugs, no GSC query above 5 impressions, nothing in Bing. Tokens folded into lane 15.
- *Retirement and later career* as a standalone: the evidence splits cleanly in two.
  Pension-side retirement (`partial-retirement`, `24-hour-retirement`) is lane 2;
  partnership-side retirement (capital account repayment) is lane 4. A third lane would
  have held one page and duplicated both.
- *IR35 and off-payroll* as a standalone: real but thin here (2 Bing queries, 1 slug), and
  the estate already has a dedicated `contractors-ir35` site. Tokens live inside
  `locum_doctor` so doctor-specific IR35 stays ours without building a lane that competes
  with a sibling.
- *Dentists*: not a lane, a veto. See section 4.

**Known ceiling.** `how much subsistence expenses can i claim as a gp partner` assigns to
`gp_partnership`, not `expenses_allowances`, because the audience lane precedes the
cross-cutting topic lane. This is the same trade Property makes by keeping
`allowable-expenses` inside `landlord_ops`. If the expenses lane later needs accurate
sizing, move it above `gp_partnership` and re-run the slug check.

### 3a. Negative tokens, and why each group exists

| Group | Tokens | Reason |
|---|---|---|
| Navigational | `login`, `log-in`, `sign-in`, `portal`, `my-account` | PCSE and ESR portal logins share vocabulary with lane 1's real tokens |
| Recruitment | `jobs`, `job-vacancies`, `vacancies`, `vacancy`, `recruitment`, `recruiter`, `careers`, `career`, `locum-agency`, `locum-jobs`, `nhs-jobs` | Vetoes GSC's `gp partner jobs`. Job boards (adzuna, tracjobs) dominated the DDG side of `nhs pension accountant` outright, and `careers.nhs.scot` took a top-10 slot on a real head query |
| Pay comparison | `gp-salary`, `doctor-salary`, `doctors-salary`, `consultant-salary`, `nurse-salary`, `average-salary`, `salary-guide`, `salary-scale`, `pay-scale`, `payscale`, `take-home`, `take-home-pay`, `pay-review-body` | Salary-benchmark intent, not accounting intent. Vetoes `newly qualified gp salary uk`, `doctors salary uk calculator`. **Compound tokens only, never bare `salary`**, which would have vetoed our own `salary-vs-dividend-medical-limited-company-2026` |
| Career path | `how-to-become`, `medical-school`, `ucat`, `ucas` | `how to become a gp partner` is a career query owned by practiceindex and NHS careers. `become-a-gp` was tested and removed: it false-vetoed the genuine Bing query `can you become a gp partner by having increments taken out from your salary` |
| Education / media | `course`, `courses`, `webinar`, `podcast` | `bookkeeping courses gp medical practices` is a training-provider query |
| Patient-facing clinical | `symptoms`, `appointment`, `prescription`, `nhs-app`, `register-with-a-gp`, `find-a-gp`, `book-an-appointment`, `referral` | Patients searching their own surgery. **`patient`/`patients` and `treatment` were tested and removed**: they false-vetoed `global sum patient registration tiers`, `nhs england gp funding per patient capitation formula carr-hill weighted` and `tax treatment of gp fee`, all genuine lane-8 and lane-11 queries |
| Admin / directory | `reviews`, `trustpilot`, `companies-house`, `contact-hmrc`, `helpline`, `phone-number`, `government-gateway`, `personal-tax-account`, `minimum-wage`, `childcare` | Same class Property vetoes: HMRC navigation and listing noise |
| **Sibling sites** | `dental`, `dentist`, `dentists`, `dentistry`, `orthodontic`, `orthodontist`, `pharmacy`, `pharmacies`, `pharmacist`, `pharmacists`, `care-home`, `care-homes`, `domiciliary`, `home-care` | Section 4 |

`near-me` is deliberately **not** vetoed, unlike Property. On medical, `gp surgery
accountants near me` is high commercial intent and the city pages already serve it.

---

## 4. Boundary versus sibling sites

**The boundary is drawn by profession, not by "healthcare".**

**Medical owns and the lanes cover:** doctors and GPs (C2 row 16, ABSORBED-ALREADY,
containment 0.97), locum doctors (row 17, containment 1.00), hospital consultants and
private practice, GP partnerships and practices, the NHS pension in all its forms.

**Medical is the assigned host for four ABSORB clusters it has not built yet:**
opticians and optometrists (row 20), vets (row 21, flagged as the table's weakest host
call), therapists and allied health (row 22), nurses and healthcare professionals
(row 23). Lane 14 `allied_health` exists solely to hold this assigned ground so it reads
as a measurable hole rather than as absence.

**Medical does not touch, and the negative tokens enforce it:**
- **dentists** (`dentists` site, C2 row 15, 218 live pages). Consequence: the head query
  `dental and medical accountants` is vetoed and scores into no medical lane, and the six
  dentist-side domains in section 2c are excluded from the universe. That is correct even
  though it costs us a head term, because the term belongs to a sibling.
- **pharmacies** (`pharmacies` site, rows 18 and 19). Note the collision: gorillaaccounting
  ranks with `/accountants-for-locum-doctors-pharmacists/`, one page serving both. We
  compete with it on the locum-doctor half only.
- **care homes and domiciliary care** (`care` site, rows 24 and 25).

Boundary in one line: **medical owns the clinician, the practice and the NHS pension;
dentists, pharmacies and care own their own professions, and medical additionally holds
the not-yet-built opticians, vets, therapists and nurses ground.**

---

## 5. Config changes

`sites/medical.discovery.json`. Everything not listed below was preserved byte-for-byte:
`site`, `displayName`, `ownDomain`, `content_hints`, `skip_path_patterns`,
`news_patterns`, `evergreen_hints`, `topic_tokens`, `topic_buckets`.

| Key | Change |
|---|---|
| `competitors` | **Replaced.** 12 DDG-derived domains to 22 SERP-validated peer-winnable domains (section 2d). Replaced rather than merged because 4 of the 12 had zero DataForSEO top-10 evidence and 2 were bloating the sitemap counts |
| `_competitors_doc` | **Added.** Records the derivation, points at this report, and states why the non-peer authority domains are excluded |
| `lane_negative_tokens` | **Added.** 69 tokens, grouped and justified in section 3a |
| `lanes` | **Added.** 15 lanes. `topic_buckets` is left untouched: it is a separate, older taxonomy consumed by `competitor_watch`'s `assign_cluster` path, and rewriting it was not asked for and is not needed |

Verified: `python -m optimisation_engine.discovery.lane_map medical` now runs end to end
and writes `docs/medical/lane_map_2026-08-26.md`. It still reads the stale sitemap cache
(section 2d), so treat that first lane-map output as provisional until the next
`competitor_watch` run refreshes `briefs/medical/_competitor_urls.json`.

---

## 6. Plumbing fixes

**`optimisation_engine/discovery/lane_map.py` `_blog_dir()`.** Removed the
`Property/web/content/blog` hardcoded fallback; it now raises a named `ValueError`.

Verified first, as the brief required: medical's `sites/medical.json` **does** carry
`paths.blogContentDir = "Medical/web/content/blog"`, so medical would not have tripped
the fallback today. So would none of the other 16 sites. The bug is therefore not a
medical bug, it is a class bug: the fallback can only ever fire on a missing or
misspelled key, and when it fires it silently counts Property's corpus as the other
site's coverage and every "hole we plug" finding comes out wrong. Refusing to guess is
the correct behaviour for all sites, and matches what `competitor_watch.py:418` already
does by indexing `paths["blogContentDir"]` directly.

**`optimisation_engine/clients/serp_provider.py` domain normalisation.** Found while
tallying, and in scope because it silently degrades exactly this pass. DataForSEO's
`item["domain"]` keeps the `www.` prefix; `ddg_serp_client._domain_of` strips it. Two
consequences:

1. `divergence` was systematically overstated. Corrected, the mean across the 18 drops
   from 0.85 to 0.64, and `medical accountants london` goes from 0.56 to **0.00**, from
   "the providers half disagree" to "they agree exactly".
2. Worse, `competitor_watch.py`'s universe probe compares SERP domains against the bare
   domains in `competitors`. Every www-fronted competitor already in the config would
   have read as brand new and been auto-appended to `competitors_auto` on the first
   `--probe-universe` run.

Fix: `parse_serp_advanced` now derives the domain from the URL through the same
prefix-stripping helper. Also corrected `_domain_of`'s `lstrip("www.")` to
`removeprefix("www.")`; `lstrip` takes a character set, not a prefix, so it eats any
leading run of `w` and `.` characters. `wesleyan.co.uk`, which appears in this very
dataset, would have come out as `esleyan.co.uk` on any path that hit that helper.

**Check left behind:** `optimisation_engine/discovery/test_lane_map_blog_dir.py`.
```
$ python -m optimisation_engine.discovery.test_lane_map_blog_dir
ok: 17 sites, each resolving to its own blog dir
ok: unknown site raises instead of falling back to Property
ok: 78/79 medical slugs lane-assigned, siblings vetoed
```
It asserts every site in `sites/*.json` resolves to its own distinct blog dir, that an
unknown site raises rather than guessing, and that the medical lanes classify at least
95% of medical's slugs while vetoing dentist, pharmacy and care-home slugs.

---

## 7. Contradictions with the stage-0 briefing

**1. "Google has effectively NOT indexed this site" is too strong. It is partial, not
total.** Two of our URLs hold live Google top-10 organic positions right now, seen in the
DataForSEO SERPs:

| Query | Our URL | DFS organic rank |
|---|---|---|
| `gp partnership goodwill valuation` | `/blog/buying-into-gp-partnership-capital-parity-explained` | **6** |
| `gp partnership accounts specialist` | `/blog/gp-accounting-guide` | **6** |

GSC corroborates independently: `gp partnership goodwill valuation` averages position
10.3 over 90 days, `how much does it cost to buy into a gp partnership` 10.0, `gp partner
salary after tax` 10.9. A page cannot average position 10 while unindexed. The 27
inspected URLs were a sample of 79; the accurate statement is that indexation is sparse
and the indexed subset skews to the GP-partnership cluster. That is a materially
different diagnosis from starvation across the board, and it points somewhere useful:
**the partnership and goodwill lanes are where Google already gives this site air.**

**2. DDG also surfaced two of our non-blog URLs** that the flat-routing note does not
cover: `/calculators/nhs-pension-annual-allowance` (DDG rank 3) and
`/medical-guides/nhs-pension-annual-allowance` (DDG rank 9) on `nhs pension annual
allowance accountant`. Two live URL namespaces beyond `/blog/<slug>`, and two pages
covering the same topic. Worth a look in stage 2, flagged not diagnosed.

**3. The universe is not 12 domains and never was.** 61 distinct domains took a top-10
slot across 18 head terms. The programme-relevant count is 22 peer-winnable, and a third
of the real estate is unwinnable authority.
