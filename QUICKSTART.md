# 🚀 Quick Start Guide

## Prerequisites
- Docker Desktop installed and running
- Git

## One-Command Setup

### Option 1: Using the setup script (Linux/Mac)
```bash
git clone https://github.com/akintunero/vulnerable-telecoms-portal.git
cd vulnerable-telecoms-portal
chmod +x setup.sh
./setup.sh
```

### Option 2: Using the setup script (Windows)
```bash
git clone https://github.com/akintunero/vulnerable-telecoms-portal.git
cd vulnerable-telecoms-portal
setup.bat
```

### Option 3: Manual setup
```bash
git clone https://github.com/akintunero/vulnerable-telecoms-portal.git
cd vulnerable-telecoms-portal
docker compose up -d
```

## Access the Application

Once the setup is complete, you can access:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 🔐 Authentication

The application uses a custom authentication system. You'll need to discover the login credentials through exploration. Look for hints in:

- Source code files
- Configuration files
- Environment variables
- Database initialization scripts
- Docker configuration files

**Hint**: Check for hardcoded credentials in the authentication context or configuration files.

## Useful Commands

```bash
# View logs
docker compose logs

# Stop the application
docker compose down

# Restart the application
docker compose restart

# Rebuild and restart
docker compose up -d --build
```

## Troubleshooting

If you encounter issues:

1. **Check if Docker is running**: Make sure Docker Desktop is started
2. **Check ports**: Ensure ports 5173, 3000, and 3306 are available
3. **View logs**: `docker compose logs` to see what's happening
4. **Rebuild**: `docker compose build --no-cache` to force a clean build

## What's Included

- ✅ Complete telecom management portal
- ✅ React frontend with TypeScript
- ✅ Node.js backend API
- ✅ MySQL database with sample data
- ✅ Docker containerization
- ✅ All services pre-configured
- ✅ Intentional vulnerabilities for learning

## ⚠️ Important Notes

- **Docker Only**: This project is designed to run exclusively within Docker containers
- **Security Testing**: Contains intentional vulnerabilities for educational purposes
- **No Local Development**: Local development is not supported due to security considerations

That's it! Your TelcoAdmin portal should be running and ready for security testing. 