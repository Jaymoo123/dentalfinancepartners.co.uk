import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { ChromeGate } from "./ChromeGate";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { focusRing } from "@/components/ui/layout-utils";
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
        {/* Skip link. The ground is the brand token, not a literal `bg-cyan-700`:
            both resolve to #0e7490 today, so this is a no-op on screen, but the
            hex-named utility was the last place on this site where the brand was
            spelled out instead of referenced. White on it = 5.36, PASS 4.5.
            `focusRing` is appended because the link is keyboard-only by
            construction; at offset-2 the ring sits on the page ground
            (`bg-white` on the wrapper below), where #0891b2 = 3.68, PASS 3.0. */}
        <a
          href="#main"
          className={`sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[var(--brand-primary-ground)] focus:px-3 focus:py-2 focus:text-white ${focusRing}`}
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
