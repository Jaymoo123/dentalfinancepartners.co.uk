/**
 * Topic-to-tool spine for the divorce-finances premium tier.
 *
 * STUB (scaffold phase): every topic carries an empty string toolId, which
 * hasPremiumTool() returns false for, so all posts remain unchanged.
 *
 * Storage prefix: dvf. Grid keys: dvf:grid:<toolId>.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export interface TopicResource {
  /** premium toolId; empty string = no premium tool for this topic yet. */
  toolId: string;
}

export const TOPIC_RESOURCES: Record<TopicKey, TopicResource> = {
  "financial-settlement": { toolId: "" },
  "pension-sharing": { toolId: "" },
  "tax-on-divorce": { toolId: "" },
  "family-home": { toolId: "" },
  "maintenance": { toolId: "" },
  "process-costs": { toolId: "" },
};

/** Look up the premium topic resource (or null). */
export function resourceForTopic(topic: TopicKey | null | undefined): TopicResource | null {
  if (!topic) return null;
  return TOPIC_RESOURCES[topic] ?? null;
}
