"use client";

/**
 * Reports real-user Core Web Vitals into our own first-party events (a passive
 * `web_vital` event), so performance can be joined to conversion in our own
 * views — alongside Vercel Speed Insights (the platform dashboard). Mounted only
 * when tracking is granted (AnalyticsProvider gates it); track() is itself a
 * no-op without consent. CLS is stored ×1000 so every metric is a clean integer.
 */
import { useEffect } from "react";
import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from "web-vitals";
import { track } from "@/lib/analytics/track";

export function WebVitals() {
  useEffect(() => {
    const report = (m: Metric) => {
      track("web_vital", {
        metric: m.name,
        value: Math.round(m.name === "CLS" ? m.value * 1000 : m.value),
        rating: m.rating, // "good" | "needs-improvement" | "poor"
        nav_type: m.navigationType || "",
      });
    };
    onLCP(report);
    onINP(report);
    onCLS(report);
    onFCP(report);
    onTTFB(report);
  }, []);
  return null;
}
