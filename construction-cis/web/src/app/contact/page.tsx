import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { TradeBackdrop } from "@/components/layout/TradeBackdrop";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { WhatToExpectCard } from "@/components/ui/WhatToExpectCard";
import { siteContainerLg, sectionYLoose } from "@/components/ui/layout-utils";
import { niche } from "@/config/niche-loader";
import { isPackagesMode } from "@accounting-network/web-shared/lib/niche-config";

export const metadata: Metadata = {
  // Unconditionally neutral: no free-call framing in the tab title regardless of variant.
  // NOTE: this description is pinned against src/lib/page-summaries.ts by
  // src/tests/design/page-summaries.test.ts. Edit both or neither.
  title: "Contact | CIS Accountants for Trades",
  description:
    "Book a free call with a specialist CIS accountant. CIS refunds, gross payment status and construction accounting. A specialist CIS accountant will be in touch.",
};

export default function ContactPage() {
  return (
    <>
      {/* Navy motif hero, matching Property/web/src/app/contact/page.tsx, which
          keeps its dark ground at the TOP of this route rather than moving it to
          cream the way /services and /cis-refund did. The reason those two moved
          was the dark TAIL (DESIGN_DELTA 3a.2): their closing band ran navy into
          the navy footer. This route's tail is the cream-adjacent #fafaf7 body
          section, so the tail is already light and the hero can stay dark. Bands
          top to bottom: navy hero, #fafaf7 body, navy footer. No two adjacent
          bands share a ground.

          The flat bg-neutral-900 gains the brand motif (TradeBackdrop, the
          counterpart to Property's HeroBrickBackdrop); the section needs
          `relative overflow-hidden` and the content `relative z-10` for it. */}
      <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-900 py-16 sm:py-20">
        <TradeBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb variant="light" items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          {/* .eyebrow on a DARK ground MUST keep an explicit on-dark colour
              utility: the class default is --accent-strong (#c2410c), 3.43 on
              #171717 and below the 4.5 text floor. text-orange-400 (#ff8904) is
              7.54 there. Pinned by file:line in
              src/tests/design/eyebrow-ground.test.ts, so this line moving means
              that pin moves with it. */}
          <p className="eyebrow text-orange-400">Get in touch</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Book a free call.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Talk through your CIS position, your refund history, or any construction tax question. No hard sell, no obligation.
          </p>
          {isPackagesMode(niche) ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-300">
              Already know what you need? Our fixed monthly plans start at £24 a month for subbies and you can{" "}
              <Link
                href="/pricing"
                className="font-medium text-orange-400 hover:text-orange-300"
                data-cta="contact_pricing_link"
                data-cta-placement="contact"
                data-cta-variant={niche.cta.variant}
              >
                pick a plan online in a couple of minutes
              </Link>
              .
            </p>
          ) : null}
        </div>
      </section>

      {/* The capture section is the #book anchor for this route, matching
          Property/web/src/app/contact/page.tsx:63. scroll-mt-24 so a jump from
          the chrome does not land the heading under the sticky header. No
          data-cta on this wrapper: autoCapture resolves through
          closest("[data-cta]") and an id here would swallow every control
          inside the form (the defect 05ddb709 fixed on the two pillar pages). */}
      <section id="book" className="scroll-mt-24 bg-[#fafaf7]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div className="min-w-0 space-y-12">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
                <ol className="mt-8 space-y-8">
                  {[
                    {
                      n: "01",
                      title: "Fill in the form",
                      body: "Tell us a little about your situation. Are you a sole trader or limited company subcontractor, and what do you need help with?",
                    },
                    {
                      n: "02",
                      title: "A specialist CIS accountant gets in touch",
                      body: "A specialist CIS accountant will respond to arrange a short call. Not a sales team, not a call centre.",
                    },
                    {
                      n: "03",
                      title: "Free introductory call",
                      body: "We talk through your CIS position, your refund entitlement and any questions. If we are the right fit, we will explain how we work together. No pressure.",
                    },
                  ].map((step) => (
                    <li key={step.n} className="flex gap-5">
                      {/* --accent-strong (#c2410c, 5.18 on this #fafaf7 ground),
                          not text-orange-500. --accent (#f97316) measures 2.80
                          here, under the 3:1 graphics floor, and globals.css:43
                          says in its own comment that the token must never carry
                          text on a light ground. Same defect DL-8 item 3 fixed
                          on the 19 tick marks on / and /services. */}
                      <span
                        className="font-mono text-2xl font-semibold text-[var(--accent-strong)] tabular-nums"
                        aria-hidden
                      >
                        {step.n}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-neutral-900">{step.title}</h3>
                        <p className="mt-2 text-base leading-relaxed text-neutral-600">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* GATE 5 / TD-19. What stood here was a "Prefer to contact us
                  directly?" block whose only offer was a link to /contact, on
                  /contact. Placeholder copy that was never filled in: there is
                  no phone number or email published anywhere on this site, so
                  there is no direct route to give. The owner's ruling
                  (2026-09-12) is DELETE, and the fix for the gap it leaves is
                  better reassurance, never a restored self-link.

                  The link floor is unaffected: the metric counts UNIQUE
                  same-site destinations, /contact is already a chrome
                  destination (SiteFooter.tsx:28, the Company column), and the
                  deleted <a> pointed at /contact. Unique destinations lost: 0.
                  The Breadcrumb added above points at "/", also chrome. Floor
                  14, baseline 20, still 20.

                  In its place, the card Property puts on this route, with every
                  string passed explicitly. Trade's WhatToExpectCard has NO
                  default title and NO default items, deliberately (see its
                  docstring): Property's ships defaults that publish a
                  "Fixed fee quote if you decide to proceed" line no page
                  authored, and this card must not acquire any. Every item below
                  is checked against /privacy-policy section 5, which is the
                  reference page: partner network (:109-110), redacted summary
                  first (:125-126), at most six firms (:131), each firm
                  identifies itself (:132), object at any time (:140). No
                  turnaround, no fee, no duration. */}
              <WhatToExpectCard
                title="What happens after you send it"
                items={[
                  "Your enquiry goes to regulated firms in our specialist partner network, so a specialist can answer it.",
                  "Firms are first shown a summary with your name and contact details removed. Only a firm that decides it can help receives your details in full.",
                  "At most six firms may receive your details, and often fewer.",
                  "Whichever firm contacts you will tell you who they are and give you their own privacy information.",
                  "No obligation, every conversation is confidential, and you can ask us to stop at any time.",
                ]}
              />
            </div>

            <div className="border border-neutral-200 bg-white p-6 sm:p-8 lg:p-10">
              <LeadForm submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
