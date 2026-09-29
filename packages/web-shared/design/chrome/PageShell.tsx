"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteFooter, type SiteFooterProps } from "./SiteFooter";
import { SiteHeader, type SiteHeaderProps } from "./SiteHeader";
import type { NavItem } from "./nav";

type PageShellProps = {
  children: ReactNode;
  /**
   * Primary nav, built server-side so the tool registry stays off the client.
   * Shared with SiteFooter so the footer columns mirror the header exactly.
   */
  nav?: NavItem[];
  /** Everything SiteHeader needs beyond `nav` (which PageShell forwards to both). */
  header: Omit<SiteHeaderProps, "nav">;
  /** Everything SiteFooter needs beyond `nav`. */
  footer: Omit<SiteFooterProps, "nav">;
  /**
   * EXTRA chrome-free routes, on top of the built-in `/embed/` prefix below.
   * Unset = only `/embed/` bypasses, exactly as before, so a site that passes
   * nothing takes the identical branch on every path.
   *
   * A predicate rather than a `bypassPrefixes` list, which was the other
   * candidate: the case that asked for this is hospitality's
   * `/research/<slug>/embed`, a SUFFIX, which no prefix list can express, and a
   * prefix list would then need a second escape hatch anyway. One prop that
   * covers both shapes is the smaller kit surface.
   *
   * Safe to pass a function: every site mounts this through its own
   * `components/layout/PageShell.tsx`, which is already `"use client"`, so the
   * predicate never crosses the RSC boundary that forbids function props on the
   * Calculator (see `tools/components/Calculator.tsx`). Do not call it from a
   * server component.
   */
  bypassWhen?: (pathname: string) => boolean;
};

export function PageShell({ children, nav, header, footer, bypassWhen }: PageShellProps) {
  const pathname = usePathname();

  // Embeddable widgets (/embed/*) render chrome-free so they sit natively inside
  // a partner's iframe — no site header, footer, or sticky CTA. The trailing slash
  // matters: "/embed" is the public, indexable gallery where partners come to find
  // the embed codes, and it needs the full site chrome.
  if (pathname?.startsWith("/embed/") || (pathname !== null && pathname !== undefined && bypassWhen?.(pathname))) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-dvh min-w-0 flex-col overflow-x-clip bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary-600 focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader nav={nav} {...header} />
      <main id="main" className="flex-1 scroll-mt-24">
        {children}
      </main>
      <SiteFooter nav={nav} {...footer} />
    </div>
  );
}
