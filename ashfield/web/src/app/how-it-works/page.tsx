// ---------------------------------------------------------------------------
// PRE-PUBLISH GATE (added 2026-08-14). This page sells a SUPERSEDED commercial
// model: whole-site or niche exclusivity, routing to one firm at a time, a
// £40 to £120 price band, £500/month retainers, trial batches, and grading
// "from very high to low". None of that is the model the estate runs.
//
// Current model: case-type tiers (config/tiers.json), shared claims capped at
// 3 per lane, exclusive at 3x, price fixed at the first claim, credits on
// exclusive claims only, invoiced monthly by Direct Debit. See
// docs/LEAD_PRICING.md and legal/PARTNER_AGREEMENT_TEMPLATE.md.
//
// The ashfieldtrading site is not published, so this is not live. REWRITE THIS
// PAGE BEFORE THE SITE GOES LIVE: a buyer who reads it alongside the price
// sheet gets two contradictory versions of the deal.
// ---------------------------------------------------------------------------
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { estateTotals, fmtNum } from "@/lib/estate/snapshot";

export const metadata: Metadata = {
  title: "How it works | Ashfield Trading",
  description:
    "Two routes into the Ashfield estate: rent a complete niche accounting site, or buy qualified leads. Each step of both tracks, from first enquiry to ongoing engine.",
  alternates: { canonical: `${siteConfig.url}/how-it-works` },
};

type Step = { title: string; body: string };

const renterSteps: Step[] = [
  {
    title: "Enquiry",
    body: "You tell us the niche you want to own and the capacity you have. One form, no call scheduling gauntlet. We reply within two working days with which sites are available and on what basis.",
  },
  {
    title: "Anonymised proposal deck",
    body: "You receive a proposal built from the site's real performance data: enquiry volumes by month, tier grading, content and research inventory. Everything is aggregated and redacted, no client or firm names, ever.",
  },
  {
    title: "Agreement",
    body: "Terms cover exclusivity for your niche and territory, the setup fee, the monthly engagement and the notice period. Pricing is indicative until this point, subject to proposal.",
  },
  {
    title: "Handover",
    body: "The site is rebadged to your firm: contact routing, phone numbers, compliance details and lead notifications all point at you. The research assets, content library and rankings come with it.",
  },
  {
    title: "Ongoing engine",
    body: "We keep running the machine behind the site: content programme, research updates, technical upkeep and search monitoring. You handle the clients. Monthly reporting shows exactly what arrived and from where.",
  },
];

const buyerSteps: Step[] = [
  {
    title: "Enquiry",
    body: "You tell us which niches you serve, roughly how many new clients a month you can absorb, and any geography constraints. That is enough for us to check fit.",
  },
  {
    title: "Sample anonymised proposal",
    body: "We send a worked sample from live estate data: recent lead volumes for your niche, the tier mix (very high to low), and how verification filters what reaches you. All figures aggregated, nothing identifiable.",
  },
  {
    title: "Terms",
    body: "Per-lead pricing by tier and niche, or a monthly retainer. Deduplication rules, exclusivity, and what counts as a qualified lead are written down before anything is routed. Indicative until agreed.",
  },
  {
    title: "Routing live",
    body: "Qualified enquiries from the agreed sites route to your inbox in real time. Every lead has already passed honeypot filtering, phone lookup, email verification and deduplication before you see it.",
  },
  {
    title: "Monthly reporting",
    body: "A monthly statement lists every lead delivered, its tier, its source niche and its verification result. You reconcile it against what converted; the terms flex with the evidence.",
  },
];

