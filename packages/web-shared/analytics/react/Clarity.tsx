"use client";

/**
 * Microsoft Clarity (session replays + heatmaps) — the qualitative layer over
 * the first-party Supabase system of record.
 *
 * @microsoft/clarity is an OPTIONAL peer dependency. If the consuming site has
 * not installed it, this component is a no-op (the dynamic import fails silently).
 * ConsentedScripts renders this ONLY when the visitor has not opted out.
 *
 * init() installs the global `window.clarity` queue; the rest of the app drives
 * Clarity through that queue (it buffers safely even before init lands).
 * AnalyticsProvider sets cohort tags (visitor/visit-class/topic/device) and
 * track() forwards key conversion events + upgrades high-value sessions through
 * the global queue, avoiding import/timing coupling.
 */
import { useEffect, useRef } from "react";

export function Clarity({ projectId }: { projectId?: string }) {
  const inited = useRef(false);

  useEffect(() => {
    if (!projectId || inited.current) return;
    inited.current = true;
    import("@microsoft/clarity")
      .then(({ default: clarity }) => {
        clarity.init(projectId);
        clarity.consentV2({ ad_Storage: "denied", analytics_Storage: "granted" });
      })
      .catch(() => {});
  }, [projectId]);

  return null;
}
