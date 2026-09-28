import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, btnGold, siteContainerLg, sectionY } from "@/components/ui/layout-utils";
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
 */

export const metadata: Metadata = {
  title: "Complete your details",
  description: "Add the last detail we need to arrange your free dental practice finance review.",
  robots: { index: false, follow: false },
};

/** Shared card shell for the two "we cannot use this link" states and the all-set state. */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center sm:p-8">
      {children}
    </div>
  );
}

/** Shared "needs the personal link" fallback, cloned from /book. */
function NeedsLinkCard() {
  return (
    <Card>
      <p className="text-base leading-relaxed text-[var(--muted)]">
        This page needs the personal link from your email or text message. If you cannot find it,
        use the contact form and we will arrange your review.
      </p>
      <Link href="/contact" className={`${btnPrimary} mt-6`}>
        Go to the contact form
      </Link>
    </Card>
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
        <Card>
          <p className="text-base leading-relaxed text-[var(--muted)]">
            This link has expired or is not valid. No problem, you can still reach us through the
            contact form and we will arrange your review.
          </p>
          <Link href="/contact" className={`${btnPrimary} mt-6`}>
            Go to the contact form
          </Link>
        </Card>
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
        // best-effort: fall through to form asking for both
      }

      if (allSet) {
        let bookingToken: string | null = null;
        try {
          bookingToken = mintLeadToken(verdict.leadId, "book");
        } catch {
          bookingToken = null;
        }
        inner = (
          // Confirmation state gets the navy ground, so the gold CTA is the sanctioned
          // 6.23 pairing rather than 2.75 gold-on-white.
          <div className="rounded-2xl bg-[var(--navy)] p-6 text-center sm:p-8">
            <p className="text-lg font-semibold text-white">You are all set</p>
            <p className="mt-3 text-base leading-relaxed text-white/85">
              We have everything we need. A specialist firm from our partner network may contact you
              directly about your enquiry. If you would like to pick a time that suits you, you can
              book a callback below.
            </p>
            {bookingToken && (
              <Link href={`/book?t=${bookingToken}`} className={`${btnGold} mt-6`}>
                Book a callback
              </Link>
            )}
          </div>
        );
      } else {
        inner = (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <DetailsForm token={token} missing={missing} />
          </div>
        );
      }
    }
  }

  return (
    <section className="bg-[var(--background)]">
      <div className={`${siteContainerLg} ${sectionY}`}>
        <div className="mx-auto max-w-2xl">
          <h1 className="text-center font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
            Complete your details
          </h1>
          <p className="mt-4 text-center text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Add the last detail we need and a specialist firm from our partner network will be in
            touch to arrange your free dental practice finance review, no obligation.
          </p>
          <div className="mt-10">{inner}</div>
        </div>
      </div>
    </section>
  );
}
