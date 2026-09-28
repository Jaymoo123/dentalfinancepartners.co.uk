"use client";

import { UtensilsCrossed } from "lucide-react";
import { SiteHeader } from "@accounting-network/web-shared/design/chrome/SiteHeader";
import { niche } from "@/config/niche-loader";

/**
 * 2026-09-28 parity fix: this site had no header CTA at any width (brief
 * section 4). The kit's SiteHeader is a client component (its wordmark icon
 * prop is a component function, which cannot cross the RSC boundary), so it
 * needs this thin client wrapper the way crypto/generalist/charities do
 * (their `components/ui/PageShell.tsx`). Nav is intentionally omitted: this
 * site's real nav data lives in niche.config.json `navigation`, not the kit's
 * NavItem shape, and porting that is a separate design-port task (D1); the
 * kit falls back to an empty nav list and still renders wordmark + CTA +
 * burger, which is the whole of what this fix needs.
 */
export function SiteHeaderWrap() {
  return (
    <SiteHeader
      ctaPrimary={{ label: niche.cta.sticky_button, href: "/contact" }}
      wordmarkIcon={UtensilsCrossed}
      wordmarkTop={niche.display_name.split(" ")[0]?.toUpperCase() ?? "HOSPITALITY"}
      wordmarkBottom={niche.display_name.split(" ").slice(1).join(" ").toUpperCase() || "TAX"}
      wordmarkAccentColor={niche.brand.primary_color}
    />
  );
}
