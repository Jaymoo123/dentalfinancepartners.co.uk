import type { Metadata } from "next";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import {
  siteContainerLg,
  sectionYLoose,
} from "@/components/ui/layout-utils";
import { PageHero } from "@/components/hubs/HubParts";
import { niche } from "@/config/niche-loader";

export const metadata: Metadata = {
  title: "About | Specialist Charity Accountants",
  description:
    "Specialist charity accounts, Gift Aid and VAT support for UK charities, CICs and social enterprises, from a team that works only with the charity sector.",
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <>
      {/* One hero vocabulary: the same PageHero the ported hubs use, dark tone,
          which is the ground generalist gives /about and the nearest reading of
          the primary-600 block this replaces. Heading and standfirst strings are
          byte-identical to what shipped; this is a visual change only. The
          eyebrow is the page name, because PageHero requires one and a label is
          not the place to make a claim. */}
      <PageHero
        eyebrow="About"
        tone="dark"
        title="We only work with charities, CICs and social enterprises."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      >
        <p>
          Because the Charities SORP, fund accounting, Gift Aid and independent examination are specific enough that general accounting experience is not the same as specialist experience.
        </p>
      </PageHero>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="min-w-0 space-y-6 text-base leading-relaxed text-slate-700 sm:text-lg">
            <p>We are a charity-only tax and accounts team. We write the guides and build the calculators on this site, and when you send an enquiry it goes to one of our charity accountants, who works only with charities, community interest companies and social enterprises, rather than to a generalist meeting the Charities SORP for the first time.</p>
            <p>The independent examination is the clearest example. Many trustees do not know what the examiner is looking for, what the examiner needs the accounts to include, or how to make the examination process straightforward. We prepare the accounts with the examination in mind and connect you with an independent examiner.</p>
            <p>The same applies to Gift Aid and GASDS claims, fund accounting for restricted grants, the Charities SORP presentation requirements, and the Charity Commission annual return. These are not things that come up occasionally for us. They are the core of what we do.</p>
          </div>
        </div>
      </section>


      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          eyebrow="Get started"
          title="Talk to one of our charity accountants"
          description="Tell us about your charity, CIC or social enterprise and we will explain what your organisation needs, in plain English, with no obligation."
          proofPoints={[]}
          formTitle="Get in touch"
          form={<LeadForm submitLabel="Send enquiry" />}
          contained
          ground="white"
        />
      </div>
    </>
  );
}
