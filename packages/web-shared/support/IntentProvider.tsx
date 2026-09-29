"use client";

/**
 * Provides the deterministic intent context, and the site's WidgetConfig, to
 * the help widget. Mounted once (inside AnalyticsProvider) in the root layout.
 * No-ops on the config's `hiddenOnPaths` (e.g. /embed/*, /admin/*) and when the
 * visitor has opted out.
 *
 * SSR-safe: client-only signals (entry/last topic, returning, converted) stay
 * null/false until after mount to avoid a hydration mismatch; the route-derived
 * page topic is deterministic on server and client.
 *
 * Personalisation is unconditionally ON (no experiment arms). The experiment
 * infrastructure has been wound down estate-wide.
 *
 * This is the ONE injection point: the widget reads its config from here, so a
 * site mounts `<IntentProvider config={widgetConfig}><SpecialistWidget /></IntentProvider>`
 * and passes nothing else.
 */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useConsent } from "../analytics/react/ConsentProvider";
import { track } from "../analytics/track";
import {
  getEntryTopic,
  getLastTopic,
  isReturning,
  isConverted,
} from "../analytics/visitMemory";
import { getMaxScrollPct, getEngagedMs } from "../analytics/autoCapture";
import { makeDeriveTopic } from "./deriveTopic";
import { evaluate } from "./engine";
import type { IntentAction, IntentContext, Surface, WidgetConfig } from "./types";

const Ctx = createContext<IntentContext | null>(null);
const ConfigCtx = createContext<WidgetConfig | null>(null);

export function IntentProvider({
  config,
  children,
}: {
  config: WidgetConfig;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { state } = useConsent();
  const path = pathname || "";
  const active = state !== "denied" && !config.hiddenOnPaths.some((p) => path.startsWith(p));

  const deriveTopic = useMemo(() => makeDeriveTopic(config.routeRules), [config.routeRules]);

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
      entryTopic: mounted ? getEntryTopic() : null,
      lastTopic: mounted ? getLastTopic() : null,
      returning: mounted ? isReturning() : false,
      converted: mounted ? isConverted() : false,
      scrollPct: signals.scrollPct,
      engagedMs: signals.engagedMs,
      isMobile: mounted && typeof window !== "undefined" ? window.innerWidth < 640 : false,
    };
  }, [active, pathname, mounted, signals, deriveTopic]);

  return (
    <ConfigCtx.Provider value={config}>
      <Ctx.Provider value={ctx}>{children}</Ctx.Provider>
    </ConfigCtx.Provider>
  );
}

/**
 * Resolved action for a surface (null = render the generic, non-tailored
 * version). The help widget does not use this: it reads the journey model
 * directly. Kept so the estate model stays one implementation.
 */
export function useIntent(surface: Surface): IntentAction | null {
  const ctx = useContext(Ctx);
  const config = useContext(ConfigCtx);
  return useMemo(
    () => (ctx && config ? evaluate(surface, ctx, config.engine) : null),
    [ctx, config, surface],
  );
}

export function useIntentContext(): IntentContext | null {
  return useContext(Ctx);
}

/** The site's widget config, as injected at the mount. */
export function useWidgetConfig(): WidgetConfig | null {
  return useContext(ConfigCtx);
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
  ruleLabel: (ruleId: string) => string,
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
