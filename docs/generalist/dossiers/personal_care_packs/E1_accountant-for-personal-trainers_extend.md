# PACK E1: `accountant-for-personal-trainers` — EXTEND (additive only)

Derived 2026-08-25 from FROZEN dossier `../personal_care_fitness_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **additive status-fork append**). Ground truth:
house_positions.md **§20.4**, plus **§20.3** (gym costs, one sentence only, depth goes to N2),
**§2** (sole trader, Class 4), **§13** (IR35 and status factors), **§7** (VAT), **§12** (mileage),
**§17** (trading allowance), **§9** (MTD timetable figures). Cite in the writer's report, never on
the page.

## 1. Target and permission level

- Existing page: `generalist/web/content/blog/accountant-for-personal-trainers.md`, 2,471 words,
  dated 2026-05-17, category `Sole Trader and Self Employment`.
  Current title: "How to Choose an Accountant for Personal Trainers in the UK".
  Current metaTitle: "Accountant for Personal Trainers UK: Tax & Accounting Guide".
- Grade **EXTEND** (dossier §5: Google **1 click** / 52 impressions / pos 12.0; Bing 0/0). It earns
  the cluster's only click.
- **ADDITIVE ONLY. metaTitle, H1 and the existing H2 order are untouched.** New question H2s and
  FAQ entries are appended into the existing spine; nothing is reordered, retitled or deleted.
- **C1 gate: none blocking.** Row 61 is C1 CLEAR and unregulated, and is not in
  `C2_PLACEMENT.md` §8's carried-forward gate list. **Recorded:** C2 flags CAUTION on row 61's
  contamination column (0.24). Placement signal only; no copy fence follows from it.
- **GT gate: house §20.4 authored (DRAFT 2026-08-25).** No §20 open question touches this page.
- Frozen-ground check: not in an armed `monitored_pages` window on the registers on file; verify
  against the live table before editing.
- Revert path: git revert this file; `monitored_pages` baseline captured at deploy.

## 2. Equity register (do not lose — this is the cluster's only click)

| Query | Engine | Evidence |
|---|---|---|
| personal trainer accounting | GSC + discovery pool | 17 impressions, pos 19.9, protect |
| (page level) | Google | **1 click** / 52 impressions / pos 12.0 |
| (page level) | Bing | 0 / 0 |

Existing H2s, all of which stay in place and in order: Why Personal Trainers Need a Specialist
Accountant / Sole Trader or Limited Company / VAT: The Trap Personal Trainers Fall Into Most Often
/ What Expenses Can a Personal Trainer Claim? / Making Tax Digital for Personal Trainers / IR35 and
Personal Trainers Working Through a Limited Company / When to Hire an Accountant / What to Look for
in an Accountant / Frequently Asked Questions.

The page already has an FAQ block, so appended question entries have a home.

## 3. Market keyword slice (ledger, E1 head family, ~30/mo per C2, peer-winnable 0)

| Keyword | Vol/mo | Best peer |
|---|---|---|
| personal trainer accounting | (GSC + pool) | none ranked, ours pos 19.9 |
| accountant / accounting for personal trainers (head family, C2 corpus figure) | ~30 | none ranked |

No specialist accountancy firm ranks for the PT head at all (dossier §1: the fitness side has no
ranking specialist). The page-1 holders are fitness-media and generic-firm blogs. Coverage over
selection applies; volume is not a gate.

## 4. Competitor teardown (fetched 2026-08-25)

`origym.co.uk/blog/pt-tax-expenses/` — page-1 on the PT expenses head set, ~5,200 words, the de
facto incumbent, and a fitness-qualification provider rather than an accountancy firm.

- Structure: an H2 per expense category, scaffolded as "#1 Training Courses", "#2 Office Costs",
  "#3 Marketing", "#4 Travel", "#5 Clothing", "#6 Staff", "#7 Selling Goods", "#8 Legal and
  Financial Fees", then five sections about working with an accountant. Second person throughout,
  no FAQ block, minimal em-dashes.
- **Stale on every figure:** the tax year is stated as **6 April 2022 to 5 April 2023**, the
  personal allowance is tagged "2022-23", and the £1,000 threshold is tagged to that year. Its one
  worked example (£30,000 income, £12,570 allowance, £5,000 expenses, £12,430 taxable) calls
  freelance profit a "salary".
- **Missing entirely:** mileage rates (it lists fuel, insurance and repairs but never the approved
  mileage rates), the trading allowance as a concept, employed-versus-freelance PT status, mixed
  employment plus self-employment in one tax year, VAT, MTD, and any statutory reference.
- Its gym-cost coverage is a single line under rent ("Rent, only on business premises e.g. Rent on
  a Gym Space"), which does not answer what a licence fee actually is.
- Secondary reference points from the free SERP sweep, not fetched for teardown because they hold
  no measured position in the harvest: agileaccountants, simpletaxes, kmaccountancy, and a
  "healthcare accountants" PT page. Recorded rather than invented.

**Read:** the PT head is held by a stale expenses listicle from outside the profession. Our page
is already better sourced; what it lacks is the status content the audience actually searches for.

## 5. Whitespace (what the appended sections take)

- **The status fork nobody covers.** An employed instructor (gym payroll, gym's classes, gym's
  clients) is on PAYE. A freelance PT paying the gym a **licence or rent fee** to train their own
  clients on the floor is self-employed, and that fee is deductible. Origym does not distinguish
  them; no accountancy competitor ranks at all.
- **Mixed status in one tax year is normal and is not covered anywhere:** employed instructor by
  day, freelance PT in the evenings means PAYE employment plus self-employment on the same return,
  each taxed under its own rules, with the employment's tax code interacting with the payments on
  account. This is the single most useful thing we can add.
- **Gym licence and rent fees as expenses**, named properly rather than filed under generic rent,
  including what a percentage-of-takings arrangement is.
- **Mileage between clients and sites** at the current approved rates, which origym omits entirely.
- **The trading allowance and the registration trigger** for a PT starting out alongside another
  job, which origym omits entirely.
- One recomputable **2026/27** worked example for a mixed-status year.

## 6. Fences (binding)

- **Additive only.** metaTitle, H1 and existing H2 order byte-identical post-edit. New H2s appended
  after the existing tax sections and before the "When to Hire" service tail, or as FAQ entries.
- **IR35 stays bounded to the existing H2's scope:** IR35 is only in play where the PT operates
  through a personal service company and the end client is not a private consumer. Consumer-facing
  PT work through a company is outside the off-payroll rules' typical bite, though the company
  still runs its own corporation tax and extraction mechanics. Do not expand the IR35 section into
  a status hub; the new status content is about employed versus self-employed, not IR35.
- **Gym membership as a cost gets one sentence and a link to N2.** No OpRA depth, no s.261 depth,
  no sole-trader-fitness-spend analysis here. If the reader's own fitness spend is mentioned, the
  house line applies without softening: personal fitness spend is generally disallowed on duality
  of purpose, and this page does not promise otherwise.
- Rates date-tagged: AMAP **55p for the first 10,000 business miles then 25p, from 6 April 2026**
  (45p only for 2025/26 and earlier, clearly tagged); trading allowance £1,000 and the 5 October
  registration trigger; VAT £90,000 / £88,000; MTD ITSA thresholds and April dates; Class 4 at
  6% / 2% and the £12,570 / £50,270 bands tagged as the **2025/26 rates, still current when
  checked in August 2026**.
- No hair, beauty or salon content (R1, R2, N1 ground).
- No em-dashes in added copy. **No house-position section numbers in copy.**
- No "#1 / #2" numbered expense scaffolding (origym's device, banned in the language spec §4).

## 7. Acceptance criteria (deterministic)

1. `personal trainer accounting` remains matchable, and the page-level Google click surface is not
   disturbed: metaTitle, H1 and existing H2 order byte-identical.
2. New question H2s or FAQ entries answer, in the reader's phrasing: am I employed or self-employed
   as a personal trainer; is my gym licence fee an allowable expense; can I be employed at a gym
   and self-employed at the same time; how do I handle tax if I have a job and PT clients; can I
   claim mileage between clients.
3. Figures carried, recomputable: AMAP 55p/25p from 6 April 2026; £1,000 trading allowance;
   5 October registration; £90,000 VAT; MTD ITSA thresholds and dates; one 2026/27 worked example
   (e.g. Lorraine in Exeter, part-time gym employment plus evening PT clients, employment income
   and self-employed profit taken to income tax and Class 4, re-derivable). Class 4 and band
   figures carry the 2025/26 still-current-August-2026 tag.
4. Links: N2 (gym membership), the sole-trader allowable expenses checklist, the MTD page;
   resolver clean, zero invented slugs.
5. No hair, beauty or salon keyword appears in any added H2.
6. Zero em-dashes in added copy; zero house-position citations in body copy.
7. Adversarial QA verifies the status sections against house §20.4 and confirms IR35 was not
   expanded beyond the personal-service-company boundary.

## 8. Expectation

Protective plus capture. Hold the single Google click and pos 12.0, and add impressions on the
status and mixed-employment phrasings, which no ranking page answers. Realistic: page-level
position moving into single figures within a quarter, and the first Bing impressions this page has
ever had. Maturity caveat: appended sections are new surface, judged at 28d Bing / 90d Google.
Failure trigger, written before the edit: Google clicks at zero across any 90-day window
post-deploy, or `personal trainer accounting` unmatchable, or the metaTitle/H1/H2 order changed,
= revert.
