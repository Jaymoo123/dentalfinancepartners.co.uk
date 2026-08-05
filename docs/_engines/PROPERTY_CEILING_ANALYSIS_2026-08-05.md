# Property ceiling analysis, 2026-08-05

Question asked: is Property near its organic ceiling (in which case expansion to a new
market/niche is the better use of effort), or does it still have headroom (in which case
deepening the winner beats starting something new)?

Answer: **nowhere near ceiling, but the headroom is not where the content programme has
been aiming.** Property has never won a commercial query. Its 62 leads/month come from
Bing, direct, and AI assistants, not from Google organic.

## Data pulled (all fresh, 2026-08-05)

- GSC API direct (`sc-domain:propertytaxpartners.co.uk`), 28d + 90d + 365d.
- Supabase `web_sessions` / `leads` (estate project `dhlxwmvmkrfnmcgjbntk`).

**Caveat carried through:** GSC query-dimension rows sum to ~29k impressions over 90d
against ~140k on the empty-dimension aggregate. That is the known query-sum undercount
(see memory `gsc_query_sum_undercount`). Query-level figures below are therefore treated
as **sample proportions**, never as totals. The direction of every finding survives the
sampling; the absolute counts do not.

## 1. Demand is still compounding (not a ceiling)

| Month | Clicks | Impressions | CTR |
|---|---:|---:|---:|
| 2026-03 | 0 | 230 | 0.00% |
| 2026-04 | 11 | 11,521 | 0.10% |
| 2026-05 | 74 | 26,747 | 0.28% |
| 2026-06 | 318 | 55,335 | 0.57% |
| 2026-07 | 811 | 77,466 | 1.05% |

Impressions still climbing steeply. Page coverage: 665 pages earn >=1 impression, but only
118 earn >=100 and 16 earn >=1,000. Large inactive tail. This is not a saturated asset.

## 2. But CTR is the binding constraint, not rankings

90d query sample, bucketed by intent:

| Bucket | Queries | Impressions | Clicks | CTR | Avg pos |
|---|---:|---:|---:|---:|---:|
| informational | 3,049 | 19,033 | 50 | 0.26% | 29.8 |
| form/HMRC lookup | 388 | 5,336 | 10 | 0.19% | 12.1 |
| **commercial** | **326** | **4,856** | **5** | **0.10%** | **22.5** |

Expected CTR at position 6 is roughly 4-5%. Property runs an order of magnitude below that
across every bucket. The site's own measured CTR curve (in `query_ledgers/property_ledger.json`)
puts position 1 at 0.46%. Impressions are being earned and not converted to clicks.

Two distinct causes, and they need separating before any fix:
- **Unwinnable impressions.** Queries like `sa105` (275 imp, pos 7.8, 0 clicks), `nrl6`,
  `is230tnrlh1e` are people looking for the HMRC form. They will click gov.uk. Ranking here
  is vanity; no meta rewrite recovers it.
- **Genuinely lost clicks.** Commercial and local terms below, where the searcher wants a
  provider and Property is present but not chosen.

## 3. The real gap: Property has never won a commercial query

Commercial queries off page 1: 4,733 impressions, **0 clicks**. Local terms across 90 days:
101 queries, 2,465 impressions, **1 click**.

| Query | Impr | Pos | Clicks |
|---|---:|---:|---:|
| property accountant | 278 | 25.2 | 0 |
| landlord tax advice leeds | 188 | 12.7 | 0 |
| property tax accountant in london | 140 | 31.2 | 0 |
| rental accountant leeds | 137 | 12.6 | 0 |
| rental accountant headingley | 119 | 12.2 | 0 |
| property accountancy leeds | 118 | 17.3 | 0 |
| accountant for letting agents leicester | 91 | 4.9 | 0 |
| landlord tax accountant nottingham | 87 | 10.4 | 0 |
| property accountant manchester | 87 | 9.2 | 0 |
| landlord tax return accountant nottingham | 75 | 9.2 | 0 |

These are the highest-intent queries the site sees. Several already sit at position 9-13,
which is one push from page 1. None convert today. This validates the "build local-first"
line already in the Property growth plan; it has not been executed.

