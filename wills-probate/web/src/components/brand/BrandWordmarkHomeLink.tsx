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
      aria-label={`${siteConfig.name} · ${siteConfig.tagline}`}
      className={`group inline-flex items-center gap-2 ${focusRing} ${className}`.trim()}
    >
      <span
        className="inline-block h-7 w-7 rounded-sm bg-orange-500"
        aria-hidden
        style={{ minWidth: "1.75rem" }}
      />
      <span
        className={`font-semibold tracking-tight text-neutral-900 transition-colors group-hover:text-orange-600 ${
          isFooter ? "text-base" : "text-sm sm:text-base"
        }`}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}
