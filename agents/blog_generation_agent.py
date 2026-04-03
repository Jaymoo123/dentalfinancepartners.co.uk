"""
Blog Generation Agent - Orchestrates existing blog generation scripts.
Adds quality controls, deduplication, and automated deployment.
"""
import os
import sys
import asyncio
import subprocess
import argparse
import re
from datetime import datetime
from typing import Optional, Dict

# Add parent directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from agents.config.agent_config import NICHE_CONFIG, PROJECT_ROOT
from agents.config.cost_limits import RATE_LIMITS, QUALITY_THRESHOLDS
from agents.utils.supabase_client import SupabaseClient
from agents.utils.cost_tracker import CostTracker
from agents.utils.error_handler import ErrorHandler
from agents.utils.quality_checker import QualityChecker
from agents.utils.alerting import send_alert
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

class BlogGenerationAgent:
    def __init__(self, niche: str):
        self.niche = niche
        self.niche_config = NICHE_CONFIG[niche]
        self.niche_path = os.path.join(PROJECT_ROOT, niche, "pipeline")
        
        # Initialize utilities
        self.supabase = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
        self.cost_tracker = CostTracker(self.supabase)
        self.error_handler = ErrorHandler(self.supabase)
        self.quality_checker = QualityChecker()
        
        self.execution_id = None
    
    async def generate(self, max_posts: int = 1):
        """Generate blog posts with quality controls."""
        print(f"=== Blog Generation Agent: {self.niche} ===")
        
        # Check if niche is enabled
        if not self.niche_config["enabled"]:
            print(f"Niche {self.niche} is disabled. Skipping.")
            return
        
        posts_generated = 0
        
        for i in range(max_posts):
            # Check rate limits
            daily_count = await self._get_daily_generation_count()
            if daily_count >= RATE_LIMITS["daily_blog_posts_per_niche"]:
                print(f"Daily limit reached: {daily_count}/{RATE_LIMITS['daily_blog_posts_per_niche']}")
                break
            
            # Generate one post
            success = await self._generate_single_post()
            if success:
                posts_generated += 1
        
        print(f"Generated {posts_generated} posts for {self.niche}")
    
    async def _generate_single_post(self) -> bool:
        """Generate a single blog post with all checks."""
        try:
            # Create execution record
            self.execution_id = await self._start_execution()
            
            # 1. Get next topic
            topic = await self._get_next_topic()
            if not topic:
                print("No unused topics found")
                await self._complete_execution("skipped_no_topics")
                return False
            
            print(f"Processing topic: {topic['topic']}")
            if topic.get("primary_keyword"):
                print(f"  Keyword: {topic['primary_keyword']} (priority: {topic.get('publish_priority', 'N/A')}, difficulty: {topic.get('keyword_difficulty', 'N/A')})")
            
            # 2. Check budget
            if not await self.cost_tracker.check_budget("blog_generation"):
                await self._complete_execution("budget_exceeded")
                return False
            
            # 3. GENERATE: Call existing generate_blog_supabase.py
            # NOTE: Duplicate checks removed - topics are pre-filtered by keyword tree builder
            print("Calling generate_blog_supabase.py...")
            result = subprocess.run(
                [sys.executable, "generate_blog_supabase.py"],
                cwd=self.niche_path,
                capture_output=True,
                text=True,
                env={**os.environ, "ANTHROPIC_API_KEY": os.getenv("ANTHROPIC_API_KEY")}
            )
            
            if result.returncode != 0:
                raise Exception(f"Generation failed: {result.stderr}")
            
            # Extract slug from output
            slug = self._parse_slug_from_output(result.stdout)
            if not slug:
                raise Exception("Could not parse slug from output")
            
            print(f"Generated: {slug}")
            
            # 6. POST-GENERATION: Quality checks
            content_path = os.path.join(
                self.niche_path, "..",
                "web", "content", "blog",
                f"{slug}.md"
            )
            
            quality_result = await self.quality_checker.validate(content_path)
            
            if not quality_result.passed:
                print(f"Quality check failed: {quality_result.issues}")
                
                # Delete low-quality content
                if os.path.exists(content_path):
                    os.remove(content_path)
                
                await send_alert(
                    f"Quality check failed for {self.niche}/{slug}:\n" + 
                    "\n".join(f"- {issue}" for issue in quality_result.issues),
                    priority="medium"
                )
                
                await self._complete_execution("quality_failed", {
                    "quality_issues": quality_result.issues,
                    "metrics": quality_result.metrics
                })
                return False
            
            print(f"Quality check passed: {quality_result.metrics}")
            
            # 7. STORE CONTENT IN SUPABASE IMMEDIATELY (before deployment)
            with open(content_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            title_match = re.search(r'title: "([^"]+)"', content)
            title = title_match.group(1) if title_match else slug
            
            # Store full content in Supabase for backup and retry capability
            # This also registers it for deduplication
            await self._store_content_in_supabase(
                slug=slug,
                title=title,
                topic=topic["topic"],
                content=content,
                word_count=quality_result.metrics.get("word_count", 0)
            )
            
            print(f"Content stored in Supabase: {slug}")
            
            # 9. Log cost (only for successful generation + storage)
            await self.cost_tracker.log_cost("blog_generation", self.niche)
            
            # 10. Complete execution
            await self._complete_execution("completed", {
                "slug": slug,
                "quality_metrics": quality_result.metrics
            })
            
            print(f"Successfully generated and validated: {slug}")
            return True
            
        except Exception as e:
            await self.error_handler.handle_error(e, {
                "execution_id": self.execution_id,
                "agent_type": "blog_generation",
                "niche": self.niche
            })
            return False
    
    async def _get_next_topic(self):
        """
        Get next unused topic from Supabase using priority-based selection.
        Prioritizes: high publish_priority, low keyword_difficulty (easy wins first).
        """
        topics = await self.supabase.select(
            self.niche_config["blog_topics_table"],
            filters={"used": False},
            order="publish_priority.desc,keyword_difficulty.asc,created_at.asc",
            limit=1
        )
        
        return topics[0] if topics else None
    
    async def _get_daily_generation_count(self) -> int:
        """Get number of posts DEPLOYED today for this niche (not just attempted)."""
        today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        
        # Count successfully deployed content, not just generation attempts
        deployed = await self.supabase.select(
            "published_content",
            filters={
                "niche": self.niche,
                "deployment_status": "deployed",
                "published_at": f"gte.{today.isoformat()}"
            }
        )
        
        return len(deployed)
    
    async def _start_execution(self) -> str:
        """Start execution record in Supabase."""
        result = await self.supabase.insert("agent_executions", {
            "agent_type": "blog_generation",
            "niche": self.niche,
            "status": "running",
            "started_at": datetime.utcnow().isoformat()
        })
        
        return result["id"]
    
    async def _store_content_in_supabase(self, slug: str, title: str, topic: str, 
                                          content: str, word_count: int):
        """Store full blog content in Supabase immediately after generation."""
        import hashlib
        
        content_hash = hashlib.sha256(content.encode()).hexdigest()
        
        # Insert or update content in Supabase
        try:
            await self.supabase.insert("published_content", {
                "niche": self.niche,
                "slug": slug,
                "title": title,
                "topic": topic,
                "full_content": content,
                "word_count": word_count,
                "content_hash": content_hash,
                "deployment_status": "pending",
                "published_at": datetime.utcnow().isoformat()
            })
        except Exception as e:
            # If already exists (duplicate slug), update it
            if "duplicate" in str(e).lower():
                await self.supabase.update(
                    "published_content",
                    filters={"niche": self.niche, "slug": slug},
                    data={
                        "full_content": content,
                        "word_count": word_count,
                        "content_hash": content_hash,
                        "deployment_status": "pending"
                    }
                )
            else:
                raise
    
    async def _complete_execution(self, status: str, metrics: dict = None):
        """Complete execution record."""
        if not self.execution_id:
            return
        
        await self.supabase.update(
            "agent_executions",
            filters={"id": self.execution_id},
            data={
                "status": status,
                "completed_at": datetime.utcnow().isoformat(),
                "metrics": metrics or {}
            }
        )
    
    def _parse_slug_from_output(self, output: str) -> Optional[str]:
        """Parse slug from generate_blog_supabase.py output."""
        # Look for [COMPLETE] {slug}.md pattern
        match = re.search(r'\[COMPLETE\]\s+([a-z0-9-]+)\.md', output)
        if match:
            return match.group(1)
        
        # Alternative: look for "View at: {url}/blog/{slug}"
        match = re.search(r'/blog/([a-z0-9-]+)', output)
        if match:
            return match.group(1)
        
        return None

async def main():
    parser = argparse.ArgumentParser(description="Blog Generation Agent")
    parser.add_argument("--niche", required=True, choices=["Dentists", "Property", "Medical", "Solicitors"])
    parser.add_argument("--max-posts", type=int, default=1)
    args = parser.parse_args()
    
    agent = BlogGenerationAgent(args.niche)
    await agent.generate(max_posts=args.max_posts)

if __name__ == "__main__":
    asyncio.run(main())
