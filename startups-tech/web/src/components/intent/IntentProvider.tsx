"use client";

/**
 * Provides the deterministic intent context to the help widget.
 * Mounted once (inside AnalyticsProvider) in the root layout. No-ops in
 * /embed/* and /admin/* and when the visitor has opted out.
 *
 * SSR-safe: client-only signals (entry/last topic, returning, converted) stay
 * null/false until after mount to avoid a hydration mismatch; the route-derived
 * page topic is deterministic on server and client.
 *
 * Personalisation is unconditionally ON (no experiment arms). The experiment
 * infrastructure has been wound down estate-wide.
 */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useConsent } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { track } from "@accounting-network/web-shared/analytics/track";
import { deriveTopic } from "@/lib/intent/deriveTopic";
import {
  getEntryTopic,
  getLastTopic,
  isReturning,
  isConverted,
} from "@accounting-network/web-shared/analytics/visitMemory";
import { getMaxScrollPct, getEngagedMs } from "@accounting-network/web-shared/analytics/autoCapture";
import { evaluate, type IntentAction, type IntentContext, type Surface } from "@/lib/intent/engine";
import type { TopicKey } from "@/lib/intent/taxonomy";
import { ruleLabel } from "@/lib/intent/labels";

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

  // Poll live scroll/engagement on a low-frequency tick. Only updates state
  // when a value actually moved.
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

/**
 * Resolved action for a surface (null = render the generic, non-tailored
 * version). No surface on this site consumes this today: the help widget reads
 * the journey model directly. Kept so the estate model stays one implementation.
 */
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

/** Emit a personalisation measurement event (shown/clicked/dismissed). */
export function trackPersonalization(
  kind: keyof typeof PERSONALIZATION_EVENT,
  a: IntentAction,
): void {
  track(PERSONALIZATION_EVENT[kind], {
    rule_id: a.ruleId,
    topic: a.topic,
    surface: a.surface,
    variant: a.variant,
    content: `${a.offer.kind}: ${a.offer.title}`,
    offer_kind: a.offer.kind,
    offer_href: a.offer.href,
    label: ruleLabel(a.ruleId),
  });
}
