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

def generate_schema_blocks(blog_parts, image_url):
    """Generate BlogPosting schema with embedded Organization, Person, and FAQ data"""
    today = datetime.now().strftime('%Y-%m-%d')
    base_url = f"{config.SITE_BASE_URL}/blog/"
    full_url = base_url + blog_parts["slug"]

    # === BlogPosting Schema (Main content with embedded elements) ===
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
            "name": "Business Accounting Team",
            "url": f"{config.SITE_BASE_URL}/about",
            "jobTitle": "Chartered Accountants"
        },
        "publisher": {
            "@type": "Organization",
            "name": config.SITE_NAME,
            "url": config.SITE_BASE_URL,
            "logo": {
                "@type": "ImageObject",
                "url": config.PUBLISHER_LOGO_URL,
                "width": 250,
                "height": 60
            }
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
        "articleBody": blog_parts.get("contentHtml", blog_parts.get("content", "")),
        "wordCount": len(blog_parts.get("contentHtml", blog_parts.get("content", "")).split()),
        "timeRequired": f"PT{max(1, len(blog_parts.get('contentHtml', blog_parts.get('content', '')).split()) // 200)}M",
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

    return to_json(blog_schema)