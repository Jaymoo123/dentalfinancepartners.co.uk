import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { ExitIntentModal } from "@/components/blog/ExitIntentModal";
import { SpecialistWidget } from "@/components/support/SpecialistWidget";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex min-h-dvh min-w-0 flex-col overflow-x-clip bg-[var(--background)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[var(--accent)] focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <StickyCTA />
      <ExitIntentModal />
      {/* SpecialistWidget: deterministic Phase-0 assistant (no LLM).
          Mounted next to ExitIntentModal so both overlays share the same z-index
          layer. Sets ma_assistant_active="1" on mount; ExitIntentModal reads this
          at line 91 to suppress itself while the widget is open. */}
      <SpecialistWidget />
    </div>
  );
}
