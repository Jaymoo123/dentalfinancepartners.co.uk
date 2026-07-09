# Property Behaviour Insights Readout, July 2026

> **SHIP RECORD (signed off 2026-07-09).** The CRO wave driven by this readout is LIVE in prod:
> multi-step mini-forms ON (`NEXT_PUBLIC_MINIFORMS_MULTISTEP=1`), honeypot fix live, subscribe
> block + blog StickyCTA + inert ExitIntentModal removed, assistant nudge capped at 1 ping/session,
> `niche.company` guard shipped. DeepScrollModal + homepage StickyCTA deliberately KEPT after
> time-segmented re-analysis (see §0). Migrations applied: `vw_form_step_funnel`,
> `lead_value_scores`, `deploy_watch`. Watch ARMED from 2026-07-09: day 3/7/14/28 gates email
> PASS/ACTION verdicts via the daily 07:30 `/api/cron/deploy-watch` cron. E2E synthetic lead
> verified (form_id / role_detail / visitor stitch / notify email) then deleted.
> Console lead-analytics page live on estate-console. Commits `c5b2576c`..`8dcf7db6` on
> `property-lead-quality`. Rollback: unset flag + redeploy; `git revert f8674565` for surfaces.
> Subscribe backend CLEANED UP same day (commit `c7cb8913`, deployed): `/api/subscribe` shim,
> `/api/nurture/*` drip routes, SubscribeForm, config/nurture, nurture-provider and f3 tests
> deleted; daily `/api/nurture/send` cron dropped from vercel.json. Justified by DB truth:
> 0 Property subscribers ever, and the drip was double-parked (`SUBSCRIBER_NURTURE_ENABLED`
> never set). Lead-nurture system (config/lead-nurture, `/api/cron/lead-nurture*`) untouched;
> shared `web-shared/nurture` engine kept for other sites. Post-deploy verified: nurture route
> 404, site 200s, `/api/track` 204, multi-step markers still live.
> Deploy gotcha fixed en route: `.vercelignore` patterns must be root-anchored (unanchored
> `supabase/` excluded `Property/web/src/lib/supabase/` and broke the Vercel build).
>
> **Open follow-ups (owner-acknowledged 2026-07-09):** July rage-click anomaly query (50/wk,
> only 3 on calc inputs — new source unknown); bot reclassifier engagement floor; GB Safari
> beacon-loss check; related-articles "next question" rework + inline calc links (post Day-7
> gate); calc result-gate iteration (decision at Day-14 gate ~2026-07-23); AI-referral landing
> treatment (when volume doubles); section-read signal into rewrite engine.

**Scope:** First deep-mine of the first-party behaviour pipeline (live since 2026-06-05).
**Data:** ~8,500 human sessions / ~6,800 visitors / ~200k events / 51 converted visitors, prod Supabase (`web_sessions`, `web_events`, human-only `is_bot=false`).
**Method:** Read-only SQL via Management API. Re-runnable scripts: `scripts/_behaviour_deep_batch1.py` … `_batch4.py`, `scripts/_behaviour_data_survey.py`/`2.py`.
**Status:** Analysis only. No changes made. Feeds any future CRO wave.

---

## 0. Data quality: what's polluted and what survives (added after sensitivity check)

Sensitivity re-run of all headline numbers across three cuts: ALL human-flagged traffic / GB-only / GB + ≥10s engaged (`scripts/_behaviour_deep_batch5.py`).

**Pollution is real.** Of 5,155 property sessions (`is_bot=false`), only 2,834 (55%) have ≥10s engagement. 1,800 are zero-engaged (mostly non-GB; 413 are fully dead ≤3-event sessions). All 39 stitched lead sessions sit in the engaged-10s+ stratum. Note: `human_confirmed=true` does NOT exclude zero-engagement sessions (981 zero-engaged carry the flag), so the dashboard's human filter under-filters; only the GB slicer approximates a clean view.

**What survives the clean cut (GB + engaged):**
- **Calculator leak: fully intact.** 269 of 270 calc-computing sessions are GB-engaged; still only 14 reached a form. This finding is 100% clean-traffic.
- **Near-miss segment: 997 sessions / 901 visitors GB-only** (vs 1,134/1,028 all) — 88% survives.
- **Interruption-surface deadness: survives.** GB-only: subscribe 2,827 sessions shown; personalization 28 clicked / 327 dismissed of 1,675 shown.
- **True baseline CVR is 1.26%** (GB engaged), not 0.76% — the site is better than raw numbers suggest.
- **Single-page behaviour: softens but stands.** GB engaged blog entrants moving to a second page: 5.2% (vs 2.9% raw).
- **AI-referral quality: survives GB-only** (ChatGPT 76 sessions/3 leads ≈ 3.9%; Copilot 1/31). One caveat vs raw data: **Google GB-only jumps to 2.3% CVR (10/432)** — half of Google's raw sessions were non-GB junk masking a strong source.

