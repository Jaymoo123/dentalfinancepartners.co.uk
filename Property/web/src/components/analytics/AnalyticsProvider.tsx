"use client";

/**
 * Boots the first-party analytics SDK and fires page_view on every App-Router
 * navigation. Mounted once in the root layout, inside the body.
 *
 * Consent: the SDK itself no-ops until consent === 'granted', so this provider
 * can mount unconditionally; nothing leaves the browser pre-consent.
 *
 * Embed guard: PageShell renders children on /embed/* (partner iframes). Under
 * the gate-everything model we cannot obtain consent inside someone else's site,
 * so we DO NOT first-party-track embeds — their attribution stays on the
 * UTM-tagged /contact link in EmbedCta. The provider becomes a no-op there.
 */
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { configureAnalytics, track } from "@/lib/analytics/track";
import { installAutoCapture, resetForNavigation } from "@/lib/analytics/autoCapture";
import { isNewSession } from "@/lib/analytics/ids";
import { useConsent } from "./ConsentProvider";

type AnalyticsProviderProps = {
  siteKey: string;
  children: React.ReactNode;
};

function deviceType(): string {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function pageViewProps(isEntry: boolean): Record<string, string | number | boolean> {
  const params = new URLSearchParams(window.location.search);
  const ref = document.referrer || "";
  let refHost = "";
  try {
    refHost = ref ? new URL(ref).host : "";
  } catch {
    refHost = "";
  }
  return {
    referrer: ref.slice(0, 300),
    referrer_host: refHost,
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
    device_type: deviceType(),
    viewport_w: window.innerWidth,
    viewport_h: window.innerHeight,
    is_entry: isEntry,
  };
}

export function AnalyticsProvider({ siteKey, children }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const { state } = useConsent();
  const isEmbed = (pathname || "").startsWith("/embed");
  // Track by default; only an explicit opt-out ("denied") stops it. (track()
  // also re-checks localStorage on every call, so opt-out is honoured live.)
  const granted = state !== "denied" && !isEmbed;
  const firstViewRef = useRef(true);

  // Configure + install auto-capture unless opted out (never in embeds).
  useEffect(() => {
    if (!granted) return;
    configureAnalytics({ siteKey, isEmbed: false });
    const capture = installAutoCapture();
    return () => capture.destroy();
  }, [granted, siteKey]);

  // Fire page_view on load and every client navigation (unless opted out).
  useEffect(() => {
    if (!granted) return;
    const isEntry = firstViewRef.current && isNewSession();
    firstViewRef.current = false;
    resetForNavigation();
    track("page_view", pageViewProps(isEntry));
  }, [pathname, granted]);

  return <>{children}</>;
}
