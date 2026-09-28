"use client";

/**
 * Qualified lead-capture form for the blog mid-slot.
 *
 * Replaced the email-gate (ResourceGate) on 2026-07-17: email-gated downloads
 * retired in favour of a qualified "free review" MiniCapture form, consistent
 * with the Property site pattern (commit f90f6cca). Guide and xlsx content are
 * now open research resources; this slot captures qualified leads.
 *
 * TOKEN HARDENING: no orange-*, no emerald-*. Uses Dentists CSS tokens.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";
import { getTopic, type TopicKey } from "@/lib/intent/taxonomy";

export function GateOrForm({
  topic,
}: {
  topic: TopicKey;
  copy?: unknown;
  split?: boolean;
  placement?: string;
  category?: string;
}) {
  const t = getTopic(topic);
  return (
    <MiniCapture
      formId="resource_block"
      messagePrefix={`[Resource block: ${topic}]`}
      heading={t?.ctaCopy || "Get a free review of your dental practice finances"}
      blurb="Skip the spreadsheet. Tell us about your situation and a specialist dental accountant will review your position and the next sensible step, with no obligation."
      submitLabel="Request my free review"
      className="my-10 rounded-2xl border-l-4 border-[var(--gold)] bg-[var(--surface-elevated)] p-6 sm:p-8"
      postSubmit="redirect"
    />
  );
}
