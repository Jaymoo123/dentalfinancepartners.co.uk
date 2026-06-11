"use client";

/**
 * mobile_tool_capture experiment. The premium tools are desktop-only; on mobile
 * the slot is a dead-end "open on desktop" prompt. control = that prompt;
 * treatment = a topic-aware capture so mobile intent converts instead of
 * bouncing. Rendered inside PremiumUpgrade's mobile-only (`sm:hidden`) block.
 *
 * The slot is in the DOM on desktop too (just CSS-hidden), so we assign + register
 * the experiment ONLY when the viewport is actually mobile — otherwise desktop
 * visitors (who never see this) would dilute the experiment's denominator.
 */
import { useEffect, useState } from "react";
import { getVisitorId } from "@accounting-network/web-shared/analytics/ids";
import { assignVariant } from "@/lib/experiments/assign";
import { setActiveExperiment } from "@accounting-network/web-shared/analytics/experiments/active";
import { MiniCapture } from "@/components/forms/MiniCapture";
import { getTopic, type TopicKey } from "@/lib/intent/taxonomy";
import { useExperimentInView } from "@/lib/experiments/exposure";

export function MobileToolSlot({ topic, label }: { topic: TopicKey; label: string }) {
  const [variant, setVariant] = useState<string | null>(null);
  // Control-arm exposure (the dead-end prompt). Treatment is instrumented inside
  // MiniCapture. Only fires when the prompt actually scrolls into view on mobile.
  const controlRef = useExperimentInView<HTMLDivElement>("mobile_tool_capture", "mobile_tool");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 639px)").matches) return; // mobile only
    const v = assignVariant(getVisitorId() || "", "mobile_tool_capture");
    if (v) {
      setActiveExperiment("mobile_tool_capture", v);
      setVariant(v);
    }
  }, []);

  if (variant === "treatment") {
    const t = getTopic(topic);
    return (
      <MiniCapture
        formId="mobile_tool"
        experimentKey="mobile_tool_capture"
        messagePrefix={`[Mobile tool: ${topic}]`}
        heading={t?.ctaCopy || `Get your ${label} figure`}
        blurb="Our interactive tool is built for a larger screen. Tell us your numbers and a specialist will send your figure and the next sensible step, with no obligation."
        submitLabel="Send me my figure"
        className="rounded-2xl border-l-4 border-emerald-600 bg-slate-50 p-5 sm:p-6"
      />
    );
  }

  return (
    <div ref={controlRef} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-6 text-center text-sm text-slate-600">
      Our interactive {label} tool is built for a larger screen. Open this page on a desktop to use it.
    </div>
  );
}
