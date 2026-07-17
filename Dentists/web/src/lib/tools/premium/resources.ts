/**
 * Topic-to-tool spine for the Dentists premium tier.
 *
 * Maps each Dentists TopicKey to a premium toolId. The PremiumUpgrade component
 * uses this to resolve topic -> toolId -> PremiumToolConfig. Topics with no
 * registered premium tool carry an empty string toolId, which hasPremiumTool()
 * will return false for, so those posts remain unchanged.
 *
 * R2 mapping (brief Section 3):
 *   associate   -> associate-take-home-premium  (Tool 1)
 *   principal   -> principal-extraction-premium (Tool 2)
 *   buying      -> practice-purchase-premium    (Tool 3)
 *   selling     -> practice-sale-premium        (Tool 4)
 *   nhs         -> uda-nhs-premium              (Tool 5)
 *   uda-calc    -> uda-nhs-premium              (defensive alias: no blog slugs, same as nhs)
 *   compliance  -> ""                           (specialist-contact topic, no calculator)
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export interface TopicResource {
  /** premium toolId; empty string = no premium tool for this topic in R2. */
  toolId: string;
}

export const TOPIC_RESOURCES: Record<TopicKey, TopicResource> = {
  "associate":               { toolId: "associate-take-home-premium" },
  "associate-incorporation": { toolId: "associate-incorporation-premium" },
  "principal":               { toolId: "principal-extraction-premium" },
  "buying":                  { toolId: "practice-purchase-premium" },
  "selling":                 { toolId: "practice-sale-premium" },
  "nhs":                     { toolId: "uda-nhs-premium" },
  "uda-calc":                { toolId: "uda-nhs-premium" },
  "compliance":              { toolId: "" },
};

/** Returns the TopicResource for a topic, or null when the topic is not in the map. */
export function resourceForTopic(topic: TopicKey | null | undefined): TopicResource | null {
  if (!topic) return null;
  return TOPIC_RESOURCES[topic] ?? null;
}
