"use client";

/**
 * Blog mid-scroll lead capture. Thin wrapper around the site's calculator
 * MiniCapture for mid-article placement (LEADS_250 §13 S2), ported from
 * contractors-ir35/web/src/components/blog/InlineMiniLeadForm.tsx: same
 * copy, same formId, only the import source changes (this site's MiniCapture
 * lives under components/calculators/, not components/forms/).
 */
import { MiniCapture } from "@/components/calculators/MiniCapture";

export function InlineMiniLeadForm({ topic }: { topic?: string }) {
  const topicTag = topic ? ` (${topic})` : "";
  return (
    <MiniCapture
      formId="inline_mini"
      messagePrefix={`[Inline mini-form${topicTag}]`}
      heading="Want this checked against your specific situation?"
      blurb="Leave your details and a one-line summary. One of our accountants will come back to you, with no obligation."
      submitLabel="Get a quick reply"
    />
  );
}
