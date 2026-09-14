import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/components/hubs/HubParts";

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
      {/* Same kit PageHero as /about, same dark tone, so the masthead does not
          change ground or type scale between the two. Heading and standfirst
          strings unchanged. */}
      <PageHero
        eyebrow="Contact"
        tone="dark"
        title="Contact us"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      >
        <p>Tell us about your charity, CIC or social enterprise.</p>
      </PageHero>

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
