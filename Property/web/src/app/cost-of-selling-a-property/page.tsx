import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";

const PAGE_PATH = "/cost-of-selling-a-property";
const TITLE = "Cost of Selling a House in the UK: The Full Bill";
const DESCRIPTION =
  "Selling a £293,000 home costs about £5,500: agent commission, conveyancing, an EPC and removals. The full bill, and what comes off a taxable gain.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Blog category prefixes resolved from each post's frontmatter `category:` via
// slugifyCategory() in src/lib/blog.ts. Do not guess these.
const CGT = "/blog/capital-gains-tax";
const LTE = "/blog/landlord-tax-essentials";
const CALC = "/calculators/cost-of-selling-calculator";

/**
 * The at-a-glance box. Every figure carries a named, dated source in the note
 * cell, because the whole differentiator on this SERP is provenance: the pages
 * that outrank us print the same numbers with no vintage and no publisher.
 * Price anchor is HM Land Registry UK House Price Index, England average
 * £293,262 for June 2026, rounded to £293,000 for the arithmetic.
 * Sources: HomeOwners Alliance estate agent fees and cost of moving pages
 * (fetched 21 August 2026); Which? estate agent fees and contracts (updated
 * 8 June 2026, citing Rightmove 2025 data); MoneySavingExpert selling guide
 * (updated 1 July 2026); our own EPC cost page for the EPC range.
 * After-tax route set is the QA-adjudicated canonical one (qa/ADJUDICATIONS.md
 * ruling 13). This page prices ROUTE 2 (online agent, £999 flat fee plus the
 * £80 identity check) on its own £293,000 anchor: cash £3,081, £2,526 at 18%,
 * £2,342 at 24%. Route 1 (no agent at all) is £3,860 on £300,000 and belongs to
 * the child pages. Break-even price gap is unchanged by tax on either route.
 */
const atAGlance = [
  {
    label: "Estate agent commission",
    figure: "About £4,160 on a £293,000 sale",
    condition:
      "The HomeOwners Alliance puts the 2026 average at 1.42% including VAT, and sole agency at 1.2% to 1.8%. Which?, citing Rightmove data for 2025, puts the average nearer 1.3% including VAT, which is about £3,810 on the same sale.",
  },
  {
    label: "Conveyancing on the sale",
    figure: "About £700",
    condition:
      "The HomeOwners Alliance figure for the selling side of a move. Budget more if you are selling a leasehold flat, because your solicitor has a management pack to chase.",
  },
  {
    label: "Energy Performance Certificate",
    figure: "£35 to £120",
    condition:
      "The range on our own EPC cost page. You need the certificate before your home goes on the market, and if the one from when you bought is still in date you pay nothing.",
  },
  {
    label: "Removals",
    figure: "About £550",
    condition:
      "One published estimate, from the HomeOwners Alliance cost of moving figures for 2026. Distance, volume and whether you pay someone to pack all move it, so treat it as a starting point rather than a price.",
  },
  {
    label: "Selling through an online agent instead",
    figure: "£129 to £1,599 as a fixed fee",
    condition:
      "MoneySavingExpert's July 2026 spread across named online providers. Which? gives the market band as £300 to £1,500. Add the identity check that usually sits outside the headline price.",
  },
  {
    label: "Capital gains tax",
    figure: "Nothing on your only home",
    condition:
      "If the place has been your only or main home for the whole time you owned it, there is no tax to pay. On a let property or a second home there is, and your agent's bill comes off the gain.",
  },
];

