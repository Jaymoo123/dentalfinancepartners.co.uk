/**
 * Topic-to-tool spine for the construction-cis premium tier.
 *
 * Maps each TopicKey to a premium toolId. The PremiumUpgrade component
 * uses this to resolve topic -> toolId -> PremiumToolConfig. Topics with no
 * registered premium tool carry an empty string toolId, which hasPremiumTool()
 * returns false for, so those posts remain unchanged.
 *
 * R2 mapping (brief Section 1):
 *   cis-refund          -> cis-refund-planner-premium  (Tool 1, primary)
 *   cis-deductions      -> cis-refund-planner-premium  (defensive alias: deduction front half)
 *   gross-payment-status-> cis-gps-readiness-premium   (Tool 3)
 *   limited-company     -> cis-vs-paye-premium         (Tool 2)
 *   self-assessment     -> ""                          (no dedicated tool in R2)
 *   vat-reverse-charge  -> ""                          (conditions test, no money tool)
 *
 * Storage prefix: bfp (FROZEN). Grid keys (none in R2): bfp:grid:<toolId>.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export interface TopicResource {
  /** premium toolId; empty string = no premium tool for this topic in R2. */
  toolId: string;
}

export const TOPIC_RESOURCES: Record<TopicKey, TopicResource> = {
  "cis-refund":           { toolId: "cis-refund-planner-premium" },
  "cis-deductions":       { toolId: "cis-refund-planner-premium" },
  "gross-payment-status": { toolId: "cis-gps-readiness-premium" },
  "limited-company":      { toolId: "cis-vs-paye-premium" },
  "self-assessment":      { toolId: "" },
  "vat-reverse-charge":   { toolId: "" },
};

/** Returns the TopicResource for a topic, or null when the topic is not in the map. */
export function resourceForTopic(topic: TopicKey | null | undefined): TopicResource | null {
  if (!topic) return null;
  return TOPIC_RESOURCES[topic] ?? null;
}
