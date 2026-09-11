/**
 * Site-parameterised consumption of the estate `nav-active-state` guard:
 * exactly one dropdown child may light on its own page. A child that reuses
 * the top-level PREFIX predicate instead of an exact match lights two rows at
 * once and the menu stops answering "where am I".
 *
 * Medical has three shared stems (/blog/*, /medical-guides/*, /for-*), so the
 * regression this guards is not hypothetical here.
 *
 * The guard runs against this site's real nav data, built by src/lib/nav.ts.
 */
import { registerNavActiveStateGuard } from "@accounting-network/web-shared/design/guards/nav-active-state";
import { buildPrimaryNav } from "@/lib/nav";

registerNavActiveStateGuard({ nav: buildPrimaryNav() });
