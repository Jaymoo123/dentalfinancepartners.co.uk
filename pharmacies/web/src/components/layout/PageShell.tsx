"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { StickyCTA } from "@/components/ui/StickyCTA";

type PageShellProps = { children: ReactNode };

export function PageShell({ children }: PageShellProps) {
  const pathname = usePathname();

  // Embeddable widgets (/embed/<slug>) render chrome-free so they sit natively
  // inside a partner's iframe: no site header, footer, or sticky CTA.
  // Pattern copied from Property/web/src/components/layout/PageShell.tsx.
  if (pathname?.startsWith("/embed/")) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <StickyCTA />
    </>
  );
}
