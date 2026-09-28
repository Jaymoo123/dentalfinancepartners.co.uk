# DWC provable-claims sheet

Read-only inventory. No code, DB or git state changed. Every row is either
`docs-only` (a number quoted in a doc/memory, not re-run this session) or
`re-derivable` (a script/SQL exists and, where noted, was re-run today
2026-09-16 to get a live figure).

## 1. Redesign scope and rollout

| # | Claim | Value | Source | Data-through | Flag |
|---|---|---|---|---|---|
| 1 | Redesign scale | 252 files changed, +33,857/-6,934, ~40 bespoke storytelling components, 11 designer sessions | `docs/property/STATE.md` §0.22 | 2026-08-21 (squash commit `eb745e1`) | docs-only |
| 2 | Redesign live date | 2026-08-23 20:21 UTC, two prod deploys (20:21:50Z, 20:34:05Z), corroborated by lead timestamps either side of cutover | `docs/property/STATE.md` §0.22, `scripts/property_design_ab.sql` header | 2026-08-23 | re-derivable (deploy API + lead timestamps) |
| 3 | Port to 8 more sites | generalist, Solicitors, Dentists, Medical, construction-cis, contractors-ir35, charities, crypto - all live | `docs/_engines/DESIGN_PORT_PLAYBOOK.md`, `docs/_engines/DWC_PITCH/CASE_STUDY_PROPERTY.md` | 2026-09-16 (estate release `90fbea9c`) | docs-only |
| 4 | Kit-adoption gap causes the "looks unfinished" read, NOT thin content or palette | generalist 16 kit components/138 call sites vs crypto 5/20; both hypotheses (bespoke art direction, thin content) falsified by measurement | `docs/_engines/DESIGN_GAP_DIAGNOSIS_2026-09-14.md` | 2026-09-14 | re-derivable (the greps are printed in the doc, rerunnable verbatim) |
| 5 | "280+ Properties enquired about" | 158 enquiries / 154 unique people / 280 properties (floor, every band counted at bottom edge, developers and "Other" contribute zero) | `Property/web/src/lib/site-stats.ts` docstring (SQL embedded) | 2026-08-21 | **re-derivable** - SQL lives in the source file, runnable via `python scripts/_q.py` |

## 2. Leads per day / month

| # | Claim | Value | Source | Data-through | Flag |
|---|---|---|---|---|---|
| 6 | Property pre-redesign baseline | 2.41 leads/day (28d to 2026-08-23), 1.540% lead rate | `property_redesign_cutover.md` memory; re-run today matches (see row 8) | 2026-08-23 | re-derivable |
| 7 | Property post-redesign, July (pre-cutover month, for context) | 62 leads/month | `docs/_engines/PROPERTY_CEILING_ANALYSIS_2026-08-05.md` | July 2026 | docs-only (ad hoc GSC/Supabase pull, not a saved script) |
| 8 | Property post-redesign, freshest read (RE-RUN TODAY) | AFTER window (24 days, cutover to now): 2.58 leads/day, 62 leads total, 1.383% lead rate. BEFORE window (28d pre-cutover): 2.41 leads/day, 65 leads, 1.540% lead rate | `scripts/property_design_ab.sql`, run 2026-09-16 | 2026-09-16 | **re-derivable, re-run this session** |
| 9 | Estate-wide human audience | 457 human sessions/day (58% of raw sessions are bots); Property = 50% of sessions, 72% of leads | `audience_intent_monetisation.md` memory / `docs/_engines/AUDIENCE_INTENT_MONETISATION_2026-09-14.md` | data through 2026-09-12/13 | docs-only (ad hoc query, script not named) |
| 10 | Lead-handoff volume proof | 308 live leads swept through the handoff renderer; 223 property leads carry 112 usable reply snippets | `docs/property/STATE.md` 2026-09-15 entry | 2026-09-15 | docs-only |

**Could not verify:** a single clean "leads per month, estate-wide, current" figure with a script. The only whole-estate total found is July's Property-62/other-21 split in the ceiling analysis (Aug 5 doc), now 6 weeks stale relative to today.

## 3. Redesign before vs after (re-run today, 2026-09-16)

