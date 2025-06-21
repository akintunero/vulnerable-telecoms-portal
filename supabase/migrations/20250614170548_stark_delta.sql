/*
  # Insert Sample Data for TelcoAdmin Portal

  1. Sample Data
    - Customers with various service plans and statuses
    - Network nodes across different locations
    - Service tickets with different priorities
    - SIM cards and swap requests
    - Financial transactions
    - Security events
    - Change requests
    - Network metrics
    - Compliance audits

  2. Purpose
    - Provide realistic test data for development
    - Demonstrate all features and functionality
    - Enable proper testing of the admin portal
*/

-- Insert sample customers
INSERT INTO customers (customer_id, name, email, phone, address, service_plan, monthly_revenue, status, join_date, last_payment_date, usage_gb) VALUES
('CUST-001', 'John Smith', 'john.smith@email.com', '+1-555-0123', '123 Main St, New York, NY', 'Fiber Pro 1GB', 89.99, 'active', '2023-01-15', '2024-01-01', 450),
('CUST-002', 'Sarah Johnson', 'sarah.j@email.com', '+1-555-0456', '456 Oak Ave, Los Angeles, CA', 'Cable Standard 300MB', 59.99, 'active', '2023-06-20', '2024-01-01', 280),
('CUST-003', 'Mike Davis', 'mike.davis@email.com', '+1-555-0789', '789 Pine Rd, Chicago, IL', 'DSL Basic 50MB', 39.99, 'suspended', '2022-11-10', '2023-12-15', 120),
('CUST-004', 'Emily Wilson', 'emily.w@email.com', '+1-555-0321', '321 Elm St, Houston, TX', 'Fiber Pro 1GB', 89.99, 'active', '2023-03-22', '2024-01-01', 520),
('CUST-005', 'David Brown', 'david.b@email.com', '+1-555-0654', '654 Maple Dr, Phoenix, AZ', 'Cable Standard 300MB', 59.99, 'active', '2023-08-10', '2024-01-01', 310);

-- Insert sample network nodes
INSERT INTO network_nodes (node_id, location, status, load_percentage, active_connections, uptime_percentage) VALUES
('NYC-01', 'New York', 'online', 67, 12450, 99.8),
('LAX-02', 'Los Angeles', 'online', 82, 9876, 99.5),
('CHI-03', 'Chicago', 'warning', 91, 8234, 98.9),
('MIA-04', 'Miami', 'offline', 0, 0, 95.2),
('DEN-05', 'Denver', 'online', 45, 5432, 99.9);

-- Insert sample service tickets
INSERT INTO service_tickets (ticket_id, customer_id, title, description, priority, status, category, assignee) VALUES
('TKT-2024-001', (SELECT id FROM customers WHERE customer_id = 'CUST-001'), 'Internet connectivity issues', 'Customer experiencing intermittent connection drops', 'high', 'in_progress', 'Network', 'Sarah Wilson'),
('TKT-2024-002', (SELECT id FROM customers WHERE customer_id = 'CUST-002'), 'Billing inquiry', 'Question about recent charges on account', 'medium', 'resolved', 'Billing', 'Mike Johnson'),
('TKT-2024-003', (SELECT id FROM customers WHERE customer_id = 'CUST-003'), 'Service upgrade request', 'Customer wants to upgrade to fiber service', 'low', 'open', 'Sales', 'Lisa Chen');

-- Insert sample SIM cards
INSERT INTO sim_cards (serial_number, customer_id, status, activation_date) VALUES
('SIM789456123', (SELECT id FROM customers WHERE customer_id = 'CUST-001'), 'active', '2023-01-15'),
('SIM456789012', (SELECT id FROM customers WHERE customer_id = 'CUST-002'), 'active', '2023-06-20'),
('SIM123789456', (SELECT id FROM customers WHERE customer_id = 'CUST-003'), 'suspended', '2022-11-10'),
('SIM987654321', NULL, 'available', NULL),
('SIM123456789', NULL, 'available', NULL),
('SIM654987321', NULL, 'available', NULL);

-- Insert sample SIM swap requests
INSERT INTO sim_swap_requests (request_id, customer_id, old_sim_serial, new_sim_serial, reason, verification_method, risk_score, location, status) VALUES
('SSR-2024-001', (SELECT id FROM customers WHERE customer_id = 'CUST-001'), 'SIM789456123', 'SIM987654321', 'Lost SIM card', 'SMS + Security Questions', 85, 'New York, NY', 'pending'),
('SSR-2024-002', (SELECT id FROM customers WHERE customer_id = 'CUST-002'), 'SIM456789012', 'SIM123456789', 'Device upgrade', 'In-store verification', 25, 'Los Angeles, CA', 'approved'),
('SSR-2024-003', (SELECT id FROM customers WHERE customer_id = 'CUST-003'), 'SIM123789456', 'SIM654987321', 'Damaged SIM', 'Phone verification failed', 95, 'Miami, FL', 'rejected');

