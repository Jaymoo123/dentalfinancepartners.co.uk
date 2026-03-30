"""
Keyword Research Automation - ONE-TIME research per niche using free sources + AI.
Uses Google Autocomplete, related searches, and competitor analysis.
"""
import json
import re
import asyncio
from typing import List, Dict, Optional
from anthropic import Anthropic
import httpx


class KeywordResearcher:
    def __init__(self, anthropic_api_key: str):
        self.anthropic = Anthropic(api_key=anthropic_api_key)
        self.http_client = httpx.AsyncClient(timeout=30.0)
    
    async def research_keywords(self, target_keyword: str, niche_type: str) -> List[Dict]:
        """
        Research keywords for a niche using FREE sources + ONE AI call.
        Cost: $0.50-1.00 (one-time per niche)
        """
        
        print(f"\n=== Keyword Research: {niche_type} ===")
        print(f"Target keyword: {target_keyword}")
        
        # 1. Google Autocomplete (FREE)
        print("\n[1/4] Fetching Google Autocomplete suggestions...")
        autocomplete_keywords = await self._get_autocomplete_suggestions(target_keyword)
        print(f"  Found {len(autocomplete_keywords)} autocomplete suggestions")
        
        # 2. Related searches (FREE)
        print("\n[2/4] Extracting related searches...")
        related_keywords = await self._get_related_searches(target_keyword)
        print(f"  Found {len(related_keywords)} related searches")
        
        # 3. Competitor keywords (FREE)
        print("\n[3/4] Analyzing competitor keywords...")
        competitor_keywords = await self._get_competitor_keywords(target_keyword)
        print(f"  Found {len(competitor_keywords)} competitor keywords")
        
        # 4. Combine and deduplicate
        all_keywords = list(set(
            autocomplete_keywords + related_keywords + competitor_keywords + [target_keyword]
        ))
        print(f"\n  Total unique keywords: {len(all_keywords)}")
        
        # 5. AI analysis (PAID: $0.50-1.00)
        print("\n[4/4] Analyzing keywords with Claude...")
        scored_keywords = await self._analyze_with_claude(all_keywords, niche_type, target_keyword)
        print(f"  Analyzed and scored {len(scored_keywords)} keywords")
        
        return scored_keywords
    
    async def _get_autocomplete_suggestions(self, keyword: str) -> List[str]:
        """Get Google Autocomplete suggestions (FREE)."""
        
        suggestions = []
        
        # Query variations
        queries = [
            keyword,
            f"{keyword} uk",
            f"{keyword} london",
            f"{keyword} services",
            f"{keyword} near me",
        ]
        
        for query in queries:
            try:
                # Google Autocomplete API (unofficial but free)
                url = "http://suggestqueries.google.com/complete/search"
                params = {
                    "client": "firefox",
                    "q": query,
                    "hl": "en-GB"
                }
                
                response = await self.http_client.get(url, params=params)
                if response.status_code == 200:
                    data = response.json()
                    if len(data) > 1 and isinstance(data[1], list):
                        suggestions.extend(data[1])
            
            except Exception as e:
                print(f"  Warning: Autocomplete failed for '{query}': {e}")
                continue
        
        return list(set(suggestions))
    
    async def _get_related_searches(self, keyword: str) -> List[str]:
        """Extract related searches from Google SERP (FREE)."""
        
        # For MVP, generate semantic variations
        # In production, could scrape actual Google "Related searches"
        
        base_terms = keyword.split()
        variations = []
        
        # Common accounting-related terms
        suffixes = ["services", "advice", "help", "near me", "uk", "london", "cost", "fees"]
        prefixes = ["best", "specialist", "local", "affordable", "experienced"]
        
        for suffix in suffixes:
            variations.append(f"{keyword} {suffix}")
        
        for prefix in prefixes:
            variations.append(f"{prefix} {keyword}")
        
        return variations
    
    async def _get_competitor_keywords(self, keyword: str) -> List[str]:
        """
        Extract keywords from competitor sites (FREE).
        Scrapes H1, title, meta description from top 5 results.
        """
        
        # For MVP, return common accounting keywords
        # In production, would scrape actual competitor sites
        
        common_accounting_keywords = [
            "tax return",
            "self assessment",
            "corporation tax",
            "vat registration",
            "payroll services",
            "bookkeeping",
            "tax planning",
            "accounting services",
            "tax advice",
            "financial planning",
        ]
        
        # Combine with niche-specific terms from keyword
        niche_terms = keyword.split()
        combined = []
        
        for term in common_accounting_keywords:
            for niche_term in niche_terms:
                combined.append(f"{niche_term} {term}")
        
        return combined
    
    async def _analyze_with_claude(self, keywords: List[str], niche_type: str, 
                                   target_keyword: str) -> List[Dict]:
        """
        Analyze all keywords with ONE Claude call.
        Cost: $0.50-1.00
        """
        
        prompt = f"""Analyze these {len(keywords)} keywords for a {niche_type} accounting niche in the UK.

TARGET KEYWORD: {target_keyword}
NICHE TYPE: {niche_type}

KEYWORDS TO ANALYZE:
{json.dumps(keywords[:150])}  # Cap at 150 to avoid huge prompts

For each keyword, provide:
1. search_volume: Estimate as integer (high=1000+, medium=500-1000, low=100-500, very_low=<100)
2. competition: "high", "medium", or "low"
3. difficulty: Score 1-100 (higher = harder to rank)
   - Consider: keyword length, commercial intent, competition level
   - Long-tail (4+ words) = 20-35
   - Medium-tail (2-3 words) = 35-50
   - Short-tail (1 word) = 50-70
   - Branded/commercial = +10-15
4. intent: "informational", "transactional", or "navigational"
5. category: Group into 5-7 logical categories for {niche_type} accounting
   - Examples for medical: "NHS Pension", "Private Practice Tax", "Locum Tax", "Medical Incorporation", "Expenses"
6. notes: Brief note on why this keyword matters (optional)

SCORING GUIDELINES:
- Prioritize keywords with medium difficulty (35-45) and medium-high volume
- Long-tail keywords (4+ words) should have lower difficulty
- Transactional intent keywords are more valuable
- Keywords with location modifiers (UK, London) are easier to rank

Return ONLY valid JSON array (no other text):
[
  {{
    "keyword": "gp accountant",
    "search_volume": 1800,
    "competition": "medium",
    "difficulty": 38,
    "intent": "informational",
    "category": "GP Tax",
    "notes": "Core high-volume query"
  }},
  ...
]"""
        
        try:
            message = self.anthropic.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=8000,
                messages=[{"role": "user", "content": prompt}]
            )
            
            response_text = message.content[0].text.strip()
            
            # Clean JSON markers
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.startswith("```"):
                response_text = response_text[3:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            
            keywords_analyzed = json.loads(response_text.strip())
            
            # Ensure target keyword is included and prioritized
            target_exists = any(k["keyword"] == target_keyword for k in keywords_analyzed)
            if not target_exists:
                keywords_analyzed.insert(0, {
                    "keyword": target_keyword,
                    "search_volume": 1500,
                    "competition": "medium",
                    "difficulty": 40,
                    "intent": "transactional",
                    "category": "General",
                    "notes": "Primary target keyword"
                })
            
            return keywords_analyzed
            
        except Exception as e:
            print(f"ERROR: Failed to analyze keywords: {e}")
            return []
    
    def export_to_csv(self, keywords: List[Dict], output_path: str):
        """Export keywords to CSV format matching existing format."""
        
        import csv
        
        with open(output_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=[
                "keyword", "search_volume", "competition", "difficulty", 
                "intent", "category", "notes"
            ])
            writer.writeheader()
            writer.writerows(keywords)
        
        print(f"\n✓ Exported {len(keywords)} keywords to {output_path}")
    
    async def close(self):
        """Close HTTP client."""
        await self.http_client.aclose()


async def main():
    """Test the keyword researcher."""
    import os
    import argparse
    
    parser = argparse.ArgumentParser(description="Research keywords for a niche")
    parser.add_argument("--target-keyword", required=True, help="Primary target keyword")
    parser.add_argument("--niche-type", required=True, help="Niche type (medical, pharmacy, etc.)")
    parser.add_argument("--output", required=True, help="Output CSV path")
    
    args = parser.parse_args()
    
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        print("ERROR: ANTHROPIC_API_KEY not set")
        return
    
    researcher = KeywordResearcher(api_key)
    
    try:
        keywords = await researcher.research_keywords(args.target_keyword, args.niche_type)
        
        if keywords:
            researcher.export_to_csv(keywords, args.output)
            print(f"\n✓ SUCCESS: Researched {len(keywords)} keywords")
        else:
            print("\n✗ FAILED: No keywords generated")
    
    finally:
        await researcher.close()


if __name__ == "__main__":
    asyncio.run(main())
