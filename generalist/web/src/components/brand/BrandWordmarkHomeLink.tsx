import Link from "next/link";
import { Briefcase } from "lucide-react";
import { focusRing } from "@/components/ui/layout-utils";

type BrandWordmarkHomeLinkProps = {
  className?: string;
  size?: "header" | "footer";
};

// The two halves of the visible wordmark. The accessible name is built from
// these so it always contains the text on screen — voice-control users say
// what they see (WCAG 2.5.3, Label in Name). Update these, not the label.
// (The previous raster /brand/primary-logo.png carried an off-screen tagline
// in its aria-label, which was the 2.5.3 defect.)
export const WORDMARK_TOP = "Holloway Davies";
export const WORDMARK_BOTTOM = "Accountants";
const HOME_LABEL = `${WORDMARK_TOP} ${WORDMARK_BOTTOM}, home`;

export function BrandWordmarkHomeLink({ className = "", size = "header" }: BrandWordmarkHomeLinkProps) {
  const isFooter = size === "footer";
  return (
    <Link
      href="/"
      aria-label={HOME_LABEL}
      title={HOME_LABEL}
      className={`group flex min-w-0 items-center gap-2 leading-none ${focusRing} rounded-xl px-1 py-0.5 ${
        isFooter ? "max-w-none" : "max-w-[13rem] sm:max-w-none"
      } ${className}`.trim()}
    >
      <Briefcase
        aria-hidden
        strokeWidth={2.25}
        className={`shrink-0 ${isFooter ? "h-6 w-6 text-primary-400" : "h-5 w-5 text-primary-600 sm:h-6 sm:w-6"}`}
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] ${
            isFooter ? "text-xs text-white sm:text-sm" : "text-[0.65rem] text-slate-900 sm:text-xs"
          }`}
        >
          {WORDMARK_TOP}
        </span>
        <span
          aria-hidden
          className={`mt-0.5 h-0.5 w-full ${isFooter ? "bg-primary-400 sm:mt-1" : "bg-primary-600"}`}
        />
        <span
          className={`font-bold uppercase ${
            isFooter
              ? "pt-1.5 text-[0.65rem] tracking-[0.32em] text-white sm:pt-2 sm:text-xs sm:tracking-[0.38em]"
              : "pt-1 text-[0.6rem] tracking-[0.32em] text-slate-900 sm:text-[0.65rem] sm:tracking-[0.38em]"
          }`}
        >
          {WORDMARK_BOTTOM}
        </span>
      </span>
    </Link>
  );
}
