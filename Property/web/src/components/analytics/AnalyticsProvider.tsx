"use client";

/**
 * Property analytics provider wrapper. Composes the shared SDK AnalyticsProvider
 * with Property's own deriveTopic function. This thin client-component wrapper
 * exists solely to satisfy the RSC boundary: functions cannot be passed from a
 * Server Component (layout.tsx) to a Client Component as props, so deriveTopic
 * is imported here (client bundle) and injected into the shared provider.
 *
 * storagePrefix "ptp" is FROZEN: continuity for returning visitors.
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
      storagePrefix="ptp"
      posture="opt-out"
      noTrackPrefixes={["/embed", "/admin"]}
      deriveTopic={deriveTopic}
    >
      {children}
    </SharedAnalyticsProvider>
  );
}
