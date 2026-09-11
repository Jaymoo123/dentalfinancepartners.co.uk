import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { ComparisonTable, type ComparisonRow } from "@/components/dentists/ComparisonTable";
import { DentistsBackdrop } from "@/components/layout/DentistsBackdrop";
import { btnGold, btnPrimary, focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { NumberedReasons } from "@accounting-network/web-shared/design/marketing/NumberedReasons";
import { WhyUsList } from "@accounting-network/web-shared/design/marketing/WhyUsList";
import { siteConfig } from "@/config/site";
import { getPostBySlug, getCategorySlug } from "@/lib/blog";
import { GUIDE_NAV_CHILDREN } from "@/lib/nav";
import { allTools } from "@/lib/tools/registry";
import { JsonLd, buildService, buildFaqPage } from "@/lib/schema/index";
import { buildBreadcrumbJsonLd } from "@/lib/schema";
import { buildAccountingService } from "@accounting-network/web-shared/schema";
import { niche } from "@/config/niche-loader";
import { getActiveCta, isPackagesMode } from "@accounting-network/web-shared/lib/niche-config";
import { fmtIndex, monthLabel as activityMonthLabel, type DentalActivitySnapshot } from "@/lib/research/dental-activity-index";
import { fmtGBP, type DentalEarningsSnapshot } from "@/lib/research/dental-earnings-index";
import { fmtDensity, type DentalPracticeDensitySnapshot } from "@/lib/research/dental-practice-density";
import { fmtNumber as fmtFormationNumber, monthLabel as formationMonthLabel, type DentalCompanyFormationSnapshot } from "@/lib/research/dental-company-formation-index";
import activitySnapshot from "@/data/nhs-dental-activity-index.json";
import earningsSnapshot from "@/data/nhs-dental-earnings-index.json";
import densitySnapshot from "@/data/dental-practice-density.json";
import formationSnapshot from "@/data/dental-company-formation-index.json";

const activeCta = getActiveCta(niche);
const packagesMode = isPackagesMode(niche);

/** Goal for the two `home_cta_*` ids, which live under the unrendered
 *  `packagesMode` branch and whose destination is config-driven. Same shape as
 *  Property's, in this site's own goal vocabulary. */
const homeCtaGoal = (href: string) => (href.startsWith("/contact") ? "contact" : "pricing");

const btnMailOutline =
  "inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--navy)]/25 bg-transparent px-6 py-3 text-sm font-semibold tracking-tight text-[var(--navy)] transition-all duration-200 hover:border-[var(--navy)] hover:bg-[var(--navy)]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400";

export const metadata: Metadata = {
  title: "Dental Accountants | Accountants for Dentists UK",
  description: "Specialist dental accountants for UK practice owners, associates and groups. NHS contracts, associate tax, VAT and acquisitions. UK-wide.",
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-GB": siteConfig.url,
      "x-default": siteConfig.url,
    },
  },
  openGraph: {
    title: "Dental Accountants | Accountants for Dentists UK",
    description: "Specialist dental accountants for practice owners, associates and groups. NHS contract accounting, tax planning, VAT and acquisitions.",
    url: siteConfig.url,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Specialist Dental Accountants UK",
    description: "Specialist dental accountants for practice owners, associates and groups. NHS contracts, tax, VAT and acquisitions. London and Manchester.",
    images: [siteConfig.publisherLogoUrl],
  },
};

/** Three teaser posts. `getPostBySlug` returns undefined for a slug that does
 *  not exist and the render filters it out, so a dead slug costs a card and an
 *  internal link in silence. The first entry was
 *  "associate-dentist-tax-self-assessment-uk", which resolves to nothing in the
 *  223-post corpus, so the band has been rendering two cards in a three-column
 *  grid. Corrected to the post that slug was reaching for. */
const PRACTICAL_SLUGS = [
  "associate-dentist-tax-guide-uk",
  "dental-practice-profit-extraction-uk",
  "practice-acquisition-financial-due-diligence",
] as const;

/** The three calculators linked literally from the tools band, so the block
 *  carries crawlable destinations rather than only a hub link. Chosen as the
 *  three whose subject matches the three audiences the page addresses. */
const FEATURED_TOOL_SLUGS = ["uda-value", "associate-take-home", "practice-valuation"] as const;

const activity = activitySnapshot as unknown as DentalActivitySnapshot;
const earnings = earningsSnapshot as unknown as DentalEarningsSnapshot;
const density = densitySnapshot as unknown as DentalPracticeDensitySnapshot;
const formation = formationSnapshot as unknown as DentalCompanyFormationSnapshot;

