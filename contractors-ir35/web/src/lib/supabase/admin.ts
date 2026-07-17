/**
 * Server-only Supabase REST helper (service role).
 * Thin re-export of the shared engine's admin surface.
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
