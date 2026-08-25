# Property site — comprehensive new-page plan

Date: 2026-08-08. **Plan only, nothing built.** Covers everything from the buyer-demand and
lead-gen research that belongs on propertytaxpartners.co.uk.

Volumes are UK/mo from DataForSEO Google Ads; KD is DataForSEO Labs keyword difficulty.
Existing coverage checked against all 741 blog slugs and the calculator registry.

## Conventions this follows

- Pillars sit at **root level** (`/section-24`, `/landlord-tax` already do). `/services/*` is four
  hardcoded folders, not `[slug]`, so a new root folder is the smaller change.
- Spokes are blog posts under `/blog`.
- Calculators register in `src/lib/calculators/registry.ts` (5 premium) or `tools/` (19 generic).
- Resource hubs are `content/resources/*.md` (6 exist: capital-gains, incorporation,
  landlord-essentials, mtd, section-24, stamp-duty).

## Brand-fit warning, read before approving

Property Tax Partners is a **tax** brand. Clusters B, C and D are landlord-obligation topics that
sit naturally with the audience. **Cluster A (cost of selling) is the stretch** — a vendor
researching estate agent fees is not looking for an accountant.

It only stays coherent if every Cluster A page carries the tax hook: the reason we are the ones
answering is that selling costs are CGT-deductible and the CGT bill is the part nobody else prices.
If that framing is dropped, Cluster A becomes off-brand content on a tax domain and should move to
its own site instead. Flagging now rather than after it is written.

---

# Cluster A — Cost of selling / vendor capture

Corpus ~45,850/mo brand-stripped. **Property currently has zero coverage** — no slug targets estate
agent fees or cost of selling, and the 86 incidental "estate agent" mentions across 43 CGT posts all
treat fees as a deductible disposal cost.

**Why it belongs here:** someone searching `estate agent fees uk` is 0-3 months from a disposal. If
the property was ever let, that is a CGT event. This cluster is a CGT lead magnet wearing a
cost-of-selling coat.

### A1. Pillar — `/cost-of-selling-a-property`
Total cost of selling: agent fee, conveyancing, EPC, removals, and **CGT if it is not your main
home**. The CGT line is the capture.
Targets: `how much do estate agents charge` 1,600 @ £5.10 · `estate agent fees uk` / `charges` /
`rates` 1,600 each @ £5.48 · `estate agent fees england` 4,400 @ £5.98 · `average estate agent fees uk`
590 @ £5.22 (4 variants) · `estate agent selling fees uk` 170 @ £6.33

### A2. Calculator — `cost-of-selling-calculator`
Direct target: `estate agent fees calculator uk` **720/mo**. Inputs sale price, agent %, region.
Outputs itemised total plus a CGT estimate when the user flags it as a let or second property.
**Feeds `capital-gains-tax-calculator.ts:24`**, which already takes a single combined
"buying, selling & improvement costs" field — chain them, do not duplicate.

### A3-A11. Spokes
| # | Slug | Target | Vol | CPC |
|---|---|---|---|---|
| A3 | `how-much-do-estate-agents-charge-to-sell-a-house` | same | 880 | £5.63 |
| A4 | `cheapest-estate-agent-fees-uk` | same | 210 | £9.83 |
| A5 | `sell-house-without-estate-agent` | + `selling home without estate agent`, `selling house no estate agent` | 390 ×3 | **£13.46** |
| A6 | `can-you-sell-a-house-without-an-estate-agent` | + `how to sell your house without an estate agent` 140 | 260 | £6.46 |
| A7 | `online-estate-agents-uk` | + `internet estate agents`, `online property agency` | 2,400 | £6.76 |
| A8 | `cost-of-moving-house-uk` | same | 2,400 | £7.00 |
| A9 | `estate-agent-fees-for-renting` | + `estate agent charges for renting` | 260 | £6.54 |
| A10 | `average-london-estate-agent-fees` | + `how much commission do estate agents charge` 90 | 50 | £13.56 |
| A11 | `estate-agent-contract-tie-in-periods` | supporting, low vol | — | — |

