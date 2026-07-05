"use client";

/**
 * Blog mid-scroll lead capture for the Accounts for Lawyers (Solicitors) site.
 * Thin wrapper around MiniCapture for mid-article placement -- renders the
 * shared qualified form (name + phone + email + message) so an inline blog
 * lead is as complete as a /contact lead.
 *
 * Styled with the site's CSS variable tokens via MiniCapture's default className.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";

export function InlineMiniLeadForm({ topic }: { topic?: string }) {
  const topicTag = topic ? ` (${topic})` : "";
  return (
    <MiniCapture
      formId="inline_mini"
      messagePrefix={`[Inline mini-form${topicTag}]`}
      heading="Want this checked against your firm's specific situation?"
      blurb="Leave your details and a one-line summary. A specialist solicitor accountant will reply within one working day, with no obligation."
      submitLabel="Get a quick reply"
      className="my-12 border-l-4 border-[var(--primary)] bg-[var(--surface-elevated)] p-6 sm:p-8"
    />
  );
}
