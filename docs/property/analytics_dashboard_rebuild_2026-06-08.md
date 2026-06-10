# Property analytics dashboard rebuild — 2026-06-08

Rebuild of the internal `/admin/analytics` console so the funnel reflects the real
trickle-down, the whole dashboard is GB-scoped by default, previously-captured-but-dark
data is surfaced, and the front-of-site calculators stop dead-ending. Triggered by a
user audit. Local-first; dashboard + migrations are reversible/additive, site CTA edits
await deploy sign-off.

## Baseline at build time (read-only pull, 3 days of data, 316 non-bot sessions)

- **28% of non-bot traffic is non-GB** (GB 227, US 49, CN 7, ES/DE 6, …). GB default
  materially de-noises headline rates (US alone is 16%).
- **The old "Clicked CTA" stage was mostly dismiss clicks**: of 27 `cta_click` events,
  23 were `*_close` (deep_scroll_close ×17, sticky_cta_close ×6); only 4 were real CTAs.
  **0 of 27 carried `props.goal`** (tagging is net-new).
- **form_start implies CTA**: 1 of 3 form-starts had no prior CTA click — the funnel's
  "downstream implies upstream" rule keeps it from being dropped.
- **Calculators leak**: compute-completion 4–20% (landlord-essentials 4%, incorporation
  6%, capital-gains 15%, section-24 20%); computed→lead ≈ 0. Three premium tools trip
  "Needs attention".
- v2 funnel validated monotonic on real data (0 violations); form-CTA stage drops from 23
  (polluted) to 3 (honest) until real form CTAs are tagged.

## What shipped

**SQL (additive, prod-safe; detector views left byte-for-byte intact):**
`supabase/migrations/20260608000001_funnel_v2_and_geo_views.sql` and
`…0002_cta_friction_and_timeseries_geo.sql` —
`vw_web_funnel_daily_v2` (true nested funnel, country dim), `vw_cta_performance`,
`vw_ux_friction`, `vw_calculator_conversion_geo`, `vw_calculator_conversion_placement_geo`,
`vw_form_field_dropoff_geo`, `vw_section_engagement_geo`, and `web_timeseries` + `p_country`.

**Dashboard:** GB-default country slicer across every tab; true nested funnel
(`Sessions → Engaged → Clicked a form CTA → Started form → Submitted`, with `↳ Used
calculator` as a branch off Engaged); four new panels — per-CTA performance, form-field
drop-off, content/section engagement, UX friction; a plain-English "Needs attention"
explainer; per-visitor mini-funnel + a richer Story (entry source, gated-resource/support
events, form-bound CTA labelling).

**Front-of-site (local-first):** post-result CTA on the homepage calculators (gated by a
`resultCta` prop so dedicated calc pages, which already have a form, don't double up);
`data-cta-goal="form"` on form-bound CTAs (hero_book, header_book(+mobile), and the
`/contact`-bound cases of sticky/deep-scroll/returning); `autoCapture` reads the attribute
into `props.goal`.

## Recommendations — NOT built this pass (next site-CRO pass), ranked by likely lead impact

The audit found the secondary lead surfaces are "leaky": they create leads with minimal
data and/or don't route to the full structured form. Ranked:

1. **Route calculator engagement to the form, everywhere (not just the homepage).** The
   premium/blog-embedded tools are where the real volume + leakage is (4–20% compute, ~0
   lead). Extend the post-result CTA / a soft "get a review of your result" step to the
   premium-tool and blog placements, and measure with the new `vw_calculator_conversion_geo`
   + per-CTA panel. Highest expected impact — most tool traffic currently dead-ends.
2. **Make personalised sticky/modal/returning offers that point at a *tool* offer a clear
   next step to `/contact`.** Today a "tool" or "guide" offer ends at the asset; add an
   explicit follow-on form CTA after the asset is consumed.
3. **Tighten the email-only captures (inline mini-form, exit-intent, specialist widget,
   resource gate) into the structured flow.** They capture email only (no role/phone), so
   leads are harder to qualify. Options: progressive profiling (ask role/phone after the
   email unlock), or a one-click "complete your enquiry" that pre-fills the full form.
4. **Form-field friction.** Once the form-field drop-off panel accrues data, simplify or
   reorder whichever field abandons most (the lead form's `phone` is the usual suspect —
   it's already optional; confirm with data before changing).

## Deploy — DONE 2026-06-08

1. **Migrations applied to prod** via `python scripts/apply_web_analytics_migrations.py prod
   20260608` (both PASS). All 7 new views verified live (REST 200); GB funnel monotonic on
   real data (231→172→3→3→1, calc branch 12). Old funnel/detector views untouched.
2. **Site deployed** from repo root with the project override
   (`VERCEL_ORG_ID=team_XF9WAygZX7SGk9Fo4tOAnihH VERCEL_PROJECT_ID=prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU
   vercel deploy --prod --yes`); aliased to www.propertytaxpartners.co.uk. GitHub auto-deploy
   is off.
3. **Smoke-checked live:** homepage 200 with `data-cta-goal="form"` + `calc_result_` markers
   in the served HTML; `/api/track` 204.

Outstanding: the working tree is still UNCOMMITTED on branch `property-calculators-and-geo`
(prod runs code not yet in git history) — commit when ready. To view the dashboard:
`/admin/analytics?k=<ADMIN_DASHBOARD_KEY>` (default GB; toggle All).
