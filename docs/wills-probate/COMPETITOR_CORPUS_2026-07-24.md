# Competitor Corpus Mining — UK Wills/Probate — 2026-07-24

Read-only mining of SPECIALIST-labelled competitor domains from
`optimisation_engine/niche_screener/out/wills_probate_research_export/classify.json`,
against our 119-row `docs/wills-probate/TOPIC_POOL_2026-07-24.json`. No topic-pool files modified.

## 1. Domains fetched

15 domains attempted (SPECIALIST/tier2-3 from classify.json + farewill + co-op per brief), capped ~15, most-relevant first.

| Domain | Status | Method | Approx URLs harvested |
|---|---|---|---|
| the-probate-network.co.uk | OK | post-sitemap.xml | 147 |
| probatelondon.co.uk | OK | sitemap.xml (flat) | 159 |
| farewill.com | OK | sitemap.xml (flat, summarised) | ~600 total site, ~100 distinct guide titles captured |
| makeawillonline.co.uk | OK | post-sitemap.xml + resource-sitemap.xml | 160 |
| probatebureau.com | OK | sitemap.xml (flat) | 127 |
| kctrust.co.uk (King's Court Trust) | OK | sitemap.xml (flat) | 42 |
| trustestate.co.uk | OK | sitemap.xml (flat) | 43 |
| aprilking.co.uk | OK | post-sitemap.xml | 39 |
| osborneslaw.com | OK | post-sitemap.xml + post-sitemap2.xml | ~24 relevant (site sitemap larger, non-wills content filtered) |
| onlineprobate.co.uk | OK | guides-sitemap.xml + post-sitemap.xml | 27 |
| nationalwillregister.co.uk | OK | sitemap_index.xml + guides-sitemap.xml | 12 |
| townandcountrylaw.legal | OK | sitemap_index.xml + post-sitemap.xml | ~20 (partial extraction) |
| mfgsolicitors.com | OK (fallback) | /sitemap.xml 404'd; used /blog/ index page instead | 13 |
| ibissandco.com | OK (mostly off-topic) | post-sitemap.xml | 146 total, only ~10 wills/IHT-relevant (site is a general accountancy blog, not a probate specialist despite classify.json label) |
| co-oplegalservices.co.uk | FAILED | /sitemap.xml returned a bot-detection/JS-challenge page, not sitemap content | 0 |

**Domains OK: 14/15. Failed: 1 (co-oplegalservices.co.uk — bot-gated).**
**Total competitor URLs/titles harvested: ~1,340** (after excluding ibissandco's ~136 off-topic accountancy posts and farewill's funeral/grief/local-city pages that carry no tax/legal topic content).

## 2. New topic candidates (deduped against our 119 rows)

Existing pool already deeply covers: probate need/cost/timeline (all "do I need probate" variants), IHT thresholds/rates/RNRB/nil-rate band, executor duties/fees, making-a-will basics, valuations, forms (PA1P/PA1A/IHT205/IHT400), contest-a-will (general), intestacy (general/unmarried/Scotland), LPA vs deputyship, deed of variation, 7-year rule, taper relief, BPR/APR basics, normal-expenditure exemption, wedding-gift exemption, life-insurance-in-trust, 10-year trust charge, insolvent estates, joint accounts, missing will, funeral cost payment, IHT direct payment scheme, caveats overview, probate+conveyancing, mirror/mutual wills (basic), guardianship clauses, will validity/witnessing, storing a will, updating will on marriage/divorce, 2027 pension IHT (extensive), bereavement support payment.

Topics below are **not** meaningfully covered by any existing row (checked by meaning, not string match).

| # | Topic | Example competitor URLs | Domains covering | Suggested category | Suggested wave | UK-relevant |
|---|---|---|---|---|---|---|
| 1 | Mental capacity, dementia and will validity (challenging a will for lack of capacity) | mfgsolicitors "does-dementia-make-a-will-invalid"; the-probate-network "dementia-wills", "dementia-cognitive-impairment"; makeawillonline "mental-capacity", "old-age-and-capacity-how-to-protect-your-will-from-challenge" | 3 (mfg, probate-network, makeawillonline) | Making a Will | 2 | Yes |
| 2 | Digital assets and digital legacy after death | probatebureau "digital-assets-will"; trustestate n/a (implicit); the-probate-network "digital-assets-after-death"; makeawillonline "social-media"; onlineprobate "digital-legacy-and-estate-administration" | 3 | Probate Process | 3 | Yes |
| 3 | Selling a house during/after probate — process, timeline, auction routes | the-probate-network "how-to-manage-a-probate-house-sale", "probate-property-auction", "how-long-does-it-take-to-sell-a-house-in-probate", "your-options-for-selling-probate-property"; trustestate "can-you-sell-a-house-before-getting-probate" | 2 | Probate Process | 2 (distinct from the existing "do I need probate to sell" keyword-cluster — this is the *process* guide) | Yes |
| 4 | Missing/unknown beneficiaries and probate genealogy (heir tracing, Benjamin Order) | the-probate-network "missing-beneficiaries-time-limits-insurance-and-research", "the-benjamin-order", "probate-research-genealogy"; nationalwillregister "search-for-a-will"; probatebureau case studies "heir tracing" | 3 | Probate Process | 3 | Yes |
| 5 | Property protection trust / protective property trust in a will | townandcountrylaw "protective-property-trust-uk", "property-trusts-in-the-uk-a-2025-guide"; the-probate-network "what-is-a-property-protection-trust" | 2 | Inheritance Tax | 3 | Yes |
| 6 | Capital gains tax on inherited/probate property | the-probate-network "understanding-capital-gains-tax-on-inherited-property-in-the-uk"; ibissandco (general CGT content, tangential) | 2 | Inheritance Tax | 2 (high search intent, missing gap) | Yes |
| 7 | Section 27 Notice (creditor notice) in probate | the-probate-network "the-section-27-notice-and-uk-probate"; nationalwillregister "section-27-notice-s27" | 2 | Probate Process | 3 | Yes |
| 8 | Inheritance (Provision for Family and Dependants) Act 1975 claims / sideways disinheritance | the-probate-network "making-a-claim-under-the-inheritance-provision-for-family-and-dependants-act-1975"; mfgsolicitors "inheritance-act-claims-and-letters-of-wishes"; makeawillonline "defending-a-contested-will", "sideways-disinheritance" | 3 | Probate Process | 2 (distinct legal claim, adjacent to but not = "contest a will") | Yes |
| 9 | Blended families, stepchildren and unmarried partners' inheritance rights | townandcountrylaw "do-stepchildren-inherit-without-a-will", "unmarried-partner-inheritance-uk"; makeawillonline "blended-families"; the-probate-network "siblings-rights-after-a-parents-death" | 3 | Making a Will | 2 | Yes |
| 10 | International probate / overseas assets / multiple wills for foreign property | probatebureau "assets-abroad-why-you-may-need-more-than-one-will"; probatelondon "international-probate"; the-probate-network "international-probate-solicitors-uk"; nationalwillregister "a-guide-to-probate-in-spain", "spanish-will-guide" | 4 | Probate Process | 3 | Yes |
| 11 | Trust registration requirements (Trust Registration Service) | osborneslaw "do-you-need-to-register-your-trust" | 1 | Inheritance Tax | 4 (low coverage, but real compliance gap) | Yes |
| 12 | Remote/video witnessing of wills (post-COVID rules) | probatebureau "virtual-will-witnessing-are-we-at-risk"; makeawillonline "video-conference-execution"; osborneslaw "making-a-will-by-video-link" | 3 | Making a Will | 3 | Yes |
| 13 | Unclaimed estates and Bona Vacantia (Treasury Solicitor) | the-probate-network "the-unclaimed-estates-list"; probatebureau "treasury-collecting-millions-in-unclaimed-assets-when-no-will-has-been-made" | 2 | Probate Process | 4 | Yes |
| 14 | Probate/inheritance advance loans — how they work, rates, risks | the-probate-network cluster: "probate-loans-and-probate-property", "inheritance-advance-loan", "executor-loans-explained", "the-inheritance-tax-loan", "probate-loan-rates", "iht-loans-the-questions-to-ask", "can-i-get-a-loan-on-inherited-property" | 1 (deep single-domain cluster, 7+ pages) | Probate Process | 4 (low cross-domain coverage but clear demand cluster; flag as single-domain) | Yes |
| 15 | Executor/property insurance obligations during probate (unoccupied house cover) | the-probate-network "executor-house-insurance", "occupied-house-insurance-during-probate", "unoccupied-property-insurance-for-executors", "probate-home-insurance-coverage-options" | 1 (single-domain, 4-page cluster) | Executors | 4 | Yes |
| 16 | Will fraud, forgery and undue influence claims | osborneslaw "contesting-will-undue-influence", "evidence-needed-when-contesting-a-will"; the-probate-network case studies "will-fraud-forgery" | 2 | Probate Process | 3 | Yes |
| 17 | Success rate / statistics on contesting a will in the UK | the-probate-network "success-rate-of-contesting-a-will-uk-key-facts" | 1 | Probate Process | 4 | Yes |
| 18 | What happens to a business when the owner dies (succession) | makeawillonline "when-a-business-owner-dies"; mfgsolicitors "succession-planning-for-business-and-agricultural-assets" | 2 | Inheritance Tax | 3 | Yes |
| 19 | Tell Us Once service explained | aprilking "tell-us-once"; trustestate "tell-us-once-how-it-works-and-what-happens-next" | 2 | Probate Process | 4 | Yes |
| 20 | Registering a death — step-by-step | trustestate "how-to-register-a-death"; the-probate-network "how-to-register-a-death-in-the-uk" | 2 | Probate Process | 4 (adjacent to existing "what to do when someone dies" but registrar-specific process is distinct) | Yes |
| 21 | Refusing/disclaiming an inheritance (as distinct from deed of variation) | makeawillonline "refusing-a-gift" | 1 | Inheritance Tax | 4 | Yes |
| 22 | Stamp duty implications during probate/property transfer | makeawillonline "stamp-duty-probate" | 1 | Inheritance Tax | 4 | Yes |
| 23 | Declaration of trust for jointly-held/rental property | osborneslaw "declaration-of-trust"; ibissandco "what-is-a-declaration-of-trust-uk-rental-income" | 2 | Inheritance Tax | 4 | Yes |
| 24 | Proprietary/promissory estoppel in contentious probate disputes | the-probate-network "proprietary-estoppel", "understanding-promissory-estoppel-in-relation-to-contentious-probate" | 1 | Probate Process | 4 (niche/legal-heavy, low search volume expected) | Yes |
| 25 | Pets and inheritance — providing for pets in a will | makeawillonline "pets", "when-a-pet-owner-dies" | 1 | Making a Will | 4 | Yes |
| 26 | Court of Protection guide (for incapacity, distinct from LPA) | nationalwillregister "court-of-protection-guide" | 1 | Power of Attorney | 4 | Yes |
| 27 | Right to organise/arrange a funeral (who has priority when family disputes) | the-probate-network "right-to-organise-a-funeral" | 1 | Probate Process | 4 | Yes |
| 28 | Beneficiary living in an inherited house — rights and rent | the-probate-network "beneficiary-living-in-an-inherited-house" | 1 | Probate Process | 4 | Yes |
| 29 | Deathbed marriages and how they affect an estate | the-probate-network "deathbed-marriages-and-covid-19" | 1 | Intestacy | 4 (niche) | Yes |

## 3. Summary

- **Domains fetched OK:** 14 of 15 (co-oplegalservices.co.uk failed — bot/JS challenge on sitemap request).
- **Total competitor URLs/titles harvested:** ~1,340 across the 14 reachable domains (excluding off-topic accountancy content on ibissandco.com and non-legal funeral/grief/local-city pages on farewill.com).
- **New deduped topic candidates:** 29 (table above), ranked by domain-coverage count.

### Top by coverage (domains-covering count)

1. International probate / overseas assets (4 domains)
2. Mental capacity, dementia and will validity (3 domains)
3. Digital assets and digital legacy (3 domains)
4. Missing/unknown beneficiaries and probate genealogy (3 domains)
5. Section 27 Notice — tied at 2, see below with #8
6. Inheritance Act 1975 claims / sideways disinheritance (3 domains)
7. Blended families, stepchildren, unmarried partners' rights (3 domains)
8. Remote/video witnessing of wills (3 domains)
9. Selling a house during/after probate — process guide (2 domains)
10. Capital gains tax on inherited property (2 domains)
11. Section 27 Notice (2 domains)
12. Property protection trust in a will (2 domains)
13. Unclaimed estates and Bona Vacantia (2 domains)
14. Will fraud, forgery and undue influence (2 domains)
15. Business owner succession on death (2 domains)
16. Tell Us Once service (2 domains)
17. Registering a death — step-by-step (2 domains)
18. Declaration of trust for jointly-held property (2 domains)
19. Trust registration requirements (TRS) — 1 domain, flagged high-value gap
20. Probate/inheritance advance loans (1 domain, deep 7-page cluster)

Single-domain items (#14, #15, #21–29) are flagged low-coverage in the table but retained per the "aim exhaustive" instruction — several (trust registration, CGT on inherited property, business succession) look like genuine content gaps worth prioritising despite thin competitor coverage, because they map to real HMRC/legal processes rather than one-off blog filler.

No changes were made to `docs/wills-probate/TOPIC_POOL_2026-07-24.json` or any other topic-pool file.
