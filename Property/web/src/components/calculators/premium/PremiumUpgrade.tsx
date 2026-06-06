"use client";

/**
 * Topic → premium tool bridge. Resolves the topic's CategoryResource (for its
 * toolId), looks up the PremiumToolConfig, and renders the PremiumCalculator if
 * one exists — otherwise renders NOTHING. This is the single gate the injection
 * wiring uses, so blog/calculator pages can drop `<PremiumUpgrade topic />` in
 * unconditionally and it only appears once a category's tool is authored.
 *
 * Zero-cost when disabled: the heavy PremiumCalculator (and its recharts chunk)
 * is loaded via next/dynamic ONLY when a config exists, so non-flagship pages do
 * not carry the premium/recharts code in their bundle. Phase A: the premium
 * registry is empty → this always returns null and nothing is ever fetched →
 * the live site bundle is unchanged.
 */
import dynamic from "next/dynamic";
import type { TopicKey } from "@/lib/intent/taxonomy";
import { resourceForTopic } from "@/lib/resources/registry";
import { getPremiumTool } from "@/lib/calculators/premium/registry";

const PremiumCalculator = dynamic(
  () => import("./PremiumCalculator").then((m) => m.PremiumCalculator),
  { ssr: false },
);

export function PremiumUpgrade({ topic }: { topic: TopicKey | null | undefined }) {
  if (!topic) return null;
  const resource = resourceForTopic(topic);
  const config = getPremiumTool(resource?.toolId);
  if (!config) return null;
  return (
    <div className="my-12">
      <PremiumCalculator config={config} />
    </div>
  );
}
