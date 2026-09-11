import { focusRing } from "@/components/ui/layout-utils";

/** The sister-site cross-promotion block, mirrored locally out of the retired
 *  `SiteFooter.tsx` because the kit chrome has no slot for it (playbook T12:
 *  mirror rather than edit the kit, which would change Property).
 *
 *  It is passed to the kit footer's `newsletterSlot`, documented as "passed
 *  already styled for the navy ground; nothing here restyles it", so this
 *  component owns its own colours. It renders in the narrow brand column under
 *  the description, hence a two-item stack rather than the old 3-column grid.
 *
 *  Both links are ABSOLUTE EXTERNAL URLs to our own sister brands (Ashfield
 *  Trading Ltd). They are not part of the internal link baseline, so they neither
 *  protect nor threaten the link floor. `rel` and `target` are byte-identical to
 *  the retired block: followed, `noopener noreferrer`, new tab. Changing `rel` on
 *  a cross-estate link is an SEO decision nobody has asked for.
 *
 *  Contrast on the kit footer ground (navy #001b3d, painted by DentistsBackdrop):
 *  card ground = white/10 over navy; heading white 13.04; body white/70 7.25;
 *  focus ring primary-400 3.16 on the card and 4.15 on the footer ground. */
const SISTER_SITES = [
  {
    href: "https://www.accountsforlawyers.co.uk",
    name: "Accounts for Lawyers",
    blurb: "Specialist accounting for solicitors & law firms",
  },
  {
    href: "https://www.medicalaccounts.co.uk",
    name: "Medical Accountants UK",
    blurb: "Accounting for GPs, consultants & medical professionals",
  },
];

export function SisterSites() {
  return (
    <div className="mt-6">
      <h2 className="text-xs font-bold uppercase tracking-widest text-white">
        Our Specialist Accounting Services
      </h2>
      <ul className="mt-3 flex flex-col gap-2">
        {SISTER_SITES.map((site) => (
          <li key={site.href}>
            <a
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`block rounded-lg border border-white/20 bg-white/10 p-3 transition-colors hover:border-white/30 hover:bg-white/15 ${focusRing}`}
            >
              <span className="block text-sm font-semibold text-white">{site.name}</span>
              <span className="mt-1 block text-xs leading-relaxed text-white/70">{site.blurb}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
