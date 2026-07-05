"use client";

/**
 * Conversion CTA injected below a calculator result panel.
 *
 * Renders a MiniCapture form with the calculator's topic pre-filled as the
 * message prefix. Only shown on "page" variant (never on embed).
 *
 * Styled with Agency Founder Finance indigo tokens.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";
import { calculatorMessagePrefix } from "@/lib/lead-message";

export function CalcResultCta({
  slug,
  role = "Other",
  heading = "Want personalised advice on these figures?",
  blurb = "Our team works exclusively with agency founders. We can review your situation and confirm how these calculations apply to you.",
}: {
  /** Calculator slug, e.g. "salary-dividend". Used as message prefix. */
  slug: string;
  /** Lead role for the form, e.g. the agency type from the calculator. */
  role?: string;
  heading?: string;
  blurb?: string;
}) {
  return (
    <MiniCapture
      formId={`calc_result_${slug}`}
      role={role}
      messagePrefix={calculatorMessagePrefix(slug)}
      heading={heading}
      blurb={blurb}
      submitLabel="Request a callback"
      className="my-8 rounded-2xl border-l-4 border-indigo-600 bg-indigo-50 p-6 sm:p-8"
    />
  );
}
