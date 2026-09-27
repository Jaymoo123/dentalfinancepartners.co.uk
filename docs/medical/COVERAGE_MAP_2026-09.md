# Medical coverage map (2026-09-27)

Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S3. Selection rules:
`docs/_engines/NETNEW_PROGRAM.md` section 8. Ground truth: `docs/medical/house_positions.md`.
Machine version: `docs/medical/coverage_map_2026-09.json` (one row per cell).
Research only. Nothing was written, changed or deployed.

---

## One page

**17 buyer situations. 86 cells. 37 covered, 15 partial, 34 missing.**

The corpus is not thin, it is lopsided. 88 posts and they crowd into two situations:
becoming or being a GP partner (about 30 posts) and the NHS pension annual allowance
(about 10). The people actually filling in the form are somebody else. Of the 29 real lead
messages on record, the repeated shapes are a hospital consultant starting private practice
and facing a first tax return, a salaried GP taking locum work on the side, a clinician with
a pension annual allowance charge, and a doctor near retirement. Two of those four have no
segment page and one has no decision page.

**Five buyer situations have zero pages of any kind:** HMRC enquiry or voluntary disclosure,
working abroad or returning to the UK, closing a medical company, resident-doctor exam and
relocation expenses, and clinical excellence awards.

### Top 10 missing cells, by demand

Demand is the DataForSEO UK monthly volume for the target query. It is low across this whole
niche, which is the central finding below, so the ranking is by demand first and by how often
the situation appears in the lead messages second.

| # | Missing cell | Target query | Monthly demand | Peer ranks |
|---|---|---|---:|---|
| 1 | GP partner earnings and drawings index (proof) | gp partner salary uk data | 480 | yes |
| 2 | Tax on the NHS pension lump sum | nhs pension lump sum tax | 40 | yes |
| 3 | Abatement: what earnings do to a pension in payment | nhs pension abatement | 30 | unchecked |
| 4 | Accountants for NHS doctors and GP partners (segment) | accountants for nhs doctors | 10 | yes |
| 5 | Accountants for allied healthcare practices (segment) | accountants for physiotherapists | 10 | unchecked |
| 6 | Cosmetic and non-therapeutic treatment VAT | cosmetic surgery vat | 10 | unchecked |
| 7 | Accountants for salaried GPs (segment) | accountants for salaried gps | no data | unchecked |
| 8 | Accountants for GP partners (segment) | accountants for gp partners | no data | no |
| 9 | Undeclared private or locum income: the disclosure route | voluntary disclosure hmrc tax | no data | unchecked |
| 10 | Returning to the UK: residence, split year and what to file | returning to uk doctor tax | no data | unchecked |

### Segment pages proposed (five new, on top of the four that exist)

The site has `/for-gps`, `/for-consultants`, `/for-junior-doctors`, `/for-locum-doctors`.
ChatGPT put us 1st for "specialist for locum doctors" (page exists) and 9th for "accountant
for NHS doctors and GP partners" (no page with that name). The five proposed pages are the
five buyer situations in the lead messages that no existing hub is named for.

1. `/for-nhs-doctors`: accountants for NHS doctors and GP partners (closes the 9th-place miss)
2. `/for-gp-partners`: the partner as an individual, split out of the practice-facing `/for-gps`
3. `/for-salaried-gps`: salaried GP with locum work on the side
4. `/for-retiring-doctors`: partial retirement, pension charges, practice sale
5. `/for-medical-companies`: doctors who already have a limited company

### Wave 1 (15 rows, manifest order)

| # | Need | Working title | Status now |
|---|---|---|---|
| 1 | segment | Accountants for salaried GPs | MISSING |
| 2 | segment | Accountants for doctors approaching retirement | MISSING |
| 3 | segment | Accountants for GP partners | MISSING |
| 4 | segment | Accountants for doctors with a limited company | MISSING |
| 5 | segment | Accountants for NHS doctors and GP partners | MISSING |
| 6 | decision | Private practice as a sole trader or through a limited company: how to choose | PARTIAL |
| 7 | decision | Taking locum work as a salaried GP: register, tax, and whether a company is worth it | MISSING |
| 8 | decision | Pay the annual allowance charge yourself or use Scheme Pays | PARTIAL |
| 9 | decision | Partial retirement, retire and return, or 24-hour retirement: how the three compare | PARTIAL |
| 10 | decision | Doing your own expenses claim or using a repayment agent | PARTIAL |
| 11 | decision | Undeclared private or locum income: the Digital Disclosure Service route | MISSING |
| 12 | decision | Closing a medical company: striking off, MVL and the phoenix TAAR | MISSING |
| 13 | decision | Returning to the UK: residence, split year and what to file | MISSING |
| 14 | decision | When private medical work becomes VAT registrable | PARTIAL |
| 15 | question | How to tell HMRC you have started locum work | MISSING |

