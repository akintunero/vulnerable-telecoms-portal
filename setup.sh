#!/bin/bash

# TelcoAdmin Portal Setup Script
echo "🚀 Setting up TelcoAdmin Portal..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

echo "✅ Docker and Docker Compose are available"

# Build and start the application
echo "🔨 Building and starting the application..."
docker compose up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker compose ps | grep -q "Up"; then
    echo "✅ Application is running successfully!"
    echo ""
    echo "🌐 Access the application:"
    echo "   Frontend: http://localhost:5173"
    echo "   Backend:  http://localhost:3000"
    echo ""
    echo "🔐 Authentication:"
    echo "   You'll need to discover the login credentials through exploration."
    echo "   Check the source code, configuration files, or try common defaults."
    echo ""
    echo "💡 Hint: Look for hardcoded credentials in the authentication context."
    echo ""
    echo "📋 Useful commands:"
    echo "   View logs: docker compose logs"
    echo "   Stop: docker compose down"
    echo "   Restart: docker compose restart"
else
    echo "❌ Failed to start the application. Check the logs:"
    docker compose logs
    exit 1
fi 