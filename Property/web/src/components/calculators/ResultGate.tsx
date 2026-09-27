"use client";

/**
 * Wraps a calculator's result panel. The result is never held (owner decision
 * 2026-09-27: no popup on the calculators). It renders the result immediately
 * and, when enabled, an inline capture form directly beneath it.
 *
 * Embeds are never given the form: those calculators run on third-party sites
 * as a distribution play, and a capture form there would break that deal.
 */
import { ResultCaptureForm } from "@/components/calculators/ResultCaptureForm";

export function ResultGate({
  campaign,
  enabled = true,
  children,
}: {
  /** Calculator slug: lands in the lead message. */
  campaign: string;
  /** False on embeds, where no capture form is shown. */
  enabled?: boolean;
  /** The result panel. */
  children: React.ReactNode;
}) {
  if (!enabled) return <>{children}</>;

  return (
    <div>
      {children}
      {/* ponytail: owner 2026-09-27, gate removed, form now inline; compare
          calc_result_form against calc_result_gate at 4 weeks */}
      <ResultCaptureForm campaign={campaign} />
    </div>
  );
}
