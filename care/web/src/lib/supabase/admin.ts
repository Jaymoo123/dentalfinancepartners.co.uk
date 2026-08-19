/**
 * Server-only Supabase REST helper (service role) for routes that read/write
 * RLS-protected tables (leads, nurture, etc.).
 *
 * Thin re-export of the shared engine's admin surface so there is a SINGLE
 * implementation. NEVER import into a client component.
 */

export {
  adminConfigured,
  adminSelect,
  adminInsert,
  adminUpdate,
  adminDelete,
  type AdminResult,
} from "@accounting-network/web-shared/nurture/admin";
