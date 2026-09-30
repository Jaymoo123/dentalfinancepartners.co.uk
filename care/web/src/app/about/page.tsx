import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { niche } from "@/config/niche-loader";
import { LeadForm } from "@/components/forms/LeadForm";
export const metadata: Metadata = {
  title: "About | Specialist UK Care Sector Accountants",
  description: `${siteConfig.name} are specialist UK accountants for care providers.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};
export default function AboutPage() {
  return (<>
    <section className="border-b border-neutral-200 bg-[#5a4d75] py-16 sm:py-20">
      <div className={siteContainerLg}>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">We work with UK care providers.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Care home accounts, payroll, VAT and financial compliance are specialist enough that general accounting experience is not the same as care sector experience.</p>
      </div>
    </section>
    <div id="book" className="scroll-mt-24">
      <LeadCTAPanel
        contained
        ground="slate"
        eyebrow="Free call"
        title="Talk to a care sector specialist"
        description="Tell us about your situation and we will reply within 24 hours."
        proofPoints={[]}
        formTitle="Get in touch"
        form={<LeadForm submitLabel="Send enquiry" />}
      />
    </div>
  </>);
}
