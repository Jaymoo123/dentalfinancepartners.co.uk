import type { ReactNode } from "react";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteConfig } from "@/config/site";
import { siteContainerLg } from "@/components/ui/layout-utils";
import CryptoBackdrop from "@/components/layout/CryptoBackdrop";

/**
 * The shallow navy page hero, Property's `SlimHero` anatomy rebuilt on crypto's
 * own ground.
 *
 * NOT the kit `SlimHero`, deliberately. That primitive hardcodes `bg-slate-900`
 * (#0f172a) and the kit is manager-direct, so the colour cannot be overridden
 * from here: a second `bg-*` utility on the same element ties on specificity and
 * the winner is decided by Tailwind's emission order, not by the class string.
 * crypto's locked ground identity is navy #0e1a3a, which is also what
 * `/about` already rendered before this port, so the hero is written out here at
 * that value instead of adopted and then fought.
 *
 * `_parts` is a Next.js private folder: it holds no route and cannot become one.
 *
 * Owner: the backdrop/art-direction package (U4, 2026-09-14). The port left this
 * file with no declared owner; it now has one. Its props contract, heading level
 * and breadcrumb behaviour are depended on by nine route families, so a signature
 * change here is a breaking change for other packages.
 *
 * `CryptoBackdrop` is mounted as the first child, which is why the section carries
 * `relative overflow-hidden` and the container `relative z-10` (the backdrop's host
 * contract). Do not drop either.
 *
 * Chrome contract (W1): the shell supplies `<main id="main">`, the header and the
 * footer. This is page content, so it opens at `<h1>` and adds no landmark of its
 * own.
 *
 * `items` is optional and omitted on the three noindex token-gated flow pages:
 * a breadcrumb trail to a page no crawler may index is fiction, and it would put
 * a BreadcrumbList in the JSON-LD for a URL that is not in the sitemap.
 */
export function PageHero({
  eyebrow,
  title,
  items,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Breadcrumb trail. Omit entirely on noindex pages. */
  items?: { label: string; href?: string }[];
  /** Standfirst and any hero-level ask. */
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0e1a3a] py-12 sm:py-16">
      <CryptoBackdrop />
      <div className={`${siteContainerLg} relative z-10`}>
        <div className="max-w-3xl">
          {items ? <Breadcrumb items={items} siteUrl={siteConfig.url} onDark /> : null}
          <Eyebrow onDark>{eyebrow}</Eyebrow>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </section>
  );
}
