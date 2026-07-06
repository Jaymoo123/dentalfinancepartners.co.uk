-- Medical data feed staleness census
-- Run: python scripts/_q.py scripts/medical/00_staleness.sql
-- Today reference: 2026-07-06

SELECT
  'gsc_query_data'           AS feed,
  MIN(date)::text            AS min_date,
  MAX(date)::text            AS max_date,
  COUNT(*)                   AS row_count
FROM gsc_query_data
WHERE site_key = 'medical'

UNION ALL

SELECT
  'gsc_page_performance'     AS feed,
  MIN(date)::text            AS min_date,
  MAX(date)::text            AS max_date,
  COUNT(*)                   AS row_count
FROM gsc_page_performance
WHERE niche = 'medical'

UNION ALL

SELECT
  'bing_query_data'          AS feed,
  MIN(date)::text            AS min_date,
  MAX(date)::text            AS max_date,
  COUNT(*)                   AS row_count
FROM bing_query_data
WHERE site_key = 'medical'

UNION ALL

SELECT
  'ga4_page_data'            AS feed,
  MIN(date)::text            AS min_date,
  MAX(date)::text            AS max_date,
  COUNT(*)                   AS row_count
FROM ga4_page_data
WHERE site_key = 'medical'

UNION ALL

SELECT
  'bing_ai_performance'      AS feed,
  MIN(date)::text            AS min_date,
  MAX(date)::text            AS max_date,
  COUNT(*)                   AS row_count
FROM bing_ai_performance
WHERE site_key = 'medical'

ORDER BY feed;
