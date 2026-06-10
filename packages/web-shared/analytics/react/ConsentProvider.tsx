"use client";

/**
 * Consent context (track-by-default model: no blocking banner by default).
 * Holds the React-side consent state, exposes useConsent() to the GA/Clarity
 * loader and the opt-out toggle, and stays in sync with the quiet
 * "Do not track me" control. The underlying source of truth is
 * analytics/consent.ts (which the plain-TS SDK also reads).
 *
 * Embed guard: inside /embed/* (or any configured noTrackPrefix) nothing
 * tracks — children render bare.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import {
  getConsent,
  onConsentChange,
  setConsent as persistConsent,
  type ConsentState,
} from "../consent";
import { getSdkConfig } from "../init";

type ConsentContextValue = {
  state: ConsentState;
  accept: () => void;
  reject: () => void;
};

const ConsentContext = createContext<ConsentContextValue>({
  state: "undecided",
  accept: () => {},
  reject: () => {},
});

export const useConsent = () => useContext(ConsentContext);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noTrackPrefixes = getSdkConfig()?.noTrackPrefixes ?? ["/embed", "/admin"];
  const isNoTrack = noTrackPrefixes.some((pfx) => (pathname || "").startsWith(pfx));
  const [state, setState] = useState<ConsentState>("undecided");

  useEffect(() => {
    setState(getConsent());
    return onConsentChange(setState);
  }, []);

  const accept = useCallback(() => {
    persistConsent("granted");
    setState("granted");
  }, []);

  const reject = useCallback(() => {
    persistConsent("denied");
    setState("denied");
  }, []);

  if (isNoTrack) return <>{children}</>;

  return (
    <ConsentContext.Provider value={{ state, accept, reject }}>
      {children}
    </ConsentContext.Provider>
  );
}
