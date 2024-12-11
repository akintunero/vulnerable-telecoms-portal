from functools import wraps
from flask import request, jsonify, current_app
import jwt
from datetime import datetime, timedelta
import bcrypt
from typing import Dict, Optional

class Auth:
    def __init__(self, app=None):
        self.app = app
        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        self.app = app
        app.config.setdefault('JWT_SECRET_KEY', 'your-secret-key-here')
        app.config.setdefault('JWT_ACCESS_TOKEN_EXPIRES', 3600)  # 1 hour

    def create_access_token(self, user_id: str, role: str) -> str:
        expires = datetime.utcnow() + timedelta(seconds=self.app.config['JWT_ACCESS_TOKEN_EXPIRES'])
        token = jwt.encode(
            {
                'user_id': user_id,
                'role': role,
                'exp': expires
            },
            self.app.config['JWT_SECRET_KEY'],
            algorithm='HS256'
        )
        return token

    def verify_token(self, token: str) -> Optional[Dict]:
        try:
            data = jwt.decode(
                token,
                self.app.config['JWT_SECRET_KEY'],
                algorithms=['HS256']
            )
            return data
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None

    def hash_password(self, password: str) -> str:
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def verify_password(self, password: str, hashed: str) -> bool:
        return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')
        
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        auth = Auth(current_app)
        data = auth.verify_token(token)
        
        if not data:
            return jsonify({'message': 'Token is invalid or expired'}), 401
        
        return f(data, *args, **kwargs)
    return decorated

def role_required(roles):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = None
            auth_header = request.headers.get('Authorization')
            
            if auth_header and auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
            
            if not token:
                return jsonify({'message': 'Token is missing'}), 401
            
            auth = Auth(current_app)
            data = auth.verify_token(token)
            
            if not data:
                return jsonify({'message': 'Token is invalid or expired'}), 401
            
            if data['role'] not in roles:
                return jsonify({'message': 'Insufficient permissions'}), 403
            
            return f(data, *args, **kwargs)
        return decorated
    return decorator 