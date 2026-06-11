"use client";

/**
 * Boots the first-party analytics SDK and fires page_view on every App-Router
 * navigation. Mount once in the root layout, inside ConsentProvider.
 *
 * Couplings broken vs Property's local version:
 *   1. deriveTopic injected via initAnalytics (no site-specific taxonomy import)
 *   2. Site-name suffix strip reads siteName from SDK config, not hardcoded
 *   3. No-track routes read noTrackPrefixes from SDK config
 *
 * Intent/visit memory is imported from ../visitMemory (shared; not site-local).
 */
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { configureAnalytics, track } from "../track";
import { initAnalytics, getSdkConfig, type AnalyticsInitOptions } from "../init";
import { installAutoCapture, resetForNavigation } from "../autoCapture";
import { isNewSession, getVisitorId } from "../ids";
import { bumpVisits, isReturning, recordEntryTopic, recordTopicVisit } from "../visitMemory";
import { useConsent } from "./ConsentProvider";
import { WebVitals } from "./WebVitals";
import { runLegacyMigration } from "../ids";

type AnalyticsProviderProps = Omit<AnalyticsInitOptions, "noTrackPrefixes"> & {
  noTrackPrefixes?: string[];
  children: React.ReactNode;
};

function deviceType(): string {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function readablePageTitle(): string {
  if (typeof document === "undefined") return "";
  const raw = (document.title || "").trim();
  const siteName = getSdkConfig()?.siteName ?? "";
  if (!siteName) return raw.slice(0, 200);
  const escaped = siteName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const stripped = raw.replace(new RegExp(`\\s*[|·\\-]\\s*${escaped}\\s*$`, "i"), "").trim();
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

export function AnalyticsProvider({
  siteKey,
  siteName,
  storagePrefix,
  legacyPrefix,
  posture,
  noTrackPrefixes = ["/embed", "/admin"],
  deriveTopic,
  children,
}: AnalyticsProviderProps) {
  const pathname = usePathname();
  const { state } = useConsent();
  const noTrack = noTrackPrefixes.some((pfx) => (pathname || "").startsWith(pfx));
  const granted = state !== "denied" && !noTrack;
  const firstViewRef = useRef(true);

  // Config MUST land before any child's useEffect runs. React runs effects
  // child-first, so configuring inside this provider's own effect created a
  // window where a child (e.g. an experiment-assigning component) called
  // getVisitorId() pre-config and minted a throwaway id under the fallback
  // prefix - decoupling experiment assignment from the real visitor identity
  // (found live on Property, 2026-06-11). Lazy render-phase init is idempotent
  // and runs before ALL effects, closing the race for every descendant.
  const initedRef = useRef(false);
  if (typeof window !== "undefined" && !initedRef.current) {
    initAnalytics({ siteKey, siteName, storagePrefix, legacyPrefix, posture, noTrackPrefixes, deriveTopic });
    initedRef.current = true;
  }

  // Install auto-capture + start ingest unless opted out.
  useEffect(() => {
    if (!granted) return;
    initAnalytics({ siteKey, siteName, storagePrefix, legacyPrefix, posture, noTrackPrefixes, deriveTopic });
    runLegacyMigration();
    configureAnalytics({ siteKey, isEmbed: false }); // triggers pre-config buffer replay
    const capture = installAutoCapture();
    return () => capture.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [granted, siteKey]);

  // Fire page_view on load and every client navigation.
  useEffect(() => {
    if (!granted) return;
    const isEntry = firstViewRef.current && isNewSession();
    firstViewRef.current = false;
    resetForNavigation();

    bumpVisits(isEntry);
    const topic = deriveTopic ? deriveTopic(pathname || "") : null;
    recordEntryTopic(topic);
    recordTopicVisit(topic);

    const props = pageViewProps(isEntry);
    if (topic) props.page_topic = topic;
    if (isEntry) props.entry_topic = topic ?? "";
    props.visit_class = isReturning() ? "returning" : "new";
    track("page_view", props);

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
