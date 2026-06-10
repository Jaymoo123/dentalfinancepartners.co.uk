"use client";

/**
 * Reports real-user Core Web Vitals into our own first-party events (a passive
 * `web_vital` event), so performance can be joined to conversion in our own views.
 *
 * `web-vitals` is an OPTIONAL peer dependency. If the consuming site has not
 * installed it, this component is a no-op (the dynamic import fails silently).
 * CLS is stored ×1000 so every metric is a clean integer.
 * Mount only when tracking is granted (AnalyticsProvider gates it via WebVitals).
 */
import { useEffect } from "react";
import { track } from "../track";

type Metric = { name: string; value: number; rating: string; navigationType?: string };

export function WebVitals() {
  useEffect(() => {
    const report = (m: Metric) => {
      track("web_vital", {
        metric: m.name,
        value: Math.round(m.name === "CLS" ? m.value * 1000 : m.value),
        rating: m.rating,
        nav_type: m.navigationType || "",
      });
    };

    import("web-vitals")
      .then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
        (onLCP as (fn: (m: Metric) => void) => void)(report);
        (onINP as (fn: (m: Metric) => void) => void)(report);
        (onCLS as (fn: (m: Metric) => void) => void)(report);
        (onFCP as (fn: (m: Metric) => void) => void)(report);
        (onTTFB as (fn: (m: Metric) => void) => void)(report);
      })
      .catch(() => {});
  }, []);
  return null;
}
