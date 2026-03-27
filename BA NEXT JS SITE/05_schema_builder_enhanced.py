from datetime import datetime
import json
import os
import sys

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

import config

def schema(json_obj):
    """Formats schema with script tags for proper embedding."""
    return '<script type="application/ld+json">\n' + json.dumps(json_obj, indent=2, ensure_ascii=False) + '\n</script>'

def generate_schema_blocks(blog_parts, image_url):
    """Generate multiple schema blocks as separate script tags for better validator recognition"""
    today = datetime.now().strftime('%Y-%m-%d')
    base_url = f"{config.SITE_BASE_URL}/blog/"
    full_url = base_url + blog_parts.get("slug", "")
    
    # === Organization Schema ===
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
    
    # === WebPage Schema ===
    webpage_schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": f"{full_url}#webpage",
        "name": blog_parts.get("h1", blog_parts.get("title", "")),
        "url": full_url,
        "description": blog_parts.get("meta-description", ""),
        "inLanguage": "en-GB",
        "datePublished": today,
        "dateModified": today,
        "isPartOf": {
            "@type": "WebSite",
            "name": config.SITE_NAME,
            "url": config.SITE_BASE_URL
        },
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": image_url,
            "width": 1200,
            "height": 630
        },
        "publisher": {
            "@id": f"{config.SITE_BASE_URL}/#organization"
        }
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
                "name": blog_parts.get("h1", blog_parts.get("title", "")),
                "item": full_url
            }
        ]
    }
    
    # === FAQPage Schema ===
    faq_schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": blog_parts.get("FAQ1", ""),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": blog_parts.get("FAA1", "")
                }
            },
            {
                "@type": "Question",
                "name": blog_parts.get("FAQ2", ""),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": blog_parts.get("FAA2", "")
                }
            },
            {
                "@type": "Question",
                "name": blog_parts.get("FAQ3", ""),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": blog_parts.get("FAA3", "")
                }
            },
            {
                "@type": "Question",
                "name": blog_parts.get("FAQ4", ""),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": blog_parts.get("FAA4", "")
                }
            }
        ]
    }
    
    # === BlogPosting Schema ===
    blog_schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": full_url
        },
        "headline": blog_parts.get("h1", blog_parts.get("title", "")),
        "alternativeHeadline": blog_parts.get("meta-title", blog_parts.get("h1", "")),
        "description": blog_parts.get("meta-description", ""),
        "image": {
            "@type": "ImageObject",
            "url": image_url,
            "width": 1200,
            "height": 630
        },
        "author": {
            "@type": "Person",
            "name": "Business Accounting Team",
            "url": f"{config.SITE_BASE_URL}/about"
        },
        "publisher": {
            "@type": "Organization",
            "name": config.SITE_NAME,
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
            "name": blog_parts.get("category", "")
        },
        "keywords": f"{blog_parts.get('slug', '')}, accounting, tax, HMRC, {blog_parts.get('category', '')}",
        "articleSection": blog_parts.get("category", ""),
        "inLanguage": "en-GB",
        "isAccessibleForFree": True,
        "articleBody": blog_parts.get("contentHtml", blog_parts.get("content", "")),
        "wordCount": len(blog_parts.get("contentHtml", blog_parts.get("content", "")).split()),
        "timeRequired": f"PT{max(1, len(blog_parts.get('contentHtml', blog_parts.get('content', '')).split()) // 200)}M"
    }
    
    # Return all schemas as separate script blocks joined with newlines
    return "\n\n".join([
        schema(organization_schema),
        schema(webpage_schema),
        schema(breadcrumb_schema),
        schema(faq_schema),
        schema(blog_schema)
    ])