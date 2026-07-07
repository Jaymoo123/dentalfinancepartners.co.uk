-- console_cache: pre-computed dashboard aggregations for the estate console.
-- Rows are upserted by the /api/console/refresh cron every 2 minutes.
-- Dashboard reads are simple single-row lookups (~5ms) instead of running
-- complex analytical views (~500-2000ms) on every page load.
--
-- cache_key format: "estate:<metric>:<window>" or "site:<key>:<metric>:<country>"
-- data: serialised JSON matching the shape returned by adminData / estateData functions.
-- No RLS — read/write via SERVICE_ROLE only. Anon has no access.

CREATE TABLE IF NOT EXISTS console_cache (
  cache_key    TEXT        PRIMARY KEY,
  data         JSONB       NOT NULL,
  refreshed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for partial key scans (e.g. "site:property:*")
CREATE INDEX IF NOT EXISTS console_cache_prefix_idx ON console_cache (cache_key text_pattern_ops);
