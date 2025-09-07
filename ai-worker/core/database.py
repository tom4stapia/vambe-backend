import os
import psycopg2
from typing import Dict, Any, Optional
import json


class DatabaseClient:
    """PostgreSQL database client for storing classifications"""

    def __init__(self):
        self.db_params = {
            'host': os.getenv('POSTGRES_HOST', 'db'),
            'port': int(os.getenv('POSTGRES_PORT', '5432')),
            'database': os.getenv('POSTGRES_DB', 'vambe_db'),
            'user': os.getenv('POSTGRES_USER', 'postgres'),
            'password': os.getenv('POSTGRES_PASSWORD', 'password')
        }

    def save_classification(self, classification_data: Dict[str, Any]) -> bool:
        conn = None
        try:
            conn = psycopg2.connect(**self.db_params)
            cursor = conn.cursor()

            meeting_id = classification_data.get('meeting_id')
            if not meeting_id:
                print("Error: meeting_id is required")
                return False

            categories = json.dumps(classification_data.get('categories', []))
            confidence_score = classification_data.get('confidence_score', 0.0)
            sentiment = classification_data.get('sentiment', 'neutral')
            key_topics = json.dumps(classification_data.get('key_topics', []))
            action_items = json.dumps(classification_data.get('action_items', []))
            next_steps = classification_data.get('next_steps')
            summary = classification_data.get('summary')
            model_used = classification_data.get('model_used', 'dummy_classifier_v1.0')
            processed_at = classification_data.get('processed_at')
            processing_time_ms = classification_data.get('processing_time_ms')

            print(f"Checking if classification already exists for meeting {meeting_id}")
            cursor.execute("SELECT id FROM meetings_classifications WHERE meeting_id = %s", (meeting_id,))
            existing = cursor.fetchone()

            if existing:
                update_query = """
                    UPDATE meetings_classifications
                    SET categories = %s,
                        confidence_score = %s,
                        sentiment = %s,
                        key_topics = %s,
                        action_items = %s,
                        next_steps = %s,
                        summary = %s,
                        model_used = %s,
                        processed_at = %s,
                        processing_time_ms = %s,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE meeting_id = %s
                """
                cursor.execute(update_query, (
                    categories, confidence_score, sentiment, key_topics,
                    action_items, next_steps, summary, model_used,
                    processed_at, processing_time_ms, meeting_id
                ))
                print(f"Classification updated in database for meeting {meeting_id}")
            else:
                print(f"Classification not found in database for meeting {meeting_id}, inserting new classification")
                insert_query = """
                    INSERT INTO meetings_classifications (
                        meeting_id, categories, confidence_score, sentiment,
                        key_topics, action_items, next_steps, summary,
                        model_used, processed_at, processing_time_ms
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(insert_query, (
                    meeting_id, categories, confidence_score, sentiment,
                    key_topics, action_items, next_steps, summary,
                    model_used, processed_at, processing_time_ms
                ))
                print(f"Classification saved to database for meeting {meeting_id}")

            conn.commit()
            return True

        except psycopg2.Error as e:
            print(f"Database error saving classification: {str(e)}")
            if conn:
                conn.rollback()
            return False
        except Exception as e:
            print(f"Error saving classification to database: {str(e)}")
            if conn:
                conn.rollback()
            return False
        finally:
            if conn:
                conn.close()

    def test_connection(self) -> bool:
        try:
            conn = psycopg2.connect(**self.db_params)
            conn.close()
            print("Database connection successful")
            return True
        except Exception as e:
            print(f"Database connection failed: {str(e)}")
            return False


# Singleton instance
db_client = DatabaseClient()
