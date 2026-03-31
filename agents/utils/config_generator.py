"""
Niche Config Generator - AI-powered niche.config.json generation.
Now powered by DeepSeek for 15x cost reduction.
"""
import json
import os
from typing import Dict, List, Optional
from agents.utils.deepseek_client import DeepSeekClient


class ConfigGenerator:
    def __init__(self, api_key: str, use_deepseek: bool = True):
        """
        Initialize config generator.
        
        Args:
            api_key: DeepSeek or Anthropic API key
            use_deepseek: If True, use DeepSeek (default). If False, use Anthropic.
        """
        self.use_deepseek = use_deepseek
        
        if use_deepseek:
            self.client = DeepSeekClient(api_key)
        else:
            from anthropic import Anthropic
            self.anthropic = Anthropic(api_key=api_key)
    
    def generate_config(self, 
                       niche_id: str,
                       display_name: str,
                       target_keyword: str,
                       keywords: List[Dict],
                       template_path: Optional[str] = None) -> Dict:
        """
        Generate complete niche.config.json using AI.
        Cost: $0.20-0.40 per niche
        
        Args:
            niche_id: Folder name (e.g., "medical")
            display_name: Brand name (e.g., "Medical Accountants UK")
            target_keyword: Primary SEO keyword (e.g., "gp accountant")
            keywords: List of keyword dicts from keyword_researcher
            template_path: Optional path to template JSON with pre-filled values
        """
        
        print(f"\n=== Config Generation: {niche_id} ===")
        
        # Load template if provided
        template = {}
        if template_path and os.path.exists(template_path):
            with open(template_path, "r", encoding="utf-8") as f:
                template = json.load(f)
            print(f"  Loaded template from {template_path}")
        
        # Extract keyword categories
        categories = list(set(k.get("category", "General") for k in keywords if k.get("category")))
        top_keywords = sorted(keywords, key=lambda k: k.get("search_volume", 0), reverse=True)[:20]
        
        print(f"\n[1/2] Analyzing {len(keywords)} keywords...")
        print(f"  Categories: {', '.join(categories)}")
        print(f"  Top keywords: {', '.join([k['keyword'] for k in top_keywords[:5]])}")
        
        # Generate config with Claude
        print(f"\n[2/2] Generating config with Claude...")
        config = self._generate_with_claude(
            niche_id=niche_id,
            display_name=display_name,
            target_keyword=target_keyword,
            keywords=top_keywords,
            categories=categories,
            template=template
        )
        
        print(f"  ✓ Generated config with {len(config)} fields")
        
        return config
    
    def _generate_with_claude(self, 
                             niche_id: str,
                             display_name: str,
                             target_keyword: str,
                             keywords: List[Dict],
                             categories: List[str],
                             template: Dict) -> Dict:
        """Generate config using Claude."""
        
        # Build reference configs from existing niches
        dentists_config_path = "Dentists/niche.config.json"
        property_config_path = "Property/niche.config.json"
        
        reference_configs = ""
        if os.path.exists(dentists_config_path):
            with open(dentists_config_path, "r", encoding="utf-8") as f:
                reference_configs += f"\n\nDENTISTS CONFIG:\n{f.read()}"
        
        if os.path.exists(property_config_path):
            with open(property_config_path, "r", encoding="utf-8") as f:
                reference_configs += f"\n\nPROPERTY CONFIG:\n{f.read()}"
        
        prompt = f"""Act as: UK accounting website strategist and conversion copywriter with SEO expertise
Goal: Generate complete niche.config.json with SEO-optimized homepage metadata
Context: Creating config for {niche_id} niche, target keyword "{target_keyword}", {len(keywords)} keywords researched

NICHE DETAILS:
- niche_id: {niche_id}
- display_name: {display_name}
- target_keyword: {target_keyword}

TOP KEYWORDS:
{json.dumps(keywords[:10], indent=2)}

CATEGORIES:
{json.dumps(categories, indent=2)}

TEMPLATE:
{json.dumps(template, indent=2) if template else "None"}

REFERENCE CONFIGS:
{reference_configs}

Deliverable: Valid JSON config object

Rules (CRITICAL - follow precisely):

1. **Homepage SEO** (CRITICAL):
   - homepage_title: SEO-optimized title tag (55-60 chars, include target keyword + location)
     Example: "GP Accountants UK | Tax Specialists for Medical Professionals"
   - homepage_h1: Clear H1 heading (40-60 chars, target keyword + value prop)
     Example: "Specialist Accountants for GPs & Medical Professionals"
   - homepage_description: Meta description (150-160 chars, include target keyword + CTA)
     Example: "Expert accounting for GPs, consultants & medical practices. NHS pension advice, tax planning & compliance. Book free consultation."

2. **Brand Identity**:
   - tagline: Short, memorable (5-8 words)
   - description: Value proposition (1-2 sentences, 100-150 chars)
   - primary_color: Hex color (professional, distinct from Dentists blue #2563eb and Property green #047857)
   - theme_color: Same as primary_color

3. **Domain & Contact**:
   - domain: www.{{niche_id}}accountants.co.uk (or similar professional domain)
   - email: hello@{{domain}}
   - phone: +44 20 XXXX XXXX (placeholder)

4. **Navigation**:
   - Standard: Services, About, Blog, Contact
   - Optional: Add 1-2 niche-specific pages (e.g., "Incorporation" for Property)

5. **Content Strategy**:
   - audience: Specific target audience (e.g., "UK GPs, consultants, and private practice owners")
   - categories: Use the provided categories (5-7 max)
   - supabase_table: blog_topics_{{niche_id}}
   - source_identifier: {{niche_id}}

6. **Lead Form**:
   - role_label: "I am a..."
   - role_options: 4-5 niche-specific roles (e.g., "GP", "Consultant", "Practice owner")
   - placeholders: Realistic examples for name, email, phone, message

7. **CTAs**:
   - sticky_primary: Compelling question/statement
   - sticky_secondary: Clear value prop
   - sticky_button: Action verb (e.g., "Get started", "Book now")
   - blog.cta_heading: Personalized CTA for blog posts
   - blog.cta_body: 2-3 sentences explaining value
   - blog.cta_button: Action verb

8. **SEO**:
   - locale: en-GB
   - organization_type: ProfessionalService
   - service_areas: ["London", "Manchester", "Birmingham", "Leeds", "Bristol"]
   - google_analytics_id: "G-{{NICHE_ID}}-PLACEHOLDER" (will be replaced later)
   - google_site_verification: "{{NICHE_ID}}-VERIFICATION-PLACEHOLDER"

9. **Locations**:
   - 5 major UK cities with SEO-friendly titles
   - Format: "{{Niche}} accountants in {{City}}"

10. **Metadata**:
    - shared_components_version: "1.0.0"
    - last_sync: Current ISO timestamp

STYLE GUIDELINES:
- Professional, trustworthy tone (avoid hype words like "amazing", "incredible")
- UK English spelling (specialise, optimise, organisation, colour)
- Clear language, no jargon
- Benefits-focused, specific claims
- Use niche terminology from keywords
- Distinct from Dentists (blue #2563eb) and Property (green #047857)

Output Format (CRITICAL):
- Return ONLY valid JSON object
- No markdown markers (no ```)
- No explanation or commentary
- Start with {{ and end with }}
- All strings properly escaped
- Include ALL required fields from requirements above

Verify before responding:
1. Is JSON valid and parseable?
2. Are homepage_title, homepage_h1, homepage_description present in seo object?
3. Are SEO field lengths correct (title 50-60, description 150-160)?
4. Is UK English used throughout?
5. Are all required top-level fields present?"""
        
        try:
            if self.use_deepseek:
                response_text = self.client.generate_structured(
                    prompt=prompt,
                    system="You are a UK accounting website strategist and SEO specialist. Generate professional, conversion-optimized website configurations. Return ONLY valid JSON.",
                    temperature=0.3,
                    max_tokens=8000
                )
            else:
                message = self.anthropic.messages.create(
                    model="claude-sonnet-4-20250514",
                    max_tokens=4096,
                    system=[
                        {
                            "type": "text",
                            "text": "You are a specialist in UK accounting niche marketing and SEO. Generate professional, conversion-optimized website configurations.",
                            "cache_control": {"type": "ephemeral"}
                        }
                    ],
                    messages=[{"role": "user", "content": prompt}]
                )
                response_text = message.content[0].text.strip()
            
            # Clean JSON markers
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.startswith("```"):
                response_text = response_text[3:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            
            config = json.loads(response_text.strip())
            
            # Validate required fields
            required_fields = [
                "niche_id", "display_name", "domain", "tagline", "description",
                "brand", "contact", "navigation", "content_strategy", "seo",
                "lead_form", "cta", "blog", "locations"
            ]
            
            missing = [f for f in required_fields if f not in config]
            if missing:
                raise ValueError(f"Missing required fields: {missing}")
            
            # Validate homepage SEO fields
            if "homepage_title" not in config["seo"]:
                raise ValueError("Missing seo.homepage_title")
            if "homepage_h1" not in config["seo"]:
                raise ValueError("Missing seo.homepage_h1")
            if "homepage_description" not in config["seo"]:
                raise ValueError("Missing seo.homepage_description")
            
            return config
            
        except Exception as e:
            print(f"ERROR: Failed to generate config: {e}")
            raise
    
    def save_config(self, config: Dict, output_path: str):
        """Save config to JSON file."""
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(config, f, indent=2, ensure_ascii=False)
        
        print(f"\n✓ Saved config to {output_path}")


def main():
    """Test the config generator."""
    import argparse
    
    parser = argparse.ArgumentParser(description="Generate niche.config.json")
    parser.add_argument("--niche-id", required=True, help="Niche ID (folder name)")
    parser.add_argument("--display-name", required=True, help="Brand display name")
    parser.add_argument("--target-keyword", required=True, help="Primary target keyword")
    parser.add_argument("--keywords-csv", required=True, help="Path to keywords CSV")
    parser.add_argument("--template", help="Optional template JSON path")
    parser.add_argument("--output", required=True, help="Output path for config")
    
    args = parser.parse_args()
    
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        print("ERROR: ANTHROPIC_API_KEY not set")
        return
    
    # Load keywords from CSV
    import csv
    keywords = []
    with open(args.keywords_csv, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        keywords = list(reader)
    
    print(f"Loaded {len(keywords)} keywords from {args.keywords_csv}")
    
    # Generate config
    generator = ConfigGenerator(api_key)
    config = generator.generate_config(
        niche_id=args.niche_id,
        display_name=args.display_name,
        target_keyword=args.target_keyword,
        keywords=keywords,
        template_path=args.template
    )
    
    # Save config
    generator.save_config(config, args.output)
    
    print(f"\n✓ SUCCESS: Generated config for {args.niche_id}")


if __name__ == "__main__":
    main()
