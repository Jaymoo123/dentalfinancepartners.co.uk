import Link from "next/link";
import { focusRing } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

/**
 * Large typographic mark on the navy hero. Avoids an empty box when `/brand/logo.png`
 * is missing — add that asset later if you want a raster mark here instead.
 */
export function BrandLogoHero() {
  return (
    <div className="mb-6 sm:mb-8">
      <Link
        href="/"
        className={`group inline-flex max-w-full flex-col leading-none ${focusRing} rounded-lg outline-offset-4`}
      >
        <span className="text-base font-bold uppercase tracking-[0.2em] text-white sm:text-lg md:text-xl">
          Dental Finance
        </span>
        <span className="mt-2 border-t-2 border-[var(--gold)] pt-2 text-sm font-semibold uppercase tracking-[0.34em] text-white sm:mt-2.5 sm:pt-2.5 sm:text-base sm:tracking-[0.38em] md:text-lg">
          Partners
        </span>
        <span className="sr-only"> — {siteConfig.tagline}</span>
      </Link>
    </div>
  );
}
