import Link from "next/link";
import { btnPrimary, sectionY, siteContainerLg } from "@/components/ui/layout-utils";

/**
 * CHROME ONLY. Both sentences are the pre-port copy, byte for byte. `btnPrimary`
 * is the local recipe from src/components/ui/layout-utils.ts, which already
 * carries the --focus-ring recipe, so nothing here hand-rolls a ring.
 *
 * ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx (its
 * docblock scopes it to the three token-gated post-submit pages) and
 * packages/web-shared/design/marketing/LeadCTAPanel.tsx and
 * marketing/StickyCTA.tsx (a new lead-capture surface and an interruption, both
 * owner-gated, and a 404 is the wrong place for either).
 */
export default function NotFound() {
  return (
    <div className={`${siteContainerLg} ${sectionY} text-center`}>
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">Page not found</h1>
      <p className="mt-4 text-base leading-relaxed text-neutral-500">
        The page you requested does not exist or has moved.
      </p>
      <p className="mt-8 flex justify-center">
        <Link href="/" className={`${btnPrimary} w-full max-w-xs sm:w-auto`}>
          Back to homepage
        </Link>
      </p>
    </div>
  );
}
