import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg, sectionY, sectionYLoose } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Link from "next/link";
import { niche } from "@/config/niche-loader";
import { isPackagesMode } from "@accounting-network/web-shared/lib/niche-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name}. Enquiries for UK dental practice accounting and tax support.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: "Contact",
    description: `Contact ${siteConfig.name}. Enquiries for UK dental practice accounting and tax support.`,
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact",
    description: `Contact ${siteConfig.name}. Enquiries for UK dental practice accounting and tax support.`,
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero. Navy ground, gold eyebrow (6.23), white body at /85 (12.55). */}
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Contact" },
            ]}
            variant="light"
          />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
              Get in touch
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Contact
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              New enquiries go through the form below. The more you can say about your situation, NHS or
              private, associate or principal, sole trader or limited company, the better matched the firm
              that picks it up.
            </p>
            {isPackagesMode(niche) ? (
              <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
                Already know what you need? You can see what each level of support covers and{" "}
                <Link
                  href="/pricing"
                  className="font-semibold text-white underline decoration-[var(--gold)] decoration-2 underline-offset-4"
                  data-cta="contact_pricing_link"
                  data-cta-placement="contact"
                  data-cta-variant={niche.cta.variant}
                >
                  sign up online in a couple of minutes
                </Link>
                .
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Body. Light ground: --background #f8fafc. */}
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-10 xl:gap-12">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
              <h2 className="font-serif text-lg font-semibold text-[var(--ink)]">
                What happens after you send it
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                Your enquiry goes to our specialist partner network rather than to a single in-house team.
                Firms are first shown a short summary with your name and contact details removed, and only a
                firm that decides it can help receives your details in full. At most six firms may receive
                them, and often fewer. Whichever firm contacts you will tell you who they are and give you
                their own privacy information at that point.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                Everything we share, and how to object, is set out in our{" "}
                <Link href="/privacy-policy" className="font-semibold text-primary-700 underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                Registered office: {siteConfig.company.registeredOfficeLine}.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
              <LeadForm redirectOnSuccess submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
