"use client";

import { useEffect } from "react";
import Link from "next/link";
import { btnPrimary, focusRing, siteContainerLg, sectionY } from "@/components/ui/layout-utils";

/**
 * CHROME ONLY. Every sentence is the pre-port copy, byte for byte.
 *
 * S3 fix, the one this package was pointed at: the "Go home" button hand-rolled
 * its own two-pixel ring off a literal brand hex, and the "get in touch" link
 * hand-rolled the same hex as its colour. Both bypassed the --focus-ring / brand-ramp
 * mechanism phase 1 minted. Ring now reads `focusRing`, colour now reads the
 * primary ramp.
 *
 * ADOPTION DECLINED: `btnSecondary` from
 * packages/web-shared/design/layout-utils.ts:72. Its ground and shape are right,
 * but it hardcodes a literal `outline-primary-600` Tailwind utility as its focus
 * ring, which is the exact bypass this file is here to retire and which the
 * local `btnPrimary`/`focusRing` declines in layout-utils.ts already name.
 * Composing `focusRing` OVER it would not fix it either: both land at equal
 * specificity and Tailwind's own sort, not source order, picks the winner. So
 * the outline recipe is kept local, built from the same kit shape (rounded-xl,
 * font-bold, min-h-12) with `focusRing` appended.
 */
const btnOutline =
  `inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-xl border-2 border-primary-600 bg-white px-8 py-3.5 text-base font-bold text-primary-700 transition-all duration-150 hover:border-primary-700 hover:bg-primary-50 ${focusRing}`;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Error boundary caught:", error);
    }
  }, [error]);

  return (
    <div className={`${siteContainerLg} ${sectionY}`}>
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Something went wrong
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-neutral-600">
          We encountered an unexpected error. This has been logged and we&apos;ll look into it.
        </p>

        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-left ring-1 ring-red-200">
            <p className="break-words font-mono text-sm text-red-800">
              {error.message}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button onClick={reset} className={btnPrimary}>
            Try again
          </button>
          <Link href="/" className={btnOutline}>
            Go home
          </Link>
        </div>

        <p className="mt-8 text-sm text-neutral-500">
          If this keeps happening, please{" "}
          <Link href="/contact" className={`font-semibold text-primary-700 underline underline-offset-2 ${focusRing} rounded`}>
            get in touch
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
