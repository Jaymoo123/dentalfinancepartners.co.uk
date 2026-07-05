/**
 * Topic-to-tool spine for the Medical Accountants UK premium tier.
 *
 * Maps each Medical TopicKey to a premium toolId. The PremiumUpgrade component
 * uses this to resolve topic -> toolId -> PremiumToolConfig. Topics with no
 * registered premium tool carry an empty string toolId, which hasPremiumTool()
 * will return false for, so those posts remain unchanged.
 *
 * R2 mapping (brief Section 3):
 *   nhs-pension          -> nhs-pension-premium        (Tool 1: flagship)
 *   locum                -> locum-take-home-premium    (Tool 2)
 *   gp-tax               -> locum-take-home-premium    (Tool 2: gp-tax framing, same tool)
 *   incorporation-private -> incorporation-premium     (Tool 3)
 *   gp-practice          -> ""                         (specialist-contact topic, no calculator)
 *
 * gp-practice maps to an empty toolId (like Dentists compliance), so those 36
 * posts remain untouched and the island renders nothing.
 *
 * Storage prefix: ma (FROZEN). Never ptp: or dfp:.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export interface TopicResource {
  /** premium toolId; empty string = no premium tool for this topic in R2. */
  toolId: string;
}

export const TOPIC_RESOURCES: Record<TopicKey, TopicResource> = {
  "nhs-pension":          { toolId: "nhs-pension-premium" },
  "locum":                { toolId: "locum-take-home-premium" },
  "gp-tax":               { toolId: "locum-take-home-premium" },
  "incorporation-private": { toolId: "incorporation-premium" },
  "gp-practice":          { toolId: "" },
};

/** Returns the TopicResource for a topic, or null when the topic is not in the map. */
export function resourceForTopic(topic: TopicKey | null | undefined): TopicResource | null {
  if (!topic) return null;
  return TOPIC_RESOURCES[topic] ?? null;
}