const realityPoints = [
  {
    title: "Mixed NHS and private income",
    body: "Reconciling NHS contract payments alongside private fee income and capitation plans, and understanding what each actually contributes to your profit, is something most generalist accountants simply do not encounter. We do, regularly.",
  },
  {
    title: "Self assessment confusion for associates",
    body: "Associate dentists are almost always self-employed, but many are not clear on what they can legitimately claim, when to register for VAT, or how their income interacts with pension contributions and higher-rate tax. These things matter.",
  },
  {
    title: "No useful management information",
    body: "Year-end accounts tell you what happened. They rarely help you make decisions. Practice owners who want to understand their cost per surgery, chair utilisation, or associate versus principal profitability need something more structured.",
  },
  {
    title: "Growth without a financial plan",
    body: "Buying a second site or taking on an associate feels like the right move, but without proper cash flow modelling and an understanding of how that changes your tax position, it can create as many problems as it solves.",
  },
];

const whoWeWorkWith = [
  {
    title: "Associate Dentists",
    subtitle: "Self-employed · NHS and private",
    body: "If you are working as an associate, you are running a small business, whether it feels like it or not. Self assessment, allowable expenses, pension planning, and knowing when incorporation makes sense are all things you should have clear answers on. We handle the compliance and make sure you are not overpaying tax through simple oversights.",
  },
  {
    title: "Practice Owners",
    subtitle: "Sole trader · Limited company · Partnership",
    body: "Owning a practice brings a different set of financial questions: payroll for staff and associates, VAT on dental and non-dental income, equipment finance, goodwill, and profit extraction from a limited company. We prepare accounts that are useful, not just compliant, and advise on structure as the practice grows.",
  },
  {
    title: "Multi-Practice Groups",
    subtitle: "Group structures · Acquisition support",
    body: "Running multiple sites introduces complexity around inter-company transactions, group reporting, and acquisition accounting. We work with dentists who are building a group, whether that is two practices or ten, and can support with due diligence, restructuring, and ongoing financial management across the portfolio.",
  },
];

const howWeWorkItems = [
  {
    title: "Annual accounts and corporation tax",
    body: "Prepared accurately, filed on time, and reviewed with you properly, not just emailed over as a PDF you will never open. We explain what the numbers mean for your business.",
  },
  {
    title: "Self assessment and personal tax",
    body: "For associates and practice owners alike. We make sure all legitimate expenses are claimed, that your payment on account position is managed, and that you are not hit with an unexpected HMRC bill.",
  },
  {
    title: "Payroll and associate payments",
    body: "Running payroll for a dental practice has its own quirks, particularly where associates are paid on a percentage split. We handle this cleanly and make sure the treatment of self-employed associates holds up to scrutiny.",
  },
  {
    title: "VAT and mixed-supply advice",
    body: "Dental practices often supply a mix of exempt and standard-rated services. Getting this wrong creates problems. We review your VAT position and advise accordingly. This is particularly relevant for practices with significant laboratory or facial aesthetics income.",
  },
  {
    title: "Management accounts and reporting",
    body: "For practice owners who want to make informed decisions throughout the year, not just at year-end. We produce monthly or quarterly management accounts structured around how a dental practice actually generates profit.",
  },
  {
    title: "Practice acquisition and structuring",
    body: "Buying a practice is one of the most significant financial decisions you will make. We support with pre-purchase due diligence, advise on how to structure the acquisition, and help you understand the financial position you are taking on.",
  },
];

/** Three figures a reader can act on, each traceable to a locked house position.
 *  Static JSX, deliberately: no counter, so the true value is the value in the
 *  server HTML (playbook T15). The pre-port tiles were "100%" and "NHS + private",
 *  which are statements about our own scope rather than dental tax facts. */
const groundTruthItems = [
  {
    stat: "96%",
    title: "The NHS clawback line",
    body: "Deliver 96 to 100% of your contracted UDAs and the shortfall is carried forward into next year's target. Below 96% and the commissioner recovers the overpayment as cash. That is a number worth watching monthly, not discovering at the year-end reconciliation.",
  },
  {
    stat: "60 to 80%",
    title: "Goodwill's share of a practice price",
    body: "Goodwill is typically 60 to 80% of what a dental practice sells for, with tangibles making up the balance. How the price is split between the two decides what relief a buyer ever sees, and it cannot be unwound after completion.",
  },
  {
    stat: "18%",
    title: "Business Asset Disposal Relief, from 6 April 2026",
    body: "BADR is 18% on qualifying gains for disposals from 6 April 2026, against 14% for the year before that and 10% before then. The lifetime limit is unchanged at £1m per person, and the two-year qualifying period is why sale planning starts early.",
  },
];

