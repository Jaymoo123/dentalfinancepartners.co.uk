import type { Metadata } from "next";
import Link from "next/link";
import { StampDutyCalculator } from "@/components/calculators/StampDutyCalculator";
import { CalculatorPageResources } from "@/components/resources/CalculatorPageResources";
import { LeadCTAPanel } from "@/components/property/LeadCTAPanel";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildCalculatorJsonLd } from "@/lib/calculator-schema";
import { STANDARD_SDLT_BANDS } from "@/lib/sdlt";

export const metadata: Metadata = {
  title: "Stamp Duty Calculator UK (2026/27): How Much You Pay",
  description:
    "Free stamp duty calculator for 2026/27. Work out how much stamp duty you pay in England and Northern Ireland, including the 5% second-home surcharge.",
  alternates: { canonical: `${siteConfig.url}/calculators/stamp-duty-calculator` },
  openGraph: {
    title: "Stamp Duty Calculator UK (2026/27)",
    description: "Work out how much stamp duty you pay, including the 5% second-home surcharge.",
    url: `${siteConfig.url}/calculators/stamp-duty-calculator`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stamp Duty Calculator UK (2026/27)",
    description: "Work out how much stamp duty you pay, including the 5% second-home surcharge.",
  },
};

const gbp = (n: number) => "£" + n.toLocaleString("en-GB");

// Rate table rows derived from the same bands the calculator uses, so the copy
// and the tool can never disagree. ponytail: derived, not retyped.
const bandRows = STANDARD_SDLT_BANDS.map((b, i, arr) => {
  const from = i === 0 ? 0 : arr[i - 1].upTo;
  const pct = Math.round(b.rate * 100);
  return {
    band:
      i === 0
        ? `Up to ${gbp(b.upTo)}`
        : b.upTo === Infinity
          ? `Above ${gbp(from)}`
          : `${gbp(from + 1)} to ${gbp(b.upTo)}`,
    rate: `${pct}%`,
    withSurcharge: `${pct + 5}%`,
  };
});

const faqs = [
  {
    q: "How much stamp duty will I pay?",
    a: "On a standard home in England or Northern Ireland you pay nothing on the first £125,000, 2% on the slice from £125,001 to £250,000, 5% from £250,001 to £925,000, 10% from £925,001 to £1,500,000 and 12% above that. Enter your price in the calculator above and it gives you the figure and the effective rate.",
  },
  {
    q: "How much is stamp duty on a second home?",
    a: "You pay a 5% surcharge on the whole price on top of the standard rates. On a £300,000 second home that is £5,000 of standard stamp duty plus £15,000 of surcharge, so £20,000 in total. Tick the additional property box in the calculator and it adds the surcharge for you.",
  },
  {
    q: "Do first-time buyers pay stamp duty?",
    a: "Not on the first £300,000. First-time buyers pay 0% up to £300,000 and 5% on the slice from £300,000 to £500,000. Once the price passes £500,000 the relief is withdrawn completely and you pay standard rates on the whole price.",
  },
  {
    q: "What are the stamp duty thresholds for 2026/27?",
    a: "The nil-rate threshold is £125,000 for a standard purchase and £300,000 for a first-time buyer. The other thresholds are £250,000, £925,000 and £1,500,000, and each rate applies only to the slice of the price inside its band.",
  },
  {
    q: "Is stamp duty different in Scotland and Wales?",
    a: "Yes. Scotland charges Land and Buildings Transaction Tax and Wales charges Land Transaction Tax, both with their own bands and their own additional-property rules. This calculator covers England and Northern Ireland only, so use the LBTT or LTT calculator if you are buying there.",
  },
  {
    q: "Can I use this as an SDLT calculator for a limited company?",
    a: "Yes, for a normal buy-to-let purchase by a property-letting company. Tick the additional property box, because a company pays the 5% surcharge on every residential purchase with no starting allowance. The calculator does not model the 17% flat rate that can hit a company buying a dwelling over £500,000 where no letting relief applies.",
  },
  {
    q: "Do non-UK residents pay extra stamp duty?",
    a: "Yes, a further 2% on the whole price on top of the standard rates and any second-home surcharge. Tick the non-UK resident box and the calculator adds it.",
  },
  {
    q: "When do you pay stamp duty?",
    a: "The return and the payment are both due within 14 days of completion. Your conveyancer normally files it, but the responsibility for getting it right sits with you as the buyer.",
  },
];