**Verdict:** analyse GB-only (or GB + 10s floor) going forward; ~13-15% of leads are non-GB so keep non-GB for lead counting, not for rates. The dead-session strata (esp. GB Safari 95 dead sessions — possible sendBeacon/ITP loss rather than bots) are queued for the analytics data-hygiene audit.

## 1. The shape of the site's traffic (context for everything else)

- ~950-1,050 sessions/week, stable. ~7 leads/week. Engagement drifting slightly down since mid-June (avg engaged 114s → 87s), likely traffic-mix, not site change.
- **94% of sessions are single-page.** Of blog entrants, only 2.9% ever view a second page. The site is, behaviourally, a collection of one-page visits, not a journey.
- Blog is 96% of entries (4,808 sessions) and produced 23 of 51 lead sessions, but converts at ~0.5%. Homepage entries convert at ~5.3% (9/170), `/about` entries at ~14% (3/21). Brand-intent visitors convert an order of magnitude better than content visitors.
- Desktop 3,743 sessions / 30 leads; mobile 842 / 8 (comparable rate, longer mobile engagement 119s). Tablet 207 / 0.

### Source quality (engaged seconds and leads per source)
| Source | Sessions | Avg engaged | Leads | CVR |
|---|---|---|---|---|
| Bing | 1,568 | 136s | 9 | 0.6% |
| Direct | 1,572 | 46s | 8 | 0.5% |
| Google | 954 | 63s | 10 | 1.0% |
| DuckDuckGo | 393 | 177s | 3 | 0.8% |
| **ChatGPT** | **92** | **118s** | **4** | **4.3%** |
| Copilot | 35 | 162s | 1 | 2.9% |

**AI answer engines are the highest-converting source class on the site** (5 leads from ~140 sessions, ~3.6%, vs ~0.7% site-wide). Small numbers, but consistent with pre-qualified intent: the AI already answered the question, the visitor arrives ready to act. Direct validation of the GEO program thesis, from our own first-party data. Converter attribution confirms it: 5 of 51 converting visitors entered from chatgpt.com/copilot.

### Traffic pollution
US (1,002 sessions, 9s avg engagement) + CN (114, 0s) are ~13% of "human" sessions but behaviourally dead. Almost certainly unflagged bots or worthless skims. They dilute every rate metric; the bot reclassifier could add an engagement-floor heuristic (feeds [analytics data-hygiene audit]).

### Timing
Leads spread across the whole day (including 20:00-23:00); weekdays dominate. Friday is low-traffic but lead-dense (9 leads / 572 sessions). No action needed, but nurture/notify SLAs should assume evening leads exist.

---

## 2. Converter anatomy: what the 51 look like

| | Converted (51) | Not (6,765) |
|---|---|---|
| Avg sessions per visitor | 3.3 | 1.2 |
| Avg engaged time | 571s | 106s |
| Avg max scroll | 77% | 20% |

- But conversion is mostly **first-session**: 30 of 39 stitched lead sessions were the visitor's first session. The 3.3 average includes post-conversion returns. So: convert-in-the-moment dominates; there is a meaningful minority (~25%) who need 2+ visits.
- **The form is not the problem.** Once `form_start` fires, 40/74 sessions (54%) submit. `/contact` closes hard: 89 sessions → 34 touch a field → 25 leads. The entire deficit is upstream: getting people to a form at all.
- Converters read deeply first: 24/39 lead sessions include `section_view`, 27 include a CTA click. 14 viewed a calculator but only 5 computed. Reading depth, not tool use, is the strongest behavioural precursor.

---

## 3. The near-miss goldmine (the single biggest finding)

Defining near-miss as: engaged 3+ min OR scrolled 90%+ OR computed a calculator OR started a form, and did NOT convert:

> **1,134 sessions / 1,028 visitors.** For every lead, ~22 visitors behave almost identically and leave.

Inside that segment:
- **295 computed a calculator, 288 viewed a result screen. Only 14 then touched a form. 5 converted.** Someone who typed their actual rental income, mortgage interest and sale price into our tool, saw a number, and left, is the warmest possible non-lead. The calculator result moment is the site's largest single leak (~290 sessions in 5 weeks, vs 51 total leads all-time).
- 20 abandoned a form field (recoverable friction, see honeypot bug below).
- 69 rage-clicked (friction losses).

Calc funnel per tool confirms the pattern is at the result, not before: interact → computed → result_viewed is nearly lossless (e.g. section-24: 83 → 83 → 82). The premium calcs' view → interact drop (406 → 34) is mostly `calc_view` firing on scroll-past of embedded tools, not real abandonment.

---

## 4. Attention is being spent on surfaces that produce nothing

All-time, per surface:

| Surface | Shown | Acted | Rate |
|---|---|---|---|
| Subscribe block | **16,290 views** | **0 submits** | **0.0%** |
| Gate (guide/resource) | 225 views | 0 unlocks | 0.0% |
| Exit-intent modal | 934 sessions | 12 acted after | 1.3% |
| Personalization nudge | 3,609 shown | 30 clicked / 458 dismissed | 0.8% CTR, 15:1 dismiss:click |
| Specialist widget | 1,678 opens | 76 clicks | best of the passive surfaces |

