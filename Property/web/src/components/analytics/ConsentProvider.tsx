"use client";

/**
 * Consent context (track-by-default model: no blocking banner). Holds the
 * React-side consent state, exposes useConsent() to the GA/Clarity loader and
 * the opt-out toggle, and stays in sync with the quiet "Do not track me"
 * control. The underlying source of truth is lib/analytics/consent.ts (which the
 * plain-TS SDK also reads).
 *
 * Embed guard: inside /embed/* (partner iframes) nothing tracks — children
 * render bare.
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
} from "@/lib/analytics/consent";

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
  const isEmbed = (pathname || "").startsWith("/embed");
  // Start "undecided" on both server and first client render to avoid a
  // hydration mismatch; read the persisted choice after mount.
  const [state, setState] = useState<ConsentState>("undecided");

  // Read the persisted choice after mount, and stay in sync if the opt-out
  // toggle changes it elsewhere (so GA/Clarity unmount immediately on opt-out).
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

  if (isEmbed) return <>{children}</>;

  return (
    <ConsentContext.Provider value={{ state, accept, reject }}>
      {children}
    </ConsentContext.Provider>
  );
}
