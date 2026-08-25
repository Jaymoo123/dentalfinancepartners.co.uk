# PACK N1: net-new — Seafarers Earnings Deduction: how it works

Derived 2026-08-25 from FROZEN dossier `../specialist_professions_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **machinery-walkthrough-led**). Ground truth: house §22.1 (SED
machinery, mariners' NIC) and §22.2 (tonnage-tax boundary), with §2 for the self-assessment frame.
C1 row 87 = **CLEAR**, conditional on the proposition never becoming rebate-shaped. No C2 §8 gate.
**This is the highest-volume page in the cluster and the most fence-critical.**

## 1. Target and permission level

- NET-NEW pillar page, blog family. Proposed slug: `seafarers-earnings-deduction-uk` (writer may
  refine; resolver conventions).
- Grade: NET-NEW, everything writable. Revert path: delete pre-deploy; post-deploy enters
  `monitored_pages`.
- Shape: informational pillar, self-assessment framing throughout. It is a deduction claimed on a tax
  return, never a refund you apply for through us.
- **T1 (SED qualifying-days calculator) is owner-gated and NOT in scope here** (dossier §6, delta D5).
  The page is written so a calculator can be linked in later without a rewrite: one paragraph explains
  the day count and is built to take a tool link.

## 2. Equity register

None (net-new). Sits above N2: N1 owns the deduction mechanics, N2 owns the audience and service.

## 3. Market keyword slice (ledger, P-SED, ~1,100/mo assigned here, peer-winnable ~1,000)

| Keyword | Vol/mo | Best peer |
|---|---|---|
| seafarers earnings deduction | 260 | marineaccounts p4 |
| seafarer tax | 170 | marineaccounts p5 |
| seafarer taxation | 170 | marineaccounts |
| seafarer deduction | 90 | marineaccounts |
| seafarers deduction | 90 | marineaccounts |
| seafarers tax deduction | 90 | marineaccounts |
| seafarer allowance | 50 | marineaccounts |
| seafarers allowance | 50 | marineaccounts |
| seafarer tax exemption uk | 50 | marineaccounts |
| seafarers tax calculator uk | 50 | marineaccounts p3 (with a days calculator) |
| seafarer tax uk | 40 | marineaccounts |
| seafarers tax uk | 40 | marineaccounts |

`ship tax` 110, `marine accounting` 30, `seafarer uk` 70 and `uk seafarers` 70 are **N2's**, not this
page's (dossier §3 assignment). One incumbent holds p3-p8 on the entire set with **one page plus one
calculator**, which is the whole opportunity.

## 4. Competitor teardown (fetched 2026-08-25)

`marineaccounts.com/seafarers-earnings-deduction` — ~3,200 words, only **five headings**
("Seafarers Earnings Deduction", "What is the Seafarers Earnings Deduction?", "How to Qualify for
Seafarers Earnings Deduction", "Seafarers Tax Days Calculator", "SED Knowledge Base"), with a
**27-item knowledge base** carrying most of the depth. States 365 days, the 183-day single-visit cap
and the half-day rule. One illustrative sentence about the midnight test on 31 December, but **no
recomputable worked example**. Em-dashes throughout.

Its acquisition model, which we do not copy: opens "you could reclaim all the UK income tax paid on
your seafaring employment", drives a **"Start FREE SED Qualifying Test"** CTA twice, and runs a
**"Refer a friend and receive £50!"** incentive.

`marineaccounts.com/seafarers-tax-days-calculator` — p3 on `seafarers tax calculator uk`. Takes
departure and return date pairs and totals days outside the UK. ~400-500 words of surrounding copy
covering HS205, the 365-day period and the half-day rule.

`seafarerstaxreturns.com` — **would not return a body on fetch; not analysed.** No claim in this pack
rests on it.

## 5. Whitespace

- **The offshore-installation exclusion, stated plainly and early.** Rig, FPSO and installation workers
  are excluded however seagoing the job feels. The incumbent's qualifying funnel does not lead with the
  single most common disqualifier.
- **Employee-only, stated as a rule.** Self-employed crew cannot claim SED; they are ordinary
  self-employed traders. Nobody in the fetched sample says this cleanly.
- **The eligible-period test separated from the 183-day cap.** The incumbent's copy runs the two
  together so a reader can come away thinking 183 days out is the test. The test is a 365-day eligible
  period; 183 days is the cap on a single UK visit; the half-day rule is the ongoing test.
- **Mariners' NIC as an explicitly separate question.** Nobody in the sample addresses it. Our page
  states that the SED answer does not decide the NIC answer, describes the regime as flag, employer's
  place of business and domicile driven, and signposts rather than asserting an outcome.
- **A recomputable worked example** of the deduction against a full year's seafarer earnings.
- **The UK North Sea sector counting as UK**, and the voyage-begins-or-ends-outside-the-UK requirement.

## 6. Fences (binding — this is the cluster's rebate-risk page)

- **Never rebate-shaped.** No "reclaim", no "tax back", no "refund", no qualifying-test funnel, no
  referral bounty, no contingent or percentage fee, no assignment or nomination language, no link to a
  rebate firm. The deduction is claimed by the seafarer on a self-assessment return; we prepare returns,
  we do not process claims. If the proposition ever drifts rebate-shaped, the C1 standing constraint
  bites (row 87 is CLEAR only on this condition).
- **Machinery in HS205 order, always:** 365-day eligible period, midnight test, 183-day single-visit
  cap, half-day rule, ship not offshore installation, employee only. That order is the house writing
  rule for SED copy.
- **NIC:** state it is a separate regime and signpost. **Do not state an NIC outcome for any case**
  (house §22 open question 4: foreign-flag employer cases need manual verification first).
- **Residence:** claimant must be UK or EEA resident. Split-year and residence depth is signposted, not
  taught here.
- **Tonnage tax:** not on this page at all. `ship tax` and the tonnage-tax boundary paragraph are N2's.
- No em-dashes. **No house-position section numbers in reader copy** (report only; the trades wave
  leaked 71 and QA stripped them). No pipeline artefacts.
- Figures date-tagged. Rate-date discipline per language spec §2 for any income-tax band or Class 4
  figure used in the worked example.

## 7. Acceptance criteria (deterministic)

1. Queries answerable as H1 or question H2s: what is the seafarers earnings deduction; how do I qualify;
   how many days do I need outside the UK; does it apply to yacht crew; do offshore workers qualify; is
   it a refund or a deduction; how do I claim it; what about National Insurance.
2. Figures, recomputable and stated inline: 365-day eligible period; 183 consecutive days single-visit
   cap; the half-day rule expressed as a fraction of days elapsed; 100% deduction; HS205 named as the
   helpsheet.
3. One worked example: a named seafarer (one unused persona name and unused city per language spec §4)
   with a full year's earnings, the deduction applied, and the resulting income tax re-derivable at
   2026/27 rates with the August 2026 check tag.
4. Minimum 15 FAQ pairs (the incumbent has 27 and that breadth is why it holds p3-p8).
5. Zero refund, reclaim, rebate, tax-back or qualifying-test language anywhere. Adversarial QA greps
   for those six strings and fails the page on any hit.
6. Zero NIC outcome assertions; the NIC section signposts only.
7. Links: N2; core self-assessment page; core capital allowances not required. Resolver-clean, 0
   invented slugs. §4 floors + coverage floor pass.
8. The day-count paragraph is written to take a later tool link without restructuring (T1 is
   owner-gated, delta D5).

## 8. Expectation

~1,100/mo assigned with ~1,000 peer-winnable, against a single incumbent holding p3-p8 with one page.
Realistic: impressions across the full SED set within a quarter of indexing, Google top-10 on two to
three of the lower-volume phrasings first (`seafarer allowance`, `seafarer tax exemption uk`), the head
term `seafarers earnings deduction` a 2-3 quarter target because the incumbent's domain is topically
dense. Bing earlier. Maturity caveat: net-new, judge at 28d Bing / 90d Google. Failure trigger, written
before the build: zero impressions across all 12 phrasings at 90d post-index. Standing risk: if HS205's
machinery changes, this page needs a dated back-patch, not a rewrite; each test lives in its own H2 so
one block can be replaced.
