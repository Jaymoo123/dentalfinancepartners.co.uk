"""
Medical site domain forensics probe — P2.t3
============================================

Read-only. No DB writes. No git commits.

Investigates two "phantom" domain strings that appeared in legacy canonical tags:
  - medicalaccountantsuk.co.uk  (old canonical target until 2026-06-17 fix)
  - medicalaccountants.co.uk    (dead config typo, also fixed)

Evidence gathered:
  1. DNS  — A/AAAA/CNAME resolution (NXDOMAIN vs live)
  2. RDAP — Nominet registration status, registrar, creation date
  3. HTTP  — follow-redirect chains for apex + www + 2 sample blog paths
  4. Google `site:` — via Serper cost-tracked client (1 query/domain, 2 total)
  5. Bing/DDG `site:`  — via existing DDG client (2 queries)
  6. GSC property list — enumerate all GSC-accessible properties; flag phantom domains
  7. Optional canonical residue — if --coverage-json path given and exists

Output: .cache/medical_diag/domain_forensics.json

Usage:
    python scripts/medical/domain_forensics.py
    python scripts/medical/domain_forensics.py --coverage-json .cache/medical_diag/index_coverage.json
"""
from __future__ import annotations

import argparse
import json
import os
import pickle
import socket
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import httpx

# ---------------------------------------------------------------------------
# Project root + .env loading (must happen before optimisation_engine imports)
# ---------------------------------------------------------------------------
_PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_PROJECT_ROOT))

# Load .env if python-dotenv available
try:
    from dotenv import load_dotenv
    load_dotenv(_PROJECT_ROOT / ".env", override=False)
except ImportError:
    pass

# ---------------------------------------------------------------------------
# DNS (dnspython preferred, socket fallback)
# ---------------------------------------------------------------------------
try:
    import dns.resolver
    import dns.exception
    _HAVE_DNSPYTHON = True
except ImportError:
    _HAVE_DNSPYTHON = False


def _dns_resolve(hostname: str) -> dict[str, Any]:
    """
    Resolve A, AAAA, and CNAME for a hostname.
    Returns {"nxdomain": bool, "a": [...], "aaaa": [...], "cname": [...], "error": str|None}.
    """
    result: dict[str, Any] = {"nxdomain": False, "a": [], "aaaa": [], "cname": [], "error": None}

    if _HAVE_DNSPYTHON:
        resolver = dns.resolver.Resolver()
        resolver.timeout = 5
        resolver.lifetime = 10

        for rtype, key in [("A", "a"), ("AAAA", "aaaa"), ("CNAME", "cname")]:
            try:
                answers = resolver.resolve(hostname, rtype)
                result[key] = [str(r) for r in answers]
            except dns.resolver.NXDOMAIN:
                result["nxdomain"] = True
            except dns.resolver.NoAnswer:
                pass  # record type absent but domain may exist
            except dns.exception.DNSException as exc:
                result["error"] = f"{rtype}: {type(exc).__name__}: {exc}"
    else:
        # Fallback: plain socket getaddrinfo
        try:
            infos = socket.getaddrinfo(hostname, None)
            for family, _, _, _, sockaddr in infos:
                ip = sockaddr[0]
                if family == socket.AF_INET:
                    if ip not in result["a"]:
                        result["a"].append(ip)
                elif family == socket.AF_INET6:
                    if ip not in result["aaaa"]:
                        result["aaaa"].append(ip)
        except socket.gaierror as exc:
            if "NXDOMAIN" in str(exc) or exc.errno in (8, 11001):  # NXDOMAIN codes
                result["nxdomain"] = True
            else:
                result["error"] = str(exc)

    return result


def probe_dns(domain: str) -> dict[str, Any]:
    """Probe DNS for apex + www variant."""
    return {
        "apex": _dns_resolve(domain),
        "www": _dns_resolve(f"www.{domain}"),
        "resolver": "dnspython" if _HAVE_DNSPYTHON else "socket",
    }


# ---------------------------------------------------------------------------
# RDAP (Nominet free, no key)
# ---------------------------------------------------------------------------
RDAP_BASE = "https://rdap.nominet.uk/uk/domain"


