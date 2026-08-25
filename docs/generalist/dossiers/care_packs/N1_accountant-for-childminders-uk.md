# PACK N1: net-new — accountant for childminders (sole trader)

Derived 2026-08-25 from the FROZEN dossier `../care_education_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **registration-timeline-led**). Head service page of the
childminder pair (N1 service -> N2 expenses/MTD depth).

## 1. Target and permission level

- NET-NEW page, sole-trader blog family. Proposed slug: `accountant-for-childminders-uk`
  (writer may refine; must resolve via `slug_resolver` conventions).
- Grade: **NO-PAGE -> NET-NEW**, everything writable. The estate has zero childminder coverage
  anywhere (dossier §1: verified by a 418-post body sweep plus an estate-wide slug sweep).
- Revert path: delete pre-deploy. Post-deploy it enters `monitored_pages` as a new surface.
- Shape: specialist service page with the registration timeline as its spine.
- C1 gate: **C2 row 26 is CLEAR** (`C2_PLACEMENT.md` §10 row 26, ABSORB -> generalist, cluster 3-5).
  It carries no gate in §8's carried-forward list. **Not blocked.**

## 2. Equity register

None (net-new). Nothing to preserve, nothing frozen. Verified against `monitored_pages` at pack
derivation: no generalist family page sits in an armed window (dossier §5).

**Must NOT poach:** the expenses tables, the 10% wear-and-tear mechanic and the MTD fork are N2's
ground and get one paragraph here with a link, not a table. Nursery and daycare content is N3's
(different audience: companies with staff). Foster care is N4/N5's.

## 3. Market keyword slice (ledger, 270/mo raw across three phrasings)

| Keyword | Vol/mo | CPC | Ranking domains (D1) | Best peer |
|---|---|---|---|---|
| accountant for childminders / accountants for childminders | 90 | **$16.39** | 3 | caservices **p1** |
| childminding accountant | 90 | **$16.39** | 4 | caservices p2, swan-books p5 |
| only childminding accountant | 90 | n/a | 3 | caservices p2 |
| childminder accountant (C3 equivalence) | 90 | - | - | vanilla p8 |

$16.39 is the highest CPC anywhere in this cluster and among the highest on the generalist site.
That is commercial intent, not curiosity.

## 4. Competitor teardown (head-term top ranker, fetched 2026-08-25)

`caservices.org.uk/` homepage holds **p1** on `accountants for childminders` and **p2** on
`childminding accountant`. Title "Childminder Accounts & Tax | Bookkeeping and MTD Support", H1
"Childminder Accountancy Services". **625 words.** Structure: an "Accounting support for educators"
intro, a services list, four audience blocks (Childminders / Early Years providers / Education
consultancy / Foster carers), then a pricing wall (Sole Trader, Partnerships, Company) and a blog
feed. Zero em-dashes, which is unusual for the field and worth noting.

What it has that we must match: genuine multi-sub-niche specialism, a live content layer (its
January 2026 post on the 10% wear-and-tear and MTD ITSA is the best single piece of content in the
niche), and an MTD promise in the title tag.

What it does not have, and this is the whole gap: **it answers almost nothing.** 625 words of
positioning. No figures beyond prices. No registration timeline. No worked example. No explanation
of what the first year actually looks like.

Runners-up: `swan-books.co.uk` (p5-p6, 1,847 words, but a third of it is a five-step sales funnel
and a pricing block, 3 em-dashes) and `vanillaonlineaccountancy.co.uk` (p8, **313 words**, the same
H1 printed twice, no figures). A 313-word page holding p8 is the clearest possible statement that
this SERP is winnable on substance.

## 5. Whitespace (what §19.2 and §19.4 let us own)

- **The first-year registration timeline, done properly.** Nobody in the field lays out the
  sequence: register with the relevant inspectorate, start trading, tell HMRC by the 5 October
  after the tax year in which you started, file the first return by the following 31 January. The
  registration trigger and the trading-allowance interaction come from the house trading-allowance
  position; the deadline discipline is ordinary sole-trader ground.
- **The £1,000 trading allowance question, answered for this audience specifically.** A childminder
  with one part-time mindee may genuinely be under it. Nobody says so.
- **Ofsted, Care Inspectorate Wales, Care Inspectorate Scotland and NI registration fees, DBS
  checks, training and PACEY or NCMA membership as deductible costs**, named as the actual costs
  this reader pays.
- **The correct current mileage position.** The p8 incumbent is quoting 45p / 25p from June 2016.
  We state the current rate with its date and the per-vehicle stick rule.
- **A clean single-H1 page.** Two of the four ranking childminder pages have broken heading
  hierarchy.

## 6. Fences (binding)

- **No published house-position citations in reader copy.** The writer cites `house_positions.md`
  **§19.2** (childminder simplifications and the MTD fork), **§19.4** (trading allowance and
  registration boundary), **§2** (sole-trader income tax, Class 4, self-assessment), **§12**
  (mileage), **§17** (trading allowance, 5 October) and **§8** (capital allowances on equipment)
  **in the build report only**. The reader sees gov.uk and HMRC references.
- **No em-dashes.**
- **Rates date-tagged in the sentence.** Class 4 at 6%, £12,570 and £50,270 are 2025/26-locked: in
  2026/27 copy they carry a natural-language **"still current when checked in August 2026"** tag.
- **Do not present the 10% wear-and-tear deduction as surviving MTD.** One sentence here, with the
  fork named, and a link to N2. Getting this wrong is the single most likely factual failure on the
  page.
- **Registration is described, never advised on.** Ofsted and the devolved inspectorates regulate
  childcare; we describe registration as a fact of the reader's business and a source of deductible
  costs. We never advise on childcare registration law, safeguarding or ratios.
- **Scope fence:** if the draft starts addressing a setting with employed staff, funded hours or a
  company structure, it has walked into N3. Stop and link.
- **Intra-cluster assignment is hard:** no expenses tables (N2), no hours-apportionment percentages
  (N2), no fostering content (N4/N5).

## 7. Acceptance criteria (deterministic)

1. **Queries answerable** in metaTitle, H1, H2, FAQ or body: all four §3 phrasings;
   "do I need an accountant as a childminder"; "when do I register as a childminder with HMRC";
   "is childminding self-employment".
2. **Figures, recomputable and dated:** £1,000 trading allowance; 5 October registration deadline;
   31 January filing deadline; the current AMAP first-10,000-miles rate with its from-date and the
   per-vehicle stick sentence; Class 4 at 6% with the currency tag; £12,570 and £50,270 with the
   currency tag.
3. **One worked example**, recomputable on 2026/27 figures, of a childminder's year from gross
   receipts to tax and Class 4 due. Persona **Bev**, city **Lancaster**. Every number in the example
   must be re-derivable by the reader from the figures stated on the page.
4. **One paragraph maximum** on wear and tear and MTD, with the fork named and N2 linked in prose.
5. **Links:** N2 linked from body prose; resolver-clean; single H1; all house content floors and
   the coverage pass.
6. **No H2 duplicating an N2, N3, N4, N5 or E1 H2 phrasing** (`language_spec.md` §4).
7. **Zero house-position section codes** in the published body. QA greps for `§`, `HP`, `(HP1` and
   `house position` before sign-off.

## 8. Expectation

**Winnable, and this is the strongest surface in the cluster.** The p1 incumbent is a 625-word
positioning page, p8 is a 313-word page with a duplicated H1, and CPC is $16.39. There is no
national brand in this SERP.

Realistic: Google top-10 on at least two of the four §3 phrasings within a quarter of indexing;
Bing earlier, per the estate pattern. Maturity caveat applies: a net-new page ranking poorly at 28
days is **immature, not a gap**, and the correct label is "maturing, revisit around a quarter".

Volume caveat, stated because coverage over selection is the lock: 270/mo raw across three
phrasings is a real but small market, and the three phrasings likely share substantial search
intent. That downgrades the traffic expectation. It does not downgrade the surface.

Failure trigger: zero impressions on all four §3 phrasings at 90 days post-index.