-- Insert sample financial transactions
INSERT INTO financial_transactions (transaction_id, customer_id, amount, transaction_type, payment_method, status, description) VALUES
('TXN-2024-001', (SELECT id FROM customers WHERE customer_id = 'CUST-001'), 89.99, 'payment', 'Auto-pay', 'completed', 'Monthly service fee - Fiber Pro 1GB'),
('TXN-2024-002', (SELECT id FROM customers WHERE customer_id = 'CUST-002'), 59.99, 'payment', 'Credit Card', 'pending', 'Monthly service fee - Cable Standard 300MB'),
('TXN-2024-003', (SELECT id FROM customers WHERE customer_id = 'CUST-003'), 39.99, 'payment', 'Bank Transfer', 'failed', 'Monthly service fee - DSL Basic 50MB');

-- Insert sample security events
INSERT INTO security_events (event_type, title, description, source_ip, affected_resource, severity_score, status) VALUES
('critical', 'Unauthorized access attempt detected', 'Multiple failed login attempts from suspicious IP', '192.168.1.100', 'Admin Portal', 85, 'investigating'),
('warning', 'Unusual data transfer pattern', 'Large data transfer outside business hours', '10.0.0.50', 'File Server', 65, 'resolved'),
('info', 'Security patch applied', 'Critical security update deployed successfully', NULL, 'All Servers', 10, 'completed');

-- Insert sample change requests
INSERT INTO change_requests (change_id, title, description, requestor, priority, status, category, impact_level, scheduled_date, risk_assessment) VALUES
('CHG-2024-001', 'Network Infrastructure Upgrade', 'Upgrade core network switches to support increased bandwidth requirements', 'John Smith', 'high', 'approved', 'Infrastructure', 'high', '2024-01-20 02:00:00', 'Medium risk - potential service interruption during maintenance window'),
('CHG-2024-002', 'Security Patch Deployment', 'Deploy critical security patches to all customer-facing servers', 'Mike Johnson', 'critical', 'in_progress', 'Security', 'medium', '2024-01-16 01:00:00', 'Low risk - patches tested in staging environment'),
('CHG-2024-003', 'Customer Portal Enhancement', 'Add new self-service features to customer portal', 'Emily Davis', 'medium', 'pending', 'Software', 'low', '2024-01-25 10:00:00', 'Low risk - non-critical enhancement with rollback plan');

-- Insert sample network metrics
INSERT INTO network_metrics (metric_type, value, unit, node_id, timestamp)
VALUES ('uptime', 99.8, 'percentage', (SELECT id FROM network_nodes WHERE node_id = 'NYC-01'), DATE_SUB(NOW(), INTERVAL 1 HOUR));
INSERT INTO network_metrics (metric_type, value, unit, node_id, timestamp)
VALUES ('latency', 12.5, 'ms', (SELECT id FROM network_nodes WHERE node_id = 'NYC-01'), DATE_SUB(NOW(), INTERVAL 1 HOUR));
INSERT INTO network_metrics (metric_type, value, unit, node_id, timestamp)
VALUES ('bandwidth_usage', 78.5, 'percentage', (SELECT id FROM network_nodes WHERE node_id = 'NYC-01'), DATE_SUB(NOW(), INTERVAL 1 HOUR));
INSERT INTO network_metrics (metric_type, value, unit, node_id, timestamp)
VALUES ('uptime', 99.5, 'percentage', (SELECT id FROM network_nodes WHERE node_id = 'LAX-02'), DATE_SUB(NOW(), INTERVAL 1 HOUR));
INSERT INTO network_metrics (metric_type, value, unit, node_id, timestamp)
VALUES ('latency', 15.2, 'ms', (SELECT id FROM network_nodes WHERE node_id = 'LAX-02'), DATE_SUB(NOW(), INTERVAL 1 HOUR));
INSERT INTO network_metrics (metric_type, value, unit, node_id, timestamp)
VALUES ('bandwidth_usage', 82.1, 'percentage', (SELECT id FROM network_nodes WHERE node_id = 'LAX-02'), DATE_SUB(NOW(), INTERVAL 1 HOUR));

-- Insert sample compliance audits
INSERT INTO compliance_audits (audit_type, requirement_name, status, score, last_audit_date, next_audit_date, auditor, notes) VALUES
('GDPR', 'Data Encryption', 'compliant', 98, '2024-01-01', '2024-07-01', 'External Auditor', 'All data properly encrypted at rest and in transit'),
('SOC2', 'Access Controls', 'compliant', 95, '2024-01-05', '2024-07-05', 'Internal Team', 'Access controls properly implemented and monitored'),
('ISO27001', 'Incident Response', 'compliant', 97, '2024-01-10', '2024-07-10', 'External Auditor', 'Incident response procedures tested and documented'),
('PCI-DSS', 'Risk Assessment', 'pending', 0, '2023-12-15', '2024-01-15', 'Compliance Team', 'Annual risk assessment due for completion'),
('GDPR', 'Employee Training', 'compliant', 92, '2024-01-12', '2024-07-12', 'HR Department', 'All employees completed privacy training'),
('SOC2', 'Vendor Management', 'review', 75, '2023-12-20', '2024-01-20', 'Procurement Team', 'Vendor security assessments need updating');