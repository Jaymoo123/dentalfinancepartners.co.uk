"use client";

/**
 * Medical's inline result-capture form: resolves topic copy from the intent
 * taxonomy then renders the shared MiniCapture directly beneath a calculator
 * result. Replaces ResultGateModal (owner decision 2026-09-27, ported from
 * Property, no popup on calculators).
 */
import { usePathname } from "next/navigation";
import { MiniCapture } from "@/components/forms/MiniCapture";
import { deriveTopic } from "@/lib/intent/deriveTopic";
import { getTopic } from "@/lib/intent/taxonomy";

export function ResultCaptureForm({ campaign }: { campaign: string }) {
  const pathname = usePathname() || "";
  const topic = getTopic(deriveTopic(pathname));
  return (
    <MiniCapture
      formId="calc_result_form"
      messagePrefix={`[Result form: ${campaign}]`}
      heading={topic?.ctaCopy || "Want a specialist to check your figure?"}
      blurb="A calculator gives the shape of the answer. NHS pensions, the annual allowance taper and private-practice incorporation are unforgiving in the detail. Tell us your situation and one of our medical accountants who works with doctors will confirm your exact figure and the sensible next step. Enquiring commits you to nothing."
      submitLabel="Get my figure confirmed"
      successText="Thanks. One of our medical accountants will contact you about your figure. Your result is below."
      className="mt-4"
      messagePlaceholder="The more detail the better. Tell us about your NHS pension situation or private practice, rough figures, and what you are trying to work out. A couple of sentences is ideal."
    />
  );
}
