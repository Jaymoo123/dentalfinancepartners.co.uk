# Care Wave 1: per-site post sweep (2026-09-27)

Scope: all 13 posts in `docs/care/_wave1/posts/` read together, plus the manager notes in the
13 editorial reports and the five newest live posts in `care/web/content/blog/`. One live file
was touched under the explicit permission in the task: `care-home-vat-exemption-edge-cases.md`.
No commit. No figure, rate, date or rule was changed anywhere.

## 1. Recital ownership

Owners assigned as the task specified. Every other post now carries one clause with only the
figure its own argument needs, and a link to the owner where the five-link cap allowed.

| Recital | Owner | Trimmed in |
|---|---|---|
| Corporation tax band (19% / £50,000 / 25% / £250,000 / marginal relief) | `care-structure-before-cqc` | `business-asset-disposal-relief-selling-a-care-business`, `how-to-start-a-domiciliary-care-agency-money-decisions`, `opening-a-childrens-home-finance`, `supported-accommodation-registration-and-tax`, `supported-living-company-structure-before-framework-bid`, `supported-living-contract-forecast`, `care-personal-assistant-vat-registration` |
| HSCA 2008 unregistered-trading offence | `cqc-registration-domiciliary-care-finance` | left in shortest correct form elsewhere (a statute citation, permitted); no post now elaborates it beyond one clause |
| £90,000 threshold and "exemption is a cost" | `vat-on-domiciliary-care` | `cost-to-set-up-a-care-agency`, `nhs-continuing-healthcare-accounts` |
| £625 / under-half partial exemption de minimis | `care-personal-assistant-vat-registration` | `cost-to-set-up-a-care-agency`, `nhs-continuing-healthcare-accounts`, `supported-accommodation-registration-and-tax`, `supported-living-company-structure-before-framework-bid`, `vat-on-domiciliary-care` |
| Payroll stack (NIC 15% above £5,000, EA £10,500, NLW £12.71, 55p) | `supported-living-contract-forecast` | `cost-to-set-up-a-care-agency`, `how-to-start-a-domiciliary-care-agency-money-decisions`, `opening-a-childrens-home-finance`, `supported-accommodation-registration-and-tax` |

New links to owners added where headroom existed: BADR and `care-personal-assistant-vat-registration`
now link `care-structure-before-cqc` (both were at four links); `supported-accommodation-registration-and-tax`
swapped its second CQC-registration link for the structure owner.

## 2. Mechanical shingle check

8-gram and 9-gram shingles computed over all 13 posts plus `care-provider-formation-trends`,
`care-home-bed-supply-and-care-deserts`, `care-business-survival-rates`,
`cqc-registration-costs-and-finance-guide` and `cqc-registration-timeline-cash-burn-before-trading`.

Cleared: the corporation tax sentence shared by `care-structure-before-cqc` and
`opening-a-childrens-home-finance` (22 shared 8-grams, now none); the payroll takeaway shared by
`cost-to-set-up-a-care-agency` and `opening-a-childrens-home-finance`; the four-way £625 de minimis
run; the 12.07% holiday clause and the "specialist reviews the assumptions before the pack" phrase
shared by `cost-to-set-up-a-care-agency` and `how-to-start-a-domiciliary-care-agency-money-decisions`;
the near-identical devolved-regulator closing paragraph in those same two posts; the MTD income-test
clause shared by `care-structure-before-cqc`, `opening-a-childrens-home-finance` and
`supported-accommodation-registration-and-tax`; and an in-post repeat of "A specialist reviews the
profile ... before the application goes in" that the first pass introduced into
`opening-a-childrens-home-finance`.

Left standing, deliberately: statute citations in their shortest correct form (Group 7 of Schedule 9
to VATA 1994, the HSCA 2008 offence, section 11 of the Care Standards Act 2000, Schedule 1 to the
2014 Regulated Activities Regulations) and the three devolved regulators' proper names. These cannot
be varied without bending the citation.

Closers: the paired "a specialist reviews ... your accountant prepares" mould now closes two posts,
`cqc-registration-domiciliary-care-finance` and `supported-living-contract-forecast`. It was removed
from `business-asset-disposal-relief-selling-a-care-business` and `opening-a-childrens-home-finance`.
Intro openers were checked across the 13 and follow no single mould.

## 3. RCB 2/2025 "where necessary" qualifier

`supported-living-company-structure-before-framework-bid.md`: qualifier added in four places
(takeaway 4, FAQ 3, and the two refusal statements in the grouping H2).

`care/web/content/blog/care-home-vat-exemption-edge-cases.md` (live, minimum edit): qualifier added
in its three places (takeaway, FAQ answer, timeline table row) and `updatedDate: "2026-09-27"`
inserted. The post previously had no `updatedDate` key at all. Nothing else in the file was touched.

## 4. Link swaps

`opening-a-childrens-home-finance.md`: dropped `/for/childrens-homes`, added
`/blog/cqc-and-financial-compliance/supported-accommodation-registration-and-tax`. The closing
sentence was rewritten so the link carries an argument rather than sitting as a hub pointer.

`care-structure-before-cqc.md`: the "What about the day you sell?" paragraph cut from three
sentences to one, linking `/blog/business-structure-and-acquisition/business-asset-disposal-relief-selling-a-care-business`.
To stay at five links, the duplicate FVS pointer
(`cqc-registration-requirements-financial-viability-leg`) was dropped from the sentence that already
linked `cqc-financial-viability-statement-walkthrough`.

