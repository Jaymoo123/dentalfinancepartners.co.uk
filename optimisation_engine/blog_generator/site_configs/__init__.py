"""Per-site configuration registry.

Each site_configs/{site}.py exports a SITE_CONFIG dict. This module assembles
them into the SITE_CONFIGS lookup and runs the routing-safety crossover
assertion at import time. Misconfigurations fail loudly here, not at runtime.
"""
from optimisation_engine.blog_generator.routing_safety import assert_site_config_consistent

from optimisation_engine.blog_generator.site_configs import dentists as _dentists
from optimisation_engine.blog_generator.site_configs import property as _property
from optimisation_engine.blog_generator.site_configs import medical as _medical
from optimisation_engine.blog_generator.site_configs import solicitors as _solicitors
from optimisation_engine.blog_generator.site_configs import agency as _agency
from optimisation_engine.blog_generator.site_configs import generalist as _generalist


SITE_CONFIGS: dict[str, dict] = {
    "dentists": _dentists.SITE_CONFIG,
    "property": _property.SITE_CONFIG,
    "medical": _medical.SITE_CONFIG,
    "solicitors": _solicitors.SITE_CONFIG,
    "agency": _agency.SITE_CONFIG,
    "generalist": _generalist.SITE_CONFIG,
}


# Crossover safety: each registered config must agree with the expected
# site prefix + table prefix from routing_safety.
for _site_key, _cfg in SITE_CONFIGS.items():
    assert_site_config_consistent(_cfg, _site_key)
