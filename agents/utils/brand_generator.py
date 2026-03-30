"""
Brand Component Generator - Generate BrandWordmarkHomeLink and BrandLogoHero.
Extracts brand name from config and creates TSX components.
"""
import json
import os
import re
from typing import Dict


class BrandGenerator:
    def generate_brand_components(self, config: Dict, output_dir: str) -> Dict[str, str]:
        """
        Generate BrandWordmarkHomeLink and BrandLogoHero components.
        No AI needed - pure templating.
        
        Returns dict of {component_name: file_path}
        """
        
        print(f"\n=== Brand Component Generation: {config['niche_id']} ===")
        
        os.makedirs(output_dir, exist_ok=True)
        
        # Extract brand name parts
        display_name = config["display_name"]
        brand_parts = self._split_brand_name(display_name)
        
        print(f"  Brand name: {display_name}")
        print(f"  Split: {brand_parts}")
        
        generated = {}
        
        # 1. Generate BrandWordmarkHomeLink
        print("\n[1/2] Generating BrandWordmarkHomeLink...")
        wordmark_tsx = self._generate_wordmark(brand_parts, config)
        wordmark_path = os.path.join(output_dir, "BrandWordmarkHomeLink.tsx")
        with open(wordmark_path, "w", encoding="utf-8") as f:
            f.write(wordmark_tsx)
        generated["BrandWordmarkHomeLink"] = wordmark_path
        print(f"  ✓ Saved to {wordmark_path}")
        
        # 2. Generate BrandLogoHero
        print("\n[2/2] Generating BrandLogoHero...")
        logo_tsx = self._generate_logo_hero(brand_parts, config)
        logo_path = os.path.join(output_dir, "BrandLogoHero.tsx")
        with open(logo_path, "w", encoding="utf-8") as f:
            f.write(logo_tsx)
        generated["BrandLogoHero"] = logo_path
        print(f"  ✓ Saved to {logo_path}")
        
        return generated
    
    def _split_brand_name(self, display_name: str) -> Dict[str, str]:
        """
        Split brand name into top and bottom parts.
        
        Examples:
        - "Dental Finance Partners" -> {top: "Dental Finance", bottom: "Partners"}
        - "Medical Accountants UK" -> {top: "Medical Accountants", bottom: "UK"}
        - "Property Tax Partners" -> {top: "Property Tax", bottom: "Partners"}
        """
        
        words = display_name.split()
        
        # Default: last word is bottom, rest is top
        if len(words) <= 1:
            return {"top": display_name, "bottom": ""}
        
        # Common patterns
        if words[-1].lower() in ["partners", "uk", "ltd", "limited"]:
            # Last word is bottom
            return {
                "top": " ".join(words[:-1]),
                "bottom": words[-1]
            }
        elif words[-2:] == ["Accountants", "UK"]:
            # Last 2 words are bottom
            return {
                "top": " ".join(words[:-2]),
                "bottom": " ".join(words[-2:])
            }
        else:
            # Split roughly in half
            mid = len(words) // 2
            return {
                "top": " ".join(words[:mid]),
                "bottom": " ".join(words[mid:])
            }
    
    def _generate_wordmark(self, brand_parts: Dict[str, str], config: Dict) -> str:
        """Generate BrandWordmarkHomeLink TSX."""
        
        top = brand_parts["top"]
        bottom = brand_parts["bottom"]
        tagline = config["tagline"]
        
        return f'''import Link from "next/link";
import {{ focusRing }} from "@/components/ui/layout-utils";
import {{ siteConfig }} from "@/config/site";

type BrandWordmarkHomeLinkProps = {{
  /** Merged onto the root link (e.g. footer sizing). */
  className?: string;
  /** Larger wordmark for the footer tile. */
  size?: "header" | "footer";
}};

/** Text-only home link for the header; footer can use a slightly larger variant. */
export function BrandWordmarkHomeLink({{ className = "", size = "header" }}: BrandWordmarkHomeLinkProps) {{
  const isFooter = size === "footer";
  return (
    <Link
      href="/"
      className={{`group flex min-w-0 flex-col leading-none ${{focusRing}} rounded-lg px-1 py-0.5 ${{
        isFooter ? "max-w-none" : "max-w-[11rem] sm:max-w-none"
      }} ${{className}}`.trim()}}
    >
      <span
        className={{`font-bold uppercase tracking-[0.18em] text-[var(--navy)] sm:tracking-[0.2em] ${{
          isFooter ? "text-xs sm:text-sm" : "text-[0.65rem] sm:text-xs"
        }}`}}
      >
        {top}
      </span>
      <span
        className={{`mt-0.5 border-t-2 border-[var(--gold)] font-semibold uppercase text-[var(--navy)] ${{
          isFooter
            ? "pt-1.5 text-[0.65rem] tracking-[0.32em] sm:pt-2 sm:text-xs sm:tracking-[0.38em]"
            : "pt-1 text-[0.6rem] tracking-[0.32em] sm:text-[0.65rem] sm:tracking-[0.38em]"
        }}`}}
      >
        {bottom}
      </span>
      <span className="sr-only"> — {{siteConfig.tagline}}</span>
    </Link>
  );
}}
'''
    
    def _generate_logo_hero(self, brand_parts: Dict[str, str], config: Dict) -> str:
        """Generate BrandLogoHero TSX."""
        
        top = brand_parts["top"]
        bottom = brand_parts["bottom"]
        tagline = config["tagline"]
        
        return f'''import Link from "next/link";
import {{ focusRing }} from "@/components/ui/layout-utils";
import {{ siteConfig }} from "@/config/site";

/**
 * Large typographic mark on the navy hero. Avoids an empty box when `/brand/logo.png`
 * is missing — add that asset later if you want a raster mark here instead.
 */
export function BrandLogoHero() {{
  return (
    <div className="mb-6 sm:mb-8">
      <Link
        href="/"
        className={{`group inline-flex max-w-full flex-col leading-none ${{focusRing}} rounded-lg outline-offset-4`}}
      >
        <span className="text-base font-bold uppercase tracking-[0.2em] text-white sm:text-lg md:text-xl">
          {top}
        </span>
        <span className="mt-2 border-t-2 border-[var(--gold)] pt-2 text-sm font-semibold uppercase tracking-[0.34em] text-white sm:mt-2.5 sm:pt-2.5 sm:text-base sm:tracking-[0.38em] md:text-lg">
          {bottom}
        </span>
        <span className="sr-only"> — {{siteConfig.tagline}}</span>
      </Link>
    </div>
  );
}}
'''


def main():
    """Test the brand generator."""
    import argparse
    
    parser = argparse.ArgumentParser(description="Generate brand components")
    parser.add_argument("--config", required=True, help="Path to niche.config.json")
    parser.add_argument("--output-dir", required=True, help="Output directory for components")
    
    args = parser.parse_args()
    
    # Load config
    with open(args.config, "r", encoding="utf-8") as f:
        config = json.load(f)
    
    # Generate components
    generator = BrandGenerator()
    components = generator.generate_brand_components(config, args.output_dir)
    
    print(f"\n✓ SUCCESS: Generated {len(components)} brand components")
    for name, path in components.items():
        print(f"  - {name}: {path}")


if __name__ == "__main__":
    main()
