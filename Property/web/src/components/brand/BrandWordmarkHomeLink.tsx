import Link from "next/link";
import { focusRing } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

type BrandWordmarkHomeLinkProps = {
  className?: string;
  size?: "header" | "footer";
};

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
        className={`font-bold uppercase tracking-[0.18em] text-slate-900 sm:tracking-[0.2em] ${
          isFooter ? "text-xs sm:text-sm" : "text-[0.65rem] sm:text-xs"
        }`}
      >
        Property
      </span>
      <span
        className={`mt-0.5 border-t-2 border-emerald-600 font-bold uppercase text-slate-900 ${
          isFooter
            ? "pt-1.5 text-[0.65rem] tracking-[0.32em] sm:pt-2 sm:text-xs sm:tracking-[0.38em]"
            : "pt-1 text-[0.6rem] tracking-[0.32em] sm:text-[0.65rem] sm:tracking-[0.38em]"
        }`}
      >
        Accountants UK
      </span>
      <span className="sr-only"> — {siteConfig.tagline}</span>
    </Link>
  );
}
