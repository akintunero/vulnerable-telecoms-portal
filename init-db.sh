#!/bin/bash

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
while ! mysqladmin ping -h mysql -u root -ppassword --silent; do
    sleep 1
done

# Initialize database
echo "Initializing database..."
mysql -h mysql -u root -ppassword < flask/schema.sql

# Insert test data
echo "Inserting test data..."
mysql -h mysql -u root -ppassword telleak << EOF
-- Insert test users
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@telleak.com', '\$2b\$12\$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpR1IOBYyGqK.q', 'admin'),
('network_admin', 'network@telleak.com', '\$2b\$12\$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpR1IOBYyGqK.q', 'network_admin'),
('user', 'user@telleak.com', '\$2b\$12\$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpR1IOBYyGqK.q', 'user');

-- Insert test network devices
INSERT INTO network_devices (mac_address, ip_address, hostname, device_type) VALUES
('00:11:22:33:44:55', '192.168.1.100', 'router-1', 'router'),
('00:11:22:33:44:56', '192.168.1.101', 'switch-1', 'switch'),
('00:11:22:33:44:57', '192.168.1.102', 'ap-1', 'access_point');

-- Insert test network logs
INSERT INTO network_logs (device_id, event_type, description) VALUES
(1, 'startup', 'Router initialized'),
(2, 'config_change', 'Switch configuration updated'),
(3, 'client_connected', 'New client connected to AP');
EOF

echo "Database initialization complete!" 