/**
 * Site-parameterised consumption of the estate `nav-active-state` guard:
 * exactly one dropdown child may light on its own page. A child reusing the
 * top-level PREFIX predicate instead of an exact match lights two rows at
 * once, and the menu stops answering "where am I".
 *
 * Runs against this site's real nav data (niche.config.json navigation), the
 * same array SiteHeader renders.
 */
import { registerNavActiveStateGuard } from "@accounting-network/web-shared/design/guards/nav-active-state";
import { niche } from "@/config/niche-loader";

registerNavActiveStateGuard({ nav: niche.navigation });
