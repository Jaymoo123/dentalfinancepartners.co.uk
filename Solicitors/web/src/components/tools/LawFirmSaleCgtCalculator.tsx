"use client";

/**
 * Gated renderer for the Practice Sale CGT calculator (law-firm-sale-cgt).
 *
 * The tool roster marks this tool PREMIUM: gated result detail. The shared
 * <Calculator> renderer computes live with no gate, so this page uses a slim
 * site-local renderer that composes existing pieces only:
 *   - shared Field (packages/web-shared/tools/components/Field)
 *   - the site's ResultGateModal (same gate discipline as PremiumCalculator:
 *     never for converted visitors, at most once per session, reveals on any
 *     dismiss, the result is NEVER walled off)
 *   - CalcResultCta below the revealed result.
 *
 * Analytics mirrors the shared Calculator exactly (calc_view /
 * calc_input_change / calc_computed / calc_result_viewed, tool_kind
 * "standard", placement "calculator") plus the gate's own cta_click skip
 * diagnostic fired inside ResultGateModal.
 *
 * ponytail: layout is the shared Calculator's markup with a pre-reveal state
 * added; if a second gated fleet tool ships, lift the gate into the shared
 * renderer behind a GenericTool flag instead of copying this file.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Field } from "@accounting-network/web-shared/tools/components/Field";
import { track } from "@accounting-network/web-shared/analytics/track";
import { useInViewOnce } from "@accounting-network/web-shared/analytics/useInViewOnce";
import { isConverted } from "@accounting-network/web-shared/analytics/visitMemory";
import type { CalcValues } from "@accounting-network/web-shared/tools/types";
import { ResultGateModal } from "@/components/tools/premium/ResultGateModal";
import { CalcResultCta } from "@/components/tools/CalcResultCta";
import { lawFirmSaleCgtTool } from "@/lib/tools/configs/law-firm-sale-cgt";

// The gate interstitial shows at most once per session (mirrors PremiumCalculator).
let gateModalShownThisSession = false;

const tool = lawFirmSaleCgtTool;

export function LawFirmSaleCgtCalculator() {
  const [values, setValues] = useState<CalcValues>(() => {
    const v: CalcValues = {};
    for (const f of tool.fields) v[f.id] = f.default;
    return v;
  });
  const interactedRef = useRef(false);
  const computeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Gate: never for already-converted visitors; reveals on any dismiss.
  // Start gated so the pre-reveal state is the SSR markup (no result flash);
  // isConverted reads visit memory (client-only), so ungate after mount.
  const [gated, setGated] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  useEffect(() => {
    if (isConverted() || gateModalShownThisSession) setGated(false);
  }, []);
  const showResult = !gated || revealed;

  const base = { calculator_slug: tool.slug, placement: "calculator", tool_kind: "standard" };

  const rootRef = useInViewOnce<HTMLDivElement>(() => {
    track("calc_view", base);
  });

  useEffect(() => {
    return () => {
      if (computeTimer.current) clearTimeout(computeTimer.current);
    };
  }, []);

  const set = (id: string, v: number | string | boolean) => {
    setValues((prev) => ({ ...prev, [id]: v }));
    track("calc_input_change", { ...base, field_id: id });
    if (!interactedRef.current) {
      interactedRef.current = true;
      track("calc_result_viewed", base);
    }
    if (computeTimer.current) clearTimeout(computeTimer.current);
    computeTimer.current = setTimeout(() => {
      track("calc_computed", base);
    }, 800);
  };

  const onSeeResult = () => {
    if (!gateModalShownThisSession) {
      gateModalShownThisSession = true;
      setGateOpen(true);
    } else {
      setRevealed(true);
    }
  };

  const revealFromGate = useCallback(() => {
    setGateOpen(false);
    setRevealed(true);
  }, []);

  const result = tool.compute(values);
  const tone = result.headline.tone ?? "default";

  return (
    <>
      <div ref={rootRef} className="bg-white border-l-4 border-[var(--brand-primary)] p-6 sm:p-8 lg:p-10">
        <div className="mb-6 sm:mb-8">
          <div className="inline-block bg-slate-900 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider mb-2 sm:mb-3">
            Calculator
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">{tool.name}</h3>
          <p className="mt-2 text-sm sm:text-base text-slate-600">{tool.intro}</p>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5 sm:space-y-6">
            {tool.fields.map((f) => (
              <Field key={f.id} field={f} value={values[f.id]} onChange={(v) => set(f.id, v)} />
            ))}
          </div>

          <div className="bg-slate-900 p-6 sm:p-8 text-white">
            {showResult ? (
              <>
                <div className="mb-4 sm:mb-6">
                  <div
                    className={`text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 ${
                      tone === "warn" ? "text-amber-400" : "text-[var(--brand-primary)]"
                    }`}
                  >
                    {result.headline.label}
                  </div>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-mono">
                    {result.headline.value}
                  </div>
                  {result.headline.sub && (
                    <p className="mt-2 text-sm text-slate-300">{result.headline.sub}</p>
                  )}
                </div>

                {result.rows && result.rows.length > 0 && (
                  <div className="space-y-2 border-t border-slate-700 pt-4">
                    {result.rows.map((r, i) => (
                      <div key={i} className="flex items-baseline justify-between gap-4">
                        <span className={`text-sm ${r.strong ? "font-semibold text-white" : "text-slate-300"}`}>
                          {r.label}
                        </span>
                        <span
                          className={`text-sm tabular-nums shrink-0 ${
                            r.strong ? "font-bold text-white" : "font-medium text-slate-300"
                          }`}
                        >
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {result.note && (
                  <p className="mt-4 border-t border-slate-700 pt-4 text-xs leading-relaxed text-slate-400">
                    {result.note}
                  </p>
                )}

                <CalcResultCta campaign={tool.slug} />
              </>
            ) : (
              // Pre-reveal state: figure computed but held behind the gate button.
              <div className="flex min-h-[260px] flex-col items-center justify-center gap-3 text-center">
                <p className="text-sm font-medium text-slate-300">
                  Your CGT figure and full breakdown are ready.
                </p>
                <button
                  type="button"
                  onClick={onSeeResult}
                  className="w-full sm:w-auto min-h-11 rounded-full bg-[var(--brand-primary)] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  data-cta="see_result"
                >
                  See your result
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {gateOpen && (
        <ResultGateModal campaign={tool.slug} topicKey="succession-sale" onReveal={revealFromGate} />
      )}
    </>
  );
}
