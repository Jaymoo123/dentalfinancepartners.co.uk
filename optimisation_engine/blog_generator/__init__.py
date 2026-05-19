"""
Consolidated blog generator for all 6 niche sites.

Replaces the six per-site generate_blog_supabase.py scripts with one shared
module that's driven by per-site configuration in site_configs/.

Entry points:
  python -m optimisation_engine.blog_generator --site dentists
  python -m optimisation_engine.blog_generator --site agency --topic "vat for agencies"

From code:
  from optimisation_engine.blog_generator import generate_blog_for
  generate_blog_for("dentists")
"""
from optimisation_engine.blog_generator.generate import generate_blog_for  # noqa: F401