### A12-A15. Disposal-route alternatives
| # | Slug | Target | Vol | KD | CPC |
|---|---|---|---|---|---|
| A12 | `selling-a-house-at-auction-uk` | `sell house at auction` (+5 variants) | 880 | **8** | £14.56 |
| A13 | `modern-method-of-auction-explained` | same | 2,900 | — | £3.54 |
| A14 | `part-exchange-house-uk` | + `part ex house`, `new build part exchange` 1,300 | 2,900 | **13** | £4.12 |
| A15 | `selling-a-probate-property` | `probate house sale` | 480 | **10** | £3.95 |

A15 overlaps three existing posts (`sdlt-on-probate-property-transfers`,
`cgt-on-inherited-property-uk-probate-base-cost`, `a-complete-guide-to-stamp-duty-relief-for-probate-properties`)
— **write as the selling-process page and internally link to the tax ones**, do not restate them.

**Cluster A: 1 pillar + 1 calculator + 13 spokes = 15 pages.**

---

# Cluster B — Landlord compliance

Bucket 58,250/mo. **This is the classic fold-in: heavy topical presence, almost no capture.**
Across 741 posts: EICR 34 mentions / **0 slugs**, fire risk 6 / **0**, electrical safety 11 / **0**,
MEES 9 / **0**, gas safety 44 / 1, HMO licensing 71 / 1, selective licensing 39 / 1, EPC 59 / 3.

### B1. Pillar — `/landlord-compliance`
Every legal obligation with cost, frequency, penalty and tax treatment. Hub linking all spokes.
Also the natural home for the existing scattered compliance content.

### B2-B9. Spokes
| # | Slug | Target | Vol | KD | CPC | Status |
|---|---|---|---|---|---|---|
| B2 | `eicr-certificate-cost-landlords` | `eicr certificates` | **18,100** | — | £5.84 | **NEW** — 34 mentions, 0 slugs |
| B3 | `landlord-electrical-safety-certificate` | `landlords electrical certificate` | 1,600 | 31 | £9.16 | **NEW** |
| B4 | `fire-risk-assessment-cost` | + `fire risk assessment price` | 720 | **0** | £16.20 | **NEW** |
| B5 | `landlord-licensing-explained` | `landlord licensing` | 1,600 | 11 | £7.35 | extends `hmo-selective-licensing-compliance-...` |
| B6 | `gas-safety-certificate-cost` | `landlords certificate gas`, `gas electric safety certificate` 320 | 480 | 25 | £7.67 | extends `gas-safety-certificates.md` |
| B7 | `epc-certificate-cost-uk` | `epc certificate cost` (+6 variants) | 3,600 | 16 | £3.14 | extends `energy-performance-certificates-epc.md` |
| B8 | `how-to-book-an-epc` | `epc booking` | **14,800** | **1** | £3.88 | **NEW** — easiest traffic in the dataset |
| B9 | `mees-regulations-landlords` | MEES / minimum standards | — | — | — | extends `epc-c-2030-...` |

**Note on B8.** `epc booking` at KD 1 and 14,800/mo is the single cheapest traffic available
anywhere in the research, but £3.88 CPC means it is a fulfilment query, not a lead query. Build it as
top-of-funnel that routes into B1 and the portfolio tools — do not expect it to convert directly.

**Cluster B: 1 pillar + 8 spokes = 9 pages** (4 genuinely new, 4 extending existing).

---

# Cluster C — Leasehold

Bucket 51,470/mo. Existing: `lease-extensions-in-the-uk-surrender-and-regrant` and
`lease-extension-vs-freehold-purchase` (both tax-angled), plus service charge 83 mentions / 1 slug
and ground rent 73 mentions / **0 slugs**.

**Read `BMV_FACTS.md` before writing any of this.** Marriage value abolition under LAFRA 2024 is
**not in force** and remains payable as at August 2026. Most published 2026 content says otherwise.
Getting this right is the authority play — it is a correction of record on a cluster sitting at KD 0-1.

