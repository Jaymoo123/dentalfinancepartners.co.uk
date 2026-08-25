import Link from "next/link";
import { siteConfig } from "@/config/site";

// §3 rota row 10: dense broadsheet footer. Hairline columns, small-caps headers,
// entity details + Companies House link, all nav routes + legal links. Never glass.
export function Footer() {
  const half = Math.ceil(siteConfig.nav.length / 2);
  const navCols = [siteConfig.nav.slice(0, half), siteConfig.nav.slice(half)];

  return (
    <footer className="mt-24 border-t border-hairline-strong bg-paper">
      <div className="mx-auto max-w-[1200px] px-(--gutter) py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5 md:border-r md:border-hairline md:pr-10">
            <p className="font-display text-lg font-medium text-ink">
              {siteConfig.name}
            </p>
            <p className="type-caption mt-3 !text-ink-70">
              {siteConfig.tagline}
            </p>
            <p className="type-caption mt-6">
              {siteConfig.company.legalName}, registered in{" "}
              {siteConfig.company.placeOfRegistration}, company no.{" "}
              <a
                href={`https://find-and-update.company-information.service.gov.uk/company/${siteConfig.company.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-ink"
              >
                {siteConfig.company.number}
              </a>
              . Registered office: {siteConfig.company.registeredOfficeLine}.
            </p>
          </div>

          {navCols.map((col, i) => (
            <nav
              key={i}
              aria-label={i === 0 ? "Footer" : "Footer continued"}
              className="md:col-span-2 md:border-r md:border-hairline md:pr-6"
            >
              {i === 0 ? <p className="type-eyebrow mb-4">Explore</p> : <p className="type-eyebrow mb-4 md:invisible">Explore</p>}
              <ul className="space-y-2.5">
                {col.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-70 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-3">
            <p className="type-eyebrow mb-4">Legal</p>
            <ul className="space-y-2.5">
              {siteConfig.footer.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-70 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="type-caption mt-6">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="underline underline-offset-2 hover:text-ink"
              >
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
        </div>

        <hr className="rule mt-12" aria-hidden="true" />
        <p className="type-caption mt-5 text-center">
          © {new Date().getFullYear()} {siteConfig.company.legalName}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
