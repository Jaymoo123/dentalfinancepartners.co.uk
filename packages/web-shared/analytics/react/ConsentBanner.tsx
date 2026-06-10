"use client";

/**
 * Cookie/analytics consent banner for opt-in posture sites. Mount this inside
 * ConsentProvider when posture is "opt-in" (tracking is gated behind explicit
 * accept). It is unmounted by default — opt-out sites do not use it.
 *
 * Provide links to your site's own cookie-policy and privacy-policy pages.
 */
import Link from "next/link";

type ConsentBannerProps = {
  onAccept: () => void;
  onReject: () => void;
  cookiePolicyPath?: string;
  privacyPolicyPath?: string;
};

export function ConsentBanner({
  onAccept,
  onReject,
  cookiePolicyPath = "/cookie-policy",
  privacyPolicyPath = "/privacy-policy",
}: ConsentBannerProps) {
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
          <Link href={cookiePolicyPath} className="font-semibold underline">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link href={privacyPolicyPath} className="font-semibold underline">
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
            className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