### C1. Pillar — `/leasehold`
Lease extension, freehold purchase, right to manage, service charges, ground rent. Includes a
maintained "what is actually in force" table for LAFRA 2024 commencement.

### C2. Calculator — `lease-extension-premium-calculator`
Estimates the premium including marriage value where the term is under 80 years. Genuinely useful,
nothing accurate exists free, and it is the natural capture point.
**Must state that marriage value still applies** — that alone differentiates it.

### C3-C10. Spokes
| # | Slug | Target | Vol | KD | CPC |
|---|---|---|---|---|---|
| C3 | `lease-extension-cost-uk` | `lease extension lawyers`, `leasehold extension solicitors` | 1,000 | **0** | £9.25 |
| C4 | `lease-extension-solicitor-what-they-do` | `lease extension solicitor` + `...near me` 320 | 1,000 | 11 | £9.25 |
| C5 | `right-to-manage-explained` | `right to manage` | 1,000 | **1** | £7.55 |
| C6 | `right-to-manage-company-setup` | `right to manage company` | 390 | **1** | £9.76 |
| C7 | `right-to-manage-process-steps` | `right to manage process` | 170 | **1** | £7.49 |
| C8 | `service-charge-disputes-leaseholders` | service charge cluster | — | — | — |
| C9 | `ground-rent-rules-uk` | ground rent cluster (73 mentions, 0 slugs) | — | — | — |
| C10 | `leasehold-reform-act-2024-what-is-in-force` | the correction-of-record page | — | — | — |

C10 is the citation magnet. It needs a maintained "last verified" date and should be re-checked when
the valuation-rate consultation closes **23 September 2026**.

**Cluster C: 1 pillar + 1 calculator + 8 spokes = 10 pages.**

---

# Cluster D — Commercial property

Smaller, but `commercial epc` is **KD 0 at £20.45 CPC** — the highest-value low-difficulty term in
the property set. Property already has `brief-introduction-to-commercial-property-service-charge-accounts`.

| # | Slug | Target | Vol | KD | CPC |
|---|---|---|---|---|---|
| D1 | `commercial-epc-requirements` | `commercial epc` | 1,300 | **0** | £20.45 |
| D2 | `commercial-energy-performance-certificate-cost` | same | 1,300 | 10 | £20.45 |
| D3 | `commercial-property-mees-compliance` | commercial MEES | — | — | — |

**Optional, flagged not recommended:** `small business rates relief` 6,600 @ £6.54 **KD 0** and
`business rate` 18,100 KD 13 are occupier-side queries, not landlord-side. Big and soft, but a
different audience. Business rates *appeals* additionally carry a cowboy-sector reputation. Leave out
unless we decide to serve commercial occupiers.

**Cluster D: 3 pages.**

---

# Totals

| Cluster | Pillars | Calculators | Spokes | Total |
|---|---|---|---|---|
| A — Cost of selling | 1 | 1 | 13 | 15 |
| B — Landlord compliance | 1 | 0 | 8 | 9 |
| C — Leasehold | 1 | 1 | 8 | 10 |
| D — Commercial | 0 | 0 | 3 | 3 |
| **Total** | **3** | **2** | **32** | **37** |

Plus 2 resource hubs (`content/resources/landlord-compliance.md`, `leasehold.md`) to match the
existing 6, and internal-link passes on the ~50 existing posts that mention these topics without
targeting them.

# Suggested build order

1. **Cluster B** — cheapest. Topical signal already there, four pages extend existing posts, and it
   serves the audience the site already has.
2. **Cluster C** — KD 0-1 across the board, and C10 is an authority asset independent of leads.
3. **Cluster A** — biggest corpus and biggest brand risk. Do it after B and C have proven the
   fold-in works, and only with the CGT framing locked.
4. **Cluster D** — small, do alongside whatever else is running.

# Explicitly NOT on Property

These came out of the research well but belong to other brands:
party wall (1 mention across 741 posts), asbestos (10), Japanese knotweed (2), RICS surveys,
settlement agreements, MVL, H&S consultancy, trademark. Wrong audience, wrong brand.
Distressed/BMV sale is a separate site on the roadmap, not a Property cluster.
