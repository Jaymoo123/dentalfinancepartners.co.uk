import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { verifyLeadToken, mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { computeMissingContact } from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";
import { adminSelect } from "@/lib/supabase/admin";
import DetailsForm from "@/components/forms/DetailsForm";

export const metadata: Metadata = {
  title: `Complete your details | ${siteConfig.name}`,
  description: "Add the last detail we need to arrange your free CIS tax review.",
  robots: { index: false, follow: false },
};

function NeedsLinkCard() {
  return (
    <div className="border border-neutral-200 bg-neutral-50 p-6 text-center">
      <p className="text-base text-slate-700">
        This page needs the personal link from your email or text message. If you cannot find it,
        use the contact form and we will arrange your review.
      </p>
      <Link href="/contact" className={`${btnPrimary} mt-4 text-base`}>
        Go to the contact form
      </Link>
    </div>
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
        <div className="border border-neutral-200 bg-neutral-50 p-6 text-center">
          <p className="text-base text-slate-700">
            This link has expired or is not valid. No problem, you can still reach us through the
            contact form and we will arrange your review.
          </p>
          <Link href="/contact" className={`${btnPrimary} mt-4 text-base`}>
            Go to the contact form
          </Link>
        </div>
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
          <div className="border border-orange-200 bg-orange-50 p-6 text-center">
            <p className="text-lg font-bold text-slate-900">You are all set</p>
            <p className="mt-2 text-base text-slate-700">
              We have everything we need. A specialist will be in touch shortly. If you would like
              to pick a time that suits you, you can book a callback below.
            </p>
            {bookingToken && (
              <Link href={`/book?t=${bookingToken}`} className={`${btnPrimary} mt-4 text-base`}>
                Book a callback
              </Link>
            )}
          </div>
        );
      } else {
        inner = <DetailsForm token={token} missing={missing} />;
      }
    }
  }

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className={siteContainerLg}>
        <div className="mx-auto max-w-2xl">
          <h1 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            Complete your details
          </h1>
          <p className="mt-4 text-center text-lg leading-relaxed text-slate-700">
            Add the last detail we need and a specialist will be in touch to arrange your free
            CIS review, no obligation.
          </p>
          <div className="mt-10">{inner}</div>
        </div>
      </div>
    </section>
  );
}
