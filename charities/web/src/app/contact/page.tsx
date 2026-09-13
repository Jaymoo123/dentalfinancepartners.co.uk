import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { siteContainerLg } from "@accounting-network/web-shared/design/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Speak to ${siteConfig.name} about accounts, independent examination, Gift Aid, VAT and trustee compliance.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  // No page-level <main>: the kit PageShell in layout.tsx already emits
  // <main id="main">, and a second one is two landmarks and invalid HTML.
  return (
    <>
      {/* Same brand-ground hero as /about. primary-600 is #1a5c4a, 7.85 on
          white, so white copy clears the 4.5:1 floor. */}
      <section className="bg-primary-600 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Contact us
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              Tell us about your charity, CIC or social enterprise.
            </p>
          </div>
        </div>
      </section>

      {/* The form sits on a white card over slate-50 so it reads as the one job
          on this page. The form itself is untouched: same component, same
          fields, same endpoint. */}
      <section className="bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8 lg:p-10">
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
