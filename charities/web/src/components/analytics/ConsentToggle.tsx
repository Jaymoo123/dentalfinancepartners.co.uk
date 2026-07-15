"use client";

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
    <button type="button" onClick={toggle} className={className || "underline hover:no-underline"}>
      {optedOut ? "Enable analytics" : "Do not track me"}
    </button>
  );
}
