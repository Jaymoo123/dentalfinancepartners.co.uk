"""
Unified LLM provider wrappers.

Anthropic Claude is the sole approved provider estate-wide (model tiering
rule 2026-06: Sonnet for blog writing/building, Opus for hardest
reasoning/briefs). DeepSeek is BANNED; call_llm raises LLMError if
provider="deepseek" is passed so misconfigured callers fail loudly rather
than silently calling the banned API.

call_deepseek is kept as a banned stub (raises LLMError unconditionally) so
that any stale import elsewhere does not cause an ImportError at module load
time, but will fail loudly at the call site.
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
# DeepSeek -- BANNED (stub kept so legacy imports in competitor/* do not
# raise ImportError at module load time; calling it always raises LLMError)
# ---------------------------------------------------------------------------

def call_deepseek(
    *,
    system_prompt: str,
    user_prompt: str,
    model: str = "deepseek-chat",
    max_tokens: int = 4096,
    temperature: float = 0.3,
    json_mode: bool = False,
) -> LLMResult:
    """Banned provider stub. DeepSeek is not permitted estate-wide (2026-06).

    Raises LLMError unconditionally so any caller that reaches this path fails
    loudly instead of silently calling the banned API.
    """
    raise LLMError(
        "DeepSeek is a banned provider (model tiering rule 2026-06). "
        "Use provider='anthropic' with an approved Claude model."
    )


# ---------------------------------------------------------------------------
# Anthropic (sole approved provider; Sonnet for generation, Haiku for verify)
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

_BANNED_PROVIDERS = frozenset({"deepseek"})


def call_llm(
    *,
    provider: str,
    system_prompt: str,
    user_prompt: str,
    model: str,
    max_tokens: int = 4096,
    temperature: float = 0.3,
) -> LLMResult:
    """Dispatch to the named provider. Used by content_pipeline.

    Approved providers: 'anthropic'.
    Banned providers: 'deepseek' (raises LLMError immediately).
    """
    if provider in _BANNED_PROVIDERS:
        raise LLMError(
            f"Provider {provider!r} is banned (model tiering rule 2026-06). "
            "Set llm_provider='anthropic' in the site config."
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
