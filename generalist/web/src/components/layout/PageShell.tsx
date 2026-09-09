"use client";

import type { ReactNode } from "react";
import { Briefcase } from "lucide-react";
import { PageShell as KitPageShell } from "@accounting-network/web-shared/design/chrome/PageShell";
import type { NavItem } from "@accounting-network/web-shared/design/chrome/nav";
import { getActiveCta } from "@accounting-network/web-shared/lib/niche-config";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";
import { SignupForm } from "@/components/newsletter/SignupForm";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { WORDMARK_TOP, WORDMARK_BOTTOM } from "@/components/brand/BrandWordmarkHomeLink";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";

const activeCta = getActiveCta(niche);

/**
 * Site chrome = the shared kit's PageShell. This file is only the per-site
 * wiring (brand strings, CTA copy, analytics ids, slots); no chrome markup
 * lives here any more, and nothing restyles the kit inline.
 *
 * Client component by necessity: the kit shell takes an icon component and
 * two ReactNode slots, which cannot cross the RSC boundary as props. `nav` is
 * plain data, built server-side in layout.tsx so the tool registry never
 * reaches the client bundle.
 *
 * StickyCTA is deliberately NOT mounted here: it is mounted on the homepage
 * only (app/page.tsx), matching Property.
 */
export function PageShell({ children, nav }: { children: ReactNode; nav?: NavItem[] }) {
  return (
    <KitPageShell
      nav={nav}
      header={{
        ctaPrimary: activeCta.header_primary,
        ctaSecondary: activeCta.header_secondary,
        ctaVariant: niche.cta.variant,
        // Generalist's own live `vw_cta_performance` ids, kept. Renaming them
        // to the kit defaults would break three reporting series.
        ctaIds: {
          primary: "header_nav_primary",
          mobilePrimary: "header_mobile_primary",
          secondary: "header_nav_secondary",
        },
        wordmarkIcon: Briefcase,
        wordmarkTop: WORDMARK_TOP,
        wordmarkBottom: WORDMARK_BOTTOM,
      }}
      footer={{
        description: siteConfig.description,
        footerLinks: siteConfig.footer,
        // The old footer carried a second standing disclaimer sentence next to
        // the copyright line; it folds in here rather than being dropped.
        legalDisclosure: `${siteConfig.company.legalDisclosure} Editorial content; book a call for advice specific to your business.`,
        legalName: siteConfig.company.legalName,
        tradingName: siteConfig.company.tradingName,
        wordmarkIcon: Briefcase,
        wordmarkTop: WORDMARK_TOP,
        wordmarkBottom: WORDMARK_BOTTOM,
        backdrop: <GeneralistBackdrop tone="navy" />,
        consentToggle: <ConsentToggle className="inline-block py-1 text-xs text-slate-400 underline hover:text-white hover:no-underline" />,
        resourcesHref: "/fundamentals",
        // No /book route here, and a second /contact entry would collide with
        // the Contact link's key; /services lives here so the route keeps its
        // footer presence now that footer_links is legal-only.
        companyItems: [
          { label: "Services", href: "/services" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Locations", href: "/locations" },
        ],
        newsletterSlot: (
          <div className="mt-8 max-w-md">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-400 sm:text-sm">
              The Director&rsquo;s Brief
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              One short note a week. UK business tax, structure, payroll, cash.
            </p>
            <div className="mt-4">
              <SignupForm source="footer" variant="minimal" tone="dark" ctaLabel="Subscribe" />
            </div>
          </div>
        ),
      }}
    >
      {children}
    </KitPageShell>
  );
}
