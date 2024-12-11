from flask import Flask, request, jsonify
import stripe
import os

app = Flask(__name__)

# Initialize Stripe
stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')

@app.route('/api/invoices', methods=['POST'])
def create_invoice():
    data = request.json
    try:
        invoice = stripe.Invoice.create(
            customer=data['customer_id'],
            auto_advance=True,
            collection_method='send_invoice',
            days_until_due=30
        )
        return jsonify({'status': 'success', 'invoice_id': invoice.id})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000) 