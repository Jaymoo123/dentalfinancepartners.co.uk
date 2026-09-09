/**
 * Site-parameterised consumption of the estate `nav-active-state` guard:
 * exactly one dropdown child may light on its own page. A child reusing the
 * top-level PREFIX predicate instead of an exact match lights two rows at
 * once, and the menu stops answering "where am I".
 *
 * Runs against this site's real nav data (niche.config.json navigation), the
 * same array SiteHeader renders, with the registry-derived Calculators groups.
 */
import { registerNavActiveStateGuard } from "@accounting-network/web-shared/design/guards/nav-active-state";
import { buildPrimaryNav } from "@/lib/nav";

registerNavActiveStateGuard({ nav: buildPrimaryNav() });