const whySpecialistItems = [
  {
    title: "Dental-only expertise",
    body: "We only work with dentists. That means we understand NHS contracts, UDA targets, associate splits, and the sector-specific tax rules that generalist accountants rarely encounter.",
  },
  {
    title: "Proactive advice, not just compliance",
    body: "Management accounts structured for dental KPIs. Tax planning for associates and practice owners. Acquisition support and due diligence. We help you make better financial decisions, not just file returns.",
  },
  {
    title: "Plain English, not jargon",
    body: "A recommendation you cannot follow is not advice. Decisions get explained in the terms you already use: UDA delivery, fee split, drawings, superannuation, so you can weigh them yourself rather than take them on trust.",
  },
];

/** Replaces the pre-port one-sided "Area / us" table. Two-sided, with the other
 *  side given a neutral line and never a failure: the honest claim is about what
 *  a dental-only practice sees every week, not about competence. Every figure
 *  here is a locked house position (s3.A, s2.C, s6.A, s4). */
const comparisonRows: ComparisonRow[] = [
  {
    dimension: "NHS contract income",
    general: "Contract payments are posted as one line of turnover, and UDA delivery is looked at when the year-end reconciliation arrives.",
    specialist: "Delivery is tracked against target through the year, so the 96% clawback line and the 4% carry-forward are positions you already know in month six.",
  },
  {
    dimension: "Associate status",
    general: "Self-employment is taken as read, because that is how the practice has always paid its associates.",
    specialist: "Status is read off the actual engagement terms, because the associate agreement rather than the label on the payment schedule is what gets tested.",
  },
  {
    dimension: "VAT on a mixed practice",
    general: "Dental income is treated as exempt across the board and the return is filed on that basis.",
    specialist: "The exempt and standard-rated sides are separated, and partial exemption is revisited whenever laboratory, orthodontic or facial aesthetics income grows.",
  },
  {
    dimension: "NHS Pension",
    general: "Superannuation is handled as a payroll deduction and reconciled at the year end if at all.",
    specialist: "Pensionable pay is reconciled against the contract, and the incorporation trap is raised before the decision: only PAYE salary is pensionable, dividends are not.",
  },
  {
    dimension: "Selling the practice",
    general: "The goodwill and fixtures split is whatever the deal sheet says by the time it reaches the accountant.",
    specialist: "The split is priced before exchange, and the BADR rate is quoted with its date band: 18% from 6 April 2026 against 14% for the year before.",
  },
  {
    dimension: "Management information",
    general: "Statutory accounts, delivered some months after the year they describe.",
    specialist: "Reporting built around how a practice actually earns: cost per surgery, chair yield, and associate against principal contribution.",
  },
];

/** Our own published research, which replaces the pre-port testimonial band.
 *  Every figure is read live from the same snapshot files `/research` renders,
 *  so the homepage and the report can never disagree, and each one is a public
 *  official series a reader can check rather than a claim about our clients. */
const researchCards = [
  {
    href: "/research/nhs-dental-activity-index",
    stat: fmtIndex(activity.headline.last_month_recovery_index),
    statLabel: "NHS UDA delivery against the 2019/20 baseline of 100",
    title: "NHS Dental Activity Recovery Index",
    body: `Monthly UDA delivery across England measured against the pre-Covid year. Latest settled month ${activityMonthLabel(activity.headline.last_settled_month)}.`,
    source: "Built from NHSBSA open data",
  },
  {
    href: "/research/nhs-dentist-earnings-index",
    stat: fmtGBP(earnings.headline.avg_net_income_england),
    statLabel: `average NHS dentist net income, England, ${earnings.headline.reference_year}`,
    title: "NHS Dentist Earnings and Expenses Tracker",
    body: "Gross earnings, expenses and net income as a time series, so an associate can see where a given contract sits rather than guess.",
    source: "Built from NHS England Digital published statistics",
  },
  {
    href: "/research/dental-practice-density",
    stat: fmtDensity(density.headline.england_per_100k),
    statLabel: "CQC-registered dental locations per 100,000 people in England",
    title: "Dental Practice Density: England Regional Map",
    body: `${density.headline.highest_density_region} is the densest region and ${density.headline.lowest_density_region} the thinnest, which is the first thing to look at before pricing an acquisition.`,
    source: "Built from the CQC Care Directory",
  },
  {
    href: "/research/dental-company-formation-index",
    stat: fmtFormationNumber(formation.headline.dental_cos_ttm),
    statLabel: "new dental limited companies in the last 12 months (SIC 86230)",
    title: "Dental Company Formation Index",
    body: `How many dentists are incorporating, month by month. Latest settled month ${formationMonthLabel(formation.headline.last_settled_month)}.`,
    source: "Built from the Companies House register",
  },
];

