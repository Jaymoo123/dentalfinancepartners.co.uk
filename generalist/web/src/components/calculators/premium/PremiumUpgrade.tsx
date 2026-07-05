"use client";

/**
 * Topic-to-premium-tool bridge for the generalist site.
 *
 * Resolves the topic's CategoryResource (for its toolId), looks up the
 * PremiumToolConfig, and renders the PremiumCalculator if one exists.
 * If no config exists it renders null, so BlogPostRenderer can drop this
 * in unconditionally for all category slugs.
 *
 * The interactive tool is desktop-only (hidden on mobile); on mobile the
 * MobileToolSlot shows a topic-aware qualified capture instead.
 *
 * PremiumCalculator is loaded via next/dynamic with ssr:false because it
 * is interactive and computation-heavy. A sized, visible placeholder is
 * shown while the chunk hydrates to prevent CLS.
 *
 * Styled with generalist orange-500/600, NOT Property's emerald.
 */

import dynamic from "next/dynamic";
import type { TopicKey } from "@/lib/intent/taxonomy";
import { getTopic } from "@/lib/intent/taxonomy";
import { resourceForTopic } from "@/lib/resources/registry";
import { getPremiumTool } from "@/lib/calculators/premium/registry";
import { MobileToolSlot } from "@/components/calculators/premium/MobileToolSlot";

function ToolLoading() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      style={{ minHeight: 480 }}
      aria-busy="true"
    >
      <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600" />
      <div className="border-b border-slate-100 bg-slate-50/60 px-5 py-4 sm:px-7 sm:py-5">
        <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-3.5 w-5/6 animate-pulse rounded bg-slate-100" />
      </div>
      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="h-12 animate-pulse rounded bg-slate-100" />
          <div className="h-12 animate-pulse rounded bg-slate-100" />
          <div className="h-12 animate-pulse rounded bg-slate-100" />
        </div>
        <div className="space-y-4">
          <div className="h-24 animate-pulse rounded bg-slate-100" />
          <div className="h-32 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

const PremiumCalculator = dynamic(
  () => import("./PremiumCalculator").then((m) => m.PremiumCalculator),
  { ssr: false, loading: () => <ToolLoading /> },
);

export function PremiumUpgrade({
  topic,
  full = false,
  placement = "calculator",
  category,
}: {
  topic: TopicKey | null | undefined;
  full?: boolean;
  /** Where the tool is surfaced: "calculator" | "blog" | "embed". */
  placement?: string;
  /** Blog category slug when placement === "blog". */
  category?: string;
}) {
  if (!topic) return null;
  const resource = resourceForTopic(topic);
  const config = getPremiumTool(resource?.toolId ?? "");
  if (!config) return null;

  const topicObj = getTopic(topic);
  const label = topicObj?.label ?? "this topic";

  return (
    <section className="my-12 not-prose" aria-labelledby={`premium-tool-${topic}`}>
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-block bg-orange-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          Free interactive tool
        </span>
      </div>
      <h2 id={`premium-tool-${topic}`} className="sr-only">
        Free {label} tool
      </h2>
      {/* On mobile the interactive tool is replaced by a qualified capture */}
      <div className="sm:hidden">
        <MobileToolSlot topic={topic} label={label} />
      </div>
      <div className="hidden sm:block">
        <PremiumCalculator
          config={config}
          full={full}
          placement={placement}
          category={category}
        />
      </div>
    </section>
  );
}
