import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-paper">
      <span
        aria-hidden
        className="ghost-numeral absolute right-[-0.05em] top-1/2 -translate-y-1/2 text-[38vw] md:text-[26rem]"
      >
        404
      </span>
      <div className="relative mx-auto w-full max-w-5xl px-6">
        <p className="type-eyebrow">Error 404</p>
        <h1 className="type-h1 mt-4">This page does not exist</h1>
        <p className="type-lead measure mt-5">
          The address may have changed, or it was never here. Everything on this
          site is reachable from the home page.
        </p>
        <div className="mt-8">
          <Button variant="primary" size="md" href="/">
            Back to the home page
          </Button>
        </div>
      </div>
    </section>
  );
}
