# AI Guidance & Engineering Standards

## 🤖 AI Usage Disclosure
This project was developed with the assistance of **Gemini (Google AI)**. The AI was used as a "Pair Programmer" to accelerate boilerplate generation and troubleshoot environment-specific issues.

## 🛠️ Engineering Standards Enforced
To ensure the AI produced high-quality code, I enforced the following constraints:

1. **Modular Architecture:** I directed the AI to use the **Flask Application Factory** pattern instead of a single-file approach to ensure scalability.
2. **Environment Isolation:** I mandated the use of **Python Virtual Environments (venv)** and a decoupled frontend/backend structure.
3. **Data Integrity:** I required the use of **SQLAlchemy ORM** for the database layer to prevent raw SQL vulnerabilities and enforce schema rules.
4. **Conflict Resolution:** When macOS port conflicts (Port 5000) occurred, I directed the AI to reconfigure the stack to **Port 5001** for both the Flask listener and the React API calls.

## 🧠 Human Oversight & Refactoring
While AI assisted in code generation, I manually performed the following:
* **Debugged CORS headers** to ensure secure communication between the two dev servers.
* **Refactored React hooks** to prevent unnecessary re-renders during task updates.
* **Database Management:** Created `init_db.py` to handle the "Cold Start" sequence for the PostgreSQL schema.