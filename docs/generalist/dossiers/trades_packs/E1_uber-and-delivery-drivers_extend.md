# PACK E1: accountant-for-uber-drivers + accountant-for-delivery-drivers-uk — EXTEND (additive only, both seeds)

Derived 2026-08-25 from FROZEN dossier `../trades_transport_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **additive Q&A-append**). One pack, two sibling seeds: the
dossier's E1 (uber) and E2 (delivery) surfaces share the gig audience, the §18.1/§18.2 ground
truth and the additive-only rule, so they are worked and QA'd together to keep the gig/courier
assignment split enforced in one place.

## 1. Targets and permission level

- Seed A: `generalist/web/content/blog/accountant-for-uber-drivers.md` (NOTE: no `-uk` suffix).
  Grade **EXTEND, hard** (Bing 13 clicks / 532 impressions = the cluster's ENTIRE Bing surface;
  Google 0 / 104 / pos 7.3). ADDITIVE ONLY: metaTitle, H1 and existing H2 order untouched; new
  H2s and FAQ entries appended.
- Seed B: `generalist/web/content/blog/accountant-for-delivery-drivers-uk.md`. Grade **EXTEND by
  manager override** (recorded, dossier §5): deterministic table said REFRAME, but Google pos 11.4
  on 113 imps is a near-page-1 surface and the 1-click Bing capital-allowance query can only have
  landed here. Additive only, same rules as A.
- Frozen-ground check before edit: neither slug in an armed `monitored_pages` window (verify
  against the live table, standing rule).
- Revert path: git revert per file; `monitored_pages` baseline captured at deploy.

## 2. Equity register (do not lose — this is the cluster's whole Bing equity)

| Query | Seed | Engine | Evidence |
|---|---|---|---|
| uber accounting services | A | Bing | **2 clicks** |
| how do uber drivers pay tax uk | A | Bing | impressions |
| how to pay least amount of tax on uber uk | A | Bing | impressions |
| self assessment for uber drivers, is it different to sole trader self employment | A | Bing | impressions |
| uber charges for drivers ni | A | Bing | impressions |
| (page-level) | A | Bing | 13 / 532 summed |
| (page-level) | A | Google | 0 / 104 / pos 7.3 |
| as a delivery driver can i claim capital allowance for van | B | Bing | **1 click** |
| accountant for delivery driver uk | B | GSC | impressions |
| accounting for courier | B | GSC | impressions |
| (page-level) | B | Google | 0 / 113 / pos 11.4 |

Every query above must remain matchable in metaTitle/H1/H2/FAQ/body post-edit (§9.9 floor 5).
The van capital-allowance question gets an explicit FAQ answer on B (it already earns the click;
make the answer visibly best-in-market, §18.6: vans get AIA/FYAs per §8, and claiming capital
allowances forecloses mileage rates for that vehicle, per-vehicle stick rule).

## 3. Market keyword slice (ledger, T-GIG to A; T-COU to B)

| Keyword | Vol/mo | Domains | Best peer | Seed |
|---|---|---|---|---|
| uber tax | 480 | 1 (pool) | qaccounting (pool row) | A |
| are uber driver self employed / self-employed | 260 x2 | 1 | qaccounting | A |
| is uber eats self employed | 90 | 1 | livingstones p32 | A |
| is uber eats self-employed | 70 | 1 | livingstones p35 | A |
| accountants for uber drivers | 70 | 3 | gondal p1, lanop p10 | A |
| uber hmrc reporting | 50 | 1 | clarkwell p31 | A |
| (T-COU heads, sub-measurement: accountants for couriers etc.) | 0 measured | 5 page-1 domains on DDG sweep | u-deliver, gondal | B |

Assigned ~1,280/mo (peer-winnable 70) to A; B is field-backed with no measured volume. Taxi-trade
queries (T-TAXI/T-SA/T-VAT) belong to N1/N2/N3: no taxi H2s here. The gig-status Q&A stays HERE
and never migrates to the taxi spine (dossier §6 cannibalisation note).

## 4. Competitor teardown (head-term top rankers, fetched 2026-08-25)

- `gondalaccountancy.co.uk/accountants-for-drivers` — **p1 on `accountants for uber drivers` AND
  `accountant for taxi drivers`**. ~5,500w, one page spanning taxi + uber + delivery + HGV.
  Figures all current (£12,570, 45p/25p pre-2026 framing, £1,000, £90,000, correct MTD
  £50k/£30k/£20k dates), 15-18 FAQ pairs. Gaps: **zero worked examples**, no sole-trader vs ltd
  figures, platform reporting reduced to "HMRC receives income data", em-dashes throughout.
- `livingstonesaccountants.co.uk/blog/uber-bolt-driver-tax-self-employed-vs-limited-company/` —
  p32-35 on the uber-eats terms. ~2,000w. Unattributed "£35,000-£40,000 crossover" claim, **no
  2026/27 rates at all, no DAC7/platform-reporting coverage, no worker-vs-tax status treatment**,
  no worked example.
- lanop `accountants-for-drivers` (p10) — slogan H1, nav-heavy, no figures fetched: not a model.

## 5. Whitespace (§18 lets us assert; nobody covers)

- **Platform reporting done properly (§18.1):** SI 2023/817, in force 1 Jan 2024, first reports
  31 Jan 2025; what Uber/Deliveroo/Amazon Flex report; services have NO 30-sale/2,000-euro
  exclusion (drivers reportable from the first pound); paired with the locked fence: **reported
  does not mean newly taxable, and unreported does not mean tax-free**. This answers
  `uber hmrc reporting` (50/mo) better than clarkwell's generic digital-reporting page, without
  scaremongering: it changes what HMRC sees, not what is taxable.
- **The status answer done properly (§18.2):** Uber BV v Aslam made drivers "workers" for
  employment law; "worker" does not exist in tax law; drivers remain self-employed for SA. Direct
  answer for `are uber driver self employed` (520/mo combined). No fetched competitor states the
  three-status vs two-status distinction.
- A recomputable 2026/27 worked example (the entire SERP set has none).

## 6. Fences (binding)

- **Additive only, both seeds.** Existing metaTitle/H1/H2 order untouched.
- **§18.2 fence verbatim in substance:** never write that the Uber judgment made drivers
  employees for tax; never infer PAYE from worker status.
- **§18.1 fence:** platform reporting is NOT a new tax; always pair mechanics with the
  reported/unreported sentence.
- **§18.4:** if Uber's VAT-on-fares position is touched, one date-tagged sentence maximum and
  hand to N3; no operator-level VAT assertions here.
- **§18.6:** per-vehicle stick rule stated whenever mileage or capital allowances are mentioned;
  AMAP 55p/25p from 6 Apr 2026 (§12), date-tagged.
- Cite §2, §8, §12, §17, §18 by number. No em-dashes in added copy. C1 rows 64/65: CLEAR.
- `how to pay least amount of tax on uber uk` is answered as legitimate hygiene (claim what you
  are entitled to, right method choice), never as avoidance framing.

## 7. Acceptance criteria (deterministic)

1. Queries answerable post-edit: all §2 equity queries (named, per query) PLUS `uber tax`,
   `are uber drivers self employed`, `is uber eats self employed`, `uber hmrc reporting` (A);
   courier phrasings + van capital-allowance FAQ (B).
2. Figures carried, recomputable: £1,000 trading allowance; 5 October registration; £90,000 VAT;
   MTD £50k/£30k/£20k with April dates (§9); 55p/25p from 6 Apr 2026; one worked example on A
   (e.g. gig profit computed to tax + NIC at 2026/27 rates per §2, re-derivable).
3. Structure: metaTitle, H1, existing H2 order byte-identical on both seeds; additions appended.
4. Links: A links N1 (taxi hub) and B; B links A; resolver-clean, 0 invented slugs; §4 floors +
   equity floor + coverage floor pass.
5. No T-TAXI/T-SA/T-VAT keyword in any added H2 on either seed.

## 8. Expectation

A is protective-plus-capture: hold 13/532 Bing and pos 7.3 Google, add impressions on the
gig-status and reporting phrasings; realistic top-10 Bing on 1-2 question phrasings at 28d.
B is protective: hold pos 11.4/113 imps and the Bing click, nudge toward page 1 on courier heads.
Maturity caveat: added sections are new surface, judge at 28d Bing / 90d Google. Failure trigger
(written before edit): Bing clicks on A below 6 in any 28-day window post-deploy, or any named
equity query unmatchable, = revert.
