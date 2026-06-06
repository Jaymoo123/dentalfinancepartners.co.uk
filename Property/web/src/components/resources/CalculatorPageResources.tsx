"use client";

/**
 * Additive premium-tool + resource-gate island for calculator pages.
 *
 * Resolves the topic from the calculator SLUG, then renders the premium tool
 * (if a config exists) and the resource gate (if a category asset is enabled)
 * BELOW the existing calculator. The existing calculator stays the indexable
 * hero — this never touches its server-rendered copy/H1/explainer/FAQ/schema.
 *
 * Phase A: no premium config + every asset disabled → renders NOTHING, so the
 * calculator pages are unchanged (the heavy gate/tool code is loaded via
 * next/dynamic only when an asset/config actually exists, so the page bundle is
 * byte-for-byte the same until a category is onboarded). Drop
 * `<CalculatorPageResources slug={...} />` below a calculator and it lights up
 * only when that category is onboarded.
 */
import dynamic from "next/dynamic";
import { topicForCalcSlug } from "@/lib/intent/taxonomy";
import {
  hasEnabledResource,
  resourceForTopic,
} from "@/lib/resources/registry";
import { hasPremiumTool } from "@/lib/calculators/premium/registry";
import { gateCopy } from "@/lib/resources/copy";
import { PremiumUpgrade } from "@/components/calculators/premium/PremiumUpgrade";

const ResourceGate = dynamic(
  () => import("@/components/resources/ResourceGate").then((m) => m.ResourceGate),
  { ssr: false },
);

export function CalculatorPageResources({
  slug,
  pageTitle,
}: {
  slug: string;
  pageTitle?: string;
}) {
  const topic = topicForCalcSlug(slug);
  if (!topic) return null;

  const hasPremium = hasPremiumTool(resourceForTopic(topic)?.toolId);
  const hasGate = hasEnabledResource(topic);
  if (!hasPremium && !hasGate) return null;

  return (
    <div className="mx-auto max-w-5xl px-0">
      {hasPremium ? <PremiumUpgrade topic={topic} /> : null}
      {hasGate ? <ResourceGate topic={topic} copy={gateCopy(topic, pageTitle)} /> : null}
    </div>
  );
}
