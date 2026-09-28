"use client";

/**
 * Blog mid-scroll lead capture. Thin wrapper around MiniCapture for
 * mid-article placement, ported from contractors-ir35's
 * components/blog/InlineMiniLeadForm.tsx (LEADS_250 S2).
 */
import { MiniCapture } from "@/components/calculators/MiniCapture";

export function InlineMiniLeadForm({ topic }: { topic?: string }) {
  const topicTag = topic ? ` (${topic})` : "";
  return (
    <MiniCapture
      formId="inline_mini"
      messagePrefix={`[Inline mini-form${topicTag}]`}
      heading="Want this checked against your specific situation?"
      blurb="Leave your details and a one-line summary. A specialist will come back to you, with no obligation."
      submitLabel="Get a quick reply"
      className="my-12 rounded-2xl border-l-4 border-[var(--brand-primary)] bg-[var(--surface)] p-6 sm:p-8"
    />
  );
}
