from flask import Flask, request, make_response

app = Flask(__name__)

# Flag 20: XSS + reflected parameter
@app.route('/api/sms/send', methods=['GET'])
def send_sms():
    message = request.args.get('message', '')
    token = request.args.get('token', '')
    
    # Vulnerable: XSS in message parameter
    if token == 'admin':
        return f"Flag: flag20_sms_xss_2024 - Message sent: {message}"
    else:
        # No XSS protection
        resp = make_response(f"Message preview: {message}")
        resp.headers['X-XSS-Protection'] = '0'
        return resp

@app.route('/send', methods=['POST'])
def send_sms():
    number = request.form.get('number')
    message = request.form.get('message')
    # Vulnerable: directly reflect user input in response
    return f"<h1>Message sent to {number}: {message}</h1>"

@app.route('/debug', methods=['GET'])
def debug():
    message = request.args.get('message', '')
    return f"<h1>Debug: {message}</h1>"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000) 