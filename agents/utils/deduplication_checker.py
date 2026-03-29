"""
Deduplication system for blog topics and content.
"""
import os
from datetime import datetime, timedelta
from typing import Optional
from anthropic import Anthropic
from agents.config.cost_limits import QUALITY_THRESHOLDS
from agents.utils.supabase_client import SupabaseClient
from agents.utils.quality_checker import QualityChecker

class DeduplicationChecker:
    def __init__(self, supabase: SupabaseClient, anthropic_api_key: str):
        self.supabase = supabase
        self.anthropic = Anthropic(api_key=anthropic_api_key)
        self.similarity_threshold = QUALITY_THRESHOLDS["duplicate_similarity_threshold"]
    
    async def check_duplicate_topic(self, topic: str, niche: str) -> tuple[bool, Optional[str]]:
        """
        Check if topic is duplicate/too similar to existing content.
        Returns (is_duplicate, similar_post_slug)
        """
        # 1. Get all published content for this niche
        published = await self.supabase.select(
            "published_content",
            filters={"niche": niche}
        )
        
        if not published:
            return False, None
        
        # 2. Check semantic similarity with Claude
        for post in published:
            similarity = await self._calculate_similarity(topic, post["topic"])
            
            if similarity > self.similarity_threshold:
                return True, post["slug"]
        
        return False, None
    
    async def check_recent_use(self, topic: str, niche: str, days: int = 90) -> bool:
        """Check if topic was used recently."""
        cutoff_date = datetime.utcnow() - timedelta(days=days)
        
        published = await self.supabase.select(
            "published_content",
            filters={
                "niche": niche,
                "published_at": f"gte.{cutoff_date.isoformat()}"
            }
        )
        
        for post in published:
            if topic.lower() in post["topic"].lower() or post["topic"].lower() in topic.lower():
                return True
        
        return False
    
    async def check_content_hash(self, content_hash: str, niche: str) -> bool:
        """Check for exact content duplicate using hash."""
        existing = await self.supabase.select(
            "published_content",
            filters={
                "niche": niche,
                "content_hash": content_hash
            }
        )
        
        return len(existing) > 0
    
    async def register_content(self, niche: str, slug: str, title: str, 
                              topic: str, content: str, word_count: int):
        """Register newly published content for future duplicate checking."""
        content_hash = QualityChecker.calculate_content_hash(content)
        
        await self.supabase.insert("published_content", {
            "niche": niche,
            "slug": slug,
            "title": title,
            "topic": topic,
            "published_at": datetime.utcnow().isoformat(),
            "word_count": word_count,
            "content_hash": content_hash
        })
    
    async def _calculate_similarity(self, topic1: str, topic2: str) -> float:
        """
        Use Claude to calculate semantic similarity between two topics.
        Returns float between 0.0 (different) and 1.0 (identical).
        """
        prompt = f"""Rate the similarity between these two blog topics on a scale of 0.0 to 1.0:

Topic 1: {topic1}
Topic 2: {topic2}

IMPORTANT: Topics are duplicates ONLY if they serve the SAME user search intent and cover the SAME specific angle.

Topics covering the same broad subject but with different angles, audiences, formats, or use cases are NOT duplicates.

Examples of TRUE duplicates (score 0.95+):
- "Dental practice tax planning" vs "Tax planning for dental practices" = 0.95
- "Section 24 calculator" vs "Calculate Section 24 costs" = 0.98

Examples of RELATED but NOT duplicates (score 0.70-0.85):
- "Section 24 calculator" vs "Section 24 for basic rate taxpayers" = 0.75 (calculator vs audience guide)
- "MTD software comparison" vs "MTD threshold and exemptions" = 0.70 (software vs compliance)
- "Incorporation case study" vs "Incorporation phased approach" = 0.80 (case study vs implementation guide)

Examples of DIFFERENT topics (score <0.60):
- "Associate dentist expenses" vs "Practice owner expenses" = 0.60
- "Landlord tax return" vs "Property capital gains tax" = 0.40

Return ONLY a number between 0.0 and 1.0, nothing else."""

        try:
            message = self.anthropic.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=10,
                messages=[{"role": "user", "content": prompt}]
            )
            
            similarity_text = message.content[0].text.strip()
            return float(similarity_text)
        except Exception as e:
            print(f"Similarity check failed: {e}")
            return 0.0  # Assume not duplicate on error
