"use client";

/**
 * Trade Tax Specialists analytics provider wrapper. Composes the shared SDK
 * AnalyticsProvider with the CIS-specific deriveTopic function. This thin
 * client-component wrapper exists solely to satisfy the RSC boundary: functions
 * cannot be passed from a Server Component (layout.tsx) to a Client Component
 * as props, so deriveTopic is imported here (client bundle) and injected into
 * the shared provider.
 *
 * storagePrefix "bfp" is FROZEN: continuity for returning visitors.
 * posture "opt-out": track by default under legitimate interest.
 * noTrackPrefixes: analytics suppressed on /admin and /embed routes.
 */
import { AnalyticsProvider as SharedAnalyticsProvider } from "@accounting-network/web-shared/analytics/react/AnalyticsProvider";
import { deriveTopic } from "@/lib/intent/deriveTopic";

type Props = {
  siteKey: string;
  siteName: string;
  children: React.ReactNode;
};

export function AnalyticsProvider({ siteKey, siteName, children }: Props) {
  return (
    <SharedAnalyticsProvider
      siteKey={siteKey}
      siteName={siteName}
      storagePrefix="bfp"
      posture="opt-out"
      noTrackPrefixes={["/admin", "/embed"]}
      deriveTopic={deriveTopic}
    >
      {children}
    </SharedAnalyticsProvider>
  );
}