const faqs = [
  {
    question: "How much does it cost to sell a house in the UK?",
    answer:
      "Budget about £5,500 on a £293,000 home. That is roughly £4,160 of estate agent commission at the 1.42% average the HomeOwners Alliance publishes for 2026, £700 of conveyancing on the selling side, £80 or so for an EPC and about £550 for removals. Your own number moves with your sale price and with the fee you agree. The commission is the only line big enough to be worth arguing about. If you are selling a let property or a second home, add capital gains tax on top. That is a separate bill and it is usually the largest one here.",
  },
  {
    question: "How much do estate agents charge to sell a house?",
    answer:
      "The three sources worth quoting disagree, and it is more useful to say so than to average them. The HomeOwners Alliance publishes 1.42% including VAT as the 2026 average, with sole agency at 1.2% to 1.8% and multi-agency at 3% to 3.6%. Which?, updated in June 2026 and citing Rightmove data for 2025, says the average seller paid roughly 1.3% including VAT. MoneySavingExpert quotes high street agents at 0.75% to 3% plus VAT, which it works out as £2,700 to £10,800 on a £300,000 property. Treat 1.3% to 1.42% including VAT as the central estimate and expect quotes across a much wider range.",
  },
  {
    question: "Is VAT included in the estate agent fee you are quoted?",
    answer:
      "Not always, and it is the first thing to check. A quote of 1.2% plus VAT is 1.44% of your sale price, so it costs you more than a quote of 1.3% including VAT. The rules require an agent to tell you what you will pay and when, before you sign anything. Ask for the figure including VAT in writing. If you are selling something other than your only home, the VAT is not wasted money. You cannot reclaim it, so the whole gross fee comes off your gain.",
  },
  {
    question: "Can you negotiate estate agent fees?",
    answer:
      "Yes, and you should go in with a number rather than a hope. A common target on sole agency is 1% plus VAT, which is 1.2% including it. On a £293,000 sale, moving from 1.42% to 1.2% keeps about £640 in your pocket. Get three quotes so you have something to push against. Push at the valuation, before you have said yes to anyone, because that is the only moment your business is still in play.",
  },
  {
    question: "Do you save money selling without an estate agent?",
    answer:
      "On the headline number, yes. Take the online-agent route on a £293,000 sale and a £999 flat fee plus the £80 identity check leaves you about £3,081 better off than 1.42% commission. Whether you end up ahead is a different question, and nobody can answer it honestly. There is no current independent dataset on whether online and do-it-yourself sales achieve a lower price. Which? notes that a flat fee gives an agent less incentive to chase the highest price. Providers say they usually hit the asking price. Both are positions rather than evidence.",
  },
  {
    question: "Which selling costs can you deduct from capital gains tax?",
    answer:
      "The list is a closed one, and it is shorter than most people expect. Your estate agent's commission counts, and so do your solicitor's fees on the sale, the cost of advertising to find a buyer, an auctioneer's fees if you sell that way, a surveyor's or valuer's fee, and the cost of any valuation you need in order to work the gain out. As a private seller you deduct those amounts including the VAT, because you have no way of reclaiming it. What does not count is everything to do with the move itself: removals, storage, cleaning, new carpets and the cost of getting the place looking presentable. Mortgage interest and early repayment charges do not reduce the gain either.",
  },
  {
    question: "Do you pay capital gains tax when you sell your house?",
    answer:
      "Not if it has been your only or main home for the whole time you owned it. That covers most sellers. You do pay on a buy to let, a second home or a holiday place. The gain is your sale price, less what you paid, less the selling costs that qualify and less any improvements you made. If tax is due, there is a separate return and a 60 day deadline running from completion. That catches people out, because it is nothing like the ordinary tax return timetable.",
  },
  {
    question: "When do you pay the estate agent?",
    answer:
      "On completion, out of the sale proceeds, in almost every case. Your solicitor pays the agent's invoice from the money coming in and sends you the balance, so you never write the cheque yourself. That is also why the completion statement is the document to keep: it is the single piece of paper that evidences your commission, your conveyancing fee and anything the agent added on top. If you are going to need those figures for a tax return later, put it somewhere you will find it in ten years.",
  },
];

