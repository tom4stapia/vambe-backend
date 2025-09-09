import os
import sys
from typing import Dict, Any, Optional
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.database_config import db_config
from models.database_models import (
    MeetingClassification,
    Meeting,
    SentimentEnum,
)


class DatabaseClient:

    def __init__(self):
        self.db_config = db_config

    def save_classification(self, classification_data: Dict[str, Any]) -> bool:

        try:
            meeting_id = classification_data.get("meeting_id")
            if not meeting_id:
                print("Error: meeting_id is required")
                return False

            with self.db_config.get_session() as session:
                existing_classification = (
                    session.query(MeetingClassification)
                    .filter_by(meeting_id=meeting_id)
                    .first()
                )

                if existing_classification:
                    self._update_classification(
                        session, existing_classification, classification_data
                    )
                    print(
                        f"Classification updated in database for meeting {meeting_id}"
                    )
                else:
                    self._create_classification(session, classification_data)
                    print(f"Classification saved to database for meeting {meeting_id}")

                return True

        except SQLAlchemyError as e:
            print(f"Database error saving classification: {str(e)}")
            return False
        except Exception as e:
            print(f"Error saving classification to database: {str(e)}")
            return False

    def _update_classification(
        self,
        session: Session,
        classification: MeetingClassification,
        data: Dict[str, Any],
    ):
        # Análisis de enums del sistema
        classification.business_sector = data.get("business_sector")
        classification.company_size = data.get("company_size")
        classification.region = data.get("region")
        classification.lead_source = data.get("lead_source")
        classification.vambe_product = data.get("vambe_product")
        classification.use_case = data.get("use_case")
        classification.primary_pain_point = data.get("primary_pain_point")
        classification.urgency = data.get("urgency")
        classification.decision_maker_role = data.get("decision_maker_role")
        classification.purchase_stage = data.get("purchase_stage")
        classification.language = data.get("language")
        classification.lost_client_bad_meeting = data.get("lost_client_bad_meeting")
        
        # Campos mantenidos
        classification.confidence_score = data.get("confidence_score", 0.0)
        sentiment_str = data.get("sentiment", "neutral")
        classification.sentiment = (
            SentimentEnum(sentiment_str)
            if sentiment_str in ["positive", "neutral", "negative"]
            else SentimentEnum.neutral
        )
        classification.key_topics = data.get("key_topics", [])
        classification.action_items = data.get("action_items", [])
        classification.next_steps = data.get("next_steps")
        classification.summary = data.get("summary")
        classification.model_used = data.get("model_used", "dummy_classifier_v1.0")
        classification.processed_at = data.get(
            "processed_at", datetime.now(timezone.utc)
        )
        classification.processing_time_ms = data.get("processing_time_ms")
        classification.updated_at = datetime.now(timezone.utc)

    def _create_classification(self, session: Session, data: Dict[str, Any]):

        sentiment_str = data.get("sentiment", "neutral")
        sentiment_enum = (
            SentimentEnum(sentiment_str)
            if sentiment_str in ["positive", "neutral", "negative"]
            else SentimentEnum.neutral
        )

        classification = MeetingClassification(
            meeting_id=data.get("meeting_id"),
            
            # Análisis de enums del sistema
            business_sector=data.get("business_sector"),
            company_size=data.get("company_size"),
            region=data.get("region"),
            lead_source=data.get("lead_source"),
            vambe_product=data.get("vambe_product"),
            use_case=data.get("use_case"),
            primary_pain_point=data.get("primary_pain_point"),
            urgency=data.get("urgency"),
            decision_maker_role=data.get("decision_maker_role"),
            purchase_stage=data.get("purchase_stage"),
            language=data.get("language"),
            lost_client_bad_meeting=data.get("lost_client_bad_meeting"),
            
            # Campos mantenidos
            confidence_score=data.get("confidence_score", 0.0),
            sentiment=sentiment_enum,
            key_topics=data.get("key_topics", []),
            action_items=data.get("action_items", []),
            next_steps=data.get("next_steps"),
            summary=data.get("summary"),
            model_used=data.get("model_used", "dummy_classifier_v1.0"),
            processed_at=data.get("processed_at", datetime.now(timezone.utc)),
            processing_time_ms=data.get("processing_time_ms"),
        )
        session.add(classification)

    def get_classification(self, meeting_id: int) -> Optional[Dict[str, Any]]:
        try:
            with self.db_config.get_session() as session:
                classification = (
                    session.query(MeetingClassification)
                    .filter_by(meeting_id=meeting_id)
                    .first()
                )

                if classification:
                    return {
                        "id": classification.id,
                        "meeting_id": classification.meeting_id,
                        
                        # Análisis de enums del sistema
                        "business_sector": classification.business_sector,
                        "company_size": classification.company_size,
                        "region": classification.region,
                        "lead_source": classification.lead_source,
                        "vambe_product": classification.vambe_product,
                        "use_case": classification.use_case,
                        "primary_pain_point": classification.primary_pain_point,
                        "urgency": classification.urgency,
                        "decision_maker_role": classification.decision_maker_role,
                        "purchase_stage": classification.purchase_stage,
                        "language": classification.language,
                        "lost_client_bad_meeting": classification.lost_client_bad_meeting,
                        
                        # Campos mantenidos
                        "confidence_score": float(classification.confidence_score),
                        "sentiment": (
                            classification.sentiment.value
                            if hasattr(classification.sentiment, "value")
                            else str(classification.sentiment)
                        ),
                        "key_topics": classification.key_topics,
                        "action_items": classification.action_items,
                        "next_steps": classification.next_steps,
                        "summary": classification.summary,
                        "model_used": classification.model_used,
                        "processed_at": classification.processed_at,
                        "processing_time_ms": classification.processing_time_ms,
                        "created_at": classification.created_at,
                        "updated_at": classification.updated_at,
                    }
                return None

        except SQLAlchemyError as e:
            print(f"Database error getting classification: {str(e)}")
            return None
        except Exception as e:
            print(f"Error getting classification from database: {str(e)}")
            return None

    def get_meeting(self, meeting_id: int) -> Optional[Dict[str, Any]]:
        try:
            with self.db_config.get_session() as session:
                meeting = session.query(Meeting).filter_by(id=meeting_id).first()

                if meeting:
                    return {
                        "id": meeting.id,
                        "client_id": meeting.client_id,
                        "seller_id": meeting.seller_id,
                        "meeting_at": meeting.meeting_at,
                        "transcript": meeting.transcript,
                        "closed": meeting.closed,
                        "client_name": meeting.client.name if meeting.client else None,
                        "client_email": (
                            meeting.client.email if meeting.client else None
                        ),
                        "seller_name": meeting.seller.name if meeting.seller else None,
                        "seller_email": (
                            meeting.seller.email if meeting.seller else None
                        ),
                        "created_at": meeting.created_at,
                        "updated_at": meeting.updated_at,
                    }
                return None

        except SQLAlchemyError as e:
            print(f"Database error getting meeting: {str(e)}")
            return None
        except Exception as e:
            print(f"Error getting meeting from database: {str(e)}")
            return None

    def create_meeting(self, meeting_data: Dict[str, Any]) -> Optional[int]:
        try:
            with self.db_config.get_session() as session:
                meeting = Meeting(
                    client_id=meeting_data.get("client_id"),
                    seller_id=meeting_data.get("seller_id"),
                    meeting_at=meeting_data.get("meeting_at"),
                    transcript=meeting_data.get("transcript"),
                    closed=meeting_data.get("closed", False),
                )
                session.add(meeting)
                session.flush()
                meeting_id = meeting.id
                print(f"Meeting created with ID: {meeting_id}")
                return meeting_id

        except SQLAlchemyError as e:
            print(f"Database error creating meeting: {str(e)}")
            return None
        except Exception as e:
            print(f"Error creating meeting: {str(e)}")
            return None

    def test_connection(self) -> bool:
        return self.db_config.test_connection()

    def create_tables(self):
        self.db_config.create_tables()

    def drop_tables(self):
        self.db_config.drop_tables()


db_client = DatabaseClient()
