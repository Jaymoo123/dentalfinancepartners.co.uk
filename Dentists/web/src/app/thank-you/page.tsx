import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, focusRing, sectionY } from "@/components/ui/layout-utils";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your enquiry has been received.",
  robots: { index: false, follow: true },
  twitter: {
    card: "summary",
    title: "Thank you",
    description: "Your enquiry has been received.",
  },
};

export default function ThankYouPage() {
  return (
    <div
      className={`mx-auto w-full max-w-2xl min-w-0 px-4 sm:px-6 lg:px-8 ${sectionY} text-center`}
    >
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">Thank you</h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        Your message is on its way to our team. If your matter is urgent, please call the number listed on the{" "}
        <Link href="/contact" className={`font-medium text-[var(--accent-strong)] underline ${focusRing} rounded`}>
          contact page
        </Link>
        .
      </p>
      <p className="mt-8 flex justify-center">
        <Link href="/blog" className={`${btnPrimary} w-full max-w-xs sm:w-auto`}>
          Read insights on the blog
        </Link>
      </p>
    </div>
  );
}
