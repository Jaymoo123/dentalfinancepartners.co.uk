import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `About ${siteConfig.name} | Who We Are and How We Work` },
  description: `${siteConfig.name} is a free information service for divorce and separation finances in England and Wales. What we do, what we don't, and how we make money.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <p className="eyebrow text-orange-400">About us</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            A free information service for the money side of divorce.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            We built {siteConfig.name} because people going through divorce need clear answers at
            one of the worst moments of their lives, and too much of what exists online is either
            a law firm&apos;s sales page dressed up as guidance, or official documentation written
            for professionals.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="max-w-3xl space-y-12 text-base leading-relaxed text-neutral-600 sm:text-lg">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Who we are</h2>
              <p>
                {siteConfig.name} is a free information service covering the financial side of
                divorce and separation in England and Wales: what it costs, how settlements work,
                what happens to the house, the pensions and the debts, and what your realistic
                routes are, from doing it yourself to full solicitor representation. We are not a
                law firm, not mediators and not financial advisers, and we do not present ourselves
                as any of those things. The site is maintained as an editorial service and every
                substantive page is checked against official sources before it is published.
              </p>
              <p>
                {siteConfig.name} is a trading name of Ashfield Trading Ltd, a company registered
                in England and Wales.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">What we do</h2>
              <ul className="space-y-4">
                <li>
                  <span className="font-semibold text-neutral-900">Free calculators.</span>{" "}
                  Divorce costs by route, Help with Fees eligibility, consent order and clean break
                  costs, a financial settlement range estimator, and a mediation vs solicitor cost
                  comparison. All free, no sign-up, working shown, assumptions stated.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">Plain-English guides.</span>{" "}
                  Step-by-step explanations of court fees, financial orders, Form E, pensions in
                  divorce, the family home and more, written from official source material and kept
                  current.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">Specialist connections.</span>{" "}
                  If you want professional help, we can introduce you to a vetted family law firm
                  or an accredited mediator. This only ever happens with your consent.
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">What we do not do</h2>
              <p>We think you should know exactly where our boundaries are:</p>
              <ul className="space-y-4">
                <li>
                  <span className="font-semibold text-neutral-900">We do not provide legal or financial advice.</span>{" "}
                  Everything on this site is general information. It cannot take account of your
                  personal circumstances, and it is not a substitute for advice from a qualified
                  professional. Our settlement estimator gives an indicative range, never a figure
                  you are &quot;entitled to&quot;.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">We do not conduct divorces, draft orders or represent anyone.</span>{" "}
                  Applications, consent orders, disclosure and negotiation belong with solicitors
                  and mediators.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">We do not advise on pensions or financial products.</span>{" "}
                  How pension sharing works in general is information, and we stop there. What you
                  should do with your pension is regulated financial advice, and for that you need
                  a regulated adviser. MoneyHelper offers free, impartial guidance as a starting
                  point.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">We do not handle claims.</span>{" "}
                  If you believe you were mis-sold a financial product, that is a different,
                  regulated area and not something we deal with or refer.
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">How we make money</h2>
              <p>
                Honesty about this matters to us, especially on a site about money during divorce.
                If you ask us to connect you with a specialist and you go on to use their services,
                we may receive a fee from the firm we introduce you to. This never changes what you
                pay, and it never changes what our guides and calculators say. The firm is also
                required by its own professional rules to tell you about the arrangement. The
                tools and content are free for everyone, whether or not you ever speak to a
                specialist.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">How we choose partner firms</h2>
              <p>
                We introduce people only to solicitor firms regulated by the Solicitors Regulation
                Authority and, for mediation, only to mediators accredited by the Family Mediation
                Council, who are able to conduct the initial mediation meeting (MIAM) that most
                court applicants need. Partner firms are under no obligation to take on any
                enquiry, and nothing in our arrangement with them affects the advice they give you.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Editorial standards</h2>
              <ul className="space-y-4">
                <li>
                  <span className="font-semibold text-neutral-900">Sources.</span> Our primary
                  sources are gov.uk, HM Courts and Tribunals Service fee schedules and guidance,
                  legislation.gov.uk and official statistics. Where a page relies on a specific
                  rule or figure, we cite it.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">Figures.</span> Court fees and
                  thresholds are stated with their effective date. Fee figures on this site reflect
                  the HMCTS schedule applying from 13 July 2026.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">Review cadence.</span> Every
                  guide carries a last-reviewed date. We review content when court fees change,
                  after each Budget and Finance Act, and at the start of each tax year.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">No fake anything.</span> No
                  invented reviews, no fabricated case studies presented as real, no
                  countdown-timer urgency. If you see a worked example, it is labelled as an
                  illustration.
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">Corrections.</span> If you spot
                  something wrong, tell us via the contact page. We would rather fix it than defend
                  it.
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12">
            <Link href="/contact" className={btnPrimary}>
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
