# Property audience-family scoping, 2026-08-21

Scope: seven audience segments the owner named, tested against our corpus, our own
earned search data, the existing competitor harvests, and free Bing keyword APIs.
No site content was changed. Nothing was committed.

**Headline:** five of seven are already answered. Segments 1 and 2 are saturated,
segment 5 is mid-build and just needs deploying, segment 6 is not ours. The three
that carry unclaimed value are **holiday lets / Airbnb (extend)**, **property
developers (extend, plus a missing service page)** and **rural / agricultural
estates (new mini-cluster, tightly bounded)**.

---

## Sources, named once (each number below cites one of these)

| ID | Source | Pulled | Notes |
|---|---|---|---|
| S1 | Corpus grep, `Property/web/content/blog` (763 `.md` files) + `Property/web/src/app` routes | 2026-08-21 | Slug-regex classification, segments overlap by design |
| S2 | Competitor harvest, 4 dumps deduped to 11,851 rows / 7 domains: `_competitor_ranked_keywords_2026-08-18.json`, `_competitor_cgt_keywords_2026-08-20.json`, `_competitor_tools_keywords_2026-08-21.json`, `_competitor_rental_keywords_2026-08-21.json` | 08-18 to 08-21 | **Capped at 1,000 rows per domain in the 08-18 pull.** Tail is truncated |
| S3 | Bing `GetKeywordStats`, free, GB / en-GB, median weekly Bing impressions | 2026-08-21 | Bing-only impressions, directional and relative, not absolute market volume |
| S4 | Bing `GetRelatedKeywords`, free | 2026-08-21 | Drifts hard to head brand terms on niche seeds, see LIMITATIONS |
| S5 | Fresh GSC pull, `sc-domain:propertytaxpartners.co.uk`, query dimension, 2026-05-23 to 2026-08-21 (90d), 5,014 query rows, 89 clicks / 41,282 impressions | 2026-08-21 | Live API, not a stored snapshot |
| S6 | Fresh Bing `GetQueryStats`, propertytaxpartners.co.uk, top 1,300 queries | 2026-08-21 | Top-N only, site totals need `GetRankAndTrafficStats` |
| S7 | Specialist competitor scout, WebFetch + WebSearch, 4 segments | 2026-08-21 | Descriptive only, no ranking positions claimed |

Serper is out of credits. **No live-SERP position claim appears anywhere in this
report.** Every position cited is either our own GSC/Bing average position (S5/S6)
or a stored competitor harvest position (S2, as at its pull date).

---

## 1. Landlords (buy-to-let)

**Coverage verdict: WELL-COVERED (saturated).**

267 of 763 posts match landlord intent (S1), plus dedicated routes
`/landlord-tax`, `/section-24`, `/landlord-compliance`, `/making-tax-digital-landlords`,
`/services/landlord-accountant`, `/calculators/section-24-calculator`.

Examples: `section-24-mortgage-interest-restriction-uk-landlords`,
`how-much-tax-rental-income-uk-complete-guide`,
`landlord-tax-deductions-uk-2026-complete-list`,
`non-resident-landlord-scheme-uk-complete-guide`,
`mtd-itsa-overview-six-changes-residential-landlords`.

| Signal | Number | Source |
|---|---|---|
| Our pages | 267 | S1 |
| Our GSC queries / impressions, 90d | 790 queries, 8,329 impressions, 8 clicks | S5 |
| Our Bing queries / impressions | 232 queries, 1,096 impressions, 135 clicks | S6 |
| Competitor harvest | 796 unique keywords, 675,330 combined volume, all 7 domains | S2 |
| Bing head term "landlord tax" | median 9 weekly impressions | S3 |

**Competitor presence:** all seven tracked domains. Their volume mass is
mortgage-broker and insurance terms (`buy to let mortgage` 33,100, `landlord insurance`
27,100, S2), which the tools dossier already classifies as excluded off-niche.

**Opportunity verdict: SATURATED.** 267 pages against a keyword set whose remaining
head volume is deliberately out of scope; the marginal page here is worth less than
the same effort in segments 3, 4 or 7.

---

## 2. Property investors

**Coverage verdict: WELL-COVERED (saturated).**

116 posts (S1), plus `/incorporation` and `/calculators/incorporation-cost-calculator`.
The incorporation cluster is already the next named phase in
`docs/property/HANDOFF_2026-08-20.md`.

