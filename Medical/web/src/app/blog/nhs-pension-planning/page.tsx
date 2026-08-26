import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

const PAGE_TITLE = "NHS Pension Explained: How the Scheme Works for Doctors";
const PAGE_DESCRIPTION =
  "How the NHS pension scheme works for doctors and GPs: the 1995, 2008 and 2015 sections, how contributions and accrual work, what the scheme pays, and when a tax charge arises. An NHS pension scheme guide.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/blog/nhs-pension-planning` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${siteConfig.url}/blog/nhs-pension-planning`,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent(PAGE_TITLE)}`, width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const faqs: { q: string; a: string }[] = [
  {
    q: "How does NHS pension scheme work for a doctor joining today?",
    a: "A doctor joining today builds benefits only in the 2015 section, because every active member moved into it on 1 April 2022. Each year you bank 1/54th of that year's pensionable pay as future annual pension, and the banked amount is uprated while you keep working by the Consumer Prices Index plus 1.5%. Nothing is invested on your behalf and there is no pot with a balance. Your normal pension age is your State Pension age, or 65 if that is later, and the minimum age at which you can draw anything is 55.",
  },
  {
    q: "How does NHS pension work if you move to part time or less than full time?",
    a: "Part-time work reduces the pensionable pay you actually receive, so each year you bank 1/54th of the lower figure and your pension grows more slowly. Your contribution tier is set on your actual pensionable pay, not on the whole-time equivalent salary, which is why dropping sessions can also drop you a tier. Freelance locum work is treated differently again through annualisation, the process of scaling short engagements up to a notional full-year rate to decide which tier applies. Ask for the tier calculation in writing when your sessions change.",
  },
  {
    q: "Is the NHS pension a good deal, or should you opt out?",
    a: "For most doctors it remains the single most valuable part of the package. The employer pays 23.7% of pensionable pay on top of the member's own tiered 5.2% to 12.5% for 2026/27, and the benefit is a guaranteed inflation-linked income rather than a market return. Opting out to avoid an annual allowance charge is usually the wrong lever, because Scheme Pays can settle the charge without giving up accrual. Opting out is a regulated financial decision and belongs with an authorised adviser, not with a tax calculation alone.",
  },
  {
    q: "What happens to your NHS pension when you die?",
    a: "The scheme pays a death-in-service lump sum and an ongoing survivor pension to a qualifying partner and dependent children, with the amounts set by the section your service sits in. Since 6 April 2024 the relevant tax test is the Lump Sum and Death Benefit Allowance of £1,073,100, which caps the tax-free lump sums payable in life and on death combined. Keeping your nomination form current with NHS Pensions matters more than the tax point, because an out-of-date nomination is the most common cause of the wrong person receiving the lump sum.",
  },
  {
    q: "Can you get a refund of NHS pension contributions if you leave?",
    a: "A refund of contributions is only possible where you have less than two years of qualifying membership and have not transferred other pension rights in, and it is claimed on form RF12 through NHS Pensions. Past two years your benefits stay in the scheme as deferred benefits and are revalued until you take them, which is almost always worth more than a taxed cash refund. Freelance locums face a harder deadline than a refund question: work not submitted on locum form B within 10 weeks of ending cannot be pensioned at all.",
  },
  {
    q: "What is superannuation on your payslip?",
    a: "Superannuation is the NHS payslip word for your own NHS pension scheme contributions, deducted before income tax so that tax relief is given automatically at your marginal rate. The deduction is a tiered percentage of pensionable pay, between 5.2% and 12.5% from 1 April 2026, and it is not the same thing as the amount your pension grew that year. Annual allowance tax is measured on growth in the value of your benefits, so a payslip deduction of a few thousand pounds can sit alongside a pension input amount many times larger.",
  },
];

