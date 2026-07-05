/**
 * Blog resource registry — maps TopicKey to the premium tool (and future
 * downloadable assets) for that topic.
 *
 * Data-only, string-safe, safe for the client bundle. The xlsx and guide
 * fields are scaffolded as null for R2 (tools-only phase); they will be
 * populated when the download layer ships.
 *
 * Used by PremiumUpgrade to resolve which tool to surface for a blog post.
 */

import type { TopicKey } from "@/lib/intent/taxonomy";

export interface CategoryResource {
  topic: TopicKey;
  /** premium tool slug — null when no tool exists for this topic */
  toolId: string | null;
  /** downloadable spreadsheet asset slug — deferred to a later phase */
  xlsx: null;
  /** downloadable guide asset slug — deferred to a later phase */
  guide: null;
}

export const RESOURCES: Record<TopicKey, CategoryResource> = {
  "director-pay": {
    topic: "director-pay",
    toolId: "director-pay-premium",
    xlsx: null,
    guide: null,
  },
  "limited-company": {
    topic: "limited-company",
    toolId: "director-pay-premium",
    xlsx: null,
    guide: null,
  },
  incorporation: {
    topic: "incorporation",
    toolId: "incorporation-premium",
    xlsx: null,
    guide: null,
  },
  "vat-mtd": {
    topic: "vat-mtd",
    toolId: "vat-scheme-premium",
    xlsx: null,
    guide: null,
  },
  payroll: {
    topic: "payroll",
    toolId: "employer-cost-premium",
    xlsx: null,
    guide: null,
  },
  rnd: {
    topic: "rnd",
    toolId: "rd-estimator-premium",
    xlsx: null,
    guide: null,
  },
  "exit-cgt": {
    topic: "exit-cgt",
    toolId: "badr-exit-premium",
    xlsx: null,
    guide: null,
  },
  "sole-trader": {
    topic: "sole-trader",
    toolId: "incorporation-premium",
    xlsx: null,
    guide: null,
  },
  compliance: {
    topic: "compliance",
    toolId: null,
    xlsx: null,
    guide: null,
  },
};

/** Retrieve the resource descriptor for a topic, or null if the topic is unknown. */
export function resourceForTopic(topic: TopicKey | null | undefined): CategoryResource | null {
  if (!topic) return null;
  return RESOURCES[topic] ?? null;
}
