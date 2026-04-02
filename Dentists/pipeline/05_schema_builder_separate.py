from datetime import datetime
import json
import os
import sys

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

import config

def to_json(obj) -> str:
    """Return a compact JSON string (no <script> wrappers)."""
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":"))

def generate_schema_blocks_separate(blog_parts, image_url):
    """Generate individual schema blocks as separate JSON-LD objects"""
    today = datetime.now().strftime('%Y-%m-%d')
    base_url = f"{config.SITE_BASE_URL}/blog/"
    full_url = base_url + blog_parts["slug"]

    # === Organization Schema (Publisher) ===
    organization_schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": f"{config.SITE_BASE_URL}/#organization",
        "name": config.SITE_NAME,
        "url": config.SITE_BASE_URL,
        "logo": {
            "@type": "ImageObject",
            "url": config.PUBLISHER_LOGO_URL,
            "width": 250,
            "height": 60
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "availableLanguage": "en-GB",
            "areaServed": "GB"
        },
        "sameAs": [
            "https://www.linkedin.com/company/business-accounting-uk",
            "https://twitter.com/businessaccuk"
        ]
    }

    # === BlogPosting Schema (Main content) ===
    blog_schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": f"{full_url}#article",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": full_url
        },
        "headline": blog_parts["h1"],
        "alternativeHeadline": blog_parts.get("meta-title", blog_parts.get("h1", "")),
        "description": blog_parts["meta-description"],
        "image": {
            "@type": "ImageObject",
            "url": image_url,
            "width": 1200,
            "height": 630
        },
        "author": {
            "@type": "Person",
            "@id": f"{config.SITE_BASE_URL}/#author",
            "name": "Business Accounting Team",
            "url": f"{config.SITE_BASE_URL}/about",
            "jobTitle": "Chartered Accountants"
        },
        "publisher": {
            "@id": f"{config.SITE_BASE_URL}/#organization"
        },
        "datePublished": today,
        "dateModified": today,
        "about": {
            "@type": "Thing",
            "name": blog_parts["category"]
        },
        "audience": {
            "@type": "BusinessAudience",
            "name": "UK business owners and agency owners"
        },
        "inLanguage": "en-GB",
        "isAccessibleForFree": True,
        "keywords": f"{blog_parts['slug']}, accounting, tax, HMRC, {blog_parts['category']}",
        "articleSection": blog_parts["category"],
        "wordCount": len(blog_parts.get("contentHtml", blog_parts.get("content", "")).split()),
        "timeRequired": f"PT{len(blog_parts.get('contentHtml', blog_parts.get('content', '')).split()) // 200}M"
    }

    # === FAQPage Schema ===
    faq_schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": f"{full_url}#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": blog_parts["FAQ1"],
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": blog_parts["FAA1"]
                }
            },
            {
                "@type": "Question", 
                "name": blog_parts["FAQ2"],
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": blog_parts["FAA2"]
                }
            },
            {
                "@type": "Question",
                "name": blog_parts["FAQ3"], 
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": blog_parts["FAA3"]
                }
            },
            {
                "@type": "Question",
                "name": blog_parts["FAQ4"],
                "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": blog_parts["FAA4"]
                }
            }
        ]
    }

    # === BreadcrumbList Schema ===
    breadcrumb_schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": config.SITE_BASE_URL
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Resources",
                "item": f"{config.SITE_BASE_URL}/blog"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": blog_parts["h1"],
                "item": full_url
            }
        ]
    }

    # Return all schemas as individual JSON blocks
    schemas = [organization_schema, blog_schema, faq_schema, breadcrumb_schema]
    return [to_json(schema) for schema in schemas]

def generate_schema_blocks(blog_parts, image_url):
    """Main function - returns combined schemas for compatibility"""
    individual_schemas = generate_schema_blocks_separate(blog_parts, image_url)
    
    # For now, return the first (main blog) schema  
    # This could be modified to return all as separate script tags
    return individual_schemas[1]  # BlogPosting schema