# Wave 1 editorial sweep, two care audience pages

Date: 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a.
Model: `docs/property/_wave1/qa/_wave_sweep.md`.
Scope: `docs/care/_wave1/self-employed-carers-and-personal-assistants.json` and
`docs/care/_wave1/care-franchisees.json` only. No commit, no database, no code.
Live rows read for comparison: `care/web/src/data/care-hubs.ts` (five hubs: care-homes,
domiciliary-care, supported-living, childrens-homes, care-startups).
No figure, rate, date or rule was changed.

## What changed, per page

| Page | Change |
|---|---|
| self-employed-carers-and-personal-assistants | None. Every check below passed as written. |
| care-franchisees | None. Every check below passed as written. |

Detail on each rule, since a no-change result has to be evidenced rather than asserted:

1. **Intros.** Openers differ ("You are paid by the person you support..." against "Buying a
   home care franchise puts you in two positions at once"). Closers differ in construction:
   carers ends on a single forward-looking clause ("Incorporating is settled separately, by
   your profit and by who pays you."), franchisees on an "And..." consequence sentence
   ("And carers join the payroll in week one, months before the territory fills."). Neither
   is a triad closer. Against the five live hub intros: no shared opening construction (the
   live five open "A care home P&L is...", "The economics of a domiciliary care agency turn
   on one number", "Supported living finance pivots on...", "Children's residential care
   businesses carry...", "CQC registration is the gateway...") and no shared closer (the live
   five all close on a first-person "We..." sentence; neither new intro does).
2. **Openers across `challenges` and `howWeHelp`.** Nine bodies on carers, eight on
   franchisees. No two consecutive bodies on either page share an opener, and no slot has the
   same opener on both pages. The closest pair is `howWeHelp0`, "A specialist reviews last
   year's income..." against "Before you sign, a specialist reads the financial clauses..." -
   different construction, different opening words; left as is. The estate-wide repeat
   openers "Your accountant prepares" and "A specialist reviews" appear once each across the
   two pages combined.
3. **Consent sentence.** `PARTNER_NETWORK_SENTENCE`
   (`packages/web-shared/design/marketing/EntityBlock.tsx`) appears in neither file; the
   string "specialist partner network" returns zero hits in both. The template renders it in
   the entity block and at the form.
4. **Internal links.** Eight internal anchors across the two pages, all in
   `<a href="/path">text</a>` form, no bare paths in any rendered field. All eight resolved
   on disk:

   | href | Resolved against |
   |---|---|
   | `/blog/vat-and-welfare-exemption/care-home-vat-exemption-edge-cases` | `care/web/content/blog/care-home-vat-exemption-edge-cases.md`, frontmatter category "VAT and Welfare Exemption", `slugifyCategory` -> `vat-and-welfare-exemption` |
   | `/blog/care-home-accounts-and-funding/mtd-it-care-owner-operators` | `care/web/content/blog/mtd-it-care-owner-operators.md`, category "Care Home Accounts and Funding" -> `care-home-accounts-and-funding` |
   | `/for/domiciliary-care` | `care/web/src/data/care-hubs.ts` |
   | `/for/care-startups` | `care/web/src/data/care-hubs.ts` |
   | `/services/start-a-domiciliary-care-agency` | `care/web/src/data/care-services.ts` |
   | `/services/care-payroll` | `care/web/src/data/care-services.ts` |
   | `/services/selling-a-care-home` | `care/web/src/data/care-services.ts` |
   | `/calculators/true-cost-care-hour-calculator` | `care/web/src/lib/calculators/tools/true-cost-care-hour.ts` slug, imported by `registry.ts`, served by `src/app/calculators/[slug]` |

   The external gov.uk, HMRC manual and CQC anchors in the franchisees intro and
   `challenges0` are already recorded and fetched in that page's `sources` array.

## Sameness scan

Method as the Property sweep: all 8-word sequences across `intro`, `challenges`, `howWeHelp`
and `faqs`, titles and questions included, lower-cased, tags and punctuation stripped.

- **Between the two pages: zero shared sequences.** The subjects barely touch, and the one
  shared theme (VAT exemption) is argued from opposite sides - the carer cannot use the
  exemption, the franchisee is stuck inside it.
- **Against the live `care-hubs.ts` rows:** six sequences on carers, fourteen on franchisees,
  every one of them statutory or rate wording that cannot be varied without changing a
  figure. Listed as excluded by design:
  - AMAP: "55p per mile for the first 10,000 business miles from 6 April 2026" (carers, and
    the same phrase in the domiciliary-care and care-startups rows),
  - employer NIC: "15% above the £5,000 secondary threshold" plus the following
    "holiday accrual" item (franchisees),
  - corporation tax: "19% up to £50,000 and 25% above £250,000 with marginal relief between"
    (franchisees),
  - welfare exemption: "care supplied by a CQC-registered provider is VAT-exempt"
    (franchisees),
  - NLW: "£12.71 an hour for workers aged 21 and over from" April 2026 (franchisees).

  No non-statutory sequence is shared with any live hub.

## Invariants after the sweep

| Page | Words | metaTitle | metaDescription | Em-dash | Internal links | All anchors | JSON |
|---|---:|---:|---:|---:|---:|---|---|
| self-employed-carers-and-personal-assistants | 1,192 | 49 | 155 | 0 | 4 | yes | parses |
| care-franchisees | 1,195 | 47 | 152 | 0 | 4 | yes | parses |

Words counted across `intro`, `challenges`, `howWeHelp` and `faqs` including titles and
questions, tags stripped. Both inside 800 to 1,200. No en-dashes either.

Banned claims: zero hits on chartered, ICAEW, ACCA, CIOT, "our accountants", "we are
accountants", "our team", award, advice, advise, any personal name, any franchisor brand and
any price or fee figure for our own work. "Regulated" appears thirteen times and every
instance is statutory - "regulated activity" (Health and Social Care Act 2008 (Regulated
Activities) Regulations 2014) or "state-regulated provider" (VAT Notice 701/2). No claim
about the firm anywhere.

## VERDICT: READY

Both pages meet every S4a invariant, share no 8-word sequence with each other and none but
statutory wording with the live hubs, carry no consent sentence in a row body, and every
internal link resolves to a real target. Nothing was edited, nothing is committed, nothing is
deployed.
