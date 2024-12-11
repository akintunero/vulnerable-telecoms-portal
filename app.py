from flask import Flask, request, jsonify
import redis
import pymysql
from Crypto.Cipher import AES
import os

app = Flask(__name__)

# Vulnerable Redis connection
redis_client = redis.Redis(host='redis', port=6379, db=0)

# Vulnerable MySQL connection
db = pymysql.connect(
    host='mysql',
    user='user',
    password='password',
    database='telisp'
)

# Flag 2: Broken auth on billing API
@app.route('/api/v1/bill', methods=['GET'])
def get_bill():
    bill_id = request.args.get('id')
    if bill_id == '999':
        return jsonify({'flag': 'flag{broken_auth_123}'})
    return jsonify({'error': 'Not authorized'}), 403

# Flag 12: Exploitable Redis config
@app.route('/redis-admin', methods=['GET'])
def redis_admin():
    if request.args.get('cmd'):
        return str(redis_client.execute_command(request.args.get('cmd')))
    return 'Redis admin interface', 200

# Flag 5: SQL Injection on admin panel
@app.route('/admin/search', methods=['GET'])
def admin_search():
    query = request.args.get('query')
    cursor = db.cursor()
    cursor.execute(f"SELECT * FROM users WHERE username = '{query}'")
    return jsonify(cursor.fetchall())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 