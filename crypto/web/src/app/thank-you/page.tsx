import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
        Thanks, your enquiry is on its way.
      </h1>
      <p className="mt-4 text-neutral-600">We&apos;ll come back to you within 24 hours.</p>
      <Link href="/" className="mt-8 inline-block font-medium underline">
        Back to the homepage
      </Link>
    </main>
  );
}
