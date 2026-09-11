"use client";

/**
 * Wraps a calculator's RESULT panel so the figure is held behind the capture
 * interstitial until the reader either submits or skips.
 *
 * Rules, all deliberate:
 * - Inputs stay live. Only the result is held, so the gate never blocks the tool.
 * - Embeds are never gated (`enabled={false}`): they run on third-party sites as
 *   a distribution play, and gating them breaks that deal rather than converting.
 * - EVERY calculator gates. There is no once-per-session bypass: the reveal is
 *   remembered PER CALCULATOR (resultGateStorage), so answering on one does not
 *   unlock the others. This replaces the old once-per-session module-scope
 *   boolean, which was one flag for the whole premium fleet.
 * - Converted visitors are the one exemption: they have already given us their
 *   details, so re-asking on every calculator taxes the people who said yes.
 * - Skipping ALWAYS reveals. The figure is never actually walled off, which is
 *   why HeldResult can render the real result behind frosted glass.
 * - `revealed` starts false on the server AND on the first client render, so
 *   there is no hydration mismatch and no result flash. Crawlers and LLM scrapes
 *   read the pre-hydration HTML, which is unchanged.
 */
import { useCallback, useEffect, useState } from "react";
import { isConverted } from "@accounting-network/web-shared/analytics/visitMemory";
import { track } from "@accounting-network/web-shared/analytics/track";
import { ResultGateModal } from "@/components/tools/premium/ResultGateModal";
import { HeldResult } from "@/components/tools/HeldResult";
import { btnSecondary } from "@/components/ui/layout-utils";
import {
  wasRevealed,
  rememberRevealed,
  type GateTier,
} from "@/components/tools/resultGateStorage";
import type { TopicKey } from "@/lib/intent/taxonomy";

export function ResultGate({
  campaign,
  enabled = true,
  tier = "generic",
  topicKey = null,
  heldGround = "navy",
  children,
}: {
  /** Calculator slug (generic) or toolId (premium): lands in the lead message and the skip diagnostic. */
  campaign: string;
  /** False on embeds and anywhere else the result is never gated. */
  enabled?: boolean;
  /** Storage namespace. Four ids exist as BOTH a generic slug and a premium toolId. */
  tier?: GateTier;
  /** Resolved intent topic, threaded down (never re-derived from the URL). */
  topicKey?: TopicKey | null;
  /** "navy" when the wrapped result panel is already dark, "light" for light cards. */
  heldGround?: "navy" | "light";
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
    if (wasRevealed(tier, campaign)) setRevealed(true);
  }, [tier, campaign]);

  /* ANALYTICS CONTINUITY, and this cost a review round to spot.
     The premium reveal button carried data-cta="see_result" before this port.
     It is the busiest interaction on the site (29 presses since 2026-07-06),
     and FUNNEL_BASELINE.md says in terms not to remove or restyle it without a
     measurement plan. Emitting only the new id would have taken that series to
     zero at the cutover AND mixed the 8 premium blog mounts in with 11 new
     generic surfaces, so the 54% skip-rate baseline would compare to nothing.
     So: the premium tier keeps `see_result` verbatim, the generic fleet gets
     its own `calc_see_result`, and the two stay separable. */
  const seeResultCtaId = tier === "premium" ? "see_result" : "calc_see_result";

  const requestReveal = useCallback(() => {
    track("cta_click", { cta_id: seeResultCtaId, placement: "result_gate" });
    setGateOpen(true);
  }, [seeResultCtaId]);

  const reveal = useCallback(() => {
    setGateOpen(false);
    setRevealed(true);
    rememberRevealed(tier, campaign);
  }, [tier, campaign]);

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
        // becomes a sibling grid item and breaks the two-column result layout.
        <div>
          {children}
          <button type="button" onClick={reopen} className={`${btnSecondary} mt-4 w-full`}>
            Confirm my figure with a specialist
          </button>
        </div>
      ) : (
        <HeldResult onReveal={requestReveal} ground={heldGround} dataCta={seeResultCtaId}>
          {children}
        </HeldResult>
      )}
      {gateOpen && (
        <ResultGateModal campaign={campaign} tier={tier} topicKey={topicKey} onReveal={reveal} />
      )}
    </>
  );
}
