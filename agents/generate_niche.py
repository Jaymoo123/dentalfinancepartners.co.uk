"""
Niche Generator - Main orchestrator for automated niche generation.
Generates a complete niche site in 1-2 hours with comprehensive verification.

Usage:
    python agents/generate_niche.py --niche-id medical --display-name "Medical Accountants UK" --target-keyword "gp accountant"
"""
import argparse
import asyncio
import json
import os
import sys
import time
from datetime import datetime
from typing import Dict, List, Optional

# Add agents directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from agents.utils.keyword_researcher import KeywordResearcher
from agents.utils.config_generator import ConfigGenerator
from agents.utils.page_generator import PageGenerator
from agents.utils.brand_generator import BrandGenerator
from agents.utils.database_setup import DatabaseSetup
from agents.utils.verifiers import VerificationPipeline
from agents.config.cost_limits import COST_PER_OPERATION


class SimpleCostTracker:
    """Simple cost tracker for niche generation (no database)."""
    def __init__(self):
        self.total_cost = 0.0
    
    def track_operation(self, operation: str, multiplier: float = 1.0):
        cost = COST_PER_OPERATION.get(operation, 0) * multiplier
        self.total_cost += cost
    
    def get_total_cost(self) -> float:
        return self.total_cost


class NicheGenerator:
    def __init__(self, anthropic_api_key: str, dry_run: bool = False):
        self.anthropic_api_key = anthropic_api_key
        self.dry_run = dry_run
        self.cost_tracker = SimpleCostTracker()
        
        # Initialize utilities
        self.keyword_researcher = KeywordResearcher(anthropic_api_key)
        self.config_generator = ConfigGenerator(anthropic_api_key)
        self.page_generator = PageGenerator(anthropic_api_key)
        self.brand_generator = BrandGenerator()
        self.database_setup = DatabaseSetup(".")
        self.verification_pipeline = VerificationPipeline()
    
    async def generate(self,
                      niche_id: str,
                      display_name: str,
                      target_keyword: str,
                      template_path: Optional[str] = None,
                      verify_build: bool = False,
                      apply_migrations: bool = False) -> Dict:
        """
        Generate complete niche site.
        
        Returns generation report with:
        - success: bool
        - niche_id: str
        - files_created: List[str]
        - verification_results: Dict
        - cost: float
        - duration_seconds: float
        """
        
        start_time = time.time()
        
        print("=" * 80)
        print(f"NICHE GENERATOR - {display_name}")
        print("=" * 80)
        print(f"Niche ID: {niche_id}")
        print(f"Display Name: {display_name}")
        print(f"Target Keyword: {target_keyword}")
        print(f"Template: {template_path or 'None (generate from scratch)'}")
        print(f"Dry Run: {self.dry_run}")
        print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 80)
        
        files_created = []
        
        try:
            # Step 1: Keyword Research
            print("\n" + "=" * 80)
            print("STEP 1: KEYWORD RESEARCH")
            print("=" * 80)
            
            keywords = await self.keyword_researcher.research_keywords(
                target_keyword=target_keyword,
                niche_type=niche_id
            )
            
            # Save keywords to CSV
            keywords_csv = f"{niche_id}_keywords.csv"
            self.keyword_researcher.export_to_csv(keywords, keywords_csv)
            files_created.append(keywords_csv)
            
            self.cost_tracker.track_operation("keyword_research", 1)
            
            # Step 2: Config Generation
            print("\n" + "=" * 80)
            print("STEP 2: CONFIG GENERATION")
            print("=" * 80)
            
            config = self.config_generator.generate_config(
                niche_id=niche_id,
                display_name=display_name,
                target_keyword=target_keyword,
                keywords=keywords,
                template_path=template_path
            )
            
            # Save config
            niche_dir = niche_id.capitalize()
            os.makedirs(niche_dir, exist_ok=True)
            
            config_path = os.path.join(niche_dir, "niche.config.json")
            self.config_generator.save_config(config, config_path)
            files_created.append(config_path)
            
            # Also save to web directory
            web_config_path = os.path.join(niche_dir, "web", "niche.config.json")
            os.makedirs(os.path.dirname(web_config_path), exist_ok=True)
            self.config_generator.save_config(config, web_config_path)
            files_created.append(web_config_path)
            
            self.cost_tracker.track_operation("niche_generation", 0.3)  # Config gen
            
            # Step 3: Page Generation
            print("\n" + "=" * 80)
            print("STEP 3: PAGE GENERATION")
            print("=" * 80)
            
            pages_output_dir = os.path.join(niche_dir, "web", "src", "app")
            pages = self.page_generator.generate_pages(
                niche_id=niche_id,
                config=config,
                keywords=keywords,
                output_dir=pages_output_dir
            )
            
            files_created.extend(pages.values())
            
            self.cost_tracker.track_operation("niche_generation", 0.6)  # 3 pages
            
            # Step 4: Brand Components
            print("\n" + "=" * 80)
            print("STEP 4: BRAND COMPONENTS")
            print("=" * 80)
            
            brand_output_dir = os.path.join(niche_dir, "web", "src", "components", "brand")
            brand_components = self.brand_generator.generate_brand_components(
                config=config,
                output_dir=brand_output_dir
            )
            
            files_created.extend(brand_components.values())
            
            # Step 5: Database Setup
            print("\n" + "=" * 80)
            print("STEP 5: DATABASE SETUP")
            print("=" * 80)
            
            db_result = self.database_setup.setup_database(
                niche_id=niche_id,
                config=config,
                topic_tree=keywords
            )
            
            files_created.append(db_result["migration_file"])
            
            # Apply migrations if requested
            if apply_migrations and not self.dry_run:
                self.database_setup.apply_migrations()
            
            # Step 6: Verification
            print("\n" + "=" * 80)
            print("STEP 6: VERIFICATION")
            print("=" * 80)
            
            verification_context = {
                "niche_id": niche_id,
                "target_keyword": target_keyword,
                "keywords": keywords,
                "config": config,
                "migration_file": db_result["migration_file"],
                "topics_count": int(db_result["topics_seeded"]),
                "pages": pages,
                "niche_dir": niche_dir,
                "verify_build": verify_build,
                "supabase_url": os.getenv("NEXT_PUBLIC_SUPABASE_URL"),
                "supabase_key": os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
            }
            
            verification_results = self.verification_pipeline.run_all(verification_context)
            
            # Check if all critical gates passed
            critical_gates = ["keywords", "config", "topics", "pages", "final"]
            all_critical_passed = all(
                verification_results[gate].passed for gate in critical_gates
            )
            
            # Step 7: Summary
            print("\n" + "=" * 80)
            print("GENERATION SUMMARY")
            print("=" * 80)
            
            duration = time.time() - start_time
            cost = self.cost_tracker.get_total_cost()
            
            print(f"\nNiche ID: {niche_id}")
            print(f"Display Name: {display_name}")
            print(f"Duration: {duration:.1f} seconds ({duration/60:.1f} minutes)")
            print(f"Cost: ${cost:.2f}")
            print(f"Files Created: {len(files_created)}")
            
            print(f"\nVerification:")
            passed_gates = sum(1 for r in verification_results.values() if r.passed)
            total_gates = len(verification_results)
            print(f"  Passed: {passed_gates}/{total_gates} gates")
            
            if all_critical_passed:
                print("\n✓ SUCCESS: Niche generated and verified")
                print(f"\nNext steps:")
                print(f"  1. Review generated files in {niche_dir}/")
                print(f"  2. Update agents/config/agent_config.py to add {niche_id}")
                print(f"  3. Update .github/workflows/*.yml to include {niche_id}")
                print(f"  4. Run 'npm install' in {niche_dir}/web/")
                print(f"  5. Run 'npm run build' to verify build")
                print(f"  6. Commit changes: git add {niche_dir}/ && git commit")
            else:
                print("\n✗ WARNING: Some verification gates failed")
                print("  Review errors above and fix before committing")
            
            # Generate report
            report = {
                "success": all_critical_passed,
                "niche_id": niche_id,
                "display_name": display_name,
                "target_keyword": target_keyword,
                "files_created": files_created,
                "verification_results": {
                    name: {"passed": r.passed, "errors": r.errors, "warnings": r.warnings}
                    for name, r in verification_results.items()
                },
                "cost": cost,
                "duration_seconds": duration,
                "timestamp": datetime.now().isoformat(),
            }
            
            # Save report
            report_path = f"{niche_id}_generation_report.json"
            with open(report_path, "w", encoding="utf-8") as f:
                json.dump(report, f, indent=2)
            
            print(f"\nReport saved to: {report_path}")
            
            return report
        
        except Exception as e:
            print(f"\n✗ FATAL ERROR: {e}")
            import traceback
            traceback.print_exc()
            
            return {
                "success": False,
                "niche_id": niche_id,
                "error": str(e),
                "files_created": files_created,
                "cost": self.cost_tracker.get_total_cost(),
                "duration_seconds": time.time() - start_time,
            }
        
        finally:
            # Close HTTP client
            await self.keyword_researcher.close()