def probe_rdap(domain: str, *, client: httpx.Client) -> dict[str, Any]:
    """
    Query Nominet RDAP for registration status.
    404 = not registered. Returns {"registered": bool, "registrar": str|None,
    "creation_date": str|None, "status": [...], "raw_summary": {...}|None}.
    """
    url = f"{RDAP_BASE}/{domain}"
    out: dict[str, Any] = {
        "registered": False,
        "registrar": None,
        "creation_date": None,
        "status": [],
        "rdap_url": url,
        "error": None,
    }
    try:
        resp = client.get(url, timeout=15)
        if resp.status_code == 404:
            out["registered"] = False
            return out
        resp.raise_for_status()
        data = resp.json()
        out["registered"] = True
        # Registrar
        entities = data.get("entities") or []
        for ent in entities:
            roles = ent.get("roles") or []
            if "registrar" in roles:
                vcard = ent.get("vcardArray") or []
                if len(vcard) > 1:
                    for item in vcard[1]:
                        if item[0] == "fn":
                            out["registrar"] = item[3]
                            break
        # Creation date
        events = data.get("events") or []
        for ev in events:
            if ev.get("eventAction") == "registration":
                out["creation_date"] = ev.get("eventDate")
        out["status"] = data.get("status") or []
        out["raw_summary"] = {
            "handle": data.get("handle"),
            "ldhName": data.get("ldhName"),
            "status": data.get("status"),
        }
    except httpx.HTTPStatusError as exc:
        out["error"] = f"HTTP {exc.response.status_code}"
    except Exception as exc:
        out["error"] = f"{type(exc).__name__}: {exc}"
    return out


# ---------------------------------------------------------------------------
# HTTP redirect-chain prober
# ---------------------------------------------------------------------------
BLOG_SAMPLE_PATHS = [
    "/blog/gp-partnership-tax-complete-guide",
    "/blog/locum-doctor-tax-complete-guide",
]

MAX_HOPS = 5
HTTP_TIMEOUT = 10


def _follow_redirects(url: str, *, client: httpx.Client, label: str = "") -> dict[str, Any]:
    """
    Follow a URL through up to MAX_HOPS redirects manually.
    Returns {"url_initial": str, "chain": [{url, status_code}, ...], "final_url": str,
             "final_status": int|None, "hops": int, "error": str|None}.
    """
    chain: list[dict] = []
    current_url = url
    error = None

    for _ in range(MAX_HOPS + 1):
        try:
            resp = client.get(current_url, follow_redirects=False, timeout=HTTP_TIMEOUT)
        except Exception as exc:
            error = f"{type(exc).__name__}: {exc}"
            break

        chain.append({"url": current_url, "status_code": resp.status_code})

        if resp.status_code in (301, 302, 303, 307, 308):
            location = resp.headers.get("location", "")
            if not location:
                break
            # Resolve relative redirects
            if location.startswith("/"):
                from urllib.parse import urlparse
                parsed = urlparse(current_url)
                location = f"{parsed.scheme}://{parsed.netloc}{location}"
            current_url = location
        else:
            break  # Final response

    final = chain[-1] if chain else {}
    return {
        "url_initial": url,
        "chain": chain,
        "final_url": final.get("url"),
        "final_status": final.get("status_code"),
        "hops": max(0, len(chain) - 1),
        "error": error,
    }


def probe_http(domain: str, dns_result: dict, *, client: httpx.Client) -> list[dict]:
    """
    If domain resolves (not NXDOMAIN), probe http+https for apex, www, and
    2 sample blog paths. Returns list of chain results.
    """
    apex_dns = dns_result.get("apex", {})
    resolves = not apex_dns.get("nxdomain") and (
        apex_dns.get("a") or apex_dns.get("aaaa") or apex_dns.get("cname")
    )

    if not resolves:
        return [{"skipped": "NXDOMAIN or no resolution", "domain": domain}]

    probes = []
    urls_to_probe = [
        f"http://{domain}",
        f"https://{domain}",
        f"http://www.{domain}",
        f"https://www.{domain}",
    ]
    for path in BLOG_SAMPLE_PATHS:
        urls_to_probe.append(f"https://www.{domain}{path}")

    for url in urls_to_probe:
        time.sleep(1)  # 1s between HTTP calls
        result = _follow_redirects(url, client=client, label=url)
        probes.append(result)

    return probes