function Track({
  steps,
  eyebrow,
  heading,
  intro,
  reversed,
}: {
  steps: Step[];
  eyebrow: string;
  heading: string;
  intro: string;
  reversed?: boolean;
}) {
  return (
    <div className="mx-auto grid max-w-[1200px] gap-x-[clamp(1rem,2.5vw,2.5rem)] px-(--gutter) lg:grid-cols-12">
      <div
        className={
          reversed
            ? "lg:order-2 lg:col-span-5 lg:col-start-8"
            : "lg:col-span-5"
        }
      >
        <div className="lg:sticky lg:top-28">
          <SectionHeading eyebrow={eyebrow}>{heading}</SectionHeading>
          <p className="type-lead measure mt-6">{intro}</p>
        </div>
      </div>
      <ol
        className={
          reversed
            ? "mt-12 lg:order-1 lg:col-span-6 lg:col-start-1 lg:mt-0"
            : "mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0"
        }
      >
        {steps.map((step, i) => (
          <li
            key={step.title}
            data-reveal
            style={{ "--i": Math.min(i, 5) } as React.CSSProperties}
            className="relative border-l border-hairline-strong pb-14 pl-10 last:pb-0 sm:pl-14"
          >
            {/* navy tick on the rail */}
            <span
              aria-hidden="true"
              className="absolute -left-px top-1 h-10 w-px bg-navy"
            />
            <span
              aria-hidden="true"
              className="type-stat block !text-[2.75rem] text-navy"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="type-h3 mt-3">{step.title}</h3>
            <p className="type-body measure mt-3 text-ink-70">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function HowItWorksPage() {
  const totals = estateTotals();
  return (
    <>
      {/* Hero: paper-3, asymmetric, ghost numeral backdrop */}
      <section className="grain relative overflow-hidden bg-paper-3 py-[6rem]">
        <span
          aria-hidden="true"
          className="ghost-numeral absolute -right-8 -top-10 hidden text-[16rem] lg:block"
        >
          2
        </span>
        <div className="relative mx-auto max-w-[1200px] px-(--gutter)">
          <SectionHeading eyebrow="How it works" as="h1">
            Two routes into the estate
          </SectionHeading>
          <p className="type-lead measure mt-6" data-reveal>
            Ashfield operates {fmtNum(totals.sites)} niche accounting sites
            backed by {fmtNum(totals.research_assets)} proprietary research
            assets. Firms work with us one of two ways: rent a complete
            site outright, or buy the qualified leads it produces. Both start
            with a single enquiry, and both are priced by proposal, not rate
            card.
          </p>
        </div>
      </section>

      {/* Renter track: split 5/7, paper, generous padding */}
      <section className="bg-paper py-[8rem]">
        <Track
          eyebrow="Track one"
          heading="Rent a site"
          intro="For firms that want to own a niche end to end. You take on a live, ranking site with its research assets and lead flow; we keep the engine running behind it."
          steps={renterSteps}
        />
      </section>

      {/* Tight divider band for tempo */}
      <section className="hairline-t hairline-b bg-paper-2 py-[3rem]">
        <div className="mx-auto max-w-[1200px] px-(--gutter)">
          <p className="type-caption measure !text-ink-70">
            Not sure which track fits? Most firms start with leads and move to
            renting once the volume justifies exclusivity. The enquiry form is
            the same for both.
          </p>
        </div>
      </section>

      {/* Buyer track: reversed split, paper-2 with grain, different padding */}
      <section className="grain cv-auto bg-paper-2 py-[11rem]">
        <Track
          eyebrow="Track two"
          heading="Buy leads"
          intro="For firms that want new clients without running a marketing operation. Verified, tier-graded enquiries from the estate route straight to your inbox under written terms."
          steps={buyerSteps}
          reversed
        />
      </section>

      {/* Closing CTA: the one centred section */}
      <section className="cv-auto bg-paper-3 py-[11rem]">
        <div
          className="mx-auto max-w-[1200px] px-(--gutter) text-center"
          data-reveal
        >
          <h2 className="type-h1 mx-auto max-w-[18ch]">
            Start with the enquiry
          </h2>
          <p className="type-lead mx-auto mt-6 max-w-[52ch]">
            Tell us your niche and your capacity. We reply with availability and
            an anonymised proposal within two working days. All pricing is
            indicative, subject to proposal.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" href="/contact">
              Make an enquiry
            </Button>
            <Button variant="secondary" size="lg" href="/rent-a-site">
              See the rent-a-site offer
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
