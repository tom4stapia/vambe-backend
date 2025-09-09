from sqlalchemy import Column, Integer, String, DateTime, Boolean, Numeric, Text, JSON, ForeignKey, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import enum

Base = declarative_base()


class SentimentEnum(enum.Enum):
    positive = "positive"
    neutral = "neutral"
    negative = "negative"


class Client(Base):
    __tablename__ = 'clients'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=True)
    phone = Column(String(15), nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
    
    meetings = relationship("Meeting", back_populates="client")


class Seller(Base):
    __tablename__ = 'sellers'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(15), nullable=True)
    active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
    
    meetings = relationship("Meeting", back_populates="seller")


class Meeting(Base):
    __tablename__ = 'meetings'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    client_id = Column(Integer, ForeignKey('clients.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    seller_id = Column(Integer, ForeignKey('sellers.id', ondelete='RESTRICT', onupdate='CASCADE'), nullable=False)
    meeting_at = Column(DateTime, nullable=False)
    closed = Column(Boolean, nullable=False, default=False)
    transcript = Column(Text, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
    
    client = relationship("Client", back_populates="meetings")
    seller = relationship("Seller", back_populates="meetings")
    classification = relationship("MeetingClassification", back_populates="meeting", uselist=False)


class MeetingClassification(Base):
    __tablename__ = 'meetings_classifications'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    meeting_id = Column(Integer, ForeignKey('meetings.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, unique=True)
    
    # Análisis de enums del sistema
    business_sector = Column(Text, nullable=True)  # Análisis de BusinessSector
    company_size = Column(Text, nullable=True)  # Análisis de CompanySize
    region = Column(Text, nullable=True)  # Análisis de Region
    lead_source = Column(Text, nullable=True)  # Análisis de LeadSource
    vambe_product = Column(Text, nullable=True)  # Análisis de VambeProduct
    use_case = Column(Text, nullable=True)  # Análisis de UseCase
    primary_pain_point = Column(Text, nullable=True)  # Análisis de PrimaryPainPoint
    urgency = Column(Boolean, nullable=True)  # Análisis de Urgency
    decision_maker_role = Column(Text, nullable=True)  # Análisis de DecisionMakerRole
    purchase_stage = Column(Text, nullable=True)  # Análisis de PurchaseStage
    language = Column(Text, nullable=True)  # Análisis de Language
    lost_client_bad_meeting = Column(Boolean, nullable=True)  # Cliente perdido por mala reunión
    
    # Campos mantenidos
    confidence_score = Column(Numeric(3, 2), nullable=False, default=0.0)
    sentiment = Column(Enum(SentimentEnum), nullable=False)
    key_topics = Column(JSON, nullable=False, default=list)
    action_items = Column(JSON, nullable=False, default=list)
    next_steps = Column(Text, nullable=True)
    summary = Column(Text, nullable=True)
    model_used = Column(String(100), nullable=False)
    processed_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc))
    processing_time_ms = Column(Integer, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
    
    meeting = relationship("Meeting", back_populates="classification")


class SellerCategorization(Base):
    __tablename__ = 'sellers_categorizations'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    seller_id = Column(Integer, ForeignKey('sellers.id'), nullable=False)
    categories = Column(JSON, nullable=False)
    confidence_score = Column(Numeric(3, 2), nullable=False)
    model_used = Column(String(255))
    processed_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))


class ClientCategorization(Base):
    __tablename__ = 'clients_categorizations'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    client_id = Column(Integer, ForeignKey('clients.id'), nullable=False)
    categories = Column(JSON, nullable=False)
    confidence_score = Column(Numeric(3, 2), nullable=False)
    model_used = Column(String(255))
    processed_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
