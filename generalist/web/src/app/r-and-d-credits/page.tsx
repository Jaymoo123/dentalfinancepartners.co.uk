import type { Metadata } from "next";
import Link from "next/link";
import { Beaker, Bot, Code, Cpu, FileSearch, LineChart } from "lucide-react";
import {
  siteContainerLg,
  btnPrimary,
  btnSecondary,
  btnOnCream,
  heroCreamSurface,
} from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow, Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { ExampleFigureNote } from "@accounting-network/web-shared/design/primitives/ExampleFigureNote";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { StatsCounter, type StatItem } from "@accounting-network/web-shared/design/marketing/StatsCounter";
import { CoverageCards } from "@accounting-network/web-shared/design/marketing/CoverageCards";
import { ProcessTimeline } from "@accounting-network/web-shared/design/marketing/ProcessTimeline";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { RelatedArticles, type RelatedArticleItem } from "@accounting-network/web-shared/design/blog/RelatedArticles";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { getRelatedPosts, slugifyCategory, firstSentence } from "@/lib/blog";
import { JsonLd, buildService, buildFaqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "R&D Tax Credits for UK Businesses | Specialist Claims",
  description:
    "Specialist R&D tax credit claims for UK companies. Software, AI, engineering, manufacturing, biotech, food tech. Merged scheme and ERIS. Fixed fee or no-win-no-fee available.",
  alternates: { canonical: `${siteConfig.url}/r-and-d-credits` },
  openGraph: {
    title: "R&D Tax Credits for UK Businesses",
    description: "Specialist R&D tax credit claims for UK companies. Fixed fee or contingent options available.",
    url: `${siteConfig.url}/r-and-d-credits`,
    type: "website",
  },
};

const RD_CATEGORY = "R&D Tax Credits";
const RD_HUB = `/blog/${slugifyCategory(RD_CATEGORY)}`;

/**
 * Every figure on this page is the merged-scheme machinery locked in
 * `docs/generalist/house_positions.md` (verification log entry for the merged
 * scheme + ERIS, and the §21.6 page-level restatement rule): 20% expenditure
 * credit, ERIS at the 30% intensity threshold, periods beginning on or after
 * 1 April 2024. §21.6 also bans claim-farm positioning, "most businesses
 * qualify" framing and sector-percentage teasers, so no claim-value range,
 * average or volume appears anywhere on this page.
 */
const stats: StatItem[] = [
  { target: 20, suffix: "%", label: "Merged scheme expenditure credit" },
  { target: 30, suffix: "%", label: "R&D intensity threshold for ERIS" },
  { target: 40, suffix: " days", label: "HMRC's stated processing time (working days)" },
  { target: 30, suffix: " min", label: "Free eligibility assessment call" },
];

const qualifying = [
  {
    icon: Bot,
    title: "AI and machine learning",
    body: "Custom model training, RAG pipelines, fine-tuning LLMs for specific industries, agent orchestration, novel ML architectures. What a claim is worth follows your qualifying expenditure, not your sector.",
  },
  {
    icon: Code,
    title: "Software and SaaS",
    body: "Custom architecture, novel integrations, performance optimisations beyond published benchmarks, bespoke developer tooling and platform engineering.",
  },
  {
    icon: Cpu,
    title: "Engineering and product development",
    body: "Mechanical, electrical and electronic product design where the solution wasn't obvious to a competent professional. Prototyping, testing, iterative redesign.",
  },
  {
    icon: Beaker,
    title: "Manufacturing and process improvement",
    body: "Novel materials, production process improvements that resolve technical uncertainty, automation builds, quality control systems beyond off-the-shelf.",
  },
  {
    icon: LineChart,
    title: "Custom software development",
    body: "Custom CMS architecture, headless commerce builds, novel integrations between systems with no off-the-shelf connectors, performance-critical infrastructure.",
  },
  {
    icon: FileSearch,
    title: "Biotech, food tech and scientific R&D",
    body: "Formulation work, process science, novel testing methods, scientific advance in a recognised field. Lab work, trials, iterative experimentation.",
  },
];

