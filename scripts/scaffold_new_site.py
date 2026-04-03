"""
Scaffold a new niche accountancy site from an existing reference site.

Copies the Dentists site (most standardized template), then replaces all
brand-specific values with the new niche's configuration.

Usage:
    python scripts/scaffold_new_site.py \
        --niche-id veterinary \
        --display-name "Veterinary Accountants UK" \
        --domain "veterinaryaccountantsuk.co.uk" \
        --primary-color "#2563eb" \
        --categories "Practice Accounting,Associate Tax,Buying a Practice,VAT & Compliance" \
        --locations "london,manchester,birmingham,leeds,bristol" \
        --url-style nested

    # For flat URLs (like Medical):
    python scripts/scaffold_new_site.py \
        --niche-id pharmacy \
        --display-name "Pharmacy Accountants UK" \
        --domain "pharmacyaccountantsuk.co.uk" \
        --primary-color "#7c3aed" \
        --categories "Pharmacy Tax,NHS Contracts,Buying a Pharmacy" \
        --url-style flat
"""
import argparse
import json
import os
import re
import shutil
import sys


PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
REFERENCE_SITE = "Dentists"


def slugify(text):
    """Convert text to URL-safe slug, replacing & with and."""
    return re.sub(
        r'-+', '-',
        re.sub(r'[^a-z0-9\s-]', '', text.lower().replace('&', 'and').replace('(', '').replace(')', ''))
    ).strip().replace(' ', '-').strip('-')


def create_site_directory(niche_id: str) -> str:
    """Create the new site directory by copying the reference site."""
    source = os.path.join(PROJECT_ROOT, REFERENCE_SITE)
    target = os.path.join(PROJECT_ROOT, niche_id.capitalize())

    if os.path.exists(target):
        print(f"ERROR: Directory {target} already exists.")
        sys.exit(1)

    print(f"Copying {REFERENCE_SITE}/ -> {niche_id.capitalize()}/")
    shutil.copytree(source, target, ignore=shutil.ignore_patterns(
        'node_modules', '.next', '.vercel', '__pycache__', '*.pyc',
    ))
    return target


def update_niche_config(target_dir: str, args):
    """Rewrite niche.config.json with new niche values."""
    config_path = os.path.join(target_dir, "niche.config.json")
    with open(config_path, "r", encoding="utf-8") as f:
        config = json.load(f)

    categories = [c.strip() for c in args.categories.split(",")]
    locations = [loc.strip() for loc in args.locations.split(",")]
    location_objects = [{"slug": loc, "title": f"{loc.capitalize()} {args.display_name}"} for loc in locations]

    config["niche_id"] = args.niche_id
    config["display_name"] = args.display_name
    config["legal_name"] = args.display_name
    config["domain"] = args.domain
    config["tagline"] = f"Specialist accountants for {args.niche_id} professionals"
    config["description"] = f"{args.display_name} provides specialist accounting, tax, and advisory services."
    config["brand"]["primary_color"] = args.primary_color
    config["contact"]["email"] = f"info@{args.domain}"
    config["locations"] = location_objects
    config["content_strategy"]["audience"] = f"UK {args.niche_id} professionals"
    config["content_strategy"]["categories"] = categories
    config["content_strategy"]["supabase_table"] = f"blog_topics_{args.niche_id}"
    config["content_strategy"]["source_identifier"] = args.niche_id
    config["seo"]["google_site_verification"] = ""
    config["lead_form"]["role_label"] = f"Your role in {args.niche_id}"
    config["lead_form"]["role_options"] = [f"{args.niche_id.capitalize()} professional", "Practice owner", "Other"]

    with open(config_path, "w", encoding="utf-8") as f:
        json.dump(config, f, indent=2, ensure_ascii=False)
    print(f"  Updated niche.config.json")


