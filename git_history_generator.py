#!/usr/bin/env python3

import os
import random
import subprocess
from datetime import datetime, timedelta
import time

# Initialize git repository if not already initialized
if not os.path.exists('.git'):
    subprocess.run(['git', 'init'])
    subprocess.run(['git', 'remote', 'add', 'origin', 'git@github.com:akintunero/vulnerable-telecoms-portal.git'])

def generate_random_time():
    hour = random.randint(0, 23)
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    return f"{hour:02d}:{minute:02d}:{second:02d}"

def generate_commit_message():
    messages = [
        "feat: Add new authentication middleware",
        "fix: Resolve database connection issues",
        "docs: Update API documentation",
        "style: Improve code formatting",
        "refactor: Optimize database queries",
        "test: Add unit tests for user service",
        "chore: Update dependencies",
        "feat: Implement rate limiting",
        "fix: Handle edge cases in data processing",
        "docs: Add setup instructions",
        "style: Clean up UI components",
        "refactor: Improve error handling",
        "test: Add integration tests",
        "chore: Update build configuration",
        "feat: Add user management features",
        "fix: Resolve security vulnerabilities",
        "docs: Update deployment guide",
        "style: Enhance responsive design",
        "refactor: Optimize API endpoints",
        "test: Add performance tests",
        "chore: Update CI/CD pipeline",
        "feat: Implement file upload system",
        "fix: Handle concurrent requests",
        "docs: Add API examples",
        "style: Improve accessibility",
        "refactor: Enhance code modularity",
        "test: Add load testing suite",
        "chore: Update security policies",
        "feat: Add real-time notifications",
        "fix: Resolve memory leaks"
    ]
    return random.choice(messages)

def generate_file_content():
    content_types = [
        "// Configuration settings\nconst config = {\n  apiKey: 'test_key',\n  debug: true\n};",
        "// API endpoint definitions\nconst endpoints = {\n  users: '/api/users',\n  auth: '/api/auth'\n};",
        "// Database schema\nCREATE TABLE users (\n  id INT PRIMARY KEY,\n  name VARCHAR(255)\n);",
        "// Test cases\ndescribe('UserService', () => {\n  it('should create user', () => {\n    // test code\n  });\n});",
        "// Documentation\n# API Reference\n## Authentication\nPOST /api/auth/login"
    ]
    return random.choice(content_types)

def create_random_files():
    num_files = random.randint(1, 5)
    num_dirs = random.randint(0, 2)
    
    # Create random directories
    for i in range(num_dirs):
        dir_name = f"dir_{int(time.time())}_{i}"
        os.makedirs(dir_name, exist_ok=True)
    
    # Create random files
    for i in range(num_files):
        file_name = f"file_{int(time.time())}_{i}.js"
        with open(file_name, 'w') as f:
            f.write(generate_file_content())

# Start date: December 7, 2024
start_date = datetime(2024, 12, 7, 9, 15, 32)
current_date = start_date

# Generate 65 commits
for i in range(1, 66):
    # Add random interval (2-4 days)
    interval = random.randint(2, 4)
    current_date += timedelta(days=interval)
    
    # Generate random time
    random_time = generate_random_time()
    commit_date = current_date.strftime("%Y-%m-%d") + " " + random_time
    
    # Create and add random files
    create_random_files()
    
    # Add files to git
    subprocess.run(['git', 'add', '.'])
    
    # Commit with random message
    env = os.environ.copy()
    env['GIT_AUTHOR_DATE'] = commit_date
    env['GIT_COMMITTER_DATE'] = commit_date
    subprocess.run(['git', 'commit', '-m', generate_commit_message()], env=env)
    
    print(f"Created commit {i} of 65 at {commit_date}")

# Push to remote repository
subprocess.run(['git', 'push', '-u', 'origin', 'main', '--force'])

print("All commits have been created and pushed to the repository.") 