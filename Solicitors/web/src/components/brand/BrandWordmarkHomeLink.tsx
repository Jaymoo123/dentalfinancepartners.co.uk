import Link from "next/link";
import { focusRing } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

type BrandWordmarkHomeLinkProps = {
  /** Merged onto the root link (e.g. footer sizing). */
  className?: string;
  /** Larger wordmark for the footer tile. */
  size?: "header" | "footer";
};

/** Text-only home link for the header; footer can use a slightly larger variant. */
export function BrandWordmarkHomeLink({ className = "", size = "header" }: BrandWordmarkHomeLinkProps) {
  const isFooter = size === "footer";
  return (
    <Link
      href="/"
      className={`group flex min-w-0 flex-col leading-none ${focusRing} rounded-lg px-1 py-0.5 ${
        isFooter ? "max-w-none" : "max-w-[11rem] sm:max-w-none"
      } ${className}`.trim()}
    >
      <span
        className={`font-bold uppercase tracking-[0.18em] text-[var(--primary)] sm:tracking-[0.2em] ${
          isFooter ? "text-xs sm:text-sm" : "text-[0.65rem] sm:text-xs"
        }`}
      >
        Accounts for Lawyers
      </span>
      <span
        className={`mt-0.5 border-t-2 border-[var(--accent)] font-semibold uppercase text-[var(--primary)] ${
          isFooter
            ? "pt-1.5 text-[0.65rem] tracking-[0.32em] sm:pt-2 sm:text-xs sm:tracking-[0.38em]"
            : "pt-1 text-[0.6rem] tracking-[0.32em] sm:text-[0.65rem] sm:tracking-[0.38em]"
        }`}
      >
        UK
      </span>
      <span className="sr-only"> — {siteConfig.tagline}</span>
    </Link>
  );
}
