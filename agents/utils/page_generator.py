"""
Page Generator - AI-powered generation of homepage, services, and about pages.
Uses Claude to generate TSX pages with niche-specific content.
"""
import json
import os
import re
from typing import Dict, List, Optional
from anthropic import Anthropic


class PageGenerator:
    def __init__(self, anthropic_api_key: str):
        self.anthropic = Anthropic(api_key=anthropic_api_key)
    
    def generate_pages(self, 
                      niche_id: str,
                      config: Dict,
                      keywords: List[Dict],
                      output_dir: str) -> Dict[str, str]:
        """
        Generate homepage, services, and about pages.
        Cost: $0.60-1.00 per niche (3 pages)
        
        Returns dict of {page_name: file_path}
        """
        
        print(f"\n=== Page Generation: {niche_id} ===")
        
        os.makedirs(output_dir, exist_ok=True)
        
        generated_pages = {}
        
        # 1. Generate homepage
        print("\n[1/3] Generating homepage...")
        homepage_tsx = self._generate_homepage(niche_id, config, keywords)
        homepage_path = os.path.join(output_dir, "page.tsx")
        with open(homepage_path, "w", encoding="utf-8") as f:
            f.write(homepage_tsx)
        generated_pages["homepage"] = homepage_path
        print(f"  ✓ Saved to {homepage_path}")
        
        # 2. Generate services page
        print("\n[2/3] Generating services page...")
        services_tsx = self._generate_services(niche_id, config, keywords)
        services_dir = os.path.join(output_dir, "services")
        os.makedirs(services_dir, exist_ok=True)
        services_path = os.path.join(services_dir, "page.tsx")
        with open(services_path, "w", encoding="utf-8") as f:
            f.write(services_tsx)
        generated_pages["services"] = services_path
        print(f"  ✓ Saved to {services_path}")
        
        # 3. Generate about page
        print("\n[3/3] Generating about page...")
        about_tsx = self._generate_about(niche_id, config)
        about_dir = os.path.join(output_dir, "about")
        os.makedirs(about_dir, exist_ok=True)
        about_path = os.path.join(about_dir, "page.tsx")
        with open(about_path, "w", encoding="utf-8") as f:
            f.write(about_tsx)
        generated_pages["about"] = about_path
        print(f"  ✓ Saved to {about_path}")
        
        return generated_pages
    
    def _generate_homepage(self, niche_id: str, config: Dict, keywords: List[Dict]) -> str:
        """Generate homepage TSX."""
        
        # Load reference homepage
        dentists_homepage_path = "Dentists/web/src/app/page.tsx"
        reference_homepage = ""
        if os.path.exists(dentists_homepage_path):
            with open(dentists_homepage_path, "r", encoding="utf-8") as f:
                reference_homepage = f.read()
        
        # Extract top keywords by category
        categories = {}
        for kw in keywords:
            cat = kw.get("category", "General")
            if cat not in categories:
                categories[cat] = []
            categories[cat].append(kw)
        
        prompt = f"""Generate a complete Next.js homepage (page.tsx) for {config['display_name']}.

NICHE CONFIG:
{json.dumps(config, indent=2)}

TOP KEYWORDS BY CATEGORY:
{json.dumps({cat: [k['keyword'] for k in kws[:5]] for cat, kws in categories.items()}, indent=2)}

REFERENCE HOMEPAGE (Dentists - for structure/style):
{reference_homepage}

REQUIREMENTS:

1. **Metadata**:
   - title: Use config.seo.homepage_title
   - description: Use config.seo.homepage_description
   - Include canonical URL and OpenGraph

2. **Hero Section**:
   - Use BrandLogoHero component
   - H1: Use config.seo.homepage_h1
   - Subheading: 2-3 sentences explaining value prop (use config.description + keywords)
   - Primary CTA: Link to /contact
   - Secondary CTA: Anchor link to #how-we-work

3. **Trust Section**:
   - 3 trust indicators (e.g., "100% medical focus", "50+ clients", "Fixed fees")
   - Use niche-specific stats and language

4. **Reality Section**:
   - "The reality" heading
   - 4 pain points specific to this niche (derived from keywords and categories)
   - Use conversational, empathetic tone

5. **Why Specialist Section**:
   - 3 reasons to choose a specialist (expertise, proactive advice, transparency)
   - Niche-specific examples

6. **Who We Work With**:
   - 3 client types from config.lead_form.role_options
   - Each with subtitle and body paragraph

7. **How We Work** (id="how-we-work"):
   - 6 services derived from categories
   - Numbered list (01-06)
   - Each with title and body

8. **Why It Matters**:
   - Comparison table showing specialist vs generalist
   - 6 rows of niche-specific areas

9. **Practical Guidance**:
   - Section for blog posts (use placeholder slugs)
   - Link to /blog

10. **Get Started**:
    - Lead form section
    - Use LeadForm component
    - CTAs from config.cta

11. **FAQ**:
    - 1 FAQ with details/summary (expandable)
    - Niche-specific question

STYLE:
- Match Dentists homepage structure and tone
- UK English, professional, trustworthy
- Use same imports and components
- Use same CSS utility classes (siteContainerLg, sectionY, etc.)
- Include StickyCTA component
- Include organization schema

Return ONLY the complete TSX file (no markdown, no explanation):"""
        
        try:
            message = self.anthropic.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=8000,
                system=[
                    {
                        "type": "text",
                        "text": "You are an expert Next.js/React developer specializing in UK accounting websites. Generate production-ready TSX code.",
                        "cache_control": {"type": "ephemeral"}
                    }
                ],
                messages=[{"role": "user", "content": prompt}]
            )
            
            tsx_code = message.content[0].text.strip()
            
            # Clean code markers
            if tsx_code.startswith("```tsx"):
                tsx_code = tsx_code[6:]
            if tsx_code.startswith("```typescript"):
                tsx_code = tsx_code[13:]
            if tsx_code.startswith("```"):
                tsx_code = tsx_code[3:]
            if tsx_code.endswith("```"):
                tsx_code = tsx_code[:-3]
            
            return tsx_code.strip()
            
        except Exception as e:
            print(f"ERROR: Failed to generate homepage: {e}")
            raise
    
    def _generate_services(self, niche_id: str, config: Dict, keywords: List[Dict]) -> str:
        """Generate services page TSX."""
        
        # Load reference services page
        dentists_services_path = "Dentists/web/src/app/services/page.tsx"
        reference_services = ""
        if os.path.exists(dentists_services_path):
            with open(dentists_services_path, "r", encoding="utf-8") as f:
                reference_services = f.read()
        
        # Extract categories
        categories = list(set(k.get("category", "General") for k in keywords if k.get("category")))
        
        prompt = f"""Generate a complete Next.js services page (services/page.tsx) for {config['display_name']}.

NICHE CONFIG:
{json.dumps(config, indent=2)}

CONTENT CATEGORIES:
{json.dumps(categories, indent=2)}

REFERENCE SERVICES PAGE (Dentists - for structure/style):
{reference_services}

REQUIREMENTS:

1. **Metadata**:
   - title: "{config['display_name']} services"
   - description: List of services (100-150 chars)
   - Include canonical URL and OpenGraph

2. **Page Header**:
   - Breadcrumb: Home > Services
   - H1: "Services for UK [niche professionals]"
   - Intro paragraph (2-3 sentences)

3. **Services List**:
   - 4-6 services derived from categories
   - Each service:
     - Title (H2 with number prefix)
     - Body paragraph (2-3 sentences)
     - Optional: Related blog links (placeholder slugs)
     - CTA: "Ask about this service" (link to /contact)

4. **CTAs**:
   - 2 CTA sections at bottom:
     - "Book a short scoping call" (link to /contact)
     - "Prefer to start with content?" (link to /blog)
   - Use CTASection component

STYLE:
- Match Dentists services page structure
- UK English, professional tone
- Use same imports and components
- Use contentNarrow, sectionY utilities
- Include Breadcrumb component

Return ONLY the complete TSX file (no markdown, no explanation):"""
        
        try:
            message = self.anthropic.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=4096,
                system=[
                    {
                        "type": "text",
                        "text": "You are an expert Next.js/React developer specializing in UK accounting websites. Generate production-ready TSX code.",
                        "cache_control": {"type": "ephemeral"}
                    }
                ],
                messages=[{"role": "user", "content": prompt}]
            )
            
            tsx_code = message.content[0].text.strip()
            
            # Clean code markers
            if tsx_code.startswith("```tsx"):
                tsx_code = tsx_code[6:]
            if tsx_code.startswith("```typescript"):
                tsx_code = tsx_code[13:]
            if tsx_code.startswith("```"):
                tsx_code = tsx_code[3:]
            if tsx_code.endswith("```"):
                tsx_code = tsx_code[:-3]
            
            return tsx_code.strip()
            
        except Exception as e:
            print(f"ERROR: Failed to generate services page: {e}")
            raise
    
    def _generate_about(self, niche_id: str, config: Dict) -> str:
        """Generate about page TSX."""
        
        # Load reference about page
        dentists_about_path = "Dentists/web/src/app/about/page.tsx"
        reference_about = ""
        if os.path.exists(dentists_about_path):
            with open(dentists_about_path, "r", encoding="utf-8") as f:
                reference_about = f.read()
        
        prompt = f"""Generate a complete Next.js about page (about/page.tsx) for {config['display_name']}.

NICHE CONFIG:
{json.dumps(config, indent=2)}

REFERENCE ABOUT PAGE (Dentists - for structure/style):
{reference_about}

REQUIREMENTS:

1. **Metadata**:
   - title: "About us"
   - description: Why we focus on this niche (100-150 chars)
   - Include canonical URL and OpenGraph

2. **Page Header**:
   - Breadcrumb: Home > About
   - H1: "About {config['display_name']}"
   - Intro paragraph (2-3 sentences about mission/focus)

3. **How We Work**:
   - H2: "How we work"
   - 3-4 bullet points (list)
   - Focus on approach, not services

4. **Evidence-Led Content**:
   - H2: "Evidence-led content"
   - Paragraph with links to blog
   - Mention 2 example blog topics (placeholder slugs)

5. **CTA**:
   - CTASection: "See if we are a fit"
   - Link to /contact

STYLE:
- Match Dentists about page structure
- UK English, professional tone
- Keep it concise (shorter than services page)
- Use contentNarrow, sectionY utilities
- Include Breadcrumb and CTASection components

Return ONLY the complete TSX file (no markdown, no explanation):"""
        
        try:
            message = self.anthropic.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=3000,
                system=[
                    {
                        "type": "text",
                        "text": "You are an expert Next.js/React developer specializing in UK accounting websites. Generate production-ready TSX code.",
                        "cache_control": {"type": "ephemeral"}
                    }
                ],
                messages=[{"role": "user", "content": prompt}]
            )
            
            tsx_code = message.content[0].text.strip()
            
            # Clean code markers
            if tsx_code.startswith("```tsx"):
                tsx_code = tsx_code[6:]
            if tsx_code.startswith("```typescript"):
                tsx_code = tsx_code[13:]
            if tsx_code.startswith("```"):
                tsx_code = tsx_code[3:]
            if tsx_code.endswith("```"):
                tsx_code = tsx_code[:-3]
            
            return tsx_code.strip()
            
        except Exception as e:
            print(f"ERROR: Failed to generate about page: {e}")
            raise


def main():
    """Test the page generator."""
    import argparse
    import csv
    
    parser = argparse.ArgumentParser(description="Generate pages for a niche")
    parser.add_argument("--niche-id", required=True, help="Niche ID")
    parser.add_argument("--config", required=True, help="Path to niche.config.json")
    parser.add_argument("--keywords-csv", required=True, help="Path to keywords CSV")
    parser.add_argument("--output-dir", required=True, help="Output directory for pages")
    
    args = parser.parse_args()
    
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        print("ERROR: ANTHROPIC_API_KEY not set")
        return
    
    # Load config
    with open(args.config, "r", encoding="utf-8") as f:
        config = json.load(f)
    
    # Load keywords
    keywords = []
    with open(args.keywords_csv, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        keywords = list(reader)
    
    print(f"Loaded config and {len(keywords)} keywords")
    
    # Generate pages
    generator = PageGenerator(api_key)
    pages = generator.generate_pages(
        niche_id=args.niche_id,
        config=config,
        keywords=keywords,
        output_dir=args.output_dir
    )
    
    print(f"\n✓ SUCCESS: Generated {len(pages)} pages")
    for page_name, path in pages.items():
        print(f"  - {page_name}: {path}")


if __name__ == "__main__":
    main()
