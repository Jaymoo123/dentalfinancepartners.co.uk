"""
Verification System - 8 gates to ensure quality at each step.
Prevents bad data from propagating through the generation pipeline.
"""
import json
import os
import re
import subprocess
from typing import Dict, List, Tuple, Optional


class VerificationResult:
    def __init__(self, passed: bool, errors: List[str] = None, warnings: List[str] = None):
        self.passed = passed
        self.errors = errors or []
        self.warnings = warnings or []
    
    def __bool__(self):
        return self.passed
    
    def __str__(self):
        if self.passed:
            status = "✓ PASSED"
            if self.warnings:
                status += f" (with {len(self.warnings)} warnings)"
        else:
            status = f"✗ FAILED ({len(self.errors)} errors)"
        
        lines = [status]
        
        if self.errors:
            lines.append("\nErrors:")
            for err in self.errors:
                lines.append(f"  - {err}")
        
        if self.warnings:
            lines.append("\nWarnings:")
            for warn in self.warnings:
                lines.append(f"  - {warn}")
        
        return "\n".join(lines)


class KeywordVerifier:
    """Gate 1: Verify keyword research output."""
    
    def verify(self, keywords: List[Dict], target_keyword: str) -> VerificationResult:
        """Verify keyword research results."""
        
        errors = []
        warnings = []
        
        # Check: Keywords exist
        if not keywords:
            errors.append("No keywords generated")
            return VerificationResult(False, errors)
        
        # Check: Minimum keyword count
        if len(keywords) < 20:
            warnings.append(f"Only {len(keywords)} keywords (expected 20+)")
        
        # Check: Target keyword included
        target_exists = any(k.get("keyword") == target_keyword for k in keywords)
        if not target_exists:
            errors.append(f"Target keyword '{target_keyword}' not in results")
        
        # Check: Required fields
        required_fields = ["keyword", "search_volume", "difficulty", "category"]
        for i, kw in enumerate(keywords[:10]):  # Check first 10
            missing = [f for f in required_fields if f not in kw]
            if missing:
                errors.append(f"Keyword {i+1} missing fields: {missing}")
        
        # Check: Categories exist
        categories = set(k.get("category") for k in keywords if k.get("category"))
        if len(categories) < 3:
            warnings.append(f"Only {len(categories)} categories (expected 5-7)")
        
        # Check: Search volumes reasonable
        volumes = [k.get("search_volume", 0) for k in keywords]
        if max(volumes) < 100:
            warnings.append("All search volumes < 100 (seems low)")
        
        passed = len(errors) == 0
        return VerificationResult(passed, errors, warnings)


class ConfigVerifier:
    """Gate 2: Verify niche.config.json."""
    
    def verify(self, config: Dict, niche_id: str) -> VerificationResult:
        """Verify config structure and content."""
        
        errors = []
        warnings = []
        
        # Check: Required top-level fields
        required_fields = [
            "niche_id", "display_name", "domain", "tagline", "description",
            "brand", "contact", "navigation", "content_strategy", "seo",
            "lead_form", "cta", "blog", "locations"
        ]
        
        missing = [f for f in required_fields if f not in config]
        if missing:
            errors.append(f"Missing required fields: {missing}")
        
        # Check: niche_id matches
        if config.get("niche_id") != niche_id:
            errors.append(f"niche_id mismatch: {config.get('niche_id')} != {niche_id}")
        
        # Check: Homepage SEO fields
        seo = config.get("seo", {})
        if "homepage_title" not in seo:
            errors.append("Missing seo.homepage_title")
        if "homepage_h1" not in seo:
            errors.append("Missing seo.homepage_h1")
        if "homepage_description" not in seo:
            errors.append("Missing seo.homepage_description")
        
        # Check: SEO field lengths
        if "homepage_title" in seo and len(seo["homepage_title"]) > 60:
            warnings.append(f"homepage_title too long ({len(seo['homepage_title'])} chars, max 60)")
        if "homepage_description" in seo and len(seo["homepage_description"]) > 160:
            warnings.append(f"homepage_description too long ({len(seo['homepage_description'])} chars, max 160)")
        
        # Check: Content strategy
        content = config.get("content_strategy", {})
        if "supabase_table" not in content:
            errors.append("Missing content_strategy.supabase_table")
        elif content["supabase_table"] != f"blog_topics_{niche_id}":
            errors.append(f"supabase_table should be 'blog_topics_{niche_id}'")
        
        # Check: Categories
        categories = content.get("categories", [])
        if len(categories) < 3:
            warnings.append(f"Only {len(categories)} content categories (expected 5-7)")
        
        # Check: Lead form roles
        lead_form = config.get("lead_form", {})
        role_options = lead_form.get("role_options", [])
        if len(role_options) < 3:
            warnings.append(f"Only {len(role_options)} role options (expected 4-5)")
        
        # Check: Navigation
        nav = config.get("navigation", [])
        if len(nav) < 3:
            warnings.append(f"Only {len(nav)} navigation items (expected 4+)")
        
        # Check: Locations
        locations = config.get("locations", [])
        if len(locations) < 3:
            warnings.append(f"Only {len(locations)} locations (expected 5)")
        
        passed = len(errors) == 0
        return VerificationResult(passed, errors, warnings)


