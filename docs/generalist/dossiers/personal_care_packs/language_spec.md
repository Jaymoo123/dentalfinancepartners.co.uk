# Language spec — personal_care_fitness cluster (one spec, all 5 packs inherit it)

Written 2026-08-25 per `REWRITE_PROGRAM.md` §9.11, from the ranking pages actually fetched for the
pack teardowns. No paid calls; all observations below are from free WebFetch/WebSearch on
2026-08-25.

**Sample (rank-weighted winners, not brands).** The cluster has almost no specialist field
(dossier §1), so the winner set is small and honest:

| Page | Position evidence | Words (fetched) | Role in sample |
|---|---|---|---|
| pulse-accountants.co.uk `/blog/gym-membership-benefit-in-kind` | pos 3 (`gym membership benefit`), 9, 10, 20, 22, 29, 30, 31 across the N2 set | ~4,200-4,400 | the cluster's only genuine top-10 explainer |
| pulse-accountants.co.uk `/services/salary-sacrifice/gym-membership` | pos 6 (`salary sacrifice gym membership`, 170/mo) and pos 6 (`gym salary sacrifice`) | ~2,100 | top-10 service page, factually wrong (see §3) |
| alto-accounting.com `/insights/rent-a-chair-hairdresser-tax-uk` | pos 16, `hmrc guidelines to rent a chair for hairdressers` (170/mo) | ~2,400-2,600 | the only chair-rental page in the market |
| fusionaccountants.co.uk `/barbers-hairdressers-beauty-salon-therapist/` | page-1 head-term ranker on `accountant for hairdressers` (free SERP sweep) | ~2,100-2,400 | head-term service-page model |
| origym.co.uk `/blog/pt-tax-expenses/` | page-1 on the PT expenses head set (free SERP sweep) | ~5,200 | the PT side's de facto incumbent |