Ran `python scripts/_q.py scripts/property_design_ab.sql` live against prod. Bot backfill check passed first (`bot_reason like '%backfill 2026-08-23%'` returns 4,540 rows, not zero, so the comparison is valid per the script's own precondition).

| Metric | Before (28d to 2026-08-24) | After (24d since cutover, to today) | Direction |
|---|---|---|---|
| Visitors/day | 156.3 | 186.8 | **+19.5%** |
| Sessions/day | 204.0 | 235.8 | **+15.6%** |
| Avg engaged time | 147.2s | 137.2s | **-6.8%** |
| Avg scroll % | 23.0% | 24.8% | +1.8pp |
| % sessions with zero scroll | 50.3% | 48.5% | improved slightly |
| Leads/day | 2.41 | 2.58 | **+7.1%** |
| Lead rate (leads/visitor) | 1.540% | 1.383% | **-10.2% relative** |

**Verdict: mixed, not a clean win.** More traffic and more absolute leads/day, but a lower conversion rate and slightly less engaged time per session. Traffic growth is doing the work, not conversion. The window (24 days) is short of the "three to four full weeks" the script's own header demands, so this is a read, not a final verdict.

**The two traps, both checked and cleared this run:**
1. Bot backfill applied (4,540 rows carry the 08-23 backfill tag) - if this had been zero, the BEFORE side would read inflated by ~12% and the redesign would look like a bigger win than it is.
2. `header_book` breakpoint moved at the same deploy (commit `d4f24e25`, CTA `sm:`→`lg:inline-flex`) - the script already sums `header_book` + `header_book_mobile`, so this trap does not corrupt the numbers above, but it would corrupt any hand-run CTA-only query.

## 4. Channel share: Bing / ChatGPT / Copilot / Google

| # | Claim | Value | Source | Data-through | Flag |
|---|---|---|---|---|---|
| 11 | July 2026 sessions/leads by channel | Bing 1,907 sessions/16 leads; Google 1,640/11; direct 1,596/16; ChatGPT 43/4; Copilot 46/1 | `docs/_engines/PROPERTY_CEILING_ANALYSIS_2026-08-05.md` | July 2026 | docs-only (ad hoc pull) |
| 12 | Derived conversion rate by channel (calculated from row 11) | ChatGPT 9.3%, ChatGPT (Jun) also 4 leads/~similar base, Copilot 2.2%, Bing 0.84%, Google 0.67% | derived from row 11 | July 2026 | docs-only, arithmetic only |
| 13 | Bing site totals (corrected, not the truncated top-N slice) | Bing 67,141 impr / 1,692 clicks / 2.52% CTR vs Google 77,466 / 811 / 1.05% CTR - Bing wins ~2.4x on CTR | `PROPERTY_CEILING_ANALYSIS_2026-08-05.md`, corrected against `GetRankAndTrafficStats` | July 2026 | re-derivable (`bing_query_client`, `GetRankAndTrafficStats`, per memory `bing_query_stats_topn_trap`) |
| 14 | Fresher (Sep 2026) channel conversion read | ChatGPT referrals convert 13.6%; Bing 0.30% | `audience_intent_monetisation.md` memory | data through 2026-09-12/13 | docs-only |
| 15 | Older estate-wide AI-vs-search conversion claim (STALE, do not quote without re-deriving) | "AI search converts ~6% vs Bing-family 0.4% and Google 1.7%" | `docs/_engines/AI_SEARCH_GEO_HANDOVER.md` | dated 2026-06-17, superseded per the doc's own header | docs-only, **flagged stale - contradicts row 14's fresher Sep numbers, do not use** |

**Could not verify:** a current (September) absolute session/lead count split by channel. Rows 11-13 are a July snapshot; row 14 gives September conversion rates but not volumes. No single script reproduces channel share end to end today - it is built from GSC API + Bing Webmaster API + Supabase `web_sessions`/`leads` joins, run ad hoc each time.

## 5. Design uplift finding ("kit adoption, not art direction")

| # | Claim | Value | Source | Data-through | Flag |
|---|---|---|---|---|---|
| 16 | The four-marker control test | generalist (ported, "looks good") scores 1/2/3/4 on live-dot pill/StatsCounter/hero backdrop/rounded-full, matching Property's 1/2/3/4; crypto ("not there") scores 0/0/0/0 | `docs/_engines/DESIGN_GAP_DIAGNOSIS_2026-09-14.md` | 2026-09-14 | re-derivable (shell one-liner printed in the doc) |
| 17 | Kit component adoption count | generalist: 16 distinct kit components / 138 call sites, re-exports `layout-utils`; crypto: 5 / 20, does not re-export | same doc | 2026-09-14 | re-derivable |
| 18 | Corpus depth and palette both falsified as causes | crypto's homepage has MORE sections (13 vs generalist's ~11), more h2s (11 vs 7), more lines (793 vs 471) than generalist's, yet reads worse; both sites run 3 dark bands at effectively the same hex | same doc §2-3 | 2026-09-14 | re-derivable |
| 19 | Uplift shipped (not yet deployed at write time, since deployed with the 09-16 release) | crypto `c3824681`, charities `ba7b184a`, contractors-ir35 `569d3304`, construction-cis `48312e2c` | `design_uplift_programme.md` memory | 2026-09-14, live since 2026-09-16 | docs-only (commit hashes are re-derivable via `git show`, not run this session per the read-only/no-git-commands instruction) |

