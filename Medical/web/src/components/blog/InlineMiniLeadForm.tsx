"use client";

/**
 * Blog mid-scroll lead capture for Medical Accountants UK.
 * Thin wrapper around MiniCapture for mid-article placement -- renders the
 * shared qualified form (name + phone + email + message) so an inline blog
 * lead is as complete as a /contact lead.
 *
 * Styled with navy/copper brand tokens.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";

export function InlineMiniLeadForm({ topic }: { topic?: string }) {
  const topicTag = topic ? ` (${topic})` : "";
  return (
    <MiniCapture
      formId="inline_mini"
      messagePrefix={`[Inline mini-form${topicTag}]`}
      heading="Want this checked against your specific situation?"
      blurb="Leave your details and a one-line summary. We match it to a regulated firm from our specialist partner network, and an accountant there who works with doctors makes contact. Enquiring commits you to nothing."
      submitLabel="Get a quick reply"
      className="my-12 border-l-4 border-[var(--copper)] bg-[var(--surface-elevated)] p-6 sm:p-8"
    />
  );
}
