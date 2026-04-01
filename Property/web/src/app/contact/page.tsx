import type { Metadata } from "next";
import Image from "next/image";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Contact Property Accountants UK | Book Free Consultation",
  description: `Contact ${siteConfig.name} for landlord accounting enquiries. Section 24, MTD, incorporation, portfolio management. 24-hour response. Phone, email, or form.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: "Contact Property Accountants UK",
    description: "Book free consultation for landlord accounting. 24-hour response time.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Property Accountants UK",
    description: "Book free consultation for landlord accounting. 24-hour response time.",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative h-[300px] sm:h-[350px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&q=85"
          alt="UK property cityscape"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-slate-900/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Contact" },
              ]}
            />
            <h1 className="mt-4 sm:mt-6 text-2xl font-bold text-white sm:text-4xl lg:text-6xl">Contact</h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-xl text-white">
              New enquiries by form, phone, or email. We aim to reply within one working day.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <div className="border-l-4 border-emerald-600 bg-slate-50 p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Direct details</h2>
                <dl className="space-y-6 text-base">
                  <div>
                    <dt className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Email</dt>
                    <dd>
                      <a
                        className="text-lg font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-600 transition-colors"
                        href={`mailto:${siteConfig.contact.email}`}
                      >
                        {siteConfig.contact.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Phone</dt>
                    <dd>
                      <a
                        className="text-lg font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-600 transition-colors"
                        href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Response time</dt>
                    <dd className="text-base text-slate-700">
                      Within 24 hours, usually same day
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="bg-slate-900 p-6 sm:p-8 text-white">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">What to expect</h3>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-200">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-emerald-400 font-bold flex-shrink-0 text-base sm:text-lg">✓</span>
                    <span>We&apos;ll respond within 24 hours to confirm receipt</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-emerald-400 font-bold flex-shrink-0 text-base sm:text-lg">✓</span>
                    <span>Initial call to understand your situation</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-emerald-400 font-bold flex-shrink-0 text-base sm:text-lg">✓</span>
                    <span>Clear recommendations with no obligation</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-emerald-400 font-bold flex-shrink-0 text-base sm:text-lg">✓</span>
                    <span>Fixed fee quote if you decide to proceed</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 p-6 sm:p-8 lg:p-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Book your free consultation</h2>
              <LeadForm redirectOnSuccess submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
