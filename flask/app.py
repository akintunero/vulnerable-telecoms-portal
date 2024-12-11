from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from auth import Auth, token_required, role_required
import json
from datetime import datetime
import random
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
auth = Auth(app)

# Database configuration
db_config = {
    'host': 'mysql',
    'user': 'root',
    'password': 'password',
    'database': 'telleak'
}

def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

# In-memory storage for real-time features
messages = []
users = []
network_stats = {
    'connectedDevices': 0,
    'signalStrength': -65,
    'channelUtilization': 45,
    'history': []
}

# Authentication endpoints
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        cursor = conn.cursor()
        hashed_password = auth.hash_password(data['password'])
        cursor.execute(
            'INSERT INTO users (username, email, password, role) VALUES (%s, %s, %s, %s)',
            (data['username'], data['email'], hashed_password, data.get('role', 'user'))
        )
        conn.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except Error as e:
        return jsonify({'error': str(e)}), 400
    finally:
        conn.close()

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM users WHERE username = %s', (data['username'],))
        user = cursor.fetchone()

        if user and auth.verify_password(data['password'], user['password']):
            token = auth.create_access_token(str(user['id']), user['role'])
            return jsonify({
                'token': token,
                'user': {
                    'id': user['id'],
                    'username': user['username'],
                    'email': user['email'],
                    'role': user['role']
                }
            })
        return jsonify({'error': 'Invalid credentials'}), 401
    finally:
        conn.close()

# Social endpoints
@app.route('/api/social/messages', methods=['GET', 'POST'])
@token_required
def handle_messages(user_data):
    if request.method == 'POST':
        data = request.json
        message = {
            'id': str(len(messages) + 1),
            'content': data['content'],
            'sender': user_data['user_id'],
            'timestamp': datetime.now().isoformat()
        }
        messages.append(message)
        socketio.emit('message', message)
        return jsonify(message)
    return jsonify(messages)

@app.route('/api/social/users', methods=['GET'])
@token_required
def get_users(user_data):
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT id, username, email, role FROM users')
        users = cursor.fetchall()
        return jsonify(users)
    finally:
        conn.close()

# Router endpoints
@app.route('/api/router/stats', methods=['GET'])
@token_required
def get_router_stats(user_data):
    # Simulate real-time network stats
    network_stats['connectedDevices'] = random.randint(5, 15)
    network_stats['signalStrength'] = random.randint(-80, -50)
    network_stats['channelUtilization'] = random.randint(30, 70)
    
    # Add to history
    network_stats['history'].append({
        'timestamp': datetime.now().isoformat(),
        'throughput': random.randint(50, 200),
        'latency': random.randint(10, 50),
        'packetLoss': random.uniform(0, 2)
    })
    
    # Keep only last 20 data points
    network_stats['history'] = network_stats['history'][-20:]
    
    return jsonify(network_stats)

@app.route('/api/router/config', methods=['POST'])
@role_required(['admin', 'network_admin'])
def update_router_config(user_data):
    config = request.json
    # Implement router configuration update logic
    return jsonify({'status': 'success', 'config': config})

# WebSocket events
@socketio.on('connect')
def handle_connect():
    user = {
        'id': str(len(users) + 1),
        'username': f'User{len(users) + 1}',
        'status': 'online',
        'lastSeen': datetime.now().isoformat()
    }
    users.append(user)
    emit('user-status', users, broadcast=True)

@socketio.on('disconnect')
def handle_disconnect():
    if users:
        user = users.pop()
        user['status'] = 'offline'
        user['lastSeen'] = datetime.now().isoformat()
        users.append(user)
        emit('user-status', users, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True) 