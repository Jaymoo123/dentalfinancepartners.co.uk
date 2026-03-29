"""
Keyword analysis utilities for topic tree generation.
"""
import csv
from typing import List, Dict, Optional
from pathlib import Path


class KeywordAnalyzer:
    def __init__(self, csv_path: str):
        self.csv_path = csv_path
        self.keywords = []
        self._load_keywords()
    
    def _load_keywords(self):
        """Load keywords from CSV file."""
        with open(self.csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            self.keywords = list(reader)
        
        for kw in self.keywords:
            if kw['search_volume'].isdigit():
                kw['search_volume'] = int(kw['search_volume'])
            else:
                kw['search_volume'] = self._estimate_volume(kw['search_volume'])
            
            if kw['difficulty'].isdigit():
                kw['difficulty'] = int(kw['difficulty'])
    
    def _estimate_volume(self, volume_str: str) -> int:
        """Convert text volume estimates to numbers."""
        volume_map = {
            'low': 200,
            'medium': 600,
            'high': 1500,
            'very high': 3000
        }
        return volume_map.get(volume_str.lower(), 500)
    
    def get_all_keywords(self) -> List[Dict]:
        """Get all keywords with metadata."""
        return self.keywords
    
    def get_by_category(self, category: str) -> List[Dict]:
        """Get keywords for a specific category."""
        return [kw for kw in self.keywords if kw['category'] == category]
    
    def get_pillar_candidates(self, min_volume: int = 1000) -> List[Dict]:
        """Get high-volume keywords suitable for pillar content."""
        return [
            kw for kw in self.keywords 
            if kw['search_volume'] >= min_volume
        ]
    
    def get_cluster_candidates(self, pillar_keyword: str, max_difficulty: int = 45) -> List[Dict]:
        """Get keywords related to a pillar that are easier to rank for."""
        pillar_terms = set(pillar_keyword.lower().split())
        
        clusters = []
        for kw in self.keywords:
            kw_terms = set(kw['keyword'].lower().split())
            
            overlap = len(pillar_terms & kw_terms)
            if overlap >= 1 and kw['difficulty'] <= max_difficulty:
                clusters.append({
                    **kw,
                    'relevance_score': overlap / len(pillar_terms)
                })
        
        return sorted(clusters, key=lambda x: x['relevance_score'], reverse=True)
    
    def calculate_priority(self, keyword: Dict) -> int:
        """
        Calculate publishing priority (1-10) based on multiple factors.
        
        Priority formula:
        - Search volume (40% weight)
        - Keyword difficulty inverse (30% weight) - easier = higher priority
        - Intent (20% weight) - transactional > informational > navigational
        - Competition inverse (10% weight)
        """
        volume_score = min(keyword['search_volume'] / 300, 10)
        
        difficulty_score = 10 - (keyword['difficulty'] / 10)
        
        intent_scores = {
            'transactional': 10,
            'informational': 7,
            'navigational': 5
        }
        intent_score = intent_scores.get(keyword['intent'], 5)
        
        competition_scores = {
            'low': 10,
            'medium': 6,
            'high': 3
        }
        competition_score = competition_scores.get(keyword['competition'], 5)
        
        weighted_score = (
            volume_score * 0.4 +
            difficulty_score * 0.3 +
            intent_score * 0.2 +
            competition_score * 0.1
        )
        
        return max(1, min(10, round(weighted_score)))
    
    def get_categories(self) -> List[str]:
        """Get unique list of categories."""
        return list(set(kw['category'] for kw in self.keywords))
    
    def find_similar_keyword(self, topic: str, threshold: float = 0.6) -> Optional[Dict]:
        """
        Find keyword that matches an existing topic.
        Uses simple word overlap for matching.
        """
        topic_words = set(topic.lower().split())
        
        best_match = None
        best_score = 0
        
        for kw in self.keywords:
            kw_words = set(kw['keyword'].lower().split())
            
            overlap = len(topic_words & kw_words)
            union = len(topic_words | kw_words)
            
            if union > 0:
                jaccard_score = overlap / union
                
                if jaccard_score > best_score and jaccard_score >= threshold:
                    best_score = jaccard_score
                    best_match = {**kw, 'match_score': jaccard_score}
        
        return best_match