const process = [
  { n: "01", title: "Eligibility assessment", body: "30-min call. We review your projects against HMRC's qualifying activity tests, and we are as explicit about the work that falls outside the guidelines as the work that falls inside." },
  { n: "02", title: "Project scoping", body: "We identify which specific projects qualify, apportion staff time, and quantify subcontractor and cloud costs. Done in 1-2 weeks." },
  { n: "03", title: "Claim preparation", body: "Full technical narrative + costing schedule. Built to HMRC's current standards, with proper documentation that holds up under enquiry." },
  { n: "04", title: "Submission & monitoring", body: "We submit, monitor HMRC processing, and handle any questions. HMRC's stated processing time for the merged scheme is 40 working days." },
];

const faqs = [
  {
    q: "Does my company actually qualify?",
    a: "Qualification is narrower than the marketing around R&D suggests. The test is whether your work involves resolving genuine scientific or technological uncertainty, building something where a competent professional couldn't have just looked up the answer. Custom AI work, novel integrations, bespoke automation, engineering breakthroughs and process science can qualify. Pure configuration of off-the-shelf tools, template customisation, routine design and standard implementations do not. We assess for free.",
  },
  {
    q: "What's a claim worth?",
    a: "It depends entirely on your qualifying expenditure, so we will not quote a range before seeing your figures. The mechanics are fixed: for accounting periods beginning on or after 1 April 2024 the merged scheme gives an expenditure credit of 20% of qualifying R&D expenditure, and a loss-making SME whose R&D spend is at least 30% of total expenditure claims instead under Enhanced R&D Intensive Support (ERIS). The estimator gives you a directional figure from your own numbers.",
  },
  {
    q: "What changed with the merged scheme in April 2024?",
    a: "For accounting periods beginning on or after 1 April 2024, the old SME and RDEC schemes were merged into one above-the-line expenditure credit at 20% of qualifying expenditure. Loss-making R&D-intensive SMEs, where R&D spend is at least 30% of total expenditure, claim under Enhanced R&D Intensive Support (ERIS) instead. Subcontracted R&D and externally provided workers are only partly claimable, and a PAYE and NIC cap can limit a payable credit where payroll is small relative to the claim size.",
  },
  {
    q: "Do you charge a percentage of the claim?",
    a: "We offer two options: fixed fee or contingent (percentage of successful claim, capped). A fixed fee costs less in total on a substantive claim; the contingent option carries no upfront cost, which suits a first-time claimant. We quote both on the initial call and you pick the one you want.",
  },
  {
    q: "How long does a claim take to process at HMRC?",
    a: "HMRC's stated processing time is 40 working days for the merged scheme, though it's currently averaging 8-12 weeks. Enquiry rates have risen significantly since the 2023-24 reforms, so the quality of your technical narrative and costing schedule matters more than ever. We build claims to current HMRC standards.",
  },
];

const CURATED_READING: RelatedArticleItem[] = [
  {
    href: "/fundamentals/r-and-d-tax-credits-explained",
    title: "R&D tax credits explained",
    excerpt: "The merged scheme, ERIS and what counts as qualifying expenditure, in one guide.",
    kind: "guide",
  },
  {
    href: "/fundamentals/r-and-d-tax-credit-specialist",
    title: "What an R&D tax credit specialist actually does",
    excerpt: "How a claim is built, and what separates a defensible narrative from a boilerplate one.",
    kind: "guide",
  },
  {
    href: "/glossary/r-and-d-tax-credits",
    title: "R&D tax credits: definition",
    excerpt: "The short definition, for when you only need the term.",
    kind: "guide",
  },
  {
    href: RD_HUB,
    title: "All R&D tax credit articles",
    excerpt: "Eligibility, claim mechanics, sector-specific qualifying activities and HMRC edge cases.",
    kind: "guide",
  },
];

