import Script from "next/script";

type AdSenseProps = {
  /** AdSense publisher ID, e.g. "ca-pub-3756285576371279". */
  clientId: string;
};

/**
 * Google AdSense Auto ads loader.
 *
 * Auto ads means Google decides placement itself, so there is no per-page slot
 * markup anywhere in the estate. Mounted through ConsentedScripts alongside GA4,
 * so an opted-out visitor never loads it (AN-01 opt-out posture).
 *
 * The site's CSP must be built with `ads: true` or every ad iframe is refused by
 * frame-src 'none'. See packages/web-shared/lib/security-headers.ts.
 */
export function AdSense({ clientId }: AdSenseProps) {
  if (!clientId || !/^ca-pub-\d{10,}$/.test(clientId)) return null;

  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
