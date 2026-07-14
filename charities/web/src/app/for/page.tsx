import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { charityTypes } from "@/data/charity-types";

export const metadata: Metadata = {
  title: "Sectors We Work With | Charities, CICs and Social Enterprises",
  description:
    "Specialist charity accounting for community interest companies, social enterprises, charitable incorporated organisations, and registered charities of all sizes.",
};

export default function ForIndexPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-[#1a5c4a] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Specialist accounting for charities, CICs and social enterprises.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Each sector has different accounting requirements, regulatory obligations and tax treatment. We know the specific position for each and where the compliance risks and opportunities actually are.
          </p>
        </div>
      </section>

      <section className="bg-[#1a5c4a]/5 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {charityTypes.map((type) => (
              <Link key={type.slug} href={`/for/${type.slug}`} className="group block bg-white border border-neutral-200 p-5 sm:p-6 transition-all hover:border-[#1a5c4a] hover:shadow-md">
                <span className="text-base font-bold text-neutral-900 group-hover:text-[#1a5c4a] transition-colors">{type.title}</span>
                <p className="mt-2 text-sm text-neutral-500 group-hover:text-neutral-600 transition-colors line-clamp-2">{type.intro.split(".")[0]}.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Each sector has its own rules.</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              <p>A registered charity, a community interest company and a social enterprise may all pursue similar purposes but they operate under different legislation, file with different regulators and have different tax positions. The accounting requirements are not the same.</p>
              <p>Getting the structure wrong at the outset creates compliance problems that take years to unwind. Getting the accounts wrong means failed independent examinations, Charity Commission queries and funder reporting issues. We work with all three sectors week in, week out.</p>
            </div>
            <div className="mt-8">
              <Link href="/contact" className={btnPrimary}>Get in touch</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
