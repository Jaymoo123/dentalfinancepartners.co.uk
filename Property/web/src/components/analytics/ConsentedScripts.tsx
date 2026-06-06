"use client";

/**
 * Loads the third-party tags (GA4 + Microsoft Clarity) by default, unless the
 * visitor has explicitly opted out. The mount guard avoids a server/first-render
 * mismatch and ensures an opted-out visitor never loads them even briefly.
 */
import { useEffect, useState } from "react";
import { useConsent } from "./ConsentProvider";
import { GoogleAnalytics } from "./GoogleAnalytics";
import { Clarity } from "./Clarity";

type ConsentedScriptsProps = {
  gaMeasurementId: string;
  clarityProjectId?: string;
};

export function ConsentedScripts({
  gaMeasurementId,
  clarityProjectId,
}: ConsentedScriptsProps) {
  const { state } = useConsent();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || state === "denied") return null;
  return (
    <>
      <GoogleAnalytics measurementId={gaMeasurementId} />
      <Clarity projectId={clarityProjectId} />
    </>
  );
}
