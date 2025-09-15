import json
import time
from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
import os
from openai import OpenAI

import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models.models import MeetingData, ClassificationResult
from enums import Sentiment


class OpenAIClassificationService:

    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.model_name = "gpt-4o-mini" 
        self.max_retries = 3
        self.retry_delay = 1
        
        self.all_enums = [
            "business_sector",
            "company_size",
            "region",
            "lead_source",
            "vambe_product",
            "use_case",
            "primary_pain_point",
            "urgency",
            "decision_maker_role",
            "purchase_stage",
            "language",
            "lost_client_bad_meeting"
        ]
        
        self.sentiment_mapping = {
            "positive": Sentiment.POSITIVE,
            "neutral": Sentiment.NEUTRAL,
            "negative": Sentiment.NEGATIVE
        }

    def classify_meeting(self, meeting_data: MeetingData) -> ClassificationResult:
        start_time = time.time()
        
        try:
            prompt = self._create_classification_prompt(meeting_data)
            
            response = self._call_openai_with_retry(prompt)
            
            classification_data = self._parse_openai_response(response)
            
            result = self._convert_to_classification_result(
                classification_data, 
                meeting_data, 
                start_time
            )
            
            return result
            
        except Exception as e:
            print(f"OpenAI classification failed: {e}")
            return self._create_fallback_result(meeting_data, start_time)

    def _create_classification_prompt(self, meeting_data: MeetingData) -> str:
        if isinstance(meeting_data.meeting_at, datetime):
            meeting_date = meeting_data.meeting_at.strftime('%Y-%m-%d %H:%M')
        else:
            meeting_date = str(meeting_data.meeting_at)
        
        client_name = meeting_data.client_name or f"Client {meeting_data.client_id}"
        seller_name = meeting_data.seller_name or f"Seller {meeting_data.seller_id}"
        
        prompt = f"""
You are an expert sales analyst specializing in classifying and analyzing sales meetings.  
Analyze the following transcript and return the result strictly in **JSON** format.  

MEETING DETAILS:
- Date: {meeting_date}
- Client: {client_name}
- Seller: {seller_name}
- Meeting Status: {'Closed' if meeting_data.closed else 'Open'}

TRANSCRIPT:
{meeting_data.transcript or 'No transcript available'}

INSTRUCTIONS:
1. Respond **only** with a JSON object using the exact structure shown below.  
2. For every field, select exactly **one option** from the allowed categories. Never invent new ones, never leave values empty, and never use "OTHER" or defaults.  
3. Always extract real content from the transcript for: `key_topics`, `action_items`, `next_steps`, and `summary`. All these fields must be in **Spanish** and reflect what was actually discussed.  
4. If the transcript is empty or very short, choose the most likely categories based on context and still provide a coherent Spanish summary and items.  
5. `confidence_score` must always be between 0.1 and 0.95.  
6. Be objective, consistent, and concise.  
7. NEVER use generic placeholder text, use real content from the transcript

ALLOWED CATEGORIES:

- **business_sector:** retail, ecommerce, financial_services, insurance, healthcare, pharmaceuticals, energy, utilities, telecom, transportation_logistics, tourism_hospitality, education, government, agroindustry, manufacturing, construction, mining, media_entertainment, software_saas, real_estate, food_beverages, cpg, automotive, ngo, human_resources.
- **company_size:** small, medium, large, enterprise.  
- **region:** latam_south, latam_north, north_america, europe, asia, africa, oceania. (default if unsure: latam_south).  
- **lead_source:** referral, seo, sem_ads, email, event, partner, outbound_call, cold_email, linkedin, instagram, facebook, webchat, pr, marketplace.  
- **vambe_product:** mercur | iris | ads | axis. (chats+integrations: mercur; only integrations: axis; only attribution/marketing: ads; fast/simple: iris)
- **use_case:** lead_scoring, customer_segmentation, churn_prediction, marketing_attribution, campaign_optimization, demand_forecasting, voice_analytics, operations_automation, real_time_reporting, dw_modernization, fraud_detection, conversational_support.  
- **primary_pain_point:** lack_visibility, slow_reporting, low_conversion, high_churn, high_advertising_costs, difficult_integrations, regulatory_compliance, dispersed_data, saturated_support, scalability.  
- **urgency:** true | false (choose true if the client shows high urgency/immediate need, false if low urgency or no rush).  
- **decision_maker_role:** ceo, coo, cto, cmo, cio, cfo, head_data, head_ops, head_sales, product_owner, it_manager, analyst, founder.  
- **purchase_stage:** discovery, negotiation, closure.  
- **language:** es | en (default if unsure: es).  
- **lost_client_bad_meeting:** true | false (choose true if the meeting went poorly and the client is likely lost due to bad meeting experience, false otherwise).  

Required JSON output structure:

{{
    "business_sector": "<one category from business_sector>",
    "company_size": "<one category from company_size>",
    "region": "<one category from region>",
    "lead_source": "<one category from lead_source>",
    "vambe_product": "<one category from vambe_product>",
    "use_case": "<one category from use_case>",
    "primary_pain_point": "<one category from primary_pain_point>",
    "urgency": boolean,
    "decision_maker_role": "<one category from decision_maker_role>",
    "purchase_stage": "<one category from purchase_stage>",
    "language": "<one category from language>",
    "lost_client_bad_meeting": boolean,
    "confidence_score": <float between 0.1 and 0.95>,
    "sentiment": "<one category from sentiment>",
    "key_topics": ["<list of 2-5 specific topics in Spanish from the transcript>"],
    "action_items": ["<list of 1-3 specific next actions in Spanish from the transcript>"],
    "next_steps": "<concise Spanish description of the next agreed step>",
    "summary": "<1-2 sentence Spanish summary of the meeting>"
}}

Respond ONLY with the JSON object, no additional text.
"""

        return prompt

    def _call_openai_with_retry(self, prompt: str) -> str:
        
        for attempt in range(self.max_retries):
            try:
                response = self.client.chat.completions.create(
                    model=self.model_name,
                    messages=[
                        {
                            "role": "system", 
                            "content": "You are a sales analyst expert. Always respond with valid JSON only."
                        },
                        {"role": "user", "content": prompt}
                    ],
                    temperature=0.1, 
                    max_tokens=1000,  
                    timeout=30 
                )
                
                return response.choices[0].message.content
                
            except Exception as e:
                print(f"OpenAI API attempt {attempt + 1} failed: {e}")
                if attempt < self.max_retries - 1:
                    time.sleep(self.retry_delay * (attempt + 1))  
                else:
                    raise e

    def _parse_openai_response(self, response: str) -> Dict[str, Any]:
        
        try:
            cleaned_response = response.strip()
            if cleaned_response.startswith('```json'):
                cleaned_response = cleaned_response[7:]
            if cleaned_response.endswith('```'):
                cleaned_response = cleaned_response[:-3]
            
            data = json.loads(cleaned_response)
            
            required_fields = ['confidence_score', 'sentiment', 'key_topics', 'action_items', 'next_steps', 'summary']
            for field in required_fields:
                if field not in data:
                    raise ValueError(f"Missing required field: {field}")
            
            for enum_field in self.all_enums:
                if enum_field not in data or data[enum_field] is None:
                    if enum_field in ['urgency', 'lost_client_bad_meeting']:
                        data[enum_field] = False
                    else:
                        data[enum_field] = "No specific indicators found in this meeting"
            
            return data
            
        except (json.JSONDecodeError, ValueError) as e:
            print(f"Failed to parse OpenAI response: {e}")
            print(f"Raw response: {response}")
            raise e

    def _convert_to_classification_result(
        self, 
        data: Dict[str, Any], 
        meeting_data: MeetingData, 
        start_time: float
    ) -> ClassificationResult:
        
        sentiment_str = data.get('sentiment', 'neutral').lower()
        sentiment = self.sentiment_mapping.get(sentiment_str, Sentiment.NEUTRAL)
        
        confidence = max(0.1, min(0.95, float(data.get('confidence_score', 0.7))))
        
        processing_time = int((time.time() - start_time) * 1000)
        
        return ClassificationResult(
            business_sector=data.get('business_sector'),
            company_size=data.get('company_size'),
            region=data.get('region'),
            lead_source=data.get('lead_source'),
            vambe_product=data.get('vambe_product'),
            use_case=data.get('use_case'),
            primary_pain_point=data.get('primary_pain_point'),
            urgency=data.get('urgency'),
            decision_maker_role=data.get('decision_maker_role'),
            purchase_stage=data.get('purchase_stage'),
            language=data.get('language'),
            lost_client_bad_meeting=data.get('lost_client_bad_meeting'),
            
            confidence_score=confidence,
            sentiment=sentiment.value,
            key_topics=data.get('key_topics', []),
            action_items=data.get('action_items', []),
            next_steps=data.get('next_steps', ''),
            summary=data.get('summary', ''),
            processed_at=datetime.now(timezone.utc),
            processing_time_ms=processing_time,
            model_used=self.model_name
        )

    def _create_fallback_result(self, meeting_data: MeetingData, start_time: float) -> ClassificationResult:
        processing_time = int((time.time() - start_time) * 1000)
        
        return ClassificationResult(
            business_sector="Manual review needed - OpenAI classification failed",
            company_size="Manual review needed - OpenAI classification failed",
            region="Manual review needed - OpenAI classification failed",
            lead_source="Manual review needed - OpenAI classification failed",
            vambe_product="Manual review needed - OpenAI classification failed",
            use_case="Manual review needed - OpenAI classification failed",
            primary_pain_point="Manual review needed - OpenAI classification failed",
            urgency=False,
            decision_maker_role="Manual review needed - OpenAI classification failed",
            purchase_stage="Manual review needed - OpenAI classification failed",
            language="Manual review needed - OpenAI classification failed",
            lost_client_bad_meeting=False,
            
            confidence_score=0.3,
            sentiment=Sentiment.NEUTRAL.value,
            key_topics=["General Discussion"],
            action_items=["Follow up with client"],
            next_steps="Schedule follow-up meeting",
            summary=f"Meeting between {meeting_data.client_name or 'client'} and {meeting_data.seller_name or 'seller'} - classification failed, manual review needed",
            processed_at=datetime.now(timezone.utc),
            processing_time_ms=processing_time,
            model_used="fallback"
        )


openai_classification_service = OpenAIClassificationService()
