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
import { track } from "@accounting-network/web-shared/analytics/track";
import { deriveTopic } from "@/lib/intent/deriveTopic";
import { getEntryTopic, getLastTopic, isReturning, isConverted } from "@accounting-network/web-shared/analytics/visitMemory";
import { getMaxScrollPct, getEngagedMs } from "@accounting-network/web-shared/analytics/autoCapture";
import { evaluate, type IntentAction, type IntentContext, type Surface } from "@/lib/intent/engine";
import type { TopicKey } from "@/lib/intent/taxonomy";
import { ruleLabel } from "@/lib/intent/labels";
import { getVisitorId } from "@accounting-network/web-shared/analytics/ids";
import { assignVariant } from "@/lib/experiments/assign";
import { setActiveExperiment } from "@accounting-network/web-shared/analytics/experiments/active";

/** The personalization A/B: control gets the plain generic experience. */
const PERSONALIZATION_EXP = "personalization";

const Ctx = createContext<IntentContext | null>(null);
/** The visitor's personalization A/B arm ("control" | "treatment" | null). */
const ArmCtx = createContext<string | null>(null);

export function IntentProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state } = useConsent();
  const active =
    state !== "denied" &&
    !(pathname || "").startsWith("/embed") &&
    !(pathname || "").startsWith("/admin");

  const [mounted, setMounted] = useState(false);
  const [signals, setSignals] = useState({ scrollPct: 0, engagedMs: 0 });
  // A/B arm for the personalization experiment. null until assigned after mount
  // (SSR-safe). "control" => suppress personalisation entirely; "treatment" =>
  // run the Part-A behaviour-driven offers.
  const [arm, setArm] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  // Assign the visitor to the running personalization experiment and register
  // the assignment so track() stamps props.exp = "personalization:control|treatment"
  // onto EVERY event (the Experiments dashboard then shows the split automatically).
  useEffect(() => {
    const v = assignVariant(getVisitorId() || "", PERSONALIZATION_EXP);
    if (v) {
      setActiveExperiment(PERSONALIZATION_EXP, v);
      setArm(v);
    }
  }, []);

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

  return (
    <ArmCtx.Provider value={arm}>
      <Ctx.Provider value={ctx}>{children}</Ctx.Provider>
    </ArmCtx.Provider>
  );
}

/**
 * Resolved action for a surface (null = render the generic, non-tailored version).
 *
 * A/B gate: when the visitor is in the experiment CONTROL arm we suppress
 * personalisation entirely and return null, so control sees the plain generic
 * experience. Treatment (and visitors not assigned to the experiment) get the
 * behaviour-driven offer. Either way, props.exp is already stamped on events, so
 * the Experiments panel measures control vs treatment conversion.
 */
export function useIntent(surface: Surface): IntentAction | null {
  const ctx = useContext(Ctx);
  const arm = useContext(ArmCtx);
  return useMemo(() => {
    if (arm === "control") return null; // suppressed for the control arm
    return ctx ? evaluate(surface, ctx) : null;
  }, [ctx, surface, arm]);
}

/** The visitor's personalization A/B arm ("control" | "treatment" | null). */
export function usePersonalizationArm(): string | null {
  return useContext(ArmCtx);
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
    // What the visitor actually saw (the rendered headline/CTA copy) + a human
    // rule name, so the dashboard journey reads in plain English without having
    // to re-derive it from rule_id/topic. `content` now carries the matched
    // asset kind (tool/guide/specialist) so we can see which offer converts.
    content: `${a.offer.kind}: ${a.offer.title}`,
    offer_kind: a.offer.kind,
    offer_href: a.offer.href,
    label: ruleLabel(a.ruleId),
  });
}
