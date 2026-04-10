import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Thank you | ${siteConfig.name}`,
  description: "Your enquiry has been received.",
  robots: { index: false, follow: true },
  twitter: {
    card: "summary_large_image",
    title: `Thank you | ${siteConfig.name}`,
    description: "Your enquiry has been received.",
  },
};

export default function ThankYouPage() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className={`${siteContainerLg} text-center`}>
        <div className="mx-auto max-w-2xl">
          <div className="inline-block bg-emerald-600 p-6 mb-8">
            <svg className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Thank you</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-700">
            Your message is on its way to our team. We aim to respond within 24 hours, usually same day.
          </p>
          <p className="mt-4 text-base text-slate-600">
            If your matter is urgent, please call the number listed on the{" "}
            <Link href="/contact" className="font-bold text-emerald-700 underline underline-offset-2 hover:text-emerald-600">
              contact page
            </Link>
            .
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/" className={`${btnPrimary} text-base px-8 py-3.5`}>
              Back to home
            </Link>
            <Link href="/blog" className="inline-flex items-center justify-center border-2 border-slate-300 bg-white px-8 py-3.5 text-base font-bold text-slate-900 transition-all hover:border-emerald-600 hover:bg-slate-50">
              Read property tax insights
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
