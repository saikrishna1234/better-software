# backend/init_db.py
from app import create_app, db
from app.models.task import Task

app = create_app()

def initialize_database():
    with app.app_context():
        print("Revising database schema...")
        db.create_all()
        print("Database initialized successfully!")

if __name__ == "__main__":
    initialize_database()
