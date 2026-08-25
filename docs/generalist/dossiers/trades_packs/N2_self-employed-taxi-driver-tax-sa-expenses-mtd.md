# PACK N2: net-new — self-employed taxi driver: Self Assessment, expenses and MTD

Derived 2026-08-25 from FROZEN dossier `../trades_transport_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **process-led** register-to-file walkthrough). Middle page of
the taxi spine; the cluster's biggest assigned volume (890/mo, 770 peer-winnable).

## 1. Target and permission level

- NET-NEW page, sole-trader blog family. Proposed slug:
  `self-employed-taxi-driver-tax-self-assessment` (writer may refine; resolver conventions).
- Grade: NET-NEW, everything writable. Revert path: delete pre-deploy; post-deploy enters
  `monitored_pages`.
- Shape: consumer walkthrough. Expenses and MTD are folded in as H2s, NEVER split into their own
  pages (dossier §2: livingstones runs three pages across this set; the fold-in is deliberate,
  one page per topic discipline).

## 2. Equity register

None (net-new). Must not poach the gig-status set (E1) or VAT questions (N3).

## 3. Market keyword slice (ledger, T-SA, 890/mo, peer-winnable 770)

| Keyword | Vol/mo | Best peer |
|---|---|---|
| self employed taxi driver / self-employed taxi driver / self employed taxi drivers / self-employed taxi drivers | 110 x4 | livingstones p9-10 |
| taxi driver self employed / self-employed / taxi drivers self employed | 110 x3 | livingstones p7-10 |
| taxi expenses | 70 | livingstones p11 |
| self-employed taxi driver expenses | 40 | livingstones p19 |
| hmrc digital tax rules taxi drivers | 10 | livingstones p23 |

## 4. Competitor teardown (top ranker across the set, fetched 2026-08-25)

- `livingstonesaccountants.co.uk/blog/self-assessment-for-taxi-drivers-in-the-uk...` — p7-10 on
  all seven status phrasings. ~3,200w, 10 H2s, 9 FAQs, strong expenses list. **Poisonous facts:
  Class 2 quoted at £3.45/week as a live payment (treated as paid since 6 Apr 2024, §2); 45p/25p
  mileage as current; MTD entirely absent** (its p23 on `hmrc digital tax rules taxi drivers` is
  ranking on a page that never mentions MTD); no worked example; no trading allowance; mid-page
  firm-sell H2.
- `livingstonesaccountants.co.uk/blog/taxi-driver-allowable-expenses...` — p11/p19 on the
  expenses terms. ~2,200w. States the per-vehicle stick rule plainly (copy the directness), but
  **45p/25p stated as current post-6-April-2026** (stale by a rate change); no worked comparison
  of mileage vs actual; capital allowances thin.

## 5. Whitespace (§18 + §2/§9/§12 let us own)

- **Current rates beat the incumbent everywhere:** 55p/25p from 6 Apr 2026 (§12), Class 2
  treated-as-paid (§2), 2026/27 bands, correct MTD timetable (£50k Apr 2026 / £30k 2027 /
  £20k 2028, §9). The p7-10 incumbent is stale on all four.
- **MTD for a taxi driver, concretely:** the incumbent set's only MTD-relevant ranking is
  accidental. Gross-turnover-not-profit test, quarterly updates, software, start dates.
- **A full worked example** (register -> log takings -> expenses both methods -> tax + NIC
  computed at 2026/27): zero examples anywhere in the fetched SERP set.
- The mileage-vs-actual fork with the §18.6 stick rule AND the van/car capital-allowance split
  (§8), stated at current rates.

## 6. Fences (binding)

- §18.6 verbatim in substance: choice is per vehicle and sticks; mileage rates barred where
  capital allowances already claimed. Date-tag 55p/25p as from 6 April 2026, 45p/25p to 2025/26.
- §18.3 one-line pointer to the tax check (depth on N1). §18.2 one-line fence if platforms are
  named. No VAT depth (N3's ground): one sentence + link.
- Cash-in-hand: record-keeping framing only, never an evasion-adjacent aside.
- Cite §2, §8, §9, §12, §17, §18 by number. No em-dashes. C1 row 64 CLEAR.

## 7. Acceptance criteria (deterministic)

1. Queries answerable: all §3 keywords placed (the seven status phrasings collapse into H1/H2/body
   naturally, checker matches each); "what expenses can a taxi driver claim"; "do MTD rules apply
   to taxi drivers".
2. Figures, recomputable: £1,000 trading allowance; 5 October; 31 January; £12,570 and 2026/27
   bands per §2; Class 4 per §2; 55p/25p (6 Apr 2026); MTD £50k/£30k/£20k; one full worked
   example re-derivable by QA at 2026/27 rates.
3. Links: N1 (hub), N3 (VAT), E1 (gig status); resolver-clean; all §4 floors + coverage pass.
4. No H2 duplicating N1/N3/E1 phrasings; lead structure = process walkthrough per language_spec.

## 8. Expectation

The most winnable surface in the cluster: incumbent holds p7-10 across 770/mo with stale Class 2,
stale AMAP and no MTD. Realistic: Google top-10 on 3+ status phrasings within a quarter of
indexing, top-5 plausible at two quarters; Bing earlier. Maturity caveat: net-new, judge at 28d
Bing / 90d Google, immaturity is not a gap. Failure trigger: zero impressions on all status
phrasings at 90d post-index.
