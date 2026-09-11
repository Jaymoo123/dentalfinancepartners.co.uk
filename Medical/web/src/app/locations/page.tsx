import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { ProcessTimeline } from "@accounting-network/web-shared/design/marketing/ProcessTimeline";
import { btnPrimary, btnOnDark, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";

export const metadata: Metadata = {
  title: "GP Accountants by Location | Medical Accounting Specialists UK",
  description: `${siteConfig.name} matches doctors in major UK cities with specialist GP accounting and medical tax firms. Find your city.`,
  alternates: { canonical: `${siteConfig.url}/locations` },
  openGraph: {
    title: "GP Accountants by Location | UK Medical Accounting",
    description: `Specialist GP accounting and medical tax services across major UK cities. NHS pension planning, locum tax, private practice advice.`,
    url: `${siteConfig.url}/locations`,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("GP Accountants by Location | UK Medical Accounting")}`, width: 1200, height: 630, alt: "GP Accountants by Location | UK Medical Accounting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GP Accountants by Location | UK Medical Accounting",
    description: `Specialist GP accounting and medical tax services across major UK cities. NHS pension planning, locum tax, private practice advice.`,
  },
};

const cityLabel: Record<string, string> = {
  london: "London",
  manchester: "Manchester",
  birmingham: "Birmingham",
  leeds: "Leeds",
  bristol: "Bristol",
};

/** The remote engagement sequence. This is the section's own prose set out as a
 *  sequence: every step below was already named in the paragraph it replaces. */
const REMOTE_STEPS = [
  {
    n: "01",
    title: "Tell us the position",
    body: "Your role, your income mix and what is currently unresolved. That is what the match is made on, not your postcode.",
  },
  {
    n: "02",
    title: "Secure document sharing",
    body: "Accounts, pension statements and payslips move through a secure portal rather than email attachments.",
  },
  {
    n: "03",
    title: "Video review",
    body: "The specialist firm walks you through what they have read and what they would change, on a call you can take between clinics.",
  },
  {
    n: "04",
    title: "Year end",
    body: "Returns, practice accounts and pension certification are handled to the same deadlines wherever in the UK you work.",
  },
];

/** Closing-panel proof points. Mechanisms only: no fee, no turnaround, no
 *  client count, and nothing that implies an in-house team does the work. */
const MEDICAL_PROOF_POINTS = [
  { title: "Medical work only", detail: "NHS pension, practice accounts and private practice" },
  { title: "Matched to a specialist firm", detail: "Your enquiry goes to accountants who work with doctors" },
  { title: "Covered wherever you practise", detail: "The match is made on your position, not your city" },
];

export default function LocationsHubPage() {
  const orgSchema = buildOrganizationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <MedicalBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            {/* Not suppressed: the page's other script carries Organization only,
                so this is the page's single BreadcrumbList, not a duplicate. */}
            <Breadcrumb
              variant="light"
              items={[{ label: "Home", href: "/" }, { label: "Locations" }]}
            />
            <Eyebrow onDark>UK-wide coverage</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
              GP accountants across the UK
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg">
              Enquiries from GPs, consultants and locum doctors are matched with specialist medical
              accounting firms. Pick your city for local context, or go straight to the form if your
              city is not listed: the match does not depend on it.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#book"
                data-cta="locations_hub_hero_book"
                data-cta-placement="locations_hero"
                data-cta-goal="form"
                className={btnPrimary}
              >
                Speak to a medical accountant
              </Link>
              <Link
                href="#cities"
                data-cta="locations_hub_hero_cities"
                data-cta-placement="locations_hero"
                className={btnOnDark}
              >
                Browse the cities
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="cities" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Cities</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Where the local pages are</h2>
          <ul className="mt-8 grid list-none gap-4 pl-0 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {siteConfig.locations.map((loc) => (
              <li key={loc.slug}>
                <Link
                  href={`/locations/${loc.slug}`}
                  data-cta={`locations_hub_city_${loc.slug}`}
                  data-cta-placement="locations_cities"
                  className={`block h-full rounded-xl bg-white p-6 no-underline shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-[var(--copper)] ${focusRing}`}
                >
                  <span className="text-xl font-bold text-slate-900">
                    {cityLabel[loc.slug] ?? loc.slug}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-slate-600">{loc.title}</span>
                  <span className="mt-4 inline-flex min-h-10 items-center text-sm font-bold text-[var(--copper-deep)]">
                    View local services
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Not on the list</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            Remote service for doctors anywhere in the UK
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            The five cities above have their own pages because that is where doctors search by city.
            They are not the coverage. Enquiries from England, Scotland, Wales and Northern Ireland
            are matched the same way, and NHS pension planning, locum tax returns and private
            practice accounting are all handled remotely. Here is how that runs.
          </p>
          <div className="mt-10">
            <ProcessTimeline steps={REMOTE_STEPS} />
          </div>
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          contained
          title="Not based in these cities?"
          description="Tell us your role and what is unresolved. Your enquiry is matched with a specialist medical accounting firm wherever in the UK you practise."
          proofPoints={MEDICAL_PROOF_POINTS}
          footnote="No obligation and no hard sell. If the specialist firm thinks your position is already right, they will tell you so."
          form={<LeadForm redirectOnSuccess={false} submitLabel="Request a consultation" />}
        />
      </div>
    </>
  );
}
