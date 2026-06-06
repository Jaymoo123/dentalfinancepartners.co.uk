"use client";

/**
 * Topic → premium tool bridge. Resolves the topic's CategoryResource (for its
 * toolId), looks up the PremiumToolConfig, and renders the PremiumCalculator if
 * one exists — otherwise renders NOTHING. This is the single gate the injection
 * wiring uses, so blog/calculator pages can drop `<PremiumUpgrade topic />` in
 * unconditionally and it only appears once a category's tool is authored.
 *
 * The heavy PremiumCalculator (and its recharts chunk) is loaded via next/dynamic
 * with `ssr:false` because it is interactive and chart-heavy — but it is given a
 * SIZED, VISIBLE loading placeholder so there is always a real container in the
 * layout (no CLS, no silent blank) while the chunk hydrates. The whole island is
 * wrapped in a CLEARLY LABELLED card so it reads as an obvious "free tool", not a
 * bare div.
 */
import dynamic from "next/dynamic";
import type { TopicKey } from "@/lib/intent/taxonomy";
import { getTopic } from "@/lib/intent/taxonomy";
import { resourceForTopic } from "@/lib/resources/registry";
import { getPremiumTool } from "@/lib/calculators/premium/registry";

function ToolLoading() {
  // Sized, visible reserved-height placeholder: keeps the layout stable and
  // signals the interactive tool is loading rather than rendering nothing.
  return (
    <div
      className="bg-white border-l-4 border-emerald-600 p-6 sm:p-8 lg:p-10"
      style={{ minHeight: 480 }}
      aria-busy="true"
    >
      <div className="inline-block bg-slate-900 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider mb-3">
        Premium tool
      </div>
      <div className="h-6 w-2/3 rounded bg-slate-100 animate-pulse" />
      <div className="mt-3 h-4 w-5/6 rounded bg-slate-100 animate-pulse" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <div className="h-12 rounded bg-slate-100 animate-pulse" />
          <div className="h-12 rounded bg-slate-100 animate-pulse" />
          <div className="h-12 rounded bg-slate-100 animate-pulse" />
        </div>
        <div className="h-64 rounded bg-slate-100 animate-pulse" />
      </div>
      <p className="mt-6 text-sm text-slate-500">Loading the interactive tool…</p>
    </div>
  );
}

const PremiumCalculator = dynamic(
  () => import("./PremiumCalculator").then((m) => m.PremiumCalculator),
  { ssr: false, loading: () => <ToolLoading /> },
);

export function PremiumUpgrade({ topic }: { topic: TopicKey | null | undefined }) {
  if (!topic) return null;
  const resource = resourceForTopic(topic);
  const config = getPremiumTool(resource?.toolId);
  if (!config) return null;

  const topicObj = getTopic(topic);
  const label = topicObj?.label ?? "this topic";

  return (
    <section className="my-12 not-prose" aria-labelledby={`premium-tool-${topic}`}>
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-block bg-emerald-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          Free interactive tool
        </span>
      </div>
      <h2 id={`premium-tool-${topic}`} className="sr-only">
        Free {label} tool
      </h2>
      <PremiumCalculator config={config} />
    </section>
  );
}
