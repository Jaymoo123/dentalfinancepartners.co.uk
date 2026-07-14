import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { pharmacyHubs } from "@/data/pharmacies-hubs";
import { siteContainerLg } from "@/components/ui/layout-utils";
export const metadata: Metadata = {
  title: "Who We Help | Pharmacy Finance Partners",
  description: "Specialist accounting for pharmacy owners, buyers, sellers, pharmacy groups, and locum pharmacists.",
  alternates: { canonical: `${siteConfig.url}/for` },
};
export default function ForIndexPage() {
  return (
    <main className={`${siteContainerLg} py-16`}>
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Who we help</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {pharmacyHubs.map((hub) => (
          <Link key={hub.slug} href={`/for/${hub.slug}`} className="group block border border-neutral-200 bg-neutral-50 p-5 sm:p-6 hover:border-[#0f3a4a] hover:shadow-md transition-all">
            <h2 className="text-base font-bold text-neutral-900 group-hover:text-[#0f3a4a] transition-colors">{hub.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">{hub.intro}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
