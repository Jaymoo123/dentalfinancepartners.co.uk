import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { startupsHubs } from "@/data/startups-hubs";
export const metadata: Metadata = {
  title: "Startup Accountants by Company Type | Who We Help",
  description: "Specialist startup tax advice by company type: pre-seed founders, funded startups, SaaS companies, software development companies and fintech startups.",
};
export default function ForIndexPage() {
  return (<>
    <section className="border-b border-neutral-200 bg-[#4f46e5] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Specialist startup tax for every stage and structure.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Each company type faces different tax rules and compliance obligations. We work with all of them.</p>
      </div>
    </section>
    <section className="bg-[#4f46e5]/5 py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {startupsHubs.map((hub) => (
            <Link key={hub.slug} href={`/for/${hub.slug}`} className="group block bg-white border border-neutral-200 p-5 sm:p-6 transition-all hover:border-[#4f46e5] hover:shadow-md">
              <span className="text-base font-bold text-neutral-900 group-hover:text-[#4f46e5] transition-colors">{hub.title}</span>
              <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{hub.headline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>);
}
