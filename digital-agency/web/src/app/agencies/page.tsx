import type { Metadata } from "next";
import Link from "next/link";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: `Agency Types We Work With | ${siteConfig.name}`,
  description: `Specialist accounting for all agency types: marketing, creative, digital, advertising, PR, web design, SEO and recruitment agencies across the UK and UAE.`,
  alternates: { canonical: `${siteConfig.url}/agencies` },
  openGraph: {
    title: `Agency Types We Work With`,
    description: `Specialist accounting for marketing, creative, digital, PR, web, SEO and recruitment agency founders.`,
    url: `${siteConfig.url}/agencies`,
    type: "website",
  },
};

const agencyTypes = [
  {
    name: "Marketing agencies",
    href: "/agencies/marketing-agencies",
    description: "Retainer-based marketing, branding and digital marketing agencies.",
  },
  {
    name: "Digital agencies",
    href: "/agencies/digital-agencies",
    description: "Digital transformation, product and technology-led agencies.",
  },
  {
    name: "Creative agencies",
    href: "/agencies/creative-agencies",
    description: "Branding, design and creative production studios.",
  },
  {
    name: "Advertising agencies",
    href: "/agencies/advertising-agencies",
    description: "Media buying, campaign and full-service advertising agencies.",
  },
  {
    name: "PR agencies",
    href: "/agencies/pr-agencies",
    description: "Public relations, communications and press office agencies.",
  },
  {
    name: "Web design agencies",
    href: "/agencies/web-design-agencies",
    description: "Web design, web development and UX agencies.",
  },
  {
    name: "SEO & PPC agencies",
    href: "/agencies/seo-agencies",
    description: "Search marketing, SEO and paid media management agencies.",
  },
  {
    name: "Recruitment agencies",
    href: "/agencies/recruitment-agencies",
    description: "Recruitment, staffing and executive search agencies.",
  },
  {
    name: "PPC agencies",
    href: "/agencies/ppc-agencies",
    description: "Paid search, Google Ads and Meta Ads management agencies.",
  },
  {
    name: "Performance marketing agencies",
    href: "/agencies/performance-marketing-agencies",
    description: "Multi-channel performance marketing, attribution and CRO agencies.",
  },
  {
    name: "Social media agencies",
    href: "/agencies/social-media-agencies",
    description: "Content production, community management and paid social agencies.",
  },
  {
    name: "Influencer marketing agencies",
    href: "/agencies/influencer-marketing-agencies",
    description: "Creator partnerships, talent management and influencer programmes.",
  },
  {
    name: "Email marketing agencies",
    href: "/agencies/email-marketing-agencies",
    description: "Klaviyo, HubSpot and lifecycle email marketing specialists.",
  },
  {
    name: "Branding agencies",
    href: "/agencies/branding-agencies",
    description: "Brand strategy, identity design and naming studios.",
  },
  {
    name: "AI agencies",
    href: "/agencies/ai-agencies",
    description: "AI consultancy, custom model and LLM-based product builds.",
  },
  {
    name: "E-commerce agencies",
    href: "/agencies/ecommerce-agencies",
    description: "Shopify Plus, headless commerce and conversion specialists.",
  },
  {
    name: "Video production agencies",
    href: "/agencies/video-production-agencies",
    description: "Commercial, brand film, content production and post studios.",
  },
  {
    name: "SaaS & software agencies",
    href: "/agencies/saas-agencies",
    description: "Custom software builds, product-services hybrid agencies.",
  },
  {
    name: "Crypto & Web3 agencies",
    href: "/agencies/crypto-web3-agencies",
    description: "Smart contract development, token economics and Web3 brand work.",
  },
];

export default function AgenciesIndexPage() {
  return (
    <>
      <div className={`${siteContainerLg} py-12`}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Agencies" },
          ]}
        />

        <header className="mt-6 mb-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Agencies we work with
          </h1>
          <p className="text-xl text-slate-600">
            We work exclusively with agency founders across every agency type. If you sell expertise and time, we understand your business model, your tax position and the specific decisions you face.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl">
          {agencyTypes.map((agency) => (
            <Link
              key={agency.href}
              href={agency.href}
              className="group block bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-600 transition-all"
            >
              <h2 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {agency.name}
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{agency.description}</p>
              <div className="mt-4 flex items-center text-indigo-600 font-medium text-sm">
                Learn more
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Not sure which fits your agency?</h2>
          <p className="text-slate-600 mb-8">
            Many agencies do not fit neatly into one category, and that is fine. What matters is that you sell expertise and time, and that your tax, accounts and financial structure are set up properly for how your business actually works. Book a call and we will talk through your specific situation.
          </p>
        </div>
      </div>

      <div className="bg-indigo-50 border-t-2 border-indigo-600/20">
        <div className={`${siteContainerLg} py-16`}>
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-indigo-900 sm:text-3xl">Book a free call</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Tell us about your agency and we will show you where you can save tax and get better visibility of your finances.
            </p>
            <div className="mt-8">
              <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