And the CTA table is dominated by *closing* our own UI: `deep_scroll_close` 198 + `sticky_cta_close` 107 clicks, versus `deep_scroll_modal` 6 + `sticky_cta` 5 + `header_book` 20 actual CTA clicks. **Users dismiss our interruptions ~10x more often than they accept them.**

Caveat resolved by code check: `Property/web/src/components/forms/SubscribeForm.tsx:99` fires `subscribe_submitted` on success, so tracking IS wired. **The subscribe block has genuinely converted zero subscribers in 16,290 views. Confirmed dead surface.**

Every topic/placement of the personalization nudge underperforms uniformly (0-1.3% CTR across all 10 topics), so it's the format, not the targeting.

---

## 5. Friction and defects found in the data

1. **Rage-click cluster on calculator inputs.** Top 9 rage-click targets are all `input#f-*` fields (mortgageInterest, rentalIncome, salePrice…), 526 rage clicks, ~106 sessions. Users are hammering the exact fields they need to get a result. Likely a currency-input handling bug (rejected keystrokes, formatting fights, or focus loss on re-render) in the premium calc embeds. This is damaging the highest-intent flow on the site.
2. **JS error, 77 occurrences:** `TypeError: undefined is not an object (evaluating 'r["@context"].toLowerCase')`, a JSON-LD consumer choking (Safari-syntax). Plus webpack chunk-load errors (47) and `registered_office` undefined (7).
3. **Known, still unshipped:** the `company_url` honeypot silent-drop bug (~2 real leads lost/30d). The 20 near-miss form abandons overlap this.
4. `/contact` has 17 rage clicks of its own, on the money page.
5. The multi-step form step funnel view (migration `20260707000001`) is not in prod yet, expected, it ships with the `property-lead-quality` branch.

---

## 6. Content intelligence nobody else has

Section-level read data (`section_view` with actual heading text) is a capability competitors relying on GA4/GSC do not have:

- **"Frequently asked questions" is the most-read section on the site** (212 sessions), nearly 2x anything else. FAQ-format content is what people actually consume. This also validates the BLUF/answer-box program direction.
- Next tier: conceptual "orientation" sections ("Why landlords look at incorporation in the first place", "The two taxes that bite on transfer", "The three things to understand before you sell") and worked examples. People read framing and examples, not exhaustive rule lists.
- "Related articles" is the 4th most-read section (104 sessions) yet only ~155 sessions ever click through to another post: read but not clicked. The links on offer aren't matching the reader's next question.
- Embedded tool sections ("Free … tool") get seen by 70-115 sessions each: visibility is fine; usage is the gap (see §3).
- Scroll reality check: on the top page only ~42% pass 50% scroll, ~15% reach 90%. Everything below the fold-and-a-half of a long post is unread by most visitors. Front-load value; the most-read section types should come early.
- When blog readers *do* navigate, second pages are: another post (155), `/contact` (23), `/services` (9), calculators (24 combined). Calculator cross-links out-pull services links.

This can feed the rewrite engine directly: per-page "which sections were read vs skipped" is a structural editing signal no competitor's toolchain produces.

---

## 7. Ranked opportunity list (for a future CRO wave, nothing actioned)

1. **Calculator result moment** (~290 warm sessions/5wk → 14 form touches). The `calc_result_capture`/`result_gate_capture` treatment is already deployed; the data says this surface deserves the most iteration attention of anything on the site. Even 5% capture ≈ +3 leads/wk (+40% on current volume).
2. **Fix the calculator input rage bug** (§5.1). It sits inside opportunity #1's flow.
3. **Reclaim dead attention**: verify-then-kill (or replace) the subscribe block (16k views, 0 output), retire or radically de-noise exit-intent + personalization nudges (10:1 dismiss ratio creates banner-blindness that taxes the CTAs that *do* work). The specialist widget earns its place.
4. **Blog in-content routing**: FAQ and related-articles are the read sections, so put the conversion path there: topic-matched calculator links in-body (calc links already out-pull services links 24:9 as second pages), and rebuild related-articles selection around "next question in the journey" rather than same-category.
5. **Ship the honeypot fix** (already diagnosed, needs sign-off).
6. **Lean into AI-referral** (ChatGPT/Copilot ~3.6% CVR): strengthens the GEO program case with first-party revenue evidence; consider a dedicated landing treatment for AI-referred visitors (they arrive pre-qualified, skip the education, offer the review directly).
7. **Bot/junk reclassification** (US/CN zero-engagement traffic ~13% of "human" data) so all future rates read true.
8. **Multi-step mini-forms** (already built on this branch) attack exactly the right gap (form *starts*, not completions). Data supports deploying that experiment.
9. **Section-read signal → rewrite engine** (structural editing input; slow-burn, unique moat).

## What was deliberately not done

- No heatmap/replay tooling (owner call: not needed; x/y click coords exist if aggregate click maps are ever wanted).
- No predictive/lead-scoring model: 51 positives is too few; revisit at ~200+ leads.
- No changes to site, detectors, or data. Read-only throughout.
