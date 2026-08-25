# Fresh verified facts — Property audit 2026-08-05

All re-pulled today. Sources: GSC API (sc-domain:propertytaxpartners.co.uk), Bing Webmaster API, Supabase (project dhlxwmvmkrfnmcgjbntk), repo grep, web benchmark search. Raw JSON in this directory.

## GSC (Google)
- Monthly totals CONFIRMED exact: Apr 11,521 impr/11 clicks; May 26,747/74; Jun 55,335/318; Jul 77,466/811; Aug-to-date 5,328/40. Still rising.
- 90d date-dimension total: 163,939 impressions. Query dimension captures only 29,225 (17.8%) — sampling ratio measured.
- Buckets CONFIRMED exact: commercial 326q/4,856 impr/5 clicks; form/HMRC 388/5,336/10; informational 3,049/19,033/50.
- "landlord tax" exact query, direct filtered pull: 0 impressions Google (claim survives). CONTAINS variants: 46 queries, 897 impr, 0 clicks.
- Head-term serving: bare "property accountant" (278 impr) spread across 11 different pages; city variants converge on 1-2 pages each. Cannibalisation on the head term is real and measured, not just asserted.
- Page coverage CORRECTED: 870 pages ≥1 impr / 252 ≥100 / 28 ≥1,000 (claimed 665/118/16 — stale, site grew).
- /locations/leeds www 805 impr pos 24.1 + non-www 140 pos 24.7 CONFIRMED (dual-host split real).

## Bing
- Site totals CONFIRMED exact: 139,458 impr / 3,497 clicks / 2.51% CTR (2026-05-17..08-03). The 4,808 monthly-sum gap = omitted Aug 1-3 partial month. May row is partial (15/31 days).
- "Avg impression position 4-6" UNVERIFIABLE — GetRankAndTrafficStats returns no position field. Claim has no source.
- GetPageStats sums to 89,116 impr vs 139,458 site total = 36.1% shortfall. "Tracks closely" is wrong for impressions (CTR does track: 2.58% vs 2.51%).
- "landlord tax" on Bing: 1,064 impressions / 121 clicks (11.4% CTR). Demand real; the zero is Google-only.
- Head terms on Bing: property/landlord accountant queries = 45 impr / 0 clicks (Bing barely serves us commercial either).
- Bing veto dataset: ZERO city/commercial pages have any Bing footprint (0 of 191 pages in bing_query_data match city names or /locations/). City consolidation carries no measurable Bing risk.

## Benchmarks (web-sourced, see ctr_benchmark_notes.md)
- Google pos 6 ≈ 4.35% CTR (supported). Site's own measured curve: pos 1 = 0.46% (query_ledgers/property_ledger.json).
- Bing "6-9% normal" UNSUPPORTED: historical Bing CTR ≈ half Google's (pos 1 ≈ 9.7%, pos 2 ≈ 5.5%); at pos 4-6 normal ≈ 2-4%. Site's 2.51% may be near-normal for Bing. The "both engines weak" premise loses its Bing leg; Google leg stands alone.

## Supabase leads/sessions
- Lead entry buckets CONFIRMED exact (blog 52 / homepage 32 / other 14 / services 1, all-time), but inner join hid 17 unattributed leads (true total 116, 14.7% dropped). Top post transfer-property-into-limited-company = 8 leads confirmed.
- July sessions: total rows 15,039; is_bot=false 6,161; engaged>10s 3,679. "5,188 human" reproduces from NO filter combination — stale/wrong. Bot rows 8,878 not 7,451.
- July channel table confirmed; lead total 62 (published 61 missed www.google.co.uk = 1 lead).
- AI referrers: ChatGPT July 43 sessions/4 leads = 9.3%, Wilson CI 3.7%-21.6% vs site-wide 1.01% — directionally higher, small n. June was 74 sessions/4 leads (5.4%) — original doc mis-attributed 43 to June.
- Leads by month: Apr 2, May 8, Jun 34, Jul 62, Aug-partial 10. July others-combined 21 confirmed.

## Repo
- 746 blog posts (claimed ~800). City denominator DEFINITIVE: 19 city blog posts + 5 /locations routes (claims of 40/16/~11/55 all wrong or conflations).
- "property accountant" in 50 blog metaTitles (claimed 51); "landlord tax" 33 confirmed.
- Embed calculator pages properly noindexed (gallery /embed is not).
- Canonical host = www (config-driven).
- Careers cluster exists as claimed (3 core + 2 related posts).

## Autocomplete (new dataset)
- 1,812 unique UK property-tax terms. Strong untargeted commercial clusters: "near me" (across every seed), fees/cost, "best X" comparisons, "how much landlord tax do i pay" question forms.