**Not fetched, stated rather than invented:** salonexpertaccountants.co.uk ranks only pos 21-56 on
software terms and holds no accountancy head, so it was excluded as a non-winner rather than torn
down. The five head-term multi-niche domains parked as dossier delta D1 (mytaxdoc, mccaccountants,
ross-brooke, accotax, plus fusion's siblings) were not harvested; fusion was fetched free as the
representative head-term page. If D1 lands before writing, re-check §1 against it.

**D1 harvested 2026-08-25 (owner-authorised spend). §1 re-checked: the winner set above is
unchanged.** No head-term ranker was found on any of the five: fusion, mytaxdoc, mccaccountants
and ross-brooke return zero keywords in the cluster's whole term family, and accotax returns only
the N2 gym set plus Companies House brand noise. Two things follow, both binding on the writers.
(1) **One addition to make before N2 is drafted:**
`accotax.co.uk/is-a-gym-membership-tax-deductible-for-business-in-the-uk/` is a second N2 ranker
that beats pulse on 5 of 6 shared phrasings and holds pos 6 on `can a gym membership be a
business expense`. It has not been fetched, so it has no row here yet; fetch it free, tear it
down, and add a row if it earns one. Until then, treat §1's "pulse is the only genuine top-10
explainer" as unverified for N2 specifically. (2) **Do not read the four zeros as SERP absence.**
Fusion's row above rests on a free SERP sweep and stands; the head terms are simply below
DataForSEO's tracked-volume floor, which is itself evidence that these heads are low-volume and
under-competed rather than contested.

---

## 1. Measured answer patterns (what the winners actually do)

- **Length is not the lever, and here it is close to anti-correlated.** The pos-6 salary-sacrifice
  page is 2,100 words; origym's 5,200-word PT guide holds its slot on expense-list breadth alone.
  Alto's 2,400-word chair page is the best-written thing in the sample and sits at pos 16, which
  says the topic is under-competed, not that quality failed. Do not write to a word target.
- **Question-form H2s dominate the winning explainer.** Pulse's gym page is 21 H2s, of which 17 are
  questions ("Is a Gym Membership a Taxable Benefit in the UK?", "Can a Gym Membership Benefit Be
  Provided via Salary Sacrifice?"). Every one answers in sentence one, usually starting "Yes," or
  "No,". That opening-word directness is the single most copyable habit in the sample.
- **The ruling sentence carries the classification, then the consequence.** Pulse: "Yes, in most
  cases, a gym membership paid for by an employer is treated as a taxable benefit in kind in the
  UK." Alto: "Renting a chair in a salon does not automatically make a hairdresser self-employed
  for tax purposes." Both name the outcome before any context. Copy the shape.
- **Date-tagging is already the differentiator in this cluster and alto proves it works.** Alto's
  H1 carries "(2026/27)", its figures are the current set (£90,000, 15% employer NIC above £5,000,
  £10,500 Employment Allowance) and it names a verification month. Pulse, ranking far higher,
  carries a **stale 13.8% Class 1A rate**. Our advantage is being alto-current at pulse's depth.
- **Worked examples are rare and thin.** Only two exist in the whole sample: alto's chair example
  (£150/week rent, 20% = £30/week, £1,560 a year per chair under-accounted) and origym's
  £30,000 / £12,570 / £5,000 / £12,430 illustration, which is labelled a "salary" and uses
  **2022/23** figures. Alto's is the standard to beat; a recomputable 2026/27 example on every
  page clears the whole field.
- **Two questions kept apart beats one mushy answer.** Alto's strongest move is separating
  employment status from the VAT treatment of the rent and saying so explicitly ("the two questions
  are decided under completely different rules"). Reproduce that separation habit, not the wording.
- **Head-term service pages in this niche carry no tax content at all.** Fusion's page states no VAT
  threshold, no MTD, no worked example, and its only figures are barber earnings ranges
  (£40-£60 a day, £18,000-£24,000). Its opener is community filler ("form the focal point of any
  high street or local community"). The head terms are winnable on substance alone.
- **Second person throughout, short declaratives.** Universal in the sample. Keep it.

---

## 2. House voice constraints (binding on all 5 packs)

- Plain cost-conscious British English, consumer register, the reader in the sentence. This
  audience is sole traders and micro-employers (dossier §7): every figure in pounds, no unexplained
  acronym (spell out VAT, BIK, NIC, OpRA, MTD, PAYE, ITSA at first use on each page).
- **No em-dashes anywhere in copy.** Alto and pulse both use them heavily; we do not.
- **No published house-position citations in reader copy.** House positions are cited by section
  number in the writer's report and in these packs, never on the page. No "(§20)", no "(HP20.1)",
  no "per house position", no "verify at build". **The trades wave leaked 71 such citations into
  page bodies and QA had to strip them all; that is the specific failure this line exists to stop.**
  Statutory references (VATA 1994 Sch 9 Group 1, ITEPA 2003 s.261) are reader-facing and fine.
- **No "this guide" / "in this article" openers, no "unique financial challenges" filler**
  (fusion's opener is the specimen to avoid), no "focal point of the community" scene-setting.
  H1 poses the real question or names the real service; sentence one answers or asserts.
- **No AI tells:** no rule-of-three stacks, no "it's important to note", no mirrored "not only, but
  also", no closing summary section that repeats the page.
- **Every rate date-tagged.** Class 4 NIC 6% / 2% and the £12,570 / £50,270 bands are locked
  **2025/26 only**. Where 2026/27 copy needs them, tag them as "the 2025/26 rates, still current
  when checked in August 2026" rather than asserting them as 2026/27 figures. AMAP is 55p/25p
  from 6 April 2026. Employer NIC is 15% above £5,000 from 6 April 2025. Class 1A follows the
  employer NIC rate, so **never write 13.8%**.
- **A worked example with recomputable 2026/27 figures on every page where the SERP lacks one**,
  which is every page in this cluster.
- Hedges are house-locked wordings, not vibes: the chair-rental standard-rating date, the
  disaggregation describe-never-prescribe fence, the OpRA "salary sacrifice does not launder it"
  pairing, the s.261 in-house-only limit, the sole-trader fitness-spend refusal. Use them verbatim
  in substance.
- **Coverage over selection.** Volume is not a gate. The two REFRAME pages and the EXTEND page are
  written to full quality even though their assigned head volume is ~40 and ~30 a month.

---

## 3. Do-not-copy list (measured on the same sample)

- **pulse gym BIK page: Class 1A NIC stated at 13.8% and its worked figures built on it**
  (£500 x 13.8% = £69). The rate has been 15% since 6 April 2025. This is the top-ranking page in
  the cluster and it is wrong; reproduce its question-H2 density and its direct "Yes," openings,
  never its arithmetic. Also: 21 H2s of which the last two are pure sell ("How Can Pulse
  Accountants Help", "Why Choose Pulse Accountants?"), em-dashes throughout, no statutory
  references at all, no sole-trader treatment.
- **pulse salary-sacrifice service page: presents gym salary sacrifice as a tax saving**
  ("the primary advantage for employees is the reduction in National Insurance contributions and
  tax payments") and **makes no reference to the OpRA rules whatsoever**. This is the exact
  position house §20.3 forbids. It ranks pos 6 on 220/mo of combined salary-sacrifice demand.
  Correcting it in public is N2's single biggest whitespace claim. Never imitate its framing; also
  never write the correction as an attack on a named firm.
- **alto chair page: cites VATLP19820 as the live manual paragraph and gives no statutory basis
  at all.** No mention of the 1 October 2012 change, no VATA 1994 Sch 9 Group 1 para (ma). House
  §20 open question 2 says the live VATLP paragraph is unpinned, so **do not repeat alto's
  paragraph number**; cite the statute (which is locked) and the manual only if independently
  verified at write time. Model to copy: its date-tagged H1, its two-questions separation, its
  worked example discipline. Not to copy: em-dashes, three CTA blocks, "If you remember 5 things"
  listicle tail, and the sidebar-calculator cross-sell.
- **origym PT guide: 2022/23 figures presented as current** (personal allowance £12,570 tagged
  "2022-23", the £1,000 threshold tagged to the 6 April 2022 to 5 April 2023 year), a worked
  example that calls freelance profit a "salary", **no mileage rates, no trading-allowance
  framing, no employed-versus-freelance status treatment, no mixed-status treatment**. Its
  numbered "#1 - #8" expense-list scaffolding is a listicle device, not a model.
- **fusion head page: zero tax substance.** Community-filler opener, barber wage ranges instead of
  tax figures, no VAT threshold, no MTD, no worked example, "Why choose us?" and "Why our clients
  love us" as H2s. It ranks on brand and structure, not answers. Never copy the shape.
- **salonexpertaccountants.co.uk: software-product positioning** (ranks only for "salon accounting
  software" phrasings, pos 21-56). The software angle is screened out of this cluster entirely
  (dossier §4, EX-SOFTWARE); do not drift a page toward software comparison to chase it.

---

## 4. Differentiation note — lead structures (assigned, so 5 parallel pages do not converge)

One lead structure per pack. The opening 40% of each page must follow it, and no two siblings may
share an H2 phrasing.

**Cumulative bans, binding here.** Persona names already used by earlier waves and **banned**:
Maya, Amara, Jess, Daniel, Sophie, Priya, Roshan, Tomasz, Wes, Ruth. Example cities **banned**:
Manchester, Nottingham, Sheffield, Leeds, Bristol, Birmingham, Liverpool, Glasgow, Dundee,
Coventry, Carlisle, Wakefield, Croydon, Dover, Inverness.

**Wave-specific device bans, so this wave does not converge with the creative or trades waves:**

- No "older articles" or "this page was updated" openers (creative wave device).
- No numbered "#1 / #2" expense-list scaffolding (origym device, and a listicle tell).
- No "If you remember 5 things" or equivalent takeaway-listicle tail (alto device).
- No reference-table-first opening (trades N5 owns that structure).
- No process-walkthrough "register to file" spine (trades N2 owns it).
- No decision-points opener framed as employed / self-employed / running a firm (trades N8).
- No "unique challenges of the X industry" opener and no "keep more of what you earn" framing
  (both already on the trades do-not-copy list; fusion and origym reproduce them here).
- Suggested worked-example persona names for this wave, all unused: **Nadia, Callum, Bethan,
  Imran, Lorraine**. Suggested example locations, all unused: **Norwich, Swansea, Stoke-on-Trent,
  Reading, Exeter**. One name and one location per page, no repeats across the five.

| Pack | Grade | Lead structure (binding on the opening 40%) |
|---|---|---|
| R1 `accountant-for-hairdressers-uk` | REFRAME | **Money-flow-led:** the salon's money in and out as the spine (own takings, chair rent received, product sales, tips), each flow taken to its tax and VAT consequence before any service framing |
| R2 `accountant-for-beauty-therapists` | REFRAME | **Threshold-led:** the VAT registration question owns the top of the page and is answered with arithmetic first, structure and expenses subordinate to it |
| E1 `accountant-for-personal-trainers` | EXTEND | **Additive status-fork append only:** new question H2s on employed instructor versus freelance licence-fee PT and mixed status in one tax year, plus FAQ entries; existing structure untouched |
| N1 rent-a-chair (net-new) | NET-NEW | **Both-sides-led:** a side-by-side salon-owner column and stylist column decision table opens the page, prose then works each column down; the two questions (status, VAT on the rent) kept visibly separate throughout |
| N2 gym membership (net-new) | NET-NEW | **Four-verdict-led:** four one-sentence rulings up front (employee benefit, salary sacrifice, sole trader, limited company), then a section per verdict; the OpRA correction sits in the second section, not buried |

Editorial QA checks each page against THIS spec and its assigned lead structure, not reviewer taste.
