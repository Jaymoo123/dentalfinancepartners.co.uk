"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import type { NavItem } from "@/config/site";

type PageShellProps = {
  children: ReactNode;
  /**
   * Primary nav, built server-side so the tool registry stays off the client.
   * Shared with SiteFooter so the footer columns mirror the header exactly.
   */
  nav?: NavItem[];
};

export function PageShell({ children, nav }: PageShellProps) {
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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-emerald-600 focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader nav={nav} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