async def main():
    parser = argparse.ArgumentParser(
        description="Generate a complete niche site with verification",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Generate Medical niche from scratch
  python agents/generate_niche.py --niche-id medical --display-name "Medical Accountants UK" --target-keyword "gp accountant"
  
  # Generate with template and full verification
  python agents/generate_niche.py --niche-id pharmacy --display-name "Pharmacy Accountants UK" --target-keyword "pharmacy accountant" --template templates/niches/pharmacy/template.json --verify-build
  
  # Dry run (no file creation)
  python agents/generate_niche.py --niche-id test --display-name "Test Niche" --target-keyword "test" --dry-run
"""
    )
    
    parser.add_argument("--niche-id", required=True, help="Niche ID (folder name, lowercase)")
    parser.add_argument("--display-name", required=True, help="Brand display name")
    parser.add_argument("--target-keyword", required=True, help="Primary target keyword")
    parser.add_argument("--template", help="Optional template JSON path")
    parser.add_argument("--verify-build", action="store_true", help="Run Next.js build verification (slow)")
    parser.add_argument("--apply-migrations", action="store_true", help="Apply database migrations immediately")
    parser.add_argument("--dry-run", action="store_true", help="Dry run (no file creation)")
    
    args = parser.parse_args()
    
    # Check API key
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        print("ERROR: ANTHROPIC_API_KEY environment variable not set")
        sys.exit(1)
    
    # Generate niche
    generator = NicheGenerator(api_key, dry_run=args.dry_run)
    
    report = await generator.generate(
        niche_id=args.niche_id,
        display_name=args.display_name,
        target_keyword=args.target_keyword,
        template_path=args.template,
        verify_build=args.verify_build,
        apply_migrations=args.apply_migrations
    )
    
    # Exit with appropriate code
    sys.exit(0 if report["success"] else 1)


if __name__ == "__main__":
    asyncio.run(main())
