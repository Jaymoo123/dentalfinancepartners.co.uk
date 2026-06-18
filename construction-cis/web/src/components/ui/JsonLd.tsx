/** Renders a JSON-LD script tag for structured data. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: typeof data === "string" ? data : JSON.stringify(data),
      }}
    />
  );
}