Examples: `should-i-incorporate-buy-to-let-portfolio-2026`,
`section-162-incorporation-relief-property-landlords`,
`a-complete-guide-to-family-investment-companies-fics`,
`extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27`,
`when-does-property-holding-company-structure-make-sense-uk-landlords`.

| Signal | Number | Source |
|---|---|---|
| Our pages | 116 | S1 |
| Our GSC queries / impressions, 90d | 106 queries, 2,007 impressions, 0 clicks | S5 |
| Our Bing queries / impressions | 53 queries, 153 impressions, 38 clicks | S6 |
| Competitor harvest | 136 unique keywords, 74,270 combined volume | S2 |
| Bing seeds "property investment tax", "property company spv" | 0 weekly impressions recorded | S3 |

Our strongest unearned query is `sdlt transfer property to limited company connected
party 2025`, 635 impressions at average position 9 (S5). That is a position problem on
an existing page, not a coverage gap.

**Competitor presence:** provestor leads (109 of 204 rows), then uklandlordtax and
optimiseaccountants. Their head terms are generic company-formation phrases
(`set limited company` 14,800, `private limited company` 5,400, S2), not investor tax.

**Opportunity verdict: SATURATED.** The live work is position recovery inside the
already-scheduled incorporation cluster, not new audience capture.

---

## 3. Airbnb / holiday-let hosts

**Coverage verdict: PARTIAL.**

20 posts (S1). Post-FHL-abolition framing is already correct: every legacy-titled post
spot-checked carries explicit April 2025 abolition treatment (9 to 25 mentions each,
S1), so this is a breadth and ranking problem, not a stale-facts problem.

Examples: `serviced-accommodation-tax-fhl-abolition-april-2025`,
`fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics`,
`airbnb-tax-uk-short-term-rental-income-taxed`,
`sdlt-furnished-holiday-let-2025-abolition`,
`serviced-accommodation-vs-buy-to-let-tax-comparison-2026`.

| Signal | Number | Source |
|---|---|---|
| Our pages | 20 | S1 |
| Our GSC queries / impressions, 90d | 191 queries, 1,306 impressions, **0 clicks** | S5 |
| Our GSC average positions on the top FHL queries | p32 to p70 | S5 |
| Our Bing queries / impressions | 14 queries, 22 impressions, 10 clicks | S6 |
| Bing queries on `holiday-let-tax-calculator-fhl-changes` | 0 rows in the 08-21 artifact | `briefs/property/tools/_bing_page_queries.json` |
| Competitor harvest | 45 unique keywords, 11,400 combined volume | S2 |
| Deferred candidate already on the list | `candidate-tool:fhl-str`, str calculator 3,600 volume | `briefs/property/tools/DOSSIER.md` §4 and §9.3 |

The zero-click line matters. 1,306 impressions over 90 days with nothing converting
because we sit on page 4 and worse. Demand is proven and unclaimed by us.

**Competitor presence:** uklandlordtax owns the tax half of this space in the harvest,
holding position 1, 2 and 5 on `taxation airbnb`, `tax and airbnb` and `airbnb tax`
(S2, as at 08-18). provestor holds the FHL half (29 of 60 rows). landlordstudio holds
the non-tax operator questions (`what percentage does airbnb take`). Outside the tracked
set the space is fragmented across a long tail of small firms with landing-page-led,
calculator-free content and inconsistent post-abolition freshness (S7).

**Fit and risk:** perfect brand fit, no compliance exposure beyond the already-locked
§6 FHL transition position. The zero-Bing-rows finding on the FHL calculator is an open
question, not a finding: that page is new and may simply not have accrued impressions yet.

**Opportunity verdict: EXTEND-EXISTING.** Best evidence-to-effort ratio of the seven.
We already hold the ground truth and the deferred calculator brief.

---

## 4. Property developers

**Coverage verdict: PARTIAL, technically deep but commercially unserved.**

