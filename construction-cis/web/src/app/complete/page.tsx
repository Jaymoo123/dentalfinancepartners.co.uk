import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { NoticeCard } from "@/components/ui/NoticeCard";
import { WhatToExpectCard } from "@/components/ui/WhatToExpectCard";
import { verifyLeadToken, mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { computeMissingContact } from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";
import { adminSelect } from "@/lib/supabase/admin";
import DetailsForm from "@/components/forms/DetailsForm";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";

/**
 * "Complete your details", linked from a nurture email as
 * /complete?t=<signed profile token>. A lead who came in without a name and/or a
 * phone fills the gap here so we can forward them. The token identifies the
 * lead; the page only ever asks for the field(s) still below floor, never email.
 *
 * Same post-submit skeleton as /book (F.6), and the "needs the personal link"
 * card is now the shared NoticeCard rather than the hand-copy of /book's that
 * had already drifted to a different border weight.
 */

export const metadata: Metadata = {
  title: `Complete your details`,
  description: "Add the last detail we need to arrange your free CIS tax review.",
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
        let bookingToken: string | null = null;
        try {
          bookingToken = mintLeadToken(verdict.leadId, "book");
        } catch {
          bookingToken = null;
        }
        inner = (
          <NoticeCard tone="accent" title="You are all set">
            <p className="text-base leading-relaxed text-slate-700">
              We have everything we need. A specialist from our partner network will be in touch. If
              you would like to pick a time that suits you, you can book a callback below.
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
      <section className="bg-[var(--hero-cream)] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Almost there</Eyebrow>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Complete your details
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Add the last detail we need and a specialist from our partner network will be in touch
              to arrange your free CIS review, no obligation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>One field left</Eyebrow>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Where should we call you
            </h2>
          </div>
          <div className="mt-8 grid gap-8 sm:mt-10 sm:gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div>{inner}</div>

            <div className="space-y-6">
              {/* The objection on this page is "why do you need my number", and
                  answering it beside the field converts better than a line under
                  the button. Every item is checked against /privacy-policy
                  section 5: no exclusivity claim, no turnaround, no fee. */}
              <WhatToExpectCard
                title="Why we are asking"
                items={[
                  "We cannot arrange a callback without a number to ring",
                  "One call, in a window you choose, about twenty minutes",
                  "A regulated firm from our specialist partner network makes it",
                  "You can tell us to stop at any time, from any message",
                ]}
              />
              <p className="text-sm leading-relaxed text-neutral-600">
                Who receives your enquiry, and what we share, is set out in our{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-[var(--accent-strong)] underline underline-offset-4"
                >
                  privacy policy
                </Link>
                . Would rather just talk to someone?{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-[var(--accent-strong)] underline underline-offset-4"
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
