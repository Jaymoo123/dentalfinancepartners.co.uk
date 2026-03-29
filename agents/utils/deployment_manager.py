"""
Deployment Manager - Verifies deployments and handles rollback.
"""
import asyncio
import subprocess
import httpx
from datetime import datetime
from typing import Optional
from agents.utils.alerting import send_alert

class DeploymentManager:
    def __init__(self, niche: str, niche_path: str, site_url: str):
        self.niche = niche
        self.niche_path = niche_path
        self.site_url = site_url
    
    async def deploy_and_verify(self, slug: str) -> bool:
        """
        Deploy to Vercel and verify success.
        Returns True if deployment successful, False otherwise.
        """
        print(f"Deploying {self.niche} to Vercel...")
        
        # 1. Deploy to Vercel
        deploy_success = await self._deploy_to_vercel()
        
        if not deploy_success:
            await send_alert(
                f"❌ Vercel deployment failed for {self.niche}",
                priority="high"
            )
            return False
        
        # 2. Wait for deployment to propagate (30 seconds)
        print("Waiting for deployment to propagate...")
        await asyncio.sleep(30)
        
        # 3. Verify deployment
        verify_success = await self._verify_deployment(slug)
        
        if not verify_success:
            await send_alert(
                f"⚠️ Deployment verification failed for {self.niche}/{slug}",
                priority="high"
            )
            return False
        
        print(f"✅ Deployment verified: {self.site_url}/blog/{slug}")
        return True
    
    async def _deploy_to_vercel(self) -> bool:
        """Deploy to Vercel using CLI."""
        try:
            # Check if Vercel CLI is available
            result = subprocess.run(
                ["vercel", "--version"],
                capture_output=True,
                text=True,
                timeout=10
            )
            
            if result.returncode != 0:
                print("Vercel CLI not found. Skipping deployment.")
                return True  # Don't fail if CLI not available (local testing)
            
            # Deploy to production
            result = subprocess.run(
                [
                    "vercel",
                    "deploy",
                    "--prod",
                    "--cwd", f"{self.niche_path}/web",
                    "--yes"
                ],
                capture_output=True,
                text=True,
                timeout=300,  # 5 minutes
                env={
                    **subprocess.os.environ,
                    "VERCEL_TOKEN": subprocess.os.getenv("VERCEL_TOKEN", ""),
                }
            )
            
            if result.returncode != 0:
                print(f"Deployment failed: {result.stderr}")
                return False
            
            print("Deployment successful")
            return True
            
        except subprocess.TimeoutExpired:
            print("Deployment timed out")
            return False
        except Exception as e:
            print(f"Deployment error: {e}")
            return False
    
    async def _verify_deployment(self, slug: str) -> bool:
        """Verify the new blog post is accessible."""
        url = f"{self.site_url}/blog/{slug}"
        
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.get(url)
                
                if response.status_code == 200:
                    # Check if content contains the slug (basic verification)
                    if slug.replace("-", " ") in response.text.lower():
                        return True
                    else:
                        print(f"Page loaded but content not found: {url}")
                        return False
                else:
                    print(f"Page returned {response.status_code}: {url}")
                    return False
                    
        except Exception as e:
            print(f"Verification failed: {e}")
            return False
    
    async def rollback_commit(self, commit_message: str) -> bool:
        """
        Rollback the last Git commit.
        Only use if deployment verification fails.
        """
        try:
            # Revert last commit
            result = subprocess.run(
                ["git", "reset", "--soft", "HEAD~1"],
                capture_output=True,
                text=True,
                timeout=10
            )
            
            if result.returncode == 0:
                print("Git commit rolled back")
                await send_alert(
                    f"⚠️ Rolled back commit for {self.niche}: {commit_message}",
                    priority="medium"
                )
                return True
            else:
                print(f"Rollback failed: {result.stderr}")
                return False
                
        except Exception as e:
            print(f"Rollback error: {e}")
            return False
