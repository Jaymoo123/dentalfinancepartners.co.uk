import os
import sys
from typing import Dict, Any
from uuid import uuid4

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

import config

try:
    from sanity_client import SanityClient  # optional local shim
except Exception:
    SanityClient = None

def _get_client():
    try:
        from sanity import Client  # type: ignore
    except Exception:
        Client = None
    # Fallback to HTTP requests if needed
    if Client is None:
        from requests import Session  # type: ignore
        return {
            "session": Session(),
            "project": config.SANITY_PROJECT_ID,
            "dataset": config.SANITY_DATASET,
            "version": config.SANITY_API_VERSION,
            "token": config.SANITY_WRITE_TOKEN,
        }
    return Client(
        project_id=config.SANITY_PROJECT_ID,
        dataset=config.SANITY_DATASET,
        token=config.SANITY_WRITE_TOKEN,
        api_version=config.SANITY_API_VERSION,
        use_cdn=False,
    )

def _to_sanity_payload(parsed: Dict[str, Any]) -> Dict[str, Any]:
    faqs = parsed.get("faqs") or []
    if not faqs:
        for idx in range(1, 5):
            q = parsed.get(f"FAQ{idx}", "").strip()
            a = parsed.get(f"FAA{idx}", "").strip()
            if q or a:
                faqs.append({"question": q, "answer": a})
    while len(faqs) < 4:
        faqs.append({"question": "—", "answer": "—"})

    # Ensure each FAQ has a stable unique _key for Sanity array items
    keyed_faqs = []
    for item in faqs:
        if not isinstance(item, dict):
            continue
        keyed = dict(item)
        if not keyed.get("_key"):
            keyed["_key"] = uuid4().hex
        keyed_faqs.append(keyed)

    slug = parsed.get("slug", "").strip()
    canonical_url = f"https://www.business-accounting.co.uk/blog/{slug}" if slug else ""
    
    return {
        "_type": "blogPost",
        "title": (parsed.get("title") or parsed.get("name") or "Untitled").strip(),
        "h1": parsed.get("h1", "").strip(),
        "slug": {"current": slug},
        "category": parsed.get("category", "Tax").strip(),
        "metaTitle": (parsed.get("metaTitle") or parsed.get("meta-title") or "").strip(),
        "metaDescription": (parsed.get("metaDescription") or parsed.get("meta-description") or "").strip(),
        "summary": (parsed.get("summary") or parsed.get("3-liner") or "").strip(),
        "altTag": (parsed.get("altTag") or parsed.get("alt-tag") or "").strip(),
        "imagePrompt": (parsed.get("imagePrompt") or parsed.get("image-prompt") or "").strip(),
        "imageUrl": (parsed.get("imageUrl") or parsed.get("image") or "").strip(),
        "contentHtml": (parsed.get("contentHtml") or parsed.get("content") or "").strip(),
        "faqs": keyed_faqs,
        "schemaJson": (parsed.get("schemaJson") or parsed.get("schema") or "").strip(),
        "canonicalUrl": canonical_url,  # Add canonical URL for all new blogs
    }

def publish_to_sanity(parsed: Dict[str, Any]):
    if not config.PUBLISH_TO_SANITY:
        print("[ℹ️] PUBLISH_TO_SANITY is false. Skipping Sanity publish.")
        return

    client = _get_client()
    payload = _to_sanity_payload(parsed)
    slug = payload.get("slug", {}).get("current", "")
    if not slug:
        print("[✗] Missing slug; cannot publish to Sanity.")
        return

    # HTTP fallback if official client is not available
    if isinstance(client, dict):
        import json
        base = f"https://{client['project']}.api.sanity.io/v{client['version']}/data/mutate/{client['dataset']}"
        headers = {"Authorization": f"Bearer {client['token']}", "Content-Type": "application/json"}
        tx = {
            "mutations": [
                {"delete": {"query": f"*[_type == 'blogPost' && slug.current == '{slug}']"}},
                {"create": payload},
            ]
        }
        res = client["session"].post(base, headers=headers, data=json.dumps(tx))
        if res.status_code not in (200, 201):
            print("❌ Sanity publish failed:", res.status_code, res.text)
            return
        print("[🚀] Published to Sanity (HTTP). Slug:", slug)
        return

    # Using official client
    try:
        # delete if exists
        existing = client.fetch("*[_type == 'blogPost' && slug.current == $slug][0]", {"slug": slug})
        if existing and existing.get("_id"):
            client.delete(existing["_id"])  # type: ignore
        client.create(payload)
        print("[🚀] Published to Sanity. Slug:", slug)
    except Exception as e:
        print("❌ Sanity publish error:", e)


