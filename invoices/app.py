from flask import Flask, render_template, request, send_file
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///invoices.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Invoice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(20), nullable=False, default='pending')

@app.route('/')
def index():
    invoices = Invoice.query.all()
    return render_template('index.html', invoices=invoices)

@app.route('/invoice/<int:invoice_id>')
def view_invoice(invoice_id):
    invoice = Invoice.query.get_or_404(invoice_id)
    return render_template('invoice.html', invoice=invoice)

@app.route('/invoice/<int:invoice_id>/pdf')
def download_invoice(invoice_id):
    invoice = Invoice.query.get_or_404(invoice_id)
    
    # Create PDF
    filename = f'invoice_{invoice.id}.pdf'
    filepath = os.path.join(app.root_path, 'static', filename)
    
    c = canvas.Canvas(filepath, pagesize=letter)
    c.drawString(100, 750, f"Invoice #{invoice.id}")
    c.drawString(100, 700, f"Customer: {invoice.customer_id}")
    c.drawString(100, 650, f"Amount: ${invoice.amount}")
    c.drawString(100, 600, f"Date: {invoice.date.strftime('%Y-%m-%d')}")
    c.save()
    
    return send_file(filepath, as_attachment=True)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=7000) 