## 5. Frontmatter

Validated by rule against `care/web/src/lib/blog.ts` (and `STANDARD_MANIFEST` in
`packages/web-shared/lib/frontmatter.ts`) and against the two newest live posts. All 13 pass:
15 keys each, YAML re-parsed after every edit, `date` / `dateModified` / `updatedDate` all
2026-09-27, `author: "Care Home Tax Editorial Team"` on all 13, canonical host
`https://www.carehometax.co.uk` with the category slug produced by `slugifyCategory`, metaTitle
<= 60, metaDescription <= 155, summary 40 to 60 words, 4 to 6 FAQs, 3 to 5 takeaways, body 800 to
1,200 words, no `Source:` tails, no em-dashes, prose attribution throughout.

Byline: `blog.ts` reads `author` into `BlogPost`, but the only consumer in the codebase is
`src/app/feed.xml/route.ts`. Neither `src/app/blog/[category]/[slug]/page.tsx` nor any component
renders a byline, and `src/lib/schema.ts` does not emit an author. So on care, `author` is RSS-only
surface. The empty `author: ""` on the live corpus is therefore invisible on the page and only
produces an empty RSS author field. Setting it on the wave posts is harmless and consistent with the
brief; it will not change what a reader sees.

## 6. Internal links

Every internal link in the 13 posts resolves. Blog targets were checked to exist on disk and to have
a frontmatter category that slugifies to the path in the href. Calculator slugs were checked against
the `slug` fields in `care/web/src/lib/calculators/tools/`: `cqc-fee-calculator`,
`true-cost-care-hour-calculator` and `funded-nursing-care-fee-mix-calculator` all exist. `/for/` and
`/services/` targets were checked against `care/web/src/data/care-hubs.ts` and `care-services.ts`.

Sibling-dependent links (these resolve only once the wave ships; if a slug changes or a post is cut,
the linking post drops a link):

| Target (wave sibling) | Linked from |
|---|---|
| `care-structure-before-cqc` | `how-to-start-a-domiciliary-care-agency-money-decisions`, `supported-living-company-structure-before-framework-bid`, `supported-accommodation-registration-and-tax`, `care-personal-assistant-vat-registration`, `business-asset-disposal-relief-selling-a-care-business` |
| `business-asset-disposal-relief-selling-a-care-business` | `care-structure-before-cqc` |
| `cqc-registration-domiciliary-care-finance` | `cost-to-set-up-a-care-agency` |
| `supported-accommodation-registration-and-tax` | `opening-a-childrens-home-finance` |

`care-structure-before-cqc` and `business-asset-disposal-relief-selling-a-care-business` now link
each other, so cutting either one leaves a dead link in the other.

## 7. Final state

| Post | Body words | Links | Verdict |
|---|---|---|---|
| business-asset-disposal-relief-selling-a-care-business | 1,028 | 5 | pass |
| care-personal-assistant-vat-registration | 1,197 | 5 | pass |
| care-structure-before-cqc | 1,043 | 5 | pass |
| cost-to-set-up-a-care-agency | 1,096 | 5 | pass |
| cqc-registration-domiciliary-care-finance | 1,143 | 5 | pass (untouched) |
| how-to-start-a-domiciliary-care-agency-money-decisions | 1,171 | 5 | pass |
| nhs-continuing-healthcare-accounts | 1,112 | 5 | pass |
| opening-a-childrens-home-finance | 1,164 | 5 | pass |
| supported-accommodation-registration-and-tax | 1,074 | 5 | pass |
| supported-living-company-structure-before-framework-bid | 1,172 | 5 | pass |
| supported-living-contract-forecast | 1,122 | 5 | pass |
| vat-grouping-care-brief-2-2025 | 1,140 | 4 | pass (untouched) |
| vat-on-domiciliary-care | 1,135 | 5 | pass |

Eleven posts edited, two untouched. `care-personal-assistant-vat-registration`,
`how-to-start-a-domiciliary-care-agency-money-decisions` and
`supported-living-company-structure-before-framework-bid` are within 30 words of the 1,200 ceiling,
so any later deepening needs a matching trim. Every post except `vat-grouping-care-brief-2-2025` is
at the five-link cap.

## 8. Open for the manager

1. **`docs/care/house_positions.md` gaps**, carried forward from three editorial reports and not
   closed here: the £1,000,000 BADR lifetime limit with the TCGA 1992 s.169N reference, the £3,000
   CGT annual exempt amount, and an Ofsted row covering regulation 47, CSA 2000 s.11 and the Notice
   701/2 listing. Two wave posts derived the Ofsted position from source independently.
2. **`fnc-chc-la-fee-mix-accounting.md` (live) uses "seek advice specific to the relevant devolved
   regime"**, which the brief bans. Outside the one live file this task permitted. Needs a live sweep.
3. **`cqc-registration-costs-and-finance-guide.md` (live, 2026-07-15) competes with
   `cost-to-set-up-a-care-agency` for the same intent** and is vaguer on figures. Neither links the
   other. Decide link target or rewrite candidate before the wave ships.
4. **The five-link cap costs `how-to-start-a-domiciliary-care-agency-money-decisions` its
   `/services/` link**, on the wave's highest-intent query. If the cap can be relaxed for one post,
   that is the one.
5. **Empty `author` across the live corpus.** Harmless on the page, but the RSS feed currently emits
   an empty author for every live post. Worth a one-line backfill decision.
