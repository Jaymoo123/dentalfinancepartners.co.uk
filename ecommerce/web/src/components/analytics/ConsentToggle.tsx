"use client";

/**
 * Quiet analytics opt-out control (footer). Analytics runs by default under
 * legitimate interest (layout.tsx posture="opt-out"); this is the withdrawal
 * route the cookie policy promises. Opting out writes "denied" via the shared
 * consent module, which the SDK and GA loader honour live.
 *
 * PERMANENT, do not delete. An earlier note here said the kit footer supersedes
 * this file. It does not: packages/web-shared/design/chrome/SiteFooter.tsx has no
 * consent affordance of its own, it declares `consentToggle` as a REQUIRED ReactNode
 * prop and renders whatever it is handed. This component is what gets handed to it
 * (see src/components/layout/PageShell.tsx). Deleting it silently breaks the cookie
 * policy's promise of a withdrawal route while every test stays green.
 */
import { useEffect, useState } from "react";
import { focusRing } from "@/components/ui/layout-utils";
import { getConsent, setConsent, type ConsentState } from "@accounting-network/web-shared/analytics/consent";

export function ConsentToggle({ className = "" }: { className?: string }) {
  const [state, setState] = useState<ConsentState>("undecided");
  // ponytail: read after mount — localStorage is client-only, so SSR would mismatch.
  useEffect(() => setState(getConsent()), []);

  const optedOut = state === "denied";
  const toggle = () => {
    const next: ConsentState = optedOut ? "granted" : "denied";
    setConsent(next);
    setState(next);
  };

  return (
    /* The ring is applied HERE, not at the call site, because the call site is
       the kit footer slot in src/components/layout/PageShell.tsx and the ring
       must survive any future re-grounding of that class string. Same single
       mechanism as every other control: outline-[var(--focus-ring)] at
       offset-2. The kit footer paints bg-slate-900 (#0f172a) and carries NO
       .ground-dark, so the token resolves to the light value #8a5e1a there,
       measured at 3.14 on #0f172a - past the 3:1 non-text floor. Adding
       .ground-dark to the kit footer would be the better ring (white, 17.85)
       but that file is the shared kit and is not this site's to change. */
    <button type="button" onClick={toggle} className={`${focusRing} ${className || "underline hover:no-underline"}`}>
      {optedOut ? "Enable analytics" : "Do not track me"}
    </button>
  );
}