27 posts (S1), heavily weighted to VAT and reliefs. Note the site's registered buyer
persona already names developers ("UK landlords, buy-to-let investors, property
developers", `public.sites`), yet `/services` carries landlord-accountant,
non-resident-landlord, property-accountant and property-tax-advice, with **no developer
service page** (S1).

Examples: `residential-property-developer-tax-uk`,
`land-remediation-relief-cta-2009-part-14-100-50-percent-deduction-polluter-exclusion`,
`vat-commercial-to-residential-conversion-5-percent-reduced-rate-developer-recovery-mechanics`,
`property-development-tax-trading-vs-investment-income`,
`anti-fragmentation-rule-section-356oh-section-517h-multi-entity-developer-scheme-defeat`.

| Signal | Number | Source |
|---|---|---|
| Our pages | 27 | S1 |
| Our GSC queries / impressions, 90d | 47 queries, 354 impressions, 0 clicks | S5 |
| Commercial-intent query already earned | `accountant for property developers west midlands`, 14 impressions, average position 11 | S5 |
| Informational query already close | `property conversion` 53 impressions p11, `vat on conversion` 44 impressions p16 | S5 |
| Our Bing queries / impressions | 7 queries, 15 impressions, 8 clicks (incl. `residential property developer tax`) | S6 |
| Bing head term "land remediation relief" | median 18 weekly impressions, max 27 | S3 |
| Competitor harvest | 5 unique keywords, 780 combined volume, essentially nobody | S2 |

Read the S2 line carefully. Near-zero competitor coverage in a harvest of seven
accountancy domains does not mean no demand; it means **no accountancy brand is
competing here**. S7 confirms the space is held by stale single articles (a 2022-framed
RPDT guide with no revision date) and by big-firm technical notes, with no developer-tax
hub anywhere.

The Bing comparison is the useful one: "land remediation relief" at 18 weekly
impressions is double our own core head term "landlord tax" at 9 (S3, same method, same
window).

**Fit and risk:** strong brand fit, developers are already in the persona. No new
compliance surface: RPDT, land remediation and VAT on conversions are all corporate/VAT
mechanics we already write. Low risk.

**Opportunity verdict: EXTEND-EXISTING.** Two cheap moves: a developer service page
(the p11 commercial query says the intent already finds us) and a hub that binds the
27 existing technical posts into something a developer can navigate.

---

## 5. Property management companies

**Coverage verdict: PARTIAL and mid-build, but the audience is leaseholders, not
management companies.**

16 posts match (S1), of which **8 are committed and pushed (Wave 11, `8c915e77`) but NOT YET DEPLOYED - deploy is owner-gated**
(`right-to-manage-explained`, `right-to-manage-process-steps`,
`right-to-manage-company-setup`, `service-charge-disputes-leaseholders`,
`lease-extension-cost-uk`, `lease-extension-solicitor-what-they-do`,
`ground-rent-rules-uk`, `leasehold-reform-act-2024-what-is-in-force`). The `/leasehold`
pillar (21 links, in-force table) and `lease-extension-premium-calculator` are built and
tsc-clean per `docs/property/STATE.md` §6, with the prod build and dependency closure
not yet run.

Examples: `right-to-manage-explained`, `service-charge-disputes-leaseholders`,
`sdlt-leasehold-extension-vs-fresh-purchase`,
`brief-introduction-to-commercial-property-service-charge-accounts`,
`building-safety-act-2022-cladding-cost-recovery-leaseholder-protections-landlords`.

| Signal | Number | Source |
|---|---|---|
| Our pages | 16 (8 live, 8 undeployed) | S1 + git status |
| Our GSC queries / impressions, 90d | 47 queries, 644 impressions, 1 click | S5 |
| Best cluster already earned | lease-extension SDLT family: 137 + 99 + 92 + 89 impressions at p14 to p16 | S5 |
| Our Bing queries / impressions | 2 queries, 5 impressions | S6 |
| Bing head terms "right to manage" / "block management" | median 19 and 15 weekly impressions | S3 |
| Competitor harvest | 16 unique keywords, 16,770 combined volume, 14 of 17 rows landlordstudio | S2 |

**Competitor presence:** landlordstudio holds the leasehold-reform news family
(`leasehold reform` 9,900 volume) at positions 63 to 91 in the harvest (S2, at pull
date), which is to say nobody in the tracked set actually holds it. The genuine B2B
market, s.21 Landlord and Tenant Act 1985 service-charge certification for RMCs and
managing agents, is served by specialist compliance firms with sales pages and no
content (S7). That market buys a certifying accountant because it is legally required,
not because it searched a guide.

**Fit and risk:** the leaseholder audience is a clean fit and already in flight. The
managing-agent B2B audience is a different business model (recurring statutory
certification), a different buyer, and would need audit-adjacent capability we do not
claim. Do not conflate them.

**Opportunity verdict: EXTEND-EXISTING for leaseholders (already built, ship it);
SKIP the managing-agent B2B segment.** The lease-extension SDLT family sitting at p14
to p16 with 417 combined impressions is the single most mature near-miss on the site.

---

## 6. Estate and letting agents

**Coverage verdict: ABSENT as an audience.**

2 posts match, and both are landlord-facing mechanics that merely mention agents:
`mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly` and
`nrl-scheme-letting-agents-quarterly-returns-mechanics` (S1). We have no agent-facing
page. Only 2 examples exist, so no five-slug list is possible.

| Signal | Number | Source |
|---|---|---|
| Our pages | 2 (both landlord-facing) | S1 |
| Our GSC queries / impressions, 90d | 6 queries, 119 impressions, 0 clicks | S5 |
| The one commercial signal | `accountant for letting agents leicester`, 107 impressions, average position 5 | S5 |
| Our Bing queries / impressions | 5 queries, 12 impressions, 3 clicks, all NRL-scheme mechanics | S6 |
| Bing "client money protection" | median 21 weekly impressions | S3 |
| Bing "letting agent accounts" / "estate agent accounting" | 0 weekly impressions; related-keyword call returned Waterstones and Savills | S3, S4 |
| Competitor harvest | 12 unique keywords, 3,950 combined volume, **100% landlordstudio**, all landlord-side fee questions | S2 |

The 107-impression query at position 5 is one query on one page over 90 days. That is a
curiosity, not a demand case, and it should not be read as a segment.

**Fit and risk:** an agency practice is B2B accountancy (client money accounts,
Propertymark and RICS client-money rules, agency payroll), not property tax. Property
Tax Partners is a landlord and property-tax brand; an agent-facing service dilutes it.
The estate already has the right home for B2B accountancy work in the generalist site.

**Opportunity verdict: SKIP on Property.** If it is ever wanted, it is a
generalist-site or new-vertical question, and the demand evidence does not currently
justify either.

---

## 7. Landed and rural estates

**Coverage verdict: ABSENT as an audience, adjacent as a topic.**

9 posts match, and all nine reach agriculture from the landlord IHT angle rather than
from a farming audience (S1).

Examples: `agricultural-property-relief-mixed-estate-1m-cap`,
`iht-april-2026-bpr-apr-cap-property-impact`,
`agricultural-relief-for-inheritance-tax-key-benefits`,
`farmland-supply-value-drops-is-iht-reform-to-blame`,
`iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation`.

| Signal | Number | Source |
|---|---|---|
| Our pages | 9 (all landlord-angle IHT) | S1 |
| Our GSC queries / impressions, 90d | 12 queries, 22 impressions, 0 clicks | S5 |
| Our Bing queries / impressions | **0** | S6 |
| Bing "agricultural property relief" | median 24 weekly impressions, max 37, the **largest head-term signal of all seven segments** on the same method | S3 |
| Bing "landlord tax" for comparison | median 9 weekly impressions | S3 |
| Bing related to "agricultural property relief" | `business property relief` 533, **`2.5 million` 21** | S4 |
| Competitor harvest | 8 unique keywords, 20,540 combined volume, **100% ukpropertyaccountants**, every one at position 51 to 57 | S2 |

The competitor line is the finding. `farmers inheritance tax` and its variants carry
4,400 volume each, one tracked accountancy domain covers them, and it sits on page 5 and
worse (S2, at pull date). Nobody in the accountancy content set owns this. S7 confirms
the real incumbents, Saffery (landed estates hub, 11 sub-pages) and Old Mill (farming
and rural hub), compete on partner credentials and client rosters, publish no
calculators, use no gated assets, and had no April 2026 BPR/APR cap treatment on their
hubs at time of check.

The `2.5 million` related-keyword hit (S4) is a small but direct signal that searchers
are already looking for the enacted quantum, which is exactly where our ground truth is
stronger than the market's.

**Fit and risk, and this is the important part:**

- The APR/BPR cap itself is fully locked ground truth. `docs/property/house_positions.md`
  §15.4 and §22.1, plus memory `br_apr_1m_cap_2026_ground_truth`: **combined £2.5m rolling
  7-year BPR + APR allowance, IHTA 1984 s.124D inserted by FA 2026 Sch 12 para 4, in force
  6 April 2026, 50% relief above, effective 20% IHT.** GOV.UK's announcement-stage summary
  page still shows the stale £1m headline from 30 October 2024 and must never be cited
  (F-102, verified three ways on 2026-05-27). Also locked: AIM 50% sub-tier does not
  consume the allowance; anti-forestalling from 30 October 2024; trust anti-fragmentation
  for same-settlor multi-trust structures.
- §22.1 locks the Pawson investment line, which is the reason a pure BTL portfolio fails
  BPR. That boundary is what keeps an APR cluster honest and inside our competence.
- **Full farm accountancy is not ours.** Herd basis, farmers' averaging, BPS and SFI
  payments, agricultural tenancy law under the AHA 1986 and ATA 1995, natural capital and
  biodiversity net gain: none of this is covered by any house position, and none of it is
  property tax. Writing it on Property would be writing outside our verified corpus.
- Housekeeping flag, not fixed here because content edits were out of scope: three slugs
  still read `1m-cap` (`agricultural-property-relief-mixed-estate-1m-cap`,
  `iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation`, and the `£1m` framing
  in `iht-april-2026-bpr-apr-cap-property-impact`). **The bodies are correct**, spot-checked:
  £2.5m dominates and every £1m mention is the explicit stale-GOV.UK contrast. But the
  URLs read as stale to anyone scanning a SERP or a sitemap.

**Opportunity verdict: NEW-CLUSTER-CANDIDATE, bounded.** Build the APR/BPR cap and
mixed-estate cluster on Property, where the landlord overlap is genuine (a landlord who
also owns let farmland, a mixed estate allocating one £2.5m allowance across farmland,
trading business and BTL). Do **not** build a farm accountancy audience on Property. If
the owner wants the full farming vertical, that is a DIFFERENT-SITE decision on the
construction-cis precedent, and it needs its own ground-truth corpus first.

---

## Ranked opportunity table

| # | Segment | Verdict | Evidence weight | Effort | Why it ranks here |
|---|---|---|---|---|---|
| 1 | 3. Airbnb / holiday lets | EXTEND-EXISTING | 1,306 own impressions, 0 clicks, p32 to p70 (S5); competitor tax coverage concentrated in one domain (S2); fragmented, calculator-free field outside it (S7) | Low | Proven demand we already reach and cannot convert. Ground truth locked (§6). The `fhl-str` calculator brief is already written and deferred |
| 2 | 4. Property developers | EXTEND-EXISTING | Commercial query at p11 (S5); "land remediation relief" 2x our core head term on Bing (S3); 5 competitor keywords total (S2); no developer hub exists anywhere (S7) | Low | 27 technical posts already written, no service page, persona already names developers. Cheapest structural win on the list |
| 3 | 7. Rural / agricultural estates | NEW-CLUSTER-CANDIDATE (bounded) | Largest free-Bing head signal of the seven (S3); 20,540 competitor volume all sitting at p51+ (S2); incumbents are relationship-led with no cap content (S7) | Medium | Real uncontested demand, our IHT ground truth is stronger than the market's, but scope must stop at the APR/BPR cap and mixed-estate allocation |
| 4 | 5. Leasehold (leaseholder audience) | EXTEND-EXISTING, already in flight | 417 impressions on the lease-extension SDLT family at p14 to p16 (S5) | Already built | Not a new decision. 8 posts, a pillar and a calculator are built and undeployed. Shipping them is the action |
| 5 | 2. Property investors | SATURATED | 116 pages, 0 clicks on 2,007 impressions (S5) | n/a | Position work inside the already-scheduled incorporation cluster |
| 6 | 1. Landlords | SATURATED | 267 pages, remaining competitor head volume is excluded off-niche (S2) | n/a | Marginal page is worth less than the same effort in 1 to 3 above |
| 7 | 6. Estate and letting agents | SKIP | 1 real query (S5); competitor coverage is 100% landlord-side fee questions (S2) | n/a | Wrong buyer, wrong brand, no demand case. B2B accountancy belongs elsewhere in the estate |
| - | 5b. Managing agents / RMC B2B | SKIP | Compliance-driven statutory certification market, not a search market (S7) | n/a | Different business model, audit-adjacent capability we do not claim |

---

## LIMITATIONS

1. **The competitor harvest is capped.** The 08-18 pull holds exactly 1,000 rows per
   domain across 7 domains. Any segment whose keywords sit below a domain's top 1,000 by
   the pull's own ordering is under-counted. This bites hardest on segments 4 and 7,
   where the true competitor footprint may be larger than the 5 and 8 keywords observed.
   Treat "nobody competes here" as "nobody competes here in the visible top 1,000".
2. **No live SERP.** Serper is out of credits. Every competitor position in this report
   is a stored harvest value as at its pull date (08-18 to 08-21), never a live check.
   No claim about who ranks where today is made or implied.
3. **Free Bing volumes are directional only.** `GetKeywordStats` returns Bing's own
   weekly impression counts, not market search volume. They are useful for comparing
   seeds against each other on identical method (which is how they are used above) and
   useless as absolute demand. Several seeds returned zero weeks of data, which means
   Bing recorded no impression history, not that demand is zero.
4. **`GetRelatedKeywords` is close to unusable on niche tax seeds.** "farm accounts"
   returned Wiltshire Farm Foods and Clarkson's Farm; "block management" returned Block
   Blast and bundle branch block; "estate agent accounting" returned Waterstones. Only
   two related-keyword results in the whole run were substantive
   (`business property relief` 533 and `2.5 million` 21, both off the APR seed). Every
   other related-keyword output was discarded.
5. **`GetQueryStats` is top-N, not site totals.** S6 covers 1,300 queries; the tail is
   truncated. Site totals require `GetRankAndTrafficStats` (per the known Bing top-N trap).
6. **Zero rows is a question, not a finding.** The FHL calculator page showing no Bing
   queries in the 08-21 artifact most likely reflects page immaturity rather than failure.
   Same caution applies to the zero rural Bing rows: we have almost no rural content
   deployed, so the absence measures our corpus, not the market.
7. **Segment counts overlap.** A post about incorporating an HMO counts in both segment 1
   and segment 2. Counts are coverage indicators, not a partition of the 763.
8. **No new paid data was bought.** See the recommendation immediately below.

### Recommendation, flagged before any spend

Segments 4 and 7 are the two verdicts most exposed to the capped-harvest limitation, and
both are ranked as build candidates. **One targeted DataForSEO pull would firm them up
before any content spend**, specifically: `ranked_keywords` for `oldmillgroup.co.uk` /
`om.uk`, `saffery.com` and two specialist developer-tax firms, plus `keyword_ideas` on
the seed sets "agricultural property relief", "farm inheritance tax", "property developer
tax" and "land remediation relief". That is roughly 6 endpoint calls. **Not run. Not
authorised. Flagged here as a recommendation only**, per the brief's no-new-spend
instruction.

---

## DECISIONS FOR OWNER

1. **Airbnb / holiday lets:** approve an extend-existing batch on segment 3, including
   promoting the already-deferred `fhl-str` calculator off the candidate list? (Ranked #1,
   strongest evidence, ground truth already locked.)
2. **Developers:** approve a `/services/property-developer` page plus a developer hub
   binding the existing 27 posts? (Cheapest structural win; a commercial query already
   reaches us at position 11.)
3. **Rural / agricultural:** approve a bounded APR/BPR-cap mini-cluster on Property,
   scoped to the £2.5m combined allowance and mixed-estate allocation, and explicitly
   excluding farm accountancy (herd basis, averaging, BPS/SFI, agricultural tenancy law)?
4. **Or is farming a separate site?** If the full farming vertical is wanted rather than
   the bounded cluster, that is a new-site decision on the construction-cis precedent and
   needs its own ground-truth corpus before any content. Which way?
5. **Leasehold deploy:** the 8 leasehold posts, the `/leasehold` pillar and the
   lease-extension calculator are built and undeployed, against a query family already at
   p14 to p16. Ship them in the next deploy window? (Deploy is yours to trigger.)
6. **Paid data:** authorise the single targeted DataForSEO pull described above to
   de-risk decisions 2 and 3, or proceed on the free evidence as it stands?

---

*Prepared 2026-08-21. No site content changed, nothing committed, no deploy or indexing
action taken. Scratch scripts used for the pulls were written to the session scratchpad
and removed.*
