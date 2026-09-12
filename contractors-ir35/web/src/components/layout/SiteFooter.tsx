import { FileBadge } from "lucide-react";
import { SiteFooter as KitSiteFooter } from "@accounting-network/web-shared/design/chrome/SiteFooter";
import { siteConfig } from "@/config/site";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";

/**
 * Kit adoption (design port P1-3). showBuilderCredit intentionally omitted:
 * this site did not commission Double Wired Creative, so the credit link
 * would be neither earned nor on-brand (kit default is Property-only true).
 *
 * nav/fallbackNav/companyItems/resourcesHref are left at kit defaults.
 * niche.config.json's `navigation` is flat (no children/groups), so the
 * Services/Resources columns derive to empty and are dropped by the kit's
 * own `.filter((column) => column.items.length > 0)` -- no dead columns.
 * The kit's DEFAULT_COMPANY_ITEMS (About, Contact, Locations, Book a
 * consultation) all resolve to real routes on this site (verified: `ls
 * src/app` has about/, contact/, book/; DESIGN_DELTA.md confirms /locations
 * live), so nothing invented lands in the footer. Grouping the flat nav
 * into `navigation[]` groups (Tools: Calculators/Glossary/Research/Resources)
 * is IA authoring, priced as phase 2 work in DESIGN_DELTA.md §7 -- not done
 * here.
 *
 * footerLinks carries the site's full existing footer_links (9 items,
 * unchanged) rather than kit convention's legal-only subset, so this package
 * cannot regress the link floor: everything that linked before still does.
 *
 * Wordmark icon/lockup: DESIGN_DELTA.md §1 flags this as an owner BLOCKER,
 * PROPOSED but not yet picked. Using the delta's own proposal (lucide
 * FileBadge, "CONTRACTOR TAX" / "ACCOUNTANTS · IR35 SPECIALISTS") rather
 * than leaving the prop unfillable -- the kit's type requires it. One-line
 * revert if the owner picks differently or picks the Briefcase fallback.
 */
export function SiteFooter() {
  return (
    <KitSiteFooter
      description={siteConfig.description}
      footerLinks={siteConfig.footer}
      legalDisclosure={siteConfig.company.legalDisclosure}
      legalName={siteConfig.company.legalName}
      tradingName={siteConfig.company.tradingName}
      wordmarkIcon={FileBadge}
      wordmarkTop="CONTRACTOR TAX"
      wordmarkBottom="ACCOUNTANTS · IR35 SPECIALISTS"
      consentToggle={<ConsentToggle className="text-xs text-slate-400 hover:text-white transition-colors underline hover:no-underline inline-block py-1" />}
    />
  );
}
