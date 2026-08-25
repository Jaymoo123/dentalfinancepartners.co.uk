"use client";

/**
 * Quiet analytics opt-out control (footer). First-party analytics runs by
 * default under legitimate interest (opt-out posture); this lets a visitor opt
 * out (or back in). Opting out writes "denied" to localStorage, which the SDK
 * honours live.
 *
 * This control fulfils the "Do not track me" promise in the privacy policy
 * (layout.tsx comment line 81: "Visitor can opt out via the 'Do not track me'
 * footer link").
 */
import { useEffect, useState } from "react";
import { getConsent, setConsent, type ConsentState } from "@accounting-network/web-shared/analytics/consent";

export function ConsentToggle({ className = "" }: { className?: string }) {
  const [state, setState] = useState<ConsentState>("undecided");
  useEffect(() => setState(getConsent()), []);

  const optedOut = state === "denied";
  const toggle = () => {
    const next: ConsentState = optedOut ? "granted" : "denied";
    setConsent(next);
    setState(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={className || "underline hover:no-underline"}
    >
      {optedOut ? "Enable analytics" : "Do not track me"}
    </button>
  );
}
