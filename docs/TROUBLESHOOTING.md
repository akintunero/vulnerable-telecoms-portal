# Troubleshooting Guide

This guide provides detailed solutions for common issues you might encounter while working with TelLeak ISP.

## Table of Contents
1. [Installation Issues](#installation-issues)
2. [Service Issues](#service-issues)
3. [Database Issues](#database-issues)
4. [Authentication Issues](#authentication-issues)
5. [Network Issues](#network-issues)
6. [Performance Issues](#performance-issues)
7. [Security Issues](#security-issues)

## Installation Issues

### Docker Installation Fails

**Symptoms:**
- Docker service won't start
- Docker commands fail
- Permission errors

**Solutions:**
1. Check Docker installation:
```bash
docker --version
docker-compose --version
```

2. Verify Docker service:
```bash
sudo systemctl status docker
```

3. Check user permissions:
```bash
sudo usermod -aG docker $USER
```

4. Restart Docker:
```bash
sudo systemctl restart docker
```

### Node.js Installation Issues

**Symptoms:**
- npm commands fail
- Node.js version mismatch
- Module installation errors

**Solutions:**
1. Check Node.js version:
```bash
node --version
npm --version
```

2. Update Node.js:
```bash
nvm install 18
nvm use 18
```

3. Clear npm cache:
```bash
npm cache clean --force
```

## Service Issues

### Admin Dashboard Won't Start

**Symptoms:**
- Dashboard inaccessible
- White screen
- Connection refused

**Solutions:**
1. Check service status:
```bash
docker-compose ps
```

2. View logs:
```bash
docker-compose logs admin-ui
```

3. Restart service:
```bash
docker-compose restart admin-ui
```

4. Check port availability:
```bash
netstat -tulpn | grep 3001
```

### API Backend Issues

**Symptoms:**
- API endpoints fail
- 500 errors
- Connection timeouts

**Solutions:**
1. Check API logs:
```bash
docker-compose logs api
```

2. Verify environment variables:
```bash
cat .env
```

3. Test API health:
```bash
curl http://localhost:5001/health
```

4. Restart API service:
```bash
docker-compose restart api
```

## Database Issues

### MySQL Connection Problems

**Symptoms:**
- Database connection errors
- Slow queries
- Connection timeouts

**Solutions:**
1. Check MySQL status:
```bash
docker-compose ps mysql
```

2. View MySQL logs:
```bash
docker-compose logs mysql
```

3. Test connection:
```bash
mysql -h localhost -P 3306 -u root -p
```

4. Reset MySQL:
```bash
docker-compose down
docker volume rm telleak_mysql_data
docker-compose up -d
```

### Redis Issues

**Symptoms:**
- Cache misses
- Slow response times
- Connection errors

**Solutions:**
1. Check Redis status:
```bash
docker-compose ps redis
```

2. Test Redis connection:
```bash
redis-cli ping
```

3. Clear Redis cache:
```bash
redis-cli FLUSHALL
```

## Authentication Issues

### JWT Token Problems

**Symptoms:**
- Authentication failures
- Token expiration
- Invalid signatures

**Solutions:**
1. Check JWT configuration:
```bash
cat .env | grep JWT
```

2. Verify token expiration:
```bash
jwt-decode <token>
```

3. Reset JWT secret:
```bash
# Update JWT_SECRET in .env
docker-compose restart
```

### User Login Issues

**Symptoms:**
- Login failures
- Account locked
- Password reset problems

**Solutions:**
1. Check user status:
```sql
SELECT * FROM users WHERE username = '<username>';
```

2. Reset user password:
```sql
UPDATE users SET password = '<new_hash>' WHERE username = '<username>';
```

3. Unlock account:
```sql
UPDATE users SET locked = false WHERE username = '<username>';
```

## Network Issues

### Port Conflicts

**Symptoms:**
- Services won't start
- Connection refused
- Port already in use

**Solutions:**
1. Check port usage:
```bash
netstat -tulpn | grep LISTEN
```

2. Change port in docker-compose.yml:
```yaml
ports:
  - "3002:3001"  # Change 3001 to available port
```

3. Kill process using port:
```bash
sudo fuser -k 3001/tcp
```

### DNS Issues

**Symptoms:**
- Domain resolution fails
- Slow DNS lookups
- DNS errors

**Solutions:**
1. Check DNS service:
```bash
docker-compose ps dns
```

2. Test DNS resolution:
```bash
dig @localhost example.com
```

3. Restart DNS service:
```bash
docker-compose restart dns
```

## Performance Issues

### Slow Response Times

**Symptoms:**
- High latency
- Timeout errors
- Slow page loads

**Solutions:**
1. Check system resources:
```bash
docker stats
```

2. Monitor service logs:
```bash
docker-compose logs -f
```

3. Optimize database:
```sql
OPTIMIZE TABLE <table_name>;
```

4. Clear caches:
```bash
redis-cli FLUSHALL
```

### Memory Issues

**Symptoms:**
- Out of memory errors
- Service crashes
- Slow performance

**Solutions:**
1. Check memory usage:
```bash
free -m
```

2. Adjust Docker memory limits:
```yaml
services:
  service_name:
    deploy:
      resources:
        limits:
          memory: 1G
```

3. Optimize Node.js memory:
```bash
NODE_OPTIONS="--max-old-space-size=1024" npm start
```

## Security Issues

### SSL/TLS Problems

**Symptoms:**
- Certificate errors
- HTTPS failures
- Security warnings

**Solutions:**
1. Check certificates:
```bash
openssl x509 -in cert.pem -text
```

2. Update certificates:
```bash
./update-certs.sh
```

3. Verify SSL configuration:
```bash
curl -v https://localhost:3001
```

### Firewall Issues

**Symptoms:**
- Connection blocked
- Port inaccessible
- Security rules conflicts

**Solutions:**
1. Check firewall rules:
```bash
sudo ufw status
```

2. Allow required ports:
```bash
sudo ufw allow 3001/tcp
sudo ufw allow 5001/tcp
```

3. Reset firewall:
```bash
sudo ufw reset
```

## Getting Help

If you're still experiencing issues:

1. Check the [FAQ](FAQ.md)
2. Search [GitHub Issues](https://github.com/akintunero/vulnerable-telecoms-portal/issues)
3. Join our [Discord Community](https://discord.gg/telleak)
4. Contact [Support](../README.md#support)

---

Remember to always:
- Keep your system updated
- Follow security best practices
- Maintain regular backups
- Monitor system logs
- Document any changes made 