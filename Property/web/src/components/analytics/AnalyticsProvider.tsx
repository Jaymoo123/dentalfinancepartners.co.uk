"use client";

/**
 * Boots the first-party analytics SDK and fires page_view on every App-Router
 * navigation. Mounted once in the root layout, inside the body.
 *
 * Consent: track-by-default (legitimate-interest). The SDK runs unless the
 * visitor explicitly opts out ("denied" in localStorage); track() re-checks on
 * every call so an opt-out takes effect live.
 *
 * No-track routes: /embed/* (partner iframes, where we can't obtain consent
 * inside someone else's site, so embed attribution stays on the UTM-tagged
 * EmbedCta link) and /admin/* (our own dashboard; don't pollute the data we
 * measure).
 */
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { configureAnalytics, track } from "@/lib/analytics/track";
import { installAutoCapture, resetForNavigation } from "@/lib/analytics/autoCapture";
import { isNewSession, getVisitorId } from "@/lib/analytics/ids";
import { deriveTopic } from "@/lib/intent/deriveTopic";
import { recordEntryTopic, recordTopicVisit, bumpVisits, isReturning } from "@/lib/intent/session";
import { useConsent } from "./ConsentProvider";
import { WebVitals } from "./WebVitals";

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

/**
 * The page's readable title for the journey view ("Opened: <article title>"
 * rather than a raw URL). Not PII. Strips the " | Property Tax Partners" site
 * suffix so the dashboard shows just the page's own name.
 */
function readablePageTitle(): string {
  if (typeof document === "undefined") return "";
  const raw = (document.title || "").trim();
  // Drop the trailing site-name suffix (handles "·"/"-"/"|" separators).
  const stripped = raw.replace(/\s*[|·-]\s*Property Tax Partners\s*$/i, "").trim();
  return (stripped || raw).slice(0, 200);
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
    page_title: readablePageTitle(),
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
  // Don't track partner embeds (can't consent in someone else's iframe) or our
  // own /admin dashboard (would pollute the very data we're measuring).
  const noTrack = (pathname || "").startsWith("/embed") || (pathname || "").startsWith("/admin");
  // Track by default; only an explicit opt-out ("denied") stops it. (track()
  // also re-checks localStorage on every call, so opt-out is honoured live.)
  const granted = state !== "denied" && !noTrack;
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

    // Intent capture: topic is derived from the route (no per-page wiring).
    bumpVisits(isEntry);
    const topic = deriveTopic(pathname || "");
    recordEntryTopic(topic); // landing topic = search-intent proxy (first wins)
    recordTopicVisit(topic); // most-recent topic, for returning-visitor tailoring

    const props = pageViewProps(isEntry);
    if (topic) props.page_topic = topic;
    if (isEntry) props.entry_topic = topic ?? "";
    props.visit_class = isReturning() ? "returning" : "new";
    track("page_view", props);

    // Tag the Microsoft Clarity session with our own cohorts so replays/heatmaps
    // are filterable (e.g. watch the rage-click sessions for a topic). visitor_id
    // is a random id, not PII. No-op when Clarity isn't loaded.
    const w = window as unknown as { clarity?: (...args: unknown[]) => void };
    if (typeof w.clarity === "function") {
      w.clarity("set", "visitor_id", getVisitorId() || "");
      w.clarity("set", "visit_class", isReturning() ? "returning" : "new");
      w.clarity("set", "device", deviceType());
      if (topic) w.clarity("set", "topic", topic);
    }
  }, [pathname, granted]);

  return (
    <>
      {granted && <WebVitals />}
      {children}
    </>
  );
}
