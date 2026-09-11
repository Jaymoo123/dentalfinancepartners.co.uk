"use client";

/**
 * Blog mid-scroll lead capture for Trade Tax Specialists.
 * Thin wrapper around MiniCapture for mid-article placement -- renders the
 * shared qualified form (name + phone + email + message) so an inline blog
 * lead is as complete as a /contact lead.
 *
 * Styled with brand tokens only.
 *
 * TD-14 (phase 2): the blurb used to promise a reply "within 24 hours". The
 * pool model discloses an enquiry to up to six independent firms, none of them
 * bound to a turnaround, so the promise was false. Removed, not softened.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";

export function InlineMiniLeadForm({ topic }: { topic?: string }) {
  const topicTag = topic ? ` (${topic})` : "";
  return (
    <MiniCapture
      formId="inline_mini"
      messagePrefix={`[Inline mini-form${topicTag}]`}
      heading="Want this checked against your specific situation?"
      blurb="Leave your details and a one-line summary, and a specialist CIS accountant will look at your position. No obligation."
      submitLabel="Send my details"
      className="my-12 rounded-xl border-l-4 border-[var(--accent)] bg-neutral-50 p-6 sm:p-8"
    />
  );
}
