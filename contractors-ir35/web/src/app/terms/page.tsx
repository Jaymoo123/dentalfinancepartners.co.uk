import type { Metadata } from "next";
import { contentNarrow, sectionYLoose } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <section className="bg-white">
      <div className={`${contentNarrow} ${sectionYLoose}`}>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Terms of use</h1>
        <div className="prose-blog mt-10">
          <p>By using this website you agree to the following terms. Please read them carefully.</p>
          <h2>Editorial content</h2>
          <p>The articles, guides and information on this site are for general informational purposes only. They do not constitute professional tax or accounting advice. Tax rules change and individual circumstances vary. Always consult a qualified accountant before making financial decisions based on information you have read here.</p>
          <h2>No professional relationship</h2>
          <p>Reading this website or submitting an enquiry form does not create a professional relationship between you and {siteConfig.legalName}. A professional relationship begins only when we have agreed the scope of work in writing.</p>
          <h2>Intellectual property</h2>
          <p>All content on this site is the property of {siteConfig.legalName} unless otherwise stated. You may not reproduce it without written permission.</p>
          <h2>Links</h2>
          <p>We are not responsible for the content of external websites linked from this site.</p>
          <h2>Governing law</h2>
          <p>These terms are governed by English law. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          <h2>Contact</h2>
          <p>{siteConfig.legalName}, <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></p>
        </div>
      </div>
    </section>
  );
}
