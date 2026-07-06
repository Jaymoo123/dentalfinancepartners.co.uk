"use client";

/**
 * Topic to premium tool bridge for Agency Founder Finance (aff).
 *
 * Resolves topic -> toolId (via resources.ts spine) -> PremiumToolConfig (via
 * registry.ts), then renders the PremiumCalculator. Renders nothing when there is
 * no config for the topic (e.g. international is excluded per HP §8/§10), so the
 * injection wiring can be added unconditionally to BlogPostRenderer and lights up
 * only for mapped categories.
 *
 * Layout:
 *   - sm:hidden  -> MobileToolSlot (topic-aware MiniCapture for phone visitors)
 *   - hidden sm:block -> PremiumCalculator (desktop only, loaded via dynamic import
 *     to defer the client chunk; sized loading placeholder prevents CLS)
 *
 * TOKEN DISCIPLINE: Agency Founder Finance uses var(--accent) #4f46e5 (indigo)
 * and var(--ink) #0f172a (slate). This site does NOT define --gold, --navy or --dark.
 * The "Free interactive tool" eyebrow chip uses bg-[var(--accent)] (indigo) with
 * white text (the Dentists source used bg-[var(--navy)]; re-tokened).
 * Loading placeholder skeleton uses var(--accent) accent bar.
 * No var(--gold), var(--navy), var(--dark) anywhere.
 *
 * topicKey is threaded as a PROP from PremiumUpgrade into PremiumCalculator into
 * ResultGateModal. It is NEVER re-derived from the URL inside the gate.
 *
 * PremiumUpgrade renders null for:
 *   - unmapped topics (null/undefined)
 *   - topics with toolId="" (international is excluded per §1)
 * So the BlogPostRenderer injection is unconditional and safe for all categories.
 */
import dynamic from "next/dynamic";
import type { TopicKey } from "@/lib/intent/taxonomy";
import { getTopic } from "@/lib/intent/taxonomy";
import { resourceForTopic } from "@/lib/tools/premium/resources";
import { getPremiumTool } from "@/lib/tools/premium/registry";
import { MobileToolSlot } from "./MobileToolSlot";

function ToolLoading() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm"
      style={{ minHeight: 480 }}
      aria-busy="true"
    >
      {/* Accent bar: indigo (var(--accent)) -- no --gold on this site */}
      <div className="h-1 bg-[var(--accent)]" />
      <div className="border-b border-[var(--border)] bg-[var(--surface-elevated)] px-5 py-4 sm:px-7 sm:py-5">
        <div className="h-5 w-2/3 animate-pulse rounded bg-[var(--border)]" />
        <div className="mt-2 h-3.5 w-5/6 animate-pulse rounded bg-[var(--border)]/60" />
      </div>
      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="h-12 animate-pulse rounded-lg bg-[var(--border)]/60" />
          <div className="h-12 animate-pulse rounded-lg bg-[var(--border)]/60" />
          <div className="h-12 animate-pulse rounded-lg bg-[var(--border)]/60" />
        </div>
        <div className="space-y-4">
          <div className="h-24 animate-pulse rounded-xl bg-[var(--border)]/60" />
          <div className="h-32 animate-pulse rounded-xl bg-[var(--border)]/60" />
        </div>
      </div>
    </div>
  );
}

const PremiumCalculator = dynamic(
  () => import("./PremiumCalculator").then((m) => m.PremiumCalculator),
  { ssr: false, loading: () => <ToolLoading /> }
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
  if (!resource || !resource.toolId) return null;
  const config = getPremiumTool(resource.toolId);
  if (!config) return null;

  const topicObj = getTopic(topic);
  const label = topicObj?.label ?? "this topic";

  return (
    <section
      className="my-12 not-prose"
      aria-labelledby={`premium-tool-${topic}`}
      style={{ minHeight: 48 }}
    >
      <div className="mb-3 flex items-center gap-2">
        {/* Accent chip: indigo (var(--accent)) with white text. No --navy on this site. */}
        <span className="inline-block bg-[var(--accent)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white rounded">
          Free interactive tool
        </span>
      </div>
      <h2 id={`premium-tool-${topic}`} className="sr-only">
        Free {label} tool
      </h2>

      {/* Mobile: show a topic-aware capture instead of the chart-heavy calculator */}
      <div className="sm:hidden">
        <MobileToolSlot topic={topic} />
      </div>

      {/* Desktop: show the full interactive calculator */}
      <div className="hidden sm:block">
        <PremiumCalculator
          config={config}
          full={full}
          placement={placement}
          category={category}
          topicKey={topic}
        />
      </div>
    </section>
  );
}