export default function NHSPensionPlanningPillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "NHS Pension Planning");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: "NHS Pension Planning" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: PAGE_TITLE,
        description: metadata.description,
        url: `${siteConfig.url}/blog/nhs-pension-planning`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const h2 = "text-2xl font-bold text-[var(--ink)] mb-4";
  const p = "text-base leading-relaxed text-[var(--ink-soft)]";
  const link = `text-[var(--accent-strong)] underline underline-offset-2 ${focusRing} rounded`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className={`${contentNarrow} ${sectionY}`}>
        <Breadcrumb
          suppressJsonLd
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "NHS Pension Planning" },
          ]}
        />

        <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
          <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
            NHS Pension Explained for Doctors &amp; GPs
          </h1>
          <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
            The NHS pension scheme is a defined benefit pension, which means it pays a guaranteed
            income for life based on your earnings and your years of service, not on an investment
            pot that can rise or fall. Every active member now builds benefits in the 2015 section at
            1/54th of each year&apos;s pensionable pay, on top of any 1995 or 2008 service already
            banked. This page is the map; the detail sits on the pages it links to.
          </p>
        </header>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className={h2}>What is the NHS pension scheme, and how does the NHS pension scheme work?</h2>
            <p className={`${p} mb-4`}>
              It is a statutory defined benefit scheme for NHS staff in England and Wales,
              administered by the NHS Business Services Authority. The 1995 and 2008 sections were
              made under the Superannuation Act 1972; the 2015 section was made under the Public
              Service Pensions Act 2013 and its current rules sit in SI 2015/94.
            </p>
            <p className={`${p} mb-4`}>
              The mechanism is simple even though the paperwork is not. You pay a tiered percentage
              of your pensionable pay, your employer pays 23.7% on top, and in exchange the scheme
              promises you a fixed fraction of your earnings for every year you are a member. In the
              2015 section that fraction is 1/54th, banked each year and then uprated by the
              Consumer Prices Index plus 1.5% for as long as you remain active.
            </p>
            <p className={p}>
              Understanding NHS pensions starts there, with the difference between a promise and a
              pot. Nothing in the scheme is invested for you, no balance is quoted to you, and the
              annual statement you receive shows an entitlement rather than a fund value. That
              single distinction explains most of what follows, including why a pay rise can create
              a tax bill.
            </p>
          </section>

          <section>
            <h2 className={h2}>How does the NHS pension work if you have 1995, 2008 and 2015 service?</h2>
            <p className={`${p} mb-4`}>
              Most senior doctors hold benefits in more than one section, and each section pays on
              its own terms at its own normal pension age. The 1995 section is final salary, accrues
              at 1/80th and pays an automatic tax-free lump sum of three times the pension, with a
              normal pension age of 60. The 2008 section is also final salary, accrues at 1/60th
              with no automatic lump sum, and has a normal pension age of 65.
            </p>
            <p className={`${p} mb-4`}>
              The 2015 section is career average revalued earnings, or CARE, so it values each
              year&apos;s pay separately rather than linking everything to your final salary. Its
              normal pension age tracks your State Pension age, or 65 if that is later. From
              1 April 2022 every active member accrues in the 2015 section regardless of any
              protection they previously held.
            </p>
            <p className={p}>
              A consultant or GP partner in post since the 1990s typically holds 1995 and 2015
              benefits; someone who joined between 2008 and 2015 can hold entitlements in all three.
              Because the sections have different retirement ages, different commutation terms and
              different early-retirement factors, a projection built on one section alone will be
              wrong. Reading your Total Reward Statement section by section is the first practical
              step.
            </p>
          </section>

          <section>
            <h2 className={h2}>What is the NHS pension contribution, and what is the NHS pension percentage of your pay?</h2>
            <p className={`${p} mb-4`}>
              Member contributions are tiered, so the rate you pay depends on which pay band your
              pensionable pay falls into, and both the bands and the tier you land in change. NHS
              scheme dates run from 1 April while the tax year starts on 6 April, so a contribution
              band and an allowance never share a start date.
            </p>
            <p className={`${p} mb-4`}>
              Two points routinely catch doctors out. The tier is charged on pensionable pay only,
              so private practice, medico-legal work and dividends never push you up a band.
              Contributions are deducted before income tax, so relief comes automatically at your
              marginal rate rather than through a claim. For the employer side, the rate is 23.7% of
              pensionable pay and has been since 1 April 2024.
            </p>
            <p className={p}>
              The 2026/27 band table, the six rates that go with it and your own tier against a
              specific salary all sit on the{" "}
              <Link href="/calculators/nhs-superannuation-tiered-contribution" className={link}>
                tiered contribution calculator
              </Link>
              , which is where that figure is maintained. For how relief interacts with a GP
              partner&apos;s profit share see{" "}
              <Link href="/blog/gp-pension-contributions-tax-relief" className={link}>
                GP pension contributions and tax relief
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className={h2}>What would 30 years of service actually build?</h2>
            <p className={`${p} mb-4`}>
              Because accrual is a fixed fraction, the answer is arithmetic rather than forecasting.
              Thirty years at 1/54th is 30/54 of your career-average revalued earnings, which is
              close to 55.6% of them.
            </p>
            <p className={`${p} mb-4`}>
              Take Dr A, an illustrative hospital consultant whose 2015 section pensionable pay
              averages £100,000 across a 30-year career once each year has been revalued. Each year
              banks £100,000 divided by 54, which is £1,852. Thirty of those years give £1,852
              multiplied by 30, or roughly £55,600 of annual pension for life, payable from her
              normal pension age. If she also holds 10 years of 1995 service on a final salary of
              £100,000, that adds £100,000 divided by 80 multiplied by 10, which is £12,500 a year,
              plus an automatic lump sum of three times that figure, £37,500. What changes the
              answer most is not investment performance but the earnings path: years of lower
              part-time pay are banked at that lower level and stay there.
            </p>
            <p className={p}>
              Figures above are illustrative and rounded, and a real projection has to use your own
              revalued earnings for each year. The point of the arithmetic is that the scheme is
              knowable in advance, which is why the tax planning around it can be done years ahead
              rather than in the month a statement arrives.
            </p>
          </section>

          <section>
            <h2 className={h2}>What NHS pension benefits do you get beyond the pension itself?</h2>
            <p className={`${p} mb-4`}>
              The income is the headline, and the ancillary cover is a large part of the value.
              Membership carries a death-in-service lump sum, survivor pensions for a qualifying
              partner and dependent children, and ill-health retirement benefits on two tiers
              depending on whether you are unable to do your own job or any regular employment.
            </p>
            <p className={`${p} mb-4`}>
              Members can also buy more. Added Pension buys extra defined benefit accrual inside the
              scheme, while Money Purchase Additional Voluntary Contributions build a separate
              defined contribution pot alongside it. Both attract income tax relief and both count
              towards the annual allowance, so neither is a way around a charge.
            </p>
            <p className={p}>
              Tax-free cash is now capped by allowance rather than by fund size. The lifetime
              allowance was abolished on 6 April 2024 and replaced by a Lump Sum Allowance of
              £268,275 and a Lump Sum and Death Benefit Allowance of £1,073,100. Older protections
              such as Fixed, Enhanced and Individual Protection still change those limits, so check
              whether you hold one before deciding how much pension to commute. The{" "}
              <Link href="/nhs-pension" className={link}>NHS pension hub</Link> covers the scheme
              administration and benefit detail.
            </p>
          </section>

          <section>
            <h2 className={h2}>When can you retire, and what does going early cost?</h2>
            <p className={`${p} mb-4`}>
              The earliest you can normally draw benefits is 55, against normal pension ages of 60
              for 1995 service, 65 for 2008 service and State Pension age for 2015 service. Taking
              benefits before a section&apos;s normal pension age applies a permanent actuarial
              reduction set by the scheme actuary, and those factors are revised periodically, so
              take the current figure from NHS Pensions rather than an older article. In the 2015
              section, Early Retirement Reduction Buy Out lets you pay extra now to buy out part of
              that reduction later.
            </p>
            <p className={`${p} mb-4`}>
              Partial retirement has been available in all sections since 1 October 2023. You can
              draw between 20% and 100% of accrued benefits in up to two events, then keep working
              and keep accruing in the 2015 section. There is a condition: pensionable pay or
              commitment must fall by at least 10% for the first 12 months. That is the part most people
              miss, and it is covered in full in the{" "}
              <Link href="/blog/nhs-pension-partial-retirement-doctors-guide" className={link}>
                partial retirement guide for doctors
              </Link>
              .
            </p>
            <p className={p}>
              A retirement plan also has to sit alongside your state pension, which is payable from
              State Pension age and not before, plus any personal pension, ISA or non-NHS defined
              benefit rights. The order in which those are drawn changes the tax paid, and for
              anyone weighing a private-practice income against NHS accrual it changes the answer on
              both sides at once.
            </p>
          </section>

          <section>
            <h2 className={h2}>Are you affected by the annual allowance or the tapered annual allowance?</h2>
            <p className={`${p} mb-4`}>
              The annual allowance is £60,000 for 2026/27 and caps the pension growth that can be
              built each year with tax relief. In a defined benefit scheme the measured amount is
              the pension input amount, which is the increase in the capital value of your promised
              benefits over the year, not the contributions you paid. A pay rise, extra sessions, a
              seniority increment or a Clinical Excellence Award can all produce an input amount far
              larger than anything visible on a payslip.
            </p>
            <p className={`${p} mb-4`}>
              The taper is a two-part test, and both parts have to be failed before your allowance
              is reduced at all. Reading only the adjusted income limb is the most common way
              doctors reach the wrong answer about whether the taper reaches them, and a consultant
              can have a very large adjusted income and still not be tapered.
            </p>
            <p className={p}>
              Unused allowance can be carried forward from the previous three tax years, current
              year first, which is why modelling before the tax year ends is worth more than
              reacting after it. The two income tests, the thresholds and the calculation itself,
              including how to work out threshold and adjusted income, belong to the{" "}
              <Link href="/calculators/nhs-pension-annual-allowance" className={link}>
                NHS pension annual allowance calculator
              </Link>
              , the{" "}
              <Link href="/medical-guides/nhs-pension-annual-allowance" className={link}>
                NHS pension annual allowance guide
              </Link>
              , the{" "}
              <Link href="/blog/nhs-pension-annual-allowance-complete-guide" className={link}>
                complete annual allowance guide
              </Link>{" "}
              and the{" "}
              <Link href="/blog/nhs-pension-tapered-annual-allowance-calculator" className={link}>
                tapered annual allowance worked calculation
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className={h2}>What is Scheme Pays, and when can the scheme settle the charge for you?</h2>
            <p className={`${p} mb-4`}>
              Scheme Pays means NHS Pensions settles your annual allowance charge with HMRC and
              permanently reduces your future benefits in exchange, with the reduction calculated on
              scheme-set factors that carry an interest cost. That makes it a deferral rather than a
              waiver, and the cost of the deferral is the thing to weigh.
            </p>
            <p className={p}>
              There are two routes, mandatory and voluntary, and a doctor tipped into a charge by
              the taper alone is often on the voluntary one without realising it. There is also an
              election deadline with two limbs, the second of which a revised pension savings
              statement can move. Both tests, both deadline limbs and the statutory references sit
              on the{" "}
              <Link href="/calculators/nhs-pension-scheme-pays" className={link}>
                Scheme Pays calculator
              </Link>
              , with the dates worked through on the{" "}
              <Link href="/blog/nhs-pension-scheme-pays-doctors-deadlines" className={link}>
                Scheme Pays deadlines page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className={h2}>The McCloud remedy, and the tax reconciliation it left behind</h2>
            <p className={`${p} mb-4`}>
              The McCloud remedy is the fix for age discrimination in the protections applied when
              the 2015 section launched. It moved affected members&apos; service between 1 April 2015
              and 31 March 2022 back into their legacy 1995 or 2008 section, from 1 October 2023,
              and it reaches a narrower group than doctors assume: two membership dates decide
              eligibility rather than simply having worked through the remedy period.
            </p>
            <p className={p}>
              Two live consequences follow, on different clocks. The benefit choice between legacy
              and 2015 terms is deferred to retirement, so most doctors have nothing to elect now.
              The tax consequence is immediate, because rolled-back service produces revised pension
              input amounts that can restate prior-year annual allowance positions in either
              direction. The eligibility dates, the two statements, the remedy-year deadlines and
              how refunds, rebates and re-elections work are set out in the{" "}
              <Link href="/blog/mccloud-remedy-nhs-pension-doctors-explained" className={link}>
                McCloud remedy explainer
              </Link>{" "}
              and in{" "}
              <Link href="/blog/nhs-pension-tax-charges-how-to-minimize" className={link}>
                NHS pension tax charges
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className={h2}>Dividends are not pensionable, and no calculator will tell you that</h2>
            <p className={`${p} mb-4`}>
              A doctor's ordinary personal service company cannot hold a GMS or PMS contract, and
              income routed through a company is not NHS-pensionable. Those contracts sit with GPs,
              their partnerships, or a company limited by shares whose shareholders all qualify.
              Private practice, medico-legal work or locum income
              taken as dividends therefore builds no NHS accrual at all, however efficient the
              corporation tax position looks in isolation. For a hospital consultant, only the NHS
              employment is pensionable; private work never is, in any structure.
            </p>
            <p className={p}>
              That makes incorporation a two-sided calculation. A saving measured against the 45%
              additional rate above £125,140 has to be set against 1/54th of the lost pensionable
              pay for every year the arrangement runs, plus the employer&apos;s 23.7%. The pension
              side is the half that gets left out, and it is usually the larger number over a
              career.
            </p>
          </section>

          <section>
            <h2 className={h2}>NHS pension scheme guides for your role</h2>
            <p className={`${p} mb-4`}>
              How your pensionable pay is worked out depends on whether the scheme treats you as a
              practitioner or an officer. A GP partner is a Type 1 medical practitioner, meaning a
              GP provider or partner whose pensionable earnings derive from net NHS-derived profit.
              That profit is certified each year on the Type 1 Annual Certificate of Pensionable
              Profits, filed through Primary Care Support England, the body that administers GP
              pension records and payments in England. Wales uses the local health board, and Scotland and Northern
              Ireland have separate arrangements.
            </p>
            <p className={`${p} mb-4`}>
              A salaried GP is a Type 2 medical practitioner and completes the Type 2
              self-assessment instead. Both run to a 28 February deadline a year in arrears, so the
              2025/26 pension year is due by 28 February 2027. Freelance GP locums record and pay
              contributions on their locum earnings using locum forms A and B, submitted through
              Primary Care Support England, and are bound by a much shorter clock.
            </p>
            <p className={p}>
              Work that ended more than 10 weeks ago cannot be pensioned, which is a permanent loss
              of accrual rather than a late-filing penalty. These NHS pension scheme guides go
              deeper by role:{" "}
              <Link href="/blog/nhs-pension-for-locums-form-a-form-b" className={link}>
                locum forms A and B
              </Link>
              ,{" "}
              <Link href="/for-gps" className={link}>accounting for GPs</Link>,{" "}
              <Link href="/for-consultants" className={link}>hospital consultants</Link> and{" "}
              <Link href="/for-junior-doctors" className={link}>doctors in training</Link>.
            </p>
          </section>

          <section>
            <h2 className={h2}>NHS pension explained: questions doctors ask</h2>
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="text-lg font-semibold text-[var(--ink)] mb-2">{f.q}</h3>
                  <p className={p}>{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {relatedPosts.length > 0 && (
            <section className="mt-12 pt-8 border-t border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--ink)] mb-6">Related Articles</h2>
              <ul className="space-y-4">
                {relatedPosts.map((post) => {
                  const readTime = calculateReadTime(post.contentHtml);
                  return (
                    <li key={post.slug}>
                      <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
                        <h3 className="font-serif text-lg font-semibold text-[var(--ink)] sm:text-xl">
                          <Link
                            href={`/blog/${post.slug}`}
                            className={`hover:text-[var(--accent-strong)] transition-colors ${focusRing} rounded`}
                          >
                            {post.title}
                          </Link>
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                          {post.summary}
                        </p>
                        <div className="mt-4 flex items-center gap-3 text-sm text-[var(--muted)]">
                          {post.date && (
                            <time dateTime={post.date}>
                              {new Intl.DateTimeFormat("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }).format(new Date(post.date))}
                            </time>
                          )}
                          <span>•</span>
                          <span>{readTime} min read</span>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <div className="mt-16 border-2 border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 p-8 sm:p-10 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--primary)] sm:text-3xl">
              Need NHS Pension Advice?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              Annual allowance charges, McCloud restatements and the pension cost of incorporating
              private work all turn on figures that have to be modelled, not estimated. Our
              specialist medical accountants can work through your position and set out the options.
            </p>
            <div className="mt-8">
              <LeadForm redirectOnSuccess={false} submitLabel="Request Pension Consultation" />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
