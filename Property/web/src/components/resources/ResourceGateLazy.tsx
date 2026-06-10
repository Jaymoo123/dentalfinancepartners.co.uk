/**
 * SSR-renderable wrapper around the email-gate ResourceGate.
 *
 * IMPORTANT (visibility fix): the gate is rendered as a NORMAL client component
 * (server-rendered shell + hydrate), NOT `dynamic(ssr:false)`. That guarantees
 * the email-gate form markup is present in the page's server HTML (verifiable
 * with curl/grep) and can never silently vanish on a client-side import failure.
 * The form is light (no recharts / heavy deps), so there is no bundle reason to
 * defer it. ResourceGate itself is SSR-safe (its only window access is inside a
 * useEffect).
 *
 * This file is intentionally a thin pass-through so the import sites
 * (BlogPostRenderer, CalculatorPageResources) keep a single, stable entry point.
 */
import { ResourceGate } from "@/components/resources/ResourceGate";
import type { TopicKey } from "@/lib/intent/taxonomy";
import type { GateCopy } from "@/lib/resources/copy";

export function ResourceGateLazy({
  topic,
  copy,
  split = false,
  placement = "calculator",
  category,
}: {
  topic: TopicKey;
  copy: GateCopy;
  split?: boolean;
  /** Where the gate is surfaced — "calculator" | "blog" | "embed". */
  placement?: string;
  /** Blog category slug when placement === "blog". */
  category?: string;
}) {
  return (
    <ResourceGate topic={topic} copy={copy} split={split} placement={placement} category={category} />
  );
}
