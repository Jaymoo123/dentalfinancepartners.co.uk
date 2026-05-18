import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { UdaValueCalculator } from "@/components/calculators/UdaValueCalculator";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  buildBreadcrumbJsonLd,
  buildFaqPage,
  buildService,
  JsonLd,
} from "@/lib/schema/index";

const TITLE = "UDA Value Calculator UK 2025/26";
const DESCRIPTION =
  "Free UDA value calculator for UK NHS dentists. Effective UDA value from your contract, benchmarked against 2025/26 regional ranges with cumulative inflation since signing.";

const FAQS = [
  {
    question: "What is the average UDA value in England?",
    answer:
      "In 2025/26, UDA values across England typically sit in a £25-£35 range, with most NHS contracts at the lower end of that band. The national average is less useful than your effective UDA value (contract value ÷ annual UDA volume), which is what actually drives your practice income.",
  },
  {
    question: "Is my UDA value adjusted for inflation?",
    answer:
      "Generally no, in real terms it has fallen. Your contract UDA value is set at signing (or revised in periodic uplifts) but does not automatically track CPI or RPI. NHS contract uplifts have historically lagged inflation, meaning real value per UDA has declined for most practices since contract introduction in 2006.",
  },
  {
    question: "How is Welsh UDA different from English?",
    answer:
      "Wales restructured its dental contract from April 2022 (the Welsh General Dental Services contract). The activity measurement is different and the values per unit are calibrated differently. Welsh UDA equivalents typically sit at £25-£38 in 2025/26, with more flexibility around contract redesign than the English GDS contract.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/calculators/uda-value`, languages: { "en-GB": `${siteConfig.url}/calculators/uda-value`, "x-default": `${siteConfig.url}/calculators/uda-value` } },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${siteConfig.url}/calculators/uda-value`, type: "website" },
};

export default function UdaValuePage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Calculators", href: "/calculators" },
    { label: "UDA Value" },
  ];
  const serviceSchema = buildService({
    name: "UDA Value Calculator",
    description: DESCRIPTION,
    path: "/calculators/uda-value",
    serviceType: "Dental Tax Calculator",
    category: "Dental Practice Tools",
  });
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(FAQS);
  const schemaPayload = faqSchema ? [serviceSchema, breadcrumbSchema, faqSchema] : [serviceSchema, breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemaPayload} />
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
              Calculator · UK 2025/26
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
              UDA Value Calculator
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              Your contract&apos;s effective UDA value, benchmarked against 2025/26 regional ranges, with cumulative inflation since signing.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <UdaValueCalculator />
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Frequently asked</h2>
            <dl className="mt-8 space-y-5">
              {FAQS.map((f) => (
                <div key={f.question} className="rounded-2xl border-l-4 border-[var(--gold)] bg-white p-6">
                  <dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">Want a deeper review?</h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
              The UDA value is one number. Whether your contract is structured efficiently against the rest of your practice income, NHS Pension contributions, and tax position needs a wider review.
            </p>
            <div className="mt-8">
              <Link href="/free-practice-health-check" className={`inline-flex min-h-12 items-center rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--gold-strong)] ${focusRing}`}>
                Take the free practice health check
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
