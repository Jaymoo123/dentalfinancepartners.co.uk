"use client";

/**
 * Qualified lead-capture form for Accounts for Lawyers resource slots.
 *
 * Replaces the email-gated download unlock (retired 2026-07-17). The guide and
 * xlsx are now open resources; this slot asks for a free-review enquiry instead.
 * Mirrors Property's GateOrForm pattern (MiniCapture, no email-unlock).
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import { getTopic } from "@/lib/intent/taxonomy";
import { hasEnabledResource } from "@/lib/resources/registry";
import { MiniCapture } from "@/components/forms/MiniCapture";
import type { GateCopy } from "@/lib/resources/copy";

export function ResourceGate({
  topic,
}: {
  topic: TopicKey;
  copy?: GateCopy;
  split?: boolean;
  placement?: string;
  category?: string;
}) {
  if (!hasEnabledResource(topic)) return null;
  const t = getTopic(topic);
  return (
    <MiniCapture
      formId="resource_block"
      messagePrefix={`[Resource block: ${topic}]`}
      heading={t?.ctaCopy || "Get a free review of your firm's position"}
      blurb="Tell us about your firm and a specialist will review your situation and the most practical next step, with no obligation."
      submitLabel="Request my free review"
      className="my-10 rounded-2xl border-l-4 border-[var(--primary)] bg-[var(--surface-elevated)] p-6 sm:p-8"
      postSubmit="redirect"
    />
  );
}
