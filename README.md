# TelcoAdmin Portal

> **IMPORTANT:** This project is intentionally vulnerable and is **strictly to be run in Docker**. Do not deploy or run outside a containerized environment. See CTF section for details.

![Portal Dashboard](<src/pages/Screenshot 2025-06-21 at 03.15.01.png>)


## Getting Started (Docker Only)

This project is intentionally vulnerable and will **only work in Docker** due to the nature of the included vulnerabilities.

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop/) 
- [Docker Compose](https://docs.docker.com/compose/)

### Quick Start
1. Clone this repository:
```bash
git clone https://github.com/akintunero/vulnerable-telecoms-portal.git
cd telco-pro
```

2. Start the environment:
```bash
docker-compose up -d
```

3. Access the application:
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:3000
   - **Database**: localhost:3306 (internal only)

That's it! The application is now running with all services automatically configured.

> **Note:** When you start the environment, a CTF warning and usage summary will be printed in the Docker logs. **Check the logs for important information and instructions.**

> **Note:** Do not attempt to run the project outside Docker. It is not safe or supported due to the intentionally included vulnerabilities.

### What's Included
- **Frontend**: React/TypeScript application
- **Backend**: Node.js/Express API
- **Database**: MySQL with sample data
- **All vulnerabilities**: 23 intentionally embedded security issues
- **CTF environment**: Isolated and safe for educational use

### Stopping the Environment
```bash
docker-compose down
```

### Viewing Logs
```bash
docker-compose logs frontend
docker-compose logs backend
docker-compose logs db
```

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, MySQL
- **Containerization**: Docker, Docker Compose
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router DOM

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
