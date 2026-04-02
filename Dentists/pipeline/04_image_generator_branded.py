"""
Enhanced image generator that creates branded graphics instead of stock photos
Uses the Next.js API endpoint to generate consistent, on-brand images
"""

import os
import sys
import requests
import time
from urllib.parse import quote

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

import config

def generate_branded_image(blog_parts):
    """
    Generate a branded graphic using the Next.js API endpoint
    Falls back to a default if the API is unavailable
    """
    
    # Extract data for image generation
    title = blog_parts.get("h1", "Business Insights")
    category = blog_parts.get("category", "Accounting")
    slug = blog_parts.get("slug", "")
    
    # Create a subtitle from the meta description (first 60 chars)
    meta_desc = blog_parts.get("meta-description", "Expert guidance for UK businesses")
    subtitle = meta_desc[:60] + "..." if len(meta_desc) > 60 else meta_desc
    
    # Convert to British English
    title = title.replace("maximize", "maximise").replace("organization", "organisation").replace("optimize", "optimise")
    subtitle = subtitle.replace("maximize", "maximise").replace("organization", "organisation").replace("optimize", "optimise")
    
    # Option 1: Use local Next.js API (if running)
    if config.ENABLE_BRANDED_GRAPHICS:
        try:
            # Build the API URL with parameters
            api_url = f"{config.SITE_BASE_URL}/api/generate-blog-graphic"
            params = {
                "title": title,
                "category": category,
                "subtitle": subtitle
            }
            
            # Create the full URL with encoded parameters
            param_string = "&".join([f"{k}={quote(str(v))}" for k, v in params.items()])
            full_url = f"{api_url}?{param_string}"
            
            print(f"🎨 Generating branded graphic for: {title}")
            print(f"   Category: {category}")
            
            # For production, this would save the image and upload to CDN
            # For now, return the dynamic URL
            return full_url
            
        except Exception as e:
            print(f"⚠️ Error generating branded graphic: {e}")
            # Fall through to fallback
    
    # Option 2: Use pre-generated category-based images
    category_images = {
        "Tax": "https://cdn.business-accounting.co.uk/graphics/tax-guide.png",
        "VAT": "https://cdn.business-accounting.co.uk/graphics/vat-guide.png",
        "Corporation Tax": "https://cdn.business-accounting.co.uk/graphics/corporation-tax.png",
        "PAYE & Payroll": "https://cdn.business-accounting.co.uk/graphics/payroll-guide.png",
        "Self Assessment": "https://cdn.business-accounting.co.uk/graphics/self-assessment.png",
        "Bookkeeping": "https://cdn.business-accounting.co.uk/graphics/bookkeeping.png",
        "Accounting Software": "https://cdn.business-accounting.co.uk/graphics/software-guide.png",
        "HMRC": "https://cdn.business-accounting.co.uk/graphics/hmrc-guide.png",
        "Compliance": "https://cdn.business-accounting.co.uk/graphics/compliance.png",
    }
    
    if category in category_images:
        print(f"📊 Using pre-generated graphic for category: {category}")
        return category_images[category]
    
    # Option 3: Fallback to a generic branded image
    print(f"🔄 Using fallback branded graphic")
    return config.FALLBACK_BRANDED_IMAGE_URL

def generate_image_with_overlay(blog_parts, image_prompt):
    """
    Alternative: Generate AI image and add brand overlay
    This would use the original AI generation then add branding
    """
    # This would:
    # 1. Generate base image with AI (existing code)
    # 2. Add overlay with brand colors and logo
    # 3. Add text overlay with category
    # 4. Return composite image
    pass

# Main function to maintain compatibility
def generate_and_upload_image(blog_parts, image_prompt):
    """
    Main function that generates branded graphics
    Maintains compatibility with existing pipeline
    """
    
    if config.USE_BRANDED_GRAPHICS:
        # Use the new branded graphics approach
        image_url = generate_branded_image(blog_parts)
    else:
        # Fall back to original AI generation if needed
        # (import and use the original generator)
        from importlib.machinery import SourceFileLoader
        original_generator = SourceFileLoader(
            "original", 
            os.path.join(CURRENT_DIR, "04_image_generator.py")
        ).load_module()
        image_url = original_generator.generate_and_upload_image(blog_parts, image_prompt)
    
    return image_url

# Configuration additions needed in config.py:
# ENABLE_BRANDED_GRAPHICS = True
# USE_BRANDED_GRAPHICS = True  
# FALLBACK_BRANDED_IMAGE_URL = "https://cdn.business-accounting.co.uk/graphics/default.png"