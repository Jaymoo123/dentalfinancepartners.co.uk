"use client";

/**
 * Reports real-user Core Web Vitals into our own first-party events (a passive
 * `web_vital` event), so performance can be joined to conversion in our own views.
 *
 * `web-vitals` is a REAL dependency of this package, not the optional peer this
 * comment used to claim. The .catch() below only ever swallows RUNTIME failures:
 * webpack resolves a dynamic import at BUILD time, so a consumer without the
 * module gets "Module not found", a hard build failure, not a silent no-op. That
 * bit every site except Property on 2026-08-16 (only Property declared it, and
 * the others had been resolving it by accident through workspace hoisting until
 * the .vercelignore allowlist stopped uploading Property's package.json to their
 * builds). A package must declare what it imports.
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
