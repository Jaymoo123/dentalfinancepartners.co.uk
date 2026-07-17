/**
 * Topic-to-tool spine for the Solicitors premium tier.
 *
 * Maps each Solicitors TopicKey to a premium toolId. The PremiumUpgrade component
 * uses this to resolve topic -> toolId -> PremiumToolConfig. Topics with no
 * registered premium tool carry an empty string toolId, which hasPremiumTool()
 * will return false for, so those posts remain unchanged.
 *
 * R2 mapping (brief Section 3):
 *   partnership-llp   -> llp-profit-tax-premium  (Tool 1)
 *   sole-practitioner -> sole-practitioner-premium (Tool 2)
 *   succession-sale   -> practice-sale-premium    (Tool 3)
 *   sra-compliance    -> sra-client-account-premium (Tool 4)
 *   incorporation     -> sole-practitioner-premium (recommended: surfaces the
 *                        Ltd vs sole-trader comparison on structure posts)
 *   practice-finance  -> "" (held in R2, no existing lib)
 *   vat               -> "" (specialist-contact topic, no calculator)
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export interface TopicResource {
  /** premium toolId; empty string = no premium tool for this topic in R2. */
  toolId: string;
}

export const TOPIC_RESOURCES: Record<TopicKey, TopicResource> = {
  "partnership-llp":    { toolId: "llp-profit-tax-premium" },
  "sole-practitioner":  { toolId: "sole-practitioner-premium" },
  "succession-sale":    { toolId: "practice-sale-premium" },
  "sra-compliance":     { toolId: "sra-client-account-premium" },
  "incorporation":      { toolId: "sole-practitioner-premium" },
  "practice-finance":          { toolId: "" },
  "vat":                       { toolId: "" },
  "professional-indemnity":    { toolId: "" },
};

/** Returns the TopicResource for a topic, or null when the topic is not in the map. */
export function resourceForTopic(topic: TopicKey | null | undefined): TopicResource | null {
  if (!topic) return null;
  return TOPIC_RESOURCES[topic] ?? null;
}
