"use client";

/**
 * Thin client wrapper that lazy-loads the (heavy) ResourceGate via next/dynamic.
 *
 * It exists so SERVER components (e.g. BlogPostRenderer) can reference the gate
 * without statically importing the lead-form / Supabase code into the route's
 * client bundle. The real ResourceGate is only fetched when actually rendered —
 * i.e. when a category asset is enabled. Phase A: never rendered → never fetched
 * → the blog bundle is unchanged.
 */
import dynamic from "next/dynamic";
import type { TopicKey } from "@/lib/intent/taxonomy";
import type { GateCopy } from "@/lib/resources/copy";

const ResourceGate = dynamic(
  () => import("@/components/resources/ResourceGate").then((m) => m.ResourceGate),
  { ssr: false },
);

export function ResourceGateLazy({ topic, copy }: { topic: TopicKey; copy: GateCopy }) {
  return <ResourceGate topic={topic} copy={copy} />;
}
