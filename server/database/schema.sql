-- Telco Admin Database Schema
-- Create database if not exists
CREATE DATABASE IF NOT EXISTS telco_admin;
USE telco_admin;

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    service_plan ENUM('Basic', 'Standard', 'Premium', 'Enterprise') DEFAULT 'Basic',
    monthly_revenue DECIMAL(10,2) DEFAULT 0.00,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    join_date DATE,
    last_payment_date DATE,
    usage_gb DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Network nodes table
CREATE TABLE IF NOT EXISTS network_nodes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    node_id VARCHAR(50) UNIQUE NOT NULL,
    location VARCHAR(255) NOT NULL,
    status ENUM('online', 'offline', 'warning', 'maintenance') DEFAULT 'online',
    load_percentage DECIMAL(5,2) DEFAULT 0.00,
    active_connections INT DEFAULT 0,
    uptime_percentage DECIMAL(5,2) DEFAULT 100.00,
    last_check TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Service tickets table
CREATE TABLE IF NOT EXISTS service_tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id VARCHAR(50) UNIQUE NOT NULL,
    customer_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
    category VARCHAR(100),
    assignee VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- SIM swap requests table
CREATE TABLE IF NOT EXISTS sim_swap_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id VARCHAR(50) UNIQUE NOT NULL,
    customer_id INT,
    old_sim_serial VARCHAR(50) NOT NULL,
    new_sim_serial VARCHAR(50) NOT NULL,
    reason TEXT,
    verification_method ENUM('SMS', 'Email', 'Phone', 'ID') DEFAULT 'SMS',
    risk_score INT DEFAULT 0,
    location VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
    approved_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- Financial transactions table
CREATE TABLE IF NOT EXISTS financial_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id VARCHAR(50) UNIQUE NOT NULL,
    customer_id INT,
    amount DECIMAL(10,2) NOT NULL,
    transaction_type ENUM('subscription', 'one_time', 'refund', 'adjustment') DEFAULT 'subscription',
    payment_method ENUM('credit_card', 'debit_card', 'bank_transfer', 'cash') DEFAULT 'credit_card',
    status ENUM('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- Security events table
CREATE TABLE IF NOT EXISTS security_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type ENUM('warning', 'error', 'info', 'critical') DEFAULT 'info',
    title VARCHAR(255) NOT NULL,
    description TEXT,
    source_ip VARCHAR(45),
    affected_resource VARCHAR(255),
    severity_score INT DEFAULT 0,
    status ENUM('investigating', 'resolved', 'false_positive') DEFAULT 'investigating',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Change requests table
CREATE TABLE IF NOT EXISTS change_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    change_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    requestor VARCHAR(255) NOT NULL,
    priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    status ENUM('pending', 'approved', 'rejected', 'in_progress', 'completed') DEFAULT 'pending',
    category VARCHAR(100),
    impact_level ENUM('low', 'medium', 'high', 'critical') DEFAULT 'low',
    scheduled_date TIMESTAMP NULL,
    approver VARCHAR(255),
    risk_assessment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Network metrics table
CREATE TABLE IF NOT EXISTS network_metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metric_type VARCHAR(50) NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20),
    node_id INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (node_id) REFERENCES network_nodes(id) ON DELETE SET NULL
);

-- Compliance audits table
CREATE TABLE IF NOT EXISTS compliance_audits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    audit_type VARCHAR(100) NOT NULL,
    requirement_name VARCHAR(255) NOT NULL,
    status ENUM('passed', 'failed', 'pending') DEFAULT 'pending',
    score INT DEFAULT 0,
    last_audit_date DATE,
    next_audit_date DATE,
    auditor VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'operator', 'viewer') DEFAULT 'viewer',
    avatar VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (name, email, password_hash, role) VALUES 
('Admin User', 'admin@telco.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert sample customers
INSERT INTO customers (customer_id, name, email, phone, address, service_plan, monthly_revenue, status, join_date, last_payment_date, usage_gb) VALUES
('CUST001', 'John Doe', 'john@example.com', '+1234567890', '123 Main St', 'Premium', 99.99, 'active', '2024-01-01', '2024-03-01', 45.5),
('CUST002', 'Jane Smith', 'jane@example.com', '+1987654321', '456 Oak Ave', 'Basic', 49.99, 'active', '2024-02-01', '2024-03-01', 25.3);

-- Insert sample network nodes
INSERT INTO network_nodes (node_id, location, status, load_percentage, active_connections, uptime_percentage) VALUES
('NODE001', 'New York', 'online', 65.00, 1200, 99.90),
('NODE002', 'Los Angeles', 'warning', 85.00, 1500, 99.80);

-- Insert sample service tickets
INSERT INTO service_tickets (ticket_id, customer_id, title, description, priority, status, category) VALUES
('TICKET001', 1, 'Internet Connection Issues', 'Experiencing slow internet speeds', 'high', 'open', 'Technical Support');

-- Insert sample security events
INSERT INTO security_events (event_type, title, description, source_ip, affected_resource, severity_score, status) VALUES
('warning', 'Unusual Login Attempt', 'Multiple failed login attempts detected', '192.168.1.1', 'Customer Portal', 60, 'investigating');

-- Insert sample compliance audits
INSERT INTO compliance_audits (audit_type, requirement_name, status, score, last_audit_date, next_audit_date, auditor, notes) VALUES
('security', 'Data Encryption', 'passed', 95, '2025-05-01', '2025-06-01', 'Security Team', 'All encryption requirements met');