## 4. Channel truth: Google is not the engine

July 2026, human sessions (`is_bot=false`, `is_embed=false`):

> **Correction 2026-08-05:** an earlier version of this document cited Bing at
> 3,120 impressions / 19.7% CTR. That came from `GetQueryStats`, a truncated top-N
> query slice. Bing site totals (`GetRankAndTrafficStats`) for July are **67,141
> impressions / 1,692 clicks / 2.52% CTR**. Bing still beats Google (77,466 / 811 /
> 1.05%) on clicks and leads, but by ~2.4x on CTR, not an order of magnitude. See
> `PROPERTY_COMMERCIAL_CAPTURE_SCOPE_2026-08-05.md` §1a for the corrected reading:
> CTR is weak on BOTH engines, so query mix, not AI Overviews alone, is the cause.

| Source | Sessions | Leads (Jul) |
|---|---:|---:|
| www.bing.com | 1,907 | 16 |
| www.google.com | 1,640 | 11 |
| (direct) | 1,596 | 16 |
| duckduckgo.com | 422 | 3 |
| uk.search.yahoo.com | 208 | 2 |
| own domain (internal) | 131 | 8 |
| chatgpt.com | 43 | 4 |
| copilot.microsoft.com | 46 | 1 |

Three things follow:
1. **Bing out-delivers Google on both sessions and leads.** Consistent with the standing
   estate observation that legacy pages sit page-1 Bing / page 4-8 Google. Bing is the
   best-performing channel in the estate and receives the least attention.
2. **AI assistants already convert.** ChatGPT produced 4 leads in June and 4 in July;
   Copilot 1-2/month; Perplexity, Claude, Gemini all present in sessions. GEO is working
   at a scale that justifies deliberate investment rather than incidental benefit.
3. **Google contributes ~11 leads on ~77k impressions.** The channel the content programme
   optimises for is the weakest converter.

Engagement is healthy and rules out a quality problem: 3,679 of 6,161 July sessions
engaged >10s, 2,414 scrolled past 25%.

## 5. Verdict

Deepen Property before opening a new market. The headroom is large, cheap, and concentrated
in work that has not been done, rather than more of the work that has:

1. **Local/commercial capture.** ~4,700 commercial impressions at 0 clicks, several already
   at position 9-13. Highest intent traffic on the site, currently worth nothing.
2. **CTR recovery on commercial terms.** Separate the unwinnable form-code impressions from
   genuinely lost clicks first, then treat only the latter. Do not chase site-wide CTR.
3. **Bing as a first-class channel.** Best converter, least invested.
4. **GEO/AI surfaces.** Already producing leads with no deliberate programme behind it.

What this does **not** support: more informational blog volume. Informational queries run at
0.26% CTR and average position 29.8. That is the AI Overview squeeze showing up in first-party
data, and it applies estate-wide, not just to Property.

## 6. Consequence for the expansion question

The estate-wide numbers make the comparison stark. July leads: Property 62, everything else
combined 21 (and those have no paying buyer). Property is the business; the other seven sites
are not yet.

Opening a new geography means starting with no content, no authority, and no buyer, in order
to chase what Property already has and has not finished harvesting. Revisit geography once the
four items above are executed and Property's real ceiling is visible.

---

## AUDIT NOTE (2026-08-05, Fable session)

This document was audited against same-day re-pulls. Verdict: directionally right, materially wrong in specific numbers and two conclusions. Before acting on any figure or conclusion here, read docs/_engines/PROPERTY_ANALYSIS_AUDIT_2026-08-05.md (verdict ledger, 13 decision-changing corrections, corrected fact base) and docs/_engines/PROPERTY_ARCHITECTURE_RECOMMENDATIONS_2026-08-05.md (amended plan). Headline corrections: query-mix CTR argument refuted; Phase 4 reference-content ban refuted; city 301 direction reversed (consolidate within city, never into national pages); city denominator is 19 posts + 5 routes; landlord tax zero is Google-exact only (Bing serves it 1,064 impr / 121 clicks); local pack IS present on property accountant, so no-GBP caps 6 clusters; Bing 6-9% CTR norm unsupported.
