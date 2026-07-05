"use client";

/**
 * Blog mid-scroll lead capture for Contractor Tax Accountants.
 * Thin wrapper around MiniCapture for mid-article placement -- renders the
 * shared qualified form (name + phone + email + message) so an inline blog
 * lead is as complete as a /contact lead.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";

export function InlineMiniLeadForm({ topic }: { topic?: string }) {
  const topicTag = topic ? ` (${topic})` : "";
  return (
    <MiniCapture
      formId="inline_mini"
      messagePrefix={`[Inline mini-form${topicTag}]`}
      heading="Want this checked against your specific situation?"
      blurb="Leave your details and a one-line summary. A specialist will reply within 24 hours, with no obligation."
      submitLabel="Get a quick reply"
      className="my-12 border-l-4 border-cyan-700 bg-neutral-50 p-6 sm:p-8"
    />
  );
}
