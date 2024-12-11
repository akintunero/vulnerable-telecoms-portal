from flask import Flask, request, jsonify
from twilio.rest import Client
import os

app = Flask(__name__)

# Initialize Twilio client
account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
client = Client(account_sid, auth_token)

@app.route('/api/sms', methods=['POST'])
def send_sms():
    data = request.json
    try:
        message = client.messages.create(
            body=data['message'],
            from_=data['from'],
            to=data['to']
        )
        return jsonify({'status': 'success', 'sid': message.sid})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000) 