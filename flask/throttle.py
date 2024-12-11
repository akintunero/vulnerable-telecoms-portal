from flask import Flask, request, jsonify
import time
from functools import wraps
import os
import jwt
from datetime import datetime, timedelta

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('JWT_SECRET', 'your-secret-key-here')

# In-memory rate limiting
request_times = {}
token_blacklist = set()

def rate_limit(limit=5, window=60):
    def decorator(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            now = time.time()
            client_ip = request.remote_addr
            
            if client_ip not in request_times:
                request_times[client_ip] = []
            
            # Remove old requests
            request_times[client_ip] = [t for t in request_times[client_ip] if now - t < window]
            
            if len(request_times[client_ip]) >= limit:
                return jsonify({
                    'error': 'Rate limit exceeded',
                    'retry_after': int(window - (now - request_times[client_ip][0]))
                }), 429
            
            request_times[client_ip].append(now)
            return f(*args, **kwargs)
        return wrapped
    return decorator

def validate_token(token):
    if not token:
        return False, "No token provided"
    
    if token in token_blacklist:
        return False, "Token has been revoked"
    
    try:
        # Verify token format
        if not token.startswith('Bearer '):
            return False, "Invalid token format"
        
        token = token.split(' ')[1]
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        
        # Check token expiration
        if datetime.fromtimestamp(payload['exp']) < datetime.now():
            return False, "Token has expired"
        
        return True, payload
    except jwt.InvalidTokenError:
        return False, "Invalid token"

@app.route('/api/test', methods=['GET'])
@rate_limit(limit=5, window=60)
def test_endpoint():
    token = request.headers.get('Authorization')
    
    is_valid, result = validate_token(token)
    if not is_valid:
        return jsonify({'error': result}), 401
    
    # Check for test token
    if token == 'Bearer test_token_123':
        return jsonify({
            'status': 'success',
            'flag': 'flag7_throttle_2024'
        })
    
    return jsonify({'status': 'success', 'message': 'Test endpoint'})

@app.route('/api/reset', methods=['POST'])
def reset_limit():
    token = request.headers.get('Authorization')
    
    is_valid, result = validate_token(token)
    if not is_valid:
        return jsonify({'error': result}), 401
    
    client_ip = request.remote_addr
    if client_ip in request_times:
        del request_times[client_ip]
    return jsonify({'status': 'success'})

@app.route('/api/revoke', methods=['POST'])
def revoke_token():
    token = request.headers.get('Authorization')
    
    is_valid, result = validate_token(token)
    if not is_valid:
        return jsonify({'error': result}), 401
    
    token_blacklist.add(token)
    return jsonify({'status': 'success', 'message': 'Token revoked'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001) 