# TelLeak ISP - Open Source ISP Infrastructure Simulation

TelLeak ISP is an open-source project that simulates a complete Internet Service Provider (ISP) infrastructure. This project is designed for educational purposes, security research, and penetration testing practice.

> ⚠️ **IMPORTANT**: This project contains intentionally vulnerable components and should ONLY be run in a sandboxed environment. Never deploy this in a production environment or on a system with sensitive data.

## 🌟 Features

### Admin Dashboard
- **User Management**
  - Authentication and authorization with JWT
  - Role-based access control (Admin, Operator, Viewer)
  - User activity monitoring and audit logs
  - Session management with automatic timeout
  - Two-factor authentication support

- **Network Management**
  - Real-time network monitoring with SNMP
  - Bandwidth utilization tracking and graphs
  - Device inventory management with auto-discovery
  - IP address management (IPv4/IPv6)
  - Network topology visualization with interactive maps
  - BGP route monitoring and management
  - VLAN and subnet management

- **Security Features**
  - Security metrics dashboard with real-time alerts
  - Comprehensive audit logging
  - Incident tracking and response
  - Compliance monitoring (GDPR, PCI-DSS)
  - Firewall management and rule sets
  - Intrusion detection system integration
  - Vulnerability scanning and reporting

- **Customer Management**
  - Customer portal integration with SSO
  - Automated billing and invoicing
  - Service provisioning with templates
  - Support ticket system with SLA tracking
  - Customer usage analytics
  - Service level agreement monitoring
  - Customer feedback management

### Core Services
- **Backend Services**
  - Next.js-based admin interface (TypeScript)
  - Flask API backend with RESTful endpoints
  - MySQL database with replication
  - Redis caching for performance
  - JWT authentication with refresh tokens
  - WebSocket support for real-time updates
  - API rate limiting and throttling

- **Network Services**
  - DNS (BIND9) with DNSSEC support
  - Authentication (FreeRADIUS) with MFA
  - SNMP monitoring with custom MIBs
  - BGP routing (FRR) with route filtering
  - DHCP server with dynamic allocation
  - NetFlow collector with analysis
  - Load balancing and failover

- **Additional Services**
  - VoIP (Asterisk) with SIP trunking
  - FTP server with secure transfer
  - IRC server for internal communication
  - SMS API for notifications
  - Email server with spam filtering
  - Git repository for configuration
  - Monitoring and alerting system

## 🚀 Getting Started

### Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- Node.js 18+
- Git
- 4GB RAM minimum
- 20GB free disk space
- A sandboxed environment (VM, container, or isolated network)

### Installation

1. **Set up a sandboxed environment:**
   ```bash
   # Option 1: Create a new VM
   # Option 2: Use Docker's network isolation
   # Option 3: Set up a dedicated test network
   ```

2. Clone the repository:
   ```bash
   git clone https://github.com/akintunero/vulnerable-telecoms-portal.git
   cd vulnerable-telecoms-portal
   ```

3. Install dependencies:
```bash
cd admin-ui
npm install
```

4. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Start the services:
```bash
docker-compose up -d
```

6. Initialize the database:
```bash
./init-db.sh
```

7. Access the services:
- Admin Dashboard: http://localhost:3001
- API Backend: http://localhost:5001
- Router UI: http://localhost:3003
- Social Platform: http://localhost:3002

## 🔒 Security Considerations

This project is designed for educational purposes and security research. Please note:

- **ALWAYS run in a sandboxed environment**
- All services run in isolated Docker containers
- Default credentials are used for demonstration
- Production deployment requires proper security hardening
- Regular security updates are recommended
- Implement proper authentication and authorization
- Use secure communication channels (TLS)
- Follow security best practices
- Enable audit logging and monitoring
- Implement rate limiting and DDoS protection
- Use secure password policies
- Regular security assessments
- Backup and disaster recovery planning

### Sandboxing Recommendations

1. **Virtual Machine:**
   - Use a dedicated VM with no access to production networks
   - Configure VM networking in isolated mode
   - Regular VM snapshots for testing
   - No shared resources with host system

2. **Docker Environment:**
   - Use Docker's network isolation features
   - Implement resource limits
   - Regular container cleanup
   - No volume mounts to host system

3. **Network Isolation:**
   - Dedicated test network
   - No access to production systems
   - Firewall rules to prevent external access
   - Regular network monitoring

4. **System Requirements:**
   - No sensitive data on host system
   - Regular system updates
   - Antivirus/malware protection
   - Network monitoring tools

## 🐛 Known Issues

- See the [Issues](https://github.com/akintunero/vulnerable-telecoms-portal/issues) page
- Check the [FAQ](docs/FAQ.md) for common problems
- Review the [Troubleshooting Guide](docs/TROUBLESHOOTING.md)
- **IMPORTANT**: Running without proper sandboxing may expose your system to security risks

## 📚 Service Documentation

### Admin Dashboard
- **Port**: 3001
- **Framework**: Next.js 13+
- **Features**:
  - Modern React components with TypeScript
  - Real-time data updates via WebSocket
  - Responsive design with Tailwind CSS
  - Dark/Light mode with theme persistence
  - Interactive charts with Recharts
  - Form handling with React Hook Form
  - State management with React Query

### API Backend
- **Port**: 5001
- **Framework**: Flask 2.0+
- **Features**:
  - RESTful API with OpenAPI documentation
  - JWT authentication with refresh tokens
  - Rate limiting with Redis
  - Request validation with Pydantic
  - Error handling with custom exceptions
  - Logging with structured format
  - CORS support with configurable origins

### Database
- **Type**: MySQL 8.0
- **Port**: 3306
- **Features**:
  - User management with roles
  - Network configuration storage
  - Customer data with encryption
  - Audit logs with retention policy
  - Service records with versioning
  - Backup and restore functionality
  - Replication for high availability

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write unit tests for new features
- Update documentation for changes
- Follow the existing code style
- Add appropriate error handling
- Include security considerations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- All open-source projects used in this infrastructure
- Contributors and maintainers
- The open-source community

## 📧 Support

For support, please:
- Open an issue in the GitHub repository
- Check the documentation
- Join our community discussions
- Contact the maintainers

## 🔄 Updates

Stay updated with our latest changes by:
- Watching the repository
- Following our release notes
- Checking the changelog
- Joining our mailing list

---

(c) Olúmáyòwá 2024 