def update_pipeline(target_dir: str, args):
    """Generate pipeline/config_supabase.py and update generate_blog_supabase.py."""
    pipeline_dir = os.path.join(target_dir, "pipeline")
    categories = [c.strip() for c in args.categories.split(",")]

    config_content = f'''"""
Configuration for {args.display_name} blog generation using Anthropic + Supabase.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

OUTPUT_MD_DIR = os.path.join(os.path.dirname(__file__), "..", "web", "content", "blog")

SITE_BASE_URL = "https://{args.domain}"
AUTHOR_NAME = "{args.display_name} Editorial Team"

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")

POST_CATEGORIES = {json.dumps(categories, indent=4)}

INTERNAL_LINK_SLUGS = [
    "/services",
    "/about",
    "/contact",
]


def get_relevant_audience_link(topic: str) -> str:
    """Map blog topic to the most relevant audience page."""
    return "/services"


BLOG_SYSTEM_PROMPT = """You are a specialist UK {args.niche_id} accountant writing blog content for {args.display_name}.

AUDIENCE: UK {args.niche_id} professionals.

TONE:
- Direct, professional, no fluff.
- Plain English — avoid jargon unless it is standard in the {args.niche_id} sector.
- Practical and grounded — not promotional or over-confident.
- Write as if you are explaining something to a colleague who knows {args.niche_id} but not accounting.

CONTENT STRUCTURE:
- Use <h2> for main sections, <h3> for subsections if needed.
- Use <p> for paragraphs, <ul>/<li> for lists, <strong> for emphasis.
- NO markdown — output raw HTML only.
- Keep paragraphs short (2-4 sentences).
- Use real examples where helpful.

INTERNAL LINKING:
- Link naturally to relevant pages when the context supports it.
- Use <a href="/page-slug">anchor text</a> format.
- Do not force links — only add them where they genuinely help the reader.

SEO:
- Use the primary keyword naturally 7-10 times (if the content supports it).
- Use secondary keywords 4-5 times each (where relevant).
- Write for humans first — keyword density is secondary to clarity.

COMPLIANCE:
- All tax/legal statements should be framed as general guidance, not personal advice.
- Use "typically", "often", "in most cases" where appropriate.
- Suggest readers "speak to a specialist" or "get advice" for specific situations.

OUTPUT FORMAT:
Return the following fields exactly as shown:

==name==
[Article title for listings]

==slug==
[URL-safe slug]

==category==
[One of: {", ".join(categories)}]

==h1==
[Page heading]

==meta-title==
[SEO title, 50-60 chars]

==meta-description==
[SEO description, 140-160 chars]

==3-liner==
[Short summary for cards/listings, 1-2 sentences]

==alt-tag==
[Image alt text if an image were used]

==image-prompt==
[DALL-E prompt for a relevant image — professional, UK {args.niche_id} context]

==content==
[Full HTML article body — structured with <h2>, <p>, <ul>, etc.]

==FAQ1==
[First FAQ question]

==FAA1==
[First FAQ answer]

==FAQ2==
[Second FAQ question]

==FAA2==
[Second FAQ answer]

==FAQ3==
[Third FAQ question]

==FAA3==
[Third FAQ answer]

==FAQ4==
[Fourth FAQ question]

==FAA4==
[Fourth FAQ answer]
"""
'''

    with open(os.path.join(pipeline_dir, "config_supabase.py"), "w", encoding="utf-8") as f:
        f.write(config_content)
    print(f"  Generated pipeline/config_supabase.py")

    # Update generate_blog_supabase.py table name and URL pattern
    gen_path = os.path.join(pipeline_dir, "generate_blog_supabase.py")
    if os.path.exists(gen_path):
        with open(gen_path, "r", encoding="utf-8") as f:
            gen_content = f.read()

        # Replace Dentists-specific table name
        gen_content = gen_content.replace("blog_topics_dentists", f"blog_topics_{args.niche_id}")
        gen_content = gen_content.replace("blog_topics_property", f"blog_topics_{args.niche_id}")

        # Replace audience line in user prompt
        gen_content = gen_content.replace(
            "Generate a comprehensive blog post for UK dentists.",
            f"Generate a comprehensive blog post for UK {args.niche_id} professionals."
        )

        if args.url_style == "flat":
            # For flat URLs, canonical is /blog/{slug} with no category
            gen_content = gen_content.replace(
                'canonical = f"{SITE_BASE_URL}/blog/{category_slug}/{slug}"',
                'canonical = f"{SITE_BASE_URL}/blog/{slug}"'
            )

        with open(gen_path, "w", encoding="utf-8") as f:
            f.write(gen_content)
        print(f"  Updated pipeline/generate_blog_supabase.py")


