# TelcoAdmin - Vulnerable Telecoms Portal

A comprehensive telecommunications management portal built with React, Node.js, and MySQL. This project is designed for educational purposes and contains intentional vulnerabilities for security testing and learning.

## 🚀 Quick Start

### Prerequisites
- Docker
- Docker Compose

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vulnerable-telecoms-portal.git
   cd vulnerable-telecoms-portal
   ```

2. **Start the application**
   ```bash
   docker compose up -d
   ```

3. **Access the application**
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:3000
   - **Database**: localhost:3306

## 🔐 Login Credentials

### Admin User
- **Email**: `admin@telco.com`
- **Password**: `admin123`

### System User
- **Email**: `sys@telco.com`
- **Password**: `sysaccess`

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MySQL 8.0
- **Containerization**: Docker + Docker Compose

## 📁 Project Structure

```
vulnerable-telecoms-portal/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   └── services/          # API services
├── server/                # Backend Node.js application
│   ├── src/               # Source code
│   ├── database/          # Database schema
│   └── scripts/           # Database scripts
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile             # Frontend Dockerfile
└── server/Dockerfile      # Backend Dockerfile
```

## 🛠️ Development

### Running in Development Mode

1. **Frontend Development**
   ```bash
   cd src
   npm install
   npm run dev
   ```

2. **Backend Development**
   ```bash
   cd server
   npm install
   npm run dev
   ```

### Building for Production

```bash
# Build frontend
npm run build

# Build backend
cd server
npm run build
```

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables (optional):

- `VITE_SUPABASE_URL`: Supabase URL (optional)
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key (optional)

### Database Configuration

Database settings are configured in `docker-compose.yml`:
- **Host**: `db` (internal Docker network)
- **Database**: `telco_admin`
- **Username**: `root`
- **Password**: `your_password`

## 🚨 Security Notice

⚠️ **This application contains intentional vulnerabilities for educational purposes. Do not deploy to production environments.**

## 📝 Features

- **Dashboard**: Overview of telecom operations
- **Network Management**: Network topology and monitoring
- **Customer Management**: Customer accounts and provisioning
- **Service Management**: MPLS, VPN, and security services
- **Support System**: Ticketing and SLA monitoring
- **Reporting**: Financial KPIs and usage reports
- **Inventory Management**: Asset tracking and device management
- **User Management**: Role-based access control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the Docker logs: `docker compose logs`
2. Ensure all prerequisites are installed
3. Try rebuilding: `docker compose build --no-cache`
4. Open an issue on GitHub

## 🔄 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 5173, 3000, and 3306 are available
2. **Permission issues**: Run Docker commands with appropriate permissions
3. **Build failures**: Clear Docker cache and rebuild: `docker compose build --no-cache`

### Reset Everything

```bash
# Stop and remove all containers
docker compose down

# Remove all volumes (WARNING: This will delete all data)
docker compose down -v

# Rebuild and start fresh
docker compose up -d --build
```

# CTF Challenge: TelcoAdmin Portal Vulnerable Edition

> **NOTE:** For your safety and the safety of others, this CTF environment must only be run using Docker as provided. **Do not run on your host system or deploy to the public internet.**

Welcome to the TelcoAdmin Portal CTF Challenge!

This version of the application has been intentionally modified to include **23 subtle, realistic security vulnerabilities** for educational and Capture The Flag (CTF) purposes. Your mission is to find and exploit as many vulnerabilities as you can.


## Objectives

1. **Find** as many vulnerabilities as possible (there are 23 in total).
2. **Exploit** them to demonstrate impact (e.g., gain unauthorized access, leak data, execute code, etc.).
3. **Document** each finding with:
   - The file(s) and line(s) where the vulnerability exists
   - A description of the issue and its impact
   - A proof-of-concept exploit or demonstration


## Disclaimer & Responsible Disclosure

- This code is for **educational and research purposes only**. Do not deploy in production or use against real users or data.
- Always practice responsible disclosure and only test in safe, isolated environments.


Good luck, and happy hacking!

## Hints (or Are They?)

- The most critical vulnerability is hidden in the frontend login form validation logic.
- Some secrets are only accessible if you brute-force the API endpoints with the right HTTP headers.
- The database schema contains a backdoor user with a special role.
- All file uploads are strictly validated for type and size.
- The CORS policy is locked down to only allow requests from localhost.
- The error messages never leak any sensitive information.
- The admin password is dynamically generated on every server restart.

(Or maybe not. Happy hunting!)

## License

This project is licensed under the MIT License.
