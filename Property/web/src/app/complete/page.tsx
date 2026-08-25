import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { Eyebrow } from "@/components/ui/page-blocks";
import { NoticeCard } from "@/components/ui/NoticeCard";
import { SlimHero } from "@/components/ui/SlimHero";
import { WhatToExpectCard } from "@/components/property/WhatToExpectCard";
import { verifyLeadToken, mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { computeMissingContact } from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";
import { adminSelect } from "@/lib/supabase/admin";
import DetailsForm from "@/components/forms/DetailsForm";

/**
 * "Complete your details" page, linked from a nurture email as
 * /complete?t=<signed profile token>. A lead who came in without a name and/or a
 * phone (the email-only "Ask a specialist" widget) fills the gap here so we can
 * forward them. The token identifies the lead; the page only ever asks for the
 * field(s) still below floor, never email. Noindexed like /book.
 *
 * On the post-submit skeleton (DESIGN_SYSTEM §4d): `SlimHero`, then one light
 * section carrying the job. The hero is navy and the footer is navy, so the
 * light section below is not optional (§9).
 */

export const metadata: Metadata = {
  title: `Complete your details`,
  description: "Add the last detail we need to arrange your free property tax review.",
  robots: { index: false, follow: false },
};

export default async function CompletePage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const params = await searchParams;
  const token = (params.t ?? "").trim();

  let inner: React.ReactNode;

  if (!token) {
    inner = (
      <NoticeCard>
        <p className="text-base leading-relaxed text-slate-700">
          This page needs the personal link from your email or text message. If you cannot find it,
          use the contact form and we will arrange your review.
        </p>
        <Link href="/contact" className={`${btnPrimary} mt-4`}>
          Go to the contact form
        </Link>
      </NoticeCard>
    );
  } else {
    // verifyLeadToken never throws on a missing or short LEAD_NURTURE_TOKEN_SECRET:
    // it catches getLeadTokenSecret() internally and returns bad-signature, so an
    // unconfigured environment degrades to the card below rather than a 500.
    const verdict = verifyLeadToken(token, "profile");
    if (!verdict.ok) {
      // Expired or otherwise invalid link: same warm fallback, no field grid.
      inner = (
        <NoticeCard>
          <p className="text-base leading-relaxed text-slate-700">
            This link has expired or is not valid. No problem, you can still reach us through the
            contact form and we will arrange your review.
          </p>
          <Link href="/contact" className={`${btnPrimary} mt-4`}>
            Go to the contact form
          </Link>
        </NoticeCard>
      );
    } else {
      // Load the lead and work out which contact field(s) are still missing.
      // A load hiccup is treated as "just fill in your details": the form posts
      // to the API which is the real gate, so we never block a genuine lead.
      let missing: ("name" | "phone")[] = ["name", "phone"];
      let allSet = false;
      try {
        const res = await adminSelect<{ full_name: string | null; phone: string | null }>("leads", {
          select: "full_name,phone",
          id: `eq.${verdict.leadId}`,
          limit: "1",
        });
        const row = res.data[0];
        if (row) {
          const m = computeMissingContact(row);
          if (m.length === 0) allSet = true;
          else missing = m;
        }
      } catch {
        // best-effort: fall through to the form asking for both
      }

      if (allSet) {
        // Nothing left to collect. Offer a booking link (best-effort token mint).
        let bookingToken: string | null = null;
        try {
          bookingToken = mintLeadToken(verdict.leadId, "book");
        } catch {
          bookingToken = null;
        }
        inner = (
          <NoticeCard tone="emerald" title="You are all set">
            <p className="text-base leading-relaxed text-slate-700">
              We have everything we need. A property tax specialist will be in touch shortly. If you
              would like to pick a time that suits you, you can book a callback below.
            </p>
            {bookingToken && (
              <Link href={`/book?t=${bookingToken}`} className={`${btnPrimary} mt-4`}>
                Book a callback
              </Link>
            )}
          </NoticeCard>
        );
      } else {
        inner = <DetailsForm token={token} missing={missing} />;
      }
    }
  }

  return (
    <>
      <SlimHero eyebrow="Almost there" title="Complete your details">
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
          Add the last detail we need and a property tax specialist will be in touch to arrange your
          free review, no obligation.
        </p>
      </SlimHero>

      {/* Two columns, the /contact anatomy: the ask in the wide column and the
          reassurance beside it rather than below the fold. This is also what
          lets the section use the full container honestly. A lone `max-w-2xl`
          form under a full-width heading was the first attempt and it left half
          the container empty, which is the clamp §0.1 exists to stop. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>One field left</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Where should we call you
            </h2>
          </div>
          <div className="mt-8 grid gap-8 sm:mt-10 sm:gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div>{inner}</div>

            <div className="space-y-6">
              {/* The objection on this page is "why do you need my number".
                  Answering it beside the field converts better than a privacy
                  line under the button, which is where it used to live alone.

                  Every line here is checked against /privacy-policy §5 and §7.
                  A first draft promised "we never pass your details on without
                  telling you first" and "no marketing list", and BOTH are false:
                  §5 discloses that up to six firms may receive an enquiry, three
                  accountancy or tax and three in related professions. Reassurance
                  copy on a data-capture form is the last place to write something
                  the privacy policy contradicts. */}
              <WhatToExpectCard
                title="Why we are asking"
                items={[
                  "We cannot arrange a callback without a number to ring",
                  "One call, at a time you choose, about twenty minutes",
                  "You can tell us to stop at any time, from any message",
                  "Clear recommendations with no obligation",
                ]}
              />
              <p className="text-sm leading-relaxed text-slate-600">
                Who receives your enquiry, and what we share, is set out in our{" "}
                <Link href="/privacy-policy" className="font-semibold text-emerald-700 underline">
                  privacy policy
                </Link>
                . Would rather just talk to someone?{" "}
                <Link href="/contact" className="font-semibold text-emerald-700 underline">
                  Use the contact form
                </Link>{" "}
                and we will pick your enquiry up from there. Nothing you have already told us is
                lost.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
