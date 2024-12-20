CREATE DATABASE IF NOT EXISTS telco_admin;
USE telco_admin;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(36) PRIMARY KEY,
    customer_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT,
    service_plan VARCHAR(50) NOT NULL,
    monthly_revenue DECIMAL(10,2) NOT NULL,
    status ENUM('active', 'suspended', 'cancelled') NOT NULL,
    join_date DATE NOT NULL,
    last_payment_date DATE,
    usage_gb DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Network Nodes table
CREATE TABLE IF NOT EXISTS network_nodes (
    id VARCHAR(36) PRIMARY KEY,
    node_id VARCHAR(50) UNIQUE NOT NULL,
    location VARCHAR(255) NOT NULL,
    status ENUM('online', 'warning', 'offline') NOT NULL,
    load_percentage DECIMAL(5,2),
    active_connections INT,
    uptime_percentage DECIMAL(5,2),
    last_check TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Service Tickets table
CREATE TABLE IF NOT EXISTS service_tickets (
    id VARCHAR(36) PRIMARY KEY,
    ticket_id VARCHAR(50) UNIQUE NOT NULL,
    customer_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority ENUM('low', 'medium', 'high', 'critical') NOT NULL,
    status ENUM('open', 'in_progress', 'resolved', 'closed') NOT NULL,
    category VARCHAR(100) NOT NULL,
    assignee VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- SIM Swap Requests table
CREATE TABLE IF NOT EXISTS sim_swap_requests (
    id VARCHAR(36) PRIMARY KEY,
    request_id VARCHAR(50) UNIQUE NOT NULL,
    customer_id VARCHAR(36) NOT NULL,
    old_sim_serial VARCHAR(50) NOT NULL,
    new_sim_serial VARCHAR(50) NOT NULL,
    reason TEXT NOT NULL,
    verification_method VARCHAR(100) NOT NULL,
    risk_score INT NOT NULL,
    location VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected', 'completed') NOT NULL,
    approved_by VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Financial Transactions table
CREATE TABLE IF NOT EXISTS financial_transactions (
    id VARCHAR(36) PRIMARY KEY,
    transaction_id VARCHAR(50) UNIQUE NOT NULL,
    customer_id VARCHAR(36) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Security Events table
CREATE TABLE IF NOT EXISTS security_events (
    id VARCHAR(36) PRIMARY KEY,
    event_type ENUM('critical', 'warning', 'info') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    source_ip VARCHAR(45),
    affected_resource VARCHAR(255),
    severity_score INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Change Requests table
CREATE TABLE IF NOT EXISTS change_requests (
    id VARCHAR(36) PRIMARY KEY,
    change_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requestor VARCHAR(36) NOT NULL,
    priority VARCHAR(50) NOT NULL,
    status ENUM('draft', 'pending', 'approved', 'rejected', 'in_progress', 'completed') NOT NULL,
    category VARCHAR(100) NOT NULL,
    impact_level VARCHAR(50) NOT NULL,
    scheduled_date TIMESTAMP,
    approver VARCHAR(36),
    risk_assessment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (requestor) REFERENCES users(id),
    FOREIGN KEY (approver) REFERENCES users(id)
);

-- Network Metrics table
CREATE TABLE IF NOT EXISTS network_metrics (
    id VARCHAR(36) PRIMARY KEY,
    metric_type VARCHAR(50) NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    node_id VARCHAR(36),
    timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (node_id) REFERENCES network_nodes(id)
);

-- Compliance Audits table
CREATE TABLE IF NOT EXISTS compliance_audits (
    id VARCHAR(36) PRIMARY KEY,
    audit_type VARCHAR(50) NOT NULL,
    requirement_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    last_audit_date TIMESTAMP,
    next_audit_date TIMESTAMP,
    auditor VARCHAR(36),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (auditor) REFERENCES users(id)
); 