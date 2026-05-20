/**
 * @accounting-network/web-shared
 *
 * Shared React + TypeScript code used by every niche site's Next.js app.
 * Phase 2 of the multi-site infrastructure refactor — see
 * docs/MULTI_SITE_INFRASTRUCTURE.md for migration guide.
 *
 * Consumers should import from specific paths (tree-shakeable) rather than
 * from this root index:
 *
 *   import { submitLead } from "@accounting-network/web-shared/lib/supabase-client";
 *   import { buildLocalBusinessJsonLd } from "@accounting-network/web-shared/lib/local-business-schema";
 */
export * from "./lib/supabase-client";
export * from "./lib/local-business-schema";
