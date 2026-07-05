/**
 * Topic-to-tool spine for the contractors-ir35 premium tier.
 *
 * Maps each cfp TopicKey to a premium toolId. The PremiumUpgrade component
 * uses this to resolve topic -> toolId -> PremiumToolConfig. Topics with no
 * registered premium tool carry an empty string toolId, which hasPremiumTool()
 * returns false for, so those posts remain unchanged.
 *
 * Storage prefix: cfp (FROZEN). Grid keys: cfp:grid:<toolId>. Never ptp:/bfp:.
 *
 * R2 mapping (brief Section 1 / Section 3):
 *   ir35          -> ir35-take-home-compare-premium  (Tool 1, flagship)
 *   structure     -> umbrella-vs-limited-premium     (Tool 2)
 *   company-tax   -> corporation-tax-planner-premium (Tool 4)
 *   pay-planning  -> salary-dividend-planner-premium (Tool 3)
 *   basics-expenses -> ""  (broad basics, no single tool fits; free specialist review)
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export interface TopicResource {
  /** premium toolId; empty string = no premium tool for this topic in R2. */
  toolId: string;
}

export const TOPIC_RESOURCES: Record<TopicKey, TopicResource> = {
  "ir35":            { toolId: "ir35-take-home-compare-premium" },
  "structure":       { toolId: "umbrella-vs-limited-premium" },
  "company-tax":     { toolId: "corporation-tax-planner-premium" },
  "pay-planning":    { toolId: "salary-dividend-planner-premium" },
  "basics-expenses": { toolId: "" },
};

/** Returns the TopicResource for a topic, or null when the topic is not in the map. */
export function resourceForTopic(topic: TopicKey | null | undefined): TopicResource | null {
  if (!topic) return null;
  return TOPIC_RESOURCES[topic] ?? null;
}
