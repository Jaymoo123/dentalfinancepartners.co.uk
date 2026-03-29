"""
Content Research Agent - Discovers and populates blog topics.
Uses Google Trends, Reddit, and SERP analysis to find trending topics.
"""
import os
import sys
import asyncio
import argparse
import re
from datetime import datetime
from typing import List, Dict, Optional
from anthropic import Anthropic

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from agents.config.agent_config import NICHE_CONFIG, ACTIVE_NICHES
from agents.config.cost_limits import RATE_LIMITS
from agents.config.research_sources import REDDIT_CONFIG, GOOGLE_TRENDS_CONFIG
from agents.utils.supabase_client import SupabaseClient
from agents.utils.cost_tracker import CostTracker
from agents.utils.error_handler import ErrorHandler
from agents.utils.deduplication_checker import DeduplicationChecker
from agents.utils.alerting import send_alert
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

class ContentResearchAgent:
    def __init__(self, niche: str):
        self.niche = niche
        self.niche_config = NICHE_CONFIG[niche]
        
        # Initialize utilities
        self.supabase = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
        self.cost_tracker = CostTracker(self.supabase)
        self.error_handler = ErrorHandler(self.supabase)
        self.anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        self.dedup_checker = DeduplicationChecker(
            self.supabase,
            os.getenv("ANTHROPIC_API_KEY")
        )
        
        self.execution_id = None
    
    async def research_topics(self):
        """
        DEPRECATED: This agent now only triggers keyword tree rebuild when needed.
        Daily reactive research has been replaced with monthly keyword-driven strategy.
        """
        print(f"=== Content Research Agent: {self.niche} ===")
        print("NOTE: This agent is deprecated. Use keyword_topic_tree_builder.py for topic management.")
        
        try:
            self.execution_id = await self._start_execution()
            
            unused_count = await self._get_unused_topic_count()
            print(f"Current unused topics: {unused_count}")
            
            if unused_count >= 5:
                print("Topic inventory sufficient. Skipping research.")
                await self._complete_execution("skipped_sufficient_topics", {
                    "unused_count": unused_count,
                    "note": "Use keyword_topic_tree_builder.py for monthly refresh"
                })
                return
            
            last_refresh = await self._get_last_keyword_refresh_date()
            if last_refresh:
                days_since = (datetime.now() - last_refresh).days
                if days_since < 30:
                    print(f"Monthly keyword refresh not due yet ({days_since} days since last refresh)")
                    await self._complete_execution("skipped_not_due", {
                        "days_since_refresh": days_since,
                        "unused_count": unused_count
                    })
                    return
            
            print("CRITICAL: Topic inventory low and refresh due.")
            print("ACTION REQUIRED: Run 'python agents/keyword_topic_tree_builder.py --niche {self.niche}'")
            
            await self._complete_execution("manual_action_required", {
                "unused_count": unused_count,
                "action": f"Run keyword_topic_tree_builder.py --niche {self.niche}"
            })
            
        except Exception as e:
            await self.error_handler.handle_error(e, {
                "execution_id": self.execution_id,
                "agent_type": "content_research",
                "niche": self.niche
            })
    
    async def _research_topics_with_claude(self) -> List[Dict]:
        """Use Claude to generate relevant blog topics, avoiding recent topics."""
        # Get niche-specific context
        if self.niche == "Dentists":
            audience = "UK dentists (associates, practice owners, multi-site groups)"
            categories = ["Associate tax", "Practice finance", "Buying a practice", "Practice accounting", "VAT & compliance"]
        elif self.niche == "Property":
            audience = "UK landlords (individual landlords, portfolio owners, property investors)"
            categories = ["Landlord tax", "Property finance", "Buy-to-let accounting", "Capital gains tax", "Property compliance"]
        else:
            audience = "UK professionals"
            categories = ["General accounting"]
        
        # OPTION 3: Get recent topics to avoid
        recent_topics = await self.supabase.select(
            self.niche_config["blog_topics_table"],
            order="created_at.desc",
            limit=20
        )
        
        recent_topic_list = [t["topic"] for t in recent_topics] if recent_topics else []
        
        # Build prompt with recent topics to avoid
        avoid_section = ""
        if recent_topic_list:
            avoid_section = f"""
AVOID these recently covered topics:
{chr(10).join(f'- {t}' for t in recent_topic_list)}
"""
        
        prompt = f"""Generate 5 high-value blog topic ideas for {audience}.

Target audience: {audience}
Categories: {', '.join(categories)}
{avoid_section}
Requirements:
- Topics should be specific, actionable, and SEO-friendly
- Focus on UK tax/accounting questions this audience actually searches for
- Include current 2026 tax year considerations where relevant
- Topics MUST be DIFFERENT from any listed above
- Focus on unique angles, specific scenarios, or emerging issues

For each topic, provide:
1. Main topic (the primary keyword phrase)
2. 3 secondary keywords
3. Category (from the list above)
4. Priority (1-10, where 10 is most important/timely)

Return ONLY valid JSON in this exact format:
[
  {{
    "topic": "main keyword phrase here",
    "secondary_keyword_1": "keyword 1",
    "secondary_keyword_2": "keyword 2",
    "secondary_keyword_3": "keyword 3",
    "category": "category name",
    "priority": 8
  }}
]"""

        message = await asyncio.to_thread(
            self.anthropic.messages.create,
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            messages=[{"role": "user", "content": prompt}]
        )
        
        # Parse JSON response
        import json
        response_text = message.content[0].text.strip()
        
        # Extract JSON from response (in case Claude adds explanation)
        json_match = re.search(r'\[.*\]', response_text, re.DOTALL)
        if json_match:
            topics = json.loads(json_match.group(0))
            return topics
        
        return []
    
    async def _insert_topics(self, topics: List[Dict]) -> tuple[int, int]:
        """
        Insert topics into Supabase, filtering duplicates.
        Returns (inserted_count, duplicate_count).
        """
        inserted_count = 0
        duplicate_count = 0
        
        for topic in topics:
            # OPTION 1: Check if topic is duplicate before inserting
            is_duplicate, similar_slug = await self.dedup_checker.check_duplicate_topic(
                topic["topic"],
                self.niche
            )
            
            if is_duplicate:
                print(f"   SKIP: Duplicate topic: '{topic['topic']}' (similar to: {similar_slug})")
                duplicate_count += 1
                continue
            
            try:
                await self.supabase.insert(
                    self.niche_config["blog_topics_table"],
                    {
                        "topic": topic["topic"],
                        "secondary_keyword_1": topic.get("secondary_keyword_1"),
                        "secondary_keyword_2": topic.get("secondary_keyword_2"),
                        "secondary_keyword_3": topic.get("secondary_keyword_3"),
                        "category": topic.get("category"),
                        "priority": topic.get("priority", 5),
                        "used": False,
                        "created_at": datetime.utcnow().isoformat()
                    }
                )
                print(f"   OK: Added: '{topic['topic']}'")
                inserted_count += 1
            except Exception as e:
                print(f"   ERROR: Failed to insert topic '{topic['topic']}': {e}")
        
        return inserted_count, duplicate_count
    
    async def _get_unused_topic_count(self) -> int:
        """Get count of unused topics."""
        topics = await self.supabase.select(
            self.niche_config["blog_topics_table"],
            filters={"used": False}
        )
        return len(topics)
    
    async def _get_last_keyword_refresh_date(self) -> Optional[datetime]:
        """Get date of last keyword tree build."""
        executions = await self.supabase.select(
            "agent_executions",
            filters={"agent_type": "keyword_tree_builder", "niche": self.niche},
            order="started_at.desc",
            limit=1
        )
        
        if executions and executions[0].get("started_at"):
            return datetime.fromisoformat(executions[0]["started_at"].replace('Z', '+00:00'))
        return None
    
    async def _start_execution(self) -> str:
        """Start execution record."""
        result = await self.supabase.insert("agent_executions", {
            "agent_type": "content_research",
            "niche": self.niche,
            "status": "running",
            "started_at": datetime.utcnow().isoformat()
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

async def main():
    parser = argparse.ArgumentParser(description="Content Research Agent")
    parser.add_argument("--niche", choices=ACTIVE_NICHES, help="Specific niche to research")
    args = parser.parse_args()
    
    if args.niche:
        # Research for specific niche
        agent = ContentResearchAgent(args.niche)
        await agent.research_topics()
    else:
        # Research for all active niches
        for niche in ACTIVE_NICHES:
            if NICHE_CONFIG[niche]["enabled"]:
                agent = ContentResearchAgent(niche)
                await agent.research_topics()

if __name__ == "__main__":
    asyncio.run(main())
