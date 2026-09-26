"use client";

import { useEffect } from "react";
import Link from "next/link";
import { btnPrimary, btnSecondary, siteContainer, sectionY, focusRing } from "@/components/ui/layout-utils";

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

  /* Renders inside the root layout, so it keeps the kit chrome: PageShell
     supplies the header, footer, skip link and the single <main id="main">.
     There is no global-error.tsx on this site, so a throw in the root layout
     itself falls through to Next's own default page, which no styling here can
     reach. No breadcrumb: this boundary replaces the content of whatever route
     threw, so a trail here would assert a position in the tree that is not
     knowable. `.ground-dark` is deliberately absent: every ground below is
     white, and the light --focus-ring default is the correct one.
     ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx (its
     docblock scopes it to /thank-you, /book and /complete) and
     packages/web-shared/design/primitives/NoticeCard.tsx (it is a static
     notice panel and would swallow the reset button, which is the only reason
     this page is a client component). */
  return (
    <div className={`${siteContainer} ${sectionY}`}>
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
          <button onClick={reset} className={btnPrimary}>
            Try again
          </button>
          {/* ADOPTED: btnSecondary, re-exported from
              packages/web-shared/design/layout-utils.ts. Replaces a local
              neutral-outline recipe that carried no focus ring at all. Its
              border-primary-600 is #9e6615 (4.81 on white) and its
              text-primary-700 is #8a5e1a (5.68 on white). */}
          <Link
            href="/"
            className={btnSecondary}
          >
            Go home
          </Link>
        </div>

        <p className="mt-8 text-sm text-neutral-500">
          If this keeps happening, please{" "}
          {/* text-orange-700 was a raw Tailwind orange, not this site's brand
              ramp. primary-700 is #8a5e1a (5.68 on white), primary-800 #6f4b15
              (7.80). The link also had no focus ring. */}
          <Link href="/contact" className={`font-semibold text-primary-700 hover:text-primary-800 ${focusRing}`}>
            get in touch
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
