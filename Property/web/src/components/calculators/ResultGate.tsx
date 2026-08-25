"use client";

/**
 * Wraps a calculator's result panel so the figure is held behind the capture
 * interstitial until the reader either submits or skips.
 *
 * Rules, all deliberate:
 * - Inputs stay live. The reader edits their numbers freely; only the RESULT is
 *   held, so the gate never blocks them from using the tool.
 * - Embeds are never gated. Those calculators run on third-party sites as a
 *   distribution play; gating them would break that deal, not convert anyone.
 * - EVERY calculator gates. There is no once-per-session bypass: each calculator
 *   holds its own result until the reader presses "See my result" on it, so
 *   gating one does not unlock the others.
 * - Converted visitors are the one exception: they have already given us their
 *   details, so re-asking on every calculator is a tax on the people who already
 *   said yes.
 * - Once revealed, a calculator stays revealed — for the rest of the session, not
 *   just the mount. The reveal is persisted per campaign so navigating away and
 *   back does not re-gate a calculator the reader has already answered for.
 *   Keyed PER CALCULATOR on purpose: a single shared key would re-create the
 *   site-wide "unlock one, unlock all" bug.
 * - Skipping ALWAYS reveals the result. The figure is never actually walled off.
 * - The held state renders the REAL result behind frosted glass rather than a
 *   placeholder. The reader sees the true shape of their answer (a figure, a
 *   yes/no, how long the breakdown is) without being able to read it, which is
 *   what makes the gate feel worth answering. A fabricated number would be both
 *   less persuasive and dishonest once revealed. Consistent with the rule above:
 *   the figure was never walled off, so having it in the DOM costs nothing.
 */
import { useCallback, useEffect, useState } from "react";
import { isConverted } from "@accounting-network/web-shared/analytics/visitMemory";
import { track } from "@accounting-network/web-shared/analytics/track";
import { ResultGateModal } from "@/components/calculators/ResultGateModal";
import { HeldResult } from "@/components/calculators/HeldResult";
import { btnSecondary } from "@/components/ui/layout-utils";
import { wasRevealed, rememberRevealed } from "@/components/calculators/resultGateStorage";

export function ResultGate({
  campaign,
  enabled = true,
  children,
}: {
  /** Calculator slug: lands in the lead message and the skip diagnostic. */
  campaign: string;
  /** False on embeds, where the result is never gated. */
  enabled?: boolean;
  /** The result panel. */
  children: React.ReactNode;
}) {
  const [revealed, setRevealed] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  // Resolved after mount: isConverted() reads client-only storage, so starting
  // false keeps the server and first client render identical (and means the
  // result is never briefly flashed before the gate settles).
  const [converted, setConverted] = useState(false);

  useEffect(() => {
    if (isConverted()) setConverted(true);
    if (wasRevealed(campaign)) setRevealed(true);
  }, [campaign]);

  const requestReveal = useCallback(() => {
    track("cta_click", { cta_id: "calc_see_result", placement: "result_gate" });
    setGateOpen(true);
  }, []);

  const reveal = useCallback(() => {
    setGateOpen(false);
    setRevealed(true);
    rememberRevealed(campaign);
  }, [campaign]);

  // Re-open from under a revealed result. Distinct cta_id from the first press so
  // "asked after seeing the number" stays separable from "asked before".
  const reopen = useCallback(() => {
    track("cta_click", { cta_id: "calc_confirm_figure", placement: "result_shown" });
    setGateOpen(true);
  }, []);

  // Embeds render exactly as before: no wrapper, no gate, no CTA.
  if (!enabled) return <>{children}</>;

  const showResult = revealed || converted;

  return (
    <>
      {showResult ? (
        // Wrapper keeps the result + CTA as ONE grid child; without it the button
        // would become a sibling grid item and break the two-column layout.
        <div>
          {children}
          <button type="button" onClick={reopen} className={`${btnSecondary} mt-4 w-full`}>
            Confirm my figure with a specialist
          </button>
        </div>
      ) : (
        <HeldResult onReveal={requestReveal}>{children}</HeldResult>
      )}
      {gateOpen && <ResultGateModal campaign={campaign} onReveal={reveal} />}
    </>
  );
}
