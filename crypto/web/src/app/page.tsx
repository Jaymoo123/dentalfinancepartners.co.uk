import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  btnPrimary,
  focusRing,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { cryptoHubs } from "@/data/crypto-hubs";
import { buildFaqJsonLd, buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/schema";
import { LeadForm } from "@/components/forms/LeadForm";
import { ArrowRight, ShieldCheck, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Specialist UK Crypto Tax Accountants` },
  description:
    "Specialist UK crypto tax accountants: CGT, Self Assessment, HMRC disclosure, staking and mining income, DeFi and NFT tax. CARF-ready. Speak to a crypto tax specialist.",
  alternates: { canonical: siteConfig.url },
};

// ponytail: HP-verified figures only; all linked to gov.uk source
const keyStats = [
  {
    value: "18% / 24%",
    label: "CGT rates 2026/27 (within basic band then above)",
    href: "https://www.gov.uk/capital-gains-tax/rates",
  },
  {
    value: "£3,000",
    label: "Annual CGT exempt amount (frozen)",
    href: "https://www.gov.uk/capital-gains-tax/allowances",
  },
  {
    value: "1 Jan 2027",
    label: "CARF first report window opens to HMRC",
    href: "https://www.gov.uk/guidance/reporting-cryptoasset-user-and-transaction-data",
  },
  {
    value: "20 years",
    label: "Max HMRC look-back for deliberate non-disclosure",
    href: "https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets",
  },
];

const segmentCards = [
  {
    title: "Crypto investors",
    body: "CGT on disposals, s104 pooling errors, swaps you did not know were taxable, and unclaimed loss years.",
    href: "/for/investors",
  },
  {
    title: "Day traders",
    body: "High-frequency disposal history, same-day and 30-day matching rules, and the income-tax risk of a trading-status finding.",
    href: "/for/day-traders",
  },
  {
    title: "DeFi and staking",
    body: "Liquidity pool entries, lending protocol deposits, and staking rewards: HMRC's current view, not settled law, applied to your position.",
    href: "/for/defi-and-staking",
  },
  {
    title: "NFT creators and flippers",
    body: "Whether NFT sales are trading income or CGT depends on activity and purpose. We assess your facts, not a generic rule.",
    href: "/for/nft-creators-and-flippers",
  },
  {
    title: "Miners",
    body: "Mining rewards taxed on receipt as income (miscellaneous or trading), then CGT on disposal. The £1,000 allowance shelters income only, not the later gain.",
    href: "/for/miners",
  },
  {
    title: "Businesses holding or accepting crypto",
    body: "Corporation Tax on disposals, no CGT annual exempt amount, crypto payroll NIC obligations, and accounting measurement for token holdings.",
    href: "/for/businesses",
  },
];

const whatWeActuallyFix = [
  {
    title: "Swaps counted as zero",
    body: (
      <>
        <a
          href="https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets"
          className="underline underline-offset-2"
        >
          Every crypto-to-crypto swap is a taxable disposal
        </a>{" "}
        at the sterling market value at the moment of the exchange. &ldquo;I never cashed out to
        pounds&rdquo; is not a defence. Many DIY returns omit hundreds of swap events entirely.
      </>
    ),
  },
  {
    title: "Wrong pooling method from US software",
    body: (
      <>
        UK individuals use{" "}
        <a
          href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200"
          className="underline underline-offset-2"
        >
          s104 pooling at average cost
        </a>
        , with same-day and 30-day override rules. FIFO, LIFO, and specific-identification
        (defaults in Koinly, CTC and other US-built tools) are wrong for UK purposes. The
        mismatch can produce materially incorrect CGT figures in either direction.
      </>
    ),
  },
  {
    title: "Loss years left on the table",
    body: (
      <>
        Capital losses must be{" "}
        <a
          href="https://www.gov.uk/capital-gains-tax/losses"
          className="underline underline-offset-2"
        >
          claimed within four years
        </a>{" "}
        of the end of the tax year they arose in. Unreported loss years from bear markets or
        rug pulls are recoverable value. We audit the full history, not just the current year.
      </>
    ),
  },
  {
    title: "Staking and mining income mis-reported",
    body: (
      <>
        Mining and staking rewards are taxable as income on receipt, at the sterling value at
        that moment. That receipt value also becomes the CGT base cost for the later disposal.
        The{" "}
        <a
          href="https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income"
          className="underline underline-offset-2"
        >
          £1,000 trading and miscellaneous income allowance
        </a>{" "}
        shelters small receipts from income tax only; it does not reduce CGT on the disposal.
      </>
    ),
  },
];

const calculatorLinks = [
  {
    title: "Crypto CGT estimator",
    body: "Estimate your capital gains tax position from a disposal history. Applies s104 pooling and the £3,000 AEA. Does not model same-day or 30-day rules (state your simplifications openly).",
    href: "/calculators/crypto-cgt-estimator",
  },
  {
    title: "Crypto disclosure and penalty estimator",
    body: "Estimate the tax and potential penalty exposure from unreported crypto gains, by behaviour band (reasonable care, careless, deliberate) and look-back window.",
    href: "/calculators/crypto-disclosure-estimator",
  },
  {
    title: "Investor vs trader status checker",
    body: "Work through the badges-of-trade analysis for cryptoassets. Almost everyone is an investor; trader treatment typically means income tax up to 45% plus Class 4 NIC versus 24% CGT.",
    href: "/calculators/investor-vs-trader-checker",
  },
  {
    title: "Staking and mining income estimator",
    body: "Estimate the income tax position on staking or mining receipts and the CGT base cost carried into the later disposal, including the £1,000 allowance limit.",
    href: "/calculators/staking-mining-income-estimator",
  },
];

const whySpecialist = [
  {
    area: "s104 pooling and matching rules",
    detail:
      "We apply the correct UK methodology: s104 average-cost pool per token, with same-day acquisitions matched first, then acquisitions in the following 30 days. We check whether US-software exports have applied FIFO, LIFO or specific-ID and correct them.",
  },
  {
    area: "HMRC disclosure service",
    detail:
      "Where gains are unreported, we use HMRC's dedicated cryptoasset disclosure service. An unprompted voluntary disclosure secures the lowest penalty band. The look-back window is 4 years (reasonable care), 6 years (careless), or 20 years (deliberate).",
  },
  {
    area: "DeFi and liquidity pools",
    detail:
      "Under HMRC's current analysis, many DeFi deposits and liquidity-pool entries are themselves disposals. This is HMRC's current view, not settled law; the 2023 consultation was not enacted. We apply the published analysis, not a guess.",
  },
  {
    area: "Trader vs investor status",
    detail:
      "Trader status is almost always a worse outcome: trading profits face income tax up to 45% plus Class 4 NIC (6% between £12,570 and £50,270, 2% above), versus a maximum 24% CGT. We assess the badges of trade on your actual facts.",
  },
  {
    area: "Staking, mining and airdrops",
    detail:
      "Each category has its own income-tax and CGT two-step. Unsolicited airdrops enter CGT at acquisition value; airdrops received in return for something are income. Forks split the base cost between old and new tokens; they are not free income.",
  },
  {
    area: "Business and company crypto",
    detail:
      "Companies have no CGT annual exempt amount. Disposals fall within Corporation Tax (main rate 25% above £250,000, small profits rate 19% up to £50,000). Token accounting measurement is fact-specific; we advise on the principle and route complex cases.",
  },
];

const testimonials = [
  {
    quote:
      "I had run a Koinly report and assumed the figure was correct. When we reviewed the history, Koinly had used FIFO for a large ETH disposal in a year I had been buying frequently. The corrected s104 calculation reduced my CGT liability by a material amount. I had been about to overpay.",
    attribution: "Private crypto investor, South East England, multiple tax years reconciled",
  },
  {
    quote:
      "I received an HMRC nudge letter about cryptoasset income. I did not ignore it. We made an unprompted voluntary disclosure covering four tax years, declared the gains and the income from staking, and settled the position. The letter had a specific deadline and the firm helped us respond well within it.",
    attribution: "Freelancer, Midlands, cryptoasset disclosure and Self Assessment",
  },
  {
    quote:
      "We had been treating every DeFi protocol interaction as outside scope because we thought only cash-outs were taxable. By the time we engaged a specialist, there were several years of unreported disposal events. The position was more complex than expected, but it was manageable because we acted before CARF data reaches HMRC.",
    attribution: "DeFi participant, London, multi-year compliance review",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Do I need a crypto tax accountant or can software do it?",
    answer:
      "Software can generate a report, but it applies its own pooling method, which is usually FIFO or specific-identification by default. Those methods are wrong for UK individuals, who must use s104 pooling at average cost with same-day and 30-day override rules. Software also cannot assess trader-status risk, DeFi disposal events, or the correct treatment of staking income. For a straightforward buy-and-hold history with a small number of disposals, a software export reviewed manually may be enough. For active trading histories, DeFi, staking, mining, or any unreported years, specialist advice is the right approach.",
  },
  {
    question: "Can HMRC see my exchange account?",
    answer:
      "From 1 January 2026, UK cryptoasset platforms are required to collect user and transaction data under the Cryptoasset Reporting Framework (CARF). The first report to HMRC is due between 1 January 2027 and 31 May 2027, covering the 2026 calendar year. The position that HMRC cannot see exchange data is formally over. Overseas platforms within scope of the international CARF framework are subject to equivalent reporting obligations in their own jurisdictions.",
  },
  {
    question: "I got a nudge letter about crypto. What should I do?",
    answer:
      "Respond, do not ignore it. HMRC runs a dedicated cryptoasset disclosure service for unpaid tax on crypto. An unprompted voluntary disclosure secures the lowest penalty band and the shortest look-back window applicable to your behaviour. The letter will contain a deadline. Contact us as soon as you receive it so we can assess the years in scope, calculate the liability and manage the disclosure process. Nudge letters are not assessments, but ignoring them converts an unprompted disclosure into a prompted one, which increases penalties.",
  },
  {
    question: "Do I pay tax if I only swapped one coin for another and never cashed out?",
    answer:
      "Yes. Every crypto-to-crypto swap is a disposal for CGT purposes, valued in sterling at the moment of the swap. HMRC treats the exchange of one cryptoasset for another as a sale of the first asset and an acquisition of the second at market value. This is confirmed in HMRC's published guidance. The fact that no sterling ever entered your bank account does not change the position.",
  },
  {
    question: "Is my US crypto software calculating my UK tax correctly?",
    answer:
      "Probably not, unless you have manually set the pooling method to UK s104 average cost and confirmed the same-day and 30-day matching rules are being applied. Most US-built tools default to FIFO, LIFO or specific-identification, none of which is the correct method for UK individuals. The error can produce a figure that is too high or too low depending on your trading pattern. We review the raw transaction history and apply the correct methodology.",
  },
  {
    question: "I have not reported crypto for a few years. What happens now?",
    answer:
      "The number of years HMRC can assess depends on your behaviour: 4 years for reasonable care, 6 years for careless, and 20 years for deliberate non-disclosure. An unprompted voluntary disclosure through the HMRC cryptoasset disclosure service secures the lowest applicable penalty band. CARF reporting begins in early 2027, covering 2026 data, so acting before that window closes is materially better than waiting. We can assess the years in scope and manage the disclosure.",
  },
  {
    question: "Do you help companies that hold or accept crypto?",
    answer:
      "Yes. Companies holding or disposing of cryptoassets pay Corporation Tax, not CGT, and have no annual exempt amount. The main rate is 25% on profits above £250,000 (small profits rate 19% up to £50,000, with Marginal Relief between the thresholds). Token accounting measurement depends on the applicable accounting standard and the facts. Crypto payroll, where tokens are readily convertible assets, attracts PAYE and employer NIC at 15% above the £5,000 secondary threshold. See the businesses hub for more detail.",
  },
  {
    question: "How much does a crypto tax accountant cost?",
    answer:
      "Fees depend on the complexity of the position: number of tax years, transaction volume, exchanges and wallets used, whether DeFi or staking is involved, and whether an HMRC disclosure is required. We do not publish standard prices because the right scope varies too much. Contact us with a summary of your situation and we will explain what a typical engagement looks like and what we would need from you.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildOrganizationJsonLd() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildWebsiteJsonLd() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />

      {/* Hero */}
      <section className="relative flex items-center min-h-[520px] sm:min-h-[640px] lg:min-h-[720px] overflow-hidden bg-[#0e1a3a]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e1a3a] via-[#1a3a6e]/70 to-[#081020]" />
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20 w-full`}>
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-200">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              {siteConfig.name}
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Specialist UK crypto tax accountants.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-blue-100 sm:text-xl">
              CGT on disposals and swaps, HMRC disclosure and nudge letters, staking and mining
              income, DeFi, NFTs and businesses holding or accepting crypto. CARF reporting begins
              in early 2027. We work exclusively on cryptoasset tax.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/contact"
                className={`inline-flex min-h-12 items-center justify-center bg-white px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold text-[#0e1a3a] hover:bg-blue-50 active:bg-blue-100 transition-colors text-center ${focusRing}`}
              >
                Speak to a crypto tax specialist
              </Link>
              <Link
                href="/services/hmrc-disclosure"
                className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-white hover:bg-white/20 transition-colors text-center ${focusRing}`}
              >
                HMRC disclosure service
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2.5 text-sm text-blue-300">
              <ShieldCheck className="h-4 w-4 flex-shrink-0" aria-hidden />
              <span className="font-medium">
                Investors, day traders, DeFi, NFTs, miners and businesses. UK-wide (HMRC).
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Key figures bar */}
      <section className="bg-[#1a3a6e] py-8 sm:py-10" aria-label="Key crypto tax figures 2026/27">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {keyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <a
                  href={stat.href}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono hover:text-blue-200 transition-colors"
                >
                  {stat.value}
                </a>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold text-blue-200 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
            Most crypto holders are not tax professionals. The rules are genuinely complex: every
            swap is a disposal, US software applies the wrong pooling method, DeFi protocol
            interactions may themselves be disposals (under HMRC&apos;s current view, not settled
            law), and unreported years carry a 4-to-20-year look-back window. We handle the
            technical side so you can manage the position with confidence.
          </p>
        </div>
      </section>

      {/* Who we help: segment routing */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">Who we work with</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Six holder types, each with a different tax picture.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            The rules that apply to a long-term investor differ materially from those facing a
            day trader, a DeFi participant, or a company treasury. Choose your situation for
            sector-specific guidance.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {segmentCards.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group block border border-neutral-200 bg-neutral-50 p-5 sm:p-6 transition-all hover:border-[#0e1a3a] hover:shadow-md ${focusRing}`}
              >
                <span className="text-base font-bold text-neutral-900 group-hover:text-[#0e1a3a] transition-colors">
                  {item.title}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{item.body}</p>
                <ArrowRight className="mt-3 h-4 w-4 text-neutral-400 group-hover:text-[#0e1a3a] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship lane: HMRC disclosure + CARF urgency */}
      <section className="border-b border-neutral-200 bg-[#0e1a3a] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="mb-4 inline-block bg-white/10 border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-200">
                Disclosure and nudge letters
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Unreported crypto gains: act before CARF data reaches HMRC.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-blue-100 sm:text-lg">
                <a
                  href="https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets"
                  className="underline underline-offset-2 text-blue-200 hover:text-white"
                >
                  HMRC runs a dedicated cryptoasset disclosure service
                </a>{" "}
                for unpaid tax on crypto. An unprompted voluntary disclosure secures the lowest
                penalty band. The look-back window is 4 years (reasonable care), 6 years
                (careless), or 20 years (deliberate).
              </p>
              <p className="mt-4 text-base leading-relaxed text-blue-100">
                Under the{" "}
                <a
                  href="https://www.gov.uk/guidance/collecting-cryptoasset-user-and-transaction-data"
                  className="underline underline-offset-2 text-blue-200 hover:text-white"
                >
                  Cryptoasset Reporting Framework (CARF)
                </a>
                , UK platforms began collecting user and transaction data from{" "}
                <strong className="text-white">1 January 2026</strong>. The first report to HMRC
                is due between{" "}
                <strong className="text-white">1 January 2027 and 31 May 2027</strong>, covering
                the 2026 calendar year. Annual reporting follows by 31 May each year thereafter.
                The position that exchange data is invisible to HMRC is over.
              </p>
              <div className="mt-8">
                <Link
                  href="/services/hmrc-disclosure"
                  className={`inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-semibold text-[#0e1a3a] hover:bg-blue-50 transition-colors ${focusRing}`}
                >
                  How we handle HMRC disclosure
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  label: "You received a nudge letter",
                  body: "Respond before the deadline. A nudge letter is not an assessment, but ignoring it converts an unprompted disclosure into a prompted one, increasing penalties.",
                },
                {
                  label: "You have unreported years",
                  body: "We assess the years in scope by behaviour band, calculate the liability including interest, and manage the disclosure through HMRC's service.",
                },
                {
                  label: "You are unsure what you owe",
                  body: "We audit the full transaction history, apply correct s104 pooling, identify unclaimed losses, and produce a defensible liability figure.",
                },
                {
                  label: "CARF is approaching",
                  body: "Platforms covering 2026 will report to HMRC from January 2027. Voluntary disclosure before that window closes is materially better than waiting.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border border-white/20 bg-white/5 p-5 sm:p-6"
                >
                  <div className="font-bold text-white">{item.label}</div>
                  <p className="mt-2 text-sm leading-relaxed text-blue-200">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we actually fix */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">The moments that bring people to us</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            The four errors most DIY crypto returns contain.
          </h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {whatWeActuallyFix.map((item) => (
              <article
                key={item.title}
                className="border border-neutral-200 border-l-4 border-l-[#0e1a3a] bg-white p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-4xl">
              Services
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600">
              Five specialist service areas covering the full crypto tax compliance picture.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "HMRC cryptoasset disclosure",
                body: "Unprompted voluntary disclosures through HMRC's dedicated service, covering all behaviour bands and look-back windows. Nudge letter responses managed end-to-end.",
                href: "/services/hmrc-disclosure",
              },
              {
                title: "Crypto Self Assessment",
                body: "Full Self Assessment preparation including SA108 capital gains pages with correct s104 pooling, swap disposals, staking income and loss claims.",
                href: "/services/crypto-self-assessment",
              },
              {
                title: "Koinly and Recap reconciliation",
                body: "We review software-generated reports, correct pooling method errors (FIFO to s104), identify missing wallets and exchanges, and produce a defensible UK figure.",
                href: "/services/koinly-recap-reconciliation",
              },
              {
                title: "Crypto CGT planning",
                body: "Disposal sequencing, spouse and civil partner transfers (no-gain no-loss, HP 7), AEA utilisation (£3,000, 2026/27), and loss crystallisation before year-end.",
                href: "/services/crypto-cgt-planning",
              },
              {
                title: "Investor vs trader status",
                body: "Badges-of-trade analysis applied to your transaction history. Trader status typically means income tax up to 45% plus Class 4 NIC versus 24% CGT. We assess the risk on your facts.",
                href: "/services/investor-vs-trader-status",
              },
            ].map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className={`group block border border-neutral-200 bg-neutral-50 p-6 sm:p-7 transition-all hover:border-[#0e1a3a] hover:shadow-md ${focusRing}`}
              >
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#0e1a3a] transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{service.body}</p>
                <div className="mt-4 flex items-center text-[#0e1a3a] font-semibold text-sm">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Free tools + data asset */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <div className="section-label mb-4">Free tools</div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
                Four calculators covering the questions people ask most.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
                All four calculators are scenario and estimate tools. They state their
                simplifications openly (the same-day and 30-day matching rules are out of scope
                for any stateless web tool) and end at &ldquo;your situation has X complexity, speak
                to us&rdquo;. They never produce a filing-ready figure. No sign-up, no data stored.
              </p>
              <div className="mt-8 space-y-3">
                {calculatorLinks.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className={`group flex items-start justify-between gap-4 border border-neutral-200 bg-white px-5 py-4 transition-all hover:border-[#0e1a3a] ${focusRing}`}
                  >
                    <div>
                      <div className="text-sm font-bold text-neutral-900 group-hover:text-[#0e1a3a] transition-colors">
                        {calc.title}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-neutral-500">{calc.body}</p>
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400 group-hover:text-[#0e1a3a] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="section-label mb-4">Data asset</div>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                UK Crypto Tax Gap and Compliance Index.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                A regularly updated index modelling the estimated gap between cryptoasset CGT
                and income tax theoretically due and the tax actually reported, drawing on HMRC
                compliance data, CARF timelines, and reported disposal volumes. The index carries
                its methodology and limitations prominently; it is a compliance-awareness
                resource, not a regulatory filing.
              </p>
              <div className="mt-6">
                <Link
                  href="/research/crypto-tax-gap-index"
                  className={`group flex items-center justify-between border border-neutral-200 bg-white px-5 py-4 text-sm font-semibold text-neutral-800 hover:border-[#0e1a3a] hover:text-[#0e1a3a] transition-all ${focusRing}`}
                >
                  View the UK Crypto Tax Gap Index
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#0e1a3a] group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why a specialist, not a generalist */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">Why specialist matters</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            A generalist handles your bookkeeping.{" "}
            <span className="text-[#0e1a3a]">We handle the parts of crypto tax that need specialist knowledge.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            s104 pooling with same-day and 30-day matching, DeFi disposal analysis, the
            badges-of-trade test for day-trading, the correct income-then-CGT two-step for
            staking and mining, and the economics of HMRC disclosure: a generalist encounters
            these infrequently. We work with them every week.
          </p>
          <div className="mt-12 overflow-x-auto border border-neutral-200">
            <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
              <caption className="sr-only">
                How {siteConfig.name} handles common crypto tax areas
              </caption>
              <thead>
                <tr className="bg-[#0e1a3a] text-white">
                  <th scope="col" className="px-4 py-3 font-bold text-sm uppercase tracking-wider sm:px-6 sm:py-4">
                    Area
                  </th>
                  <th scope="col" className="px-4 py-3 font-bold text-sm uppercase tracking-wider sm:px-6 sm:py-4">
                    Our approach
                  </th>
                </tr>
              </thead>
              <tbody>
                {whySpecialist.map((row, i) => (
                  <tr
                    key={row.area}
                    className={`border-b border-neutral-200 last:border-0 ${i % 2 === 1 ? "bg-neutral-50" : "bg-white"}`}
                  >
                    <th scope="row" className="px-4 py-3.5 font-semibold text-neutral-900 sm:px-6 sm:py-4">
                      {row.area}
                    </th>
                    <td className="px-4 py-3.5 text-neutral-600 sm:px-6 sm:py-4">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Anonymised social proof */}
      <section className="bg-[#fafaf9] py-12 sm:py-16 lg:py-20" aria-labelledby="testimonials-heading">
        <div className={siteContainerLg}>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="section-label mb-4">Real outcomes</div>
            <h2 id="testimonials-heading" className="text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
              What clients say
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              Composite accounts based on patterns across our client base. Names, amounts and
              specific details anonymised. The compliance situations described are real.
            </p>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="relative bg-white border border-neutral-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <Quote className="absolute top-4 right-4 h-6 w-6 text-blue-100" aria-hidden />
                <blockquote className="text-base leading-relaxed text-neutral-800 font-medium pr-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-neutral-100 text-xs sm:text-sm font-semibold text-neutral-500">
                  {t.attribution}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-4xl">
              Common questions
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group border border-neutral-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-[#0e1a3a] transition-colors list-none">
                    <span>{faq.question}</span>
                    <span
                      className="flex-shrink-0 text-[#0e1a3a] transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA with LeadForm */}
      <section className="relative overflow-hidden bg-[#0e1a3a]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a6e]/20 via-neutral-900/0 to-neutral-900/0 pointer-events-none" />
        <div className={`${siteContainerLg} relative z-10 py-12 sm:py-20 lg:py-24`}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="section-label mb-6">Get started</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
                Talk to a crypto tax specialist
              </h2>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-blue-100">
                Tell us about your situation. We will explain what you need and what the position
                looks like, in plain English, with no obligation.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: "Crypto tax only", sub: "We do not take general commercial or property clients" },
                  { title: "24-hour response", sub: "Usually the same working day" },
                  { title: "All conversations are confidential", sub: "We never discuss one client's position with another" },
                  { title: "UK-wide (HMRC)", sub: "Scotland has devolved income tax bands; we flag where they change the outcome" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4 text-blue-100">
                    <div className="h-12 w-12 flex items-center justify-center bg-[#1a3a6e] text-white font-bold text-xl flex-shrink-0">
                      &#10003;
                    </div>
                    <div>
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-sm text-blue-300">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4 sm:mb-6">
                Get in touch
              </h3>
              <LeadForm submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog footer strip */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto">
            <div className="section-label mb-4">Guides and analysis</div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
              Plain English crypto tax guidance for UK holders.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Articles and guides on CGT and disposals, HMRC disclosure, staking and mining income,
              DeFi, NFTs, trader status and businesses holding crypto. Written for people managing
              their own tax position, not for accountants.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/blog" className={btnPrimary}>
                Browse all guides
              </Link>
              <Link
                href="/services/hmrc-disclosure"
                className="inline-flex items-center gap-2 text-[#0e1a3a] hover:opacity-70 font-semibold text-sm sm:text-base transition-opacity"
              >
                HMRC disclosure service
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
