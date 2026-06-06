"use client";

/**
 * Microsoft Clarity (session replays + heatmaps) — the qualitative layer that
 * complements the first-party Supabase system of record. Loaded only after
 * consent (rendered by ConsentedScripts) and only when a project id is set via
 * NEXT_PUBLIC_CLARITY_ID, so it is a no-op until configured.
 */
import Script from "next/script";

export function Clarity({ projectId }: { projectId?: string }) {
  if (!projectId) return null;
  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `}
    </Script>
  );
}
