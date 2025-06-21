# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Added
- Initial release of TelcoAdmin Portal CTF
- React/TypeScript frontend with comprehensive dashboard
- Node.js/Express backend with MySQL database
- Docker containerization for easy deployment
- 23 intentionally embedded security vulnerabilities for educational purposes
- Complete CTF challenge environment with scoring system
- Comprehensive documentation and setup instructions

### Features
- **Frontend**: Modern React dashboard with multiple modules
  - Customer management
  - Network monitoring
  - Security controls
  - Reporting and analytics
  - User management
  - Service management

- **Backend**: Express.js API with multiple endpoints
  - Authentication and authorization
  - Customer data management
  - Network monitoring
  - Security controls
  - Financial reporting
  - Change management

- **Database**: MySQL with comprehensive schema
  - User management tables
  - Customer data tables
  - Network monitoring tables
  - Security and compliance tables

- **CTF Features**:
  - 23 realistic security vulnerabilities
  - Educational challenge design
  - Isolated Docker environment
  - Comprehensive documentation
  - Scoring system

### Security Vulnerabilities Embedded
1. Insecure CORS configuration
2. Weak JWT secret fallback
3. Information leakage in error messages
4. IDOR vulnerability in customer data
5. Race condition in user registration
6. Unvalidated redirects
7. Prototype pollution vulnerability
8. ReDoS vulnerability in input validation
9. Path traversal vulnerability
10. Insecure deserialization
11. Sensitive data exposure
12. Weak password policy
13. XSS vulnerability
14. CSRF risk
15. Insecure randomness
16. Deprecated crypto usage
17. Unrestricted file upload
18. Additional CVE-inspired vulnerabilities

### Technical Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MySQL 8.0
- **Containerization**: Docker, Docker Compose
- **Authentication**: JWT-based
- **UI Components**: Custom components with modern design

### Documentation
- Comprehensive README with setup instructions
- CTF challenge guidelines
- Docker deployment guide
- Vulnerability documentation
- Contributing guidelines
- Code of conduct
- Security policy
- License (MIT)

### Infrastructure
- Docker containerization for all services
- Automated database initialization
- Environment variable configuration
- Health checks and monitoring
- CTF warning system on startup

---

## Version History

- **1.0.0**: Initial release with complete CTF environment

## Future Plans

- Additional vulnerability types
- Enhanced scoring system
- More complex challenge scenarios
- Integration with security tools
- Community contributions and improvements

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 