# SPV Formation Programme, De-Cannibalised Page Map (Property)

Host: **Property (Property Tax Partners)**, owner decision, we have the equity.
Inputs: `demand_corpus.csv` (9,762), `questions_corpus.csv` (1,700), `our_queries.csv` + `OUR_DEMAND.md`
(GSC + Bing, window 2026-06-03 to 2026-09-01), `competitor_urls.csv`, and the live Property corpus on disk.
Output: `page_map.csv` (51 units). Date: 2026-09-01.

## 1. Corpus index

- **783 blog posts on disk** in `Property/web/content/blog/` (flat files; category comes from frontmatter,
  URLs are `/blog/<category-slug>/<slug>`).
- Category split: Landlord Tax Essentials 163, **Incorporation & Company Structures 160**, Property Types
  & Specialist Tax 156, Property Accountant Services 63, CGT 54, Non-Resident Landlord Tax 47,
  Section 24 46, MTD 41, **Property Finance 34**, Portfolio Management 19.
- **Track B is BUILT and on disk**, not planned: `spv-mortgages-explained`,
  `spv-mortgage-no-income-newly-formed`, `sic-code-for-an-spv-property-company`,
  `day-one-remortgage-limited-company`, `buy-to-let-mortgages-guide` and the rest of the 15-page
  SPV/BTL finance cluster all exist under category Property Finance. They are RESERVED, not reservable.
- **Calculators (5 live)**: `stamp-duty-calculator`, `section-24-calculator`,
  `incorporation-cost-calculator`, `mtd-checker`, `portfolio-profitability-calculator`
  (`src/lib/calculators/registry.ts`). Root routes that matter to this map: `/incorporation`,
  `/section-24`, `/property-tax-rates`, `/calculators`. `/services/*` is hardcoded, so a new pillar
  goes at root level, per site convention.

**Question triage.** 1,700 raw questions, 40 dropped as non-UK/off-topic (India, Thailand, US property
tax, S-corp, REIT tickers, SPV-the-file-format, SPV-the-rabbit-virus), aggressive near-duplicate merge
("...to a limited company" / "...to a ltd company" / "...to limited company" = one unit) leaves
**1,390 units**, of which **664 are property-relevant**. The residue is brutal: the "SIC + Companies
House admin" bucket (421 raw) collapses to **18 property-relevant units**, because ~90% is generic SIC
lookup for unrelated trades and Indian Companies Act 2013 noise. The bare-"spv" tail in misc is mostly
foreign-language and non-property senses of the acronym.

## 2. Verdict totals

| Verdict | Units | Meaning |
|---|---:|---|
| NEW | 17 | 15 blog/hub pages + 1 root pillar + 1 new calculator |
| EXTEND | 12 | 10 existing pages rewritten/added to + 2 calculators |
| COVERED | 15 | existing page already owns the intent, no action |
| RESERVED | 7 | Track B built slugs + one trap phrasing family |

## 3. Our-data priority signals (fold into every brief)

1. **Transfer-in beats formation 4-5x in our own data** (9,625 impressions / 434 queries vs 2,076 / 181).
   The audience already owns property. The pillar leads with "move what you own", not "start from zero".
2. **Two transfer pages already rank at position 1.5-3.9** (`sdlt-transfer-property-company-cost`,
   `how-to-transfer-property-into-limited-company-uk`). They are PROTECTED. No new page in this
   programme may target SDLT-on-transfer or the transfer how-to.
3. **Four broad incorporation queries rank at position 46-70 with zero clicks.** These are rewrite
   targets, not new-page targets: `incorporation-existing-portfolios-phased-approach` (52.6 / 46.6),
   `sdlt-incorporation-stamp-duty-twice` (50.3), and `property incorporation capital gains tax` (70.3,
   currently landing on the transfer page but belonging on `incorporate-rental-property-without-cgt`).
   All marked P1 EXTEND.
4. **Mortgages-in-company converts above its volume**: 276 impressions, 76 clicks, ~27% click share,
   the best ratio of any bucket. The pillar and every formation page cross-link into Track B early.
5. `holding-company-structure-uk-tax` at position 77.3 with 2,659 impressions is on **generalist**
   (Holloway Davies), not Property. Out of scope for this host; flagged for the generalist backlog.

## 4. Query-formulation rule (structural, inherited by every brief)

One human need is typed four or five ways. A page that targets one phrasing loses the others.