export default function RDPage() {
  const service = buildService({
    name: "R&D Tax Credit Claims for UK Companies",
    description:
      "Specialist R&D tax credit claim preparation for UK companies. Software, AI, engineering, manufacturing, biotech, food tech and innovation-led services.",
    url: "/r-and-d-credits",
    serviceType: "R&D tax credit claim preparation",
    areaServed: "United Kingdom",
  });
  const faqPage = buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })));

  // Real posts, so the closing grid can never point at an article that moved.
  const posts = getRelatedPosts("", RD_CATEGORY, 8).map((p) => ({
    href: `/blog/${slugifyCategory(p.category)}/${p.slug}`,
    title: p.title,
    excerpt: firstSentence(p.contentHtml, p.summary),
  }));

  return (
    <>
      <JsonLd data={faqPage ? [service, faqPage] : [service]} />

      <section
        className={`relative flex items-center overflow-hidden py-10 sm:py-12 lg:py-14 min-h-[320px] sm:min-h-[380px] ${heroCreamSurface}`}
      >
        <GeneralistBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              items={[{ label: "Home", href: "/" }, { label: "R&D Tax Credits" }]}
            />
            <Eyebrow>Specialist R&D claims · Merged scheme + ERIS</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-slate-900 text-balance sm:text-4xl lg:text-6xl">
              R&amp;D tax credits for <span className="text-primary-700">UK companies</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:mt-6 sm:text-lg">
              If your company resolves genuine scientific or technological uncertainty, that work can
              attract relief under the merged R&D scheme. We prepare claims for software, AI,
              engineering, manufacturing and biotech companies, and we say so when the work does not
              qualify.
            </p>
            <div className="mt-6 flex flex-col flex-wrap gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link
                href="#book"
                data-cta="rd_hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={btnPrimary}
              >
                Book a free eligibility check
              </Link>
              <Link
                href="/calculators/rd-tax-credit-estimator"
                data-cta="rd_hero_calculator"
                data-cta-placement="hero"
                className={btnOnCream}
              >
                Try the calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* White hairline strip, the estate's stats treatment. The old full-bleed
          brand band was decoration; these are the scheme's own numbers. */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={stats} />
          <ExampleFigureNote className="mt-4">
            Merged scheme and ERIS figures apply to accounting periods beginning on or after 1 April 2024.
          </ExampleFigureNote>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Where R&D shows up</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 text-balance sm:text-4xl">
            Which companies typically qualify?
          </h2>
          <Prose>
            <p>
              Six settings where qualifying R&D activity commonly arises. Whether yours qualifies
              turns on the technological uncertainty in the work itself, not on the sector it sits in.
            </p>
          </Prose>
          <CoverageCards items={qualifying} columns={3} tone="slate" />
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The process</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 text-balance sm:text-4xl">
            How our R&D claims process works
          </h2>
          <Prose>
            <p>
              Four steps from initial assessment to HMRC payment. Read down and the sequence advances
              with you.
            </p>
          </Prose>
          <ProcessTimeline steps={process} />
        </div>
      </section>

      {/* Mid-page tool cross-link: statement left, secondary action right. */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="flex flex-col gap-5 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Get a directional estimate first
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                The free R&D Tax Credit Estimator runs your own qualifying spend through the merged
                scheme, so you have a figure in front of you before you talk to anyone. It sits with{" "}
                <Link href="/calculators" className="font-semibold text-primary-700 underline underline-offset-4">
                  the rest of the calculators
                </Link>
                , and the{" "}
                <Link
                  href="/fundamentals/how-does-corporation-tax-work"
                  className="font-semibold text-primary-700 underline underline-offset-4"
                >
                  corporation tax guide
                </Link>{" "}
                explains where the credit lands in your return.
              </p>
            </div>
            <Link
              href="/calculators/rd-tax-credit-estimator"
              data-cta="rd_midpage_calculator"
              data-cta-placement="midpage"
              className={`${btnSecondary} shrink-0`}
            >
              Open the calculator
            </Link>
          </div>
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          eyebrow="Free 30-min eligibility check"
          title="Book a free R&D eligibility check"
          description="We review your projects against HMRC's qualifying activity tests. You leave with a clear yes or no, and a directional estimate of claim size."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm redirectOnSuccess={false} submitLabel="Book my R&D eligibility check" />}
          backdrop={<GeneralistBackdrop />}
          footnote="In the message field, please describe the type of custom development, engineering or process work your company does."
        />
      </div>

      <FaqSection
        eyebrow="FAQ"
        title="R&D credit FAQ"
        faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))}
        className="bg-white py-12 sm:py-16 lg:py-20"
      />

      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Read the R&D library</Eyebrow>
          <h2 className="mb-8 text-2xl font-bold text-slate-900 text-balance sm:text-4xl">
            Eligibility, claim mechanics and HMRC edge cases
          </h2>
          <RelatedArticles columns={3} items={[...CURATED_READING, ...posts]} />
        </div>
      </section>
    </>
  );
}