export default function StampDutyCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildCalculatorJsonLd({
            name: "Stamp Duty (SDLT) Calculator",
            description:
              "Work out Stamp Duty Land Tax on a property purchase in England and Northern Ireland, including the 5% additional-dwelling surcharge, first-time-buyer relief and the 2% non-resident surcharge.",
            path: "/calculators/stamp-duty-calculator",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <section className="bg-slate-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            onDark
            items={[
              { label: "Home", href: "/" },
              { label: "Calculators", href: "/calculators" },
              { label: "Stamp Duty Calculator" },
            ]}
          />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Stamp Duty Calculator UK (2026/27)
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            Work out how much stamp duty you pay on a property in England &amp; Northern Ireland. Put in
            your price, tick the boxes for an additional property, a first-time buyer or a non-UK
            resident, and the calculator gives you the figure and your effective rate.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        {/* No inner clamp: `max-w-5xl` left the calculator 64px narrower than
            every other section on the page, so its edges did not line up
            with the heading below it. */}
        <div className={siteContainerLg}>
          <StampDutyCalculator variant="page" />
          <CalculatorPageResources slug="stamp-duty-calculator" />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">How much is stamp duty?</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                On a standard home you pay nothing on the first £125,000, then 2%, 5%, 10% and 12% on the
                slices above it. These are the 2026/27 rates for England and Northern Ireland.
              </p>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-300 text-left">
                    <th className="py-2 pr-4 font-bold text-slate-900">Portion of the price</th>
                    <th className="py-2 pr-4 font-bold text-slate-900">You pay</th>
                    <th className="py-2 font-bold text-slate-900">With the 5% surcharge</th>
                  </tr>
                </thead>
                <tbody>
                  {bandRows.map((r) => (
                    <tr key={r.band} className="border-b border-slate-200">
                      <td className="py-2 pr-4 text-slate-700">{r.band}</td>
                      <td className="py-2 pr-4 font-semibold text-slate-900">{r.rate}</td>
                      <td className="py-2 font-semibold text-slate-900">{r.withSurcharge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-base leading-relaxed text-slate-700">
              The calculator applies exactly these bands slice by slice, adds any surcharge you tick, and
              shows you the total and the effective rate across the whole price.
            </p>

            <h2 className="mt-12 text-2xl font-bold text-slate-900 sm:text-3xl">
              Stamp duty on a second home
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                You pay <strong>5% extra on the whole price</strong> when you buy an additional residential
                property, on top of the standard rates in the table above. It applies to a second home, a
                holiday home and a buy-to-let alike, and it starts from the first pound rather than from
                £125,000.
              </p>
              <p>
                <strong>Tick the &ldquo;additional property&rdquo; box in the calculator</strong> and it works the
                surcharge out for you, showing it as a separate line under the total so you can see what the
                second home is costing you.
              </p>
              <p>
                On a <strong>£300,000 second home</strong> you pay £5,000 of standard stamp duty (2% of the
                £125,000 between £125,000 and £250,000, then 5% of the £50,000 above it) plus £15,000 of
                surcharge, so <strong>£20,000 in total</strong>, an effective rate of 6.7%.
              </p>
              <p>
                If you bought the new home before selling your old one, you may be able to claim the surcharge
                back when the old home sells, provided that happens within three years.
              </p>
            </div>

            <h2 className="mt-12 text-2xl font-bold text-slate-900 sm:text-3xl">
              Stamp duty rates in England and Northern Ireland
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                The SDLT rates above are the current UK stamp duty rates for England and Northern Ireland,
                and they have applied since 1 April 2025. Northern Ireland is not devolved for this tax, so a
                buyer in Belfast uses the same table as a buyer in Birmingham.
              </p>
              <p>
                Scotland and Wales are different. Scotland charges Land and Buildings Transaction Tax with an
                8% additional dwelling supplement, and Wales charges Land Transaction Tax with its own higher
                rates rather than a flat surcharge. Use the{" "}
                <Link className="text-emerald-700 underline" href="/calculators/lbtt-calculator-scotland">
                  LBTT calculator for Scotland
                </Link>{" "}
                or the{" "}
                <Link className="text-emerald-700 underline" href="/calculators/ltt-calculator-wales">
                  LTT calculator for Wales
                </Link>{" "}
                if you are buying there, because this tool will give you the wrong number.
              </p>
              <p>
                Buying from abroad adds another 2% on the whole price. That non-resident surcharge stacks on
                top of the standard rates and the second-home surcharge, so a non-resident buying a second
                home in England pays the standard bands plus 7%.
              </p>
            </div>

            <h2 className="mt-12 text-2xl font-bold text-slate-900 sm:text-3xl">
              Stamp duty for limited companies and non-residential property
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                A limited company pays the standard bands plus the 5% surcharge on every residential purchase,
                with no starting allowance, so tick the additional property box when you price a company deal.
                A company buying a single dwelling for more than £500,000 can instead face a 17% flat rate,
                though a genuine property-letting business is relieved from it and pays the normal bands plus
                the surcharge. The calculator does not model that flat rate.
              </p>
              <p>
                Stamp duty on non-residential property runs on a different table entirely: 0% up to £150,000,
                2% from £150,001 to £250,000 and 5% above £250,000, with no additional-property surcharge. That
                table covers shops, offices, land and mixed-use buildings, so a purchase of business property
                will not match the figure this calculator gives you.
              </p>
              <p>
                Moving a property you already own into your own company is a purchase for stamp duty, charged
                on market value rather than on what you pay yourself. The cost of that move is set out in our{" "}
                <Link
                  className="text-emerald-700 underline"
                  href="/blog/incorporation-and-company-structures/sdlt-transfer-property-company-cost"
                >
                  guide to SDLT on transferring property to a limited company
                </Link>
                .
              </p>
            </div>

            <h2 className="mt-12 text-2xl font-bold text-slate-900 sm:text-3xl">
              Stamp duty for first-time buyers
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-700">
              You pay nothing on the first £300,000 and 5% on the slice from £300,000 to £500,000, and you lose
              the relief entirely once the price passes £500,000. Tick the first-time buyer box above, or use
              the{" "}
              <Link
                className="text-emerald-700 underline"
                href="/calculators/first-time-buyer-stamp-duty-calculator"
              >
                first-time buyer stamp duty calculator
              </Link>{" "}
              if that is the only figure you need.
            </p>

          </div>
        </div>
      </section>

      {/* Was a pale mint gradient card holding a bare LeadForm, boxed to
          `max-w-3xl` mid-page. Now the same full-bleed navy brick panel every
          other page converts on.

          `redirectOnSuccess` stays false, as it was on the card: a reader who has
          just entered their figures should keep the result on screen rather than
          be thrown to /thank-you.

          `id` is kept: StampDutyCalculator links to #get-expert-help from its
          result panel. The slate-50 FAQ section below is what keeps this navy
          panel off the navy footer (the adjacency rule). */}
      <div id="get-expert-help" className="scroll-mt-24">
        <LeadCTAPanel
          eyebrow="Free review"
          title="Buying a property? Get the tax right from the start."
          description="Stamp duty is only the first tax decision. We help landlords and investors structure purchases tax-efficiently, checking surcharge-refund routes, weighing incorporation, and planning the ongoing tax on the property. Tell us about your purchase for a no-obligation review."
          proofPoints={[
            { title: "Property tax only", detail: "Section 24, CGT and MTD every day" },
            { title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts" },
            { title: "24-hour response", detail: "Usually the same working day" },
          ]}
          submitLabel="Request a property tax review"
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
          redirectOnSuccess={false}
        />
      </div>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Stamp duty calculator: common questions
            </h2>
            <dl className="mt-6 space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <dt className="text-lg font-semibold text-slate-900">{f.q}</dt>
                  <dd className="mt-2 text-base leading-relaxed text-slate-700">{f.a}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-12 text-2xl font-bold text-slate-900 sm:text-3xl">
              Related calculators and rate tables
            </h2>
            <ul className="mt-6 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
              <li>
                Buying your first home? Use the{" "}
                <Link className="text-emerald-700 underline" href="/calculators/first-time-buyer-stamp-duty-calculator">first-time buyer SDLT calculator</Link>
                .
              </li>
              <li>
                Buying in Scotland? Land and Buildings Transaction Tax applies instead, so use the{" "}
                <Link className="text-emerald-700 underline" href="/calculators/lbtt-calculator-scotland">LBTT calculator</Link>
                .
              </li>
              <li>
                Buying in Wales? Land Transaction Tax applies, so use the{" "}
                <Link className="text-emerald-700 underline" href="/calculators/ltt-calculator-wales">LTT calculator</Link>
                .
              </li>
              <li>
                Every current threshold, band and surcharge is set out on our{" "}
                <a className="text-emerald-700 underline" href="/property-tax-rates">
                  UK property tax rates page
                </a>
                .
              </li>
              <li>
                Weighing up how the purchase should be owned? Speak to a{" "}
                <a className="text-emerald-700 underline" href="/services/property-accountant">
                  specialist property accountant
                </a>
                .
              </li>
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-slate-500">
              Stamp Duty Land Tax is charged under the Finance Act 2003. The figure here is an estimate:
              reliefs and edge cases (mixed-use, six or more dwellings, uninhabitable property) can change it,
              and we can confirm your exact position before you exchange.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
