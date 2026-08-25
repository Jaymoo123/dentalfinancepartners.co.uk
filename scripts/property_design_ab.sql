-- Property designer-redesign before/after read.
--
-- Cutover: 2026-08-23 20:21 UTC, the first of two production deploys that put
-- the designer port live (Vercel prod deployments 20:21:50Z and 20:34:05Z,
-- project prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU). Corroborated by the day's second
-- lead landing 20:47:16Z, 13 minutes after the second deploy, and by the first
-- lead landing 09:38:38Z on the old design.
--
-- The window below starts the AFTER period at 2026-08-24 00:00 UTC so both sides
-- are whole UTC days. 2026-08-23 belongs to neither: it is 85% old design and it
-- is also the worst day of the bot incident, so it is excluded outright.
--
-- Runner:  python scripts/_q.py scripts/property_design_ab.sql
--
-- IMPORTANT, read before quoting any number this returns:
--   * Both sides must use the SAME bot definition or the comparison is a lie.
--     The 2026-08-22 bot fleet inflated is_bot=false by ~50% on 08-22 and 08-23,
--     and the support_opened=via:"auto" defect inflated every day since the
--     widget shipped on 2026-06-06. bot_scorer.py now carries the passive_session
--     rule that removes both. If the historical backfill has NOT been applied,
--     the BEFORE side is inflated by roughly 12% on ordinary days and the
--     redesign will read as a loss that is not one. Check first:
--       select count(*) from web_sessions
--       where bot_reason like '%backfill 2026-08-23%';
--     Zero means the backfill has not run and this comparison is not safe yet.
--   * Give it three to four full weeks before concluding anything. A 90-day
--     monitored-pages style read is better still for anything SEO-shaped.
--   * header_book moved breakpoint at the same deploy (commit d4f24e25): the CTA
--     is now lg:inline-flex, so tablet volume shifted from the header_book row to
--     header_book_mobile. Compare the two rows summed, never header_book alone.

WITH bounds AS (
  SELECT
    timestamptz '2026-08-24 00:00:00+00'                       AS cutover,
    timestamptz '2026-08-24 00:00:00+00' - interval '28 days'  AS before_from,
    timestamptz '2026-08-23 00:00:00+00'                       AS before_to,
    least(now(), timestamptz '2026-08-24 00:00:00+00' + interval '28 days') AS after_to
),
sess AS (
  SELECT s.*,
         CASE WHEN s.started_at >= b.cutover THEN 'after' ELSE 'before' END AS side,
         b.cutover
  FROM web_sessions s CROSS JOIN bounds b
  WHERE s.site_key = 'property'
    AND s.is_bot = false
    AND (
      (s.started_at >= b.before_from AND s.started_at < b.before_to)
      OR (s.started_at >= b.cutover AND s.started_at < b.after_to)
    )
),
-- Per-side day count, so every rate below is a per-day figure and the two sides
-- stay comparable while the AFTER window is still filling up.
days AS (
  SELECT side, count(DISTINCT started_at::date)::numeric AS n_days
  FROM sess GROUP BY side
),
lead_side AS (
  SELECT CASE WHEN l.created_at >= b.cutover THEN 'after' ELSE 'before' END AS side,
         count(*) AS leads
  FROM leads l CROSS JOIN bounds b
  WHERE l.source = 'property'
    AND l.source <> 'test' AND coalesce(l.is_test, false) = false
    AND (
      (l.created_at >= b.before_from AND l.created_at < b.before_to)
      OR (l.created_at >= b.cutover AND l.created_at < b.after_to)
    )
  GROUP BY 1
)
SELECT
  d.side,
  d.n_days,
  count(DISTINCT s.visitor_id)                                AS visitors,
  round(count(DISTINCT s.visitor_id) / d.n_days, 1)           AS visitors_per_day,
  round(count(*) / d.n_days, 1)                               AS sessions_per_day,
  round(avg(s.engaged_ms) / 1000.0, 1)                        AS avg_engaged_s,
  round(avg(s.max_scroll_pct), 1)                             AS avg_scroll_pct,
  round(avg(s.event_count), 1)                                AS avg_events,
  round(100.0 * count(*) FILTER (WHERE coalesce(s.max_scroll_pct, 0) = 0)
        / count(*), 1)                                        AS pct_no_scroll,
  coalesce(l.leads, 0)                                        AS leads,
  round(coalesce(l.leads, 0) / d.n_days, 2)                   AS leads_per_day,
  round(100.0 * coalesce(l.leads, 0)
        / nullif(count(DISTINCT s.visitor_id), 0), 3)         AS lead_rate_pct
FROM sess s
JOIN days d ON d.side = s.side
LEFT JOIN lead_side l ON l.side = s.side
GROUP BY d.side, d.n_days, l.leads
ORDER BY d.side DESC;
