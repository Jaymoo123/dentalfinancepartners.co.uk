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
};

export function PageShell({ children, nav, header, footer }: PageShellProps) {
  const pathname = usePathname();

  // Embeddable widgets (/embed/*) render chrome-free so they sit natively inside
  // a partner's iframe — no site header, footer, or sticky CTA. The trailing slash
  // matters: "/embed" is the public, indexable gallery where partners come to find
  // the embed codes, and it needs the full site chrome.
  if (pathname?.startsWith("/embed/")) {
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
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter nav={nav} {...footer} />
    </div>
  );
}
