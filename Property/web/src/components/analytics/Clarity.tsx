"use client";

/**
 * Microsoft Clarity (session replays + heatmaps + Copilot) — the qualitative
 * layer over the first-party Supabase system of record.
 *
 * Loaded via the official @microsoft/clarity package. ConsentedScripts renders
 * this ONLY when the visitor has not opted out, and it no-ops unless
 * NEXT_PUBLIC_CLARITY_ID is set, so Clarity is inert until configured.
 *
 * init() installs the global `window.clarity` queue; the rest of the app drives
 * Clarity through that queue (it buffers safely even before init lands):
 *   - AnalyticsProvider sets cohort tags (visitor/visit-class/topic/device), and
 *   - track() forwards key conversion events + upgrades high-value sessions.
 * Keeping those on the global queue avoids import/timing coupling while this
 * component owns init + consent.
 */
import { useEffect, useRef } from "react";
import clarity from "@microsoft/clarity";

export function Clarity({ projectId }: { projectId?: string }) {
  const inited = useRef(false);

  useEffect(() => {
    if (!projectId || inited.current) return;
    inited.current = true;
    clarity.init(projectId);
    // Analytics-only consent: replays/heatmaps run under the site's
    // legitimate-interest analytics posture, never for advertising. Only reached
    // when the visitor has NOT opted out (ConsentedScripts gates the mount).
    clarity.consentV2({ ad_Storage: "denied", analytics_Storage: "granted" });
  }, [projectId]);

  return null;
}
