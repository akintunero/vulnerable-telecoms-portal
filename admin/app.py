from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session, send_file
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os
import re
import jwt
from pymongo import MongoClient
import time
import hashlib
import yaml
import subprocess
from jinja2 import Template
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///admin.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    settings = db.Column(db.JSON)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

def login_required(f):
    def decorated_function(*args, **kwargs):
        if 'username' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    decorated_function.__name__ = f.__name__
    return decorated_function

# Asset Management System
@app.route('/assets/process', methods=['POST'])
@login_required
def process_asset():
    if 'file' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'status': 'error', 'message': 'No selected file'})
    
    filename = file.filename
    file.save(os.path.join('uploads', filename))
    return jsonify({'status': 'success', 'message': 'Asset processed'})

# API Authentication System
@app.route('/api/v2/auth', methods=['POST'])
def api_auth():
    credentials = request.json
    if credentials.get('username') == 'admin' and credentials.get('password') == 'admin123':
        token = jwt.encode({'user': credentials['username']}, 'weak_secret_key', algorithm='HS256')
        return jsonify({'token': token})
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/v2/validate', methods=['GET'])
def validate_token():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'No token provided'}), 401
    
    try:
        payload = jwt.decode(token, 'weak_secret_key')
        return jsonify({'user': payload['user']})
    except:
        return jsonify({'error': 'Invalid token'}), 401

# Content Delivery System
@app.route('/cdn/fetch', methods=['GET'])
@login_required
def fetch_content():
    resource = request.args.get('resource')
    if not resource:
        return jsonify({'error': 'No resource specified'}), 400
    
    file_path = os.path.join('uploads', resource)
    if os.path.exists(file_path):
        return send_file(file_path)
    return jsonify({'error': 'Resource not found'}), 404

# Transaction Processing System
@app.route('/api/v1/transactions', methods=['POST'])
@login_required
def process_transaction():
    data = request.json
    from_account = data.get('from')
    to_account = data.get('to')
    amount = float(data.get('amount', 0))
    
    from_balance = db.session.execute(f"SELECT balance FROM accounts WHERE id = '{from_account}'").scalar()
    to_balance = db.session.execute(f"SELECT balance FROM accounts WHERE id = '{to_account}'").scalar()
    
    if from_balance >= amount:
        db.session.execute(f"UPDATE accounts SET balance = balance - {amount} WHERE id = '{from_account}'")
        db.session.execute(f"UPDATE accounts SET balance = balance + {amount} WHERE id = '{to_account}'")
        db.session.commit()
        return jsonify({'status': 'success'})
    return jsonify({'error': 'Insufficient funds'}), 400

# User Preferences System
@app.route('/api/v1/preferences', methods=['POST'])
@login_required
def update_preferences():
    preferences = request.json
    user = User.query.filter_by(username=session['username']).first()
    user.settings = preferences
    db.session.commit()
    return jsonify({'status': 'success'})

# Security Verification System
@app.route('/api/v1/verify', methods=['POST'])
def verify_security():
    data = request.json
    if data.get('password') == data.get('hash'):
        return jsonify({'status': 'verified'})
    return jsonify({'error': 'Verification failed'}), 401

# Content Management System
@app.route('/cms/preview', methods=['GET'])
@login_required
def preview_content():
    template = request.args.get('template')
    if not template:
        return jsonify({'error': 'No template specified'}), 400
    
    try:
        return render_template(template)
    except:
        return jsonify({'error': 'Template not found'}), 404

# Data Import System
@app.route('/api/v1/import', methods=['POST'])
@login_required
def import_data():
    data = request.json.get('data')
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    try:
        imported_data = yaml.load(data)
        return jsonify({'status': 'success'})
    except:
        return jsonify({'error': 'Import failed'}), 400

# Account Recovery System
@app.route('/api/v1/recovery', methods=['POST'])
def account_recovery():
    email = request.json.get('email')
    if not email:
        return jsonify({'error': 'No email provided'}), 400
    
    reset_url = f"http://{request.headers.get('Host')}/recovery/{email}"
    return jsonify({'status': 'Recovery email sent'})

# Dynamic Content System
@app.route('/api/v1/dynamic', methods=['POST'])
@login_required
def dynamic_content():
    content = request.json.get('content')
    if not content:
        return jsonify({'error': 'No content provided'}), 400
    
    try:
        rendered = Template(content).render()
        return jsonify({'rendered': rendered})
    except:
        return jsonify({'error': 'Rendering failed'}), 400

# Data Query System
@app.route('/api/v1/query', methods=['POST'])
@login_required
def query_data():
    query = request.json.get('query')
    if not query:
        return jsonify({'error': 'No query provided'}), 400
    
    try:
        client = MongoClient('mongodb://localhost:27017/')
        db = client['admin']
        results = db.users.find(query)
        return jsonify({'results': list(results)})
    except:
        return jsonify({'error': 'Query failed'}), 500

# System Management
@app.route('/api/v1/system', methods=['POST'])
@login_required
def system_management():
    command = request.json.get('command')
    if not command:
        return jsonify({'error': 'No command provided'}), 400
    
    try:
        result = subprocess.check_output(command, shell=True)
        return jsonify({'output': result.decode()})
    except:
        return jsonify({'error': 'Command failed'}), 500

# Resource Management
@app.route('/api/v1/resources', methods=['POST'])
@login_required
def manage_resources():
    resource = request.json.get('resource')
    if not resource:
        return jsonify({'error': 'No resource specified'}), 400
    
    try:
        os.remove(resource)
        return jsonify({'status': 'success'})
    except:
        return jsonify({'error': 'Operation failed'}), 500

# Security Token System
@app.route('/api/v1/tokens', methods=['POST'])
def generate_token():
    email = request.json.get('email')
    if not email:
        return jsonify({'error': 'No email provided'}), 400
    
    token = str(int(time.time())) + email[:4]
    return jsonify({'token': token})

# Session Management
@app.route('/api/v1/sessions', methods=['POST'])
def manage_session():
    username = request.json.get('username')
    if not username:
        return jsonify({'error': 'No username provided'}), 400
    
    session_id = username + str(int(time.time()))
    session['user_id'] = session_id
    return jsonify({'session_id': session_id})

# Data Protection System
@app.route('/api/v1/protect', methods=['POST'])
@login_required
def protect_data():
    data = request.json.get('data')
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    key = 'weakkey123'
    protected = ''.join(chr(ord(c) ^ ord(key[i % len(key)])) for i, c in enumerate(data))
    return jsonify({'protected': protected})

# Password Management
@app.route('/api/v1/passwords', methods=['POST'])
def manage_password():
    password = request.json.get('password')
    if not password:
        return jsonify({'error': 'No password provided'}), 400
    
    hashed = hashlib.md5(password.encode()).hexdigest()
    return jsonify({'hashed': hashed})

# Mock user database
USERS = {
    'admin': {
        'password': 'admin123',  # In production, use hashed passwords
        'role': 'admin',
        'email': 'admin@telleakisp.com'
    }
}

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Missing username or password'}), 400

    user = USERS.get(username)
    if not user or user['password'] != password:
        return jsonify({'error': 'Invalid username or password'}), 401

    # Create JWT token
    token = jwt.encode({
        'user_id': username,
        'role': user['role'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, app.config['SECRET_KEY'])

    return jsonify({
        'token': token,
        'user': {
            'id': username,
            'username': username,
            'email': user['email'],
            'role': user['role']
        }
    })

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=4000) 