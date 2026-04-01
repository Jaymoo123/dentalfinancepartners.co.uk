import Link from "next/link";
import { focusRing, siteContainer } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-4 border-emerald-600 bg-slate-900 text-white">
      <div className={`${siteContainer} py-12 sm:py-16`}>
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:gap-16">
          <div className="min-w-0">
            <div className="text-2xl font-bold text-white mb-2">Property Accountants UK</div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm border-l-2 border-emerald-600 pl-4">
              <a 
                href={`mailto:${siteConfig.contact.email}`}
                className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                {siteConfig.contact.email}
              </a>
              <a 
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
          
          <div className="min-w-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {siteConfig.footer.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors border-b border-transparent hover:border-emerald-400 ${focusRing}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-10 pb-10 border-b border-slate-100/20 mt-12">
          <h2 className="text-lg font-semibold text-white mb-4">Our Specialist Accounting Services</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://accountsforlawyers.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-4 rounded-lg bg-white/10 border border-white/20 transition-all hover:bg-white/15 hover:border-white/30 ${focusRing}`}
            >
              <h3 className="font-semibold text-white">Accounts for Lawyers</h3>
              <p className="mt-1 text-sm text-white/70">Specialist accounting for solicitors & law firms</p>
            </a>
            <a
              href="https://accountsfordentists.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-4 rounded-lg bg-white/10 border border-white/20 transition-all hover:bg-white/15 hover:border-white/30 ${focusRing}`}
            >
              <h3 className="font-semibold text-white">Accounts for Dentists</h3>
              <p className="mt-1 text-sm text-white/70">Specialist accounting for dental practices</p>
            </a>
            <a
              href="https://medicalaccountants.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-4 rounded-lg bg-white/10 border border-white/20 transition-all hover:bg-white/15 hover:border-white/30 ${focusRing}`}
            >
              <h3 className="font-semibold text-white">Medical Accountants</h3>
              <p className="mt-1 text-sm text-white/70">Specialist accounting for medical professionals</p>
            </a>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-slate-700">
          <p className="text-xs leading-relaxed text-slate-400">
            © {year} {siteConfig.legalName}. Registered in England and Wales.
          </p>
        </div>
      </div>
    </footer>
  );
}
