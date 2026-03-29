"""
Content Analyzer - Performs topic clustering, duplicate detection, and search intent analysis.
Helps organize content strategy and identify gaps/overlaps.
"""
import os
import sys
import asyncio
import json
from datetime import datetime
from typing import List, Dict, Tuple
from collections import defaultdict

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from agents.utils.supabase_client import SupabaseClient
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY
import anthropic

class ContentAnalyzer:
    def __init__(self):
        self.supabase = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
        self.anthropic = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    
    async def analyze_all_topics(self) -> Dict:
        """Comprehensive analysis of all topics across all niches."""
        print("=== Content Strategy Analyzer ===\n")
        
        # Get all topics
        all_topics = await self.supabase.select(
            "blog_topics",
            order="created_at.desc"
        )
        
        print(f"Analyzing {len(all_topics)} topics...\n")
        
        # 1. Cluster topics by theme
        clusters = await self._cluster_topics(all_topics)
        
        # 2. Identify potential duplicates
        duplicates = await self._find_near_duplicates(all_topics)
        
        # 3. Analyze search intent and commercial value
        intent_analysis = await self._analyze_search_intent(all_topics[:20])  # Sample
        
        # 4. Category distribution
        category_dist = self._analyze_categories(all_topics)
        
        # 5. Priority distribution
        priority_dist = self._analyze_priorities(all_topics)
        
        # Generate report
        report = {
            "total_topics": len(all_topics),
            "used_topics": len([t for t in all_topics if t.get("used")]),
            "unused_topics": len([t for t in all_topics if not t.get("used")]),
            "clusters": clusters,
            "potential_duplicates": duplicates,
            "category_distribution": category_dist,
            "priority_distribution": priority_dist,
            "search_intent_sample": intent_analysis,
            "generated_at": datetime.utcnow().isoformat()
        }
        
        return report
    
    async def _cluster_topics(self, topics: List[Dict]) -> Dict[str, List[str]]:
        """Use Claude to cluster topics into thematic branches."""
        topic_list = [t["topic"] for t in topics[:30]]  # Analyze recent topics
        
        prompt = f"""Analyze these dental blog topics and organize them into thematic clusters/branches.

Topics:
{chr(10).join(f'{i+1}. {t}' for i, t in enumerate(topic_list))}

Create 5-7 main content branches (e.g., "Tax Planning", "Practice Acquisition", "Associate Finances").
For each branch, list which topics belong to it.

Return ONLY valid JSON in this format:
{{
  "branches": [
    {{
      "name": "Branch Name",
      "description": "Brief description",
      "topics": ["Topic 1", "Topic 2"],
      "coverage_score": 8,
      "commercial_value": "high"
    }}
  ],
  "orphaned_topics": ["Topics that don't fit any branch"],
  "gaps": ["Missing topics that would complete the branches"]
}}

Coverage score: 1-10 (how well this branch is covered)
Commercial value: high/medium/low (lead generation potential)"""

        try:
            message = self.anthropic.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=2000,
                messages=[{"role": "user", "content": prompt}]
            )
            
            response_text = message.content[0].text.strip()
            # Extract JSON from markdown code blocks if present
            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0].strip()
            elif "```" in response_text:
                response_text = response_text.split("```")[1].split("```")[0].strip()
            
            return json.loads(response_text)
        except Exception as e:
            print(f"Clustering failed: {e}")
            return {"branches": [], "orphaned_topics": [], "gaps": []}
    
    async def _find_near_duplicates(self, topics: List[Dict]) -> List[Dict]:
        """Find topics that might be too similar."""
        duplicates = []
        checked_pairs = set()
        
        # Only check unused topics against each other
        unused = [t for t in topics if not t.get("used")]
        
        for i, topic1 in enumerate(unused[:15]):  # Limit to recent unused
            for topic2 in unused[i+1:i+6]:  # Check against next 5
                pair_key = tuple(sorted([topic1["topic"], topic2["topic"]]))
                if pair_key in checked_pairs:
                    continue
                checked_pairs.add(pair_key)
                
                similarity = await self._calculate_similarity(
                    topic1["topic"], 
                    topic2["topic"]
                )
                
                if similarity >= 0.75:  # High similarity threshold
                    duplicates.append({
                        "topic1": topic1["topic"],
                        "topic2": topic2["topic"],
                        "similarity": similarity,
                        "recommendation": "Consider merging or removing one"
                    })
        
        return duplicates
    
    async def _calculate_similarity(self, topic1: str, topic2: str) -> float:
        """Calculate semantic similarity between two topics."""
        prompt = f"""Rate similarity between these topics (0.0-1.0):

Topic 1: {topic1}
Topic 2: {topic2}

Return ONLY a number."""

        try:
            message = self.anthropic.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=10,
                messages=[{"role": "user", "content": prompt}]
            )
            return float(message.content[0].text.strip())
        except:
            return 0.0
    
    async def _analyze_search_intent(self, topics: List[Dict]) -> List[Dict]:
        """Analyze search intent and commercial value for sample topics."""
        sample_topics = [t["topic"] for t in topics[:10]]
        
        prompt = f"""Analyze these blog topics for search intent and lead generation value.

Topics:
{chr(10).join(f'{i+1}. {t}' for i, t in enumerate(sample_topics))}

For each topic, assess:
1. Search intent: informational / transactional / navigational
2. Search volume: high / medium / low (educated guess for UK dental market)
3. Lead quality: high / medium / low (likelihood of converting to client)
4. Urgency: high / medium / low (time-sensitive need)

Return ONLY valid JSON:
{{
  "topics": [
    {{
      "topic": "Topic text",
      "search_intent": "informational",
      "search_volume": "medium",
      "lead_quality": "high",
      "urgency": "low",
      "recommendation": "Keep/Deprioritize/Enhance"
    }}
  ]
}}"""

        try:
            message = self.anthropic.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=1500,
                messages=[{"role": "user", "content": prompt}]
            )
            
            response_text = message.content[0].text.strip()
            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0].strip()
            elif "```" in response_text:
                response_text = response_text.split("```")[1].split("```")[0].strip()
            
            return json.loads(response_text).get("topics", [])
        except Exception as e:
            print(f"Intent analysis failed: {e}")
            return []
    
    def _analyze_categories(self, topics: List[Dict]) -> Dict:
        """Analyze category distribution."""
        categories = defaultdict(int)
        for topic in topics:
            categories[topic.get("category", "Uncategorized")] += 1
        
        return dict(sorted(categories.items(), key=lambda x: x[1], reverse=True))
    
    def _analyze_priorities(self, topics: List[Dict]) -> Dict:
        """Analyze priority distribution."""
        priorities = defaultdict(int)
        for topic in topics:
            priorities[topic.get("priority", 0)] += 1
        
        return dict(sorted(priorities.items()))
    
    def print_report(self, report: Dict):
        """Print formatted analysis report."""
        print("\n" + "="*80)
        print("CONTENT STRATEGY ANALYSIS REPORT")
        print("="*80 + "\n")
        
        print(f"Total Topics: {report['total_topics']}")
        print(f"Used: {report['used_topics']} | Unused: {report['unused_topics']}\n")
        
        print("-" * 80)
        print("CONTENT BRANCHES (Thematic Clusters)")
        print("-" * 80)
        
        branches = report['clusters'].get('branches', [])
        for branch in branches:
            print(f"\n{branch['name']} (Coverage: {branch.get('coverage_score', 0)}/10, Value: {branch.get('commercial_value', 'unknown')})")
            print(f"  {branch.get('description', '')}")
            print(f"  Topics: {len(branch.get('topics', []))}")
            for topic in branch.get('topics', [])[:3]:
                print(f"    - {topic}")
            if len(branch.get('topics', [])) > 3:
                print(f"    ... and {len(branch['topics']) - 3} more")
        
        print("\n" + "-" * 80)
        print("CONTENT GAPS (Missing Topics)")
        print("-" * 80)
        for gap in report['clusters'].get('gaps', [])[:5]:
            print(f"  - {gap}")
        
        print("\n" + "-" * 80)
        print("POTENTIAL DUPLICATES")
        print("-" * 80)
        if report['potential_duplicates']:
            for dup in report['potential_duplicates']:
                print(f"\n  Similarity: {dup['similarity']:.2f}")
                print(f"    1. {dup['topic1']}")
                print(f"    2. {dup['topic2']}")
                print(f"    > {dup['recommendation']}")
        else:
            print("  No high-similarity duplicates found")
        
        print("\n" + "-" * 80)
        print("CATEGORY DISTRIBUTION")
        print("-" * 80)
        for cat, count in report['category_distribution'].items():
            bar = "#" * (count // 2)
            print(f"  {cat:30s} {bar} {count}")
        
        print("\n" + "-" * 80)
        print("SEARCH INTENT ANALYSIS (Sample)")
        print("-" * 80)
        for item in report['search_intent_sample'][:5]:
            print(f"\n  Topic: {item['topic'][:60]}...")
            print(f"    Intent: {item.get('search_intent', 'unknown'):15s} | Volume: {item.get('search_volume', 'unknown'):8s}")
            print(f"    Lead Quality: {item.get('lead_quality', 'unknown'):8s} | Urgency: {item.get('urgency', 'unknown'):8s}")
            print(f"    > {item.get('recommendation', 'No recommendation')}")
        
        print("\n" + "="*80 + "\n")

async def main():
    analyzer = ContentAnalyzer()
    report = await analyzer.analyze_all_topics()
    
    # Print to console
    analyzer.print_report(report)
    
    # Save to file
    output_path = os.path.join(
        os.path.dirname(__file__), 
        "..", 
        "..", 
        "content_strategy_analysis.json"
    )
    with open(output_path, "w") as f:
        json.dump(report, f, indent=2)
    
    print(f"Full report saved to: {output_path}")

if __name__ == "__main__":
    asyncio.run(main())
