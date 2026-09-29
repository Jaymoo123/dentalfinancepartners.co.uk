import type { WidgetClasses } from "./types";

/**
 * The class recipes startups-tech renders today (its R7-reviewed build), as a
 * factory over the site's own focus-ring recipe.
 *
 * Class strings only, never a hex value. Every brand ramp step below is the
 * step startups-tech measured and locked (buttons on 700/800, header ground on
 * primary-950, chip border on primary-500, placeholder on slate-500); a second
 * consumer overrides any entry it disagrees with:
 *
 *   classes: { ...defaultWidgetClasses(focusRing), container: "fixed bottom-24 right-4 z-[55] print:hidden" }
 */
export function defaultWidgetClasses(focusRing: string): WidgetClasses {
  return {
    focusRing,
    container: "fixed bottom-4 right-4 z-[55] print:hidden",
    panel:
      "absolute bottom-full right-0 mb-3 flex w-[min(92vw,23rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl",
    header: "ground-dark flex items-center gap-3 bg-primary-950 px-4 py-3 text-white",
    headerAvatar:
      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-600 ring-2 ring-white/15",
    headerTitle: "truncate text-sm font-bold leading-tight",
    headerSubtitle: "truncate text-[11px] text-slate-300",
    closeButton: `flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded text-2xl leading-none text-slate-300 hover:text-white ${focusRing}`,
    conversation: "flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4",
    messageAvatar:
      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white",
    messageBubble:
      "max-w-[82%] rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-3 py-2 text-sm leading-relaxed text-slate-800 shadow-sm",
    successBubble:
      "max-w-[82%] rounded-2xl rounded-tl-sm border border-primary-200 bg-primary-50 px-3 py-2 text-sm font-medium text-primary-900 shadow-sm",
    chipRow: "flex flex-wrap gap-2 pl-9",
    chip: `inline-flex items-center rounded-full border border-primary-500 bg-white px-3 py-3 text-sm font-medium text-primary-800 hover:bg-primary-50 ${focusRing}`,
    footer: "border-t border-slate-200 bg-white p-3",
    primaryButton: `w-full rounded-lg bg-primary-700 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-800 ${focusRing}`,
    submitButton: `w-full rounded-lg bg-primary-700 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-60 ${focusRing}`,
    input: `mt-1 w-full min-h-12 touch-manipulation rounded-md border border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 placeholder:text-slate-500 transition-colors focus:border-primary-600 ${focusRing}`,
    honeypot: "absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0",
    errorText: "text-xs font-medium text-red-600",
    consentText: "text-[11px] leading-relaxed text-slate-500",
    privacyLink: `rounded font-semibold text-primary-700 underline ${focusRing}`,
    peekCard:
      "absolute bottom-full right-0 mb-3 flex w-[min(88vw,20rem)] items-start gap-2 rounded-2xl border border-primary-200 bg-white p-3 shadow-2xl",
    peekButton: `flex-1 rounded text-left text-sm font-medium leading-snug text-slate-800 hover:text-primary-700 ${focusRing}`,
    peekDismiss: `-mr-1 -mt-1 flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded p-1 text-slate-400 hover:text-slate-700 ${focusRing}`,
    launcher: `relative flex h-[52px] w-[12.5rem] shrink-0 items-center justify-center gap-2 rounded-full bg-primary-700 px-4 text-sm font-semibold text-white shadow-2xl hover:bg-primary-800 ${focusRing}`,
    badgeWrap: "absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center",
    badgePing:
      "absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60 motion-reduce:animate-none",
    badge:
      "relative flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white shadow-sm ring-2 ring-white",
  };
}