### The thing the owner needs to decide

**The NETNEW demand rule does not survive contact with this niche.** Rule 3 says a subject
needs 100 to 5,000 UK searches a month. Measured on 113 keywords at DataForSEO on 2026-09-27,
**two** clear it: "retire and return nhs" (880) and "nhs pension calculator" (5,400, above the
band). Every situation-specific query the leads describe returns 10 to 50 a month or no data
at all. Head buyer terms do sit in band ("medical accountants" 720, "gp partner salary" 480,
"accountants for doctors" 390, "gp partnership" 390, "annual allowance charge" 210, "gp
accountants" 170, "scheme pays" 140, "nhs pension annual allowance" 110), but we already earn
impressions on all of those, which fails rule 1 instead. So **on a strict NETNEW reading,
almost nothing on this site is eligible.**

Meanwhile the site converts at 32 leads per 1,000 UK humans and Bing sends 325 clicks on
1,762 impressions across 978 mostly conversational queries, while Google sends 7 clicks on
6,584. The demand this site actually monetises is assistant-shaped and long-tail, and it does
not appear in a keyword volume tool. That is the argument for building the map on buyer
situations rather than on keyword volume, and it is why every cell below keeps its failed
rule recorded instead of being dropped. Section 13 S3 anticipates exactly this and says the
programme doc wins: the disagreement is reported here, not resolved silently.

---

## The evidence

### Lead messages (29 on record, read 2026-09-27, nothing quoted)

Recurring situations, most frequent first:

1. NHS consultant or registrar with a substantive post starting private work, no company yet,
   never filed a return (about 7 messages).
2. Salaried GP also doing self-employed locum sessions, wants the return done and the pension
   allowance checked (about 6).
3. NHS pension annual allowance charge, Scheme Pays and partial retirement, often in the same
   message as "and my tax return" (about 5).
4. Doctor setting up a limited company specifically for locum or remote work such as
   teleradiology (about 4).
5. One each: HMRC compliance enquiry, moving from salaried to partnership, working abroad and
   returning, maternity leave with a locum tax backlog, a doctor running a private GP
   membership company, a doctor with both a locum company and a property company.

Two of the 29 are spam or test-shaped and two are inbound sales pitches; they are excluded
from the counts above.

### Where the traffic lands (UK humans, bot gate on, 90 days to 2026-09-27)

| Entry page | Sessions | Leads |
|---|---:|---:|
| `/` | 61 | 14 |
| `/blog/becoming-gp-partner-financial-implications` | 97 | 0 |
| `/blog/gp-partner-vs-salaried-gp-tax-comparison` | 78 | 0 |
| `/medical-guides/medical-expenses-tax-treatment` | 53 | 1 |
| `/blog/gp-practice-income-pcse-statement-reconciliation` | 50 | 1 |
| `/blog/qof-income-gp-practice-accounting-explained` | 46 | 0 |
| everything else (about 34 pages) | the remainder | 8 |

The homepage is 7% of entries and 54% of leads. The two biggest blog pages are 175 sessions
and zero leads: they are reader pages about what a GP partner earns, not decision pages. None
of the four `/for-` hubs appears in the top 40 entry pages, which is consistent with their
job being assistant citation rather than organic entry.

### Search

- **Google, 2026-06-29 to 2026-09-24 (sc-domain):** 6,584 impressions, 7 clicks, 351 queries.
  The top queries are all buyer head terms and all sit at position 40 to 70: "gp accountants"
  1,176 impressions at 40.7, "medical accountants" 654 at 41.7, "gp practice accountants" 370
  at 59.7, "accountants for doctors" 262 at 68.1. The site is eligible and invisible, which
  matches the 20-of-138 indexing figure.
- **Bing (Webmaster query stats):** 978 queries, 1,762 impressions, 325 clicks, most at
  average position 2 to 6. The queries are sentences, not keywords. Subjects with zero Bing
  presence line up exactly with the missing cells: HMRC enquiry or disclosure (0 queries),
  student loans (0), goodwill (0), working abroad (2 impressions), maternity (1).
- **Peer top-20 check, live UK Google, 2026-09-27, 10 queries:** we are absent from the top 20
  on all 10. Specialist peers hold slots on 8 of the 10, most often Larking Gowen, Taxwise,
  Medics' Money, MMBA, Sial and Nichols Medical. Two queries have no specialist peer at all:
  "retire and return nhs" (NHS, union and forum pages) and "accountants for gp partners" (no
  medical specialist in the top 20 for that exact phrase).

### Topic pool

`blog_topics` where `site_key = 'medical'` holds **62 rows, every one of them `status =
published` and `used`**. There are no unused briefs. Every MISSING cell in this map therefore
carries `pool_row_id: null` and needs a brief written from scratch. The programme doc already
flags this ("medical 62 and needs a refill"); this map is the refill list.

### Inventory counted

87 live blog posts plus 1 deliberately redirected, 8 category hubs, 4 `for-` hubs,
`/services`, `/nhs-pension`, 10 calculators, 5 location pages, 5 medical guides, 5 resource
guides, 1 research asset (`/research/annual-allowance-pension-tax-index`). Routing is flat
`/blog/[slug]`.

---

## The map

Situations are numbered as in the JSON. Status is COVERED (a page is the subject), PARTIAL (a
page touches it and should be extended), MISSING (no page, brief needed). Subject match, not
slug tokens.

### 1. NHS consultant starting or growing private practice (7 cells: 2 covered, 3 partial, 2 missing)

The most common lead shape on the site and the weakest coverage relative to that. The segment
page exists (`/for-consultants`) and the calculator exists
(`/calculators/consultant-private-vs-nhs`). What is missing is the decision itself. The only
incorporation page is `medical-practice-incorporation-step-by-step`, a how-to; the page that
answered "should I" (`private-practice-incorporation-complete-guide`) is 301'd away at
`src/middleware.ts:21`. Also missing: indemnity and practising-privileges deductibility, which
Bing shows real conversational demand for (19 impressions on MDU indemnity questions).

### 2. Salaried GP picking up locum work (5 cells: 1 covered, 1 partial, 3 missing)

Second most common lead shape, and the site has no page named for this person. `/for-gps` is
written for practices and partners. The three missing cells are the whole journey: the segment
page, the register-or-incorporate decision, and the mechanical "how do I tell HMRC" question
that Bing already shows people asking us.

### 3. Doctor setting up a limited company for locum work (5 cells: 4 covered, 1 missing)

The best-covered situation on the site, and the one ChatGPT ranks us 1st for. Only gap: the
inside-IR35 trap when a salaried GP locums at their own practice, which Bing shows being asked
in several phrasings.

### 4. Annual allowance charge (7 cells: 2 covered, 4 partial, 1 missing)

Deep coverage, wrong shape. Six posts, two calculators, a guide and the research index all
explain the allowance. None of them is the decision page: pay the charge or elect Scheme Pays,
with the deadlines. That is the page the leads are asking for. The pension input amount and
Total Reward Statement question has no page at all.

### 5. Retirement, partial retirement and retire and return (6 cells: 0 covered, 1 partial, 5 missing)

The weakest coverage against the strongest measured demand on the site. "retire and return
nhs" is 880 a month, the only in-band query in the whole niche, and the SERP has no specialist
peer on it. One post touches partial retirement. Lump sum tax, abatement, the April 2027
pension-IHT change and a partial-retirement modeller are all absent, and there is no segment
page for a doctor near the end of a career.

### 6. Becoming a GP partner (7 cells: 5 covered, 0 partial, 2 missing)

Saturated on content, unnamed on service. Five strong decision and question pages, a
calculator, and the two highest-traffic posts on the site. What is missing is the segment page
("accountants for GP partners") and a data asset on partner earnings, which is the one proof
cell on this site with in-band demand (480 a month) and a live peer.

### 7. GP partner running, merging or leaving a practice (7 cells: 6 covered, 0 partial, 1 missing)

Effectively complete. Only gap: whether a GP practice can incorporate at all, a question the
pension rules make genuinely hard (house positions §2.C) and which no page answers.

### 8. Resident doctor and employment expenses (6 cells: 2 covered, 1 partial, 3 missing)

The hub exists and the calculator exists. The content is one uniform-and-laundry post. Exam
fees and royal college subscriptions, rotational relocation, and student loans across PAYE and
locum income are all missing. House positions §11.A takes a firm line on repayment agents and
no page carries it, which is the Wave 1 decision cell here.

### 9. HMRC enquiry, penalty or disclosure (3 cells: 0 covered, 0 partial, 3 missing)

Zero pages, zero impressions on either engine, and a lead on record asking for exactly this.
The disclosure decision page is in Wave 1; the segment page and the penalties page follow.

### 10. Medical limited company, taking the money out (7 cells: 4 covered, 1 partial, 2 missing)

Well covered on extraction (salary versus dividends, retained profit, director's loan
account). Missing: the segment page for a doctor who already has a company, and closing the
company, where house positions §16 carries the phoenix TAAR position and nothing cites it.

### 11. Working abroad, arriving or returning (3 cells: 0 covered, 0 partial, 3 missing)

Zero pages. Two impressions on Bing, none on Google. A lead on record. Low measured volume and
the situation is genuinely high-value per person, so the decision page is in Wave 1 and the
other two are later.

### 12. Maternity and parental leave (3 cells: 1 covered, 1 partial, 1 missing)

One strong post covering SMP, Maternity Allowance and the occupational scheme. Pension accrual
during leave is inside that post rather than findable. Catching up on late returns and missed
pension forms after leave, which is literally a lead message, has no page.

### 13. Selling a practice or realising goodwill (3 cells: 2 covered, 0 partial, 1 missing)

CGT and BADR at the 2026 rates is covered, so is NHS goodwill. Missing: business relief and
the 2.5m allowance where a company holds investments (house positions §15).

### 14. VAT on private income (4 cells: 1 covered, 2 partial, 1 missing)

Bing shows 113 impressions across 76 VAT queries, the third largest topical cluster on that
engine, and the site has one registration post plus one income-streams post. The registration
decision needs its own page; the exempt-versus-standard-rated split and the cosmetic and
non-therapeutic side both need work.

### 15. Medico-legal and other non-clinical income (3 cells: 1 covered, 0 partial, 2 missing)

The medico-legal post is good. Teaching, appraisal and media income, and clinical excellence
awards (both taxed and pensioned differently), have no page.

### 16. Choosing a medical accountant (5 cells: 3 covered, 1 partial, 1 missing)

This is the assistant prompt itself. The missing cell is the page named for the exact prompt
ChatGPT ranked us 9th on. Locations: 5 proper pages, plus 11 city posts sitting in the blog
where second-tier cities should have real location pages.

### 17. Allied practice owners (5 cells: 4 covered, 0 partial, 1 missing)

Four thin-edge posts for physiotherapists, opticians, vets and nurses. They convert nothing
and the leads are doctors, so the only cell proposed is a single segment page, waved later.
Dentists and pharmacies belong to other sites in the estate and are out of scope here.

---

## Notes and limits

- **Calculators.** Ten exist. The map names one missing number, a partial-retirement income
  and pension modeller, and one partial, carry-forward across three years, which the existing
  annual allowance calculator does not model. Both are waved later.
- **Proof pages.** One exists. Two are proposed: a GP partner earnings and drawings index
  (in-band demand, live peer) and a private practice fee and tax burden index. Neither is in
  Wave 1 because both need source data decided first.
- **Ground truth.** Every cell's `hp_anchors` points at house-positions sections that already
  exist. No figure is asserted in this map that is not already locked there. The GMC retention
  fee is flagged UNVERIFIED in §8 and no cell depends on it.
- **No claims about the firm** appear in this map or in any proposed title. The segment pages
  name the audience, not a capability.
- **Spend.** DataForSEO, 2026-09-27: keyword volume $0.09 + $0.09, live SERP top-20 $0.032.
  **Total $0.212** against a $2 budget.