# ---------------------------------------------------------------------------
# Serper Google `site:` search
# ---------------------------------------------------------------------------
def probe_google_site(domain: str) -> dict[str, Any]:
    """
    Run `site:<domain>` via the existing cost-tracked Serper client.
    Returns {"query": str, "result_count": int, "urls": [...], "error": str|None}.
    """
    from optimisation_engine.clients.serper_client import SerperClient
    from optimisation_engine.cost_tracker import IdempotencyHit

    query = f"site:{domain}"
    out: dict[str, Any] = {
        "query": query,
        "result_count": 0,
        "urls": [],
        "total_results_raw": None,
        "status": None,        # 'already_queried_today' when idempotency/409 blocks the call
        "retry_after": None,   # 'tomorrow' for the idempotency case
        "error": None,
    }
    try:
        client = SerperClient()
        resp = client.search(query=query, gl="gb", hl="en", num=10, site_key="medical-forensics")
        organic = resp.get("organic") or []
        out["result_count"] = len(organic)
        out["total_results_raw"] = resp.get("searchInformation", {}).get("totalResults")
        out["urls"] = [item.get("link") for item in organic if item.get("link")]
        out["status"] = "ok"
    except IdempotencyHit:
        # NOT an error: this exact site: query was already logged today. The Serper
        # client exposes no cached response body, so we can only mark retry-tomorrow.
        out["status"] = "already_queried_today"
        out["retry_after"] = "tomorrow"
        out["note"] = (
            "Serper site: query already recorded today (cost-log idempotency). "
            "No error; client does not expose the cached response, so retry tomorrow "
            "or clear the cost-log row to re-probe."
        )
    except httpx.HTTPStatusError as exc:
        # 409 on the cost-log INSERT: a prior same-key row exists today under the
        # partial unique index on api_cost_log.idempotency_key. Same meaning as an
        # idempotency hit — treat as already-queried, not a hard error.
        code = exc.response.status_code if exc.response is not None else None
        if code == 409:
            out["status"] = "already_queried_today"
            out["retry_after"] = "tomorrow"
            out["note"] = (
                "Serper cost-log idempotency conflict (HTTP 409 on cost-log insert; "
                "a prior same-key row exists today). Treated as already-queried, not "
                "an error. Retry tomorrow or clear the cost-log row."
            )
        else:
            out["error"] = f"HTTPStatusError {code}"
    except RuntimeError as exc:
        # (IdempotencyHit is a RuntimeError subclass but is caught above.)
        out["error"] = f"RuntimeError: {exc}"
    except Exception as exc:
        out["error"] = f"{type(exc).__name__}: {exc}"
    return out


# ---------------------------------------------------------------------------
# DDG `site:` search
# ---------------------------------------------------------------------------
def _is_real_url(url: str) -> bool:
    """Filter out Startpage/DDG tracking redirect URLs (e.g. /clev?event=...) — not real page URLs."""
    if not url:
        return False
    # Startpage click-tracking redirect — relative URL starting with /clev
    if url.startswith("/clev") or "/clev?" in url:
        return False
    # Must look like an absolute URL
    return url.startswith("http://") or url.startswith("https://")


def probe_ddg_site(domain: str) -> dict[str, Any]:
    """
    Run `site:<domain>` via the existing DDG SERP client (no API key needed).
    Returns {"query": str, "result_count": int, "urls": [...], "noise_urls_filtered": int,
             "error": str|None}.
    Note: DDG sometimes routes through Startpage and returns /clev tracking URLs —
    these are filtered out as noise; they are not actual indexed pages on the domain.
    """
    from optimisation_engine.clients.ddg_serp_client import fetch_organic_results

    query = f"site:{domain}"
    out: dict[str, Any] = {
        "query": query,
        "result_count": 0,
        "urls": [],
        "noise_urls_filtered": 0,
        "error": None,
    }
    try:
        results = fetch_organic_results(query, num=10, region="uk-en", site_key="medical-forensics")
        all_urls = [r.get("link") for r in results if r.get("link")]
        real_urls = [u for u in all_urls if _is_real_url(u)]
        noise_count = len(all_urls) - len(real_urls)
        out["result_count"] = len(real_urls)
        out["urls"] = real_urls
        out["noise_urls_filtered"] = noise_count
        if noise_count > 0:
            out["noise_note"] = (
                f"{noise_count} Startpage /clev tracking URL(s) filtered — not real indexed pages"
            )
    except Exception as exc:
        out["error"] = f"{type(exc).__name__}: {exc}"
    return out


# ---------------------------------------------------------------------------
# GSC property list
# ---------------------------------------------------------------------------
OLD_DOMAIN_STRINGS = [
    "medicalaccountantsuk.co.uk",
    "medicalaccountants.co.uk",
]


