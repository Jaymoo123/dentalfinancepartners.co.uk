import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { WhatToExpectCard } from "@accounting-network/web-shared/design/marketing/WhatToExpectCard";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { verifyLeadToken, mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { computeMissingContact } from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";
import { adminSelect } from "@/lib/supabase/admin";
import DetailsForm from "@/components/forms/DetailsForm";

/**
 * "Complete your details" page, linked from a nurture email as
 * /complete?t=<signed profile token>. A lead who came in without a name and/or a
 * phone fills the gap here so we can call them. The token identifies the lead;
 * the page only ever asks for the field(s) still below floor, never email.
 * Noindexed like /book.
 *
 * Post-submit skeleton: SlimHero, then one light section carrying the job. The
 * hero is navy and the footer is navy, so the light section is not optional.
 */

export const metadata: Metadata = {
  title: `Complete your details`,
  description: "Add the last detail we need to arrange your free accounting review.",
  robots: { index: false, follow: false },
};

/** Shared "needs the personal link" fallback. */
function NeedsLinkCard() {
  return (
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
}

export default async function CompletePage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const params = await searchParams;
  const token = (params.t ?? "").trim();

  let inner: React.ReactNode;

  if (!token) {
    inner = <NeedsLinkCard />;
  } else {
    const verdict = verifyLeadToken(token, "profile");
    if (!verdict.ok) {
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
          /* tone="primary" is correct here: this is the good outcome the reader
             wanted. The duty and penalty ramp is the family that must never be
             brand orange, not this one. */
          <NoticeCard tone="primary" title="You are all set">
            <p className="text-base leading-relaxed text-slate-700">
              We have everything we need. A specialist firm from our partner network may contact
              you directly about your enquiry. If you would like to pick a time that suits you,
              you can book a callback below.
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
      <SlimHero
        eyebrow="Almost there"
        title="Complete your details"
        backdrop={<GeneralistBackdrop />}
      >
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
          Add the last detail we need and a specialist firm from our partner network will be in
          touch to arrange your free review, no obligation.
        </p>
      </SlimHero>

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
                  Every line is checked against /privacy-policy §5 and §7: §5
                  discloses that an enquiry is shared with regulated firms from
                  the specialist partner network, up to three in the profession
                  concerned plus up to three in related professions, so at most
                  six, each an independent controller. Nothing here may promise
                  otherwise. */}
              <WhatToExpectCard
                title="Why we are asking"
                items={[
                  "We cannot arrange a callback without a number to ring",
                  "One call, at a time you choose, about twenty minutes",
                  "Your enquiry goes to regulated firms in our partner network, up to six of them",
                  "You can object or ask us to stop at any time, from any message",
                ]}
              />
              <p className="text-sm leading-relaxed text-slate-600">
                Who receives your enquiry, and what we share, is set out in our{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800"
                >
                  privacy policy
                </Link>
                . Would rather just talk to someone?{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800"
                >
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
