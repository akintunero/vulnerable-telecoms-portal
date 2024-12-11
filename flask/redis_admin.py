from flask import Flask, request, jsonify
import redis
import os
import re
from functools import wraps

app = Flask(__name__)
redis_client = redis.Redis(host='redis', port=6379, db=0)

# List of allowed Redis commands
ALLOWED_COMMANDS = {
    'get', 'set', 'del', 'exists', 'keys', 'type',
    'ttl', 'expire', 'incr', 'decr', 'hget', 'hset'
}

def validate_command(cmd):
    # Extract command and arguments
    parts = cmd.split()
    if not parts:
        return False, "No command provided"
    
    command = parts[0].lower()
    if command not in ALLOWED_COMMANDS:
        return False, f"Command '{command}' is not allowed"
    
    # Validate arguments
    if command in ['set', 'hset'] and len(parts) < 3:
        return False, f"Command '{command}' requires at least 2 arguments"
    
    return True, parts

@app.route('/redis-admin', methods=['GET'])
def redis_admin():
    cmd = request.args.get('cmd', '')
    
    if not cmd:
        return jsonify({
            'status': 'error',
            'message': 'No command provided'
        }), 400
    
    # Validate command
    is_valid, result = validate_command(cmd)
    if not is_valid:
        return jsonify({
            'status': 'error',
            'message': result
        }), 400
    
    try:
        # Execute command safely
        command = result[0]
        args = result[1:]
        
        if command == 'get' and args[0] == 'flag':
            return jsonify({
                'status': 'success',
                'flag': 'flag12_redis_2024'
            })
        
        # Execute command using getattr to avoid eval
        method = getattr(redis_client, command)
        result = method(*args)
        
        return jsonify({
            'status': 'success',
            'result': str(result)
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002) 