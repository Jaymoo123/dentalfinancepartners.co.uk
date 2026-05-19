"""
Unified LLM provider wrappers.

Both Anthropic Claude and DeepSeek are supported via a thin Provider interface.
The per-site config picks which one to use. The user's decision for the
consolidation is to standardise on DeepSeek across all 6 sites, with an
optional Haiku-based verification pass for hallucination mitigation.

Anthropic is kept as a viable provider for two reasons:
  1. The verification pass uses Haiku (Anthropic).
  2. If DeepSeek-quality regresses on a site, that site can flip provider via
     its site_config without touching the rest of the codebase.
"""
from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass
class LLMResult:
    text: str
    input_tokens: int
    output_tokens: int
    cost_usd: float
    model: str


class LLMError(RuntimeError):
    pass


# ---------------------------------------------------------------------------
# DeepSeek (default for all sites post-consolidation)
# ---------------------------------------------------------------------------

DEEPSEEK_PRICE_PER_M_INPUT_USD = 0.27
DEEPSEEK_PRICE_PER_M_OUTPUT_USD = 1.10


def call_deepseek(
    *,
    system_prompt: str,
    user_prompt: str,
    model: str = "deepseek-chat",
    max_tokens: int = 4096,
    temperature: float = 0.3,
) -> LLMResult:
    """Call DeepSeek chat completions API. OpenAI-compatible shape."""
    import httpx

    api_key = os.getenv("DEEPSEEK_API_KEY", "")
    if not api_key:
        raise LLMError("DEEPSEEK_API_KEY env var not set")

    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "max_tokens": max_tokens,
        "temperature": temperature,
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    try:
        r = httpx.post(
            "https://api.deepseek.com/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=120.0,
        )
    except httpx.HTTPError as exc:
        raise LLMError(f"DeepSeek HTTP error: {exc}") from exc

    if r.status_code >= 400:
        raise LLMError(f"DeepSeek {r.status_code}: {r.text[:500]}")

    data = r.json()
    try:
        text = data["choices"][0]["message"]["content"]
    except (KeyError, IndexError) as exc:
        raise LLMError(f"DeepSeek unexpected response shape: {data}") from exc

    usage = data.get("usage", {})
    input_tokens = usage.get("prompt_tokens", 0)
    output_tokens = usage.get("completion_tokens", 0)
    cost = (
        input_tokens / 1_000_000 * DEEPSEEK_PRICE_PER_M_INPUT_USD
        + output_tokens / 1_000_000 * DEEPSEEK_PRICE_PER_M_OUTPUT_USD
    )

    return LLMResult(
        text=text,
        input_tokens=input_tokens,
        output_tokens=output_tokens,
        cost_usd=cost,
        model=model,
    )


# ---------------------------------------------------------------------------
# Anthropic (used by Haiku verification pass; also available as backup provider)
# ---------------------------------------------------------------------------

ANTHROPIC_PRICES_PER_M_USD = {
    "claude-sonnet-4-20250514":   {"input": 3.0,  "output": 15.0},
    "claude-haiku-4-5-20251001":  {"input": 0.25, "output": 1.25},
    "claude-3-5-haiku-latest":    {"input": 0.80, "output": 4.0},
}


def call_anthropic(
    *,
    system_prompt: str,
    user_prompt: str,
    model: str = "claude-sonnet-4-20250514",
    max_tokens: int = 4096,
    temperature: float = 0.3,
) -> LLMResult:
    """Call Anthropic Messages API."""
    api_key = os.getenv("ANTHROPIC_API_KEY", "")
    if not api_key:
        raise LLMError("ANTHROPIC_API_KEY env var not set")

    try:
        from anthropic import Anthropic
    except ImportError as exc:
        raise LLMError("anthropic package not installed") from exc

    client = Anthropic(api_key=api_key)
    try:
        msg = client.messages.create(
            model=model,
            max_tokens=max_tokens,
            temperature=temperature,
            system=[{"type": "text", "text": system_prompt, "cache_control": {"type": "ephemeral"}}],
            messages=[{"role": "user", "content": user_prompt}],
        )
    except Exception as exc:
        raise LLMError(f"Anthropic call failed: {type(exc).__name__}: {exc}") from exc

    text = msg.content[0].text
    input_tokens = msg.usage.input_tokens
    output_tokens = msg.usage.output_tokens
    prices = ANTHROPIC_PRICES_PER_M_USD.get(model, {"input": 3.0, "output": 15.0})
    cost = (
        input_tokens / 1_000_000 * prices["input"]
        + output_tokens / 1_000_000 * prices["output"]
    )

    return LLMResult(
        text=text,
        input_tokens=input_tokens,
        output_tokens=output_tokens,
        cost_usd=cost,
        model=model,
    )


# ---------------------------------------------------------------------------
# Provider dispatch by name
# ---------------------------------------------------------------------------

def call_llm(
    *,
    provider: str,
    system_prompt: str,
    user_prompt: str,
    model: str,
    max_tokens: int = 4096,
    temperature: float = 0.3,
) -> LLMResult:
    """Dispatch to the named provider. Used by content_pipeline."""
    if provider == "deepseek":
        return call_deepseek(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
            model=model,
            max_tokens=max_tokens,
            temperature=temperature,
        )
    if provider == "anthropic":
        return call_anthropic(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
            model=model,
            max_tokens=max_tokens,
            temperature=temperature,
        )
    raise LLMError(f"Unknown LLM provider: {provider!r}")
