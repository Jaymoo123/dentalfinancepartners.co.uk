/**
 * Server-only Supabase REST helper (service role) for routes that read/write
 * RLS-protected tables (leads, nurture, subscribers, etc.).
 *
 * Thin re-export of the shared engine's admin surface so there is a SINGLE
 * implementation: any hardening lives in one place and cannot silently diverge.
 * Both read the same SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY, so at runtime
 * they always target the same database.
 *
 * NEVER import into a client component: SUPABASE_SERVICE_ROLE_KEY is server-only.
 */

export {
  adminConfigured,
  adminSelect,
  adminInsert,
  adminUpdate,
  adminDelete,
  type AdminResult,
} from "@accounting-network/web-shared/nurture/admin";
