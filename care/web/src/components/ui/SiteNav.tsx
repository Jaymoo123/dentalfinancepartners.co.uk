import Link from "next/link";
import { siteConfig } from "@/config/site";
import { siteContainerLg } from "./layout-utils";

// ponytail: static links, no client state. A mobile menu toggle is the only thing
// missing; add a client hamburger when analytics show mobile nav use matters.
const navLinks = [
  { label: "Services", href: "/services" },
  { label: "For you", href: "/for" },
  { label: "Calculators", href: "/calculators" },
  { label: "Research", href: "/research/care-provider-business-index" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <nav className={`${siteContainerLg} flex items-center justify-between gap-6 py-4`} aria-label="Primary">
        <Link href="/" className="text-base font-bold tracking-tight text-neutral-900">
          {siteConfig.name}
        </Link>
        <ul className="hidden md:flex items-center gap-5 text-sm font-medium text-neutral-600">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-[#7d6b9e] transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="md:hidden text-sm font-semibold text-[#7d6b9e]"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
