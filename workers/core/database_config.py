import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import QueuePool
from contextlib import contextmanager
from typing import Generator

from models.database_models import Base


class DatabaseConfig:

    def __init__(self):
        self.database_url = self._build_database_url()
        self.engine = None
        self.SessionLocal = None
        self._initialize_engine()

    def _build_database_url(self) -> str:
        host = os.getenv("POSTGRES_HOST", "db")
        port = os.getenv("POSTGRES_PORT", "5432")
        database = os.getenv("POSTGRES_DB", "vambe_db")
        user = os.getenv("POSTGRES_USER", "postgres")
        password = os.getenv("POSTGRES_PASSWORD", "password")

        return f"postgresql://{user}:{password}@{host}:{port}/{database}"

    def _initialize_engine(self):
        try:
            self.engine = create_engine(
                self.database_url,
                poolclass=QueuePool,
                pool_size=10,
                max_overflow=20,
                pool_pre_ping=True,
                pool_recycle=3600,
                echo=False,
            )

            self.SessionLocal = sessionmaker(
                autocommit=False, autoflush=False, bind=self.engine
            )

            print("✅ SQLAlchemy engine initialized successfully")

        except Exception as e:
            print(f"❌ Failed to initialize SQLAlchemy engine: {str(e)}")
            raise

    def create_tables(self):
        try:
            Base.metadata.create_all(bind=self.engine)
            print("✅ Database tables created successfully")
        except Exception as e:
            print(f"❌ Failed to create database tables: {str(e)}")
            raise

    def drop_tables(self):
        try:
            Base.metadata.drop_all(bind=self.engine)
            print("✅ Database tables dropped successfully")
        except Exception as e:
            print(f"❌ Failed to drop database tables: {str(e)}")
            raise

    @contextmanager
    def get_session(self) -> Generator[Session, None, None]:
        session = self.SessionLocal()
        try:
            yield session
            session.commit()
        except Exception as e:
            session.rollback()
            print(f"❌ Database session error: {str(e)}")
            raise
        finally:
            session.close()

    def get_session_dependency(self) -> Generator[Session, None, None]:
        session = self.SessionLocal()
        try:
            yield session
        finally:
            session.close()

    def test_connection(self) -> bool:
        try:
            with self.get_session() as session:
                session.execute(text("SELECT 1"))
            print("✅ Database connection test successful")
            return True
        except Exception as e:
            print(f"❌ Database connection test failed: {str(e)}")
            return False

    def get_engine(self):
        return self.engine


db_config = DatabaseConfig()
