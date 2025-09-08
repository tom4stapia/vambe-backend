import random
import time
from typing import List, Dict, Any
from datetime import datetime, timezone

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models.models import MeetingData, ClassificationResult, ClassificationCategory

class DummyClassificationService:
    
    def __init__(self):
        self.model_name = "dummy_classifier_v1.0"
        
        # Dummy keywords for classification simulation
        self.classification_keywords = {
            ClassificationCategory.SALES_QUALIFIED: [
                "interested", "budget approved", "ready to move forward", 
                "when can we start", "next steps", "sign", "contract"
            ],
            ClassificationCategory.NEEDS_FOLLOW_UP: [
                "think about it", "discuss internally", "get back to you",
                "next week", "follow up", "consider"
            ],
            ClassificationCategory.NOT_INTERESTED: [
                "not interested", "not right now", "maybe later",
                "not a priority", "pass", "no thank you"
            ],
            ClassificationCategory.PRICING_DISCUSSION: [
                "price", "cost", "budget", "expensive", "affordable",
                "discount", "pricing", "payment terms"
            ],
            ClassificationCategory.TECHNICAL_QUESTIONS: [
                "how does it work", "integration", "API", "technical",
                "specifications", "requirements", "compatibility"
            ],
            ClassificationCategory.COMPETITOR_MENTION: [
                "competitor", "alternative", "comparing", "versus",
                "other vendors", "similar product"
            ],
            ClassificationCategory.DECISION_MAKER_ABSENT: [
                "decision maker", "boss", "manager", "approval needed",
                "team decision", "need to check"
            ],
            ClassificationCategory.BUDGET_CONSTRAINTS: [
                "tight budget", "expensive", "cost concern", "budget issue",
                "financial constraints", "cheaper option"
            ],
            ClassificationCategory.TIMELINE_DISCUSSION: [
                "timeline", "when", "deadline", "urgent", "schedule",
                "implementation time", "go live"
            ],
            ClassificationCategory.CLOSED_WON: [
                "deal closed", "signed", "agreement", "purchase",
                "moved forward", "accepted proposal"
            ],
            ClassificationCategory.CLOSED_LOST: [
                "decided against", "went with competitor", "not moving forward",
                "cancelled project", "no longer needed"
            ]
        }
        
        self.sentiments = ["positive", "neutral", "negative"]
        
        self.dummy_topics = [
            "Product Demo", "Integration Discussion", "Pricing Negotiation",
            "Technical Requirements", "Timeline Planning", "Decision Process",
            "Competitor Comparison", "Budget Approval", "Implementation Plan",
            "Support Requirements", "Security Concerns", "Scalability Discussion"
        ]
        
        self.dummy_action_items = [
            "Send product documentation",
            "Schedule technical demo",
            "Prepare pricing proposal",
            "Connect with technical team",
            "Follow up next week",
            "Provide security documentation",
            "Schedule decision maker meeting",
            "Send implementation timeline",
            "Prepare ROI analysis",
            "Set up trial account"
        ]

    def classify_meeting(self, meeting_data: MeetingData) -> ClassificationResult:
        """
        Classify a meeting using dummy logic
        
        Args:
            meeting_data: Meeting data to classify
            
        Returns:
            ClassificationResult: Classification results
        """
        start_time = time.time()
        
        # Simulate processing time
        time.sleep(random.uniform(0.5, 2.0))
        
        # Get transcript or use dummy analysis
        transcript = meeting_data.transcript or ""
        
        # Dummy classification logic
        categories = self._classify_categories(transcript)
        confidence = self._calculate_confidence(transcript, categories)
        sentiment = self._analyze_sentiment(transcript)
        topics = self._extract_topics(transcript)
        action_items = self._extract_action_items(transcript)
        next_steps = self._generate_next_steps(categories)
        summary = self._generate_summary(meeting_data, categories, sentiment)
        
        processing_time = int((time.time() - start_time) * 1000)
        
        return ClassificationResult(
            categories=categories,
            confidence_score=confidence,
            sentiment=sentiment,
            key_topics=topics,
            action_items=action_items,
            next_steps=next_steps,
            summary=summary,
            processed_at=datetime.now(timezone.utc),
            processing_time_ms=processing_time,
            model_used=self.model_name
        )
    
    def _classify_categories(self, transcript: str) -> List[ClassificationCategory]:
        """Classify meeting categories based on transcript"""
        transcript_lower = transcript.lower()
        found_categories = []
        
        for category, keywords in self.classification_keywords.items():
            if any(keyword in transcript_lower for keyword in keywords):
                found_categories.append(category)
        
        # If no categories found, assign random ones (dummy behavior)
        if not found_categories:
            num_categories = random.randint(1, 3)
            found_categories = random.sample(list(ClassificationCategory), num_categories)
        
        # Limit to max 4 categories for realistic results
        return found_categories[:4]
    
    def _calculate_confidence(self, transcript: str, categories: List[ClassificationCategory]) -> float:
        """Calculate confidence score (dummy implementation)"""
        if not transcript:
            return round(random.uniform(0.3, 0.6), 2)
        
        # Base confidence on transcript length and categories found
        base_confidence = min(len(transcript) / 1000, 0.8)
        category_bonus = len(categories) * 0.05
        
        confidence = base_confidence + category_bonus + random.uniform(-0.1, 0.1)
        return round(max(0.1, min(0.95, confidence)), 2)
    
    def _analyze_sentiment(self, transcript: str) -> str:
        """Analyze sentiment (dummy implementation)"""
        if not transcript:
            return random.choice(self.sentiments)
        
        positive_words = ["great", "excellent", "love", "perfect", "amazing", "interested"]
        negative_words = ["bad", "terrible", "hate", "awful", "disappointed", "expensive"]
        
        transcript_lower = transcript.lower()
        positive_count = sum(1 for word in positive_words if word in transcript_lower)
        negative_count = sum(1 for word in negative_words if word in transcript_lower)
        
        if positive_count > negative_count:
            return "positive"
        elif negative_count > positive_count:
            return "negative"
        else:
            return "neutral"
    
    def _extract_topics(self, transcript: str) -> List[str]:
        """Extract key topics (dummy implementation)"""
        if not transcript:
            return random.sample(self.dummy_topics, random.randint(2, 4))
        
        # Simple keyword-based topic extraction
        topics = []
        transcript_lower = transcript.lower()
        
        if "demo" in transcript_lower:
            topics.append("Product Demo")
        if "price" in transcript_lower or "cost" in transcript_lower:
            topics.append("Pricing Discussion")
        if "integration" in transcript_lower or "api" in transcript_lower:
            topics.append("Technical Integration")
        if "timeline" in transcript_lower or "when" in transcript_lower:
            topics.append("Timeline Planning")
        
        # Add random topics if none found
        if not topics:
            topics = random.sample(self.dummy_topics, random.randint(2, 3))
        
        return topics[:5]  # Limit to 5 topics
    
    def _extract_action_items(self, transcript: str) -> List[str]:
        """Extract action items (dummy implementation)"""
        num_items = random.randint(1, 4)
        return random.sample(self.dummy_action_items, num_items)
    
    def _generate_next_steps(self, categories: List[ClassificationCategory]) -> str:
        """Generate next steps based on categories"""
        if ClassificationCategory.SALES_QUALIFIED in categories:
            return "Prepare contract and implementation timeline"
        elif ClassificationCategory.NEEDS_FOLLOW_UP in categories:
            return "Schedule follow-up meeting within one week"
        elif ClassificationCategory.NOT_INTERESTED in categories:
            return "Add to nurture campaign for future engagement"
        elif ClassificationCategory.PRICING_DISCUSSION in categories:
            return "Prepare detailed pricing proposal with options"
        else:
            return "Continue relationship building and provide requested information"
    
    def _generate_summary(self, meeting_data: MeetingData, categories: List[ClassificationCategory], sentiment: str) -> str:
        """Generate meeting summary"""
        client_name = meeting_data.client_name or f"Client {meeting_data.client_id}"
        seller_name = meeting_data.seller_name or f"Seller {meeting_data.seller_id}"
        
        category_text = ", ".join([cat.value.replace("_", " ").title() for cat in categories[:2]])
        
        # Handle datetime field (could be datetime or string)
        if isinstance(meeting_data.meeting_at, datetime):
            meeting_date = meeting_data.meeting_at.strftime('%Y-%m-%d')
        else:
            # If it's already a string, extract date part
            meeting_date = str(meeting_data.meeting_at)[:10]

        return (f"Meeting between {seller_name} and {client_name} on "
                f"{meeting_date}. "
                f"Overall sentiment: {sentiment}. "
                f"Key classifications: {category_text}. "
                f"Meeting status: {'Closed' if meeting_data.closed else 'Open'}.")


# Singleton instance
classification_service = DummyClassificationService()
