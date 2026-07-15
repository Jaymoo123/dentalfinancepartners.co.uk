import Link from "next/link";
import { siteConfig } from "@/config/site";
import { siteContainerLg } from "./layout-utils";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 py-10">
      <div className={siteContainerLg}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold text-neutral-900">{siteConfig.name}</p>
          <ul className="flex flex-wrap gap-4 text-sm text-neutral-600">
            {siteConfig.footer.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#c9861b] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-xs text-neutral-400">{siteConfig.company.legalDisclosure}</p>
      </div>
    </footer>
  );
}
