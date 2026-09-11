import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Building2,
  ClipboardCheck,
  FileSpreadsheet,
  Landmark,
  Receipt,
  Stethoscope,
  TrendingDown,
  UserCheck,
  Users,
} from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { CalculatorTabs } from "@/components/tools/CalculatorTabs";
import {
  btnOnDark,
  btnPrimary,
  btnSecondary,
  focusRing,
  sectionY,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getAllCategories, getPostBySlug } from "@/lib/blog";
import { MEDICAL_GUIDES } from "@/lib/medical-guides-data";
import { allTools } from "@/lib/tools/registry";
import { buildFaqPage, buildHomepageServiceSchema } from "@/lib/schema";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { serviceTiers } from "@/config/service-tiers";
import { Eyebrow, Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { DrawnTickList } from "@accounting-network/web-shared/design/marketing/DrawnTickList";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { PromptMarquee } from "@accounting-network/web-shared/design/marketing/PromptMarquee";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { StatsCounter } from "@accounting-network/web-shared/design/marketing/StatsCounter";
import { niche } from "@/config/niche-loader";
import { getActiveCta, isPackagesMode } from "@accounting-network/web-shared/lib/niche-config";

const activeCta = getActiveCta(niche);
const packagesMode = isPackagesMode(niche);

// FAQPage JSON-LD for the homepage's single visible Q&A (the "Do I need a
// specialist accountant" details block). Schema-only: this mirrors the on-page
// answer so answer engines can extract it. The comma below stands in for the
// on-page dash to keep the estate no-em-dash rule; the answer is otherwise the
// same text rendered on the page. No rendered markup is changed.
const HOMEPAGE_FAQS = [
  {
    question: "What is a GP accountant?",
    answer:
      "A GP accountant is an accountant whose work is concentrated on general practice: partnership accounts prepared to the shape NHS commissioners expect, reconciliation of PCSE statements and global sum, Carr-Hill and QOF income, superannuation certificates, and the individual self-assessment returns of the partners and salaried GPs behind the practice. The distinguishing skill is not the accounting standard, it is knowing how NHS practice income arrives and how it should be split between the partnership and the individual.",
  },
  {
    question: "Do I need a specialist medical accountant, or will a generalist do?",
    answer:
      "A competent generalist accountant can file your accounts and your return. The question is whether they can advise you. The gap shows most clearly in four places: NHS Pension annual allowance and the tapered allowance, where the input amount grows without you contributing anything extra; locum IR35 status, which is determined by the engagement and not the contract; mixed NHS and private income, where the same fee can be reported twice or not at all; and GP partnership structures, where notional rent, reimbursed expenses and mid-year profit share changes all have to be handled consistently across several people's returns.",
  },
  {
    question: "What do medical accountants actually do for doctors?",
    answer:
      "For a GP partner: partnership accounts, the profit allocation, the superannuation certificate, and the personal return. For a salaried GP: self-assessment where private, locum or sessional income sits alongside the NHS post. For a hospital consultant: the split between NHS employment, private practice and medico-legal work, plus the incorporation question if the private income is material. For a locum: IR35 status, the limited company versus umbrella versus sole trader decision, expense claims, and NHS Pension Forms A and B so that locum work counts towards pensionable service.",
  },
  {
    question: "Which doctors is this site for?",
    answer:
      "GP partners and salaried GPs, hospital consultants with NHS and private income, locum and sessional doctors, junior doctors, and GP practices as entities. We publish nothing outside the medical professions and we route enquiries nowhere else, which is the point: the same questions recur, so the answers are already worked out. We are not the firm that files your return. We publish the research and we match the enquiry to a regulated firm in our specialist partner network.",
  },
  {
    question: "Are you able to help doctors outside London?",
    answer:
      "Yes. Enquiries come from across the UK and the work is handled remotely, which is normal for medical accounting because the records that matter (PCSE statements, NHSBSA pension savings statements, agency remittances, practice ledgers) are all digital. Note that NHS contracting and pension administration differ between England, Wales, Scotland and Northern Ireland, so the nation you practise in changes the answer more than the city does.",
  },
  {
    question: "How much does a specialist medical accountant cost?",
    answer:
      "Fees depend on what the work actually involves: a single self-assessment return for a salaried GP is not comparable to a six-partner practice with partnership accounts, superannuation certificates and six individual returns. We do not set or quote fees, because we are not the firm doing the work. Tell us your role, your income mix and whether a practice is involved, and the specialist firm your enquiry goes to can scope it against that rather than against a headline price that changes later.",
  },
  {
    question: "Can I switch accountants part-way through the tax year?",
    answer:
      "Yes. Professional clearance is requested from your existing accountant, who passes over the records and the tax history. You are picked up from your current position rather than starting again, and there is no need to wait for a year end or a filing deadline to pass.",
  },
];

// Title/description written 2026-08-26 from the 90d GSC head set (data through
// 2026-08-23). The old title carried "gp accountants" (1,309 impr) but nothing
// from the "medical accountants" family (377 + 284 + 225 + 86 impr), which the
// homepage also catches and which is how the page-1 incumbents title themselves.
// This one carries both exact phrases plus "specialist medical accountants".
const HOME_TITLE = "Specialist Medical Accountants & GP Accountants | UK";
const HOME_DESCRIPTION =
  "Medical tax research and free calculators for UK doctors, with enquiries matched to a specialist accounting firm. NHS Pension annual allowance, GP practice and partnership accounts, locum IR35 and tax returns, consultant private practice and medical expense claims.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: siteConfig.url,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

const PRACTICAL_SLUGS = [
  "nhs-pension-annual-allowance-complete-guide",
  "locum-doctor-tax-complete-guide",
  "medical-practice-incorporation-step-by-step",
] as const;

/** Hero proof line. No promise, no count, no comparative claim: each one names
 *  a piece of work this site publishes a page about. */
const heroBadges = [
  "NHS Pension annual allowance and the taper",
  "GP partnership accounts and superannuation certificates",
  "Locum IR35, status per engagement",
  "Private practice incorporation modelled, not assumed",
  "UK-wide, with the four-nation contract differences accounted for",
];

/**
 * Self-identification prompts (disposition D.2). Unattributed first-person
 * cues, NOT testimonials: no name, no initials, no attributed outcome. The set
 * is deliberately EVEN in length, which is what keeps the marquee seam hidden.
 */
const prompts = [
  {
    tag: "NHS Pension",
    icon: Stethoscope,
    text: "My pension savings statement arrived, the input amount looks enormous, and I have no idea whether it is right.",
  },
  {
    tag: "The taper",
    icon: TrendingDown,
    text: "I went over £200,000 last year and nobody has ever explained what the taper actually does to me.",
  },
  {
    tag: "Locum status",
    icon: ClipboardCheck,
    text: "I work through an agency and directly for two practices, and I could not tell you which of those is inside IR35.",
  },
  {
    tag: "Forms A and B",
    icon: FileSpreadsheet,
    text: "I have been locuming for three years and I am not certain any of it has counted towards my pension.",
  },
  {
    tag: "Partnership profit share",
    icon: Users,
    text: "A partner left in October and I do not understand how the profit share is supposed to work for that year.",
  },
  {
    tag: "PCSE statements",
    icon: Landmark,
    text: "The practice statement and our accounts have never quite agreed and we have stopped asking why.",
  },
  {
    tag: "Private practice",
    icon: Building2,
    text: "The private clinic has grown and everyone keeps telling me to incorporate, but nobody has shown me the numbers.",
  },
  {
    tag: "Consultant income",
    icon: Banknote,
    text: "NHS salary, private patients and expert-witness work, and the tax bill is a surprise every January.",
  },
  {
    tag: "Expenses",
    icon: Receipt,
    text: "I claim my indemnity and my subscriptions and I assume I am missing things, but I do not know what.",
  },
  {
    tag: "Accountant fit",
    icon: UserCheck,
    text: "Our accountant is perfectly good and has never once asked me about the NHS Pension.",
  },
];

const whoWeWorkWith = [
  {
    href: "/for-gps",
    title: "GP practices, partners and salaried GPs",
    subtitle: "GP practice accountants · Partnership accounts · Superannuation",
    body: "For the practice: income analysed by NHS stream, PCSE reconciliation, notional rent, capital and current accounts, and a profit allocation that copes with a partner joining or leaving mid-year. For the individual: the partner or salaried GP return prepared against the practice figures rather than separately from them.",
  },
  {
    href: "/for-consultants",
    title: "Hospital consultants",
    subtitle: "NHS salary · Private practice · Medico-legal income",
    body: "An NHS post, private patient fees and expert-witness work are three different tax positions in one person. The recurring questions are how the income splits, which expenses hold up, whether incorporating the private side is worth the NHS pension accrual it costs, and where the annual allowance taper bites.",
  },
  {
    href: "/for-locum-doctors",
    title: "Locum doctors",
    subtitle: "Locum accountant · IR35 · Self-assessment",
    body: "Agency, bank and direct practice engagements are a business, whatever it feels like. The work is IR35 status per engagement, the limited company versus umbrella versus sole trader decision modelled on your actual earnings, expense claims, the VAT registration threshold, and Forms A and B so locum sessions count towards pensionable service.",
  },
];

/**
 * Six equivalent service areas, NOT a sequence. The old `01`-`06` numerals and
 * the `<ol>` around them asserted an order that does not exist, so both are
 * gone and each card carries its own destination instead.
 */
const serviceAreas = [
  {
    href: "/for-gps",
    icon: Users,
    title: "GP and practice accounts",
    body: "Partnership and limited company accounts for medical practices, prepared against the PCSE record rather than beside it.",
  },
  {
    href: "/nhs-pension",
    icon: Stethoscope,
    title: "NHS Pension planning",
    body: "The pension input amount checked, the taper tested, carry-forward from the three previous tax years looked at, and only then a view on Scheme Pays.",
  },
  {
    href: "/for-locum-doctors",
    icon: ClipboardCheck,
    title: "Locum tax and self-assessment",
    body: "Self-assessment across agency, bank and direct engagements, with the expenses that hold up claimed and the status question settled per engagement.",
  },
  {
    href: "/calculators/private-practice-incorporation",
    icon: Building2,
    title: "Private practice incorporation",
    body: "The incorporation question modelled on your income mix, with the pension accrual given up on company income set against the tax saved.",
  },
  {
    href: "/medical-guides/medical-expenses-tax-treatment",
    icon: Receipt,
    title: "Medical expense claims",
    body: "Professional subscriptions, indemnity, examination fees, equipment and travel reviewed against what is defensible if HMRC looks.",
  },
  {
    href: "/for-consultants",
    icon: Banknote,
    title: "Tax planning across NHS and private income",
    body: "Income tax, corporation tax and VAT read together where an NHS post, private fees and medico-legal work land in the same tax year.",
  },
];

const trustItems = [
  {
    title: "Medical work only",
    stat: "Medical only",
    body: "Nothing here is written for a general small business, and no enquiry is routed outside the medical professions. The NHS Pension, PCSE and partnership questions are the whole subject of this site, which is why they are answered rather than skirted.",
  },
  {
    title: "Free calculators, figure on the page",
    stat: String(allTools().length),
    body: "Medical tax calculators covering NHS Pension annual allowance, tapered allowance, Scheme Pays, tiered superannuation contributions, locum tax, GP partner drawings and the incorporation comparison. We ask once whether a specialist should confirm your figure, and you can skip that and still see it.",
  },
  {
    /* The stat is the number of /for-* audience pages this site actually
       publishes, which is the claim the tile makes: four ways of being paid as
       a doctor, each with its own page. */
    title: "Matched to how you are paid",
    stat: "4",
    body: "GPs, hospital consultants, locum doctors and junior doctors each have their own page here, because each is paid differently and taxed differently. Your enquiry goes to a firm from a specialist partner network, matched to which of those you are, and the first conversation is about whether they can help.",
  },
];

const whySpecialistItems = [
  "The NHS Pension is defined benefit, so the pension input amount grows with pensionable pay whether or not you pay in another penny.",
  "The annual allowance is £60,000 for 2026/27 and tapers where threshold income exceeds £200,000 and adjusted income exceeds £260,000, down to a £10,000 floor.",
  "Unused allowance carries forward from the three previous tax years, and that is checked before anyone reaches for a Scheme Pays election.",
  "A GP partner has a profit share, superannuation deducted at source and often out-of-hours work; a consultant has an NHS salary, private fees and medico-legal reports; a locum has agency, bank and direct engagements.",
  "Each of those streams is treated differently for tax, National Insurance, IR35 and pension, and the errors happen where they meet.",
  "Global sum and Carr-Hill, QOF and enhanced services, PCN income, notional rent, reimbursed expenses, capital and current accounts: none of this appears in general SME accounting.",
];

/**
 * The old version of this block was a two-column table with ONE data column,
 * so it compared nothing, and its six `detail` strings were unfalsifiable
 * quality claims ("Handled with specialist knowledge", "Maximised correctly").
 * Manager decision 2026-09-11: retire the comparison framing, keep the six
 * rows as a capability list, and describe the work instead of rating it.
 */
const capabilityRows = [
  {
    area: "NHS Pension annual allowance",
    detail:
      "The pension input amount is read off the savings statement, the taper is tested against threshold and adjusted income, and carry-forward from the three previous tax years is checked before any Scheme Pays election.",
  },
  {
    area: "Locum IR35 status",
    detail:
      "Status is read engagement by engagement. For NHS Trust work the determination sits with the hirer and its fee-payer, not with you, and it can be challenged through their disagreement process.",
  },
  {
    area: "Practice partnership accounts",
    detail:
      "Practice accounts, the profit allocation and each partner's own return are prepared as one job, including the year a partner joins or leaves part way through.",
  },
  {
    area: "Private practice incorporation",
    detail:
      "Modelled on your income mix rather than assumed, with the NHS accrual given up on income taken as dividends set against the tax saved.",
  },
  {
    area: "Medical expense claims",
    detail:
      "Professional subscriptions, indemnity, examination fees, equipment and travel are each treated differently, so the claim is reviewed against what is defensible rather than against what is common.",
  },
  {
    area: "Mixed NHS and private income",
    detail:
      "NHS salary, private fees and medico-legal work are read as one tax position, and only the NHS post is pensionable.",
  },
];

export default function HomePage() {
  const practicalPosts = PRACTICAL_SLUGS.map((slug) => getPostBySlug(slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  // Build-time assertion. The hand-picked selection is editorial, but a renamed
  // slug used to drop a card silently and leave a two-card row; this fails the
  // build instead. ponytail: one throw, not a test fixture.
  if (practicalPosts.length !== PRACTICAL_SLUGS.length) {
    throw new Error(
      `Homepage PRACTICAL_SLUGS: ${PRACTICAL_SLUGS.length - practicalPosts.length} slug(s) no longer resolve.`,
    );
  }

  // Every figure derived, never typed. The old "9+ specialist guides" tile
  // counted a dynamic route as a guide and was wrong on its own evidence.
  const stats = [
    { target: allTools().length, label: "Free calculators" },
    { target: getAllCategories().length, label: "Article categories" },
    { target: MEDICAL_GUIDES.length, label: "In-depth guides" },
    { target: siteConfig.locations.length, label: "Locations covered" },
  ];

  const faqSchema = buildFaqPage(HOMEPAGE_FAQS);
  const serviceSchema = buildHomepageServiceSchema(serviceAreas.map((i) => i.title));
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}#webpage`,
    url: siteConfig.url,
    name: HOME_TITLE,
    description: HOME_DESCRIPTION,
    isPartOf: { "@id": `${siteConfig.url}#website` },
    about: { "@id": `${siteConfig.url}#organization` },
    inLanguage: "en-GB",
  };
  const accountingServiceSchema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${siteConfig.url}#accountingservice`,
    name: siteConfig.name,
    url: siteConfig.url,
    areaServed: "GB",
    provider: { "@id": `${siteConfig.url}#organization` },
    audience: { "@type": "Audience", audienceType: "Doctors, GP practices and medical professionals" },
  };

  return (
    <>
      {/* Organization + WebSite ship site-wide from the root layout. */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(accountingServiceSchema) }}
      />

      {/* Navy motif hero. Host is relative + overflow-hidden, content at z-10:
          MedicalBackdrop is absolutely positioned and needs both. */}
      <section className="relative flex min-h-[500px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[600px] sm:py-12 lg:min-h-[700px] lg:py-14">
        <MedicalBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Eyebrow onDark>Medical accountants, UK</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-balance text-white sm:text-5xl sm:leading-[1.1] lg:text-7xl">
              Specialist medical accountants and GP accountants for UK doctors
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/90 sm:mt-6 sm:text-lg lg:text-xl">
              We publish for doctors and nobody else: GP partners, salaried GPs, hospital consultants, locums and GP practices. We do not file your return. We write the research, we build the calculators, and we match your enquiry to a regulated firm in our specialist partner network whose year is NHS Pension annual allowance modelling, partnership accounts and superannuation certificates, locum IR35 and self-assessment, the private practice incorporation question, and expense claims that survive an HMRC look.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href={activeCta.hero_primary.href}
                className={`${btnPrimary} px-6 py-3 text-base sm:px-10 sm:py-4 sm:text-lg`}
                data-cta="hero_primary" data-cta-placement="hero"
                data-cta-variant={niche.cta.variant}
              >
                {activeCta.hero_primary.label}
              </Link>
              {activeCta.hero_secondary ? (
                <Link
                  href={activeCta.hero_secondary.href}
                  className={`${btnOnDark} px-6 py-3 text-base sm:px-10 sm:py-4 sm:text-lg`}
                  data-cta="hero_secondary" data-cta-placement="hero"
                  data-cta-variant={niche.cta.variant}
                >
                  {activeCta.hero_secondary.label}
                </Link>
              ) : null}
            </div>
            <ul className="mt-6 flex flex-wrap gap-4 text-xs text-slate-200 sm:mt-8 sm:gap-6 sm:text-sm">
              {heroBadges.map((badge) => (
                <li key={badge} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-400" aria-hidden />
                  <span className="font-semibold">{badge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stats strip. Every figure derived from the tree at build time. */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* Problem statement, argument left and self-identification prompts right.
          Mirrored locally rather than taken from the kit: the kit's
          ProblemStatement hardcodes Property's landlord copy with no copy props. */}
      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div className="min-w-0">
              <Eyebrow>What doctors arrive with</Eyebrow>
              <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
                A doctor's tax position has more moving parts than most owner-managed businesses
              </h2>
              <Prose>
                <p>
                  Between the NHS Pension, mixed NHS and private income, locum engagements, practice partnerships and professional expenses, the pieces do not sit still. A generalist accountant will process what you hand over accurately. That is not the same as knowing what you should have handed over, or what the figures on a PCSE statement mean.
                </p>
                <p>
                  The sentences alongside are the ones doctors actually open with. None of them is a client quote and none is attributed: they are here so you can tell quickly whether this is the right place to ask.
                </p>
              </Prose>
            </div>
            <PromptMarquee prompts={prompts} tone="white" />
          </div>
        </div>
      </section>

      {/* Who we are. White ground, so the ticks take the 600 step: the kit's
          400-step default is tuned for navy and washes out here. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Why a specialist</Eyebrow>
            <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What a medical accountant knows before you explain it
            </h2>
            <Prose>
              <p>
                This is not a competence argument. Generalist accountants are not weaker technically, they simply do not see enough doctors for the medical patterns to become obvious. The difference shows up as things noticed early rather than repaired late, and it starts from a shared vocabulary: you will not spend the first conversation explaining what superannuation is, or why the practice year end is not 5 April.
              </p>
            </Prose>
          </div>
          <DrawnTickList
            items={whySpecialistItems}
            className="mt-8 max-w-3xl sm:mt-10"
            tickClassName="text-primary-700"
          />
        </div>
      </section>

      {/* Why choose us: three tiles, then the capability list that replaced the
          one-column "comparison" table. */}
      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>What sets us apart</Eyebrow>
            <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Built for the medical profession
            </h2>
          </div>
          <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-3">
            {trustItems.map((item) => (
              <div key={item.title} className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8">
                <div className="text-3xl font-bold text-[var(--copper-deep)] sm:text-4xl">{item.stat}</div>
                <h3 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-3xl">
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
              What the work covers, area by area
            </h3>
          </div>
          <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
            {capabilityRows.map((row) => (
              <div key={row.area} className="flex flex-col gap-2 py-5 sm:flex-row sm:gap-8">
                <dt className="shrink-0 text-sm font-bold text-slate-900 sm:w-64 sm:text-base">
                  {row.area}
                </dt>
                <dd className="min-w-0 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {row.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Six equivalent service areas. Each card links to the route it names, so
          the derived footer column has children to build from. */}
      <section className={`bg-primary-50/60 ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Our services</Eyebrow>
            <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What a medical accountant does across a year
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700 sm:mt-4 sm:text-lg">
              There is no standard package, because a salaried GP with one private clinic and a six-partner practice with a superannuation certificate to certify are not the same job. These six are where the year actually goes.
            </p>
          </div>
          <ScrollGlowGroup className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-primary-100 bg-white p-6 transition-colors duration-200 hover:border-primary-300"
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700 ring-1 ring-primary-100">
                  <item.icon aria-hidden className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                  <Link href={item.href} className={`${focusRing} rounded hover:underline`}>
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.body}</p>
              </div>
            ))}
          </ScrollGlowGroup>
        </div>
      </section>

      {/* Who we work with. The subtitle line is copper TEXT, so it takes
          --copper-deep (7.32 on white). Brand --copper measured 3.62 here
          against a 4.5 floor and was the last sub-floor copper text on the
          site. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Who we work with</Eyebrow>
            <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
              GPs, consultants and locum doctors at every career stage
            </h2>
          </div>
          <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-3">
            {whoWeWorkWith.map((block) => (
              <div
                key={block.title}
                className="flex min-w-0 flex-col rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8"
              >
                <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{block.title}</h3>
                <p className="mt-2 text-sm font-semibold text-[var(--copper-deep)]">{block.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{block.body}</p>
                <Link
                  href={block.href}
                  className={`mt-auto inline-flex min-h-10 items-center gap-2 pt-4 text-sm font-semibold text-primary-800 hover:text-primary-900 ${focusRing} rounded`}
                >
                  View specialist services
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators. CalculatorTabs renders <button role="tab">, so the block
          carries no crawlable link of its own and the literal /calculators href
          below it is not optional: the crawl-path guard is a source scan. */}
      <section id="calculators" className={`scroll-mt-24 bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Free tools</Eyebrow>
            <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Work out your position before you speak to anyone
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700 sm:mt-4 sm:text-lg">
              Annual allowance and the taper, Scheme Pays, locum tax, GP partner drawings and the incorporation comparison. Pick one, enter your figures, and the answer is on the page.
            </p>
          </div>
          <div className="mt-8 sm:mt-10">
            <CalculatorTabs />
          </div>
          <div className="mt-8 sm:mt-10">
            <Link
              href="/calculators"
              data-cta="home_calculators_all"
              data-cta-placement="calculator_bridge"
              data-cta-variant={niche.cta.variant}
              className={`inline-flex items-center gap-2 text-base font-semibold text-primary-800 hover:text-primary-900 sm:text-lg ${focusRing} rounded`}
            >
              See all {allTools().length} calculators
              <ArrowRight aria-hidden className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest insights. Ruled rows rather than cards; the category chip is
          copper TEXT and takes --copper-deep for the same reason as above. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Resources for doctors</Eyebrow>
            <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
              NHS Pension, locum tax and practice finance guidance
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700 sm:mt-4 sm:text-lg">
              Working notes on annual allowance and Scheme Pays, locum IR35 and Forms A and B, GP partnership income and PCSE reconciliation, and the private practice incorporation question. Written for doctors, so the starting assumption is that you already know what superannuation is.
            </p>
          </div>
          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200 sm:mt-10">
            {practicalPosts.map((p) => (
              <article key={p.slug} className="py-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-8">
                  <p className="shrink-0 text-xs font-semibold uppercase tracking-wide text-[var(--copper-deep)] sm:w-44">
                    {p.category}
                  </p>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold leading-snug text-slate-900">
                      <Link href={`/blog/${p.slug}`} className={`hover:underline ${focusRing} rounded`}>
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{p.summary}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link
              href="/blog"
              className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary-800 hover:text-primary-900 ${focusRing} rounded`}
            >
              View all articles
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link
              href="/medical-guides"
              className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary-800 hover:text-primary-900 ${focusRing} rounded`}
            >
              Browse medical guides
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service tiers. Kept, restyled chrome only: retiring this block is
          owner gate M10 and has not been answered. `featuredBadge` is passed
          unchanged because removing the prop does not remove the shared
          component's default badge. */}
      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>How we work with you</Eyebrow>
            <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Choose how much support you need
            </h2>
          </div>
          <div className="mt-8 sm:mt-10">
            <ServiceTiers tiers={serviceTiers} featuredBadge="Most popular" />
          </div>
        </div>
      </section>

      {/* Closing panel. `id="book"` + scroll-mt-24 is the structural fix: before
          this, nothing on the page could scroll to the form. The kit panel puts
          LeadForm in a WHITE CARD on the navy ground; the form's labels are
          dark, and a bare form on navy is what shipped invisible labels
          elsewhere in the estate. */}
      <div id="book" className="scroll-mt-24">
        {packagesMode ? (
          <section className={`bg-slate-50 ${sectionY}`}>
            <div className={siteContainerLg}>
              <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
                <div className="min-w-0">
                  <Eyebrow>Get started</Eyebrow>
                  <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
                    {activeCta.home_cta.heading}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-slate-600 sm:mt-6 sm:text-xl">
                    {activeCta.home_cta.body}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href={activeCta.home_cta.primary.href}
                      className={btnPrimary}
                      data-cta="home_cta_primary" data-cta-placement="home_cta"
                      data-cta-variant={niche.cta.variant}
                    >
                      {activeCta.home_cta.primary.label}
                    </Link>
                    {activeCta.home_cta.secondary ? (
                      <Link
                        href={activeCta.home_cta.secondary.href}
                        className={btnSecondary}
                        data-cta="home_cta_secondary" data-cta-placement="home_cta"
                        data-cta-variant={niche.cta.variant}
                      >
                        {activeCta.home_cta.secondary.label}
                      </Link>
                    ) : null}
                  </div>
                  <p className="mt-6 text-base leading-relaxed text-slate-700 sm:text-lg">
                    Prefer to write? Use the form and we will match your enquiry to a specialist firm from the partner network, who will come back to you directly.
                  </p>
                </div>
                <div className="rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:p-8 lg:p-10">
                  <LeadForm submitLabel="Send enquiry" />
                </div>
              </div>
            </div>
          </section>
        ) : (
          <LeadCTAPanel
            eyebrow="Get started"
            title="Speak to a medical accountant about your position"
            description="Whether you are a GP partner, a salaried GP, a hospital consultant with private work or a locum, the useful first conversation is a short scoping call: your role, your income mix, your NHS Pension position, and whether a practice is involved."
            proofPoints={[
              {
                title: "The pension input amount is checked first",
                detail: "Before any Scheme Pays decision, not after the charge lands.",
              },
              {
                title: "IR35 is read per engagement",
                detail: "Status follows the engagement, not the wording of the contract.",
              },
              {
                title: "Practice and personal are one job",
                detail: "Partnership accounts and the partner return are prepared together.",
              },
            ]}
            formTitle="Send your enquiry"
            formSubtitle="Tell us your role, your income mix and whether a practice is involved."
            form={<LeadForm submitLabel="Send enquiry" />}
            backdrop={<MedicalBackdrop tone="navy" />}
            footnote={
              <>
                Initial conversations carry no obligation. What happens to the details you send, and the fact that they may be shared with a regulated firm from the specialist partner network so that firm can respond, is set out in the{" "}
                {/* The link needs its OWN colour. globals.css carries `a { color: var(--navy) }`
                    in @layer base, and a direct element rule beats an INHERITED value, so an
                    anchor with no colour utility renders navy whatever its parent says. On
                    this navy panel that measured 1.04, i.e. invisible. Third instance of the
                    same trap in this port, after the blog hero breadcrumb and the footer. */}
                <Link href="/privacy-policy" className="text-white underline hover:no-underline">
                  privacy policy
                </Link>
                .
              </>
            }
          />
        )}
      </div>

      {/* FAQ last, and deliberately NOT the kit FaqSection: that is a Radix
          accordion with no forceMount, so closed answers are not
          server-rendered. All seven answers below are in the pre-hydration HTML
          with zero JavaScript, and they are the same array the FAQPage schema
          above is built from. Sanctioned deviation, DESIGN_DELTA.md section 3. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <Eyebrow>Questions from doctors</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            Common questions about medical accountants
          </h2>
          <div className="mt-8 space-y-3">
            {HOMEPAGE_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl bg-slate-50 ring-1 ring-slate-200/70 open:shadow-md"
              >
                <summary className="cursor-pointer list-none px-5 py-4 font-bold text-slate-900 sm:px-6 sm:py-5 sm:text-lg [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-[var(--copper-deep)] transition-transform group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <div className="border-t border-slate-200 px-5 py-4 text-sm leading-relaxed text-slate-700 sm:px-6 sm:py-5 sm:text-base">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
