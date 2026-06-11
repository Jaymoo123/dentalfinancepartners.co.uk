import { siteContainerLg } from "@/components/ui/layout-utils";
import { EmbedSnippet } from "@accounting-network/web-shared/tools/embed/EmbedSnippet";
import { allTools } from "@/lib/tools/registry";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Embed Law Firm Calculators | Aflinity Law Finance Partners",
  robots: { index: false },
};

const origin = siteConfig.url.replace(/\/$/, "");

function iframeSnippet(slug: string, height: number) {
  return `<iframe
  src="${origin}/embed/${slug}"
  width="100%"
  height="${height}"
  frameborder="0"
  scrolling="no"
  title="Law firm calculator"
></iframe>
<script>
window.addEventListener("message", function(e) {
  if (e.data && e.data.type === "afl-embed-height" && typeof e.data.height === "number") {
    var frames = document.getElementsByTagName("iframe");
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].contentWindow === e.source) {
        frames[i].height = e.data.height;
        break;
      }
    }
  }
});
</script>`;
}

export default function EmbedGalleryPage() {
  const tools = allTools().filter((t) => t.kind === "generic");

  return (
    <div className="min-h-screen bg-[var(--surface)] py-12">
      <div className={siteContainerLg}>
        <h1 className="font-serif text-3xl font-semibold text-[var(--ink)]">
          Calculator embed gallery
        </h1>
        <p className="mt-3 text-[var(--ink-soft)]">
          Copy the snippet for any calculator to embed it on your site. Embeds auto-resize via{" "}
          <code className="rounded bg-[var(--surface-elevated)] px-1 text-sm">postMessage</code>.
        </p>

        <div className="mt-10 space-y-12">
          {tools.map((tool) => (
            <section key={tool.slug}>
              <h2 className="mb-4 font-serif text-xl font-semibold text-[var(--ink)]">
                {tool.name}
              </h2>
              <EmbedSnippet code={iframeSnippet(tool.slug, tool.embedHeight)} />
              <div className="mt-6 border border-[var(--border)] bg-white">
                <iframe
                  src={`/embed/${tool.slug}`}
                  width="100%"
                  height={tool.embedHeight}
                  frameBorder="0"
                  scrolling="no"
                  title={`${tool.name} preview`}
                />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
