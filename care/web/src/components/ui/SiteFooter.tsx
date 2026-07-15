import Link from "next/link";
import { siteConfig } from "@/config/site";
import { siteContainerLg } from "./layout-utils";

const footerLinks = [
  { label: "Services", href: "/services" },
  { label: "For you", href: "/for" },
  { label: "Calculators", href: "/calculators" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-300">
      <div className={`${siteContainerLg} py-12`}>
        <div className="text-base font-bold text-white">{siteConfig.name}</div>
        <p className="mt-3 max-w-2xl text-sm text-neutral-400">{siteConfig.tagline}</p>
        <ul className="mt-6 flex flex-wrap gap-4 text-sm">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-neutral-300 hover:text-white transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 border-t border-neutral-800 pt-6 text-xs leading-relaxed text-neutral-500">
          {siteConfig.company.legalDisclosure}
        </p>
      </div>
    </footer>
  );
}
