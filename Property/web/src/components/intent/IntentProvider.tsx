"use client";

/**
 * Provides the deterministic intent context to personalization surfaces.
 * Mounted once (after AnalyticsProvider) in the root layout. No-ops in /embed/*
 * and /admin/* and when the visitor has opted out.
 *
 * SSR-safe: client-only signals (entry/last topic, returning, converted) stay
 * null/false until after mount to avoid hydration mismatch; the route-derived
 * page topic is deterministic on server + client. Surfaces tied to the current
 * page topic therefore render identically on both; cross-session tailoring
 * (returning bar, escalation) appears after mount.
 */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useConsent } from "../analytics/ConsentProvider";
import { track } from "@/lib/analytics/track";
import { deriveTopic } from "@/lib/intent/deriveTopic";
import { getEntryTopic, getLastTopic, isReturning, isConverted } from "@/lib/intent/session";
import { getMaxScrollPct, getEngagedMs } from "@/lib/analytics/autoCapture";
import { evaluate, type IntentAction, type IntentContext, type Surface } from "@/lib/intent/engine";
import type { TopicKey } from "@/lib/intent/taxonomy";

const Ctx = createContext<IntentContext | null>(null);

export function IntentProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state } = useConsent();
  const active =
    state !== "denied" &&
    !(pathname || "").startsWith("/embed") &&
    !(pathname || "").startsWith("/admin");

  const [mounted, setMounted] = useState(false);
  const [signals, setSignals] = useState({ scrollPct: 0, engagedMs: 0 });

  useEffect(() => setMounted(true), []);

  // Poll live scroll/engagement on a low-frequency tick (drives the deep-scroll
  // modal + specialist escalation). Only updates state when a value moved.
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      const scrollPct = getMaxScrollPct();
      const engagedMs = getEngagedMs();
      setSignals((prev) =>
        prev.scrollPct === scrollPct && prev.engagedMs === engagedMs
          ? prev
          : { scrollPct, engagedMs },
      );
    }, 1500);
    return () => clearInterval(id);
  }, [active, pathname]);

  const ctx = useMemo<IntentContext | null>(() => {
    if (!active) return null;
    return {
      pageTopic: deriveTopic(pathname || ""),
      entryTopic: mounted ? (getEntryTopic() as TopicKey | null) : null,
      lastTopic: mounted ? (getLastTopic() as TopicKey | null) : null,
      returning: mounted ? isReturning() : false,
      converted: mounted ? isConverted() : false,
      scrollPct: signals.scrollPct,
      engagedMs: signals.engagedMs,
      isMobile: mounted && typeof window !== "undefined" ? window.innerWidth < 640 : false,
    };
  }, [active, pathname, mounted, signals]);

  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
}

/** Resolved action for a surface (null = render the generic, non-tailored version). */
export function useIntent(surface: Surface): IntentAction | null {
  const ctx = useContext(Ctx);
  return useMemo(() => (ctx ? evaluate(surface, ctx) : null), [ctx, surface]);
}

export function useIntentContext(): IntentContext | null {
  return useContext(Ctx);
}

const PERSONALIZATION_EVENT = {
  shown: "personalization_shown",
  clicked: "personalization_clicked",
  dismissed: "personalization_dismissed",
} as const;

/** Emit a personalization measurement event (shown/clicked/dismissed). */
export function trackPersonalization(
  kind: keyof typeof PERSONALIZATION_EVENT,
  a: IntentAction,
): void {
  track(PERSONALIZATION_EVENT[kind], {
    rule_id: a.ruleId,
    topic: a.topic,
    surface: a.surface,
    variant: a.variant,
  });
}
