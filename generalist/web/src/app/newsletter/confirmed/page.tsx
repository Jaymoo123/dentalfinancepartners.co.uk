import type { Metadata } from "next";
import Link from "next/link";
import { siteContainer, btnPrimary } from "@/components/ui/layout-utils";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";

export const metadata: Metadata = {
  title: "Subscription confirmed | Holloway Davies",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ error?: string }> };

export default async function ConfirmedPage({ searchParams }: Props) {
  const { error } = await searchParams;

  if (error) {
    const message =
      error === "expired"
        ? "That confirmation link has expired. Please subscribe again."
        : error === "bad-signature" || error === "malformed"
          ? "That confirmation link looks invalid. Please subscribe again."
          : "Something went wrong confirming your subscription.";
    return (
      <>
        <SlimHero
          eyebrow="Newsletter"
          title="We couldn&rsquo;t confirm"
          backdrop={<GeneralistBackdrop />}
        />
        <section className="bg-slate-50 py-12 sm:py-16">
          <div className={siteContainer}>
            <div className="mx-auto max-w-2xl">
              <NoticeCard tone="slate" ground="slate">
                <p className="text-slate-700">{message}</p>
                <Link href="/newsletter" className={`${btnPrimary} mt-6`}>
                  Subscribe again
                </Link>
              </NoticeCard>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SlimHero
        eyebrow="Newsletter"
        title="You&rsquo;re in."
        backdrop={<GeneralistBackdrop />}
      />
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainer}>
          <div className="mx-auto max-w-2xl">
            <NoticeCard tone="primary" ground="slate" title="Subscription confirmed">
              <p className="text-slate-700">
                Welcome to the Director&rsquo;s Brief. The first email lands in your inbox in about a
                minute. After that, expect Thursday morning emails.
              </p>
              <p className="mt-2 text-slate-700">
                If it doesn&rsquo;t show, check your spam or promotions folder and mark it as not spam.
              </p>
              <Link href="/" className={`${btnPrimary} mt-8`}>
                Back to the site
              </Link>
            </NoticeCard>
          </div>
        </div>
      </section>
    </>
  );
}