def probe_gsc_properties() -> dict[str, Any]:
    """
    List all GSC properties this OAuth token can see. Flag any matching old domains.
    Returns {"properties": [...], "old_domain_property_found": bool,
             "old_domain_matches": [...], "error": str|None}.
    """
    # Change working dir context — GSC client uses relative paths for secrets/
    original_cwd = os.getcwd()
    try:
        os.chdir(_PROJECT_ROOT)
        from agents.utils.gsc_client_oauth import GSCClient
        client = GSCClient()
        sites_resp = client.service.sites().list().execute()
        entries = sites_resp.get("siteEntry") or []
        properties = [e.get("siteUrl") for e in entries]
        matches = [
            p for p in properties
            if any(old in (p or "").lower() for old in OLD_DOMAIN_STRINGS)
        ]
        return {
            "properties": properties,
            "old_domain_property_found": len(matches) > 0,
            "old_domain_matches": matches,
            "error": None,
        }
    except Exception as exc:
        return {
            "properties": [],
            "old_domain_property_found": False,
            "old_domain_matches": [],
            "error": f"{type(exc).__name__}: {exc}",
        }
    finally:
        os.chdir(original_cwd)


# ---------------------------------------------------------------------------
# Optional coverage-JSON residue check
# ---------------------------------------------------------------------------
def probe_canonical_residue(coverage_json_path: str | None) -> dict[str, Any] | str:
    """
    If coverage JSON exists, count URLs with google_canonical pointing at old domains.
    Returns dict or "skipped".
    """
    if not coverage_json_path:
        return "skipped (no --coverage-json arg)"

    path = Path(coverage_json_path)
    if not path.exists():
        return f"skipped (file not found: {coverage_json_path})"

    try:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
    except Exception as exc:
        return f"error reading coverage JSON: {exc}"

    # Structure may vary; try common shapes
    urls = data if isinstance(data, list) else data.get("urls") or data.get("pages") or []

    counts: dict[str, int] = {d: 0 for d in OLD_DOMAIN_STRINGS}
    affected_urls: dict[str, list[str]] = {d: [] for d in OLD_DOMAIN_STRINGS}

    for item in urls:
        canonical = ""
        if isinstance(item, dict):
            canonical = (
                item.get("google_canonical")
                or item.get("canonical")
                or item.get("googleInspectionResult", {}).get("indexStatusResult", {}).get("googleCanonical")
                or ""
            )
        for old_domain in OLD_DOMAIN_STRINGS:
            if old_domain in canonical:
                counts[old_domain] += 1
                affected_urls[old_domain].append(item.get("url") or item.get("inspectionUrl") or "unknown")

    return {
        "total_urls_checked": len(urls),
        "residue_counts": counts,
        "affected_urls": affected_urls,
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
DOMAINS_TO_CHECK = [
    "medicalaccountantsuk.co.uk",
    "medicalaccountants.co.uk",
]

OUTPUT_PATH = Path(_PROJECT_ROOT) / ".cache" / "medical_diag" / "domain_forensics.json"


def main(coverage_json: str | None = None) -> dict:
    print("[domain_forensics] Starting — read-only probe, no DB writes.")
    print(f"  Domains: {DOMAINS_TO_CHECK}")
    print(f"  Output:  {OUTPUT_PATH}")

    # Ensure output directory exists
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    domain_results: dict[str, Any] = {}

    # Shared HTTP client (no automatic redirect following — we do it manually)
    with httpx.Client(
        follow_redirects=False,
        timeout=HTTP_TIMEOUT,
        headers={"User-Agent": "Mozilla/5.0 (compatible; medical-domain-forensics/1.0)"},
    ) as http_client:

        for domain in DOMAINS_TO_CHECK:
            print(f"\n--- {domain} ---")

            # 1. DNS
            print("  [1/5] DNS...")
            dns_result = probe_dns(domain)
            apex_resolves = not dns_result["apex"].get("nxdomain") and (
                dns_result["apex"].get("a") or dns_result["apex"].get("aaaa") or dns_result["apex"].get("cname")
            )
            print(f"    apex NXDOMAIN={dns_result['apex'].get('nxdomain')} A={dns_result['apex'].get('a')}")

            # 2. RDAP
            print("  [2/5] RDAP (Nominet)...")
            time.sleep(1)
            rdap_result = probe_rdap(domain, client=http_client)
            print(f"    registered={rdap_result['registered']} registrar={rdap_result['registrar']}")

            # 3. HTTP chains
            print("  [3/5] HTTP redirect chains...")
            http_chains = probe_http(domain, dns_result, client=http_client)
            print(f"    {len(http_chains)} probe(s)")

            # 4a. Google site:
            print("  [4a/5] Google site: (Serper)...")
            time.sleep(1)
            google_result = probe_google_site(domain)
            print(f"    result_count={google_result['result_count']} total_raw={google_result.get('total_results_raw')}")

            # 4b. Bing/DDG site:
            print("  [4b/5] DDG site:...")
            time.sleep(2)  # DDG rate limit baked in, but add 2s courtesy gap between domains
            ddg_result = probe_ddg_site(domain)
            print(f"    result_count={ddg_result['result_count']}")

            domain_results[domain] = {
                "dns": dns_result,
                "rdap": rdap_result,
                "http_chains": http_chains,
                "google_site_count": google_result["result_count"],
                "google_site_total_raw": google_result.get("total_results_raw"),
                "google_site_urls": google_result["urls"],
                "google_site_status": google_result.get("status"),
                "google_site_retry_after": google_result.get("retry_after"),
                "google_site_note": google_result.get("note"),
                "google_site_error": google_result.get("error"),
                "bing_site_count": ddg_result["result_count"],
                "bing_site_urls": ddg_result["urls"],
                "bing_site_noise_filtered": ddg_result.get("noise_urls_filtered", 0),
                "bing_site_noise_note": ddg_result.get("noise_note"),
                "bing_site_error": ddg_result.get("error"),
            }

    # 5. GSC properties
    print("\n  [5/5] GSC property list...")
    gsc_result = probe_gsc_properties()
    print(f"    properties={len(gsc_result['properties'])} old_domain_found={gsc_result['old_domain_property_found']}")

    # 6. Optional canonical residue
    print("\n  [6] Canonical residue check...")
    residue = probe_canonical_residue(coverage_json)
    print(f"    residue: {residue if isinstance(residue, str) else residue.get('residue_counts')}")

    # Build notes
    notes = []
    for domain, dr in domain_results.items():
        apex = dr["dns"]["apex"]
        if apex.get("nxdomain"):
            notes.append(f"{domain}: NXDOMAIN — domain does not exist in DNS (phantom confirmed)")
        elif not apex.get("a") and not apex.get("aaaa") and not apex.get("cname"):
            notes.append(f"{domain}: DNS resolves but no A/AAAA/CNAME records returned")
        else:
            notes.append(f"{domain}: DNS resolves to {apex.get('a') or apex.get('cname')}")
        if not dr["rdap"]["registered"]:
            notes.append(f"{domain}: RDAP 404 — not registered with Nominet (phantom confirmed)")
        else:
            notes.append(f"{domain}: RDAP registered — registrar={dr['rdap']['registrar']}, created={dr['rdap']['creation_date']}")
        g_err = dr.get("google_site_error") or ""
        g_status = dr.get("google_site_status") or ""
        if dr["google_site_count"] > 0:
            notes.append(f"{domain}: Google site: returned {dr['google_site_count']} result(s) — INDEXED; verify URLs")
        elif g_status == "already_queried_today":
            apex = dr["dns"]["apex"]
            if apex.get("nxdomain") or not dr["rdap"]["registered"]:
                context = "NXDOMAIN + unregistered — domain cannot have any Google results regardless"
            else:
                context = "domain resolves (see DNS/RDAP); retry the probe tomorrow to get the count"
            notes.append(
                f"{domain}: Google site: already queried today (cost-log idempotency) — "
                f"retry tomorrow, not an error; {context}"
            )
        elif not g_err:
            notes.append(f"{domain}: Google site: returned 0 results — not indexed by Google")
        else:
            notes.append(f"{domain}: Google site: probe error — {g_err}")
        if dr["bing_site_count"] == 0 and not dr.get("bing_site_error"):
            notes.append(f"{domain}: DDG/Bing site: returned 0 real results — not indexed")
        elif dr["bing_site_count"] > 0:
            notes.append(f"{domain}: DDG/Bing site: returned {dr['bing_site_count']} real result(s) — INDEXED")

    if not gsc_result["old_domain_property_found"]:
        notes.append("GSC: no GSC property found for either old domain — owner never registered them in GSC")
    else:
        notes.append(f"GSC: old domain property FOUND: {gsc_result['old_domain_matches']} — investigate")

    output = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "probe_tool": "scripts/medical/domain_forensics.py",
        "domains": domain_results,
        "gsc_properties_all": gsc_result["properties"],
        "gsc_old_domain_property_found": gsc_result["old_domain_property_found"],
        "gsc_old_domain_matches": gsc_result["old_domain_matches"],
        "gsc_error": gsc_result.get("error"),
        "canonical_residue": residue,
        "notes": notes,
    }

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, default=str)

    print(f"\n[domain_forensics] Written: {OUTPUT_PATH}")
    return output


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Medical site domain forensics probe")
    parser.add_argument(
        "--coverage-json",
        default=None,
        help="Path to index_coverage.json (optional, from P2.t1 smoke run)",
    )
    args = parser.parse_args()
    result = main(coverage_json=args.coverage_json)

    print("\n========== SUMMARY NOTES ==========")
    for note in result.get("notes", []):
        print(f"  {note}")
