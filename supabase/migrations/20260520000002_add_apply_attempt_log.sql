-- Apply attempt log: every walk_queue iteration writes a row here,
-- whether the apply succeeded, blocked, or errored. This closes the gap
-- where blocked/errored opps disappeared into stdout with no audit trail.
--
-- Use this for retrospective error review:
--   SELECT site_key, action_kind, outcome, error_message, COUNT(*)
--   FROM apply_attempts
--   WHERE created_at > now() - interval '1 day'
--   GROUP BY 1, 2, 3, 4
--   ORDER BY 5 DESC;

CREATE TABLE IF NOT EXISTS apply_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    site_key TEXT NOT NULL CHECK (site_key IN ('dentists', 'property', 'medical', 'solicitors', 'agency', 'generalist')),
    action_kind TEXT NOT NULL,
    opportunity_id UUID,
    target_url TEXT,
    target_slug TEXT,
    primary_query TEXT,

    -- 'applied' | 'blocked' | 'errored'
    outcome TEXT NOT NULL CHECK (outcome IN ('applied', 'blocked', 'errored')),

    -- For blocked: the validators that failed (joined). For errored: the exception
    blocking_issues TEXT[],
    error_message TEXT,
    error_type TEXT,  -- e.g. 'ApplyError', 'GitError', 'LLMError', 'NameError'

    -- For applied: link to the optimisation_changes row
    change_id UUID,
    git_commit_hash TEXT,

    -- Diagnostic context to help debug recurring failures
    n_self_heal_retries INTEGER DEFAULT 0,
    llm_cost_usd NUMERIC(8,5) DEFAULT 0,
    research_cost_usd NUMERIC(8,5) DEFAULT 0,
    walker_run_id TEXT,  -- groups attempts from one walker invocation
    notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_apply_attempts_site_outcome
    ON apply_attempts (site_key, outcome, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_apply_attempts_error
    ON apply_attempts (error_type, created_at DESC)
    WHERE outcome IN ('blocked', 'errored');

CREATE INDEX IF NOT EXISTS idx_apply_attempts_opp
    ON apply_attempts (opportunity_id);

COMMENT ON TABLE apply_attempts IS
    'Every walk_queue iteration writes a row here: applied / blocked / errored. '
    'Use this to retrospectively identify recurring failure patterns and queue '
    'targeted fixes.';
