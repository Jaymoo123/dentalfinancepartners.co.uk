"use client";

/**
 * Client boundary that hands this site's `widgetConfig` to the kit's
 * IntentProvider.
 *
 * It exists because `app/layout.tsx` is a Server Component and the config
 * carries functions (the taxonomy lookups, the openers, the offer builders,
 * the submit client), which cannot cross a server-to-client prop boundary.
 * Everything below this file is the kit's
 * (@accounting-network/web-shared/support); this file adds no behaviour.
 *
 * This is the ONE intent provider on this site. The kit provider supplies both
 * the widget's config AND the `useIntent(surface)` hook the sticky bar, the
 * returning bar, the deep-scroll modal and the next-step card read, so there is
 * no second, forked provider to collide with. W7 receipt records the reason.
 */
import { IntentProvider } from "@accounting-network/web-shared/support/IntentProvider";
import { widgetConfig } from "@/lib/intent/widget-config";

export function SupportProvider({ children }: { children: React.ReactNode }) {
  return <IntentProvider config={widgetConfig}>{children}</IntentProvider>;
}
