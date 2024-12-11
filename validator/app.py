from flask import Flask, request, jsonify
import hashlib
import os
from datetime import datetime

app = Flask(__name__)

# Flag hashes (in production, these would be stored securely)
FLAGS = {
    'flag1': hashlib.sha256('TELISP{SQL_INJECTION_MASTER}'.encode()).hexdigest(),
    'flag2': hashlib.sha256('TELISP{XSS_OVERLORD}'.encode()).hexdigest(),
    'flag3': hashlib.sha256('TELISP{COMMAND_INJECTION_KING}'.encode()).hexdigest(),
    'flag4': hashlib.sha256('TELISP{CSRF_WARRIOR}'.encode()).hexdigest(),
    'flag5': hashlib.sha256('TELISP{SSRF_CHAMPION}'.encode()).hexdigest(),
    'flag6': hashlib.sha256('TELISP{XXE_EXPERT}'.encode()).hexdigest(),
    'flag7': hashlib.sha256('TELISP{INSECURE_DESERIALIZATION_MASTER}'.encode()).hexdigest(),
    'flag8': hashlib.sha256('TELISP{INSECURE_DESERIALIZATION_MASTER}'.encode()).hexdigest(),
    'flag9': hashlib.sha256('TELISP{INSECURE_DESERIALIZATION_MASTER}'.encode()).hexdigest(),
    'flag10': hashlib.sha256('TELISP{INSECURE_DESERIALIZATION_MASTER}'.encode()).hexdigest(),
    'flag11': hashlib.sha256('TELISP{INSECURE_DESERIALIZATION_MASTER}'.encode()).hexdigest(),
    'flag12': hashlib.sha256('TELISP{INSECURE_DESERIALIZATION_MASTER}'.encode()).hexdigest(),
    'flag13': hashlib.sha256('TELISP{INSECURE_DESERIALIZATION_MASTER}'.encode()).hexdigest(),
    'flag14': hashlib.sha256('TELISP{INSECURE_DESERIALIZATION_MASTER}'.encode()).hexdigest(),
    'flag15': hashlib.sha256('TELISP{INSECURE_DESERIALIZATION_MASTER}'.encode()).hexdigest(),
    'flag16': hashlib.sha256('TELISP{INSECURE_DESERIALIZATION_MASTER}'.encode()).hexdigest(),
    'flag17': hashlib.sha256('TELISP{INSECURE_DESERIALIZATION_MASTER}'.encode()).hexdigest(),
    'flag18': hashlib.sha256('TELISP{INSECURE_DESERIALIZATION_MASTER}'.encode()).hexdigest(),
    'flag19': hashlib.sha256('TELISP{INSECURE_DESERIALIZATION_MASTER}'.encode()).hexdigest(),
    'flag20': hashlib.sha256('TELISP{INSECURE_DESERIALIZATION_MASTER}'.encode()).hexdigest(),
}

@app.route('/validate', methods=['POST'])
def validate_flag():
    data = request.get_json()
    if not data or 'flag' not in data:
        return jsonify({'error': 'No flag provided'}), 400

    flag = data['flag']
    flag_hash = hashlib.sha256(flag.encode()).hexdigest()

    # Log the attempt
    log_attempt(flag)

    # Check if the flag is valid
    if flag_hash in FLAGS.values():
        return jsonify({
            'status': 'success',
            'message': 'Flag is valid!'
        })
    else:
        return jsonify({
            'status': 'error',
            'message': 'Invalid flag'
        }), 400

def log_attempt(flag):
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    log_entry = f"{timestamp} - Attempt: {flag}\n"
    
    with open('flag_attempts.log', 'a') as f:
        f.write(log_entry)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001) 