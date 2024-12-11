from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import os

def generate_invoice(customer_id, amount):
    filename = f"invoice_{customer_id}.pdf"
    c = canvas.Canvas(filename, pagesize=letter)
    
    # Add invoice content
    c.drawString(100, 750, f"Invoice for Customer {customer_id}")
    c.drawString(100, 730, f"Amount: ${amount}")
    
    # Add hidden metadata with flag
    c.setAuthor("flag11_pdf_2024")
    c.setTitle(f"Invoice {customer_id}")
    c.setSubject("TelLeak ISP Invoice")
    
    c.save()
    return filename

if __name__ == "__main__":
    # Generate sample invoice
    generate_invoice("12345", "150.00") 