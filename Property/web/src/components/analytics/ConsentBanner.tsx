"use client";

/**
 * Cookie/analytics consent banner. Because the gate-everything model means we
 * lose data on visitors who leave before deciding, the banner is clear, concise,
 * and gives a genuine choice (Accept / Decline) without dark patterns.
 */
import Link from "next/link";

type ConsentBannerProps = {
  onAccept: () => void;
  onReject: () => void;
};

export function ConsentBanner({ onAccept, onReject }: ConsentBannerProps) {
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-slate-200 bg-white/95 p-4 shadow-[0_-4px_24px_rgba(15,23,42,0.08)] backdrop-blur sm:p-5"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-slate-600">
          We use privacy-first analytics to understand how visitors use this site
          so we can improve it. No data is collected until you choose. See our{" "}
          <Link href="/cookie-policy" className="font-semibold text-emerald-700 underline">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="font-semibold text-emerald-700 underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={onReject}
            className="rounded-lg border-2 border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