## 6. Claims the estate-claims-integrity work FORBIDS DWC (or the estate) from making

All from `estate_claims_integrity.md` memory, audit dated 2026-09-12, serious tier fixed but **NOT yet pushed/deployed at audit time** (verify current state before quoting; it may have shipped with the 09-16 release, not independently re-checked this session):

- **"100+ Landlords served"** - Property's own DECISION M tile. The DECISION L investigation showed this **cannot be evidenced as a client claim** (Property is lead-gen; no client records exist anywhere in the estate). Still on the site, open owner decision, do not let DWC cite "100+ landlords served" as a DWC-attributable proof point.
- **"£2.4M+ Tax savings identified"** - already replaced (see row 5) because it was **not reconstructable from any record in the estate**. Never resurrect this figure.
- **"one qualified accountant" / "100+ UK landlords" on `/about`** - flagged as evidently wrong, no named person on the site.
- **Generic "we do the work" voice claims about team size, client testimonials, or professional credentials** are estate patterns that were found FALSE elsewhere (Dentists: invented testimonials; Generalist: ACCA + PII claims and 193 fabricated "case studies"; Solicitors: fabricated VAT regime and false SRA claims). None of these are Property-specific, but they show the estate's pattern: **any client-count, credential or testimonial claim needs a named, checked source before DWC repeats it.**
- **Any specific fee figure** on `/services/property-accountant` or the `/incorporation` FAQ - asked for across six designer sessions, never supplied. Do not imply pricing transparency exists.
- **Privacy/data-retention wording** ("your data is deleted after 24 months") overstates the code - the cron anonymises, does not delete, and is DORMANT unless a flag is armed. Do not use "we delete your data" as a trust/compliance proof point without checking whether this has been resolved.

## 7. "Built by Double Wired Creative" footer - verified rendering, not just present in source

Grepped the whole repo for the literal string and traced the render path (shared component `packages/web-shared/design/chrome/SiteFooter.tsx:56-65,217-227`, prop `showBuilderCredit`, **default `true`**).

**Confirmed rendering (9 sites, either default-true or explicit `true`):**

| Site | How it renders |
|---|---|
| Property | Own local `SiteFooter.tsx` (not the shared component), literal credit hardcoded, unconditional |
| construction-cis | Own local `SiteFooter.tsx`, literal credit hardcoded, unconditional |
| contractors-ir35 | Own local `SiteFooter.tsx`; comment confirms `showBuilderCredit` intentionally omitted so the kit default (`true`) applies |
| generalist | `PageShell.tsx` passes shared `SiteFooter` `showBuilderCredit: true` explicitly, with an owner-decision comment (2026-09-11: "the studio credit appears estate-wide, not only on the site they designed") |
| Solicitors | `PageShell.tsx` passes `showBuilderCredit: true` explicitly |
| Dentists | `PageShell.tsx` omits the prop; comment states default `true` applies |
| Medical | `PageShell.tsx` passes `showBuilderCredit: true` explicitly |
| crypto | `PageShell.tsx` omits the prop; comment states default `true` applies |
| charities | `PageShell.tsx` omits the prop; comment states default `true` applies |

That is Property plus all 8 ported sites = the full set the case study claims ("every one of those sites carries our credit in the footer"). This is **verified as a render path** (component default + explicit call-site props), not merely a grep hit in a comment - the shared component's own doc comment explains exactly why the prop exists and defaults true, and every site's call site was individually checked.

**Not part of the design port / no credit expected:** wills-probate, divorce-finances, pharmacies, hospitality, digital-agency, care, ecommerce - each has its own `SiteFooter.tsx` with no reference to Double Wired Creative or `showBuilderCredit`.

## Summary flags legend
- **docs-only**: a number quoted in a doc or memory; not re-run this session; treat as a snapshot at its stated date.
- **re-derivable**: a script or SQL exists (named above) that regenerates the figure; some were re-run live today and are marked as such.

## Addendum 2026-09-16 (manager, verified live in `leads`)

- Ecommerce Finance (ecommercefinance.co.uk) went live 2026-07-16 on the old design. Zero real leads for two months.
- Design port deployed 2026-09-16 (estate deploy from `90fbea9c`). First ever lead at 13:03:26 UTC the same day, `is_test=false`, `source_url` carries `utm_source=chatgpt.com`. Lifetime lead count for the site = 1.
- Same day: Solicitors lead 12:36 UTC (lifetime 10), Generalist lead 15:42 UTC via the sole-trader-vs-ltd calculator (lifetime 20).
- Re-derivable: `select source, created_at, source_url from leads where source='ecommerce' and is_test is not true order by created_at`.
- Caveat for any public claim: n=1, same-day. Say "first enquiry within hours of the redesign, from ChatGPT", never a rate.
