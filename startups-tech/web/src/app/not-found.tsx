import Link from "next/link";
import { btnPrimary, sectionY, siteContainerLg } from "@/components/ui/layout-utils";

export default function NotFound() {
  return (
    <div className={`${siteContainerLg} ${sectionY} text-center`}>
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">Page not found</h1>
      <p className="mt-4 text-base leading-relaxed text-neutral-500">
        The page you requested does not exist or has moved.
      </p>
      <p className="mt-8 flex justify-center">
        <Link href="/" className={`${btnPrimary} w-full max-w-xs sm:w-auto`}>
          Back to homepage
        </Link>
      </p>
    </div>
  );
}
