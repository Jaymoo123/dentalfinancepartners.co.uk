# Medical (medicalaccounts.co.uk) opportunity analysis, 2026-07-23

Data: GSC + Bing latest date 2026-07-20, 90d window (2026-04-21+). Inventory 79 posts. FLAT routing /blog/slug.

## VERDICT: indexation, not content supply, is the binding constraint
- Google sees only **15 distinct pages** with any impressions (of ~117 live pages, 79 blog posts). Homepage + ~13 blog posts. Everything else invisible on Google.
- Bing sees **45 distinct pages** in the same window, most at position 2-10 (page 1). Same content, so quality/relevance is proven; Google simply hasn't indexed the corpus (~11/117 legacy known problem persists).
- Head terms ("gp accountants" 1,317 imp pos 53.6, "medical accountants uk" 191 imp pos 64) are served by the homepage at deep positions: an authority/crawl-budget problem, not a missing-content problem.
- Action order: confirm owner Request Indexing done (memory: pending), sitemap/internal-link audit for the flat /blog/* routes, then content. New posts will mostly join the unindexed pile.

## (a) High-impression uncaptured queries (GSC, 90d)
| Query | Imp | Pos | Note |
|---|---|---|---|
| gp accountants | 1,317 | 53.6 | homepage serving; authority gap not content gap |
| medical accountants uk | 191 | 64.4 | same |
| gp practice accountants | 162 | 80.1 | same |
| specialist medical accountants | 83 | 75.6 | same |
| medical accountants birmingham | 30 | 42.7 | gp-accountant-birmingham exists but "medical accountants" phrasing; tweak title, don't add page |
| gp partnership goodwill valuation | 19 | 16.4 | striking distance, deepen goodwill post |
| buy-in cost cluster (buying into a gp, cost of..., how much...) | ~30 | 16-25 | striking distance, deepen buy-in posts |

## (b) Brand-breadth gaps (vs 79-post inventory)
Covered well: GP partners, buy-in, NHS pension AA/taper/McCloud/Scheme Pays, locums (tax/IR35/umbrella/Form A-B), PCNs, incorporation, city pages. Genuine gaps:
1. **Hospital consultant cluster is thin.** Only company-side posts (s455, salary vs dividend, private practice). Missing: "NHS consultant tax guide", "consultant CEA/clinical excellence awards tax", "additional PAs / WLI extra sessions tax", "consultant private practice getting started (indemnity, billing, LLP vs Ltd vs sole trade)". Bing shows "nhs consultants pension scheme" demand.
2. **Salaried GP standalone guide** (query "salaried gp vs gp partner" pos 1.0 already; but no dedicated salaried-GP expenses/pension page; Bing: salaried GP mileage query).
3. **GP registrar / trainee to first job finances** (exam fees, GMC, relocation, tax code) — top-of-funnel, ties to Bing "gmc fees 2026" demand already landing on the deductions post.
4. **NHS pension contribution tiers 2026/27 + AMAP 55p update angles** (FA 2026 ground truth: 55p mileage from 6 Apr 2026, dividend 10.75%/35.75% — salary-vs-dividend post should be checked for 2026/27 rates).
5. **Practice manager / GP practice payroll+ARRS employer NIC 15%/£5k angle** partially covered; a "GP practice employer NIC and ARRS 2026/27" refresh angle exists.
Excluded per brief: dentists, pharmacists (sibling sites).

## (c) Cannibalisation
- Service-page overlap: gp-accountant, gp-accountant-services-complete-guide, accountant-accounting-services, gp-accounting-guide, gp-tax-advice all chase "gp accountant(s)" variants. With only the homepage surfacing (pos 50+), this is latent, not active, cannibalisation; do NOT collapse (locked rule), but differentiate intents when rewritten.
- Pension trio (annual-allowance guide, tapered-AA calculator, tax-charges-minimize) overlap on "nhs pension annual allowance"; Bing splits them fine; watch on Google once indexed.
- No active GSC cannibalisation observable (too few pages indexed to collide).

## (d) Deepen, not new (Bing page 1 / Google absent or page 2+)
Strongest Bing performers to deepen and push for Google indexing first:
- nhs-pension-for-locums-form-a-form-b (dominates ~12 Form A/B queries, pos 3-8; Google: invisible)
- gp-tax-deductions-complete-list-2026 (GMC fees, CPD, mileage queries; one pos-1 with 8 clicks)
- gp-pension-contributions-tax-relief, nhs-pension-annual-allowance-complete-guide (pos 6-10 Bing)
- gp-partner-vs-salaried-gp-tax-comparison (pos 1-9 Bing; GSC pos 8.1 with 222 imp: best Google blog asset alongside becoming-gp-partner, 787 imp pos 12.2)
- becoming-gp-partner-financial-implications + buying-into-gp-partnership-capital-parity: deepen with goodwill-valuation and buy-in-cost sections to capture the pos 16-25 GSC cluster.
- Legacy flat pages still ranking on Bing (/blog/locum-tax, /blog/medical-expenses, /medical-guides/ir35-for-locums): reconcile with newer equivalents (locum-doctor-tax-complete-guide, medical-professional-expenses) — potential dupe pairs, rewrite-not-collapse.

## Recommended order
1. Indexation fix wave (sitemap, internal linking, Request Indexing confirm) before any new content.
2. Deepen the 6 Bing-proven pages above.
3. Consultant cluster (4 posts) as the one genuine breadth build.
4. 2026/27 rate refresh sweep (AMAP 55p, dividend rates, employer NIC) across money posts.
