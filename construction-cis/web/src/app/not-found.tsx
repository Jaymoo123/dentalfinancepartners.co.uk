import Link from "next/link";
import { btnPrimary, siteContainerLg } from "@/components/ui/layout-utils";

export default function NotFound() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className={siteContainerLg}>
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Page not found.</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/" className={btnPrimary}>Go to homepage</Link>
          <Link href="/blog" className="inline-flex min-h-12 items-center text-sm font-medium text-neutral-700 underline decoration-orange-500 underline-offset-4 hover:text-neutral-900">
            Browse CIS guides
          </Link>
        </div>
      </div>
    </section>
  );
}
