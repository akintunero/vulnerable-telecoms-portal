@echo off
echo 🚀 Setting up TelcoAdmin Portal...

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker first.
    echo Visit: https://docs.docker.com/get-docker/
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker compose version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    echo Visit: https://docs.docker.com/compose/install/
    pause
    exit /b 1
)

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker Desktop.
    pause
    exit /b 1
)

echo ✅ Docker and Docker Compose are available

REM Build and start the application
echo 🔨 Building and starting the application...
docker compose up -d --build

REM Wait for services to be ready
echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak >nul

REM Check if services are running
docker compose ps | findstr "Up" >nul
if %errorlevel% equ 0 (
    echo ✅ Application is running successfully!
    echo.
    echo 🌐 Access the application:
    echo    Frontend: http://localhost:5173
    echo    Backend:  http://localhost:3000
    echo.
    echo 🔐 Login credentials:
    echo    Admin: admin@telco.com / admin123
    echo    System: sys@telco.com / sysaccess
    echo.
    echo 📋 Useful commands:
    echo    View logs: docker compose logs
    echo    Stop: docker compose down
    echo    Restart: docker compose restart
) else (
    echo ❌ Failed to start the application. Check the logs:
    docker compose logs
)

pause 