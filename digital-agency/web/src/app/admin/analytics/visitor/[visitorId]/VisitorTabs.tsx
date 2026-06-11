"use client";

/**
 * Client tab switcher for the visitor detail page. Receives data already
 * humanised on the server (StorySession[] for the narrative, ActivityRow[] for
 * the granular log) so no event props or PII cross into the client bundle.
 */
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { StorySession, ActivityRow } from "@accounting-network/web-shared/console/journey";
import { clockTime } from "@accounting-network/web-shared/console/journey";

type Tab = "story" | "activity";

const DOT: Record<StorySession["lines"][number]["kind"], string> = {
  open: "bg-indigo-500",
  reading: "bg-slate-300",
  step: "bg-indigo-400",
  convert: "bg-indigo-600 ring-2 ring-indigo-200",
  close: "bg-slate-400",
};

export default function VisitorTabs({
  story,
  activity,
}: {
  story: StorySession[];
  activity: ActivityRow[];
}) {
  const [tab, setTab] = useState<Tab>("story");

  return (
    <div className="mt-8">
      <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 text-sm">
        <TabButton active={tab === "story"} onClick={() => setTab("story")}>Story</TabButton>
        <TabButton active={tab === "activity"} onClick={() => setTab("activity")}>Activity log</TabButton>
        <span className="ml-auto pr-2 text-xs text-slate-400">
          {tab === "story" ? "What this person did, in plain English" : "Full chronological event log"}
        </span>
      </div>
      <div className="mt-4">
        {tab === "story" ? <Story story={story} /> : <Activity rows={activity} />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("rounded-md px-4 py-1.5 font-semibold transition-colors", active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800")}
    >
      {children}
    </button>
  );
}

function Story({ story }: { story: StorySession[] }) {
  if (story.length === 0) return <p className="text-slate-400">No activity for this visitor yet.</p>;
  return (
    <div className="space-y-6">
      {story.map((s, si) => (
        <section key={s.sessionId} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <header className="border-b border-slate-100 bg-slate-50 px-4 py-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Visit {si + 1} · {new Date(s.startTs).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
            </h3>
          </header>
          <ol className="px-4 py-3">
            {s.lines.map((l, i) => (
              <li key={i} className="relative flex gap-3 pb-3 last:pb-0">
                {i < s.lines.length - 1 && (
                  <span className="absolute left-[5px] top-3 h-full w-px bg-slate-100" aria-hidden />
                )}
                <span className={cn("relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full", DOT[l.kind])} aria-hidden />
                <div className="min-w-0">
                  <span className="mr-2 font-mono text-[11px] text-slate-400">{clockTime(l.ts)}</span>
                  <span className={cn("text-sm", l.kind === "convert" && "font-semibold text-indigo-800", l.kind === "reading" && "italic text-slate-500", l.kind === "close" && "text-slate-500", l.kind === "open" && "font-medium text-slate-900")}>
                    {l.text}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

function Activity({ rows }: { rows: ActivityRow[] }) {
  if (rows.length === 0) return <p className="text-slate-400">No events for this visitor.</p>;
  return (
    <ol className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {rows.map((r, i) => (
        <li key={i} className={cn("flex items-baseline gap-3 border-b border-slate-50 px-4 py-1.5 text-sm last:border-0", r.kind === "engaged" && "bg-slate-50/60")}>
          <span className="w-14 shrink-0 font-mono text-[11px] text-slate-400">{clockTime(r.ts)}</span>
          <span className={cn(r.kind === "engaged" ? "italic text-slate-500" : "text-slate-800")}>{r.text}</span>
        </li>
      ))}
    </ol>
  );
}
