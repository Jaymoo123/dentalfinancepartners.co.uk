import type { Metadata } from "next";
import Link from "next/link";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LeadForm } from "@/components/forms/LeadForm";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  buildBreadcrumbJsonLd,
  buildCollectionPage,
  JsonLd,
} from "@/lib/schema/index";
import { genericTools } from "@/lib/tools/registry";

/** ONE binding for the size of the collection. The page used to say "Five" in
 *  prose while the CollectionPage JSON-LD emitted `numberOfItems: tools.length`
 *  = 13, so the structured data and the visible copy disagreed (T17). Both now
 *  read this list, and the metadata description does too, so adding a tool
 *  cannot re-open the gap.
 *  ponytail: module-scope const, not a context or a helper. */
const TOOLS = genericTools();

const TITLE = "Dental Tax Calculators (UK 2026/27)";
const DESCRIPTION =
  `Free UK dental calculators: UDA value, associate take-home, practice valuation, locum structure (Ltd vs umbrella vs sole-trader), and principal partnership vs Ltd-co extraction. ${TOOLS.length} tools, all at 2026/27 rates.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${siteConfig.url}/calculators`,
    languages: {
      "en-GB": `${siteConfig.url}/calculators`,
      "x-default": `${siteConfig.url}/calculators`,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.url}/calculators`,
    type: "website",
  },
};

export default function CalculatorsIndexPage() {
  const tools = TOOLS;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Calculators" },
  ];

  const collectionSchema = buildCollectionPage({
    name: TITLE,
    description: DESCRIPTION,
    path: "/calculators",
    numberOfItems: tools.length,
  });
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />

      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            {/* Gold on the navy section ground is 6.23 and PASSES: the sanctioned
                deviation in DESIGN_DELTA s3. Measured against this section, not
                against white. Do not sweep it. */}
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
              Free tools · UK 2026/27 rates
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Dental tax calculators
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              {tools.length} dental-specific calculators built on 2026/27 UK tax rates.
              All run in your browser; no data is collected unless you choose to follow up with us.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/calculators/${tool.slug}`}
                className={`group block rounded-xl border-2 border-[var(--border)] bg-white p-6 transition-all hover:border-[var(--gold)] hover:shadow-md ${focusRing}`}
              >
                {/* The card ground is white, where --gold-strong is 3.76 and fails
                    the 4.5 text floor. These three lines carried it; they are now
                    on the neutral and navy ramps. The hover BORDER stays gold:
                    gold is a non-text accent and a border is not text. */}
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-2">
                  {tool.category}
                </p>
                <h3 className="text-lg font-semibold text-[var(--ink)] group-hover:text-[var(--navy-soft)]">
                  {tool.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {tool.oneLiner}
                </p>
                <p className="mt-4 text-sm font-semibold text-[var(--navy-soft)]">
                  Open calculator →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Approved end-of-page enquiry panel. The card grid above sits on
          --surface (white), so the panel takes the slate ground to read as its
          own band; `contained` also keeps a navy slab from running into the
          navy footer. Its submit is LeadForm's `btnPrimary`: navy ground, white
          label, 17.15 measured against the button's own navy, on a light
          section, which is the light-ground rule. */}
      <LeadCTAPanel
        contained
        eyebrow="Next step"
        title="Ask a dental accountant what your figures mean"
        description="A calculator gives you a number. What it cannot tell you is whether the way you are set up is the right one for the position you are in. Send us the figures you have just run and we will come back with a plain view of what they imply for your NHS and private mix, your pension, and whatever you are planning next."
        proofPoints={[
          { title: "Dentistry is all we do", detail: "UDAs, superannuation and practice sales are routine here" },
          { title: "Your workings, checked", detail: "We show which assumptions move the answer, and by how much" },
          { title: "A straight recommendation", detail: "If your current set-up already fits, we will say so" },
        ]}
        formTitle="Send us your figures"
        form={<LeadForm redirectOnSuccess={false} submitLabel="Ask about my figures" />}
      />
    </>
  );
}
