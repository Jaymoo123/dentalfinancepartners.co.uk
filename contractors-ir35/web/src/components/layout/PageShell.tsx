import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { ChromeGate } from "./ChromeGate";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { SpecialistWidget } from "@/components/support/SpecialistWidget";

type PageShellProps = {
  children: ReactNode;
};

/**
 * `ChromeGate` renders the `bare` tree on `/embed/<slug>` only. Those documents
 * render inside a third party's iframe, and until 2026-09-13 they shipped our
 * header, our footer, the skip link and about two dozen internal links into
 * partner pages. See ChromeGate for why the fix is not `app/embed/layout.tsx`.
 */
export function PageShell({ children }: PageShellProps) {
  return (
    <ChromeGate bare={children}>
      <div className="flex min-h-dvh min-w-0 flex-col overflow-x-clip bg-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-cyan-700 focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1 scroll-mt-24">
          {children}
        </main>
        <SiteFooter />
        <StickyCTA />
        <SpecialistWidget />
      </div>
    </ChromeGate>
  );
}
