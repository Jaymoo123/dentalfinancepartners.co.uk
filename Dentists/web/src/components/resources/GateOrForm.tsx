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
      heading={t?.ctaCopy || "Get your dental practice finances checked"}
      blurb="Skip the spreadsheet. Tell us where your practice is and one of our dental accountants will come back on your position and the next sensible step. The first call is free."
      submitLabel="Book my free first call"
      className="my-10 rounded-2xl border-l-4 border-[var(--gold)] bg-[var(--surface-elevated)] p-6 sm:p-8"
      postSubmit="redirect"
    />
  );
}
