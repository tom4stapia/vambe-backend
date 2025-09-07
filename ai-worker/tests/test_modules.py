import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def test_imports():
    """Test that all modules can be imported"""
    print("🧪 Testing module imports...")

    try:
        from core.task_processor import task_processor
        print("✅ Task processor imported successfully")

        from core.redis_client import redis_client
        print("✅ Redis client imported successfully")

        from core.database import db_client
        print("✅ Database client imported successfully")

        from services.classification_service import classification_service
        print("✅ Classification service imported successfully")

        from models.models import MeetingData, ClassificationResult
        print("✅ Models imported successfully")

        from config.config import Config
        print("✅ Config imported successfully")

        print("🎉 All imports successful!")
        return True

    except ImportError as e:
        print(f"❌ Import error: {str(e)}")
        return False
    except Exception as e:
        print(f"💥 Unexpected error: {str(e)}")
        return False

def test_connections():
    """Test database and Redis connections"""
    print("\n🔗 Testing connections...")

    try:
        from core.redis_client import redis_client
        from core.database import db_client

        redis_ok = redis_client.test_connection()
        db_ok = db_client.test_connection()

        if redis_ok and db_ok:
            print("🎉 All connections successful!")
            return True
        else:
            print("❌ Some connections failed")
            return False

    except Exception as e:
        print(f"💥 Connection test error: {str(e)}")
        return False

def main():
    print("🚀 Starting module tests...\n")

    imports_ok = test_imports()
    if not imports_ok:
        print("\n❌ Module import tests failed")
        return 1

    connections_ok = test_connections()
    if not connections_ok:
        print("\n❌ Connection tests failed")
        return 1

    print("\n🎉 All tests passed successfully!")
    print("✅ The modular architecture is working correctly")
    return 0

if __name__ == '__main__':
    exit_code = main()
    sys.exit(exit_code)
