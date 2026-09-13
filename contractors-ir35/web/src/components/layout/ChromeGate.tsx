"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Renders `bare` instead of the site chrome on the partner-embed tool routes.
 *
 * WHY THIS IS NOT `src/app/embed/layout.tsx`. `PageShell` is mounted in the
 * ROOT layout (`src/app/layout.tsx`), and there is exactly one layout file on
 * this site. A nested layout NESTS INSIDE the root layout, it does not replace
 * it, so `src/app/embed/layout.tsx` would render `{children}` inside the header
 * and footer it was supposed to remove. Escaping a root layout needs multiple
 * root layouts (route groups, a moved `app/layout.tsx`, every route
 * re-parented), which is a far larger change than the defect warrants. The
 * pathname gate is the same mechanism `StickyCTA` and `SpecialistWidget`
 * already use to opt out of `/embed`.
 *
 * SCOPE IS `/embed/<slug>`, NOT `/embed`. `/embed` is the partner-facing
 * gallery: a real, indexable page of ours that emits the ten
 * `/calculators/<slug>` preview links and needs its navigation and its footer
 * legal links. Only the documents that render INSIDE a third party's iframe
 * lose the chrome.
 *
 * The header and footer are passed in as already-constructed nodes, so they
 * stay server-rendered; only the choice between the two trees is client-side.
 */
export function ChromeGate({ children, bare }: { children: ReactNode; bare: ReactNode }) {
  const pathname = usePathname() || "";
  return pathname.startsWith("/embed/") ? <>{bare}</> : <>{children}</>;
}
