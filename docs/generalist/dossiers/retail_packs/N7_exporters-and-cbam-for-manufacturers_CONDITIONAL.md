# PACK N7: net-new CONDITIONAL — exporters and CBAM 2027 for manufacturers

Derived 2026-08-25 from FROZEN dossier `../retail_product_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **obligation-calendar-led**). Seventh surface of the
manufacturing hub, and **the only pack in this wave that is BLOCKED from writing.**

## 0. BLOCKED — do not write this page yet. Two independent gates are open.

| Gate | What it is | Where it is recorded | Who clears it |
|---|---|---|---|
| **GT gate (hard)** | `house_positions.md` **§21.7 states in terms: "CBAM/exporters: not authored; conditional on the dossier's D3 volume check, lock before any N7 page."** There is no locked ground truth for anything this page would say. | house_positions.md §21.7 | house-position authoring pass |
| **D3 volume gate** | The dossier makes N7 conditional on a sub-$0.10 volume check (free autocomplete plus one cheap volume pull) that was **not run**, because the DataForSEO daily budget gate was at $4.9874 of $5.00 at dossier time. Volume is unproven. | dossier §9 delta D3, §6 N7 row | owner decision (dossier §10 question 3: run D3, or drop N7) |

Everything below is the pack as it stands so that no work is repeated when the gates clear. **It is
not a licence to write.** If the owner drops N7 (dossier §10 question 3 offers that option
explicitly), this file is the record of what was scoped and why it did not ship, and the
manufacturing hub is 8 surfaces rather than 9.

**Note on the coverage-over-selection lock:** volume being unproven is *not* the reason this page is
blocked, and D3 must not be used as a volume gate in the ordinary sense. Coverage over selection is
binding across this programme and volume is never a gate on its own. D3 is here only because the
dossier itself made N7 conditional on it and the owner has an open decision. The **real** blocker is
the missing ground truth: we cannot write a compliance-calendar page about a regime on which the
house holds no locked position.

## 1. Target and permission level (on clearance)

- NET-NEW page. Proposed slug: `cbam-and-export-obligations-for-uk-manufacturers` (writer may
  refine).
- Grade NET-NEW CONDITIONAL.
- C1 gate: row 73, no C1 restriction. CLEAR. The gates are GT and D3, not C1.
- Ground truth on clearance: a newly authored **§21.7**, plus **§7** (VAT, and the zero-rating of
  exported goods), and the existing generalist import-VAT pages for the inbound side.

## 2. Equity register

None (net-new).

## 3. Market keyword slice

**Unmeasured.** Dossier §2 records the topic with 0 keywords in this ledger and volume "unmeasured",
and grades it "the one whitespace hub; volume unproven, D3". No row in
`retail_product_2026-08-25_ledger.csv` is assigned here. Nothing may be claimed about demand until
D3 runs.

## 4. Competitor teardown

**Not fetched, deliberately.** The dossier's tier1 finding is that there is **zero incumbent
accountancy owner** for this topic, which is why it was flagged as whitespace. Fetching pages to
tear down would mean picking arbitrary non-accountancy sources (trade bodies, law firm briefings,
government pages) that are not the competitive field. Per the language spec's method, this is stated
as a negative finding rather than dressed up as a teardown. On clearance, run a free sweep first and
write the teardown from what it returns.

## 5. Whitespace (asserted by the dossier, unverified by this pack)

- Zero incumbent accountancy owner on the topic, per the tier1 fieldwork.
- A dated obligation calendar running to 2027 for a UK manufacturer that exports, with each row
  owned by a named duty.
- The intersection of export VAT zero-rating, evidence of export, and the newer carbon-border
  reporting duties in one manufacturer-facing place.

All three are the dossier's reasoning, not measurements made here. They are why the surface was
proposed; they are not evidence that it will rank.

## 6. Fences (binding, on clearance)

- **Nothing may be asserted about CBAM (the Carbon Border Adjustment Mechanism), its UK
  implementation date, its scope, its reporting duties or its rates until §21.7 is authored and
  locked.** This is the whole reason the page is blocked and it is not a soft preference.
- **Regime-name and date precision:** the UK and EU regimes differ in scope and timing and are
  routinely conflated. Whichever is described must be named unambiguously and date-tagged in every
  sentence.
- **No customs broking, no customs agent service, no duty-reclaim service** is offered or implied.
  The estate holds no such permission and the page is informational.
- **Import VAT is not this page's ground.** The existing `vat-accountant-importing-goods-uk.md` and
  `vat-accountant-importing-goods-outside-uk.md` pages own postponed VAT accounting, C79
  certificates and customs duty. Link, never restate. See §9.
- **Assignment split:** the hire framing is N3's; production plant is N5's.
- No house-position citations in reader copy (report only). No em-dashes. Every date and rate tagged,
  and any pending or unenacted measure carried as one replaceable block with an explicit
  "as legislated at [date], re-verify" hedge in the writer's report.
- **Standing risk, recorded before writing:** this is the most volatile subject in the wave. The
  page must be built so a single dated block can be back-patched rather than the page rewritten.

## 7. Acceptance criteria (deterministic, on clearance)

1. §21.7 authored and locked; every factual sentence traceable to it or to a named public authority.
2. D3 run and its result recorded, whatever it shows, and the owner's decision on dossier §10
   question 3 recorded alongside it.
3. A dated obligation calendar table as the opening structure (the assigned lead), each row carrying
   a duty, a date and a source.
4. One worked example, recomputable at 2026/27 rates, on the VAT side of the page (the side where
   locked ground truth already exists in §7).
5. Links: N3, N5, both existing import-VAT pages. Resolver-clean, zero invented slugs. §4 floors
   plus coverage floor pass.
6. Regime naming checked sentence by sentence at adversarial QA.

## 8. Expectation (on clearance)

Genuine whitespace with unproven demand. Realistic if it ships: a small number of high-intent
impressions on exporter-obligation phrasings, and first-mover position on a topic no accountancy
site occupies. It would be judged on impression breadth and lead quality, never on volume. Maturity
caveat: net-new, judge at 28d Bing / 90d Google. Failure trigger: zero impressions at 90d
post-index. **If the owner drops N7, none of this applies and the hub ships at 8 surfaces.**

## 9. Cannibalisation notes

| Existing page | Overlap | Resolution |
|---|---|---|
| `vat-accountant-importing-goods-uk.md` | import VAT, customs duty, postponed VAT accounting, C79 | **Differentiate, do not collapse.** That page owns the inbound side entirely. N7 is outbound and carbon-border only. N7 targets no import phrasing and links out for the inbound answer. |
| `vat-accountant-importing-goods-outside-uk.md` | same, rest-of-world | Same treatment. Note these two existing pages already overlap each other; that is a pre-existing pair outside this wave's scope and is **flagged here for a separate differentiation review**, not touched. |
| N3, N5 (this wave) | manufacturing hub | Assignment split, one paragraph plus link each. |
| ecommerce site (cross-border selling) | estate wall | Consumer and marketplace cross-border selling belongs to the ecommerce site. N7 is business-to-business goods export only. |
