# TelLeak ISP - Open Source ISP Infrastructure Simulation

TelLeak ISP is an open-source project that simulates a complete Internet Service Provider (ISP) infrastructure. This project is designed for educational purposes, security research, and penetration testing practice.

## 🌟 Features

- **Core Services**
  - Flask-based web interface
  - Redis caching
  - MySQL database
  - VoIP (Asterisk)
  - DNS (BIND9)
  - Authentication (FreeRADIUS)

- **Network Services**
  - FTP server
  - SNMP monitoring
  - BGP routing (FRR)
  - IRC server
  - SMS API
  - Router UI
  - DHCP server
  - NetFlow collector

- **Additional Services**
  - Git repository
  - Email server
  - Invoice system
  - Social platform
  - Admin dashboard

## 🚀 Getting Started

### Prerequisites

- Docker
- Docker Compose
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/telleak-isp.git
cd telleak-isp
```

2. Start the services:
```bash
docker-compose up -d
```

3. Access the services:
- Web Interface: http://localhost:5001
- Admin Dashboard: http://localhost:4000
- Router UI: http://localhost:8080
- Social Platform: http://localhost:3000

## 📚 Service Documentation

### Core Services
- **Flask**: Main web interface running on port 5001
- **Redis**: Caching service on port 6379
- **MySQL**: Database service on port 3306
- **Asterisk**: VoIP service on port 5060/UDP
- **BIND**: DNS service on port 53/UDP
- **FreeRADIUS**: Authentication service on port 1812/UDP

### Network Services
- **FTP**: File transfer service on port 21
- **SNMP**: Network monitoring on port 161/UDP
- **FRR**: BGP routing on port 179
- **IRC**: Chat service on port 6667
- **SMS API**: Messaging service on port 8000
- **DHCP**: Dynamic IP assignment
- **NetFlow**: Traffic analysis on port 9995/UDP

## 🔒 Security Considerations

This project is designed for educational purposes and security research. Please note:

- All services run in isolated Docker containers
- Default credentials are used for demonstration
- Production deployment requires proper security hardening
- Regular security updates are recommended

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All open-source projects used in this infrastructure
- Contributors and maintainers
- The open-source community

## 📞 Support

For support, please:
- Open an issue in the GitHub repository
- Check the documentation
- Join our community discussions

## 🔄 Updates

Stay updated with our latest changes by:
- Watching the repository
- Following our release notes
- Checking the changelog

---

Made with ❤️ by the TelLeak ISP Team 