"use client";

/**
 * Wraps a calculator's result panel so the figure is held behind the capture
 * interstitial until the reader either submits or skips. Ported from generalist,
 * which ported it from Property.
 *
 * Rules, all deliberate:
 * - Inputs stay live. The reader edits their numbers freely; only the RESULT is
 *   held, so the gate never blocks them from using the tool.
 * - Embeds are never gated. Those calculators run on third-party sites as a
 *   distribution play; gating them would break that deal, not convert anyone.
 *   `enabled` is driven by the EXISTING variant switch in CalculatorClient.
 * - EVERY calculator gates. There is no once-per-session bypass: each calculator
 *   holds its own result until the reader presses the reveal button on it, so
 *   gating one does not unlock the others.
 * - Converted visitors are the one exception: they have already given us their
 *   details, so re-asking on every calculator is a tax on the people who already
 *   said yes.
 * - Once revealed, a calculator stays revealed for the rest of the session,
 *   persisted PER CAMPAIGN. A single shared key would re-create the site-wide
 *   "unlock one, unlock all" bug the two module-global once-per-session flags were.
 * - Skipping ALWAYS reveals the result. The figure is never actually walled off.
 *   The skip diagnostic (`result_gate_skip`) is fired from JS inside
 *   ResultGateModal with no `data-cta`, so backdrop and Esc dismissals count and
 *   nothing is double-counted. Do not attribute it here.
 * - The held state renders the REAL result behind frosted glass rather than a
 *   placeholder, so the reader sees the true shape of their answer.
 * - `revealed` and `converted` both start false and only `useEffect` can raise
 *   them, so the SERVER renders the gated state. That preserves
 *   LawFirmSaleCgtCalculator's deliberate `useState(true)` first paint: the
 *   figure never flashes before the gate settles.
 *
 * ponytail: no post-reveal "get this checked" button (generalist has one). Every
 * surface here already renders CalcResultCta below the result, and adding a
 * second ask would be net-new copy, which the 2026-09-11 hard rule forbids.
 */
import { useCallback, useEffect, useState } from "react";
import { isConverted } from "@accounting-network/web-shared/analytics/visitMemory";
import { track } from "@accounting-network/web-shared/analytics/track";
import { ResultGateModal } from "@/components/tools/premium/ResultGateModal";
import { HeldResult } from "@/components/calculators/HeldResult";
import { wasRevealed, rememberRevealed } from "@/components/calculators/resultGateStorage";
import type { TopicKey } from "@/lib/intent/taxonomy";

export function ResultGate({
  campaign,
  enabled = true,
  ground = "navy",
  topicKey = null,
  blurb,
  buttonLabel,
  dataCta,
  children,
}: {
  /** Calculator slug: lands in the lead message and the skip diagnostic. */
  campaign: string;
  /** False on embeds, where the result is never gated. */
  enabled?: boolean;
  /** Passed through to HeldResult: what is being covered. */
  ground?: "navy" | "light";
  /** Threaded to the modal so it never re-derives intent from the URL. */
  topicKey?: TopicKey | null;
  /** Override the held-state wording where a surface already ships its own. */
  blurb?: string;
  buttonLabel?: string;
  /**
   * Existing live `data-cta` id for surfaces that already had a reveal button.
   * When set, the autocapture delegate records the press, so this component does
   * NOT also fire a cta_click: that would double-count the same click.
   */
  dataCta?: string;
  /** The result panel. */
  children: React.ReactNode;
}) {
  const [revealed, setRevealed] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  // Resolved after mount: isConverted() reads client-only storage, so starting
  // false keeps the server and first client render identical.
  const [converted, setConverted] = useState(false);

  useEffect(() => {
    if (isConverted()) setConverted(true);
    if (wasRevealed(campaign)) setRevealed(true);
  }, [campaign]);

  const requestReveal = useCallback(() => {
    if (!dataCta) {
      track("cta_click", { cta_id: `calc_result_${campaign}`, placement: "result_gate" });
    }
    setGateOpen(true);
  }, [campaign, dataCta]);

  const reveal = useCallback(() => {
    setGateOpen(false);
    setRevealed(true);
    rememberRevealed(campaign);
  }, [campaign]);

  // Embeds render exactly as before: no wrapper, no gate, no CTA.
  if (!enabled) return <>{children}</>;

  if (revealed || converted) return <>{children}</>;

  return (
    <>
      <HeldResult
        ground={ground}
        onReveal={requestReveal}
        blurb={blurb}
        buttonLabel={buttonLabel}
        dataCta={dataCta}
      >
        {children}
      </HeldResult>
      {gateOpen && (
        <ResultGateModal campaign={campaign} topicKey={topicKey} onReveal={reveal} />
      )}
    </>
  );
}
