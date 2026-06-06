# Property intent personalization

How the Property site tailors what a visitor sees to their search/click intent,
deterministically and without per-page wiring. Companion to
`docs/behaviour-analytics.md` (the data pipeline). System of record is our own
Supabase; this layer reads client-side signals + the analytics taxonomy.

## The intent model

We cannot see a visitor's Google query (the referrer only gives the host, e.g.
`google.com`). So the **landing page is the search-intent proxy**: someone who
arrives on a Section 24 article searched something Section-24-shaped. That is
sharpened by what they then click (a calculator, a category) and by engagement.

Signals (all already captured, see behaviour-analytics.md):
- **entry topic** — topic of the session's landing page (sessionStorage
  `ptp_entry_topic`, first page wins). The primary intent signal.
- **page topic** — topic of the page they're on now (derived from the route).
- **last topic** — most-recent topic across visits (localStorage `ptp_last_topic`),
  for returning-visitor tailoring.
- **returning / visit count** — localStorage `ptp_visits` (`isReturning()`).
- **engagement / scroll / converted** — from the analytics SDK + the
  `ptp_converted` flag (set on lead submit, Phase 3).

## The taxonomy (single source of truth)

`Property/web/src/lib/intent/taxonomy.ts` defines a small set of **canonical
topics**, each carrying its personalization payload: matched calculator, CTA
copy, and (Phase 4) a lead-magnet `resourceId`. It maps:
- blog **category slugs** (the `slugifyCategory()` output in the URL) → topic
- calculator **slugs** → topic (`CALC_SLUG_TO_TOPIC`)

`Property/web/src/lib/intent/deriveTopic.ts` is a pure, isomorphic function that
returns the topic for any pathname (used by the analytics provider to stamp
events, and by the personalization layer to tailor the page). Blog category is in
the URL (`/blog/<category>/<slug>`) and calculators carry a registry category, so
**topic falls out of the route** — no page declares its own topic.

## Onboarding a new page (the extensibility contract)

- **New blog post in an existing category** → nothing to do. It's tracked
  (global AnalyticsProvider) and personalized (topic from the URL category).
- **New blog post in a NEW category** → add one entry to `TOPICS` in
  `taxonomy.ts` (its `blogCategorySlugs`, matched calculator, CTA).
- **New calculator** → add one line to `CALC_SLUG_TO_TOPIC`.
- **New static page** that should carry a topic → extend `deriveTopic` (rare).

Unmapped pages return `null` (the generic, non-personalized experience) — they
never break, they just don't personalize until mapped.

## How topic reaches analytics

`AnalyticsProvider` stamps `page_topic` on every `page_view`, `entry_topic` on
the session's first view, and `visit_class` (new/returning) — all into
`web_events.props` (JSONB, no schema change). Session-level "conversion by entry
topic" reporting derives the topic from the stored `entry_path` via a SQL helper
added when the Phase 3 measurement views land (avoids duplicating deriveTopic in
SQL before it's needed).

## Design decisions

- **Deterministic, no ML.** Every decision is a pure function of the signals.
- **Entry topic lives client-side** (sessionStorage) so personalization needs no
  server round-trip and no change to the hot `ingest_web_events` RPC.
- **taxonomy.ts is string-only** (no heavy imports) so it's safe in the global
  client bundle via `deriveTopic`.

## Surfaces & rules (Phase 3)

_To be filled in when the personalization engine + rules land (Phase 3)._ Planned
surfaces: inline content-upgrade (between H2s), end-of-article next-step, hero /
sticky CTA copy, deep-scroll / exit modal, returning-visitor greeting. Each is
consent-gated, SSR-safe (current-page tailoring server-rendered to avoid layout
shift; cross-session overlays hydrate client-side in fixed slots), suppressible,
and emits `personalization_shown/clicked/dismissed` so lift is measurable and
A/B-able.
