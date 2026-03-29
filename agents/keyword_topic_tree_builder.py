"""
Keyword Topic Tree Builder - Generates structured topic trees from keyword research.
Replaces reactive daily research with proactive keyword-driven content strategy.
"""
import os
import sys
import asyncio
import argparse
import json
import traceback
from datetime import datetime
from typing import List, Dict, Optional
from anthropic import Anthropic

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from agents.config.agent_config import NICHE_CONFIG, ACTIVE_NICHES
from agents.utils.supabase_client import SupabaseClient
from agents.utils.cost_tracker import CostTracker
from agents.utils.error_handler import ErrorHandler
from agents.utils.keyword_analyzer import KeywordAnalyzer
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY


class KeywordTopicTreeBuilder:
    def __init__(self, niche: str):
        self.niche = niche
        self.niche_config = NICHE_CONFIG[niche]
        
        self.supabase = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
        self.cost_tracker = CostTracker(self.supabase)
        self.error_handler = ErrorHandler(self.supabase)
        self.anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        
        csv_path = self._get_csv_path()
        self.keyword_analyzer = KeywordAnalyzer(csv_path)
        
        self.execution_id = None
    
    def _get_csv_path(self) -> str:
        """Get path to keyword research CSV for this niche."""
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        
        if self.niche == "Property":
            return os.path.join(base_dir, "Property", "keyword_research_property.csv")
        elif self.niche == "Dentists":
            return os.path.join(base_dir, "Dentists", "keyword_research_dentists.csv")
        else:
            raise ValueError(f"Unknown niche: {self.niche}")
    
    async def build_topic_tree(self):
        """Build complete topic tree from keyword research."""
        print(f"=== Keyword Topic Tree Builder: {self.niche} ===")
        
        try:
            self.execution_id = await self._start_execution()
            
            if not await self.cost_tracker.check_budget("keyword_tree_build"):
                await self._complete_execution("budget_exceeded")
                return
            
            keywords = self.keyword_analyzer.get_all_keywords()
            print(f"Loaded {len(keywords)} keywords from CSV")
            
            existing_topics = await self._get_existing_topics()
            print(f"Found {len(existing_topics)} existing topics in database")
            
            topic_tree = await self._generate_topic_tree_with_claude(keywords, existing_topics)
            
            if not topic_tree:
                print("Failed to generate topic tree")
                await self._complete_execution("failed")
                return
            
            merged_count, new_count, archived_count = await self._merge_topics(
                topic_tree, existing_topics
            )
            
            await self.cost_tracker.log_cost("keyword_tree_build", self.niche)
            
            await self._complete_execution("completed", {
                "keywords_analyzed": len(keywords),
                "pillars_created": len(topic_tree.get("pillars", [])),
                "topics_merged": merged_count,
                "topics_new": new_count,
                "topics_archived": archived_count
            })
            
            print(f"SUCCESS: Built topic tree - {merged_count} merged, {new_count} new, {archived_count} archived")
            
        except Exception as e:
            print(f"ERROR: {type(e).__name__}: {str(e)}")
            traceback.print_exc()
            await self.error_handler.handle_error(e, {
                "execution_id": self.execution_id,
                "agent_type": "keyword_tree_builder",
                "niche": self.niche
            })
    
    async def _generate_topic_tree_with_claude(
        self, keywords: List[Dict], existing_topics: List[Dict]
    ) -> Dict:
        """Use Claude to organize keywords into pillar-cluster architecture."""
        
        existing_topic_list = [t["topic"] for t in existing_topics]
        
        prompt = f"""You are an SEO content strategist. Analyze these keywords and create a topic tree using pillar-cluster architecture.

KEYWORD DATA:
{json.dumps(keywords, indent=2)}

EXISTING TOPICS (to merge/archive):
{json.dumps(existing_topic_list, indent=2)}

TASK:
1. Identify 3-5 PILLAR topics (high search volume, broad topics that can link to many clusters)
2. For each pillar, identify 5-10 CLUSTER topics (related keywords, easier to rank)
3. For existing topics: match them to keywords and mark as "merge" or "archive"
4. Calculate priority (1-10) for each topic based on:
   - Keyword difficulty (easier = higher priority initially to build authority)
   - Search volume (higher = higher priority)
   - User journey stage (awareness topics first, then consideration, then decision)
   - Strategic value (pillar > cluster > supporting)

PRIORITY STRATEGY:
- Start with easy wins (difficulty 25-35, medium volume) = priority 8-9
- Then tackle high-volume medium-difficulty (difficulty 35-45, high volume) = priority 7-8
- Save hard topics for later (difficulty 45+) = priority 4-6
- Pillar topics always get +1 priority boost

OUTPUT FORMAT (valid JSON only):
{{
  "pillars": [
    {{
      "pillar_topic": "Section 24 Tax Relief for Landlords: Complete Guide",
      "pillar_keyword": "section 24",
      "search_volume": 1900,
      "difficulty": 45,
      "priority": 9,
      "intent": "informational",
      "category": "Section 24 & Tax Relief",
      "content_tier": "pillar",
      "clusters": [
        {{
          "topic": "Section 24 Calculator: Calculate Your Tax Impact",
          "primary_keyword": "section 24 calculator",
          "secondary_keywords": ["section 24 tax calculator", "mortgage interest relief calculator", "section 24 relief calculator"],
          "search_volume": 1900,
          "difficulty": 48,
          "priority": 8,
          "intent": "transactional",
          "category": "Section 24 & Tax Relief",
          "content_tier": "cluster",
          "pillar_topic": "Section 24 Tax Relief for Landlords: Complete Guide"
        }}
      ]
    }}
  ],
  "existing_topic_actions": [
    {{
      "topic": "Section 24 relief: how much can I claim in 2026?",
      "action": "merge",
      "matched_keyword": "section 24 relief claim",
      "reason": "Matches keyword intent, enrich with keyword data"
    }},
    {{
      "topic": "Random topic not in keyword research",
      "action": "archive",
      "reason": "No keyword match, low strategic value"
    }}
  ]
}}

Return ONLY valid JSON, no other text."""
        
        try:
            message = self.anthropic.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=8000,
                messages=[{"role": "user", "content": prompt}]
            )
            
            response_text = message.content[0].text.strip()
            
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.startswith("```"):
                response_text = response_text[3:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            
            topic_tree = json.loads(response_text.strip())
            return topic_tree
            
        except Exception as e:
            print(f"Failed to generate topic tree: {e}")
            return {}
    
    async def _merge_topics(
        self, topic_tree: Dict, existing_topics: List[Dict]
    ) -> tuple[int, int, int]:
        """
        Merge new topic tree with existing topics.
        Returns (merged_count, new_count, archived_count)
        """
        merged_count = 0
        new_count = 0
        archived_count = 0
        
        existing_actions = {
            action["topic"]: action 
            for action in topic_tree.get("existing_topic_actions", [])
        }
        
        for existing in existing_topics:
            topic_text = existing["topic"]
            action_data = existing_actions.get(topic_text)
            
            if action_data and action_data["action"] == "merge":
                matched_kw = next(
                    (kw for kw in self.keyword_analyzer.get_all_keywords() 
                     if kw["keyword"] == action_data.get("matched_keyword")),
                    None
                )
                
                if matched_kw:
                    await self._enrich_existing_topic(existing["id"], matched_kw)
                    merged_count += 1
                    print(f"  Merged: {topic_text}")
            
            elif action_data and action_data["action"] == "archive":
                await self._archive_topic(existing["id"])
                archived_count += 1
                print(f"  Archived: {topic_text}")
            
            else:
                matched_kw = self.keyword_analyzer.find_similar_keyword(topic_text)
                if matched_kw:
                    await self._enrich_existing_topic(existing["id"], matched_kw)
                    merged_count += 1
                    print(f"  Auto-merged: {topic_text}")
                else:
                    await self._archive_topic(existing["id"])
                    archived_count += 1
                    print(f"  Auto-archived: {topic_text}")
        
        for pillar_data in topic_tree.get("pillars", []):
            pillar_id = await self._insert_pillar(pillar_data)
            new_count += 1
            print(f"  Created pillar: {pillar_data['pillar_topic']}")
            
            for cluster in pillar_data.get("clusters", []):
                cluster["pillar_id"] = pillar_id
                await self._insert_cluster(cluster)
                new_count += 1
                print(f"    Created cluster: {cluster['topic']}")
        
        return merged_count, new_count, archived_count
    
    async def _insert_pillar(self, pillar_data: Dict) -> str:
        """Insert a pillar topic and return its ID."""
        table = self.niche_config["blog_topics_table"]
        
        record = {
            "topic": pillar_data["pillar_topic"],
            "category": pillar_data["category"],
            "priority": pillar_data["priority"] if self.niche == "Dentists" else str(pillar_data["priority"]),
            "primary_keyword": pillar_data["pillar_keyword"],
            "content_tier": "pillar",
            "keyword_difficulty": pillar_data["difficulty"],
            "user_intent": pillar_data["intent"],
            "target_search_volume": pillar_data["search_volume"],
            "publish_priority": pillar_data["priority"],
            "keyword_source": "csv",
            "used": False,
            "created_at": datetime.now(datetime.UTC).isoformat() if hasattr(datetime, 'UTC') else datetime.utcnow().isoformat()
        }
        
        if self.niche == "Property":
            record["secondary_keywords"] = []
        
        result = await self.supabase.insert(table, record)
        if isinstance(result, dict):
            return result.get("id")
        elif isinstance(result, list) and len(result) > 0:
            return result[0].get("id")
        return None
    
    async def _insert_cluster(self, cluster_data: Dict):
        """Insert a cluster topic."""
        table = self.niche_config["blog_topics_table"]
        
        record = {
            "topic": cluster_data["topic"],
            "category": cluster_data["category"],
            "priority": cluster_data["priority"] if self.niche == "Dentists" else str(cluster_data["priority"]),
            "primary_keyword": cluster_data["primary_keyword"],
            "content_tier": "cluster",
            "pillar_topic": cluster_data.get("pillar_topic"),
            "keyword_difficulty": cluster_data["difficulty"],
            "user_intent": cluster_data["intent"],
            "target_search_volume": cluster_data["search_volume"],
            "publish_priority": cluster_data["priority"],
            "keyword_source": "csv",
            "used": False,
            "created_at": datetime.now(datetime.UTC).isoformat() if hasattr(datetime, 'UTC') else datetime.utcnow().isoformat()
        }
        
        if self.niche == "Property":
            record["secondary_keywords"] = cluster_data.get("secondary_keywords", [])
        else:
            secondary_kws = cluster_data.get("secondary_keywords", [])
            for i, kw in enumerate(secondary_kws[:10], 1):
                record[f"secondary_keyword_{i}"] = kw
        
        await self.supabase.insert(table, record)
    
    async def _enrich_existing_topic(self, topic_id: str, keyword_data: Dict):
        """Enrich an existing topic with keyword data."""
        table = self.niche_config["blog_topics_table"]
        
        priority = self.keyword_analyzer.calculate_priority(keyword_data)
        
        updates = {
            "primary_keyword": keyword_data["keyword"],
            "keyword_difficulty": keyword_data["difficulty"],
            "user_intent": keyword_data["intent"],
            "target_search_volume": keyword_data["search_volume"],
            "publish_priority": priority,
            "keyword_source": "csv_merged"
        }
        
        if self.niche == "Property":
            updates["secondary_keywords"] = []
        
        await self.supabase.update(table, {"id": topic_id}, updates)
    
    async def _archive_topic(self, topic_id: str):
        """Archive a topic (mark as low priority, don't delete)."""
        table = self.niche_config["blog_topics_table"]
        
        updates = {
            "publish_priority": 1,
            "keyword_source": "archived"
        }
        
        await self.supabase.update(table, {"id": topic_id}, updates)
    
    async def _get_existing_topics(self) -> List[Dict]:
        """Get all existing topics from database."""
        table = self.niche_config["blog_topics_table"]
        return await self.supabase.select(table)
    
    async def _start_execution(self) -> str:
        """Create execution record."""
        record = {
            "agent_type": "keyword_tree_builder",
            "niche": self.niche,
            "status": "running",
            "started_at": datetime.now(datetime.UTC).isoformat() if hasattr(datetime, 'UTC') else datetime.utcnow().isoformat()
        }
        
        result = await self.supabase.insert("agent_executions", record)
        if isinstance(result, dict):
            return result.get("id")
        elif isinstance(result, list) and len(result) > 0:
            return result[0].get("id")
        return None
    
    async def _complete_execution(self, status: str, metrics: Optional[Dict] = None):
        """Complete execution record."""
        if not self.execution_id:
            return
        
        updates = {
            "status": status,
            "completed_at": datetime.now(datetime.UTC).isoformat() if hasattr(datetime, 'UTC') else datetime.utcnow().isoformat()
        }
        
        if metrics:
            updates["metrics"] = metrics
        
        await self.supabase.update("agent_executions", {"id": self.execution_id}, updates)


async def main():
    parser = argparse.ArgumentParser(description="Build keyword-driven topic tree")
    parser.add_argument(
        "--niche",
        choices=ACTIVE_NICHES,
        required=True,
        help="Niche to build topic tree for"
    )
    
    args = parser.parse_args()
    
    builder = KeywordTopicTreeBuilder(args.niche)
    await builder.build_topic_tree()


if __name__ == "__main__":
    asyncio.run(main())
