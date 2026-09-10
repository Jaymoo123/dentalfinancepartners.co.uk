import type { Metadata } from "next";
import Link from "next/link";
import { siteContainer, btnPrimary } from "@/components/ui/layout-utils";
import { SlimHero } from "@accounting-network/web-shared/design/primitives/SlimHero";
import { NoticeCard } from "@accounting-network/web-shared/design/primitives/NoticeCard";
import { InlineLink } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";

export const metadata: Metadata = {
  title: "Unsubscribed",
  robots: { index: false, follow: false },
};

export default function UnsubscribedPage() {
  return (
    <>
      <SlimHero
        eyebrow="Newsletter"
        title="You&rsquo;re out."
        backdrop={<GeneralistBackdrop />}
      />
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainer}>
          <div className="mx-auto max-w-2xl">
            <NoticeCard tone="slate" ground="slate">
              <p className="text-slate-700">
                You won&rsquo;t hear from the Director&rsquo;s Brief again. If this was a mistake or
                you change your mind, you can{" "}
                <InlineLink href="/newsletter">re-subscribe</InlineLink>.
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
