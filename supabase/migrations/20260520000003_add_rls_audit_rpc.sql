-- ============================================================================
-- RLS AUDIT RPC
-- ============================================================================
-- Migration: 20260520000003_add_rls_audit_rpc.sql
-- Date: 2026-05-20
-- Purpose: Enable read-only enumeration of RLS policies via PostgREST.
--
-- WHY: PostgREST doesn't expose pg_policies by default, but Phase 1 of the
-- multi-site infrastructure refactor needs to verify which tables have RLS
-- and which don't. This RPC reads from pg_catalog (read-only, returns
-- schema metadata only — no row data) and can be called via the standard
-- /rest/v1/rpc/rls_audit endpoint.
--
-- SECURITY:
-- - SECURITY DEFINER so it can read pg_catalog even when called by anon.
-- - Returns no row data; only policy/table metadata that is already public
--   in the Supabase dashboard.
-- - Read-only function. Cannot modify schema.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.rls_audit()
RETURNS TABLE (
  table_name text,
  rls_enabled boolean,
  policy_count integer,
  policies jsonb
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
  SELECT
    c.relname::text AS table_name,
    c.relrowsecurity AS rls_enabled,
    COALESCE(p.policy_count, 0)::integer AS policy_count,
    COALESCE(p.policies, '[]'::jsonb) AS policies
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  LEFT JOIN (
    SELECT
      pol.polrelid AS relid,
      COUNT(*) AS policy_count,
      jsonb_agg(
        jsonb_build_object(
          'policy_name', pol.polname,
          'command',
            CASE pol.polcmd
              WHEN 'r' THEN 'SELECT'
              WHEN 'a' THEN 'INSERT'
              WHEN 'w' THEN 'UPDATE'
              WHEN 'd' THEN 'DELETE'
              WHEN '*' THEN 'ALL'
              ELSE pol.polcmd::text
            END,
          'roles', (
            SELECT array_agg(rolname::text)
            FROM pg_roles
            WHERE oid = ANY(pol.polroles)
          ),
          'qual', pg_get_expr(pol.polqual, pol.polrelid),
          'with_check', pg_get_expr(pol.polwithcheck, pol.polrelid)
        )
      ) AS policies
    FROM pg_policy pol
    GROUP BY pol.polrelid
  ) p ON p.relid = c.oid
  WHERE n.nspname = 'public'
    AND c.relkind = 'r'  -- ordinary tables only
  ORDER BY c.relname;
$$;

-- Grant execute to anon (read-only metadata, no data exposure)
GRANT EXECUTE ON FUNCTION public.rls_audit() TO anon, authenticated, service_role;

-- ============================================================================
-- USAGE
-- ============================================================================
--
-- From psql:
--   SELECT * FROM rls_audit();
--
-- From PostgREST / Supabase REST API:
--   POST /rest/v1/rpc/rls_audit  (empty body or {})
--
-- From Python (scripts/phase1_rls_audit.py):
--   SELECT table_name, rls_enabled, policy_count FROM rls_audit()
--   WHERE NOT rls_enabled OR policy_count = 0;
--   -- ^ these are the tables that NEED policies
--
-- ============================================================================
-- ROLLBACK
-- ============================================================================
-- DROP FUNCTION IF EXISTS public.rls_audit();
