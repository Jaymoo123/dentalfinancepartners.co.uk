"use client";

/**
 * Loads the third-party tags (GA4, AdSense) by default, unless the visitor has explicitly
 * opted out. The mount guard avoids a server/first-render mismatch and ensures an
 * opted-out visitor never loads them even briefly.
 *
 * D3 (generalist): the GA id is deliberately left empty until the operator
 * decides to wire it. ConsentedScripts renders nothing for an empty/invalid
 * measurementId (GoogleAnalytics guards the format).
 */
import { useEffect, useState } from "react";
import { useConsent } from "./ConsentProvider";
import { GoogleAnalytics } from "./GoogleAnalytics";
import { AdSense } from "./AdSense";

type ConsentedScriptsProps = {
  gaMeasurementId?: string;
  /** AdSense publisher ID. Empty on every site that does not run ads. */
  adsenseClientId?: string;
};

export function ConsentedScripts({ gaMeasurementId = "", adsenseClientId = "" }: ConsentedScriptsProps) {
  const { state } = useConsent();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || state === "denied") return null;
  return (
    <>
      <GoogleAnalytics measurementId={gaMeasurementId} />
      <AdSense clientId={adsenseClientId} />
    </>
  );
}