const homeFaqs = [
  {
    question: "Do I need a specialist dental accountant?",
    answer:
      "Not strictly, but the question is whether a generalist can give you genuinely useful advice on the financial specifics of dentistry. The gap shows most clearly around NHS income, VAT on mixed dental supplies, associate expenses, and practice acquisition. A competent generalist can handle your compliance. A dental specialist can do that and help you make better financial decisions.",
  },
  {
    question: "What do dental accountants actually do?",
    answer:
      "We prepare annual accounts and corporation tax, handle self assessment for associates and owners, run payroll including percentage-split associate payments, advise on VAT for mixed dental and non-dental supplies, produce management accounts structured around dental KPIs, and support practice acquisitions and structuring. Everything is dental-specific, not generic small-business accounting.",
  },
  {
    question: "Are you accountants for dentists across the whole UK?",
    answer:
      "Yes. We work with associate dentists, practice owners, and multi-site dental groups across the UK, including London, Manchester, and Wales. Contact is straightforward whether you are next door or the other end of the country. See our locations pages for city-specific detail.",
  },
  {
    question: "How much does a dental accountant cost?",
    answer:
      "There is no standard figure in dentistry, and any quote you are given should be read against a written scope rather than compared on its headline. An associate filing one self assessment return is a different job from a VAT-registered limited-company practice with payroll, percentage-split associate payments, an annual NHS Pension certificate and a UDA reconciliation. Before you compare firms, pin down four things: which returns and accounts are included, who prepares the pension certificate, what counts as extra work, and what happens to the quote if you incorporate or buy a second site part-way through the year.",
  },
  {
    question: "Do you work with associate dentists as well as practice owners?",
    answer:
      "Yes. Associate dentists are almost always self-employed and are running a small business whether it feels like it or not. We handle self assessment, allowable expenses, pension planning, and advise on when incorporation genuinely makes sense, so you are not overpaying tax through simple oversights.",
  },
  {
    question: "Can you help with buying or selling a dental practice?",
    answer:
      "Yes. Practice acquisition is one of the most significant financial decisions you will make. We support with pre-purchase due diligence, advise on how to structure the acquisition, and help you understand goodwill, financing, and the tax position you are taking on. We do the same on the sale side.",
  },
  {
    question: "Do you understand NHS contracts and the NHS Pension Scheme?",
    answer:
      "Yes. We reconcile NHS contract payments alongside private fee income and capitation plans, work with UDA targets and clawback, and understand how NHS superannuation interacts with your pension annual allowance, including the incorporation pension trap where only PAYE salary, not dividends, is pensionable.",
  },
  {
    question: "Do you provide accounting for multi-practice dental groups?",
    answer:
      "Yes. Running multiple sites introduces complexity around inter-company transactions, group reporting, and acquisition accounting. We work with dentists building a group, whether that is two practices or ten, and support due diligence, restructuring, and ongoing financial management across the portfolio.",
  },
] as const;

