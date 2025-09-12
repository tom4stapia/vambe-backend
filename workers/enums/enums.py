from enum import Enum


class BusinessSector(Enum):
    RETAIL = "retail"
    ECOMMERCE = "ecommerce"
    FINANCIAL_SERVICES = "financial_services"
    INSURANCE = "insurance"
    HEALTHCARE = "healthcare"
    PHARMACEUTICALS = "pharmaceuticals"
    ENERGY = "energy"
    UTILITIES = "utilities"
    TELECOM = "telecom"
    TRANSPORTATION_LOGISTICS = "transportation_logistics"
    TOURISM_HOSPITALITY = "tourism_hospitality"
    EDUCATION = "education"
    GOVERNMENT = "government"
    AGROINDUSTRY = "agroindustry"
    MANUFACTURING = "manufacturing"
    CONSTRUCTION = "construction"
    MINING = "mining"
    MEDIA_ENTERTAINMENT = "media_entertainment"
    SOFTWARE_SAAS = "software_saas"
    REAL_ESTATE = "real_estate"
    FOOD_BEVERAGES = "food_beverages"
    CPG = "cpg"
    AUTOMOTIVE = "automotive"
    HUMAN_RESOURCES = "human_resources"
    NGO = "ngo"


class CompanySize(Enum):
    SMALL = "small"
    MEDIUM = "medium"
    LARGE = "large"
    ENTERPRISE = "enterprise"


class Region(Enum):
    LATAM_SOUTH = "latam_south"
    LATAM_NORTH = "latam_north"
    NORTH_AMERICA = "north_america"
    EUROPE = "europe"
    ASIA = "asia"
    AFRICA = "africa"
    OCEANIA = "oceania"


class LeadSource(Enum):
    REFERRAL = "referral"
    SEO = "seo"
    SEM_ADS = "sem_ads"
    EMAIL = "email"
    EVENT = "event"
    PARTNER = "partner"
    OUTBOUND_CALL = "outbound_call"
    COLD_EMAIL = "cold_email"
    LINKEDIN = "linkedin"
    INSTAGRAM = "instagram"
    FACEBOOK = "facebook"
    WEBCHAT = "webchat"
    PR = "pr"
    MARKETPLACE = "marketplace"


class VambeProduct(Enum):
    MERCUR = "mercur"
    IRIS = "iris"
    ADS = "ads"
    AXIS = "axis"


class UseCase(Enum):
    LEAD_SCORING = "lead_scoring"
    CUSTOMER_SEGMENTATION = "customer_segmentation"
    CHURN_PREDICTION = "churn_prediction"
    MARKETING_ATTRIBUTION = "marketing_attribution"
    CAMPAIGN_OPTIMIZATION = "campaign_optimization"
    DEMAND_FORECASTING = "demand_forecasting"
    VOICE_ANALYTICS = "voice_analytics"
    OPERATIONS_AUTOMATION = "operations_automation"
    REAL_TIME_REPORTING = "real_time_reporting"
    DW_MODERNIZATION = "dw_modernization"
    FRAUD_DETECTION = "fraud_detection"
    CONVERSATIONAL_SUPPORT = "conversational_support"


class PrimaryPainPoint(Enum):
    LACK_VISIBILITY = "lack_visibility"
    SLOW_REPORTING = "slow_reporting"
    LOW_CONVERSION = "low_conversion"
    HIGH_CHURN = "high_churn"
    HIGH_ADVERTISING_COSTS = "high_advertising_costs"
    DIFFICULT_INTEGRATIONS = "difficult_integrations"
    REGULATORY_COMPLIANCE = "regulatory_compliance"
    DISPERSED_DATA = "dispersed_data"
    SATURATED_SUPPORT = "saturated_support"
    SCALABILITY = "scalability"


class Urgency(Enum):
    HIGH = True
    LOW = False


class DecisionMakerRole(Enum):
    CEO = "ceo"
    COO = "coo"
    CTO = "cto"
    CMO = "cmo"
    CIO = "cio"
    CFO = "cfo"
    HEAD_DATA = "head_data"
    HEAD_OPS = "head_ops"
    HEAD_SALES = "head_sales"
    PRODUCT_OWNER = "product_owner"
    IT_MANAGER = "it_manager"
    ANALYST = "analyst"
    FOUNDER = "founder"


class PurchaseStage(Enum):
    DISCOVERY = "discovery"
    EVALUATION = "evaluation"
    PILOT = "pilot"
    NEGOTIATION = "negotiation"
    CLOSURE = "closure"


class Language(Enum):
    ES = "es"
    EN = "en"

class LostClientBadMeeting(Enum):
    YES = True
    NO = False

class Sentiment(Enum):
    NEGATIVE = "negative"
    NEUTRAL = "neutral"
    POSITIVE = "positive"