def update_blog_content(target_dir: str, args):
    """Clear existing blog posts (they belong to the reference site)."""
    blog_dir = os.path.join(target_dir, "web", "content", "blog")
    if os.path.exists(blog_dir):
        for f in os.listdir(blog_dir):
            if f.endswith(".md"):
                os.remove(os.path.join(blog_dir, f))
        print(f"  Cleared {blog_dir}/ (reference site posts removed)")


def update_globals_css(target_dir: str, args):
    """Update CSS variables with new brand color."""
    css_path = os.path.join(target_dir, "web", "src", "app", "globals.css")
    if not os.path.exists(css_path):
        print(f"  SKIP: globals.css not found")
        return

    with open(css_path, "r", encoding="utf-8") as f:
        css = f.read()

    # Replace primary color CSS variable value
    css = re.sub(r'(--primary:\s*)#[0-9a-fA-F]{3,8}', f'\\1{args.primary_color}', css)

    with open(css_path, "w", encoding="utf-8") as f:
        f.write(css)
    print(f"  Updated globals.css primary color")


def update_env_example(target_dir: str, args):
    """Create .env.local.example with correct domain."""
    env_path = os.path.join(target_dir, "web", ".env.local.example")
    content = f"""NEXT_PUBLIC_SITE_URL=https://{args.domain}
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
"""
    with open(env_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  Created .env.local.example")


def update_package_json(target_dir: str, args):
    """Update package.json name field."""
    pkg_path = os.path.join(target_dir, "web", "package.json")
    if os.path.exists(pkg_path):
        with open(pkg_path, "r", encoding="utf-8") as f:
            pkg = json.load(f)
        pkg["name"] = f"{args.niche_id}-web"
        with open(pkg_path, "w", encoding="utf-8") as f:
            json.dump(pkg, f, indent=2, ensure_ascii=False)
        print(f"  Updated package.json name")


def create_hub_page_stubs(target_dir: str, args):
    """Create empty category hub page directories."""
    categories = [c.strip() for c in args.categories.split(",")]
    blog_app_dir = os.path.join(target_dir, "web", "src", "app", "blog")

    # Remove existing Dentists hub pages
    for item in os.listdir(blog_app_dir):
        item_path = os.path.join(blog_app_dir, item)
        if os.path.isdir(item_path) and item not in ("[category]", "[slug]"):
            shutil.rmtree(item_path)

    for cat in categories:
        cat_slug = slugify(cat)
        hub_dir = os.path.join(blog_app_dir, cat_slug)
        os.makedirs(hub_dir, exist_ok=True)

        hub_content = f'''import {{ Metadata }} from "next";
import {{ getAllPosts, slugifyCategory }} from "@/lib/blog";
import {{ siteConfig }} from "@/config/site";
import Link from "next/link";
import {{ Breadcrumb }} from "@/components/ui/Breadcrumb";
import {{ siteContainer }} from "@/components/ui/layout-utils";

const CATEGORY_NAME = "{cat}";
const CATEGORY_SLUG = "{cat_slug}";

export const metadata: Metadata = {{
  title: `${{CATEGORY_NAME}} | ${{siteConfig.name}}`,
  description: `Expert guidance on ${{CATEGORY_NAME.toLowerCase()}} for UK {args.niche_id} professionals. Practical advice from specialist accountants.`,
  alternates: {{ canonical: `${{siteConfig.url}}/blog/${{CATEGORY_SLUG}}` }},
  openGraph: {{
    title: `${{CATEGORY_NAME}} | ${{siteConfig.name}}`,
    description: `Expert guidance on ${{CATEGORY_NAME.toLowerCase()}} for UK {args.niche_id} professionals.`,
    url: `${{siteConfig.url}}/blog/${{CATEGORY_SLUG}}`,
    siteName: siteConfig.name,
    type: "website",
  }},
  twitter: {{ card: "summary_large_image" }},
}};

export default function {cat_slug.replace("-", "_").title().replace("_", "")}HubPage() {{
  const allPosts = getAllPosts();
  const posts = allPosts.filter(
    (p) => slugifyCategory(p.category) === CATEGORY_SLUG
  );

  return (
    <main className={{siteContainer}}>
      <Breadcrumb
        items={{[
          {{ label: "Blog", href: "/blog" }},
          {{ label: CATEGORY_NAME }},
        ]}}
      />
      <h1 className="text-3xl font-bold mt-6 mb-4">{{CATEGORY_NAME}}</h1>
      <p className="text-lg text-[var(--ink-soft)] mb-8">
        Expert guidance on {{CATEGORY_NAME.toLowerCase()}} for UK {args.niche_id} professionals.
      </p>

      {{/* TODO: Add rich pillar content (4-5 H2 sections) for SEO */}}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {{posts.map((post) => (
          <Link
            key={{post.slug}}
            href={{`/blog/${{CATEGORY_SLUG}}/${{post.slug}}`}}
            className="block p-6 border border-[var(--border)] rounded-lg hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold mb-2">{{post.title}}</h2>
            <p className="text-sm text-[var(--ink-soft)]">{{post.summary}}</p>
          </Link>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{
          __html: JSON.stringify({{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: CATEGORY_NAME,
            url: `${{siteConfig.url}}/blog/${{CATEGORY_SLUG}}`,
            description: metadata.description,
          }}),
        }}}}
      />
    </main>
  );
}}
'''
        with open(os.path.join(hub_dir, "page.tsx"), "w", encoding="utf-8") as f:
            f.write(hub_content)

    print(f"  Created {len(categories)} hub page stubs in src/app/blog/")


def update_url_style(target_dir: str, args):
    """If flat URL style requested, restructure blog routing."""
    if args.url_style != "flat":
        return

    blog_app_dir = os.path.join(target_dir, "web", "src", "app", "blog")

    # For flat URLs: rename [category]/[slug] -> [slug]
    nested_dir = os.path.join(blog_app_dir, "[category]", "[slug]")
    flat_dir = os.path.join(blog_app_dir, "[slug]")

    if os.path.exists(nested_dir) and not os.path.exists(flat_dir):
        shutil.copytree(nested_dir, flat_dir)
        shutil.rmtree(os.path.join(blog_app_dir, "[category]"))
        print(f"  Converted to flat URL structure: /blog/[slug]/")

        # Update the page.tsx to remove category from params/routing
        page_path = os.path.join(flat_dir, "page.tsx")
        if os.path.exists(page_path):
            with open(page_path, "r", encoding="utf-8") as f:
                content = f.read()
            content = content.replace(
                'params: { category: string; slug: string }',
                'params: { slug: string }'
            )
            with open(page_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"  NOTE: {page_path} needs manual review for flat URL routing")


def print_post_scaffold_checklist(args):
    """Print checklist of manual steps needed after scaffolding."""
    site_dir = args.niche_id.capitalize()
    print(f"\n{'=' * 70}")
    print(f"SCAFFOLD COMPLETE: {site_dir}/")
    print(f"{'=' * 70}")
    print(f"\nAutomated:")
    print(f"  [x] Site directory copied from {REFERENCE_SITE}")
    print(f"  [x] niche.config.json updated with new brand/categories/locations")
    print(f"  [x] Pipeline config generated (config_supabase.py)")
    print(f"  [x] Pipeline generator updated (table name, audience)")
    print(f"  [x] globals.css primary color updated")
    print(f"  [x] Reference blog posts cleared")
    print(f"  [x] Hub page stubs created for all categories")
    print(f"  [x] package.json name updated")
    print(f"  [x] .env.local.example created")
    if args.url_style == "flat":
        print(f"  [x] Blog routing converted to flat URLs")
    print(f"\nManual steps required:")
    print(f"  [ ] Review and customize hub page content (add rich pillar copy)")
    print(f"  [ ] Update location page city content in src/app/locations/[slug]/page.tsx")
    print(f"  [ ] Update homepage content in src/app/page.tsx")
    print(f"  [ ] Update about/services/contact page content")
    print(f"  [ ] Update SiteHeader/SiteFooter navigation if needed")
    print(f"  [ ] Update globals.css with full color palette")
    print(f"  [ ] Add to agents/config/agent_config.py NICHE_CONFIG + ACTIVE_NICHES")
    print(f"  [ ] Add table names to shared_supabase_config.py")
    print(f"  [ ] Add to .github/workflows/daily-content-pipeline.yml matrix")
    print(f"  [ ] Add to .github/workflows/ci-build-test.yml matrix")
    print(f"  [ ] Create Supabase table: blog_topics_{args.niche_id}")
    print(f"  [ ] Create Vercel project pointing to {site_dir}/web/")
    print(f"  [ ] Set Vercel env vars (NEXT_PUBLIC_SITE_URL, SUPABASE_URL, SUPABASE_ANON_KEY)")
    print(f"  [ ] Run: cd {site_dir}/web && npm install && npm run build")
    print(f"  [ ] Add public/llms.txt with site description")
    print(f"  [ ] Add public/favicon.ico")
    print(f"  [ ] Seed blog topics into Supabase table")
    print(f"  [ ] Run blog generation: python {site_dir}/pipeline/generate_blog_supabase.py")


def main():
    parser = argparse.ArgumentParser(
        description="Scaffold a new niche accountancy site",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("--niche-id", required=True, help="Niche identifier (lowercase, e.g. 'veterinary')")
    parser.add_argument("--display-name", required=True, help="Brand display name (e.g. 'Veterinary Accountants UK')")
    parser.add_argument("--domain", required=True, help="Domain name (e.g. 'veterinaryaccountantsuk.co.uk')")
    parser.add_argument("--primary-color", default="#059669", help="Primary brand color hex (default: #059669)")
    parser.add_argument("--categories", required=True, help="Comma-separated category names")
    parser.add_argument("--locations", default="london,manchester,birmingham,leeds,bristol",
                        help="Comma-separated location slugs (default: 5 major UK cities)")
    parser.add_argument("--url-style", choices=["nested", "flat"], default="nested",
                        help="Blog URL style: nested=/blog/{cat}/{slug} or flat=/blog/{slug}")

    args = parser.parse_args()

    print(f"\nScaffolding new site: {args.display_name}")
    print(f"  Niche ID: {args.niche_id}")
    print(f"  Domain: {args.domain}")
    print(f"  URL style: {args.url_style}")
    print()

    target_dir = create_site_directory(args.niche_id)

    update_niche_config(target_dir, args)
    update_pipeline(target_dir, args)
    update_blog_content(target_dir, args)
    update_globals_css(target_dir, args)
    update_env_example(target_dir, args)
    update_package_json(target_dir, args)
    create_hub_page_stubs(target_dir, args)
    update_url_style(target_dir, args)
    print_post_scaffold_checklist(args)


if __name__ == "__main__":
    main()
