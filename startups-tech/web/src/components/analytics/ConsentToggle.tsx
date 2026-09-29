"use client";

/**
 * Quiet analytics opt-out control (footer). Analytics runs by default under
 * legitimate interest (`layout.tsx` posture="opt-out"); this is the on-site
 * withdrawal route. Opting out writes "denied" through the shared consent
 * module, which the SDK and the GA loader honour live.
 *
 * PERMANENT, do not delete. `packages/web-shared/design/chrome/SiteFooter.tsx`
 * has NO consent affordance of its own: it declares `consentToggle` as a
 * REQUIRED ReactNode prop and renders whatever it is handed. This component is
 * what gets handed to it (see `src/components/layout/PageShell.tsx`). Deleting
 * it removes the site's only opt-out affordance while every test stays green.
 *
 * It is a control, not an interruption: no banner, no modal, no popup. The
 * site's cookie policy currently names only the Google Analytics browser add-on
 * as the opt-out route, so this button is an addition to what that page
 * promises rather than a claim it already makes. Phase 6 or the compliance
 * sweep owns whether the cookie policy should now name it; changing that copy is
 * out of this package's scope.
 */
import { useEffect, useState } from "react";
import { focusRing } from "@/components/ui/layout-utils";
import { getConsent, setConsent, type ConsentState } from "@accounting-network/web-shared/analytics/consent";

export function ConsentToggle({ className = "" }: { className?: string }) {
  const [state, setState] = useState<ConsentState>("undecided");
  // ponytail: read after mount. localStorage is client-only, so reading it
  // during render would mismatch the server HTML.
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
       must survive any future re-grounding of that class string. */
    <button type="button" onClick={toggle} className={`${focusRing} ${className || "underline hover:no-underline"}`}>
      {optedOut ? "Enable analytics" : "Do not track me"}
    </button>
  );
}
