import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { NHSPensionCalculator } from "@/components/calculators/NHSPensionCalculator";
import { LocumTaxCalculator } from "@/components/calculators/LocumTaxCalculator";
import { IncorporationCalculator } from "@/components/calculators/IncorporationCalculator";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Free Medical Tax Calculators | NHS Pension, Locum Tax & Incorporation",
  description:
    "3 free calculators for UK doctors: NHS pension annual allowance & tapered allowance, locum doctor tax calculator, private practice incorporation comparison. Current 2025/26 & 2026/27 tax rates. Instant results.",
  alternates: { canonical: `${siteConfig.url}/calculators` },
  openGraph: {
    title: "Free Medical Tax Calculators for UK Doctors",
    description: "Calculate NHS pension allowance, locum tax, and incorporation savings. 2025/26 & 2026/27 rates.",
    url: `${siteConfig.url}/calculators`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Medical Tax Calculators for UK Doctors",
    description: "Calculate NHS pension allowance, locum tax, and incorporation savings. 2025/26 & 2026/27 rates.",
  },
};

export default function CalculatorsPage() {
  return (
    <>
      <section className="relative h-[300px] sm:h-[350px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=2000&q=85"
          alt="Medical professionals"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-[var(--navy)]/85" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <h1 className="text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Medical tax calculators for UK doctors
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl leading-relaxed text-white">
              Free calculators built by specialist medical accountants. Work out your NHS pension annual allowance,
              locum tax liability, and private practice incorporation savings.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="space-y-12 sm:space-y-16">
            <div id="nhs-pension">
              <NHSPensionCalculator />
            </div>

            <div id="locum-tax">
              <LocumTaxCalculator />
            </div>

            <div id="incorporation">
              <IncorporationCalculator />
            </div>
          </div>

          <div className="mt-12 sm:mt-16 bg-[var(--navy)] p-6 sm:p-10 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Need help interpreting your results?
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-slate-200 max-w-3xl mx-auto">
              These calculators provide simplified estimates. For a full analysis of your specific situation —
              including NHS pension planning, locum tax optimization, or private practice incorporation feasibility — speak to one
              of our medical accountants.
            </p>
            <div className="mt-6 sm:mt-8">
              <Link href="/contact" className={`${btnPrimary} bg-[var(--copper)] border-[var(--copper-strong)] text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4`}>
                Book free consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
