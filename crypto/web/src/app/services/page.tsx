import type { Metadata } from "next";
import Link from "next/link";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { DrawnTickList } from "@accounting-network/web-shared/design/marketing/DrawnTickList";
import { PageHero } from "@/app/_parts/PageHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { sectionY, siteContainerLg } from "@/components/ui/layout-utils";
import { cryptoServices } from "@/data/crypto-services";
import { serviceTiers } from "@/config/service-tiers";
import { siteConfig } from "@/config/site";
import { stripHtml } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Crypto Tax Services | Crypto Tax Partners" },
  description: "Crypto tax services: HMRC disclosure, Self Assessment, Koinly reconciliation, CGT planning and investor vs trader status advice.",
  alternates: { canonical: `${siteConfig.url}/services` },
};

export default function ServicesPage() {
  return (<>
    <PageHero eyebrow="Crypto tax services" title="Crypto tax services." items={[{ label: "Home", href: "/" }, { label: "Services" }]}>
      <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">Five specialist services built around the tax and compliance obligations that cryptoasset holders actually face.</p>
    </PageHero>

    <section className="bg-slate-50">
      <div className={`${siteContainerLg} ${sectionY}`}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cryptoServices.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group flex flex-col rounded-xl bg-white p-6 ring-1 ring-slate-200/70 transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)] sm:p-8">
              <h2 className="text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-primary-700 sm:text-xl">{service.title}</h2>
              {/* ponytail: card sits inside a Link, so the intro's inline anchors are stripped rather than nested */}
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{stripHtml(service.intro)}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">Learn more</span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-slate-200 bg-white">
      <div className={`${siteContainerLg} ${sectionY}`}>
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Three service tiers</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Simple CGT filing for straightforward investors, full reconciliation for complex portfolios, and disclosure support for prior-year corrections. You can move tier at any point.
          </p>
        </div>
        <ServiceTiers tiers={serviceTiers} featuredBadge="Most popular" />
      </div>
    </section>

    {/* The site's one enquiry surface on this route, kept where it has always
        been. Deliberately NOT the kit's LeadCTAPanel: its proofPoints contract
        is {title, detail}, and this page's three published lines are single
        sentences with no second half. Adopting the panel would mean either
        inventing a detail string for each or dropping three lines of published
        copy, and neither is a design decision. */}
    <section className="border-t border-slate-200 bg-slate-50">
      <div className={`${siteContainerLg} ${sectionY}`}>
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Not sure which service you need?</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">Tell us about your crypto situation and we will explain what is required.</p>
            {/* Kit list, not three hand-rolled rows with a literal "✓" glyph. The
                three strings are the published ones, unchanged. `tickClassName` is
                passed because the component's default (primary-400, #c9835c) is
                tuned for navy and measures 2.4:1 on this slate-50 ground; the 600
                step (#8f421f) measures 6.7:1 there, clear of the 3.0 graphic floor
                the mark is held to.

                The draw-on-scroll animation needs a `.tick-draw` rule. The kit's
                own lives in globals-standard.css, which this site does not import,
                but this site now declares its own in app/globals.css (the
                `.tick-draw` block and its prefers-reduced-motion / scripting gate),
                so the ticks DO draw here. With JavaScript off or under
                prefers-reduced-motion the collapsed state never applies and every
                tick renders fully drawn, which is the kit's own end state. */}
            <DrawnTickList
              className="mt-8 space-y-3 text-sm text-slate-600"
              tickClassName="text-primary-600"
              items={[
                "Reviewed by a crypto tax specialist, not a generalist",
                "No obligation, free initial reply",
                "We explain what is required before any engagement begins",
              ]}
            />
          </div>
          <div className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900">Get in touch</h3>
            <p className="mt-2 text-sm text-slate-600">Tell us what you need and we will come back to you.</p>
            <div className="mt-6">
              <LeadForm redirectOnSuccess={false} submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </>);
}