function Section({
  id,
  title,
  children,
  links,
}: {
  id: string;
  title: string;
  children: ReactNode;
  links?: { href: string; label: string }[];
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-slate-200 py-8 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700">{children}</div>
      {links && links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-emerald-700 hover:text-emerald-800">
              {l.label} →
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default function CostOfSellingAPropertyPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The cost of selling a house in the UK: the full bill, itemised",
    description: DESCRIPTION,
    inLanguage: "en-GB",
    datePublished: "2026-08-21",
    dateModified: "2026-08-21",
    about: { "@type": "Thing", name: "Cost of selling a residential property in the UK" },
    author: { "@type": "Organization", "@id": `${siteConfig.url}#organization`, name: siteConfig.name },
    publisher: { "@id": `${siteConfig.url}#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${PAGE_PATH}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      <section className="bg-slate-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cost of selling a property" }]} />
          <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            The cost of selling a house in the UK
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Selling an average English home, £293,000 on the Land Registry index, costs about £5,500. Commission is
            roughly £4,160 of it. If the place has not been your own home throughout, there is a seventh line, and it is
            the biggest.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href={CALC}
              className={`${btnPrimary} bg-emerald-600 border-emerald-800 px-6 py-3 text-center text-sm sm:px-8 sm:py-3.5 sm:text-base`}
            >
              Work out your selling costs
            </Link>
            <Link
              href="#capital-gains"
              className={`${btnSecondary} border-white bg-white/10 px-6 py-3 text-center text-sm text-white hover:bg-white/20 sm:px-8 sm:py-3.5 sm:text-base`}
            >
              Jump to the tax line
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-4xl">
            <Section id="at-a-glance" title="What does it cost to sell a house in 2026?">
              <p>
                Every line of the bill on a £293,000 sale, with the source and the vintage for each figure. Your own
                total will land somewhere near it, and the commission line is the only one big enough to be worth an
                argument.
              </p>
              <dl className="rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6">
                {atAGlance.map((row) => (
                  <div key={row.label} className="border-b border-slate-200 py-3 first:pt-0 last:border-b-0 last:pb-0">
                    <dt className="font-bold text-slate-900">
                      {row.label}: <span className="text-emerald-700">{row.figure}</span>
                    </dt>
                    <dd className="mt-1 text-sm text-slate-700">{row.condition}</dd>
                  </div>
                ))}
              </dl>
              <p>
                Add the first four lines together and you get about £5,500: £4,160 of commission, £700 of conveyancing,
                £80 for an EPC and £550 for the van. That is the number to put in your spreadsheet before you speak to
                anybody. It buys you a marketing photo shoot, a portal listing, viewings, an agent to push the chain
                along and a solicitor to move the title.
              </p>
              <p>
                <strong>Work out your own figure.</strong> The cost of selling calculator takes your sale price and the
                fee you have been quoted, and gives you an itemised total, commission first, in under a minute. Flag the
                property as a let or a second home and it adds an estimate of the tax as well.
              </p>
              <p>
                <strong>Before you ring round.</strong> Get three quotes, ask for every fee including VAT in writing,
                and go into the conversation with a target rather than a hope. On sole agency, 1% plus VAT is the number
                sellers commonly aim for.
              </p>
            </Section>

            <Section
              id="agent-fees"
              title="How much do estate agents charge to sell a house?"
              links={[
                {
                  href: `${CGT}/how-much-do-estate-agents-charge-to-sell-a-house`,
                  label: "Agent fees in full: the rate, the VAT and the extras",
                },
                { href: `${CGT}/cheapest-estate-agent-fees-uk`, label: "The four fee models compared" },
                { href: `${CGT}/average-london-estate-agent-fees`, label: "What London agents charge" },
                { href: `${CGT}/estate-agent-fees-for-renting`, label: "Letting agent fees, if you are a landlord" },
              ]}
            >
              <p>
                Three sources publish an average and none of them agrees with the others, so take the spread rather than
                a single number. The HomeOwners Alliance puts the 2026 average at <strong>1.42% including VAT</strong>,
                which on your £293,000 sale is about £4,160. Which?, updated in June 2026 and citing Rightmove data for
                2025, says the average seller paid roughly <strong>1.3% including VAT</strong>, or about £3,810 on the
                same sale. MoneySavingExpert quotes the high street at <strong>0.75% to 3% plus VAT</strong> and works
                that out as £2,700 to £10,800 on a £300,000 property.
              </p>
              <p>
                The honest headline is a central estimate of 1.3% to 1.42% including VAT, and a quoted range far wider
                than that. The HomeOwners Alliance figures put the full spread at 0.9% to 3.6%, which on your sale price
                is anywhere from about £2,640 to about £10,550. Where you land inside it depends on three things: the
                contract you sign, how many agents you instruct, and how hard you push.
              </p>
              <p>
                Sole agency, where one agent markets your home, typically runs 1.2% to 1.8% including VAT. Multi-agency,
                where several compete, runs 3% to 3.6%, because only the winner gets paid and the price reflects that.
                On your £293,000 sale the difference between the two is a flat £5,270 at every point of the range, and
                multi-agency only earns its keep if it genuinely finds you a better buyer.
              </p>
              <p>
                Always ask whether the quote includes VAT, because the two ways of writing it are not the same number. A
                fee of 1.2% plus VAT is 1.44% of your sale price. A fee of 1.3% including VAT is 1.3%. The rules require
                your agent to tell you what you will pay, when it becomes payable and what else gets charged on top.
                That has to happen before you sign anything, so get all of it in writing.
              </p>
              <p>
                Watch the extras, because they sit outside the headline percentage. Premium portal listings,
                professional photography, a floorplan and a withdrawal fee if you take the house off the market are all
                charged separately by some agents. One national fixed-fee agent&apos;s own price page, in August 2026,
                listed an £80 anti-money-laundering check outside its headline price. Ask for the total, in pounds, on
                the sale you are actually expecting.
              </p>
            </Section>

            <Section
              id="negotiating"
              title="Is the fee negotiable, and what should you aim for?"
              links={[
                {
                  href: `${CGT}/estate-agent-contract-tie-in-periods`,
                  label: "Tie-in periods: how long you are locked in",
                },
                { href: `${CGT}/cheapest-estate-agent-fees-uk`, label: "Where the cheapest headline stops being cheap" },
              ]}
            >
              <p>
                It is negotiable, and you get further with a figure than with a request. On sole agency the target
                sellers commonly quote is <strong>1% plus VAT</strong>, which is 1.2% including it. Move from the 1.42%
                average to 1.2% on your £293,000 sale and you keep about £640. That is more than your conveyancing and
                your EPC put together.
              </p>
              <p>
                Push at the valuation, before you have said yes to anyone. That is the only moment when several agents
                are competing for the same instruction, and once the board is up your leverage is gone. Say plainly that
                you hold a cheaper quote elsewhere. Agents expect it and they do not want to lose the business.
              </p>
              <p>
                Ask about a sliding scale too. A lower base rate with a higher percentage above an agreed price gives
                your agent a reason to chase the top of your range rather than the quickest offer.
              </p>
              <p>
                If the rate will not move, negotiate the contract instead. The tie-in period and the notice period
                decide what happens when the agent turns out to be wrong for you. They are usually easier to shift than
                the percentage. A sixteen week lock-in on a home that is not selling costs you far more than twenty
                basis points ever will.
              </p>
            </Section>

            <Section
              id="without-an-agent"
              title="Can you sell without an estate agent, and does it save you money?"
              links={[
                { href: `${CGT}/sell-house-without-estate-agent`, label: "Selling it yourself: the full process" },
                {
                  href: `${CGT}/can-you-sell-a-house-without-an-estate-agent`,
                  label: "Can you legally do it, and should you?",
                },
                { href: `${CGT}/online-estate-agents-uk`, label: "Online agents: how the model actually works" },
              ]}
            >
              <p>
                You can, and nothing in law stops you. Selling your own home is not estate agency, so none of the
                licensing and redress machinery that binds an agent applies to you. What you cannot do is prepare the
                transfer deed for a fee, which is why almost everybody still uses a conveyancer for that part.
              </p>
              <p>
                On the headline the saving is real. MoneySavingExpert&apos;s July 2026 round-up puts named online providers
                between <strong>£129 and £1,599</strong> as a fixed fee, and Which? gives the wider market band as £300
                to £1,500. That is the online-agent route, the one that gets your home on to the portals. Against
                £4,160 of commission on your £293,000 sale, a £999 fixed fee plus the £80 identity check leaves you
                about <strong>£3,081</strong> better off. Skip the agent altogether and a private listing package is £0
                to £400, which puts more cash on the table and all of the work on you.
              </p>
              <p>
                Then read the small print, because that is where the fixed-fee models differ from each other. Some want
                the money up front and keep it whether or not you sell. Some take a deposit and the balance on
                completion. Some defer the whole fee, and a deferred fee that falls due on a date rather than on
                completion is a different animal from one that does not. Which? puts accompanied viewings at around £300
                extra, and notes that the default on most of these services is that you do the viewings yourself.
              </p>
              <p>
                Nobody can tell you honestly whether you end up ahead, and you should be suspicious of anyone who says
                otherwise. There is no current independent dataset showing whether online sellers achieve a lower price
                than high street ones. Which? points out that a flat fee gives an agent less reason to chase the top of
                your range. Providers say they usually hit the asking price. Those are positions, not evidence. If
                saving £3,000 on the fee costs you £5,000 on the price, you are worse off.
              </p>
            </Section>

            <Section
              id="the-rest-of-the-bill"
              title="What else is on the bill?"
              links={[
                { href: `${CGT}/cost-of-moving-house-uk`, label: "The whole move, buying side included" },
                { href: `${LTE}/epc-certificate-cost-uk`, label: "What an EPC costs and who has to have one" },
                { href: "/calculators/stamp-duty-calculator", label: "Stamp duty on what you buy next" },
              ]}
            >
              <p>
                <strong>Conveyancing.</strong> About £700 for the selling side of an average move. A leasehold flat
                costs more. Your solicitor has to get a management pack out of the freeholder or the managing agent, and
                that can hold up the whole chain as well as the bill. Ask for it on day one.
              </p>
              <p>
                <strong>The EPC.</strong> Between £35 and £120, and you need it before the property is marketed rather
                than before it sells. If you still have a valid certificate from when you bought, you pay nothing at
                all, so check that first.
              </p>
              <p>
                <strong>Removals.</strong> One published estimate puts an average move at about £550. Distance, volume
                and whether you pay someone to pack are what move it, and quotes vary far more than any other line here.
                Treat that £550 as a starting point rather than a price.
              </p>
              <p>
                <strong>Everything on the buying side.</strong> If you are moving rather than just selling, the purchase
                is where the real money goes. Expect stamp duty, a survey at around £650, purchase conveyancing at
                around £1,050 and mortgage arrangement fees around £1,000. There is a Land Registry fee too. That one is
                fixed by law and depends on your price band, which makes it the only line on the whole move you cannot
                shop around for. The moving costs guide takes both ends of the chain in one place.
              </p>
              <p>
                <strong>What is not on this list.</strong> You do not pay stamp duty to sell, and you do not pay the
                Land Registry fee on the property you are leaving. Both belong to the buyer, so keep them out of your
                selling budget.
              </p>
            </Section>

            <Section
              id="alternatives"
              title="Is an auction or a part-exchange cheaper?"
              links={[
                { href: `${CGT}/selling-a-house-at-auction-uk`, label: "Selling at auction: costs and timetable" },
                {
                  href: `${CGT}/modern-method-of-auction-explained`,
                  label: "Modern method of auction: who really pays",
                },
                { href: `${CGT}/part-exchange-house-uk`, label: "Part-exchange: what the developer really pays" },
              ]}
            >
              <p>
                Cheaper on paper is not the same as better off, and each of these routes moves the cost somewhere you
                might not be looking for it.
              </p>
              <p>
                <strong>A traditional auction</strong> gives you certainty, because the contract is made when the hammer
                falls and your buyer cannot walk away. One auction house published its commission as 2% to 3% plus VAT
                in August 2026, with a minimum fee from £1,500. On your £293,000 sale that is roughly £7,030 to £10,550
                including VAT, which is more than a high street agent. You are paying for speed and a binding buyer, not
                for a lower fee.
              </p>
              <p>
                <strong>The modern method of auction</strong> looks free to you, because the buyer pays. The
                HomeOwners Alliance records the reservation fee as usually at least 2.5% plus VAT, or a minimum of
                £6,000 including VAT. On a £293,000 home that is around £8,790, and your buyer has to find it on top of
                what they bid. That narrows your pool of buyers and drags on the price they can offer. The timetable is
                typically 28 days to exchange and another 28 to complete.
              </p>
              <p>
                <strong>Part-exchange</strong> with a housebuilder saves you the commission and the chain, and pays for
                it with the offer. The developer prices in a discount to the open market value, and that discount is
                usually far larger than the fee you avoided. It is a genuine arm&apos;s length sale, so if the property
                is taxable the lower price genuinely reduces your gain, which is one of the very few consolations.
              </p>
            </Section>

            <Section
              id="probate"
              title="What changes when you are selling after a death?"
              links={[
                { href: `${CGT}/selling-a-probate-property`, label: "Selling a probate property: the running order" },
                {
                  href: `${CGT}/cgt-on-inherited-property-uk-probate-base-cost`,
                  label: "What you are taxed on when you inherit",
                },
              ]}
            >
              <p>
                The costs are the same. The order of operations is not, and getting it wrong is the most common reason a
                probate sale collapses halfway through.
              </p>
              <p>
                The bill itself does not move. On a £293,000 probate sale you are still looking at about £4,160 of
                commission, £700 of conveyancing and an EPC, and the estate pays them out of the proceeds rather than
                anyone paying them personally. What changes is who is taxed on any rise in value between the date of
                death and the day the sale completes.
              </p>
              <p>
                The house does not belong to whoever inherits it until it is transferred to them. It sits with the
                personal representatives, and if there is more than one of them, they all have to agree to the sale, or
                a court has to order it. The exception is where probate was granted to only some of the named executors,
                in which case the ones who proved the will can sell on their own. Practically, you also want the grant
                in hand before you commit to a buyer, because the timetable is not yours to control until you have it.
              </p>
              <p>
                There is a decision to take before you list, and it is worth taking deliberately. Selling as the
                personal representatives is not the same, for tax, as transferring the property to the beneficiaries and
                letting them sell it. Which one leaves the family better off depends on how many beneficiaries there are
                and what else they have sold that year. Make the call before the board goes up, not after an offer comes
                in.
              </p>
            </Section>

            <Section
              id="capital-gains"
              title="Do you pay capital gains tax when you sell?"
              links={[
                {
                  href: `${CGT}/capital-gains-tax-property-complete-guide-uk`,
                  label: "Capital gains tax on property: the full guide",
                },
              ]}
            >
              <p>
                Not if the place has been your only or main home for the whole time you owned it. That covers most
                sellers. You do pay on a buy to let, a second home or a holiday place. You also pay, on part of the gain,
                if you lived in the property for some of the time you owned it and let it out for the rest.
              </p>
              <p>
                Your selling costs come off the gain, so the agent you have been arguing with is partly paid for by the
                tax you no longer owe. Sell a former rental for £300,000, a round number rather than the £293,000
                average used above, and commission at 1.42% including VAT is £4,260. Add £700 of conveyancing and you
                have £4,960 coming off the gain, which is worth just under £1,200 at the higher residential rate.
                Because you cannot reclaim the VAT, you deduct the gross fee, not the amount before VAT.
              </p>
              <p>
                The list of costs that qualify is a closed one, and it is shorter than most people assume. In go your
                agent&apos;s commission, your solicitor&apos;s fees on the sale, the cost of advertising to find a buyer,
                an auctioneer&apos;s fees if you sell that way, a surveyor&apos;s or valuer&apos;s fee, and the cost of
                any valuation you need in order to work the gain out. Out comes the £550 removals line you costed at the
                top of this page, along with storage, cleaning and anything you spent making the place look presentable.
                Mortgage interest and early repayment charges do not reduce the gain either.
              </p>
              <p>
                One date worth knowing before you exchange. If there is tax to pay, it has its own return and a 60 day
                deadline that runs from completion, not from the day you shook hands. The full guide takes you through
                the rates, the allowance and the mechanics.
              </p>
            </Section>

            <Section
              id="your-number"
              title="How do you work out your own total?"
              links={[
                { href: CALC, label: "Cost of selling calculator" },
                {
                  href: `${CGT}/cgt-payment-deadlines-property-sales-2026`,
                  label: "The 60 day deadline, and how to meet it",
                },
                { href: "/services/property-tax-advice", label: "Property tax advice" },
              ]}
            >
              <p>
                Put your sale price and your quoted fee into the cost of selling calculator. It comes back in under a
                minute with commission, conveyancing, EPC and removals in one column. Tell it the property is a let or a
                second home and it adds the tax on top.
              </p>
              <p>
                Then keep the completion statement. It is the one piece of paper that evidences your commission, your
                conveyancing fee and anything the agent added on top. If the property is taxable, you will want those
                figures long after you have forgotten them. Filed properly today, it is worth a few hundred pounds of
                tax the year you sell.
              </p>
              <p>
                One decision is worth taking before you exchange rather than after: the date you exchange, not the date
                you complete, is what fixes which tax year the gain falls into. A sale that exchanges on 1 April and
                completes on 20 May is taxed in the year that has just ended, while the reporting clock runs from the
                May date. If your sale is anything other than a straightforward main home, that gap is where the money
                is.
              </p>
            </Section>

            <div className="mt-12 border-t border-slate-200 pt-10">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Cost of selling: common questions</h2>
              <div className="mt-6 space-y-6">
                {faqs.map((f) => (
                  <div key={f.question}>
                    <h3 className="text-lg font-bold text-slate-900">{f.question}</h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-700">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Selling something that is not your main home?"
        description="Put your sale price and your quoted fee into the cost of selling calculator and you get an itemised total, commission first, in under a minute, with the tax added when the property is a let or a second home."
        primaryHref={CALC}
        primaryLabel="Try the cost of selling calculator"
        secondaryHref="/contact"
        secondaryLabel="Book free consultation"
      />
    </>
  );
}
