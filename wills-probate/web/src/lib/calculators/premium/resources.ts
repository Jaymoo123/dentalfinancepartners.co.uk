/**
 * Topic-to-tool spine for the wills-probate premium tier.
 *
 * Maps each TopicKey to a premium toolId. The PremiumUpgrade component
 * uses this to resolve topic -> toolId -> PremiumToolConfig. Topics with no
 * registered premium tool carry an empty string toolId, which hasPremiumTool()
 * returns false for, so those posts remain unchanged.
 *
 * PLACEHOLDER — the premium tool fleet does not exist yet (premium/registry.ts
 * is empty), so every topic maps to "" until Phase 2 builds the tools.
 *
 * Storage prefix: wpc (FROZEN). Grid keys: wpc:grid:<toolId>.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export interface TopicResource {
  /** premium toolId; empty string = no premium tool for this topic yet. */
  toolId: string;
}

export const TOPIC_RESOURCES: Record<TopicKey, TopicResource> = {
  "probate-cost":        { toolId: "" },
  "do-i-need-probate":   { toolId: "" },
  "inheritance-tax":     { toolId: "" },
  "probate-timeline":    { toolId: "" },
  "pensions-iht-2027":   { toolId: "" },
  "diy-vs-solicitor":    { toolId: "" },
};

/** Returns the TopicResource for a topic, or null when the topic is not in the map. */
export function resourceForTopic(topic: TopicKey | null | undefined): TopicResource | null {
  if (!topic) return null;
  return TOPIC_RESOURCES[topic] ?? null;
}