class TopicTreeVerifier:
    """Gate 3: Verify topic tree seeding."""
    
    def verify(self, migration_file: str, topics_count: int) -> VerificationResult:
        """Verify database migration and topic seeding."""
        
        errors = []
        warnings = []
        
        # Check: Migration file exists
        if not os.path.exists(migration_file):
            errors.append(f"Migration file not found: {migration_file}")
            return VerificationResult(False, errors)
        
        # Check: Migration file not empty
        if os.path.getsize(migration_file) < 100:
            errors.append("Migration file too small (< 100 bytes)")
        
        # Check: Topics count
        if topics_count < 20:
            warnings.append(f"Only {topics_count} topics seeded (expected 50+)")
        
        # Check: Migration SQL syntax (basic)
        with open(migration_file, "r", encoding="utf-8") as f:
            sql = f.read()
        
        if "CREATE TABLE" not in sql:
            errors.append("Migration missing CREATE TABLE statement")
        if "blog_topics_" not in sql:
            errors.append("Migration doesn't create blog_topics table")
        if "ENABLE ROW LEVEL SECURITY" not in sql:
            errors.append("Migration missing RLS policy")
        
        passed = len(errors) == 0
        return VerificationResult(passed, errors, warnings)


class PageVerifier:
    """Gate 4: Verify generated pages."""
    
    def verify(self, pages: Dict[str, str]) -> VerificationResult:
        """Verify generated TSX pages."""
        
        errors = []
        warnings = []
        
        # Check: All pages generated
        expected_pages = ["homepage", "services", "about"]
        missing = [p for p in expected_pages if p not in pages]
        if missing:
            errors.append(f"Missing pages: {missing}")
        
        # Check each page
        for page_name, page_path in pages.items():
            # Check: File exists
            if not os.path.exists(page_path):
                errors.append(f"{page_name}: File not found at {page_path}")
                continue
            
            # Check: File not empty
            if os.path.getsize(page_path) < 500:
                errors.append(f"{page_name}: File too small (< 500 bytes)")
                continue
            
            # Check: TSX syntax (basic)
            with open(page_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Check imports
            if "import" not in content:
                errors.append(f"{page_name}: No imports found")
            
            # Check metadata export
            if page_name == "homepage":
                if "export const metadata" not in content:
                    errors.append(f"{page_name}: Missing metadata export")
            
            # Check default export
            if "export default" not in content:
                errors.append(f"{page_name}: Missing default export")
            
            # Check for common issues
            if "undefined" in content.lower():
                warnings.append(f"{page_name}: Contains 'undefined' - check for template errors")
            
            if "{niche_type}" in content or "{niche_id}" in content:
                errors.append(f"{page_name}: Contains unreplaced placeholders")
        
        passed = len(errors) == 0
        return VerificationResult(passed, errors, warnings)


class BuildVerifier:
    """Gate 5: Verify Next.js build."""
    
    def verify(self, niche_dir: str) -> VerificationResult:
        """Verify Next.js build succeeds."""
        
        errors = []
        warnings = []
        
        web_dir = os.path.join(niche_dir, "web")
        
        # Check: web directory exists
        if not os.path.exists(web_dir):
            errors.append(f"Web directory not found: {web_dir}")
            return VerificationResult(False, errors)
        
        # Check: package.json exists
        package_json = os.path.join(web_dir, "package.json")
        if not os.path.exists(package_json):
            errors.append("package.json not found")
            return VerificationResult(False, errors)
        
        # Run Next.js build
        print("  Running Next.js build (this may take 1-2 minutes)...")
        
        try:
            result = subprocess.run(
                ["npm", "run", "build"],
                cwd=web_dir,
                capture_output=True,
                text=True,
                timeout=180  # 3 minutes
            )
            
            if result.returncode != 0:
                errors.append("Build failed")
                # Extract error messages
                error_lines = [line for line in result.stderr.split("\n") if "error" in line.lower()]
                for line in error_lines[:5]:  # First 5 errors
                    errors.append(f"  {line.strip()}")
            else:
                print("  ✓ Build succeeded")
        
        except subprocess.TimeoutExpired:
            errors.append("Build timed out (> 3 minutes)")
        except FileNotFoundError:
            errors.append("npm not found - cannot verify build")
        except Exception as e:
            errors.append(f"Build verification failed: {e}")
        
        passed = len(errors) == 0
        return VerificationResult(passed, errors, warnings)


class DatabaseVerifier:
    """Gate 6: Verify database connection and table."""
    
    def verify(self, niche_id: str, supabase_url: str, supabase_key: str) -> VerificationResult:
        """Verify database table exists and is accessible."""
        
        errors = []
        warnings = []
        
        # Check: Environment variables
        if not supabase_url:
            errors.append("SUPABASE_URL not set")
        if not supabase_key:
            errors.append("SUPABASE_KEY not set")
        
        if errors:
            return VerificationResult(False, errors)
        
        # Try to connect to Supabase
        try:
            from supabase import create_client
            
            supabase = create_client(supabase_url, supabase_key)
            table_name = f"blog_topics_{niche_id}"
            
            # Query table
            response = supabase.table(table_name).select("id").limit(1).execute()
            
            if response.data is not None:
                print(f"  ✓ Table '{table_name}' is accessible")
            else:
                errors.append(f"Table '{table_name}' query returned None")
        
        except ImportError:
            warnings.append("supabase-py not installed - skipping database verification")
        except Exception as e:
            errors.append(f"Database connection failed: {e}")
        
        passed = len(errors) == 0
        return VerificationResult(passed, errors, warnings)


class IntegrationVerifier:
    """Gate 7: Verify integration with existing system."""
    
    def verify(self, niche_id: str, config: Dict) -> VerificationResult:
        """Verify niche integrates with existing workflows."""
        
        errors = []
        warnings = []
        
        # Check: agent_config.py updated
        agent_config_path = "agents/config/agent_config.py"
        if os.path.exists(agent_config_path):
            with open(agent_config_path, "r", encoding="utf-8") as f:
                agent_config = f.read()
            
            if niche_id not in agent_config:
                warnings.append(f"'{niche_id}' not in agent_config.py - needs manual update")
        else:
            warnings.append("agent_config.py not found - cannot verify integration")
        
        # Check: Workflow files
        workflows_dir = ".github/workflows"
        if os.path.exists(workflows_dir):
            workflow_files = [
                "daily-content-pipeline.yml",
                "daily-analytics-optimization.yml"
            ]
            
            for workflow_file in workflow_files:
                workflow_path = os.path.join(workflows_dir, workflow_file)
                if os.path.exists(workflow_path):
                    with open(workflow_path, "r", encoding="utf-8") as f:
                        workflow = f.read()
                    
                    if niche_id not in workflow:
                        warnings.append(f"'{niche_id}' not in {workflow_file} - needs manual update")
        
        # Check: README.md
        if os.path.exists("README.md"):
            with open("README.md", "r", encoding="utf-8") as f:
                readme = f.read()
            
            if config["display_name"] not in readme:
                warnings.append(f"'{config['display_name']}' not in README.md - needs manual update")
        
        passed = len(errors) == 0
        return VerificationResult(passed, errors, warnings)


class FinalVerifier:
    """Gate 8: Final pre-commit verification."""
    
    def verify(self, niche_id: str) -> VerificationResult:
        """Final checks before commit."""
        
        errors = []
        warnings = []
        
        niche_dir = niche_id.capitalize()
        
        # Check: Niche directory exists
        if not os.path.exists(niche_dir):
            errors.append(f"Niche directory not found: {niche_dir}")
            return VerificationResult(False, errors)
        
        # Check: Required files exist
        required_files = [
            f"{niche_dir}/niche.config.json",
            f"{niche_dir}/web/src/app/page.tsx",
            f"{niche_dir}/web/src/app/services/page.tsx",
            f"{niche_dir}/web/src/app/about/page.tsx",
            f"{niche_dir}/web/src/components/brand/BrandWordmarkHomeLink.tsx",
            f"{niche_dir}/web/src/components/brand/BrandLogoHero.tsx",
        ]
        
        for file_path in required_files:
            if not os.path.exists(file_path):
                errors.append(f"Required file missing: {file_path}")
        
        # Check: No placeholder values
        config_path = f"{niche_dir}/niche.config.json"
        if os.path.exists(config_path):
            with open(config_path, "r", encoding="utf-8") as f:
                config_text = f.read()
            
            placeholders = [
                "PLACEHOLDER",
                "TODO",
                "FIXME",
                "XXX",
            ]
            
            for placeholder in placeholders:
                if placeholder in config_text:
                    warnings.append(f"Config contains '{placeholder}' - may need manual update")
        
        # Check: Git status (no uncommitted changes to existing niches)
        try:
            result = subprocess.run(
                ["git", "status", "--porcelain"],
                capture_output=True,
                text=True,
                timeout=10
            )
            
            if result.returncode == 0:
                changed_files = result.stdout.strip().split("\n")
                
                # Check for changes to Dentists or Property
                existing_niches = ["Dentists", "Property"]
                for line in changed_files:
                    for existing_niche in existing_niches:
                        if existing_niche in line and niche_dir not in line:
                            errors.append(f"Unexpected change to {existing_niche}: {line}")
        
        except Exception as e:
            warnings.append(f"Could not verify git status: {e}")
        
        passed = len(errors) == 0
        return VerificationResult(passed, errors, warnings)


class VerificationPipeline:
    """Run all verification gates in sequence."""
    
    def __init__(self):
        self.verifiers = {
            "keywords": KeywordVerifier(),
            "config": ConfigVerifier(),
            "topics": TopicTreeVerifier(),
            "pages": PageVerifier(),
            "build": BuildVerifier(),
            "database": DatabaseVerifier(),
            "integration": IntegrationVerifier(),
            "final": FinalVerifier(),
        }
    
    def run_all(self, context: Dict) -> Dict[str, VerificationResult]:
        """
        Run all verification gates.
        
        context should contain:
        - niche_id
        - keywords
        - config
        - migration_file
        - topics_count
        - pages
        - niche_dir
        - supabase_url (optional)
        - supabase_key (optional)
        """
        
        results = {}
        
        print("\n=== Running Verification Pipeline ===")
        
        # Gate 1: Keywords
        print("\n[Gate 1/8] Verifying keywords...")
        results["keywords"] = self.verifiers["keywords"].verify(
            context["keywords"],
            context.get("target_keyword", "")
        )
        print(results["keywords"])
        
        # Gate 2: Config
        print("\n[Gate 2/8] Verifying config...")
        results["config"] = self.verifiers["config"].verify(
            context["config"],
            context["niche_id"]
        )
        print(results["config"])
        
        # Gate 3: Topics
        print("\n[Gate 3/8] Verifying topic tree...")
        results["topics"] = self.verifiers["topics"].verify(
            context["migration_file"],
            context["topics_count"]
        )
        print(results["topics"])
        
        # Gate 4: Pages
        print("\n[Gate 4/8] Verifying pages...")
        results["pages"] = self.verifiers["pages"].verify(
            context["pages"]
        )
        print(results["pages"])
        
        # Gate 5: Build (optional - slow)
        if context.get("verify_build", False):
            print("\n[Gate 5/8] Verifying build...")
            results["build"] = self.verifiers["build"].verify(
                context["niche_dir"]
            )
            print(results["build"])
        else:
            print("\n[Gate 5/8] Skipping build verification (set verify_build=True to enable)")
            results["build"] = VerificationResult(True, warnings=["Build verification skipped"])
        
        # Gate 6: Database (optional - requires credentials)
        if context.get("supabase_url") and context.get("supabase_key"):
            print("\n[Gate 6/8] Verifying database...")
            results["database"] = self.verifiers["database"].verify(
                context["niche_id"],
                context["supabase_url"],
                context["supabase_key"]
            )
            print(results["database"])
        else:
            print("\n[Gate 6/8] Skipping database verification (credentials not provided)")
            results["database"] = VerificationResult(True, warnings=["Database verification skipped"])
        
        # Gate 7: Integration
        print("\n[Gate 7/8] Verifying integration...")
        results["integration"] = self.verifiers["integration"].verify(
            context["niche_id"],
            context["config"]
        )
        print(results["integration"])
        
        # Gate 8: Final
        print("\n[Gate 8/8] Final verification...")
        results["final"] = self.verifiers["final"].verify(
            context["niche_id"]
        )
        print(results["final"])
        
        # Summary
        print("\n=== Verification Summary ===")
        passed = sum(1 for r in results.values() if r.passed)
        total = len(results)
        
        print(f"Passed: {passed}/{total}")
        
        if passed == total:
            print("✓ ALL GATES PASSED")
        else:
            failed = [name for name, result in results.items() if not result.passed]
            print(f"✗ FAILED GATES: {', '.join(failed)}")
        
        return results
