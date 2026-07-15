"use client";

import { useEffect } from "react";
import Link from "next/link";
import { btnPrimary, siteContainer } from "@/components/ui/layout-utils";

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
    <div className={`${siteContainer} py-16 sm:py-24`}>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Something went wrong</h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-500">
          We encountered an unexpected error. This has been logged and we will look into it.
        </p>

        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-left">
            <p className="break-words font-mono text-sm text-red-800">{error.message}</p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button onClick={reset} className={`${btnPrimary} inline-flex`}>
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-neutral-300 bg-white px-7 py-3.5 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
          >
            Go home
          </Link>
        </div>

        <p className="mt-8 text-sm text-neutral-500">
          If this keeps happening, please{" "}
          <Link href="/contact" className="font-semibold text-orange-700 hover:text-orange-800">
            get in touch
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