export default function HomePage() {
  const practicalPosts = PRACTICAL_SLUGS.map((slug) => getPostBySlug(slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  const tools = allTools();
  const featuredTools = FEATURED_TOOL_SLUGS.map((slug) => tools.find((t) => t.slug === slug)).filter(
    (t): t is NonNullable<typeof t> => Boolean(t),
  );
  // Minus the self-referential "All guides" first child, which is the hub itself.
  const guideCount = (GUIDE_NAV_CHILDREN?.length ?? 1) - 1;

  const accountingServiceSchema = buildAccountingService(
    {
      name: siteConfig.name,
      description:
        "Specialist dental accountants and accountants for dentists across the UK. NHS contracts, associate tax, VAT, and practice acquisitions.",
      url: siteConfig.url,
      city: "United Kingdom",
      address: { addressCountry: "GB" },
      areaServed: ["United Kingdom"],
    },
    {
      siteUrl: siteConfig.url,
      siteName: siteConfig.name,
      legalName: siteConfig.legalName,
      organizationType: "AccountingService",
      publisherLogoUrl: siteConfig.publisherLogoUrl,
    },
  );

  const serviceSchema = buildService({
    name: "Dental accountancy and tax",
    description:
      "Accounts, tax, payroll, VAT, management reporting, and practice acquisition support for UK dentists, associates, and dental groups.",
    path: "/",
  });

  const faqSchema = buildFaqPage(homeFaqs.map((f) => ({ question: f.question, answer: f.answer })));

  const breadcrumbSchema = buildBreadcrumbJsonLd([{ label: "Home", href: "/" }]);

  return (
    <>
      {/* Organization + WebSite ship site-wide from the root layout. Homepage
          adds AccountingService (national areaServed GB), Service, FAQPage, and
          a Home BreadcrumbList so the page reads as a regulated national
          dental-accounting service. */}
      <JsonLd data={faqSchema ? [accountingServiceSchema, serviceSchema, faqSchema] : [accountingServiceSchema, serviceSchema]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />

      {/* P1 HERO. `.hero-brand` retires here in favour of the phase-2
          `DentistsBackdrop` component, which is that class's gradient, drifts
          and grid lifted into JSX. The host contract is the component's, not
          this file's invention: `relative overflow-hidden` on the section and
          `relative z-10` on the content, or the texture paints over the copy.
          The primary CTA stays `btnGold` (navy label on gold, 6.23) because its
          SECTION ground is navy and a navy button on navy measures 1.00. */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[var(--navy)]">
        <DentistsBackdrop tone="navy" />
        <div className={`relative z-10 ${siteContainerLg} ${sectionYLoose}`}>
          <h1 className="hero-reveal max-w-4xl text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            <span className="block">Dental accountants for UK practices,</span>
            <span className="block">associates and groups.</span>
          </h1>
          <p className="hero-reveal-delay mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            We&apos;re specialist dental accountants and accountants for dentists across the UK. NHS contracts, associate tax, VAT, and acquisitions. We only work with dental practices, so we understand the financial specifics that generalist accountants miss.
          </p>
          <p className="hero-reveal-delay-2 mt-4 text-sm font-medium text-white/80">
            Associates, practice owners and multi-site groups. London, Manchester and UK-wide.
          </p>
          <div className="hero-reveal-delay-2 mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={activeCta.hero_primary.href}
              className={`${btnGold} min-w-0`}
              data-cta="hero_primary" data-cta-placement="hero" data-cta-goal="contact"
              data-cta-variant={niche.cta.variant}
            >
              {activeCta.hero_primary.label}
            </Link>
            {activeCta.hero_secondary ? (
              <Link
                href={activeCta.hero_secondary.href}
                className={`inline-flex min-h-12 items-center rounded-xl px-2 text-sm font-semibold text-white/90 underline decoration-[var(--gold)] decoration-2 underline-offset-4 transition-colors hover:text-white ${focusRing}`}
                data-cta="hero_secondary" data-cta-placement="hero" data-cta-goal="content"
                data-cta-variant={niche.cta.variant}
              >
                {activeCta.hero_secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* P2 TRUST STRIP. White, hairline-bordered, one paragraph. Property's is
          a stats counter; this site's equivalent figures sit in the band below
          as static text, because a counted number that server-renders anything
          but its true value is the T15 defect. */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-[var(--ink-soft)] sm:text-xl">
            We&apos;re specialist dental accountants working exclusively with UK dental practices, from newly qualified associates to established multi-site groups. Accounting, tax, and financial planning for the dental sector only.
          </p>
        </div>
      </section>

      {/* P3 GROUND TRUTH. Three dental tax facts, not three claims about us. */}
      <section className="border-b border-[var(--border)] bg-[var(--background)] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Eyebrow>Three numbers worth knowing</Eyebrow>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
            The figures that decide a dental practice&apos;s tax year
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {groundTruthItems.map((item) => (
              <div key={item.title}>
                <div className="text-4xl font-bold tabular-nums text-[var(--ink)] sm:text-5xl">
                  {item.stat}
                </div>
                <span aria-hidden className="mt-3 block h-0.5 w-10 rounded-full bg-[var(--gold)]" />
                <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* P4 THE READER'S PROBLEM, before any claim about us. Mirrored locally
          rather than taken from the kit: `marketing/ProblemStatement.tsx` has
          Property's landlord copy hardcoded with no copy props (kit :38). */}
      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Eyebrow>The reality</Eyebrow>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl md:text-[2.5rem]">
            <span className="block">Most dentists are</span>
            <span className="block text-primary-700">financially underserved.</span>
          </h2>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Dental income is rarely straightforward. Between NHS UDAs, private fee structures, associate agreements, laboratory costs, and equipment finance, the picture is genuinely complex. A generalist accountant will work with what you give them, but that&apos;s not the same as understanding how a dental practice actually operates.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {realityPoints.map((item) => (
              <article key={item.title} className="card-flat p-6 sm:p-8">
                <h3 className="text-lg font-semibold leading-snug text-[var(--ink)] sm:text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* P5 WHY A SPECIALIST. Kit `NumberedReasons`: prop-driven, no reference-site
          string, and its numerals light on scroll from globals-standard.css. */}
      <section className="border-y border-[var(--border)] bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Eyebrow>Why choose a specialist</Eyebrow>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
            Why work with a dental accountant?
          </h2>
          <NumberedReasons items={whySpecialistItems} />
        </div>
      </section>

      {/* P6 WHO WE WORK WITH. */}
      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Eyebrow>Who we work with</Eyebrow>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
            <span className="block">We work with dentists</span>
            <span className="block">at every stage.</span>
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {whoWeWorkWith.map((block) => (
              <div key={block.title} className="min-w-0 border-t-2 border-[var(--gold)] pt-6">
                <h3 className="text-xl font-semibold text-[var(--ink)]">{block.title}</h3>
                <p className="mt-1 text-sm font-medium text-primary-700">{block.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{block.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE HERO SECONDARY CTA'S TARGET. `id` and `scroll-mt-24` are both
          load-bearing: `activeCta.hero_secondary.href` is "#how-we-work". */}
      <section id="how-we-work" className="scroll-mt-24 border-y border-[var(--border)] bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
            <span className="block">What we actually do,</span>
            <span className="block">and how we do it.</span>
          </h2>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            We do not hand you a services brochure and ask you to pick a package. An enquiry usually arrives attached to a specific problem, a clawback letter, an incorporation decision, a practice on the market, and that is where the work starts. What follows is what ongoing support typically looks like.
          </p>
          <div className="mt-14 max-w-3xl">
            <WhyUsList items={howWeWorkItems} />
          </div>
          <div className="mt-14">
            <Link
              href="/contact"
              className={btnPrimary}
              data-cta="home_process_book" data-cta-placement="how_we_work" data-cta-goal="contact"
            >
              Arrange an initial call
            </Link>
          </div>
        </div>
      </section>

      {/* THE COMPARISON. Local mirror, never the kit component: the kit calls an
          unsuppressable "Most recommended" pill (kit :135, :185) and imports
          lucide-react, which Dentists does not declare. */}
      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Eyebrow>Why it matters</Eyebrow>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
            The difference a specialist makes is not theoretical.
          </h2>
          <div className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            <p>
              A generalist accountant isn&apos;t cutting corners. They simply don&apos;t see enough dental clients to build genuine expertise in how the sector works. They won&apos;t know, off the top of their head, how NHS superannuation interacts with your pension annual allowance, or what HMRC&apos;s view is on associate expense claims.
            </p>
            <p>
              A dental specialist does, because those questions are the everyday work rather than the exception. That is what lets a problem be spotted before it becomes one, and it grounds the advice in how NHS contracts and associate agreements behave in practice, not just in what the textbook says.
            </p>
          </div>
          <div className="mt-14">
            <ComparisonTable
              rows={comparisonRows}
              generalLabel="A generalist accountant"
              generalCaption="Dental practices are a small part of the client book."
              ourCaption="A dental-only practice."
              tradingName={siteConfig.company.tradingName}
              cta={{
                href: "#book",
                label: "Send an enquiry",
                note: "Goes to the short form at the bottom of this page.",
                ctaId: "home_comparison_book",
              }}
            />
          </div>
        </div>
      </section>

      {/* P7 TOOLS. `id="calculators"` is Property's anchor name, added here so
          the band is linkable. Deliberately NOT `CalculatorTabs`: that would be
          a third `CalculatorClient` call site (playbook T7, phase 4's subject)
          and it renders `<button role="tab">`, so the block would carry no
          crawlable link at all. Literal anchors instead. The counts are derived
          from the tool registry and the guide nav, never typed: the pre-port
          copy said "5 calculators" against a registry of 13. */}
      <section
        id="calculators"
        className="relative overflow-hidden scroll-mt-24 border-t border-[var(--border)] bg-[var(--navy)] text-white"
      >
        <DentistsBackdrop tone="navy" />
        <div className={`relative z-10 ${siteContainerLg} ${sectionY}`}>
          <Eyebrow onDark>Free resources</Eyebrow>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            Tools and guides built specifically for UK dentists
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
            Free calculators, pillar guides, and a 10-minute practice health check. All UK 2025/26 rates, all dental-specific.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                {tools.length} calculators
              </p>
              <h3 className="text-lg font-semibold text-white">Dental tax calculators</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {featuredTools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/calculators/${tool.slug}`}
                      className={`text-white/85 underline decoration-[var(--gold)] decoration-2 underline-offset-4 transition-colors hover:text-white ${focusRing} rounded`}
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                <Link
                  href="/calculators"
                  className={`inline-flex min-h-11 items-center text-sm font-semibold text-white underline decoration-[var(--gold)] decoration-2 underline-offset-4 ${focusRing} rounded`}
                  data-cta="home_calculators_all" data-cta-placement="calculator_bridge" data-cta-goal="content"
                >
                  See all {tools.length} calculators
                </Link>
              </p>
            </article>

            <Link
              href="/dental-guides"
              className={`group block rounded-2xl border border-white/15 bg-white/5 p-6 transition-all hover:border-[var(--gold)] hover:bg-white/10 ${focusRing}`}
            >
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                {guideCount} pillar guides
              </p>
              <h3 className="text-lg font-semibold text-white group-hover:underline group-hover:decoration-[var(--gold)] group-hover:underline-offset-4">
                Pillar guides
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                NHS contracts, associate tax, practice purchase due diligence, goodwill valuation, partnership against limited company, and the NHS Pension. Multi-thousand-word guides.
              </p>
            </Link>

            {!packagesMode ? (
              <Link
                href="/free-practice-health-check"
                className={`group block rounded-2xl border border-white/15 bg-white/5 p-6 transition-all hover:border-[var(--gold)] hover:bg-white/10 ${focusRing}`}
              >
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                  Diagnostic · 10 minutes
                </p>
                <h3 className="text-lg font-semibold text-white group-hover:underline group-hover:decoration-[var(--gold)] group-hover:underline-offset-4">
                  Free practice health check
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Six-step wizard with 20+ dental-specific rules. Flags the items worth reviewing across structure, NHS Pension, IR35, BADR, and goodwill.
                </p>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* P8 OUR RESEARCH. This is the slot the pre-port testimonial band held.
          Owner decision 2026-09-11: the quotes could not be sourced, so the band
          is removed rather than restyled, and the slot takes the thing this site
          CAN stand behind. Every figure is read from the same snapshot files
          `/research` renders, at build time, as plain text: no counter, so the
          server HTML carries the true value (playbook T15). */}
      <section className="border-y border-[var(--border)] bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Eyebrow>Original research</Eyebrow>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
            <span className="block">We publish the numbers</span>
            <span className="block">rather than assert them.</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Four running data series on UK dentistry, built entirely from official open data and updated as the sources settle. Each one states its source, its coverage and the month it runs to, and each is free to read and cite.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-8">
            {researchCards.map((card) => (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className={`card-premium group flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-[rgba(0,27,61,0.08)] sm:p-8 ${focusRing}`}
                >
                  <span className="text-3xl font-bold tabular-nums text-[var(--ink)] sm:text-4xl">
                    {card.stat}
                  </span>
                  <span className="mt-1 text-xs leading-relaxed text-[var(--muted)]">{card.statLabel}</span>
                  <span className="mt-5 text-lg font-semibold leading-snug text-[var(--ink)] group-hover:underline group-hover:decoration-[var(--gold)] group-hover:underline-offset-4">
                    {card.title}
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">{card.body}</span>
                  <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary-700">
                    {card.source}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10">
            <Link
              href="/research"
              className={`inline-flex min-h-11 items-center rounded text-sm font-semibold text-[var(--ink)] underline decoration-[var(--gold)] decoration-2 underline-offset-4 ${focusRing}`}
              data-cta="home_research_all" data-cta-placement="research" data-cta-goal="content"
            >
              See all four data series
            </Link>
          </p>
        </div>
      </section>

      {/* P9 LATEST INSIGHTS. */}
      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Eyebrow>Practical guidance</Eyebrow>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
            <span className="block">Dental accounting insights</span>
            <span className="block">from specialists.</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Real-world guidance on associate tax, practice finance, and NHS accounting, written by accountants who work exclusively with UK dental practices. Each article addresses questions we&apos;re actually asked by dentists every week.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {practicalPosts.map((p) => {
              const categorySlug = getCategorySlug(p);
              return (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${categorySlug}/${p.slug}`}
                    className={`card-premium group flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-[rgba(0,27,61,0.08)] ${focusRing}`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary-700">
                      {p.category}
                    </span>
                    <span className="mt-3 text-lg font-semibold leading-snug text-[var(--ink)] group-hover:underline group-hover:decoration-[var(--gold)] group-hover:underline-offset-4">
                      {p.title}
                    </span>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">{p.summary}</span>
                    <span className="mt-4 text-sm font-semibold text-primary-700">Read more</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-10">
            <Link
              href="/blog"
              className={`inline-flex min-h-11 items-center rounded text-sm font-semibold text-[var(--ink)] underline decoration-[var(--gold)] decoration-2 underline-offset-4 ${focusRing}`}
              data-cta="home_blog_all" data-cta-placement="blog_teaser" data-cta-goal="content"
            >
              View all articles
            </Link>
          </p>
        </div>
      </section>

      {packagesMode ? (
      /* Closing panel A. Unrendered under the live `leadgen` variant and kept
         that way: `home_cta_primary` and `home_cta_secondary` are two live rows
         in vw_cta_performance and dropping the branch would drop the ids
         (playbook T22). The only change here is the addition of the
         `data-cta-goal` both were missing; neither id, placement nor href moves. */
      <section className="bg-[var(--background)]">
        <div className={siteContainerLg}>
          <div className={`${sectionYLoose} grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16`}>
            <div className="min-w-0">
              <Eyebrow>Get started</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
                {activeCta.home_cta.heading}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                {activeCta.home_cta.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={activeCta.home_cta.primary.href}
                  className={btnPrimary}
                  data-cta="home_cta_primary" data-cta-placement="home_cta"
                  data-cta-goal={homeCtaGoal(activeCta.home_cta.primary.href)}
                  data-cta-variant={niche.cta.variant}
                >
                  {activeCta.home_cta.primary.label}
                </Link>
                {activeCta.home_cta.secondary ? (
                  <Link
                    href={activeCta.home_cta.secondary.href}
                    className={btnMailOutline}
                    data-cta="home_cta_secondary" data-cta-placement="home_cta"
                    data-cta-goal={homeCtaGoal(activeCta.home_cta.secondary.href)}
                    data-cta-variant={niche.cta.variant}
                  >
                    {activeCta.home_cta.secondary.label}
                  </Link>
                ) : null}
              </div>
              <p className="mt-10 text-sm font-medium text-[var(--ink)]">Prefer us to contact you?</p>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Leave a few details in the form, including whether you are an associate, a principal or a locum, and a specialist dental accountant will pick it up from there.
              </p>
            </div>
            <div className="card-flat p-6 sm:p-8 lg:p-10">
              <LeadForm submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>
      ) : (
      /* P10 CLOSING PANEL B, the live one. The id and `scroll-mt-24` below make
         this the site-wide on-page scroll target the comparison CTA uses, which
         the pre-port page did not have. Not an interruptive surface: it is the
         same in-flow form that was already the last block of this page. */
      <section id="book" className="scroll-mt-24 bg-[var(--background)]">
        <div className={siteContainerLg}>
          <div className={`${sectionYLoose} grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16`}>
            <div className="min-w-0">
              <Eyebrow>Get started</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
                Ready to work with a dental accountant who understands your practice?
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Whether you are an associate wanting a second look at your tax position, or a practice owner who needs proper financial visibility, the first conversation is straightforward and without obligation.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className={btnPrimary}
                  data-cta="home_book_primary" data-cta-placement="home_book" data-cta-goal="contact"
                >
                  Book your free consultation
                </Link>
              </div>
              <p className="mt-10 text-sm font-medium text-[var(--ink)]">Rather not pick up the phone first?</p>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Fill in the form and one of our dental accountants will be in touch to arrange a short introductory call. No hard sell, just an honest conversation about your situation and whether we&apos;re the right fit.
              </p>
              <p className="mt-6 text-sm text-[var(--muted)]">All initial conversations are confidential and carry no obligation.</p>
            </div>
            <div className="card-flat p-6 sm:p-8 lg:p-10">
              <LeadForm submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>
      )}

      {/* P11 FAQ. Native `<details>`, restyled in place and NOT swapped for the
          kit `FaqSection`: that component is a Radix collapsible whose closed
          answers are absent from the server HTML, which would strip these nine
          answers from the crawlable page. One binding drives both this loop and
          `buildFaqPage` above (playbook T17); `homeFaqs` is declared once. */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Frequently asked.</h2>
          <div className="mt-8 max-w-3xl space-y-3">
            {homeFaqs.map((faq) => (
              <details key={faq.question} className="group card-flat open:shadow-md">
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-[var(--ink)] sm:px-6 sm:py-5 sm:text-lg [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-primary-600 transition-transform group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <div className="border-t border-[var(--border)] px-5 py-4 text-sm leading-relaxed text-[var(--muted)] sm:px-6 sm:py-5 sm:text-base">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            We work with dentists across the UK.{" "}
            <Link
              href="/locations"
              className={`rounded font-semibold text-[var(--ink)] underline decoration-[var(--gold)] decoration-2 underline-offset-4 ${focusRing}`}
            >
              See the areas we serve
            </Link>
            .
          </p>
        </div>
      </section>
      {/* The sticky banner is NOT mounted here. It lives in PageShell, site-wide. */}
    </>
  );
}
