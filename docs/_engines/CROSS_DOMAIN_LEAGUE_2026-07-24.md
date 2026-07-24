# Cross-domain opportunity league — batch 1 verdict
Date: 2026-07-24. Instrument: niche screener v2 (backtested same day, 9/9 prereg incl. 2 post-fix; `NICHE_SCREENER_V2_BACKTEST.md`). All SERPs fully classified (zero unknown-rate at scoring). Runs in `cache/batch_runs.json` + `cache/backtest_runs.json`.

## League (all-time, /100; calibration rails in bold)

| # | Niche | Score | Range | DIY universe (corpus proxy) | Thinness | Notes |
|---|---|---|---|---|---|---|
| 1 | ext-boiler (control) | 65.4 | [65.4, 70.4] | 164 | — | known success control, comparison-war on conversion side; not a build candidate |
| 2 | **wills-probate** | 60.6 | [60.6, 65.6] | 409 | 0.84 | biggest corpus, delegation+DIY coexist, buyer market auto-verified, IHT Apr-2027 shock |
| 3 | **divorce-finances** | 59.9 | [59.9, 64.9] | 258 | 0.67 | calc demand maxed; more specialists in SERPs (Stowe etc) than wills |
| 4 | ext-equity-release (control) | 59.6 | [59.6, 64.6] | 503 | — | IAR-gated; screen confirmed known success |
| 5 | leasehold-rights | 57.1 | [57.1, 62.1] | 118 | 0.64 | reform churn maxed; post-classification thinness fell 0.76→0.64 (real specialists exist); smaller corpus |
| 6 | older-driver-renewal | 56.3 | [56.3, 61.3] | 101 | **0.96** | near-empty SERPs (best winnability measured all day) but low calculator demand + narrow corpus, buyer = opticians/assessors (weak per-lead culture) |
| 7 | solar-installation | 56.2 | [56.2, 61.2] | 101 | 0.87 | thin SERPs, £250/lead signals; quote-comparison giants own conversion layer |
| 8 | **buy-to-let (anchor)** | 56.1 | [56.1, 61.1] | 126 | — | the pattern definition; sustains 697 posts from a 126 sampled-DIY universe |

Every scored niche carries the same -10 AI Overview penalty (85-100% AIO coverage on DIY SERPs is now universal) and the same honest NULL on new_domain_viability.

## Gate failures this batch (with honesty notes)

| Niche | Failed | vw-DIY | Note |
|---|---|---|---|
| dental-implants | G2 | 2,240 | NEAR MISS (75% of threshold) — re-screen candidate with broader pain seeds |
| employment-law-employers | G2 | 1,630 | employers may search reactively in bursts; seeds possibly too procedural; re-screen candidate |
| ev-road-charging | G2+G3 | 1,070 | too early — demand arrives nearer Apr 2028; RE-SCREEN 2027 |
| sponsor-licence | G2 | 980 | niche B2B; volume genuinely small |
| insolvency-rescue | G2+G3+G4 | 800 | SUSPECT SEEDS (bounce-back-loan era queries dated); one re-screen with refreshed seeds before accepting |
| landlord-epc-retrofit | G2+G3+G4 | 170 | demand not yet materialised (2030 deadline too far); RE-SCREEN when MEES consultation concludes |

## Recommendation (proposed, owner decision)

1. **Wills/probate/estate planning = build candidate #1.** Wins on the composite: 2nd score, biggest corpus proxy (409 distinct DIY queries — property's 126 sustained 697 posts), only niche where delegation and DIY demand coexist property-style, auto-verified paid lead market (30+ seller domains, ~£25 baseline with premium tiers), and a dated regulatory shock (pensions into IHT, Apr 2027) that two independent generators surfaced.
2. **Divorce-finances = candidate #2 / fast-follow.** Higher raw demand than wills, maxed calculator demand; harder specialist field.
3. **Leasehold = watch + pair.** Strong churn story, pairs with the property estate audience; corpus proxy smaller, specialists denser than first look.
4. Boiler/solar/older-driver: pattern-positive but conversion-layer or buyer-culture caveats; hold.
5. Re-screen queue: dental-implants + employment-law (seed sensitivity), insolvency (dated seeds), EV road charging (2027), EPC retrofit (post-consultation).

Next instrument work (cheap): tighten G1 evidence regex (dog/fishing-lead homonyms), wire new_domain_viability (bulk_ranks/whois), corpus-potential deep pull (uncapped keyword_ideas) for the top 3.
