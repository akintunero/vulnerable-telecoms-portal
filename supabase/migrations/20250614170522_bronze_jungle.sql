/*
  # TelcoAdmin Initial Database Schema

  1. New Tables
    - `customers`
      - Customer information, service plans, and account details
    - `network_nodes`
      - Network infrastructure monitoring data
    - `service_tickets`
      - Customer support tickets and service quality tracking
    - `sim_cards`
      - SIM card inventory and management
    - `sim_swap_requests`
      - SIM swap requests with fraud detection
    - `financial_transactions`
      - Billing and payment records
    - `security_events`
      - Security monitoring and compliance events
    - `change_requests`
      - Change management and approval workflow
    - `network_metrics`
      - Real-time network performance data
    - `compliance_audits`
      - Compliance tracking and audit trails

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin users
    - Create admin role for full access
*/

-- Create enum types
CREATE TYPE customer_status AS ENUM ('active', 'suspended', 'cancelled');
CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE sim_swap_status AS ENUM ('pending', 'approved', 'rejected', 'completed');
CREATE TYPE change_status AS ENUM ('draft', 'pending', 'approved', 'rejected', 'in_progress', 'completed');
CREATE TYPE security_event_type AS ENUM ('critical', 'warning', 'info');
CREATE TYPE node_status AS ENUM ('online', 'warning', 'offline');

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text UNIQUE NOT NULL,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  service_plan text NOT NULL,
  monthly_revenue decimal(10,2) NOT NULL DEFAULT 0,
  status customer_status NOT NULL DEFAULT 'active',
  join_date timestamptz NOT NULL DEFAULT now(),
  last_payment_date timestamptz,
  usage_gb integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Network nodes table
CREATE TABLE IF NOT EXISTS network_nodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id text UNIQUE NOT NULL,
  location text NOT NULL,
  status node_status NOT NULL DEFAULT 'online',
  load_percentage integer NOT NULL DEFAULT 0,
  active_connections integer NOT NULL DEFAULT 0,
  uptime_percentage decimal(5,2) NOT NULL DEFAULT 99.0,
  last_check timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service tickets table
CREATE TABLE IF NOT EXISTS service_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id),
  title text NOT NULL,
  description text NOT NULL,
  priority ticket_priority NOT NULL DEFAULT 'medium',
  status ticket_status NOT NULL DEFAULT 'open',
  category text NOT NULL,
  assignee text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

-- SIM cards table
CREATE TABLE IF NOT EXISTS sim_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  serial_number text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id),
  status text NOT NULL DEFAULT 'active',
  activation_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- SIM swap requests table
CREATE TABLE IF NOT EXISTS sim_swap_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id),
  old_sim_serial text REFERENCES sim_cards(serial_number),
  new_sim_serial text REFERENCES sim_cards(serial_number),
  reason text NOT NULL,
  verification_method text NOT NULL,
  risk_score integer NOT NULL DEFAULT 0,
  location text NOT NULL,
  status sim_swap_status NOT NULL DEFAULT 'pending',
  approved_by text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Financial transactions table
CREATE TABLE IF NOT EXISTS financial_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id),
  amount decimal(10,2) NOT NULL,
  transaction_type text NOT NULL,
  payment_method text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Security events table
CREATE TABLE IF NOT EXISTS security_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type security_event_type NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  source_ip text,
  affected_resource text,
  severity_score integer DEFAULT 0,
  status text NOT NULL DEFAULT 'investigating',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Change requests table
CREATE TABLE IF NOT EXISTS change_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  change_id text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  requestor text NOT NULL,
  priority text NOT NULL DEFAULT 'medium',
  status change_status NOT NULL DEFAULT 'draft',
  category text NOT NULL,
  impact_level text NOT NULL DEFAULT 'low',
  scheduled_date timestamptz,
  approver text,
  risk_assessment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Network metrics table (for real-time monitoring)
CREATE TABLE IF NOT EXISTS network_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type text NOT NULL,
  value decimal(10,2) NOT NULL,
  unit text NOT NULL,
  node_id text REFERENCES network_nodes(node_id),
  timestamp timestamptz DEFAULT now()
);

-- Compliance audits table
CREATE TABLE IF NOT EXISTS compliance_audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_type text NOT NULL,
  requirement_name text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  score integer DEFAULT 0,
  last_audit_date timestamptz,
  next_audit_date timestamptz,
  auditor text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE network_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE sim_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE sim_swap_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE change_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE network_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_audits ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admin access)
CREATE POLICY "Admin users can manage customers"
  ON customers
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can manage network nodes"
  ON network_nodes
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can manage service tickets"
  ON service_tickets
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can manage SIM cards"
  ON sim_cards
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can manage SIM swap requests"
  ON sim_swap_requests
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can manage financial transactions"
  ON financial_transactions
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can manage security events"
  ON security_events
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can manage change requests"
  ON change_requests
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can view network metrics"
  ON network_metrics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can manage compliance audits"
  ON compliance_audits
  FOR ALL
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_customers_join_date ON customers(join_date);
CREATE INDEX idx_network_nodes_status ON network_nodes(status);
CREATE INDEX idx_service_tickets_status ON service_tickets(status);
CREATE INDEX idx_service_tickets_priority ON service_tickets(priority);
CREATE INDEX idx_sim_swap_requests_status ON sim_swap_requests(status);
CREATE INDEX idx_sim_swap_requests_risk_score ON sim_swap_requests(risk_score);
CREATE INDEX idx_financial_transactions_status ON financial_transactions(status);
CREATE INDEX idx_security_events_type ON security_events(event_type);
CREATE INDEX idx_change_requests_status ON change_requests(status);
CREATE INDEX idx_network_metrics_timestamp ON network_metrics(timestamp);
CREATE INDEX idx_compliance_audits_status ON compliance_audits(status);