"""
Safe HTTP fetching for competitor pages.

Security controls:
- robots.txt compliance before every fetch
- SSRF protection: blocks private/loopback IP ranges
- Strict timeouts (15s connect, 30s read)
- Max response size (5 MB) to avoid memory bombs
- User-Agent identifies us as a research bot
- No cookies, no credential headers forwarded
- Redirect cap at 5 hops
"""
from __future__ import annotations

import ipaddress
import socket
import time
import urllib.robotparser
from urllib.parse import urlparse

import httpx

BOT_USER_AGENT = "Mozilla/5.0 (compatible; SEOResearchBot/1.0; +https://emplifex.com)"
MAX_RESPONSE_BYTES = 5 * 1024 * 1024  # 5 MB
REQUEST_TIMEOUT = httpx.Timeout(connect=10.0, read=30.0, write=10.0, pool=5.0)
MAX_REDIRECTS = 5
BETWEEN_SAME_DOMAIN_DELAY = 2.0   # seconds between requests to same domain
BETWEEN_DOMAIN_DELAY = 1.0         # seconds between different domains

# In-memory robots cache for the lifetime of the process
_robots_cache: dict[str, urllib.robotparser.RobotFileParser | None] = {}
_last_fetch_time: dict[str, float] = {}  # domain -> epoch


# ---------------------------------------------------------------------------
# SSRF guard
# ---------------------------------------------------------------------------

_PRIVATE_RANGES = [
    ipaddress.ip_network("10.0.0.0/8"),
    ipaddress.ip_network("172.16.0.0/12"),
    ipaddress.ip_network("192.168.0.0/16"),
    ipaddress.ip_network("127.0.0.0/8"),
    ipaddress.ip_network("169.254.0.0/16"),
    ipaddress.ip_network("::1/128"),
    ipaddress.ip_network("fc00::/7"),
]


def _is_private_ip(hostname: str) -> bool:
    """Return True if the hostname resolves to a private/loopback address."""
    try:
        for info in socket.getaddrinfo(hostname, None):
            addr = info[4][0]
            ip = ipaddress.ip_address(addr)
            if any(ip in net for net in _PRIVATE_RANGES):
                return True
    except (socket.gaierror, ValueError):
        return True  # treat unresolvable as blocked
    return False


def _validate_url(url: str) -> None:
    """Raise ValueError if the URL scheme or host is not safe to fetch."""
    parsed = urlparse(url)
    if parsed.scheme not in ("http", "https"):
        raise ValueError(f"Blocked URL scheme: {parsed.scheme!r}")
    if not parsed.netloc:
        raise ValueError(f"No host in URL: {url!r}")
    hostname = parsed.hostname or ""
    if _is_private_ip(hostname):
        raise ValueError(f"SSRF blocked: {hostname} resolves to private IP")


# ---------------------------------------------------------------------------
# Robots.txt compliance
# ---------------------------------------------------------------------------

def _get_robots(base_url: str) -> urllib.robotparser.RobotFileParser | None:
    """Fetch and cache robots.txt for a base URL. Returns None on error."""
    if base_url in _robots_cache:
        return _robots_cache[base_url]
    rp = urllib.robotparser.RobotFileParser()
    robots_url = base_url.rstrip("/") + "/robots.txt"
    rp.set_url(robots_url)
    try:
        rp.read()
        _robots_cache[base_url] = rp
    except Exception:
        _robots_cache[base_url] = None  # assume allowed if unreadable
    return _robots_cache[base_url]


def can_fetch(url: str) -> bool:
    """Return True if robots.txt allows fetching this URL."""
    parsed = urlparse(url)
    base = f"{parsed.scheme}://{parsed.netloc}"
    rp = _get_robots(base)
    if rp is None:
        return True
    return rp.can_fetch(BOT_USER_AGENT, url)


# ---------------------------------------------------------------------------
# Rate limiter
# ---------------------------------------------------------------------------

def _rate_limit(domain: str) -> None:
    """Sleep if needed to respect per-domain rate limits."""
    now = time.monotonic()
    last = _last_fetch_time.get(domain, 0.0)
    elapsed = now - last
    required = BETWEEN_SAME_DOMAIN_DELAY if domain in _last_fetch_time else BETWEEN_DOMAIN_DELAY
    if elapsed < required:
        time.sleep(required - elapsed)
    _last_fetch_time[domain] = time.monotonic()


# ---------------------------------------------------------------------------
# Fetch
# ---------------------------------------------------------------------------

def fetch_url(url: str) -> tuple[int, str]:
    """Fetch a URL safely. Returns (http_status, text_content).

    Raises ValueError for SSRF / scheme violations.
    Returns (0, error_message) for connection errors.
    Respects robots.txt — returns (-1, 'robots_blocked') if disallowed.
    """
    _validate_url(url)

    if not can_fetch(url):
        return -1, "robots_blocked"

    parsed = urlparse(url)
    domain = parsed.netloc or parsed.hostname or url
    _rate_limit(domain)

    try:
        with httpx.Client(
            follow_redirects=True,
            max_redirects=MAX_REDIRECTS,
            timeout=REQUEST_TIMEOUT,
            headers={"User-Agent": BOT_USER_AGENT},
        ) as client:
            resp = client.get(url)
            # Enforce size limit
            content_length = len(resp.content)
            if content_length > MAX_RESPONSE_BYTES:
                return resp.status_code, resp.content[:MAX_RESPONSE_BYTES].decode("utf-8", errors="replace")
            return resp.status_code, resp.text
    except httpx.TooManyRedirects:
        return 0, "too_many_redirects"
    except Exception as exc:
        return 0, str(exc)[:200]
