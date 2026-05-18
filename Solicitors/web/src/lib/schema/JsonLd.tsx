import * as React from "react";
import { serialize } from "./serialize";
import type { SchemaThing } from "./types";

/**
 * Drop-in React component for embedding JSON-LD.
 *
 *   <JsonLd data={buildService(...)} />
 *   <JsonLd data={[breadcrumb, article, faqPage]} />
 */
export function JsonLd({ data }: { data: SchemaThing | SchemaThing[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}
