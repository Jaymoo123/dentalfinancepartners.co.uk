"""
Deployment Agent - Handles deploying content from Supabase to file system and Vercel.
Separates content generation from deployment for better reliability and cost control.
"""
import os
import sys
import asyncio
import subprocess
import argparse
from datetime import datetime
from pathlib import Path
from typing import Optional

# Add parent directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from agents.config.agent_config import NICHE_CONFIG, PROJECT_ROOT
from agents.utils.supabase_client import SupabaseClient
from agents.utils.error_handler import ErrorHandler
from agents.utils.alerting import send_alert
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

class DeploymentAgent:
    def __init__(self, niche: str):
        self.niche = niche
        self.niche_config = NICHE_CONFIG[niche]
        self.niche_path = os.path.join(PROJECT_ROOT, niche)
        
        # Initialize utilities
        self.supabase = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
        self.error_handler = ErrorHandler(self.supabase)
        
        self.execution_id = None
    
    async def deploy_pending_content(self, max_deployments: int = 10):
        """Deploy all pending content from Supabase to file system and Vercel."""
        print(f"=== Deployment Agent: {self.niche} ===")
        
        # Get pending content from Supabase
        pending = await self.supabase.select(
            "published_content",
            filters={
                "niche": self.niche,
                "deployment_status": "pending"
            },
            order="published_at.asc",
            limit=max_deployments
        )
        
        if not pending:
            print("No pending content to deploy")
            return
        
        print(f"Found {len(pending)} pending content items")
        deployed_count = 0
        
        for content_item in pending:
            success = await self._deploy_single_content(content_item)
            if success:
                deployed_count += 1
        
        print(f"Deployed {deployed_count}/{len(pending)} items for {self.niche}")
    
    async def _deploy_single_content(self, content_item: dict) -> bool:
        """Deploy a single content item from Supabase."""
        slug = content_item["slug"]
        
        try:
            # Create execution record
            self.execution_id = await self._start_execution(slug)
            
            # 1. Write content to file system
            content_path = os.path.join(
                self.niche_path,
                "web/content/blog",
                f"{slug}.md"
            )
            
            # Ensure directory exists
            os.makedirs(os.path.dirname(content_path), exist_ok=True)
            
            # Write content from Supabase to file
            with open(content_path, "w", encoding="utf-8") as f:
                f.write(content_item["full_content"])
            
            print(f"  Written to file: {slug}.md")
            
            # 2. Update deployment status to 'deploying'
            await self.supabase.update(
                "published_content",
                filters={"id": content_item["id"]},
                data={
                    "deployment_status": "deploying",
                    "last_deployment_attempt": datetime.utcnow().isoformat()
                }
            )
            
            # 3. Git operations happen in GitHub Actions workflow
            # (This agent just prepares the file, the workflow commits/pushes)
            
            # 4. Mark as deployed (GitHub Actions will handle actual push)
            await self.supabase.update(
                "published_content",
                filters={"id": content_item["id"]},
                data={
                    "deployment_status": "deployed",
                    "deployment_error": None
                }
            )
            
            # 5. Mark topic as used
            await self.supabase.update(
                self.niche_config["blog_topics_table"],
                filters={"topic": content_item["topic"]},
                data={"used": True}
            )
            
            # 6. Complete execution
            await self._complete_execution("completed", {
                "slug": slug,
                "content_id": content_item["id"]
            })
            
            print(f"  Deployed: {slug}")
            return True
            
        except Exception as e:
            # Log deployment failure but keep content in Supabase for retry
            await self.supabase.update(
                "published_content",
                filters={"id": content_item["id"]},
                data={
                    "deployment_status": "failed",
                    "deployment_error": str(e),
                    "last_deployment_attempt": datetime.utcnow().isoformat()
                }
            )
            
            await self.error_handler.handle_error(e, {
                "execution_id": self.execution_id,
                "agent_type": "deployment",
                "niche": self.niche,
                "slug": slug
            })
            
            print(f"  Deployment failed: {slug} - {str(e)}")
            return False
    
    async def _start_execution(self, slug: str) -> str:
        """Start execution record in Supabase."""
        result = await self.supabase.insert("agent_executions", {
            "agent_type": "deployment",
            "niche": self.niche,
            "status": "running",
            "started_at": datetime.utcnow().isoformat(),
            "metrics": {"slug": slug}
        })
        
        return result["id"]
    
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
        """Extract slug from script output."""
        for line in output.split("\n"):
            if "Generated blog:" in line or "Slug:" in line:
                parts = line.split(":")
                if len(parts) > 1:
                    return parts[-1].strip()
        return None

async def main():
    parser = argparse.ArgumentParser(description="Deploy content from Supabase")
    parser.add_argument("--niche", required=True, choices=list(NICHE_CONFIG.keys()))
    parser.add_argument("--max-deployments", type=int, default=10)
    
    args = parser.parse_args()
    
    agent = DeploymentAgent(args.niche)
    await agent.deploy_pending_content(args.max_deployments)

if __name__ == "__main__":
    asyncio.run(main())
