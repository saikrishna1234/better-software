from flask import Blueprint, jsonify, request
from app import db
from app.models.task import Task

task_bp = Blueprint('task_bp', __name__)

@task_bp.route('/tasks', methods=['GET', 'POST'])
def handle_tasks():
    if request.method == 'POST':
        data = request.get_json()
        
        if not data or 'title' not in data:
            return jsonify({"error": "Title is required"}), 400
            
        try:
            new_task = Task(
                title=data.get('title'),
                description=data.get('description', ''),
                status=data.get('status', 'pending')     
            )
            
            db.session.add(new_task)
            db.session.commit()
            
            return jsonify({
                "message": "Task created", 
                "id": new_task.id,
                "title": new_task.title
            }), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "Database error", "details": str(e)}), 500

    tasks = Task.query.order_by(Task.created_at.desc()).all()
    
    return jsonify([{
        "id": t.id, 
        "title": t.title,
        "description": t.description,
        "status": t.status,
        "created_at": t.created_at.isoformat() if t.created_at else None
    } for t in tasks])

@task_bp.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    try:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
