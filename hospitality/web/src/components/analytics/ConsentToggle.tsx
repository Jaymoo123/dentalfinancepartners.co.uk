"use client";

import { useEffect, useState } from "react";
import { getConsent, setConsent, type ConsentState } from "@accounting-network/web-shared/analytics/consent";
import { focusRing } from "@/components/ui/layout-utils";

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
      /* R1 B2 (2026-09-29): the ring lives HERE, not in the caller's class
       * string. This is the site's only opt-out control and the only footer
       * control that is not a link; with no ring recipe it fell to the UA
       * outline, which measured 1.07:1 on the kit footer's slate-900 against a
       * 3:1 floor. focusRing paints outline-[var(--focus-ring)], and the
       * `footer { --focus-ring: var(--focus-ring-on-brand) }` rule in
       * globals.css repaints it white there (17.83). Appended after the
       * caller's className so a caller can restyle colour but cannot drop the
       * ring. */
      className={`${className || "underline hover:no-underline"} ${focusRing}`}
    >
      {optedOut ? "Enable analytics" : "Do not track me"}
    </button>
  );
}