- **Dominant query owns the H1.** One page, one H1 intent.
- **Every major variant gets an explicit H2 or FAQ entry**, in the user's words: question form
  ("can i transfer my house to my limited company"), cost form ("cost of transferring property to ltd
  company"), action form ("transfer buy to let into company"), and **conversational/AI form**
  ("should i put my rental in a company") because Bing and ChatGPT surface those and Bing out-clicks
  Google on this estate.
- **Group by intent, not by string.** Two phrasings wanting the same answer share a page. A phrasing
  wanting a *different* answer is a sibling H2 or its own page: **cost is not process** (U03 vs U02),
  **which SIC code is not how to change it** (U09 vs U10), **the charge is not the relief** (U15 vs U18).
- `page_map.csv` carries `query_variants` per unit (4-10 formulations). That column is the H2/FAQ
  skeleton the writer inherits; it is not optional decoration.

## 5. Pillar and hub architecture

```
/spv-company                      NEW PILLAR (P1) - the SPV lifecycle, root level
|
|-- links ACROSS (never competes):
|     /incorporation                     owns "should I incorporate" + feasibility
|     spv-property-investment-...-guide  owns "what is an SPV" (ranks 6.5-7.6 Bing)
|     /section-24                        owns the reason SPVs exist
|
|-- HUB 1  formation mechanics
|     U02 how-to-set-up-property-investment-company-uk-guide   EXTEND P1
|     U03 spv-company-formation-cost-uk                        NEW P1
|     U05 spv-company-bank-account                             NEW P2
|     U06 registered-office-address-property-spv               NEW P2
|     U04 spv-company-name-rules-uk                            NEW P3
|
|-- HUB 2  SIC / Companies House admin
|     U12 spv-first-year-accounts-and-filing-timeline          NEW P2
|     U10 change-sic-code-companies-house-property-company     NEW P3
|     U09 sic-code-for-an-spv-property-company     RESERVED (Track B)
|     U11/U13 confirmation-statements, register-for-uk-corporation-tax  COVERED
|
|-- HUB 3  transfer-in   <-- heaviest hub, per our own data
|     U15 sdlt-transfer-property-company-cost           COVERED / PROTECT
|     U16 how-to-transfer-property-into-limited-company-uk  COVERED / PROTECT
|     U17 incorporation-existing-portfolios-phased-approach  EXTEND P1 (rewrite)
|     U18 sdlt-incorporation-stamp-duty-twice           EXTEND P1 (rewrite)
|     U20 incorporate-rental-property-without-cgt       EXTEND P1 (rewrite)
|     U19 incorporating-property-portfolio-uk-2026      EXTEND P2 (de-conflict)
|     U21 transfer-property-to-limited-company-conveyancing  NEW P2
|     U24 transfer-property-out-of-limited-company-to-personal-name  NEW P2
|
|-- HUB 4  run the company
|     U27 limited-company-buy-to-let-allowable-expenses  NEW P1
|     U29 director-living-in-property-owned-by-limited-company  NEW P2
|     U32 landlord-registration-limited-company-scotland-wales   NEW P3
|     U28 landlord-insurance-guide-...                   EXTEND P3
|     U26/U30/U31/U33 running costs, market rent, extraction, accounting  COVERED
|
|-- HUB 5  selling and closing
|     U34 how-to-close-a-property-limited-company        NEW P1
|     U35 selling-a-property-spv-share-sale-vs-asset-sale  NEW P2
|
|-- HUB 6  ownership structures
|     U40 property-joint-venture-spv-structure-uk        NEW P2
|     U38/U39/U41/U42 structure choice, shares, trusts   COVERED
|
|-- HUB 7  non-resident (ONE page, per the demand read)
|     U44 offshore-company-owning-uk-property            NEW P2
|     U43 non-resident-landlord-scheme-uk-complete-guide EXTEND P2
|
|-- CROSS-LINK OUT to Track B (mortgages, RESERVED, built):
      spv-mortgages-explained · buy-to-let-limited-company-mortgage-options
      spv-mortgage-no-income-newly-formed · day-one-remortgage-limited-company
      buy-to-let-mortgages-guide · portfolio-landlord-mortgages-guide
|
|-- TOOLS: /calculators/incorporation-cost-calculator (EXTEND)
           /calculators/stamp-duty-calculator (EXTEND)
           /calculators/property-company-extraction-calculator (NEW)
```

## 6. P1 list in full

| Unit | Verdict | Slug | Dominant query |
|---|---|---|---|
| U01 | NEW | `/spv-company` | set up a limited company for buy to let |
| U02 | EXTEND | how-to-set-up-property-investment-company-uk-guide | how to set up an spv company |
| U03 | NEW | spv-company-formation-cost-uk | how much does it cost to set up an spv |
| U17 | EXTEND | incorporation-existing-portfolios-phased-approach | landlord portfolio incorporation uk |
| U18 | EXTEND | sdlt-incorporation-stamp-duty-twice | stamp duty on property incorporation uk |
| U20 | EXTEND | incorporate-rental-property-without-cgt | property incorporation capital gains tax |
| U27 | NEW | limited-company-buy-to-let-allowable-expenses | limited company buy to let allowable expenses |
| U34 | NEW | how-to-close-a-property-limited-company | closing a limited company |
| C1 | EXTEND | /calculators/incorporation-cost-calculator | limited company vs personal buy to let calculator |
| C2 | EXTEND | /calculators/stamp-duty-calculator | stamp duty calculator limited company |
| (U15, U16 are P1-PROTECT: no work, defend.) |

## 7. P2 / P3 counts per cluster

| Cluster | P2 | P3 |
|---|---:|---:|
| formation mechanics | 2 (U05, U06) | 2 (U04) |
| SIC / CH admin | 1 (U12) | 2 (U10, U14) |
| transfer-in | 3 (U19, U21, U24) | 1 (U23) |
| run-the-company | 1 (U29) | 2 (U28, U32) |
| selling / closing | 1 (U35) | 0 |
| ownership structures | 1 (U40) | 0 |
| non-resident | 2 (U43, U44) | 0 |
| calculators | 1 (C3) | 1 (C4) |

## 8. EXTEND list in full

| Existing slug | What to add |
|---|---|
| how-to-set-up-property-investment-company-uk-guide | Literal Companies House walkthrough: IN01 fields, share capital choice, PSC statement, ECCTA ID verification, realistic timeline, what a lender wants on day one. The page is strategy-shaped; mechanics are the gap. |
| incorporation-existing-portfolios-phased-approach | Full rewrite for the head framing "landlord portfolio incorporation uk" (pos 52.6, 0 clicks). Cost table, timeline, s162 gate summary, FAQ. |
| sdlt-incorporation-stamp-duty-twice | Full rewrite for "stamp duty on property incorporation uk" (pos 50.3, 0 clicks). Reassert the relief/double-charge frame, hard-separate from U15. |
| incorporate-rental-property-without-cgt | Claim "property incorporation capital gains tax" (pos 70.3, currently mis-landing on the transfer page). Split cleanly from section-162-incorporation-relief-property-landlords: this = outcome, that = statutory test. |
| incorporating-property-portfolio-uk-2026 | De-conflict from the phased page: this one becomes the linear step-by-step for a full incorporation. Never merge, never redirect. |
| sdlt-group-relief-for-corporate-landlord-portfolios | Opening H2 in plain language for "transfer property between limited companies". |
| landlord-vat-registration-when-required | One company/SPV section. No separate SPV-VAT page; residential letting is exempt and the honest answer is short. |
| landlord-insurance-guide-types-costs-tax-deductible | One SPV section: policy in the company name, lender requirement, why a personal-name policy fails. |
| non-resident-landlord-scheme-uk-complete-guide | The COMPANY path: NRL4/NRL6, the 6 April 2020 income-tax-to-corporation-tax move. Cross-link changes-nrl-companies, do not duplicate. |
| spv-mortgages-explained (Track B) | Only if the personal-guarantee angle is absent. An EXTEND, never a new page. |
| /calculators/incorporation-cost-calculator | Professional-fees line (solicitor, valuation, lender) + running-cost line. It already does CGT, SDLT, s162 toggle, extract/retain and break-even. |
| /calculators/stamp-duty-calculator | Explicit company / connected-party mode (market-value rule, s.53 FA 2003) and the six-dwellings non-residential election flag. |

## 9. Cannibalisation warnings (the seams, and what keeps them apart)

1. **U15 vs U18 (highest risk).** `sdlt-transfer-property-company-cost` owns the CHARGE on a
   connected-party transfer and ranks 1.5-3.9. `sdlt-incorporation-stamp-duty-twice` owns the
   DOUBLE-CHARGE and relief question on incorporating a business and ranks 50.3. The U18 rewrite must
   not drift into "how much SDLT will I pay", or it will eat a page that is already winning.
2. **U17 vs U19.** Two portfolio-incorporation pages already exist and already split each other's
   signal. Phased/partial strategy (U17) vs linear full step-by-step (U19). Fix in the rewrite; do not
   merge or redirect (house rule).
3. **U01 pillar vs `/incorporation` vs the SPV guide.** Three pages within arm's reach of "SPV".
   `/incorporation` = should I. The blog guide = what is one. The pillar = the vehicle's lifecycle and
   the hub. The pillar must summarise "should I" in three sentences and link, never argue it.
4. **U03 vs `property-company-running-costs-annual-budget`.** Year-one setup cost vs annual run rate.
   Both mention numbers; only one owns the annual budget.
5. **U09 vs U10.** Which SIC code (Track B, protected) vs changing it later. U10 must not list codes.
6. **U21 vs U15/U16.** Solicitor, lender consent, valuation, Land Registry, timeline. Tax gets two to
   four sentences and a link up. This is the same de-cannib rule Track B used for finance-vs-tax.
7. **U27 vs the individual-landlord expense pages.** Company-side deductions only (full finance-cost
   deduction, s.61 CTA 2009 pre-trading, capital allowances, director costs). It must never restate
   the Section 24 argument.
8. **U34 vs `mvl-members-voluntary-liquidation-property-company` vs `file-dormant-accounts`.** Route
   choice and DS01 mechanics only. The MVL page keeps the CGT-vs-income analysis of the final
   distribution.
9. **U36 is a trap, not a page.** 13 deduped "can i sell my house to my own limited company" questions
   are transfer-in intent wearing a sale verb. They become an FAQ block on U15/U16. Building a page
   there would attack our two best-ranking assets.
10. **U44 vs the ATED estate.** Twenty-plus ATED pages exist. The offshore hub is a router: verdict up
    top, then links. It must not re-explain ATED bands.

## 10. Calculator verdicts

| Proposed | Verdict | Why |
|---|---|---|
| incorporate-vs-personal comparison | **EXTEND C1** | `incorporation-cost-calculator` already models both sides, CGT, SDLT, the s162 toggle, extract-vs-retain and break-even. |
| SDLT on transfer via company | **EXTEND C2** | `stamp-duty-calculator` already applies the 5% company surcharge. Needs a connected-party market-value mode. 1,000/mo on the company phrasing. |
| transfer total cost | **EXTEND C1** | Same tool plus a professional-fees line. A third calculator here would cannibalise C1 and C2. |
| property-company extraction | **NEW C3 (P2)** | The deepest blog cluster on the site with no tool attached. 2026/27 dividend rates already ground truth. |
| SPV running cost | **EXTEND C1 (P3)** | Add as a line item first. It has not earned a standalone tool. |

## 11. Honest caveats

1. **The stated head term "spv company" at 720/mo is not in our corpus.** DataForSEO returned no row
   for `spv company`, `spv`, `set up spv company` or `spv company set up cost`. The largest measured
   SPV-literal term is `setting up a spv limited company` at 30/mo. The pillar is justified by our own
   ranking data (Bing pos 6.5-8.0 on `spv`, `what is an spv company`, `spv for property portfolio`) and
   by hub utility, **not** by a verified 720/mo head term. Verify before anyone sizes traffic off it.
2. **The SPV formation vertical is small.** Once generic company-registration and generic-tax noise is
   stripped, SPV-specific demand is roughly 71k/mo total, and mortgages are 41.6k of it. Formation
   terms proper total under 400/mo. This programme is a coverage and conversion play, not a traffic play.
3. **`gsc_query_data` is partial/sampled and the Bing figures are one trailing-window snapshot.**
   Everything in section 3 is a relative signal inside our own SPV query set. Never quoted as a total.
4. **The costs+fees bucket is autocomplete-blind** (6 units after dedupe, despite four dedicated
   re-seeds). U03 is built on judgement and competitor footprint, not measured volume. If it
   underperforms, that is the reason, and a GSC pull once the page is live is the honest next source.
5. **Zero-volume pages are deliberate.** U04, U05, U10, U32 have no measured volume. They are included
   under coverage-over-selection; they are P3 for exactly that reason.
6. **"other/general SPV" (799 queries) is a regex bucket of last resort, not an opportunity.** It is
   not read as a single intent anywhere in this map.
7. **`competitor_urls.csv` was not used to force page choices**, only as a table-stakes check. Its own
   report notes the specialist sitemaps are dominated by unrelated content, so absence there is weak
   evidence of whitespace.
8. **Not verified in this pass:** whether `spv-mortgages-explained` already covers personal guarantees
   (U45), and whether U19/U17 overlap is worse in the rendered pages than the titles suggest. Both are
   read-the-page checks for the brief stage, and both were flagged rather than assumed.
