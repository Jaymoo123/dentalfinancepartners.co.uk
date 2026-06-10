/**
 * Backwards-compatibility shim. The canonical Organization schema lives in
 * `@/lib/schema/organization` and is composable + canonical-@id'd.
 *
 * This file preserves the legacy `buildOrganizationJsonLd()` so the
 * homepage and any other call-sites keep working unchanged.
 */
import { buildOrganization } from "@/lib/schema";

export function buildOrganizationJsonLd() {
  return buildOrganization();
}
