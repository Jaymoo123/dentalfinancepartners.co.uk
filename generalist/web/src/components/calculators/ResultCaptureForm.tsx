"use client";

/**
 * Inline result-capture form: resolves topic copy from the intent taxonomy
 * then renders the shared MiniCapture directly beneath a calculator result.
 * Replaces the ResultGate/ResultGateModal pattern (owner decision 2026-09-27,
 * ported from Property: results are never held).
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
      blurb="A calculator gives the shape of the answer. Tell us your situation and a specialist will confirm your exact figure and the legitimate ways to reduce it, with no obligation."
      submitLabel="Get my figure confirmed"
      successText="Thanks, we'll be in touch within 24 hours. Your result is below."
      className="mt-4"
      messagePlaceholder="The more detail the better. Tell us about your situation, rough figures, and what you're trying to work out. A couple of sentences is ideal."
    />
  );
}
