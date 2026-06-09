"use client";

/**
 * gate_to_form experiment. The on-page resource block: control = the current
 * email-gated Excel download (ResourceGate, which nobody unlocks); treatment =
 * a topic-aware "free review" capture (MiniCapture) in the same slot. Drop-in
 * replacement for <ResourceGateLazy>. Exposure is registered on mount for both
 * arms, so the Experiments card compares conversion like-for-like.
 */
import { useExperiment } from "@/components/experiments/useExperiment";
import { ResourceGateLazy } from "./ResourceGateLazy";
import { MiniCapture } from "@/components/forms/MiniCapture";
import { getTopic, type TopicKey } from "@/lib/intent/taxonomy";
import type { GateCopy } from "@/lib/resources/copy";

export function GateOrForm({
  topic,
  copy,
  split,
  placement,
  category,
}: {
  topic: TopicKey;
  copy: GateCopy;
  split?: boolean;
  placement?: string;
  category?: string;
}) {
  const variant = useExperiment("gate_to_form");

  if (variant === "treatment") {
    const t = getTopic(topic);
    return (
      <MiniCapture
        formId="resource_block"
        experimentKey="gate_to_form"
        messagePrefix={`[Resource block: ${topic}]`}
        heading={t?.ctaCopy || "Get a free review of your situation"}
        blurb="Skip the spreadsheet. Tell us about your situation and a specialist will review your position and the next sensible step, with no obligation."
        submitLabel="Request my free review"
        className="my-10 rounded-2xl border-l-4 border-emerald-600 bg-slate-50 p-6 sm:p-8"
      />
    );
  }

  // control + first render (null) = today's email-gated download
  return <ResourceGateLazy topic={topic} copy={copy} split={split} placement={placement} category={category} />;
}
