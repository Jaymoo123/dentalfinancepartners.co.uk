/**
 * Embed gallery page.
 * noindex — operator reference for finding embed snippets.
 * Lists all tools with their embed snippet for copy-paste.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { EmbedSnippet } from "@accounting-network/web-shared/tools/embed/EmbedSnippet";
import { allTools } from "@/lib/tools/registry";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Embed Gallery | Agency Founder Finance",
};

export default function EmbedGalleryPage() {
  const tools = allTools();
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Embed gallery</h1>
      <p className="mt-2 text-sm text-slate-600">
        Each calculator is available as an iframe embed. Copy the snippet below.
      </p>
      <div className="mt-8 space-y-8">
        {tools.map((t) => (
          <div key={t.slug} className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">{t.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{t.oneLiner}</p>
            <div className="mt-4">
              <EmbedSnippet
                code={`<iframe src="${baseUrl}/embed/${t.slug}" width="100%" height="${t.embedHeight}" style="border:none;overflow:hidden;" loading="lazy" title="${t.name}"></iframe>`}
                label="Copy embed code"
              />
            </div>
            <Link
              href={`/embed/${t.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs text-indigo-600 underline"
            >
              Preview embed
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
