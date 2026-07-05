"use client";

/**
 * Provides the deterministic intent context to personalisation surfaces.
 * Mounted once (after AnalyticsProvider) in the root layout. No-ops in
 * /embed/* and /admin/* and when the visitor has opted out.
 *
 * SSR-safe: client-only signals (entry/last topic, returning, converted) stay
 * null/false until after mount to avoid hydration mismatch; the route-derived
 * page topic is deterministic on server + client.
 *
 * Personalisation is unconditionally ON (no experiment arms). Storage prefix
 * "ma" FROZEN.
 *
 * FLAT-routing note: Medical blog posts use /blog/[slug] with no category
 * segment in the URL. deriveTopic returns null for flat post paths; the topic
 * is resolved server-side from post.category and injected via TopicContext in
 * the blog post renderer.
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
import {
  getMaxScrollPct,
  getEngagedMs,
} from "@accounting-network/web-shared/analytics/autoCapture";
import {
  evaluate,
  type IntentAction,
  type IntentContext,
  type Surface,
} from "@/lib/intent/engine";
import type { TopicKey } from "@/lib/intent/taxonomy";
import { ruleLabel } from "@/lib/intent/labels";

const Ctx = createContext<IntentContext | null>(null);

/**
 * TopicOverrideContext: allows the blog post renderer to inject a server-
 * resolved topic (from post.category) into the intent context for flat-routed
 * blog posts. When this is set it overrides the URL-derived pageTopic.
 */
const TopicOverrideCtx = createContext<TopicKey | null>(null);

export function TopicOverrideProvider({
  topic,
  children,
}: {
  topic: TopicKey | null;
  children: React.ReactNode;
}) {
  return (
    <TopicOverrideCtx.Provider value={topic}>
      {children}
    </TopicOverrideCtx.Provider>
  );
}

export function useTopicOverride(): TopicKey | null {
  return useContext(TopicOverrideCtx);
}

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

  // URL-derived topic (null for flat blog post paths -- they use TopicOverrideCtx)
  const urlTopic = deriveTopic(pathname || "");
  // Topic override from blog renderer (if set, takes precedence over urlTopic)
  const topicOverride = useTopicOverride();
  const pageTopic = topicOverride ?? urlTopic;

  const ctx = useMemo<IntentContext | null>(() => {
    if (!active) return null;
    return {
      pageTopic,
      entryTopic: mounted ? (getEntryTopic() as TopicKey | null) : null,
      lastTopic: mounted ? (getLastTopic() as TopicKey | null) : null,
      returning: mounted ? isReturning() : false,
      converted: mounted ? isConverted() : false,
      scrollPct: signals.scrollPct,
      engagedMs: signals.engagedMs,
      isMobile: mounted && typeof window !== "undefined" ? window.innerWidth < 640 : false,
    };
  }, [active, pageTopic, mounted, signals]);

  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
}

/**
 * Resolved action for a surface (null = render the generic, non-tailored version).
 * Personalisation is unconditionally ON for every visitor.
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
