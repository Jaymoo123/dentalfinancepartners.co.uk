/**
 * Server-only Supabase REST helper (service role) for routes that read/write
 * RLS-protected tables (leads, nurture, etc.).
 *
 * Thin re-export of the shared engine's admin surface
 * (packages/web-shared/nurture/admin) so there is a SINGLE implementation.
 * Both read the same SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.
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
