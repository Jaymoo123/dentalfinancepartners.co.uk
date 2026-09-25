"use client";

/**
 * Quiet analytics opt-out control (footer). Analytics runs by default under
 * legitimate interest (layout.tsx posture="opt-out"); this is the withdrawal
 * route the cookie policy promises. Opting out writes "denied" via the shared
 * consent module, which the SDK and GA loader honour live.
 *
 * Superseded in phase 1 by packages/web-shared/design/chrome/SiteFooter.tsx,
 * which renders its own toggle. Delete this file with that migration.
 */
import { useEffect, useState } from "react";
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
    <button type="button" onClick={toggle} className={className || "underline hover:no-underline"}>
      {optedOut ? "Enable analytics" : "Do not track me"}
    </button>
  );
}
