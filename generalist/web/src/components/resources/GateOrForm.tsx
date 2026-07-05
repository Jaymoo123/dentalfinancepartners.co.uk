"use client";

/**
 * Blog slot: renders the ResourceGate when a topic has an enabled asset,
 * otherwise falls back to MiniCapture (the "free review" behaviour from R2).
 *
 * In R3, with all 6 flagship assets enabled, the blog slot shows the real gate
 * (single stacked column, split=false), so visitors see the model before giving
 * their email.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";
import { ResourceGate } from "@/components/resources/ResourceGate";
import { hasEnabledResource } from "@/lib/resources/registry";
import { gateCopy } from "@/lib/resources/copy";
import { getTopic, type TopicKey } from "@/lib/intent/taxonomy";

export function GateOrForm({
  topic,
  split = false,
  placement = "blog",
  category,
}: {
  topic: TopicKey;
  /** Passed through to ResourceGate for the wide layout (calculator page). */
  split?: boolean;
  /** Placement hint for analytics events. */
  placement?: string;
  /** Blog category slug. */
  category?: string;
}) {
  if (hasEnabledResource(topic)) {
    return (
      <ResourceGate
        topic={topic}
        copy={gateCopy(topic)}
        split={split}
        placement={placement}
        category={category}
      />
    );
  }

  // Fallback: the plain "free review" MiniCapture from R2.
  const t = getTopic(topic);
  return (
    <MiniCapture
      formId="resource_block"
      messagePrefix={`[Resource block: ${topic}]`}
      heading={t?.ctaCopy || "Get a free review of your situation"}
      blurb="Skip the spreadsheet. Tell us about your situation and a specialist will review your position and the next sensible step, with no obligation."
      submitLabel="Request my free review"
      className="my-10 rounded-2xl border-l-4 border-orange-600 bg-slate-50 p-6 sm:p-8"
    />
  );
}
