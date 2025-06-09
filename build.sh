#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to print status
print_status() {
    echo -e "${GREEN}[+] $1${NC}"
}

print_error() {
    echo -e "${RED}[-] $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}[!] $1${NC}"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to clean up
cleanup() {
    print_status "Cleaning up..."
    docker-compose down --remove-orphans
    docker system prune -f
}

# Function to configure Docker for better network performance
configure_docker() {
    print_status "Configuring Docker for better network performance..."
    
    # Increase Docker's DNS timeout
    if [ -f /etc/docker/daemon.json ]; then
        sudo cp /etc/docker/daemon.json /etc/docker/daemon.json.bak
    fi
    
    echo '{
        "dns": ["8.8.8.8", "8.8.4.4"],
        "dns-opts": ["timeout:5", "attempts:3"],
        "max-concurrent-downloads": 10,
        "max-concurrent-uploads": 5
    }' | sudo tee /etc/docker/daemon.json > /dev/null
    
    # Restart Docker daemon
    if command -v systemctl &> /dev/null; then
        sudo systemctl restart docker
    elif command -v service &> /dev/null; then
        sudo service docker restart
    fi
    
    # Wait for Docker to be ready
    sleep 5
}

# Function to set up build environment
setup_build_env() {
    print_status "Setting up build environment..."
    
    # Create a temporary .env file for build
    cat > .env.build << EOF
DEBIAN_FRONTEND=noninteractive
TZ=Europe/London
EOF
    
    # Export environment variables
    export $(cat .env.build | xargs)
}

# Function to build services
build_services() {
    local max_retries=3
    local retry_count=0
    local success=false

    while [ $retry_count -lt $max_retries ] && [ "$success" = false ]; do
        print_status "Build attempt $((retry_count + 1)) of $max_retries"
        
        # Enable BuildKit and configure for better performance
        export DOCKER_BUILDKIT=1
        export COMPOSE_DOCKER_CLI_BUILD=1
        export DOCKER_CLIENT_TIMEOUT=120
        export COMPOSE_HTTP_TIMEOUT=120
        
        # Build services with increased timeout and parallel builds
        if DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 docker-compose build --parallel --no-cache --progress=plain; then
            success=true
            print_status "Build completed successfully!"
        else
            retry_count=$((retry_count + 1))
            if [ $retry_count -lt $max_retries ]; then
                print_warning "Build failed. Retrying..."
                cleanup
                sleep 10
            else
                print_error "Build failed after $max_retries attempts."
                exit 1
            fi
        fi
    done
}

# Function to start services
start_services() {
    print_status "Starting services..."
    if docker-compose up -d; then
        print_status "Services started successfully!"
    else
        print_error "Failed to start services."
        exit 1
    fi
}

# Function to check service health
check_health() {
    print_status "Checking service health..."
    local unhealthy_services=$(docker-compose ps --format '{{.Name}}' | xargs -I {} docker inspect --format='{{.State.Health.Status}}' {} 2>/dev/null | grep -v "healthy")
    
    if [ -n "$unhealthy_services" ]; then
        print_warning "Some services are unhealthy:"
        echo "$unhealthy_services"
        return 1
    else
        print_status "All services are healthy!"
        return 0
    fi
}

# Function to check network connectivity
check_network() {
    print_status "Checking network connectivity..."
    if ping -c 1 8.8.8.8 > /dev/null 2>&1; then
        print_status "Network is reachable"
        return 0
    else
        print_error "Network is not reachable"
        return 1
    fi
}

# Function to cleanup build environment
cleanup_build_env() {
    print_status "Cleaning up build environment..."
    rm -f .env.build
}

# Main execution
main() {
    print_status "Starting automated build process..."
    
    # Check Docker
    check_docker
    
    # Check network
    check_network
    
    # Configure Docker
    configure_docker
    
    # Set up build environment
    setup_build_env
    
    # Clean up before starting
    cleanup
    
    # Build services
    build_services
    
    # Start services
    start_services
    
    # Check health
    check_health
    
    # Cleanup build environment
    cleanup_build_env
    
    print_status "Build process completed!"
}

# Run main function
main 